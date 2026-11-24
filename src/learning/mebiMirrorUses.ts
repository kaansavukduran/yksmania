import type { GuideSection, WorkedExample } from "./guides/types";

export const mirrorUsesTitle = "Üç aynada neyi görmek istiyoruz?";
export const mirrorUsesSteps = [
  "Yakındaki ayrıntıyı büyüt",
  "Doğrudan görünmeyen yüzeyi gör",
  "Arkaya geniş açıyla bak",
] as const;

export const mirrorUsesSection: GuideSection = {
  title: mirrorUsesTitle,
  figureTitle: mirrorUsesTitle,
  paragraphs: [
    "Küçük bir el aynası yüzü yakından incelemeye yarar. Büyütmeli çukur yüz kullanırsan ve yüzün odaktan yakındaysa görüntü düz ve büyük görünür. El aynası fotoğrafı kullanım yerini gösteriyor. Yanındaki ışın çizimi, bu kullanımın çukur ayna örneğini hesaplıyor.",
    "Diş aynası, gözün doğrudan önünde olmayan yüzeyden gelen ışığı göze yöneltebilir. Fotoğrafta dişin görüntüsü küçük yuvarlak ayna içinde seçiliyor. Düz ayna örneğinde bir ışın, ayna normalinin iki yanında eşit açı yapar. Bu gözlemde aynanın tipini belirlemek için ayrıca yüzeyi incelemek gerekir.",
    "Aracın dış yan aynasında gerideki yolun ve ağaçların görüntüsü oluşuyor. Geniş görüş gerektiğinde tümsek yüz, farklı yönlerden gelen ışınları göze ulaştırabilir. Tümsek ayna modelinde cisim düz, daha küçük ve aynanın arkasında görünür.",
  ],
};

export const mirrorUsesExample: WorkedExample = {
  title: "İşe göre ayna seç",
  prompt: "Bir ayrıntıyı büyütmek, görüş dışında kalan yüzeyi görmek ve aracın arkasına daha geniş açıyla bakmak istiyorsun. Her işte hangi özelliği kullanırsın?",
  strategy: "Büyütmeyi, ışın yönünü ve görüş alanını ayrı düşün.",
  steps: [
    { label: "Yakın ayrıntı", explanation: "Cismi çukur aynanın tepe ile odak arasına al. Yansıyan kolların kesik uzantıları aynanın arkasında birleşir. Görüntü düz ve büyüktür.", figureTitle: mirrorUsesSteps[0] },
    { label: "Görüş dışında kalan yüzey", explanation: "Aynanın yönünü, görülecek yüzeyden gelen ışının göze yansıyacağı biçimde ayarla. Geliş ve dönüş açıları yüzeye dik normalden eşit ölçülür.", figureTitle: mirrorUsesSteps[1] },
    { label: "Geniş alan", explanation: "Tümsek ayna modelinde geri uzantılar aynanın arkasında küçük ve düz görüntü oluşturur. Dış yan aynanın görüş alanı ayrıca aynanın boyuna, eğriliğine ve göze uzaklığına bağlıdır.", figureTitle: mirrorUsesSteps[2] },
  ],
  answer: "Yakın büyütme için odak içinde çukur ayna, yön değiştirme için uygun açıyla ayna, geniş alan için tümsek ayna kullanılır.",
  check: "Çukur ve tümsek örneklerindeki kesik uzantıları gerçek yansıma oklarından ayır.",
  pitfall: "Bir fotoğrafın gösterdiği kullanım yerinden, aynanın ölçüsünü veya eğriliğini çıkarmaya çalışma.",
};
