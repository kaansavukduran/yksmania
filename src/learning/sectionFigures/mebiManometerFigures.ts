import { manometerLayouts, manometerReading, sourceHeightCm } from "../mebiManometerReadings";
import { fmt, poly, seg, txt, v, type FigureDef } from "./figureKit";

export const mebiManometerFigure: FigureDef = {
  caption: "Farkı sürgüyle, referans kolunu ve yüzey sırasını ileri geri düğmeleriyle değiştir. Yatay çizgi, daha alçak cıva yüzeyiyle aynı seviyede.",
  alt: "Gaz kabına bağlı U borusunda iki cıva yüzeyi. Sağ taraf seçime göre havaya açık veya kapalı ve yaklaşık vakum. İki kolun düşey yüzey farkı aynı cıva ile ölçülüyor.",
  param: { label: "Düşey fark (cm)", min: 0, max: 10, step: 1, init: sourceHeightCm },
  steps: manometerLayouts.map(({ label }) => label),
  draw: (height, step) => {
    const layout = manometerLayouts[step];
    const { gasLevel, referenceLevel, gasPressure } = manometerReading(height, layout);
    const lowerLevel = Math.min(gasLevel, referenceLevel);
    const upperLevel = Math.max(gasLevel, referenceLevel);
    return {
      els: [
        poly([v(0, 3.35), v(0, 4.75), v(1.55, 4.75), v(1.55, 3.35)], { fill: "muted", tone: "ink" }),
        txt(v(0.78, 4), "Gaz", "c", { small: true }),
        poly([v(1.55, 4.45), v(2.35, 4.45), v(2.35, 3.75)], { open: true }),
        poly([v(1.55, 3.75), v(1.85, 3.75), v(1.85, 0.45), v(5.25, 0.45), v(5.25, 4.37)], { open: true }),
        poly([v(2.35, 3.75), v(2.35, 0.95), v(4.75, 0.95), v(4.75, 4.37)], { open: true }),
        poly([v(1.85, gasLevel), v(1.85, 0.45), v(5.25, 0.45), v(5.25, referenceLevel), v(4.75, referenceLevel), v(4.75, 0.95), v(2.35, 0.95), v(2.35, gasLevel)], { fill: "b", tone: "b", thin: true }),
        ...(layout.closed ? [seg(v(4.7, 4.37), v(5.3, 4.37), { tone: "warn", bold: true })] : []),
        txt(v(5, 4.65), layout.closed ? "Yaklaşık vakum" : "Açık hava", "n", { small: true }),
        seg(v(1.55, lowerLevel), v(5.65, lowerLevel), { dash: true, tone: "ink" }),
        ...(height ? [
          seg(v(5.3, upperLevel), v(5.75, upperLevel), { dash: true, tone: "muted" }),
          seg(v(6.08, lowerLevel), v(6.08, upperLevel), { tone: "a" }),
          seg(v(5.94, lowerLevel), v(6.22, lowerLevel), { tone: "a" }),
          seg(v(5.94, upperLevel), v(6.22, upperLevel), { tone: "a" }),
        ] : []),
        txt(v(6.25, upperLevel + 0.4), `${fmt(height)} cm`, "e", { small: true }),
        txt(v(3.55, 0.03), "Cıva", "s", { small: true }),
      ],
      readout: [
        `Referans basıncı: ${fmt(layout.referencePressure)} cmHg. Düşey fark: ${fmt(height)} cm.`,
        `Gaz basıncı: ${fmt(layout.referencePressure)} ${layout.direction < 0 && height > 0 ? "−" : "+"} ${fmt(height)} = ${fmt(gasPressure)} cmHg.`,
      ],
    };
  },
};
