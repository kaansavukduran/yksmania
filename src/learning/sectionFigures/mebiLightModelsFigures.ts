import { brightFringeSpacingMm, brightFringeTitle, darkFringeTitle, youngFringesTitle } from "../mebiLightModels";
import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";

const center = 2.68;
const mmToDrawingUnit = 0.33;

function slitFrame(wavelengthNm: number): FigureFrame {
  const spacing = brightFringeSpacingMm(wavelengthNm);
  const screenX = 7.45;
  const upper = v(3.18, 3.21);
  const lower = v(3.18, 2.15);
  const els: El[] = [
    seg(v(3.18, 0.26), v(3.18, 1.96), { tone: "ink", bold: true }),
    seg(v(3.18, 2.33), v(3.18, 3.02), { tone: "ink", bold: true }),
    seg(v(3.18, 3.39), v(3.18, 5.1), { tone: "ink", bold: true }),
    txt(v(3.18, 5.64), "İki yarık", "n", { bold: true, small: true }),
    vec(v(0.73, 3.21), upper, { tone: "a" }),
    vec(v(0.73, 2.15), lower, { tone: "a" }),
    txt(v(0.7, 1.42), "Tek renk", "s", { tone: "a", small: true }),
    seg(upper, v(screenX, center), { tone: "b" }),
    seg(lower, v(screenX, center), { tone: "b" }),
    seg(v(screenX, 0.25), v(screenX, 5.1), { tone: "ink", bold: true }),
    circle(v(screenX, center), 0.1, { tone: "a", fill: "a" }),
    txt(v(screenX, 5.64), "Ekran", "n", { bold: true, small: true }),
    poly([v(9.35, 0.25), v(12.1, 0.25), v(12.1, 5.1), v(9.35, 5.1)], { tone: "muted", fill: "muted" }),
    txt(v(10.7, 5.64), "Önden", "n", { bold: true, small: true }),
  ];
  for (let order = -2; order <= 2; order++) {
    const y = center + order * spacing * mmToDrawingUnit;
    els.push(seg(v(9.56, y), v(11.88, y), { tone: "a", bold: true }));
  }
  return {
    els,
    readout: [
      'Yarık aralığı 0,2 mm, ekran uzaklığı 1 m. Dalga boyu ' + wavelengthNm + ' nm.',
      'Merkez yakınında komşu aydınlık saçakların arası yaklaşık ' + fmt(spacing, 2) + ' mm.',
    ],
  };
}

function phaseFrame(inPhase: boolean): FigureFrame {
  const traces = [4.35, 2.77, 1.18];
  const els: El[] = [];
  const labels = ["Birinci dalga", "İkinci dalga", "Toplam"];
  const singleAmplitude = 0.31;
  for (const [index, base] of traces.entries()) {
    els.push(seg(v(0.75, base), v(10.8, base), { tone: "muted", thin: true, dash: true }));
    els.push(txt(v(11.08, base), labels[index], "e", { small: true, bold: true }));
    const points = Array.from({ length: 81 }, (_, i) => {
      const amplitude = index === 2 ? (inPhase ? 2 * singleAmplitude : 0) : singleAmplitude;
      const sign = index === 1 && !inPhase ? -1 : 1;
      return v(0.75 + 10 * i / 80, base + sign * amplitude * Math.sin(4 * Math.PI * i / 80));
    });
    els.push(poly(points, { open: true, bare: true, tone: index === 2 ? "a" : "b", bold: true }));
  }
  return {
    els,
    readout: [
      inPhase ? "Bir dalga boyu yol farkında eş fazdaki dalgalar güçlenir." : "Yarım dalga boyu yol farkında eş genlikli dalgalar birbirini söndürür.",
    ],
  };
}

export const lightModelsFigures: Record<string, FigureDef> = {
  [youngFringesTitle]: {
    caption: "Dalga boyunu değiştir. Ekrandaki aydınlık saçakların aralığını ön görünüşte karşılaştır.",
    alt: "Tek renkli ışık iki yarıktan ekrana ilerliyor. Sağdaki ön görünüşte ortadaki aydınlık çizgi sabit ve yanındaki çizgilerin ona uzaklığı dalga boyuyla değişiyor.",
    param: { label: "Dalga boyu", min: 450, max: 650, step: 50, init: 550, unit: "nm" },
    draw: slitFrame,
  },
  [brightFringeTitle]: {
    caption: "Bir dalga boyu yol farkında tepeler ve çukurlar aynı anda gelir.",
    alt: "İki eş fazlı dalganın tepeleri üst üste geliyor. Alttaki toplam dalganın genliği büyüyor.",
    draw: () => phaseFrame(true),
  },
  [darkFringeTitle]: {
    caption: "Yarım dalga boyu yol farkında bir tepe ile bir çukur aynı anda gelir.",
    alt: "İki eş genlikli dalganın tepeleri diğerinin çukurlarına denk geliyor. Alttaki toplam çizgi düz.",
    draw: () => phaseFrame(false),
  },
};
