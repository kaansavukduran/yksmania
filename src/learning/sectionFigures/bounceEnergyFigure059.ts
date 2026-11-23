import { bouncePeaks, gravity, releaseHeight } from "../bounceEnergy059";
import { fmt, poly, pt, seg, txt, v, type El, type FigureDef } from "./figureKit";

const dropTime = Math.sqrt(2 * releaseHeight / gravity);

export const bounceEnergyFigure: FigureDef = {
  caption: "Çarpışmadan sonra kalan hız oranını değiştir. Her çarpışmadan sonra bir sonraki tepeye bak ve biriken enerji aktarımını izle.",
  alt: "Yükseklik zamana karşı çizilir. İlk düşüşü üç giderek alçalan sıçrama izler. Seçilen tepenin yüksekliği ve enerji dengesi metinde görünür.",
  steps: ["1. sıçrama", "2. sıçrama", "3. sıçrama"],
  param: { label: "Çarpışma hız oranı e", min: 0.5, max: 0.85, init: 0.5, step: 0.05 },
  draw: (ratio, step) => {
    const peaks = bouncePeaks(ratio);
    const active = peaks[step];
    const x = (seconds: number) => 1.7 * seconds;
    const falling = Array.from({ length: 25 }, (_, i) => {
      const t = dropTime * i / 24;
      return v(x(t), releaseHeight - gravity * t ** 2 / 2);
    });
    const els: El[] = [
      seg(v(0, 0), v(8.7, 0), { tone: "muted" }),
      seg(v(0, 0), v(0, 4.55), { tone: "muted" }),
      txt(v(0, 4.55), "h (m)", "n", { small: true }),
      txt(v(8.7, 0), "t (s)", "s", { small: true }),
      ...[1, 2, 3, 4].flatMap((time) => [
        seg(v(x(time), -0.07), v(x(time), 0.07), { tone: "muted", thin: true }),
        txt(v(x(time), 0), String(time), "s", { small: true }),
      ]),
      ...[1, 2, 3, 4].flatMap((height) => [
        seg(v(-0.08, height), v(0.08, height), { tone: "muted", thin: true }),
        txt(v(0, height), String(height), "w", { small: true }),
      ]),
      poly(falling, { open: true, tone: "ink" }),
      ...peaks.flatMap((peak, index) => {
        const chosen = index === step;
        const arc = Array.from({ length: 25 }, (_, i) => {
          const t = 2 * peak.halfTime * i / 24;
          return v(x(peak.startsAt + t), Math.max(0, gravity * t * (peak.halfTime - t / 2)));
        });
        const at = v(x(peak.peakAt), peak.height);
        return [
          poly(arc, { open: true, tone: chosen ? "a" : "b", bold: chosen }),
          pt(at, undefined, "e", chosen ? "a" : "b"),
          ...(chosen ? [txt(at, `${fmt(peak.height, 2)} m`, "n", { tone: "a", bold: true })] : []),
        ];
      }),
    ];
    return {
      els,
      readout: [
        `${active.rebound}. sıçrama. Tepe ${fmt(active.height, 3)} m. Mekanik enerji ${fmt(active.mechanical, 3)} J.`,
        `Topun mekanik enerjisinden diğer biçimlere toplam ${fmt(active.otherEnergy, 3)} J aktarıldı. Birlikte 40 J.`,
      ],
    };
  },
};
