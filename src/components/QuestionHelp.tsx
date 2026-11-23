import { typeset } from "../domain/typeset";
import { clarifiedQuestionView } from "../domain/questionPresentation";
import { ChevronDown, Footprints, Lightbulb } from "lucide-react";
import type { HelpQuestion, QuestionGuidance } from "../domain/questionHelpModel";
import { givenAndAsked, helpPanels, resolvedGuidance } from "../learning/questionHelp";
import "./questionHelp.css";
import { SourceQuestionFigure } from "../learning/SourceQuestionFigure";
import { sourceQuestionPresentation } from "../learning/sourceExercises024";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { hintFigureFor } from "../learning/sectionFigures/hintFigure";
import { tacticsFor } from "../learning/questionTactics";
const SectionFigure = lazy(() =>
  import("../learning/sectionFigures/registry").then((m) => ({ default: m.SectionFigure })),
);

/**
 * What "Çözümü kapat, benzerini bağımsız dene" can honestly offer here.
 * - ready: an unseen item of the same set opens with help closed (`onTry`).
 * - answer-first: this item still needs its own (assisted) answer first.
 * - none: no unseen similar item is available; the reason is shown as is.
 */
export type SimilarOffer =
  | { kind: "ready"; label: string; onTry: () => void }
  | { kind: "answer-first"; label: string }
  | { kind: "none"; reason: string };

type Panel = { title: string; paragraphs: string[] };
const STEP_TOPIC = [" · soru ne istiyor, temel kavramlar", " · verilenler ve yöntem seçimi"];

/*
 * Two ways to use this component:
 * - Raw (no `onSteps`): the historical progressive help. Each level opens the
 *   next panel and the last one the full solution. Kept for saved snapshots
 *   and for the catalogue checks that call this function directly.
 * - Guided (`onSteps` given, as the app does through GuidedQuestionHelp): an
 *   "İpucu" area that only ever shows the first panel, which never names the
 *   key, and below it a separate "Adım adım çözüm" panel that is opened on its
 *   own. Opening either is help: the parent records the level and the answer
 *   is no longer independent. Nothing here awards XP or trophies.
 */
export function QuestionHelp({
  question: originalQuestion,
  level,
  onLevel,
  disabled = false,
  reviewed = false,
  steps = false,
  onSteps,
  hidden = false,
  onHidden,
  shown,
  onShown,
  playing = false,
  onPlay,
  polish = false,
  similar,
}: {
  question: HelpQuestion;
  level: number;
  onLevel: (level: number) => void;
  disabled?: boolean;
  reviewed?: boolean;
  /** The step-by-step panel is open; only offered when the caller holds that state. */
  steps?: boolean;
  /** Opens (true) or collapses (false) the step-by-step panel. */
  onSteps?: (open: boolean) => void;
  /** The learner closed the full solution to try a similar item alone. */
  hidden?: boolean;
  onHidden?: (hidden: boolean) => void;
  /** Steps on screen in step mode; going back only hides, help stays recorded. */
  shown?: number;
  onShown?: (shown: number) => void;
  /** Replays the opened steps one by one (view only). */
  playing?: boolean;
  onPlay?: (playing: boolean) => void;
  /** Show display repairs and typesetting (the app does; raw checks do not). */
  polish?: boolean;
  /** What the close-and-retry action can offer on this screen. */
  similar?: SimilarOffer;
}) {
  const show = (text: string) => (polish ? typeset(text) : text);
  const question = clarifiedQuestionView(originalQuestion);
  const guidance = resolvedGuidance(question);
  const panels = helpPanels(question);
  const full = level > panels.length;
  const total = panels.length + 1;
  const sourcePresentation = sourceQuestionPresentation({ ...question, guidance });
  // The matching theory figure is shown with the first ("Bilmen gerekenler")
  // panel; it is omitted when the question already carries its own figure.
  const conceptFigure = sourcePresentation?.hintFigure ? undefined : hintFigureFor(question);
  const tactics = tacticsFor(question);
  const route = guidance ? thirtySecondRoute(guidance.strategy, guidance.check) : undefined;
  const evidence = !reviewed && (
    <p className="small help-evidence">Yardım alındı · bu soru bağımsız doğru olarak sayılmaz.</p>
  );
  const tacticsBlock = tactics.map((tactic) => (
    <div className="help-tactic" key={tactic.id}>
      <h4>Bu soru tipine yaklaşım: {tactic.title}</h4>
      <ol>
        {tactic.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  ));
  const conceptBlock = (label: string) =>
    conceptFigure && (
      <div className="help-concept-figure">
        <Suspense fallback={null}>
          <SectionFigure guideId={conceptFigure.guideId} title={conceptFigure.title} label={`${label}: ${conceptFigure.title}`} />
        </Suspense>
      </div>
    );
  const answerLine = (
    <>
      <p>
        <strong>Doğru yanıt: {String.fromCharCode(65 + question.answer)}</strong> · {show(question.options[question.answer])}
      </p>
      <p>{show(question.explanation)}</p>
      {sourcePresentation?.explanationFigure && <SourceQuestionFigure figure={sourcePresentation.explanationFigure} />}
    </>
  );

  if (!onSteps)
    // Called, not mounted: callers walk the returned tree to find its buttons.
    return RawHelp({
      level,
      onLevel,
      disabled,
      panels,
      guidance,
      show,
      tacticsBlock,
      conceptBlock: conceptBlock("Konu anlatımından"),
      hintFigure: sourcePresentation?.hintFigure && <SourceQuestionFigure figure={sourcePresentation.hintFigure} />,
      answerLine,
      evidence,
    });

  if (hidden)
    return (
      <div className="question-help is-guided">
        <p className="small help-closed" role="status">
          Çözüm kapatıldı.{" "}
          {reviewed ? "Yanıtın kaydedildi; çözümü açmak bu kaydı değiştirmez." : "Bu soru yardımlı kaydedildi."}{" "}
          {similar?.kind === "answer-first"
            ? `Önce bu soruyu kendi yanıtınla kontrol et; ardından ${similar.label} yardımsız açılır.`
            : similar?.kind === "ready"
              ? `Sıradaki benzer soru: ${similar.label}.`
              : similar?.kind === "none"
                ? similar.reason
                : ""}
        </p>
        <div className="help-closed-actions">
          {similar?.kind === "ready" && (
            <button type="button" className="secondary" disabled={disabled} onClick={similar.onTry}>
              Benzer soruyu yardımsız aç
            </button>
          )}
          <button type="button" className="text-button" onClick={() => onHidden?.(false)}>
            Çözümü yeniden göster
          </button>
        </div>
      </div>
    );

  const stepped = panels.length >= 2;
  // In step mode the learner may step back: fewer steps are shown, but the
  // recorded help level never decreases.
  const view = Math.max(1, Math.min(level, shown ?? level));
  const fullView = stepped ? view > panels.length : full;
  // Adım 1 repeats the hint, so the hint box gives way while steps are open.
  const hintInSteps = steps && stepped;
  const toggleSteps = () => {
    if (steps) {
      onSteps(false);
      return;
    }
    onSteps(true);
    // Opening is help. A card without a guide has no steps: its existing
    // explanation is the whole panel. After the hint, open the next step.
    const target = !stepped ? total : level === 0 ? 1 : level === 1 ? 2 : level;
    if (target > level) onLevel(target);
  };
  const retry = onHidden && (
    <div className="help-retry">
      <button
        type="button"
        className="secondary help-close"
        disabled={disabled && similar?.kind === "ready"}
        onClick={() => {
          onHidden(true);
          if (similar?.kind === "ready") similar.onTry();
        }}
      >
        {similar && similar.kind !== "none" ? "Çözümü kapat, benzerini bağımsız dene" : "Çözümü kapat"}
      </button>
      {similar && (
        <p className="small muted">
          {similar.kind === "ready"
            ? `${similar.label}: yardım kapalı açılır; doğru yanıtın bağımsız sayılır. Bu sorunun kaydı değişmez.`
            : similar.kind === "answer-first"
              ? `Önce bu soruyu yanıtla (yardımlı kaydedilir); kontrolden sonra ${similar.label} yardımsız açılır.`
              : similar.reason}
        </p>
      )}
    </div>
  );

  const stepSection = (panel: Panel, index: number) => {
    const current = index + 1 === view && !fullView;
    const split = index === 1 ? givenAndAsked(question.prompt) : undefined;
    const stepFigures = sourcePresentation?.stepFigures;
    const stepFigure = index === 0 && stepFigures
      ? sourcePresentation.hintFigure
      : stepFigures?.[index - 2];
    return (
      <section key={index} className={`help-step${current ? " is-current" : ""}`}>
        <span className="help-step-chip">
          Adım {index + 1} / {total}
          {STEP_TOPIC[index] ?? " · işlem"}
        </span>
        <h3 tabIndex={-1} data-step-heading="">
          {panel.title}
        </h3>
        {split && (split.given.length > 0 || split.asked.length > 0 || question.passage) && (
          <div className="help-givens" role="group" aria-label="Verilenler ve istenen">
            {question.passage && (
              <div className="help-given">
                <span className="help-tag">Verilen</span>
                <span>Soru kartındaki metin: önce onu oku, soruya onun içinden yanıt ver.</span>
              </div>
            )}
            {split.given.map((line, i) => (
              <div className="help-given" key={`g${i}`}>
                <span className="help-tag">Verilen</span>
                <span>{markNumbers(show(line))}</span>
              </div>
            ))}
            {split.asked.map((line, i) => (
              <div className="help-asked" key={`a${i}`}>
                <span className="help-tag">İstenen</span>
                <span>{show(line)}</span>
              </div>
            ))}
          </div>
        )}
        {index === 1 && !stepFigures && sourcePresentation?.figure && (
          <div className="help-setup-figure">
            <SourceQuestionFigure figure={sourcePresentation.figure} />
          </div>
        )}
        {panel.paragraphs.map((paragraph, i) => (
          <p key={i}>{show(paragraph)}</p>
        ))}
        {stepFigure && <SourceQuestionFigure figure={stepFigure} />}
        {index === 0 && tacticsBlock}
        {index === 1 && conceptBlock("Görsel kurulum")}
      </section>
    );
  };

  const finalSection = (
    <section className="help-full-solution help-step is-current" aria-label="Tam çözüm">
      <span className="help-step-chip">Final · çeldirici otopsisi ve konu özeti</span>
      <h3 tabIndex={-1} data-step-heading="">
        Tam çözüm
      </h3>
      {answerLine}
      {guidance && Autopsy({ question, guidance, show, route })}
    </section>
  );

  const stepBody = (
    <>
      <ol className="help-rail" aria-label="Çözüm adımları">
        {Array.from({ length: total }, (_, i) => {
          const n = i + 1;
          const opened = n <= level;
          return (
            <li key={n}>
              <button
                type="button"
                className={`help-rail-dot${n === view ? " is-current" : ""}${opened ? " is-open" : ""}`}
                disabled={!opened || disabled}
                aria-current={n === view ? "step" : undefined}
                aria-label={`${n === total ? "Final" : `Adım ${n}`}${opened ? "" : " (henüz açılmadı)"}`}
                onClick={() => onShown?.(n)}
              >
                {n === total ? "F" : n}
              </button>
            </li>
          );
        })}
      </ol>
      <p className="sr-only help-live" aria-live="polite" aria-atomic="true">
        {fullView ? "Final: tam çözüm, çeldirici otopsisi ve konu özeti" : `Adım ${view} / ${total}: ${panels[view - 1]?.title ?? ""}`}
      </p>
      <aside className="hint-box" aria-label="Çözüm rehberi">
        <div className="help-content">
          {panels.slice(0, view).map(stepSection)}
          {!fullView && !sourcePresentation?.stepFigures && sourcePresentation?.hintFigure && (
            <SourceQuestionFigure figure={sourcePresentation.hintFigure} />
          )}
          {fullView && finalSection}
          {fullView && retry}
          {evidence}
        </div>
      </aside>
      <div className="help-step-actions" role="group" aria-label="Adım adım çözüm">
        <button type="button" className="secondary" disabled={disabled || view <= 1} onClick={() => onShown?.(view - 1)}>
          Önceki adım
        </button>
        {!fullView && (
          <button
            type="button"
            className="secondary help-step-next help-next"
            disabled={disabled}
            onClick={() => {
              if (view < level) onShown?.(view + 1);
              else {
                onLevel(level + 1);
                onShown?.(level + 1);
              }
            }}
          >
            {view < panels.length ? "Sonraki adım" : "Son adım: tam çözüm"}
          </button>
        )}
        {!fullView && (
          <button
            type="button"
            className="text-button"
            disabled={disabled}
            onClick={() => {
              if (!full) onLevel(total);
              onShown?.(total);
            }}
          >
            Tüm adımları aç
          </button>
        )}
        {full && onPlay && (
          <button type="button" className="text-button" disabled={disabled} aria-pressed={playing} onClick={() => onPlay(!playing)}>
            {playing ? "Duraklat" : "Baştan oynat"}
          </button>
        )}
      </div>
    </>
  );

  // A card without a guide: say so plainly and show the explanation it has.
  const legacyBody = (
    <aside className="hint-box" aria-label="Çözüm rehberi">
      <div className="help-content">
        <p className="help-not-ready" role="note">
          Bu soruda adım adım çözüm henüz hazır değil. Aşağıda sorunun mevcut açıklaması var.
        </p>
        {full ? (
          <section className="help-full-solution" aria-label="Tam çözüm">
            <h3 tabIndex={-1} data-step-heading="">
              Tam çözüm
            </h3>
            {answerLine}
          </section>
        ) : (
          <button type="button" className="secondary help-legacy-open" disabled={disabled} onClick={() => onLevel(total)}>
            Mevcut açıklamayı göster
          </button>
        )}
        {full && retry}
        {evidence}
      </div>
    </aside>
  );

  return (
    <div className={`question-help is-guided${steps ? " is-stepping" : ""}`}>
      {panels.length > 0 && (
        <div className="help-hint-area">
          {level >= 1 && !hintInSteps && (
            <aside className="hint-box help-hint-box" aria-label="İpucu">
              <div className="help-content">
                <section>
                  <h3>{panels[0].title}</h3>
                  {panels[0].paragraphs.map((paragraph, i) => (
                    <p key={i}>{show(paragraph)}</p>
                  ))}
                  {tacticsBlock}
                  {conceptBlock("Konu anlatımından")}
                </section>
                {sourcePresentation?.hintFigure && !steps && <SourceQuestionFigure figure={sourcePresentation.hintFigure} />}
                {!steps && evidence}
              </div>
            </aside>
          )}
          {level >= 1 && hintInSteps && <p className="small muted help-hint-moved">İpucu, aşağıdaki çözümün 1. adımında duruyor.</p>}
          {level === 0 && (
            <button type="button" className="text-button help-next" disabled={disabled} onClick={() => onLevel(1)}>
              <Lightbulb size={18} aria-hidden="true" />
              İpucu al
            </button>
          )}
        </div>
      )}
      <section className={`help-solution${steps ? " is-open" : ""}`} aria-label="Adım adım çözüm">
        <button
          type="button"
          // While closed after the hint it is the next help action, like
          // "Sonraki adım" once open; both carry help-next for that reason.
          className={`text-button help-steps-start${!steps && (level >= 1 || panels.length === 0) ? " help-next" : ""}`}
          aria-expanded={steps}
          disabled={disabled && !steps}
          onClick={toggleSteps}
        >
          <Footprints size={18} aria-hidden="true" />
          Adım adım çözüm
          <ChevronDown size={16} aria-hidden="true" className="help-steps-chevron" />
        </button>
        {steps && level > 0 && (stepped ? stepBody : legacyBody)}
      </section>
    </div>
  );
}

function Autopsy({
  question,
  guidance,
  show,
  route,
}: {
  question: HelpQuestion;
  guidance: QuestionGuidance;
  show: (text: string) => string;
  route?: string;
}) {
  return (
    <>
      <h4>Çeldirici otopsisi: her şık neden doğru ya da yanlış?</h4>
      <ol className="help-autopsy">
        {guidance.optionReasons.map((reason, i) => (
          <li key={i} className={i === question.answer ? "is-key" : undefined}>
            <span className="help-autopsy-letter" aria-hidden="true">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="help-autopsy-body">
              <span className="help-autopsy-option">{show(question.options[i])}</span>
              <span>{show(reason)}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="help-route">
        <h4>Bu sorudan cebine kalan 1 dakikalık konu kuralı</h4>
        <ul>
          {guidance.knowledge.map((rule, i) => (
            <li key={i}>{show(rule)}</li>
          ))}
        </ul>
        {route && (
          <>
            <h4>30 saniyelik sınav kısayolu</h4>
            <p>{show(route)}</p>
          </>
        )}
      </div>
      <h4>Sık hata</h4>
      <p>{show(guidance.commonError)}</p>
      <h4>Sonucu kontrol et</h4>
      <p>{show(guidance.check)}</p>
    </>
  );
}

/** The historical progressive help (one panel per level, then the full solution). */
function RawHelp({
  level,
  onLevel,
  disabled,
  panels,
  guidance,
  show,
  tacticsBlock,
  conceptBlock,
  hintFigure,
  answerLine,
  evidence,
}: {
  level: number;
  onLevel: (level: number) => void;
  disabled: boolean;
  panels: Panel[];
  guidance?: QuestionGuidance;
  show: (text: string) => string;
  tacticsBlock: ReactNode;
  conceptBlock: ReactNode;
  hintFigure: ReactNode;
  answerLine: ReactNode;
  evidence: ReactNode;
}) {
  const full = level > panels.length;
  return (
    <div className="question-help">
      {level > 0 && (
        <aside className="hint-box" aria-label="Çözüm rehberi">
          <div className="help-content">
            {panels.slice(0, level).map((panel, index) => (
              <section key={index}>
                <h3>{panel.title}</h3>
                {panel.paragraphs.map((paragraph, i) => (
                  <p key={i}>{show(paragraph)}</p>
                ))}
                {index === 0 && tacticsBlock}
                {index === 0 && conceptBlock}
              </section>
            ))}
            {!full && hintFigure}
            {full && (
              <section className="help-full-solution" aria-label="Tam çözüm">
                <h3>Tam çözüm</h3>
                {answerLine}
                {guidance && (
                  <>
                    <h4>Şıkların mantığı</h4>
                    <ol type="A">
                      {guidance.optionReasons.map((reason, i) => (
                        <li key={i}>{show(reason)}</li>
                      ))}
                    </ol>
                    <h4>Sık hata</h4>
                    <p>{show(guidance.commonError)}</p>
                    <h4>Sonucu kontrol et</h4>
                    <p>{show(guidance.check)}</p>
                  </>
                )}
              </section>
            )}
            {evidence}
          </div>
        </aside>
      )}
      {!full && (
        <button type="button" className="text-button help-next" disabled={disabled} onClick={() => onLevel(level + 1)}>
          <Lightbulb size={18} aria-hidden="true" />
          {level === 0 && panels.length ? "İpucu al" : level < panels.length ? panels[level].title + " aç" : "Tam çözümü aç"}
        </button>
      )}
    </div>
  );
}

/** Numbers in a given sentence are marked so the data stands out (not by colour alone). */
function markNumbers(text: string): ReactNode {
  const parts = text.split(/(\d+(?:[.,]\d+)?)/);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

/** A short route from the guide's own strategy and check sentences. */
function thirtySecondRoute(strategy: string, check: string) {
  const first = (text: string) => text.split(/(?<=[.!?])\s/)[0]?.trim() ?? text;
  return `${first(strategy)} Son kontrol: ${first(check)}`;
}

type GuidedState = {
  id: string;
  /** null: follow the recorded level; true/false: the learner's own choice. */
  open: boolean | null;
  /** Level at which the learner collapsed the panel; a higher level reopens it. */
  closedAt: number;
  hidden: boolean;
  shown: number | undefined;
  playing: boolean;
};

/**
 * QuestionHelp with its view state: whether the step panel is open, which
 * step is on screen, replay and the closed solution. All of it is view state
 * only; it resets when another question appears and is never saved.
 */
export function GuidedQuestionHelp(
  props: Omit<ComponentProps<typeof QuestionHelp>, "steps" | "onSteps" | "hidden" | "onHidden" | "shown" | "onShown" | "playing" | "onPlay" | "polish">,
) {
  const id = props.question.id;
  const fresh: GuidedState = { id, open: null, closedAt: 0, hidden: false, shown: undefined, playing: false };
  const [state, setState] = useState(fresh);
  const current = state.id === id ? state : fresh;
  const panels = helpPanels(clarifiedQuestionView(props.question));
  const total = panels.length + 1;
  const level = props.level;
  // A recorded level beyond the hint means the solution was opened: show it.
  const beyondHint = level > Math.min(1, panels.length);
  const open = current.open === true || (current.open === null ? beyondHint : level > current.closedAt);
  const host = useRef<HTMLDivElement>(null);
  // Deadline for restoring focus after the learner's own action (the parent
  // may re-render a moment later, when the saved level arrives).
  const refocusUntil = useRef(0);
  const acted = () => {
    refocusUntil.current = Date.now() + 2000;
  };
  const set = (next: Partial<GuidedState>) => {
    acted();
    setState({ ...current, ...next });
  };
  // Replay: reveal the already opened steps one by one. View state only.
  useEffect(() => {
    if (!current.playing) return;
    const timer = setInterval(
      () =>
        setState((s) =>
          s.id !== id || !s.playing ? s : (s.shown ?? 1) >= total ? { ...s, playing: false } : { ...s, shown: (s.shown ?? 1) + 1 },
        ),
      2600,
    );
    return () => clearInterval(timer);
  }, [current.playing, id, total]);
  // When the control that was used disappears (for example "Son adım" at the
  // final), keep the keyboard in place by focusing the step now on screen.
  const viewKey = `${open}|${current.shown ?? level}|${level}|${current.hidden}`;
  useEffect(() => {
    const el = host.current;
    if (!el || Date.now() > refocusUntil.current) return;
    const active = document.activeElement;
    // Only when focus was lost; never pull it away from where the learner is.
    if (active && active !== document.body && active.isConnected) return;
    const target =
      el.querySelector<HTMLElement>(".help-step.is-current [data-step-heading]") ??
      el.querySelector<HTMLElement>("[data-step-heading]") ??
      el.querySelector<HTMLElement>("button:not(:disabled)");
    target?.focus({ preventScroll: true });
  }, [viewKey]);
  return (
    <div ref={host} className="question-help-host">
      <QuestionHelp
        {...props}
        onLevel={(next) => {
          acted();
          props.onLevel(next);
        }}
        polish
        steps={open}
        onSteps={(next) => (next ? set({ open: true, shown: undefined, hidden: false }) : set({ open: false, closedAt: level, playing: false }))}
        hidden={current.hidden}
        onHidden={(hidden) => set({ hidden, playing: false })}
        shown={current.shown}
        onShown={(shown) => set({ shown, playing: false })}
        playing={current.playing}
        onPlay={(playing) => setState({ ...current, playing, shown: playing ? 1 : current.shown })}
      />
    </div>
  );
}
