"use client";

import React from "react";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "5ingular Graphic redesigned our entire platform interface. Their attention to structural typography and layout flow was spectacular. They operate at Vercel-like quality.",
      author: "Sarah Jenkins",
      role: "VP of Product, Neomind",
    },
    {
      quote: "Collaborating with 5ingular was seamless. Direct communication with the creators meant rapid feedback cycles and an outstandingly premium corporate brand guideline.",
      author: "Marcus Aureli",
      role: "Founder, Sovereign Essence",
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Testimoni
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
            Dipercaya oleh organisasi besar
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-8 bg-zinc-50/50 border border-zinc-200/60 rounded-3xl relative"
            >
              <div>
                <Quote className="text-blue-600/20 mb-6" size={32} />
                <p className="text-zinc-600 text-base md:text-lg font-light italic leading-relaxed mb-8">
                  "{item.quote}"
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-zinc-950">
                  {item.author}
                </span>
                <span className="text-xs text-zinc-400 mt-0.5">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
