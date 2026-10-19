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

// Helper to resize image to exact dimensions using native HTML5 Canvas
function resizeToExactDimensions(
  file: File,
  width: number,
  height: number,
  mimeType: string,
  quality: number
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get 2D canvas context'));
        return;
      }

      // High quality smoothing for clear signatures and passport photos
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Fill white background for JPEGs or transparent PNGs if converting to JPEG
      if (mimeType === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to export canvas to blob'));
            return;
          }
          const resizedFile = new File([blob], file.name, {
            type: mimeType,
            lastModified: Date.now(),
          });
          resolve(resizedFile);
        },
        mimeType,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for canvas resizing'));
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

  let workingFile = file;

  // Handle exact dimensions (e.g. 200x230 for SSC, 140x60 for Signature, 350x450 for Passport Photo)
  if (settings.exactWidth && settings.exactHeight) {
    if (onProgress) onProgress(20);
    try {
      workingFile = await resizeToExactDimensions(
        file,
        settings.exactWidth,
        settings.exactHeight,
        fileType || 'image/jpeg',
        Math.min(Math.max(settings.quality, 0.5), 0.95)
      );
    } catch (e) {
      console.warn('Exact dimension canvas resizing fallback:', e);
    }
  }

  // Calculate dimension constraints if not exact
  let maxDimension = settings.maxWidthOrHeight;
  if (!settings.exactWidth && !maxDimension) {
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
    maxWidthOrHeight: settings.exactWidth ? Math.max(settings.exactWidth, settings.exactHeight || 0) : maxDimension,
    alwaysKeepResolution: Boolean(settings.exactWidth && settings.exactHeight),
    useWebWorker: true,
    maxIteration: 15,
    initialQuality: Math.min(Math.max(settings.quality, 0.1), 1.0),
    fileType: fileType,
    onProgress: (p: number) => {
      if (onProgress) onProgress(Math.min(95, p));
    },
  };

  let compressed = workingFile;

  // Only run binary compression if size exceeds target
  if (workingFile.size > settings.targetMaxKB * 1024) {
    try {
      compressed = await imageCompression(workingFile, options);
    } catch {
      compressed = workingFile;
    }
  }

  // If still larger than targetMaxKB and no exact dimensions locked
  if (
    !settings.exactWidth &&
    compressed.size > settings.targetMaxKB * 1024 &&
    maxDimension &&
    maxDimension > 400
  ) {
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
      // Keep first compressed attempt
    }
  }

  if (onProgress) onProgress(100);

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
