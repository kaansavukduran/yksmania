import { NarrativeModels } from "./NarrativeModels";
import { useId } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { narrativeById } from "./narratives";
import type { DiagramKind } from "./narratives/types";
import { useExploration } from "./useExploration";
import { clampInt } from "./mathModels";

function Pictogram({ kind, symbol }: { kind: DiagramKind; symbol?: string }) {
  if (symbol)
    return (
      <>
        <circle
          r="34"
          fill="var(--surface)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text y="6" textAnchor="middle" fill="var(--text)" fontSize="17">
          {symbol}
        </text>
      </>
    );
  if (kind === "cell" || kind === "nucleus")
    return (
      <>
        <ellipse
          rx="43"
          ry="29"
          fill="var(--surface)"
          stroke="currentColor"
          strokeWidth="3"
        />
        {kind === "nucleus" ? (
          <>
            <circle
              r="16"
              fill="var(--surface-2)"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M-8-6Q8-14 7 0T-8 6" fill="none" stroke="currentColor" />
          </>
        ) : (
          <>
            <path
              d="M-12-7Q15-14 14 2T-15 9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            {[-25, 25].map((x) => (
              <circle key={x} cx={x} cy="9" r="3" fill="currentColor" />
            ))}
          </>
        )}
      </>
    );
  if (kind === "water")
    return (
      <>
        <circle
          r="17"
          fill="var(--surface)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M-14 10L-30 24M14 10L30 24"
          stroke="currentColor"
          strokeWidth="3"
        />
        <circle
          cx="-32"
          cy="27"
          r="10"
          fill="var(--surface)"
          stroke="currentColor"
        />
        <circle
          cx="32"
          cy="27"
          r="10"
          fill="var(--surface)"
          stroke="currentColor"
        />
        <text y="5" textAnchor="middle" fill="var(--text)" fontSize="12">
          O
        </text>
        <text
          x="-32"
          y="31"
          textAnchor="middle"
          fill="var(--text)"
          fontSize="9"
        >
          H
        </text>
        <text x="32" y="31" textAnchor="middle" fill="var(--text)" fontSize="9">
          H
        </text>
      </>
    );
  if (kind === "plant")
    return (
      <>
        <path
          d="M0 32V-12M0 0Q-35 0-28-25Q0-28 0 0M0 9Q36 7 28-19Q0-16 0 9M0 32L-12 40M0 32L12 40"
          fill="var(--surface)"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path d="M-40 40H40" stroke="currentColor" />
      </>
    );
  if (kind === "sample")
    return (
      <>
        <path
          d="M-18-33H18M-14-33V14Q-14 35 0 35T14 14V-33"
          fill="var(--surface)"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M-13 6H13V16Q13 33 0 33T-13 16Z"
          fill="currentColor"
          opacity="0.35"
        />
      </>
    );
  if (kind === "chart")
    return (
      <>
        <path
          d="M-35-35V34H38"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        {[15, 35, 55].map((h, i) => (
          <rect
            key={h}
            x={-23 + i * 20}
            y={30 - h}
            width="11"
            height={h}
            fill="currentColor"
            opacity={0.5 + i * 0.2}
          />
        ))}
      </>
    );
  if (kind === "energy")
    return (
      <path
        d="M2-35L-26 6H-3L-9 35L27-9H5L12-35Z"
        fill="var(--surface)"
        stroke="currentColor"
        strokeWidth="3"
      />
    );
  if (kind === "document" || kind === "number")
    return (
      <>
        <rect
          x="-28"
          y="-35"
          width="56"
          height="70"
          rx="4"
          fill="var(--surface)"
          stroke="currentColor"
          strokeWidth="2"
        />
        {[-17, 0, 17].map((y) => (
          <path
            key={y}
            d={`M-18 ${y}H18`}
            stroke="currentColor"
            strokeWidth="3"
          />
        ))}
      </>
    );
  return (
    <>
      <path
        d="M-28 17L0-20L30 17Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      {[
        [-28, 17],
        [0, -20],
        [30, 17],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="13"
          fill="var(--surface)"
          stroke="currentColor"
          strokeWidth="2"
        />
      ))}
    </>
  );
}
export function NarrativeExplorer({ id }: { id: string }) {
  const pack = narrativeById.get(id)!;
  const [saved, set] = useExploration(`walk:${id}`, { scenario: 0, step: 0 });
  const scenario = clampInt(saved.scenario, 0, pack.cases.length - 1);
  const current = pack.cases[scenario];
  const step = clampInt(saved.step, 0, current.nodes.length - 1);
  const marker = useId().replace(/:/g, "");
  const positions = current.nodes.map((_, i) => ({
    x: (Math.floor(i / 2) % 2 === 0 ? i % 2 : 1 - (i % 2)) ? 390 : 130,
    y: 65 + Math.floor(i / 2) * 150,
  }));
  const height = Math.ceil(current.nodes.length / 2) * 150;
  const max = Math.max(1, ...(current.data?.values ?? []));
  return (
    <section
      className="visual-lab narrative-lab"
      aria-label="Etkileşimli konu anlatımı"
    >
      <NarrativeModels key={id} id={id} />
      <h2>İlişkiyi adım adım keşfet</h2>
      <div className="walk-scenarios" aria-label="Örnek senaryo">
        {pack.cases.map((item, index) => (
          <button
            key={item.name}
            className={scenario === index ? "secondary selected" : "secondary"}
            aria-pressed={scenario === index}
            onClick={() => set({ scenario: index, step: 0 })}
          >
            {item.name}
          </button>
        ))}
      </div>
      <p className="walk-question">{current.question}</p>
      <svg
        viewBox={`0 0 520 ${height}`}
        role="img"
        aria-label={`${current.name}: ${current.nodes.map((item) => item.label).join(" → ")}`}
      >
        <defs>
          <marker
            id={marker}
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0 0L8 4L0 8Z" fill="var(--muted)" />
          </marker>
        </defs>
        {positions.slice(1).map((to, i) => {
          const from = positions[i],
            dx = to.x - from.x,
            dy = to.y - from.y,
            len = Math.hypot(dx, dy),
            sx = from.x + (dx / len) * 49,
            sy = from.y + (dy / len) * 49,
            tx = to.x - (dx / len) * 49,
            ty = to.y - (dy / len) * 49;
          return (
            <g key={`${scenario}:${i}`}>
              <path
                className={step === i + 1 ? "walk-path active" : "walk-path"}
                d={`M${sx} ${sy}L${tx} ${ty}`}
                fill="none"
                stroke={step === i + 1 ? "var(--accent)" : "var(--muted)"}
                strokeWidth="2"
                markerEnd={`url(#${marker})`}
              />
              {current.links?.[i] && (
                <text
                  x={(from.x + to.x) / 2 + (dx === 0 ? 18 : 0)}
                  y={(from.y + to.y) / 2 - 8}
                  textAnchor={dx === 0 ? "start" : "middle"}
                  fontSize="11"
                  fill="var(--muted)"
                >
                  {current.links[i]}
                </text>
              )}
            </g>
          );
        })}
        {current.nodes.map((item, index) => (
          <g
            key={`${scenario}:${index}`}
            transform={`translate(${positions[index].x} ${positions[index].y})`}
            className={step === index ? "walk-node active" : "walk-node"}
            style={{ color: step === index ? "var(--accent)" : "var(--mint)" }}
          >
            <Pictogram kind={item.kind} symbol={item.symbol} />
            <text y="62" textAnchor="middle" fontSize="12" fill="var(--text)">
              {item.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="walk-node-controls" aria-label="Şema adımları">
        {current.nodes.map((item, index) => (
          <button
            key={item.label}
            className={step === index ? "secondary selected" : "secondary"}
            aria-pressed={step === index}
            onClick={() => set({ step: index })}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="walk-explanation" aria-live="polite">
        <h3>{current.nodes[step].label}</h3>
        <p>{current.nodes[step].detail}</p>
      </div>
      <div className="walk-step-controls">
        <button
          className="text-button"
          disabled={step === 0}
          onClick={() => set({ step: step - 1 })}
        >
          <ArrowLeft size={17} />
          Önceki adım
        </button>
        <span>
          {step + 1}/{current.nodes.length} adım
        </span>
        <button
          className="text-button"
          disabled={step === current.nodes.length - 1}
          onClick={() => set({ step: step + 1 })}
        >
          Sonraki adım
          <ArrowRight size={17} />
        </button>
      </div>
      {current.data && (
        <div className="walk-data">
          <svg
            viewBox="0 0 520 180"
            role="img"
            aria-label={current.data.labels
              .map(
                (label, i) =>
                  `${label}: ${current.data!.values[i]} ${current.data!.unit}`,
              )
              .join(", ")}
          >
            <path d="M30 10V155H500" fill="none" stroke="var(--muted)" />
            {current.data.values.map((value, i) => {
              const x = 55 + i * (410 / current.data!.values.length),
                h = (value / max) * 130;
              return (
                <rect
                  key={i}
                  x={x}
                  y={155 - h}
                  width={Math.min(70, 300 / current.data!.values.length)}
                  height={h}
                  fill="var(--mint)"
                />
              );
            })}
          </svg>
          <table>
            <caption>{current.data.caption}</caption>
            <thead>
              <tr>
                <th scope="col">Koşul</th>
                <th scope="col">Ölçüm ({current.data.unit})</th>
              </tr>
            </thead>
            <tbody>
              {current.data.labels.map((label, i) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{current.data!.values[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {step === current.nodes.length - 1 && (
        <div className="walk-conclusion">
          <h3>İlişkiyi kur</h3>
          <p>{current.conclusion}</p>
        </div>
      )}
      <p className="small muted">{pack.modelLimit}</p>
      <p className="small muted">
        Keşif puansızdır; seçimlerin bu cihazda saklanır.
      </p>
    </section>
  );
}
export function NarrativeRecall({ id }: { id: string }) {
  const pack = narrativeById.get(id)!;
  const [saved, set] = useExploration(`recall:${id}`, {
    index: 0,
    open: false,
    attempt0: "",
    attempt1: "",
  });
  const index = clampInt(saved.index, 0, pack.recall.length - 1),
    current = pack.recall[index];
  const attempt = index === 0 ? saved.attempt0 : saved.attempt1;
  return (
    <>
      <section className="narrative-pitfalls">
        <h2>Püf noktaları ve sık karıştırılanlar</h2>
        <ul>
          {pack.pitfalls.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              <p>{item.reason}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="narrative-recall" aria-label="Bakmadan hatırla">
        <h2>Bakmadan hatırla</h2>
        <p>
          Önce kendi açıklamanı kur; sonra gerekçeyle karşılaştır. Bu bir puanlı
          sınav değildir.
        </p>
        <div className="walk-scenarios">
          {pack.recall.map((_, i) => (
            <button
              key={i}
              className="secondary"
              aria-pressed={index === i}
              onClick={() => set({ index: i, open: false })}
            >
              Hatırlama {i + 1}
            </button>
          ))}
        </div>
        <p>{current.prompt}</p>
        <label className="field">
          Kısa açıklaman (en çok 120 karakter)
          <textarea
            maxLength={120}
            value={attempt}
            onChange={(e) =>
              set(
                index === 0
                  ? { attempt0: e.target.value }
                  : { attempt1: e.target.value },
              )
            }
          />
        </label>
        <button
          className="secondary"
          aria-expanded={saved.open}
          onClick={() => set({ open: !saved.open })}
        >
          {saved.open ? "Gerekçeyi kapat" : "Gerekçeyi göster"}
        </button>
        {saved.open && <p className="recall-explanation">{current.answer}</p>}
      </section>
    </>
  );
}
