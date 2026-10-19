'use client';

import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  id: 'ad-slot-header' | 'ad-slot-action' | 'ad-slot-footer';
  className?: string;
  format?: 'header' | 'action' | 'footer';
}

interface AdConfig {
  key: string;
  height: number;
  width: number;
  scriptSrc: string;
}

const AD_CONFIGS: Record<'header' | 'action', AdConfig> = {
  header: {
    key: '676f16ffb44ec44e74638bb6bcb3c465',
    height: 90,
    width: 728,
    scriptSrc: 'https://bellnewyork.org/22/676f16ffb44ec44e74638bb6bcb3c465',
  },
  action: {
    key: '07873f92c3870ee0e6dbc401defeb44b',
    height: 250,
    width: 300,
    scriptSrc: 'https://bellnewyork.org/22/07873f92c3870ee0e6dbc401defeb44b',
  },
};

export default function AdSlot({ id, className = '', format }: AdSlotProps) {
  const adContainerRef = useRef<HTMLDivElement>(null);

  // Normalize slot type to 'header' or 'action'
  const slotType: 'header' | 'action' =
    format === 'action' || id === 'ad-slot-action' ? 'action' : 'header';

  useEffect(() => {
    const container = adContainerRef.current;
    if (!container) return;

    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const loadAd = () => {
      // 5. Clean up existing child elements on update to prevent duplicate ads
      container.innerHTML = '';

      // 4. On mobile devices (< 768px), display the 300x250 slot instead of 728x90 to avoid horizontal overflow
      const isMobile = mediaQuery.matches;
      const config =
        slotType === 'header' && isMobile ? AD_CONFIGS.action : AD_CONFIGS[slotType];

      // Declare window.atOptions
      if (typeof window !== 'undefined') {
        (window as unknown as { atOptions: unknown }).atOptions = {
          key: config.key,
          format: 'iframe',
          height: config.height,
          width: config.width,
          params: {},
        };
      }

      // 2. Programmatically create and append the atOptions script element
      const optScript = document.createElement('script');
      optScript.type = 'text/javascript';
      optScript.innerHTML = `
        atOptions = {
          'key' : '${config.key}',
          'format' : 'iframe',
          'height' : ${config.height},
          'width' : ${config.width},
          'params' : {}
        };
      `;

      // 2. Programmatically create and append the external source script
      const adScript = document.createElement('script');
      adScript.type = 'text/javascript';
      adScript.src = config.scriptSrc;

      container.appendChild(optScript);
      container.appendChild(adScript);
    };

    loadAd();

    const handleMediaChange = () => {
      loadAd();
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      // Compatibility fallback for older browsers
      mediaQuery.addListener(handleMediaChange);
    }

    // 5. Clean up existing child elements on component unmount
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [slotType]);

  // 3. Set fixed minimum dimensions with overflow-hidden to avoid Cumulative Layout Shift (CLS)
  const minHeightClass =
    slotType === 'header'
      ? 'min-h-[250px] md:min-h-[90px]'
      : 'min-h-[250px]';

  return (
    <div
      id={id}
      data-ad-slot={id}
      className={`ad-slot ${id} relative mx-auto my-3 w-full max-w-full rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/30 overflow-hidden text-center transition-all flex items-center justify-center ${minHeightClass} ${className}`}
      style={{ contain: 'layout' }}
    >
      {/* Subtle non-shifting background placeholder when ad is loading or ad-blocked */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="flex items-center gap-1.5">
          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-slate-500 uppercase">
            Advertisement
          </span>
          <span className="font-mono text-[10px] text-slate-600">
            #{id}
          </span>
        </div>
      </div>

      {/* Dedicated ref container for programmatic script execution & iframe injection */}
      <div
        ref={adContainerRef}
        className="relative z-10 flex items-center justify-center w-full max-w-full overflow-hidden [&_iframe]:max-w-full"
      />
    </div>
  );
}
