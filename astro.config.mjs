import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Permite desplegar tanto en Cloudflare (base "/") como en GitHub Pages (GITHUB_PAGES=true + SITE_BASE)
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const siteUrl = process.env.SITE_URL || 'https://juan-monzon.mylnzon58.workers.dev';
const basePath = process.env.SITE_BASE || '/';

export default defineConfig({
  site: siteUrl,
  base: basePath,
  output: 'static',
  integrations: [sitemap()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  ...(isGitHubPages ? {} : { adapter: cloudflare() }),
});
