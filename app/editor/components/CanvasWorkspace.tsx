"use client";

import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useEditorStore } from "@/lib/editor/editorStore";
import { useHistoryStore } from "@/lib/editor/historyStore";
import { useCanvas } from "@/lib/editor/canvasContext";
import { Layer, SelectedObjectType } from "@/lib/editor/types";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

// Reserved ID for the white document background rect
const DOC_BG_ID = "__docbg__";

// CSS cursors per tool
const TOOL_CURSORS: Record<string, string> = {
  select: "default",
  text: "text",
  rect: "crosshair",
  circle: "crosshair",
  line: "crosshair",
  image: "default",
  hand: "grab",
  zoom: "zoom-in",
  gradient: "crosshair",
  mask: "default",
  crop: "crosshair",
  colorpicker: "crosshair",
};

export default function CanvasWorkspace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { canvasRef } = useCanvas();
  const {
    activeTool,
    setActiveTool,
    canvasPreset,
    zoom,
    setZoom,
    gridEnabled,
    snapEnabled,
    layers,
    setLayers,
    updateLayer,
    setSelectedLayerId,
    setSelectedObjectType,
    setDirty,
  } = useEditorStore();

  const { pushSnapshot } = useHistoryStore();

  // ─── Refs to avoid stale closures inside Fabric event handlers ───────────
  const activeToolRef = useRef(activeTool);
  const layerCountRef = useRef(0);
  // Prevents useEffect([zoom]) from re-applying zoom that was already set via
  // canvas.zoomToPoint() in the wheel handler.
  const suppressZoomEffectRef = useRef(false);

  useEffect(() => {
    activeToolRef.current = activeTool;
  }, [activeTool]);

  useEffect(() => {
    layerCountRef.current = layers.length;
  }, [layers]);

  // ─── CANVAS INITIALIZATION ────────────────────────────────────────────────
  useEffect(() => {
    if (!canvasElementRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const docWidth = canvasPreset.width;
    const docHeight = canvasPreset.height;
    // Use the actual container size (flex-1 will fill the remaining space)
    const containerW = Math.max(container.clientWidth || 0, 600);
    const containerH = Math.max(container.clientHeight || 0, 400);

    // Create Fabric canvas sized to the entire workspace — not just the document
    const canvas = new fabric.Canvas(canvasElementRef.current, {
      width: containerW,
      height: containerH,
      backgroundColor: "#d4d4d4",
      preserveObjectStacking: true,
      selectionColor: "rgba(37, 99, 235, 0.08)",
      selectionBorderColor: "#2563eb",
      selectionLineWidth: 1,
    });

    canvasRef.current = canvas;

    // ── White document background (always locked, never selectable) ─────────
    const createDocBg = () =>
      new fabric.Rect({
        left: 0,
        top: 0,
        width: docWidth,
        height: docHeight,
        fill: "#ffffff",
        selectable: false,
        evented: false,
        hasControls: false,
        hasBorders: false,
        hoverCursor: "default",
        id: DOC_BG_ID,
        name: DOC_BG_ID,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.15)",
          blur: 30,
          offsetX: 0,
          offsetY: 6,
        }),
      } as any);

    // ── Fit-to-screen initial viewport transform ────────────────────────────
    const fitZoomX = (containerW - 80) / docWidth;
    const fitZoomY = (containerH - 80) / docHeight;
    const fitZoom = Math.min(fitZoomX, fitZoomY, 1);
    const offsetX = (containerW - docWidth * fitZoom) / 2;
    const offsetY = (containerH - docHeight * fitZoom) / 2;
    canvas.setViewportTransform([fitZoom, 0, 0, fitZoom, offsetX, offsetY]);
    suppressZoomEffectRef.current = true;
    setZoom(fitZoom);

    // ── Layer synchronisation ───────────────────────────────────────────────
    const syncLayers = () => {
      const objs = canvas.getObjects().filter((o: any) => o.id !== DOC_BG_ID);
      const list: Layer[] = [...objs].reverse().map((obj: any) => ({
        id: obj.id || `l-${Date.now()}-${Math.random()}`,
        name:
          obj.name ||
          `${(obj.type as string).charAt(0).toUpperCase()}${(
            obj.type as string
          ).slice(1)}`,
        type: (obj.type === "i-text"
          ? "text"
          : obj.type === "image"
          ? "image"
          : obj.type === "rect"
          ? "rect"
          : obj.type === "ellipse"
          ? "ellipse"
          : "other") as Layer["type"],
        visible: obj.visible ?? true,
        locked: !!(obj.lockMovementX),
      }));
      setLayers(list);
    };

    // ── Restore project from LocalStorage ──────────────────────────────────
    let isLoading = false;
    const savedStr = localStorage.getItem("singular_editor_save");
    if (savedStr) {
      try {
        const savedData = JSON.parse(savedStr);
        isLoading = true;
        canvas.loadFromJSON(savedData, () => {
          isLoading = false;
          // loadFromJSON clears everything; re-add the doc background
          const bg = createDocBg();
          canvas.add(bg);
          canvas.sendObjectToBack(bg);
          canvas.renderAll();
          syncLayers();
          pushSnapshot(JSON.stringify((canvas as any).toJSON(["id", "name"])));
        });
      } catch {
        isLoading = false;
        const bg = createDocBg();
        canvas.add(bg);
        pushSnapshot(JSON.stringify((canvas as any).toJSON(["id", "name"])));
      }
    } else {
      const bg = createDocBg();
      canvas.add(bg);
      pushSnapshot(JSON.stringify((canvas as any).toJSON(["id", "name"])));
    }

    // ── Canvas object events ────────────────────────────────────────────────
    canvas.on("object:added", (opt: any) => {
      if (isLoading) return;
      if ((opt.target as any)?.id === DOC_BG_ID) return;
      syncLayers();
      setDirty(true);
      pushSnapshot(JSON.stringify((canvas as any).toJSON(["id", "name"])));
    });

    canvas.on("object:removed", (opt: any) => {
      if ((opt.target as any)?.id === DOC_BG_ID) return;
      syncLayers();
      setDirty(true);
      pushSnapshot(JSON.stringify((canvas as any).toJSON(["id", "name"])));
    });

    canvas.on("object:modified", () => {
      setDirty(true);
      pushSnapshot(JSON.stringify((canvas as any).toJSON(["id", "name"])));
    });

    // Auto-rename text layers from their content (up to 25 chars)
    canvas.on("text:changed", (opt: any) => {
      const obj = opt.target as any;
      if (obj?.id && obj.id !== DOC_BG_ID) {
        const raw: string = obj.text || "";
        const label =
          raw.length > 25 ? raw.slice(0, 25) + "…" : raw || "Text";
        obj.name = label;
        updateLayer(obj.id, { name: label });
      }
      setDirty(true);
    });

    canvas.on("text:editing:exited", () => {
      syncLayers();
      pushSnapshot(JSON.stringify((canvas as any).toJSON(["id", "name"])));
    });

    // ── Selection events ────────────────────────────────────────────────────
    const handleSelectionChange = () => {
      const active = canvas.getActiveObject() as any;
      if (!active || active.id === DOC_BG_ID) {
        setSelectedLayerId(null);
        setSelectedObjectType("none");
        return;
      }
      setSelectedLayerId(active.id || null);
      const t = active.type as string;
      const type: SelectedObjectType =
        t === "i-text"
          ? "text"
          : t === "image"
          ? "image"
          : t === "rect"
          ? "rect"
          : t === "ellipse"
          ? "ellipse"
          : t === "line"
          ? "line"
          : "none";
      setSelectedObjectType(type);
    };

    canvas.on("selection:created", handleSelectionChange);
    canvas.on("selection:updated", handleSelectionChange);
    canvas.on("selection:cleared", () => {
      setSelectedLayerId(null);
      setSelectedObjectType("none");
    });

    // ── Mouse-wheel zoom: zooms to cursor position (stable, no jump) ────────
    canvas.on("mouse:wheel", (opt) => {
      opt.e.preventDefault();
      opt.e.stopPropagation();
      const delta = opt.e.deltaY;
      let newZoom = canvas.getZoom() * (delta < 0 ? 1.1 : 0.9);
      newZoom = Math.max(0.05, Math.min(8, newZoom));
      // Zoom to the exact cursor position so the scene stays anchored
      canvas.zoomToPoint(
        new fabric.Point(opt.e.offsetX, opt.e.offsetY),
        newZoom
      );
      // Signal the useEffect([zoom]) to skip — zoom already applied above
      suppressZoomEffectRef.current = true;
      setZoom(newZoom);
    });

    // ── Mouse interactions: draw shapes, create text, pan ──────────────────
    let isDrawing = false;
    let drawStart = { x: 0, y: 0 };
    let activeShape: any = null;
    let isPanning = false;
    let lastPanX = 0;
    let lastPanY = 0;

    canvas.on("mouse:down", (opt: any) => {
      const tool = activeToolRef.current;
      const pointer = canvas.getScenePoint(opt.e);
      const evt = opt.e as MouseEvent;

      // Exit text editing when clicking outside the current text object
      const editingObj = canvas.getActiveObject() as any;
      if (editingObj?.isEditing && opt.target !== editingObj) {
        editingObj.exitEditing();
      }

      // ── Pan with Hand tool or Alt key ──────────────────────────────────
      if (tool === "hand" || evt.altKey) {
        isPanning = true;
        lastPanX = evt.clientX;
        lastPanY = evt.clientY;
        canvas.selection = false;
        canvas.defaultCursor = "grabbing";
        return;
      }

      // ── Text tool: single click → create IText → enter edit immediately ─
      if (tool === "text" && !opt.target) {
        const count = layerCountRef.current + 1;
        const id = `l-${Date.now()}`;
        const textObj = new fabric.IText("", {
          left: pointer.x,
          top: pointer.y,
          fontSize: 30,
          fill: "#171717",
          fontFamily: "Geist, Inter, sans-serif",
          id,
          name: `Text ${count}`,
        } as any);
        canvas.add(textObj);
        canvas.setActiveObject(textObj);
        textObj.enterEditing();
        canvas.renderAll();
        // Don't switch to select yet — user is actively typing
        return;
      }

      // ── Shape tools: start drag-to-draw ───────────────────────────────
      if (
        ["rect", "circle", "line"].includes(tool) &&
        !opt.target
      ) {
        isDrawing = true;
        drawStart = { x: pointer.x, y: pointer.y };
        canvas.selection = false;
        const count = layerCountRef.current + 1;
        const id = `l-${Date.now()}`;

        if (tool === "rect") {
          activeShape = new fabric.Rect({
            left: pointer.x,
            top: pointer.y,
            width: 1,
            height: 1,
            fill: "#3b82f6",
            strokeWidth: 0,
            rx: 0,
            ry: 0,
            id,
            name: `Rectangle ${count}`,
          } as any);
        } else if (tool === "circle") {
          activeShape = new fabric.Ellipse({
            left: pointer.x,
            top: pointer.y,
            rx: 0,
            ry: 0,
            fill: "#10b981",
            strokeWidth: 0,
            id,
            name: `Circle ${count}`,
          } as any);
        } else if (tool === "line") {
          activeShape = new fabric.Line(
            [pointer.x, pointer.y, pointer.x, pointer.y],
            {
              stroke: "#1f2937",
              strokeWidth: 3,
              id,
              name: `Line ${count}`,
            } as any
          );
        }

        if (activeShape) {
          canvas.add(activeShape);
        }
      }
    });

    canvas.on("mouse:move", (opt: any) => {
      const evt = opt.e as MouseEvent;

      if (isPanning) {
        const vpt = canvas.viewportTransform!;
        vpt[4] += evt.clientX - lastPanX;
        vpt[5] += evt.clientY - lastPanY;
        canvas.requestRenderAll();
        lastPanX = evt.clientX;
        lastPanY = evt.clientY;
        return;
      }

      if (isDrawing && activeShape) {
        const pointer = canvas.getScenePoint(opt.e);
        const dx = pointer.x - drawStart.x;
        const dy = pointer.y - drawStart.y;
        const tool = activeToolRef.current;

        if (tool === "rect") {
          activeShape.set({
            left: Math.min(pointer.x, drawStart.x),
            top: Math.min(pointer.y, drawStart.y),
            width: Math.abs(dx),
            height: Math.abs(dy),
          });
        } else if (tool === "circle") {
          activeShape.set({
            left: Math.min(pointer.x, drawStart.x),
            top: Math.min(pointer.y, drawStart.y),
            rx: Math.abs(dx) / 2,
            ry: Math.abs(dy) / 2,
          });
        } else if (tool === "line") {
          activeShape.set({ x2: pointer.x, y2: pointer.y });
        }
        canvas.renderAll();
      }
    });

    canvas.on("mouse:up", () => {
      if (isPanning) {
        isPanning = false;
        canvas.selection = true;
        canvas.defaultCursor =
          TOOL_CURSORS[activeToolRef.current] || "default";
        return;
      }

      if (isDrawing && activeShape) {
        isDrawing = false;
        canvas.selection = true;
        const tool = activeToolRef.current;

        // If user just clicked without dragging → give a default size
        const w =
          activeShape.width ||
          (activeShape.rx ? activeShape.rx * 2 : 0);
        const h =
          activeShape.height ||
          (activeShape.ry ? activeShape.ry * 2 : 0);

        if (tool === "rect" && (w < 5 || h < 5)) {
          activeShape.set({ width: 100, height: 100 });
        } else if (
          tool === "circle" &&
          ((activeShape.rx || 0) < 3 || (activeShape.ry || 0) < 3)
        ) {
          activeShape.set({ rx: 50, ry: 50 });
        }

        activeShape.setCoords();
        canvas.setActiveObject(activeShape);
        canvas.renderAll();
        setActiveTool("select");
        activeShape = null;
      }
    });

    // ── Snap-to-center guide ────────────────────────────────────────────────
    if (snapEnabled) {
      canvas.on("object:moving", (e) => {
        const obj = e.target as any;
        if (!obj || obj.id === DOC_BG_ID) return;
        const snapRange = 8 / canvas.getZoom();
        const cx = docWidth / 2;
        const cy = docHeight / 2;
        const ow = (obj.width || 0) * (obj.scaleX || 1);
        const oh = (obj.height || 0) * (obj.scaleY || 1);
        const objCX = (obj.left || 0) + ow / 2;
        const objCY = (obj.top || 0) + oh / 2;
        if (Math.abs(objCX - cx) < snapRange) obj.set("left", cx - ow / 2);
        if (Math.abs(objCY - cy) < snapRange) obj.set("top", cy - oh / 2);
      });
    }

    return () => {
      canvas.dispose();
      canvasRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasPreset, snapEnabled]);

  // ─── Update cursor & selection mode when active tool changes ─────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cursor = TOOL_CURSORS[activeTool] || "default";
    canvas.defaultCursor = cursor;
    canvas.hoverCursor = activeTool === "select" ? "move" : cursor;

    if (activeTool === "select") {
      canvas.selection = true;
      canvas.getObjects().forEach((o: any) => {
        if (o.id !== DOC_BG_ID) o.selectable = !o.lockMovementX;
      });
    } else {
      canvas.selection = false;
      canvas.getObjects().forEach((o: any) => {
        o.selectable = false;
      });
      // For tools that don't keep the current selection, deselect
      if (!["text", "rect", "circle", "line"].includes(activeTool)) {
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    }
  }, [activeTool]);

  // ─── Image tool: auto-trigger the file picker ─────────────────────────────
  useEffect(() => {
    if (activeTool === "image") {
      // Small delay to let the tool state settle before opening the dialog
      const t = setTimeout(() => fileInputRef.current?.click(), 50);
      return () => clearTimeout(t);
    }
  }, [activeTool]);

  // ─── Zoom from toolbar controls (not from wheel) ─────────────────────────
  // When zoom changes from toolbar buttons (+/-), apply it to the canvas
  // centred on the workspace. Wheel zoom bypasses this via the flag.
  useEffect(() => {
    if (suppressZoomEffectRef.current) {
      suppressZoomEffectRef.current = false;
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = (canvas.width || 800) / 2;
    const cy = (canvas.height || 600) / 2;
    canvas.zoomToPoint(new fabric.Point(cx, cy), zoom);
  }, [zoom]);

  // ─── Image upload handler ─────────────────────────────────────────────────
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvasRef.current) {
      setActiveTool("select");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target?.result;
      if (typeof data !== "string") return;

      const imgEl = new Image();
      imgEl.src = data;
      imgEl.onload = () => {
        const id = `l-${Date.now()}`;
        const name = file.name.replace(/\.[^.]+$/, "") || "Image";
        const img = new fabric.Image(imgEl, {
          left: 80,
          top: 80,
          id,
          name,
        } as any);
        if ((img.width || 0) > 500) img.scaleToWidth(500);
        canvasRef.current?.add(img);
        canvasRef.current?.setActiveObject(img);
        canvasRef.current?.renderAll();
        setActiveTool("select");
      };
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // ─── Alignment helpers ────────────────────────────────────────────────────
  const alignObjects = (
    dir: "left" | "center" | "right" | "top" | "middle" | "bottom"
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const obj = canvas.getActiveObject();
    if (!obj) return;
    const W = canvasPreset.width;
    const H = canvasPreset.height;
    const ow = (obj.width || 0) * (obj.scaleX || 1);
    const oh = (obj.height || 0) * (obj.scaleY || 1);
    if (dir === "left") obj.set("left", 0);
    else if (dir === "center") obj.set("left", W / 2 - ow / 2);
    else if (dir === "right") obj.set("left", W - ow);
    else if (dir === "top") obj.set("top", 0);
    else if (dir === "middle") obj.set("top", H / 2 - oh / 2);
    else if (dir === "bottom") obj.set("top", H - oh);
    canvas.renderAll();
    setDirty(true);
  };

  const workspaceCursor = TOOL_CURSORS[activeTool] || "default";

  return (
    <div
      ref={containerRef}
      data-tour="canvas"
      className="flex-1 relative overflow-hidden h-full"
      style={{ cursor: workspaceCursor, background: "#d4d4d4" }}
    >
      {/* Alignment overlay — top-left corner */}
      <div className="absolute top-4 left-4 flex gap-1 bg-white border border-zinc-200 rounded-xl p-1 shadow-sm z-10 pointer-events-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            alignObjects("left");
          }}
          className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100"
          title="Align Left"
        >
          <AlignLeft size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            alignObjects("center");
          }}
          className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100"
          title="Align Horizontal Center"
        >
          <AlignCenter size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            alignObjects("right");
          }}
          className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100"
          title="Align Right"
        >
          <AlignRight size={14} />
        </button>
        <div className="w-px h-5 bg-zinc-200 mx-0.5 self-center" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            alignObjects("top");
          }}
          className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 -rotate-90"
          title="Align Top"
        >
          <AlignLeft size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            alignObjects("middle");
          }}
          className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 -rotate-90"
          title="Align Vertical Middle"
        >
          <AlignCenter size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            alignObjects("bottom");
          }}
          className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 -rotate-90"
          title="Align Bottom"
        >
          <AlignRight size={14} />
        </button>
      </div>

      {/* Active tool badge — bottom-right */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-zinc-200 rounded-full px-3.5 py-1.5 shadow-sm z-10 text-[10px] font-bold uppercase tracking-widest text-zinc-500 pointer-events-none select-none">
        {activeTool === "select"
          ? "Selection"
          : activeTool === "text"
          ? "Text — Click to place"
          : ["rect", "circle", "line"].includes(activeTool)
          ? `${activeTool.charAt(0).toUpperCase()}${activeTool.slice(1)} — Drag to draw`
          : activeTool === "hand"
          ? "Pan — Drag to scroll"
          : activeTool}
      </div>

      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Fabric.js renders into this element; the canvas fills the workspace */}
      <canvas ref={canvasElementRef} />
    </div>
  );
}
