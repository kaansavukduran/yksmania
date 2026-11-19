import { useId, type ReactNode } from "react";
import {
  acidBase016,
  colligative016,
  indicator016,
  neutralization016,
  separation016,
} from "./forge016Chemistry";
import { useExploration } from "./useExploration";
import "./forge016Chemistry.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number, digits = 3) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(n);
const sci = (n: number) => {
  if (n === 0) return "0";
  let exponent = Math.floor(Math.log10(n));
  let mantissa = Number((n / 10 ** exponent).toPrecision(5));
  if (mantissa >= 10) {
    mantissa /= 10;
    exponent += 1;
  }
  return `${fmt(mantissa, 4)} × 10^${exponent}`;
};
function Slider({
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
    <div className="c016-control">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{fmt(value, 8)}</output>
      <input
        id={id}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
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
  choices: [string, string][];
  onChange: (v: string) => void;
}) {
  const id = useId(),
    selected = choices.find(([key]) => key === value)?.[1] ?? choices[0][1];
  return (
    <div className="c016-control">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {choices.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </ChoiceSelect>
      <p className="c016-current">Seçili: {selected}</p>
    </div>
  );
}
export default function Forge016ChemistryLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const uid = useId();
  const [s, set] = useExploration(`forge016:chemistry:${lessonId}`, {
    mode: "colligative",
    solute: 0.05,
    water: 1,
    particles: "1",
    stage: 0,
    recovery: "distill",
    kind: "acid",
    exponent: -2,
    acidM: 0.2,
    acidMl: 25,
    baseM: 0.1,
    baseMl: 25,
    prediction: "",
    reason: "",
    compared: false,
  });
  const change = (v: Parameters<typeof set>[0]) =>
    set({ ...v, compared: false });
  const scalar = (
    label: string,
    field:
      | "solute"
      | "water"
      | "stage"
      | "exponent"
      | "acidM"
      | "acidMl"
      | "baseM"
      | "baseMl",
    min: number,
    max: number,
    step = 1,
  ) => (
    <Slider
      key={field}
      label={label}
      value={s[field]}
      min={min}
      max={max}
      step={step}
      onChange={(value) => change({ [field]: value })}
    />
  );
  let heading = "",
    intro = "",
    controls: ReactNode = null,
    diagram: ReactNode = null,
    result: ReactNode = null,
    caption = "",
    correct = "";
  if (lessonId === "koligatif-ayirma") {
    heading = "Tanecik ve ayırma yolu";
    intro =
      "Aynı çözücü kütlesinde etkin taneciği karşılaştır; diğer görünümde dört bileşenin nereye gittiğini izle. Çizim bir öğretim modelidir, gerçek deney saflığı veya kesin ölçüm değildir.";
    const mode = s.mode === "separation" ? "separation" : "colligative",
      r = colligative016(s.solute, s.water, Number(s.particles)),
      v = separation016(s.stage, s.recovery === "distill");
    controls = (
      <>
        <Choice
          label="Keşif"
          value={mode}
          choices={[
            ["colligative", "Koligatif karşılaştırma"],
            ["separation", "Ayırma envanteri"],
          ]}
          onChange={(mode) => change({ mode })}
        />
        {mode === "colligative" ? (
          <>
            {scalar("Çözünen miktarı (mol)", "solute", 0, 0.1, 0.01)}
            {scalar("Su kütlesi (kg)", "water", 1, 3, 0.5)}
            <Choice
              label="Çözünme varsayımı"
              value={String(r.i)}
              choices={[
                ["1", "Şeker: i = 1"],
                ["2", "NaCl: i = 2"],
                ["3", "CaCl₂: i = 3"],
              ]}
              onChange={(particles) => change({ particles })}
            />
          </>
        ) : (
          <>
            {scalar("Ayırma adımı", "stage", 0, 3)}
            <Choice
              label="Suya uygulanan işlem"
              value={s.recovery}
              choices={[
                ["distill", "Damıt ve suyu topla"],
                ["evaporate", "Yalnız buharlaştır"],
              ]}
              onChange={(recovery) => change({ recovery })}
            />
          </>
        )}
      </>
    );
    if (mode === "colligative") {
      const x = 60 + (r.n * 390) / 0.1,
        y = 250 - (r.freezingDrop * 210) / 0.6,
        endY = 250 - (((1.86 * r.i * 0.1) / r.water) * 210) / 0.6;
      diagram = (
        <svg
          className="c016-drawing"
          viewBox="0 0 500 340"
          role="img"
          aria-labelledby={`${uid}-model-title`}
        >
          <title id={`${uid}-model-title`}>
            Verilen ideal su modeli: çözünen molü ile donma alçalması
          </title>
          <path className="c016-axis" d="M60 35 V250 H450" />
          <path className="c016-curve" d={`M60 250 L450 ${endY}`} />
          <text x="60" y="24">
            ΔTf (°C)
          </text>
          <text x="45" y="275">
            0
          </text>
          <text x="45" y="49" textAnchor="end">
            0,6
          </text>
          <text x="245" y="275" textAnchor="middle">
            0,05
          </text>
          <text x="450" y="275" textAnchor="end">
            0,10
          </text>
          <text x="250" y="315" textAnchor="middle">
            Çözünen (mol)
          </text>
          <circle
            data-freezing-drop={r.freezingDrop}
            data-current-solute={r.n}
            cx={x}
            cy={y}
            r="9"
            className="c016-marker"
          />
        </svg>
      );
      caption =
        "Düşey eksen donmanın başladığı sıcaklık değil, pozitif donma alçalmasıdır. Çizgi seçili i ve su kütlesinde verilen ideal ilişkiyi; nokta seçili çözünen miktarını gösterir.";
      result = (
        <>
          <p>
            Çözünmüş etkin miktar <strong>{fmt(r.effective)} mol</strong>;
            çözücüye göre oran <strong>{fmt(r.molality)} mol/kg</strong>.
          </p>
          <p>
            Donma alçalması <strong>{fmt(r.freezingDrop, 4)} °C</strong>; donma
            başlangıcı <strong>{fmt(r.freezingC, 4)} °C</strong>.
          </p>
          <p>
            1 atm modelinde kaynama başlangıcı{" "}
            <strong>{fmt(r.boilingC, 4)} °C</strong>. Kf = 1,86 ve Kb = 0,52 °C
            kg/mol verilmiştir; gerçek derişik çözelti sonucu garanti edilmez.
          </p>
          <p>
            {r.n === 0
              ? "Çözünen yok; bu modelde saf su var."
              : "İyonlara ayrışma tam, iyon etkileşimleri ihmal kabul edildi. Çözünmeyen ayrı katı bu hesaba katılmaz."}
          </p>
        </>
      );
      correct = `Verilen modelde donma alçalması ${fmt(r.freezingDrop, 4)} °C; etkin oran ${fmt(r.molality)} mol/kg.`;
    } else {
      const rows = [
        { id: "iron", name: "Alınan Fe", n: v.iron },
        { id: "sand", name: "Alınan kum", n: v.sand },
        { id: "vessel", name: "İşlem kabı", n: v.vessel },
        { id: "water", name: "Toplanan su", n: v.waterCollected },
        { id: "surroundings", name: "Çevreye su", n: v.waterToSurroundings },
      ];
      diagram = (
        <svg
          className="c016-drawing"
          viewBox="0 0 500 440"
          role="img"
          aria-labelledby={`${uid}-model-title`}
        >
          <title id={`${uid}-model-title`}>
            Ayırmada farklı kapların ve çevrenin kütle envanteri
          </title>
          {rows.map((row, i) => (
            <g key={row.id}>
              <text x="50" y={25 + i * 70}>
                {row.name}
              </text>
              <text x="450" y={25 + i * 70} textAnchor="end">
                {fmt(row.n)} g
              </text>
              <rect
                data-separation-bin={row.id}
                data-mass={row.n}
                x="50"
                y={35 + i * 70}
                width={(row.n * 400) / 120}
                height="20"
                className={i % 2 ? "c016-fill-mint" : "c016-fill-coral"}
              />
            </g>
          ))}
          <path className="c016-axis" d="M50 390 H450" />
          <text x="50" y="420">
            0 g
          </text>
          <text x="250" y="420" textAnchor="middle">
            60 g
          </text>
          <text x="450" y="420" textAnchor="end">
            120 g
          </text>
        </svg>
      );
      caption =
        "Başlangıç: Fe 4 g, kum 6 g, tamamen çözünmüş tuz 10 g, su 100 g. Ortak yatay eksen kütledir; sıfırdan başlar. Çubuklar ayrı kapları ve çevreye giden suyu sayar, tanecik sayısı değildir.";
      result = (
        <>
          <p>
            Adım {v.step}:{" "}
            {
              [
                "Başlangıç karışımı",
                "Mıknatıs Fe bileşenini aldı",
                "Filtre kumu ayırdı; filtrat tuzludur",
                "Son su ayırma işlemi",
              ][v.step]
            }
            .
          </p>
          <p>
            İşlem kabı <strong>{fmt(v.vessel)} g</strong>; alınan Fe {v.iron} g,
            kum {v.sand} g.
          </p>
          <p>
            Toplanan su <strong>{v.waterCollected} g</strong>; çevreye giden su{" "}
            <strong>{v.waterToSurroundings} g</strong>; bütün envanter{" "}
            <strong>{v.total} g</strong>.
          </p>
          <p>
            {v.step < 3
              ? "10 g tuz çözeltide suyla birliktedir; sıradan filtre çözünmüş iyonları tutmaz."
              : "İlk kapta 10 g kuru tuz kalır. Su çevreye gittiyse geri kazanılmış sayılmaz."}{" "}
            Kayıp, sürüklenme ve tepkime olmadığı varsayıldı.
          </p>
        </>
      );
      correct = `Toplanan su ${v.waterCollected} g, çevreye su ${v.waterToSurroundings} g; toplam 120 g korunur.`;
    }
  } else if (lessonId === "asit-baz-tuz-ozellikleri") {
    heading = "pH, derişim ve gösterge";
    intro =
      "25 °C ideal sulu modelde güçlü tek protonlu HCl, güçlü NaOH veya saf suyu seç. Suyun öz iyonlaşması da hesaplanır; çok küçük asit derişimi yanlışlıkla bazik sayılmaz.";
    const r = acidBase016(s.kind, s.exponent),
      ind = indicator016(r.pH),
      x = 50 + (r.pH * 400) / 14;
    controls = (
      <>
        <Choice
          label="Numune"
          value={r.type}
          choices={[
            ["acid", "Güçlü HCl"],
            ["base", "Güçlü NaOH"],
            ["water", "Saf su"],
          ]}
          onChange={(kind) => change({ kind })}
        />
        {r.type !== "water" ? (
          scalar("Derişim üssü", "exponent", -8, -1)
        ) : (
          <p>Saf su için eklenen asit veya baz derişimi sıfırdır.</p>
        )}
        <p>
          Formal derişim: {sci(r.concentration)} mol/L. Örneğin üs −3, 10⁻³
          mol/L demektir. Kuvvet tür özelliği, derişim numune miktarıdır.
        </p>
      </>
    );
    diagram = (
      <svg
        className="c016-drawing"
        viewBox="0 0 500 280"
        role="img"
        aria-labelledby={`${uid}-model-title`}
      >
        <title id={`${uid}-model-title`}>
          25 °C sulu numunenin hesaplanan pH konumu ve verilen gösterge aralığı
        </title>
        <rect
          x="50"
          y="65"
          width="200"
          height="30"
          className="c016-fill-coral"
        />
        <rect
          x="250"
          y="65"
          width="200"
          height="30"
          className="c016-fill-mint"
        />
        <path className="c016-axis" d="M50 105 H450 M250 55 V115" />
        <text x="50" y="138">
          0
        </text>
        <text x="250" y="138" textAnchor="middle">
          7
        </text>
        <text x="450" y="138" textAnchor="end">
          14
        </text>
        <text x="250" y="175" textAnchor="middle">
          pH
        </text>
        <circle
          data-ph-marker={r.pH}
          cx={x}
          cy="45"
          r="10"
          className="c016-marker"
        />
        <text x="50" y="230">
          Gösterge:
        </text>
        <text x="450" y="230" textAnchor="end" data-indicator-color={ind.color}>
          {ind.color}
        </text>
      </svg>
    );
    caption =
      "Nokta hesaplanan pH değeridir; 7 işareti yalnız 25 °C nötrlük referansıdır. Gösterge fenolftalein için verilen 8,2–10,0 aralığına göre okunur. Renksiz olmak kesin asit kanıtı değildir.";
    result = (
      <>
        <p>
          <strong>{r.classification}</strong> numune; pH{" "}
          <strong>{fmt(r.pH, 4)}</strong>, pOH {fmt(r.pOH, 4)}.
        </p>
        <p>
          H₃O⁺: <strong>{sci(r.hydronium)} mol/L</strong>; OH⁻:{" "}
          <strong>{sci(r.hydroxide)} mol/L</strong>.
        </p>
        <p>
          Fenolftalein: <strong>{ind.color}</strong>. Kalibrasyon verisi: pH 8,2
          altında renksiz, 8,2–10,0 geçiş aralığı, 10,0 üstünde pembe kabul
          edildi.
        </p>
        <p>
          {r.type === "water"
            ? "Derişimler eşit; iki iyon da sıfır değildir."
            : "Bu panel yalnız güçlü türlerin verilen ideal modelini hesaplar; zayıf asidin kuvvetini tek pH sayısından belirlemez."}{" "}
          pH 0–14 bütün gerçek çözeltilerin evrensel sınırı değildir.
        </p>
      </>
    );
    correct = `25 °C modelinde ${r.classification.toLocaleLowerCase("tr-TR")}; pH ${fmt(r.pH, 4)}, gösterge ${ind.color.toLocaleLowerCase("tr-TR")}.`;
  } else if (lessonId === "asit-baz-tepkimeleri") {
    heading = "Artanı ve son hacmi izle";
    intro =
      "HCl + NaOH → NaCl + H₂O. 25 °C, tam ayrışan güçlü çift, ideal sulu model ve hacimlerin toplanması verilidir. Na⁺/Cl⁻ seyircidir; bu sonuç zayıf asit veya baz tuzlarına koşulsuz taşınmaz.";
    const r = neutralization016(s.acidM, s.acidMl, s.baseM, s.baseMl),
      x = 60 + (r.vb * 390) / 100,
      y = 260 - (r.pH * 220) / 14;
    controls = (
      <>
        {scalar("HCl derişimi (mol/L)", "acidM", 0, 0.2, 0.01)}
        {scalar("HCl hacmi (mL)", "acidMl", 10, 50, 5)}
        {scalar("NaOH derişimi (mol/L)", "baseM", 0, 0.2, 0.01)}
        {scalar("NaOH hacmi (mL)", "baseMl", 0, 100, 5)}
      </>
    );
    const points = Array.from({ length: 201 }, (_, i) => {
      const v = i * 0.5,
        p = neutralization016(r.ca, r.va, r.cb, v).pH;
      return `${60 + (v * 390) / 100},${260 - (p * 220) / 14}`;
    }).join(" ");
    diagram = (
      <svg
        className="c016-drawing"
        viewBox="0 0 500 350"
        role="img"
        aria-labelledby={`${uid}-model-title`}
      >
        <title id={`${uid}-model-title`}>
          Verilen HCl numunesine NaOH eklenirken ideal pH eğrisi
        </title>
        <path className="c016-axis" d="M60 30 V260 H450" />
        <polyline className="c016-curve" points={points} />
        <text x="60" y="20">
          pH
        </text>
        <text x="45" y="50" textAnchor="end">
          14
        </text>
        <text x="45" y="155" textAnchor="end">
          7
        </text>
        <text x="45" y="265" textAnchor="end">
          0
        </text>
        <text x="60" y="290">
          0
        </text>
        <text x="255" y="290" textAnchor="middle">
          50
        </text>
        <text x="450" y="290" textAnchor="end">
          100
        </text>
        <text x="250" y="330" textAnchor="middle">
          NaOH hacmi (mL)
        </text>
        <circle
          data-neutral-ph={r.pH}
          data-base-ml={r.vb}
          cx={x}
          cy={y}
          r="9"
          className="c016-marker"
        />
      </svg>
    );
    caption =
      "Yatay eksen eklenen NaOH hacmi, düşey eksen pH. Eğri seçili asit miktarı ve baz derişimi içindir; nokta seçili baz hacmini gösterir. Eşdeğer mol noktası yakınındaki keskin değişim yalnız verilen güçlü çift modeline aittir.";
    result = (
      <>
        <p>
          Başlangıç asit <strong>{fmt(r.acid, 5)} mol</strong>; baz{" "}
          <strong>{fmt(r.base, 5)} mol</strong>. Yeni su:{" "}
          <strong>{fmt(r.reacted, 5)} mol</strong> (H⁺ kısaltmalı net denkleme
          göre).
        </p>
        <p>
          Artan güçlü asit <strong>{fmt(r.remainingAcid, 5)} mol</strong>; artan
          güçlü baz <strong>{fmt(r.remainingBase, 5)} mol</strong>.
        </p>
        <p>
          Son hacim <strong>{fmt(r.volumeL * 1000)} mL</strong>. Net fazla güçlü
          asit derişimi {fmt(r.net, 5)} mol/L; eksi işaret baz fazlasıdır.
        </p>
        <p>
          <strong>{r.classification}</strong>; pH{" "}
          <strong>{fmt(r.pH, 4)}</strong>. Su iyonlaşması dahil; Na⁺/Cl⁻
          iyonları yok olmaz ve bu modelde tuz kristali çizilmez.
        </p>
      </>
    );
    correct = `Bu hacimde ${r.classification.toLocaleLowerCase("tr-TR")}; asit fazlası ${fmt(r.remainingAcid, 5)} mol, baz fazlası ${fmt(r.remainingBase, 5)} mol.`;
  } else return null;
  const reason = s.reason.slice(0, 120),
    prediction =
      s.prediction === "0"
        ? "0"
        : s.prediction === "1"
          ? "1"
          : s.prediction === "2"
            ? "2"
            : "";
  return (
    <section
      data-forge016={lessonId}
      className="forge016-chemistry"
      aria-labelledby={`${uid}-heading`}
    >
      <h3 id={`${uid}-heading`}>{heading}</h3>
      <p>{intro}</p>
      <div className="c016-controls">{controls}</div>
      <figure>
        {diagram}
        <figcaption>{caption}</figcaption>
      </figure>
      <div data-model-result className="c016-result" aria-live="polite">
        {result}
      </div>
      <div className="c016-prediction">
        <h4>Önce tahmin et, sonra kanıtla karşılaştır</h4>
        <Choice
          label="Sonuç tahminin"
          value={prediction}
          choices={[
            ["", "Bir sonuç seç"],
            ["0", correct],
            ["1", "Koşullar ve türler değişse de bütün sonuçlar sabit kalır."],
            [
              "2",
              "Çizim kendi başına gerçek deney saflığını ve tam öğrenmeyi kanıtlar.",
            ],
          ]}
          onChange={(prediction) => change({ prediction })}
        />
        <label className="c016-control">
          <span>Gerekçen (en çok 120 karakter)</span>
          <textarea
            aria-label="Gerekçen (en çok 120 karakter)"
            maxLength={120}
            value={reason}
            rows={3}
            onChange={(e) => change({ reason: e.target.value.slice(0, 120) })}
          />
        </label>
        <button
          type="button"
          className="secondary"
          disabled={!reason.trim() || prediction === ""}
          onClick={() => set({ compared: true })}
        >
          Tahminimi karşılaştır
        </button>
        {s.compared && (
          <div role="status" className="c016-feedback">
            <strong>
              {prediction === "0"
                ? "Seçimin modelle uyumlu."
                : "Koşulları ve kanıtı yeniden karşılaştır."}
            </strong>
            <p>Kanıt: {correct}</p>
            <p>Gerekçen: {reason}</p>
          </div>
        )}
      </div>
      <p className="c016-footnote">
        Keşif seçimlerin ve gerekçen bu cihazda saklanır. Süre, çizim ve bu
        deneme öğrenme puanı, ustalık ya da konu tamamlama oluşturmaz.
      </p>
    </section>
  );
}
