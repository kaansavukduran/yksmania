import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import { useApp } from "../store";
import {
  seedLineage025,
  germination025,
  germinationProfiles025,
  reactionNorm025,
  selection025,
  mutation025,
  breeding025,
  breedingLines025,
  biologyDefaults025,
  normalizeBiology025,
} from "./forge025Biology";
import "./forge025Biology.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number, d = 2) =>
  n.toLocaleString("tr-TR", { maximumFractionDigits: d });
const displayCopy025 = (text: string) =>
  text.replace("iz=min(1,gün×hız/7)", "iz = min(1, gün × hız / 7)");
function Menu({
  label,
  value,
  options,
  change,
}: {
  label: string;
  value: string | number;
  options: Record<string, string>;
  change: (s: string) => void;
}) {
  const id = useId();
  return (
    <div className="b025-field">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect id={id} value={value} onChange={(e) => change(e.target.value)}>
        {Object.entries(options).map(([k, t]) => (
          <option key={k} value={k}>
            {t}
          </option>
        ))}
      </ChoiceSelect>
      <span className="b025-choice">
        Seçim: {options[String(value)] ?? "Bir sonuç seç"}
      </span>
    </div>
  );
}
function NumberField({
  label,
  value,
  min,
  max,
  step = 1,
  change,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  change: (n: number) => void;
}) {
  const id = useId();
  return (
    <label className="b025-field" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (e.target.value !== "" && Number.isFinite(n))
            change(Math.max(min, Math.min(max, n)));
        }}
      />
    </label>
  );
}
function Toggle({
  label,
  value,
  change,
}: {
  label: string;
  value: boolean;
  change: (b: boolean) => void;
}) {
  return (
    <label className="b025-toggle">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => change(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
function Plot({
  title,
  children,
  extra,
}: {
  title: string;
  children: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <figure className="b025-plot">
      <figcaption>{title}</figcaption>
      <svg viewBox="0 0 250 190" role="img" aria-label={title}>
        {children}
      </svg>
      {extra}
    </figure>
  );
}
export default function Forge025BiologyLab({ lessonId }: { lessonId: string }) {
  const [saved, set] = useExploration(
      "forge025-biology-" + lessonId,
      biologyDefaults025,
    ),
    v = normalizeBiology025(saved),
    raw = useApp().state.explorations["forge025-biology-" + lessonId],
    activeFields =
      lessonId === "bitkilerde-dollenme-cimlenme"
        ? v.view === "lineage"
          ? ["view", "n", "egg", "sperm"]
          : [
              "view",
              "profile",
              "temperature",
              "water",
              "oxygen",
              "light",
              "dormant",
              "viable",
              "day",
            ]
        : v.environmentView === "norm"
          ? ["environmentView", "normTemperature"]
          : v.environmentView === "selection"
            ? [
                "environmentView",
                "resistant",
                "sensitive",
                "dose",
                "generations",
              ]
            : v.environmentView === "mutation"
              ? ["environmentView", "cells", "exposure", "site", "route"]
              : ["environmentView", "target", "keep"],
    rawActiveValid =
      !raw ||
      [...activeFields, "guess", "reason", "checked"].every(
        (key) =>
          !Object.hasOwn(raw, key) ||
          typeof raw[key] ===
            typeof biologyDefaults025[key as keyof typeof biologyDefaults025],
      ),
    commit = (patch: Partial<typeof v>) => set({ ...v, ...patch }),
    change = (patch: Partial<typeof v>) =>
      commit({ ...patch, guess: "", reason: "", checked: false, show: false });
  let controls: ReactNode,
    result: ReactNode,
    diagram: ReactNode,
    description: string,
    prediction: string,
    expected: string,
    options: Record<string, string>;
  const seed = lessonId === "bitkilerde-dollenme-cimlenme";
  if (seed && v.view === "lineage") {
    const r = seedLineage025(v.n, v.egg, v.sperm);
    description = r.assumption;
    prediction = "Besi dokuda takım sayısı";
    expected = "3n";
    options = { n: "n", "2n": "2n", "3n": "3n", "4n": "4n" };
    controls = (
      <>
        <NumberField
          label="Haploit kromozom sayısı n"
          value={v.n}
          min={1}
          max={100}
          change={(n) => change({ n: Math.trunc(n) })}
        />
        <Menu
          label="Yumurta aleli"
          value={v.egg}
          options={{ A: "A", a: "a" }}
          change={(egg) => change({ egg })}
        />
        <Menu
          label="Sperm aleli"
          value={v.sperm}
          options={{ A: "A", a: "a" }}
          change={(sperm) => change({ sperm })}
        />
      </>
    );
    result = (
      <div
        data-model-result
        data-embryo={r.embryo.chromosomes}
        data-endosperm={r.endosperm.chromosomes}
        data-coat={r.coat.chromosomes}
        data-endosperm-genotype={r.endosperm.genotype}
      >
        <h4>İki birleşme, üç ayrı doku kökeni</h4>
        <ul className="b025-evidence">
          <li>
            Yumurta: {v.n}, sperm: {v.n} kromozom.
          </li>
          <li>
            Embriyo ve çenek: {r.embryo.chromosomes} kromozom (2n);{" "}
            {r.embryo.genotype}.
          </li>
          <li>
            Besi doku: {r.endosperm.chromosomes} kromozom (3n);{" "}
            {r.endosperm.genotype}; iki anne, bir baba katkısı.
          </li>
          <li>
            Kabuk ve meyve duvarı: anne kökenli {r.coat.chromosomes} kromozom;
            Aa. Besin aktarımı çeneği 3n yapmaz.
          </li>
        </ul>
      </div>
    );
    diagram = (
      <Plot
        title="Çift döllenme ve çekirdek katkısı"
        extra={
          <p>
            Üst yol: yumurta+sperm → embriyo. Alt yol: iki polar+sperm → besi
            doku. Dış örtü anne dokusudur. Şema ölçeksizdir.
          </p>
        }
      >
        <rect
          x="5"
          y="5"
          width="240"
          height="180"
          rx="30"
          className="b025-coat"
        />
        <circle cx="40" cy="55" r="17" className="b025-maternal" />
        <circle cx="90" cy="55" r="13" className="b025-paternal" />
        <path d="M110 55 H145" className="b025-line" />
        <path d="m138 49 9 6-9 6" className="b025-line" />
        <circle cx="185" cy="55" r="27" className="b025-embryo" />
        <text x="40" y="62" textAnchor="middle">
          {v.egg}
        </text>
        <text x="90" y="62" textAnchor="middle">
          {v.sperm}
        </text>
        <text x="185" y="62" textAnchor="middle">
          2n
        </text>
        <circle cx="33" cy="130" r="15" className="b025-maternal" />
        <circle cx="69" cy="130" r="15" className="b025-maternal" />
        <circle cx="105" cy="130" r="12" className="b025-paternal" />
        <path d="M124 130 H150" className="b025-line" />
        <path d="m143 124 9 6-9 6" className="b025-line" />
        <circle cx="190" cy="130" r="30" className="b025-endo" />
        <text x="33" y="137" textAnchor="middle">
          {v.egg}
        </text>
        <text x="69" y="137" textAnchor="middle">
          {v.egg}
        </text>
        <text x="105" y="137" textAnchor="middle">
          {v.sperm}
        </text>
        <text x="190" y="137" textAnchor="middle">
          3n
        </text>
      </Plot>
    );
  } else if (seed) {
    const r = germination025(
      v.profile,
      v.temperature,
      v.water,
      v.oxygen,
      v.light,
      v.dormant,
      v.viable,
      v.day,
    );
    description = r.assumption;
    prediction = "Bu sabit koşullarda büyüme birikir mi?";
    expected = r.conditions ? "yes" : "no";
    options = {
      yes: "Koşul kapıları açık",
      no: "En az bir koşul kapısı kapalı",
    };
    controls = (
      <>
        <Menu
          label="Tohum profili"
          value={v.profile}
          options={Object.fromEntries(
            Object.entries(germinationProfiles025).map(([k, x]) => [k, x.name]),
          )}
          change={(profile) => change({ profile })}
        />
        <NumberField
          label="Sıcaklık (°C)"
          value={v.temperature}
          min={0}
          max={50}
          change={(temperature) => change({ temperature })}
        />
        <NumberField
          label="Su erişim endeksi"
          value={v.water}
          min={0}
          max={100}
          change={(water) => change({ water })}
        />
        <NumberField
          label="Oksijen erişim endeksi"
          value={v.oxygen}
          min={0}
          max={100}
          change={(oxygen) => change({ oxygen })}
        />
        <NumberField
          label="Gözlem günü"
          value={v.day}
          min={0}
          max={14}
          change={(day) => change({ day: Math.trunc(day) })}
        />
        <Toggle
          label="Işık var"
          value={v.light}
          change={(light) => change({ light })}
        />
        <Toggle
          label="Dormansi sürüyor"
          value={v.dormant}
          change={(dormant) => change({ dormant })}
        />
        <Toggle
          label="Embriyo canlı"
          value={v.viable}
          change={(viable) => change({ viable })}
        />
      </>
    );
    const p =
      germinationProfiles025[v.profile as keyof typeof germinationProfiles025];
    result = (
      <div
        data-model-result
        data-conditions={r.conditions}
        data-progress={r.progress}
        data-root={r.root}
        data-shoot={r.shoot}
      >
        <h4>{r.stage}</h4>
        <p>
          Temsili sıcaklık sınırları: {p.min} &lt; T &lt; {p.max} °C; tepe{" "}
          {p.optimum} °C. Su kapısı ≥30, O₂ kapısı ≥20; endeksler gerçek doku
          yüzdesi değildir.
        </p>
        <p>
          Bağıl hız: {fmt(r.rate, 3)}; büyüme izi: %{fmt(100 * r.progress)}.
          Çimlenen tohum yüzdesi ölçümü yok.
        </p>
        <p>
          {r.conditions
            ? "Koşul kapıları açık; zamanla büyüme birikebilir."
            : r.blockers.join(" · ")}
        </p>
        <p>
          Çenek konumu: {r.cotyledon}. Işık sinyali isteği:{" "}
          {p.light === "required" ? "Bu profilde var" : "Bu profilde yok"}.
          Başka türler farklı yanıt verebilir.
        </p>
      </div>
    );
    diagram = (
      <Plot
        title="Tohumdan kök ve sürgün gelişimi"
        extra={
          <p>
            Çizgi boyları büyüme izini temsil eder; cm veya kesin çimlenme
            süresi değildir. Su/O₂ bağımsız seçilir; gerçek ortamda aşırı su
            oksijen erişimini azaltabilir.
          </p>
        }
      >
        <path d="M10 100 H240" className="b025-soil" />
        <ellipse
          cx="125"
          cy="100"
          rx={28 + 10 * r.progress}
          ry="22"
          className="b025-coat"
        />
        {r.root > 0 && (
          <path
            data-root-path
            data-root-extent={r.root}
            d={`M125 114 Q110 ${120 + 30 * r.root} 125 ${122 + 55 * r.root}`}
            className="b025-root"
          />
        )}
        {r.shoot > 0 && (
          <>
            <path
              data-shoot-path
              data-shoot-extent={r.shoot}
              d={`M125 90 Q${125 - 10 * r.shoot} ${90 - 30 * r.shoot} ${125 + 5 * r.shoot} ${90 - 65 * r.shoot}`}
              className="b025-shoot"
            />
            {r.shoot > 0.5 && (
              <g
                transform={`translate(${125 + 5 * r.shoot} ${90 - 65 * r.shoot}) scale(${r.shoot})`}
              >
                <path
                  data-leaf-path
                  d="M0 0 Q-30 -22 -28 5 Q-14 12 0 0 M0 0 Q25 -25 28 3 Q14 11 0 0"
                  className="b025-leaf"
                />
              </g>
            )}
          </>
        )}
        <text x="16" y="92">
          T
        </text>
        <text x="16" y="127">
          K
        </text>
      </Plot>
    );
  } else if (v.environmentView === "norm") {
    const r = reactionNorm025(v.normTemperature);
    description = r.assumption;
    prediction = "Bu sıcaklıkta hangi hat daha çok pigment verir?";
    expected = r.A === r.B ? "equal" : r.A > r.B ? "A" : "B";
    options = { A: "A hattı", B: "B hattı", equal: "Eşit" };
    controls = (
      <NumberField
        label="Ortam sıcaklığı (°C)"
        value={v.normTemperature}
        min={10}
        max={40}
        change={(normTemperature) => change({ normTemperature })}
      />
    );
    result = (
      <div
        data-model-result
        data-a={r.A}
        data-b={r.B}
        data-genotype-changed="false"
      >
        <h4>Aynı genotipin çevre yanıtı</h4>
        <p>
          A: {fmt(r.A)}; B: {fmt(r.B)} pigment birimi. Genotipler bu modelde
          sabit; çevre değişiyor.
        </p>
        <p>A=90−2(T−10), B=30+(T−10). Hatlar 30 °C’de 50 birimde eşittir.</p>
      </div>
    );
    diagram = (
      <Plot
        title="İki hattın tepki normu"
        extra={
          <p>
            Yatay eksen 10–40 °C, düşey eksen 0–100 pigment birimi. Düz çizgi A;
            kesik çizgi B. Noktalar seçili sıcaklığı gösterir.
          </p>
        }
      >
        <path d="M30 15 V160 H230" className="b025-line" />
        <path d="M30 34 L230 118" className="b025-A" />
        <path d="M30 118 L230 76" className="b025-B" />
        <circle
          data-norm-a
          cx={30 + ((v.normTemperature - 10) / 30) * 200}
          cy={160 - r.A * 1.4}
          r="6"
          className="b025-dotA"
        />
        <circle
          data-norm-b
          cx={30 + ((v.normTemperature - 10) / 30) * 200}
          cy={160 - r.B * 1.4}
          r="6"
          className="b025-dotB"
        />
        <text x="24" y="183">
          10
        </text>
        <text x="213" y="183">
          40
        </text>
        <text x="5" y="25">
          100
        </text>
        <text x="11" y="163">
          0
        </text>
      </Plot>
    );
  } else if (v.environmentView === "selection") {
    const r = selection025(v.resistant, v.sensitive, v.dose, v.generations);
    description = r.assumption;
    const initial = r.rows[0].frequency;
    prediction = "Dirençli payı ilk değere göre nasıl değişti?";
    expected = r.trend;
    options = { up: "Arttı", down: "Azaldı", same: "Aynı" };
    controls = (
      <>
        <NumberField
          label="Başlangıç dirençli"
          value={v.resistant}
          min={0}
          max={10000}
          change={(resistant) =>
            change({ resistant: Math.trunc(resistant), generations: 0 })
          }
        />
        <NumberField
          label="Başlangıç duyarlı"
          value={v.sensitive}
          min={0}
          max={10000}
          change={(sensitive) =>
            change({ sensitive: Math.trunc(sensitive), generations: 0 })
          }
        />
        <NumberField
          label="Model dozu (0–100)"
          value={v.dose}
          min={0}
          max={100}
          change={(dose) => change({ dose })}
        />
        <NumberField
          label="Kuşak"
          value={v.generations}
          min={0}
          max={12}
          change={(generations) =>
            change({ generations: Math.trunc(generations) })
          }
        />
      </>
    );
    result = (
      <div
        data-model-result
        data-frequency={r.last.frequency}
        data-r={r.last.R}
        data-s={r.last.S}
      >
        <h4>Sayı ve payı birlikte izle</h4>
        <p>
          Sağ kalma: R %{fmt(100 * r.survivalR)}, S %{fmt(100 * r.survivalS)};
          sağ kalan başına 2 yavru.
        </p>
        <p>
          Son R: {fmt(r.last.R, 4)}; S: {fmt(r.last.S, 4)}; dirençli payı: %
          {fmt(100 * r.last.frequency, 4)}. Başlangıç payı: %
          {fmt(100 * initial)}.
        </p>
        <ul className="b025-ledger">
          {r.rows.map((x) => (
            <li key={x.generation}>
              {x.generation}. kuşak: R {fmt(x.R, 3)}; S {fmt(x.S, 3)}; pay %
              {fmt(100 * x.frequency, 3)}.
            </li>
          ))}
        </ul>
      </div>
    );
    const points = r.rows
      .map(
        (x) => `${30 + (x.generation / 12) * 200},${160 - 140 * x.frequency}`,
      )
      .join(" ");
    diagram = (
      <Plot
        title="Kuşaklar boyunca dirençli payı"
        extra={
          <p>
            Yatay eksen 0–12 kuşak; düşey eksen %0–100. Görünen sayı ve oranlar
            beklenen değerlerdir; sıfır dirençliyle başlarsa yeni soy oluşmaz.
          </p>
        }
      >
        <path d="M30 15 V160 H230" className="b025-line" />
        <polyline points={points} className="b025-A" />
        {r.rows.map((x) => (
          <circle
            key={x.generation}
            cx={30 + (x.generation / 12) * 200}
            cy={160 - 140 * x.frequency}
            r="4"
            className="b025-dotA"
          />
        ))}
        <text x="5" y="25">
          100
        </text>
        <text x="11" y="163">
          0
        </text>
        <text x="24" y="183">
          0
        </text>
        <text x="213" y="183">
          12
        </text>
      </Plot>
    );
  } else if (v.environmentView === "mutation") {
    const r = mutation025(v.cells, v.exposure, v.site, v.route);
    description = r.assumption;
    prediction = "Seçili hücre soyu ve üreme yolunda aktarım olası mı?";
    expected = r.conditional ? "possible" : "none";
    options = {
      possible: "Mutant soy varsa geçebilir",
      none: "Bu yolda aktarım gösterilmiyor",
    };
    controls = (
      <>
        <NumberField
          label="Hücre sayısı"
          value={v.cells}
          min={1}
          max={1000000}
          change={(cells) => change({ cells: Math.trunc(cells) })}
        />
        <NumberField
          label="Temsili etki (0–100)"
          value={v.exposure}
          min={0}
          max={100}
          change={(exposure) => change({ exposure })}
        />
        <Menu
          label="Hücre soyu"
          value={v.site}
          options={{
            skin: "İnsanda deri hücresi",
            gamete: "Eşey hücresi (gamet)",
            shoot: "Bitkide sürgün meristemi",
          }}
          change={(site) => change({ site })}
        />
        <Menu
          label="Üreme yolu"
          value={v.route}
          options={
            v.site === "shoot"
              ? {
                  sexual: "Eşeyli üreme",
                  vegetative: "Bitkide çelikle vejetatif üreme",
                }
              : { sexual: "Eşeyli üreme" }
          }
          change={(route) => change({ route })}
        />
      </>
    );
    result = (
      <div
        data-model-result
        data-probability={r.probability}
        data-expected={r.expected}
        data-transmission={r.conditional}
      >
        <h4>Oluşma olasılığı ve aktarım yolu ayrı</h4>
        <p>
          Hücre başına temsili p: %{fmt(100 * r.probability, 3)}; beklenen
          işaretli hücre: {fmt(r.expected, 3)} / {v.cells}.
        </p>
        <p>
          {r.transmission}. Yeni DNA değişimi veya yavruya geçiş kesin değildir.
        </p>
      </div>
    );
    diagram = (
      <Plot
        title="Temsili işaretli hücre payı"
        extra={
          <p>
            Dolu alan olasılığı gösterir; tek deneydeki kesin mutant hücre
            sayısı veya yararlı değişim değildir. DNA işareti aktarımı, katkı
            veren hücre soyuna bağlıdır.
          </p>
        }
      >
        <rect x="30" y="30" width="190" height="55" className="b025-empty" />
        <rect
          data-risk-bar
          x="30"
          y="30"
          width={190 * r.probability}
          height="55"
          className="b025-risk"
        />
        <path
          d="M45 130 Q65 100 85 130 T125 130 T165 130 T205 130 M45 115 Q65 145 85 115 T125 115 T165 115 T205 115"
          className="b025-line"
        />
        <text x="30" y="177">
          DNA
        </text>
      </Plot>
    );
  } else {
    const r = breeding025(v.target, v.keep);
    description = r.assumption;
    prediction = "Bu seçim doğrudan yeni alel üretir mi?";
    expected = "no";
    options = {
      yes: "Yeni alel üretimi zorunludur",
      no: "Hayır; mevcut hatların katkısı seçilir",
    };
    controls = (
      <>
        <Menu
          label="Islah hedefi"
          value={v.target}
          options={{ yield: "Verim puanı", drought: "Kuraklık dayanım puanı" }}
          change={(target) => change({ target })}
        />
        <NumberField
          label="Seçilecek hat sayısı"
          value={v.keep}
          min={1}
          max={5}
          change={(keep) => change({ keep: Math.trunc(keep) })}
        />
      </>
    );
    result = (
      <div
        data-model-result
        data-selected={r.selected.map((x) => x.id).join(",")}
        data-mean-yield={r.meanYield}
        data-mean-drought={r.meanDrought}
      >
        <h4>Hedefi değiştir, artış ve azalışı izle</h4>
        <p>
          Seçilen: {r.selected.map((x) => x.id).join(", ")}. Ortalama verim{" "}
          {fmt(r.meanYield)}; ortalama kuraklık {fmt(r.meanDrought)}.
        </p>
        <p>
          Temsil edilen hat: {r.representedLines} / 5. Doğrudan yeni alel
          üretimi: 0.
        </p>
        <ul>
          {breedingLines025.map((x) => (
            <li key={x.id}>
              {x.id}: verim {x.yield}; kuraklık {x.drought}{" "}
              {r.selected.some((y) => y.id === x.id) ? "— seçildi" : ""}
            </li>
          ))}
        </ul>
      </div>
    );
    diagram = (
      <Plot
        title="Seçilen hatlar ve hedef dışı özellik"
        extra={
          <p>
            Her sırada soldaki sütun verim, sağdaki kesik çerçeve kuraklık
            puanıdır. İşaretli satırlar seçilir. Sayısal puanlar yukarıda tam
            metin olarak bulunur.
          </p>
        }
      >
        {breedingLines025.map((x, i) => (
          <g
            key={x.id}
            data-line={x.id}
            data-selected={r.selected.some((y) => y.id === x.id)}
          >
            <rect
              x="35"
              y={10 + i * 32}
              width={x.yield * 8}
              height="18"
              className="b025-yield"
            />
            <rect
              x="130"
              y={10 + i * 32}
              width={x.drought * 8}
              height="18"
              className="b025-drought"
            />
            {r.selected.some((y) => y.id === x.id) && (
              <circle cx="234" cy={19 + i * 32} r="6" className="b025-dotA" />
            )}
            <text x="0" y={25 + i * 32}>
              {x.id}
            </text>
          </g>
        ))}
      </Plot>
    );
  }
  const guess = Object.hasOwn(options, v.guess) ? v.guess : "",
    canCompare = rawActiveValid && guess !== "" && v.reason.trim().length > 0;
  return (
    <section
      className="b025-lab"
      data-forge025={lessonId}
      aria-label="Biyoloji kanıt keşfi"
    >
      <h3>
        {seed
          ? "Tohumda köken ve koşulları izle"
          : "Kalıtsal fark ile çevre etkisini ayır"}
      </h3>
      <p>
        Bir koşul seç, gerekçeni yaz ve kanıtla kıyasla. Keşif puan veya bitirme
        kaydı üretmez.
      </p>
      <Menu
        label={seed ? "İnceleme" : "Çevre modeli"}
        value={seed ? v.view : v.environmentView}
        options={
          seed
            ? {
                lineage: "Döllenme ve doku kökeni",
                germination: "Çimlenme koşulları",
              }
            : {
                norm: "Genotip ve çevre yanıtı",
                selection: "Doğal seçilim ve maruziyet",
                mutation: "Mutasyon olasılığı ve hücre soyu",
                breeding: "Yapay seçilim ve ödünleşim",
              }
        }
        change={(x) => change(seed ? { view: x } : { environmentView: x })}
      />
      <div className="b025-controls">{controls}</div>
      {result}
      {diagram}
      <p className="b025-scope">{displayCopy025(description)}</p>
      <div className="b025-compare">
        <Menu
          label={prediction}
          value={guess}
          options={{ "": "Bir sonuç seç", ...options }}
          change={(guess) => commit({ guess, checked: false })}
        />
        <label className="b025-field">
          <span>Gerekçen</span>
          <input
            maxLength={128}
            value={v.reason}
            placeholder="Veri ve model varsayımına dayandır."
            onChange={(e) =>
              commit({ reason: e.target.value.slice(0, 128), checked: false })
            }
          />
        </label>
        <button
          type="button"
          disabled={!canCompare}
          onClick={() => commit({ checked: true })}
        >
          Kıyasla
        </button>
        <button type="button" onClick={() => commit({ show: !v.show })}>
          {v.show ? "Kanıtı kapat" : "Kanıtı göster"}
        </button>
        {v.checked && canCompare && (
          <p role="status" className="b025-feedback">
            {guess === expected
              ? "Kanıtla uyumlu."
              : "Veri ve koşullarla yeniden karşılaştır."}{" "}
            Beklenen sonuç: {options[expected]}. Yazılı gerekçe için otomatik
            not yoktur.
          </p>
        )}
        {v.show && (
          <p className="b025-proof">
            Kanıt: {options[expected]}. {displayCopy025(description)}
          </p>
        )}
      </div>
    </section>
  );
}
