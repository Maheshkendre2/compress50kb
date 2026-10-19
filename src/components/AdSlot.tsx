'use client';

import React from 'react';

interface AdSlotProps {
  id: 'ad-slot-header' | 'ad-slot-action' | 'ad-slot-footer';
  className?: string;
  format?: 'header' | 'action' | 'footer';
}

export default function AdSlot({ id, className = '', format }: AdSlotProps) {
  // Determine layout styling based on exact required dimensions for zero CLS (Cumulative Layout Shift)
  const slotType = format || (id === 'ad-slot-header' ? 'header' : id === 'ad-slot-action' ? 'action' : 'footer');

  const dimensionStyles = {
    // 728x90 on desktop / 320x50 on mobile
    header: 'min-h-[50px] sm:min-h-[90px] max-w-[320px] sm:max-w-[728px]',
    // 300x250 medium rectangle
    action: 'min-h-[250px] w-full max-w-[300px]',
    // 970x90 or 728x90 responsive leaderboard
    footer: 'min-h-[90px] w-full max-w-[970px]',
  }[slotType];

  return (
    <div
      id={id}
      data-ad-slot={id}
      className={`ad-slot ${id} ${dimensionStyles} mx-auto my-5 w-full rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/40 p-2.5 text-center transition-all hover:border-slate-600 ${className}`}
      style={{ contain: 'layout' }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-slate-950/50 px-3 py-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded bg-slate-800/90 px-2 py-0.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Sponsored Slot
          </span>
          <span className="font-mono text-[11px] text-slate-500 font-semibold">
            #{id}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 font-medium">
          {slotType === 'header' && 'Leaderboard (728x90 / 320x50) • CLS Protected'}
          {slotType === 'action' && 'High-Impact Rectangle (300x250) • Zero Layout Shift'}
          {slotType === 'footer' && 'Bottom Banner (Responsive Display) • Fixed Layout'}
        </p>
      </div>
    </div>
  );
}
