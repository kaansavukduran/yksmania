import "./historyEventChoices.css";

interface EventChoice {
  date: string;
  name: string;
}

/** One visible, keyboard-accessible choice per event, using the source order. */
export function HistoryEventChoices({
  items,
  selected,
  onSelect,
  label = "İncelenecek olay",
}: {
  items: readonly EventChoice[];
  selected: number;
  onSelect: (index: number) => void;
  label?: string;
}) {
  return (
    <div className="history-event-choices" role="group" aria-label={label}>
      <p className="history-choice-label">{label}</p>
      <ol>
        {items.map((item, index) => (
          <li key={`${item.date}:${item.name}`}>
            <button
              type="button"
              aria-pressed={selected === index}
              data-event-index={index}
              onClick={() => onSelect(index)}
            >
              <span className="history-choice-date">{item.date}</span>{" "}
              <strong>{item.name}</strong>
              {selected === index && (
                <span className="history-choice-selected" aria-hidden="true">
                  ✓ Seçili
                </span>
              )}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
