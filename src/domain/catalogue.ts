import { z } from "zod";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import { subjects } from "./content";
export const resourceKinds = [
  "theory",
  "questions",
  "mixed",
  "cheatsheet",
  "exam",
] as const;
export type ResourceKind = (typeof resourceKinds)[number];
const entrySchema = z.object({
  id: z.string().regex(/^[\w-]{1,128}$/),
  name: z.string().min(1).max(500),
  subjectIds: z.array(z.string()).min(1).max(15),
  kind: z.enum(resourceKinds),
  provider: z.enum(["mebi", "ogm", "osym", "aurelia", "other"]),
  bytes: z.number().int().nonnegative(),
  topicIds: z.array(z.string().max(150)).max(1000).optional(),
});
export const catalogueSchema = z.object({
  format: z.literal("yksmania-source-catalogue"),
  version: z.literal(1),
  name: z.string().min(1).max(200),
  createdAt: z.string().datetime(),
  entries: z.array(entrySchema).max(30000),
});
export type SourceEntry = z.infer<typeof entrySchema>;
export type SourceCatalogue = z.infer<typeof catalogueSchema>;
export function parseCatalogue(text: string): SourceCatalogue {
  if (text.length > 25_000_000) throw Error("CATALOGUE_TOO_LARGE");
  const c = catalogueSchema.parse(JSON.parse(text));
  const ids = new Set<string>();
  const subjectIds = new Set(subjects.map((s) => s.id));
  for (const e of c.entries) {
    if (ids.has(e.id) || e.subjectIds.some((id) => !subjectIds.has(id)))
      throw Error("INVALID_CATALOGUE_REFERENCE");
    ids.add(e.id);
  }
  return c;
}
export const normalizeName = (s: string) =>
  s.normalize("NFC").toLocaleLowerCase("tr-TR").replace(/\s+/g, " ").trim();
// Index once per batch; ambiguous basenames require explicit classification.
export function sourceIndex(catalogue: SourceCatalogue | null) {
  const index = new Map<string, SourceEntry | null>();
  for (const entry of catalogue?.entries ?? []) {
    const name = normalizeName(entry.name);
    index.set(name, index.has(name) ? null : entry);
  }
  return index;
}
export function matchSource(
  name: string,
  catalogue: SourceCatalogue | null,
  index = sourceIndex(catalogue),
): SourceEntry | undefined {
  return index.get(normalizeName(name)) ?? undefined;
}
export function visibleIn(kind: ResourceKind, mode: "theory" | "questions") {
  return mode === "theory"
    ? kind === "theory" || kind === "mixed" || kind === "cheatsheet"
    : kind !== "theory";
}
export async function hashPdf(
  file: File,
  signal?: AbortSignal,
  onProgress?: (n: number) => void,
) {
  const magic = new TextDecoder().decode(await file.slice(0, 5).arrayBuffer());
  if (magic !== "%PDF-" || file.size > 256 * 1024 * 1024)
    throw Error("INVALID_PDF");
  const hash = sha256.create();
  for (let offset = 0; offset < file.size; offset += 2 * 1024 * 1024) {
    signal?.throwIfAborted();
    hash.update(
      new Uint8Array(
        await file.slice(offset, offset + 2 * 1024 * 1024).arrayBuffer(),
      ),
    );
    onProgress?.(Math.min(file.size, offset + 2 * 1024 * 1024));
  }
  signal?.throwIfAborted();
  return bytesToHex(hash.digest());
}
