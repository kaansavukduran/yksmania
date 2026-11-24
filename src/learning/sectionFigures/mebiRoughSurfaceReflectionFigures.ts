import { commonNormalTitle, roughSurfaceTitle, tiltedNormalsTitle } from "../mebiRoughSurfaceReflection";
import { add, deg, dot, fmt, mul, pol, seg, sub, txt, v, vec, type El, type FigureDef } from "./figureKit";

function surfaceReflection(maxTilt: number) {
  const incident = pol(1, -55);
  const els: El[] = [];
  const panel = (centre: number, tilt: number) => [tilt, -tilt / 2, tilt / 3].map((slope, index) => {
    const origin = v(centre + 1.7 * (index - 1), 0);
    const normal = pol(1, 90 + slope);
    const tangent = pol(0.77, slope);
    const reflected = sub(incident, mul(normal, 2 * dot(incident, normal)));
    els.push(
      seg(sub(origin, tangent), add(origin, tangent), { tone: "ink", bold: true }),
      seg(origin, add(origin, mul(normal, 2.8)), { tone: "muted", dash: true, thin: true }),
      vec(sub(origin, mul(incident, 2.6)), origin, { tone: "a", thin: true }),
      vec(origin, add(origin, mul(reflected, 2.6)), { tone: "b", thin: true }),
    );
    return fmt(deg(Math.acos(-dot(incident, normal))), 1) + "°";
  });
  const coplanar = panel(-4.35, 0);
  const uneven = panel(4.35, maxTilt);
  els.push(txt(v(-4.35, -0.9), "Düz yüzey", "s", { tone: "ink", small: true }), txt(v(4.35, -0.9), "Üç yerel eğim", "s", { tone: "ink", small: true }));
  return { els, readout: [`Düz yüzeyde i = r: ${coplanar.join(" · ")}.`, `Üç yerel eğimde i = r: ${uneven.join(" · ")}.`] };
}

const alt = "İki tarafta üç paralel gelen ok var. Solda yatay yüzeyin normalleri paralel. Sağda üç küçük yüzey parçasının kesik normalleri ayrı eğimlerde. Yansıyan oklar normalden aynı açıyla dönüyor.";
export const roughSurfaceReflectionFigures: Record<string, FigureDef> = {
  [roughSurfaceTitle]: { caption: "Sağdaki parçaların eğimini değiştir. Kesik normallerle yansıyan okları beraber izle.", alt, param: { label: "Yüzey parçalarının eğimi", min: 0, max: 20, step: 5, init: 15, unit: "°" }, draw: surfaceReflection },
  [commonNormalTitle]: { caption: "Üç dönüş ışını paralel.", alt, draw: () => surfaceReflection(0) },
  [tiltedNormalsTitle]: { caption: "Yerel normaller değişince üç farklı dönüş yönü oluşuyor.", alt, draw: () => surfaceReflection(20) },
};
