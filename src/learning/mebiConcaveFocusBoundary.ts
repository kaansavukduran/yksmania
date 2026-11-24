import type { GuideSection, WorkedExample } from "./guides/types";

export const concaveBoundaryTitle = "Odak sınırında gerçek ve sanal görüntü";
export const concaveBoundarySteps = [
  "F ile M arasındaki cisim",
  "F noktasındaki cisim",
  "T ile F arasındaki cisim",
] as const;

export const concaveBoundarySection: GuideSection = {
  title: concaveBoundaryTitle,
  figureTitle: concaveBoundaryTitle,
  paragraphs: [
    "T aynanın tepesi, F odağı, M eğrilik merkezi. Odak uzaklığı 2 cm olan örnekte M, aynadan 4 cm uzakta. Cisim F ile M arasına geldiğinde iki yansıyan kol aynanın önünde M’nin dışında buluşur. Görüntü ters ve büyük.",
    "Cisim tam F’deyken eksene paralel gelen ışın F’den geçerek döner. Tepeye gelen ışın da aynı yöne yansır. Çıkan kollar paraleldir. Kesişen iki kol ve sonlu uzaklıkta bir görüntü oku oluşmaz.",
    "Cisim T ile F arasındaysa yansıyan kollar ön tarafta ayrılır. Arkaya çizilen kesik uzantılar birleşir. Bu kesişim sanal, düz ve büyük görüntünün yeridir. Arkada gerçek ışık toplanmadığı için o konuma perde koyarak görüntüyü yakalayamazsın.",
    "Cisim dış bölgede F’ye yaklaştıkça gerçek görüntü uzaklaşır ve büyür. İç bölgede cisim F’den T’ye ilerlerken sanal görüntü de aynaya yaklaşır ve cisim boyuna yaklaşır. Büyüme yönünü söylemeden önce cismin odağın hangi tarafında olduğunu kontrol et.",
  ],
  table: {
    headers: ["Cisim uzaklığı", "Görüntünün yeri", "Yön ve boy"],
    rows: [
      ["6 cm, M’nin dışında", "Önde 3 cm, F ile M arasında", "Ters, yarı boy"],
      ["4 cm, M’de", "Önde 4 cm, M’de", "Ters, eş boy"],
      ["3 cm, F ile M arasında", "Önde 6 cm, M’nin dışında", "Ters, iki kat"],
      ["2 cm, F’de", "Sonlu kesişim yok", "Kollar paralel"],
      ["1 cm, T ile F arasında", "Arkada 2 cm, sanal", "Düz, iki kat"],
    ],
    layout: "table",
  },
};

export const concaveBoundaryExample: WorkedExample = {
  title: "Aynı cismi odağın iki yanına al",
  prompt: "Çukur aynanın odağı 2 cm. Boyu 1 cm olan cismi 3 cm, 2 cm ve 1 cm uzaklıklara koy. Her konumda ışınlar ve görüntü nasıl değişir?",
  strategy: "Cismin F’ye göre yerini belirle. Yansıma kollarının kendilerinin mi, uzantılarının mı birleştiğini çizimden oku.",
  steps: [
    { label: "Cisim 3 cm uzakta", explanation: "Yansıyan kollar aynanın 6 cm önünde kesişir. Görüntü 2 cm boyunda ve ters.", expression: "v = 2 × 3 ÷ (3 − 2) = 6 cm, m = −2", figureTitle: concaveBoundarySteps[0] },
    { label: "Cisim 2 cm uzakta", explanation: "Paralel çıkan ışınlar sonlu bir noktada kesişmez. Bu sınırda v’ye bir sayı atanamaz.", expression: "u − f = 2 − 2 = 0", figureTitle: concaveBoundarySteps[1] },
    { label: "Cisim 1 cm uzakta", explanation: "Yansıyan kollar açılır. Kesik uzantılar aynanın 2 cm arkasında buluşur. Görüntü 2 cm boyunda, düz ve sanal.", expression: "v = 2 × 1 ÷ (1 − 2) = −2 cm, m = 2", figureTitle: concaveBoundarySteps[2] },
  ],
  answer: "3 cm’de önde gerçek ters, 2 cm’de sonlu görüntü yok, 1 cm’de arkada sanal düz.",
  check: "Aynanın iki tarafını v’nin işaretiyle, yönü m’nin işaretiyle denetle.",
  pitfall: "Cisim odak sınırını geçerken görüntü yönünü ve kesişimin türünü ayrı kontrol et.",
};
