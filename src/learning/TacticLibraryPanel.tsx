import { useState } from "react";
import { methodTactics, type MethodTactic, type TacticExample } from "./tacticLibrary";

/*
 * Browsable tactic library on the cheat-sheet page. Opening cards and
 * revealing worked solutions is reading: nothing is saved or scored.
 */
function Example({ example, index }: { example: TacticExample; index: number }) {
  const [shown, setShown] = useState(false);
  return (
    <div className="tactic-example">
      <h3>Çözümlü örnek {index + 1}</h3>
      <div className="tactic-prompt">{example.prompt}</div>
      {shown ? (
        <>
          <ol className="tactic-solution">
            {example.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <div className="tactic-answer">Cevap: {example.answer}</div>
        </>
      ) : (
        <button type="button" className="secondary tactic-reveal" onClick={() => setShown(true)}>
          Önce kendin dene, sonra çözümü göster
        </button>
      )}
    </div>
  );
}

function Card({ tactic }: { tactic: MethodTactic }) {
  return (
    <details className="tactic-card">
      <summary>
        <span className="tactic-subject">{tactic.subject}</span>
        <span className="tactic-title">{tactic.title}</span>
      </summary>
      <div className="tactic-body">
        <div className="tactic-where">Nerede: {tactic.where}</div>
        <h3>Üç adım</h3>
        <ol>
          {tactic.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        {tactic.examples.map((example, i) => (
          <Example key={i} example={example} index={i} />
        ))}
        <div className="tactic-trap">
          <strong>Tuzak:</strong> {tactic.trap}
        </div>
        <div className="tactic-skip">
          <strong>Ne zaman kullanma:</strong> {tactic.skip}
        </div>
        <div className="tactic-evidence small muted">Kanıt: {tactic.evidence}</div>
      </div>
    </details>
  );
}

export function TacticLibrary() {
  const [open, setOpen] = useState(false);
  return (
    <section className="panel tactic-library" aria-labelledby="tactic-library-title">
      <button
        type="button"
        className="subject-header tactic-library-toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          <h2 id="tactic-library-title">Soru çözme taktikleri</h2>
          <span className="small muted">{methodTactics.length} yöntem · özgün çözümlü örneklerle</span>
        </span>
      </button>
      {open && (
        <div className="tactic-list">
          <p className="small muted">
            Bu yöntemler soru çözerken ipucu panelinde de ilgili sorularda çıkar. Örnekler bu uygulama için yazılmış özgün
            sorulardır; resmî ÖSYM sorusu değildir. Okumak ve çözüm açmak kaydedilmez, puan vermez.
          </p>
          {methodTactics.map((tactic) => (
            <Card key={tactic.id} tactic={tactic} />
          ))}
        </div>
      )}
    </section>
  );
}
