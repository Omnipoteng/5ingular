"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CanvasProvider, useCanvas } from "@/lib/editor/canvasContext";
import { useEditorStore } from "@/lib/editor/editorStore";
import { useHistoryStore } from "@/lib/editor/historyStore";
import TopToolbar from "../components/TopToolbar";
import LeftToolbar from "../components/LeftToolbar";
import LayersPanel from "../components/LayersPanel";
import CanvasWorkspace from "../components/CanvasWorkspace";
import RightPanel from "../components/RightPanel";
import StatusBar from "../components/StatusBar";
import OnboardingProvider from "@/components/editor/onboarding/OnboardingProvider";
import OnboardingOverlay from "@/components/editor/onboarding/OnboardingOverlay";
import { AlertCircle, X } from "lucide-react";
import * as fabric from "fabric";

const DOC_BG_ID = "__docbg__";

function EditorApp() {
  const { canvasRef } = useCanvas();
  const { activeTool, setActiveTool, setDirty, layers, reorderLayers, setSelectedLayerId, canvasPreset } = useEditorStore();
  const { undo, redo, canUndo, canRedo } = useHistoryStore();

  const [mobileWarning, setMobileWarning] = useState(false);
  const [clipboard, setClipboard] = useState<any>(null);

  // Restore a JSON snapshot and always ensure the docBg is present
  const restoreSnapshot = useCallback((json: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.loadFromJSON(json, () => {
      const hasBg = canvas.getObjects().some((o: any) => o.id === DOC_BG_ID);
      if (!hasBg) {
        const bg = new fabric.Rect({
          left: 0, top: 0,
          width: canvasPreset.width, height: canvasPreset.height,
          fill: canvasPreset.bgColor || "#ffffff",
          selectable: false, evented: false,
          hasControls: false, hasBorders: false,
          hoverCursor: "default",
          id: DOC_BG_ID, name: DOC_BG_ID,
        } as any);
        canvas.add(bg);
        canvas.sendObjectToBack(bg);
      }
      canvas.renderAll();
    });
  }, [canvasRef, canvasPreset]);

  // Check client viewport width on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMobileWarning(window.innerWidth < 768);
    }
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent shortcut triggers when typing inside inputs or editing texts
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable ||
        (canvasRef.current?.getActiveObject() as any)?.isEditing
      ) {
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      const active = canvas.getActiveObject();

      // Undo: Ctrl+Z
      if (e.ctrlKey && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        if (canUndo()) {
          const json = undo();
          if (json) restoreSnapshot(json);
        }
      }

      // Redo: Ctrl+Shift+Z or Ctrl+Y
      if (
        (e.ctrlKey && e.key.toLowerCase() === "z" && e.shiftKey) ||
        (e.ctrlKey && e.key.toLowerCase() === "y")
      ) {
        e.preventDefault();
        if (canRedo()) {
          const json = redo();
          if (json) restoreSnapshot(json);
        }
      }

      // Copy: Ctrl+C
      if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        if (active) {
          active.clone().then((cloned) => {
            setClipboard(cloned);
          });
        }
      }

      // Paste: Ctrl+V
      if (e.ctrlKey && e.key.toLowerCase() === "v") {
        e.preventDefault();
        if (clipboard) {
          clipboard.clone().then((clonedObj: any) => {
            canvas.discardActiveObject();
            const newId = `layer-${Date.now()}`;
            clonedObj.set({
              left: (clonedObj.left || 0) + 20,
              top: (clonedObj.top || 0) + 20,
              id: newId,
              evented: true,
            });
            
            if (clonedObj.type === "activeSelection") {
              // Active selection needs to be unpacked on target canvas
              clonedObj.canvas = canvas;
              clonedObj.forEachObject((obj: any) => {
                canvas.add(obj);
              });
              canvas.setActiveObject(clonedObj);
            } else {
              canvas.add(clonedObj);
              canvas.setActiveObject(clonedObj);
            }
            
            setClipboard(clonedObj);
            canvas.requestRenderAll();
            setDirty(true);
          });
        }
      }

      // Delete: Backspace or Delete
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        if (active) {
          // If active selection is active
          if (active.type === "activeSelection") {
            const selection = active as fabric.ActiveSelection;
            selection.forEachObject((obj) => {
              canvas.remove(obj);
            });
          } else {
            canvas.remove(active);
          }
          canvas.discardActiveObject();
          canvas.renderAll();
          setDirty(true);
        }
      }

      // Duplicate: Ctrl+D
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        if (active) {
          active.clone().then((clonedObj: any) => {
            const newId = `layer-${Date.now()}`;
            clonedObj.set({
              left: (active.left || 0) + 24,
              top: (active.top || 0) + 24,
              id: newId,
            });
            canvas.add(clonedObj);
            canvas.setActiveObject(clonedObj);
            canvas.requestRenderAll();
            setDirty(true);
          });
        }
      }

      // Arrow key shifts
      if (active && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        if (e.key === "ArrowUp") active.set("top", (active.top || 0) - step);
        if (e.key === "ArrowDown") active.set("top", (active.top || 0) + step);
        if (e.key === "ArrowLeft") active.set("left", (active.left || 0) - step);
        if (e.key === "ArrowRight") active.set("left", (active.left || 0) + step);
        canvas.renderAll();
        setDirty(true);
      }

      // Tool key mappings (T = text, R = rect, O = circle, V = select, H = hand)
      if (e.key.toLowerCase() === "t") {
        e.preventDefault();
        setActiveTool("text");
      }
      if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        setActiveTool("rect");
      }
      if (e.key.toLowerCase() === "o") {
        e.preventDefault();
        setActiveTool("circle");
      }
      if (e.key.toLowerCase() === "v") {
        e.preventDefault();
        setActiveTool("select");
      }
      if (e.key.toLowerCase() === "h") {
        e.preventDefault();
        setActiveTool("hand");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clipboard, canUndo, canRedo, undo, redo, canvasRef, restoreSnapshot, setActiveTool, setDirty]);

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-zinc-100">
      {/* Mobile viewport warning */}
      {mobileWarning && (
        <div className="bg-amber-500 text-white px-6 py-3.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider z-50 shadow-md">
          <div className="flex items-center gap-2">
            <AlertCircle size={15} />
            <span>Creative Editor is best experienced on Desktop. Mobile layout is view-only.</span>
          </div>
          <button
            onClick={() => setMobileWarning(false)}
            className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Top Header */}
      <TopToolbar />

      {/* Workspace panel structure */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        <LeftToolbar />
        <LayersPanel />
        <CanvasWorkspace />
        <RightPanel />
      </div>

      {/* Status footer bar */}
      <StatusBar />

      {/* Onboarding overlay — mounts on top of everything */}
      <OnboardingOverlay />
    </div>
  );
}

export default function CreativeEditorPage() {
  return (
    <CanvasProvider>
      <OnboardingProvider>
        <EditorApp />
      </OnboardingProvider>
    </CanvasProvider>
  );
}
