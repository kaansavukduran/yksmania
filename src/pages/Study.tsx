import { typeset } from "../domain/typeset";
import { playCue } from "../domain/soundEngine";
import { localizedQuestionView } from "../domain/questionPresentation";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useApp } from "../store";
import { lessonById, subjectById } from "../domain/content";
import {
  finishSession,
  formatDate,
  independentCorrect,
  localDate,
} from "../domain/scheduler";
import type { Draft, Lesson, Session } from "../domain/model";
import { draftQuestionCount } from "../domain/studyDraft";
import { learningReviewPlan } from "../domain/learningReviews";
import { Aion } from "../components/Aion";
import { PastExamQuestions } from "../components/PastExamQuestions";
import { lessonTopic } from "../domain/studyPlan";
import { StudyTimer } from "../components/StudyTimer";
import { GuidedQuestionHelp, type SimilarOffer } from "../components/QuestionHelp";
import { helpPanels, previousHelpPanelCount, resolvedGuidance } from "../learning/questionHelp";
import { effectiveHelpLevel } from "../learning/helpProgression";
import { SourceQuestionFigure } from "../learning/SourceQuestionFigure";
import { AnswerOptions } from "../components/AnswerOptions";
import { Scratchpad } from "../components/Scratchpad";
import { sourceQuestionPresentation } from "../learning/sourceExercises024";
import { practiceQuestionView } from "../learning/practiceQuestionView";
import { sourceVisualRevisions } from "../learning/sourceVisualRevisions";
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
  const questionCount = draftQuestionCount(draft, lesson.questions.length);
  const question = localizedQuestionView(lesson.questions[draft.index]);
  const helpQuestion = practiceQuestionView({
    id: question.id,
    prompt: l(question.prompt),
    passage: question.passage ? l(question.passage) : undefined,
    options: question.options.map(l),
    answer: question.answer,
    hint: l(question.hint),
    explanation: l(question.explanation),
    guidance: question.guidance,
  });
  const visualQuestion = { ...helpQuestion, guidance: resolvedGuidance(helpQuestion) };
  const sourcePresentation = sourceQuestionPresentation(visualQuestion);
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
      ...(sourcePresentation?.optionFigureRevision
        ? { optionFigureRevision: sourcePresentation.optionFigureRevision }
        : {}),
      ...sourceVisualRevisions(visualQuestion, sourcePresentation),
      ...(draft.hint
        ? { helpLevel: visibleHelpLevel, helpPanelCount: panels.length }
        : {}),
    };
    if (state.settings.sound) {
      const volume = state.settings.soundVolume;
      if (!response.correct) playCue({ kind: "wrong" }, volume);
      else if (
        !response.assisted &&
        state.sessions.some((s) =>
          s.responses.some((r) => r.questionId === question.id && !r.correct),
        )
      )
        playCue({ kind: "repair" }, volume);
      else {
        let combo = 1;
        if (!response.assisted)
          for (let i = draft.responses.length - 1; i >= 0; i--) {
            const r = draft.responses[i];
            if (!r.correct || r.assisted) break;
            combo++;
          }
        playCue({ kind: "correct", combo }, volume);
      }
    }
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
    if (draft.index < questionCount - 1) {
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
        const review = draft.reviewId
          ? state.reviews.find((r) => r.id === draft.reviewId)
          : undefined;
        const independent = session.responses.filter(
          (r) => r.correct && !r.assisted,
        ).length;
        const sealed =
          review?.stage === 21 &&
          session.responses.length > 0 &&
          independent / session.responses.length >= 0.8;
        playCue({ kind: sealed ? "seal" : "finish" }, state.settings.soundVolume);
      }
      navigate(`/result?id=${encodeURIComponent(session.id)}`);
    } catch {
      toast(t("saveError"));
    } finally {
      setBusy(false);
    }
  };
  // "Benzerini bağımsız dene": the next item of this set has not been seen in
  // this session (items are taken in order and each is answered once). It
  // opens through the regular next() step, so the session record, its order
  // and the Today counts stay exactly as before. This item keeps its own
  // (assisted) answer, which is why it must be answered first.
  const following =
    draft.index + 1 < questionCount ? lesson.questions[draft.index + 1] : undefined;
  const similar: SimilarOffer = !following
    ? {
        kind: "none",
        reason:
          "Bu ders setinde bu oturumda görülmemiş soru kalmadı; benzerini sonraki tekrarında yardımsız dene.",
      }
    : (() => {
        const label = `Soru ${draft.index + 2} / ${questionCount} (aynı ders seti${
          following.skill && following.skill === lesson.questions[draft.index].skill ? ", aynı alt beceri" : ""
        })`;
        return draft.checked
          ? { kind: "ready", label, onTry: () => void next() }
          : { kind: "answer-first", label };
      })();
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
              {t("question")} {draft.index + 1} / {questionCount}
            </span>
            <span className="small muted">
              {sourcePresentation?.source.shortLabel ?? t("original")}
            </span>
          </div>
          <progress
            aria-label={t("progress")}
            value={draft.responses.length}
            max={questionCount}
          />
          {question.passage && (
            <section className="question-passage" aria-label="Sorunun metni">
              <p>{typeset(l(question.passage))}</p>
            </section>
          )}
          <h2 className="question-prompt">{typeset(l(question.prompt))}</h2>
          {sourcePresentation?.figure && (
            <SourceQuestionFigure figure={sourcePresentation.figure} />
          )}
          <Scratchpad key={`scratch-${draft.index}`} questionKey={`${draft.lessonId}-${draft.index}`} />
          <AnswerOptions
              questionKey={`${draft.lessonId}-${draft.index}`}
            key={`options-${draft.index}`}
            options={question.options.map((option) => l(option))}
            optionFigures={sourcePresentation?.optionFigures}
            selected={draft.selected}
            checked={draft.checked}
            answer={question.answer}
            busy={busy}
            label={t("question")}
            onSelect={(i) => patch({ selected: i })}
            onEnter={() => {
              if (busy) return;
              if (!draft.checked) {
                if (draft.selected !== null) void check();
              } else void next();
            }}
            onHint={() => {
              if (visibleHelpLevel < panels.length + 1) void openHelp(visibleHelpLevel + 1);
            }}
          />
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
          <GuidedQuestionHelp
            question={helpQuestion}
            level={visibleHelpLevel}
            onLevel={(level) => void openHelp(level)}
            disabled={busy}
            reviewed={draft.checked}
            similar={similar}
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
              <p>{typeset(l(question.explanation))}</p>
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
                        draft.index === questionCount - 1
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
