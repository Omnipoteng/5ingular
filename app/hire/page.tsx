import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight, CalendarClock, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Hire an Agent | 5ingular Graphic",
  description:
    "Sewa Agent profesional dari 5ingular Graphic untuk proyek desain, branding, motion, UI/UX, dan lebih banyak lagi.",
};

export default function HirePage() {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-white bg-grid-pattern pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-50 border border-zinc-200/60 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Hire System
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
            Sistem Hire Sedang{" "}
            <span className="text-blue-600">Disiapkan.</span>
          </h1>

          <p className="text-zinc-500 font-light leading-relaxed max-w-lg">
            Sistem pemesanan Agent secara online sedang dalam pengembangan. Untuk saat ini, Anda dapat
            menghubungi kami secara langsung melalui halaman Kolaborasi atau kontak di bawah ini.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/collaboration#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-full shadow-lg shadow-blue-200"
            >
              Hubungi Sales
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/agents"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition-colors rounded-full border border-zinc-200"
            >
              <MessageSquare size={15} />
              Lihat Agents
            </Link>
          </div>

          {/* Coming Soon Info */}
          <div className="w-full p-6 bg-zinc-50 border border-zinc-100 rounded-2xl mt-4 flex flex-col gap-3 text-left">
            <div className="flex items-center gap-2 text-zinc-400">
              <CalendarClock size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Fitur Mendatang</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400 font-light">
              {[
                "Booking Calendar Online",
                "Real-time Agent Availability",
                "Contract Management",
                "Invoice System",
                "Payment Gateway",
                "Project Tracking Dashboard",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-zinc-300 flex-shrink-0" />
                  {feat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
