import type { GuideSection, WorkedExample } from "./guides/types";

export const waveTravelTitle = "Bir periyotta desen ne kadar ilerler?";
export const waveTravelSpeedMps = 4;
export const waveTravelFrequencyHz = 2;
export const waveTravelPeriodS = 1 / waveTravelFrequencyHz;
export const waveTravelWavelengthM = waveTravelSpeedMps * waveTravelPeriodS;

export function waveTravelAt(periodsElapsed: number) {
  const elapsedS = periodsElapsed * waveTravelPeriodS;
  return { elapsedS, distanceM: waveTravelSpeedMps * elapsedS };
}

export const waveTravelSection: GuideSection = {
  title: waveTravelTitle,
  figureTitle: waveTravelTitle,
  paragraphs: [
    "Kaynak telin sol ucunu sallamaya başladığında bozunum sağa doğru yayılır. Dalganın önüne bak: ön, her saniye v metre ilerler. t saniyede aldığı yol v × t. Telin belli bir noktası ise denge çevresinde titreşir.",
    "Kaynak T sürede bir tam titreşim yaptığında bozunumun önü v × T kadar ilerlemiş olur. Bir tam dalga deseninin yatay boyu da bu uzaklıktır: λ = v × T. T = 1/f olduğundan v = λ × f. Metre ile 1/s çarpılırsa m/s çıkar.",
    "Örnekte ideal telin dalga sürati sabit 4 m/s. Kaynak 2 Hz olduğu için bir tam titreşim 0,5 s sürer. Yarım periyotta ön 1 m ilerler, bir periyotta 2 m ilerler. Dalga henüz sabit uca ulaşmadığı için yansıma yoktur.",
  ],
  table: {
    layout: "table",
    headers: ["Geçen süre", "İşlem", "Dalga önünün konumu"],
    rows: [["0 s", "4 × 0", "0 m"], ["0,25 s", "4 × 0,25", "1 m"], ["0,5 s", "4 × 0,5", "2 m = λ"]],
  },
};

export const waveTravelExample: WorkedExample = {
  title: "Dalga önü yarım ve tam periyotta",
  prompt: "Dalga sürati 4 m/s olan ideal bir telde kaynak t = 0 anında 2 Hz ile titreşmeye başlıyor. Dalganın önü 0,25 s ve 0,5 s sonra kaynaktan ne kadar uzaktadır?",
  strategy: "Önce bir tam titreşimin süresini bul. Verilen her süreyi dalga süratiyle çarp.",
  steps: [
    { label: "Kaynağın periyodu", expression: "T = 1 / 2 Hz = 0,5 s", explanation: "İki tam titreşim bir saniye sürer. Bir tam titreşime yarım saniye düşer." },
    { label: "Yarım periyot", expression: "4 m/s × 0,25 s = 1 m", explanation: "0,25 s boyunca ön, bir dalga boyunun yarısı kadar ilerler." },
    { label: "Tam periyot", expression: "4 m/s × 0,5 s = 2 m", explanation: "Bir tam desen tamamlandığında dalga önü kaynaktan 2 m uzaktadır.", figureTitle: waveTravelTitle },
  ],
  answer: "0,25 s’de 1 m ve 0,5 s’de 2 m. Bu telde dalga boyu 2 m’dir.",
  check: "2 m × 2 Hz = 4 m/s; başlangıçta verilen yayılma süratini elde ettik.",
  pitfall: "1 m sonucu tel taneciğinin yatay yolu diye okunmaz. Burada dalganın önünün yatay konumu ölçülüyor.",
};
