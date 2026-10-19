export type TargetPreset = 'under-20' | 'under-50' | 'under-100' | 'custom';

export type OutputFormat = 'original' | 'image/jpeg' | 'image/webp' | 'image/png';

export type ExamPresetId =
  | 'passport-photo'
  | 'signature'
  | 'ssc-photo'
  | 'document-100kb'
  | 'thumb-impression';

export interface ExamPresetConfig {
  id: ExamPresetId;
  label: string;
  category: string;
  exactWidth?: number;
  exactHeight?: number;
  maxKB: number;
  defaultQuality: number;
  description: string;
  badge: string;
}

export interface CompressionSettings {
  preset: TargetPreset;
  targetMaxKB: number; // e.g. 20, 50, 100, or custom
  quality: number; // 0.1 to 1.0 (10% to 100%)
  maxWidthOrHeight?: number;
  exactWidth?: number;
  exactHeight?: number;
  activeExamPreset?: ExamPresetId | null;
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

export const PRESET_CONFIGS: Record<
  Exclude<TargetPreset, 'custom'>,
  { label: string; maxKB: number; defaultQuality: number; maxDimension?: number }
> = {
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

export const EXAM_PRESETS: Record<ExamPresetId, ExamPresetConfig> = {
  'passport-photo': {
    id: 'passport-photo',
    label: 'Passport Photo',
    category: 'Govt & Job Portals',
    exactWidth: 350,
    exactHeight: 450,
    maxKB: 50,
    defaultQuality: 0.8,
    description: '350x450 px, under 50 KB for UPSC, SSC, Banking, & State PSC',
    badge: '350x450 px • <50KB',
  },
  signature: {
    id: 'signature',
    label: 'Signature',
    category: 'Candidate Signature',
    exactWidth: 140,
    exactHeight: 60,
    maxKB: 20,
    defaultQuality: 0.75,
    description: '140x60 px, under 20 KB for UPSC, SSC, IBPS, Railways, JEE & NEET',
    badge: '140x60 px • <20KB',
  },
  'ssc-photo': {
    id: 'ssc-photo',
    label: 'SSC Official Photo',
    category: 'SSC Exams',
    exactWidth: 200,
    exactHeight: 230,
    maxKB: 50,
    defaultQuality: 0.8,
    description: '200x230 px, 20-50 KB strictly compliant with SSC CGL, CHSL, MTS & GD',
    badge: '200x230 px • <50KB',
  },
  'document-100kb': {
    id: 'document-100kb',
    label: 'Document / Certificate',
    category: 'Certificates & Marksheets',
    maxKB: 100,
    defaultQuality: 0.85,
    description: 'Under 100 KB for Caste, EWS, Income, Marksheet & Domicile uploads',
    badge: '<100KB Clear',
  },
  'thumb-impression': {
    id: 'thumb-impression',
    label: 'Left Thumb Impression',
    category: 'Biometrics',
    exactWidth: 160,
    exactHeight: 100,
    maxKB: 30,
    defaultQuality: 0.8,
    description: '160x100 px, under 30 KB for Banking (IBPS, SBI, RBI)',
    badge: '160x100 px • <30KB',
  },
};
