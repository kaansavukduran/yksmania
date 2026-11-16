import { useId, type ReactNode } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  atom026,
  ion026,
  aggregate026,
  relations026,
  mixture026,
  compounds026,
  pairs026,
  isotopeSamples026,
  defaultsChemistry026,
  normalizeChemistry026,
} from "./forge026Chemistry";
import "./forge026Chemistry.css";
const fmt = (n: number, digits = 3) =>
  n.toLocaleString("tr-TR", { maximumFractionDigits: digits });
const signed = (n: number) => (n > 0 ? "+" + n : String(n).replace("-", "−"));
const nuclearNames: Record<string, string> = {
  isotope: "İzotop",
  isotone: "İzoton",
  isobar: "İzobar",
  same: "Aynı çekirdek türü",
  none: "Bu üç çekirdek ilişkisi yok",
};
function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | number;
  options: Record<string, string>;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <label className="c026-field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {Object.entries(options).map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
}
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
  const id = useId();
  return (
    <div className="c026-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{value < 0 ? signed(value) : fmt(value)}</output>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
function Values({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="c026-values">
      {rows.map(([a, b]) => (
        <div key={a}>
          <dt>{a}</dt>
          <dd>{b}</dd>
        </div>
      ))}
    </dl>
  );
}
function Particles({
  r,
  title,
}: {
  r: ReturnType<typeof atom026>;
  title: string;
}) {
  return (
    <figure className="c026-figure">
      <figcaption>
        {title}. Bir nokta bir tanecik; bölge ve adet şeması, boyut veya konum
        modeli değildir.
      </figcaption>
      <svg
        viewBox="0 0 260 430"
        role="img"
        aria-label={`${r.p} proton, ${r.n} nötron çekirdekte; ${r.e} elektron çekirdek dışında. A ${r.a}, q ${signed(r.q)}.`}
      >
        <rect
          x="10"
          y="32"
          width="240"
          height="190"
          rx="10"
          className="c026-outline"
        />
        <rect
          x="10"
          y="265"
          width="240"
          height="115"
          rx="10"
          className="c026-outline"
        />
        <text x="20" y="24">
          Çekirdek: p (+), n (0)
        </text>
        <text x="20" y="252">
          Çekirdek dışı: e (−)
        </text>
        {Array.from({ length: r.p + r.n }, (_, i) => (
          <circle
            key={i}
            cx={22 + (i % 10) * 24}
            cy={50 + Math.floor(i / 10) * 20}
            r="7"
            className={i < r.p ? "c026-proton" : "c026-neutron"}
            data-particle={i < r.p ? "proton" : "neutron"}
          />
        ))}
        {Array.from({ length: r.e }, (_, i) => (
          <circle
            key={i}
            cx={22 + (i % 9) * 27}
            cy={285 + Math.floor(i / 9) * 26}
            r="6"
            className="c026-electron"
            data-particle="electron"
          />
        ))}
        <text x="20" y="231">
          p={r.p} · n={r.n} · A={r.a}
        </text>
        <text x="20" y="413">
          e={r.e} · q={signed(r.q)}
        </text>
      </svg>
      <p className="c026-key">
        <span className="c026-proton-key">● Proton</span>
        <span className="c026-neutron-key">● Nötron</span>
        <span className="c026-electron-key">● Elektron</span>
      </p>
    </figure>
  );
}
function CountBars({
  rows,
  max = 200,
}: {
  rows: { key: string; label: string; value: number }[];
  max?: number;
}) {
  return (
    <figure className="c026-figure">
      <figcaption>
        Tanecik adetleri; her çubukta tam ölçek {max} adet.
      </figcaption>
      <svg
        viewBox={`0 0 260 ${rows.length * 65 + 6}`}
        role="img"
        aria-label={rows.map((r) => `${r.label} ${r.value} adet`).join("; ")}
      >
        {rows.map((r, i) => (
          <g key={r.key} data-bar={r.key} data-count={r.value}>
            <text x="10" y={i * 65 + 20}>
              {r.label}: {r.value}
            </text>
            <rect
              x="10"
              y={i * 65 + 32}
              width="240"
              height="20"
              className="c026-outline"
            />
            <rect
              x="10"
              y={i * 65 + 32}
              width={(240 * r.value) / max}
              height="20"
              className="c026-bar"
              data-fill={r.key}
            />
          </g>
        ))}
      </svg>
    </figure>
  );
}
function PairPlot({ r }: { r: ReturnType<typeof relations026> }) {
  const x = (z: number) => 42 + z * 6.5,
    y = (n: number) => 280 - n * 4.6;
  return (
    <figure className="c026-figure">
      <figcaption>
        Yatay Z, düşey n. Noktalar çekirdek sayılarıdır; çizgi bir hareket yolu
        değildir. U geniş halka, V dolu noktadır. Aynı çekirdekte iki halka üst
        üste gelir.
      </figcaption>
      <svg
        viewBox="0 0 260 330"
        role="img"
        aria-label={`U: Z ${r.left.z}, n ${r.left.n}; V: Z ${r.right.z}, n ${r.right.n}; ${nuclearNames[r.nuclear]}.`}
      >
        <path d="M42 32 V280 H246" className="c026-axis" />
        {[0, 10, 20, 30].map((z) => (
          <g key={z}>
            <line x1={x(z)} y1="280" x2={x(z)} y2="285" className="c026-axis" />
            <text x={x(z)} y="304" textAnchor="middle">
              {z}
            </text>
          </g>
        ))}
        {[0, 10, 20, 30, 40, 50].map((n) => (
          <g key={n}>
            <line x1="37" y1={y(n)} x2="42" y2={y(n)} className="c026-axis" />
            <text x="29" y={y(n) + 5} textAnchor="end">
              {n}
            </text>
          </g>
        ))}
        <text x="9" y="20">
          n
        </text>
        <text x="246" y="325">
          Z
        </text>
        <line
          x1={x(r.left.z)}
          y1={y(r.left.n)}
          x2={x(r.right.z)}
          y2={y(r.right.n)}
          className="c026-link"
        />
        <circle
          cx={x(r.left.z)}
          cy={y(r.left.n)}
          r="11"
          className="c026-point-u"
          data-nuclide="U"
          data-z={r.left.z}
          data-n={r.left.n}
        />
        <circle
          cx={x(r.right.z)}
          cy={y(r.right.n)}
          r="6"
          className="c026-point-v"
          data-nuclide="V"
          data-z={r.right.z}
          data-n={r.right.n}
        />
      </svg>
    </figure>
  );
}
function MixtureView({
  r,
  labels,
}: {
  r: ReturnType<typeof mixture026>;
  labels: readonly string[];
}) {
  return (
    <figure className="c026-figure">
      <figcaption>
        100 atomluk bolluk şeması: {labels[0]} için {r.lightPct} nokta,{" "}
        {labels[1]} için {r.heavyPct} nokta. Dikey konumlar gerçek atom konumu
        değildir.
      </figcaption>
      <svg
        viewBox="0 0 260 370"
        role="img"
        aria-label={`${labels[0]} yüzde ${r.lightPct}, ${labels[1]} yüzde ${r.heavyPct}; ortalama ${fmt(r.mean)} u.`}
      >
        {Array.from({ length: 100 }, (_, i) => (
          <circle
            key={i}
            cx={20 + (i % 10) * 24}
            cy={24 + Math.floor(i / 10) * 25}
            r="7"
            className={i < r.lightPct ? "c026-light" : "c026-heavy"}
            data-isotope={i < r.lightPct ? "light" : "heavy"}
          />
        ))}
        <line x1="20" y1="300" x2="240" y2="300" className="c026-axis" />
        <line x1="20" y1="294" x2="20" y2="307" className="c026-axis" />
        <line x1="240" y1="294" x2="240" y2="307" className="c026-axis" />
        <circle
          cx={20 + (220 * (r.mean - r.light)) / (r.heavy - r.light)}
          cy="300"
          r="8"
          className="c026-mean"
          data-mean={r.mean}
        />
        <text x="20" y="337">
          {fmt(r.light)} u
        </text>
        <text x="240" y="337" textAnchor="end">
          {fmt(r.heavy)} u
        </text>
        <text x="130" y="366" textAnchor="middle">
          Ortalama: {fmt(r.mean)} u
        </text>
      </svg>
      <p className="c026-key">
        <span className="c026-light-key">● {labels[0]}</span>
        <span className="c026-heavy-key">● {labels[1]}</span>
      </p>
    </figure>
  );
}
export default function Forge026ChemistryLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const canonical = lessonId.replace(/-ileri$/, ""),
    storageKey = "forge026:chemistry:" + canonical,
    defaults = {
      ...defaultsChemistry026,
      mode: canonical === "izotop-izoton-izobar" ? "pair" : "count",
    },
    explorations = useApp().state.explorations,
    raw = Object.hasOwn(explorations, storageKey)
      ? explorations[storageKey]
      : undefined;
  const [saved, set] = useExploration(storageKey, defaults),
    normalized = normalizeChemistry026(saved),
    active: string[] = [
      "mode",
      ...(normalized.mode === "count"
        ? ["z", "n", "e"]
        : normalized.mode === "transfer"
          ? ["z", "n", "e", "received"]
          : normalized.mode === "aggregate"
            ? ["compound", "copies"]
            : normalized.mode === "pair"
              ? ["pair", "secondReceived"]
              : ["sample", "lightPct"]),
    ],
    invalidRaw =
      raw !== undefined &&
      active.some(
        (k) =>
          Object.hasOwn(raw, k) &&
          typeof raw[k] !== typeof defaults[k as keyof typeof defaults],
      ),
    v = invalidRaw
      ? { ...normalized, reason: "", checked: false, show: false }
      : normalized,
    persist = (patch: Partial<typeof v>) => set({ ...v, ...patch }),
    change = (patch: Partial<typeof v>) =>
      persist({ ...patch, guess: "", reason: "", checked: false, show: false });
  if (!["atomun-temel-tanecikleri", "izotop-izoton-izobar"].includes(canonical))
    return null;
  let controls: ReactNode,
    result: ReactNode,
    question: string,
    expected: string,
    evidence: string,
    scope: string;
  const atomControls = (
    <>
      <Range
        label="Proton sayısı Z"
        value={v.z}
        min={1}
        max={30}
        onChange={(z) => change({ z })}
      />
      <Range
        label="Nötron sayısı n"
        value={v.n}
        min={0}
        max={50}
        onChange={(n) => change({ n })}
      />
      <Range
        label="Başlangıç elektron sayısı"
        value={v.e}
        min={0}
        max={36}
        onChange={(e) =>
          change({ e, received: Math.max(-e, Math.min(36 - e, v.received)) })
        }
      />
    </>
  );
  if (v.mode === "count") {
    const r = atom026(v.z, v.n, v.e);
    controls = atomControls;
    question = "Bütün p+n+e toplamı";
    expected = String(r.total);
    evidence = `Önce A=p+n=${r.p}+${r.n}=${r.a}; sonra T=A+e=${r.a}+${r.e}=${r.total}. Net yük ayrı hesap: q=${r.p}−${r.e}=${signed(r.q)}.`;
    result = (
      <div
        data-model-result
        data-mode="count"
        data-p={r.p}
        data-n={r.n}
        data-e={r.e}
        data-a={r.a}
        data-q={r.q}
        data-total={r.total}
      >
        <Particles r={r} title="Seçtiğin tek tanecik" />
        <Values
          rows={[
            ["Atom numarası Z", String(r.z)],
            ["Kütle numarası A", String(r.a)],
            ["Net yük q", signed(r.q)],
            ["Yüklü tanecik adedi p+e", String(r.charged)],
            ["Bütün tanecikler", String(r.total)],
          ]}
        />
      </div>
    );
    scope =
      "Serbest sayı karşılaştırmasıdır; her seçimin kararlı veya doğada bulunan bir atom/iyon olduğu ileri sürülmez. Elektronlar sabit yörüngeler üzerinde gösterilmez. A bir nükleon adedidir; hassas kütle değildir.";
  } else if (v.mode === "transfer") {
    const r = ion026(v.z, v.n, v.e, v.received);
    controls = (
      <>
        {atomControls}
        <Range
          label="Alınan elektron sayısı (eksi: verilen)"
          value={v.received}
          min={Math.max(-6, -v.e)}
          max={Math.min(6, 36 - v.e)}
          onChange={(received) => change({ received })}
        />
      </>
    );
    question = "Son taneciğin net yükü q";
    expected = String(r.after.q);
    evidence = `Δe=${signed(r.received)}, Δq=${signed(-r.received)}. Son e=${r.after.e}; q=${r.after.p}−${r.after.e}=${signed(r.after.q)}. Çevrenin yük değişimi ${signed(r.externalCharge)}; son taneciğin yükü ile çevrenin yük değişiminin toplamı ${signed(r.systemCharge)} başlangıç yüküne eşittir.`;
    result = (
      <div
        data-model-result
        data-mode="transfer"
        data-before-e={r.before.e}
        data-after-e={r.after.e}
        data-before-q={r.before.q}
        data-after-q={r.after.q}
        data-conserved={r.conserved}
      >
        <div className="c026-two">
          <Particles r={r.before} title="Başlangıç" />
          <Particles r={r.after} title="Elektron aktarımından sonra" />
        </div>
        <Values
          rows={[
            [
              "Çekirdek: önce ve sonra",
              `Z=${r.before.z}, n=${r.before.n}, A=${r.before.a}`,
            ],
            ["Elektron değişimi Δe", signed(r.received)],
            ["Taneciğin yük değişimi Δq", signed(-r.received)],
            ["Çevrenin yük değişimi", signed(r.externalCharge)],
            ["Son q + çevrenin yük değişimi", signed(r.systemCharge)],
          ]}
        />
        <p className="c026-equation">
          {signed(r.before.q)} = {signed(r.after.q)} + (
          {signed(r.externalCharge)})
        </p>
      </div>
    );
    scope =
      "Artı aktarım taneciğin elektron alması, eksi aktarım vermesidir. Çevre için yalnız yük değişimi izlenir; gerçek deney, bağlanma veya iyon kararlılığı modeli değildir. Elektron alışverişinde çekirdek korunur.";
  } else if (v.mode === "aggregate") {
    const c = compounds026[v.compound],
      one = aggregate026(c.parts, c.q),
      r = {
        p: one.p * v.copies,
        n: one.n * v.copies,
        e: one.e * v.copies,
        q: one.q * v.copies,
        nucleons: one.nucleons * v.copies,
        total: one.total * v.copies,
      };
    controls = (
      <>
        <Select
          label="Çok atomlu tanecik"
          value={v.compound}
          options={Object.fromEntries(compounds026.map((x, i) => [i, x.name]))}
          onChange={(x) => change({ compound: Number(x) })}
        />
        <Range
          label="Özdeş tanecik adedi"
          value={v.copies}
          min={1}
          max={4}
          onChange={(copies) => change({ copies })}
        />
      </>
    );
    question = "Bütün örneğin elektron sayısı E";
    expected = String(r.e);
    evidence = `Bir tanecikte P=${one.p}, N=${one.n}, E=P−q=${one.p}−(${signed(one.q)})=${one.e}. ${v.copies} tanecikte E=${v.copies}×${one.e}=${r.e}; toplam yük ${signed(r.q)}. Denetim P−E=${r.p}−${r.e}=${signed(r.q)}.`;
    result = (
      <div
        data-model-result
        data-mode="aggregate"
        data-p={r.p}
        data-n={r.n}
        data-e={r.e}
        data-charge={r.q}
        data-copies={v.copies}
      >
        <p className="c026-equation">
          {v.copies} × {c.formula}
        </p>
        <div className="c026-table-wrap">
          <table>
            <caption>Bir taneciğin çekirdek katkıları</caption>
            <thead>
              <tr>
                <th>Atom</th>
                <th>Adet</th>
                <th>Z</th>
                <th>A</th>
                <th>Toplam p</th>
                <th>Toplam n</th>
              </tr>
            </thead>
            <tbody>
              {c.parts.map((p, i) => (
                <tr key={i}>
                  <td>
                    {p.z === 1 ? "H" : p.z === 6 ? "C" : p.z === 7 ? "N" : "O"}
                  </td>
                  <td>{p.count}</td>
                  <td>{p.z}</td>
                  <td>{p.a}</td>
                  <td>{p.z * p.count}</td>
                  <td>{(p.a - p.z) * p.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CountBars
          rows={[
            { key: "protons", label: "Toplam proton P", value: r.p },
            { key: "neutrons", label: "Toplam nötron N", value: r.n },
            { key: "electrons", label: "Toplam elektron E", value: r.e },
          ]}
        />
        <Values
          rows={[
            ["Toplam P", String(r.p)],
            ["Toplam N", String(r.n)],
            ["Toplam E", String(r.e)],
            ["Bütün örneğin yükü", signed(r.q)],
            ["Toplam nükleon", String(r.nucleons)],
            ["Bütün tanecikler P+N+E", String(r.total)],
          ]}
        />
      </div>
    );
    scope =
      "Atomların izotopları formülde açıkça verilmiştir. İyonun yükü bir taneciğe bir kez uygulanır; örnekteki özdeş tanecik sayısı sonra çarpılır. Çubuklar adet gösterir, atom çapı veya bağ yapısı göstermez.";
  } else if (v.mode === "pair") {
    const p = pairs026[v.pair],
      right = { ...p.right, e: p.right.e + v.secondReceived },
      r = relations026(
        p.left,
        right,
        v.secondReceived === 0 ? p.sameConfiguration : null,
      );
    controls = (
      <>
        <Select
          label="Karşılaştırılan çift"
          value={v.pair}
          options={Object.fromEntries(pairs026.map((x, i) => [i, x.name]))}
          onChange={(x) => change({ pair: Number(x), secondReceived: 0 })}
        />
        <Range
          label="V taneciğinin aldığı ek elektron"
          value={v.secondReceived}
          min={-2}
          max={2}
          onChange={(secondReceived) => change({ secondReceived })}
        />
      </>
    );
    question = "Çekirdek ilişkisi";
    expected = r.nuclear;
    evidence = `U:(Z=${r.left.z},n=${r.left.n},A=${r.left.a}); V:(Z=${r.right.z},n=${r.right.n},A=${r.right.a}). ${nuclearNames[r.nuclear]}. Elektron sayıları ${r.left.e}/${r.right.e}; çekirdek sınıfı elektron aktarımıyla değişmez.`;
    result = (
      <div
        data-model-result
        data-mode="pair"
        data-nuclear={r.nuclear}
        data-same-e={r.sameElectrons}
        data-isoelectronic={
          r.isoelectronic === null ? "unknown" : String(r.isoelectronic)
        }
      >
        <PairPlot r={r} />
        <div className="c026-table-wrap">
          <table>
            <caption>
              U: {p.labels[0]} · V: {p.labels[1]}
              {v.secondReceived !== 0
                ? " (V elektron sayısı değiştirildi)"
                : ""}
            </caption>
            <thead>
              <tr>
                <th>Tanecik</th>
                <th>Z</th>
                <th>n</th>
                <th>A</th>
                <th>e</th>
                <th>q</th>
                <th>Verilmiş dağılım</th>
              </tr>
            </thead>
            <tbody>
              {[r.left, r.right].map((x, i) => (
                <tr key={i}>
                  <th>{i === 0 ? "U" : "V"}</th>
                  <td>{x.z}</td>
                  <td>{x.n}</td>
                  <td>{x.a}</td>
                  <td>{x.e}</td>
                  <td>{signed(x.q)}</td>
                  <td>
                    {i === 1 && v.secondReceived !== 0
                      ? "Yeni durum için belirtilmedi"
                      : p.configurations[i]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CountBars
          max={36}
          rows={[
            { key: "left-e", label: "U elektron", value: r.left.e },
            { key: "right-e", label: "V elektron", value: r.right.e },
          ]}
        />
        <p>
          <strong>{nuclearNames[r.nuclear]}</strong>.{" "}
          {r.isoelectronic === true
            ? "Aynı e ve aynı verilmiş dağılım: izoelektronik."
            : r.isoelectronic === null
              ? "Elektron sayısı aynı; yeni dağılım belirtilmediğinden izoelektroniklik kesinleştirilmez."
              : r.sameElectrons
                ? "Elektron sayısı aynı, verilmiş dağılımlar farklı: izoelektronik koşulu sağlanmaz."
                : "Elektron sayıları farklı: izoelektronik değil."}
        </p>
      </div>
    );
    scope =
      "Başlangıç dağılımları seçili örnekler için verilmiştir; neonun uyarılmış örneği ayrıca belirtilir. V’ye ek elektron verildiğinde yeni dağılım varsayılmaz. Z–n noktalarının aynı kalması çekirdeğin korunduğunu gösterir; e çubuğu değişir.";
  } else {
    const s = isotopeSamples026[v.sample],
      r = mixture026(s.light, s.heavy, v.lightPct);
    controls = (
      <>
        <Select
          label="Hazırlanmış iki izotoplu örnek"
          value={v.sample}
          options={Object.fromEntries(
            isotopeSamples026.map((x, i) => [i, x.name]),
          )}
          onChange={(x) => change({ sample: Number(x) })}
        />
        <Range
          label="Hafif izotopun atom bolluğu (%)"
          value={v.lightPct}
          min={0}
          max={100}
          onChange={(lightPct) => change({ lightPct })}
        />
      </>
    );
    question = "Ortalama atom kütlesi (u; üç ondalığa yuvarla)";
    // The sample masses have three decimal places and abundance is an integer
    // percent. Round the exact integer weighted sum, including decimal ties.
    const weightedMilli =
      Math.round(s.light * 1000) * v.lightPct +
      Math.round(s.heavy * 1000) * (100 - v.lightPct);
    expected = String(Math.floor((weightedMilli + 50) / 100) / 1000);
    evidence = `m̄=${fmt(r.light)}×${fmt(r.lightPct / 100)}+${fmt(r.heavy)}×${fmt(r.heavyPct / 100)}=${fmt(r.mean, 6)} u. Üç ondalığa yuvarlanmış sonuç ${fmt(Number(expected))} u. Bolluklar ${r.lightPct}+${r.heavyPct}=100 eder.`;
    result = (
      <div
        data-model-result
        data-mode="mixture"
        data-mean={r.mean}
        data-light-pct={r.lightPct}
        data-heavy-pct={r.heavyPct}
      >
        <MixtureView r={r} labels={s.labels} />
        <Values
          rows={[
            [`${s.labels[0]} kütlesi`, fmt(r.light) + " u"],
            [`${s.labels[1]} kütlesi`, fmt(r.heavy) + " u"],
            ["Hafif izotop katkısı", fmt(r.lightContribution, 6) + " u"],
            ["Ağır izotop katkısı", fmt(r.heavyContribution, 6) + " u"],
            ["Ortalama", fmt(r.mean, 6) + " u"],
          ]}
        />
      </div>
    );
    scope =
      "Bu, yalnız seçilmiş iki izotoptan hazırlanmış varsayımsal örnektir; elementin doğal bütün izotoplarını veya doğal bolluklarını temsil etmez. Kütleler burada üç ondalık u değerleri olarak verilmiştir. Yüzde atom sayısına göredir; kütle yüzdesi değildir. %0 ve %100 uçlarında tek izotop kalır.";
  }
  const validGuess =
      v.mode === "pair"
        ? Object.hasOwn(nuclearNames, v.guess)
        : v.guess.trim() !== "" &&
          Number.isFinite(Number(v.guess.replace(",", "."))),
    canCompare = validGuess && v.reason.trim() !== "",
    correct =
      v.mode === "pair"
        ? v.guess === expected
        : Number(v.guess.replace(",", ".")) === Number(expected);
  return (
    <section
      className="c026-lab"
      data-forge026={lessonId}
      aria-label="Çekirdek, elektron ve izotop keşfi"
    >
      <h3>Çekirdeği, elektronu ve örneği ayrı izle</h3>
      <p>
        Bir koşulu değiştir; önce bir sonuç ve kısa gerekçe yaz, sonra sayısal
        modelle kıyasla. Bu keşif puan veya tamamlanma kaydı üretmez.
      </p>
      <div className="c026-controls">
        <Select
          label="Sayım modeli"
          value={v.mode}
          options={{
            count: "Tek taneciğin sayımı",
            transfer: "Elektron aktarımı ve çevre",
            aggregate: "Çok atomlu tanecik toplamı",
            pair: "İki taneciği karşılaştır",
            mixture: "İzotop bolluğu ve ortalama",
          }}
          onChange={(mode) => change({ mode })}
        />
        {controls}
      </div>
      {result}
      <p className="c026-scope">{scope}</p>
      <div className="c026-prediction">
        {v.mode === "pair" ? (
          <Select
            label={question}
            value={v.guess}
            options={{ "": "Bir sonuç seç", ...nuclearNames }}
            onChange={(guess) => persist({ guess, checked: false })}
          />
        ) : (
          <label className="c026-field">
            <span>{question}</span>
            <input
              aria-label={question}
              data-prediction
              inputMode="decimal"
              value={v.guess}
              maxLength={128}
              onChange={(e) =>
                persist({ guess: e.target.value, checked: false })
              }
            />
          </label>
        )}
        <label className="c026-field">
          <span>Gerekçen</span>
          <input
            aria-label="Gerekçen"
            data-reason
            value={v.reason}
            maxLength={120}
            onChange={(e) =>
              persist({ reason: e.target.value, checked: false })
            }
            placeholder="Kullandığın eşitliği veya karşılaştırmayı yaz."
          />
        </label>
        <div className="c026-actions">
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
        </div>
        {v.checked && canCompare && (
          <p className="c026-feedback" role="status">
            {correct
              ? "Modelle uyumlu."
              : "Verilen sayıları ve işlem sırasını yeniden karşılaştır."}{" "}
            Sonuç:{" "}
            {v.mode === "pair"
              ? nuclearNames[expected]
              : expected.replace(".", ",")}
            . Yazılı gerekçenin bilimsel doğruluğu otomatik puanlanmaz.
          </p>
        )}
        {v.show && <p className="c026-proof">{evidence}</p>}
      </div>
    </section>
  );
}
