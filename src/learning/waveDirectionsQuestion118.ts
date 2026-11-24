import { txt, type Question } from "../domain/model";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const waveDirectionsQuestion = {
  id: "dalgalara-giris-titresim-yonu-cizimleri",
  prompt: txt("A ve B düzeneklerinde düz ok dalganın ilerleme yönünü, çift uçlu ok bir noktanın titreşim doğrultusunu gösteriyor. Dalgaların türü sırasıyla nedir?"),
  options: ["Boyuna, enine", "Enine, enine", "Boyuna, boyuna", "Enine, boyuna", "İki dalga da sınıflandırılamaz"].map(txt),
  answer: 3,
  hint: txt("Her düzenekte önce ilerleme okunu bul. Titreşim oku onunla aynı doğrultuda mı, ona dik mi?"),
  explanation: txt("A’da titreşim düşey, ilerleme yataydır. Bu iki doğrultu diktir, dalga eninedir. B’de titreşim ve ilerleme yatay doğrultudadır. B boyuna dalgadır."),
  skill: "Dalganın çiziminden titreşim doğrultusunu sınıflandırma",
  guidance: {
    knowledge: ["Enine dalgada titreşim ve yayılma doğrultuları birbirine diktir. Boyuna dalgada bu doğrultular paraleldir."],
    strategy: "Her düzeneğin iki okunu kendi içinde karşılaştır.",
    steps: ["A’da sağa giden ilerleme okunun doğrultusu yataydır. Çift uçlu titreşim oku düşey, iki doğrultu diktir. A eninedir.", "B’de çift uçlu titreşim oku ile sağa giden ilerleme oku aynı yatay doğrultudadır. B boyunadır."],
    optionReasons: [
      "Bu sıra ters. A’nın titreşim oku ilerlemeye dik, B’ninki paralel.",
      "A enine. B’nin çift uçlu oku düşey olsaydı ilerlemeye dik olurdu, çizimde yatay.",
      "B boyuna. A’nın iki oku aynı doğrultuda olsaydı A da boyuna olurdu, çizimde diktir.",
      "A’nın iki doğrultusu dik, B’nin iki doğrultusu paralel. Sıra enine ve boyuna.",
      "İki düzeneğin de ilerleme oku ve titreşim doğrultusu çizimde verilmiş. Bu karşılaştırma sınıflandırma için yeterli.",
    ],
    commonError: "Yalnız ilerleme oklarına bakarsan ikisini de aynı tür sanabilirsin. İki ok arasındaki doğrultu ilişkisini karşılaştır.",
    check: "A için yatay ve düşey, B için yatay ve yatay. Bu iki ilişki yanıtla uyuşuyor.",
  },
} satisfies Question;

type Point = readonly [number, number];
function arrow(from: Point, to: Point, emphasized = false) {
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
  const edge = (offset: number): Point => [to[0] - 8 * Math.cos(angle + offset), to[1] - 8 * Math.sin(angle + offset)];
  return [{ from, to, emphasis: emphasized }, { from: to, to: edge(0.6), emphasis: emphasized }, { from: to, to: edge(-0.6), emphasis: emphasized }];
}

const transverse = Array.from({ length: 49 }, (_, i): Point => [103 + i * 3.1, 87 + 15 * Math.sin(i * Math.PI / 12)]);
const spring = [111, 122, 132, 150, 157, 164, 183, 201, 212, 219, 226, 244];

export const waveDirectionsFigures = {
  figure: {
    kind: "geometry",
    title: "A ve B’de ilerleme ve titreşim okları",
    alt: "A’da sağa ilerleme oku ve yukarı-aşağı çift uçlu titreşim oku var. B’de sağa ilerleme oku ve sola-sağa çift uçlu titreşim oku var.",
    viewBox: [-16, -26, 338, 298],
    segments: [
      ...arrow([103, 42], [254, 42]), ...arrow([103, 166], [254, 166]),
      ...arrow([56, 86], [56, 58], true), ...arrow([56, 86], [56, 114], true),
      ...arrow([56, 211], [28, 211], true), ...arrow([56, 211], [84, 211], true),
      ...transverse.slice(1).map((point, index) => ({ from: transverse[index], to: point })),
      ...spring.map((x) => ({ from: [x, 197] as Point, to: [x, 225] as Point })),
    ],
    labels: [
      { at: [32, 38], text: "A" }, { at: [180, 24], text: "İlerleme" },
      { at: [32, 161], text: "B" }, { at: [180, 149], text: "İlerleme" },
    ],
  },
  hintFigure: {
    kind: "geometry",
    title: "İki doğrultuyu karşılaştır",
    alt: "Solda birbirine dik iki çizgi var. Sağda birbirine paralel iki yatay çizgi var.",
    viewBox: [0, 0, 290, 110],
    segments: [
      { from: [37, 45], to: [112, 45] }, { from: [74, 16], to: [74, 74], emphasis: true },
      { from: [179, 35], to: [254, 35] }, { from: [179, 58], to: [254, 58], emphasis: true },
    ],
    labels: [{ at: [75, 95], text: "Dik" }, { at: [217, 95], text: "Paralel" }],
  },
  stepFigures: [
    { kind: "table", title: "A düzeneğinde doğrultular", alt: "İlerleme yatay, titreşim düşey. Dik doğrultular.", headers: ["İlerleme", "Titreşim", "İlişki"], rows: [["Yatay", "Düşey", "Dik"]] },
    { kind: "table", title: "B düzeneğinde doğrultular", alt: "İlerleme yatay, titreşim yatay. Paralel doğrultular.", headers: ["İlerleme", "Titreşim", "İlişki"], rows: [["Yatay", "Yatay", "Paralel"]] },
  ],
} satisfies { figure: SourceQuestionFigureSpec; hintFigure: SourceQuestionFigureSpec; stepFigures: readonly SourceQuestionFigureSpec[] };
