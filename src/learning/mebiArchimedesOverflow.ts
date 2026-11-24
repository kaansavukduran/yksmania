import type { GuideSection, WorkedExample } from "./guides/types";

export const overflowTitle = "Taşırma kabında başlangıç seviyesi önemlidir";
export const overflowExampleTitle = "Ağır blokta taşan su ve desteğin payı";
export const overflowBlockLitres = 2;
const waterDensity = 1000;
const gravity = 10;
const waterWeightPerLitre = waterDensity * gravity / 1000;

export const overflowCases = [
  { label: "Yüzer", density: 600 },
  { label: "Askıda kalır", density: 1000 },
  { label: "Tabana iner", density: 1250 },
] as const;

export function overflowBalance(blockDensity: number) {
  const weight = blockDensity * overflowBlockLitres * gravity / 1000;
  const displacedLitres = Math.min(overflowBlockLitres, weight / waterWeightPerLitre);
  const buoyancy = displacedLitres * waterWeightPerLitre;
  return { displacedLitres, buoyancy, weight, support: weight - buoyancy };
}

export const overflowSection: GuideSection = {
  title: overflowTitle,
  figureTitle: overflowTitle,
  paragraphs: [
    "Su başlangıçta taşma oluğuna kadar doluysa, bırakılan cismin su içinde kalan kısmı kadar su yan kaba gider. Taşan suyu tartarsan ağırlığı, cismin gördüğü kaldırma kuvvetine eşit çıkar. Taşma düzeyinin altında boşluk varsa önce bu boşluk dolar.",
    "Serbest yüzen veya su içinde askıda dengede duran cismi yalnız ağırlık ve kaldırma etkiler. Bu durumda cismin ağırlığı da taşan suyun ağırlığına eşittir. Daha yoğun cisim tabana indiğinde destek, ağırlığın kalan kısmını taşır. Çizimde suyun alt yüze ulaşabildiği bir destek var.",
    "Üç cisim de 2 L. Yoğunluk değişince suda kalan kısmı, yan kaptaki su miktarını ve kuvvet oklarını karşılaştır.",
  ],
  table: {
    layout: "table",
    headers: ["Denge", "Taşan su", "Kaldırma", "Cisim ağırlığı", "Destek"],
    rows: overflowCases.map(({ label, density }) => {
      const state = overflowBalance(density);
      return [label, `${state.displacedLitres.toLocaleString("tr-TR")} L`, `${state.buoyancy} N`, `${state.weight} N`, `${state.support} N`];
    }),
  },
};

export const overflowExample: WorkedExample = {
  title: "25 N ağırlığındaki blok ne kadar su taşırır?",
  prompt: "Oluk seviyesine kadar su dolu kaba 2 L’lik, 25 N ağırlığında bir blok bırakılıyor. Blok bütünüyle suya batıp suyun alt yüze ulaşabildiği desteğe oturuyor. Su 1000 kg/m³ ve g = 10 m/s². Taşan suyun hacmi, kaldırma ve destek kuvveti kaçtır?",
  strategy: "Taşan suyun hacmini tam batık hacimden bul. Suyun ağırlığı kaldırmayı, kuvvet dengesi de desteğin payını verir.",
  steps: [
    { label: "Taşan hacim", expression: "Vₜₐşₐₙ = Vᵦ = 2 L = 0,002 m³", explanation: "Kap başlangıçta taşma düzeyinde ve cismin bütünü su altında." },
    { label: "Kaldırma", expression: "1000 × 10 × 0,002 = 20 N yukarı", explanation: "Bu değer taşan suyun ağırlığına eşit." },
    { label: "Destek", expression: "N = 25 − 20 = 5 N yukarı", explanation: "Cisim dengede. Su ve destek birlikte 25 N ağırlığı taşıyor.", figureTitle: overflowExampleTitle },
  ],
  answer: "2 L su taşar. Kaldırma 20 N, destek 5 N ve ikisi de yukarı yönlüdür.",
  check: "20 + 5 = 25 N; taşan suyun hacmi de cismin hacmini aşmıyor.",
  pitfall: "Tabandan destek alan cismin kaldırmasını 25 N kabul etme. Dengede ağırlığın bir bölümünü destek taşır.",
};
