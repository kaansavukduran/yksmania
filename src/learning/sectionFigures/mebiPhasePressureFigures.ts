import {
  boilingEnvironments,
  lowPressureBoilingTitle,
  meltingCases,
  pressureMeltingTitle,
  waterBoilingState,
  waterBoilingTitle,
  waterSaturation,
} from "../mebiPhasePressure";
import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

function pot(x: number, environment: typeof boilingEnvironments[number], temperature: number, label: string): El[] {
  const state = waterBoilingState(temperature, environment);
  const left = x - 1.46;
  const right = x + 1.46;
  const waterline = 1.34;
  const height = 2.9;
  const elements = [
    poly([v(left, 0), v(right, 0), v(right, waterline), v(left, waterline)], { fill: "b", tone: "b" }),
    poly([v(left, height), v(left, 0), v(right, 0), v(right, height)], { open: true, bold: true }),
    vec(v(x - 0.93, waterline + 0.22 + 0.6 * state.externalPressure / waterSaturation[3].pressure), v(x - 0.93, waterline + 0.22), { tone: "warn" }),
    txt(v(x, -0.32), label, "s", { small: true, bold: true }),
  ];
  if (environment.closed) {
    elements.push(seg(v(left - 0.17, height), v(right + 0.17, height), { bold: true }));
    elements.push(poly([v(x - 0.24, height), v(x - 0.24, height + 0.32), v(x + 0.24, height + 0.32), v(x + 0.24, height)], { open: true, bold: true }));
  }
  if (state.boiling >= 0) {
    elements.push(circle(v(x - 0.53, 0.5), 0.14, { tone: "ink" }));
    elements.push(circle(v(x + 0.33, 0.88), 0.2, { tone: "ink" }));
    elements.push(circle(v(x + 0.64, 0.36), 0.1, { tone: "ink" }));
  }
  return elements;
}

const waterBoilingFigure: FigureDef = {
  caption: "Ok, su yüzeyine etki eden basıncı gösterir. Kaynama eşiğine ulaşınca suyun içinde buhar kabarcıkları çizilir.",
  alt: "Suyla dolu bir kap. Yukarıdan sıvıya doğru basınç oku var. Sıcaklık ve seçilen basınç, suyun içinde kabarcıkların görünmesini belirler.",
  param: { label: "Suyun sıcaklığı", min: 90, max: 120, step: 10, init: 90, unit: " °C" },
  steps: boilingEnvironments.map(({ label }) => label),
  draw: (temperature, step) => {
    const environment = boilingEnvironments[step];
    const state = waterBoilingState(temperature, environment);
    const result = state.boiling < 0 ? "Kaynama eşiğinin altında." : state.boiling > 0 ? "Kaynama eşiği aşılır." : "Kaynama eşiğine ulaşıldı.";
    return {
      els: pot(0, environment, temperature, environment.closed ? "Kapalı kap" : "Açık kap"),
      readout: [
        `Doymuş buhar basıncı: ${fmt(state.vaporPressure, 2)} kPa.`,
        `Su yüzeyindeki basınç: ${fmt(state.externalPressure, 2)} kPa.`,
        result,
      ],
    };
  },
};

const meltingPressureFigure: FigureDef = {
  caption: "Basıncı artırıp noktanın düşey hareketine bak. Grafik erime sıcaklığının değişim yönünü gösterir.",
  alt: "Yatay eksen basınç, düşey eksen erime sıcaklığı. Seçilen maddenin eğilimi tek bir çizgiyle ve basınç düzeyi hareketli bir noktayla gösteriliyor.",
  param: { label: "Basınç düzeyi", min: 1, max: 3, step: 1, init: 2 },
  steps: meltingCases.map(({ material }) => material),
  draw: (pressure, step) => {
    const change = meltingCases[step];
    const height = (level: number) => 1.4 + 0.48 * change.slope * (level - 1);
    return {
      els: [
        vec(v(0, 0), v(4.15, 0)),
        vec(v(0, 0), v(0, 3.04)),
        txt(v(0, 3.22), "Erime sıcaklığı", "e", { small: true, bold: true }),
        txt(v(4.3, 0), "Basınç", "s", { small: true, bold: true }),
        seg(v(1, height(1)), v(3.5, height(3.5)), { tone: "a", bold: true }),
        seg(v(pressure, 0), v(pressure, height(pressure)), { tone: "muted", dash: true }),
        circle(v(pressure, height(pressure)), 0.08, { tone: "a", fill: "a" }),
      ],
      readout: [`${change.material} erirken hacim ${change.volume.toLocaleLowerCase("tr-TR")}. Basınç arttıkça erime sıcaklığı ${change.temperature.toLocaleLowerCase("tr-TR")}.`],
    };
  },
};

export const mebiPhasePressureFigures: Record<string, FigureDef> = {
  [waterBoilingTitle]: waterBoilingFigure,
  [pressureMeltingTitle]: meltingPressureFigure,
  [lowPressureBoilingTitle]: {
    caption: "Su iki kapta da 90 °C. Yalnız atmosfer basıncı farklı.",
    alt: "A ve B açık kaplarında su aynı sıcaklıkta. A’daki daha düşük atmosfer basıncında buhar kabarcıkları görülür.",
    draw: () => ({
      els: [...pot(-2.2, boilingEnvironments[0], 90, "A kabı"), ...pot(2.2, boilingEnvironments[1], 90, "B kabı")],
      readout: ["A kabı eşikte: 70,18 = 70,18 kPa.", "B kabı eşik altında: 70,18 < 101,42 kPa."],
    }),
  },
};
