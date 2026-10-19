'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Sparkles } from 'lucide-react';
import PwaInstallPrompt from './PwaInstallPrompt';

export default function Header() {
  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20 transition-transform group-hover:scale-105">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white">
                Shrink<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Pure</span>
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/20">
                100% In-Browser
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Zero-Server Image &amp; PDF Compressor
            </p>
          </div>
        </Link>

        {/* Header Right badges & indicators */}
        <div className="flex items-center gap-2 sm:gap-4">
          <PwaInstallPrompt />

          <div className="hidden lg:flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-300 shadow-inner">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Zero Network Uploads</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Govt Exam Presets</span>
          </div>
        </div>
      </div>
    </header>
  );
}
