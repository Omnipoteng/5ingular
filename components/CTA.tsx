"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import TypewriterParagraph from "../components/TypewriterParagraph";

export default function CTA() {
  return (
    <section id="contact" className="py-24 bg-white dark:bg-zinc-950 relative overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-50/50 blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-800/80 backdrop-blur-sm p-12 md:p-16 flex flex-col md:flex-row items-center md:justify-between gap-8 shadow-sm">
          {/* Text Area */}
          <div className="flex flex-col gap-4 max-w-lg text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Hubungi kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Siap untuk mendefinisikan ulang ciri visual anda?
            </h2>
            <TypewriterParagraph
              text="Hubungi tim desain kami hari ini untuk mengetahui bagaimana kami dapat menyelaraskan merek anda dengan estetika digital premium."
              className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed text-sm md:text-base"
              speed={12}
            />
          </div>

          {/* Button Area */}
          <div className="flex-shrink-0">
            <a
              href="mailto:hello@5ingular.graphic"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-bold uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-full shadow-md shadow-blue-200 dark:shadow-none"
            >
              Book a Call
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
