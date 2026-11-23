import { describeData } from "./forge015Math";

export function courseHistogram037(
  values: readonly number[],
  classCount: number,
) {
  if (
    !values.length ||
    values.length > 32 ||
    values.some(
      (value) => !Number.isSafeInteger(value) || Math.abs(value) > 10_000,
    )
  )
    throw new RangeError(
      "Bir ile 32 arasında, −10000 ile 10000 arasında tam sayı kullan.",
    );
  if (!Number.isInteger(classCount) || classCount < 1 || classCount > 8) {
    throw new RangeError("Sınıf sayısı 1–8 arasında tam sayı olmalı.");
  }
  const { sorted, range, n } = describeData(values);
  const start = sorted[0];
  const width = Math.floor(range! / classCount) + 1;
  const bins = Array.from({ length: classCount }, (_, index) => ({
    low: start + index * width,
    high: start + (index + 1) * width,
    count: 0,
  }));
  for (const value of sorted) {
    bins[Math.floor((value - start) / width)].count += 1;
  }
  return { start, width, bins, n };
}
