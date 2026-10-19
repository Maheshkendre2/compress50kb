'use client';

import React from 'react';
import { ShieldCheck, Lock, WifiOff, Cpu } from 'lucide-react';

export default function TrustBanner() {
  return (
    <div className="w-full max-w-5xl mx-auto my-6">
      {/* Primary Badge as specified */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-teal-950/40 p-4 sm:p-5 shadow-lg shadow-emerald-950/20 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40 shadow-inner">
              <ShieldCheck className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/20 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                Device-Only Storage & Execution
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-100 tracking-tight">
                100% Private & Secure — Files are processed on your device and never uploaded to any server.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/80 px-2.5 py-1.5 border border-slate-700/60 shadow-sm">
              <Lock className="h-3.5 w-3.5 text-emerald-400" />
              <span>Zero Uploads</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/80 px-2.5 py-1.5 border border-slate-700/60 shadow-sm">
              <Cpu className="h-3.5 w-3.5 text-indigo-400" />
              <span>Client CPU/Canvas</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/80 px-2.5 py-1.5 border border-slate-700/60 shadow-sm">
              <WifiOff className="h-3.5 w-3.5 text-sky-400" />
              <span>Works Offline</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

