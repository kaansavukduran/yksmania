import { useId } from "react";
import { SourceQuestionFigure } from "./SourceQuestionFigure";
import { originalExercisesForLesson } from "./sourceExercises024";
import { useExploration } from "./useExploration";
import "./originalExerciseReader.css";

/** Source reading and revealing are saved exploration, never scored evidence. */
export function OriginalExerciseReader({
  lessonId,
  onPractice,
}: {
  lessonId: string;
  onPractice?: (lessonId: string) => void;
}) {
  const exercises = originalExercisesForLesson(lessonId);
  const [saved, set] = useExploration(`source-exercises-024:${lessonId}`, {
    index: 0,
    revealed: false,
  });
  const uid = useId();
  if (!exercises.length) return null;
  const index =
    Number.isSafeInteger(saved.index) &&
    saved.index >= 0 &&
    saved.index < exercises.length
      ? saved.index
      : 0;
  const question = exercises[index];
  const select = (next: number) => set({ index: next, revealed: false });
  return (
    <section
      className="original-exercise-reader"
      aria-label="Kaynak alıştırmaları"
      data-lesson-id={lessonId}
    >
      <header>
        <h2>Kaynak alıştırmaları</h2>
        <p>
          Kaynaktaki soruların asıl metni ve verilenleri. Önce kendin düşün;
          sonra adım adım çözümü aç. Buradaki okuma ve çözüm gösterimi puan
          oluşturmaz.
        </p>
      </header>
      <fieldset className="original-exercise-picker">
        <legend>Alıştırma seç · {exercises.length} kaynak sorusu</legend>
        <div>
          {exercises.map((exercise, i) => (
            <button
              type="button"
              key={exercise.id}
              className="secondary"
              aria-pressed={index === i}
              aria-label={`${i + 1}. kaynak alıştırması · ${exercise.source.shortLabel}`}
              onClick={() => select(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </fieldset>
      <article
        aria-labelledby={`${uid}-prompt`}
        data-source-exercise-id={question.id}
      >
        <p className="small muted">
          {question.source.shortLabel} · {question.source.pageLabel} ·{" "}
          {question.source.itemLabel}
        </p>
        <h3 id={`${uid}-prompt`}>{question.prompt}</h3>
        {question.sourceContext && (
          <section
            className="original-source-context"
            aria-label="Kaynak bağlamı"
          >
            <h4>Kaynak bağlamı</h4>
            <p>{question.sourceContext}</p>
          </section>
        )}
        {question.figure && <SourceQuestionFigure figure={question.figure} />}
        {!!question.options.length && (
          <ol className="original-source-options" type="A">
            {question.options.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ol>
        )}
        {question.clarification && (
          <p className="original-source-clarification">
            <strong>Uygulama açıklaması: </strong>
            {question.clarification}
          </p>
        )}
        {question.erratum && (
          <p className="original-source-clarification" role="note">
            <strong>Kaynakta koşul uyarısı: </strong>
            {question.erratum}
          </p>
        )}
        <button
          type="button"
          className="secondary"
          aria-expanded={saved.revealed}
          aria-controls={`${uid}-solution`}
          onClick={() => set({ revealed: !saved.revealed })}
        >
          {saved.revealed ? "Çözümü kapat" : "Adım adım çözümü gör"}
        </button>
        <div
          id={`${uid}-solution`}
          hidden={!saved.revealed}
          className="original-source-solution"
        >
          <h4>Sonuç: {question.answer}</h4>
          <ol>
            {question.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          {question.explanationFigure && (
            <SourceQuestionFigure figure={question.explanationFigure} />
          )}
          <p className="small muted">
            Açıklama ve çözüm uygulama için hazırlanmıştır. Çözümü açmak
            bağımsız doğru cevap veya ustalık kaydetmez.
          </p>
        </div>
        {question.source.publicUrl && (
          <p>
            <a
              href={question.source.publicUrl}
              target="_blank"
              rel="noreferrer"
            >
              MEB OGM kaynağını incele
            </a>
          </p>
        )}
        {question.scoredLessonId && onPractice && (
          <button
            type="button"
            className="primary"
            onClick={() => onPractice(question.scoredLessonId!)}
          >
            Bu 6 kaynak sorusunu çöz
          </button>
        )}
      </article>
      <nav
        className="original-exercise-navigation"
        aria-label="Kaynak alıştırmaları arasında ilerle"
      >
        <button
          type="button"
          className="secondary"
          disabled={index === 0}
          onClick={() => select(index - 1)}
        >
          Önceki alıştırma
        </button>
        <span>
          {index + 1} / {exercises.length}
        </span>
        <button
          type="button"
          className="secondary"
          disabled={index === exercises.length - 1}
          onClick={() => select(index + 1)}
        >
          Sonraki alıştırma
        </button>
      </nav>
    </section>
  );
}
