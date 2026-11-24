import { earthquakePreparationTitle, emergencyBagTitle, meetingPlanTitle, securedRoomTitle } from "../mebiEarthquakePreparation";
import { circle, poly, seg, txt, v, vec, type FigureDef, type FigureFrame } from "./figureKit";

function room(): FigureFrame {
  return {
    els: [
      seg(v(0.8, 0.62), v(11.35, 0.62), { tone: "muted" }),
      seg(v(3.95, 0.62), v(3.95, 4.52), { tone: "muted" }),
      poly([v(1.0, 0.7), v(3.67, 0.7), v(3.67, 4.06), v(1.0, 4.06)], { tone: "ink", fill: "muted", bold: true }),
      seg(v(1.0, 1.66), v(3.67, 1.66), { tone: "ink" }),
      seg(v(1.0, 2.86), v(3.67, 2.86), { tone: "ink" }),
      poly([v(1.37, 0.79), v(2.63, 0.79), v(2.63, 1.43), v(1.37, 1.43)], { tone: "a", fill: "a", bold: true }),
      seg(v(3.67, 3.76), v(3.95, 3.76), { tone: "a", bold: true }),
      seg(v(3.81, 3.59), v(3.81, 3.93), { tone: "a", bold: true }),
      txt(v(2.34, 4.79), "Sabit dolap", "n", { bold: true, small: true }),
      poly([v(5.16, 0.84), v(10.83, 0.84), v(10.83, 1.55), v(5.16, 1.55)], { tone: "ink", fill: "muted", bold: true }),
      poly([v(5.36, 1.55), v(6.43, 1.55), v(6.43, 1.92), v(5.36, 1.92)], { tone: "b", fill: "b" }),
      seg(v(5.16, 0.84), v(5.16, 2.02), { tone: "ink", bold: true }),
      txt(v(8.27, 2.82), "Açık yatak çevresi", "n", { bold: true, small: true }),
    ],
    readout: ["Dolap duvara bağlı. Ağır kutu alt rafta. Yatağın üstü ve çevresi boş."],
  };
}

function plan(): FigureFrame {
  return {
    els: [
      poly([v(7.57, 1.47), v(7.57, 0.64), v(0.8, 0.64), v(0.8, 4.64), v(7.57, 4.64), v(7.57, 2.84)], { open: true, bare: true, tone: "ink", bold: true }),
      seg(v(7.57, 2.84), v(6.67, 3.16), { tone: "muted", thin: true }),
      poly([v(1.62, 2.42), v(3.78, 2.42), v(3.78, 3.59), v(1.62, 3.59)], { tone: "b", fill: "b", bold: true }),
      circle(v(2.7, 2.99), 0.16, { tone: "b", fill: "ink" }),
      txt(v(3.16, 5.23), "Korunma yeri", "n", { tone: "b", bold: true, small: true }),
      vec(v(3.77, 2.05), v(9.52, 2.05), { tone: "a", dash: true, bold: true }),
      txt(v(6.29, 1.22), "Sonra çıkış", "s", { tone: "a", bold: true, small: true }),
      circle(v(10.02, 2.05), 0.3, { tone: "a", fill: "a" }),
      txt(v(9.88, 3.38), "Buluşma", "n", { tone: "a", bold: true, small: true }),
    ],
    readout: ["Sarsıntı sırasında içerideki yakın korunma yerini kullan. Sarsıntı bittikten sonra çıkış ve buluşma yolunu izle."],
  };
}

function bag(): FigureFrame {
  return {
    els: [
      poly([v(2.63, 0.66), v(9.37, 0.66), v(9.37, 4.27), v(8.92, 4.68), v(3.08, 4.68), v(2.63, 4.27)], { tone: "ink", fill: "muted", bold: true }),
      poly([v(4.29, 4.68), v(4.29, 5.28), v(7.71, 5.28), v(7.71, 4.68)], { open: true, bare: true, tone: "ink", bold: true }),
      seg(v(2.63, 2.63), v(9.37, 2.63), { tone: "muted", bold: true }),
      seg(v(6, 0.66), v(6, 4.68), { tone: "muted", bold: true }),
      txt(v(4.36, 3.68), "Su ve gıda", "c", { tone: "b", bold: true, small: true }),
      txt(v(7.66, 3.68), "İlaç", "c", { tone: "a", bold: true, small: true }),
      txt(v(4.36, 1.65), "İlk yardım", "c", { tone: "a", bold: true, small: true }),
      txt(v(7.66, 1.65), "Işık ve bilgi", "c", { tone: "b", bold: true, small: true }),
    ],
    readout: ["Çantayı kolay ulaşabileceğin yerde tut. Düzenli ilaç, ilk yardım, ışık, iletişim listesi ve önemli belgeleri birlikte kontrol et."],
  };
}

const roomAlt = "Dolabın üst kısmında duvar bağlantısı, alt rafında ağır kutu var. Yanındaki yatağın üstü ve çevresi boş.";
const planAlt = "Şemada içeride bir korunma yeri işaretli. Çıkış oku kapıdan dışarıdaki buluşma noktasına gidiyor.";
const bagAlt = "Çantanın dört bölmesinde su ve gıda, ilaç, ilk yardım, ışık ve bilgi etiketleri bulunuyor.";

export const earthquakePreparationFigures: Record<string, FigureDef> = {
  [earthquakePreparationTitle]: {
    caption: "Odanı, ev planını ve çantanın içini adım adım kontrol et.",
    alt: roomAlt + " " + planAlt + " " + bagAlt,
    steps: ["Odayı düzenle", "Ev planı", "Acil durum çantası"],
    draw: (_value, step) => [room, plan, bag][step](),
  },
  [securedRoomTitle]: { caption: "Ağır kutunun yerini ve dolap bağlantısını bul.", alt: roomAlt, draw: room },
  [meetingPlanTitle]: { caption: "Korunma yerini, sonra izlenecek yolu ve buluşma noktasını göster.", alt: planAlt, draw: plan },
  [emergencyBagTitle]: { caption: "İhtiyaçları dört bölmede kontrol et.", alt: bagAlt, draw: bag },
};
