import { mirrorBodyTitle, mirrorBodyWallTitle, mirrorViewDimensions, mirrorViewIntervals, mirrorWallTitle } from "../mebiMirrorBodyWall";
import { circle, fmt, pt, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

function bodyAndWall(distance: number, step: number) {
  const { eye, person, wall, lower, upper } = mirrorViewDimensions;
  const compareWall = step === 1;
  const focusX = compareWall ? -wall : -distance;
  const interval = mirrorViewIntervals(distance);
  const [from, to] = compareWall ? interval.wall : interval.body;
  const observer = v(-distance, eye);
  const els: El[] = [];
  for (let x = -4; x <= 0; x++) {
    els.push(seg(v(x, 0), v(x, 2), { tone: "muted", thin: true, dash: true }));
  }
  for (let y = 0; y <= 2; y += 0.5) {
    els.push(seg(v(-wall, y), v(0, y), { tone: "muted", thin: true, dash: true }));
  }
  els.push(
    seg(v(-wall, 0), v(-wall, 2.15), { tone: "ink", bold: true }),
    seg(v(-distance, 0), v(-distance, person - 0.14), { tone: "ink", bold: true }),
    circle(v(-distance, person - 0.08), 0.08, { tone: "ink" }),
    seg(v(0, lower), v(0, upper), { tone: "ink", bold: true }),
    seg(v(focusX, from), v(focusX, to), { tone: "c", bold: true }),
    txt(v(-wall, 2.2), "Sabit duvar", "n", { tone: "ink", small: true }),
    txt(v(-distance, 0), "Beden", "s", { tone: "ink", small: true }),
    txt(v(0, (lower + upper) / 2), "Ayna", "e", { tone: "ink", small: true }),
    pt(observer, "Göz", "ne", "ink"),
  );
  const rays = [[from, lower], [to, upper]] as const;
  for (const [height, hit] of rays) {
    els.push(vec(v(focusX, height), v(0, hit), { tone: "a", thin: true }));
    els.push(vec(v(0, hit), observer, { tone: "b", thin: true }));
  }
  return {
    els,
    readout: [
      `Göz ile ayna arası ${fmt(distance, 2)} m.`,
      `${compareWall ? "Duvarda" : "Bedende"} ${fmt(from, 2)}–${fmt(to, 2)} m arası görünür. Görünen bölüm ${fmt(to - from, 2)} m.`,
    ],
  };
}

const alt = "Kareli yandan görünümde solda sabit duvar, sağda düz ayna, arada ayakta gözlemci. İki sınır ışını gözde birleşir. Görünen beden ya da duvar aralığı çizimde belirtilir.";

export const mirrorBodyWallFigures: Record<string, FigureDef> = {
  [mirrorBodyWallTitle]: {
    caption: "Aynaya yaklaş. Aynı göz yüksekliğinde bedenin ve yerinde duran duvarın hangi bölümlerinin göründüğünü karşılaştır.",
    alt,
    param: { label: "Göz ile ayna arası", min: 1, max: 2.5, step: 0.25, init: 2, unit: "m" },
    steps: ["Beden", "Sabit duvar"],
    draw: bodyAndWall,
  },
  [mirrorBodyTitle]: {
    caption: "Beden aynaya gözle birlikte yaklaşır. Bedenin görünen aralığını belirleyen orta yükseklikler sabittir.",
    alt,
    param: { label: "Göz ile ayna arası", min: 1, max: 2, step: 1, init: 2, unit: "m" },
    draw: (distance) => bodyAndWall(distance, 0),
  },
  [mirrorWallTitle]: {
    caption: "Duvar yerinde kalırken göz aynaya yaklaşır. Duvardaki iki sınır arasındaki açıklık büyür.",
    alt,
    param: { label: "Göz ile ayna arası", min: 1, max: 2, step: 1, init: 2, unit: "m" },
    draw: (distance) => bodyAndWall(distance, 1),
  },
};
