export type TargetPreset = 'under-20' | 'under-50' | 'under-100' | 'custom';

export type OutputFormat = 'original' | 'image/jpeg' | 'image/webp' | 'image/png';

export interface CompressionSettings {
  preset: TargetPreset;
  targetMaxKB: number; // e.g. 20, 50, 100, or custom
  quality: number; // 0.1 to 1.0 (10% to 100%)
  maxWidthOrHeight?: number;
  outputFormat: OutputFormat;
  stripPdfMetadata: boolean;
}

export interface CompressedFileResult {
  id: string;
  file: File;
  name: string;
  type: 'image' | 'pdf';
  mimeType: string;
  originalSize: number;
  compressedSize: number | null;
  savedBytes: number | null;
  reductionPercentage: number | null;
  status: 'idle' | 'compressing' | 'success' | 'error';
  progress: number; // 0 to 100
  blobUrl: string | null;
  previewUrl: string | null; // For image preview (original or compressed)
  error?: string;
  compressedAt?: number;
  pdfPageCount?: number;
  dimensions?: {
    original?: { width: number; height: number };
    compressed?: { width: number; height: number };
  };
}

export const PRESET_CONFIGS: Record<Exclude<TargetPreset, 'custom'>, { label: string; maxKB: number; defaultQuality: number; maxDimension?: number }> = {
  'under-20': {
    label: 'Under 20 KB',
    maxKB: 20,
    defaultQuality: 0.65,
    maxDimension: 900,
  },
  'under-50': {
    label: 'Under 50 KB',
    maxKB: 50,
    defaultQuality: 0.75,
    maxDimension: 1280,
  },
  'under-100': {
    label: 'Under 100 KB',
    maxKB: 100,
    defaultQuality: 0.85,
    maxDimension: 1600,
  },
};

