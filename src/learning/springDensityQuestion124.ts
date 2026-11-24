import { txt, type Question } from "../domain/model";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

const data = [
  { label: "A", massG: 120, lengthM: 6 },
  { label: "B", massG: 120, lengthM: 1.5 },
] as const;
const tensionN = 2;
const decimals = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });
const mu = (massG: number, lengthM: number) => massG / 1000 / lengthM;

export const springDensityQuestion = {
  id: "yay-dalgalari-esit-kutle-yogunluk-cizimi",
  prompt: txt("Şekildeki A ve B yayları aynı kuvvetle geriliyor. Kütleleri eşit, boyları farklı. İdeal yay modelinde atma süratlerinin oranı vA / vB kaçtır?"),
  options: ["1/4", "1/2", "1", "2", "4"].map(txt),
  answer: 3,
  hint: txt("Her yay için toplam kütleyi uzunluğa böl. Sürat oranında ortak olan gerilme kuvvetine dikkat et."),
  explanation: txt("A’da μ = 0,02 kg/m, B’de μ = 0,08 kg/m. Ortak F = 2 N ile A’da sürat 10 m/s, B’de 5 m/s. İstenen vA / vB = 2."),
  skill: "Yay çiziminden boyca kütle yoğunluğu ve sürat oranı",
  guidance: {
    knowledge: ["Boyca kütle yoğunluğu μ = m / L, birimi kg/m. İdeal yayda v = √(F / μ)."],
    strategy: "Kütleler eşitken önce boyca kütle yoğunluklarını karşılaştır. Ardından süratleri aynı kuvvetle hesapla.",
    steps: [
      "Her iki yayın kütlesi 0,120 kg. A’nın boyu 6 m ve μA = 0,120 / 6 = 0,02 kg/m. B’nin boyu 1,5 m ve μB = 0,120 / 1,5 = 0,08 kg/m.",
      "vA = √(2 / 0,02) = 10 m/s ve vB = √(2 / 0,08) = 5 m/s. Bu sırayla böldüğümüzde vA / vB = 2.",
    ],
    optionReasons: [
      "1/4, yoğunlukların μA / μB oranı. Süratte yoğunluğun ters oranının karekökü kullanılır.",
      "1/2, vB / vA oranı. Soru vA / vB istiyor.",
      "Kütleler eşit, fakat uzunluklar farklı. İki yayda metre başına aynı kütle düşmez.",
      "A yayında sürat 10 m/s, B yayında 5 m/s. İstenen oran 10 / 5 = 2.",
      "4, μB / μA oranı. Süratler oranı için bunun karekökü alınır.",
    ],
    commonError: "Toplam kütleyi sürat hesabına doğrudan koyma. Bir metre yaya düşen kütleyi bul.",
    check: "A daha uzun ve daha küçük μ değerine sahip. Aynı kuvvette A’nın sürati daha büyük, oran 1’den büyük olmalı.",
  },
} satisfies Question;

type Point = readonly [number, number];
const left = 65;
const pixelPerM = 28;
const rows = data.map((item, index) => ({ ...item, y: 96 + 220 * index, right: left + item.lengthM * pixelPerM }));
const coil = (y: number, right: number) => {
  const segments = Math.max(6, Math.round((right - left) / 8));
  const points = Array.from({ length: segments + 1 }, (_, index): Point => [
    left + index * (right - left) / segments,
    y + (index === 0 || index === segments ? 0 : index % 2 ? -5 : 5),
  ]);
  return points.slice(1).map((to, index) => ({ from: points[index], to }));
};

export const springDensityQuestionFigures = {
  figure: {
    kind: "geometry",
    title: "A ve B yaylarında uzunluk, kütle ve gerilim",
    alt: "A yayı 6 metre ve 120 gram. B yayı 1,5 metre ve 120 gram. İki yayda sağa bakan 2 newtonluk eşit gerilme okları var.",
    viewBox: [-12, -40, 380, 480],
    segments: rows.flatMap(({ right, y }) => [
      ...coil(y, right),
      { from: [left - 5, y - 11], to: [left - 5, y + 11] },
      { from: [right + 5, y], to: [right + 29, y], emphasis: true },
      { from: [right + 29, y], to: [right + 22, y - 4], emphasis: true },
      { from: [right + 29, y], to: [right + 22, y + 4], emphasis: true },
      { from: [left, y + 26], to: [right, y + 26] },
      { from: [left, y + 21], to: [left, y + 31] },
      { from: [right, y + 21], to: [right, y + 31] },
    ]),
    labels: rows.flatMap(({ label, right, y, lengthM, massG }) => [
      { at: [16, y + 8], text: label },
      { at: [(left + right) / 2, y - 66], text: `${massG} g` },
      { at: [(left + right) / 2, y + 82], text: `${decimals.format(lengthM)} m` },
      { at: [right + 74, y + 8], text: `${tensionN} N` },
    ]),
  },
  hintFigure: {
    kind: "table",
    title: "Her yay için önce metre başına kütle",
    alt: "Kütle kilogram, uzunluk metre cinsinde yazılır. Kütle uzunluğa bölünür.",
    headers: ["Verilen", "Kullanılacak birim"],
    rows: [["Toplam kütle", "kg"], ["Yay uzunluğu", "m"], ["Kütle ÷ uzunluk", "kg/m"]],
  },
  stepFigures: [
    {
      kind: "table",
      title: "Boyca kütle yoğunlukları",
      alt: "İki kütle de 0,12 kilogram. Uzunluklara bölünce A için 0,02 ve B için 0,08 kilogram bölü metre.",
      headers: ["Yay", "Kütle", "Uzunluk", "μ"],
      rows: data.map(({ label, massG, lengthM }) => [
        label, `${decimals.format(massG / 1000)} kg`, `${decimals.format(lengthM)} m`, `${decimals.format(mu(massG, lengthM))} kg/m`,
      ]),
    },
    {
      kind: "table",
      title: "Süratleri aynı kuvvetle hesapla",
      alt: "İki kuvvet 2 newton. A 10 metre bölü saniye, B 5 metre bölü saniye. A’nın B’ye oranı 2.",
      headers: ["Yay", "F", "Sürat"],
      rows: data.map(({ label, massG, lengthM }) => [
        label, `${tensionN} N`, `${decimals.format(Math.sqrt(tensionN / mu(massG, lengthM)))} m/s`,
      ]),
    },
  ],
} satisfies { figure: SourceQuestionFigureSpec; hintFigure: SourceQuestionFigureSpec; stepFigures: readonly SourceQuestionFigureSpec[] };
