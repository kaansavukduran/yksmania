import {
  channelMeasurements,
  idealChannelExampleTitle,
  idealChannelState,
  idealChannelTitle,
  measuredChannelTitle,
} from "../mebiBernoulliChannel";
import { fmt, poly, seg, txt, v, vec, type FigureDef } from "./figureKit";

const measuredChannelFigure: FigureDef = {
  caption: "Okların uzunluğu ölçülen süratle orantılı. Ölçülen basınç her kesitin üzerinde yazıyor.",
  alt: "Bir su kanalının tabanı önce derin, sonra sığ. Derin tarafta geniş bir kesit ve kısa akış oku, sığ tarafta dar bir kesit ve uzun akış oku var. İki ölçüm ayrı yerlerde.",
  draw: () => {
    const floor = [v(0, 0), v(1.65, -0.34), v(3, -0.2), v(4.2, 0.53), v(5.6, 0.72), v(7.2, 0.15), v(8, 0.08)];
    const roof = 1.58;
    return {
      els: [
        poly([...floor, v(8, roof), v(0, roof)], { fill: "b", tone: "b", thin: true }),
        poly(floor, { open: true, bold: true }),
        seg(v(0, roof), v(8, roof), { bold: true }),
        ...channelMeasurements.flatMap(({ section, speed, pressure }, index) => {
          const x = index ? 5.55 : 1.65;
          const y = index ? 1.12 : 0.59;
          return [
            vec(v(x - 0.4, y), v(x - 0.4 + 0.29 * speed, y), { tone: "a", bold: true }),
            txt(v(x, 1.99), `${pressure} kPa`, "n", { small: true, bold: true }),
            txt(v(x, -0.72), section, "s", { small: true }),
          ];
        }),
      ],
      readout: channelMeasurements.map(({ section, speed, pressure }) => `${section}: ${fmt(speed)} m/s ve ${pressure} kPa.`),
    };
  },
};

const idealChannelFigure: FigureDef = {
  caption: "Aynı debi daha küçük kesitten geçerken hız oku uzar. Kesitler aynı yükseklikte.",
  alt: "Yatay borunun orta çizgisi kesikli. Giriş solda, alanı değiştirilen ikinci kesit sağda. Akış okları iki kesitin süratini gösterir.",
  param: { label: "İkinci kesitin alanı", min: 2, max: 4, step: 1, init: 2, unit: " cm²" },
  draw: (area) => {
    const first = idealChannelState(4);
    const second = idealChannelState(area);
    const leftHeight = first.area * 0.27;
    const rightHeight = second.area * 0.27;
    const upper = [v(0, leftHeight), v(3, leftHeight), v(4.4, rightHeight), v(8, rightHeight)];
    const lower = upper.map(([x, y]) => v(x, -y));
    return {
      els: [
        poly([...upper, ...lower.slice().reverse()], { fill: "b", tone: "b", thin: true }),
        poly(upper, { open: true, bold: true }),
        poly(lower, { open: true, bold: true }),
        seg(v(-0.12, 0), v(8.12, 0), { tone: "muted", dash: true }),
        vec(v(0.91, 0), v(0.91 + 0.4 * first.speed, 0), { tone: "a", bold: true }),
        vec(v(5.15, 0), v(5.15 + 0.4 * second.speed, 0), { tone: "a", bold: true }),
        txt(v(1.6, -1.35), "1. kesit", "s", { small: true, bold: true }),
        txt(v(6.25, -1.35), "2. kesit", "s", { small: true, bold: true }),
      ],
      readout: [
        `1. kesit: ${first.area} cm² · ${first.speed} m/s · ${first.pressure} kPa.`,
        `2. kesit: ${second.area} cm² · ${fmt(second.speed, 2)} m/s · ${fmt(second.pressure, 2)} kPa.`,
        `Her iki kesitte debi: ${fmt(first.flowLitresPerSecond)} L/s.`,
      ],
    };
  },
};

export const mebiBernoulliChannelFigures: Record<string, FigureDef> = {
  [measuredChannelTitle]: measuredChannelFigure,
  [idealChannelTitle]: idealChannelFigure,
  [idealChannelExampleTitle]: { ...idealChannelFigure, param: undefined, draw: () => idealChannelFigure.draw(2, 0) },
};
