import type { GuideSection, WorkedExample } from "./guides/types";

export const mirrorBodyWallTitle = "Aynada bedenin ve duvarın görünen kısmı";
export const mirrorBodyTitle = "Bedenin görünen aralığı değişmiyor";
export const mirrorWallTitle = "Sabit duvarın görünen aralığı genişliyor";

export const mirrorViewDimensions = { eye: 1.6, person: 1.7, wall: 4, lower: 1.3, upper: 1.55 };

export function mirrorViewIntervals(distance: number) {
  const { eye, wall, lower, upper } = mirrorViewDimensions;
  const body = [2 * lower - eye, 2 * upper - eye] as const;
  const wallRange = [lower + (wall / distance) * (lower - eye), upper + (wall / distance) * (upper - eye)] as const;
  return { body, wall: wallRange };
}

export const mirrorBodyWallSection: GuideSection = {
  title: mirrorBodyWallTitle,
  figureTitle: mirrorBodyWallTitle,
  paragraphs: [
    "Göz hizan, aynanın yerden yüksekliği ve boyu sabitken aynaya yaklaşabilirsin. Bedenin de gözünle birlikte hareket eder. Arkandaki duvar ise yerinde kalır.",
    "Beden için göz ve gördüğün nokta aynaya aynı dik uzaklıktadır. Işının aynaya değdiği yükseklik, göz ile o noktanın yüksekliğinin tam ortasıdır. Aynanın uçları değişmedikçe bedeninde gördüğün alt ve üst yükseklik değişmez.",
    "Sabit duvar için göz ile duvar aynaya farklı uzaklıktadır. Aynaya yaklaşınca iki sınır ışını duvar düzlemine kadar daha çok açılır. Yeterince yüksek bir duvarda daha uzun bir bölüm görünür.",
    "Çizimde ayna duvardan 4 m ileride. Göz yüksekliği 1,6 m, aynanın alt ucu 1,30 m, üst ucu 1,55 m. Göz hizası sabit, ayna ve duvar düşey, ışık yolu açık.",
  ],
};

export const mirrorBodyWallExample: WorkedExample = {
  title: "Aynaya yaklaşınca beden ve duvarı karşılaştır",
  prompt: "Göz 1,6 m yükseklikte, ayna 1,30–1,55 m arasında, duvar aynaya 4 m uzakta. Öğrenci aynaya 2 m uzaklıktan 1 m’ye geliyor. Görünen aralıklar ne olur?",
  strategy: "Bedenin gözle birlikte ilerlediğini, duvarın yerinde kaldığını ayrı iki çizimde izle.",
  steps: [
    { label: "Beden için orta yüksekliği kullan", explanation: "İki sınır için yükseklikleri ikiyle çarpıp 1,6 m göz yüksekliğini çıkar. Göz 2 m’deyken de 1 m’deyken de beden üzerinde 1,00–1,50 m aralığı görünür.", figureTitle: mirrorBodyTitle },
    { label: "Sabit duvar için benzer üçgenleri kullan", explanation: "Göz 2 m’deyken duvarda 0,70–1,45 m, 1 m’deyken 0,10–1,35 m aralığı görünür. Görünen duvar uzunluğu 0,75 m’den 1,25 m’ye çıkar.", figureTitle: mirrorWallTitle },
  ],
  answer: "Beden üzerinde 0,50 m sabit kalır. Duvarda ise görülen bölüm 0,75 m’den 1,25 m’ye çıkar.",
  check: "Göz yüksekliği ve aynanın iki ucu iki durumda aynı. Sonuçları çizimde öne çıkarılan aralıkların boyuyla kontrol et.",
  pitfall: "Aynaya yaklaşırken duvarı da gözle birlikte taşıma. Duvar yerinde kalır.",
};
