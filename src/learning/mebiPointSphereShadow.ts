import type { GuideSection, WorkedExample } from "./guides/types";

export const sphereShadowTitle = "Kürenin tam gölgesinin sınırı";
export const nearScreenTitle = "Yakın perdedeki gölge çapı";
export const farScreenTitle = "Uzak perdedeki gölge çapı";
export const sphereRadiusCm = 3;
export const sourceToCentreCm = 5;

export function sphereShadowAt(screenCm: number) {
  const tangentLength = Math.sqrt(sourceToCentreCm ** 2 - sphereRadiusCm ** 2);
  const tangentX = tangentLength ** 2 / sourceToCentreCm;
  const tangentY = sphereRadiusCm * tangentLength / sourceToCentreCm;
  const shadowRadius = screenCm * sphereRadiusCm / tangentLength;
  return { tangentX, tangentY, tangentLength, shadowRadius, diameter: 2 * shadowRadius };
}

export const sphereShadowSection: GuideSection = {
  title: sphereShadowTitle,
  figureTitle: sphereShadowTitle,
  paragraphs: [
    "Noktasal kaynak, opak küre ve düz perde aynı eksende olsun. Kesitte küre bir daire görünür. Kaynağın küreye yalnız değip geçen iki sınır ışını, tam gölgenin perde üstündeki kenarlarını belirler.",
    "Teğet doğrultusundaki ışın, değdiği noktada kürenin yarıçapına diktir. Kaynak, küre merkezi ve değme noktası bu nedenle bir dik üçgen oluşturur. Perdeyi aynı eksen boyunca uzaklaştırınca aynı sınır ışınları perdede birbirinden daha uzakta kesilir.",
    "Bu tek noktasal kaynak modelinde, gölgenin içindeki noktalara doğrudan ışık ulaşmaz. Çevre ışığı ve kırınım hesaba katılmaz.",
  ],
};

export const sphereShadowExample: WorkedExample = {
  title: "Perdeyi uzaklaştırınca kürenin gölgesi",
  prompt: "Noktasal kaynak, yarıçapı 3 cm olan opak bir kürenin merkezinden 5 cm uzakta. Perde kaynaktan 10 cm ve 14 cm uzakta olduğunda gölge çapı kaç santimetredir?",
  strategy: "Teğet ışının yönünü bir kez bul. Aynı sınır ışınlarını birbirine paralel iki perdeye kadar uzat.",
  steps: [
    { label: "10 cm perde", explanation: "Teğet parçası √(5² − 3²) = 4 cm. Sınır ışını ile eksenin oluşturduğu açının tanjantı 3/4. Gölge yarıçapı 10 × 3/4 = 7,5 cm ve çapı 15 cm.", figureTitle: nearScreenTitle },
    { label: "14 cm perde", explanation: "Işınların yönü aynı. Gölge yarıçapı 14 × 3/4 = 10,5 cm ve çapı 21 cm.", figureTitle: farScreenTitle },
  ],
  answer: "Kaynağa 10 cm uzak perdede 15 cm. Kaynağa 14 cm uzak perdede 21 cm.",
  check: "14/10 = 21/15. Eksen boyunca perde uzaklığı 1,4 kat olduğunda çap da 1,4 kat olur.",
  pitfall: "Teğet ışını kürenin en üst noktasına çizmek yerine yarıçapın ışına dik olduğu temas noktasını bul.",
};
