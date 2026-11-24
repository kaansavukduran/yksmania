import type { GuideSection, WorkedExample } from "./guides/types";

export const lightModelsTitle = "Dalga ve foton modellerini birlikte düşün";
export const youngFringesTitle = "Çift yarıkta aydınlık ve karanlık saçaklar";
export const brightFringeTitle = "Yol farkı bir dalga boyu";
export const darkFringeTitle = "Yol farkı yarım dalga boyu";
export const slitGapMm = 0.2;
export const screenDistanceM = 1;

export function brightFringeSpacingMm(wavelengthNm: number) {
  return wavelengthNm * 1e-3 * screenDistanceM / slitGapMm;
}

export const lightModelsSection: GuideSection = {
  title: lightModelsTitle,
  figureTitle: youngFringesTitle,
  paragraphs: [
    "Optik ışığı ve ışıkla gerçekleşen olayları inceler. Işığın cisimden göze ulaşması, Antik Çağ’dan beri tartışılan bir sorudur. Bir sayfa, üzerine düşen ışığın bir kısmını göze gönderdiğinde görünür. Düzgün bir ortamda ışın modeli bu yolu okla gösterir.",
    "Newton ışığın taneciklerle yayıldığını düşündü. Huygens dalga modeli geliştirdi. Young, aynı kaynaktan aydınlatılan iki yarığın bir ekranda aydınlık ve karanlık saçaklar oluşturduğunu gösterdi. Maxwell ışığın elektromanyetik dalga olduğunu açıkladı.",
    "Planck kara cisim ışımasını açıklarken enerji alışverişini paketler halinde ele aldı. Einstein fotoelektrik olayda tek ışık paketinin, yani fotonun, enerjisini frekansla ilişkilendirdi. Bir fotonun enerjisi E = hf ile bulunur. h Planck sabiti, f frekanstır. Compton olayında foton maddeyle enerji ve momentum alışverişi yapar.",
    "De Broglie dalga özelliğini maddeye de uyguladı. Schrödinger maddenin kuantum davranışını açıklayan dalga denklemi geliştirdi. Işın, dalga ve foton modelleri farklı gözlenen ayrıntılara yanıt verir.",
  ],
  table: {
    layout: "table",
    headers: ["Gözlem", "Açıklamada gereken ayrıntı"],
    rows: [
      ["Aynadan yansıma ve yüzeyin aydınlanması", "Işın modeli yönü ve yüzeye düşen ışığı izlemeye yeter."],
      ["Kırılma ve prizmada renk ayrılması", "Işığın hızı ortamla değişir. Prizmada hızın dalga boyuna bağlı değişimi renklerin yönlerini ayırır."],
      ["Işık demetlerinin kesişmesi", "Saydam, doğrusal ortamda demetler üst üste binebilir ve yollarını sürdürür."],
      ["Girişim ve kırınım", "Dalga modeli yol farkını, saçakları ve dar açıklıkta yayılmayı açıklar."],
      ["Fotoelektrik olay ve Compton saçılması", "Fotonun enerji veya momentum aktarımı hesaba katılır."],
      ["Kara cisim ışıması", "Kuantalanmış enerji ile ışıma tayfı açıklanır."],
    ],
  },
};

export const lightModelsExample: WorkedExample = {
  title: "İki ışık dalgasından karanlık saçak",
  prompt: "İki yarığa aynı renkte ve aynı fazda ışık geliyor. Ekranda bir noktanın yarıklara olan uzaklıkları bir dalga boyu kadar farklı. Öteki noktada fark yarım dalga boyu. Hangi nokta aydınlık görünür?",
  strategy: "Her noktada dalga tepelerinin ekrana nasıl ulaştığını karşılaştır.",
  steps: [
    { label: "Bir dalga boyu", explanation: "İki dalga yeniden aynı fazda buluşur. Tepeler üst üste eklenir.", figureTitle: brightFringeTitle },
    { label: "Yarım dalga boyu", explanation: "Bir dalganın tepesi diğerinin çukuruyla buluşur. Eş genlikte ideal dalgalar birbirini söndürür.", figureTitle: darkFringeTitle },
  ],
  answer: "Bir dalga boyu yol farkındaki nokta aydınlık, yarım dalga boyu farkındaki nokta karanlık görünür.",
  check: "Aydınlık için tam dalga boyu, karanlık için yarım dalga boyu farkı.",
  pitfall: "İki dalga da karanlık noktaya ulaşır. Sönmeyi yarıklarda değil, ekranda buluştukları yerde ara.",
};
