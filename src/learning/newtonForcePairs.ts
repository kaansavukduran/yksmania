export const forcePairsTitle = "Ağırlığın ve normalin gerçek çiftleri";
export const boxMassKg = 2;
const gravity = 10;

export function boxForces(upwardPull: number) {
  const weight = boxMassKg * gravity;
  const normal = weight - upwardPull;
  return {
    contacts: [
      { from: "Masa", to: "Kutu", newtons: normal },
      { from: "Kutu", to: "Masa", newtons: -normal },
    ],
    gravity: [
      { from: "Dünya", to: "Kutu", newtons: -weight },
      { from: "Kutu", to: "Dünya", newtons: weight },
    ],
    verticalBalance: normal + upwardPull - weight,
  };
}
