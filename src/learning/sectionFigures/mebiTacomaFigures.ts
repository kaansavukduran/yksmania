import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";
import { tacomaDeckTitle, tacomaTitle } from "../mebiTacoma";

const angle = Math.PI / 15;
const halfWidth = 4.4;
const halfDepth = 0.24;
const deckCenter = v(6.3, 2.98);

function deckFrame(twists: boolean): FigureFrame {
  const rotate = (x: number, y: number) => twists
    ? v(deckCenter[0] + x * Math.cos(angle) + y * Math.sin(angle), deckCenter[1] - x * Math.sin(angle) + y * Math.cos(angle))
    : v(deckCenter[0] + x, deckCenter[1] + y + 0.85);
  const left = rotate(-halfWidth, 0);
  const right = rotate(halfWidth, 0);
  const movement: El[] = [
    vec(v(1.5, 2.0), v(1.5, 3.72), { tone: "a" }),
    vec(v(11.1, twists ? 3.72 : 2.0), v(11.1, twists ? 2.0 : 3.72), { tone: "c" }),
    txt(v(1.5, 1.05), "Sol kenar", "s", { tone: "a", small: true }),
    txt(v(11.1, 1.05), "Sağ kenar", "s", { tone: "c", small: true }),
  ];
  return {
    els: [
      seg(v(deckCenter[0] - halfWidth, deckCenter[1]), v(deckCenter[0] + halfWidth, deckCenter[1]), { tone: "muted", dash: true }),
      poly([
        rotate(-halfWidth, -halfDepth), rotate(halfWidth, -halfDepth),
        rotate(halfWidth, halfDepth), rotate(-halfWidth, halfDepth),
      ], { tone: "ink", fill: "b", bold: true }),
      circle(left, 0.14, { tone: "a", fill: "a" }),
      circle(right, 0.14, { tone: "c", fill: "c" }),
      ...(twists ? [
        circle(deckCenter, 0.19, { tone: "ink", fill: "muted" }),
        txt(v(deckCenter[0], 2.0), "Dönme ekseni", "s", { small: true }),
      ] : []),
      ...movement,
      txt(v(deckCenter[0], 5.2), "Tabliyenin enine kesiti", "n", { small: true }),
      txt(v(deckCenter[0], 0.15), "Kesik çizgi başlangıç konumu", "s", { tone: "muted", small: true }),
    ],
    readout: twists
      ? ["Sol kenar yükselir. Sağ kenar alçalır. Kesit yol boyunca uzanan eksenin çevresinde döner.", "Çizim hareket yönünü açıklıyor. Köprüdeki burulma açısını ölçmüyor."]
      : ["İki kenar da yukarı gider. Yolun enine kesitinin yönü aynı kalır."],
  };
}

export const tacomaFigures: Record<string, FigureDef> = {
  [tacomaTitle]: {
    caption: "Enine kesiti önce yukarı taşı, sonra bur. İki kenarın yönünü karşılaştır.",
    alt: "İki adımda köprü tabliyesinin enine kesiti. İlk adımda kenarlar birlikte yukarı gider. İkinci adımda biri yükselirken diğeri alçalır.",
    steps: ["Düşey hareket", "Burulma"],
    draw: (_, step) => deckFrame(step === 1),
  },
  [tacomaDeckTitle]: {
    caption: "Bir kenarın yükselip diğerinin alçaldığı konuma bak.",
    alt: "Enine kesitin sol kenarındaki ok yukarıya, sağdaki ok aşağıya bakıyor. Ortada kesitin dönme ekseni işaretlenmiş.",
    draw: () => deckFrame(true),
  },
};
