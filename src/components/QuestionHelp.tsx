import { clarifiedQuestionView } from "../domain/questionPresentation";
import { Lightbulb } from "lucide-react";
import type { HelpQuestion } from "../domain/questionHelpModel";
import { helpPanels, resolvedGuidance } from "../learning/questionHelp";
import "./questionHelp.css";

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
              </section>
            ))}
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
