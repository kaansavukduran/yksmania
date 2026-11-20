import { useState } from "react";
import { Zap } from "lucide-react";
import { useApp } from "../store";
import { beginExam } from "../domain/exams";
import { smartSessionSpec, SMART_QUESTIONS, type SmartMinutes } from "../domain/smartSession";
import { localDate } from "../domain/scheduler";

/*
 * Bugün ekranında tek tıkla oturum: 15/30/60 dk karma pratik ya da düşük
 * enerjili günler için 5 dk kurtarma. Oturum öğrenme denemesi olarak açılır;
 * kendisi kanıt üretmez, yalnız yardımsız cevaplar sayılır.
 */
export function SmartSession({ navigate }: { navigate: (r: string) => void }) {
  const { state, commit, toast } = useApp();
  const [busy, setBusy] = useState(false);
  const blocked = !!state.examDraft;
  async function start(m: SmartMinutes) {
    const spec = smartSessionSpec(state, m, localDate());
    if (!spec) return toast("Bu oturum için uygun soru bulunamadı.");
    setBusy(true);
    try {
      await commit((s) => beginExam(s, spec, Date.now(), "learning"));
      navigate("/exams");
    } catch {
      toast("Oturum başlatılamadı. Kayıtların korundu; yeniden dene.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="panel smart-session" aria-labelledby="smart-heading">
      <h2 id="smart-heading">
        <Zap size={18} aria-hidden="true" /> Akıllı oturum
      </h2>
      <p className="small muted">
        Süreni seç: önce açık hataların, sonra çalıştığın konulardan dersleri karıştıran sorular gelir; konu etiketi soru sırasında
        gizlidir. Enerjin düşükse 5 dakikalık kurtarma turuyla yalnız 3 kolay soru çöz.
      </p>
      <div className="smart-buttons" role="group" aria-label="Oturum süresi">
        <button type="button" className="secondary" disabled={blocked || busy} onClick={() => void start(5)}>
          5 dk kurtarma · {SMART_QUESTIONS[5]} soru
        </button>
        {([15, 30, 60] as const).map((m) => (
          <button type="button" key={m} className="primary" disabled={blocked || busy} onClick={() => void start(m)}>
            {m} dk · {SMART_QUESTIONS[m]} soru
          </button>
        ))}
      </div>
      {blocked && <p className="small muted">Önce devam eden denemeyi bitir ya da Sınavlar’dan sürdür.</p>}
    </section>
  );
}
