import { txt, type Question } from "../domain/model";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";
import { pulseLeftM, pulseSpeedMps, pulseWidthM, springPulseAt } from "./mebiSpringPulse";

export const springPulseQuestion = {
  id: "yay-dalgalari-atma-uretme-suresi",
  prompt: txt("Yayda sağa ilerleyen tek atmanın iki ucu çizimde verilmiştir. Bu yayda atmanın sürati 2 m/s. Kaynak ucu atmayı oluşturmak için kaç saniye hareket etmiştir?"),
  options: ["0,5 s", "1 s", "1,5 s", "2,5 s", "6 s"].map(txt),
  answer: 2,
  hint: txt("Çizimde atmanın nerede başlayıp bittiğini yatay eksende oku. Önce genişliği bul."),
  explanation: txt("Atmanın genişliği 5 m − 2 m = 3 m. Genişlik, sürat ile üretim süresinin çarpımıdır. Üretim süresi 3 m ÷ 2 m/s = 1,5 s."),
  skill: "Atmanın çiziminden üretim süresini bulma",
  guidance: {
    knowledge: ["Atmanın genişliği, o anda bozulan yay bölgesinin yatay boyu. Sabit süratli ideal yayda genişlik = sürat × üretim süresi."],
    strategy: "İki yatay sınırın farkını bul. Genişliği sürate böl.",
    steps: ["Atma x = 2 m’de başlar, x = 5 m’de biter. Genişliği 5 − 2 = 3 m.", "3 m’yi 2 m/s’ye böl. Metre sadeleşir ve sonuç 1,5 saniye çıkar."],
    optionReasons: [
      "0,5 s sürede atma 1 m genişliğinde olurdu.",
      "1 s sürede atma 2 m genişliğinde olurdu. Çizimdeki 2 m genişlik değil, bir sınırın konumu.",
      "2 m/s × 1,5 s = 3 m. İki sınırın arasıyla uyuşuyor.",
      "5 m sağ sınırın eksendeki konumu. Atma x = 2 m’de başladığı için 5 m genişliğinde değil.",
      "Genişlik ile sürati çarpmak süre birimi vermez. Genişliği sürate böl.",
    ],
    commonError: "Sağ sınırın eksendeki sayısını tek başına genişlik olarak alma.",
    check: "2 m/s × 1,5 s = 3 m ve 5 m − 2 m = 3 m.",
  },
} satisfies Question;

const rootLine = (x: number, y: number) => [35 + 39 * x, 105 - 38 * y] as const;
const shape = springPulseAt(0);
const pulse = Array.from({ length: 17 }, (_, i) => {
  const x = shape.leftM + i * pulseWidthM / 16;
  return rootLine(x, shape.displacement(x));
});

export const springPulseQuestionFigures = {
  figure: {
    kind: "geometry",
    title: "Yaydaki atmanın yatay sınırları",
    alt: "Sağa ilerleyen tek tepeli atma x = 2 metrede denge çizgisinden ayrılıyor ve x = 5 metrede çizgiye dönüyor. Yatay eksen metre cinsinden.",
    viewBox: [-20, -55, 402, 273],
    segments: [
      { from: rootLine(0, 0), to: pulse[0] }, { from: pulse.at(-1)!, to: rootLine(7, 0) },
      ...pulse.slice(1).map((point, index) => ({ from: pulse[index], to: point, emphasis: true })),
      { from: rootLine(pulseLeftM, 0), to: rootLine(pulseLeftM, -0.4), dashed: true },
      { from: rootLine(shape.rightM, 0), to: rootLine(shape.rightM, -0.4), dashed: true },
      { from: [174, 26], to: [251, 26] }, { from: [251, 26], to: [244, 20] }, { from: [251, 26], to: [244, 32] },
    ],
    labels: [
      { at: [213, -3], text: `${pulseSpeedMps} m/s` }, { at: rootLine(pulseLeftM, -1.39), text: `${pulseLeftM}` },
      { at: rootLine(shape.rightM, -1.39), text: `${shape.rightM}` }, { at: [307, 207], text: "x (m)", anchor: "end" },
    ],
  },
  hintFigure: { kind: "math", title: "Genişliği iki yatay sınırdan oku", alt: "Genişlik sağ sınır eksi sol sınırdır.", expression: { kind: "text", text: "w = xsağ − xsol" } },
  stepFigures: [
    { kind: "table", title: "Atmanın iki sınırı ve genişliği", alt: "Sağ sınır 5 metre, sol sınır 2 metre, fark 3 metre.", headers: ["Sağ sınır", "Sol sınır", "Genişlik"], rows: [["5 m", "2 m", "3 m"]] },
    { kind: "math", title: "Atmanın üretim süresini hesapla", alt: "Üç metre bölü saniyede iki metre, bir buçuk saniye.", expression: { kind: "text", text: "Δt = 3 m ÷ (2 m/s) = 1,5 s" } },
  ],
} satisfies { figure: SourceQuestionFigureSpec; hintFigure: SourceQuestionFigureSpec; stepFigures: readonly SourceQuestionFigureSpec[] };
