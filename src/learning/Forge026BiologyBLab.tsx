import { useId, type ReactNode } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  biologyBDefaults026,
  biologyBId026,
  carbohydrateForest026,
  lipidAssembly026,
  normalizeBiologyB026,
} from "./forge026BiologyB";
import "./forge026BiologyB.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

type Values = ReturnType<typeof normalizeBiologyB026>["values"];
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
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="bb026-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{value}</output>
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
function Facts({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="bb026-facts">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
function Figure({
  title,
  height,
  children,
}: {
  title: string;
  height: number;
  children: ReactNode;
}) {
  return (
    <figure className="bb026-figure">
      <figcaption>{title}</figcaption>
      <svg viewBox={`0 0 270 ${height}`} role="img" aria-label={title}>
        {children}
      </svg>
    </figure>
  );
}

export function Forge026BiologyBLab({ lessonId }: { lessonId: string }) {
  const canonical = biologyBId026(lessonId);
  const key = `forge026:biology-b:${canonical}`;
  const { state } = useApp();
  const [, save] = useExploration(key, biologyBDefaults026);
  const normalized = normalizeBiologyB026(canonical, state.explorations[key]);
  const v = normalized.values;
  const commit = (patch: Partial<Values>) =>
    save(normalizeBiologyB026(canonical, { ...v, ...patch }).values);
  const change = (patch: Partial<Values>) =>
    commit({ ...patch, guess: "", reason: "", checked: false, show: false });
  const range = (
    label: string,
    field: keyof Values,
    min: number,
    max: number,
  ) => (
    <Range
      key={field}
      label={label}
      value={v[field] as number}
      min={min}
      max={max}
      onChange={(value) => change({ [field]: value })}
    />
  );
  let content: ReactNode, proof: ReactNode, expected: string, task: string;
  const isCarb = canonical === "karbohidratlar";
  if (isCarb) {
    const r = carbohydrateForest026(v.units, v.pieces, v.joins, v.carbCuts);
    expected = String(r.finalPieces);
    task = "Son durumda birbirinden ayrı kaç şeker parçası var?";
    proof = (
      <p>
        Başta {r.units}−{r.pieces}={r.initialBonds} bağ vardır. {r.joins} yeni
        bağ eklenir, {r.cuts} bağ kopar: {r.bonds} bağ kalır. Halkasız ağda
        parça sayısı {r.units}−{r.bonds}={r.finalPieces} olur. Yeni bağlar için
        çıkan {r.synthesisWater} su ile kopan bağlarda kullanılan{" "}
        {r.hydrolysisWater} su ayrı kayıtlardır.
      </p>
    );
    content = (
      <>
        <p>
          Numaralı her daire bir şeker birimidir. Daireler atom halkası
          değildir. Başlangıç zincirleri halkasızdır. Yeni bağlar ilk parçaları
          sırayla birleştirir. Kesim sırası aşağıdaki bağ listesinde açıkça
          verilir.
        </p>
        <div className="bb026-controls">
          {range("Şeker birimi", "units", 3, 9)}
          {range("İlk parça sayısı", "pieces", 1, 3)}
          {range("Yeni bağ", "joins", 0, v.pieces - 1)}
          {range("Kopan bağ", "carbCuts", 0, r.beforeCuts)}
        </div>
        <Figure
          title="Şeker ağı. Daire numarası birimi, çizgi bağı gösterir. Çarpı kopan bağı işaretler; kesik çizgi artık bağlantı sayılmaz."
          height={100 + 82 * (r.units - 1)}
        >
          {r.links.map((link, index) => {
            const top = 48 + 82 * link.a + 25,
              bottom = 48 + 82 * link.b - 25;
            const middle = (top + bottom) / 2;
            return (
              <g
                key={`${link.a}-${link.b}`}
                data-bond-a={link.a + 1}
                data-bond-b={link.b + 1}
                data-added={String(link.added)}
                data-cut={String(link.cut)}
              >
                <path
                  d={`M60 ${top} V${bottom}`}
                  className={link.cut ? "bb026-cut" : "bb026-bond"}
                />
                {link.cut && (
                  <path
                    d={`M49 ${middle - 9} L71 ${middle + 9} M49 ${middle + 9} L71 ${middle - 9}`}
                    className="bb026-cross"
                  />
                )}
                <text x="106" y={middle + 7}>
                  {index + 1}. bağ{link.added ? " (yeni)" : ""}
                </text>
              </g>
            );
          })}
          {Array.from({ length: r.units }, (_, i) => (
            <g key={i} data-sugar-unit={i + 1}>
              <circle cx="60" cy={48 + 82 * i} r="25" className="bb026-node" />
              <text x="60" y={55 + 82 * i} textAnchor="middle">
                {i + 1}
              </text>
            </g>
          ))}
        </Figure>
        <div
          data-model-result="forest"
          data-pieces={r.finalPieces}
          data-bonds={r.bonds}
          data-free-units={r.freeUnits}
        >
          <Facts
            rows={[
              [
                "Başlangıç parçaları",
                r.originalGroups
                  .map((g) => g.map((n) => n + 1).join("–"))
                  .join("; "),
              ],
              ["Başlangıç bağı", r.initialBonds],
              ["Yeni bağ sonrası", r.beforeCuts],
              ["Son bağ", r.bonds],
              ["Son parça", r.finalPieces],
              ["Tek başına kalan birim", r.freeUnits],
              ["Çıkan su", r.synthesisWater],
              ["Kullanılan su", r.hydrolysisWater],
              [
                "Son parçaların birimleri",
                r.groups.map((g) => g.map((n) => n + 1).join("–")).join("; "),
              ],
            ]}
          />
          <p>Bağ listesi ve kesim sırası:</p>
          <ol>
            {r.links.map((e, i) => (
              <li key={`${e.a}-${e.b}`}>
                {i + 1}. sıradaki bağ: {e.a + 1}–{e.b + 1};{" "}
                {e.added ? "yeni kuruldu" : "başta vardı"};{" "}
                {e.cut ? "koparıldı" : "duruyor"}.
              </li>
            ))}
          </ol>
        </div>
        <p>
          Her yeni bağ için bir su çıkar; her kesimde bir su kullanılır. Değişen
          üst sınırlar görünür: parça azalınca yeni bağ kurma sınırı, bağ
          azalınca kesim sınırı da azalır. Bu düzen bir sayım deneyidir; her
          enzim her şeker bağını kesebilir anlamına gelmez.
        </p>
      </>
    );
  } else {
    const r = lipidAssembly026(v.glycerol, v.acids, v.built, v.lipidCuts);
    expected = String(r.freeGlycerol);
    task = "Son durumda serbest gliserol sayısı kaç?";
    proof = (
      <p>
        {r.built} ürün için {r.built} gliserol ve {3 * r.built} yağ asidi
        bağlanır. Başta artan {r.initialUnusedGlycerol} gliserole, üç bağı da
        kopan {r.molecules.filter((m) => m.freeGlycerol).length} gliserol
        eklenir: {r.freeGlycerol} serbest gliserol. Her kesim bir yağ asidini
        ayırır; tek kesim gliserolü mutlaka serbest bırakmaz.
      </p>
    );
    content = (
      <>
        <p>
          Başta bütün gliserol ve yağ asitleri serbesttir. Bir trigliserit için
          bir gliserol ile üç yağ asidi gerekir. Önce seçtiğin sayıda ürün
          kurulur; sonra ilk üründen başlayarak üçer ester bağı kesilir. Molekül
          sayıları tam sayıdır.
        </p>
        <div className="bb026-controls">
          {range("Serbest gliserol", "glycerol", 0, 4)}
          {range("Serbest yağ asidi", "acids", 0, 12)}
          {range("Kurulan ürün", "built", 0, r.capacity)}
          {range("Kopan ester bağı", "lipidCuts", 0, 3 * r.built)}
        </div>
        <Figure
          title="Ürün ve kesimler. G bloğu bir gliserolü, her YA dairesi bir yağ asidini gösterir. Çarpı kopan ester bağıdır; şekil gerçek atom geometrisi değildir."
          height={Math.max(140, 230 * r.built)}
        >
          {r.built === 0 && (
            <text x="24" y="70">
              Kurulan ürün yok.
            </text>
          )}
          {r.molecules.map((m, index) => {
            const y = index * 230;
            return (
              <g
                key={m.id}
                data-lipid-molecule={m.id + 1}
                data-broken={m.broken}
                data-free-glycerol={String(m.freeGlycerol)}
              >
                <text x="20" y={y + 26}>
                  Ürün {m.id + 1}
                </text>
                <rect
                  x="30"
                  y={y + 48}
                  width="65"
                  height="130"
                  rx="12"
                  className="bb026-node"
                />
                <text x="62" y={y + 120} textAnchor="middle">
                  G
                </text>
                {[0, 1, 2].map((slot) => {
                  const sy = y + 63 + slot * 50,
                    cut = slot < m.broken;
                  return (
                    <g
                      key={slot}
                      data-ester-slot={slot + 1}
                      data-cut={String(cut)}
                    >
                      <path
                        d={`M95 ${sy} H198`}
                        className={cut ? "bb026-cut" : "bb026-bond"}
                      />
                      {cut && (
                        <path
                          d={`M132 ${sy - 10} L154 ${sy + 10} M132 ${sy + 10} L154 ${sy - 10}`}
                          className="bb026-cross"
                        />
                      )}
                      <circle cx="222" cy={sy} r="24" className="bb026-node" />
                      <text x="222" y={sy + 7} textAnchor="middle">
                        YA
                      </text>
                    </g>
                  );
                })}
                <text x="20" y={y + 212}>
                  {m.freeGlycerol
                    ? "Gliserol serbest"
                    : `${m.remaining} ester bağı duruyor`}
                </text>
              </g>
            );
          })}
        </Figure>
        <div
          data-model-result="esters"
          data-free-glycerol={r.freeGlycerol}
          data-free-acids={r.freeAcids}
          data-bonds={r.esterBonds}
        >
          <Facts
            rows={[
              ["Üretim üst sınırı", r.capacity],
              ["Kurulan trigliserit", r.built],
              ["Baştan artan gliserol", r.initialUnusedGlycerol],
              ["Baştan artan yağ asidi", r.initialUnusedAcids],
              ["Son serbest gliserol", r.freeGlycerol],
              ["Son serbest yağ asidi", r.freeAcids],
              ["Kalan ester bağı", r.esterBonds],
              ["Bağları tam kalan ürün", r.intact],
              ["Sentezde çıkan su", r.synthesisWater],
              ["Hidrolizde kullanılan su", r.hydrolysisWater],
            ]}
          />
          {r.molecules.length > 0 && (
            <ol>
              {r.molecules.map((m) => (
                <li key={m.id}>
                  Ürün {m.id + 1}: ilk {m.broken} bağ kopuk, {m.remaining} bağ
                  duruyor; gliserol{" "}
                  {m.freeGlycerol ? "serbesttir" : "yağ asidine bağlıdır"}.
                </li>
              ))}
            </ol>
          )}
        </div>
        <p>
          G ve YA işaretleri, tam atom formülü yerine bileşenleri izler. Her
          kurulan ester bağı bir su çıkışı, her kesimde bir su kullanılır. Bu
          net model, hücredeki yapımın tüm ara adımlarını ya da insandaki
          yağların tüm sindirim ürünlerini göstermez. Çift bağları değil ester
          bağlarını sayar.
        </p>
      </>
    );
  }
  const predictionId = useId(),
    reasonId = useId();
  const choices = isCarb
    ? Array.from({ length: 9 }, (_, i) => i + 1)
    : [0, 1, 2, 3, 4];
  const validGuess = choices.some((n) => String(n) === v.guess);
  const canCompare =
    normalized.validSelection && validGuess && v.reason.trim().length > 0;
  return (
    <section
      className="bb026-lab"
      data-forge026={lessonId}
      data-exploration-key={key}
    >
      <p>
        Bu deneyde seçimlerin ayrı kaydolur; puan, XP veya ustalık verilmez.
      </p>
      {content}
      <div className="bb026-compare">
        <p>{task}</p>
        <label htmlFor={predictionId}>Tahminin</label>
        <ChoiceSelect
          id={predictionId}
          value={v.guess}
          onChange={(e) => commit({ guess: e.target.value, checked: false })}
        >
          <option value="">Bir sayı seç</option>
          {choices.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </ChoiceSelect>
        <label htmlFor={reasonId}>Gerekçen</label>
        <textarea
          id={reasonId}
          value={v.reason}
          maxLength={120}
          onChange={(e) =>
            commit({ reason: e.target.value.slice(0, 120), checked: false })
          }
        />
        <p>
          En çok 120 karakter. Boş olmayan kısa ifadeler geçerlidir; gerekçene
          otomatik not verilmez.
        </p>
        <button
          type="button"
          disabled={!canCompare}
          onClick={() => commit({ checked: true })}
        >
          Kıyasla
        </button>
        {v.checked && canCompare && (
          <p role="status" className="bb026-feedback">
            {v.guess === expected
              ? "Modelle uyumlu."
              : "Tahminini sayım verileriyle yeniden incele."}{" "}
            Bu kıyas yalnız seçtiğin sayıyı denetler.
          </p>
        )}
        <button
          type="button"
          disabled={!normalized.validScience}
          aria-expanded={v.show}
          onClick={() => commit({ show: !v.show })}
        >
          {v.show ? "Kanıtı kapat" : "Kanıtı aç"}
        </button>
        {v.show && <div className="bb026-proof">{proof}</div>}
        <button type="button" onClick={() => save({ ...biologyBDefaults026 })}>
          Başa dön
        </button>
      </div>
    </section>
  );
}
export default Forge026BiologyBLab;
