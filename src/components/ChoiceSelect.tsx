import { useLayoutEffect, useRef, useState, type SelectHTMLAttributes } from "react";

/*
 * Choice chips in place of a drop-down. The options are shown directly as
 * tappable chips (side by side, wrapping), so nothing has to be opened first.
 * The native <select> stays in the page as the single source of truth: it is
 * transparent and laid over the chips, keeps its label, value and change
 * events, and remains the control that keyboards and screen readers use (its
 * focus ring is drawn on the chip group). Chips mirror it for pointer use.
 * Very long lists (more than MAX_CHIPS options) keep the regular drop-down.
 */
const MAX_CHIPS = 12;

interface Opt {
  value: string;
  label: string;
  disabled: boolean;
  /** Empty "choose…" prompt: not a real answer, so no chip is drawn for it. */
  placeholder: boolean;
}

function readOptions(select: HTMLSelectElement): Opt[] {
  return Array.from(select.options).map((o) => ({
    value: o.value,
    label: o.textContent ?? o.value,
    disabled: o.disabled,
    // An empty value is never a real answer in this app: it is the
    // "choose…" prompt. Data, not wording, decides (no label regex).
    placeholder: o.value === "",
  }));
}
const same = (a: Opt[], b: Opt[]) =>
  a.length === b.length &&
  a.every((o, i) => o.value === b[i].value && o.label === b[i].label && o.disabled === b[i].disabled && o.placeholder === b[i].placeholder);

export function ChoiceSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  const ref = useRef<HTMLSelectElement>(null);
  const [opts, setOpts] = useState<Opt[]>([]);
  const [current, setCurrent] = useState<string>("");

  // Read the options once, then only when the option list itself changes.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const next = readOptions(el);
      setOpts((prev) => (same(prev, next) ? prev : next));
      setCurrent(el.value);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(el, { childList: true, subtree: true, characterData: true, attributes: true });
    return () => observer.disconnect();
  }, []);
  // A controlled value can change without any option changing.
  useLayoutEffect(() => {
    if (ref.current) setCurrent(ref.current.value);
  }, [props.value]);

  const chips = opts.length > 0 && opts.length <= MAX_CHIPS && !props.multiple;

  function pick(value: string) {
    const el = ref.current;
    if (!el || props.disabled || el.value === value) return;
    // Use the native setter so React's onChange sees a real change event.
    const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")?.set;
    setter?.call(el, value);
    el.dispatchEvent(new Event("change", { bubbles: true }));
    setCurrent(el.value);
  }

  // One stable tree in both modes, so the native select is never remounted.
  return (
    <span className={chips ? `choice-select${props.disabled ? " is-disabled" : ""}` : "choice-select is-plain"}>
      {chips && (
        <span className="choice-chips" aria-hidden="true">
          {opts.filter((o) => !o.placeholder).map((o) => (
            <span
              key={o.value}
              className={`choice-chip${o.value === current ? " is-selected" : ""}${o.disabled ? " is-disabled" : ""}`}
              onClick={() => !o.disabled && pick(o.value)}
            >
              {o.label}
            </span>
          ))}
        </span>
      )}
      <select
        key="native"
        ref={ref}
        {...props}
        className={chips ? `choice-native${props.className ? ` ${props.className}` : ""}` : props.className}
        onChange={(e) => {
          setCurrent(e.currentTarget.value);
          props.onChange?.(e);
        }}
      />
    </span>
  );
}
