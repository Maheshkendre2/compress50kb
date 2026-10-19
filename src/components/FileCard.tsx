'use client';

import React, { useState } from 'react';
import {
  Download,
  FileImage,
  FileText,
  Trash2,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import type { CompressedFileResult } from '@/types/compression';
import { formatBytes, getDownloadFilename, triggerDownload } from '@/lib/utils';

interface FileCardProps {
  item: CompressedFileResult;
  onRemove: (id: string) => void;
  onRecompress: (id: string) => void;
}

export default function FileCard({ item, onRemove, onRecompress }: FileCardProps) {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'compressed' | 'original'>('compressed');

  const handleDownload = () => {
    if (!item.blobUrl) return;
    const filename = getDownloadFilename(item.name);
    triggerDownload(item.blobUrl, filename);
  };

  const isImage = item.type === 'image';
  const isPdf = item.type === 'pdf';

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 backdrop-blur-xl shadow-xl transition-all hover:border-slate-700/80 hover:shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* File Info Left Section */}
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            {/* Thumbnail or File Type Icon */}
            <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner">
              {isImage && item.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.blobUrl || item.previewUrl}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : isPdf ? (
                <div className="flex flex-col items-center justify-center text-rose-400">
                  <FileText className="h-8 w-8" />
                  <span className="text-[10px] font-bold mt-1 text-slate-400 font-mono">
                    {item.pdfPageCount ? `${item.pdfPageCount} pgs` : 'PDF'}
                  </span>
                </div>
              ) : (
                <FileImage className="h-8 w-8 text-indigo-400" />
              )}

              {/* Status Indicator Icon */}
              {item.status === 'success' && (
                <span className="absolute bottom-1 right-1 rounded-full bg-emerald-500 p-0.5 text-white shadow">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
              )}
            </div>

            {/* Name and Meta */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4
                  className="truncate text-base font-bold text-slate-100 max-w-[200px] sm:max-w-xs md:max-w-md"
                  title={item.name}
                >
                  {item.name}
                </h4>
                <span className="shrink-0 rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-400 uppercase">
                  {item.name.split('.').pop() || item.type}
                </span>
              </div>

              {/* Dimensions or PDF details */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-400">
                {isImage && item.dimensions?.original && (
                  <span>
                    Res: {item.dimensions.original.width} &times; {item.dimensions.original.height}
                    {item.dimensions.compressed && (
                      <span className="text-indigo-400 font-medium">
                        {' '}
                        &rarr; {item.dimensions.compressed.width} &times; {item.dimensions.compressed.height}
                      </span>
                    )}
                  </span>
                )}
                {isPdf && item.pdfPageCount && (
                  <span>Pages: {item.pdfPageCount}</span>
                )}
                <span className="text-slate-500">&bull;</span>
                <span className="text-slate-300">
                  Original: <strong className="font-mono">{formatBytes(item.originalSize)}</strong>
                </span>
              </div>

              {/* Compression Progress Bar */}
              {item.status === 'compressing' && (
                <div className="mt-3 space-y-1.5 w-full max-w-md">
                  <div className="flex justify-between text-xs font-semibold text-indigo-400">
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="h-3 w-3 animate-spin" /> Compressing in browser...
                    </span>
                    <span>{Math.round(item.progress)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                      style={{ width: `${Math.max(item.progress, 5)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Error state */}
              {item.status === 'error' && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-400 font-medium">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <span>{item.error || 'Failed to compress file'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Metrics & Output Preview (Middle/Right) */}
          {item.status === 'success' && item.compressedSize !== null && (
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-4 border-t lg:border-t-0 border-slate-800 pt-3 lg:pt-0">
              {/* Size Comparison Badge */}
              <div className="flex items-center gap-3 bg-slate-950/60 rounded-2xl px-4 py-2.5 border border-slate-800/80">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Compressed
                  </div>
                  <div className="font-mono text-base sm:text-lg font-bold text-emerald-400">
                    {formatBytes(item.compressedSize)}
                  </div>
                </div>

                <div className="h-8 w-px bg-slate-800" />

                {/* Percentage Reduction Badge */}
                <div className="flex flex-col items-center">
                  <span
                    className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs sm:text-sm font-bold shadow-sm ${
                      (item.reductionPercentage ?? 0) > 0
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {(item.reductionPercentage ?? 0) > 0
                      ? `-${item.reductionPercentage}%`
                      : 'Optimized'}
                  </span>
                  {item.savedBytes && item.savedBytes > 0 ? (
                    <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                      Saved {formatBytes(item.savedBytes)}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Action Buttons: Preview & Prominent Download */}
              <div className="flex items-center gap-2">
                {/* Preview Button */}
                {isImage && item.previewUrl && (
                  <button
                    type="button"
                    onClick={() => setShowPreviewModal(true)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all border border-slate-700/80"
                    title="Compare before & after"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                )}

                {isPdf && item.blobUrl && (
                  <a
                    href={item.blobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all border border-slate-700/80"
                    title="Preview PDF in new tab"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}

                {/* Recompress Button */}
                <button
                  type="button"
                  onClick={() => onRecompress(item.id)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all border border-slate-700/80"
                  title="Recompress"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>

                {/* Prominent Download Button */}
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:from-emerald-600 hover:to-teal-700 hover:shadow-emerald-500/35 hover:scale-[1.02] active:scale-95"
                >
                  <Download className="h-4 w-4 stroke-[2.5]" />
                  <span>Download</span>
                </button>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-rose-950/40 hover:text-rose-400 transition-all"
                  title="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Remove button when compressing or error */}
          {item.status !== 'success' && (
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-rose-950/40 hover:text-rose-400 transition-all"
                title="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Before / After Preview Modal for Images */}
      {showPreviewModal && isImage && item.previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-slate-100">Visual Quality Comparison</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700"
              >
                Close (ESC)
              </button>
            </div>

            {/* Toggle tabs */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('compressed')}
                  className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
                    activePreviewTab === 'compressed'
                      ? 'bg-emerald-500 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Compressed ({formatBytes(item.compressedSize || 0)})
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('original')}
                  className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
                    activePreviewTab === 'original'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Original ({formatBytes(item.originalSize)})
                </button>
              </div>
            </div>

            {/* Image display container */}
            <div className="relative flex max-h-[60vh] min-h-[300px] items-center justify-center rounded-2xl bg-slate-950/80 p-4 overflow-hidden border border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  activePreviewTab === 'compressed'
                    ? item.blobUrl || item.previewUrl
                    : item.previewUrl
                }
                alt="Preview"
                className="max-h-[55vh] max-w-full rounded-lg object-contain shadow-md"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span>Original: <strong className="text-slate-200 font-mono">{formatBytes(item.originalSize)}</strong></span>
                <span>&rarr;</span>
                <span>Compressed: <strong className="text-emerald-400 font-mono">{formatBytes(item.compressedSize || 0)}</strong></span>
                <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-emerald-300 font-bold">
                  -{item.reductionPercentage}%
                </span>
              </div>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow"
              >
                <Download className="h-4 w-4" />
                Download This Version
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

