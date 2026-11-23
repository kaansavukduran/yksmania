import { expect, it } from "vitest";
import {
  r035,
  r035Add,
  r035Compare,
} from "../src/learning/rationalSource035Model";
import {
  workerProgress024,
  workerTeam024,
  workerTeam024Example,
  workerTeam024HalfExample,
} from "../src/learning/workerTeamSource024Model";

const sample = workerTeam024Example;
const model = workerTeam024(sample);

it("keeps exact A, B, and team coordinates from source page 3 and Y2", () => {
  expect(model).toMatchObject({
    soloA: { hours: r035(12), rate: r035(1, 12) },
    soloB: { hours: r035(18), rate: r035(1, 18) },
    team: { hours: r035(36, 5), rate: r035(5, 36) },
    relation: -1,
    contributionA: r035(3, 5),
    contributionB: r035(2, 5),
  });
  expect(workerProgress024(model.soloB.rate, r035(12))).toEqual(r035(2, 3));
  expect(workerProgress024(model.soloA.rate, r035(12))).toEqual(r035(1));
  expect(workerProgress024(model.team.rate, r035(36, 5))).toEqual(r035(1));
});

it("changes only A's team rate in the near counterexample", () => {
  const half = workerTeam024({ ...sample, halfA: true });
  expect(half).toMatchObject({
    teamRateA: r035(1, 24),
    team: { rate: r035(7, 72), hours: r035(72, 7) },
  });
  expect(half.soloA).toEqual(model.soloA);
  expect(half.soloB).toEqual(model.soloB);
});

it("allows both a tie and a slower team when A loses half its speed", () => {
  expect(workerTeam024(workerTeam024HalfExample)).toMatchObject({
    teamRateA: r035(1, 12),
    team: { hours: r035(6), rate: r035(1, 6) },
    relation: 0,
    contributionA: r035(1, 2),
    contributionB: r035(1, 2),
  });
  expect(
    workerTeam024({ ...workerTeam024HalfExample, hoursB: 18 }),
  ).toMatchObject({ team: { hours: r035(36, 5) }, relation: 1 });
  expect(
    workerTeam024({ ...workerTeam024HalfExample, halfA: false }),
  ).toMatchObject({ team: { hours: r035(4) }, relation: -1 });
});

it("verifies conserved work for both efficiency choices on 882 input combinations", () => {
  for (let hoursA = 4; hoursA <= 24; hoursA++)
    for (let hoursB = 4; hoursB <= 24; hoursB++)
      for (const halfA of [false, true]) {
        const state = workerTeam024({ hoursA, hoursB, halfA });
        expect(r035Add(state.contributionA, state.contributionB)).toEqual(
          r035(1),
        );
        expect(workerProgress024(state.team.rate, state.team.hours)).toEqual(
          r035(1),
        );
        expect(r035Compare(state.team.hours, state.soloB.hours)).toBe(-1);
        expect(state.relation).toBe(
          r035Compare(state.team.hours, r035(Math.min(hoursA, hoursB))),
        );
        if (!halfA) expect(state.relation).toBe(-1);
      }
});

it("caps completed work at one and rejects malformed rates and durations", () => {
  expect(workerProgress024(r035(1, 10), r035(20))).toEqual(r035(1));
  expect(workerProgress024(r035(1, 10), r035(0))).toEqual(r035(0));
  expect(() => workerProgress024(r035(-1), r035(-1))).toThrow(RangeError);
  expect(() => workerTeam024({ ...sample, hoursA: 0 })).toThrow(RangeError);
  expect(() => workerTeam024({ ...sample, hoursB: 3.5 })).toThrow(RangeError);
});
