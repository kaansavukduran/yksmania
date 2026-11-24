import { grazingFluxTitle, parallelFluxAngles, parallelFluxAt, parallelFluxTitle, tiltedFluxTitle } from "../mebiParallelFlux";
import { ang, fmt, seg, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";

type Angle = (typeof parallelFluxAngles)[number];

function frame(angle: Angle): FigureFrame {
  const result = parallelFluxAt(angle);
  const radians = angle * Math.PI / 180;
  const x = 5.85;
  const y = 2.54;
  const half = 1.6;
  const rise = half * result.projection;
  const run = half * Math.sin(radians);
  const first = v(x - run, y - rise);
  const last = v(x + run, y + rise);
  const normal = v(x - 1.7 * result.projection, y + 1.7 * Math.sin(radians));
  const center = v(x, y);
  const projectionX = 9.4;
  const els: El[] = [
    txt(v(2.15, 5.16), "Paralel ışınlar", "n", { tone: "a", bold: true, small: true }),
    seg(first, last, { tone: "ink", bold: true }),
    seg(center, normal, { tone: "b", dash: true, bold: true }),
    txt(v(normal[0] - 0.1, normal[1] + 0.36), "Normal", "n", { tone: "b", small: true }),
    seg(v(projectionX, y - rise), v(projectionX, y + rise), { tone: "c", bold: true }),
    txt(v(projectionX, 5.16), "İzdüşüm", "n", { tone: "c", bold: true, small: true }),
    txt(v(projectionX, y - rise - 0.33), fmt(result.projectedAreaM2) + " m²", "s", { tone: "c", bold: true, small: true }),
  ];
  for (const offset of [-1.33, -0.72, 0.72, 1.33]) {
    const rayY = y + offset;
    const hits = Math.abs(offset) <= rise && rise > 0;
    const endpoint = hits ? x + run * offset / rise : 8.35;
    els.push(vec(v(0.82, rayY), v(endpoint, rayY), { tone: "a", thin: !hits, bold: hits }));
  }
  els.push(seg(v(3.58, y), center, { tone: "muted", dash: true }));
  if (angle > 0) els.push(ang(center, v(3.58, y), normal, angle + "°", { tone: "b", r: 38 }));
  return {
    els,
    readout: [
      "Normal açısı " + angle + "°. Demete dik izdüşüm " + fmt(result.projectedAreaM2) + " m².",
      "Yüzeye düşen ışık akısı " + fmt(result.lumens) + " lm.",
    ],
  };
}

export const parallelFluxFigures: Record<string, FigureDef> = {
  [parallelFluxTitle]: {
    caption: "Yüzeyi döndür. Aynı alanın ışınlara dik görünen yüksekliğini ve toplam akıyı karşılaştır.",
    alt: "Soldan paralel ışınlar, ortadaki dönen yüzeye ilerliyor. Yüzey normali kesikli. Sağda ışınlara dik izdüşüm, yüzey döndükçe kısalıyor.",
    steps: parallelFluxAngles.map(angle => angle + "°"),
    draw: (_value, step) => frame(parallelFluxAngles[step]),
  },
  [tiltedFluxTitle]: {
    caption: "60° normal açısında ışınlara dik alan yarıya düşer.",
    alt: "Eğik yüzeyin normali ve 60 derece açısı çizilmiş. Işınlara dik izdüşüm 2 metrekare.",
    draw: () => frame(60),
  },
  [grazingFluxTitle]: {
    caption: "Işınlar yüzeye paralelken akı sıfırdır.",
    alt: "Yüzey yatay ışınlara paralel. Yüzeyin normali yukarı yönelmiş ve dik izdüşüm alanı sıfır.",
    draw: () => frame(90),
  },
};
