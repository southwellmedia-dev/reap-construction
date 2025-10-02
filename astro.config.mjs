// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  site: "https://www.reapconstruction.com",
  output: "static",
  adapter: vercel(),
  integrations: [react(), sitemap()],
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
});
