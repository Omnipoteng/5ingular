"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import GradientText from "./GradientText";

export default function Hero() {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState(0); // 0: typing 1st, 1: deleting, 2: typing 2nd, 3: completed
  const [cursorBlinking, setCursorBlinking] = useState(true);

  const text1 = "5ingular Graphic";
  const text2 = "Creative Digital Agency";

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (phase === 0) {
      if (text.length < text1.length) {
        timer = setTimeout(() => {
          setText(text1.substring(0, text.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setPhase(1);
        }, 1200);
      }
    } else if (phase === 1) {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(text.substring(0, text.length - 1));
        }, 40);
      } else {
        timer = setTimeout(() => {
          setPhase(2);
        }, 300);
      }
    } else if (phase === 2) {
      if (text.length < text2.length) {
        timer = setTimeout(() => {
          setText(text2.substring(0, text.length + 1));
        }, 80);
      } else {
        setCursorBlinking(false);
        setPhase(3);
      }
    }

    return () => clearTimeout(timer);
  }, [text, phase]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 overflow-hidden bg-white bg-grid-pattern"
    >
      {/* Background glow accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-50/70 blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-8 z-10">
        {/* Visual Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-50 border border-zinc-200/60 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            5ingular Graphic
          </span>
        </div>

        {/* Headline with Embedded Typing Animation */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.08] max-w-4xl min-h-[1.2em]">
          <GradientText>{text}</GradientText>
          <span
            className={`inline-block w-[3px] h-[0.9em] ml-1 bg-blue-600 align-middle ${
              cursorBlinking ? "animate-cursor-blink" : "cursor-noblink"
            }`}
            style={{ marginBottom: "0.15em" }}
          />
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-500 max-w-2xl font-light leading-relaxed">
         Kami membangun sistem desain premium, pengalaman web elit, dan branding digital khusus yang membedakan organisasi Anda.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
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

        {/* Hero Preview Mockup */}
        <div className="relative w-full max-w-4xl mt-12 group">
          {/* Glassmorphic border glow */}
          <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-5 blur-lg transition-opacity duration-500 group-hover:opacity-10" />
          
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-sm p-2 shadow-2xl">
            <Image
              src="/images/hero_mockup.png"
              alt="Digital Design Mockup Showcase"
              width={1600}
              height={900}
              className="w-full rounded-xl object-cover shadow-inner"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
