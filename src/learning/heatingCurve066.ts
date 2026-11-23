import type { GuideSection, WorkedExample } from "./guides/types";

export const heatingCurveTitle = "Grafiği beş enerji basamağına ayır";
export const heatingMass = 0.1;

export const heatingStages = [
  { name: "Buz ısınıyor", temperature: 0, perKgKj: 42, label: "Buz −20 °C’den 0 °C’ye çıkar" },
  { name: "Buz eriyor", temperature: 0, perKgKj: 334, label: "Buz ve su 0 °C’de birlikte bulunur" },
  { name: "Su ısınıyor", temperature: 100, perKgKj: 420, label: "Su 0 °C’den 100 °C’ye çıkar" },
  { name: "Su kaynıyor", temperature: 100, perKgKj: 2260, label: "Su ve buhar 100 °C’de birlikte bulunur" },
  { name: "Buhar ısınıyor", temperature: 120, perKgKj: 40, label: "Buhar 100 °C’den 120 °C’ye çıkar" },
] as const;

export function heatingPoints(mass = heatingMass) {
  const points = [{ totalKj: 0, temperature: -20 }];
  for (const stage of heatingStages) {
    const previous = points[points.length - 1];
    points.push({ totalKj: previous.totalKj + mass * stage.perKgKj, temperature: stage.temperature });
  }
  return points;
}

const numberTR = new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const temperatures = heatingPoints().map(({ temperature }) => temperature);
const degrees = (n: number) => `${String(n).replace("-", "−")} °C`;

export const heatingCurveTable: NonNullable<GuideSection["table"]> = {
  headers: ["Bölge", "Sıcaklık", "0,10 kg için verilen ısı"],
  rows: heatingStages.map((stage, i) => {
    const [initial, final] = [temperatures[i], temperatures[i + 1]];
    return [stage.name, initial === final ? degrees(initial) : `${degrees(initial)} → ${degrees(final)}`, `${numberTR.format(heatingMass * stage.perKgKj)} kJ`];
  }),
};

export const heatingCurveExample: WorkedExample = {
  title: "Erime sırasında grafiğin yatay aralığı",
  prompt: "0,10 kg su numunesi için erime grafikte toplam 4,20 kJ verilince başlıyor ve toplam 37,60 kJ verilince bitiyor. Yalnız erimeye giden enerji kaç kJ?",
  strategy: "Erimenin başladığı ve bittiği toplam ısıları aynı yatay eksenden oku.",
  steps: [
    { label: "Yatay bölge", expression: "Q = 37,60 − 4,20 = 33,40 kJ", explanation: "İlk 4,20 kJ buzu 0 °C’ye getirdi. Erime için yalnız yatay aralıktaki ısıyı kullan.", figureTitle: heatingCurveTitle },
    { label: "Kütleyle denetle", expression: "0,10 kg × 334 kJ/kg = 33,40 kJ", explanation: "Sıcaklık sabitken hâl değişiyor. Bu nedenle Q = mL uygundur." },
  ],
  answer: "Yalnız erimeye giden enerji 33,40 kJ.",
  check: "4,20 kJ + 33,40 kJ = 37,60 kJ. Sıcaklığın sabit kalması enerji alışverişinin durduğu anlamına gelmez.",
  pitfall: "37,60 kJ birikimli toplamdır. İlk bölgeyi erime hesabına katma.",
};
