"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock, Unlock, Trash2, Copy, Layers, Edit3 } from "lucide-react";
import { useEditorStore } from "@/lib/editor/editorStore";
import { useCanvas } from "@/lib/editor/canvasContext";
import { Layer } from "@/lib/editor/types";

export default function LayersPanel() {
  const {
    layers,
    selectedLayerId,
    setSelectedLayerId,
    reorderLayers,
    updateLayer,
    setDirty,
  } = useEditorStore();

  const { canvasRef } = useCanvas();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [panelWidth, setPanelWidth] = useState(256); // 256px is standard w-64

  const startResizing = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    const startWidth = panelWidth;
    const startX = mouseDownEvent.clientX;

    const doDrag = (mouseMoveEvent: MouseEvent) => {
      const newWidth = Math.max(180, Math.min(480, startWidth + (mouseMoveEvent.clientX - startX)));
      setPanelWidth(newWidth);
    };

    const stopDrag = () => {
      window.removeEventListener("mousemove", doDrag);
      window.removeEventListener("mouseup", stopDrag);
    };

    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);
  };

  const handleSelect = (id: string) => {
    setSelectedLayerId(id);
    if (!canvasRef.current) return;
    const active = canvasRef.current.getObjects().find((obj: any) => obj.id === id);
    if (active) {
      canvasRef.current.setActiveObject(active);
      canvasRef.current.renderAll();
    }
  };

  const handleToggleVisible = (e: React.MouseEvent, layer: Layer) => {
    e.stopPropagation();
    const visible = !layer.visible;
    updateLayer(layer.id, { visible });

    if (!canvasRef.current) return;
    const obj: any = canvasRef.current.getObjects().find((o: any) => o.id === layer.id);
    if (obj) {
      obj.visible = visible;
      canvasRef.current.discardActiveObject();
      canvasRef.current.renderAll();
      setDirty(true);
    }
  };

  const handleToggleLock = (e: React.MouseEvent, layer: Layer) => {
    e.stopPropagation();
    const locked = !layer.locked;
    updateLayer(layer.id, { locked });

    if (!canvasRef.current) return;
    const obj: any = canvasRef.current.getObjects().find((o: any) => o.id === layer.id);
    if (obj) {
      obj.hasControls = !locked;
      obj.lockMovementX = locked;
      obj.lockMovementY = locked;
      obj.lockRotation = locked;
      obj.lockScalingX = locked;
      obj.lockScalingY = locked;
      canvasRef.current.renderAll();
      setDirty(true);
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!canvasRef.current) return;
    const obj = canvasRef.current.getObjects().find((o: any) => o.id === id);
    if (obj) {
      canvasRef.current.remove(obj);
      canvasRef.current.discardActiveObject();
      canvasRef.current.renderAll();

      // Trigger store update
      const filtered = layers.filter((l) => l.id !== id);
      reorderLayers(filtered);
      setSelectedLayerId(null);
      setDirty(true);
    }
  };

  const handleDuplicate = (e: React.MouseEvent, layer: Layer) => {
    e.stopPropagation();
    if (!canvasRef.current) return;
    const obj = canvasRef.current.getObjects().find((o: any) => o.id === layer.id);
    if (obj) {
      obj.clone().then((cloned: any) => {
        const newId = `layer-${Date.now()}`;
        cloned.set({
          left: (obj.left || 0) + 20,
          top: (obj.top || 0) + 20,
          id: newId,
        });
        canvasRef.current?.add(cloned);
        canvasRef.current?.setActiveObject(cloned);
        canvasRef.current?.renderAll();

        const newLayer: Layer = {
          id: newId,
          name: `${layer.name} Copy`,
          type: layer.type,
          visible: true,
          locked: false,
        };
        reorderLayers([newLayer, ...layers]);
        setSelectedLayerId(newId);
        setDirty(true);
      });
    }
  };

  const startRename = (e: React.MouseEvent, layer: Layer) => {
    e.stopPropagation();
    setEditingId(layer.id);
    setEditingName(layer.name);
  };

  const finishRename = () => {
    if (editingId && editingName.trim()) {
      updateLayer(editingId, { name: editingName.trim() });
    }
    setEditingId(null);
  };

  // HTML5 Drag and Drop Reordering
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

    const list = [...layers];
    const [moved] = list.splice(sourceIndex, 1);
    list.splice(targetIndex, 0, moved);
    reorderLayers(list);

    // Sync Fabric canvas z-order to match the panel order.
    // Panel: index 0 = topmost layer visually.
    // Fabric: objects rendered in _objects order, last index = top.
    // So the panel list reversed = Fabric bottom-to-top order.
    // We skip __docbg__ (always stays at index 0 / bottom).
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const allObjs = canvas.getObjects();

      // Build an ordered array of Fabric objects matching our desired order.
      // list[0] = top layer -> should be last in Fabric array.
      // list[list.length-1] = bottom layer -> should be just above docbg.
      const orderedForFabric = [...list].reverse(); // bottom-to-top order

      // Remove all non-docbg objects from canvas (temporarily)
      const docBg = allObjs.find((o: any) => o.id === "__docbg__");
      const userObjs = allObjs.filter((o: any) => o.id !== "__docbg__");

      // Remove all user objects
      userObjs.forEach((o) => canvas.remove(o));

      // Re-add in correct bottom-to-top order
      orderedForFabric.forEach((layer) => {
        const obj = userObjs.find((o: any) => o.id === layer.id);
        if (obj) canvas.add(obj);
      });

      // Ensure docbg stays at the very bottom
      if (docBg) canvas.sendObjectToBack(docBg);

      canvas.discardActiveObject();
      canvas.renderAll();
      setDirty(true);
    }
  };


  return (
    <aside
      data-tour="layers-panel"
      className="relative bg-white border-r border-zinc-200 flex flex-col z-10 shadow-sm"
      style={{ width: panelWidth }}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between flex-shrink-0 bg-zinc-50/50">
        <div className="flex items-center gap-2 text-zinc-700">
          <Layers size={14} className="text-blue-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider">Layers</h3>
        </div>
        <span className="text-[10px] bg-zinc-200 px-2 py-0.5 rounded-full font-bold text-zinc-500">
          {layers.length}
        </span>
      </div>

      {/* Layers list container */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1.5 select-none">
        {layers.length === 0 ? (
          <div className="text-center text-zinc-400 py-12 text-xs font-light">
            No layers yet.<br />Add shapes or text.
          </div>
        ) : (
          layers.map((layer, index) => {
            const isSelected = selectedLayerId === layer.id;
            const isEditing = editingId === layer.id;

            return (
              <div
                key={layer.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, index)}
                onClick={() => handleSelect(layer.id)}
                className={`group flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-50/60 border-blue-200"
                    : "bg-white border-zinc-150 hover:bg-zinc-50/50"
                }`}
              >
                {/* Left: icon + name */}
                <div className="flex items-center gap-2 overflow-hidden flex-1 mr-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 flex-shrink-0" />
                  
                  {isEditing ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onBlur={finishRename}
                      onKeyDown={(e) => e.key === "Enter" && finishRename()}
                      autoFocus
                      className="px-1 text-xs border border-blue-500 rounded bg-white w-full outline-none"
                    />
                  ) : (
                    <span className="text-xs font-medium text-zinc-700 truncate">
                      {layer.name}
                    </span>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  {/* Rename */}
                  {!isEditing && (
                    <button
                      onClick={(e) => startRename(e, layer)}
                      className="p-1 rounded text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Rename Layer"
                    >
                      <Edit3 size={11} />
                    </button>
                  )}

                  {/* Duplicate */}
                  <button
                    onClick={(e) => handleDuplicate(e, layer)}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Duplicate Layer"
                  >
                    <Copy size={11} />
                  </button>

                  {/* Lock */}
                  <button
                    onClick={(e) => handleToggleLock(e, layer)}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
                    title={layer.locked ? "Unlock" : "Lock"}
                  >
                    {layer.locked ? <Lock size={11} className="text-red-500" /> : <Unlock size={11} />}
                  </button>

                  {/* Visibility */}
                  <button
                    onClick={(e) => handleToggleVisible(e, layer)}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
                    title={layer.visible ? "Hide" : "Show"}
                  >
                    {layer.visible ? <Eye size={11} /> : <EyeOff size={11} className="text-zinc-400" />}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={(e) => handleDelete(e, layer.id)}
                    className="p-1 rounded text-zinc-400 hover:text-red-600 hover:bg-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Layer"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={startResizing}
        className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-blue-500/30 active:bg-blue-600 transition-colors z-20"
      />
    </aside>
  );
}
