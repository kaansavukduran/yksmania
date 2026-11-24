import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame, type Tone } from "./figureKit";
import {
  forkDriveHz, forkRangeHz, forkRelativeResponse, resonanceResponseTitle,
  resonanceTitle, resonanceTransferTitle,
} from "../mebiSoundResonance";

function fork(x: number, response: number, tone: Tone): El[] {
  const swing = response * 0.42;
  const tines = (offset: number) => [
    v(x - 0.72 - offset, 3.65), v(x - 0.62 - offset * 0.3, 1.75), v(x - 0.35, 1.4),
    v(x + 0.35, 1.4), v(x + 0.62 + offset * 0.3, 1.75), v(x + 0.72 + offset, 3.65),
  ];
  return [
    poly(tines(-swing), { tone, open: true, thin: true, dash: true }),
    poly(tines(swing), { tone, open: true, bold: true }),
    seg(v(x, 1.4), v(x, 0.6), { tone, bold: true }),
    poly([v(x - 1.15, 0.33), v(x + 1.15, 0.33), v(x + 1.15, 0.6), v(x - 1.15, 0.6)], { tone: "ink", fill: "muted" }),
  ];
}

function transferFrame(naturalHz: number): FigureFrame {
  const response = forkRelativeResponse(naturalHz);
  return {
    els: [
      ...fork(2.5, 1, "a"), ...fork(9.6, response, "c"),
      seg(v(0.15, 3.1), v(1.09, 3.95), { tone: "ink", bold: true }),
      circle(v(1.13, 4.02), 0.23, { tone: "muted", fill: "muted" }),
      vec(v(4.25, 2.57), v(7.85, 2.57), { tone: "b" }),
      txt(v(6.05, 3.1), "Hava", "n", { tone: "b" }),
      txt(v(2.5, 4.92), "Vurulan diyapazon", "n", { tone: "a", small: true }),
      txt(v(9.6, 4.92), "İkinci diyapazon", "n", { tone: "c", small: true }),
      txt(v(2.5, -0.05), `${forkDriveHz} Hz kaynak`, "s", { tone: "a", small: true }),
      txt(v(9.6, -0.05), `${naturalHz} Hz doğal`, "s", { tone: "c", small: true }),
    ],
    readout: [
      `Havadaki zorlama frekansı ${forkDriveHz} Hz. İkinci diyapazonun doğal frekansı ${naturalHz} Hz.`,
      `İkinci diyapazonun göreli genliği ${fmt(response, 2)}. Kesik çizgi uçların salınımdaki öteki konumunu gösterir.`,
    ],
  };
}

function responseFrame(naturalHz: number, showExample = false): FigureFrame {
  const { min, max } = forkRangeHz;
  const x = (f: number) => 12 * (f - min) / (max - min);
  const y = (f: number) => 3.7 * forkRelativeResponse(f);
  const frequencies = Array.from({ length: max - min + 1 }, (_, index) => min + index);
  return {
    els: [
      seg(v(0, 0), v(12, 0), { tone: "ink" }),
      seg(v(0, 0), v(0, 3.95), { tone: "ink" }),
      seg(v(0, 3.7), v(x(forkDriveHz), 3.7), { tone: "muted", dash: true, thin: true }),
      seg(v(x(forkDriveHz), 0), v(x(forkDriveHz), 3.7), { tone: "a", dash: true, thin: true }),
      poly(frequencies.map(f => v(x(f), y(f))), { tone: "c", open: true, bold: true }),
      ...[min, 400, forkDriveHz, 480, max].flatMap((f): El[] => [
        seg(v(x(f), 0), v(x(f), -0.15), { tone: "muted" }),
        txt(v(x(f), -0.42), String(f), "s", { small: true }),
      ]),
      txt(v(-0.38, 0), "0", "w", { small: true }),
      txt(v(-0.38, 3.7), "1", "w", { small: true }),
      txt(v(6, 4.62), "Göreli tepki genliği", "n", { small: true }),
      txt(v(6, -1.16), "Doğal frekans (Hz)", "s", { small: true }),
      circle(v(x(naturalHz), y(naturalHz)), 0.14, { tone: "a", fill: "a" }),
      ...(showExample ? [circle(v(x(400), y(400)), 0.13, { tone: "b", fill: "b" })] : []),
    ],
    readout: showExample ? [
      `400 Hz’de göreli genlik ${fmt(forkRelativeResponse(400), 2)}. 440 Hz’de göreli genlik 1.`,
      "En büyük model genliği, kaynak ve doğal frekans eşleştiğinde görülür.",
    ] : [
      `Doğal frekans ${naturalHz} Hz, göreli genlik ${fmt(forkRelativeResponse(naturalHz), 2)}.`,
      `Kesik çizgi kaynak frekansını gösterir. ${forkDriveHz} Hz’de göreli genlik 1.`,
    ],
  };
}

export const tuningForkFigures: Record<string, FigureDef> = {
  [resonanceTitle]: {
    caption: "İkinci diyapazonun doğal frekansını değiştir. Önce sesin havadan geçtiği yolu, sonra tepki genliğinin nasıl değiştiğini incele.",
    alt: "İki diyapazon hava ile birbirine bağlanır. Sonraki adımda ikinci diyapazonun doğal frekansına göre sonlu bir tepki eğrisi çizilir.",
    param: { label: "İkinci diyapazonun doğal frekansı", ...forkRangeHz, init: forkDriveHz, unit: " Hz" },
    steps: ["Düzenek", "Tepki eğrisi"],
    draw: (naturalHz, step) => step === 1 ? responseFrame(naturalHz) : transferFrame(naturalHz),
  },
  [resonanceTransferTitle]: {
    caption: "Çekiç sol diyapazonu harekete geçirir. Havadaki basınç değişimi sağdaki diyapazona ulaşır.",
    alt: "Solda çekiç ve 440 Hz kaynak, ortada hava oku, sağda 440 Hz doğal frekanslı diyapazon.",
    draw: () => transferFrame(forkDriveHz),
  },
  [resonanceResponseTitle]: {
    caption: "400 ve 440 Hz’deki tepkiyi kıyasla.",
    alt: "400 Hz doğal frekanstaki tepki 440 Hz’deki sonlu tepe noktasından daha alçaktır.",
    draw: () => responseFrame(forkDriveHz, true),
  },
};
