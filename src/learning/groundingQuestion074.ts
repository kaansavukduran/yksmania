import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const groundingQuestionId = "durgun-elektrik-q10";

type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
const wire: Geometry["segments"] = [
  { from: [119, 64], to: [246, 64] },
  { from: [246, 64], to: [246, 182] },
  { from: [219, 182], to: [273, 182] },
  { from: [229, 192], to: [263, 192] },
  { from: [239, 202], to: [253, 202] },
];
const electronPath: Geometry["segments"] = [
  { from: [149, 91], to: [227, 91], emphasis: true },
  { from: [227, 91], to: [227, 157], emphasis: true },
  { from: [219, 146], to: [227, 157], emphasis: true },
  { from: [235, 146], to: [227, 157], emphasis: true },
];

const drawing = (title: string, alt: string, transferred = false): Geometry => ({
  kind: "geometry",
  title,
  alt,
  caption: null,
  viewBox: [0, 0, 340, 264],
  circles: [{ center: [83, 64], radius: 36 }],
  segments: [...wire, ...(transferred ? electronPath : [])],
  labels: [
    { at: [83, 75], text: transferred ? "0" : "−", anchor: "middle" },
    { at: [83, 151], text: "Küre", anchor: "middle" },
    { at: [246, 247], text: "Dünya", anchor: "middle" },
    ...(transferred ? [{ at: [181, 135], text: "e⁻", anchor: "middle" } as const] : []),
  ],
});

const stem = drawing(
  "Negatif küre ve toprak bağlantısı",
  "Başlangıçta negatif olan metal küre, iletken telle Dünya’ya bağlı. Yakında etkileyen başka yük yok. Aktarım yönü gösterilmemiş.",
);

export const groundingQuestionFigures = {
  figure: stem,
  hintFigure: {
    kind: "table",
    title: "Negatif yükün ne anlattığını hatırla",
    alt: "Kürenin negatif yükü, nötr hâle göre elektron fazlasını gösterir.",
    headers: ["Verilen", "Anlamı"],
    rows: [["Negatif küre", "Nötr hâle göre elektron fazlası"]],
  },
  stepFigures: [
    { ...stem, title: "İlk yük işaretini oku" },
    { ...stem, title: "Küre ve Dünya’yı aynı sınırda düşün" },
    drawing(
      "Elektronların küreden Dünya’ya aktarılması",
      "Elektron oku metal küreden iletken tel boyunca Dünya’ya yöneliyor. Aktarım sonunda modelde kürenin yükü sıfır. Dünya, kürenin kaybettiği elektronları alıyor.",
      true,
    ),
  ],
} satisfies { figure: Geometry; hintFigure: SourceQuestionFigureSpec; stepFigures: readonly SourceQuestionFigureSpec[] };
