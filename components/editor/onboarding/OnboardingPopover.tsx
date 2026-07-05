"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/hooks/useOnboarding";
import { ChevronLeft, ChevronRight, X, Sparkles, Check } from "lucide-react";

export default function OnboardingPopover() {
  const {
    currentStep,
    steps,
    currentStepData,
    targetRect,
    canGoNext,
    nextStep,
    prevStep,
    skipTutorial
  } = useOnboarding();

  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverSize, setPopoverSize] = useState({ width: 340, height: 220 });
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  // Update sizes for calculation
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (popoverRef.current) {
      const rect = popoverRef.current.getBoundingClientRect();
      setPopoverSize({ width: rect.width || 340, height: rect.height || 220 });
    }
  }, [currentStep, currentStepData]);

  // Positioning logic
  let x = (windowSize.width - popoverSize.width) / 2;
  let y = (windowSize.height - popoverSize.height) / 2;

  if (targetRect && currentStepData.placement !== "center") {
    const gap = 14;
    const placement = currentStepData.placement;

    if (placement === "right") {
      x = targetRect.right + gap;
      y = targetRect.top + (targetRect.height - popoverSize.height) / 2;
    } else if (placement === "left") {
      x = targetRect.left - popoverSize.width - gap;
      y = targetRect.top + (targetRect.height - popoverSize.height) / 2;
    } else if (placement === "bottom") {
      x = targetRect.left + (targetRect.width - popoverSize.width) / 2;
      y = targetRect.bottom + gap;
    } else if (placement === "top") {
      x = targetRect.left + (targetRect.width - popoverSize.width) / 2;
      y = targetRect.top - popoverSize.height - gap;
    }
  }

  // Ensure within screen boundaries with 16px safe margins
  const finalX = Math.max(16, Math.min(windowSize.width - popoverSize.width - 16, x));
  const finalY = Math.max(16, Math.min(windowSize.height - popoverSize.height - 16, y));

  const totalSteps = steps.length;
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <motion.div
      ref={popoverRef}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, x: finalX, y: finalY }}
      transition={{ type: "spring", damping: 30, stiffness: 250 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 101,
      }}
      className="w-[340px] bg-white border border-zinc-200/80 rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-zinc-800"
    >
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-[9px] font-bold text-blue-600 uppercase tracking-wider">
          <Sparkles size={10} className="animate-pulse" />
          <span>Tour Guide</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-zinc-400 font-mono">
            {currentStep + 1} / {totalSteps}
          </span>
          <button
            onClick={skipTutorial}
            className="text-zinc-400 hover:text-zinc-600 transition-colors p-0.5 rounded-lg hover:bg-zinc-50"
            title="Skip Tutorial"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Main Copy */}
      <div className="flex flex-col gap-1">
        {currentStepData.subtitle && (
          <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600">
            {currentStepData.subtitle}
          </span>
        )}
        <h4 className="text-base font-extrabold tracking-tight text-zinc-950 font-sans leading-snug">
          {currentStepData.title}
        </h4>
        <p className="text-[11px] text-zinc-500 font-light leading-relaxed mt-1">
          {currentStepData.description}
        </p>
      </div>

      {/* Interactive completion checks */}
      {currentStepData.interactive && (
        <div className="mt-1">
          {canGoNext ? (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-[10px] font-semibold text-emerald-700">
              <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                <Check size={10} strokeWidth={3} />
              </div>
              <span>Langkah selesai! Anda dapat melanjutkan.</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-100 text-[10px] font-semibold text-amber-700 animate-pulse">
              <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 font-mono text-[9px] font-bold">
                !
              </div>
              <span>
                {currentStepData.interactiveType === "click-tool-text"
                  ? "Menunggu Anda mengklik Text Tool..."
                  : "Menunggu Anda mengunggah gambar..."}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Progress & Navigation Actions */}
      <div className="flex flex-col gap-3.5 pt-1 border-t border-zinc-100">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={skipTutorial}
            className="text-[10px] font-bold text-zinc-400 hover:text-zinc-600 transition-colors uppercase tracking-wider"
          >
            Lewati Tur
          </button>

          <div className="flex items-center gap-1.5">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 hover:bg-zinc-50 transition-colors text-zinc-500"
                title="Sebelumnya"
              >
                <ChevronLeft size={14} />
              </button>
            )}

            {currentStep < totalSteps - 1 ? (
              <button
                onClick={nextStep}
                disabled={!canGoNext}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wider transition-all ${
                  canGoNext
                    ? "bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm"
                    : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                }`}
              >
                <span>Lanjut</span>
                <ChevronRight size={12} />
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center gap-1 px-5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-[10px] uppercase tracking-wider shadow-lg shadow-blue-100 transition-all"
              >
                <span>{currentStepData.buttonText || "Mulai"}</span>
                <ChevronRight size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
