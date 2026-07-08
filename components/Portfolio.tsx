"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      title: "5ingular Design Studio Workspace",
      category: "Software Interface & UI Engine",
      image: "/images/portfolio_web.png",
      tag: "Featured App",
      featured: true,
      desc: "Workspace canvas dengan layer manager, sidebar interaktif, dan performa editing real-time yang optimal."
    },
    {
      title: "Cyberpunk Manga Art",
      category: "Manga Coloring & Retouching",
      image: "/images/portfolio_brand.png",
      tag: "Paid Edit",
      featured: false,
      desc: "Pewarnaan panel manga dengan teknik shading premium and restorasi line art resolusi tinggi."
    },
    {
      title: "Liquid Flow Explainer Video",
      category: "Motion Graphic & Video Editing",
      image: "/images/portfolio_motion.png",
      tag: "Paid Edit",
      featured: false,
      desc: "Video animasi promo produk komersial dengan efek partikel cairan dan transisi kinetik halus."
    },
  ];

  return (
    <section id="portfolio" className="py-28 bg-white dark:bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Portofolio
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
              Karya Kreatif & Tampilan Software.
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Tinjauan visual dari interface 5ingular Editor serta hasil pengerjaan paid editing premium yang telah kami serahkan ke klien.
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Mulai Proyek Anda
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Asymmetrical Layout */}
        <div className="flex flex-col gap-16">
          
          {/* Featured Large Project (Software Showcase) */}
          {projects.filter(p => p.featured).map((project, idx) => (
            <div
              key={idx}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-6 md:p-8 hover:shadow-md transition-all"
            >
              {/* Image Block */}
              <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>

              {/* Text Block */}
              <div className="lg:col-span-5 flex flex-col gap-5 justify-center lg:px-4">
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full">
                    {project.tag}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase px-3 py-1 border border-zinc-200 dark:border-zinc-800 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 font-light text-sm md:text-base leading-relaxed">
                  {project.desc}
                </p>
                <div>
                  <a
                    href="/editor"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Buka Editor
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Two-column Offset Grid for Editing Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
            {projects.filter(p => !p.featured).map((project, idx) => (
              <div
                key={idx}
                className={`group flex flex-col gap-5 ${
                  idx === 1 ? "md:translate-y-8" : ""
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm transition-all duration-300">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-zinc-950/80 backdrop-blur-sm text-white rounded-full">
                      {project.tag}
                    </span>
                  </div>
                </div>

                {/* Text Metadata */}
                <div className="flex items-start justify-between px-2">
                  <div className="flex flex-col gap-1 max-w-[80%]">
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs font-light leading-relaxed mt-1">
                      {project.desc}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all flex-shrink-0"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
