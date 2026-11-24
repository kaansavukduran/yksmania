import type { GuideSection, WorkedExample } from "./guides/types";

export const waterBoilingTitle = "Basınç suyun kaynama eşiğini değiştirir";
export const pressureMeltingTitle = "Basınç artınca erime sıcaklığı nasıl değişir?";
export const lowPressureBoilingTitle = "90 °C’de su iki kapta aynı durumda mı?";

// NIST Chemistry WebBook SRD 69, water saturation curve. MPa entries converted to kPa.
export const waterSaturation = [
  { temperature: 90, pressure: 70.1818 },
  { temperature: 100, pressure: 101.418 },
  { temperature: 110, pressure: 143.379 },
  { temperature: 120, pressure: 198.674 },
] as const;

export const boilingEnvironments = [
  { label: "Düşük atmosfer basıncı", saturationIndex: 0, closed: false },
  { label: "Deniz seviyesine yakın", saturationIndex: 1, closed: false },
  { label: "Düdüklü tencere modeli", saturationIndex: 3, closed: true },
] as const;

export function waterBoilingState(temperature: number, environment: typeof boilingEnvironments[number]) {
  const row = waterSaturation[Math.round((temperature - 90) / 10)];
  const externalPressure = waterSaturation[environment.saturationIndex].pressure;
  return {
    vaporPressure: row.pressure,
    externalPressure,
    boiling: Math.sign(row.pressure - externalPressure),
  };
}

export const meltingCases = [
  { material: "Buz", volume: "Küçülür", temperature: "Düşer", slope: -1 },
  { material: "Bakır", volume: "Büyür", temperature: "Yükselir", slope: 1 },
] as const;

export const pressureMeltingSection: GuideSection = {
  title: pressureMeltingTitle,
  figureTitle: pressureMeltingTitle,
  paragraphs: [
    "Erime, katının sıvıya dönüşmesidir. Basınç artınca dengede daha az yer kaplayan hâl desteklenir. Buz erirken hacmi küçülür. Bu nedenle olağan koşullara yakınken basıncı artırmak buzun erime sıcaklığını düşürür. Bakır erirken hacmi büyür, bu yüzden ters eğilim görülür.",
    "Basılan bir kar tabakası sıkışabilir. Erimeyi değerlendirirken karın sıcaklığı ve çevreden aldığı ısı da gerekir. Benzer biçimde dağda karın ne kadar kalacağını yalnız rakım ve basınçtan çıkaramayız. Grafikteki doğrular yönü gösterir, ölçülmüş sıcaklıklar vermez.",
  ],
  table: {
    layout: "table",
    headers: ["Madde", "Erirken hacim", "Basınç artarken erime sıcaklığı"],
    rows: meltingCases.map(({ material, volume, temperature }) => [material, volume, temperature]),
  },
};

export const waterBoilingSection: GuideSection = {
  title: waterBoilingTitle,
  figureTitle: waterBoilingTitle,
  paragraphs: [
    "Saf suyun doymuş buhar basıncı sıcaklık yükseldikçe artar. Kaynama eşiğinde bu değer su yüzeyine etki eden basınca eşittir. Açık kapta bu basınç atmosferden gelir. Yüksek rakımda atmosfer basıncı genellikle daha düşük olduğu için su daha düşük sıcaklıkta kaynar. Kaynamaya kadar geçen süre, suyun ilk sıcaklığına ve ısıtıcı gücüne de bağlıdır.",
    "Kapalı basınçlı kapta suyun yüzeyine etki eden basınç daha yüksek olabilir. Bu durumda kaynamaya ulaşmak için suyu daha yüksek sıcaklığa çıkarmak gerekir. Çizimdeki kap, basınç ve sıcaklık ilişkisini gösteren bir modeldir.",
    "NIST tablosu saf su içindir. Deniz seviyesindeki 1 atm, yaklaşık 101,33 kPa’dır. Tabloda 100 °C için doygunluk basıncı 101,42 kPa. ‘Yaklaşık 100 °C’ dememizin nedeni bu küçük fark ve atmosferin değişebilmesidir.",
  ],
  table: {
    layout: "table",
    headers: ["Su sıcaklığı (°C)", "Doymuş buhar basıncı (kPa)"],
    rows: waterSaturation.map(({ temperature, pressure }) => [String(temperature), pressure.toFixed(2).replace(".", ",")]),
  },
};

export const lowPressureBoilingExample: WorkedExample = {
  title: "90 °C’de hangi kaptaki su kaynama sınırına ulaşır?",
  prompt: "A ve B açık kaplarında saf su 90 °C. Suyun bu sıcaklıktaki doymuş buhar basıncı 70,18 kPa. A’da atmosfer basıncı 70,18 kPa, B’de 101,42 kPa. Hangi kapta kaynama eşiği sağlanır?",
  strategy: "Sıcaklığı kullanarak verilen buhar basıncını seç. Her kap için onu atmosfer basıncıyla karşılaştır.",
  steps: [
    { label: "Ortak verilen", expression: "Buhar basıncı ≈ 70,18 kPa", explanation: "İki kapta da saf su aynı sıcaklıkta. Doymuş buhar basıncı ikisinde de aynı." },
    { label: "Kapları karşılaştır", expression: "A: 70,18 = 70,18 · B: 70,18 < 101,42", explanation: "A’da denge eşitliği var. B’nin dış basıncı daha yüksek olduğundan 90 °C eşik için yetersiz.", figureTitle: lowPressureBoilingTitle },
  ],
  answer: "A kabı kaynama eşiğinde. B kabı kaynama eşiğinin altında.",
  check: "Daha düşük dış basınç, daha düşük kaynama sıcaklığıyla uyumlu.",
  pitfall: "Kaynamayı belirlemek için sıcaklıkların eşit olduğunu bilmek yetmez. Dış basınç da gerekir.",
};
