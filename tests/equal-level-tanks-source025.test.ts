import { expect, it } from "vitest";
import {
  r035,
  r035Compare,
  r035Div,
} from "../src/learning/rationalSource035Model";
import {
  equalLevelTanks025,
  equalLevelTanks025Example,
} from "../src/learning/equalLevelTanksSource025Model";

const example = equalLevelTanks025Example;

it("keeps equal heights and distinct volumes in the original equal-flow example", () => {
  expect(equalLevelTanks025(example)).toMatchObject({
    kind: "meeting",
    riseA: r035(1, 2),
    riseB: r035(3, 4),
    headStart: r035(3, 2),
    afterB: r035(6),
    elapsed: r035(9),
    height: r035(9, 2),
    volumeA: r035(54),
    volumeB: r035(36),
    firstRim: r035(41, 3),
    firstTank: "B",
  });
});

it("validates the source's time from the later opening with the common factor scaled out", () => {
  const result = equalLevelTanks025({
    areaA: 45,
    areaB: 20,
    flowA: 18,
    flowB: 18,
    delay: 5,
    rim: 10,
  });
  expect(result).toMatchObject({
    kind: "meeting",
    headStart: r035(2),
    riseA: r035(2, 5),
    riseB: r035(9, 10),
    afterB: r035(4),
    elapsed: r035(9),
    height: r035(18, 5),
  });
});

it("distinguishes unequal L/min from unequal height speeds", () => {
  expect(equalLevelTanks025({ ...example, flowB: 8 })).toMatchObject({
    kind: "meeting",
    riseB: r035(1),
    afterB: r035(3),
    elapsed: r035(6),
    height: r035(3),
  });
  expect(equalLevelTanks025({ ...example, flowB: 4 })).toMatchObject({
    kind: "no-meeting",
    riseOrder: 0,
    firstRim: r035(16),
    stopHeightA: r035(8),
    stopHeightB: r035(13, 2),
  });
  expect(equalLevelTanks025({ ...example, flowB: 2 })).toMatchObject({
    kind: "no-meeting",
    riseOrder: -1,
  });
});

it("halts at the first rim, including before opening and the exact simultaneous boundary", () => {
  expect(equalLevelTanks025({ ...example, rim: 4 })).toMatchObject({
    kind: "after-rim",
    firstTank: "A",
    firstRim: r035(8),
    elapsed: r035(9),
    stopHeightA: r035(4),
    stopHeightB: r035(15, 4),
  });
  expect(equalLevelTanks025({ ...example, delay: 8, rim: 4 })).toMatchObject({
    kind: "before-b",
    firstTank: "A",
    firstRim: r035(8),
    stopHeightB: r035(0),
  });
  expect(equalLevelTanks025({ ...example, delay: 4, rim: 6 })).toMatchObject({
    kind: "meeting",
    firstTank: "both",
    firstRim: r035(12),
    elapsed: r035(12),
    height: r035(6),
  });
});

it("keeps every rendered water level within the rim and every meeting exact over 729 cases", () => {
  for (const areaA of [2, 12, 24])
    for (const areaB of [2, 8, 24])
      for (const flowA of [2, 6, 24])
        for (const flowB of [2, 6, 24])
          for (const delay of [1, 3, 12])
            for (const rim of [2, 8, 25]) {
              const result = equalLevelTanks025({
                areaA,
                areaB,
                flowA,
                flowB,
                delay,
                rim,
              });
              expect(
                r035Compare(result.stopHeightA, result.rim),
              ).toBeLessThanOrEqual(0);
              expect(
                r035Compare(result.stopHeightB, result.rim),
              ).toBeLessThanOrEqual(0);
              expect(
                result.stopHeightA.n >= 0n && result.stopHeightB.n >= 0n,
              ).toBe(true);
              if (result.kind === "meeting") {
                expect(
                  r035Compare(result.elapsed, result.firstRim),
                ).toBeLessThanOrEqual(0);
                expect(r035Div(result.volumeA, r035(areaA))).toEqual(
                  result.height,
                );
                expect(r035Div(result.volumeB, r035(areaB))).toEqual(
                  result.height,
                );
              }
            }
});

it("rejects nonpositive geometries, rates and delay, and fractional inputs", () => {
  for (const override of [
    { areaA: 0 },
    { flowA: -1 },
    { delay: 0 },
    { rim: 0 },
    { flowB: 3.5 },
  ]) {
    expect(() => equalLevelTanks025({ ...example, ...override })).toThrow(
      RangeError,
    );
  }
});
