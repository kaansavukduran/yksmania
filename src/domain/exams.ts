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
function snapshot(lesson: Lesson): ExamItem[] {
  const subject = subjects.find((s) => s.id === lesson.subjectId)!;
  return lesson.questions.map((q) => {
    const helpQuestion = clarifiedQuestionView({
      id: q.id,
      prompt: q.prompt.tr,
      passage: q.passage?.tr,
      options: q.options.map((o) => o.tr),
      answer: q.answer,
      explanation: q.explanation.tr,
      hint: q.hint.tr,
      guidance: q.guidance,
    });
    const guidance = resolvedGuidance(helpQuestion);
    return {
      id: q.id,
      lessonId: lesson.id,
      subjectId: subject.id,
      subjectName: subject.name.tr,
      lessonTitle: lesson.title.tr,
      prompt: helpQuestion.prompt,
      ...(q.passage ? { passage: q.passage.tr } : {}),
      options: q.options.map((o) => o.tr),
      answer: q.answer,
      explanation: q.explanation.tr,
      hint: q.hint.tr,
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
        [["tyt-matematik", "tyt-geometri"], 40],
        [["tyt-tarih"], 5],
        [["tyt-cografya"], 5],
        [["tyt-felsefe"], 5],
        [["tyt-din"], 5],
        [["tyt-fizik"], 7],
        [["tyt-kimya"], 7],
        [["tyt-biyoloji"], 6],
      ]
    : [
        [["ayt-matematik", "ayt-geometri"], 40],
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
  if (id === "mixed-tyt") return mixed("TYT");
  if (id === "mixed-ayt") return mixed("AYT");
  const subject = subjects.find((s) => `branch-${s.id}` === id);
  return subject ? branchSpec(subject) : undefined;
}
export function examCatalogue(): ExamSpec[] {
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
): AppState {
  if (state.examDraft) throw Error("EXAM_IN_PROGRESS");
  if (!spec.items.length) throw Error("EXAM_EMPTY");
  const previous = state.examSessions.findLast(
    (session) =>
      session.title === spec.title &&
      session.exam === spec.exam &&
      session.kind === spec.kind,
  );
  const items = selectExamVariant(
    spec,
    `${spec.id}:${now}:${state.examSessions.length}`,
    previous?.items.map((item) => item.id),
  );
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
  if (now >= draft.deadline) throw Error("EXAM_EXPIRED");
  if (
    !Number.isInteger(action.index) ||
    action.index < 0 ||
    action.index >= draft.items.length
  )
    throw Error("EXAM_INDEX");
  if (action.type === "index")
    return { ...state, examDraft: { ...draft, index: action.index } };
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
  const session: ExamSession = {
    ...draft,
    finishedAt: Math.min(draft.deadline, Math.max(now, draft.startedAt)),
    timedOut: now >= draft.deadline,
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
