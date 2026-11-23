import type { GuideSection, WorkedExample } from "./guides/types";

export const weightedBalanceTitle = "Denge sıcaklığı hangi uca yakın?";
export const balanceTheoryTitle = "Denge sıcaklığını enerji korunumu kurar";
export const capacityUnit = 100;
export const xCapacity = 8 * capacityUnit;
export const yCapacity = 3 * capacityUnit;
export const yTemperature = 20;

export function weightedBalance(xTemperature: number, capacityX = xCapacity, capacityY = yCapacity) {
  const equilibrium = (capacityX * xTemperature + capacityY * yTemperature) / (capacityX + capacityY);
  return {
    midpoint: (xTemperature + yTemperature) / 2,
    equilibrium,
    xHeat: capacityX * (equilibrium - xTemperature),
    yHeat: capacityY * (equilibrium - yTemperature),
  };
}

const xReferenceTemperature = 75;
const reference = weightedBalance(xReferenceTemperature);
const gained = reference.yHeat.toLocaleString("tr-TR");

export const weightedBalanceTable: NonNullable<GuideSection["table"]> = {
  headers: ["Cisim", "Isı sığası", "İlk sıcaklık", "Dengedeki sıcaklık değişimi"],
  rows: [
    ["X", "2m × 4c = 8mc", `${xReferenceTemperature} °C`, `−${xReferenceTemperature - reference.equilibrium} °C`],
    ["Y", "3m × c = 3mc", `${yTemperature} °C`, `+${reference.equilibrium - yTemperature} °C`],
  ],
};

export const weightedBalanceExample: WorkedExample = {
  title: "Eşit enerjiler, farklı sıcaklık değişimleri",
  prompt: "X’in ısı sığası 800 J/K ve ilk sıcaklığı 75 °C. Y için bu değerler 300 J/K ve 20 °C. X’in kütlesi 2m, öz ısısı 4c. Y’nin kütlesi 3m, öz ısısı c. Yalıtılmış ortamda hâl değişmiyor. Denge sıcaklığı kaç °C ve Y ne kadar enerji alır?",
  strategy: "X’in kaybettiği ısının büyüklüğünü Y’nin kazandığına eşitle.",
  steps: [
    { label: "Enerjiyi eşitle", expression: "800(75 − T) = 300(T − 20)", explanation: "X soğur, Y ısınır. Her iki parantez sıcaklık değişiminin pozitif büyüklüğüdür." },
    { label: "Sıcaklığı hesapla", expression: "1.100T = 66.000, T = 60 °C", explanation: "60 °C, daha büyük ısı sığalı X’in başlangıcına daha yakındır.", figureTitle: weightedBalanceTitle },
    { label: "Kazancı kontrol et", expression: `${yCapacity} × (${reference.equilibrium} − ${yTemperature}) = ${gained} J`, explanation: `X, ${xCapacity} × (${xReferenceTemperature} − ${reference.equilibrium}) hesabıyla ${Math.abs(reference.xHeat).toLocaleString("tr-TR")} J kaybeder.` },
  ],
  answer: `Denge sıcaklığı ${reference.equilibrium} °C, Y’nin kazancı ${gained} J.`,
  check: "X 15 K soğur, Y 40 K ısınır. Sıcaklık değişimleri farklı olsa da enerji büyüklükleri aynı.",
  pitfall: "Sığalar eşit olmadığında ilk sıcaklıkların aritmetik ortalaması denge sıcaklığını vermez.",
};
