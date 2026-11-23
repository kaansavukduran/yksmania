import { boxForces, boxMassKg } from "../newtonForcePairs";
import { poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

const arrowScale = 0.08;

function arrow(x: number, y: number, force: number, label: string, tone: Tone): El[] {
  const tip = y + force * arrowScale;
  const value = `${Math.abs(force)} N`;
  return [
    vec(v(x, y), v(x, tip), { tone, bold: true }),
    txt(v(x, tip), label ? `${label} ${value}` : value, force > 0 ? "n" : "s", { tone }),
  ];
}

function rectangle(x: number, y: number, width: number, height: number, tone: Tone): El {
  return poly([v(x, y), v(x + width, y), v(x + width, y + height), v(x, y + height)], { tone, fill: tone });
}

export const newtonForcePairsFigure: FigureDef = {
  caption: "Yukarı çekişi değiştir. Her gerçek çiftin iki oku eşit ve ters yönlüdür. Okların üzerindeki kuvvetleri hangi cismin aldığına bak.",
  alt: "Üç görünüm sırayla kutudaki kuvvetleri, kutu ile masa arasındaki zıt temas kuvvetlerini ve kutu ile Dünya arasındaki zıt çekimleri gösterir. Kuvvet büyüklükleri ve hedefleri çizimin altında yazılıdır.",
  steps: ["Kutunun üzerindeki kuvvetler", "Masa ve kutu", "Dünya ve kutu"],
  param: { label: "Yukarı çekiş (N)", min: 0, max: 12, step: 1, init: 6 },
  draw: (pull, step) => {
    const pair = boxForces(pull);
    const normal = pair.contacts[0].newtons;
    const weight = pair.gravity[0].newtons;
    if (step === 0) {
      return {
        els: [
          rectangle(-2.4, 0, 4.8, 1.2, "muted"),
          seg(v(-3.1, 0), v(3.1, 0), { tone: "muted" }),
          txt(v(0, 0.56), `${boxMassKg} kg`, "c", { bold: true }),
          ...arrow(-1.55, 0.6, normal, "N", "a"),
          ...(pull > 0 ? arrow(1.55, 0.6, pull, "T", "c") : []),
          ...arrow(0, 0.17, weight, "G", "b"),
        ],
        readout: [`Kutu: normal yukarı ${normal} N, ip çekişi yukarı ${pull} N, ağırlık aşağı ${Math.abs(weight)} N. Düşey toplam ${pair.verticalBalance} N.`],
      };
    }
    const [onBox, onOther] = step === 1 ? pair.contacts : pair.gravity;
    const tone = step === 1 ? "a" : "b";
    return {
      els: [
        rectangle(-3.25, -0.3, 2.5, 0.85, "muted"),
        rectangle(0.75, -0.3, 2.5, 0.85, "muted"),
        txt(v(-2, 0.12), onBox.to, "c", { bold: true }),
        txt(v(2, 0.12), onOther.to, "c", { bold: true }),
        ...arrow(-2, onBox.newtons > 0 ? 0.55 : -0.3, onBox.newtons, "", tone),
        ...arrow(2, onOther.newtons > 0 ? 0.55 : -0.3, onOther.newtons, "", tone),
      ],
      readout: [onBox, onOther].map(({ from, to, newtons }) =>
        `${from} → ${to}: ${Math.abs(newtons)} N ${newtons > 0 ? "yukarı" : "aşağı"}.`,
      ),
    };
  },
};
