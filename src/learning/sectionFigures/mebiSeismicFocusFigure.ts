import { focusDepthKm, seismicArrival, seismicFocusTitle } from "../mebiSeismicFocus";
import { fmt, poly, pt, seg, span, txt, v, vec, type FigureDef } from "./figureKit";

export const mebiSeismicFocusFigure: Record<string, FigureDef> = {
  [seismicFocusTitle]: {
    caption: "Yüzeydeki istasyonu kaydır. Dış merkez odağın üstünde kalır. Kesik çizgiler düşey ve yatay uzaklığı, eğik çizgi dalgaların bu modelde izlediği yolu gösterir.",
    alt: "Yer kesitinde iki kaya parçasını eğik fay ayırıyor. Fay üzerinde altı kilometre derinde odak var. Yüzeyde dış merkez ve sağda konumu değiştirilebilen istasyon işaretli.",
    param: { label: "İstasyonun dış merkeze uzaklığı", min: 0, max: 12, step: 1, init: 8, unit: " km" },
    draw: (station) => {
      const arrival = seismicArrival(station);
      const epicenter = v(0, 0);
      const focus = v(0, -focusDepthKm);
      const sensor = v(station, 0);
      return {
        els: [
          poly([v(-6, 0), v(-4, 0), v(2, -9), v(-6, -9)], { tone: "muted", fill: "muted", thin: true }),
          poly([v(-4, 0), v(14, 0), v(14, -9), v(2, -9)], { tone: "muted", fill: "c", thin: true }),
          seg(v(-6, 0), v(14, 0), { tone: "ink", bold: true }),
          seg(v(-4, 0), v(2, -9), { tone: "warn", bold: true }),
          vec(v(-4.1, -5), v(-2.8, -6.9), { tone: "warn" }),
          vec(v(2.7, -6), v(1.4, -4.1), { tone: "warn" }),
          txt(v(-3.72, -2.3), "Fay", "w", { small: true, tone: "warn", bold: true }),
          seg(focus, epicenter, { tone: "ink", dash: true }),
          ...span(v(-0.9, -focusDepthKm), v(-0.9, 0), "6 km", v(-1.8, -focusDepthKm / 2), "ink"),
          pt(focus, "Odak", "se", "a"),
          ...(station === 0 ? [pt(epicenter, "Dış merkez ve istasyon", "n", "b")] : [
            seg(focus, sensor, { tone: "b", bold: true }),
            txt(v(station * 0.54, -2.7), `${fmt(arrival.pathKm, 2)} km`, "se", { tone: "b", small: true, bold: true }),
            pt(epicenter, "Dış merkez", "nw", "ink"),
            pt(sensor, "İstasyon", "ne", "b"),
            ...span(v(0, 2.1), v(station, 2.1), `${fmt(station)} km`, 1, "b"),
          ]),
        ],
        readout: [`Yüzeyde ${fmt(station)} km. Odaktan istasyona ${fmt(arrival.pathKm, 2)} km.`, `P ${fmt(arrival.pSeconds, 2)} s, S ${fmt(arrival.sSeconds, 2)} s. Fark ${fmt(arrival.differenceSeconds, 2)} s.`],
      };
    },
  },
};
