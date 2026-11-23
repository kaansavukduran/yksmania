import { useId } from "react";
import {
  r035,
  r035DecimalInfo,
  r035Mul,
  r035Text,
  type R035,
} from "./rationalSource035Model";
import { useExploration } from "./useExploration";
import {
  workerProgress024,
  workerTeam024,
  workerTeam024Example,
  workerTeam024HalfExample,
} from "./workerTeamSource024Model";

const numeric = (value: R035) => Number(value.n) / Number(value.d);
function text(value: R035) {
  const decimal = r035DecimalInfo(value, 3);
  return decimal.terminated && !decimal.truncated
    ? decimal.display
    : r035Text(value);
}

const styles = [
  { key: "a", label: "A tek başına", stroke: "var(--accent)", dash: undefined },
  { key: "b", label: "B tek başına", stroke: "var(--mint)", dash: "8 5" },
  { key: "team", label: "Birlikte", stroke: "var(--text)", dash: "2 6" },
] as const;

function SoloRange({
  label,
  value,
  change,
}: {
  label: string;
  value: number;
  change: (next: number) => void;
}) {
  return (
    <label className="field" style={{ marginBlock: 0 }}>
      <span>
        {label} <strong aria-hidden="true">{value} saat</strong>
      </span>
      <input
        aria-label={label}
        aria-valuetext={`${value} saat`}
        type="range"
        min={4}
        max={24}
        step={1}
        value={value}
        onChange={(event) => change(event.currentTarget.valueAsNumber)}
      />
    </label>
  );
}

function WorkerPicture({ model }: { model: ReturnType<typeof workerTeam024> }) {
  const id = useId();
  const cases = [model.soloA, model.soloB, model.team];
  const hours = cases.map((scenario) => scenario.hours);
  const left = 66,
    right = 416,
    top = 66,
    bottom = 206;
  const limit = Math.ceil(Math.max(...hours.map(numeric)));
  const X = (time: number) => left + ((right - left) * time) / limit;
  const Y = (fraction: number) => bottom - (bottom - top) * fraction;
  const description = styles
    .map(({ label }, i) => `${label} ${text(hours[i])} saatte bitirir.`)
    .join(" ");

  return (
    <figure style={{ marginInline: 0 }}>
      <svg
        className="f012m-diagram"
        viewBox="0 0 456 292"
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
      >
        <title id={`${id}-title`}>{description}</title>
        <g aria-hidden="true">
          <text x="28" y="42" fill="var(--text)" fontSize="18">
            Bitirilen iş payı
          </text>
          <path
            d={`M${left} ${top}V${bottom}H${right}`}
            className="f012m-axis"
          />
          {[0.5, 1].map((fraction) => (
            <g key={fraction}>
              <path
                d={`M${left} ${Y(fraction)}H${right}`}
                className="f012m-guide"
              />
              <text
                x="52"
                y={Y(fraction) + 5}
                fill="var(--text)"
                fontSize="16"
                textAnchor="end"
              >
                {fraction === 0.5 ? "½" : "1"}
              </text>
            </g>
          ))}
          {[0, limit / 2, limit].map((time) => (
            <text
              key={time}
              x={X(time)}
              y="229"
              fill="var(--text)"
              fontSize="16"
              textAnchor="middle"
            >
              {text(r035(Math.round(2 * time), 2))}
            </text>
          ))}
          <text
            x="240"
            y="268"
            fill="var(--text)"
            fontSize="16"
            textAnchor="middle"
          >
            Süre (saat)
          </text>
          {styles.map(({ key, stroke, dash }, i) => {
            const x = X(numeric(hours[i]));
            const y = Y(
              numeric(workerProgress024(cases[i].rate, cases[i].hours)),
            );
            return (
              <g key={key}>
                <line
                  data-worker-comparison={key}
                  x1={left}
                  y1={bottom}
                  x2={x}
                  y2={y}
                  fill="none"
                  stroke={stroke}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={dash}
                />
                {key === "a" ? (
                  <circle
                    data-worker-finish={key}
                    cx={x}
                    cy={y}
                    r="6"
                    fill="none"
                    stroke={stroke}
                    strokeWidth="2"
                  />
                ) : key === "b" ? (
                  <rect
                    data-worker-finish={key}
                    x={x - 3}
                    y={y - 3}
                    width="6"
                    height="6"
                    fill={stroke}
                  />
                ) : (
                  <path
                    data-worker-finish={key}
                    d={`M${x} ${y - 4}l4 4 -4 4 -4 -4Z`}
                    fill={stroke}
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>
      <figcaption id={`${id}-caption`} className="f012m-limit">
        <ul role="list" style={{ listStyle: "none", paddingInlineStart: 0 }}>
          {styles.map(({ key, label, stroke, dash }, i) => (
            <li key={key}>
              <svg
                width="26"
                height="14"
                viewBox="0 0 26 14"
                aria-hidden="true"
                style={{ verticalAlign: "middle", marginInlineEnd: ".45em" }}
              >
                <path
                  d="M2 7H24"
                  stroke={stroke}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={dash}
                />
              </svg>
              {label} {text(hours[i])} saat,{" "}
              {key === "a"
                ? "düz çizgi"
                : key === "b"
                  ? "kesik çizgi"
                  : "noktalı çizgi"}
              .
            </li>
          ))}
        </ul>
        Uç işaretleri 1 işin tamamlandığı anı gösterir. Aynı sürede biten
        çizgiler üst üste gelir.
      </figcaption>
    </figure>
  );
}

export function WorkerTeamSource024Lab() {
  const [saved, set] = useExploration(
    "worker-team-speed-source-024",
    workerTeam024Example,
  );
  const validHours = (value: number, fallback: number) =>
    Number.isInteger(value) && value >= 4 && value <= 24 ? value : fallback;
  const hoursA = validHours(saved.hoursA, workerTeam024Example.hoursA);
  const hoursB = validHours(saved.hoursB, workerTeam024Example.hoursB);
  const model = workerTeam024({ hoursA, hoursB, halfA: saved.halfA });
  const minutes = r035Mul(model.team.hours, r035(60));

  return (
    <details data-model="source024-worker-team">
      <summary>Tek başına ve ekipte bitirme süresi</summary>
      <p>
        A ile B aynı işi çakışmadan bölüşüyor. A’nın ekipteki hızı değişebilir.
        B aynı hızla devam eder.
      </p>
      <div className="f012m-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => set(workerTeam024Example)}
        >
          12 ve 18 saatlik örnek
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set(workerTeam024HalfExample)}
        >
          Dar çalışma alanı örneği
        </button>
      </div>
      <label
        style={{
          display: "flex",
          gap: ".55em",
          alignItems: "center",
          minHeight: "44px",
          marginBlock: ".5rem",
        }}
      >
        <input
          type="checkbox"
          checked={saved.halfA}
          onChange={(event) => set({ halfA: event.currentTarget.checked })}
        />
        A ekipte yarı hızla çalışsın
      </label>
      <details>
        <summary>Tek başına süreleri değiştir</summary>
        <div className="f012m-controls" style={{ marginBlockStart: ".8rem" }}>
          <SoloRange
            label="A’nın tek başına süresi"
            value={hoursA}
            change={(hoursA) => set({ hoursA })}
          />
          <SoloRange
            label="B’nin tek başına süresi"
            value={hoursB}
            change={(hoursB) => set({ hoursB })}
          />
        </div>
      </details>
      <div className="f012m-result" role="status" data-worker-team-result>
        <p>
          A’nın tek başına hızı {r035Text(model.soloA.rate)}, B’ninki{" "}
          {r035Text(model.soloB.rate)} iş/saat.
        </p>
        <p>
          A’nın ekipteki hızı {r035Text(model.teamRateA)} iş/saat. Ekip hızı{" "}
          <strong>
            {r035Text(model.teamRateA)} + {r035Text(model.soloB.rate)} ={" "}
            {r035Text(model.team.rate)} iş/saat
          </strong>
          .
        </p>
        <p>
          <strong>Birlikte süre {text(model.team.hours)} saat.</strong>{" "}
          {model.team.hours.d !== 1n && minutes.d === 1n && (
            <>
              {String(minutes.n / 60n)} saat {String(minutes.n % 60n)}{" "}
              dakika.{" "}
            </>
          )}
          {model.relation > 0
            ? "Ekip, en hızlı tek çalışandan daha geç bitirir."
            : model.relation === 0
              ? "Ekip ve en hızlı tek çalışan aynı sürede bitirir."
              : "Ekip, en hızlı tek çalışandan daha erken bitirir."}
        </p>
        <p>
          Ekipte A’nın katkısı {r035Text(model.contributionA)}, B’ninki{" "}
          {r035Text(model.contributionB)} iş. Toplam tam 1 iş.
        </p>
      </div>
      <WorkerPicture model={model} />
    </details>
  );
}
