import type { GuideSection, WorkedExample } from "./guides/types";

export const airBuoyancyTitle = "Hava iki balona da kaldırma uygular";
export const airBuoyancyExampleTitle = "K ve L’nin net kuvvetlerini karşılaştır";
export const balloonVolumeLitres = 10;
export const airDensity = 1.2;
export const balloonKGrams = 20;
export const balloonLGrams = 8;
const gravity = 10;

export function balloonForce(massGrams: number) {
  const displacedGrams = airDensity * balloonVolumeLitres;
  return {
    density: massGrams / balloonVolumeLitres,
    buoyancy: displacedGrams * gravity / 1000,
    weight: massGrams * gravity / 1000,
    net: (displacedGrams - massGrams) * gravity / 1000,
  };
}

export const airBuoyancySection: GuideSection = {
  title: airBuoyancyTitle,
  figureTitle: airBuoyancyTitle,
  paragraphs: [
    "Hava da yer değiştiren hacme kaldırma kuvveti uygular. Balonun ortalama yoğunluğunu hesaplarken içindeki gazı ve balonun zarını birlikte tart. Durgun havada bırakıldığı ilk anda hareket yönünü ağırlık ile kaldırmanın farkı belirler.",
    "K ve L’nin hacimleri 10 L. İkisi de 1,2 kg/m³ yoğunlukta aynı havada 12 g havanın yerini alıyor. Bu yüzden ikisine de 0,12 N kaldırma etki ediyor. K 20 g olduğunda ilk net kuvvet aşağı. L’nin kütlesi 8 g iken ilk net kuvvet yukarı.",
    "L’nin kütlesini değiştir ve 12 g sınırını bul. Model ilk anda hacmi sabit ve havayı durgun alır. Sonraki yüksekliklerde hava yoğunluğu, balon hacmi ve direnç değişebilir.",
  ],
  table: {
    layout: "table",
    headers: ["10 L balon", "Ortalama yoğunluk", "Kaldırma ve ağırlık", "İlk hareket"],
    rows: [["8 g", "0,8 kg/m³", "0,12 N > 0,08 N", "Yukarı"], ["12 g", "1,2 kg/m³", "0,12 N = 0,12 N", "Yerinde kalır"], ["20 g", "2 kg/m³", "0,12 N < 0,20 N", "Aşağı"]],
  },
};

export const airBuoyancyExample: WorkedExample = {
  title: "Aynı hacimli iki balon neden zıt yönlere gider?",
  prompt: "K balonunun zar ve gaz dahil kütlesi 20 g, L’ninki 8 g. Her birinin hacmi 10 L. Durgun havanın yoğunluğu 1,2 kg/m³, g = 10 m/s². İlk net kuvvetleri ve yönlerini bul.",
  strategy: "Ortak hava hacminden kaldırmayı, iki ayrı kütleden ağırlıkları bul. Yukarı yönü pozitif seç.",
  steps: [
    { label: "Ortak kaldırma", expression: "1,2 × 10 × 0,010 = 0,12 N yukarı", explanation: "10 L = 0,010 m³. İki balon eşit hacimde havanın yerini alıyor." },
    { label: "Ağırlıklar", expression: "Gₖ = 0,020 × 10 = 0,20 N · Gₗ = 0,008 × 10 = 0,08 N", explanation: "Kütleleri kilogram cinsinden kullan. Her iki ağırlık da aşağı yönlü." },
    { label: "Net kuvvetler", expression: "K: 0,12 − 0,20 = −0,08 N · L: 0,12 − 0,08 = +0,04 N", explanation: "K’nın net kuvveti aşağı, L’nin net kuvveti yukarı.", figureTitle: airBuoyancyExampleTitle },
  ],
  answer: "K için 0,08 N aşağı, L için 0,04 N yukarı.",
  check: "K ve L’nin yoğunlukları 2 ve 0,8 kg/m³. Havanın 1,2 kg/m³ yoğunluğu bu değerlerin arasında.",
  pitfall: "K aşağı gidiyor diye kaldırması yok sanma. Kaldırmadan daha büyük bir ağırlık aşağı etki ediyor.",
};
