import { mirrorFieldAt, mirrorFieldMethods, mirrorFieldTitle } from "../mebiMirrorField";
import { fmt, poly, pt, right, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

function fieldDrawing(eyeX: number, method: number) {
  const { eye, virtualEye, edges } = mirrorFieldAt(eyeX);
  const [left, rightEdge] = edges;
  const els: El[] = [
    poly([left.end, rightEdge.end, rightEdge.boundary, left.boundary], { fill: "b", bare: true }),
    seg(left.end, rightEdge.end, { tone: "ink", bold: true }),
    txt(v(0, 0), "Ayna", "s", { tone: "ink", small: true }),
    pt(eye, "E", "n", "ink"),
  ];

  if (method === 1) {
    els.push(seg(eye, virtualEye, { dash: true, thin: true, tone: "muted" }), pt(virtualEye, "E′", "s", "c", true));
  }
  for (const edge of edges) {
    if (method === 0) {
      els.push(
        vec(eye, edge.end, { tone: "a" }),
        seg(edge.end, edge.normalAtEyeHeight, { dash: true, thin: true, tone: "muted" }),
      );
    } else if (method === 1) {
      els.push(seg(virtualEye, edge.end, { dash: true, tone: "c" }));
    } else {
      els.push(
        seg(edge.end, edge.normalAtEyeHeight, { dash: true, thin: true, tone: "muted" }),
        seg(eye, edge.normalAtEyeHeight, { thin: true, tone: "a" }),
        seg(edge.normalAtEyeHeight, edge.boundary, { thin: true, tone: "c" }),
        right(edge.normalAtEyeHeight, edge.end, edge.boundary, "ink"),
      );
    }
    els.push(vec(edge.end, edge.boundary, { tone: "b" }));
  }
  const widths = edges.map(({ normalAtEyeHeight: n }) => Math.abs(n[0] - eye[0]));
  return {
    els,
    readout: [
      `Göz hizasında sınırlar ${fmt(left.boundary[0])} ve ${fmt(rightEdge.boundary[0])} birim.`,
      method === 2
        ? `Sol normalin iki yanında ${fmt(widths[0])}, sağ normalin iki yanında ${fmt(widths[1])} birim.`
        : "Çizilen iki sınırın arası görüş alanı.",
    ],
  };
}

const methodCaptions = [
  "Aynanın iki ucundan dönen ışınlar görüş alanının sınırlarını verir.",
  "Sanal gözden uçlara uzanan doğrular yansıyan ışınlarla hizalanır.",
  "Her normalin iki yanında aynı yatay uzaklığı işaretle.",
] as const;

const alternatives = [
  "Gözden aynanın iki ucuna doğru tersine izlenen ışınlar ve iki kesik normal. Uçlardan öne açılan yansımalar arası gölgeli.",
  "Aynanın arkasında gözün simetriği E′. Buradan iki uca giden kesik doğrular, aynanın önünde görüş alanının sınırlarına dönüşür.",
  "Her ayna ucunda kesik bir dik çizgi var. Göz hizasında her normalin iki yanında eş yatay uzaklık işaretlenir. Bulunan sınırlar arası gölgeli.",
] as const;

export const mirrorFieldFigures: Record<string, FigureDef> = {
  [mirrorFieldTitle]: {
    caption: "Gözün yatay yerini değiştir. Her göz konumunda üç yöntemin aynı iki sınırı verdiğini izle.",
    alt: "Aynanın iki ucundan açılan görüş alanı. Göz E, kesik sanal çizgiler ve renkle ayrılan sınırlar yöntem seçildiğinde gösterilir.",
    param: { label: "Gözün yatay konumu", min: -1.5, max: 1.5, step: 0.5, init: -1 },
    steps: [...mirrorFieldMethods],
    draw: fieldDrawing,
  },
  ...Object.fromEntries(mirrorFieldMethods.map((title, method) => [
    title,
    { caption: methodCaptions[method], alt: alternatives[method], draw: () => fieldDrawing(-1, method) },
  ])),
};
