import { flowSurfaceState, flowSurfaceTitle, pressureSurfaces, umbrellaPressureTitle } from "../mebiFlowSurfaces";
import { fmt, poly, txt, v, vec, type El, type FigureDef } from "./figureKit";

const sections: readonly (readonly El[])[] = [
  [
    poly([v(-2.55, 0.54), v(0, 1.74), v(2.55, 0.54)], { bold: true, open: true }),
    poly([v(-2.13, 0.57), v(-2.13, -0.94), v(2.13, -0.94), v(2.13, 0.57)], { thin: true, open: true }),
  ],
  [poly([v(-2.55, 0.41), v(-2.12, 0.92), v(-1.08, 1.2), v(0.2, 1.15), v(1.54, 0.75), v(2.55, 0.33), v(0.7, 0.2), v(-1.44, 0.14)],
    { fill: "b", tone: "ink", bold: true, smooth: true })],
  [
    poly([v(-2.55, 0.42), v(-1.76, 1.18), v(-0.83, 1.58), v(0, 1.69), v(0.83, 1.58), v(1.76, 1.18), v(2.55, 0.42)],
      { open: true, bold: true, smooth: true }),
    poly([v(0, 1.69), v(0, -0.78), v(-0.52, -0.92), v(-0.62, -0.59)], { open: true, bold: true, smooth: true }),
  ],
];

const figure: FigureDef = {
  caption: "Küçük oklar basıncın gösterilen düşey etkilerinin yönü. Sağdaki okun uzunluğu net kuvvetle birlikte değişir.",
  alt: "Seçilen çatı, kanat veya şemsiyenin kesiti. Üstten aşağı ve alttan yukarı yönlü iki basınç oku var. Sağda net kuvvet oku yalnız basınç farkı varsa görülür.",
  param: { label: "Alt ve üst basınç farkı", min: 0, max: 200, step: 100, init: 200, unit: " Pa" },
  steps: pressureSurfaces.map(({ label }) => label),
  draw: (difference, step) => {
    const { lower, upper } = pressureSurfaces[step];
    const state = flowSurfaceState(difference);
    return {
      els: [
        ...sections[step],
        vec(v(-1.12, 2.38), v(-1.12, 1.78), { tone: "warn" }),
        vec(v(1.16, -0.74), v(1.16, -0.14), { tone: "b" }),
        txt(v(-1.12, 2.68), upper, "n", { small: true, bold: true }),
        txt(v(1.16, -1.12), lower, "s", { small: true, bold: true }),
        ...(state.upwardForce > 0 ? [
          vec(v(3.38, -0.24), v(3.38, -0.24 + state.upwardForce / 65), { tone: "a", bold: true }),
        ] : []),
        txt(v(3.38, -0.53), "Net", "s", { small: true, bold: true }),
      ],
      readout: [
        `${lower} basınç: ${fmt(state.lowerPressure / 1000)} kPa. ${upper} basınç: ${fmt(state.upperPressure / 1000, 2)} kPa.`,
        `Alan: ${fmt(state.projectedArea)} m² · Basınç farkı: ${difference} Pa.`,
        state.upwardForce > 0 ? `Net basınç kuvveti: Yukarı ${state.upwardForce} N.` : "Net basınç kuvveti: 0 N.",
      ],
    };
  },
};

export const mebiFlowSurfaceFigures: Record<string, FigureDef> = {
  [flowSurfaceTitle]: figure,
  [umbrellaPressureTitle]: {
    ...figure,
    param: undefined,
    steps: undefined,
    draw: () => figure.draw(200, 2),
  },
};
