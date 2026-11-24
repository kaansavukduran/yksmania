import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Point = readonly [number, number];

const sampleMass = 36;
const molarMass = 18;
const amount = sampleMass / molarMass;

export const molarMassQuestionFigures = {
  figure: {
    kind: "table",
    title: "Su örneğinin verilenleri",
    alt: "Örnek kütlesi 36 gram, molar kütle 18 gram bölü mol. Aranan suyun madde miktarı.",
    headers: ["Büyüklük", "Değer"],
    rows: [["Örnek kütlesi, m", `${sampleMass} g`], ["Molar kütle, M", `${molarMass} g/mol`], ["Madde miktarı, n", "? mol"]],
  },
  hintFigure: {
    kind: "math",
    title: "Kütle ve molar kütleyi ilişkilendir",
    alt: "Madde miktarı, örnek kütlesinin molar kütleye bölümüdür.",
    expression: {
      kind: "row",
      items: [
        { kind: "text", text: "n =" },
        { kind: "fraction", numerator: { kind: "text", text: "m" }, denominator: { kind: "text", text: "M" } },
      ],
    },
  },
  stepFigures: [
    {
      kind: "table",
      title: "Bir mol ile örneği karşılaştır",
      alt: "Bir mol su 18 gramdır. 36 gramlık örneğin mol sayısını bulmak için bu kütleleri karşılaştır.",
      headers: ["Su", "Kütle", "Madde miktarı"],
      rows: [["Birim miktar", `${molarMass} g`, "1 mol"], ["Örnek", `${sampleMass} g`, "? mol"]],
    },
    {
      kind: "math",
      title: "Gramları sadeleştir",
      alt: `${sampleMass} gram bölü ${molarMass} gram bölü mol eşittir ${amount} mol. Gramlar sadeleşir.`,
      expression: {
        kind: "row",
        items: [
          { kind: "text", text: "n =" },
          {
            kind: "fraction",
            numerator: { kind: "text", text: `${sampleMass} g` },
            denominator: { kind: "text", text: `${molarMass} g/mol` },
          },
          { kind: "text", text: `= ${amount} mol` },
        ],
      },
    },
    {
      kind: "math",
      title: "Örnek kütlesine geri dön",
      alt: `${amount} mol ile ${molarMass} gram bölü mol çarpılınca ${sampleMass} gram bulunur.`,
      expression: { kind: "text", text: `${amount} mol × ${molarMass} g/mol = ${sampleMass} g` },
    },
  ],
} satisfies { figure: SourceQuestionFigureSpec; hintFigure: SourceQuestionFigureSpec; stepFigures: SourceQuestionFigureSpec[] };

const latitude = 35;
const declination = -23.5;
const distance = Math.abs(latitude - declination);
const altitude = 90 - distance;
const degrees = (value: number) => `${String(value).replace("-", "−").replace(".", ",")}°`;
function end([x, y]: Point, angle: number, length: number): Point {
  const radians = angle * Math.PI / 180;
  return [x + length * Math.cos(radians), y - length * Math.sin(radians)];
}
const center: Point = [145, 138];
const radius = 75;
const observer = end(center, latitude, radius);
const subsolar = end(center, declination, radius);

function meridian(stage: "givens" | "hint" | "difference"): Geometry {
  const showDifference = stage === "difference";
  return {
    kind: "geometry",
    viewBox: [0, 0, 405, 258],
    title: showDifference ? "Ekvatorun iki yanındaki açısal fark" : stage === "hint" ? "Ekvatoru işaret sınırı olarak oku" : "Öğle kesitinde verilen iki enlem",
    alt: showDifference
      ? `P noktası ekvatorun ${degrees(latitude)} kuzeyinde, dik ışın noktası ${degrees(-declination)} güneyindedir. Merkezdeki iki yarıçap arası ${degrees(distance)}.`
      : `P +${degrees(latitude)} kuzeyde. S ${degrees(declination)} güneydeki dik ışın noktası. Ekvator 0°.`,
    circles: [{ center, radius }],
    segments: [
      { from: [55, center[1]], to: [244, center[1]], dashed: true, emphasis: stage === "hint" },
      { from: center, to: observer },
      { from: center, to: subsolar },
    ],
    points: [{ at: observer }, { at: subsolar }],
    arcs: showDifference ? [{ center, radius: 42, start: declination, degrees: distance }] : [],
    labels: [
      { at: [219, 66], text: `P +${degrees(latitude)}`, anchor: "start" },
      { at: [205, 224], text: `S ${degrees(declination)}`, anchor: "start" },
      { at: [14, 124], text: "0°", anchor: "start" },
      ...(showDifference ? [{ at: [256, 136] as Point, text: degrees(distance), anchor: "start" as const }] : []),
    ],
  };
}

const horizonOrigin: Point = [103, 183];
const horizon: Geometry = {
  kind: "geometry",
  title: "Ufuktan Güneş’e ölçülen yükseklik",
  alt: `Yatay ufuktan Güneş doğrultusuna ${degrees(altitude)}; oradan düşey başucu yönüne ${degrees(distance)}. İkisi toplam 90 derecedir.`,
  viewBox: [0, 0, 415, 248],
  segments: [
    { from: [28, horizonOrigin[1]], to: [374, horizonOrigin[1]] },
    { from: horizonOrigin, to: end(horizonOrigin, 90, 119), dashed: true },
    { from: horizonOrigin, to: end(horizonOrigin, altitude, 188), emphasis: true },
  ],
  arcs: [
    { center: horizonOrigin, radius: 100, start: 0, degrees: altitude },
    { center: horizonOrigin, radius: 47, start: altitude, degrees: distance },
  ],
  labels: [
    { at: [85, 48], text: "Başucu", anchor: "middle" },
    { at: [335, 75], text: "Güneş", anchor: "middle" },
    { at: [335, 220], text: "Ufuk", anchor: "middle" },
    { at: [259, 166], text: degrees(altitude), anchor: "start" },
    { at: [132, 87], text: degrees(distance), anchor: "start" },
  ],
};

export const solarAltitudeQuestionFigures = {
  figure: meridian("givens"),
  hintFigure: meridian("hint"),
  stepFigures: [
    {
      kind: "table",
      title: "İşaretleri verilenlerle eşleştir",
      alt: "Gözlemci 35 derece kuzeyde, dik ışın 23,5 derece güneydedir.",
      headers: ["Konum", "İşaretli enlem"],
      rows: [["Gözlemci", `+${degrees(latitude)}`], ["Dik ışın", degrees(declination)]],
    },
    meridian("difference"),
    horizon,
  ],
} satisfies { figure: SourceQuestionFigureSpec; hintFigure: SourceQuestionFigureSpec; stepFigures: SourceQuestionFigureSpec[] };
