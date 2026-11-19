import { useId } from "react";
import { useApp } from "../store";
import {
  guardWater023,
  rootPath023,
  rootRoutes023,
  rootCargo023,
  rootZoneNames023,
  rootZoneFacts023,
  surfaceNames023,
  surfaceFacts023,
  type RootRoute023,
  type RootCargo023,
  type RootZone023,
  type Surface023,
} from "./forge023Biology";
import { useExploration } from "./useExploration";
import "./forge023Biology.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

const rawTypes023 = (
  raw: unknown,
  defaults: Record<string, string | number | boolean>,
  keys: string[],
) => {
  if (raw === undefined) return true;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return false;
  const record = raw as Record<string, unknown>;
  return [...keys, "prediction", "reason", "checked"].every(
    (key) =>
      !Object.hasOwn(record, key) ||
      typeof record[key] === typeof defaults[key],
  );
};
const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 }).format(n);
const bounded = (n: number, min: number, max: number) =>
  Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : min;
const validKey = <T extends Record<string, unknown>>(
  map: T,
  key: string,
  fallback: keyof T,
): keyof T => (Object.hasOwn(map, key) ? key : fallback);
function Slider({
  label,
  value,
  min,
  max,
  onChange,
  divide = 1,
  unit = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  divide?: number;
  unit?: string;
}) {
  const id = useId();
  return (
    <div className="bio023-field">
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
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
function Menu({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Record<string, string>;
  onChange: (n: string) => void;
}) {
  const id = useId();
  return (
    <div className="bio023-field">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {Object.entries(options).map(([key, name]) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </ChoiceSelect>
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
  validSelection,
}: {
  value: Prediction;
  options: Record<string, string>;
  expected: string;
  proof: string;
  change: (patch: Partial<Prediction>) => void;
  compare: () => void;
  validSelection: boolean;
}) {
  const id = useId();
  const valid = Object.hasOwn(options, value.prediction);
  return (
    <div className="bio023-prediction">
      <h4>Önce tahmin et</h4>
      <Menu
        label="Sonuç tahminin"
        value={valid ? value.prediction : ""}
        options={{ "": "Seç", ...options }}
        onChange={(prediction) => change({ prediction, checked: false })}
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
        disabled={!validSelection || !valid || !value.reason.trim()}
        onClick={compare}
      >
        Kanıtı karşılaştır
      </button>
      {value.checked && validSelection && valid && value.reason.trim() && (
        <div className="bio023-feedback" role="status">
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
function SurfaceFigure({ kind }: { kind: Surface023 }) {
  const id = useId();
  return (
    <svg
      className="bio023-svg bio023-surface"
      viewBox="0 0 300 235"
      role="img"
      aria-labelledby={id}
    >
      <title id={id}>
        {`${surfaceNames023[kind]} için özgün, ölçek dışı yapı şeması`}
      </title>
      {kind === "stoma" ? (
        <>
          <path
            className="bio023-cell"
            d="M140 42 C47 12 40 201 137 188 C99 155 102 79 140 42Z"
          />
          <path
            className="bio023-cell"
            d="M160 42 C253 12 260 201 163 188 C201 155 198 79 160 42Z"
          />
          <path
            className="bio023-wall"
            d="M140 42 C99 79 99 155 137 188 M160 42 C201 79 201 155 163 188"
          />
          {[
            [83, 72],
            [78, 112],
            [91, 158],
            [217, 72],
            [222, 112],
            [209, 158],
          ].map(([cx, cy], i) => (
            <ellipse
              key={i}
              className="bio023-leaf"
              cx={cx}
              cy={cy}
              rx={9}
              ry={6}
            />
          ))}
          <text x="150" y="220" textAnchor="middle">
            İki bekçi hücresi
          </text>
        </>
      ) : kind === "cuticle" ? (
        <>
          <rect
            className="bio023-accent"
            x="25"
            y="55"
            width="250"
            height="12"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect
                className="bio023-cell"
                x={25 + i * 50}
                y="67"
                width="50"
                height="80"
              />
              <circle
                className="bio023-nucleus"
                cx={45 + i * 50}
                cy="130"
                r="5"
              />
            </g>
          ))}
          <text x="150" y="40" textAnchor="middle">
            Hücresiz örtü
          </text>
          <text x="150" y="190" textAnchor="middle">
            Canlı epidermis
          </text>
        </>
      ) : kind === "hair" || kind === "rootHair" ? (
        <>
          <path
            className="bio023-cell"
            d={
              kind === "hair"
                ? "M25 185 V145 H116 L123 95 L132 95 L125 145 H145 L150 45 L160 45 L166 145 H183 L177 90 L186 87 L198 145 H275 V185Z"
                : "M25 185 V145 H130 V50 Q130 35 145 35 Q160 35 160 50 V145 H275 V185Z"
            }
          />
          {kind === "hair" && (
            <path
              className="bio023-line"
              d="M149 94 H162 M146 124 H164 M120 121 H130 M182 117 H193"
            />
          )}
          <text x="150" y="222" textAnchor="middle">
            {kind === "hair" ? "Yüzey çıkıntıları" : "Tek hücre uzantısı"}
          </text>
        </>
      ) : kind === "hydathode" ? (
        <>
          <path
            className="bio023-leaf"
            d="M28 192 Q28 75 153 48 Q248 95 269 192Z"
          />
          <path
            className="bio023-xylem"
            d="M150 200 V85 M150 135 L210 100 M150 150 L92 105"
          />
          <path
            className="bio023-drop"
            d="M150 16 C120 53 132 65 150 65 C168 65 180 53 150 16Z"
          />
          <text x="150" y="225" textAnchor="middle">
            Ksilem → sıvı damla
          </text>
        </>
      ) : kind === "prickle" ? (
        <>
          <path
            className="bio023-cell"
            d="M25 185 V142 H112 Q138 130 151 52 Q176 119 193 142 H275 V185Z"
          />
          <path className="bio023-line" d="M25 164 H125 Q151 145 161 100" />
          <text x="150" y="225" textAnchor="middle">
            Gülde emergens
          </text>
        </>
      ) : (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              {[0, 1, 2, 3, 4].map((j) => (
                <rect
                  key={j}
                  className={i === 2 ? "bio023-cell" : "bio023-cork"}
                  x={25 + j * 50}
                  y={52 + i * 42}
                  width="50"
                  height="42"
                />
              ))}
            </g>
          ))}
          {kind === "lenticel" && (
            <>
              <path
                className="bio023-gap"
                d="M110 55 L130 40 L151 60 L169 42 L192 55 L186 150 L166 160 L145 143 L125 160Z"
              />
              {[
                [133, 72],
                [165, 86],
                [141, 114],
              ].map(([cx, cy], i) => (
                <ellipse
                  key={i}
                  className="bio023-cell"
                  cx={cx}
                  cy={cy}
                  rx="10"
                  ry="7"
                />
              ))}
              <path className="bio023-arrow" d="M151 20 V130" />
            </>
          )}
          <text x="150" y="225" textAnchor="middle">
            {kind === "periderm" ? "Mantar ve canlı katman" : "Gaz aralıkları"}
          </text>
        </>
      )}
    </svg>
  );
}
function CoverLab() {
  const defaults = {
    surface: "stoma",
    solute: -12,
    pressure: 4,
    outside: -3,
    prediction: "",
    reason: "",
    checked: false,
  };
  const key = "forge023:biology:bitki-ortu-doku";
  const raw = useApp().state.explorations[key];
  const [saved, write] = useExploration(key, defaults);
  const surface = validKey(
    surfaceNames023,
    saved.surface,
    "stoma",
  ) as Surface023;
  const solute = bounded(saved.solute, -30, 0),
    pressure = bounded(saved.pressure, 0, 15),
    outside = bounded(saved.outside, -30, 0),
    m = guardWater023(solute, pressure, outside),
    facts = surfaceFacts023[surface];
  const validSelection =
    rawTypes023(raw, defaults, ["solute", "pressure", "outside"]) &&
    saved.solute === solute &&
    saved.pressure === pressure &&
    saved.outside === outside;
  const set = (patch: Partial<typeof saved>) =>
    write({
      ...saved,
      surface,
      solute,
      pressure,
      outside,
      checked: validSelection ? saved.checked : false,
      ...patch,
    });
  const change = (patch: Partial<typeof saved>) =>
    set({ ...patch, checked: false });
  const waterId = useId();
  const arrowY =
    m.direction === "equal"
      ? null
      : m.direction === "in"
        ? "M35 110 H112"
        : "M112 110 H35";
  const proof = `Hücre Ψ=${fmt(solute / 10)}+${fmt(pressure / 10)}=${fmt(m.cell)} MPa; dış Ψ=${fmt(m.outside)} MPa. ${m.direction === "in" ? "Dış değer daha yüksek; net su içeri geçer." : m.direction === "out" ? "İç değer daha yüksek; net su dışarı geçer." : "İki toplam eşit; net osmotik fark yok."}`;
  return (
    <section className="forge023-biology" data-forge023="bitki-ortu-doku">
      <h3>Yüzeyi ve suyun yönünü keşfet</h3>
      <p>
        Önce yapıyı seç. Sonra ayrı bekçi hücresi deneyinde çözünen ile basıncı
        topla; suyun yönünü tahmin et.
      </p>
      <Menu
        label="Yüzey yapısı"
        value={surface}
        options={surfaceNames023}
        onChange={(value) => set({ surface: value })}
      />
      <figure>
        <SurfaceFigure kind={surface} />
        <figcaption>
          {surfaceNames023[surface]}: Şemada hücre, boşluk ve dış örtü ayrı
          gösterilir. Boyutlar ölçülmüş değildir.
        </figcaption>
      </figure>
      <dl className="bio023-facts">
        <div>
          <dt>Yer</dt>
          <dd>{facts.place}</dd>
        </div>
        <div>
          <dt>Yapı</dt>
          <dd>{facts.structure}</dd>
        </div>
        <div>
          <dt>İşlev</dt>
          <dd>{facts.function}</dd>
        </div>
      </dl>
      <p>{facts.evidence}</p>
      <div className="bio023-divider">
        <h4>Ayrı deney: bekçi hücresinde su</h4>
        <p>
          Ψ = Ψs + Ψp. Veriler 0,1 MPa adımlıdır. Zar suya açık; matrik ve
          yerçekimi katkıları bu küçük düzende ihmal edilir.
        </p>
      </div>
      <div className="bio023-controls">
        <Slider
          label="Çözünen potansiyeli"
          value={solute}
          min={-30}
          max={0}
          divide={10}
          unit="MPa"
          onChange={(solute) => change({ solute })}
        />
        <Slider
          label="Turgor basıncı"
          value={pressure}
          min={0}
          max={15}
          divide={10}
          unit="MPa"
          onChange={(pressure) => change({ pressure })}
        />
        <Slider
          label="Dış su potansiyeli"
          value={outside}
          min={-30}
          max={0}
          divide={10}
          unit="MPa"
          onChange={(outside) => change({ outside })}
        />
      </div>
      <div data-live-model>
        <figure>
          <svg
            className="bio023-svg"
            viewBox="0 0 300 270"
            role="img"
            aria-labelledby={waterId}
          >
            <title id={waterId}>
              Verilen turgora göre şematik açıklık ve anlık su yönü; gerçek çap
              veya zaman tahmini değildir
            </title>
            <defs>
              <marker
                id={`${waterId}-arrow`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path className="bio023-arrow-head" d="M0 0 L10 5 L0 10Z" />
              </marker>
            </defs>
            <path
              className="bio023-cell"
              d={`M150 32 C40 5 35 192 150 199 C${150 - 40 * m.openingFraction} 150 ${150 - 40 * m.openingFraction} 80 150 32Z`}
            />
            <path
              className="bio023-cell"
              d={`M150 32 C260 5 265 192 150 199 C${150 + 40 * m.openingFraction} 150 ${150 + 40 * m.openingFraction} 80 150 32Z`}
            />
            {arrowY ? (
              <path
                data-water-direction={m.direction}
                className="bio023-arrow"
                markerEnd={`url(#${waterId}-arrow)`}
                d={arrowY}
              />
            ) : (
              <text
                data-water-direction="equal"
                x="150"
                y="116"
                textAnchor="middle"
              >
                =
              </text>
            )}
            <text x="150" y="233" textAnchor="middle">
              Ψ hücre: {fmt(m.cell)} MPa
            </text>
            <text x="150" y="261" textAnchor="middle">
              Ψ dış: {fmt(m.outside)} MPa
            </text>
          </svg>
          <figcaption>
            Şekil yalnız verilen turgoru temsil eder. Su yönü, iki toplam Ψ
            değeriyle bulunur; gelecekteki açıklık hesabı yapılmaz.
          </figcaption>
        </figure>
      </div>
      <div
        className="bio023-result"
        data-model-result
        data-water-cell={m.cell}
        data-water-difference={m.difference}
      >
        <strong>
          {m.direction === "in"
            ? "Net su: içeri"
            : m.direction === "out"
              ? "Net su: dışarı"
              : "Net osmotik fark yok"}
        </strong>
        <p>{proof}</p>
        <p>
          Turgor: {fmt(pressure / 10)} MPa. Su geçişi doğrudan ATP kullanan bir
          pompaya bağlı değildir.
        </p>
      </div>
      <Compare
        value={saved}
        options={{ in: "İçeri", out: "Dışarı", equal: "Net fark yok" }}
        expected={m.direction}
        proof={proof}
        change={change}
        validSelection={validSelection}
        compare={() => set({ checked: true })}
      />
    </section>
  );
}
function RootAnatomy({
  view,
  zone,
  kind,
  onZone,
}: {
  view: string;
  zone: RootZone023;
  kind: string;
  onZone: (zone: RootZone023) => void;
}) {
  const id = useId();
  const bands = [
    { key: "maturation" as const, y: 20, h: 108 },
    { key: "elongation" as const, y: 140, h: 68 },
    { key: "division" as const, y: 220, h: 56 },
    { key: "cap" as const, y: 286, h: 54 },
  ];
  return (
    <svg
      className="bio023-svg"
      viewBox={view === "long" ? "0 0 300 355" : "0 0 300 300"}
      role={view === "long" ? "group" : "img"}
      aria-labelledby={id}
    >
      <title id={id}>
        {view === "long"
          ? "Genç kökün boyuna bölgeleri; alanlara basarak bölgeyi seç"
          : "Olgun kökün enine kesiti; tipik " +
            (kind === "monocot" ? "tek çenekli" : "çift çenekli") +
            " düzen"}
      </title>
      {view === "long" ? (
        <>
          <path
            className="bio023-cell"
            d="M109 14 H191 V285 Q187 326 150 340 Q113 326 109 285Z"
          />
          <path className="bio023-xylem" d="M143 20 H157 V270 H143Z" />
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i}>
              <path
                className="bio023-line"
                d={`M109 ${29 + i * 16} H${86 - (i % 2) * 15} M191 ${29 + i * 16} H${214 + (i % 2) * 15}`}
              />
            </g>
          ))}
          {bands.map((b) => (
            <g
              role="button"
              tabIndex={0}
              aria-label={`Bölge: ${rootZoneNames023[b.key]}`}
              aria-pressed={zone === b.key}
              key={b.key}
              className="bio023-zone"
              onClick={() => onZone(b.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onZone(b.key);
                }
              }}
            >
              <rect
                data-root-zone={b.key}
                className={
                  zone === b.key ? "bio023-zone-selected" : "bio023-zone-hit"
                }
                x="90"
                y={b.y}
                width="120"
                height={b.h}
                rx="12"
              />
              <text
                className="bio023-label"
                x="150"
                y={b.y + b.h / 2 + 7}
                textAnchor="middle"
              >
                {rootZoneNames023[b.key]}
              </text>
            </g>
          ))}
        </>
      ) : (
        <>
          <circle className="bio023-cell" cx="150" cy="150" r="125" />
          <circle className="bio023-cortex" cx="150" cy="150" r="110" />
          <circle className="bio023-band" cx="150" cy="150" r="79" />
          <circle className="bio023-cell" cx="150" cy="150" r="71" />
          {kind === "monocot" ? (
            <>
              <circle className="bio023-cortex" cx="150" cy="150" r="38" />
              {Array.from({ length: 10 }, (_, i) => {
                const a = (i * Math.PI) / 5;
                return (
                  <g key={i}>
                    <circle
                      className="bio023-xylem"
                      cx={150 + 55 * Math.cos(a)}
                      cy={150 + 55 * Math.sin(a)}
                      r="8"
                    />
                    <circle
                      className="bio023-phloem"
                      cx={150 + 55 * Math.cos(a + Math.PI / 10)}
                      cy={150 + 55 * Math.sin(a + Math.PI / 10)}
                      r="5"
                    />
                  </g>
                );
              })}
              <text
                className="bio023-label"
                x="150"
                y="157"
                textAnchor="middle"
              >
                Öz
              </text>
            </>
          ) : (
            <>
              <path
                className="bio023-xylem"
                d="M145 93 H155 L162 136 L207 145 V155 L164 163 L155 207 H145 L136 164 L93 155 V145 L138 136Z"
              />
              {[
                [124, 124],
                [176, 124],
                [176, 176],
                [124, 176],
              ].map(([cx, cy], i) => (
                <circle
                  key={i}
                  className="bio023-phloem"
                  cx={cx}
                  cy={cy}
                  r="9"
                />
              ))}
            </>
          )}
          <text className="bio023-label" x="150" y="19" textAnchor="middle">
            Epidermis
          </text>
          <text className="bio023-label" x="150" y="291" textAnchor="middle">
            Olgun enine kesit
          </text>
        </>
      )}
    </svg>
  );
}
function RootLab() {
  const defaults = {
    view: "long",
    zone: "maturation",
    kind: "dicot",
    route: "apoplast",
    cargo: "tracer",
    bandIntact: true,
    ionEntry: true,
    count: 12,
    stage: 0,
    prediction: "",
    reason: "",
    checked: false,
  };
  const key = "forge023:biology:bitki-kok-anatomisi";
  const raw = useApp().state.explorations[key];
  const [saved, write] = useExploration(key, defaults);
  const route = validKey(
      rootRoutes023,
      saved.route,
      "apoplast",
    ) as RootRoute023,
    cargo = validKey(rootCargo023, saved.cargo, "tracer") as RootCargo023,
    zone = validKey(rootZoneNames023, saved.zone, "maturation") as RootZone023;
  const view = saved.view === "cross" ? "cross" : "long",
    kind = saved.kind === "monocot" ? "monocot" : "dicot";
  const count = bounded(saved.count, 0, 24),
    stage = bounded(saved.stage, 0, 3),
    m = rootPath023(
      route,
      saved.bandIntact,
      cargo,
      saved.ionEntry,
      count,
      stage,
    );
  const validSelection =
    rawTypes023(raw, defaults, [
      "route",
      "cargo",
      "bandIntact",
      "count",
      "stage",
      ...(cargo === "ion" ? ["ionEntry"] : []),
    ]) &&
    saved.route === route &&
    saved.cargo === cargo &&
    saved.count === count &&
    saved.stage === stage;
  const set = (patch: Partial<typeof saved>) =>
    write({
      ...saved,
      route,
      cargo,
      zone,
      view,
      kind,
      count,
      stage,
      checked: validSelection ? saved.checked : false,
      ...patch,
    });
  const change = (patch: Partial<typeof saved>) =>
    set({ ...patch, checked: false });
  const id = useId();
  const y =
    !m.canPass && stage > m.reachedStage
      ? m.blockedAt === "entry"
        ? 35
        : 140
      : [35, 100, 205, 280][m.reachedStage];
  return (
    <section className="forge023-biology" data-forge023="bitki-kok-anatomisi">
      <h3>Kökü iki yönden oku</h3>
      <p>
        Boyuna görünüm büyüme bölgelerini, enine görünüm olgun kökte iç
        katmanları gösterir. Ardından bir maddeyi dıştan merkeze izle.
      </p>
      <div className="bio023-controls">
        <Menu
          label="Kesit yönü"
          value={view}
          options={{ long: "Boyuna", cross: "Enine" }}
          onChange={(view) => set({ view })}
        />
        {view === "cross" ? (
          <Menu
            label="Tipik kök düzeni"
            value={kind}
            options={{ dicot: "Çift çenekli", monocot: "Tek çenekli" }}
            onChange={(kind) => set({ kind })}
          />
        ) : (
          <Menu
            label="Boyuna bölge"
            value={zone}
            options={rootZoneNames023}
            onChange={(zone) => set({ zone })}
          />
        )}
      </div>
      <figure>
        <RootAnatomy
          view={view}
          zone={zone}
          kind={kind}
          onZone={(zone) => set({ zone })}
        />
        <figcaption>
          {view === "long"
            ? rootZoneFacts023[zone]
            : kind === "monocot"
              ? "Tipik tek çenekli: belirgin özün çevresinde çok sayıda ksilem ve floem grubu."
              : "Tipik çift çenekli: merkezde yıldız biçimli ksilem; kollar arasında floem. Öz belirgin değildir."}{" "}
          Şema ölçek dışıdır; bütün tür ve yaşların kopyası değildir.
        </figcaption>
      </figure>
      {view === "cross" && (
        <dl className="bio023-facts">
          <div>
            <dt>Dıştan içe</dt>
            <dd>
              Epidermis → korteks → endodermis → periskl → iletim dokuları.
            </dd>
          </div>
          <div>
            <dt>Çizim anahtarı</dt>
            <dd>
              Kalın kesik çizgi endodermis; onun içindeki ince halka periskl.
              Mavi ksilem, kesikli mor gruplar floemdir.
            </dd>
          </div>
        </dl>
      )}
      <div className="bio023-divider">
        <h4>Duvar mı, hücre içi mi?</h4>
        <p>
          Sayılmış örnek bir maddeyi izle. Bu ideal deney gerçek emilim hızı ya
          da başarı yüzdesi vermez. Son ksilem aktarımı ortak ve açık kabul
          edilir.
        </p>
      </div>
      <div className="bio023-controls">
        <Menu
          label="Başlangıç yolu"
          value={route}
          options={rootRoutes023}
          onChange={(route) => change({ route })}
        />
        <Menu
          label="İzlenen madde"
          value={cargo}
          options={rootCargo023}
          onChange={(cargo) => change({ cargo })}
        />
      </div>
      <div className="bio023-checks">
        <label>
          <input
            type="checkbox"
            checked={saved.bandIntact}
            onChange={(e) => change({ bandIntact: e.target.checked })}
          />
          Kaspari bandı sağlam
        </label>
        {cargo === "ion" && (
          <label>
            <input
              type="checkbox"
              checked={saved.ionEntry}
              onChange={(e) => change({ ionEntry: e.target.checked })}
            />
            Seçili iyon için zar geçişi açık
          </label>
        )}
      </div>
      <p>
        {cargo === "water"
          ? "Bu deneyde zar suya açıktır; su, verilen uygun potansiyel farkıyla geçebilir."
          : cargo === "tracer"
            ? "Bu boya canlı hücre zarını geçmez. Duvar kaçağı, zarın bu özelliğini değiştirmez."
            : "İyon için seçilen geçit koşulu veridir. Bütün gerçek iyonların aynı taşıyıcıya bağlı olduğu söylenmez."}
      </p>
      <div className="bio023-controls">
        <Slider
          label="Başlangıç birimi"
          value={count}
          min={0}
          max={24}
          onChange={(count) => change({ count })}
        />
        <Slider
          label="Yolu izleme adımı"
          value={stage}
          min={0}
          max={3}
          onChange={(stage) => change({ stage })}
        />
      </div>
      <div data-live-model>
        <figure>
          <svg
            className="bio023-svg"
            viewBox="0 0 300 320"
            role="img"
            aria-labelledby={id}
          >
            <title id={id}>
              {`${rootRoutes023[route]} yolunda ${rootCargo023[cargo]} için verilen deneysel bariyer ve sayım`}
            </title>
            <defs>
              <marker
                id={`${id}-arrow`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path className="bio023-arrow-head" d="M0 0 L10 5 L0 10Z" />
              </marker>
            </defs>
            {[
              { y: 10, h: 50, label: "Toprak" },
              {
                y: 75,
                h: 70,
                label: route === "apoplast" ? "Duvar yolu" : "Hücre içi",
              },
              { y: 175, h: 50, label: "Endodermis" },
              { y: 250, h: 50, label: "Ksilem" },
            ].map((box, i) => (
              <g key={i}>
                <rect
                  className="bio023-cell"
                  x="20"
                  y={box.y}
                  width="260"
                  height={box.h}
                  rx="8"
                />
                <text x="35" y={box.y + box.h / 2 + 7}>
                  {box.label}
                </text>
              </g>
            ))}
            <path
              className={
                saved.bandIntact ? "bio023-band-line" : "bio023-band-broken"
              }
              d="M20 159 H280"
            />
            <path
              data-root-route={route}
              data-root-reached={m.reachedStage}
              className="bio023-route-line"
              d={`M246 35 V${Math.max(36, y)}`}
              markerEnd={`url(#${id}-arrow)`}
            />
            {Array.from({ length: count }, (_, i) => (
              <circle
                key={i}
                className="bio023-tracer"
                cx={205 + (i % 4) * 16}
                cy={y - 16 + Math.floor(i / 4) * 6}
                r="3"
              />
            ))}
            {!m.canPass && stage > m.reachedStage && (
              <path
                className="bio023-stop"
                d={
                  m.blockedAt === "entry"
                    ? "M225 58 L265 72 M265 58 L225 72"
                    : "M225 149 L265 169 M265 149 L225 169"
                }
              />
            )}
          </svg>
          <figcaption>
            Adım {stage}/3. Noktalar, verilmiş örnek birimlerini sayar; molekül
            boyu veya canlı kökte geçen gerçek oran değildir.
          </figcaption>
        </figure>
      </div>
      <div
        className="bio023-result"
        data-model-result
        data-root-arrived={m.arrived}
        data-root-can-pass={String(m.canPass)}
      >
        <strong>{m.verdict}</strong>
        <p>{m.evidence}</p>
        <p>
          Ksileme ulaşan: {m.arrived}/{count} birim. Henüz ulaşmayan:{" "}
          {m.notArrived} birim.
        </p>
        <p>
          {m.needsMembrane
            ? "Bu rota zar denetimi gerektirir."
            : "Verilen duvar kaçağı zar denetimini aşan deneysel yoldur."}
        </p>
      </div>
      <Compare
        value={saved}
        options={{ passes: "Geçebilir", blocked: "Yol engelli" }}
        expected={m.canPass ? "passes" : "blocked"}
        proof={m.evidence}
        change={change}
        validSelection={validSelection}
        compare={() => set({ checked: true })}
      />
    </section>
  );
}
export default function Forge023BiologyLab({ lessonId }: { lessonId: string }) {
  return lessonId === "bitki-ortu-doku" ? (
    <CoverLab />
  ) : lessonId === "bitki-kok-anatomisi" ? (
    <RootLab />
  ) : null;
}
