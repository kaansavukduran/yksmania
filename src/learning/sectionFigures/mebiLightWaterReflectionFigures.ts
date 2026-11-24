import { angledReflectionTitle, directReflectionTitle, lightWaterReflectionTitle } from "../mebiLightWaterReflection";
import { waterReflectionAt } from "../mebiWaterReflection";
import { add, mul, right, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

const halfWidth = 3.5;

function twoReflections(angle: number, step: number) {
  const state = waterReflectionAt(angle);
  const returning = step === 1;
  const left = v(-4, 0);
  const rightSide = v(4, 0);
  const tone = returning ? "b" : "a";
  const wave = returning ? state.outgoingCrests : state.incomingCrests;
  const heading = returning ? state.reflected : mul(state.incident, -1);
  const els: El[] = [];
  for (const centre of [left, rightSide]) {
    const end = add(centre, mul(heading, 3.15));
    els.push(
      seg(add(centre, v(-halfWidth, 0)), add(centre, v(halfWidth, 0)), { tone: "ink", bold: true }),
      seg(centre, add(centre, v(0, 4.2)), { tone: "muted", dash: true }),
      returning ? vec(centre, end, { tone }) : vec(end, centre, { tone }),
    );
  }
  for (const crest of wave) {
    els.push(seg(add(rightSide, mul(crest.from, 0.55)), add(rightSide, mul(crest.to, 0.55)), { tone, thin: true }));
  }
  const nearCrest = wave[0];
  const meet = add(rightSide, mul(nearCrest.center, 0.55));
  els.push(
    right(meet, add(meet, heading), add(rightSide, mul(nearCrest.to, 0.55)), "ink"),
    txt(v(left[0], 4.65), "Işın", "n", { tone: "ink", small: true }),
    txt(v(rightSide[0], 4.65), "Su cephesi", "n", { tone: "ink", small: true }),
    txt(v(left[0], -0.8), "Yüzey", "s", { tone: "ink", small: true }),
    txt(v(rightSide[0], -0.8), "Engel", "s", { tone: "ink", small: true }),
  );
  return { els, readout: [returning ? `Normalden dönüş açısı ${angle}°.` : `Normalden geliş açısı ${angle}°.`, `Sınırla açı ${90 - angle}°. Su cephesi hareket okuna dik.`] };
}

const alt = "Solda ışın ve düz yüzey, sağda suda üç tepe cephesi ve düz engel. Oklar hareketi, kesik doğrular normali ve kare işaret su cephesi ile hareketin dikliğini gösterir.";
export const lightWaterReflectionFigures: Record<string, FigureDef> = {
  [lightWaterReflectionTitle]: {
    caption: "Bir açı seç. Geliş ve dönüş adımlarında, su cephesiyle ışının aynı normal kuralına uyduğunu izle.",
    alt, param: { label: "Normalden gelme açısı", min: 0, max: 60, step: 5, init: 0, unit: "°" }, steps: ["Geliş", "Dönüş"], draw: twoReflections,
  },
  [directReflectionTitle]: { caption: "Dik gelişte geri dönen ışın ve tepeler.", alt, draw: () => twoReflections(0, 1) },
  [angledReflectionTitle]: { caption: "35° gelişten sonra iki dönüş oku.", alt, draw: () => twoReflections(35, 1) },
};
