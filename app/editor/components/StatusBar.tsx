"use client";

import React, { useState, useRef, useEffect } from "react";
import { useEditorStore } from "@/lib/editor/editorStore";
import { MousePointer2, HelpCircle, HardDrive, BookOpen, RotateCcw, ChevronDown } from "lucide-react";
import { useOnboarding } from "@/hooks/useOnboarding";

export default function StatusBar() {
  const { activeTool, zoom, setZoom, isDirty, canvasPreset } = useEditorStore();
  const { startTutorial } = useOnboarding();
  const [helpOpen, setHelpOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);

  // Close help menu when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) {
        setHelpOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleRestartTutorial = () => {
    setHelpOpen(false);
    // Remove completion flag so tutorial can restart from step 0
    localStorage.removeItem("editor_onboarding_completed");
    startTutorial();
  };

  return (
    <footer className="h-9 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between px-6 z-20 text-zinc-500 text-[10px] font-medium tracking-wide uppercase flex-shrink-0 select-none shadow-sm">
      {/* Left: save details */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <HardDrive size={12} className="text-zinc-400" />
          <span>Local Storage Mode</span>
        </div>
        {isDirty ? (
          <span className="text-amber-600 font-semibold lowercase">
            (ada perubahan belum disimpan)
          </span>
        ) : (
          <span className="text-zinc-400 font-semibold lowercase">
            (tersimpan)
          </span>
        )}
      </div>

      {/* Center: active action label */}
      <div className="flex items-center gap-1.5">
        <MousePointer2 size={12} className="text-zinc-400" />
        <span>Active Tool: {activeTool}</span>
        <span className="text-zinc-300">&bull;</span>
        <span>Canvas: {canvasPreset.width} &times; {canvasPreset.height} px</span>
      </div>

      {/* Right: zoom shortcuts + help menu */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(0.5)}
            className="hover:text-zinc-900 transition-colors"
          >
            Fit (50%)
          </button>
          <button
            onClick={() => setZoom(1.0)}
            className="hover:text-zinc-900 transition-colors"
          >
            100%
          </button>
        </div>

        {/* Help dropdown */}
        <div className="relative" ref={helpRef}>
          <button
            onClick={() => setHelpOpen((v) => !v)}
            className="flex items-center gap-1 hover:text-zinc-900 transition-colors"
          >
            <HelpCircle size={12} />
            <span>Help</span>
            <ChevronDown size={10} className={`transition-transform duration-150 ${helpOpen ? "rotate-180" : ""}`} />
          </button>

          {helpOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-zinc-200 rounded-xl shadow-xl py-1.5 z-50">
              <div className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
                Tutorial
              </div>
              <button
                onClick={handleRestartTutorial}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
              >
                <RotateCcw size={12} />
                <span>Mulai Tutorial Lagi</span>
              </button>
              <div className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400 border-t border-zinc-100 mt-1">
                Keyboard Shortcuts
              </div>
              <div className="px-3 py-1.5 text-[9px] text-zinc-500 font-light leading-relaxed normal-case">
                <p>Space + Drag → Pan Canvas</p>
                <p>Ctrl+Z → Undo</p>
                <p>Ctrl+Y → Redo</p>
                <p>Delete → Remove Object</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
