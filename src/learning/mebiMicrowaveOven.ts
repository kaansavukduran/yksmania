import type { GuideSection, WorkedExample } from "./guides/types";

export const microwaveOvenTitle = "Mikrodalga fırında enerji nereye gider?";
export const microwaveOvenFrequencyMHz = 2450;
const lightSpeedMps = 300_000_000;

export function microwaveOvenWavelengthCm() {
  return (lightSpeedMps / (microwaveOvenFrequencyMHz * 1_000_000)) * 100;
}

const centimeters = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 });
export const microwaveOvenWavelengthLabel = `${centimeters.format(microwaveOvenWavelengthCm())} cm`;

const innerCeilingY = 5.3;
const sourceEntry = { x: 9.4, y: 3.4 };
const foodSurface = { x: 3.4, y: 2.15 };
const entryHeight = innerCeilingY - sourceEntry.y;
const foodHeight = innerCeilingY - foodSurface.y;

export const microwaveOvenEnergyPath = {
  entry: sourceEntry,
  reflection: {
    x: sourceEntry.x + (foodSurface.x - sourceEntry.x) * entryHeight / (entryHeight + foodHeight),
    y: innerCeilingY,
  },
  food: foodSurface,
};

export const microwaveOvenStages = [
  { label: "Dalganın üretimi", element: "Kaynak", detail: "Magnetron, fırının içinde mikrodalga üretir." },
  { label: "Metalden yansıma", element: "Metal duvar", detail: "Mikrodalgalar metal iç duvardan yansıyabilir." },
  { label: "Yiyecekte soğurulma", element: "Yiyecek", detail: "Yiyecek dalganın enerjisinin bir bölümünü alır ve ısınır." },
];

export const microwaveOvenSection: GuideSection = {
  title: microwaveOvenTitle,
  figureTitle: microwaveOvenTitle,
  paragraphs: [
    "Mikrodalgalar elektromanyetik dalgalardır. Kablosuz ağ ve Bluetooth bu dalgalarla bilgi iletebilir. Fırında amaç enerji aktarıp yiyeceği ısıtmaktır.",
    "Kesitte önce magnetronu, sonra metal iç duvarı ve yiyeceği izle. Fırın içinde farklı yönlerde ilerleyen dalgalar bulunur. Oklar enerjinin olası bir yolunu gösterir. Yiyecek enerjinin bir bölümünü soğurur. Kalın bir yiyeceğin içine ısı iletimiyle de enerji taşınabilir.",
    `Bu örnekte fırının frekansı 2,45 GHz. Boşlukta bir dalga boyu yaklaşık ${microwaveOvenWavelengthLabel}. Yiyeceğin içindeki dalga boyu ise ortamın özelliklerine bağlıdır.`,
  ],
  table: {
    layout: "table",
    headers: ["Kesitteki parça", "Enerjiye ne olur?"],
    rows: microwaveOvenStages.map(({ element, detail }) => [element, detail]),
  },
};

export const microwaveOvenExample: WorkedExample = {
  title: "2,45 GHz mikrodalganın boşluktaki dalga boyunu bul",
  prompt: "Fırının ürettiği mikrodalganın frekansı 2,45 GHz. Boşlukta yayılma sürati 300.000.000 m/s alınırsa dalga boyu yaklaşık kaç santimetredir?",
  strategy: "Frekansı hertz cinsinden yaz, sürati frekansa böl ve metreyi santimetreye çevir.",
  steps: [
    { label: "Birimleri düzenle", expression: "2,45 GHz = 2.450 MHz = 2.450.000.000 Hz", explanation: "1 GHz bir milyar hertz. Kullanacağın frekans, kesitteki kaynağın ürettiği dalgaya aittir.", figureTitle: microwaveOvenTitle },
    { label: "Dalga boyunu bul", expression: "λ = 300.000.000 ÷ 2.450.000.000 ≈ 0,122 m", explanation: "Saniyede alınan yolu saniye başına titreşim sayısına bölünce bir titreşime karşılık gelen uzaklık bulunur." },
    { label: "Metreyi santimetreye çevir", expression: `0,122 m ≈ ${microwaveOvenWavelengthLabel}`, explanation: "Bir metrede 100 santimetre var. Bu aşamada dalga boyunu yalnızca başka bir birimle yazdın." },
  ],
  answer: `Dalga boyu yaklaşık ${microwaveOvenWavelengthLabel}.`,
  check: "0,122 m × 2.450.000.000 Hz ≈ 299.000.000 m/s. Yuvarlama payıyla verilen sürate yakın.",
  pitfall: "2,45 sayısını hertz olarak kullanırsan dalga boyunu bir milyar kat büyük bulursun.",
};
