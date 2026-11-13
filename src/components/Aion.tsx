import { useEffect, useState } from "react";
import { useApp } from "../store";
// Cartoon atlas: 1536×1024, 4×2 cells, 384×512 each. Authored facing left.
const idle = [...Array<number>(18).fill(0), 1, 2, 3];
const success = [4, 4, 5, 5, 6, 6, 6, 5, 7, 7];
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
    const listener = () => setReduced(q.matches);
    q.addEventListener("change", listener);
    return () => q.removeEventListener("change", listener);
  }, []);
  useEffect(() => {
    setFrame(0);
    if (!state.settings.motion || reduced) return;
    let tick = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    let finished = false;
    const start = () => {
      clearInterval(timer);
      if (document.hidden || finished) return;
      timer = setInterval(() => {
        const clip = celebrate ? success : idle;
        if (celebrate && tick >= clip.length) {
          setFrame(0);
          finished = true;
          clearInterval(timer);
          return;
        }
        setFrame(clip[tick % clip.length]);
        tick++;
      }, 120);
    };
    start();
    document.addEventListener("visibilitychange", start);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", start);
    };
  }, [celebrate, state.settings.motion, reduced]);
  const height = (size * 4) / 3;
  return (
    <div
      className="aion-sprite"
      role="img"
      aria-label="Aion"
      data-frame={frame}
      data-facing="left"
      style={{
        width: size,
        height,
        backgroundImage: `url(${import.meta.env.BASE_URL}assets/aion-cartoon.png)`,
        backgroundSize: `${size * 4}px ${height * 2}px`,
        backgroundPosition: `-${(frame % 4) * size}px -${Math.floor(frame / 4) * height}px`,
      }}
    />
  );
}
