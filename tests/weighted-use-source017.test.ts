import { expect, it } from "vitest";
import { r035, r035Text } from "../src/learning/rationalSource035Model";
import {
  weightedTotals017,
  weightedUse017,
  weightedUse017Contradiction,
  weightedUse017Example,
} from "../src/learning/weightedUseSource017Model";

it("checks the original 48-item example with two different totals", () => {
  const result = weightedUse017(weightedUse017Example);
  expect(result).toMatchObject({
    kind: "valid",
    firstUsed: r035(12),
    afterFirst: r035(36),
    secondUsed: r035(12),
    remaining: r035(24),
    thirdUsed: r035(5),
    unused: 19,
  });
  expect(
    result.counts?.rows.map(({ items, contribution }) => [
      r035Text(items),
      r035Text(contribution),
    ]),
  ).toEqual([
    ["12", "12"],
    ["12", "24"],
    ["5", "15"],
  ]);
  expect(result.counts?.totalItems).toEqual(r035(29));
  expect(result.counts?.weightedTotal).toEqual(r035(51));
});

it("uses exactly the source Q6 values and withholds an unused count on contradiction", () => {
  const result = weightedUse017(weightedUse017Contradiction);
  expect(result).toMatchObject({
    kind: "mismatch",
    firstUsed: r035(10),
    afterFirst: r035(40),
    secondUsed: r035(20),
    remaining: r035(20),
    thirdUsed: r035(2),
    unused: null,
  });
  expect(result.counts?.totalItems).toEqual(r035(32));
  expect(result.counts?.weightedTotal).toEqual(r035(56));
  expect(result.counts?.rows.map(({ contribution }) => contribution)).toEqual([
    r035(10),
    r035(40),
    r035(6),
  ]);
});

it("accepts the nearby Q6 repair only at 56 recorded uses", () => {
  expect(
    weightedUse017({ ...weightedUse017Contradiction, reportedUses: 56 }),
  ).toMatchObject({ kind: "valid", unused: 18 });
  for (const reportedUses of [54, 55, 57, 58]) {
    expect(
      weightedUse017({ ...weightedUse017Contradiction, reportedUses }),
    ).toMatchObject({ kind: "mismatch", unused: null });
  }
});

it("identifies a fractional first or second group without a rounded model", () => {
  expect(weightedUse017({ ...weightedUse017Example, total: 47 })).toMatchObject(
    {
      kind: "noninteger",
      fractionStage: "first",
      firstUsed: r035(47, 4),
      counts: null,
      unused: null,
    },
  );
  expect(
    weightedUse017({ ...weightedUse017Example, secondDenominator: 5 }),
  ).toMatchObject({
    kind: "noninteger",
    fractionStage: "second",
    afterFirst: r035(36),
    secondUsed: r035(36, 5),
    counts: null,
    unused: null,
  });
});

it("rejects zero, negative or surplus third-group candidates when all groups are positive", () => {
  for (const [distinct, thirdUsed] of [
    [24, 0],
    [23, -1],
    [49, 25],
  ]) {
    expect(
      weightedUse017({ ...weightedUse017Example, distinct }),
    ).toMatchObject({
      kind: "infeasible",
      thirdUsed: r035(thirdUsed),
      counts: null,
      unused: null,
    });
  }
});

it("checks the page 7 ticket bridge with the same weighted table operations", () => {
  const possibilities = Array.from({ length: 9 }, (_, i) => i + 1).filter(
    (adults) => {
      const counts = weightedTotals017([
        { items: r035(adults), weight: 50 },
        { items: r035(10 - adults), weight: 30 },
      ]);
      return (
        r035Text(counts.totalItems) === "10" &&
        r035Text(counts.weightedTotal) === "380"
      );
    },
  );
  expect(possibilities).toEqual([4]);
  expect(10 - possibilities[0]).toBe(6);
});
