import type { GuideSection, WorkedExample } from "./guides/types";

export const wavelengthTitle = "Dalga boyu eş fazlı komşuların arasıdır";
export const waveRopeTitle = "Telde bir tam dalga deseni";
export const wavePeriodTitle = "Periyot ve frekansı ters çevir";

export function wavelengthMarkers(wavelengthM: number) {
  return {
    crests: Array.from({ length: 4 }, (_, index) => (index + 0.25) * wavelengthM),
    troughs: Array.from({ length: 2 }, (_, index) => (index + 0.75) * wavelengthM),
  };
}

const elapsedS = 2;
const cycles = 4;
export const waveTiming = { elapsedS, cycles, periodS: elapsedS / cycles, frequencyHz: cycles / elapsedS };

export const waveRopeSection: GuideSection = {
  title: waveRopeTitle,
  figureTitle: waveRopeTitle,
  paragraphs: [
    "Telin sol ucu denge çevresinde bir tam titreşim yapıyor. Oluşan şekil tel boyunca sağa ilerler. Sağ uç sabit, dalga henüz sağ uca ulaşmadı. Çizimde dalganın bir anlık görüntüsüne bakıyoruz.",
    "Çizimde başlayan ve biten noktalar denge çizgisinde ve aynı evrede. İkisinin arasında bir çukur ve bir tepe var. Yatay aralık bir dalga boyu λ. Sol uçtaki yukarı ve aşağı oklar tel ucunun titreşim yönlerini gösterir. İlerleyen dalganın yönü tel boyunca sağa doğrudur.",
    "Bir tam desenin uzunluğunu metreyle, kaynağın bir tam titreşiminin süresini saniyeyle ölç. Kaynak saniyede iki tam titreşim yapıyorsa frekans 2 Hz, periyot 0,5 s olur. Durağan ortamda aynı kaynak çalışırken oluşan dalganın frekansı da 2 Hz’dir.",
  ],
  table: {
    layout: "table",
    headers: ["Hangi gözlem?", "Bir tam tekrar", "Birim"],
    rows: [
      ["Telin bir anlık görüntüsü", "Dalga boyu λ", "m"],
      ["Aynı noktayı zamanla izle", "Periyot T", "s"],
      ["Bir saniyedeki tam titreşim sayısı", "Frekans f", "Hz"],
    ],
  },
};

export const wavePeriodExample: WorkedExample = {
  title: "Beş tepe kaydında dört titreşim",
  prompt: "Bir tel noktası t = 0 s’de tepe konumunda. t = 2 s’de ilk tepe dahil beşinci kez tepeye ulaşıyor. Titreşimler eşit zaman aralıklarıyla gerçekleşiyor. Periyot ve frekans kaçtır?",
  strategy: "Aynı noktayı izleyen zaman grafiğinde iki komşu tepe arası bir tam titreşim sürer. Önce bu aralıkları say.",
  steps: [
    { label: "Tam tekrar sayısı", expression: "5 − 1 = 4", explanation: "İlk tepe başlangıç işaretidir. Beş tepe arasında dört zaman aralığı vardır." },
    { label: "Bir tekrarın süresi", expression: "T = 2 s / 4 = 0,5 s", explanation: "Eşit dört aralık toplam iki saniye sürüyor." },
    { label: "Bir saniyedeki tekrar", expression: "f = 1 / T = 2 Hz", explanation: "Grafiğin yatay ekseni saniyedir. İki saniyede dört tekrar, saniyede iki tekrar demektir.", figureTitle: wavePeriodTitle },
  ],
  answer: "T = 0,5 s ve f = 2 Hz.",
  check: "4 × 0,5 s = 2 s. Bir saniyede iki tekrar tamamlanır.",
  pitfall: "İlk tepeyi tamamlanmış titreşim saymak bir aralık fazla verir. Metre cinsinden dalga boyu için anlık konum grafiği gerekir.",
};
