import { describe, expect, it, vi, beforeEach } from "vitest";
import type { ReactElement, ReactNode } from "react";

/*
 * AnswerOptions without a DOM: React's hooks are replaced by a tiny harness so
 * the component can be rendered as a function, re-rendered with new props and
 * its keyboard listener driven directly.
 */
const h = vi.hoisted(() => ({
  states: [] as unknown[],
  refs: [] as { current: unknown }[],
  effects: [] as { deps?: unknown[]; cleanup?: void | (() => void) }[],
  i: 0,
  r: 0,
  e: 0,
  dirty: false,
}));
vi.mock("react", async (original) => {
  const actual = await original<typeof import("react")>();
  const useState = (init: unknown) => {
    const idx = h.i++;
    if (h.states.length <= idx) h.states[idx] = typeof init === "function" ? (init as () => unknown)() : init;
    const set = (value: unknown) => {
      h.states[idx] = typeof value === "function" ? (value as (v: unknown) => unknown)(h.states[idx]) : value;
      h.dirty = true;
    };
    return [h.states[idx], set];
  };
  const useRef = (init: unknown) => {
    const idx = h.r++;
    h.refs[idx] ??= { current: init };
    return h.refs[idx];
  };
  const useEffect = (fn: () => void | (() => void), deps?: unknown[]) => {
    const idx = h.e++;
    const prev = h.effects[idx];
    if (prev && deps && prev.deps && deps.length === prev.deps.length && deps.every((d, k) => Object.is(d, prev.deps![k]))) return;
    if (typeof prev?.cleanup === "function") prev.cleanup();
    h.effects[idx] = { deps, cleanup: fn() };
  };
  return { ...actual, default: actual, useState, useRef, useEffect };
});

import { AnswerOptions } from "../src/components/AnswerOptions";

type Props = Parameters<typeof AnswerOptions>[0];
type El = ReactElement<{ children?: ReactNode; className?: string; type?: string; onClick?: () => void; "aria-label"?: string }>;
function render(props: Props) {
  let tree: ReactNode;
  for (let pass = 0; pass < 5; pass++) {
    h.i = h.r = h.e = 0;
    h.dirty = false;
    tree = AnswerOptions(props);
    if (!h.dirty) break;
  }
  return tree;
}
function all(node: unknown): El[] {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(all);
  const el = node as El;
  return [el, ...all(el.props?.children)];
}
const buttons = (tree: ReactNode) => all(tree).filter((n) => n.type === "button");
const base = (over: Partial<Props> = {}): Props => ({
  options: ["bir", "iki", "üç"],
  selected: null,
  checked: false,
  answer: 1,
  busy: false,
  label: "Soru",
  onSelect: () => {},
  onEnter: () => {},
  questionKey: "q1",
  ...over,
});

let add: ReturnType<typeof vi.fn>;
let remove: ReturnType<typeof vi.fn>;
beforeEach(() => {
  h.states = [];
  h.refs = [];
  h.effects = [];
  add = vi.fn();
  remove = vi.fn();
  vi.stubGlobal("window", { addEventListener: add, removeEventListener: remove });
});

describe("AnswerOptions (052)", () => {
  it("attaches the keyboard listener once and always calls the latest callbacks", () => {
    const first = vi.fn();
    const latest = vi.fn();
    render(base({ onSelect: first }));
    render(base({ onSelect: first, selected: 0 }));
    render(base({ onSelect: latest, selected: 2 }));
    expect(add).toHaveBeenCalledTimes(1);
    expect(remove).not.toHaveBeenCalled();
    const handler = add.mock.calls[0][1] as (e: unknown) => void;
    const event = { key: "2", target: null, defaultPrevented: false, altKey: false, ctrlKey: false, metaKey: false, preventDefault: vi.fn() };
    handler(event);
    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledWith(1);
  });
  it("every button is type=button so no form is ever submitted", () => {
    const list = buttons(render(base()));
    expect(list.length).toBe(6);
    expect(list.every((b) => b.props.type === "button")).toBe(true);
  });
  it("struck options reset by themselves when the question changes", () => {
    let tree = render(base());
    const strike = buttons(tree).find((b) => b.props["aria-label"] === "B şıkkını ele")!;
    strike.props.onClick!();
    tree = render(base());
    expect(buttons(tree).filter((b) => b.props.className?.includes("answer-struck"))).toHaveLength(1);
    // Same component instance, another question: no key from the parent needed.
    tree = render(base({ questionKey: "q2" }));
    expect(buttons(tree).filter((b) => b.props.className?.includes("answer-struck"))).toHaveLength(0);
    expect(add).toHaveBeenCalledTimes(1);
  });
});
