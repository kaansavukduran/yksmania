import {
  farScreenTitle, nearScreenTitle, sourceToCentreCm, sphereRadiusCm, sphereShadowAt, sphereShadowTitle,
} from "../mebiPointSphereShadow";
import { circle, poly, right, seg, txt, v, type FigureDef, type FigureFrame } from "./figureKit";

const fmt = (value: number) => value.toLocaleString("tr-TR", { maximumFractionDigits: 2 });

function sphereShadow(screenCm: number): FigureFrame {
  const { tangentX, tangentY, shadowRadius, diameter } = sphereShadowAt(screenCm);
  const source = v(0, 0);
  const centre = v(sourceToCentreCm, 0);
  const upper = v(tangentX, tangentY);
  const lower = v(tangentX, -tangentY);
  const top = v(screenCm, shadowRadius);
  const bottom = v(screenCm, -shadowRadius);
  return {
    els: [
      poly([upper, lower, bottom, top], { tone: "muted", fill: "muted", bare: true }),
      seg(v(screenCm, -12), v(screenCm, 12), { tone: "ink", bold: true }),
      seg(source, top, { tone: "a", thin: true }),
      seg(source, bottom, { tone: "a", thin: true }),
      circle(centre, sphereRadiusCm, { tone: "ink", fill: "ink" }),
      seg(centre, upper, { tone: "c", dash: true }),
      right(upper, centre, source, "c"),
      circle(source, 0.19, { tone: "a", fill: "a" }),
      seg(bottom, top, { tone: "warn", bold: true }),
      txt(v(0, -2), "Kaynak", "s", { tone: "ink", small: true }),
      txt(v(sourceToCentreCm, -4.1), "Opak küre", "s", { tone: "ink", small: true }),
      txt(v(screenCm, 13), "Perde", "n", { tone: "ink", small: true }),
      txt(v(screenCm + 2.55, 0), "Tam gölge", "e", { tone: "warn", small: true, bold: true }),
    ],
    readout: [`Perde kaynaktan ${fmt(screenCm)} cm uzakta. Tam gölge çapı ${fmt(diameter)} cm.`],
  };
}

export const pointSphereShadowFigures: Record<string, FigureDef> = {
  [sphereShadowTitle]: {
    caption: "Perdeyi kaydır. İki teğet ışının perdede kestiği noktaların arası gölgenin çapıdır.",
    alt: "Solda noktasal ışık kaynağı, ortada opak küre kesiti ve sağda perde. İki ışın küreye teğet geçer. Perdede ışınlarla sınırlanan bölüm tam gölgedir.",
    param: { label: "Kaynak ile perde arası", min: 10, max: 14, step: 1, init: 10, unit: "cm" },
    draw: sphereShadow,
  },
  [nearScreenTitle]: {
    caption: "Kaynaktan 10 cm ötedeki perde.",
    alt: "İki teğet ışın 10 cm uzaklıktaki perde üzerinde 15 cm aralıkla sonlanır.",
    draw: () => sphereShadow(10),
  },
  [farScreenTitle]: {
    caption: "Kaynaktan 14 cm ötedeki perde.",
    alt: "Aynı ışınlar daha uzak perdede 21 cm aralıkla sonlanır.",
    draw: () => sphereShadow(14),
  },
};
