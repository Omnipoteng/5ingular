import { create } from 'zustand';

interface HistoryStore {
  snapshots: string[];   // JSON canvas snapshots
  currentIndex: number;  // pointer into snapshots

  canUndo: () => boolean;
  canRedo: () => boolean;
  pushSnapshot: (json: string) => void;
  undo: () => string | null;
  redo: () => string | null;
  clear: () => void;
}

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  snapshots: [],
  currentIndex: -1,

  canUndo: () => get().currentIndex > 0,
  canRedo: () => get().currentIndex < get().snapshots.length - 1,

  pushSnapshot: (json) => {
    set((s) => {
      // Discard any future states when a new action occurs
      const base = s.snapshots.slice(0, s.currentIndex + 1);
      base.push(json);
      // Cap history at 50 states
      if (base.length > 50) base.shift();
      return { snapshots: base, currentIndex: base.length - 1 };
    });
  },

  undo: () => {
    const { snapshots, currentIndex } = get();
    if (currentIndex <= 0) return null;
    const idx = currentIndex - 1;
    set({ currentIndex: idx });
    return snapshots[idx];
  },

  redo: () => {
    const { snapshots, currentIndex } = get();
    if (currentIndex >= snapshots.length - 1) return null;
    const idx = currentIndex + 1;
    set({ currentIndex: idx });
    return snapshots[idx];
  },

  clear: () => set({ snapshots: [], currentIndex: -1 }),
}));
