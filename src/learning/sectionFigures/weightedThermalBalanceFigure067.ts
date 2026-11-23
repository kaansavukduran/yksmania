import { weightedBalance } from "../weightedThermalBalance067";
import { fmt, pt, seg, txt, v, vec, type FigureDef } from "./figureKit";

export const weightedBalanceFigure: FigureDef = {
  caption: "Çözülen örnekte X’in ilk sıcaklığı 75 °C. Sürgüyle başka bir ilk sıcaklık dene ve dengeyi orta noktayla karşılaştır.",
  alt: "Sıcaklık ekseninde Y’nin ve X’in ilk değerleri ile aralarındaki orta nokta ve denge noktası var. Denge, büyük ısı sığalı X’e daha yakın.",
  param: { label: "X’in ilk sıcaklığı (°C)", min: 45, max: 85, init: 75, step: 5 },
  draw: (initial) => {
    const result = weightedBalance(initial);
    const x = (temperature: number) => -4.3 + (temperature - 20) * 0.119;
    return {
      els: [
        vec(v(x(20) - 0.3, 0), v(x(85) + 0.7, 0), { tone: "muted" }),
        txt(v(x(54), -1.04), "Sıcaklık (°C)", "s", { tone: "muted", small: true }),
        pt(v(x(20), 0), "Y · 20 °C", "s", "b"),
        pt(v(x(initial), 0), `X · ${fmt(initial)} °C`, "s", "warn"),
        seg(v(x(result.midpoint), 0), v(x(result.midpoint), 0.8), { tone: "muted", dash: true }),
        txt(v(x(result.midpoint), 0.86), `Orta · ${fmt(result.midpoint)} °C`, "n", { tone: "muted", small: true }),
        seg(v(x(result.equilibrium), 0), v(x(result.equilibrium), 1.9), { tone: "a", bold: true }),
        txt(v(x(result.equilibrium), 2.03), `Denge · ${fmt(result.equilibrium, 2)} °C`, "n", { tone: "a", bold: true }),
      ],
      readout: [
        `Orta nokta ${fmt(result.midpoint)} °C. Denge ${fmt(result.equilibrium, 2)} °C.`,
        "X’in ısı sığası 8mc, Y’ninki 3mc. Denge X’in ilk sıcaklığına daha yakın.",
      ],
    };
  },
};
