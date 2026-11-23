import type { GuideSection, WorkedExample } from "./guides/types";

export const rigidGasTitle = "Rijit kapta gaz basıncını üç deneyle karşılaştır";
export const gasExpansionFigureTitle = "Aynı sıcaklıkta iki kap hacmi";
export const rigidGasExperiments = [
  { label: "Sıcaklığı artır", variable: "temperature", constants: "Hacim ve miktar", basePressure: 1 },
  { label: "Gazı daha büyük kaba aktar", variable: "volume", constants: "Sıcaklık ve miktar", basePressure: 2 },
  { label: "Kaba gaz ekle", variable: "amount", constants: "Sıcaklık ve hacim", basePressure: 1 },
] as const;
type GasExperiment = typeof rigidGasExperiments[number];

export function rigidGasState(experiment: GasExperiment, factor: number) {
  // Ratios to the condition before changing the selected quantity.
  const conditions = { amount: 1, temperature: 1, volume: 1 };
  conditions[experiment.variable] = factor;
  const { amount, temperature, volume } = conditions;
  return { amount, temperature, volume, pressureAtm: experiment.basePressure * amount * temperature / volume };
}

export const rigidGasSection: GuideSection = {
  title: rigidGasTitle,
  figureTitle: rigidGasTitle,
  paragraphs: [
    "Rijit kabın duvarları genişlemez. Gaz tanecikleri duvara çarpıp yön değiştirirken duvara kuvvet uygular. Birim alana düşen ortalama kuvvet basınçtır. İdeal gazda P · V = n · R · T. T mutlak sıcaklıktır ve kelvinle yazılır.",
    "İlk deneyde hacim ve gaz miktarı sabit. Sıcaklık kelvin cinsinden iki katına çıkınca basınç 1 atm’den 2 atm’ye yükselir. Isınan taneciklerin çarpışmaları ortalamada daha sık ve daha etkilidir.",
    "İkinci deneyde aynı gaz, sıcaklığı değişmeden hacmi iki kat olan başka bir kaba aktarılır. Basınç 2 atm’den 1 atm’ye iner. Üçüncü deneyde aynı rijit kaba aynı sıcaklıkta iki kat tanecik konduğunda basınç 1 atm’den 2 atm’ye çıkar.",
    "Kapalı bir kaptaki saf sıvı buharlaşabilir. Böyle bir durumda yalnız sıcaklık değişiyor varsayımı kendiliğinden geçerli olmaz. Önce soruda hangi niceliklerin sabit verildiğine bak.",
  ],
  table: {
    layout: "table",
    headers: ["Değişen", "Sabit kalan", "İlk basınç", "Değer iki katına çıkınca"],
    rows: rigidGasExperiments.map((experiment) => [
      experiment.label,
      experiment.constants,
      `${experiment.basePressure} atm`,
      `${rigidGasState(experiment, 2).pressureAtm} atm`,
    ]),
  },
};

export const rigidGasExample: WorkedExample = {
  title: "Aynı gazı iki kat hacme taşı",
  prompt: "Gaz 2 atm basınçla V hacimli K kabında. Gazın tamamı 2V hacimli boş L kabına aktarılıyor. İlk ve son sıcaklık eşit. Son basınç kaç atm?",
  strategy: "Miktar ve kelvin sıcaklığı sabitken P · V çarpımını koru.",
  steps: [
    { label: "İlk durum", expression: "P₁ · V₁ = 2 · V", explanation: "Bütün gaz K kabında. İlk basınç 2 atm." },
    { label: "Son hacim", expression: "P₂ · 2V = 2 · V", explanation: "Gaz aynı, hacim iki kat. Yalnız hacim değişti.", figureTitle: gasExpansionFigureTitle },
    { label: "Basıncı bul", expression: "P₂ = 1 atm", explanation: "İki kat hacimde aynı gazın basıncı yarıya iner." },
  ],
  answer: "1 atm",
  check: "2 atm · V = 1 atm · 2V.",
  pitfall: "Aktarma sırasında sıcaklık da değişseydi yalnız P · V çarpımını sabit alamazdın.",
};
