"use client";

import { motion } from "framer-motion";
import {
  Paintbrush, Layers, Image as ImageIcon, Sparkles,
  Film, AppWindow, Globe, Share2, Layout, PlayCircle, Presentation, PenTool,
} from "lucide-react";

const services = [
  { title: "Graphic Design", icon: Paintbrush },
  { title: "Brand Identity", icon: Layers },
  { title: "Photo Editing", icon: ImageIcon },
  { title: "Motion Design", icon: Sparkles },
  { title: "Video Editing", icon: Film },
  { title: "UI / UX Design", icon: AppWindow },
  { title: "Website Design", icon: Globe },
  { title: "Social Media Design", icon: Share2 },
  { title: "Poster", icon: Layout },
  { title: "Thumbnail", icon: PlayCircle },
  { title: "Presentation Design", icon: Presentation },
  { title: "Custom Creative Project", icon: PenTool },
];

export default function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 mb-16 max-w-2xl"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Layanan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
            Services Included.
          </h2>
          <p className="text-zinc-500 font-light leading-relaxed">
            Jangkauan layanan kreatif kami mencakup seluruh kebutuhan visual brand modern.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col items-start gap-3 p-5 bg-zinc-50 border border-zinc-100 rounded-2xl hover:bg-blue-50/40 hover:border-blue-100 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                  <Icon size={16} />
                </div>
                <span className="text-sm font-medium text-zinc-800 leading-tight">{service.title}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
