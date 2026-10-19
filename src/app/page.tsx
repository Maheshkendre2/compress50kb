'use client';

import React from 'react';
import Header from '@/components/Header';
import AdSlot from '@/components/AdSlot';
import CompressorWorkspace from '@/components/CompressorWorkspace';
import SeoStructuredData from '@/components/SeoStructuredData';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Lightweight JSON-LD WebApplication Schema */}
      <SeoStructuredData
        title="Compress50KB — Free, Private Image & PDF Compressor"
        description="Free, private image & PDF compressor for online forms. Compress photo to 50KB, signature under 20KB. 100% in-browser, zero server uploads."
        url="https://shrinkpure.com"
      />

      {/* Clean Minimalist Header */}
      <Header />

      {/* Main Single Column Area */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-4 sm:py-6 space-y-4">
        {/* Clean Ad Placement 1: ad-slot-header */}
        <AdSlot id="ad-slot-header" format="header" />

        {/* 1-Line Minimalist Hero */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Compress<span className="text-emerald-400">50KB</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Free, private image &amp; PDF compressor for online forms.
          </p>
        </div>

        {/* Ultra-Clean Compressor Core (PresetBar + DropZone + ResultCard + RecentDrawer) */}
        <CompressorWorkspace />
      </main>

      {/* Minimalist 1-Line Footer */}
      <footer className="w-full border-t border-slate-900 py-4 px-4 text-center text-[11px] text-slate-500">
        <p>100% Client-Side &bull; No files sent to any server &bull; Compress50KB</p>
      </footer>
    </div>
  );
}
