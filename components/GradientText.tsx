"use client";

import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#2563eb", "#3b82f6", "#6366f1", "#3b82f6", "#2563eb"], // blue -> light blue -> indigo -> blue
  animationSpeed = 6,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <span
      style={gradientStyle}
      className={`bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-move inline-block ${className}`}
    >
      {children}
    </span>
  );
}
