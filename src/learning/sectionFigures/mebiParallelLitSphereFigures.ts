import { parallelLitSphereAt, parallelLitSphereTitle, raisedLitSphereTitle, sideLitSphereTitle } from "../mebiParallelLitSphere";
import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";

const diskRadius = 1.8;
const diskCentre = 7.6;

function visibleSphere(elevation: number): FigureFrame {
  const model = parallelLitSphereAt(elevation);
  const upper = Array.from({ length: 33 }, (_, index) => {
    const angle = Math.PI * index / 32;
    return v(diskCentre + diskRadius * Math.cos(angle), diskRadius * Math.sin(angle));
  });
  const boundary = Array.from({ length: 33 }, (_, index) => {
    const angle = Math.PI * (1 - index / 32);
    return v(diskCentre + diskRadius * Math.cos(angle), -model.facingLight * diskRadius * Math.sin(angle));
  });
  const sideSphere = Array.from({ length: 33 }, (_, index) => {
    const angle = Math.PI * index / 32;
    return v(diskRadius * Math.cos(angle), diskRadius * Math.sin(angle));
  });
  const els: El[] = [
    circle(v(0, 0), diskRadius, { tone: "ink", fill: "ink" }),
    poly(sideSphere, { tone: "warn", fill: "warn" }),
    ...[-1.44, -0.72, 0, 0.72, 1.44].map(x => vec(v(x, 4.1), v(x, Math.sqrt(diskRadius ** 2 - x ** 2)), { tone: "a", thin: true })),
    seg(v(model.observerX, model.observerY), v(0, 0), { tone: "muted", dash: true, thin: true }),
    circle(v(model.observerX, model.observerY), 0.18, { tone: "b", fill: "b" }),
    txt(v(model.observerX - 0.2, model.observerY - 0.55), "Göz", "sw", { tone: "ink", small: true }),
    txt(v(0, 4.75), "Paralel ışınlar", "n", { tone: "ink", small: true }),
    circle(v(diskCentre, 0), diskRadius, { tone: "ink", fill: "ink" }),
    poly([...upper, ...boundary], { tone: "warn", fill: "warn", smooth: true }),
    txt(v(diskCentre, 2.5), "Görünen disk", "n", { tone: "ink", small: true }),
  ];
  return { els, readout: [`Görünen diskin aydınlık oranı %${fmt(100 * model.illuminatedFraction, 1)}.`, "Kürenin doğrudan ışık alan yüzeyi aynı üst yarımküre."] };
}

const alt = "Üstten paralel ışınlar opak kürenin üst yarısını aydınlatıyor. Soldaki gözlemcinin yönü kesik çizgiyle, gördüğü aydınlık alan sağdaki dairede gösteriliyor.";
export const parallelLitSphereFigures: Record<string, FigureDef> = {
  [parallelLitSphereTitle]: { caption: "Gözü yukarı veya aşağı taşı. Sağdaki diskte aydınlık alanı izle.", alt, param: { label: "Gözlemcinin yataya göre açısı", min: -60, max: 60, step: 15, init: 0, unit: "°" }, draw: visibleSphere },
  [sideLitSphereTitle]: { caption: "Yandan bakan göz, diskin yarısını aydınlık görür.", alt, draw: () => visibleSphere(0) },
  [raisedLitSphereTitle]: { caption: "Göz yatayın 30° üstünde.", alt, draw: () => visibleSphere(30) },
};
