import {
  overlappingShadowTitle, separatedShadowTitle, stackedPointShadowsAt, stackedShadowTitle,
} from "../mebiStackedPointShadows";
import { circle, poly, seg, txt, v, type El, type FigureDef, type FigureFrame } from "./figureKit";

function stackedShadow(value: number): FigureFrame {
  const model = stackedPointShadowsAt(value);
  const s = model.screenCm;
  const frontX = s + 5.45;
  const els: El[] = [seg(v(s, -5.25), v(s, 5.25), { tone: "muted", bold: true })];
  for (const [index, path] of model.sources.entries()) {
    const tone = index === 0 ? "a" : "b";
    for (const ray of path.rays) {
      els.push(
        seg(v(0, path.sourceY), v(ray.touchX, ray.touchY), { tone, thin: true }),
        seg(v(ray.touchX, ray.touchY), v(s, ray.screenY), { tone, thin: true, dash: true }),
      );
    }
    els.push(
      circle(v(0, path.sourceY), 0.12, { tone, fill: tone }),
      txt(v(-0.4, path.sourceY + (index === 0 ? 0.32 : -0.32)), index === 0 ? "K" : "L", "w", { tone, bold: true }),
      poly(Array.from({ length: 40 }, (_, i) => {
        const angle = i * Math.PI / 20;
        return v(frontX + path.horizontalRadius * Math.cos(angle), path.centreY + path.verticalRadius * Math.sin(angle));
      }), { tone, fill: tone, dash: index === 1 }),
    );
  }
  els.push(
    circle(v(model.objectCm, 0), model.radiusCm, { tone: "ink", fill: "ink" }),
    txt(v(model.objectCm, -3.15), "Opak küre", "s", { tone: "ink", small: true }),
    txt(v(s, 5.65), "Perde", "n", { tone: "ink", small: true }),
    txt(v(frontX, 5.65), "Önden", "n", { tone: "ink", small: true }),
  );
  if (model.fullLength > 0) {
    const lens = Array.from({ length: 25 }, (_, i) => {
      const y = model.sharedLow + model.fullLength * i / 24;
      const width = Math.min(...model.sources.map(path => path.horizontalRadius * Math.sqrt(
        Math.max(0, 1 - ((y - path.centreY) / path.verticalRadius) ** 2),
      )));
      return { y, width };
    });
    els.push(
      poly([...lens.map(({ y, width }) => v(frontX + width, y)), ...[...lens].reverse().map(({ y, width }) => v(frontX - width, y))], { tone: "ink", fill: "ink", bold: true }),
      seg(v(s, model.sharedLow), v(s, model.sharedHigh), { tone: "warn", bold: true }),
    );
  }
  const fmt = (n: number) => n.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
  return {
    els,
    readout: [
      model.fullLength ? `Tam gölge kesiti ${fmt(model.fullLength)} cm.` : "Ortak tam gölge yok.",
      `Yarı gölge aralıklarının toplam uzunluğu ${fmt(model.partialLength)} cm.`,
    ],
  };
}

const alt = "Solda bir düşey doğrultuda iki kaynak, ortada opak küre ve sağda perde görünür. Ayrı teğet ışınlar ve perdenin önden görünümündeki iki elips, ortak tam gölgenin değişimini gösterir.";
export const stackedPointShadowFigures: Record<string, FigureDef> = {
  [stackedShadowTitle]: {
    caption: "Kaynakları eksenden uzaklaştır. Perdede iki elipsi ve elipslerin ortak koyu bölümünü takip et. Kesik çizgili elips L’ye ait.",
    alt,
    param: { label: "Her kaynağın eksenden uzaklığı", min: 0.5, max: 1.5, step: 0.25, init: 0.5, unit: "cm" },
    draw: stackedShadow,
  },
  [overlappingShadowTitle]: { caption: "0,5 cm uzaklıkta aralıklar kesişir.", alt, draw: () => stackedShadow(0.5) },
  [separatedShadowTitle]: { caption: "1,5 cm uzaklıkta aralıklar ayrılır.", alt, draw: () => stackedShadow(1.5) },
};
