import { heatingMass, heatingPoints, heatingStages } from "../heatingCurve066";
import { fmt, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

export const heatingCurveFigure: FigureDef = {
  caption: "Yatay eksen ilk andan beri verilen ısıdır. Kütleyi değiştir. Adımlarla bir aralık seç ve sıcaklığın değişip değişmediğine bak.",
  alt: "Sıcaklığın birikimli verilen ısıya bağlı çizimi. Buz, su ve buharın ısındığı eğimli bölümler ile erime ve kaynamanın yatay bölümleri var.",
  steps: heatingStages.map((stage) => stage.name),
  param: { label: "Su numunesinin kütlesi", min: 100, max: 200, step: 25, init: heatingMass * 1_000, unit: " g" },
  draw: (grams, step) => {
    const points = heatingPoints(grams / 1_000);
    const x = (q: number) => -4.7 + q * 0.0135;
    const y = (temperature: number) => temperature * 0.024;
    const axisEnd = 640;
    const els: El[] = [
      vec(v(x(0), -0.75), v(x(0), 3.22), { tone: "muted" }),
      vec(v(x(0), -0.75), v(x(axisEnd), -0.75), { tone: "muted" }),
      txt(v(x(0), 3.29), "Sıcaklık (°C)", "n", { small: true }),
      txt(v(x(axisEnd / 2), -1.78), "Verilen ısı (kJ)", "s", { small: true }),
      ...[0, 150, 300, 450, 600].flatMap((q) => [
        seg(v(x(q), -0.75), v(x(q), -0.85), { tone: "muted", thin: true }),
        txt(v(x(q), -0.92), String(q), "s", { small: true }),
      ]),
    ];
    for (const temperature of [0, 100]) {
      els.push(
        seg(v(x(0), y(temperature)), v(x(axisEnd), y(temperature)), { tone: "muted", dash: true, thin: true }),
        txt(v(x(0), y(temperature)), String(temperature), "w", { small: true }),
      );
    }
    for (let i = 0; i < heatingStages.length; i++) {
      const [from, to] = [points[i], points[i + 1]];
      els.push(seg(v(x(from.totalKj), y(from.temperature)), v(x(to.totalKj), y(to.temperature)), {
        tone: i === step ? "a" : "muted",
        bold: i === step,
      }));
    }
    const stage = heatingStages[step];
    const [from, to] = [points[step], points[step + 1]];
    return {
      els,
      readout: [
        `${fmt(grams)} g. ${stage.label}.`,
        `Toplam verilen ısı ${fmt(from.totalKj, 2)} kJ’den ${fmt(to.totalKj, 2)} kJ’ye çıkıyor.`,
        `Yalnız bu aralığın ısısı ${fmt(to.totalKj - from.totalKj, 2)} kJ.`,
        `Beş aralığın toplamı ${fmt(points[points.length - 1].totalKj, 2)} kJ.`,
      ],
    };
  },
};
