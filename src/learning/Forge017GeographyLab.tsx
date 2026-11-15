import { useId, useState, type ReactNode, type CSSProperties } from "react";
import { useExploration } from "./useExploration";
import {
  basins017,
  turkeyWater017,
  soilLayers017,
  soilProfiles017,
  worldSoil017,
  turkeySoils017,
  turkeySoil017,
  worldPlants017,
  worldPlant017,
  turkeyPlants017,
  turkeyPlant017,
  settlementPatterns017,
  worldSettlement017,
  turkeySettlements017,
  turkeySettlement017,
  populationProfiles017,
  population017,
} from "./forge017Geography";
import "./forge017Geography.css";
const clamp = (n: number, a: number, b: number) =>
  Number.isFinite(n) ? Math.min(b, Math.max(a, n)) : a;
const fmt = (n: number, d = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: d }).format(n);
function Diagram({
  title,
  description,
  children,
  height = 280,
  width = 400,
}: {
  title: string;
  description: string;
  children: ReactNode;
  height?: number;
  width?: number;
}) {
  const uid = useId();
  return (
    <svg
      className="g017-diagram"
      style={{ "--g017-arrow": `url(#${uid}-arrow)` } as CSSProperties}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby={`${uid}-title ${uid}-desc`}
    >
      <defs>
        <marker
          id={`${uid}-arrow`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path className="g017-flow-head" d="M1 1L9 5L1 9Z" />
        </marker>
      </defs>
      <title id={`${uid}-title`}>{title}</title>
      <desc id={`${uid}-desc`}>{description}</desc>
      {children}
    </svg>
  );
}
function Choice({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly (readonly [string, string])[];
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <div className="g017-control">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
      <output className="g017-selected" htmlFor={id}>
        Seçili: {options.find(([v]) => v === value)?.[1]}
      </output>
    </div>
  );
}
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
  const [draft, setDraft] = useState(String(value));
  const [editing, setEditing] = useState(false);
  const commit = () => {
    setEditing(false);
    if (draft.trim() === "" || !Number.isFinite(Number(draft))) return;
    const normalized =
      min + Math.round((clamp(Number(draft), min, max) - min) / step) * step;
    onChange(clamp(normalized, min, max));
  };
  return (
    <div className="g017-control">
      <label htmlFor={id}>
        {label}: <strong>{fmt(value)}</strong>
      </label>
      <input
        id={id}
        type="range"
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <input
        type="number"
        aria-label={`${label}, sayıyla`}
        value={editing ? draft : value}
        min={min}
        max={max}
        step={step}
        onFocus={() => {
          setDraft(String(value));
          setEditing(true);
        }}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
      />
    </div>
  );
}
function Prediction({
  id,
  signature,
  expected,
  options,
  explanation,
}: {
  id: string;
  signature: string;
  expected: string;
  options: readonly (readonly [string, string])[];
  explanation: string;
}) {
  const uid = useId();
  const [s, set] = useExploration(`forge017-geo-prediction-${id}`, {
    answer: "",
    reason: "",
    checkedFor: "",
  });
  const valid = options.some(([v]) => v === s.answer),
    checked =
      s.checkedFor === signature && valid && s.reason.trim().length >= 8;
  return (
    <div className="g017-prediction">
      <h4>Önce tahmin et</h4>
      <Choice
        label="Sonuç tahminin"
        value={valid ? s.answer : ""}
        options={[["", "Bir sonuç seç"], ...options]}
        onChange={(answer) => set({ answer, checkedFor: "" })}
      />
      <label htmlFor={uid}>Gerekçen</label>
      <textarea
        id={uid}
        value={s.reason.slice(0, 120)}
        maxLength={120}
        rows={3}
        onChange={(e) => set({ reason: e.target.value, checkedFor: "" })}
      />
      <p className="g017-help">
        En az 8 karakterle hangi veriyi kullandığını açıkla. Sonra tahminini
        kanıtla karşılaştır. Yazdığın gerekçe otomatik doğru sayılmaz.
      </p>
      <button
        type="button"
        className="button"
        disabled={!valid || s.reason.trim().length < 8}
        onClick={() => set({ checkedFor: signature })}
      >
        Tahmini dene
      </button>
      {checked && (
        <div className="g017-feedback" role="status" data-prediction-feedback>
          <strong>
            {s.answer === expected
              ? "Seçimin kanıtla uyumlu."
              : "Kanıtı yeniden izle."}
          </strong>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}
function Frame({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section className="forge017-geography-lab" data-forge017={id}>
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="g017-help">
        Bu keşif ve tahminler ayrı kayıtlıdır; XP ve ustalık vermez, konuyu
        bitmiş saymaz. Kendi başına çözülen sorular Sorular bölümünde yer alır.
      </p>
    </section>
  );
}
// Narrow display equivalents preserve the source model and its approved keys.
function displayText(text: string) {
  return text
    .replaceAll("yağışlı-kurak", "yağışlı ve kurak")
    .replaceAll(
      "ot topluluklarını destekleyebilir",
      "ot örtüsüne katkı verebilir",
    )
    .replaceAll("Tarım-sanayi", "Tarım ve sanayi");
}
const entries = (m: Record<string, { name: string }>) =>
  Object.entries(m).map(
    ([id, x]) => [id, x.name.replaceAll("–", " / ")] as const,
  );
const key = (m: object, k: string, fallback: string) =>
  Object.hasOwn(m, k) ? k : fallback;
function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (b: boolean) => void;
}) {
  return (
    <label className="g017-check">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="g017-fact">
      <span>{label}</span>
      <strong>{children}</strong>
    </div>
  );
}
function WaterLab() {
  const id = "turkiye-sulari",
    [s, set] = useExploration(`forge017-geo-${id}`, {
      basin: "aras",
      regulated: false,
    });
  const basin = key(basins017, s.basin, "aras"),
    m = turkeyWater017(basin, s.regulated),
    expected = m.closed ? "closed" : "open";
  return (
    <Frame
      id={id}
      title="Suyu son alıcıya izle"
      intro="Ülke sınırı ve havza türü ayrı veridir. Oklar rota şemasıdır; harita ölçeği yoktur."
    >
      <Choice
        label="Havza örneği"
        value={basin}
        options={entries(basins017)}
        onChange={(basin) => set({ basin })}
      />
      <Diagram
        title="Nehirden son alıcıya rota"
        description={`${m.name}: ${m.route}. Son alıcı ${m.end}.`}
        height={190}
      >
        <rect
          className="g017-land"
          x="20"
          y="50"
          width="90"
          height="65"
          rx="12"
        />
        <rect
          className="g017-land"
          x="155"
          y="50"
          width="90"
          height="65"
          rx="12"
        />
        <rect
          className={m.closed ? "g017-soil" : "g017-water"}
          x="290"
          y="50"
          width="90"
          height="65"
          rx="12"
        />
        <path className="g017-flow" d="M110 82H150" />
        <path className="g017-flow" d="M245 82H285" />
        <text x="65" y="88">
          Akış
        </text>
        <text x="200" y="88">
          Rota
        </text>
        <text x="335" y="88">
          Alıcı
        </text>
        <text x="200" y="155">
          {m.closed ? "Kapalı havza" : "Açık havza"}
        </text>
      </Diagram>
      <div data-model-result className="g017-result">
        <strong>{m.closed ? "Kapalı havza" : "Açık havza"}</strong>
        <p>
          Son alıcı: {m.end}.{" "}
          {m.cross ? "Ülke sınırı aşılır." : "Bu örnekte ülke sınırı aşılmaz."}
        </p>
        <p>{m.route}</p>
      </div>
      <p>{displayText(m.proof)}</p>
      <Check
        label="Temsilî depolama"
        checked={s.regulated}
        onChange={(regulated) => set({ regulated })}
      />
      <Diagram
        title="Dört mevsimde akış"
        description={`Mevsim sırası ${m.season.join(", ")} birim. Toplam 100.`}
        height={260}
      >
        <path className="g017-axis" d="M45 35V205H380" />
        {[0, 20, 40].map((n) => (
          <g key={n}>
            <text x="26" y={210 - n * 4}>
              {n}
            </text>
            <path className="g017-grid" d={`M45 ${205 - n * 4}H380`} />
          </g>
        ))}
        {m.season.map((n, i) => (
          <g key={i}>
            <rect
              className="g017-water"
              x={70 + i * 78}
              y={205 - n * 4}
              width="40"
              height={n * 4}
            />
            <text x={90 + i * 78} y="230">
              {["İlk", "Yaz", "Güz", "Kış"][i]}
            </text>
          </g>
        ))}
        <text x="200" y="20">
          Akış · temsilî birim
        </text>
      </Diagram>
      <p>
        Mevsim sırası: ilkbahar, yaz, güz, kış. Değerler: {m.season.join(" · ")}{" "}
        birim. Toplam {m.total}; en büyük ile en küçük farkı {m.range} birim.
      </p>
      <p>
        Bu özgün örnek gerçek nehir ölçümü değildir. Su kaybı verilmedi; toplam
        aynı kalır.
      </p>
      <Prediction
        id={id}
        signature={`${basin}-${s.regulated}`}
        expected={expected}
        options={[
          ["closed", "Kapalı havza"],
          ["open", "Açık havza"],
        ]}
        explanation={
          m.closed
            ? "Son alıcı dünya denizlerine doğal yüzey çıkışı olmayan alandır. Sınır aşma ayrı bir bilgidir."
            : "Rota dünya denizlerine bağlı alıcıda biter. Ülke sınırı ve akışın mevsimi başka bilgilerdir."
        }
      />
    </Frame>
  );
}
function WorldSoilLab() {
  const id = "dunya-topraklari",
    [s, set] = useExploration(`forge017-geo-${id}`, {
      profile: "podzol",
      layer: "E",
      transported: false,
    });
  const profile = key(soilProfiles017, s.profile, "podzol"),
    layer = key(soilLayers017, s.layer, "E"),
    m = worldSoil017(profile, layer, s.transported);
  const layerOpts = Object.keys(soilLayers017).map(
    (k) =>
      [
        k,
        `${k} · ${({ O: "Organik", A: "Üst kat", E: "Yıkanma", B: "Alt kat", C: "Ana madde", R: "Sağlam kaya" } as Record<string, string>)[k]}`,
      ] as const,
  );
  return (
    <Frame
      id={id}
      title="Toprağın katlarını aç"
      intro="Harfler süreçleri ayırır. Bu kesit ölçülü bir arazi profili değildir; kat kalınlıkları gerçek santimetre vermez."
    >
      <Choice
        label="Çevre örneği"
        value={profile}
        options={entries(soilProfiles017)}
        onChange={(profile) => set({ profile })}
      />
      <Check
        label="Yeni tortu örneği"
        checked={s.transported}
        onChange={(transported) => set({ transported })}
      />
      <Choice
        label="İncelenen kat"
        value={layer}
        options={layerOpts}
        onChange={(layer) => set({ layer })}
      />
      <Diagram
        title="Üstten alta toprak profili"
        description={`Bu örnekteki katlar ${m.layers.join(", ")}. Seçilen ${layer} ${m.present ? "var" : "verilmedi"}.`}
        height={365}
      >
        {m.layers.map((l, i) => (
          <g key={l}>
            <rect
              className={
                l === layer
                  ? "g017-active"
                  : l === "O"
                    ? "g017-leaf"
                    : l === "R"
                      ? "g017-rock"
                      : "g017-soil"
              }
              x="75"
              y={30 + i * 48}
              width="250"
              height="46"
            />
            <text x="200" y={60 + i * 48}>
              {l}
            </text>
          </g>
        ))}
        <text x="200" y="345">
          Üst yüzeyden sağlam kayaya
        </text>
      </Diagram>
      <div data-model-result className="g017-result">
        <strong>
          {layer} · {m.present ? "Kat var" : "Kat verilmedi"}
        </strong>
        <p>{m.selected.name}</p>
        <p>{m.selected.role}</p>
      </div>
      <p>{displayText(m.proof)}</p>
      <p>
        Şekildeki sıra: {m.layers.join(" → ")}. R sağlam kayadır; okulun D adı
        aynı alt kaya bağlamında kullanılabilir. Her profil bütün katları
        taşımaz.
      </p>
      <Prediction
        id={id}
        signature={`${profile}-${layer}-${s.transported}`}
        expected={m.present ? "yes" : "no"}
        options={[
          ["yes", "Seçili kat var"],
          ["no", "Kat verilmedi"],
        ]}
        explanation={
          m.present
            ? "Seçili harf bu örneğin kat listesinde var. Bu varlık her toprağın aynı katı taşıdığı anlamına gelmez."
            : "Seçili harf bu örnekte verilmedi. Özellikle yeni tortuda zamanla kat gelişimi olabilir; yokluğu sonsuz bir kural değildir."
        }
      />
    </Frame>
  );
}
function TurkeySoilLab() {
  const id = "turkiye-topraklari",
    [s, set] = useExploration(`forge017-geo-${id}`, {
      site: "alluvium",
      saline: false,
      drained: true,
    });
  const site = key(turkeySoils017, s.site, "alluvium"),
    m = turkeySoil017(site, s.saline, s.drained);
  const sites = Object.keys(turkeySoils017),
    active = sites.indexOf(site),
    ground = [180, 112, 150, 170, 95];
  return (
    <Frame
      id={id}
      title="Yamaçtan vadiye in"
      intro="Aynı bölgede farklı toprak bulunabilir. Kesit ve risk kartları özgün temsildir; verim ölçümü değildir."
    >
      <Choice
        label="Arazi konumu"
        value={site}
        options={entries(turkeySoils017)}
        onChange={(site) => set({ site })}
      />
      <Check
        label="Tuz riski var"
        checked={s.saline}
        onChange={(saline) => set({ saline })}
      />
      <Check
        label="Drenaj uygun"
        checked={s.drained}
        onChange={(drained) => set({ drained })}
      />
      <Diagram
        title="Beş özgün arazi konumu"
        description={`Seçili konum ${m.name}, ${m.family}. Tuz ${m.saline ? "var" : "yok olarak verildi"}, drenaj ${m.drained ? "uygun" : "sınırlı"}.`}
        height={300}
      >
        <path
          className="g017-land"
          d="M20 180L100 90L180 125L260 170L340 70L380 95V260H20Z"
        />
        {sites.map((v, i) => (
          <g key={v}>
            <rect
              className={v === site ? "g017-active" : "g017-soil"}
              x={25 + i * 76}
              y={ground[i]}
              width="45"
              height="60"
            />
            <text x={47 + i * 76} y="285">
              {i + 1}
            </text>
          </g>
        ))}
        {m.saline && (
          <g className="g017-alert">
            <circle cx={35 + active * 76} cy={ground[active] + 20} r="5" />
            <circle cx={55 + active * 76} cy={ground[active] + 42} r="5" />
          </g>
        )}
        {!m.drained && (
          <rect
            className="g017-water"
            x={25 + active * 76}
            y={ground[active] + 35}
            width="45"
            height="25"
          />
        )}
      </Diagram>
      <div data-model-result className="g017-result">
        <strong>{m.family}</strong>
        <p>
          {m.name} · {m.cause}
        </p>
        <p>{m.verdict}</p>
      </div>
      <p>{displayText(m.proof)}</p>
      <p>
        Şekilde numaralar aynı sırayla: vadi, kalkerli alan, nemli yamaç, iç
        bozkır, yüksek çayır. Renk adı tek başına ürün miktarı vermez.
      </p>
      <p>
        Tuz su alımını, kötü drenaj ise köklerde havayı etkileyebilir. İki baskı
        ayrı olabilir veya birlikte bulunabilir.
      </p>
      <Prediction
        id={id}
        signature={`${site}-${s.saline}-${s.drained}`}
        expected="more"
        options={[
          ["yield", "Kesin verim bilinir"],
          ["more", "Ek veri gerekir"],
        ]}
        explanation="Toprak adı ve iki risk kartı gerçek ürün miktarı vermez. Ekin türü, analiz, su, iklim ve yönetim de gerekir. Alüvyal adı tuz veya drenaj baskısını silmez."
      />
    </Frame>
  );
}
function PlantDrawing({ community }: { community: string }) {
  const m = worldPlant017(community, false),
    tree = community === "rainforest" || community === "taiga";
  return (
    <Diagram
      title={`${m.name} yapı şeması`}
      description={`${m.group}. Bu özgün çizim gerçek tür sayısı veya alan ölçümü değildir.`}
      height={280}
    >
      <path className="g017-land" d="M20 230H380V255H20Z" />
      {tree
        ? [70, 145, 220, 305].map((x, i) => (
            <g key={x}>
              <path
                className="g017-trunk"
                d={`M${x} 230V${95 + (i % 2) * 35}`}
              />
              {community === "taiga" ? (
                <path className="g017-leaf" d={`M${x} 55l-35 95h70Z`} />
              ) : (
                <>
                  <circle
                    className="g017-leaf"
                    cx={x}
                    cy={70 + (i % 2) * 30}
                    r="40"
                  />
                  {i % 2 === 0 && (
                    <circle className="g017-leaf" cx={x + 25} cy="165" r="23" />
                  )}
                </>
              )}
            </g>
          ))
        : [45, 90, 140, 190, 245, 300, 350].map((x, i) => (
            <g key={x}>
              <path
                className="g017-plant-line"
                d={`M${x} 230q-25 -${community === "tundra" ? 18 : 60} -15 -${community === "tundra" ? 20 : 65}M${x} 230q25 -${community === "maki" ? 70 : 35} 18 -${community === "maki" ? 75 : 40}`}
              />
              {(community === "maki" ||
                (community === "savanna" && i === 3)) && (
                <circle
                  className="g017-leaf"
                  cx={x}
                  cy={community === "maki" ? 185 : 145}
                  r={community === "maki" ? 30 : 40}
                />
              )}
            </g>
          ))}
      <text x="200" y="24">
        {m.group}
      </text>
    </Diagram>
  );
}
function WorldPlantLab() {
  const id = "dunya-bitkileri",
    [s, set] = useExploration(`forge017-geo-${id}`, {
      community: "rainforest",
      summerDry: false,
    });
  const community = key(worldPlants017, s.community, "rainforest"),
    m = worldPlant017(community, s.summerDry);
  return (
    <Frame
      id={id}
      title="Örtü ve suyu ayrı oku"
      intro="Topluluk seçimi yapı şemasını değiştirir. Yağış dizisi bağımsız bir koşuldur; tek başına kesin bitki türü üretmez."
    >
      <Choice
        label="Bitki topluluğu"
        value={community}
        options={entries(worldPlants017)}
        onChange={(community) => set({ community })}
      />
      <PlantDrawing community={community} />
      <div data-model-result className="g017-result">
        <strong>{m.name}</strong>
        <p>
          Yapı: {m.group}.{" "}
          {m.cold ? "Soğuk dönem önemli." : "Su ve sıcaklık birlikte önemli."}
        </p>
      </div>
      <p>{displayText(m.proof)}</p>
      <Check
        label="Yaz kurak dizi"
        checked={s.summerDry}
        onChange={(summerDry) => set({ summerDry })}
      />
      <Diagram
        title="Aylık özgün yağış dizisi"
        description={`Aylık sıra ${m.monthly.join(", ")} mm; toplam ${m.total} mm.`}
        height={275}
      >
        <path className="g017-axis" d="M45 35V220H385" />
        {[0, 40, 80].map((n) => (
          <g key={n}>
            <text x="26" y={225 - n * 2}>
              {n}
            </text>
            <path className="g017-grid" d={`M45 ${220 - n * 2}H385`} />
          </g>
        ))}
        {m.monthly.map((n, i) => (
          <g key={i}>
            <rect
              className="g017-water"
              x={53 + i * 27}
              y={220 - n * 2}
              width="17"
              height={n * 2}
            />
            <text className="g017-small-svg" x={61 + i * 27} y="244">
              {i + 1}
            </text>
          </g>
        ))}
        <text x="200" y="20">
          Yağış · mm / ay sırası
        </text>
      </Diagram>
      <p>
        Ocak–aralık sıra değerleri: {m.monthly.join(" · ")} mm. Toplam {m.total}{" "}
        mm; en az yağışlı ay {m.minimum} mm. İki dizinin toplamı aynı, dağılımı
        farklıdır.
      </p>
      <p>
        Bu gerçek bir kent normali değildir. Sıcaklık, toprak ve geçmiş olmadan
        yağıştan kesin tür çıkarma.
      </p>
      <Prediction
        id={id}
        signature={`${community}-${s.summerDry}`}
        expected="more"
        options={[
          ["same", "Toplam tek başına yeter"],
          ["more", "Ek koşul gerekir"],
        ]}
        explanation="Aynı 600 mm farklı aylara dağılır. Su stresi sıcaklık, büyüme dönemi ve toprağa da bağlıdır; seçili çizim yağıştan otomatik üretilmiş gerçek tür haritası değildir."
      />
    </Frame>
  );
}
function TurkeyPlantLab() {
  const id = "turkiye-bitkileri",
    [s, set] = useExploration(`forge017-geo-${id}`, {
      site: "black",
      elevation: 600,
      disturbed: false,
    });
  const site = key(turkeyPlants017, s.site, "black"),
    elevation = clamp(s.elevation, 0, 3000),
    m = turkeyPlant017(site, elevation, s.disturbed),
    left = site === "black" || site === "med",
    x = left ? 40 + (160 * elevation) / 3000 : 360 - (160 * elevation) / 3000,
    y = 300 - (240 * elevation) / 3000;
  return (
    <Frame
      id={id}
      title="Yamaçta konum seç"
      intro="Denize açıklık, yükselti ve insan etkisi ayrı koşullardır. Görsel duraklar gerçek bir dağın tür sınırı değildir."
    >
      <Choice
        label="Çevre örneği"
        value={site}
        options={entries(turkeyPlants017)}
        onChange={(site) => set({ site })}
      />
      <Range
        label="Yükselti (m)"
        value={elevation}
        min={0}
        max={3000}
        step={100}
        onChange={(elevation) => set({ elevation })}
      />
      <Check
        label="Örtü kaybı örneği"
        checked={s.disturbed}
        onChange={(disturbed) => set({ disturbed })}
      />
      <Diagram
        title="Denizden dağ yamacına özgün kesit"
        description={`Seçili ${m.name}; ${fmt(elevation)} metre. ${m.cover}. Görsel kuşaklar gerçek tür ölçümü değildir.`}
        height={360}
      >
        <path className="g017-water" d="M10 300H75V330H10Z" />
        <path className="g017-land" d="M40 300L200 60L360 300V330H40Z" />
        {[1200, 2200].map((n) => (
          <path
            className="g017-grid"
            key={n}
            d={`M20 ${300 - (240 * n) / 3000}H380`}
          />
        ))}
        <path
          className="g017-flow"
          d={left ? "M20 190Q55 145 95 155" : "M380 185Q335 150 310 155"}
        />
        <g transform={`translate(${x} ${y})`}>
          <path
            className="g017-trunk"
            d={m.disturbed ? "M0 0V-18" : "M0 0V-55"}
          />
          {!m.disturbed && (
            <circle className="g017-leaf" cx="0" cy="-65" r="22" />
          )}
          <circle className="g017-dot" cx="0" cy="0" r="5" />
        </g>
        <text x="43" y="350">
          Deniz
        </text>
        <text x="200" y="30">
          Özgün kesit
        </text>
        <text x="312" y="350">
          İç kesim
        </text>
      </Diagram>
      <div data-model-result className="g017-result">
        <strong>{fmt(elevation)} m</strong>
        <p>
          {m.band} · {m.cover}
        </p>
      </div>
      <p>{displayText(m.proof)}</p>
      <p>
        1.200 ve 2.200 m çizgileri bu kesitin duraklarıdır. Bakı, nem ve iklim
        değişirse gerçek bitki sınırları değişir. Örtü kaybı kesin yeni tür adı
        vermez.
      </p>
      <details>
        <summary>İki kavramı ayır</summary>
        <p>
          Endemik: doğal yayılış alanı sınırlı. Relikt: eski geniş veya farklı
          dağılışın kalıntısı. Bir tür ikisini birlikte taşıyabilir; endemik
          olmak mutlaka az bireyli olmak değildir.
        </p>
      </details>
      <Prediction
        id={id}
        signature={`${site}-${elevation}-${s.disturbed}`}
        expected="context"
        options={[
          ["fixed", "Her yerde aynı sınır"],
          ["context", "Koşula bağlı sınır"],
        ]}
        explanation="Yükselti tek etken değildir. Deniz etkisi, bakı, nem, ana malzeme ve geçmiş sınırı değiştirir. Model sayısını bütün dağların kesin tür sınırı sayma."
      />
    </Frame>
  );
}
function House({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect className="g017-house" x="-10" y="-10" width="20" height="18" />
      <path className="g017-roof" d="M-14 -10L0 -24L14 -10Z" />
      <path className="g017-door" d="M-3 8V-2H3V8" />
    </g>
  );
}
function WorldSettlementLab() {
  const id = "dunya-yerlesmeleri",
    [s, set] = useExploration(`forge017-geo-${id}`, {
      pattern: "cluster",
      months: 12,
    });
  const pattern = key(settlementPatterns017, s.pattern, "cluster"),
    months = Math.round(clamp(s.months, 1, 12)),
    m = worldSettlement017(pattern, months);
  return (
    <Frame
      id={id}
      title="Aynı evleri farklı diz"
      intro="Sekiz konutun yeri değişir; sayı aynı kalır. Bu ölçekli plan veya nüfus sayımı değildir."
    >
      <Choice
        label="Yerleşme dokusu"
        value={pattern}
        options={entries(settlementPatterns017)}
        onChange={(pattern) => set({ pattern })}
      />
      <Range
        label="Kullanım ayı"
        value={months}
        min={1}
        max={12}
        onChange={(months) => set({ months })}
      />
      <Diagram
        title={`${m.name} konut düzeni`}
        description={`Sekiz konut; ${m.months} ay kullanım. Şekil nüfus veya idari statü vermez.`}
        height={310}
      >
        <rect
          className="g017-ground"
          x="12"
          y="22"
          width="376"
          height="255"
          rx="18"
        />
        {pattern === "line" ? (
          <path className="g017-road" d="M20 91L360 261" />
        ) : pattern === "circle" ? (
          <circle className="g017-road" cx="200" cy="150" r="90" />
        ) : (
          <circle className="g017-water" cx="200" cy="150" r="12" />
        )}
        {m.points.map(([x, y], i) => (
          <House key={i} x={x} y={y} />
        ))}
        <text x="200" y="300">
          8 konut · sayı sabit
        </text>
      </Diagram>
      <div data-model-result className="g017-result">
        <strong>{m.name} doku</strong>
        <p>
          {m.houses} konut · {months} ay · {m.duration}
        </p>
      </div>
      <p>{m.limit}</p>
      <p>
        Toplu ve dağınık konut aralığını; çizgisel ve dairesel plan biçimini
        anlatır. Kullanım süresi başka bir eksendir. Ev sayısı, kişi sayısı
        değildir.
      </p>
      <Prediction
        id={id}
        signature={`${pattern}-${months}`}
        expected="same"
        options={[
          ["same", "Konut sayısı aynı"],
          ["growth", "Nüfus artışı kesin"],
        ]}
        explanation="Dört planda da sekiz konut var. Konumlar doku bilgisidir; bir evde kaç kişi kaldığı verilmedi. Ay sayısı da kullanım süresini tanımlar, kişi sayısını vermez."
      />
    </Frame>
  );
}
function TurkeySettlementLab() {
  const id = "turkiye-yerlesmeleri",
    [s, set] = useExploration(`forge017-geo-${id}`, {
      city: "ankara",
      seasonal: false,
    });
  const city = key(turkeySettlements017, s.city, "ankara"),
    m = turkeySettlement017(city, s.seasonal),
    nodes = [
      [200, 45],
      [70, 215],
      [330, 215],
    ];
  return (
    <Frame
      id={id}
      title="Kentte işlevleri bağla"
      intro="Şehirlerin birden çok işi olabilir. Çizgi kalınlığı ve daire boyu gerçek istihdam veya nüfus payı vermez."
    >
      <Choice
        label="Şehir örneği"
        value={city}
        options={entries(turkeySettlements017)}
        onChange={(city) => set({ city })}
      />
      <Diagram
        title={`${m.name} işlev ağı`}
        description={`${m.functions.join(", ")} birlikte gösterilir. Gerçek sektör oranı değildir.`}
        height={300}
      >
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <path className="g017-link" d={`M200 140L${x} ${y}`} />
            <circle className="g017-land" cx={x} cy={y} r="42" />
            <text x={x} y={y + 5}>
              {i + 1}
            </text>
          </g>
        ))}
        <rect
          className="g017-active"
          x="125"
          y="108"
          width="150"
          height="64"
          rx="20"
        />
        <text x="200" y="146">
          {m.name}
        </text>
        <text x="200" y="285">
          Üç işlev birlikte
        </text>
      </Diagram>
      <div data-model-result className="g017-result">
        <strong>{m.name}</strong>
        <p>{m.functions.map((f, i) => `${i + 1}. ${f}`).join(" · ")}</p>
      </div>
      <p>{displayText(m.proof)}</p>
      <Check
        label="Ayrı yayla örneği"
        checked={s.seasonal}
        onChange={(seasonal) => set({ seasonal })}
      />
      <Diagram
        title="İki kullanım takvimi"
        description={`${m.duration}. Ayrı yayla, seçili kentin turist sayımı değildir.`}
        height={160}
      >
        {m.occupied.map((occupied, i) => (
          <g key={i}>
            <rect
              className={occupied ? "g017-leaf" : "g017-empty"}
              x={20 + i * 30}
              y="45"
              width="24"
              height="60"
              rx="4"
            />
            <text className="g017-small-svg" x={32 + i * 30} y="128">
              {i + 1}
            </text>
          </g>
        ))}
        <text x="200" y="22">
          Ay sırası · ocak–aralık
        </text>
      </Diagram>
      <p>
        {m.duration}.{" "}
        {s.seasonal
          ? "Mayıs, haziran, temmuz, ağustos, eylül: beş ay. Bu ayrı bir yayla kartıdır."
          : "Kent konutları yıl boyunca kullanılır; turist sayısının mevsimi ayrı veridir."}
      </p>
      <p>
        İl, kent dokusu ve mahalle aynı idari alan değildir. Tek işlevden her
        bireyin mesleği veya hukuki statü bulunmaz.
      </p>
      <Prediction
        id={id}
        signature={`${city}-${s.seasonal}`}
        expected="many"
        options={[
          ["many", "İşlevler birlikte"],
          ["single", "Herkes tek meslekte"],
        ]}
        explanation="Seçilen şehirde üç işlev aynı anda gösterilir. Baskın işlev tüm bireylerin mesleği değildir. Ayrı yayla takvimi ise kentteki turizm mevsiminin ölçümü değildir."
      />
    </Frame>
  );
}
function PopulationLab() {
  const id = "nufus-onemi-ozellikleri",
    [s, set] = useExploration(`forge017-geo-${id}`, {
      profile: "balanced",
      total: 100000,
      area: 1000,
      births: 1200,
      deaths: 800,
      inflow: 300,
      outflow: 900,
    });
  const profile = key(populationProfiles017, s.profile, "balanced"),
    m = population017(
      profile,
      clamp(s.total, 10000, 1000000),
      clamp(s.area, 100, 10000),
      clamp(s.births, 0, 5000),
      clamp(s.deaths, 0, 5000),
      clamp(s.inflow, 0, 5000),
      clamp(s.outflow, 0, 5000),
    );
  return (
    <Frame
      id={id}
      title="Piramitte paydayı oku"
      intro="Üç yaş grubu ve iki cinsiyet toplam nüfusa göre yüzdedir. Profiller özgündür; gerçek ülke sayımı değildir."
    >
      <Choice
        label="Yaş profili"
        value={profile}
        options={[
          ["young", "Genç payı yüksek"],
          ["balanced", "Orta pay örneği"],
          ["aged", "Yaşlı payı yüksek"],
        ]}
        onChange={(profile) => set({ profile })}
      />
      <Range
        label="Toplam kişi"
        value={m.total}
        min={10000}
        max={1000000}
        step={10000}
        onChange={(total) => set({ total })}
      />
      <Diagram
        title="Toplam nüfusa göre yaş ve cinsiyet"
        description={`Genç yüzde ${m.young}, çalışma çağı ${m.working}, yaşlı ${m.old}. Erkek ve kadın barları toplam nüfusa göredir.`}
        height={340}
      >
        <text x="105" y="30">
          Erkek
        </text>
        <text x="295" y="30">
          Kadın
        </text>
        {[2, 1, 0].map((age, row) => (
          <g key={age}>
            <rect
              className="g017-water"
              x={180 - m.male[age] * 3.5}
              y={70 + row * 60}
              width={m.male[age] * 3.5}
              height="40"
            />
            <rect
              className="g017-leaf"
              x="220"
              y={70 + row * 60}
              width={m.female[age] * 3.5}
              height="40"
            />
            <text className="g017-small-svg" x="200" y={95 + row * 60}>
              {["0–14", "15–64", "65+"][age]}
            </text>
          </g>
        ))}
        <path className="g017-axis" d="M40 260H180M220 260H360" />
        {[0, 20, 40].map((n) => (
          <g key={n}>
            <text className="g017-small-svg" x={180 - n * 3.5} y="285">
              {n}
            </text>
            <text className="g017-small-svg" x={220 + n * 3.5} y="285">
              {n}
            </text>
          </g>
        ))}
        <text x="200" y="320">
          Yüzde · toplam nüfus paydası
        </text>
      </Diagram>
      <div data-model-result className="g017-result">
        <strong>Özgün yaş profili</strong>
        <p>
          Toplam {fmt(m.total)} kişi. Genç %{m.young}; çalışma çağı %{m.working}
          ; yaşlı %{m.old}.
        </p>
      </div>
      <div className="g017-facts">
        <Fact label="0–14 yaş">{fmt((m.total * m.young) / 100)} kişi</Fact>
        <Fact label="15–64 yaş">{fmt((m.total * m.working) / 100)} kişi</Fact>
        <Fact label="65 ve üstü">{fmt((m.total * m.old) / 100)} kişi</Fact>
      </div>
      <p>
        Erkek sıra payları: {m.male.join(" · ")}; kadın sıra payları:{" "}
        {m.female.join(" · ")}. Sıra: 0–14, 15–64, 65+. Altı barın payı birlikte
        %100. Bunlar her cinsiyetin kendi içindeki yüzdesi değildir.
      </p>
      <details>
        <summary>Alan ve dönem akışları</summary>
        <Range
          label="Alan (km²)"
          value={m.area}
          min={100}
          max={10000}
          step={100}
          onChange={(area) => set({ area })}
        />
        <Range
          label="Dönem doğumu"
          value={s.births}
          min={0}
          max={5000}
          step={100}
          onChange={(births) => set({ births })}
        />
        <Range
          label="Dönem ölümü"
          value={s.deaths}
          min={0}
          max={5000}
          step={100}
          onChange={(deaths) => set({ deaths })}
        />
        <Range
          label="Gelen kişi"
          value={s.inflow}
          min={0}
          max={5000}
          step={100}
          onChange={(inflow) => set({ inflow })}
        />
        <Range
          label="Giden kişi"
          value={s.outflow}
          min={0}
          max={5000}
          step={100}
          onChange={(outflow) => set({ outflow })}
        />
      </details>
      <p>
        Yaşa dayalı bağımlılık oranı: ({m.young}+{m.old})/{m.working} × 100 = %
        {fmt(m.dependency)}. Bu gerçek çalışan veya bakım yükü sayımı değildir.
      </p>
      <p>
        Doğal değişim {fmt(s.births)} − {fmt(s.deaths)} = {fmt(m.natural)} kişi.
        Net göç {fmt(s.inflow)} − {fmt(s.outflow)} = {fmt(m.migration)} kişi.
        Gerçek değişim {fmt(m.change)}; son nüfus {fmt(m.final)} kişi.
      </p>
      <p>
        Başlangıca göre değişim {fmt(m.rate)}‰. Başlangıç aritmetik yoğunluk{" "}
        {fmt(m.total)} / {fmt(m.area)} = {fmt(m.density)} kişi/km². Ortalama,
        her noktada aynı sayı demek değildir.
      </p>
      <Prediction
        id={id}
        signature={`${profile}-${m.total}-${m.area}-${s.births}-${s.deaths}-${s.inflow}-${s.outflow}`}
        expected="age"
        options={[
          ["age", "Yaş grubu bilinir"],
          ["jobs", "Çalışan sayı bilinir"],
        ]}
        explanation="15–64 bir yaş sınıfıdır. Bu gruptaki herkes fiilen çalışmaz; gerçek istihdam için ek veri gerekir. Piramit eğitim, gelir veya beklenen ömür değerini de tek başına vermez."
      />
    </Frame>
  );
}
export default function Forge017GeographyLab({
  lessonId,
}: {
  lessonId: string;
}) {
  switch (lessonId) {
    case "turkiye-sulari":
      return <WaterLab />;
    case "dunya-topraklari":
      return <WorldSoilLab />;
    case "turkiye-topraklari":
      return <TurkeySoilLab />;
    case "dunya-bitkileri":
      return <WorldPlantLab />;
    case "turkiye-bitkileri":
      return <TurkeyPlantLab />;
    case "dunya-yerlesmeleri":
      return <WorldSettlementLab />;
    case "turkiye-yerlesmeleri":
      return <TurkeySettlementLab />;
    case "nufus-onemi-ozellikleri":
      return <PopulationLab />;
    default:
      return null;
  }
}
