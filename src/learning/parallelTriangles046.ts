import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

type Point = readonly [number, number];
type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type MathFigure = Extract<SourceQuestionFigureSpec, { kind: "math" }>;

const exteriorAngle = 86;
const baseAngle = exteriorAngle / 2;
const apexAngle = 180 - 2 * baseAngle;
const unknownAngle = apexAngle - baseAngle;
const halfBase = 130;
const radians = (degrees: number) => degrees * Math.PI / 180;

function at(point: Point, length: number, degrees: number): Point {
  const angle = radians(degrees);
  return [point[0] + length * Math.cos(angle), point[1] - length * Math.sin(angle)];
}

const height = halfBase * Math.tan(radians(baseAngle));
const leg = halfBase / Math.cos(radians(baseAngle));
const exteriorStart = 180 - exteriorAngle - baseAngle;
const B: Point = [100, 290];
const C: Point = [B[0] + 2 * halfBase, B[1]];
const A: Point = [B[0] + halfBase, B[1] - height];
const F = at(A, height / Math.sin(radians(exteriorAngle)), -exteriorAngle);
const E = at(F, 2 * halfBase, 180 - exteriorAngle);
const D = at(E, leg, -baseAngle);
const slopeAC = Math.tan(radians(baseAngle));
const slopeFD = Math.tan(radians(exteriorStart));
const intersectionX = (F[0] * slopeFD + A[0] * slopeAC + F[1] - A[1]) / (slopeFD + slopeAC);
const G: Point = [intersectionX, A[1] + (intersectionX - A[0]) * slopeAC];

const firstTriangle = [
  { from: A, to: B }, { from: B, to: C }, { from: C, to: A },
];
const secondTriangle = [
  { from: E, to: D }, { from: D, to: F }, { from: F, to: E },
];
const triangles = [...firstTriangle, ...secondTriangle];
const nameLabels: NonNullable<Geometry["labels"]> = [
  { at: [A[0] - 19, A[1] - 11], text: "A" },
  { at: [B[0] - 14, B[1] + 28], text: "B" },
  { at: [C[0] + 14, C[1] + 28], text: "C" },
  { at: [F[0], F[1] + 28], text: "F" },
];
const referenceLabels: NonNullable<Geometry["labels"]> = [
  ...nameLabels,
  { at: [E[0] - 12, E[1] - 9], text: "E" },
  { at: [D[0] + 21, D[1] + 4], text: "D" },
];
const unknownStart = 180 + baseAngle;
const unknownLabel = { at: at(A, 68, unknownStart + unknownAngle / 2), text: "x" };
const exteriorLabel = {
  at: at(G, 76, exteriorStart + exteriorAngle / 2),
  text: `${exteriorAngle}°`,
};

const given: Geometry = {
  kind: "geometry",
  title: "İki eş ikizkenar üçgen",
  alt: "ABC ile DEF eş ikizkenar üçgenler. A, EF kolunda. F, BC üzerinde. AC ve DE paralel. AC ile DF kesiştiği yerde üst açı 86°. Sorulan x, A’da AB ile AF arasındaki açı.",
  caption: null,
  viewBox: [65, -26, 332, 369],
  segments: triangles,
  arcs: [
    { center: A, radius: 43, start: unknownStart, degrees: unknownAngle },
    { center: G, radius: 36, start: exteriorStart, degrees: exteriorAngle },
  ],
  labels: [...referenceLabels, unknownLabel, exteriorLabel],
};

const transfer: Geometry = {
  ...given,
  title: "Paralel kenarlar taban açısını taşır",
  alt: "A, F ve çizgilerin kesişimi G küçük bir üçgen oluşturur. A ve F iç açılarının her biri beta. G’deki 86 derecelik dış açı bu iki beta açısının toplamı.",
  viewBox: [163, 102, 224, 240],
  segments: [
    { from: A, to: G, emphasis: true },
    { from: A, to: F, emphasis: true },
    { from: F, to: G, emphasis: true },
    { from: G, to: D, dashed: true },
    { from: [211, 215], to: at(A, 32, 360 - exteriorAngle + baseAngle / 2), dashed: true },
    { from: [211, 272], to: at(F, 32, exteriorStart + baseAngle / 2), dashed: true },
  ],
  arcs: [
    { center: A, radius: 32, start: 360 - exteriorAngle, degrees: baseAngle },
    { center: F, radius: 32, start: exteriorStart, degrees: baseAngle },
    { center: G, radius: 36, start: exteriorStart, degrees: exteriorAngle },
  ],
  labels: [
    nameLabels[0],
    nameLabels[3],
    { at: [G[0] + 24, G[1] + 5], text: "G" },
    exteriorLabel,
    { at: [196, 218], text: "β" },
    { at: [196, 275], text: "β" },
  ],
};

const split: Geometry = {
  kind: "geometry",
  title: "İki taban açısı ve tepe parçaları",
  alt: "ABC’nin B ve C açılarının her biri 43 derece. Tepe açısı 94 derece. A’dan F’ye giden doğru parçası tepeyi x ve 43 derece olarak ayırır.",
  caption: null,
  viewBox: [65, 110, 332, 233],
  segments: [...firstTriangle, { from: A, to: F, emphasis: true }],
  arcs: [
    { center: B, radius: 31, start: 0, degrees: baseAngle },
    { center: C, radius: 31, start: 180 - baseAngle, degrees: baseAngle },
    { center: A, radius: 44, start: unknownStart, degrees: unknownAngle },
    { center: A, radius: 44, start: 360 - exteriorAngle, degrees: baseAngle },
  ],
  labels: [
    ...nameLabels,
    unknownLabel,
    { at: at(B, 50, baseAngle / 2), text: "β" },
    { at: at(C, 50, 180 - baseAngle / 2), text: "β" },
    { at: at(A, 77, 360 - exteriorAngle + baseAngle / 2), text: "β" },
  ],
};

const calculation: MathFigure = {
  kind: "math",
  title: "Tepe açısının bilinmeyen parçası",
  alt: `Tepe açısı ${apexAngle} derece. ${baseAngle} dereceyi çıkarınca x ${unknownAngle} derece olur.`,
  expression: { kind: "text", text: `x = ${apexAngle}° − ${baseAngle}° = ${unknownAngle}°` },
};

export const parallelTriangles046 = {
  exteriorAngle, baseAngle, apexAngle, unknownAngle,
  figure: given,
  steps: [transfer, split, calculation] as const,
};
