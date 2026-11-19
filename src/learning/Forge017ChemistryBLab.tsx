import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  configurationB017,
  quantumB017,
  angularB017,
  radiusB017,
  radiusFamiliesB017,
  ionEnergyB017,
  affinityB017,
  bondB017,
  oxidationB017,
  oxidationKindsB017,
  gasB017,
  lawB017,
  type LawB017,
} from "./forge017ChemistryB";
import "./forge017ChemistryB.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 }).format(n);
const signed = (n: number) => (n > 0 ? "+" : "") + fmt(n);
const bound = (x: number, low: number, high: number) =>
  Number.isFinite(x) ? Math.max(low, Math.min(high, x)) : low;
const choose = <T extends string>(
  x: string,
  values: readonly T[],
  fallback: T,
): T => (values.includes(x as T) ? (x as T) : fallback);
const defaults = { prediction: "", reason: "", checked: false };
type PredictionState = typeof defaults;
type Option = readonly [string, string];
function Choice({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly Option[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="cb017-field">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </ChoiceSelect>
    </div>
  );
}
function Range({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="cb017-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <output htmlFor={id}>
        {fmt(value)} {unit}
      </output>
    </div>
  );
}
function Diagram({
  title,
  children,
  height = 480,
}: {
  title: string;
  children: ReactNode;
  height?: number;
}) {
  const id = useId();
  return (
    <svg
      className="cb017-diagram"
      viewBox={`0 0 720 ${height}`}
      role="img"
      aria-labelledby={id}
    >
      <title id={id}>{title}</title>
      {children}
    </svg>
  );
}
function Frame({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="cb017-lab" data-forge017={id}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}
function Prediction({
  state,
  change,
  compare,
  prompt,
  options,
  expected,
  evidence,
}: {
  state: PredictionState;
  change: (patch: Partial<PredictionState>) => void;
  compare: () => void;
  prompt: string;
  options: readonly Option[];
  expected: string;
  evidence: string;
}) {
  const reasonId = useId();
  return (
    <div className="cb017-prediction">
      <h4>Önce düşün, sonra karşılaştır</h4>
      <p>{prompt}</p>
      <Choice
        label="Sonuç tahminin"
        value={state.prediction}
        options={[["", "Seç"], ...options]}
        onChange={(prediction) => change({ prediction })}
      />
      <label htmlFor={reasonId}>Modelden gerekçen</label>
      <textarea
        id={reasonId}
        maxLength={120}
        rows={3}
        value={state.reason.slice(0, 120)}
        onChange={(e) => change({ reason: e.target.value.slice(0, 120) })}
      />
      <p className="cb017-caption">
        Kısa gerekçen bu cihazda kaydolur. Keşif yapmak soru sonucu veya konu
        tamamlama kaydı oluşturmaz.
      </p>
      <button
        type="button"
        className="cb017-compare"
        disabled={!state.prediction}
        onClick={compare}
      >
        Tahminimi karşılaştır
      </button>
      {state.checked && (
        <div className="cb017-feedback" role="status">
          <strong>
            {state.prediction === expected
              ? "Tahminin bu koşullarla uyumlu."
              : "Tahminini kanıtla yeniden değerlendir."}
          </strong>
          <p>{evidence}</p>
        </div>
      )}
    </div>
  );
}
function FillingLab() {
  const id = "ayt-modern-atom-elektron-dizilimi";
  const [p, set] = useExploration("forge017-chem-b:" + id, {
    ...defaults,
    z: 26,
    charge: 0,
  });
  const change = (patch: Partial<typeof p>) =>
    set({ ...patch, checked: false });
  const z = Math.round(bound(p.z, 1, 36)),
    charge = Math.round(bound(p.charge, 0, Math.min(z, 3))),
    m = configurationB017(z, charge);
  return (
    <Frame id={id} title="Atom ve iyon">
      <p>
        Nötr atomdan yükü değiştir. Önce hangi alt kabuktan elektron
        ayrılacağını ve eşleşmemiş elektronların kalıp kalmayacağını düşün.
      </p>
      <div className="cb017-controls">
        <Choice
          label="Element ve atom numarası"
          value={String(z)}
          options={[
            ["6", "C · 6"],
            ["7", "N · 7"],
            ["8", "O · 8"],
            ["15", "P · 15"],
            ["16", "S · 16"],
            ["18", "Ar · 18"],
            ["20", "Ca · 20"],
            ["23", "V · 23"],
            ["24", "Cr · 24"],
            ["26", "Fe · 26"],
            ["27", "Co · 27"],
            ["28", "Ni · 28"],
            ["29", "Cu · 29"],
            ["30", "Zn · 30"],
            ["36", "Kr · 36"],
          ]}
          onChange={(v) => change({ z: Number(v) })}
        />
        <Choice
          label="Pozitif iyon yükü"
          value={String(charge)}
          options={[
            ["0", "Nötr"],
            ["1", "+1"],
            ["2", "+2"],
            ["3", "+3"],
          ]}
          onChange={(v) => change({ charge: Number(v) })}
        />
      </div>
      <Prediction
        state={p}
        change={change}
        compare={() => set({ checked: true, reason: p.reason.slice(0, 120) })}
        prompt="Son dizilimde kaç eşleşmemiş elektron kalır?"
        options={[
          ["none", "Yok"],
          ["one", "Bir"],
          ["many", "Çok"],
        ]}
        expected={m.unpaired === 0 ? "none" : m.unpaired === 1 ? "one" : "many"}
        evidence={`Son kutu sayımında ${m.unpaired} eşleşmemiş elektron vardır. Toplam elektron ${m.electrons}; her dolu kutu Pauli/Hund koşullarıyla okunur.`}
      />
      <Diagram
        title="Alt kabukların ayrı orbital kutuları ve spin dolulukları"
        height={520}
      >
        {m.rows.map((r, i) => (
          <g key={r.name} data-subshell={r.name} data-count={r.count}>
            <text x={45} y={65 + i * 54}>
              {r.name}
            </text>
            {r.boxes.map((b, j) => (
              <g key={j} data-orbital-box={r.name} data-occupancy={b}>
                <rect
                  x={145 + j * 70}
                  y={35 + i * 54}
                  width={54}
                  height={42}
                  className={b ? "cb017-soft" : "cb017-empty"}
                />
                <text
                  x={172 + j * 70}
                  y={64 + i * 54}
                  textAnchor="middle"
                  className="cb017-spin"
                >
                  {b === 2 ? "↑↓" : b === 1 ? "↑" : ""}
                </text>
              </g>
            ))}
            <text x={590} y={65 + i * 54}>
              {r.count} e⁻
            </text>
          </g>
        ))}
      </Diagram>
      <p className="cb017-caption">
        Her kutu bir orbital; oklar iki spin izdüşümünün sembolüdür. Kutu boyu
        enerji, gerçek yörünge veya bağ geometrisi ölçmez. V⁺, Co⁺ ve Ni⁺ için
        doğrulanmış yeniden düzenlenme de hesaba katılır.
      </p>
      <div className="cb017-result" data-model-result>
        <p>
          <strong>Elektron sayısı: {m.electrons}</strong> = {m.z} − {m.charge}
        </p>
        <p data-configuration>{m.configuration}</p>
        <p data-unpaired>Eşleşmemiş elektron: {m.unpaired}</p>
        <p>
          Katman toplamları: {m.shells.join(" + ")} = {m.electrons}
        </p>
      </div>
    </Frame>
  );
}
function QuantumLab() {
  const id = "ayt-kuantum-sayilari",
    [p, set] = useExploration("forge017-chem-b:" + id, {
      ...defaults,
      n: 2,
      l: 1,
      ml: 0,
      ms: 0.5,
    });
  const change = (patch: Partial<typeof p>) =>
    set({ ...patch, checked: false });
  const n = Math.round(bound(p.n, 1, 4)),
    l = Math.round(bound(p.l, 0, 3)),
    ml = Math.round(bound(p.ml, -3, 3)),
    ms = p.ms === -0.5 ? -0.5 : 0.5,
    q = quantumB017(n, l, ml, ms);
  const points = q.valid
    ? Array.from({ length: 361 }, (_, i) => ({
        angle: (i * Math.PI) / 180,
        a: angularB017(l, ml, (i * Math.PI) / 180),
      }))
    : [];
  const max = Math.max(...points.map((v) => v.a), 1e-12),
    path =
      points
        .map(
          (v, i) =>
            `${i ? "L" : "M"}${360 + ((145 * v.a) / max) * Math.sin(v.angle)},${240 - ((145 * v.a) / max) * Math.cos(v.angle)}`,
        )
        .join(" ") + " Z";
  return (
    <Frame id={id} title="Dört sayıyı birlikte denetle">
      <div className="cb017-controls">
        <Choice
          label="Baş kuantum sayısı n"
          value={String(n)}
          options={[1, 2, 3, 4].map((v) => [String(v), String(v)])}
          onChange={(v) => change({ n: Number(v) })}
        />
        <Choice
          label="Yan kuantum sayısı l"
          value={String(l)}
          options={[
            ["0", "0 · s"],
            ["1", "1 · p"],
            ["2", "2 · d"],
            ["3", "3 · f"],
          ]}
          onChange={(v) => change({ l: Number(v) })}
        />
        <Choice
          label="Manyetik sayı m_l"
          value={String(ml)}
          options={[-3, -2, -1, 0, 1, 2, 3].map((v) => [String(v), signed(v)])}
          onChange={(v) => change({ ml: Number(v) })}
        />
        <Choice
          label="Spin m_s"
          value={String(ms)}
          options={[
            ["0.5", "+1/2"],
            ["-0.5", "−1/2"],
          ]}
          onChange={(v) => change({ ms: Number(v) })}
        />
      </div>
      <Prediction
        state={p}
        change={change}
        compare={() => set({ checked: true, reason: p.reason.slice(0, 120) })}
        prompt="Seçtiğin dört sayı birlikte izinli mi?"
        options={[
          ["valid", "İzinli"],
          ["invalid", "Geçersiz"],
        ]}
        expected={q.valid ? "valid" : "invalid"}
        evidence={q.reason}
      />
      <Diagram title="Seçilmiş z eksenine göre açısal genlik büyüklüğünün polar kesiti">
        <path d="M100 240H620M360 55V425" className="cb017-axis" />
        <text x={615} y={266}>
          x
        </text>
        <text x={380} y={65}>
          z
        </text>
        {q.valid ? (
          <path
            data-angular-profile
            data-l={l}
            data-ml={ml}
            d={path}
            className="cb017-soft"
          />
        ) : (
          <text x={360} y={210} textAnchor="middle" data-invalid-quantum>
            İzinli orbital yok
          </text>
        )}
        <circle cx={360} cy={240} r={4} className="cb017-dot" />
      </Diagram>
      <p className="cb017-caption">
        Çizim |P_l^m(cos θ)| açısal genliğinin nitel polar kesitidir; üç boyutlu
        sert sınır veya radyal olasılık grafiği değildir. +m ve −m bu büyüklükte
        aynı görünür; spin profilin şekli değildir. Radyal düğüm hesabı hidrojen
        benzeri model içindir.
      </p>
      <div className="cb017-result" data-model-result>
        <p>
          <strong>{q.reason}</strong>
        </p>
        {q.valid && (
          <>
            <p data-quantum-capacity>
              {q.name}: {q.orbitals} orbital; en fazla {q.capacity} elektron.
            </p>
            <p>n katmanı kapasitesi: {q.shellCapacity} elektron.</p>
            <p data-quantum-nodes>
              Radyal düğüm: {q.radialNodes}; açısal düğüm: {q.angularNodes}.
            </p>
          </>
        )}
      </div>
    </Frame>
  );
}
function RadiusLab() {
  const id = "ayt-periyodik-sistem-atom-capi",
    [p, set] = useExploration("forge017-chem-b:" + id, {
      ...defaults,
      family: "iso",
      first: 0,
      second: 2,
    });
  const change = (patch: Partial<typeof p>) =>
    set({ ...patch, checked: false });
  const family = choose(p.family, ["iso", "period", "group"], "iso"),
    f = radiusFamiliesB017.find((x) => x.id === family)!,
    first = Math.round(bound(p.first, 0, f.species.length - 1)),
    second = Math.round(bound(p.second, 0, f.species.length - 1)),
    m = radiusB017(family, first, second);
  return (
    <Frame id={id} title="Önce kıyas koşulu">
      <div className="cb017-controls">
        <Choice
          label="Örnek türü"
          value={family}
          options={[
            ["iso", "İyonlar"],
            ["period", "Periyot"],
            ["group", "Grup"],
          ]}
          onChange={(v) => change({ family: v, first: 0, second: 2 })}
        />
        <Choice
          label="İlk tanecik"
          value={String(first)}
          options={f.species.map((s, i) => [String(i), s.name])}
          onChange={(v) => change({ first: Number(v) })}
        />
        <Choice
          label="Son tanecik"
          value={String(second)}
          options={f.species.map((s, i) => [String(i), s.name])}
          onChange={(v) => change({ second: Number(v) })}
        />
      </div>
      <p>
        <strong>{f.name}</strong>
      </p>
      <Prediction
        state={p}
        change={change}
        compare={() => set({ checked: true, reason: p.reason.slice(0, 120) })}
        prompt="Bu aile içinde ilk taneciğin yarıçapını son taneciğe göre nasıl beklersin?"
        options={[
          [">", "İlk > son"],
          ["<", "İlk < son"],
          ["=", "Eşit"],
        ]}
        expected={m.comparison}
        evidence={`${m.a.name} ${m.comparison} ${m.b.name}. ${f.reason}`}
      />
      <Diagram
        title="Karşılaştırılabilir iki taneciğin nitel bulut boyları"
        height={400}
      >
        {[
          { x: 225, s: m.a, r: m.sizeA, key: "first" },
          { x: 495, s: m.b, r: m.sizeB, key: "second" },
        ].map((v) => (
          <g key={v.key}>
            <circle
              data-radius-cloud={v.key}
              cx={v.x}
              cy={180}
              r={v.r}
              className="cb017-cloud"
            />
            <circle cx={v.x} cy={180} r={24} className="cb017-soft" />
            <text x={v.x} y={187} textAnchor="middle">
              {v.s.z}p
            </text>
            <text x={v.x} y={315} textAnchor="middle">
              {v.s.name}
            </text>
          </g>
        ))}
      </Diagram>
      <p className="cb017-caption">{m.condition}</p>
      <div className="cb017-result" data-model-result>
        <p data-radius-order>
          <strong>
            {m.a.name} {m.comparison} {m.b.name}
          </strong>{" "}
          · nitel yarıçap
        </p>
        <p>
          Elektron sayıları: ilk {m.a.electrons}, son {m.b.electrons}. Proton
          sayıları: ilk {m.a.z}, son {m.b.z}.
        </p>
        <p>{f.reason}</p>
      </div>
    </Frame>
  );
}
function EnergyLab() {
  const id = "ayt-iyonlasma-elektron-ilgisi-en",
    [p, set] = useExploration("forge017-chem-b:" + id, {
      ...defaults,
      mode: "ion",
      element: "al",
      step: 1,
      affinity: "f",
      convention: "release",
      bond: "hcl",
    });
  const change = (patch: Partial<typeof p>) =>
    set({ ...patch, checked: false });
  const mode = choose(p.mode, ["ion", "affinity", "bond"], "ion"),
    element = choose(p.element, ["na", "mg", "al"], "al"),
    step = Math.round(bound(p.step, 1, 4)),
    affElement = choose(p.affinity, ["f", "cl"], "f"),
    convention = choose(p.convention, ["release", "enthalpy"], "release"),
    bond = choose(p.bond, ["hcl", "hf"], "hcl"),
    ion = ionEnergyB017(element, step),
    aff = affinityB017(affElement, convention),
    polar = bondB017(bond);
  const evidence =
    mode === "ion"
      ? `${ion.name} için ${step}. koparma ${fmt(ion.energy)} kJ/mol; başlangıç yükü ${signed(ion.beforeCharge)}. ${ion.core ? "İç düzen" : "Dış elektronlar"} bölgesinden koparma izlenir.`
      : mode === "affinity"
        ? `${aff.name} elektron alırken ${aff.released} kJ/mol salar. A=${aff.released}, ΔH=${aff.deltaH} kJ/mol; gösterim değişince olay tersine dönmez.`
        : `${polar.direction}; Pauling farkı ${fmt(polar.difference)}. Bu kısmi yük yönüdür.`;
  const predictor = (
    <Prediction
      state={p}
      change={change}
      compare={() => set({ checked: true, reason: p.reason.slice(0, 120) })}
      prompt={
        mode === "ion"
          ? "Seçili basamak dış elektronlardan mı, kapalı iç düzenden mi elektron çıkarır?"
          : mode === "affinity"
            ? "Bu elektron kazanımında dışarıya enerji salımı mı, enerji alımı mı vardır?"
            : "Bağda elektronları daha güçlü çeken taraf hangisi?"
      }
      options={
        mode === "ion"
          ? [
              ["outer", "Dış"],
              ["core", "İç"],
            ]
          : mode === "affinity"
            ? [
                ["release", "Salım"],
                ["absorb", "Alım"],
              ]
            : [
                ["left", "Sol"],
                ["right", "Sağ"],
              ]
      }
      expected={
        mode === "ion"
          ? ion.core
            ? "core"
            : "outer"
          : mode === "affinity"
            ? "release"
            : "right"
      }
      evidence={evidence}
    />
  );
  return (
    <Frame id={id} title="Hangi elektron işlemi?">
      <Choice
        label="İncelenen süreç"
        value={mode}
        options={[
          ["ion", "İE"],
          ["affinity", "Eİ"],
          ["bond", "Bağ"],
        ]}
        onChange={(v) => change({ mode: v, prediction: "" })}
      />
      {mode === "ion" ? (
        <>
          <div className="cb017-controls">
            <Choice
              label="İyonlaşma tablosu"
              value={element}
              options={[
                ["na", "Na"],
                ["mg", "Mg"],
                ["al", "Al"],
              ]}
              onChange={(v) => change({ element: v })}
            />
            <Choice
              label="Koparma basamağı"
              value={String(step)}
              options={[1, 2, 3, 4].map((v) => [String(v), String(v)])}
              onChange={(v) => change({ step: Number(v) })}
            />
          </div>
          {predictor}
          <Diagram
            title="Ardışık koparma enerjileri; düşey eksen kJ/mol"
            height={500}
          >
            <path d="M105 55V420H650" className="cb017-axis" />
            {[0, 4000, 8000, 12000].map((v) => (
              <g key={v}>
                <path d={`M100 ${420 - v / 40}H650`} className="cb017-grid" />
                <text x={88} y={426 - v / 40} textAnchor="end">
                  {v}
                </text>
              </g>
            ))}
            <text x={45} y={35}>
              kJ/mol
            </text>
            {ion.values.map((v, i) => (
              <g key={i}>
                <rect
                  data-energy-bar={i + 1}
                  data-energy={v}
                  x={160 + i * 120}
                  y={420 - v / 40}
                  width={64}
                  height={v / 40}
                  className={i + 1 === step ? "cb017-fill" : "cb017-soft"}
                />
                <text x={192 + i * 120} y={450} textAnchor="middle">
                  {i + 1}
                </text>
              </g>
            ))}
            <text x={550} y={483}>
              Basamak
            </text>
          </Diagram>
          <p className="cb017-caption">
            Yuvarlatılmış kaynak değerleri kJ/mol. Bir basamağın çubuğu toplam
            koparma enerjisi değildir; 3 veya 3,5 kat artış evrensel iç-katman
            eşiği değildir.
          </p>
          <div className="cb017-result" data-model-result>
            <p data-ion-step>
              <strong>
                {ion.name}: {step}. iyonlaşma = {fmt(ion.energy)} kJ/mol
              </strong>
            </p>
            <p>
              Gaz türü yükü: {signed(ion.beforeCharge)} →{" "}
              {signed(ion.afterCharge)}.
            </p>
            <p data-ion-total>
              Nötrden bu yüke toplam: {fmt(ion.total)} kJ/mol.
            </p>
            <p>
              {ion.core
                ? "İç düzenin elektronuna geçildi."
                : "Bu basamak dış elektronları çıkarır."}
            </p>
          </div>
        </>
      ) : mode === "affinity" ? (
        <>
          <div className="cb017-controls">
            <Choice
              label="Elektron alan atom"
              value={affElement}
              options={[
                ["f", "F"],
                ["cl", "Cl"],
              ]}
              onChange={(v) => change({ affinity: v })}
            />
            <Choice
              label="Raporlanan enerji"
              value={convention}
              options={[
                ["release", "A"],
                ["enthalpy", "ΔH"],
              ]}
              onChange={(v) => change({ convention: v })}
            />
          </div>
          {predictor}
          <Diagram
            title="Elektron kazanımında son enerji daha aşağıda; A ve ΔH farklı işaret sözleşmeleri"
            height={430}
          >
            <path d="M130 110H620" className="cb017-line" />
            <text x={130} y={90}>
              Atom + e⁻
            </text>
            <path
              d={`M130 ${110 + aff.released * 0.65}H620`}
              className="cb017-line"
            />
            <path
              data-affinity-arrow
              d={`M360 110V${110 + aff.released * 0.65}m-10 -15l10 15 10-15`}
              className="cb017-signal"
            />
            <text x={130} y={145 + aff.released * 0.65}>
              {aff.name}⁻
            </text>
          </Diagram>
          <div className="cb017-result" data-model-result>
            <p data-affinity-result>
              <strong>
                {convention === "release" ? "A" : "ΔH"} = {signed(aff.shown)}{" "}
                kJ/mol
              </strong>
            </p>
            <p>
              Açığa çıkan enerji: {aff.released} kJ/mol. Süreç ΔH = {aff.deltaH}{" "}
              kJ/mol.
            </p>
            <p>
              Çizimde aşağı yön enerji azalmasıdır; bu nicel düşey ölçek yalnız
              bu enerji farkını karşılaştırır.
            </p>
          </div>
        </>
      ) : (
        <>
          <Choice
            label="İncelenen bağ"
            value={bond}
            options={[
              ["hcl", "H–Cl"],
              ["hf", "H–F"],
            ]}
            onChange={(v) => change({ bond: v })}
          />
          {predictor}
          <Diagram
            title="Elektronegatiflik farkına göre nitel bağ kutuplaşması"
            height={380}
          >
            <path d="M210 180H510" className="cb017-line" />
            <ellipse
              data-bond-cloud
              cx={360 + polar.difference * 35}
              cy={180}
              rx={100}
              ry={45}
              className="cb017-cloud"
            />
            <circle cx={210} cy={180} r={32} className="cb017-tissue" />
            <circle cx={510} cy={180} r={32} className="cb017-tissue" />
            <text x={210} y={187} textAnchor="middle">
              H
            </text>
            <text x={510} y={187} textAnchor="middle">
              {polar.right.name}
            </text>
            <path
              d={`M280 290H${360 + polar.difference * 55}m-15-10l15 10-15 10M280 280V300`}
              className="cb017-signal"
            />
          </Diagram>
          <p className="cb017-caption">
            Bulut konumu ve ok uzunluğu nitel yön şemasıdır; ölçülmüş elektron
            yoğunluğu veya yük miktarı değildir.
          </p>
          <div className="cb017-result" data-model-result>
            <p data-bond-direction>
              <strong>{polar.direction}</strong>
            </p>
            <p>
              Pauling: H {fmt(polar.left.en)}, {polar.right.name}{" "}
              {fmt(polar.right.en)}; fark {fmt(polar.difference)}.
            </p>
            <p>{polar.condition}</p>
          </div>
        </>
      )}
    </Frame>
  );
}
function OxidationLab() {
  const id = "ayt-elementler-yukseltgenme",
    [p, set] = useExploration("forge017-chem-b:" + id, {
      ...defaults,
      kind: "ammonium",
      stage: 0,
    });
  const change = (patch: Partial<typeof p>) =>
    set({ ...patch, checked: false });
  const kind = oxidationKindsB017.some((v) => v.id === p.kind)
      ? p.kind
      : "ammonium",
    stage = Math.round(bound(p.stage, 0, 2)),
    m = oxidationB017(kind),
    knownAtoms = oxidationKindsB017.find((v) => v.id === kind)!.known;
  const atoms = [
    ...Array.from({ length: m.count }, () => ({
      atom: m.atom,
      value: m.value,
      unknown: true,
    })),
    ...knownAtoms.flatMap((v) =>
      Array.from({ length: v.count }, () => ({
        atom: v.atom,
        value: v.value,
        unknown: false,
      })),
    ),
  ];
  const rowCount = Math.ceil(atoms.length / 5);
  const tileX = (i: number) => {
    const row = Math.floor(i / 5),
      count = Math.min(5, atoms.length - row * 5);
    return (720 - ((count - 1) * 115 + 90)) / 2 + (i % 5) * 115;
  };
  return (
    <Frame id={id} title="Yük toplamını birlikte kur">
      <div className="cb017-controls">
        <Choice
          label="Kimyasal tür"
          value={kind}
          options={oxidationKindsB017.map((v) => [v.id, v.formula])}
          onChange={(v) => change({ kind: v, stage: 0 })}
        />
        <Choice
          label="Hesabın adımı"
          value={String(stage)}
          options={[
            ["0", "Say"],
            ["1", "Topla"],
            ["2", "Çöz"],
          ]}
          onChange={(v) => change({ stage: Number(v) })}
        />
      </div>
      <p>
        <strong>{m.name}</strong>
      </p>
      <Prediction
        state={p}
        change={change}
        compare={() => set({ checked: true, reason: p.reason.slice(0, 120) })}
        prompt="Bilinmeyenin hesabı negatif, pozitif tam sayı veya kesirli ortalama mı verir? Adımları açmadan önce tahmin et."
        options={[
          ["negative", "Negatif"],
          ["positive", "Pozitif"],
          ["fraction", "Kesirli"],
        ]}
        expected={
          m.fractional ? "fraction" : m.value < 0 ? "negative" : "positive"
        }
        evidence={`${m.count}x + (${signed(m.known)}) = ${signed(m.charge)}; ${m.atom} için ${m.fractional ? "ortalama +8/3" : signed(m.value)} bulunur. Net yük toplamı korunur.`}
      />
      <Diagram
        title="Formüldeki atom adetleri; kutular molekülün bağ geometrisi değildir"
        height={rowCount * 155 + 110}
      >
        {atoms.map((v, i) => (
          <g key={i} data-counted-atom={v.atom}>
            <rect
              x={tileX(i)}
              y={65 + Math.floor(i / 5) * 155}
              width={90}
              height={110}
              className={v.unknown ? "cb017-soft" : "cb017-tissue"}
            />
            <text
              x={tileX(i) + 45}
              y={105 + Math.floor(i / 5) * 155}
              textAnchor="middle"
            >
              {v.atom}
            </text>
            <text
              x={tileX(i) + 45}
              y={145 + Math.floor(i / 5) * 155}
              textAnchor="middle"
            >
              {v.unknown
                ? stage === 2
                  ? signed(v.value)
                  : "x"
                : stage >= 1
                  ? signed(v.value)
                  : "?"}
            </text>
          </g>
        ))}
        <text x={360} y={rowCount * 155 + 75} textAnchor="middle">
          Net yük: {signed(m.charge)}
        </text>
      </Diagram>
      <p className="cb017-caption">
        Kutular atom sayımıdır; bağ geometrisi veya ayrı serbest atom iyonları
        değildir. Basamak, kısmi yük ve net iyon yükü farklı kavramlardır.
      </p>
      <div className="cb017-result" data-model-result>
        <p>
          {m.atom} adedi: {m.count}. Net tür yükü: {signed(m.charge)}.
        </p>
        {stage >= 1 && (
          <p data-known-contribution>
            Bilinen katkı:{" "}
            {knownAtoms
              .map((v) => `${v.count}×(${signed(v.value)})`)
              .join(" + ")}{" "}
            = {signed(m.known)}.
          </p>
        )}
        {stage === 2 && (
          <>
            <p data-oxidation-equation>
              {m.count}x + ({signed(m.known)}) = {signed(m.charge)}
            </p>
            <p data-oxidation-value>
              <strong>
                {m.atom} için {m.fractional ? "ortalama " : ""}x ={" "}
                {m.fractional ? "+8/3" : signed(m.value)}
              </strong>
            </p>
            <p>
              Toplam: {signed(m.totalUnknown)} + ({signed(m.known)}) ={" "}
              {signed(m.total)}.
            </p>
            {m.fractional && (
              <p>
                Kesirli biçimsel ortalama, her atomun serbest +8/3 iyon yükünde
                bulunduğunu söylemez.
              </p>
            )}
          </>
        )}
      </div>
    </Frame>
  );
}
function GasLab() {
  const id = "ayt-gaz-ozellikleri",
    [p, set] = useExploration("forge017-chem-b:" + id, {
      ...defaults,
      moles: 1,
      temperature: 300,
      volume: 12,
      mass: 4,
      area: 2,
    });
  const change = (patch: Partial<typeof p>) =>
    set({ ...patch, checked: false });
  const n = bound(p.moles, 0, 3),
    t = bound(p.temperature, 150, 600),
    v = bound(p.volume, 4, 20),
    mass = bound(p.mass, 2, 44),
    area = bound(p.area, 1, 5),
    m = gasB017(n, t, v, mass, area),
    baseline = gasB017(1, 300, 12, 4, 2),
    count = Math.round(n * 12),
    width = 140 + v * 18,
    center = 360;
  const particles = Array.from({ length: count }, (_, i) => ({
    x: center - width / 2 + 50 + ((i * 73) % Math.max(1, width - 100)),
    y: 110 + ((i * 67) % 180),
    angle: i * 2.4,
  }));
  return (
    <Frame id={id} title="Aynı basınç, farklı hız olabilir mi?">
      <p>
        Referans durum: 1 mol, 300 K, 12 L, M=4 g/mol. Her kontrolde kalan
        koşulları birlikte oku.
      </p>
      <div className="cb017-controls">
        <Range
          label="Madde miktarı (mol)"
          value={n}
          min={0}
          max={3}
          step={0.25}
          unit="mol"
          onChange={(moles) => change({ moles })}
        />
        <Range
          label="Sıcaklık (K)"
          value={t}
          min={150}
          max={600}
          step={25}
          unit="K"
          onChange={(temperature) => change({ temperature })}
        />
        <Range
          label="Hacim (L)"
          value={v}
          min={4}
          max={20}
          unit="L"
          onChange={(volume) => change({ volume })}
        />
        <Range
          label="Mol kütlesi (g/mol)"
          value={mass}
          min={2}
          max={44}
          step={2}
          unit="g/mol"
          onChange={(mass) => change({ mass })}
        />
        <Range
          label="Duvar alanı (cm²)"
          value={area}
          min={1}
          max={5}
          unit="cm²"
          onChange={(area) => change({ area })}
        />
      </div>
      <Prediction
        state={p}
        change={change}
        compare={() => set({ checked: true, reason: p.reason.slice(0, 120) })}
        prompt="Seçili durumda basınç referansa göre nasıl değişir? Mol kütlesini değiştirmenin etkisini de gerekçene ekle."
        options={[
          ["less", "Az"],
          ["same", "Aynı"],
          ["more", "Çok"],
        ]}
        expected={
          Math.abs(m.pressure - baseline.pressure) < 1e-10
            ? "same"
            : m.pressure > baseline.pressure
              ? "more"
              : "less"
        }
        evidence={`P=nRT/V ile ${fmt(m.pressure)} atm; referans ${fmt(baseline.pressure)} atm. ${m.rms === null ? "Kap boş." : `v_rms ${fmt(m.rms)} m/s; hız M'ye bağlıdır.`}`}
      />
      <Diagram
        title="Şematik tanecikler ve kap hacmi; basınç ve hız tam hesapla normal metinde"
        height={420}
      >
        <rect
          data-gas-container
          x={center - width / 2}
          y={55}
          width={width}
          height={290}
          className="cb017-empty"
        />
        {particles.map((a, i) => {
          const speed = (m.rms ?? 0) / 70,
            dx = Math.cos(a.angle) * speed,
            dy = Math.sin(a.angle) * speed,
            tipX = a.x + dx,
            tipY = a.y + dy;
          return (
            <g key={i} data-gas-particle>
              <path
                d={`M${a.x} ${a.y}l${dx} ${dy}M${tipX - Math.cos(a.angle - 0.5) * 5} ${tipY - Math.sin(a.angle - 0.5) * 5}L${tipX} ${tipY}L${tipX - Math.cos(a.angle + 0.5) * 5} ${tipY - Math.sin(a.angle + 0.5) * 5}`}
                className="cb017-velocity"
              />
              <circle cx={a.x} cy={a.y} r={5} className="cb017-dot" />
            </g>
          );
        })}
        <text x={360} y={390} textAnchor="middle">
          {fmt(v)} L · {fmt(n)} mol
        </text>
      </Diagram>
      <p className="cb017-caption">
        12 simge/mol oranıyla temsili miktar; konumlar gerçek deney örneklemi
        değildir. Oklar v_rms ile ölçeklenen yön şemasıdır; gerçek hız dağılımı
        veya tanecik izi değildir. R≈8,314 J/(mol·K), 1 atm=101325 Pa
        kullanılır.
      </p>
      <div className="cb017-result" data-model-result>
        <p data-pressure-atm={m.pressure}>
          <strong>P = {fmt(m.pressure)} atm</strong> = {fmt(m.pressurePa)} Pa
        </p>
        <p data-rms={m.rms ?? "empty"}>
          {m.rms === null
            ? "Kap boş; gözlenecek gaz taneciği ve v_rms yok."
            : `v_rms = ${fmt(m.rms)} m/s`}
        </p>
        <p>
          Öteleme enerjisi = {fmt(m.translationEnergy)} J; tüm dönme/titreşim iç
          enerjisi değildir.
        </p>
        <p data-wall-force>Seçili alana dik kuvvet = {fmt(m.force)} N.</p>
        <p>
          Referans basınç: {fmt(baseline.pressure)} atm. Aynı n,T,V’de M
          değişimi basıncı değiştirmez.
        </p>
      </div>
    </Frame>
  );
}
function LawLab() {
  const id = "ayt-gaz-yasalari",
    [p, set] = useExploration("forge017-chem-b:" + id, {
      ...defaults,
      mode: "boyle",
      temperature: 300,
      volume: 24.6,
      moles: 1,
    });
  const change = (patch: Partial<typeof p>) =>
    set({ ...patch, checked: false });
  const mode = choose<LawB017>(
      p.mode,
      ["boyle", "charles", "gay", "avogadro", "combined"],
      "boyle",
    ),
    t = bound(p.temperature, 150, 600),
    v = bound(p.volume, 8.2, 49.2),
    n = bound(p.moles, 0.25, 3),
    m = lawB017(mode, t, v, n);
  const xMin =
      mode === "charles" || mode === "gay"
        ? 150
        : mode === "avogadro"
          ? 0.25
          : 8.2,
    xMax =
      mode === "charles" || mode === "gay"
        ? 600
        : mode === "avogadro"
          ? 3
          : 49.2;
  const yAt = (x: number) =>
    mode === "boyle"
      ? 24.6 / x
      : mode === "charles"
        ? 0.082 * x
        : mode === "gay"
          ? x / 300
          : mode === "avogadro"
            ? 24.6 * x
            : (m.n * 0.082 * m.temperature) / x;
  const yMax = Math.max(yAt(xMin), yAt(xMax)) * 1.1,
    sx = (x: number) => 115 + ((x - xMin) / (xMax - xMin)) * 500,
    sy = (y: number) => 380 - (y / yMax) * 290;
  const path = Array.from({ length: 101 }, (_, i) => {
    const x = xMin + (i / 100) * (xMax - xMin);
    return `${i ? "L" : "M"}${sx(x)} ${sy(yAt(x))}`;
  }).join(" ");
  const title = {
    boyle: "Boyle",
    charles: "Charles",
    gay: "Gay-Lussac",
    avogadro: "Avogadro",
    combined: "Birleşik değişim",
  }[mode];
  return (
    <Frame id={id} title="Sabitleri seç, sonucu izle">
      <Choice
        label="Gaz deneyi"
        value={mode}
        options={[
          ["boyle", "P–V"],
          ["charles", "V–T"],
          ["gay", "P–T"],
          ["avogadro", "V–n"],
          ["combined", "Birleşik"],
        ]}
        onChange={(v) => change({ mode: v })}
      />
      <p>
        <strong>{title}</strong> · {m.fixed}
      </p>
      <div className="cb017-controls">
        {["charles", "gay", "combined"].includes(mode) && (
          <Range
            label="Son sıcaklık (K)"
            value={t}
            min={150}
            max={600}
            step={25}
            unit="K"
            onChange={(temperature) => change({ temperature })}
          />
        )}
        {["boyle", "combined"].includes(mode) && (
          <Range
            label="Son hacim (L)"
            value={v}
            min={8.2}
            max={49.2}
            step={0.1}
            unit="L"
            onChange={(volume) => change({ volume })}
          />
        )}
        {["avogadro", "combined"].includes(mode) && (
          <Range
            label="Son miktar (mol)"
            value={n}
            min={0.25}
            max={3}
            step={0.25}
            unit="mol"
            onChange={(moles) => change({ moles })}
          />
        )}
      </div>
      <Prediction
        state={p}
        change={change}
        compare={() => set({ checked: true, reason: p.reason.slice(0, 120) })}
        prompt="Son basınç, başlangıçtaki 1 atm’ye göre nasıl olur? Önce hangi değişkenlerin sabit olduğunu yaz."
        options={[
          ["less", "Az"],
          ["same", "Aynı"],
          ["more", "Çok"],
        ]}
        expected={
          Math.abs(m.pressure - 1) < 1e-10
            ? "same"
            : m.pressure > 1
              ? "more"
              : "less"
        }
        evidence={`${m.fixed}. Son basınç ${fmt(m.pressure)} atm; değişenleri P₂/P₁=(n₂/n₁)(T₂/T₁)(V₁/V₂) ile birlikte denetle.`}
      />
      <Diagram
        title={`${title}; yatay ${m.xLabel}, düşey ${m.yLabel}; seçili durum gerçek hesaplanan noktadır`}
        height={480}
      >
        <path d="M115 65V380H645" className="cb017-axis" />
        {[0, 0.5, 1].map((r) => (
          <g key={r}>
            <path d={`M110 ${sy(r * yMax)}H620`} className="cb017-grid" />
            <text x={100} y={sy(r * yMax) + 6} textAnchor="end">
              {fmt(r * yMax)}
            </text>
            <text x={sx(xMin + r * (xMax - xMin))} y={415} textAnchor="middle">
              {fmt(xMin + r * (xMax - xMin))}
            </text>
          </g>
        ))}
        <text x={45} y={35}>
          {m.yLabel}
        </text>
        <text x={545} y={460}>
          {m.xLabel}
        </text>
        <path data-law-curve d={path} className="cb017-signal" />
        <circle
          data-law-point
          data-x={m.x}
          data-y={m.y}
          cx={sx(m.x)}
          cy={sy(m.y)}
          r={8}
          className="cb017-point"
        />
      </Diagram>
      <p className="cb017-caption">
        Eksenler: yatay {m.xLabel}, düşey {m.yLabel}. Çalışma aralığı{" "}
        {fmt(xMin)}–{fmt(xMax)}; sıfırdan başlamayan yatay ölçek açık
        gösterilir. Birleşik görünümde eğri seçili n,T için çizilir. R=0,082
        L·atm/(mol·K) okul yaklaşımıdır.
      </p>
      <div className="cb017-result" data-model-result>
        <p>Başlangıç: n₁=1 mol; T₁=300 K; V₁=24,6 L; P₁=1 atm.</p>
        <p data-law-state>
          <strong>
            Son: P₂={fmt(m.pressure)} atm; V₂={fmt(m.volume)} L; T₂=
            {fmt(m.temperature)} K; n₂={fmt(m.n)} mol.
          </strong>
        </p>
        <p data-law-coordinate>
          Grafik noktası: ({fmt(m.x)}; {fmt(m.y)}); birimler yukarıdaki
          eksenlerle aynıdır.
        </p>
        <p>PV/(nT) = {fmt(m.invariant)} L·atm/(mol·K).</p>
      </div>
    </Frame>
  );
}
export default function Forge017ChemistryBLab({
  lessonId,
}: {
  lessonId: string;
}) {
  switch (lessonId) {
    case "ayt-modern-atom-elektron-dizilimi":
      return <FillingLab />;
    case "ayt-kuantum-sayilari":
      return <QuantumLab />;
    case "ayt-periyodik-sistem-atom-capi":
      return <RadiusLab />;
    case "ayt-iyonlasma-elektron-ilgisi-en":
      return <EnergyLab />;
    case "ayt-elementler-yukseltgenme":
      return <OxidationLab />;
    case "ayt-gaz-ozellikleri":
      return <GasLab />;
    case "ayt-gaz-yasalari":
      return <LawLab />;
    default:
      return null;
  }
}
