"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      title: "Neomind Platform",
      category: "Web Application & UI/UX",
      image: "/images/portfolio_web.png",
    },
    {
      title: "Sovereign Essence",
      category: "Brand Guidelines & Identity",
      image: "/images/portfolio_brand.png",
    },
    {
      title: "Kinetic Synthesis",
      category: "3D Motion Graphic & Concept",
      image: "/images/portfolio_motion.png",
    },
  ];

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Portofolio
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
              Menciptakan Landmark Digital.
            </h2>
            <p className="text-zinc-500 font-light leading-relaxed">
              Jelajahi portofolio proyek kami di mana kami memadukan logika strategis dengan visual yang mencolok.
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-900 hover:text-blue-600 transition-colors"
          >
            Mulai Proyek Anda
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group flex flex-col gap-4 cursor-pointer"
            >
              {/* Card Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-100 bg-zinc-50 shadow-sm transition-all duration-300">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Hover overlay backdrop */}
                <div className="absolute inset-0 bg-zinc-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Text Meta */}
              <div className="flex items-start justify-between px-2">
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase mt-1">
                    {project.category}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
