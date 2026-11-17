import { expect, it } from "vitest";
import {
  factorial033,
  factorial033Product,
  factorial033Ratio,
  factorial033PrimeExponent,
  factorial033Budget,
  factorial033ZeroBudget,
  factorial033Arrangement,
  factorial033Sum,
} from "../src/learning/factorialSource033Model";
function factorialOracle(n: number) {
  let f = 1n;
  for (let i = 1; i <= n; i++) f *= BigInt(i);
  return f;
}
it("keeps the empty product and two equal beginning values without extending the natural-number domain", () => {
  expect(factorial033(0)).toBe(1n);
  expect(factorial033(1)).toBe(1n);
  expect(factorial033Product(0)).toMatchObject({
    empty: true,
    value: "1",
    even: false,
    factors: [],
  });
  expect(factorial033Product(5).stages.map((s) => s.value)).toEqual([
    "1",
    "1",
    "2",
    "6",
    "24",
    "120",
  ]);
  for (const n of [-1, 1.5, NaN, 101])
    expect(() => factorial033(n)).toThrow(RangeError);
});
it("preserves ratio direction, actual common factors, and 0!/1! equality", () => {
  expect(factorial033Ratio(8, 6)).toMatchObject({
    common: 6,
    numeratorFactors: [7, 8],
    denominatorFactors: [],
    fraction: "56",
  });
  expect(factorial033Ratio(6, 8)).toMatchObject({
    common: 6,
    numeratorFactors: [],
    denominatorFactors: [7, 8],
    fraction: "1/56",
  });
  expect(factorial033Ratio(0, 1).fraction).toBe("1");
  expect(factorial033Ratio(7, 7).fraction).toBe("1");
});
it("counts composite powers using every prime budget, independently checked by exact integer division", () => {
  for (let n = 0; n <= 100; n++)
    for (let base = 2; base <= 60; base++) {
      let remainder = factorialOracle(n),
        k = 0;
      while (remainder % BigInt(base) === 0n) {
        remainder /= BigInt(base);
        k++;
      }
      const m = factorial033Budget(n, base);
      expect(m.maxPower, `${n}!/${base}^k`).toBe(k);
      expect(m.quotient).toBe(String(remainder));
    }
  expect(factorial033Budget(10, 12)).toMatchObject({
    maxPower: 4,
    quotient: "175",
  });
  expect(factorial033Budget(8, 6).maxPower).toBe(2);
  expect(factorial033Budget(6, 4).maxPower).toBe(2);
  expect(() => factorial033PrimeExponent(10, 4)).toThrow(RangeError);
});
it("recomputes trailing zeros after removing twos and refuses the integer rule for noninteger quotients", () => {
  for (let n = 0; n <= 100; n++)
    for (let a = 0; a <= 30; a++) {
      const f = factorialOracle(n),
        den = 2n ** BigInt(a),
        integer = f % den === 0n,
        m = factorial033ZeroBudget(n, a);
      expect(m.integer).toBe(integer);
      if (!integer) {
        expect(m.trailingZeros).toBeNull();
        expect(m.value).toBeNull();
        continue;
      }
      let r = f / den,
        zeros = 0;
      const actual = r;
      while (r % 10n === 0n) {
        zeros++;
        r /= 10n;
      }
      expect(m.trailingZeros, `${n}!/2^${a}`).toBe(zeros);
      expect(m.value).toBe(String(actual));
    }
  expect(factorial033ZeroBudget(10, 7)).toMatchObject({
    integer: true,
    trailingZeros: 1,
    value: "28350",
  });
  expect(factorial033ZeroBudget(10, 8)).toMatchObject({
    integer: true,
    trailingZeros: 0,
    value: "14175",
  });
  expect(factorial033ZeroBudget(25, 22).trailingZeros).toBe(0);
});
it("distinguishes free, fixed and forbidden first places including the one-object boundary", () => {
  expect(factorial033Arrangement(4, "free").count).toBe("24");
  expect(factorial033Arrangement(4, "firstFixed").count).toBe("6");
  expect(factorial033Arrangement(4, "firstForbidden").count).toBe("18");
  expect(factorial033Arrangement(1, "firstForbidden").count).toBe("0");
  expect(() => factorial033Arrangement(0, "free")).toThrow(RangeError);
});
it("factors the whole sum/difference and permits zero difference without claiming a zero factorial", () => {
  expect(factorial033Sum(4, 1)).toMatchObject({ coefficient: 6, value: "144" });
  expect(factorial033Sum(4, -1)).toMatchObject({ coefficient: 4, value: "96" });
  expect(factorial033Sum(0, -1)).toMatchObject({ coefficient: 0, value: "0" });
  expect(factorial033(0)).toBe(1n);
});
