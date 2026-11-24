import { fmt, poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame, type Tone } from "./figureKit";
import {
  shallowDelayUs, ultrasoundDelay, ultrasoundDepthCm, ultrasoundDepthTitle, ultrasoundProbeTitle,
  ultrasoundTitle,
} from "../mebiUltrasound";

function ultrasoundFrame(delay: number, showReturn: boolean): FigureFrame {
  const skin = 5.42;
  const depthUp = (us: number) => skin - ultrasoundDepthCm(us) * 0.35;
  const deepY = depthUp(delay);
  const shallowY = depthUp(shallowDelayUs);
  const waves = (x: number, lower: number, tone: Tone): El[] => [
    vec(v(x, skin - 0.06), v(x, lower + 0.12), { tone }),
    ...(showReturn ? [vec(v(x + 0.5, lower + 0.12), v(x + 0.5, skin - 0.06), { tone, dash: true })] : []),
  ];
  const els: El[] = [
    poly([v(0.38, 0.67), v(11.98, 0.67), v(11.98, skin), v(0.38, skin)], { tone: "muted", fill: "muted", thin: true }),
    poly([v(3.36, skin), v(8.75, skin), v(8.75, skin + 0.24), v(3.36, skin + 0.24)], { tone: "b", fill: "b" }),
    poly([v(3.56, skin + 0.24), v(8.56, skin + 0.24), v(8.13, skin + 1.25), v(3.95, skin + 1.25)], { tone: "ink", fill: "muted", bold: true }),
    txt(v(6, skin + 1.85), "Ultrason başlığı", "n", { small: true }),
    txt(v(2.93, skin + 0.15), "Jel", "w", { tone: "b", small: true }),
    txt(v(10.25, skin + 0.12), "Cilt", "e", { tone: "ink", small: true }),
    seg(v(1.06, shallowY), v(5.84, shallowY), { tone: "a", bold: true }),
    seg(v(6.35, deepY), v(11.33, deepY), { tone: "c", bold: true }),
    ...waves(4.48, shallowY, "a"), ...waves(7.47, deepY, "c"),
    txt(v(1.4, shallowY - 0.31), "Yakın sınır", "se", { tone: "a", small: true }),
    txt(v(11.14, deepY - 0.31), "Derin sınır", "sw", { tone: "c", small: true }),
  ];
  if (showReturn) {
    els.push(
      txt(v(3.53, shallowY - 1.01), `${shallowDelayUs} µs · ${fmt(ultrasoundDepthCm(shallowDelayUs), 2)} cm`, "s", { tone: "a", small: true }),
      txt(v(8.82, deepY - 1.01), `${delay} µs · ${fmt(ultrasoundDepthCm(delay), 2)} cm`, "s", { tone: "c", small: true }),
    );
  }
  return {
    els,
    readout: showReturn ? [
      `İlk yankı ${shallowDelayUs} µs sonra gelir. Yakın sınır ${fmt(ultrasoundDepthCm(shallowDelayUs), 2)} cm derinde.`,
      `İkinci yankı ${delay} µs sonra gelir. Derin sınır ${fmt(ultrasoundDepthCm(delay), 2)} cm derinde.`,
      "Kesik oklar geri dönen sesi gösterir.",
    ] : ["Başlık ses gönderir. Ses jel ve ciltten geçip çizimdeki iki doku sınırına ulaşır."],
  };
}

export const ultrasoundFigures: Record<string, FigureDef> = {
  [ultrasoundTitle]: {
    caption: "Sesin dokudaki iki sınıra gidişini ve başlığa dönüşünü aç. İkinci yankının süresini değiştir.",
    alt: "Başlık, jel ve cilt iki doku sınırının üstündedir. Sonraki adım iki sınırdan dönen yankıyı ve bunların derinliklerini gösterir.",
    param: { label: "Derin sınırın yankı süresi", ...ultrasoundDelay, unit: " µs" },
    steps: ["Ses gönder", "Yankıları karşılaştır"],
    draw: (time, step) => ultrasoundFrame(time, step === 1),
  },
  [ultrasoundProbeTitle]: {
    caption: "Başlıktan aşağı inen iki ok sesin dokuya gittiği yönü gösterir.",
    alt: "Başlık ile doku arasında ince jel var. Ses okları başlıktan farklı derinlikteki iki sınıra iniyor.",
    draw: () => ultrasoundFrame(ultrasoundDelay.init, false),
  },
  [ultrasoundDepthTitle]: {
    caption: "50 µs ve 100 µs sonuçlarını iki sınırın yanında karşılaştır.",
    alt: "Yakın sınır 50 mikrosaniyede yankı verir ve 3,85 santimetre derindedir. Diğer sınır 100 mikrosaniyede yankı verir ve 7,7 santimetre derindedir.",
    draw: () => ultrasoundFrame(ultrasoundDelay.init, true),
  },
};
