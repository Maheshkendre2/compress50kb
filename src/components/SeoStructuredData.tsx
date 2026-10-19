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
    '@type': 'WebApplication',
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
    featureList: [
      '100% Client-Side Processing',
      'Zero Server File Uploads',
      'Under 20 KB Preset',
      'Under 50 KB Preset',
      'Under 100 KB Preset',
      'Indian Exam Specifications (SSC, UPSC, IBPS)',
      'Direct Copy to Clipboard',
      'Works Completely Offline',
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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

