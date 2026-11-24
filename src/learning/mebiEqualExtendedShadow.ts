import type { GuideSection, WorkedExample } from "./guides/types";

export const equalExtendedShadowTitle = "Eş büyüklükte kaynak ve kürenin gölgesi";
export const equalShadowNearTitle = "Eş kürelerde yakın perde";
export const equalShadowFarTitle = "Eş kürelerde uzak perde";

const radiusCm = 1.5;
const centreGapCm = 6;

export function equalExtendedShadowAt(screenCm: number) {
  const innerTangentSlope = 2 * radiusCm / Math.sqrt(centreGapCm ** 2 - (2 * radiusCm) ** 2);
  const intercept = -radiusCm * Math.hypot(1, innerTangentSlope);
  const sourceTouchX = -intercept * innerTangentSlope / (1 + innerTangentSlope ** 2);
  const sourceTouchY = innerTangentSlope * sourceTouchX + intercept;
  const outerRadiusCm = innerTangentSlope * screenCm + intercept;
  return {
    radiusCm, centreGapCm, screenCm, sourceTouchX, sourceTouchY, outerRadiusCm,
    umbraDiameterCm: 2 * radiusCm,
    penumbraAreaCm2: Math.PI * (outerRadiusCm ** 2 - radiusCm ** 2),
  };
}

export const equalExtendedShadowSection: GuideSection = {
  title: equalExtendedShadowTitle,
  figureTitle: equalExtendedShadowTitle,
  paragraphs: [
    "Küresel ışık kaynağı ile opak küre aynı yarıçapta. Merkezleri ortak eksende. Yan kesitte kaynak ve engelin üst tarafına değen ışın yatay ilerler. Aynı durum alt kenarda da görülür.",
    "Birbirine paralel iki sınırın arasında kaynağın hiçbir kısmı görünmez. Tam gölge, perde uzaklaşsa da bu ideal düzende aynı çapta kalır.",
    "Kaynağın karşı yanından engelin öteki kenarına değen sınır ışınları ise perdeye doğru açılır. Bu yüzden kaynağın yalnız bir kısmını gören yarı gölge halkası uzak perdede genişler.",
  ],
};

export const equalExtendedShadowExample: WorkedExample = {
  title: "Uzak perdede tam gölge yine aynı mı?",
  prompt: "Yarıçapı 1,5 cm olan küresel kaynak ve aynı yarıçapta opak küre, merkezleri 6 cm arayla tek eksende duruyor. Kaynağın merkezinden 8 cm ve 12 cm uzaktaki iki perdeyi karşılaştır.",
  strategy: "Tam gölgeye giden paralel sınırlarla yarı gölgenin dışına giden eğik sınırları ayrı izle.",
  steps: [
    { label: "8 cm perde", explanation: "Üst ve alt yatay sınırlar, ekranın ortasından 1,5 cm yukarı ve aşağı geçer. Tam gölge çapı 3 cm.", figureTitle: equalShadowNearTitle },
    { label: "12 cm perde", explanation: "Paralel sınırlar arasındaki uzaklık yine 3 cm. Dıştaki eğik sınırlar ise birbirinden uzaklaşır ve yarı gölge halkası genişler.", figureTitle: equalShadowFarTitle },
  ],
  answer: "Tam gölge çapı iki perdede 3 cm. 12 cm uzaktaki perdede yarı gölge halkası daha geniş.",
  check: "Çapın sabit kalması için bu çizimde cisim ve ışık kaynağının boyları eşit, eksenleri ortak.",
  pitfall: "Işık kaynağını tek nokta olarak alırsan sonlu kaynağın yarı gölgesini kaybedersin.",
};
