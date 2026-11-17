import { describe, it, expect } from "vitest";
import { initialState, DEFAULT_EXAM_DATE } from "../src/domain/model";
import {
  availableDayCount,
  studyPlan,
  studyTopics,
  workbookStudyTopics,
  setTopicCompletion,
  completionDate,
  topicResults,
} from "../src/domain/studyPlan";
import { validateState } from "../src/domain/storage";
import { addDays, isBlocked, xp } from "../src/domain/scheduler";
import details from "../src/data/detail-topics.json";
import { lessonById } from "../src/domain/content";
import { parseDateTR, dateTR } from "../src/components/DateInput";
const today = "2026-11-14";
describe("ordered YKS deadlines and independent study records", () => {
  it("normalizes the old empty exam preference without changing a custom date or other records", () => {
    const old: any = initialState();
    old.settings.examDate = "";
    delete old.topicProgress;
    old.notes = { mine: "Eski not" };
    const s = validateState(old);
    expect(s.settings.examDate).toBe(DEFAULT_EXAM_DATE);
    expect(s.topicProgress).toEqual({});
    expect(s.notes.mine).toBe("Eski not");
    old.settings.examDate = "2027-05-25";
    expect(validateState(old).settings.examDate).toBe("2027-05-25");
  });
  it("preserves exactly 479 unique workbook topics in the checked Todoist first-study order", () => {
    expect(workbookStudyTopics).toHaveLength(479);
    expect(studyTopics.slice(0, 479)).toEqual(workbookStudyTopics);
    expect(new Set(workbookStudyTopics.map((t) => t.id))).toEqual(
      new Set(details.map((t) => t.id)),
    );
    expect(studyTopics.slice(0, 6).map((t) => t.id)).toEqual([
      "detail-139",
      "detail-140",
      "detail-141",
      "detail-142",
      "detail-143",
      "detail-194",
    ]);
    expect(workbookStudyTopics.at(-1)?.order).toBe(479);
    expect(studyTopics).toHaveLength(498);
  });
  it("counts inclusive eligible days once across weekday and one-off overlaps", () => {
    const s = initialState().settings;
    expect(availableDayCount(today, "2027-02-28", s)).toBe(107);
    expect(availableDayCount(today, "2027-06-18", s)).toBe(217);
    s.blockedWeekdays = [6, 6];
    s.blockedDates = [today, today, "2026-11-15", "2026-11-15"];
    expect(availableDayCount(today, "2026-11-20", s)).toBe(5);
    expect(
      availableDayCount("2028-02-28", "2028-03-01", initialState().settings),
    ).toBe(3);
  });
  it("scales theory to February and question topics to the editable exam date without assigning a closed day", () => {
    const s = initialState();
    // The default personal target is now February. Keep testing independent
    // deadlines by explicitly choosing the later target for question practice.
    s.settings.examDate = "2027-06-18";
    const p = studyPlan(s, "theory", today),
      q = studyPlan(s, "questions", today);
    expect(p.target).toBe(5);
    expect(p.items.map((v) => v.topic.order)).toEqual([1, 2, 3, 4, 5]);
    expect(q.target).toBe(3);
    expect(p.scheduled).toHaveLength(498);
    expect(
      p.scheduled.every(
        (v) => v.day! >= "2026-11-14" && v.day! <= "2027-02-28",
      ),
    ).toBe(true);
    s.settings.examDate = "2027-05-25";
    expect(studyPlan(s, "questions", today).days).toBeLessThan(q.days);
    s.settings.blockedWeekdays = [6];
    s.settings.blockedDates = ["2026-11-16"];
    const closed = studyPlan(s, "theory", today);
    expect(closed.items).toHaveLength(0);
    expect(
      closed.scheduled.every((v) => v.day && !isBlocked(v.day, s.settings)),
    ).toBe(true);
  });
  it("does not create an endless daily queue when a topic is marked, repeated, or undone", () => {
    let s = initialState();
    const first = studyTopics[0].id;
    s = setTopicCompletion(s, first, "theory", true, today);
    s = setTopicCompletion(s, first, "theory", true, today);
    let p = studyPlan(s, "theory", today);
    expect(p.done).toBe(1);
    expect(p.doneToday).toBe(1);
    expect(p.target).toBe(5);
    expect(p.items).toHaveLength(4);
    expect(p.items[0].topic.order).toBe(2);
    expect(xp(s)).toBe(0);
    expect(s.sessions).toHaveLength(0);
    expect(studyPlan(s, "questions", today).remaining).toBe(498);
    s = setTopicCompletion(s, first, "theory", false, today);
    p = studyPlan(s, "theory", today);
    expect(p.items).toHaveLength(5);
    expect(p.done).toBe(0);
  });
  it("reports no available days, a missed target and a completed plan without dividing by zero", () => {
    const s = initialState();
    s.settings.blockedWeekdays = [0, 1, 2, 3, 4, 5, 6];
    expect(studyPlan(s, "theory", today)).toMatchObject({
      status: "unavailable",
      days: 0,
      perDay: null,
      todayCount: 0,
    });
    expect(studyPlan(s, "theory", "2027-03-01").status).toBe("overdue");
    for (const t of studyTopics)
      s.topicProgress[t.id] = { theory: "2026-11-13" };
    expect(studyPlan(s, "theory", today).status).toBe("complete");
  });
  it("spreads a sparse plan across real available dates and preserves source order", () => {
    const s = initialState();
    for (const t of studyTopics.slice(5))
      s.topicProgress[t.id] = { theory: "2026-11-13" };
    s.settings.blockedWeekdays = [0, 4];
    const p = studyPlan(s, "theory", today);
    expect(p.items).toHaveLength(1);
    expect(p.scheduled.map((v) => v.topic.order)).toEqual([1, 2, 3, 4, 5]);
    expect(new Set(p.scheduled.map((v) => v.day)).size).toBe(5);
    expect(
      p.scheduled.every((v) => v.day && !isBlocked(v.day, s.settings)),
    ).toBe(true);
    for (let d = today; d <= "2027-02-28"; d = addDays(d, 1))
      expect(p.scheduled.filter((v) => v.day === d).length).toBeLessThanOrEqual(
        1,
      );
  });
  it("keeps legacy completed courses while new question sessions never silently complete theory", () => {
    const s = initialState(),
      l = lessonById("rasyonel-sayilar")!;
    const session = {
      id: "legacy",
      lessonId: l.id,
      date: today,
      finishedAt: "x",
      responses: l.questions.map((q) => ({
        questionId: q.id,
        selected: q.answer,
        correct: true,
        assisted: false,
        confidence: "medium" as const,
      })),
      kind: "learn" as const,
      minutes: 1,
      note: "",
    };
    s.sessions = [session];
    expect(completionDate(s, "detail-202", "theory")).toBe(today);
    s.sessions = [{ ...session, includesTheory: false }];
    expect(completionDate(s, "detail-202", "theory")).toBeUndefined();
    expect(completionDate(s, "detail-202", "questions")).toBe(today);
    expect(() =>
      validateState({ ...s, topicProgress: { unknown: { theory: today } } }),
    ).toThrow();
  });
  it("uses day-first text, rejects impossible and US-ordered dates, and formats ISO storage", () => {
    expect(parseDateTR("18/06/2027")).toBe("2027-06-18");
    expect(dateTR("2027-06-18")).toBe("18/06/2027");
    expect(parseDateTR("31/02/2027")).toBeNull();
    expect(parseDateTR("06/18/2027")).toBeNull();
    expect(parseDateTR("29/02/2028")).toBe("2028-02-29");
  });
});

it("selects the latest complete topic attempt including a zero score without changing theory or review history", () => {
  const s = initialState();
  const lesson = lessonById("simyadan-kimyaya")!;
  const attempt = (id: string, correct: boolean, finishedAt: string) => ({
    id,
    lessonId: lesson.id,
    date: today,
    finishedAt,
    responses: lesson.questions.map((q) => ({
      questionId: q.id,
      selected: correct ? q.answer : (q.answer + 1) % q.options.length,
      correct,
      assisted: false,
      confidence: "medium" as const,
    })),
    kind: "learn" as const,
    includesTheory: false,
    minutes: 1,
    note: "",
  });
  const first = attempt("first", true, "2026-11-14T12:00:00Z");
  const last = attempt("last", false, "2026-11-14T12:05:00Z");
  s.sessions = [
    last,
    {
      ...last,
      id: "partial",
      responses: last.responses.slice(0, 2),
      finishedAt: "2026-11-14T12:10:00Z",
    },
    first,
  ];
  const before = structuredClone(s);
  expect(topicResults(s).get("detail-139")).toEqual(last);
  expect(
    topicResults(s)
      .get("detail-139")!
      .responses.filter((r) => r.correct),
  ).toHaveLength(0);
  expect(completionDate(s, "detail-139", "theory")).toBeUndefined();
  expect(s).toEqual(before);
  s.sessions = [first];
  expect(topicResults(s).get("detail-139")).toEqual(first);
  s.sessions = [];
  s.topicProgress["detail-139"] = { questions: today };
  expect(topicResults(s).has("detail-139")).toBe(false);
});
