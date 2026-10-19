'use client';

import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  FileImage,
  FileText,
  Trash2,
  RefreshCw,
  AlertCircle,
  Share2,
} from 'lucide-react';
import type { CompressedFileResult } from '@/types/compression';
import { formatBytes, getDownloadFilename, triggerDownload } from '@/lib/utils';

interface ResultCardProps {
  item: CompressedFileResult;
  targetMaxKB?: number;
  onRemove: (id: string) => void;
}

export default function ResultCard({
  item,
  targetMaxKB = 50,
  onRemove,
}: ResultCardProps) {
  const [copiedToast, setCopiedToast] = useState(false);

  const handleDownload = () => {
    if (!item.blobUrl) return;
    const filename = getDownloadFilename(item.name);
    triggerDownload(item.blobUrl, filename);
  };

  const handleCopy = async () => {
    if (!item.blobUrl || item.type !== 'image') return;
    try {
      const response = await fetch(item.blobUrl);
      const blob = await response.blob();

      let pngBlob = blob;
      if (blob.type !== 'image/png') {
        const img = new Image();
        img.src = item.blobUrl;
        await new Promise((res, rej) => {
          img.onload = res;
          img.onerror = rej;
        });
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 200;
        canvas.height = img.naturalHeight || 200;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const converted = await new Promise<Blob | null>((res) =>
            canvas.toBlob((b) => res(b), 'image/png')
          );
          if (converted) pngBlob = converted;
        }
      }

      if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': pngBlob }),
        ]);
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 2000);
      }
    } catch (err) {
      console.warn('Copy fallback:', err);
    }
  };

  const handleShareWhatsApp = () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://shrinkpure.com';
    const message = `Resize signatures (<20KB) & photos (<50KB) for government exam forms with zero server uploads: ${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://shrinkpure.com';
    const text = 'Resize signatures (<20KB) & photos (<50KB) for government exam forms with zero server uploads:';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Compress50KB — Free In-Browser Photo & PDF Resizer',
          text,
          url,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleShareWhatsApp();
    }
  };

  const isImage = item.type === 'image';
  const isReadyForUpload =
    item.compressedSize !== null && item.compressedSize <= targetMaxKB * 1024;

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5 backdrop-blur-md shadow-lg space-y-3.5">
      {/* Top Status & File Info */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-12 w-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 overflow-hidden">
            {isImage && (item.blobUrl || item.previewUrl) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.blobUrl || item.previewUrl || ''}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            ) : item.type === 'pdf' ? (
              <FileText className="h-6 w-6 text-rose-400" />
            ) : (
              <FileImage className="h-6 w-6 text-slate-400" />
            )}
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-bold text-slate-200 truncate max-w-[200px] sm:max-w-xs">
              {item.name}
            </h4>
            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span>Original: {formatBytes(item.originalSize)}</span>
              {item.dimensions?.compressed && (
                <span>&bull; {item.dimensions.compressed.width}x{item.dimensions.compressed.height}px</span>
              )}
            </div>
          </div>
        </div>

        {/* Delete */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          title="Remove file"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Compressing Progress */}
      {item.status === 'compressing' && (
        <div className="space-y-1.5 py-1">
          <div className="flex justify-between text-xs font-semibold text-emerald-400">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="h-3 w-3 animate-spin" /> Compressing in browser...
            </span>
            <span>{Math.round(item.progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-200"
              style={{ width: `${Math.max(item.progress, 10)}%` }}
            />
          </div>
        </div>
      )}

      {/* Error state */}
      {item.status === 'error' && (
        <div className="flex items-center gap-2 p-2 rounded-xl bg-rose-950/40 border border-rose-800/50 text-xs text-rose-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{item.error || 'Compression failed. Please try a different format.'}</span>
        </div>
      )}

      {/* Success Metrics & Automatic Green Badge */}
      {item.status === 'success' && item.compressedSize !== null && (
        <div className="space-y-3 pt-1 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Ready Badge as requested */}
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-xs font-bold text-emerald-300">
              <Check className="h-3.5 w-3.5 stroke-[3]" />
              <span>
                {isReadyForUpload
                  ? `✓ Under ${targetMaxKB} KB (Ready for Upload)`
                  : `✓ Optimized (${formatBytes(item.compressedSize)})`}
              </span>
            </span>

            {/* Compressed Size vs Reduction % */}
            <div className="text-right">
              <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">
                {formatBytes(item.compressedSize)}
              </span>
              <span className="ml-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/40">
                {item.reductionPercentage && item.reductionPercentage > 0
                  ? `-${item.reductionPercentage}%`
                  : 'Ready'}
              </span>
            </div>
          </div>

          {/* Action Row: Primary Green Download, Secondary Outline Copy, WhatsApp Icon */}
          <div className="flex items-center gap-2 pt-1">
            {/* Primary Green Download */}
            <button
              type="button"
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>

            {/* Secondary Outline Copy */}
            {isImage && (
              <button
                type="button"
                onClick={handleCopy}
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
                  copiedToast
                    ? 'border-emerald-400 bg-emerald-500 text-white'
                    : 'border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700'
                }`}
                title="Copy image to clipboard"
              >
                {copiedToast ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>📋 Copy</span>
                  </>
                )}
              </button>
            )}

            {/* WhatsApp Share Icon Button */}
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white shadow-sm transition-all active:scale-95 shrink-0"
              title="Share on WhatsApp"
            >
              <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.098-2.072-.511-1.841-.777-3.033-2.656-3.125-2.778-.093-.122-.736-.98-.736-1.868 0-.889.467-1.326.633-1.503.167-.178.365-.223.487-.223.122 0 .243.002.348.007.112.006.262-.043.41.314.153.366.52 1.272.566 1.365.045.093.076.202.015.324-.061.123-.092.199-.183.307-.092.107-.193.24-.275.323-.092.091-.188.191-.081.374.107.183.475.784 1.021 1.27.702.626 1.294.82 1.477.912.183.092.29.077.397-.046.107-.122.457-.533.58-.716.122-.183.244-.153.411-.092.167.061 1.057.498 1.239.589.183.091.305.137.35.213.045.076.045.441-.099.846z" />
              </svg>
            </button>

            {/* Telegram Share Icon Button */}
            <button
              type="button"
              onClick={() => {
                const url = typeof window !== 'undefined' ? window.location.href : 'https://shrinkpure.com';
                const text = 'Resize signatures (<20KB) & photos (<50KB) for government exam forms with zero server uploads:';
                const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                window.open(telegramUrl, '_blank', 'noopener,noreferrer');
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#229ED9] hover:bg-[#1d8bc0] text-white shadow-sm transition-all active:scale-95 shrink-0"
              title="Share on Telegram"
            >
              <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
            </button>

            {/* Native Share Icon Button (Triggers Mobile Sheet) */}
            <button
              type="button"
              onClick={handleNativeShare}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-sm transition-all active:scale-95 shrink-0"
              title="Share Link / Apps"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
