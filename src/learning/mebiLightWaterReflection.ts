import type { GuideSection, WorkedExample } from "./guides/types";

export const lightWaterReflectionTitle = "Işın ile su cephesi aynı açıyla dönüyor";
export const directReflectionTitle = "Dik gelişte yön tersine döner";
export const angledReflectionTitle = "Eğik gelişte iki eş açı";

export const lightWaterReflectionSection: GuideSection = {
  title: lightWaterReflectionTitle,
  figureTitle: lightWaterReflectionTitle,
  paragraphs: [
    "Fotoğraflarda dalgakırana ulaşan su dalgasını, deniz yüzeyindeki ışık şeritlerini ve suyun altından bakınca değişen görünümü karşılaştır. Kıyı fotoğrafı suyun engelle etkileşimini, deniz yüzeyi fotoğrafı ışığın suya bakışta görünen yansımalarını gösterir. Su altındaki görüntüyü ise ışığın hava ve su arasındaki geçişi de etkiler. Açıları ölçmek için aşağıdaki ideal düz sınır modelini kullan.",
    "Soldaki ok ışığın hareket yönü. Sağdaki kısa çizgiler suyun tepe cepheleri. Su dalgası bu çizgilere dik yönde ilerler. Her iki tarafta düz sınırın normali kesik çizgiyle gösterilir.",
    "Dik gelişte hareket oku normal boyunca sınıra ulaşır, yansımada aynı doğrultuda geri döner. Su cephesi hem yaklaşırken hem uzaklaşırken engele paraleldir.",
    "Eğik gelişte iki yön normalin farklı yanında kalır. Normalden ölçülen gelme ve yansıma açıları eşittir. Gelen ışın, yansıyan ışın ve normal tek bir düzlemde bulunur.",
  ],
  table: {
    layout: "table",
    headers: ["Durum", "Işının yönü", "Su dalgasının tepeleri"],
    rows: [
      ["Dik geliş", "Aynı normal doğrultusunda geri", "Sınırla paralel, normal yönünde geri"],
      ["Eğik geliş", "Normalin öbür yanında aynı açı", "Yeni hıza dik, geliş ve dönüş açıları eşit"],
    ],
  },
};

export const lightWaterReflectionExample: WorkedExample = {
  title: "Bir ışın ve su cephesi nasıl döner?",
  prompt: "Işın ve düz su dalgası aynı açıyla düz sınıra gidiyor. 0° ve 35° geliş için dönüşü karşılaştır.",
  strategy: "İki durumda önce hareket oku ile normal arasını ölç. Su cephesini hareket okuna dik çiz.",
  steps: [
    { label: "Normal üzerinden dön", explanation: "0° gelişte dönüş oku aynı doğrultuda ters yöne bakar. Su tepeleri sınıra paralel kalır.", figureTitle: directReflectionTitle },
    { label: "35°’yi normalden ölç", explanation: "Işın ve su dalgası normalin öte yanında 35° ile uzaklaşır. Hareket doğrultusu sınırla 55° yapar.", figureTitle: angledReflectionTitle },
  ],
  answer: "0° gelişin yansıması 0°, 35° gelişin yansıması 35°.",
  check: "Su cephesi ile hareket oku her çizimde dik. Eş açıları karşılaştırırken normal aynı yerde kalır.",
  pitfall: "Cephe çizgisini ilerleme oku sanma. Hareket oku her tepeyi dik geçer.",
};
