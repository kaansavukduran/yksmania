#!/usr/bin/env bash
set -euo pipefail
repository_id=1456066977
ci_workflow_id=417497575
source_sha=${1:-}
[[ "$source_sha" =~ ^[a-f0-9]{40}$ ]] || { echo 'Pages requires an exact full source commit.' >&2; exit 1; }
main=$(gh api "repositories/$repository_id/git/ref/heads/main" --jq .object.sha)
[[ "$main" == "$source_sha" ]] || { echo "Pages source is not the current main commit: $source_sha." >&2; exit 1; }
gh api --method GET "repositories/$repository_id/actions/workflows/ci.yml/runs" -f branch=main -f event=push -f head_sha="$source_sha" -f per_page=1 |
  jq -e --arg s "$source_sha" --argjson ri "$repository_id" --argjson wi "$ci_workflow_id" '.workflow_runs[0] | select(.head_sha==$s and .workflow_id==$wi and .head_repository.id==$ri and .head_branch=="main" and .event=="push" and .status=="completed" and .conclusion=="success") | .id'
