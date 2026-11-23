import {
  r035,
  r035Add,
  r035Compare,
  r035Div,
  r035Mul,
  type R035,
} from "./rationalSource035Model";

export type WorkerTeam024Input = {
  hoursA: number;
  hoursB: number;
  halfA: boolean;
};

export const workerTeam024Example: WorkerTeam024Input = {
  hoursA: 12,
  hoursB: 18,
  halfA: false,
};
export const workerTeam024HalfExample: WorkerTeam024Input = {
  hoursA: 6,
  hoursB: 12,
  halfA: true,
};

export function workerTeam024({ hoursA, hoursB, halfA }: WorkerTeam024Input) {
  if (
    ![hoursA, hoursB].every(
      (hours) => Number.isSafeInteger(hours) && hours > 0,
    ) ||
    typeof halfA !== "boolean"
  ) {
    throw new RangeError(
      "Tek başına bitirme süreleri pozitif tam sayı olmalı.",
    );
  }
  const one = r035(1);
  const soloA = { rate: r035(1, hoursA), hours: r035(hoursA) };
  const soloB = { rate: r035(1, hoursB), hours: r035(hoursB) };
  const teamRateA = halfA ? r035Div(soloA.rate, r035(2)) : soloA.rate;
  const teamRate = r035Add(teamRateA, soloB.rate);
  const team = { rate: teamRate, hours: r035Div(one, teamRate) };
  const fastestSolo = hoursA <= hoursB ? soloA.hours : soloB.hours;
  return {
    soloA,
    soloB,
    teamRateA,
    team,
    relation: r035Compare(team.hours, fastestSolo),
    contributionA: r035Mul(team.hours, teamRateA),
    contributionB: r035Mul(team.hours, soloB.rate),
  };
}

export function workerProgress024(rate: R035, time: R035) {
  const zero = r035(0);
  if (r035Compare(rate, zero) < 0 || r035Compare(time, zero) < 0) {
    throw new RangeError("Hız ve süre negatif olmamalı.");
  }
  const fraction = r035Mul(rate, time);
  return r035Compare(fraction, r035(1)) > 0 ? r035(1) : fraction;
}
