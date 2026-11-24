import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";
import { sonarDelay, sonarDepthTitle, sonarDistanceM, sonarPulseTitle, sonarTitle } from "../mebiSonar";

function fish(x: number, y: number): El[] {
  return [
    poly([v(x - 0.34, y), v(x - 0.05, y + 0.18), v(x + 0.32, y), v(x - 0.05, y - 0.18)], { tone: "c", fill: "c" }),
    poly([v(x - 0.26, y), v(x - 0.52, y + 0.15), v(x - 0.52, y - 0.15)], { tone: "c", fill: "c" }),
  ];
}

function sonarFrame(delayMs: number, includesReturn: boolean): FigureFrame {
  const distanceM = sonarDistanceM(delayMs);
  const waterSurface = 5.8;
  const sensor = 5.21;
  const depth = sensor - distanceM * 0.034;
  const halfway = (sensor + depth) / 2;
  const els: El[] = [
    poly([v(0.55, 0.53), v(11.72, 0.53), v(11.72, waterSurface), v(0.55, waterSurface)], { tone: "b", fill: "b", thin: true }),
    poly([v(3.75, 6.34), v(7.36, 6.34), v(6.92, 5.8), v(4.18, 5.8)], { tone: "ink", fill: "muted", bold: true }),
    poly([v(5.22, 6.34), v(6.39, 6.34), v(6.2, 7), v(5.22, 7)], { tone: "ink", fill: "muted" }),
    seg(v(5.55, 5.8), v(5.55, sensor), { tone: "ink" }),
    circle(v(5.55, sensor), 0.14, { tone: "ink", fill: "ink" }),
    txt(v(5.6, 7.53), "Tekne", "n", { small: true }),
    txt(v(6.59, sensor + 0.25), "Sonar başlığı", "e", { small: true }),
    ...fish(5.55, depth), ...fish(4.7, depth - 0.23), ...fish(6.28, depth - 0.36),
    txt(v(5.55, depth - 0.6), "Balık sürüsü", "s", { tone: "c", small: true }),
    vec(v(4.47, sensor - 0.1), v(4.47, depth + 0.23), { tone: "a" }),
    txt(v(3.98, halfway), "Gidiş", "w", { tone: "a", small: true }),
  ];
  if (includesReturn) {
    els.push(
      vec(v(6.62, depth + 0.23), v(6.62, sensor - 0.1), { tone: "c" }),
      txt(v(7.04, halfway), "Dönüş", "e", { tone: "c", small: true }),
      seg(v(9.6, depth), v(9.6, sensor), { tone: "ink", dash: true }),
      seg(v(9.42, depth), v(9.78, depth), { tone: "ink" }),
      seg(v(9.42, sensor), v(9.78, sensor), { tone: "ink" }),
      txt(v(10.14, halfway), `${fmt(distanceM)} m`, "e", { small: true }),
    );
  }
  return {
    els,
    readout: includesReturn ? [
      `Ölçülen ${delayMs} ms iki yönü kapsar. Toplam yol ${fmt(2 * distanceM)} m.`,
      `Sonar başlığından sürüye düşey uzaklık ${fmt(distanceM)} m.`,
    ] : ["Tekneye bağlı başlık suya ses gönderir. Süre, yansıyan ses başlığa dönünce ölçülür."],
  };
}

export const sonarFigures: Record<string, FigureDef> = {
  [sonarTitle]: {
    caption: "Önce suya giden, sonra balıklardan dönen oku izle. İki yön için ölçülen süreyi değiştir ve uzaklığı karşılaştır.",
    alt: "Su üstünde bir tekne var. Altındaki sonar başlığı balık sürüsüne ses gönderir. Sonraki adımda dönüş oku ve ölçülen düşey uzaklık görünür.",
    param: { label: "Sonar gidiş-dönüş süresi", ...sonarDelay, unit: " ms" },
    steps: ["Ses gönder", "Yankıyı al"],
    draw: (delayMs, step) => sonarFrame(delayMs, step === 1),
  },
  [sonarPulseTitle]: {
    caption: "Başlığın altındaki ok sesin suya gittiği yönü gösterir.",
    alt: "Teknenin altından balık sürüsüne doğru bir ok var. Gönderim suyun içinde aşağı yönlü.",
    draw: () => sonarFrame(sonarDelay.init, false),
  },
  [sonarDepthTitle]: {
    caption: "Gidiş ve dönüşün toplamı 180 m. Tek yön mesafesini 90 m olarak işaretle.",
    alt: "Tekne ve sürü arasında biri aşağı, diğeri yukarı yönlü iki ok var. Başlıktan sürüye düşey uzaklık 90 metre.",
    draw: () => sonarFrame(sonarDelay.init, true),
  },
};
