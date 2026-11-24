import { coverTitle, dropTitle, earthquakeCoverTitle, holdTitle } from "../mebiEarthquakeCover";
import { circle, poly, seg, txt, v, type El, type FigureDef, type FigureFrame } from "./figureKit";

function posture(step: number): FigureFrame {
  const under = step !== 0;
  const holding = step === 2;
  const head = under ? v(6.12, 2.62) : v(2.2, 3.37);
  const shoulder = under ? v(6.68, 2.22) : v(2.28, 2.89);
  const hip = under ? v(7.62, 1.63) : v(2.42, 1.78);
  const knee = under ? v(8.17, 0.92) : v(2.95, 0.92);
  const hand = v(4.52, 1.89);
  const els: El[] = [
    seg(v(0.7, 0.78), v(11.1, 0.78), { tone: "muted" }),
    poly([v(4.12, 4.22), v(10.52, 4.22), v(10.52, 4.53), v(4.12, 4.53)], { tone: "ink", fill: "muted" }),
    seg(v(4.52, 4.22), v(4.52, 0.82), { tone: "ink", bold: true }),
    seg(v(10.1, 4.22), v(10.1, 0.82), { tone: "ink", bold: true }),
    txt(v(7.32, 4.96), "Sağlam masa", "n", { small: true, bold: true }),
    circle(head, 0.39, { tone: "b", bold: true }),
    poly([shoulder, hip, knee, v(knee[0] + 0.66, 0.88)], { open: true, bare: true, tone: "b", bold: true }),
  ];
  if (under) {
    els.push(poly([shoulder, v(6.3, 3.13), v(5.87, 3.07)], { open: true, bare: true, tone: "a", bold: true }));
    els.push(poly([shoulder, v(5.96, 1.86), holding ? hand : v(5.71, 2.63)], { open: true, bare: true, tone: "b", bold: true }));
  } else {
    els.push(poly([shoulder, v(1.92, 2.08), v(2.37, 1.53)], { open: true, bare: true, tone: "b", bold: true }));
  }
  if (holding) els.push(circle(hand, 0.13, { tone: "a", fill: "a" }));
  return {
    els,
    readout: [
      [
        "Dizlerinin üzerine çök ve yere yakın kal.",
        "Yakındaki sağlam masanın altında başını ve enseni koru.",
        "Bir elle masanın bacağına tutun, diğer kolunla başını ve enseni koru.",
      ][step],
    ],
  };
}

export const earthquakeCoverFigures: Record<string, FigureDef> = {
  [earthquakeCoverTitle]: {
    caption: "Yakındaki sağlam masa örneğinde üç korunma pozunu sırayla incele.",
    alt: "Sağlam bir masa yanındaki kişi diz çöküyor. Sonra masanın altında başını kapatıyor. Son aşamada bir eli masa bacağında, diğer kolu başında.",
    steps: ["Çök", "Kapan", "Tutun"],
    draw: (_value, step) => posture(step),
  },
  [dropTitle]: {
    caption: "Dizleri yere yaklaştır.",
    alt: "Kişi masanın yanında, gövdesi yere yaklaşmış ve dizleri bükülü.",
    draw: () => posture(0),
  },
  [coverTitle]: {
    caption: "Baş ve enseyi masanın altında kollarla koru.",
    alt: "Kişi masanın altında eğilmiş. Kolları başı ve ensesi çevresinde.",
    draw: () => posture(1),
  },
  [holdTitle]: {
    caption: "Bir elle masanın bacağına tutun.",
    alt: "Masanın altındaki kişinin bir eli masa bacağındadır. Diğer kolu başını ve ensesini örter.",
    draw: () => posture(2),
  },
};
