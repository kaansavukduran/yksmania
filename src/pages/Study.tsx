import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { useApp } from "../store";
import { lessonById, subjectById } from "../domain/content";
import {
  finishSession,
  formatDate,
  independentCorrect,
  localDate,
  reviewPlan,
} from "../domain/scheduler";
import type { Draft, Lesson, Session } from "../domain/model";
import { Aion } from "../components/Aion";
export function Study({ navigate }: { navigate: (s: string) => void }) {
  const { state, t, l, update, commit, toast } = useApp();
  const [busy, setBusy] = useState(false);
  const draft = state.draft;
  const lesson = draft ? lessonById(draft.lessonId) : undefined;
  if (!draft || !lesson)
    return (
      <section className="panel empty">
        <h1>{t("courses")}</h1>
        <p>{t("noData")}</p>
        <button className="primary" onClick={() => navigate("/courses")}>
          {t("courses")}
        </button>
      </section>
    );
  const subject = subjectById(lesson.subjectId)!;
  const question = lesson.questions[draft.index];
  const patch = (changes: Partial<Draft>) => {
    void update((s) => ({
      ...s,
      draft: s.draft ? { ...s.draft, ...changes } : null,
    })).catch(() => {});
  };
  const check = () => {
    if (draft.selected === null || draft.checked) return;
    const response = {
      questionId: question.id,
      selected: draft.selected,
      correct: draft.selected === question.answer,
      assisted: draft.hint,
      confidence: draft.confidence,
    };
    patch({ checked: true, responses: [...draft.responses, response] });
  };
  const next = async () => {
    if (!draft.checked || busy) return;
    if (draft.index < lesson.questions.length - 1) {
      patch({
        index: draft.index + 1,
        selected: null,
        checked: false,
        hint: false,
        confidence: "medium",
      });
      return;
    }
    setBusy(true);
    const session: Session = {
      id: `session:${draft.startedAt}:${lesson.id}`,
      lessonId: lesson.id,
      date: localDate(),
      finishedAt: new Date().toISOString(),
      responses: draft.responses,
      kind: draft.reviewId ? "review" : "learn",
      includesTheory: false,
      minutes: Math.min(
        1440,
        Math.max(0, Math.round((Date.now() - draft.startedAt) / 60000)),
      ),
      note: draft.note,
      reviewId: draft.reviewId,
    };
    try {
      await commit((s) => finishSession(s, session));
      if (state.settings.sound) {
        try {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 660;
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
          osc.start();
          osc.stop(ctx.currentTime + 0.2);
          osc.onended = () => {
            void ctx.close();
          };
        } catch {
          // Optional audio cannot turn a persisted learning event into a failure.
        }
      }
      navigate(`/result?id=${encodeURIComponent(session.id)}`);
    } catch {
      toast(t("saveError"));
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <button
        className="text-button back-link"
        onClick={() => navigate("/today")}
      >
        <ArrowLeft size={17} />
        {t("closeSession")}
      </button>
      <header className="study-heading">
        <span className="eyebrow">
          {subject.exam} · {l(subject.name)}
          {draft.reviewId ? ` · ${t("review")}` : ""}
        </span>
        <h1>{l(lesson.title)}</h1>
      </header>
      <div className="practice-wrap">
        <section className="panel question-panel">
          <div className="question-meta">
            <span>
              {t("question")} {draft.index + 1} / {lesson.questions.length}
            </span>
            <span className="small muted">{t("original")}</span>
          </div>
          <progress
            aria-label={t("progress")}
            value={draft.responses.length}
            max={lesson.questions.length}
          />
          <h2>{l(question.prompt)}</h2>
          <div
            className="answer-options"
            role="group"
            aria-label={t("question")}
          >
            {question.options.map((option, i) => (
              <button
                key={i}
                className={`answer ${draft.selected === i ? "chosen" : ""} ${draft.checked && i === question.answer ? "answer-correct" : ""} ${draft.checked && draft.selected === i && i !== question.answer ? "answer-wrong" : ""}`}
                disabled={draft.checked}
                aria-pressed={draft.selected === i}
                onClick={() => patch({ selected: i })}
              >
                <span className="answer-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{l(option)}</span>
                {draft.checked && i === question.answer && (
                  <CheckCircle2 size={19} />
                )}
              </button>
            ))}
          </div>
          {!draft.checked && (
            <fieldset className="confidence">
              <legend>{t("confidence")}</legend>
              <div className="segmented">
                {(["low", "medium", "high"] as const).map((v) => (
                  <button
                    key={v}
                    aria-pressed={draft.confidence === v}
                    className={draft.confidence === v ? "active" : ""}
                    onClick={() => patch({ confidence: v })}
                  >
                    {t(v)}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          {draft.hint && (
            <aside className="hint-box">
              <Lightbulb size={18} />
              <p>{l(question.hint)}</p>
              <span className="small">{t("assisted")}</span>
            </aside>
          )}
          {draft.checked && (
            <div
              className={
                draft.selected === question.answer
                  ? "feedback correct"
                  : "feedback repair"
              }
              role="status"
            >
              <strong>
                {t(
                  draft.selected === question.answer ? "correct" : "incorrect",
                )}
              </strong>
              <p>{l(question.explanation)}</p>
            </div>
          )}
          <div className="question-actions">
            {!draft.checked ? (
              <>
                <button
                  className="text-button"
                  disabled={draft.hint}
                  onClick={() => patch({ hint: true })}
                >
                  <Lightbulb size={18} />
                  {t("hint")}
                </button>
                <button
                  className="primary"
                  disabled={draft.selected === null}
                  onClick={check}
                >
                  {t("check")}
                  <ArrowRight size={18} />
                </button>
              </>
            ) : (
              <>
                <span className="small muted">
                  {draft.hint ? t("assisted") : t("selfCheck")}
                </span>
                <button
                  className="primary"
                  disabled={busy}
                  onClick={() => {
                    void next();
                  }}
                >
                  {busy
                    ? t("saving")
                    : t(
                        draft.index === lesson.questions.length - 1
                          ? "finish"
                          : "next",
                      )}
                  <ArrowRight size={18} />
                </button>
              </>
            )}
          </div>
        </section>
        <label className="field practice-note">
          {t("note")}
          <textarea
            value={draft.note}
            onChange={(e) => patch({ note: e.target.value })}
            placeholder={t("notePlaceholder")}
            maxLength={20000}
          />
        </label>
      </div>
    </>
  );
}
export function Result({
  id,
  navigate,
  start,
}: {
  id: string;
  navigate: (s: string) => void;
  start: (l: Lesson) => void;
}) {
  const { state, t, l } = useApp();
  const session = state.sessions.find((s) => s.id === id);
  if (!session) return <p>{t("noData")}</p>;
  const lesson = lessonById(session.lessonId)!;
  const plan = reviewPlan(state).filter(
    (p) => p.review.originSessionId === session.id,
  );
  return (
    <section className="result-page">
      <Aion celebrate size={192} />
      <span className="eyebrow">{t("saved")}</span>
      <h1>{t("sessionDone")}</h1>
      <p className="muted">{t("resultBody")}</p>
      <div className="result-stats">
        <div>
          <strong>
            {session.responses.filter((r) => r.correct).length}/
            {session.responses.length}
          </strong>
          <span>{t("correct")}</span>
        </div>
        <div>
          <strong>
            {independentCorrect(session)}/{session.responses.length}
          </strong>
          <span>{t("independent")}</span>
        </div>
        <div>
          <strong>{session.responses.filter((r) => r.assisted).length}</strong>
          <span>{t("assisted")}</span>
        </div>
      </div>
      {plan.length > 0 && (
        <div className="panel result-reviews">
          <h2>{t("reviewDates")}</h2>
          {plan.map((p) => (
            <div key={p.review.id}>
              <span>
                {t("day")} {p.review.stage}
              </span>
              <strong>
                {p.scheduled
                  ? formatDate(p.scheduled, state.settings.locale)
                  : t("noAvailability")}
              </strong>
              {p.scheduled !== p.review.targetDate && (
                <span className="small muted">
                  {t("originalDue")}:{" "}
                  {formatDate(p.review.targetDate, state.settings.locale)}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="result-actions">
        <button className="primary" onClick={() => navigate("/today")}>
          {t("goToday")}
          <ArrowRight size={18} />
        </button>
        <button className="secondary" onClick={() => start(lesson)}>
          {t("redo")}
        </button>
      </div>
      <p className="small muted">{t("noDoubleXp")}</p>
    </section>
  );
}
