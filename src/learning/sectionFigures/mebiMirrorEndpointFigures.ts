import { mirrorEndpointsTitle, mirrorJoinedTitle, mirrorKTitle, mirrorLTitle, mirrorObject } from "../mebiMirrorEndpoints";
import { add, fmt, mul, pt, seg, sub, txt, unit, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";

function buildMirror(step: number): FigureFrame {
  const els: El[] = [
    seg(v(0, -3.3), v(0, 3.4), { tone: "ink", bold: true }),
    seg(mirrorObject[0].point, mirrorObject[1].point, { tone: "a", bold: true }),
    txt(v(0, 4.0), "Ayna", "n", { tone: "ink", small: true }),
  ];
  const points = step === 2 ? mirrorObject : [mirrorObject[step]];
  for (const { label, point, hits } of points) {
    const image = v(-point[0], point[1]);
    const tone = label === "K" ? "b" : "c";
    els.push(pt(point, label, label === "K" ? "s" : "n", "ink"), pt(image, label + "′", "e", tone, true));
    if (step < 2) {
      for (const height of hits) {
        const p = v(0, height);
        const reflectedDirection = unit(sub(p, image));
        els.push(vec(point, p, { tone, thin: true }), vec(p, add(p, mul(reflectedDirection, 2.5)), { tone, bold: true }), seg(p, image, { tone, dash: true }));
      }
    } else {
      els.push(seg(point, image, { tone: "muted", thin: true, dash: true }));
    }
  }
  if (step === 2) {
    els.push(seg(v(3.4, -1.45), v(2.1, 1.35), { tone: "b", bold: true }));
    const length = Math.hypot(...sub(mirrorObject[1].point, mirrorObject[0].point));
    return { els, readout: [`KL uzunluğu ${fmt(length, 2)} birim. K′L′ de ${fmt(length, 2)} birim.`, "Her görüntü ucu, karşılık geldiği cisim ucuyla aynaya eşit dik uzaklıkta."] };
  }
  const { point, label } = mirrorObject[step];
  return { els, readout: [`${label} ve ${label}′ aynadan ${fmt(-point[0])} birim dik uzaklıkta.`, "Öndeki oklar yansıyan ışınlar. Arkadaki kesik çizgiler onların geri uzantıları."] };
}

const alt = "Ortada düşey ayna. Eğimli KL parçası solda. Yansıyan ışınlar solda, kesik geri uzantıları sağda. K′ ve L′, kendi uçlarının aynaya göre karşılığı.";
export const mirrorEndpointFigures: Record<string, FigureDef> = {
  [mirrorEndpointsTitle]: { caption: "Önce K ve L için ışınları ayrı çiz. İki görüntü ucunu sonra bağla.", alt, steps: ["K ucu", "L ucu", "Görüntü"], draw: (_value, step) => buildMirror(step) },
  [mirrorKTitle]: { caption: "K için iki geri uzantı K′’de birleşir.", alt, draw: () => buildMirror(0) },
  [mirrorLTitle]: { caption: "L için iki geri uzantı L′’de birleşir.", alt, draw: () => buildMirror(1) },
  [mirrorJoinedTitle]: { caption: "K′ ve L′ birleşir. Eğik parçanın boyu korunur.", alt, draw: () => buildMirror(2) },
};
