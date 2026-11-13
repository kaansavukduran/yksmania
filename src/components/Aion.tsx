import { useEffect, useState } from "react";
import { useApp } from "../store";
// Source atlas is 1536×1024, 12 columns × 8 rows, 128×128 cells.
// Idle: row 0; celebrate: row 6. The source file is preserved without image edits.
export function Aion({
  celebrate = false,
  size = 192,
}: {
  celebrate?: boolean;
  size?: number;
}) {
  const { state } = useApp();
  const [frame, setFrame] = useState(0);
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const q = matchMedia("(prefers-reduced-motion: reduce)");
    const f = () => setReduced(q.matches);
    q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);
  useEffect(() => {
    setFrame(0);
    if (!state.settings.motion || reduced) return;
    let tick = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      if (timer) clearInterval(timer);
      if (document.hidden) return;
      timer = setInterval(
        () => {
          tick++;
          setFrame(celebrate ? Math.min(tick, 11) : Math.floor(tick / 2) % 12);
          if (celebrate && tick >= 12) {
            clearInterval(timer);
            timer = undefined;
            setFrame(0);
          }
        },
        celebrate ? 110 : 130,
      );
    };
    start();
    document.addEventListener("visibilitychange", start);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", start);
    };
  }, [celebrate, state.settings.motion, reduced]);
  const row = celebrate && frame > 0 ? 6 : 0;
  return (
    <div
      className="aion-sprite"
      role="img"
      aria-label="Aion"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${import.meta.env.BASE_URL}assets/aion-motion.png)`,
        backgroundSize: `${size * 12}px ${size * 8}px`,
        backgroundPosition: `-${frame * size}px -${row * size}px`,
      }}
    />
  );
}
