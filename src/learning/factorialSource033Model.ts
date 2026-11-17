// PRIVATE proposal. Exact integer mathematics; no learning-credit side effects.
function natural(value: number, max: number, name: string) {
  if (!Number.isInteger(value) || value < 0 || value > max)
    throw new RangeError(`${name}: 0…${max} tam sayı bekleniyor`);
  return value;
}
export function factorial033(value: number): bigint {
  const n = natural(value, 100, "n");
  let result = 1n;
  for (let k = 2; k <= n; k++) result *= BigInt(k);
  return result;
}
export function factorial033Product(n: number) {
  natural(n, 12, "n");
  const factors = Array.from({ length: n }, (_, i) => i + 1);
  let product = 1n;
  const stages = [
    { step: 0, factor: null as number | null, value: "1" },
    ...factors.map((factor, i) => ({
      step: i + 1,
      factor,
      value: (product *= BigInt(factor)).toString(),
    })),
  ];
  return {
    n,
    factors,
    stages,
    value: factorial033(n).toString(),
    empty: n === 0,
    even: n >= 2,
  };
}
export function factorial033Ratio(n: number, m: number) {
  natural(n, 12, "n");
  natural(m, 12, "m");
  const common = Math.min(n, m);
  const remaining = Array.from(
    { length: Math.abs(n - m) },
    (_, i) => common + 1 + i,
  );
  const value = remaining.reduce((a, v) => a * BigInt(v), 1n);
  return {
    n,
    m,
    common,
    numeratorFactors: n >= m ? remaining : [],
    denominatorFactors: n < m ? remaining : [],
    numerator: n >= m ? value.toString() : "1",
    denominator: n < m ? value.toString() : "1",
    fraction: value === 1n ? "1" : n >= m ? value.toString() : `1/${value}`,
    same: n === m,
  };
}
export function factorial033Sum(n: number, sign: 1 | -1) {
  natural(n, 11, "n");
  if (sign !== 1 && sign !== -1)
    throw new RangeError("İşlem toplam veya fark olmalı");
  const coefficient = n + 1 + sign;
  return {
    n,
    sign,
    common: n,
    coefficient,
    value: (factorial033(n) * BigInt(coefficient)).toString(),
  };
}
function prime(n: number) {
  if (!Number.isInteger(n) || n < 2) return false;
  for (let p = 2; p * p <= n; p++) if (n % p === 0) return false;
  return true;
}
export function factorial033PrimeExponent(n: number, p: number) {
  natural(n, 100, "n");
  if (!prime(p) || p > 100)
    throw new RangeError("p, 100’ü aşmayan asal olmalı");
  const rows: { power: number; copies: number; multiples: number[] }[] = [];
  for (let power = p; power <= n; power *= p)
    rows.push({
      power,
      copies: Math.floor(n / power),
      multiples: Array.from(
        { length: Math.floor(n / power) },
        (_, i) => (i + 1) * power,
      ),
    });
  return { n, p, rows, total: rows.reduce((a, row) => a + row.copies, 0) };
}
export function factorial033Budget(n: number, base: number) {
  natural(n, 100, "n");
  if (!Number.isInteger(base) || base < 2 || base > 60)
    throw new RangeError("Bölen tabanı 2…60 tam sayı olmalı");
  let rest = base;
  const factors: { prime: number; required: number }[] = [];
  for (let p = 2; p * p <= rest; p++)
    if (rest % p === 0) {
      let required = 0;
      while (rest % p === 0) {
        required++;
        rest /= p;
      }
      factors.push({ prime: p, required });
    }
  if (rest > 1) factors.push({ prime: rest, required: 1 });
  const rows = factors.map((f) => {
    const available = factorial033PrimeExponent(n, f.prime).total;
    return { ...f, available, possible: Math.floor(available / f.required) };
  });
  const maxPower = Math.min(...rows.map((r) => r.possible));
  return {
    n,
    base,
    rows,
    maxPower,
    bottlenecks: rows
      .filter((r) => r.possible === maxPower)
      .map((r) => r.prime),
    quotient: (factorial033(n) / BigInt(base) ** BigInt(maxPower)).toString(),
  };
}
export function factorial033ZeroBudget(n: number, twosRemoved: number) {
  natural(n, 100, "n");
  natural(twosRemoved, 100, "Silinen 2 sayısı");
  const twos = factorial033PrimeExponent(n, 2),
    fives = factorial033PrimeExponent(n, 5);
  const integer = twosRemoved <= twos.total;
  const remainingTwos = twos.total - twosRemoved;
  return {
    n,
    twosRemoved,
    twos,
    fives,
    integer,
    remainingTwos,
    trailingZeros: integer ? Math.min(remainingTwos, fives.total) : null,
    value: integer
      ? (factorial033(n) / 2n ** BigInt(twosRemoved)).toString()
      : null,
  };
}
export function factorial033Arrangement(
  n: number,
  condition: "free" | "firstFixed" | "firstForbidden",
) {
  natural(n, 7, "Nesne sayısı");
  if (n < 1) throw new RangeError("Sıralamada en az bir nesne seç");
  if (
    condition !== "free" &&
    condition !== "firstFixed" &&
    condition !== "firstForbidden"
  )
    throw new RangeError("Bilinmeyen koşul");
  const first =
    condition === "free" ? n : condition === "firstFixed" ? 1 : n - 1;
  const stages = [first, ...Array.from({ length: n - 1 }, (_, i) => n - 1 - i)];
  return {
    n,
    condition,
    stages,
    count: stages.reduce((a, v) => a * BigInt(v), 1n).toString(),
    total: factorial033(n).toString(),
    forbidden: factorial033(n - 1).toString(),
  };
}
