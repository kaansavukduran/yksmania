import { useEffect, useRef, useState, type ReactNode } from "react";
import { CheckCircle2, X } from "lucide-react";

/*
 * Answer choices with exam-paper habits: strike through options you have
 * ruled out, and keyboard shortcuts (1–5 or A–E select, H opens the next hint
 * step, Enter checks / moves on). Strikes are a pencil mark: they are kept only
 * while this question is on screen, never saved and never scored.
 */
export function AnswerOptions({
  options,
  selected,
  checked,
  answer,
  busy,
  label,
  onSelect,
  onEnter,
  onHint,
  variant = "practice",
  questionKey,
}: {
  options: ReactNode[];
  selected: number | null;
  checked: boolean;
  answer: number;
  busy: boolean;
  label: string;
  onSelect: (i: number) => void;
  onEnter: () => void;
  onHint?: () => void;
  /** Exams keep their own option styling (`exam-answer`, `selected`). */
  variant?: "practice" | "exam";
  /**
   * Identity of the question on screen. Strikes reset when it changes, even if
   * a caller reuses this component instead of keying it per question.
   */
  questionKey?: string | number;
}) {
  const [struck, setStruck] = useState<number[]>([]);
  const [strikeKey, setStrikeKey] = useState(questionKey);
  if (strikeKey !== questionKey) {
    setStrikeKey(questionKey);
    setStruck([]);
  }
  const letter = (i: number) => String.fromCharCode(65 + i);
  // The window listener is attached once; it reads the latest props here.
  const latest = useRef({ count: options.length, checked, busy, onSelect, onEnter, onHint });
  latest.current = { count: options.length, checked, busy, onSelect, onEnter, onHint };

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const { count, checked, busy, onSelect, onEnter, onHint } = latest.current;
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      const el = event.target as HTMLElement | null;
      if (el?.closest("input, textarea, select, [contenteditable='true'], canvas")) return;
      const key = event.key.toLocaleUpperCase("tr-TR");
      const digit = Number(event.key);
      const index =
        Number.isInteger(digit) && digit >= 1 && digit <= count
          ? digit - 1
          : key.length === 1 && key >= "A" && key < String.fromCharCode(65 + count)
            ? key.charCodeAt(0) - 65
            : -1;
      if (index >= 0 && key !== "H") {
        if (checked || busy) return;
        event.preventDefault();
        onSelect(index);
        return;
      }
      if (key === "H" && onHint) {
        event.preventDefault();
        onHint();
        return;
      }
      if (event.key === "Enter") {
        // A focused button already reacts to Enter natively.
        if (el?.closest("button, a, summary")) return;
        event.preventDefault();
        onEnter();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggleStrike(i: number) {
    setStruck((list) => (list.includes(i) ? list.filter((x) => x !== i) : [...list, i]));
  }

  return (
    <div className={variant === "exam" ? "exam-answers answer-options-exam" : "answer-options"} role="group" aria-label={label}>
      {options.map((option, i) => {
        const isStruck = struck.includes(i) && !checked;
        return (
          <div className="answer-row" key={i}>
            <button
              type="button"
              className={
                variant === "exam"
                  ? `exam-answer ${selected === i ? "selected" : ""} ${isStruck ? "answer-struck" : ""}`
                  : `answer ${selected === i ? "chosen" : ""} ${checked && i === answer ? "answer-correct" : ""} ${checked && selected === i && i !== answer ? "answer-wrong" : ""} ${isStruck ? "answer-struck" : ""}`
              }
              disabled={checked || busy}
              aria-pressed={selected === i}
              aria-keyshortcuts={`${i + 1} ${letter(i)}`}
              onClick={() => {
                if (struck.includes(i)) toggleStrike(i);
                onSelect(i);
              }}
            >
              <span className={variant === "exam" ? "exam-option-letter" : "answer-letter"}>{letter(i)}</span>
              <span>{option}</span>
              {checked && i === answer && <CheckCircle2 size={19} />}
            </button>
            {!checked && (
              <button
                type="button"
                className="answer-strike"
                aria-pressed={struck.includes(i)}
                aria-label={`${letter(i)} şıkkını ${struck.includes(i) ? "geri al" : "ele"}`}
                title={struck.includes(i) ? "Elemeyi geri al" : "Bu şıkkı ele (üstünü çiz)"}
                disabled={busy}
                onClick={() => toggleStrike(i)}
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        );
      })}
      <p className="small muted answer-keys">
        Kısayollar: 1–{options.length} veya A–{letter(options.length - 1)} şık seçer, H ipucunu açar, Enter onaylar. Şıkkın yanındaki çarpı düğmesiyle elediğin şıkkın üstünü çiz; elemeler kaydedilmez.
      </p>
    </div>
  );
}
