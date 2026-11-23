import { beforeScientificQuestions } from "./helpers/before-scientific-revision";
import { describe, expect, it } from "vitest";
import {
  absoluteMembership,
  forge093MathGuides,
  forge093MathLessons,
  forge093MathTopics,
  integerPower,
  normalizeScientific,
  proportionValue,
  simplifySquareRoot,
} from "../src/learning/forge093Math";

it("maps every native math lesson to its detailed topic in the shared studyPlan direction", () => {
  expect(forge093MathTopics).toEqual({
    "mutlak-deger": "detail-205",
    "uslu-sayilar": "detail-206",
    "bilimsel-gosterim-katsayi": "detail-207",
    "koklu-sayilar": "detail-208",
    "oran-oranti": "detail-209",
  });
  expect(forge093MathLessons.map((l) => forge093MathTopics[l.id])).toEqual([
    "detail-205",
    "detail-206",
    "detail-207",
    "detail-208",
    "detail-209",
  ]);
  expect(
    forge093MathLessons.every((l) => l.tags.includes(forge093MathTopics[l.id])),
  ).toBe(true);
});

it("delivers five complete native guides and fifty independent original questions", () => {
  expect(forge093MathGuides).toHaveLength(5);
  expect(forge093MathLessons).toHaveLength(5);
  for (const lesson of forge093MathLessons) {
    const guide = forge093MathGuides.find((g) => g.id === lesson.id)!;
    expect(guide.sections.length).toBeGreaterThanOrEqual(8);
    expect(
      guide.sections.every(
        (s) =>
          s.paragraphs.length >= 2 && s.paragraphs.every((p) => p.length > 150),
      ),
    ).toBe(true);
    expect(guide.examples.length).toBeGreaterThanOrEqual(4);
    expect(
      guide.examples.every(
        (e) => e.steps.length >= 3 && e.answer && e.check && e.pitfall,
      ),
    ).toBe(true);
    expect(guide.recall.length).toBeGreaterThanOrEqual(4);
    const acceptedQuestions = beforeScientificQuestions(lesson.questions);
    expect(acceptedQuestions).toHaveLength(10);
    expect(lesson.body).toHaveLength(guide.sections.length);
    acceptedQuestions.forEach((q) => {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.explanation.tr.length).toBeGreaterThan(70);
      expect(q.explanation.tr).toContain("Dikkat:");
      expect(q.hint.tr.length).toBeGreaterThan(10);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(5);
      expect(q.prompt.tr).not.toMatch(
        /yukarıdaki metin|aşağıdaki şekil|önceki sorudaki|seçtiğin modele göre/i,
      );
    });
  }
  const ids = forge093MathLessons.flatMap((l) => l.questions.map((q) => q.id));
  expect(ids).toHaveLength(57);
  expect(new Set(ids).size).toBe(57);
});

describe("absolute distance and boundary membership", () => {
  it("distinguishes inside, outside, equality and closed endpoints", () => {
    expect(absoluteMembership(-2, 2, 4, "closed")).toEqual({
      distance: 4,
      member: true,
    });
    expect(absoluteMembership(-2, 2, 4, "inside").member).toBe(false);
    expect(absoluteMembership(-2, 2, 4, "outside").member).toBe(false);
    expect(absoluteMembership(-2, 2, 4, "equal").member).toBe(true);
    expect(absoluteMembership(-3, 2, 4, "outside")).toEqual({
      distance: 5,
      member: true,
    });
    expect(absoluteMembership(2, 2, 0, "closed").member).toBe(true);
    expect(absoluteMembership(2, 2, 0, "inside").member).toBe(false);
  });
  it("independently verifies all branches of the variable and nested worked equations", () => {
    expect(Math.abs(1 / 3 - 2)).toBeCloseTo(2 / 3 + 1);
    expect(Math.abs(-3 - 2)).not.toBe(2 * -3 + 1);
    const solutions = Array.from({ length: 25 }, (_, i) => i - 12).filter(
      (x) => Math.abs(Math.abs(x - 1) - 3) === 2,
    );
    expect(solutions).toEqual([-4, 0, 2, 6]);
    for (const x of [-2, 0, 4])
      expect(Math.abs(x + 2) + Math.abs(x - 4)).toBe(6);
    expect(Math.abs(5 + 2) + Math.abs(5 - 4)).toBe(8);
  });
});

describe("integer powers and parsing scope", () => {
  it("preserves parentheses, parity, reciprocal and zero-domain distinctions", () => {
    expect(integerPower(-2, 4, true)).toBe(16);
    expect(integerPower(-2, 4, false)).toBe(-16);
    expect(integerPower(-2, -2, true)).toBe(0.25);
    expect(integerPower(-2, -2, false)).toBe(-0.25);
    expect(integerPower(-2, -3, true)).toBe(-0.125);
    expect(integerPower(0, 4, true)).toBe(0);
    expect(integerPower(0, 0, true)).toBeNull();
    expect(integerPower(0, -1, false)).toBeNull();
    expect(integerPower(-3, 0, true)).toBe(1);
    expect(integerPower(-3, 0, false)).toBe(-1);
    expect(integerPower(-2, 0.5, true)).toBeNull();
  });
  it("checks common-base arithmetic, addition and the worked exponential equation", () => {
    expect((2 ** 5 * 8 ** -1) / 4 ** -1).toBe(16);
    expect(2 ** 4 + 2 ** 6 + 2 ** 7).toBe(208);
    expect(4 ** (5 + 1)).toBe(8 ** (5 - 1));
    expect(0.5 ** 4).toBeLessThan(0.5 ** 3);
    expect(8 ** 4 / 4 ** 5).toBe(4);
  });
});

describe("scientific normalization and conserved value", () => {
  it("changes coefficient and exponent in opposite directions without changing the value", () => {
    const normalized = normalizeScientific(84, -5)!;
    expect(normalized.coefficient).toBeCloseTo(8.4);
    expect(normalized.exponent).toBe(-4);
    expect(normalized.value).toBeCloseTo(0.00084, 12);
    for (let shift = -4; shift <= 4; shift++) {
      const c = 84 / 10 ** shift;
      const e = -5 + shift;
      expect(c * 10 ** e).toBeCloseTo(normalized.value, 12);
    }
    expect(normalizeScientific(0.072, 6)!.coefficient).toBeCloseTo(7.2);
    expect(normalizeScientific(0.072, 6)!.exponent).toBe(4);
    expect(normalizeScientific(-32, -3)!.coefficient).toBeCloseTo(-3.2);
    expect(normalizeScientific(-32, -3)!.exponent).toBe(-2);
    expect(normalizeScientific(0, 3)).toBeNull();
    expect(normalizeScientific(Number.NaN, 3)).toBeNull();
  });
  it("independently checks unit conversion, sums and comparison signs", () => {
    expect(0.000072).toBeCloseTo(7.2 * 10 ** -5, 12);
    expect(6 * 10 ** -3 * (4 * 10 ** 5)).toBe(2400);
    expect(3.2 * 10 ** 5 + 7 * 10 ** 4).toBe(390000);
    expect((8.4 * 10 ** 7) / (2.1 * 10 ** 3)).toBe(40000);
    expect((3.2 * 10 ** 6) / 1000).toBe(3200);
    expect(-8 * 10 ** 4).toBeLessThan(-2 * 10 ** 3);
  });
});

describe("principal square roots and admissible domain", () => {
  it("factors squares without losing the nonnegative principal value", () => {
    expect(simplifySquareRoot(72)).toEqual({
      outside: 6,
      inside: 2,
      value: Math.sqrt(72),
    });
    expect(simplifySquareRoot(0)).toEqual({ outside: 0, inside: 1, value: 0 });
    expect(simplifySquareRoot(49)).toEqual({ outside: 7, inside: 1, value: 7 });
    expect(simplifySquareRoot(-4)).toBeNull();
    for (let x = -10; x <= 10; x++)
      expect(simplifySquareRoot(x * x)!.value).toBe(Math.abs(x));
  });
  it("checks rationalization and rejects the extraneous squared-equation root", () => {
    expect(3 / (Math.sqrt(7) - 2)).toBeCloseTo(Math.sqrt(7) + 2, 12);
    expect(Math.sqrt(2 * 3 + 3)).toBe(3);
    expect(Math.sqrt(2 * -1 + 3)).not.toBe(-1);
    expect(5 * Math.sqrt(12) - 2 * Math.sqrt(27)).toBeCloseTo(
      4 * Math.sqrt(3),
      12,
    );
    expect(Math.sqrt(7 + 4 * Math.sqrt(3))).toBeCloseTo(2 + Math.sqrt(3), 12);
    expect(Math.cbrt(-8) + Math.sqrt(16)).toBe(2);
  });
});

describe("conditional proportionality", () => {
  it("preserves the correct invariant and rejects a fixed-fee false positive", () => {
    expect(proportionValue("direct", 3, 6, 6)).toBe(18);
    expect(proportionValue("direct", 6, 6, 6)).toBe(36);
    expect(proportionValue("inverse", 3, 6, 6)).toBe(2);
    expect(proportionValue("inverse", 6, 6, 6)).toBe(1);
    expect(proportionValue("inverse", 0, 6, 6)).toBeNull();
    expect(proportionValue("affine", 3, 6, 6)).toBe(24);
    expect(proportionValue("affine", 6, 6, 6)).toBe(42);
    expect(24 / 3).not.toBe(42 / 6);
    expect(24 * 3).not.toBe(42 * 6);
  });
  it("independently checks inverse sharing, compound ratios and scale units", () => {
    const shares = [96, 72, 48];
    expect(shares.reduce((a, b) => a + b, 0)).toBe(216);
    expect(shares.map((p, i) => p * [3, 4, 6][i])).toEqual([288, 288, 288]);
    expect(8 / 14).toBe(4 / 7);
    expect(14 / 15).toBe(14 / 15);
    expect((7.2 * 25000) / 100000).toBe(1.8);
    expect((12 / 2 ** 2) * 3 ** 2).toBe(27);
  });
});
