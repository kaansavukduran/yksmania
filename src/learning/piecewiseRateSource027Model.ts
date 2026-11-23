import { r035, r035Add, r035Compare, r035Div } from "./rationalSource035Model";

export const piecewiseRate027Example = {
  start: 8,
  middle: 29,
  end: 17,
  firstHours: 3,
  secondHours: 4,
};

export function piecewiseRate027({
  start,
  middle,
  end,
  firstHours,
  secondHours,
}: typeof piecewiseRate027Example) {
  const totalHours = firstHours + secondHours;
  if (
    ![start, middle, end].every(
      (value) => Number.isSafeInteger(value) && value >= 0,
    ) ||
    ![firstHours, secondHours, totalHours].every(
      (value) => Number.isSafeInteger(value) && value > 0,
    )
  ) {
    throw new RangeError(
      "Hacimler negatif olmamalı ve iki süre de pozitif olmalı.",
    );
  }

  const firstChange = middle - start;
  const secondChange = end - middle;
  const totalChange = end - start;
  const firstRate = r035(firstChange, firstHours);
  const secondRate = r035(secondChange, secondHours);
  const overallRate = r035(totalChange, totalHours);
  return {
    points: [
      { hours: 0, liters: start },
      { hours: firstHours, liters: middle },
      { hours: totalHours, liters: end },
    ] as const,
    firstChange,
    secondChange,
    totalChange,
    totalHours,
    firstRate,
    secondRate,
    overallRate,
    simpleMean: r035Div(r035Add(firstRate, secondRate), r035(2)),
    equalDurations: firstHours === secondHours,
    equalRates: r035Compare(firstRate, secondRate) === 0,
  };
}
