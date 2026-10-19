'use client';

import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Cpu, Sliders, FileText, CheckCircle2 } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How is pure client-side compression possible without a server?',
    answer:
      'We utilize modern web standards including WebAssembly, the HTML5 Canvas API, and Web Workers. For images, "browser-image-compression" uses offscreen canvas rendering and quantization algorithms right on your CPU/GPU. For PDFs, "pdf-lib" parses, strips dead objects, and rebuilds object streams completely within browser RAM. Not a single byte ever leaves your browser.',
    icon: <Cpu className="h-5 w-5 text-indigo-400" />,
  },
  {
    question: 'How does the "Under 20 KB" preset achieve such small file sizes?',
    answer:
      'Reaching sub-20 KB file sizes requires balancing pixel resolution with quality matrices. The preset automatically constraints max dimensions (e.g., 800-900px) and runs iterative quantization passes. If an image is 4K, shrinking dimensions alongside JPEG/WebP quantization allows clean, crisp images that fit government forms, job portals, or email limits that demand under 20 KB or 50 KB.',
    icon: <Sliders className="h-5 w-5 text-amber-400" />,
  },
  {
    question: 'Can I verify that my files are never uploaded to any server?',
    answer:
      'Yes, 100%! Open your browser Developer Tools (press F12), go to the "Network" tab, and upload or compress any file. You will see 0 outbound HTTP POST or PUT requests for file data. You can even turn on Airplane Mode or disconnect your WiFi after loading the page, and compression will continue working smoothly.',
    icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
  },
  {
    question: 'What PDF optimizations are applied?',
    answer:
      'PDF documents often retain obsolete versions, orphaned form dictionaries, and uncompressed stream tables. PureCompress copies active page trees into a fresh PDF instance, purges revision history, enables PDF 1.5 Object Stream compression, and strips unneeded author metadata, significantly reducing PDF file sizes.',
    icon: <FileText className="h-5 w-5 text-rose-400" />,
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full max-w-5xl mx-auto my-12 px-2 sm:px-0">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/20 mb-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
          Technical Guarantees &amp; FAQ
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          Frequently Asked Questions
        </h3>
        <p className="text-sm text-slate-400 mt-1 max-w-lg mx-auto">
          Learn how client-side compression works and why your confidential documents stay 100% private.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-slate-800/40"
              >
                <div className="flex items-center gap-3.5 pr-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 border border-slate-700/60">
                    {item.icon}
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-200">
                    {item.question}
                  </span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-slate-800/80 bg-slate-950/40 px-5 py-4 text-xs sm:text-sm leading-relaxed text-slate-300">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

