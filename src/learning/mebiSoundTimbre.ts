import type { GuideSection, WorkedExample } from "./guides/types";

export const timbreTitle = "Aynı notanın iki tınısı";
export const timbreWaveTitle = "İki kaynağın periyotlarını karşılaştır";
export const timbreHarmonicTitle = "Aynı temel, farklı harmonik payları";
export const timbreModes = ["Eş süreli dalgalar", "Harmonikler"] as const;
export const timbreFrequencyHz = 300;
export const timbreCases = [
  { label: "Keman örneği", harmonics: [1, 0.55, 0.22] },
  { label: "Piyano örneği", harmonics: [1, 0.19, 0.37] },
] as const;

export function timbreAt(phase: number, harmonics: readonly number[]) {
  return harmonics.reduce((sum, amplitude, index) => sum + amplitude * Math.sin(2 * Math.PI * (index + 1) * phase), 0);
}

export const timbreSection: GuideSection = {
  title: timbreTitle,
  figureTitle: timbreTitle,
  paragraphs: [
    "Keman ve piyano aynı notayı çalabilir. İki sesin temel frekansı bu örnekte 300 Hz. Dalga biçimleri ve temel frekansın katlarındaki bileşenler farklı olduğu için ses kaynaklarını ayırt edebiliriz.",
    "Her çizgide dalganın tekrar ettiği aralığı bul. Yaklaşık 3,33 ms olan bu periyot ikisinde de aynı. İkinci adımda 300, 600 ve 900 Hz bileşenlerinin göreli genliklerini karşılaştır. Her temel frekansın genliği bir birim kabul edildi.",
    "Gerçek tınıda sesin başlangıcı ve sönmesi de etkilidir. Çizimler öğretim için seçilmiş basit harmonik birleşimleridir.",
  ],
  table: {
    layout: "table",
    headers: ["Bileşen (Hz)", ...timbreCases.map(sample => sample.label)],
    rows: [0, 1, 2].map(index => [
      String((index + 1) * timbreFrequencyHz),
      ...timbreCases.map(sample => String(sample.harmonics[index]).replace(".", ",")),
    ]),
  },
};

export const timbreExample: WorkedExample = {
  title: "İki sesin temel frekansı eşitken neyi ayırırız?",
  prompt: "İki örneğin temel frekansı 300 Hz. Biri 600 Hz bileşenini, diğeri 900 Hz bileşenini daha belirgin gösteriyor. Tizlikleri ve tınıları nasıl karşılaştırılır?",
  strategy: "Önce temel frekansı, sonra bileşenlerin göreli genliklerini karşılaştır.",
  steps: [
    { label: "Eş periyotları bul", explanation: "Her iki çizgi aynı aralıkta tekrar eder. Temel frekansları eşit.", expression: "T = 1/300 s ≈ 3,33 ms", figureTitle: timbreWaveTitle },
    { label: "Harmonik farkını bul", explanation: "600 ve 900 Hz bileşenlerinin payları farklı olduğu için çizginin biçimi ve tını değişir.", figureTitle: timbreHarmonicTitle },
  ],
  answer: "Tizlikleri aynı, tınıları farklıdır.",
  check: "İki grafikte de temel bileşen 300 Hz’de kalıyor.",
  pitfall: "Daha güçlü bir harmonik görünce temel frekansın değiştiğini varsayma.",
};
