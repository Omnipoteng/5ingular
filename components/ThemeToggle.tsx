"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`
        relative w-9 h-9 rounded-full flex items-center justify-center
        border transition-all duration-300
        ${isDark
          ? "border-zinc-700 bg-zinc-800 text-yellow-400 hover:border-yellow-400/50 hover:bg-zinc-700"
          : "border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        }
      `}
    >
      <span
        className="transition-all duration-300"
        style={{
          transform: isDark ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.8)",
          opacity: isDark ? 1 : 0,
          position: "absolute",
        }}
      >
        <Moon size={15} />
      </span>
      <span
        className="transition-all duration-300"
        style={{
          transform: isDark ? "rotate(90deg) scale(0.8)" : "rotate(0deg) scale(1)",
          opacity: isDark ? 0 : 1,
          position: "absolute",
        }}
      >
        <Sun size={15} />
      </span>
    </button>
  );
}
