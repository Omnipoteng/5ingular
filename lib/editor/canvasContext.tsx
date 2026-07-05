"use client";

import React, { createContext, useContext, useRef } from "react";
import * as fabric from "fabric";

interface CanvasContextProps {
  canvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

const CanvasContext = createContext<CanvasContextProps | null>(null);

export function CanvasProvider({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  return (
    <CanvasContext.Provider value={{ canvasRef }}>
      {children}
    </CanvasContext.Provider>
  );
}

export function useCanvas() {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within CanvasProvider");
  }
  return context;
}
