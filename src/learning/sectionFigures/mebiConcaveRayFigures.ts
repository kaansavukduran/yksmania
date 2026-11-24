import { concaveNormalTitle, concaveRayAt, concaveReturnTitle, curvatureFocusTitle } from "../mebiConcaveRay";
import { add, ang, dim, fmt, mul, poly, pt, seg, v, vec, type El, type FigureDef } from "./figureKit";

function mirrorSurface(radius: number, centerX: number) {
  const arc = Array.from({ length: 21 }, (_, index) => {
    const y = -radius * 0.42 + radius * 0.84 * index / 20;
    return v(centerX - Math.sign(centerX) * Math.sqrt(radius ** 2 - y ** 2), y);
  });
  return poly(arc, { open: true, tone: "ink", bold: true });
}

function radiusFrame(radius: number, step: number) {
  const centerX = step ? radius : -radius;
  const T = v(0, 0), F = v(centerX / 2, 0), M = v(centerX, 0);
  return {
    els: [
      seg(v(-radius - 0.6, 0), v(radius + 0.6, 0), { tone: "muted", thin: true }),
      mirrorSurface(radius, centerX),
      pt(T, "T", "n", "ink"), pt(F, "F", "n", "b"), pt(M, "M", "n", "ink"),
      dim(T, F, `f = ${fmt(radius / 2)}`, v(0, -1), "ink"),
      dim(F, M, `f = ${fmt(radius / 2)}`, v(0, -1), "ink"),
    ],
    readout: [
      `R = ${fmt(radius)} birim. Odak uzaklığı f = ${fmt(radius / 2)} birim.`,
      step ? "F ve M aynanın arkasında." : "F ve M aynanın önünde.",
    ],
  };
}

function radiusNormalFrame(angle: number, showReturn: boolean) {
  const radial = concaveRayAt(3.6, 0.8, angle);
  const source = add(radial.hit, mul(radial.fromHitTowardSource, 3.25));
  const bounce = add(radial.hit, mul(radial.reflected, 3.25));
  const elements: El[] = [
    seg(v(-4, 0), v(0.65, 0), { tone: "muted", thin: true }),
    mirrorSurface(3.6, -3.6),
    seg(radial.hit, radial.center, { tone: "muted", dash: true, thin: true }),
    pt(radial.center, "M", "s", "ink"),
    pt(radial.hit, "N", "e", "ink"),
    vec(source, radial.hit, { tone: "a" }),
  ];
  if (angle > 0) elements.push(ang(radial.hit, radial.center, source, undefined, { tone: "a" }));
  if (showReturn) {
    elements.push(vec(radial.hit, bounce, { tone: "b" }));
    if (angle > 0) elements.push(ang(radial.hit, radial.center, bounce, undefined, { tone: "b" }));
  }
  return {
    els: elements,
    readout: [
      "Kesik NM doğrusu temas noktasının normali.",
      showReturn ? `Gelme ${angle}°, yansıma ${angle}°.` : `Normalden ölçülen gelme açısı ${angle}°.`,
    ],
  };
}

const radialAlt = "Çukur aynada temas N, küre merkezi M. N ile M’yi bağlayan kesik normalden iki ayrı açı ölçülür.";

export const concaveRayFigures: Record<string, FigureDef> = {
  [curvatureFocusTitle]: {
    caption: "R değerini değiştir. İki eş f aralığının toplamı R olarak kalır.",
    alt: "Asal eksende ayna tepesi T ile merkez M arasında odak F bulunur. İki eş f aralığının boyu yarıçapla değişir.",
    param: { label: "Eğrilik yarıçapı", min: 2.4, max: 6, step: 0.6, init: 3.6, unit: "birim" },
    steps: ["Çukur yüzey", "Tümsek yüzey"],
    draw: radiusFrame,
  },
  [concaveNormalTitle]: {
    caption: "Önce temas noktasının normali, sonra onun öte yanındaki yansıyan ışın.",
    alt: radialAlt,
    param: { label: "Yerel normalden gelme açısı", min: 0, max: 45, step: 5, init: 30, unit: "°" },
    steps: ["Normal ve gelen ışın", "Yansıyan ışın"],
    draw: (angle, step) => radiusNormalFrame(angle, step === 1),
  },
  [concaveReturnTitle]: {
    caption: "Örnekte normalin iki yanında eş 30° açı görülür.",
    alt: radialAlt,
    draw: () => radiusNormalFrame(30, true),
  },
};
