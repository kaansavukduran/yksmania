import { cylinderMass, cylinderPotentialAt, platformHeight } from "../cylinderPotentialEnergy";
import { fmt, poly, pt, seg, txt, v, vec, type El, type FigureDef, type V } from "./figureKit";

function rim(level: number): V[] {
  return Array.from({ length: 32 }, (_, index) => {
    const angle = (index / 32) * Math.PI * 2;
    return v(0.88 * Math.cos(angle), level + 0.17 * Math.sin(angle));
  });
}

export const cylinderPotentialFigure: FigureDef = {
  caption: "Homojen silindirin kütle merkezi alt ve üst tabandan eşit uzaklıktadır. Silindirin yüksekliğini ve sıfır düzeyini değiştir.",
  alt: "Dik silindirde kütle merkezi ortada işaretli. Düz bir çizgi yer seviyesini, kesikli çizgi seçili sıfır düzeyini gösterir. Yerden platforma taşınan silindirin merkezi 1 metre yükselir.",
  steps: ["Yerde", "Platformda", "Sıfır düzeyi platform"],
  param: { label: "Silindir yüksekliği (m)", min: 0.5, max: 3, step: 0.5, init: 2 },
  draw: (height, step) => {
    const base = step === 0 ? 0 : platformHeight;
    const reference = step === 2 ? platformHeight : 0;
    const current = cylinderPotentialAt(height, base, reference);
    const groundVersion = cylinderPotentialAt(height, 0, reference);
    const platformVersion = cylinderPotentialAt(height, platformHeight, reference);
    const top = base + height;
    const center = current.centerAboveGround;
    const els: El[] = [
      seg(v(-2.6, 0), v(3.5, 0), { tone: "muted", bold: true }),
      txt(v(3.3, 0), reference ? "Yer" : "Yer (sıfır)", "s", { small: true }),
      ...(base ? [poly([v(-1.12, 0), v(1.12, 0), v(1.12, base), v(-1.12, base)], { tone: "muted", fill: "muted", thin: true })] : []),
      poly([v(-0.88, base), v(0.88, base), v(0.88, top), v(-0.88, top)], { tone: "b", fill: "b" }),
      poly(rim(base), { tone: "b", thin: true }),
      poly(rim(top), { tone: "b", fill: "b", thin: true }),
      ...(reference ? [
        seg(v(-1.3, reference), v(3.45, reference), { tone: "a", dash: true, thin: true }),
        txt(v(3.45, reference), "Sıfır", "e", { tone: "a" }),
      ] : []),
      pt(v(0, center), "O", "e", "a"),
      seg(v(0.05, center), v(2.1, center), { tone: "muted", dash: true, thin: true }),
      vec(v(2.1, reference), v(2.1, center), { tone: "a" }),
      txt(v(2.1, (reference + center) / 2), `${fmt(current.referenceHeight, 2)} m`, "e", { tone: "a" }),
    ];
    return {
      els,
      readout: [
        `O noktası sıfır düzeyinden ${fmt(current.referenceHeight, 2)} m yukarıda. U = ${cylinderMass} × 10 × ${fmt(current.referenceHeight, 2)} = ${fmt(current.potential)} J.`,
        `Aynı sıfır düzeyiyle yerde ${fmt(groundVersion.potential)} J, platformda ${fmt(platformVersion.potential)} J. Artış ${fmt(platformVersion.potential - groundVersion.potential)} J.`,
      ],
    };
  },
};
