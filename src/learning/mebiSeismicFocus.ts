import type { GuideSection, WorkedExample } from "./guides/types";

export const seismicFocusTitle = "Depremi odak ve dalga yollarıyla düşün";
export const focusDepthKm = 6;
export const pSpeedKmPerS = 6;
export const sSpeedKmPerS = 3;

export function seismicArrival(stationXKm: number) {
  const pathKm = Math.hypot(focusDepthKm, stationXKm);
  const pSeconds = pathKm / pSpeedKmPerS;
  const sSeconds = pathKm / sSpeedKmPerS;
  return { pathKm, pSeconds, sSeconds, differenceSeconds: sSeconds - pSeconds };
}

export const seismicFocusSection: GuideSection = {
  title: seismicFocusTitle,
  figureTitle: seismicFocusTitle,
  paragraphs: [
    "Yer içindeki fay boyunca ani kayma, kayaçta titreşim başlatır. Titreşim, başlangıç bölgesinden çevredeki maddelere ulaşır. Çizimde yer içindeki başlangıç noktası odak, odağın tam üstündeki yüzey noktası dış merkezdir. İstasyon yüzeyin başka bir yerinde olabilir.",
    "Odak derinliği düşey ölçülür. Dış merkez uzaklığı yüzeyde ölçülür. Odaktan istasyona çizilen eğik yol, bu iki uzaklığın ayrı olduğu bir yol modelidir. İstasyonu sağa kaydırınca derinlik değişmez, eğik yol uzar.",
    "Bu düzgün kaya modelinde P 6 km/s ve S 3 km/s ile aynı yolu gider. P sıkışma, S kayma türüdür. P daha önce gelir. Olağan sıvıda S yayılmaz. Gerçek yer katmanlıdır, yollar kıvrılabilir ve tek istasyondan bütün konum belirlenemez.",
  ],
  table: {
    layout: "table",
    headers: ["İstasyonun dış merkezden uzaklığı", "Odaktan yol", "P varışı", "S varışı"],
    rows: [["0 km", "6 km", "1 s", "2 s"], ["8 km", "10 km", "1,67 s", "3,33 s"]],
  },
};

export const seismicFocusExample: WorkedExample = {
  title: "6 km derinlikteki odaktan istasyona ulaşım",
  prompt: "Düzgün kaya modelinde odak derinliği 6 km. Dış merkez ile istasyonun yüzeydeki uzaklığı 8 km. P dalgası 6 km/s ve S dalgası 3 km/s ile çizimdeki düz yolu izliyor. Hangisi önce gelir?",
  strategy: "Düşey ve yatay uzaklığı bir dik üçgen olarak çiz. Her dalganın aynı yolda geçirdiği süreyi bul.",
  steps: [
    { label: "Eğik yolu hesapla", expression: "√(6² + 8²) = 10 km", explanation: "Odak, dış merkez ve istasyon dik üçgen oluşturur. Yol hipotenüstür.", figureTitle: seismicFocusTitle },
    { label: "Varışları ayrı hesapla", expression: "P: 10/6 s · S: 10/3 s", explanation: "Aynı yolun sürate oranı alınır. P için süre daha kısa." },
    { label: "Farkı bul", expression: "10/3 − 10/6 = 5/3 s", explanation: "Kaya modeli ve aynı yol varsayımında P, S’den yaklaşık 1,67 saniye önce gelir." },
  ],
  answer: "P önce gelir. Yaklaşık varış farkı 1,67 saniye.",
  check: "P iki kat hızlı. Aynı yolda P’nin süresi S’nin yarısı.",
  pitfall: "Yüzeydeki 8 km’yi ya da düşey 6 km’yi doğrudan iki dalganın yolu olarak alma.",
};
