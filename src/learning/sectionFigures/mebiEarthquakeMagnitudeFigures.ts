import {
  magnitudeDifferenceTitle, magnitudeDifferences, magnitudeRatios, magnitudeScaleTitle, magnitudeTitle, magnitudeRatioTitle, localIntensityTitle,
} from "../mebiEarthquakeMagnitude";
import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";

function localIntensity(): FigureFrame {
  const origin = v(5.7, 1.4);
  const els: El[] = [
    seg(v(0.4, 3.45), v(11, 3.45), { tone: "ink" }),
    seg(v(4.3, 0.75), v(6.25, 2.4), { tone: "muted", dash: true }),
    circle(origin, 0.22, { tone: "warn", fill: "warn" }),
    txt(v(5.7, 0.99), "Tek deprem, M 6", "s", { bold: true }),
    vec(v(5.1, 1.85), v(2.7, 3.25), { tone: "b", dash: true }),
    vec(v(6.3, 1.85), v(8.7, 3.25), { tone: "a", dash: true }),
  ];
  for (const { x, title, observation, tone } of [
    { x: 2.3, title: "A konumu", observation: "Eşyalar sallandı", tone: "b" },
    { x: 9.1, title: "B konumu", observation: "Duvarlarda çatlak", tone: "a" },
  ] as const) {
    els.push(
      poly([v(x - 0.56, 3.45), v(x + 0.56, 3.45), v(x + 0.56, 4.36), v(x - 0.56, 4.36)], { tone, fill: "muted" }),
      poly([v(x - 0.7, 4.36), v(x, 4.89), v(x + 0.7, 4.36)], { tone }),
      txt(v(x, 5.42), title, "n", { tone, bold: true }),
      txt(v(x, 6.04), observation, "n", { small: true }),
    );
  }
  return {
    els,
    readout: [
      "İki gözlem aynı M 6 depremini anlatıyor.",
      "A’da eşyalar sallandı. B’de duvarlarda çatlak görüldü. Çizim örnek gözlemleri gösteriyor.",
    ],
  };
}

function ratioScale(difference: number): FigureFrame {
  const { amplitude, energy } = magnitudeRatios(difference);
  const left = 1.24;
  const decadeWidth = 2.78;
  const end = left + 3 * decadeWidth;
  const els: El[] = [
    txt(v(left, 5.83), "Genlik oranı", "ne", { tone: "b", bold: true, small: true }),
    txt(v(left, 3.54), "Yaklaşık enerji oranı", "ne", { tone: "a", bold: true, small: true }),
  ];
  for (const { y, decades, tone } of [
    { y: 4.9, decades: difference, tone: "b" },
    { y: 2.68, decades: 1.5 * difference, tone: "a" },
  ] as const) {
    const marker = v(left + decades * decadeWidth, y);
    els.push(
      seg(v(left, y), v(end, y), { tone: "muted", bold: true }),
      seg(v(left, y), marker, { tone, bold: true }),
      circle(marker, 0.12, { tone, fill: tone, bold: true }),
    );
  }
  for (let i = 0; i <= 3; i++) {
    const x = left + i * decadeWidth;
    els.push(
      seg(v(x, 1.65), v(x, 5.19), { tone: "muted", dash: true, thin: true }),
      txt(v(x, 1.35), `${fmt(10 ** i)} kat`, "s", { small: true }),
    );
  }
  return {
    els,
    readout: [
      `Büyüklük farkı ${fmt(difference, 1)}. Genlik oranı ${fmt(amplitude, 2)} kat.`,
      `Yaklaşık enerji oranı ${fmt(energy, 2)} kat. Ölçekte bir aralık, on kat.`,
    ],
  };
}

const localObservation: FigureDef = {
  caption: "Bir tek büyüklük değerini, iki yerdeki farklı gözlemlerle karşılaştır.",
  alt: "Yer altında M 6 etiketi var. İki ok aynı kaynaktan A ve B konumlarına gidiyor. A’da eşyalar sallandı, B’de duvarlarda çatlak görüldü.",
  draw: localIntensity,
};

const ratios: FigureDef = {
  caption: "İki oran ortak logaritmik eksende. Her eşit aralık on katı gösteriyor.",
  alt: "Genlik ve yaklaşık enerji için iki yatay ölçek. İşaretlerin konumu büyüklük farkından hesaplanıyor. Ortak eksenin işaretleri 1, 10, 100 ve 1.000 kat.",
  param: { label: "Büyüklük farkı", ...magnitudeDifferences, unit: "" },
  draw: ratioScale,
};

export const earthquakeMagnitudeFigures: Record<string, FigureDef> = {
  [magnitudeTitle]: localObservation,
  [magnitudeRatioTitle]: ratios,
  [magnitudeDifferenceTitle]: {
    caption: "B ile A arasındaki farkı büyüklük ekseninde oku.",
    alt: "Büyüklük ekseninde B 5 ve A 6’da işaretli. İki işaret bir büyüklük birimi aralıklı.",
    draw: () => ({
      els: [
        seg(v(0.8, 2), v(8.8, 2), { tone: "ink", bold: true }),
        circle(v(2.1, 2), 0.19, { tone: "b", fill: "b" }),
        circle(v(7.5, 2), 0.19, { tone: "a", fill: "a" }),
        txt(v(2.1, 1.45), "B: 5", "s", { tone: "b", bold: true }),
        txt(v(7.5, 1.45), "A: 6", "s", { tone: "a", bold: true }),
        seg(v(2.1, 3.15), v(7.5, 3.15), { tone: "muted", bold: true }),
        txt(v(4.8, 3.72), "Bir büyüklük birimi", "n", { small: true }),
      ],
      readout: ["B 5, A 6. Büyüklük farkı 1."],
    }),
  },
  [magnitudeScaleTitle]: { ...ratios, param: undefined, draw: () => ratioScale(1) },
  [localIntensityTitle]: localObservation,
};
