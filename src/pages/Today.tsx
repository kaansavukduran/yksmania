import { ArrowRight, Check, Sprout } from "lucide-react";
import { useApp } from "../store";
import { lessons, lessonById } from "../domain/content";
import {
  addDays,
  formatDate,
  independentCorrect,
  isBlocked,
  xp,
} from "../domain/scheduler";
import { Aion } from "../components/Aion";
import { SectionLink } from "../components/Shared";
import type { Lesson } from "../domain/model";
import { learningReviewPlan } from "../domain/learningReviews";
import {
  TodayReviewQueue,
  theoryReviewRoute,
} from "../components/LearningReviews";
import { DailyStudyPlans } from "../components/StudyPlanning";
import { studyPlan, completionDates, studyTopics } from "../domain/studyPlan";
export function Today({
  start,
  navigate,
}: {
  start: (lesson: Lesson, reviewId?: string) => void;
  navigate: (route: string) => void;
}) {
  const { state, today, t } = useApp();
  const closed = isBlocked(today, state.settings);
  const reviews = learningReviewPlan(state, today);
  const due = reviews.filter((p) => p.scheduled === today);
  const next =
    lessons.find(
      (lesson) =>
        !state.sessions.some(
          (s) => s.lessonId === lesson.id && s.kind === "learn",
        ),
    ) ?? lessons[0];
  const first = due[0];
  const nextTopic = studyPlan(state, "theory", today).items[0]?.topic;
  const recommended = first ? (lessonById(first.lessonId ?? "") ?? next) : next;
  const correct = state.sessions.reduce((n, s) => n + independentCorrect(s), 0);
  const dates = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
  const theoryDone = completionDates(state, "theory").size;
  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">
            {formatDate(today, state.settings.locale, {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
          <h1>{t("today")}</h1>
        </div>
        <span className="quiet-chip">
          <Sprout size={16} />
          {state.settings.gamification ? `${xp(state)} XP` : t("localFirst")}
        </span>
      </header>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-kicker">
            <span className="tiny-star">✦</span>
            {t(closed ? "unavailable" : state.draft ? "continue" : "welcome")}
          </span>
          <h2>{t(closed ? "blockedToday" : "heroTitle")}</h2>
          <p>
            {t(
              closed ? "blockedBody" : state.draft ? "resumeBody" : "heroBody",
            )}
          </p>
          <button
            className="primary"
            onClick={() =>
              closed
                ? navigate("/courses")
                : state.draft
                  ? navigate("/study")
                  : first
                    ? first.kind === "theory"
                      ? navigate(theoryReviewRoute(first))
                      : start(recommended, first.id)
                    : nextTopic
                      ? navigate(`/topic?id=${nextTopic.id}&mode=theory`)
                      : navigate("/courses")
            }
          >
            {first && !closed && !state.draft
              ? "Tekrara başla"
              : t(closed ? "freeStudy" : state.draft ? "continue" : "learn")}
            <ArrowRight size={18} />
          </button>
          <p className="hero-foot small">
            {
              lessons.filter((lesson) => !lesson.tags.includes("soru-seti"))
                .length
            }{" "}
            {t("readyLessonCount")} ·{" "}
            {lessons.reduce(
              (total, lesson) => total + lesson.questions.length,
              0,
            )}{" "}
            {t("originalQuestions")} · {t("offline")}
          </p>
        </div>
        <div className="hero-art">
          <div
            className="study-landscape"
            aria-hidden="true"
            style={{
              filter: `grayscale(${1 - theoryDone / studyTopics.length})`,
            }}
          />
          <Aion size={240} />
          {/* The landscape gains colour only from topics you marked as studied. */}
          <span className="hero-progress-chip">
            {theoryDone.toLocaleString(state.settings.locale)} / {studyTopics.length.toLocaleString(state.settings.locale)} konu çalışıldı · manzara bununla renklenir
          </span>
          <span className="art-caption">AIONIA</span>
        </div>
      </section>
      <div className="stats-strip">
        <div>
          <span className="stat-number">
            {state.sessions.length.toLocaleString(state.settings.locale)}
          </span>
          <span>{t("sessions")}</span>
        </div>
        <div>
          <span className="stat-number">
            {correct.toLocaleString(state.settings.locale)}
          </span>
          <span>{t("independent")}</span>
        </div>
        <div>
          <span className="stat-number">{due.length}</span>
          <span>{t("reviewsDue")}</span>
        </div>
      </div>
      <div className="today-flow">
        <TodayReviewQueue
          items={reviews}
          closed={closed}
          start={start}
          navigate={navigate}
        />
        <DailyStudyPlans navigate={navigate} />
        <aside className="panel weekly-panel" aria-label={t("weekly")}>
          <div className="section-heading">
            <h2>{t("weekly")}</h2>
            <span className="small muted">
              {state.settings.dailyMinutes} {t("minutes")}/
              {t("day").toLowerCase()}
            </span>
          </div>
          <div className="week-days">
            {dates.map((day) => {
              const count =
                state.sessions.filter((s) => s.date === day).length +
                state.theoryReviewCompletions.filter(
                  (r) => r.completedDate === day,
                ).length;
              return (
                <div
                  key={day}
                  className={day === today ? "week-day current" : "week-day"}
                >
                  <span>
                    {formatDate(day, state.settings.locale, {
                      weekday: "short",
                    })}
                  </span>
                  <div className={count ? "day-orb active" : "day-orb"}>
                    {count ? (
                      <Check size={19} />
                    ) : (
                      new Date(day + "T12:00:00").getDate()
                    )}
                  </div>
                  <span className="small">{count || "·"}</span>
                </div>
              );
            })}
          </div>
          <p className="muted small">{t("weeklyBody")}</p>
          <div className="weekly-note">
            <Sprout size={22} />
            <p>{state.sessions.length ? t("mascotText") : t("noData")}</p>
          </div>
          <SectionLink onClick={() => navigate("/calendar")}>
            {t("seeCalendar")}
          </SectionLink>
        </aside>
      </div>
      <p className="scope-note">{t("scopeNote")}</p>
    </>
  );
}
