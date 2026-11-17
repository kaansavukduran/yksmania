import { describe, it, expect } from "vitest";
import {
  prime032Factors,
  prime032Sieve,
} from "../src/learning/primeSource032Model";
describe("Eratosthenes1–50 source model", () => {
  it("excludes1from both primes and composites", () => {
    expect(prime032Factors(1)).toMatchObject({
      divisors: [1],
      prime: false,
      composite: false,
    });
    expect(prime032Sieve(4).cells[0]).toMatchObject({
      eliminatedBy: undefined,
      primeProven: false,
    });
  });
  it("keeps every base itself and removes only larger multiples", () => {
    for (const [stage, p] of [
      [1, 2],
      [2, 3],
      [3, 5],
      [4, 7],
    ]) {
      const m = prime032Sieve(stage);
      expect(m.cells[p - 1].eliminatedBy).toBeUndefined();
      for (const c of m.cells.filter((c) => c.eliminatedBy === p)) {
        expect(c.n).toBeGreaterThan(p);
        expect(c.n % p).toBe(0);
      }
    }
  });
  it("proves exactly the15 known primes without double counting composites", () => {
    const m = prime032Sieve(4);
    expect(m.primes).toEqual([
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
    ]);
    expect(m.eliminated).toBe(34);
    expect(m.cells).toHaveLength(50);
    expect(m.primes.length + m.eliminated + 1).toBe(50);
    expect(prime032Sieve(1).eliminated).toBe(24);
    expect(prime032Sieve(2).eliminated).toBe(31);
    expect(prime032Sieve(3).eliminated).toBe(33);
  });
  it("doesnotmistake49forprime before7step", () => {
    expect(prime032Sieve(3).cells[48].eliminatedBy).toBeUndefined();
    expect(prime032Sieve(3).cells[48].primeProven).toBe(false);
    expect(prime032Sieve(4).cells[48].eliminatedBy).toBe(7);
    expect(prime032Factors(49).divisors).toEqual([1, 7, 49]);
  });
  it("produces actual factorrectangles and divisors for every candidate", () => {
    for (let n = 1; n <= 50; n++) {
      const f = prime032Factors(n);
      for (const [a, b] of f.pairs) {
        expect(a * b).toBe(n);
        expect(a).toBeLessThanOrEqual(Math.sqrt(n));
        expect(f.divisors).toContain(a);
        expect(f.divisors).toContain(b);
      }
      expect(f.prime).toBe(prime032Sieve(4).primes.includes(n));
    }
    expect(prime032Factors(12).pairs).toEqual([
      [1, 12],
      [2, 6],
      [3, 4],
    ]);
  });
  it("normalizes damaged persisted scalars without creating an out-of-range grid", () => {
    expect(prime032Sieve(NaN).stage).toBe(0);
    expect(prime032Sieve(40).stage).toBe(4);
    expect(prime032Factors(Infinity).n).toBe(2);
    expect(prime032Factors(-8).n).toBe(1);
  });
});
