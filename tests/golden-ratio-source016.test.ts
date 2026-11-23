import { expect, it } from "vitest";
import { r035, r035Text } from "../src/learning/rationalSource035Model";
import {
  goldenSplit016,
  goldenSplit016Controls,
  goldenSplit016Reference,
} from "../src/learning/goldenRatioSource016Model";
import {
  power039Fraction,
  power039Growth,
} from "../src/learning/powersSource039Model";

const { minimum, maximum, initial, near } = goldenSplit016Controls;
const number = (fraction: ReturnType<typeof r035>) =>
  Number(fraction.n) / Number(fraction.d);

it("checks the exact source comparison a = 2, b = 1", () => {
  const split = goldenSplit016(initial);
  expect(split).toMatchObject({
    long: 2,
    short: 1,
    whole: 3,
    comparison: 1,
    longShare: 2 / 3,
  });
  expect(r035Text(split.longOverShort)).toBe("2");
  expect(r035Text(split.wholeOverLong)).toBe("3/2");
});

it("separates identical rounded values from unequal fractions on both sides of the reference", () => {
  const split = goldenSplit016(near);
  expect(r035Text(split.longOverShort)).toBe("309/191");
  expect(r035Text(split.wholeOverLong)).toBe("500/309");
  expect(split.comparison).toBe(-1);
  expect(goldenSplit016(near + 1).comparison).toBe(1);
  expect(number(split.longOverShort).toFixed(3)).toBe("1.618");
  expect(number(split.wholeOverLong).toFixed(3)).toBe("1.618");
  expect(split.longShare).toBeLessThan(goldenSplit016Reference.longShare);
  expect(goldenSplit016(near + 1).longShare).toBeGreaterThan(
    goldenSplit016Reference.longShare,
  );
});

it("gives the source reference exact symbolic labels and normalizes the geometry", () => {
  const reference = goldenSplit016Reference;
  expect(reference).toMatchObject({
    longLabel: "φ",
    shortLabel: "1",
    wholeLabel: "φ + 1",
    ratioLabel: "φ",
  });
  expect(reference.longShare / (1 - reference.longShare)).toBeCloseTo(
    reference.ratioApprox,
    12,
  );
  expect(1 / reference.longShare).toBeCloseTo(reference.ratioApprox, 12);
});

it("keeps both segments positive and strictly ordered across the supported controls", () => {
  for (let ticks = minimum; ticks <= maximum; ticks++) {
    const split = goldenSplit016(ticks);
    expect(split.long).toBeGreaterThan(split.short);
    expect(split.short).toBeGreaterThan(0);
    expect(split.long + split.short).toBeCloseTo(split.whole, 12);
    expect(split.long / split.whole).toBeCloseTo(split.longShare, 12);
    expect(split.comparison).toBe(
      Math.sign(ticks * ticks - 3000 * (3000 - ticks)),
    );
  }
  expect(goldenSplit016(maximum).short).toBe(0.001);
  for (const value of [minimum - 1, maximum + 1, 1700.5, NaN]) {
    expect(() => goldenSplit016(value)).toThrow(RangeError);
  }
});

it("reuses the existing successive-ratio model for the source page 5 forward check", () => {
  const result = power039Growth(
    power039Fraction(500000),
    power039Fraction(200),
    3,
  );
  expect(result.ok && result.values.map(({ value }) => value.n)).toEqual([
    500000n,
    100000000n,
    20000000000n,
    4000000000000n,
  ]);
});
