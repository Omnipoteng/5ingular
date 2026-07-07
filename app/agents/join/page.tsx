"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CheckCircle,
  ArrowUpRight,
  Star,
  Users,
  Palette,
  Zap,
  Shield,
  ChevronDown,
  ChevronUp,
  Send,
  AlertCircle,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  Data
// ─────────────────────────────────────────────────────────────────────────────
const BENEFITS = [
  {
    icon: <Star className="w-5 h-5 text-blue-600" />,
    title: "Akses Proyek Eksklusif",
    desc: "Dapatkan akses ke klien premium dan proyek komersial yang tidak tersedia untuk publik umum.",
  },
  {
    icon: <Users className="w-5 h-5 text-blue-600" />,
    title: "Komunitas Profesional",
    desc: "Bergabung dengan jaringan desainer, animator, dan kreator terbaik yang saling mendukung satu sama lain.",
  },
  {
    icon: <Palette className="w-5 h-5 text-blue-600" />,
    title: "Branding & Visibilitas",
    desc: "Profil Anda akan ditampilkan di halaman Agents Directory resmi kami yang diakses ribuan calon klien.",
  },
  {
    icon: <Zap className="w-5 h-5 text-blue-600" />,
    title: "Tools & Infrastruktur",
    desc: "Akses ke 5ingular Editor Pro, template premium, aset kreatif internal, dan sumber daya eksklusif agen.",
  },
  {
    icon: <Shield className="w-5 h-5 text-blue-600" />,
    title: "Perlindungan Karya",
    desc: "Setiap karya Anda dilindungi oleh sistem HAKI kami. Kontrak kerja standar disediakan untuk setiap proyek.",
  },
];

const TERMS = [
  {
    num: "01",
    title: "Memiliki Portofolio Aktif",
    desc: "Anda wajib melampirkan minimal 3 karya terbaik sebagai bukti kompetensi di bidang yang Anda ajukan. Portofolio harus orisinal dan merupakan karya Anda sendiri.",
  },
  {
    num: "02",
    title: "Berkomitmen terhadap Kualitas",
    desc: "Setiap pekerjaan yang diterima melalui platform 5ingular wajib diselesaikan sesuai brief klien dengan standar profesional. Revisi wajar termasuk dalam layanan.",
  },
  {
    num: "03",
    title: "Responsif & Komunikatif",
    desc: "Agen resmi 5ingular diwajibkan untuk merespons pertanyaan klien dan manajemen dalam maksimal 1×24 jam pada hari kerja.",
  },
  {
    num: "04",
    title: "Tidak Melanggar HAKI",
    desc: "Dilarang keras menggunakan aset, font, foto stok, atau elemen desain pihak ketiga yang tidak dilisensikan secara komersial di dalam karya untuk klien.",
  },
  {
    num: "05",
    title: "Eksklusivitas Selama Kontrak",
    desc: "Selama menangani proyek klien 5ingular, Agen tidak diperbolehkan menawarkan jasa yang sama ke klien yang sama secara personal di luar platform.",
  },
  {
    num: "06",
    title: "Proses Seleksi & Onboarding",
    desc: "Pendaftaran tidak langsung disetujui. Tim kami akan meninjau aplikasi Anda dalam 3–7 hari kerja dan menghubungi melalui email yang Anda daftarkan.",
  },
];

const SPECIALIZATIONS = [
  "Graphic Design",
  "Brand Identity",
  "UI/UX Design",
  "Motion Graphics",
  "Video Editing",
  "Illustration",
  "Social Media Design",
  "Photography",
  "Web Design",
  "Copywriting",
  "3D Design",
  "Lainnya",
];

const EXPERIENCE_LEVELS = [
  "< 1 tahun",
  "1 – 2 tahun",
  "3 – 5 tahun",
  "5 – 10 tahun",
  "> 10 tahun",
];

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────
export default function JoinAgentPage() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expandedTerm, setExpandedTerm] = useState<number | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    specialization: "",
    experience: "",
    portfolio: "",
    instagram: "",
    behance: "",
    bio: "",
    motivation: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Nama lengkap wajib diisi.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Email tidak valid.";
    if (!form.phone.trim()) e.phone = "Nomor WhatsApp wajib diisi.";
    if (!form.specialization) e.specialization = "Pilih spesialisasi Anda.";
    if (!form.experience) e.experience = "Pilih lama pengalaman.";
    if (!form.portfolio.trim()) e.portfolio = "Link portofolio wajib diisi.";
    if (!form.bio.trim() || form.bio.trim().length < 30)
      e.bio = "Bio minimal 30 karakter.";
    if (!form.motivation.trim() || form.motivation.trim().length < 50)
      e.motivation = "Motivasi minimal 50 karakter.";
    if (!agreed) e.agreed = "Anda harus menyetujui syarat dan ketentuan.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const firstKey = Object.keys(errs)[0];
      document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  // Fade-in animation variant
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as any },
    }),
  };

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-white bg-grid-pattern overflow-hidden">

        {/* ──────────────────────────────────────────────────────────────────
            SECTION 1: HERO / INTRODUCTION
        ────────────────────────────────────────────────────────────────── */}
        <section className="relative pt-36 pb-24 overflow-hidden">
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-50/60 blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row items-center gap-16">

              {/* Left: Text */}
              <div className="flex-1 flex flex-col gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/50 shadow-sm self-start"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                    Agent Program · 5ingular Graphic
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 leading-tight"
                >
                  Jadilah Bagian dari<br />
                  <span className="text-blue-600">Tim Kreatif Kami.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-base sm:text-lg text-zinc-500 font-light leading-relaxed max-w-xl"
                >
                  5ingular Graphic membuka pendaftaran agen kreatif profesional. Bergabunglah dengan ekosistem kami dan dapatkan akses ke klien premium, proyek eksklusif, infrastruktur alat desain mutakhir, serta perlindungan HAKI penuh untuk setiap karya Anda.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-wrap gap-4"
                >
                  <a
                    href="#form-daftar"
                    className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-full shadow-lg shadow-blue-100"
                  >
                    Daftar Sekarang
                    <ArrowUpRight size={16} />
                  </a>
                  <a
                    href="#syarat-ketentuan"
                    className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition-colors rounded-full border border-zinc-200"
                  >
                    Baca Syarat & Ketentuan
                  </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="flex flex-wrap gap-8 pt-6 border-t border-zinc-100"
                >
                  {[
                    { val: "4+", label: "Agent Aktif" },
                    { val: "50+", label: "Proyek Selesai" },
                    { val: "100%", label: "HAKI Terlindungi" },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col gap-0.5">
                      <span className="text-2xl font-bold text-zinc-900">{s.val}</span>
                      <span className="text-xs text-zinc-500 font-light">{s.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right: Benefits Grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="p-5 bg-white border border-zinc-200/70 hover:border-blue-200 rounded-2xl hover:shadow-md hover:shadow-blue-50/30 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-600 transition-colors">
                      {React.cloneElement(b.icon, {
                        className: "w-4 h-4 text-blue-600 group-hover:text-white transition-colors",
                      })}
                    </div>
                    <h3 className="text-xs font-bold text-zinc-900 mb-1">{b.title}</h3>
                    <p className="text-[11px] text-zinc-500 font-light leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            SECTION 2: SYARAT & KETENTUAN
        ────────────────────────────────────────────────────────────────── */}
        <section id="syarat-ketentuan" className="py-24 bg-zinc-50/60 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Syarat & Ketentuan
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
                Apa yang Kami Harapkan dari Anda
              </h2>
              <p className="text-sm text-zinc-500 font-light leading-relaxed max-w-xl">
                Sebelum mendaftar, pastikan Anda telah membaca dan memahami seluruh persyaratan berikut. Dengan mengirimkan formulir, Anda dianggap telah menyetujui semua poin di bawah ini.
              </p>
            </div>

            {/* Accordion Terms */}
            <div className="flex flex-col gap-3">
              {TERMS.map((term, idx) => (
                <div
                  key={idx}
                  className={`bg-white border rounded-2xl overflow-hidden transition-all ${
                    expandedTerm === idx ? "border-blue-300 shadow-sm shadow-blue-50" : "border-zinc-200"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                    onClick={() => setExpandedTerm(expandedTerm === idx ? null : idx)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold font-mono text-blue-600 flex-shrink-0">
                        {term.num}
                      </span>
                      <span className="text-sm font-semibold text-zinc-900">{term.title}</span>
                    </div>
                    {expandedTerm === idx ? (
                      <ChevronUp size={16} className="text-zinc-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-zinc-400 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedTerm === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-xs text-zinc-500 font-light leading-relaxed border-t border-zinc-100 pt-4">
                          {term.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Summary checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Portofolio aktif & orisinal",
                "Kemampuan komunikasi profesional",
                "Komitmen terhadap deadline",
                "Lisensi aset yang digunakan",
                "Tidak melanggar NDA klien",
                "Bersedia mengikuti onboarding",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-xs text-zinc-600 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            SECTION 3: FORM PENDAFTARAN
        ────────────────────────────────────────────────────────────────── */}
        <section id="form-daftar" className="py-24 scroll-mt-24">
          <div className="max-w-3xl mx-auto px-6 md:px-12">

            {/* Header */}
            <div className="flex flex-col gap-3 mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Formulir Pendaftaran
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
                Isi Data Diri Anda
              </h2>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                Semua kolom bertanda wajib harus diisi. Aplikasi yang tidak lengkap tidak akan diproses.
              </p>
            </div>

            {/* Success State */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-5 py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-zinc-900">Aplikasi Terkirim!</h3>
                    <p className="text-sm text-zinc-500 font-light max-w-sm leading-relaxed">
                      Terima kasih, <strong>{form.fullName}</strong>. Tim kami akan meninjau aplikasi Anda dan menghubungi via email <strong>{form.email}</strong> dalam 3–7 hari kerja.
                    </p>
                  </div>
                  <a
                    href="/agents"
                    className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                  >
                    Lihat Agents Directory
                    <ArrowUpRight size={14} />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            {!submitted && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>

                {/* ── Informasi Dasar ── */}
                <fieldset className="flex flex-col gap-5">
                  <legend className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Informasi Pribadi
                  </legend>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field
                      id="fullName"
                      label="Nama Lengkap"
                      required
                      value={form.fullName}
                      onChange={(v) => set("fullName", v)}
                      error={errors.fullName}
                      placeholder="Masukkan nama lengkap"
                    />
                    <Field
                      id="email"
                      label="Alamat Email"
                      required
                      type="email"
                      value={form.email}
                      onChange={(v) => set("email", v)}
                      error={errors.email}
                      placeholder="email@contoh.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field
                      id="phone"
                      label="Nomor WhatsApp"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(v) => set("phone", v)}
                      error={errors.phone}
                      placeholder="+62 8xx xxxx xxxx"
                    />
                    <Field
                      id="city"
                      label="Kota / Domisili"
                      value={form.city}
                      onChange={(v) => set("city", v)}
                      placeholder="Contoh: Jakarta, Surabaya"
                    />
                  </div>
                </fieldset>

                {/* ── Spesialisasi & Pengalaman ── */}
                <fieldset className="flex flex-col gap-5">
                  <legend className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Keahlian & Pengalaman
                  </legend>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Specialization */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="specialization" className="text-xs font-semibold text-zinc-700">
                        Spesialisasi Utama <span className="text-blue-600">*</span>
                      </label>
                      <select
                        id="specialization"
                        value={form.specialization}
                        onChange={(e) => set("specialization", e.target.value)}
                        className={`px-3.5 py-2.5 bg-white border rounded-xl text-xs text-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.specialization ? "border-red-400" : "border-zinc-200"
                        }`}
                      >
                        <option value="">-- Pilih spesialisasi --</option>
                        {SPECIALIZATIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.specialization && <FieldError msg={errors.specialization} />}
                    </div>

                    {/* Experience */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="experience" className="text-xs font-semibold text-zinc-700">
                        Lama Pengalaman <span className="text-blue-600">*</span>
                      </label>
                      <select
                        id="experience"
                        value={form.experience}
                        onChange={(e) => set("experience", e.target.value)}
                        className={`px-3.5 py-2.5 bg-white border rounded-xl text-xs text-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.experience ? "border-red-400" : "border-zinc-200"
                        }`}
                      >
                        <option value="">-- Pilih pengalaman --</option>
                        {EXPERIENCE_LEVELS.map((l) => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                      {errors.experience && <FieldError msg={errors.experience} />}
                    </div>
                  </div>
                </fieldset>

                {/* ── Portofolio & Profil ── */}
                <fieldset className="flex flex-col gap-5">
                  <legend className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Portofolio & Profil Sosial
                  </legend>

                  <Field
                    id="portfolio"
                    label="Link Portofolio"
                    required
                    value={form.portfolio}
                    onChange={(v) => set("portfolio", v)}
                    error={errors.portfolio}
                    placeholder="https://behance.net/username atau link Drive"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field
                      id="instagram"
                      label="Instagram (opsional)"
                      value={form.instagram}
                      onChange={(v) => set("instagram", v)}
                      placeholder="@username"
                    />
                    <Field
                      id="behance"
                      label="Behance / Dribbble (opsional)"
                      value={form.behance}
                      onChange={(v) => set("behance", v)}
                      placeholder="https://behance.net/username"
                    />
                  </div>
                </fieldset>

                {/* ── Bio & Motivasi ── */}
                <fieldset className="flex flex-col gap-5">
                  <legend className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Tentang Diri Anda
                  </legend>

                  <TextareaField
                    id="bio"
                    label="Bio Singkat"
                    required
                    rows={3}
                    value={form.bio}
                    onChange={(v) => set("bio", v)}
                    error={errors.bio}
                    placeholder="Ceritakan secara singkat siapa Anda, latar belakang, dan keahlian utama Anda sebagai kreator (min. 30 karakter)."
                  />

                  <TextareaField
                    id="motivation"
                    label="Motivasi Bergabung"
                    required
                    rows={4}
                    value={form.motivation}
                    onChange={(v) => set("motivation", v)}
                    error={errors.motivation}
                    placeholder="Mengapa Anda ingin menjadi Agent 5ingular Graphic? Apa yang bisa Anda kontribusikan ke ekosistem kami? (min. 50 karakter)"
                  />
                </fieldset>

                {/* ── Agreement ── */}
                <div className="flex flex-col gap-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-zinc-300 text-blue-600 accent-blue-600 flex-shrink-0"
                    />
                    <span className="text-xs text-zinc-600 font-light leading-relaxed group-hover:text-zinc-800 transition-colors">
                      Saya telah membaca, memahami, dan menyetujui seluruh{" "}
                      <a href="#syarat-ketentuan" className="text-blue-600 font-semibold hover:underline">
                        Syarat & Ketentuan
                      </a>{" "}
                      Program Agent 5ingular Graphic yang tercantum di atas. Saya memastikan bahwa seluruh data yang saya isi adalah benar dan sah.
                    </span>
                  </label>
                  {errors.agreed && <FieldError msg={errors.agreed} />}
                </div>

                {/* ── Submit ── */}
                <button
                  type="submit"
                  className="self-start inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors rounded-full shadow-lg shadow-blue-100"
                >
                  <Send size={15} />
                  Kirim Aplikasi
                </button>

              </form>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Reusable sub-components
// ─────────────────────────────────────────────────────────────────────────────
function Field({
  id, label, required, type = "text", value, onChange, error, placeholder,
}: {
  id: string; label: string; required?: boolean; type?: string;
  value: string; onChange: (v: string) => void; error?: string; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-zinc-700">
        {label} {required && <span className="text-blue-600">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`px-3.5 py-2.5 bg-white border rounded-xl text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all ${
          error ? "border-red-400 bg-red-50/30" : "border-zinc-200"
        }`}
      />
      {error && <FieldError msg={error} />}
    </div>
  );
}

function TextareaField({
  id, label, required, rows, value, onChange, error, placeholder,
}: {
  id: string; label: string; required?: boolean; rows: number;
  value: string; onChange: (v: string) => void; error?: string; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-zinc-700">
        {label} {required && <span className="text-blue-600">*</span>}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`px-3.5 py-2.5 bg-white border rounded-xl text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none ${
          error ? "border-red-400 bg-red-50/30" : "border-zinc-200"
        }`}
      />
      {error && <FieldError msg={error} />}
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] text-red-500 font-medium">
      <AlertCircle size={11} />
      <span>{msg}</span>
    </div>
  );
}
