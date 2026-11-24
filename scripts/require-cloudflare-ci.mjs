import { pathToFileURL } from "node:url";

const repositoryId = 1456066977;
const workflowId = 417497575;
const productionBranch = "main";

export async function requireCloudflareCI(env = process.env, request = fetch) {
  if (env.CF_PAGES !== "1") return null;
  if (!env.CF_PAGES_BRANCH) throw Error("Cloudflare Pages did not supply the build branch.");
  if (env.CF_PAGES_BRANCH !== productionBranch) return null;

  const source = env.CF_PAGES_COMMIT_SHA;
  if (!/^[a-f0-9]{40}$/.test(source ?? "")) {
    throw Error("Cloudflare production requires the full source commit.");
  }

  const url = new URL(
    `https://api.github.com/repositories/${repositoryId}/actions/workflows/ci.yml/runs`,
  );
  url.search = new URLSearchParams({
    branch: productionBranch,
    event: "push",
    head_sha: source,
    per_page: "1",
  }).toString();
  const response = await request(url, {
    headers: {
      accept: "application/vnd.github+json",
      "user-agent": "osym-mania-cloudflare-build",
    },
    redirect: "error",
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw Error(`GitHub CI verification returned HTTP ${response.status}.`);
  const { workflow_runs: runs } = await response.json();
  const run = Array.isArray(runs) ? runs[0] : undefined;
  if (
    !Number.isSafeInteger(run?.id) ||
    run.workflow_id !== workflowId ||
    run.head_repository?.id !== repositoryId ||
    run.head_sha !== source ||
    run.head_branch !== productionBranch ||
    run.event !== "push" ||
    run.status !== "completed" ||
    run.conclusion !== "success"
  ) {
    throw Error(`Cloudflare production is waiting for the complete main CI for ${source}.`);
  }
  return run.id;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const run = await requireCloudflareCI();
    if (run) console.log(`Cloudflare production verified by GitHub Actions run ${run}.`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
