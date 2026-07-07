"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, Folder, Shield, BookOpen, Users, Code, HelpCircle } from "lucide-react";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const collections = [
    {
      id: "legal",
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      title: "Privasi dan kebijakan",
      desc: "Detail mengenai privasi data lokal, syarat penggunaan, dan kebijakan perlindungan karya.",
      href: "/help/collections/legal",
      articlesCount: 4,
    },
    {
      id: "editor-guide",
      icon: <BookOpen className="w-5 h-5 text-zinc-700" />,
      title: "Panduan & Fitur Editor",
      desc: "Pelajari cara menyunting gambar, mengelola layer, menambah teks, dan melakukan ekspor berkas.",
      href: "#",
      disabled: true,
      articlesCount: 5,
    },
    {
      id: "account-workspace",
      icon: <Folder className="w-5 h-5 text-zinc-700" />,
      title: "Akun & Workspace",
      desc: "Panduan mengelola preferensi proyek lokal, penyimpanan cache, dan setelan workspace.",
      href: "#",
      disabled: true,
      articlesCount: 3,
    },
    {
      id: "collaboration",
      icon: <Users className="w-5 h-5 text-zinc-700" />,
      title: "Kolaborasi & Tim",
      desc: "Informasi alur kolaborasi proyek agensi bersama tim desainer resmi 5ingular.",
      href: "#",
      disabled: true,
      articlesCount: 4,
    },
    {
      id: "api-dev",
      icon: <Code className="w-5 h-5 text-zinc-700" />,
      title: "API & Integrasi",
      desc: "Pusat dokumentasi integrasi API editor visual untuk platform pihak ketiga (Segera hadir).",
      href: "#",
      disabled: true,
      articlesCount: 0,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-white text-zinc-800 font-sans pt-28 pb-16">
        {/* Hero Section */}
        <div className="border-b border-zinc-100 bg-zinc-50/50 py-16 text-center">
          <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6 items-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              Ada yang bisa kami bantu?
            </h1>
            
            {/* Search Input */}
            <div className="relative w-full max-w-xl shadow-sm rounded-xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Cari artikel bantuan atau topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-zinc-200 rounded-xl text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-light transition-all"
              />
            </div>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((col) => (
              <div key={col.id}>
                {col.disabled ? (
                  <div className="p-6 border border-zinc-100 rounded-2xl bg-zinc-50/40 opacity-60 cursor-not-allowed flex flex-col gap-4 h-full justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center">
                        {col.icon}
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-bold text-zinc-700">{col.title}</h3>
                        <p className="text-xs text-zinc-400 font-light leading-relaxed">{col.desc}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium">Coming soon</span>
                  </div>
                ) : (
                  <Link
                    href={col.href}
                    className="p-6 border border-zinc-200 hover:border-blue-300 rounded-2xl bg-white hover:shadow-lg hover:shadow-blue-50/20 transition-all flex flex-col gap-4 h-full justify-between group"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <Shield className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-bold text-zinc-950 group-hover:text-blue-600 transition-colors">
                          {col.title}
                        </h3>
                        <p className="text-xs text-zinc-500 font-light leading-relaxed">{col.desc}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">
                      {col.articlesCount} artikel
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
