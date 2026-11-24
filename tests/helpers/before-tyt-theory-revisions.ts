import { createHash } from "node:crypto";
import fixture from "../fixtures/tyt-theory-revisions.json";

const newestFirst = [...fixture].reverse();

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, item]) => [key, canonical(item)]));
}

export function theoryDigest(record: unknown): string {
  return createHash("sha256").update(JSON.stringify(canonical(record))).digest("hex");
}

// Historical snapshots keep their own expected values. Undo only exact, reviewed
// theory revisions. Any unexpected record still reaches the old comparisons.
export function beforeTytTheoryRevisions<T>(surface: string, id: string, current: T): T {
  if (!current || typeof current !== "object") return current;
  let record = current;
  for (const version of newestFirst) {
    const receipt = version.receipts.find((entry) => entry.surface === surface && entry.id === id);
    if (receipt && theoryDigest(record) === receipt.after) {
      record = { ...record, ...receipt.prior };
    }
  }
  return record;
}
