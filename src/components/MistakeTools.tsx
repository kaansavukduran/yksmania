import { useState } from "react";
import { Printer } from "lucide-react";
import { useApp } from "../store";

/*
 * "Kendime uyarı": a one-line note the learner writes to their future self
 * for one mistake (max 120 characters), and a printable pocket booklet of the
 * open and repaired mistakes with the right answer and that note. Both are
 * notes kept in `explorations`; neither is learning evidence.
 */

export function MistakeWarning({ storageKey }: { storageKey: string }) {
  const { state, update } = useApp();
  const saved = state.explorations[storageKey]?.warning;
  const [value, setValue] = useState(typeof saved === "string" ? saved : "");
  const [status, setStatus] = useState("");
  return (
    <label className="mistake-warning">
      <span>Kendime uyarı (tek satır)</span>
      <input
        type="text"
        maxLength={120}
        value={value}
        placeholder="Ör. Kökte “değildir” var mı, önce onu işaretle."
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          const text = value.trim();
          if (text === (typeof saved === "string" ? saved : "")) return;
          void update((s) => ({
            ...s,
            explorations: {
              ...s.explorations,
              [storageKey]: { ...(s.explorations[storageKey] ?? {}), warning: text },
            },
          }))
            .then(() => setStatus("Kaydedildi"))
            .catch(() => setStatus("Kaydedilemedi"));
        }}
      />
      {status && (
        <span className="small muted" role="status">
          {status}
        </span>
      )}
    </label>
  );
}

export type BookletItem = { key: string; lesson: string; prompt: string; answer: string };

export function PocketBooklet({ items }: { items: BookletItem[] }) {
  const { state } = useApp();
  if (!items.length) return null;
  const rows = items.slice(0, 60);
  return (
    <section className="panel pocket-booklet" aria-labelledby="pocket-heading">
      <div className="pocket-head">
        <h2 id="pocket-heading">Sınav sabahı cep kitapçığı</h2>
        <button type="button" className="secondary" onClick={() => {
            // Only this list is printed; other pages keep their normal print.
            document.body.classList.add("print-booklet");
            const done = () => {
              document.body.classList.remove("print-booklet");
              window.removeEventListener("afterprint", done);
            };
            window.addEventListener("afterprint", done);
            window.print();
          }}>
          <Printer size={17} aria-hidden="true" /> Yazdır
        </button>
      </div>
      <p className="small muted">
        Kalıcı olarak onarılmamış {items.length} hatan: doğru cevap ve kendine yazdığın uyarı. Yazdırırken yalnız bu liste basılır
        {items.length > rows.length ? ` (ilk ${rows.length} kayıt)` : ""}.
      </p>
      <ol className="pocket-list" tabIndex={0} aria-label="Cep kitapçığı listesi">
        {rows.map((item) => {
          const warning = state.explorations[item.key]?.warning;
          return (
            <li key={item.key}>
              <span className="small muted">{item.lesson}</span>
              <p className="pocket-prompt">{item.prompt}</p>
              <p>
                <strong>Doğru:</strong> {item.answer}
              </p>
              {typeof warning === "string" && warning && (
                <p className="pocket-warning">
                  <strong>Uyarı:</strong> {warning}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
