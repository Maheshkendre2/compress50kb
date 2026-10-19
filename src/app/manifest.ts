import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Compress50KB — Free, Private Image & PDF Compressor',
    short_name: 'Compress50KB',
    description:
      'Free, private image & PDF compressor for online forms. Compress photo to 50KB, signature under 20KB with zero server uploads.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#10b981',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
    ],
  };
}
