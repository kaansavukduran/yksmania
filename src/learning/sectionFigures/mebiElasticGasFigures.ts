import {
  balloonChanges,
  compressedBalloonTitle,
  elasticBalloonState,
  elasticBalloonTitle,
  gasMembraneState,
  gasMembraneTitle,
  heatedMembraneTitle,
} from "../mebiElasticGas";
import { add, circle, fmt, pol, poly, txt, v, vec, type El, type FigureDef } from "./figureKit";

const gasMembraneFigure: FigureDef = {
  caption: "Kabın iç alanı sabit. Zar sağa yer değiştirdikçe X’in alanı artar, Y’ninki azalır.",
  alt: "Rijit kabın içinde X gazı solda ve Y gazı sağda. Gazları ayıran sızdırmaz esnek zarın iki yanında birbirine yönelen basınç okları var.",
  param: { label: "X gazının sıcaklığı", min: 300, max: 600, step: 150, init: 450, unit: " K" },
  draw: (temperature) => {
    const { pressure, volumeX, volumeY } = gasMembraneState(temperature / 300);
    const left = -3.9;
    const right = 3.9;
    const width = right - left;
    const height = 2.55;
    const center = left + width * volumeX / (volumeX + volumeY);
    // The two linear halves have the same average x, so the fill area follows the volume.
    const lower = v(center - 0.22, 0);
    const middle = v(center + 0.22, height / 2);
    const upper = v(center - 0.22, height);
    const edge = 0.42 * pressure / 100;
    return {
      els: [
        poly([v(left, 0), lower, middle, upper, v(left, height)], { fill: "b", tone: "b", thin: true }),
        poly([lower, v(right, 0), v(right, height), upper, middle], { fill: "a", tone: "a", thin: true }),
        poly([v(left, 0), v(right, 0), v(right, height), v(left, height)], { bold: true }),
        poly([lower, middle, upper], { tone: "ink", open: true, bold: true }),
        vec(v(middle[0] - 0.14 - edge, middle[1]), v(middle[0] - 0.14, middle[1]), { tone: "a" }),
        vec(v(middle[0] + 0.14 + edge, middle[1]), v(middle[0] + 0.14, middle[1]), { tone: "b" }),
        txt(v((left + center) / 2, height + 0.24), "X gazı", "n", { small: true, bold: true }),
        txt(v((right + center) / 2, height + 0.24), "Y gazı", "n", { small: true, bold: true }),
      ],
      readout: [
        `X: ${fmt(volumeX, 2)} L · Y: ${fmt(volumeY, 2)} L · Toplam: 10 L.`,
        `İki gazın son basıncı: ${fmt(pressure, 2)} kPa.`,
      ],
    };
  },
};

function balloon(x: number, state: ReturnType<typeof elasticBalloonState>, label: string): El[] {
  const center = v(x, 0);
  const radius = 1.2 * Math.cbrt(state.volume / 3);
  const length = 0.34 * state.pressure / 100;
  const arrows = [0, 90, 180, 270].flatMap((angle) => [
    vec(add(center, pol(radius + 0.14 + length, angle)), add(center, pol(radius + 0.14, angle)), { tone: "warn" }),
    vec(add(center, pol(radius - 0.14 - length, angle)), add(center, pol(radius - 0.14, angle)), { tone: "b" }),
  ]);
  return [
    circle(center, radius, { fill: "a", tone: "ink", bold: true }),
    ...arrows,
    txt(v(x, -2.42), label, "s", { small: true, bold: true }),
  ];
}

const elasticBalloonFigure: FigureDef = {
  caption: "Dış oklar havanın içe, iç oklar gazın dışa etkisini gösterir. İki kesit aynı ölçekle çizildi.",
  alt: "İlk ve son dengedeki balonların kesitleri. Her kesitte dışarıdan içeriye ve içeriden dışarıya yönelen basınç okları var.",
  param: { label: "Değişim katsayısı", min: 1, max: 2, step: 0.5, init: 1.5 },
  steps: balloonChanges.map(({ label }) => label),
  draw: (factor, step) => {
    const before = elasticBalloonState(balloonChanges[step], 1);
    const after = elasticBalloonState(balloonChanges[step], factor);
    return {
      els: [...balloon(-2.55, before, "İlk denge"), ...balloon(2.55, after, "Son denge")],
      readout: [
        `İç ve dış basınç: ${fmt(before.pressure)} → ${fmt(after.pressure)} kPa.`,
        `Balonun hacmi: ${fmt(before.volume)} → ${fmt(after.volume, 2)} L.`,
      ],
    };
  },
};

export const mebiElasticGasFigures: Record<string, FigureDef> = {
  [gasMembraneTitle]: gasMembraneFigure,
  [elasticBalloonTitle]: elasticBalloonFigure,
  [heatedMembraneTitle]: {
    ...gasMembraneFigure,
    param: undefined,
    draw: () => {
      const frame = gasMembraneFigure.draw(450, 0);
      return { ...frame, readout: frame.readout?.slice(0, 1) };
    },
  },
  [compressedBalloonTitle]: {
    ...elasticBalloonFigure,
    param: undefined,
    steps: undefined,
    draw: () => elasticBalloonFigure.draw(1.5, 2),
  },
};
