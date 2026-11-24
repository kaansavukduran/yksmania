import {
  sphericalAxisTitle, sphericalConcaveTitle, sphericalConvexTitle, sphericalMirrorAt,
  sphericalMirrorRadius, sphericalMirrorVertex, sphericalSurfaceTitle, type MirrorSurface,
} from "../mebiSphericalMirror";
import { add, circle, fmt, mul, poly, pt, seg, v, vec, type El, type FigureDef } from "./figureKit";

export function mirrorArc(surface: MirrorSurface) {
  const points = Array.from({ length: 25 }, (_, index) => {
    const y = -1.9 + 3.8 * index / 24;
    return sphericalMirrorAt(surface, y).hit;
  });
  return poly(points, { open: true, tone: "ink", bold: true });
}

function reflectedPaths(surface: MirrorSurface, height: number) {
  const upper = sphericalMirrorAt(surface, height);
  const lower = sphericalMirrorAt(surface, -height);
  const real = surface === "concave";
  const elements: El[] = [
    seg(v(-4.6, 0), v(4.6, 0), { tone: "muted", thin: true }),
    mirrorArc(surface),
    seg(upper.center, upper.hit, { tone: "muted", thin: true, dash: true }),
    pt(upper.center, "M", "s", "ink"),
    pt(upper.focus, "F", "s", "ink"),
    pt(sphericalMirrorVertex, "T", "s", "ink"),
  ];
  for (const ray of [upper, lower]) {
    elements.push(
      vec(v(-4.35, ray.hit[1]), ray.hit, { tone: "a" }),
      vec(ray.hit, add(ray.hit, mul(ray.reflected, real ? (ray.distanceToAxis ?? 0) + 0.5 : 2.7)), { tone: "b" }),
    );
    if (!real && ray.crossing) elements.push(seg(ray.hit, ray.crossing, { tone: "c", dash: true }));
  }
  if (upper.crossing && Math.abs(upper.crossing[0] - upper.focus[0]) > 0.15) {
    elements.push(pt(upper.crossing, undefined, "n", real ? "b" : "c", !real));
  }
  const distance = Math.abs(upper.crossing?.[0] ?? upper.focus[0]);
  return {
    els: elements,
    readout: [
      `${real ? "Gerçek ışınlar aynanın önünde" : "Geri uzantılar aynanın arkasında"} kesişir. T’ye uzaklık ${fmt(distance, 2)} birim.`,
      `Eksen yakınındaki odak F, T’den ${fmt(sphericalMirrorRadius / 2)} birim uzakta.`,
    ],
  };
}

const pathAlt = "İki yatay gelen ışın eğri aynadan yansır. Yarıçap kesik ince doğruyla, tümsek durumda aynanın arkasındaki sanal kollar kesik çizgiyle gösterilir. T tepe, F odak, M merkez.";

export const sphericalMirrorFigures: Record<string, FigureDef> = {
  [sphericalSurfaceTitle]: {
    caption: "İç ve dış yüzü değiştir. Eksen yüksekliğini artırarak gerçek ışınlarla geri uzantıların yolunu karşılaştır.",
    alt: pathAlt,
    param: { label: "Işının eksene uzaklığı", min: 0.4, max: 1.8, step: 0.2, init: 0.4 },
    steps: ["Çukur ayna", "Tümsek ayna"],
    draw: (height, step) => reflectedPaths(step ? "convex" : "concave", height),
  },
  [sphericalAxisTitle]: {
    caption: "Aynayı tamamlayan küre kesik çizgide. M ile T’nin orta noktasında F bulunur.",
    alt: "Daire ile gösterilen küre kesiti, sağ çeperindeki kalın çukur ayna parçası, merkez M, orta nokta F ve tepe T. Üç nokta asal eksende.",
    draw: () => {
      const mirror = sphericalMirrorAt("concave", 0);
      return { els: [
        circle(mirror.center, sphericalMirrorRadius, { tone: "muted", thin: true, dash: true }),
        seg(v(-7.4, 0), v(0.65, 0), { tone: "muted", thin: true }),
        mirrorArc("concave"),
        pt(mirror.center, "M", "s", "ink"),
        pt(mirror.focus, "F", "s", "ink"),
        pt(sphericalMirrorVertex, "T", "s", "ink"),
      ], readout: ["MT = 3,6 birim. TF = FM = 1,8 birim."] };
    },
  },
  [sphericalConcaveTitle]: {
    caption: "Çukur yüzeyden dönen iki ışın aynanın önünde buluşur.", alt: pathAlt,
    draw: () => reflectedPaths("concave", 0.4),
  },
  [sphericalConvexTitle]: {
    caption: "Tümsek yüzeyde gerçek ışınlar ayrılır, kesik geri uzantılar buluşur.", alt: pathAlt,
    draw: () => reflectedPaths("convex", 0.4),
  },
};
