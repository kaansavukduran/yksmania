import { buoyancyEquilibriumExampleTitle, buoyancyEquilibriumTitle, equilibriumState } from "../mebiBuoyancyEquilibrium";
import { overflowBlockLitres } from "../mebiArchimedesOverflow";
import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

const surface = 3.7;
const size = 0.90;
const shapes = [
  (x: number, bottom: number) => poly([v(x - 0.55, bottom), v(x + 0.55, bottom), v(x, bottom + size)], { fill: "a", tone: "ink" }),
  (x: number, bottom: number) => poly([v(x - 0.40, bottom), v(x + 0.40, bottom), v(x + 0.40, bottom + size), v(x - 0.40, bottom + size)], { fill: "b", tone: "ink" }),
  (x: number, bottom: number) => circle(v(x, bottom + size / 2), size / 2, { fill: "c", tone: "ink" }),
];
const letters = ["A", "B", "C"];
const settledPosition = ["yüzeyde", "askıda", "tabanda"];

function drawEquilibrium(settled: boolean, indices: readonly number[]) {
  const width = 1.45 + 1.9 * indices.length;
  const els: El[] = [
    poly([v(0, 0), v(width, 0), v(width, surface), v(0, surface)], { fill: "b", tone: "b", thin: true }),
    poly([v(0, 4.55), v(0, 0), v(width, 0), v(width, 4.55)], { open: true, bold: true }),
    seg(v(0, surface), v(width, surface), { tone: "b" }),
  ];
  const readout = indices.map((index, column) => {
    const x = 1.66 + column * 1.90;
    const state = equilibriumState(index, settled);
    const level = !settled || index === 1 ? 1.4 : index === 2 ? 0.18
      : surface - size * (1 - Math.sqrt(1 - state.immersedLitres / overflowBlockLitres));
    const label = letters[index];
    els.push(shapes[index](x, level), txt(v(x, -0.28), label, "s", { small: true, bold: true }));
    if (settled && index === 2) els.push(seg(v(x - 0.62, level), v(x + 0.62, level), { dash: true }));
    if (state.upwardsNetForce > 0) els.push(vec(v(x, level + size + 0.16), v(x, level + size + 0.83), { tone: "ink", bold: true }));
    if (state.upwardsNetForce < 0) els.push(vec(v(x, level - 0.13), v(x, level - 0.7), { tone: "ink", bold: true }));
    if (settled) return `${label} ${settledPosition[index]}. Batık hacim ${fmt(state.immersedLitres)} L. Kaldırma ${state.buoyancy} N · destek ${state.support} N · net 0 N.`;
    const direction = state.upwardsNetForce > 0 ? " yukarı" : state.upwardsNetForce < 0 ? " aşağı" : "";
    return `${label}: Kaldırma ${state.buoyancy} N · ağırlık ${state.weight} N · net ${Math.abs(state.upwardsNetForce)} N${direction}.`;
  });
  return { els, readout };
}

const main: FigureDef = {
  caption: "İlk adımda oklar net kuvvetin yönünü gösterir. Son adımda üç cisim de dengededir.",
  alt: "Su kabında A üçgen, B kare, C daire. İlk anda hepsi aynı seviyede ve tam batık. A’nın oku yukarı, C’ninki aşağı. Son dengede A yüzeyde, B askıda, C gözenekli taban desteğinde.",
  steps: ["Serbest bırakıldıkları an", "Son denge"],
  draw: (_, step) => drawEquilibrium(step === 1, [0, 1, 2]),
};

export const mebiBuoyancyEquilibriumFigures: Record<string, FigureDef> = {
  [buoyancyEquilibriumTitle]: main,
  [buoyancyEquilibriumExampleTitle]: {
    caption: "A’nın 2 L’lik hacminin 1,2 L’si su içinde kaldığında ağırlık ve kaldırma dengelenir.",
    alt: "A üçgeni suyun yüzeyinde ve kısmen batık. Su çizgisinin altındaki pay toplam hacmin yüzde altmışı.",
    draw: () => drawEquilibrium(true, [0]),
  },
};
