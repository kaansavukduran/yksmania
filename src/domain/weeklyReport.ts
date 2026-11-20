import type { AppState } from "./model";
import { addDays, independentCorrect, localDate } from "./scheduler";
import { examAssistance, examScore } from "./exams";
import { NET_LOSS_PER_WRONG, wrongAnswers } from "./mistakePatterns";

/*
 * Haftalık YKS karnesi: a read-only summary of saved evidence for one
 * Monday–Sunday week. Calendar days follow the app's local-day helpers.
 * It awards nothing (no XP, trophy or mastery) and writes no record.
 * "Yardımsız doğru" uses the existing independent-correct rules:
 * independentCorrect() for study sets and examAssistance() for exams.
 */
export type ReportSource = Pick<
  AppState,
  "sessions" | "examSessions" | "reviews" | "theoryReviewCompletions"
>;

export type WeekSummary = {
  start: string;
  end: string;
  independentCorrect: number;
  wrong: number;
  assistedSolved: number;
  reviews: number;
  exams: number;
  bestExamNet: number | null;
  topLossSubject: { subjectId: string; netLoss: number } | null;
  hasData: boolean;
};

const dayOfWeek = (day: string) => new Date(`${day}T12:00:00`).getDay();

/** Monday of the week that contains `day`. */
export function weekStart(day: string): string {
  return addDays(day, -((dayOfWeek(day) + 6) % 7));
}

export const isSunday = (day: string) => dayOfWeek(day) === 0;

export function weekSummary(
  state: ReportSource,
  start: string,
  subjectOf: (lessonId: string) => string | undefined,
): WeekSummary {
  const end = addDays(start, 6);
  const inWeek = (d: string | undefined) => !!d && d >= start && d <= end;
  const sessions = state.sessions.filter((s) => inWeek(s.date));
  const exams = state.examSessions.filter((e) => inWeek(localDate(new Date(e.finishedAt))));
  let independent = 0;
  let wrong = 0;
  let assistedSolved = 0;
  for (const s of sessions) {
    independent += independentCorrect(s);
    for (const r of s.responses) {
      if (!r.correct) wrong++;
      else if (r.assisted) assistedSolved++;
    }
  }
  let bestExamNet: number | null = null;
  for (const e of exams) {
    const help = examAssistance(e);
    const score = examScore(e);
    independent += help.independentCorrect;
    assistedSolved += help.assistedCorrect;
    wrong += score.wrong;
    if (bestExamNet === null || score.net > bestExamNet) bestExamNet = score.net;
  }
  const sessionDates = new Map(state.sessions.map((s) => [s.id, s.date]));
  const reviews =
    state.reviews.filter((r) => r.completedSessionId && inWeek(sessionDates.get(r.completedSessionId))).length +
    state.theoryReviewCompletions.filter((r) => inWeek(r.completedDate)).length;
  const loss = new Map<string, number>();
  for (const w of wrongAnswers(sessions, exams, {}, subjectOf))
    loss.set(w.subjectId, (loss.get(w.subjectId) ?? 0) + NET_LOSS_PER_WRONG);
  let topLossSubject: WeekSummary["topLossSubject"] = null;
  for (const [subjectId, netLoss] of [...loss].sort((a, b) => a[0].localeCompare(b[0])))
    if (!topLossSubject || netLoss > topLossSubject.netLoss) topLossSubject = { subjectId, netLoss };
  return {
    start,
    end,
    independentCorrect: independent,
    wrong,
    assistedSolved,
    reviews,
    exams: exams.length,
    bestExamNet,
    topLossSubject,
    hasData: independent + wrong + assistedSolved + reviews + exams.length > 0,
  };
}

export type WeeklyReport = {
  current: WeekSummary;
  previous: WeekSummary;
  sunday: boolean;
};

/** This week so far and the full previous week; null when this week has no data. */
export function weeklyReport(
  state: ReportSource,
  today: string,
  subjectOf: (lessonId: string) => string | undefined,
): WeeklyReport | null {
  const start = weekStart(today);
  const current = weekSummary(state, start, subjectOf);
  if (!current.hasData) return null;
  return { current, previous: weekSummary(state, addDays(start, -7), subjectOf), sunday: isSunday(today) };
}

const formatNumber = (n: number) => n.toLocaleString("tr", { maximumFractionDigits: 2 });

/** "geçen haftaya göre +3", "geçen haftaya göre -1,5" or "geçen haftayla aynı". */
export function diffText(current: number, previous: number): string {
  const d = Math.round((current - previous) * 100) / 100;
  if (d === 0) return "geçen haftayla aynı";
  return `geçen haftaya göre ${d > 0 ? "+" : "-"}${formatNumber(Math.abs(d))}`;
}

export { formatNumber as formatReportNumber };
