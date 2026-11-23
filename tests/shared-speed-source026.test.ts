import { describe, expect, it } from "vitest";
import { r035, r035Text } from "../src/learning/rationalSource035Model";
import {
  sharedSpeed026,
  speedForOpenTime026,
  testSpeedDay026,
  type SpeedDay026,
} from "../src/learning/sharedSpeedSource026Model";

const [a, b] = [70, 84].map((distance) => ({
  distance,
  minHours: 5,
  maxHours: 7,
}));

describe("iki ayrı açık süre koşulundan ortak sürat", () => {
  it("uses opposite time endpoints and excludes both bounds for each day", () => {
    expect(speedForOpenTime026(a)).toEqual({
      lower: r035(10),
      upper: r035(14),
    });
    expect(speedForOpenTime026(b)).toEqual({
      lower: r035(12),
      upper: r035(84, 5),
    });
    expect(testSpeedDay026(a, r035(10))).toEqual({
      hours: r035(7),
      fits: false,
    });
    expect(testSpeedDay026(a, r035(14))).toEqual({
      hours: r035(5),
      fits: false,
    });
    expect(testSpeedDay026(b, r035(12))).toEqual({
      hours: r035(7),
      fits: false,
    });
    expect(testSpeedDay026(b, r035(84, 5))).toEqual({
      hours: r035(5),
      fits: false,
    });
  });

  it("takes the exact shared range and derives 13 as its only integer", () => {
    expect(sharedSpeed026(a, b)).toMatchObject({
      kind: "open",
      lower: r035(12),
      upper: r035(14),
      integers: { first: 13n, last: 13n },
    });
    expect(testSpeedDay026(a, r035(13))).toEqual({
      hours: r035(70, 13),
      fits: true,
    });
    expect(testSpeedDay026(b, r035(13))).toEqual({
      hours: r035(84, 13),
      fits: true,
    });
  });

  it("keeps touching and separated intervals empty", () => {
    const touching = { ...b, distance: 98 };
    expect(sharedSpeed026(a, touching)).toMatchObject({
      kind: "touch",
      lower: r035(14),
      upper: r035(14),
      integers: null,
    });
    expect(testSpeedDay026(touching, r035(14))).toEqual({
      hours: r035(7),
      fits: false,
    });
    expect(sharedSpeed026(a, { ...b, distance: 99 })).toMatchObject({
      kind: "disjoint",
      lower: r035(99, 7),
      upper: r035(14),
      integers: null,
    });
  });

  it("covers unequal time bounds and non-empty intervals with no integer", () => {
    const narrow = { distance: 20, minHours: 7, maxHours: 8 };
    expect(sharedSpeed026(narrow, { ...narrow, minHours: 6 })).toMatchObject({
      kind: "open",
      lower: r035(5, 2),
      upper: r035(20, 7),
      integers: null,
    });
    expect(testSpeedDay026(narrow, r035(8, 3))).toEqual({
      hours: r035(15, 2),
      fits: true,
    });
  });

  it("reproduces verified official math privately with exact, excluded bounds", () => {
    const [officialA, officialB] = [88, 108].map((distance) => ({
      distance,
      minHours: 6,
      maxHours: 8,
    }));
    const result = sharedSpeed026(officialA, officialB);
    expect([r035Text(result.lower), r035Text(result.upper)]).toEqual([
      "27/2",
      "44/3",
    ]);
    expect(result.integers).toEqual({ first: 14n, last: 14n });
  });

  it("rejects nonpositive, reversed, or nonintegral input quantities", () => {
    for (const day of [
      { ...a, distance: 0 },
      { ...a, minHours: 0 },
      { ...a, maxHours: 5 },
      { ...a, maxHours: 4 },
      { ...a, distance: 1.5 },
      { ...a, distance: Infinity },
    ]) {
      expect(() => speedForOpenTime026(day)).toThrow(RangeError);
    }
    expect(() => testSpeedDay026(a, r035(0))).toThrow(RangeError);
  });

  it("matches the original time inequalities on 400 pairs and every tested speed", () => {
    const days = [20, 70, 84, 140].flatMap((distance) =>
      [
        [1, 2],
        [1, 12],
        [5, 7],
        [7, 8],
        [11, 12],
      ].map(([minHours, maxHours]) => ({
        distance,
        minHours,
        maxHours,
      })),
    );
    const fits = (
      { distance, minHours, maxHours }: SpeedDay026,
      speed: number,
    ) => minHours * speed < distance && distance < maxHours * speed;
    const failures: Array<[SpeedDay026, SpeedDay026, number]> = [];
    for (const first of days) {
      for (const second of days) {
        const model = sharedSpeed026(first, second);
        for (let speed = 1; speed <= 140; speed++) {
          const validTime = fits(first, speed) && fits(second, speed);
          const inIntegerRange =
            model.integers !== null &&
            model.integers.first <= BigInt(speed) &&
            BigInt(speed) <= model.integers.last;
          if (validTime !== inIntegerRange)
            failures.push([first, second, speed]);
        }
      }
    }
    expect(failures).toEqual([]);
  });
});
