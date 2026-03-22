import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
// import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ergasias.info',
  integrations: [
    tailwind(),
    mdx(),
    // sitemap(),
  ],
  output: 'static',
  build: {
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'el',
    locales: ['el'],
  },
});
