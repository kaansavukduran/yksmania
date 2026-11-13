import type { AppState, Review, Session, Settings } from "./model";
export function localDate(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export function addDays(day: string, n: number): string {
  const d = new Date(day + "T12:00:00");
  d.setDate(d.getDate() + n);
  return localDate(d);
}
export function isBlocked(day: string, settings: Settings): boolean {
  return (
    settings.blockedDates.includes(day) ||
    settings.blockedWeekdays.includes(new Date(day + "T12:00:00").getDay())
  );
}
export function nextAvailable(day: string, settings: Settings): string | null {
  for (let i = 0; i < 366; i++) {
    const d = addDays(day, i);
    if (!isBlocked(d, settings)) return d;
  }
  return null;
}
export function createReviews(session: Session): Review[] {
  return ([3, 7, 21] as const).map((stage) => ({
    id: `${session.id}:d${stage}`,
    lessonId: session.lessonId,
    anchorDate: session.date,
    targetDate: addDays(session.date, stage - 1),
    stage,
    originSessionId: session.id,
  }));
}
export function finishSession(state: AppState, session: Session): AppState {
  if (state.sessions.some((s) => s.id === session.id)) return state;
  let reviews = [...state.reviews];
  if (session.reviewId) {
    reviews = reviews.map((r) =>
      r.id === session.reviewId && !r.completedSessionId
        ? { ...r, completedSessionId: session.id }
        : r,
    );
  } else if (
    session.kind === "learn" &&
    !state.sessions.some(
      (s) => s.lessonId === session.lessonId && s.kind === "learn",
    )
  )
    reviews.push(...createReviews(session));
  return {
    ...state,
    sessions: [...state.sessions, session],
    reviews,
    draft: null,
  };
}
export function undoSession(state: AppState, id: string): AppState {
  const deletedReviews = new Set(
    state.reviews.filter((r) => r.originSessionId === id).map((r) => r.id),
  );
  return {
    ...state,
    sessions: state.sessions.filter((s) => s.id !== id),
    reviews: state.reviews
      .filter((r) => r.originSessionId !== id)
      .map((r) =>
        r.completedSessionId === id
          ? { ...r, completedSessionId: undefined }
          : r,
      ),
    draft:
      state.draft?.reviewId && deletedReviews.has(state.draft.reviewId)
        ? null
        : state.draft,
  };
}
export function reviewPlan(
  state: AppState,
  from = localDate(),
): { review: Review; scheduled: string | null }[] {
  const load = new Map<string, number>();
  return state.reviews
    .filter((r) => !r.completedSessionId)
    .sort(
      (a, b) => a.targetDate.localeCompare(b.targetDate) || a.stage - b.stage,
    )
    .map((review) => {
      let day = review.targetDate < from ? from : review.targetDate;
      for (let i = 0; i < 366; i++) {
        const candidate = nextAvailable(day, state.settings);
        if (!candidate) return { review, scheduled: null };
        if ((load.get(candidate) || 0) + 10 <= state.settings.dailyMinutes) {
          load.set(candidate, (load.get(candidate) || 0) + 10);
          return { review, scheduled: candidate };
        }
        day = addDays(candidate, 1);
      }
      return { review, scheduled: null };
    });
}
export function xp(state: AppState): number {
  const learned = new Set(
    state.sessions.filter((s) => s.kind === "learn").map((s) => s.lessonId),
  );
  const reviewed = new Set(
    state.reviews
      .filter(
        (r) =>
          r.completedSessionId &&
          state.sessions.some((s) => s.id === r.completedSessionId),
      )
      .map((r) => r.id),
  );
  return learned.size * 25 + reviewed.size * 10;
}
export function independentCorrect(session: Session): number {
  return session.responses.filter((r) => r.correct && !r.assisted).length;
}
export function formatDate(
  day: string,
  locale: "tr" | "en",
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" },
): string {
  return new Intl.DateTimeFormat(
    locale === "tr" ? "tr-TR" : "en-GB",
    options,
  ).format(new Date(day + "T12:00:00"));
}
