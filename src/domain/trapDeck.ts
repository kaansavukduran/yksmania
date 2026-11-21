import { bookletPlace, examOfSubject, processedYears, rowsForTopic, type OsymRow } from "./osymPatterns";

/*
 * ÖSYM tuzak destesi: one flash card per trap seen in the processed booklets
 * of a subject. A card never carries question text: its front is the question
 * pattern and the official heading, its back the trap, the measured skill and
 * where the question sits in the booklet.
 *
 * Grouping is deliberately simple and explainable: under the same subject and
 * the same official heading, two traps join one card when at least half of
 * their content-word stems are shared (Jaccard ≥ 0,5 over the first five
 * letters of every word of four or more letters). Grouped cards list every
 * original trap sentence; no merged wording is written.
 */
export type TrapCard = {
  id: string;
  subjectId: string;
  /** Official heading id, null when no official heading fits the questions. */
  heading: string | null;
  /** Pattern of the newest question in the group. */
  pattern: string;
  /** Distinct trap sentences, newest first. */
  traps: string[];
  /** Distinct measured skills, newest first. */
  skills: string[];
  /** Booklet places, newest first. */
  places: string[];
  rows: OsymRow[];
};

export const TRAP_SIMILARITY = 0.5;

const stems = (text: string) =>
  new Set(
    text
      .toLocaleLowerCase("tr")
      .replace(/[^a-zçğıöşüâîû0-9]+/g, " ")
      .split(" ")
      .filter((w) => w.length >= 4)
      .map((w) => w.slice(0, 5)),
  );

export function trapSimilarity(a: string, b: string) {
  const x = stems(a);
  const y = stems(b);
  if (!x.size || !y.size) return 0;
  let shared = 0;
  for (const w of x) if (y.has(w)) shared++;
  return shared / (x.size + y.size - shared);
}

const newestFirst = (a: OsymRow, b: OsymRow) =>
  b.y - a.y || a.e.localeCompare(b.e) || a.test.localeCompare(b.test, "tr") || a.q - b.q;

const unique = (list: string[]) => [...new Set(list.map((s) => s.trim()).filter(Boolean))];

/**
 * Cards for one subject, in official heading order of first appearance in
 * `headingOrder` (unknown and unplaced headings last), newest group first
 * within a heading. A row joins the first earlier group of its heading that
 * holds a similar trap (single link), so the result is deterministic.
 */
export function trapCards(rows: readonly OsymRow[], subjectId: string, headingOrder: readonly string[] = []): TrapCard[] {
  const mine = rows.filter((r) => r.subject === subjectId && r.trap.trim()).sort(newestFirst);
  const groups = new Map<string, OsymRow[][]>();
  for (const row of mine) {
    const key = row.c ?? "";
    const list = groups.get(key) ?? [];
    const home = list.find((g) => g.some((r) => trapSimilarity(r.trap, row.trap) >= TRAP_SIMILARITY));
    if (home) home.push(row);
    else list.push([row]);
    groups.set(key, list);
  }
  const rank = (heading: string) => {
    if (!heading) return Number.MAX_SAFE_INTEGER;
    const i = headingOrder.indexOf(heading);
    return i < 0 ? Number.MAX_SAFE_INTEGER - 1 : i;
  };
  return [...groups]
    .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
    .flatMap(([heading, list]) =>
      list.map((group) => {
        const first = group[0];
        return {
          id: `${subjectId}:${heading || "-"}:${first.y}-${first.e}-${first.q}`,
          subjectId,
          heading: heading || null,
          pattern: first.pattern,
          traps: unique(group.map((r) => r.trap)),
          skills: unique(group.map((r) => r.skill)),
          places: group.map(bookletPlace),
          rows: group,
        };
      }),
    );
}

/**
 * Subjects with booklet data, the learner's most frequent mistake subjects
 * first (by saved wrong answers), then the rest in the given order.
 */
export function trapSubjectOrder(
  rows: readonly OsymRow[],
  subjectOrder: readonly string[],
  wrongSubjects: readonly string[],
): { subjectId: string; mistakes: number }[] {
  const withData = new Set(rows.map((r) => r.subject));
  const count = new Map<string, number>();
  for (const s of wrongSubjects) if (withData.has(s)) count.set(s, (count.get(s) ?? 0) + 1);
  const base = [...subjectOrder.filter((s) => withData.has(s)), ...[...withData].filter((s) => !subjectOrder.includes(s)).sort()];
  return base
    .map((subjectId, i) => ({ subjectId, mistakes: count.get(subjectId) ?? 0, i }))
    .sort((a, b) => b.mistakes - a.mistakes || a.i - b.i)
    .map(({ subjectId, mistakes }) => ({ subjectId, mistakes }));
}

/**
 * "ÖSYM bu başlıktan 9 yılda N soru sordu" for a mistake card. Only detailed
 * study headings are ever assigned to booklet rows, so any other topic id has
 * no reliable count and gets none.
 */
export function osymTopicCount(
  rows: readonly OsymRow[],
  topicId: string | undefined,
  subjectId: string,
): { years: number; questions: number } | undefined {
  if (!topicId || !topicId.startsWith("detail-")) return undefined;
  const years = processedYears(rows, examOfSubject(subjectId)).length;
  if (!years) return undefined;
  return { years, questions: rowsForTopic(rows, topicId).length };
}
