// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lcerretani1507-droid.github.io',
  base: '/bblivia',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en', 'de'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
