import { afterMainTitle, earthquakeSequenceTitle, firstRecordTitle, visibleEarthquakes } from "../mebiEarthquakeSequence";
import { circle, fmt, seg, txt, v, type El, type FigureDef, type FigureFrame, type Tone } from "./figureKit";

function timeline(stage: number): FigureFrame {
  const startX = 1.1;
  const hourWidth = 1.18;
  const y = 1.25;
  const tones: Tone[] = ["b", "warn", "a"];
  const events = visibleEarthquakes(stage);
  const els: El[] = [
    seg(v(0.55, y), v(11.15, y), { tone: "ink", bold: true }),
    txt(v(5.85, 0.38), "İlk kayıttan sonra geçen saat", "s", { small: true }),
  ];
  for (const [index, event] of events.entries()) {
    const x = startX + event.hour * hourWidth;
    const tone = tones[index];
    els.push(
      circle(v(x, y), 0.17, { tone, fill: tone }),
      txt(v(x, 0.96), String(event.hour), "s", { small: true }),
      seg(v(x, 1.51), v(x, 2.04), { tone, thin: true }),
      txt(v(x, 2.31), `M ${fmt(event.magnitude)}`, "n", { tone, bold: true, small: true }),
      txt(v(x, 2.96), event.label, "n", { tone, small: true }),
    );
  }
  return {
    els,
    readout: events.map(({ label, hour, magnitude }) => `${label}. Saat ${hour}, M ${fmt(magnitude)}.`),
  };
}

export const earthquakeSequenceFigures: Record<string, FigureDef> = {
  [earthquakeSequenceTitle]: {
    caption: "Kayıtlar geldikçe ilk olayın adındaki değişimi izle.",
    alt: "Yatay eksen ilk kayıttan sonra geçen saat. Noktalarda saat, büyüklük ve olayın o aşamadaki sınıfı yazıyor.",
    steps: ["İlk kayıt", "Daha büyük olay", "Daha sonraki küçük olay"],
    draw: (_value, stage) => timeline(stage),
  },
  [firstRecordTitle]: {
    caption: "İlk anda kaydedilen tek sarsıntıyı oku.",
    alt: "Zaman çizgisinde yalnız saat sıfırdaki M 4,3 ilk kayıt işaretli.",
    draw: () => timeline(0),
  },
  [afterMainTitle]: {
    caption: "Zaman çizgisinde ana depremin öncesini ve sonrasını karşılaştır.",
    alt: "Saat sıfırda M 4,3 öncü, ikinci saatte M 5,8 ana deprem, sekizinci saatte M 4,4 artçı var.",
    draw: () => timeline(2),
  },
};
