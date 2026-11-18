import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useApp } from "../store";
import { lessonById } from "../domain/content";
import type { CheatSheet } from "./cheatsheetContent";
import { VisualLab } from "./VisualLab";

function Recall({ prompt, answer }: { prompt: string; answer: string }) {
  const [shown, setShown] = useState(false);
  return (
    <article className="cheat-recall-card">
      <h3>{prompt}</h3>
      <button
        className="secondary"
        aria-expanded={shown}
        onClick={() => setShown((v) => !v)}
      >
        {shown ? <EyeOff size={16} /> : <Eye size={16} />}
        {shown ? "Yanıtı gizle" : "Yanıtı göster"}
      </button>
      {shown && <p className="cheat-recall-answer">{answer}</p>}
    </article>
  );
}
export function CheatReader({
  sheet,
  navigate,
}: {
  sheet: CheatSheet;
  navigate: (route: string) => void;
}) {
  const { state, update, toast, t } = useApp();
  const noteKey = `cheatsheet:${sheet.topicId}`;
  const lesson = sheet.lessonId ? lessonById(sheet.lessonId) : undefined;
  return (
    <section
      className="panel cheat-reader"
      aria-label={`${sheet.title} kopya kağıdı`}
    >
      <p className="cheat-intro">
        Önce ana ilişkileri hatırla, sonra örneği kendin çöz. Açıklamayı açıp
        kendi gerekçenle karşılaştır.
      </p>
      {sheet.lessonId && (
        <div className="cheat-visual" data-cheat-model={sheet.lessonId}>
          <VisualLab id={sheet.lessonId} />
        </div>
      )}
      <div className="cheat-sections">
        {sheet.sections.map((section, i) => (
          <section className="cheat-section" key={`${section.title}-${i}`}>
            <h2>{section.title}</h2>
            {section.text.map((text, j) => (
              <p key={j}>{text}</p>
            ))}
            {section.table && (
              <div
                className="cheat-comparisons"
                role="group"
                aria-label={`${section.title} karşılaştırması`}
              >
                {section.table.rows.map((row, j) => (
                  <dl key={j}>
                    {row.map((cell, k) => (
                      <div key={k}>
                        <dt>{section.table!.headers[k]}</dt>
                        <dd>{cell}</dd>
                      </div>
                    ))}
                  </dl>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
      {!!sheet.cautions.length && (
        <section className="cheat-cautions" aria-label="Dikkat et">
          <h2>Dikkat et</h2>
          <ul>
            {sheet.cautions.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        </section>
      )}
      {!!sheet.examples.length && (
        <section
          className="cheat-examples"
          aria-label="Kuralı bir örnekte dene"
        >
          <h2>Kuralı bir örnekte dene</h2>
          {sheet.examples.map((example, i) => (
            <details className="worked-example" key={i}>
              <summary>{example.title}</summary>
              {example.passage && (
                <blockquote className="question-passage">
                  {example.passage}
                </blockquote>
              )}
              <p className="example-prompt">{example.prompt}</p>
              <details className="cheat-solution">
                <summary>Çözümü adım adım gör</summary>
                <ol>
                  {example.steps.map((step, j) => (
                    <li key={j}>{step}</li>
                  ))}
                </ol>
                <p>
                  <strong>Sonuç ve kontrol:</strong> {example.answer}
                </p>
              </details>
            </details>
          ))}
        </section>
      )}
      {!!sheet.recall.length && (
        <section className="cheat-recall" aria-label="Bakmadan hatırla">
          <h2>Bakmadan hatırla</h2>
          <p className="muted small">
            Cevabı açmadan önce kendi cümlenle söyle.
          </p>
          {sheet.recall.map((item, i) => (
            <Recall key={`${sheet.topicId}-${i}`} {...item} />
          ))}
        </section>
      )}
      {lesson && (
        <div className="cheat-actions">
          <button
            className="secondary"
            onClick={() =>
              navigate(`/lesson?id=${encodeURIComponent(lesson.id)}`)
            }
          >
            Konu anlatımını aç <ArrowRight size={17} />
          </button>
          {!!lesson.questions.length && (
            <button
              className="primary"
              onClick={() =>
                navigate(
                  `/topic?id=${encodeURIComponent(sheet.topicId)}&mode=questions`,
                )
              }
            >
              Sorulara geç <ArrowRight size={17} />
            </button>
          )}
        </div>
      )}
      <details className="cheat-source">
        <summary>Kaynak dayanağı</summary>
        <p className="small muted">{sheet.source}</p>
      </details>
      <label className="field cheat-note">
        Notun
        <textarea
          maxLength={20000}
          value={state.notes[noteKey] ?? ""}
          placeholder="Hatırlamak istediğin bir ilişkiyi kendi cümlenle yaz…"
          onChange={(e) => {
            const value = e.target.value;
            void update((s) => ({
              ...s,
              notes: { ...s.notes, [noteKey]: value },
            })).catch(() => toast(t("saveError")));
          }}
        />
      </label>
    </section>
  );
}
