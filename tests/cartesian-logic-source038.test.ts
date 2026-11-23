import { expect, it } from "vitest";
import { productRegions030 } from "../src/learning/productDifferenceSource030Model";
import {
  divisibilityImplication031,
  type ConditionalForm031,
} from "../src/learning/divisibilityImplicationSource031Model";
import { resolveGuideStep } from "../src/learning/guides/position";
import { draftQuestionCount } from "../src/domain/studyDraft";
import type { Draft } from "../src/domain/model";

it("matches set difference and intersection at every plotted pair", () => {
  const subsets = Array.from({ length: 8 }, (_, mask) =>
    [1, 2, 3].filter((_, index) => (mask & (1 << index)) !== 0),
  );
  const product = (a: number[], b: number[]) =>
    a.flatMap((x) => b.map((y) => `${x},${y}`));
  for (const first of subsets) {
    for (const second of subsets) {
      for (const compareFirst of subsets) {
        for (const compareSecond of subsets) {
          const input = { first, second, compareFirst, compareSecond };
          const source = product(first, second);
          const comparison = new Set(product(compareFirst, compareSecond));
          const difference = productRegions030(input, "difference");
          const intersection = productRegions030(input, "intersection");
          const coordinates = ({ x, y }: { x: number; y: number }) => `${x},${y}`;
          expect(difference.selected.map(coordinates)).toEqual(source.filter((xy) => !comparison.has(xy)));
          expect(intersection.selected.map(coordinates)).toEqual(source.filter((xy) => comparison.has(xy)));
          expect(intersection.selected).toHaveLength(intersection.firstOverlap * intersection.secondOverlap);
        }
      }
    }
  }
  expect(productRegions030(
    { first: [1, 1], second: [2, 3, 3], compareFirst: [], compareSecond: [3, 3] },
    "difference",
  ).selected.map(({ x, y }) => [x, y])).toEqual([[1, 2], [1, 3]]);
});

it("matches the four truth tables and returns a genuine proof factor or counterexample", () => {
  const forms: ConditionalForm031[] = ["original", "converse", "inverse", "contrapositive"];
  for (let a = 2; a <= 8; a += 1) {
    for (let b = 2; b <= 8; b += 1) {
      for (const [index, form] of forms.entries()) {
        const model = divisibilityImplication031(a, b, form);
        if (model.validForIntegers) {
          expect(model.proofDivisor).toBe(model.requiredDivisor * model.factor!);
          expect(model.witness).toBeNull();
        } else {
          expect(model.factor).toBeNull();
          expect(model.truthAt(model.witness!)).toMatchObject({ left: true, right: false, valid: false });
        }
        for (let n = -25; n <= 25; n += 1) {
          const p = n % a === 0;
          const q = n % b === 0;
          expect(model.truthAt(n).valid).toBe([!p || q, !q || p, p || !q, q || !p][index]);
        }
      }
    }
  }
  expect(() => divisibilityImplication031(0, 4, "original")).toThrow(RangeError);
});

it("preserves both older worked-example positions and the original ten-card drafts", () => {
  for (const [id, sections, total] of [
    ["kartezyen-carpim", 8, 17], ["mantik-onerme", 10, 18],
  ] as const) {
    expect(resolveGuideStep(id, sections, 0, sections + 4)).toBe(sections + 4);
    expect(resolveGuideStep(id, sections + 1, 0, sections + 4)).toBe(sections + 5);
    const draft: Draft = {
      lessonId: id, phase: "practice", index: 9, responses: [], selected: null,
      checked: false, hint: false, confidence: "medium", note: "", startedAt: 0,
    };
    expect(draftQuestionCount(draft, total)).toBe(10);
  }
});
