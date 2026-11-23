import {
  r035,
  r035Compare,
  r035Div,
  type R035,
} from "./rationalSource035Model";

export type SpeedDay026 = {
  distance: number;
  minHours: number;
  maxHours: number;
};

type OpenInterval = { lower: R035; upper: R035 };

export const sharedSpeed026Example = {
  distanceA: 70,
  distanceB: 84,
  lowerA: 5,
  upperA: 7,
  lowerB: 5,
  upperB: 7,
  trial: 13,
};

export function speedForOpenTime026(day: SpeedDay026): OpenInterval {
  const { distance, minHours, maxHours } = day;
  if (
    ![distance, minHours, maxHours].every(
      (value) => Number.isSafeInteger(value) && value > 0,
    ) ||
    minHours >= maxHours
  ) {
    throw new RangeError(
      "Yol pozitif, süre sınırları pozitif ve artan olmalı.",
    );
  }
  return { lower: r035(distance, maxHours), upper: r035(distance, minHours) };
}

export function sharedSpeed026(first: SpeedDay026, second: SpeedDay026) {
  const a = speedForOpenTime026(first);
  const b = speedForOpenTime026(second);
  const lower = r035Compare(a.lower, b.lower) >= 0 ? a.lower : b.lower;
  const upper = r035Compare(a.upper, b.upper) <= 0 ? a.upper : b.upper;
  const order = r035Compare(lower, upper);
  const firstInteger = lower.n / lower.d + 1n;
  const lastInteger = (upper.n - 1n) / upper.d;
  return {
    a,
    b,
    lower,
    upper,
    kind:
      order < 0
        ? ("open" as const)
        : order === 0
          ? ("touch" as const)
          : ("disjoint" as const),
    integers:
      order < 0 && firstInteger <= lastInteger
        ? { first: firstInteger, last: lastInteger }
        : null,
  };
}

export function testSpeedDay026(day: SpeedDay026, speed: R035) {
  const interval = speedForOpenTime026(day);
  if (r035Compare(speed, r035(0)) <= 0) {
    throw new RangeError("Denenen sürat pozitif olmalı.");
  }
  return {
    hours: r035Div(r035(day.distance), speed),
    fits:
      r035Compare(interval.lower, speed) < 0 &&
      r035Compare(speed, interval.upper) < 0,
  };
}
