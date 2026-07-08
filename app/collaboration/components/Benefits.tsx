"use client";

import { motion } from "framer-motion";
import { Users, Workflow, Zap, Award, Handshake, Layers } from "lucide-react";

const benefits = [
  { icon: Users, title: "Dedicated Creative Team", desc: "Tim kreatif berpengalaman yang sepenuhnya fokus pada proyek Anda." },
  { icon: Workflow, title: "Professional Workflow", desc: "Proses terstruktur dari konsep hingga delivery tanpa kehilangan kualitas." },
  { icon: Zap, title: "Fast Communication", desc: "Respon cepat dan komunikasi langsung tanpa middleman." },
  { icon: Award, title: "High Quality Result", desc: "Standar visual tinggi yang konsisten di setiap deliverable." },
  { icon: Handshake, title: "Long-Term Partnership", desc: "Kami membangun relasi jangka panjang, bukan sekadar transaksi satu kali." },
  { icon: Layers, title: "Scalable Creative Solution", desc: "Solusi desain yang dapat berkembang seiring pertumbuhan bisnis Anda." },
];

export default function Benefits() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 mb-16 max-w-2xl"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Keunggulan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Kenapa harus berkolaborasi dengan kami?
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
            Lebih dari sekadar jasa desain, kami adalah mitra kreatif yang berkomitmen penuh
            terhadap visi dan pertumbuhan brand Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col gap-4 p-7 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md dark:hover:shadow-zinc-900/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{item.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
