import { useEffect, useRef, useState } from "react";
import { Eraser, PencilLine, Trash2, Undo2 } from "lucide-react";

/*
 * Offline scratch paper for working a question by hand (figures, sums,
 * diagrams). Mouse, pen and touch draw; nothing is saved or scored. Closing
 * the panel only hides it, so the drawing stays in the hidden canvas until
 * the question changes: a new `questionKey` clears it here, even when the
 * parent reuses this component instead of keying it per question.
 */
const UNDO_LIMIT = 20;
const WIDTHS = { ince: 2, kalın: 5 } as const;
type Width = keyof typeof WIDTHS;

export function Scratchpad({ questionKey }: { questionKey?: string | number } = {}) {
  const [open, setOpen] = useState(false);
  const [eraser, setEraser] = useState(false);
  const [width, setWidth] = useState<Width>("ince");
  const [undoCount, setUndoCount] = useState(0);
  const canvas = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const ink = useRef("#000");
  const history = useRef<ImageData[]>([]);
  const drawnFor = useRef(questionKey);

  // Another question: wipe the sheet and its undo history.
  useEffect(() => {
    if (drawnFor.current === questionKey) return;
    drawnFor.current = questionKey;
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (c && ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.restore();
    }
    history.current = [];
    setUndoCount(0);
    last.current = null;
  }, [questionKey]);

  useEffect(() => {
    if (!open) return;
    const c = canvas.current;
    if (!c) return;
    const resize = () => {
      const rect = c.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      const ratio = window.devicePixelRatio || 1;
      const w = Math.max(1, Math.round(rect.width * ratio));
      const h = Math.max(1, Math.round(rect.height * ratio));
      if (c.width === w && c.height === h) return;
      const prev = document.createElement("canvas");
      prev.width = c.width;
      prev.height = c.height;
      prev.getContext("2d")?.drawImage(c, 0, 0);
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(prev, 0, 0);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      // Snapshots are in device pixels of the old size; drop them.
      history.current = [];
      setUndoCount(0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [open]);

  function context() {
    return canvas.current?.getContext("2d") ?? null;
  }
  function point(event: React.PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }
  function snapshot() {
    const c = canvas.current;
    const ctx = context();
    if (!c || !ctx) return;
    history.current.push(ctx.getImageData(0, 0, c.width, c.height));
    if (history.current.length > UNDO_LIMIT) history.current.shift();
    setUndoCount(history.current.length);
  }
  function start(event: React.PointerEvent<HTMLCanvasElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    // Read the theme colour once per stroke, not on every move.
    ink.current = getComputedStyle(event.currentTarget).color;
    snapshot();
    last.current = point(event);
  }
  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = context();
    if (!ctx || !last.current) return;
    const p = point(event);
    ctx.globalCompositeOperation = eraser ? "destination-out" : "source-over";
    ctx.strokeStyle = ink.current;
    ctx.lineWidth = eraser ? 18 : WIDTHS[width];
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
    const ctx = context();
    if (!c || !ctx) return;
    snapshot();
    // Clear in device pixels regardless of the drawing transform.
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.restore();
  }
  function undo() {
    const ctx = context();
    const image = history.current.pop();
    if (!ctx || !image) return;
    ctx.putImageData(image, 0, 0);
    setUndoCount(history.current.length);
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
      <div className="scratch-sheet" hidden={!open}>
        <div className="scratch-tools" role="toolbar" aria-label="Karalama araçları">
          <button type="button" aria-pressed={!eraser} onClick={() => setEraser(false)}>
            <PencilLine size={16} aria-hidden="true" /> Kalem
          </button>
          <button type="button" aria-pressed={eraser} onClick={() => setEraser(true)}>
            <Eraser size={16} aria-hidden="true" /> Silgi
          </button>
          {(Object.keys(WIDTHS) as Width[]).map((w) => (
            <button key={w} type="button" aria-pressed={!eraser && width === w} onClick={() => { setWidth(w); setEraser(false); }}>
              <span className={`scratch-width scratch-width-${w === "ince" ? "thin" : "thick"}`} aria-hidden="true" />
              {w === "ince" ? "İnce" : "Kalın"}
            </button>
          ))}
          <button type="button" onClick={undo} disabled={undoCount === 0}>
            <Undo2 size={16} aria-hidden="true" /> Geri al
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
          onPointerDown={start}
          onPointerMove={draw}
          onPointerUp={() => (last.current = null)}
          onPointerCancel={() => (last.current = null)}
        />
        <p className="small muted">Karalama kaydedilmez. Paneli kapatınca saklanır; soru değişince silinir.</p>
      </div>
    </div>
  );
}
