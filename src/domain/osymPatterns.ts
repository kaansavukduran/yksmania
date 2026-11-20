/*
 * Past ÖSYM booklets, read question by question into "what was measured and
 * how" rows. A row never carries question text: it names the topic, the
 * question pattern, the skill and the usual trap in our own words, plus where
 * the question sits in the official booklet (year, exam, test, number).
 *
 * Counts are only honest for booklets that were actually processed, so every
 * helper works from the years present in the rows it is given.
 */
export type OsymExam = "TYT" | "AYT";
export type OsymForm =
  | "düz"
  | "öncül"
  | "grafik"
  | "tablo"
  | "şekil"
  | "paragraf"
  | "deney"
  | "eşleştirme"
  | "sıralama"
  | "hesap"
  | "harita";

export interface OsymRow {
  y: number;
  e: OsymExam;
  test: string;
  q: number;
  subject: string;
  /** Official key letter, or "iptal" for a cancelled question. */
  a: string;
  topic: string | null;
  topic2: string | null;
  /** Sub-topic in words when the heading list has no exact match. */
  topicNote: string | null;
  pattern: string;
  skill: string;
  trap: string;
  form: OsymForm;
  difficulty: 1 | 2 | 3;
  /** Philosophy questions answered instead of Religious Culture. */
  alt?: boolean;
}

export const examOfSubject = (subjectId: string): OsymExam => (subjectId.startsWith("ayt-") ? "AYT" : "TYT");

const byBookletOrder = (a: OsymRow, b: OsymRow) =>
  b.y - a.y || a.test.localeCompare(b.test, "tr") || a.q - b.q;

/** Years whose booklet for this exam was processed, oldest first. */
export function processedYears(rows: readonly OsymRow[], exam: OsymExam): number[] {
  return [...new Set(rows.filter((r) => r.e === exam).map((r) => r.y))].sort((a, b) => a - b);
}

/** Rows that measure this topic, newest booklet first. */
export function rowsForTopic(rows: readonly OsymRow[], topicId: string): OsymRow[] {
  return rows.filter((r) => r.topic === topicId || r.topic2 === topicId).sort(byBookletOrder);
}

export interface YearCount {
  year: number;
  count: number;
}

/** One cell per processed year, zero included: "not asked" is information. */
export function topicYearCounts(rows: readonly OsymRow[], topicId: string, exam: OsymExam): YearCount[] {
  const mine = rowsForTopic(rows, topicId);
  return processedYears(rows, exam).map((year) => ({ year, count: mine.filter((r) => r.y === year).length }));
}

export interface HeatmapRow {
  id: string;
  title: string;
  cells: number[];
  total: number;
}

/** Topic × year question counts for one subject, in the given topic order. */
export function subjectHeatmap(
  rows: readonly OsymRow[],
  subjectId: string,
  topics: readonly { id: string; title: string }[],
): { years: number[]; rows: HeatmapRow[]; questions: number } {
  const years = processedYears(rows, examOfSubject(subjectId));
  const mine = rows.filter((r) => r.subject === subjectId);
  const table = topics.map((t) => {
    const cells = years.map((y) => mine.filter((r) => r.y === y && (r.topic === t.id || r.topic2 === t.id)).length);
    return { id: t.id, title: t.title, cells, total: cells.reduce((a, b) => a + b, 0) };
  });
  return { years, rows: table, questions: mine.length };
}

export interface NoteGroup {
  note: string;
  count: number;
  years: number[];
}

/** Questions the heading list could not place, grouped by their sub-topic note. */
export function unplacedGroups(rows: readonly OsymRow[], subjectId: string): NoteGroup[] {
  const groups = new Map<string, OsymRow[]>();
  for (const r of rows) {
    if (r.subject !== subjectId || r.topic !== null || !r.topicNote) continue;
    const key = r.topicNote.trim();
    groups.set(key, [...(groups.get(key) ?? []), r]);
  }
  return [...groups]
    .map(([note, list]) => ({ note, count: list.length, years: [...new Set(list.map((r) => r.y))].sort((a, b) => a - b) }))
    .sort((a, b) => b.count - a.count || a.note.localeCompare(b.note, "tr"));
}

export interface FormShare {
  form: OsymForm;
  count: number;
  /** Whole percent of the subject's processed questions. */
  percent: number;
}

/** How the subject's questions were posed (graph, premises, calculation…). */
export function formShares(rows: readonly OsymRow[], subjectId: string): FormShare[] {
  const mine = rows.filter((r) => r.subject === subjectId);
  const counts = new Map<OsymForm, number>();
  for (const r of mine) counts.set(r.form, (counts.get(r.form) ?? 0) + 1);
  return [...counts]
    .map(([form, count]) => ({ form, count, percent: Math.round((count / mine.length) * 100) }))
    .sort((a, b) => b.count - a.count || a.form.localeCompare(b.form, "tr"));
}

export interface BookletSummary {
  year: number;
  exam: OsymExam;
  questions: number;
}

export function processedBooklets(rows: readonly OsymRow[]): BookletSummary[] {
  const map = new Map<string, BookletSummary>();
  for (const r of rows) {
    const key = `${r.y}-${r.e}`;
    const hit = map.get(key) ?? { year: r.y, exam: r.e, questions: 0 };
    hit.questions++;
    map.set(key, hit);
  }
  return [...map.values()].sort((a, b) => b.year - a.year || a.exam.localeCompare(b.exam));
}

/** "2025 TYT · Fen Bilimleri · 9. soru": enough to find it in the official booklet. */
export const bookletPlace = (r: OsymRow) => `${r.y} ${r.e} · ${r.test} · ${r.q}. soru`;
