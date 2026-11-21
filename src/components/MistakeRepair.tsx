import { useState, type ReactNode } from "react";
import { CircleCheck, CircleDashed, CircleDot, CircleArrowDown } from "lucide-react";
import { useApp } from "../store";
import { formatDate } from "../domain/scheduler";
import { mistakeKey, mistakeReasons, type MistakeReason } from "../domain/mistakePatterns";
import type { RepairProgress } from "../domain/mistakeStatus";
import "./mistakeRepair.css";

/*
 * Mistake autopsy: tag why an answer went wrong, follow the three repair
 * stages and, if wanted, warm up with a closed-book retry. Tags and warm-up
 * retries are the learner's own notes in `explorations`; they are never
 * learning evidence and award no XP or mastery. The stages advance only from
 * answers saved through the normal exam flow (one-question rounds below).
 */
export { mistakeKey, mistakeReasons, type MistakeReason };

type StepState = "done" | "current" | "waiting" | "skipped";

const STEP_ICON = {
  done: CircleCheck,
  current: CircleDot,
  waiting: CircleDashed,
  skipped: CircleArrowDown,
} as const;

const STATE_TEXT: Record<StepState, string> = {
  done: "Tamam",
  current: "Sırada",
  waiting: "Bekliyor",
  skipped: "İkizsiz geçildi",
};

export function RepairStages({
  progress,
  questionId,
  today,
  busy,
  begin,
}: {
  progress: RepairProgress;
  questionId: string;
  today: string;
  busy: boolean;
  begin: (questionIds: string[]) => Promise<void>;
}) {
  const { state } = useApp();
  const [running, setRunning] = useState(false);
  const date = (day: string) => formatDate(day, state.settings.locale);
  const { stage, noTwin, twinId } = progress;
  const steps: { name: string; state: StepState; detail: string }[] = [
    {
      name: "Yeniden dene",
      state: stage > 1 ? "done" : "current",
      detail: progress.retry ? `Aynı soru yardımsız doğru · ${date(progress.retry.day)}` : "Aynı soruyu yardım açmadan doğru çöz.",
    },
    {
      name: "İkiz soru",
      state: noTwin ? (stage > 1 ? "skipped" : "waiting") : stage > 2 ? "done" : stage === 2 ? "current" : "waiting",
      detail: noTwin
        ? "Bu sette başka uygun soru yok. Aşama geçilmedi; ikizsiz olarak gecikmeli kontrole geçilir."
        : progress.twin
          ? `İkiz soru yardımsız doğru · ${date(progress.twin.day)}`
          : "Aynı setten daha önce doğru çözmediğin başka bir soru.",
    },
    {
      name: "Gecikmeli kontrol",
      state: stage === 4 ? "done" : stage === 3 ? "current" : "waiting",
      detail: progress.final
        ? `Kalıcı onarıldı · ${date(progress.final.day)}${noTwin ? " · ikizsiz" : ""}`
        : `${date(progress.checkDay)} ve sonrasında aynı soruyu ya da ikizini yardımsız doğru çöz.`,
    },
  ];
  const checkReady = today >= progress.checkDay;
  const action =
    stage === 1
      ? { ids: [questionId], label: "Aynı soruyu yeniden çöz" }
      : stage === 2 && twinId
        ? { ids: [twinId], label: "İkiz soruyu çöz" }
        : stage === 3 && checkReady
          ? { ids: [questionId], label: "Gecikmeli kontrolü başlat" }
          : undefined;
  const heading =
    stage === 4 ? "Üç aşama tamam: kalıcı onarıldı" : `Aşama ${stage} / 3: ${steps[stage - 1].name}`;
  return (
    <div className="repair-stages" role="group" aria-label="Onarım aşamaları">
      <p className="repair-stage-now">{heading}</p>
      <ol>
        {steps.map((step) => {
          const Icon = STEP_ICON[step.state];
          return (
            <li key={step.name} className={`repair-step is-${step.state}`} aria-current={step.state === "current" ? "step" : undefined}>
              <Icon size={20} aria-hidden="true" className="repair-step-icon" />
              <span className="repair-step-text">
                <span className="repair-step-name">
                  {step.name} <span className="repair-step-state">· {STATE_TEXT[step.state]}</span>
                </span>
                <span className="small muted">{step.detail}</span>
              </span>
            </li>
          );
        })}
      </ol>
      {action && (
        <div className="repair-action">
          <p className="small muted">
            Tek soruluk kayıtlı tur açılır. Yardım panelini açarsan cevap yardımlı sayılır ve aşama geçilmez.
          </p>
          <button
            type="button"
            className="secondary"
            disabled={busy || running}
            onClick={() => {
              setRunning(true);
              void begin(action.ids).finally(() => setRunning(false));
            }}
          >
            {action.label}
          </button>
          {busy && <p className="small muted">Önce devam eden denemeyi bitir.</p>}
        </div>
      )}
    </div>
  );
}

export function MistakeRepair({
  sessionId,
  questionId,
  options,
  answer,
  children,
}: {
  sessionId: string;
  questionId: string;
  options: string[];
  answer: number;
  children?: ReactNode;
}) {
  const { state, update } = useApp();
  const key = mistakeKey(sessionId, questionId);
  const saved = state.explorations[key] ?? {};
  const reason = typeof saved.reason === "string" ? (saved.reason as MistakeReason) : undefined;
  const [retrying, setRetrying] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);

  function save(changes: Record<string, string | number | boolean>) {
    void update((s) => ({
      ...s,
      explorations: { ...s.explorations, [key]: { ...(s.explorations[key] ?? {}), ...changes } },
    })).catch(() => {});
  }
  const info = mistakeReasons.find((r) => r.id === reason);

  return (
    <div className="mistake-repair">
      <fieldset className="mistake-reasons">
        <legend>Hata nedeni</legend>
        <div className="reason-chips">
          {mistakeReasons.map((r) => (
            <button
              key={r.id}
              type="button"
              aria-pressed={reason === r.id}
              className={reason === r.id ? "active" : ""}
              onClick={() => save({ reason: r.id })}
            >
              {r.label}
            </button>
          ))}
        </div>
        {info && <p className="small reason-advice">Onarım: {info.repair}</p>}
      </fieldset>
      {children}
      {!retrying ? (
        <button type="button" className="secondary" onClick={() => setRetrying(true)}>
          Kapatıp yeniden çöz
        </button>
      ) : (
        <div className="mistake-retry" role="group" aria-label="Yeniden çöz">
          <p className="small muted">
            Isınma: açıklamaya bakmadan seç. Bu deneme kaydedilmez, aşama geçirmez ve puan vermez.
          </p>
          {options.map((option, i) => (
            <button
              key={i}
              type="button"
              className={`retry-option ${picked === i ? (i === answer ? "retry-correct" : "retry-wrong") : ""}`}
              aria-pressed={picked === i}
              disabled={picked !== null && picked === answer}
              onClick={() => {
                setPicked(i);
                save({ retry: i === answer ? "dogru" : "yanlis" });
              }}
            >
              <span className="answer-letter">{String.fromCharCode(65 + i)}</span>
              <span>{option}</span>
            </button>
          ))}
          {picked !== null && (
            <p role="status" className={picked === answer ? "retry-msg ok" : "retry-msg"}>
              {picked === answer
                ? "Doğru. Aşamayı geçmek için aynı soruyu kayıtlı turda yardımsız çöz; ardından ikiz soru, yani aynı setten benzer bir soru gelir."
                : "Henüz değil. Açıklamayı oku, hata nedenini seç ve tekrar dene."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/** Counts of tagged reasons for the mistake map. */
export function mistakeMap(explorations: Record<string, Record<string, unknown>>, keys: string[]) {
  const counts = new Map<string, number>();
  let untagged = 0;
  for (const k of keys) {
    const r = explorations[k]?.reason;
    if (typeof r === "string") counts.set(r, (counts.get(r) ?? 0) + 1);
    else untagged++;
  }
  return { counts, untagged };
}
