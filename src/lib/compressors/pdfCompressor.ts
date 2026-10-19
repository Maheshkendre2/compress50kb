import type { CompressionSettings } from '@/types/compression';

export interface PdfCompressionResult {
  compressedFile: File;
  blobUrl: string;
  originalSize: number;
  compressedSize: number;
  savedBytes: number;
  reductionPercentage: number;
  pageCount: number;
}

export async function compressPdf(
  file: File,
  settings: CompressionSettings,
  onProgress?: (progress: number) => void
): Promise<PdfCompressionResult> {
  if (onProgress) onProgress(15);

  const { PDFDocument } = await import('pdf-lib');
  const arrayBuffer = await file.arrayBuffer();

  if (onProgress) onProgress(35);

  const srcDoc = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: true,
    updateMetadata: false,
  });

  const pageCount = srcDoc.getPageCount();

  if (onProgress) onProgress(55);

  // Rebuild the PDF by copying active pages into a fresh document to discard orphaned objects, unreferenced revisions, and bloated dictionaries
  const newDoc = await PDFDocument.create();
  const pages = await newDoc.copyPages(srcDoc, srcDoc.getPageIndices());
  pages.forEach((page) => newDoc.addPage(page));

  if (onProgress) onProgress(75);

  if (settings.stripPdfMetadata) {
    newDoc.setTitle('');
    newDoc.setAuthor('');
    newDoc.setSubject('');
    newDoc.setKeywords([]);
    newDoc.setProducer('Pure Client-Side PDF Compressor');
    newDoc.setCreator('Pure Client-Side PDF Compressor');
  }

  // Save with PDF 1.5 Object Streams enabled for maximal stream compression
  const compressedUint8Array = await newDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    objectsPerTick: 50,
  });

  if (onProgress) onProgress(95);

  const originalSize = file.size;
  let finalBytes: Uint8Array = compressedUint8Array;

  // If the rebuilt file is somehow larger than the original, retain the smaller file
  if (compressedUint8Array.length > originalSize) {
    finalBytes = new Uint8Array(arrayBuffer);
  }

  const compressedSize = finalBytes.length;
  const savedBytes = Math.max(0, originalSize - compressedSize);
  const reductionPercentage = Math.round((savedBytes / originalSize) * 100);

  const compressedBlob = new Blob([finalBytes as BlobPart], { type: 'application/pdf' });
  const compressedFile = new File([compressedBlob], file.name, {
    type: 'application/pdf',
    lastModified: Date.now(),
  });

  const blobUrl = URL.createObjectURL(compressedBlob);

  if (onProgress) onProgress(100);

  return {
    compressedFile,
    blobUrl,
    originalSize,
    compressedSize,
    savedBytes,
    reductionPercentage,
    pageCount,
  };
}

