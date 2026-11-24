import {
  seismicRecordDifferenceTitle, seismicRecordReadTitle, seismicRecordTitle, seismicStations, seismicTrace, seismicTraceDurationS,
} from "../mebiSeismicRecord";
import { fmt, poly, seg, span, txt, v, type El, type FigureDef, type FigureFrame } from "./figureKit";

const axisStart = 0.58;
const axisScale = 1.64;
const signalLevel = 1.83;
const xOf = (seconds: number) => axisStart + axisScale * seconds;

function record(station: number): FigureFrame {
  const trace = seismicTrace(station);
  const seconds = seismicTraceDurationS;
  const els: El[] = [
    seg(v(axisStart, 0.47), v(xOf(seconds), 0.47), { tone: "ink", bold: true }),
    seg(v(axisStart, 0.47), v(axisStart, 3.69), { tone: "ink", bold: true }),
    seg(v(axisStart, signalLevel), v(xOf(seconds), signalLevel), { tone: "muted", thin: true }),
    txt(v(axisStart, 4.04), "Göreli yer hareketi", "ne", { small: true, bold: true }),
    txt(v(xOf(seconds / 2), -0.55), "Zaman (s)", "s", { small: true }),
  ];
  for (let second = 0; second <= seconds; second++) {
    const x = xOf(second);
    els.push(
      seg(v(x, 0.36), v(x, 0.47), { tone: "ink", thin: true }),
      txt(v(x, 0.16), String(second), "s", { small: true }),
    );
  }
  const points = Array.from({ length: 121 }, (_, index) => {
    const t = index * seconds / 120;
    return v(xOf(t), signalLevel + 1.15 * trace.readAt(t));
  });
  els.push(poly(points, { open: true, tone: "ink", bold: true }));
  for (const { label, time, tone } of [
    { label: "P", time: trace.pSeconds, tone: "b" },
    { label: "S", time: trace.sSeconds, tone: "a" },
  ] as const) {
    const x = xOf(time);
    els.push(
      seg(v(x, 0.47), v(x, 3.2), { tone, dash: true }),
      txt(v(x, 3.33), `${label} ${fmt(time, 2)} s`, "n", { tone, small: true, bold: true }),
    );
  }
  return {
    els,
    readout: [
      `P ${fmt(trace.pSeconds, 2)} s, S ${fmt(trace.sSeconds, 2)} s.`,
      `S, P’den ${fmt(trace.differenceSeconds, 2)} s sonra geliyor.`,
    ],
  };
}

const recordAlt = "Yatay eksen saniye, düşey eksen göreli yer hareketi. P ve S etiketli iki kesik çizgi, örnek dalgaların ayrı başlangıç anlarını gösteriyor.";

export const seismicRecordFigures: Record<string, FigureDef> = {
  [seismicRecordTitle]: {
    caption: "İstasyonu kaydır ve modelde P ile S varış işaretlerinin nasıl ayrıldığını izle.",
    alt: recordAlt,
    param: { ...seismicStations, label: "İstasyonun dış merkeze uzaklığı", unit: " km" },
    draw: record,
  },
  [seismicRecordReadTitle]: {
    caption: "8 km uzaktaki istasyonun iki varış işaretini aynı sismogramda oku.",
    alt: recordAlt,
    draw: () => record(8),
  },
  [seismicRecordDifferenceTitle]: {
    caption: "İki varış arasında kalan süreyi oku.",
    alt: "P ve S varışları ortak zaman çizgisinde. İki işaretin arasındaki fark yaklaşık 1,67 saniye.",
    draw: () => {
      const { pSeconds, sSeconds, differenceSeconds } = seismicTrace(8);
      const p = xOf(pSeconds);
      const s = xOf(sSeconds);
      const delta = fmt(differenceSeconds, 2);
      return {
        els: [
          seg(v(xOf(0), 1.65), v(xOf(5), 1.65), { tone: "ink", bold: true }),
          seg(v(p, 1.35), v(p, 2.08), { tone: "b", bold: true }),
          seg(v(s, 1.35), v(s, 2.08), { tone: "a", bold: true }),
          txt(v(p, 1.05), `P ${fmt(pSeconds, 2)} s`, "s", { tone: "b", small: true }),
          txt(v(s, 1.05), `S ${fmt(sSeconds, 2)} s`, "s", { tone: "a", small: true }),
          ...span(v(p, 2.65), v(s, 2.65), `${delta} s`, 1, "ink"),
        ],
        readout: [`S, P’den ${delta} s sonra geliyor.`],
      };
    },
  },
};
