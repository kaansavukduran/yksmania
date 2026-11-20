import { typeset } from "../domain/typeset";
import { clarifiedQuestionView } from "../domain/questionPresentation";
import { Footprints, Lightbulb } from "lucide-react";
import type { HelpQuestion } from "../domain/questionHelpModel";
import { helpPanels, resolvedGuidance } from "../learning/questionHelp";
import "./questionHelp.css";
import { SourceQuestionFigure } from "../learning/SourceQuestionFigure";
import { sourceQuestionPresentation } from "../learning/sourceExercises024";
import { lazy, Suspense, useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { hintFigureFor } from "../learning/sectionFigures/hintFigure";
import { tacticsFor } from "../learning/questionTactics";
const SectionFigure = lazy(() =>
  import("../learning/sectionFigures/registry").then((m) => ({ default: m.SectionFigure })),
);

export function QuestionHelp({
  question: originalQuestion,
  level,
  onLevel,
  disabled = false,
  reviewed = false,
  steps = false,
  onSteps,
  hidden = false,
  onHidden,
  shown,
  onShown,
  playing = false,
  onPlay,
  polish = false,
}: {
  question: HelpQuestion;
  level: number;
  onLevel: (level: number) => void;
  disabled?: boolean;
  reviewed?: boolean;
  /** Step-by-step mode; only offered when the caller can hold that state. */
  steps?: boolean;
  onSteps?: () => void;
  /** The learner closed the full solution to try a similar item alone. */
  hidden?: boolean;
  onHidden?: (hidden: boolean) => void;
  /** Steps on screen in step mode; going back only hides, help stays recorded. */
  shown?: number;
  onShown?: (shown: number) => void;
  /** Replays the opened steps one by one (view only). */
  playing?: boolean;
  onPlay?: (playing: boolean) => void;
  /** Show display repairs and typesetting (the app does; raw checks do not). */
  polish?: boolean;
}) {
  const show = (text: string) => (polish ? typeset(text) : text);
  const question = clarifiedQuestionView(originalQuestion);
  const guidance = resolvedGuidance(question);
  const panels = helpPanels(question);
  const full = level > panels.length;
  // In step mode the learner may step back: fewer steps are shown, but the
  // recorded help level never decreases.
  const view = steps ? Math.max(1, Math.min(level, shown ?? level)) : level;
  const fullView = view > panels.length;
  const sourcePresentation = sourceQuestionPresentation(question);
  // The matching theory figure is shown with the first ("Bilmen gerekenler")
  // panel; it is omitted when the question already carries its own figure.
  const conceptFigure = sourcePresentation?.hintFigure ? undefined : hintFigureFor(question);
  const tactics = tacticsFor(question);
  // “Adım adım çözüm” walks the same panels one step at a time. Every opened
  // step is help: the parent records the level and the answer is no longer
  // independent. Closing the solution only hides it; nothing is undone.
  const canStep = panels.length >= 2 && !!onSteps;
  const total = panels.length + 1;
  const route = guidance ? thirtySecondRoute(guidance.strategy, guidance.check) : undefined;
  if (hidden)
    return (
      <div className="question-help">
        <p className="small help-closed" role="status">
          Çözüm kapatıldı. Bu soru yardımlı kaydedildi; benzer bir soruyu yardımsız dene.
        </p>
        <button type="button" className="text-button" onClick={() => onHidden?.(false)}>
          Çözümü yeniden göster
        </button>
      </div>
    );
  return (
    <div className={`question-help${steps ? " is-stepping" : ""}`}>
      {steps && level > 0 && (
        <ol className="help-rail" aria-label="Çözüm adımları">
          {Array.from({ length: total }, (_, i) => {
            const n = i + 1;
            const opened = n <= level;
            return (
              <li key={n}>
                <button
                  type="button"
                  className={`help-rail-dot${n === view ? " is-current" : ""}${opened ? " is-open" : ""}`}
                  disabled={!opened || disabled}
                  aria-current={n === view ? "step" : undefined}
                  aria-label={`${n === total ? "Final" : `Adım ${n}`}${opened ? "" : " (henüz açılmadı)"}`}
                  onClick={() => onShown?.(n)}
                >
                  {n === total ? "F" : n}
                </button>
              </li>
            );
          })}
        </ol>
      )}
      {level > 0 && (
        <aside className="hint-box" aria-label="Çözüm rehberi">
          <div className="help-content">
            {panels.slice(0, view).map((panel, index) => (
              <section key={index} className={steps ? `help-step${index + 1 === view ? " is-current" : ""}` : undefined}>
                {steps && (
                  <span className="help-step-chip">
                    Adım {index + 1} / {total}
                    {index === 0 ? " · soru ne istiyor, temel kavramlar" : index === 1 ? " · verilenler ve yöntem seçimi" : " · işlem"}
                  </span>
                )}
                <h3>{panel.title}</h3>
                {panel.paragraphs.map((paragraph, i) => (
                  <p key={i}>{show(paragraph)}</p>
                ))}
                {index === 0 &&
                  tactics.map((tactic) => (
                    <div className="help-tactic" key={tactic.id}>
                      <h4>Bu soru tipine yaklaşım: {tactic.title}</h4>
                      <ol>
                        {tactic.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                {/* Hint mode shows the topic figure with the first panel; step
                    mode shows it at step 2, where the method is chosen. */}
                {index === (steps && panels.length > 1 ? 1 : 0) && conceptFigure && (
                  <div className="help-concept-figure">
                    <Suspense fallback={null}>
                      <SectionFigure
                        guideId={conceptFigure.guideId}
                        title={conceptFigure.title}
                        label={`${steps ? "Görsel kurulum" : "Konu anlatımından"}: ${conceptFigure.title}`}
                      />
                    </Suspense>
                  </div>
                )}
              </section>
            ))}
            {!fullView && sourcePresentation?.hintFigure && (
              <SourceQuestionFigure figure={sourcePresentation.hintFigure} />
            )}
            {fullView && (
              <section className={`help-full-solution${steps ? " help-step is-current" : ""}`} aria-label="Tam çözüm">
                {steps && <span className="help-step-chip">Final · çeldirici otopsisi ve konu özeti</span>}
                <h3>Tam çözüm</h3>
                <p>
                  <strong>
                    Doğru yanıt: {String.fromCharCode(65 + question.answer)}
                  </strong>{" "}
                  · {show(question.options[question.answer])}
                </p>
                <p>{show(question.explanation)}</p>
                {sourcePresentation?.explanationFigure && (
                  <SourceQuestionFigure
                    figure={sourcePresentation.explanationFigure}
                  />
                )}
                {guidance && !steps && (
                  <>
                    <h4>Şıkların mantığı</h4>
                    <ol type="A">
                      {guidance.optionReasons.map((reason, i) => (
                        <li key={i}>{show(reason)}</li>
                      ))}
                    </ol>
                    <h4>Sık hata</h4>
                    <p>{show(guidance.commonError)}</p>
                    <h4>Sonucu kontrol et</h4>
                    <p>{show(guidance.check)}</p>
                  </>
                )}
                {guidance && steps && (
                  <>
                    <h4>Çeldirici otopsisi: her şık neden doğru ya da yanlış?</h4>
                    <ol className="help-autopsy">
                      {guidance.optionReasons.map((reason, i) => (
                        <li key={i} className={i === question.answer ? "is-key" : undefined}>
                          <span className="help-autopsy-letter" aria-hidden="true">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="help-autopsy-body">
                            <span className="help-autopsy-option">{show(question.options[i])}</span>
                            <span>{show(reason)}</span>
                          </span>
                        </li>
                      ))}
                    </ol>
                    <div className="help-route">
                      <h4>Bu sorudan cebine kalan 1 dakikalık konu kuralı</h4>
                      <ul>
                        {guidance.knowledge.map((rule, i) => (
                          <li key={i}>{show(rule)}</li>
                        ))}
                      </ul>
                      {route && (
                        <>
                          <h4>30 saniyelik sınav kısayolu</h4>
                          <p>{show(route)}</p>
                        </>
                      )}
                    </div>
                    <h4>Sık hata</h4>
                    <p>{show(guidance.commonError)}</p>
                    <h4>Sonucu kontrol et</h4>
                    <p>{show(guidance.check)}</p>
                  </>
                )}
              </section>
            )}
            {steps && fullView && onHidden && (
              <button type="button" className="secondary help-close" onClick={() => onHidden?.(true)}>
                Çözümü kapat, benzerini bağımsız dene
              </button>
            )}
            {!reviewed && (
              <p className="small help-evidence">
                Yardım alındı · bu soru bağımsız doğru olarak sayılmaz.
              </p>
            )}
          </div>
        </aside>
      )}
      {steps && level > 0 && (
        <div className="help-step-actions" role="group" aria-label="Adım adım çözüm">
          <button type="button" className="secondary" disabled={disabled || view <= 1} onClick={() => onShown?.(view - 1)}>
            Önceki adım
          </button>
          {!fullView && (
            <button
              type="button"
              className="secondary"
              disabled={disabled}
              onClick={() => {
                if (view < level) onShown?.(view + 1);
                else {
                  onLevel(level + 1);
                  onShown?.(level + 1);
                }
              }}
            >
              {view < panels.length ? "Sonraki adım" : "Son adım: tam çözüm"}
            </button>
          )}
          {!fullView && (
            <button
              type="button"
              className="text-button"
              disabled={disabled}
              onClick={() => {
                if (!full) onLevel(total);
                onShown?.(total);
              }}
            >
              Tüm adımları aç
            </button>
          )}
          {full && onPlay && (
            <button type="button" className="text-button" disabled={disabled} aria-pressed={playing} onClick={() => onPlay(!playing)}>
              {playing ? "Duraklat" : "Baştan oynat"}
            </button>
          )}
        </div>
      )}
      {!full && !steps && (
        <button
          type="button"
          className="text-button help-next"
          disabled={disabled}
          onClick={() => onLevel(level + 1)}
        >
          <Lightbulb size={18} aria-hidden="true" />
          {level === 0 && panels.length
            ? "İpucu al"
            : level < panels.length
              ? panels[level].title + " aç"
              : "Tam çözümü aç"}
        </button>
      )}
      {!full && !steps && canStep && (
        <button
          type="button"
          className="text-button help-steps-start"
          disabled={disabled}
          onClick={() => {
            onSteps?.();
            if (level === 0) onLevel(1);
          }}
        >
          <Footprints size={18} aria-hidden="true" />
          Adım adım çözüm
        </button>
      )}
    </div>
  );
}

/** A short route from the guide's own strategy and check sentences. */
function thirtySecondRoute(strategy: string, check: string) {
  const first = (text: string) => text.split(/(?<=[.!?])\s/)[0]?.trim() ?? text;
  return `${first(strategy)} Son kontrol: ${first(check)}`;
}

/**
 * QuestionHelp with its step-by-step state. Step mode and the closed solution
 * are view state only and reset when another question appears.
 */
export function GuidedQuestionHelp(props: Omit<ComponentProps<typeof QuestionHelp>, "steps" | "onSteps" | "hidden" | "onHidden" | "shown" | "onShown" | "playing" | "onPlay" | "polish">) {
  const id = props.question.id;
  const fresh = { id, steps: false, hidden: false, shown: undefined as number | undefined, playing: false };
  const [state, setState] = useState(fresh);
  const current = state.id === id ? state : fresh;
  const total = helpPanels(clarifiedQuestionView(props.question)).length + 1;
  // Replay: reveal the already opened steps one by one. View state only.
  useEffect(() => {
    if (!current.playing) return;
    const timer = setInterval(
      () =>
        setState((s) =>
          s.id !== id || !s.playing ? s : (s.shown ?? 1) >= total ? { ...s, playing: false } : { ...s, shown: (s.shown ?? 1) + 1 },
        ),
      2600,
    );
    return () => clearInterval(timer);
  }, [current.playing, id, total]);
  return (
    <QuestionHelp
      {...props}
      polish
      steps={current.steps}
      onSteps={() => setState({ ...current, steps: true, shown: 1 })}
      hidden={current.hidden}
      onHidden={(hidden) => setState({ ...current, hidden })}
      shown={current.shown}
      onShown={(shown) => setState({ ...current, shown, playing: false })}
      playing={current.playing}
      onPlay={(playing) => setState({ ...current, playing, shown: playing ? 1 : current.shown })}
    />
  );
}
