import type { WorkedExample } from "./guides/types";

export const roughSurfaceTitle = "Düzgün ve dağınık yansıma aynı yasaya uyar";
export const commonNormalTitle = "Üç noktada aynı normal";
export const tiltedNormalsTitle = "Üç noktada farklı normal";

export const roughSurfaceExample: WorkedExample = {
  title: "Üç ışının dönüş yönünü karşılaştır",
  prompt: "Üç paralel ışın yatay bir yüzeye geliyor. Yüzeyde üç küçük bölüm farklı eğimlere çevrilince yansıyan ışınlar hangi yönlere gider?",
  strategy: "Her temas noktasının kendi normalini çiz. O noktada iki açıyı aynı normalden ölç.",
  steps: [
    { label: "Düz yüzey", explanation: "Üç normal paralel olduğu için her gelme 35° ve her dönüş 35°. Yansıyan ışınlar paralel kalır.", figureTitle: commonNormalTitle },
    { label: "Farklı eğimler", explanation: "Dönüşte üç ayrı yön oluşur. Her noktada gelen ile dönen ışın kendi normaline eşit açı yapar.", figureTitle: tiltedNormalsTitle },
  ],
  answer: "Düz yüzeyde yönler aynı. Küçük yüzey bölümleri farklı eğimdeyse yansımalar farklı yönlere yayılabilir.",
  check: "Üç gelen ok paralel kalır. Dönüş yönünü değiştiren, yüzeyin temas noktasındaki normalidir.",
  pitfall: "Pürüzlü yüzeyde üç ışına tek bir ortak normal çizme.",
};
