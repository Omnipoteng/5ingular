"use client";

import React from "react";
import { Target, Zap, ShieldCheck, MessagesSquare } from "lucide-react";
import TypewriterParagraph from "./TypewriterParagraph";

export default function WhyChooseUs() {
  const points = [
    {
      title: "Workspace Studio Terintegrasi",
      desc: "5ingular Editor menghadirkan workspace modern berbasis cloud dengan layers panel fleksibel, sidebar resizable, dan rendering instan tanpa hambatan.",
      icon: Target,
    },
    {
      title: "Hasil Editing Pixel-Perfect",
      desc: "Setiap frame video, retouch manipulasi foto, dan coloring panel manga diproses dengan standar mutu tertinggi oleh editor tersertifikasi.",
      icon: ShieldCheck,
    },
    {
      title: "Alur Order & Revisi Transparan",
      desc: "Proses pemesanan paid editing terintegrasi penuh. Anda dapat memberikan feedback revisi secara langsung di atas canvas draft interaktif.",
      icon: MessagesSquare,
    },
    {
      title: "Kecepatan Render & Delivery",
      desc: "Sistem render cloud mempercepat ekspor file mentah Anda secara instan, didukung komitmen pengiriman file tepat waktu.",
      icon: Zap,
    },
  ];

  return (
    <section id="about" className="py-28 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-100 dark:border-zinc-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Branding and Stats */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Kenapa Memilih Kami
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                Definisi Baru Produktivitas Desain.
              </h2>
              <TypewriterParagraph
                text="Kami menggabungkan kekuatan software editor mutakhir dengan pengerjaan editing audio-visual premium dalam satu platform terpadu."
                className="text-zinc-500 dark:text-zinc-400 font-light text-base leading-relaxed"
                speed={13}
              />
            </div>

            {/* Metrics Display */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <div>
                <span className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400 block tracking-tight">40%+</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-bold uppercase mt-1 block">Waktu Tersimpan</span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400 block tracking-tight">99.8%</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-bold uppercase mt-1 block">Kepuasan Klien</span>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Interactive Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {points.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div
                  key={idx}
                  className="group flex flex-col sm:flex-row gap-6 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-sm hover:bg-zinc-100/30 dark:hover:bg-zinc-800/80 transition-all duration-300"
                >
                  {/* Icon Block */}
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Icon size={20} />
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {point.title}
                    </h3>
                  <TypewriterParagraph
                      text={point.desc}
                      className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed"
                      speed={11}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
