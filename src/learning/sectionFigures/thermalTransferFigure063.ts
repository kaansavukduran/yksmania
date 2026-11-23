import { thermalPairAt } from "../thermalTransfer063";
import { fmt, poly, txt, v, vec, type El, type FigureDef } from "./figureKit";

export const thermalTransferFigure: FigureDef = {
  caption: "İki eş ısı sığalı cisim arasında ısı geçişini izle. Sıcak başlayan cismin sıcaklığını değiştir.",
  alt: "Solda başlangıçta sıcak, sağda başlangıçta soğuk cisim. Fark varken ortadaki ok sağa bakar. Denge adımında ok yerine eşit sıcaklık gösterilir.",
  steps: ["Başlangıç", "Aktarımın yarısı", "Denge"],
  param: { label: "Sıcak cismin ilk sıcaklığı (°C)", min: 40, max: 80, init: 60, step: 5 },
  draw: (initial, step) => {
    const current = thermalPairAt(initial, step / 2);
    const square = (left: number) => [
      v(left, 0), v(left + 2.5, 0), v(left + 2.5, 1.7), v(left, 1.7),
    ];
    const els: El[] = [
      poly(square(-4.2), { tone: step === 2 ? "a" : "warn", fill: step === 2 ? "a" : "warn" }),
      poly(square(1.7), { tone: step === 2 ? "a" : "b", fill: step === 2 ? "a" : "b" }),
      txt(v(-2.95, 1.7), `${fmt(current.hot)} °C`, "n"),
      txt(v(2.95, 1.7), `${fmt(current.cold)} °C`, "n"),
      ...(step === 2
        ? [txt(v(0, 0.84), "Eşit", "c", { bold: true })]
        : [vec(v(-1.45, 0.84), v(1.45, 0.84), { tone: "a", bold: true }), txt(v(0, 0.84), "Isı akışı", "n", { small: true })]),
    ];
    return {
      els,
      readout: [
        `Sıcak başlayan ${fmt(current.hot)} °C, soğuk başlayan ${fmt(current.cold)} °C. Şimdiye kadar ${fmt(current.transferred)} J aktarıldı.`,
        step === 2 ? "Sıcaklıklar eşit. Net ısı aktarımı durdu." : "Net enerji akışı sıcak taraftan soğuk tarafa.",
      ],
    };
  },
};
