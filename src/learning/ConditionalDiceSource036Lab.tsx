import "./forge014Math.css";
import { useId } from "react";
import { fractionLabel } from "./algebraModels";
import {
  conditionalDice036,
  twoDraws036,
} from "./conditionalDiceSource036Model";
import { useExploration } from "./useExploration";

const defaults = {
  mode: "sum-at-least",
  cutoff: 9,
  face: 6,
  red: 5,
  blue: 3,
  replacement: false,
};
const faces = [1, 2, 3, 4, 5, 6];
const xy = (face: number) => 73 + (face - 1) * 44;
const countColors = ["Kırmızı", "Mavi"];

export function ConditionalDiceSource036Lab() {
  const id = useId();
  const [saved, set] = useExploration("conditional-dice-source-036", defaults);
  const mode = saved.mode === "one-face" ? "one-face" : "sum-at-least";
  const valueIn = (
    key: "cutoff" | "face" | "red" | "blue",
    low: number,
    high: number,
  ) =>
    Number.isInteger(saved[key])
      ? Math.max(low, Math.min(high, saved[key]))
      : defaults[key];
  const cutoff = valueIn("cutoff", 2, 12);
  const face = valueIn("face", 1, 6);
  const red = valueIn("red", 1, 10);
  const blue = valueIn("blue", 1, 10);
  const model = conditionalDice036(mode, cutoff, face);
  const draw = twoDraws036(red, blue, saved.replacement);
  const goal =
    mode === "sum-at-least" ? `İlk zar ${face}` : `İki zar da ${face}`;
  const condition =
    mode === "sum-at-least"
      ? `Toplam en az ${cutoff}`
      : `En az bir zar ${face}`;
  const bound = fractionLabel(model.favorableCount, model.conditionedCount);
  const ratio = `${model.favorableCount}/${model.conditionedCount}`;
  const field = (
    key: "cutoff" | "face" | "red" | "blue",
    label: string,
    value: number,
    min: number,
    max: number,
  ) => (
    <label className="field">
      {label}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        aria-valuetext={String(value)}
        onChange={(event) => set({ [key]: Number(event.currentTarget.value) })}
      />
      <span aria-hidden="true">{value}</span>
    </label>
  );

  return (
    <details data-model="source036-conditional-dice">
      <summary>Zarın koşullu olasılığı</summary>
      <div className="lab-choice-buttons" role="group" aria-label="Zar koşulu">
        <button
          type="button"
          className="secondary"
          aria-pressed={mode === "sum-at-least"}
          onClick={() => set({ mode: "sum-at-least" })}
        >
          Toplam eşiği
        </button>
        <button
          type="button"
          className="secondary"
          aria-pressed={mode === "one-face"}
          onClick={() => set({ mode: "one-face" })}
        >
          Belirli zar yüzü
        </button>
      </div>
      <div className="f014m-controls">
        {mode === "sum-at-least" &&
          field("cutoff", "En küçük toplam", cutoff, 2, 12)}
        {field("face", "Aranan yüz", face, 1, 6)}
      </div>
      <div className="f014m-result" role="status">
        <p>
          {condition}. Bunun için {model.conditionedCount} sıralı çift var.
        </p>
        <p>
          {goal}. Koşul altında {ratio}
          {bound !== ratio && `, sade oran ${bound}`}.
        </p>
        <p>
          Koşul ve hedefin birlikte olasılığı {model.favorableCount}/
          {model.fullCount}. Yalnız hedefin olasılığı{" "}
          {fractionLabel(model.unconditionalEventCount, model.fullCount)}.
        </p>
      </div>
      <figure className="f040-plot">
        <svg
          viewBox="0 0 340 347"
          width="100%"
          role="img"
          aria-labelledby={`${id}-dice`}
        >
          <title id={`${id}-dice`}>
            İki bağımsız adil zarın 36 eş şanslı sıralı çifti. Hücrede iki yüzün
            toplamı yazılı.
          </title>
          <g aria-hidden="true">
            <text
              x={189}
              y={331}
              textAnchor="middle"
              fontSize={20}
              fill="var(--text)"
            >
              İkinci zar
            </text>
            <text
              x={19}
              y={154}
              textAnchor="middle"
              transform="rotate(-90 19 154)"
              fontSize={20}
              fill="var(--text)"
            >
              İlk zar
            </text>
            {faces.map((face) => (
              <g
                key={face}
                fontSize={18}
                fill="var(--text)"
                textAnchor="middle"
              >
                <text x={xy(face)} y={301}>
                  {face}
                </text>
                <text x={40} y={xy(face) - 25}>
                  {face}
                </text>
              </g>
            ))}
            {model.cells.map(
              ({ first, second, total, inCondition, inEvent }) => {
                const x = xy(second),
                  y = xy(first) - 31;
                const favored = inCondition && inEvent;
                return (
                  <g key={`${first}-${second}`}>
                    <rect
                      x={x - 20}
                      y={y - 20}
                      width={40}
                      height={40}
                      rx={3}
                      fill="none"
                      stroke={inCondition ? "var(--text)" : "var(--border)"}
                      strokeWidth={inCondition ? 2 : 1}
                    />
                    {favored && (
                      <circle
                        cx={x - 13}
                        cy={y - 13}
                        r={4}
                        fill="var(--accent)"
                      />
                    )}
                    <text
                      x={x}
                      y={y + 6}
                      textAnchor="middle"
                      fontSize={17}
                      fill="var(--text)"
                      fontWeight={favored ? 750 : 450}
                    >
                      {total}
                    </text>
                  </g>
                );
              },
            )}
          </g>
        </svg>
        <figcaption>
          Kalın çerçeve koşula uyan çifti, köşe noktası hedefi de sağlayan çifti
          gösterir.
        </figcaption>
      </figure>
      <details>
        <summary>Torbada iki seçim</summary>
        <div className="f014m-controls">
          {field("red", "Kırmızı top", red, 1, 10)}
          {field("blue", "Mavi top", blue, 1, 10)}
          <label className="f014m-toggle">
            <input
              type="checkbox"
              checked={saved.replacement}
              onChange={(event) =>
                set({ replacement: event.currentTarget.checked })
              }
            />
            İlk topu geri koy
          </label>
        </div>
        <p role="status">
          İkinci çekişte {draw.secondDenominator} top var. Farklı renk olasılığı{" "}
          {fractionLabel(draw.differentNumerator, draw.denominator)}.
        </p>
        <ul>
          {draw.outcomes.map(({ first, second, numerator }) => (
            <li key={`${first}-${second}`}>
              {countColors[first]} sonra {countColors[second].toLowerCase()}{" "}
              {fractionLabel(numerator, draw.denominator)}
            </li>
          ))}
        </ul>
      </details>
    </details>
  );
}
