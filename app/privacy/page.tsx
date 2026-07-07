"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronRight, ThumbsUp, ThumbsDown, Search } from "lucide-react";

export default function PrivacyPage() {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [liked, setLiked] = useState<boolean | null>(null);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
  };

  const sections = [
    {
      id: "ringkasan",
      title: "Ringkasan",
      content: (
        <p className="text-zinc-600 leading-relaxed font-light">
          Di 5ingular Graphic, privasi data desain dan informasi pribadi Anda adalah prioritas utama. Karena editor kami berjalan sepenuhnya di sisi klien (client-side), kami menerapkan arsitektur isolasi lokal di mana data proyek Anda disimpan di komputer Anda sendiri tanpa risiko kebocoran di cloud publik.
        </p>
      ),
    },
    {
      id: "data-lokal",
      title: "Penyimpanan Lokal & Enkripsi",
      content: (
        <div className="flex flex-col gap-3 text-zinc-600 leading-relaxed font-light">
          <p>
            Semua riwayat pengeditan (undo/redo snapshots), susunan layer, gambar latar yang Anda unggah, dan preset proyek disimpan menggunakan fitur penyimpanan lokal peramban Anda (localStorage dan IndexedDB).
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li><strong>Tidak Ada Pengunggahan Otomatis:</strong> Gambar atau desain yang Anda buat tidak diunggah ke server kami kecuali jika Anda memilih opsi integrasi cloud tertentu (opsional di masa mendatang).</li>
            <li><strong>Enkripsi Lokal:</strong> Data proyek cadangan (.singularproject) diekspor langsung dari memori peramban Anda secara lokal sehingga aman dari pencurian pihak ketiga selama transfer internet.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "cookie-tracking",
      title: "Penggunaan Cookie & Pelacakan",
      content: (
        <p className="text-zinc-600 leading-relaxed font-light">
          Kami hanya menggunakan cookie esensial yang diperlukan untuk menyimpan pengaturan editor (seperti zoom default, preferensi tema, status snap guides, dan status tutorial onboarding). Kami tidak menggunakan cookie pelacakan pihak ketiga untuk keperluan iklan bertarget.
        </p>
      ),
    },
    {
      id: "hak-hapus",
      title: "Hak Menghapus Data Anda",
      content: (
        <p className="text-zinc-600 leading-relaxed font-light">
          Karena semua data disimpan di penyimpanan lokal browser Anda, Anda memiliki kontrol penuh atas data tersebut. Anda dapat menghapus semua proyek, preferensi, dan riwayat kapan saja dengan membersihkan cache/cookie browser Anda secara manual, atau menggunakan opsi &apos;Hapus Data Proyek&apos; di dalam panel setelan workspace.
        </p>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-white text-zinc-800 font-sans pt-28 pb-16">
        {/* Help Center Search Bar */}
        <div className="border-b border-zinc-100 bg-zinc-50/50 py-6 mb-8">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
              <Link href="/help" className="hover:text-blue-600 transition-colors">All Collections</Link>
              <ChevronRight size={12} />
              <Link href="/help/collections/legal" className="hover:text-blue-600 transition-colors text-zinc-500">Privasi dan kebijakan</Link>
              <ChevronRight size={12} />
              <span className="text-zinc-700">Kebijakan Privasi</span>
            </div>
            
            {/* Search Input Mock */}
            <div className="relative max-w-xs w-full">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Cari artikel bantuan..."
                className="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-lg text-xs bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-light transition-all"
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left Column: Article Content */}
            <div className="flex-1 max-w-4xl">
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950 mb-2">
                Kebijakan Privasi & Enkripsi Data Lokal
              </h1>
              <p className="text-xs text-zinc-400 font-light mb-8">
                Diperbarui: 7 Juli 2026 · Waktu baca 3 menit
              </p>

              <div className="h-px bg-zinc-100 mb-8" />

              {/* Document Sections */}
              <div className="flex flex-col gap-10">
                {sections.map((sec) => (
                  <section key={sec.id} id={sec.id} className="scroll-mt-36">
                    <h2 className="text-lg sm:text-xl font-bold text-zinc-950 mb-3.5">
                      {sec.title}
                    </h2>
                    <div className="text-xs sm:text-sm">
                      {sec.content}
                    </div>
                  </section>
                ))}
              </div>

              <div className="h-px bg-zinc-100 my-10" />

              {/* Feedback Form Widget */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-6 max-w-xl">
                <h3 className="text-sm font-bold text-zinc-950 mb-2.5">
                  Apakah artikel ini membantu?
                </h3>
                
                {feedbackSent ? (
                  <div className="text-xs sm:text-sm text-green-600 font-medium">
                    Terima kasih! Masukan Anda telah berhasil dikirim dan membantu kami meningkatkan privasi data layanan kami.
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
                    {/* Like / Dislike Buttons */}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setLiked(true)}
                        className={`flex items-center justify-center w-10 h-10 border rounded-xl transition-all ${
                          liked === true
                            ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-150"
                            : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                        }`}
                      >
                        <ThumbsUp size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setLiked(false)}
                        className={`flex items-center justify-center w-10 h-10 border rounded-xl transition-all ${
                          liked === false
                            ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-150"
                            : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                        }`}
                      >
                        <ThumbsDown size={16} />
                      </button>
                    </div>

                    {/* Feedback Input */}
                    <div className="flex flex-col gap-1.5">
                      <textarea
                        rows={3}
                        placeholder="Masukan tambahan (opsional)"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-light resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={liked === null}
                      className="self-start px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-900 text-white text-xs font-bold rounded-lg tracking-wide uppercase transition-colors"
                    >
                      Kirim
                    </button>
                  </form>
                )}
              </div>

              <div className="h-px bg-zinc-100 my-10" />

              {/* Related Articles Panel */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                  Artikel terkait
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/terms"
                    className="flex justify-between items-center p-5 bg-white border border-zinc-200 hover:border-blue-300 rounded-2xl group shadow-sm transition-all"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-xs sm:text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                        Syarat & Ketentuan Layanan 5ingular
                      </span>
                      <span className="text-[10px] text-zinc-400 font-light">
                        Aturan penggunaan platform editor digital dan layanan kreatif kami.
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/protection"
                    className="flex justify-between items-center p-5 bg-white border border-zinc-200 hover:border-blue-300 rounded-2xl group shadow-sm transition-all"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-xs sm:text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                        Perlindungan Karya & HAKI Editor
                      </span>
                      <span className="text-[10px] text-zinc-400 font-light">
                        Kebijakan perlindungan hak milik karya dan bantuan legalitas kreator.
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Summary Panel */}
            <aside className="w-full lg:w-64 lg:sticky lg:top-32 flex-shrink-0">
              <div className="border border-zinc-100 rounded-2xl p-5 bg-zinc-50/40">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3.5">
                  Ringkasan
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {sections.map((sec) => (
                    <li key={sec.id}>
                      <a
                        href={`#${sec.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-xs text-zinc-500 hover:text-blue-600 leading-tight block font-light transition-colors"
                      >
                        {sec.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
