"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useEditorStore } from "@/lib/editor/editorStore";
import { TUTORIAL_STEPS, TutorialStep } from "./TutorialSteps";

interface OnboardingContextProps {
  isActive: boolean;
  currentStep: number;
  steps: TutorialStep[];
  currentStepData: TutorialStep;
  targetRect: DOMRect | null;
  canGoNext: boolean;
  startTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTutorial: () => void;
  finishTutorial: () => void;
}

const OnboardingContext = createContext<OnboardingContextProps | null>(null);

export default function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const rectUpdateRef = useRef<number | null>(null);

  const { activeTool, layers } = useEditorStore();

  const currentStepData = TUTORIAL_STEPS[currentStep];

  // Check if completion condition is met for interactive steps
  const getCanGoNext = useCallback(() => {
    if (!currentStepData.interactive) return true;

    if (currentStepData.interactiveType === "click-tool-text") {
      return activeTool === "text";
    }

    if (currentStepData.interactiveType === "upload-image") {
      return layers.some((layer) => layer.type === "image");
    }

    return true;
  }, [currentStepData, activeTool, layers]);

  const canGoNext = getCanGoNext();

  // Reset/Restart Tutorial
  const startTutorial = useCallback(() => {
    setCurrentStep(0);
    setIsActive(true);
  }, []);

  // Complete and save local state
  const skipTutorial = useCallback(() => {
    setIsActive(false);
    localStorage.setItem("editor_onboarding_completed", "true");
  }, []);

  const finishTutorial = useCallback(() => {
    setIsActive(false);
    localStorage.setItem("editor_onboarding_completed", "true");
  }, []);

  const nextStep = useCallback(() => {
    if (!canGoNext) return;
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      finishTutorial();
    }
  }, [currentStep, canGoNext, finishTutorial]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  // First Launch Trigger
  useEffect(() => {
    const isCompleted = localStorage.getItem("editor_onboarding_completed");
    if (isCompleted !== "true") {
      // Small delay to let the Fabric canvas and editor initialize first
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Track Target Element Position dynamically
  const updateTargetRect = useCallback(() => {
    if (!isActive) {
      setTargetRect(null);
      return;
    }

    const step = TUTORIAL_STEPS[currentStep];
    if (!step?.targetSelector) {
      setTargetRect(null);
      return;
    }

    const el = document.querySelector(step.targetSelector);
    if (el) {
      const rect = el.getBoundingClientRect();
      // Only set if different to prevent infinite state re-renders
      setTargetRect((prev) => {
        if (
          prev &&
          prev.left === rect.left &&
          prev.top === rect.top &&
          prev.width === rect.width &&
          prev.height === rect.height
        ) {
          return prev;
        }
        return rect;
      });
    } else {
      setTargetRect(null);
    }
  }, [currentStep, isActive]);

  // Handle rect updates on changes, animation frames, scroll, resize
  useEffect(() => {
    updateTargetRect();

    // Set up animation frame loop to poll rect position during transitions/scrolls
    const tick = () => {
      updateTargetRect();
      rectUpdateRef.current = requestAnimationFrame(tick);
    };

    if (isActive) {
      rectUpdateRef.current = requestAnimationFrame(tick);
      window.addEventListener("resize", updateTargetRect, { passive: true });
      window.addEventListener("scroll", updateTargetRect, { passive: true });
    }

    return () => {
      if (rectUpdateRef.current) {
        cancelAnimationFrame(rectUpdateRef.current);
      }
      window.removeEventListener("resize", updateTargetRect);
      window.removeEventListener("scroll", updateTargetRect);
    };
  }, [currentStep, isActive, updateTargetRect, activeTool, layers.length]);

  // Keyboard accessibility listeners (ESC -> skip, Enter -> next, arrows -> prev/next)
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        skipTutorial();
      } else if (e.key === "Enter") {
        // Only trigger enter if not typing in inputs
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault();
          nextStep();
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevStep();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextStep();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, nextStep, prevStep, skipTutorial]);

  return (
    <OnboardingContext.Provider
      value={{
        isActive,
        currentStep,
        steps: TUTORIAL_STEPS,
        currentStepData,
        targetRect,
        canGoNext,
        startTutorial,
        nextStep,
        prevStep,
        skipTutorial,
        finishTutorial
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboardingContext must be used within an OnboardingProvider");
  }
  return context;
}
