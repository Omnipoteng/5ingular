"use client";

import React, { useEffect, useRef, useState } from "react";

interface TypewriterParagraphProps {
  text: string;
  className?: string;
  speed?: number; // ms per character
  as?: "p" | "span" | "div";
}

export default function TypewriterParagraph({
  text,
  className = "",
  speed = 18,
  as: Tag = "p",
}: TypewriterParagraphProps) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Intersection Observer — start typing when visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  // Character-by-character typing loop
  useEffect(() => {
    if (!started || done) return;
    if (indexRef.current >= text.length) {
      setDone(true);
      return;
    }
    timerRef.current = setTimeout(() => {
      setDisplayText(text.slice(0, indexRef.current + 1));
      indexRef.current += 1;
    }, speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [started, displayText, text, speed, done]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {displayText}
      {/* Blinking cursor — only while typing */}
      {!done && started && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "2px",
            height: "0.85em",
            background: "currentColor",
            opacity: 0.7,
            marginLeft: "2px",
            verticalAlign: "middle",
            marginBottom: "0.05em",
            borderRadius: "1px",
            animation: "twBlink 0.7s step-end infinite",
          }}
        />
      )}
    </Tag>
  );
}
