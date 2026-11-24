import { crookesAbsorptionTitle, crookesGasTitle, crookesModelTitle } from "../mebiCrookesRadiometer";
import { poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";

function vaneFrame(gas: boolean): FigureFrame {
  const els: El[] = [
    poly([v(5.46, 0.95), v(5.9, 0.95), v(5.9, 4.07), v(5.46, 4.07)], { tone: "ink", fill: "muted", bold: true }),
    seg(v(5.46, 1.02), v(5.46, 4.0), { tone: "ink", bold: true }),
    seg(v(5.9, 1.02), v(5.9, 4.0), { tone: "muted", thin: true }),
    txt(v(4.54, 0.55), "Koyu yüz", "s", { tone: "ink", bold: true, small: true }),
    txt(v(7.12, 0.55), "Açık yüz", "s", { tone: "ink", bold: true, small: true }),
  ];
  if (gas) {
    els.push(
      txt(v(5.74, 5.24), "Gazın kenardaki hareketi", "n", { tone: "b", bold: true, small: true }),
      poly([v(7.71, 3.58), v(6.64, 4.34), v(5.32, 4.67), v(4.41, 3.68)], { tone: "b", open: true, bare: true }),
      vec(v(5.32, 4.67), v(4.41, 3.68), { tone: "b", bold: true }),
      txt(v(4.04, 2.12), "Daha sıcak", "w", { tone: "a", bold: true, small: true }),
      txt(v(7.38, 2.12), "Daha serin", "e", { tone: "b", bold: true, small: true }),
    );
  } else {
    for (const y of [1.63, 2.51, 3.38]) els.push(vec(v(0.95, y), v(5.37, y), { tone: "a", thin: true }));
    els.push(txt(v(2.7, 4.54), "Gelen ışık", "n", { tone: "a", bold: true, small: true }));
    els.push(txt(v(6.9, 2.5), "Tek kanat, kesit", "e", { tone: "muted", small: true }));
  }
  return {
    els,
    readout: [gas
      ? "Düşük basınçlı gazda kanat kenarındaki termal hareket kuvvet oluşturur."
      : "Gelen ışığın daha büyük bir payı koyu yüzde soğurulur. İki yüz arasında sıcaklık farkı gelişebilir."],
  };
}

const absorptionAlt = "Soldaki ışınlar ince kanadın koyu sol yüzünde sonlanıyor. Sağ yüz daha açık.";
const gasAlt = "Kanat kenarında bir ok, daha serin açık yüz tarafından daha sıcak koyu yüz tarafına kıvrılıyor.";

export const crookesRadiometerFigures: Record<string, FigureDef> = {
  [crookesModelTitle]: {
    caption: "Önce tek kanada gelen ışığı, sonra gazın kanat kenarındaki hareketini incele.",
    alt: absorptionAlt + " " + gasAlt,
    steps: ["Işık soğurulur", "Gazın hareketi"],
    draw: (_value, step) => vaneFrame(step === 1),
  },
  [crookesAbsorptionTitle]: {
    caption: "İki yüzün ışığı soğurma biçimi farklıdır.",
    alt: absorptionAlt,
    draw: () => vaneFrame(false),
  },
  [crookesGasTitle]: {
    caption: "Ok, gazın kenardaki termal hareketini gösterir.",
    alt: gasAlt,
    draw: () => vaneFrame(true),
  },
};
