/*
 * Decodes the generated outline strings (tenths of a degree) into
 * longitude/latitude rings. Rings crossing the ±180° meridian are split so a
 * flat projection never draws a line across the whole map.
 */
export type Ring = [number, number][];
const cache = new Map<string[], Ring[]>();

export function decodeRings(src: string[]): Ring[] {
  const hit = cache.get(src);
  if (hit) return hit;
  const rings: Ring[] = [];
  for (const r of src) {
    const n = r.split(" ").map(Number);
    const pts: Ring = [];
    for (let i = 0; i < n.length; i += 2) pts.push([n[i] / 10, n[i + 1] / 10]);
    const parts: Ring[] = [[pts[0]]];
    for (let i = 1; i < pts.length; i++) {
      if (Math.abs(pts[i][0] - pts[i - 1][0]) > 180) parts.push([]);
      parts[parts.length - 1].push(pts[i]);
    }
    if (parts.length > 1) {
      const last = parts.pop()!;
      parts[0] = [...last, ...parts[0]];
    }
    rings.push(...parts.filter((p) => p.length > 2));
  }
  cache.set(src, rings);
  return rings;
}
