import { describe, expect, it } from "vitest";
import {
  r035,
  r035Add,
  r035Div,
  r035Mul,
  r035Text,
} from "../src/learning/rationalSource035Model";
import {
  piecewiseRate027,
  piecewiseRate027Example as defaults,
} from "../src/learning/piecewiseRateSource027Model";

describe("parçalı hacim grafiğinde ortalama değişim hızı", () => {
  it("gives exact signed segment rates and a different time-weighted average", () => {
    const model = piecewiseRate027(defaults);
    expect(model).toEqual({
      points: [
        { hours: 0, liters: 8 },
        { hours: 3, liters: 29 },
        { hours: 7, liters: 17 },
      ],
      firstChange: 21,
      secondChange: -12,
      totalChange: 9,
      totalHours: 7,
      firstRate: r035(7),
      secondRate: r035(-3),
      overallRate: r035(9, 7),
      simpleMean: r035(2),
      equalDurations: false,
      equalRates: false,
    });
  });

  it("can use the simple mean with equal times or with equal slopes", () => {
    const equalTimes = piecewiseRate027({ ...defaults, secondHours: 3 });
    expect(equalTimes).toMatchObject({
      equalDurations: true,
      equalRates: false,
      overallRate: r035(3, 2),
      simpleMean: r035(3, 2),
    });
    const equalSlopes = piecewiseRate027({ ...defaults, middle: 14, end: 22 });
    expect(equalSlopes).toMatchObject({
      equalDurations: false,
      equalRates: true,
      overallRate: r035(2),
      simpleMean: r035(2),
    });
  });

  it("keeps negative and zero net changes signed and distinct from volume", () => {
    expect(piecewiseRate027({ ...defaults, end: 0 }).overallRate).toEqual(
      r035(-8, 7),
    );
    const backToStart = piecewiseRate027({ ...defaults, end: defaults.start });
    expect(backToStart.overallRate).toEqual(r035(0));
    expect(backToStart.firstRate).toEqual(r035(7));
    expect(backToStart.secondRate).toEqual(r035(-21, 4));
    expect(backToStart.simpleMean).toEqual(r035(7, 8));
  });

  it("preserves a zero segment and handles three zero measurements", () => {
    expect(piecewiseRate027({ ...defaults, start: 29 })).toMatchObject({
      firstRate: r035(0),
      secondRate: r035(-3),
      overallRate: r035(-12, 7),
    });
    expect(
      piecewiseRate027({ ...defaults, start: 0, middle: 0, end: 0 }),
    ).toMatchObject({
      totalHours: 7,
      equalRates: true,
      firstRate: r035(0),
      secondRate: r035(0),
      overallRate: r035(0),
    });
  });

  it("reproduces private source G1 and F arithmetic", () => {
    const g1 = piecewiseRate027({
      start: 20,
      middle: 32,
      end: 26,
      firstHours: 2,
      secondHours: 3,
    });
    const f = piecewiseRate027({
      start: 12,
      middle: 30,
      end: 22,
      firstHours: 3,
      secondHours: 4,
    });
    expect(
      [
        g1.firstRate,
        g1.secondRate,
        g1.overallRate,
        f.firstRate,
        f.secondRate,
        f.overallRate,
      ].map(r035Text),
    ).toEqual(["6", "-2", "6/5", "6", "-2", "10/7"]);
  });

  it("rejects negative volumes, nonintegral measurements and zero or unsafe times", () => {
    for (const invalid of [
      { start: -1 },
      { middle: 0.5 },
      { end: Infinity },
      { firstHours: 0 },
      { secondHours: -2 },
      { firstHours: Number.MAX_SAFE_INTEGER },
    ]) {
      expect(() => piecewiseRate027({ ...defaults, ...invalid })).toThrow(
        RangeError,
      );
    }
  });

  it("matches the separately weighted fraction on 8000 bounded combinations", () => {
    const measures = [0, 8, 17, 29, 40];
    const mismatches: Array<[number, number, number, number, number]> = [];
    for (const start of measures) {
      for (const middle of measures) {
        for (const end of measures) {
          for (let firstHours = 1; firstHours <= 8; firstHours++) {
            for (let secondHours = 1; secondHours <= 8; secondHours++) {
              const model = piecewiseRate027({
                start,
                middle,
                end,
                firstHours,
                secondHours,
              });
              const total = r035Add(
                r035Mul(r035(firstHours), model.firstRate),
                r035Mul(r035(secondHours), model.secondRate),
              );
              const weightedMean = r035Div(
                total,
                r035(firstHours + secondHours),
              );
              const plainMeanMatches =
                r035Text(model.simpleMean) === r035Text(model.overallRate);
              if (
                r035Text(weightedMean) !== r035Text(model.overallRate) ||
                plainMeanMatches !== (model.equalDurations || model.equalRates)
              ) {
                mismatches.push([start, middle, end, firstHours, secondHours]);
              }
            }
          }
        }
      }
    }
    expect(mismatches).toEqual([]);
  });
});
