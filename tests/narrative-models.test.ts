import { it, expect } from "vitest";
import {
  digitParts,
  centuryInfo,
  chainParts,
  density,
  motionSteps,
  euclideanDivision,
  commonNumbers,
  fallEnergy,
} from "../src/learning/narrativeCalculations";
it("decomposes every supported natural number without dropping internal zero positions", () => {
  for (let n = 0; n <= 9999; n++) {
    const parts = digitParts(n);
    expect(parts.reduce((sum, p) => sum + p.contribution, 0)).toBe(n);
    expect(parts.at(-1)?.weight).toBe(1);
  }
  expect(digitParts(407).map((p) => p.contribution)).toEqual([400, 0, 7]);
  expect(() => digitParts(-1)).toThrow();
});
it("uses non-negative Euclidean remainders even for negative dividends and rejects a zero divisor", () => {
  for (let a = -120; a <= 120; a++)
    for (let b = 1; b <= 12; b++) {
      const { quotient, remainder } = euclideanDivision(a, b);
      expect(b * quotient + remainder).toBe(a);
      expect(remainder).toBeGreaterThanOrEqual(0);
      expect(remainder).toBeLessThan(b);
    }
  expect(euclideanDivision(-13, 5)).toEqual({ quotient: -3, remainder: 2 });
  expect(() => euclideanDivision(20, 0)).toThrow();
});
it("the common division and period models satisfy both definitions and keep the first positive common instant", () => {
  for (let a = 1; a <= 48; a++)
    for (let b = 1; b <= 48; b++) {
      const m = commonNumbers(a, b);
      expect(a % m.gcd).toBe(0);
      expect(b % m.gcd).toBe(0);
      expect(m.lcm % a).toBe(0);
      expect(m.lcm % b).toBe(0);
      expect(m.gcd * m.lcm).toBe(a * b);
      expect(m.steps.at(-1)?.remainder).toBe(0);
    }
  expect(commonNumbers(12, 18)).toMatchObject({ gcd: 6, lcm: 36 });
  expect(commonNumbers(48, 1)).toMatchObject({ gcd: 1, lcm: 48 });
  expect(() => commonNumbers(0, 1)).toThrow();
});
it("the energy ledger conserves the initial total under every supported position and transfer percentage", () => {
  for (let mass = 1; mass <= 5; mass++)
    for (let h = 0; h <= 10; h++)
      for (let pct = 0; pct <= 100; pct++) {
        const m = fallEnergy(mass, 10, h, pct / 100);
        expect(m.potential + m.kinetic + m.transferred).toBeCloseTo(
          m.initial,
          10,
        );
        expect(m.kinetic).toBeGreaterThanOrEqual(0);
      }
  expect(fallEnergy(2, 10, 5, 0.2)).toMatchObject({
    initial: 200,
    potential: 100,
    kinetic: 80,
    transferred: 20,
  });
  expect(() => fallEnergy(2, 10, 11, 0)).toThrow();
  expect(() => fallEnergy(0, 10, 5, 0)).toThrow();
});
it("treats century endpoints and BCE chronological quarters correctly, without a year zero", () => {
  expect(centuryInfo(1923)).toMatchObject({
    century: 20,
    half: 1,
    quarter: 1,
    start: 1901,
    end: 2000,
  });
  expect(centuryInfo(2000)).toMatchObject({ century: 20, quarter: 4 });
  expect(centuryInfo(2001).century).toBe(21);
  expect(centuryInfo(220, true)).toMatchObject({
    century: 3,
    half: 2,
    quarter: 4,
    start: 300,
    end: 201,
  });
  expect(centuryInfo(100, true)).toMatchObject({ century: 1, quarter: 1 });
  expect(centuryInfo(1, true).quarter).toBe(4);
  expect(() => centuryInfo(0)).toThrow("NO_YEAR_ZERO");
});
it("counts bonds across separate acyclic chains and keeps every chain non-empty", () => {
  for (let total = 1; total <= 16; total++)
    for (let chains = 1; chains <= total; chains++) {
      const r = chainParts(total, chains);
      expect(r.bonds).toBe(total - chains);
      expect(r.rows).toHaveLength(chains);
      expect(r.rows.reduce((a, b) => a + b, 0)).toBe(total);
      expect(r.rows.every((v) => v > 0)).toBe(true);
    }
  expect(() => chainParts(2, 3)).toThrow();
  expect(chainParts(1, 1).bonds).toBe(0);
});
it("preserves density under proportional changes and rejects zero volume", () => {
  expect(density(200, 100)).toBe(2);
  expect(density(400, 200)).toBe(2);
  expect(density(400, 100)).toBe(4);
  expect(() => density(200, 0)).toThrow();
});
it("separates distance/speed from signed displacement/velocity, including return to origin", () => {
  expect(motionSteps(6, -6, 3, 3)).toMatchObject({
    distance: 12,
    displacement: 0,
    time: 6,
    speed: 2,
    velocity: 0,
  });
  expect(motionSteps(-6, -3, 2, 1)).toMatchObject({
    distance: 9,
    displacement: -9,
    speed: 3,
    velocity: -3,
  });
  for (let a = -5; a <= 5; a++)
    for (let b = -5; b <= 5; b++) {
      const r = motionSteps(a, b, 2, 3);
      expect(r.distance).toBeGreaterThanOrEqual(Math.abs(r.displacement));
    }
  expect(() => motionSteps(1, 2, 0, 3)).toThrow();
});
