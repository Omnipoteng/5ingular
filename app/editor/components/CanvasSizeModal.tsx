"use client";

import React, { useState } from "react";
import { X, Settings, ArrowRight } from "lucide-react";
import { useEditorStore } from "@/lib/editor/editorStore";
import { CANVAS_PRESETS } from "@/lib/editor/canvasPresets";
import { CanvasPreset } from "@/lib/editor/types";

interface CanvasSizeModalProps {
  onClose: () => void;
}

export default function CanvasSizeModal({ onClose }: CanvasSizeModalProps) {
  const { setCanvasPreset } = useEditorStore();
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);
  const [customName, setCustomName] = useState("Custom Size");

  const selectPreset = (preset: CanvasPreset) => {
    setCanvasPreset(preset);
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (width > 50 && height > 50) {
      setCanvasPreset({
        name: customName || "Custom Size",
        width: Math.round(width),
        height: Math.round(height),
      });
      onClose();
    } else {
      alert("Dimensi kanvas minimal adalah 50x50 piksel.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4">
      <div
        className="bg-white border border-zinc-200 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Settings size={16} className="text-blue-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-800">
              Canvas Resize
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-zinc-50 hover:bg-zinc-100 text-zinc-500 flex items-center justify-center transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Presets List */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
              Select Preset
            </h4>
            <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto pr-2 border border-zinc-100 rounded-2xl p-2 bg-zinc-50/50">
              {CANVAS_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => selectPreset(preset)}
                  className="flex items-center justify-between p-3.5 bg-white hover:bg-blue-50/40 border border-zinc-200/60 hover:border-blue-150 rounded-xl text-left transition-all"
                >
                  <span className="text-xs font-semibold text-zinc-800">{preset.name}</span>
                  <span className="text-[10px] font-medium text-zinc-400">
                    {preset.width} &times; {preset.height} px
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Size Form */}
          <form onSubmit={handleCustomSubmit} className="flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Custom Dimension
              </h4>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="px-3.5 py-2 text-xs border border-zinc-200 rounded-xl focus:border-blue-600 focus:outline-none bg-zinc-50"
                  placeholder="e.g. Dribbble Shot"
                />
              </div>

              {/* Width / Height inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    min="50"
                    max="8000"
                    required
                    className="px-3.5 py-2 text-xs border border-zinc-200 rounded-xl focus:border-blue-600 focus:outline-none bg-zinc-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    min="50"
                    max="8000"
                    required
                    className="px-3.5 py-2 text-xs border border-zinc-200 rounded-xl focus:border-blue-600 focus:outline-none bg-zinc-50"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <span>Apply Size</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
