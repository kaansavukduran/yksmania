import type { GuideSection, WorkedExample } from "./guides/types";
import { pulseProfileAt, pulseSpeedMps, pulseWidthM } from "./mebiSpringPulse";

export const pulseGenerationTitle = "Kaynak ucu tepe ve çukuru nasıl üretir?";
export const pulseGenerationTime = { min: 0, max: 2, step: 0.25, initial: 0.75 };
const sourceDurationS = pulseWidthM / pulseSpeedMps;
const decimals = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });

export function generatingPulseAt(timeS: number, sign: 1 | -1) {
  const front = pulseSpeedMps * timeS;
  const rear = pulseSpeedMps * Math.max(0, timeS - sourceDurationS);
  const height = (x: number) => {
    if (x < 0) return 0;
    const magnitude = pulseProfileAt(front - x);
    return magnitude === 0 ? 0 : sign * magnitude;
  };
  return {
    front,
    rear,
    width: front - rear,
    sourceHeight: height(0),
    height,
  };
}

export const pulseGenerationSection: GuideSection = {
  title: pulseGenerationTitle,
  figureTitle: pulseGenerationTitle,
  paragraphs: [
    "Sol ucu bir kez yukarı kaldırıp dengeye geri getirirsen tepe atması oluşur. Sol ucu bir kez aşağı indirip dengeye geri getirirsen çukur atması oluşur. Her iki durumda da bozulan bölgenin önü sağa ilerler.",
    "Kaynak ucu hareket ederken kendisinden uzaktaki noktalar daha önceki hareketi tekrarlar. Çizimde zamanı artır. Kaynak dengeye dönünce ön ve arka sınır birlikte sağa kayar.",
    "Bu ideal örnekte kaynak hareketi 1,5 s sürer ve bozunum 2 m/s ile yayılır. Atma bütünüyle oluştuğunda genişlik 2 × 1,5 = 3 m. Sağ uç henüz atmayı karşılamadığı için yansıma başlamadı.",
  ],
  table: {
    layout: "table",
    headers: ["Süre", "Ön sınır", "Arka sınır", "Genişlik"],
    rows: [0.75, 1.5, 2].map((time) => {
      const { front, rear, width } = generatingPulseAt(time, 1);
      return [`${decimals.format(time)} s`, ...[front, rear, width].map((value) => `${decimals.format(value)} m`)];
    }),
  },
};

export const pulseGenerationExample: WorkedExample = {
  title: "Kaynak dengeye dönünce atmanın sınırları",
  prompt: "Kaynak 1,5 s boyunca bir çukur atması oluşturuyor. Yayılma sürati 2 m/s. Başlangıçtan 2 s sonra atmanın ön ve arka sınırları nerede olur?",
  strategy: "Ön sınır başlangıçtan, arka sınır kaynak hareketinin bitiminden itibaren yol alır.",
  steps: [
    { label: "Ön sınırı bul", expression: "2 m/s × 2 s = 4 m", explanation: "Kaynağın ilk etkisi iki saniyedir yayılıyor." },
    { label: "Arka sınırı bul", expression: "2 m/s × (2 − 1,5) s = 1 m", explanation: "Kaynak dengeye döndükten sonraki yarım saniyede arka sınır 1 m ilerledi. Çukur seçip 2 s’yi aç.", figureTitle: pulseGenerationTitle },
  ],
  answer: "Arka sınır 1 m’de, ön sınır 4 m’de. Genişlik 3 m.",
  check: "4 − 1 = 3 m. Kaynak hareketi bittiği andaki genişlikle aynı.",
  pitfall: "Arka sınırın süre hesabına kaynağın dengeye döndüğü anda başla.",
};
