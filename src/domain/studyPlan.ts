import { narrativeTopics } from "../learning/narratives";
import details from "../data/detail-topics.json";
import order from "../data/study-order.json";
import { lessons } from "./content";
import {
  THEORY_DEADLINE,
  type AppState,
  type Settings,
  type Session,
} from "./model";
import { addDays, isBlocked, localDate } from "./scheduler";

export type StudyMode = "theory" | "questions";
const byId = new Map(details.map((t) => [t.id, t]));
const lessonIndex = new Map(lessons.map((lesson) => [lesson.id, lesson]));
export const studyTopics = order.map((id, i) => ({
  ...byId.get(id)!,
  order: i + 1,
}));
export const studyTopicById = (id: string) =>
  studyTopics.find((t) => t.id === id);
// Only reviewed one-to-one subject/topic associations; no fuzzy learning credit.
export const lessonTopic: Record<string, string> = {
  ...narrativeTopics,
  "rasyonel-sayilar": "detail-202",
  "carpanlara-ayirma": "detail-221",
  "atp-metabolizma": "detail-283",
  newton: "detail-117",
  mol: "detail-171",
  paragraf: "detail-270",
  "hucre-organelleri": "detail-11",
  "periyodik-sistem": "detail-146",
  "turev-teget": "detail-476",
  "elektrik-alan": "detail-375",
  "kimyasal-denge": "detail-426",
  "dna-eslenmesi": "detail-330",
  "simyadan-kimyaya": "detail-139",
  "kimya-disiplinleri": "detail-140",
  "sembolik-dil": "detail-141",
  "kimya-guvenlik": "detail-142",
  "atom-modelleri": "detail-143",
  "temel-kavramlar": "detail-194",
  "tek-cift-isaret": "detail-195",
  "ardisik-sayilar": "detail-196",
  "asal-sayilar": "detail-197",
  faktoriyel: "detail-198",
  "birinci-dereceden-denklemler": "detail-203",
  "basit-esitsizlikler": "detail-204",
  "katman-elektron-dizilimi": "detail-147",
  "carpanlara-ayirma-ileri": "detail-221",
};
export const topicLessons = (topicId: string) =>
  lessons.filter((l) => lessonTopic[l.id] === topicId);
// Latest complete attempt, never a sum/best score across repeated sessions.
export function topicResults(state: AppState) {
  const results = new Map<string, Session>();
  for (const session of state.sessions) {
    const id = lessonTopic[session.lessonId];
    const lesson = lessonIndex.get(session.lessonId);
    if (
      !id ||
      !lesson ||
      !lesson.questions.length ||
      session.responses.length !== lesson.questions.length
    )
      continue;
    const previous = results.get(id);
    if (
      !previous ||
      session.date > previous.date ||
      (session.date === previous.date &&
        (Date.parse(session.finishedAt) || 0) >=
          (Date.parse(previous.finishedAt) || 0))
    )
      results.set(id, session);
  }
  return results;
}
export function completionDates(state: AppState, mode: StudyMode) {
  const dates = new Map<string, string>();
  const put = (id: string, day: string) => {
    if (!dates.has(id) || day < dates.get(id)!) dates.set(id, day);
  };
  for (const [id, value] of Object.entries(state.topicProgress))
    if (value[mode]) put(id, value[mode]);
  for (const s of state.sessions) {
    const lesson = lessonIndex.get(s.lessonId),
      id = lessonTopic[s.lessonId];
    if (
      id &&
      lesson &&
      lesson.questions.length > 0 &&
      s.responses.length === lesson.questions.length &&
      (mode === "questions" ||
        (s.kind === "learn" && s.includesTheory !== false))
    )
      put(id, s.date);
  }
  return dates;
}
export function completionDate(state: AppState, id: string, mode: StudyMode) {
  return completionDates(state, mode).get(id);
}
export function setTopicCompletion(
  state: AppState,
  id: string,
  mode: StudyMode,
  completed: boolean,
  day = localDate(),
): AppState {
  if (!studyTopicById(id)) throw new Error("UNKNOWN_STUDY_TOPIC");
  const progress = { ...state.topicProgress[id] };
  if (completed) progress[mode] = day;
  else delete progress[mode];
  return {
    ...state,
    topicProgress: { ...state.topicProgress, [id]: progress },
  };
}
const ordinal = (day: string) =>
  Math.floor(Date.parse(day + "T12:00:00Z") / 86400000);
// Inclusive calendar range. A blocked date is subtracted once, never twice with its weekday.
export function availableDayCount(
  from: string,
  to: string,
  settings: Settings,
) {
  if (to < from) return 0;
  const length = ordinal(to) - ordinal(from) + 1;
  const blockedWeekdays = new Set(settings.blockedWeekdays);
  const start = new Date(from + "T12:00:00Z").getUTCDay();
  let count = Math.floor(length / 7) * (7 - blockedWeekdays.size);
  for (let i = 0; i < length % 7; i++)
    if (!blockedWeekdays.has((start + i) % 7)) count++;
  for (const d of new Set(settings.blockedDates))
    if (
      d >= from &&
      d <= to &&
      !blockedWeekdays.has(new Date(d + "T12:00:00Z").getUTCDay())
    )
      count--;
  return count;
}
export function studyPlan(
  state: AppState,
  mode: StudyMode,
  today = localDate(),
) {
  const deadline =
    mode === "theory" ? THEORY_DEADLINE : state.settings.examDate;
  const completed = completionDates(state, mode);
  const done = studyTopics.filter((t) => completed.has(t.id));
  const doneToday = done.filter((t) => completed.get(t.id) === today).length;
  const remaining = studyTopics.filter((t) => !completed.has(t.id));
  const days = availableDayCount(today, deadline, state.settings);
  const closed = isBlocked(today, state.settings);
  const baseline = remaining.length + doneToday;
  const target = days && !closed ? Math.ceil(baseline / days) : 0;
  const todayCount = Math.min(
    remaining.length,
    Math.max(0, target - doneToday),
  );
  const futureDays = days - (closed ? 0 : Math.min(1, days));
  const futureStart = addDays(today, 1);
  const afterToday = remaining.length - todayCount;
  const dateAt = (index: number) => {
    if (index < todayCount) return today;
    if (!futureDays || !afterToday) return null;
    // Spread whole topics across the remaining eligible days, including sparse plans.
    const dayIndex =
      Math.floor(((index - todayCount) * futureDays) / afterToday) + 1;
    let low = 0,
      high = ordinal(deadline) - ordinal(futureStart);
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (
        availableDayCount(
          futureStart,
          addDays(futureStart, mid),
          state.settings,
        ) >= dayIndex
      )
        high = mid;
      else low = mid + 1;
    }
    return addDays(futureStart, low);
  };
  const scheduled = remaining.map((topic, i) => ({
    topic,
    day: days ? dateAt(i) : null,
  }));
  return {
    mode,
    deadline,
    done: done.length,
    total: studyTopics.length,
    remaining: remaining.length,
    doneToday,
    days,
    closed,
    target,
    todayCount,
    perDay: days ? remaining.length / days : null,
    items: scheduled.filter((s) => s.day === today),
    scheduled,
    status: !remaining.length
      ? "complete"
      : deadline < today
        ? "overdue"
        : !days
          ? "unavailable"
          : "active",
  };
}
