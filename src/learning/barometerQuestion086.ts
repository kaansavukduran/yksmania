import type { SourceMathNode, SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const barometerQuestionId = "basinc-q8";
type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
const height: NonNullable<Geometry["segments"]>[number][] = [
  { from: [304, 112], to: [304, 208] },
  { from: [294, 112], to: [314, 112] },
  { from: [294, 208], to: [314, 208] },
];

const tube: Geometry = {
  kind: "geometry",
  title: "İdeal sıvılı barometrenin ilk okuması",
  alt: "Kapalı tüpün üstü yaklaşık vakum. Dış basınç P sıfır kaba etki ediyor. Sıvının yoğunluğu rho ve tüpteki sıvının kaba göre düşey yüksekliği h.",
  caption: null,
  viewBox: [-15, -30, 455, 350],
  segments: [
    { from: [92, 192], to: [92, 246] }, { from: [92, 246], to: [353, 246] },
    { from: [353, 246], to: [353, 190] }, { from: [92, 208], to: [210, 208], emphasis: true },
    { from: [250, 208], to: [353, 208], emphasis: true },
    { from: [210, 226], to: [210, 67] }, { from: [250, 67], to: [250, 226] },
    { from: [210, 67], to: [250, 67] }, { from: [210, 112], to: [250, 112], emphasis: true },
    { from: [250, 112], to: [294, 112], dashed: true },
    ...height,
  ],
  labels: [
    { at: [224, 36], text: "Yaklaşık vakum" },
    { at: [126, 172], text: "P₀" },
    { at: [361, 155], text: "h" },
    { at: [222, 300], text: "Yoğunluk ρ" },
  ],
};

const text = (value: string): SourceMathNode => ({ kind: "text", text: value });

export const barometerQuestionFigures = {
  figure: tube,
  hintFigure: {
    ...tube,
    title: "Sabit kalan dış basıncı işaretle",
    alt: "Dış basınç ve yerçekimi sabit. Kaptaki serbest yüzey ile tüpteki yüzeyin düşey farkını h olarak oku.",
  },
  stepFigures: [
    {
      kind: "math",
      title: "Aynı dış basıncı iki kez yaz",
      alt: "Başlangıçta P sıfır eşittir rho çarpı g çarpı h, yeni sıvıda P sıfır eşittir rho üstü çizgili çarpı g çarpı h üstü çizgili.",
      expression: text("P₀ = ρ · g · h = ρ′ · g · h′"),
    },
    {
      kind: "math",
      title: "Yeni sıvının yoğunluğunu yerine koy",
      alt: "Rho çarpı h eşittir rho bölü iki çarpı yeni yükseklik.",
      expression: { kind: "row", items: [text("ρ · h ="), { kind: "fraction", numerator: text("ρ"), denominator: text("2") }, text("· h′")] },
    },
    {
      kind: "math",
      title: "Yeni düşey yüksekliği bul",
      alt: "Yeni düşey yükseklik, ilk yüksekliğin iki katı.",
      expression: text("h′ = 2h"),
    },
  ],
} satisfies { figure: Geometry; hintFigure: Geometry; stepFigures: readonly SourceQuestionFigureSpec[] };
