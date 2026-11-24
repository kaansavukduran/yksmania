import { focusDepthKm } from "../mebiSeismicFocus";
import { seismicFrontRadiusKm, seismicWavefrontTimes, seismicWavefrontTitle } from "../mebiSeismicWavefront";
import { fmt, poly, pt, seg, txt, v, type El, type FigureDef, type FigureFrame, type V } from "./figureKit";

const focus = v(0, -focusDepthKm);

function crustArc(radius: number): V[] {
  const surfaceAngle = radius > focusDepthKm ? Math.asin(focusDepthKm / radius) : Math.PI / 2;
  const startAngle = Math.PI - surfaceAngle;
  const sweep = Math.PI + 2 * surfaceAngle;
  return Array.from({ length: 49 }, (_, index) => {
    const angle = startAngle + sweep * index / 48;
    return v(radius * Math.cos(angle), Math.min(0, focus[1] + radius * Math.sin(angle)));
  });
}

function wavefront(time: number): FigureFrame {
  const current = seismicFrontRadiusKm(time);
  const els: El[] = [
    seg(v(-12, 0), v(12, 0), { tone: "ink", bold: true }),
    seg(v(-5, 0), v(6, -13.2), { tone: "warn", dash: true }),
    seg(focus, v(0, 0), { tone: "muted", dash: true }),
    pt(v(0, 0), "Dış merkez", "n"),
    seg(v(-11.15, -focusDepthKm), focus, { tone: "muted", thin: true }),
    pt(focus, undefined, "se", "warn"),
    txt(v(-11.15, -focusDepthKm + 1.1), "Odak", "n", { tone: "warn", small: true }),
    txt(v(-8, 1.25), "Yeryüzü", "n", { small: true }),
  ];
  for (const earlier of [0.5, 1]) {
    if (earlier < time) {
      els.push(poly(crustArc(seismicFrontRadiusKm(earlier)), { open: true, bare: true, thin: true, tone: "muted" }));
    }
  }
  if (current > 0) {
    els.push(poly(crustArc(current), { open: true, bare: true, bold: true, tone: "b" }));
  }
  const reached = current >= focusDepthKm;
  return {
    els,
    readout: [
      `${fmt(time, 2)} s sonra cephe yarıçapı ${fmt(current, 2)} km.`,
      reached ? "Cephe dış merkeze erişti." : "Cephe dış merkeze henüz erişmedi.",
    ],
  };
}

export const seismicWavefrontFigures: Record<string, FigureDef> = {
  [seismicWavefrontTitle]: {
    caption: "Zamanı değiştir. Son dalga cephesini önceki konumlarla karşılaştır.",
    alt: "Kesitte yüzeyin altında odak ve yüzeyde dış merkez var. Eş merkezli dalga cepheleri odak etrafında genişliyor.",
    param: { ...seismicWavefrontTimes, label: "Başlangıçtan sonra geçen süre", unit: " s" },
    draw: wavefront,
  },
};
