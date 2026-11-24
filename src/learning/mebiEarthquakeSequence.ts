import type { GuideSection, WorkedExample } from "./guides/types";

export const earthquakeSequenceTitle = "İlk kayıt, ana deprem ve artçı";
export const firstRecordTitle = "Dizide ilk kayıt";
export const afterMainTitle = "Büyük olaydan sonraki zaman çizgisi";
const sequence = [
  { hour: 0, magnitude: 4.3 },
  { hour: 2, magnitude: 5.8 },
  { hour: 8, magnitude: 4.4 },
] as const;

export function visibleEarthquakes(stage: number) {
  return sequence.slice(0, stage + 1).map((event, index) => ({
    ...event,
    label: stage === 0 ? "İlk kayıt" : index === 0 ? "Öncü" : index === 1 ? "Ana deprem" : "Artçı",
  }));
}

export const earthquakeSequenceSection: GuideSection = {
  title: earthquakeSequenceTitle,
  figureTitle: earthquakeSequenceTitle,
  paragraphs: [
    "Yakın zamanlarda aynı bölgede birden fazla deprem kaydedilebilir. Dizinin en büyük depremine ana deprem denir. Önceki küçük depremler öncü, ana depremden sonra aynı bölgede olan daha küçük depremler artçı olarak adlandırılabilir.",
    "İlk sarsıntı olduğunda daha büyük bir depremin gelip gelmeyeceği bilinmez. Bir olaya öncü denebilmesi için aynı bölgede daha büyük olayın sonradan kaydedilmesi gerekir.",
    "Zaman çizgisinde önce tek kayıt, sonra daha büyük olay, ardından küçük bir olay var. İkinci aşamada ilk kaydın adı değişiyor. Çizim örnek bir diziyi anlatıyor. Gerçek bir depremin saatini veya büyüklüğünü bu diziden çıkaramayız.",
  ],
};

export const earthquakeSequenceExample: WorkedExample = {
  title: "İlk sarsıntıya ne zaman öncü denir?",
  prompt: "Bir bölgede saat 0’da M 4,3, saat 2’de M 5,8 ve saat 8’de M 4,4 kaydedildi. Hangi kaydın adı yeni olaydan sonra değişir?",
  strategy: "Zaman sırasını ve en büyük olayın yerini ayır.",
  steps: [
    { label: "İlk kaydı tek başına oku", explanation: "Saat 0’daki kayıt tek başına gelecekteki bir büyük olayı göstermez.", figureTitle: firstRecordTitle },
    { label: "Dizideki en büyük olayı bul", explanation: "Saat 2’deki M 5,8 dizinin en büyüğü. Önceki kayıt bu bilgiyle öncü olur. Saat 8’deki daha küçük olay artçı.", figureTitle: afterMainTitle },
  ],
  answer: "Saat 0’daki M 4,3, daha büyük depremin ardından öncü olarak adlandırılır.",
  check: "Öncü ve artçı sözcükleri ana depremin öncesini ve sonrasını gösterir.",
  pitfall: "Her küçük depremin ardından mutlaka büyük deprem olacağını düşünme.",
};
