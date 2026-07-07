"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronRight, Search, Shield, FileText, ArrowLeft } from "lucide-react";

export default function LegalCollectionPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const articles = [
    {
      title: "Syarat & Ketentuan Layanan 5ingular",
      desc: "Ketentuan lisensi penggunaan editor grafis, batas hak milik aset bawaan, dan yuridiksi hukum layanan.",
      href: "/terms",
    },
    {
      title: "Perlindungan Karya & HAKI Editor",
      desc: "Bagaimana sistem editor membantu melindungi karya seni kreatif Anda dari penyalahgunaan dan pencurian.",
      href: "/protection",
    },
    {
      title: "Kebijakan Privasi & Enkripsi Data Lokal",
      desc: "Informasi lengkap tentang cara penyimpanan data browser (localStorage) dienkripsi tanpa diunggah ke cloud publik.",
      href: "/privacy",
    },
    {
      title: "Pedoman Penggunaan Aset Kreatif",
      desc: "Aturan lisensi penggunaan bentuk kustom, ikon lucide, dan font yang dimuat di dalam editor.",
      href: "/help/asset-usage",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-white text-zinc-800 font-sans pt-28 pb-16">
        {/* Search header with breadcrumb */}
        <div className="border-b border-zinc-100 bg-zinc-50/50 py-6 mb-8">
          <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
              <Link href="/help" className="hover:text-blue-600 transition-colors">All Collections</Link>
              <ChevronRight size={12} />
              <span className="text-zinc-700">Privasi dan kebijakan</span>
            </div>

            <div className="relative max-w-xs w-full">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Cari dalam koleksi ini..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-lg text-xs bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-light transition-all"
              />
            </div>
          </div>
        </div>

        {/* Collection details and article list */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Header info */}
            <div className="w-full lg:w-80 flex flex-col gap-4 lg:sticky lg:top-32">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold text-zinc-950">Privasi dan kebijakan</h1>
                <p className="text-xs text-zinc-500 font-light leading-relaxed">
                  Panduan komprehensif mengenai lisensi, perlindungan kepemilikan karya, hak cipta intelektual, dan privasi data lokal pengguna di platform 5ingular.
                </p>
              </div>
              <Link
                href="/help"
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-blue-600 transition-colors mt-2"
              >
                <ArrowLeft size={14} />
                <span>Kembali ke semua koleksi</span>
              </Link>
            </div>

            {/* Articles list */}
            <div className="flex-1 w-full flex flex-col gap-4">
              {articles
                .filter((art) => art.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((art, idx) => (
                  <Link
                    key={idx}
                    href={art.href}
                    className="p-5 border border-zinc-200 hover:border-blue-200 rounded-2xl bg-white hover:shadow-md hover:shadow-blue-50/20 transition-all flex justify-between items-center group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FileText className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-semibold text-zinc-950 group-hover:text-blue-600 transition-colors">
                          {art.title}
                        </h3>
                        <p className="text-xs text-zinc-500 font-light leading-relaxed">{art.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
