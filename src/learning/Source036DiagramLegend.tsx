type LegendEntry = { label: string; value: string; tone?: "a" | "b" };

export function DiagramLegend({ entries }: { entries: LegendEntry[] }) {
  return (
    <dl className="f036-diagram-values" aria-label="Şekildeki değerler" data-diagram-values>
      {entries.map(({ label, value, tone }) => (
        <div key={label} data-tone={tone}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
