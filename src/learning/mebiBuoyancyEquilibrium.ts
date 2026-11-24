import type { GuideSection, WorkedExample } from "./guides/types";
import { overflowBalance, overflowBlockLitres, overflowCases } from "./mebiArchimedesOverflow";

export const buoyancyEquilibriumTitle = "A, B ve C ilk anda nasıl hareket eder?";
export const buoyancyEquilibriumExampleTitle = "Bırakıldıktan sonra A’nın yüzme dengesi";

export function equilibriumState(index: number, settled: boolean) {
  const state = overflowBalance(overflowCases[index].density);
  const atFullImmersion = overflowBalance(overflowCases[1].density);
  const immersedLitres = settled ? state.displacedLitres : overflowBlockLitres;
  const buoyancy = settled ? state.buoyancy : atFullImmersion.buoyancy;
  const support = settled ? state.support : 0;
  return { immersedLitres, buoyancy, support, weight: state.weight, upwardsNetForce: buoyancy + support - state.weight };
}

export const buoyancyEquilibriumSection: GuideSection = {
  title: buoyancyEquilibriumTitle,
  figureTitle: buoyancyEquilibriumTitle,
  paragraphs: [
    "Üç cisim su içinde aynı derinlikte serbest bırakılıyor. Hepsinin hacmi 2 L, ama yoğunlukları farklı. İlk anda üçü de tam batık olduğu için su hepsine 20 N kaldırma uyguluyor. A, B ve C’nin hangi yöne hareket edeceğini bulmak için ağırlıklarını karşılaştır.",
    "A’nın ilk net kuvveti yukarı yönlü, B’nin ilk net kuvveti sıfır, C’ninki aşağı yönlü. A yüzeye çıkınca batık hacmi azalır ve kaldırması 12 N’a düşer. B bulunduğu derinlikte askıda kalabilir. C tabana ulaştığında 20 N kaldırmaya 5 N destek eklenir. Su, çizimdeki gözenekli desteğin içinden alt yüzeye ulaşır.",
    "İlk hareket ile son dengeyi iki ayrı adımda incele. Son dengede üç net kuvvet de sıfır. Bu, üç cismin aynı şekilde durduğu anlamına gelmez.",
  ],
  table: {
    layout: "table",
    headers: ["Cisim", "Yoğunluk", "İlk net kuvvet", "Dengedeki konum"],
    rows: [["A", "600 kg/m³", "8 N yukarı", "Kısmen batık, yüzeyde"], ["B", "1000 kg/m³", "0 N", "Tam batık, askıda"], ["C", "1250 kg/m³", "5 N aşağı", "Tam batık, tabanda"]],
  },
};

export const buoyancyEquilibriumExample: WorkedExample = {
  title: "A yükselirken kaldırması neden değişir?",
  prompt: "A’nın ağırlığı 12 N, hacmi 2 L. Yoğunluğu 1000 kg/m³ olan suda tamamen batık konumdan serbest bırakılıyor. g = 10 m/s². İlk net kuvveti ve yüzeydeki denge kaldırmasını bul.",
  strategy: "İlk anda tüm hacim su altında. Yüzeydeki son dengede kaldırma yalnız ağırlığı taşır.",
  steps: [
    { label: "İlk kaldırma", expression: "1000 × 10 × 0,002 = 20 N yukarı", explanation: "Cisim ilk anda tam batık, bu yüzden suyun yerini 2 L hacim alır." },
    { label: "İlk net kuvvet", expression: "20 − 12 = 8 N yukarı", explanation: "A bu net kuvvet nedeniyle yükselmeye başlar." },
    { label: "Son denge", expression: "Fₖ = 12 N; Vᵦ = 12 ÷ (1000 × 10) = 0,0012 m³", explanation: "Yüzeyde 1,2 L kısmı batık kaldığında kaldırma ağırlığı dengeler.", figureTitle: buoyancyEquilibriumExampleTitle },
  ],
  answer: "İlk net kuvvet 8 N yukarı. Son dengedeki kaldırma 12 N yukarı.",
  check: "1,2 L, 2 L’nin %60’ı. A’nın hacmi sabit, su altında kalan kısmı değişti.",
  pitfall: "İlk andaki 20 N’u yüzeydeki denge kaldırması olarak kullanma.",
};
