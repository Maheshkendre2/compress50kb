'use client';

import React, { useState, useEffect } from 'react';
import { History, Download, Trash2, FileImage, FileText } from 'lucide-react';
import type { RecentFileRecord } from '@/lib/recentStorage';
import { getRecentFiles, clearRecentFiles } from '@/lib/recentStorage';
import { formatBytes, triggerDownload } from '@/lib/utils';

export default function RecentDrawer() {
  const [recentList, setRecentList] = useState<RecentFileRecord[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchList = () => {
      getRecentFiles().then((list) => {
        if (mounted) setRecentList(list);
      });
    };

    fetchList();
    window.addEventListener('recent-files-updated', fetchList);

    return () => {
      mounted = false;
      window.removeEventListener('recent-files-updated', fetchList);
    };
  }, []);

  const handleDownloadRecord = (record: RecentFileRecord) => {
    const url = URL.createObjectURL(record.blob);
    triggerDownload(url, record.name);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const handleClear = async () => {
    await clearRecentFiles();
    setRecentList([]);
  };

  if (recentList.length === 0) return null;

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-3 sm:p-4 backdrop-blur-md">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
          <History className="h-3.5 w-3.5 text-emerald-400" />
          <span>Recent ({recentList.length})</span>
          <span className="text-[10px] text-slate-500 font-normal hidden sm:inline">
            &bull; Stored locally in browser
          </span>
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1"
        >
          <Trash2 className="h-3 w-3" />
          <span>Clear</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {recentList.map((rec) => (
          <div
            key={rec.id}
            className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-7 w-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                {rec.type === 'pdf' ? (
                  <FileText className="h-4 w-4 text-rose-400" />
                ) : (
                  <FileImage className="h-4 w-4 text-emerald-400" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate" title={rec.name}>
                  {rec.name}
                </p>
                <p className="text-[10px] font-mono text-emerald-400 font-bold">
                  {formatBytes(rec.compressedSize)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDownloadRecord(rec)}
              className="h-7 w-7 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0"
              title="1-tap re-download"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

