"use client";

import { motion } from "framer-motion";
import { MessageSquare, Map, FileText, Cpu, RefreshCw, PackageCheck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Consultation",
    desc: "Diskusi mendalam mengenai kebutuhan, referensi, dan tujuan proyek client.",
  },
  {
    num: "02",
    icon: Map,
    title: "Planning",
    desc: "Menentukan ruang lingkup, deliverable, dan pendekatan kreatif yang sesuai.",
  },
  {
    num: "03",
    icon: FileText,
    title: "Agreement",
    desc: "Finalisasi harga, timeline pengerjaan, jumlah revisi, dan penandatanganan kontrak.",
  },
  {
    num: "04",
    icon: Cpu,
    title: "Production",
    desc: "Tim 5ingular Graphic mulai mengerjakan proyek sesuai brief dan arahan yang telah disepakati.",
  },
  {
    num: "05",
    icon: RefreshCw,
    title: "Revision",
    desc: "Client memberikan feedback dan revisi dilakukan sesuai dengan ketentuan yang berlaku.",
  },
  {
    num: "06",
    icon: PackageCheck,
    title: "Delivery",
    desc: "File final dalam format yang disepakati diserahkan kepada client beserta dokumentasi pendukung.",
  },
];

export default function Workflow() {
  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 mb-16 max-w-2xl"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Alur Kerja
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Collaboration Workflow.
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
            Setiap kolaborasi mengikuti alur yang terstruktur untuk memastikan transparansi,
            efisiensi, dan hasil yang optimal.
          </p>
        </motion.div>

        {/* Steps — 3 col on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col gap-5 p-7 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:border-blue-100 dark:hover:border-blue-900 hover:bg-blue-50/30 dark:hover:bg-zinc-800 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                    <Icon size={20} />
                  </div>
                  <span className="text-2xl font-bold text-zinc-100 dark:text-zinc-800 group-hover:text-blue-100 dark:group-hover:text-blue-900 transition-colors select-none">
                    {step.num}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{step.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
