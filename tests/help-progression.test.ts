import {
  Children,
  createElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AppState, Draft } from "../src/domain/model";
import type { HelpQuestion } from "../src/domain/questionHelpModel";

const fixture = vi.hoisted(() => {
  const question = {
    id: "help-progression-legacy",
    prompt: "Eski soru?",
    options: ["Bir", "İki", "Üç"],
    answer: 1,
    hint: "Eski özgül ipucu.",
    explanation: "Eski tam çözüm.",
  };
  const guidance = {
    knowledge: ["Temel bilgi başka bir paragraftadır."],
    strategy: "Verileri bir araya getirerek uygun işlemi seç.",
    steps: [
      question.hint,
      "Ara hesabı tamamla.",
      "Sonucu başlangıç koşulunda denetle.",
    ],
    optionReasons: [
      "İlk seçenek uymaz.",
      "İkinci seçenek uygundur.",
      "Üçüncü seçenek uymaz.",
    ],
    commonError: "İstenen büyüklüğü değiştirme.",
    check: "Başlangıçtaki eşitliği yeniden doğrula.",
  };
  return {
    question,
    guidance,
    state: undefined as unknown as AppState,
    writes: 0,
    help: undefined as
      | undefined
      | { question: HelpQuestion; level: number; onLevel: (n: number) => void },
    tree: undefined as ReactNode,
    toasts: [] as string[],
  };
});
vi.mock("../src/learning/questionHelpCatalogue.json", async (original) => {
  const actual = await original<{ default: unknown[] }>();
  const q = fixture.question;
  return {
    default: [
      ...actual.default,
      {
        id: q.id,
        identity: JSON.stringify([
          q.id,
          q.prompt,
          "",
          q.options,
          q.answer,
          q.explanation,
        ]),
        hint: q.hint,
        guidance: fixture.guidance,
        legacyPanelCount: 1,
      },
    ],
  };
});
vi.mock("../src/domain/content", () => {
  const q = fixture.question,
    text = (tr: string) => ({ tr });
  const item = (id: string) => ({
    id,
    prompt: text(q.prompt),
    options: q.options.map(text),
    answer: q.answer,
    hint: text(q.hint),
    explanation: text(q.explanation),
  });
  const lesson = {
    id: "help-progression-lesson",
    subjectId: "tyt-matematik",
    title: text("Yardım örneği"),
    minutes: 5,
    objectives: [],
    body: [],
    source: text("Test verisi"),
    tags: [],
    questions: [item(q.id), item(q.id + "-next")],
  };
  const subject = { id: "tyt-matematik", name: text("Matematik"), exam: "TYT" };
  const aytLesson = {
    ...lesson,
    id: "help-progression-ayt",
    subjectId: "ayt-matematik",
    questions: [item(q.id + "-ayt")],
  };
  const lessons = [lesson, aytLesson];
  const subjects = [
    subject,
    ...[
      "tyt-turkce",
      "tyt-geometri",
      "tyt-tarih",
      "tyt-cografya",
      "tyt-felsefe",
      "tyt-din",
      "tyt-fizik",
      "tyt-kimya",
      "tyt-biyoloji",
      "ayt-matematik",
      "ayt-geometri",
      "ayt-fizik",
      "ayt-kimya",
      "ayt-biyoloji",
    ].map((id) => ({
      id,
      name: text(id),
      exam: id.startsWith("ayt-") ? "AYT" : "TYT",
    })),
  ];
  return {
    lessons,
    subjects,
    lessonById: (id: string) => lessons.find((l) => l.id === id),
    subjectById: (id: string) => subjects.find((s) => s.id === id),
  };
});
vi.mock("../src/store", () => {
  const write = async (fn: (s: AppState) => AppState) => {
    fixture.state = fn(fixture.state);
    fixture.writes++;
  };
  return {
    useApp: () => ({
      state: fixture.state,
      commit: write,
      update: write,
      status: "saved",
      today: "2026-11-16",
      t: (key: string) => key,
      l: (value: { tr: string }) => value.tr,
      toast: (value: string) => fixture.toasts.push(value),
    }),
  };
});
vi.mock("../src/components/QuestionHelp", async (original) => {
  const actual =
    await original<typeof import("../src/components/QuestionHelp")>();
  return {
    QuestionHelp: (props: Parameters<typeof actual.QuestionHelp>[0]) => {
      fixture.help = props;
      return createElement(actual.QuestionHelp, props);
    },
    // Pages render the stateful wrapper; capture the props they pass.
    GuidedQuestionHelp: (props: Parameters<typeof actual.GuidedQuestionHelp>[0]) => {
      fixture.help = props;
      return createElement(actual.GuidedQuestionHelp, props);
    },
  };
});
vi.mock("../src/components/Aion", () => ({ Aion: () => null }));
vi.mock("../src/components/StudyTimer", () => ({ StudyTimer: () => null }));
vi.mock("../src/components/PastExamQuestions", () => ({
  PastExamQuestions: () => null,
}));

import { effectiveHelpLevel } from "../src/learning/helpProgression";
import {
  helpPanels,
  previousHelpPanelCount,
} from "../src/learning/questionHelp";
import { initialState, draftSchema } from "../src/domain/model";
import { examDraftSchema, examSessionSchema } from "../src/domain/examModel";
import {
  changeExam,
  finishExam,
  examScore,
  examAssistance,
} from "../src/domain/exams";
import { Study } from "../src/pages/Study";
import { Exams } from "../src/pages/Exams";
import { validateState } from "../src/domain/storage";

const panels = () => helpPanels(fixture.question);
const deepFreeze = <T>(value: T): T => {
  if (value && typeof value === "object") {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
};
const studyDraft = (overrides: Partial<Draft> = {}): Draft => ({
  lessonId: "help-progression-lesson",
  phase: "practice",
  index: 0,
  responses: [],
  selected: 1,
  checked: false,
  hint: true,
  helpLevel: 2,
  confidence: "medium",
  note: "Eski not",
  startedAt: 1000,
  ...overrides,
});
const examState = () => {
  const state = initialState(),
    q = fixture.question;
  state.examDraft = {
    id: "old-help-exam",
    title: "Eski deneme",
    kind: "branch",
    exam: "TYT",
    items: [q, { ...q, id: q.id + "-next" }].map((row) => ({
      ...row,
      lessonId: "help-progression-lesson",
      subjectId: "tyt-matematik",
      subjectName: "Matematik",
      lessonTitle: "Yardım örneği",
    })),
    answers: [1, null],
    flagged: [1],
    index: 0,
    startedAt: 1000,
    deadline: 601000,
    durationSeconds: 600,
    mode: "learning",
    helpLevels: [2, 1],
  };
  return state;
};
type NativeProps = {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};
const nodes = (tree: ReactNode): ReactElement<NativeProps>[] => {
  const all: ReactElement<NativeProps>[] = [];
  Children.forEach(tree, (node) => {
    if (isValidElement<NativeProps>(node))
      all.push(node, ...nodes(node.props.children));
  });
  return all;
};
const words = (tree: ReactNode): string => {
  let text = "";
  Children.forEach(tree, (node) => {
    if (typeof node === "string") text += node;
    else if (isValidElement<NativeProps>(node))
      text += words(node.props.children);
  });
  return text;
};
function CaptureStudy() {
  fixture.tree = Study({ navigate: () => {} });
  return fixture.tree;
}
const renderStudy = () => renderToStaticMarkup(createElement(CaptureStudy));
const renderExam = () =>
  renderToStaticMarkup(createElement(Exams, { navigate: () => {} }));
beforeEach(() => {
  fixture.state = initialState();
  fixture.writes = 0;
  fixture.help = undefined;
  fixture.tree = undefined;
  fixture.toasts = [];
  vi.spyOn(Date, "now").mockReturnValue(5000);
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  try {
    expect(console.error).not.toHaveBeenCalled();
  } finally {
    vi.restoreAllMocks();
  }
});

describe("yardım ordinalinin saf gösterim eşlemesi", () => {
  it("eski tam çözüm2’yi yeni tam çözüme taşır; yeni işaretli2 yöntem olarak kalır", () => {
    expect(panels()).toHaveLength(5);
    expect(
      effectiveHelpLevel(panels(), 2, undefined, 1, fixture.question.hint),
    ).toBe(6);
    expect(effectiveHelpLevel(panels(), 2, 5, 1, fixture.question.hint)).toBe(
      2,
    );
    expect(effectiveHelpLevel(panels(), 6, 5, 1, fixture.question.hint)).toBe(
      6,
    );
    expect(
      effectiveHelpLevel(
        panels(),
        2,
        undefined,
        undefined,
        fixture.question.hint,
      ),
    ).toBe(2);
  });
  it("eski ipucunu şimdi bulunduğu bilgi,yöntem veya adım paneline kadar görünür tutar", () => {
    expect(
      effectiveHelpLevel(panels(), 1, undefined, 1, fixture.question.hint),
    ).toBe(3);
    expect(
      effectiveHelpLevel(
        [{ paragraphs: ["ipucu"] }, { paragraphs: ["yöntem"] }],
        1,
        undefined,
        1,
        "ipucu",
      ),
    ).toBe(1);
    expect(
      effectiveHelpLevel(
        [
          { paragraphs: ["bilgi"] },
          { paragraphs: ["ipucu"] },
          { paragraphs: ["adım"] },
        ],
        1,
        undefined,
        1,
        "ipucu",
      ),
    ).toBe(2);
    expect(effectiveHelpLevel(panels(), 1, 5, 1, fixture.question.hint)).toBe(
      1,
    );
  });
  it("sıfır markerı gerçek sayar, eski ipucusuz snapshot full1’i korur; açılmamış yardım açılmaz", () => {
    expect(effectiveHelpLevel(panels(), 1, 0, undefined)).toBe(6);
    expect(effectiveHelpLevel(panels(), 1, undefined, 1, undefined)).toBe(6);
    expect(effectiveHelpLevel(panels(), 1, 1, 1, undefined)).toBe(1);
    expect(
      effectiveHelpLevel(panels(), 1, undefined, undefined, undefined),
    ).toBe(1);
    for (const marker of [undefined, 0, 1, 5])
      expect(effectiveHelpLevel(panels(), 0, marker, 1)).toBe(0);
    expect(effectiveHelpLevel([], 1, 0)).toBe(1);
  });
  it("geçersiz düzeyleri sınırlar ve hiçbir panel veya kayıt nesnesine yazmaz", () => {
    const input = deepFreeze(structuredClone(panels())),
      before = JSON.stringify(input);
    expect(effectiveHelpLevel(input, 99, 5)).toBe(6);
    for (const level of [undefined, NaN, Infinity, -1])
      expect(effectiveHelpLevel(input, level, 5)).toBe(0);
    expect(effectiveHelpLevel(input, 2.8, 5)).toBe(2);
    expect(effectiveHelpLevel(input, 2, 33)).toBe(2);
    expect(JSON.stringify(input)).toBe(before);
  });
  it("legacy metadata yalnız exact catalogue identity ve inlineguide bulunmayan kayda uygulanır", () => {
    expect(previousHelpPanelCount(fixture.question)).toBe(1);
    expect(
      previousHelpPanelCount({
        ...fixture.question,
        guidance: fixture.guidance,
      }),
    ).toBeUndefined();
    expect(
      previousHelpPanelCount({ ...fixture.question, prompt: "Başka soru?" }),
    ).toBeUndefined();
    const rich: HelpQuestion = {
      id: "r1",
      prompt: "Hangisi daha büyüktür?",
      options: ["1/8", "1/6", "Eşitler"],
      answer: 1,
      explanation:
        "Birim kesirde daha küçük payda daha büyük parça verir: 1/6 > 1/8.",
    };
    expect(previousHelpPanelCount(rich)).toBeUndefined();
    expect(
      effectiveHelpLevel(
        helpPanels(rich),
        2,
        undefined,
        previousHelpPanelCount(rich),
        rich.hint,
      ),
    ).toBe(2);
  });
});

describe("optional count şeması ve açık kayıt eylemleri", () => {
  it("eski absent marker alanlarını parse ile eklemez;0..32 kabul eder,bozuk markerları reddeder", () => {
    const draft = studyDraft(),
      parsed = draftSchema.parse(draft),
      exam = examState().examDraft!;
    expect(parsed).toEqual(draft);
    expect(Object.hasOwn(parsed, "helpPanelCount")).toBe(false);
    expect(examDraftSchema.parse(exam)).toEqual(exam);
    expect(Object.hasOwn(examDraftSchema.parse(exam), "helpPanelCounts")).toBe(
      false,
    );
    for (const value of [0, 5, 32]) {
      expect(
        draftSchema.parse({ ...draft, helpPanelCount: value }).helpPanelCount,
      ).toBe(value);
      expect(
        examDraftSchema.parse({ ...exam, helpPanelCounts: { 0: value } })
          .helpPanelCounts,
      ).toEqual({ 0: value });
    }
    for (const value of [-1, 33, 1.5, "5"]) {
      expect(
        draftSchema.safeParse({ ...draft, helpPanelCount: value }).success,
      ).toBe(false);
      expect(
        examDraftSchema.safeParse({ ...exam, helpPanelCounts: { 0: value } })
          .success,
      ).toBe(false);
    }
    for (const key of ["2", "-1", "00", "constructor"])
      expect(
        examDraftSchema.safeParse({ ...exam, helpPanelCounts: { [key]: 5 } })
          .success,
      ).toBe(false);
  });
  it("eski exam full2’yi salt gösterir; index/yanıt/flag/gate eylemleri count alanı eklemez", () => {
    const old = deepFreeze(examState()),
      bytes = JSON.stringify(old);
    expect(
      effectiveHelpLevel(
        helpPanels(old.examDraft!.items[0]),
        2,
        undefined,
        previousHelpPanelCount(old.examDraft!.items[0]),
        old.examDraft!.items[0].hint,
      ),
    ).toBe(6);
    for (const action of [
      { type: "index", index: 1 },
      { type: "answer", index: 0, value: 0 },
      { type: "flag", index: 0 },
      { type: "help-enabled", index: 0, value: true },
    ] as const)
      expect(
        changeExam(old, old.examDraft!.id, action, 5000).examDraft!
          .helpPanelCounts,
      ).toBeUndefined();
    expect(JSON.stringify(old)).toBe(bytes);
  });
  it("explicit exam help yalnız hedef index’e count yazar,eski full’i korur ve snapshot/deadline/grade değişmez", () => {
    const old = deepFreeze(examState()),
      before = JSON.stringify(old),
      next = changeExam(
        old,
        old.examDraft!.id,
        { type: "help", index: 0, level: 2 },
        5000,
      );
    expect(next.examDraft!.helpLevels).toEqual([6, 1]);
    expect(next.examDraft!.helpPanelCounts).toEqual({ 0: 5 });
    expect(next.examDraft!.items).toBe(old.examDraft!.items);
    expect(next.examDraft!.answers).toBe(old.examDraft!.answers);
    expect(next.examDraft!.flagged).toBe(old.examDraft!.flagged);
    expect(next.examDraft!.deadline).toBe(old.examDraft!.deadline);
    expect(examScore(next.examDraft!)).toEqual(examScore(old.examDraft!));
    expect(examAssistance(next.examDraft!)).toEqual(
      examAssistance(old.examDraft!),
    );
    expect(JSON.stringify(old)).toBe(before);
    expect(validateState(next)).toEqual(next);
    const marked = {
      ...old,
      examDraft: { ...old.examDraft!, helpPanelCounts: { 0: 5 } },
    };
    expect(
      changeExam(
        marked,
        marked.examDraft.id,
        { type: "help", index: 0, level: 3 },
        5000,
      ).examDraft!.helpLevels,
    ).toEqual([3, 1]);
    const ended = finishExam(next, next.examDraft!.id, 6000).examSessions[0];
    expect(ended.helpPanelCounts).toEqual({ 0: 5 });
    expect(examSessionSchema.parse(ended)).toEqual(ended);
    const oldEnded = finishExam(old, old.examDraft!.id, 6000).examSessions[0];
    expect(Object.hasOwn(oldEnded, "helpPanelCounts")).toBe(false);
  });
});

describe("gerçek Study ve Exam yardım render/callback sınırı", () => {
  it("taze Study/Exam yardım1→2 eylemleri count yazar ve yeni2’yi tam çözüm sanmaz", async () => {
    fixture.state.draft = studyDraft({ hint: false, helpLevel: 0 });
    for (const level of [1, 2]) {
      renderStudy();
      fixture.help!.onLevel(level);
      await Promise.resolve();
      expect(fixture.state.draft!.helpLevel).toBe(level);
      expect(fixture.state.draft!.helpPanelCount).toBe(5);
    }
    renderStudy();
    expect(fixture.help!.level).toBe(2);
    fixture.state = examState();
    fixture.state.examDraft!.helpLevels = [0, 0];
    for (const level of [1, 2]) {
      renderExam();
      fixture.help!.onLevel(level);
      await Promise.resolve();
      expect(fixture.state.examDraft!.helpLevels![0]).toBe(level);
      expect(fixture.state.examDraft!.helpPanelCounts).toEqual({ 0: 5 });
    }
    renderExam();
    expect(fixture.help!.level).toBe(2);
  });
  it("kontrolden sonra açılan rehber önceki bağımsız yanıtı yardımlı yapmaz", async () => {
    const response = {
      questionId: fixture.question.id,
      selected: 1,
      correct: true,
      assisted: false,
      confidence: "medium" as const,
    };
    fixture.state.draft = studyDraft({
      checked: true,
      hint: false,
      helpLevel: 0,
      responses: [response],
    });
    renderStudy();
    fixture.help!.onLevel(1);
    await Promise.resolve();
    expect(fixture.state.draft!.hint).toBe(false);
    expect(fixture.state.draft!.responses).toEqual([response]);
    expect(fixture.state.draft!.helpPanelCount).toBe(5);
  });
  it("Study eski full’i yeni full olarak salt render eder; ilk açık yardım eylemi güncel count yazar", async () => {
    fixture.state.draft = studyDraft();
    deepFreeze(fixture.state);
    const before = JSON.stringify(fixture.state);
    const h = renderStudy();
    expect(h).toContain("Tam çözüm");
    expect(fixture.help!.level).toBe(6);
    expect(fixture.writes).toBe(0);
    expect(JSON.stringify(fixture.state)).toBe(before);
    fixture.help!.onLevel(6);
    await Promise.resolve();
    expect(fixture.state.draft!.helpPanelCount).toBe(5);
    expect(fixture.state.draft!.helpLevel).toBe(6);
    expect(fixture.state.draft!.hint).toBe(true);
    expect(fixture.writes).toBe(1);
    expect(fixture.toasts).toEqual([]);
  });
  it("Study kontrolünde görünen düzey+count yanıta kaydedilir; yardımlı/anahtar korunur,sonraki soru sıfırlanır", async () => {
    fixture.state.draft = studyDraft();
    renderStudy();
    const check = nodes(fixture.tree).find(
      (n) => n.type === "button" && words(n.props.children) === "check",
    )!;
    check.props.onClick!();
    expect(fixture.state.draft!.responses[0]).toMatchObject({
      selected: 1,
      correct: true,
      assisted: true,
      helpLevel: 6,
      helpPanelCount: 5,
    });
    expect(fixture.state.draft!.helpPanelCount).toBe(5);
    renderStudy();
    const next = nodes(fixture.tree)
      .filter((n) => n.type === "button" && n.props.onClick)
      .at(-1)!;
    next.props.onClick!();
    await Promise.resolve();
    expect(fixture.state.draft).toMatchObject({
      index: 1,
      hint: false,
      helpLevel: 0,
    });
    expect(fixture.state.draft!.helpPanelCount).toBeUndefined();
    expect(Object.hasOwn(fixture.state.draft!, "helpPanelCount")).toBe(false);
    renderStudy();
    expect(fixture.help!.level).toBe(0);
  });
  it("Study eskihint1’i adım3’e taşır,sonraki tıklama4’ü kaydeder;yeni markerlı2 yöntemdir", async () => {
    fixture.state.draft = studyDraft({ helpLevel: undefined });
    renderStudy();
    expect(fixture.help!.level).toBe(3);
    expect(fixture.writes).toBe(0);
    fixture.help!.onLevel(4);
    await Promise.resolve();
    expect(fixture.state.draft!.helpLevel).toBe(4);
    expect(fixture.state.draft!.helpPanelCount).toBe(5);
    fixture.state.draft = studyDraft({ helpLevel: 2, helpPanelCount: 5 });
    const h = renderStudy();
    expect(fixture.help!.level).toBe(2);
    expect(h).not.toContain("Tam çözüm</h3>");
    expect(fixture.writes).toBe(1);
  });
  it("ActiveExam eski full’i açık tutar, ilk gerçek help callback marker yazar;yeni2 yöntem olarak kalır", async () => {
    fixture.state = deepFreeze(examState());
    const before = JSON.stringify(fixture.state);
    renderExam();
    expect(fixture.help!.level).toBe(6);
    expect(fixture.writes).toBe(0);
    expect(JSON.stringify(fixture.state)).toBe(before);
    fixture.help!.onLevel(6);
    await Promise.resolve();
    expect(fixture.state.examDraft!.helpPanelCounts).toEqual({ 0: 5 });
    expect(fixture.state.examDraft!.helpLevels).toEqual([6, 1]);
    expect(fixture.toasts).toEqual([]);
    fixture.state = examState();
    fixture.state.examDraft!.helpPanelCounts = { 0: 5 };
    renderExam();
    expect(fixture.help!.level).toBe(2);
  });
  it("eski inlineguide snapshotının kendi sayımını ve ipucusuz eski full1’i korur", () => {
    fixture.state = examState();
    fixture.state.examDraft!.items[0].guidance = structuredClone(
      fixture.guidance,
    );
    fixture.state.examDraft!.helpLevels = [2, 0];
    renderExam();
    expect(fixture.help!.level).toBe(2);
    expect(fixture.writes).toBe(0);
    fixture.state = examState();
    delete fixture.state.examDraft!.items[0].hint;
    fixture.state.examDraft!.helpLevels = [1, 0];
    renderExam();
    expect(fixture.help!.level).toBe(6);
    expect(fixture.writes).toBe(0);
  });
});
