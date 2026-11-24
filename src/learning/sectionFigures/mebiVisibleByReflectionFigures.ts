import { approximateReflectionCases, litObjectTitle, unlitObjectTitle, visibleByReflectionTitle } from "../mebiVisibleByReflection";
import { circle, txt, v, vec, type El, type FigureDef } from "./figureKit";

function visibleScene(step: number) {
  const state = approximateReflectionCases[step];
  const els: El[] = [
    circle(v(-4.8, 2.5), 0.45, { tone: state.lamp ? "warn" : "muted", fill: state.lamp ? "warn" : "muted" }),
    circle(v(0, 0), 0.9, { tone: "ink", fill: step === 1 ? "ink" : "muted" }),
    circle(v(4.65, 2.5), 0.32, { tone: "ink", fill: "ink" }),
    txt(v(-4.8, 3.3), "Lamba", "n", { tone: "ink", small: true }),
    txt(v(0, -1.5), "Top", "s", { tone: "ink", small: true }),
    txt(v(4.65, 3.3), "Göz", "n", { tone: "ink", small: true }),
  ];
  if (state.lamp) {
    const hit = v(0, 0.9);
    els.push(vec(v(-4.35, 2.35), hit, { tone: "a" }));
    els.push(vec(hit, v(4.34, 2.39), { tone: "b", thin: step === 1 }));
  }
  return { els, readout: [state.lamp ? `Örnekte yüzeyin yansıttığı ışık payı %${state.reflectedFraction * 100}.` : "Lamba kapalı. Topa ve top üzerinden göze ışık ulaşmaz."] };
}

const alt = "Solda lamba, ortada top ve sağda göz var. Lamba açıkken bir ok topa, diğeri top yüzeyinden göze gidiyor. Lamba kapalıyken ışık okları kayboluyor.";
export const visibleByReflectionFigures: Record<string, FigureDef> = {
  [visibleByReflectionTitle]: { caption: "Üç duruma sırayla bak. Toptan göze yönelen ışığı takip et.", alt, steps: approximateReflectionCases.map(item => item.label), draw: (_value, step) => visibleScene(step) },
  [litObjectTitle]: { caption: "Lamba açık, top ışığı yansıtıyor.", alt, draw: () => visibleScene(0) },
  [unlitObjectTitle]: { caption: "Lamba kapalı, odada başka ışık yok.", alt, draw: () => visibleScene(2) },
};
