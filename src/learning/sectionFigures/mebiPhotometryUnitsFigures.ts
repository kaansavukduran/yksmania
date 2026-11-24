import {
  fullSphereFluxTitle, lampComparisonTitle, lampExamples, squareMetreFluxTitle, uniformSourceAt,
} from "../mebiPhotometryUnits";
import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";

function lampFrame(index: number): FigureFrame {
  const example = lampExamples[index];
  const center = v(5.8, 2.86);
  const els: El[] = [
    circle(center, 0.54, { tone: "a", fill: "muted", bold: true }),
    poly([v(5.4, 1.7), v(6.2, 1.7), v(6.2, 2.35), v(5.4, 2.35)], { tone: "ink", fill: "muted", bold: true }),
    seg(v(5.48, 2.05), v(6.12, 2.05), { tone: "ink", thin: true }),
    txt(v(0.8, 4.76), "Güç", "e", { bold: true, small: true }),
    txt(v(0.8, 4.02), example.electricalWatts + " W", "e", { tone: "b", bold: true }),
    txt(v(8.86, 4.76), "Işık şiddeti", "e", { bold: true, small: true }),
    txt(v(8.86, 4.02), example.measuredCandela + " cd", "e", { tone: "a", bold: true }),
  ];
  for (let i = 0; i < example.rays; i++) {
    const radians = Math.PI * 2 * i / example.rays;
    const position = (r: number) => v(center[0] + r * Math.cos(radians), center[1] + r * Math.sin(radians));
    els.push(vec(position(0.76), position(1.69), { tone: "a", thin: true }));
  }
  return {
    els,
    readout: [
      example.electricalWatts + " W elektrik gücü. Örnek ölçüm " + example.measuredCandela + " cd.",
      "Okların sayısı verilen ışık şiddetini temsil ediyor. İki lambanın elektrik gücü ayrı etiketli.",
    ],
  };
}

function sphereFrame(patch: boolean): FigureFrame {
  const center = v(4.7, 2.6);
  const radius = 2.01;
  const to = (r: number, a: number) => v(center[0] + r * Math.cos(a), center[1] + r * Math.sin(a));
  const meter = uniformSourceAt(1, 1, 1);
  const els: El[] = [
    circle(center, radius, { tone: "b", dash: true, bold: true }),
    circle(center, 0.2, { tone: "a", fill: "a" }),
    txt(v(4.7, 5.22), "Küre kesiti", "n", { tone: "b", bold: true }),
    txt(v(7.86, 1.12), "I = 1 cd", "e", { tone: "a", bold: true }),
  ];
  for (let i = 0; i < 12; i++) {
    const radians = Math.PI * i / 6;
    els.push(vec(to(0.25, radians), to(radius - 0.08, radians), { tone: "a", thin: true }));
  }
  if (patch) {
    const arc = Array.from({ length: 15 }, (_, i) => to(radius, Math.PI / 4 + (i / 14 - 0.5) * 0.78));
    els.push(poly(arc, { tone: "warn", open: true, bare: true, bold: true }));
    els.push(txt(v(7.45, 4.55), "1 m² alan", "e", { tone: "warn", bold: true, small: true }));
  } else {
    els.push(txt(v(7.86, 4.55), "r = 1 m", "e", { tone: "b", bold: true, small: true }));
    els.push(seg(center, to(radius, Math.PI / 8), { tone: "b", dash: true }));
  }
  return {
    els,
    readout: [patch
      ? "Yüzey aydınlanması " + fmt(meter.illuminanceLux) + " lx. 1 m² parçaya düşen akı " + fmt(meter.patchLumens) + " lm."
      : "Kürenin tamamı 4π m². Toplam ışık akısı 4π lm, yaklaşık " + fmt(meter.totalLumens, 2) + " lm."],
  };
}

export const photometryUnitsFigures: Record<string, FigureDef> = {
  [lampComparisonTitle]: {
    caption: "İki lambanın elektrik gücünü ve örnek candela ölçümünü aynı çizimde karşılaştır.",
    alt: "Ortada ışık veren lamba. Sol etiket watt, sağ etiket candela ve lambadan çıkan okların sayısı örnek ışık şiddetine göre değişiyor.",
    steps: lampExamples.map(example => example.label),
    draw: (_value, step) => lampFrame(step),
  },
  [fullSphereFluxTitle]: {
    caption: "Her yöne çıkan ışık kürenin tamamına ulaşır.",
    alt: "Dairesel küre kesitinin merkezindeki bir candela kaynaktan her yöne oklar gider. Yarıçap bir metre.",
    draw: () => sphereFrame(false),
  },
  [squareMetreFluxTitle]: {
    caption: "Küre yüzeyindeki bir metrekarelik alanı kalan yüzeyle karşılaştır.",
    alt: "Bir candela kaynaktan çıkan ışık küreye gidiyor. Kürenin üst tarafında bir metrekarelik parça yayla işaretli.",
    draw: () => sphereFrame(true),
  },
};
