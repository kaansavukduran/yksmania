import { kineticFriction, pathDistance, pullingForce, workPowerOver } from "../averageWorkPower";
import { fmt, poly, pt, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

const workDirections: El[] = [
  seg(v(-0.5, 0), v(8, 0), { tone: "muted", bold: true }),
  poly([v(0, 0), v(1, 0), v(1, 1), v(0, 1)], { tone: "b", fill: "b" }),
  poly([v(6, 0), v(7, 0), v(7, 1), v(6, 1)], { tone: "b", thin: true }),
  vec(v(1, 0.55), v(3.4, 0.55), { tone: "a", bold: true }),
  txt(v(2.2, 0.55), `Çekme ${pullingForce} N`, "n", { tone: "a" }),
  vec(v(0, 0.55), v(-0.8, 0.55), { tone: "warn", bold: true }),
  txt(v(-0.4, 0.55), `Sürtünme ${kineticFriction} N`, "n", { tone: "warn" }),
  vec(v(0.5, -0.9), v(6.5, -0.9), { tone: "c" }),
  txt(v(3.5, -0.9), `Yer değiştirme ${pathDistance} m`, "s", { tone: "c" }),
];

export const averageWorkPowerFigure: FigureDef = {
  caption: "Çekme ve sürtünme ters yönlerde. Aynı yolu alma süresini değiştir, işin ve ortalama gücün nasıl değiştiğini karşılaştır.",
  alt: "Başlangıç ve bitiş kutusu yatayda 6 metre aralıktadır. Çekme oku sağa, sürtünme oku sola gösterilir. Diğer adımlarda iş ve güç çubukları karşılaştırılır.",
  steps: ["Kuvvetler ve yol", "İş ve enerji", "Ortalama güç"],
  param: { label: "Geçen süre (s)", min: 1, max: 2, init: 2, step: 0.25 },
  draw: (seconds, step) => {
    const result = workPowerOver(seconds);
    if (step === 0) {
      return {
        els: workDirections,
        readout: [
          `Kutu ${fmt(seconds)} s’de ${pathDistance} m gidiyor. İlk hızı ${fmt(result.initialSpeed, 2)} m/s, son hızı ${fmt(result.finalSpeed, 2)} m/s.`,
          `Yer değiştirme sağa. Çekme ve sürtünme birbirine ters. Çekmenin ortalama gücü ${fmt(result.pullPower, 2)} W.`,
        ],
      };
    }

    const power = step === 2;
    const entries = power ? [
      { name: "Çekme", value: result.pullPower, tone: "a" },
      { name: "Net", value: result.netPower, tone: "c" },
    ] as const : [
      { name: "Çekme", value: result.pullWork, tone: "a" },
      { name: "Sürtünme", value: result.frictionWork, tone: "warn" },
      { name: "Net", value: result.netWork, tone: "c" },
    ] as const;
    const unit = power ? "W" : "J";
    const els: El[] = [
      seg(v(0, -0.65), v(0, entries.length + 0.1), { tone: "muted", dash: true }),
      pt(v(0, -0.65), "0", "s"),
      ...entries.flatMap(({ name, value, tone }, index) => {
        const y = entries.length - index - 0.5;
        const tip = value / 12;
        return [
          vec(v(0, y), v(tip, y), { tone, bold: true }),
          txt(v((Math.min(0, tip) + Math.max(0, tip)) / 2, y), `${name} ${fmt(value, 2)} ${unit}`, "n", { tone }),
        ];
      }),
    ];
    return {
      els,
      readout: power
        ? [
            `Ortalama çekme gücü = ${result.pullWork} / ${fmt(seconds)} = ${fmt(result.pullPower, 2)} W.`,
            `Net ortalama güç = ${result.netWork} / ${fmt(seconds)} = ${fmt(result.netPower, 2)} W.`,
          ]
        : [
            `Çekme işi +${result.pullWork} J, sürtünme işi −${-result.frictionWork} J. Kinetik enerji ${result.netWork} J artıyor.`,
            "Yol ve kuvvetler aynı kaldığı için süre değişince iş değişmiyor.",
          ],
    };
  },
};

export const averageWorkPowerComparison: FigureDef = {
  ...averageWorkPowerFigure,
  caption: "Çekmenin ortalama gücü, kutuya yaptığı işi süreye böler. Çekmenin gücünü net güçle karşılaştır.",
  alt: "İki yatay sütun çekmenin ortalama gücü ile net ortalama gücü aynı watt ölçeğinde karşılaştırır.",
  steps: undefined,
  draw: (seconds) => averageWorkPowerFigure.draw(seconds, 2),
};
