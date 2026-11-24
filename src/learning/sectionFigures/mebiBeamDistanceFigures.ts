import { beamDistanceTitle, beamIlluminance, parallelBeamTitle, pointBeamTitle, sampleDistancesM } from "../mebiBeamDistance";
import { circle, fmt, seg, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";

function beamFrame(parallel: boolean): FigureFrame {
  const x0 = 1.5;
  const y0 = 2.65;
  const width = (distance: number) => parallel ? 0.86 : 0.46 * distance;
  const x = (distance: number) => x0 + distance * 2.16;
  const els: El[] = [];
  if (!parallel) els.push(circle(v(x0, y0), 0.16, { tone: "a", fill: "a" }));
  for (const fraction of [-1, -0.5, 0, 0.5, 1]) {
    const startY = y0 + fraction * width(0);
    const endY = y0 + fraction * width(4.4);
    els.push(vec(v(x0, startY), v(x(4.4), endY), { tone: "a", thin: true }));
  }
  for (const distance of sampleDistancesM) {
    const planeX = x(distance);
    const value = beamIlluminance(parallel, distance);
    els.push(seg(v(planeX, y0 - width(distance)), v(planeX, y0 + width(distance)), { tone: "b", bold: true }));
    els.push(txt(v(planeX, 5.45), distance + " m", "n", { tone: "b", bold: true, small: true }));
    els.push(txt(v(planeX, 0.2), fmt(value) + " lx", "s", { tone: "b", bold: true, small: true }));
  }
  return {
    els,
    readout: sampleDistancesM.map(distance => distance + " m ölçüm düzlemi " + fmt(beamIlluminance(parallel, distance)) + " lx."),
  };
}

const pointAlt = "Soldaki noktadan yayılan ışınlar 2 ve 4 metre düzlemleri arasında açılıyor. İlk aydınlanma 20, ikinci 5 lüks.";
const parallelAlt = "Soldan yatay paralel ışınlar eş genişlikte ilerliyor. 2 ve 4 metre düzlemlerinin ikisinde de 20 lüks.";

export const beamDistanceFigures: Record<string, FigureDef> = {
  [beamDistanceTitle]: {
    caption: "Aynı iki uzaklıkta açılan ışınları ve sabit genişlikte demeti karşılaştır.",
    alt: pointAlt + " " + parallelAlt,
    steps: ["Noktasal kaynak", "Paralel demet"],
    draw: (_value, step) => beamFrame(step === 1),
  },
  [pointBeamTitle]: {
    caption: "Işınların arası açıldıkça aynı alanın ışık payı azalır.",
    alt: pointAlt,
    draw: () => beamFrame(false),
  },
  [parallelBeamTitle]: {
    caption: "Kayıpsız ve paralel demet aynı alanı aynı biçimde aydınlatır.",
    alt: parallelAlt,
    draw: () => beamFrame(true),
  },
};
