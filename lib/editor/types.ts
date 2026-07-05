export type ToolType =
  | 'select'
  | 'text'
  | 'rect'
  | 'circle'
  | 'line'
  | 'image'
  | 'gradient'
  | 'mask'
  | 'crop'
  | 'hand'
  | 'zoom'
  | 'colorpicker';

export interface CanvasPreset {
  name: string;
  width: number;
  height: number;
  bgColor?: string;
  dpi?: number;
}

export interface Layer {
  id: string;
  name: string;
  type: 'text' | 'image' | 'rect' | 'ellipse' | 'line' | 'group' | 'other';
  visible: boolean;
  locked: boolean;
}

export type SelectedObjectType = 'text' | 'image' | 'rect' | 'ellipse' | 'line' | 'none';
