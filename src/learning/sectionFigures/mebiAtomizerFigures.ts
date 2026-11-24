import { atomizerExampleTitle, atomizerLiftHeightM, atomizerState, atomizerThresholdKPa, atomizerTitle } from "../mebiAtomizer";
import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

const atomizer: FigureDef = {
  caption: "Hava sağdan sola akar. Basınç farkı yeterli olunca sıvı düşey borudan uca ulaşır ve hava akımına katılabilir.",
  alt: "Sağda kauçuk hava haznesi ve ortada su şişesi var. Yatay hava borusu üstte, şişeden yükselen sıvı borusu onun sol ucuna bağlı. Soldaki damlacıklar yalnız püskürtme koşulu sağlanınca çizilir.",
  param: { label: "Yüzey − uç basınç farkı", min: 0, max: 3, step: 0.5, init: 2, unit: " kPa" },
  draw: (pressure) => {
    const state = atomizerState(pressure);
    const surface = 0.77;
    const nozzle = 3.12;
    const waterLevel = surface + (nozzle - surface) * Math.min(1, state.riseM / atomizerLiftHeightM);
    const els: El[] = [
      poly([v(1.67, 0.18), v(4.77, 0.18), v(4.77, surface), v(1.67, surface)], { fill: "b", tone: "b", thin: true }),
      poly([v(2.42, 2.53), v(2.42, 2), v(1.67, 1.63), v(1.67, 0.18), v(4.77, 0.18), v(4.77, 1.63), v(4.02, 2), v(4.02, 2.53)], { open: true, bold: true }),
      poly([v(1.55, 2.91), v(5.8, 2.91), v(5.8, 3.41), v(1.55, 3.41)], { open: true, bold: true }),
      circle(v(6.26, 3.16), 0.68, { tone: "ink", fill: "c" }),
      poly([v(2.94, 0.36), v(2.94, nozzle), v(3.22, nozzle), v(3.22, 0.36)], { open: true, bold: true }),
      seg(v(3.08, 0.36), v(3.08, waterLevel), { tone: "b", bold: true }),
      txt(v(1.53, 3.58), "Sprey ucu", "n", { small: true, bold: true }),
      txt(v(6.26, 4.02), "Hava haznesi", "n", { small: true, bold: true }),
    ];
    if (pressure > 0) els.push(vec(v(5.33, 3.16), v(4.21, 3.16), { tone: "c", bold: true }));
    if (state.canEnter) {
      els.push(vec(v(3.08, 1.52), v(3.08, 2.57), { tone: "b", bold: true }));
      els.push(...[v(1.13, 2.97), v(0.83, 3.14), v(0.51, 2.78), v(0.45, 3.19)].map((p) => circle(p, 0.066, { tone: "b", fill: "b" })));
    }
    const result = state.canEnter ? "Su uca ulaşır. Hava damlacık oluşturabilir."
      : state.reachedInlet ? "Su seviyesi uçta dengede. Sürekli püskürtme yok."
        : `Su ${fmt(100 * state.riseM)} cm yükselir. Uca ulaşmaz.`;
    return { els, readout: [`Fark: ${fmt(pressure)} kPa · Yükselme eşiği: ${fmt(atomizerThresholdKPa)} kPa.`, result] };
  },
};

export const mebiAtomizerFigures: Record<string, FigureDef> = {
  [atomizerTitle]: atomizer,
  [atomizerExampleTitle]: { ...atomizer, param: undefined, draw: () => atomizer.draw(2, 0) },
};
