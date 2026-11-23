import { txt, type Lesson, type Question } from "../domain/model";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";
import { placeLabels, type LabelReq, type Spot } from "./sectionFigures/labelPlacement";

type Point = readonly [number, number];
type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Segment = NonNullable<Geometry["segments"]>[number];
type Label = NonNullable<Geometry["labels"]>[number];

const add = ([x, y]: Point, [h, k]: Point): Point => [x + h, y + k];
const subtract = ([x, y]: Point, [h, k]: Point): Point => [x - h, y - k];
const number = (n: number) => n < 0 ? `−${-n}` : String(n);
const pair = ([x, y]: Point) => `(${number(x)}; ${number(y)})`;
const at = ([x, y]: Point): Point => [235 + 25 * x, 240 - 25 * y];
const viewBox = [0, 0, 448, 414] as const;
const axes: Segment[] = [
  { from: at([-6.5, 0]), to: at([7, 0]) },
  { from: at([0, -5]), to: at([0, 6.5]) },
  { from: at([6.65, 0.2]), to: at([7, 0]) },
  { from: at([6.65, -0.2]), to: at([7, 0]) },
  { from: at([-0.2, 6.15]), to: at([0, 6.5]) },
  { from: at([0.2, 6.15]), to: at([0, 6.5]) },
];
const axisLabels: Label[] = [
  { at: [429, 254], text: "x", anchor: "middle" },
  { at: [235, 51], text: "y", anchor: "middle" },
  { at: [266, 218], text: "0", anchor: "middle" },
];
function projections([x, y]: Point): Segment[] {
  return [
    { from: at([x, y]), to: at([x, 0]), dashed: true },
    { from: at([x, y]), to: at([0, y]), dashed: true },
  ];
}

const knownImage: Point = [-2, 4];
const imageShift: Point = [-6, 3];
const inverseShift: Point = [-imageShift[0], -imageShift[1]];
const original = subtract(knownImage, imageShift);
export const inverseTranslationQuestion = {
  id: "ayt-geo-ogm-oteleme-ters-071",
  prompt: txt("A noktası 6 birim sola ve 3 birim yukarı ötelenince grafikteki A′ noktası oluşuyor. İlk A noktasının koordinatları nedir?"),
  options: [pair(add(knownImage, imageShift)), pair(original), "(4; 7)", "(−2; 4)"].map((option) => txt(option)),
  answer: 1,
  hint: txt("Grafikten A′ konumunu oku. Başlangıca dönmek için her hareketi kendi ekseninde tersine çevir."),
  explanation: txt(`Grafikte A′${pair(knownImage)}. Geriye 6 birim sağa ve 3 birim aşağı git. A = ${pair(knownImage)} + ${pair(inverseShift)} = ${pair(original)}.`),
  skill: "Grafikten ters öteleme",
  guidance: {
    knowledge: ["Apsis yatay x, ordinat düşey y koordinatıdır. Grafikte kesikli yardımcı çizgiler, A′'nin iki koordinatını eksenlere taşır."],
    strategy: "Şekildeki konum görüntüdür. Başlangıcı aradığın için aynı vektörü görüntüden çıkar.",
    steps: [
      "A′'den inen çizgi x ekseninde −2'yi, yatay yardımcı çizgi y ekseninde 4'ü gösterir.",
      "6 birim sola hareketin tersi 6 sağa, 3 birim yukarının tersi 3 aşağıdır.",
      `A = (−2 + 6; 4 − 3) = ${pair(original)}.`,
    ],
    optionReasons: [
      "Geri dönmek yerine A′'ye ilk öteleme tekrar uygulanmış.",
      "İki bileşen de tersine çevrildi. A, (4; 1).",
      "Yatay bileşen tersine çevrildi. Düşeyde +3 yerine −3 gerekir.",
      "Bu nokta verilen görüntü A′. Aranan başlangıç konumu A.",
    ],
    commonError: "İlk hareketin yalnız bir bileşeninin işaretini değiştirme.",
    check: "(4; 1)'den 6 birim sola ve 3 birim yukarı git. (−2; 4) geri gelir.",
  },
} satisfies Question;

const inverseStem: Geometry = {
  kind: "geometry",
  title: "Ötelemeden sonra verilen nokta",
  alt: "Yatay x ekseni ve düşey y ekseni. A′ noktasının kesikli izdüşümleri x ekseninde eksi 2, y ekseninde 4.",
  caption: null,
  viewBox,
  segments: [...axes, ...projections(knownImage)],
  points: [{ at: at(knownImage), emphasis: true }],
  labels: [
    ...axisLabels,
    { at: [154, 120], text: "A′", anchor: "middle" },
    { at: [185, 304], text: number(knownImage[0]), anchor: "middle" },
    { at: [252, 119], text: number(knownImage[1]), anchor: "start" },
  ],
};
const corner: Point = [original[0], knownImage[1]];
export const inverseTranslationFigures = {
  figure: inverseStem,
  hintFigure: {
    kind: "table",
    title: "Geri dönmek için yönleri tersine çevir",
    alt: "Yatayda sola hareketin tersi sağa, düşeyde yukarı hareketin tersi aşağıdır.",
    headers: ["Eksen", "İlk hareket", "Geri dönüş"],
    rows: [["x", "Sola", "Sağa"], ["y", "Yukarı", "Aşağı"]],
  },
  stepFigures: [
    { ...inverseStem, title: "Görüntünün iki eksendeki değerini oku" },
    {
      kind: "math",
      title: "Ters öteleme vektörü",
      alt: "Geri dönüş vektörü yatay artı 6, düşey eksi 3.",
      expression: { kind: "text", text: `−v = ${pair(inverseShift)}` },
    },
    {
      ...inverseStem,
      title: "Grafikten başlangıca dönüş",
      alt: `A′${pair(knownImage)} noktasından 6 sağa ve 3 aşağı gidilince A${pair(original)} bulunur.`,
      segments: [
        ...inverseStem.segments!,
        { from: at(knownImage), to: at(corner), emphasis: true },
        { from: at([corner[0] - 0.32, corner[1] - 0.21]), to: at(corner), emphasis: true },
        { from: at([corner[0] - 0.32, corner[1] + 0.21]), to: at(corner), emphasis: true },
        { from: at(corner), to: at(original), emphasis: true },
        { from: at([original[0] - 0.21, original[1] + 0.32]), to: at(original), emphasis: true },
        { from: at([original[0] + 0.21, original[1] + 0.32]), to: at(original), emphasis: true },
      ],
      points: [...inverseStem.points!, { at: at(original), emphasis: true }],
      labels: [...inverseStem.labels!, { at: [352, 200], text: "A", anchor: "start" }],
    },
  ],
} satisfies { figure: Geometry; hintFigure: SourceQuestionFigureSpec; stepFigures: readonly SourceQuestionFigureSpec[] };

const initialTriangle = [[-4, 5], [-5, 1], [-1, 3]] as const;
const triangleShift: Point = [3, -4];
const translatedTriangle = initialTriangle.map((vertex) => add(vertex, triangleShift));
const vertices = ["A", "B", "C"] as const;
const pointsText = (points: readonly Point[]) => points.map(pair).join(", ");
export const triangleTranslationQuestion = {
  id: "ayt-geo-ogm-oteleme-ucgen-071",
  prompt: txt(`ABC üçgeninin köşeleri sırayla ${pointsText(initialTriangle)}. Üçgen 3 birim sağa ve 4 birim aşağı öteleniyor. Sırasıyla A′, B′ ve C′ hangileridir?`),
  options: [
    pointsText(initialTriangle.map((vertex) => add(vertex, [3, 4]))),
    pointsText(initialTriangle.map((vertex) => subtract(vertex, triangleShift))),
    pointsText(translatedTriangle),
    pointsText(initialTriangle.map((vertex) => add(vertex, [3, 0]))),
  ].map((option) => txt(option)),
  answer: 2,
  hint: txt("Her köşede aynı kuralı uygula. Önce değişen yatay koordinatı, sonra düşey koordinatı yaz."),
  explanation: txt(`Her köşede (x; y) → (x + 3; y − 4). Sonuç A′${pair(translatedTriangle[0])}, B′${pair(translatedTriangle[1])}, C′${pair(translatedTriangle[2])}.`),
  skill: "Üçgende üç köşeyi aynı vektörle taşıma",
  guidance: {
    knowledge: ["Ötelemede köşelerin adları birbirine karışmaz. A'nın görüntüsü A′, B'ninki B′, C'ninki C′ olur."],
    strategy: "3 sağa için x'e +3, 4 aşağı için y'ye −4 ekle. Aynı işlemi üç köşede yap.",
    steps: vertices.map((name, index) => {
      const [x, y] = initialTriangle[index];
      return `${name}′ = (${number(x)} + 3; ${number(y)} − 4) = ${pair(translatedTriangle[index])}.`;
    }),
    optionReasons: [
      "Düşeyde 4 birim aşağı yerine yukarı taşınmış.",
      "Her iki yönde de ters vektör uygulanmış.",
      `Her köşeye aynı (3; −4) vektörü eklenmiş. Sonuç ${pointsText(translatedTriangle)}.`,
      "Yatay hareket doğru. Düşey konumlar da 4 birim azalmalı.",
    ],
    commonError: "Yalnız bir köşeye veya yalnız yatay eksene öteleme uygulama.",
    check: "B′ − A′ = (−1; −4) ve B − A = (−1; −4). Karşılık gelen kenar yönü ve uzunluğu korundu.",
  },
} satisfies Question;

function triangleEdges(points: readonly Point[], emphasis = false): Segment[] {
  return points.map((point, index) => ({
    from: at(point),
    to: at(points[(index + 1) % points.length]),
    emphasis,
  }));
}
const triangleStem: Geometry = {
  kind: "geometry",
  title: "Öteleme öncesi ABC üçgeni",
  alt: "Koordinat düzleminde A eksi 4, 5. B eksi 5, 1. C eksi 1, 3. Çizgiler bu üç köşeyi birleştirir.",
  caption: null,
  viewBox,
  segments: [...axes, ...triangleEdges(initialTriangle)],
  points: initialTriangle.map((point) => ({ at: at(point) })),
  labels: [
    ...axisLabels,
    { at: [121, 94], text: "A", anchor: "middle" },
    { at: [78, 226], text: "B", anchor: "middle" },
    { at: [196, 113], text: "C", anchor: "middle" },
  ],
};
export const triangleTranslationFigures = {
  figure: triangleStem,
  hintFigure: {
    kind: "table",
    title: "Her köşe için aynı iki değişim",
    alt: "A, B ve C'nin her biri 3 birim sağa ve 4 birim aşağı taşınır.",
    headers: ["Köşe", "x değişimi", "y değişimi"],
    rows: vertices.map((name) => [name, "+3", "−4"]),
  },
  stepFigures: [
    ...vertices.slice(0, 2).map((name, index): SourceQuestionFigureSpec => {
      const equation = `${name}′ = ${pair(initialTriangle[index])} + ${pair(triangleShift)} = ${pair(translatedTriangle[index])}`;
      return { kind: "math", title: `${name} köşesini taşı`, alt: equation, expression: { kind: "text", text: equation } };
    }),
    {
      ...triangleStem,
      title: "Öteleme sonrası A′B′C′ üçgeni",
      alt: `Başlangıç üçgeni ve ötelenmiş üçgen. A′${pair(translatedTriangle[0])}, B′${pair(translatedTriangle[1])}, C′${pair(translatedTriangle[2])}. Eş köşe adları aynı vektör kadar yer değiştirdi.`,
      segments: [...triangleStem.segments!, ...triangleEdges(translatedTriangle, true)],
      points: [...triangleStem.points!, ...translatedTriangle.map((point) => ({ at: at(point), emphasis: true }))],
      labels: [
        ...triangleStem.labels!,
        { at: [186, 229], text: "A′", anchor: "end" },
        { at: [161, 355], text: "B′", anchor: "middle" },
        { at: [315, 311], text: "C′", anchor: "middle" },
      ],
    },
  ],
} satisfies { figure: Geometry; hintFigure: SourceQuestionFigureSpec; stepFigures: readonly SourceQuestionFigureSpec[] };

const gridCell = 21;
const gridAt = ([x, y]: Point): Point => [249 + gridCell * x, 244 - gridCell * y];
const gridSegments: Segment[] = [
  { from: gridAt([-8, 0]), to: gridAt([8, 0]) },
  { from: gridAt([0, -8]), to: gridAt([0, 8]) },
];
const gridLabels: Label[] = [
  { at: [450, 251], text: "x", anchor: "middle" },
  { at: [249, 52], text: "y", anchor: "middle" },
];
const ticks = [-5, 0, 5];
for (const n of ticks) {
  gridLabels.push(
    { at: [gridAt([n, 0])[0], 462], text: number(n), anchor: "middle" },
    { at: [67, gridAt([0, n])[1] + 8], text: number(n), anchor: "end" },
  );
}

function polygonOnGrid(title: string, vertices: readonly Point[], names: readonly string[], translated = false): Geometry {
  const suffix = translated ? "′" : "";
  const coordinates = vertices.map((point, index) => `${names[index]}${suffix}${pair(point)}`).join(", ");
  const outline = vertices.map((point, index) => ({
    from: gridAt(point), to: gridAt(vertices[(index + 1) % vertices.length]), emphasis: translated,
  }));
  const notch = !translated && names.length === 5 ? names.indexOf("D") : -1;
  const guide: Segment[] = notch < 0 ? [] : [{
    from: gridAt(vertices[notch]), to: gridAt([vertices[notch][0], -0.7]), dashed: true,
  }];
  const segments = [...gridSegments, ...guide, ...outline];
  const points = vertices.map((point) => ({ at: gridAt(point), emphasis: translated }));
  const baseRequests: LabelReq[] = gridLabels.map(({ at: [x, y], text, anchor }, key) => ({
    key, text, fs: 37, weight: 500, fixed: true, spots: [{ x, y, anchor: anchor ?? "middle", dy: 0 }],
  }));
  const requests: LabelReq[] = points.map(({ at: [x, y] }, index) => {
    const label = { key: index + gridLabels.length, text: `${names[index]}${suffix}`, fs: 37, weight: 500 };
    // Give the inward corner space below the horizontal axis at large text sizes.
    if (index === notch) {
      return { ...label, fixed: true, spots: [{ x, y: gridAt([0, -2.5])[1], anchor: "middle", dy: 0 }] };
    }
    const spots: Spot[] = [
      { x: x + 14, y: y - 8, anchor: "start", dy: 0 },
      { x: x - 14, y: y - 8, anchor: "end", dy: 0 },
      { x: x + 14, y: y + 28, anchor: "start", dy: 0 },
      { x: x - 14, y: y + 28, anchor: "end", dy: 0 },
      { x, y: y - 15, anchor: "middle", dy: 0 },
      { x, y: y + 44, anchor: "middle", dy: 0 },
      { x: x + 26, y: y + 10, anchor: "start", dy: 0 },
      { x: x - 26, y: y + 10, anchor: "end", dy: 0 },
      { x: x + 35, y: y + 32, anchor: "start", dy: 0 },
      { x: x - 35, y: y + 32, anchor: "end", dy: 0 },
      { x: x + 35, y: y - 20, anchor: "start", dy: 0 },
      { x: x - 35, y: y - 20, anchor: "end", dy: 0 },
      { x: x + 27, y: y + 58, anchor: "start", dy: 0 },
      { x: x - 27, y: y + 58, anchor: "end", dy: 0 },
      { x: x + 27, y: y - 34, anchor: "start", dy: 0 },
      { x: x - 27, y: y - 34, anchor: "end", dy: 0 },
    ];
    return { ...label, spots };
  });
  const placements = placeLabels(
    [...baseRequests, ...requests],
    segments.map(({ from, to }) => [...from, ...to]),
    points.map(({ at: [x, y] }) => ({ x0: x - 5, y0: y - 5, x1: x + 5, y1: y + 5 })),
    480,
    484,
  );
  const labels: Label[] = [...baseRequests, ...requests].map(({ key, text }) => {
    const { x, y, anchor } = placements.get(key)!.spot;
    return { at: [x, y], text, anchor };
  });
  return {
    kind: "geometry",
    title,
    alt: `Birim kareli koordinat düzlemi. ${translated ? "Ötelenen" : "Başlangıç"} köşeler ${coordinates}.`,
    caption: null,
    viewBox: [0, 0, 480, 484],
    grid: { from: gridAt([-8, 8]), to: gridAt([8, -8]), cell: gridCell },
    segments,
    labels,
    points,
  };
}

function polygonTranslation(
  page: number,
  name: string,
  vertices: readonly string[],
  start: readonly Point[],
  shift: Point,
  correctIndex: number,
) {
  const [h, k] = shift;
  const end = start.map((point) => add(point, shift));
  const right = { coordinates: end, reason: `İki bileşen bütün köşelere eklendi. Sonuç ${pointsText(end)}.` };
  const alternatives = [
    { vector: [-h, k] as Point, reason: "Yatay bileşenin işareti ters. Düşey hareket doğru." },
    { vector: [h, -k] as Point, reason: "Yatay hareket doğru. Düşey bileşenin işareti ters." },
    { vector: [-h, -k] as Point, reason: "İlk verilen ötelemenin ters vektörü uygulanmış." },
    { vector: [h, 0] as Point, reason: "Yalnız yatay hareket uygulanmış. Düşey bileşen de kullanılmalı." },
  ].map(({ vector, reason }) => ({ coordinates: start.map((point) => add(point, vector)), reason }));
  alternatives.splice(correctIndex, 0, right);
  const names = vertices.join(", ");
  const horizontal = h > 0 ? "sağa" : "sola";
  const vertical = k > 0 ? "yukarı" : "aşağı";
  const textVector = `${Math.abs(h)} birim ${horizontal}, ${Math.abs(k)} birim ${vertical}`;
  const equation = `${vertices[0]}′ = ${pair(start[0])} + ${pair(shift)} = ${pair(end[0])}`;
  const question = {
    id: `ayt-geo-ogm-oteleme-gorsel-${page}-071`,
    prompt: txt(`Şekildeki ${name} ${textVector} öteleniyor. ${vertices.map((vertex) => `${vertex}′`).join(", ")} köşelerinin koordinatları sırasıyla nedir?`),
    options: alternatives.map(({ coordinates }) => txt(pointsText(coordinates))),
    answer: correctIndex,
    hint: txt("Birim kareleri başlangıçtan say. Aynı yatay ve düşey hareketi her köşeye uygula."),
    explanation: txt(`${textVector} hareketin vektörü ${pair(shift)}. Her köşeye bu vektör eklenir. Sırayla ${pointsText(end)} elde edilir.`),
    skill: "Birim kareli düzlemde köşeleri öteleme",
    guidance: {
      knowledge: ["Eksenlerin kesişim noktası başlangıçtır. Her kare her iki eksende bir birimdir."],
      strategy: "Yatay hareket yalnız x'i, düşey hareket yalnız y'yi değiştirir. Köşe sırasını koru.",
      steps: [
        `Verilen yönlerden (Δx; Δy) = ${pair(shift)} yaz.`,
        `${equation}. İlk köşenin iki koordinatı da değişti.`,
        `Kalan köşelerde aynı işlemi yap. ${vertices.map((vertex, i) => `${vertex}′${pair(end[i])}`).join(", ")}.`,
      ],
      optionReasons: alternatives.map(({ reason }) => reason),
      commonError: "Yönü doğru okuduktan sonra köşelerden birinde farklı bir vektör kullanma.",
      check: `Görüntü köşelerine ${pair([-h, -k])} eklediğinde başlangıçtaki ${names} köşeleri geri gelir.`,
    },
  } satisfies Question;
  const figures = {
    figure: polygonOnGrid(`${name} · kaynakta verilen konum`, start, vertices),
    hintFigure: {
      kind: "table",
      title: `${name} · yönleri eksenlere yerleştir`,
      alt: `Yatay hareket ${textVector.split(", ")[0]}. Düşey hareket ${textVector.split(", ")[1]}.`,
      headers: ["Eksen", "Hareket"],
      rows: [["x", `${Math.abs(h)} birim ${horizontal}`], ["y", `${Math.abs(k)} birim ${vertical}`]],
    },
    stepFigures: [
      { kind: "math", title: "Hareketi vektör olarak yaz", alt: `Öteleme vektörü ${pair(shift)}.`, expression: { kind: "text", text: `(Δx; Δy) = ${pair(shift)}` } },
      { kind: "math", title: "İlk köşeyi taşı", alt: equation, expression: { kind: "text", text: equation } },
      polygonOnGrid(`${name} · ötelemeden sonraki konum`, end, vertices, true),
    ],
  } satisfies { figure: Geometry; hintFigure: SourceQuestionFigureSpec; stepFigures: readonly SourceQuestionFigureSpec[] };
  return { page, name, question, figures };
}

export const ogmGridTranslationExamples = [
  polygonTranslation(17, "ABCD dörtgeni", ["A", "B", "C", "D"], [[1, 1], [5, 3], [5, 6], [2, 6]], [-6, -7], 3),
  polygonTranslation(20, "ABC üçgeni", ["A", "B", "C"], [[3, 6], [1, 2], [5, 4]], [2, -4], 0),
  polygonTranslation(22, "ABCDE beşgeni", ["A", "B", "C", "D", "E"], [[5, 4], [2, 4], [1, 1], [3, 2], [6, 1]], [-4, -3], 2),
];

export const ogmTranslationPractice = {
  id: "ayt-geo-ogm-oteleme-071",
  subjectId: "ayt-geometri",
  title: txt("Öteleme · OGM kaynak alıştırmaları"),
  minutes: 12,
  objectives: [
    txt("Grafikten verilen görüntüyü oku ve başlangıç noktasına dön."),
    txt("Aynı ötelemeyi üçgenin bütün köşelerine uygula."),
  ],
  body: [],
  tags: ["soru-seti", "kaynak-sorulari"],
  source: txt("OGM Materyal, Öteleme Dönüşümü, fiziksel 12, 13, 17, 20 ve 22. sayfalar. Verilen koordinatlar ve hareketler kaynak örneklerindendir. Çizimler, şıklar ve ayrıntılı çözümler uygulama için hazırlandı."),
  questions: [inverseTranslationQuestion, triangleTranslationQuestion, ...ogmGridTranslationExamples.map(({ question }) => question)],
} satisfies Lesson;
