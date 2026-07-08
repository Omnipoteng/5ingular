import { create } from 'zustand';
import { ToolType, CanvasPreset, Layer, SelectedObjectType } from './types';
import { DEFAULT_PRESET } from './canvasPresets';

interface EditorStore {
  activeTool: ToolType;
  canvasPreset: CanvasPreset;
  zoom: number;
  gridEnabled: boolean;
  snapEnabled: boolean;
  layers: Layer[];
  selectedLayerId: string | null;
  selectedObjectType: SelectedObjectType;
  isDirty: boolean;

  // Project identity
  projectName: string;

  // Global clipboard (shared across MenuBar, keyboard shortcuts, etc.)
  clipboard: any;

  // Modal visibility flags
  isNewProjectModalOpen: boolean;
  isConfirmModalOpen: boolean;
  isAboutModalOpen: boolean;
  isShortcutModalOpen: boolean;

  // Pending action after confirm dialog resolves
  pendingNewProjectPreset: CanvasPreset | null;

  // AI Co-Designer Sidebar State
  isAiSidebarOpen: boolean;
  chatMessages: { sender: 'user' | 'ai'; text: string; timestamp: Date }[];
  isAiLoading: boolean;

  setActiveTool: (tool: ToolType) => void;
  setCanvasPreset: (preset: CanvasPreset) => void;
  setZoom: (zoom: number) => void;
  toggleGrid: () => void;
  toggleSnap: () => void;
  setLayers: (layers: Layer[]) => void;
  setSelectedLayerId: (id: string | null) => void;
  setSelectedObjectType: (type: SelectedObjectType) => void;
  updateLayer: (id: string, updates: Partial<Layer>) => void;
  reorderLayers: (layers: Layer[]) => void;
  setDirty: (dirty: boolean) => void;

  setProjectName: (name: string) => void;
  setClipboard: (obj: any) => void;
  setNewProjectModalOpen: (open: boolean) => void;
  setConfirmModalOpen: (open: boolean) => void;
  setAboutModalOpen: (open: boolean) => void;
  setShortcutModalOpen: (open: boolean) => void;
  setPendingNewProjectPreset: (preset: CanvasPreset | null) => void;

  // AI Actions
  setAiSidebarOpen: (open: boolean) => void;
  toggleAiSidebar: () => void;
  addChatMessage: (msg: { sender: 'user' | 'ai'; text: string; timestamp: Date }) => void;
  setAiLoading: (loading: boolean) => void;
  clearChat: () => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  activeTool: 'select',
  canvasPreset: DEFAULT_PRESET,
  zoom: 0.5,
  gridEnabled: false,
  snapEnabled: true,
  layers: [],
  selectedLayerId: null,
  selectedObjectType: 'none',
  isDirty: false,

  projectName: 'Untitled Project',
  clipboard: null,
  isNewProjectModalOpen: false,
  isConfirmModalOpen: false,
  isAboutModalOpen: false,
  isShortcutModalOpen: false,
  pendingNewProjectPreset: null,

  // AI State Defaults
  isAiSidebarOpen: false,
  chatMessages: [
    {
      sender: 'ai',
      text: 'Halo! Saya AI Co-Designer Anda. ✨ Tulis perintah Anda di sini untuk mengedit canvas, contoh: "Ganti background jadi biru" atau "Tambahkan teks \'Promo Spesial\' warna putih".',
      timestamp: new Date(),
    }
  ],
  isAiLoading: false,

  setActiveTool:       (tool)    => set({ activeTool: tool }),
  setCanvasPreset:     (preset)  => set({ canvasPreset: preset }),
  setZoom:             (zoom)    => set({ zoom: Math.max(0.05, Math.min(8, zoom)) }),
  toggleGrid:          ()        => set((s) => ({ gridEnabled: !s.gridEnabled })),
  toggleSnap:          ()        => set((s) => ({ snapEnabled: !s.snapEnabled })),
  setLayers:           (layers)  => set({ layers }),
  setSelectedLayerId:  (id)      => set({ selectedLayerId: id }),
  setSelectedObjectType: (type)  => set({ selectedObjectType: type }),
  setDirty:            (dirty)   => set({ isDirty: dirty }),

  setProjectName:             (name)   => set({ projectName: name }),
  setClipboard:               (obj)    => set({ clipboard: obj }),
  setNewProjectModalOpen:     (open)   => set({ isNewProjectModalOpen: open }),
  setConfirmModalOpen:        (open)   => set({ isConfirmModalOpen: open }),
  setAboutModalOpen:          (open)   => set({ isAboutModalOpen: open }),
  setShortcutModalOpen:       (open)   => set({ isShortcutModalOpen: open }),
  setPendingNewProjectPreset: (preset) => set({ pendingNewProjectPreset: preset }),

  // AI Setters
  setAiSidebarOpen:           (open)   => set({ isAiSidebarOpen: open }),
  toggleAiSidebar:            ()       => set((s) => ({ isAiSidebarOpen: !s.isAiSidebarOpen })),
  addChatMessage:             (msg)    => set((s) => ({ chatMessages: [...s.chatMessages, msg] })),
  setAiLoading:               (loading)=> set({ isAiLoading: loading }),
  clearChat:                  ()       => set({
    chatMessages: [
      {
        sender: 'ai',
        text: 'Halo! Saya AI Co-Designer Anda. ✨ Tulis perintah Anda di sini untuk mengedit canvas, contoh: "Ganti background jadi biru" atau "Tambahkan teks \'Promo Spesial\' warna putih".',
        timestamp: new Date(),
      }
    ]
  }),

  updateLayer: (id, updates) =>
    set((s) => ({
      layers: s.layers.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    })),

  reorderLayers: (layers) => set({ layers }),
}));
