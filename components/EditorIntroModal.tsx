"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Layers,
  Type,
  Image as ImageIcon,
  FileDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
  Lock,
  Compass,
  ArrowRight,
  Maximize2
} from "lucide-react";
import Link from "next/link";
import GradientText from "./GradientText";

interface EditorIntroModalProps {
  onClose: () => void;
}

export default function EditorIntroModal({ onClose }: EditorIntroModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Memperkenalkan 5ingular Editor",
      subtitle: "Versi 0.1.0 (BETA)",
      desc: "5ingular Editor adalah workspace desain grafis & photo editing premium berbasis web yang dirancang dengan interaksi sekelas Figma. Mari ikuti panduan singkat ini untuk melihat fitur-fitur utama di dalamnya!",
      icon: <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />,
      visual: (
        <div className="flex flex-col items-center justify-center text-center p-6 w-full h-[170px] bg-gradient-to-tr from-blue-50/50 to-indigo-50/50 border border-blue-100 rounded-2xl shadow-inner select-none gap-2">
          <span className="text-xl font-bold tracking-tight text-zinc-900">
            5ingular <span className="text-blue-600">Editor</span>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-blue-100/80 text-[10px] font-extrabold text-blue-700 tracking-wider uppercase shadow-sm">
            v0.1.0 (BETA)
          </span>
          <p className="text-[10px] text-zinc-400 font-light max-w-xs mt-1">
            Creative Digital Workspace by 5ingular Graphic.
          </p>
        </div>
      )
    },
    {
      title: "1. Manajemen Layer Utama",
      subtitle: "Susun & Organisasikan Elemen Kreatif",
      desc: "Sama seperti Figma, kelola susunan tumpukan objek melalui panel layer sebelah kiri. Sembunyikan dengan ikon mata, kunci posisi agar tidak sengaja bergeser dengan ikon gembok, atau drag untuk merapikan susunan layer.",
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      visual: (
        <div className="flex flex-col gap-2.5 w-full bg-zinc-950 p-5 rounded-2xl border border-zinc-800 text-zinc-300 font-mono text-[11px] shadow-inner select-none">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-zinc-500 font-bold uppercase tracking-wider text-[9px]">
            <span>Layers Panel</span>
            <span>Opacity</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-blue-600/10 border border-blue-500/30 rounded-lg text-white">
            <div className="flex items-center gap-2">
              <Type size={13} className="text-blue-400" />
              <span className="font-sans font-semibold">Teks Promosi Banner</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-400">
              <Eye size={12} className="text-blue-400 cursor-pointer" />
              <Lock size={12} className="cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center justify-between p-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-400">
            <div className="flex items-center gap-2">
              <ImageIcon size={13} className="text-zinc-500" />
              <span className="font-sans">Latar Belakang.jpg</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-500">
              <Eye size={12} className="cursor-pointer" />
              <Lock size={12} className="text-amber-500 cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center justify-between p-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald-500" />
              <span className="font-sans">Lingkaran Aksen Hijau</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-500">
              <Eye size={12} className="cursor-pointer" />
              <Lock size={12} className="cursor-pointer" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "2. Penyuntingan Teks Instan",
      subtitle: "Tulis & Ubah Font Secara Real-time",
      desc: "Pilih Text Tool dari toolbar kiri, klik satu kali di mana saja pada kanvas, lalu ketik ide Anda secara instan. Kursor berkedip profesional menunjukkan status aktif mengetik, dan panel properti kanan akan sinkron otomatis.",
      icon: <Type className="w-5 h-5 text-indigo-600" />,
      visual: (
        <div className="relative flex items-center justify-center w-full h-[170px] bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden shadow-inner p-4 select-none">
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-zinc-200/60 rounded text-[9px] font-mono text-zinc-500">
            Canvas Preview
          </div>
          <div className="flex flex-col items-start gap-1 p-3 border-2 border-dashed border-blue-500 bg-white rounded shadow-sm">
            <div className="flex items-center">
              <span className="text-lg font-bold text-zinc-950 font-sans tracking-tight">
                Typing something premium
              </span>
              <span className="inline-block w-[2px] h-5 ml-0.5 bg-blue-600 animate-pulse" />
            </div>
            <div className="flex gap-1.5 mt-2">
              <span className="px-1.5 py-0.5 bg-blue-50 text-[8px] font-semibold text-blue-600 rounded">
                Geist Font
              </span>
              <span className="px-1.5 py-0.5 bg-zinc-100 text-[8px] font-semibold text-zinc-500 rounded">
                30px
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "3. Workspace Menggambar Shape",
      subtitle: "Buat Vektor & Tambahkan Gambar dengan Mudah",
      desc: "Buat objek persegi panjang, lingkaran, atau garis langsung di kanvas dengan drag. Aktifkan Snap Guides untuk memposisikan objek tepat di pusat kanvas secara otomatis. Anda juga dapat dengan mudah memutar objek menggunakan rotate handle.",
      icon: <Compass className="w-5 h-5 text-emerald-600" />,
      visual: (
        <div className="relative flex items-center justify-center w-full h-[170px] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-inner select-none">
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-zinc-800 rounded text-[9px] font-mono text-zinc-400">
            Canvas Workspace
          </div>
          {/* Custom Shape Mockup */}
          <div className="relative w-24 h-24 bg-blue-500 border border-blue-400 rounded-lg flex items-center justify-center shadow-lg rotate-12">
            <span className="text-white text-[10px] font-semibold tracking-wider font-mono">Shape Object</span>
            {/* Control Handlers */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-600 rounded-sm" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-600 rounded-sm" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-600 rounded-sm" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-600 rounded-sm" />
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-3.5 h-3.5 bg-white border border-blue-600 rounded-full cursor-pointer hover:bg-blue-50" />
              <div className="w-[1px] h-3 bg-blue-500" />
            </div>
          </div>
          {/* Snap Guide Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 border-l border-dashed border-pink-500 opacity-60" />
          <div className="absolute left-0 right-0 top-1/2 h-0.5 border-t border-dashed border-pink-500 opacity-60" />
        </div>
      )
    },
    {
      title: "4. Ekspor Hasil Desain & Penyimpanan",
      subtitle: "Simpan Proyek Anda Secara Aman",
      desc: "Semua perubahan otomatis tersimpan di LocalStorage peramban Anda sehingga Anda tidak pernah kehilangan pekerjaan. Bila sudah siap, ekspor hasil karya Anda menjadi file PNG transparan, JPG, atau WEBP beresolusi tinggi dengan multiplier skala.",
      icon: <FileDown className="w-5 h-5 text-amber-600" />,
      visual: (
        <div className="flex flex-col gap-2.5 w-full bg-white p-5 rounded-2xl border border-zinc-200 text-zinc-700 shadow-sm select-none">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Format Ekspor</span>
            <span className="text-[10px] font-bold text-blue-600">Resolusi Tinggi</span>
          </div>
          <div className="grid grid-cols-3 gap-2 bg-zinc-50 border border-zinc-200 rounded-xl p-1 text-center font-sans font-semibold text-xs">
            <span className="bg-white text-blue-600 py-1.5 rounded-lg border border-zinc-200/50 shadow-sm">PNG</span>
            <span className="text-zinc-400 py-1.5">JPG</span>
            <span className="text-zinc-400 py-1.5">WEBP</span>
          </div>
          <div className="flex items-center justify-between py-1 text-xs">
            <span className="text-zinc-500 font-light">Transparent Background</span>
            <div className="w-8 h-4 rounded-full bg-blue-500 p-0.5 cursor-pointer flex justify-end">
              <div className="w-3 h-3 rounded-full bg-white shadow-sm" />
            </div>
          </div>
          <div className="flex items-center justify-between py-1 text-xs border-t border-zinc-100 pt-2.5">
            <span className="text-zinc-500 font-light">Multiplier Skala</span>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">2x (Ultra HD)</span>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-md p-4">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white border border-zinc-200 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Panduan 5ingular Editor
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-50 hover:bg-zinc-100 text-zinc-500 flex items-center justify-center border border-zinc-200/50 transition-colors focus:outline-none"
          >
            <X size={15} />
          </button>
        </div>

        {/* Carousel Content */}
        <div className="p-8 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-5"
            >
              {/* Feature info */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {steps[currentStep].icon}
                  <h3 className="text-xl font-extrabold tracking-tight text-zinc-900 font-sans">
                    {steps[currentStep].title}
                  </h3>
                </div>
                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                  {steps[currentStep].subtitle}
                </h4>
                <p className="text-xs text-zinc-500 font-light leading-relaxed mt-1">
                  {steps[currentStep].desc}
                </p>
              </div>

              {/* Visual Mockup Area */}
              <div className="w-full flex items-center justify-center bg-zinc-50/50 border border-zinc-150 p-6 rounded-2xl shadow-inner min-h-[190px]">
                {steps[currentStep].visual}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 py-1">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep === idx ? "w-6 bg-blue-600" : "w-1.5 bg-zinc-200 hover:bg-zinc-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-500 font-semibold text-xs uppercase tracking-wider rounded-full transition-colors focus:outline-none"
          >
            Tutup
          </button>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="flex items-center justify-center w-10 h-10 border border-zinc-200 bg-white hover:bg-zinc-50 rounded-full text-zinc-500 transition-colors focus:outline-none"
              >
                <ChevronLeft size={16} />
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs uppercase tracking-wider rounded-full shadow-sm transition-colors focus:outline-none"
              >
                <span>Lanjut</span>
                <ChevronRight size={14} />
              </button>
            ) : (
              <Link
                href="/editor"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-blue-200 transition-colors"
              >
                <span>Buka Editor</span>
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
