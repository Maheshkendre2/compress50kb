'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import TrustBanner from '@/components/TrustBanner';
import AdSlot from '@/components/AdSlot';
import DropZone from '@/components/DropZone';
import CompressionControls from '@/components/CompressionControls';
import FileCard from '@/components/FileCard';
import BatchSummary from '@/components/BatchSummary';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

import type {
  CompressedFileResult,
  CompressionSettings,
} from '@/types/compression';
import { PRESET_CONFIGS } from '@/types/compression';
import { compressImage } from '@/lib/compressors/imageCompressor';
import { compressPdf } from '@/lib/compressors/pdfCompressor';
import { FileImage, FileText } from 'lucide-react';

export default function Home() {
  const [settings, setSettings] = useState<CompressionSettings>({
    preset: 'under-50',
    targetMaxKB: PRESET_CONFIGS['under-50'].maxKB,
    quality: PRESET_CONFIGS['under-50'].defaultQuality,
    maxWidthOrHeight: PRESET_CONFIGS['under-50'].maxDimension,
    outputFormat: 'original',
    stripPdfMetadata: true,
  });

  const [files, setFiles] = useState<CompressedFileResult[]>([]);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);

  // Compress a single file entry
  const processFile = useCallback(
    async (fileItem: CompressedFileResult, currentSettings: CompressionSettings) => {
      // Set status to compressing
      setFiles((prev) =>
        prev.map((item) =>
          item.id === fileItem.id
            ? { ...item, status: 'compressing', progress: 10, error: undefined }
            : item
        )
      );

      try {
        if (fileItem.type === 'image') {
          const result = await compressImage(fileItem.file, currentSettings, (p) => {
            setFiles((prev) =>
              prev.map((item) =>
                item.id === fileItem.id ? { ...item, progress: p } : item
              )
            );
          });

          setFiles((prev) =>
            prev.map((item) =>
              item.id === fileItem.id
                ? {
                    ...item,
                    status: 'success',
                    progress: 100,
                    compressedSize: result.compressedSize,
                    savedBytes: result.savedBytes,
                    reductionPercentage: result.reductionPercentage,
                    blobUrl: result.blobUrl,
                    dimensions: result.dimensions,
                    compressedAt: Date.now(),
                  }
                : item
            )
          );
        } else if (fileItem.type === 'pdf') {
          const result = await compressPdf(fileItem.file, currentSettings, (p) => {
            setFiles((prev) =>
              prev.map((item) =>
                item.id === fileItem.id ? { ...item, progress: p } : item
              )
            );
          });

          setFiles((prev) =>
            prev.map((item) =>
              item.id === fileItem.id
                ? {
                    ...item,
                    status: 'success',
                    progress: 100,
                    compressedSize: result.compressedSize,
                    savedBytes: result.savedBytes,
                    reductionPercentage: result.reductionPercentage,
                    blobUrl: result.blobUrl,
                    pdfPageCount: result.pageCount,
                    compressedAt: Date.now(),
                  }
                : item
            )
          );
        }
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error
            ? err.message
            : 'Error occurred during client-side compression';
        setFiles((prev) =>
          prev.map((item) =>
            item.id === fileItem.id
              ? { ...item, status: 'error', progress: 0, error: errorMsg }
              : item
          )
        );
      }
    },
    []
  );

  // When new files are selected or dropped
  const handleFilesSelected = useCallback(
    (newRawFiles: File[]) => {
      const newItems: CompressedFileResult[] = newRawFiles.map((file) => {
        const isPdf =
          file.type === 'application/pdf' ||
          file.name.toLowerCase().endsWith('.pdf');
        const previewUrl = !isPdf ? URL.createObjectURL(file) : null;

        return {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          file,
          name: file.name,
          type: isPdf ? 'pdf' : 'image',
          mimeType: file.type || (isPdf ? 'application/pdf' : 'image/jpeg'),
          originalSize: file.size,
          compressedSize: null,
          savedBytes: null,
          reductionPercentage: null,
          status: 'idle',
          progress: 0,
          blobUrl: null,
          previewUrl,
        };
      });

      setFiles((prev) => [...newItems, ...prev]);

      // Automatically trigger compression for newly added files
      newItems.forEach((item) => {
        processFile(item, settings);
      });
    },
    [processFile, settings]
  );

  // Remove individual file
  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.blobUrl) URL.revokeObjectURL(target.blobUrl);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  // Recompress individual file
  const handleRecompress = useCallback(
    (id: string) => {
      const target = files.find((item) => item.id === id);
      if (target) {
        processFile(target, settings);
      }
    },
    [files, processFile, settings]
  );

  // Recompress all files
  const handleRecompressAll = useCallback(() => {
    setIsProcessingBatch(true);
    const promises = files.map((fileItem) => processFile(fileItem, settings));
    Promise.all(promises).finally(() => {
      setIsProcessingBatch(false);
    });
  }, [files, processFile, settings]);

  // Clear all files
  const handleClearAll = useCallback(() => {
    files.forEach((item) => {
      if (item.blobUrl) URL.revokeObjectURL(item.blobUrl);
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
    });
    setFiles([]);
  }, [files]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((item) => {
        if (item.blobUrl) URL.revokeObjectURL(item.blobUrl);
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, [files]);

  // Sample file generator helper for instant zero-hassle testing
  const handleLoadSample = (sampleType: 'image' | 'pdf') => {
    if (sampleType === 'image') {
      // Create high-res colorful canvas image
      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Gradient background
        const grad = ctx.createLinearGradient(0, 0, 1920, 1080);
        grad.addColorStop(0, '#1e1b4b');
        grad.addColorStop(0.5, '#4338ca');
        grad.addColorStop(1, '#065f46');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1920, 1080);

        // Add geometric decorative shapes & text
        for (let i = 0; i < 30; i++) {
          ctx.beginPath();
          ctx.arc(
            Math.sin(i) * 800 + 960,
            Math.cos(i) * 400 + 540,
            Math.abs(Math.sin(i * 2)) * 120 + 30,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + (i % 5) * 0.04})`;
          ctx.fill();
        }

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 64px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Sample Ultra-HD Image (1080p)', 960, 520);
        ctx.font = '32px sans-serif';
        ctx.fillStyle = '#a5b4fc';
        ctx.fillText('Ready for instant client-side compression test', 960, 580);
      }

      canvas.toBlob((blob) => {
        if (blob) {
          const sampleFile = new File([blob], 'sample-wallpaper-1080p.jpg', {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          handleFilesSelected([sampleFile]);
        }
      }, 'image/jpeg', 0.95);
    } else {
      // Create sample PDF using pdf-lib
      import('pdf-lib').then(async ({ PDFDocument, rgb, StandardFonts }) => {
        const doc = await PDFDocument.create();
        const page1 = doc.addPage([600, 800]);
        const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
        const helvetica = await doc.embedFont(StandardFonts.Helvetica);

        page1.drawText('Sample Confidential Document', {
          x: 50,
          y: 720,
          size: 24,
          font: helveticaBold,
          color: rgb(0.1, 0.2, 0.4),
        });

        page1.drawText(
          'This multi-page PDF document is generated locally inside your browser.\nIt tests client-side PDF object streams, metadata stripping, and layout retention.\nNo network upload is involved.',
          {
            x: 50,
            y: 650,
            size: 13,
            font: helvetica,
            color: rgb(0.2, 0.2, 0.2),
            lineHeight: 20,
          }
        );

        const page2 = doc.addPage([600, 800]);
        page2.drawText('Page 2 - Metadata & Stream Tables', {
          x: 50,
          y: 720,
          size: 20,
          font: helveticaBold,
          color: rgb(0.1, 0.2, 0.4),
        });
        page2.drawText(
          'Page 2 content demonstrating multi-page stream rebuilding in pdf-lib.\nObject stream compression groups structural dictionaries to save space.',
          {
            x: 50,
            y: 650,
            size: 13,
            font: helvetica,
            color: rgb(0.2, 0.2, 0.2),
            lineHeight: 20,
          }
        );

        doc.setTitle('Sample Document with Bloated Metadata');
        doc.setAuthor('Test Suite User');

        const pdfBytes = await doc.save();
        const samplePdfBlob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
        const samplePdfFile = new File([samplePdfBlob], 'sample-document-2pages.pdf', {
          type: 'application/pdf',
          lastModified: Date.now(),
        });
        handleFilesSelected([samplePdfFile]);
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Ad Placement 1: ad-slot-header */}
        <AdSlot id="ad-slot-header" format="leaderboard" />

        {/* Hero Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Client-Side Image &amp; PDF Compression
          </h1>
          <p className="text-base sm:text-lg text-slate-400">
            Shrink your files under <span className="text-emerald-400 font-semibold">20 KB</span>,{' '}
            <span className="text-emerald-400 font-semibold">50 KB</span>, or{' '}
            <span className="text-emerald-400 font-semibold">100 KB</span> instantly.
            Zero uploads, 100% private, and processed right on your device.
          </p>
        </div>

        {/* Trust & Privacy Banner */}
        <TrustBanner />

        {/* Quick Sample File Trigger for Testing */}
        {files.length === 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 pb-2">
            <span>Don&apos;t have a file ready?</span>
            <button
              type="button"
              onClick={() => handleLoadSample('image')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 px-3 py-1.5 font-medium text-indigo-300 border border-indigo-500/30 transition-all hover:scale-105"
            >
              <FileImage className="h-3.5 w-3.5 text-indigo-400" />
              Try Sample Image
            </button>
            <button
              type="button"
              onClick={() => handleLoadSample('pdf')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 px-3 py-1.5 font-medium text-rose-300 border border-rose-500/30 transition-all hover:scale-105"
            >
              <FileText className="h-3.5 w-3.5 text-rose-400" />
              Try Sample PDF
            </button>
          </div>
        )}

        {/* Drag and Drop Zone */}
        <DropZone onFilesSelected={handleFilesSelected} isProcessing={isProcessingBatch} />

        {/* Compression Presets & Manual Slider Controls */}
        <CompressionControls
          settings={settings}
          onChange={setSettings}
          onApplyAll={files.length > 0 ? handleRecompressAll : undefined}
          disabled={isProcessingBatch}
        />

        {/* Ad Placement 2: ad-slot-action */}
        <AdSlot id="ad-slot-action" format="action" />

        {/* Batch Queue & Statistics Summary (when files exist) */}
        {files.length > 0 && (
          <BatchSummary
            files={files}
            onClearAll={handleClearAll}
            onRecompressAll={handleRecompressAll}
          />
        )}

        {/* Output Previews List */}
        {files.length > 0 && (
          <div className="w-full max-w-5xl mx-auto space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <span>Compressed Files</span>
                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                  {files.length}
                </span>
              </h3>
            </div>

            <div className="space-y-3.5">
              {files.map((item) => (
                <FileCard
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveFile}
                  onRecompress={handleRecompress}
                />
              ))}
            </div>
          </div>
        )}

        {/* Ad Placement 3: ad-slot-footer */}
        <AdSlot id="ad-slot-footer" format="banner" />

        {/* FAQ & Technical Guarantees Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
