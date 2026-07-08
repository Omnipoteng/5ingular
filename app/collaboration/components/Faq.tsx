"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Bagaimana cara memulai kerja sama?",
    a: "Anda dapat menghubungi kami melalui halaman kontak atau langsung klik 'Start Collaboration'. Tim kami akan merespons dalam 1×24 jam kerja untuk menjadwalkan sesi konsultasi awal.",
  },
  {
    q: "Berapa lama proses pengerjaan proyek?",
    a: "Durasi pengerjaan tergantung pada kompleksitas dan ruang lingkup proyek. Timeline akan disepakati bersama setelah sesi konsultasi dan selalu kami patuhi dengan transparan.",
  },
  {
    q: "Apakah ada layanan revisi?",
    a: "Ya. Jumlah dan cakupan revisi ditentukan sejak awal sesuai dengan paket yang dipilih. Revisi tambahan di luar kesepakatan dapat diatur dengan biaya tambahan yang telah ditentukan.",
  },
  {
    q: "Apakah menerima proyek jangka panjang atau retainer?",
    a: "Tentu saja. Kami sangat terbuka untuk kemitraan jangka panjang. Model retainer bulanan tersedia untuk client yang membutuhkan output kreatif secara konsisten dan berkelanjutan.",
  },
  {
    q: "Bagaimana sistem pembayaran yang berlaku?",
    a: "Pembayaran umumnya dibagi menjadi dua tahap: down payment di awal dan pelunasan setelah proyek selesai. Detail pembayaran akan disesuaikan dan disepakati bersama sebelum produksi dimulai.",
  },
  {
    q: "Apakah bisa menggunakan NDA atau kontrak kerja?",
    a: "Ya. Kami sangat menghormati kerahasiaan proyek. NDA dan kontrak kerja formal dapat disiapkan atas permintaan client, terutama untuk proyek berskala besar atau enterprise.",
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 mb-14 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Pertanyaan yang Sering Diajukan.
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-light max-w-xl mx-auto">
            Temukan jawaban atas pertanyaan umum seputar proses kolaborasi bersama kami.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/50"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">{faq.q}</span>
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-all duration-300 ${
                    openIdx === idx ? "bg-blue-600 border-blue-600 text-white rotate-45" : ""
                  }`}
                >
                  <Plus size={14} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
