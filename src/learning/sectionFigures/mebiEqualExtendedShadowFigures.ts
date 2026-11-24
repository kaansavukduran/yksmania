import { equalExtendedShadowAt, equalExtendedShadowTitle, equalShadowFarTitle, equalShadowNearTitle } from "../mebiEqualExtendedShadow";
import { circle, poly, seg, txt, v, type El, type FigureDef, type FigureFrame } from "./figureKit";

function equalShadow(screenCm: number): FigureFrame {
  const state = equalExtendedShadowAt(screenCm);
  const { radiusCm: r, centreGapCm: d, outerRadiusCm: outer, sourceTouchX, sourceTouchY } = state;
  const front = v(screenCm + 7.5, 0);
  const els: El[] = [
    poly([v(d, r), v(d, -r), v(screenCm, -r), v(screenCm, r)], { tone: "muted", fill: "muted", bare: true }),
    seg(v(screenCm, -6), v(screenCm, 6), { tone: "ink", bold: true }),
  ];
  for (const sign of [1, -1]) {
    els.push(
      seg(v(0, sign * r), v(screenCm, sign * r), { tone: "a", thin: true }),
      seg(v(sourceTouchX, sign * sourceTouchY), v(screenCm, sign * outer), { tone: "b", thin: true, dash: true }),
    );
  }
  els.push(
    circle(v(0, 0), r, { tone: "a", fill: "a" }),
    circle(v(d, 0), r, { tone: "ink", fill: "ink" }),
    circle(front, outer, { tone: "b", fill: "b", bold: true }),
    circle(front, r, { tone: "ink", fill: "ink" }),
    txt(v(0, -2.75), "Kaynak", "s", { tone: "ink", small: true }),
    txt(v(d, -2.75), "Opak küre", "s", { tone: "ink", small: true }),
    txt(v(screenCm, 6.6), "Perde", "n", { tone: "ink", small: true }),
    txt(v(front[0], 6.6), "Önden", "n", { tone: "ink", small: true }),
  );
  const fmt = (x: number) => x.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
  return {
    els,
    readout: [
      `${screenCm} cm perdede tam gölge çapı ${state.umbraDiameterCm} cm. Yarı gölge alanı ${fmt(state.penumbraAreaCm2)} cm².`,
      "Yatay sınırlar aynı açıklıkta kalır. Eğik dış sınırlar uzaklaştıkça ayrılır.",
    ],
  };
}

const alt = "Eş boydaki kaynak ve kürenin üst ve alt ortak sınırları paraleldir. Perdede önden görülen iç daire sabit, dış yarı gölge halkası uzaklıkla büyür.";
export const equalExtendedShadowFigures: Record<string, FigureDef> = {
  [equalExtendedShadowTitle]: {
    caption: "Perdeyi uzaklaştır. Tam gölgenin çapını ve dış halkanın alanını ayrı oku.",
    alt,
    param: { label: "Kaynak ile perde arası", min: 8, max: 12, step: 1, init: 8, unit: "cm" },
    draw: equalShadow,
  },
  [equalShadowNearTitle]: { caption: "Kaynağa 8 cm uzak perde.", alt, draw: () => equalShadow(8) },
  [equalShadowFarTitle]: { caption: "Kaynağa 12 cm uzak perde.", alt, draw: () => equalShadow(12) },
};
