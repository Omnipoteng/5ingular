"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronRight, ThumbsUp, ThumbsDown, MessageSquare, Search } from "lucide-react";

export default function TermsPage() {
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
          5ingular Graphic menawarkan alat editor grafis digital berbasis peramban (browser) untuk mendukung produktivitas kreator secara fleksibel. Syarat dan Ketentuan Layanan ini mengatur penggunaan platform kami, lisensi alat penyuntingan, hak cipta karya, serta batasan tanggung jawab hukum. Dengan menggunakan platform ini, Anda menyetujui seluruh ketentuan yang tercantum di bawah ini.
        </p>
      ),
    },
    {
      id: "penggunaan-akun",
      title: "Penggunaan Platform & Akun Pengguna",
      content: (
        <div className="flex flex-col gap-3 text-zinc-600 leading-relaxed font-light">
          <p>
            Untuk mengakses workspace editor, pengguna tidak diwajibkan mendaftar untuk versi dasar, namun pendaftaran akun diperlukan untuk menyimpan preferensi tingkat lanjut di masa mendatang. Pengguna wajib mematuhi aturan berikut:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Menjaga keamanan akses kredensial peramban lokal Anda.</li>
            <li>Tidak menggunakan bot otomatis untuk memanipulasi kinerja kanvas atau server.</li>
            <li>Tidak mengunggah file gambar yang melanggar hukum, berhak cipta milik orang lain tanpa lisensi, atau mengandung malware.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "haki",
      title: "Hak Kekayaan Intelektual (HAKI)",
      content: (
        <div className="flex flex-col gap-3 text-zinc-600 leading-relaxed font-light">
          <p>
            Struktur kode, pustaka antarmuka, desain ikon, logo 5ingular Graphic, dan algoritma rendering kanvas sepenuhnya merupakan hak milik intelektual eksklusif kami.
          </p>
          <p className="font-medium text-zinc-800">
            Hak cipta atas karya seni, poster, desain sosial media, atau manipulasi gambar yang Anda selesaikan di dalam editor tetap 100% menjadi milik Anda sebagai pencipta (editor/kreator). 5ingular Graphic tidak mengklaim hak kepemilikan atas konten akhir Anda.
          </p>
        </div>
      ),
    },
    {
      id: "pembayaran-fitur",
      title: "Pembayaran & Fitur Premium",
      content: (
        <p className="text-zinc-600 leading-relaxed font-light">
          Fitur editor dasar (fungsionalitas kanvas, ekspor standar, rendering layer, dan tools gambar) tersedia secara gratis dalam periode Beta ini. Kami berhak memperkenalkan paket berlangganan komersial atau pembelian aset premium di masa mendatang. Semua bentuk pembelian dalam aplikasi bersifat final dan tidak dapat di-refund, kecuali disetujui lain oleh tim kebijakan kami.
        </p>
      ),
    },
    {
      id: "batasan-tanggung-jawab",
      title: "Batasan Tanggung Jawab Hukum",
      content: (
        <div className="flex flex-col gap-3 text-zinc-600 leading-relaxed font-light">
          <p>
            Platform kami disediakan secara &apos;as-is&apos; (sebagaimana adanya). 5ingular Graphic tidak bertanggung jawab atas:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Kehilangan data proyek akibat pembersihan cache peramban (localStorage) oleh sistem operasi pengguna secara otomatis.</li>
            <li>Kerugian komersial langsung maupun tidak langsung akibat ketidaktersediaan sementara platform selama masa pemeliharaan server.</li>
            <li>Pelanggaran hak cipta pihak ketiga yang dilakukan secara sengaja oleh pengguna saat menyusun karya di kanvas kami.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "perubahan-ketentuan",
      title: "Perubahan Ketentuan Layanan",
      content: (
        <p className="text-zinc-600 leading-relaxed font-light">
          Syarat dan ketentuan ini dapat diubah sewaktu-waktu. Kami akan memperbarui tanggal di bagian atas artikel ini ketika pembaruan diterapkan. Penggunaan platform secara berkelanjutan setelah pembaruan dipublikasikan menunjukkan penerimaan mutlak Anda terhadap syarat dan ketentuan baru tersebut.
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
              <span className="text-zinc-700">Syarat & Ketentuan</span>
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
                Syarat & Ketentuan Layanan 5ingular
              </h1>
              <p className="text-xs text-zinc-400 font-light mb-8">
                Diperbarui: 7 Juli 2026 · Waktu baca 4 menit
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
                    Terima kasih! Masukan Anda telah berhasil dikirim dan membantu kami meningkatkan kualitas dokumentasi layanan kami.
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
                    href="/protection"
                    className="flex justify-between items-center p-5 bg-white border border-zinc-200 hover:border-blue-300 rounded-2xl group shadow-sm transition-all"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-xs sm:text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                        Perlindungan Karya & HAKI Editor
                      </span>
                      <span className="text-[10px] text-zinc-400 font-light">
                        Kebijakan hak cipta dan perlindungan lisensi berkas kreatif.
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/privacy"
                    className="flex justify-between items-center p-5 bg-white border border-zinc-200 hover:border-blue-300 rounded-2xl group shadow-sm transition-all"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-xs sm:text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                        Kebijakan Privasi & Enkripsi Data
                      </span>
                      <span className="text-[10px] text-zinc-400 font-light">
                        Bagaimana data browser dan cookie proyek dienkripsi lokal.
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
