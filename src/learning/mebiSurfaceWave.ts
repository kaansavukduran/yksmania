import type { GuideSection, WorkedExample } from "./guides/types";

export const surfaceWaveTitle = "Su taşınırken mi dalga ilerler?";
export const surfaceWavelengthM = 6;
export const surfaceAmplitudeM = 0.4;
export const surfaceMarkerM = 3;

export function surfaceWavePosition(restX: number, periods: number) {
  const phase = Math.PI / 2 + 2 * Math.PI * ((restX - surfaceMarkerM) / surfaceWavelengthM - periods);
  return { x: restX + surfaceAmplitudeM * Math.cos(phase), y: surfaceAmplitudeM * Math.sin(phase) };
}

export function surfaceCrestX(periods: number) {
  return surfaceMarkerM + surfaceWavelengthM * periods;
}

export const surfaceWaveSection: GuideSection = {
  title: surfaceWaveTitle,
  figureTitle: surfaceWaveTitle,
  paragraphs: [
    "Kaynak çizimindeki su dalgasını bir yüzey kesitiyle incele. Su yerel olarak sallanır. Yüzeydeki bir işaret, denge konumu çevresinde hem yatay hem düşey hareket eder. Su yüzeyindeki tepe bu sırada sağa doğru ilerler.",
    "Şemada başlangıçta gözlediğimiz nokta bir tepededir. Çeyrek periyotta sağdan denge seviyesine, yarım periyotta aşağıdaki çukura gelir. Üç çeyrek periyotta soldan denge seviyesine gelir. Bir periyot tamamlanınca başlangıç konumuna döner. Sağda izlediğimiz tepe bu sürede bir dalga boyu ilerler.",
    "Bu, derin ve durgun suda düşük genlikli bir dalganın ilk yaklaşımı. Yörüngeyi görebilmek için çizimde genlik belirgin tutuldu. Kıyıya vuran, kırılan dalgalarda ve akıntıda su ayrıca taşınabilir.",
  ],
  table: {
    layout: "table",
    headers: ["Süre", "Yüzey işareti", "İzlenen tepenin konumu"],
    rows: [["0", "Tepede", "3 m"], ["T/4", "Denge seviyesinde, sağda", "4,5 m"], ["T/2", "Çukurda", "6 m"], ["3T/4", "Denge seviyesinde, solda", "7,5 m"], ["T", "Yeniden tepede", "9 m"]],
  },
};

export const surfaceWaveExample: WorkedExample = {
  title: "Bir su noktası ve bir tepe bir periyotta ne kadar yer değiştirir?",
  prompt: "6 m dalga boyuna sahip su dalgasında izlenen tepe başlangıçta x = 3 m’dedir. O anda tepede yüzen küçük bir işaret, ideal modelde bir kapalı yörüngeyi T sürede tamamlar. Bir periyot sonra tepenin ve işaretin yatay yer değiştirmeleri nedir?",
  strategy: "Yayılan tepeyi ve su üzerinde yüzen işareti ayrı ayrı izle.",
  steps: [
    { label: "Tepenin konumu", expression: "x = 3 m + 6 m = 9 m", explanation: "Bir periyotta izlenen tepe 6 m sağa, bir dalga boyu kadar ilerler." },
    { label: "İşaretin konumu", expression: "Δx = 3 m − 3 m = 0 m", explanation: "Yüzen işaret kapalı yörüngeyi bitirir ve ilk yatay konumuna döner. Kontrolü T’ye getir.", figureTitle: surfaceWaveTitle },
  ],
  answer: "Tepe 6 m sağa ilerler. Yüzen işaretin net yatay yer değiştirmesi 0 m olur.",
  check: "İşaretin izini ve tepenin son konumunu aynı çizimde ayrı okuyabilirsin.",
  pitfall: "İşaret bir yörünge boyunca hareket etti. Sıfır olan, gittiği yol değil net yer değiştirmesidir.",
};
