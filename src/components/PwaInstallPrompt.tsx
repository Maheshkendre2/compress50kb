'use client';

import React, { useState, useEffect } from 'react';
import { DownloadCloud, Check, WifiOff } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Register service worker for offline compression capability
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => setIsRegistered(true))
        .catch((err) => console.log('SW registration note:', err));
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
        <Check className="h-3 w-3 text-emerald-400" />
        <span>Offline App Installed</span>
      </div>
    );
  }

  if (!deferredPrompt && !isRegistered) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {deferredPrompt ? (
        <button
          type="button"
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
        >
          <DownloadCloud className="h-3.5 w-3.5" />
          <span>Add to Home Screen</span>
        </button>
      ) : (
        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-slate-900 border border-slate-800 px-2.5 py-1 text-[11px] text-slate-400">
          <WifiOff className="h-3 w-3 text-emerald-400" />
          <span>Offline Ready</span>
        </span>
      )}
    </div>
  );
}

