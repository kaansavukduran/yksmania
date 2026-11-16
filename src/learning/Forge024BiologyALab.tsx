import { useId } from "react";
import { useApp } from "../store";
import {
  stemSection024,
  leafJourney024,
  plantFlow024,
  guardCycle024,
  symbiosis024,
  type StemKind024,
  type LeafRoute024,
  type FlowMode024,
  type GuardSignal024,
  type RootPartner024,
  type Exchange024,
} from "./forge024BiologyA";
import { useExploration } from "./useExploration";
import "./forge024BiologyA.css";
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
const labCopyA = (text: string) =>
  [
    [
      "İzlenen yol sünger bölgesindeki hava boşluklarından palizat hücresine uzanan bir örnektir;",
      "İzlenen yol sünger mezofil hücreleri arası hava boşluğu içinden palizat hücresine uzanır;",
    ],
    ["kullanılabilir azot", "alıma uygun azot"],
    [
      "Verilen gündüz etkin türün karanlıkta kapanma örneğidir; CAM türlerine genellenmez.",
      "Bu gündüz etkin tür karanlıkta kapanır. CAM türleri için aynı sonuç zorunlu değildir.",
    ],
    ["mevsiminde", "mevsimi için"],
    ["Kütikuladan", "Kütikula yoluyla"],
    ["parametresidir", "değeridir"],
  ].reduce((value, [before, after]) => value.replaceAll(before, after), text);
const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 }).format(n);
const bounded = (n: number, a: number, b: number) =>
  Number.isFinite(n) ? Math.max(a, Math.min(b, Math.round(n))) : a;
const keyOf = <T extends Record<string, string>>(
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
  change: (v: string) => void;
}) {
  const id = useId();
  return (
    <div className="bio024a-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => change(e.target.value)}>
        {Object.entries(options).map(([v, t]) => (
          <option value={v} key={v}>
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
  divide = 1,
  unit = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  change: (v: number) => void;
  divide?: number;
  unit?: string;
}) {
  const id = useId();
  return (
    <div className="bio024a-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>
        {fmt(value / divide)}
        {unit ? ` ${unit}` : ""}
      </output>
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
    valid = Object.hasOwn(options, value.prediction);
  return (
    <div className="bio024a-prediction">
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
        disabled={!validSelection || !valid || value.reason.trim().length === 0}
        onClick={compare}
      >
        Kanıtı karşılaştır
      </button>
      {value.checked &&
        valid &&
        value.reason.trim().length > 0 &&
        validSelection && (
          <div className="bio024a-feedback" role="status">
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
const tissues = {
  xylem: "Ksilem: merkeze yakın",
  cambium: "Vasküler kambiyum",
  phloem: "Floem: dışa yakın",
};
function StemLab() {
  const [v, write, validTypes] = useBiologyExploration(
    "forge024:biology-a:ayt-govde-yapisi",
    {
      kind: "dicot",
      seasons: 0,
      tissue: "xylem",
      node: 2,
      prediction: "",
      reason: "",
      checked: false,
    },
  );
  const kind = keyOf(
      { monocot: "", dicot: "" },
      v.kind,
      "dicot",
    ) as StemKind024,
    seasons = bounded(v.seasons, 0, 5),
    tissue = keyOf(tissues, v.tissue, "xylem"),
    node = bounded(v.node, 1, 4),
    m = stemSection024(kind, seasons);
  const set = (p: Partial<typeof v>) =>
    write({ kind, seasons, tissue, node, ...p });
  const change = (p: Partial<typeof v>) => set({ ...p, checked: false });
  const id = useId(),
    proof =
      kind === "dicot"
        ? `Tipik çift çenekli modelde kambiyum içe sekonder ksilem, dışa sekonder floem ekler. Verilen ${seasons} büyüme mevsimi için ${m.secondaryRings.length} halka çizilmiştir.`
        : "Tipik tek çenekli kesitte demetler dağınıktır; gösterilen olağan vasküler kambiyum ile halka eklenmesi temsil edilmez. Bazı tek çenekliler başka yollarla da kalınlık artışı gösterebilir.";
  return (
    <section className="forge024-biology-a" data-forge024="ayt-govde-yapisi">
      <h3>Gövdeyi kesitte ve sürgünde izle</h3>
      <p>
        Tipik anatomileri karşılaştır; bir dokuyu seçip yerini gör. Yalnız çift
        çenekli modelde her verilen büyüme mevsimi için bir halka oluştuğu kabul
        edilir.
      </p>
      <div className="bio024a-controls">
        <Menu
          label="Tipik gövde düzeni"
          value={kind}
          options={{ dicot: "Çift çenekli", monocot: "Tek çenekli" }}
          change={(kind) => change({ kind })}
        />
        <Menu
          label="Kesitte vurgulanan doku"
          value={tissue}
          options={tissues}
          change={(tissue) => change({ tissue })}
        />
        <Slider
          label="Verilen büyüme mevsimi"
          value={seasons}
          min={0}
          max={5}
          change={(seasons) => change({ seasons })}
        />
      </div>
      <div data-live-model>
        <figure>
          <svg
            className="bio024a-svg"
            viewBox="0 0 360 360"
            role="img"
            aria-labelledby={id}
            data-stem-kind={kind}
            data-stem-rings={m.secondaryRings.length}
            data-stem-tissue={tissue}
          >
            <title
              id={id}
            >{`${kind === "dicot" ? "Tipik çift çenekli" : "Tipik tek çenekli"} gövde enine kesiti; seçili ${tissues[tissue]}`}</title>
            <circle
              className="bio024a-cell"
              cx="180"
              cy="180"
              r={m.outerRadius}
            />
            {kind === "dicot" && seasons > 0 ? (
              <>
                <circle
                  className="bio024a-xylem"
                  cx="180"
                  cy="180"
                  r={m.cambiumRadius! - 3}
                />
                <circle className="bio024a-cell" cx="180" cy="180" r="50" />
                {m.secondaryRings.map((r) => (
                  <circle
                    key={r.season}
                    data-growth-ring={r.season}
                    className="bio024a-ring"
                    cx="180"
                    cy="180"
                    r={r.radius}
                  />
                ))}
                <circle
                  className={
                    tissue === "cambium"
                      ? "bio024a-selected-line"
                      : "bio024a-cambium"
                  }
                  cx="180"
                  cy="180"
                  r={m.cambiumRadius!}
                />
                <circle
                  className={
                    tissue === "phloem"
                      ? "bio024a-selected-line"
                      : "bio024a-phloem-line"
                  }
                  cx="180"
                  cy="180"
                  r={m.phloemRadius!}
                />
                {tissue === "xylem" && (
                  <circle
                    className="bio024a-selected-line"
                    cx="180"
                    cy="180"
                    r="65"
                  />
                )}
              </>
            ) : (
              m.bundles.map((b) => (
                <g
                  key={b.id}
                  transform={`translate(${b.x} ${b.y}) rotate(${(b.angle * 180) / Math.PI})`}
                >
                  <rect
                    className={
                      tissue === "xylem"
                        ? "bio024a-xylem bio024a-selected"
                        : "bio024a-xylem"
                    }
                    x="-10"
                    y="-9"
                    width="10"
                    height="18"
                    rx="3"
                  />
                  {kind === "dicot" && (
                    <path
                      className={
                        tissue === "cambium"
                          ? "bio024a-selected-line"
                          : "bio024a-cambium"
                      }
                      d="M2 -10 V10"
                    />
                  )}
                  <rect
                    className={
                      tissue === "phloem"
                        ? "bio024a-phloem bio024a-selected"
                        : "bio024a-phloem"
                    }
                    x="5"
                    y="-9"
                    width="9"
                    height="18"
                    rx="3"
                  />
                </g>
              ))
            )}
          </svg>
          <figcaption>
            Mavi dolu bölge ksilem; kesikli mor bölge floem; kalın ara çizgi
            uygun modelde kambiyumu gösterir. Vurgu kesikli koyu sınırla da
            gösterilir. Doku adı ve konum aşağıda yazılıdır; renk tek kanıt
            değildir.
          </figcaption>
        </figure>
        <p>
          <strong>Seçili doku: {tissues[tissue]}.</strong>{" "}
          {tissue === "cambium" && kind === "monocot"
            ? "Bu tipik monokot modelde olağan vasküler kambiyum çizilmez."
            : tissue === "xylem"
              ? "Demetin merkeze bakan tarafını izle; sekonder modelde odun içte birikir."
              : tissue === "phloem"
                ? "Demetin dışa bakan tarafını izle; kambiyum varsa onun dışındadır."
                : "Bu meristem iki iletim dokusu arasında yer alır."}
        </p>
        <div className="bio024a-divider">
          <h4>Düğüm ve koltuk tomurcuğu</h4>
          <Slider
            label="Sürgünde seçili düğüm"
            value={node}
            min={1}
            max={4}
            change={(node) => change({ node })}
          />
          <svg
            className="bio024a-svg bio024a-shoot"
            viewBox="0 0 260 310"
            role="img"
            aria-label={`Dört düğümlü özgün sürgün şeması; seçili düğüm ${node}`}
          >
            <path className="bio024a-wall" d="M130 285 V30" />
            {[1, 2, 3, 4].map((n) => {
              const y = 270 - n * 48;
              return (
                <g
                  key={n}
                  data-shoot-node={n}
                  data-selected={String(n === node)}
                >
                  <path
                    className="bio024a-leaf"
                    d={`M130 ${y} Q36 ${y - 50} 42 ${y + 1} Q70 ${y + 17} 130 ${y}`}
                  />
                  <circle
                    className={
                      n === node ? "bio024a-node-selected" : "bio024a-bud"
                    }
                    cx="143"
                    cy={y - 10}
                    r="8"
                  />
                  <path
                    className={
                      n === node ? "bio024a-selected-line" : "bio024a-line"
                    }
                    d={`M113 ${y} H151`}
                  />
                </g>
              );
            })}
            <path
              className="bio024a-leaf"
              d="M130 31 Q109 14 130 4 Q151 14 130 31Z"
            />
          </svg>
          <p>
            Seçili {node}. düğümde yaprak bağlantısı ve koltuk tomurcuğu
            birlikte işaretlidir. Dört ardışık düğüm arasında üç tam düğüm arası
            vardır. Toprak altında bulunma veya depo görevi tek başına kök
            kökeni göstermez.
          </p>
        </div>
      </div>
      <div
        className="bio024a-result"
        data-model-result
        data-ring-count={m.secondaryRings.length}
      >
        <strong>Çizilen büyüme halkası: {m.secondaryRings.length}</strong>
        <p>{proof}</p>
        <p>{labCopyA(m.modelAssumption)}</p>
      </div>
      <Compare
        value={v}
        options={{
          secondary: "Bu modelde sekonder halka eklenir",
          typicalNo: "Bu modelde olağan kambiyum halkası yok",
        }}
        expected={kind === "dicot" ? "secondary" : "typicalNo"}
        proof={proof}
        change={change}
        validSelection={
          validTypes("kind", "seasons") &&
          Object.hasOwn({ monocot: 1, dicot: 1 }, v.kind) &&
          Number.isInteger(v.seasons) &&
          v.seasons >= 0 &&
          v.seasons <= 5
        }
        compare={() => set({ checked: true, kind, seasons })}
      />
    </section>
  );
}
const leafNames = {
  outside: "Dış hava",
  pore: "Stoma açıklığı",
  air: "Hücreler arası hava",
  spongy: "Sünger dokuda hava yolu",
  palisade: "Palizat mezofil",
  xylem: "Ksilem",
  film: "Mezofil su filmi",
  mesophyll: "Şeker üreten hücre",
  companion: "Arkadaş hücresi",
  phloem: "Floem",
  sink: "Havuz organ",
};
const leafCoords: Record<string, [number, number]> = {
  outside: [255, 326],
  pore: [174, 279],
  air: [174, 235],
  spongy: [81, 207],
  palisade: [77, 103],
  xylem: [225, 163],
  film: [132, 207],
  mesophyll: [127, 120],
  companion: [221, 215],
  phloem: [225, 189],
  sink: [278, 326],
};
function LeafLab() {
  const [v, write, validTypes] = useBiologyExploration(
    "forge024:biology-a:ayt-yaprak-yapisi",
    {
      route: "carbon",
      step: 0,
      open: true,
      prediction: "",
      reason: "",
      checked: false,
    },
  );
  const route = keyOf(
      { carbon: "", water: "", sugar: "" },
      v.route,
      "carbon",
    ) as LeafRoute024,
    step = bounded(v.step, 0, 4),
    m = leafJourney024(route, step, v.open),
    id = useId(),
    set = (p: Partial<typeof v>) => write({ route, step, ...p }),
    change = (p: Partial<typeof v>) => set({ ...p, checked: false });
  return (
    <section className="forge024-biology-a" data-forge024="ayt-yaprak-yapisi">
      <h3>Yaprak kesitinde üç farklı yolu izle</h3>
      <p>
        Bu olgun kaynak yaprakta gündüz net fotosentez ve dıştan içe CO₂
        gradiyenti verilmiştir. Su ve organik madde ayrı yollar izler. Bir adım
        seç; hangi dokuya ulaştığını kesit ve yazılı yol üzerinde karşılaştır.
      </p>
      <div className="bio024a-controls">
        <Menu
          label="İzlenen madde"
          value={route}
          options={{
            carbon: "CO₂: dış havadan fotosentez dokusuna",
            water: "Su: ksilemden buhar kaybına",
            sugar: "Organik madde: yapraktan havuza",
          }}
          change={(route) => change({ route })}
        />
        <Slider
          label="Yolun adımı"
          value={step}
          min={0}
          max={4}
          change={(step) => change({ step })}
        />
      </div>
      <label className="bio024a-check">
        <input
          type="checkbox"
          checked={v.open}
          onChange={(e) => change({ open: e.target.checked })}
        />
        Gösterilen stoma yolu açık
      </label>
      <div data-live-model>
        <figure>
          <svg
            className="bio024a-svg"
            viewBox="0 0 310 345"
            role="img"
            aria-labelledby={id}
            data-leaf-route={route}
            data-leaf-reached={m.reached}
            data-leaf-blocked={String(m.blocked)}
          >
            <title
              id={id}
            >{`${route === "carbon" ? "CO₂" : route === "water" ? "Su" : "Organik madde"} yolu; adım ${step}; ${m.blocked ? "stoma yolu engelli" : "seçili yol"}`}</title>
            <defs>
              <marker
                id={`${id}-arrow`}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path className="bio024a-arrow-head" d="M0 0 L10 5 L0 10Z" />
              </marker>
            </defs>
            <path className="bio024a-cuticle" d="M18 31 H292" />
            <rect
              className="bio024a-cell"
              x="18"
              y="37"
              width="274"
              height="30"
              rx="7"
            />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect
                key={i}
                className="bio024a-leaf"
                x={26 + i * 44}
                y="77"
                width="31"
                height="66"
                rx="10"
              />
            ))}
            {[
              [44, 191],
              [94, 222],
              [151, 176],
              [192, 226],
              [262, 231],
            ].map(([cx, cy], i) => (
              <ellipse
                key={i}
                className="bio024a-leaf"
                cx={cx}
                cy={cy}
                rx="22"
                ry="17"
              />
            ))}
            <rect
              className="bio024a-xylem"
              x="201"
              y="150"
              width="48"
              height="24"
              rx="5"
            />
            <rect
              className="bio024a-phloem"
              x="201"
              y="179"
              width="48"
              height="25"
              rx="5"
            />
            <path
              className="bio024a-cell"
              d={`M18 264 H${v.open ? 159 : 174} V292 H18Z M${v.open ? 190 : 174} 264 H292 V292 H${v.open ? 190 : 174}Z`}
            />
            <path
              className="bio024a-wall"
              d={`M${v.open ? 159 : 174} 263 V293 M${v.open ? 190 : 174} 263 V293`}
            />
            {m.links.map((link, i) => {
              const [a, b] = [leafCoords[link.from], leafCoords[link.to]];
              return (
                <g key={i}>
                  <path
                    className={
                      link.active
                        ? "bio024a-path-active"
                        : "bio024a-path-pending"
                    }
                    data-leaf-link={i}
                    data-active={String(link.active)}
                    d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`}
                    markerEnd={link.active ? `url(#${id}-arrow)` : undefined}
                  />
                  {link.blocked && (
                    <path
                      className="bio024a-stop"
                      d={`M${b[0] - 11} ${b[1] - 11} l22 22 m0 -22 l-22 22`}
                    />
                  )}
                </g>
              );
            })}
            {m.activeNodes.map((n, i) => (
              <circle
                key={n}
                className="bio024a-tracer"
                data-leaf-node={n}
                cx={leafCoords[n][0]}
                cy={leafCoords[n][1]}
                r={i === m.reached ? 8 : 5}
              />
            ))}
          </svg>
          <figcaption>
            Üstte epidermis ve palizat, ortada sünger doku ve hava boşlukları;
            damar içinde üstte ksilem, altta floem; altta gösterilen stoma.
            Kalın yol ulaşılan, kesikli yol henüz izlenmeyen bağlantıdır. Çizim
            ölçek dışıdır.
          </figcaption>
        </figure>
        <ol className="bio024a-route">
          {m.path.map((n, i) => (
            <li key={n} data-reached={String(i <= m.reached)}>
              <strong>{leafNames[n as keyof typeof leafNames]}</strong>{" "}
              {i === m.reached
                ? "— şu an ulaşılan nokta"
                : i < m.reached
                  ? "— izlendi"
                  : "— henüz ulaşılmadı"}
            </li>
          ))}
        </ol>
      </div>
      <div
        className="bio024a-result"
        data-model-result
        data-leaf-blocked={String(m.blocked)}
        data-leaf-phase={m.phase ?? "none"}
      >
        <strong>
          {m.blocked
            ? "Gösterilen stoma yolu engelli."
            : `Ulaşılan: ${leafNames[m.path[m.reached] as keyof typeof leafNames]}.`}
        </strong>
        <p>{labCopyA(m.statement)}</p>
        {route === "water" && (
          <p>
            İzlenen suyun hâli: {m.phase === "vapor" ? "buhar" : "sıvı"}.
            Dışarıya mineral damlası çizilmez.
          </p>
        )}
      </div>
      <Compare
        value={v}
        options={{
          passes: "Seçilen adıma ulaşır",
          blocked: "Stoma engeli nedeniyle önceki noktada kalır",
        }}
        expected={m.blocked ? "blocked" : "passes"}
        proof={labCopyA(m.statement)}
        change={change}
        validSelection={
          validTypes("route", "step", "open") &&
          Object.hasOwn({ carbon: 1, water: 1, sugar: 1 }, v.route) &&
          Number.isInteger(v.step) &&
          v.step >= 0 &&
          v.step <= 4
        }
        compare={() => set({ checked: true, route, step })}
      />
    </section>
  );
}
function FlowLab() {
  const [v, write, validTypes] = useBiologyExploration(
    "forge024:biology-a:bitki-madde-tasinmasi",
    {
      mode: "xylem",
      a: -4,
      b: -12,
      g: 3,
      intact: true,
      stage: 0,
      prediction: "",
      reason: "",
      checked: false,
    },
  );
  const mode = keyOf({ xylem: "", phloem: "" }, v.mode, "xylem") as FlowMode024,
    a = bounded(v.a, mode === "xylem" ? -50 : 0, 50),
    b = bounded(v.b, mode === "xylem" ? -50 : 0, 50),
    g = bounded(v.g, 1, 10),
    stage = bounded(v.stage, 0, 4),
    m = plantFlow024(mode, a, b, g, v.intact),
    id = useId(),
    set = (p: Partial<typeof v>) => write({ mode, a, b, g, stage, ...p }),
    change = (p: Partial<typeof v>) => set({ ...p, checked: false });
  const direction =
      m.direction === "A-to-B"
        ? "A→B"
        : m.direction === "B-to-A"
          ? "B→A"
          : "net akış yok",
    proof = `Fark ${fmt(m.differenceTenths / 10)}; G ${g}; Q ${fmt(m.flow)}. ${!v.intact ? "Seçili bağlantı kesiktir." : m.cause === "equal" ? "Uç değerleri eşittir." : `Net yön ${direction}.`}`;
  const stages = [
    "Kaynak organik madde verir",
    "Floeme yükleme çözünen durumunu değiştirir",
    "Uygun Ψ farkıyla su girer, turgor artar",
    "Basınç farkı sıvıyı havuza taşır",
    "Havuzda boşaltma ve kullanım farkın sürmesine katkı verir",
  ];
  return (
    <section
      className="forge024-biology-a"
      data-forge024="bitki-madde-tasinmasi"
    >
      <h3>Bir borunun iki ucunu karşılaştır</h3>
      <p>
        Q = G × fark verilen bir öğretim modelidir. Ksilemde uç değerleri
        yerçekimi dahil toplam su potansiyeli; floemde basınçtır. A üstte, B
        altta çizilse de yönü konum ezberiyle değil verilen farkla bul.
      </p>
      <div className="bio024a-controls">
        <Menu
          label="Seçili taşıma dokusu"
          value={mode}
          options={{
            xylem: "Ksilem: toplam Ψ farkı",
            phloem: "Floem: basınç farkı",
          }}
          change={(mode) =>
            change({
              mode,
              a: mode === "phloem" ? 11 : -4,
              b: mode === "phloem" ? 5 : -12,
            })
          }
        />
        <Slider
          label={mode === "xylem" ? "A toplam su potansiyeli" : "A basıncı"}
          value={a}
          min={mode === "xylem" ? -50 : 0}
          max={50}
          divide={10}
          unit="MPa"
          change={(a) => change({ a })}
        />
        <Slider
          label={mode === "xylem" ? "B toplam su potansiyeli" : "B basıncı"}
          value={b}
          min={mode === "xylem" ? -50 : 0}
          max={50}
          divide={10}
          unit="MPa"
          change={(b) => change({ b })}
        />
        <Slider
          label="Model iletkenliği"
          value={g}
          min={1}
          max={10}
          change={(g) => change({ g })}
        />
      </div>
      <label className="bio024a-check">
        <input
          type="checkbox"
          checked={v.intact}
          onChange={(e) => change({ intact: e.target.checked })}
        />
        Seçili boru bağlantısı sağlam
      </label>
      <div data-live-model>
        <figure>
          <svg
            className="bio024a-svg bio024a-flow"
            viewBox="0 0 280 340"
            role="img"
            aria-labelledby={id}
            data-flow-direction={m.direction}
            data-flow-value={m.flow}
          >
            <title
              id={id}
            >{`Seçili ${mode === "xylem" ? "ksilem" : "floem"} borusu; ${direction}; model Q ${fmt(m.flow)}`}</title>
            <defs>
              <marker
                id={`${id}-arrow`}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto"
              >
                <path className="bio024a-arrow-head" d="M0 0 L10 5 L0 10Z" />
              </marker>
            </defs>
            <rect
              className={mode === "xylem" ? "bio024a-xylem" : "bio024a-phloem"}
              x="94"
              y="48"
              width="92"
              height="244"
              rx="12"
            />
            {mode === "phloem"
              ? [92, 140, 188, 236].map((y) => (
                  <path key={y} className="bio024a-plate" d={`M96 ${y} H184`} />
                ))
              : [76, 116, 156, 196, 236, 276].map((y) => (
                  <path
                    key={y}
                    className="bio024a-line"
                    d={`M96 ${y} H109 M171 ${y} H184`}
                  />
                ))}
            <text
              className="bio024a-large-label"
              x="140"
              y="28"
              textAnchor="middle"
            >
              A
            </text>
            <text
              className="bio024a-large-label"
              x="140"
              y="326"
              textAnchor="middle"
            >
              B
            </text>
            {!v.intact ? (
              <>
                <rect
                  className="bio024a-background"
                  x="89"
                  y="160"
                  width="102"
                  height="20"
                />
                <path
                  className="bio024a-stop"
                  d="M104 153 L176 186 M176 153 L104 186"
                />
              </>
            ) : m.direction !== "none" ? (
              <path
                className="bio024a-path-active"
                style={{ strokeWidth: Math.min(12, 3 + Math.abs(m.flow) / 10) }}
                d={m.direction === "A-to-B" ? "M140 70 V268" : "M140 268 V70"}
                markerEnd={`url(#${id}-arrow)`}
              />
            ) : (
              <path className="bio024a-stop" d="M117 165 H163 M117 180 H163" />
            )}
          </svg>
          <figcaption>
            A ucu: {fmt(m.a)} MPa. B ucu: {fmt(m.b)} MPa. Ok net yönü gösterir;
            eşitlik işareti net sıfır, çapraz kesinti seçili yolun kopuk
            olduğunu gösterir.
          </figcaption>
        </figure>
      </div>
      <div
        className="bio024a-result"
        data-model-result
        data-flow={m.flow}
        data-flow-cause={m.cause}
      >
        <strong>
          Q: {fmt(m.flow)} öğretim birimi; {direction}.
        </strong>
        <p>{proof}</p>
        <p>{labCopyA(m.assumption)}</p>
      </div>
      <div className="bio024a-divider">
        <h4>Floem basıncı nasıl hazırlanır?</h4>
        <p>
          Aşağıdaki ayrı süreçte olgun yaprak kaynak, gelişen kök havuz olarak
          verilmiştir. Bir boruda aynı anda ters iki kütlesel akış çizilmez.
        </p>
        <Slider
          label="Kaynak–havuz sürecinin adımı"
          value={stage}
          min={0}
          max={4}
          change={(stage) => change({ stage })}
        />
        <ol className="bio024a-route">
          {stages.map((s, i) => (
            <li key={s} data-reached={String(i <= stage)}>
              {s}
              {i === stage ? " — seçili aşama" : ""}
            </li>
          ))}
        </ol>
        <p>
          Yükleme ve boşaltma bazı yollarda enerji kullanır. Boru içindeki
          kütlesel akış basınç farkıyla açıklanır; gerçek mL/s veya öğrenme
          puanı hesabı yapılmaz.
        </p>
      </div>
      <Compare
        value={v}
        options={{
          "A-to-B": "A’dan B’ye",
          "B-to-A": "B’den A’ya",
          none: "Net akış yok",
        }}
        expected={m.direction}
        proof={proof}
        change={change}
        validSelection={
          validTypes("mode", "a", "b", "g", "intact") &&
          Object.hasOwn({ xylem: 1, phloem: 1 }, v.mode) &&
          Number.isInteger(v.a) &&
          v.a >= (mode === "xylem" ? -50 : 0) &&
          v.a <= 50 &&
          Number.isInteger(v.b) &&
          v.b >= (mode === "xylem" ? -50 : 0) &&
          v.b <= 50 &&
          Number.isInteger(v.g) &&
          v.g >= 1 &&
          v.g <= 10
        }
        compare={() => set({ checked: true, mode, a, b, g })}
      />
    </section>
  );
}
const signals = {
  light: "Uygun su koşulunda ışık",
  ABA: "Su stresiyle ABA sinyali",
  dark: "Gündüz etkin türde karanlık",
  "CAM-night": "Verilen CAM türünde gece",
};
const exchangeNames = {
  nitrogen: "N₂’den kullanılabilir azot",
  phosphate: "Topraktan fosfat",
  water: "Topraktan su",
  carbon: "Bitkiden organik karbon",
};
const partnerNodeNames: Record<string, string> = {
  leaf: "Kaynak yaprak",
  phloem: "Floem yolu",
  root: "Bitki kökü",
  bacterium: "Bakteri ortağı",
  fungus: "Mantar ortağı",
  "air-N2": "Atmosferik N₂",
  "nodule-bacterium": "Nodüldeki bakteri",
  "fixed-N": "Alıma uygun azot",
  plant: "Bitki dokusu",
  soil: "Toprak kaynağı",
  "fungal-hypha": "Mantar hifleri",
  "root-interface": "Kök–mantar arayüzü",
};
function StomaLab() {
  const [v, write, validTypes] = useBiologyExploration(
    "forge024:biology-a:stoma-nodul-mikoriza",
    {
      signal: "light",
      step: 0,
      partner: "bacterium",
      exchange: "nitrogen",
      exchangeStep: 0,
      prediction: "",
      reason: "",
      checked: false,
    },
  );
  const signal = keyOf(signals, v.signal, "light") as GuardSignal024,
    step = bounded(v.step, 0, 4),
    partner = keyOf(
      { bacterium: "", fungus: "" },
      v.partner,
      "bacterium",
    ) as RootPartner024,
    exchange = keyOf(exchangeNames, v.exchange, "nitrogen") as Exchange024,
    exchangeStep = bounded(v.exchangeStep, 0, 3),
    m = guardCycle024(signal, step),
    s = symbiosis024(partner, exchange, exchangeStep),
    id = useId(),
    set = (p: Partial<typeof v>) =>
      write({ signal, step, partner, exchange, exchangeStep, ...p }),
    change = (p: Partial<typeof v>) => set({ ...p, checked: false }),
    gap = [0, 13, 26][m.apertureStage],
    proof = s.represented
      ? labCopyA(s.note)
      : "Bu ortaklığın verilen görevleri arasında seçilen kaynak yolu temsil edilmez.";
  return (
    <section
      className="forge024-biology-a"
      data-forge024="stoma-nodul-mikoriza"
    >
      <h3>Stomada olay sırasını, kökte ortaklığın yolunu izle</h3>
      <p>
        İlk model iki bekçi hücresinin iyon–su–turgor yanıtıdır. İkinci modelde
        bitkiden ayrı bir bakteri veya mantar ortağı vardır; bu yolları
        birbirine yükleme.
      </p>
      <div className="bio024a-controls">
        <Menu
          label="Stoma sinyali"
          value={signal}
          options={signals}
          change={(signal) => change({ signal })}
        />
        <Slider
          label="Bekçi hücresi yanıt adımı"
          value={step}
          min={0}
          max={4}
          change={(step) => change({ step })}
        />
      </div>
      <div data-live-model>
        <figure>
          <svg
            className="bio024a-svg"
            viewBox="0 0 300 280"
            role="img"
            aria-labelledby={id}
            data-guard-stage={m.apertureStage}
            data-guard-ion={m.ionDirection}
            data-guard-water={m.waterDirection}
          >
            <title
              id={id}
            >{`${signals[signal]}, ${m.labels[step]}; açıklık aşaması ${m.apertureStage}`}</title>
            <path className="bio024a-cell" d="M12 15 H288 V265 H12Z" />
            <path
              className="bio024a-leaf"
              d={`M${150 - gap} 55 C39 9 35 269 ${150 - gap} 225 C${150 - gap / 2} 185 ${150 - gap / 2} 95 ${150 - gap} 55Z`}
            />
            <path
              className="bio024a-leaf"
              d={`M${150 + gap} 55 C261 9 265 269 ${150 + gap} 225 C${150 + gap / 2} 185 ${150 + gap / 2} 95 ${150 + gap} 55Z`}
            />
            <path
              className="bio024a-wall"
              d={`M${150 - gap} 55 C${150 - gap / 2} 95 ${150 - gap / 2} 185 ${150 - gap} 225 M${150 + gap} 55 C${150 + gap / 2} 95 ${150 + gap / 2} 185 ${150 + gap} 225`}
            />
            {[
              [86, 75],
              [70, 130],
              [86, 200],
              [214, 75],
              [230, 130],
              [214, 200],
            ].map(([cx, cy], i) => (
              <ellipse
                key={i}
                className="bio024a-chloroplast"
                cx={cx}
                cy={cy}
                rx="8"
                ry="5"
              />
            ))}
            {m.ionDirection !== "pending" && (
              <path
                className="bio024a-path-active"
                d={
                  m.ionDirection === "in"
                    ? "M14 98 H59 M59 98 l-10 -8 m10 8 l-10 8"
                    : "M59 98 H14 M14 98 l10 -8 m-10 8 l10 8"
                }
              />
            )}{" "}
            {m.waterDirection !== "pending" && (
              <path
                className="bio024a-water-arrow"
                d={
                  m.waterDirection === "in"
                    ? "M14 180 H59 M59 180 l-10 -8 m10 8 l-10 8"
                    : "M59 180 H14 M14 180 l10 -8 m-10 8 l10 8"
                }
              />
            )}
          </svg>
          <figcaption>
            İki yeşil şekil canlı bekçi hücreleri; ortadaki aralık açıklıktır.
            Üstteki koyu ok iyon, alttaki mavi ok su yönünü gösterir. Oklar
            ancak ilgili basamağa gelince çizilir; çap ve zaman ölçekli
            değildir.
          </figcaption>
        </figure>
        <ol className="bio024a-route">
          {m.labels.map((label, i) => (
            <li key={label} data-reached={String(i <= step)}>
              {label}
              {i === step ? " — seçili aşama" : ""}
            </li>
          ))}
        </ol>
        <p>{labCopyA(m.scope)}</p>
      </div>
      <div className="bio024a-divider">
        <h4>Kök ortağını ve izlenen maddeyi değiştir</h4>
        <div className="bio024a-controls">
          <Menu
            label="Kök ortaklığı"
            value={partner}
            options={{
              bacterium: "Baklagil–Rhizobium nodülü",
              fungus: "Bitki–mantar mikorizası",
            }}
            change={(partner) => change({ partner })}
          />
          <Menu
            label="Ortaklıkta izlenen madde"
            value={exchange}
            options={exchangeNames}
            change={(exchange) => change({ exchange })}
          />
          <Slider
            label="Alışveriş yolunun adımı"
            value={exchangeStep}
            min={0}
            max={3}
            change={(exchangeStep) => change({ exchangeStep })}
          />
        </div>
        <figure>
          <svg
            className="bio024a-svg"
            viewBox="0 0 300 330"
            role="img"
            aria-label={`${s.model}; ${exchangeNames[exchange]}; ${s.represented ? `izlenen adım ${exchangeStep}` : "bu yol temsil edilmiyor"}`}
            data-symbiosis-partner={partner}
            data-symbiosis-represented={String(s.represented)}
            data-symbiosis-step={exchangeStep}
          >
            <path
              className="bio024a-leaf"
              d="M149 45 Q48 6 50 43 Q76 71 149 45 M151 45 Q252 6 250 43 Q224 71 151 45"
            />
            <path
              className="bio024a-wall"
              d="M150 42 V181 M150 167 L92 242 M150 167 L208 242 M150 181 V290"
            />
            {partner === "bacterium" ? (
              [
                [116, 217],
                [187, 223],
                [150, 265],
              ].map(([cx, cy], i) => (
                <ellipse
                  key={i}
                  className="bio024a-nodule"
                  cx={cx}
                  cy={cy}
                  rx="15"
                  ry="10"
                />
              ))
            ) : (
              <g className="bio024a-hypha">
                <path d="M97 239 L35 272 L12 250 M35 272 L16 304 M204 238 L264 269 L287 244 M264 269 L286 305 M150 264 L189 302 L211 287" />
                <path d="M87 222 Q150 184 213 222" />
              </g>
            )}
            {s.represented ? (
              s.path.map((n, i) => {
                const y = 70 + i * 70;
                return (
                  <g
                    key={n}
                    data-exchange-node={n}
                    data-exchange-reached={String(i <= exchangeStep)}
                  >
                    {i > 0 && (
                      <path
                        className={
                          i <= exchangeStep
                            ? "bio024a-path-active"
                            : "bio024a-path-pending"
                        }
                        d={`M267 ${y - 61} V${y - 9}`}
                      />
                    )}
                    <circle
                      className={
                        i <= exchangeStep
                          ? "bio024a-tracer"
                          : "bio024a-node-pending"
                      }
                      cx="267"
                      cy={y}
                      r="8"
                    />
                  </g>
                );
              })
            ) : (
              <path
                className="bio024a-stop"
                d="M249 145 L286 184 M286 145 L249 184"
              />
            )}
          </svg>
          <figcaption>
            {s.model}.{" "}
            {partner === "bacterium"
              ? "Kökteki oval şişkinlikler nodülleri"
              : "Toprağa dallanan çizgiler mantar hiflerini"}{" "}
            temsil eder. Sağdaki sıralı noktalar seçilen alışveriş yolunun
            adımlarını gösterir; aşağıdaki liste düğümlerin adını verir.
          </figcaption>
        </figure>
        {s.represented ? (
          <ol className="bio024a-route">
            {s.path.map((n, i) => (
              <li key={n} data-reached={String(i <= exchangeStep)}>
                {partnerNodeNames[n]}
                {i === exchangeStep ? " — ulaşılan nokta" : ""}
              </li>
            ))}
          </ol>
        ) : (
          <p>
            Seçilen yol bu ortaklık modelinde yok. Bakteri nodülüne mantarın
            hifli fosfat yolunu; mantara Rhizobium’un N₂ bağlama işini yükleme.
          </p>
        )}
      </div>
      <div
        className="bio024a-result"
        data-model-result
        data-guard-aperture={m.apertureStage}
        data-exchange-represented={String(s.represented)}
      >
        <strong>Stoma: {m.labels[step]}.</strong>
        <p>
          İyon:{" "}
          {m.ionDirection === "pending"
            ? "henüz yön çizimi yok"
            : m.ionDirection === "in"
              ? "hücreye giriş"
              : "hücreden çıkış"}
          . Su:{" "}
          {m.waterDirection === "pending"
            ? "henüz yön çizimi yok"
            : m.waterDirection === "in"
              ? "hücreye giriş"
              : "hücreden çıkış"}
          .
        </p>
        <p>{labCopyA(s.note)}</p>
      </div>
      <Compare
        value={v}
        options={{
          yes: "Seçili ortaklık bu yolu temsil eder",
          no: "Bu yol seçili ortaklıkta temsil edilmez",
        }}
        expected={s.represented ? "yes" : "no"}
        proof={proof}
        change={change}
        validSelection={
          validTypes("partner", "exchange") &&
          Object.hasOwn({ bacterium: 1, fungus: 1 }, v.partner) &&
          Object.hasOwn(exchangeNames, v.exchange)
        }
        compare={() => set({ checked: true, partner, exchange })}
      />
    </section>
  );
}
export default function Forge024BiologyALab({
  lessonId,
}: {
  lessonId: string;
}) {
  return lessonId === "ayt-govde-yapisi" ? (
    <StemLab />
  ) : lessonId === "ayt-yaprak-yapisi" ? (
    <LeafLab />
  ) : lessonId === "bitki-madde-tasinmasi" ? (
    <FlowLab />
  ) : lessonId === "stoma-nodul-mikoriza" ? (
    <StomaLab />
  ) : null;
}
