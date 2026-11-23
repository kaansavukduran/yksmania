import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "../store";
import atlas from "../data/aion-pixel-atlas.json";
import textureUrl from "../assets/aion-pixel.png";
const idle = [...Array<number>(18).fill(0), 1, 2, 3, 4, 5, 6, 7];
const clips = {
  wave: [16, 17, 18, 17, 18, 19],
  think: [20, 21, 21, 22, 22, 23],
  happy: [24, 25, 26, 26, 27],
  stretch: [28, 29, 30, 30, 31],
};
type Action = keyof typeof clips;
const labels: Record<Action, string> = {
  wave: "Aion el sallıyor.",
  think: "Aion düşünüyor.",
  happy: "Aion seviniyor.",
  stretch: "Aion esniyor.",
};
export function Aion({
  celebrate = false,
  size = 192,
}: {
  celebrate?: boolean;
  size?: number;
}) {
  const { state } = useApp();
  const root = useRef<HTMLButtonElement>(null);
  const counter = useRef(0),
    lastAction = useRef<Action | undefined>(undefined);
  const playhead = useRef({ token: 0, tick: 0 });
  const [frame, setFrame] = useState(0),
    [gaze, setGaze] = useState<number | null>(null);
  const [reaction, setReaction] = useState<{
    action: Action;
    token: number;
  } | null>(null);
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [visible, setVisible] = useState(true),
    [pageActive, setPageActive] = useState(() => !document.hidden);
  const allowed = state.settings.motion && !reduced;
  useEffect(() => {
    const q = matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReduced(q.matches),
      visibility = () => setPageActive(!document.hidden);
    q.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver((entries) =>
      setVisible(entries[0]?.isIntersecting ?? false),
    );
    if (root.current) observer.observe(root.current);
    return () => {
      q.removeEventListener("change", motion);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
    };
  }, []);
  const act = useCallback(
    (action: Action) => {
      if (!allowed || document.hidden) return;
      lastAction.current = action;
      setReaction({ action, token: ++counter.current });
    },
    [allowed],
  );
  useEffect(() => {
    if (celebrate) act("happy");
  }, [celebrate, act]);
  useEffect(() => {
    if (!allowed) {
      setFrame(0);
      setReaction(null);
      playhead.current = { token: 0, tick: 0 };
      return;
    }
    const token = reaction?.token ?? 0;
    if (playhead.current.token !== token) {
      playhead.current = { token, tick: 0 };
      setFrame(0);
    }
    if (!visible || !pageActive) return;
    const sequence = reaction ? clips[reaction.action] : idle;
    const timer = setInterval(
      () => {
        if (reaction && playhead.current.tick >= sequence.length) {
          setReaction(null);
          setFrame(0);
          return;
        }
        setFrame(sequence[playhead.current.tick % sequence.length]);
        playhead.current.tick++;
      },
      reaction ? 160 : 150,
    );
    return () => clearInterval(timer);
  }, [allowed, visible, pageActive, reaction]);
  useEffect(() => {
    if (!allowed || !visible || !pageActive) {
      setGaze(null);
      return;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const b = root.current?.getBoundingClientRect();
      if (!b) return;
      const dx = e.clientX - (b.x + b.width * 0.35),
        dy = e.clientY - (b.y + b.height * 0.35);
      const sector = Math.round(Math.atan2(dy, dx) / (Math.PI / 4));
      const direction: Record<number, number> = {
        "-4": 11,
        "-3": 8,
        "-2": 9,
        "-1": 10,
        "0": 13,
        "1": 15,
        "2": 14,
        "3": 14,
        "4": 11,
      };
      setGaze(Math.abs(dx) + Math.abs(dy) < 25 ? 12 : direction[sector]);
      clearTimeout(timer);
      timer = setTimeout(() => setGaze(null), 1100);
    };
    const leave = () => setGaze(null);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", leave);
      clearTimeout(timer);
    };
  }, [allowed, visible, pageActive]);
  const shown = allowed ? (reaction ? frame : (gaze ?? frame)) : 0;
  const anchor = atlas.frames[shown];
  const cell = atlas.width / atlas.columns;
  return (
    <button
      type="button"
      ref={root}
      className="aion-companion"
      aria-label="Aion ile etkileş"
      disabled={!allowed}
      style={{ width: size }}
      title={
        allowed
          ? "Aion'a dokun: el sallar, düşünür, sevinir veya esner."
          : "Aion animasyonu kapalı."
      }
      onClick={() => {
        const choices = (Object.keys(clips) as Action[]).filter(
          (a) => a !== lastAction.current,
        );
        act(choices[Math.floor(Math.random() * choices.length)]);
      }}
    >
      <span
        className="aion-sprite"
        role="img"
        aria-label="Aion"
        data-frame={shown}
        data-facing="left"
        data-gaze={gaze ?? "idle"}
        data-reaction={allowed ? (reaction?.action ?? "idle") : "off"}
        style={{ aspectRatio: "1" }}
      >
        <span
          className="aion-texture"
          style={{
            backgroundImage: `url("${textureUrl}")`,
            width: `${atlas.columns * 100}%`,
            height: `${atlas.rows * 100}%`,
            left: `${(-(shown % atlas.columns) + anchor.x / cell) * 100}%`,
            top: `${(-Math.floor(shown / atlas.columns) + anchor.y / cell) * 100}%`,
          }}
        />
      </span>
      <span className="sr-only" aria-live="polite">
        {allowed && reaction ? labels[reaction.action] : ""}
      </span>
    </button>
  );
}
