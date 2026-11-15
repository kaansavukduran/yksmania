import { describe, it, expect } from "vitest";
import {
  forge014MathLessons,
  forge014MathGuides,
  forge014MathTopics,
  chartSummary,
  lineSample,
  vennModel,
  cartesianProduct,
  cartesianModel,
  evaluateConnective,
  conditionalVariants,
  truthRows,
  quantifiedModel,
  type Connective,
} from "../src/learning/forge014Math";
it("adds exactly four new source headings with complete independent teaching", () => {
  expect(forge014MathTopics).toEqual({
    "grafik-problemleri": "detail-220",
    kumeler: "detail-222",
    "kartezyen-carpim": "detail-223",
    "mantik-onerme": "detail-224",
  });
  expect(Object.values(forge014MathTopics)).not.toContain("detail-221");
  for (const lesson of forge014MathLessons) {
    const guide = forge014MathGuides.find((g) => g.id === lesson.id)!;
    expect(guide.sections.length).toBeGreaterThanOrEqual(8);
    expect(
      guide.sections.every(
        (s) =>
          s.paragraphs.length >= 2 &&
          s.paragraphs.every((p) => p.trim().length > 100),
      ),
    ).toBe(true);
    expect(guide.examples.length).toBeGreaterThanOrEqual(4);
    expect(
      guide.examples.every((e) => e.steps.length >= 3 && e.check && e.pitfall),
    ).toBe(true);
    expect(guide.recall.length).toBeGreaterThanOrEqual(4);
    expect(lesson.questions).toHaveLength(10);
    for (const q of lesson.questions) {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.prompt.tr).not.toMatch(
        /yukarıdaki|aşağıdaki|önceki model|seçtiğin|atölyedeki/i,
      );
      expect(q.explanation.tr.length).toBeGreaterThan(100);
    }
  }
});
it("retains forty authored keys with exact count and domain arithmetic", () => {
  const keys = [
    ["108", "30", "10", "7/12", "13/12", "4;3;3", "11/6", "75", "2", "6"],
    [
      "3",
      "2",
      "31",
      "4",
      "27",
      "7",
      "{6,7,8}",
      "{1,2}",
      "19",
      "Eleman sayıları eşittir; kümeler eşit değildir.",
    ],
    [
      "6",
      "(2,4)",
      "8",
      "İkisi de ∅’dir.",
      "1",
      "4",
      "2",
      "6",
      "{1,2,3,5}",
      "3",
    ],
    [
      "9 sayısı 3’ün katıdır.",
      "1",
      "1",
      "p∧q′",
      "q′⇒p′",
      "0",
      "0",
      "∃x∈ℝ, x²<0",
      "16",
      "p, q için yeterli; q, p için gereklidir.",
    ],
  ];
  forge014MathLessons.forEach((l, i) =>
    expect(l.questions.map((q) => q.options[q.answer].tr)).toEqual(keys[i]),
  );
  expect((360 * 30) / 100).toBe(108);
  expect((150 * 72) / 360).toBe(30);
  expect((90 - 60) / (5 - 2)).toBe(10);
  expect(70 / 120).toBe(7 / 12);
  expect(65 / 60).toBe(13 / 12);
  expect((2 + 3 + 3 + 8) / 4).toBe(4);
  expect((1 * 2 + 2 * 3 + 3 * 1) / (2 + 3 + 1)).toBe(11 / 6);
  expect(((7 + 5) / (4 + 7 + 5)) * 100).toBe(75);
  expect(Math.sqrt((4 + 0 + 4) / (3 - 1))).toBe(2);
  expect((5 + 7) / 2).toBe(6);
  expect(new Set([1, 1, 2, 3]).size).toBe(3);
  expect(2 ** 5 - 1).toBe(31);
  expect(2 ** 2).toBe(4);
  expect(18 + 16 - 7).toBe(27);
  expect(40 - (22 + 19 - 8)).toBe(7);
  expect(30 - 5 - 6).toBe(19);
  expect((7 - 1) / 2 + (3 + 2)).toBe(8);
  expect(12 / 3).toBe(4);
  expect(2 ** 4).toBe(16);
  expect(
    cartesianProduct([0, 1], [1, 2]).filter(([a, b]) => a < b),
  ).toHaveLength(3);
});
describe("chart values remain separate from representation assumptions", () => {
  it("converts parts consistently and never fabricates zero-total shares", () => {
    const a = chartSummary([20, 30, 50]);
    expect(a.total).toBe(100);
    expect(a.angles).toEqual([72, 108, 180]);
    const b = chartSummary([40, 30, 50]);
    expect(b.total).toBe(120);
    expect(b.angles[2]).toBe(150);
    expect(b.shares[2]).toBe(5 / 12);
    expect(chartSummary([0, 0, 0]).angles).toEqual([null, null, null]);
    expect(chartSummary([0, 0, 8]).angles).toEqual([0, 0, 360]);
  });
  it("uses n−1 only when sample size permits and sorts before median", () => {
    expect(chartSummary([2, 4, 6]).sampleSD).toBe(2);
    expect(chartSummary([1]).sampleSD).toBeNull();
    expect(chartSummary([5, 9, 1, 7]).median).toBe(6);
    expect(chartSummary([2, 3, 3, 8]).modes).toEqual([3]);
    expect(chartSummary([2, 2, 3, 3]).modes).toEqual([2, 3]);
    expect(chartSummary([3, 8, 9]).modes).toEqual([]);
    expect(() => chartSummary([])).toThrow();
    expect(() => chartSummary([1, -2])).toThrow();
    expect(() => chartSummary([Infinity])).toThrow();
  });
  it("refuses unknown intermediate values without a linear assumption", () => {
    expect(lineSample([20, 30, 50], 0.5, false)).toBeNull();
    expect(lineSample([20, 30, 50], 1, false)).toBe(30);
    expect(lineSample([20, 30, 50], 0.5, true)).toBe(25);
    expect(lineSample([20, 30, 50], 1.5, true)).toBe(40);
    expect(() => lineSample([1, 2], 0.5, true)).toThrow();
    expect(() => lineSample([1, 2, 3], 3, true)).toThrow();
  });
});
describe("Venn counts are actual disjoint membership partitions", () => {
  it("calculates lists, four regions and all operations from element membership", () => {
    const m = vennModel(8, 15, 28, "union");
    expect(m.A).toEqual([1, 2, 3, 4]);
    expect(m.B).toEqual([3, 4, 5]);
    expect(m.result).toEqual([1, 2, 3, 4, 5]);
    expect([
      m.onlyA.length,
      m.both.length,
      m.onlyB.length,
      m.neither.length,
    ]).toEqual([2, 2, 1, 3]);
    expect(vennModel(8, 31, 28, "intersection").result).toEqual([3, 4, 5]);
    expect(vennModel(8, 15, 28, "difference").result).toEqual([1, 2]);
    expect(vennModel(8, 15, 28, "symmetric").result).toEqual([1, 2, 5]);
    expect(vennModel(8, 15, 28, "neither").result).toEqual([6, 7, 8]);
  });
  it("changes the complement with the universe, retaining empty subset cases", () => {
    expect(vennModel(8, 15, 28, "complement").result).toEqual([5, 6, 7, 8]);
    expect(vennModel(9, 15, 28, "complement").result).toEqual([5, 6, 7, 8, 9]);
    expect(vennModel(8, 0, 28, "intersection").result).toEqual([]);
    expect(vennModel(8, 0, 28, "union").subsetsA).toBe(1);
    expect(vennModel(8, 0, 28, "union").properA).toBe(0);
    expect(() => vennModel(10, 15, 28, "union")).toThrow();
    expect(() => vennModel(8, -1, 28, "union")).toThrow();
  });
});
describe("ordered products preserve empty and swapped-source distinctions", () => {
  it("returns every actual coordinate and removes duplicate source entries", () => {
    expect(cartesianProduct([1, 1, 2], [3, 4, 5])).toHaveLength(6);
    const m = cartesianModel([1, 2, 3], [3, 4, 5, 6], true);
    expect(m.size).toBe(12);
    expect(m.pairs).toContainEqual([6, 3]);
    expect(m.reverseEqual).toBe(false);
    expect(cartesianModel([1, 2], [1, 2]).reverseEqual).toBe(true);
  });
  it("does not claim unequal products when a source is empty", () => {
    expect(cartesianModel([], [1, 2])).toMatchObject({
      pairs: [],
      size: 0,
      empty: true,
      reverseEqual: true,
    });
    expect(cartesianModel([1, 2], [])).toMatchObject({
      pairs: [],
      reverseEqual: true,
    });
    expect(cartesianProduct([], [])).toEqual([]);
    expect(() => cartesianModel([Infinity], [2])).toThrow();
  });
});
describe("logic models cover connectives, transformations and quantified evidence", () => {
  it("evaluates all four rows of all five connectives", () => {
    const tables: Record<Connective, boolean[]> = {
      and: [true, false, false, false],
      or: [true, true, true, false],
      xor: [false, true, true, false],
      implies: [true, false, true, true],
      iff: [true, false, false, true],
    };
    for (const op of Object.keys(tables) as Connective[])
      expect(truthRows(op).map((r) => r.value)).toEqual(tables[op]);
    expect(evaluateConnective(false, false, "implies")).toBe(true);
  });
  it("preserves the contrapositive, separating converse and negation", () => {
    for (const p of [true, false])
      for (const q of [true, false]) {
        const m = conditionalVariants(p, q);
        expect(m.original).toBe(m.contrapositive);
        expect(m.negation).toBe(!m.original);
      }
    expect(conditionalVariants(false, true)).toMatchObject({
      original: true,
      converse: false,
      inverse: false,
      negation: false,
    });
  });
  it("returns a real in-domain counterexample and a negated quantifier result", () => {
    const m = quantifiedModel([-1, 0, 1], "squarePositive", "all");
    expect(m.value).toBe(false);
    expect(m.falseElements).toEqual([0]);
    expect(m.negatedValue).toBe(true);
    expect(m.proofKind).toBe("counterexample");
    expect(quantifiedModel([1, 2, 3], "positive", "all").value).toBe(true);
    expect(quantifiedModel([-1, 0, 1], "even", "some").trueElements).toEqual([
      0,
    ]);
  });
  it("treats an empty domain by the definitions instead of inventing a witness", () => {
    expect(quantifiedModel([], "squarePositive", "all")).toMatchObject({
      value: true,
      trueElements: [],
      falseElements: [],
      proofKind: "all-tested",
    });
    expect(quantifiedModel([], "squarePositive", "some")).toMatchObject({
      value: false,
      trueElements: [],
      falseElements: [],
      proofKind: "none-found",
    });
    expect(() => quantifiedModel([NaN], "even", "some")).toThrow();
  });
});
