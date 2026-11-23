import { expect, it } from "vitest";
import { nthRoot015 } from "../src/learning/radicalsSource015RootModel";

it("uses one principal fourth root and two equation roots for 16", () => {
  const result = nthRoot015(4, 16);
  expect(result).toMatchObject({
    kind: "exact",
    radical: "∜16",
    equation: "x⁴ = 16",
    principal: { label: "2", coordinate: 2, bracket: null },
    solutions: [
      { label: "−2", coordinate: -2, bracket: null },
      { label: "2", coordinate: 2, bracket: null },
    ],
  });
  expect(result.solutions.at(-1)).toBe(result.principal);
});

it("preserves the negative value at odd degrees", () => {
  const third = nthRoot015(3, -27);
  expect(third).toMatchObject({
    radical: "∛(−27)",
    equation: "x³ = −27",
    principal: { label: "−3", coordinate: -3 },
  });
  expect(third.solutions).toEqual([third.principal]);
  expect(nthRoot015(5, -32).principal?.label).toBe("−2");
});

it("finds no real root for negative even powers and exactly one solution at zero", () => {
  expect(nthRoot015(4, -16)).toMatchObject({
    kind: "not-real",
    principal: null,
    solutions: [],
  });
  for (const degree of [2, 3, 4, 5]) {
    const result = nthRoot015(degree, 0);
    expect(result.solutions).toEqual([
      { label: "0", coordinate: 0, bracket: null },
    ]);
    expect(result.principal).toBe(result.solutions[0]);
  }
});

it("keeps exact radicals and separate rounded plot coordinates", () => {
  const even = nthRoot015(2, 2);
  expect(even.kind).toBe("irrational");
  expect(even.principal).toMatchObject({ label: "√2", bracket: [1, 2] });
  expect(even.solutions[0]).toMatchObject({ label: "−√2", bracket: [-2, -1] });
  expect(even.solutions[0].coordinate).toBeCloseTo(-Math.sqrt(2), 8);

  const odd = nthRoot015(3, -9);
  expect(odd.principal).toMatchObject({ label: "∛(−9)", bracket: [-3, -2] });
  expect(odd.solutions).toEqual([odd.principal]);
});

it("checks all supported input pairs against exact integer powers or open brackets", () => {
  for (const degree of [2, 3, 4, 5]) {
    for (let a = -64; a <= 64; a++) {
      const result = nthRoot015(degree, a);
      const equationCount = degree % 2 === 1 || a === 0 ? 1 : a > 0 ? 2 : 0;
      expect(result.solutions).toHaveLength(equationCount);
      if (result.kind === "not-real") continue;
      for (const { coordinate, bracket } of result.solutions) {
        if (!bracket) {
          expect(BigInt(coordinate) ** BigInt(degree)).toBe(BigInt(a));
        } else {
          const [lower, upper] = bracket;
          expect(upper - lower).toBe(1);
          expect(coordinate).toBeGreaterThan(lower);
          expect(coordinate).toBeLessThan(upper);
          const powers = [lower, upper].map((v) =>
            Number(BigInt(v) ** BigInt(degree)),
          );
          expect(a).toBeGreaterThan(Math.min(...powers));
          expect(a).toBeLessThan(Math.max(...powers));
        }
      }
    }
  }
});

it("rejects values outside this teaching panel's domain", () => {
  expect(() => nthRoot015(1, 16)).toThrow(RangeError);
  expect(() => nthRoot015(4, 65)).toThrow(RangeError);
  expect(() => nthRoot015(2, 1.5)).toThrow(RangeError);
});
