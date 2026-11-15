import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
const appBase = process.env.YKSMANIA_BASE_PATH || "./";
export default defineConfig({
  base: appBase,
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "learning-model",
              test: /[\\/]src[\\/]domain[\\/](?:model|examModel|focusTimer)\.ts$/,
              priority: 100,
            },
            {
              // Keep each reviewed content pack below the offline cache limit.
              // The model group owns their shared runtime dependencies.
              name: (id) => {
                const pack = id.match(
                  /[\\/]learning[\\/]forge(\d{3})[A-Z][^\\/]*\.ts$/,
                );
                return pack ? `learning-${pack[1]}` : null;
              },
              test: /[\\/]learning[\\/]forge\d{3}[A-Z][^\\/]*\.ts$/,
              priority: 50,
            },
          ],
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: [],
      manifest: {
        name: "YKSMania",
        short_name: "YKSMania",
        description: "Öğren, hatırla, keşfet.",
        theme_color: "#15191f",
        background_color: "#15191f",
        display: "standalone",
        start_url: appBase,
        scope: appBase,
        lang: "tr",
        icons: [
          {
            src: "icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        dontCacheBustURLsMatching: /assets\/.*-[\w-]{8}\./,
        globPatterns: [
          "**/*.{js,mjs,css,html,svg,png,woff2,wasm,bcmap,pfb,ttf}",
        ],
        navigateFallback: `${appBase === "./" ? "" : appBase}index.html`,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
    }),
  ],
  server: { host: "127.0.0.1", port: 5173 },
});
