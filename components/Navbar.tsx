"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import EditorIntroModal from "./EditorIntroModal";

/* ─── Mega Menu Data ────────────────────────────────────────────────── */
const megaMenus: Record<
  string,
  { heading: string; items: { label: string; desc: string; href: string }[] }[]
> = {
  "Layanan Kami": [
    {
      heading: "Desain",
      items: [
        { label: "Graphic Design", desc: "Visual marketing & publikasi", href: "/#services" },
        { label: "Brand Identity", desc: "Logo, tipografi, panduan brand", href: "/#services" },
        { label: "Poster Design", desc: "Desain poster & flyer premium", href: "/#services" },
        { label: "Presentation Design", desc: "Slide deck profesional", href: "/#services" },
      ],
    },
    {
      heading: "Digital",
      items: [
        { label: "UI/UX Design", desc: "Desain antarmuka & pengalaman", href: "/#services" },
        { label: "Website Design", desc: "Landing page & web app", href: "/#services" },
        { label: "Social Media Design", desc: "Konten visual untuk sosmed", href: "/#services" },
        { label: "Thumbnail", desc: "Thumbnail YouTube & platform", href: "/#services" },
      ],
    },
    {
      heading: "Media",
      items: [
        { label: "Photo Editing", desc: "Retouching & color grading", href: "/#services" },
        { label: "Motion Design", desc: "Animasi 2D/3D & kinetic", href: "/#services" },
        { label: "Video Editing", desc: "Editing sinematik & komersial", href: "/#services" },
        { label: "Custom Project", desc: "Kebutuhan kreatif khusus", href: "/#services" },
      ],
    },
  ],
  "Portofolio": [
    {
      heading: "Kategori",
      items: [
        { label: "Web Application", desc: "Platform & UI digital", href: "/#portfolio" },
        { label: "Brand Identity", desc: "Identitas visual perusahaan", href: "/#portfolio" },
        { label: "Motion Graphics", desc: "Animasi & motion art", href: "/#portfolio" },
        { label: "Photography", desc: "Foto produk & editorial", href: "/#portfolio" },
      ],
    },
  ],
  "Kolaborasi": [
    {
      heading: "Mulai Bersama",
      items: [
        { label: "Mulai Kolaborasi", desc: "Jadikan visi Anda nyata", href: "/collaboration" },
        { label: "Hubungi Sales", desc: "Diskusi langsung dengan tim", href: "/collaboration#contact" },
        { label: "Book Konsultasi", desc: "Jadwalkan sesi konsultasi", href: "/collaboration#contact" },
      ],
    },
    {
      heading: "Informasi",
      items: [
        { label: "Workflow Kami", desc: "Proses kerja dari A–Z", href: "/collaboration" },
        { label: "Paket & Harga", desc: "Custom quotation tersedia", href: "/collaboration" },
        { label: "FAQ", desc: "Pertanyaan yang sering diajukan", href: "/collaboration" },
      ],
    },
  ],
  "Agents": [
    {
      heading: "Directory",
      items: [
        { label: "Agents Directory", desc: "Daftar talenta kreatif resmi", href: "/agents" },
        { label: "Daftar Menjadi Agen", desc: "Bergabung sebagai agent resmi kami", href: "/agents/join" },
      ],
    },
    {
      heading: "Talenta Resmi",
      items: [
        { label: "Agent #01 - Arya", desc: "Founder & Creative Director", href: "/agents/arya" },
        { label: "Agent #02 - Reno", desc: "Senior Motion & Editor", href: "/agents/reno" },
        { label: "Agent #03 - Dania", desc: "UI/UX & Web Designer", href: "/agents/dania" },
        { label: "Agent #04 - Zack", desc: "Illustrator & Social Designer", href: "/agents/zack" },
      ],
    },
  ],
};

/* ─── Nav Link Definition ────────────────────────────────────────────── */
const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Layanan Kami", href: "/#services" },
  { name: "Portofolio", href: "/#portfolio" },
  { name: "Tentang Kami", href: "/#about" },
  { name: "Editor", href: "/editor" },
  { name: "Agents", href: "/agents" },
  { name: "Kolaborasi", href: "/collaboration" },
];

/* ─── Dropdown Panel ─────────────────────────────────────────────────── */
function DropdownPanel({
  sections,
}: {
  sections: { heading: string; items: { label: string; desc: string; href: string }[] }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50"
    >
      {/* Arrow */}
      <div className="flex justify-center mb-[-1px]">
        <div className="w-3 h-3 rotate-45 bg-white border-l border-t border-zinc-200" />
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl shadow-xl shadow-zinc-200/60 overflow-hidden p-6 flex gap-10 min-w-max">
        {sections.map((section) => (
          <div key={section.heading} className="flex flex-col gap-3 min-w-[180px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 pb-1 border-b border-zinc-100">
              {section.heading}
            </p>
            {section.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex flex-col gap-0.5 px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <span className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                  {item.label}
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </span>
                <span className="text-xs text-zinc-400 font-light">{item.desc}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────────────── */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const leaveTimer = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleEnter = useCallback((name: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    if (megaMenus[name]) setActiveMenu(name);
  }, []);

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 120);
  }, []);

  const handlePanelEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-md border-b border-zinc-100 py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="text-xl font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-blue-600">
              5ingular<span className="text-blue-600"> Graphic</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 relative">
            {navLinks.map((link) => {
              const hasMega = !!megaMenus[link.name];
              const isActive = activeMenu === link.name;
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => handleEnter(link.name)}
                  onMouseLeave={handleLeave}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.name === "Editor") {
                        e.preventDefault();
                        setIsIntroOpen(true);
                      }
                    }}
                    className={`inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    {link.name}
                    {hasMega && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${isActive ? "rotate-180 text-blue-600" : ""}`}
                      />
                    )}
                  </Link>

                  {hasMega && (
                    <AnimatePresence>
                      {isActive && (
                        <div
                          onMouseEnter={handlePanelEnter}
                          onMouseLeave={handleLeave}
                        >
                          <DropdownPanel sections={megaMenus[link.name]} />
                        </div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <Link
              href="/collaboration"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-full shadow-sm shadow-blue-200"
            >
              Ayo Mulai
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-zinc-600 hover:text-zinc-950 p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[60px] left-0 right-0 z-30 bg-white/97 backdrop-blur-md border-b border-zinc-100 shadow-lg md:hidden overflow-y-auto max-h-[80vh]"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileOpen(false);
                    if (link.name === "Editor") {
                      e.preventDefault();
                      setIsIntroOpen(true);
                    }
                  }}
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium text-zinc-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  {link.name}
                  <ArrowUpRight size={14} className="text-zinc-300" />
                </Link>
              ))}

              {/* Mobile mega items flattened */}
              {Object.entries(megaMenus).map(([, sections]) =>
                sections.flatMap((s) =>
                  s.items.map((item) => null) // intentionally collapsed for mobile — links above cover it
                )
              )}

              <div className="mt-4 pt-4 border-t border-zinc-100">
                <Link
                  href="/collaboration"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-full shadow-sm shadow-blue-200"
                >
                  Ayo Mulai
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isIntroOpen && (
          <EditorIntroModal onClose={() => setIsIntroOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
