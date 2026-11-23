import { fillingBaseArea, fillingShapes } from "../mebiHydrostaticFilling";
import { baseAndWeight, baseForceTitle, loadedSurfaces, surfaceForce, surfaceForceTitle } from "../mebiHydrostaticForces";
import { fillingVessel } from "./mebiHydrostaticFillingFigures";
import { add, mul, poly, txt, unit, v, vec, type FigureDef, type V } from "./figureKit";

const number = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 });
const format = (value: number) => number.format(value);

export const mebiHydrostaticForceFigures: Record<string, FigureDef> = {
  [surfaceForceTitle]: {
    caption: "Her ok yüzeye diktir. Bir yüzeyi seçince geometrik merkezinin derinliği ve gerçek alanı kullanılır.",
    alt: "Su kesiti solda dik duvar, altta yatay taban, sağda eğik duvardan oluşuyor. Su bu yüzeylere sırayla sola, aşağı ve eğik olarak sağa aşağı kuvvet uygular.",
    param: { label: "Derinlik birimi h (m)", min: 0.25, max: 0.75, step: 0.25, init: 0.5 },
    steps: loadedSurfaces.map(({ label }) => label),
    draw: (h, step) => {
      const top = 4 * h;
      const baseRight = 4.5;
      const slope = 0.55;
      const rightTop = baseRight + slope * top;
      const points: V[] = [v(0, top / 2), v(baseRight / 2, 0), v((baseRight + rightTop) / 2, top / 2)];
      const normals: V[] = [v(-1, 0), v(0, -1), unit(v(1, -slope))];
      const { depth, area, force } = surfaceForce(h, step);
      return {
        els: [
          poly([v(0, 0), v(baseRight, 0), v(rightTop, top), v(0, top)], { fill: "b", tone: "b", thin: true }),
          poly([v(0, top + 0.7), v(0, 0), v(baseRight, 0), v(rightTop + slope * 0.7, top + 0.7)], { open: true, tone: "ink", bold: true }),
          txt(v(rightTop / 2, top + 0.13), "Serbest yüzey", "n", { small: true }),
          ...points.flatMap((point, i) => {
            const end = add(point, mul(normals[i], 0.006 * surfaceForce(h, i).force));
            const tone = i === step ? "a" : "muted";
            return [vec(point, end, { tone, bold: i === step }), txt(end, ["F₁", "F₂", "F₃"][i], i === 0 ? "w" : i === 1 ? "s" : "e", { small: true, tone })];
          }),
        ],
        readout: [`${loadedSurfaces[step].label}: merkez derinliği ${format(depth)} m, alan ${format(area)} m².`, `Kuvvet ${format(force)} N.`],
      };
    },
  },
  [baseForceTitle]: {
    caption: "Üç durumda da su miktarı ve kap tabanı aynı. Kenar eğilince su yüksekliği ve taban kuvveti değişir.",
    alt: "Tabanı aynı olan dik, genişleyen ve daralan kaplar eşit hacimde su içeriyor. Yüzey yüksekliği ve tabana doğru kuvvet oku kap değiştikçe değişiyor.",
    steps: fillingShapes.map(({ label }) => label),
    draw: (_, step) => {
      const { depth, volume, pressure, weight, baseForce } = baseAndWeight(step);
      return {
        els: [
          ...fillingVessel(0, fillingShapes[step].change, depth, 0.9),
          vec(v(0, 0), v(0, -baseForce / weight), { tone: "a", bold: true }),
          txt(v(0, -baseForce / weight - 0.1), "Taban kuvveti", "s", { small: true }),
          txt(v(0, 3.8), `h = ${format(depth)} m`, "n", { small: true }),
        ],
        readout: [
          `Su ${format(volume)} m³, ağırlığı ${format(weight / 1000)} kN. Taban alanı ${fillingBaseArea} m².`,
          `Taban basıncı ${format(pressure)} kPa. Taban kuvveti ${format(baseForce / 1000)} kN.`,
        ],
      };
    },
  },
};
