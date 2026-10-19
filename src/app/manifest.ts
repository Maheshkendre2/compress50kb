import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ShrinkPure — Pure Client-Side Image & PDF Compressor',
    short_name: 'ShrinkPure',
    description:
      'Fast, 100% private in-browser image and PDF compression. Under 20KB, 50KB, 100KB presets and Indian exam specifications. Zero server uploads.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#4f46e5',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
    ],
  };
}

