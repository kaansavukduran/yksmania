import { useId, type ReactNode } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  biologyCDefaults026,
  normalizeBiologyC026,
  proteinGraphC026,
  enzymeRateC026,
  energyProfileC026,
  enzymeConditionsC026,
  vitaminBalanceC026,
  vitaminRoleC026,
  vitaminSamplesC026,
  temperatureSamplesC026,
  pHSamplesC026,
} from "./forge026BiologyC";
import "./forge026BiologyC.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number) =>
  n.toLocaleString("tr-TR", { maximumFractionDigits: 3 });
const displayCopyC026 = (value: string) =>
  [
    [
      "Noktalar amino asit kalıntılarıdır.",
      "Her nokta bir amino asit birimidir.",
    ],
    ["atomik mekanizma", "atom düzeyinde tepkime yolu"],
    ["tek değere indirgenemeyen", "tek değere inmeyen"],
    [
      "Bu işlev, bütün hastalıkların her insanda vitaminle önleneceğini göstermez.",
      "Bu işlev her hastalığı her insanda önleme kanıtı değildir.",
    ],
    [
      "Enerji metabolizmasına yardım etmek vitaminin kalorili yakıt olması değildir.",
      "Enerji yolunda görev almak vitaminin kalorili yakıt olması değildir.",
    ],
    [
      "başka canlıların sentez yeteneği insana genellenmez",
      "başka canlıların sentez yolu insanda da var sayılmaz",
    ],
    [
      "Vitaminler farklı organik düzenleyicilerdir",
      "Vitaminler farklı organik madde türleridir; düzenleme görevi alır",
    ],
    ["İnsan bağlamında okul düzeyi", "İnsan için okul düzeyi"],
    ["emilim mekanizmasının", "emilim yolunun"],
    ["bütün basamaklar deride tamamlanmaz", "Her adım deride olmaz"],
    ["başına18", "başına 18"],
    ["enzimlere37°C", "enzimlere 37 °C"],
    ["katkısı0", "katkısı 0"],
    ["antioksidan savunma", "oksidan hasara karşı savunma"],
    ["antioksidan işlevlere katkı", "oksidan hasara karşı korumaya katkı"],
    [
      "gerçek ribozomal sentezin bütün basamakları modellenmez",
      "bu çizim ribozomda olan sentezi tüm adımları ile vermez",
    ],
    [
      "gerçek enzimlerde etkenlerin bağımsız olduğu genellenmez",
      "bu ayrı etki kabulü her enzim için geçerli sayılmaz",
    ],
    [
      "İnsan gereksinimini karşılayacak C vitaminini sentezleyemez",
      "İnsan gereken C vitaminini kendi yapamaz",
    ],
    [
      "Bazı pıhtılaşma proteinlerinin işlev kazanmasına katkı",
      "Pıhtı için bazı protein türlerine işlev desteği",
    ],
    ["Suda çözünmesine karşın", "Suda çözünse de"],
    [
      "bütün hastalıkların her insanda vitaminle önleneceğini göstermez",
      "her hastalığı her insanda önlediği sonucu çıkmaz",
    ],
    ["beslenme gereksinimi veya doz", "beslenme gereği veya doz"],
    [
      "halkada başlangıç numarası yalnız çizim referansıdır",
      "halkada ilk numara yalnız çizim için seçilir",
    ],
    [
      "halka için başlangıç numarası yalnız çizim referansıdır",
      "halkada ilk numara yalnız çizim için seçilir",
    ],
    ["metabolizmasına", "metabolik işlevine"],
    ["düzenleyicilerdir", "düzenleme görevi alır"],
    ["mineralizasyonu", "mineral birikimi"],
    ["karşılaştırılabilir", "kıyas için uygun"],
    ["mekanizmasının", "moleküler yolunun"],
    ["indirgenemeyen", "tek değere inmeyen"],
    ["basamaklarıyla", "adımları ile"],
    ["depolanmamak", "depo olmamak"],
    ["dönüşümleriyle", "dönüşüm adımları ile"],
    ["tamamlanmaz", "tam bitmez"],
    ["parçalanması", "parçalara ayrılması"],
    ["modellenmez", "bu modelde yoktur"],
    ["ölçülmediyse", "ölçümü yoksa"],
    ["serbestleşme", "serbest kalma"],
    ["koenzimlerle", "koenzim türleri ile"],
    ["bağlantısıdır", "bağıdır"],
    ["basamağıdır", "adımıdır"],
    ["basamakları", "adımları"],
    ["genellenmez", "genele taşınmaz"],
    ["koşullardaki", "koşulda olan"],
    ["kalıntılarıdır", "kalıntı birimlerdir"],
    ["metnindedir", "metninde yer alır"],
    ["varsayımsal", "kurmaca"],
    ["bağlamında", "için verilen bağlamda"],
    ["basamaklar", "adımlar"],
    ["ilişkilendirir", "bir arada gösterir"],
    ["antioksidan", "oksidan hasara karşı koruma"],
    ["dönüşümler", "dönüşüm adımları"],
    ["değiştirmez", "aynı tutar"],
    ["biçimleriyle", "biçimleri ile"],
    ["mekanizma", "moleküler yol"],
    ["kanıtlanmış", "kanıtı olan"],
    ["modellerdir", "model türleridir"],
    ["oluşumuyla", "oluşumu ile"],
    ["sıcaklıktaki", "sıcaklıkta olan"],
    ["Çözünürlük", "Çözünen ortam"],
    ["ölçülmeyen", "ölçüm dışı kalan"],
    ["kanıtlamaz", "kesin göstermez"],
    ["tepkime ilerleyişidir", "tepkime yoludur"],
  ].reduce((text, [before, after]) => text.replaceAll(before, after), value);
function Menu({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | number;
  options: [string, string][];
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <label className="bc026-field" htmlFor={id}>
      <span>{label}</span>
      <ChoiceSelect
        id={id}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      >
        {options.map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </ChoiceSelect>
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
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div className="bc026-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{fmt(value)}</output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
      />
    </div>
  );
}
function Check({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const id = useId();
  return (
    <label className="bc026-check" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.currentTarget.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
function Values({ rows }: { rows: [string, string | number][] }) {
  return (
    <dl className="bc026-values">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{displayCopyC026(k)}</dt>
          <dd>{typeof v === "number" ? fmt(v) : displayCopyC026(v)}</dd>
        </div>
      ))}
    </dl>
  );
}
function Figure({
  caption,
  label,
  height,
  children,
}: {
  caption: string;
  label: string;
  height: number;
  children: ReactNode;
}) {
  return (
    <figure className="bc026-figure">
      <figcaption>{displayCopyC026(caption)}</figcaption>
      <svg viewBox={`0 0 260 ${height}`} role="img" aria-label={label}>
        {children}
      </svg>
    </figure>
  );
}
const numberChoices = (ns: number[]): [string, string][] =>
  [...new Set(ns)].map((n) => [String(n), fmt(n)]);
export default function Forge026BiologyCLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const base = lessonId.replace(/-ileri$/, ""),
    key = "forge026-biology-c:" + base,
    raw = useApp().state.explorations[key],
    [saved, set] = useExploration(key, biologyCDefaults026),
    v = normalizeBiologyC026(saved);
  const persist = (patch: Partial<typeof v>) =>
    set(normalizeBiologyC026({ ...v, ...patch }));
  const change = (patch: Partial<typeof v>) =>
    persist({ ...patch, guess: "", reason: "", checked: false });
  if (!["proteinler", "enzimler", "vitaminler"].includes(base)) return null;
  let controls: ReactNode,
    model: ReactNode,
    scope: string,
    question: string,
    expected: string,
    options: [string, string][],
    active: (keyof typeof biologyCDefaults026)[],
    mode: string;
  if (base === "proteinler") {
    mode = "backbone";
    const r = proteinGraphC026(
      v.length,
      v.topology,
      v.cutMask,
      v.pattern,
      v.folded,
    );
    const point = (i: number) => {
      if (r.topology === "ring") {
        const angle = -Math.PI / 2 + (2 * Math.PI * i) / r.length;
        return {
          x: 130 + (v.folded ? 91 : 65) * Math.cos(angle),
          y: 190 + (v.folded ? 91 : 150) * Math.sin(angle),
        };
      }
      if (!v.folded) return { x: 130, y: 35 + 40 * i };
      const row = Math.floor(i / 3),
        column = row % 2 ? 2 - (i % 3) : i % 3;
      return { x: 35 + 95 * column, y: 55 + 120 * row };
    };
    controls = (
      <>
        <Range
          label="Amino asit adedi"
          value={v.length}
          min={3}
          max={9}
          onChange={(length) => change({ length })}
        />
        <Menu
          label="Bağlantı"
          value={v.topology}
          options={[
            ["line", "Açık"],
            ["ring", "Halka"],
          ]}
          onChange={(topology) => change({ topology })}
        />
        <Menu
          label="Dizi örüntüsü"
          value={v.pattern}
          options={[
            ["0", "G A S"],
            ["1", "G S A"],
            ["2", "A G S"],
          ]}
          onChange={(x) => change({ pattern: Number(x) })}
        />
        <Check
          label="Katlı çizim"
          value={v.folded}
          onChange={(folded) =>
            persist({ folded, checked: validSelection && v.checked })
          }
        />
        <fieldset className="bc026-cuts">
          <legend>Kesilecek peptit bağları</legend>
          {r.links.map((link, i) => (
            <Check
              key={i}
              label={`${link.a + 1}–${link.b + 1} bağı`}
              value={link.cut}
              onChange={(cut) =>
                change({
                  cutMask: cut ? v.cutMask | (1 << i) : v.cutMask & ~(1 << i),
                })
              }
            />
          ))}
        </fieldset>
      </>
    );
    model = (
      <>
        <Figure
          caption="Noktalar amino asit kalıntılarıdır. Düz çizgi kalan peptit bağı; kesik çizgi hidroliz edilen bağın eski yeridir. G=glisin, A=alanin, S=serin. Çizimin katlanması bağlantıyı değiştirmez."
          label={`${r.length} birim, ${r.peptideBonds} kalan bağ, ${r.fragments} parça, ${r.freeUnits} serbest amino asit.`}
          height={400}
        >
          {r.links.map((link, i) => {
            const a = point(link.a),
              b = point(link.b);
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                data-peptide-edge={i}
                data-cut={link.cut}
                className={link.cut ? "bc026-cut" : "bc026-link"}
              />
            );
          })}
          {r.sequence.map((aa, i) => {
            const pos = point(i);
            return (
              <g key={i} data-residue={i + 1} data-amino={aa}>
                <circle cx={pos.x} cy={pos.y} r="20" className="bc026-node" />
                <text x={pos.x} y={pos.y + 6} textAnchor="middle">
                  {i + 1}:{aa}
                </text>
              </g>
            );
          })}
        </Figure>
        <div
          data-protein-summary
          data-fragments={r.fragments}
          data-bonds={r.peptideBonds}
          data-free={r.freeUnits}
          data-fragment-mass={r.fragmentMass}
        >
          <Values
            rows={[
              ["Kalan peptit bağı", r.peptideBonds],
              ["Parça adedi", r.fragments],
              ["Serbest amino asit", r.freeUnits],
              ["Tüketilen su", r.hydrolysisWater + " molekül"],
              ["Başlangıç peptit kütlesi", r.initialMass + " g/mol"],
              ["Son parçaların toplamı", r.fragmentMass + " g/mol"],
            ]}
          />
        </div>
        <p>
          Dizi: {r.sequence.join(" – ")}. Açık zincirde yazım N ucundan C
          ucunadır; halkada ilk numara yalnız çizim için seçilir.
        </p>
        <ol className="bc026-records">
          {r.links.map((link, i) => (
            <li key={i}>
              {link.a + 1}–{link.b + 1}:{" "}
              {link.cut
                ? "Bağ hidroliz edildi; bir su kullanıldı."
                : "Peptit bağlantısı korunuyor."}
            </li>
          ))}
        </ol>
        <p>
          Son parçalar:{" "}
          {r.groups
            .map((g) => g.map((i) => `${i + 1}:${r.sequence[i]}`).join("–"))
            .join("; ")}
          . Uzunluklar {r.groups.map((g) => g.length).join(" + ")} = {r.length}.
        </p>
        <p>
          Kütle kontrolü: {r.initialMass} + {r.cuts} × 18 = {r.fragmentMass}{" "}
          g/mol. Bağlı parçalar toplamı ile kullanılan su birlikte korunur.
        </p>
      </>
    );
    scope = r.scope;
    question = "Bağlar kesilince kaç parça var?";
    expected = String(r.fragments);
    options = numberChoices([r.fragments, r.cuts, r.cuts + 1, r.length, 0]);
    active = ["length", "topology", "cutMask", "pattern"];
  } else if (base === "enzimler") {
    mode = v.enzymeMode;
    const chooser = (
      <Menu
        label="Enzim modeli"
        value={mode}
        options={[
          ["rate", "Hız"],
          ["energy", "Enerji"],
          ["conditions", "Koşullar"],
        ]}
        onChange={(enzymeMode) => change({ enzymeMode })}
      />
    );
    if (mode === "rate") {
      const r = enzymeRateC026(v.substrate, v.enzyme, v.inhibitor, v.active),
        x = (s: number) => 28 + 5.25 * s,
        y = (rate: number) => 220 - 25 * rate;
      controls = (
        <>
          {chooser}
          <Range
            label="Substrat S"
            value={v.substrate}
            min={0}
            max={40}
            onChange={(substrate) => change({ substrate })}
          />
          <Range
            label="Enzim E"
            value={v.enzyme}
            min={0}
            max={4}
            onChange={(enzyme) => change({ enzyme })}
          />
          <Range
            label="Engelleyici I"
            value={v.inhibitor}
            min={0}
            max={3}
            onChange={(inhibitor) => change({ inhibitor })}
          />
          <Check
            label="Enzim etkin"
            value={v.active}
            onChange={(active) => change({ active })}
          />
        </>
      );
      model = (
        <>
          <Figure
            caption="Yatay S başlangıç derişimi, düşey v başlangıç hızıdır. Eksenler tüm seçimlerde sabittir; kesik yatay çizgi kuramsal üst sınırdır. Nokta seçili S değerini gösterir."
            label={`Seçili hız ${fmt(r.rate)}, üst sınır ${r.maximum}.`}
            height={280}
          >
            <path d="M28 20V220H238" className="bc026-axis" />
            <path d={`M28 ${y(r.maximum)}H238`} className="bc026-cut" />
            <polyline
              points={r.points
                .map((p) => `${x(p.substrate)},${y(p.rate)}`)
                .join(" ")}
              className="bc026-curve"
            />
            <circle
              cx={x(r.substrate)}
              cy={y(r.rate)}
              r="6"
              className="bc026-marker"
              data-rate={r.rate}
              data-substrate={r.substrate}
            />
            <text x="8" y="26">
              8
            </text>
            <text x="238" y="251" textAnchor="end">
              S
            </text>
            <text x="28" y="245">
              0
            </text>
            <text x="238" y="274" textAnchor="end">
              40
            </text>
          </Figure>
          <Values
            rows={[
              ["Seçili başlangıç hızı", r.rate],
              ["Üst hız sınırı", r.maximum],
              ["Payda sabiti 2(1+I)", r.apparentConstant],
            ]}
          />
          <p>
            v = {2 * r.enzyme * (r.active ? 1 : 0)} × {r.substrate} / (
            {r.apparentConstant} + {r.substrate}) = {fmt(r.rate)}. Eğri, zaman
            içinde bir kapta biriken toplam ürün değildir.
          </p>
          <details className="bc026-records">
            <summary>Hız noktalarını aç</summary>
            <ol>
              {r.points.map((p) => (
                <li key={p.substrate}>
                  S {p.substrate}: v {fmt(p.rate)}.
                </li>
              ))}
            </ol>
          </details>
        </>
      );
      scope = r.scope;
      question = "Bu etkin E için kuramsal üst hız sınırı kaç?";
      expected = String(r.maximum);
      options = numberChoices([r.maximum, r.enzyme, 2 * (r.enzyme + 1), 0, 1]);
      active = ["enzymeMode", "substrate", "enzyme", "inhibitor", "active"];
    } else if (mode === "energy") {
      const r = energyProfileC026(v.energyProfile, v.lowering),
        y = (e: number) => 270 - 2.2 * e;
      controls = (
        <>
          {chooser}
          <Menu
            label="Ürün düzeyi"
            value={v.energyProfile}
            options={[
              ["0", "Düşük"],
              ["1", "Yüksek"],
            ]}
            onChange={(x) => change({ energyProfile: Number(x) })}
          />
          <Range
            label="Engel azalması (kJ/mol)"
            value={v.lowering}
            min={0}
            max={40}
            onChange={(lowering) => change({ lowering })}
          />
        </>
      );
      model = (
        <>
          <Figure
            caption="Enerji düşeyde; tepkime ilerleyişi yatayda. Düz yol enzimsiz, kesik yol enzimlidir. Aynı başlangıç ve ürün noktaları korunur."
            label={`İleri engeller ${r.withoutForward} ve ${r.withForward}; net değişim ${r.delta} kJ/mol.`}
            height={330}
          >
            <path d="M20 20V280H240" className="bc026-axis" />
            <polyline
              points={`20,${y(r.initial)} 130,${y(r.uncatalysedPeak)} 240,${y(r.final)}`}
              className="bc026-curve"
              data-energy-path="without"
            />
            <polyline
              points={`20,${y(r.initial)} 130,${y(r.catalysedPeak)} 240,${y(r.final)}`}
              className="bc026-curve bc026-dashed"
              data-energy-path="with"
            />
            <circle
              cx="20"
              cy={y(r.initial)}
              r="5"
              className="bc026-marker"
              data-energy-initial={r.initial}
            />
            <circle
              cx="240"
              cy={y(r.final)}
              r="5"
              className="bc026-marker"
              data-energy-final={r.final}
            />
            <text x="20" y="308">
              Giren
            </text>
            <text x="240" y="308" textAnchor="end">
              Ürün
            </text>
            <text x="24" y="20">
              E
            </text>
          </Figure>
          <Values
            rows={[
              ["Başlangıç", r.initial + " kJ/mol"],
              ["Ürün", r.final + " kJ/mol"],
              ["Enzimsiz tepe", r.uncatalysedPeak + " kJ/mol"],
              ["Enzimli tepe", r.catalysedPeak + " kJ/mol"],
              ["İleri engel: enzimsiz", r.withoutForward + " kJ/mol"],
              ["İleri engel: enzimli", r.withForward + " kJ/mol"],
              ["Geri engel: enzimsiz", r.withoutReverse + " kJ/mol"],
              ["Geri engel: enzimli", r.withReverse + " kJ/mol"],
              ["Net enerji değişimi", r.delta + " kJ/mol"],
            ]}
          />
          <p>
            İleri engel = tepe − başlangıç. Geri engel = tepe − ürün. Net fark ={" "}
            {r.final} − {r.initial} = {r.delta} kJ/mol.
          </p>
        </>
      );
      scope = r.scope;
      question = "Enzimli yolun net enerji değişimi kaç kJ/mol?";
      expected = String(r.delta);
      options = numberChoices([
        r.delta,
        -r.delta,
        0,
        r.withForward,
        r.withoutForward,
      ]);
      active = ["enzymeMode", "energyProfile", "lowering"];
    } else {
      const r = enzymeConditionsC026(v.temperatureIndex, v.pHIndex),
        x = (i: number) => 28 + 35 * i,
        y = (rate: number) => 240 - 20 * rate;
      controls = (
        <>
          {chooser}
          <Menu
            label="Sıcaklık (°C)"
            value={v.temperatureIndex}
            options={temperatureSamplesC026.map((t, i) => [
              String(i),
              String(t),
            ])}
            onChange={(x) => change({ temperatureIndex: Number(x) })}
          />
          <Menu
            label="Ortam pH"
            value={v.pHIndex}
            options={pHSamplesC026.map((p, i) => [String(i), String(p)])}
            onChange={(x) => change({ pHIndex: Number(x) })}
          />
        </>
      );
      model = (
        <>
          <Figure
            caption="Seçili pH’de aynı ölçekte iki örnek enzim: X düz, Y kesik çizgi. İşaretli daireler seçili sıcaklıktaki iki hızı gösterir. Çizgi araları ayrı ölçüm değildir."
            label={`${r.temperature} derece ve pH ${r.pH}: X ${fmt(r.x)}, Y ${fmt(r.y)}.`}
            height={310}
          >
            <path d="M28 20V240H238" className="bc026-axis" />
            <polyline
              points={r.rows.map((row, i) => `${x(i)},${y(row.x)}`).join(" ")}
              className="bc026-curve"
            />
            <polyline
              points={r.rows.map((row, i) => `${x(i)},${y(row.y)}`).join(" ")}
              className="bc026-curve bc026-dashed"
            />
            {[
              ["X", r.x],
              ["Y", r.y],
            ].map(([name, rate]) => (
              <circle
                key={name}
                cx={x(r.temperatureIndex)}
                cy={y(Number(rate))}
                r={name === "X" ? 7 : 4}
                className={name === "X" ? "bc026-marker" : "bc026-node"}
                data-enzyme={name}
                data-activity={rate}
              />
            ))}
            <text x="28" y="265">
              10
            </text>
            <text x="238" y="265" textAnchor="end">
              70 °C
            </text>
            <text x="28" y="292">
              X düz; Y kesik
            </text>
          </Figure>
          <Values
            rows={[
              ["Seçili sıcaklık", r.temperature + " °C"],
              ["Seçili pH", r.pH],
              ["X hızı", r.x],
              ["Y hızı", r.y],
            ]}
          />
          <ol className="bc026-records">
            {r.rows.map((row) => (
              <li key={row.temperature}>
                {row.temperature} °C: X {fmt(row.x)}, Y {fmt(row.y)}.
              </li>
            ))}
          </ol>
          <p>
            Verilen pH çarpanları: X için{" "}
            {r.pHRates[0]
              .map((v, i) => `${pHSamplesC026[i]}: ${v}/10`)
              .join("; ")}
            ; Y için{" "}
            {r.pHRates[1]
              .map((v, i) => `${pHSamplesC026[i]}: ${v}/10`)
              .join("; ")}
            . Sıcaklık tablosu bu çarpanla ölçeklenir.
          </p>
        </>
      );
      scope = r.scope;
      question = "Seçili koşulda hangi örneğin hızı daha büyük?";
      expected = r.winner;
      options = [
        ["X", "X"],
        ["Y", "Y"],
        ["tie", "Eşit"],
      ];
      active = ["enzymeMode", "temperatureIndex", "pHIndex"];
    }
  } else {
    mode = v.vitaminMode;
    const chooser = (
      <Menu
        label="Vitamin modeli"
        value={mode}
        options={[
          ["balance", "Miktar"],
          ["roles", "Görev"],
        ]}
        onChange={(vitaminMode) => change({ vitaminMode })}
      />
    );
    if (mode === "balance") {
      const r = vitaminBalanceC026(
          v.initial,
          v.solid,
          v.water,
          v.measured,
          v.keepWater,
        ),
        den = Math.max(1, r.initial),
        bar = (amount: number) => (220 * amount) / den;
      const rows: [string, number | null][] = [
        ["Katı", r.solid],
        ["Su", r.water],
        ["Kayıp", r.chemicalLoss],
      ];
      controls = (
        <>
          {chooser}
          <Range
            label="Başlangıç miktarı"
            value={v.initial}
            min={0}
            max={120}
            onChange={(initial) => change({ initial })}
          />
          <Range
            label="Katıda ölçülen"
            value={v.solid}
            min={0}
            max={v.initial}
            onChange={(solid) => change({ solid })}
          />
          <Check
            label="Su ayrıca ölçüldü"
            value={v.measured}
            onChange={(measured) => change({ measured })}
          />
          {v.measured && (
            <Range
              label="Suda ölçülen"
              value={v.water}
              min={0}
              max={v.initial - v.solid}
              onChange={(water) => change({ water })}
            />
          )}
          <Check
            label="Su yemekte tutuluyor"
            value={v.keepWater}
            onChange={(keepWater) => change({ keepWater })}
          />
        </>
      );
      model = (
        <>
          <Figure
            caption="Her çerçeve başlangıç miktarı ölçeğidir. Dolu çubuk bilinen miktarı gösterir. Soru işareti ölçülmeyen ve korunumla tek değere indirgenemeyen bölmedir; boş dolgu ölçülmüş sıfır yerine geçmez."
            label={`Başlangıç ${r.initial}, katı ${r.solid}, su ${r.water === null ? "bilinmiyor" : r.water}, etkinlik kaybı ${r.chemicalLoss === null ? "belirsiz" : r.chemicalLoss}.`}
            height={290}
          >
            {rows.map(([name, value], i) => (
              <g
                key={name}
                data-vitamin-compartment={name}
                data-amount={value === null ? "unknown" : value}
              >
                <text x="20" y={25 + 88 * i}>
                  {name}: {value === null ? "?" : value}
                </text>
                <rect
                  x="20"
                  y={37 + 88 * i}
                  width="220"
                  height="25"
                  className="bc026-node"
                />
                {value !== null && (
                  <rect
                    x="20"
                    y={37 + 88 * i}
                    width={bar(value)}
                    height="25"
                    className="bc026-marker"
                  />
                )}
              </g>
            ))}
          </Figure>
          <Values
            rows={[
              ["Başlangıç", r.initial],
              ["Katıda etkin kalan", r.solid],
              ["Suda etkin kalan", r.water === null ? "Belirsiz" : r.water],
              [
                "Kimyasal etkinlik kaybı",
                r.chemicalLoss === null
                  ? `${r.minimumChemicalLoss}–${r.maximumChemicalLoss} arası`
                  : r.chemicalLoss,
              ],
              [
                "Yenebilir bölüm",
                r.retained === null
                  ? `${r.minimumRetained}–${r.maximumRetained} arası`
                  : r.retained,
              ],
            ]}
          />
          <p>
            {r.chemicalLoss === null
              ? `${r.initial} = ${r.solid} + su + kayıp. Su ve kayıp toplamı ${r.initial - r.solid}; paylaşımı bilinmiyor.`
              : `${r.initial} = ${r.solid} + ${r.water} + ${r.chemicalLoss}.`}
          </p>
          <p>
            {r.keepWater
              ? "Yenebilir bölüm katı + tutulan sudur."
              : "Su dökülüyor: yenebilir bölüm yalnız katıdır."}{" "}
            {r.retained === null
              ? "Bu bölüm için kesin bir hesap yok."
              : `Yenebilir miktar ${r.retained} birimdir.`}
          </p>
        </>
      );
      scope = r.scope;
      question = "Kimyasal etkinlik kaybı için tek değer var mı?";
      expected = r.chemicalLoss === null ? "unknown" : "known";
      options = [
        ["known", "Evet"],
        ["unknown", "Hayır"],
      ];
      active = [
        "vitaminMode",
        "initial",
        "solid",
        "measured",
        "keepWater",
        ...(v.measured ? ["water" as const] : []),
      ];
    } else {
      const r = vitaminRoleC026(v.vitamin);
      controls = (
        <>
          {chooser}
          <Menu
            label="Vitamin türü"
            value={v.vitamin}
            options={vitaminSamplesC026.map((x) => [x.id, x.name])}
            onChange={(vitamin) => change({ vitamin })}
          />
        </>
      );
      model = (
        <>
          <Figure
            caption="Şema molekülün çözünürlük sınıfı ve insan bağlamını ilişkilendirir; hücre zarı veya emilim mekanizmasının atomik çizimi değildir. Ayrıntılı işlev ve sınır aşağıdaki HTML metnindedir."
            label={`${r.name}: ${r.solubility === "fat" ? "yağda" : "suda"} çözünür; ${r.role}.`}
            height={290}
          >
            <path d="M130 65V100M130 160V195" className="bc026-link" />
            <rect
              x="20"
              y="10"
              width="220"
              height="55"
              className="bc026-node"
            />
            <text x="130" y="46" textAnchor="middle">
              {r.name}
            </text>
            <rect
              x="20"
              y="100"
              width="220"
              height="60"
              className="bc026-node"
            />
            <text x="130" y="137" textAnchor="middle">
              {r.solubility === "fat" ? "Yağda" : "Suda"}
            </text>
            <rect
              x="20"
              y="195"
              width="220"
              height="60"
              className="bc026-node"
            />
            <text x="130" y="232" textAnchor="middle">
              İnsan
            </text>
          </Figure>
          <div data-vitamin-kind={r.id} data-solubility={r.solubility}>
            <Values
              rows={[
                ["Tür", r.name],
                [
                  "Çözünürlük",
                  r.solubility === "fat" ? "Yağda çözünür" : "Suda çözünür",
                ],
                ["Görev", r.role],
              ]}
            />
            <p>{displayCopyC026(r.note)}</p>
          </div>
          <details className="bc026-records">
            <summary>Türleri ve görevleri aç</summary>
            <ul>
              {vitaminSamplesC026.map((sample) => (
                <li key={sample.id}>
                  {sample.name}:{" "}
                  {sample.solubility === "fat" ? "yağda" : "suda"} çözünür.{" "}
                  {displayCopyC026(sample.role)}. {displayCopyC026(sample.note)}
                </li>
              ))}
            </ul>
          </details>
        </>
      );
      scope = r.scope;
      question = "Seçili vitamin hangi çözünürlük grubunda?";
      expected = r.solubility;
      options = [
        ["fat", "Yağda"],
        ["water", "Suda"],
      ];
      active = ["vitaminMode", "vitamin"];
    }
  }
  const validSelection = active.every(
      (field) =>
        saved[field] === v[field] &&
        (!raw ||
          !Object.hasOwn(raw, field) ||
          typeof raw[field] === typeof biologyCDefaults026[field]),
    ),
    validGuess = options.some(([value]) => value === v.guess),
    canCompare = validSelection && validGuess && v.reason.trim().length > 0;
  return (
    <section
      className="bc026-lab"
      data-forge026={lessonId}
      data-bioc026-mode={mode}
      aria-label="Bağ, hız ve vitamin kanıtını keşfet"
    >
      <h3>Koşulu değiştir, sonucu açıkla</h3>
      <p>
        Bir seçim yap, tahmin ve kısa gerekçeni yaz, sonra modelle kıyasla. Bu
        keşif puan, ustalık veya konu bitirme kaydı üretmez.
      </p>
      <div className="bc026-controls">{controls}</div>
      <div data-model-result>{model}</div>
      <p className="bc026-scope">{displayCopyC026(scope)}</p>
      <div className="bc026-prediction">
        <p>{question}</p>
        <Menu
          label="Sonuç tahminin"
          value={validGuess ? v.guess : ""}
          options={[["", "Seç"], ...options]}
          onChange={(guess) => persist({ guess, checked: false })}
        />
        <label className="bc026-field">
          <span>Gerekçen</span>
          <textarea
            rows={3}
            maxLength={120}
            value={v.reason}
            onChange={(e) =>
              persist({
                reason: e.currentTarget.value.slice(0, 120),
                checked: false,
              })
            }
          />
        </label>
        <button
          type="button"
          disabled={!canCompare}
          onClick={() => persist({ checked: true })}
        >
          Kıyasla
        </button>
        {v.checked && canCompare && (
          <p role="status" className="bc026-feedback">
            {v.guess === expected
              ? "Tahminin modelle uyumlu."
              : "Verilen koşulları ve modeldeki sonucu yeniden incele."}{" "}
            Sonuç: {options.find(([value]) => value === expected)![1]}. Yazılı
            gerekçenin doğruluğu otomatik ölçülmez.
          </p>
        )}
      </div>
    </section>
  );
}
