"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Agent } from "@/data/agents";

interface AgentCardProps {
  agent: Agent;
  index: number;
}

export default function AgentCard({ agent, index }: AgentCardProps) {
  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "Available":
        return "bg-emerald-500";
      case "Busy":
        return "bg-amber-500";
      case "Fully Booked":
        return "bg-red-500";
      case "Vacation":
        return "bg-blue-500";
      default:
        return "bg-zinc-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Header Media */}
        <div className="relative aspect-[4/3] bg-zinc-50 border-b border-zinc-100 overflow-hidden">
          <Image
            src={agent.avatar}
            alt={agent.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Agent Number badge */}
          <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1 text-[10px] font-bold text-white tracking-widest uppercase">
            {agent.number}
          </div>

          {/* Availability badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-zinc-200/60 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
            <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(agent.status)}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
              {agent.status}
            </span>
          </div>
        </div>

        {/* Info Content */}
        <div className="p-6">
          <div className="flex flex-col gap-1.5 mb-4">
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
              {agent.role}
            </span>
            <h3 className="text-xl font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
              {agent.name}
            </h3>
            {agent.location && (
              <div className="flex items-center gap-1 text-zinc-400 text-xs mt-0.5">
                <MapPin size={12} />
                <span>{agent.location}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-zinc-500 text-sm leading-relaxed font-light mb-6">
            {agent.about}
          </p>

          {/* Major Skills Tag */}
          <div className="flex flex-wrap gap-1.5">
            {agent.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200/60 text-zinc-500"
              >
                {skill}
              </span>
            ))}
            {agent.skills.length > 4 && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-400">
                +{agent.skills.length - 4} More
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Button footer */}
      <div className="p-6 pt-0 mt-auto border-t border-zinc-50/50">
        <Link
          href={`/agents/${agent.id}`}
          className="flex items-center justify-between w-full mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-800 group-hover:text-blue-600 transition-colors"
        >
          View Profile
          <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
            <ArrowUpRight size={14} />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
