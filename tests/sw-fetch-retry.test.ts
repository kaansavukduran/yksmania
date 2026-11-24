import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";

const script = readFileSync(new URL("../public/sw-fetch-retry.js", import.meta.url), "utf8");

function workerFetch(statuses: number[]) {
  const sourceFetch = vi.fn<typeof fetch>();
  for (const status of statuses) sourceFetch.mockResolvedValueOnce(new Response(null, { status }));
  const scope: { fetch: typeof fetch } = { fetch: sourceFetch };
  const delays: number[] = [];
  runInNewContext(script, {
    self: scope,
    Request,
    setTimeout: (callback: () => void, delay: number) => {
      delays.push(delay);
      queueMicrotask(callback);
    },
  });
  return { scope, delays, sourceFetch };
}

describe("service worker precache fetch retry", () => {
  it("retries a temporary HTTP 500 and keeps the successful response", async () => {
    const { scope, delays, sourceFetch } = workerFetch([500, 200]);
    expect((await scope.fetch("https://example.test/assets/class.css")).status).toBe(200);
    expect(sourceFetch).toHaveBeenCalledTimes(2);
    expect(delays).toEqual([400]);
  });

  it("returns a persistent HTTP 500 after the existing bounded attempts", async () => {
    const { scope, delays, sourceFetch } = workerFetch([500, 500, 500, 500]);
    expect((await scope.fetch("https://example.test/assets/class.css")).status).toBe(500);
    expect(sourceFetch).toHaveBeenCalledTimes(4);
    expect(delays).toEqual([400, 800, 1600]);
  });

  it("passes a missing required asset through without retrying", async () => {
    const { scope, delays, sourceFetch } = workerFetch([404]);
    expect((await scope.fetch("https://example.test/assets/missing.js")).status).toBe(404);
    expect(sourceFetch).toHaveBeenCalledOnce();
    expect(delays).toEqual([]);
  });
});
