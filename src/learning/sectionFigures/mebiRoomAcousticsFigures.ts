import { circle, fmt, poly, seg, txt, v, vec, type FigureDef, type FigureFrame, type Tone } from "./figureKit";
import {
  roomAbsorption, roomAcousticsTitle, roomDelayMs, roomDirectM, roomEnergyTitle, roomHeightAboveSourceM,
  roomPathsTitle, roomReflectedEnergy, roomReflectedM,
} from "../mebiRoomAcoustics";

function paths(absorption: number): FigureFrame {
  const source = v(1.7, 1.45);
  const listener = v(source[0] + roomDirectM, source[1]);
  const bounce = v((source[0] + listener[0]) / 2, source[1] + roomHeightAboveSourceM);
  return {
    els: [
      seg(v(0.55, bounce[1]), v(11.35, bounce[1]), { tone: "ink", bold: true }),
      seg(v(0.55, 0.35), v(11.35, 0.35), { tone: "muted" }),
      txt(v(bounce[0], bounce[1] + 0.68), "Örnek salonun tavanı", "n", { small: true }),
      circle(source, 0.17, { tone: "a", fill: "a" }),
      circle(listener, 0.17, { tone: "c", fill: "c" }),
      vec(source, listener, { tone: "a" }),
      vec(source, bounce, { tone: "b", dash: true }),
      vec(bounce, listener, { tone: "b", dash: true }),
      txt(v(source[0], 0.87), "Kaynak", "s", { tone: "a", small: true }),
      txt(v(listener[0], 0.87), "Dinleyen", "s", { tone: "c", small: true }),
      txt(v(bounce[0], 1.06), `Doğrudan ${roomDirectM} m`, "s", { tone: "a", small: true }),
      txt(v(bounce[0], 3.45), `Yansıyan ${roomReflectedM} m`, "s", { tone: "b", small: true }),
    ],
    readout: [
      `Doğrudan yol ${roomDirectM} m. Yansıyan yol ${roomReflectedM} m.`,
      `Yansıma yaklaşık ${fmt(roomDelayMs, 2)} ms sonra ulaşır. Tavan enerjinin %${absorption} kadarını soğurur.`,
    ],
  };
}

function energy(absorption: number): FigureFrame {
  const reflected = roomReflectedEnergy(absorption);
  const bar = (y: number, amount: number, label: string, tone: Tone) => {
    const left = 0.9;
    const maxWidth = 10.2;
    const right = left + maxWidth * amount / 100;
    return [
      poly([v(left, y), v(left + maxWidth, y), v(left + maxWidth, y + 0.63), v(left, y + 0.63)], { tone: "muted" }),
      poly([v(left, y), v(right, y), v(right, y + 0.63), v(left, y + 0.63)], { tone, fill: tone, bold: true }),
      txt(v(left, y + 1.08), `${label} %${amount}`, "e", { tone, small: true }),
    ];
  };
  return {
    els: [
      txt(v(6, 4.93), "Tavana gelen enerji %100", "n", { small: true }),
      ...bar(2.82, absorption, "Soğurulan", "a"),
      ...bar(0.53, reflected, "Yansıyan", "b"),
    ],
    readout: [
      `Soğurulan pay %${absorption}. Yansıyan pay %${reflected}.`,
      `Tavan aynı konumda. Yansıyan yol ${roomReflectedM} m kalır.`,
    ],
  };
}

export const roomAcousticsFigures: Record<string, FigureDef> = {
  [roomAcousticsTitle]: {
    caption: "Örnek salondaki iki yolu karşılaştır. İkinci adımda tavanın soğurduğu payı değiştir.",
    alt: "Örnek bir salonda kaynak ile dinleyen arasında düz ve tavandan yansıyan yol çizilir. İkinci adım soğurulan ve yansıyan enerji paylarını iki çubukla gösterir.",
    param: { label: "Tavanın soğurduğu enerji", ...roomAbsorption, unit: "%" },
    steps: ["İki ses yolu", "Enerji payları"],
    draw: (absorption, step) => step === 1 ? energy(absorption) : paths(absorption),
  },
  [roomPathsTitle]: {
    caption: "Tavan ile dinleyenin yeri, iki ses yolunu belirliyor.",
    alt: "Doğrudan yol 8 metre. Tavana gidip dinleyene ulaşan yansıyan yol 10 metre.",
    draw: () => paths(60),
  },
  [roomEnergyTitle]: {
    caption: "Tavan yüzde 60 soğurunca geriye yüzde 40 yansıyan pay kalır.",
    alt: "Aynı genişlikte iki cetvelin birinde soğurulan yüzde 60, diğerinde yansıyan yüzde 40 doludur.",
    draw: () => energy(60),
  },
};
