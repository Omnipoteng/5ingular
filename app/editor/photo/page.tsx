"use client";

import React, { useCallback, useEffect, useState } from "react";
import * as fabric from "fabric";
import { CanvasProvider, useCanvas } from "@/lib/editor/canvasContext";
import { useEditorStore } from "@/lib/editor/editorStore";
import { useHistoryStore } from "@/lib/editor/historyStore";
import TopToolbar from "../components/TopToolbar";
import MenuBar from "../components/MenuBar";
import LeftToolbar from "../components/LeftToolbar";
import LayersPanel from "../components/LayersPanel";
import CanvasWorkspace from "../components/CanvasWorkspace";
import RightPanel from "../components/RightPanel";
import StatusBar from "../components/StatusBar";
import AIChatSidebar from "../components/AIChatSidebar";
import OnboardingProvider from "@/components/editor/onboarding/OnboardingProvider";
import OnboardingOverlay from "@/components/editor/onboarding/OnboardingOverlay";
import { AlertCircle, X, FolderOpen, Palette, FileText } from "lucide-react";
import { CANVAS_PRESETS } from "@/lib/editor/canvasPresets";
import { CanvasPreset } from "@/lib/editor/types";

const DOC_BG_ID = "__docbg__";

// ─────────────────────────────────────────────────────────────────────────────
//  New Project counter
// ─────────────────────────────────────────────────────────────────────────────
function getNextUntitledName() {
  const n = parseInt(localStorage.getItem("singular_untitled_counter") || "0") + 1;
  localStorage.setItem("singular_untitled_counter", String(n));
  return `Untitled-${n}`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  ConfirmSaveModal
// ─────────────────────────────────────────────────────────────────────────────
function ConfirmSaveModal({
  onSave,
  onDontSave,
  onCancel,
}: {
  onSave: () => void;
  onDontSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-white">Save changes?</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Your current project has unsaved changes. Do you want to save before creating a new project?
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onDontSave}
            className="px-4 py-2 text-xs font-semibold text-zinc-300 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
          >
            Don&apos;t Save
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  NewProjectModal
// ─────────────────────────────────────────────────────────────────────────────
function NewProjectModal({ onConfirm, onCancel }: {
  onConfirm: (preset: CanvasPreset, name: string) => void;
  onCancel: () => void;
}) {
  const [name, setName]       = useState("Untitled Project");
  const [width, setWidth]     = useState(1920);
  const [height, setHeight]   = useState(1080);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [dpi, setDpi]         = useState(72);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const applyPreset = (p: CanvasPreset) => {
    setWidth(p.width);
    setHeight(p.height);
    setActivePreset(p.name);
    if (p.name !== "Custom") setName(p.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (width < 50 || height < 50) {
      alert("Dimensi minimal 50 × 50 px.");
      return;
    }
    onConfirm({ name: name.trim() || "Untitled Project", width, height, bgColor, dpi }, name.trim() || "Untitled Project");
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333]">
          <div className="flex items-center gap-2">
            <FileText size={14} className="text-blue-500" />
            <span className="text-sm font-bold text-white tracking-tight">New Project</span>
          </div>
          <button
            onClick={onCancel}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-400 transition-colors"
          >
            <X size={12} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-0 flex-1 overflow-hidden">
          {/* Preset list */}
          <div className="w-full md:w-52 border-b md:border-b-0 md:border-r border-[#333] flex flex-col">
            <div className="px-4 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Presets</div>
            <div className="flex-1 overflow-y-auto px-2 pb-2 flex flex-col gap-1">
              {CANVAS_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className={`w-full flex justify-between items-center px-3 py-2.5 rounded-lg text-left transition-all ${
                    activePreset === p.name
                      ? "bg-blue-600 text-white"
                      : "text-zinc-300 hover:bg-white/8"
                  }`}
                >
                  <span className="text-[11px] font-medium">{p.name}</span>
                  <span className="text-[9px] text-zinc-500 font-mono">{p.width}×{p.height}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Config form */}
          <div className="flex-1 p-6 flex flex-col gap-4">
            {/* Project name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Project Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#2a2a2a] border border-[#444] rounded-lg text-xs text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Width (px)</label>
                <input
                  type="number" min={50} max={8000}
                  value={width}
                  onChange={(e) => { setWidth(Number(e.target.value)); setActivePreset(null); }}
                  className="px-3 py-2.5 bg-[#2a2a2a] border border-[#444] rounded-lg text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Height (px)</label>
                <input
                  type="number" min={50} max={8000}
                  value={height}
                  onChange={(e) => { setHeight(Number(e.target.value)); setActivePreset(null); }}
                  className="px-3 py-2.5 bg-[#2a2a2a] border border-[#444] rounded-lg text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* DPI + Background */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Resolution (DPI)</label>
                <select
                  value={dpi}
                  onChange={(e) => setDpi(Number(e.target.value))}
                  className="px-3 py-2.5 bg-[#2a2a2a] border border-[#444] rounded-lg text-xs text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value={72}>72 dpi — Screen</option>
                  <option value={150}>150 dpi — Draft Print</option>
                  <option value={300}>300 dpi — High Quality Print</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Background</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-[#444] bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-[#2a2a2a] border border-[#444] rounded-lg text-xs text-white focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Preview chip */}
            <div className="mt-auto pt-4 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg border border-[#444] flex-shrink-0"
                style={{ backgroundColor: bgColor }}
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">{name || "Untitled Project"}</span>
                <span className="text-[10px] text-zinc-500">{width} × {height} px · {dpi} dpi</span>
              </div>
              <button
                type="submit"
                className="ml-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  AboutModal
// ─────────────────────────────────────────────────────────────────────────────
function AboutModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-2xl shadow-2xl w-full max-w-sm p-7 flex flex-col gap-4 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Palette size={22} className="text-white" />
          </div>
          <h2 className="text-base font-black text-white tracking-tight">
            5ingular <span className="text-blue-400">Editor</span>
          </h2>
          <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 border border-blue-500/30 rounded-full px-3 py-0.5 uppercase tracking-widest">
            Version 0.1.0 · BETA
          </span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          A modern, lightweight creative editor built for designers who value
          precision and simplicity. Part of the 5ingular Graphic ecosystem.
        </p>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ShortcutModal
// ─────────────────────────────────────────────────────────────────────────────
const SHORTCUTS = [
  { key: "V", desc: "Select Tool" },
  { key: "T", desc: "Text Tool" },
  { key: "R", desc: "Rectangle Tool" },
  { key: "O", desc: "Ellipse Tool" },
  { key: "H", desc: "Hand / Pan Tool" },
  { key: "Ctrl + Z", desc: "Undo" },
  { key: "Ctrl + Shift + Z", desc: "Redo" },
  { key: "Ctrl + C", desc: "Copy" },
  { key: "Ctrl + V", desc: "Paste" },
  { key: "Ctrl + D", desc: "Duplicate" },
  { key: "Ctrl + S", desc: "Save" },
  { key: "Ctrl + A", desc: "Select All" },
  { key: "Del / Backspace", desc: "Delete Selected" },
  { key: "Shift + Arrow", desc: "Move 10px" },
  { key: "Scroll", desc: "Zoom In / Out" },
  { key: "Alt + Drag", desc: "Pan Canvas" },
];

function ShortcutModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-2xl shadow-2xl w-full max-w-sm flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#333]">
          <span className="text-sm font-bold text-white">Keyboard Shortcuts</span>
          <button onClick={onClose} className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-400">
            <X size={12} />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh] p-4 flex flex-col gap-1">
          {SHORTCUTS.map((s) => (
            <div key={s.key} className="flex items-center justify-between py-1.5 border-b border-[#2a2a2a] last:border-0">
              <span className="text-xs text-zinc-400">{s.desc}</span>
              <kbd className="text-[10px] font-mono font-semibold bg-[#2a2a2a] border border-[#444] text-zinc-300 px-2 py-0.5 rounded">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  EditorApp
// ─────────────────────────────────────────────────────────────────────────────
function EditorApp() {
  const { canvasRef } = useCanvas();
  const {
    activeTool, setActiveTool,
    setDirty, isDirty,
    canvasPreset, setCanvasPreset,
    reorderLayers,
    clipboard, setClipboard,
    projectName, setProjectName,
    isNewProjectModalOpen, setNewProjectModalOpen,
    isConfirmModalOpen, setConfirmModalOpen,
    isAboutModalOpen, setAboutModalOpen,
    isShortcutModalOpen, setShortcutModalOpen,
  } = useEditorStore();
  const { undo, redo, canUndo, canRedo, clear: clearHistory, pushSnapshot } = useHistoryStore();

  const [mobileWarning, setMobileWarning] = useState(false);

  // Restore a JSON snapshot and always ensure the docBg is present
  const restoreSnapshot = useCallback((json: string) => {
    const canvas = canvasRef.current;
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
    }).catch((err) => {
      console.error("Gagal restore:", err);
      (canvas as any).historyLoading = false;
    });
  }, [canvasRef]);

  // ── AI Co-Designer Command Execution ──────────────────────────────────────
  const handleExecuteCommand = useCallback((command: { tool: string; args: any }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let modified = false;

    switch (command.tool) {
      case "changeBackgroundColor": {
        const bg = canvas.getObjects().find((o: any) => o.id === DOC_BG_ID);
        if (bg && command.args?.color) {
          bg.set("fill", command.args.color);
          modified = true;
        }
        break;
      }

      case "addText": {
        const { text, fill, fontSize } = command.args || {};
        if (text) {
          const textObj = new fabric.Textbox(text, {
            left: 50,
            top: 50,
            fontSize: fontSize || 32,
            fill: fill || "#000000",
            fontFamily: "Geist",
            id: `l-${Date.now()}-${Math.random()}`,
          } as any);
          canvas.add(textObj);
          canvas.setActiveObject(textObj);
          modified = true;
        }
        break;
      }

      case "addRectangle": {
        const { width, height, fill } = command.args || {};
        const rectObj = new fabric.Rect({
          left: 100,
          top: 100,
          width: width || 150,
          height: height || 100,
          fill: fill || "#22e605",
          id: `l-${Date.now()}-${Math.random()}`,
        } as any);
        canvas.add(rectObj);
        canvas.setActiveObject(rectObj);
        modified = true;
        break;
      }

      case "addCircle": {
        const { radius, fill } = command.args || {};
        const circleObj = new fabric.Circle({
          left: 100,
          top: 100,
          radius: radius || 50,
          fill: fill || "#10b981",
          id: `l-${Date.now()}-${Math.random()}`,
        } as any);
        canvas.add(circleObj);
        canvas.setActiveObject(circleObj);
        modified = true;
        break;
      }

      case "clearCanvas": {
        const objs = canvas.getObjects().filter((o: any) => o.id !== DOC_BG_ID);
        objs.forEach((o) => canvas.remove(o));
        modified = true;
        break;
      }

      default:
        console.warn("Unknown AI tool call:", command.tool);
    }

    if (modified) {
      canvas.renderAll();
      setDirty(true);
      pushSnapshot(JSON.stringify((canvas as any).toJSON(["id", "name"])));
    }
  }, [canvasRef, setDirty, pushSnapshot]);

  // ── Save to localStorage ──────────────────────────────────────────────────
  const handleSave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fullJson = (canvas as any).toJSON(["id", "name"]);
    fullJson.objects = (fullJson.objects || []).filter((o: any) => o.id !== DOC_BG_ID);
    localStorage.setItem("singular_editor_save", JSON.stringify(fullJson));
    localStorage.setItem("singular_editor_preset", JSON.stringify(canvasPreset));
    setDirty(false);
  }, [canvasRef, canvasPreset, setDirty]);

  // ── Reset canvas to fresh state ───────────────────────────────────────────
  const resetToNewProject = useCallback((preset: CanvasPreset, name: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Update store
    setCanvasPreset(preset);
    setProjectName(name);
    setDirty(false);
    setActiveTool("select");
    setClipboard(null);
    clearHistory();

    // Persist preset, clear saved canvas
    localStorage.setItem("singular_editor_preset", JSON.stringify(preset));
    localStorage.removeItem("singular_editor_save");

    // Clear canvas and add a fresh background
    (canvas as any).historyLoading = true;
    canvas.clear();
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

    const bg = new fabric.Rect({
      left: 0, top: 0,
      width: preset.width,
      height: preset.height,
      fill: preset.bgColor || "#ffffff",
      selectable: false, evented: false,
      hasControls: false, hasBorders: false,
      hoverCursor: "default",
      id: DOC_BG_ID, name: DOC_BG_ID,
      shadow: new fabric.Shadow({ color: "rgba(0,0,0,0.15)", blur: 30, offsetX: 0, offsetY: 6 }),
    } as any);
    canvas.add(bg);

    // Fit the new canvas to the viewport
    const containerW = (canvas as any).width;
    const containerH = (canvas as any).height;
    const fitZoom = Math.min((containerW - 80) / preset.width, (containerH - 80) / preset.height, 1);
    const offsetX = (containerW - preset.width * fitZoom) / 2;
    const offsetY = (containerH - preset.height * fitZoom) / 2;
    canvas.setViewportTransform([fitZoom, 0, 0, fitZoom, offsetX, offsetY]);
    useEditorStore.getState().setZoom(fitZoom);

    canvas.renderAll();
    (canvas as any).historyLoading = false;
    (canvas as any).fire("history:restored");
  }, [canvasRef, setCanvasPreset, setProjectName, setDirty, setActiveTool, setClipboard, clearHistory]);

  // ── New Project flow ──────────────────────────────────────────────────────
  const handleConfirmSave = useCallback(() => {
    handleSave();
    setConfirmModalOpen(false);
    setNewProjectModalOpen(true);
  }, [handleSave, setConfirmModalOpen, setNewProjectModalOpen]);

  const handleDontSave = useCallback(() => {
    setConfirmModalOpen(false);
    setNewProjectModalOpen(true);
  }, [setConfirmModalOpen, setNewProjectModalOpen]);

  const handleNewProjectConfirm = useCallback((preset: CanvasPreset, name: string) => {
    setNewProjectModalOpen(false);
    resetToNewProject(preset, name);
  }, [setNewProjectModalOpen, resetToNewProject]);

  // ── Check mobile ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMobileWarning(window.innerWidth < 768);
    }
  }, []);

  // ── Global Keyboard Shortcuts ─────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable ||
        (canvasRef.current?.getActiveObject() as any)?.isEditing
      ) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const active = canvas.getActiveObject() as any;

      // Undo
      if (e.ctrlKey && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        if (canUndo()) { const j = undo(); if (j) restoreSnapshot(j); }
      }
      // Redo
      if ((e.ctrlKey && e.key.toLowerCase() === "z" && e.shiftKey) ||
          (e.ctrlKey && e.key.toLowerCase() === "y")) {
        e.preventDefault();
        if (canRedo()) { const j = redo(); if (j) restoreSnapshot(j); }
      }
      // Save
      if (e.ctrlKey && e.key.toLowerCase() === "s" && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      }
      // Copy
      if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        if (active) active.clone().then((c: any) => setClipboard(c));
      }
      // Paste
      if (e.ctrlKey && e.key.toLowerCase() === "v") {
        e.preventDefault();
        if (clipboard) {
          clipboard.clone().then((cloned: any) => {
            canvas.discardActiveObject();
            cloned.set({ left: (cloned.left || 0) + 20, top: (cloned.top || 0) + 20, id: `l-${Date.now()}`, evented: true });
            if (cloned.type === "activeSelection") {
              cloned.canvas = canvas;
              cloned.forEachObject((o: any) => canvas.add(o));
              canvas.setActiveObject(cloned);
            } else { canvas.add(cloned); canvas.setActiveObject(cloned); }
            setClipboard(cloned);
            canvas.requestRenderAll();
            setDirty(true);
          });
        }
      }
      // Delete
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        if (active) {
          if (active.type === "activeSelection") {
            (active as fabric.ActiveSelection).forEachObject((o) => canvas.remove(o));
          } else { canvas.remove(active); }
          canvas.discardActiveObject();
          canvas.renderAll();
          setDirty(true);
        }
      }
      // Duplicate
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        if (active) {
          active.clone().then((cloned: any) => {
            cloned.set({ left: (active.left || 0) + 24, top: (active.top || 0) + 24, id: `l-${Date.now()}` });
            canvas.add(cloned);
            canvas.setActiveObject(cloned);
            canvas.requestRenderAll();
            setDirty(true);
          });
        }
      }
      // Arrow keys
      if (active && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        if (e.key === "ArrowUp")    active.set("top",  (active.top  || 0) - step);
        if (e.key === "ArrowDown")  active.set("top",  (active.top  || 0) + step);
        if (e.key === "ArrowLeft")  active.set("left", (active.left || 0) - step);
        if (e.key === "ArrowRight") active.set("left", (active.left || 0) + step);
        canvas.renderAll();
        setDirty(true);
      }
      // Tool shortcuts
      if (!e.ctrlKey && !e.altKey) {
        if (e.key.toLowerCase() === "t") { e.preventDefault(); setActiveTool("text"); }
        if (e.key.toLowerCase() === "r") { e.preventDefault(); setActiveTool("rect"); }
        if (e.key.toLowerCase() === "o") { e.preventDefault(); setActiveTool("circle"); }
        if (e.key.toLowerCase() === "v") { e.preventDefault(); setActiveTool("select"); }
        if (e.key.toLowerCase() === "h") { e.preventDefault(); setActiveTool("hand"); }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clipboard, canUndo, canRedo, undo, redo, canvasRef, restoreSnapshot, setActiveTool, setDirty, setClipboard, handleSave]);

  // ─────────────────────────────────────────────────────────────────────────
  //  Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-zinc-100">
      {/* Mobile warning */}
      {mobileWarning && (
        <div className="bg-amber-500 text-white px-6 py-3.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider z-50 shadow-md">
          <div className="flex items-center gap-2">
            <AlertCircle size={15} />
            <span>Creative Editor is best experienced on Desktop. Mobile layout is view-only.</span>
          </div>
          <button onClick={() => setMobileWarning(false)} className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Menu Bar (dark, sits at very top) */}
      <MenuBar />

      {/* Top Toolbar */}
      <TopToolbar />

      {/* Workspace */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        <LeftToolbar />
        <LayersPanel />
        <CanvasWorkspace />
        <RightPanel />
        <AIChatSidebar onExecuteCommand={handleExecuteCommand} />
      </div>

      {/* Status bar */}
      <StatusBar />

      {/* Onboarding */}
      <OnboardingOverlay />

      {/* ── Modals ── */}
      {isConfirmModalOpen && (
        <ConfirmSaveModal
          onSave={handleConfirmSave}
          onDontSave={handleDontSave}
          onCancel={() => setConfirmModalOpen(false)}
        />
      )}
      {isNewProjectModalOpen && (
        <NewProjectModal
          onConfirm={handleNewProjectConfirm}
          onCancel={() => setNewProjectModalOpen(false)}
        />
      )}
      {isAboutModalOpen && (
        <AboutModal onClose={() => setAboutModalOpen(false)} />
      )}
      {isShortcutModalOpen && (
        <ShortcutModal onClose={() => setShortcutModalOpen(false)} />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Page export
// ─────────────────────────────────────────────────────────────────────────────
export default function CreativeEditorPage() {
  return (
    <CanvasProvider>
      <OnboardingProvider>
        <EditorApp />
      </OnboardingProvider>
    </CanvasProvider>
  );
}
