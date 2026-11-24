import { circle, poly, seg, txt, v, vec, type FigureDef, type FigureFrame } from "./figureKit";
import {
  magneticMatchTitle, magneticResonanceTitle, magneticSignalTitle, radioFrequency, resonanceFrequency,
} from "../mebiMagneticResonance";

function matchFrequency(frequency: number): FigureFrame {
  const { min, max } = radioFrequency;
  const x = (value: number) => 1 + (value - min) * 10 / (max - min);
  const resonance = x(resonanceFrequency);
  const incoming = x(frequency);
  const matches = frequency === resonanceFrequency;
  return {
    els: [
      txt(v(6, 6.2), "Model frekansları", "n", { small: true }),
      seg(v(1, 3.81), v(11, 3.81), { tone: "ink" }),
      seg(v(1, 2.05), v(11, 2.05), { tone: "ink" }),
      txt(v(1, 4.69), "Hidrojen çekirdekleri", "e", { tone: "a", small: true }),
      txt(v(1, 2.91), "Radyo darbesi", "e", { tone: "b", small: true }),
      circle(v(resonance, 3.81), 0.18, { tone: "a", fill: "a" }),
      circle(v(incoming, 2.05), 0.18, { tone: "b", fill: "b" }),
      seg(v(resonance, 1.14), v(resonance, 4.25), { tone: "a", dash: true, thin: true }),
      txt(v(1, 0.58), String(min), "s", { small: true }),
      txt(v(resonance, 0.58), String(resonanceFrequency), "s", { small: true }),
      txt(v(11, 0.58), String(max), "s", { small: true }),
    ],
    readout: [
      `Çekirdeklerin model frekansı ${resonanceFrequency} birim. Radyo darbesi ${frequency} birim.`,
      matches ? "İki frekans eşleşiyor. Çekirdeklerin toplu manyetik yönü etkilenir."
        : "İşaretler ayrı. Bu model şu anda tam frekans eşleşmesini göstermiyor.",
    ],
  };
}

function receiveSignal(frequency: number): FigureFrame {
  const matches = frequency === resonanceFrequency;
  return {
    els: [
      vec(v(1.2, 1.4), v(1.2, 4.75), { tone: "ink" }),
      txt(v(1.2, 5.57), "Alan", "n", { small: true }),
      vec(v(4.55, 1.75), v(5.17, 4.1), { tone: "a" }),
      vec(v(4.55, 1.75), v(4.55, 4.38), { tone: "muted", dash: true }),
      txt(v(4.55, 0.97), "Çekirdeklerin toplu yönü", "s", { tone: "a", small: true }),
      vec(v(5.91, 3.01), v(8.43, 3.01), { tone: "b" }),
      txt(v(7.16, 3.72), "Radyo sinyali", "n", { tone: "b", small: true }),
      poly([v(8.95, 2.1), v(10.1, 2.1), v(10.1, 3.93), v(8.95, 3.93)], { tone: "ink", fill: "muted" }),
      circle(v(9.53, 3.01), 0.27, { tone: "ink", fill: "b" }),
      txt(v(9.53, 1.43), "Alıcı bobin", "s", { small: true }),
    ],
    readout: [
      "Radyo darbesi bitti. Manyetik yön dengeye dönerken alıcı bobin sinyali ölçer.",
      matches ? "Frekans eşleşmesi seçili." : "Bu ok yalnız alım yolunu gösteriyor. Model sinyalin gücünü hesaplamıyor.",
    ],
  };
}

export const magneticResonanceFigures: Record<string, FigureDef> = {
  [magneticResonanceTitle]: {
    caption: "Radyo darbesini referans işaretine getir. Sonraki adımda bobinin alım yolunu izle.",
    alt: "İlk adım hidrojen çekirdeklerinin model frekansını ve değiştirilebilir radyo frekansını iki sırada gösterir. İkinci adımda alan, manyetik yön ve alıcı bobin yer alır.",
    param: { label: "Radyo darbesi frekansı", ...radioFrequency, unit: " birim" },
    steps: ["Frekans eşleşmesi", "Sinyalin alımı"],
    draw: (frequency, step) => step === 1 ? receiveSignal(frequency) : matchFrequency(frequency),
  },
  [magneticMatchTitle]: {
    caption: "Çekirdeklerin model frekansına uyan radyo darbesini bul.",
    alt: "İki sıra da aynı 100 birim çizgisinde işaretli.",
    draw: () => matchFrequency(resonanceFrequency),
  },
  [magneticSignalTitle]: {
    caption: "Darbe bittikten sonra çekirdeklerden alıcı bobine giden radyo sinyalini izle.",
    alt: "Manyetik alan yönü ve dengeye yönelen toplu manyetik ok. Alıcı bobine doğru bir radyo sinyali oku var.",
    draw: () => receiveSignal(resonanceFrequency),
  },
};
