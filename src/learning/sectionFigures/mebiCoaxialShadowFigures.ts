import {
  beforeSourceMovesTitle, coaxialShadowAt, coaxialShadowSteps, coaxialShadowTitle, firstSourceMovesTitle,
  secondSourceMovesTitle,
} from "../mebiCoaxialShadow";
import { circle, seg, txt, v, type El, type FigureDef, type FigureFrame } from "./figureKit";

const fmt = (area: number) => area.toLocaleString("tr-TR", { maximumFractionDigits: 2 });

function projection(step: number): FigureFrame {
  const model = coaxialShadowAt(step);
  const screenFront = v(model.screen + 5.5, 0);
  const els: El[] = [
    seg(v(model.screen, -4.8), v(model.screen, 4.8), { tone: "muted", bold: true }),
    seg(v(0, 0), v(model.screen, 0), { tone: "muted", thin: true, dash: true }),
  ];
  for (const [index, path] of model.sources.entries()) {
    const tone = index === 0 ? "a" : "b";
    for (const sign of [1, -1]) {
      els.push(
        seg(v(path.source, 0), v(path.tangentX, sign * path.tangentY), { tone, thin: true }),
        seg(v(path.tangentX, sign * path.tangentY), v(model.screen, sign * path.radius), { tone, thin: true, dash: true }),
      );
    }
    els.push(
      circle(v(path.source, 0), 0.15, { tone, fill: tone }),
      txt(v(path.source + (index === 0 ? -0.3 : 0.3), 1.55), index === 0 ? "K" : "L", "n", { tone, bold: true }),
    );
  }
  els.push(
    circle(v(model.centre, 0), model.sphereRadius, { tone: "ink", fill: "ink" }),
    circle(screenFront, model.outerRadius, { tone: "b", fill: "b", bold: true }),
    circle(screenFront, model.umbraRadius, { tone: "ink", fill: "ink", bold: true }),
    txt(v(model.centre, -1.55), "Opak küre", "s", { tone: "ink", small: true }),
    txt(v(model.screen, 5.45), "Perde kesiti", "n", { tone: "ink", small: true }),
    txt(v(screenFront[0], 5.45), "Önden", "n", { tone: "ink", small: true }),
  );
  return {
    els,
    readout: [
      `İç daire (tam gölge) ${fmt(model.umbraArea)} cm². Halka (yarı gölge) ${fmt(model.penumbraArea)} cm².`,
      "Ortada iki kaynak engellenir. Halkaya bir kaynak, halkanın dışına iki kaynak ışık verir.",
    ],
  };
}

const alt = "Yatay eksendeki K ve L kaynaklarının teğet sınır ışınları, ortadaki opak kürenin ardından perdede sonlanır. Perdeye önden bakıldığında tam gölge iç daire, yarı gölge onu saran halkadır.";
export const coaxialShadowFigures: Record<string, FigureDef> = {
  [coaxialShadowTitle]: {
    caption: "Her adımda ilk düzenden başlayıp tek parçayı sağa kaydır. Perdeye yandan ve önden bak.",
    alt, steps: coaxialShadowSteps, draw: (_value, step) => projection(step),
  },
  [beforeSourceMovesTitle]: { caption: "K ve L ilk yerlerinde.", alt, draw: () => projection(0) },
  [firstSourceMovesTitle]: { caption: "Yalnız K küreye yaklaşır.", alt, draw: () => projection(1) },
  [secondSourceMovesTitle]: { caption: "Yalnız L küreye yaklaşır.", alt, draw: () => projection(2) },
};
