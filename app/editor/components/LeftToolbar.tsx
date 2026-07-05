"use client";

import React from "react";
import {
  MousePointer2,
  Type,
  Square,
  Circle,
  Minus,
  Image as ImageIcon,
  Blend,
  Scissors,
  Crop,
  Hand,
  ZoomIn,
  Pipette,
} from "lucide-react";
import { useEditorStore } from "@/lib/editor/editorStore";
import { ToolType } from "@/lib/editor/types";

interface ToolItem {
  type: ToolType;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}

const tools: ToolItem[] = [
  { type: "select", icon: MousePointer2, label: "Move Tool (V)" },
  { type: "text", icon: Type, label: "Text Tool (T)" },
  { type: "rect", icon: Square, label: "Rectangle (R)" },
  { type: "circle", icon: Circle, label: "Circle (O)" },
  { type: "line", icon: Minus, label: "Line (L)" },
  { type: "image", icon: ImageIcon, label: "Add Image" },
  { type: "gradient", icon: Blend, label: "Gradient Tool" },
  { type: "mask", icon: Scissors, label: "Mask Object" },
  { type: "crop", icon: Crop, label: "Crop Image" },
  { type: "hand", icon: Hand, label: "Hand Tool (H)" },
  { type: "zoom", icon: ZoomIn, label: "Zoom Tool (Z)" },
  { type: "colorpicker", icon: Pipette, label: "Color Picker (I)" },
];

export default function LeftToolbar() {
  const { activeTool, setActiveTool } = useEditorStore();

  return (
    <aside className="w-16 bg-white border-r border-zinc-200 flex flex-col items-center py-4 gap-2 z-10 shadow-sm">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = activeTool === tool.type;

        return (
          <button
            key={tool.type}
            onClick={() => setActiveTool(tool.type)}
            data-tour={`tool-${tool.type}`}
            className={`group relative w-11 h-11 flex items-center justify-center rounded-xl transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
            aria-label={tool.label}
          >
            <Icon size={18} />
            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-zinc-900 text-white text-[10px] font-medium tracking-wide uppercase whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50 shadow-md">
              {tool.label}
            </div>
          </button>
        );
      })}
    </aside>
  );
}
