'use client';

import React, { useState } from 'react';
import { Archive, Trash2, RefreshCw } from 'lucide-react';
import type { CompressedFileResult } from '@/types/compression';
import { formatBytes, createAndDownloadZip } from '@/lib/utils';

interface BatchSummaryProps {
  files: CompressedFileResult[];
  onClearAll: () => void;
  onRecompressAll: () => void;
}

export default function BatchSummary({ files, onClearAll, onRecompressAll }: BatchSummaryProps) {
  const [isZipping, setIsZipping] = useState(false);

  const totalOriginal = files.reduce((acc, f) => acc + f.originalSize, 0);
  const successfulFiles = files.filter((f) => f.status === 'success' && f.compressedSize !== null);
  const totalCompressed = successfulFiles.reduce((acc, f) => acc + (f.compressedSize || 0), 0);
  const totalSaved = Math.max(0, totalOriginal - totalCompressed);
  const totalReduction = totalOriginal > 0 ? Math.round((totalSaved / totalOriginal) * 100) : 0;

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      await createAndDownloadZip(files, `compressed-bundle-${Date.now()}.zip`);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-5 sm:p-6 backdrop-blur-xl shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left Stats */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Files In Queue
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-100 font-mono">
              {files.length} <span className="text-xs font-normal text-slate-400">({successfulFiles.length} ready)</span>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden sm:block" />

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Original Total
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-300 font-mono">
              {formatBytes(totalOriginal)}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Compressed Total
            </div>
            <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
              {formatBytes(totalCompressed)}
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2">
            <span className="text-xs font-semibold text-emerald-300">Saved:</span>
            <span className="text-sm sm:text-base font-black text-emerald-400 font-mono">
              {formatBytes(totalSaved)} ({totalReduction}%)
            </span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onRecompressAll}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-300 border border-slate-700/80 transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5 text-indigo-400" />
            Recompress All
          </button>

          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-950/40 hover:text-rose-300 px-3.5 py-2 text-xs font-semibold text-slate-300 border border-slate-700/80 transition-all"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear Queue
          </button>

          {successfulFiles.length > 1 && (
            <button
              type="button"
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <Archive className="h-4 w-4" />
              {isZipping ? 'Generating ZIP...' : `Download All (.ZIP)`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

