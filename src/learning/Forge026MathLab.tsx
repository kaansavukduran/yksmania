import { useId, type ReactNode } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  placeChange026,
  carry026,
  numbering026,
  division026,
  remainderWeights026,
  digitFilter026,
  common026,
  meetings026,
  commonPairs026,
  mathDefaults026,
  normalizeMath026,
} from "./forge026Math";
import "./forge026Math.css";
const fmt026 = (v: number) =>
  v.toLocaleString("tr-TR", { maximumFractionDigits: 6 });
type Choices026 = Record<string, string>;
const scopeCopy026 = (value: string) =>
  [
    ["başlangıçlar", "ilk zamanlar"],
    ["doğrusunda", "doğrusu üstünde"],
    ["incelenebilir", "incelenir"],
    ["seçildiğinde", "seçilirse"],
    ["dönüşümünde", "yazımında"],
    ["bölmüyorsa", "tam bölmezse"],
  ].reduce((text, [before, after]) => text.replaceAll(before, after), value);
function Menu026({
  label,
  value,
  options,
  change,
}: {
  label: string;
  value: string | number;
  options: Choices026;
  change: (value: string) => void;
}) {
  const id = useId();
  return (
    <label className="m026-field" htmlFor={id}>
      <span>{label}</span>
      <select
        id={id}
        value={value}
        onChange={(e) => change(e.currentTarget.value)}
      >
        {Object.entries(options).map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
function Number026({
  label,
  value,
  min,
  max,
  change,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  change: (value: number) => void;
}) {
  const id = useId();
  return (
    <label className="m026-field" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step="1"
        value={value}
        onChange={(e) => change(Number(e.currentTarget.value))}
      />
    </label>
  );
}
function Check026({
  label,
  checked,
  change,
}: {
  label: string;
  checked: boolean;
  change: (value: boolean) => void;
}) {
  return (
    <label className="m026-check">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => change(e.currentTarget.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
function Values026({ rows }: { rows: [string, string | number][] }) {
  return (
    <dl className="m026-values">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{typeof value === "number" ? fmt026(value) : value}</dd>
        </div>
      ))}
    </dl>
  );
}
function Figure026({
  caption,
  label,
  viewBox,
  children,
}: {
  caption: string;
  label: string;
  viewBox: string;
  children: ReactNode;
}) {
  return (
    <figure className="m026-figure">
      <figcaption>{caption}</figcaption>
      <svg viewBox={viewBox} role="img" aria-label={label}>
        {children}
      </svg>
    </figure>
  );
}
const numbers026 = (values: number[], extra: Choices026 = {}): Choices026 => ({
  ...Object.fromEntries(
    [...new Set(values)].map((n) => [String(n), fmt026(n)]),
  ),
  ...extra,
});
export default function Forge026MathLab({ lessonId }: { lessonId: string }) {
  const base = lessonId.replace(/-ileri$/, ""),
    key = "forge026-math:" + lessonId,
    raw = useApp().state.explorations[key],
    [saved, set] = useExploration(key, mathDefaults026),
    v = normalizeMath026(saved),
    persist = (patch: Partial<typeof v>) => set({ ...v, ...patch }),
    change = (patch: Partial<typeof v>) =>
      persist({ ...patch, guess: "", reason: "", checked: false });
  if (!["sayi-basamaklari", "bolme-bolunebilme", "ebob-ekok"].includes(base))
    return null;
  let controls: ReactNode,
    model: ReactNode,
    scope: string,
    question: string,
    expected: string,
    options: Choices026,
    active: (keyof typeof mathDefaults026)[],
    mode: string;
  const number = (
    field: keyof typeof v,
    label: string,
    min: number,
    max: number,
  ) => (
    <Number026
      key={field}
      label={label}
      value={v[field] as number}
      min={min}
      max={max}
      change={(value) => change({ [field]: value })}
    />
  );
  if (base === "sayi-basamaklari") {
    mode = v.placeMode;
    const chooser = (
      <Menu026
        label="Basamak etkinliği"
        value={mode}
        options={{
          change: "Yazım",
          carry: "Elde",
          numbering: "Etiket",
        }}
        change={(placeMode) => change({ placeMode })}
      />
    );
    if (mode === "change") {
      const r = placeChange026(v.number, v.operation, v.digit, v.position);
      scope = r.scope;
      question = "Sayısal değer nasıl değişti?";
      expected = r.difference > 0 ? "up" : r.difference < 0 ? "down" : "same";
      options = { up: "Arttı", down: "Azaldı", same: "Aynı kaldı" };
      active = [
        "placeMode",
        "number",
        "operation",
        ...(["replace", "append", "prepend"].includes(v.operation)
          ? (["digit"] as const)
          : []),
        ...(v.operation === "replace" ? (["position"] as const) : []),
      ];
      controls = (
        <>
          {chooser}
          {number("number", "Başlangıç sayısı", 0, 99999)}
          <Menu026
            label="Yazım işlemi"
            value={v.operation}
            options={{
              replace: "Değiştir",
              append: "Sağa ekle",
              prepend: "Sola ekle",
              reverse: "Ters çevir",
              delete: "Sonu sil",
            }}
            change={(operation) =>
              change({ operation: operation as typeof v.operation })
            }
          />
          {["replace", "append", "prepend"].includes(v.operation) &&
            number("digit", "Yeni rakam", 0, 9)}
          {v.operation === "replace" &&
            number("position", "Sağdan konum (birler 0)", 0, r.length - 1)}
        </>
      );
      model = (
        <>
          <Figure026
            caption="Kutular basamak konumlarını gösterir; alanları rakamın büyüklüğü değildir."
            label={`Eski yazım ${r.written}; yeni yazım ${r.resultWritten}.`}
            viewBox="0 0 320 180"
          >
            {[
              [r.written, 25],
              [r.resultWritten, 105],
            ].map(([s, y]) =>
              [...String(s)].map((digit, i) => (
                <g
                  key={String(y) + i}
                  data-digit-row={y === 25 ? "before" : "after"}
                  data-digit={digit}
                  data-position={String(s).length - 1 - i}
                >
                  <rect
                    x={16 + i * 46}
                    y={Number(y)}
                    width="40"
                    height="42"
                    className="m026-box"
                  />
                  <text x={36 + i * 46} y={Number(y) + 28} textAnchor="middle">
                    {digit}
                  </text>
                </g>
              )),
            )}
          </Figure026>
          <Values026
            rows={[
              ["Eski sayı", r.value],
              ["Yeni yazım", r.resultWritten],
              ["Yeni sayısal değer", r.result],
              ["Yeni − eski", r.difference],
              ["Eski rakam toplamı", r.digitSum],
              ["Yeni basamak adedi", r.resultLength],
            ]}
          />
          <p>
            {r.leadingZero
              ? "Yeni yazım baş sıfır içerir. Bu sıfırlar sayısal değere yeni basamak eklemez."
              : "Yeni yazımın ilk rakamı ile basamak adedi uyumludur."}
          </p>
          <ol className="m026-records">
            {r.originalTerms.map((t) => (
              <li key={t.position}>
                Sağdan konum {t.position}: {t.digit} × {fmt026(t.weight)} ={" "}
                {fmt026(t.contribution)}.
              </li>
            ))}
          </ol>
        </>
      );
    } else if (mode === "carry") {
      const r = carry026(v.addA, v.addB, v.addC),
        maximum = Math.max(...r.columns.map((c) => c.carryOut));
      scope = r.scope;
      question = "Bir sütundan çıkan en büyük elde";
      expected = String(maximum);
      options = numbers026([0, 1, 2]);
      active = ["placeMode", "addA", "addB", "addC"];
      controls = (
        <>
          {chooser}
          {number("addA", "Birinci toplanan", 0, 999)}
          {number("addB", "İkinci toplanan", 0, 999)}
          {number("addC", "Üçüncü toplanan", 0, 999)}
        </>
      );
      model = (
        <>
          <Figure026
            caption="Her sütunda ham toplamı ve sola taşınan tam onluğu izle. Sağdaki sütun birlerdir."
            label={`Toplam ${r.sum}; en büyük elde ${maximum}.`}
            viewBox="0 0 320 220"
          >
            {r.columns.map((c, i) => (
              <g
                key={c.position}
                data-carry-position={c.position}
                data-carry-in={c.carryIn}
                data-carry-out={c.carryOut}
                data-raw={c.raw}
              >
                <rect
                  x={260 - i * 66}
                  y="20"
                  width="54"
                  height="170"
                  className="m026-box"
                />
                <text x={287 - i * 66} y="48" textAnchor="middle">
                  {c.digits[0]}
                </text>
                <text x={287 - i * 66} y="77" textAnchor="middle">
                  {c.digits[1]}
                </text>
                <text x={287 - i * 66} y="106" textAnchor="middle">
                  {c.digits[2]}
                </text>
                <path d={`M${263 - i * 66} 118h48`} className="m026-line" />
                <text x={287 - i * 66} y="145" textAnchor="middle">
                  {c.digit}
                </text>
                <text x={287 - i * 66} y="177" textAnchor="middle">
                  ↑{c.carryOut}
                </text>
              </g>
            ))}
          </Figure026>
          <Values026
            rows={[
              ["Doğrudan toplam", r.sum],
              ["Yazılan rakam × ağırlık toplamı", r.rebuilt],
              ["En büyük elde", maximum],
            ]}
          />
          <ol className="m026-records">
            {r.columns.map((c) => (
              <li key={c.position}>
                Ağırlık {fmt026(c.weight)}: {c.digits.join(" + ")} + gelen elde{" "}
                {c.carryIn} = {c.raw}. Yazılan rakam {c.digit}, çıkan elde{" "}
                {c.carryOut}.
              </li>
            ))}
          </ol>
        </>
      );
    } else {
      const r = numbering026(v.pageFirst, v.pageLast);
      scope = r.scope;
      question = "Toplam yazılan rakam";
      expected = String(r.totalDigits);
      options = numbers026([
        r.totalDigits,
        r.count,
        r.totalDigits + r.count,
        r.totalDigits + 1,
      ]);
      active = ["placeMode", "pageFirst", "pageLast"];
      controls = (
        <>
          {chooser}
          {number("pageFirst", "İlk etiket", 1, 9999)}
          {number("pageLast", "Son etiket", v.pageFirst, 9999)}
        </>
      );
      model = (
        <>
          <Figure026
            caption="Çubuklar toplam rakam maliyetinin her basamak bloğuna düşen payıdır. Tam ölçek toplam maliyettir."
            label={`${r.count} etiket için ${r.totalDigits} rakam.`}
            viewBox={`0 0 320 ${r.blocks.length * 60 + 15}`}
          >
            {r.blocks.map((b, i) => (
              <g
                key={b.digits}
                data-numbering-digits={b.digits}
                data-block-first={b.first}
                data-block-last={b.last}
                data-cost={b.contribution}
              >
                <text x="20" y={20 + i * 60}>
                  {b.digits} hane
                </text>
                <rect
                  x="20"
                  y={28 + i * 60}
                  width="280"
                  height="20"
                  className="m026-outline"
                />
                <rect
                  x="20"
                  y={28 + i * 60}
                  width={(280 * b.contribution) / r.totalDigits}
                  height="20"
                  className="m026-fill"
                />
              </g>
            ))}
          </Figure026>
          <Values026
            rows={[
              ["Etiket adedi", r.count],
              ["Toplam rakam", r.totalDigits],
            ]}
          />
          <ol className="m026-records">
            {r.blocks.map((b) => (
              <li key={b.digits}>
                {b.first}–{b.last}: {b.last} − {b.first} + 1 = {b.count} etiket;{" "}
                {b.count} × {b.digits} = {b.contribution} rakam.
              </li>
            ))}
          </ol>
        </>
      );
    }
  } else if (base === "bolme-bolunebilme") {
    mode = v.divisionMode;
    const chooser = (
      <Menu026
        label="Bölme etkinliği"
        value={mode}
        options={{
          divide: "Bölme",
          weights: "Kalan",
          filter: "Adaylar",
        }}
        change={(divisionMode) => change({ divisionMode })}
      />
    );
    if (mode === "divide") {
      const r = division026(v.dividend, v.divisor),
        x = 30 + (260 * r.remainder) / r.divisor;
      scope = r.scope;
      question = "Bölünen tam bölünür mü?";
      expected = r.divisible ? "yes" : "no";
      options = { yes: "Evet", no: "Hayır" };
      active = ["divisionMode", "dividend", "divisor"];
      controls = (
        <>
          {chooser}
          {number("dividend", "Bölünen tam sayı", -999, 999)}
          {number("divisor", "Pozitif bölen", 1, 30)}
        </>
      );
      model = (
        <>
          <Figure026
            caption="İki komşu bölen katı arasında eş ölçekli sayı doğrusu. Renkli bölüm, soldaki kattan kalana kadar olan uzaklıktır."
            label={`${r.lower} ≤ ${r.dividend} < ${r.upper}; bölüm ${r.quotient}, kalan ${r.remainder}.`}
            viewBox="0 0 320 170"
          >
            <path d="M30 80H290" className="m026-line" />
            <path d={`M30 80H${x}`} className="m026-strong" />
            {Array.from({ length: r.divisor + 1 }, (_, i) => (
              <path
                key={i}
                d={`M${30 + (i * 260) / r.divisor} 74v12`}
                className="m026-line"
              />
            ))}
            <circle
              cx={x}
              cy="80"
              r="6"
              data-dividend={r.dividend}
              data-remainder={r.remainder}
              className="m026-fill"
            />
            <text x="30" y="125" textAnchor="start">
              {r.lower}
            </text>
            <text x="290" y="125" textAnchor="end">
              {r.upper}
            </text>
            <text x={x} y="55" textAnchor="middle">
              {r.dividend}
            </text>
          </Figure026>
          <Values026
            rows={[
              ["Tam bölüm", r.quotient],
              ["Kalan", r.remainder],
              ["Sol kat", r.lower],
              ["Sonraki kat", r.upper],
            ]}
          />
          <p>
            {r.dividend} = {r.divisor} × ({r.quotient}) + {r.remainder}; 0 ≤{" "}
            {r.remainder} &lt; {r.divisor}.
          </p>
        </>
      );
    } else if (mode === "weights") {
      const r = remainderWeights026(v.weightNumber, v.divisor),
        max = Math.max(1, ...r.terms.map((t) => Math.abs(t.contribution)));
      scope = r.scope;
      question = "Son kalan";
      expected = String(r.remainder);
      options = numbers026([
        r.remainder,
        r.divisor,
        (r.remainder + 1) % r.divisor,
        (r.remainder + r.divisor - 1) % r.divisor,
      ]);
      active = ["divisionMode", "weightNumber", "divisor"];
      controls = (
        <>
          {chooser}
          {number("weightNumber", "İncelenen doğal sayı", 0, 999999)}
          {number("divisor", "Kalanın böleni", 1, 30)}
        </>
      );
      model = (
        <>
          <Figure026
            caption="Her satırda rakam, aynı kalanı veren ağırlıkla çarpılır. Ortak sıfır çizgisinin solu negatif katkıdır; en büyük mutlak katkı 100 çizim birimidir."
            label={`Ara toplam ${r.transformed}, ${r.divisor} ile kalan ${r.remainder}.`}
            viewBox={`0 0 320 ${r.terms.length * 42 + 15}`}
          >
            {r.terms.map((t, i) => (
              <g
                key={t.position}
                data-weight-position={t.position}
                data-reduced-weight={t.reducedWeight}
                data-contribution={t.contribution}
              >
                <text x="5" y={26 + i * 42}>
                  {t.digit}×{t.reducedWeight}
                </text>
                <path d={`M180 ${10 + i * 42}v28`} className="m026-line" />
                <rect
                  x={
                    t.contribution < 0
                      ? 180 - (100 * Math.abs(t.contribution)) / max
                      : 180
                  }
                  y={12 + i * 42}
                  width={(100 * Math.abs(t.contribution)) / max}
                  height="22"
                  className="m026-fill"
                />
              </g>
            ))}
          </Figure026>
          <Values026
            rows={[
              ["Ara katkı toplamı", r.transformed],
              ["Son kalan", r.remainder],
              ["Bütün sayının tam bölümü", r.quotient],
            ]}
          />
          <ol className="m026-records">
            {r.terms.map((t) => (
              <li key={t.position}>
                Konum {t.position}: {t.digit} × {fmt026(t.weight)} yerine{" "}
                {t.digit} × ({t.reducedWeight}) = {t.contribution} katkısı.
              </li>
            ))}
          </ol>
          <p>
            {r.value} ve {r.transformed}, {r.divisor} ile aynı kalanı verir. Son
            kalan {r.remainder}; 0 ≤ {r.remainder} &lt; {r.divisor}.
          </p>
        </>
      );
    } else {
      const r = digitFilter026(
        v.pattern,
        v.divisorSet.split(",").map(Number),
        v.distinct,
      );
      scope = r.scope;
      question = "Bütün şartları sağlayan aday var mı?";
      expected = r.solutions.length ? "yes" : "no";
      options = { yes: "Var", no: "Yok" };
      active = ["divisionMode", "pattern", "divisorSet", "distinct"];
      controls = (
        <>
          {chooser}
          <Menu026
            label="Rakam yazımı"
            value={v.pattern}
            options={{
              "7?4": "7?4",
              "3?6?": "3?6?",
              "?28": "?28",
              "13?5": "13?5",
            }}
            change={(pattern) => change({ pattern })}
          />
          <Menu026
            label="Birlikte tam bölünme"
            value={v.divisorSet}
            options={{
              "3,4": "3 ve 4",
              "5,9": "5 ve 9",
              "4,11": "4 ve 11",
              "8,9": "8 ve 9",
            }}
            change={(divisorSet) => change({ divisorSet })}
          />
          <Check026
            label="Bütün rakamlar farklı olsun"
            checked={v.distinct}
            change={(distinct) => change({ distinct })}
          />
        </>
      );
      model = (
        <>
          <Figure026
            caption="Her nokta yazım koşullarına uyan bir adaydır. Dolu noktalar bütün bölme şartlarını sağlar; sayılar ve ayrı kalanlar alttaki listede yer alır."
            label={`${r.candidates.length} adaydan ${r.solutions.length} uygun sayı.`}
            viewBox={`0 0 320 ${Math.max(80, Math.ceil(r.candidates.length / 10) * 25 + 20)}`}
          >
            {r.candidates.map((c, i) => (
              <g key={c.value} data-candidate={c.value} data-passes={c.passes}>
                <title>{`${c.value}; kalanlar ${c.remainders.join(", ")}`}</title>
                <circle
                  cx={25 + (i % 10) * 29}
                  cy={20 + Math.floor(i / 10) * 25}
                  r="8"
                  className={c.passes ? "m026-fill" : "m026-outline"}
                />
              </g>
            ))}
          </Figure026>
          <Values026
            rows={[
              ["Yazım koşuluna uygun aday", r.candidates.length],
              ["Bütün filtrelerden geçen", r.solutions.length],
              [
                "Uygun sayılar",
                r.solutions.length ? r.solutions.join(", ") : "Yok",
              ],
            ]}
          />
          <details className="m026-records">
            <summary>Adayları ve kalanları aç</summary>
            <ol>
              {r.candidates.map((c) => (
                <li key={c.value}>
                  {c.value}:{" "}
                  {r.divisors
                    .map((d, i) => `${d} ile kalan ${c.remainders[i]}`)
                    .join("; ")}
                  .{" "}
                  {c.passes
                    ? "Bütün şartlar sağlanır."
                    : "En az bir şart sağlanmaz."}
                </li>
              ))}
            </ol>
          </details>
        </>
      );
    }
  } else {
    mode = v.commonMode;
    const chooser = (
      <Menu026
        label="Ortaklık etkinliği"
        value={mode}
        options={{
          tiles: "Kare",
          events: "Olay",
          pairs: "Çiftler",
        }}
        change={(commonMode) => change({ commonMode })}
      />
    );
    if (mode === "tiles") {
      const r = common026(v.commonA, v.commonB),
        unit = 2;
      scope = r.scope;
      question = "En büyük ortak kare kenarı";
      expected = String(r.gcd);
      options = numbers026([r.gcd, r.lcm, r.a, r.b, r.gcd + 1]);
      active = ["commonMode", "commonA", "commonB"];
      controls = (
        <>
          {chooser}
          {number("commonA", "Birinci kenar (cm)", 1, 120)}
          {number("commonB", "İkinci kenar (cm)", 1, 120)}
        </>
      );
      model = (
        <>
          <Figure026
            caption="Her iki eksende 1 cm = 2 çizim birimi. Çizgiler EBOB kenarlı eş kareleri ayırır; çerçeve verilen dikdörtgen alanını gösterir."
            label={`${r.a} ile ${r.b} cm; kare kenarı ${r.gcd} cm, ${r.columns} sütun ve ${r.rows} satır.`}
            viewBox="0 0 320 310"
          >
            <rect
              x="36"
              y="20"
              width={r.a * unit}
              height={r.b * unit}
              data-tile-width={r.a}
              data-tile-height={r.b}
              data-tile-side={r.gcd}
              className="m026-box"
            />
            {Array.from({ length: r.columns - 1 }, (_, i) => (
              <path
                key={"x" + i}
                data-grid-column={i + 1}
                d={`M${36 + (i + 1) * r.gcd * unit} 20v${r.b * unit}`}
                className="m026-line"
              />
            ))}
            {Array.from({ length: r.rows - 1 }, (_, i) => (
              <path
                key={"y" + i}
                data-grid-row={i + 1}
                d={`M36 ${20 + (i + 1) * r.gcd * unit}h${r.a * unit}`}
                className="m026-line"
              />
            ))}
            <text x="36" y={r.b * unit + 48}>
              {r.a} cm × {r.b} cm
            </text>
          </Figure026>
          <Values026
            rows={[
              ["EBOB / kare kenarı", `${r.gcd} cm`],
              ["EKOK", r.lcm],
              ["Kare düzeni", `${r.columns} × ${r.rows}`],
              ["Kare adedi", r.tiles],
              ["Aynı boydaki iki ayrı şeritte parça adedi", r.stripPieces],
              ["Pozitif ortak bölenler", r.commonDivisors.join(", ")],
            ]}
          />
          <details className="m026-records">
            <summary>Asal üsleri ve Öklid adımlarını aç</summary>
            <ul>
              {r.primes.map((p) => (
                <li key={p.prime}>
                  Asal {p.prime}: birincide üs {p.aExponent}, ikincide{" "}
                  {p.bExponent}; EBOB üssü {p.min}, EKOK üssü {p.max}.
                </li>
              ))}
            </ul>
            <ol>
              {r.euclid.map((e, i) => (
                <li key={i}>
                  {e.a} = {e.b} × {e.quotient} + {e.remainder}.
                </li>
              ))}
            </ol>
            <p>
              Son sıfır olmayan kalan {r.gcd}; iki sayılı çarpım: {r.a} × {r.b}{" "}
              = {r.gcd} × {r.lcm}.
            </p>
          </details>
        </>
      );
    } else if (mode === "events") {
      const r = meetings026(
          v.periodA,
          v.periodB,
          v.offsetA,
          v.offsetB,
          v.horizon,
          v.includeZero,
          v.includeEnd,
        ),
        x = (t: number) => 30 + (260 * t) / Math.max(1, r.horizon),
        endX = r.horizon === 0 ? 30 : 290;
      scope = r.scope;
      question = "Bu aralıkta ilk ortak an";
      expected = r.firstInWindow === null ? "none" : String(r.firstInWindow);
      options = numbers026(
        [
          r.lcm,
          0,
          r.horizon,
          ...(r.firstInWindow === null ? [] : [r.firstInWindow]),
        ],
        { none: "Yok" },
      );
      active = [
        "commonMode",
        "periodA",
        "periodB",
        "offsetA",
        "offsetB",
        "horizon",
        "includeZero",
        "includeEnd",
      ];
      controls = (
        <>
          {chooser}
          {number("periodA", "A periyodu (dk)", 1, 30)}
          {number("periodB", "B periyodu (dk)", 1, 30)}
          {number("offsetA", "A ilk zamanı (dk)", 0, 60)}
          {number("offsetB", "B ilk zamanı (dk)", 0, 60)}
          {number("horizon", "Son an (dk)", 0, 240)}
          <Check026
            label="0 anını dahil et"
            checked={v.includeZero}
            change={(includeZero) => change({ includeZero })}
          />
          <Check026
            label="Son anı dahil et"
            checked={v.includeEnd}
            change={(includeEnd) => change({ includeEnd })}
          />
        </>
      );
      model = (
        <>
          <Figure026
            caption="İki satır aynı zaman ölçeğini kullanır. Düşey renkli çizgiler ortak olayları, ayrı noktalar her dizinin olaylarını gösterir."
            label={`${r.count} ortak olay; ilk ortak ${r.firstInWindow === null ? "bu aralıkta yok" : r.firstInWindow + " dakika"}.`}
            viewBox="0 0 320 180"
          >
            <path d={`M30 50H${endX}M30 105H${endX}`} className="m026-line" />
            <text x="5" y="56">
              A
            </text>
            <text x="5" y="111">
              B
            </text>
            {r.common.map((t) => (
              <path
                key={t}
                data-common-time={t}
                d={`M${x(t)} 40v75`}
                className="m026-strong"
              />
            ))}
            {[
              ["A", r.eventsA, 50],
              ["B", r.eventsB, 105],
            ].map(([name, times, y]) =>
              (times as number[]).map((t) => (
                <circle
                  key={String(name) + t}
                  data-event={name}
                  data-time={t}
                  cx={x(t)}
                  cy={Number(y)}
                  r="3"
                  className="m026-fill"
                />
              )),
            )}
            <text x="30" y="150">
              0
            </text>
            {r.horizon > 0 ? (
              <text x="290" y="150" textAnchor="end">
                {r.horizon} dk
              </text>
            ) : (
              <text x="30" y="175">
                Tek an: 0 dk
              </text>
            )}
          </Figure026>
          <Values026
            rows={[
              ["Periyotların EKOK’u", `${r.lcm} dk`],
              ["Faz sınıfları uyumlu mu?", r.compatible ? "Evet" : "Hayır"],
              [
                "Aralıktaki ilk ortak an",
                r.firstInWindow === null ? "Yok" : `${r.firstInWindow} dk`,
              ],
              ["Ortak olay adedi", r.count],
              ["Ortak anlar", r.common.length ? r.common.join(", ") : "Yok"],
            ]}
          />
          <p>
            {r.compatible
              ? "Fazlar uyumlu olsa da seçili aralıkta ortak olay yer almayabilir."
              : "Başlangıç farkını periyotların EBOB’u bölmez; ortak olay yoktur."}
          </p>
          <details className="m026-records">
            <summary>İki olay dizisini aç</summary>
            <p>
              A: {r.eventsA.length ? r.eventsA.join(", ") : "Bu aralıkta yok"}.
            </p>
            <p>
              B: {r.eventsB.length ? r.eventsB.join(", ") : "Bu aralıkta yok"}.
            </p>
          </details>
        </>
      );
    } else {
      const r = commonPairs026(v.pairGcd, v.pairLcm),
        max = Math.max(1, r.lcm);
      scope = r.scope;
      question = "Uygun çiftlerde en küçük toplam";
      expected = r.minSum === null ? "none" : String(r.minSum);
      options = numbers026(
        [r.gcd, r.lcm, ...(r.minSum === null ? [] : [r.minSum, r.maxSum!])],
        { none: "Yok" },
      );
      active = ["commonMode", "pairGcd", "pairLcm"];
      controls = (
        <>
          {chooser}
          {number("pairGcd", "Verilen EBOB d", 1, 60)}
          {number("pairLcm", "Verilen EKOK m", 1, 3600)}
        </>
      );
      model = (
        <>
          <Figure026
            caption={`Her satır bir sırasız uygun çiftin iki sayısını aynı doğrusal ölçekte gösterir. Tam çubuk ${r.lcm} birimdir.`}
            label={
              r.feasible
                ? `${r.pairs.length} uygun çift; en küçük toplam ${r.minSum}.`
                : `${r.gcd}, ${r.lcm} sayısını bölmez; uygun çift yok.`
            }
            viewBox={`0 0 320 ${Math.max(90, r.pairs.length * 62 + 15)}`}
          >
            {r.pairs.map((p, i) => (
              <g
                key={p.a}
                data-pair-a={p.a}
                data-pair-b={p.b}
                data-pair-sum={p.sum}
              >
                <rect
                  x="20"
                  y={12 + i * 62}
                  width={(280 * p.a) / max}
                  height="16"
                  className="m026-fill"
                />
                <rect
                  x="20"
                  y={34 + i * 62}
                  width={(280 * p.b) / max}
                  height="16"
                  className="m026-outline"
                />
              </g>
            ))}
            {!r.feasible && (
              <text x="20" y="50">
                d ∤ m
              </text>
            )}
          </Figure026>
          <Values026
            rows={[
              [
                "Gerekli çarpım x · y",
                r.feasible ? r.lcm / r.gcd : "Tam sayı değil",
              ],
              ["Uygun çift adedi", r.pairs.length],
              ["En küçük toplam", r.minSum ?? "Yok"],
              ["En büyük toplam", r.maxSum ?? "Yok"],
            ]}
          />
          <ol className="m026-records">
            {r.pairs.map((p) => (
              <li key={p.a}>
                x={p.x}, y={p.y}; EBOB(x,y)=1. a={p.a}, b={p.b}; a+b={p.sum}.
              </li>
            ))}
          </ol>
          <p>
            {r.feasible
              ? "Her çiftte a ≤ b ve EBOB(x,y)=1 korunur. En küçük toplam yalnız uygun çiftler arasında seçilir."
              : "d, m’yi bölmediği için iki pozitif tam sayının bu EBOB ve EKOK’u birlikte taşıması mümkün değildir."}
          </p>
        </>
      );
    }
  }
  const validSelection = active.every(
      (field) =>
        saved[field] === v[field] &&
        (!raw ||
          !Object.hasOwn(raw, field) ||
          typeof raw[field] === typeof mathDefaults026[field]),
    ),
    validGuess = Object.hasOwn(options, v.guess),
    canCompare = validSelection && validGuess && v.reason.trim().length > 0;
  return (
    <section
      className="m026-lab"
      data-forge026={lessonId}
      data-model-mode={mode}
      aria-label="Sayı yazımı, kalan ve ortaklık keşfi"
    >
      <h3>Koşulu değiştir, hesabı geri kur</h3>
      <p>
        Bir modeli seç ve sonucu gerekçenle kıyasla. Bu keşif puan, ustalık veya
        konu bitirme kaydı üretmez.
      </p>
      <div className="m026-controls">{controls}</div>
      <div data-model-result className="m026-result">
        {model}
      </div>
      <p className="m026-scope">{scopeCopy026(scope)}</p>
      <div className="m026-prediction">
        <p className="m026-question">{question}</p>
        <Menu026
          label="Sonuç tahminin"
          value={validGuess ? v.guess : ""}
          options={{ "": "Seç", ...options }}
          change={(guess) => persist({ guess, checked: false })}
        />
        <label className="m026-field">
          <span>Modelden gerekçen</span>
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
          Kanıtı karşılaştır
        </button>
        {v.checked && canCompare && (
          <p role="status" className="m026-feedback">
            {v.guess === expected
              ? "Tahminin model sonucuyla uyumlu."
              : "Yazımı, işlem sırasını ve koşulları yeniden incele."}{" "}
            Sonuç: {options[expected]}. Gerekçenin doğruluğu otomatik ölçülmez.
          </p>
        )}
      </div>
    </section>
  );
}
