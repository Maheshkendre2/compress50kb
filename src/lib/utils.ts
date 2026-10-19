import JSZip from 'jszip';
import type { CompressedFileResult } from '@/types/compression';

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const idx = Math.min(i, sizes.length - 1);
  return `${parseFloat((bytes / Math.pow(k, idx)).toFixed(dm))} ${sizes[idx]}`;
}

export function getFilenameWithoutExt(filename: string): string {
  return filename.substring(0, filename.lastIndexOf('.')) || filename;
}

export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
}

export function getDownloadFilename(
  originalName: string,
  outputFormat?: string
): string {
  const baseName = getFilenameWithoutExt(originalName);
  const ext = getFileExtension(originalName);

  if (outputFormat === 'image/jpeg') {
    return `${baseName}-compressed.jpg`;
  }
  if (outputFormat === 'image/webp') {
    return `${baseName}-compressed.webp`;
  }
  if (outputFormat === 'image/png') {
    return `${baseName}-compressed.png`;
  }

  return `${baseName}-compressed.${ext || 'dat'}`;
}

export function triggerDownload(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function createAndDownloadZip(
  files: CompressedFileResult[],
  zipFilename = 'compressed-files.zip'
): Promise<void> {
  const zip = new JSZip();
  const successfulFiles = files.filter(
    (f) => f.status === 'success' && f.blobUrl
  );

  if (successfulFiles.length === 0) return;

  for (const item of successfulFiles) {
    if (!item.blobUrl) continue;
    try {
      const response = await fetch(item.blobUrl);
      const blob = await response.blob();
      const downloadName = getDownloadFilename(item.name);
      zip.file(downloadName, blob);
    } catch (err) {
      console.error('Failed to add file to zip:', item.name, err);
    }
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const zipUrl = URL.createObjectURL(content);
  triggerDownload(zipUrl, zipFilename);
  setTimeout(() => URL.revokeObjectURL(zipUrl), 10000);
}

