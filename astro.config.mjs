// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.reapconstruction.com',
  integrations: [react(), sitemap()],
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
});
