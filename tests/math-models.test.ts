import { describe, it, expect } from "vitest";
import {
  arithmeticResult,
  factorial,
  numberKind,
  primeCandidates,
  primeEvidence,
  primeFactors,
  sequence,
} from "../src/learning/mathModels";
import { studyTopics, topicLessons } from "../src/domain/studyPlan";
describe("source-ordered mathematics and model boundaries", () => {
  it("binds the next five first-study headings to authored lessons without changing source order", () => {
    const ids = [
      "temel-kavramlar",
      "tek-cift-isaret",
      "ardisik-sayilar",
      "asal-sayilar",
      "faktoriyel",
    ];
    expect(
      studyTopics.slice(5, 10).map((v) => topicLessons(v.id)[0]?.id),
    ).toEqual(ids);
  });
  it("separates parity, sign, fractional division and undefined zero division", () => {
    expect(numberKind(-8)).toEqual({ sign: "Negatif", parity: "Çift" });
    expect(numberKind(0)).toEqual({
      sign: "Ne pozitif ne negatif",
      parity: "Çift",
    });
    expect(numberKind(arithmeticResult(-1, 2, "division"))).toEqual({
      sign: "Negatif",
      parity: "Tam sayı değil; tek/çift değil",
    });
    expect(arithmeticResult(0, 0, "division")).toBeNull();
    expect(arithmeticResult(5, 0, "product")).toBe(0);
    expect(numberKind(arithmeticResult(6, 2, "division")).parity).toBe("Tek");
  });
  it("counts both endpoints and derives sums for negative, singleton and even-count sequences", () => {
    for (let start = -6; start <= 6; start++)
      for (let count = 1; count <= 8; count++)
        for (let step = 1; step <= 3; step++) {
          const s = sequence(start, count, step);
          expect(s.terms.reduce((a, b) => a + b, 0)).toBe(s.sum);
          expect(s.last).toBe(start + (count - 1) * step);
        }
    expect(sequence(3, 4, 1).mean).toBe(4.5);
    expect(sequence(3, 4, 1).terms).not.toContain(4.5);
  });
  it("includes square-root equality and requires all necessary trials before declaring a prime", () => {
    expect(primeCandidates(49)).toEqual([2, 3, 5, 7]);
    expect(primeEvidence(49, [2, 3, 5])).toBe("bekliyor");
    expect(primeEvidence(49, [7])).toBe("bilesik");
    expect(primeEvidence(47, [2, 3, 5])).toBe("asal");
    expect(primeEvidence(47, [2, 3])).toBe("bekliyor");
    expect(primeEvidence(1, [])).toBe("ne-asal-ne-bilesik");
    expect(primeEvidence(2, [])).toBe("asal");
    expect(primeFactors(84)).toEqual([2, 2, 3, 7]);
    expect(primeFactors(1)).toEqual([]);
  });
  it("preserves the empty-product exception and safe factorial domain", () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
    expect(factorial(4)).toBe(24);
    expect(factorial(9) / factorial(7)).toBe(72);
    expect((factorial(7) + factorial(6)) / factorial(6)).toBe(8);
    for (const n of [-1, 2.5, 19, NaN])
      expect(() => factorial(n)).toThrow("FACTORIAL_DOMAIN");
  });
});
