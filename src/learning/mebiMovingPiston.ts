import type { GuideSection, WorkedExample } from "./guides/types";

export const movingPistonTitle = "Hareketli pistonun son dengesini bul";
export const heatedPistonFigureTitle = "Isınan gaz pistonu yükseltir";
export const pistonChanges = [
  { label: "Gazı ısıt", variable: "temperature", unchanged: "Son basınç" },
  { label: "Gaz ekle", variable: "amount", unchanged: "Son basınç" },
  { label: "Pistona yük ekle", variable: "load", unchanged: "Gaz miktarı ve sıcaklığı" },
  { label: "Dış basıncı artır", variable: "atmosphere", unchanged: "Gaz miktarı ve sıcaklığı" },
] as const;

const initialAtmosphere = 1;
const initialLoad = 0.2;
const initialAbsolutePressure = initialAtmosphere + initialLoad;

export function movingPistonState(change: typeof pistonChanges[number], factor: number) {
  const ratios = { temperature: 1, amount: 1, load: 1, atmosphere: 1 };
  ratios[change.variable] = factor;
  const atmosphere = initialAtmosphere * ratios.atmosphere;
  const load = initialLoad * ratios.load;
  const pressure = atmosphere + load;
  const volume = initialAbsolutePressure * ratios.temperature * ratios.amount / pressure;
  return { atmosphere, load, pressure, volume };
}

export const movingPistonSection: GuideSection = {
  title: movingPistonTitle,
  figureTitle: movingPistonTitle,
  paragraphs: [
    "Düşey, sızdırmaz bir piston serbestçe hareket edebiliyorsa son durumda durur. Gaz pistonu yukarı iter. Dış hava ve piston yükü aşağı doğru kuvvet uygular. Alan A ve aşağı yönlü yük G ise G/A basınç ekler. Denge basıncı Pgaz = Pdış + G/A olur.",
    "Dışarıdaki hava ve yük aynı kalırken gaz ısıtılırsa veya içerideki gaz miktarı artırılırsa piston yükselir. Hareket tamamlanınca yeni hacim daha büyüktür. Gazın son basıncı, aynı dış hava ve piston yükünü dengelediği için ilk değerine döner.",
    "Dış basınç veya piston yükü büyürse gazı dengeleyen basınç büyür. Sıcaklık ve gaz miktarı sabitken piston aşağı iner, hacim küçülür. Her sabit varsayımın son dengeyi anlattığını unutma.",
  ],
  table: {
    layout: "table",
    headers: ["Artırılan", "Sabit kalan", "Son hacim"],
    rows: pistonChanges.map((change) => [
      change.label,
      change.unchanged,
      movingPistonState(change, 2).volume > 1 ? "Büyür" : "Küçülür",
    ]),
  },
};

export const heatedPistonExample: WorkedExample = {
  title: "Piston ısınan gazı nasıl dengeler?",
  prompt: "Dış hava 1 atm, piston yükünün basıncı 0,2 atm. İlk sıcaklık 300 K ve hacim V. Gaz sızmadan 450 K’ye ısıtılıyor. Piston serbest, son denge basıncı ve hacmi ne olur?",
  strategy: "Önce kuvvet dengesiyle son basıncı belirle. Ardından ideal gaz bağıntısından hacmi bul.",
  steps: [
    { label: "Basınç", expression: "Pgaz = 1 + 0,2 = 1,2 atm", explanation: "Dış hava ve yük değişmediği için iki dengede de toplam basınç aynı." },
    { label: "Hacim", expression: "V₂/V₁ = 450/300 = 1,5", explanation: "Miktar ve basınç sabit. Kelvinde sıcaklık oranı hacim oranına eşit.", figureTitle: heatedPistonFigureTitle },
    { label: "Son durum", expression: "V₂ = 1,5V", explanation: "Gaz genişlerken piston yükselir. Gaz, daha büyük hacimde aynı yükü dengeler." },
  ],
  answer: "1,2 atm ve 1,5V.",
  check: "Pgaz ve n sabit olduğunda V/T oranı korunur.",
  pitfall: "Rijit kapta ısıtma basıncı değiştirir. Serbest yükteki piston aynı örnekte hacmi değiştirir.",
};
