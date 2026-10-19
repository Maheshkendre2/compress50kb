import type { CompressionSettings } from '@/types/compression';

export interface ImageCompressionResult {
  compressedFile: File;
  blobUrl: string;
  originalSize: number;
  compressedSize: number;
  savedBytes: number;
  reductionPercentage: number;
  dimensions: {
    original: { width: number; height: number };
    compressed: { width: number; height: number };
  };
}

// Helper to get image dimensions
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ width: 0, height: 0 });
    };
    img.src = url;
  });
}

export async function compressImage(
  file: File,
  settings: CompressionSettings,
  onProgress?: (progress: number) => void
): Promise<ImageCompressionResult> {
  // Dynamically import to ensure 100% browser execution
  const imageCompression = (await import('browser-image-compression')).default;

  const originalDims = await getImageDimensions(file);
  const targetMB = settings.targetMaxKB / 1024;

  // Determine output file type
  let fileType = file.type;
  if (settings.outputFormat === 'image/jpeg') {
    fileType = 'image/jpeg';
  } else if (settings.outputFormat === 'image/webp') {
    fileType = 'image/webp';
  } else if (settings.outputFormat === 'image/png') {
    fileType = 'image/png';
  }

  // Calculate dimension constraints based on target KB
  let maxDimension = settings.maxWidthOrHeight;
  if (!maxDimension) {
    if (settings.targetMaxKB <= 20) {
      maxDimension = 800;
    } else if (settings.targetMaxKB <= 50) {
      maxDimension = 1200;
    } else if (settings.targetMaxKB <= 100) {
      maxDimension = 1600;
    } else {
      maxDimension = 2560;
    }
  }

  const options = {
    maxSizeMB: Math.max(targetMB, 0.005),
    maxWidthOrHeight: maxDimension,
    useWebWorker: true,
    maxIteration: 15,
    initialQuality: Math.min(Math.max(settings.quality, 0.1), 1.0),
    fileType: fileType,
    onProgress: (p: number) => {
      if (onProgress) onProgress(p);
    },
  };

  let compressed = await imageCompression(file, options);

  // If result is still larger than targetMaxKB and we have room to downscale (e.g. 20KB target)
  if (compressed.size > settings.targetMaxKB * 1024 && maxDimension > 400) {
    const aggressiveOptions = {
      ...options,
      maxSizeMB: targetMB * 0.9,
      maxWidthOrHeight: Math.floor(maxDimension * 0.75),
      initialQuality: Math.max(settings.quality * 0.8, 0.3),
      maxIteration: 10,
    };
    try {
      const secondAttempt = await imageCompression(compressed, aggressiveOptions);
      if (secondAttempt.size < compressed.size) {
        compressed = secondAttempt;
      }
    } catch {
      // Keep first compressed attempt if second fails
    }
  }

  const compressedDims = await getImageDimensions(compressed);
  const blobUrl = URL.createObjectURL(compressed);
  const originalSize = file.size;
  const compressedSize = compressed.size;
  const savedBytes = Math.max(0, originalSize - compressedSize);
  const reductionPercentage = Math.round((savedBytes / originalSize) * 100);

  return {
    compressedFile: compressed,
    blobUrl,
    originalSize,
    compressedSize,
    savedBytes,
    reductionPercentage,
    dimensions: {
      original: originalDims,
      compressed: compressedDims,
    },
  };
}

