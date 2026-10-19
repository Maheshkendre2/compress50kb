import type { CompressionSettings } from '@/types/compression';
import { PRESET_CONFIGS, EXAM_PRESETS } from '@/types/compression';

export interface LandingPageConfig {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  subheading: string;
  badge: string;
  targetFileType: 'image' | 'pdf' | 'all';
  initialSettings: CompressionSettings;
  keywords: string[];
  featuresList: string[];
  faq: Array<{ question: string; answer: string }>;
}

export const LANDING_PAGES: Record<string, LandingPageConfig> = {
  'compress-image-to-20kb': {
    slug: 'compress-image-to-20kb',
    title: 'Compress Image to 20KB Online — Free, Instant & 100% Private',
    metaDescription:
      'Compress JPG, JPEG, and PNG images to under 20 KB online for government exam applications, UPSC, SSC, and college portals. Zero server uploads, processed in-browser.',
    h1: 'Compress Image to Under 20 KB',
    subheading:
      'Reduce photo and signature file sizes to under 20 KB with maximum clarity. Built for online exam forms with strict size caps.',
    badge: 'Popular for Signatures & Form Uploads',
    targetFileType: 'image',
    initialSettings: {
      preset: 'under-20',
      targetMaxKB: 20,
      quality: PRESET_CONFIGS['under-20'].defaultQuality,
      maxWidthOrHeight: PRESET_CONFIGS['under-20'].maxDimension,
      outputFormat: 'original',
      stripPdfMetadata: true,
      activeExamPreset: null,
    },
    keywords: [
      'compress image to 20kb',
      'compress photo to 20kb',
      'resize image under 20kb',
      'jpg compressor 20kb',
      'signature under 20kb',
      'reduce image size below 20 kb',
    ],
    featuresList: [
      'Strict <20 KB target guaranteed via iterative quantization',
      'Bicubic smoothing prevents text and signature distortion',
      '100% client-side: Zero images uploaded to any remote server',
      'Instant Copy to Clipboard for rapid mobile/desktop pasting',
    ],
    faq: [
      {
        question: 'Why do government portals require images under 20 KB?',
        answer:
          'State PSCs, UPSC, SSC, and banking portals process millions of candidate forms simultaneously. Restricting signatures and thumbnail photos to under 20 KB reduces database load and guarantees fast verification.',
      },
      {
        question: 'Will my signature remain legible at under 20 KB?',
        answer:
          'Yes. Our compressor scales dimensions appropriately while maintaining high edge-contrast so signature strokes, ink lines, and letter shapes remain crisp and readable.',
      },
      {
        question: 'Are my photos or signatures stored anywhere?',
        answer:
          'Never. All processing is executed solely on your device CPU and WebAssembly sandbox. Not even a single byte is transmitted over the network.',
      },
    ],
  },

  'compress-image-to-50kb': {
    slug: 'compress-image-to-50kb',
    title: 'Compress Image to 50KB Online — Free & High Quality Photo Resizer',
    metaDescription:
      'Reduce JPG, JPEG, and PNG images under 50 KB without blur. Perfect for passport photos, job applications, visa registrations, and government portals.',
    h1: 'Compress Image to Under 50 KB',
    subheading:
      'Shrink photos to under 50 KB while preserving facial details and sharp color tones. 100% browser-based with zero server uploads.',
    badge: 'Standard Passport Photo Preset',
    targetFileType: 'image',
    initialSettings: {
      preset: 'under-50',
      targetMaxKB: 50,
      quality: PRESET_CONFIGS['under-50'].defaultQuality,
      maxWidthOrHeight: PRESET_CONFIGS['under-50'].maxDimension,
      outputFormat: 'original',
      stripPdfMetadata: true,
      activeExamPreset: null,
    },
    keywords: [
      'compress image to 50kb',
      'resize photo to 50kb',
      'passport photo under 50kb',
      'jpg size reducer 50kb',
      'reduce image size to 50kb online free',
    ],
    featuresList: [
      'Optimized for passport-size portrait and ID photos',
      'Adaptive quality matrix prevents pixelation or compression artifacts',
      'Zero server upload: Safe for Aadhaar, PAN, and identity proofs',
      'Batch compression: Compress multiple photos simultaneously',
    ],
    faq: [
      {
        question: 'How does the 50 KB compression maintain facial clarity?',
        answer:
          'The compressor uses an intelligent multi-pass canvas algorithm that retains high frequency color channels around facial contours while stripping invisible metadata and high-frequency noise.',
      },
      {
        question: 'Which formats are supported for 50 KB compression?',
        answer:
          'You can upload JPG, JPEG, PNG, and WebP files. You can also convert directly between formats with our output dropdown.',
      },
      {
        question: 'Is there a limit on how many 50 KB photos I can compress?',
        answer:
          'No limit. Because all computations happen locally in your browser memory, you can compress as many files as you need without rate limits.',
      },
    ],
  },

  'compress-image-to-100kb': {
    slug: 'compress-image-to-100kb',
    title: 'Compress Image to 100KB Online — High Resolution Photo Compressor',
    metaDescription:
      'Compress images to under 100 KB with ultra-sharp details. Supports JPG, PNG, and WebP. Instant download and zero server uploads.',
    h1: 'Compress Image to Under 100 KB',
    subheading:
      'Compress high-resolution photos and documents to under 100 KB with crystal clarity for portal uploads, portfolios, and web publishing.',
    badge: 'Balanced High-Quality Compression',
    targetFileType: 'image',
    initialSettings: {
      preset: 'under-100',
      targetMaxKB: 100,
      quality: PRESET_CONFIGS['under-100'].defaultQuality,
      maxWidthOrHeight: PRESET_CONFIGS['under-100'].maxDimension,
      outputFormat: 'original',
      stripPdfMetadata: true,
      activeExamPreset: null,
    },
    keywords: [
      'compress image to 100kb',
      'photo compressor 100kb',
      'convert image under 100kb',
      'reduce picture size to 100kb',
      'jpg 100kb compressor online',
    ],
    featuresList: [
      'Maximal quality retention with up to 1600px width/height',
      'Ideal for academic certificates, marksheets, and identity scans',
      'Client-side Canvas rendering runs seamlessly on mobile & desktop',
      'Single-click batch ZIP download',
    ],
    faq: [
      {
        question: 'When should I use the 100 KB preset instead of 50 KB?',
        answer:
          '100 KB is ideal for scanned documents containing small text, detailed diagrams, or high-definition ID cards where maximum legibility is needed.',
      },
      {
        question: 'Can I compress PNG images without losing transparency?',
        answer:
          'Yes. Keeping the output format as PNG preserves alpha transparency while optimizing color palettes.',
      },
    ],
  },

  'compress-pdf-under-100kb': {
    slug: 'compress-pdf-under-100kb',
    title: 'Compress PDF Under 100KB Online — 100% Client-Side PDF Reducer',
    metaDescription:
      'Compress PDF documents to under 100 KB purely in your browser. Rebuilds object streams and strips unneeded metadata. Zero server uploads.',
    h1: 'Compress PDF Under 100 KB',
    subheading:
      'Shrink confidential PDF documents, bank statements, and certificates to under 100 KB without sending your data to any third-party server.',
    badge: 'Private & Secure PDF Optimization',
    targetFileType: 'pdf',
    initialSettings: {
      preset: 'under-100',
      targetMaxKB: 100,
      quality: 0.85,
      outputFormat: 'original',
      stripPdfMetadata: true,
      activeExamPreset: null,
    },
    keywords: [
      'compress pdf under 100kb',
      'reduce pdf size to 100kb online',
      'pdf compressor 100kb free',
      'client side pdf compression',
      'private pdf size reducer',
    ],
    featuresList: [
      'PDF 1.5 Object Stream compression packs structural dictionaries',
      'Purges obsolete revisions and dead objects client-side with pdf-lib',
      'Zero server upload: Safe for confidential tax forms, salary slips & IDs',
      'Direct PDF preview in new tab before downloading',
    ],
    faq: [
      {
        question: 'How does client-side PDF compression work?',
        answer:
          'Using pdf-lib, the tool extracts active page trees, cleans unreferenced historical revisions, strips heavy metadata, and recompresses structural tables using Object Streams.',
      },
      {
        question: 'Is it safe to compress confidential PDFs like bank statements or Aadhaar?',
        answer:
          'Yes, 100%! Unlike conventional online PDF compressors that upload your files to remote servers, ShrinkPure processes the file in your browser memory and never transmits it.',
      },
    ],
  },

  'ssc-photo-resizer': {
    slug: 'ssc-photo-resizer',
    title: 'SSC Photo Resizer Online — 200x230 px & Under 50KB (CGL, CHSL, MTS, GD)',
    metaDescription:
      'Official specification photo resizer for SSC CGL, CHSL, MTS, and GD exams. Automatically formats photos to 200x230 pixels and under 50 KB. 100% private.',
    h1: 'SSC Official Photo Resizer (200x230 px)',
    subheading:
      'Resize and compress your passport photo strictly adhering to Staff Selection Commission (SSC) guidelines: 200x230 px resolution and 20 KB to 50 KB file size.',
    badge: 'SSC CGL, CHSL, MTS & GD Compliant',
    targetFileType: 'image',
    initialSettings: {
      preset: 'custom',
      targetMaxKB: 50,
      quality: EXAM_PRESETS['ssc-photo'].defaultQuality,
      exactWidth: 200,
      exactHeight: 230,
      activeExamPreset: 'ssc-photo',
      outputFormat: 'image/jpeg',
      stripPdfMetadata: true,
    },
    keywords: [
      'ssc photo resizer',
      'ssc cgl photo size',
      'ssc 200x230 photo maker',
      'ssc exam photo compressor 50kb',
      'resize photo for ssc application',
      'ssc chsl photo resizer online',
    ],
    featuresList: [
      'Locks aspect ratio to exactly 200 px width × 230 px height',
      'Guarantees output size between 20 KB and 50 KB (SSC mandatory range)',
      'High-contrast bicubic rendering to prevent rejection during scrutiny',
      'Direct copy-to-clipboard or instant JPEG download',
    ],
    faq: [
      {
        question: 'What are the official SSC photo requirements for 2024–2026?',
        answer:
          'SSC mandates: dimensions of 200 pixels width by 230 pixels height, file size between 20 KB and 50 KB, in JPEG/JPG format, with clear front face and light background.',
      },
      {
        question: 'Will this prevent form rejection on the SSC portal?',
        answer:
          'Yes. The portal automated validator checks exact pixel dimensions (200x230) and byte range (<50KB). Our engine enforces both constraints simultaneously.',
      },
    ],
  },

  'signature-compressor-20kb': {
    slug: 'signature-compressor-20kb',
    title: 'Signature Compressor Under 20KB — 140x60 px (UPSC, SSC, IBPS, State PSC)',
    metaDescription:
      'Resize and compress candidate signature to under 20 KB and 140x60 pixels for UPSC, SSC, IBPS, Railways, JEE, and NEET exam registrations. Zero server uploads.',
    h1: 'Signature Compressor Under 20 KB (140x60 px)',
    subheading:
      'Crop, scale, and compress your handwritten signature to exactly 140x60 px and 10–20 KB required for government job and entrance exam applications.',
    badge: 'UPSC, SSC, IBPS & NTA Standard',
    targetFileType: 'image',
    initialSettings: {
      preset: 'custom',
      targetMaxKB: 20,
      quality: EXAM_PRESETS['signature'].defaultQuality,
      exactWidth: 140,
      exactHeight: 60,
      activeExamPreset: 'signature',
      outputFormat: 'image/jpeg',
      stripPdfMetadata: true,
    },
    keywords: [
      'signature compressor 20kb',
      'resize signature to 140x60',
      'signature under 20kb',
      'upsc signature size resizer',
      'ssc signature compressor',
      'ibps signature size 20kb',
    ],
    featuresList: [
      'Locks resolution to exactly 140 px width × 60 px height',
      'Sharp dark ink enhancement with clean white background fill',
      'Guarantees file size strictly under 20 KB (typically 12–18 KB)',
      'Processed 100% in-browser: Zero risk of signature theft or leakage',
    ],
    faq: [
      {
        question: 'Why do exams like UPSC and SSC require 140x60 pixel signatures?',
        answer:
          '140x60 pixels corresponds to standard signature card proportions on admit cards and attendance sheets, ensuring consistent digital rendering.',
      },
      {
        question: 'Is it safe to upload my signature here?',
        answer:
          'Absolutely. Unlike other online tools, ShrinkPure never uploads your signature to any cloud server or database. The resizing occurs purely inside your browser memory and disappears when you leave the page.',
      },
    ],
  },
};

export const ALL_LANDING_PAGES = Object.values(LANDING_PAGES);
