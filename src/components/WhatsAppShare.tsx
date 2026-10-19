'use client';

import React from 'react';
import { Share2 } from 'lucide-react';

interface WhatsAppShareProps {
  customUrl?: string;
  className?: string;
  floating?: boolean;
}

export default function WhatsAppShare({
  customUrl,
  className = '',
  floating = false,
}: WhatsAppShareProps) {
  const handleShare = () => {
    const url =
      customUrl ||
      (typeof window !== 'undefined'
        ? window.location.href
        : 'https://shrinkpure.com');
    const message = `Resize signatures (<20KB) & photos (<50KB) for government exam forms with zero server uploads: ${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (floating) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-bounce-gentle">
        <button
          type="button"
          onClick={handleShare}
          className="group flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-4 py-3 text-white shadow-2xl shadow-[#25D366]/40 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
          title="Share on WhatsApp"
        >
          {/* WhatsApp SVG Icon */}
          <svg
            className="h-5 w-5 fill-white shrink-0"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.098-2.072-.511-1.841-.777-3.033-2.656-3.125-2.778-.093-.122-.736-.98-.736-1.868 0-.889.467-1.326.633-1.503.167-.178.365-.223.487-.223.122 0 .243.002.348.007.112.006.262-.043.41.314.153.366.52 1.272.566 1.365.045.093.076.202.015.324-.061.123-.092.199-.183.307-.092.107-.193.24-.275.323-.092.091-.188.191-.081.374.107.183.475.784 1.021 1.27.702.626 1.294.82 1.477.912.183.092.29.077.397-.046.107-.122.457-.533.58-.716.122-.183.244-.153.411-.092.167.061 1.057.498 1.239.589.183.091.305.137.35.213.045.076.045.441-.099.846z" />
          </svg>
          <span className="text-xs sm:text-sm font-bold tracking-tight pr-1">
            Share on WhatsApp
          </span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#25D366]/25 transition-all hover:scale-105 active:scale-95 ${className}`}
      title="Share on WhatsApp"
    >
      <Share2 className="h-3.5 w-3.5 stroke-[2.5]" />
      <span>Share on WhatsApp</span>
    </button>
  );
}

