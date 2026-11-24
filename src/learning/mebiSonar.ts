import type { GuideSection, WorkedExample } from "./guides/types";

export const sonarTitle = "Sonar balık sürüsüne olan uzaklığı ölçer";
export const sonarPulseTitle = "Ses teknenin altından suya gönderilir";
export const sonarDepthTitle = "Ölçülen sürenin yarısı suya gidiştir";
export const sonarSpeedMS = 1500;
export const sonarDelay = { min: 40, max: 160, step: 20, init: 120 } as const;

export function sonarDistanceM(delayMs: number) {
  return sonarSpeedMS * delayMs / 2000;
}

export const sonarSection: GuideSection = {
  title: sonarTitle,
  figureTitle: sonarTitle,
  paragraphs: [
    "Teknenin altındaki sonar başlığı suya kısa bir ses dalgası gönderir. Sesin bir bölümü balıklardan yansır. Geri alınan dalga, yansımaya neden olan hedef hakkında bilgi verir.",
    "Sonar, dalganın gönderilmesi ile geri alınması arasındaki süreyi ölçer. Dalga sürüsüne inip başlığa geri geldiği için bu süre iki yolu kapsar. Çizimde sonar sürünün tam üstünde. Buradaki uzaklık, başlıktan sürüye düşey uzaklıktır.",
    "Sudaki ses sürati yaklaşık 1.500 m/s ise 120 ms gidiş-dönüş, 90 m düşey uzaklığa karşılık gelir. Ölçülen süreyi değiştir ve sürünün çizimdeki yerini izle. Birden fazla ölçüm sürünün nerede veya hangi yönde hareket ettiğini anlamaya yardım eder. Tek yankı süresinden balık sayısı çıkarılamaz.",
  ],
  table: {
    layout: "table",
    headers: ["Gidiş-dönüş süresi (ms)", "Başlıktan hedefe uzaklık (m)"],
    rows: [40, 80, 120, 160].map(delay => [String(delay), String(sonarDistanceM(delay))]),
  },
};

export const sonarExample: WorkedExample = {
  title: "120 ms sonra alınan yankı hangi uzaklıktan geliyor?",
  prompt: "Bir teknenin altındaki sonar balık sürüsünün tam üstünde. Suyun ses süratini 1.500 m/s al. Gönderim ile yankının alımı arasında 120 ms varsa sürü başlıktan kaç metre uzaktır?",
  strategy: "Milisaniyeyi saniyeye çevir. Sonra gidiş ve dönüş yollarını ayrı izle.",
  steps: [
    { label: "Sürenin birimini dönüştür", explanation: "Bir milisaniye saniyenin binde biridir. Sonar 120 milisaniyeyi gönderimden yankının gelişine kadar ölçer.", expression: "120 ms = 0,120 s", figureTitle: sonarPulseTitle },
    { label: "Düşey uzaklığı bul", explanation: "Gidiş ve dönüş yolu eşit. Çarpım toplam yolu, yarısı başlıktan sürüye uzaklığı verir.", expression: "1.500 × 0,120 ÷ 2 = 90 m", figureTitle: sonarDepthTitle },
  ],
  answer: "Balık sürüsü sonar başlığından yaklaşık 90 m aşağıda.",
  check: "İki yönün toplamı 180 m. 180 m ÷ 1.500 m/s = 0,120 s.",
  pitfall: "120 ms değerini 120 saniye olarak veya iki yönlü ölçümü tek yön olarak kullanma.",
};
