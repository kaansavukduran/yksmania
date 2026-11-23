import { useId } from "react";
import {
  calendarAge019,
  calendarDayShare019,
  type CalendarDate019,
} from "./calendarAgeSource019Model";
import { useExploration } from "./useExploration";

const defaults = { birth: "2011-12-20", observed: "2025-01-01" };
const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];
const dateText = ({ year, month, day }: CalendarDate019) =>
  `${day} ${months[month - 1]} ${year}`;
type AgeModel = ReturnType<typeof calendarAge019>;

function dateParts(value: string) {
  const [year = "", month = "", day = ""] = value.split("-");
  return { year, month, day };
}

function dateForModel(value: string) {
  const { year, month, day } = dateParts(value);
  if (!year || !month || !day) return "";
  return [year.padStart(4, "0"), month.padStart(2, "0"), day.padStart(2, "0")].join("-");
}

const dateFields = [
  { part: "day", label: "Gün", length: 2 },
  { part: "month", label: "Ay", length: 2 },
  { part: "year", label: "Yıl", length: 4 },
] as const;

function CalendarTimeline({
  model,
}: {
  model: Exclude<AgeModel, { kind: "invalid" }>;
}) {
  const id = useId();
  const { birth, observed } = model;
  const left = 22,
    right = 432;
  const position = (day: number, start: number, end: number) =>
    left + (right - left) * calendarDayShare019(day, start, end);
  const start = Math.min(birth.dayIndex, observed.dayIndex);
  const end = model.kind === "valid" ? model.yearEnd : birth.dayIndex;
  const placeBirth = position(birth.dayIndex, start, end);
  const placeObserved = position(observed.dayIndex, start, end);
  const yearObserved =
    model.kind === "valid"
      ? position(observed.dayIndex, model.yearStart, model.yearEnd)
      : 0;
  const yearAnniversary =
    model.kind === "valid"
      ? position(model.anniversary.dayIndex, model.yearStart, model.yearEnd)
      : 0;
  const description = `Doğum ${dateText(birth)}. Bakılan tarih ${dateText(observed)}.`;

  return (
    <figure style={{ marginInline: 0 }}>
      <svg
        className="f011m-diagram"
        viewBox={`0 -10 454 ${model.kind === "valid" ? 180 : 82}`}
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
      >
        <title id={`${id}-title`}>
          {description}
          {model.kind === "valid"
            ? ` Yıl içindeki karşılaştırma tarihi ${dateText(model.anniversary)}.`
            : " Bakılan tarih doğumdan önce."}
        </title>
        <g aria-hidden="true">
          <text x={left} y="18" fill="var(--text)" fontSize="18">
            İki tarih
          </text>
          <path d={`M${left} 47H${right}`} className="f011m-axis" />
          <path
            d={`M${placeBirth} 37V47 M${placeObserved} 47V57`}
            className="f011m-axis"
          />
          <circle
            data-calendar-event="birth"
            cx={placeBirth}
            cy="37"
            r="5.5"
            className="f011m-point-a"
          />
          <rect
            data-calendar-event="observed"
            x={placeObserved - 5}
            y="52"
            width="10"
            height="10"
            className="f011m-point-b"
          />
          {model.kind === "valid" && (
            <>
              <text x={left} y="99" fill="var(--text)" fontSize="18">
                {observed.year} içindeki günler
              </text>
              <path
                d={`M${left} 129H${right}M${left} 123V136 M${right} 123V136`}
                className="f011m-axis"
              />
              <path
                d={`M${yearObserved} 119V129 M${yearAnniversary} 129V137`}
                className="f011m-axis"
              />
              <rect
                data-calendar-event="year-observed"
                x={yearObserved - 5}
                y="114"
                width="10"
                height="10"
                className="f011m-point-b"
              />
              <path
                data-calendar-event="year-anniversary"
                d={`M${yearAnniversary} 133 l6 10 h-12 Z`}
                fill="var(--accent)"
              />
              <text x={left} y="162" fill="var(--muted)" fontSize="16">
                1 Ocak
              </text>
              <text
                x={right}
                y="162"
                fill="var(--muted)"
                textAnchor="end"
                fontSize="16"
              >
                31 Aralık
              </text>
            </>
          )}
        </g>
      </svg>
      <figcaption id={`${id}-caption`} className="f011m-limit">
        {description} Yuvarlak doğumu, kare bakılan tarihi gösterir.{" "}
        {model.kind === "valid"
          ? `Alt çizgide üçgen, yaşın değiştiği ${dateText(model.anniversary)} tarihini gösterir.`
          : "Kare, doğumu gösteren yuvarlağın solundadır."}
      </figcaption>
    </figure>
  );
}

export function CalendarAgeSource019Lab() {
  const [saved, set] = useExploration("calendar-age-source-019", defaults);
  const model = calendarAge019(dateForModel(saved.birth), dateForModel(saved.observed));
  const helpId = useId();
  const field = (key: keyof typeof saved, label: string) => {
    const parts = dateParts(saved[key]);
    return (
      <fieldset className="f011m-date" aria-describedby={helpId}>
        <legend>{label}</legend>
        <div className="f011m-date-parts">
          {dateFields.map(({ part, label, length }) => (
            <label className="field" key={part}>
              {label}
              <input
                type="text"
                inputMode="numeric"
                maxLength={length}
                value={parts[part]}
                aria-invalid={model[key] === null}
                onChange={(event) => {
                  const next = { ...parts, [part]: event.currentTarget.value.replace(/[^0-9]/g, "") };
                  set({ [key]: [next.year, next.month, next.day].join("-") });
                }}
              />
            </label>
          ))}
        </div>
      </fieldset>
    );
  };

  return (
    <details data-model="source019-calendar-age">
      <summary>Yıl farkı ve tamamlanan yaş</summary>
      <p>
        Yıl farkı, o yıl girilen yaşı verir. Bakılan tarihte kaç yaşın
        tamamlandığını bulmak için doğum gününü denetle.
      </p>
      <div className="f011m-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => set(defaults)}
        >
          1 Ocak 2025 örneği
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => set({ ...defaults, observed: "2025-12-20" })}
        >
          20 Aralık 2025 örneği
        </button>
      </div>
      <div className="f011m-controls">
        {field("birth", "Doğum tarihi")}
        {field("observed", "Bakılan tarih")}
      </div>
      <p id={helpId} className="f011m-limit">Günü, ayı ve yılı sayıyla yaz.</p>
      <div className="f011m-result" role="status" data-calendar-age-result>
        {model.kind === "invalid" ? (
          <p>
            {!model.birth && !model.observed
              ? "İki alan için de geçerli bir tarih gir."
              : !model.birth
                ? "Geçerli bir doğum tarihi gir."
                : "Bakılan tarih için geçerli bir tarih gir."}
          </p>
        ) : model.kind === "prebirth" ? (
          <p>
            <strong>Bakılan tarih doğumdan önce.</strong> Bu tarihte tamamlanan
            yaş hesaplanamaz.
          </p>
        ) : (
          <>
            <p>
              Takvim yılı farkı{" "}
              <strong>
                {model.observed.year} − {model.birth.year} ={" "}
                {model.yearDifference}
              </strong>
              .
            </p>
            <p>
              Tamamlanan yaş <strong>{model.completedAge}</strong>.{" "}
              {dateText(model.anniversary)} tarihine{" "}
              {model.anniversaryReached ? "ulaşıldı." : "henüz ulaşılmadı."}
            </p>
            {model.anniversaryAdjusted && (
              <p>
                Bu etkinlik ay ve gün sırasını karşılaştırır. 29 Şubat’ın
                bulunmadığı yılda 29 Şubat doğumu için 1 Mart kullanılır.
              </p>
            )}
          </>
        )}
      </div>
      {model.kind !== "invalid" && <CalendarTimeline model={model} />}
    </details>
  );
}
