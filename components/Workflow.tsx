"use client";

import React from "react";
import { Search, Compass, Palette, Sliders, ChevronRight } from "lucide-react";

export default function Workflow() {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "Immersive goal alignment and competitive audits.",
      icon: Search,
    },
    {
      num: "02",
      title: "Planning",
      desc: "Visual blueprints, user flows, and directions.",
      icon: Compass,
    },
    {
      num: "03",
      title: "Design",
      desc: "Crafting beautiful, high-end pixel assets.",
      icon: Palette,
    },
    {
      num: "04",
      title: "Revision",
      desc: "Collaborative adjustments and fine-tuning.",
      icon: Sliders,
    },
    {
      num: "05",
      title: "Delivery",
      desc: "Bespoke production assets and launch code.",
      icon: ChevronRight,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
            Our Creative Workflow.
          </h2>
          <p className="text-zinc-500 font-light leading-relaxed">
            We follow a structured design cycle that guarantees consistency, transparency, and top-tier execution speed.
          </p>
        </div>

        {/* Horizontal/Vertical Steps Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex flex-col relative group">
                {/* Number & Icon header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-all">
                    <Icon size={20} />
                  </div>
                  <div className="h-[1px] flex-1 bg-zinc-100 hidden md:block group-last:hidden" />
                </div>

                {/* Text Metadata */}
                <div className="flex flex-col gap-1.5 pr-2">
                  <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                    Step {step.num}
                  </span>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-sm font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
