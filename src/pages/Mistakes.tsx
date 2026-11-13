import { useState } from "react";
import { RotateCcw, ArrowUpRight } from "lucide-react";
import { useApp } from "../store";
import { lessons, lessonById } from "../domain/content";
import { formatDate, undoSession } from "../domain/scheduler";
import { Empty } from "../components/Shared";
import type { Lesson } from "../domain/model";
export function Mistakes({
  start,
  navigate,
}: {
  start: (l: Lesson) => void;
  navigate: (s: string) => void;
}) {
  const { state, t, l, update, commit, toast } = useApp();
  const [tab, setTab] = useState("mistakes");
  const items = state.sessions
    .flatMap((s) =>
      s.responses
        .filter((r) => !r.correct || r.assisted)
        .map((r) => ({
          session: s,
          response: r,
          lesson: lessonById(s.lessonId),
          question: lessons
            .flatMap((x) => x.questions)
            .find((q) => q.id === r.questionId),
        })),
    )
    .reverse();
  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">{t("mistakesTitle")}</p>
          <h1>{t("mistakes")}</h1>
        </div>
      </header>
      <p className="lead muted">{t("mistakesBody")}</p>
      <div className="segmented section-tabs">
        <button
          aria-pressed={tab === "mistakes"}
          className={tab === "mistakes" ? "active" : ""}
          onClick={() => setTab("mistakes")}
        >
          {t("mistakes")} ({items.length})
        </button>
        <button
          aria-pressed={tab === "history"}
          className={tab === "history" ? "active" : ""}
          onClick={() => setTab("history")}
        >
          {t("history")}
        </button>
      </div>
      {tab === "mistakes" ? (
        items.length ? (
          <div className="mistake-list">
            {items.map(({ session, response, lesson, question }, i) =>
              question && lesson ? (
                <article
                  className="panel mistake-card"
                  key={`${session.id}:${response.questionId}:${i}`}
                >
                  <div className="section-heading">
                    <span className="small muted">
                      {l(lesson.title)} ·{" "}
                      {formatDate(session.date, state.settings.locale)}
                    </span>
                    <span
                      className={
                        response.assisted ? "quiet-chip" : "error-chip"
                      }
                    >
                      {t(response.assisted ? "assisted" : "incorrect")}
                    </span>
                  </div>
                  <h2>{l(question.prompt)}</h2>
                  <p>
                    <span className="muted">{t("yourAnswer")}: </span>
                    {l(question.options[response.selected])}
                  </p>
                  <details>
                    <summary>{t("explanation")}</summary>
                    <p>
                      <strong>
                        {t("rightAnswer")}:{" "}
                        {l(question.options[question.answer])}
                      </strong>
                    </p>
                    <p>{l(question.explanation)}</p>
                  </details>
                  <button className="text-button" onClick={() => start(lesson)}>
                    {t("repair")}
                    <ArrowUpRight size={17} />
                  </button>
                </article>
              ) : null,
            )}
          </div>
        ) : (
          <Empty text={t("noMistakes")} />
        )
      ) : (
        <section className="panel history-list">
          {!state.sessions.length ? (
            <Empty text={t("noData")} />
          ) : (
            state.sessions.toReversed().map((s) => (
              <article className="history-row" key={s.id}>
                <button
                  className="text-button"
                  onClick={() =>
                    navigate(`/result?id=${encodeURIComponent(s.id)}`)
                  }
                >
                  {l(
                    lessonById(s.lessonId)?.title ?? {
                      tr: s.lessonId,
                      en: s.lessonId,
                    },
                  )}
                  <ArrowUpRight size={15} />
                </button>
                <span className="small muted">
                  {formatDate(s.date, state.settings.locale)} ·{" "}
                  {s.responses.filter((r) => r.correct).length}/
                  {s.responses.length}
                </span>
                <button
                  className="icon-button"
                  aria-label={t("undo")}
                  title={t("undo")}
                  onClick={() => {
                    if (confirm(t("undoExplain"))) {
                      void commit((state) => undoSession(state, s.id))
                        .then(() => toast(t("undoDone")))
                        .catch(() => {});
                    }
                  }}
                >
                  <RotateCcw size={17} />
                </button>
              </article>
            ))
          )}
        </section>
      )}
    </>
  );
}
