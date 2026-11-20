import { useState } from "react";
import type { MistakePattern } from "../domain/mistakePatterns";
import "./mistakePatterns.css";

const net = (n: number) => n.toLocaleString("tr", { maximumFractionDigits: 2 });

/**
 * "Bu hafta en çok net kaybettiren 3 hata kalıbı": derived from the last seven
 * days of saved wrong answers. Repair reuses the existing mistake sprint.
 */
export function MistakePatterns({
  patterns,
  subjectName,
  busy,
  begin,
}: {
  patterns: MistakePattern[];
  subjectName: (id: string) => string;
  busy: boolean;
  begin: (questionIds: string[]) => Promise<void>;
}) {
  const [running, setRunning] = useState<string | null>(null);
  return (
    <section className="panel mistake-patterns" aria-labelledby="mistake-patterns-heading">
      <h2 id="mistake-patterns-heading">Bu hafta en çok net kaybettiren 3 hata kalıbı</h2>
      {!patterns.length ? (
        <p className="small muted">Bu hafta kayıtlı yanlış yok.</p>
      ) : (
        <>
          <p className="small muted">Son 7 gün. Kayıp net tahmini: yanlış sayısı × 1,25.</p>
          <ol className="pattern-list">
            {patterns.map((p) => {
              const key = `${p.subjectId}:${p.reason}`;
              return (
                <li key={key}>
                  <div className="pattern-text">
                    <strong>{subjectName(p.subjectId)}</strong>
                    <span className="pattern-reason">{p.reasonLabel}</span>
                    <span className="small muted">
                      {p.wrong} yanlış · {net(p.netLoss)} net kayıp
                    </span>
                  </div>
                  <button
                    type="button"
                    className="secondary"
                    disabled={busy || running !== null}
                    aria-label={`Bu kalıbı onar: ${subjectName(p.subjectId)}, ${p.reasonLabel}`}
                    onClick={() => {
                      setRunning(key);
                      void begin(p.questionIds).finally(() => setRunning(null));
                    }}
                  >
                    Bu kalıbı onar
                  </button>
                </li>
              );
            })}
          </ol>
          {busy && <p className="small muted">Önce devam eden denemeyi bitir.</p>}
        </>
      )}
    </section>
  );
}
