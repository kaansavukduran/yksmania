import { convexSpecialRayAt, convexSpecialSteps, convexSpecialTitle } from "../mebiConvexSpecialRays";
import { mirrorArc } from "./mebiSphericalMirrorFigures";
import { add, ang, fmt, mul, pt, seg, v, vec, type El, type FigureDef } from "./figureKit";

const surface = mirrorArc("convex");
const captions = [
  "Geri uzantı aynanın arkasında F çevresine ulaşır.",
  "F çevresine yönelen gelen ışın aynadan paralel çıkar.",
  "Merkeze yönelen ışın normal boyunca gelir ve aynı doğrultuda geri gider.",
  "Geliş ve dönüş açıları temas noktasındaki normalden ölçülür.",
] as const;

function drawPath(step: number, height: number) {
  const ray = convexSpecialRayAt(step, height);
  const reflectedEnd = add(ray.hit, mul(ray.reflected, 3));
  const elements: El[] = [
    seg(v(-6.1, 0), v(4.1, 0), { tone: "muted", thin: true }),
    surface,
    vec(ray.source, ray.hit, { tone: "a" }),
    vec(ray.hit, reflectedEnd, { tone: "b" }),
    pt(v(0, 0), "T", "s", "ink"),
    pt(ray.focus, "F", "s", "ink"),
    pt(ray.center, "M", "s", "ink"),
  ];
  if (ray.guide) elements.push(seg(ray.hit, ray.guide, { tone: "c", dash: true }));
  if (step === 3) {
    const frontNormal = add(ray.hit, mul(ray.normal, 2.5));
    elements.push(
      seg(ray.center, frontNormal, { tone: "muted", dash: true, thin: true }),
      pt(ray.hit, "N", "e", "ink"),
      ang(ray.hit, frontNormal, ray.source, undefined, { tone: "a" }),
      ang(ray.hit, frontNormal, reflectedEnd, undefined, { tone: "b" }),
    );
  }
  const details = [
    `Sanal kesişim tepeden ${fmt(Math.abs(ray.crossing?.[0] ?? ray.focus[0]), 2)} birim arkada.`,
    "Yansıma asal eksene paralel.",
    "Geliş ve yansıma 0°. Işın aynı doğrultudan dönüyor.",
    "Gelme 30°, yansıma 30°.",
  ];
  return { els: elements, readout: [captions[step], details[step]] };
}

const alt = "Tümsek aynada iki gerçek ok ön tarafta, F ve M arka tarafta. Kesik doğrular yaklaşık odağa veya merkeze yönelir. Eğik gelişte N ile M arasındaki yerel normal çizilir.";

export const convexSpecialRayFigures: Record<string, FigureDef> = {
  [convexSpecialTitle]: {
    caption: "Dört geliş yolunu aç ve temas yüksekliğini değiştir. Kesik çizgilerin gerçek ışınlardan nerede ayrıldığını izle.",
    alt,
    param: { label: "Temas noktasının yüksekliği", min: 0.4, max: 1.6, step: 0.2, init: 0.4, unit: "birim" },
    steps: [...convexSpecialSteps],
    draw: (height, step) => drawPath(step, height),
  },
  ...Object.fromEntries(convexSpecialSteps.map((title, step) => [
    title, { caption: captions[step], alt, draw: () => drawPath(step, 0.4) },
  ])),
};
