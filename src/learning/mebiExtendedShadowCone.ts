import type { GuideSection, WorkedExample } from "./guides/types";
import { blockerAxisCm, blockerRadiusCm, shadowApexCm, sourceRadiusCm } from "./mebiExtendedSourceObservers";

export const extendedConeTitle = "Tam gölge konisinin ucu";
export const beforeApexTitle = "Koninin içinden geçen perde";
export const apexScreenTitle = "Koninin ucundaki perde";
export const afterApexTitle = "Koninin arkasındaki perde";
export const coneScreensCm = [10, shadowApexCm, 14] as const;

function slope(radiusDifferenceCm: number) {
  return radiusDifferenceCm / Math.sqrt(blockerAxisCm ** 2 - radiusDifferenceCm ** 2);
}

export function extendedShadowConeAt(screenCm: number) {
  const converging = slope(sourceRadiusCm - blockerRadiusCm);
  const diverging = slope(sourceRadiusCm + blockerRadiusCm);
  const signedUmbraCm = converging * (shadowApexCm - screenCm);
  const penumbraLimitCm = diverging * screenCm - sourceRadiusCm * Math.hypot(1, diverging);
  return {
    screenCm, converging, diverging, signedUmbraCm, penumbraLimitCm,
    umbraRadiusCm: Math.max(0, signedUmbraCm),
    annularRegionRadiusCm: Math.max(0, -signedUmbraCm),
  };
}

export const extendedConeSection: GuideSection = {
  title: extendedConeTitle,
  figureTitle: extendedConeTitle,
  paragraphs: [
    "Işık kaynağının küresi, önündeki opak küreden büyük. Üstten ve alttan iki dış ortak teğet, opak kürenin arkasında birbirine yaklaşır. Bu ışınlar ortak eksende birleşince tam gölge konisinin ucu oluşur.",
    "Uca gelmeden önce perdede tam gölgeli bir iç bölge vardır. Uca tam konan perdede iki sınır tek noktada birleşir ve tam gölgenin alanı sıfıra iner.",
    "Daha ötedeki perdede tam gölge bölgesi kalmaz. Eksen üzerindeki bir gözlemci daha küçük opak diskin çevresinden ışık kaynağının kenarını halka biçiminde görür. Eksen dışındaki gözlemci kaynağın başka bir kısmını görebilir.",
  ],
};

export const extendedConeExample: WorkedExample = {
  title: "Üç perde aynı tam gölgeyi gösterir mi?",
  prompt: "3 cm yarıçaplı kaynak ile 1,5 cm yarıçaplı opak kürenin merkezleri 6 cm aralıklı. Perde kaynağın merkezinden 10, 12 ve 14 cm uzaktayken iç bölümde ne görülür?",
  strategy: "Perde ile birbirine yaklaşan iki sınırın kesişme noktasını kıyasla.",
  steps: [
    { label: "10 cm perde", explanation: "Perde koninin ucundan önce. İki sınır arasındaki iç bölgede tam gölge var.", figureTitle: beforeApexTitle },
    { label: "12 cm perde", explanation: "İki sınır eksende birleşiyor. Tam gölgenin alanı sıfır, sınır tek noktada.", figureTitle: apexScreenTitle },
    { label: "14 cm perde", explanation: "Koni ucu artık perdenin önünde. Eksen yakınında ışık kaynağının çevresi kısmen görünür.", figureTitle: afterApexTitle },
  ],
  answer: "İç tam gölge 10 cm’de var, 12 cm’de noktaya iniyor, 14 cm’de kalmıyor.",
  check: "Daha uzak perde tümüyle aydınlanmaz. Opak cisim kaynağın bir kısmını örtmeye devam eder.",
  pitfall: "Koninin ucundan sonra yeniden genişleyen kesiti tam gölge diye adlandırma.",
};
