import { useEffect, useId, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";
export const dateTR = (iso: string) =>
  iso ? iso.split("-").reverse().join("/") : "";
export function parseDateTR(raw: string) {
  if (!/^\d{2}[/.-]\d{2}[/.-]\d{4}$/.test(raw)) return null;
  const [day, month, year] = raw.split(/[/.-]/);
  const iso = `${year}-${month}-${day}`;
  const d = new Date(iso + "T12:00:00Z");
  return !isNaN(+d) &&
    d.getUTCFullYear() === +year &&
    d.getUTCMonth() + 1 === +month &&
    d.getUTCDate() === +day
    ? iso
    : null;
}
export function DateInput({
  value,
  onChange,
  label,
  allowEmpty = false,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  allowEmpty?: boolean;
}) {
  const [raw, setRaw] = useState(dateTR(value));
  const [invalid, setInvalid] = useState(false);
  const picker = useRef<HTMLInputElement>(null);
  const uid = useId();
  useEffect(() => {
    setRaw(dateTR(value));
    setInvalid(false);
  }, [value]);
  const change = (v: string) => {
    setRaw(v);
    setInvalid(false);
    const iso = parseDateTR(v);
    if (iso) onChange(iso);
    else if (!v && allowEmpty) onChange("");
    else if (v.length >= 10) setInvalid(true);
  };
  return (
    <div className="date-control">
      <div className="date-control-row">
        <input
          type="text"
          inputMode="numeric"
          maxLength={10}
          aria-label={label}
          aria-describedby={`${uid}-help`}
          aria-invalid={invalid}
          value={raw}
          placeholder="GG/AA/YYYY"
          onChange={(e) => change(e.target.value)}
          onBlur={() => {
            const parsed = parseDateTR(raw);
            setInvalid(!parsed && !(allowEmpty && !raw));
            if (parsed) setRaw(dateTR(parsed));
          }}
        />
        <input
          ref={picker}
          className="native-date-picker"
          type="date"
          tabIndex={-1}
          aria-hidden="true"
          value={value}
          onChange={(e) => e.target.value && onChange(e.target.value)}
        />
        <button
          type="button"
          className="icon-button"
          aria-label={`${label}: takvimden seç`}
          onClick={() => {
            if (picker.current?.showPicker) picker.current.showPicker();
            else picker.current?.click();
          }}
        >
          <CalendarDays size={19} />
        </button>
      </div>
      <small id={`${uid}-help`} className={invalid ? "field-error" : "muted"}>
        {invalid
          ? "Geçerli bir tarih gir: gün/ay/yıl (ör. 18/06/2027). Son kayıtlı tarih korundu."
          : "Gün / ay / yıl"}
      </small>
    </div>
  );
}
