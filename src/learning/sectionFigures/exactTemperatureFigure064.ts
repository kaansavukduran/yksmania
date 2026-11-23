import { temperatureScales } from "../exactTemperature064";
import { fmt, poly, pt, seg, txt, v, type El, type FigureDef } from "./figureKit";

const displayHeight = (celsius: number) => (celsius + 50) / 30;

export const exactTemperatureFigure: FigureDef = {
  caption: "İşareti üç ölçekte aynı fiziksel seviyeye getir. Alt ve üst çizgiler, 1 atmosferde saf su için yaklaşık 0 ve 100 °C referanslarıdır.",
  alt: "Yan yana Celsius, Fahrenheit ve Kelvin sütunları. Her sütundaki işaret aynı sıcaklığı gösterir. Donma ve kaynama iki ortak yatay çizgi.",
  param: { label: "Sıcaklık (°C)", min: -40, max: 100, init: 20, step: 1 },
  draw: (celsius) => {
    const { fahrenheit, kelvin } = temperatureScales(celsius);
    const position = displayHeight(celsius);
    const squares = [
      { x: -4, long: "Celsius", mark: `${fmt(celsius, 2)} °C` },
      { x: 0, long: "Fahrenheit", mark: `${fmt(fahrenheit, 2)} °F` },
      { x: 4, long: "Kelvin", mark: `${fmt(kelvin, 2)} K` },
    ];
    const els: El[] = [
      seg(v(-4.9, displayHeight(0)), v(4.9, displayHeight(0)), { tone: "muted", thin: true, dash: true }),
      seg(v(-4.9, displayHeight(100)), v(4.9, displayHeight(100)), { tone: "muted", thin: true, dash: true }),
      ...squares.flatMap(({ x, long, mark }) => [
        poly([v(x - 0.19, 0), v(x + 0.19, 0), v(x + 0.19, 5.05), v(x - 0.19, 5.05)], { tone: "muted", thin: true }),
        poly([v(x - 0.18, 0), v(x + 0.18, 0), v(x + 0.18, position), v(x - 0.18, position)], { tone: "a", fill: "a" }),
        pt(v(x, position), undefined, "e", "a"),
        txt(v(x + 0.22, position + 0.48), mark, "e", { tone: "a", small: true }),
        txt(v(x, 0), long, "s", { bold: true, small: true }),
      ]),
    ];
    return {
      els,
      readout: [
        `${fmt(celsius, 2)} °C = ${fmt(fahrenheit, 2)} °F = ${fmt(kelvin, 2)} K.`,
        "0 °C = 32 °F = 273,15 K. 100 °C = 212 °F = 373,15 K.",
      ],
    };
  },
};
