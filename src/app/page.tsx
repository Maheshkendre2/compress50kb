'use client';

import React from 'react';
import Header from '@/components/Header';
import TrustBanner from '@/components/TrustBanner';
import AdSlot from '@/components/AdSlot';
import CompressorWorkspace from '@/components/CompressorWorkspace';
import PopularToolsNav from '@/components/PopularToolsNav';
import WhatsAppShare from '@/components/WhatsAppShare';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import SeoStructuredData from '@/components/SeoStructuredData';

export default function Home() {
  const homeFaq = [
    {
      question: 'How is pure client-side compression possible without a server?',
      answer:
        'We utilize modern web standards including WebAssembly, the HTML5 Canvas API, and Web Workers. For images, browser-image-compression runs offscreen canvas rendering and quantization algorithms right on your CPU/GPU. For PDFs, pdf-lib parses, strips dead objects, and rebuilds object streams completely within browser RAM. Not a single byte ever leaves your browser.',
    },
    {
      question: 'How do the Under 20 KB and Under 50 KB presets achieve such small file sizes?',
      answer:
        'Reaching sub-20 KB file sizes requires balancing pixel resolution with quality matrices. The preset automatically constraints max dimensions (e.g., 800-900px) and runs iterative quantization passes. If an image is 4K, shrinking dimensions alongside JPEG/WebP quantization allows clean, crisp images that fit government forms, job portals, or email limits that demand under 20 KB or 50 KB.',
    },
    {
      question: 'Can I verify that my files are never uploaded to any server?',
      answer:
        'Yes, 100%! Open your browser Developer Tools (press F12), go to the "Network" tab, and upload or compress any file. You will see 0 outbound HTTP POST or PUT requests for file data. You can even turn on Airplane Mode or disconnect your WiFi after loading the page, and compression will continue working smoothly.',
    },
    {
      question: 'What PDF optimizations are applied?',
      answer:
        'PDF documents often retain obsolete versions, orphaned form dictionaries, and uncompressed stream tables. ShrinkPure copies active page trees into a fresh PDF instance, purges revision history, enables PDF 1.5 Object Stream compression, and strips unneeded author metadata, significantly reducing PDF file sizes.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Rich JSON-LD Schemas */}
      <SeoStructuredData
        title="ShrinkPure — Free In-Browser Image & PDF Compressor"
        description="Compress images and PDF files pure client-side in your browser. Quick presets for Under 20 KB, Under 50 KB, Under 100 KB, with Indian Exam presets (SSC, UPSC). 100% Private & Secure — Zero server uploads."
        url="https://shrinkpure.com"
        faq={homeFaq}
      />

      {/* Header */}
      <Header />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Ad Placement 1: ad-slot-header */}
        <AdSlot id="ad-slot-header" format="header" />

        {/* Hero Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 text-xs font-bold text-indigo-300">
            <span>⚡ Ultra-Fast &bull; 100% In-Browser Execution &bull; Zero Server Storage</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Client-Side Image &amp; PDF Compressor
          </h1>
          <p className="text-base sm:text-lg text-slate-400">
            Shrink your files under <span className="text-emerald-400 font-semibold">20 KB</span>,{' '}
            <span className="text-emerald-400 font-semibold">50 KB</span>, or{' '}
            <span className="text-emerald-400 font-semibold">100 KB</span> instantly.
            Zero uploads, 100% private, and processed right on your device.
          </p>

          <div className="flex items-center justify-center gap-3 pt-1">
            <WhatsAppShare />
          </div>
        </div>

        {/* Trust & Privacy Banner */}
        <TrustBanner />

        {/* Compressor Core Engine */}
        <CompressorWorkspace />

        {/* Ad Placement 3: ad-slot-footer */}
        <AdSlot id="ad-slot-footer" format="footer" />

        {/* Internal Navigation to Programmatic Landing Pages */}
        <PopularToolsNav />

        {/* FAQ & Technical Guarantees Section */}
        <FaqSection />
      </main>

      {/* Floating WhatsApp Referral Button */}
      <WhatsAppShare floating />

      {/* Footer */}
      <Footer />
    </div>
  );
}
