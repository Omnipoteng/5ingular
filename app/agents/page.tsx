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
      <main className="w-full min-h-screen bg-white bg-grid-pattern pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col gap-5 mb-16 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Directory
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
              Our Professional Agents.
            </h1>
            <p className="text-zinc-500 font-light leading-relaxed">
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
        </div>
      </main>
      <Footer />
    </>
  );
}
