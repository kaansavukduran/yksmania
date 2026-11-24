import { submergedBlockExampleTitle, submergedBlockPressure, submergedBlockTitle } from "../mebiArchimedesPressure";
import { fmt, poly, seg, txt, v, vec, type FigureDef } from "./figureKit";

const submergedBlock: FigureDef = {
  caption: "Okların uzunlukları kuvvet büyüklüğüne bağlı. Yandaki eş oklar birbirini dengeler. Üst ve alt okların farkını çizimin sağında gör.",
  alt: "Sıvıdaki bloğun üst yüzünde aşağı, alt yüzünde yukarı ve karşılıklı yan yüzlerinde içeri yönelen basınç okları var. Bloğu derine indirince basınç kuvvetleri artıyor, net kaldırma oku değişmiyor.",
  param: { label: "Üst yüz derinliği", min: 10, max: 50, step: 10, init: 10, unit: " cm" },
  draw: (topCm) => {
    const state = submergedBlockPressure(topCm);
    const surface = 5.15;
    const top = surface - 0.045 * topCm;
    const bottom = surface - 0.045 * state.bottomCm;
    const middle = (top + bottom) / 2;
    const length = (force: number) => force * 0.013;
    return {
      els: [
        poly([v(0, 0), v(5.8, 0), v(5.8, surface), v(0, surface)], { fill: "b", tone: "b", thin: true }),
        poly([v(0, 5.55), v(0, 0), v(5.8, 0), v(5.8, 5.55)], { open: true, bold: true }),
        seg(v(0, surface), v(5.8, surface), { tone: "b" }),
        poly([v(1.9, bottom), v(3.9, bottom), v(3.9, top), v(1.9, top)], { fill: "muted", tone: "ink" }),
        vec(v(2.9, top + length(state.topForce)), v(2.9, top), { tone: "warn", bold: true }),
        vec(v(2.9, bottom - length(state.bottomForce)), v(2.9, bottom), { tone: "a", bold: true }),
        vec(v(1.9 - length(state.sideForce), middle), v(1.9, middle), { tone: "c", bold: true }),
        vec(v(3.9 + length(state.sideForce), middle), v(3.9, middle), { tone: "c", bold: true }),
        vec(v(6.72, middle - length(state.buoyancy)), v(6.72, middle), { tone: "a", bold: true }),
        txt(v(2.9, 5.41), "Sıvı yüzeyi", "n", { small: true, bold: true }),
        txt(v(6.72, middle + 0.28), "Net", "n", { small: true, bold: true }),
      ],
      readout: [
        `Üst ${topCm} cm: ${fmt(state.topPressure)} Pa · ${fmt(state.topForce)} N aşağı.`,
        `Alt ${state.bottomCm} cm: ${fmt(state.bottomPressure)} Pa · ${fmt(state.bottomForce)} N yukarı.`,
        `Karşılıklı yan oklar: ${fmt(state.sideForce, 2)} N ve ${fmt(state.sideForce, 2)} N. Net kaldırma: ${fmt(state.buoyancy)} N yukarı.`,
      ],
    };
  },
};

export const mebiArchimedesPressureFigures: Record<string, FigureDef> = {
  [submergedBlockTitle]: submergedBlock,
  [submergedBlockExampleTitle]: { ...submergedBlock, param: undefined, draw: () => submergedBlock.draw(50, 0) },
};
