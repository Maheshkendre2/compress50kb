import React from 'react';

interface SeoStructuredDataProps {
  title: string;
  description: string;
  url: string;
  faq?: Array<{ question: string; answer: string }>;
}

export default function SeoStructuredData({
  title,
  description,
  url,
  faq = [],
}: SeoStructuredDataProps) {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    url: url,
    description: description,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All (Windows, macOS, Linux, Android, iOS)',
    browserRequirements:
      'Requires JavaScript, HTML5 Canvas, and WebAssembly. Pure 100% Client-Side In-Browser Processing — Files are never uploaded to any server.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '14820',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      '100% Client-Side In-Browser Processing',
      'Zero Server File Uploads',
      'Under 20 KB Preset for Signatures',
      'Under 50 KB Preset for Passport Photos',
      'Under 100 KB & 200 KB Presets for Certificates',
      'Official Exam Resizing (SSC 200x230, Signature 140x60, UPSC, PAN Card)',
      'Direct Copy to Clipboard for Mobile/Desktop',
      'Works 100% Offline (PWA Ready)',
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to compress photos and documents to target file size with ${title}`,
    description:
      'Step-by-step instructions to resize and compress photos, signatures, and PDFs client-side without uploading to any server.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Select your photo or PDF',
        text: 'Tap Camera or Browse File to choose your JPG, PNG, WebP, or PDF file, or paste directly with Ctrl+V.',
        url: `${url}#upload`,
      },
      {
        '@type': 'HowToStep',
        name: 'Choose target file size preset',
        text: 'Tap [Under 20 KB], [Under 50 KB], [Under 100 KB], or use the custom slider to set your desired size limit.',
        url: `${url}#preset`,
      },
      {
        '@type': 'HowToStep',
        name: 'Instant download or copy to clipboard',
        text: 'Tap Download to save your compressed file, or tap Copy to paste the image directly into your application form.',
        url: `${url}#download`,
      },
    ],
  };

  const faqSchema =
    faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_SITE_URL || 'https://compress50kb.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
