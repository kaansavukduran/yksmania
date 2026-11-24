import { txt, type Question } from "../domain/model";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";
import { intensityRatio } from "./mebiSoundLevel";

const firstLevel = 50;
const secondLevel = 70;
const difference = secondLevel - firstLevel;
const ratio = intensityRatio(firstLevel, secondLevel);

export const soundLevelQuestion = {
  id: "ses-deprem-dalgalari-desibel-isaretleri",
  prompt: txt("X ve Y seslerinin düzeyleri şekilde işaretlenmiştir. Y sesinin şiddeti X sesinin şiddetinin kaç katıdır?"),
  options: ["2", "10", "20", String(ratio), "1.000"].map(txt),
  answer: 3,
  hint: txt("X ve Y’nin ölçek üzerindeki değerlerini oku. Aralarındaki her 10 dB artış ses şiddetini bir kez onla çarpar."),
  explanation: txt(`Düzey farkı ${secondLevel} − ${firstLevel} = ${difference} dB. İki 10 dB adımının şiddet çarpanları 10 ve 10. Şiddet oranı ${ratio}.`),
  guidance: {
    knowledge: [
      "Ses düzeyi dB, ses şiddeti W/m² ile ifade edilir.",
      "Aynı referansla düzey farkı 10 · log₁₀(I₂/I₁) olur.",
    ],
    strategy: "Ölçekteki iki işaretin farkını al. Ardından her 10 dB adımının şiddet çarpanını kullan.",
    steps: [
      `X işareti ${firstLevel} dB, Y işareti ${secondLevel} dB üzerinde. Ses düzeyi farkı ${secondLevel} − ${firstLevel} = ${difference} dB. Ölçekte bu fark iki adet 10 dB adımıdır.`,
      `İlk 10 dB artış şiddeti on kat yapar. Sonraki 10 dB yine on kat yapar. Çarpanları çarpınca Y’nin şiddeti X’in 10 × 10 = ${ratio} katıdır.`,
    ],
    optionReasons: [
      "İki, ölçek adımlarının sayısıdır. Her adım şiddeti bir kez onla çarpar.",
      "On kat şiddet tek bir 10 dB artışa karşılık gelir. İki işaret arasında iki adım var.",
      "Yirmi, desibel cinsinden düzey farkıdır. Şiddetlerin oranı için adımların çarpanlarını kullan.",
      `Ölçekte iki 10 dB adımı var. 10 × 10 = ${ratio}.`,
      "Bin kat şiddet üç 10 dB adımı ister. X ile Y arasında iki adım var.",
    ],
    commonError: "Desibel farkını doğrudan şiddetlerin oranı olarak kullanma.",
    check: `10 · log₁₀(${ratio}) = ${difference} dB.`,
  },
  skill: "Desibel ölçeğinde iki işareti okuyup şiddet oranını hesaplama",
} satisfies Question;

type Point = readonly [number, number];
type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type ScalePart = Required<Pick<Geometry, "viewBox" | "segments" | "labels">>;
const position = (db: number) => 80 + (db - 30) * 8;
function soundScale(topSpace = 0): ScalePart {
  const ticks = [30, 40, firstLevel, 60, secondLevel, 80, 90];
  const axisY = 122 + topSpace;
  return {
    viewBox: [0, 0, 640, 280 + topSpace],
    segments: [
      { from: [position(30), axisY], to: [position(90), axisY], emphasis: true },
      ...ticks.map((db) => ({ from: [position(db), axisY] as Point, to: [position(db), axisY + 10] as Point })),
      ...[firstLevel, secondLevel].map((db) => ({ from: [position(db), axisY - 2] as Point, to: [position(db), 82 + topSpace] as Point, emphasis: true })),
    ],
    labels: [
      ...ticks.map((db) => ({ at: [position(db), 175 + topSpace] as Point, text: String(db) })),
      { at: [320, 248 + topSpace], text: "Ses düzeyi (dB)" },
      { at: [position(firstLevel), 70 + topSpace], text: "X" },
      { at: [position(secondLevel), 70 + topSpace], text: "Y" },
    ],
  };
}
const comparison = soundScale(68);

export const soundLevelQuestionFigures = {
  figure: {
    kind: "geometry",
    title: "X ve Y’nin ses düzeyleri",
    alt: "Ses düzeyi eksenindeki X işareti 50 dB, Y işareti 70 dB. Eksen 30 ile 90 dB arasında 10 dB aralıklı.",
    ...soundScale(),
  } satisfies Geometry,
  hintFigure: {
    kind: "geometry",
    title: "Ölçekte bir adım",
    alt: "Ardışık 50 ve 60 dB işaretleri arasında 10 dB yazıyor.",
    viewBox: [0, 0, 380, 142],
    segments: [
      { from: [68, 82], to: [312, 82], emphasis: true },
      { from: [68, 73], to: [68, 91] },
      { from: [312, 73], to: [312, 91] },
    ],
    labels: [{ at: [68, 118], text: "50 dB" }, { at: [312, 118], text: "60 dB" }, { at: [190, 66], text: "10 dB" }],
  } satisfies Geometry,
  stepFigures: [
    {
      kind: "geometry",
      title: "İki işaret arasındaki 20 dB",
      alt: "50 dB’deki X ve 70 dB’deki Y işaretlerinin arasında 20 dB’lik fark çizgisi var.",
      ...comparison,
      segments: [...comparison.segments,
        { from: [position(firstLevel), 75], to: [position(secondLevel), 75], dashed: true },
        { from: [position(firstLevel), 68], to: [position(firstLevel), 82] },
        { from: [position(secondLevel), 68], to: [position(secondLevel), 82] },
      ],
      labels: [...comparison.labels, { at: [position(60), 59], text: "20 dB" }],
    } satisfies Geometry,
    {
      kind: "table",
      title: "Her 10 dB için şiddet çarpanı",
      alt: "İki ayrı 10 dB adımında şiddet onar kat artar. İki çarpanın çarpımı yüz.",
      headers: ["Adım", "Düzey aralığı", "Şiddet çarpanı"],
      rows: [["İlk", "50–60 dB", "10"], ["İkinci", "60–70 dB", "10"], ["Toplam", "50–70 dB", String(ratio)]],
    } satisfies SourceQuestionFigureSpec,
  ],
};
