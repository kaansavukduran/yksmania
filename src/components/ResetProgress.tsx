import { useRef, useState } from "react";
import { useApp } from "../store";
import { resetLearningProgress } from "../domain/resetProgress";

export function ResetProgress() {
  const { commit, toast } = useApp();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  const lock = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  function close() {
    if (!lock.current) {
      dialog.current?.close();
      trigger.current?.focus();
    }
  }
  async function reset() {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      await commit(resetLearningProgress);
      dialog.current?.close();
      trigger.current?.focus();
      toast(
        "İlerleme sıfırlandı. Ayarların, notların ve kaynak dosyaların korundu.",
      );
    } catch {
      setError(
        "İlerleme sıfırlanamadı. Önceki kayıtların korunuyor; yeniden deneyebilirsin.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <div className="reset-progress">
      <button
        className="secondary danger-button"
        ref={trigger}
        onClick={() => {
          setError("");
          dialog.current?.showModal();
          cancel.current?.focus();
        }}
      >
        İlerlemeyi sıfırla
      </button>
      <p className="small muted">
        Bu cihazdaki konu ve soru ilerlemesini baştan başlatır. Önce yukarıdan
        ilerleme yedeğini dışa aktarabilirsin.
      </p>
      <dialog
        className="reset-dialog panel"
        ref={dialog}
        aria-labelledby="reset-progress-title"
        aria-describedby="reset-progress-description"
        onCancel={(event) => {
          if (busy) event.preventDefault();
        }}
        onClose={() => trigger.current?.focus()}
      >
        <h2 id="reset-progress-title">İlerlemeyi sıfırlamak istiyor musun?</h2>
        <p id="reset-progress-description">
          Tamamlanan konular, soru geçmişi, tekrarlar, etkileşim seçimleri ve
          yarım soru çalışması silinir. Bütün konular çalışılmamış kabul edilir.
          Bu işlem geri alınamaz; dışa aktardığın yedeği geri yükleyebilirsin.
        </p>
        <p>
          <strong>
            Ayarların, notların, PDF’lerin ve PDF sayfa konumların korunur.
          </strong>{" "}
          Kum saati durur; seçtiğin süre korunur.
        </p>
        {error && <p role="alert">{error}</p>}
        <div className="dialog-actions">
          <button
            className="secondary"
            ref={cancel}
            disabled={busy}
            onClick={close}
          >
            Vazgeç
          </button>
          <button
            className="primary danger-button"
            disabled={busy}
            onClick={() => void reset()}
          >
            {busy ? "Sıfırlanıyor…" : "Evet, ilerlemeyi sıfırla"}
          </button>
        </div>
      </dialog>
    </div>
  );
}
