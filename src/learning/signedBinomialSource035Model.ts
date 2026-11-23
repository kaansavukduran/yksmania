export function pascalRows035(lastRow: number): bigint[][] {
  if (!Number.isInteger(lastRow) || lastRow < 0 || lastRow > 20)
    throw new RangeError("Son satır 0 ile 20 arasında bir tam sayı olmalı.");
  const rows = [[1n]];
  for (let current = 1; current <= lastRow; current += 1) {
    const previous = rows[current - 1];
    rows.push(
      Array.from(
        { length: current + 1 },
        (_, i) => (previous[i - 1] ?? 0n) + (previous[i] ?? 0n),
      ),
    );
  }
  return rows;
}

export function signedBinomial035(
  n: number,
  left: { multiplier: number; exponent: number },
  right: { multiplier: number; exponent: number },
) {
  const boundedInteger = (value: number) =>
    Number.isInteger(value) && Math.abs(value) <= 9;
  if (
    ![left.multiplier, right.multiplier, left.exponent, right.exponent].every(
      boundedInteger,
    )
  )
    throw new RangeError(
      "Çarpan ve değişken üsleri −9 ile 9 arasında tam sayı olmalı.",
    );
  const rows = pascalRows035(n);
  const terms = rows[n].map((choose, r) => {
    const powerFromLeft = n - r;
    const exponent = left.exponent * powerFromLeft + right.exponent * r;
    const multiplier =
      BigInt(left.multiplier) ** BigInt(powerFromLeft) *
      BigInt(right.multiplier) ** BigInt(r);
    return { r, choose, exponent, coefficient: choose * multiplier };
  });
  const grouped = new Map<number, bigint>();
  for (const { exponent, coefficient } of terms)
    grouped.set(exponent, (grouped.get(exponent) ?? 0n) + coefficient);
  const coefficients = [...grouped]
    .filter(([, coefficient]) => coefficient !== 0n)
    .sort(([a], [b]) => a - b)
    .map(([exponent, coefficient]) => ({ exponent, coefficient }));
  const sums = coefficients.reduce(
    (accumulator, { exponent, coefficient }) => {
      if (exponent % 2 === 0) accumulator.even += coefficient;
      else accumulator.odd += coefficient;
      return accumulator;
    },
    { even: 0n, odd: 0n },
  );
  const baseAtOne = left.multiplier + right.multiplier;
  const signAtMinusOne = (exponent: number) => (exponent % 2 === 0 ? 1 : -1);
  const baseAtMinusOne =
    left.multiplier * signAtMinusOne(left.exponent) +
    right.multiplier * signAtMinusOne(right.exponent);
  return {
    rows,
    terms,
    coefficients,
    evenSum: sums.even,
    oddSum: sums.odd,
    coefficientTotal: sums.even + sums.odd,
    alternatingTotal: sums.even - sums.odd,
    constant: grouped.get(0) ?? 0n,
    numericValueAtOneDefined: n > 0 || baseAtOne !== 0,
    numericValueAtMinusOneDefined: n > 0 || baseAtMinusOne !== 0,
    negativeExponentExcludesZero: [left, right].some(
      ({ exponent }) => exponent < 0,
    ),
  };
}
