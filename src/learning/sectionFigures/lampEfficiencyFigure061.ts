import { filamentEfficiency, lampBudget } from "../lampEfficiency061";
import { fmt, poly, seg, txt, v, type El, type FigureDef } from "./figureKit";

function lampSymbol(y: number, led: boolean): El[] {
  const x = -0.75;
  const shell = [
    v(x - 0.27, y + 0.2), v(x - 0.45, y + 0.55), v(x - 0.39, y + 0.82),
    v(x - 0.2, y + 0.94), v(x + 0.2, y + 0.94), v(x + 0.39, y + 0.82),
    v(x + 0.45, y + 0.55), v(x + 0.27, y + 0.2), v(x - 0.27, y + 0.2),
  ];
  return [
    poly(shell, { open: true, tone: "muted" }),
    seg(v(x - 0.2, y + 0.1), v(x + 0.2, y + 0.1), { tone: "muted" }),
    led
      ? seg(v(x - 0.29, y + 0.56), v(x + 0.29, y + 0.56), { tone: "a", bold: true })
      : poly([v(x - 0.18, y + 0.46), v(x - 0.07, y + 0.64),
          v(x + 0.07, y + 0.48), v(x + 0.18, y + 0.62)], { open: true, tone: "a" }),
  ];
}

function budgetRow(y: number, name: string, budget: ReturnType<typeof lampBudget>): El[] {
  const x = (watts: number) => watts / 9;
  const rectangle = (start: number, end: number) => [v(x(start), y), v(x(end), y), v(x(end), y + 0.52), v(x(start), y + 0.52)];
  return [
    txt(v(0, y + 0.55), name, "ne", { bold: true }),
    poly(rectangle(0, budget.useful), { tone: "a", fill: "a" }),
    poly(rectangle(budget.useful, budget.input), { tone: "b", fill: "b" }),
    txt(v(x(budget.input), y + 0.26), `${fmt(budget.input, 2)} W giriş`, "e", { small: true }),
  ];
}

export const lampEfficiencyFigure: FigureDef = {
  caption: "İki lambanın yararlı çıkışı 6 W. LED örneğinin verimini değiştir. Çubukların tamamı elektrik girişini gösterir.",
  alt: "Flamanlı ve LED lamba çizimleri, iki yatay giriş çubuğunun yanında. Her çubuğun ilk kısmı 6 watt görünür ışık, kalan kısmı diğer çıkışlardır.",
  param: { label: "LED örnek verimi (%)", min: 15, max: 50, init: 25, step: 5 },
  draw: (percent) => {
    const filament = lampBudget(filamentEfficiency);
    const led = lampBudget(percent / 100);
    const els: El[] = [
      ...lampSymbol(2.35, false),
      ...budgetRow(2.5, "Flamanlı · %10", filament),
      ...lampSymbol(0.8, true),
      ...budgetRow(0.95, `LED · %${percent}`, led),
      seg(v(0, 0), v(60 / 9, 0), { tone: "muted" }),
      ...[0, 20, 40, 60].flatMap((power) => [
        seg(v(power / 9, -0.1), v(power / 9, 0.1), { tone: "muted", thin: true }),
        txt(v(power / 9, 0), `${power} W`, "s", { small: true }),
      ]),
    ];
    return {
      els,
      readout: [
        `Flamanlı: 60 W giriş = 6 W ışık + 54 W diğer çıkış.`,
        `LED: ${fmt(led.input, 2)} W giriş = 6 W ışık + ${fmt(led.other, 2)} W diğer çıkış.`,
      ],
    };
  },
};
