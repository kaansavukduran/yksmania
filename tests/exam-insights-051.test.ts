import { describe, expect, it } from "vitest";
import { fatigueCurve, netCompass } from "../src/domain/examInsights";

const item = (id: string, subjectId: string, subjectName: string) => ({ id, subjectId, subjectName, answer: 0 }) as never;

describe("051 deneme analizi", () => {
  it("splits the paper into quarters and measures accuracy per quarter", () => {
    const items = Array.from({ length: 16 }, (_, i) => item(`q${i}`, "tyt-matematik", "TYT Matematik"));
    const answers = items.map((_, i) => (i < 4 ? 0 : i < 8 ? 0 : i < 12 ? 1 : null));
    const q = fatigueCurve({ items, answers } as never)!;
    expect(q.map((x) => [x.from, x.to])).toEqual([[1, 4], [5, 8], [9, 12], [13, 16]]);
    expect(q.map((x) => x.accuracy)).toEqual([1, 1, 0, 0]);
    expect(q[2].wrong).toBe(4);
    expect(q[3].blank).toBe(4);
    expect(fatigueCurve({ items: items.slice(0, 11), answers: answers.slice(0, 11) } as never)).toBeNull();
  });
  it("finds the shortest route to +5 net: wrongs first (1,25), then blanks (1)", () => {
    const items = [
      ...Array.from({ length: 3 }, (_, i) => item(`m${i}`, "tyt-matematik", "TYT Matematik")),
      ...Array.from({ length: 4 }, (_, i) => item(`t${i}`, "tyt-turkce", "TYT Türkçe")),
    ];
    // Matematik: 3 yanlış; Türkçe: 4 boş.
    const answers = [1, 1, 1, null, null, null, null];
    const c = netCompass({ items, answers } as never);
    expect(c.reached).toBe(true);
    expect(c.steps[0]).toEqual({ subject: "TYT Matematik", wrongToFix: 3, blankToFix: 0, gain: 3.75 });
    expect(c.steps[1]).toEqual({ subject: "TYT Türkçe", wrongToFix: 0, blankToFix: 2, gain: 2 });
    expect(c.questions).toBe(5);
    const full = netCompass({ items, answers: items.map(() => 0) } as never);
    expect(full.reached).toBe(false);
    expect(full.steps).toEqual([]);
  });
});
