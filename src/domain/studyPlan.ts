import { forge023MathTopics } from "../learning/forge023Math";
import { forge023PhysicsTopics } from "../learning/forge023Physics";
import { forge023BiologyTopics } from "../learning/forge023Biology";
import { forge023ChemistryTopics } from "../learning/forge023Chemistry";
import { forge023HumanitiesATopics } from "../learning/forge023HumanitiesA";
import { forge023HumanitiesBTopics } from "../learning/forge023HumanitiesB";
import { forge023TurkishTopics } from "../learning/forge023Turkish";
import { forge022MathTopics } from "../learning/forge022Math";
import { forge022PhysicsTopics } from "../learning/forge022Physics";
import { forge022BiologyTopics } from "../learning/forge022Biology";
import { forge022ChemistryATopics } from "../learning/forge022ChemistryA";
import { forge022ChemistryBTopics } from "../learning/forge022ChemistryB";
import { forge022HumanitiesTopics } from "../learning/forge022Humanities";
import { forge021GeometryTopics } from "../learning/forge021Geometry";
import { forge021PhysicsTopics } from "../learning/forge021Physics";
import { forge021BiologyATopics } from "../learning/forge021BiologyA";
import { forge021BiologyBTopics } from "../learning/forge021BiologyB";
import { forge021ChemistryTopics } from "../learning/forge021Chemistry";
import { forge021HumanitiesTopics } from "../learning/forge021Humanities";
import { forge021TurkishTopics } from "../learning/forge021Turkish";
import { forge020BiologyTopics } from "../learning/forge020Biology";
import { forge020ChemistryTopics } from "../learning/forge020Chemistry";
import { forge020PhysicsTopics } from "../learning/forge020Physics";
import { forge020GeographyTopics } from "../learning/forge020Geography";
import { forge020HumanitiesTopics } from "../learning/forge020Humanities";
import { forge019BiologyTopics } from "../learning/forge019Biology";
import { forge019ChemistryTopics } from "../learning/forge019Chemistry";
import { forge019PhysicsTopics } from "../learning/forge019Physics";
import { forge019GeographyTopics } from "../learning/forge019Geography";
import { forge019TurkishTopics } from "../learning/forge019Turkish";
import { forge019MathTopics } from "../learning/forge019Math";
import { forge018BiologyTopics } from "../learning/forge018Biology";
import { forge018ChemistryTopics } from "../learning/forge018Chemistry";
import { forge018PhysicsTopics } from "../learning/forge018Physics";
import { forge018GeographyTopics } from "../learning/forge018Geography";
import { forge018TurkishTopics } from "../learning/forge018Turkish";
import { forge018MathTopics } from "../learning/forge018Math";
import { forge017BiologyTopics } from "../learning/forge017Biology";
import { forge017ChemistryATopics } from "../learning/forge017ChemistryA";
import { forge017ChemistryBTopics } from "../learning/forge017ChemistryB";
import { forge017GeographyTopics } from "../learning/forge017Geography";
import { forge017PhysicsTopics } from "../learning/forge017Physics";
import { forge017TurkishTopics } from "../learning/forge017Turkish";
import { forge016BiologyATopics } from "../learning/forge016BiologyA";
import { forge016BiologyBTopics } from "../learning/forge016BiologyB";
import { forge016ChemistryTopics } from "../learning/forge016Chemistry";
import { forge016GeographyTopics } from "../learning/forge016Geography";
import { forge016PhysicsTopics } from "../learning/forge016Physics";
import { forge016TurkishTopics } from "../learning/forge016Turkish";
import { forge015MathTopics } from "../learning/forge015Math";
import { forge015PhysicsTopics } from "../learning/forge015Physics";
import { forge015ChemistryTopics } from "../learning/forge015Chemistry";
import { forge015BiologyTopics } from "../learning/forge015Biology";
import { forge015GeographyTopics } from "../learning/forge015Geography";
import { forge015TurkishTopics } from "../learning/forge015Turkish";
import { forge014MathTopics } from "../learning/forge014Math";
import { forge014PhysicsTopics } from "../learning/forge014Physics";
import { forge014ChemistryTopics } from "../learning/forge014Chemistry";
import { forge014BiologyTopics } from "../learning/forge014Biology";
import { forge014GeographyTopics } from "../learning/forge014Geography";
import { forge014TurkishTopics } from "../learning/forge014Turkish";
import { forge012MathTopics } from "../learning/forge012Math";
import { forge012PhysicsTopics } from "../learning/forge012Physics";
import { forge012ChemistryTopics } from "../learning/forge012Chemistry";
import { forge012BiologyTopics } from "../learning/forge012Biology";
import { forge012TurkishTopics } from "../learning/forge012Turkish";
import { forge012HistoryTopics } from "../learning/forge012History";
import { forge011MathTopics } from "../learning/forge011Math";
import { forge011PhysicsTopics } from "../learning/forge011Physics";
import { forge011ChemistryTopics } from "../learning/forge011Chemistry";
import { forge011BiologyATopics } from "../learning/forge011BiologyA";
import { forge011BiologyBTopics } from "../learning/forge011BiologyB";
import { forge011TurkishTopics } from "../learning/forge011Turkish";
import { forge011HistoryTopics } from "../learning/forge011History";
import { forge093MathTopics } from "../learning/forge093Math";
import { forge093PhysicsTopics } from "../learning/forge093Physics";
import { forge093ChemistryTopics } from "../learning/forge093Chemistry";
import { forge093BiologyTopics } from "../learning/forge093Biology";
import { forge093TurkishTopics } from "../learning/forge093Turkish";
import { forge093HistoryTopics } from "../learning/forge093History";
import { periodicDepthTopics } from "../learning/periodicDepth";
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
  ...forge023MathTopics,
  ...forge023PhysicsTopics,
  ...forge023BiologyTopics,
  ...forge023ChemistryTopics,
  ...forge023HumanitiesATopics,
  ...forge023HumanitiesBTopics,
  ...forge023TurkishTopics,
  ...forge022MathTopics,
  ...forge022PhysicsTopics,
  ...forge022BiologyTopics,
  ...forge022ChemistryATopics,
  ...forge022ChemistryBTopics,
  ...forge022HumanitiesTopics,
  ...forge021GeometryTopics,
  ...forge021PhysicsTopics,
  ...forge021BiologyATopics,
  ...forge021BiologyBTopics,
  ...forge021ChemistryTopics,
  ...forge021HumanitiesTopics,
  ...forge021TurkishTopics,
  ...forge020BiologyTopics,
  ...forge020ChemistryTopics,
  ...forge020PhysicsTopics,
  ...forge020GeographyTopics,
  ...forge020HumanitiesTopics,
  ...forge019BiologyTopics,
  ...forge019ChemistryTopics,
  ...forge019PhysicsTopics,
  ...forge019GeographyTopics,
  ...forge019TurkishTopics,
  ...forge019MathTopics,
  ...forge018BiologyTopics,
  ...forge018ChemistryTopics,
  ...forge018PhysicsTopics,
  ...forge018GeographyTopics,
  ...forge018TurkishTopics,
  ...forge018MathTopics,
  ...forge017BiologyTopics,
  ...forge017ChemistryATopics,
  ...forge017ChemistryBTopics,
  ...forge017GeographyTopics,
  ...forge017PhysicsTopics,
  ...forge017TurkishTopics,
  ...forge016BiologyATopics,
  ...forge016BiologyBTopics,
  ...forge016ChemistryTopics,
  ...forge016GeographyTopics,
  ...forge016PhysicsTopics,
  ...forge016TurkishTopics,
  ...forge015MathTopics,
  ...forge015PhysicsTopics,
  ...forge015ChemistryTopics,
  ...forge015BiologyTopics,
  ...forge015GeographyTopics,
  ...forge015TurkishTopics,
  ...forge014MathTopics,
  ...forge014PhysicsTopics,
  ...forge014ChemistryTopics,
  ...forge014BiologyTopics,
  ...forge014GeographyTopics,
  ...forge014TurkishTopics,
  ...forge012MathTopics,
  ...forge012PhysicsTopics,
  ...forge012ChemistryTopics,
  ...forge012BiologyTopics,
  ...forge012TurkishTopics,
  ...forge012HistoryTopics,
  ...forge011MathTopics,
  ...forge011PhysicsTopics,
  ...forge011ChemistryTopics,
  ...forge011BiologyATopics,
  ...forge011BiologyBTopics,
  ...forge011TurkishTopics,
  ...forge011HistoryTopics,
  ...forge093MathTopics,
  ...forge093PhysicsTopics,
  ...forge093ChemistryTopics,
  ...forge093BiologyTopics,
  ...forge093TurkishTopics,
  ...forge093HistoryTopics,
  ...narrativeTopics,
  ...periodicDepthTopics,
  "dunya-gucu-osmanli": "detail-236",
  "kimyasal-turler-lewis": "detail-152",
  "isi-ve-sicaklik": "detail-119",
  "iyonik-bag-ve-guclu-etkilesimler": "detail-153",
  "iyonik-bilesik-adlandirma": "detail-154",
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
