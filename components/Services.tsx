"use client";

import React from "react";
import {
  Paintbrush,
  Layers,
  Image as ImageIcon,
  Sparkles,
  Film,
  AppWindow,
  Globe,
  Share2,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Graphic Design",
      desc: "High-impact visual narratives, bespoke marketing assets, and publication designs tailored for your business.",
      icon: Paintbrush,
    },
    {
      title: "Brand Identity",
      desc: "Complete visual guidelines, logos, typography systems, and color schemes that solidify your market presence.",
      icon: Layers,
    },
    {
      title: "Photo Editing",
      desc: "Professional color grading, retouching, and composition mapping to capture and elevate product photography.",
      icon: ImageIcon,
    },
    {
      title: "Motion Design",
      desc: "Expressive 2D and 3D kinetic animations that translate complex processes into simple, beautiful loops.",
      icon: Sparkles,
    },
    {
      title: "Video Editing",
      desc: "Cinematic commercial editing, transitions, audio mixing, and high-fidelity video cuts ready for distribution.",
      icon: Film,
    },
    {
      title: "UI/UX Design",
      desc: "Empathetic user research, user journey mapping, design libraries, and interactive high-fidelity prototypes.",
      icon: AppWindow,
    },
    {
      title: "Website Design",
      desc: "Stunning modern frontend designs focusing on load speed, visual hierarchy, responsiveness, and premium styling.",
      icon: Globe,
    },
    {
      title: "Social Media Design",
      desc: "Targeted templates, visual carousels, and design campaigns optimized to convert scroll traffic to followers.",
      icon: Share2,
    },
  ];

  return (
    <section id="services" className="py-24 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Layanan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
            Layanan Desain yang Dirancang untuk Meningkatkan Citra Merek Anda.
          </h2>
          <p className="text-zinc-500 font-light leading-relaxed">
            Kami beroperasi di persimpangan keahlian artistik dan teknologi, menawarkan kompetensi desain inti.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-6 transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-light">
                    {item.desc}
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
