import { expect, test, vi } from "vitest";
import { requireCloudflareCI } from "../scripts/require-cloudflare-ci.mjs";

const source = "d064d643eb88a13a6ddb87042436b648d3fee72a";
const env = { CF_PAGES: "1", CF_PAGES_BRANCH: "main", CF_PAGES_COMMIT_SHA: source };
const run = {
  id: 45327443224,
  workflow_id: 417497575,
  head_repository: { id: 1456066977 },
  head_sha: source,
  head_branch: "main",
  event: "push",
  status: "completed",
  conclusion: "success",
};

test("Cloudflare production checks the latest exact main push in the intended workflow and repository", async () => {
  const request = vi.fn(async (_url: URL) => Response.json({ workflow_runs: [run] }));
  await expect(requireCloudflareCI(env, request)).resolves.toBe(run.id);
  const [url] = request.mock.calls[0];
  expect(url.origin + url.pathname).toBe("https://api.github.com/repositories/1456066977/actions/workflows/ci.yml/runs");
  expect(Object.fromEntries(url.searchParams)).toEqual({
    branch: "main", event: "push", head_sha: source, per_page: "1",
  });
});

test("other build providers and Cloudflare preview branches make no verification requests", async () => {
  const request = vi.fn();
  await expect(requireCloudflareCI({}, request)).resolves.toBeNull();
  await expect(requireCloudflareCI({ ...env, CF_PAGES_BRANCH: "forge/preview" }, request)).resolves.toBeNull();
  expect(request).not.toHaveBeenCalled();
});

test.each([
  { status: "in_progress", conclusion: null },
  { conclusion: "failure" },
  { head_sha: "b".repeat(40) },
  { head_branch: "forge/preview" },
  { head_repository: { id: 123 } },
  { event: "workflow_dispatch" },
  { workflow_id: 123 },
])("Cloudflare production stays blocked for %o", async (overrides) => {
  const request = async () => Response.json({ workflow_runs: [{ ...run, ...overrides }, run] });
  await expect(requireCloudflareCI(env, request)).rejects.toThrow(/waiting for the complete main CI/);
});

test("missing inputs, missing runs and API failures leave production blocked", async () => {
  await expect(requireCloudflareCI({ CF_PAGES: "1" })).rejects.toThrow(/build branch/);
  await expect(requireCloudflareCI({ ...env, CF_PAGES_COMMIT_SHA: "123" })).rejects.toThrow(/full source commit/);
  await expect(requireCloudflareCI(env, async () => Response.json({ workflow_runs: [] }))).rejects.toThrow(/waiting/);
  await expect(requireCloudflareCI(env, async () => new Response(null, { status: 403 }))).rejects.toThrow(/HTTP 403/);
});
