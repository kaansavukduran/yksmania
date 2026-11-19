import { describe, expect, it } from "vitest";
import { figurePacks, sectionFigures } from "../src/learning/sectionFigures/registry";

describe("section figure registry", () => {
  it("keeps every figure of every pack (no guide or section is overwritten)", () => {
    const seen = new Set<string>();
    const duplicates: string[] = [];
    for (const pack of figurePacks)
      for (const [guide, figures] of Object.entries(pack))
        for (const title of Object.keys(figures)) {
          const key = `${guide} / ${title}`;
          if (seen.has(key)) duplicates.push(key);
          seen.add(key);
        }
    expect(duplicates).toEqual([]);
    const merged = Object.values(sectionFigures).reduce((n, f) => n + Object.keys(f).length, 0);
    expect(merged).toBe(seen.size);
  });
});
