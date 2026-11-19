import { clarifiedQuestionView } from "../domain/questionPresentation";
import { Lightbulb } from "lucide-react";
import type { HelpQuestion } from "../domain/questionHelpModel";
import { helpPanels, resolvedGuidance } from "../learning/questionHelp";
import "./questionHelp.css";
import { SourceQuestionFigure } from "../learning/SourceQuestionFigure";
import { sourceQuestionPresentation } from "../learning/sourceExercises024";
import { lazy, Suspense } from "react";
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
}: {
  question: HelpQuestion;
  level: number;
  onLevel: (level: number) => void;
  disabled?: boolean;
  reviewed?: boolean;
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
  return (
    <div className="question-help">
      {level > 0 && (
        <aside className="hint-box" aria-label="Çözüm rehberi">
          <div className="help-content">
            {panels.slice(0, level).map((panel, index) => (
              <section key={index}>
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
                    <h4>Şıkların mantığı</h4>
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
            {!reviewed && (
              <p className="small help-evidence">
                Yardım alındı · bu soru bağımsız doğru olarak sayılmaz.
              </p>
            )}
          </div>
        </aside>
      )}
      {!full && (
        <button
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
    </div>
  );
}
