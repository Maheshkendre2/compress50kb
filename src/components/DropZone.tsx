'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, FolderOpen, UploadCloud } from 'lucide-react';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing?: boolean;
}

const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];

export default function DropZone({ onFilesSelected, isProcessing = false }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const filterValidFiles = useCallback((fileList: FileList | File[]): File[] => {
    const validFiles: File[] = [];

    Array.from(fileList).forEach((file) => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      const isAcceptedExt = ACCEPTED_EXTENSIONS.includes(ext);
      const isAcceptedMime =
        file.type.startsWith('image/') || file.type === 'application/pdf';

      if (isAcceptedExt || isAcceptedMime) {
        validFiles.push(file);
      }
    });

    return validFiles;
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const valid = filterValidFiles(e.dataTransfer.files);
      if (valid.length > 0) onFilesSelected(valid);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const valid = filterValidFiles(e.target.files);
      if (valid.length > 0) onFilesSelected(valid);
      e.target.value = '';
    }
  };

  // Clipboard paste support (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      const pastedFiles: File[] = [];

      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
          const file = items[i].getAsFile();
          if (file) pastedFiles.push(file);
        }
      }

      if (pastedFiles.length > 0) {
        const valid = filterValidFiles(pastedFiles);
        if (valid.length > 0) onFilesSelected(valid);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [filterValidFiles, onFilesSelected]);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.webp,.pdf,image/*,application/pdf"
        className="hidden"
        onChange={handleFileInputChange}
        disabled={isProcessing}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileInputChange}
        disabled={isProcessing}
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative overflow-hidden rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-emerald-400 bg-emerald-950/20 scale-[1.01]'
            : 'border-slate-700/80 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-900/60'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-300">
            <UploadCloud className="h-6 w-6 text-emerald-400" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-200">
              Drag &amp; drop files here, or choose:
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Supports JPG, PNG, WebP, PDF &bull; Bulk enabled
            </p>
          </div>

          {/* Two Simple, Clean Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 w-full max-w-xs">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              disabled={isProcessing}
              className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-100 border border-slate-700/80 shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              <Camera className="h-4 w-4 text-emerald-400" />
              <span>📷 Camera</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50"
            >
              <FolderOpen className="h-4 w-4" />
              <span>📁 Browse File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
