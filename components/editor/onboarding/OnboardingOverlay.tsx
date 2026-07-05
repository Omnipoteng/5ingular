"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnboarding } from "@/hooks/useOnboarding";
import Highlight from "./Highlight";
import OnboardingPopover from "./OnboardingPopover";

export default function OnboardingOverlay() {
  const { isActive, targetRect } = useOnboarding();

  if (!isActive) return null;

  // When there is no specific target (welcome / congratulation steps) → full screen dim + centered popover
  if (!targetRect) {
    return (
      <AnimatePresence>
        <motion.div
          key="full-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[98] flex items-center justify-center bg-zinc-950/55 backdrop-blur-sm"
        >
          <OnboardingPopover />
        </motion.div>
      </AnimatePresence>
    );
  }

  // Spotlight overlay: 4 panels surrounding the target, leaving it exposed and interactive
  const top = targetRect.top;
  const bottom = targetRect.bottom;
  const left = targetRect.left;
  const right = targetRect.right;
  const h = targetRect.height;

  const panelClass =
    "fixed bg-zinc-950/55 backdrop-blur-[1.5px] z-[98] transition-all duration-300 pointer-events-auto";

  return (
    <>
      {/* Top */}
      <div className={panelClass} style={{ top: 0, left: 0, right: 0, height: top }} />
      {/* Left */}
      <div className={panelClass} style={{ top, left: 0, width: left, height: h }} />
      {/* Right */}
      <div className={panelClass} style={{ top, left: right, right: 0, height: h }} />
      {/* Bottom */}
      <div className={panelClass} style={{ top: bottom, left: 0, right: 0, bottom: 0 }} />

      {/* Glowing border ring */}
      <Highlight />

      {/* Floating smart popover */}
      <OnboardingPopover />
    </>
  );
}
