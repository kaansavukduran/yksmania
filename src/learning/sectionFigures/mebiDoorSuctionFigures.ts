import { doorPressureState, doorPressureTitle, intakeHeightM, intakeThresholdKPa, liquidIntakeState, liquidSuctionExampleTitle, liquidSuctionTitle } from "../mebiDoorSuction";
import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

const doorFigure: FigureDef = {
  caption: "Üstten görünüş. İki ince ok basınçların yönü. Sağdaki net kuvvet oku yüksek basınçtan düşük basınca yönelir.",
  alt: "Kapı kanadı oda ile dış alan arasında yatay bir çizgiyle gösterilmiş. Dışarısı üstte, oda altta. Basınç farkı net kuvvetin yönünü değiştiriyor.",
  param: { label: "Oda − dış basınç farkı", min: -200, max: 200, step: 100, init: 200, unit: " Pa" },
  draw: (difference) => {
    const state = doorPressureState(difference);
    return {
      els: [
        seg(v(-2.72, 0), v(-1.86, 0), { bold: true }),
        seg(v(-1.86, 0), v(1.46, 0), { tone: "a", bold: true }),
        seg(v(1.46, 0), v(2.23, 0), { bold: true }),
        circle(v(-1.86, 0), 0.11, { fill: "ink" }),
        vec(v(-0.68, 1.39), v(-0.68, 0.29), { tone: "warn" }),
        vec(v(0.58, -1.39), v(0.58, -0.29), { tone: "b" }),
        txt(v(-0.98, 1.81), "Dışarı", "n", { small: true, bold: true }),
        txt(v(0.8, -1.81), "Oda", "s", { small: true, bold: true }),
        ...(difference ? [vec(v(3, -state.outwardForce / 130), v(3, state.outwardForce / 130), { tone: "a", bold: true })] : []),
        txt(v(3, -1.39), "Net", "s", { small: true, bold: true }),
      ],
      readout: [
        `Oda: ${fmt(state.innerPressure / 1000, 2)} kPa. Dışarı: ${fmt(state.outerPressure / 1000, 2)} kPa.`,
        difference === 0
          ? "Net basınç kuvveti: 0 N."
          : `Net basınç kuvveti: ${difference > 0 ? "Dışarı" : "İçeri"} ${Math.abs(state.outwardForce)} N.`,
      ],
    };
  },
};

const liquidFigure: FigureDef = {
  caption: "Açık muslukta sıvının ne kadar yükselebileceğini basınç farkı belirler. Kesintisiz yeşil sütun, katkı sıvısını gösterir.",
  alt: "Yatay bir su borusu ortada daralıyor. Dar kesit, bir musluk ve U biçimli yan boruyla depoya bağlı. Sıvı eşiği aşarsa yan borudan ana boruya yükseliyor.",
  param: { label: "Depo − dar kesit basınç farkı", min: 0, max: 5, step: 1, init: 4, unit: " kPa" },
  steps: ["Musluk kapalı", "Musluk açık"],
  draw: (drop, step) => {
    const valveOpen = step === 1;
    const state = liquidIntakeState(drop, valveOpen);
    const surface = 0.55;
    const target = 2.41;
    const level = surface + (target - surface) * Math.min(1, state.riseM / intakeHeightM);
    const top = [v(0, 3.32), v(2.55, 3.32), v(3.49, 2.92), v(4.57, 2.92), v(5.35, 3.32), v(7.6, 3.32)];
    const bottom = [v(0, 2.05), v(2.55, 2.05), v(3.49, target), v(4.57, target), v(5.35, 2.05), v(7.6, 2.05)];
    const schema: El[] = [
      poly([...top, ...bottom.slice().reverse()], { fill: "b", tone: "b", thin: true }),
      poly(top, { bold: true, open: true }),
      poly(bottom, { bold: true, open: true }),
      vec(v(0.58, 2.68), v(1.65, 2.68), { tone: "b" }),
      vec(v(3.47, 2.66), v(4.48, 2.66), { tone: "b" }),
      poly([v(3.52, target), v(3.52, -0.48), v(3.9, -0.92), v(6.02, -0.92), v(6.38, -0.49), v(6.38, 0.13)], { open: true }),
      poly([v(3.83, target), v(3.83, -0.35), v(4.07, -0.59), v(5.86, -0.59), v(6.08, -0.35), v(6.08, 0.13)], { open: true }),
      poly([v(3.52, level), v(3.52, -0.48), v(3.9, -0.92), v(6.02, -0.92), v(6.38, -0.49), v(6.38, 0.13),
        v(6.08, 0.13), v(6.08, -0.35), v(5.86, -0.59), v(4.07, -0.59), v(3.83, -0.35), v(3.83, level)], { fill: "c", tone: "c", thin: true }),
      poly([v(5.27, 0.13), v(7.22, 0.13), v(7.22, surface), v(5.27, surface)], { fill: "c", tone: "c", thin: true }),
      poly([v(5.27, 1.1), v(5.27, 0.13), v(7.22, 0.13), v(7.22, 1.1)], { open: true, bold: true }),
      seg(v(3.39, 1.42), valveOpen ? v(3.72, 1.69) : v(3.98, 1.42), { tone: "ink", bold: true }),
      txt(v(6.27, -1.22), "Depo", "s", { small: true, bold: true }),
      txt(v(3.99, 3.58), "Dar kesit", "n", { small: true, bold: true }),
    ];
    if (state.canEnter) schema.push(vec(v(3.66, 1.73), v(3.66, 2.65), { tone: "a", bold: true }));
    const result = !valveOpen ? "Musluk kapalı. Ana boruya geçiş yok."
      : state.canEnter ? "Katkı sıvısı ana boruya geçebilir."
        : state.reachedInlet ? "Sıvı boru girişinde dengede."
        : "Sıvı boru girişine ulaşmaz.";
    return {
      els: schema,
      readout: [`Fark: ${drop} kPa · Yükselme eşiği: ${intakeThresholdKPa} kPa.`, result],
    };
  },
};

export const mebiDoorSuctionFigures: Record<string, FigureDef> = {
  [doorPressureTitle]: doorFigure,
  [liquidSuctionTitle]: liquidFigure,
  [liquidSuctionExampleTitle]: { ...liquidFigure, param: undefined, steps: undefined, draw: () => liquidFigure.draw(4, 1) },
};
