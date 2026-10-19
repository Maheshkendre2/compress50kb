'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { UploadCloud, FileImage, FileText, PlusCircle, Sparkles } from 'lucide-react';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing?: boolean;
}

const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf'];
const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

export default function DropZone({ onFilesSelected, isProcessing = false }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filterValidFiles = useCallback((fileList: FileList | File[]): File[] => {
    const validFiles: File[] = [];
    const invalidNames: string[] = [];

    Array.from(fileList).forEach((file) => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      const isValidExt = ACCEPTED_EXTENSIONS.includes(ext);
      const isValidMime = ACCEPTED_MIME_TYPES.includes(file.type);

      if (isValidExt || isValidMime) {
        validFiles.push(file);
      } else {
        invalidNames.push(file.name);
      }
    });

    if (invalidNames.length > 0) {
      setErrorMessage(
        `Unsupported file type(s): ${invalidNames.slice(0, 2).join(', ')}${
          invalidNames.length > 2 ? ` and ${invalidNames.length - 2} more` : ''
        }. Please upload .jpg, .jpeg, .png, or .pdf files.`
      );
      setTimeout(() => setErrorMessage(null), 6000);
    } else {
      setErrorMessage(null);
    }

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
    // Only deactivate if leaving the container
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const valid = filterValidFiles(e.dataTransfer.files);
      if (valid.length > 0) {
        onFilesSelected(valid);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const valid = filterValidFiles(e.target.files);
      if (valid.length > 0) {
        onFilesSelected(valid);
      }
      e.target.value = '';
    }
  };

  const handleZoneClick = () => {
    fileInputRef.current?.click();
  };

  // Support clipboard paste (e.g. screenshots from clipboard)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      const pastedFiles: File[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) pastedFiles.push(file);
        }
      }

      if (pastedFiles.length > 0) {
        const valid = filterValidFiles(pastedFiles);
        if (valid.length > 0) {
          onFilesSelected(valid);
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [filterValidFiles, onFilesSelected]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleZoneClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleZoneClick();
          }
        }}
        className={`group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${
          isDragOver
            ? 'border-indigo-400 bg-indigo-950/40 shadow-2xl shadow-indigo-500/20 scale-[1.01]'
            : 'border-slate-700/80 bg-slate-900/50 hover:border-indigo-500/60 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-indigo-950/30'
        }`}
      >
        {/* Glow backdrop effect */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-teal-500/10 blur-3xl opacity-70 group-hover:opacity-100 transition-opacity" />

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
          className="hidden"
          onChange={handleFileInputChange}
          disabled={isProcessing}
        />

        <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
          {/* Animated Icon badge */}
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 shadow-lg ${
              isDragOver
                ? 'bg-indigo-600 text-white scale-110 shadow-indigo-500/50'
                : 'bg-gradient-to-br from-slate-800 to-slate-900 text-indigo-400 border border-slate-700 group-hover:border-indigo-500/40 group-hover:text-indigo-300 group-hover:scale-105 shadow-slate-950/50'
            }`}
          >
            <UploadCloud className="h-10 w-10 animate-bounce duration-1000" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
              Drag & Drop your files here
            </h3>
            <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto">
              or <span className="text-indigo-400 font-semibold underline decoration-indigo-500/50 underline-offset-4 group-hover:text-indigo-300">browse from your computer</span> or paste from clipboard (Ctrl+V)
            </p>
          </div>

          {/* Supported Format Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/90 px-3 py-1 text-xs font-semibold text-slate-300 border border-slate-700 shadow-sm">
              <FileImage className="h-3.5 w-3.5 text-sky-400" />
              .JPG
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/90 px-3 py-1 text-xs font-semibold text-slate-300 border border-slate-700 shadow-sm">
              <FileImage className="h-3.5 w-3.5 text-sky-400" />
              .JPEG
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/90 px-3 py-1 text-xs font-semibold text-slate-300 border border-slate-700 shadow-sm">
              <FileImage className="h-3.5 w-3.5 text-teal-400" />
              .PNG
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/90 px-3 py-1 text-xs font-semibold text-slate-300 border border-slate-700 shadow-sm">
              <FileText className="h-3.5 w-3.5 text-rose-400" />
              .PDF
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300 border border-indigo-500/20">
              <Sparkles className="h-3 w-3" />
              Batch uploads supported
            </span>
          </div>

          {/* Call-to-action button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleZoneClick();
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/40 active:scale-95"
            >
              <PlusCircle className="h-4 w-4" />
              Select Images or PDFs
            </button>
          </div>
        </div>
      </div>

      {/* Error alert toast */}
      {errorMessage && (
        <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-950/50 p-4 text-center text-sm text-rose-200 backdrop-blur shadow-lg animate-shake">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

