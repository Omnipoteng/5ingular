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
  colors = ["#39FF14", "#FFE500", "#39FF14", "#FFE500", "#39FF14"], // neon green -> neon yellow -> neon green
  animationSpeed = 6,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <span
      style={gradientStyle}
      className={`bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-move ${className}`}
    >
      {children}
    </span>
  );
}
