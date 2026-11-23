import { lazy, Suspense, useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useApp } from "../store";
import { lessonById } from "../domain/content";
import type { CheatSheet } from "./cheatsheetContent";
import { VisualLab } from "./VisualLab";
import { typeset } from "../domain/typeset";
import { SourceQuestionFigure } from "./SourceQuestionFigure";
import { GuideTable } from "./GuideTable";

const SectionFigure = lazy(() =>
  import("./sectionFigures/registry").then((module) => ({ default: module.SectionFigure })),
);

/*
 * "Kendini sına": the right-hand side of each formula (text after "=" up to
 * ";" or the end of the sentence) is hidden behind a button. The learner says
 * it first, then reveals it. Nothing is saved or scored.
 */
const formulaPart = /(=\s*)([^=;]+?)(?=;|\.(?:\s|$)|$)/g;
function ClozeText({ text, testing }: { text: string; testing: boolean }) {
  const [open, setOpen] = useState<number[]>([]);
  if (!testing || !text.includes("=")) return <>{text}</>;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let n = 0;
  for (const m of text.matchAll(formulaPart)) {
    const start = m.index! + m[1].length;
    const hidden = m[2].trim();
    if (!hidden) continue;
    parts.push(text.slice(last, start));
    const id = n++;
    parts.push(
      open.includes(id) ? (
        <mark key={`m${id}`} className="cloze-open">
          {m[2]}
        </mark>
      ) : (
        <button
          key={`b${id}`}
          type="button"
          className="cloze-gap"
          aria-label={`Gizli formül parçası ${id + 1}: göster`}
          onClick={() => setOpen((o) => [...o, id])}
        >
          ? göster
        </button>
      ),
    );
    last = start + m[2].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

function Recall({ prompt, answer }: { prompt: string; answer: string }) {
  const [shown, setShown] = useState(false);
  return (
    <article className="cheat-recall-card">
      <h3>{typeset(prompt)}</h3>
      <button
        className="secondary"
        aria-expanded={shown}
        onClick={() => setShown((v) => !v)}
      >
        {shown ? <EyeOff size={16} /> : <Eye size={16} />}
        {shown ? "Yanıtı gizle" : "Yanıtı göster"}
      </button>
      {shown && <p className="cheat-recall-answer">{typeset(answer)}</p>}
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
  const [testing, setTesting] = useState(false);
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
      <div className="cheat-test-toggle">
        <button
          type="button"
          className="secondary"
          aria-pressed={testing}
          onClick={() => setTesting((v) => !v)}
        >
          {testing ? "Kendini sına: kapat" : "Kendini sına: formülleri gizle"}
        </button>
        {testing && (
          <p className="small muted">
            Gizli parçayı önce kendin söyle, sonra aç. Bu çalışma kaydedilmez ve puan vermez.
          </p>
        )}
      </div>
      <div className="cheat-sections" key={testing ? "test" : "read"}>
        {sheet.sections.map((section, i) => (
          <section className="cheat-section" key={`${section.title}-${i}`}>
            <h2>{typeset(section.title)}</h2>
            {section.text.map((text, j) => (
              <p key={j}>
                <ClozeText text={typeset(text)} testing={testing} />
              </p>
            ))}
            {sheet.lessonId && section.figureTitle && !testing && (
              <Suspense fallback={null}>
                <SectionFigure guideId={sheet.lessonId} title={section.figureTitle} />
              </Suspense>
            )}
            {section.table?.layout === "table" && (
              <GuideTable title={section.title} table={section.table} />
            )}
            {section.table && section.table.layout !== "table" && section.figureTitle && (
              <SourceQuestionFigure figure={{
                kind: "table",
                title: `${section.title} tablosu`,
                alt: section.table.headers.join(", "),
                ...section.table,
              }} />
            )}
            {section.table && section.table.layout !== "table" && !section.figureTitle && (
              <div
                className="cheat-comparisons"
                role="group"
                aria-label={`${typeset(section.title)} karşılaştırması`}
              >
                {section.table.rows.map((row, j) => (
                  <dl key={j}>
                    {row.map((cell, k) => (
                      <div key={k}>
                        <dt>{typeset(section.table!.headers[k])}</dt>
                        <dd>{typeset(cell)}</dd>
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
              <li key={i}>{typeset(text)}</li>
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
              <summary>{typeset(example.title)}</summary>
              {example.passage && (
                <blockquote className="question-passage">
                  {typeset(example.passage)}
                </blockquote>
              )}
              <p className="example-prompt">{typeset(example.prompt)}</p>
              <details className="cheat-solution">
                <summary>Çözümü adım adım gör</summary>
                <ol>
                  {example.steps.map((step, j) => {
                    const figureTitle = example.stepFigures?.[j];
                    return (
                      <li key={j}>
                        {typeset(step)}
                        {sheet.lessonId && figureTitle && (
                          <Suspense fallback={null}>
                            <SectionFigure guideId={sheet.lessonId} title={figureTitle} />
                          </Suspense>
                        )}
                      </li>
                    );
                  })}
                </ol>
                <p>
                  <strong>Sonuç ve kontrol:</strong> {typeset(example.answer)}
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
        <p className="small muted">{typeset(sheet.source)}</p>
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
