import { airBuoyancyExampleTitle, airBuoyancyTitle, balloonForce, balloonKGrams, balloonLGrams } from "../mebiAirBuoyancy";
import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

const balloons: FigureDef = {
  caption: "Yan yana duran 10 L balonlar aynı hacimde havanın yerini alıyor. Dıştaki oklar ilk net kuvveti gösterir.",
  alt: "Yer çizgisinin üstünde aynı boyutta K ve L balonu. K’nın net kuvveti aşağı. L’nin yanındaki ok, kütlesi arttıkça önce yukarı, sonra aşağı yönelir ve denge kütlesinde görünmez.",
  param: { label: "L’nin zar ve gaz dahil kütlesi", min: 6, max: 20, step: 2, init: balloonLGrams, unit: " g" },
  draw: (massL) => {
    const els: El[] = [seg(v(0, 0.19), v(6.83, 0.19), { bold: true }), txt(v(6.04, -0.05), "Yer", "s", { small: true })];
    const readout = ([["K", balloonKGrams], ["L", massL]] as const).map(([letter, mass], index) => {
      const state = balloonForce(mass);
      const x = 1.72 + index * 3.28;
      const y = 2.23;
      const arrowX = x + (index ? 1.07 : -1.07);
      els.push(circle(v(x, y), 0.77, { tone: "ink", fill: index ? "b" : "a" }),
        poly([v(x, y - 0.77), v(x - 0.14, y - 0.96), v(x + 0.14, y - 0.96)], { tone: "ink", fill: index ? "b" : "a" }),
        txt(v(x, y), letter, "c", { small: true, bold: true }));
      if (state.net) els.push(vec(v(arrowX, y), v(arrowX, y + state.net * 14), { tone: "ink", bold: true }));
      const direction = state.net > 0 ? " yukarı" : state.net < 0 ? " aşağı" : "";
      return `${letter}: Kaldırma ${fmt(state.buoyancy, 2)} N · ağırlık ${fmt(state.weight, 2)} N · net ${fmt(Math.abs(state.net), 2)} N${direction}.`;
    });
    return { els, readout };
  },
};

export const mebiAirBuoyancyFigures: Record<string, FigureDef> = {
  [airBuoyancyTitle]: balloons,
  [airBuoyancyExampleTitle]: { ...balloons, param: undefined, draw: () => balloons.draw(balloonLGrams, 0) },
};
