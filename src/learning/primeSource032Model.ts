export const prime032SieveBases = [2, 3, 5, 7] as const;
export function prime032Factors(value: number) {
  const n = Number.isFinite(value)
    ? Math.max(1, Math.min(50, Math.round(value)))
    : 2;
  const divisors = Array.from({ length: n }, (_, i) => i + 1).filter(
    (d) => n % d === 0,
  );
  const pairs = divisors
    .filter((d) => d <= Math.sqrt(n))
    .map((d) => [d, n / d] as const);
  return {
    n,
    divisors,
    pairs,
    prime: n > 1 && divisors.length === 2,
    composite: n > 1 && divisors.length > 2,
  };
}
export function prime032Sieve(stage: number) {
  const step = Number.isFinite(stage)
    ? Math.max(0, Math.min(4, Math.floor(stage)))
    : 0;
  const bases = prime032SieveBases.slice(0, step);
  const cells = Array.from({ length: 50 }, (_, i) => {
    const n = i + 1;
    const eliminatedBy = bases.find((p) => n !== p && n % p === 0);
    return {
      n,
      eliminatedBy,
      primeProven: step === 4 && n > 1 && !eliminatedBy,
    };
  });
  return {
    stage: step,
    bases,
    cells,
    eliminated: cells.filter((c) => c.eliminatedBy !== undefined).length,
    primes: cells.filter((c) => c.primeProven).map((c) => c.n),
  };
}
