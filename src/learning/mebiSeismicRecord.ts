import type { GuideSection, WorkedExample } from "./guides/types";
import { seismicArrival } from "./mebiSeismicFocus";

export const seismicRecordTitle = "Sismogramda P ve S dalgalarını oku";
export const seismicRecordReadTitle = "P ve S varışlarını grafikte işaretle";
export const seismicRecordDifferenceTitle = "İki varışın zaman farkını ölç";
export const seismicRecordExampleTitle = "Bir kayıtta önce hangi dalga geldi?";
export const seismicStations = { min: 0, max: 12, step: 1, init: 8 } as const;
export const seismicTraceDurationS = 6;

function modeledPulse(time: number, arrival: number, frequency: number, amplitude: number) {
  const sinceArrival = time - arrival;
  if (sinceArrival <= 0) return 0;
  return amplitude * Math.sin(2 * Math.PI * frequency * sinceArrival) * Math.exp(-1.9 * sinceArrival);
}

export function seismicTrace(stationKm: number) {
  const arrivals = seismicArrival(stationKm);
  const readAt = (seconds: number) => {
    const p = modeledPulse(seconds, arrivals.pSeconds, 4.4, 0.37);
    const s = modeledPulse(seconds, arrivals.sSeconds, 2.9, 0.92);
    return p + s;
  };
  return { ...arrivals, readAt };
}

export const seismicRecordSection: GuideSection = {
  title: seismicRecordTitle,
  figureTitle: seismicRecordTitle,
  paragraphs: [
    "Sismoloji, depremleri ve yer içindeki dalgaları inceler. Sismograf istasyondaki yer hareketini zamana göre kaydeder. Elde edilen kayda sismogram denir.",
    "Grafiğin yatay ekseni zaman. Düşey eksen bu örnekte göreli yer hareketi. Denge çizgisinden ilk ayrılma P varışını, sonraki işaret S varışını gösteriyor. P sıkışma, S kayma yoluyla ilerler. İkisi de kayadan geçebilen mekanik dalgalardır.",
    "İstasyonun dış merkeze uzaklığını değiştir. Odak derinliği sabit kalırken dalgaların yolu uzar. Bu modelde P daha hızlı olduğu için P ile S’nin varış farkı açılır. Tek istasyon belirli bir yön vermez. Gerçek yer yapısı dikkate alınır ve birden fazla istasyonun kayıtları birleştirilir.",
  ],
};

export const seismicRecordExample: WorkedExample = {
  title: seismicRecordExampleTitle,
  prompt: "Düzgün kaya modelinde odak 6 km derinlikte. Bir istasyon odağın düşey izdüşümünden 8 km uzakta. Sismogramda P ve S işaretlerinin zamanlarını oku. S dalgası P’den kaç saniye sonra geliyor?",
  strategy: "Grafikteki iki varış anını zaman eksenine indir. Sonra başlangıç anlarını birbirinden çıkar.",
  steps: [
    { label: "P ve S varışlarını oku", explanation: "İki işaret aynı zaman ekseninde. P yaklaşık 1,67 s’de, S yaklaşık 3,33 s’de başlar.", figureTitle: seismicRecordReadTitle },
    { label: "S zamanından P zamanını çıkar", expression: "10/3 − 10/6 = 5/3 s", explanation: "Daha hassas model süreleri 10/6 s ve 10/3 s. Fark yaklaşık 1,67 s. Ekrandaki ayrı yuvarlanmış süreler 0,01 s farklı bir sonuç verebilir.", figureTitle: seismicRecordDifferenceTitle },
  ],
  answer: "P önce gelir. S yaklaşık 1,67 s sonra gelir.",
  check: "Odaktan istasyona 10 km. S’nin sürati P’nin yarısı olduğu için aynı yol iki kat zaman alır.",
  pitfall: "Bir tepenin en yüksek noktasını dalganın ilk varışı sanma.",
};
