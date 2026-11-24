import { txt, type Question } from "../domain/model";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";
import { pointSourceIlluminance } from "./mebiPointSourcePlane";

const intensityCd = 80;
const normalM = 4;
const dropM = 3;
const normal = pointSourceIlluminance({ intensityCd, normalM, offsetM: 0 });
const oblique = pointSourceIlluminance({ intensityCd, normalM, offsetM: dropM });
const ratio = normalM ** 3 + "/" + oblique.distanceM ** 3;
const distanceRatio = normalM ** 2 + "/" + oblique.distanceM ** 2;
const cosine = normalM + "/" + oblique.distanceM;
const formatLux = (lux: number) => lux.toLocaleString("tr-TR", { maximumFractionDigits: 2 }) + " lx";

export const pointIlluminanceQuestion = {
  id: "isik-bilgisi-ayni-duvarda-iki-alici",
  prompt: txt("Noktasal kaynak A ve B yönlerinde aynı ışık şiddetiyle ışık yayıyor. Duvardaki iki küçük alıcıya gelen ışığı şekilden incele. A’nın aydınlanması, B’nin aydınlanmasının kaç katıdır?"),
  options: [cosine, distanceRatio, ratio, "1", oblique.distanceM ** 3 + "/" + normalM ** 3].map(txt),
  answer: 2,
  hint: txt("A’ya uzanan eğik yolu bir dik üçgenin kenarı olarak düşün. Eğik ışın ile duvara dik kesik çizgi arasındaki açıyı bul."),
  explanation: txt(`B’ye ışık dik gelir ve aydınlanma ${formatLux(normal.illuminanceLux)} olur. A’da ${oblique.distanceM} m’lik yol ve ${cosine} kosinüs birlikte kullanılır. Aydınlanma ${formatLux(oblique.illuminanceLux)}, A/B oranı ${ratio}.`),
  guidance: {
    knowledge: [
      "I, ışık şiddetidir ve candela (cd) ile ölçülür. E, yüzeyin aydınlanmasıdır ve lüks (lx) ile ölçülür.",
      "Noktasal kaynakta E = I cos θ / d². d, kaynaktan alıcıya olan uzaklık. θ, ışın ile duvara dik normal arasındaki açı.",
    ],
    strategy: "İki alıcı için uzaklık ve normal açısını ayrı belirle. Formülü her alıcıya uygula, sonra A’daki değeri B’dekine böl.",
    steps: [
      `A’ya uzanan ışın, kenarları ${normalM} m ve ${dropM} m olan dik üçgenin hipotenüsü. d = √(${normalM}² + ${dropM}²) = ${oblique.distanceM} m. A’da komşu kenar ${normalM} m olduğundan cos θ = ${cosine}. B’ye gelen ışın normale paralel, cos 0° = 1.`,
      `B için E = ${intensityCd} / ${normalM}² = ${formatLux(normal.illuminanceLux)}. A için E = ${intensityCd} × (${cosine}) / ${oblique.distanceM}² = ${formatLux(oblique.illuminanceLux)}. A/B = (${cosine}) × (${distanceRatio}) = ${ratio}.`,
    ],
    optionReasons: [
      "Yalnızca A’daki normal açısının kosinüsünü aldın. İki alıcının kaynak uzaklıkları da farklı.",
      "Uzaklıkların karelerini doğru karşılaştırdın. A’daki eğik gelişin kosinüsünü de çarp.",
      "A’daki eğik geliş çarpanı ile iki uzaklığın karelerinden gelen çarpan birlikte yer alıyor.",
      "Kaynağın yönlere eşit ışık şiddeti göndermesi, alıcıların aynı aydınlanmayı ölçmesini gerektirmez.",
      "Bu oran B’nin aydınlanmasını A’nın aydınlanmasına böler. Sıra A/B olmalı.",
    ],
    commonError: "Kaynaktan A’ya uzanan ışını ölç. Duvara dik uzaklık B’ye giden yoldur.",
    check: "A daha uzakta ve ışığı eğik alıyor. A/B oranı 1’den küçük olmalı. Oranın birimi yoktur.",
  },
  skill: "Aynı yüzeyde iki noktanın aydınlanmasını ışın geometrisiyle karşılaştırma",
} satisfies Question;

type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
const origin = [128, 119] as const;
const metre = 82;
const b = [origin[0] + normalM * metre, origin[1]] as const;
const a = [b[0], b[1] + dropM * metre] as const;
const rays = {
  viewBox: [0, 0, 620, 436],
  points: [{ at: origin, emphasis: true }, { at: b }, { at: a }],
  segments: [
    { from: [b[0], 49], to: [b[0], 403] },
    { from: origin, to: b, emphasis: true },
    { from: origin, to: a, emphasis: true },
  ],
  labels: [
    { at: [origin[0], 90], text: `${intensityCd} cd` },
    { at: [b[0] + 62, 52], text: "Duvar" },
    { at: [b[0] + 23, b[1] + 8], text: "B" },
    { at: [a[0] + 23, a[1] + 8], text: "A" },
    { at: [(origin[0] + b[0]) / 2, b[1] - 16], text: `${normalM} m` },
    { at: [a[0] + 55, (b[1] + a[1]) / 2], text: `${dropM} m` },
  ],
} satisfies Pick<Geometry, "viewBox" | "points" | "segments" | "labels">;

function normalDrawing(solved: boolean): Pick<Geometry, "viewBox" | "points" | "segments" | "labels" | "arcs"> {
  return {
    ...rays,
    segments: [...rays.segments, { from: [a[0] - 170, a[1]], to: a, dashed: true }],
    arcs: [{ center: a, radius: 113, start: 180 - oblique.angleDeg, degrees: oblique.angleDeg }],
    labels: [
      ...rays.labels,
      { at: [a[0] - 137, a[1] - 40], text: "θ" },
      { at: [a[0] - 110, a[1] + 32], text: "Normal" },
      { at: [240, 280], text: solved ? `${oblique.distanceM} m` : "d" },
    ],
  };
}

export const pointIlluminanceQuestionFigures = {
  figure: {
    ...rays,
    kind: "geometry",
    title: "Duvardaki iki ışık alıcısı",
    alt: `${intensityCd} cd’lik ışık kaynağı B’nin ${normalM} m solundadır. A, aynı duvarda B’nin ${dropM} m altındadır. Kaynaktan B’ye yatay, A’ya eğik bir ışın ulaşır.`,
  } satisfies Geometry,
  hintFigure: {
    ...normalDrawing(false),
    kind: "geometry",
    title: "A noktasının normalini bul",
    alt: "A’dan sola uzanan kesik yatay çizgi duvara diktir. d, kaynağı A’ya birleştiren eğik kenardır. θ, kesik çizgi ile eğik ışın arasındadır.",
  } satisfies Geometry,
  stepFigures: [
    {
      ...normalDrawing(true),
      kind: "geometry",
      title: "Kaynaktan A’ya eğik uzaklık",
      alt: `${normalM} m ve ${dropM} m dik kenarları ${oblique.distanceM} m hipotenüsü verir. A’daki normal açısında ${normalM} m’lik kenar komşu kenardır.`,
    } satisfies Geometry,
    {
      kind: "table",
      title: "Uzaklık ve geliş açısı birlikte",
      alt: "Alıcıların ışık yolu, normal açısı ve ölçülen aydınlanması",
      headers: ["Alıcı", "Uzaklık", "cos θ", "Aydınlanma"],
      rows: [
        ["A", `${oblique.distanceM} m`, cosine, formatLux(oblique.illuminanceLux)],
        ["B", `${normal.distanceM} m`, "1", formatLux(normal.illuminanceLux)],
      ],
    } satisfies SourceQuestionFigureSpec,
  ],
};
