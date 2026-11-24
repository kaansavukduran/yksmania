import { airFlowManometerExampleTitle, airFlowManometerState, airFlowManometerTitle } from "../mebiAirFlowManometer";
import { fmt, poly, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

const wideX = 1.25;
const narrowX = 5.15;
const halfPipe = 0.21;
const left = wideX - halfPipe;
const right = narrowX + halfPipe;
const leftInner = wideX + halfPipe;
const rightInner = narrowX - halfPipe;

function waterShape(lowLevel: number, highLevel: number): El {
  return poly([
    v(left, lowLevel), v(left, -0.75), v(left + 0.48, -1.24), v(right - 0.48, -1.24), v(right, -0.75), v(right, highLevel),
    v(rightInner, highLevel), v(rightInner, -0.57), v(rightInner - 0.27, -0.81), v(leftInner + 0.27, -0.81), v(leftInner, -0.57), v(leftInner, lowLevel),
  ], { fill: "b", tone: "b", thin: true });
}

const figure: FigureDef = {
  caption: "Durgun suda iki yüzeyin düşey farkını ölç. Su, daha düşük hava basıncının olduğu L kolunda yükselir.",
  alt: "K borusunun soldaki geniş kesiti M koluna, sağdaki dar kesiti L koluna bağlı. Akış varsa hava sağdan sola yönelir. U borusundaki su seviyeleri, akış yokken eşit ve akışta L tarafında daha yüksek.",
  param: { label: "Geniş kesitte hava sürati", min: 0, max: 20, step: 5, init: 10, unit: " m/s" },
  draw: (wideSpeed) => {
    const state = airFlowManometerState(wideSpeed);
    const wideLevel = 0.95 - 0.11 * state.waterHeightDifferenceCm;
    const narrowLevel = 0.95 + 0.11 * state.waterHeightDifferenceCm;
    const top = [v(0, 4.11), v(2.64, 4.11), v(3.98, 3.88), v(6.56, 3.88)];
    const bottom = [v(0, 3.04), v(2.64, 3.04), v(3.98, 3.27), v(6.56, 3.27)];
    return {
      els: [
        poly([...top, ...bottom.slice().reverse()], { fill: "muted", tone: "muted" }),
        poly(top, { open: true, bold: true }),
        poly(bottom, { open: true, bold: true }),
        waterShape(wideLevel, narrowLevel),
        poly([v(left, 3.04), v(left, -0.75), v(left + 0.48, -1.24), v(right - 0.48, -1.24), v(right, -0.75), v(right, 3.27)], { open: true }),
        poly([v(leftInner, 3.04), v(leftInner, -0.57), v(leftInner + 0.27, -0.81), v(rightInner - 0.27, -0.81), v(rightInner, -0.57), v(rightInner, 3.27)], { open: true }),
        seg(v(left, wideLevel), v(leftInner, wideLevel), { tone: "b", bold: true }),
        seg(v(rightInner, narrowLevel), v(right, narrowLevel), { tone: "b", bold: true }),
        seg(v(left - 0.42, 0.95), v(right + 0.42, 0.95), { tone: "muted", dash: true }),
        txt(v(wideX - 0.41, 2.25), "M", "w", { small: true, bold: true }),
        txt(v(narrowX + 0.41, 2.25), "L", "e", { small: true, bold: true }),
        ...(wideSpeed > 0 ? [
          vec(v(2.33, 3.58), v(2.33 - 0.055 * state.wideSpeed, 3.58), { tone: "a", bold: true }),
          vec(v(6.49, 3.58), v(6.49 - 0.055 * state.narrowSpeed, 3.58), { tone: "a", bold: true }),
        ] : []),
      ],
      readout: [
        `M: ${state.wideSpeed} m/s · L: ${state.narrowSpeed} m/s.`,
        `P(M) − P(L): ${fmt(state.widePressureAboveNarrow)} Pa.`,
        state.waterHeightDifferenceCm > 0
          ? `L kolundaki su ${fmt(state.waterHeightDifferenceCm)} cm daha yüksek.`
          : "Su seviyeleri eşit.",
      ],
    };
  },
};

export const mebiAirFlowManometerFigures: Record<string, FigureDef> = {
  [airFlowManometerTitle]: figure,
  [airFlowManometerExampleTitle]: { ...figure, param: undefined, draw: () => figure.draw(10, 0) },
};
