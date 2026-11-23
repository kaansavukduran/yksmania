import { heatMaterials, heatPerGramCal, temperatureRise } from "../specificHeat065";
import { fmt, poly, seg, txt, v, type El, type FigureDef } from "./figureKit";

export const specificHeatFigure: FigureDef = {
  caption: "Öz ısı çubuklarını aynı birimle karşılaştır. Birim değişse de maddelerin sırası aynı kalır.",
  alt: "Yedi maddenin öz ısısı aynı ölçekli yatay çubuklarda. Su çubuğu en uzun. Birim seçimiyle aynı değerler yeniden ifade edilir.",
  steps: ["J/(kg·K)", "cal/(g·°C)"],
  draw: (_, step) => {
    const cal = step === 1;
    const data = heatMaterials.map((item) => ({
      name: item.name,
      number: cal ? heatPerGramCal(item.specific) : item.specific,
    }));
    const x = (n: number) => cal ? n * 6 : n * 6 / 4184;
    const els: El[] = [
      seg(v(0, -0.38), v(0, data.length + 0.28), { tone: "muted", thin: true }),
      ...data.flatMap(({ name, number }, index) => {
        const y = data.length - index - 0.86;
        const tip = x(number);
        return [
          txt(v(0, y + 0.17), name, "w", { small: true }),
          poly([v(0, y), v(tip, y), v(tip, y + 0.34), v(0, y + 0.34)], { tone: "b", fill: "b" }),
          txt(v(tip, y + 0.17), fmt(number, 3), "e", { small: true }),
        ];
      }),
      txt(v(6, -0.38), cal ? "cal/(g·°C)" : "J/(kg·K)", "s", { small: true }),
    ];
    return { els, readout: cal ? ["Demir yaklaşık 0,107, su yaklaşık 1,000 cal/(g·°C)."] : ["Demir 448, su 4.186 J/(kg·K)."] };
  },
};

export const equalHeatFigure: FigureDef = {
  caption: "Eşit 1 kg örneklerin her birine verilen enerjiyi değiştir. İki çubuk yalnız sıcaklık artışını gösterir.",
  alt: "Su ve demirin sıcaklık artışı iki yatay çubuk. İkisine de aynı enerji verilse de demir çubuğu daha uzun.",
  param: { label: "Her cisme verilen enerji (J)", min: 2093, max: 8372, init: 4186, step: 2093 },
  draw: (heat) => {
    const compare = heatMaterials.filter(({ name }) => name === "Su" || name === "Demir");
    const data = compare.map(({ name, specific }) => ({ name, change: temperatureRise(heat, 1, specific) }));
    const x = (change: number) => change / 3;
    const els: El[] = [
      seg(v(0, 0), v(x(20), 0), { tone: "muted" }),
      txt(v(x(20), 0), "Sıcaklık artışı (°C)", "s", { small: true }),
      ...data.flatMap(({ name, change }, index) => {
        const y = 2.6 - index * 1.25;
        const tip = x(change);
        return [
          txt(v(0, y + 0.15), name, "w", { bold: true }),
          poly([v(0, y), v(tip, y), v(tip, y + 0.34), v(0, y + 0.34)], { tone: "a", fill: "a" }),
          txt(v(tip, y + 0.17), `${fmt(change, 2)} °C`, "e"),
        ];
      }),
    ];
    return { els, readout: data.map(({ name, change }) => `${name} ${fmt(change, 2)} °C ısınır.`) };
  },
};
