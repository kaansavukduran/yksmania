import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame, type Tone } from "./figureKit";
import {
  combinedNoiseLevelDb, noiseBaselineDb, noiseLevelTitle, noiseSourceCounts, noiseSourcesTitle,
  noiseTitle,
} from "../mebiNoise";

const sourceTones: Tone[] = ["a", "b", "c", "warn"];

function noiseSources(count: number): FigureFrame {
  const meter = v(9.6, 3.2);
  const els: El[] = [
    circle(meter, 0.27, { tone: "ink", fill: "muted", bold: true }),
    txt(v(9.6, 2.42), "Ölçüm noktası", "s", { small: true }),
    txt(v(6.1, 6.44), `Her kaynak tek başına ${noiseBaselineDb} dB`, "n", { small: true }),
    txt(v(0.7, 0.51), " ", "c"),
  ];
  for (let index = 0; index < count; index++) {
    const y = 5.15 - index * 1.28;
    const tone = sourceTones[index];
    els.push(
      circle(v(2.8, y), 0.25, { tone, fill: tone }),
      txt(v(2.12, y), `Kaynak ${index + 1}`, "w", { tone, small: true }),
      vec(v(3.21, y), v(8.91, meter[1] + 0.45 - index * 0.3), { tone }),
    );
  }
  return {
    els,
    readout: [
      `${count} bağımsız eş kaynak aynı noktaya ses ulaştırıyor.`,
      `Her kaynak bir şiddet birimi. Toplam ${count} birim.`,
    ],
  };
}

function noiseLevel(count: number): FigureFrame {
  const baseline = noiseBaselineDb;
  const level = combinedNoiseLevelDb(count);
  const left = 1.02;
  const width = 2.4;
  const barY = 2.14;
  const els: El[] = [
    txt(v(5.82, 5.22), `Toplam ${count} birim şiddet`, "n", { small: true }),
    seg(v(left, 0.98), v(left + 4 * width, 0.98), { tone: "ink", thin: true }),
  ];
  for (let index = 0; index < 4; index++) {
    const x = left + index * width;
    const right = x + width;
    const active = index < count;
    const tone = active ? sourceTones[index] : "muted";
    els.push(
      poly([v(x, barY), v(right, barY), v(right, barY + 1.23), v(x, barY + 1.23)], { tone, fill: active ? tone : undefined }),
      txt(v(x + width / 2, 1.67), `${index + 1}`, "s", { tone, small: true }),
    );
  }
  return {
    els,
    readout: [
      `Tek kaynak ${baseline} dB. ${count} kaynak toplam ${fmt(level, 2)} dB.`,
      `Şiddet ${count} kat. Düzey farkı ${fmt(level - baseline, 2)} dB.`,
    ],
  };
}

export const noiseFigures: Record<string, FigureDef> = {
  [noiseTitle]: {
    caption: "Kaynak sayısını değiştir. Önce seslerin aynı ölçüm noktasına geldiğini gör, sonra şiddetlerin toplamını oku.",
    alt: "Bir ila dört bağımsız kaynaktan aynı noktaya oklar gider. Diğer adımda her kaynak toplam şiddete eşit bir blok ekler.",
    param: { label: "Aynı düzeydeki kaynak sayısı", ...noiseSourceCounts },
    steps: ["Ses kaynakları", "Toplam şiddet"],
    draw: (count, step) => step === 1 ? noiseLevel(count) : noiseSources(count),
  },
  [noiseSourcesTitle]: {
    caption: "Aynı noktada birer birim şiddet veren iki kaynağın katkısını birleştir.",
    alt: "İki ayrı kaynaktan tek ölçüm noktasına ok var. İki kaynak birer şiddet birimi ekler.",
    draw: () => noiseSources(2),
  },
  [noiseLevelTitle]: {
    caption: "İki şiddet biriminin toplamı bir kaynaktan yaklaşık üç desibel daha yüksek.",
    alt: "Şiddet ölçeğinde eşit genişlikte iki blok var. Bu örnekte toplam düzey yaklaşık 58 desibel.",
    draw: () => noiseLevel(2),
  },
};
