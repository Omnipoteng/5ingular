"use client";

import { motion } from "framer-motion";
import { Users, GitBranch, Clock, CheckCircle, MessageCircle, Star } from "lucide-react";

const points = [
  {
    icon: Users,
    title: "Partner, Bukan Sekadar Freelancer",
    desc: "Kami berperan sebagai mitra kreatif yang memahami visi bisnis Anda secara menyeluruh.",
  },
  {
    icon: GitBranch,
    title: "Workflow yang Terstruktur",
    desc: "Setiap proyek memiliki alur kerja yang jelas, dari discovery hingga delivery.",
  },
  {
    icon: Clock,
    title: "Timeline Disusun Bersama",
    desc: "Jadwal pengerjaan ditentukan berdasarkan kebutuhan dan kesiapan kedua pihak.",
  },
  {
    icon: CheckCircle,
    title: "Revisi Sesuai Kesepakatan",
    desc: "Jumlah revisi telah disepakati di awal sehingga proses lebih efisien dan terarah.",
  },
  {
    icon: MessageCircle,
    title: "Komunikasi Profesional",
    desc: "Seluruh komunikasi dilakukan secara langsung dengan tim inti 5ingular Graphic.",
  },
  {
    icon: Star,
    title: "Fokus Pada Kualitas",
    desc: "Prioritas utama kami adalah hasil akhir yang melampaui ekspektasi client.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function AboutCollaboration() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Sticky Heading */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5 lg:sticky lg:top-28"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Sistem Kolaborasi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Kolaborasi yang Terencana dan Profesional.
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed text-sm">
              Kami percaya bahwa hasil terbaik lahir dari proses yang terorganisir and komunikasi yang
              terbuka antara klien dan tim kreatif.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {points.map((point, idx) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex flex-col gap-4 p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md dark:hover:shadow-zinc-900/50 transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{point.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed">{point.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
