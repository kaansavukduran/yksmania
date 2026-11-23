import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { legacyPublicImages } from "./scripts/legacy-public-assets.mjs";
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
              // Co-locate adjacent content packs to reduce simultaneous startup requests.
              // The build-cache check enforces the size limit for every group.
              name: (id) => {
                const pack = id.match(
                  /[\\/]learning[\\/]forge(\d{3})[A-Z][^\\/]*\.ts$/,
                );
                return pack ? `learning-group-${Math.floor(Number(pack[1]) / 3)}` : null;
              },
              test: /[\\/]learning[\\/]forge\d{3}[A-Z][^\\/]*\.ts$/,
              priority: 50,
            },
            // Shared learning content used by several routes. Without these
            // groups it is hoisted into the entry chunk, which then outgrows
            // the offline precache limit as content is added.
            {
              name: "learning-sources",
              test: /[\\/]src[\\/]learning[\\/][^\\/]*(?:Source\d{3}|[Ss]ourceExercises\d{3})\.ts$/,
              priority: 40,
            },
            {
              name: "learning-geometry",
              test: /[\\/]src[\\/]learning[\\/]geometry[A-Z][^\\/]*\.ts$/,
              priority: 40,
            },
            {
              name: "learning-guides",
              test: /[\\/]src[\\/]learning[\\/]guides[\\/][^\\/]*\.ts$/,
              priority: 40,
            },
            {
              name: "learning-narratives",
              test: /[\\/]src[\\/]learning[\\/]narratives[\\/][^\\/]*\.ts$/,
              priority: 40,
            },
            {
              // Subjects in the same exam share a download for solution guidance.
              name: (id) => {
                const pack = id.match(/[\\/]learning[\\/]guidance053[\\/]([a-z-]+)\.json$/);
                return pack ? `guidance-${pack[1].split("-")[0]}` : null;
              },
              test: /[\\/]src[\\/]learning[\\/]guidance053[\\/][a-z-]+\.json$/,
              priority: 45,
            },
            {
              // Reviewed display repairs grow with every proofreading wave.
              name: "display-fixes",
              test: /[\\/]src[\\/]learning[\\/]displayFixes[\\/][a-z-]+\.json$/,
              priority: 45,
            },
            {
              name: "recall-checks",
              test: /[\\/]src[\\/]learning[\\/]recallChecks[\\/][a-z-]+\.json$/,
              priority: 45,
            },
            {
              name: "osym-patterns",
              test: /[\\/]src[\\/]learning[\\/]osym[\\/][0-9a-z-]+\.json$/,
              priority: 45,
            },
            {
              name: "learning-core",
              test: /[\\/]src[\\/](?:learning|domain)[\\/][^\\/]*\.ts$/,
              priority: 10,
            },
            {
              name: "react-vendor",
              test: /[\\/]node_modules[\\/](?:react|react-dom|scheduler)[\\/]/,
              priority: 30,
            },
          ],
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      registerType: "prompt",
      includeAssets: [],
      manifest: {
        name: "ÖSYM Mania",
        short_name: "ÖSYM Mania",
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
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icon-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      injectManifest: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        dontCacheBustURLsMatching: /assets\/.*-[\w-]{8}\./,
        globPatterns: [
          "**/*.{js,mjs,css,html,svg,png,webp,woff2,wasm,bcmap,pfb,ttf}",
        ],
        globIgnores: [...legacyPublicImages],
      },
    }),
  ],
  server: { host: "127.0.0.1", port: 5173 },
});
