import { lessons } from "../../domain/content";
import { lessonTopic, topicLessons } from "../../domain/studyPlan";
import { lessonGuides } from "../guides";
import type { HelpQuestion } from "../../domain/questionHelpModel";
import { sectionFigureGuideIds } from "./figureGuideIds";

/*
 * Picks the theory-section figure that best matches a question so the
 * "Bilmen gerekenler" hint can show the relevant drawing. Matching is lexical
 * (shared word stems weighted by how specific they are within the guide) and
 * deliberately conservative: a weak or ambiguous match shows no figure,
 * because a wrong drawing would mislead more than a missing one.
 */

const STOP = new Set(
  [
    "olan", "olur", "olarak", "ile", "için", "gibi", "daha", "bir", "iki", "üç",
    "her", "bu", "şu", "çok", "ama", "veya", "yani", "kadar", "sonra", "önce",
    "değil", "aynı", "farklı", "verilen", "verildi", "verilmiş", "soru", "şekil",
    "şekilde", "hangisi", "aşağıdaki", "doğru", "yanlış", "bulunur", "eder",
    "edilir", "yazılır", "kullan", "kullanılır", "sonuç", "cevap", "değeri",
    "değer", "uzunluk", "uzunluğu", "ölçü", "ölçüsü", "kaç", "nedir", "olduğu",
    "olduğundan", "çünkü", "ancak", "fakat", "birlikte", "yalnız", "sadece",
    "kontrol", "denetle", "adım", "ilk", "önce", "bilgi", "koşul", "koşulu",
    "göre", "görüntü", "değiştir", "değişir", "diğer", "kaçtır", "uygula",
    "oluyor", "arasında", "olması", "temel", "geçen", "farklı", "farkı",
    "sırası", "tanım", "ayrı", "yönü", "kesin", "kesinlikle", "hangisidir",
  ].map((w) => w.slice(0, 5)),
);
// Multi-word or symbolic terms that lose their meaning when split.
const PHRASES: [RegExp, string][] = [
  [/y\s*=\s*[−-]\s*x/g, "#y=-x"],
  [/y\s*=\s*x(?![\d²])/g, "#y=x"],
  [/orta\s+nokta/g, "#orta-nokta"],
  [/tam\s+iç\s+yansıma/g, "#tam-ic"],
  [/kritik\s+açı|sınır\s+açı/g, "#kritik"],
  [/dış\s+açı/g, "#dis-aci"],
  [/iç\s+açı/g, "#ic-aci"],
  [/ağırlık\s+merkez/g, "#agirlik"],
];
const stems = (text: string) => {
  const lower = text.toLocaleLowerCase("tr-TR");
  const phrases = PHRASES.flatMap(([re, tag]) => (lower.match(re) ? [tag] : []));
  return [
    ...phrases,
    ...(lower.match(/\p{L}{4,}/gu) ?? []).map((w) => w.slice(0, 5)).filter((w) => !STOP.has(w)),
  ];
};

interface SectionIndex {
  guideId: string;
  title: string;
  weights: Map<string, number>;
}
let indexByGuide: Map<string, SectionIndex[]> | undefined;
function guideIndex(guideId: string): SectionIndex[] {
  indexByGuide ??= new Map();
  const cached = indexByGuide.get(guideId);
  if (cached) return cached;
  const guide = lessonGuides.get(guideId);
  const sections = guide?.sections ?? [];
  const docs = sections.map((s) => {
    const tf = new Map<string, number>();
    for (const w of stems(s.title)) tf.set(w, (tf.get(w) ?? 0) + 3);
    // A named phrase ("tam iç yansıma", "y = x") is stronger evidence than a word.
    for (const p of s.paragraphs)
      for (const w of stems(p)) tf.set(w, (tf.get(w) ?? 0) + (w.startsWith("#") ? 3 : 1));
    return tf;
  });
  const df = new Map<string, number>();
  for (const d of docs) for (const w of d.keys()) df.set(w, (df.get(w) ?? 0) + 1);
  const n = Math.max(docs.length, 1);
  const out = sections.map((s, i) => {
    const weights = new Map<string, number>();
    for (const [w, c] of docs[i]) {
      // Words found in most sections of the guide say little about which one.
      const idf = Math.log((n + 1) / (df.get(w) ?? 1));
      if (idf > 0) weights.set(w, Math.min(c, 4) * idf);
    }
    return { guideId, title: s.title, weights };
  });
  indexByGuide.set(guideId, out);
  return out;
}

let lessonOfQuestion: Map<string, string> | undefined;
function questionLesson(id: string) {
  if (!lessonOfQuestion) {
    lessonOfQuestion = new Map();
    for (const l of lessons) for (const q of l.questions) lessonOfQuestion.set(q.id, l.id);
  }
  return lessonOfQuestion.get(id);
}

/** Guides with section figures that teach the topic this question belongs to. */
export function figureGuidesFor(questionId: string): string[] {
  const lessonId = questionLesson(questionId);
  if (!lessonId) return [];
  if (sectionFigureGuideIds.has(lessonId)) return [lessonId];
  const topic = lessonTopic[lessonId];
  if (!topic) return [];
  return topicLessons(topic)
    .map((l) => l.id)
    .filter((id) => sectionFigureGuideIds.has(id));
}

// Sibling concepts that share most vocabulary. A section titled with one of
// them is never offered to a question that names only the other.
const CONTRAST: [string, string][] = [
  ["çukur", "tümse"],
  ["yakın", "ıraks"],
  ["tümle", "bütün"],
  ["içten", "dışta"],
  ["yansı", "kırıl"],
  ["prizm", "piram"],
  ["dikdö", "eşken"],
];
function contradicts(title: string[], question: Set<string>) {
  return CONTRAST.some(
    ([a, b]) =>
      (title.includes(a) && question.has(b) && !question.has(a)) ||
      (title.includes(b) && question.has(a) && !question.has(b)),
  );
}

export interface HintFigureMatch {
  guideId: string;
  title: string;
  score: number;
  runnerUp: number;
}
export const HINT_FIGURE_MIN_SCORE = 5;
export const HINT_FIGURE_MIN_MARGIN = 1.25;

export function scoreHintFigure(question: HelpQuestion): HintFigureMatch | undefined {
  const guides = figureGuidesFor(question.id);
  if (!guides.length) return undefined;
  const text = [
    question.passage ?? "",
    question.prompt,
    question.hint ?? "",
    ...(question.guidance?.knowledge ?? []),
    question.guidance?.strategy ?? "",
  ].join(" ");
  const q = new Set(stems(text));
  // The question's own words (not the shared guidance text) must echo the
  // chosen section's title, so a figure is tied to what is actually asked.
  // Options are excluded: distractor wording would pull toward other sections.
  const own = new Set(stems([question.passage ?? "", question.prompt, question.hint ?? ""].join(" ")));
  const sections = guides.flatMap(guideIndex);
  const scored = sections
    .map((s) => {
      let score = 0;
      // The question's own wording decides; shared guidance only breaks ties.
      for (const w of q) score += (s.weights.get(w) ?? 0) * (own.has(w) ? 1 : 0.2);
      const title = stems(s.title);
      const echoed = title.some((w) => own.has(w) && (s.weights.get(w) ?? 0) > 0);
      // A named phrase in the question must also be taught in that section.
      const phrasesTaught = [...own].filter((w) => w.startsWith("#")).every((w) => s.weights.has(w));
      return {
        guideId: s.guideId,
        title: s.title,
        score,
        ok: echoed && phrasesTaught && !contradicts(title, own),
      };
    })
    .sort((a, b) => b.score - a.score);
  if (!scored.length) return undefined;
  const best = scored[0];
  return { guideId: best.guideId, title: best.title, score: best.ok ? best.score : 0, runnerUp: scored[1]?.score ?? 0 };
}

/** The section figure to show in a question's hint, if the match is clear. */
export function hintFigureFor(question: HelpQuestion) {
  const m = scoreHintFigure(question);
  if (!m) return undefined;
  if (m.score < HINT_FIGURE_MIN_SCORE) return undefined;
  if (m.runnerUp > 0 && m.score / m.runnerUp < HINT_FIGURE_MIN_MARGIN) return undefined;
  return { guideId: m.guideId, title: m.title };
}
