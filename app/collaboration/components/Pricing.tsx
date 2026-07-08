"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const plans = [
  {
    tier: "Starter",
    badge: null,
    desc: "Cocok untuk individu, kreator, dan kebutuhan desain skala kecil.",
    features: [
      "1–3 deliverable per proyek",
      "Timeline fleksibel",
      "Revisi sesuai kesepakatan",
      "Komunikasi via WhatsApp",
    ],
  },
  {
    tier: "Professional",
    badge: "Most Popular",
    desc: "Dirancang untuk brand, startup, dan tim yang membutuhkan output konsisten.",
    features: [
      "Multi-deliverable per proyek",
      "Priority timeline",
      "Extended revision round",
      "Dedicated project manager",
    ],
  },
  {
    tier: "Enterprise",
    badge: null,
    desc: "Solusi kolaborasi penuh untuk perusahaan dengan kebutuhan kreatif berskala besar.",
    features: [
      "Full creative retainer",
      "Custom SLA & NDA",
      "Dedicated design team",
      "Monthly strategy session",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 mb-5 max-w-2xl"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Paket
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Flexible Pricing.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-zinc-500 dark:text-zinc-400 font-light mb-14 max-w-xl"
        >
          Harga disesuaikan berdasarkan kompleksitas proyek, durasi pengerjaan,
          jumlah revisi, dan kebutuhan spesifik setiap client.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col gap-6 p-8 rounded-2xl border transition-all ${
                plan.badge
                  ? "bg-blue-600 border-blue-600 shadow-xl shadow-blue-200/60 dark:shadow-none"
                  : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md dark:hover:shadow-zinc-900/50"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-900">
                  {plan.badge}
                </span>
              )}

              <div className="flex flex-col gap-2">
                <h3 className={`text-xl font-bold ${plan.badge ? "text-white" : "text-zinc-900 dark:text-white"}`}>
                  {plan.tier}
                </h3>
                <p className={`text-sm font-light leading-relaxed ${plan.badge ? "text-blue-100" : "text-zinc-500 dark:text-zinc-450"}`}>
                  {plan.desc}
                </p>
              </div>

              <div className={`text-center py-4 rounded-xl border ${plan.badge ? "bg-white/10 border-white/20" : "bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800"}`}>
                <p className={`text-xs font-bold uppercase tracking-wider ${plan.badge ? "text-blue-100" : "text-zinc-400 dark:text-zinc-500"}`}>
                  Pricing
                </p>
                <p className={`text-xl font-bold mt-1 ${plan.badge ? "text-white" : "text-zinc-900 dark:text-white"}`}>
                  Custom Quotation
                </p>
              </div>

              <ul className="flex flex-col gap-2.5">
                {plan.features.map((feat, i) => (
                  <li key={i} className={`flex items-start gap-2 text-sm ${plan.badge ? "text-blue-100" : "text-zinc-600 dark:text-zinc-350"}`}>
                    <span className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${plan.badge ? "bg-white/60" : "bg-blue-400"}`} />
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                  plan.badge
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-zinc-900 dark:bg-zinc-750 text-white hover:bg-zinc-700 dark:hover:bg-zinc-700"
                }`}
              >
                Request Quote
                <ArrowUpRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
