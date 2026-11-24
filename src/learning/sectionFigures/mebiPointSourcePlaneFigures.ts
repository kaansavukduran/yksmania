import { intensityCd, lightAtOffset, normalDistanceM, normalSpotTitle, obliqueSpotTitle, pointSourcePlaneTitle } from "../mebiPointSourcePlane";
import { ang, circle, fmt, seg, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";

function frame(offsetM: number): FigureFrame {
  const scale = 0.74;
  const source = v(2.62, 4.68);
  const top = v(source[0] + scale * normalDistanceM, source[1]);
  const point = v(top[0], top[1] - scale * offsetM);
  const perpendicular = lightAtOffset(0);
  const local = lightAtOffset(offsetM);
  const els: El[] = [
    seg(v(top[0], 0.88), v(top[0], 5.4), { tone: "ink", bold: true }),
    circle(source, 0.18, { tone: "a", fill: "a" }),
    txt(v(source[0], 5.25), intensityCd + " cd", "n", { tone: "a", bold: true, small: true }),
    txt(v(top[0] + 1.28, 5.4), "Duvardaki alıcılar", "n", { tone: "ink", bold: true, small: true }),
    vec(source, top, { tone: "a", thin: true }),
    txt(v((source[0] + top[0]) / 2, 5.02), "3 m", "n", { tone: "a", small: true }),
    circle(top, 0.1, { tone: "b", fill: "b" }),
    txt(v(top[0] + 0.38, top[1]), "B", "e", { tone: "b", bold: true }),
    txt(v(top[0] + 1.5, top[1]), fmt(perpendicular.illuminanceLux) + " lx", "e", { tone: "b", bold: true, small: true }),
  ];
  if (offsetM > 0) {
    const normal = v(point[0] - 1.67, point[1]);
    els.push(vec(source, point, { tone: "a", bold: true }));
    els.push(seg(point, normal, { tone: "muted", dash: true, bold: true }));
    els.push(circle(point, 0.1, { tone: "c", fill: "c" }));
    els.push(txt(v(point[0] + 0.38, point[1]), "A", "e", { tone: "c", bold: true }));
    els.push(txt(v(point[0] + 1.5, point[1]), fmt(local.illuminanceLux, 2) + " lx", "e", { tone: "c", bold: true, small: true }));
    els.push(ang(point, normal, source, "θ", { tone: "a", r: 29 }));
    els.push(txt(v(normal[0] - 0.16, point[1] - 0.28), "Normal", "w", { tone: "muted", small: true }));
  }
  return {
    els,
    readout: [
      "B: uzaklık " + perpendicular.distanceM + " m, normal açısı 0°, aydınlanma " + fmt(perpendicular.illuminanceLux) + " lx.",
      offsetM === 0 ? "A ile B aynı konumda." :
        "A: " + offsetM + " m aşağıda. Eğik yol " + fmt(local.distanceM, 2) + " m, normal açısı " +
        fmt(local.angleDeg, 1) + "°, aydınlanma " + fmt(local.illuminanceLux, 2) + " lx.",
    ],
  };
}

export const pointSourcePlaneFigures: Record<string, FigureDef> = {
  [pointSourcePlaneTitle]: {
    caption: "A’yı duvar boyunca kaydır. Işık yolu ve normal açısı birlikte değişirken aydınlanmayı oku.",
    alt: "Solda noktasal kaynak, sağda dik duvar. B kaynağın tam karşısında, A daha aşağıda. Işık A’ya eğik ulaşır.",
    param: { label: "A’nın B’den aşağı uzaklığı", min: 0, max: 4, step: 1, init: 4, unit: "m" },
    draw: frame,
  },
  [normalSpotTitle]: {
    caption: "B’ye giden ışın normalle aynı çizgi üzerindedir.",
    alt: "Kaynak ve B’nin arasında 3 metrelik yatay ışın var. B aydınlanması 25 lüks.",
    draw: () => frame(0),
  },
  [obliqueSpotTitle]: {
    caption: "A’nın eğik ışık yolu 5 m. Normal açısının kosinüsü 3/5.",
    alt: "A, B’den 4 metre aşağıda. Kaynaktan A’ya eğik bir ışın gider, A’nın yatay normaliyle açı oluşturur. A’da aydınlanma 5,4 lüks.",
    draw: () => frame(4),
  },
};
