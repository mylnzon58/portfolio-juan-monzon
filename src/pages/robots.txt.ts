import type { APIRoute } from 'astro';
import { toAbsoluteUrl } from '@/lib/urls';

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = toAbsoluteUrl('/sitemap-index.xml', site, 'https://juan-monzon.mylnzon58.workers.dev');
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

