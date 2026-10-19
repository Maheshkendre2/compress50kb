'use client';

import React from 'react';
import Link from 'next/link';
import { ALL_LANDING_PAGES } from '@/data/landingPages';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PopularToolsNavProps {
  currentSlug?: string;
}

export default function PopularToolsNav({ currentSlug }: PopularToolsNavProps) {
  const otherPages = ALL_LANDING_PAGES.filter((p) => p.slug !== currentSlug);

  return (
    <section className="w-full max-w-5xl mx-auto my-12 p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-indigo-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          SEO &amp; Exam Tools
        </span>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2">
        Popular Specialized Compression Tools
      </h3>
      <p className="text-xs sm:text-sm text-slate-400 mb-6">
        Instant client-side resizers tailored for government exams, admission portals, and identity documents.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {otherPages.map((page) => (
          <Link
            key={page.slug}
            href={`/${page.slug}`}
            className="group flex flex-col justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all hover:scale-[1.01]"
          >
            <div>
              <span className="inline-block text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full mb-2">
                {page.badge}
              </span>
              <h4 className="text-sm font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                {page.h1}
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {page.subheading}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
              <span>Open Resizer</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

