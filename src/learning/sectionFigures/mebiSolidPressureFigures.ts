import { brickPressure, brickPressureRatio, brickPressureTitle, brickStacks, prismBaseAreas, prismHeightMetres, prismPressure, uprightPrismTitle } from "../mebiSolidPressure";
import { fmt, poly, seg, txt, v, type El, type FigureDef } from "./figureKit";

const ground = (x: number, width: number) => seg(v(x, 0), v(x + width, 0), { tone: "ink", bold: true });

function slab(x: number, bottom: number, width: number, height: number, highlighted: boolean): El {
  const tone = highlighted ? "a" : "b";
  return poly([v(x, bottom), v(x + width, bottom), v(x + width, bottom + height), v(x, bottom + height)], { tone, fill: tone });
}

export const mebiSolidPressureFigures: Record<string, FigureDef> = {
  [brickPressureTitle]: {
    caption: "Alt tuğlanın zemine değen yüzünü seç. Yükü zemine o yüz aktarır.",
    alt: "I dar tabanda iki, II geniş tabanda iki, III geniş tabanda üç özdeş tuğla. Seçili düzenekte yalnız yere temas eden kenar kalın çizilir.",
    steps: brickStacks.map(({ label }) => `${label}. düzenek`),
    draw: (_, step) => {
      const { weight, area } = brickPressure(step);
      return {
        els: brickStacks.flatMap(({ label, layers }, index) => {
          const center = index * 3.5;
          const selected = index === step;
          let bottom = 0;
          const bricks = layers.map((base, i) => {
            const height = 1.8 / base;
            const block = slab(center - base / 2, bottom, base, height, selected && i === 0);
            bottom += height;
            return block;
          });
          return [
            ground(center - 1.35, 2.7),
            ...bricks,
            ...(selected ? [seg(v(center - area / 2, 0), v(center + area / 2, 0), { tone: "a", bold: true })] : []),
            txt(v(center, -0.4), label, "s", { tone: selected ? "a" : "ink", bold: true }),
            txt(v(center, bottom + 0.15), layers[0] === 1 ? "S" : "2S", "n", { small: true }),
          ];
        }),
        readout: [`${brickStacks[step].label}. düzenek: ${weight}G yük, ${area === 1 ? "S" : "2S"} temas alanı.`, `Ortalama basınç: ${brickPressureRatio(step)}.`],
      };
    },
  },
  [uprightPrismTitle]: {
    caption: "Aynı malzemede düşey kesim h'yi değiştirmez. Yatay kesim h'yi azaltır.",
    alt: "Homojen dik prizmanın kesilmemiş hâli, aynı yüksekliğe sahip iki düşey parçası ve yüksekliği yarıya düşmüş yatay kesim parçası.",
    steps: ["Bütün prizma", "Düşey kesim", "Yatay kesim"],
    draw: (_, step) => {
      const h = step === 2 ? prismHeightMetres / 2 : prismHeightMetres;
      const [whole, smaller, larger] = prismBaseAreas;
      const areas = step === 1 ? [smaller, larger] : [whole];
      const y = h * 12;
      const blocks = areas.flatMap((area, index) => {
        const x = index ? smaller + 0.7 : 0;
        return [slab(x, 0, area, y, true), txt(v(x + area / 2, -0.42), `${area} m²`, "s", { small: true })];
      });
      return {
        els: [ground(-0.4, whole + 1.5), ...blocks, txt(v(0, y + 0.22), `h = ${fmt(h)} m`, "ne", { small: true })],
        readout: areas.map((area) => {
          const { force, pressure } = prismPressure(area, h);
          return `${area} m² taban: ${fmt(force)} N / ${area} m² = ${fmt(pressure)} Pa.`;
        }),
      };
    },
  },
};
