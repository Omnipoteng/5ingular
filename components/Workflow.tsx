"use client";

import React from "react";
import { Search, Compass, Palette, Sliders, ChevronRight } from "lucide-react";
import TypewriterParagraph from "./TypewriterParagraph";

export default function Workflow() {
  const steps = [
    {
      num: "01",
      title: "Pilih Lisensi & Layanan",
      desc: "Tentukan paket lisensi software 5ingular Editor atau isi formulir singkat untuk memesan jasa paid editing sesuai brief kreatif Anda.",
      icon: Search,
      side: "left"
    },
    {
      num: "02",
      title: "Konfigurasi Workspace & Setup",
      desc: "Aset mentah dianalisis, editor terpilih mulai ditugaskan, and ruang kerja cloud kolaboratif disiapkan dalam beberapa menit.",
      icon: Compass,
      side: "right"
    },
    {
      num: "03",
      title: "Proses Editing & Kreasi",
      desc: "Proses pengerjaan edit video, manipulasi foto, coloring manga, atau pembuatan preset/template siap pakai menggunakan sistem cloud 5ingular.",
      icon: Palette,
      side: "left"
    },
    {
      num: "04",
      title: "Review Draf Interaktif",
      desc: "Tinjau draf hasil editing langsung di canvas preview interaktif. Anda dapat mengajukan revisi atau memberi feedback secara langsung.",
      icon: Sliders,
      side: "right"
    },
    {
      num: "05",
      title: "Ekspor & Serah Terima File",
      desc: "File final beresolusi tinggi diekspor secara instan dari cloud atau diunduh lengkap beserta seluruh dokumentasi pendukungnya.",
      icon: ChevronRight,
      side: "left"
    },
  ];

  return (
    <section className="py-28 bg-white dark:bg-zinc-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col gap-4 mb-24 max-w-2xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Proses
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Alur Kerja Terstruktur Kami.
          </h2>
          <TypewriterParagraph
            text="Setiap pengerjaan paid editing dan distribusi lisensi software diatur secara profesional untuk menjamin efisiensi and kualitas hasil akhir yang maksimal."
            className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed"
            speed={12}
          />
        </div>

        {/* Vertical Alternating Process Timeline */}
        <div className="relative border-l border-zinc-200/80 dark:border-zinc-800/80 md:border-l-0 md:before:content-[''] md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-[1px] md:before:bg-zinc-200/80 md:before:dark:bg-zinc-800/80 flex flex-col gap-12 md:gap-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLeft = step.side === "left";
            return (
              <div key={idx} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center w-full pl-8 md:pl-0">
                
                {/* Timeline node circle */}
                <div className="absolute left-0 top-1.5 md:left-1/2 md:top-1/2 -translate-x-[16.5px] md:-translate-x-1/2 md:-translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-zinc-950 border-2 border-blue-600 dark:border-blue-400 flex items-center justify-center text-blue-600 dark:text-blue-400 z-10 font-bold text-xs select-none">
                  {step.num}
                </div>

                {/* Left side empty space or Content box */}
                <div className={`w-full md:w-[45%] flex ${isLeft ? "md:justify-end text-left md:text-right" : "hidden md:block opacity-0 pointer-events-none"}`}>
                  {isLeft && (
                    <div className="group flex flex-col gap-2 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-sm hover:border-zinc-200 dark:hover:border-zinc-800 transition-all duration-300">
                      <div className="flex items-center gap-3 md:justify-end">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <Icon size={16} />
                        </div>
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">
                          Langkah {step.num}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
                        {step.title}
                      </h3>
                      <TypewriterParagraph
                        text={step.desc}
                        className="text-zinc-500 dark:text-zinc-400 text-xs font-light leading-relaxed"
                        speed={10}
                      />
                    </div>
                  )}
                </div>

                {/* Right side empty space or Content box */}
                <div className={`w-full md:w-[45%] flex ${!isLeft ? "md:justify-start text-left" : "hidden md:block opacity-0 pointer-events-none"}`}>
                  {!isLeft && (
                    <div className="group flex flex-col gap-2 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-sm hover:border-zinc-200 dark:hover:border-zinc-800 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <Icon size={16} />
                        </div>
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">
                          Langkah {step.num}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
                        {step.title}
                      </h3>
                      <TypewriterParagraph
                        text={step.desc}
                        className="text-zinc-500 dark:text-zinc-400 text-xs font-light leading-relaxed"
                        speed={10}
                      />
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
