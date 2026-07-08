import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentCard from "@/components/agents/AgentCard";
import { agents } from "@/data/agents";

export const metadata: Metadata = {
  title: "Agents Directory | 5ingular Graphic",
  description:
    "Hubungi dan sewa desainer serta animator profesional resmi di bawah 5ingular Graphic. Pilih talenta yang paling cocok untuk proyek kreatif Anda.",
};

export default function AgentsDirectoryPage() {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-white dark:bg-zinc-950 bg-grid-pattern pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col gap-5 mb-16 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Directory
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Our Professional Agents.
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Setiap Agent adalah seorang profesional yang memiliki spesialisasi, portofolio, reputasi,
              dan aturan kerja masing-masing. Sewa Agent pilihan Anda secara langsung.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {agents.map((agent, index) => (
              <AgentCard key={agent.id} agent={agent} index={index} />
            ))}
          </div>

          {/* Join CTA */}
          <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Open Recruitment</span>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Ingin menjadi bagian dari tim kami?</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light">
                Kami membuka pendaftaran agent kreatif baru. Daftarkan diri Anda sekarang dan mulai berkarir bersama 5ingular Graphic.
              </p>
            </div>
            <a
              href="/agents/join"
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-full shadow-lg shadow-blue-100 dark:shadow-none"
            >
              Daftar Menjadi Agen
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
