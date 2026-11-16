import { useId } from "react";
import { useApp } from "../store";
import {
  auxinResponse024,
  culture024,
  coleoptile024,
  coleoptileTreatments024,
  nightResponse024,
  flowerInventory024,
  reproductivePath024,
  pollenTransfer024,
  type AuxinOrgan024,
  type ColeoptileTreatment024,
  type LightSide024,
  type PhotoKind024,
  type NightPulse024,
  type ReproductiveLineage024,
} from "./forge024BiologyB";
import { useExploration } from "./useExploration";
import "./forge024BiologyB.css";
type ExplorationValues = Record<string, string | number | boolean>;
function useBiologyExploration<T extends ExplorationValues>(
  id: string,
  defaults: T,
) {
  const { state } = useApp();
  const raw = state.explorations[id];
  const [values, write] = useExploration(id, defaults);
  // The shared hook replaces wrong types before returning values. Keep that
  // repair visible to feedback, then persist the repaired values on user intent.
  const validTypes = (...keys: (keyof T)[]) =>
    !raw ||
    keys.every(
      (key) =>
        !Object.hasOwn(raw, key) ||
        typeof raw[key as string] === typeof defaults[key],
    );
  const set = (patch: Partial<typeof values>) => write({ ...values, ...patch });
  return [values, set, validTypes] as const;
}
const labCopyB = (text: string) =>
  [
    [
      "Her mikrosporda mitoz: iki hücreli polen",
      "Her mikrospor mitozla iki hücreli polen olur",
    ],
    [
      "Tüm dört mikrosporun geliştiği, polenin iki hücreli oluşup generatif hücrenin daha sonra iki sperm verdiği tipik örnek. Erkek gametofit polen, tek sperm hücresi değildir.",
      "Bu tipik örnekte dört mikrospor da gelişir. Polen iki hücreli oluşur; generatif hücre sonra iki sperm verir. Erkek gametofit polendir; tek sperm hücresi değildir.",
    ],
    ["uzama ölçümleridir.", "uzama ölçümleri var."],
    ["Doz basamakları", "Doz adımları"],
    ["mekanik büyümeyi engellemediği", "mekanik büyümeye engel olmadığı"],
    ["verilmemiştir", "verilmedi"],
    ["gereksinimleri", "ihtiyaçları"],
    ["henüz birleşmemiş", "henüz ayrı"],
    ["Hücreselleşme:", "Hücre oluşumu:"],
    ["belirlenemez", "belli olmaz"],
  ].reduce((value, [before, after]) => value.replaceAll(before, after), text);
const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 }).format(n);
const bound = (n: number, a: number, b: number) =>
  Number.isFinite(n) ? Math.max(a, Math.min(b, Math.round(n))) : a;
const member = <T extends Record<string, string>>(
  map: T,
  key: string,
  fallback: keyof T,
): keyof T => (Object.hasOwn(map, key) ? key : fallback);
function Menu({
  label,
  value,
  options,
  change,
}: {
  label: string;
  value: string;
  options: Record<string, string>;
  change: (s: string) => void;
}) {
  const id = useId();
  return (
    <div className="bio024b-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => change(e.target.value)}>
        {Object.entries(options).map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
function Slider({
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
  change: (n: number) => void;
}) {
  const id = useId();
  return (
    <div className="bio024b-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{fmt(value)}</output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step="1"
        value={value}
        onChange={(e) => change(Number(e.target.value))}
      />
    </div>
  );
}
function Check({
  label,
  value,
  change,
}: {
  label: string;
  value: boolean;
  change: (b: boolean) => void;
}) {
  return (
    <label className="bio024b-check">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => change(e.target.checked)}
      />
      {label}
    </label>
  );
}
type Prediction = { prediction: string; reason: string; checked: boolean };
function Compare({
  value,
  options,
  expected,
  proof,
  change,
  compare,
  validSelection = true,
}: {
  value: Prediction;
  options: Record<string, string>;
  expected: string;
  proof: string;
  change: (p: Partial<Prediction>) => void;
  compare: () => void;
  validSelection?: boolean;
}) {
  const id = useId(),
    valid = Object.hasOwn(options, value.prediction),
    reasonReady = value.reason.trim().length > 0;
  return (
    <div className="bio024b-prediction">
      <h4>Önce tahmin et</h4>
      <Menu
        label="Sonuç tahminin"
        value={valid ? value.prediction : ""}
        options={{ "": "Seç", ...options }}
        change={(prediction) => change({ prediction, checked: false })}
      />
      <label htmlFor={id}>Gerekçen (en çok 120 karakter)</label>
      <textarea
        id={id}
        rows={3}
        maxLength={120}
        value={value.reason.slice(0, 120)}
        onChange={(e) =>
          change({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        type="button"
        className="secondary"
        disabled={!validSelection || !valid || !reasonReady}
        onClick={compare}
      >
        Kanıtı karşılaştır
      </button>
      {value.checked && valid && reasonReady && validSelection && (
        <div className="bio024b-feedback" role="status">
          <strong>
            {value.prediction === expected
              ? "Tahminin sonuçla uyumlu."
              : "Tahminini kanıtla yeniden düşün."}
          </strong>
          <p>{proof}</p>
          <p className="small muted">
            Bu kıyas puan ya da “konu bitti” kaydı değildir.
          </p>
        </div>
      )}
    </div>
  );
}
function CultureFigure({ outcome }: { outcome: string }) {
  return (
    <svg
      className="bio024b-svg bio024b-culture"
      viewBox="0 0 300 250"
      role="img"
      aria-label={`Verilen kültür modelinde ${outcome === "root" ? "kök" : outcome === "shoot" ? "sürgün" : "kallus"} yanıtı`}
      data-culture-outcome={outcome}
    >
      <path
        className="bio024b-dish"
        d="M25 125 Q150 170 275 125 V176 Q150 218 25 176Z"
      />
      <ellipse className="bio024b-cell" cx="150" cy="126" rx="125" ry="37" />
      {[
        [126, 115],
        [151, 105],
        [173, 122],
        [139, 137],
        [164, 140],
      ].map(([cx, cy], i) => (
        <circle key={i} className="bio024b-leaf" cx={cx} cy={cy} r="15" />
      ))}
      {outcome === "root" ? (
        <g data-culture-root>
          <path
            className="bio024b-wall"
            d="M146 147 V184 M146 165 L116 181 M146 173 L174 187 M161 147 L188 178"
          />
        </g>
      ) : outcome === "shoot" ? (
        <g data-culture-shoot>
          <path className="bio024b-wall" d="M150 115 V30" />
          <path
            className="bio024b-leaf"
            d="M150 65 Q71 13 77 57 Q105 85 150 65 M150 40 Q217 0 222 39 Q195 65 150 40"
          />
        </g>
      ) : null}
    </svg>
  );
}
function HormoneLab() {
  const [v, write, validTypes] = useBiologyExploration(
    "forge024:biology-b:bitki-hormonlari",
    {
      organ: "root",
      dose: 0,
      auxin: 3,
      cytokinin: 3,
      prediction: "",
      reason: "",
      checked: false,
    },
  );
  const organ = member(
      { root: "", shoot: "" },
      v.organ,
      "root",
    ) as AuxinOrgan024,
    dose = bound(v.dose, 0, 4),
    auxin = bound(v.auxin, 1, 9),
    cytokinin = bound(v.cytokinin, 1, 9),
    m = auxinResponse024(organ, dose),
    c = culture024(auxin, cytokinin),
    selectionValid =
      validTypes("organ", "dose") && v.organ === organ && v.dose === dose,
    set = (p: Partial<typeof v>) =>
      write({
        organ,
        dose,
        auxin,
        cytokinin,
        checked: selectionValid ? v.checked : false,
        ...p,
      }),
    change = (p: Partial<typeof v>) => set({ ...p, checked: false }),
    id = useId(),
    proof = `D${dose} adımında ${organ === "root" ? "kök" : "sürgün"} kontrol göreli yanıtı ${fmt(m.response)}. Sıfır kontrol kadar uzamayı; artı kontrolün üstünü, eksi kontrolün altını gösterir.`;
  return (
    <section className="forge024-biology-b" data-forge024="bitki-hormonlari">
      <h3>Doz yanıtını dokuya göre karşılaştır</h3>
      <p>
        Aynı sıralı doz adımları için verilmiş iki ölçüm serisi var. Önce bir
        dozun etkisini tahmin et; sonra grafikte seçili noktayı ve kontrol
        çizgisini karşılaştır.
      </p>
      <div className="bio024b-controls">
        <Menu
          label="Oksin uygulanan doku"
          value={organ}
          options={{ root: "Kök uzaması", shoot: "Sürgün uzaması" }}
          change={(organ) => change({ organ })}
        />
        <Slider
          label="Oksin doz basamağı"
          value={dose}
          min={0}
          max={4}
          change={(dose) => change({ dose })}
        />
      </div>
      <div data-live-model>
        <figure>
          <svg
            className="bio024b-svg"
            viewBox="0 0 300 280"
            role="img"
            aria-labelledby={id}
            data-auxin-organ={organ}
            data-auxin-dose={dose}
            data-auxin-response={m.response}
          >
            <title
              id={id}
            >{`Verilen ${organ === "root" ? "kök" : "sürgün"} doz–yanıt grafiği; D${dose} yanıtı ${m.response}`}</title>
            {[-60, 0, 60].map((n) => (
              <g key={n}>
                <path
                  className={n === 0 ? "bio024b-wall" : "bio024b-grid"}
                  d={`M60 ${120 - n * 1.5} H280`}
                />
                <text
                  className="bio024b-label"
                  x="48"
                  y={128 - n * 1.5}
                  textAnchor="end"
                >
                  {n}
                </text>
              </g>
            ))}
            <path className="bio024b-line" d="M60 25 V222 H280" />
            <path
              className="bio024b-path-active"
              d={m.points
                .map(
                  (y, i) =>
                    `${i === 0 ? "M" : "L"}${68 + i * 50} ${120 - y * 1.5}`,
                )
                .join(" ")}
            />
            {m.points.map((y, i) => (
              <g key={i}>
                <circle
                  className={
                    i === dose ? "bio024b-selected-node" : "bio024b-node"
                  }
                  cx={68 + i * 50}
                  cy={120 - y * 1.5}
                  r={i === dose ? 9 : 5}
                />
                <text
                  className="bio024b-label"
                  x={68 + i * 50}
                  y="257"
                  textAnchor="middle"
                >
                  D{i}
                </text>
              </g>
            ))}
          </svg>
          <figcaption>
            Yatay eksen sıralı doz basamağı; dikey eksen kontrole göre uzama
            değişimidir. Noktalar verilmiş örnek ölçümler, aradaki çizgiler
            okumayı kolay kılar. Eğri bütün gerçek derişimlere bir reçete
            değildir.
          </figcaption>
        </figure>
        <ul>
          {m.points.map((n, i) => (
            <li key={i}>
              D{i}: {fmt(n)} kontrol göreli birim{i === dose ? " — seçili" : ""}
              .
            </li>
          ))}
        </ul>
      </div>
      <div
        className="bio024b-result"
        data-model-result
        data-auxin-kind={m.kind}
        data-auxin-value={m.response}
      >
        <strong>Seçili yanıt: {fmt(m.response)} kontrol göreli birim.</strong>
        <p>{proof}</p>
        <p>{labCopyB(m.scope)}</p>
      </div>
      <div className="bio024b-divider">
        <h4>Ayrı kültür modelinde oranı değiştir</h4>
        <p>
          Bu örnekte en az iki kat oksin kök, en az iki kat sitokinin sürgün;
          aradaki oran kallus sonucu verir. Gerçek evrensel derişim eşikleri
          değildir.
        </p>
        <div className="bio024b-controls">
          <Slider
            label="Kültürde oksin birimi"
            value={auxin}
            min={1}
            max={9}
            change={(auxin) => set({ auxin })}
          />
          <Slider
            label="Kültürde sitokinin birimi"
            value={cytokinin}
            min={1}
            max={9}
            change={(cytokinin) => set({ cytokinin })}
          />
        </div>
        <CultureFigure outcome={c.outcome} />
        <p>
          <strong>
            Kültür yanıtı:{" "}
            {c.outcome === "root"
              ? "kök"
              : c.outcome === "shoot"
                ? "sürgün"
                : "kallus"}
            .
          </strong>{" "}
          Oksin / sitokinin oranı {fmt(c.ratio)}. {c.scope}
        </p>
      </div>
      <Compare
        value={v}
        options={{
          promotion: "Kontrolün üzerinde uzama",
          inhibition: "Kontrolün altında uzama",
          control: "Kontrol kadar uzama",
        }}
        expected={m.kind}
        proof={proof}
        change={change}
        validSelection={selectionValid}
        compare={() => set({ checked: true, organ, dose })}
      />
    </section>
  );
}
function MovementLab() {
  const [v, write, validTypes] = useBiologyExploration(
    "forge024:biology-b:bitkilerde-hareket",
    {
      light: "left",
      treatment: "intact",
      stage: 0,
      prediction: "",
      reason: "",
      checked: false,
    },
  );
  const light = member(
      { left: "", right: "", dark: "" },
      v.light,
      "left",
    ) as LightSide024,
    treatment = member(
      coleoptileTreatments024,
      v.treatment,
      "intact",
    ) as ColeoptileTreatment024,
    stage = bound(v.stage, 0, 4),
    m = coleoptile024(light, treatment, stage),
    set = (p: Partial<typeof v>) => write({ light, treatment, stage, ...p }),
    change = (p: Partial<typeof v>) => set({ ...p, checked: false }),
    id = useId(),
    tipX =
      150 + (m.bend === "left" ? -1 : m.bend === "right" ? 1 : 0) * stage * 10,
    tipY = 100 - (m.leftGrowth + m.rightGrowth) * 2,
    proof = `Sol kenarın ek uzaması ${m.leftGrowth}, sağın ${m.rightGrowth} şematik birim. ${m.bend === "straight" ? "Bu aşamada düz." : `Daha uzun kenar dış yayda, tepe ${m.bend === "left" ? "sola" : "sağa"} kıvrılır.`}`;
  return (
    <section className="forge024-biology-b" data-forge024="bitkilerde-hareket">
      <h3>Koleoptil: algı ve sinyal yolunu sına</h3>
      <p>
        Uygulama algılayan ucu, taşınabilir sinyalin yolunu veya sağ–sol
        dağılımını değiştirir. Bu verilen sürgün dozunda daha çok oksin etkisi
        daha fazla uzama verir.
      </p>
      <div className="bio024b-controls">
        <Menu
          label="Işığın geldiği yön"
          value={light}
          options={{ left: "Soldan", right: "Sağdan", dark: "Karanlık" }}
          change={(light) => change({ light })}
        />
        <Menu
          label="Koleoptil uygulaması"
          value={treatment}
          options={coleoptileTreatments024}
          change={(treatment) => change({ treatment })}
        />
        <Slider
          label="Büyüme yanıtı adımı"
          value={stage}
          min={0}
          max={4}
          change={(stage) => change({ stage })}
        />
      </div>
      <div data-live-model>
        <figure>
          <svg
            className="bio024b-svg"
            viewBox="0 0 300 320"
            role="img"
            aria-labelledby={id}
            data-coleoptile-bend={m.bend}
            data-coleoptile-pass={String(m.signalPasses)}
            data-coleoptile-left={m.leftGrowth}
            data-coleoptile-right={m.rightGrowth}
          >
            <title
              id={id}
            >{`${coleoptileTreatments024[treatment]}; sol ${m.leftGrowth}, sağ ${m.rightGrowth} uzama; ${m.bend === "left" ? "sola" : m.bend === "right" ? "sağa" : "düz"}`}</title>
            <path className="bio024b-line" d="M18 282 H282" />
            <path
              className="bio024b-leaf"
              d={`M138 280 Q138 190 ${tipX - 12} ${tipY + 10} Q${tipX} ${tipY - 11} ${tipX + 12} ${tipY + 10} Q162 190 162 280Z`}
            />
            <path
              className="bio024b-wall"
              d={`M138 280 Q138 190 ${tipX - 12} ${tipY + 10}`}
            />
            <path
              className="bio024b-right-edge"
              d={`M162 280 Q162 190 ${tipX + 12} ${tipY + 10}`}
            />
            {m.tipPresent ? (
              <ellipse
                className="bio024b-bud"
                cx={tipX}
                cy={tipY + 7}
                rx="10"
                ry="14"
              />
            ) : (
              <path
                className="bio024b-cut"
                d={`M${tipX - 15} ${tipY + 10} H${tipX + 15}`}
              />
            )}{" "}
            {treatment === "opaqueTip" && (
              <rect
                className="bio024b-opaque"
                x={tipX - 19}
                y={tipY - 14}
                width="38"
                height="54"
                rx="10"
              />
            )}
            {treatment === "clearTip" && (
              <rect
                className="bio024b-transparent"
                x={tipX - 19}
                y={tipY - 14}
                width="38"
                height="54"
                rx="10"
              />
            )}
            {treatment === "opaqueBase" && (
              <rect
                className="bio024b-opaque"
                x="126"
                y="215"
                width="48"
                height="53"
              />
            )}
            {(treatment === "gelatin" || treatment === "mica") && (
              <rect
                className={
                  treatment === "gelatin" ? "bio024b-gel" : "bio024b-opaque"
                }
                x={tipX - 25}
                y={tipY + 34}
                width="50"
                height="12"
              />
            )}
            {treatment.startsWith("agar") && (
              <rect
                className="bio024b-agar"
                x={
                  tipX +
                  (treatment === "agarLeft"
                    ? -26
                    : treatment === "agarRight"
                      ? 0
                      : -18)
                }
                y={tipY - 9}
                width={treatment === "agarCenter" ? 36 : 26}
                height="19"
              />
            )}
            {light !== "dark" && (
              <g className="bio024b-light-ray">
                <path
                  d={
                    light === "left"
                      ? `M15 60 L${tipX - 27} ${tipY + 8}`
                      : `M285 60 L${tipX + 27} ${tipY + 8}`
                  }
                />
                <circle cx={light === "left" ? 15 : 285} cy="60" r="10" />
              </g>
            )}
            {m.signalPasses && (
              <g className="bio024b-signal">
                {Array.from({ length: m.leftAuxin }, (_, i) => (
                  <circle
                    key={"l" + i}
                    cx={tipX - 7}
                    cy={tipY + 60 + i * 18}
                    r="4"
                  />
                ))}
                {Array.from({ length: m.rightAuxin }, (_, i) => (
                  <circle
                    key={"r" + i}
                    cx={tipX + 7}
                    cy={tipY + 60 + i * 18}
                    r="4"
                  />
                ))}
              </g>
            )}
          </svg>
          <figcaption>
            Kalın koyu kenar sol, kesikli mor kenar sağ tarafı temsil eder. Dolu
            opak kapak ışığı örter; saydam kapağın sınırı kesiklidir. İnce ara
            blok jelatin veya mika, üst mor parça oksinli agardır. Şekil gerçek
            uzunluk ve zaman ölçeği değildir.
          </figcaption>
        </figure>
      </div>
      <div
        className="bio024b-result"
        data-model-result
        data-bend={m.bend}
        data-signal-pass={String(m.signalPasses)}
      >
        <strong>
          Bu aşamada:{" "}
          {m.bend === "straight"
            ? "düz"
            : m.bend === "left"
              ? "sola kıvrılma"
              : "sağa kıvrılma"}
          .
        </strong>
        <p>{proof}</p>
        <p>
          Uç ışığı algılıyor: {m.perceives ? "evet" : "bu koşulda hayır"}. Alt
          bölüme sinyal yolu: {m.signalPasses ? "açık" : "engelli"}.{" "}
          {labCopyB(m.scope)}
        </p>
      </div>
      <Compare
        value={v}
        options={{
          left: "Sola kıvrılır",
          right: "Sağa kıvrılır",
          straight: "Bu aşamada düz",
        }}
        expected={m.bend}
        proof={proof}
        change={change}
        validSelection={
          validTypes("light", "treatment", "stage") &&
          Object.hasOwn({ left: 1, right: 1, dark: 1 }, v.light) &&
          Object.hasOwn(coleoptileTreatments024, v.treatment) &&
          Number.isInteger(v.stage) &&
          v.stage >= 0 &&
          v.stage <= 4
        }
        compare={() => set({ checked: true, light, treatment, stage })}
      />
    </section>
  );
}
const pulses = {
  none: "Gece darbesi yok",
  R: "Ortada kırmızı",
  FR: "Ortada uzak kırmızı",
  "R-FR": "Kırmızı → hemen uzak kırmızı",
  "FR-R": "Uzak kırmızı → hemen kırmızı",
};
function PhotoLab() {
  const [v, write, validTypes] = useBiologyExploration(
    "forge024:biology-b:bitki-fotoperiyodizm",
    {
      kind: "short",
      day: 8,
      critical: 10,
      pulse: "none",
      mature: true,
      prediction: "",
      reason: "",
      checked: false,
    },
  );
  const kind = member(
      { short: "", long: "", neutral: "" },
      v.kind,
      "short",
    ) as PhotoKind024,
    pulse = member(pulses, v.pulse, "none") as NightPulse024,
    day = bound(v.day, 4, 20),
    critical = bound(v.critical, 4, 16),
    m = nightResponse024(kind, day, critical, pulse, v.mature),
    set = (p: Partial<typeof v>) => write({ kind, pulse, day, critical, ...p }),
    change = (p: Partial<typeof v>) => set({ ...p, checked: false }),
    id = useId(),
    dayWidth = (260 * day) / 24,
    pulseX = 20 + (260 * (day + m.night / 2)) / 24,
    verdict =
      m.induced === null
        ? "Eşitlik sınırında karar yok"
        : m.induced
          ? "Verilen modelde uyarım var"
          : "Verilen modelde uyarım yok",
    proof = `Gündüz ${day}, toplam gece ${m.night}, en uzun etkin karanlık ${fmt(m.longestDark)} saat. Kritik gece ${critical} saat. ${!v.mature ? "Gerekli olgunluk kapısı kapalı." : kind === "neutral" ? "Bu verilen nötr gün örneğinde süre eşiği gerekmez." : m.boundary ? "Eşitliğe ait biyolojik yanıt verilmemiş." : kind === "short" ? "Kısa gün örneği kritik değerden uzun etkin karanlık ister." : "Uzun gün örneği kritik değerden kısa etkin karanlık ister."}`;
  return (
    <section
      className="forge024-biology-b"
      data-forge024="bitki-fotoperiyodizm"
    >
      <h3>Gecenin kesintisiz bölümünü karşılaştır</h3>
      <p>
        Diğer çevresel koşullar bu örnekte uygun. Tek darbe gecenin tam
        ortasında; ardışık iki darbe hemen peş peşe. Son kırmızı kesintiyi etkin
        kılar; son uzak kırmızı bu verilen örnekte kırmızının etkisini geri
        alır.
      </p>
      <div className="bio024b-controls">
        <Menu
          label="Fotoperiyot örneği"
          value={kind}
          options={{
            short: "Kısa gün: uzun gece koşulu",
            long: "Uzun gün: kısa gece koşulu",
            neutral: "Nötr gün örneği",
          }}
          change={(kind) => change({ kind })}
        />
        <Slider
          label="Gündüz süresi (saat)"
          value={day}
          min={4}
          max={20}
          change={(day) => change({ day })}
        />
        <Slider
          label="Kritik gece (saat)"
          value={critical}
          min={4}
          max={16}
          change={(critical) => change({ critical })}
        />
        <Menu
          label="Gece ortası ışık uygulaması"
          value={pulse}
          options={pulses}
          change={(pulse) => change({ pulse })}
        />
      </div>
      <Check
        label="Bitki üreme için olgun"
        value={v.mature}
        change={(mature) => change({ mature })}
      />
      <div data-live-model>
        <figure>
          <svg
            className="bio024b-svg"
            viewBox="0 0 300 260"
            role="img"
            aria-labelledby={id}
            data-night-interrupted={String(m.interrupted)}
            data-longest-dark={m.longestDark}
          >
            <title
              id={id}
            >{`${day} saat gündüz, ${m.night} saat gece; etkin en uzun karanlık ${m.longestDark} saat`}</title>
            <rect
              className="bio024b-day"
              x="20"
              y="35"
              width={dayWidth}
              height="47"
            />
            <rect
              className="bio024b-night"
              x={20 + dayWidth}
              y="35"
              width={260 - dayWidth}
              height="47"
            />
            {pulse !== "none" && (
              <>
                <path
                  className={
                    m.interrupted
                      ? "bio024b-pulse-effective"
                      : "bio024b-pulse-reversed"
                  }
                  d={`M${pulseX} 17 V100`}
                />
                <circle
                  className={
                    m.interrupted ? "bio024b-selected-node" : "bio024b-node"
                  }
                  cx={pulseX}
                  cy="17"
                  r="7"
                />
              </>
            )}
            <path className="bio024b-line" d="M20 101 V112 M280 101 V112" />
            <text className="bio024b-label" x="20" y="142">
              0
            </text>
            <text className="bio024b-label" x="280" y="142" textAnchor="end">
              24
            </text>
            <circle className="bio024b-receptor" cx="67" cy="210" r="34" />
            <circle
              className={
                m.finalState === "Pfr-rich"
                  ? "bio024b-selected-node"
                  : "bio024b-receptor"
              }
              cx="233"
              cy="210"
              r="34"
            />
            <text className="bio024b-label" x="67" y="218" textAnchor="middle">
              Pr
            </text>
            <text className="bio024b-label" x="233" y="218" textAnchor="middle">
              Pfr
            </text>
            {m.finalState !== "not-set" && (
              <path
                className="bio024b-path-active"
                d={
                  m.finalState === "Pr-rich"
                    ? "M192 200 H108 l12 -8 m-12 8 l12 8"
                    : "M108 200 H192 l-12 -8 m12 8 l-12 8"
                }
              />
            )}
          </svg>
          <figcaption>
            Üst şerit 24 saatlik döngü: açık bölüm gündüz, taralı koyu bölüm
            gece. Orta darbe dik çizgiyle gösterilir; etkisi ve süreler aşağıda
            yazılıdır. Alt Pr/Pfr şeması son darbe yönünü gösterir; darbe yoksa
            başlangıç oranı ölçülmüş değildir.
          </figcaption>
        </figure>
      </div>
      <div
        className="bio024b-result"
        data-model-result
        data-photo-induced={m.induced === null ? "boundary" : String(m.induced)}
        data-photo-dark={m.longestDark}
      >
        <strong>{verdict}.</strong>
        <p>{proof}</p>
        <p>
          Kesinti:{" "}
          {m.interrupted ? "etkili" : "bu örnekte etkili kırmızı kesintisi yok"}
          . {labCopyB(m.scope)}
        </p>
      </div>
      <Compare
        value={v}
        options={{
          yes: "Uyarım var",
          no: "Uyarım yok",
          boundary: "Eşitlik sınırında karar yok",
        }}
        expected={m.induced === null ? "boundary" : m.induced ? "yes" : "no"}
        proof={proof}
        change={change}
        validSelection={
          validTypes("kind", "pulse", "day", "critical", "mature") &&
          Object.hasOwn({ short: 1, long: 1, neutral: 1 }, v.kind) &&
          Object.hasOwn(pulses, v.pulse) &&
          Number.isInteger(v.day) &&
          v.day >= 4 &&
          v.day <= 20 &&
          Number.isInteger(v.critical) &&
          v.critical >= 4 &&
          v.critical <= 16
        }
        compare={() => set({ checked: true, kind, pulse, day, critical })}
      />
    </section>
  );
}
function FlowerParts({
  sepal,
  petal,
  stamen,
  pistil,
}: {
  sepal: boolean;
  petal: boolean;
  stamen: boolean;
  pistil: boolean;
}) {
  return (
    <svg
      className="bio024b-svg"
      viewBox="0 0 300 330"
      role="img"
      aria-label={`Çiçek şeması; çanak ${sepal ? "var" : "yok"}, taç ${petal ? "var" : "yok"}, erkek ${stamen ? "var" : "yok"}, dişi ${pistil ? "var" : "yok"}`}
      data-flower-diagram
    >
      <path className="bio024b-wall" d="M150 280 V325" />
      <ellipse className="bio024b-cell" cx="150" cy="273" rx="45" ry="12" />
      {petal && (
        <g data-flower-part="petal">
          <path
            className="bio024b-petal"
            d="M141 260 Q4 177 25 93 Q114 91 141 260 M159 260 Q296 177 275 93 Q186 91 159 260 M150 258 Q89 110 150 24 Q211 110 150 258"
          />
        </g>
      )}
      {sepal && (
        <g data-flower-part="sepal">
          <path
            className="bio024b-leaf"
            d="M150 274 Q69 280 38 220 Q104 218 150 274 M150 274 Q231 280 262 220 Q196 218 150 274"
          />
        </g>
      )}
      {stamen && (
        <g data-flower-part="stamen">
          <path
            className="bio024b-wall"
            d="M138 265 L91 126 M162 265 L209 126"
          />
          <ellipse
            className="bio024b-anther"
            cx="91"
            cy="119"
            rx="15"
            ry="24"
          />
          <ellipse
            className="bio024b-anther"
            cx="209"
            cy="119"
            rx="15"
            ry="24"
          />
        </g>
      )}
      {pistil && (
        <g data-flower-part="pistil">
          <ellipse className="bio024b-leaf" cx="150" cy="239" rx="26" ry="33" />
          <path className="bio024b-wall" d="M150 213 V86" />
          <ellipse className="bio024b-bud" cx="150" cy="82" rx="24" ry="10" />
          {[230, 247].map((y) => (
            <ellipse
              key={y}
              className="bio024b-ovule"
              cx="150"
              cy={y}
              rx="9"
              ry="6"
            />
          ))}
        </g>
      )}
    </svg>
  );
}
function ReproFigure({
  lineage,
  stage,
  diploid,
}: {
  lineage: ReproductiveLineage024;
  stage: number;
  diploid: number;
}) {
  const m = reproductivePath024(lineage, stage, diploid);
  const centers =
    m.products === 4
      ? [
          [73, 75],
          [227, 75],
          [73, 225],
          [227, 225],
        ]
      : [[150, 150]];
  return (
    <svg
      className="bio024b-svg"
      viewBox="0 0 300 300"
      role="img"
      aria-label={`${m.label}; ürün ${m.products}, ürün başına hücre ${m.cellsPerProduct}, çekirdek ${m.nucleiPerProduct}`}
      data-repro-products={m.products}
      data-repro-cells={m.cellsPerProduct}
      data-repro-nuclei={m.nucleiPerProduct}
    >
      {lineage === "female" && stage === 6 ? (
        <>
          <ellipse
            className="bio024b-cell"
            cx="150"
            cy="150"
            rx="87"
            ry="128"
          />
          {[
            [125, 71],
            [150, 61],
            [175, 71],
            [124, 226],
            [150, 239],
            [176, 226],
          ].map(([cx, cy], i) => (
            <g key={i} data-repro-cell={i}>
              <ellipse
                className={i < 3 ? "bio024b-cell" : "bio024b-leaf"}
                cx={cx}
                cy={cy}
                rx="12"
                ry="18"
              />
              <circle className="bio024b-nucleus" cx={cx} cy={cy} r="4" />
            </g>
          ))}
          <g data-repro-cell="central">
            <ellipse
              className="bio024b-cell"
              cx="150"
              cy="148"
              rx="45"
              ry="52"
            />
            <circle className="bio024b-nucleus" cx="135" cy="148" r="5" />
            <circle className="bio024b-nucleus" cx="165" cy="148" r="5" />
          </g>
          <path className="bio024b-line" d="M137 279 V291 M163 279 V291" />
        </>
      ) : (
        centers.map(([cx, cy], i) => {
          const radius = m.products === 4 ? 48 : 100;
          return (
            <g key={i} data-repro-product={i}>
              <circle
                className="bio024b-cell"
                data-repro-cell="outer"
                cx={cx}
                cy={cy}
                r={radius}
              />
              {lineage === "male" && stage >= 2 ? (
                <>
                  <circle
                    className="bio024b-nucleus"
                    cx={cx - 13}
                    cy={cy - 16}
                    r="5"
                  />
                  {(stage === 2 ? [0] : [-1, 1]).map((s, k) => (
                    <g key={k} data-repro-cell={`generative-${k}`}>
                      <circle
                        className="bio024b-leaf"
                        cx={cx + s * 17}
                        cy={cy + 13}
                        r="12"
                      />
                      <circle
                        className="bio024b-nucleus"
                        cx={cx + s * 17}
                        cy={cy + 13}
                        r="4"
                      />
                    </g>
                  ))}
                </>
              ) : (
                Array.from({ length: m.nucleiPerProduct }, (_, n) => {
                  const angle = (n * Math.PI * 2) / m.nucleiPerProduct,
                    x =
                      m.nucleiPerProduct === 1 ? cx : cx + Math.cos(angle) * 43,
                    y =
                      m.nucleiPerProduct === 1 ? cy : cy + Math.sin(angle) * 43;
                  return (
                    <circle
                      key={n}
                      className="bio024b-nucleus"
                      cx={x}
                      cy={y}
                      r="7"
                    />
                  );
                })
              )}
            </g>
          );
        })
      )}
    </svg>
  );
}
function FlowerLab() {
  const [v, write, validTypes] = useBiologyExploration(
    "forge024:biology-b:cicek-yapisi-ureme",
    {
      sepal: true,
      petal: true,
      stamen: true,
      pistil: true,
      lineage: "male",
      stage: 0,
      diploid: 20,
      prediction: "",
      reason: "",
      checked: false,
    },
  );
  const lineage = member(
      { male: "", female: "" },
      v.lineage,
      "male",
    ) as ReproductiveLineage024,
    stage = bound(v.stage, 0, lineage === "male" ? 3 : 6),
    diploid = 2 * bound(v.diploid / 2, 1, 20),
    m = flowerInventory024(v.sepal, v.petal, v.stamen, v.pistil),
    r = reproductivePath024(lineage, stage, diploid),
    selectionValid = validTypes("sepal", "petal", "stamen", "pistil"),
    set = (p: Partial<typeof v>) =>
      write({
        lineage,
        stage,
        diploid,
        checked: selectionValid ? v.checked : false,
        ...p,
      }),
    change = (p: Partial<typeof v>) => set({ ...p, checked: false }),
    proof = `Dört takımın ${m.presentCount} tanesi var; ${m.complete ? "tam" : "eksik"}. Üreme organları için ${m.sex === "bisexual" ? "iki eşeyli" : m.sex === "male" ? "yalnız erkek" : m.sex === "female" ? "yalnız dişi" : "işlevsel erkek ve dişi organ çizimi yok"}.`;
  return (
    <section className="forge024-biology-b" data-forge024="cicek-yapisi-ureme">
      <h3>Çiçek organlarını ve gelişim yolunu ayrı izle</h3>
      <p>
        İlk model dört organ takımının varlığını değiştirir. İkinci model uygun
        başka bir çiçekte tipik hücre gelişimidir; organ kapatmak mayozun
        kromozom hesabını değiştirmez.
      </p>
      <div className="bio024b-checks">
        <Check
          label="Çanak yaprak takımı var"
          value={v.sepal}
          change={(sepal) => change({ sepal })}
        />
        <Check
          label="Taç yaprak takımı var"
          value={v.petal}
          change={(petal) => change({ petal })}
        />
        <Check
          label="Erkek organ var"
          value={v.stamen}
          change={(stamen) => change({ stamen })}
        />
        <Check
          label="Dişi organ var"
          value={v.pistil}
          change={(pistil) => change({ pistil })}
        />
      </div>
      <div data-live-model>
        <figure>
          <FlowerParts
            sepal={v.sepal}
            petal={v.petal}
            stamen={v.stamen}
            pistil={v.pistil}
          />
          <figcaption>
            Alttaki sap ve tabla; dış yandaki yeşil çanak; geniş renkli taç; iki
            yandaki sapçık–başçık ve ortadaki tepecik–boru–yumurtalık seçili
            organları gösterir. Tamlık ve eşeylilik aşağıda ayrı yazılıdır.
            Çizim ölçek dışıdır.
          </figcaption>
        </figure>
      </div>
      <div
        className="bio024b-result"
        data-model-result
        data-flower-complete={String(m.complete)}
        data-flower-sex={m.sex}
      >
        <strong>{proof}</strong>
        <p>{labCopyB(m.scope)}</p>
      </div>
      <div className="bio024b-divider">
        <h4>Hücre kökenini ve çekirdek sayısını izle</h4>
        <div className="bio024b-controls">
          <Menu
            label="Üreme hücresi gelişim yolu"
            value={lineage}
            options={{
              male: "Mikrospor → polen → sperm",
              female: "Megaspor → tipik embriyo kesesi",
            }}
            change={(lineage) => set({ lineage, stage: 0 })}
          />
          <Slider
            label="Gelişim basamağı"
            value={stage}
            min={0}
            max={lineage === "male" ? 3 : 6}
            change={(stage) => set({ stage })}
          />
          <Menu
            label="Ana hücrede 2n kromozom sayısı"
            value={String(diploid)}
            options={Object.fromEntries(
              Array.from({ length: 20 }, (_, i) => 2 * (i + 1)).map((n) => [
                String(n),
                String(n),
              ]),
            )}
            change={(diploid) => set({ diploid: Number(diploid) })}
          />
        </div>
        <figure>
          <ReproFigure lineage={lineage} stage={stage} diploid={diploid} />
          <figcaption>
            {labCopyB(r.label)}. Dış sınırlar hücre veya ürün grubunu, iç koyu
            noktalar çekirdeği gösterir. Tipik kesede merkezdeki tek geniş hücre
            iki çekirdek taşır; alttaki küçük aralık mikropil yönünü belirtir.
          </figcaption>
        </figure>
        <dl className="bio024b-facts" data-repro-result>
          <div>
            <dt>Gelişen ürün sayısı</dt>
            <dd>{r.products}</dd>
          </div>
          <div>
            <dt>Ürün başına hücre / çekirdek</dt>
            <dd>
              {r.cellsPerProduct} / {r.nucleiPerProduct}
            </dd>
          </div>
          <div>
            <dt>Her gösterilen çekirdekte takım ve kromozom</dt>
            <dd>
              {r.ploidy}; {r.chromosomesPerNucleus} kromozom.
            </dd>
          </div>
        </dl>
        <p>{labCopyB(r.scope)}</p>
        <ol className="bio024b-route">
          {r.stages.map((s, i) => (
            <li key={s} data-reached={String(i <= stage)}>
              {labCopyB(s)}
              {i === stage ? " — seçili basamak" : ""}
            </li>
          ))}
        </ol>
      </div>
      <Compare
        value={v}
        options={{ complete: "Tam çiçek", incomplete: "Eksik çiçek" }}
        expected={m.complete ? "complete" : "incomplete"}
        proof={proof}
        change={change}
        validSelection={selectionValid}
        compare={() => set({ checked: true })}
      />
    </section>
  );
}
const origins = {
  sameFlower: "Aynı çiçek",
  samePlant: "Aynı bireyin başka çiçeği",
  otherPlant: "Aynı türden başka birey",
  otherSpecies: "Farklı türden birey",
};
function SimpleFlower({
  x,
  y,
  foreign = false,
}: {
  x: number;
  y: number;
  foreign?: boolean;
}) {
  return (
    <g>
      <path
        className={foreign ? "bio024b-foreign-petal" : "bio024b-petal"}
        d={`M${x} ${y} Q${x - 40} ${y - 45} ${x - 28} ${y + 5} Q${x} ${y + 24} ${x + 28} ${y + 5} Q${x + 40} ${y - 45} ${x} ${y}`}
      />
      <path className="bio024b-wall" d={`M${x} ${y + 25} V${y - 14}`} />
      <ellipse className="bio024b-bud" cx={x} cy={y - 16} rx="8" ry="5" />
      <ellipse
        className="bio024b-anther"
        cx={x - 20}
        cy={y - 6}
        rx="5"
        ry="9"
      />
    </g>
  );
}
function PollenLab() {
  const [v, write, validTypes] = useBiologyExploration(
    "forge024:biology-b:bitki-tozlasma",
    {
      origin: "sameFlower",
      deposited: true,
      compatible: true,
      viable: true,
      receptive: true,
      step: 0,
      prediction: "",
      reason: "",
      checked: false,
    },
  );
  const origin = member(origins, v.origin, "sameFlower"),
    step = bound(v.step, 0, 3),
    m = pollenTransfer024(
      origin,
      v.deposited,
      v.compatible,
      v.viable,
      v.receptive,
      step,
    ),
    set = (p: Partial<typeof v>) => write({ origin, step, ...p }),
    change = (p: Partial<typeof v>) => set({ ...p, checked: false }),
    id = useId(),
    target: [number, number] =
      origin === "sameFlower"
        ? [75, 64]
        : origin === "samePlant"
          ? [122, 174]
          : [230, 64],
    start: [number, number] = [55, 74],
    control: [number, number] = origin === "sameFlower" ? [25, 10] : [160, 16],
    t = m.reached === 0 ? 0 : m.reached === 1 ? 0.5 : 1,
    tracer = [
      (1 - t) ** 2 * start[0] +
        2 * (1 - t) * t * control[0] +
        t * t * target[0],
      (1 - t) ** 2 * start[1] +
        2 * (1 - t) * t * control[1] +
        t * t * target[1],
    ],
    category =
      m.category === "same-flower-self"
        ? "Aynı çiçek içinde kendine"
        : m.category === "same-plant-self"
          ? "Aynı birey içinde kendine"
          : m.category === "cross"
            ? "Aynı türün bireyleri arasında çapraz"
            : "Farklı tür girdisi",
    state = m.tubeStarted
      ? "tube"
      : m.arrived
        ? "arrived"
        : m.reached === 1
          ? "travel"
          : "source",
    proof = `${category}. ${m.tubeStarted ? "Uygun kapılarla polen tüpü başlangıcı gösterildi; döllenme sonucu üretilmez." : m.arrived ? "Polen tepeciğe vardı. " + (m.eligible ? "Seçili adımda tüp çizimi henüz yok." : m.blockers.join("; ") + ".") : m.reached === 1 ? "Polen taşıma yolunda; bu durumda varış çizimi yok." : "Polen ilk anda başçıkta."}`;
  return (
    <section className="forge024-biology-b" data-forge024="bitki-tozlasma">
      <h3>Polenin kaynağını ve kabul kapılarını ayır</h3>
      <p>
        Başlangıç poleni A bireyinin ilk çiçeğinde. Hedef aynı çiçek, aynı
        bitkide ikinci çiçek veya ikinci bireydir. Fiziksel varış ile tüp
        başlangıcını farklı adımlarda izle.
      </p>
      <div className="bio024b-controls">
        <Menu
          label="Polenin gittiği kaynak–hedef ilişkisi"
          value={origin}
          options={origins}
          change={(origin) => change({ origin })}
        />
        <Slider
          label="Polen yolunun adımı"
          value={step}
          min={0}
          max={3}
          change={(step) => change({ step })}
        />
      </div>
      <div className="bio024b-checks">
        <Check
          label="Polen tepeciğe varabilir"
          value={v.deposited}
          change={(deposited) => change({ deposited })}
        />
        <Check
          label="Genetik uyum uygun"
          value={v.compatible}
          change={(compatible) => change({ compatible })}
        />
        <Check
          label="Polen canlı"
          value={v.viable}
          change={(viable) => change({ viable })}
        />
        <Check
          label="Tepecik alıcı evrede"
          value={v.receptive}
          change={(receptive) => change({ receptive })}
        />
      </div>
      <div data-live-model>
        <figure>
          <svg
            className="bio024b-svg"
            viewBox="0 0 300 355"
            role="img"
            aria-labelledby={id}
            data-pollen-origin={origin}
            data-pollen-reached={m.reached}
            data-pollen-arrived={String(m.arrived)}
            data-pollen-tube={String(m.tubeStarted)}
          >
            <title id={id}>{`${origins[origin]}; ${proof}`}</title>
            <path className="bio024b-line" d="M12 319 H288" />
            <path
              className="bio024b-wall"
              d="M75 319 V105 M75 252 L122 204 M230 319 V105"
            />
            <SimpleFlower x={75} y={80} />
            <SimpleFlower x={122} y={190} />
            <SimpleFlower x={230} y={80} foreign={origin === "otherSpecies"} />
            <text className="bio024b-label" x="75" y="349" textAnchor="middle">
              A
            </text>
            <text className="bio024b-label" x="230" y="349" textAnchor="middle">
              B
            </text>
            <path
              className={
                m.reached >= 2 ? "bio024b-path-active" : "bio024b-path-pending"
              }
              d={`M${start[0]} ${start[1]} Q${control[0]} ${control[1]} ${target[0]} ${target[1]}`}
            />
            {m.tubeStarted && (
              <path
                className="bio024b-tube"
                d={`M${target[0]} ${target[1]} V${target[1] + 36}`}
              />
            )}
            <circle
              className="bio024b-selected-node"
              cx={tracer[0]}
              cy={tracer[1]}
              r="7"
            />
            {m.arrived && !m.eligible && (
              <path
                className="bio024b-stop"
                d={`M${target[0] - 10} ${target[1] + 12} l20 16 m0 -16 l-20 16`}
              />
            )}
          </svg>
          <figcaption>
            A ve B ayrı bitki bireyleridir. A’nın iki çiçeği aynı gövdede
            bağlıdır. Kalın yol tepeciğe ulaşmayı; kesikli yol henüz bitmemiş
            taşımayı; tepecikten aşağı kısa çizgi yalnız tüp başlangıcını
            gösterir. Farklı tür B çiçeğinin sınırı kesiklidir.
          </figcaption>
        </figure>
      </div>
      <div
        className="bio024b-result"
        data-model-result
        data-pollen-state={state}
        data-pollen-category={m.category}
      >
        <strong>{proof}</strong>
        <p>{labCopyB(m.scope)}</p>
      </div>
      <Compare
        value={v}
        options={{
          source: "Başçıkta başlangıç",
          travel: "Taşıma yolunda",
          arrived: "Tepecikte; tüp henüz başlamadı",
          tube: "Tepecikte; tüp başlangıcı var",
        }}
        expected={state}
        proof={proof}
        change={change}
        validSelection={
          validTypes(
            "origin",
            "step",
            "deposited",
            "compatible",
            "viable",
            "receptive",
          ) &&
          Object.hasOwn(origins, v.origin) &&
          Number.isInteger(v.step) &&
          v.step >= 0 &&
          v.step <= 3
        }
        compare={() => set({ checked: true, origin, step })}
      />
    </section>
  );
}
export default function Forge024BiologyBLab({
  lessonId,
}: {
  lessonId: string;
}) {
  return lessonId === "bitki-hormonlari" ? (
    <HormoneLab />
  ) : lessonId === "bitkilerde-hareket" ? (
    <MovementLab />
  ) : lessonId === "bitki-fotoperiyodizm" ? (
    <PhotoLab />
  ) : lessonId === "cicek-yapisi-ureme" ? (
    <FlowerLab />
  ) : lessonId === "bitki-tozlasma" ? (
    <PollenLab />
  ) : null;
}
