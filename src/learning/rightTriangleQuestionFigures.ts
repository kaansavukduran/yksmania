import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Point = readonly [number, number];
type Segment = NonNullable<Geometry["segments"]>[number];
type Label = NonNullable<Geometry["labels"]>[number];
type Scene = Pick<Geometry, "segments" | "labels">;

const segment = (from: Point, to: Point, emphasis = false): Segment => ({ from, to, emphasis });
const label = (x: number, y: number, text: string, anchor: Label["anchor"] = "middle"): Label => ({ at: [x, y], text, anchor });

function rightMark(vertex: Point, first: Point, second: Point): Segment[] {
  const inside = (to: Point): Point => {
    const x = to[0] - vertex[0], y = to[1] - vertex[1];
    const factor = 23 / Math.hypot(x, y);
    return [x * factor, y * factor];
  };
  const a = inside(first), b = inside(second);
  const p: Point = [vertex[0] + a[0], vertex[1] + a[1]];
  const q: Point = [vertex[0] + b[0], vertex[1] + b[1]];
  const corner: Point = [p[0] + b[0], p[1] + b[1]];
  return [segment(p, corner), segment(corner, q)];
}

function legs(vertical: number, horizontal: number, names: readonly [string, string, string],
              labels: readonly [string, string, string], angle?: string): Scene {
  const scale = Math.min(258 / horizontal, 164 / vertical);
  const a: Point = [142, 247], b: Point = [142, 247 - vertical * scale], c: Point = [142 + horizontal * scale, 247];
  const [left, base, slant] = labels;
  return {
    segments: [segment(a, b), segment(a, c), segment(b, c), ...rightMark(a, b, c)],
    labels: [
      label(a[0] - 25, a[1] + 36, names[0]),
      label(b[0] - 8, b[1] - 24, names[1]),
      label(c[0] + 23, c[1] + 36, names[2]),
      label(a[0] - 19, (a[1] + b[1]) / 2 + 8, left, "end"),
      label((a[0] + c[0]) / 2, a[1] + 88, base),
      label((b[0] + c[0]) / 2 + 22, (b[1] + c[1]) / 2 - 30, slant, "start"),
      ...(angle ? [label(b[0] + 50, b[1] - 18, angle, "start")] : []),
    ].filter((item) => item.text),
  };
}

function projected(p: number, q: number, labels: { left?: string; right?: string; height?: string; ab?: string; ac?: string; base?: string }, median = false): Scene {
  const h = Math.sqrt(p * q);
  const scale = Math.min(290 / (p + q), 161 / h);
  const b: Point = [105, 250], c: Point = [105 + (p + q) * scale, 250];
  const a: Point = [105 + p * scale, 250 - h * scale];
  const foot: Point = [median ? (b[0] + c[0]) / 2 : a[0], b[1]];
  const footMark = median
    ? [segment([(b[0] + foot[0]) / 2, 243], [(b[0] + foot[0]) / 2, 257]),
       segment([(c[0] + foot[0]) / 2, 243], [(c[0] + foot[0]) / 2, 257])]
    : rightMark(foot, a, c);
  const { left, right, height, ab, ac, base } = labels;
  return {
    segments: [segment(b, c), segment(a, b), segment(a, c), segment(a, foot, true),
      ...rightMark(a, b, c), ...footMark],
    labels: [
      label(a[0], a[1] - 22, "A"), label(b[0] - 13, b[1] + 36, "B"),
      label(c[0] + 13, c[1] + 36, "C"), label(foot[0], foot[1] + 36, median ? "M" : "H"),
      ...(left ? [label((b[0] + foot[0]) / 2, 338, left)] : []),
      ...(right ? [label((c[0] + foot[0]) / 2, 338, right)] : []),
      ...(height ? [label(465, 24, height, "end")] : []),
      ...(ab ? [label(33, 24, ab, "start")] : []),
      ...(ac ? [label((a[0] + c[0]) / 2 + 30, (a[1] + c[1]) / 2 - 12, ac, "start")] : []),
      ...(base ? [label((b[0] + c[0]) / 2, 338, base)] : []),
    ],
  };
}

function triangle(title: string, alt: string, scene: Scene, caption?: string): Geometry {
  return { kind: "geometry", title, alt, caption, viewBox: [0, -32, 495, 414], ...scene };
}
const abc = ["A", "B", "C"] as const;
const bac = ["B", "A", "C"] as const;

function optionOutline(a: string, b: string, c: string): Scene {
  const points = [[99, 242], [225, 83], [398, 242]] as const;
  return {
    segments: [segment(points[0], points[1]), segment(points[1], points[2]), segment(points[2], points[0])],
    labels: [label(135, 147, a), label(344, 147, b), label(248, 294, c)],
  };
}

export function schematicTriangleOption(option: string): Geometry {
  const [a, b, c] = option.split(", ");
  return triangle("Üç kenarı karşılaştır", `Üçgen kenarları ${a}, ${b} ve ${c} santimetre. Ölçeksiz çizim.`, optionOutline(a, b, c));
}

type Card = {
  title: string;
  givens: string;
  scene: Scene;
  hint: string;
  steps: readonly [string, string, string];
  emphasis?: readonly number[];
};

const cards: readonly Card[] = [
  {
    title: "7 ve 24 cm’lik dik kenarlar", givens: "ABC üçgeni A’da dik. AB 7 cm, AC 24 cm. BC aranıyor.",
    scene: legs(7, 24, abc, ["7 cm", "24 cm", "BC = ?"]),
    hint: "Dik açı işaretinin karşısındaki kenarı izle.", emphasis: [2],
    steps: ["BC² = 7² + 24²", "BC² = 49 + 576 = 625", "BC = 25 cm"],
  },
  {
    title: "B’de dik açı ve 15 cm hipotenüs", givens: "ABC üçgeni B’de dik. AB 9 cm. Hipotenüs AC 15 cm. BC aranıyor.",
    scene: legs(9, 12, bac, ["9 cm", "BC = ?", "15 cm"]),
    hint: "B’deki dik açıdan karşı kenara bak.", emphasis: [2],
    steps: ["BC² = AC² − AB²", "BC² = 225 − 81 = 144", "BC = 12 cm"],
  },
  {
    title: "Üç kenarı adlandır", givens: "Ölçeksiz üçgen. Kenarları a, b ve c ile gösteriliyor.",
    scene: optionOutline("a", "b", "c"),
    hint: "Her seçenekte en büyük sayıyı c olarak al.",
    steps: ["8² + 15² = 64 + 225 = 289", "17² = 289", "8 + 15 > 17. Üçgen dik."],
  },
  {
    title: "45 derecelik özel dik üçgen", givens: "ABC üçgeni A’da dik. B açısı 45°, AB 6 cm. BC aranıyor.",
    scene: legs(6, 6, abc, ["6 cm", "", "BC = ?"], "45°"),
    hint: "B açısını ve A’daki dik açıyı birlikte kullan.", emphasis: [0, 1],
    steps: ["C = 180° − 90° − 45° = 45°", "BC² = 6² + 6² = 72", "BC = 6√2 cm"],
  },
  {
    title: "30 derecenin karşısındaki kenar", givens: "ABC üçgeni A’da dik. B açısı 30°, BC 18 cm. B’nin karşısındaki AC aranıyor.",
    scene: legs(9 * Math.sqrt(3), 9, abc, ["", "AC = ?", "18 cm"], "30°"),
    hint: "B açısının karşısındaki kenar ile hipotenüsü bul.", emphasis: [1, 2],
    steps: ["BC = 18 cm ve A = 90°", "BC = 2 × AC", "AC = 9 cm"],
  },
  {
    title: "Hipotenüsün 4 ve 9 cm’lik parçaları", givens: "ABC üçgeni A’da dik. AH, BC’ye dik. BH 4 cm, HC 9 cm. AH aranıyor.",
    scene: projected(4, 9, { left: "4 cm", right: "9 cm", height: "AH = ?" }),
    hint: "Dikmenin hipotenüsü ayırdığı iki parçayı izle.", emphasis: [0, 3],
    steps: ["AH² = BH × HC", "AH² = 4 × 9 = 36", "AH = 6 cm"],
  },
  {
    title: "AB ve hipotenüsteki izdüşümü", givens: "ABC üçgeni A’da dik. AH, BC’ye dik. BH 5 cm, HC 20 cm. AB aranıyor.",
    scene: projected(5, 20, { left: "5 cm", right: "20 cm", ab: "AB = ?" }),
    hint: "AB’nin izdüşümü H’nin hangi tarafında?", emphasis: [1, 3],
    steps: ["BC = 5 + 20 = 25 cm", "AB² = 25 × 5 = 125", "AB = 5√5 cm"],
  },
  {
    title: "9 ve 12 cm’lik kenarlarla yükseklik", givens: "Dik kenarlar 9 ve 12 cm. A’dan BC’ye inen dikmenin ayağı H. AH aranıyor.",
    scene: projected(81 / 15, 144 / 15, { ab: "9 cm", ac: "12 cm", height: "AH = ?" }),
    hint: "Aynı alanı dik kenarlarla, sonra BC ve AH ile düşün.", emphasis: [1, 2, 3],
    steps: ["BC = √(81 + 144) = 15 cm", "9 × 12 = 15 × AH", "AH = 36/5 cm"],
  },
  {
    title: "Orta noktaya çizilen kenarortay", givens: "ABC üçgeni A’da dik. BC 20 cm. M, BC’nin orta noktası. AM aranıyor.",
    scene: projected(144 / 20, 256 / 20, { base: "20 cm" }, true),
    hint: "Orta noktanın iki yandaki eş işaretlerine bak.", emphasis: [0, 3],
    steps: ["BM = MC", "BM = 20 ÷ 2 = 10 cm", "AM = BM = 10 cm"],
  },
  {
    title: "12 cm yükseklik ve 9 cm izdüşüm", givens: "ABC üçgeni A’da dik. AH, BC’ye dik. AH 12 cm, BH 9 cm. HC aranıyor.",
    scene: projected(9, 16, { left: "9 cm", right: "HC = ?", height: "AH = 12 cm" }),
    hint: "AH’nin karesini BH ile aranan HC’nin çarpımına bağla.", emphasis: [0, 3],
    steps: ["AH² = BH × HC", "144 = 9 × HC", "HC = 16 cm"],
  },
];

export const rightTriangleQuestionFigures = cards.map((card, index) => {
  const focused: Scene = {
    ...card.scene,
    segments: card.scene.segments?.map((line, i) => ({ ...line, emphasis: card.emphasis?.includes(i) || line.emphasis })),
  };
  const result: Scene = index === 2
    ? legs(8, 15, abc, ["8 cm", "15 cm", "17 cm"])
    : { ...card.scene, labels: card.scene.labels?.map((item) => item.text.includes("?")
        ? { ...item, text: card.steps[2].split(" = ").at(-1)! }
        : item) };
  const computation: SourceQuestionFigureSpec = {
    kind: "math",
    title: "Ara işlem",
    alt: card.steps[1],
    expression: { kind: "text", text: card.steps[1] },
  };
  return {
    figure: triangle(card.title, card.givens, card.scene),
    hintFigure: triangle("Şekilden ilk bağıntıyı kur", card.givens, focused, card.hint),
    stepFigures: [
      triangle("Bağıntının çizimdeki yeri", `${card.givens} ${card.steps[0]}`, focused, card.steps[0]),
      computation,
      triangle("Sonucu şekle yerleştir", card.steps[2], result, card.steps[2]),
    ],
  };
});
