import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useApp } from "../store";
import { addDays, formatDate, isBlocked, localDate } from "../domain/scheduler";
import { lessonById } from "../domain/content";
import type { Lesson } from "../domain/model";
import { DateInput } from "../components/DateInput";
import { learningReviewPlan, repeatName } from "../domain/learningReviews";
import { theoryReviewRoute } from "../components/LearningReviews";
import { studyPlan } from "../domain/studyPlan";
export function Calendar({
  start,
  navigate,
}: {
  start: (l: Lesson, r?: string) => void;
  navigate: (r: string) => void;
}) {
  const { state, today, t, l, setSetting } = useApp();
  const [month, setMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return localDate(d);
  });
  const [selected, setSelected] = useState(localDate());
  const [blockedDate, setBlockedDate] = useState("");
  const plan = learningReviewPlan(state, today);
  const study = useMemo(
    () => [
      studyPlan(state, "theory", today),
      studyPlan(state, "questions", today),
    ],
    [state.topicProgress, state.sessions, state.settings, today],
  );
  const studyLoad = new Map<string, number>();
  for (const p of study)
    for (const entry of p.scheduled)
      if (entry.day)
        studyLoad.set(entry.day, (studyLoad.get(entry.day) ?? 0) + 1);
  const date = new Date(month + "T12:00:00");
  const offset = (date.getDay() + 6) % 7;
  const startDay = addDays(month, -offset);
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    formatDate(addDays("2026-11-09", i), state.settings.locale, {
      weekday: "short",
    }),
  );
  const chosen = plan.filter(
    (p) => p.scheduled === selected || p.completedDate === selected,
  );
  const change = (n: number) => {
    const d = new Date(month + "T12:00:00");
    d.setMonth(d.getMonth() + n);
    setMonth(localDate(d));
  };
  const toggle = (day: string) => {
    const values = state.settings.blockedDates;
    void setSetting(
      "blockedDates",
      values.includes(day) ? values.filter((x) => x !== day) : [...values, day],
    ).catch(() => {});
  };
  return (
    <>
      <header className="page-heading">
        <div>
          <h1>{t("calendar")}</h1>
        </div>
      </header>
      <p className="lead muted">{t("reviewPolicy")}</p>
      <div className="calendar-layout">
        <section className="panel calendar-panel">
          <div className="section-heading">
            <h2>
              {formatDate(month, state.settings.locale, {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="button-pair">
              <button
                className="icon-button"
                aria-label={t("monthPrev")}
                onClick={() => change(-1)}
              >
                <ChevronLeft />
              </button>
              <button
                className="icon-button"
                aria-label={t("monthNext")}
                onClick={() => change(1)}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="calendar-grid">
            {weekdays.map((d, i) => (
              <span className="calendar-weekday" key={i}>
                {d}
              </span>
            ))}
            {Array.from({ length: 42 }, (_, i) => addDays(startDay, i)).map(
              (day) => {
                const closed = isBlocked(day, state.settings);
                const count =
                  plan.filter(
                    (p) => p.scheduled === day || p.completedDate === day,
                  ).length + (studyLoad.get(day) ?? 0);
                return (
                  <button
                    key={day}
                    className={`calendar-day ${day.slice(0, 7) !== month.slice(0, 7) ? "other-month" : ""} ${day === selected ? "selected" : ""} ${closed ? "closed" : ""} ${day === today ? "is-today" : ""}`}
                    aria-label={`${formatDate(day, state.settings.locale, { day: "numeric", month: "long", year: "numeric" })}${closed ? `, ${t("unavailable")}` : ""}${count ? `, ${count} çalışma` : ""}`}
                    aria-pressed={selected === day}
                    onClick={() => setSelected(day)}
                  >
                    <span>{new Date(day + "T12:00:00").getDate()}</span>
                    {closed ? (
                      <X size={12} />
                    ) : count ? (
                      <span className="calendar-dot">{count}</span>
                    ) : null}
                  </button>
                );
              },
            )}
          </div>
          <div className="calendar-legend small">
            <span>
              <i className="legend-selected" />
              {t("selectedDay")}
            </span>
            <span>
              <i className="legend-review" />
              Konu, soru ve tekrar
            </span>
            <span>
              <i className="legend-closed" />
              {t("unavailable")}
            </span>
          </div>
          <div className="selected-date">
            <div>
              <h3>
                {formatDate(selected, state.settings.locale, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h3>
              <p className="small muted">
                {isBlocked(selected, state.settings)
                  ? t("unavailable")
                  : chosen.length || studyLoad.get(selected)
                    ? `${studyLoad.get(selected) ?? 0} yeni çalışma · ${chosen.length} tekrar`
                    : t("emptyDay")}
              </p>
            </div>
            <button className="secondary" onClick={() => toggle(selected)}>
              {t("toggleDay")}
            </button>
          </div>
          {chosen.map((p) => {
            const lesson = p.lessonId ? lessonById(p.lessonId) : undefined;
            return (
              <div className="planned-review" key={p.id}>
                <div>
                  <strong>
                    {p.title} ({repeatName(p.stage)})
                  </strong>
                  <p className="small muted">
                    {p.kind === "theory" ? "Konu anlatımı" : "Sorular"} ·{" "}
                    {p.stage}. gün · Özgün tarih:{" "}
                    {formatDate(p.targetDate, state.settings.locale)}
                    {p.completedDate ? " · Tekrar tamamlandı" : ""}
                  </p>
                </div>
                <button
                  className="text-button"
                  disabled={p.targetDate > today}
                  onClick={() => {
                    if (p.completedSessionId)
                      navigate(
                        `/result?id=${encodeURIComponent(p.completedSessionId)}`,
                      );
                    else if (p.kind === "theory")
                      navigate(theoryReviewRoute(p));
                    else if (lesson) start(lesson, p.id);
                  }}
                >
                  {p.completedSessionId ? "Sonucu gör" : "Tekrar"}
                </button>
              </div>
            );
          })}
          {study.map((p) => (
            <section className="calendar-study" key={p.mode}>
              <h3>
                {p.mode === "theory" ? "Konu çalışması" : "Soru çalışması"}
              </h3>
              {p.scheduled
                .filter((v) => v.day === selected)
                .map(({ topic }) => (
                  <button
                    key={topic.id}
                    className="ready-topic"
                    onClick={() =>
                      navigate(`/topic?id=${topic.id}&mode=${p.mode}`)
                    }
                  >
                    <span>
                      <small>{topic.order}. konu</small>
                      {topic.title}
                    </span>
                  </button>
                ))}
              {!p.scheduled.some((v) => v.day === selected) && (
                <p className="small muted">Bu gün için yeni konu atanmadı.</p>
              )}
            </section>
          ))}
        </section>
        <aside className="panel availability-panel">
          <h2>{t("availability")}</h2>
          <label className="field">
            {t("capacity")}
            <div className="range-row">
              <input
                type="range"
                min="10"
                max="600"
                step="10"
                value={state.settings.dailyMinutes}
                onChange={(e) => {
                  void setSetting("dailyMinutes", Number(e.target.value)).catch(
                    () => {},
                  );
                }}
              />
              <output>
                {state.settings.dailyMinutes} {t("minutes")}
              </output>
            </div>
          </label>
          <p className="small muted">
            Günlük süre tekrarların yerleşiminde kullanılır. Yeni konular,
            hedefe kalan uygun gün sayısına göre dağıtılır.
          </p>
          <h3>{t("weeklyClosed")}</h3>
          <div className="weekday-toggles">
            {weekdays.map((d, i) => {
              const value = (i + 1) % 7;
              const pressed = state.settings.blockedWeekdays.includes(value);
              return (
                <button
                  key={i}
                  className={pressed ? "active" : ""}
                  aria-pressed={pressed}
                  onClick={() => {
                    void setSetting(
                      "blockedWeekdays",
                      pressed
                        ? state.settings.blockedWeekdays.filter(
                            (v) => v !== value,
                          )
                        : [...state.settings.blockedWeekdays, value],
                    ).catch(() => {});
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>
          <div className="field">
            {t("singleClosed")}
            <div className="date-add">
              <DateInput
                label={t("singleClosed")}
                allowEmpty
                value={blockedDate}
                onChange={setBlockedDate}
              />
              <button
                className="icon-button"
                aria-label={t("add")}
                disabled={!blockedDate}
                onClick={() => {
                  if (
                    blockedDate &&
                    !state.settings.blockedDates.includes(blockedDate)
                  ) {
                    void setSetting("blockedDates", [
                      ...state.settings.blockedDates,
                      blockedDate,
                    ]).catch(() => {});
                  }
                  setBlockedDate("");
                }}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          <div className="closed-list">
            {state.settings.blockedDates.toSorted().map((day) => (
              <div key={day}>
                <span>
                  {formatDate(day, state.settings.locale, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <button
                  className="icon-button"
                  aria-label={`${t("remove")}: ${day}`}
                  onClick={() => toggle(day)}
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
          <p className="small muted">{t("loadEstimate")}</p>
        </aside>
      </div>
      <section className="panel upcoming-panel">
        <h2>{t("upcoming")}</h2>
        {!plan.length ? (
          <p className="muted">{t("noData")}</p>
        ) : (
          plan
            .filter((p) => !p.completedDate)
            .slice(0, 12)
            .map((p) => (
              <div className="upcoming-row" key={p.id}>
                <span>
                  {p.title} ({repeatName(p.stage)}) · {p.stage}. gün ·{" "}
                  {p.kind === "theory" ? "Konu" : "Sorular"}
                </span>
                <span className="small muted">
                  Özgün tarih: {formatDate(p.targetDate, state.settings.locale)}{" "}
                  →{" "}
                  {p.scheduled
                    ? formatDate(p.scheduled, state.settings.locale)
                    : t("noAvailability")}
                </span>
              </div>
            ))
        )}
      </section>
    </>
  );
}
