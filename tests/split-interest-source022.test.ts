import { expect, it } from "vitest";
import { r035, r035Add } from "../src/learning/rationalSource035Model";
import {
  splitInterest022,
  splitInterest022EqualExample,
  splitInterest022Example,
} from "../src/learning/splitInterestSource022Model";

const sample = splitInterest022Example;

it("uses each annual rate with its own duration in the original example", () => {
  expect(splitInterest022(sample)).toMatchObject({
    kind: "unique",
    coefA: r035(3, 50),
    coefB: r035(1, 10),
    allA: r035(432),
    allB: r035(720),
    shareA: r035(3000),
    shareB: r035(4200),
    interestA: r035(180),
    interestB: r035(420),
    check: r035(600),
  });
});

it("rechecks Y4 and the near case whose first duration changes from 12 to 6 months", () => {
  const source = {
    principal: 10000,
    interest: 1040,
    rateA: 8,
    monthsA: 12,
    rateB: 12,
    monthsB: 12,
  };
  expect(splitInterest022(source)).toMatchObject({
    kind: "unique",
    shareA: r035(4000),
    shareB: r035(6000),
  });
  expect(splitInterest022({ ...source, monthsA: 6 })).toMatchObject({
    kind: "unique",
    shareA: r035(2000),
    shareB: r035(8000),
  });
  expect(
    splitInterest022({
      ...source,
      principal: 6000,
      interest: 450,
      rateA: 5,
      rateB: 10,
    }),
  ).toMatchObject({ kind: "unique", shareA: r035(3000), shareB: r035(3000) });
});

it("reconstructs source P3, P11 and H3 exactly", () => {
  expect(
    splitInterest022({
      principal: 9000,
      interest: 630,
      rateA: 5,
      rateB: 8,
      monthsA: 12,
      monthsB: 12,
    }),
  ).toMatchObject({
    kind: "unique",
    shareA: r035(3000),
    interestA: r035(150),
    interestB: r035(480),
  });
  expect(
    splitInterest022({
      principal: 12000,
      interest: 540,
      rateA: 12,
      rateB: 8,
      monthsA: 6,
      monthsB: 6,
    }),
  ).toMatchObject({
    kind: "unique",
    shareA: r035(3000),
    shareB: r035(9000),
    interestA: r035(180),
    interestB: r035(360),
  });
  expect(
    splitInterest022({
      principal: 8000,
      interest: 600,
      rateA: 5,
      rateB: 10,
      monthsA: 12,
      monthsB: 12,
    }),
  ).toMatchObject({ kind: "unique", shareA: r035(4000), shareB: r035(4000) });
});

it("separates all allocations and no solution when the coefficients are equal", () => {
  expect(splitInterest022(splitInterest022EqualExample)).toMatchObject({
    kind: "underdetermined",
    allA: r035(432),
    allB: r035(432),
  });
  expect(
    splitInterest022({ ...splitInterest022EqualExample, interest: 433 }).kind,
  ).toBe("inconsistent");
  const sourceP8 = {
    ...sample,
    principal: 10000,
    interest: 700,
    rateA: 14,
    monthsA: 6,
    rateB: 28,
    monthsB: 3,
  };
  expect(splitInterest022(sourceP8)).toMatchObject({
    kind: "underdetermined",
    coefA: r035(7, 100),
    coefB: r035(7, 100),
  });
  expect(splitInterest022({ ...sourceP8, interest: 699 }).kind).toBe(
    "inconsistent",
  );
  expect(
    splitInterest022({ ...sample, interest: 0, rateA: 0, rateB: 0 }).kind,
  ).toBe("underdetermined");
});

it("keeps infeasible shares distinct and includes either exact endpoint", () => {
  expect(splitInterest022({ ...sample, interest: 721 })).toMatchObject({
    kind: "negative-a",
    shareA: r035(-25),
  });
  expect(splitInterest022({ ...sample, interest: 431 })).toMatchObject({
    kind: "outside-total",
    shareA: r035(7225),
  });
  expect(splitInterest022({ ...sample, interest: 432 })).toMatchObject({
    kind: "unique",
    shareA: r035(7200),
    shareB: r035(0),
  });
  expect(splitInterest022({ ...sample, interest: 720 })).toMatchObject({
    kind: "unique",
    shareA: r035(0),
    shareB: r035(7200),
  });
  expect(splitInterest022({ ...sample, interest: 0, rateA: 0 })).toMatchObject({
    kind: "unique",
    shareA: r035(7200),
    check: r035(0),
  });
  const reverse = { ...sample, rateA: 12, monthsA: 12, rateB: 6, monthsB: 6 };
  expect(splitInterest022({ ...reverse, interest: 215 }).kind).toBe(
    "negative-a",
  );
  expect(splitInterest022({ ...reverse, interest: 865 }).kind).toBe(
    "outside-total",
  );
});

it("retains fractional TL exactly and rejects unsupported inputs", () => {
  const result = splitInterest022({
    principal: 1000,
    interest: 79,
    rateA: 5,
    monthsA: 12,
    rateB: 8,
    monthsB: 12,
  });
  if (result.kind !== "unique")
    throw Error("Expected a valid fractional allocation");
  expect(result).toMatchObject({
    shareA: r035(100, 3),
    shareB: r035(2900, 3),
    check: r035(79),
  });
  expect(r035Add(result.shareA, result.shareB)).toEqual(r035(1000));
  for (const override of [
    { principal: 0 },
    { interest: -1 },
    { monthsA: 0.5 },
    { rateB: NaN },
  ]) {
    expect(() => splitInterest022({ ...sample, ...override })).toThrow(
      RangeError,
    );
  }
});
