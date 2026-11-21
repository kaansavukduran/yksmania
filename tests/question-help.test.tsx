import { expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { QuestionHelp } from "../src/components/QuestionHelp";
import curated from "../src/learning/questionHelpCatalogue.json";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import { lessons } from "../src/domain/content";
import {
  beginExam,
  changeExam,
  examAssistance,
  examCatalogue,
  examScore,
  finishExam,
  scaledExamSeconds,
} from "../src/domain/exams";
import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";

const bank = new Map(
  lessons.flatMap((lesson) =>
    lesson.questions.map(
      (q) =>
        [
          q.id,
          {
            id: q.id,
            prompt: q.prompt.tr,
            passage: q.passage?.tr,
            options: q.options.map((o) => o.tr),
            answer: q.answer,
            hint: q.hint.tr,
            explanation: q.explanation.tr,
            guidance: q.guidance,
          },
        ] as const,
    ),
  ),
);
function paper(mode: "learning" | "simulation" = "simulation") {
  const spec = examCatalogue().find((s) => s.id === "branch-tyt-matematik")!;
  const q = bank.get("r2")!;
  return beginExam(
    initialState(),
    {
      ...spec,
      id: "help-regression",
      items: [
        {
          ...q,
          lessonId: "rasyonel-sayilar",
          subjectId: "tyt-matematik",
          subjectName: "Matematik",
          lessonTitle: "Rasyonel sayılar",
          guidance: resolvedGuidance(q),
        },
      ],
      durationSeconds: scaledExamSeconds("TYT", 1),
    },
    1000,
    mode,
  );
}

it("binds all 20 authored mini-guides to their exact original stem, passage, option order, key and explanation", () => {
  expect(curated).toHaveLength(20);
  expect(new Set(curated.map((q) => q.id)).size).toBe(20);
  expect(curated.reduce((n, q) => n + q.guidance.steps.length, 0)).toBe(40);
  expect(curated.reduce((n, q) => n + q.guidance.optionReasons.length, 0)).toBe(
    60,
  );
  for (const row of curated) {
    const q = bank.get(row.id)!;
    expect(row.identity, row.id).toBe(questionIdentity(q));
    expect(questionGuidanceSchema.parse(row.guidance)).toEqual(row.guidance);
    expect(resolvedGuidance(q), row.id).toEqual(row.guidance);
    expect(row.guidance.optionReasons, row.id).toHaveLength(q.options.length);
    expect(helpPanels(q), row.id).toHaveLength(4);
    expect(helpPanels(q)[0].paragraphs, row.id).toContain(q.hint);
  }
});

it("reveals the actual strategy and individual steps before the explicit full solution, with separate distractor reasons", () => {
  const q = bank.get("r2")!;
  const first = renderToStaticMarkup(
    <QuestionHelp question={q} level={1} onLevel={() => {}} />,
  );
  expect(first).toContain("Bilmen gerekenler");
  expect(first).toContain("6 ortak paydasını kullan.");
  expect(first).not.toContain("Doğru yanıt:");
  expect(first).not.toContain(q.explanation);
  expect(first).not.toContain(resolvedGuidance(q)!.steps[0]);
  const step = renderToStaticMarkup(
    <QuestionHelp question={q} level={3} onLevel={() => {}} />,
  );
  expect(step).toContain("1. adım");
  expect(step).not.toContain("2. adım</h3>");
  const full = renderToStaticMarkup(
    <QuestionHelp question={q} level={5} onLevel={() => {}} />,
  );
  expect(full).toContain("Doğru yanıt: C");
  expect(full).toContain("Şıkların mantığı");
  expect(full).toContain("2/5, pay ve paydayı ayrı ayrı toplama hatasıdır");
  expect(full).toContain("Sonucu kontrol et");
  expect(full).not.toContain("help-next");
});

it("retains original hints and explanations in an unreviewed historical custom snapshot", () => {
  const q = {
    ...bank.get("m1")!,
    id: "unreviewed-historical-mol-snapshot",
    guidance: undefined,
  };
  expect(resolvedGuidance(q)).toBeUndefined();
  expect(helpPanels(q)).toEqual([{ title: "İlk ipucu", paragraphs: [q.hint] }]);
  const legacySnapshot = { ...q, hint: undefined };
  expect(helpPanels(legacySnapshot)).toEqual([]);
  const full = renderToStaticMarkup(
    <QuestionHelp
      question={legacySnapshot}
      level={1}
      onLevel={() => {}}
      reviewed
    />,
  );
  expect(full).toContain(q.explanation);
  expect(full).not.toContain("Şıkların mantığı");
  expect(full).not.toContain("bağımsız doğru olarak sayılmaz");
});

it("never attaches a current guide to an altered saved question sharing the same ID", () => {
  const q = bank.get("r2")!;
  for (const amended of [
    { ...q, prompt: "Değişmiş kök" },
    { ...q, answer: 0 },
    { ...q, options: [...q.options].reverse() },
    { ...q, passage: "Yeni veri" },
    { ...q, explanation: "Başka çözüm" },
  ])
    expect(resolvedGuidance(amended)).toBeUndefined();
});

it("keeps simulation assistance off until explicitly enabled, preserving the entire saved paper, timer, answers and flags", () => {
  let state = paper(),
    id = state.examDraft!.id;
  state = changeExam(state, id, { type: "answer", index: 0, value: 2 }, 1100);
  state = changeExam(state, id, { type: "flag", index: 0 }, 1200);
  const before = structuredClone(state);
  expect(() =>
    changeExam(state, id, { type: "help", index: 0, level: 1 }, 1300),
  ).toThrow("EXAM_HELP_DISABLED");
  expect(state).toEqual(before);
  state = changeExam(
    state,
    id,
    { type: "help-enabled", index: 0, value: true },
    1300,
  );
  expect(state.examDraft!.helpLevels).toBeUndefined();
  state = changeExam(state, id, { type: "help", index: 0, level: 3 }, 1400);
  const { helpEnabled, helpLevels, helpPanelCounts, ...rest } =
    state.examDraft!;
  expect(rest).toEqual(before.examDraft);
  expect(helpEnabled).toBe(true);
  expect(helpLevels).toEqual([3]);
  expect(helpPanelCounts).toEqual({ 0: 4 });
  state = changeExam(
    state,
    id,
    { type: "help-enabled", index: 0, value: false },
    1500,
  );
  expect(state.examDraft!.helpLevels).toEqual([3]);
  expect(validateState(JSON.parse(JSON.stringify(state)))).toEqual(state);
  expect(state.sessions).toEqual([]);
  expect(state.reviews).toEqual([]);
  expect(state.topicProgress).toEqual({});
});

it("records learning-mode help independently of the actual net and retains help after answers are cleared and after completion", () => {
  let state = paper("learning"),
    id = state.examDraft!.id;
  state = changeExam(state, id, { type: "help", index: 0, level: 5 }, 1200);
  state = changeExam(state, id, { type: "answer", index: 0, value: 2 }, 1300);
  expect(examScore(state.examDraft!)).toMatchObject({
    correct: 1,
    wrong: 0,
    blank: 0,
    net: 1,
  });
  expect(examAssistance(state.examDraft!)).toEqual({
    helped: 1,
    assistedCorrect: 1,
    independentCorrect: 0,
  });
  state = changeExam(
    state,
    id,
    { type: "answer", index: 0, value: null },
    1400,
  );
  expect(examAssistance(state.examDraft!)).toEqual({
    helped: 1,
    assistedCorrect: 0,
    independentCorrect: 0,
  });
  state = changeExam(state, id, { type: "answer", index: 0, value: 0 }, 1500);
  expect(examScore(state.examDraft!).net).toBe(-0.25);
  state = finishExam(state, id, 1600);
  expect(state.examSessions[0].helpLevels).toEqual([5]);
  expect(validateState(state)).toEqual(state);
});

it("rejects invalid help without changing history, keeps help open after the official time and grants no learning evidence", () => {
  const state = paper("learning"),
    id = state.examDraft!.id;
  for (const level of [-1, 0, 0.5, 6, NaN, Infinity])
    expect(() =>
      changeExam(state, id, { type: "help", index: 0, level }, 1100),
    ).toThrow("EXAM_HELP_LEVEL");
  // Resmî süre dolduktan sonra da ipucu açılabilir (öğrenme öncelikli).
  const late = changeExam(
    state,
    id,
    { type: "help", index: 0, level: 1 },
    state.examDraft!.deadline,
  );
  expect(late.examDraft!.helpLevels![0]).toBe(1);
  expect(late.sessions).toEqual(state.sessions);
  expect(late.topicProgress).toEqual(state.topicProgress);
  expect(state.examDraft!.helpLevels).toBeUndefined();
  const badLength = structuredClone(state);
  badLength.examDraft!.helpLevels = [1, 1];
  expect(() => validateState(badLength)).toThrow();
  const badOptions = structuredClone(state);
  badOptions.examDraft!.items[0].guidance!.optionReasons.pop();
  expect(() => validateState(badOptions)).toThrow();
});

it("preserves a pre-help backup byte for byte and snapshots guidance by value for new papers", () => {
  const state = paper();
  delete state.examDraft!.mode;
  delete state.examDraft!.items[0].hint;
  delete state.examDraft!.items[0].guidance;
  const raw = JSON.stringify(validateState(state));
  expect(JSON.stringify(validateState(JSON.parse(raw)))).toBe(raw);
  expect(examAssistance(state.examDraft!)).toEqual({
    helped: 0,
    assistedCorrect: 0,
    independentCorrect: 0,
  });
  const spec = examCatalogue().find((s) => s.id === "branch-tyt-matematik")!;
  const fresh = beginExam(initialState(), spec, 1000);
  const item = fresh.examDraft!.items.find((q) => q.guidance)!;
  expect(item).toBeDefined();
  const copy = structuredClone(spec);
  item.guidance!.steps[0] = "Yalnız deneme kopyasında değişiklik";
  expect(spec).toEqual(copy);
});
