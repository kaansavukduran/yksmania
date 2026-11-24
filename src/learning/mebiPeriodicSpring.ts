import type { GuideSection, WorkedExample } from "./guides/types";
import { pulseSpeedMps, pulseSupportM } from "./mebiSpringPulse";

export const periodicSpringTitle = "Yayda periyodik enine ve boyuna dalga";
export const periodicSpringPeriodS = 1.5;
export const periodicSpringWavelengthM = pulseSpeedMps * periodicSpringPeriodS;
export const periodicSpringTime = { min: 0, max: 4.5, step: 0.25, initial: 3 };
const alongDisplacementM = 0.16;
const upwardDisplacementM = 0.25;

export function periodicSpringAt(timeS: number) {
  const sourcePhase = (distanceM: number) => {
    const sourceTimeS = timeS - distanceM / pulseSpeedMps;
    return sourceTimeS < 0 ? 0 : Math.sin(2 * Math.PI * sourceTimeS / periodicSpringPeriodS);
  };
  const leadingDistanceM = pulseSpeedMps * timeS;
  const crestDistancesM = Array.from({ length: Math.ceil(timeS / periodicSpringPeriodS) }, (_, cycle) =>
    pulseSpeedMps * (timeS - periodicSpringPeriodS * (cycle + 0.25)),
  ).filter((distanceM) => distanceM >= 0 && distanceM <= pulseSupportM);
  return {
    leadingDistanceM,
    crestDistancesM,
    transverseHeightM: (x: number) => upwardDisplacementM * sourcePhase(x),
    longitudinalPositionM: (x: number) => x - alongDisplacementM * sourcePhase(pulseSupportM - x),
  };
}

export const periodicSpringSection: GuideSection = {
  title: periodicSpringTitle,
  figureTitle: periodicSpringTitle,
  paragraphs: [
    "Yay ucu bir kez hareket ederse tek bir atma oluşur. Uç aynı hareketi eşit aralıklarla tekrarlarsa yayda arka arkaya aynı biçimler oluşur. İki tekrar arasındaki süre periyot, aynı titreşim durumundaki en yakın iki noktanın arası dalga boyudur. Komşu tepeler buna örnek.",
    "Üstte sol uç, yay doğrultusuna dik yönde aşağı yukarı hareket ediyor. İşaretli yay noktası aynı yatay konumda düşey titreşiyor. Tepeler sağa ilerliyor. Titreşim ile ilerleme birbirine dik olduğu için dalga enine.",
    "Altta sağ uç, yayı doğrultusu boyunca sıkıştırıp serbest bırakıyor. İşaretli halka aynı doğrultuda ileri geri titreşirken sıkışmalar sola ilerliyor. İki hareket aynı doğrultuda olduğu için dalga boyuna.",
    "Her iki örnekte ilk hareket henüz karşı uca ulaşmadı. Aynı dalga için bir periyotta ilerleyen uzaklık v × T olur.",
  ],
  table: {
    layout: "table",
    headers: ["Yay modeli", "İşaretli noktanın titreşimi", "Dalganın ilerlemesi"],
    rows: [["Enine", "Düşey", "Sağa"], ["Boyuna", "Yatay", "Sola"]],
  },
};
export const periodicSpringExample: WorkedExample = {
  title: "Ardışık tepeler arasındaki uzaklık",
  prompt: "Bir yay ucu 1,5 s’de bir aynı düşey hareketi yapıyor. Dalga 2 m/s ile sağa ilerliyor. Ardışık iki tepenin arası kaç metredir?",
  strategy: "İkinci tepe kaynaktan ayrılana kadar ilk tepenin aldığı yolu bul.",
  steps: [
    { label: "Tekrar aralığını belirle", expression: "T = 1,5 s", explanation: "Kaynak iki tepeyi bir periyot arayla oluşturur." },
    { label: "Bir periyotta alınan yolu ölç", expression: "λ = 2 m/s × 1,5 s = 3 m", explanation: "Üst çizimde zamanı 3 s’ye getir. Ardışık iki tepe aynı anda 3 m aralıkla görünür.", figureTitle: periodicSpringTitle },
  ],
  answer: "Ardışık iki tepenin arası 3 m.",
  check: "3 m ÷ 1,5 s = 2 m/s. Birimler yayılma süratiyle tutarlı.",
  pitfall: "Düşey tepe yüksekliğini ölçme. Dalga boyu, eş evreli iki noktanın yatay uzaklığıdır.",
};
