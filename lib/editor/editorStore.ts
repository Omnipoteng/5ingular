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

  setActiveTool:       (tool)    => set({ activeTool: tool }),
  setCanvasPreset:     (preset)  => set({ canvasPreset: preset }),
  setZoom:             (zoom)    => set({ zoom: Math.max(0.05, Math.min(8, zoom)) }),
  toggleGrid:          ()        => set((s) => ({ gridEnabled: !s.gridEnabled })),
  toggleSnap:          ()        => set((s) => ({ snapEnabled: !s.snapEnabled })),
  setLayers:           (layers)  => set({ layers }),
  setSelectedLayerId:  (id)      => set({ selectedLayerId: id }),
  setSelectedObjectType: (type)  => set({ selectedObjectType: type }),
  setDirty:            (dirty)   => set({ isDirty: dirty }),

  updateLayer: (id, updates) =>
    set((s) => ({
      layers: s.layers.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    })),

  reorderLayers: (layers) => set({ layers }),
}));
