import type { GuideSection, WorkedExample } from "./guides/types";

export const mirrorEndpointsTitle = "K ve L uçlarından ayna görüntüsü";
export const mirrorKTitle = "K noktasına ait iki ışın";
export const mirrorLTitle = "L noktasına ait iki ışın";
export const mirrorJoinedTitle = "K′ ile L′ arasındaki görüntü";
export const mirrorObject = [
  { label: "K", point: [-3.4, -1.45] as const, hits: [-2.5, -0.55] as const },
  { label: "L", point: [-2.1, 1.35] as const, hits: [0.45, 2.3] as const },
] as const;

export const mirrorEndpointsSection: GuideSection = {
  title: mirrorEndpointsTitle,
  figureTitle: mirrorEndpointsTitle,
  paragraphs: [
    "Eğik KL parçasının uçlarını ayrı ışık kaynakları gibi düşün. K’dan aynaya iki ışın gönder ve yansıyan kolları aynanın arkasına kesik çizgiyle uzat. Uzantılar K′ noktasında birleşir.",
    "L için aynı işlemi başka iki ışınla yap. Bu sefer kesik uzantılar L′’de birleşir. K′ ve L′’yi birleştirince bütün parçanın aynadaki sanal görüntüsü oluşur.",
    "Her uç, aynaya göre aynı dik uzaklıktaki karşı noktasına taşınır. İki uç arasındaki düşey fark ve yatay farkın büyüklüğü korunur. Bu yüzden eğik KL parçasının boyu da korunur.",
  ],
};

export const mirrorEndpointsExample: WorkedExample = {
  title: "Eğik parçanın görüntüsünü uçlardan kur",
  prompt: "K aynanın 3,4 birim, L 2,1 birim önünde. KL parçası aynada nasıl görünür?",
  strategy: "Her uç için iki ışın çiz, yansıyan ışınların kesik geri uzantılarını birleştir, sonra iki görüntü noktasını bağla.",
  steps: [
    { label: "K′’yi bul", explanation: "K’nın yansıyan iki ışınının geri uzantısı, aynanın arkasında K’ya eşit dik uzaklıktaki K′’de birleşir.", figureTitle: mirrorKTitle },
    { label: "L′’yi bul", explanation: "L’nin geri uzantıları farklı bir noktada birleşir. L′, L’ye karşılık gelen eş uzaklıktadır.", figureTitle: mirrorLTitle },
    { label: "İki ucu bağla", explanation: "K′L′ parçasının boyu KL’ye eşit. Çizgiler birbirinin aynaya göre simetriğidir.", figureTitle: mirrorJoinedTitle },
  ],
  answer: "K′ aynanın 3,4 birim, L′ 2,1 birim arkasında. K′L′ aynı boydaki sanal görüntü.",
  check: "Gerçek yansıma okları aynanın önünde kalır. Kesik geri uzantılar çizimde aynanın arkasındadır.",
  pitfall: "Aynaya olan uzaklığı eğik ışın boyunca ölçme. Aynaya indirilen dik doğruyu kullan.",
};
