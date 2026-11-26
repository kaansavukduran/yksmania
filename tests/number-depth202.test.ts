import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import {
  factorialBig202, factorialExamples202, factorialZeroRows202, parityExamples202, parityRows202,
  primeDecades202, primeExamples202, primesUpTo202,
} from "../src/learning/numberDepth202";

const isPrime = (n: number) => n > 1 && Array.from({ length: Math.floor(Math.sqrt(n)) - 1 }, (_, i) => i + 2).every((d) => n % d !== 0);

describe("number depth 0.202.0", () => {
  it("appends a table section and two examples without touching the accepted guide", () => {
    for (const [id, added] of [
      ["tek-cift-isaret", parityExamples202],
      ["asal-sayilar", primeExamples202],
      ["faktoriyel", factorialExamples202],
    ] as const) {
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections).toHaveLength(raw.sections.length + 1);
      expect(shown.sections.at(-1)!.table?.layout).toBe("table");
      expect(shown.examples.slice(-2)).toEqual(added);
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(raw.examples);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.sections.at(-1)!.table).toBe(shown.sections.at(-1)!.table);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(added.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(added.map(({ pitfall }) => pitfall));
    }
  });

  it("derives every table row by direct computation", () => {
    for (const { n, parity, unitPower, square, consecutive } of parityRows202()) {
      expect(parity).toBe(Math.abs(n) % 2 ? "tek" : "çift");
      expect(unitPower).toBe((-1) ** n);
      expect(square).toBe(n * n);
      expect(consecutive % 2).toBe(0);
    }
    expect(primesUpTo202(50)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1).filter(isPrime));
    expect(primeDecades202().map(({ primes }) => primes.length)).toEqual([4, 4, 2, 2, 3]);
    for (const { n, zeros, twos } of factorialZeroRows202()) {
      const digits = factorialBig202(n).toString();
      expect(digits.length - digits.replace(/0+$/, "").length).toBe(zeros);
      let value = factorialBig202(n);
      let count = 0;
      while (value % 2n === 0n) { value /= 2n; count += 1; }
      expect(count).toBe(twos);
      expect(twos).toBeGreaterThan(zeros);
    }
  });

  it("checks every new example answer", () => {
    for (let a = -9; a <= 9; a += 2) for (let b = -8; b <= 8; b += 2) expect(Math.abs(a * a + a * b + b * b) % 2).toBe(1);
    for (const x of [-5, -1, -0.25]) for (const y of [0.5, 1, 7]) {
      expect(x ** 3 * y).toBeLessThan(0);
      expect(x - y).toBeLessThan(0);
      expect(y * y - x).toBeGreaterThan(0);
    }
    const digitSumTen = Array.from({ length: 90 }, (_, i) => i + 10).filter((n) => Math.floor(n / 10) + (n % 10) === 10);
    expect(digitSumTen.filter(isPrime)).toEqual([19, 37, 73]);
    expect(Array.from({ length: 1000 }, (_, p) => p).filter((p) => isPrime(p) && isPrime(p + 2) && isPrime(p + 4))).toEqual([3]);
    expect(Array.from({ length: 20 }, (_, n) => n + 2).filter((n) => factorialBig202(n) / factorialBig202(n - 2) === 56n)).toEqual([8]);
    const sum = Array.from({ length: 10 }, (_, i) => factorialBig202(i + 1)).reduce((a, b) => a + b, 0n);
    expect(sum).toBe(4037913n);
    expect(factorialBig202(8) / factorialBig202(6)).toBe(56n);
  });
});
