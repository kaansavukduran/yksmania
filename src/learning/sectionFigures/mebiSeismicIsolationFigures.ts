import { isolationTitle, rigidBaseTitle, slidingBaseTitle } from "../mebiSeismicIsolation";
import { poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";

function foundation(useBearing: boolean): FigureFrame {
  const lowerLeft = 3.2;
  const lowerRight = 7.8;
  const topOffset = useBearing ? -0.85 : 0;
  const top = useBearing ? 2.83 : 1.88;
  const upperLeft = lowerLeft + topOffset;
  const upperRight = lowerRight + topOffset;
  const els: El[] = [
    seg(v(0.85, 1.03), v(10.8, 1.03), { tone: "ink", bold: true }),
    poly([v(2.7, 1.08), v(8.3, 1.08), v(8.3, 1.85), v(2.7, 1.85)], { tone: "ink", fill: "muted" }),
    poly([v(upperLeft, top), v(upperRight, top), v(upperRight, 5.25), v(upperLeft, 5.25)], { tone: "b", fill: "muted" }),
    txt(v((upperLeft + upperRight) / 2, 4.35), "Üst yapı", "n", { tone: "b", bold: true, small: true }),
    txt(v(5.5, 1.33), "Temel", "n", { small: true }),
    vec(v(7.1, 0.5), v(10.35, 0.5), { tone: "ink" }),
    txt(v(5.3, 0.23), "Zemin hareketi", "s", { small: true }),
  ];

  if (useBearing) {
    for (const x of [lowerLeft + 0.63, lowerRight - 0.63]) {
      const a = x - 0.42;
      const b = x + 0.42;
      els.push(poly([v(a, 1.89), v(b, 1.89), v(b + topOffset, top), v(a + topOffset, top)], { tone: "a", fill: "a" }));
    }
    els.push(vec(v(9.7, 2.38), v(8, 2.38), { tone: "a" }));
    els.push(txt(v(9.6, 2.97), "İzolatör", "n", { tone: "a", bold: true, small: true }));
  }

  return {
    els,
    readout: [useBearing
      ? "İzolatör temel ile üst yapı arasında. Bağlantıda göreli yatay hareket olabilir."
      : "Temel ve üst yapı doğrudan bağlı. Kesitte ayrı bir hareket katmanı yok."],
  };
}

export const seismicIsolationFigures: Record<string, FigureDef> = {
  [isolationTitle]: {
    caption: "Önce doğrudan bağlı kesiti, sonra hareket payı bulunan bağlantıyı karşılaştır.",
    alt: "İki kesitte aynı temel ve üst yapı. İkinci kesitte aralarında yana eğilmiş iki izolatör var. Zemin hareketi oku iki çizimde de sağa.",
    steps: ["Doğrudan bağlantı", "İzolatörlü bağlantı"],
    draw: (_value, step) => foundation(step === 1),
  },
  [rigidBaseTitle]: {
    caption: "Temel ve üst yapı doğrudan birleşiyor.",
    alt: "Üst yapı alt yüzeyi temel üzerindeki yüzeye değiyor. Ayrı bir bağlantı katmanı çizili değil.",
    draw: () => foundation(false),
  },
  [slidingBaseTitle]: {
    caption: "Temel ile üst yapının bağımsız konumunu aradaki izolatörden incele.",
    alt: "İki turuncu izolatör temel ile üst yapı arasında. Üst yapı temele göre biraz sola kaymış çiziliyor.",
    draw: () => foundation(true),
  },
};
