import { clarifiedQuestionView } from "../domain/questionPresentation";
import { Footprints, Lightbulb } from "lucide-react";
import type { HelpQuestion } from "../domain/questionHelpModel";
import { helpPanels, resolvedGuidance } from "../learning/questionHelp";
import "./questionHelp.css";
import { SourceQuestionFigure } from "../learning/SourceQuestionFigure";
import { sourceQuestionPresentation } from "../learning/sourceExercises024";
import { lazy, Suspense, useState } from "react";
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
}) {
  const question = clarifiedQuestionView(originalQuestion);
  const guidance = resolvedGuidance(question);
  const panels = helpPanels(question);
  const full = level > panels.length;
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
      {level > 0 && (
        <aside className="hint-box" aria-label="Çözüm rehberi">
          <div className="help-content">
            {panels.slice(0, level).map((panel, index) => (
              <section key={index} className={steps ? "help-step" : undefined}>
                {steps && (
                  <span className="help-step-chip">
                    Adım {index + 1} / {total}
                    {index === 0 ? " · terimler" : index === 1 ? " · veri ve yöntem" : ""}
                  </span>
                )}
                <h3>{panel.title}</h3>
                {panel.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
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
                {index === 0 && conceptFigure && (
                  <div className="help-concept-figure">
                    <Suspense fallback={null}>
                      <SectionFigure
                        guideId={conceptFigure.guideId}
                        title={conceptFigure.title}
                        label={`Konu anlatımından: ${conceptFigure.title}`}
                      />
                    </Suspense>
                  </div>
                )}
              </section>
            ))}
            {!full && sourcePresentation?.hintFigure && (
              <SourceQuestionFigure figure={sourcePresentation.hintFigure} />
            )}
            {full && (
              <section className="help-full-solution" aria-label="Tam çözüm">
                <h3>Tam çözüm</h3>
                <p>
                  <strong>
                    Doğru yanıt: {String.fromCharCode(65 + question.answer)}
                  </strong>{" "}
                  · {question.options[question.answer]}
                </p>
                <p>{question.explanation}</p>
                {sourcePresentation?.explanationFigure && (
                  <SourceQuestionFigure
                    figure={sourcePresentation.explanationFigure}
                  />
                )}
                {guidance && (
                  <>
                    {steps && route && (
                      <div className="help-route">
                        <h4>30 saniyelik rota</h4>
                        <p>{route}</p>
                        <h4>1 dakika kuralı</h4>
                        <p>
                          Bir dakikada ilk işlemi kuramıyorsan soruyu işaretle, sonrakine geç ve turun sonunda
                          dön. Kurduysan bitir; yarım bırakılan işlem süreyi iki kez harcatır.
                        </p>
                      </div>
                    )}
                    <h4>{steps ? "Çeldirici otopsisi: şıkların mantığı" : "Şıkların mantığı"}</h4>
                    <ol type="A">
                      {guidance.optionReasons.map((reason, i) => (
                        <li key={i}>{reason}</li>
                      ))}
                    </ol>
                    <h4>Sık hata</h4>
                    <p>{guidance.commonError}</p>
                    <h4>Sonucu kontrol et</h4>
                    <p>{guidance.check}</p>
                  </>
                )}
              </section>
            )}
            {steps && full && onHidden && (
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
      {!full && steps && (
        <div className="help-step-actions" role="group" aria-label="Adım adım çözüm">
          <button type="button" className="secondary" disabled={disabled} onClick={() => onLevel(level + 1)}>
            {level < panels.length ? "Sonraki adım" : "Son adım: tam çözüm"}
          </button>
          <button type="button" className="text-button" disabled={disabled} onClick={() => onLevel(total)}>
            Tüm adımları aç
          </button>
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
export function GuidedQuestionHelp(props: Omit<ComponentProps<typeof QuestionHelp>, "steps" | "onSteps" | "hidden" | "onHidden">) {
  const id = props.question.id;
  const [view, setView] = useState({ id, steps: false, hidden: false });
  const current = view.id === id ? view : { id, steps: false, hidden: false };
  return (
    <QuestionHelp
      {...props}
      steps={current.steps}
      onSteps={() => setView({ ...current, steps: true })}
      hidden={current.hidden}
      onHidden={(hidden) => setView({ ...current, hidden })}
    />
  );
}
