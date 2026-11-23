import { r035, r035Compare } from "./rationalSource035Model";

const units = 1000;
const wholeTicks = 3 * units;
const phi = (1 + Math.sqrt(5)) / 2;

export const goldenSplit016Controls = {
  minimum: wholeTicks / 2 + 1,
  maximum: wholeTicks - 1,
  initial: 2 * units,
  near: 1854,
} as const;

// Source example a = φ, b = 1. The drawn share is normalized by its whole.
export const goldenSplit016Reference = {
  longShare: phi / (phi + 1),
  ratioApprox: phi,
  longLabel: "φ",
  shortLabel: "1",
  wholeLabel: "φ + 1",
  ratioLabel: "φ",
} as const;

export function goldenSplit016(longTicks: number) {
  const { minimum, maximum } = goldenSplit016Controls;
  if (
    !Number.isInteger(longTicks) ||
    longTicks < minimum ||
    longTicks > maximum
  ) {
    throw new RangeError(
      "Uzun parça kısa parçadan büyük, iki parça da pozitif olmalı.",
    );
  }
  const shortTicks = wholeTicks - longTicks;
  const longOverShort = r035(longTicks, shortTicks);
  const wholeOverLong = r035(wholeTicks, longTicks);
  return {
    long: longTicks / units,
    short: shortTicks / units,
    whole: wholeTicks / units,
    longShare: longTicks / wholeTicks,
    longOverShort,
    wholeOverLong,
    comparison: r035Compare(longOverShort, wholeOverLong),
  };
}
