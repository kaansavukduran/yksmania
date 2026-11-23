import type { GuideSection, WorkedExample } from "./guides/types";
import { fillingBaseArea, fillingSeconds, fillingShapes, fillingState, modelGravity, waterDensity, waterPressureKPa } from "./mebiHydrostaticFilling";

export const surfaceForceTitle = "Her yüzeyde derinliği ve alanı birlikte ölç";
export const baseForceTitle = "Taban kuvveti ve suyun ağırlığı farklı olabilir";
export const exampleSurfaceArea = 0.02;
export const loadedSurfaces = [
  { label: "Dik duvar", depthUnits: 1, areaUnits: 2 },
  { label: "Yatay taban", depthUnits: 2, areaUnits: 1 },
  { label: "Eğik duvar", depthUnits: 1, areaUnits: 3 },
] as const;

export function surfaceForce(unitDepth: number, index: number) {
  const face = loadedSurfaces[index];
  const depth = face.depthUnits * unitDepth;
  const area = face.areaUnits * exampleSurfaceArea;
  return { depth, area, force: waterPressureKPa(depth) * 1000 * area };
}

export function baseAndWeight(shapeIndex: number) {
  const state = fillingState(fillingSeconds, shapeIndex);
  const weight = waterDensity * state.volume * modelGravity;
  const baseForce = state.pressure * 1000 * fillingBaseArea;
  return { ...state, weight, baseForce };
}

export const surfaceForceSection: GuideSection = {
  title: surfaceForceTitle,
  figureTitle: surfaceForceTitle,
  paragraphs: [
    "Durgun sıvı, temas ettiği yüzeye dik kuvvet uygular. Yatay tabanın her noktasında derinlik aynı. Düz bir yan yüzeyde derinlik değişiyorsa, doğrusal basınç artışı nedeniyle ortalama basıncı yüzeyin geometrik merkezindeki düşey derinlikten bul. Ardından ortalama basıncı yüzey alanıyla çarp.",
    "Dik duvarın merkezi h, alanı 2S. Taban 2h derinlikte, alanı S. Eğik duvarın merkezi h, gerçek eğik alanı 3S. İlk iki kuvvet aynı, üçüncüsü onların 1,5 katıdır. Şekilde ok kuvvet yönünü gösterir. Eğik duvarda su çizgisindeki uzunluğu ya da dikey izdüşüm alanını 3S yerine koyma.",
  ],
  table: {
    layout: "table",
    headers: ["Yüzey", "Merkez derinliği", "Alan", "Kuvvet"],
    rows: loadedSurfaces.map(({ label, depthUnits, areaUnits }) => [label, depthUnits === 1 ? "h" : "2h", areaUnits === 1 ? "S" : `${areaUnits}S`, `${depthUnits * areaUnits} · ρghS`]),
  },
};

export const baseForceSection: GuideSection = {
  title: baseForceTitle,
  figureTitle: baseForceTitle,
  paragraphs: [
    "Aynı miktarda suyu, taban alanı aynı olan üç kapta tut. Suyun ağırlığı değişmez. Yukarı doğru daralan kapta aynı su daha yükseğe çıkar. Taban basıncı P = ρgh, tabana etkiyen basınç kuvveti de F = PA olduğundan daralan kapta taban kuvveti büyür.",
    "Dik duvarda sıvı üzerindeki yan duvar kuvveti yataydır. Eğik duvar ise düşey yönde de kuvvet uygular. Bu yüzden tek başına taban kuvveti, suyun ağırlığıyla her durumda eşleşmez. Suyu ve kabı birlikte terazide tartarsan dışarıdan başka düşey kuvvet yokken toplam ağırlığı okursun.",
  ],
  table: {
    layout: "table",
    headers: ["Kap", "Su yüksekliği", "Taban kuvveti ve su ağırlığı"],
    rows: fillingShapes.map(({ label, change }) => [label, change === 0 ? "Orta" : change > 0 ? "En az" : "En çok", change === 0 ? "Eşit" : change > 0 ? "Taban kuvveti daha az" : "Taban kuvveti daha çok"]),
  },
};

export const surfaceForceExample: WorkedExample = {
  title: "Yüzeye dik üç kuvveti hesapla",
  prompt: "Su için ρg = 10.000 N/m³, h = 0,5 m ve S = 0,02 m². Dik ve eğik yüzeylerin merkez derinliği h, tabanın derinliği 2h. Alanlar dikte 2S, tabanda S, eğikte 3S. Kuvvetler kaç newton?",
  strategy: "Her yüzey için önce merkez derinliğinden ortalama basıncı bul, sonra gerçek yüzey alanıyla çarp.",
  steps: [
    { label: "Dik yüzey", expression: "10.000 · 0,5 · 0,04 = 200 N", explanation: "Ortalama basınç 5.000 Pa. Alan iki S.", figureTitle: surfaceForceTitle },
    { label: "Yatay taban", expression: "10.000 · 1 · 0,02 = 200 N", explanation: "Derinlik iki kat, alan ilk yüzeyin yarısı. Çarpım aynı." },
    { label: "Eğik yüzey", expression: "10.000 · 0,5 · 0,06 = 300 N", explanation: "Dik yüzeyle aynı merkez derinliği. Eğik yüzeyin gerçek alanı daha büyük." },
  ],
  answer: "Dik duvar 200 N, taban 200 N, eğik duvar 300 N.",
  check: "Eğik yüzeyin merkezi dik duvarla aynı derinlikte. 3S/2S = 1,5 olduğu için kuvveti de 1,5 kat.",
  pitfall: "Merkez derinliği yüzeyin en derin ucunun derinliği değildir.",
};
