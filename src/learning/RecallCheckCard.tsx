import { useState } from "react";
import { typeset } from "../domain/typeset";
import type { RecallCheck } from "./recallChecks";
import "./recallCheck.css";

/**
 * One-tap recall between sections: say it in your own words, then reveal.
 * It records nothing: no XP, no mastery, no saved state.
 */
export function RecallCheckCard({ check }: { check: RecallCheck }) {
  const [open, setOpen] = useState(false);
  return (
    <aside className="recall-check" aria-label="Ara hatırlama">
      <p className="recall-check-label small muted">Okuduğunu hatırla</p>
      <p className="recall-check-prompt">{typeset(check.prompt)}</p>
      {open ? (
        <p className="recall-check-answer" role="status">
          {typeset(check.answer)}
        </p>
      ) : (
        <button type="button" className="secondary" aria-expanded={false} onClick={() => setOpen(true)}>
          Cevabı göster
        </button>
      )}
      {open && (
        <button type="button" className="text-button" onClick={() => setOpen(false)}>
          Gizle, yeniden dene
        </button>
      )}
    </aside>
  );
}
