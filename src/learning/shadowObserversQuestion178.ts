import { txt, type Question } from "../domain/model";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";
import { blockerAxisCm, blockerRadiusCm, observerDisks, positions, sourceRadiusCm } from "./mebiExtendedSourceObservers";

type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Coordinate = readonly [number, number];
type Appearance = ReturnType<typeof observerDisks>["appearance"];
const observations = positions.map(position => ({ ...position, ...observerDisks(position.axialCm, position.lateralCm) }));
const appearanceNames: Record<Appearance, string> = { full: "kapalı", partial: "kısmen açık", ring: "halka", clear: "tamamen açık" };
const choices: readonly (readonly Appearance[])[] = [
  ["partial", "full", "ring"],
  ["full", "partial", "partial"],
  ["full", "partial", "ring"],
  ["ring", "partial", "full"],
  ["full", "ring", "partial"],
];
const formatChoice = (items: readonly Appearance[]) => items.map((item, index) => `${positions[index].label} ${appearanceNames[item]}`).join(" · ");

export const shadowObserversQuestion = {
  id: "golge-yari-golge-uc-gozlemci-k-l-m",
  prompt: txt("Büyük küre ışık kaynağı, küçük küre opaktır. K, L ve M bulundukları yerden ışık kaynağına bakıyor. Kaynağın görünen kısmı her konumda nasıldır?"),
  options: choices.map(choice => txt(formatChoice(choice))),
  answer: choices.findIndex(choice => choice.every((item, index) => item === observations[index].appearance)),
  hint: txt("L’den opak kürenin iki kenarına teğet çiz. Bu çizgilerin arasında kalan kaynak kısmını küre kapatır. K ve M için de aynı bakışı kendi konumlarından kur."),
  explanation: txt("K’nin baktığı doğrultuda opak küre bütün kaynağı kapatır. L yukarıdan bakınca kaynağın bir kısmı örtülür. M’de iki merkez aynı doğrultudadır ve opak küre göze daha küçük görünür. Kaynağın çevresi halka olarak kalır."),
  guidance: {
    knowledge: ["Opak küre ışığı geçirmez. Her konumda gözlemciye ulaşan ışınları izle.", "Görünen büyüklük hem cismin yarıçapına hem gözlemciden ne kadar uzakta olduğuna bağlıdır."],
    strategy: "Önce merkezlerin bakış doğrultusunda çakışıp çakışmadığına bak. Sonra opak diskin kaynağın ne kadarını kapattığını karşılaştır.",
    steps: ["K ve M merkezlerin doğrultusunda. K’de opak diskin görüntüsü kaynağın tamamını, M’de yalnız ortasını kapatıyor. L eksenin üstünde olduğundan iki disk aynı merkezde görünmüyor ve kaynak yalnız bir kenardan örtülüyor. Çizimde örtülen bölgeler taralı.", "Tabloyu soldan sağa oku. K ve M aynı eksende, ancak opak küre K’ye daha yakın. K kaynağı göremezken M aydınlık bir çevre halkası görür. L’nin gördüğü aydınlık bölüm halkadan farklıdır çünkü örtülme yalnız bir kenarda."],
    optionReasons: [
      "K eksenin üzerinde ve opak küreye yakın. L eksenin dışında olduğundan disklerin kenarları kısmen örtüşür.",
      "M eksen üzerinde. Küçük opak disk kaynağın ortasında kaldığından görünen çevre bir halka oluşturur.",
      "K’de tam örtülme, L’de yandan kısmi örtülme ve M’de merkezde örtülme doğru sırada.",
      "Halka M’de oluşur. Daha yakın K’de opak küre daha büyük görünür ve bütün kaynağı örter.",
      "L’de merkezler gözlemcinin aynı doğrultusunda hizalı değildir. Halka M’de görülür.",
    ],
    commonError: "K ve M aynı eksende diye iki diskin de gözlemcilere aynı büyüklükte göründüğünü varsayma.",
    check: "Bir halkanın oluşması için küçük görünen opak diskin bütünü kaynak diskinin içinde kalmalı. M bu koşulu sağlar.",
  },
  skill: "Gözlemcinin bulunduğu yere göre opak kürenin ışık kaynağını ne kadar örttüğünü karşılaştırma",
} satisfies Question;

const scale = 26;
const sourceScreen = (x: number, y: number): Coordinate => [115 + scale * x, 170 - scale * y];
const circles = [
  { center: sourceScreen(0, 0), radius: scale * sourceRadiusCm, emphasis: true },
  { center: sourceScreen(blockerAxisCm, 0), radius: scale * blockerRadiusCm },
];
const points = positions.map(({ axialCm, lateralCm }) => ({ at: sourceScreen(axialCm, lateralCm), emphasis: true }));
const labels = [
  { at: [115, 65], text: "Kaynak" },
  { at: [250, 331], text: "Opak küre" },
  { at: [sourceScreen(positions[0].axialCm, 0)[0] - 4, 110], text: "K" },
  { at: [sourceScreen(positions[1].axialCm, 0)[0] + 7, 77], text: "L" },
  { at: [sourceScreen(positions[2].axialCm, 0)[0], 225], text: "M" },
] satisfies NonNullable<Geometry["labels"]>;
const scene = {
  kind: "geometry", viewBox: [0, 0, 570, 347], points, labels, circles,
  segments: [{ from: sourceScreen(0, 0), to: sourceScreen(16.8, 0), dashed: true }],
} satisfies Omit<Geometry, "title" | "alt">;

function blockerTangents(x: number, y: number): NonNullable<Geometry["segments"]> {
  const dx = blockerAxisCm - x;
  const dy = -y;
  const d = Math.hypot(dx, dy);
  const r = blockerRadiusCm;
  const along = (d * d - r * r) / d;
  const across = r * Math.sqrt(d * d - r * r) / d;
  return [-1, 1].map(side => {
    const tangentX = (along * dx - side * across * dy) / d;
    const tangentY = (along * dy + side * across * dx) / d;
    const slope = tangentY / tangentX;
    const lowestSceneY = -4;
    const endX = Math.max(0, x + (lowestSceneY - y) / slope);
    return { from: sourceScreen(x, y), to: sourceScreen(endX, y + (endX - x) * slope), dashed: true };
  });
}

function projectedDisks(): Omit<Geometry, "title" | "alt"> {
  const sourceR = 50;
  const circles: NonNullable<Geometry["circles"]>[number][] = [];
  const segments: NonNullable<Geometry["segments"]>[number][] = [];
  for (const [index, { sourceAngularRadius, blockerAngularRadius, separation }] of observations.entries()) {
    const x = 113 + 174 * index;
    const y = 85;
    const pixelsPerRadian = sourceR / sourceAngularRadius;
    const blockerR = blockerAngularRadius * pixelsPerRadian;
    const blockerY = y + separation * pixelsPerRadian;
    circles.push({ center: [x, y], radius: sourceR, emphasis: true });
    const top = Math.max(y - sourceR, blockerY - blockerR);
    const bottom = Math.min(y + sourceR, blockerY + blockerR);
    for (let row = top + 3; row < bottom; row += 4.5) {
      const half = Math.min(Math.sqrt(sourceR ** 2 - (row - y) ** 2), Math.sqrt(blockerR ** 2 - (row - blockerY) ** 2));
      segments.push({ from: [x - half, row], to: [x + half, row] });
    }
  }
  return { kind: "geometry", viewBox: [0, 0, 570, 182], circles, segments, labels: positions.map(({ label }, index) => ({ at: [113 + 174 * index, 166], text: label })) };
}

export const shadowObserversQuestionFigures = {
  figure: { ...scene, title: "K, L ve M’nin bakış yerleri", alt: "Solda büyük ışık kaynağı, onun sağında daha küçük opak küre var. K, opak kürenin hemen sağında eksen üzerinde. L, K’nin biraz sağında ve eksenin üstünde. M, daha sağda aynı eksen üzerinde." } satisfies Geometry,
  hintFigure: { ...scene, segments: [...scene.segments, ...blockerTangents(positions[1].axialCm, positions[1].lateralCm)], title: "L’den opak küreye iki teğet", alt: "L’den başlayıp opak küreye üstten ve alttan değen iki kesik bakış sınırı kaynak yönünde uzanıyor." } satisfies Geometry,
  stepFigures: [
    { ...projectedDisks(), title: "Üç gözlemcinin gördüğü ışık diski", caption: "Taralı yüzey örtülen kaynak kısmı. Kıyaslamayı kolaylaştırmak için üç kaynak diski eş boyda çizildi.", alt: "K’nin bütün diski taralı. L’nin diski yalnız alt taraftan taralı. M’nin ortası taralı, çevresinde aydınlık halka açık." } satisfies Geometry,
    { kind: "table", title: "Gözlemcinin konumu ve gördüğü kısım", alt: "K, L ve M için görünen kaynak kısmı", headers: ["Gözlemci", "Konum", "Görünüm"], rows: observations.map(({ label, lateralCm, appearance }) => [label, lateralCm === 0 ? "Eksen üzerinde" : "Eksenin üstünde", appearanceNames[appearance]]) } satisfies SourceQuestionFigureSpec,
  ] as const,
};
