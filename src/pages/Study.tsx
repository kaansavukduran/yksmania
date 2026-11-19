import { localizedQuestionView } from "../domain/questionPresentation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useApp } from "../store";
import { lessonById, subjectById } from "../domain/content";
import {
  finishSession,
  formatDate,
  independentCorrect,
  localDate,
} from "../domain/scheduler";
import type { Draft, Lesson, Session } from "../domain/model";
import { learningReviewPlan } from "../domain/learningReviews";
import { Aion } from "../components/Aion";
import { PastExamQuestions } from "../components/PastExamQuestions";
import { lessonTopic } from "../domain/studyPlan";
import { StudyTimer } from "../components/StudyTimer";
import { QuestionHelp } from "../components/QuestionHelp";
import { helpPanels, previousHelpPanelCount } from "../learning/questionHelp";
import { effectiveHelpLevel } from "../learning/helpProgression";
import { SourceQuestionFigure } from "../learning/SourceQuestionFigure";
import { sourceQuestionPresentation } from "../learning/sourceExercises024";
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
  const question = localizedQuestionView(lesson.questions[draft.index]);
  const helpQuestion = {
    id: question.id,
    prompt: l(question.prompt),
    passage: question.passage ? l(question.passage) : undefined,
    options: question.options.map(l),
    answer: question.answer,
    hint: l(question.hint),
    explanation: l(question.explanation),
    guidance: question.guidance,
  };
  const sourcePresentation = sourceQuestionPresentation(helpQuestion);
  const panels = helpPanels(helpQuestion),
    previousCount = previousHelpPanelCount(helpQuestion),
    visibleHelpLevel = effectiveHelpLevel(
      panels,
      draft.helpLevel ?? (draft.hint ? 1 : 0),
      draft.helpPanelCount,
      previousCount,
      helpQuestion.hint,
    );
  const patch = (changes: Partial<Draft>) => {
    void update((s) => {
      if (!s.draft) return { ...s, draft: null };
      const next = { ...s.draft, ...changes };
      if (
        Object.hasOwn(changes, "helpPanelCount") &&
        changes.helpPanelCount === undefined
      )
        delete next.helpPanelCount;
      return { ...s, draft: next };
    }).catch(() => {});
  };
  const check = () => {
    if (draft.selected === null || draft.checked || busy) return;
    const response = {
      questionId: question.id,
      selected: draft.selected,
      correct: draft.selected === question.answer,
      assisted: draft.hint,
      confidence: draft.confidence,
      ...(draft.hint
        ? { helpLevel: visibleHelpLevel, helpPanelCount: panels.length }
        : {}),
    };
    patch({
      checked: true,
      responses: [...draft.responses, response],
      ...(draft.hint
        ? { helpLevel: visibleHelpLevel, helpPanelCount: panels.length }
        : {}),
    });
  };
  const next = async () => {
    if (!draft.checked || busy) return;
    if (draft.index < lesson.questions.length - 1) {
      patch({
        index: draft.index + 1,
        selected: null,
        checked: false,
        hint: false,
        helpLevel: 0,
        helpPanelCount: undefined,
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
  async function openHelp(level: number) {
    if (busy || !draft || !lesson) return;
    setBusy(true);
    try {
      await commit((s) => {
        const current = s.draft;
        if (
          !current ||
          current.lessonId !== lesson.id ||
          current.index !== draft.index
        )
          throw Error("QUESTION_CHANGED");
        if (!Number.isInteger(level) || level < 1 || level > panels.length + 1)
          throw Error("QUESTION_HELP_LEVEL");
        return {
          ...s,
          draft: {
            ...current,
            helpLevel: Math.max(
              effectiveHelpLevel(
                panels,
                current.helpLevel ?? (current.hint ? 1 : 0),
                current.helpPanelCount,
                previousCount,
                helpQuestion.hint,
              ),
              level,
            ),
            helpPanelCount: panels.length,
            hint: current.hint || !current.checked,
          },
        };
      });
    } catch {
      toast("İpucu açılamadı. Kaydın korundu; yeniden dene.");
    } finally {
      setBusy(false);
    }
  }
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
        <div className="study-title">
          <span className="eyebrow">
            {subject.exam} · {l(subject.name)}
            {draft.reviewId ? ` · ${t("review")}` : ""}
          </span>
          <h1>{l(lesson.title)}</h1>
        </div>
        <StudyTimer />
      </header>
      <div className="practice-wrap">
        <section className="panel question-panel">
          <div className="question-meta">
            <span>
              {t("question")} {draft.index + 1} / {lesson.questions.length}
            </span>
            <span className="small muted">
              {sourcePresentation?.source.shortLabel ?? t("original")}
            </span>
          </div>
          <progress
            aria-label={t("progress")}
            value={draft.responses.length}
            max={lesson.questions.length}
          />
          {question.passage && (
            <section className="question-passage" aria-label="Sorunun metni">
              <p>{l(question.passage)}</p>
            </section>
          )}
          <h2 className="question-prompt">{l(question.prompt)}</h2>
          {sourcePresentation?.figure && (
            <SourceQuestionFigure figure={sourcePresentation.figure} />
          )}
          <div
            className="answer-options"
            role="group"
            aria-label={t("question")}
          >
            {question.options.map((option, i) => (
              <button
                key={i}
                className={`answer ${draft.selected === i ? "chosen" : ""} ${draft.checked && i === question.answer ? "answer-correct" : ""} ${draft.checked && draft.selected === i && i !== question.answer ? "answer-wrong" : ""}`}
                disabled={draft.checked || busy}
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
          <QuestionHelp
            question={helpQuestion}
            level={visibleHelpLevel}
            onLevel={(level) => void openHelp(level)}
            disabled={busy}
            reviewed={draft.checked}
          />
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
                  className="primary"
                  disabled={draft.selected === null || busy}
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
  const related = new Set(
    state.reviews
      .filter((r) => r.originSessionId === session.id)
      .map((r) => r.id),
  );
  const plan = learningReviewPlan(state).filter(
    (p) => related.has(p.id) && !p.completedDate,
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
      <PastExamQuestions
        topicId={lessonTopic[lesson.id]}
        subjectId={lesson.subjectId}
      />
      {plan.length > 0 && (
        <div className="panel result-reviews">
          <h2>{t("reviewDates")}</h2>
          {plan.map((p) => (
            <div key={p.id}>
              <span>
                {t("day")} {p.stage}
              </span>
              <strong>
                {p.scheduled
                  ? formatDate(p.scheduled, state.settings.locale)
                  : t("noAvailability")}
              </strong>
              {p.scheduled !== p.targetDate && (
                <span className="small muted">
                  {t("originalDue")}:{" "}
                  {formatDate(p.targetDate, state.settings.locale)}
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
