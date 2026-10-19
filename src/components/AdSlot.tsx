'use client';

import React, { useEffect, useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [adBlocked, setAdBlocked] = useState(false);

  const slotType: 'header' | 'action' =
    format === 'action' || id === 'ad-slot-action' ? 'action' : 'header';

  // 1. Detect if the browser has an active ad blocker (uBlock, Brave Shields, AdBlock)
  useEffect(() => {
    fetch('https://bellnewyork.org/22/07873f92c3870ee0e6dbc401defeb44b', {
      method: 'HEAD',
      mode: 'no-cors',
    }).catch(() => {
      setAdBlocked(true);
    });
  }, []);

  // 2. Render isolated iframe with srcdoc to guarantee execution and prevent variable collisions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const renderAd = () => {
      container.innerHTML = '';

      const isMobile = mediaQuery.matches;
      // On mobile (<768px), display 300x250 slot to prevent horizontal page overflow
      const config =
        slotType === 'header' && isMobile ? AD_CONFIGS.action : AD_CONFIGS[slotType];

      const iframe = document.createElement('iframe');
      iframe.width = `${config.width}`;
      iframe.height = `${config.height}`;
      iframe.title = `Advertisement ${id}`;
      iframe.scrolling = 'no';
      iframe.className = 'max-w-full';
      iframe.style.width = `${config.width}px`;
      iframe.style.height = `${config.height}px`;
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.style.maxWidth = '100%';

      const adHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : '${config.key}',
      'format' : 'iframe',
      'height' : ${config.height},
      'width' : ${config.width},
      'params' : {}
    };
  <\/script>
  <script type="text/javascript" src="${config.scriptSrc}"><\/script>
</body>
</html>`;

      container.appendChild(iframe);

      try {
        iframe.srcdoc = adHtml;
      } catch {
        const doc = iframe.contentWindow?.document || iframe.contentDocument;
        if (doc) {
          doc.open();
          doc.write(adHtml);
          doc.close();
        }
      }
    };

    renderAd();

    const handleResize = () => {
      renderAd();
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleResize);
    } else {
      mediaQuery.addListener(handleResize);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleResize);
      } else {
        mediaQuery.removeListener(handleResize);
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [slotType, id]);

  const minHeightClass =
    slotType === 'header'
      ? 'min-h-[250px] md:min-h-[90px]'
      : 'min-h-[250px]';

  return (
    <div
      id={id}
      className={`sponsor-placement-slot ${id} relative mx-auto my-3 w-full max-w-full rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/30 overflow-hidden text-center transition-all flex items-center justify-center ${minHeightClass} ${className}`}
      style={{ contain: 'layout' }}
    >
      {/* Ad blocker detection alert if active */}
      {adBlocked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-3 bg-slate-950/90 text-center">
          <span className="text-amber-400 font-bold text-xs flex items-center gap-1.5 mb-1">
            ⚠️ Ad Blocker Detected
          </span>
          <p className="text-[11px] text-slate-400 max-w-xs">
            Disable your ad blocker (e.g. uBlock, Brave Shields) on <code className="text-emerald-400">localhost</code> to test live Adsterra banners.
          </p>
        </div>
      )}

      {/* Subtle non-shifting background placeholder when loading */}
      {!adBlocked && (
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
      )}

      {/* Dedicated isolated iframe container */}
      <div
        ref={containerRef}
        className="relative z-10 flex items-center justify-center w-full max-w-full overflow-hidden"
      />
    </div>
  );
}
