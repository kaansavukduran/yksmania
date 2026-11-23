import { equalDepthTitle, fillingGraphTitle, fillingRate, fillingSeconds, fillingShapes, fillingState, waterPressureKPa } from "../mebiHydrostaticFilling";
import { fmt, poly, pt, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

const fit = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 });
const maximumDepth = 2.35;

function vessel(center: number, change: number, level: number, scale = 1): El[] {
  const side = (depth: number) => (4 + change * depth) * scale / 2;
  const y = (depth: number) => depth * 1.5;
  const left = (depth: number) => v(center - side(depth), y(depth));
  const right = (depth: number) => v(center + side(depth), y(depth));
  return [
    ...(level > 0 ? [poly([left(0), right(0), right(level), left(level)], { fill: "b", tone: "b", thin: true })] : []),
    poly([left(maximumDepth), left(0), right(0), right(maximumDepth)], { open: true, tone: "ink", bold: true }),
  ];
}

export const mebiHydrostaticFillingFigures: Record<string, FigureDef> = {
  [equalDepthTitle]: {
    caption: "Üç kapta su ve serbest yüzey aynı. Noktaların düşey derinliği eşit.",
    alt: "Daralan, dik kenarlı ve genişleyen üç kapta eşit düşey derinlikte birer nokta var. Derinliği değiştirince üç nokta birlikte hareket ediyor.",
    param: { label: "Derinlik h (m)", min: 0, max: 1.5, step: 0.25, init: 1 },
    draw: (depth) => {
      const surface = 1.5;
      return {
        els: [-1, 0, 1].flatMap((shape, index) => {
          const center = 3.7 * index;
          const point = v(center, (surface - depth) * 1.5);
          return [
            ...vessel(center, shape, surface, 0.63),
            ...(depth === 0 ? [] : [seg(v(center, surface * 1.5), point, { tone: "a", dash: true })]),
            pt(point, undefined, "n", "a"),
            txt(v(center, -0.38), ["I", "II", "III"][index], "s", { small: true }),
          ];
        }),
        readout: [`Düşey derinlik: ${fmt(depth)} m.`, `I, II ve III: ${fmt(waterPressureKPa(depth))} kPa su basıncı.`],
      };
    },
  },
  [fillingGraphTitle]: {
    caption: "Aynı eğriyi soldan metre, sağdan kilopaskal olarak oku. Sürgüyle dolum zamanını, oklarla kabın biçimini değiştir.",
    alt: "Kap ve zaman grafiği aynı veriyi gösteriyor. Grafiğin sol ekseni su yüksekliği, sağ ekseni suyun tabanda oluşturduğu basınç. Dik kapta eğim sabit, genişleyen kapta azalır, daralan kapta artar.",
    param: { label: "Dolum süresi (s)", min: 0, max: fillingSeconds, step: 0.25, init: fillingSeconds },
    steps: fillingShapes.map(({ label }) => label),
    draw: (time, step) => {
      const shape = fillingShapes[step];
      const state = fillingState(time, step);
      const graphLeft = 4.1;
      const graphWidth = 5;
      const graphRight = graphLeft + graphWidth;
      const at = (t: number) => v(graphLeft + t * graphWidth / fillingSeconds, 1.5 * fillingState(t, step).depth);
      const sample = Array.from({ length: 25 }, (_, i) => at(time * i / 24));
      return {
        els: [
          ...vessel(0, shape.change, state.depth, 0.63),
          vec(v(graphLeft, 0), v(graphRight, 0), { tone: "ink" }),
          vec(v(graphLeft, 0), v(graphLeft, 3.25), { tone: "ink" }),
          vec(v(graphRight, 0), v(graphRight, 3.25), { tone: "ink" }),
          ...[1, 2].flatMap((height) => [
            seg(v(graphLeft, height * 1.5), v(graphRight, height * 1.5), { tone: "muted", dash: true, thin: true }),
            txt(v(graphLeft - 0.15, height * 1.5), String(height), "w", { small: true }),
            txt(v(graphRight + 0.15, height * 1.5), String(waterPressureKPa(height)), "e", { small: true }),
          ]),
          txt(v(graphLeft, 3.46), "h (m)", "n", { small: true }),
          txt(v(graphRight, 3.46), "P (kPa)", "n", { small: true }),
          txt(v(graphLeft, -0.38), "0", "s", { small: true }),
          txt(v(graphRight, -0.38), "3 s", "s", { small: true }),
          txt(v((graphLeft + graphRight) / 2, -0.46), "Zaman", "s", { small: true }),
          ...(time > 0 ? [poly(sample, { open: true, tone: "a", bold: true })] : []),
          pt(at(time), undefined, "n", "a"),
        ],
        readout: [
          `Debi ${fillingRate} m³/s. ${fit.format(time)} s sonra ${fit.format(state.volume)} m³ su.`,
          `Yükseklik ${fit.format(state.depth)} m. Taban su basıncı ${fit.format(state.pressure)} kPa.`,
          `${shape.increase}. O andaki basınç artışı ${fit.format(state.pressureRate)} kPa/s.`,
        ],
      };
    },
  },
};
