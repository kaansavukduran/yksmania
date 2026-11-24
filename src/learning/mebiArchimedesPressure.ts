import type { GuideSection, WorkedExample } from "./guides/types";

export const submergedBlockTitle = "Kaldırma alt ve üst basıncın farkından doğar";
export const submergedBlockExampleTitle = "İki derinlikte aynı kaldırma kuvveti";

const density = 800;
const gravity = 10;
const heightCm = 15;
const horizontalArea = 0.02;
const sideArea = 0.015;

export function submergedBlockPressure(topCm: number) {
  const bottomCm = topCm + heightCm;
  const pressurePerCm = density * gravity / 100;
  const topPressure = pressurePerCm * topCm;
  const bottomPressure = pressurePerCm * bottomCm;
  return {
    bottomCm,
    topPressure,
    bottomPressure,
    topForce: topPressure * horizontalArea,
    bottomForce: bottomPressure * horizontalArea,
    sideForce: (topPressure + bottomPressure) / 2 * sideArea,
    buoyancy: (bottomPressure - topPressure) * horizontalArea,
  };
}

export const submergedBlockSection: GuideSection = {
  title: submergedBlockTitle,
  figureTitle: submergedBlockTitle,
  paragraphs: [
    "Durgun sıvının basıncı yüzeye dik kuvvet uygular. Soldan sağa ve sağdan sola iten kuvvetler, eş alanlı yüzlerin merkezleri aynı derinlikte olduğu için birbirini dengeler. Ön ve arka çift de aynı nedenle dengelenir.",
    "Üst yüzün sıvı kuvveti aşağı, alt yüzünki yukarı yönelir. Alt yüz daha derinde olduğu için iki eş alana uygulanan kuvvetlerden yukarı yönlü olan daha büyüktür. Bu iki kuvvetin farkı kaldırmadır. Açık kaptaki ortak yüzey basıncını bu hesapta iki taraftan da çıkarıyoruz.",
    "Çizimde blok 15 cm yüksekliğinde, yatay yüz alanı 0,02 m² ve hacmi 3 L. Sabit 800 kg/m³ yoğunlukta, tamamen batık ve her yüzü sıvıyla temas ederken bloğu aşağı indir. İki yüzün de basıncı artar. Derinlik farkı ve kaldırma aynı kalır.",
  ],
  table: {
    layout: "table",
    headers: ["Üst yüz derinliği", "Üstten aşağı", "Alttan yukarı", "Net kaldırma"],
    rows: [["10 cm", "16 N", "40 N", "24 N"], ["50 cm", "80 N", "104 N", "24 N"]],
  },
};

export const submergedBlockExample: WorkedExample = {
  title: "Üst yüz 50 cm derindeyken blok ne kadar kaldırılır?",
  prompt: "Bir blok, 800 kg/m³ yoğunluğundaki durgun sıvıda tamamen batık. Üst yüz 50 cm, alt yüz 65 cm derinde. İki yüzün de alanı 0,02 m² ve g = 10 m/s². Sıvının net kaldırma kuvvetini bul.",
  strategy: "Önce iki derinlikteki sıvı basıncını bul. Her basıncı kendi yüz alanıyla çarpıp zıt yönlü iki kuvvetin farkını al.",
  steps: [
    { label: "Basınçlar", expression: "800 × 10 × 0,50 = 4000 Pa · 800 × 10 × 0,65 = 5200 Pa", explanation: "Derinliği sıvının serbest yüzeyinden başlayarak metre cinsinden ölç." },
    { label: "Yüzey kuvvetleri", expression: "4000 × 0,02 = 80 N aşağı · 5200 × 0,02 = 104 N yukarı", explanation: "Yan yüzlerde aynı derinlikteki kuvvet çiftleri birbirini dengeler." },
    { label: "Kaldırma", expression: "104 − 80 = 24 N yukarı", explanation: "Büyük kuvvet yukarı yönlü. Eş yatay alanlarda 1200 Pa basınç farkı 24 N kaldırma oluşturur.", figureTitle: submergedBlockExampleTitle },
  ],
  answer: "24 N yukarı.",
  check: "Yer değiştiren sıvı 0,02 × 0,15 = 0,003 m³. 800 × 10 × 0,003 = 24 N sonucu aynı.",
  pitfall: "80 ve 104 N’u toplama. Üst ve alt yüz kuvvetleri birbirine ters yönlüdür.",
};
