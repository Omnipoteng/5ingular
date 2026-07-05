"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-white bg-grid-pattern">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-50/60 blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-50 border border-zinc-200/60 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Kolaborasi
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.08] max-w-4xl"
        >
          Mari kita bangun sesuatu{" "}
          <span className="text-blue-600">Bersama sama</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-zinc-500 max-w-2xl font-light leading-relaxed"
        >
          5ingular Graphic membuka kolaborasi profesional untuk desain, branding, photo editing,
          motion graphics, video editing, UI/UX, website, dan seluruh kebutuhan visual brand Anda.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-full shadow-lg shadow-blue-100"
          >
            Start Collaboration
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition-colors rounded-full border border-zinc-200"
          >
            <Calendar size={15} />
            Contact Sales
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-zinc-100 w-full max-w-2xl"
        >
          {["Tournament Organizer", "Startup", "Personal Brand", "Creator", "Company"].map((tag) => (
            <span key={tag} className="text-xs font-medium text-zinc-400 tracking-wide">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
