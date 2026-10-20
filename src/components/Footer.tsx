import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950/60 mt-auto py-6 px-4">
      <div className="max-w-xl mx-auto space-y-3 text-center">
        {/* Security & Privacy Guarantee Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[11px] font-semibold text-emerald-300">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
          <span>100% Client-Side &bull; Files never leave your browser</span>
        </div>

        {/* Developer Credit */}
        <div className="text-xs text-slate-400 flex flex-wrap items-center justify-center gap-1.5 font-medium">
          <span>Developed with</span>
          <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500 inline-block animate-pulse" />
          <span>by</span>
          <a
            href="https://mahesh-kendre-portfolio.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-bold underline decoration-emerald-500/40 hover:decoration-emerald-400 underline-offset-4 inline-flex items-center gap-1 transition-colors"
          >
            <span>Mahesh Kendre</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Navigation & Project Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] text-slate-500 pt-1">
          <a
            href="https://mahesh-kendre-portfolio.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1 text-slate-400 font-medium"
          >
            <span>Portfolio</span>
            <ExternalLink className="h-2.5 w-2.5 text-slate-500" />
          </a>
          <span>&bull;</span>
          <a
            href="https://github.com/Maheshkendre2/compress50kb"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors inline-flex items-center gap-1.5"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub Repository</span>
          </a>
          <span>&bull;</span>
          <Link href="/" className="hover:text-slate-300 transition-colors">
            Compress50KB
          </Link>
          <span>&bull;</span>
          <span>&copy; 2026</span>
        </div>
      </div>
    </footer>
  );
}
