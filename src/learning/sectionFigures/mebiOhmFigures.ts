import { ohmMeasurementDifference, ohmMeasurementsTitle, sourceOhmPoints } from "../mebiOhmReadings";
import { poly, pt, right, seg, txt, v, vec, type FigureDef, type V } from "./figureKit";

const display = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 });
const x = (amps: number) => amps * 3;
const y = (volts: number) => volts * 0.7;
const point = ({ current, voltage }: (typeof sourceOhmPoints)[number]): V => v(x(current), y(voltage));
const origin = v(0, 0);
const last = point(sourceOhmPoints[3]);

export const ohmSlopeFigure: Record<string, FigureDef> = {
  [ohmMeasurementsTitle]: {
    caption: "Yatayda amper, düşeyde volt. Üçgenin yüksekliğini tabanına böl.",
    alt: "Dört ölçüm aynı orijinden geçen V–I doğrusu üzerinde. İki ölçüm arasındaki yatay akım farkı ve düşey gerilim farkı dik üçgenin kenarları.",
    steps: ["0,5 A ile 1,5 A", "0,5 A ile 1 A", "0,5 A ile 2 A"],
    draw: (_, step) => {
      const end = ([2, 1, 3] as const)[step];
      const frame = ohmMeasurementDifference(end);
      const P = point(frame.from), Q = point(frame.to), corner = v(Q[0], P[1]);
      return {
        els: [
          ...sourceOhmPoints.flatMap(({ current, voltage }) => [
            seg(v(x(current), 0), v(x(current), y(8)), { tone: "muted", thin: true, dash: true }),
            seg(v(0, y(voltage)), v(x(2), y(voltage)), { tone: "muted", thin: true, dash: true }),
            txt(v(x(current), -0.12), display.format(current), "s", { small: true }),
            txt(v(-0.15, y(voltage)), display.format(voltage), "w", { small: true }),
          ]),
          vec(origin, v(6.9, 0), { tone: "ink" }),
          vec(origin, v(0, 6.4), { tone: "ink" }),
          txt(v(6.7, -0.08), "I (A)", "se", { small: true, tone: "ink" }),
          txt(v(0, 6.5), "V (V)", "ne", { small: true, tone: "ink" }),
          poly([origin, last], { open: true, bold: true, tone: "b" }),
          ...sourceOhmPoints.map((measurement) => pt(point(measurement), undefined, "n", "b")),
          seg(P, corner, { tone: "a", bold: true }),
          seg(corner, Q, { tone: "a", bold: true }),
          right(corner, P, Q, "a"),
          txt(v((P[0] + Q[0]) / 2, P[1] - 0.08), "ΔI", "s", { bold: true, tone: "a" }),
          txt(v(Q[0] + 0.12, (P[1] + Q[1]) / 2), "ΔV", "e", { bold: true, tone: "a" }),
        ],
        readout: [
          `ΔI = ${display.format(frame.currentDifference)} A. ΔV = ${display.format(frame.voltageDifference)} V.`,
          `Eğim: ΔV / ΔI = ${frame.resistance} Ω.`,
        ],
      };
    },
  },
};
