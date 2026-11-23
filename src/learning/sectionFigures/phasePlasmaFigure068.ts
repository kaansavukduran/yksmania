import { plasmaTransitions } from "../phasePlasma068";
import { circle, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

export const phasePlasmaFigure: FigureDef = {
  caption: "İki adımda elektronun bağlanma durumunu ve enerji yönünü izle.",
  alt: "Solda yüksüz atom, sağda pozitif iyon ve negatif serbest elektron. İki adım arasındaki ok yönü tersine döner.",
  steps: plasmaTransitions.map(({ label }) => label),
  draw: (_, step) => {
    const transition = plasmaTransitions[step];
    const ionizing = step === 0;
    const elements: El[] = [
      circle(v(-3.85, 1.1), 0.61, { tone: "muted", fill: "muted" }),
      txt(v(-3.85, 1.1), "0", "c", { bold: true }),
      txt(v(-3.85, 0.12), "Nötr atom", "s", { small: true }),
      circle(v(2.05, 1.1), 0.59, { tone: "a", fill: "a" }),
      txt(v(2.05, 1.1), "+e", "c", { bold: true }),
      txt(v(2.05, 0.12), "İyon", "s", { small: true }),
      circle(v(4.65, 1.1), 0.58, { tone: "b", fill: "b" }),
      txt(v(4.65, 1.1), "−e", "c", { bold: true }),
      txt(v(4.65, 0.12), "Elektron", "s", { small: true }),
      seg(v(3.02, 1.1), v(3.68, 1.1), { tone: "muted", dash: true, thin: true }),
      vec(v(ionizing ? -2.85 : 0.95, 2.48), v(ionizing ? 0.95 : -2.85, 2.48), { tone: "a", bold: true }),
      txt(v(-0.95, 2.6), transition.label, "n", { small: true, tone: "a" }),
    ];
    return { els: elements, readout: [transition.energy + ".", transition.detail] };
  },
};
