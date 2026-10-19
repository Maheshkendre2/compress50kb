'use client';

import React, { useState } from 'react';
import { Sliders, Zap, Check, Image as ImageIcon, Sparkles, Award } from 'lucide-react';
import type {
  CompressionSettings,
  TargetPreset,
  OutputFormat,
  ExamPresetId,
} from '@/types/compression';
import { PRESET_CONFIGS, EXAM_PRESETS } from '@/types/compression';

interface CompressionControlsProps {
  settings: CompressionSettings;
  onChange: (newSettings: CompressionSettings) => void;
  onApplyAll?: () => void;
  disabled?: boolean;
}

export default function CompressionControls({
  settings,
  onChange,
  onApplyAll,
  disabled = false,
}: CompressionControlsProps) {
  const [activeTab, setActiveTab] = useState<'standard' | 'exams'>(
    settings.activeExamPreset ? 'exams' : 'standard'
  );

  const handleStandardPresetSelect = (presetKey: TargetPreset) => {
    if (presetKey === 'custom') {
      onChange({
        ...settings,
        preset: 'custom',
        exactWidth: undefined,
        exactHeight: undefined,
        activeExamPreset: null,
      });
      return;
    }

    const config = PRESET_CONFIGS[presetKey];
    onChange({
      ...settings,
      preset: presetKey,
      targetMaxKB: config.maxKB,
      quality: config.defaultQuality,
      maxWidthOrHeight: config.maxDimension,
      exactWidth: undefined,
      exactHeight: undefined,
      activeExamPreset: null,
    });
  };

  const handleExamPresetSelect = (examId: ExamPresetId) => {
    const examConfig = EXAM_PRESETS[examId];
    onChange({
      ...settings,
      preset: 'custom',
      targetMaxKB: examConfig.maxKB,
      quality: examConfig.defaultQuality,
      exactWidth: examConfig.exactWidth,
      exactHeight: examConfig.exactHeight,
      activeExamPreset: examId,
      maxWidthOrHeight: examConfig.exactWidth
        ? Math.max(examConfig.exactWidth, examConfig.exactHeight || 0)
        : undefined,
      outputFormat: 'image/jpeg',
    });
  };

  const handleCustomTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    onChange({
      ...settings,
      preset: 'custom',
      targetMaxKB: val,
      activeExamPreset: null,
    });
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qualityVal = parseFloat(e.target.value) / 100;
    onChange({
      ...settings,
      preset: 'custom',
      quality: qualityVal,
      activeExamPreset: null,
    });
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...settings,
      outputFormat: e.target.value as OutputFormat,
    });
  };

  const handleStripMetadataToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...settings,
      stripPdfMetadata: e.target.checked,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
      {/* Header and Controls Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Compression Settings &amp; Presets
            </h3>
            <p className="text-xs text-slate-400">
              Choose standard target sizes, exact Indian Exam guidelines, or custom sliders
            </p>
          </div>
        </div>

        {onApplyAll && (
          <button
            type="button"
            onClick={onApplyAll}
            disabled={disabled}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 border border-slate-700/80 transition-all hover:border-slate-600 disabled:opacity-50"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            Recompress All with Current Settings
          </button>
        )}
      </div>

      {/* Preset Category Switcher Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('standard')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'standard'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Zap className="h-4 w-4" />
          <span>Quick Target Presets</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('exams')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'exams'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
              : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Award className="h-4 w-4 text-amber-300" />
          <span>🇮🇳 Indian Exam Presets</span>
          <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-extrabold uppercase">
            Govt
          </span>
        </button>
      </div>

      {/* TAB 1: Standard Presets */}
      {activeTab === 'standard' && (
        <div className="space-y-3 mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            Standard Target Presets
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['under-20', 'under-50', 'under-100'] as const).map((key) => {
              const config = PRESET_CONFIGS[key];
              const isSelected = settings.preset === key && !settings.activeExamPreset;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleStandardPresetSelect(key)}
                  disabled={disabled}
                  className={`relative flex flex-col items-center justify-center rounded-2xl p-4 text-center transition-all duration-200 border ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-600/20 text-white shadow-lg shadow-indigo-600/20 ring-2 ring-indigo-500/50'
                      : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-white">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                  )}
                  <span className="text-base sm:text-lg font-bold">{config.label}</span>
                  <span className="text-[11px] text-slate-400 mt-1">
                    Max: {config.maxKB} KB
                  </span>
                </button>
              );
            })}

            {/* Custom Preset Button */}
            <button
              type="button"
              onClick={() => handleStandardPresetSelect('custom')}
              disabled={disabled}
              className={`relative flex flex-col items-center justify-center rounded-2xl p-4 text-center transition-all duration-200 border ${
                settings.preset === 'custom' && !settings.activeExamPreset
                  ? 'border-indigo-500 bg-indigo-600/20 text-white shadow-lg shadow-indigo-600/20 ring-2 ring-indigo-500/50'
                  : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              {settings.preset === 'custom' && !settings.activeExamPreset && (
                <span className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
              )}
              <span className="text-base sm:text-lg font-bold">Custom Slider</span>
              <span className="text-[11px] text-slate-400 mt-1">
                {settings.targetMaxKB} KB &bull; {Math.round(settings.quality * 100)}%
              </span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: Indian Exam Presets */}
      {activeTab === 'exams' && (
        <div className="space-y-3 mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5" />
            Official Government Exam Specifications (UPSC, SSC, IBPS, NTA)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(Object.keys(EXAM_PRESETS) as ExamPresetId[]).map((examKey) => {
              const exam = EXAM_PRESETS[examKey];
              const isSelected = settings.activeExamPreset === examKey;
              return (
                <button
                  key={examKey}
                  type="button"
                  onClick={() => handleExamPresetSelect(examKey)}
                  disabled={disabled}
                  className={`relative flex flex-col items-start p-4 rounded-2xl text-left transition-all border ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/15 text-white shadow-lg shadow-amber-500/20 ring-2 ring-amber-500/50'
                      : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                      {exam.label}
                    </span>
                    <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                      {exam.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {exam.description}
                  </p>
                  {isSelected && (
                    <span className="absolute bottom-3 right-3 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-slate-950">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Exam Guideline Banner */}
          {settings.activeExamPreset && (
            <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-center justify-between">
              <div>
                <strong>Active Exam Requirement:</strong>{' '}
                {EXAM_PRESETS[settings.activeExamPreset].description}
              </div>
              <span className="text-[11px] font-mono text-amber-300 bg-slate-900/60 px-2 py-0.5 rounded">
                Strict Dimension &amp; Size Locking Active
              </span>
            </div>
          )}
        </div>
      )}

      {/* Sliders and Fine Tuning Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/60">
        {/* Slider 1: Custom Target File Size */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="target-kb-slider"
              className="text-xs font-semibold text-slate-300 flex items-center gap-1.5"
            >
              <span>Target File Size Limit</span>
            </label>
            <span className="rounded-lg bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 font-mono text-xs font-bold text-indigo-300">
              {settings.targetMaxKB} KB
            </span>
          </div>

          <input
            id="target-kb-slider"
            type="range"
            min="10"
            max="1000"
            step="5"
            value={settings.targetMaxKB}
            onChange={handleCustomTargetChange}
            disabled={disabled}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
          />

          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>10 KB (Ultra Compact)</span>
            <span>50 KB</span>
            <span>200 KB</span>
            <span>1,000 KB</span>
          </div>
        </div>

        {/* Slider 2: Custom Quality Adjustment Slider */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="quality-slider"
              className="text-xs font-semibold text-slate-300 flex items-center gap-1.5"
            >
              <span>Manual Quality Adjustment</span>
            </label>
            <span className="rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 font-mono text-xs font-bold text-emerald-300">
              {Math.round(settings.quality * 100)}%
            </span>
          </div>

          <input
            id="quality-slider"
            type="range"
            min="10"
            max="100"
            step="1"
            value={Math.round(settings.quality * 100)}
            onChange={handleQualityChange}
            disabled={disabled}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
          />

          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>10% (Extreme)</span>
            <span>50% (Balanced)</span>
            <span>80% (Recommended)</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Advanced Output Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 mt-5 border-t border-slate-800/60">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/50 border border-slate-800">
          <div className="flex items-center gap-2.5">
            <ImageIcon className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs font-semibold text-slate-200">Image Output Format</p>
              <p className="text-[11px] text-slate-400">
                {settings.activeExamPreset ? 'Locked to JPEG for Govt Portals' : 'WebP achieves highest compression'}
              </p>
            </div>
          </div>
          <select
            value={settings.outputFormat}
            onChange={handleFormatChange}
            disabled={disabled}
            className="rounded-xl bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="original">Keep Original</option>
            <option value="image/jpeg">JPEG (.jpg) - Portal Standard</option>
            <option value="image/webp">WebP (Smallest File)</option>
            <option value="image/png">PNG (.png)</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/50 border border-slate-800">
          <div>
            <p className="text-xs font-semibold text-slate-200">PDF Stream Optimization</p>
            <p className="text-[11px] text-slate-400">Strip metadata &amp; use Object Streams</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.stripPdfMetadata}
              onChange={handleStripMetadataToggle}
              disabled={disabled}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
