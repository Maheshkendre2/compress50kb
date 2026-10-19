'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap } from 'lucide-react';
import PwaInstallPrompt from './PwaInstallPrompt';

export default function Header() {
  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20 ring-1 ring-white/20 transition-transform group-hover:scale-105">
            <Zap className="h-5 w-5 fill-slate-950 stroke-slate-950" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black tracking-tight text-white">
              Compress<span className="text-emerald-400">50KB</span>
            </span>
          </div>
        </Link>

        {/* Subtle Security Pill & PWA Install */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">🔒 100% In-Browser &bull; Zero Uploads</span>
            <span className="sm:hidden">🔒 Zero Uploads</span>
          </div>

          <PwaInstallPrompt />
        </div>
      </div>
    </header>
  );
}
