import { geometryExpansion032Ids } from "../data/supplementalTopics032";
import { useId, useState, useEffect, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import "./guidedJourney.css";
import { ArrowRight, RotateCcw } from "lucide-react";
import { VisualLab } from "./VisualLab";
import type { LessonGuide, WorkedExample } from "./guides/types";
import { resolveGuideStep } from "./guides/position";
import { geometryFoundation031Ids } from "../data/supplementalTopics031";

const visualFirstLessonIds = new Set<string>([
  "tyt-mat-ebob-ekok-kaynak-034",
  "tyt-mat-rasyonel-kaynak-035",
  "tyt-mat-faktoriyel-kaynak-033",
  "tyt-mat-asal-kaynak-032",
  ...geometryFoundation031Ids,
  ...geometryExpansion032Ids,
  "alan-donusumleri",
  "noktanin-analitigi",
  "dogrunun-analitigi",
  "donusum-oteleme-donme",
  "donusum-yansima-simetri",
  "cemberin-analitigi",
]);

function moveToSection(id: string) {
  const heading = document.getElementById(id)?.querySelector("h2");
  heading?.focus({ preventScroll: true });
  heading?.scrollIntoView({ behavior: "instant", block: "start" });
}

function Example({ example }: { example: WorkedExample }) {
  const [count, setCount] = useState(0);
  return (
    <details className="worked-example">
      <summary>{example.title}</summary>
      <p className="example-prompt">{example.prompt}</p>
      <p>
        <strong>Nasıl başlayalım?</strong> {example.strategy}
      </p>
      <ol className="worked-steps">
        {example.steps.slice(0, count).map((step, i) => (
          <li key={i}>
            <strong>{step.label}</strong>
            {step.expression && (
              <p className="math-expression">{step.expression}</p>
            )}
            <p>{step.explanation}</p>
          </li>
        ))}
      </ol>
      <div className="example-actions">
        {count < example.steps.length && (
          <button
            className="secondary"
            onClick={() => setCount((value) => value + 1)}
          >
            {count === 0 ? "İlk adımı göster" : "Sonraki adım"}
            <ArrowRight size={17} />
          </button>
        )}
        {count < example.steps.length && (
          <button
            className="text-button"
            onClick={() => setCount(example.steps.length)}
          >
            Çözümün tamamını göster
          </button>
        )}
        {count > 0 && (
          <button className="text-button" onClick={() => setCount(0)}>
            <RotateCcw size={16} />
            Baştan izle
          </button>
        )}
      </div>
      {count === example.steps.length && (
        <div className="worked-conclusion" aria-live="polite">
          <p>
            <strong>Sonuç:</strong> {example.answer}
          </p>
          <p>
            <strong>Kontrol:</strong> {example.check}
          </p>
          <p>
            <strong>Dikkat:</strong> {example.pitfall}
          </p>
        </div>
      )}
    </details>
  );
}
export function GuidedReading({
  guide,
  recallSupplement,
}: {
  guide: LessonGuide;
  recallSupplement?: ReactNode;
}) {
  const prefix = useId();
  const [journey, persistJourney] = useExploration(`guide:${guide.id}`, {
    step: 0,
    guided: false,
    sectionCount: 0,
  });
  const stages = guide.sections.length + 2;
  const step = resolveGuideStep(
    guide.id,
    journey.step,
    journey.sectionCount,
    guide.sections.length,
  );
  const guided = journey.guided;
  // Geometry starts with the manipulable figure, so the first guided step
  // explains the shape the learner is looking at. Saved section numbers do not
  // change; the figure is positioned within the existing first section.
  const visualSection = visualFirstLessonIds.has(guide.id) ? 0 : 1;
  function setJourney(changes: Partial<typeof journey>) {
    persistJourney({
      ...changes,
      step: changes.step ?? step,
      sectionCount: guide.sections.length,
    });
  }
  useEffect(() => {
    if (!guided) return;
    const frame = requestAnimationFrame(() => {
      const id =
        step < guide.sections.length
          ? `${prefix}-${step}`
          : step === guide.sections.length
            ? `${prefix}-examples`
            : `${prefix}-recall`;
      moveToSection(id);
    });
    return () => cancelAnimationFrame(frame);
  }, [step, guided, prefix, guide.sections.length]);
  function jump(i: number) {
    if (guided) setJourney({ step: i });
    else
      moveToSection(
        i < guide.sections.length
          ? `${prefix}-${i}`
          : i === guide.sections.length
            ? `${prefix}-examples`
            : `${prefix}-recall`,
      );
  }

  return (
    <>
      <div
        className="learning-journey"
        role="group"
        aria-label="Anlatım düzeni"
      >
        <div className="segmented">
          <button
            aria-pressed={guided}
            className={guided ? "active" : ""}
            onClick={() => setJourney({ guided: true })}
          >
            Adım adım çalış
          </button>
          <button
            aria-pressed={!guided}
            className={!guided ? "active" : ""}
            onClick={() => setJourney({ guided: false })}
          >
            Tüm anlatım
          </button>
        </div>
        {guided && (
          <>
            <p className="small muted">
              Bölüm {step + 1} / {stages} ·{" "}
              {step < guide.sections.length
                ? guide.sections[step].title
                : step === guide.sections.length
                  ? "Birlikte çöz"
                  : "Bakmadan hatırla"}
            </p>
            <p className="small muted">
              Bu sıra, anlatımda bulunduğun yeri gösterir. Öğrenme veya
              tamamlanma puanı değildir.
            </p>
          </>
        )}
      </div>
      <nav className="guide-contents" aria-label="Anlatım içeriği">
        <p className="small muted">
          Yaklaşık {guide.minutes} dk · Anlatım, etkileşim ve örneklerle çalışma
        </p>
        <details>
          <summary>İçindekiler</summary>
          <div>
            {guide.sections.map(
              (section, i) =>
                (!guided || i === step) && (
                  <button
                    className="text-button"
                    key={section.title}
                    onClick={() => jump(i)}
                  >
                    {section.title}
                  </button>
                ),
            )}
            <button
              className="text-button"
              onClick={() => jump(guide.sections.length)}
            >
              Çözümlü örnekler
            </button>
          </div>
        </details>
      </nav>
      {guide.sections.map(
        (section, i) =>
          (!guided || i === step) && (
            <section
              className="guide-section"
              key={section.title}
              id={`${prefix}-${i}`}
            >
              <h2 tabIndex={-1}>{section.title}</h2>
              {section.paragraphs.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
              {section.table && (
                <div
                  className="guide-table"
                  role="region"
                  tabIndex={0}
                  aria-label={`${section.title} tablosu`}
                >
                  <table role="table">
                    <thead role="rowgroup">
                      <tr role="row">
                        {section.table.headers.map((header, j) => (
                          <th
                            scope="col"
                            role="columnheader"
                            id={`${prefix}-table-${i}-col-${j}`}
                            key={j}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody role="rowgroup">
                      {section.table.rows.map((row, j) => (
                        <tr role="row" key={j}>
                          {row.map((cell, k) => (
                            <td
                              role="cell"
                              headers={`${prefix}-table-${i}-col-${k}`}
                              key={k}
                            >
                              <span
                                className="guide-table-cell-label"
                                aria-hidden="true"
                              >
                                {section.table!.headers[k]}
                              </span>
                              <span className="guide-table-cell-value">
                                {cell}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {i === visualSection && <VisualLab id={guide.id} />}
            </section>
          ),
      )}
      {(!guided || step === guide.sections.length) && (
        <section className="guide-examples" id={`${prefix}-examples`}>
          <h2 tabIndex={-1}>Çözümlü örnekler</h2>
          <p className="small muted">
            Önce kendin düşün; gerekçeleri adım adım aç ve sonucu kontrol et.
            Bunlar özgün öğretim örnekleridir.
          </p>
          {guide.examples.map((example) => (
            <Example key={example.title} example={example} />
          ))}
        </section>
      )}
      {(!guided || step === guide.sections.length + 1) && (
        <section className="guide-recall" id={`${prefix}-recall`}>
          <h2 tabIndex={-1}>Anlatmadan önce hatırla</h2>
          <p className="small muted">
            Cevabı açmadan kendi cümlelerinle söyle. Puan veya ustalık kaydı
            oluşturmaz.
          </p>
          {guide.recall.map((item) => (
            <details key={item.prompt}>
              <summary>{item.prompt}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
          {recallSupplement}
        </section>
      )}
      {guided && (
        <nav className="journey-actions" aria-label="Anlatım adımları">
          <button
            className="secondary"
            disabled={step === 0}
            onClick={() => setJourney({ step: step - 1 })}
          >
            Önceki bölüm
          </button>
          <span className="small muted">
            {step + 1} / {stages}
          </span>
          <button
            className="primary"
            disabled={step === stages - 1}
            onClick={() => setJourney({ step: step + 1 })}
          >
            Sonraki bölüm <ArrowRight size={17} />
          </button>
        </nav>
      )}
    </>
  );
}
