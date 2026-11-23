export const quarticInputRange = { min: -5, max: 9 } as const;
export const quarticExample = { first: 1, second: 4 } as const;

export type QuarticRoot = {
  x: number;
  sign: -1 | 0 | 1;
  radicand: number;
  multiplicity: number;
};

export function quarticRoots028(first: number, second: number) {
  if (
    ![first, second].every(
      (value) =>
        Number.isInteger(value) &&
        value >= quarticInputRange.min &&
        value <= quarticInputRange.max,
    )
  ) {
    throw new RangeError(
      "Geçici değişkenin kökleri verilen aralıkta tam sayı olmalı.",
    );
  }

  const roots: QuarticRoot[] = [];
  const cancelled: number[] = [];
  for (const radicand of new Set([first, second])) {
    const factorCount = first === second ? 2 : 1;
    if (radicand < 0) {
      cancelled.push(radicand);
      continue;
    }
    if (radicand === 0) {
      roots.push({ x: 0, sign: 0, radicand, multiplicity: 2 * factorCount });
      continue;
    }
    const distance = Math.sqrt(radicand);
    roots.push(
      { x: -distance, sign: -1, radicand, multiplicity: factorCount },
      { x: distance, sign: 1, radicand, multiplicity: factorCount },
    );
  }
  roots.sort((a, b) => a.x - b.x);

  const valueAt = (x: number) => {
    const square = x * x;
    return (square - first) * (square - second);
  };
  const width = Math.max(
    2,
    Math.ceil(Math.sqrt(Math.max(0, first, second)) + 0.4),
  );
  const minimumPointX = Math.sqrt(Math.max(0, (first + second) / 2));
  const heights = [0, valueAt(0), valueAt(width), valueAt(minimumPointX)];
  const minimum = Math.min(...heights);
  const maximum = Math.max(...heights);
  const margin = (maximum - minimum) * 0.095;

  return {
    roots,
    cancelled,
    sum: first + second,
    product: first * second,
    criticalPositions: [-minimumPointX, 0, minimumPointX],
    axisZoom: Math.max(1, Math.min(12, Math.ceil(Math.abs(minimum)))),
    range: { width, bottom: minimum - margin, top: maximum + margin },
    valueAt,
  };
}
