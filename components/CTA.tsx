"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-50/50 blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="relative rounded-3xl border border-zinc-200 bg-zinc-50/80 backdrop-blur-sm p-12 md:p-16 flex flex-col md:flex-row items-center md:justify-between gap-8 shadow-sm">
          {/* Text Area */}
          <div className="flex flex-col gap-4 max-w-lg text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Hubungi kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
              Siap untuk mendefinisikan ulang ciri visual anda?
            </h2>
            <p className="text-zinc-500 font-light leading-relaxed text-sm md:text-base">
              Hubungi tim desain kami hari ini untuk mengetahui bagaimana kami dapat menyelaraskan merek anda dengan estetika digital premium.
            </p>
          </div>

          {/* Button Area */}
          <div className="flex-shrink-0">
            <a
              href="mailto:hello@5ingular.graphic"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-full shadow-lg shadow-blue-200"
            >
              Book a Call
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
