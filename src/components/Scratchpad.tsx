import { useEffect, useRef, useState } from "react";
import { Eraser, PencilLine, Trash2 } from "lucide-react";

/*
 * Offline scratch paper for working a question by hand (figures, sums,
 * diagrams). Mouse, pen and touch draw; nothing is saved or scored, and the
 * sheet is cleared when the question changes.
 */
export function Scratchpad() {
  const [open, setOpen] = useState(false);
  const [eraser, setEraser] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!open) return;
    const c = canvas.current;
    if (!c) return;
    const resize = () => {
      const rect = c.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      const prev = document.createElement("canvas");
      prev.width = c.width;
      prev.height = c.height;
      prev.getContext("2d")?.drawImage(c, 0, 0);
      c.width = Math.max(1, Math.round(rect.width * ratio));
      c.height = Math.max(1, Math.round(rect.height * ratio));
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(prev, 0, 0);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [open]);

  function point(event: React.PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }
  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx || !last.current) return;
    const p = point(event);
    ctx.globalCompositeOperation = eraser ? "destination-out" : "source-over";
    ctx.strokeStyle = getComputedStyle(event.currentTarget).color;
    ctx.lineWidth = eraser ? 18 : 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  }
  function clear() {
    const c = canvas.current;
    c?.getContext("2d")?.clearRect(0, 0, c.width, c.height);
  }

  return (
    <div className="scratchpad">
      <button
        type="button"
        className="secondary scratch-toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <PencilLine size={17} aria-hidden="true" />
        {open ? "Karalama kâğıdını kapat" : "Karalama kâğıdı"}
      </button>
      {open && (
        <div className="scratch-sheet">
          <div className="scratch-tools" role="toolbar" aria-label="Karalama araçları">
            <button type="button" aria-pressed={!eraser} onClick={() => setEraser(false)}>
              <PencilLine size={16} aria-hidden="true" /> Kalem
            </button>
            <button type="button" aria-pressed={eraser} onClick={() => setEraser(true)}>
              <Eraser size={16} aria-hidden="true" /> Silgi
            </button>
            <button type="button" onClick={clear}>
              <Trash2 size={16} aria-hidden="true" /> Temizle
            </button>
          </div>
          <canvas
            ref={canvas}
            className="scratch-canvas"
            role="img"
            aria-label="Karalama kâğıdı: fare, kalem veya parmakla çiz. Kaydedilmez."
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              last.current = point(event);
            }}
            onPointerMove={draw}
            onPointerUp={() => (last.current = null)}
            onPointerCancel={() => (last.current = null)}
          />
          <p className="small muted">Karalama kaydedilmez; soru değişince silinir.</p>
        </div>
      )}
    </div>
  );
}
