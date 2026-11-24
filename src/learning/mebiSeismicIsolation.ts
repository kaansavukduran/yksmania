import type { GuideSection, WorkedExample } from "./guides/types";

export const shakingDamageTitle = "Hasarı gözle, kaynağı ölçümden öğren";
export const isolationTitle = "Kolon ile temel arasındaki izolatör";
export const rigidBaseTitle = "Üst yapı ile temelin bağlantısı";
export const slidingBaseTitle = "Yalıtım katmanındaki göreli hareket";

export const shakingDamageSection: GuideSection = {
  title: shakingDamageTitle,
  figureTitle: shakingDamageTitle,
  paragraphs: [
    "Aynı deprem farklı yapılarda farklı izler bırakabilir. Fotoğrafta öndeki binanın açılan cephe ve döşeme kenarlarına bak. Başka binalarda görülen izleri, tek başına depremin büyüklüğünü ölçen bir değer gibi okuma.",
    "Sarsıntı, yerel zemin, yapının özellikleri ve deprem kaynağına uzaklık birlikte etki eder. Fotoğraf bir gözlem kaydıdır. Yapının taşıma kapasitesini fotoğraftan tek başına belirleyemeyiz.",
  ],
};

export const isolationSection: GuideSection = {
  title: isolationTitle,
  figureTitle: isolationTitle,
  paragraphs: [
    "Pasadena Belediye Binası’nın güçlendirilmesi sırasında çekilen fotoğrafta mavi plakaların arasında dairesel bir izolatör var. Kolondan gelen düşey yük temel yönüne aktarılırken yatayda göreli harekete izin veren bir bağlantı kullanılır.",
    "Bu düzenleme, depremin oluşturduğu zemin hareketinin üst yapıya nasıl aktarıldığını değiştirmeyi amaçlar. Zemin yine hareket eder. Üst yapı üzerindeki etki, uygun tasarıma ve koşullara bağlıdır.",
    "Kesitte önce doğrudan bağlı temeli, ardından aradaki izolatörü incele. İkinci çizimde hareket payının nerede bulunduğu gösteriliyor. Şema gerçek binanın yer değiştirme ya da ivme ölçümü değildir.",
  ],
};

export const isolationExample: WorkedExample = {
  title: "Hareket payı bağlantının neresinde?",
  prompt: "Şekillerde aynı tip üst yapı, birinde sıkı bağlı temel üzerinde, diğerinde temel ile kolon arasında yalıtım elemanı ile gösteriliyor. Göreli yatay hareket nerede ortaya çıkabilir?",
  strategy: "Temel, üst yapı ve aradaki bağlantının konumunu sırayla izle.",
  steps: [
    { label: "Temeli ve kolonu ayır", explanation: "Sıkı bağlı kesitte kayma için ayrılmış bir bağlantı yok.", figureTitle: rigidBaseTitle },
    { label: "Yalıtım elemanını bul", explanation: "İzolatör temel ile üst yapının birbirine göre yatay hareket edebildiği bağlantıdır.", figureTitle: slidingBaseTitle },
  ],
  answer: "Göreli yatay hareket için ayrılan yer, temel ile üst yapı arasındaki yalıtım katmanı.",
  check: "Fotoğraftaki siyah eleman iki plaka arasında ve üst kolonun altında.",
  pitfall: "Yalıtım uygulamasının zeminin hareketini durdurduğunu düşünme.",
};
