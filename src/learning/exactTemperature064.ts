import type { GuideSection, WorkedExample } from "./guides/types";

export const exactTemperatureTitle = "Üç termometrede aynı sıcaklık";

export function temperatureScales(celsius: number) {
  return { celsius, fahrenheit: (9 * celsius) / 5 + 32, kelvin: celsius + 273.15 };
}

export const exactTemperatureSection: GuideSection = {
  title: exactTemperatureTitle,
  figureTitle: exactTemperatureTitle,
  paragraphs: [
    "Tek bir sıcaklığı üç farklı sayı ve birimle yazabilirsin. Celsius ve Kelvin ölçeklerinde bir bölme aynı büyüklükte, sıfır düzeyleri farklı. K = °C + 273,15. Kelvin birimi K yazılır. Celsius ve Fahrenheit dönüşümü °F = 9 × °C / 5 + 32.",
    "Termometrelerdeki aynı yükseklik aynı fiziksel sıcaklığı gösteriyor. Yaklaşık olarak 1 atmosferde saf suyun donma sıcaklığı 0 °C = 32 °F = 273,15 K. Kaynama sıcaklığı 100 °C = 212 °F = 373,15 K. Kaynama basınca bağlıdır.",
    "Sıcaklık değişimi yapıyorsan sıfır farkını ekleme. 10 °C artış 10 K ve 18 °F artışa karşılık gelir. 0 K’nin mutlak sıfır karşılığı −273,15 °C ve −459,67 °F. Soruda 273 yuvarlaması verilirse o hesapta kullan.",
  ],
  table: {
    headers: ["Referans", "Celsius", "Fahrenheit", "Kelvin"],
    rows: [
      ["Saf suyun donması (yaklaşık)", "0 °C", "32 °F", "273,15 K"],
      ["Saf suyun kaynaması (yaklaşık)", "100 °C", "212 °F", "373,15 K"],
      ["Mutlak sıfır", "−273,15 °C", "−459,67 °F", "0 K"],
    ],
  },
};

export const exactTemperatureExample: WorkedExample = {
  title: "−10 °C ile 0 °C arasındaki artış",
  prompt: "−10 °C ve 0 °C’yi Fahrenheit ve Kelvin ile yaz. Sıcaklık artışı iki ölçekte kaçtır?",
  strategy: "İki sıcaklığı ayrı dönüştür. Son değer ile ilk değeri çıkar.",
  steps: [
    { label: "İlk sıcaklık", expression: "−10 °C = 14 °F = 263,15 K", explanation: "Fahrenheit dönüşümünde (9/5) × (−10) + 32 = 14.", figureTitle: exactTemperatureTitle },
    { label: "Fark", expression: "32 − 14 = 18 °F · 273,15 − 263,15 = 10 K", explanation: "Aynı fiziksel artış Fahrenheit ölçeğinde daha çok sayıda basamaktır." },
  ],
  answer: "−10 °C, 14 °F ve 263,15 K. 0 °C, 32 °F ve 273,15 K. Artış 18 °F veya 10 K.",
  check: "Fark için 10 × 9/5 = 18 ve 10 × 1 = 10. Eklenen sabitler iki değer çıkarılınca gider.",
  pitfall: "Artış hesabına 32 veya 273,15 ekleme.",
};
