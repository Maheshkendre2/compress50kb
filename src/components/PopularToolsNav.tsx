'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Award, FileText, ChevronRight } from 'lucide-react';

interface PopularToolsNavProps {
  currentSlug?: string;
}

export default function PopularToolsNav({ currentSlug }: PopularToolsNavProps) {
  const categories = [
    {
      title: 'Target File Size',
      icon: <Zap className="h-3.5 w-3.5 text-emerald-400" />,
      links: [
        { href: '/compress-image-to-10kb', label: 'Image to 10KB' },
        { href: '/compress-image-to-20kb', label: 'Image to 20KB' },
        { href: '/compress-image-to-30kb', label: 'Image to 30KB' },
        { href: '/compress-image-to-50kb', label: 'Image to 50KB' },
        { href: '/compress-jpeg-to-50kb', label: 'JPEG to 50KB' },
        { href: '/compress-image-to-100kb', label: 'Image to 100KB' },
        { href: '/compress-jpg-to-100kb', label: 'JPG to 100KB' },
        { href: '/compress-image-to-200kb', label: 'Image to 200KB' },
        { href: '/reduce-image-size-in-kb', label: 'Reduce Size in KB' },
      ],
    },
    {
      title: 'Exam & Govt Portals',
      icon: <Award className="h-3.5 w-3.5 text-amber-400" />,
      links: [
        { href: '/ssc-photo-resizer', label: 'SSC Photo (200x230)' },
        { href: '/signature-compressor-20kb', label: 'Signature (140x60)' },
        { href: '/upsc-photo-resizer', label: 'UPSC Civil Services' },
        { href: '/pan-card-photo-resizer', label: 'PAN Card (213x213)' },
        { href: '/gate-photo-resizer', label: 'IIT GATE (480x640)' },
        { href: '/neet-photo-resizer', label: 'NTA NEET UG' },
        { href: '/ibps-photo-resizer', label: 'IBPS Bank PO/Clerk' },
        { href: '/dv-lottery-photo-tool', label: 'US DV Lottery (600x600)' },
        { href: '/passport-photo-compressor', label: 'Passport Photo (35x45mm)' },
      ],
    },
    {
      title: 'PDF Compressors',
      icon: <FileText className="h-3.5 w-3.5 text-rose-400" />,
      links: [
        { href: '/compress-pdf-under-100kb', label: 'PDF Under 100KB' },
        { href: '/compress-pdf-to-200kb', label: 'PDF to 200KB (EPFO)' },
        { href: '/compress-pdf-to-500kb', label: 'PDF to 500KB' },
        { href: '/compress-pdf-to-1mb', label: 'PDF to 1MB' },
      ],
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto pt-6 border-t border-slate-900 space-y-4">
      <div className="text-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Free Specialized Resizers &amp; Exam Tools
        </h3>
        <p className="text-[11px] text-slate-500 mt-0.5">
          100% in-browser processing with zero server uploads
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2"
          >
            <div className="flex items-center gap-1.5 font-bold text-slate-300">
              {cat.icon}
              <span className="truncate">{cat.title}</span>
            </div>
            <ul className="space-y-1">
              {cat.links
                .filter((l) => l.href.replace('/', '') !== currentSlug)
                .map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1 truncate text-[11px]"
                    >
                      <ChevronRight className="h-2.5 w-2.5 text-slate-600 shrink-0" />
                      <span className="truncate">{link.label}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
