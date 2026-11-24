import type { GuideSection, WorkedExample } from "./guides/types";

export const soundLevelTitle = "Desibel ölçeğinde ses düzeyini oku";
export const soundLevelDifferenceTitle = "50 dB’den 70 dB’ye iki adım";
export const soundLevelRatioTitle = "İki on kat çarpanı";
export const soundLevelLimits = { min: 0, max: 140, step: 10, initial: 70 };
export const soundLevelCases = [
  [0, "Referans düzey"],
  [10, "Nefes"],
  [20, "Yaprak hışırtısı"],
  [30, "Fısıltı"],
  [40, "Buzdolabı"],
  [50, "Sağanak yağış"],
  [60, "Konuşma"],
  [70, "Trafikteki otomobil"],
  [80, "Kamyon"],
  [90, "Saç kurutma makinesi"],
  [100, "Helikopter"],
  [110, "Trombon"],
  [120, "Polis sireni"],
  [130, "Jet motoru"],
  [140, "Havai fişek"],
] as const;

export function intensityRatio(firstDb: number, secondDb: number) {
  return 10 ** ((secondDb - firstDb) / 10);
}

export const soundLevelSection: GuideSection = {
  title: soundLevelTitle,
  figureTitle: soundLevelTitle,
  paragraphs: [
    "Ses şiddeti, birim alandan birim zamanda geçen enerjidir. Birimi watt bölü metrekaredir (W/m²). Desibel (dB) ise şiddetin bir referansa göre ses düzeyini belirtir. Hava için örnekte kullanılan referans şiddeti 10 üzeri −12 W/m².",
    "Ses düzeyi 10 dB yükseldiğinde şiddet on katına çıkar. 20 dB yükselme, iki kez onla çarpmak demektir. Şiddet oranı I₂/I₁ ise düzey farkı 10 · log₁₀(I₂/I₁) olur. 0 dB pozitif referans şiddetine karşılık gelir.",
    "Çizelgedeki kaynaklar yaklaşık örnekler. Gerçek ölçüm uzaklığa, ortama ve kullanılan ölçüm yöntemine bağlıdır. Yüksek sesin etkisinde düzey kadar maruz kalma süresi de önemlidir.",
  ],
  table: {
    layout: "table",
    headers: ["Temsilî düzey (dB)", "Örnek"],
    rows: soundLevelCases.map(([db, label]) => [String(db), label]),
  },
};

export const soundLevelExample: WorkedExample = {
  title: "20 dB fark kaç kat şiddet eder?",
  prompt: "Aynı referansla okunan iki ses düzeyi 50 dB ve 70 dB. İkinci sesin şiddeti birincinin kaç katı?",
  strategy: "Önce dB farkını bul. Her 10 dB için şiddeti bir kez onla çarp.",
  steps: [
    { label: "Ölçekte aralığı bul", explanation: "50’den 60’a, 60’tan 70’e iki eşit dB adımı var.", expression: "70 − 50 = 20 dB", figureTitle: soundLevelDifferenceTitle },
    { label: "Şiddet oranını hesapla", explanation: "Her adım on kat şiddet demektir. İki adımın çarpımını al.", expression: "I₂/I₁ = 10 × 10 = 100", figureTitle: soundLevelRatioTitle },
  ],
  answer: "İkinci sesin şiddeti birincinin 100 katıdır.",
  check: "10 · log₁₀(100) = 20 dB.",
  pitfall: "70’i 50’ye bölmek ses şiddetlerinin oranını vermez.",
};
