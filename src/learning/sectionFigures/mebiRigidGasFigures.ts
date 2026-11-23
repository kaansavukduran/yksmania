import { rigidGasExperiments, rigidGasState } from "../mebiRigidGasReadings";
import { add, circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

function vessel(x: number, state: ReturnType<typeof rigidGasState>, label: string): El[] {
  const height = 1.95 * state.volume;
  const gauge = v(x, height + 0.66);
  const needleAngle = Math.PI * (1.25 - state.pressureAtm / 2);
  const count = Math.round(8 * state.amount);
  return [
    poly([v(x - 1.65, 0), v(x + 1.65, 0), v(x + 1.65, height), v(x - 1.65, height)],
      { fill: "muted", tone: "ink" }),
    seg(v(x, height), v(x, height + 0.29)),
    circle(gauge, 0.39, { tone: "ink" }),
    vec(gauge, add(gauge, v(0.29 * Math.cos(needleAngle), 0.29 * Math.sin(needleAngle))), { tone: "a" }),
    ...Array.from({ length: count }, (_, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      const particle = v(x - 1.21 + 0.68 * col + 0.17 * (row % 2), height * (0.15 + 0.22 * row));
      const sign = (row + col) % 2 ? 1 : -1;
      const displacement = v(sign * 0.13 * Math.sqrt(state.temperature), 0);
      return [
        circle(particle, 0.07, { tone: "c", fill: "c", thin: true }),
        seg(particle, add(particle, displacement), { tone: "c", thin: true }),
      ];
    }).flat(),
    txt(v(x, -0.39), label, "s", { small: true }),
    txt(v(x, height + 1.15), `${fmt(state.pressureAtm)} atm`, "n", { small: true }),
  ];
}

export const mebiRigidGasFigure: FigureDef = {
  caption: "Üç deneyde sırayla yalnız bir nicelik değişiyor. Basınç göstergesi ve sayı aynı hesapla güncellenir.",
  alt: "İlk ve son gaz kapları yan yana. Kap yüksekliği hacim oranını, noktalar gaz miktarını gösterir. Noktaların kısa izleri sıcaklık arttıkça uzar. Basınç ölçerler hesaplanan değeri gösterir.",
  param: { label: "Değişim katsayısı", min: 1, max: 2, step: 0.25, init: 2 },
  steps: rigidGasExperiments.map(({ label }) => label),
  draw: (factor, step) => {
    const experiment = rigidGasExperiments[step];
    const before = rigidGasState(experiment, 1);
    const after = rigidGasState(experiment, factor);
    return {
      els: [...vessel(0, before, "İlk durum"), ...vessel(4.7, after, "Son durum")],
      readout: [
        `Basınç: ${fmt(before.pressureAtm)} → ${fmt(after.pressureAtm)} atm.`,
        `Sıcaklık: ${fmt(after.temperature)}T · Hacim: ${fmt(after.volume)}V · Miktar: ${fmt(after.amount)}n.`,
      ],
    };
  },
};

export const gasExpansionExampleFigure: FigureDef = {
  ...mebiRigidGasFigure,
  caption: "Sıcaklık ve gaz miktarı sabit. Gazın tamamı daha geniş hacimli kaba aktarılıyor.",
  steps: undefined,
  param: undefined,
  draw: () => mebiRigidGasFigure.draw(2, 1),
};
