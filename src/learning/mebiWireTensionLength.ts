import type { GuideSection, WorkedExample } from "./guides/types";

export const tensionComparisonTitle = "Gerilimi artır, telin boyunu koru";
export const lengthComparisonTitle = "Teli kısalt, gerilimi koru";
export const tensionExampleFigure = "Dört G ile frekans iki katına çıkar";
export const lengthExampleFigure = "Yarı uzunlukta frekans iki katına çıkar";
export const tensionMultiples = { min: 1, max: 4, step: 1, initial: 2 };
export const vibratingLength = { min: 0.375, max: 0.75, step: 0.125, initial: 0.375 };

export const tensionComparisonSection: GuideSection = {
  title: tensionComparisonTitle,
  figureTitle: tensionComparisonTitle,
  paragraphs: [
    "K ve M tellerinin boyu, maddesi ve çapı eşit. K telinde bir G ağırlığı, M telinde başlangıçta iki G var. Gerilim artınca tel üzerindeki dalga daha hızlı ilerler. Boyu aynı tel daha sık titreşir.",
    "Frekans gerilimin kareköküyle artar. M telindeki ağırlığı iki G yapınca frekanslar 1 ve √2 oranındadır. Dört G yapınca M iki kat frekansta titreşir. Gitarın akort burgusu teli gererek veya gevşeterek bu frekansı ayarlar.",
  ],
};

export const lengthComparisonSection: GuideSection = {
  title: lengthComparisonTitle,
  figureTitle: lengthComparisonTitle,
  paragraphs: [
    "Aynı telin iki eş gerilimli düzeninde yalnız titreşen uzunluğu değiştir. Kısa bölümde temel dalganın bir uca varıp geri dönmesi daha kısa sürer. Bu yüzden aynı zaman aralığında daha çok titreşim olur.",
    "Gerilim ve birim uzunluğun kütlesi sabitse temel frekans titreşen uzunluğa ters orantılıdır. Uzunluğu yarıya indirdiğinde frekans iki katına çıkar.",
  ],
};

export const tensionLengthExample: WorkedExample = {
  title: "Bir oktav için gerilimi ve uzunluğu ayrı değiştir",
  prompt: "Aynı telin temel frekansını iki katına çıkarmak istiyorsun. İlk denemede uzunluk sabit, ikinci denemede gerilim sabit. Her denemede neyi hangi oranda değiştirirsin?",
  strategy: "Her denemede sabit olan niceliği yaz. Gerilimde karekökü, uzunlukta ters oranı kullan.",
  steps: [
    { label: "Boy sabitken gerilimi belirle", explanation: "Frekans iki kat olacaksa gerilim oranının karekökü iki olmalı.", expression: "√(T₂/T₁) = 2, T₂/T₁ = 4", figureTitle: tensionExampleFigure },
    { label: "Gerilim sabitken titreşen boyu belirle", explanation: "Frekans boyla ters orantılı. Frekansı iki katına çıkarmak için boyu yarıya indir.", expression: "L₁/L₂ = 2, L₂ = L₁/2", figureTitle: lengthExampleFigure },
  ],
  answer: "İlk denemede gerilim dört katına çıkar. İkinci denemede titreşen uzunluk yarıya iner.",
  check: "İki çözüm çiziminde de aynı sürede karşılaştırılan telin salınım sayısı iki kat.",
  pitfall: "Frekansla gerilim arasında doğrusal oran kurma.",
};
