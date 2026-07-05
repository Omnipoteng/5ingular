"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Calendar, Folder } from "lucide-react";
import { AgentPortfolioItem } from "@/data/agents";

interface AgentPortfolioProps {
  portfolio: AgentPortfolioItem[];
}

export default function AgentPortfolio({ portfolio }: AgentPortfolioProps) {
  const [selectedProject, setSelectedProject] = useState<AgentPortfolioItem | null>(null);

  return (
    <section className="py-24 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
            Featured Projects.
          </h2>
          <p className="text-zinc-500 font-light leading-relaxed">
            Koleksi proyek terpilih yang dikerjakan secara langsung oleh Agent ini.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolio.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col gap-4 cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-100 bg-zinc-50 shadow-sm transition-all duration-300">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-zinc-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Text metadata */}
              <div className="flex items-start justify-between px-2">
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase mt-1">
                    {project.category} &bull; {project.year}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Banner */}
              <div className="relative aspect-[16/9] w-full bg-zinc-50 border-b border-zinc-100">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-950/70 hover:bg-zinc-950 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
                  aria-label="Close details"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-zinc-900 leading-tight">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-medium">
                    <div className="flex items-center gap-1">
                      <Folder size={12} />
                      <span>{selectedProject.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{selectedProject.year}</span>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  {selectedProject.desc}
                </p>
                
                <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-xs text-zinc-400 font-light mt-2">
                  Informasi detail studi kasus proyek ini sedang disiapkan oleh Agent. Hubungi Agent untuk berdiskusi lebih lanjut mengenai portofolio ini.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
