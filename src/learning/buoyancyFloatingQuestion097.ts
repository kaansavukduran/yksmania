import type { SourceMathNode, SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const buoyancyFloatingQuestionId = "sivilarin-kaldirma-kuvveti-q2";

const floating: Extract<SourceQuestionFigureSpec, { kind: "geometry" }> = {
  kind: "geometry",
  title: "Suyun üzerinde serbest yüzen blok",
  alt: "Suyun yüzeyi 2 litrelik bloğun içinden geçiyor. Batık hacim verilmemiş. Çizim ölçekli değildir.",
  caption: "Blok kısmen batık. Çizim ölçekli değildir.",
  viewBox: [0, -5, 342, 206],
  segments: [
    { from: [27, 57], to: [27, 185] }, { from: [27, 185], to: [315, 185] }, { from: [315, 185], to: [315, 57] },
    { from: [27, 106], to: [122, 106], emphasis: true }, { from: [220, 106], to: [315, 106], emphasis: true },
    { from: [122, 62], to: [220, 62] }, { from: [220, 62], to: [220, 147] },
    { from: [220, 147], to: [122, 147] }, { from: [122, 147], to: [122, 62] },
  ],
  labels: [{ at: [171, 35], text: "2 L blok" }, { at: [172, 135], text: "Vᵦ?" }],
};

const text = (value: string): SourceMathNode => ({ kind: "text", text: value });

export const buoyancyFloatingQuestionFigures = {
  figure: floating,
  hintFigure: {
    kind: "math",
    title: "Yukarı ve aşağı kuvvetleri eşitle",
    alt: "Serbest denge için yukarı kaldırmanın büyüklüğü aşağı ağırlığa eşittir.",
    expression: text("Fₖ = G"),
  },
  stepFigures: [
    { kind: "math", title: "İki taraftaki g’yi sadeleştir", alt: "Su yoğunluğu çarpı batık hacim çarpı g, cisim kütlesi çarpı g. Sadeleştirmeyle su yoğunluğu çarpı batık hacim cisim kütlesine eşittir.", expression: text("ρₛᵤ · g · Vᵦ = m · g → ρₛᵤ · Vᵦ = m") },
    { kind: "math", title: "Kütleyi suyun yoğunluğuna böl", alt: "Sıfır virgül sekiz kilogram bölü bin kilogram bölü metreküp, sıfır virgül sıfır sıfır sıfır sekiz metreküp veya sıfır virgül sekiz litre.", expression: text("0,8 ÷ 1000 = 0,0008 m³ = 0,8 L") },
    { kind: "table", title: "Hacim ile hacim oranını karşılaştır", alt: "Batık hacim sıfır virgül sekiz litredir. Batık hacmin toplam hacme oranı birimsiz sıfır virgül dörttür.", headers: ["Nicelik", "Sonuç"], rows: [["Batık hacim", "0,8 L"], ["Batık oran", "0,8 ÷ 2 = 0,4"]] },
  ],
} satisfies { figure: SourceQuestionFigureSpec; hintFigure: SourceQuestionFigureSpec; stepFigures: readonly SourceQuestionFigureSpec[] };
