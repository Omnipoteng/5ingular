"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import GradientText from "./GradientText";

// List of phrases to cycle through endlessly
const PHRASES = [
  "Creative Digital Agency",
  "5ingular Graphic",
  "Desainer Profesional",
  "Kreator Visual Premium",
];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blink cursor independently
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  // Typewriter loop
  useEffect(() => {
    const current = PHRASES[phraseIndex];
    let delay: number;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        delay = 75;
        const t = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1));
        }, delay);
        return () => clearTimeout(t);
      } else {
        // Finished typing — wait, then start deleting
        const t = setTimeout(() => setIsDeleting(true), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayText.length > 0) {
        delay = 38;
        const t = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length - 1));
        }, delay);
        return () => clearTimeout(t);
      } else {
        // Finished deleting — move to next phrase
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % PHRASES.length);
      }
    }
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-white bg-grid-pattern"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-50/70 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: Text + CTA ── */}
          <div className="flex flex-col items-start text-left gap-7 flex-1 z-10">

            {/* Headline — cursor inline setelah teks */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
              {/*
                Trick: GradientText renders inline-block yang bisa wrap.
                Kita bungkus dalam satu <span> whitespace-nowrap agar
                cursor selalu nempel di ujung teks baris terakhir.
                Tapi karena teks bisa panjang, kita pisahkan pendekatan:
                render teks + cursor langsung dalam h1 tanpa wrapper inline-block
              */}
              <span className="relative">
                <GradientText>{displayText || "\u00A0"}</GradientText>
                <span
                  aria-hidden="true"
                  className="inline-block w-[3px] bg-blue-600 ml-[2px]"
                  style={{
                    height: "0.85em",
                    verticalAlign: "middle",
                    marginBottom: "0.12em",
                    opacity: cursorVisible ? 1 : 0,
                    transition: "opacity 0.1s",
                  }}
                />
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-zinc-500 max-w-lg font-light leading-relaxed">
              Kami membangun sistem desain premium, pengalaman web elit, dan branding digital khusus yang membedakan organisasi Anda.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mt-1">
              <a
                href="/editor"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-full shadow-lg shadow-blue-100"
              >
                Mulai Proyek
                <ArrowUpRight size={16} />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold uppercase tracking-wider text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition-colors rounded-full border border-zinc-200"
              >
                Lihat Pekerjaan
              </a>
            </div>
          </div>

          {/* ── Right: Looping Video ── */}
          <div className="flex-1 w-full lg:w-auto z-10">
            <video
              src="/video/5ingular.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
