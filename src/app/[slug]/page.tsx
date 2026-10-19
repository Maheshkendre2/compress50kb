import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import AdSlot from '@/components/AdSlot';
import CompressorWorkspace from '@/components/CompressorWorkspace';
import SeoStructuredData from '@/components/SeoStructuredData';
import { LANDING_PAGES, ALL_LANDING_PAGES } from '@/data/landingPages';
import { ChevronRight } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ALL_LANDING_PAGES.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = LANDING_PAGES[slug];

  if (!page) {
    return {
      title: 'Page Not Found — Compress50KB',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shrinkpure.com';
  const pageUrl = `${siteUrl}/${page.slug}`;

  return {
    title: page.title,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: pageUrl,
      siteName: 'Compress50KB',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.metaDescription,
    },
  };
}

export default async function ProgrammaticLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = LANDING_PAGES[slug];

  if (!page) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shrinkpure.com';
  const pageUrl = `${siteUrl}/${page.slug}`;
  const otherPages = ALL_LANDING_PAGES.filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Lightweight JSON-LD Schemas */}
      <SeoStructuredData
        title={page.title}
        description={page.metaDescription}
        url={pageUrl}
        faq={page.faq}
      />

      {/* Clean Minimalist Header */}
      <Header />

      {/* Main Single Column */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-4 sm:py-6 space-y-4">
        {/* Compact Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-300 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-700" />
          <span className="text-emerald-400 font-medium truncate">
            {page.h1}
          </span>
        </nav>

        {/* Clean Ad Placement 1 */}
        <AdSlot id="ad-slot-header" format="header" />

        {/* 1-Line Minimalist Hero */}
        <div className="text-center space-y-1">
          <span className="inline-block text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full mb-1">
            {page.badge}
          </span>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {page.h1}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {page.subheading}
          </p>
        </div>

        {/* Reusable Minimalist Compressor Engine */}
        <CompressorWorkspace initialSettings={page.initialSettings} />

        {/* Minimal Other Tools Links */}
        <div className="pt-6 border-t border-slate-900 text-center">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Other Presets
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {otherPages.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="text-xs text-slate-400 hover:text-emerald-400 bg-slate-900/60 hover:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 transition-colors"
              >
                {p.h1}
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Minimalist Footer */}
      <footer className="w-full border-t border-slate-900 py-4 px-4 text-center text-[11px] text-slate-500">
        <p>100% Client-Side &bull; No files sent to any server &bull; Compress50KB</p>
      </footer>
    </div>
  );
}
