'use client';

import React, { useState } from 'react';
import { Sliders } from 'lucide-react';
import type { CompressionSettings, TargetPreset } from '@/types/compression';
import { PRESET_CONFIGS } from '@/types/compression';

interface PresetBarProps {
  settings: CompressionSettings;
  onChange: (newSettings: CompressionSettings) => void;
  disabled?: boolean;
}

export default function PresetBar({ settings, onChange, disabled = false }: PresetBarProps) {
  const [showCustomSlider, setShowCustomSlider] = useState(settings.preset === 'custom');

  const handleSelect = (presetKey: TargetPreset) => {
    if (presetKey === 'custom') {
      setShowCustomSlider(true);
      onChange({
        ...settings,
        preset: 'custom',
      });
      return;
    }

    setShowCustomSlider(false);
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

  const handleCustomKB = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...settings,
      preset: 'custom',
      targetMaxKB: parseInt(e.target.value, 10),
    });
  };

  const handleQuality = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...settings,
      preset: 'custom',
      quality: parseFloat(e.target.value) / 100,
    });
  };

  const presets = [
    { key: 'under-20' as const, label: 'Under 20 KB', hint: 'Signatures' },
    { key: 'under-50' as const, label: 'Under 50 KB', hint: 'Photos / Forms' },
    { key: 'under-100' as const, label: 'Under 100 KB', hint: 'Certificates' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto space-y-3">
      {/* Single-row pill buttons */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800">
        {presets.map(({ key, label, hint }) => {
          const isSelected = settings.preset === key && !showCustomSlider;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleSelect(key)}
              disabled={disabled}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1.5 sm:px-2 rounded-xl text-center transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap">
                {label}
              </span>
              <span
                className={`text-[10px] hidden sm:block ${
                  isSelected ? 'text-emerald-100' : 'text-slate-400'
                }`}
              >
                {hint}
              </span>
            </button>
          );
        })}

        {/* Custom Slider Button */}
        <button
          type="button"
          onClick={() => handleSelect('custom')}
          disabled={disabled}
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1.5 sm:px-2 rounded-xl text-center transition-all ${
            showCustomSlider
              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400/40'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <span className="text-xs sm:text-sm font-semibold tracking-tight flex items-center gap-1">
            <Sliders className="h-3 w-3" />
            <span>Custom</span>
          </span>
          <span
            className={`text-[10px] hidden sm:block ${
              showCustomSlider ? 'text-emerald-100' : 'text-slate-400'
            }`}
          >
            {settings.targetMaxKB} KB
          </span>
        </button>
      </div>

      {/* Smooth slider row when custom is selected */}
      {showCustomSlider && (
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Target Max Size:</span>
            <span className="font-mono text-emerald-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {settings.targetMaxKB} KB
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="1000"
            step="5"
            value={settings.targetMaxKB}
            onChange={handleCustomKB}
            disabled={disabled}
            className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-emerald-500"
          />

          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 pt-1">
            <span>Quality:</span>
            <span className="font-mono text-emerald-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {Math.round(settings.quality * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="1"
            value={Math.round(settings.quality * 100)}
            onChange={handleQuality}
            disabled={disabled}
            className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      )}
    </div>
  );
}
