import { clearRayTitle, diffuseRayTitle, opaqueRayTitle, transmissionTitle } from "../mebiLightTransmission";
import { poly, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";

const states = [
  { title: clearRayTitle, label: "Saydam cam", tone: "b", ends: [-0.65, 0, 0.65], alt: "Üç ışın düz pencere camına dik ulaşıyor ve arka tarafa aynı doğrultularda geçiyor.", outcome: "Geçen ışınların doğrultusu korunur. Arkadaki ayrıntılar seçilir." },
  { title: diffuseRayTitle, label: "Buzlu cam", tone: "a", ends: [-1.6, 0, 1.6], alt: "Üç ışın buzlu cama dik ulaşıyor. Diğer taraftaki temsili ışınlar farklı doğrultulara dağılıyor.", outcome: "Işık geçer ve farklı yönlere saçılır. Aydınlık görünür, ayrıntı zor seçilir." },
  { title: opaqueRayTitle, label: "Metal levha", tone: "muted", ends: [], alt: "Gelen üç ışın kalın levhanın ön yüzüne ulaşıyor. Levhanın arkasına geçen ışın çizilmemiş.", outcome: "Doğrudan geçen ışın yoktur. Levhanın arkasındaki ayrıntılar bu yoldan görünmez." },
] as const;

function rays(state: typeof states[number]): FigureFrame {
  const incoming = [-0.65, 0, 0.65];
  const els: El[] = [
    poly([v(0, -1.45), v(0.42, -1.45), v(0.42, 1.45), v(0, 1.45)], { fill: state.tone, tone: state.tone, bold: true }),
    txt(v(0.21, 2.03), state.label, "n", { tone: "ink", small: true, bold: true }),
    txt(v(-2.35, 1.3), "Gelen ışık", "n", { tone: "ink", small: true }),
  ];
  for (const y of incoming) els.push(vec(v(-3.85, y), v(-0.12, y), { tone: "a", thin: true }));
  for (const [index, y] of state.ends.entries()) {
    els.push(vec(v(0.52, incoming[index]), v(3.65, y), { tone: "b", thin: true }));
  }
  els.push(txt(v(2.6, -2.05), state.ends.length ? "Geçen ışık" : "Geçen ışık yok", "s", { tone: "ink", small: true }));
  return { els, readout: [state.outcome] };
}

export const lightTransmissionFigures: Record<string, FigureDef> = {
  [transmissionTitle]: {
    caption: "Aynı gelen demeti üç yüzeyde izle. Oklar ışın yönlerini gösteren temsili çizimlerdir.",
    alt: "Gelen ışınlar ve yüzeyi geçebilen ışınlar saydam cam, buzlu cam ve metal levha için sırayla gösteriliyor.",
    steps: states.map(state => state.label),
    draw: (_value, step) => rays(states[step]),
  },
};
for (const state of states) {
  lightTransmissionFigures[state.title] = { caption: state.outcome, alt: state.alt, draw: () => rays(state) };
}
