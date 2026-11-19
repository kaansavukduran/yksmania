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
/* Plant cell: an irregular, slightly rounded polygon like cells in a tissue
 * section; the inner outline is the cell membrane pressed against the wall. */
const PLANT_WALL =
  "M66 28 L300 16 L520 30 Q580 36 576 98 L570 196 L566 300 Q562 370 498 372 L290 386 L92 370 Q24 364 28 300 L32 200 L36 92 Q40 32 66 28Z";
const PLANT_INNER =
  "M80 46 L300 34 L512 48 Q558 52 556 104 L552 196 L548 294 Q544 352 492 354 L290 368 L100 352 Q48 348 48 296 L52 200 L54 98 Q56 50 80 46Z";
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
            <radialGradient id={`${uid}-cyto`} cx="0.42" cy="0.4" r="0.75">
              <stop stopColor="#eef7ea" />
              <stop offset="0.7" stopColor="#d6ebe2" />
              <stop offset="1" stopColor="#bfd9d4" />
            </radialGradient>
            <radialGradient id={`${uid}-nuc`} cx="0.4" cy="0.35" r="0.8">
              <stop stopColor="#c3bbe2" />
              <stop offset="1" stopColor="#968bc0" />
            </radialGradient>
            <radialGradient id={`${uid}-nucleolus`} cx="0.35" cy="0.35" r="0.7">
              <stop stopColor="#8c7ba8" />
              <stop offset="1" stopColor="#584a73" />
            </radialGradient>
            <linearGradient id={`${uid}-mito`} x2="0" y2="1">
              <stop stopColor="#f2c3a8" />
              <stop offset="1" stopColor="#d99476" />
            </linearGradient>
            <linearGradient id={`${uid}-golgi`} x2="0" y2="1">
              <stop stopColor="#f0be8a" />
              <stop offset="1" stopColor="#c98a56" />
            </linearGradient>
            <radialGradient id={`${uid}-vac`} cx="0.4" cy="0.35" r="0.8">
              <stop stopColor="#d4ecf7" />
              <stop offset="1" stopColor="#93c7de" />
            </radialGradient>
            <linearGradient id={`${uid}-chl`} x2="0" y2="1">
              <stop stopColor="#a9d29a" />
              <stop offset="1" stopColor="#77a86b" />
            </linearGradient>
          </defs>
          {s.plant && (
            <Part {...partProps("wall")}>
              <g>
                {/* Neighbouring cells sharing the wall (middle lamella lines) */}
                <path d="M300 22L304 0M522 36L540 0M568 200L600 196M560 320L600 336M290 380L286 400M92 366L70 400M34 200L0 206M48 40L20 0" stroke="#7d9c6f" strokeWidth="6" />
                <path d={PLANT_WALL} fill="#b9d59c" stroke="#557b52" strokeWidth="9" strokeLinejoin="round" />
                <path d={PLANT_WALL} fill="none" stroke="#8fb27a" strokeWidth="2" strokeLinejoin="round" />
                {/* Plasmodesmata: thin channels through the wall */}
                <path d="M200 26v14M420 30v14M562 130h-14M556 260h-14M180 368v-14M390 372v-14M38 140h14M42 280h14" stroke="#557b52" strokeWidth="2.4" />
              </g>
            </Part>
          )}
          <Part {...partProps("cytoplasm")}>
            {s.plant ? (
              <path d={PLANT_INNER} fill={`url(#${uid}-cyto)`} />
            ) : (
              <path
                d="M58 205 C44 128 104 62 196 48 C262 36 318 46 372 38 C452 28 534 70 560 142 C580 198 574 262 540 312 C500 364 420 372 346 366 C272 362 214 380 152 356 C88 334 66 272 58 205Z"
                fill={`url(#${uid}-cyto)`}
              />
            )}
          </Part>
          <Part {...partProps("membrane")}>
            {s.plant ? (
              <g pointerEvents="stroke">
                <path d={PLANT_INNER} fill="none" stroke="#518b7c" strokeWidth="6" strokeLinejoin="round" />
                <path d={PLANT_INNER} fill="none" stroke="#d9efe6" strokeWidth="1.4" strokeLinejoin="round" />
              </g>
            ) : (
              <g pointerEvents="stroke">
                <path
                  d="M58 205 C44 128 104 62 196 48 C262 36 318 46 372 38 C452 28 534 70 560 142 C580 198 574 262 540 312 C500 364 420 372 346 366 C272 362 214 380 152 356 C88 334 66 272 58 205Z"
                  fill="none"
                  stroke="#518b7c"
                  strokeWidth="7"
                />
                <path
                  d="M58 205 C44 128 104 62 196 48 C262 36 318 46 372 38 C452 28 534 70 560 142 C580 198 574 262 540 312 C500 364 420 372 346 366 C272 362 214 380 152 356 C88 334 66 272 58 205Z"
                  fill="none"
                  stroke="#d9efe6"
                  strokeWidth="1.6"
                />
              </g>
            )}
          </Part>
          <Part {...partProps("vacuole")}>
            <ellipse
              cx={s.plant ? 435 : 454}
              cy={s.plant ? 200 : 286}
              rx={s.plant ? 90 : 44}
              ry={s.plant ? 80 : 28}
              fill={`url(#${uid}-vac)`}
              stroke="#5790a6"
              strokeWidth="3"
            />
          </Part>
          <Part {...partProps("er")}>
            <g fill="none" strokeLinecap="round">
              {/* Rough ER: stacked, folded sheets continuous with the nuclear envelope */}
              <path d="M262 112 C300 100 322 122 300 140 C330 150 324 176 298 182 C330 196 314 222 278 222" stroke="#c895ad" strokeWidth="10" />
              <path d="M262 112 C300 100 322 122 300 140 C330 150 324 176 298 182 C330 196 314 222 278 222" stroke="#f3dbe6" strokeWidth="2.5" />
              <path d="M266 128 C292 120 304 136 284 150 C306 160 300 176 280 178 C304 190 296 206 270 206" stroke="#c895ad" strokeWidth="8" />
              <path d="M266 128 C292 120 304 136 284 150 C306 160 300 176 280 178 C304 190 296 206 270 206" stroke="#f3dbe6" strokeWidth="2" />
              {/* Smooth ER: branching tubes without ribosomes */}
              <path d="M318 214 c14 6 22 -4 34 4 s16 14 30 6 M330 228 c10 10 24 4 32 14" stroke="#d7a9c0" strokeWidth="5" />
            </g>
            <g fill="#5b5582">
              {[
                [270, 106], [284, 102], [298, 104], [312, 113], [318, 128], [325, 150], [324, 168], [318, 186],
                [324, 200], [318, 214], [302, 224], [288, 226], [306, 172], [296, 160], [292, 194],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="2.6" />
              ))}
            </g>
          </Part>
          <Part {...partProps("nucleus")}>
            <ellipse cx="203" cy="178" rx="66" ry="73" fill={`url(#${uid}-nuc)`} />
            {/* Double nuclear envelope with pores (gaps) */}
            <ellipse cx="203" cy="178" rx="66" ry="73" fill="none" stroke="#5d5080" strokeWidth="3.5" strokeDasharray="34 5" />
            <ellipse cx="203" cy="178" rx="61" ry="68" fill="none" stroke="#7a6c9c" strokeWidth="2" strokeDasharray="31 5" />
            {/* Chromatin threads */}
            <g fill="none" stroke="#6f6391" strokeWidth="1.6" strokeLinecap="round" opacity="0.85">
              <path d="M160 150c10-8 18 6 28-2s14 8 24 2" />
              <path d="M166 205c8 6 16-6 26 2s18-4 24 4" />
              <path d="M150 178c6-10 14 2 20-6m54 34c8-4 12 8 20 2" />
              <path d="M228 140c6 8 14-2 18 8m-70 64c4 8 12 0 16 8" />
            </g>
            <circle cx="217" cy="186" r="21" fill={`url(#${uid}-nucleolus)`} />
            <circle cx="210" cy="180" r="5" fill="#a596c4" opacity="0.6" />
          </Part>
          <Part {...partProps("ribosome")}>
            <circle cx="278" cy="142" r="24" fill="transparent" />
            <g fill="#4f4a78">
              {[
                [271, 132],
                [283, 148],
                [272, 166],
                [285, 184],
                [307, 143],
                [110, 172],
                [122, 250],
                [360, 120],
                [380, 300],
                [250, 300],
                [150, 120],
              ].map(([x, y], i) => (
                <g key={i}>
                  {/* large and small subunit */}
                  <circle cx={x} cy={y} r="4.2" />
                  <circle cx={x + 3.6} cy={y + 3} r="2.8" />
                </g>
              ))}
            </g>
          </Part>
          <Part {...partProps("golgi")}>
            <g transform={s.plant ? "translate(-30 38)" : undefined}>
              <g fill={`url(#${uid}-golgi)`} stroke="#a86f43" strokeWidth="1.5">
                <path d="M310 252q46-30 92 0q-46-20-92 0Z" />
                <path d="M314 264q42-27 84 0q-42-18-84 0Z" />
                <path d="M319 276q37-24 74 0q-37-16-74 0Z" />
                <path d="M325 288q31-20 62 0q-31-13-62 0Z" />
                <path d="M332 299q24-15 48 0q-24-10-48 0Z" />
              </g>
              {/* Vesicles budding from the trans face */}
              <circle cx="408" cy="262" r="8" fill="#e8b886" stroke="#a86f43" strokeWidth="1.5" />
              <circle cx="398" cy="248" r="5.5" fill="#e8b886" stroke="#a86f43" strokeWidth="1.5" />
              <circle cx="394" cy="296" r="6" fill="#e8b886" stroke="#a86f43" strokeWidth="1.5" />
            </g>
          </Part>
          <Part {...partProps("mitochondrion")}>
            {[
              { cx: 137, cy: 294, rx: 49, ry: 24, rot: -22 },
              { cx: 415, cy: 84, rx: 40, ry: 20, rot: 18 },
            ].map((m, k) => {
              const folds = Math.round(m.rx / 9);
              const d = Array.from({ length: folds }, (_, i) => {
                const x = m.cx - m.rx + 12 + i * ((2 * m.rx - 24) / Math.max(1, folds - 1));
                const top = i % 2 === 0;
                return `M${x.toFixed(1)} ${(top ? m.cy - m.ry + 4 : m.cy + m.ry - 4).toFixed(1)}q4 ${top ? m.ry * 0.9 : -m.ry * 0.9} 0 ${top ? m.ry * 1.25 : -m.ry * 1.25}`;
              }).join("");
              return (
                <g key={k} transform={`rotate(${m.rot} ${m.cx} ${m.cy})`}>
                  {/* Outer membrane, inner membrane and folded cristae */}
                  <ellipse cx={m.cx} cy={m.cy} rx={m.rx} ry={m.ry} fill={`url(#${uid}-mito)`} stroke="#a0644e" strokeWidth="3" />
                  <ellipse cx={m.cx} cy={m.cy} rx={m.rx - 5} ry={m.ry - 4} fill="#f6d2bd" stroke="#b9775e" strokeWidth="1.6" />
                  <path d={d} fill="none" stroke="#b9775e" strokeWidth="2.2" strokeLinecap="round" />
                </g>
              );
            })}
          </Part>
          {s.plant && (
            <Part {...partProps("chloroplast")}>
              <ellipse cx="96" cy="100" rx="39" ry="23" fill={`url(#${uid}-chl)`} stroke="#3f6b40" strokeWidth="3" />
              <ellipse cx="96" cy="100" rx="35" ry="19.5" fill="none" stroke="#5f8f58" strokeWidth="1.2" />
              {/* Grana: stacks of thylakoid discs joined by stroma lamellae */}
              <path d="M70 100h52" stroke="#4e7d48" strokeWidth="1.4" />
              <g fill="#3e6a3d">
                {[72, 86, 100, 114].map((x, gi) =>
                  [0, 1, 2, 3].map((k) => (
                    <rect key={`${gi}-${k}`} x={x - 4.5} y={91 + k * 4.6 - (gi % 2) * 2} width="9" height="3.4" rx="1.6" />
                  )),
                )}
              </g>
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
            <rect x="99" y="206" width="14" height="14" rx="2" fill="#a99a5f" transform="rotate(20 106 213)" />
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
                {[[456, 221], [468, 224], [460, 233], [471, 234], [463, 214]].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.6" fill="#7c5f8f" />
                ))}
              </Part>
              <Part {...partProps("centrosome")}>
                <circle cx="474" cy="166" r="30" fill="#e7d3b8" opacity="0.45" />
                <rect x="455" y="141" width="38" height="12" rx="3" fill="#c79367" stroke="#9e704d" />
                <path d="M461 141v12m6-12v12m6-12v12m6-12v12m6-12v12" stroke="#9e704d" strokeWidth="1.2" />
                <rect x="469" y="154" width="12" height="36" rx="3" fill="#c79367" stroke="#9e704d" />
                <path d="M469 160h12m-12 6h12m-12 6h12m-12 6h12m-12 6h12" stroke="#9e704d" strokeWidth="1.2" />
              </Part>
            </>
          )}
          <Part {...partProps("cytoskeleton")}>
            <g fill="none" stroke="#6b9997" strokeLinecap="round">
              {/* Microtubules (thicker) and microfilaments (thin) */}
              <path
                d={s.plant ? "M108 323Q238 355 308 323M315 58Q340 66 349 92" : "M108 323Q238 355 308 323M315 58Q340 66 349 92M474 166Q520 120 540 150M474 166Q500 230 530 250"}
                strokeWidth="3.2"
              />
              <path
                d={s.plant ? "M80 260Q120 240 150 270M70 150Q90 120 120 130M380 70Q420 40 470 60" : "M80 260Q120 240 150 270M380 70Q420 40 470 60M520 300Q480 330 440 320M70 150Q90 120 120 130"}
                strokeWidth="1.4"
                opacity="0.8"
              />
            </g>
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
