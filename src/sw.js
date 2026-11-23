import { clientsClaim } from "workbox-core";
import { cleanupOutdatedCaches, PrecacheController, PrecacheRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

importScripts("sw-fetch-retry.js");

const entries = self.__WB_MANIFEST;
const controller = new PrecacheController();
controller.addToCacheList(entries);
const reloadURLs = new Set(
  entries.filter((entry) => entry.revision)
    .map(({ url }) => new URL(url, self.location.href).href),
);
const INSTALL_CONCURRENCY = 4;

self.addEventListener("install", (event) => {
  event.waitUntil(installAll(event));
});

async function installAll(event) {
  // Retain Workbox's cache keys and strategy. Await the complete manifest
  // before activation and bound concurrency to avoid flooding the host.
  const jobs = controller.getURLsToCacheKeys().entries();
  const workers = Array.from({ length: INSTALL_CONCURRENCY }, async () => {
    for (const [url, cacheKey] of jobs) {
      const request = new Request(url, {
        integrity: controller.getIntegrityForCacheKey(cacheKey),
        cache: reloadURLs.has(url) ? "reload" : "default",
        credentials: "same-origin",
      });
      await Promise.all(controller.strategy.handleAll({ request, event, params: { cacheKey } }));
    }
  });
  const results = await Promise.allSettled(workers);
  const failed = results.find(({ status }) => status === "rejected");
  if (failed) throw failed.reason;
}

self.addEventListener("activate", (event) => controller.activate(event));
cleanupOutdatedCaches();
clientsClaim();

registerRoute(new PrecacheRoute(controller));
registerRoute(new NavigationRoute(controller.createHandlerBoundToURL("index.html")));

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") event.waitUntil(self.skipWaiting());
});
