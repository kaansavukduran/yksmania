import type { SourceMathNode, SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const bernoulliChannelQuestionId = "basinc-q10";

const pipe: Extract<SourceQuestionFigureSpec, { kind: "geometry" }> = {
  kind: "geometry",
  title: "Geniş ve dar bölümleri olan yatay boru",
  alt: "Yatay borunun sol tarafı geniş, sağ tarafı dar. Akış soldan sağa. İki bölümün merkezleri aynı seviyede.",
  caption: null,
  viewBox: [0, -12, 426, 221],
  segments: [
    { from: [25, 39], to: [152, 39] }, { from: [152, 39], to: [233, 65] }, { from: [233, 65], to: [401, 65] },
    { from: [25, 141], to: [152, 141] }, { from: [152, 141], to: [233, 115] }, { from: [233, 115], to: [401, 115] },
    { from: [25, 90], to: [401, 90], dashed: true },
    { from: [46, 90], to: [98, 90], emphasis: true },
    { from: [88, 80], to: [98, 90], emphasis: true }, { from: [88, 100], to: [98, 90], emphasis: true },
  ],
  labels: [{ at: [94, 175], text: "A₁" }, { at: [320, 175], text: "A₂" }],
};

const text = (value: string): SourceMathNode => ({ kind: "text", text: value });
const half: SourceMathNode = { kind: "fraction", numerator: text("1"), denominator: text("2") };

export const bernoulliChannelQuestionFigures = {
  figure: pipe,
  hintFigure: {
    kind: "math",
    title: "İki kesitte geçen debiyi eşitle",
    alt: "Geniş ve dar kesitte alan çarpı sürat değerlerini eşitle. Sonra iki noktayı aynı yükseklikte karşılaştır.",
    expression: text("A₁ · v₁ = A₂ · v₂"),
  },
  stepFigures: [
    {
      kind: "math",
      title: "Alan küçülünce hız nasıl değişir?",
      alt: "İkinci kesitin alanı daha küçük. Debileri eşit tutmak için ikinci kesitin sürati daha büyük.",
      expression: text("A₂ < A₁ ve A₁v₁ = A₂v₂ → v₂ > v₁"),
    },
    {
      kind: "math",
      title: "Aynı yükseklikte enerji terimlerini eşitle",
      alt: "Birinci basınç ile hız teriminin toplamı, ikinci basınç ile ikinci hız teriminin toplamına eşit.",
      expression: { kind: "row", items: [text("P₁ +"), half, text("ρv₁² = P₂ +"), half, text("ρv₂²")] },
    },
    {
      kind: "table",
      title: "Dar bölümde hız ve statik basınç",
      alt: "Dar bölümde sürat artar, statik basınç azalır.",
      headers: ["Nicelik", "Dar bölüm"],
      rows: [["Sürat", "Artar"], ["Statik basınç", "Azalır"]],
    },
  ],
} satisfies { figure: SourceQuestionFigureSpec; hintFigure: SourceQuestionFigureSpec; stepFigures: readonly SourceQuestionFigureSpec[] };
