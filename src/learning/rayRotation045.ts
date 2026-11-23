import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

type GeometrySpec = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Geometry = GeometrySpec & Required<Pick<GeometrySpec, "segments">>;
type MathFigure = Extract<SourceQuestionFigureSpec, { kind: "math" }>;
type Point = readonly [number, number];

export const equalTurns = 8;
export const turnAngle = 360 / equalTurns;
const rightAngle = 90;
const remainder = rightAngle - turnAngle;
const outerAngle = remainder / 2;
export const outerLabel = `${new Intl.NumberFormat("tr-TR").format(outerAngle)}°`;

function polar(center: Point, radius: number, degrees: number): Point {
  const angle = degrees * Math.PI / 180;
  return [center[0] + radius * Math.cos(angle), center[1] - radius * Math.sin(angle)];
}

function cornerDiagram(showTurn: boolean): Geometry {
  const center: Point = [111, 238];
  const directions = [0, outerAngle, rightAngle - outerAngle, rightAngle];
  return {
    kind: "geometry",
    viewBox: [82, 45, 232, 224],
    title: showTurn ? "Dik açıdan dönüşü ayır" : "Bir dik açı, iki eş dış parça",
    alt: showTurn
      ? `Ortada ${turnAngle}° var. Dik açının iki dış parçası birbirine eşit ve toplamları ${remainder}°.`
      : "İki ışın bir dik açının içinde. Her ışın ile en yakın dış kol arasında x açısı var. İki x birbirine eşit.",
    caption: null,
    segments: [
      ...directions.map((degrees, index) => ({
        from: center,
        to: polar(center, 173, degrees),
        emphasis: index === 1 || index === 2,
      })),
      { from: [111, 219], to: [130, 219] },
      { from: [130, 219], to: [130, 238] },
    ],
    arcs: [
      { center, radius: 78, start: 0, degrees: outerAngle },
      { center, radius: 78, start: rightAngle - outerAngle, degrees: outerAngle },
      ...(showTurn ? [{ center, radius: 95, start: outerAngle, degrees: turnAngle }] : []),
    ],
    labels: [
      { at: polar(center, 138, outerAngle / 2), text: "x" },
      { at: polar(center, 138, rightAngle - outerAngle / 2), text: "x" },
      ...(showTurn ? [{ at: polar(center, 137, rightAngle / 2), text: `${turnAngle}°` }] : []),
    ],
  };
}

function fullTurnDiagram(): Geometry {
  const center: Point = [220, 155];
  return {
    kind: "geometry",
    viewBox: [89, 26, 284, 260],
    title: "Bir tam tur, sekiz eş aralık",
    alt: `Sekiz yarıçap bir tam turu eş parçalara ayırır. İşaretli iki ardışık yönün arasındaki açı ${turnAngle}°.`,
    caption: null,
    circles: [{ center, radius: 110 }],
    segments: Array.from({ length: equalTurns }, (_, index) => ({
      from: center,
      to: polar(center, 110, index * turnAngle),
      emphasis: index < 2,
    })),
    arcs: [{ center, radius: 69, start: 0, degrees: turnAngle }],
    labels: [{ at: polar(center, 105, turnAngle / 2), text: `${turnAngle}°` }],
  };
}

export const rotationIllustrations = {
  figure: cornerDiagram(false),
  steps: [
    fullTurnDiagram(),
    cornerDiagram(true),
    {
      kind: "math",
      title: "Kalan açıyı ikiye böl",
      alt: `Doksan dereceden ${turnAngle} dereceyi çıkar. Elde edilen ${remainder} dereceyi ikiye bölünce ${outerLabel} çıkar.`,
      expression: {
        kind: "row",
        items: [
          { kind: "text", text: "x =" },
          {
            kind: "fraction",
            numerator: { kind: "text", text: `${rightAngle}° − ${turnAngle}°` },
            denominator: { kind: "text", text: "2" },
          },
          { kind: "text", text: `= ${outerLabel}` },
        ],
      },
    },
  ] satisfies readonly [Geometry, Geometry, MathFigure],
};
