import { expect, it, vi } from "vitest";
import { lessons } from "../src/domain/content";
import { initialState } from "../src/domain/model";
import {
  beginExam,
  changeExam,
  examCatalogue,
  examScore,
  finishExam,
  selectExamVariant,
  type ExamSpec,
} from "../src/domain/exams";
import { validateState } from "../src/domain/storage";
import { localizedQuestionView } from "../src/domain/questionPresentation";
const targetIds = vi.hoisted(
  () =>
    new Set([
      "snd-10",
      "periodic-4",
      "eq-2",
      "eq-5",
      "iyonik-bilesik-adlandirma-q2",
      "f013-foundation-katman-elektron-dizilimi-3",
      "f013-foundation-katman-elektron-dizilimi-7",
    ]),
);
// Constrain only these three source pools so the production snapshot path sees
// every target. This checks payload projection, independently of random sampling.
vi.mock("../src/domain/content", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/domain/content")>();
  const selectedSubjects = new Set(["tyt-turkce", "tyt-kimya", "ayt-kimya"]);
  return {
    ...actual,
    lessons: actual.lessons.flatMap((l) => {
      if (!selectedSubjects.has(l.subjectId)) return [l];
      const questions = l.questions.filter((q) => targetIds.has(q.id));
      return questions.length ? [{ ...l, questions }] : [];
    }),
  };
});
const ids = [...targetIds];
const bank = new Map(lessons.flatMap((l) => l.questions).map((q) => [q.id, q]));
const freeze = <T>(v: T): T => {
  if (v && typeof v === "object") {
    Object.freeze(v);
    for (const child of Object.values(v)) freeze(child);
  }
  return v;
};

it("uses clarified fields in fresh exam snapshots while retaining the full original saved paper and answer positions", () => {
  const seen = new Map<
    string,
    ReturnType<typeof examCatalogue>[number]["items"][number]
  >();
  const branches = examCatalogue().filter((s) =>
    ["branch-tyt-turkce", "branch-tyt-kimya", "branch-ayt-kimya"].includes(
      s.id,
    ),
  );
  for (const spec of branches)
    for (const item of selectExamVariant(spec, "clarified028-complete-pool"))
      if (ids.includes(item.id)) seen.set(item.id, item);
  expect([...seen.keys()].sort()).toEqual([...ids].sort());
  for (const [id, item] of seen) {
    const shown = localizedQuestionView(bank.get(id)!);
    expect(item.prompt).toBe(shown.prompt.tr);
    expect(item.options).toEqual(shown.options.map((o) => o.tr));
    expect(item.explanation).toBe(shown.explanation.tr);
    expect(item.hint).toBe(shown.hint.tr);
    expect(item.answer).toBe(bank.get(id)!.answer);
  }
  // A supplied pre028 paper is a snapshot, independent of today's source views.
  const items = ids.map((id) => {
    const item = seen.get(id)!,
      raw = bank.get(id)!;
    const { guidance: _g, ...saved } = item;
    return {
      ...saved,
      prompt: raw.prompt.tr,
      options: raw.options.map((o) => o.tr),
      hint: raw.hint.tr,
      explanation: raw.explanation.tr,
    };
  });
  const paper = freeze(structuredClone(items));
  const spec: ExamSpec = {
    id: "snapshot-before-source028",
    title: "Kaydedilmiş eski çalışma",
    exam: "TYT",
    kind: "branch",
    items: paper,
    durationSeconds: 300,
    fullLength: false,
    missingSubjects: [],
  };
  let state = beginExam(initialState(), spec, 1000, "learning");
  const id = state.examDraft!.id;
  expect(state.examDraft!.items).toEqual(paper);
  state = changeExam(
    state,
    id,
    { type: "answer", index: 0, value: paper[0].answer },
    1100,
  );
  state = changeExam(state, id, { type: "flag", index: 1 }, 1200);
  const before = structuredClone(state.examDraft!);
  state = validateState(state);
  expect(state.examDraft).toEqual(before);
  state = finishExam(state, id, 2000);
  expect(state.examSessions[0].items).toEqual(paper);
  expect(state.examSessions[0].answers).toEqual(before.answers);
  expect(state.examSessions[0].flagged).toEqual(before.flagged);
  expect(state.examSessions[0].deadline).toBe(before.deadline);
  expect(examScore(state.examSessions[0]).correct).toBe(1);
  expect(spec.items).toEqual(paper);
});
