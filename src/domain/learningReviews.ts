import { reviewStages, type AppState, type ReviewStage } from "./model";
import { addDays, localDate, nextAvailable } from "./scheduler";
import {
  completionDates,
  studyTopicById,
  studyTopics,
  lessonTopic,
} from "./studyPlan";
import { lessonById } from "./content";

export const repeatName = (stage: ReviewStage) =>
  stage === 3 ? "İlk tekrar" : stage === 7 ? "İkinci tekrar" : "Son tekrar";
export const theoryReviewKey = (
  topicId: string,
  anchor: string,
  stage: ReviewStage,
) => `theory:${topicId}:${anchor}:d${stage}`;
export type LearningReview = {
  id: string;
  kind: "theory" | "questions";
  title: string;
  topicId?: string;
  lessonId?: string;
  stage: ReviewStage;
  anchorDate: string;
  targetDate: string;
  scheduled: string | null;
  completedDate?: string;
  completedSessionId?: string;
};
// Shared capacity for theory recall and existing question reviews. Original targets
// never change when capacity, availability or today's date changes.
export function learningReviewPlan(
  state: AppState,
  from = localDate(),
): LearningReview[] {
  const records = new Map(
    state.theoryReviewCompletions.map((r) => [
      theoryReviewKey(r.topicId, r.anchorDate, r.stage),
      r,
    ]),
  );
  const entries: LearningReview[] = [];
  for (const [topicId, anchorDate] of completionDates(state, "theory")) {
    const topic = studyTopicById(topicId);
    if (!topic) continue;
    for (const stage of reviewStages) {
      const id = theoryReviewKey(topicId, anchorDate, stage);
      entries.push({
        id,
        kind: "theory",
        title: topic.title,
        topicId,
        stage,
        anchorDate,
        targetDate: addDays(anchorDate, stage - 1),
        scheduled: null,
        completedDate: records.get(id)?.completedDate,
      });
    }
  }
  const sessions = new Map(state.sessions.map((s) => [s.id, s]));
  for (const review of state.reviews) {
    entries.push({
      ...review,
      kind: "questions",
      title: lessonById(review.lessonId)?.title.tr ?? review.lessonId,
      topicId: lessonTopic[review.lessonId],
      scheduled: null,
      completedDate: review.completedSessionId
        ? sessions.get(review.completedSessionId)?.date
        : undefined,
    });
  }
  const positions = new Map(studyTopics.map((t) => [t.id, t.order]));
  entries.sort(
    (a, b) =>
      a.targetDate.localeCompare(b.targetDate) ||
      (positions.get(a.topicId ?? "") ?? 9999) -
        (positions.get(b.topicId ?? "") ?? 9999) ||
      a.stage - b.stage ||
      (a.kind === b.kind ? 0 : a.kind === "theory" ? -1 : 1),
  );
  const load = new Map<string, number>();
  return entries.map((entry) => {
    if (entry.completedDate) return entry;
    let day = entry.targetDate < from ? from : entry.targetDate;
    for (let i = 0; i < 366; i++) {
      const candidate = nextAvailable(day, state.settings);
      if (!candidate) return entry;
      if ((load.get(candidate) ?? 0) + 10 <= state.settings.dailyMinutes) {
        load.set(candidate, (load.get(candidate) ?? 0) + 10);
        return { ...entry, scheduled: candidate };
      }
      day = addDays(candidate, 1);
    }
    return entry;
  });
}
export function setTheoryReviewCompletion(
  state: AppState,
  topicId: string,
  stage: ReviewStage,
  completed: boolean,
  day = localDate(),
): AppState {
  if (!studyTopicById(topicId) || !reviewStages.includes(stage))
    throw Error("INVALID_THEORY_REVIEW");
  const anchorDate = completionDates(state, "theory").get(topicId);
  if (!anchorDate || day < addDays(anchorDate, stage - 1))
    throw Error("THEORY_REVIEW_NOT_DUE");
  const same = (r: AppState["theoryReviewCompletions"][number]) =>
    r.topicId === topicId && r.anchorDate === anchorDate && r.stage === stage;
  if (completed && state.theoryReviewCompletions.some(same)) return state;
  return {
    ...state,
    theoryReviewCompletions: completed
      ? [
          ...state.theoryReviewCompletions,
          { topicId, anchorDate, stage, completedDate: day },
        ]
      : state.theoryReviewCompletions.filter((r) => !same(r)),
  };
}
