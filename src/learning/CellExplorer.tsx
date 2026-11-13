import { useId, type ReactNode } from "react";
import { useApp } from "../store";
import { txt as text } from "../domain/model";
import { useExploration } from "./useExploration";
import { useVisualCopy } from "./copy";
const parts = [
  {
    id: "nucleus",
    name: text("Çekirdek"),
    structure: text("Çift zarlı yapı"),
    description: text(
      "Çekirdekteki DNA kalıtsal bilgiyi taşır. Bu bilginin bir bölümü RNA’ya aktarılır. Tipik ökaryot hücrede bulunur; olgun insan alyuvarı gibi özelleşmiş istisnalar vardır.",
    ),
  },
  {
    id: "mitochondrion",
    name: text("Mitokondri"),
    structure: text("Çift zarlı organel"),
    description: text(
      "Oksijenli solunumun önemli basamakları burada gerçekleşir. Besinlerdeki enerjinin ATP’ye aktarılmasında rol alır. Hem hayvan hem bitki hücrelerinde bulunabilir.",
    ),
  },
  {
    id: "ribosome",
    name: text("Ribozom"),
    structure: text("Zarsız organel"),
    description: text(
      "mRNA bilgisine göre amino asitleri birleştirerek protein sentezler. Prokaryotlarda da bulunur. Sitoplazmada serbest veya granüllü ER’ye bağlı olabilir.",
    ),
  },
  {
    id: "er",
    name: text("Endoplazmik retikulum"),
    structure: text("Tek zarlı organel"),
    description: text(
      "Granüllü ER’nin yüzeyinde ribozomlar bulunur; salgılanacak bazı proteinlerin işlenmesi ve taşınmasına katılır. Granülsüz ER, lipit sentezi gibi görevler üstlenir.",
    ),
  },
  {
    id: "golgi",
    name: text("Golgi aygıtı"),
    structure: text("Tek zarlı organel"),
    description: text(
      "ER’den gelen bazı ürünleri değiştirir, sınıflandırır ve veziküllere paketler. Protein sentezi yapan yapı Golgi değil, ribozomdur.",
    ),
  },
  {
    id: "membrane",
    name: text("Hücre zarı"),
    structure: text("Organel değil; hücrenin seçici sınırı"),
    description: text(
      "Çift katlı lipit tabakası ve proteinlerden oluşur. Madde geçişini düzenler. “Çift katlı lipit” ifadesi, mitokondrideki gibi iki ayrı zar demek değildir.",
    ),
  },
  {
    id: "vacuole",
    name: text("Koful"),
    structure: text("Tek zarlı organel"),
    description: text(
      "Depolama ve hücre içi dengeye katılır. Olgun bitki hücrelerindeki büyük merkezî koful, turgor basıncında önemli rol oynar.",
    ),
  },
  {
    id: "chloroplast",
    name: text("Kloroplast"),
    structure: text("Çift zarlı plastit"),
    description: text(
      "Fotosentezde ışık enerjisinin kimyasal enerjiye dönüştürülmesine katılır. Yeşil bitki hücrelerinde görülebilir; kök gibi her bitki hücresinde bulunması gerekmez.",
    ),
  },
  {
    id: "lysosome",
    name: text("Lizozom"),
    structure: text("Tek zarlı organel"),
    description: text(
      "Hücre içi sindirimde enzimleriyle görev alır. Tipik hayvan hücresi şemasında gösterilir. Bitkilerde bazı benzer yıkım görevlerini litik kofullar üstlenebilir.",
    ),
  },
  {
    id: "peroxisome",
    name: text("Peroksizom"),
    structure: text("Tek zarlı organel"),
    description: text(
      "Bazı oksidasyon tepkimelerinde ve hidrojen peroksidin parçalanmasında görev alır. Katalaz enzimi bu ilişkiye örnektir. Mitokondriyle aynı yapı değildir.",
    ),
  },
  {
    id: "centrosome",
    name: text("Sentrozom"),
    structure: text("Zarsız yapı"),
    description: text(
      "Tipik hayvan hücresinde mikrotübüllerin düzenlenmesine katılır. Şemadaki sentriyollü yapı yüksek yapılı bitkilerin tipik hücrelerinde gösterilmez. İğ ipliklerini yalnız sentrozom varlığıyla açıklama.",
    ),
  },
  {
    id: "cytoskeleton",
    name: text("Hücre iskeleti"),
    structure: text("Zarsız protein ağı"),
    description: text(
      "Hücre şekline, harekete ve hücre içi taşımaya katılan proteinlerden oluşur. Mikrotübüller ve mikrofilamentler bu ağın elemanlarıdır.",
    ),
  },
  {
    id: "wall",
    name: text("Hücre duvarı"),
    structure: text("Organel değil; zarın dışında destek"),
    description: text(
      "Bitki hücresinde temel yapısal maddesi selülozdur. Destek ve biçim sağlar. Hayvan hücrelerinde bulunmaz; hücre zarıyla karıştırılmamalıdır.",
    ),
  },
  {
    id: "cytoplasm",
    name: text("Sitoplazma"),
    structure: text("Sitozol, organeller ve hücre iskeleti"),
    description: text(
      "Ökaryot hücrede hücre zarı ile çekirdek arasındaki içeriği kapsar. Yalnızca “su dolu boşluk” değildir; birçok tepkime burada gerçekleşir.",
    ),
  },
];
function Part({
  id,
  label,
  selected,
  choose,
  children,
}: {
  id: string;
  label: string;
  selected: boolean;
  choose: (id: string) => void;
  children: ReactNode;
}) {
  return (
    <g
      className={`cell-part ${selected ? "selected" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={selected}
      onClick={() => choose(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          choose(id);
        }
      }}
    >
      <title>{label}</title>
      {children}
    </g>
  );
}
const route = ["nucleus", "ribosome", "er", "golgi", "membrane"];
export default function CellExplorer() {
  const { l } = useApp();
  const v = useVisualCopy();
  const [s, set] = useExploration("cell", {
    plant: false,
    selected: "nucleus",
    route: false,
    step: 0,
  });
  const uid = useId().replaceAll(":", "");
  const available = parts.filter((p) =>
    s.plant
      ? !["lysosome", "centrosome"].includes(p.id)
      : !["chloroplast", "wall"].includes(p.id),
  );
  const part = available.find((p) => p.id === s.selected) ?? parts[0];
  const step = Math.max(0, Math.min(4, Math.round(s.step)));
  const select = (id: string) => set({ selected: id, route: false });
  const partProps = (id: string) => ({
    id,
    label: l(parts.find((p) => p.id === id)!.name),
    selected: part.id === id,
    choose: select,
  });
  const advance = (n: number) => {
    const next = Math.max(0, Math.min(4, n));
    set({ step: next, selected: route[next], route: true });
  };
  return (
    <section className="visual-lab cell-lab" aria-labelledby={`${uid}-title`}>
      <div className="lab-heading">
        <h2 id={`${uid}-title`}>{v("cellTitle")}</h2>
        <p>{v("cellHelp")}</p>
      </div>
      <div className="segmented" aria-label={v("cellDiagram")}>
        <button
          aria-pressed={!s.plant}
          className={!s.plant ? "active" : ""}
          onClick={() =>
            set({
              plant: false,
              selected: ["wall", "chloroplast"].includes(s.selected)
                ? "nucleus"
                : s.selected,
            })
          }
        >
          {v("animal")}
        </button>
        <button
          aria-pressed={s.plant}
          className={s.plant ? "active" : ""}
          onClick={() =>
            set({
              plant: true,
              selected: ["lysosome", "centrosome"].includes(s.selected)
                ? "nucleus"
                : s.selected,
            })
          }
        >
          {v("plant")}
        </button>
      </div>
      <div className="cell-workbench">
        <svg
          viewBox="0 0 600 400"
          role="group"
          aria-label={v("cellDiagram")}
          className="cell-figure"
        >
          <defs>
            <linearGradient id={`${uid}-cyto`} x2="1" y2="1">
              <stop stopColor="#e1f0dd" />
              <stop offset="1" stopColor="#c4ddda" />
            </linearGradient>
          </defs>
          {s.plant && (
            <Part {...partProps("wall")}>
              <rect
                x="22"
                y="24"
                width="555"
                height="350"
                rx="62"
                fill="#b2cf97"
                stroke="#557b52"
                strokeWidth="10"
              />
            </Part>
          )}
          <Part {...partProps("cytoplasm")}>
            {s.plant ? (
              <rect
                x="38"
                y="40"
                width="525"
                height="318"
                rx="50"
                fill={`url(#${uid}-cyto)`}
              />
            ) : (
              <path
                d="M42 210 C18 100 123 28 284 40 C428 15 566 76 568 201 C580 314 463 377 293 357 C139 385 47 321 42 210Z"
                fill={`url(#${uid}-cyto)`}
              />
            )}
          </Part>
          <Part {...partProps("membrane")}>
            {s.plant ? (
              <rect
                x="38"
                y="40"
                width="525"
                height="318"
                rx="50"
                fill="none"
                stroke="#518b7c"
                strokeWidth="5"
                pointerEvents="stroke"
              />
            ) : (
              <path
                d="M42 210 C18 100 123 28 284 40 C428 15 566 76 568 201 C580 314 463 377 293 357 C139 385 47 321 42 210Z"
                fill="none"
                stroke="#518b7c"
                strokeWidth="6"
                pointerEvents="stroke"
              />
            )}
          </Part>
          <Part {...partProps("vacuole")}>
            <ellipse
              cx={s.plant ? 435 : 454}
              cy={s.plant ? 200 : 286}
              rx={s.plant ? 90 : 44}
              ry={s.plant ? 80 : 28}
              fill="#a7d5ea"
              stroke="#5790a6"
              strokeWidth="3"
            />
          </Part>
          <Part {...partProps("er")}>
            <path
              d="M245 119 C293 102 315 127 290 149 C324 156 314 180 285 183 C322 202 299 222 266 218 M250 133 C280 122 295 139 271 153 M255 173 C294 166 307 191 266 198"
              fill="none"
              stroke="#ba879f"
              strokeWidth="12"
              strokeLinecap="round"
            />
          </Part>
          <Part {...partProps("nucleus")}>
            <ellipse
              cx="203"
              cy="178"
              rx="66"
              ry="73"
              fill="#a49bc9"
              stroke="#6e608d"
              strokeWidth="4"
            />
            <ellipse
              cx="203"
              cy="178"
              rx="58"
              ry="65"
              fill="none"
              stroke="#77688f"
              strokeWidth="2"
            />
            <circle cx="217" cy="186" r="21" fill="#706087" />
            <path
              d="M170 153q35-20 39 10t-29 32m18-61q-18 25 13 20"
              fill="none"
              stroke="#e6def1"
              strokeWidth="3"
            />
          </Part>
          <Part {...partProps("ribosome")}>
            <circle cx="278" cy="142" r="24" fill="transparent" />
            <g fill="#645f87">
              {[
                [271, 132],
                [283, 148],
                [272, 166],
                [285, 184],
                [307, 143],
                [110, 172],
                [122, 250],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="5" />
              ))}
            </g>
          </Part>
          <Part {...partProps("golgi")}>
            <g transform={s.plant ? "translate(-30 38)" : undefined}>
              <g
                stroke="#c68757"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              >
                <path d="M316 260q40-26 81 0M321 275q34-24 69 0M328 289q25-20 55 0" />
              </g>
              <circle
                cx="408"
                cy="264"
                r="10"
                fill="#e2af79"
                stroke="#b88154"
                strokeWidth="2"
              />
            </g>
          </Part>
          <Part {...partProps("mitochondrion")}>
            <g transform="rotate(-22 137 294)">
              <ellipse
                cx="137"
                cy="294"
                rx="49"
                ry="24"
                fill="#e4ac91"
                stroke="#ac735e"
                strokeWidth="3"
              />
              <path
                d="M102 293q13-23 17 0t15 0t15 0t16 0"
                fill="none"
                stroke="#ae6a5b"
                strokeWidth="3"
              />
            </g>
            <g transform="rotate(18 415 84)">
              <ellipse
                cx="415"
                cy="84"
                rx="40"
                ry="20"
                fill="#e4ac91"
                stroke="#ac735e"
                strokeWidth="3"
              />
              <path
                d="M389 84q9-17 13 0t14 0t15 0"
                fill="none"
                stroke="#ae6a5b"
                strokeWidth="3"
              />
            </g>
          </Part>
          {s.plant && (
            <Part {...partProps("chloroplast")}>
              <ellipse
                cx="96"
                cy="100"
                rx="39"
                ry="23"
                fill="#8eb880"
                stroke="#4b754b"
                strokeWidth="3"
              />
              <path
                d="M78 89v22m12-26v28m12-24v22m12-20v17"
                stroke="#456e49"
                strokeWidth="7"
              />
            </Part>
          )}
          <Part {...partProps("peroxisome")}>
            <circle
              cx="106"
              cy="213"
              r="17"
              fill="#d5c58f"
              stroke="#8c8057"
              strokeWidth="2"
            />
            <path d="M98 213h16m-8-8v16" stroke="#8c8057" strokeWidth="2" />
          </Part>
          {!s.plant && (
            <>
              <Part {...partProps("lysosome")}>
                <circle
                  cx="463"
                  cy="228"
                  r="20"
                  fill="#c0accf"
                  stroke="#8e729f"
                  strokeWidth="2"
                />
                <circle cx="458" cy="223" r="4" fill="#8e729f" />
                <circle cx="469" cy="232" r="4" fill="#8e729f" />
              </Part>
              <Part {...partProps("centrosome")}>
                <rect
                  x="455"
                  y="141"
                  width="38"
                  height="12"
                  rx="3"
                  fill="#c79367"
                  stroke="#9e704d"
                />
                <rect
                  x="469"
                  y="154"
                  width="12"
                  height="36"
                  rx="3"
                  fill="#c79367"
                  stroke="#9e704d"
                />
              </Part>
            </>
          )}
          <Part {...partProps("cytoskeleton")}>
            <path
              d="M108 323Q238 355 308 323M315 58Q340 66 349 92"
              fill="none"
              stroke="#6b9997"
              strokeWidth="4"
              strokeDasharray="10 4"
            />
          </Part>
          {s.route && (
            <path
              className="cell-route"
              d={
                s.plant
                  ? "M207 180 Q275 90 282 147 T292 205 Q280 270 324 308 Q530 355 550 223"
                  : "M207 180 Q275 90 282 147 T292 205 Q309 221 354 270 Q436 338 550 223"
              }
              fill="none"
              stroke="#a85c47"
              strokeWidth="3"
              strokeDasharray="7 7"
              pointerEvents="none"
            />
          )}
        </svg>
        <div className="organelle-info" aria-live="polite">
          <span className="lab-kicker">{l(part.structure)}</span>
          <h3>{l(part.name)}</h3>
          <p>{l(part.description)}</p>
        </div>
      </div>
      <div
        className="organelle-options"
        role="group"
        aria-label={v("cellDiagram")}
      >
        {available.map((p) => (
          <button
            className={p.id === part.id ? "selected" : ""}
            aria-pressed={p.id === part.id}
            key={p.id}
            onClick={() => select(p.id)}
          >
            {l(p.name)}
          </button>
        ))}
      </div>
      <p className="lab-caption">{v("cellScale")}</p>
      <div className="lab-experiment">
        <button className="secondary" onClick={() => advance(0)}>
          {v("secretion")}
        </button>
        {s.route && (
          <>
            <p className="route-explanation" aria-live="polite">
              {step + 1}/5 · {v("route" + step)}
            </p>
            <div className="lab-actions">
              <button
                className="secondary"
                disabled={step === 0}
                onClick={() => advance(step - 1)}
              >
                {v("previousStep")}
              </button>
              <button
                className="primary"
                disabled={step === 4}
                onClick={() => advance(step + 1)}
              >
                {v("nextStep")}
              </button>
            </div>
          </>
        )}
      </div>
      <p className="lab-caption">{v("visualNote")}</p>
    </section>
  );
}
