import {
  r035,
  r035Add,
  r035Compare,
  r035Div,
  r035Mul,
  r035Sub,
} from "./rationalSource035Model";

export type EqualLevelTanks025Input = {
  areaA: number;
  areaB: number;
  flowA: number;
  flowB: number;
  delay: number;
  rim: number;
};

export const equalLevelTanks025Example: EqualLevelTanks025Input = {
  areaA: 12,
  areaB: 8,
  flowA: 6,
  flowB: 6,
  delay: 3,
  rim: 8,
};

export function equalLevelTanks025(input: EqualLevelTanks025Input) {
  if (
    !Object.values(input).every(
      (value) => Number.isSafeInteger(value) && value > 0,
    )
  ) {
    throw new RangeError(
      "Alan, debi, gecikme ve kap yüksekliği pozitif tam sayı olmalı.",
    );
  }
  const zero = r035(0);
  const delay = r035(input.delay);
  const rim = r035(input.rim);
  const riseA = r035(input.flowA, input.areaA);
  const riseB = r035(input.flowB, input.areaB);
  const rimTimeA = r035Div(rim, riseA);
  const rimTimeB = r035Add(delay, r035Div(rim, riseB));
  const rimOrder = r035Compare(rimTimeA, rimTimeB);
  const firstRim = rimOrder <= 0 ? rimTimeA : rimTimeB;
  const bElapsed = r035Sub(firstRim, delay);
  const riseOrder = r035Compare(riseB, riseA);
  const state = {
    riseA,
    riseB,
    riseOrder,
    firstRim,
    delay,
    rim,
    firstTank:
      rimOrder < 0
        ? ("A" as const)
        : rimOrder > 0
          ? ("B" as const)
          : ("both" as const),
    stopHeightA: r035Mul(firstRim, riseA),
    stopHeightB: bElapsed.n > 0n ? r035Mul(bElapsed, riseB) : zero,
  };

  if (bElapsed.n <= 0n) return { ...state, kind: "before-b" as const };
  const headStart = r035Mul(delay, riseA);
  if (riseOrder <= 0)
    return { ...state, kind: "no-meeting" as const, headStart };

  const afterB = r035Div(headStart, r035Sub(riseB, riseA));
  const elapsed = r035Add(delay, afterB);
  const height = r035Mul(afterB, riseB);
  if (r035Compare(elapsed, firstRim) > 0) {
    return {
      ...state,
      kind: "after-rim" as const,
      headStart,
      afterB,
      elapsed,
      height,
    };
  }

  return {
    ...state,
    kind: "meeting" as const,
    headStart,
    afterB,
    elapsed,
    height,
    volumeA: r035Mul(elapsed, r035(input.flowA)),
    volumeB: r035Mul(afterB, r035(input.flowB)),
  };
}
