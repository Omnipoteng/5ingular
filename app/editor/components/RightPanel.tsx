"use client";

import React, { useState, useEffect } from "react";
import { useEditorStore } from "@/lib/editor/editorStore";
import { useCanvas } from "@/lib/editor/canvasContext";
import { AlignLeft, AlignCenter, AlignRight, Pipette, Settings } from "lucide-react";

export default function RightPanel() {
  const { selectedObjectType, setDirty, canvasPreset, setCanvasPreset } = useEditorStore();
  const { canvasRef } = useCanvas();

  const [panelWidth, setPanelWidth] = useState(272); // 272px is standard w-68

  const startResizing = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    const startWidth = panelWidth;
    const startX = mouseDownEvent.clientX;

    const doDrag = (mouseMoveEvent: MouseEvent) => {
      // For right panel, dragging left increases width, so we subtract difference
      const newWidth = Math.max(220, Math.min(500, startWidth - (mouseMoveEvent.clientX - startX)));
      setPanelWidth(newWidth);
    };

    const stopDrag = () => {
      window.removeEventListener("mousemove", doDrag);
      window.removeEventListener("mouseup", stopDrag);
    };

    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);
  };

  // Selected Object Properties State
  const [fill, setFill] = useState("#18cc03");
  const [stroke, setStroke] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [fontSize, setFontSize] = useState(40);
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontFamily, setFontFamily] = useState("Geist");
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [textAlign, setTextAlign] = useState("left");
  const [borderRadius, setBorderRadius] = useState(0);

  // Position & Dimensions
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [angle, setAngle] = useState(0);

  // Load properties of active object when selection changes
  const syncActiveObjectProperties = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;

    setFill((active.get("fill") as string) || "#18cc03");
    setStroke(active.get("stroke") || "#000000");
    setStrokeWidth(active.get("strokeWidth") || 0);
    setOpacity(active.get("opacity") ?? 1);
    setFontSize((active.get("fontSize") as number) || 40);
    setFontWeight((active.get("fontWeight") as string) || "normal");
    setFontFamily((active.get("fontFamily") as string) || "Geist");
    setLetterSpacing((active.get("charSpacing") as number) / 10 || 0);
    setLineHeight(active.get("lineHeight") || 1.2);
    setTextAlign(active.get("textAlign") || "left");
    setBorderRadius((active.get("rx") as number) || 0);

    // Dims
    setWidth(Math.round(active.get("width") * (active.scaleX || 1)));
    setHeight(Math.round(active.get("height") * (active.scaleY || 1)));
    setLeft(Math.round(active.left || 0));
    setTop(Math.round(active.top || 0));
    setAngle(Math.round(active.angle || 0));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onSelection = () => syncActiveObjectProperties();
    const onModified = () => syncActiveObjectProperties();

    canvas.on("selection:created", onSelection);
    canvas.on("selection:updated", onSelection);
    canvas.on("object:moving", onModified);
    canvas.on("object:scaling", onModified);
    canvas.on("object:rotating", onModified);

    return () => {
      canvas.off("selection:created", onSelection);
      canvas.off("selection:updated", onSelection);
      canvas.off("object:moving", onModified);
      canvas.off("object:scaling", onModified);
      canvas.off("object:rotating", onModified);
    };
  }, [canvasRef]);

  // Update object property in Fabric and render
  const updateActiveObject = (key: string, value: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;

    active.set(key as any, value);
    canvas.renderAll();
    setDirty(true);
  };

  const flipObject = (direction: "horizontal" | "vertical") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;

    if (direction === "horizontal") {
      active.set("flipX", !active.flipX);
    } else {
      active.set("flipY", !active.flipY);
    }
    canvas.renderAll();
    setDirty(true);
  };

  // Dimensions change handlers
  const handleWidthChange = (val: number) => {
    setWidth(val);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;
    active.set("scaleX", val / active.width);
    canvas.renderAll();
    setDirty(true);
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;
    active.set("scaleY", val / active.height);
    canvas.renderAll();
    setDirty(true);
  };

  const handleCanvasBgChange = (color: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.backgroundColor = color;
    canvas.renderAll();
    setDirty(true);
  };

  return (
    <aside
      data-tour="properties-panel"
      className="relative bg-white border-l border-zinc-200 flex flex-col z-10 shadow-sm overflow-y-auto"
      style={{ width: panelWidth }}
    >
      <div className="px-5 py-4 border-b border-zinc-200 flex items-center gap-2 bg-zinc-50/50">
        <Settings size={14} className="text-blue-600" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Properties</h3>
      </div>

      <div className="p-5 flex flex-col gap-6">
        {selectedObjectType === "none" ? (
          /* ─── CANVAS PROPERTIES ─── */
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Workspace Background
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {["#ffffff", "#f4f4f5", "#e4e4e7", "#d4d4d8", "#18181b", "#18cc03", "#38bdf8"].map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCanvasBgChange(c)}
                    className="w-6 h-6 rounded-full border border-zinc-200 hover:scale-105 transition-transform"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Preset Info
              </span>
              <div className="p-3 bg-zinc-50 border border-zinc-150 rounded-xl flex flex-col gap-1 text-xs text-zinc-500 font-light">
                <span className="font-semibold text-zinc-800">{canvasPreset.name}</span>
                <span>Width: {canvasPreset.width} px</span>
                <span>Height: {canvasPreset.height} px</span>
              </div>
            </div>
          </div>
        ) : (
          /* ─── SELECTED OBJECT PROPERTIES ─── */
          <div className="flex flex-col gap-5">
            {/* Position & size */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Layout & Transform
              </span>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <div className="flex items-center justify-between px-2.5 py-1.5 border border-zinc-200 rounded-xl text-xs bg-zinc-50/50">
                  <span className="text-zinc-400 font-bold">W</span>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className="w-16 text-right outline-none bg-transparent font-medium"
                  />
                </div>
                <div className="flex items-center justify-between px-2.5 py-1.5 border border-zinc-200 rounded-xl text-xs bg-zinc-50/50">
                  <span className="text-zinc-400 font-bold">H</span>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    className="w-16 text-right outline-none bg-transparent font-medium"
                  />
                </div>
                <div className="flex items-center justify-between px-2.5 py-1.5 border border-zinc-200 rounded-xl text-xs bg-zinc-50/50">
                  <span className="text-zinc-400 font-bold">X</span>
                  <input
                    type="number"
                    value={left}
                    onChange={(e) => {
                      setLeft(Number(e.target.value));
                      updateActiveObject("left", Number(e.target.value));
                    }}
                    className="w-16 text-right outline-none bg-transparent font-medium"
                  />
                </div>
                <div className="flex items-center justify-between px-2.5 py-1.5 border border-zinc-200 rounded-xl text-xs bg-zinc-50/50">
                  <span className="text-zinc-400 font-bold">Y</span>
                  <input
                    type="number"
                    value={top}
                    onChange={(e) => {
                      setTop(Number(e.target.value));
                      updateActiveObject("top", Number(e.target.value));
                    }}
                    className="w-16 text-right outline-none bg-transparent font-medium"
                  />
                </div>
              </div>

              {/* Flip utilities */}
              <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                  onClick={() => flipObject("horizontal")}
                  className="py-1.5 border border-zinc-200 rounded-xl text-[10px] font-bold uppercase tracking-wider text-zinc-600 hover:bg-zinc-50 transition-colors"
                >
                  Flip H
                </button>
                <button
                  onClick={() => flipObject("vertical")}
                  className="py-1.5 border border-zinc-200 rounded-xl text-[10px] font-bold uppercase tracking-wider text-zinc-600 hover:bg-zinc-50 transition-colors"
                >
                  Flip V
                </button>
              </div>
            </div>

            {/* Colors */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Appearance
              </span>
              <div className="flex flex-col gap-3 mt-1">
                {/* Opacity */}
                <div className="flex justify-between items-center text-xs text-zinc-500">
                  <span>Opacity</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={Math.round(opacity * 100)}
                      onChange={(e) => {
                        const val = Number(e.target.value) / 100;
                        setOpacity(val);
                        updateActiveObject("opacity", val);
                      }}
                      className="w-24 h-1 bg-zinc-150 rounded accent-blue-600"
                    />
                    <span className="min-w-[30px] text-right font-semibold">{Math.round(opacity * 100)}%</span>
                  </div>
                </div>

                {/* Fill Color */}
                {selectedObjectType !== "image" && (
                  <div className="flex justify-between items-center text-xs text-zinc-500">
                    <span>Fill Color</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={fill}
                        onChange={(e) => {
                          setFill(e.target.value);
                          updateActiveObject("fill", e.target.value);
                        }}
                        className="w-6 h-6 border border-zinc-200 rounded cursor-pointer"
                      />
                      <span className="font-mono text-zinc-400 uppercase text-[10px]">{fill}</span>
                    </div>
                  </div>
                )}

                {/* Rotation */}
                <div className="flex justify-between items-center text-xs text-zinc-500">
                  <span>Rotation</span>
                  <div className="flex items-center gap-1.5 border border-zinc-200 rounded-lg px-2 py-1 bg-zinc-50/50">
                    <input
                      type="number"
                      value={angle}
                      onChange={(e) => {
                        setAngle(Number(e.target.value));
                        updateActiveObject("angle", Number(e.target.value));
                      }}
                      className="w-10 text-right outline-none bg-transparent font-medium"
                    />
                    <span className="text-zinc-400">&deg;</span>
                  </div>
                </div>

                {/* Rounded Corners (for shapes) */}
                {selectedObjectType === "rect" && (
                  <div className="flex justify-between items-center text-xs text-zinc-500">
                    <span>Border Radius</span>
                    <div className="flex items-center gap-1.5 border border-zinc-200 rounded-lg px-2 py-1 bg-zinc-50/50">
                      <input
                        type="number"
                        value={borderRadius}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setBorderRadius(val);
                          updateActiveObject("rx", val);
                          updateActiveObject("ry", val);
                        }}
                        className="w-10 text-right outline-none bg-transparent font-medium"
                      />
                      <span className="text-zinc-400">px</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Typography Section */}
            {selectedObjectType === "text" && (
              <div className="flex flex-col gap-3 border-t border-zinc-100 pt-4">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Typography
                </span>

                {/* Font Size */}
                <div className="flex justify-between items-center text-xs text-zinc-500">
                  <span>Size</span>
                  <div className="flex items-center gap-1.5 border border-zinc-200 rounded-lg px-2 py-1 bg-zinc-50/50">
                    <input
                      type="number"
                      value={fontSize}
                      onChange={(e) => {
                        setFontSize(Number(e.target.value));
                        updateActiveObject("fontSize", Number(e.target.value));
                      }}
                      className="w-10 text-right outline-none bg-transparent font-medium"
                    />
                    <span className="text-zinc-400">pt</span>
                  </div>
                </div>

                {/* Font Weight */}
                <div className="flex justify-between items-center text-xs text-zinc-500">
                  <span>Weight</span>
                  <select
                    value={fontWeight}
                    onChange={(e) => {
                      setFontWeight(e.target.value);
                      updateActiveObject("fontWeight", e.target.value);
                    }}
                    className="border border-zinc-200 rounded-lg px-2 py-1 bg-zinc-50/50 text-xs font-semibold"
                  >
                    <option value="normal">Regular</option>
                    <option value="bold">Bold</option>
                    <option value="100">Thin</option>
                    <option value="900">Black</option>
                  </select>
                </div>

                {/* Text Align */}
                <div className="flex justify-between items-center text-xs text-zinc-500">
                  <span>Alignment</span>
                  <div className="flex gap-1 border border-zinc-200 rounded-lg p-0.5 bg-zinc-50/50">
                    {(["left", "center", "right"] as const).map((al) => (
                      <button
                        key={al}
                        onClick={() => {
                          setTextAlign(al);
                          updateActiveObject("textAlign", al);
                        }}
                        className={`p-1 rounded ${
                          textAlign === al ? "bg-white text-blue-600 border border-zinc-200/50 shadow-sm" : "text-zinc-400"
                        }`}
                      >
                        {al === "left" ? (
                          <AlignLeft size={13} />
                        ) : al === "center" ? (
                          <AlignCenter size={13} />
                        ) : (
                          <AlignRight size={13} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spacing inputs */}
                <div className="flex justify-between items-center text-xs text-zinc-500">
                  <span>Spacing</span>
                  <div className="flex items-center gap-1.5 border border-zinc-200 rounded-lg px-2 py-1 bg-zinc-50/50">
                    <input
                      type="number"
                      value={letterSpacing}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setLetterSpacing(val);
                        // Fabric handles letter spacing internally as charSpacing (multiply by 10)
                        updateActiveObject("charSpacing", val * 10);
                      }}
                      className="w-10 text-right outline-none bg-transparent font-medium"
                    />
                    <span className="text-zinc-400">em</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Resize Handle (Left border) */}
      <div
        onMouseDown={startResizing}
        className="absolute top-0 left-0 w-1.5 h-full cursor-col-resize hover:bg-blue-500/30 active:bg-blue-600 transition-colors z-20"
      />
    </aside>
  );
}
