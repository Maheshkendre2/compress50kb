import type { MetadataRoute } from 'next';
import { ALL_LANDING_PAGES } from '@/data/landingPages';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://compress50kb.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  ALL_LANDING_PAGES.forEach((page) => {
    routes.push({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  return routes;
}

