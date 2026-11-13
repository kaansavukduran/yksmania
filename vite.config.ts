import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  base: "./",
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
        start_url: "/",
        lang: "tr",
        icons: [
          {
            src: "/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
        { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        dontCacheBustURLsMatching: /assets\/.*-[\w-]{8}\./,
        globPatterns: [
          "**/*.{js,mjs,css,html,svg,png,woff2,wasm,bcmap,pfb,ttf}",
        ],
        navigateFallback: "index.html",
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
    }),
  ],
  server: { host: "127.0.0.1", port: 5173 },
});
