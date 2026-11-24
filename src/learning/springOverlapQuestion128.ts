import { txt, type Question } from "../domain/model";
import { pulseProfile } from "./forge011Physics";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

const displacementCm = { K: 4, L: -4 } as const;
const width = 78;
const axisY = 145;
const pixelsPerCm = 16;

export const springOverlapQuestion = {
  id: "yay-dalgalari-tepe-cukur-karsilasma-sekli",
  prompt: txt("Şekildeki K ve L atmaları aynı genişlikte ve birbirine doğru ilerliyor. Atmaların merkezleri O’da tam üst üste geldiğinde yay nasıl görünür? Atmalar ayrıldığında ne olur?"),
  options: [
    "Yay düz görünür. İki atma da kalıcı olarak kaybolur.",
    "O’da 8 cm’lik tepe oluşur. Atmalar ayrılıp eski yönlerinde ilerler.",
    "Yay düz görünür. K sağa, L sola kendi biçimini koruyarak gider.",
    "O’da 8 cm’lik çukur oluşur. Atmalar birleşip tek çukur olarak gider.",
    "Yay düz görünür. İki atma O’dan geri döner.",
  ].map(txt),
  answer: 2,
  hint: txt("Denge çizgisinin üstünü artı, altını eksi al. Tam karşılaşma anını sonraki hareketten ayrı düşün."),
  explanation: txt("K’nın +4 cm uzanımı ve L’nin −4 cm uzanımı tam üst üste geldiklerinde birbirini dengeler. Atmalar ayrılınca K tepe olarak sağa, L çukur olarak sola devam eder."),
  skill: "Şekilden atma uzanımlarının işaretini ve girişim sonrasını belirleme",
  guidance: {
    knowledge: ["Uzanım, yayın denge çizgisine göre yer değiştirmesidir. Aynı zaman ve konumdaki uzanımlar işaretleriyle toplanır."],
    strategy: "Önce O’daki ortak anı hesapla. Sonra çizimdeki ilk hareket oklarından hangi atmanın hangi tarafa gideceğini izle.",
    steps: [
      "K tepesi +4 cm, L çukuru −4 cm uzanım verir. O’da +4 + (−4) = 0 cm. İdeal modelde iki atmanın biçimleri simetrik olduğu için tam karşılaşma anında yay tamamıyla düz görünür.",
      "Her atma üst üste binmiş bölgeden kendi yönünde çıkar. K sağda yine tepe, L solda yine çukurdur.",
    ],
    optionReasons: [
      "Sıfır uzanım, aynı andaki iki etkinin toplamıdır. İki atma daha sonra ayrı ayrı görülür.",
      "8 cm, iki büyüklüğün işaretsiz toplamıdır. L aşağıda olduğu için uzanımı −4 cm.",
      "Uzanımlar o anda sıfır eder. Sonra K sağa ve L sola kendi biçimiyle gider.",
      "Her iki atmanın uzanımı negatif olsaydı 8 cm’lik çukur oluşabilirdi. K’nın uzanımı pozitiftir.",
      "Atmaların karşılaşmasında bir uç veya farklı yay sınırı yok. K sağa, L sola devam eder.",
    ],
    commonError: "Tam karşılaşma anındaki düz çizgiyi, atmaların hareketinin bitmesi olarak yorumlama.",
    check: "Son çizimde K başlangıca göre sağda, L solda olmalı. Genlik ve genişlikleri ilk çizimdekiyle aynıdır.",
  },
} satisfies Question;

type Figure = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Segments = NonNullable<Figure["segments"]>;
type Labels = NonNullable<Figure["labels"]>;
const axis: Segments[number] = { from: [24, axisY], to: [336, axisY], dashed: true };
const pointY = (height: number) => axisY - pixelsPerCm * height;

function outline(center: number, heightCm: number): Segments {
  const points = Array.from({ length: 25 }, (_, i) => {
    const x = center + (i / 24 - 1 / 2) * width;
    return [x, pointY(pulseProfile(x, center, width, heightCm))] as const;
  });
  return points.slice(1).map((to, i) => ({ from: points[i], to, emphasis: true }));
}

function travelArrow(center: number, direction: -1 | 1): Segments {
  const y = -4;
  const end = center + 34 * direction;
  return [
    { from: [center - 22 * direction, y], to: [end, y] },
    { from: [end, y], to: [end - 8 * direction, y - 5] },
    { from: [end, y], to: [end - 8 * direction, y + 5] },
  ];
}

function pulses(k: number, l: number, heightLabels: boolean): Pick<Figure, "viewBox" | "segments" | "labels"> {
  const labels: Labels = [
    { at: [k, -38], text: "K", anchor: "middle" },
    { at: [l, -38], text: "L", anchor: "middle" },
    { at: [180, axisY + 49], text: "O", anchor: "middle" },
  ];
  return {
    viewBox: [0, -96, 360, 383],
    segments: [
      axis, { from: [180, axisY - 5], to: [180, axisY + 5] },
      ...travelArrow(k, 1), ...travelArrow(l, -1),
      ...outline(k, displacementCm.K), ...outline(l, displacementCm.L),
    ],
    labels: heightLabels ? [...labels,
      { at: [k, 68], text: "+4 cm", anchor: "middle" },
      { at: [l, 250], text: "−4 cm", anchor: "middle" },
    ] : labels,
  };
}

export const springOverlapQuestionFigures = {
  figure: {
    kind: "geometry",
    title: "Birbirine yaklaşan K ve L atmaları",
    alt: "Kesikli çizgi yayın denge konumu. O’nun solunda K tepesi, yukarıya 4 santimetre uzanıyor ve sağa ilerliyor. O’nun sağında L çukuru, aşağıya 4 santimetre uzanıyor ve sola ilerliyor. İki atma aynı genişlikte. Biri tepe, öteki aynı biçimde bir çukurdur.",
    ...pulses(84, 276, true),
  },
  hintFigure: {
    kind: "table",
    title: "Denge çizgisine göre uzanımın işareti",
    alt: "Denge çizgisinin üstündeki uzanım pozitiftir. Altındaki uzanım negatiftir.",
    headers: ["Konum", "Uzanımın işareti"],
    rows: [["Denge çizgisinin üstü", "Artı (+)"], ["Denge çizgisinin altı", "Eksi (−)"]],
  },
  stepFigures: [
    {
      kind: "table",
      title: "O noktasında işaretli uzanımları topla",
      alt: "K artı 4 santimetre, L eksi 4 santimetre. O’daki toplam 0 santimetre.",
      headers: ["K", "L", "O’daki toplam"],
      rows: [["+4 cm", "−4 cm", "0 cm"]],
    },
    {
      kind: "geometry",
      title: "Karşılaşmadan sonra K ve L’nin konumu",
      alt: "L solda çukur olarak sola, K sağda tepe olarak sağa ilerler. Genlik ve genişlikleri ilk çizimdekiyle aynıdır.",
      ...pulses(276, 84, false),
    },
  ],
} satisfies { figure: SourceQuestionFigureSpec; hintFigure: SourceQuestionFigureSpec; stepFigures: readonly SourceQuestionFigureSpec[] };
