import { clarifiedQuestionView } from "../domain/questionPresentation";
import { SourceQuestionFigure } from "../learning/SourceQuestionFigure";
import { sourceQuestionPresentation } from "../learning/sourceExercises024";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Flag,
  Timer,
  Trophy,
} from "lucide-react";
import { useApp } from "../store";
import {
  beginExam,
  changeExam,
  examCatalogue,
  examReference,
  examScore,
  examAssistance,
  finishExam,
  type ExamSpec,
} from "../domain/exams";
import { formatCountdown } from "../domain/focusTimer";
import type { ExamDraft, ExamSession } from "../domain/examModel";
import "../exams.css";
import { QuestionHelp } from "../components/QuestionHelp";
import { helpPanels, previousHelpPanelCount } from "../learning/questionHelp";
import { effectiveHelpLevel } from "../learning/helpProgression";

// Deadline follows the saved exam even while another learning page is open.
export function ExamDeadlineWatcher() {
  const { state, commit, status } = useApp();
  const commitRef = useRef(commit);
  commitRef.current = commit;
  const attempted = useRef("");
  const storageFailed = useRef(false);
  const [recovery, setRecovery] = useState(0);
  useEffect(() => {
    if (status === "error") storageFailed.current = true;
    if (status === "saved" && storageFailed.current) {
      storageFailed.current = false;
      attempted.current = "";
      setRecovery((value) => value + 1);
    }
  }, [status]);
  const id = state.examDraft?.id,
    deadline = state.examDraft?.deadline;
  useEffect(() => {
    if (!id || deadline === undefined) {
      attempted.current = "";
      return;
    }
    const check = () => {
      const now = Date.now();
      if (now < deadline || attempted.current === id) return;
      attempted.current = id;
      void commitRef
        .current((s) => (s.examDraft?.id === id ? finishExam(s, id, now) : s))
        .catch(() => {});
    };
    check();
    const timer = setInterval(check, 500);
    window.addEventListener("focus", check);
    document.addEventListener("visibilitychange", check);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", check);
      document.removeEventListener("visibilitychange", check);
    };
  }, [id, deadline, recovery]);
  return null;
}

const number = (value: number) =>
  value.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
const duration = (seconds: number) =>
  `${Math.floor(seconds / 60)} dk${seconds % 60 ? ` ${seconds % 60} sn` : ""}`;
export function Exams({
  navigate,
  resultId,
}: {
  navigate: (route: string) => void;
  resultId?: string;
}) {
  const { state, commit } = useApp();
  const specs = useMemo(examCatalogue, []);
  const [tab, setTab] = useState("TYT");
  const [mode, setMode] = useState<"simulation" | "learning">("simulation");
  const [catalog, setCatalog] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const lock = useRef(false);
  const previousDraft = useRef(state.examDraft?.id);
  useEffect(() => {
    const previous = previousDraft.current;
    previousDraft.current = state.examDraft?.id;
    if (
      previous &&
      !state.examDraft &&
      !resultId &&
      state.examSessions.some((s) => s.id === previous)
    )
      navigate(`/exams?result=${encodeURIComponent(previous)}`);
  }, [state.examDraft?.id, state.examSessions, resultId, navigate]);
  const result = resultId
    ? state.examSessions.find((s) => s.id === resultId)
    : undefined;
  async function start(spec: ExamSpec) {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    const now = Date.now();
    try {
      await commit((s) => beginExam(s, spec, now, mode));
      setCatalog(false);
      navigate("/exams");
    } catch {
      setError(
        "Deneme başlatılamadı. Önceki kayıtların korundu; yeniden dene.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  if (result) return <ExamResults session={result} navigate={navigate} />;
  if (state.examDraft && !catalog)
    return (
      <ExamRunner
        draft={state.examDraft}
        navigate={navigate}
        showCatalog={() => setCatalog(true)}
      />
    );
  return (
    <>
      <header className="page-heading">
        <div>
          <h1>Sınavlar</h1>
          <p className="muted">
            Bilgini süre içinde uygula; sonra her sorunun mantığını incele.
          </p>
        </div>
        <Timer size={32} aria-hidden="true" />
      </header>
      {state.examDraft && (
        <section className="panel exam-resume" aria-label="Devam eden deneme">
          <div>
            <h2>{state.examDraft.title}</h2>
            <p>
              {state.examDraft.answers.filter((v) => v !== null).length}/
              {state.examDraft.items.length} soru yanıtlandı. Süre, bu ekrandan
              ayrılsan da devam eder.
            </p>
          </div>
          <button className="primary" onClick={() => setCatalog(false)}>
            Denemeye devam et <ArrowRight size={18} />
          </button>
        </section>
      )}
      <div className="segmented exam-tabs" aria-label="Deneme türü">
        {["TYT", "AYT", "Branş"].map((value) => (
          <button
            key={value}
            className={tab === value ? "active" : ""}
            aria-pressed={tab === value}
            onClick={() => setTab(value)}
          >
            {value === "AYT"
              ? "AYT Sayısal"
              : value === "Branş"
                ? "Branş denemeleri"
                : "TYT"}
          </button>
        ))}
      </div>
      <p className="muted exam-scope">
        Uygulamadaki hazır soru bankasından hazırlanır. Kısa setler tam kapsamlı
        sınav değildir. TYT için 120 soru / 165 dakika, AYT Sayısal için 80 soru
        / 180 dakika referansı kullanılır; süre gerçek soru sayısına göre
        ölçeklenir.
      </p>
      {error && (
        <p role="alert" className="exam-error">
          {error}
        </p>
      )}
      <label className="field exam-mode">
        Çalışma biçimi
        <select
          value={mode}
          disabled={!!state.examDraft || busy}
          onChange={(event) => setMode(event.target.value as typeof mode)}
        >
          <option value="simulation">
            Sınav simülasyonu · ipuçları kapalı
          </option>
          <option value="learning">Öğrenme denemesi · ipuçları açık</option>
        </select>
        <span className="small muted">
          İki biçimde de süre işler. Açtığın ipuçları ayrıca kaydedilir; doğru,
          yanlış ve net hesabı aynı kalır.
        </span>
      </label>
      <div className="exam-catalog">
        {specs
          .filter((spec) =>
            tab === "Branş"
              ? spec.kind === "branch"
              : spec.kind === "mixed" && spec.exam === tab,
          )
          .map((spec) => (
            <article className="panel exam-card" key={spec.id}>
              <h2>{spec.title}</h2>
              <p className="exam-card-meta">
                <strong>{spec.items.length} soru</strong>
                <span>
                  <Timer size={16} aria-hidden="true" />
                  {duration(spec.durationSeconds)}
                </span>
              </p>
              {spec.kind === "mixed" && (
                <p className="small muted">
                  {spec.fullLength
                    ? "Tam soru dağılımlı özgün deneme."
                    : "Kısa alıştırma denemesi · mevcut soru kapsamı"}
                </p>
              )}
              <p>
                {[...new Set(spec.items.map((q) => q.subjectName))].join(" · ")}
              </p>
              {spec.missingSubjects.length > 0 && (
                <p className="small muted">
                  Tam sınav dağılımına ulaşmayan alanlar:{" "}
                  {spec.missingSubjects.join(", ")}. Sonuç bir YKS puanı veya
                  sıralama tahmini değildir.
                </p>
              )}
              <button
                className="primary"
                disabled={busy || !!state.examDraft}
                aria-label={`Başlat: ${spec.title}`}
                onClick={() => void start(spec)}
              >
                Denemeyi başlat <ArrowRight size={17} />
              </button>
              {!!state.examDraft && (
                <p className="small muted">
                  Yeni bir deneme için devam eden denemeyi bitir.
                </p>
              )}
            </article>
          ))}
      </div>
      <section className="exam-history" aria-label="Deneme geçmişi">
        <h2>Deneme geçmişin</h2>
        {state.examSessions.length ? (
          <ol>
            {[...state.examSessions].reverse().map((session) => {
              const score = examScore(session);
              return (
                <li key={session.id}>
                  <button
                    className="exam-history-row"
                    onClick={() =>
                      navigate(
                        `/exams?result=${encodeURIComponent(session.id)}`,
                      )
                    }
                  >
                    <span>
                      <strong>{session.title}</strong>
                      <small>
                        {new Date(session.finishedAt).toLocaleDateString(
                          "tr-TR",
                        )}{" "}
                        · {score.correct} doğru · {score.wrong} yanlış ·{" "}
                        {score.blank} boş
                      </small>
                    </span>
                    <span>
                      {number(score.net)} net <ArrowRight size={16} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="muted">
            İlk denemeni bitirdiğinde sonuçların burada yer alacak.
          </p>
        )}
      </section>
      {resultId && !result && (
        <p role="status">
          Bu deneme sonucu bulunamadı; mevcut denemelerinden birini
          seçebilirsin.
        </p>
      )}
    </>
  );
}
function ExamRunner({
  draft,
  navigate,
  showCatalog,
}: {
  draft: ExamDraft;
  navigate: (route: string) => void;
  showCatalog: () => void;
}) {
  const { commit } = useApp();
  const [now, setNow] = useState(Date.now);
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const lock = useRef(false),
    attemptedExpiry = useRef("");
  const dialog = useRef<HTMLDialogElement>(null),
    finishTrigger = useRef<HTMLButtonElement>(null),
    cancel = useRef<HTMLButtonElement>(null);
  const remaining = Math.max(0, draft.deadline - now),
    expired = remaining <= 0;
  const clockParts = formatCountdown(remaining).split(":");
  const answered = draft.answers.filter((value) => value !== null).length;
  const q = clarifiedQuestionView(draft.items[draft.index]);
  const sourcePresentation = sourceQuestionPresentation(q);
  const visibleHelpLevel = effectiveHelpLevel(
    helpPanels(q),
    draft.helpLevels?.[draft.index],
    draft.helpPanelCounts?.[String(draft.index)],
    previousHelpPanelCount(q),
    q.hint,
  );
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const previousIndex = useRef(draft.index);
  useEffect(() => {
    if (previousIndex.current === draft.index) return;
    previousIndex.current = draft.index;
    questionHeading.current?.focus({ preventScroll: true });
    questionHeading.current?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  }, [draft.index]);
  useEffect(() => {
    const refresh = () => setNow(Date.now());
    refresh();
    const timer = setInterval(refresh, 500);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [draft.id]);
  const finish = useCallback(async () => {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    const ended = Date.now();
    try {
      await commit((s) => finishExam(s, draft.id, ended));
      dialog.current?.close();
      navigate(`/exams?result=${encodeURIComponent(draft.id)}`);
    } catch {
      setError(
        "Sonuç kaydedilemedi. Yanıtların korunuyor; sonucu kaydetmeyi yeniden dene.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }, [commit, draft.id, navigate]);
  useEffect(() => {
    if (expired && attemptedExpiry.current !== draft.id) {
      attemptedExpiry.current = draft.id;
      void finish();
    }
  }, [expired, draft.id, finish]);
  async function change(action: Parameters<typeof changeExam>[2]) {
    if (lock.current) return;
    const time = Date.now();
    if (time >= draft.deadline) {
      setNow(time);
      void finish();
      return;
    }
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      await commit((s) => changeExam(s, draft.id, action, time));
    } catch {
      setError(
        "Değişiklik kaydedilemedi. Önceki yanıtın korunuyor; yeniden dene.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <section className="exam-runner" aria-label="Devam eden sınav">
      <button className="text-button back-link" onClick={showCatalog}>
        <ArrowLeft size={17} />
        Sınavlara dön · süre devam eder
      </button>
      <header className="exam-runner-heading">
        <div>
          <span className="eyebrow">
            {draft.exam === "AYT" ? "AYT Sayısal" : "TYT"} · Özgün alıştırma
            denemesi
          </span>
          <h1>{draft.title}</h1>
          <p>
            {answered}/{draft.items.length} yanıtlandı · {draft.flagged.length}{" "}
            soru işaretli
          </p>
        </div>
        <div
          className={`panel exam-time ${remaining <= 60000 ? "exam-time-low" : ""}`}
        >
          <Timer size={22} aria-hidden="true" />
          <div>
            <span>Kalan süre</span>
            <output className="exam-clock" aria-live="off">
              {clockParts.length === 3 ? (
                <>
                  {clockParts[0]}:<wbr />
                  {clockParts.slice(1).join(":")}
                </>
              ) : (
                formatCountdown(remaining)
              )}
            </output>
          </div>
        </div>
      </header>
      <p className="small muted">
        Süre duraklatılmaz; sayfadan ayrılsan veya uygulamayı kapatsan da son
        zaman korunur. Süre bitince mevcut yanıtlarla sonuç kaydedilir.
      </p>
      <p className="small muted">
        {draft.mode === "learning"
          ? "Öğrenme denemesi · çözüm desteği açık"
          : "Sınav simülasyonu · çözüm desteği isteğe bağlı"}
      </p>
      {error && (
        <div role="alert" className="panel exam-error">
          <p>{error}</p>
          {expired && (
            <button
              className="secondary"
              disabled={busy}
              onClick={() => void finish()}
            >
              Sonucu kaydetmeyi yeniden dene
            </button>
          )}
        </div>
      )}
      {expired && (
        <p role="status">
          {busy
            ? "Süre tamamlandı. Sonuç kaydediliyor."
            : error
              ? "Süre tamamlandı. Yanıtların korunuyor; sonucu kaydetmeyi yeniden dene."
              : "Süre tamamlandı. Yanıtlar değiştirilemez."}
        </p>
      )}
      <div className="exam-layout">
        <section
          className="panel exam-question"
          aria-label={`Deneme sorusu ${draft.index + 1}`}
        >
          <div className="exam-question-meta">
            <strong>
              Soru {draft.index + 1} / {draft.items.length}
            </strong>
            <span>{q.subjectName}</span>
          </div>
          {q.passage && (
            <section className="question-passage" aria-label="Sorunun metni">
              <p>{q.passage}</p>
            </section>
          )}
          <h2 ref={questionHeading} tabIndex={-1}>
            {q.prompt}
          </h2>
          {sourcePresentation?.figure && (
            <SourceQuestionFigure figure={sourcePresentation.figure} />
          )}
          <div className="exam-options">
            {q.options.map((option, index) => (
              <button
                className={`exam-answer ${draft.answers[draft.index] === index ? "selected" : ""}`}
                key={index}
                aria-pressed={draft.answers[draft.index] === index}
                disabled={busy || expired}
                onClick={() =>
                  void change({
                    type: "answer",
                    index: draft.index,
                    value: index,
                  })
                }
              >
                <span className="exam-option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </button>
            ))}
          </div>
          {draft.mode !== "learning" && (
            <div className="exam-help-gate">
              <label>
                <input
                  type="checkbox"
                  checked={draft.helpEnabled ?? false}
                  disabled={busy || expired}
                  onChange={(event) =>
                    void change({
                      type: "help-enabled",
                      index: draft.index,
                      value: event.target.checked,
                    })
                  }
                />
                <span>
                  Çözüm desteğini aç{" "}
                  <span className="small muted">
                    · ipucu açtığın sorular yardımlı olarak kaydedilir
                  </span>
                </span>
              </label>
            </div>
          )}
          {(draft.mode === "learning" || draft.helpEnabled) && (
            <QuestionHelp
              key={q.id}
              question={q}
              level={visibleHelpLevel}
              disabled={busy || expired}
              onLevel={(level) =>
                void change({ type: "help", index: draft.index, level })
              }
            />
          )}
          <div className="exam-question-tools">
            <button
              className="text-button"
              disabled={busy || expired || draft.answers[draft.index] === null}
              onClick={() =>
                void change({ type: "answer", index: draft.index, value: null })
              }
            >
              Yanıtı temizle · boş bırak
            </button>
            <button
              className="secondary"
              disabled={busy || expired}
              aria-pressed={draft.flagged.includes(draft.index)}
              onClick={() => void change({ type: "flag", index: draft.index })}
            >
              <Flag size={17} aria-hidden="true" />
              {draft.flagged.includes(draft.index)
                ? "İşareti kaldır"
                : "Sonra bakmak için işaretle"}
            </button>
          </div>
          <div className="exam-question-navigation">
            <button
              className="secondary"
              disabled={busy || expired || draft.index === 0}
              onClick={() =>
                void change({ type: "index", index: draft.index - 1 })
              }
            >
              <ArrowLeft size={17} />
              Önceki soru
            </button>
            <button
              className="secondary"
              disabled={
                busy || expired || draft.index === draft.items.length - 1
              }
              onClick={() =>
                void change({ type: "index", index: draft.index + 1 })
              }
            >
              Sonraki soru
              <ArrowRight size={17} />
            </button>
          </div>
        </section>
        <aside className="panel exam-map" aria-label="Soru haritası">
          <h2>Sorular</h2>
          <p className="small muted">
            Onay işareti yanıtı, bayrak sonra bakacağın soruyu gösterir.
          </p>
          <button
            className="primary exam-finish"
            disabled={busy || expired}
            ref={finishTrigger}
            onClick={() => {
              dialog.current?.showModal();
              cancel.current?.focus();
            }}
          >
            Denemeyi bitir
          </button>
          <div className="exam-numbers">
            {draft.items.map((item, index) => (
              <button
                key={item.id}
                className={`exam-number ${draft.answers[index] !== null ? "answered" : ""}`}
                aria-label={`Soru ${index + 1}, ${draft.answers[index] !== null ? "yanıtlandı" : "boş"}${draft.flagged.includes(index) ? ", işaretli" : ""}${(draft.helpLevels?.[index] ?? 0) > 0 ? ", yardım alındı" : ""}`}
                aria-current={draft.index === index ? "step" : undefined}
                disabled={busy || expired}
                onClick={() => void change({ type: "index", index })}
              >
                <span>{index + 1}</span>
                {draft.flagged.includes(index) ? (
                  <Flag size={13} aria-hidden="true" />
                ) : draft.answers[index] !== null ? (
                  <Check size={13} aria-hidden="true" />
                ) : null}
              </button>
            ))}
          </div>
        </aside>
      </div>
      <dialog
        className="panel exam-finish-dialog"
        ref={dialog}
        aria-labelledby="exam-finish-title"
        onCancel={(event) => {
          if (busy) event.preventDefault();
        }}
        onClose={() => finishTrigger.current?.focus()}
      >
        <h2 id="exam-finish-title">Denemeyi bitirmek istiyor musun?</h2>
        <p>
          {answered} soru yanıtlandı, {draft.items.length - answered} soru boş.
          Bitirince yanıtların değişmez; çözümleri ve ders sonuçlarını
          inceleyebilirsin.
        </p>
        {error && <p role="alert">{error}</p>}
        <div className="exam-dialog-actions">
          <button
            className="secondary"
            ref={cancel}
            disabled={busy}
            onClick={() => dialog.current?.close()}
          >
            Denemeye dön
          </button>
          <button
            className="primary"
            disabled={busy}
            onClick={() => void finish()}
          >
            Bitir ve sonucu gör
          </button>
        </div>
      </dialog>
    </section>
  );
}
function ExamResults({
  session,
  navigate,
}: {
  session: ExamSession;
  navigate: (route: string) => void;
}) {
  const score = examScore(session);
  const assistance = examAssistance(session);
  return (
    <section className="exam-results">
      <button
        className="text-button back-link"
        onClick={() => navigate("/exams")}
      >
        <ArrowLeft size={17} />
        Sınavlara dön
      </button>
      <header className="page-heading">
        <div>
          <span className="eyebrow">Kaydedilmiş deneme sonucu</span>
          <h1>{session.title}</h1>
          <p>
            {session.timedOut ? "Süre tamamlandı." : "Denemeyi bitirdin."}{" "}
            {session.items.length} soru · kullanılan süre{" "}
            {duration(
              Math.min(
                session.durationSeconds,
                Math.max(
                  0,
                  Math.round((session.finishedAt - session.startedAt) / 1000),
                ),
              ),
            )}
          </p>
        </div>
        <Trophy size={32} aria-hidden="true" />
      </header>
      <div className="panel exam-score-summary" aria-label="Deneme özeti">
        {[
          [score.correct, "Doğru"],
          [score.wrong, "Yanlış"],
          [score.blank, "Boş"],
          [number(score.net), "Net"],
        ].map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="small muted">
        Net = doğru − yanlış / 4. Bu alıştırma sonucu YKS puanı veya sıralama
        tahmini değildir; konu tamamlanması ve XP oluşturmaz.
      </p>
      <p className="exam-assistance-summary" aria-label="Yardım kullanımı">
        {assistance.independentCorrect} bağımsız doğru ·{" "}
        {assistance.assistedCorrect} yardımlı doğru · {assistance.helped} soruda
        yardım açıldı.
        {session.helpLevels === undefined &&
          session.mode === undefined &&
          " Önceki sürümden kaydedilen bu denemede çözüm desteği yoktu."}
      </p>
      <section className="panel exam-breakdown" aria-label="Ders sonuçları">
        <h2>Ders sonuçları</h2>
        <div
          className="exam-table-wrap"
          tabIndex={0}
          role="region"
          aria-label="Ders sonuçları tablosu"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Ders</th>
                <th scope="col">Doğru</th>
                <th scope="col">Yanlış</th>
                <th scope="col">Boş</th>
                <th scope="col">Net</th>
              </tr>
            </thead>
            <tbody>
              {score.subjects.map((row) => (
                <tr key={row.id}>
                  <th scope="row">{row.subject}</th>
                  <td>{row.correct}</td>
                  <td>{row.wrong}</td>
                  <td>{row.blank}</td>
                  <td>{number(row.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section
        className="exam-solutions"
        aria-label="Açıklamalı deneme çözümleri"
      >
        <h2>Soruları anlayarak incele</h2>
        <p className="muted">
          Her soruda kendi yanıtını, doğru yanıtı ve çözüm gerekçesini
          karşılaştır.
        </p>
        {session.items.map((storedQuestion, index) => {
          const q = clarifiedQuestionView(storedQuestion);
          const sourcePresentation = sourceQuestionPresentation(q);
          const selected = session.answers[index],
            correct = selected === q.answer;
          return (
            <details className="panel exam-solution" key={q.id}>
              <summary>
                {index + 1}. soru · {q.subjectName} ·{" "}
                {selected === null ? "Boş" : correct ? "Doğru" : "Yanlış"}
                {(session.helpLevels?.[index] ?? 0) > 0
                  ? " · Yardım alındı"
                  : ""}
              </summary>
              <p className="small muted">{q.lessonTitle}</p>
              {q.passage && (
                <section
                  className="question-passage"
                  aria-label="Sorunun metni"
                >
                  <p>{q.passage}</p>
                </section>
              )}
              <h3>{q.prompt}</h3>
              {sourcePresentation && (
                <p className="small muted">
                  {sourcePresentation.source.shortLabel}
                </p>
              )}
              {sourcePresentation?.figure && (
                <SourceQuestionFigure figure={sourcePresentation.figure} />
              )}
              <ol type="A">
                {q.options.map((option, i) => (
                  <li key={i}>
                    {option}
                    {i === q.answer && <strong> · Doğru yanıt</strong>}
                    {i === selected && <span> · Senin yanıtın</span>}
                  </li>
                ))}
              </ol>
              <div className="exam-explanation">
                <h4>Çözümün mantığı</h4>
                <p>{q.explanation}</p>
              </div>
              <SolutionHelp question={q} />
              <button
                className="text-button"
                onClick={() =>
                  navigate(`/lesson?id=${encodeURIComponent(q.lessonId)}`)
                }
              >
                Konunun anlatımına dön <ArrowRight size={16} />
              </button>
            </details>
          );
        })}
      </section>
    </section>
  );
}

function SolutionHelp({
  question,
}: {
  question: ExamSession["items"][number];
}) {
  const [level, setLevel] = useState(0);
  return (
    <QuestionHelp
      question={question}
      level={level}
      onLevel={setLevel}
      reviewed
    />
  );
}
