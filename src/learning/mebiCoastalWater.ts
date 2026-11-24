import type { GuideSection, WorkedExample } from "./guides/types";

export const coastalWaterTitle = "Kıyıdaki dalgakıranda ne görürüz?";
export const coastalWaterPhotoTitle = "Valletta’da dalgakırana çarpan dalga";
export const coastalWaterSource = "https://commons.wikimedia.org/w/index.php?oldid=1180557315&title=File%3AHuge_waves_crash_against_the_breakwater_and_Fort_Ricasoli_at_the_entrance_to_Valletta%27s_Grand_Harbour%2C_Malta.jpg";
export const coastalWaterLicence = "https://creativecommons.org/licenses/by-sa/4.0/";

export const coastalWaterSection: GuideSection = {
  title: coastalWaterTitle,
  figureTitle: coastalWaterPhotoTitle,
  paragraphs: [
    "Valletta limanındaki bu gerçek fotoğrafta dış taraftan gelen dalga taş engelin yüzünü buluyor. Beyaz su engelin önünde yukarı sıçrıyor. Ön taraftaki köpükle, engelin öte yanındaki daha koyu suyu karşılaştır.",
    "Dalgakıran kıyıya ulaşan dalgaların etkisini azaltabilir. Dalga enerjisinin bir bölümü geri döner, bir bölümü kırılma ve türbülansta dağılır. Su bazı koşullarda engelin üstünden veya aralıklarından da geçebilir.",
    "Bu MEBİ örneğinin konusunu gösteren ayrı bir kıyı fotoğrafı. Tek kare üzerinden gelen ve yansıyan dalgaların ayrı açılarını, hızlarını veya enerji paylarını ölçemeyiz.",
  ],
  table: {
    layout: "table",
    headers: ["Fotoğrafta görülen", "Çıkarılabilecek sonuç"],
    rows: [
      ["Engelin dış yüzünde sıçrayan beyaz su", "Dalga yapıya ulaşıyor"],
      ["Engelin önünde ve arkasında farklı yüzey görünümü", "Yapı çevresinde dalganın davranışı değişiyor"],
      ["Tek fotoğraf", "Yansıyan enerji payı ayrıca ölçülmeli"],
    ],
  },
};

export const coastalWaterExample: WorkedExample = {
  title: "Köpük yansıma miktarını ölçer mi?",
  prompt: "Dalgakıranın önünde kabaran su ve arkasında daha koyu bir yüzey görünüyor. Fotoğraftan yansıyan enerji miktarını bulabilir misin?",
  strategy: "Gözlemlediğin ayrıntıyı ve ölçüm için gereken veriyi ayrı yaz.",
  steps: [
    { label: "Dalganın engele ulaştığı yeri bul", explanation: "Beyaz su duvar boyunca yükseliyor. Fotoğraf, dalganın engelle etkileştiği yeri gösterir.", figureTitle: coastalWaterPhotoTitle },
    { label: "Verinin sınırını belirt", explanation: "Enerji payı için dalga genliği ve yönü gibi ölçümler gerekir. Bir karede köpüğün yüksek görünmesi bu payı tek başına vermez." },
  ],
  answer: "Fotoğrafta dalganın engele ulaştığı görülür. Yansıyan enerji miktarı ayrıca ölçülmelidir.",
  check: "Fotoğrafı aç. Duvarı, sıçramayı ve karşı taraftaki su yüzeyini ayrı ayrı göster.",
  pitfall: "Köpüğün yüksekliğinden bütün dalga enerjisinin yansıdığı sonucunu çıkarma.",
};
