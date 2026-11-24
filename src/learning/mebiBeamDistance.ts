import type { GuideSection, WorkedExample } from "./guides/types";

export const beamDistanceTitle = "Uzaklık noktasal ve paralel ışığı nasıl etkiler?";
export const pointBeamTitle = "Açılan noktasal ışınlar";
export const parallelBeamTitle = "Genişliği sabit paralel demet";
export const sampleDistancesM = [2, 4] as const;
export const sampleSourceCd = 80;
export const parallelLux = 20;

export function beamIlluminance(parallel: boolean, distanceM: number) {
  return parallel ? parallelLux : sampleSourceCd / distanceM ** 2;
}

export const beamDistanceSection: GuideSection = {
  title: beamDistanceTitle,
  figureTitle: beamDistanceTitle,
  paragraphs: [
    "Nokta kaynağından çıkan ışınlar uzaklaştıkça daha geniş alana dağılır. Işına dik iki küçük alıcıyı kaynaktan ayrı uzaklıklara koyarsan, uzak alıcı aynı alan başına daha az ışık alır.",
    "İdeal paralel demetin genişliği sabit, ortam kayıpsız. Bu durumda ayrı ayrı ölçülen 2 m ve 4 m alıcıları aynı aydınlanmayı gösterir. Çizimdeki iki alıcı, demeti kesen eş zamanlı engeller yerine ayrı ölçüm yerlerini temsil eder.",
    "Gerçek bir demetin yayılması ve soğurulması sonucu değiştirebilir. Önce ışınların açılarak yayılıp yayılmadığına, sonra ölçümün uzaklığına bak.",
  ],
};

export const beamDistanceExample: WorkedExample = {
  title: "Aynı başlangıç, iki uzaklık davranışı",
  prompt: "İdeal noktasal ışık kaynağının şiddeti 80 cd. İdeal kayıpsız paralel demet aynı 2 m ölçüm düzleminde 20 lx veriyor. Küçük dik alıcı 4 m düzlemine giderse iki durumda da kaç lüks okur?",
  strategy: "Noktasal dağılımda uzaklıkla alan büyür. Paralel demette aynı demet kesiti sürer.",
  steps: [
    { label: "Noktasal kaynak", explanation: "Uzaklık 2 kat. Aydınlanma dörtte birine iner, 80 / 4² = 5 lx.", figureTitle: pointBeamTitle },
    { label: "Paralel demet", explanation: "Demet genişliği ve ışık kaybı değişmiyor. Yeni konumda 20 lx.", figureTitle: parallelBeamTitle },
  ],
  answer: "Noktasal kaynakta 5 lx, ideal paralel demette 20 lx.",
  check: "İki ilk ölçüm 20 lx. Yalnız açılarak yayılan modelde ikinci ölçüm düşer.",
  pitfall: "Ters kare hesabından önce kaynak türünü ayırt et.",
};
