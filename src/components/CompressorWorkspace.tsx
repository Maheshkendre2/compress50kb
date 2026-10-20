'use client';

import React, { useState, useCallback, useEffect } from 'react';
import PresetBar from '@/components/PresetBar';
import DropZone from '@/components/DropZone';
import ResultCard from '@/components/ResultCard';
import RecentDrawer from '@/components/RecentDrawer';

import type {
  CompressedFileResult,
  CompressionSettings,
} from '@/types/compression';
import { PRESET_CONFIGS } from '@/types/compression';
import { compressImage } from '@/lib/compressors/imageCompressor';
import { compressPdf } from '@/lib/compressors/pdfCompressor';
import { saveRecentFile } from '@/lib/recentStorage';

interface CompressorWorkspaceProps {
  initialSettings?: CompressionSettings;
}

export default function CompressorWorkspace({
  initialSettings,
}: CompressorWorkspaceProps) {
  const [settings, setSettings] = useState<CompressionSettings>(
    initialSettings || {
      preset: 'under-50',
      targetMaxKB: PRESET_CONFIGS['under-50'].maxKB,
      quality: PRESET_CONFIGS['under-50'].defaultQuality,
      maxWidthOrHeight: PRESET_CONFIGS['under-50'].maxDimension,
      outputFormat: 'original',
      stripPdfMetadata: true,
      activeExamPreset: null,
    }
  );

  const [files, setFiles] = useState<CompressedFileResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Compress a single file entry
  const processFile = useCallback(
    async (fileItem: CompressedFileResult, currentSettings: CompressionSettings) => {
      setFiles((prev) =>
        prev.map((item) =>
          item.id === fileItem.id
            ? { ...item, status: 'compressing', progress: 15, error: undefined }
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

          // Save to Recent (3) storage
          saveRecentFile({
            id: fileItem.id,
            name: fileItem.name,
            type: 'image',
            originalSize: result.originalSize,
            compressedSize: result.compressedSize,
            reductionPercentage: result.reductionPercentage,
            blob: result.compressedFile,
            timestamp: Date.now(),
          });
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

          // Save to Recent (3) storage
          saveRecentFile({
            id: fileItem.id,
            name: fileItem.name,
            type: 'pdf',
            originalSize: result.originalSize,
            compressedSize: result.compressedSize,
            reductionPercentage: result.reductionPercentage,
            blob: result.compressedFile,
            timestamp: Date.now(),
          });
        }
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error
            ? err.message
            : 'Error compressing file in browser';
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

  // Files selected from Camera or Browse
  const handleFilesSelected = useCallback(
    (newRawFiles: File[]) => {
      setIsProcessing(true);
      const newItems: CompressedFileResult[] = newRawFiles.map((file) => {
        const isPdf =
          file.type === 'application/pdf' ||
          file.name.toLowerCase().endsWith('.pdf');
        const previewUrl = !isPdf ? URL.createObjectURL(file) : null;

        return {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
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

      // Process each file
      const promises = newItems.map((item) => processFile(item, settings));
      Promise.all(promises).finally(() => setIsProcessing(false));
    },
    [processFile, settings]
  );

  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.blobUrl) URL.revokeObjectURL(target.blobUrl);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  useEffect(() => {
    return () => {
      files.forEach((item) => {
        if (item.blobUrl) URL.revokeObjectURL(item.blobUrl);
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, [files]);

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* 1-Tap Target Presets Row */}
      <PresetBar settings={settings} onChange={setSettings} disabled={isProcessing} />

      {/* Minimalist Upload Box (Camera + Browse) */}
      <DropZone onFilesSelected={handleFilesSelected} isProcessing={isProcessing} />

      {/* Results List */}
      {files.length > 0 && (
        <div className="space-y-3 pt-1">
          {files.map((item) => (
            <ResultCard
              key={item.id}
              item={item}
              targetMaxKB={settings.targetMaxKB}
              onRemove={handleRemoveFile}
            />
          ))}
        </div>
      )}

      {/* High-Retention Recent (3) Drawer */}
      <RecentDrawer />
    </div>
  );
}
