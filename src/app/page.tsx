'use client';

import React from 'react';
import Header from '@/components/Header';
import AdSlot from '@/components/AdSlot';
import CompressorWorkspace from '@/components/CompressorWorkspace';
import SeoStructuredData from '@/components/SeoStructuredData';
import PopularToolsNav from '@/components/PopularToolsNav';
import { ChevronDown } from 'lucide-react';

const HOME_FAQS = [
  {
    question: 'How do I compress a photo to under 50 KB?',
    answer:
      'Select your JPG, PNG, or WebP photo using Browse or Camera, choose the [Under 50 KB] target preset button, and your image is compressed instantly in your browser. Tap Download to save or Copy to paste directly into your online form.',
  },
  {
    question: 'Are my files uploaded to your servers or database?',
    answer:
      'Never. 100% of the compression algorithm executes inside your browser using HTML5 Canvas and WebAssembly. Your photos, signatures, and confidential documents never leave your device.',
  },
  {
    question: 'Can I compress signatures to under 20 KB?',
    answer:
      'Yes! Select the [Under 20 KB] preset or our specialized Signature Compressor tool. It preserves crisp pen strokes while shrinking file weight below 20 KB for UPSC, SSC, and state exams.',
  },
  {
    question: 'Can I compress PDF documents here?',
    answer:
      'Yes. Our built-in PDF engine removes redundant revision histories, metadata, and compresses page streams into compact objects completely offline in your browser.',
  },
];

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shrinkpure.com';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Lightweight JSON-LD WebApplication + FAQPage Schema */}
      <SeoStructuredData
        title="Compress50KB — Free, Private Image & PDF Compressor"
        description="Free, private image & PDF compressor for online forms. Compress photo to 50KB, signature under 20KB. 100% in-browser, zero server uploads."
        url={siteUrl}
        faq={HOME_FAQS}
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

        {/* Visible FAQ Section for Google FAQPage Schema & Search Rich Results */}
        <section className="pt-6 border-t border-slate-900 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {HOME_FAQS.map((item, idx) => (
              <details
                key={idx}
                className="group bg-slate-900/40 border border-slate-800/80 rounded-xl p-3 text-xs"
              >
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex items-center justify-between">
                  <span>{item.question}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-500 group-open:rotate-180 transition-transform shrink-0 ml-2" />
                </summary>
                <p className="mt-2 text-slate-400 text-[11px] leading-relaxed">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* 3-Column Hub-and-Spoke Internal Navigation (22 Tools) */}
        <PopularToolsNav />
      </main>

      {/* Minimalist 1-Line Footer */}
      <footer className="w-full border-t border-slate-900 py-4 px-4 text-center text-[11px] text-slate-500">
        <p>100% Client-Side &bull; No files sent to any server &bull; Compress50KB</p>
      </footer>
    </div>
  );
}
