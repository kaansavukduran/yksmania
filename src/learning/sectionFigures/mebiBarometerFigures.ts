import { atmosphereHeightTitle, atmosphereReadings, barometerColumn, barometerHeightTitle } from "../mebiBarometerReadings";
import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

const altitudeLabels = ["0 m", "1.500 m"];
const tiltDegrees = 60;
const tilt = Math.tan(tiltDegrees * Math.PI / 180);
const reservoirSurface = 0.55;
const tubeTop = 4.2;

function tube(x: number, slope: number, liquidHeight: number): El[] {
  const at = (y: number, offset: number) => v(x + slope * (y - reservoirSurface) + offset, y);
  return [
    poly([at(0.22, 0), at(liquidHeight, 0), at(liquidHeight, 0.52), at(0.22, 0.52)],
      { fill: "b", tone: "b", thin: true }),
    poly([at(0.22, 0), at(tubeTop, 0), at(tubeTop, 0.52), at(0.22, 0.52)], { open: true }),
  ];
}

export const mebiBarometerFigures: Record<string, FigureDef> = {
  [atmosphereHeightTitle]: {
    caption: "İki yükseklikteki örnek okumayı karşılaştır. Noktalar havanın aşağıda daha yoğun olduğunu gösteriyor.",
    alt: "Deniz seviyesine yakında daha çok hava taneciği, üstte daha seyrek tanecikler var. İki yatay çizgi 0 ve 1.500 metreyi işaretliyor.",
    steps: altitudeLabels,
    draw: (_, step) => {
      const stations = [0.55, 3.45];
      const particles = Array.from({ length: 7 }, (_, row) => {
        const count = 8 - row;
        return Array.from({ length: count }, (_, i) => circle(
          v(3 + i * 0.33 + (row % 2) * 0.15, 0.72 + row * 0.39), 0.083,
          { tone: "c", fill: "c", thin: true },
        ));
      }).flat();
      const { pressure } = atmosphereReadings[step];
      return {
        els: [
          ...particles,
          ...stations.map((y, index) => seg(v(2.65, y), v(5.9, y),
            { tone: step === index ? "a" : "muted", dash: true })),
          ...stations.map((y, index) => txt(v(1.75, y), altitudeLabels[index], "w", { small: true })),
          txt(v(4.3, 3.78), "Hava tanecikleri", "n", { small: true }),
        ],
        readout: [`${altitudeLabels[step]} örnek okuması: ${pressure} mmHg.`, "Noktalar nitel bir yoğunluk karşılaştırmasıdır."],
      };
    },
  },
  [barometerHeightTitle]: {
    caption: "Dik ve eğik tüpteki sıvı yüzeylerini eş yatay çizgide karşılaştır. Tüpler yeterince uzun ve üstlerinde yaklaşık vakum var.",
    alt: "Ortak sıvı çanağına batırılan bir dik ve bir eğik kapalı tüp. Tüp eğik olsa da iki sıvı yüzeyi aynı yatay çizgide. Çanaktan düşey yüksekliği ölç.",
    param: { label: "Sıvı yoğunluğu (cıvaya göre)", min: 0.5, max: 1.5, step: 0.25, init: 1 },
    steps: altitudeLabels,
    draw: (density, step) => {
      const { pressure } = atmosphereReadings[step];
      const { heightCm, tubeLengthCm } = barometerColumn(pressure, density, tiltDegrees);
      const liquidHeight = reservoirSurface + heightCm / 49;
      return {
        els: [
          poly([v(0, -0.27), v(7.5, -0.27), v(7.5, reservoirSurface), v(0, reservoirSurface)],
            { fill: "b", tone: "b", thin: true }),
          poly([v(0, 0.82), v(0, -0.27), v(7.5, -0.27), v(7.5, 0.82)], { open: true }),
          ...tube(1.1, 0, liquidHeight),
          ...tube(3.35, tilt, liquidHeight),
          seg(v(0.45, liquidHeight), v(3.9 + tilt * (liquidHeight - reservoirSurface), liquidHeight),
            { tone: "a", dash: true }),
          seg(v(0.42, reservoirSurface), v(0.42, liquidHeight), { tone: "a" }),
          txt(v(1.38, 4.45), "Dik tüp", "n", { small: true }),
          txt(v(10, 4.48), "Eğik tüp", "n", { small: true }),
          txt(v(3.7, -0.55), "Ortak sıvı çanağı", "s", { small: true }),
          txt(v(0.18, (reservoirSurface + liquidHeight) / 2), "h", "w", { small: true }),
          vec(v(6.8, 1.55), v(6.8, reservoirSurface + 0.12), { tone: "a" }),
          txt(v(6.8, 1.74), "P₀", "n", { small: true }),
        ],
        readout: [
          `Atmosfer basıncı: ${pressure} mmHg. Her iki düşey yükseklik: ${fmt(heightCm)} cm.`,
          `Düşeyle 60° yapan tüpte sıvı uzunluğu: ${fmt(tubeLengthCm)} cm.`,
        ],
      };
    },
  },
};
