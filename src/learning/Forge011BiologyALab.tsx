import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  fungalNutrition,
  plantEvidence,
  plantGroups,
  prokaryoteExperiment,
  protistExamples,
  protistExperiment,
  viralExperiment,
  virusStages,
  type Evidence,
  type ProkaryoteProcess,
} from "./forge011BiologyA";
import "./forge011BiologyA.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

const clamp = (v: number, min: number, max: number) =>
  Number.isFinite(v) ? Math.max(min, Math.min(max, Math.round(v))) : min;
function Drawing({ title, children }: { title: string; children: ReactNode }) {
  const uid = useId();
  return (
    <svg
      className="f011-bio-a-drawing"
      viewBox="0 0 640 300"
      role="img"
      aria-labelledby={uid}
    >
      <title id={uid}>{title}</title>
      {children}
    </svg>
  );
}
function Prediction({
  id,
  context,
  prompt,
  expected,
  options,
  explanation,
}: {
  id: string;
  context: string;
  prompt: string;
  expected: string;
  options: [string, string][];
  explanation: string;
}) {
  const uid = useId();
  const [s, set] = useExploration(`forge011:bio-a:prediction:${id}`, {
    guess: "",
    reason: "",
    evidence: "",
    checked: false,
  });
  const valid = options.some(([v]) => v === s.guess);
  return (
    <div className="f011-bio-a-prediction">
      <p>
        <strong>{prompt}</strong>
      </p>
      <label htmlFor={`${uid}-guess`}>Tahminin</label>
      <ChoiceSelect
        id={`${uid}-guess`}
        value={valid ? s.guess : ""}
        onChange={(e) => set({ guess: e.target.value, checked: false })}
      >
        <option value="">Bir sonuç seç</option>
        {options.map(([v, label]) => (
          <option key={v} value={v}>
            {label}
          </option>
        ))}
      </ChoiceSelect>
      <label htmlFor={`${uid}-reason`}>Gerekçen</label>
      <textarea
        id={`${uid}-reason`}
        rows={3}
        maxLength={120}
        value={s.reason.slice(0, 120)}
        onChange={(e) =>
          set({ reason: e.target.value.slice(0, 120), checked: false })
        }
        placeholder="Hangi yapı veya deney koşulunu kullandığını yaz…"
      />
      <button
        className="secondary"
        disabled={!valid || !s.reason.trim()}
        onClick={() => set({ checked: true, evidence: context })}
      >
        Tahminimi karşılaştır
      </button>
      {s.checked && s.evidence === context && valid && (
        <div className="f011-bio-a-feedback" role="status">
          <strong>
            {s.guess === expected
              ? "Seçimin modelle uyumlu."
              : "Seçimini modelin koşullarıyla yeniden karşılaştır."}
          </strong>
          <p>{explanation}</p>
          <p>Yazdığın gerekçe: {s.reason}</p>
          <p className="small muted">
            Gerekçen otomatik puanlanmaz; hangi kanıtı kullandığını açıklamayla
            karşılaştır.
          </p>
        </div>
      )}
    </div>
  );
}
function VirusLab() {
  const uid = useId();
  const [s, set] = useExploration("forge011:bio-a:virusler", {
    stage: 0,
    alive: true,
    receptor: true,
    compatible: true,
  });
  const stage = clamp(s.stage, 0, 4),
    model = viralExperiment(stage, s.alive, s.receptor, s.compatible);
  return (
    <>
      <h3>Bir virion nasıl çoğalır?</h3>
      <p>
        Litik bakteriyofaj yolunda adım adım ilerle. Reseptörü, canlılığı veya
        hücre içi uyumluluğu değiştir; bağlanma ile yeni üretimi ayır.
      </p>
      <div className="f011-bio-a-checks">
        {(
          [
            ["receptor", "Uygun reseptör var"],
            ["alive", "Konak hücre canlı"],
            ["compatible", "Hücre içi sentez koşulları uyumlu"],
          ] as const
        ).map(([key, label]) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={s[key]}
              onChange={(e) => set({ [key]: e.target.checked })}
            />
            {label}
          </label>
        ))}
      </div>
      <label htmlFor={`${uid}-stage`}>Çoğalma basamağı</label>
      <ChoiceSelect
        id={`${uid}-stage`}
        value={stage}
        onChange={(e) => set({ stage: Number(e.target.value) })}
      >
        {virusStages.map((name, i) => (
          <option key={name} value={i}>
            {i + 1}. {name}
          </option>
        ))}
      </ChoiceSelect>
      <Drawing title={`Bakteriyofaj modeli: ${model.label}`}>
        {model.released ? (
          <path
            data-host-lysis="true"
            className="f011-bio-a-cell f011-bio-a-lysis"
            d="M405 95H222a72 72 0 0 0 0 145h196a72 72 0 0 0 55-119M439 103l-7 14 15 8"
          />
        ) : (
          <rect
            data-host-intact="true"
            className="f011-bio-a-cell"
            x="150"
            y="95"
            width="340"
            height="145"
            rx="72"
          />
        )}
        <path
          className="f011-bio-a-dna"
          d="M235 155q20-35 45 0t45 0t45 0t45 0"
        />
        {s.receptor && (
          <path className="f011-bio-a-receptor" d="M238 95v-22h20v22" />
        )}
        <g
          data-virus-position={model.reached}
          transform={`translate(${model.reached < 0 ? 85 : 248} ${model.reached < 0 ? 50 : 40})`}
        >
          <path
            className="f011-bio-a-virus"
            d="M-18-20l18-10 18 10v22L0 12-18 2z"
          />
          <path
            className="f011-bio-a-line"
            d="M0 12v30m0-8-22 15m22-15 22 15"
          />
        </g>
        {model.reached >= 1 && (
          <path
            data-viral-genome="inside"
            className="f011-bio-a-viral-dna"
            d="M235 122q10-15 20 0t20 0t20 0"
          />
        )}
        {model.reached === 2 && s.alive && s.compatible && (
          <g data-viral-synthesis="visible">
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${275 + i * 48} 190)`}>
                <path
                  className="f011-bio-a-virus"
                  d="M-12-7l12-7 12 7v14L0 14-12 7z"
                />
                <path className="f011-bio-a-viral-dna" d="M-7 -30q7-7 14 0" />
              </g>
            ))}
          </g>
        )}
        {model.productive &&
          [0, 1, 2].map((i) => (
            <g
              data-new-virion="true"
              key={i}
              transform={`translate(${model.released ? 470 + i * 48 : 280 + i * 48} ${model.released ? 60 : 192})`}
            >
              <path
                className="f011-bio-a-virus"
                d="M-10-8l10-6 10 6v12L0 10-10 4z"
              />
              <path
                className="f011-bio-a-line"
                d="M0 10v15m0-5-10 9m10-9 10 9"
              />
            </g>
          ))}
        {model.block && (
          <path
            data-blocked="true"
            className="f011-bio-a-warning"
            d="M470 100l30 30m0-30-30 30"
          />
        )}
        <text x="320" y="277" textAnchor="middle">
          {model.released
            ? "Yeni parçacıklar dışarıda"
            : model.productive
              ? "Genom ve kapsid birleşti"
              : model.reached >= 2
                ? "Konak sistemiyle sentez"
                : model.reached >= 1
                  ? "Genom hücre içinde"
                  : model.reached === 0
                    ? "Yüzeye bağlanma"
                    : "Bağlanma engellendi"}
        </text>
      </Drawing>
      <div className="f011-bio-a-actions">
        <button
          className="secondary"
          disabled={stage === 4}
          onClick={() => set({ stage: stage + 1 })}
        >
          Sonraki çoğalma basamağı
        </button>
        <button
          className="secondary"
          onClick={() =>
            set({ stage: 0, alive: true, receptor: true, compatible: true })
          }
        >
          Başlangıca dön
        </button>
      </div>
      <div className="f011-bio-a-result" data-model-result>
        <strong>{model.label}</strong>
        <p>
          {model.productive
            ? "Yeni virion birleşmesi mümkün."
            : "Tam yeni virion birleşmesi bu aşamada gösterilmiyor."}{" "}
          {model.released
            ? "Çıkış gerçekleşti."
            : "Yeni parçacık çıkışı henüz gerçekleşmedi."}
        </p>
      </div>
      <p className="small muted">
        Üç yeni parçacık çizimi sayısal üretim tahmini değildir. Şema seçilmiş
        temel litik yolu gösterir; her virüs aynı yolla girip çıkmaz. Canlılık
        kapısı yeni sentezin gerekliliğini gösterir; ölü hücre kalıntısına yüzey
        bağlanması tek başına üretim sağlamaz.
      </p>
      <Prediction
        id="virusler"
        context={`${stage}:${s.alive}:${s.receptor}:${s.compatible}`}
        prompt="Bu seçili aşamada tam yeni virion birleşmesi mümkün mü?"
        expected={model.productive ? "yes" : "no"}
        options={[
          ["yes", "Evet, gereken koşullar ve birleşme aşaması sağlandı"],
          ["no", "Hayır, bir koşul veya gereken aşama eksik"],
        ]}
        explanation="Bağlanma, canlı uygun hücre ve sentez koşulları birlikte gereklidir; genom ve kapsid üretiminden sonra birleşme gerçekleşir. Bir engel varsa ileri aşamayı seçmek tek başına onu aşmaz."
      />
    </>
  );
}
function BacteriaLab() {
  const uid = useId();
  const [s, set] = useExploration("forge011:bio-a:bakteri-ve-arke", {
    process: "division",
    initial: 4,
  });
  const process: ProkaryoteProcess = [
    "division",
    "transfer",
    "endospore",
  ].includes(s.process)
    ? (s.process as ProkaryoteProcess)
    : "division";
  const initial = clamp(s.initial, 2, 8),
    model = prokaryoteExperiment(initial, process);
  return (
    <>
      <h3>Sayısı mı arttı, bilgisi mi değişti?</h3>
      <p>
        Aynı başlangıç grubunda tek bir olay seç. Bölünme, DNA aktarımı ve
        endosporu birey sayısı ve etkin durum bakımından karşılaştır.
      </p>
      <label htmlFor={`${uid}-count`}>Başlangıç bakteri sayısı</label>
      <ChoiceSelect
        id={`${uid}-count`}
        value={initial}
        onChange={(e) => set({ initial: Number(e.target.value) })}
      >
        {[2, 3, 4, 5, 6, 7, 8].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </ChoiceSelect>
      <label htmlFor={`${uid}-process`}>İşlem</label>
      <ChoiceSelect
        id={`${uid}-process`}
        value={process}
        onChange={(e) => set({ process: e.target.value })}
      >
        <option value="division">Her hücre bir kez bölünsün</option>
        <option value="transfer">Yalnız DNA aktarımı olsun</option>
        <option value="endospore">Her hücre bir endospor oluştursun</option>
      </ChoiceSelect>
      <Drawing
        title={`${model.label} Başlangıç ${initial}, son ${model.individuals} birey.`}
      >
        {Array.from({ length: initial }, (_, i) => (
          <rect
            key={i}
            className="f011-bio-a-cell"
            x={65 + (i % 4) * 58}
            y={55 + Math.floor(i / 4) * 66}
            width="42"
            height="24"
            rx="12"
          />
        ))}
        <path className="f011-bio-a-line" d="M285 130h55m-12-10 12 10-12 10" />
        {Array.from({ length: model.individuals }, (_, i) => (
          <g
            key={i}
            data-cell-state={process}
            transform={`translate(${375 + (i % 4) * 57} ${45 + Math.floor(i / 4) * 48})`}
          >
            <rect
              className={
                process === "endospore" ? "f011-bio-a-spore" : "f011-bio-a-cell"
              }
              width="40"
              height="24"
              rx="12"
            />
            {process === "endospore" ? (
              <ellipse
                className="f011-bio-a-spore-core"
                cx="20"
                cy="12"
                rx="10"
                ry="7"
              />
            ) : (
              <path className="f011-bio-a-dna" d="M8 13q6-9 12 0t12 0" />
            )}
            {process === "transfer" && i === 1 && (
              <circle
                data-acquired-plasmid="true"
                className="f011-bio-a-plasmid"
                cx="28"
                cy="10"
                r="4"
              />
            )}
          </g>
        ))}
        {process === "transfer" && (
          <path
            data-dna-transfer="true"
            className="f011-bio-a-transfer"
            d="M412 38q18-28 38 0m-10-3 10 3-3-10"
          />
        )}
        <text x="160" y="250" textAnchor="middle">
          Başlangıç: {initial}
        </text>
        <text x="472" y="250" textAnchor="middle">
          Son: {model.individuals}
        </text>
      </Drawing>
      <div className="f011-bio-a-result" data-model-result>
        <strong>{model.label}</strong>
        <p>
          Başlangıç: {initial} birey. Son: {model.individuals} birey.{" "}
          {model.spores
            ? `${model.spores} dayanıklı endospor; etkin hücre olarak gösterilen: ${model.active}.`
            : `Etkin hücre: ${model.active}.`}
        </p>
        <p>
          {model.dnaTransfer
            ? "Seçilmiş vericiden alıcıya plazmit aktarımı gösteriliyor; yeni birey oluşturulmuyor."
            : process === "endospore"
              ? "Bir hücre bir dayanıklı birime geçer. Yeniden etkinleşirse yine bir hücre oluşur."
              : "Her başlangıç hücresi iki hücreye dönüşür; ölüm ve başka işlem yoktur."}
        </p>
      </div>
      <p className="small muted">
        Endospor yapabilen seçilmiş bakteriler ve plazmit aktarabilen
        verici/alıcı kullanılır; özellikler bütün bakterilerde ortak değildir.
        Etkin sayının sıfır çizilmesi ölüm anlamına gelmez; model metabolik
        etkinliği düşük dayanıklı durumu ayırır.
      </p>
      <Prediction
        id="bakteri-ve-arke"
        context={`${initial}:${process}`}
        prompt="Bu tek işlem birey sayısını nasıl değiştirdi?"
        expected={process === "division" ? "double" : "same"}
        options={[
          ["double", "İki katına çıkardı"],
          ["same", "Birey sayısını artırmadı"],
        ]}
        explanation="Bölünme yeni hücre oluşturur. Konjugasyon kalıtsal bilgi aktarımıdır; endospor seçilmiş hücrenin dayanıklılık durumudur. Bu iki olay kendiliğinden yeni birey oluşturmaz."
      />
    </>
  );
}
function ProtistLab() {
  const uid = useId();
  const [s, set] = useExploration("forge011:bio-a:protista", {
    example: "euglena",
    light: true,
    organic: true,
    fresh: true,
  });
  const example = protistExamples.some((x) => x.id === s.example)
      ? s.example
      : "euglena",
    model = protistExperiment(example, s.light, s.organic, s.fresh);
  return (
    <>
      <h3>Aynı âlem başlığı, farklı yaşam yolları</h3>
      <p>
        Örneği seç ve koşulları değiştir. Çekirdekli düzen ortak kalırken
        hareket yapısı, fotosentez ve su düzenleme ihtiyacı aynı kalmak zorunda
        değildir.
      </p>
      <label htmlFor={`${uid}-example`}>Protist örneği</label>
      <ChoiceSelect
        id={`${uid}-example`}
        value={example}
        onChange={(e) => set({ example: e.target.value })}
      >
        {protistExamples.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </ChoiceSelect>
      <div className="f011-bio-a-checks">
        <label>
          <input
            type="checkbox"
            checked={s.light}
            onChange={(e) => set({ light: e.target.checked })}
          />
          Işık var
        </label>
        <label>
          <input
            type="checkbox"
            checked={s.organic}
            onChange={(e) => set({ organic: e.target.checked })}
          />
          Uygun hazır organik besin var
        </label>
        <label>
          <input
            type="checkbox"
            checked={s.fresh}
            onChange={(e) => set({ fresh: e.target.checked })}
          />
          Seçilmiş su örneği tatlı suda
        </label>
      </div>
      <Drawing
        title={`${model.summary} ${model.waterLoad ? "Fazla su girişini dengeleme yükü var." : "Bu şemada sürekli tatlı su yükü gösterilmiyor."}`}
      >
        {s.light && (
          <g data-light="on" className="f011-bio-a-sun">
            <circle cx="90" cy="60" r="25" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <path
                key={i}
                d="M90 24v-12"
                transform={`rotate(${i * 45} 90 60)`}
              />
            ))}
          </g>
        )}
        <path
          className="f011-bio-a-cell"
          d={
            example === "amoeba"
              ? "M210 110q-65-25-50 25t-20 45q-20 45 50 35t65 40q55 35 90-15t80-20q45-30-10-65t-55-55q-30-60-75-10t-75 20z"
              : example === "euglena"
                ? "M180 145q110-140 240 0-100 150-240 0z"
                : example === "alga"
                  ? "M210 110q0-30 30-30h120q30 0 30 30v95q0 30-30 30H240q-30 0-30-30z"
                  : "M180 140q10-90 140-75t125 90q-5 90-140 80t-125-95z"
          }
        />
        <circle className="f011-bio-a-nucleus" cx="310" cy="145" r="25" />
        {model.item.chloroplast &&
          [0, 1, 2, 3].map((i) => (
            <ellipse
              data-chloroplast="true"
              key={i}
              className={
                model.photosynthesis
                  ? "f011-bio-a-chloroplast active"
                  : "f011-bio-a-chloroplast"
              }
              cx={235 + (i % 2) * 125}
              cy={105 + Math.floor(i / 2) * 88}
              rx="20"
              ry="12"
            />
          ))}
        {example === "euglena" && (
          <path
            data-movement="flagellum"
            className="f011-bio-a-line"
            d="M180 145q-95-100-40-110t20 55"
          />
        )}
        {example === "paramecium" &&
          Array.from({ length: 12 }, (_, i) => (
            <path
              data-movement="cilia"
              key={i}
              className="f011-bio-a-line"
              d={`M${195 + i * 20} ${82 - Math.sin((i / 11) * Math.PI) * 20}v-14`}
            />
          ))}
        {model.waterLoad && (
          <g data-water-load="active">
            <circle className="f011-bio-a-water" cx="235" cy="157" r="19" />
            <path
              className="f011-bio-a-transfer"
              d="M235 177v52m-8-10 8 10 8-10"
            />
            <circle className="f011-bio-a-water" cx="235" cy="250" r="5" />
          </g>
        )}
        {example === "plasmodium" && (
          <ellipse
            className="f011-bio-a-host"
            cx="310"
            cy="150"
            rx="185"
            ry="125"
          />
        )}
        <text x="490" y="277" textAnchor="middle">
          {model.photosynthesis ? "Işıkla üretim" : "Fotosentez gösterilmiyor"}
        </text>
      </Drawing>
      <div className="f011-bio-a-result" data-model-result>
        <strong>{model.item.name}: ökaryot hücre</strong>
        <p>{model.summary}</p>
        <p>
          {model.photosynthesis
            ? "Seçili örnekte ışığa bağlı fotosentez mümkün."
            : "Seçili koşulda fotosentez gösterilmiyor."}{" "}
          {model.waterLoad
            ? "Seçilmiş tatlı su hücresinde fazla suyu uzaklaştırma yükü var."
            : "Bu şemada sürekli tatlı su yükü gösterilmiyor."}
        </p>
      </div>
      <p className="small muted">
        Şekiller ölçekli değildir; tüm organeller çizilmez. Öglenanın hazır
        organik besinden yararlanması seçilmiş örneğin koşuludur. Başka türlere
        genellenmez. Çizimde hareket yapısı gösterilmemesi bütün evrelerde
        hareket olamayacağı anlamına gelmez.
      </p>
      <Prediction
        id="protista"
        context={`${example}:${s.light}:${s.organic}:${s.fresh}`}
        prompt="Seçili örnekte ve ışık koşulunda fotosentez gösteriliyor mu?"
        expected={model.photosynthesis ? "yes" : "no"}
        options={[
          ["yes", "Evet, uygun fotosentetik örnek ve ışık var"],
          ["no", "Hayır, örnek veya ışık koşulu uygun değil"],
        ]}
        explanation="Fotosentetik yapı ve uygun ışık birlikte gerekir. Karanlıkta fotosentez gösterilmez; bu bütün solunumun durduğu anlamına gelmez. Amip veya paramesyuma yalnız ışık vererek kloroplast kazandıramazsın."
      />
    </>
  );
}
function PlantsLab() {
  const uid = useId();
  const [s, set] = useExploration("forge011:bio-a:bitkiler", {
    vascular: "unknown",
    seed: "unknown",
    fruit: "unknown",
  });
  const valid = (v: string): Evidence =>
    ["unknown", "yes", "no"].includes(v) ? (v as Evidence) : "unknown";
  const v = valid(s.vascular),
    seed = valid(s.seed),
    fruit = valid(s.fruit),
    candidates = plantEvidence(v, seed, fruit),
    ids = candidates.map((c) => c.id);
  const controls = [
    ["vascular", "İletim dokusu kanıtı", v],
    ["seed", "Tohum kanıtı", seed],
    ["fruit", "Meyve kanıtı", fruit],
  ] as const;
  return (
    <>
      <h3>Kanıt ağacında adayları ele</h3>
      <p>
        Dört öğretici örnek arasında damar, tohum ve meyve kanıtlarını bağımsız
        değiştir. Bilinmeyen bir özelliği yok saymak yerine “İncelenmedi” olarak
        bırak.
      </p>
      <div className="f011-bio-a-controls">
        {controls.map(([key, label, value]) => (
          <div key={key}>
            <label htmlFor={`${uid}-${key}`}>{label}</label>
            <ChoiceSelect
              id={`${uid}-${key}`}
              value={value}
              onChange={(e) => set({ [key]: e.target.value })}
            >
              <option value="unknown">İncelenmedi</option>
              <option value="yes">Var</option>
              <option value="no">Yok</option>
            </ChoiceSelect>
          </div>
        ))}
      </div>
      <Drawing
        title={`Kanıt ağacı; ${candidates.length} uyumlu aday: ${candidates.map((c) => c.name).join(", ") || "yok"}`}
      >
        <circle className="f011-bio-a-root" cx="320" cy="35" r="20" />
        {plantGroups.map((p, i) => (
          <g
            key={p.id}
            data-plant-candidate={p.id}
            data-compatible={ids.includes(p.id)}
            className={
              ids.includes(p.id)
                ? "f011-bio-a-plant active"
                : "f011-bio-a-plant"
            }
          >
            <path
              className="f011-bio-a-tree"
              d={`M320 55C320 100 ${80 + i * 160} 95 ${80 + i * 160} 135`}
            />
            <circle
              className="f011-bio-a-root"
              cx={80 + i * 160}
              cy="150"
              r="24"
            />
            <text x={80 + i * 160} y="156" textAnchor="middle">
              {i + 1}
            </text>
            <path
              className="f011-bio-a-stem"
              d={`M${80 + i * 160} 240v-55m0 30-20-15m20 5 22-14`}
            />
            {p.id === "pine" ? (
              <path
                className="f011-bio-a-leaf"
                d={`M${80 + i * 160} 180l-28 35h56z`}
              />
            ) : (
              <>
                <ellipse
                  className="f011-bio-a-leaf"
                  cx={64 + i * 160}
                  cy="205"
                  rx="14"
                  ry="7"
                />
                <ellipse
                  className="f011-bio-a-leaf"
                  cx={98 + i * 160}
                  cy="195"
                  rx="14"
                  ry="7"
                />
              </>
            )}
            {p.seed && (
              <ellipse
                className="f011-bio-a-seed"
                cx={80 + i * 160}
                cy="256"
                rx="6"
                ry="9"
              />
            )}
            {p.fruit && (
              <circle
                className="f011-bio-a-fruit"
                cx={80 + i * 160}
                cy="188"
                r="11"
              />
            )}
          </g>
        ))}
      </Drawing>
      <ol className="f011-bio-a-candidates">
        {plantGroups.map((p) => (
          <li key={p.id} data-candidate-label={p.id}>
            <strong>
              {p.name} · {p.group}
            </strong>
            <span>
              {ids.includes(p.id)
                ? "Kanıtlarla uyumlu"
                : "Bu kanıtlarla elendi"}
            </span>
          </li>
        ))}
      </ol>
      <button
        className="secondary"
        onClick={() =>
          set({ vascular: "unknown", seed: "unknown", fruit: "unknown" })
        }
      >
        Kanıtları sıfırla
      </button>
      <div className="f011-bio-a-result" data-model-result>
        <strong>{candidates.length} uyumlu aday</strong>
        <p>
          {candidates.length
            ? candidates.map((p) => `${p.name} (${p.group})`).join("; ")
            : "Bu dört örneğin hiçbiri bütün seçilmiş kanıtları sağlamıyor; çelişen veri veya farklı kapsamı yeniden incele."}
        </p>
      </div>
      <p className="small muted">
        Ağaç dört örnek için bir karar şemasıdır; evrim ağacı veya bütün türler
        için teşhis değildir. Solmuş dal elenmiş adayı gösterir. “İncelenmedi”
        yokluk kanıtı değildir.
      </p>
      <Prediction
        id="bitkiler"
        context={`${v}:${seed}:${fruit}`}
        prompt="Bu kanıtlar dört örnek arasında tek bir aday bırakıyor mu?"
        expected={candidates.length === 1 ? "yes" : "no"}
        options={[
          ["yes", "Evet, tam bir aday kaldı"],
          ["no", "Hayır, birden fazla aday veya uyumsuzluk var"],
        ]}
        explanation="Kesinlik için tek adayın bütün verilen özellikleri birlikte sağlaması gerekir. Meyve yokluğu tek başına üç aday bırakır; damar var ve tohum yok birlikte eğreltiyi seçer. Çelişkili kanıtta kesin tür uydurulmaz."
      />
    </>
  );
}
function FungiLab() {
  const [s, set] = useExploration("forge011:bio-a:mantarlar", {
    stage: 0,
    enzyme: true,
  });
  const stage = clamp(s.stage, 0, 2),
    model = fungalNutrition(stage, s.enzyme);
  return (
    <>
      <h3>Büyük besinden emilebilir ürüne</h3>
      <p>
        Her büyük zincir üç monomer birimi taşır. Önce dış sindirimi, sonra
        zarla alımı izle; enzimi kapatıp hangi basamağın durduğunu
        sınayabilirsin.
      </p>
      <label className="f011-bio-a-check">
        <input
          type="checkbox"
          checked={s.enzyme}
          onChange={(e) => set({ enzyme: e.target.checked })}
        />
        Dış sindirim enzimi çalışıyor
      </label>
      <div className="f011-bio-a-actions">
        {[
          "Başlangıç: büyük besin",
          "Dışarıda sindir",
          "Küçük ürünleri içeri al",
        ].map((label, i) => (
          <button
            className="secondary"
            key={label}
            aria-pressed={stage === i}
            onClick={() => set({ stage: i })}
          >
            {label}
          </button>
        ))}
      </div>
      <Drawing title={`${model.label} Toplam altı monomer birimi korunur.`}>
        <rect
          className="f011-bio-a-cell"
          x="350"
          y="45"
          width="210"
          height="210"
          rx="55"
        />
        <path className="f011-bio-a-dna" d="M430 90q15-20 30 0t30 0" />
        {Array.from({ length: model.polymers }, (_, p) => (
          <g data-polymer="true" key={p}>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <circle
                  className="f011-bio-a-food"
                  cx={105 + i * 45}
                  cy={100 + p * 80}
                  r="16"
                />
                {i < 2 && (
                  <path
                    className="f011-bio-a-food-link"
                    d={`M${121 + i * 45} ${100 + p * 80}h13`}
                  />
                )}
              </g>
            ))}
          </g>
        ))}
        {Array.from({ length: model.outsideMonomers }, (_, i) => (
          <circle
            data-outside-product="true"
            key={i}
            className="f011-bio-a-food"
            cx={95 + (i % 3) * 62}
            cy={100 + Math.floor(i / 3) * 80}
            r="13"
          />
        ))}
        {Array.from({ length: model.insideMonomers }, (_, i) => (
          <circle
            data-inside-product="true"
            key={i}
            className="f011-bio-a-food"
            cx={420 + (i % 2) * 60}
            cy={145 + Math.floor(i / 2) * 60}
            r="13"
          />
        ))}
        {s.enzyme && stage >= 1 && (
          <path
            data-extracellular-enzyme="true"
            className="f011-bio-a-enzyme"
            d="M270 100l18-15 20 17-18 10-20-12m18 15v25"
          />
        )}
        {model.insideMonomers > 0 && (
          <path
            data-uptake="true"
            className="f011-bio-a-transfer"
            d="M275 180h85m-14-10 14 10-14 10"
          />
        )}
        <text x="170" y="280" textAnchor="middle">
          Hücre dışı
        </text>
        <text x="455" y="280" textAnchor="middle">
          Hücre içi
        </text>
      </Drawing>
      <div className="f011-bio-a-result" data-model-result>
        <strong>{model.label}</strong>
        <p>
          Büyük zincir: {model.polymers}. Küçük ürün dışarıda:{" "}
          {model.outsideMonomers}; içeride: {model.insideMonomers}.
        </p>
        <p>
          Korunan toplam: {model.totalMonomerUnits} monomer birimi.{" "}
          {model.insideMonomers > 0
            ? "Dış sindirimden sonra emilim gerçekleşti."
            : "Henüz içeri alınmış küçük ürün yok."}
        </p>
      </div>
      <p className="small muted">
        Model kapalıdır; tüketim, atılım ve metabolik kayıp eklenmez. Zincir
        çizgileri moleküllerin bağlandığını gösterir. Gerçek sindirim süresi,
        enzim dozu veya ATP bilançosu hesaplanmaz.
      </p>
      <Prediction
        id="mantarlar"
        context={`${stage}:${s.enzyme}`}
        prompt="Bu seçili adımda besin birimleri hücre içine alınmış mı?"
        expected={model.insideMonomers > 0 ? "yes" : "no"}
        options={[
          ["yes", "Evet, küçük ürünlerin bir bölümü içeride"],
          ["no", "Hayır, alım aşaması veya dış sindirim koşulu eksik"],
        ]}
        explanation="Büyük zincirin parçalanması ile küçük ürünün zar üzerinden alınması ayrı basamaklardır. Bu seçilmiş modelde dış enzim kapalıysa zincir parçalanmaz ve sonraki alım düğmesi engeli kendiliğinden çözmez. Toplam altı monomer birimi korunur."
      />
    </>
  );
}
export default function Forge011BiologyALab({ id }: { id: string }) {
  return (
    <section className="f011-bio-a" data-forge011={id}>
      {id === "virusler" ? (
        <VirusLab />
      ) : id === "bakteri-ve-arke" ? (
        <BacteriaLab />
      ) : id === "protista" ? (
        <ProtistLab />
      ) : id === "bitkiler" ? (
        <PlantsLab />
      ) : (
        <FungiLab />
      )}
      <p className="small muted f011-bio-a-evidence">
        Bu keşif notu çalışma durumunu korur; soru doğrusu, XP veya konu
        tamamlanması sayılmaz. Bağımsız alıştırmalar Sorular bölümündedir.
      </p>
    </section>
  );
}
