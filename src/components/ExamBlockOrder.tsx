import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { EXAM_BLOCKS, moveBlock } from "../domain/examOrder";
import "./examBlockOrder.css";

/**
 * Karma deneme başlamadan önce ders bloklarının sırası. Yukarı/aşağı
 * düğmeleriyle, klavyeyle tam kullanılır; sürükleme gerekmez.
 */
export function ExamBlockOrder({
  exam,
  order,
  disabled,
  onChange,
}: {
  exam: "TYT" | "AYT";
  order: readonly string[];
  disabled?: boolean;
  onChange: (order: string[]) => void;
}) {
  const blocks = EXAM_BLOCKS[exam];
  const [announcement, setAnnouncement] = useState("");
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const pendingFocus = useRef<string | null>(null);
  useEffect(() => {
    const key = pendingFocus.current;
    if (!key) return;
    pendingFocus.current = null;
    const [id, direction] = key.split(":");
    const target = buttons.current.get(key),
      other = buttons.current.get(`${id}:${direction === "up" ? "down" : "up"}`);
    (target && !target.disabled ? target : other)?.focus();
  }, [order]);
  const move = (id: string, direction: -1 | 1) => {
    const next = moveBlock(order, id, direction);
    pendingFocus.current = `${id}:${direction === -1 ? "up" : "down"}`;
    const label = blocks.find((b) => b.id === id)?.label ?? id;
    setAnnouncement(`${label} ${next.indexOf(id) + 1}. sıraya taşındı.`);
    onChange(next);
  };
  return (
    <fieldset className="exam-block-order" disabled={disabled}>
      <legend>Ders sırası</legend>
      <p className="small muted">Denemeyi hangi dersle başlatacağını seç; soru sayıları değişmez.</p>
      <ol>
        {order.map((id, index) => {
          const block = blocks.find((b) => b.id === id);
          if (!block) return null;
          return (
            <li key={id}>
              <span>
                <span className="exam-block-place">{index + 1}.</span> {block.label}
              </span>
              <span className="exam-block-actions">
                <button
                  type="button"
                  className="secondary"
                  ref={(node) => {
                    if (node) buttons.current.set(`${id}:up`, node);
                    else buttons.current.delete(`${id}:up`);
                  }}
                  disabled={index === 0}
                  aria-label={`${block.label} bloğunu yukarı taşı`}
                  onClick={() => move(id, -1)}
                >
                  <ArrowUp size={17} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="secondary"
                  ref={(node) => {
                    if (node) buttons.current.set(`${id}:down`, node);
                    else buttons.current.delete(`${id}:down`);
                  }}
                  disabled={index === order.length - 1}
                  aria-label={`${block.label} bloğunu aşağı taşı`}
                  onClick={() => move(id, 1)}
                >
                  <ArrowDown size={17} aria-hidden="true" />
                </button>
              </span>
            </li>
          );
        })}
      </ol>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </fieldset>
  );
}
