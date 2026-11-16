import "fake-indexeddb/auto";
import { openDB } from "idb";
import { describe, expect, it } from "vitest";
import { initialState, settingsSchema } from "../src/domain/model";
import { lessonById } from "../src/domain/content";
import { parseDateTR, dateTR } from "../src/components/DateInput";
import { studyPlan } from "../src/domain/studyPlan";
import {
  beginExam,
  changeExam,
  examCatalogue,
  finishExam,
} from "../src/domain/exams";
import {
  loadState,
  parseBackup,
  saveState,
  validateState,
} from "../src/domain/storage";

function withHistory() {
  let state = initialState();
  const lesson = lessonById("rasyonel-sayilar")!;
  const question = lesson.questions[0];
  state.settings = {
    ...state.settings,
    scale: 135,
    textSize: 145,
    font: "lexend",
    motion: false,
    sound: true,
    blockedWeekdays: [0, 6],
    blockedDates: ["2027-01-01"],
  };
  state.notes = { personal: "Özel notum: ÇĞİÖŞÜ, π ve DNA." };
  state.topicProgress = { "detail-139": { theory: "2026-11-14" } };
  state.explorations = { personal: { selected: 2, showLabels: true } };
  state.readingPages = { personal: 4 };
  state.sessions = [
    {
      id: "settings031-session",
      lessonId: lesson.id,
      date: "2026-11-14",
      finishedAt: "2026-11-14T12:00:00.000Z",
      responses: [
        {
          questionId: question.id,
          selected: question.answer,
          correct: true,
          assisted: false,
          confidence: "high",
        },
      ],
      kind: "learn",
      minutes: 10,
      note: "Çözüm notum.",
    },
  ];
  state.reviews = [
    {
      id: "settings031-review",
      lessonId: lesson.id,
      anchorDate: "2026-11-14",
      targetDate: "2026-11-16",
      stage: 3,
      originSessionId: "settings031-session",
    },
  ];
  state.theoryReviewCompletions = [
    {
      topicId: "detail-139",
      anchorDate: "2026-11-14",
      stage: 3,
      completedDate: "2026-11-16",
    },
  ];
  const exam = examCatalogue().find((spec) => spec.id === "branch-tyt-turkce")!;
  state = beginExam(state, exam, 1000);
  state = changeExam(
    state,
    state.examDraft!.id,
    {
      type: "answer",
      index: 0,
      value: state.examDraft!.items[0].answer,
    },
    1100,
  );
  state = finishExam(state, state.examDraft!.id, 2000);
  state = beginExam(state, exam, 3000);
  state.draft = {
    lessonId: lesson.id,
    phase: "practice",
    index: 0,
    responses: [],
    selected: question.answer,
    checked: false,
    hint: false,
    confidence: "medium",
    note: "Yarım kalan çözümüm.",
    startedAt: 123,
  };
  return state;
}

describe("031 personal target and durable theme preferences", () => {
  it("starts on the current theme with the requested personal target, independently of the device timezone", () => {
    const state = initialState();
    expect(state.settings.theme).toBe("dark");
    expect(state.settings.examDate).toBe("2027-02-28");
    expect(dateTR(state.settings.examDate)).toBe("28/02/2027");
    expect(parseDateTR("28/02/2027")).toBe("2027-02-28");
    expect(parseDateTR("29/02/2027")).toBeNull();
    const plan = studyPlan(state, "questions", "2026-11-14");
    expect(plan.deadline).toBe("2027-02-28");
    expect(plan.days).toBe(107);
    expect(plan.target).toBe(5);
  });

  it.each([undefined, ""])(
    "fills an unset personal target (%s) without altering learning history or preferences",
    async (examDate) => {
      const expected = withHistory();
      expected.settings.examDate = "2027-02-28";
      const old = {
        ...expected,
        settings: { ...expected.settings, examDate },
      };
      expect(validateState(old)).toEqual(expected);
      expect(await parseBackup(JSON.stringify(old))).toEqual(expected);
    },
  );

  it.each(["2027-06-18", "2027-05-25", "2028-02-29"])(
    "preserves the consciously saved target %s across backup and local reopening",
    async (examDate) => {
      const state = withHistory();
      state.settings.examDate = examDate;
      expect(await parseBackup(JSON.stringify(state))).toEqual(state);
      await saveState(state);
      expect(await loadState()).toEqual(state);
    },
  );

  it("persists the empty-date migration into IndexedDB without changing a saved legacy theme", async () => {
    const expected = withHistory();
    expected.settings.examDate = "2027-02-28";
    expected.settings.theme = "contrast";
    // A real old record enters through IndexedDB, before schema normalization.
    await loadState();
    const db = await openDB("yksmania", 2);
    try {
      await db.put(
        "state",
        { ...expected, settings: { ...expected.settings, examDate: "" } },
        "current",
      );
      expect(await loadState()).toEqual(expected);
      expect(await db.get("state", "current")).toEqual(expected);
    } finally {
      db.close();
    }
  });

  it.each(["dark", "light", "system", "contrast", "matrix"] as const)(
    "retains the %s theme and all independent records on local and backup round trips",
    async (theme) => {
      const state = withHistory();
      state.settings.examDate = "2027-05-25";
      state.settings.theme = theme;
      expect(settingsSchema.parse(state.settings)).toEqual(state.settings);
      expect(await parseBackup(JSON.stringify(state))).toEqual(state);
      await saveState(state);
      expect(await loadState()).toEqual(state);
    },
  );

  it("rejects malformed targets and unsupported themes rather than resetting the profile", () => {
    const state = withHistory();
    for (const examDate of ["28/02/2027", "2027-02-29", "2027-13-01"])
      expect(() =>
        validateState({ ...state, settings: { ...state.settings, examDate } }),
      ).toThrow();
    expect(() =>
      validateState({
        ...state,
        settings: { ...state.settings, theme: "unknown" },
      }),
    ).toThrow();
  });
});
