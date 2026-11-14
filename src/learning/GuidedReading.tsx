import { useId, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { VisualLab } from "./VisualLab";
import type { LessonGuide, WorkedExample } from "./guides/types";

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
export function GuidedReading({ guide }: { guide: LessonGuide }) {
  const prefix = useId();
  return (
    <>
      <nav className="guide-contents" aria-label="Anlatım içeriği">
        <p className="small muted">
          Yaklaşık {guide.minutes} dk · Anlatım, etkileşim ve örneklerle çalışma
        </p>
        <details>
          <summary>İçindekiler</summary>
          <div>
            {guide.sections.map((section, i) => (
              <button
                className="text-button"
                key={section.title}
                onClick={() => moveToSection(`${prefix}-${i}`)}
              >
                {section.title}
              </button>
            ))}
            <button
              className="text-button"
              onClick={() => moveToSection(`${prefix}-examples`)}
            >
              Çözümlü örnekler
            </button>
          </div>
        </details>
      </nav>
      {guide.sections.map((section, i) => (
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
              <table>
                <thead>
                  <tr>
                    {section.table.headers.map((header, j) => (
                      <th scope="col" key={j}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, j) => (
                    <tr key={j}>
                      {row.map((cell, k) => (
                        <td key={k}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {i === 1 && <VisualLab id={guide.id} />}
        </section>
      ))}
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
      <section className="guide-recall">
        <h2>Anlatmadan önce hatırla</h2>
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
      </section>
    </>
  );
}
