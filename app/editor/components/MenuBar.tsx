"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as fabric from "fabric";
import { useRouter } from "next/navigation";
import { useEditorStore } from "@/lib/editor/editorStore";
import { useHistoryStore } from "@/lib/editor/historyStore";
import { useCanvas } from "@/lib/editor/canvasContext";
import { CANVAS_PRESETS } from "@/lib/editor/canvasPresets";
import { CanvasPreset } from "@/lib/editor/types";
import ExportModal from "./ExportModal";

const DOC_BG_ID = "__docbg__";

// ─────────────────────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────────────────────
type MenuId =
  | "file" | "edit" | "object" | "layer"
  | "select" | "view" | "window" | "help" | null;

interface MenuItem {
  label: string;
  shortcut?: string;
  divider?: boolean;
  action?: () => void;
  disabled?: boolean;
  children?: MenuItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
//  New Project counter (Untitled-1, Untitled-2, …)
// ─────────────────────────────────────────────────────────────────────────────
function getNextUntitledName() {
  const n = parseInt(localStorage.getItem("singular_untitled_counter") || "0") + 1;
  localStorage.setItem("singular_untitled_counter", String(n));
  return `Untitled-${n}`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  MenuBar
// ─────────────────────────────────────────────────────────────────────────────
export default function MenuBar() {
  const router = useRouter();
  const { canvasRef } = useCanvas();
  const {
    canvasPreset, zoom, setZoom,
    gridEnabled, toggleGrid,
    isDirty, setDirty,
    clipboard, setClipboard,
    layers, setLayers,
    projectName, setProjectName,
    setActiveTool,
    setNewProjectModalOpen,
    setConfirmModalOpen,
    setPendingNewProjectPreset,
    setAboutModalOpen,
    setShortcutModalOpen,
  } = useEditorStore();
  const { undo, redo, canUndo, canRedo, clear: clearHistory } = useHistoryStore();

  const [activeMenu, setActiveMenu] = useState<MenuId>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"PNG" | "JPG" | "WEBP">("PNG");
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getCanvas = () => canvasRef.current;

  const getActive = () => getCanvas()?.getActiveObject() as any | null;

  const restoreSnapshot = useCallback((json: string) => {
    const canvas = getCanvas();
    if (!canvas) return;
    (canvas as any).historyLoading = true;
    canvas.loadFromJSON(json).then(() => {
      const hasBg = canvas.getObjects().some((o: any) => o.id === DOC_BG_ID);
      if (!hasBg) {
        const { canvasPreset: p } = useEditorStore.getState();
        const bg = new fabric.Rect({
          left: 0, top: 0,
          width: p.width, height: p.height,
          fill: p.bgColor || "#ffffff",
          selectable: false, evented: false,
          hasControls: false, hasBorders: false,
          hoverCursor: "default",
          id: DOC_BG_ID, name: DOC_BG_ID,
        } as any);
        canvas.add(bg);
        canvas.sendObjectToBack(bg);
      }
      canvas.renderAll();
      (canvas as any).historyLoading = false;
      (canvas as any).fire("history:restored");
    }).catch(() => { (canvas as any).historyLoading = false; });
  }, []);

  // ── Save helpers ──────────────────────────────────────────────────────────
  const handleSave = useCallback(() => {
    const canvas = getCanvas();
    if (!canvas) return;
    const fullJson = (canvas as any).toJSON(["id", "name"]);
    fullJson.objects = (fullJson.objects || []).filter((o: any) => o.id !== DOC_BG_ID);
    localStorage.setItem("singular_editor_save", JSON.stringify(fullJson));
    localStorage.setItem("singular_editor_preset", JSON.stringify(canvasPreset));
    setDirty(false);
  }, [canvasPreset, setDirty]);

  const handleSaveAs = useCallback(() => {
    const canvas = getCanvas();
    if (!canvas) return;
    const fullJson = (canvas as any).toJSON(["id", "name"]);
    fullJson.objects = (fullJson.objects || []).filter((o: any) => o.id !== DOC_BG_ID);
    const bundle = { preset: canvasPreset, projectName, canvas: fullJson };
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.download = `${projectName || "project"}.singularproject`;
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [canvasPreset, projectName]);

  // ── Direct export without modal ───────────────────────────────────────────
  const handleQuickExport = useCallback(async (fmt: "PNG" | "JPG" | "WEBP") => {
    const canvas = getCanvas();
    if (!canvas) return;
    const { canvasPreset: p } = useEditorStore.getState();
    const canvasJson = (canvas as any).toJSON(["id", "name"]);
    const el = document.createElement("canvas");
    const tmp = new fabric.StaticCanvas(el, { width: p.width, height: p.height });
    await (tmp as any).loadFromJSON(canvasJson);
    tmp.renderAll();
    const dataURL = tmp.toDataURL({
      format: fmt === "JPG" ? "jpeg" : fmt.toLowerCase() as any,
      quality: 0.92,
      multiplier: 1,
    });
    const link = document.createElement("a");
    link.download = `${projectName || "export"}-${Date.now()}.${fmt.toLowerCase()}`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    await tmp.dispose();
  }, [projectName]);

  // ── Open Project (file input) ─────────────────────────────────────────────
  const handleOpenProject = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".singularproject,.json";
    input.onchange = (ev: Event) => {
      const file = (ev.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const raw = JSON.parse(e.target?.result as string);
          const canvas = getCanvas();
          if (!canvas) return;

          // Support both bare canvas JSON and our bundled format
          const canvasData = raw.canvas || raw;
          const preset: CanvasPreset = raw.preset || canvasPreset;
          const name: string = raw.projectName || file.name.replace(/\.\w+$/, "");

          useEditorStore.getState().setCanvasPreset(preset);
          setProjectName(name);
          localStorage.setItem("singular_editor_preset", JSON.stringify(preset));

          (canvas as any).historyLoading = true;
          canvas.loadFromJSON(canvasData).then(() => {
            const hasBg = canvas.getObjects().some((o: any) => o.id === DOC_BG_ID);
            if (!hasBg) {
              const bg = new fabric.Rect({
                left: 0, top: 0, width: preset.width, height: preset.height,
                fill: preset.bgColor || "#ffffff",
                selectable: false, evented: false,
                hasControls: false, hasBorders: false,
                hoverCursor: "default", id: DOC_BG_ID, name: DOC_BG_ID,
              } as any);
              canvas.add(bg); canvas.sendObjectToBack(bg);
            }
            canvas.renderAll();
            (canvas as any).historyLoading = false;
            (canvas as any).fire("history:restored");
            setDirty(false);
          }).catch(() => { (canvas as any).historyLoading = false; });
        } catch {
          alert("Gagal membuka project. Pastikan file yang dipilih adalah file .singularproject yang valid.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [canvasPreset, setProjectName, setDirty]);

  // ── New Project ───────────────────────────────────────────────────────────
  const handleNewProject = useCallback(() => {
    if (isDirty) {
      setConfirmModalOpen(true);
    } else {
      setNewProjectModalOpen(true);
    }
    setActiveMenu(null);
  }, [isDirty, setConfirmModalOpen, setNewProjectModalOpen]);

  // ── Close Project → workspace ─────────────────────────────────────────────
  const handleCloseProject = useCallback(() => {
    if (isDirty) {
      if (!confirm("Proyek ini belum disimpan. Tetap keluar?")) return;
    }
    router.push("/editor");
  }, [isDirty, router]);

  // ── Edit actions ──────────────────────────────────────────────────────────
  const handleUndo = useCallback(() => {
    if (!canUndo()) return;
    const json = undo();
    if (json) restoreSnapshot(json);
  }, [canUndo, undo, restoreSnapshot]);

  const handleRedo = useCallback(() => {
    if (!canRedo()) return;
    const json = redo();
    if (json) restoreSnapshot(json);
  }, [canRedo, redo, restoreSnapshot]);

  const handleCopy = useCallback(() => {
    const active = getActive();
    if (!active) return;
    active.clone().then((cloned: any) => setClipboard(cloned));
  }, [setClipboard]);

  const handleCut = useCallback(() => {
    const canvas = getCanvas();
    const active = getActive();
    if (!canvas || !active) return;
    active.clone().then((cloned: any) => {
      setClipboard(cloned);
      if (active.type === "activeSelection") {
        (active as any).forEachObject((o: any) => canvas.remove(o));
        canvas.discardActiveObject();
      } else { canvas.remove(active); }
      canvas.requestRenderAll();
    });
  }, [setClipboard]);

  const handlePaste = useCallback(() => {
    const canvas = getCanvas();
    if (!canvas || !clipboard) return;
    clipboard.clone().then((cloned: any) => {
      canvas.discardActiveObject();
      cloned.set({ left: (cloned.left || 0) + 24, top: (cloned.top || 0) + 24 });
      if (cloned.type === "activeSelection") {
        cloned.canvas = canvas;
        (cloned as any).forEachObject((o: any) => canvas.add(o));
        canvas.setActiveObject(cloned);
      } else { canvas.add(cloned); canvas.setActiveObject(cloned); }
      canvas.requestRenderAll();
    });
  }, [clipboard]);

  const handleDuplicate = useCallback(() => {
    const canvas = getCanvas();
    const active = getActive();
    if (!canvas || !active) return;
    active.clone().then((cloned: any) => {
      cloned.set({ left: (cloned.left || 0) + 24, top: (cloned.top || 0) + 24 });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.requestRenderAll();
    });
  }, []);

  const handleDelete = useCallback(() => {
    const canvas = getCanvas();
    const active = getActive();
    if (!canvas || !active) return;
    if (active.type === "activeSelection") {
      (active as any).forEachObject((o: any) => canvas.remove(o));
      canvas.discardActiveObject();
    } else { canvas.remove(active); }
    canvas.requestRenderAll();
  }, []);

  // ── Object actions ────────────────────────────────────────────────────────
  const withActive = (fn: (canvas: fabric.Canvas, obj: any) => void) => () => {
    const canvas = getCanvas();
    const active = getActive();
    if (!canvas || !active) return;
    fn(canvas, active);
    canvas.renderAll();
    setDirty(true);
  };

  const ensureBgBack = (canvas: fabric.Canvas) => {
    const bg = canvas.getObjects().find((o: any) => o.id === DOC_BG_ID);
    if (bg) canvas.sendObjectToBack(bg);
  };

  const handleBringForward    = withActive((c, o) => { c.bringObjectForward(o); });
  const handleBringToFront    = withActive((c, o) => { c.bringObjectToFront(o); });
  const handleSendBackward    = withActive((c, o) => { c.sendObjectBackwards(o); ensureBgBack(c); });
  const handleSendToBack      = withActive((c, o) => { c.sendObjectToBack(o); ensureBgBack(c); });

  const handleGroup = withActive((c, o) => {
    if (o.type === "activeSelection") {
      (o as any).toGroup(); c.requestRenderAll();
    }
  });
  const handleUngroup = withActive((c, o) => {
    if (o.type === "group") {
      (o as any).toActiveSelection(); c.requestRenderAll();
    }
  });

  const handleLock   = withActive((_, o) => {
    o.set({ lockMovementX: true, lockMovementY: true, lockScalingX: true, lockScalingY: true, lockRotation: true, hasControls: false, selectable: true });
  });
  const handleUnlock = withActive((_, o) => {
    o.set({ lockMovementX: false, lockMovementY: false, lockScalingX: false, lockScalingY: false, lockRotation: false, hasControls: true });
  });

  // Align
  const alignTo = (fn: (obj: any, p: CanvasPreset) => void) => () => {
    const canvas = getCanvas();
    const active = getActive();
    const { canvasPreset: p } = useEditorStore.getState();
    if (!canvas || !active) return;
    fn(active, p);
    active.setCoords();
    canvas.renderAll();
    setDirty(true);
  };

  const handleAlignLeft   = alignTo((o, p) => o.set("left", 0));
  const handleAlignCenterH = alignTo((o, p) => {
    const w = (o.width || 0) * (o.scaleX || 1);
    o.set("left", (p.width - w) / 2);
  });
  const handleAlignRight  = alignTo((o, p) => {
    const w = (o.width || 0) * (o.scaleX || 1);
    o.set("left", p.width - w);
  });
  const handleAlignTop    = alignTo((o) => o.set("top", 0));
  const handleAlignCenterV = alignTo((o, p) => {
    const h = (o.height || 0) * (o.scaleY || 1);
    o.set("top", (p.height - h) / 2);
  });
  const handleAlignBottom = alignTo((o, p) => {
    const h = (o.height || 0) * (o.scaleY || 1);
    o.set("top", p.height - h);
  });

  // ── Select actions ────────────────────────────────────────────────────────
  const handleSelectAll = () => {
    const canvas = getCanvas();
    if (!canvas) return;
    canvas.discardActiveObject();
    const objs = canvas.getObjects().filter((o: any) => o.id !== DOC_BG_ID);
    if (objs.length === 0) return;
    const sel = new (fabric as any).ActiveSelection(objs, { canvas });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
  };

  const handleDeselect = () => {
    const canvas = getCanvas();
    if (!canvas) return;
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  // ── View actions ──────────────────────────────────────────────────────────
  const handleFitCanvas = () => {
    const canvas = getCanvas();
    if (!canvas) return;
    const { canvasPreset: p } = useEditorStore.getState();
    const containerW = (canvas as any).width;
    const containerH = (canvas as any).height;
    const fitZoom = Math.min((containerW - 80) / p.width, (containerH - 80) / p.height, 1);
    const offsetX = (containerW - p.width * fitZoom) / 2;
    const offsetY = (containerH - p.height * fitZoom) / 2;
    canvas.setViewportTransform([fitZoom, 0, 0, fitZoom, offsetX, offsetY]);
    setZoom(fitZoom);
  };

  const handleActualSize = () => {
    const canvas = getCanvas();
    if (!canvas) return;
    const containerW = (canvas as any).width;
    const containerH = (canvas as any).height;
    const { canvasPreset: p } = useEditorStore.getState();
    const offsetX = (containerW - p.width) / 2;
    const offsetY = (containerH - p.height) / 2;
    canvas.setViewportTransform([1, 0, 0, 1, offsetX, offsetY]);
    setZoom(1);
  };

  // ── Menu structure ────────────────────────────────────────────────────────
  const menus: { id: MenuId; label: string; items: MenuItem[] }[] = [
    {
      id: "file", label: "File",
      items: [
        { label: "New Project",      shortcut: "Ctrl+N",   action: handleNewProject },
        { label: "Open Project",     shortcut: "Ctrl+O",   action: handleOpenProject },
        { label: "Open Recent",      disabled: true },
        { label: "", divider: true },
        { label: "Save",             shortcut: "Ctrl+S",   action: handleSave },
        { label: "Save As…",         shortcut: "Ctrl+Shift+S", action: handleSaveAs },
        { label: "", divider: true },
        { label: "Export…",          shortcut: "Ctrl+E",   action: () => setExportOpen(true) },
        { label: "Export As PNG",    action: () => handleQuickExport("PNG") },
        { label: "Export As JPG",    action: () => handleQuickExport("JPG") },
        { label: "Export As WebP",   action: () => handleQuickExport("WEBP") },
        { label: "", divider: true },
        { label: "Close Project",    action: handleCloseProject },
      ],
    },
    {
      id: "edit", label: "Edit",
      items: [
        { label: "Undo",      shortcut: "Ctrl+Z",         action: handleUndo, disabled: !canUndo() },
        { label: "Redo",      shortcut: "Ctrl+Shift+Z",   action: handleRedo, disabled: !canRedo() },
        { label: "", divider: true },
        { label: "Cut",       shortcut: "Ctrl+X",   action: handleCut },
        { label: "Copy",      shortcut: "Ctrl+C",   action: handleCopy },
        { label: "Paste",     shortcut: "Ctrl+V",   action: handlePaste },
        { label: "Duplicate", shortcut: "Ctrl+D",   action: handleDuplicate },
        { label: "Delete",    shortcut: "Del",       action: handleDelete },
      ],
    },
    {
      id: "object", label: "Object",
      items: [
        { label: "Bring Forward", shortcut: "Ctrl+]", action: handleBringForward },
        { label: "Bring To Front",shortcut: "Ctrl+Shift+]", action: handleBringToFront },
        { label: "Send Backward", shortcut: "Ctrl+[", action: handleSendBackward },
        { label: "Send To Back",  shortcut: "Ctrl+Shift+[", action: handleSendToBack },
        { label: "", divider: true },
        { label: "Align Left",            action: handleAlignLeft },
        { label: "Align Center H",        action: handleAlignCenterH },
        { label: "Align Right",           action: handleAlignRight },
        { label: "Align Top",             action: handleAlignTop },
        { label: "Align Center V",        action: handleAlignCenterV },
        { label: "Align Bottom",          action: handleAlignBottom },
        { label: "", divider: true },
        { label: "Group",   shortcut: "Ctrl+G",         action: handleGroup },
        { label: "Ungroup", shortcut: "Ctrl+Shift+G",   action: handleUngroup },
        { label: "", divider: true },
        { label: "Lock",   action: handleLock },
        { label: "Unlock", action: handleUnlock },
      ],
    },
    {
      id: "layer", label: "Layer",
      items: [
        { label: "Hide Selected Layer", action: () => {
            const canvas = getCanvas();
            const active = getActive();
            if (!canvas || !active) return;
            active.set("visible", false);
            canvas.renderAll(); setDirty(true);
        }},
        { label: "Show Selected Layer", action: () => {
            const canvas = getCanvas();
            const active = getActive();
            if (!canvas || !active) return;
            active.set("visible", true);
            canvas.renderAll(); setDirty(true);
        }},
        { label: "Delete Selected Layer", action: handleDelete },
      ],
    },
    {
      id: "select", label: "Select",
      items: [
        { label: "Select All",  shortcut: "Ctrl+A",         action: handleSelectAll },
        { label: "Deselect",    shortcut: "Ctrl+Shift+A",   action: handleDeselect },
      ],
    },
    {
      id: "view", label: "View",
      items: [
        { label: "Zoom In",   shortcut: "Ctrl++", action: () => setZoom(zoom + 0.1) },
        { label: "Zoom Out",  shortcut: "Ctrl+-", action: () => setZoom(zoom - 0.1) },
        { label: "Fit Canvas",  shortcut: "Ctrl+0", action: handleFitCanvas },
        { label: "Actual Size (100%)", shortcut: "Ctrl+1", action: handleActualSize },
        { label: "", divider: true },
        { label: gridEnabled ? "Hide Grid" : "Show Grid", shortcut: "Ctrl+'", action: toggleGrid },
      ],
    },
    {
      id: "help", label: "Help",
      items: [
        { label: "Keyboard Shortcuts", action: () => setShortcutModalOpen(true) },
        { label: "", divider: true },
        { label: "About 5ingular Editor", action: () => setAboutModalOpen(true) },
      ],
    },
  ];

  // ─────────────────────────────────────────────────────────────────────────
  //  Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <nav
        ref={menuRef}
        className="h-8 bg-white border-b border-zinc-200 flex items-center px-2 select-none flex-shrink-0 z-40 relative shadow-sm"
      >
        {/* Logo mark */}
        <span className="text-[10px] font-black text-zinc-300 tracking-widest uppercase mr-3 px-2">
          5·G
        </span>

        {/* Menu items */}
        {menus.map((menu) => (
          <div key={menu.id} className="relative">
            <button
              className={`px-3 h-7 text-[12px] font-medium transition-colors rounded-sm ${
                activeMenu === menu.id
                  ? "bg-blue-600 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                setActiveMenu(activeMenu === menu.id ? null : menu.id);
              }}
              onMouseEnter={() => {
                if (activeMenu !== null) setActiveMenu(menu.id);
              }}
            >
              {menu.label}
            </button>

            {/* Dropdown */}
            {activeMenu === menu.id && (
              <div
                className="absolute top-full left-0 mt-0.5 min-w-[220px] bg-white border border-zinc-200 rounded-xl shadow-xl shadow-zinc-200/80 py-1 z-50"
                onMouseLeave={() => {}}
              >
                {menu.items.map((item, idx) =>
                  item.divider ? (
                    <div key={idx} className="my-1 h-px bg-[#3a3a3a] mx-2" />
                  ) : (
                    <button
                      key={idx}
                      disabled={item.disabled}
                      className={`w-full flex items-center justify-between px-4 py-[5px] text-[12px] text-left transition-colors rounded-sm mx-0.5 ${
                        item.disabled
                          ? "text-zinc-400 cursor-default"
                          : "text-zinc-700 hover:bg-blue-600 hover:text-white"
                      }`}
                      onClick={() => {
                        if (!item.disabled && item.action) {
                          item.action();
                          setActiveMenu(null);
                        }
                      }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <span className="text-[10px] text-zinc-400 ml-6">
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Export Modal */}
      {exportOpen && <ExportModal onClose={() => setExportOpen(false)} />}
    </>
  );
}
