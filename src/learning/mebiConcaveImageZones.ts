import type { GuideSection, WorkedExample } from "./guides/types";

export const concaveImageZonesTitle = "Çukur aynada uzaktan merkeze üç görüntü";
export const concaveImageZonesSteps = [
  "Paralel ışınların odakta birleşmesi",
  "Merkez dışından F ile M arasına",
  "Merkezde ters ve eş boylu görüntü",
] as const;

export const concaveImageZonesSection: GuideSection = {
  title: concaveImageZonesTitle,
  figureTitle: concaveImageZonesTitle,
  paragraphs: [
    "T aynanın tepesi, M kürenin merkezi, F odak noktası. Eksene yakın ışın çiziminde F, T ile M’nin ortasındadır. İki yansıyan ışın gerçekten buluşursa o kesişim perdeye düşürülebilen görüntünün bir noktasıdır.",
    "Çok uzaktaki eksenel noktanın ışınları aynaya yaklaşık paralel gelir. Yansıma kolları F’de buluşur. Çizimde gerçek görüntüyü nokta olarak görürsün. Aynı yaklaşımı geniş açılı ışınlara uyguladığında küresel sapma ortaya çıkar.",
    "Cisim M’nin dışındayken eksene paralel gelen ışını ve F’den geçerek aynaya ulaşan ışını izle. İlki F’den geçerek, ikincisi eksene paralel yansır. Yansımalar F ile M arasında eksenin altında buluşur. Cisim M’ye geldiğinde görüntü M’de kalır ve okun boyu cismin boyuna eşit olur.",
  ],
};

export const concaveImageZonesExample: WorkedExample = {
  title: "Cismi dışarıdan M’ye getir",
  prompt: "Çukur aynanın odağı 2 cm, merkezi 4 cm uzakta. Önce eksene paralel demeti, sonra 6 cm ve 4 cm uzaktaki 1 cm boyundaki cismi çiz.",
  strategy: "Aynadan önce F ve M’yi işaretle. Her cisim için en az iki yansıma kolunun kesişimini bul.",
  steps: [
    {
      label: "Paralel demeti F’de topla",
      explanation: "Uzak eksenel noktadan gelen yaklaşık paralel ışınlar aynanın 2 cm önünde bir nokta oluşturur.",
      figureTitle: concaveImageZonesSteps[0],
    },
    {
      label: "Cisim M’nin dışındayken yer ve boyu bul",
      explanation: "İki yansıma 3 cm uzakta birleşir. Görüntü aşağı bakar ve 0,5 cm boyundadır.",
      expression: "v = (2 × 6) ÷ (6 − 2) = 3 cm, m = −3 ÷ 6 = −0,5",
      figureTitle: concaveImageZonesSteps[1],
    },
    {
      label: "Cismi M’ye yerleştir",
      explanation: "İki yansıma M’de, yani 4 cm uzakta birleşir. Görüntü 1 cm boyunda ve terstir.",
      expression: "v = (2 × 4) ÷ (4 − 2) = 4 cm, m = −4 ÷ 4 = −1",
      figureTitle: concaveImageZonesSteps[2],
    },
  ],
  answer: "Paralel demet F’de toplanır. 6 cm’deki cisim F ile M arasına, 4 cm’deki cisim M’ye görüntü verir.",
  check: "İki sonlu örnekte de gerçek ışık kolları aynanın önünde birleşir.",
  pitfall: "M’de eş boylu görüntünün yönünün de aynı olduğunu varsayma.",
};
