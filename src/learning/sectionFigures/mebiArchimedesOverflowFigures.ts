import { overflowBalance, overflowBlockLitres, overflowCases, overflowExampleTitle, overflowTitle } from "../mebiArchimedesOverflow";
import { fmt, poly, seg, txt, v, vec, type FigureDef } from "./figureKit";

const overflow: FigureDef = {
  caption: "Oluk ana kaptaki taşma seviyesini belirler. Yan kaptaki su miktarı, cismin ana kapta yer değiştirdiği hacme göre değişir.",
  alt: "Taşma oluğu olan ana kap, yanında küçük ölçü kabı. Blok seçilen yoğunluğa göre yüzüyor, suda askıda duruyor veya tabandaki ızgaraya oturuyor. Üstte kaldırma ve varsa destek, altta ağırlık okları bulunuyor.",
  steps: overflowCases.map(({ label }) => label),
  draw: (_, index) => {
    const choice = overflowCases[index];
    const { displacedLitres, buoyancy, weight, support } = overflowBalance(choice.density);
    const surface = 3.9;
    const blockHeight = 1.05;
    const supportTop = 0.22;
    const blockBottom = index === 0 ? surface - blockHeight * displacedLitres / overflowBlockLitres
      : index === 1 ? 1.88 : supportTop;
    const blockTop = blockBottom + blockHeight;
    const centre = (blockTop + blockBottom) / 2;
    const collected = 0.55 * displacedLitres;
    const length = (force: number) => 0.048 * force;
    return {
      els: [
        poly([v(0, 0), v(4.4, 0), v(4.4, surface), v(0, surface)], { fill: "b", tone: "b", thin: true }),
        poly([v(0, 4.55), v(0, 0), v(4.4, 0), v(4.4, surface), v(5.05, 3.45)], { open: true, bold: true }),
        poly([v(4.4, 4.55), v(4.4, 4.15), v(5.05, 3.70)], { open: true, bold: true }),
        seg(v(0, surface), v(4.4, surface), { tone: "b" }),
        poly([v(5.2, 0), v(7, 0), v(7, collected), v(5.2, collected)], { fill: "b", tone: "b", thin: true }),
        poly([v(5.2, 1.62), v(5.2, 0), v(7, 0), v(7, 1.62)], { open: true, bold: true }),
        txt(v(6.1, 1.88), "Taşan su", "n", { small: true, bold: true }),
        seg(v(1.21, supportTop), v(3.40, supportTop), { dash: true }),
        poly([v(1.52, blockBottom), v(3.08, blockBottom), v(3.08, blockTop), v(1.52, blockTop)], { fill: "muted", tone: "ink" }),
        txt(v(2.30, centre), "K", "c", { small: true, bold: true }),
        vec(v(1.88, blockTop), v(1.88, blockTop + length(buoyancy)), { tone: "a", bold: true }),
        txt(v(1.88, blockTop + length(buoyancy)), "Fₖ", "n", { small: true, bold: true }),
        vec(v(2.73, blockBottom), v(2.73, blockBottom - length(weight)), { tone: "warn", bold: true }),
        txt(v(2.73, blockBottom - length(weight)), "G", "s", { small: true, bold: true }),
        ...(support ? [
          vec(v(2.96, blockBottom), v(2.96, blockBottom + length(support)), { tone: "c", bold: true }),
          txt(v(3.12, blockBottom + length(support)), "N", "e", { small: true, bold: true }),
        ] : []),
      ],
      readout: [
        `${choice.label}. Cisim yoğunluğu: ${fmt(choice.density)} kg/m³. Taşan su: ${fmt(displacedLitres)} L.`,
        `Kaldırma ${fmt(buoyancy)} N yukarı · ağırlık ${fmt(weight)} N aşağı · destek ${fmt(support)} N.`,
      ],
    };
  },
};

export const mebiArchimedesOverflowFigures: Record<string, FigureDef> = {
  [overflowTitle]: overflow,
  [overflowExampleTitle]: { ...overflow, steps: undefined, draw: () => overflow.draw(0, 2) },
};
