import { concaveSpecialRayAt, concaveSpecialSteps, concaveSpecialTitle } from "../mebiConcaveSpecialRays";
import { sphericalMirrorAt } from "../mebiSphericalMirror";
import { add, ang, fmt, mul, poly, pt, seg, v, vec, type El, type FigureDef } from "./figureKit";

const mirrorPoints = Array.from({ length: 25 }, (_, index) =>
  sphericalMirrorAt("concave", -1.9 + 3.8 * index / 24).hit,
);
const captions = [
  "Paralel gelen ışın, odağın yakınında asal ekseni keser.",
  "Bir önceki ışın yolu ters çevrilince dönüş eksene paralel olur.",
  "Merkezden gelen ışın yerel normal boyunca ilerler ve geri döner.",
  "Tepede yerel normal asal eksenle aynı çizgidir.",
  "F ile M arasından gelen örneğin gerçek kolu, M’nin uzağında ekseni keser.",
  "F ile T arasından gelen örnekte kesik geri uzantı, ekseni aynanın arkasında keser.",
] as const;

function trace(step: number) {
  const ray = concaveSpecialRayAt(step);
  const real = ray.distance !== null && ray.distance > 0;
  const reflectedEnd = add(ray.hit, mul(ray.reflected, real ? ray.distance! + 0.5 : 2.8));
  const elements: El[] = [
    seg(v(-6.5, 0), v(2.4, 0), { tone: "muted", thin: true }),
    poly(mirrorPoints, { open: true, tone: "ink", bold: true }),
    seg(ray.hit, ray.center, { tone: "muted", thin: true, dash: true }),
    vec(ray.source, ray.hit, { tone: "a" }),
    vec(ray.hit, reflectedEnd, { tone: "b" }),
    pt(ray.center, "M", "s", "ink"),
    pt(ray.focus, "F", "s", "ink"),
    pt(v(0, 0), "T", "s", "ink"),
  ];
  if (step === 3) {
    elements.push(
      ang(ray.hit, ray.center, ray.source, undefined, { tone: "a" }),
      ang(ray.hit, ray.center, reflectedEnd, undefined, { tone: "b" }),
    );
  }
  if (step === 4 || step === 5) elements.push(pt(ray.source, "A", "n", "ink"));
  if (ray.crossing && !real) elements.push(seg(ray.hit, ray.crossing, { tone: "c", dash: true }));
  if (ray.crossing && (step === 4 || step === 5)) {
    elements.push(pt(ray.crossing, "K", "n", real ? "b" : "c", !real));
  }
  const measurement = ray.crossing && step !== 2
    ? `${real ? "Gerçek kesişim" : "Sanal kesişim"} tepeden ${fmt(Math.abs(ray.crossing[0]), 2)} birim uzakta.`
    : ["", "Yansıma asal eksene paralel.", "Gelme ve yansıma 0°.", "Gelme ve yansıma 30°."][step];
  return { els: elements, readout: [captions[step], measurement] };
}

const alt = "Çukur aynada T tepe, F yaklaşık odak, M merkez. Gelen ok, yansıyan ok ve varsa kesik geri uzantı çizilir. Eksen noktaları A ve K kaynak ve kesişimi gösterir.";

export const concaveSpecialRayFigures: Record<string, FigureDef> = {
  [concaveSpecialTitle]: {
    caption: "Altı yolu sırayla aç. Normale göre yön değişimini ve gerçek okla kesik uzantıyı karşılaştır.",
    alt,
    steps: [...concaveSpecialSteps],
    draw: (_, step) => trace(step),
  },
  ...Object.fromEntries(concaveSpecialSteps.map((title, step) => [
    title, { caption: captions[step], alt, draw: () => trace(step) },
  ])),
};
