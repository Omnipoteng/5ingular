"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PHRASE = "Wujudkan imajinasi anda menjadi visual di kanvas digital.";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typingDone, setTypingDone] = useState(false);

  // Blink cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  // Type once, character by character
  useEffect(() => {
    if (typingDone) return;

    if (displayText.length < PHRASE.length) {
      const t = setTimeout(() => {
        setDisplayText(PHRASE.slice(0, displayText.length + 1));
      }, 65);
      return () => clearTimeout(t);
    } else {
      // All characters typed — wait, then reveal page
      const t = setTimeout(() => {
        setTypingDone(true);
        window.dispatchEvent(new Event("typing-done"));
      }, 500);
      return () => clearTimeout(t);
    }
  }, [displayText, typingDone]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-white dark:bg-zinc-950 bg-grid-pattern"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-50/50 dark:bg-blue-950/20 blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col items-center text-center gap-10">

          {/* Heading: typed character by character */}
          <h1
            className="text-zinc-900 dark:text-white leading-[1.08] tracking-tight"
            style={{
              fontFamily: "'ZTNature-Medium', sans-serif",
              fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
            }}
          >
            {/* ZTNature-Medium heading, cursor naturally follows last char */}
            {displayText || "\u00A0"}
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "4px",
                height: "0.82em",
                background: "#39FF14",
                marginLeft: "3px",
                verticalAlign: "middle",
                marginBottom: "0.1em",
                opacity: !typingDone && cursorVisible ? 1 : 0,
                transition: "opacity 0.1s",
                borderRadius: "2px",
              }}
            />
          </h1>

          {/* CTA — only visible after typing is done */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: typingDone ? 1 : 0,
              y: typingDone ? 0 : 16,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="/editor"
              className="inline-flex items-center justify-center gap-2 px-7 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 rounded-full shadow-md shadow-blue-200 dark:shadow-blue-900/40 hover:scale-[1.03] active:scale-[0.98]"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Mulai Proyek
              <ArrowUpRight size={14} />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center px-7 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-200 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 rounded-full border border-zinc-300 dark:border-zinc-600 hover:scale-[1.03] active:scale-[0.98]"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Lihat Pekerjaan
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
