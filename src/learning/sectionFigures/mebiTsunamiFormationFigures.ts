import {
  tsunamiAt, tsunamiComparisonTitle, tsunamiDepth, tsunamiDepthTitle, tsunamiDisplacementTitle,
  tsunamiFormationTitle, tsunamiReferenceDepthM,
} from "../mebiTsunamiFormation";
import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";

function formation(stage: number): FigureFrame {
  const uplift = stage > 0;
  const bottom = uplift ? [v(0.65, 0.9), v(4.2, 0.9), v(4.2, 1.8), v(7.25, 1.8), v(7.25, 0.9), v(11, 0.9)] : [v(0.65, 0.9), v(11, 0.9)];
  const surface = stage === 1 ? [v(0.65, 3.8), v(3.35, 3.8), v(4.7, 4.57), v(6.85, 4.57), v(8.2, 3.8), v(11, 3.8)] :
    stage === 2 ? [v(0.65, 3.8), v(1.85, 4.5), v(3.1, 3.8), v(8.55, 3.8), v(9.85, 4.5), v(11, 3.8)] :
      [v(0.65, 3.8), v(11, 3.8)];
  const els: El[] = [
    poly(bottom, { open: true, bare: true, tone: "ink", bold: true }),
    poly(surface, { open: true, bare: true, tone: "b", bold: true }),
    txt(v(2.35, 2.65), "Deniz suyu", "n", { tone: "b", small: true }),
    txt(v(8.2, 0.5), "Taban", "s", { small: true }),
  ];
  if (stage === 1) {
    els.push(vec(v(5.7, 2), v(5.7, 3.48), { tone: "a", bold: true }));
    els.push(txt(v(6.6, 2.95), "Yukarı", "e", { tone: "a", small: true }));
  } else if (stage === 2) {
    els.push(vec(v(3.45, 5.15), v(1.2, 5.15), { tone: "b" }));
    els.push(vec(v(8.15, 5.15), v(10.4, 5.15), { tone: "b" }));
    els.push(txt(v(5.8, 5.35), "Yayılma", "n", { tone: "b", small: true }));
  }
  return {
    els,
    readout: [[
      "Taban ve su yüzeyi başlangıçta yerinde.",
      "Tabanın bir bölümü yükseldi. Üstündeki su da yükseliyor.",
      "Yüzey dalgaları kaynaktan uzaklaşıyor.",
    ][stage]],
  };
}

function depthComparison(depthM: number): FigureFrame {
  const maxWavelength = tsunamiAt(tsunamiDepth.max).wavelengthKm;
  const start = 1.01;
  const scale = 8.4 / maxWavelength;
  const position = (distanceKm: number) => start + scale * distanceKm;
  const els: El[] = [
    seg(v(start, 0.9), v(position(120), 0.9), { tone: "ink", thin: true }),
    txt(v(5.2, 0.25), "Tepe aralığı (km)", "s", { small: true }),
  ];
  for (const distance of [0, 30, 60, 90, 120]) {
    const x = position(distance);
    els.push(seg(v(x, 0.9), v(x, 1.07), { tone: "ink", thin: true }));
    els.push(txt(v(x, 0.73), String(distance), "s", { small: true, tone: "muted" }));
  }
  for (const { depth, y, tone, label } of [
    { depth: depthM, y: 3.9, tone: "b", label: "Değişen derinlik" },
    { depth: tsunamiReferenceDepthM, y: 2.19, tone: "a", label: "100 m" },
  ] as const) {
    const end = position(tsunamiAt(depth).wavelengthKm);
    els.push(
      seg(v(start, y), v(end, y), { tone, bold: true }),
      circle(v(start, y), 0.12, { tone, fill: tone }),
      circle(v(end, y), 0.12, { tone, fill: tone }),
      txt(v(start, y + 0.48), label, "ne", { tone, bold: true, small: true }),
    );
  }
  const depthReadout = (kind: string, depth: number) => {
    const result = tsunamiAt(depth);
    return `${kind} derinlik ${fmt(depth)} m. Sürat ${fmt(result.speedMS, 1)} m/s, dalga boyu ${fmt(result.wavelengthKm, 1)} km.`;
  };
  return { els, readout: [depthReadout("Seçilen", depthM), depthReadout("Referans", tsunamiReferenceDepthM)] };
}

export const tsunamiFormationFigures: Record<string, FigureDef> = {
  [tsunamiFormationTitle]: {
    caption: "Tabanı, yükselen suyu ve yayılan dalgaları izle. Kesitte düşey ölçek temsilî.",
    alt: "Üç adımda deniz tabanı ve su yüzeyi kesiti. Düşey taban hareketi suyu yükseltiyor. Son adımda dalga okları iki yana gidiyor.",
    steps: ["Başlangıç", "Düşey yer değiştirme", "Yayılan dalgalar"],
    draw: (_depth, step) => formation(step),
  },
  [tsunamiDisplacementTitle]: {
    caption: "Düşey ok, yükselen tabanın üstündeki su hareketini gösteriyor.",
    alt: "Ortada yükselen deniz tabanı, üstünde yükselmiş yüzey ve yukarı yönlü ok.",
    draw: () => formation(1),
  },
  [tsunamiDepthTitle]: {
    caption: "Sabit 10 dakika periyotta iki tepe aralığını aynı yatay ölçekte karşılaştır.",
    alt: "İki yatay aralık 0 ile 120 kilometre arasındaki ortak çizelgeye göre işaretli. Derinlik değişince üst aralık uzayıp kısalıyor.",
    param: { ...tsunamiDepth, label: "Su derinliği", unit: " m" },
    draw: depthComparison,
  },
  [tsunamiComparisonTitle]: {
    caption: "4.000 ve 100 metre derinliği aynı uzaklık ölçeğinde karşılaştır.",
    alt: "Üstte 4.000 metre, altta 100 metre derinliğin tepe aralıkları. Derin denizin üstteki aralığı daha uzun.",
    draw: () => depthComparison(tsunamiDepth.max),
  },
};
