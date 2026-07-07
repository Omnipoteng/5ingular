"use client";

import React, { useState } from "react";
import {
  Undo2,
  Redo2,
  Save,
  Download,
  Settings,
  Grid,
  Magnet,
  Eye,
  Plus,
  Minus,
  Maximize,
} from "lucide-react";
import * as fabric from "fabric";
import { useEditorStore } from "@/lib/editor/editorStore";
import { useHistoryStore } from "@/lib/editor/historyStore";
import { useCanvas } from "@/lib/editor/canvasContext";
import ExportModal from "./ExportModal";
import CanvasSizeModal from "./CanvasSizeModal";

export default function TopToolbar() {
  const {
    canvasPreset,
    zoom,
    setZoom,
    gridEnabled,
    toggleGrid,
    snapEnabled,
    toggleSnap,
    isDirty,
    setDirty,
    projectName,
  } = useEditorStore();

  const { canUndo, canRedo, undo, redo } = useHistoryStore();
  const { canvasRef } = useCanvas();

  const [exportOpen, setExportOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);

  const restoreSnapshot = (json: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    (canvas as any).historyLoading = true;
    canvas.loadFromJSON(json).then(() => {
      // Ensure the white document background is always present and at the back
      const hasBg = canvas.getObjects().some((o: any) => o.id === "__docbg__");
      if (!hasBg) {
        const { canvasPreset: preset } = useEditorStore.getState();
        const bg = new fabric.Rect({
          left: 0, top: 0,
          width: preset.width, height: preset.height,
          fill: preset.bgColor || "#ffffff",
          selectable: false, evented: false,
          hasControls: false, hasBorders: false,
          hoverCursor: "default",
          id: "__docbg__", name: "__docbg__",
        } as any);
        canvas.add(bg);
        canvas.sendObjectToBack(bg);
      }
      canvas.renderAll();
      (canvas as any).historyLoading = false;
      (canvas as any).fire("history:restored");
    }).catch((err) => {
      console.error("Gagal melakukan undo/redo restore:", err);
      (canvas as any).historyLoading = false;
    });
  };

  const handleUndo = () => {
    if (!canvasRef.current || !canUndo()) return;
    const json = undo();
    if (json) restoreSnapshot(json);
  };

  const handleRedo = () => {
    if (!canvasRef.current || !canRedo()) return;
    const json = redo();
    if (json) restoreSnapshot(json);
  };

  const handleSave = () => {
    if (!canvasRef.current) return;
    // Serialize canvas but strip the reserved doc-background rect so
    // CanvasWorkspace always creates a fresh one on the next load.
    const fullJson = (canvasRef.current as any).toJSON(["id", "name"]);
    fullJson.objects = (fullJson.objects || []).filter(
      (o: any) => o.id !== "__docbg__"
    );
    localStorage.setItem("singular_editor_save", JSON.stringify(fullJson));
    localStorage.setItem("singular_editor_preset", JSON.stringify(canvasPreset));
    setDirty(false);
    // Brief visual confirmation instead of a blocking alert
    const btn = document.querySelector("[data-save-btn]") as HTMLElement | null;
    if (btn) {
      const orig = btn.innerText;
      btn.innerText = "Saved ✓";
      setTimeout(() => { btn.innerText = orig; }, 1500);
    }
  };

  return (
    <>
      <header data-tour="top-toolbar" className="h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-6 z-20 shadow-sm flex-shrink-0">
        {/* Left: Project title & save status */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold tracking-tight text-zinc-900">
            5ingular <span className="text-blue-600">Editor</span>
          </span>
          <div className="h-4 w-px bg-zinc-200" />
          <span className="text-xs font-light text-zinc-400 max-w-[160px] truncate">
            {projectName}
          </span>
          {isDirty && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Unsaved changes" />
          )}
        </div>

        {/* Center: Presets & Tools */}
        <div className="flex items-center gap-3">
          {/* Preset size button */}
          <button
            onClick={() => setSizeOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            <Settings size={13} />
            <span>{canvasPreset.name} ({canvasPreset.width}x{canvasPreset.height})</span>
          </button>

          <div className="h-4 w-px bg-zinc-200" />

          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleUndo}
              disabled={!canUndo()}
              className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 disabled:opacity-40 disabled:hover:bg-transparent"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={15} />
            </button>
            <button
              onClick={handleRedo}
              disabled={!canRedo()}
              className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 disabled:opacity-40 disabled:hover:bg-transparent"
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo2 size={15} />
            </button>
          </div>

          <div className="h-4 w-px bg-zinc-200" />

          {/* Grid & Snap toggles */}
          <button
            onClick={toggleGrid}
            className={`p-1.5 rounded-lg border transition-all ${
              gridEnabled
                ? "bg-blue-50 border-blue-200 text-blue-600"
                : "border-zinc-200 text-zinc-500 hover:bg-zinc-50"
            }`}
            title="Toggle Grid"
          >
            <Grid size={15} />
          </button>

          <button
            onClick={toggleSnap}
            className={`p-1.5 rounded-lg border transition-all ${
              snapEnabled
                ? "bg-blue-50 border-blue-200 text-blue-600"
                : "border-zinc-200 text-zinc-500 hover:bg-zinc-50"
            }`}
            title="Toggle Snap Guides"
          >
            <Magnet size={15} />
          </button>
        </div>

        {/* Right: Zoom & Export */}
        <div className="flex items-center gap-4">
          {/* Zoom controls */}
          <div data-tour="zoom-controls" className="flex items-center bg-zinc-50 border border-zinc-200 rounded-lg p-0.5">
            <button
              onClick={() => setZoom(zoom - 0.05)}
              className="p-1 rounded text-zinc-500 hover:bg-white transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="text-[10px] font-bold text-zinc-600 px-2 min-w-[45px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(zoom + 0.05)}
              className="p-1 rounded text-zinc-500 hover:bg-white transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>

          <button
            onClick={handleSave}
            data-save-btn
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors"
            title="Simpan Proyek (Ctrl+S)"
          >
            <Save size={14} />
            <span>Save</span>
          </button>

          <button
            data-tour="export-button"
            onClick={() => setExportOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
          >
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>
      </header>

      {/* Preset Modal */}
      {sizeOpen && <CanvasSizeModal onClose={() => setSizeOpen(false)} />}

      {/* Export Modal */}
      {exportOpen && <ExportModal onClose={() => setExportOpen(false)} />}
    </>
  );
}
