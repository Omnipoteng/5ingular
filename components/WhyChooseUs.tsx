"use client";

import React from "react";
import { Target, Zap, ShieldCheck, MessagesSquare } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      num: "01",
      title: "Ketepatan yang Sempurna",
      desc: "Kami tidak berkompromi. Setiap kurva, bayangan, gradien warna, dan animasi disesuaikan untuk mencapai standar kemewahan premium.",
      icon: Target,
    },
    {
      num: "02",
      title: "Integritas Visual Strategis",
      desc: "Desain bukan hanya seni; itu adalah komunikasi. Kami menciptakan pengalaman merek yang secara langsung melayani tujuan bisnis Anda.",
      icon: ShieldCheck,
    },
    {
      num: "03",
      title: "Kolaborasi Langsung dengan Klien",
      desc: "Tidak ada perantara atau manajer akun yang mengurangi detail. Berbicara langsung dengan desainer utama yang membentuk visi Anda.",
      icon: MessagesSquare,
    },
    {
      num: "04",
      title: "Pengiriman Eksekusi Cepat",
      desc: "Alur kerja kami dioptimalkan untuk iterasi dan pengiriman yang cepat, menjaga proyek bergerak maju dengan kecepatan cahaya.",
      icon: Zap,
    },
  ];

  return (
    <section id="about" className="py-24 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Main Info column */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Kenapa Memilih Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
              Mitra Kreatif Elit untuk Tim yang Ambisius.
            </h2>
            <p className="text-zinc-500 font-light leading-relaxed">
              Kami mengganti struktur manajemen yang kompleks dengan kolaborasi langsung yang dipimpin oleh desainer, memastikan standar eksekusi tertinggi.
            </p>
          </div>

          {/* Cards Grid column */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {points.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col gap-4 p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-bold tracking-wider text-zinc-300">
                      {point.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 mt-2">
                    {point.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-light">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
