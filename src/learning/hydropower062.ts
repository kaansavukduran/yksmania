import type { GuideSection, WorkedExample } from "./guides/types";

export const hydropowerTitle = "Suyun yüksekliğinden elektrik gücüne";
export const flow = 2;
export const waterDensity = 1000;
export const hydropowerGravity = 10;
export const conversionEfficiency = 0.75;

export function hydropowerAt(head: number) {
  const massPerSecond = flow * waterDensity;
  const inputWatts = massPerSecond * hydropowerGravity * head;
  const electricalWatts = inputWatts * conversionEfficiency;
  return { massPerSecond, inputWatts, electricalWatts, otherWatts: inputWatts - electricalWatts };
}

export const hydropowerSection: GuideSection = {
  title: hydropowerTitle,
  figureTitle: hydropowerTitle,
  paragraphs: [
    "Hidroelektrik üretiminde yüksekten inen suyun yerçekimi potansiyel enerjisi akışa geçer. Akış türbin kanatlarını döndürür. Türbine bağlı jeneratör dönme enerjisini elektrik enerjisine aktarır. Çizimde her adımda aynı su–türbin–jeneratör zincirini izle.",
    "Özgün örnekte saniyede 2 m³ su geçiyor. Suyun yoğunluğu 1.000 kg/m³. Bu, saniyede 2.000 kg su demek. Yükseklik farkı 10 m ve g = 10 N/kg için suyun sağlayabileceği güç 2.000 × 10 × 10 = 200.000 W. Bu değerin %75’i elektriğe aktarılırsa elektrik çıkışı 150 kW olur.",
    "Örnekte %75, suyun yükseklik farkından ölçülen elektrik çıkışına kadar tüm kayıpları birlikte kapsıyor. Boru, türbin ve jeneratörün her birine ayrı kayıp payı verilmedi. Gerçek üretim debi ve su seviyesine göre değişir. Bir tesisin akarsu ekosistemindeki etkisi de tasarımına ve konumuna bağlıdır.",
  ],
  table: {
    headers: ["Yükseklik farkı", "Su gücü", "Elektrik çıkışı", "Diğer aktarım"],
    rows: [["10 m", "200 kW", "150 kW", "50 kW"], ["15 m", "300 kW", "225 kW", "75 kW"]],
  },
};

export const hydropowerExample: WorkedExample = {
  title: "Aynı debi, 15 metre yükseklik farkı",
  prompt: "Saniyede 2.000 kg su 15 m alçalıyor. g = 10 N/kg ve toplam elektrik dönüşüm verimi %75. Elektrik gücü kaç kW?",
  strategy: "Bir saniyede alçalan suyun potansiyel enerji değişimini bul. Sonra bu gücün %75’ini al.",
  steps: [
    { label: "Su gücü", expression: "2.000 × 10 × 15 = 300.000 W = 300 kW", explanation: "Kullanılan kütle bir saniyede geçen suyun kütlesidir.", figureTitle: hydropowerTitle },
    { label: "Elektrik gücü", expression: "300 kW × 0,75 = 225 kW", explanation: "Toplam girişin dörtte üçü elektrik. Kalan 75 kW başka enerji biçimlerine gider." },
  ],
  answer: "Elektrik çıkışı 225 kW.",
  check: "225 kW + 75 kW = 300 kW. Debi ve verim aynıysa yükseklik farkı 10 m’den 15 m’ye çıktığında elektrik gücü 1,5 kat olur.",
  pitfall: "Saniyede geçen su kütlesini rezervuardaki toplam su kütlesiyle karıştırma.",
};
