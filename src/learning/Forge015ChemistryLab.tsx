import { useId, type ReactNode } from "react";
import {
  ammoniaInventory,
  ammoniaTransfer,
  concentration015,
  dissolutionModel,
  ethaneBalance,
  hydrocarbonMixture,
  isotopeMean,
  microMacroGas,
  mixture015Kinds,
  purityFromGas,
  reaction015Kinds,
  reactionProcess,
  solidChange,
  yieldAnalysis,
} from "./forge015Chemistry";
import { useExploration } from "./useExploration";
import "./forge015Chemistry.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (x: number, d = 3) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: d }).format(x);
const bound = (x: number, a: number, b: number) =>
  Number.isFinite(x) ? Math.min(b, Math.max(a, x)) : a;
function Range({
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
  onChange: (n: number) => void;
}) {
  const id = useId();
  return (
    <div className="c015-control">
      <label htmlFor={id}>{label}</label>
      <span>{fmt(bound(value, min, max))}</span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={bound(value, min, max)}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
function Choice({
  label,
  value,
  choices,
  onChange,
}: {
  label: string;
  value: string;
  choices: readonly (readonly [string, string])[];
  onChange: (v: string) => void;
}) {
  const id = useId(),
    selected = choices.some(([v]) => v === value) ? value : choices[0][0];
  return (
    <div className="c015-control">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect
        id={id}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {choices.map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </ChoiceSelect>
      <span>Seçili: {choices.find(([v]) => v === selected)?.[1]}</span>
    </div>
  );
}
function Drawing({
  title,
  children,
  height = 300,
}: {
  title: string;
  children: ReactNode;
  height?: number;
}) {
  const id = useId();
  return (
    <svg
      className="c015-drawing"
      role="img"
      aria-labelledby={id}
      viewBox={`0 0 360 ${height}`}
    >
      <title id={id}>{title}</title>
      {children}
    </svg>
  );
}
function Bars({
  rows,
  max,
  unit,
  title,
}: {
  rows: { label: string; value: number; id: string }[];
  max: number;
  unit: string;
  title: string;
}) {
  const height = rows.length * 86 + 100;
  return (
    <figure>
      <Drawing title={title} height={height}>
        {rows.map((r, i) => (
          <g key={r.id}>
            <text x="16" y={30 + i * 86}>
              {r.label}
            </text>
            <text x="344" y={30 + i * 86} textAnchor="end">
              {fmt(r.value)} {unit}
            </text>
            <rect
              data-bar={r.id}
              x="16"
              y={42 + i * 86}
              width={(328 * Math.max(0, r.value)) / max}
              height="26"
              className={i % 2 ? "c015-mint" : "c015-coral"}
            />
          </g>
        ))}
        <path d={`M16 ${height - 48}H344`} />
        {[0, max / 2, max].map((v, i) => (
          <g key={i}>
            <path d={`M${16 + 164 * i} ${height - 52}v8`} />
            <text
              x={16 + 164 * i}
              y={height - 19}
              textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"}
            >
              {fmt(v)}
            </text>
          </g>
        ))}
      </Drawing>
      <figcaption>
        {title}. Ortak yatay eksen: {unit}; başlangıç 0. Renklerin yanında adlar
        ve sayılar da verilir.
      </figcaption>
    </figure>
  );
}
const unitIds = [
  "gercek-kutle-akb-nk",
  "tepkimeler-denklemler",
  "tepkime-turleri",
  "denklemli-miktar-gecisi",
  "sinirlayici-bilesen",
  "kati-kutlesi-degisimi",
  "yuzde-verim",
  "safsizlik-problemleri",
  "atom-kutlesi-hesaplari",
  "tepkimeli-karisim",
  "karisim-sinif-cozunme",
  "cozelti-derisimi",
];
export default function Forge015ChemistryLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const uid = useId();
  const [s, set] = useExploration(`forge015:chemistry:${lessonId}`, {
    amount: 1,
    molar: "oxygen",
    temperature: 0,
    pressure: 1,
    phase: "gas",
    a: 1,
    b: 1,
    c: 1,
    d: 1,
    reaction: "mg",
    step: 0,
    input: 4,
    inputUnit: "gram",
    nGrams: 28,
    hGrams: 6,
    firstProduct: 0,
    progress: 100,
    solid: "oxidation",
    sample: 24,
    purity: 100,
    nMoles: 1,
    hMoles: 3,
    actual: 27.2,
    gas: 8.8,
    recovery: 100,
    heavy: 25,
    basis: "atom",
    total: 0.5,
    co2: 0.75,
    information: "measured",
    mixture: "salt",
    added: 20,
    stage: 0,
    operation: "stir",
    solute: 20,
    solvent: 180,
    addWater: 0,
    evaporate: 0,
    density: 1.2,
    prediction: "",
    reason: "",
    compared: false,
  });
  const change = (values: Partial<typeof s>) =>
    set({ ...values, prediction: "", compared: false });
  const controls = (...children: ReactNode[]) => (
    <div className="c015-controls">{children}</div>
  );
  let content: ReactNode,
    answer = "",
    choices: string[] = [],
    heading = "";
  const slider = (
    label: string,
    key: keyof typeof s,
    min: number,
    max: number,
    step = 1,
  ) => (
    <Range
      key={key}
      label={label}
      value={Number(s[key])}
      min={min}
      max={max}
      step={step}
      onChange={(v) => change({ [key]: v })}
    />
  );
  const select = (
    label: string,
    key: keyof typeof s,
    options: readonly (readonly [string, string])[],
  ) => (
    <Choice
      key={key}
      label={label}
      value={String(s[key])}
      choices={options}
      onChange={(v) => change({ [key]: v })}
    />
  );
  const result = (children: ReactNode) => (
    <div className="c015-result" data-model-result aria-live="polite">
      {children}
    </div>
  );
  if (lessonId === unitIds[0]) {
    const M = s.molar === "helium" ? 4 : s.molar === "carbon" ? 44 : 32,
      r = microMacroGas(
        s.amount,
        M,
        s.temperature,
        s.pressure,
        s.phase !== "other",
      );
    const maxVolume = Math.max(1, (r.amount * 22.4 * r.kelvin) / 273.15 / 0.5);
    const [singleMantissa, singleExponent] = r.single
      .toExponential(4)
      .split("e");
    heading = "Tek varlık, örnek ve gaz koşulunu ayır";
    answer =
      r.volume === null
        ? "Bu faz için gaz hacmi hesaplanamaz."
        : "Koşul değişince hacim değişebilir; tek varlık kütlesi değişmez.";
    choices = [
      answer,
      "Basınç artınca tek molekülün gram kütlesi yarıya iner.",
      "Sıvı ve katı için de her koşulda 22,4 L/mol geçerlidir.",
    ];
    content = (
      <>
        <p>
          İdeal gaz öğretim modeli. NK burada 0 °C ve 1 atm; hacim yaklaşık 22,4
          × n × T(K)/273,15 ÷ P(atm). He atom, O₂/CO₂ molekül olarak sayılır.
          Faz seçimi gaz bağıntısının kapsamını sınar.
        </p>
        {controls(
          select("Madde", "molar", [
            ["oxygen", "O₂ — 32 g/mol"],
            ["helium", "He — 4 g/mol"],
            ["carbon", "CO₂ — 44 g/mol"],
          ]),
          slider("Madde miktarı (mol)", "amount", 0, 4, 0.25),
          slider("Sıcaklık (°C)", "temperature", 0, 100, 10),
          slider("Basınç (atm)", "pressure", 0.5, 4, 0.5),
          select("Hacim modeli", "phase", [
            ["gas", "İdeal gaz"],
            ["other", "Gaz olmayan faz; yoğunluk bilgisi yok"],
          ]),
        )}
        <figure>
          <Drawing title="Gaz hacminin basınçla değişimi">
            <text x="16" y="30">
              Hacim (L)
            </text>
            <path d="M70 55V235H340" />
            {[0, maxVolume / 2, maxVolume].map((v, i) => (
              <g key={i}>
                <path d={`M65 ${235 - i * 80}H75`} />
                <text x="60" y={241 - i * 80} textAnchor="end">
                  {fmt(v, 1)}
                </text>
              </g>
            ))}
            {[0.5, 1, 2, 4].map((p) => (
              <circle
                key={p}
                data-pressure={p}
                cx={70 + ((p - 0.5) * 270) / 3.5}
                cy={
                  235 -
                  ((r.amount * 22.4 * r.kelvin) / 273.15 / p / maxVolume) * 160
                }
                r="6"
                className="c015-mint"
              />
            ))}
            {r.volume !== null && (
              <circle
                data-current-volume={r.volume}
                cx={70 + ((r.atm - 0.5) * 270) / 3.5}
                cy={235 - (r.volume / maxVolume) * 160}
                r="10"
                className="c015-coral"
              />
            )}
            <text x="70" y="265">
              0,5
            </text>
            <text x="340" y="265" textAnchor="end">
              4 atm
            </text>
            <text x="180" y="294" textAnchor="middle">
              Basınç (atm)
            </text>
          </Drawing>
          <figcaption>
            Eğri örnek noktaları aynı n ve T içindir. Basınç ekseni 0,5 atm'den
            başlar; hacim ekseninin sayısal ölçeği seçili n ve T'ye göre
            gösterilir. Kütle grafiğin düşey ekseni değildir; gaz olmayan fazda
            bu hacim eğrisinden sonuç okunmaz.
          </figcaption>
        </figure>
        {result(
          <>
            <p>
              Örnek kütlesi: <strong>{fmt(r.mass)} g</strong>; miktar{" "}
              {fmt(r.amount)} mol.
            </p>
            <p>
              Tek varlık kütlesi:{" "}
              <strong>
                {singleMantissa.replace(".", ",")} × 10
                <sup>{Number(singleExponent)}</sup> g
              </strong>
              . Yaklaşık {fmt(M)} u ile sayısal bağ kurulur; bağıl atom veya
              molekül kütlesi boyutsuzdur.
            </p>
            <p>
              {r.volume === null ? (
                "Bu faz için gaz hacmi hesaplanamaz; yoğunluk gibi ek veri gerekir."
              ) : (
                <>
                  Hacim: <strong>{fmt(r.volume)} L</strong>; T = {fmt(r.kelvin)}{" "}
                  K, P = {fmt(r.atm)} atm.
                </>
              )}
            </p>
          </>,
        )}
      </>
    );
  } else if (lessonId === unitIds[1]) {
    const r = ethaneBalance(s.a, s.b, s.c, s.d);
    heading = "Etanın atom envanterini denkleştir";
    answer = r.smallest
      ? "En küçük tam sayılarla denk."
      : r.balanced
        ? "Atomlar denk; katsayılar sadeleşebilir."
        : "Denk değil; her elementin envanteri eşit değil.";
    choices = [
      answer,
      r.balanced
        ? "Ürün formülünü değiştirerek düzeltmek gerekir."
        : "Yalnız toplam molekül sayısı eşitse denk sayılır.",
      "Alt indis değişikliği madde kimliğini etkilemez.",
    ];
    content = (
      <>
        <p>
          C₂H₆ + O₂ → CO₂ + H₂O. Ön katsayıları değiştir; formüller sabittir.
          “Denk” ve “en küçük tam sayı” ayrı koşullardır.
        </p>
        {controls(
          slider("C₂H₆ katsayısı", "a", 1, 14),
          slider("O₂ katsayısı", "b", 1, 28),
          slider("CO₂ katsayısı", "c", 1, 28),
          slider("H₂O katsayısı", "d", 1, 28),
        )}
        <Drawing title="Karbon, hidrojen ve oksijen için atom envanteri">
          <text x="95" y="30" textAnchor="middle">
            Giren
          </text>
          <text x="260" y="30" textAnchor="middle">
            Ürün
          </text>
          {["C", "H", "O"].map((el, i) => (
            <g key={el}>
              <text x="16" y={88 + i * 70}>
                {el}
              </text>
              <rect
                x="55"
                y={50 + i * 70}
                width="80"
                height="52"
                rx="8"
                className="c015-coral"
              />
              <text
                className="c015-onfill"
                x="95"
                y={84 + i * 70}
                textAnchor="middle"
                data-left={el}
              >
                {r.left[i]}
              </text>
              <path d={`M155 ${76 + i * 70}H200`} />
              <rect
                x="220"
                y={50 + i * 70}
                width="80"
                height="52"
                rx="8"
                className="c015-mint"
              />
              <text
                className="c015-onfill"
                x="260"
                y={84 + i * 70}
                textAnchor="middle"
                data-right={el}
              >
                {r.right[i]}
              </text>
            </g>
          ))}
        </Drawing>
        {result(
          <>
            <p>
              Denklem: {r.values[0]} C₂H₆ + {r.values[1]} O₂ → {r.values[2]} CO₂
              + {r.values[3]} H₂O.
            </p>
            <p>
              <strong>{answer}</strong>
            </p>
            <p>
              Ortak bölen: {r.divisor}.{" "}
              {r.balanced
                ? "Her element iki tarafta eşit."
                : "C, H ve O toplamlarını ayrı denetle; molekül toplamının eşit olması gerekmez."}
            </p>
          </>,
        )}
      </>
    );
  } else if (lessonId === unitIds[2]) {
    const r = reactionProcess(s.reaction, s.step);
    heading = "Aynı tepkimeye hangi ölçütle bakıyorsun?";
    answer = r.chosen.tags;
    choices = [
      answer,
      "O₂ nerede yazarsa yazsın yalnız yanmadır.",
      "Katı oluşan her olay zorunlu elektron aktarımıdır.",
    ];
    content = (
      <>
        <p>
          {r.chosen.equation}. Seçili adım stokiyometrik ilerleme miktarıdır;
          gerçek zaman değildir. Başlangıç sayıları mol miktarlarını temsil
          eder; çizgi ve renkler yeni element oluşturmaz.
        </p>
        {controls(
          select(
            "Tepkime örneği",
            "reaction",
            reaction015Kinds.map((x) => [x.id, x.name] as const),
          ),
          slider("Temsili ilerleme (mol)", "step", 0, 4),
        )}
        <Bars
          title="Türlerin son madde miktarı"
          rows={r.chosen.labels.map((label, i) => ({
            label,
            value: r.amounts[i],
            id: `species-${i}`,
          }))}
          max={12}
          unit="mol"
        />
        {result(
          <>
            <p>
              <strong>{r.chosen.tags}</strong>
            </p>
            <p>{r.chosen.note}</p>
            {r.chosen.labels.map((x, i) => (
              <p key={x}>
                {x}: başlangıç {r.chosen.initial[i]} mol; son{" "}
                <strong>{fmt(r.amounts[i])} mol</strong>.
              </p>
            ))}
          </>,
        )}
      </>
    );
  } else if (lessonId === unitIds[3]) {
    const r = ammoniaTransfer(s.input, s.inputUnit);
    heading = "Verilen → mol → katsayı → hedef";
    answer = `Yeni NH₃: ${fmt(r.ammonia)} mol, ${fmt(r.mass)} g.`;
    choices = [
      answer,
      "Gram miktarını doğrudan 2/3 ile çarpmak daima gram ürün verir.",
      "Başlangıçta bulunan H₂, koşul verilmeden tamamen tüketilir.",
    ];
    content = (
      <>
        <p>
          N₂ + 3 H₂ → 2 NH₃. Seçili H₂'nin tamamı, yeterli N₂ ile tek yönde
          tepkimeye girer. M(H₂) = 2, M(N₂) = 28, M(NH₃) = 17 g/mol. Hacim
          seçilirse NK: 0 °C, 1 atm ve ideal gaz yaklaşımıdır.
        </p>
        {controls(
          select("Verilen H₂ birimi", "inputUnit", [
            ["gram", "Gram H₂"],
            ["mol", "Mol H₂"],
            ["litre", "NK’de litre H₂"],
          ]),
          slider("Tüketilen H₂ miktarı", "input", 0, 12, 0.5),
        )}
        <Bars
          title="Tüketilen ve oluşan mol miktarları"
          rows={[
            { label: "H₂ tüketilen", value: r.hydrogen, id: "hydrogen" },
            { label: "N₂ tüketilen", value: r.nitrogen, id: "nitrogen" },
            { label: "NH₃ yeni", value: r.ammonia, id: "ammonia" },
          ]}
          max={12}
          unit="mol"
        />
        {result(
          <>
            <p>
              H₂: <strong>{fmt(r.hydrogen)} mol</strong>. NH₃ = H₂ × 2/3 ={" "}
              <strong>{fmt(r.ammonia)} mol</strong>.
            </p>
            <p>
              Yeni NH₃: <strong>{fmt(r.mass)} g</strong>. Tüketilen N₂:{" "}
              {fmt(r.nitrogen * 28)} g; H₂: {fmt(r.hydrogen * 2)} g.
            </p>
            <p>
              NH₃ yaklaşık {fmt(r.ammonia)} Nₐ molekül; NK ideal hacmi{" "}
              {fmt(r.volume)} L. Bu hacim sıvı ürüne uygulanmaz.
            </p>
          </>,
        )}
      </>
    );
  } else if (lessonId === unitIds[4]) {
    const r = ammoniaInventory(s.nGrams, s.hGrams, s.firstProduct, s.progress),
      lim = {
        none: "Başlangıç gireni yok",
        both: "İki giren birlikte",
        nitrogen: "N₂",
        hydrogen: "H₂",
      }[r.limiter];
    heading = "Kapasiteyi, yeni ürünü ve son envanteri ayır";
    answer = `Yeni NH₃ ${fmt(r.newProduct)} g; son NH₃ ${fmt(r.finalProduct)} g.`;
    choices = [
      answer,
      "Başlangıç NH₃ miktarı yeni üretimin tamamıdır.",
      "Daha az gramla başlayan tür her zaman sınırlayıcıdır.",
    ];
    content = (
      <>
        <p>
          N₂ + 3 H₂ → 2 NH₃. M = 28, 2, 17 g/mol. Tek yönlü ideal miktar modeli;
          denge ve ters tepkime yoktur. İlk NH₃ envanterdir, yeni üretim
          değildir. İlerleme yüzdesi zaman/verim ölçümü değildir.
        </p>
        {controls(
          slider("İlk N₂ kütlesi (g)", "nGrams", 0, 84, 7),
          slider("İlk H₂ kütlesi (g)", "hGrams", 0, 18, 1),
          slider("İlk NH₃ kütlesi (g)", "firstProduct", 0, 34, 8.5),
          slider("İlerleme (%)", "progress", 0, 100, 10),
        )}
        <Bars
          title="Son envanterin kütlesi"
          rows={[
            { label: "N₂ artan", value: r.leftN * 28, id: "left-n" },
            { label: "H₂ artan", value: r.leftH * 2, id: "left-h" },
            { label: "NH₃ son", value: r.finalProduct, id: "final-product" },
          ]}
          max={136}
          unit="g"
        />
        {result(
          <>
            <p>
              n(N₂)/1 = {fmt(r.n)} mol; n(H₂)/3 = {fmt(r.h / 3)} mol. Tam
              kapasite <strong>{fmt(r.capacity)} mol</strong>; kapasiteyi
              sınırlayan: <strong>{lim}</strong>.
            </p>
            <p>
              Seçili ξ = {fmt(r.extent)} mol. Yeni NH₃{" "}
              <strong>{fmt(r.newProduct)} g</strong>; son NH₃{" "}
              <strong>{fmt(r.finalProduct)} g</strong>.
            </p>
            <p>
              Artan N₂ {fmt(r.leftN)} mol = {fmt(r.leftN * 28)} g; H₂{" "}
              {fmt(r.leftH)} mol = {fmt(r.leftH * 2)} g.
            </p>
            <p>
              Başlangıç toplamı {fmt(r.total)} g = son toplam{" "}
              {fmt(r.finalProduct + r.leftN * 28 + r.leftH * 2)} g.
            </p>
          </>,
        )}
      </>
    );
  } else if (lessonId === unitIds[5]) {
    const r = solidChange(s.solid, s.sample, s.purity, s.progress);
    heading = "Katıya giren ve katıdan çıkan oksijeni izle";
    answer = `Katı ${fmt(r.solid)} g; yeni ürün ${fmt(r.product)} g.`;
    choices = [
      answer,
      "Kalıntının tümü yeni ürün olduğu için artan ve inert sayılamaz.",
      "CuO indirgenirken suyun kütlesi her zaman katı kaybına eşittir.",
    ];
    content = (
      <>
        <p>
          {r.reduction
            ? "CuO + H₂ → Cu + H₂O; M = 80, 2, 64, 18 g/mol. Yeterli H₂; su tartılan katıdan ayrılır."
            : "2 Mg + O₂ → 2 MgO; M = 24, 32, 40 g/mol. Yeterli O₂; yalnız verilen oksit oluşur."}{" "}
          İnert dolgu tepkime vermez. Seçili ilerleme, saf kısmın dönüşüm
          yüzdesidir.
        </p>
        {controls(
          select("Katı dönüşümü", "solid", [
            ["oxidation", "Mg oksitlenmesi — katıya O eklenir"],
            ["reduction", "CuO indirgenmesi — katıdan O ayrılır"],
          ]),
          slider("Numune kütlesi (g)", "sample", 10, 100, 2),
          slider("Etkin bileşen saflığı (%)", "purity", 10, 100, 10),
          slider("Saf kısmın dönüşümü (%)", "progress", 0, 100, 10),
        )}
        <Bars
          title="Katı kalıntının ayrı bileşenleri"
          rows={[
            {
              label: r.reduction ? "CuO artan" : "Mg artan",
              value: r.remaining,
              id: "solid-left",
            },
            {
              label: r.reduction ? "Cu yeni" : "MgO yeni",
              value: r.product,
              id: "solid-product",
            },
            { label: "İnert", value: r.inert, id: "inert" },
          ]}
          max={170}
          unit="g"
        />
        {result(
          <>
            <p>
              Saf {fmt(r.pure)} g; inert {fmt(r.inert)} g. Son katı{" "}
              <strong>{fmt(r.solid)} g</strong>; değişim{" "}
              <strong>{fmt(r.change)} g</strong>.
            </p>
            <p>
              Yeni katı ürün <strong>{fmt(r.product)} g</strong>; artan giren{" "}
              {fmt(r.remaining)} g. İnert {fmt(r.inert)} g ayrıca kalır.
            </p>
            {r.reduction ? (
              <p>
                Katıdan ayrılan O {fmt(r.oxygen)} g; tüketilen H₂{" "}
                {fmt(r.hydrogen)} g; su <strong>{fmt(r.water)} g</strong>. Su,
                katı kaybından farklıdır. Toplam: {fmt(r.mass + r.hydrogen)} g ={" "}
                {fmt(r.solid + r.water)} g.
              </p>
            ) : (
              <p>
                Katıya bağlanan O {fmt(r.oxygen)} g. Başlangıç katı + alınan O ={" "}
                {fmt(r.mass + r.oxygen)} g; son katı aynı toplamdır.
              </p>
            )}
          </>,
        )}
      </>
    );
  } else if (lessonId === unitIds[6]) {
    const r = yieldAnalysis(s.nMoles, s.hMoles, s.actual);
    heading = "Gerçek ölçümü kuramsal üst sınırla karşılaştır";
    answer =
      r.percent === null
        ? "Teori sıfır; yüzde verim bu oranla tanımsız."
        : r.inconsistent
          ? "Üst sınır aşılıyor; veri ve varsayımlar tutarsız."
          : `Yüzde verim %${fmt(r.percent)}.`;
    choices = [
      answer,
      "Artan reaktif varsa ürün verimi zorunlu sıfırdır.",
      "Ölçülen ürün teoriyi aşarsa sayıyı gizlice %100’e kırpmak gerekir.",
    ];
    content = (
      <>
        <p>
          N₂ + 3 H₂ → 2 NH₃; M(NH₃) = 17 g/mol. İlk reaktifler saf kabul edilir.
          Ölçüm aynı saf hedef NH₃ içindir. Ürün toplama verimi, ayrı koşul
          verilmeden bütün reaktif artanlarını belirlemez.
        </p>
        {controls(
          slider("İlk N₂ miktarı (mol)", "nMoles", 0, 3, 0.5),
          slider("İlk H₂ miktarı (mol)", "hMoles", 0, 9, 0.5),
          slider("Ölçülen NH₃ (g)", "actual", 0, 102, 1.7),
        )}
        <Bars
          title="Aynı NH₃ ürününün kuramsal ve ölçülen kütlesi"
          rows={[
            { label: "Kuramsal", value: r.theoretical, id: "theory" },
            { label: "Gerçek", value: r.actual, id: "actual" },
          ]}
          max={102}
          unit="g"
        />
        {result(
          <>
            <p>
              Teorik NH₃: <strong>{fmt(r.theoretical)} g</strong>; ölçülen NH₃:{" "}
              <strong>{fmt(r.actual)} g</strong>.
            </p>
            <p>
              <strong>{answer}</strong>
            </p>
            {r.inconsistent && r.percent === null && (
              <p>
                Kuramsal üst sınır sıfırken pozitif ürün ölçümü verilen modelle
                tutarsızdır.
              </p>
            )}
            <p>
              {r.percent === null ? (
                "Payda sıfır olduğu için yüzde hesaplanmaz."
              ) : (
                <>
                  Gerçek / teorik × 100 = <strong>%{fmt(r.percent)}</strong>.{" "}
                  {r.inconsistent
                    ? "Nem, saflık, ürün kimliği, ölçüm veya ilk veri kontrol edilmeli; sonuç kırpılmadı."
                    : "Aynı ürün ve aynı gram birimi oranlandı."}
                </>
              )}
            </p>
          </>,
        )}
      </>
    );
  } else if (lessonId === unitIds[7]) {
    const r = purityFromGas(s.sample, s.gas, s.recovery);
    heading = "Ölçülen gazdan ilk saflığa geri yürü";
    answer = r.undefined
      ? "Sıfır verimle ters saflık belirlenemez."
      : !r.valid
        ? "Çıkarılan saf kütle numuneyi aşıyor; veriler tutarsız."
        : `Numune saflığı %${fmt(r.percent!)}.`;
    choices = [
      answer,
      "Gazın gramı numunedeki CaCO₃ gramına doğrudan eşittir.",
      "Ürün eldesi yüzdesi numunenin saflığıyla her zaman aynıdır.",
    ];
    content = (
      <>
        <p>
          CaCO₃ → CaO + CO₂; M = 100, 56, 44 g/mol. CO₂’nin tek kaynağı CaCO₃,
          diğer bileşen inert. Gaz ölçümü belirtilen ürün eldesi verimini
          içerir; önce gerçeği bu kesre bölüp teorik miktarı bul. Kalıntı, ürün
          toplama veriminden tek başına çıkarılmaz.
        </p>
        {controls(
          slider("Numune kütlesi (g)", "sample", 10, 100, 2),
          slider("Ölçülen CO₂ (g)", "gas", 0, 44, 0.44),
          slider("CO₂ eldesi verimi (%)", "recovery", 0, 100, 10),
        )}
        {r.valid ? (
          <Bars
            title="Çıkarılan başlangıç bileşimi"
            rows={[
              { label: "Saf CaCO₃", value: r.pure!, id: "pure" },
              { label: "İnert", value: Math.max(0, r.inert!), id: "inert" },
            ]}
            max={100}
            unit="g"
          />
        ) : (
          <Drawing title="Bileşim için veri koşulu sağlanmıyor">
            <path d="M60 80H300V230H60Z" />
            <text x="180" y="140" textAnchor="middle">
              Veri kontrolü
            </text>
            <text x="180" y="180" textAnchor="middle">
              Bileşim çizilmedi
            </text>
          </Drawing>
        )}
        {result(
          <>
            <p>
              Numune {fmt(r.mass)} g; ölçülen CO₂ {fmt(r.actual)} g.
            </p>
            <p>
              <strong>{answer}</strong>
            </p>
            {r.undefined && r.actual > 0 && (
              <p>
                Sıfır ürün eldesi verimi ile pozitif CO₂ ölçümü birlikte
                tutarsızdır; ayrıca ters yüzde hesabı tanımsızdır.
              </p>
            )}
            {r.theory !== null && (
              <>
                <p>
                  Teorik CO₂ {fmt(r.theory)} g; çıkarılan CaCO₃{" "}
                  <strong>{fmt(r.pure!)} g</strong>.
                </p>
                {r.valid && (
                  <p>
                    İnert {fmt(r.inert!)} g; toplam {fmt(r.pure! + r.inert!)} g.
                    Saflık <strong>%{fmt(r.percent!)}</strong>.
                  </p>
                )}
              </>
            )}
          </>,
        )}
      </>
    );
  } else if (lessonId === unitIds[8]) {
    const r = isotopeMean(s.heavy, s.basis);
    heading = "Atom payı ile kütle payını ayrı ağırlıklandır";
    answer = `Ortalama atomik kütle ${fmt(r.mean)} u.`;
    choices = [
      answer,
      "Her atom tek başına bu ortalama kütleli yeni bir izotoptur.",
      "Kütle yüzdesi her zaman atom yüzdesiyle aynıdır.",
    ];
    content = (
      <>
        <p>
          Aynı Z = 17 elementinin yaklaşık 35 ve 37 u izotopları. Model sayıları
          öğretim yaklaşımıdır; gerçek hassas izotop kütlesi ölçümü değildir.
          Atomca pay seçilirse aritmetik ağırlıklı, kütlece pay seçilirse önce
          pay/M ile atom kesri hesaplanır.
        </p>
        {controls(
          slider("Ağır izotop payı (%)", "heavy", 0, 100, 5),
          select("Verilen payın türü", "basis", [
            ["atom", "Atom adedi yüzdesi"],
            ["mass", "Kütle yüzdesi"],
          ]),
        )}
        <Bars
          title="Normalize edilmiş atom bollukları"
          rows={[
            { label: "35 u hafif", value: 100 * r.lightAtom, id: "light" },
            { label: "37 u ağır", value: 100 * r.heavyAtom, id: "heavy" },
          ]}
          max={100}
          unit="%"
        />
        {result(
          <>
            <p>
              Hafif atom bolluğu <strong>%{fmt(100 * r.lightAtom)}</strong>;
              ağır atom bolluğu <strong>%{fmt(100 * r.heavyAtom)}</strong>.
            </p>
            <p>
              Ortalama atomik kütle <strong>{fmt(r.mean)} u</strong>; bağıl Aᵣ
              aynı sayısal yaklaşımda boyutsuzdur.
            </p>
            <p>
              Z = 17 sabit; A = 35 ve 37 için nötronlar 18 ve 20. Ortalama{" "}
              {fmt(r.mean)} değeri yeni bir atomun nötron hesabında A yerine
              konmaz.
            </p>
          </>,
        )}
      </>
    );
  } else if (lessonId === unitIds[9]) {
    const r = hydrocarbonMixture(s.total, s.co2, s.information !== "total");
    heading = "Karışımın iki bağımsız eşitliğini kur";
    answer = !r.determined
      ? "Yalnız toplamdan tek bileşim belirlenemez."
      : !r.valid
        ? "Ürün miktarı mümkün aralık dışında."
        : `CH₄ ${fmt(r.methane)} mol; C₂H₆ ${fmt(r.ethane)} mol.`;
    choices = [
      answer,
      "İki yakıt da birer mol CO₂ verdiği için katkıları ayırmak gerekmez.",
      "Negatif bileşen miktarı fiziksel bir karışımdır.",
    ];
    content = (
      <>
        <p>
          CH₄ + 2 O₂ → CO₂ + 2 H₂O; 2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O. Tam yanma,
          yeterli O₂. M(CH₄) = 16, M(C₂H₆) = 30 g/mol. İkinci veri varsa x + y =
          toplam, x + 2y = CO₂.
        </p>
        {controls(
          slider("Toplam yakıt (mol)", "total", 0.1, 2, 0.1),
          select("Bağımsız ölçüm", "information", [
            ["measured", "CO₂ ayrıca ölçüldü"],
            ["total", "Yalnız toplam mol biliniyor"],
          ]),
          slider("Ölçülen CO₂ (mol)", "co2", 0, 4, 0.05),
        )}
        {r.valid ? (
          <Bars
            title="Çıkarılan yakıt bileşimi"
            rows={[
              { label: "CH₄", value: Math.max(0, r.methane), id: "methane" },
              { label: "C₂H₆", value: Math.max(0, r.ethane), id: "ethane" },
            ]}
            max={2}
            unit="mol"
          />
        ) : (
          <Drawing title="Bileşim tek ya da fiziksel olarak geçerli değil">
            <path d="M30 70H330V220H30Z" />
            <text x="180" y="120" textAnchor="middle">
              {r.determined ? "Aralık dışı veri" : "Tek eşitlik"}
            </text>
            <text x="180" y="170" textAnchor="middle">
              Bileşim verilmedi
            </text>
          </Drawing>
        )}
        {result(
          <>
            <p>
              <strong>{answer}</strong>
            </p>
            <p>
              Toplam {fmt(r.total)} mol için CO₂ aralığı {fmt(r.total)}–
              {fmt(2 * r.total)} moldür.
            </p>
            {r.valid && (
              <>
                <p>
                  Kütle <strong>{fmt(r.mass!)} g</strong>; su {fmt(r.water!)}{" "}
                  mol; tüketilen O₂ {fmt(r.oxygen!)} mol.
                </p>
                <p>
                  Kontrol: x + y = {fmt(r.methane + r.ethane)}; x + 2y ={" "}
                  {fmt(r.methane + 2 * r.ethane)} mol.
                </p>
              </>
            )}
          </>,
        )}
      </>
    );
  } else if (lessonId === unitIds[10]) {
    const r = dissolutionModel(
      mixture015Kinds.some(([id]) => id === s.mixture) ? s.mixture : "salt",
      s.added,
      s.stage,
      s.operation,
    );
    heading = "Tanecikleri dağıt, beklet ve filtreyle karşılaştır";
    answer =
      r.amount === 0
        ? "Bu modelde yalnız su var; eklenen ikinci bileşen yok."
        : r.soluble
          ? `Çözünmüş ${fmt(r.dissolved)} g; ayrı katı ${fmt(r.undissolved)} g.`
          : r.kind === "oil"
            ? "Damlacık dağılımı emülsiyon; bekleme ayrı faz gösterebilir."
            : r.kind === "colloid"
              ? "Tipik kolloid sıradan kâğıt filtreden geçebilir."
              : "Kaba kum uygun kâğıt filtrede tutulabilir.";
    choices = [
      answer,
      "Kâğıt filtre her çözünmüş iyonu tutarak kesin saf su verir.",
      "Karıştırma aynı koşuldaki denge çözünürlüğünü zorunlu artırır.",
    ];
    content = (
      <>
        <p>
          100 g su; 20 °C civarı yuvarlanmış denge verisi NaCl için 36 g/100 g
          su, şeker için yaklaşık 200 g/100 g su. Çizilen tanecikler
          örneklemedir; boyut/adet gerçek gram ölçeği değildir. Adım gerçek
          saniye/kinetik yasası değil; kullanıcı kontrollü temsili yaklaşmadır.
        </p>
        {controls(
          select("Karışım örneği", "mixture", mixture015Kinds),
          slider("Eklenen bileşen (g)", "added", 0, 60, 2),
          slider("Çözünme gösterim adımı", "stage", 0, 4),
          select("Uygulanan işlem", "operation", [
            ["stir", "Dağılımı karıştırarak göster"],
            ["rest", "Bekleme sonrası görünüm"],
            ["filter", "Sıradan kâğıt filtreyi karşılaştır"],
          ]),
        )}
        <Drawing
          title="Çözünme, damlacık, süspansiyon ve koşullu filtre modeli"
          height={350}
        >
          <path d="M20 30V320H340V30" />
          {r.filtered && (
            <>
              <path data-filter d="M25 165H335" strokeDasharray="5 4" />
              <text x="330" y="155" textAnchor="end">
                Filtre
              </text>
            </>
          )}
          {r.amount === 0 ? null : r.kind === "oil" ? (
            r.settled ? (
              <rect
                data-oil-layer
                x="24"
                y="45"
                width="312"
                height="60"
                className="c015-coral"
              />
            ) : (
              Array.from({ length: 7 }, (_, i) => (
                <ellipse
                  key={i}
                  cx={55 + (i % 3) * 110}
                  cy={65 + Math.floor(i / 3) * 80}
                  rx="24"
                  ry="16"
                  className="c015-coral"
                />
              ))
            )
          ) : r.soluble ? (
            <>
              {Array.from(
                { length: r.dissolved > 0 ? (r.ionic ? 6 : 5) : 0 },
                (_, i) => {
                  const x = 55 + (i % 3) * 120,
                    y0 = 250 + Math.floor(i / 3) * 40,
                    y1 = r.filtered
                      ? 205 + Math.floor(i / 3) * 65
                      : 65 + Math.floor(i / 3) * 100,
                    y = y0 + ((y1 - y0) * r.step) / 4;
                  return (
                    <g key={i}>
                      <circle
                        data-particle={
                          r.ionic ? (i % 2 ? "anion" : "cation") : "molecule"
                        }
                        cx={x}
                        cy={y}
                        r="23"
                        className={i % 2 ? "c015-mint" : "c015-coral"}
                      />
                      <text
                        x={x}
                        y={y + 6}
                        textAnchor="middle"
                        className="c015-onfill c015-ion"
                      >
                        {r.ionic ? (i % 2 ? "Cl⁻" : "Na⁺") : "Ş"}
                      </text>
                    </g>
                  );
                },
              )}
              {r.undissolved > 0 && (
                <g>
                  <text x="30" y={r.filtered ? 145 : 299}>
                    Katı: {fmt(r.undissolved)} g
                  </text>
                  <rect
                    data-undissolved={r.undissolved}
                    x="30"
                    y={r.filtered ? 153 : 308}
                    width={(300 * r.undissolved) / 60}
                    height="12"
                    className="c015-solid"
                  />
                </g>
              )}
              <g data-dissolved={r.dissolved} />
            </>
          ) : (
            Array.from({ length: 9 }, (_, i) => (
              <circle
                key={i}
                data-suspended={r.kind}
                cx={45 + (i % 3) * 130}
                cy={
                  r.kind === "sand"
                    ? r.filtered
                      ? 137 + (i % 2) * 14
                      : r.settled
                        ? 292 + (i % 2) * 14
                        : 65 + Math.floor(i / 3) * 90
                    : r.filtered
                      ? 190 + Math.floor(i / 3) * 42
                      : 65 + Math.floor(i / 3) * 90
                }
                r={r.kind === "sand" ? 14 : 9}
                className="c015-mint"
              />
            ))
          )}
          {r.amount > 0 && r.kind === "colloid" && (
            <path
              data-scattering
              d="M25 80L330 240M100 120L110 85M160 150L145 200"
              strokeDasharray="5 4"
            />
          )}
        </Drawing>
        <p>
          Na⁺/Cl⁻ gösterimi örgüden ayrılan iyon örnekleridir; Ş, nötr şeker
          molekülü temsilidir. Su molekülleri çizilmedi; katyonu O(δ−), anyonu
          H(δ+) uçlarıyla sarma yönü anlatımda açıklanır. Ayrı katı şeridi,
          çözünmemiş miktarı gösterir.
        </p>
        {result(
          <>
            <p>
              <strong>{answer}</strong>
            </p>
            {r.soluble && r.dissolved > 0 && (
              <p>
                Sıvı çözelti <strong>{fmt(r.solution!)} g</strong>; kap toplamı{" "}
                {fmt(r.total)} g.{" "}
                {r.step === 4
                  ? "Model denge adımı."
                  : "Denge öncesi temsili adım; son çözünürlük hesabı değildir."}
              </p>
            )}
            {r.soluble && r.dissolved === 0 && (
              <p>
                Sıvı su: 100 g; henüz çözünmüş ikinci bileşen: 0 g. Kap toplamı:{" "}
                {fmt(r.total)} g.
              </p>
            )}
            {r.filtered && r.amount > 0 && (
              <p>
                {r.soluble ? (
                  <>
                    Filtrede kalan ayrı katı {fmt(r.retained)} g; sıvıyla geçen
                    çözünmüş bileşen <strong>{fmt(r.passedSolute)} g</strong>.
                    Filtrat saf su olmak zorunda değildir.
                  </>
                ) : r.kind === "sand" ? (
                  "Bu modelde uygun kaba kum parçacıkları filtrede tutulur."
                ) : r.kind === "colloid" ? (
                  "Tipik kolloid için sıradan kâğıt filtre yeterli sayılmaz; ultrafiltrasyon farklıdır."
                ) : (
                  "Yağ-su emülsiyonunu bu filtreyle güvenilir ayırma garantisi verilmez."
                )}
              </p>
            )}
            <p>
              {r.amount === 0
                ? "Bu modelde yalnız su var; ikinci bileşenli karışım ve çözünmüş iyon gösterilmedi."
                : r.kind === "salt"
                  ? r.dissolved > 0
                    ? "Çözünmüş NaCl iyonları çözeltide hareketli; katı örgüyle aynı düzen değildir."
                    : "Başlangıçta NaCl katı örgüdedir; henüz çözünmüş miktar gösterilmedi."
                  : r.kind === "sugar"
                    ? "Şeker moleküler dağılır; iyonlaşmış şeker varsayılmadı."
                    : r.kind === "oil"
                      ? "Yağ, su içinde damlacık veya ayrı sıvı faz; moleküler çözünme olarak çizilmedi."
                      : r.kind === "colloid"
                        ? "Işık çizgileri saçılma temsilidir; tanecikler gerçek ölçekte değildir."
                        : "Kum ayrı katı faz; çözünmüş tanecik gibi gösterilmedi."}
            </p>
          </>,
        )}
      </>
    );
  } else if (lessonId === unitIds[11]) {
    const r = concentration015(
      s.solute,
      s.solvent,
      s.addWater,
      s.evaporate,
      s.density,
    );
    heading = "Aynı çözüneni farklı paydalarla ölç";
    answer = `Kütlece %${fmt(r.percent)}; molarite ${fmt(r.molarity)} mol/L.`;
    choices = [
      answer,
      "Molarite ve molalite her koşulda aynı birim ve sayıdır.",
      "Kütlece yüzde hesabında payda yalnız suyun kütlesidir.",
    ];
    content = (
      <>
        <p>
          Kurgu X: M = 40 g/mol. Tam çözünme, kayıp/tepkime/çökelme yok; yalnız
          su eklenir veya uzaklaştırılır. Yoğunluk seçili çözeltinin verilmiş
          öğretim verisidir; gerçek bir kimyasalın yoğunluk tahmini değildir. V
          = m/ρ ile son hacim bulunur.
        </p>
        {controls(
          slider("Çözünmüş X (g)", "solute", 5, 40, 5),
          slider("İlk su kütlesi (g)", "solvent", 100, 400, 20),
          slider("Eklenen su (g)", "addWater", 0, 300, 20),
          slider("Buharlaşan su (g)", "evaporate", 0, 50, 10),
          slider("Verilen yoğunluk (g/mL)", "density", 0.8, 1.4, 0.1),
        )}
        <Bars
          title="Son çözeltinin bileşen kütleleri"
          rows={[
            { label: "X çözünmüş", value: r.dissolved, id: "solute" },
            { label: "Su son", value: r.water, id: "water" },
          ]}
          max={700}
          unit="g"
        />
        {result(
          <>
            <p>
              Çözünen{" "}
              <strong>
                {fmt(r.dissolved)} g = {fmt(r.moles)} mol
              </strong>
              . Su {fmt(r.water)} g; çözelti <strong>{fmt(r.mass)} g</strong>.
            </p>
            <p>
              Kütlece <strong>%{fmt(r.percent)}</strong>; kütlece ppm{" "}
              {fmt(r.ppm)} mg/kg. Çözücü kütlesi yüzde paydası değildir.
            </p>
            <p>
              Son hacim {fmt(r.volumeMl)} mL = {fmt(r.volumeMl / 1000)} L.
              Molarite <strong>{fmt(r.molarity)} mol/L</strong>.
            </p>
            <p>
              Molalite <strong>{fmt(r.molality)} mol/kg çözücü</strong>. İki
              payda: çözelti litresi ve su kilogramı ayrı tutuldu.
            </p>
          </>,
        )}
      </>
    );
  } else {
    return null;
  }
  return (
    <section
      className="forge015-chemistry"
      data-forge015={lessonId}
      aria-labelledby={`${uid}-heading`}
    >
      <h3 id={`${uid}-heading`}>{heading}</h3>
      {content}
      <form
        className="c015-prediction"
        onSubmit={(e) => {
          e.preventDefault();
          set({ compared: true });
        }}
      >
        <h4>Önce tahmin et, sonra kanıtı karşılaştır</h4>
        <label htmlFor={`${uid}-prediction`}>Sonuç tahminin</label>
        <ChoiceSelect
          id={`${uid}-prediction`}
          value={s.prediction}
          onChange={(e) => set({ prediction: e.target.value, compared: false })}
        >
          <option value="">Bir sonuç seç</option>
          {choices.map((x, i) => (
            <option key={x} value={String(i)}>
              {x}
            </option>
          ))}
        </ChoiceSelect>
        <p className="c015-current">
          Seçili tahmin:{" "}
          {s.prediction === ""
            ? "Henüz seçilmedi."
            : (choices[Number(s.prediction)] ?? "Yeniden seçim yap.")}
        </p>
        <label htmlFor={`${uid}-reason`}>Gerekçen (en çok 120 karakter)</label>
        <textarea
          id={`${uid}-reason`}
          maxLength={120}
          rows={3}
          value={s.reason.slice(0, 120)}
          onChange={(e) =>
            set({ reason: e.target.value.slice(0, 120), compared: false })
          }
        />
        <button
          type="submit"
          disabled={s.prediction === "" || !s.reason.trim()}
        >
          Tahminimi karşılaştır
        </button>
        {s.compared && (
          <div className="c015-feedback" role="status">
            <strong>
              {s.prediction === "0"
                ? "Seçimin modelle uyumlu."
                : "Seçimini verilen koşullarla yeniden incele."}
            </strong>
            <p>
              Kanıt: {answer} Birim, sistem sınırı ve varsayımı gerekçenle
              karşılaştır.
            </p>
          </div>
        )}
      </form>
      <p className="c015-footnote">
        Bu keşif seçimlerini ve gerekçeni bu cihazda saklar. Süre, çizim adımı
        veya karşılaştırma öğrenme puanı, ustalık ya da konu tamamlama
        oluşturmaz.
      </p>
    </section>
  );
}
