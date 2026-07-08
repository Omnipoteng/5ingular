"use client";

import React from "react";
import { Star, ShieldAlert, Award, FileCheck, Layers, HelpCircle } from "lucide-react";
import { Agent } from "@/data/agents";

/* ─── About Component ────────────────────────────────────────────────── */
export function AgentAbout({ agent }: { agent: Agent }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">About Agent</h3>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-light">
        {agent.about}
      </p>
    </div>
  );
}

/* ─── Skills Component ───────────────────────────────────────────────── */
export function AgentSkills({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Spesialisasi & Tools</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Experience Timeline Component ──────────────────────────────────── */
export function AgentExperience({ experience }: { experience: Agent["experience"] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Career Experience</h3>
      <div className="relative border-l border-zinc-100 dark:border-zinc-800 pl-6 ml-2 flex flex-col gap-8">
        {experience.map((item, idx) => (
          <div key={idx} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white dark:border-zinc-950" />
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
              {item.year}
            </span>
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-tight">
              {item.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Services Component ─────────────────────────────────────────────── */
export function AgentServices({ services }: { services: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Layanan yang Disediakan</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{service}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Pricing Component ──────────────────────────────────────────────── */
export function AgentPricing({ pricing }: { pricing: Agent["pricing"] }) {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm dark:shadow-none">
      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Pricing Model</h3>
      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-light">Tipe Kerja</span>
        <span className="text-lg font-bold text-zinc-900 dark:text-white">{pricing.type}</span>
      </div>
      <div className="py-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 flex flex-col gap-1">
        {pricing.type === "Hourly" ? (
          <>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-light">Tarif Per Jam</span>
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{pricing.hourly}</span>
          </>
        ) : pricing.type === "Starting From" ? (
          <>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-light">Mulai Dari</span>
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{pricing.starting}</span>
          </>
        ) : (
          <>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-light">Estimasi Proyek</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Custom Quotation</span>
          </>
        )}
      </div>
      <a
        href="/hire"
        className="w-full text-center py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors mt-2"
      >
        Request Quote
      </a>
    </div>
  );
}

/* ─── Statistics Component ───────────────────────────────────────────── */
export function AgentStats({ stats }: { stats: Agent["stats"] }) {
  const statItems = [
    { label: "Completed Projects", value: stats.completed },
    { label: "Happy Clients", value: stats.clients },
    { label: "Years Exp", value: `${stats.years}+` },
    { label: "Average Rating", value: stats.rating },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {statItems.map((stat, idx) => (
        <div key={idx} className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex flex-col gap-1 shadow-sm">
          <span className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">{stat.value}</span>
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Hire Workspace Rules ───────────────────────────────────────────── */
export function AgentRules({ rules }: { rules: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Aturan Kerja</h3>
      <div className="flex flex-col gap-3">
        {rules.map((rule, idx) => (
          <div key={idx} className="flex gap-3 items-start text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
            <ShieldAlert size={16} className="text-zinc-400 dark:text-zinc-500 flex-shrink-0 mt-0.5" />
            <span>{rule}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Hire Info Component ────────────────────────────────────────────── */
export function AgentHireInfo({ hireInfo }: { hireInfo: Agent["hireInfo"] }) {
  const details = [
    { label: "Minimum Project Value", value: hireInfo.minimumProject, icon: Award },
    { label: "Est. Response Time", value: hireInfo.responseTime, icon: HelpCircle },
    { label: "Preferred Communication", value: hireInfo.communication, icon: Layers },
    { label: "Working Hours", value: hireInfo.workingHours, icon: FileCheck },
    { label: "Max Active Projects", value: `${hireInfo.maxActiveProjects} Proyek`, icon: ShieldAlert },
  ];

  return (
    <div className="flex flex-col gap-4 p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Hire Information</h3>
      <div className="flex flex-col gap-4">
        {details.map((detail, idx) => {
          const Icon = detail.icon;
          return (
            <div key={idx} className="flex gap-3 items-start">
              <Icon size={16} className="text-zinc-400 dark:text-zinc-500 flex-shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  {detail.label}
                </span>
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {detail.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Reviews Component ──────────────────────────────────────────────── */
export function AgentReviews({ reviews }: { reviews: Agent["reviews"] }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Ulasan Client</h3>
      <div className="flex flex-col gap-4">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex flex-col gap-4"
          >
            {/* Rating Stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < rev.rating ? "text-amber-500 fill-amber-500" : "text-zinc-200"}
                />
              ))}
            </div>
            
            <p className="text-zinc-600 dark:text-zinc-300 text-sm italic font-light leading-relaxed">
              &ldquo;{rev.comment}&rdquo;
            </p>

            <div className="flex flex-col border-t border-zinc-100 dark:border-zinc-800 pt-3">
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{rev.client}</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">{rev.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
