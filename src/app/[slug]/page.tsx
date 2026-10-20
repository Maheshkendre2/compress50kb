import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompressorWorkspace from '@/components/CompressorWorkspace';
import SeoStructuredData from '@/components/SeoStructuredData';
import PopularToolsNav from '@/components/PopularToolsNav';
import { LANDING_PAGES, ALL_LANDING_PAGES } from '@/data/landingPages';
import { ChevronRight, ChevronDown } from 'lucide-react';

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://compress50kb.vercel.app';
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://compress50kb.vercel.app';
  const pageUrl = `${siteUrl}/${page.slug}`;

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

        {/* Visible FAQ Section for Google FAQPage Schema & User Trust */}
        {page.faq && page.faq.length > 0 && (
          <section className="pt-6 border-t border-slate-900 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {page.faq.map((item, idx) => (
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
        )}

        {/* 3-Column Hub-and-Spoke Internal Navigation */}
        <PopularToolsNav currentSlug={slug} />
      </main>

      {/* Developer Credit & Minimalist Footer */}
      <Footer />
    </div>
  );
}
