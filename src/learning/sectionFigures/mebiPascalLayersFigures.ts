import { layerUnits, pascalAddedPressureTitle, pascalGaugePressures, pistonArea, sensorDepths, sharedLevelPressures, sharedLevelTitle } from "../mebiPascalLayers";
import { poly, pt, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

const display = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 });
const number = (value: number) => display.format(value);

function rect(left: number, bottom: number, right: number, top: number, fill: Tone): El {
  return poly([v(left, bottom), v(right, bottom), v(right, top), v(left, top)], { fill, tone: fill, thin: true });
}

export const mebiPascalLayersFigures: Record<string, FigureDef> = {
  [pascalAddedPressureTitle]: {
    caption: "Pistonu itince iki ölçer de aynı artışı gösterir. İki noktanın derinliği değişmez.",
    alt: "Kapalı, su dolu tek kapta piston ve biri 1 metre, diğeri 2 metre derinlikte iki basınç ölçeri var. İki ölçerde aynı basınç artar, başlangıçtaki basınç farkı korunur.",
    param: { label: "Pistona ek kuvvet (N)", min: 0, max: 80, step: 10, init: 40 },
    draw: (force) => {
      const { increment, gauges } = pascalGaugePressures(force);
      const pistonY = 4.6;
      const pins = sensorDepths.map((depth) => pistonY - 1.58 * depth);
      return {
        els: [
          rect(0, 0, 5.3, pistonY, "b"),
          poly([v(0, pistonY + 0.2), v(0, 0), v(5.3, 0), v(5.3, pistonY + 0.2)], { open: true, tone: "ink", bold: true }),
          seg(v(0, pistonY), v(5.3, pistonY), { tone: "ink", bold: true }),
          ...(force > 0 ? [vec(v(2.7, pistonY + 0.35 + force / 60), v(2.7, pistonY + 0.15), { tone: "a", bold: true })] : []),
          txt(v(2.7, pistonY + 0.64 + force / 60), `${number(force)} N`, "n", { small: true }),
          ...pins.flatMap((y, index) => [
            seg(v(1.55, y), v(5.3, y), { tone: "muted", dash: true }),
            pt(v(4.2, y), undefined, "n", "a"),
            txt(v(1.3, y + 0.14), `${sensorDepths[index]} m`, "w", { small: true }),
            txt(v(5.65, y), `${number(gauges[index])} kPa`, "e", { small: true }),
          ]),
        ],
        readout: [
          `Piston alanı ${number(pistonArea)} m². Her ölçere ${number(increment)} kPa eklenir.`,
          `1 m: ${number(gauges[0])} kPa. 2 m: ${number(gauges[1])} kPa. Fark ${number(gauges[1] - gauges[0])} kPa.`,
        ],
      };
    },
  },
  [sharedLevelTitle]: {
    caption: "Açık yüzeyden T ve N seviyesine kadar her sıvı katmanını ayrı say.",
    alt: "U borusunda T ve N aynı yatay seviyede. T'nin üstünde 4h L sıvısı var. N'nin üstünde 2h K sıvısı ve h M sıvısı var. M borunun altından iki kolu birbirine bağlar.",
    param: { label: "Katman birimi h (m)", min: 0.05, max: 0.15, step: 0.025, init: 0.1 },
    draw: (h) => {
      const state = sharedLevelPressures(h);
      const u = 11 * h;
      const level = 0.9;
      const rightInterface = level + layerUnits.connectedRight * u;
      const leftSurface = level + layerUnits.left * u;
      const rightSurface = rightInterface + layerUnits.upperRight * u;
      return {
        els: [
          poly([v(0, 0), v(8.2, 0), v(8.2, rightInterface), v(5.8, rightInterface), v(5.8, 0.5), v(2.4, 0.5), v(2.4, level), v(0, level)], { fill: "b", tone: "b", thin: true }),
          rect(0, level, 2.4, leftSurface, "c"),
          rect(5.8, rightInterface, 8.2, rightSurface, "a"),
          poly([v(0, leftSurface + 0.65), v(0, 0), v(8.2, 0), v(8.2, rightSurface + 0.65)], { open: true, tone: "ink", bold: true }),
          poly([v(2.4, leftSurface + 0.65), v(2.4, 0.5), v(5.8, 0.5), v(5.8, rightSurface + 0.65)], { open: true, tone: "ink", bold: true }),
          seg(v(0, level), v(8.2, level), { tone: "muted", dash: true }),
          pt(v(1.2, level), "T", "w", "ink"),
          pt(v(7, level), "N", "e", "ink"),
          txt(v(1.2, leftSurface + 0.15), "L · 4h", "n", { small: true }),
          txt(v(7, rightSurface + 0.15), "K · 2h", "n", { small: true }),
          txt(v(8.48, (rightInterface + level) / 2), "M · h", "e", { small: true }),
          txt(v(4.1, -0.37), "Bağlı M sıvısı", "s", { small: true }),
        ],
        readout: [
          `T: ${number(state.left)} kPa. N: ${number(state.upperRight)} + ${number(state.connectedRight)} = ${number(state.right)} kPa.`,
          "Hava katkısı iki tarafta da aynı olduğu için toplam basınçlar eşit.",
        ],
      };
    },
  },
};
