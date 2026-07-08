"use client";

import React, { useRef, useEffect, useState } from "react";
import { useEditorStore } from "@/lib/editor/editorStore";
import { Send, Sparkles, X, Trash2, Key, Info, HelpCircle } from "lucide-react";

interface AIChatSidebarProps {
  onExecuteCommand: (command: { tool: string; args: any }) => void;
}

const SUGGESTIONS = [
  "Ubah background jadi warna biru",
  "Tambahkan teks 'Sale 50%' warna putih",
  "Buat lingkaran merah di tengah",
  "Tambahkan persegi panjang kuning",
  "Bersihkan semua objek di canvas",
];

export default function AIChatSidebar({ onExecuteCommand }: AIChatSidebarProps) {
  const {
    isAiSidebarOpen,
    setAiSidebarOpen,
    chatMessages,
    addChatMessage,
    isAiLoading,
    setAiLoading,
    clearChat,
  } = useEditorStore();

  const [input, setInput] = useState("");
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const [panelWidth, setPanelWidth] = useState(320); // 320px is standard w-80
  const scrollRef = useRef<HTMLDivElement>(null);

  const startResizing = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    const startWidth = panelWidth;
    const startX = mouseDownEvent.clientX;

    const doDrag = (mouseMoveEvent: MouseEvent) => {
      // Dragging left increases width
      const newWidth = Math.max(240, Math.min(500, startWidth - (mouseMoveEvent.clientX - startX)));
      setPanelWidth(newWidth);
    };

    const stopDrag = () => {
      window.removeEventListener("mousemove", doDrag);
      window.removeEventListener("mouseup", stopDrag);
    };

    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);
  };

  // Check if GEMINI_API_KEY is configured in backend environment
  useEffect(() => {
    fetch("/api/editor/ai?check=1")
      .then((res) => res.json())
      .then((data) => {
        setHasApiKey(data.configured === true);
      })
      .catch(() => {
        setHasApiKey(false);
      });
  }, []);

  // Auto scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isAiLoading]);

  if (!isAiSidebarOpen) return null;

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isAiLoading) return;

    // Add user message
    addChatMessage({
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    });

    setInput("");
    setAiLoading(true);

    try {
      const response = await fetch("/api/editor/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend }),
      });

      const data = await response.json();

      if (data.error) {
        addChatMessage({
          sender: "ai",
          text: `Maaf, terjadi kesalahan: ${data.error}`,
          timestamp: new Date(),
        });
      } else if (data.commands && Array.isArray(data.commands)) {
        // Execute each canvas command sequentially
        data.commands.forEach((cmd: any) => {
          if (cmd.tool && cmd.args) {
            onExecuteCommand(cmd);
          }
        });

        addChatMessage({
          sender: "ai",
          text: data.reply || "Saya telah memproses perintah Anda di canvas! ✨",
          timestamp: new Date(),
        });
      } else {
        addChatMessage({
          sender: "ai",
          text: data.reply || "Perintah selesai diproses.",
          timestamp: new Date(),
        });
      }
    } catch (err) {
      addChatMessage({
        sender: "ai",
        text: "Gagal menghubungkan ke asisten AI. Silakan periksa koneksi Anda.",
        timestamp: new Date(),
      });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div
      className="relative border-l border-zinc-200 bg-white flex flex-col h-full z-30 shadow-xl flex-shrink-0 animate-fade-in"
      style={{ width: panelWidth }}
    >
      {/* Header */}
      <div className="h-12 border-b border-zinc-200 px-4 flex items-center justify-between bg-zinc-50/50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
          <span className="text-xs font-bold text-zinc-800">AI Co-Designer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={clearChat}
            title="Hapus Percakapan"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-100 transition-colors"
          >
            <Trash2 size={13} />
          </button>
          <button
            onClick={() => setAiSidebarOpen(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* API Key configuration warning banner */}
        {hasApiKey === false && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex flex-col gap-2">
            <div className="flex items-start gap-2 text-[10px] text-amber-800 leading-normal">
              <Key size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">Gemini API Key Belum Dikonfigurasi</strong>
                Silakan tambahkan <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">GEMINI_API_KEY</code> pada file <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env.local</code> di folder utama proyek untuk mengaktifkan AI.
              </div>
            </div>
          </div>
        )}

        {/* Message bubbles */}
        {chatMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col max-w-[85%] ${
              msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
            }`}
          >
            <div
              className={`p-3 rounded-2xl text-[11px] leading-relaxed shadow-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-zinc-100 text-zinc-800 rounded-tl-none border border-zinc-200/50"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[9px] text-zinc-400 mt-1 px-1">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}

        {/* Pulsing Loading Bubble */}
        {isAiLoading && (
          <div className="flex flex-col items-start mr-auto max-w-[85%]">
            <div className="p-3 bg-zinc-100 border border-zinc-200/50 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Suggested chips panel (only shows when user input is empty) */}
      {!input && (
        <div className="px-4 py-2 border-t border-zinc-100 bg-zinc-50/30">
          <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1">
            <HelpCircle size={10} />
            <span>Saran Perintah</span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="text-[10px] text-zinc-600 bg-white border border-zinc-200 rounded-lg px-2 py-1 text-left hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input panel */}
      <div className="p-3 border-t border-zinc-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-1.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isAiLoading}
            placeholder="Ketik instruksi desain..."
            className="flex-1 px-3 py-2 border border-zinc-200 rounded-xl text-xs text-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-zinc-50 placeholder-zinc-400"
          />
          <button
            type="submit"
            disabled={!input.trim() || isAiLoading}
            className="p-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-md shadow-blue-100 flex-shrink-0"
          >
            <Send size={13} />
          </button>
        </form>
      </div>

      {/* Resize Handle (Left border) */}
      <div
        onMouseDown={startResizing}
        className="absolute top-0 left-0 w-1.5 h-full cursor-col-resize hover:bg-blue-500/30 active:bg-blue-600 transition-colors z-20"
      />
    </div>
  );
}
