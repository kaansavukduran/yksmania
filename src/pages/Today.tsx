import { ArrowRight, CalendarDays, Check, Sprout } from "lucide-react";
import { useApp } from "../store";
import { lessons, lessonById } from "../domain/content";
import {
  addDays,
  formatDate,
  independentCorrect,
  isBlocked,
  localDate,
  reviewPlan,
  xp,
} from "../domain/scheduler";
import { Aion } from "../components/Aion";
import { LessonRow, SectionLink } from "../components/Shared";
import type { Lesson } from "../domain/model";
export function Today({
  start,
  navigate,
}: {
  start: (lesson: Lesson, reviewId?: string) => void;
  navigate: (route: string) => void;
}) {
  const { state, t, l } = useApp();
  const today = localDate();
  const closed = isBlocked(today, state.settings);
  const due = reviewPlan(state).filter((p) => p.scheduled === today);
  const next =
    lessons.find(
      (lesson) =>
        !state.sessions.some(
          (s) => s.lessonId === lesson.id && s.kind === "learn",
        ),
    ) ?? lessons[0];
  const first = due[0];
  const recommended = first
    ? (lessonById(first.review.lessonId) ?? next)
    : next;
  const correct = state.sessions.reduce((n, s) => n + independentCorrect(s), 0);
  const dates = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
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
                  : start(recommended, first?.review.id)
            }
          >
            {t(closed ? "freeStudy" : state.draft ? "continue" : "learn")}
            <ArrowRight size={18} />
          </button>
          <p className="hero-foot small">
            {t("catalogueStatus")} · {t("offline")}
          </p>
        </div>
        <div className="hero-art">
          <div className="pixel-spark spark-one" />
          <div className="pixel-spark spark-two" />
          <Aion size={240} />
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
      <div className="today-grid">
        <section className="panel path-panel">
          <div className="section-heading">
            <h2>{t("dailyPath")}</h2>
            <SectionLink onClick={() => navigate("/courses")}>
              {t("courses")}
            </SectionLink>
          </div>
          {closed ? (
            <div className="rest-state">
              <CalendarDays size={30} />
              <p>{t("blockedBody")}</p>
              <button
                className="secondary"
                onClick={() => navigate("/calendar")}
              >
                {t("seeCalendar")}
              </button>
            </div>
          ) : (
            <>
              {due.slice(0, 3).map((p) => {
                const lesson = lessonById(p.review.lessonId);
                return lesson ? (
                  <LessonRow
                    key={p.review.id}
                    lesson={lesson}
                    review
                    reason={`${t("reviewReason")} ${t("day")} ${p.review.stage}`}
                    onStart={() => start(lesson, p.review.id)}
                  />
                ) : null;
              })}
              <LessonRow
                lesson={next}
                reason={t("nextReason")}
                onStart={() => start(next)}
              />
              {lessons
                .filter((x) => x.id !== next.id)
                .slice(0, 1)
                .map((lesson) => (
                  <LessonRow
                    key={lesson.id}
                    lesson={lesson}
                    onStart={() => start(lesson)}
                  />
                ))}
            </>
          )}
          <div className="panel-foot">
            <span className="tiny-dot" />
            {t("reviewPolicy")}
          </div>
        </section>
        <aside className="panel weekly-panel">
          <div className="section-heading">
            <h2>{t("weekly")}</h2>
            <span className="small muted">
              {state.settings.dailyMinutes} {t("minutes")}/
              {t("day").toLowerCase()}
            </span>
          </div>
          <div className="week-days">
            {dates.map((day) => {
              const count = state.sessions.filter((s) => s.date === day).length;
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
