import type { GuideSection, WorkedExample } from "./guides/types";

export const springPulseTitle = "Bir atma ilerlerken yayın bir noktası ne yapar?";
export const pulseLeftM = 2;
export const pulseWidthM = 3;
export const pulseSpeedMps = 2;
export const pulseAmplitude = 1.25;
export const pulseMarkerM = 4.5;
export const pulseSupportM = 10;

export function springPulseAt(timeS: number) {
  const leftM = pulseLeftM + pulseSpeedMps * timeS;
  const rightM = leftM + pulseWidthM;
  const displacement = (x: number) => {
    if (x <= leftM || x >= rightM) return 0;
    return pulseAmplitude * (1 - Math.cos(2 * Math.PI * (x - leftM) / pulseWidthM)) / 2;
  };
  return { leftM, rightM, displacement };
}

export const springPulseSection: GuideSection = {
  title: springPulseTitle,
  figureTitle: springPulseTitle,
  paragraphs: [
    "Sol uca tek bir düşey hareket yaptırıldığında yay üzerinde kısa bir biçim oluşur. Bu tek değişime atma denir. Sağ uç duvara bağlı. Çizimde atma henüz duvara varmadığı için bir yansıma görmüyoruz.",
    "Süreyi artırınca tüm tepe sağa ilerler. P işaretinin yatay konumu sabit kalır. Önce yukarı çıkar, sonra dengeye iner. Atma ilerlerken aktarım komşu yay parçaları üzerinden gerçekleşir.",
    "Yayın biçimini aynı anda iki uçtan oku. Aralarındaki uzaklık atmanın genişliği. Bu ideal örnekte 2 m/s süratle her yarım saniyede iki uç da 1 m sağa ilerler ve genişlik 3 m kalır. Bu çizim tek atmanın yansıma öncesi kesitidir.",
  ],
  table: {
    layout: "table",
    headers: ["Başlangıçtan beri süre", "Atmanın sınırları", "Genişlik"],
    rows: [["0 s", "2 m ve 5 m", "3 m"], ["0,5 s", "3 m ve 6 m", "3 m"], ["1 s", "4 m ve 7 m", "3 m"]],
  },
};

export const springPulseExample: WorkedExample = {
  title: "Atmanın iki ucu yarım saniye sonra",
  prompt: "Yayda atmanın sınırları x = 2 m ve x = 5 m. Atma sabit 2 m/s süratle sağa ilerliyor. Yarım saniye sonra sınırlar nerede olur ve genişlik kaç metredir?",
  strategy: "Önce alınan yolu bul. Aynı uzaklığı her iki sınıra ekle.",
  steps: [
    { label: "Yatay yolu bul", expression: "2 m/s × 0,5 s = 1 m", explanation: "Her iki sınır yarım saniyede 1 m sağa gider." },
    { label: "Sınırları işaretle", expression: "2 + 1 = 3 m ve 5 + 1 = 6 m", explanation: "Son konumları aynı yatay eksende karşılaştır. Çizimde 0,5 s’ye git.", figureTitle: springPulseTitle },
    { label: "Genişliği ölç", expression: "6 m − 3 m = 3 m", explanation: "İki sınır aynı kadar ötelenince farkları korunur." },
  ],
  answer: "Sınırlar 3 m ve 6 m olur. Genişlik 3 m kalır.",
  check: "Başta 5 − 2 = 3 m, sonda 6 − 3 = 3 m.",
  pitfall: "1 m atmanın aldığı yol. Genişlik aynı andaki iki sınırın arası.",
};
