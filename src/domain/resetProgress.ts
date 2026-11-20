import type { AppState } from "./model";
import { changeTimer } from "./focusTimer";

export function resetLearningProgress(state: AppState): AppState {
  return {
    ...state,
    sessions: [],
    examDraft: null,
    examSessions: [],
    reviews: [],
    theoryReviewCompletions: [],
    draft: null,
    topicProgress: {},
    foundationAttempts: {},
    unlocked: [],
    explorations: {},
    focusTimer: changeTimer(
      state.focusTimer,
      { type: "duration", seconds: state.focusTimer.durationSeconds },
      0,
    ),
  };
}
