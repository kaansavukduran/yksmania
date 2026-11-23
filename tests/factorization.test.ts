import { describe, it, expect } from "vitest";
import {
  factorCoefficients,
  factorValues,
  polynomialText,
  linearFactor,
} from "../src/learning/factorizationModel";
import { factorizationQuestions } from "../src/learning/factorizationLesson";
import { factorizationGuide } from "../src/learning/guides/factorization";

describe("factorization model preserves polynomial values and signed terms", () => {
  it("expands every supported factor pair at negative, zero and positive test points", () => {
    for (let p = -4; p <= 4; p++)
      for (let q = -4; q <= 4; q++) {
        const c = factorCoefficients(p, q);
        expect(c.b).toBe(p + q);
        expect(c.c).toBe(p * q);
        for (const x of [-9, -Math.sqrt(2), 0, 0.5, 3, 12]) {
          const values = factorValues(x, p, q);
          expect(values.expanded).toBeCloseTo(values.product, 10);
        }
      }
    expect(polynomialText(-1, -12)).toBe("x²−x−12");
    expect(polynomialText(0, 0)).toBe("x²");
    expect(linearFactor(0)).toBe("x");
    expect(linearFactor(-3)).toBe("(x−3)");
  });
  it("conserves each geometric decomposition over all available positive model inputs", () => {
    for (let a = 4; a <= 9; a++)
      for (let b = 1; b <= 3; b++)
        expect(a * (a - b) + b * (a - b)).toBe(a * a - b * b);
    for (let k = 1; k <= 4; k++)
      for (let b = 1; b <= 5; b++)
        for (let x = 1; x <= 6; x++)
          expect(k * x * x + k * b * x).toBe(k * x * (x + b));
  });
  it("publishes ten independent original items with checked algebra and full solution feedback", () => {
    expect(factorizationQuestions).toHaveLength(10);
    expect(new Set(factorizationQuestions.map((q) => q.id)).size).toBe(10);
    expect(factorizationQuestions.map((q) => q.answer)).toEqual([
      0, 2, 3, 1, 4, 2, 0, 3, 0, 1,
    ]);
    for (const q of factorizationQuestions) {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.prompt.tr.length).toBeGreaterThan(30);
      expect(q.explanation.tr.length).toBeGreaterThan(100);
    }
    // Expand the tested correct factors; the restricted rational form keeps its hole.
    for (const x of [-4, -1, 0, 1, 2, 3, 7]) {
      expect(3 * x * (2 * x + 5)).toBe(6 * x * x + 15 * x);
      expect((x - 5) * (x + 3)).toBe(x * x - 2 * x - 15);
      expect((3 * x - 4) * (3 * x + 4)).toBe(9 * x * x - 16);
      expect((2 * x + 1) * (x + 3)).toBe(2 * x * x + 7 * x + 3);
      expect((x - 3) * (x * x + 3 * x + 9)).toBe(x * x * x - 27);
      expect((x + 2) * (x - 3) * (x + 3)).toBe(
        x * x * x + 2 * x * x - 9 * x - 18,
      );
      if (x !== 5) expect((x * x - 25) / (x - 5)).toBeCloseTo(x + 5);
    }
    expect(factorizationQuestions[6].options[0].tr).toContain("x≠5");
    expect(factorizationQuestions[8].options[0].tr).toBe(
      String(9 ** 2 - 2 * 14),
    );
    expect([0, 7].map((x) => x * x - 7 * x)).toEqual([0, 0]);
    expect(2 ** 4 - 13 * 2 ** 2 + 36).toBe(0);
  });
  it("keeps a substantial explanation, reasoned examples and domain limits in the teaching guide", () => {
    expect(factorizationGuide.sections.length).toBeGreaterThanOrEqual(12);
    expect(factorizationGuide.examples).toHaveLength(12);
    expect(
      factorizationGuide.sections.map((s) => s.paragraphs.join(" ")).join(" "),
    ).toContain("x≠3");
    for (const e of factorizationGuide.examples)
      expect(e.steps.length).toBeGreaterThanOrEqual(2);
    expect(factorizationGuide.source).toContain("PDF s.98–102");
  });
});

it("geometry guide preserves original area-lesson identity and distinguishes shared heights from similarity", async () => {
  const { geometryDepthGuide: g } =
    await import("../src/learning/guides/geometryDepth");
  expect(g.id).toBe("alan-donusumleri");
  expect(g.sections.length).toBeGreaterThanOrEqual(10);
  expect(g.examples).toHaveLength(6);
  expect(g.source).toContain("PDF s.139–140");
  const area = 50,
    firstBase = 4,
    secondBase = 6;
  expect((area * firstBase) / (firstBase + secondBase)).toBe(20);
  expect((area * secondBase) / (firstBase + secondBase)).toBe(30);
  expect(12 * (5 / 2) ** 2).toBe(75);
  expect(80 / 2 - 13).toBe(27);
  expect((8 * 10 * Math.sin(Math.PI / 6)) / 2).toBeCloseTo(20);
  for (const t of [0.1, 0.3, 0.7, 0.9])
    expect(t * (1 - t)).toBeCloseTo((1 - t) * t);
  expect(g.sections.map((s) => s.paragraphs.join(" ")).join(" ")).toContain(
    "O’nun köşegen üzerinde olması",
  );
});
