import { it, expect } from "vitest";
import {
  initialFocusTimer,
  changeTimer,
  remainingTime,
  formatCountdown,
} from "../src/domain/focusTimer";
import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
import { resetLearningProgress } from "../src/domain/resetProgress";

it("runs from a saved deadline, pauses without consuming time and resumes only the remainder", () => {
  const timer = changeTimer(initialFocusTimer(), { type: "flip" }, 1000);
  expect(remainingTime(timer, 61000)).toBe(240000);
  const paused = changeTimer(timer, { type: "pause" }, 61000);
  expect(remainingTime(paused, 999000)).toBe(240000);
  const resumed = changeTimer(paused, { type: "resume" }, 1000000);
  expect(remainingTime(resumed, 1060000)).toBe(180000);
  expect(remainingTime(resumed, 2000000)).toBe(0);
  expect(changeTimer(resumed, { type: "flip" }, 2000000).deadline).toBe(
    2300000,
  );
});
it("accepts 1–120 whole minutes, rejects invalid durations and formats the two-hour limit", () => {
  for (const seconds of [60, 300, 600, 1200, 7200])
    expect(
      changeTimer(initialFocusTimer(), { type: "duration", seconds }, 0)
        .remainingMs,
    ).toBe(seconds * 1000);
  for (const seconds of [0, 59, 61, 7201, NaN, Infinity, 120.5])
    expect(() =>
      changeTimer(initialFocusTimer(), { type: "duration", seconds }, 0),
    ).toThrow();
  expect(formatCountdown(7200000)).toBe("2:00:00");
  expect(formatCountdown(59999)).toBe("01:00");
  expect(formatCountdown(-5)).toBe("00:00");
});
it("opens a pre-timer backup without changing notes, settings or stored progress", () => {
  const current = initialState();
  current.notes.lesson = "ÇĞİÖŞÜ notum";
  current.topicProgress["detail-139"] = { theory: "2026-11-14" };
  const { focusTimer, ...old } = current;
  expect(validateState(old)).toEqual(current);
  expect(() =>
    validateState({
      ...current,
      focusTimer: { ...focusTimer, phase: "running", deadline: null },
    }),
  ).toThrow();
});
it("clears all learning evidence but preserves settings, notes, PDF positions and selected timer duration", () => {
  const state = initialState();
  state.notes = { personal: "Kaybolmasın" };
  state.readingPages = { pdf: 7 };
  state.settings.theme = "light";
  state.topicProgress["detail-139"] = {
    theory: "2026-11-14",
    questions: "2026-11-14",
  };
  state.theoryReviewCompletions = [
    {
      topicId: "detail-139",
      anchorDate: "2026-11-01",
      stage: 3,
      completedDate: "2026-11-03",
    },
  ];
  state.explorations = { fractions: { numerator: 2 } };
  state.unlocked = ["first"];
  state.focusTimer = changeTimer(
    changeTimer(initialFocusTimer(), { type: "duration", seconds: 1200 }, 0),
    { type: "flip" },
    1000,
  );
  const reset = resetLearningProgress(state);
  expect(reset.sessions).toEqual([]);
  expect(reset.reviews).toEqual([]);
  expect(reset.topicProgress).toEqual({});
  expect(reset.theoryReviewCompletions).toEqual([]);
  expect(reset.draft).toBeNull();
  expect(reset.unlocked).toEqual([]);
  expect(reset.explorations).toEqual({});
  expect(reset.settings).toEqual(state.settings);
  expect(reset.notes).toEqual(state.notes);
  expect(reset.readingPages).toEqual(state.readingPages);
  expect(reset.focusTimer).toEqual({
    durationSeconds: 1200,
    remainingMs: 1200000,
    phase: "idle",
    deadline: null,
  });
  expect(state.topicProgress["detail-139"].theory).toBe("2026-11-14");
});
