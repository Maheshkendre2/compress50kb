'use client';

import React from 'react';

interface AdSlotProps {
  id: 'ad-slot-header' | 'ad-slot-action' | 'ad-slot-footer';
  className?: string;
  format?: 'header' | 'action' | 'footer';
}

export default function AdSlot({ id, className = '', format }: AdSlotProps) {
  const slotType = format || (id === 'ad-slot-header' ? 'header' : id === 'ad-slot-action' ? 'action' : 'footer');

  const dimensionStyles = {
    // 50px mobile / 90px desktop
    header: 'min-h-[50px] sm:min-h-[90px] max-w-xl',
    // 250px action rectangle or clean inline banner
    action: 'min-h-[120px] sm:min-h-[250px] max-w-xl',
    // 90px footer banner
    footer: 'min-h-[90px] max-w-xl',
  }[slotType];

  return (
    <div
      id={id}
      data-ad-slot={id}
      className={`ad-slot ${id} ${dimensionStyles} mx-auto my-3 w-full rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/30 text-center transition-all ${className}`}
      style={{ contain: 'layout' }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center p-3">
        <div className="flex items-center gap-1.5 opacity-60">
          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-slate-400 uppercase">
            Ad
          </span>
          <span className="font-mono text-[10px] text-slate-500">
            #{id}
          </span>
        </div>
      </div>
    </div>
  );
}
