import type { GuideSection, WorkedExample } from "./guides/types";
import { modelGravity, waterPressureKPa } from "./mebiHydrostaticFilling";

export const pascalAddedPressureTitle = "Ek basınç eşit, toplam basınç farklı";
export const sharedLevelTitle = "Bileşik kapta aynı seviyeden karşılaştır";
export const sensorDepths = [1, 2] as const;
export const pistonArea = 0.02;

export function pascalGaugePressures(force: number) {
  const increment = force / pistonArea / 1000;
  return { increment, gauges: sensorDepths.map((depth) => waterPressureKPa(depth) + increment) };
}

export const layerDensity = { left: 800, upperRight: 1000, connected: 1200 } as const;
export const layerUnits = { left: 4, upperRight: 2, connectedRight: 1 } as const;
export function sharedLevelPressures(unitHeight: number) {
  const kPaForLayers = (density: number, units: number) => density * modelGravity * unitHeight * units / 1000;
  const left = kPaForLayers(layerDensity.left, layerUnits.left);
  const upperRight = kPaForLayers(layerDensity.upperRight, layerUnits.upperRight);
  const connectedRight = kPaForLayers(layerDensity.connected, layerUnits.connectedRight);
  return { left, upperRight, connectedRight, right: upperRight + connectedRight };
}

export const pascalAddedPressureSection: GuideSection = {
  title: pascalAddedPressureTitle,
  figureTitle: pascalAddedPressureTitle,
  paragraphs: [
    "Kapalı, durgun bir sıvının pistonuna dik kuvvet uygula. İdeal modelde pistonun oluşturduğu ek basınç ΔP = F/A sıvının her noktasında aynı miktarda artış yapar. Ölçerler farklı derinliklerdeyse başlangıç değerleri farklıdır.",
    "Bu çizimde suyun 1 m ve 2 m derinliklerindeki başlangıç katkıları 10 ve 20 kPa. Pistona 40 N ekle. Alan 0,02 m² olduğundan ikisine de 2 kPa eklenir. Her ölçere aynı sayı eklendiği için aradaki 10 kPa fark korunur. Atmosfer katkısı bu gösterge ölçümlerine dahil değil.",
  ],
};

export const sharedLevelSection: GuideSection = {
  title: sharedLevelTitle,
  figureTitle: sharedLevelTitle,
  paragraphs: [
    "T ve N aynı yatay seviyede ve bağlı M sıvısında. Sıvı durgunsa bu iki noktanın basıncı eşittir. Her iki kol aynı havaya açık. Açık yüzeyden karşılaştırma seviyesine in ve karşılaştığın her sıvıya ayrı ρgh katkısı yaz.",
    "T'de L sıvısının 4h sütunu var. N'de K sıvısı yalnız 2h, alttaki M sıvısı h yüksekliğinde. Sağ tarafta K ile M farklı yoğunluklar; ikisini birden K yoğunluğuyla çarpma. Böylece ortak hava basıncı çıktıktan sonra 4h·ρL·g = 2h·ρK·g + h·ρM·g.",
  ],
  table: {
    layout: "table",
    headers: ["Seviye", "Yukarıdaki katmanlar", "Hava hariç basınç"],
    rows: [
      ["T", "L: 4h", "4h · ρL · g"],
      ["N", "K: 2h, M: h", "2h · ρK · g + h · ρM · g"],
    ],
  },
};

export const sharedLevelExample: WorkedExample = {
  title: "U borusundaki iki basıncı denetle",
  prompt: "İki kol aynı havaya açık. h = 0,1 m, g = 10 m/s². T üzerinde 4h L sıvısı (800 kg/m³); N üzerinde 2h K (1.000 kg/m³) ve h M (1.200 kg/m³) var. T ve N'deki sıvı katkıları eşit mi?",
  strategy: "İki ayrı yol için her katmanın kendi düşey yüksekliğini ve yoğunluğunu çarp.",
  steps: [
    { label: "T kolu", expression: "800 · 10 · 0,4 = 3.200 Pa", explanation: "Suyun değil, T üzerindeki L sıvısının özkütlesini kullan." },
    { label: "N kolu", expression: "1000 · 10 · 0,2 + 1200 · 10 · 0,1 = 3.200 Pa", explanation: "N üzerinde iki sıvı var. Katmanların basınç katkılarını topla.", figureTitle: sharedLevelTitle },
    { label: "Dengeyi kontrol et", expression: "3.200 Pa = 3.200 Pa", explanation: "Aynı hava basıncını eklesen eşitlik değişmez. T ve N bağlı sıvıda aynı seviyededir." },
  ],
  answer: "Evet, iki noktada da sıvı katkısı 3,2 kPa.",
  check: "Yalnız yükseklikler 0,4 m ve toplam 0,3 m olduğu için eşitlik kurulamaz. Farklı özkütleler dengede aynı toplamı verir.",
  pitfall: "Sağ koldaki 3h yüksekliğin tamamını K sıvısı saymak M katmanını gözden kaçırır.",
};
