import { movingPistonState, pistonChanges } from "../mebiMovingPiston";
import { fmt, poly, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

function piston(x: number, state: ReturnType<typeof movingPistonState>, label: string): El[] {
  const y = 1.94 * state.volume;
  const left = x - 1.32;
  const right = x + 1.32;
  const arrowLength = 0.24 * state.pressure;
  return [
    poly([v(left, 0), v(right, 0), v(right, y), v(left, y)], { fill: "b", tone: "b", thin: true }),
    poly([v(left, 4.28), v(left, 0), v(right, 0), v(right, 4.28)], { open: true }),
    seg(v(left, y), v(right, y), { tone: "ink", bold: true }),
    poly([v(x - 0.36, y), v(x - 0.36, y + state.load * 1.15), v(x + 0.36, y + state.load * 1.15), v(x + 0.36, y)],
      { fill: "muted", tone: "ink", thin: true }),
    vec(v(x - 0.78, y + 0.17 + arrowLength), v(x - 0.78, y + 0.17), { tone: "warn" }),
    vec(v(x + 0.7, y - 0.18 - arrowLength), v(x + 0.7, y - 0.18), { tone: "a" }),
    txt(v(x, -0.35), label, "s", { small: true }),
    txt(v(x, 4.48), `${fmt(state.pressure)} atm`, "n", { small: true }),
  ];
}

export const mebiMovingPistonFigure: FigureDef = {
  caption: "Aşağı ok dış hava ile yükün toplam etkisini, yukarı ok gazın etkisini gösterir. İki çizim ayrı dengede.",
  alt: "Gazla dolu iki silindirde birer serbest piston var. Değişime göre ikinci piston daha yüksek veya daha alçak durur. Basınçlar tabanda değil pistonda karşılaştırılıyor.",
  param: { label: "Değişim katsayısı", min: 1, max: 2, step: 0.5, init: 1.5 },
  steps: pistonChanges.map(({ label }) => label),
  draw: (factor, step) => {
    const change = pistonChanges[step];
    const before = movingPistonState(change, 1);
    const after = movingPistonState(change, factor);
    return {
      els: [...piston(0, before, "İlk denge"), ...piston(4.05, after, "Son denge")],
      readout: [
        `Son basınç: ${fmt(after.atmosphere, 2)} + ${fmt(after.load, 2)} = ${fmt(after.pressure, 2)} atm.`,
        `Son hacim: ${fmt(after.volume, 2)} V.`,
      ],
    };
  },
};

export const heatedPistonExampleFigure: FigureDef = {
  ...mebiMovingPistonFigure,
  steps: undefined,
  param: undefined,
  draw: () => mebiMovingPistonFigure.draw(1.5, 0),
};
