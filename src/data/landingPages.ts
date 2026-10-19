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
  'compress-image-to-10kb': {
    slug: 'compress-image-to-10kb',
    title: 'Compress Image to 10KB Online — Free Signature Resizer Under 10 KB',
    metaDescription:
      'Compress candidate signatures and thumbnail photos to under 10 KB online for JEE, NEET, and government exam registration forms. Zero server uploads.',
    h1: 'Compress Image to Under 10 KB',
    subheading:
      'Ultra-compact compression for signatures and thumbnail photos requiring strict sub-10 KB limits without loss of readability.',
    badge: 'JEE, NEET & NTA Signature Limit',
    targetFileType: 'image',
    initialSettings: {
      preset: 'custom',
      targetMaxKB: 10,
      quality: 0.55,
      maxWidthOrHeight: 600,
      outputFormat: 'image/jpeg',
      stripPdfMetadata: true,
      activeExamPreset: null,
    },
    keywords: [
      'compress image to 10kb',
      'compress signature to 10kb',
      'reduce image size below 10kb',
      'photo compressor under 10kb',
      'jpg 10kb online resizer',
    ],
    featuresList: [
      'Strict <10 KB file size constraint guaranteed',
      'Crisp ink line edge detection for handwritten signatures',
      '100% in-browser processing with zero server uploads',
      'Instant Copy to Clipboard for rapid form submission',
    ],
    faq: [
      {
        question: 'Which exams require signatures under 10 KB?',
        answer:
          'Entrance exams like JEE Main, NEET, and several State CET portals require signature files between 4 KB and 10 KB in JPG/JPEG format.',
      },
      {
        question: 'Will my signature remain legible below 10 KB?',
        answer:
          'Yes. Our canvas quantization removes background artifacts while keeping ink strokes sharp and high-contrast.',
      },
    ],
  },

  'compress-image-to-20kb': {
    slug: 'compress-image-to-20kb',
    title: 'Compress Image to 20KB Online — Free, Instant & 100% Private',
    metaDescription:
      'Compress JPG, JPEG, and PNG images to under 20 KB online for government exam applications, UPSC, SSC, and college portals. Zero server uploads.',
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
          'State PSCs, UPSC, SSC, and banking portals process millions of candidate forms simultaneously. Restricting signatures to under 20 KB guarantees fast verification and zero server slowdown.',
      },
      {
        question: 'Will my signature remain legible at under 20 KB?',
        answer:
          'Yes. Our compressor scales dimensions appropriately while maintaining high edge-contrast so signature strokes remain crisp and readable.',
      },
    ],
  },

  'compress-image-to-30kb': {
    slug: 'compress-image-to-30kb',
    title: 'Compress Image to 30KB Online — Free PAN Card & Portal Resizer',
    metaDescription:
      'Compress photos and documents to under 30 KB for PAN Card application (NSDL / UTIITSL) and banking portals. Instant client-side execution.',
    h1: 'Compress Image to Under 30 KB',
    subheading:
      'Resize and compress images to under 30 KB compliant with NSDL PAN card guidelines, passport services, and banking upload portals.',
    badge: 'PAN Card & Banking Portal Limit',
    targetFileType: 'image',
    initialSettings: {
      preset: 'custom',
      targetMaxKB: 30,
      quality: 0.7,
      maxWidthOrHeight: 900,
      outputFormat: 'image/jpeg',
      stripPdfMetadata: true,
      activeExamPreset: null,
    },
    keywords: [
      'compress image to 30kb',
      'pan card photo resizer 30kb',
      'compress photo to 30kb',
      'resize photo below 30kb',
      'nsdl photo compressor 30kb',
    ],
    featuresList: [
      'Optimized for NSDL and UTIITSL PAN card portal requirements',
      'Maintains sharp facial contours and portrait clarity',
      'Direct copy-to-clipboard and 1-tap download',
    ],
    faq: [
      {
        question: 'What is the photo limit for PAN Card online application?',
        answer:
          'NSDL and UTIITSL require portrait photos to be under 30 KB and signatures under 20 KB in JPEG format.',
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
          'The compressor uses an intelligent multi-pass canvas algorithm that retains color channels around facial contours while stripping invisible metadata and high-frequency noise.',
      },
      {
        question: 'Which formats are supported for 50 KB compression?',
        answer:
          'You can upload JPG, JPEG, PNG, and WebP files. You can also convert directly between formats with our output dropdown.',
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
    ],
  },

  'compress-image-to-200kb': {
    slug: 'compress-image-to-200kb',
    title: 'Compress Image to 200KB Online — Certificate & Marksheet Resizer',
    metaDescription:
      'Compress scanned documents, certificates, and marksheet images under 200 KB online with crystal clear text readability. Zero server uploads.',
    h1: 'Compress Image to Under 200 KB',
    subheading:
      'High-clarity document compression for caste certificates, marksheets, degree diplomas, and domicile certificates requiring under 200 KB.',
    badge: 'Certificate & Document Standard',
    targetFileType: 'image',
    initialSettings: {
      preset: 'custom',
      targetMaxKB: 200,
      quality: 0.88,
      maxWidthOrHeight: 2048,
      outputFormat: 'original',
      stripPdfMetadata: true,
      activeExamPreset: null,
    },
    keywords: [
      'compress image to 200kb',
      'resize photo to 200kb',
      'compress marksheet to 200kb',
      'reduce certificate size to 200kb',
      'image compressor 200 kb online',
    ],
    featuresList: [
      'Preserves micro-print text on certificates and diplomas',
      'Up to 2048px resolution retained for OCR and manual scrutiny',
      'Instant copy-to-clipboard or download',
    ],
    faq: [
      {
        question: 'Why do university admissions cap image sizes at 200 KB?',
        answer:
          '200 KB provides sufficient resolution for admissions officers to read stamps, signatures, and grade tables while keeping upload queues manageable.',
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
    ],
  },

  'compress-pdf-to-200kb': {
    slug: 'compress-pdf-to-200kb',
    title: 'Compress PDF to 200KB Online — EPFO, Income Tax & Portal Limit',
    metaDescription:
      'Compress PDF documents under 200 KB for EPFO claim passbooks, Income Tax returns, and government portal uploads. 100% private in-browser tool.',
    h1: 'Compress PDF to Under 200 KB',
    subheading:
      'Optimize multi-page PDF documents and bank passbooks to under 200 KB required by EPFO, state portals, and visa authorities.',
    badge: 'EPFO & Tax Portal Compliant',
    targetFileType: 'pdf',
    initialSettings: {
      preset: 'custom',
      targetMaxKB: 200,
      quality: 0.88,
      outputFormat: 'original',
      stripPdfMetadata: true,
      activeExamPreset: null,
    },
    keywords: [
      'compress pdf to 200kb',
      'epfo pdf compressor 200kb',
      'reduce pdf size to 200kb online',
      'bank passbook pdf under 200kb',
      'compress pdf file to 200kb online free',
    ],
    featuresList: [
      'Strict compliance with EPFO 200 KB passbook upload cap',
      'Maintains clear bank transaction lines and account numbers',
      'Zero server uploads: 100% local device security',
    ],
    faq: [
      {
        question: 'How can I compress my bank passbook PDF for EPFO claim?',
        answer:
          'Upload your passbook PDF here. Our tool strips invisible metadata and reorganizes page streams to fit strictly below 200 KB.',
      },
    ],
  },

  'compress-pdf-to-500kb': {
    slug: 'compress-pdf-to-500kb',
    title: 'Compress PDF to 500KB Online — High Quality Multi-Page PDF Compressor',
    metaDescription:
      'Compress multi-page PDFs to under 500 KB online without losing formatting or sharp text. Free, private, and runs entirely in your browser.',
    h1: 'Compress PDF to Under 500 KB',
    subheading:
      'Shrink multi-page reports, portfolios, and application dossiers to under 500 KB while retaining print-quality charts and typography.',
    badge: 'Multi-Page PDF Standard',
    targetFileType: 'pdf',
    initialSettings: {
      preset: 'custom',
      targetMaxKB: 500,
      quality: 0.9,
      outputFormat: 'original',
      stripPdfMetadata: true,
      activeExamPreset: null,
    },
    keywords: [
      'compress pdf to 500kb',
      'reduce pdf size to 500kb',
      'compress multi page pdf 500kb',
      'pdf file size reducer 500kb',
    ],
    featuresList: [
      'Handles multi-page reports with dozens of pages',
      'Lossless stream dictionary consolidation',
      'Runs 100% locally on your machine',
    ],
    faq: [
      {
        question: 'Will compressing a PDF under 500 KB degrade text clarity?',
        answer:
          'No. Vector fonts, curves, and text glyphs in PDFs remain mathematically sharp because stream compression targets dictionary overhead rather than rasterization.',
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
    ],
  },

  'upsc-photo-resizer': {
    slug: 'upsc-photo-resizer',
    title: 'UPSC Photo & Signature Resizer — 350x350 px & 20KB-300KB (Civil Services, NDA)',
    metaDescription:
      'Official UPSC online photo and signature resizer for Civil Services (CSE), NDA, CDS, and CAPF exams. 350x350 to 1000x1000 px, 20 KB to 300 KB.',
    h1: 'UPSC Official Photo Resizer',
    subheading:
      'Resize and compress photos and signatures strictly according to UPSC OTR (One Time Registration) guidelines. 100% browser-based security.',
    badge: 'UPSC Civil Services & NDA Compliant',
    targetFileType: 'image',
    initialSettings: {
      preset: 'custom',
      targetMaxKB: 100,
      quality: 0.85,
      exactWidth: 350,
      exactHeight: 350,
      activeExamPreset: 'passport-photo',
      outputFormat: 'image/jpeg',
      stripPdfMetadata: true,
    },
    keywords: [
      'upsc photo resizer',
      'upsc photo size in kb',
      'upsc signature size resizer',
      'upsc otr photo compressor',
      'resize photo for upsc online application',
    ],
    featuresList: [
      'Strict 350x350 pixel format compatible with UPSC portal',
      'Guarantees size in the mandatory 20 KB to 300 KB envelope',
      'Zero server upload: Safe for civil service aspirants',
    ],
    faq: [
      {
        question: 'What are the UPSC photo specifications?',
        answer:
          'UPSC mandates: photograph dimensions between 350x350 and 1000x1000 pixels, file size between 20 KB and 300 KB, with applicant name and date clearly visible.',
      },
    ],
  },

  'pan-card-photo-resizer': {
    slug: 'pan-card-photo-resizer',
    title: 'PAN Card Photo & Signature Resizer — 213x213 px & Under 30KB (NSDL / UTIITSL)',
    metaDescription:
      'Online PAN Card photo and signature resizer for NSDL and UTIITSL. Formats photo to 213x213 pixels (300 DPI, <30KB) and signature to 400x200 pixels (<20KB).',
    h1: 'PAN Card Photo & Signature Resizer (213x213 px)',
    subheading:
      'Format photos to 213x213 pixels (<30KB) and signatures to 400x200 pixels (<20KB) strictly matching NSDL and UTIITSL online portal requirements.',
    badge: 'NSDL & UTIITSL Compliant',
    targetFileType: 'image',
    initialSettings: {
      preset: 'custom',
      targetMaxKB: 30,
      quality: 0.8,
      exactWidth: 213,
      exactHeight: 213,
      outputFormat: 'image/jpeg',
      stripPdfMetadata: true,
      activeExamPreset: null,
    },
    keywords: [
      'pan card photo resizer',
      '213x213 photo resizer for pan card',
      'nsdl pan card photo compressor',
      'utiitsl signature resizer 20kb',
      'pan card photo size 30kb online',
    ],
    featuresList: [
      'Exact 213x213 px aspect ratio strictly required by NSDL portal',
      'Enforces sub-30 KB size cap for photos and sub-20 KB for signatures',
      'Zero server storage: Your PAN identity data never leaves your device',
    ],
    faq: [
      {
        question: 'Why does PAN card portal require 213x213 pixels?',
        answer:
          '213x213 pixels at 300 DPI is the physical passport print window dimensions on the laminated PAN card.',
      },
    ],
  },

  'reduce-image-size-in-kb': {
    slug: 'reduce-image-size-in-kb',
    title: 'Reduce Image Size in KB Online — Free, Fast & Lossless',
    metaDescription:
      'Reduce image size in KB online without losing quality. Compress JPG, PNG, and WebP images to 20KB, 50KB, 100KB instantly. Zero server uploads.',
    h1: 'Reduce Image Size in KB Online',
    subheading:
      'Compress and reduce your pictures to any exact KB limit in seconds. Free, unlimited, and runs 100% locally in your browser memory.',
    badge: 'High-Volume Universal Compressor',
    targetFileType: 'image',
    initialSettings: {
      preset: 'under-50',
      targetMaxKB: 50,
      quality: 0.75,
      maxWidthOrHeight: 1280,
      outputFormat: 'original',
      stripPdfMetadata: true,
      activeExamPreset: null,
    },
    keywords: [
      'reduce image size in kb',
      'reduce photo size in kb',
      'image size reducer in kb online',
      'how to reduce image size in kb',
      'compress picture size in kb',
    ],
    featuresList: [
      'Support all major formats: JPG, PNG, WebP, and PDF',
      'Select any target KB limit: 10KB, 20KB, 50KB, 100KB, or custom',
      'Zero file uploads: 100% private and works offline',
    ],
    faq: [
      {
        question: 'How do I reduce an image size to a specific KB?',
        answer:
          'Choose or drag your photo, tap one of our instant target buttons (e.g., [Under 50 KB]), and tap Download or Copy. The tool automatically computes the optimal resolution and quantization to match your exact KB target.',
      },
    ],
  },

  'compress-jpeg-to-50kb': {
    slug: 'compress-jpeg-to-50kb',
    title: 'Compress JPEG to 50KB Online — Free, Instant & Private',
    metaDescription:
      'Compress JPEG photos to under 50 KB online without losing facial clarity. Perfect for government forms, job portals, and online admissions. Zero server uploads.',
    h1: 'Compress JPEG to Under 50 KB',
    subheading:
      'Reduce JPEG images to strictly under 50 KB with crisp sharpness. 100% browser-based compression with instant download or copy.',
    badge: 'High-Volume JPEG Standard',
    targetFileType: 'image',
    initialSettings: {
      preset: 'under-50',
      targetMaxKB: 50,
      quality: 0.75,
      maxWidthOrHeight: 1280,
      outputFormat: 'image/jpeg',
      stripPdfMetadata: true,
      activeExamPreset: null,
    },
    keywords: [
      'compress jpeg to 50kb',
      'reduce jpeg size to 50kb',
      'jpeg compressor 50kb',
      'compress jpeg to 50kb online free',
      'reduce jpeg image size below 50 kb',
    ],
    featuresList: [
      'Guaranteed strictly below 50 KB for instant form submission',
      'Lossless-perceptual quantization keeps face details clear',
      '100% private: Operates entirely in your browser memory',
      '1-Tap Copy to Clipboard for immediate application pasting',
    ],
    faq: [
      {
        question: 'Why do application portals insist on JPEG under 50 KB?',
        answer:
          '50 KB provides the sweet spot between database storage efficiency on government servers and sufficient DPI for verifying identity.',
      },
      {
        question: 'Will compressing JPEG to 50 KB blur my face?',
        answer:
          'No. Our engine uses bicubic downsampling rather than aggressive chroma decimation, preserving crisp edges on facial features.',
      },
    ],
  },

  'compress-jpg-to-100kb': {
    slug: 'compress-jpg-to-100kb',
    title: 'Compress JPG to 100KB Online — High Resolution Photo Compressor',
    metaDescription:
      'Compress JPG images to under 100 KB online while retaining high resolution and crisp contrast. Fast, private, and unlimited. Zero server uploads.',
    h1: 'Compress JPG to Under 100 KB',
    subheading:
      'Shrink high-resolution JPG images to under 100 KB. Ideal for resume headshots, identity cards, and academic portal uploads.',
    badge: '100 KB High-Res Preset',
    targetFileType: 'image',
    initialSettings: {
      preset: 'under-100',
      targetMaxKB: 100,
      quality: 0.85,
      maxWidthOrHeight: 1600,
      outputFormat: 'image/jpeg',
      stripPdfMetadata: true,
      activeExamPreset: null,
    },
    keywords: [
      'compress jpg to 100kb',
      'reduce jpg to 100kb',
      'jpg compressor 100kb',
      'compress photo to 100kb',
      'reduce jpg file size below 100kb',
    ],
    featuresList: [
      'Preserves 1600px resolution while staying under 100 KB',
      'Optimal color balance for identity and professional photos',
      'Zero server upload: Safe for private identity documents',
    ],
    faq: [
      {
        question: 'When should I use the 100 KB preset instead of 50 KB?',
        answer:
          'Use 100 KB when application portals permit up to 100 KB or 200 KB, allowing higher pixel dimensions for certificates or detailed portraits.',
      },
    ],
  },

  'gate-photo-resizer': {
    slug: 'gate-photo-resizer',
    title: 'GATE Photo & Signature Resizer — 480x640 px & 5KB-200KB (IIT GATE / JAM)',
    metaDescription:
      'Official IIT GATE & JAM online photo and signature resizer. Converts photos to 480x640 pixels (5 KB to 200 KB) and signatures to 160x560 pixels (3 KB to 100 KB).',
    h1: 'IIT GATE Photo & Signature Resizer',
    subheading:
      'Format photos to 480x640 pixels (<200KB) strictly matching IIT GATE GOAPS online application portal specifications.',
    badge: 'IIT GATE & JAM Compliant',
    targetFileType: 'image',
    initialSettings: {
      preset: 'custom',
      targetMaxKB: 200,
      quality: 0.85,
      exactWidth: 480,
      exactHeight: 640,
      outputFormat: 'image/jpeg',
      stripPdfMetadata: true,
      activeExamPreset: 'gate-photo',
    },
    keywords: [
      'gate photo resizer',
      'gate photo size in kb',
      'gate signature resizer',
      'gate 480x640 photo compressor',
      'iit gate photo dimensions online',
    ],
    featuresList: [
      'Exact 480x640 pixel dimension enforcement (aspect ratio 0.75)',
      'Enforces strict 5 KB to 200 KB file size requirement',
      'Zero server upload: Candidate photo never leaves device',
    ],
    faq: [
      {
        question: 'What are the official photo specifications for GATE?',
        answer:
          'GATE requires a recent color photograph with white or light background, aspect ratio 3:4 (minimum 240x320 pixels, maximum 480x640 pixels), and file size between 5 KB and 200 KB in JPEG format.',
      },
    ],
  },

  'neet-photo-resizer': {
    slug: 'neet-photo-resizer',
    title: 'NEET Photo & Signature Resizer — Passport & Postcard 4x6 Size (NTA NEET UG)',
    metaDescription:
      'Official NTA NEET UG photo and signature resizer. Formats passport photo (10-200 KB), postcard 4x6 photo (10-200 KB), and signature (4-30 KB) with white background.',
    h1: 'NTA NEET Photo & Signature Resizer',
    subheading:
      'Resize and compress passport and postcard photos for NEET UG application forms strictly adhering to National Testing Agency (NTA) guidelines.',
    badge: 'NTA NEET UG Compliant',
    targetFileType: 'image',
    initialSettings: {
      preset: 'custom',
      targetMaxKB: 100,
      quality: 0.8,
      exactWidth: 350,
      exactHeight: 450,
      outputFormat: 'image/jpeg',
      stripPdfMetadata: true,
      activeExamPreset: 'passport-photo',
    },
    keywords: [
      'neet photo resizer',
      'neet postcard size photo maker',
      'neet photo size in kb',
      'nta neet signature resizer',
      'resize photo for neet application',
    ],
    featuresList: [
      'Pre-configured for NTA NEET 10 KB - 200 KB size envelope',
      'Supports passport photo (350x450 px) & postcard format',
      '100% private & secure: Zero cloud uploads',
    ],
    faq: [
      {
        question: 'What size photo is required for NEET application?',
        answer:
          'NTA mandates: Passport size photo (10 KB to 200 KB) and Postcard 4"x6" photo (10 KB to 200 KB) with 80% face coverage and white background.',
      },
    ],
  },

  'ibps-photo-resizer': {
    slug: 'ibps-photo-resizer',
    title: 'IBPS Photo & Signature Resizer — 200x230 px & 140x60 px (Bank PO / Clerk)',
    metaDescription:
      'Online photo and signature resizer for IBPS PO, Clerk, SO, RRB, and SBI recruitment. Formats photo to 200x230 pixels (20-50 KB) and signature to 140x60 pixels (10-20 KB).',
    h1: 'IBPS Bank PO & Clerk Photo Resizer',
    subheading:
      'Format photos to 200x230 pixels (20-50 KB) and signatures to 140x60 pixels (10-20 KB) strictly compliant with IBPS and SBI portal criteria.',
    badge: 'IBPS & SBI Banking Compliant',
    targetFileType: 'image',
    initialSettings: {
      preset: 'custom',
      targetMaxKB: 50,
      quality: 0.8,
      exactWidth: 200,
      exactHeight: 230,
      outputFormat: 'image/jpeg',
      stripPdfMetadata: true,
      activeExamPreset: 'ssc-photo',
    },
    keywords: [
      'ibps photo resizer',
      'ibps signature resizer 10 to 20 kb',
      'sbi po photo size compressor',
      '200x230 photo resizer for bank exam',
      'ibps left thumb impression resizer',
    ],
    featuresList: [
      'Strict 200x230 pixel dimension enforcement for photo',
      'Strict 140x60 pixel dimension enforcement for signature',
      'Zero server upload: Safe for private banking aspirants',
    ],
    faq: [
      {
        question: 'What are the IBPS candidate photo dimensions?',
        answer:
          'IBPS mandates dimensions of 200 x 230 pixels, file size 20 KB - 50 KB in JPEG/JPG format, taken against a light-coloured background.',
      },
    ],
  },

  'dv-lottery-photo-tool': {
    slug: 'dv-lottery-photo-tool',
    title: 'US DV Lottery Photo Tool — 600x600 px & Under 240KB (Green Card Diversity Visa)',
    metaDescription:
      'Free online US DV Lottery photo validator and resizer. Formats photo to 600x600 pixels square, under 240 KB, 24-bit color, conforming strictly to US State Dept rules.',
    h1: 'US DV Lottery Official Photo Tool',
    subheading:
      'Format photos to 600x600 pixels square and under 240 KB strictly conforming to US Department of State Diversity Visa (Green Card) criteria.',
    badge: 'US Green Card Lottery Standard',
    targetFileType: 'image',
    initialSettings: {
      preset: 'custom',
      targetMaxKB: 240,
      quality: 0.85,
      exactWidth: 600,
      exactHeight: 600,
      outputFormat: 'image/jpeg',
      stripPdfMetadata: true,
      activeExamPreset: 'dv-lottery-photo',
    },
    keywords: [
      'dv lottery photo tool',
      'us visa photo resizer 600x600',
      'green card photo compressor 240kb',
      'diversity visa photo validator online',
      'resize photo for us visa application',
    ],
    featuresList: [
      'Strict 1:1 square ratio (600x600 pixels) required by US State Dept',
      'Strict sub-240 KB file size cap enforced',
      'Zero upload: Your biometric visa photo stays strictly on your computer',
    ],
    faq: [
      {
        question: 'What are the photo requirements for the US DV Lottery?',
        answer:
          'The US Department of State requires: exact dimensions of 600x600 pixels, file size less than or equal to 240 KB, JPEG file format, 24-bit color, and neutral expression with white or off-white background.',
      },
    ],
  },

  'passport-photo-compressor': {
    slug: 'passport-photo-compressor',
    title: 'Passport Photo Compressor — 35x45 mm & Under 50KB Online',
    metaDescription:
      'Compress passport size photos to under 50 KB online. Formats standard 35x45 mm (350x450 px) photos for passport applications, visas, and consular services.',
    h1: 'Passport Photo Compressor (35x45 mm)',
    subheading:
      'Compress and resize standard 350x450 pixel passport photos to under 50 KB or 100 KB with crystal-clear biometric recognition quality.',
    badge: 'International Passport Standard',
    targetFileType: 'image',
    initialSettings: {
      preset: 'under-50',
      targetMaxKB: 50,
      quality: 0.8,
      exactWidth: 350,
      exactHeight: 450,
      outputFormat: 'image/jpeg',
      stripPdfMetadata: true,
      activeExamPreset: 'passport-photo',
    },
    keywords: [
      'passport photo compressor',
      'compress passport size photo to 50kb',
      '35x45 mm photo resizer online',
      'passport photo size in kb',
      'reduce passport photo size below 50kb',
    ],
    featuresList: [
      'Standard 35mm x 45mm (350x450 px) aspect ratio',
      'Iterative quantization ensures crisp facial biometrics under 50 KB',
      'Zero server upload: Safe for government passport submission',
    ],
    faq: [
      {
        question: 'How do I convert a regular selfie into a passport photo under 50 KB?',
        answer:
          'Select your photo here. Our tool automatically resizes it to 350x450 pixels (35mm x 45mm standard) and compresses it to strictly under 50 KB while preserving facial clarity.',
      },
    ],
  },

  'compress-pdf-to-1mb': {
    slug: 'compress-pdf-to-1mb',
    title: 'Compress PDF to 1MB Online — Shrink Large PDF Documents Fast',
    metaDescription:
      'Compress large PDF documents to under 1 MB online without quality loss. Ideal for email attachments, college dissertations, and job application portfolios.',
    h1: 'Compress PDF to Under 1 MB',
    subheading:
      'Reduce large multi-page PDF documents to under 1 MB for email attachments, portal uploads, and fast transmission.',
    badge: 'Email & Job Portal Standard',
    targetFileType: 'pdf',
    initialSettings: {
      preset: 'custom',
      targetMaxKB: 1000,
      quality: 0.9,
      outputFormat: 'original',
      stripPdfMetadata: true,
      activeExamPreset: null,
    },
    keywords: [
      'compress pdf to 1mb',
      'reduce pdf size to 1mb',
      'compress pdf under 1 mb online free',
      'shrink pdf to 1mb',
      'pdf file size reducer 1mb',
    ],
    featuresList: [
      'Targeted for the standard 1 MB email and portal limit',
      'Lossless stream dictionary consolidation',
      '100% private: Confidential contracts and bank statements never leave your device',
    ],
    faq: [
      {
        question: 'Why do most email clients or portals limit PDFs to 1 MB?',
        answer:
          '1 MB prevents email attachment rejections and ensures instant mobile loading for hiring managers or admissions officers.',
      },
    ],
  },
};

export const ALL_LANDING_PAGES = Object.values(LANDING_PAGES);
