import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import { useApp } from "../store";
import {
  energy025,
  fuelChoices025,
  hydrogenCycle025,
  borohydride025,
  materialFlow025,
  materialChoices025,
  reuseImpact025,
  cube025,
  lattice025,
  length025,
  chemistryDefaults025,
  normalizeChemistry025,
} from "./forge025Chemistry";
import "./forge025Chemistry.css";
const fmt025 = (n: number, digits = 3) =>
  n.toLocaleString("tr-TR", { maximumFractionDigits: digits });
const displayCopy025 = (value: string) =>
  value
    .replaceAll("varsayılmıştır", "varsayılır")
    .replaceAll("hesaplanmaz", "bulunmaz")
    .replaceAll("üretim/taşıma", "üretim / taşıma")
    .replaceAll("toplama/taşıma", "toplama / taşıma");
const selectedLabel025 = (label: string) =>
  label === "Sürdürülebilirlik modeli"
    ? "Malzeme modeli"
    : label === "Varsayımsal malzeme verisi"
      ? "Örnek malzeme verisi"
      : label;
type Options025 = Record<string, string>;
function Select025({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | number;
  options: Options025;
  onChange: (x: string) => void;
}) {
  const id = useId();
  return (
    <label className="c025-field" htmlFor={id}>
      <span>{selectedLabel025(label)}</span>
      <select
        id={id}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {Object.entries(options).map(([v, s]) => (
          <option key={v} value={v}>
            {s}
          </option>
        ))}
      </select>
    </label>
  );
}
function Range025({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (x: number) => void;
}) {
  const id = useId();
  return (
    <div className="c025-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{fmt025(value)}</output>
      <input
        type="range"
        id={id}
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
function Values025({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="c025-values">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
function Bars025({
  rows,
  max,
  unit,
  title,
}: {
  rows: { key: string; label: string; value: number }[];
  max: number;
  unit: string;
  title: string;
}) {
  return (
    <figure className="c025-figure">
      <figcaption>
        {title}. Çubuk tam ölçeği {fmt025(max)} {unit}.
      </figcaption>
      <svg
        viewBox={`0 0 280 ${rows.length * 65 + 12}`}
        role="img"
        aria-label={rows
          .map((r) => `${r.label}: ${fmt025(r.value)} ${unit}`)
          .join("; ")}
      >
        {rows.map((r, i) => (
          <g key={r.key} data-bar={r.key} data-value={r.value}>
            <text x="14" y={i * 65 + 20}>
              {r.label}
            </text>
            <rect
              className="c025-outline"
              x="14"
              y={i * 65 + 30}
              width="250"
              height="22"
            />
            <rect
              className="c025-fill"
              x="14"
              y={i * 65 + 30}
              width={(250 * Math.max(0, r.value)) / max}
              height="22"
              data-quantity={r.key}
            />
          </g>
        ))}
      </svg>
    </figure>
  );
}
function Flow025View({ r }: { r: ReturnType<typeof materialFlow025> }) {
  const streams = [
    { id: "avoided", label: "Önlenen", value: r.avoided },
    { id: "reused", label: "Yeniden kullanılan", value: r.reused },
    { id: "recovered", label: "Geri kazanılan", value: r.recovered },
    { id: "disposed", label: "Diğer akış", value: r.disposed },
  ];
  let cursor = 15;
  return (
    <figure className="c025-figure">
      <figcaption>
        Başlangıç talebinin kütle dağılımı. Sabit tam ölçek: 1000 kg.
      </figcaption>
      <svg
        viewBox="0 0 280 100"
        role="img"
        aria-label={streams
          .map((x) => `${x.label}: ${fmt025(x.value)} kg`)
          .join("; ")}
      >
        <rect className="c025-outline" x="15" y="30" width="250" height="38" />
        {streams.map((s) => {
          const x = cursor,
            width = (s.value / 1000) * 250;
          cursor += width;
          return (
            <rect
              key={s.id}
              data-stream={s.id}
              data-mass={s.value}
              className={`c025-stream c025-${s.id}`}
              x={x}
              y="30"
              width={width}
              height="38"
            />
          );
        })}
      </svg>
      <ul className="c025-legend">
        {streams.map((s) => (
          <li key={s.id}>
            <i className={`c025-${s.id}`} aria-hidden="true" />
            {s.label}: {fmt025(s.value)} kg
          </li>
        ))}
      </ul>
    </figure>
  );
}
function Cube025View({ r }: { r: ReturnType<typeof cube025> }) {
  const side = (r.edgeNm / 1000) * 230,
    small = (r.smallEdge / 1000) * 230,
    smallY = side + 55,
    height = Math.max(100, smallY + (r.divisions > 1 ? small : 0) + 25);
  return (
    <figure className="c025-figure">
      <figcaption>
        Ön yüzün kesim çizgileri; gerçek toplam parça sayısı üç boyutta{" "}
        {r.pieces}. Çizimde 230 birim = 1000 nm. Alttaki ayrı kare tek küçük
        parçanın ön yüzüdür; bölme yoksa aynı yüz bir daha çizilmez.
      </figcaption>
      <svg
        viewBox={`0 0 280 ${height}`}
        role="img"
        aria-label={`${r.edgeNm} nm büyük küp, her eksende ${r.divisions} bölme, ${r.smallEdge} nm küçük küp.`}
      >
        <rect
          x="20"
          y="25"
          width={side}
          height={side}
          className="c025-cube"
          data-original-edge={r.edgeNm}
        />
        {Array.from({ length: r.divisions - 1 }, (_, i) => {
          const at = (side * (i + 1)) / r.divisions;
          return (
            <g key={i} data-cut={i + 1}>
              <line x1={20 + at} x2={20 + at} y1="25" y2={25 + side} />
              <line x1="20" x2={20 + side} y1={25 + at} y2={25 + at} />
            </g>
          );
        })}
        {r.divisions > 1 && (
          <rect
            x="20"
            y={smallY}
            width={small}
            height={small}
            className="c025-small-cube"
            data-small-edge={r.smallEdge}
          />
        )}
      </svg>
    </figure>
  );
}
function Lattice025View({ r }: { r: ReturnType<typeof lattice025> }) {
  const step = 220 / (r.n - 1);
  return (
    <figure className="c025-figure">
      <figcaption>
        {r.n}×{r.n}×{r.n} nokta modelinde {r.layer}. katman. Dolu noktalar
        sınırda, boş noktalar içeridedir.
      </figcaption>
      <svg
        viewBox="0 0 260 260"
        role="img"
        aria-label={`Katmanda ${r.points.length} nokta; ${r.surfaceInLayer} sınır noktası.`}
      >
        {r.points.map((p) => (
          <circle
            key={p.x + "-" + p.y}
            data-point={`${p.x}-${p.y}-${p.z}`}
            data-surface={p.surface}
            cx={20 + p.x * step}
            cy={20 + p.y * step}
            r={Math.min(8, step / 3)}
            className={p.surface ? "c025-boundary" : "c025-interior"}
          />
        ))}
      </svg>
    </figure>
  );
}
export default function Forge025ChemistryLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const storageKey = "forge025:chemistry:" + lessonId,
    explorations = useApp().state.explorations,
    raw = Object.hasOwn(explorations, storageKey)
      ? explorations[storageKey]
      : undefined;
  const [saved, set] = useExploration(storageKey, chemistryDefaults025),
    normalized = normalizeChemistry025(saved),
    active: string[] =
      lessonId === "ayt-enerji-kaynaklari-gelismeler"
        ? [
            "energyMode",
            ...(normalized.energyMode === "fuel"
              ? ["fuel", "useful", "efficiency"]
              : normalized.energyMode === "hydrogen"
                ? ["electric", "electrolysis", "cell"]
                : ["bor"]),
          ]
        : lessonId === "ayt-surdurulebilirlik-geri-donusum"
          ? [
              "sustainMode",
              ...(normalized.sustainMode === "flow"
                ? [
                    "initial",
                    "avoid",
                    "reuse",
                    "collection",
                    "accept",
                    "process",
                    "material",
                  ]
                : ["uses", "production", "wash", "single"]),
            ]
          : [
              "nanoMode",
              ...(normalized.nanoMode === "cube"
                ? ["edge", "divisions"]
                : normalized.nanoMode === "lattice"
                  ? ["lattice", "layer"]
                  : ["length", "unit"]),
            ],
    invalidRawType =
      raw !== undefined &&
      active.some(
        (k) =>
          Object.hasOwn(raw, k) &&
          typeof raw[k] !==
            typeof chemistryDefaults025[k as keyof typeof chemistryDefaults025],
      ),
    v = invalidRawType
      ? { ...normalized, guess: "", reason: "", checked: false, show: false }
      : normalized,
    persist = (patch: Partial<typeof v>) => set({ ...v, ...patch }),
    change = (patch: Partial<typeof v>) =>
      persist({ ...patch, guess: "", reason: "", checked: false, show: false });
  if (
    ![
      "ayt-enerji-kaynaklari-gelismeler",
      "ayt-surdurulebilirlik-geri-donusum",
      "ayt-nanoteknoloji-gelismeler",
    ].includes(lessonId)
  )
    return null;
  let controls: ReactNode,
    result: ReactNode,
    scope: string,
    prediction: string,
    expected: string,
    options: Options025;
  const numberChoices = (values: number[]) =>
    Object.fromEntries(
      [...new Set(values.map((x) => String(Number(x.toFixed(6)))))].map((x) => [
        x,
        fmt025(Number(x), 6),
      ]),
    );
  if (lessonId === "ayt-enerji-kaynaklari-gelismeler") {
    const mode = (
      <Select025
        label="Enerji modeli"
        value={v.energyMode}
        options={{
          fuel: "Aynı yararlı enerji için yakıt",
          hydrogen: "Elektrik → H₂ → elektrik",
          bor: "Borhidrür atom bilançosu",
        }}
        onChange={(energyMode) => change({ energyMode })}
      />
    );
    if (v.energyMode === "fuel") {
      const r = energy025(v.fuel, v.useful, v.efficiency);
      scope = r.scope;
      prediction = "Kullanım noktasında CO₂ oluşur mu?";
      expected = r.C === 0 ? "no" : "yes";
      options = {
        yes: "Evet, karbon ürünü oluşur",
        no: "Hayır, saf girdilerde C yok",
      };
      controls = (
        <>
          {mode}
          <Select025
            label="Saf yakıt modeli"
            value={v.fuel}
            options={Object.fromEntries(
              Object.entries(fuelChoices025).map(([k, x]) => [k, x.name]),
            )}
            onChange={(fuel) => change({ fuel })}
          />
          <Range025
            label="Hedef yararlı enerji (MJ)"
            value={v.useful}
            min={10}
            max={50}
            onChange={(useful) => change({ useful })}
          />
          <Range025
            label="Dönüşüm verimi (%)"
            value={v.efficiency}
            min={20}
            max={60}
            onChange={(efficiency) => change({ efficiency })}
          />
        </>
      );
      result = (
        <div
          data-model-result
          data-mode="fuel"
          data-balanced={r.balanced}
          data-fuel={v.fuel}
          data-co2={r.co2Kg}
          data-mass={r.massKg}
        >
          <h4>Aynı {fmt025(r.usefulMJ)} MJ yararlı hedef</h4>
          <p>{r.equation}</p>
          <Values025
            rows={[
              ["Verilmiş alt ısıl değer", `${r.heat} MJ/kg`],
              ["Giren kimyasal enerji", `${fmt025(r.input)} MJ`],
              ["Yararlı enerji", `${fmt025(r.usefulMJ)} MJ`],
              ["Diğer enerji aktarımı", `${fmt025(r.rejected)} MJ`],
              ["Gereken yakıt", `${fmt025(r.massKg)} kg`],
              ["O₂ tüketimi", `${fmt025(r.oxygenKg)} kg`],
              ["Doğrudan CO₂", `${fmt025(r.co2Kg)} kg`],
              ["H₂O ürünü", `${fmt025(r.waterKg)} kg`],
            ]}
          />
          <Bars025
            title="Enerji dağılımı"
            unit="MJ"
            max={250}
            rows={[
              { key: "input", label: "Giren", value: r.input },
              { key: "useful", label: "Yararlı", value: r.usefulMJ },
              { key: "other", label: "Diğer", value: r.rejected },
            ]}
          />
          <Bars025
            title="Kullanım noktasındaki karbon ürünü"
            unit="kg CO₂"
            max={30}
            rows={[{ key: "co2", label: "CO₂", value: r.co2Kg }]}
          />
          <p>
            Kütle denetimi: yakıt + O₂ = CO₂ + H₂O; atomlar{" "}
            {r.balanced ? "korunuyor" : "yeniden denetlenmeli"}.
          </p>
        </div>
      );
    } else if (v.energyMode === "hydrogen") {
      const r = hydrogenCycle025(v.electric, v.electrolysis, v.cell);
      scope = r.scope;
      prediction = "Geri alınan elektrik (MJ)";
      expected = String(Number(r.output.toFixed(6)));
      options = numberChoices([
        r.output,
        r.chemical,
        r.electricMJ,
        r.totalLoss,
      ]);
      controls = (
        <>
          {mode}
          <Range025
            label="Başlangıç elektriği (MJ)"
            value={v.electric}
            min={10}
            max={100}
            onChange={(electric) => change({ electric })}
          />
          <Range025
            label="Elektroliz verimi (%)"
            value={v.electrolysis}
            min={40}
            max={90}
            onChange={(electrolysis) => change({ electrolysis })}
          />
          <Range025
            label="Yakıt pili verimi (%)"
            value={v.cell}
            min={30}
            max={70}
            onChange={(cell) => change({ cell })}
          />
        </>
      );
      result = (
        <div
          data-model-result
          data-mode="hydrogen"
          data-balanced={r.balanced}
          data-output={r.output}
          data-efficiency={r.roundTripPct}
        >
          <h4>Taşıyıcı çevrimi</h4>
          <p>Elektroliz: 2 H₂O → 2 H₂ + O₂. Yakıt pili: 2 H₂ + O₂ → 2 H₂O.</p>
          <Values025
            rows={[
              ["H₂ enerji karşılığı", `${fmt025(r.chemical)} MJ`],
              ["Geri elektrik", `${fmt025(r.output)} MJ`],
              ["İlk aşamada diğer aktarım", `${fmt025(r.firstLoss)} MJ`],
              ["İkinci aşamada diğer aktarım", `${fmt025(r.secondLoss)} MJ`],
              ["İki aşamalı geri dönüş", `%${fmt025(r.roundTripPct)}`],
            ]}
          />
          <Bars025
            title="Elektriğin iki dönüşümü"
            unit="MJ"
            max={100}
            rows={[
              { key: "electric", label: "Başlangıç", value: r.electricMJ },
              { key: "chemical", label: "H₂ enerjisi", value: r.chemical },
              { key: "output", label: "Geri elektrik", value: r.output },
            ]}
          />
        </div>
      );
    } else {
      const r = borohydride025(v.bor);
      scope = r.scope;
      prediction = "Oluşan H₂ (mol)";
      expected = String(Number(r.hydrogen.toFixed(6)));
      options = numberChoices([r.moles, r.moles * 2, r.hydrogen, r.moles * 8]);
      controls = (
        <>
          {mode}
          <Range025
            label="NaBH₄ miktarı (mol)"
            value={v.bor}
            min={0.1}
            max={4}
            step={0.1}
            onChange={(bor) => change({ bor })}
          />
        </>
      );
      result = (
        <div
          data-model-result
          data-mode="bor"
          data-balanced={r.balanced}
          data-hydrogen={r.hydrogen}
        >
          <h4>Atomları say, çevrimi sınırla</h4>
          <p>{r.equation}</p>
          <Values025
            rows={[
              ["Su tüketimi", `${fmt025(r.water)} mol`],
              ["H₂ oluşumu", `${fmt025(r.hydrogen)} mol`],
              ["NaBO₂ oluşumu", `${fmt025(r.metaborate)} mol`],
            ]}
          />
          <Bars025
            title="Stokiyometrik mol miktarları"
            unit="mol"
            max={16}
            rows={[
              { key: "bor", label: "NaBH₄", value: r.moles },
              { key: "water", label: "Tüketilen su", value: r.water },
              { key: "hydrogen", label: "H₂ ürünü", value: r.hydrogen },
            ]}
          />
        </div>
      );
    }
  } else if (lessonId === "ayt-surdurulebilirlik-geri-donusum") {
    const mode = (
      <Select025
        label="Sürdürülebilirlik modeli"
        value={v.sustainMode}
        options={{
          flow: "Aşamalı malzeme akışı",
          reuse: "Yeniden kullanım karşılaştırması",
        }}
        onChange={(sustainMode) => change({ sustainMode })}
      />
    );
    if (v.sustainMode === "flow") {
      const r = materialFlow025(
        v.initial,
        v.avoid,
        v.reuse,
        v.collection,
        v.accept,
        v.process,
        v.material,
      );
      scope = r.scope;
      prediction = "Nihai geri kazanılan miktar (kg)";
      expected = String(Number(r.recovered.toFixed(6)));
      options = numberChoices([
        r.recovered,
        r.collected,
        r.accepted,
        r.disposed,
        r.initial,
      ]);
      controls = (
        <>
          {mode}
          <Select025
            label="Varsayımsal malzeme verisi"
            value={v.material}
            options={Object.fromEntries(
              Object.entries(materialChoices025).map(([k, x]) => [k, x.name]),
            )}
            onChange={(material) => change({ material })}
          />
          <Range025
            label="İlk malzeme talebi (kg)"
            value={v.initial}
            min={100}
            max={1000}
            step={10}
            onChange={(initial) => change({ initial })}
          />
          <Range025
            label="Talep önleme (%)"
            value={v.avoid}
            min={0}
            max={30}
            onChange={(avoid) => change({ avoid })}
          />
          <Range025
            label="Kalanın yeniden kullanımı (%)"
            value={v.reuse}
            min={0}
            max={40}
            onChange={(reuse) => change({ reuse })}
          />
          <Range025
            label="Atık toplama (%)"
            value={v.collection}
            min={0}
            max={100}
            onChange={(collection) => change({ collection })}
          />
          <Range025
            label="Toplananın kabulü (%)"
            value={v.accept}
            min={0}
            max={100}
            onChange={(accept) => change({ accept })}
          />
          <Range025
            label="Kabulün işleme verimi (%)"
            value={v.process}
            min={0}
            max={100}
            onChange={(process) => change({ process })}
          />
        </>
      );
      result = (
        <div
          data-model-result
          data-mode="flow"
          data-balanced={r.balanced}
          data-recovered={r.recovered}
          data-disposed={r.disposed}
          data-initial={r.initial}
        >
          <h4>Her yüzdede doğru payda</h4>
          <Flow025View r={r} />
          <Values025
            rows={[
              ["Atık adayı", `${fmt025(r.waste)} kg`],
              ["Toplanan", `${fmt025(r.collected)} kg`],
              ["Kabul edilen", `${fmt025(r.accepted)} kg`],
              ["Nihai kazanım", `${fmt025(r.recovered)} kg`],
              ["Toplama dışı", `${fmt025(r.uncollected)} kg`],
              ["Ayıklama reddi", `${fmt025(r.sortingReject)} kg`],
              ["İşleme kaybı", `${fmt025(r.processReject)} kg`],
              ["Gereken yeni ham madde", `${fmt025(r.virginNeeded)} kg`],
              [
                "Verilen enerji oranları",
                `Birincil ${r.virgin}; geri kazanılmış ${r.recycled} kWh/kg`,
              ],
              [
                "Yalnız üretim sınırında enerji farkı",
                `${fmt025(r.energySaved)} kWh`,
              ],
            ]}
          />
          <p>
            Önlenen + yeniden kullanılan + geri kazanılan + diğer akış ={" "}
            {fmt025(r.initial)} kg. Yeni ham madde hesabında uygun kaliteyle 1:1
            ikame varsayılır.
          </p>
        </div>
      );
    } else {
      const r = reuseImpact025(v.uses, v.production, v.wash, v.single);
      scope = r.scope;
      prediction = "Verilen ölçütte daha düşük toplam etki";
      expected = r.advantage;
      options = {
        reusable: "Yeniden kullanılan",
        single: "Tek kullanımlık",
        equal: "Eşit",
      };
      controls = (
        <>
          {mode}
          <Range025
            label="Kullanım sayısı"
            value={v.uses}
            min={1}
            max={100}
            onChange={(uses) => change({ uses })}
          />
          <Range025
            label="Tekrar ürününün üretimi (birim)"
            value={v.production}
            min={0.1}
            max={100}
            step={0.1}
            onChange={(production) => change({ production })}
          />
          <Range025
            label="Her kullanım temizliği (birim)"
            value={v.wash}
            min={0}
            max={5}
            step={0.1}
            onChange={(wash) => change({ wash })}
          />
          <Range025
            label="Tek kullanımlık etki (birim/kullanım)"
            value={v.single}
            min={0.1}
            max={10}
            step={0.1}
            onChange={(single) => change({ single })}
          />
        </>
      );
      result = (
        <div
          data-model-result
          data-mode="reuse"
          data-advantage={r.advantage}
          data-reusable={r.reusable}
          data-single={r.single}
        >
          <h4>Aynı sayıda kullanım</h4>
          <p>
            Yeniden kullanım = üretim + kullanım×temizlik. Tek kullanımlık =
            kullanım×birim etki.
          </p>
          <Values025
            rows={[
              ["Yeniden kullanım", `${fmt025(r.reusable)} etki birimi`],
              ["Tek kullanımlık", `${fmt025(r.single)} etki birimi`],
              ["Sonuç", options[r.advantage]],
              [
                "Matematiksel başa baş",
                r.breakEven === null
                  ? "Bu verilerle yok"
                  : `${fmt025(r.breakEven)} kullanımda eşitlik`,
              ],
            ]}
          />
          <Bars025
            title="İki toplam etki; ortak güncel ölçek"
            unit="etki birimi"
            max={Math.max(r.reusable, r.single)}
            rows={[
              { key: "reusable", label: "Yeniden kullanım", value: r.reusable },
              { key: "single", label: "Tek kullanımlık", value: r.single },
            ]}
          />
        </div>
      );
    }
  } else {
    const mode = (
      <Select025
        label="Nano modeli"
        value={v.nanoMode}
        options={{
          cube: "Kayıpsız küp bölme",
          lattice: "Kübik nokta sınırı",
          length: "Uzunluk birimi dönüşümü",
        }}
        onChange={(nanoMode) => change({ nanoMode })}
      />
    );
    if (v.nanoMode === "cube") {
      const r = cube025(v.edge, v.divisions);
      scope = r.scope;
      prediction = "Toplam küçük küp sayısı";
      expected = String(r.pieces);
      options = numberChoices([
        r.divisions,
        r.divisions ** 2,
        r.pieces,
        r.pieces * 2,
      ]);
      controls = (
        <>
          {mode}
          <Range025
            label="Başlangıç küp kenarı (nm)"
            value={v.edge}
            min={10}
            max={1000}
            step={10}
            onChange={(edge) => change({ edge })}
          />
          <Range025
            label="Her eksendeki bölme sayısı"
            value={v.divisions}
            min={1}
            max={10}
            onChange={(divisions) => change({ divisions })}
          />
        </>
      );
      result = (
        <div
          data-model-result
          data-mode="cube"
          data-balanced={r.balanced}
          data-pieces={r.pieces}
          data-small-edge={r.smallEdge}
          data-area-ratio={r.areaRatio}
        >
          <h4>Hacim korunur, yüzey değişir</h4>
          <Cube025View r={r} />
          <Values025
            rows={[
              ["Parça sayısı", String(r.pieces)],
              ["Küçük kenar", `${fmt025(r.smallEdge)} nm`],
              ["Başlangıç toplam hacim", `${fmt025(r.volume)} nm³`],
              ["Son toplam hacim", `${fmt025(r.totalVolume)} nm³`],
              ["Başlangıç toplam alan", `${fmt025(r.initialArea)} nm²`],
              ["Son toplam alan", `${fmt025(r.totalArea)} nm²`],
              ["Toplam alan oranı", `${fmt025(r.areaRatio)} kat`],
              ["Son yüzey / hacim", `${fmt025(r.surfacePerVolume, 6)} nm⁻¹`],
              [
                "Küçük kenar 1–100 nm aralığında mı?",
                r.nanorange ? "Evet" : "Hayır",
              ],
            ]}
          />
        </div>
      );
    } else if (v.nanoMode === "lattice") {
      const r = lattice025(v.lattice, v.layer);
      scope = r.scope;
      prediction = "Seçili katmanda sınır noktası sayısı";
      expected = String(r.surfaceInLayer);
      options = numberChoices([r.surfaceInLayer, r.n * r.n, r.surface, 0]);
      controls = (
        <>
          {mode}
          <Range025
            label="Bir kenardaki nokta sayısı"
            value={v.lattice}
            min={2}
            max={16}
            onChange={(lattice) => change({ lattice, layer: 1 })}
          />
          <Range025
            label="Görünen katman"
            value={v.layer}
            min={1}
            max={v.lattice}
            onChange={(layer) => change({ layer })}
          />
        </>
      );
      result = (
        <div
          data-model-result
          data-mode="lattice"
          data-total={r.total}
          data-surface={r.surface}
          data-interior={r.interior}
          data-layer-surface={r.surfaceInLayer}
        >
          <h4>Sınır ile içi ayır</h4>
          <Lattice025View r={r} />
          <Values025
            rows={[
              ["Bütün küpte nokta", String(r.total)],
              ["İç nokta", String(r.interior)],
              ["Sınır noktası", String(r.surface)],
              ["Sınır payı", `%${fmt025(r.surfaceFraction * 100)}`],
              ["Seçili katmanda sınır", String(r.surfaceInLayer)],
            ]}
          />
        </div>
      );
    } else {
      const r = length025(v.length, v.unit);
      scope =
        "Birim dönüşümü aynı uzunluğu farklı birimle yazar; boyut sayısı tek başına atom sayısı veya klinik/çevresel özellik vermez.";
      prediction = "Nanometre karşılığı";
      expected = String(Number(r.nanometres.toFixed(6)));
      options = numberChoices([
        r.nanometres,
        r.nanometres * 0.001,
        r.nanometres * 1000,
      ]);
      const values = [0.001, 0.01, 0.1, 1, 10, 50, 100, 1000, v.length];
      controls = (
        <>
          {mode}
          <Select025
            label="Uzunluk değeri"
            value={v.length}
            options={Object.fromEntries(
              [...new Set(values)]
                .sort((a, b) => a - b)
                .map((x) => [String(x), fmt025(x, 6)]),
            )}
            onChange={(x) => change({ length: Number(x) })}
          />
          <Select025
            label="Başlangıç uzunluk birimi"
            value={v.unit}
            options={{ m: "m", mm: "mm", μm: "μm", nm: "nm" }}
            onChange={(unit) => change({ unit })}
          />
        </>
      );
      result = (
        <div
          data-model-result
          data-mode="length"
          data-metres={r.metres}
          data-nanometres={r.nanometres}
        >
          <h4>Aynı uzunluk, farklı birim</h4>
          <Values025
            rows={[
              ["Metre", `${r.metres.toExponential(6)} m`],
              ["Mikrometre", `${fmt025(r.micrometres, 6)} μm`],
              ["Nanometre", `${fmt025(r.nanometres, 6)} nm`],
            ]}
          />
        </div>
      );
    }
  }
  const guess = Object.hasOwn(options, v.guess) ? v.guess : "",
    canCompare = guess !== "" && v.reason.trim().length > 0;
  return (
    <section
      className="c025-lab"
      data-forge025={lessonId}
      aria-label="Enerji, malzeme ve nano ölçek keşfi"
    >
      <h3>Girdiyi, çıktıyı ve sınırı izle</h3>
      <p>
        Koşulları değiştir; hangi toplamın aynı kaldığını incele. Bu keşif
        öğrenme puanı veya konu bitiş kaydı üretmez.
      </p>
      <div className="c025-controls">{controls}</div>
      {result}
      <p className="c025-scope">{displayCopy025(scope)}</p>
      <div className="c025-prediction">
        <Select025
          label={prediction}
          value={guess}
          options={{ "": "Bir sonuç seç", ...options }}
          onChange={(guess) => persist({ guess, checked: false })}
        />
        <label className="c025-field">
          <span>Gerekçen</span>
          <input
            value={v.reason}
            maxLength={128}
            onChange={(e) =>
              persist({ reason: e.target.value, checked: false })
            }
            placeholder="Oran, birim veya korunan toplamı belirt."
          />
        </label>
        <button
          type="button"
          disabled={!canCompare}
          onClick={() => persist({ checked: true })}
        >
          Kıyasla
        </button>
        <button type="button" onClick={() => persist({ show: !v.show })}>
          {v.show ? "Kanıtı kapat" : "Kanıtı göster"}
        </button>
        {v.checked && canCompare && (
          <p className="c025-feedback" role="status">
            {guess === expected
              ? "Kanıtla uyumlu."
              : "Girdi ve işlem sırasını yeniden karşılaştır."}{" "}
            Sonuç: {options[expected] ?? expected}. Yazılı gerekçenin bilimsel
            doğruluğu için otomatik puan verilmez.
          </p>
        )}
        {v.show && (
          <p className="c025-proof">
            Kanıtlanan model sonucu: {options[expected] ?? expected}. {scope}
          </p>
        )}
      </div>
    </section>
  );
}
