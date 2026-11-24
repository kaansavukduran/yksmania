import type { GuideSection, WorkedExample } from "./guides/types";

export const radioWaveTitle = "Radyo vericisinden dalga cepheleri";
export const radioFrequencyMHz = { min: 50, max: 150, step: 25, initial: 100 };

export function radioWavelengthMeters(frequencyMHz: number) {
  return 300 / frequencyMHz;
}

export function radioWavefrontRadii(frequencyMHz: number) {
  const wavelength = radioWavelengthMeters(frequencyMHz);
  return Array.from({ length: Math.floor(12 / wavelength) }, (_, index) => (index + 1) * wavelength);
}

export function radioWavefrontPoints(radius: number, side: -1 | 1) {
  return Array.from({ length: 29 }, (_, index) => {
    const angle = (index - 14) * Math.PI / 47;
    return [side * radius * Math.cos(angle), radius * Math.sin(angle)] as const;
  });
}

export const radioWaveSection: GuideSection = {
  title: radioWaveTitle,
  figureTitle: radioWaveTitle,
  paragraphs: [
    "Antenin içinde salınan elektrik yükleri çevresinde değişen elektrik ve manyetik alanlar oluşturur. Bu değişimler elektromanyetik dalgayla yayılır. Radyo ve televizyon vericileri bu dalgalarla sinyal iletebilir. Yayılma için hava gerekmez.",
    "Çizimde anten çevresindeki çizgiler aynı evredeki bölgeleri temsil ediyor. Ardışık iki çizgi arasındaki radyal uzaklık bir dalga boyudur. Çizgilerin kendisi anten teli veya havadaki madde şeridi değildir.",
    "Boşlukta yayılma sürati yaklaşık 300.000.000 m/s. Megahertz milyon hertz demektir. Aynı ortamda frekansı artırınca dalga boyu kısalır. Çizim dalga boyu aralıklarını karşılaştıran basit bir kesittir, antenin ışıma biçimini ölçmez.",
  ],
  table: {
    layout: "table",
    headers: ["Verici frekansı", "Boşlukta dalga boyu"],
    rows: [["50 MHz", "6 m"], ["75 MHz", "4 m"], ["100 MHz", "3 m"], ["125 MHz", "2,4 m"], ["150 MHz", "2 m"]],
  },
};

export const radioWaveExample: WorkedExample = {
  title: "100 MHz vericinin iki cephesi arası",
  prompt: "100 MHz taşıyıcıya sahip bir vericinin boşlukta dalga boyu nedir? Aynı modelde 50 MHz seçilirse aralık nasıl değişir?",
  strategy: "Frekansı hertz birimine çevir ve sürati frekansa böl.",
  steps: [
    { label: "Birimi aç", expression: "100 MHz = 100.000.000 Hz", explanation: "Bir megahertz bir milyon hertz. Hesapta frekans saniye başına titreşim sayısıdır." },
    { label: "Aralığı hesapla", expression: "λ = 300.000.000 ÷ 100.000.000 = 3 m", explanation: "Çizimde komşu cephenin aralığı bir dalga boyu, yani 3 m.", figureTitle: radioWaveTitle },
    { label: "Yarı frekansa geç", expression: "50 MHz → 6 m", explanation: "Ortam aynı. Frekans yarıya inince dalga boyu iki katına çıkar." },
  ],
  answer: "100 MHz için 3 m. 50 MHz için 6 m.",
  check: "3 m × 100.000.000 Hz ve 6 m × 50.000.000 Hz aynı yayılma süratini verir.",
  pitfall: "Birimi MHz bırakıp 100’ü doğrudan hertz olarak kullanma.",
};
