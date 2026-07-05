import { CanvasPreset } from './types';

export const CANVAS_PRESETS: CanvasPreset[] = [
  { name: 'Instagram Post',      width: 1080, height: 1080 },
  { name: 'Instagram Story',     width: 1080, height: 1920 },
  { name: 'A4 Portrait',         width: 794,  height: 1123 },
  { name: 'A4 Landscape',        width: 1123, height: 794  },
  { name: 'A3',                  width: 1123, height: 1587 },
  { name: 'YouTube Thumbnail',   width: 1280, height: 720  },
  { name: 'Presentation 16:9',   width: 1920, height: 1080 },
  { name: 'Twitter / X Post',    width: 1200, height: 675  },
  { name: 'Facebook Cover',      width: 1640, height: 924  },
  { name: 'Business Card',       width: 1050, height: 600  },
];

export const DEFAULT_PRESET: CanvasPreset = CANVAS_PRESETS[0];
