import type { Lesson, Question } from "./model";

/*
 * Estimated difficulty stars (1–10) for the built-in questions.
 *
 * There is no national calibration data for original questions, so the star
 * value is an honest *estimate* computed from what makes a YKS item demanding:
 * reading load, the number of quantities to track, premise lists (I, II, III),
 * negative stems, counting/extremum asks, symbolic load and the length of the
 * worked solution. Within each subject the questions are ranked by that score
 * and split into ten equal bands, so every star level holds the same number of
 * questions (±1). A star therefore means "relative difficulty inside this
 * subject's bank", not an official ÖSYM difficulty or a success probability.
 *
 * The value is derived from content only. It never reads learner answers and
 * never writes state; filtering by stars does not award any evidence.
 */

export const STAR_LEVELS = 10;

const NEGATIVE = /(değildir|yanlıştır|olamaz|söylenemez|ulaşılamaz|yoktur|bulunmaz|gösterilemez|çıkarılamaz)/i;
const COUNT_ASK = /(kaç farklı|kaç tane|en az|en fazla|en büyük|en küçük|kaç tanesi)/i;
const PREMISE = /(^|\s)(I{1,3}|IV|V)\.\s/g;
const NUMBER = /\d+(?:[.,]\d+)?/g;
const SYMBOL = /[√²³π∫∑≤≥≠·×÷^°]|log|sin|cos|tan|lim/g;

const count = (text: string, re: RegExp) => (text.match(re) ?? []).length;

export function difficultyScore(q: Pick<Question, "prompt" | "passage" | "options" | "explanation">): number {
  const prompt = q.prompt.tr;
  const passage = q.passage?.tr ?? "";
  const options = q.options.map((o) => o.tr);
  const stem = `${passage}\n${prompt}`;
  const optionText = options.join(" ");
  let score = 0;
  score += Math.min(passage.length, 1600) * 0.035; // reading load, capped
  score += Math.min(prompt.length, 600) * 0.05;
  score += Math.min(optionText.length, 500) * 0.03;
  score += Math.min(count(stem, NUMBER), 14) * 2.2; // quantities to track
  score += Math.min(count(stem + optionText, SYMBOL), 12) * 1.6;
  score += Math.min(count(stem, PREMISE), 5) * 4;
  if (NEGATIVE.test(prompt)) score += 7;
  if (COUNT_ASK.test(prompt)) score += 5;
  score += Math.min(q.explanation.tr.length, 900) * 0.025; // solution length
  return Math.round(score * 100) / 100;
}

export type StarIndex = Map<string, number>;

/** Ranks every question of each subject into ten equal bands. */
export function buildStarIndex(lessons: readonly Lesson[]): StarIndex {
  const bySubject = new Map<string, { id: string; score: number }[]>();
  for (const lesson of lessons)
    for (const q of lesson.questions) {
      const row = bySubject.get(lesson.subjectId) ?? [];
      row.push({ id: q.id, score: difficultyScore(q) });
      bySubject.set(lesson.subjectId, row);
    }
  const index: StarIndex = new Map();
  for (const rows of bySubject.values()) {
    rows.sort((a, b) => a.score - b.score || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    rows.forEach((row, rank) => index.set(row.id, Math.floor((rank * STAR_LEVELS) / rows.length) + 1));
  }
  return index;
}

export function starDistribution(index: StarIndex, ids: Iterable<string>): number[] {
  const out = Array<number>(STAR_LEVELS).fill(0);
  for (const id of ids) {
    const star = index.get(id);
    if (star) out[star - 1]++;
  }
  return out;
}

export const STAR_BANDS: { label: string; min: number; max: number }[] = [
  { label: "Isınma (1–2 yıldız)", min: 1, max: 2 },
  { label: "Temel (3–4 yıldız)", min: 3, max: 4 },
  { label: "Orta (5–6 yıldız)", min: 5, max: 6 },
  { label: "Zor (7–8 yıldız)", min: 7, max: 8 },
  { label: "Seçici (9–10 yıldız)", min: 9, max: 10 },
];
