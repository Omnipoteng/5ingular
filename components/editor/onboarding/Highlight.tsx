"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarding } from "@/hooks/useOnboarding";

export default function Highlight() {
  const { targetRect, isActive, currentStep } = useOnboarding();

  if (!isActive || !targetRect) return null;

  const PADDING = 4; // extra breathing room around the target

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "fixed",
          top: targetRect.top - PADDING,
          left: targetRect.left - PADDING,
          width: targetRect.width + PADDING * 2,
          height: targetRect.height + PADDING * 2,
          borderRadius: "12px",
          border: "2.5px solid #3b82f6",
          boxShadow: "0 0 0 3px rgba(59,130,246,0.25), 0 0 20px rgba(59,130,246,0.3)",
          pointerEvents: "none",
          zIndex: 99,
        }}
      />
    </AnimatePresence>
  );
}
