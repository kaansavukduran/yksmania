import { useId } from "react";
import {
  combineMeans,
  describeData,
  histogramData,
  observationPlot,
  parseObservations,
  transformData,
  type ModePolicy,
} from "./forge015Math";
import { useExploration } from "./useExploration";
import "./forge015Math.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 4 }).format(
    n === 0 ? 0 : n,
  );
const show = (n: number | null) => (n === null ? "tanımsız" : fmt(n));
const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, Number.isFinite(n) ? n : min));
const serial = (xs: readonly number[]) =>
  xs.map((x) => String(x).replace(".", ",")).join("; ");
function Range({
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
  const uid = useId();
  return (
    <div className="stat015-field">
      <label htmlFor={uid}>{label}</label>
      <output htmlFor={uid}>{fmt(value)}</output>
      <input
        id={uid}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
function Select({
  label,
  value,
  options,
  disabled = false,
  onChange,
}: {
  label: string;
  value: string;
  options: [string, string][];
  disabled?: boolean;
  onChange: (s: string) => void;
}) {
  const uid = useId();
  return (
    <div className="stat015-field">
      <label htmlFor={uid}>{label}</label>
      <ChoiceSelect
        id={uid}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(([key, title]) => (
          <option key={key} value={key}>
            {title}
          </option>
        ))}
      </ChoiceSelect>
      <p className="stat015-chosen">
        Seçili: {options.find(([key]) => key === value)?.[1]}
      </p>
    </div>
  );
}
export default function Forge015MathLab({ lessonId }: { lessonId: string }) {
  const uid = useId();
  const [s, set] = useExploration("forge015-math-statistics", {
    mode: "data",
    dataset: "1; 3; 3; 5",
    selected: 3,
    newValue: "3",
    policy: "school",
    sd: "sample",
    transform: false,
    factor: 1,
    offset: 0,
    countA: 3,
    countB: 9,
    meanA: 40,
    meanB: 80,
    bins: "unequal",
    f0: 2,
    f1: 4,
    f2: 3,
    height: "density",
    guess: "",
    reason: "",
    checked: false,
  });
  if (lessonId !== "veri-analizi") return null;
  const update = (changes: Partial<typeof s>) =>
    set({ ...changes, checked: false });
  const mode = ["data", "groups", "histogram"].includes(s.mode)
    ? s.mode
    : "data";
  const policy: ModePolicy =
    s.policy === "maxFrequency" ? "maxFrequency" : "school";
  const parsed = parseObservations(s.dataset),
    base = parsed.values;
  const factor = Math.round(clamp(s.factor, -3, 3)),
    offset = Math.round(clamp(s.offset, -10, 10));
  const values = s.transform ? transformData(base, factor, offset) : base;
  const summary = describeData(values, policy),
    plot = observationPlot(values);
  const selected = Math.round(
    clamp(s.selected, 0, Math.max(0, base.length - 1)),
  );
  const added = parseObservations(s.newValue),
    canAdd =
      !parsed.error &&
      !added.error &&
      added.values.length === 1 &&
      base.length < 24;
  const countA = Math.round(clamp(s.countA, 1, 20)),
    countB = Math.round(clamp(s.countB, 1, 20));
  const meanA = Math.round(clamp(s.meanA, 0, 100)),
    meanB = Math.round(clamp(s.meanB, 0, 100));
  const combined = combineMeans([
    { count: countA, mean: meanA },
    { count: countB, mean: meanB },
  ]);
  const frequencies = [s.f0, s.f1, s.f2].map((f) =>
    Math.round(clamp(f, 0, 10)),
  );
  const edges = s.bins === "equal" ? [0, 10, 20, 30] : [0, 5, 15, 30];
  const histogram = histogramData(edges, frequencies),
    density = s.height !== "frequency";
  const heights = histogram.bins.map((b) =>
      density ? b.density : b.frequency,
    ),
    maxHeight = Math.max(1, ...heights);
  const options: [string, string][] =
    mode === "data"
      ? [
          ["less", "Ortanca daha küçük"],
          ["same", "İkisi eşit"],
          ["more", "Ortanca daha büyük"],
          ["empty", "Merkez ölçüleri yok"],
        ]
      : mode === "groups"
        ? [
            ["weighted", "Ağırlıklı ortalama büyük"],
            ["same", "İki hesap eşit"],
            ["unweighted", "Düz ortalama büyük"],
          ]
        : [
            ["area", "Yoğunluk kuralı korur"],
            ["distort", "Adet kuralı korumaz"],
          ];
  const expected =
    mode === "data"
      ? summary.mean === null || summary.median === null
        ? "empty"
        : Math.abs(summary.mean - summary.median) < 1e-9
          ? "same"
          : summary.median < summary.mean
            ? "less"
            : "more"
      : mode === "groups"
        ? Math.abs(combined.weighted! - combined.unweighted!) < 1e-9
          ? "same"
          : combined.weighted! > combined.unweighted!
            ? "weighted"
            : "unweighted"
        : density
          ? "area"
          : "distort";
  const guessValid = options.some(([key]) => key === s.guess);
  const valid = mode !== "data" || !parsed.error;
  const sd = s.sd === "population" ? summary.populationSD : summary.sampleSD;
  const variance =
    s.sd === "population" ? summary.populationVariance : summary.sampleVariance;
  const preset = (dataset: string) =>
    update({ dataset, selected: 0, transform: false, factor: 1, offset: 0 });
  return (
    <section
      className="stat015-lab"
      data-forge015="veri-analizi"
      aria-labelledby={`${uid}-heading`}
    >
      <h3 id={`${uid}-heading`}>
        Veriyi değiştir, ölçünün neden değiştiğini gör
      </h3>
      <p>
        Gözlem listesi, kişi ağırlıkları ve sınıf aralıkları farklı bilgi taşır.
        Bir modeli seç, veriyi değiştir ve kararını sayılarla karşılaştır.
      </p>
      <Select
        label="Çalışma modeli"
        value={mode}
        options={[
          ["data", "Ham veri ve yayılım"],
          ["groups", "İki grubu birleştir"],
          ["histogram", "Sınıflar ve histogram"],
        ]}
        onChange={(v) => update({ mode: v, guess: "" })}
      />

      {mode === "data" && (
        <>
          <label htmlFor={`${uid}-data`}>Ham gözlemler</label>
          <textarea
            id={`${uid}-data`}
            rows={3}
            maxLength={480}
            value={s.dataset}
            onChange={(e) => update({ dataset: e.target.value })}
            aria-describedby={`${uid}-data-help`}
          />
          <p id={`${uid}-data-help`}>
            Sayıları noktalı virgülle ayır; ondalık için virgül kullanabilirsin.
            Çizimde −50 ile 100 arasında en çok 24 ham gözlem düzenlenir.
            Listeyi boş bırakmak da geçerli bir deneydir.
          </p>
          {parsed.error && (
            <p className="stat015-error" role="alert">
              {parsed.error} Sonuç gösterilmiyor; önce listeyi düzelt.
            </p>
          )}
          <div className="stat015-actions">
            <button
              type="button"
              className="secondary"
              onClick={() => preset("1;3;3;5")}
            >
              İlk veri
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => preset("1;3;3;13")}
            >
              Uç değer
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => preset("1;1;3;3;8")}
            >
              Çok mod
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => preset("1;1;3;3")}
            >
              Eş sıklık
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => preset("0;3;3;6")}
            >
              Aynı merkez
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => preset("")}
            >
              Veriyi temizle
            </button>
          </div>
          <div className="stat015-controls">
            <Select
              label="İşaretlenecek gözlem"
              value={String(selected)}
              disabled={!base.length || !!parsed.error}
              options={
                base.length
                  ? base.map((v, i) => [
                      String(i),
                      `${i + 1}. gözlem: ${fmt(v)}`,
                    ])
                  : [["0", "Gözlem yok"]]
              }
              onChange={(v) => update({ selected: Number(v) })}
            />
            <div className="stat015-field">
              <label htmlFor={`${uid}-add`}>Eklenecek değer</label>
              <input
                id={`${uid}-add`}
                type="text"
                inputMode="decimal"
                maxLength={20}
                value={s.newValue}
                onChange={(e) => update({ newValue: e.target.value })}
              />
              <button
                type="button"
                className="secondary"
                disabled={!canAdd}
                onClick={() =>
                  update({
                    dataset: serial([...base, added.values[0]]),
                    selected: base.length,
                  })
                }
              >
                Gözlem ekle
              </button>
            </div>
          </div>
          <button
            type="button"
            className="secondary stat015-wide"
            disabled={!base.length || !!parsed.error}
            onClick={() =>
              update({
                dataset: serial(base.filter((_, i) => i !== selected)),
                selected: Math.max(0, selected - 1),
              })
            }
          >
            Seçiliyi sil
          </button>
          <details className="stat015-definitions">
            <summary>Hesap tanımları</summary>
            <div className="stat015-controls">
              <Select
                label="Mod tanımı"
                value={policy}
                options={[
                  ["school", "OGM okul tanımı"],
                  ["maxFrequency", "En yüksek sıklık"],
                ]}
                onChange={(v) => update({ policy: v })}
              />
              <Select
                label="Sapma tanımı"
                value={s.sd === "population" ? "population" : "sample"}
                options={[
                  ["sample", "MEBİ örneklem: n−1"],
                  ["population", "Anakütlenin tamamı: n"],
                ]}
                onChange={(v) => update({ sd: v })}
              />
            </div>
            <p>
              Okul modunda birkaç farklı değer eş sıklıktaysa ayırt edici mod
              yoktur; tek farklı değer tekrar ediyorsa kendisi moddur. En yüksek
              sıklık tanımı, eşitlikte bütün en sık değerleri listeler. Sapma
              paydaları farklı kapsamlar içindir; biri diğerinin yanlış
              hesaplanmış hâli değildir.
            </p>
          </details>
          <details className="stat015-definitions">
            <summary>Doğrusal dönüşüm</summary>
            <label className="stat015-toggle">
              <input
                type="checkbox"
                checked={s.transform}
                onChange={(e) => update({ transform: e.target.checked })}
              />
              <span>Dönüşümü kullan</span>
            </label>
            <div className="stat015-controls">
              <Range
                label="a çarpanı"
                value={factor}
                min={-3}
                max={3}
                onChange={(v) => update({ factor: v })}
              />
              <Range
                label="b eklemesi"
                value={offset}
                min={-10}
                max={10}
                onChange={(v) => update({ offset: v })}
              />
            </div>
            <p>
              {`y=${fmt(factor)}·x ${offset < 0 ? "−" : "+"} ${fmt(Math.abs(offset))}.`}{" "}
              Dönüşüm açıkken şekil ve ölçüler y değerlerini gösterir; ham liste
              korunur. Negatif çarpan sıralamayı tersine çevirir, sıfır çarpan
              değerleri birleştirir.
            </p>
          </details>
          {!parsed.error && (
            <>
              <div className="stat015-axis-key">
                <p>
                  <strong>Yatay eksen:</strong> gözlem değeri (birim); sol{" "}
                  {fmt(plot.lower)}, orta {fmt((plot.lower + plot.upper) / 2)},
                  sağ {fmt(plot.upper)}.
                </p>
                <p>
                  Her dolu nokta bir gözlemdir. Tekrarlar ve yakın ondalıklar
                  çakışmamak için dikey ayrılır; dikey konum ayrı bir ölçüm
                  değildir. Gerçek sıklıklar alttaki frekans listesinde
                  yazılıdır. Kesikli çizgi ortalamayı, düz çizgi ortancayı;
                  halka seçili gözlemi gösterir.
                </p>
              </div>
              <svg
                viewBox={`0 0 600 ${plot.height}`}
                role="img"
                aria-labelledby={`${uid}-plot-title`}
                data-stat-view="data"
              >
                <title id={`${uid}-plot-title`}>
                  {summary.n} gözlem; ortalama {show(summary.mean)}, ortanca{" "}
                  {show(summary.median)}. Yatay eksen gözlem birimidir.
                </title>
                <path d={`M70 ${plot.baseline}H530`} className="stat015-axis" />
                {[0, 0.5, 1].map((f) => (
                  <g key={f}>
                    <path
                      d={`M${70 + 460 * f} ${plot.baseline - 5}v10`}
                      className="stat015-axis"
                    />
                    <text
                      x={70 + 460 * f}
                      y={plot.baseline + 28}
                      textAnchor="middle"
                    >
                      {fmt(plot.lower + f * (plot.upper - plot.lower))}
                    </text>
                  </g>
                ))}
                {plot.meanX !== null && (
                  <path
                    data-stat-mean
                    data-value={summary.mean!}
                    d={`M${plot.meanX} 30V${plot.baseline}`}
                    className="stat015-mean"
                  />
                )}
                {plot.medianX !== null && (
                  <path
                    data-stat-median
                    data-value={summary.median!}
                    d={`M${plot.medianX} 50V${plot.baseline}`}
                    className="stat015-median"
                  />
                )}
                {plot.points.map((p) => (
                  <circle
                    key={p.originalIndex}
                    data-stat-point
                    data-value={p.value}
                    cx={p.x}
                    cy={p.y}
                    r={6}
                    className="stat015-point"
                  />
                ))}
                {plot.points[selected] && (
                  <circle
                    data-stat-selection
                    cx={plot.points[selected].x}
                    cy={plot.points[selected].y}
                    r={11}
                    className="stat015-halo"
                  />
                )}
                {!summary.n && (
                  <text data-stat-empty x={300} y={100} textAnchor="middle">
                    Gözlem yok
                  </text>
                )}
              </svg>
              <div data-model-result className="stat015-result">
                <strong>
                  Gözlem sayısı: {summary.n} · Toplam: {fmt(summary.sum)}
                </strong>
                <p>
                  Ortalama: {show(summary.mean)} · Ortanca:{" "}
                  {show(summary.median)} · Açıklık: {show(summary.range)}
                </p>
                <p>
                  Mod (
                  {policy === "school" ? "OGM okul tanımı" : "en yüksek sıklık"}
                  ):{" "}
                  {summary.modes.length
                    ? summary.modes.map(fmt).join("; ")
                    : "yok"}
                  .
                </p>
                <p>
                  Varyans: {show(variance)} birim² · Standart sapma: {show(sd)}{" "}
                  birim. Payda:{" "}
                  {s.sd === "population"
                    ? "n; anakütlenin tamamı"
                    : "n−1; MEBİ örneklem tanımı"}
                  .
                </p>
                <p>
                  Kareli farklar toplamı: {show(summary.squareSum)}. Diğer
                  kapsam:{" "}
                  {s.sd === "population"
                    ? `örneklem sapması ${show(summary.sampleSD)}`
                    : `anakütle sapması ${show(summary.populationSD)}`}
                  .
                </p>
                {!summary.n && (
                  <p>
                    Boş veri grubunda ortalama, ortanca, açıklık ve sapmalar
                    tanımsızdır; toplamın 0 olması bu ölçüleri 0 yapmaz.
                  </p>
                )}
                {summary.n === 1 && (
                  <p>
                    Tek gözlemde n−1 sıfırdır; örneklem sapması tanımsız,
                    anakütle sapması 0’dır.
                  </p>
                )}
                <p data-stat-sorted>
                  Sıralı gözlemler:{" "}
                  {summary.sorted.length
                    ? summary.sorted.map(fmt).join("; ")
                    : "yok"}
                  .
                </p>
                <ul
                  className="stat015-frequency"
                  aria-label="Değer ve frekans tablosu"
                >
                  {summary.frequency.map((row) => (
                    <li key={row.value}>
                      <strong>{fmt(row.value)} birim:</strong> {row.frequency}{" "}
                      kez; toplam katkısı {fmt(row.value * row.frequency)}.
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </>
      )}

      {mode === "groups" && (
        <>
          <p>
            İki grubun puan ortalamasını kişi sayılarıyla birleştir. Düz
            ortalama gruplara, ağırlıklı ortalama kişilere eşit ağırlık verir.
          </p>
          <div className="stat015-controls">
            <Range
              label="A grubu kişi sayısı"
              value={countA}
              min={1}
              max={20}
              onChange={(v) => update({ countA: v })}
            />
            <Range
              label="A grubu ortalaması (puan)"
              value={meanA}
              min={0}
              max={100}
              onChange={(v) => update({ meanA: v })}
            />
            <Range
              label="B grubu kişi sayısı"
              value={countB}
              min={1}
              max={20}
              onChange={(v) => update({ countB: v })}
            />
            <Range
              label="B grubu ortalaması (puan)"
              value={meanB}
              min={0}
              max={100}
              onChange={(v) => update({ meanB: v })}
            />
          </div>
          <div className="stat015-axis-key">
            <p>
              <strong>Yatay eksen:</strong> puan, solda 0; ortada 50; sağda 100.
              Üstten alta A ortalaması, B ortalaması, ağırlıklı sonuç ve iki
              grup ortalamasının düz ortalaması. Nokta büyüklükleri kişi
              sayısını temsil etmez.
            </p>
          </div>
          <svg
            viewBox="0 0 600 340"
            role="img"
            aria-labelledby={`${uid}-groups-title`}
            data-stat-view="groups"
          >
            <title id={`${uid}-groups-title`}>
              A {countA} kişi, {meanA} puan; B {countB} kişi, {meanB} puan.
              Ağırlıklı {show(combined.weighted)}, düz{" "}
              {show(combined.unweighted)} puan.
            </title>
            {[70, 130, 200, 260].map((y) => (
              <path key={y} d={`M70 ${y}H530`} className="stat015-grid" />
            ))}
            {[0, 50, 100].map((x) => (
              <g key={x}>
                <path d={`M${70 + x * 4.6} 285v10`} className="stat015-axis" />
                <text x={70 + x * 4.6} y={320} textAnchor="middle">
                  {x}
                </text>
              </g>
            ))}
            <circle
              data-group-a
              cx={70 + meanA * 4.6}
              cy={70}
              r={9}
              className="stat015-point"
            />
            <circle
              data-group-b
              cx={70 + meanB * 4.6}
              cy={130}
              r={9}
              className="stat015-secondary"
            />
            <circle
              data-group-weighted
              data-value={combined.weighted!}
              cx={70 + combined.weighted! * 4.6}
              cy={200}
              r={11}
              className="stat015-point"
            />
            <circle
              data-group-unweighted
              data-value={combined.unweighted!}
              cx={70 + combined.unweighted! * 4.6}
              cy={260}
              r={11}
              className="stat015-halo"
            />
          </svg>
          <div data-model-result className="stat015-result">
            <strong>Ağırlıklı ortalama: {show(combined.weighted)} puan</strong>
            <p>Düz ortalama: {show(combined.unweighted)} puan.</p>
            <p>
              A: {countA} kişi × {meanA} = {countA * meanA} puan; B: {countB}{" "}
              kişi × {meanB} = {countB * meanB} puan.
            </p>
            <p>
              Toplam {combined.count} kişi, {fmt(combined.sum)} puan. Birleşik
              ortalama {fmt(combined.sum)}/{combined.count}. İki ortalamadan
              grupların iç yayılımı bilinmez; birleşik standart sapma yalnız bu
              bilgilerle belirlenmez.
            </p>
          </div>
        </>
      )}

      {mode === "histogram" && (
        <>
          <p>
            Bu modelde yalnız sınıf frekansları biliniyor; tek tek puanlar
            verilmedi. Yükseklik kuralını değiştirerek alanın neden önemli
            olduğunu karşılaştır.
          </p>
          <div className="stat015-controls">
            <Select
              label="Sınıf genişlikleri"
              value={s.bins === "equal" ? "equal" : "unequal"}
              options={[
                ["unequal", "5, 10, 15 puan"],
                ["equal", "10, 10, 10 puan"],
              ]}
              onChange={(v) => update({ bins: v })}
            />
            <Select
              label="Yüksekliğin anlamı"
              value={density ? "density" : "frequency"}
              options={[
                ["density", "Frekans yoğunluğu"],
                ["frequency", "Adet: yanlış kuralı dene"],
              ]}
              onChange={(v) => update({ height: v })}
            />
            {frequencies.map((f, i) => (
              <Range
                key={i}
                label={`${i + 1}. sınıf kişi sayısı`}
                value={f}
                min={0}
                max={10}
                onChange={(v) =>
                  update({ [(["f0", "f1", "f2"] as const)[i]]: v })
                }
              />
            ))}
          </div>
          <div className="stat015-axis-key">
            <p>
              <strong>Yatay eksen:</strong> puan; sınırlar {edges.join(" · ")}.
              İlk iki sınıfın üst ucu açık, sonuncunun kapalıdır.
            </p>
            <p>
              <strong>Düşey eksen:</strong>{" "}
              {density
                ? "kişi/puan cinsinden frekans yoğunluğu"
                : "kişi adedi; bu yanlış-kural deneyinde alanlar frekans değildir"}
              . Alt sınır 0, üst kılavuz {fmt(maxHeight)}.
            </p>
          </div>
          <svg
            viewBox="0 0 600 330"
            role="img"
            aria-labelledby={`${uid}-hist-title`}
            data-stat-view="histogram"
          >
            <title id={`${uid}-hist-title`}>
              Sınıf sınırları {edges.join(", ")}; frekanslar{" "}
              {frequencies.join(", ")};{" "}
              {density ? "yoğunluk" : "adet yüksekliği"} gösterimi.
            </title>
            <path d="M70 50V260H530" className="stat015-axis" />
            <path d="M70 60H530" className="stat015-grid" />
            {histogram.bins.map((bin, i) => (
              <rect
                key={i}
                data-stat-bin={i}
                data-frequency={bin.frequency}
                data-density={bin.density}
                x={70 + (bin.lower / 30) * 460}
                y={260 - (heights[i] / maxHeight) * 200}
                width={(bin.width / 30) * 460}
                height={(heights[i] / maxHeight) * 200}
                className={
                  i % 2 ? "stat015-hist-secondary" : "stat015-hist-primary"
                }
              />
            ))}
            {edges.map((edge) => (
              <g key={edge}>
                <path
                  d={`M${70 + (edge / 30) * 460} 260v8`}
                  className="stat015-axis"
                />
                <text x={70 + (edge / 30) * 460} y={295} textAnchor="middle">
                  {edge}
                </text>
              </g>
            ))}
          </svg>
          <div data-model-result className="stat015-result">
            <strong>Toplam: {histogram.total} kişi</strong>
            <ul>
              {histogram.bins.map((bin, i) => (
                <li key={i}>
                  [{bin.lower},{bin.upper}
                  {bin.upperInclusive ? "]" : ")"}: genişlik {bin.width} puan;{" "}
                  {bin.frequency} kişi; yoğunluk {fmt(bin.density)} kişi/puan.
                  Çizilen alan {fmt(heights[i] * bin.width)}.
                </li>
              ))}
            </ul>
            <p>
              Orta nokta ortalaması tahmini: {show(histogram.midpointEstimate)}{" "}
              puan. Kesin ortalama bilinmiyor.
            </p>
            {histogram.total > 0 && (
              <p>
                Kesin ortalama {show(histogram.meanLower)} puandan küçük olamaz.
                Üst sınır {show(histogram.meanUpper)} puandır;{" "}
                {histogram.upperAttainable
                  ? "bu değer alınabilir."
                  : "açık uçlu dolu sınıflar nedeniyle ortalama bunun altında kalır; sınıra yalnız yaklaşılabilir."}
              </p>
            )}
            <p>
              Yalnız sınıf frekansından kesin ortanca, tek tek mod değeri veya
              standart sapma üretilmez.{" "}
              {density
                ? "Yoğunluk yüksekliğiyle her dikdörtgenin alanı kişi sayısıdır."
                : "Adet yüksekliği farklı genişliklerde genel olarak alanı kişi sayısıyla orantılı tutmaz; bu seçenek hatayı görmen içindir."}
            </p>
          </div>
        </>
      )}

      <div className="stat015-prediction">
        <p>
          {mode === "data"
            ? "Ortanca ile ortalama arasındaki ilişkiyi tahmin et."
            : mode === "groups"
              ? "Ağırlıklı sonuçla düz ortalamayı karşılaştır."
              : "Farklı genişliklerde seçilen yükseklik kuralı genel olarak alanın frekansı temsil etmesini korur mu?"}
        </p>
        <Select
          label="Sonuç tahminin"
          value={guessValid ? s.guess : ""}
          options={[["", "Bir sonuç seç"], ...options]}
          onChange={(v) => update({ guess: v })}
        />
        <label htmlFor={`${uid}-reason`}>Modelden gerekçen</label>
        <textarea
          id={`${uid}-reason`}
          rows={3}
          maxLength={120}
          value={s.reason.slice(0, 120)}
          onChange={(e) => update({ reason: e.target.value.slice(0, 120) })}
        />
        <button
          type="button"
          className="secondary"
          disabled={!valid || !guessValid || !s.reason.trim()}
          onClick={() => set({ checked: true })}
        >
          Tahminimi karşılaştır
        </button>
        {s.checked && valid && guessValid && (
          <div role="status" className="stat015-feedback">
            <strong>
              {s.guess === expected
                ? "Tahminin bu koşullarla uyumlu."
                : "Tahminini sayı ve koşullarla yeniden karşılaştır."}
            </strong>
            <p>
              {mode === "data"
                ? `Ortalama ${show(summary.mean)}, ortanca ${show(summary.median)}. Toplam ve orta sıralar farklı kurallarla belirlenir.`
                : mode === "groups"
                  ? `Kişi ağırlıklarıyla ${show(combined.weighted)}, gruplara eşit ağırlıkla ${show(combined.unweighted)} puan bulunur.`
                  : "Yoğunluk=frekans/genişlik seçilirse alan frekansa eşittir; doğrudan adet yüksekliği farklı genişliklerde bu genel kuralı korumaz."}
            </p>
            <p>Senin gerekçen: {s.reason.slice(0, 120)}</p>
            <p>
              Gerekçe metni otomatik puanlanmaz; seçtiğin sonuç hesapla
              karşılaştırılır.
            </p>
          </div>
        )}
      </div>
      <p className="stat015-footnote">
        Bu keşifler puan, XP veya konu tamamlandı kaydı oluşturmaz. Çalışma
        seçimlerin bu cihazda saklanır; bağımsız sorular ayrı bölümde çözülür.
      </p>
    </section>
  );
}
