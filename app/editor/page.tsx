"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  Sparkles,
  Image as ImageIcon,
  Video,
  BookOpen,
  Clock,
  FolderOpen,
  Plus,
  Upload,
  FileImage,
  ChevronRight,
  HardDrive,
  X,
  Sliders,
  Settings,
  Palette
} from "lucide-react";
import GradientText from "@/components/GradientText";

export default function WorkspacePage() {
  const router = useRouter();
  
  // State for loaded project
  const [hasSavedProject, setHasSavedProject] = useState(false);
  const [projectPreset, setProjectPreset] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Creation Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"photo" | "video" | "manga">("photo");
  
  // Photo Editor Config States
  const [projectName, setProjectName] = useState("Untitled Project");
  const [canvasWidth, setCanvasWidth] = useState(1200);
  const [canvasHeight, setCanvasHeight] = useState(800);
  const [canvasDpi, setCanvasDpi] = useState(300);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [isCustomColor, setIsCustomColor] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("singular_editor_save");
      const preset = localStorage.getItem("singular_editor_preset");
      if (saved) {
        setHasSavedProject(true);
        if (preset) {
          try {
            setProjectPreset(JSON.parse(preset));
          } catch {
            setProjectPreset(null);
          }
        }
      }
    }
  }, []);

  const clearProject = () => {
    if (confirm("Apakah Anda yakin ingin menghapus proyek saat ini? Tindakan ini tidak dapat dibatalkan.")) {
      localStorage.removeItem("singular_editor_save");
      localStorage.removeItem("singular_editor_preset");
      setHasSavedProject(false);
      setProjectPreset(null);
    }
  };

  // Preset Sizes
  const presetSizes = [
    { name: "Instagram Post", width: 1080, height: 1080, desc: "1:1 Aspect Ratio" },
    { name: "YouTube Thumbnail", width: 1280, height: 720, desc: "16:9 HD Resolution" },
    { name: "Poster A4", width: 2480, height: 3508, desc: "A4 Print Standard" },
    { name: "Presentation", width: 1920, height: 1080, desc: "16:9 FHD Screen" },
    { name: "Instagram Story", width: 1080, height: 1920, desc: "9:16 Portrait" },
    { name: "Square Banner", width: 800, height: 800, desc: "Ad Placement" },
  ];

  // Templates definition for placeholder cards
  const templates = [
    { name: "Instagram Post", ratio: "1:1", size: "1080 x 1080 px", bg: "from-pink-50 to-rose-50" },
    { name: "YouTube Thumbnail", ratio: "16:9", size: "1280 x 720 px", bg: "from-red-50 to-orange-50" },
    { name: "Poster A4", ratio: "1:1.41", size: "2480 x 3508 px", bg: "from-blue-50 to-indigo-50" },
    { name: "Presentation", ratio: "16:9", size: "1920 x 1080 px", bg: "from-amber-50 to-yellow-50" },
    { name: "Story", ratio: "9:16", size: "1080 x 1920 px", bg: "from-purple-50 to-fuchsia-50" },
    { name: "Square Banner", ratio: "1:1", size: "800 x 800 px", bg: "from-emerald-50 to-teal-50" },
  ];

  const handleApplyPreset = (preset: any) => {
    setProjectName(preset.name);
    setCanvasWidth(preset.width);
    setCanvasHeight(preset.height);
  };

  // Launch the new canvas editor
  const handleCreateCanvas = () => {
    if (!projectName.trim()) {
      alert("Nama proyek tidak boleh kosong.");
      return;
    }
    if (canvasWidth <= 0 || canvasHeight <= 0) {
      alert("Dimensi lebar dan tinggi harus lebih besar dari 0.");
      return;
    }

    // Prepare fresh new preset object
    const newPreset = {
      name: projectName.trim(),
      width: canvasWidth,
      height: canvasHeight,
      bgColor: bgColor,
      dpi: canvasDpi
    };

    // Remove old saved document data so the workspace opens completely fresh
    localStorage.removeItem("singular_editor_save");
    localStorage.setItem("singular_editor_preset", JSON.stringify(newPreset));

    // Redirect to photo canvas editor
    router.push("/editor/photo");
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col text-zinc-800 font-sans">
      
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-lg font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-blue-600">
              5ingular<span className="text-blue-600"> Graphic</span>
            </span>
          </Link>
          <div className="h-4 w-px bg-zinc-200" />
          <span className="px-2 py-0.5 bg-blue-50 text-[10px] font-bold text-blue-600 rounded-md uppercase tracking-wider">
            Workspace
          </span>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 w-60 rounded-full border border-zinc-200 bg-zinc-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-light"
            />
          </div>

          <button className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors relative">
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          </button>

          <div className="flex items-center gap-2 border-l border-zinc-200 pl-3">
            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white font-extrabold text-[10px] flex items-center justify-center shadow-sm uppercase">
              SG
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 flex flex-col gap-8">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-50/50 blur-3xl -z-10" />

          <div className="flex flex-col gap-2.5 max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/60 shadow-sm w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-blue-600">
                Studio Hub v0.1.0 Beta
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              <GradientText>Creative Workspace</GradientText>
            </h1>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              Everything starts here. Create, edit and manage your creative projects inside one unified workspace.
            </p>
          </div>

          {/* Vector Mockup Illustration */}
          <div className="w-full max-w-[240px] md:max-w-[280px] flex-shrink-0 relative bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-2">
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="w-16 h-3 bg-zinc-200 rounded-sm" />
            </div>
            <div className="h-24 bg-white rounded-lg border border-zinc-200 border-dashed flex items-center justify-center relative overflow-hidden">
              <div className="absolute -rotate-12 w-16 h-8 bg-blue-100 rounded border border-blue-200 shadow-sm flex items-center justify-center">
                <span className="text-[7px] font-bold text-blue-700 tracking-widest uppercase">Canvas</span>
              </div>
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 animate-bounce" />
            </div>
          </div>
        </section>

        {/* ================= CREATE NEW ================= */}
        <section className="flex flex-col gap-3">
          <h2 className="text-zinc-950 uppercase tracking-wider text-[10px] font-bold">
            Create New
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1: Blank Document Trigger */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-white border-2 border-dashed border-zinc-200 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-blue-500 hover:bg-blue-50/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform shadow-sm">
                <Plus size={22} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                  Create Blank Canvas
                </h3>
                <p className="text-[11px] text-zinc-400 font-light max-w-[240px] leading-normal">
                  Mulai proyek baru dengan ukuran kustom, warna latar, dan pengaturan resolusi DPI lengkap.
                </p>
              </div>
            </button>

            {/* Card 2: Video Workspace Placeholder */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 flex flex-col justify-between gap-4 shadow-sm opacity-65">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-zinc-50 border border-zinc-200/65 text-zinc-400 flex items-center justify-center">
                    <Video size={16} />
                  </div>
                  <span className="px-1.5 py-0.5 bg-zinc-100 text-[8px] font-bold text-zinc-400 rounded uppercase tracking-wider">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-500 font-sans">
                  Video Editor Studio
                </h3>
                <p className="text-[11px] text-zinc-400/80 font-light leading-relaxed">
                  Professional cinematic timeline sequencer, audio multitrack, and transition studio.
                </p>
              </div>
              <button disabled className="w-full py-2 bg-zinc-100 text-zinc-400 font-bold text-[9px] uppercase tracking-wider rounded-lg cursor-not-allowed text-center border border-zinc-200/20">
                Studio Unavailable
              </button>
            </div>

            {/* Card 3: Manga Canvas Placeholder */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 flex flex-col justify-between gap-4 shadow-sm opacity-65">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-zinc-50 border border-zinc-200/65 text-zinc-400 flex items-center justify-center">
                    <BookOpen size={16} />
                  </div>
                  <span className="px-1.5 py-0.5 bg-zinc-100 text-[8px] font-bold text-zinc-400 rounded uppercase tracking-wider">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-500 font-sans">
                  Manga & Comic Canvas
                </h3>
                <p className="text-[11px] text-zinc-400/80 font-light leading-relaxed">
                  Comic layouts, screen tones, speech bubble vector assets, and brush panel.
                </p>
              </div>
              <button disabled className="w-full py-2 bg-zinc-100 text-zinc-400 font-bold text-[9px] uppercase tracking-wider rounded-lg cursor-not-allowed text-center border border-zinc-200/20">
                Studio Unavailable
              </button>
            </div>

          </div>
        </section>

        {/* ================= RECENT PROJECTS ================= */}
        <section className="flex flex-col gap-3">
          <h2 className="text-zinc-950 uppercase tracking-wider text-[10px] font-bold">
            Recent Projects
          </h2>
          {hasSavedProject ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-zinc-200 rounded-xl p-3 flex items-center justify-between gap-3 shadow-sm hover:border-zinc-300 transition-all">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center border border-blue-100 flex-shrink-0">
                    <FileImage size={18} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-zinc-900 truncate">
                      {projectPreset?.name || "Untitled Project"}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-light flex items-center gap-1 mt-0.5">
                      <Clock size={10} />
                      <span>
                        {projectPreset
                          ? `Canvas: ${projectPreset.width} x ${projectPreset.height} px (${projectPreset.dpi || 300} DPI)`
                          : "Local storage saved project"}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={clearProject}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors text-[10px] font-semibold uppercase tracking-wider"
                    title="Hapus Proyek"
                  >
                    Hapus
                  </button>
                  <Link
                    href="/editor/photo"
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm shadow-blue-100"
                  >
                    Open
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-zinc-200 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-3 shadow-inner">
              <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400">
                <FolderOpen size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-zinc-700">Belum ada proyek terbaru</span>
                <span className="text-[10px] text-zinc-400 font-light mt-0.5">
                  Proyek yang Anda simpan akan muncul otomatis di sini.
                </span>
              </div>
            </div>
          )}
        </section>

        {/* ================= TEMPLATES ================= */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-zinc-950 uppercase tracking-wider text-[10px] font-bold">
              Templates
            </h2>
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
              6 Placeholders
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {templates.map((tmpl) => (
              <div
                key={tmpl.name}
                className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col gap-3.5 shadow-sm hover:border-zinc-300 hover:shadow-md transition-all duration-300 cursor-not-allowed group"
              >
                <div className={`aspect-square w-full rounded-lg bg-gradient-to-tr ${tmpl.bg} border border-zinc-200/50 flex flex-col items-center justify-center text-[10px] font-bold text-zinc-400`}>
                  <span>{tmpl.ratio}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-bold text-zinc-700 truncate group-hover:text-blue-600 transition-colors">
                    {tmpl.name}
                  </span>
                  <span className="text-[9px] text-zinc-400 font-light">
                    {tmpl.size}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="flex flex-col gap-3">
          <h2 className="text-zinc-950 uppercase tracking-wider text-[10px] font-bold">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-white border border-zinc-200 rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm hover:border-zinc-300 transition-all cursor-not-allowed">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500">
                  <Upload size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-800">Import Project</span>
                  <span className="text-[9px] text-zinc-400 font-light">Load external singular JSON</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-zinc-400" />
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm hover:border-zinc-300 transition-all cursor-not-allowed">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500">
                  <FolderOpen size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-800">Open Local File</span>
                  <span className="text-[9px] text-zinc-400 font-light">Import PSD, Figma formats</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-zinc-400" />
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-white border border-zinc-200 rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm hover:border-zinc-300 hover:bg-zinc-50 transition-all group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Plus size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-800 group-hover:text-blue-600 transition-colors">
                    Create Blank Canvas
                  </span>
                  <span className="text-[9px] text-zinc-400 font-light">Start designing from scratch</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-zinc-400 group-hover:text-blue-600 transition-colors" />
            </button>

          </div>
        </section>

      </main>

      {/* ================= CREATION MODAL ================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-sm p-4">
          {/* Backdrop closer click */}
          <div className="absolute inset-0" onClick={() => setIsCreateModalOpen(false)} />

          <div className="relative bg-white border border-zinc-200 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-150 bg-zinc-50/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <Settings size={14} />
                </div>
                <h3 className="text-sm font-extrabold tracking-tight text-zinc-900">
                  Create New Canvas
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 flex items-center justify-center border border-zinc-200/50 transition-colors focus:outline-none shadow-sm cursor-pointer"
              >
                <X size={13} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[75vh]">
              {/* Studio Selection Tabs */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                  Pilih Tipe Workspace
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {/* Photo Editor Tab (Active) */}
                  <button
                    onClick={() => setActiveTab("photo")}
                    className={`flex flex-col gap-1.5 p-3 rounded-xl border text-left transition-all ${
                      activeTab === "photo"
                        ? "border-blue-500 bg-blue-50/10 shadow-sm"
                        : "border-zinc-200 hover:bg-zinc-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <ImageIcon size={14} className={activeTab === "photo" ? "text-blue-500" : "text-zinc-400"} />
                      <span className="px-1 py-0.2 bg-blue-100/50 text-[7px] font-bold text-blue-600 rounded">
                        Active
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900">Photo Editor</div>
                      <div className="text-[9px] text-zinc-400 leading-normal font-light">Image & layout edit</div>
                    </div>
                  </button>

                  {/* Video Editor Tab (Coming Soon) */}
                  <button
                    disabled
                    onClick={() => setActiveTab("video")}
                    className="flex flex-col gap-1.5 p-3 rounded-xl border border-zinc-200 text-left opacity-50 cursor-not-allowed"
                  >
                    <div className="flex items-center justify-between">
                      <Video size={14} className="text-zinc-400" />
                      <span className="px-1 py-0.2 bg-zinc-100 text-[7px] font-bold text-zinc-400 rounded">
                        Soon
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-500">Video Sequencer</div>
                      <div className="text-[9px] text-zinc-400/80 leading-normal font-light">Video multitrack</div>
                    </div>
                  </button>

                  {/* Manga Canvas Tab (Coming Soon) */}
                  <button
                    disabled
                    onClick={() => setActiveTab("manga")}
                    className="flex flex-col gap-1.5 p-3 rounded-xl border border-zinc-200 text-left opacity-50 cursor-not-allowed"
                  >
                    <div className="flex items-center justify-between">
                      <BookOpen size={14} className="text-zinc-400" />
                      <span className="px-1 py-0.2 bg-zinc-100 text-[7px] font-bold text-zinc-400 rounded">
                        Soon
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-500">Manga Comic</div>
                      <div className="text-[9px] text-zinc-400/80 leading-normal font-light">Speech & panels</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Form Settings (Visible only for Photo Editor) */}
              {activeTab === "photo" && (
                <div className="flex flex-col gap-5 border-t border-zinc-100 pt-4 animate-in fade-in duration-300">
                  
                  {/* Row 1: Name and DPI */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                        Nama Proyek
                      </label>
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Masukkan nama proyek..."
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-light"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                        Resolusi (DPI)
                      </label>
                      <select
                        value={canvasDpi}
                        onChange={(e) => setCanvasDpi(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-light"
                      >
                        <option value={72}>72 DPI (Layar Web / Ringan)</option>
                        <option value={150}>150 DPI (Print Menengah)</option>
                        <option value={300}>300 DPI (Cetak Resolusi Tinggi / Tajam)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Width & Height */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                        Lebar (Width px)
                      </label>
                      <input
                        type="number"
                        value={canvasWidth}
                        onChange={(e) => setCanvasWidth(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-medium"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                        Tinggi (Height px)
                      </label>
                      <input
                        type="number"
                        value={canvasHeight}
                        onChange={(e) => setCanvasHeight(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-medium"
                      />
                    </div>
                  </div>

                  {/* Background Presets Selector */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                        Latar Belakang (Background)
                      </span>
                      {isCustomColor && (
                        <span className="text-[9px] font-mono text-zinc-400">{bgColor}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Presets Grid */}
                      <button
                        onClick={() => { setBgColor("#ffffff"); setIsCustomColor(false); }}
                        className={`w-8 h-8 rounded-full border bg-white flex items-center justify-center transition-all ${
                          bgColor === "#ffffff" && !isCustomColor ? "ring-2 ring-blue-500 ring-offset-2 scale-105" : "border-zinc-300"
                        }`}
                        title="White background"
                      >
                        {bgColor === "#ffffff" && !isCustomColor && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                      </button>

                      <button
                        onClick={() => { setBgColor("#000000"); setIsCustomColor(false); }}
                        className={`w-8 h-8 rounded-full border bg-black flex items-center justify-center transition-all ${
                          bgColor === "#000000" ? "ring-2 ring-blue-500 ring-offset-2 scale-105" : "border-zinc-300"
                        }`}
                        title="Black background"
                      >
                        {bgColor === "#000000" && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                      </button>

                      {/* Transparent checkerboard dot */}
                      <button
                        onClick={() => { setBgColor(""); setIsCustomColor(false); }}
                        className={`w-8 h-8 rounded-full border relative overflow-hidden flex items-center justify-center transition-all ${
                          bgColor === "" ? "ring-2 ring-blue-500 ring-offset-2 scale-105" : "border-zinc-300"
                        }`}
                        style={{
                          backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                          backgroundSize: "6px 6px",
                          backgroundPosition: "0 0, 0 3px, 3px -3px, -3px 0px"
                        }}
                        title="Transparent background"
                      >
                        {bgColor === "" && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                      </button>

                      <button
                        onClick={() => { setBgColor("#f4f4f5"); setIsCustomColor(false); }}
                        className={`w-8 h-8 rounded-full border bg-zinc-100 flex items-center justify-center transition-all ${
                          bgColor === "#f4f4f5" ? "ring-2 ring-blue-500 ring-offset-2 scale-105" : "border-zinc-300"
                        }`}
                        title="Warm grey"
                      >
                        {bgColor === "#f4f4f5" && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                      </button>

                      <button
                        onClick={() => { setBgColor("#18181b"); setIsCustomColor(false); }}
                        className={`w-8 h-8 rounded-full border bg-zinc-900 flex items-center justify-center transition-all ${
                          bgColor === "#18181b" ? "ring-2 ring-blue-500 ring-offset-2 scale-105" : "border-zinc-300"
                        }`}
                        title="Dark charcoal"
                      >
                        {bgColor === "#18181b" && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                      </button>

                      {/* Custom color picker */}
                      <div className="w-px h-6 bg-zinc-200 mx-1" />
                      <div className="relative flex items-center gap-1.5">
                        <label
                          className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer transition-all hover:bg-zinc-50 ${
                            isCustomColor ? "ring-2 ring-blue-500 ring-offset-2 scale-105 border-blue-500" : "border-zinc-300"
                          }`}
                          style={{ backgroundColor: isCustomColor ? bgColor : "#fff" }}
                          title="Custom Color"
                        >
                          <Palette size={14} className={isCustomColor ? "text-white mix-blend-difference" : "text-zinc-500"} />
                          <input
                            type="color"
                            value={isCustomColor ? bgColor : "#18cc03"}
                            onChange={(e) => {
                              setBgColor(e.target.value);
                              setIsCustomColor(true);
                            }}
                            className="absolute inset-0 opacity-0 w-8 h-8 cursor-pointer"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Size Presets Shortcut Grid */}
                  <div className="flex flex-col gap-2 border-t border-zinc-100 pt-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                      Rekomendasi Dimensi (Presets)
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {presetSizes.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => handleApplyPreset(preset)}
                          className="flex flex-col text-left p-2 rounded-lg border border-zinc-150 hover:border-blue-200 hover:bg-blue-50/5 transition-all text-zinc-700"
                        >
                          <span className="text-[10px] font-bold truncate">{preset.name}</span>
                          <span className="text-[9px] text-zinc-400 font-light mt-0.5">
                            {preset.width} &times; {preset.height} px
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-150 flex items-center justify-between gap-4">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 border border-zinc-200 hover:bg-zinc-100 text-zinc-500 font-bold text-[10px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Batal
              </button>

              <button
                onClick={handleCreateCanvas}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg shadow-sm shadow-blue-100 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Buat Kanvas</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto border-t border-zinc-200/80 bg-white py-6 text-center text-[10px] text-zinc-400 font-medium tracking-wide uppercase flex items-center justify-center gap-2">
        <HardDrive size={12} className="text-zinc-400 animate-pulse" />
        <span>Local Storage Mode</span>
        <span className="text-zinc-200">&bull;</span>
        <span className="font-light normal-case tracking-normal text-zinc-400/85">
          Semua proyek saat ini disimpan di penyimpanan lokal browser Anda.
        </span>
      </footer>

    </div>
  );
}
