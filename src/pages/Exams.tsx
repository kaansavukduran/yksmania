import { typeset } from "../domain/typeset";
import { clarifiedQuestionView } from "../domain/questionPresentation";
import { SourceQuestionFigure } from "../learning/SourceQuestionFigure";
import { AnswerOptions } from "../components/AnswerOptions";
import { sourceQuestionPresentation } from "../learning/sourceExercises024";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Flag,
  Hourglass,
  Minus,
  Repeat,
  Timer,
  Trophy,
  X,
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
  questionStars,
  type ExamSpec,
} from "../domain/exams";
import { StarPractice, StarBadge } from "../components/StarPractice";
import { formatCountdown } from "../domain/focusTimer";
import type { ExamDraft, ExamSession } from "../domain/examModel";
import "../exams.css";
import { hidesSubject } from "../domain/smartSession";
import { ExamInsights } from "../components/ExamInsights";
import { GuidedQuestionHelp } from "../components/QuestionHelp";
import "../components/examInsights.css";
import { examPace, nextFlagged, paceCheckpointDue } from "../domain/examInsights";
import { playExamFinishCue } from "../domain/examFinishCue";
import { helpPanels, previousHelpPanelCount } from "../learning/questionHelp";
import { effectiveHelpLevel } from "../learning/helpProgression";
import { ExamBlockOrder } from "../components/ExamBlockOrder";
import { ExamDistribution } from "../components/ExamDistribution";
import { loadBlockOrder, saveBlockOrder } from "../domain/examOrder";
import {
  secondRoundIndices,
  secondRoundStep,
  secondRoundSummary,
  slowestItems,
  spokenDuration,
  timePulse,
} from "../domain/examPacing";

export { ExamDeadlineWatcher } from "./ExamDeadlineWatcher";

const number = (value: number) =>
  value.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
// Hız kontrolü notu kapatılan denemeler; yalnız bu oturumun belleğinde tutulur.
const dismissedPaceNotes = new Set<string>();
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
  const timersOn = state.settings.timers !== false;
  const specs = useMemo(examCatalogue, []);
  const [tab, setTab] = useState("TYT");
  const [distributionExam, setDistributionExam] = useState<"TYT" | "AYT">("TYT");
  // Son kullanılan ders sırası bu cihazda hatırlanır (ilerleme kaydı değildir).
  const [blockOrders, setBlockOrders] = useState(() => ({
    TYT: loadBlockOrder("TYT"),
    AYT: loadBlockOrder("AYT"),
  }));
  const changeBlockOrder = (exam: "TYT" | "AYT", order: string[]) => {
    setBlockOrders((current) => ({ ...current, [exam]: order }));
    saveBlockOrder(exam, order);
  };
  // Hints are always available: learning while taking the exam is the goal.
  const mode = "learning" as const;
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
      const order = spec.kind === "mixed" ? blockOrders[spec.exam] : undefined;
      await commit((s) => beginExam(s, spec, now, mode, order));
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
        </div>
      </header>
      {state.examDraft && (
        <section className="panel exam-resume" aria-label="Devam eden deneme">
          <div>
            <h2>{state.examDraft.title}</h2>
            <p>
              {state.examDraft.answers.filter((v) => v !== null).length}/
              {state.examDraft.items.length} soru yanıtlandı.
              {timersOn &&
                " Süre, bu ekrandan ayrılsan da devam eder."}
            </p>
          </div>
          <button className="primary" onClick={() => setCatalog(false)}>
            Denemeye devam et <ArrowRight size={18} />
          </button>
        </section>
      )}
      <div className="segmented exam-tabs" aria-label="Deneme türü">
        {["TYT", "AYT", "Branş", "Zorluk"].map((value) => (
          <button
            key={value}
            className={tab === value ? "active" : ""}
            aria-pressed={tab === value}
            onClick={() => {
              setTab(value);
              if (value === "TYT" || value === "AYT") setDistributionExam(value);
            }}
          >
            {value === "AYT"
              ? "AYT Sayısal"
              : value === "Branş"
                ? "Branş denemeleri"
                : value === "Zorluk"
                  ? "Zorluk yıldızı"
                  : "TYT"}
          </button>
        ))}
      </div>
      <p className="muted exam-scope">
        Uygulamadaki hazır soru bankasından hazırlanır. Kısa setler tam kapsamlı
        sınav değildir. Tam dağılım TYT’de 120, AYT Sayısal’da 80 sorudur.
        {timersOn &&
          " Referans süre TYT’de 165, AYT Sayısal’da 180 dakikadır ve setin soru sayısına göre ölçeklenir."}
      </p>
      {error && (
        <p role="alert" className="exam-error">
          {error}
        </p>
      )}
      <p className="small muted exam-mode">
        Denemelerde ipucu ve adım adım çözüm her soruda açıktır; amaç sınav
        olurken öğrenmektir. Açtığın ipuçları ayrıca kaydedilir; doğru, yanlış
        ve net hesabı değişmez.
      </p>
      {tab === "Zorluk" && (
        <StarPractice
          busy={busy || !!state.examDraft}
          start={(spec) => void start(spec)}
        />
      )}
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
                {timersOn && (
                  <span>
                    <Timer size={16} aria-hidden="true" />
                    {duration(spec.durationSeconds)}
                  </span>
                )}
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
              {spec.kind === "mixed" && (
                <ExamBlockOrder
                  exam={spec.exam}
                  order={blockOrders[spec.exam]}
                  disabled={busy || !!state.examDraft}
                  onChange={(order) => changeBlockOrder(spec.exam, order)}
                />
              )}
              <button
                className="primary"
                disabled={busy || !!state.examDraft}
                aria-label={`Denemeyi başlat: ${spec.title}`}
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
      <ExamDistribution
        exam={distributionExam}
        onExam={setDistributionExam}
        mock={specs.find(
          (spec) => spec.kind === "mixed" && spec.exam === distributionExam,
        )}
      />
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
  const { commit, state } = useApp();
  const settingsRef = useRef(state.settings);
  settingsRef.current = state.settings;
  const [now, setNow] = useState(Date.now);
  const [paceNoteClosed, setPaceNoteClosed] = useState(() =>
    dismissedPaceNotes.has(draft.id),
  );
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const lock = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null),
    finishTrigger = useRef<HTMLButtonElement>(null),
    cancel = useRef<HTMLButtonElement>(null);
  // Zamanlayıcılar ayarla kapatılabilir (undefined = açık). Resmî süre dolsa
  // da deneme açık kalır; süre yalnız bilgi olarak gösterilir.
  const timersOn = state.settings.timers !== false;
  const remaining = Math.max(0, draft.deadline - now),
    expired = remaining <= 0;
  const clockText = expired
    ? `+${formatCountdown(Math.floor((now - draft.deadline) / 1000) * 1000)}`
    : formatCountdown(remaining);
  const clockParts = clockText.split(":");
  const answered = draft.answers.filter((value) => value !== null).length;
  const pace = timersOn
    ? examPace(
        { answered, total: draft.items.length, startedAt: draft.startedAt, deadline: draft.deadline },
        now,
      )
    : null;
  const showPaceNote =
    timersOn && !paceNoteClosed && !dismissedPaceNotes.has(draft.id) && paceCheckpointDue(draft, now);
  const flaggedTarget = nextFlagged(draft.flagged, draft.index, draft.items.length);
  // Süre nabzı: ekranda canlı hesaplanır, hiçbir tik kaydedilmez.
  const pulse = timersOn ? timePulse(draft, now) : null;
  // 2. tur listesi girişte sabitlenir; böylece boş bir soruyu yanıtlamak
  // turdaki sırayı kaydırmaz. Yalnız bu ekranın belleğinde tutulur.
  const [roundState, setRoundState] = useState<{ id: string; list: number[] } | null>(null);
  const round = roundState?.id === draft.id ? roundState.list : null;
  const roundCandidates = secondRoundIndices(draft);
  const roundInfo = secondRoundSummary(draft, remaining);
  const roundPosition = round ? round.indexOf(draft.index) : -1;
  const roundPrevious = round ? secondRoundStep(round, draft.index, -1) : null;
  const roundNext = round ? secondRoundStep(round, draft.index, 1) : null;
  const [roundAnnouncement, setRoundAnnouncement] = useState("");
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
    if (!timersOn) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const refresh = () => setNow(Date.now());
    const sync = () => {
      clearInterval(timer);
      if (document.hidden) return;
      refresh();
      timer = setInterval(refresh, 500);
    };
    sync();
    window.addEventListener("focus", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [draft.id, timersOn]);
  const finish = useCallback(async () => {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    const ended = Date.now();
    try {
      await commit((s) => finishExam(s, draft.id, ended));
      playExamFinishCue(draft.id, settingsRef.current);
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
  async function change(action: Parameters<typeof changeExam>[2]) {
    if (lock.current) return;
    const time = Date.now();
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
  function startRound() {
    const list = secondRoundIndices(draft);
    if (!list.length) return;
    const target = list.includes(draft.index)
      ? draft.index
      : (secondRoundStep(list, draft.index, 1) ?? list[0]);
    setRoundState({ id: draft.id, list });
    setRoundAnnouncement(
      `2. tur başladı: ${list.length} soru. Önceki ve Sonraki yalnız bu sorular arasında gezer.`,
    );
    if (target !== draft.index) void change({ type: "index", index: target });
  }
  function endRound() {
    setRoundState(null);
    setRoundAnnouncement("2. turdan çıkıldı. Önceki ve Sonraki tüm sorularda gezer.");
  }
  const previousTarget = round ? roundPrevious : draft.index > 0 ? draft.index - 1 : null;
  const nextTarget = round
    ? roundNext
    : draft.index < draft.items.length - 1
      ? draft.index + 1
      : null;
  return (
    <section className="exam-runner" aria-label="Devam eden sınav">
      <button className="text-button back-link" onClick={showCatalog}>
        <ArrowLeft size={17} />
        {timersOn ? "Sınavlara dön · süre devam eder" : "Sınavlara dön"}
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
        {timersOn && (
          <div
            className={`panel exam-time ${!expired && remaining <= 60000 ? "exam-time-low" : ""}`}
          >
            <Timer size={22} aria-hidden="true" />
            <div>
              <span>{expired ? "Ek süre" : "Kalan süre"}</span>
              <output className="exam-clock" aria-live="off">
                {clockParts.length === 3 ? (
                  <>
                    {clockParts[0]}:<wbr />
                    {clockParts.slice(1).join(":")}
                  </>
                ) : (
                  clockText
                )}
              </output>
            </div>
          </div>
        )}
      </header>
      <p className="small muted">
        {timersOn
          ? "Süre duraklatılmaz; sayfadan ayrılsan veya uygulamayı kapatsan da son zaman korunur. Süre dolsa da deneme sen bitirene kadar açık kalır."
          : "Deneme sen bitirene kadar açık kalır; istediğin kadar düşünebilirsin."}
      </p>
      <p className="small muted">
        Öğrenme denemesi · ipucu ve çözüm her soruda açık
      </p>
      {timersOn && pace && !expired && (
        <p className="exam-pace" aria-live="off">
          {paceSummary(pace)}
        </p>
      )}
      {timersOn && showPaceNote && pace && !expired && (
        <div className="panel exam-pace-note" role="status">
          <p>
            <strong>Hız kontrolü.</strong> 30 dakika geçti: {answered}/
            {draft.items.length} soru yanıtlandı. {paceSummary(pace)}
          </p>
          <button
            className="secondary"
            aria-label="Hız kontrolü notunu kapat"
            onClick={() => {
              dismissedPaceNotes.add(draft.id);
              setPaceNoteClosed(true);
            }}
          >
            <X size={17} aria-hidden="true" />
            Kapat
          </button>
        </div>
      )}
      {error && (
        <div role="alert" className="panel exam-error">
          <p>{error}</p>
        </div>
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
            <span>{hidesSubject(draft.title) ? "Konu gizli (karma pratik)" : q.subjectName}</span>
            <StarBadge stars={questionStars(q.id)} />
          </div>
          {timersOn && pulse && !expired && (
            <div className={`exam-pulse${pulse.over ? " exam-pulse-over" : ""}`}>
              <p className="exam-pulse-line" aria-live="off">
                <Hourglass size={16} aria-hidden="true" />
                <span>
                  Bu soruya yazılan süre {spokenDuration(pulse.spentMs)} · soru başına referans{" "}
                  {spokenDuration(pulse.averageMs)}
                </span>
              </p>
              <div className="exam-pulse-bar" aria-hidden="true">
                <span style={{ width: `${Math.min(100, (pulse.ratio / 2) * 100)}%` }} />
                <i className="exam-pulse-mark exam-pulse-average" />
                <i className="exam-pulse-mark exam-pulse-limit" />
              </div>
              <p className="exam-pulse-warning" role="status">
                {pulse.over
                  ? "Bu soru için referans payını aştın. İstersen işaretleyip geçebilirsin."
                  : ""}
              </p>
            </div>
          )}
          {q.passage && (
            <section className="question-passage" aria-label="Sorunun metni">
              <p>{typeset(q.passage)}</p>
            </section>
          )}
          <h2 className="question-prompt" ref={questionHeading} tabIndex={-1}>
            {typeset(q.prompt)}
          </h2>
          {sourcePresentation?.figure && (
            <SourceQuestionFigure figure={sourcePresentation.figure} />
          )}
          <div className="exam-options">
            <AnswerOptions
              questionKey={q.id}
              key={q.id}
              variant="exam"
              options={q.options}
              selected={draft.answers[draft.index] ?? null}
              checked={false}
              answer={-1}
              busy={busy}
              label="Seçenekler"
              onSelect={(index) =>
                void change({ type: "answer", index: draft.index, value: index })
              }
              onEnter={() => {
                if (!busy && nextTarget !== null)
                  void change({ type: "index", index: nextTarget });
              }}
              onHint={() => {
                if (visibleHelpLevel < helpPanels(q).length + 1)
                  void change({ type: "help", index: draft.index, level: visibleHelpLevel + 1 });
              }}
            />
          </div>
          {(
            <GuidedQuestionHelp
              key={q.id}
              question={q}
              level={visibleHelpLevel}
              disabled={busy}
              onLevel={(level) =>
                void change({ type: "help", index: draft.index, level })
              }
            />
          )}
          <div className="exam-question-tools">
            <button
              className="text-button"
              disabled={busy || draft.answers[draft.index] === null}
              onClick={() =>
                void change({ type: "answer", index: draft.index, value: null })
              }
            >
              Yanıtı temizle · boş bırak
            </button>
            <button
              className="secondary"
              disabled={busy}
              aria-pressed={draft.flagged.includes(draft.index)}
              onClick={() => void change({ type: "flag", index: draft.index })}
            >
              <Flag size={17} aria-hidden="true" />
              {draft.flagged.includes(draft.index)
                ? "İşareti kaldır"
                : "Sonra bakmak için işaretle"}
            </button>
            {draft.flagged.length > 0 && (
              <button
                className="secondary"
                disabled={busy || flaggedTarget === null}
                aria-label={
                  flaggedTarget === null
                    ? "Sıradaki işaretli soru yok"
                    : `Sıradaki işaretli soru: ${flaggedTarget + 1}`
                }
                onClick={() => {
                  if (flaggedTarget !== null)
                    void change({ type: "index", index: flaggedTarget });
                }}
              >
                <Flag size={17} aria-hidden="true" />
                Sıradaki işaretli soru
                {flaggedTarget !== null && ` (${flaggedTarget + 1})`}
              </button>
            )}
          </div>
          <div className="exam-round" aria-label="2. tur">
            {round ? (
              <>
                <p className="exam-round-summary">
                  <strong>2. tur</strong>{" "}
                  {roundPosition >= 0
                    ? `· listede ${roundPosition + 1}/${round.length}`
                    : "· bu soru 2. tur listesinde değil"}{" "}
                  · işaretli {roundInfo.flagged} · boş {roundInfo.blank}
                  {timersOn && !expired && ` · kalan süre ${roundInfo.minutes} dk`}
                </p>
                <button
                  className="secondary"
                  disabled={busy}
                  onClick={endRound}
                >
                  Tüm sorulara dön
                </button>
              </>
            ) : (
              <>
                <p className="exam-round-summary">
                  İşaretli {roundInfo.flagged} · boş {roundInfo.blank}
                  {timersOn && !expired && ` · kalan süre ${roundInfo.minutes} dk`}
                </p>
                <button
                  className="secondary"
                  disabled={busy || roundCandidates.length === 0}
                  aria-label={
                    roundCandidates.length
                      ? `2. tur: işaretli ve boş ${roundCandidates.length} soru arasında gez`
                      : "2. tur için işaretli ya da boş soru yok"
                  }
                  onClick={startRound}
                >
                  <Repeat size={17} aria-hidden="true" />
                  2. tur
                </button>
              </>
            )}
            <p className="sr-only" aria-live="polite">
              {roundAnnouncement}
            </p>
          </div>
          <div className="exam-question-navigation">
            <button
              className="secondary"
              disabled={busy || previousTarget === null}
              onClick={() => {
                if (previousTarget !== null)
                  void change({ type: "index", index: previousTarget });
              }}
            >
              <ArrowLeft size={17} />
              {round ? "Önceki (2. tur)" : "Önceki soru"}
            </button>
            <button
              className="secondary"
              disabled={busy || nextTarget === null}
              onClick={() => {
                if (nextTarget !== null)
                  void change({ type: "index", index: nextTarget });
              }}
            >
              {round ? "Sonraki (2. tur)" : "Sonraki soru"}
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
            disabled={busy}
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
                disabled={busy}
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
function paceSummary(pace: NonNullable<ReturnType<typeof examPace>>) {
  const gap =
    pace.delta === 0
      ? "Hedef hızdasın."
      : pace.delta < 0
        ? `Hedef hızın ${-pace.delta} soru gerisindesin.`
        : `Hedef hızın ${pace.delta} soru ilerisindesin.`;
  return `Bu hızla süre bitiminde yaklaşık ${pace.projected} soru yanıtlanmış olur. ${gap}`;
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
  const { state } = useApp();
  const timersOn = state.settings.timers !== false;
  const slowest = timersOn ? slowestItems(session) : null;
  const overtimeMs = session.finishedAt - session.deadline;
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
          <p>Denemeyi bitirdin. {session.items.length} soru</p>
          {timersOn && (
            <>
              <p className="small muted">
                Geçen süre {spokenDuration(session.finishedAt - session.startedAt)}
                {" · "}Referans süre {duration(session.durationSeconds)}
                {overtimeMs >= 1_000 && ` · Ek süre ${spokenDuration(overtimeMs)}`}
              </p>
              {session.timedOut && overtimeMs === 0 && (
                <p className="small muted">
                  Bu kayıtta referans süre sonrasına ait süre bilgisi yok.
                </p>
              )}
            </>
          )}
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
      {timersOn && (
        <section className="panel exam-slowest" aria-labelledby="exam-slowest-title">
        <h2 id="exam-slowest-title">En çok zaman alan 5 soru</h2>
        {slowest === null ? (
          <p className="muted">
            Bu deneme soru başına süre kaydı eklenmeden önce kaydedildi; süre
            dağılımı gösterilemez.
          </p>
        ) : slowest.length === 0 ? (
          <p className="muted">Bu denemede ölçülen soru süresi yok.</p>
        ) : (
          <>
            <p className="small muted">
              Referans süre içinde soru başına eşit pay{" "}
              {spokenDuration((session.durationSeconds * 1000) / session.items.length)}.
              Soru süreleri bu aralıkta sorular arasında geçen zamandır.
              Uygulamadan uzak kaldığın zaman da bu kayda girer.
              Ek süre bu ölçüme dahil değildir.
            </p>
            <ol className="exam-slowest-list">
              {slowest.map((row) => (
                <li key={row.index} className={`exam-slowest-${row.status}`}>
                  <span>
                    <strong>{row.index + 1}. soru</strong> · {row.subject}
                  </span>
                  <span className="exam-slowest-facts">
                    <span className="exam-slowest-status">
                      {row.status === "correct" ? (
                        <Check size={15} aria-hidden="true" />
                      ) : row.status === "wrong" ? (
                        <X size={15} aria-hidden="true" />
                      ) : (
                        <Minus size={15} aria-hidden="true" />
                      )}
                      {row.status === "correct" ? "Doğru" : row.status === "wrong" ? "Yanlış" : "Boş"}
                    </span>
                    <span>{spokenDuration(row.ms)}</span>
                  </span>
                </li>
              ))}
            </ol>
          </>
        )}
        </section>
      )}
      <ExamInsights session={session} showOrderAccuracy={timersOn} />
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
                  <p>{typeset(q.passage)}</p>
                </section>
              )}
              <h3>{typeset(q.prompt)}</h3>
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
                <p>{typeset(q.explanation)}</p>
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
    <GuidedQuestionHelp
      question={question}
      level={level}
      onLevel={setLevel}
      reviewed
    />
  );
}
