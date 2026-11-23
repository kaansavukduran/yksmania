import type { GuideSection, WorkedExample } from "./guides/types";

export const phasePlasmaTitle = "Gaz ve plazma arasında yüklerin ayrılması";

export const plasmaTransitions = [
  {
    label: "İyonlaşma",
    start: "Nötr gaz",
    end: "İyon ve serbest elektron",
    energy: "Enerji alır",
    detail: "Bir elektron atomdan ayrılır. Pozitif iyon ile negatif elektron birlikte toplam yükü korur.",
  },
  {
    label: "Yeniden birleşme",
    start: "İyon ve serbest elektron",
    end: "Nötr gaz",
    energy: "Enerji verir",
    detail: "Pozitif iyon elektronu bağlayabilir. Bu örnekte bağlanma enerjisinin bir bölümü ışık olarak yayılır.",
  },
] as const;

export const phasePlasmaSection: GuideSection = {
  title: phasePlasmaTitle,
  figureTitle: phasePlasmaTitle,
  paragraphs: [
    "Sıvı–gaz dönüşümünde taneciklerin kimliği genel olarak korunur. İyonlaşmada ise gazdaki bir tanecikten elektron ayrılabilir. Şekilde bir nötr atom, pozitif iyon ve serbest elektrona ayrılıyor. Yükler + ve − olduğu için toplam yük başlangıçtaki gibi sıfır.",
    "Plazmada yeterince çok serbest yüklü tanecik birlikte davranır. Bütün taneciklerin iyonlaşması gerekmez. Enerji alan bir gazda iyonlaşma artabilir. Enerji kaybında yeniden birleşme olabilir. İki çizim, bu olayların yönünü ve yük korunmasını gösterir.",
    "Kutup ışığı ve şimşek, uyarılmış taneciklerin de rol oynadığı olaylardır. Işığın görünmesi tek başına gazın ne kadarının iyonlaştığını söylemez. Ders modeli, ışığı veya pırıltıyı maddenin hâlinin tek işareti olarak kullanmaz.",
  ],
  table: {
    headers: ["Geçiş", "Başlangıç", "Son", "Enerji yönü"],
    rows: plasmaTransitions.map(({ label, start, end, energy }) => [label, start, end, energy]),
  },
};

export const phasePlasmaExample: WorkedExample = {
  title: "İyon ile elektronun toplam yükü",
  prompt: "Nötr bir atom enerji alarak bir elektronunu kaybediyor. İyonun yükü +e, ayrılan elektronun yükü −e. İkisi aynı sistemde kalırsa sistemin net yükü ve olayın adı nedir?",
  strategy: "Sistem sınırını atomdan ayrılan elektronu da kapsayacak şekilde düşün. Başlangıç ve son taneciklerini karşılaştır.",
  steps: [
    { label: "Yükü topla", expression: "(+e) + (−e) = 0", explanation: "Elektron konum değiştirdi. Kapalı sistemin toplam yükü sıfır kaldı." },
    { label: "Geçişi adlandır", explanation: "Nötr atomdan elektron ayrılması iyonlaşmadır. Enerji girişi, iyonu ve serbest elektronu ayırdı.", figureTitle: phasePlasmaTitle },
  ],
  answer: "Net yük 0. Geçiş iyonlaşma.",
  check: "Elektronu sistemin dışında sayarsan yalnız iyonun +e yükünü hesaplarsın. Soru ikisini birlikte istiyor.",
  pitfall: "Pozitif iyonun ortaya çıkmasını yeni elektrik yükü oluştu diye yorumlama.",
};
