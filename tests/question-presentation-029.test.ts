import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AppState, Lesson, Question } from "../src/domain/model";
import type { HelpQuestion } from "../src/domain/questionHelpModel";

const fixtures = vi.hoisted(() => ({
  allLessons: [] as Lesson[],
  state: undefined as AppState | undefined,
  writes: vi.fn(),
}));
const targetIds = ["f093-membrane-4", "f093-noun-10", "f93h-b7"];
// Only the three relevant subject pools are reduced. Production exam selection,
// snapshot creation, validation, rendering and grading remain actual code.
vi.mock("../src/domain/content", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/domain/content")>();
  fixtures.allLessons = actual.lessons;
  const targets = new Set(["f093-membrane-4", "f093-noun-10", "f93h-b7"]);
  return {
    ...actual,
    lessons: actual.lessons.flatMap((lesson) => {
      if (
        !["tyt-biyoloji", "tyt-turkce", "tyt-tarih"].includes(lesson.subjectId)
      )
        return [lesson];
      const questions = lesson.questions.filter((q) => targets.has(q.id));
      return questions.length ? [{ ...lesson, questions }] : [];
    }),
  };
});
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: fixtures.state!,
    t: (key: string) => key,
    l: (value: string | { tr: string }) =>
      typeof value === "string" ? value : value.tr,
    update: fixtures.writes,
    commit: fixtures.writes,
    toast: fixtures.writes,
    status: "saved",
  }),
}));
vi.mock("../src/components/Aion", () => ({ Aion: () => null }));
vi.mock("../src/components/StudyTimer", () => ({ StudyTimer: () => null }));
vi.mock("../src/components/PastExamQuestions", () => ({
  PastExamQuestions: () => null,
}));

import { initialState } from "../src/domain/model";
import { lessonById, subjects } from "../src/domain/content";
import { lessonGuides } from "../src/learning/guides";
import { questionIdentity } from "../src/domain/questionHelpModel";
import {
  clarifiedQuestionView,
  localizedQuestionView,
  questionPresentationRevisions,
} from "../src/domain/questionPresentation";
import {
  beginExam,
  changeExam,
  examCatalogue,
  examScore,
  finishExam,
  type ExamSpec,
} from "../src/domain/exams";
import { validateState } from "../src/domain/storage";
import { helpPanels } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";
import { Study } from "../src/pages/Study";
import { Exams } from "../src/pages/Exams";
import { Mistakes } from "../src/pages/Mistakes";

const stable = (x: unknown): unknown =>
  Array.isArray(x)
    ? x.map(stable)
    : x && typeof x === "object"
      ? Object.fromEntries(
          Object.keys(x)
            .sort()
            .map((key) => [key, stable((x as Record<string, unknown>)[key])]),
        )
      : x;
const sha = (s: string) => createHash("sha256").update(s).digest("hex");
const digest = (x: unknown) => sha(JSON.stringify(stable(x)));
const freeze = <T>(x: T): T => {
  if (x && typeof x === "object") {
    Object.values(x).forEach(freeze);
    Object.freeze(x);
  }
  return x;
};
const flat = (q: Question): HelpQuestion => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
});
const source = (id: string) =>
  fixtures.allLessons.flatMap((l) => l.questions).find((q) => q.id === id)!;
const owner = (id: string) =>
  fixtures.allLessons.find((l) => l.questions.some((q) => q.id === id))!;
const expectedHistoryC = "Farklı tarihlerde farklı yönlü sonuçlar yaşanabilir.";
const expectedPrompt: Record<string, string> = {
  "f93h-b7": "1711 Prut’ta Azak’ın geri alınmasından hangi sonuç çıkarılamaz?",
  "f093-membrane-4":
    "Her biri 1 L sabit hacimli iki bölmede X maddesinin başlangıç derişimi dışta 8 mol/L, içte 2 mol/L’dir. Kapalı sistemde tek bir adımda dıştan içe 1 mol X aktarılıyor; üretim ve tüketim yoktur. Yeni dış/iç derişimleri mol/L olarak hangisidir?",
  "f093-noun-10":
    "‘Öğretmenin ve öğrencinin çantası kapıda duruyor.’ cümlesinde öğretmenin ve öğrencinin sözcükleri ilgi eki almış iki tamlayan olarak kullanılmıştır. Bu tamlama grubunda ortak kullanılan unsur hangisidir?",
};
const expectedMembraneExplanation =
  "Her bölmede derişim değişiminin büyüklüğü Δn/V=1 mol/1 L=1 mol/L’dir. Dış derişim 8−1=7 mol/L, iç derişim 2+1=3 mol/L olur. Toplam X miktarı 7×1+3×1=10 mol olarak korunur. 8/3 madde yaratır; 9/1 aktarım yönünü ters okur; 7/2 madde kaybettirir. 6/6 toplam 12 mol verdiği için korunumla çelişir. Sayısal derişim değişimi, yalnız eşit hacimden değil açıkça verilen 1 L hacim ve 1 mol aktarımdan hesaplanır.";
const plain = (s: string) =>
  s
    .replace(/<[^>]*>/g, "")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const render = (element: Parameters<typeof renderToStaticMarkup>[0]) =>
  plain(renderToStaticMarkup(element));
const rawPaper = (): ExamSpec => ({
  id: "saved-before029-exact-three-items",
  title: "Önceki kaydedilmiş üç soru",
  exam: "TYT",
  kind: "branch",
  durationSeconds: 300,
  fullLength: false,
  missingSubjects: [],
  items: targetIds.map((id) => {
    const lesson = owner(id),
      subject = subjects.find((s) => s.id === lesson.subjectId)!;
    return {
      ...flat(source(id)),
      lessonId: lesson.id,
      subjectId: lesson.subjectId,
      subjectName: subject.name.tr,
      lessonTitle: lesson.title.tr,
    };
  }),
});
afterEach(() => {
  fixtures.writes.mockClear();
  fixtures.state = undefined;
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("029 three guarded presentation revisions", () => {
  it("retains all raw5883 questions,514 lesson metadata records and480 guides from separate028", () => {
    const all = fixtures.allLessons;
    expect(all).toHaveLength(514);
    const questions = all.flatMap((l) => l.questions);
    expect(questions).toHaveLength(5883);
    expect(digest(questions)).toBe(
      "81b2bf4204a97c97518c7d120a8c6f85589d00a0d1e46f91f1a38aa9ff463352",
    );
    expect(
      digest(all.map(({ questions: _questions, ...metadata }) => metadata)),
    ).toBe("0df1fcf0d49654fd897e0ede9d5b27540c884004225c8cde09984ca96459db6e");
    expect(lessonGuides.size).toBe(480);
    expect(digest([...lessonGuides])).toBe(
      "36a48d07e782b9f4769698d01f94860251aaeb8502f44454489cd43fe9e085f5",
    );
  });
  it("only appends three records and reverses to the exact028 helper including its nine records and core functions", () => {
    expect(questionPresentationRevisions).toHaveLength(12);
    expect(questionPresentationRevisions.slice(9).map((r) => r.id)).toEqual(
      targetIds,
    );
    expect(digest(questionPresentationRevisions.slice(0, 9))).toBe(
      "7388ca8d186afcc64313a77246ae0911d8e333d07c31b9d39ca5a68e6f98c021",
    );
    const text = readFileSync(
      new URL("../src/domain/questionPresentation.ts", import.meta.url),
      "utf8",
    );
    const start = text.indexOf('  {\n    id: "f093-membrane-4",'),
      end = text.indexOf("];\nconst revisions", start);
    expect(start).toBeGreaterThan(0);
    expect(end).toBeGreaterThan(start);
    expect(sha(text.slice(0, start) + text.slice(end))).toBe(
      "96ce261a498b7158864393674190f9c9e40188722ac736ecce8007d6feb436ca",
    );
    for (const revision of questionPresentationRevisions.slice(9)) {
      expect(questionIdentity(revision.before)).toBe(
        questionIdentity(flat(source(revision.id))),
      );
      expect(Object.keys(revision).sort()).toEqual(
        revision.id === "f093-membrane-4"
          ? ["before", "explanation", "id", "prompt", "revision"]
          : revision.id === "f93h-b7"
            ? ["before", "id", "options", "revision"]
            : ["before", "id", "prompt", "revision"],
      );
      expect(revision.revision).toBe(1);
    }
  });
  it("shows why equal unspecified volumes are insufficient and verifies the explicit1L/1mol numeric model", () => {
    const afterTransfer = (volumeL: number) => [
      8 - 1 / volumeL,
      2 + 1 / volumeL,
    ];
    expect(afterTransfer(1)).toEqual([7, 3]);
    expect(afterTransfer(2)).toEqual([7.5, 2.5]);
    for (const volume of [0.5, 1, 2, 4]) {
      const [outside, inside] = afterTransfer(volume);
      expect(outside * volume + inside * volume).toBe(10 * volume);
      expect((8 - outside) * volume).toBe(1);
      expect((inside - 2) * volume).toBe(1);
    }
    const old = source("f093-membrane-4"),
      shown = localizedQuestionView(old);
    expect(shown.prompt.tr).toBe(expectedPrompt[old.id]);
    expect(shown.explanation.tr).toBe(expectedMembraneExplanation);
    expect(shown.options).toBe(old.options);
    expect(shown.answer).toBe(3);
    expect(shown.options[shown.answer].tr).toBe("7 ve3");
    expect(source("f093-noun-10").options[2].tr).toBe("Tamlanan olan çantası");
  });
  it("preserves century boundaries and changes only historical optionC while keeping answerD and every other reference", () => {
    const century = (year: number) => Math.floor((year - 1) / 100) + 1;
    expect([1, 100, 101, 1699, 1700, 1701, 1711, 1800].map(century)).toEqual([
      1, 1, 2, 17, 17, 18, 18, 18,
    ]);
    const raw = freeze(structuredClone(source("f93h-b7"))),
      before = JSON.stringify(raw),
      shown = localizedQuestionView(raw);
    expect(raw.options[2].tr).toBe(
      "Aynı yüzyılda farklı yönlü sonuçlar yaşanabilir.",
    );
    expect(shown.options[2].tr).toBe(expectedHistoryC);
    for (const position of [0, 1, 3, 4])
      expect(shown.options[position]).toBe(raw.options[position]);
    expect(shown.prompt).toBe(raw.prompt);
    expect(shown.hint).toBe(raw.hint);
    expect(shown.explanation).toBe(raw.explanation);
    expect(shown.answer).toBe(3);
    expect(shown.options[3]).toBe(raw.options[3]);
    expect({ ...shown, options: raw.options }).toEqual(raw);
    expect(JSON.stringify(raw)).toBe(before);
    expect(localizedQuestionView(shown)).toBe(shown);
  });
  it("projects only exact full identities and preserves all other localized fields, option references and custom hints", () => {
    for (const id of targetIds) {
      const original = source(id),
        raw = freeze({
          ...original,
          savedNote: "Öğrencinin ÇĞİÖŞÜ + − yazısı",
          prompt: { ...original.prompt, retainedTextTag: "eski prompt" },
          hint: { ...original.hint, retainedTextTag: "eski hint" },
          explanation: {
            ...original.explanation,
            retainedTextTag: "eski açıklama",
          },
        });
      const before = JSON.stringify(raw),
        shown = localizedQuestionView(raw);
      expect(shown).not.toBe(raw);
      expect(shown.prompt.tr).toBe(expectedPrompt[id]);
      expect(shown.prompt.retainedTextTag).toBe(raw.prompt.retainedTextTag);
      expect(shown.hint).toBe(raw.hint);
      const customLocalized = {
        ...raw,
        hint: {
          ...raw.hint,
          tr: "Kendi kişisel ipucum; ÇĞİÖŞÜ + − aynı kalır.",
        },
      };
      expect(localizedQuestionView(customLocalized).hint).toBe(
        customLocalized.hint,
      );
      if (id === "f093-noun-10")
        expect(shown.explanation).toBe(raw.explanation);
      if (id === "f93h-b7") {
        expect(shown.options).not.toBe(raw.options);
        for (const position of [0, 1, 3, 4])
          expect(shown.options[position]).toBe(raw.options[position]);
        expect(shown.options[2].tr).toBe(expectedHistoryC);
      } else expect(shown.options).toBe(raw.options);
      expect(shown.answer).toBe(raw.answer);
      expect(shown.id).toBe(raw.id);
      expect(shown.savedNote).toBe(raw.savedNote);
      expect(shown.explanation.retainedTextTag).toBe(
        raw.explanation.retainedTextTag,
      );
      expect({
        ...shown,
        prompt: raw.prompt,
        explanation: raw.explanation,
        options: raw.options,
      }).toEqual(raw);
      expect(localizedQuestionView(shown)).toBe(shown);
      expect(JSON.stringify(raw)).toBe(before);
      const q = freeze({ ...flat(original), savedNote: raw.savedNote });
      const view = clarifiedQuestionView(q);
      if (id === "f93h-b7")
        expect(view.options).toEqual(
          q.options.map((option, index) =>
            index === 2 ? expectedHistoryC : option,
          ),
        );
      else expect(view.options).toBe(q.options);
      expect(view.savedNote).toBe(q.savedNote);
      expect(clarifiedQuestionView(view)).toBe(view);
      const custom = { ...q, hint: "Kendi özgün ipucum; baytlar aynı kalır." };
      expect(clarifiedQuestionView(custom).hint).toBe(custom.hint);
      const { hint: _hint, ...absent } = q;
      expect(Object.hasOwn(clarifiedQuestionView(absent), "hint")).toBe(false);
    }
  });
  it("rejects changed core fields in both flat and localized inputs while allowing guarded custom-hint views", () => {
    vi.useFakeTimers();
    vi.setSystemTime(2000);
    const warning = vi.spyOn(console, "error").mockImplementation(() => {});
    for (const id of targetIds) {
      const original = source(id),
        q = flat(original);
      const mutants: HelpQuestion[] = [
        { ...q, id: id + "-history" },
        { ...q, prompt: q.prompt + " Başka koşul." },
        { ...q, passage: "Yeni metin" },
        { ...q, options: [q.options[1], q.options[0], ...q.options.slice(2)] },
        { ...q, options: q.options.map((o, i) => (i === 0 ? o + "!" : o)) },
        { ...q, answer: (q.answer + 1) % q.options.length },
        { ...q, explanation: q.explanation + " Özgün başka çözüm." },
      ];
      for (const [mutationIndex, mutant] of mutants.entries()) {
        const retained = freeze(mutant),
          before = JSON.stringify(retained);
        expect(clarifiedQuestionView(retained)).toBe(retained);
        const localized = freeze({
          ...original,
          id: mutant.id,
          prompt: { tr: mutant.prompt },
          passage: mutant.passage ? { tr: mutant.passage } : undefined,
          options: mutant.options.map((tr) => ({ tr })),
          answer: mutant.answer,
          explanation: { tr: mutant.explanation },
        });
        expect(localizedQuestionView(localized)).toBe(localized);
        const html = render(
          createElement(QuestionHelp, {
            question: retained,
            level: helpPanels(retained).length + 1,
            onLevel: fixtures.writes,
          }),
        );
        expect(html).toContain(retained.explanation);
        if (id === "f093-membrane-4")
          expect(html).not.toContain(expectedMembraneExplanation);
        // The complete core-field matrix is checked above through both pure views
        // and actual QuestionHelp. Whole Exams JSX additionally covers changed
        // stems, option order and explanations, without rebuilding unrelated
        // catalogue previews for every equivalent helper rejection.
        if ([1, 3, 6].includes(mutationIndex)) {
          const oldExam = beginExam(
            initialState(),
            rawPaper(),
            1000,
            "learning",
          );
          const items = oldExam.examDraft!.items.map((item) =>
            item.id === id ? { ...item, ...retained } : item,
          );
          fixtures.state = freeze({
            ...oldExam,
            examDraft: {
              ...oldExam.examDraft!,
              items,
              index: targetIds.indexOf(id),
              helpLevels: [2, 2, 2],
              helpPanelCounts: { "0": 1, "1": 1, "2": 1 },
            },
          });
          const savedBefore = JSON.stringify(fixtures.state);
          const examHTML = render(createElement(Exams, { navigate: () => {} }));
          expect(examHTML).toContain(retained.prompt);
          expect(examHTML).not.toContain(
            id === "f93h-b7" ? expectedHistoryC : expectedPrompt[id],
          );
          expect(JSON.stringify(fixtures.state)).toBe(savedBefore);
        }
        expect(JSON.stringify(retained)).toBe(before);
      }
    }
    expect(fixtures.writes).not.toHaveBeenCalled();
    expect(warning).not.toHaveBeenCalled();
  });
  it("creates all three exact new views through the actual exam snapshot factory with only the relevant pools constrained", () => {
    for (const subject of ["tyt-biyoloji", "tyt-turkce", "tyt-tarih"]) {
      const spec = examCatalogue().find((s) => s.id === `branch-${subject}`)!;
      expect(spec.items).toHaveLength(1);
      const raw = source(spec.items[0].id),
        before = JSON.stringify(raw);
      const state = beginExam(initialState(), spec, 1000);
      const item = state.examDraft!.items[0],
        shown = localizedQuestionView(raw);
      expect(item.prompt).toBe(expectedPrompt[item.id]);
      expect(item.explanation).toBe(shown.explanation.tr);
      expect(item.options).toEqual(shown.options.map((o) => o.tr));
      expect(item.answer).toBe(raw.answer);
      expect(item.hint).toBe(raw.hint.tr);
      expect(JSON.stringify(raw)).toBe(before);
    }
  });
  it("retains supplied original paper snapshots, selected answers, flags, help and deadlines through begin/validate/finish", () => {
    const spec = freeze(rawPaper()),
      paper = structuredClone(spec.items);
    let state = beginExam(initialState(), spec, 1000, "learning");
    const id = state.examDraft!.id;
    expect(state.examDraft!.items).toEqual(paper);
    state = changeExam(
      state,
      id,
      { type: "answer", index: 0, value: paper[0].answer },
      1100,
    );
    state = changeExam(state, id, { type: "answer", index: 1, value: 0 }, 1150);
    state = changeExam(
      state,
      id,
      { type: "answer", index: 2, value: paper[2].answer },
      1175,
    );
    state = changeExam(state, id, { type: "flag", index: 1 }, 1200);
    state = changeExam(state, id, { type: "flag", index: 2 }, 1225);
    state = changeExam(state, id, { type: "index", index: 1 }, 1250);
    // Simulate retained pre029 help ordinals; merely reading/restoring never migrates them.
    state = {
      ...state,
      examDraft: {
        ...state.examDraft!,
        helpEnabled: true,
        helpLevels: [2, 1, 2],
        helpPanelCounts: { "0": 1, "1": 1, "2": 1 },
      },
    };
    const saved = freeze(structuredClone(state)),
      before = structuredClone(saved.examDraft!);
    state = validateState(saved);
    expect(state.examDraft).toEqual(before);
    for (const item of state.examDraft!.items) {
      const view = clarifiedQuestionView(item);
      expect(view.prompt).toBe(expectedPrompt[item.id]);
      if (item.id === "f93h-b7")
        expect(view.options).toEqual(
          item.options.map((option, index) =>
            index === 2 ? expectedHistoryC : option,
          ),
        );
      else expect(view.options).toBe(item.options);
      expect(view.answer).toBe(item.answer);
    }
    expect(state.examDraft).toEqual(before);
    state = finishExam(state, id, 2000);
    const session = state.examSessions[0];
    expect({ ...session, finishedAt: undefined, timedOut: undefined }).toEqual({
      ...before,
      finishedAt: undefined,
      timedOut: undefined,
    });
    expect(session.items).toEqual(paper);
    expect(session.answers).toEqual([3, 0, 3]);
    expect(session.flagged).toEqual([1, 2]);
    expect(session.helpLevels).toEqual([2, 1, 2]);
    expect(session.helpPanelCounts).toEqual({ "0": 1, "1": 1, "2": 1 });
    expect(session.deadline).toBe(301000);
    expect(session.startedAt).toBe(1000);
    expect(examScore(session)).toMatchObject({
      correct: 2,
      wrong: 1,
      blank: 0,
      net: 1.75,
    });
    expect(validateState(state).examSessions[0]).toEqual(session);
    expect(spec.items).toEqual(paper);
    expect(saved.examDraft).toEqual(before);
  });
  it("uses the views in actual Study, Mistakes and saved Exam JSX without writes or hidden source changes", () => {
    vi.useFakeTimers();
    vi.setSystemTime(2000);
    const warning = vi.spyOn(console, "error").mockImplementation(() => {});
    for (const id of targetIds) {
      const lesson = owner(id),
        q = source(id),
        index = lesson.questions.findIndex((v) => v.id === id);
      const state = initialState();
      state.draft = {
        lessonId: lesson.id,
        phase: "practice",
        index,
        responses: [],
        selected: q.answer,
        checked: true,
        hint: true,
        confidence: "medium",
        note: "Kayıtlı kişisel not",
        startedAt: 1000,
      };
      state.sessions = [
        {
          id: `old:${id}`,
          lessonId: lesson.id,
          date: "2026-11-16",
          finishedAt: "2026-11-16T01:00:00Z",
          responses: [
            {
              questionId: id,
              selected:
                id === "f93h-b7" ? 2 : (q.answer + 1) % q.options.length,
              correct: false,
              assisted: true,
              confidence: "low",
            },
          ],
          kind: "learn",
          minutes: 1,
          note: "Aynı not",
        },
      ];
      fixtures.state = freeze(state);
      const before = JSON.stringify(fixtures.state);
      for (const element of [
        createElement(Study, { navigate: () => {} }),
        createElement(Mistakes, { start: () => {}, navigate: () => {} }),
      ]) {
        const html = render(element);
        expect(html).toContain(expectedPrompt[id]);
        if (id === "f093-membrane-4")
          expect(html).toContain(expectedMembraneExplanation);
        if (id === "f93h-b7") expect(html).toContain(expectedHistoryC);
      }
      let exam = beginExam(initialState(), rawPaper(), 1000, "learning");
      exam = {
        ...exam,
        examDraft: {
          ...exam.examDraft!,
          index: targetIds.indexOf(id),
          helpLevels: [2, 2, 2],
          helpPanelCounts: { "0": 1, "1": 1, "2": 1 },
        },
      };
      fixtures.state = freeze(exam);
      const examBefore = JSON.stringify(exam);
      const examHTML = render(createElement(Exams, { navigate: () => {} }));
      expect(examHTML).toContain(expectedPrompt[id]);
      if (id === "f93h-b7") expect(examHTML).toContain(expectedHistoryC);
      expect(JSON.stringify(exam)).toBe(examBefore);
      expect(JSON.stringify(state)).toBe(before);
    }
    expect(fixtures.writes).not.toHaveBeenCalled();
    expect(warning).not.toHaveBeenCalled();
  });
});
