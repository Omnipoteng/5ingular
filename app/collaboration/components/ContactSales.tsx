"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";

export default function ContactSales() {
  return (
    <section id="contact" className="py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 relative overflow-hidden">
      {/* Glow blob */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-50/60 dark:bg-blue-950/20 blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm p-12 md:p-16 flex flex-col md:flex-row items-center md:justify-between gap-10 shadow-sm"
        >
          {/* Text */}
          <div className="flex flex-col gap-4 max-w-lg text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Mulai Sekarang
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Siap untuk memulai proyek anda?
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              Tim kami siap mendiskusikan kebutuhan kreatif Anda. Mulai percakapan hari ini dan
              wujudkan visi brand Anda bersama <span className="text-black dark:text-white">5ingular</span> 
              <span className="text-blue-600 dark:text-blue-400"> Graphic.</span>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-full shadow-md shadow-blue-200 dark:shadow-none w-full md:w-auto"
            >
              Contact Sales
              <ArrowUpRight size={14} />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-full w-full md:w-auto"
            >
              <Calendar size={13} />
              Book Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
