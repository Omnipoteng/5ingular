"use client";

import React, { useState } from "react";
import { X, Download, Sliders } from "lucide-react";
import { useCanvas } from "@/lib/editor/canvasContext";
import { useEditorStore } from "@/lib/editor/editorStore";

interface ExportModalProps {
  onClose: () => void;
}

type ExportFormat = "PNG" | "JPG" | "WEBP";

export default function ExportModal({ onClose }: ExportModalProps) {
  const { canvasRef } = useCanvas();
  const { canvasPreset } = useEditorStore();
  const [format, setFormat] = useState<ExportFormat>("PNG");
  const [quality, setQuality] = useState(90);
  const [scale, setScale] = useState(1);
  const [transparent, setTransparent] = useState(false);

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const docWidth = canvasPreset.width;
    const docHeight = canvasPreset.height;

    // Locate the document-background rect
    const docBg: any = canvas
      .getObjects()
      .find((o: any) => o.id === "__docbg__");

    try {
      // Handle transparency: hide or show the docBg fill
      if (transparent && format !== "JPG") {
        if (docBg) docBg.visible = false;
      } else {
        if (docBg) {
          docBg.visible = true;
          // Restore the original fill — read from the stored object
          // (bgColor might be black, white, etc.)
          // We do NOT force it to white here.
        }
      }
      canvas.renderAll();

      // Use scene-space crop: the document always sits at (0,0) in scene space
      // with dimensions (docWidth x docHeight). The multiplier handles scale.
      // This approach does NOT mutate the viewport or canvas dimensions.
      const dataURL = canvas.toDataURL({
        format: (format === "JPG" ? "jpeg" : format.toLowerCase()) as any,
        quality: quality / 100,
        multiplier: scale,
        left: 0,
        top: 0,
        width: docWidth,
        height: docHeight,
      } as any);

      const link = document.createElement("a");
      link.download = `singular-export-${Date.now()}.${format.toLowerCase()}`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to export canvas:", err);
      alert(
        "Gagal mengekspor. Pastikan tidak ada gambar eksternal yang melanggar kebijakan CORS."
      );
    } finally {
      // Restore docBg visibility
      if (docBg) docBg.visible = true;
      canvas.renderAll();
      onClose();
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4">
      <div
        className="bg-white border border-zinc-200 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <Sliders size={16} className="text-blue-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-800">
              Export Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-zinc-50 hover:bg-zinc-100 text-zinc-500 flex items-center justify-center transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Format Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              File Format
            </label>
            <div className="grid grid-cols-3 gap-2 bg-zinc-50 border border-zinc-200 rounded-xl p-1">
              {(["PNG", "JPG", "WEBP"] as ExportFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => {
                    setFormat(fmt);
                    if (fmt === "JPG") setTransparent(false);
                  }}
                  className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    format === fmt
                      ? "bg-white text-blue-600 shadow-sm border border-zinc-200/50"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Scale Multiplier */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Scale Multiplier (Resolution)
            </label>
            <div className="grid grid-cols-3 gap-2 bg-zinc-50 border border-zinc-200 rounded-xl p-1">
              {([1, 2, 3] as const).map((sc) => (
                <button
                  key={sc}
                  onClick={() => setScale(sc)}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                    scale === sc
                      ? "bg-white text-blue-600 shadow-sm border border-zinc-200/50"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {sc}x
                </button>
              ))}
            </div>
          </div>

          {/* Quality Slider (for JPG & WEBP) */}
          {format !== "PNG" && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                <label>Quality</label>
                <span className="text-blue-600">{quality}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          )}

          {/* Transparent Background (for PNG & WEBP) */}
          {format !== "JPG" && (
            <label className="flex items-center gap-3 cursor-pointer select-none py-1">
              <input
                type="checkbox"
                checked={transparent}
                onChange={(e) => setTransparent(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-zinc-50 border-zinc-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs font-medium text-zinc-600">
                Transparent Background
              </span>
            </label>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Download size={14} />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
