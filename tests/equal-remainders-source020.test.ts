import { expect, it } from "vitest";
import {
  r035,
  r035Compare,
  r035Mul,
} from "../src/learning/rationalSource035Model";
import {
  equalRemainders020,
  equalRemainders020Example,
} from "../src/learning/equalRemaindersSource020Model";

const original = equalRemainders020Example;

it("consumes a percentage of the original paint, with both capacities explicit", () => {
  expect(equalRemainders020(original)).toMatchObject({
    kind: "unique",
    equalCapacity: true,
    initialA: r035(60),
    consumedA: r035(24),
    remainingA: r035(36),
    requiredB: r035(45),
    fillB: r035(9, 16),
    consumedB: r035(9),
    remainingB: r035(36),
  });
});

it("equates actual liters when capacities differ", () => {
  expect(equalRemainders020({ ...original, capacityB: 60 })).toMatchObject({
    kind: "unique",
    equalCapacity: false,
    requiredB: r035(45),
    fillB: r035(3, 4),
    remainingA: r035(36),
    remainingB: r035(36),
  });
});

it("admits a full tank exactly and detects overflow on the next smaller capacity", () => {
  expect(equalRemainders020({ ...original, capacityB: 45 })).toMatchObject({
    kind: "unique",
    requiredB: r035(45),
    fillB: r035(1),
  });
  expect(equalRemainders020({ ...original, capacityB: 44 })).toMatchObject({
    kind: "over-capacity",
    requiredB: r035(45),
    fillB: r035(45, 44),
  });
  expect(equalRemainders020({ ...original, capacityB: 46 })).toMatchObject({
    kind: "unique",
    requiredB: r035(45),
    fillB: r035(45, 46),
  });
  expect(equalRemainders020({ ...original, capacityB: 40 })).toMatchObject({
    kind: "over-capacity",
    fillB: r035(9, 8),
  });
});

it("handles both full consumption branches and uniquely empty solutions", () => {
  expect(equalRemainders020({ ...original, useB: 100 })).toMatchObject({
    kind: "inconsistent",
    requiredB: null,
    fillB: null,
    remainingA: r035(36),
  });
  for (const a of [{ useA: 100 }, { fillA: 0 }]) {
    expect(equalRemainders020({ ...original, ...a, useB: 100 })).toMatchObject({
      kind: "underdetermined",
      requiredB: null,
      fillB: null,
      remainingA: r035(0),
    });
    expect(equalRemainders020({ ...original, ...a, useB: 99 })).toMatchObject({
      kind: "unique",
      requiredB: r035(0),
      fillB: r035(0),
      remainingA: r035(0),
    });
  }
});

it("checks the arithmetic contrast in source p5 and p10 independently", () => {
  expect(
    equalRemainders020({
      capacityA: 100,
      capacityB: 100,
      fillA: 80,
      useA: 16,
      useB: 4,
    }),
  ).toMatchObject({
    kind: "unique",
    consumedA: r035(64, 5),
    remainingA: r035(336, 5),
    fillB: r035(7, 10),
  });
});

it("keeps exact equality and uses a separate feasibility comparison over boundary inputs", () => {
  for (const capacityB of [20, 45, 120])
    for (const fillA of [0, 1, 75, 100])
      for (const useA of [0, 1, 40, 100])
        for (const useB of [0, 1, 20, 99]) {
          const result = equalRemainders020({
            ...original,
            capacityB,
            fillA,
            useA,
            useB,
          });
          expect(
            result.requiredB && result.fillB && result.remainingB,
          ).not.toBeNull();
          expect(result.remainingB).toEqual(result.remainingA);
          expect(r035Mul(result.fillB!, r035(capacityB))).toEqual(
            result.requiredB,
          );
          expect(result.kind).toBe(
            r035Compare(result.requiredB!, r035(capacityB)) > 0
              ? "over-capacity"
              : "unique",
          );
        }
});

it("rejects zero capacities, noninteger input, and percentages outside the domain", () => {
  for (const override of [
    { capacityA: 0 },
    { capacityB: 1.5 },
    { fillA: -1 },
    { useA: 101 },
    { useB: NaN },
  ]) {
    expect(() => equalRemainders020({ ...original, ...override })).toThrow(
      RangeError,
    );
  }
});
