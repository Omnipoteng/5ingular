"use client";

import Image from "next/image";
import { MapPin, ArrowUpRight, MessageSquare } from "lucide-react";
import { Agent } from "@/data/agents";

interface AgentHeroProps {
  agent: Agent;
}

export default function AgentHero({ agent }: AgentHeroProps) {
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
    <section className="bg-white border-b border-zinc-100 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Avatar Area */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-md flex-shrink-0">
            <Image
              src={agent.avatar}
              alt={agent.name}
              fill
              priority
              className="object-cover"
            />
            {/* Number badge */}
            <div className="absolute top-4 left-4 bg-zinc-950/85 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1 text-[10px] font-bold text-white tracking-widest uppercase">
              {agent.number}
            </div>
          </div>

          {/* Details Area */}
          <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
            <div className="flex flex-col gap-3">
              {/* Availability */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100/60 px-3 py-1 rounded-full">
                  {agent.role}
                </span>
                <div className="bg-zinc-50 border border-zinc-200 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
                  <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(agent.status)}`} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    {agent.status}
                  </span>
                </div>
              </div>

              {/* Name */}
              <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight">
                {agent.name}
              </h1>

              {/* Location */}
              {agent.location && (
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-zinc-500 text-sm">
                  <MapPin size={14} className="text-zinc-400" />
                  <span>{agent.location}</span>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="/hire"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-full shadow-lg shadow-blue-200 w-full sm:w-auto"
              >
                Hire Agent
                <ArrowUpRight size={16} />
              </a>
              <a
                href="mailto:hello@5ingular.graphic"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition-colors rounded-full border border-zinc-200 w-full sm:w-auto"
              >
                <MessageSquare size={15} />
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
