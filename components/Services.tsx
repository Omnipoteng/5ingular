"use client";

import React from "react";
import {
  AppWindow,
  Image as ImageIcon,
  Film,
  Sparkles,
  Paintbrush,
  Layers,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import TypewriterParagraph from "./TypewriterParagraph";

export default function Services() {
  return (
    <section id="services" className="py-28 bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-100 dark:border-zinc-900 relative overflow-hidden">
      {/* Background soft glow blobs */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] rounded-full bg-blue-50/40 dark:bg-blue-950/10 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] rounded-full bg-indigo-50/40 dark:bg-indigo-950/10 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-20 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Layanan Kami
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Ekosistem Kreatif: Software & Jasa Editing Elit.
          </h2>
          <TypewriterParagraph
            text="Kami menggabungkan kekuatan software editor berbasis web dengan layanan edit premium untuk membawa proyek visual Anda ke level berikutnya."
            className="text-zinc-500 dark:text-zinc-400 font-light text-base md:text-lg leading-relaxed max-w-2xl"
            speed={12}
          />
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Bento Card 1: Featured 5ingular Editor (Spans 2 columns) */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/15 transition-colors duration-500" />
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <AppWindow size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full">
                  Featured Software
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                5ingular Design Studio Software
              </h3>
              <TypewriterParagraph
                text="Editor grafis modern berbasis web yang intuitif. Dilengkapi dengan panel layer yang dinamis, resizable sidebar, real-time collaboration engine, dan workspace gelap bawaan untuk kenyamanan mata desainer."
                className="text-zinc-500 dark:text-zinc-400 font-light text-sm md:text-base leading-relaxed max-w-xl mb-6"
                speed={10}
              />

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Real-time Cloud Sync & Simpan Otomatis",
                  "Layers Panel Resizable & Drag-and-Drop",
                  "AI Design Co-Pilot terintegrasi",
                  "Ekspor Multi-Format Beresolusi Tinggi",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-blue-500 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 font-light">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-light">Versi Terbaru v2.4 (Aktif)</span>
              <a
                href="/editor"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Coba Editor Sekarang
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Bento Card 2: Custom Assets Templates */}
          <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <Layers size={20} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                Kustom Aset & Template
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-light text-xs md:text-sm leading-relaxed">
                Akses ke pustaka aset visual eksklusif, mockup, palette warna, dan template yang siap diunggah langsung ke akun 5ingular Editor Anda untuk mempercepat desain.
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 mt-6">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                Template Terintegrasi
              </span>
            </div>
          </div>

          {/* Bento Card 3: Photo Editing */}
          <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <ImageIcon size={20} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                Professional Photo Editing
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-light text-xs md:text-sm leading-relaxed">
                Layanan edit foto komersial, retouching detail potret, color grading kelas film, and restorasi visual berstandar studio untuk presentasi komersial.
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 mt-6">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                Paid Service • Retouch
              </span>
            </div>
          </div>

          {/* Bento Card 4: Video Editing */}
          <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <Film size={20} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                Cinematic Video Editing
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-light text-xs md:text-sm leading-relaxed">
                Pemotongan klip berpresisi, audio mixing, penyelarasan transisi modern, and video iklan komersial berkualitas tinggi yang siap dipublikasikan.
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 mt-6">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                Paid Service • Video Cut
              </span>
            </div>
          </div>

          {/* Bento Card 5: Motion & Manga */}
          <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Sparkles size={18} />
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Paintbrush size={18} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                Motion Graphic & Manga Art
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-light text-xs md:text-sm leading-relaxed">
                Kombinasi layanan animasi kinetik 3D dengan pewarnaan manga/ilustrasi komik digital, line art cleanup, dan penataan balon teks profesional.
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 mt-6">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                Paid Service • 3D & Webtoon
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
