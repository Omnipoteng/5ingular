"use client";

import React from "react";
import { Quote, Star } from "lucide-react";
import TypewriterParagraph from "./TypewriterParagraph";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Software 5ingular Editor sangat menakjubkan! Kolaborasi cloud real-time and render engine-nya memotong waktu desain kami hingga 40%. Ini adalah lompatan besar untuk studio kami.",
      author: "Sarah Jenkins",
      role: "Lead Product Designer, Neomind Studio",
      rating: 5,
    },
    {
      quote: "Paid editing dari 5ingular benar-benar berstandar premium. Warna coloring manga and pemotongan video transisi sinematik mereka luar biasa rapi. Penonton channel kami sangat menyukainya!",
      author: "Marcus Aureli",
      role: "Creative Content Director, Sovereign Media",
      rating: 5,
    },
  ];

  return (
    <section className="py-28 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-50/20 dark:bg-blue-950/5 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col gap-4 mb-20 max-w-2xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Testimoni Klien
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Apa Kata Mereka Tentang Kami.
          </h2>
        </div>

        {/* Custom Layout: Centered & Alternating Stack Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between p-8 md:p-10 rounded-3xl border border-zinc-200/85 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 shadow-sm hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300 group"
            >
              {/* Star Ratings */}
              <div className="flex gap-1 mb-6 text-yellow-500">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className="text-yellow-400" />
                ))}
              </div>

              {/* Quote text block */}
              <div>
                <Quote className="text-blue-500/10 mb-4 group-hover:text-blue-500/20 transition-colors" size={40} />
                <TypewriterParagraph
                  text={`"${item.quote}"`}
                  className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg font-light italic leading-relaxed mb-10"
                  speed={9}
                />
              </div>

              {/* Client Profile details */}
              <div className="flex items-center gap-4 pt-6 border-t border-zinc-200/60 dark:border-zinc-800">
                {/* Avatar Initial Circle */}
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center tracking-wider shadow-sm">
                  {item.author.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-zinc-950 dark:text-white">
                    {item.author}
                  </span>
                  <span className="text-xs text-zinc-400 font-light mt-0.5">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
