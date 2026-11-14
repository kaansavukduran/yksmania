import { useEffect, useState } from "react";
export function ModelNumber({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  const [raw, setRaw] = useState(String(value));
  useEffect(() => setRaw(String(value)), [value]);
  const parsed = Number(raw),
    invalid =
      raw.trim() === "" ||
      !Number.isInteger(parsed) ||
      parsed < min ||
      parsed > max;
  return (
    <div className="model-control">
      <label>
        {label}: <output>{value}</output>
        <input
          type="range"
          aria-label={label}
          min={min}
          max={max}
          step="1"
          value={value}
          onChange={(e) => {
            setRaw(e.target.value);
            onChange(Number(e.target.value));
          }}
        />
      </label>
      <label className="model-exact">
        Sayıyla değiştir
        <input
          type="number"
          aria-label={`${label}, sayıyla`}
          min={min}
          max={max}
          step="1"
          value={raw}
          aria-invalid={invalid}
          onChange={(e) => {
            const v = e.target.value,
              n = Number(v);
            setRaw(v);
            if (v.trim() !== "" && Number.isInteger(n) && n >= min && n <= max)
              onChange(n);
          }}
        />
      </label>
      {invalid && (
        <>
          <p role="alert" className="field-error">
            {min}–{max} arasında tam sayı gir. Son geçerli değer korundu.
          </p>
          <button className="text-button" onClick={() => setRaw(String(value))}>
            Son geçerli değere dön
          </button>
        </>
      )}
    </div>
  );
}
