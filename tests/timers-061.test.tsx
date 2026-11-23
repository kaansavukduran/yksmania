import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { AppState } from "../src/domain/model";

const store061 = vi.hoisted(() => ({ state: null as unknown as AppState }));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: store061.state,
    commit: () => Promise.resolve(),
    update: () => Promise.resolve(),
    status: "saved",
  }),
}));

import { initialState, settingsSchema } from "../src/domain/model";
import { beginExam, changeExam, examCatalogue, examScore, finishExam } from "../src/domain/exams";
import { parseBackup, validateState } from "../src/domain/storage";
import { resetLearningProgress } from "../src/domain/resetProgress";
import { Exams } from "../src/pages/Exams";
import { StudyTimer } from "../src/components/StudyTimer";
import { ExamDeadlineWatcher } from "../src/pages/ExamDeadlineWatcher";

const spec = () => examCatalogue().find((s) => s.id === "branch-tyt-turkce")!;
const withTimers = (state: AppState, timers: boolean | undefined): AppState => ({
  ...state,
  settings: { ...state.settings, timers },
});

describe("Forge061 zamanlayıcı ayarı", () => {
  it("leaves old settings without the field untouched and keeps an explicit choice through backup and reset", async () => {
    const base = initialState();
    expect("timers" in base.settings).toBe(false);
    expect(settingsSchema.parse(base.settings)).toEqual(base.settings);
    const off = withTimers(base, false);
    const restored = await parseBackup(JSON.stringify(off));
    expect(restored.settings.timers).toBe(false);
    expect(restored.focusTimer).toEqual(off.focusTimer);
    expect(resetLearningProgress(restored).settings).toEqual(restored.settings);
  });

  it("hides the hourglass when timers are off without touching its saved state", () => {
    const running = {
      ...initialState(),
      focusTimer: { ...initialState().focusTimer, phase: "running" as const, deadline: Date.now() + 60_000 },
    };
    store061.state = withTimers(running, false);
    expect(renderToStaticMarkup(<StudyTimer />)).toBe("");
    expect(store061.state.focusTimer.phase).toBe("running");
    store061.state = withTimers(running, undefined);
    expect(renderToStaticMarkup(<StudyTimer />)).toContain("study-timer");
  });
});

describe("Forge061 süre dolsa da deneme açık kalır", () => {
  it("lets the learner change answers after the official time and records the real finish when they end it", () => {
    let state = beginExam(initialState(), spec(), 1000);
    const draft = state.examDraft!;
    const late = draft.deadline + 5 * 60_000;
    state = changeExam(state, draft.id, { type: "answer", index: 0, value: draft.items[0].answer }, late);
    state = changeExam(state, draft.id, { type: "flag", index: 2 }, late + 1);
    state = changeExam(state, draft.id, { type: "index", index: 3 }, late + 2);
    expect(state.examDraft).not.toBeNull();
    expect(state.examSessions).toEqual([]);
    expect(validateState(state)).toEqual(state);
    const ended = finishExam(state, draft.id, late + 10_000);
    const session = ended.examSessions[0];
    expect(session.finishedAt).toBe(late + 10_000);
    expect(session.timedOut).toBe(true);
    expect(examScore(session).correct).toBe(1);
    // Süre ölçümü resmî süreye kırpılır; NaN ya da negatif değer yok.
    expect(session.itemMs!.every((ms) => Number.isFinite(ms) && ms >= 0)).toBe(true);
    expect(session.itemMs!.reduce((a, b) => a + b, 0)).toBeLessThanOrEqual(draft.durationSeconds * 1000);
    expect(validateState(JSON.parse(JSON.stringify(ended)))).toEqual(ended);
    expect(ended.sessions).toEqual([]);
    expect(ended.topicProgress).toEqual({});
  });

  it("finishing inside the official time is not marked as over time and old clipped sessions stay valid", () => {
    let state = beginExam(initialState(), spec(), 1000);
    const draft = state.examDraft!;
    const early = finishExam(state, draft.id, draft.deadline - 1);
    expect(early.examSessions[0].timedOut).toBe(false);
    state = finishExam(state, draft.id, draft.deadline);
    expect(state.examSessions[0].finishedAt).toBe(draft.deadline);
    expect(state.examSessions[0].timedOut).toBe(true);
    expect(validateState(state)).toEqual(state);
  });

  it("the deadline watcher no longer finishes anything", () => {
    expect(renderToStaticMarkup(<ExamDeadlineWatcher />)).toBe("");
  });

  it("an expired exam stays open with calm extra time and no lock or alarm text", () => {
    const start = Date.now() - 2 * 3600_000;
    store061.state = beginExam(initialState(), spec(), start);
    const html = renderToStaticMarkup(<Exams navigate={() => {}} />);
    const layoutStart = html.indexOf('<div class="exam-layout">');
    expect(layoutStart).toBeGreaterThan(0);
    const timerAndNotices = html.slice(0, layoutStart);
    expect(timerAndNotices).toContain("Ek süre");
    expect(timerAndNotices).toMatch(/exam-clock[^>]*>\+/);
    expect(timerAndNotices).not.toContain("exam-time-low");
    expect(timerAndNotices).not.toContain("Süre tamamlandı");
    expect(timerAndNotices).not.toContain("değiştirilemez");
    expect(timerAndNotices).toContain("Süre dolsa da deneme sen bitirene kadar açık kalır.");
    const answerButtons = html.match(/<button\b[^>]*class="exam-answer\s[^"]*"[^>]*>/g) ?? [];
    expect(answerButtons).toHaveLength(5);
    expect(answerButtons.every((button) => !/\sdisabled\b/.test(button))).toBe(true);
    expect(html).toMatch(/<button class="primary exam-finish"(?![^>]*disabled)/);
    expect(html).not.toMatch(/exam-number[^>]*disabled/);
  });

  it("timers off removes the clock, pace, pulse and remaining-time notes from the running exam", () => {
    const start = Date.now() - 40 * 60_000;
    let state = beginExam(initialState(), examCatalogue().find((s) => s.kind === "mixed" && s.exam === "TYT")!, start);
    state = changeExam(state, state.examDraft!.id, { type: "answer", index: 0, value: 0 }, start + 1000);
    store061.state = withTimers(state, true);
    const on = renderToStaticMarkup(<Exams navigate={() => {}} />);
    expect(on).toContain("exam-time");
    expect(on).toContain("exam-pace");
    expect(on).toContain("exam-pulse");
    store061.state = withTimers(state, false);
    const off = renderToStaticMarkup(<Exams navigate={() => {}} />);
    for (const hidden of ["exam-time", "exam-clock", "exam-pace", "exam-pulse", "Kalan süre", "kalan süre", "süre devam eder"])
      expect(off).not.toContain(hidden);
    expect(off).toContain("Denemeyi bitir");
  });

  it("result says the learner finished, adds a neutral over-time line only with timers on and hides time sections when off", () => {
    let state = beginExam(initialState(), spec(), 1000);
    const draft = state.examDraft!;
    state = finishExam(state, draft.id, draft.deadline + 7 * 60_000 + 5000);
    store061.state = state;
    const on = renderToStaticMarkup(<Exams navigate={() => {}} resultId={draft.id} />);
    expect(on).toContain("Denemeyi bitirdin.");
    expect(on).toContain("Geçen süre 62 dk 5 sn");
    expect(on).toContain("Referans süre 55 dk");
    expect(on).toContain("Ek süre 7 dk 5 sn");
    expect(on).not.toContain("Süre tamamlandı");
    expect(on).toContain("exam-slowest");
    store061.state = withTimers(state, false);
    const off = renderToStaticMarkup(<Exams navigate={() => {}} resultId={draft.id} />);
    expect(off).toContain("Denemeyi bitirdin.");
    expect(off).not.toContain("Referans süre");
    expect(off).not.toContain("Geçen süre");
    expect(off).not.toContain("Ek süre");
    expect(off).not.toContain("fatigue-curve");
    expect(off).not.toContain("exam-slowest");
    expect(off).toContain("Ders sonuçları");
  });

  it("shows the known elapsed time from older results without inventing time past the deadline", () => {
    const state = beginExam(initialState(), spec(), 1000);
    const draft = state.examDraft!;
    store061.state = finishExam(state, draft.id, draft.deadline);
    const html = renderToStaticMarkup(<Exams navigate={() => {}} resultId={draft.id} />);
    expect(html).toContain("Geçen süre 55 dk");
    expect(html).toContain("Referans süre 55 dk");
    expect(html).toContain("Bu kayıtta referans süre sonrasına ait süre bilgisi yok.");
    expect(html).not.toMatch(/Ek süre \d+/);
  });
});
