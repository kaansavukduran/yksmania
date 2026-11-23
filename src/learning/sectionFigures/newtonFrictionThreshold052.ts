import {
  frictionDuringIncrease, frictionMass, kineticFriction, maximumAppliedForce, staticThreshold,
} from "../newtonFrictionThreshold";
import { fmt, pt, seg, txt, v, vec, type FigureDef } from "./figureKit";

const jumpLimit = (staticThreshold - kineticFriction) / frictionMass;
const rightEnd = frictionDuringIncrease(maximumAppliedForce).acceleration;
const plot = (force: number, acceleration: number) => v(force / 8, acceleration * 0.9);

export const frictionThresholdFigure: FigureDef = {
  caption: "Dolu nokta, başlangıçta duran kutunun eşikteki ivmesini gösterir. Açık nokta, kuvvet eşiği az farkla aşıldığındaki sınırı işaretler.",
  alt: "Yatayda uygulanan kuvvet newton, düşeyde ivme metre bölü saniye karedir. İvme 25 N’ye kadar sıfır. Eşiğin üstünde, sağ tarafta açık noktadan yükselen ayrı bir çizgi var.",
  param: { label: "Uygulanan kuvvet (N)", min: 0, max: maximumAppliedForce, step: 1, init: 25 },
  draw: (force) => {
    const result = frictionDuringIncrease(force);
    const marker = plot(force, result.acceleration);
    const threshold = plot(staticThreshold, 0);
    const limit = plot(staticThreshold, jumpLimit);
    const finish = plot(maximumAppliedForce, rightEnd);
    return {
      els: [
        vec(v(0, 0), v(5.8, 0), { tone: "muted", thin: true }),
        vec(v(0, 0), v(0, 4.2), { tone: "muted", thin: true }),
        seg(v(0, 0), threshold, { tone: "a", bold: true }),
        seg(limit, finish, { tone: "b", bold: true }),
        seg(threshold, limit, { tone: "muted", dash: true, thin: true }),
        seg(plot(0, jumpLimit), limit, { tone: "muted", dash: true, thin: true }),
        pt(threshold, undefined, "s", "a"),
        pt(limit, undefined, "n", "b", true),
        pt(marker, undefined, "n", result.startsSliding ? "b" : "a"),
        txt(v(5.8, 0), "F (N)", "se"),
        txt(v(0, 4.2), "a (m/s²)", "w"),
        txt(v(0, 0), "0", "sw", { small: true }),
        txt(threshold, String(staticThreshold), "s", { small: true }),
        txt(plot(maximumAppliedForce, 0), String(maximumAppliedForce), "s", { small: true }),
        txt(plot(0, jumpLimit), fmt(jumpLimit), "w"),
      ],
      readout: [
        `F = ${force} N · ${result.startsSliding ? "Kutu kayıyor" : "Kutu duruyor"}.`,
        `Sürtünme ${result.friction} N · Net kuvvet ${force - result.friction} N · İvme ${fmt(result.acceleration, 2)} m/s².`,
      ],
    };
  },
};
