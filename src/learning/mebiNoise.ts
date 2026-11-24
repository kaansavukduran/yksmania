import type { GuideSection, WorkedExample } from "./guides/types";

export const noiseTitle = "Birden çok ses aynı yerde nasıl birleşir?";
export const noiseSourcesTitle = "Önce kaynakların şiddetini topla";
export const noiseLevelTitle = "Toplam şiddeti desibele çevir";
export const noiseBaselineDb = 55;
export const noiseSourceCounts = { min: 1, max: 4, step: 1, init: 2 } as const;

export function combinedNoiseLevelDb(sources: number) {
  return noiseBaselineDb + 10 * Math.log10(sources);
}

export const noiseSection: GuideSection = {
  title: noiseTitle,
  figureTitle: noiseTitle,
  paragraphs: [
    "Gürültü, ortamda istenmeyen ve kulağa ulaşan sestir. Bir sınıfta konuşmayı duymayı güçleştiren uğultu buna örnek. Yüksek düzeyin ne kadar sürdüğü de sesin işitme üzerindeki etkisini değiştirir.",
    "Aynı noktaya ulaşan bağımsız seslerin ortalama şiddetleri toplanır. Her bir kaynak tek başına o noktada 55 dB ölçülüyorsa iki kaynak toplam şiddeti iki katına çıkarır. Desibel ölçeği bu iki katı yaklaşık 3 dB artış olarak gösterir.",
    "Kaynak sayısını değiştir ve toplam şiddetin kaç birim olduğunu say. Desibel değerlerini doğrudan toplarsan iki adet 55 dB için 110 dB bulursun. Modelde iki eş kaynakla ölçüm yaklaşık 58 dB olur.",
  ],
  table: {
    layout: "table",
    headers: ["Eş kaynak sayısı", "Tek kaynağa göre şiddet", "Toplam düzey (dB)"],
    rows: [1, 2, 3, 4].map(count => [
      String(count), `${count} kat`, combinedNoiseLevelDb(count).toLocaleString("tr-TR", { maximumFractionDigits: 2 }),
    ]),
  },
};

export const noiseExample: WorkedExample = {
  title: "İki eş ses kaynağı birlikte kaç desibel olur?",
  prompt: "İki bağımsız cihaz, aynı ölçüm noktasında tek başına 55 dB ses düzeyi oluşturuyor. İkisi çalışınca ölçüm yaklaşık kaç dB olur?",
  strategy: "Cihazların şiddetlerini oran olarak topla. Ardından şiddet çarpanını desibel farkına dönüştür.",
  steps: [
    { label: "İki birim şiddeti birleştir", explanation: "Aynı ölçüm noktasında iki kaynağın katkısı birer birim. Toplam iki birim şiddet.", figureTitle: noiseSourcesTitle },
    { label: "İki katı desibel artışına çevir", explanation: "Şiddet ikiye katlandığında 10 · log₁₀(2) yaklaşık 3,01 dB olur.", expression: "55 + 3,01 ≈ 58 dB", figureTitle: noiseLevelTitle },
  ],
  answer: "Toplam ses düzeyi yaklaşık 58 dB.",
  check: "Yeni ölçüm tek kaynak ölçümünden yaklaşık 3 dB yüksek.",
  pitfall: "55 dB ile 55 dB’yi toplayıp 110 dB bulma.",
};
