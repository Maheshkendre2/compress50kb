'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>
            ShrinkPure &bull; Pure Client-Side Image &amp; PDF Compression
          </span>
        </div>

        <div className="text-center sm:text-right text-slate-400">
          <p>
            Zero Server Uploads &bull; Works 100% Offline &bull; Files never leave your browser
          </p>
        </div>
      </div>
    </footer>
  );
}

