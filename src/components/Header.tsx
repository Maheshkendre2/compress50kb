'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, ExternalLink } from 'lucide-react';
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

        {/* Subtle Security Pill, Dev Attribution & PWA Install */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 sm:px-3 py-1 text-xs font-semibold text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden md:inline">🔒 100% In-Browser &bull; Zero Uploads</span>
            <span className="md:hidden">🔒 Zero Uploads</span>
          </div>

          {/* Mahesh Kendre Portfolio Link */}
          <a
            href="https://mahesh-kendre-portfolio.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            title="Mahesh Kendre Portfolio"
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
          >
            <span className="hidden sm:inline">Portfolio</span>
            <span className="sm:hidden text-[11px]">Dev</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </a>

          <a
            href="https://github.com/Maheshkendre2"
            target="_blank"
            rel="noopener noreferrer"
            title="Developed by Mahesh Kendre (GitHub)"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          <PwaInstallPrompt />
        </div>
      </div>
    </header>
  );
}
