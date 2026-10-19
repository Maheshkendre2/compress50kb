'use client';

import React from 'react';

interface AdSlotProps {
  id: 'ad-slot-header' | 'ad-slot-action' | 'ad-slot-footer';
  className?: string;
  format?: 'leaderboard' | 'banner' | 'action';
}

export default function AdSlot({ id, className = '', format = 'leaderboard' }: AdSlotProps) {
  const formatClasses = {
    leaderboard: 'min-h-[90px] max-w-[728px]',
    banner: 'min-h-[100px] max-w-[970px]',
    action: 'min-h-[120px] max-w-full',
  }[format];

  return (
    <div
      id={id}
      data-ad-slot={id}
      className={`ad-slot ${id} ${formatClasses} mx-auto my-6 w-full rounded-xl border border-dashed border-slate-700/80 bg-slate-900/40 p-3 text-center transition-all hover:border-slate-600 ${className}`}
    >
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-slate-950/40 px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded bg-slate-800/90 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Advertisement
          </span>
          <span className="font-mono text-[11px] text-slate-500 font-medium">
            #{id}
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Reserved Ad Placement Space &bull; Responsive Display Ready
        </p>
      </div>
    </div>
  );
}

