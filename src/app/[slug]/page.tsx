import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import TrustBanner from '@/components/TrustBanner';
import AdSlot from '@/components/AdSlot';
import CompressorWorkspace from '@/components/CompressorWorkspace';
import SeoStructuredData from '@/components/SeoStructuredData';
import PopularToolsNav from '@/components/PopularToolsNav';
import WhatsAppShare from '@/components/WhatsAppShare';
import Footer from '@/components/Footer';
import { LANDING_PAGES, ALL_LANDING_PAGES } from '@/data/landingPages';
import { ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';

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
      title: 'Page Not Found — ShrinkPure',
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
      siteName: 'ShrinkPure',
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Rich JSON-LD Schemas (WebApplication + FAQPage) */}
      <SeoStructuredData
        title={page.title}
        description={page.metaDescription}
        url={pageUrl}
        faq={page.faq}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-200 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className="text-indigo-400 font-medium truncate max-w-[280px] sm:max-w-none">
            {page.h1}
          </span>
        </nav>

        {/* Ad Placement 1: ad-slot-header */}
        <AdSlot id="ad-slot-header" format="header" />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/25 px-3 py-1 text-xs font-bold text-amber-300 shadow-sm">
            <span>{page.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {page.h1}
          </h1>

          <p className="text-base sm:text-lg text-slate-400">
            {page.subheading}
          </p>

          <div className="flex items-center justify-center gap-3 pt-1">
            <WhatsAppShare customUrl={pageUrl} />
          </div>
        </div>

        {/* Trust & Privacy Banner */}
        <TrustBanner />

        {/* Core Reusable Compressor Engine (Initialized with tailored preset) */}
        <CompressorWorkspace initialSettings={page.initialSettings} />

        {/* Key Features Bullet Cards */}
        <section className="w-full max-w-5xl mx-auto my-10 p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
          <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            Key Technical Advantages &amp; Compliance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {page.featuresList.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Ad Placement 3: ad-slot-footer */}
        <AdSlot id="ad-slot-footer" format="footer" />

        {/* Contextual FAQs for this specific landing page */}
        {page.faq.length > 0 && (
          <section className="w-full max-w-5xl mx-auto my-10">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black text-slate-100 tracking-tight">
                Frequently Asked Questions ({page.h1})
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Everything you need to know about specifications, clarity, and safety.
              </p>
            </div>

            <div className="space-y-3">
              {page.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-left"
                >
                  <h4 className="text-sm sm:text-base font-bold text-slate-200 mb-2">
                    {item.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Internal Links to other programmatic tools */}
        <PopularToolsNav currentSlug={page.slug} />
      </main>

      {/* Floating WhatsApp Viral Referral Button */}
      <WhatsAppShare customUrl={pageUrl} floating />

      {/* Footer */}
      <Footer />
    </div>
  );
}
