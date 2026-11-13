import { useId } from "react";
import { useExploration } from "./useExploration";
import { complement } from "./aytModels";
export default function DnaExplorer() {
  const uid = useId();
  const [s, set] = useExploration("dna-replication", { step: 0, selected: 0 });
  const step = Math.max(0, Math.min(7, Math.round(s.step))),
    selected = Math.max(0, Math.min(5, Math.round(s.selected)));
  const upper = [..."ATGCCA"],
    lower = complement(upper.join("")),
    added = Math.max(0, step - 1);
  const x = (i: number) => 125 + i * 67;
  function row(
    seq: string[],
    cy: number,
    old: boolean,
    reverse: boolean,
    visible: (i: number) => boolean = () => true,
  ) {
    const indexes = seq.map((_, i) => i).filter(visible);
    return (
      <g>
        <text x="68" y={cy + 6} className="plot-label">
          {reverse ? "3′" : "5′"}
        </text>
        <text x="510" y={cy + 6} className="plot-label">
          {reverse ? "5′" : "3′"}
        </text>
        {indexes.length > 0 && (
          <line
            x1={x(indexes[0]) - 22}
            y1={cy}
            x2={x(indexes[indexes.length - 1]) + 22}
            y2={cy}
            stroke={old ? "var(--plot-blue)" : "var(--accent)"}
            strokeWidth="5"
          />
        )}
        {indexes.map((i) => (
          <g key={i} data-strand={old ? "old" : "new"} data-base={seq[i]}>
            <rect
              x={x(i) - 21}
              y={cy - 17}
              width="42"
              height="34"
              rx="8"
              fill="var(--surface)"
              stroke={old ? "var(--plot-blue)" : "var(--accent)"}
              strokeWidth={selected === i ? 4 : 2}
            />
            <text
              x={x(i)}
              y={cy + 6}
              textAnchor="middle"
              className="plot-label"
            >
              {seq[i]}
            </text>
          </g>
        ))}
      </g>
    );
  }
  function bonds(cy: number, visible: (i: number) => boolean) {
    return (
      <g>
        {upper.map(
          (_, i) =>
            visible(i) && (
              <line
                key={i}
                x1={x(i)}
                y1={cy + 18}
                x2={x(i)}
                y2={cy + 38}
                className="dna-bond"
              />
            ),
        )}
      </g>
    );
  }
  const summary =
    step === 0
      ? "Başlangıçtaki çift zincirli DNA: iki eski zincir bir arada."
      : step === 1
        ? "Eski zincirler ayrıldı. Her biri yeni bir zincir için kalıp olur."
        : step === 7
          ? "İki DNA tamamlandı. Her birinde bir eski, bir yeni zincir bulunur."
          : "Her kalıbın karşısına tamamlayıcı nükleotitler eklenir. Yeni zincir 5′ → 3′ yönünde uzar.";
  return (
    <section className="visual-lab dna-lab" aria-labelledby={`${uid}-title`}>
      <div className="lab-heading">
        <h2 id={`${uid}-title`}>Eski zincirler nereye gidiyor?</h2>
        <p>
          DNA’nın ayrılıp iki moleküle dönüşmesini adım adım izle. Mavi eski
          zincirleri, mercan yeni zincirleri gösterir.
        </p>
      </div>
      <svg
        viewBox="0 0 600 400"
        role="img"
        aria-label={`${step + 1}. adım: ${summary}`}
      >
        <defs>
          <marker
            id={`${uid}-arrow`}
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" />
          </marker>
        </defs>
        {step === 0 ? (
          <>
            <text x="300" y="125" textAnchor="middle" className="plot-label">
              Atasal DNA
            </text>
            {row(upper, 180, true, false)}
            {bonds(180, () => true)}
            {row(lower, 236, true, true)}
          </>
        ) : (
          <>
            <text x="300" y="35" textAnchor="middle" className="plot-label">
              1. DNA: eski üst zincir kalıp
            </text>
            {row(upper, 85, true, false)}
            {bonds(85, (i) => i >= 6 - added)}
            {row(lower, 141, false, true, (i) => i >= 6 - added)}
            {added > 0 && (
              <line
                x1="470"
                y1="180"
                x2={470 - (added - 1) * 67 - 20}
                y2="180"
                stroke="var(--accent)"
                strokeWidth="3"
                markerEnd={`url(#${uid}-arrow)`}
              />
            )}
            <text x="300" y="231" textAnchor="middle" className="plot-label">
              2. DNA: eski alt zincir kalıp
            </text>
            {row(upper, 277, false, false, (i) => i < added)}
            {bonds(277, (i) => i < added)}
            {row(lower, 333, true, true)}
            {added > 0 && (
              <line
                x1="105"
                y1="373"
                x2={125 + (added - 1) * 67 + 20}
                y2="373"
                stroke="var(--accent)"
                strokeWidth="3"
                markerEnd={`url(#${uid}-arrow)`}
              />
            )}
          </>
        )}
      </svg>
      <p className="dna-step" aria-live="polite">
        {step + 1}/8 · {summary}
      </p>
      <div className="lab-actions">
        <button
          className="secondary"
          disabled={step === 0}
          onClick={() => set({ step: step - 1 })}
        >
          Önceki adım
        </button>
        <button
          className="primary"
          disabled={step === 7}
          onClick={() => set({ step: step + 1 })}
        >
          {step === 7
            ? "Yeni zincirler tamamlandı"
            : step === 0
              ? "Zincirleri ayır"
              : step === 1
                ? "Yeni zincirleri başlat"
                : "Bir çift daha ekle"}
        </button>
        <button
          className="text-button"
          onClick={() => set({ step: 0, selected: 0 })}
        >
          Başa dön
        </button>
      </div>
      <fieldset className="lab-choices">
        <legend>Bir eşleşmeyi incele</legend>
        <div className="segmented">
          {upper.map((base, i) => (
            <button
              key={i}
              aria-pressed={selected === i}
              className={selected === i ? "active" : ""}
              onClick={() => set({ selected: i })}
            >
              {i + 1}. {base}–{lower[i]}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="model-results">
        <p>
          {selected + 1}. konumda A–T ya da G–C eşleşmesi korunur: eski üstte{" "}
          {upper[selected]}, eski altta {lower[selected]}. Karşılarına bunların
          tamamlayıcıları gelir.
        </p>
        <output className="dna-count">
          Eklenen yeni nükleotit: <strong>{added * 2}</strong>.{" "}
          {step === 7
            ? "Sonuç: 2 molekül, toplam 2 eski + 2 yeni zincir."
            : "İki eski zincir korunur; yeni zincirler henüz tamamlanmadı."}
        </output>
      </div>
      <p className="lab-caption">
        Altı baz çiftlik molekül düzeyi özeti; enzimler, replikasyon çatalı,
        primerler ve Okazaki parçaları çizilmez. Oklar yeni zincirlerin 5′ → 3′
        uzama yönünü gösterir. İki karşılıklı zincir antiparaleldir; gerçek DNA
        ölçeği kullanılmaz. Bağ çizgileri eşleşme işaretidir; hidrojen bağları
        tek tek çizilmez.
      </p>
    </section>
  );
}
