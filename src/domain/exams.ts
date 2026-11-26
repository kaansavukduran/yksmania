import { practiceQuestionView } from "../learning/practiceQuestionView";
import { clarifiedQuestionView } from "./questionPresentation";
import { lessons, subjects } from "./content";
import type { AppState, Lesson, Subject } from "./model";
import type { ExamDraft, ExamItem, ExamSession } from "./examModel";
import {
  helpPanels,
  previousHelpPanelCount,
  resolvedGuidance,
} from "../learning/questionHelp";
import { effectiveHelpLevel } from "../learning/helpProgression";
import { buildStarIndex, type StarIndex } from "./difficulty";
import { defaultBlockOrder, orderExamItems } from "./examOrder";
import { recordView } from "./examPacing";
export type ExamSpec = {
  id: string;
  title: string;
  exam: "TYT" | "AYT";
  kind: "mixed" | "branch";
  items: ExamItem[];
  durationSeconds: number;
  fullLength: boolean;
  missingSubjects: string[];
};
export const examReference = {
  TYT: { questions: 120, seconds: 165 * 60 },
  AYT: { questions: 80, seconds: 180 * 60 },
} as const;
export function scaledExamSeconds(exam: "TYT" | "AYT", count: number) {
  if (!Number.isInteger(count) || count < 1 || count > 300)
    throw Error("EXAM_SIZE");
  return Math.round(
    (examReference[exam].seconds * count) / examReference[exam].questions,
  );
}
// Built-in lessons are immutable at runtime, so each lesson's exam view is built
// once. Callers never mutate these shared items: everything that enters state
// passes through selectExamVariant's copyItem (structuredClone).
const snapshots = new WeakMap<Lesson, readonly ExamItem[]>();
function snapshot(lesson: Lesson): readonly ExamItem[] {
  let items = snapshots.get(lesson);
  if (!items) snapshots.set(lesson, (items = buildSnapshot(lesson)));
  return items;
}
function buildSnapshot(lesson: Lesson): ExamItem[] {
  const subject = subjects.find((s) => s.id === lesson.subjectId)!;
  return lesson.questions.map((q) => {
    const helpQuestion = practiceQuestionView(clarifiedQuestionView({
      id: q.id,
      prompt: q.prompt.tr,
      passage: q.passage?.tr,
      options: q.options.map((o) => o.tr),
      answer: q.answer,
      explanation: q.explanation.tr,
      hint: q.hint.tr,
      guidance: q.guidance,
    }));
    const guidance = resolvedGuidance(helpQuestion);
    return {
      id: q.id,
      lessonId: lesson.id,
      subjectId: subject.id,
      subjectName: subject.name.tr,
      lessonTitle: lesson.title.tr,
      prompt: helpQuestion.prompt,
      ...(q.passage ? { passage: q.passage.tr } : {}),
      options: [...helpQuestion.options],
      answer: q.answer,
      explanation: helpQuestion.explanation,
      hint: helpQuestion.hint,
      ...(guidance ? { guidance: structuredClone(guidance) } : {}),
    };
  });
}
// Interleave lesson questions, so a short section samples several taught skills.
function subjectItems(
  ids: string[],
  limit: number,
  random?: () => number,
  fiveOptionsOnly = false,
) {
  const rows = lessons
      .filter((l) => ids.includes(l.subjectId) && l.questions.length)
      .map((lesson) =>
        snapshot(lesson).filter(
          (item) => !fiveOptionsOnly || item.options.length === 5,
        ),
      ),
    selectedRows = random
      ? shuffle(
          rows.map((row) => shuffle(row, random)),
          random,
        )
      : rows,
    result: ExamItem[] = [];
  for (
    let index = 0;
    result.length < limit && selectedRows.some((r) => index < r.length);
    index++
  )
    for (const row of selectedRows)
      if (row[index] && result.length < limit) result.push(row[index]);
  return result;
}
function groupTargets(exam: "TYT" | "AYT"): [string[], number][] {
  return exam === "TYT"
    ? [
        [["tyt-turkce"], 40],
        // 2018–2026 kitapçıklarında Temel Matematik 40 sorunun 29–31'i
        // matematik, 9–11'i geometridir: pay ayrı kotalarla sabitlenir.
        [["tyt-matematik"], 30],
        [["tyt-geometri"], 10],
        [["tyt-tarih"], 5],
        [["tyt-cografya"], 5],
        [["tyt-felsefe"], 5],
        [["tyt-din"], 5],
        [["tyt-fizik"], 7],
        [["tyt-kimya"], 7],
        [["tyt-biyoloji"], 6],
      ]
    : [
        [["ayt-matematik"], 30],
        [["ayt-geometri"], 10],
        [["ayt-fizik"], 14],
        [["ayt-kimya"], 13],
        [["ayt-biyoloji"], 13],
      ];
}
function mixed(exam: "TYT" | "AYT"): ExamSpec {
  const groups = groupTargets(exam);
  // A full mock needs both the subject quotas and five-choice questions.
  // Short teaching practices retain the older cards; saved papers are snapshots.
  const fiveOptionsOnly = groups.every(
    ([ids, count]) =>
      lessons.reduce(
        (total, lesson) =>
          total +
          (ids.includes(lesson.subjectId)
            ? lesson.questions.filter(
                (question) => question.options.length === 5,
              ).length
            : 0),
        0,
      ) >= count,
  );
  const selected = groups.map(([ids, count]) =>
    subjectItems(ids, count, undefined, fiveOptionsOnly),
  );
  const items = selected.flat();
  const missingSubjects = groups
    .filter(([, count], index) => selected[index].length < count)
    .map(([ids]) =>
      ids.map((id) => subjects.find((s) => s.id === id)!.name.tr).join(" / "),
    );
  const fullLength = fiveOptionsOnly && missingSubjects.length === 0;
  return {
    id: `mixed-${exam.toLowerCase()}`,
    title: exam === "TYT" ? "TYT karma denemesi" : "AYT Sayısal karma denemesi",
    exam,
    kind: "mixed",
    items,
    durationSeconds: scaledExamSeconds(exam, items.length),
    fullLength,
    missingSubjects,
  };
}
function branchSpec(subject: Subject): ExamSpec | undefined {
  const items = subjectItems([subject.id], 40);
  if (!items.length) return undefined;
  return {
    id: `branch-${subject.id}`,
    title: `${subject.exam} ${subject.name.tr} branş denemesi`,
    exam: subject.exam,
    kind: "branch",
    items,
    durationSeconds: scaledExamSeconds(subject.exam, items.length),
    fullLength: false,
    missingSubjects: [],
  };
}
function previewForId(id: string): ExamSpec | undefined {
  // The catalogue is deterministic, so its cached paper is the preview.
  catalogueCache ??= buildCatalogue();
  return catalogueCache.find((spec) => spec.id === id);
}
let starIndexCache: StarIndex | undefined;
/** Estimated 1–10 difficulty star of a built-in question (see difficulty.ts). */
export function questionStars(id: string): number | undefined {
  starIndexCache ??= buildStarIndex(lessons);
  return starIndexCache.get(id);
}
export function starPool(subjectId: string, min: number, max: number) {
  return lessons
    .filter((l) => l.subjectId === subjectId && l.questions.length)
    .flatMap((lesson) => snapshot(lesson))
    .filter((item) => {
      const star = questionStars(item.id) ?? 0;
      return star >= min && star <= max;
    });
}
/**
 * A short practice drawn from one subject's questions whose estimated star
 * level falls inside [min, max]. It is never a full official-format exam.
 */
export function starPracticeSpec(
  subjectId: string,
  min: number,
  max: number,
  random?: () => number,
  limit = 20,
): ExamSpec | undefined {
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) return undefined;
  const pool = starPool(subjectId, min, max);
  const items = (random ? shuffle(pool, random) : pool).slice(0, limit);
  if (!items.length) return undefined;
  const range = min === max ? `${min}` : `${min}–${max}`;
  return {
    id: `stars-${subjectId}-${min}-${max}`,
    title: `${subject.exam} ${subject.name.tr} · ${range} yıldız zorluk alıştırması`,
    exam: subject.exam,
    kind: "branch",
    items,
    durationSeconds: scaledExamSeconds(subject.exam, items.length),
    fullLength: false,
    missingSubjects: [],
  };
}
/**
 * "Hata avı sprinti": a short practice built from the learner's own open
 * mistakes (at most 10). Items answered without opening help count as later
 * independent answers for the mistake's repair status.
 */
/** Verilen soru kimliklerinin deneme kopyaları, verilen sırayla (bulunmayanlar atlanır). */
export function examItemsByIds(questionIds: readonly string[]): ExamItem[] {
  const wanted = [...new Set(questionIds)];
  const byId = new Map<string, ExamItem>();
  for (const lesson of lessons) {
    if (!lesson.questions.some((q) => wanted.includes(q.id))) continue;
    for (const item of snapshot(lesson)) if (wanted.includes(item.id)) byId.set(item.id, item);
  }
  return wanted.map((id) => byId.get(id)).filter((x): x is ExamItem => !!x);
}
export function mistakeSprintSpec(
  questionIds: readonly string[],
  limit = 10,
  kind: "sprint" | "boss" = "sprint",
): ExamSpec | undefined {
  const wanted = [...new Set(questionIds)].slice(0, limit);
  const byId = new Map<string, ExamItem>();
  for (const lesson of lessons) {
    if (!lesson.questions.some((q) => wanted.includes(q.id))) continue;
    for (const item of snapshot(lesson)) if (wanted.includes(item.id)) byId.set(item.id, item);
  }
  const items = wanted.map((id) => byId.get(id)).filter((x): x is ExamItem => !!x);
  if (!items.length) return undefined;
  const ayt = items.filter((i) => i.subjectId.startsWith("ayt-")).length;
  const exam = ayt > items.length / 2 ? "AYT" : "TYT";
  return {
    id: `${kind}-${items.map((i) => i.id).join("|").length}-${items.length}`,
    title: kind === "boss" ? `Hafta sonu hata boss’u · ${items.length} soru` : `Hata avı sprinti · ${items.length} soru`,
    exam,
    kind: "branch",
    items,
    durationSeconds: scaledExamSeconds(exam, items.length),
    fullLength: false,
    missingSubjects: [],
  };
}
let catalogueCache: readonly ExamSpec[] | undefined;
export function examCatalogue(): ExamSpec[] {
  catalogueCache ??= buildCatalogue();
  return [...catalogueCache];
}
function buildCatalogue(): ExamSpec[] {
  return [
    mixed("TYT"),
    mixed("AYT"),
    ...subjects.flatMap((subject) => {
      const branch = branchSpec(subject);
      return branch ? [branch] : [];
    }),
  ];
}
// A variant is generated once, at start. Drafts and past sessions always use
// their complete stored question snapshots; no shuffle runs during resume.
function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function seededRandom(seed: string): () => number {
  let value = 2166136261;
  for (let i = 0; i < seed.length; i++)
    value = Math.imul(value ^ seed.charCodeAt(i), 16777619);
  return () => {
    let n = (value += 0x6d2b79f5);
    n = Math.imul(n ^ (n >>> 15), n | 1);
    n ^= n + Math.imul(n ^ (n >>> 7), n | 61);
    return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
  };
}
const copyItem = (item: ExamItem): ExamItem => structuredClone(item);

export function selectExamVariant(
  spec: ExamSpec,
  seed: string,
  previousIds: readonly string[] = [],
): ExamItem[] {
  // Unknown or deliberately customized specs keep the supplied paper. This
  // protects callers that construct a smaller practice from catalogue metadata.
  // Only the requested preview is needed to recognize a catalogue paper.
  // Rebuilding every subject here copied unrelated guidance for each start.
  const candidate = previewForId(spec.id);
  const known =
    candidate &&
    candidate.id === spec.id &&
    candidate.title === spec.title &&
    candidate.exam === spec.exam &&
    candidate.kind === spec.kind &&
    candidate.durationSeconds === spec.durationSeconds &&
    candidate.fullLength === spec.fullLength &&
    candidate.missingSubjects.join("\n") === spec.missingSubjects.join("\n") &&
    candidate.items.length === spec.items.length &&
    candidate.items.every(
      (item, i) => JSON.stringify(item) === JSON.stringify(spec.items[i]),
    )
      ? candidate
      : undefined;
  if (!known) return spec.items.map(copyItem);
  const random = seededRandom(seed),
    groups: [string[], number][] =
      known.kind === "mixed"
        ? groupTargets(known.exam)
        : [[[known.id.slice("branch-".length)], 40]],
    selected = groups.map(([ids, count]) =>
      subjectItems(
        ids,
        count,
        random,
        known.kind === "mixed" && known.fullLength,
      ),
    );
  const ids = selected.flatMap((group) => group.map((item) => item.id));
  // A small bank may repeat the same questions. If it repeats the entire last
  // order too, rotate inside one subject block without changing the quotas.
  if (
    ids.length === previousIds.length &&
    ids.every((id, i) => id === previousIds[i])
  ) {
    const group = selected.find((items) => items.length > 1);
    if (group) group.push(group.shift()!);
  }
  return selected.flat().map(copyItem);
}

export function beginExam(
  state: AppState,
  spec: ExamSpec,
  now: number,
  mode: "simulation" | "learning" = "simulation",
  blockOrder?: readonly string[],
): AppState {
  if (state.examDraft) throw Error("EXAM_IN_PROGRESS");
  if (!spec.items.length) throw Error("EXAM_EMPTY");
  const previous = state.examSessions.findLast(
    (session) =>
      session.title === spec.title &&
      session.exam === spec.exam &&
      session.kind === spec.kind,
  );
  // Ders sırası yalnız karma denemede seçilir; varyant karşılaştırması
  // varsayılan sırayla yapılır ki seçilen sıra soru seçimini etkilemesin.
  const ordered = spec.kind === "mixed" && blockOrder !== undefined;
  const variant = selectExamVariant(
    spec,
    `${spec.id}:${now}:${state.examSessions.length}`,
    previous &&
      (ordered
        ? orderExamItems(spec.exam, previous.items, defaultBlockOrder(spec.exam))
        : previous.items
      ).map((item) => item.id),
  );
  const items = ordered ? orderExamItems(spec.exam, variant, blockOrder) : variant;
  const draft: ExamDraft = {
    id: `exam:${now}:${spec.id}`,
    title: spec.title,
    exam: spec.exam,
    kind: spec.kind,
    items,
    answers: items.map(() => null),
    flagged: [],
    index: 0,
    startedAt: now,
    deadline: now + spec.durationSeconds * 1000,
    durationSeconds: spec.durationSeconds,
    mode,
    itemMs: items.map(() => 0),
    viewedAt: now,
  };
  return { ...state, examDraft: draft };
}
export function changeExam(
  state: AppState,
  id: string,
  action:
    | { type: "answer"; index: number; value: number | null }
    | { type: "index"; index: number }
    | { type: "flag"; index: number }
    | { type: "help-enabled"; index: number; value: boolean }
    | { type: "help"; index: number; level: number },
  now: number,
): AppState {
  const draft = state.examDraft;
  if (!draft || draft.id !== id) throw Error("EXAM_CHANGED");
  // Resmî süre dolsa da deneme öğrenci bitirene kadar açık kalır.
  if (
    !Number.isInteger(action.index) ||
    action.index < 0 ||
    action.index >= draft.items.length
  )
    throw Error("EXAM_INDEX");
  if (action.type === "index")
    return {
      ...state,
      examDraft:
        action.index === draft.index
          ? { ...draft, index: action.index }
          : { ...recordView(draft, draft.index, now), index: action.index },
    };
  if (action.type === "help-enabled")
    return { ...state, examDraft: { ...draft, helpEnabled: action.value } };
  if (action.type === "help") {
    if (draft.mode !== "learning" && !draft.helpEnabled)
      throw Error("EXAM_HELP_DISABLED");
    const question = draft.items[action.index],
      panels = helpPanels(question),
      limit = panels.length + 1,
      visibleLevel = effectiveHelpLevel(
        panels,
        draft.helpLevels?.[action.index],
        draft.helpPanelCounts?.[String(action.index)],
        previousHelpPanelCount(question),
        question.hint,
      );
    if (
      !Number.isInteger(action.level) ||
      action.level < 1 ||
      action.level > limit
    )
      throw Error("EXAM_HELP_LEVEL");
    const helpLevels = draft.items.map((_, i) =>
      i === action.index
        ? Math.max(visibleLevel, action.level)
        : (draft.helpLevels?.[i] ?? 0),
    );
    return {
      ...state,
      examDraft: {
        ...draft,
        helpLevels,
        helpPanelCounts: {
          ...draft.helpPanelCounts,
          [String(action.index)]: panels.length,
        },
      },
    };
  }
  if (action.type === "flag")
    return {
      ...state,
      examDraft: {
        ...draft,
        flagged: draft.flagged.includes(action.index)
          ? draft.flagged.filter((i) => i !== action.index)
          : [...draft.flagged, action.index],
      },
    };
  const q = draft.items[action.index];
  if (
    action.value !== null &&
    (!Number.isInteger(action.value) ||
      action.value < 0 ||
      action.value >= q.options.length)
  )
    throw Error("EXAM_ANSWER");
  return {
    ...state,
    examDraft: {
      ...draft,
      answers: draft.answers.map((value, i) =>
        i === action.index ? action.value : value,
      ),
    },
  };
}
export function finishExam(state: AppState, id: string, now: number): AppState {
  if (state.examSessions.some((s) => s.id === id)) return state;
  const draft = state.examDraft;
  if (!draft || draft.id !== id) throw Error("EXAM_CHANGED");
  // Bitiş anı resmî süreye kırpılmaz; deneme yalnız öğrenci bitirince biter.
  const finishedAt = Math.max(now, draft.startedAt);
  // Açık sorunun süresi bitiş anına kadar eklenir; görüntüleme başlangıcı
  // yalnız taslakta anlamlıdır, oturuma taşınmaz.
  const timed =
    draft.viewedAt !== undefined || draft.itemMs !== undefined
      ? recordView(draft, draft.index, finishedAt)
      : { ...draft };
  delete timed.viewedAt;
  const session: ExamSession = {
    ...timed,
    finishedAt,
    // "Resmî süre aşıldı" bilgisi; puanı, XP'yi ya da kupayı değiştirmez.
    timedOut: finishedAt >= draft.deadline,
  };
  return {
    ...state,
    examDraft: null,
    examSessions: [...state.examSessions, session],
  };
}
export function examScore(session: Pick<ExamDraft, "items" | "answers">) {
  const result = new Map<
    string,
    {
      subject: string;
      correct: number;
      wrong: number;
      blank: number;
      net: number;
    }
  >();
  session.items.forEach((q, i) => {
    const row = result.get(q.subjectId) ?? {
      subject: q.subjectName,
      correct: 0,
      wrong: 0,
      blank: 0,
      net: 0,
    };
    if (session.answers[i] === null) row.blank++;
    else if (session.answers[i] === q.answer) row.correct++;
    else row.wrong++;
    row.net = row.correct - row.wrong / 4;
    result.set(q.subjectId, row);
  });
  const totals = [...result.values()].reduce(
    (sum, row) => ({
      correct: sum.correct + row.correct,
      wrong: sum.wrong + row.wrong,
      blank: sum.blank + row.blank,
      net: sum.net + row.net,
    }),
    { correct: 0, wrong: 0, blank: 0, net: 0 },
  );
  return {
    subjects: [...result.entries()].map(([id, row]) => ({ id, ...row })),
    ...totals,
  };
}

export function examAssistance(
  session: Pick<ExamDraft, "items" | "answers" | "helpLevels">,
) {
  let helped = 0,
    assistedCorrect = 0,
    independentCorrect = 0;
  session.items.forEach((q, i) => {
    const assisted = (session.helpLevels?.[i] ?? 0) > 0;
    if (assisted) helped++;
    if (session.answers[i] === q.answer) {
      if (assisted) assistedCorrect++;
      else independentCorrect++;
    }
  });
  return { helped, assistedCorrect, independentCorrect };
}
