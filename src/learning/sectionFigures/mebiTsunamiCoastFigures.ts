import { coastEvacuationTitle, coastRetreatTitle, tsunamiCoastTitle } from "../mebiTsunamiCoast";
import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";

function coast(evacuation: boolean): FigureFrame {
  const ground = [v(0.52, 0.9), v(2.05, 1.38), v(4.05, 2.02), v(9.25, 4.8), v(11.15, 4.8)];
  const els: El[] = [
    poly([...ground, v(11.15, 0.42), v(0.52, 0.42)], { fill: "muted", tone: "muted", thin: true }),
    poly([v(0.52, 1.39), v(2.05, 1.39), v(0.52, 0.9)], { fill: "b", tone: "b" }),
    poly(ground, { open: true, bare: true, tone: "ink", bold: true }),
    txt(v(0.95, 2.08), "Su", "n", { tone: "b", small: true }),
    txt(v(10.06, 5.4), "Yüksek alan", "n", { tone: "a", bold: true, small: true }),
  ];
  if (evacuation) {
    const start = v(4.85, 2.8);
    const end = v(8.9, 5.02);
    els.push(circle(start, 0.17, { tone: "a", fill: "a" }));
    els.push(vec(start, end, { tone: "a", bold: true }));
    els.push(txt(v(6.22, 4.2), "Tahliye yönü", "n", { tone: "a", bold: true, small: true }));
  } else {
    els.push(seg(v(4.05, 2.03), v(4.05, 2.91), { tone: "muted", dash: true }));
    els.push(txt(v(4.05, 3.1), "Önceki kıyı", "n", { small: true }));
    els.push(vec(v(3.23, 1.65), v(2.14, 1.65), { tone: "b", bold: true }));
  }
  return {
    els,
    readout: [evacuation
      ? "Tahliye oku kıyıdan uzaklaşıp yüksek alana yöneliyor."
      : "Su önceki kıyı çizgisinden uzaklaştı. Aradaki zemin açığa çıktı."],
  };
}

export const tsunamiCoastFigures: Record<string, FigureDef> = {
  [tsunamiCoastTitle]: {
    caption: "Önce kıyıdaki değişimi, sonra güvenli genel tahliye yönünü incele.",
    alt: "Bir kıyı kesiti. İlk adımda su önceki kıyı çizgisinden çekiliyor. Sonraki adımda tahliye oku karanın içine ve yükselen alana gidiyor.",
    steps: ["Su çekilmesi", "Tahliye yönü"],
    draw: (_value, step) => coast(step === 1),
  },
  [coastRetreatTitle]: {
    caption: "Çekilen su ile önceki kıyının arasındaki açığa çıkan bölgeyi bul.",
    alt: "Önceki su çizgisi kesikli işaretli. Su sola doğru, kıyı zemininin ilerisine çekilmiş.",
    draw: () => coast(false),
  },
  [coastEvacuationTitle]: {
    caption: "Okun kıyıdan nasıl uzaklaştığını ve yükseldiğini takip et.",
    alt: "Tahliye oku plajdan karanın içine doğru gidiyor ve yüksek alana yükseliyor.",
    draw: () => coast(true),
  },
};
