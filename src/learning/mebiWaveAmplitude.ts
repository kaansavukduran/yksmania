import type { GuideSection, WorkedExample } from "./guides/types";

export const waveAmplitudeTitle = "Genliği zaman grafiğinden ölç";
export const waterAmplitudeTitle = "Su yüzeyinde denge çizgisi";
export const waveAmplitudeInitialCm = 3;

export function waveAmplitudeBounds(amplitudeCm: number) {
  return { maximumCm: amplitudeCm, minimumCm: -amplitudeCm, spanCm: 2 * amplitudeCm };
}

export const waveAmplitudeSection: GuideSection = {
  title: waveAmplitudeTitle,
  figureTitle: waveAmplitudeTitle,
  paragraphs: [
    "Telin aynı noktasını izliyoruz. Denge konumu y = 0. Nokta denge üstündeyken uzanım y pozitiftir, altındayken negatiftir. Genlik A, uzanımın en büyük büyüklüğüdür. Dengeden tepeye ya da dengeden çukura olan düşey uzaklık A’dır.",
    "Nokta t = 0’da dengeyi yukarı doğru geçiyorsa T/4’te +A, T/2’de sıfır, 3T/4’te −A ve T’de yeniden sıfır olur. T, yatay eksendeki tam tekrar süresidir. İki uç değer arasındaki düşey aralık A − (−A) = 2A.",
    "Modelde genliği artırdığında düşey uzaklık artıyor, periyot sabit kalıyor. Aynı ideal doğrusal ortam ve frekansta ortalama dalga gücü genliğin karesiyle değişir. Genlik iki katına çıktığında bu koşullarda güç dört katına çıkar.",
  ],
  table: {
    layout: "table",
    headers: ["Zaman", "Uzanım", "Noktanın konumu"],
    rows: [["0", "0", "Dengeyi yukarı geçer"], ["T/4", "+A", "En yukarıda"], ["T/2", "0", "Dengeyi aşağı geçer"], ["3T/4", "−A", "En aşağıda"], ["T", "0", "İlk konum ve yön tekrar eder"]],
  },
};

export const waterAmplitudeSection: GuideSection = {
  title: waterAmplitudeTitle,
  figureTitle: waterAmplitudeTitle,
  paragraphs: [
    "Durgun su yüzeyinin yüksekliğini yatay kesik çizgiyle gösteriyoruz. Bir anlık yandan görünümde tepe bu çizginin üstünde, çukur altında kalır. Ölçü okları kesik çizgiye dik çizilir.",
    "İdeal örnekte tepe +3 cm ve çukur −3 cm. Genlik 3 cm, aralarındaki düşey aralık 6 cm. Tepe ile çukurun yatay ayrımı başka bir ölçüdür. Bu çizimin yatay ekseni konumdur, önceki çizim aynı noktanın zaman içindeki hareketini gösteriyordu.",
  ],
};

export const waveAmplitudeExample: WorkedExample = {
  title: "Artı 3 ve eksi 3 santimetreden genliği bul",
  prompt: "Bir tel noktasının dengeye göre en yüksek uzanımı +3 cm, en düşük uzanımı −3 cm. Genlik ve uçlar arasındaki düşey aralık kaç santimetredir?",
  strategy: "Denge çizgisini başlangıç al. Ayrı olarak iki uç değerin farkını hesapla.",
  steps: [
    { label: "Dengeden uca", expression: "A = |+3 cm| = |−3 cm| = 3 cm", explanation: "Genlik bir uzaklık büyüklüğüdür ve bu örnekte 3 cm’dir." },
    { label: "Tepeden çukura", expression: "+3 cm − (−3 cm) = 6 cm", explanation: "Dengenin üstündeki 3 cm ve altındaki 3 cm birlikte sayılır.", figureTitle: waveAmplitudeTitle },
  ],
  answer: "Genlik 3 cm, iki uç konum arası düşey uzaklık 6 cm’dir.",
  check: "6 cm iki genliğe eşittir. 6 cm / 2 = 3 cm.",
  pitfall: "Genliği ararken ölçünün bir ucunu denge çizgisine yerleştir. İki uçla ölçersen 2A elde edersin.",
};
