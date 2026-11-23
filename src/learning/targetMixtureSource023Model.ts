import {
  r035,
  r035Add,
  r035Div,
  r035Mul,
  r035Sub,
} from "./rationalSource035Model";

export type TargetMixture023Input = {
  initialMass: number;
  initialPercent: number;
  addedPercent: number;
  targetPercent: number;
};

export const targetMixture023Example: TargetMixture023Input = {
  initialMass: 150,
  initialPercent: 36,
  addedPercent: 12,
  targetPercent: 30,
};

export function targetMixture023(input: TargetMixture023Input) {
  const { initialMass, initialPercent, addedPercent, targetPercent } = input;
  if (
    !Number.isSafeInteger(initialMass) ||
    initialMass <= 0 ||
    ![initialPercent, addedPercent, targetPercent].every(
      (value) => Number.isInteger(value) && value >= 0 && value <= 100,
    )
  ) {
    throw new RangeError(
      "Başlangıç kütlesi pozitif tam sayı, yüzdeler 0 ile 100 arasında tam sayı olmalı.",
    );
  }

  const mass = r035(initialMass);
  const startFraction = r035(initialPercent, 100);
  const addedFraction = r035(addedPercent, 100);
  const targetFraction = r035(targetPercent, 100);
  const initialSolute = r035Mul(mass, startFraction);
  const base = {
    mass,
    startFraction,
    addedFraction,
    targetFraction,
    initialSolute,
  };

  if (addedPercent === targetPercent) {
    return initialPercent === targetPercent
      ? { ...base, kind: "all" as const }
      : { ...base, kind: "limit" as const };
  }

  const candidate = r035Div(
    r035Sub(r035Mul(mass, targetFraction), initialSolute),
    r035Sub(addedFraction, targetFraction),
  );
  if (candidate.n < 0n) return { ...base, kind: "outside" as const, candidate };

  const addedSolute = r035Mul(candidate, addedFraction);
  const finalMass = r035Add(mass, candidate);
  const finalSolute = r035Add(initialSolute, addedSolute);
  return {
    ...base,
    kind: candidate.n === 0n ? ("zero" as const) : ("unique" as const),
    candidate,
    addedSolute,
    finalMass,
    finalSolute,
    check: r035Div(finalSolute, finalMass),
  };
}
