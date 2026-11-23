import { railEnergyAt } from "../railEnergy060";
import { fmt, poly, pt, seg, txt, v, type El, type FigureDef } from "./figureKit";

const railSpan = 4;
const atLevel = (level: number) => railSpan * Math.sqrt(level / 3);

export const railEnergyFigure: FigureDef = {
  caption: "A, D ve son C anları üç ayrı duruştur. Yüksekliği değiştirerek her duruşta kalan mekanik enerji ile ısıl enerjiye geçen toplamı karşılaştır.",
  alt: "U biçimindeki rayın solunda 3h yükseklikte A, sağında h yükseklikte D, en altında sıfır düzeyinde C. A ile aynı düzeydeki E, cismin erişmediği sağ uçtur.",
  steps: ["A · Bırakma", "D · Dönme", "C · Son duruş"],
  param: { label: "Temel yükseklik h (m)", min: 0.5, max: 2.5, init: 1.5, step: 0.5 },
  draw: (h, step) => {
    const current = railEnergyAt(h)[step];
    const rail = Array.from({ length: 41 }, (_, index) => {
      const x = -railSpan + railSpan * index / 20;
      return v(x, 3 * h * (x / railSpan) ** 2);
    });
    const positions = [
      { name: "A", x: -railSpan, y: 3 * h },
      { name: "D", x: atLevel(1), y: h },
      { name: "C", x: 0, y: 0 },
      { name: "E", x: railSpan, y: 3 * h },
    ] as const;
    const els: El[] = [
      seg(v(-4.7, 0), v(4.7, 0), { tone: "muted", dash: true, thin: true }),
      seg(v(-4.6, 3*h), v(4.6, 3*h), { tone: "muted", dash: true, thin: true }),
      seg(v(atLevel(1), h), v(4.55, h), { tone: "muted", dash: true, thin: true }),
      poly(rail, { open: true, tone: "b", bold: true }),
      txt(v(-4.6, 3*h), "3h", "w", { small: true }),
      txt(v(4.6, h), "h", "e", { small: true }),
      ...positions.flatMap(({ name, x, y }) => [
        pt(v(x, y), undefined, "e", name === current.point ? "a" : "muted"),
        txt(v(x, y), name, y === 0 ? "s" : "n", { tone: name === current.point ? "a" : "muted", bold: name === current.point }),
      ]),
    ];
    return {
      els,
      readout: [
        `${current.point} anında hız 0. Yükseklik ${fmt(current.level * h, 2)} m. Mekanik enerji ${fmt(current.mechanical)} J.`,
        `Başlangıçtan bu ana kadar ${fmt(current.dissipated)} J ısıl enerjiye ve diğer biçimlere geçti.`,
        step === 2 ? "Bu son duruş. C’den ilk geçişte hız sıfır değildi." : "E aynı yükseklikteki karşı uç. Sürtünme nedeniyle cisim E’ye ulaşmaz.",
      ],
    };
  },
};
