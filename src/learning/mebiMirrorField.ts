import type { GuideSection, WorkedExample } from "./guides/types";

export const mirrorWritingTitle = "Ambulans yazısı dikiz aynasında nasıl okunur?";
export const mirrorFieldTitle = "Düzlem aynada görüş alanını üç yolla çiz";
export const mirrorFieldMethods = ["Uçlardan yansıt", "Gözün görüntüsünü kullan", "Normalin iki yanında eş uzaklık"] as const;

const mirrorEnds = [-2, 2] as const;
const eyeHeight = 2.8;

export function mirrorFieldAt(eyeX: number) {
  const eye = [eyeX, eyeHeight] as const;
  const virtualEye = [eyeX, -eyeHeight] as const;
  const edges = mirrorEnds.map((x) => ({
    end: [x, 0] as const,
    normalAtEyeHeight: [x, eyeHeight] as const,
    boundary: [2 * x - eyeX, eyeHeight] as const,
  }));
  return { eye, virtualEye, edges };
}

export const mirrorWritingSection: GuideSection = {
  title: mirrorWritingTitle,
  figureTitle: mirrorWritingTitle,
  paragraphs: [
    "İlk fotoğrafta ambulansın kaputundaki yazıya ve aracın yanındaki yazıya bak. Kaputta AMBULANS yazısının ayna simetriği var.",
    "İkinci görünüm aynı fotoğrafın yatay yansıma modeli. Kaputtaki harfler ve sıraları bir kez daha simetriye uğrayınca AMBULANS okunur. Öndeki sürücü, düzlem dikiz aynasında bu ilişkiyi görür.",
  ],
};

export const mirrorFieldSection: GuideSection = {
  title: mirrorFieldTitle,
  figureTitle: mirrorFieldTitle,
  paragraphs: [
    "Aynadaki görüş alanı, gözün aynanın yansıtıcı yüzünden görebildiği yerlerdir. Çizimde aynanın iki ucu alanın sınırını belirler. Gölgelendirilmiş bölge, sınırların göz hizasına kadar olan bölümünü gösterir.",
    "Birinci yol, gözden aynanın uçlarına doğru tersine izlenen iki ışını normalden eş açıyla geri döndürür. Işık, gerçekte cisimden aynaya, aynadan da göze gelir.",
    "İkinci yol, gözün aynanın arkasındaki simetriğini uçlarla birleştirir. Aynanın önündeki kollar birinci yoldaki sınırlarla çakışır.",
    "Üçüncü yol, her uçta göz hizasını normalden ölçer. Gözün normalden yatay uzaklığı kadar normalin öte yanına geçip uçla yeni noktayı birleştirirsin.",
    "Cisim sınırlar içinde olsa bile ışığın cisim, ayna ve göz arasındaki yolu açık olmalı. Saydam olmayan bir engel bu yolu kapatabilir.",
  ],
};

export const mirrorFieldExample: WorkedExample = {
  title: "Aynanın iki ucundan aynı sınırları bul",
  prompt: "Aynanın uçları yatay eksende −2 ve 2, gözün yatay konumu −1. Göz hizasında görüş alanının sınırları nerede?",
  strategy: "Uçlardan çizilen sınırları göz hizasında karşılaştır. Ucun normali, göz ile karşı sınır noktası arasını iki eş parçaya böler.",
  steps: [
    { label: "İki uçtan yansıt", explanation: "Solda göz normalden 1 birim sağda, sağda göz normalden 3 birim solda kalır. İki sınır kolunu normalin karşı yanına çiz.", figureTitle: mirrorFieldMethods[0] },
    { label: "Gözün simetriğini çiz", explanation: "Aynaya eşit dik uzaklıkta sanal göz E′’yi işaretle. E′’den iki uca uzanan doğrular aynı sınırları oluşturur.", figureTitle: mirrorFieldMethods[1] },
    { label: "Eş uzaklıkları işaretle", explanation: "−2’nin bir birim solunda −3, 2’nin üç birim sağında 5 vardır. Bu iki noktayı kendi ayna uçlarına bağla.", figureTitle: mirrorFieldMethods[2] },
  ],
  answer: "Göz hizasında −3 ile 5 arasındaki 8 birim genişlik, görüş alanı içindedir.",
  check: "Üç yöntemde de gölgeli alanın sınırları aynı. Gözün yatay konumu değişince sınırlar kayar.",
  pitfall: "Gözün görüntüsünü seçtiğinde kesik çizgiler aynanın arkasında kalır. Bölgeyi aynanın önündeki kollar arasında ara.",
};
