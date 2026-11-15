import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  sarcomere017,
  muscleSteps017,
  muscleStep017,
  motorRecruitment017,
  swallowingStages017,
  swallowing017,
  cubeSurface017,
  gastricSignals017,
  gastricScene017,
  gastricFluid017,
  type MuscleStep017,
  type GastricSignal017,
} from "./forge017Biology";
import "./forge017Biology.css";

const n = (x: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 }).format(x);
const bound = (x: number, a: number, b: number) =>
  Number.isFinite(x) ? Math.max(a, Math.min(b, x)) : a;
function Drawing({
  title,
  height = 360,
  children,
}: {
  title: string;
  height?: number;
  children: ReactNode;
}) {
  const uid = useId();
  return (
    <svg
      className="bio017-drawing"
      role="img"
      aria-labelledby={uid}
      viewBox={`0 0 360 ${height}`}
    >
      <title id={uid}>{title}</title>
      {children}
    </svg>
  );
}
function Arrow({
  x1,
  y1,
  x2,
  y2,
  active = true,
  kind = "flow",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
  kind?: string;
}) {
  const uid = useId();
  return (
    <g
      data-flow={kind}
      data-active={active}
      className={active ? "bio017-arrow" : "bio017-arrow bio017-muted"}
    >
      <defs>
        <marker
          id={uid}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10Z" fill="currentColor" />
        </marker>
      </defs>
      <path d={`M${x1},${y1}L${x2},${y2}`} markerEnd={`url(#${uid})`} />
    </g>
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
  const uid = useId();
  return (
    <div className="bio017-field">
      <label htmlFor={uid}>{label}</label>
      <input
        id={uid}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <output htmlFor={uid}>{n(value)}</output>
    </div>
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
  options: [string, string][];
  onChange: (s: string) => void;
}) {
  const uid = useId();
  return (
    <div className="bio017-field">
      <label htmlFor={uid}>{label}</label>
      <select id={uid} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([k, t]) => (
          <option key={k} value={k}>
            {t}
          </option>
        ))}
      </select>
      <output htmlFor={uid}>{options.find(([k]) => k === value)?.[1]}</output>
    </div>
  );
}
function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (b: boolean) => void;
}) {
  const uid = useId();
  return (
    <label className="bio017-check" htmlFor={uid}>
      <input
        id={uid}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
function Result({ children }: { children: ReactNode }) {
  return (
    <div className="bio017-result" data-model-result aria-live="polite">
      {children}
    </div>
  );
}
function Prediction({
  id,
  context,
  options,
  expected,
  explanation,
}: {
  id: string;
  context: string;
  options: [string, string][];
  expected: string;
  explanation: string;
}) {
  const uid = useId();
  const [s, set] = useExploration("forge017-bio-prediction-" + id, {
    answer: "",
    reason: "",
    context: "",
    checked: false,
  });
  const selected = options.find(([k]) => k === s.answer);
  return (
    <div className="bio017-prediction">
      <label htmlFor={uid + "-answer"}>Sonuç tahminin</label>
      <select
        id={uid + "-answer"}
        value={selected ? s.answer : ""}
        onChange={(e) => set({ answer: e.target.value, checked: false })}
      >
        <option value="">Bir sonuç seç</option>
        {options.map(([k, t]) => (
          <option key={k} value={k}>
            {t}
          </option>
        ))}
      </select>
      <output data-selected-prediction htmlFor={uid + "-answer"}>
        {selected
          ? "Seçili tahmin: " + selected[1]
          : "Henüz bir tahmin seçilmedi."}
      </output>
      <label htmlFor={uid + "-reason"}>Gerekçen</label>
      <textarea
        id={uid + "-reason"}
        rows={3}
        maxLength={120}
        value={s.reason.slice(0, 120)}
        onChange={(e) =>
          set({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        className="secondary"
        disabled={!selected || !s.reason.trim()}
        onClick={() => set({ checked: true, context: context.slice(0, 120) })}
      >
        Tahminimi karşılaştır
      </button>
      {s.checked && s.context === context && selected && (
        <div className="bio017-feedback" role="status">
          <strong>
            {s.answer === expected
              ? "Seçimin bu modeldeki kanıtla uyumlu."
              : "Seçimini kanıtla yeniden karşılaştır."}
          </strong>
          <p>{explanation}</p>
          <p>
            Gerekçene puan verilmez. Bu keşif soru puanı, XP ya da konu bitiş
            kaydı eklemez.
          </p>
        </div>
      )}
    </div>
  );
}

function MuscleLab() {
  const id = "kas-doku";
  const [s, set] = useExploration("forge017-bio-" + id, {
    length: 2.6,
    step: "detach",
    calcium: true,
    atp: true,
    units: 3,
  });
  const length = Math.round(bound(s.length, 2, 3.2) * 10) / 10;
  const step = Object.hasOwn(muscleSteps017, s.step)
    ? (s.step as MuscleStep017)
    : "detach";
  const m = sarcomere017(length),
    phase = muscleStep017(step, s.calcium, s.atp),
    motor = motorRecruitment017(Math.round(bound(s.units, 0, 5)), 2);
  // All x positions share a fixed scale: changing L never changes filament lengths.
  const scale = 84,
    left = 180 - (m.length * scale) / 2,
    right = 180 + (m.length * scale) / 2,
    thickLeft = 180 - (m.thick * scale) / 2,
    thickRight = 180 + (m.thick * scale) / 2;
  const leftTip = left + m.thin * scale,
    rightTip = right - m.thin * scale;
  return (
    <>
      <h3>Filamentler sabit, örtüşme değişir</h3>
      <p>
        Sarkomer boyunu değiştir. Z çizgileri yaklaşırken ince ve kalın
        filamentin kendi boyunu izle. A, kalın filamentin tüm boyudur; H onun
        içindeki yalnız kalın filament alanıdır. Bu geometrik model kuvvet ya da
        canlı lifin bütün boylarını hesaplamaz.
      </p>
      <Range
        label="Sarkomer boyu; µm"
        value={length}
        min={2}
        max={3.2}
        step={0.1}
        onChange={(length) => set({ length })}
      />
      <Drawing
        title={`Sarkomer ${n(length)} µm; A ${n(m.a)}, iki yarım I toplamı ${n(m.iTotal)}, H ${n(m.h)} µm`}
        height={330}
      >
        <path className="bio017-guide" d={`M${left},50V236M${right},50V236`} />
        <text x={left} y={34} textAnchor="middle">
          Z
        </text>
        <text x={right} y={34} textAnchor="middle">
          Z
        </text>
        <rect
          data-thick-filament
          className="bio017-thick"
          x={thickLeft}
          y={119}
          width={m.thick * scale}
          height={28}
          rx={6}
        />
        {[91, 174].map((y) => (
          <g key={y}>
            <path
              data-thin-filament="left"
              className="bio017-thin"
              d={`M${left},${y}H${leftTip}`}
            />
            <path
              data-thin-filament="right"
              className="bio017-thin"
              d={`M${rightTip},${y}H${right}`}
            />
          </g>
        ))}
        <path
          data-band="A"
          data-value={m.a}
          className="bio017-bracket"
          d={`M${thickLeft},214V202H${thickRight}V214`}
        />
        <text x={180} y={242} textAnchor="middle">
          A = {n(m.a)}
        </text>
        <path
          data-band="H"
          data-value={m.h}
          className="bio017-bracket"
          d={`M${leftTip},62V72H${rightTip}V62`}
        />
        <text x={180} y={58} textAnchor="middle">
          H = {n(m.h)}
        </text>
        <path className="bio017-bracket" d={`M${left},268V257H${right}V268`} />
        <text x={180} y={299} textAnchor="middle">
          L = {n(m.length)} µm
        </text>
        <g data-band="I" data-value={m.iTotal}>
          <path
            className="bio017-i"
            d={`M${left},187H${thickLeft}M${thickRight},187H${right}`}
          />
        </g>
      </Drawing>
      <Result>
        <strong>
          A {n(m.a)} µm; I toplamı {n(m.iTotal)} µm; H {n(m.h)} µm
        </strong>
        <p>
          İnce filamentlerin her biri {n(m.thin)} µm, kalın filament{" "}
          {n(m.thick)} µm. Her uçtaki yarım I {n(m.iHalf)} µm; bir taraftaki
          örtüşme {n(m.overlap)} µm. H sıfır olunca negatif bir bölge çizilmez.
        </p>
        <p>
          Çift yeşil çizgiler ince aktinleri, orta kalın şerit miyozin boyunu
          gösterir. Turuncu uç alanları tek sarkomer içindeki iki yarım I’dır.
          Şema sabit filament sayısını temsil etmez.
        </p>
      </Result>
      <h4>Tek başın evresini ve enerji koşulunu ayır</h4>
      <div className="bio017-controls">
        <Choice
          label="İzlenen adım"
          value={step}
          options={Object.entries(muscleSteps017)}
          onChange={(step) => set({ step })}
        />
        <Check
          label="Köprü için Ca var"
          checked={s.calcium}
          onChange={(calcium) => set({ calcium })}
        />
        <Check
          label="Yeni serbest ATP var"
          checked={s.atp}
          onChange={(atp) => set({ atp })}
        />
      </div>
      <p>
        Her kartın başlangıç koşulu ayrı verilir. Kuvvet vuruşu kartında baş
        önceden ATP hidroliziyle hazırlanmıştır: yeni ATP’nin yokluğu bu tek
        hazır vuruşu silmez. Ayrılma için yeni ATP bağlanması; Ca’yı SR’ye geri
        taşıma için ATP kullanan pompa ayrı sınanır. Ca düğmesi sinir ucunun
        salım kalsiyumu değildir.
      </p>
      <Drawing
        title={`${muscleSteps017[step]}: ${phase.enabled ? "verilen basamak açık" : "verilen basamak engelli"}`}
        height={270}
      >
        <g data-muscle-step={step} data-step-enabled={phase.enabled}>
          {step === "signal" ? (
            <>
              <rect
                className="bio017-cell"
                x={36}
                y={20}
                width={288}
                height={65}
                rx={12}
              />
              <text x={180} y={62} textAnchor="middle">
                Motor sinir ucu
              </text>
              <rect
                className="bio017-organ"
                x={36}
                y={184}
                width={288}
                height={65}
                rx={12}
              />
              <text x={180} y={226} textAnchor="middle">
                Kas uç plağı
              </text>
              <Arrow x1={133} y1={94} x2={133} y2={173} kind="ach-release" />
              {[112, 134, 156].map((y) => (
                <circle key={y} className="bio017-node" cx={168} cy={y} r={5} />
              ))}
              <text x={204} y={144}>
                ACh
              </text>
            </>
          ) : step === "calcium" || step === "pump" ? (
            <>
              <rect
                className="bio017-cell"
                x={24}
                y={22}
                width={312}
                height={65}
                rx={12}
              />
              <text x={180} y={64} textAnchor="middle">
                SR: Ca deposu
              </text>
              <Arrow
                x1={90}
                y1={step === "pump" ? 183 : 97}
                x2={90}
                y2={step === "pump" ? 97 : 183}
                active={phase.enabled}
                kind="calcium-step"
              />
              {[160, 186, 210].map((y, i) => (
                <circle
                  key={y}
                  className="bio017-node"
                  cx={190 + i * 35}
                  cy={y}
                  r={7}
                />
              ))}
              <text x={184} y={247} textAnchor="middle">
                Sarkoplazma
              </text>
            </>
          ) : (
            <>
              <text x={180} y={38} textAnchor="middle">
                Aktin; ince filament
              </text>
              <path className="bio017-thin" d="M30,81H330" />
              <path
                className="bio017-thick-line"
                d={`M72,185H300M189,185L${step === "detach" && phase.enabled ? 171 : step === "stroke" && phase.enabled ? 229 : 211},${step === "detach" && phase.enabled ? 137 : phase.enabled ? 87 : 126}`}
              />
              <text x={180} y={226} textAnchor="middle">
                Miyozin başı
              </text>
              <circle
                className={s.calcium ? "bio017-node" : "bio017-cell"}
                cx={57}
                cy={118}
                r={8}
              />
              <text x={30} y={159}>
                Ca
              </text>
              <text x={330} y={126} textAnchor="end">
                {phase.enabled ? "Açık" : "Engelli"}
              </text>
            </>
          )}
        </g>
      </Drawing>
      <Result>
        <strong>
          {muscleSteps017[step]}:{" "}
          {phase.enabled ? "verilen basamak açık" : "verilen basamak engelli"}
        </strong>
        <p>{phase.evidence}</p>
      </Result>
      <details>
        <summary>Motor birimle bütün kasın kuvvetini karşılaştır</summary>
        <p>
          Ayrı deneyde her etkin birim 2 N katkı veriyor. Katkılar doğrusal
          toplanıyor ve diğer koşullar sabit. Bu, tek lifin aksiyon
          potansiyelini büyütme modeli değildir; gerçek kasın tüm kuvvet-uzunluk
          ilişkisini de vermez.
        </p>
        <Range
          label="Etkin motor birim sayısı"
          value={motor.units}
          min={0}
          max={5}
          onChange={(units) => set({ units })}
        />
        <Drawing
          title={`${motor.units} etkin motor birim, toplam ${motor.force} N`}
          height={150}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect
                className={i < motor.units ? "bio017-selected" : "bio017-cell"}
                x={18 + i * 66}
                y={28}
                width={58}
                height={50}
                rx={8}
              />
              <text x={47 + i * 66} y={62} textAnchor="middle">
                {i + 1}
              </text>
            </g>
          ))}
          <text x={180} y={125} textAnchor="middle">
            Toplam {n(motor.force)} N
          </text>
        </Drawing>
        <p>
          {motor.units}×2 = {motor.force} N. Etkin birim sayısı ile tek lifin
          elektriksel yanıtının genliği farklıdır.
        </p>
      </details>
      <Prediction
        id={id}
        context={[length, step, s.calcium, s.atp].join(":")}
        expected={phase.enabled ? "open" : "blocked"}
        options={[
          ["open", "Seçili basamak açık"],
          ["blocked", "Seçili basamak engelli"],
        ]}
        explanation={phase.evidence}
      />
    </>
  );
}

function SwallowLab() {
  const id = "sindirim-agiz-yutak-yemek-borusu";
  const [s, set] = useExploration("forge017-bio-" + id, {
    stage: 0,
    protectedAirway: true,
    speed: 4,
    time: 0,
    divisions: 1,
  });
  const stage = Math.round(bound(s.stage, 0, 3)),
    speed = bound(s.speed, 1, 5),
    time = bound(s.time, 0, 20);
  const m = swallowing017(stage, s.protectedAirway, speed, time),
    cube = cubeSurface017(Math.round(bound(s.divisions, 1, 4)));
  const bolusX = stage === 0 ? 91 : stage === 1 ? 151 : 225;
  const bolusY = stage < 2 ? 155 : stage === 2 ? 211 : 263 + m.position * 7;
  return (
    <>
      <h3>Yolu, korumayı ve taşıma dalgasını ayrı izle</h3>
      <p>
        Yandan ve sadeleştirilmiş şema: yüz önde solda, arka sağda. Üstteki
        burun-ağız yolları yutakta birleşir; altta öndeki soluk borusu ile
        arkadaki yemek borusu ayrıdır. Organların gerçek ölçüsü ve katman
        kalınlığı bu çizimden ölçülmez.
      </p>
      <div className="bio017-controls">
        <Choice
          label="Yutma evresi"
          value={String(stage)}
          options={swallowingStages017.map((x, i) => [String(i), x])}
          onChange={(stage) => set({ stage: Number(stage) })}
        />
        <Check
          label="Yutakta koruma sağlam"
          checked={s.protectedAirway}
          onChange={(protectedAirway) => set({ protectedAirway })}
        />
        {stage === 3 && (
          <>
            <Range
              label="Verilen dalga hızı; cm/s"
              value={speed}
              min={1}
              max={5}
              onChange={(speed) => set({ speed })}
            />
            <Range
              label="Taşıma süresi; s"
              value={time}
              min={0}
              max={20}
              onChange={(time) => set({ time })}
            />
          </>
        )}
      </div>
      <Drawing
        title={`${swallowingStages017[stage]}; ${m.coordinated ? "eşgüdüm koşulu sağlam" : "koruma koşulu engelli"}; özofagus yolu ${n(m.position)} cm`}
        height={480}
      >
        <path
          className="bio017-organ"
          d="M25 90Q35 65 126 72H204Q247 82 247 115V234H248V420H214V250Q196 233 193 205H168Q151 193 133 187H40V135H148V125H25Z"
        />
        <path className="bio017-airway" d="M149 228H190V419H149Z" />
        <text x={75} y={54} textAnchor="middle">
          Burun
        </text>
        <text x={69} y={220} textAnchor="middle">
          Ağız
        </text>
        <text x={299} y={152} textAnchor="middle">
          Yutak
        </text>
        <path
          data-soft-palate
          className="bio017-gate"
          d={
            stage === 2 && s.protectedAirway
              ? "M165,129L225,126"
              : "M165,129L179,157"
          }
        />
        <path
          data-larynx-gate
          data-airway-open={m.airwayOpen}
          className="bio017-gate"
          d={!m.airwayOpen ? "M144,226H195" : "M144,226L157,201"}
        />
        <path
          data-upper-gate
          data-open={m.upperOpen}
          className="bio017-gate"
          d={m.upperOpen ? "M211,251L215,270M246,251L250,270" : "M214,257H248"}
        />
        <path
          data-lower-gate
          data-open={m.lowerOpen}
          className="bio017-gate"
          d={m.lowerOpen ? "M213,418L200,435M249,418L264,435" : "M214,418H248"}
        />
        <text x={105} y={320} textAnchor="middle" className="bio017-small">
          Soluk
        </text>
        <text x={105} y={349} textAnchor="middle" className="bio017-small">
          borusu
        </text>

        <text x={307} y={320} textAnchor="middle" className="bio017-small">
          Yemek
        </text>
        <text x={307} y={349} textAnchor="middle" className="bio017-small">
          borusu
        </text>

        {stage === 3 && (
          <>
            <path
              data-constriction
              className="bio017-gate"
              d={`M215,${bolusY - 24}H221M240,${bolusY - 24}H248`}
            />
            <Arrow x1={296} y1={362} x2={296} y2={401} kind="peristalsis" />
          </>
        )}
        <circle
          data-bolus
          data-position={m.position}
          className="bio017-bolus"
          cx={stage === 3 ? 231 : bolusX}
          cy={bolusY}
          r={10}
        />
        <text x={242} y={464} textAnchor="middle">
          Mideye
        </text>
      </Drawing>
      <Result>
        <strong>{swallowingStages017[stage]}</strong>
        <p>{m.evidence}</p>
        {stage === 3 && (
          <p>
            Varsayımsal 20 cm yol: {n(speed)} cm/s × {n(time)} s; en çok 20 cm
            gösterilir. Konum {n(m.position)} cm.{" "}
            {m.arrived
              ? "Yol tamam: alt geçiş açık."
              : "Henüz mideye ulaşmadı."}
          </p>
        )}
        <p>
          Yumuşak damak nazofarinkse kaçışı sınırlar; larengeal korunma hava
          yoluna gidişi önlemeye katkı verir. Bu iki iş tek bir küçük dil kapağı
          değildir. Kalın kapı çizgileri evreye göre uygun kapanma/gevşemeyi
          gösterir; koruma kapalı seçilirse başarılı geçiş bildirilmez.
        </p>
        <p>
          İstemli ağız evresi sonrası faringeal ve özofageal düzenekler gerekir.
          Özofagusun üstü çizgili, ortası karışık, altı düz kas ağırlıklıdır.
          Şemadaki tek boru, bütün kasların aynı tipte olduğu anlamına gelmez.
        </p>
      </Result>
      <details>
        <summary>Çiğneme yüzeyi neden artırır?</summary>
        <p>
          Ayrı geometrik deney: kenarı 2 cm küpü her kenarda eşit parçalara
          ayır. Molekül bağı kesilmez; tüm parçaların toplam hacmi 8 cm³ kalır.
          Çizim parçaların düzenini gösterir, gerçek besinin yapısını temsil
          etmez.
        </p>
        <Range
          label="Her kenardaki eşit parça sayısı"
          value={cube.divisions}
          min={1}
          max={4}
          onChange={(divisions) => set({ divisions })}
        />
        <Drawing
          title={`${cube.fragments} küp parçası; toplam yüzey ${n(cube.surface)} cm², hacim 8 cm³`}
          height={200}
        >
          {Array.from({ length: cube.divisions ** 2 }, (_, i) => {
            const cell = 120 / cube.divisions,
              x = 30 + (i % cube.divisions) * (cell + 4),
              y = 28 + Math.floor(i / cube.divisions) * (cell + 4);
            return (
              <rect
                key={i}
                className="bio017-cell"
                x={x}
                y={y}
                width={cell}
                height={cell}
              />
            );
          })}
          <text x={278} y={77} textAnchor="middle">
            {cube.divisions} kat
          </text>
          <text x={278} y={111} textAnchor="middle">
            aynı sıra
          </text>
          <text x={180} y={185} textAnchor="middle">
            {cube.fragments} parça; {n(cube.surface)} cm²
          </text>
        </Drawing>
        <p>
          {cube.divisions}³ = {cube.fragments} parça; toplam yüzey{" "}
          {n(cube.surface)} cm². Hacim {cube.volume} cm³; yüzey başlangıcın{" "}
          {cube.ratio} katı. Bu, enzim etkinliğinin aynı katsayıyla artacağına
          dair bir hız yasası değildir.
        </p>
      </details>
      <Prediction
        id={id}
        context={[stage, s.protectedAirway, speed, time].join(":")}
        expected={
          stage === 2 && !m.coordinated
            ? "unsafe"
            : stage === 3
              ? m.arrived
                ? "arrived"
                : "moving"
              : "phase"
        }
        options={[
          ["phase", "Seçilen evre; taşıma hesabı henüz yok"],
          ["unsafe", "Koruma engelli; başarılı geçiş yok"],
          ["moving", "20 cm yol henüz tamam değil"],
          ["arrived", "20 cm yol tamam; alt geçiş açık"],
        ]}
        explanation={m.evidence}
      />
    </>
  );
}

function StomachLab() {
  const id = "sindirim-mide";
  const [s, set] = useExploration("forge017-bio-" + id, {
    signal: "gastrin",
    acid: true,
    precursor: true,
    mucus: true,
    chain: 12,
    cuts: 2,
    initial: 200,
    added: 20,
    out: 40,
  });
  const signal = Object.hasOwn(gastricSignals017, s.signal)
    ? (s.signal as GastricSignal017)
    : "gastrin";
  const chain = Math.round(bound(s.chain, 8, 20)),
    cuts = Math.round(bound(s.cuts, 0, chain - 1));
  const m = gastricScene017(signal, s.acid, s.precursor, s.mucus, chain, cuts);
  const initial = bound(s.initial, 0, 300),
    added = bound(s.added, 0, 100),
    out = bound(s.out, 0, initial + added),
    fluid = gastricFluid017(initial, added, out);
  // A linear chain only: supplied cut positions separate neighbouring monomers.
  const x = (i: number) => 22 + i * (316 / (chain - 1));
  return (
    <>
      <h3>Salgı nereden çıkar, hangi bölmeye gider?</h3>
      <p>
        Mide kesitinde kardia girişi solda üstte, pilor çıkışı sağda altta
        gösterilir. Hücreler sembolik ve büyütülmüştür. Baş hücreden gelen
        pepsinojen lümene; gastrin ise kana yönelir. Sinirsel haber, kanla
        taşınan haberci ve bağırsak geri denetimi aynı ok değildir.
      </p>
      <div className="bio017-controls">
        <Choice
          label="Düzenleyici yol"
          value={signal}
          options={Object.entries(gastricSignals017)}
          onChange={(signal) => set({ signal })}
        />
        <Check
          label="Uygun asidik örnek seçili"
          checked={s.acid}
          onChange={(acid) => set({ acid })}
        />
        <Check
          label="Öncül lümende var"
          checked={s.precursor}
          onChange={(precursor) => set({ precursor })}
        />
        <Check
          label="Mukus bariyeri göster"
          checked={s.mucus}
          onChange={(mucus) => set({ mucus })}
        />
      </div>
      <Drawing
        title={`Mide: ${m.route}; pepsinojen aktivasyonu ${m.activationExample ? "gösterilir" : "gösterilmez"}`}
        height={450}
      >
        <path
          className="bio017-organ"
          d="M81,48V142C21,177 23,275 77,314C125,350 206,352 251,319L282,337L307,302L278,277C300,206 275,122 224,122C192,126 180,183 156,167L121,146V48Z"
        />
        <path
          data-mucus
          data-present={m.mucus}
          className={m.mucus ? "bio017-mucus" : "bio017-mucus bio017-muted"}
          d="M90,151C36,177 36,266 84,303C129,337 204,339 246,304L279,317"
        />
        <text x={71} y={30} textAnchor="middle">
          Kardia
        </text>
        <text x={305} y={365} textAnchor="middle">
          Pilor
        </text>
        <circle className="bio017-cell" cx={83} cy={211} r={18} />
        <text x={177} y={81} textAnchor="middle" className="bio017-small">
          Baş
        </text>
        <path className="bio017-leader" d="M160,96L99,191" />
        <Arrow
          x1={102}
          y1={211}
          x2={150}
          y2={211}
          active={m.precursor}
          kind="pepsinogen-secretion"
        />
        <text x={204} y={195} textAnchor="middle" className="bio017-small">
          Pepsinojen
        </text>
        <Arrow
          x1={201}
          y1={219}
          x2={201}
          y2={256}
          active={m.activationExample}
          kind="pepsin-activation"
        />
        <text data-active-pepsin x={201} y={286} textAnchor="middle">
          {m.activationExample ? "Pepsin" : "Pepsin yok"}
        </text>
        <circle className="bio017-cell" cx={82} cy={274} r={15} />
        <text x={16} y={306} className="bio017-small">
          HCl
        </text>
        <path className="bio017-leader" d="M61,298L71,286" />
        <Arrow
          x1={100}
          y1={274}
          x2={128}
          y2={250}
          active={m.acidicExample}
          kind="acid-condition"
        />
        <path className="bio017-blood" d="M28,396H329" />
        <text x={50} y={430}>
          Kan
        </text>
        <text x={269} y={430} textAnchor="middle">
          Lümen ayrı
        </text>
        <circle className="bio017-cell" cx={247} cy={317} r={10} />
        <text x={27} y={362}>
          Gastrin
        </text>
        <g data-signal-route={signal}>
          <Arrow
            x1={247}
            y1={334}
            x2={247}
            y2={384}
            active={signal === "gastrin"}
            kind="gastrin-release"
          />
          <Arrow
            x1={159}
            y1={385}
            x2={159}
            y2={348}
            active={signal === "gastrin"}
            kind="gastrin-blood"
          />
          <Arrow
            x1={317}
            y1={142}
            x2={270}
            y2={164}
            active={signal === "vagus"}
            kind="vagus"
          />
          <Arrow
            x1={318}
            y1={278}
            x2={286}
            y2={264}
            active={signal === "duodenum"}
            kind="duodenal-feedback"
          />
        </g>
        <text x={324} y={110} textAnchor="end" className="bio017-small">
          Sinir
        </text>
      </Drawing>
      <Result>
        <strong>
          {m.route}; öncül aktivasyonu{" "}
          {m.activationExample ? "gösterilir" : "gösterilmez"}
        </strong>
        <p>{m.evidence}</p>
        <p>{m.activationEvidence}</p>
        <p>
          {m.mucus
            ? "Mukus-bikarbonat bariyeri gösteriliyor; yüzey/ boyun mukus hücreleri ile ilişkilidir."
            : "Bariyer bu çizimde kapalı: bununla kişide kesin ülser tanısı veya tedavi sonucu kurulmaz."}{" "}
          Alt sağdaki küçük daire kana gastrin veren hücreyi, alttaki şerit kanı
          gösterir. Normal mide mukozasını bağırsaktaki goblet hücreleriyle aynı
          etiketleme. HCl bir enzim değildir.
        </p>
      </Result>
      <h4>Ayrı deney: doğrusal zincirde verilen kesimler</h4>
      <p>
        Buradaki kesim sayısı soruda ayrıca verilir. Önceki asit/öncül
        düğmelerinden kesim hızı veya süre sonucu üretilmez. Dallanmamış tek
        zincirin komşu birimleri arasındaki her kesimde bir bağ hidroliz edilir,
        bir su kullanılır; parça sayısı bir artar. Tüm parçalar otomatik serbest
        aminoasit değildir.
      </p>
      <div className="bio017-controls">
        <Range
          label="Zincirdeki aminoasit sayısı"
          value={chain}
          min={8}
          max={20}
          onChange={(chain) => set({ chain, cuts: Math.min(cuts, chain - 1) })}
        />
        <Range
          label="Ayrıca verilen bağ kesimi sayısı"
          value={cuts}
          min={0}
          max={chain - 1}
          onChange={(cuts) => set({ cuts })}
        />
      </div>
      <Drawing
        title={`${chain} aminoasit, ${cuts} verilmiş bağ kesimi, ${m.fragments} parça ve ${m.bondsAfter} kalan bağ`}
        height={205}
      >
        {Array.from({ length: chain - 1 }, (_, i) => (
          <line
            key={i}
            data-peptide-bond
            data-cut={i < cuts}
            className={i < cuts ? "bio017-cut" : "bio017-bond"}
            x1={x(i) + 4}
            x2={x(i + 1) - 4}
            y1={93}
            y2={93}
          />
        ))}
        {Array.from({ length: chain }, (_, i) => (
          <circle
            key={i}
            data-aminoacid
            className="bio017-node"
            cx={x(i)}
            cy={93}
            r={5}
          />
        ))}
        <text x={180} y={36} textAnchor="middle">
          Komşu bağlar
        </text>
        <text x={180} y={153} textAnchor="middle">
          {m.fragments} parça; {m.bondsAfter} bağ kalır
        </text>
        <text x={180} y={188} textAnchor="middle">
          {m.water} su kullanılır
        </text>
      </Drawing>
      <Result>
        <strong data-chain-result>
          {chain} birim; {cuts} kesim → {m.fragments} parça, {m.bondsAfter} bağ
        </strong>
        <p>
          Başlangıç {chain}−1 = {m.bondsBefore} bağ. Kalan {m.bondsBefore}−
          {cuts} = {m.bondsAfter}; parça {cuts}+1 = {m.fragments}; hidrolizde{" "}
          {m.water} su. Turuncu kesik çizgiler ayrıca verilen kesimleri, düz
          çizgiler kalan bağları gösterir. Noktalar aminoasit birimleridir.
        </p>
      </Result>
      <details>
        <summary>Yalnız sıvı bilançosunu hesapla</summary>
        <p>
          Hacim için yalnız verilen giriş ve çıkış açıktır. Sindirilmiş protein
          miktarı, asit üretim hızı ya da gerçek bir öğünün boşalma süresi bu
          hesap değildir.
        </p>
        <div className="bio017-controls">
          <Range
            label="İlk hacim; mL"
            value={initial}
            min={0}
            max={300}
            step={10}
            onChange={(initial) =>
              set({ initial, out: Math.min(out, initial + added) })
            }
          />
          <Range
            label="Verilen salgı girişi; mL"
            value={added}
            min={0}
            max={100}
            step={10}
            onChange={(added) =>
              set({ added, out: Math.min(out, initial + added) })
            }
          />
          <Range
            label="Verilen çıkış; mL"
            value={out}
            min={0}
            max={initial + added}
            step={10}
            onChange={(out) => set({ out })}
          />
        </div>
        <p>
          {n(initial)}+{n(added)}−{n(out)} = {n(fluid.final)} mL. Çıkış mevcut
          toplamı aşmaz.
        </p>
      </details>
      <Prediction
        id={id}
        context={[signal, s.acid, s.precursor, chain, cuts].join(":")}
        expected={m.activationExample ? "activation" : "noActivation"}
        options={[
          ["activation", "Öncül aktif pepsine dönüşür"],
          ["noActivation", "Bu koşulda öncülden aktif pepsin oluşmaz"],
        ]}
        explanation={
          m.activationEvidence + " Zincir kesimleri ise ayrı verilmiş deneydir."
        }
      />
    </>
  );
}

export default function Forge017BiologyLab({ lessonId }: { lessonId: string }) {
  const labs: Record<string, () => ReactNode> = {
    "kas-doku": MuscleLab,
    "sindirim-agiz-yutak-yemek-borusu": SwallowLab,
    "sindirim-mide": StomachLab,
  };
  const Lab = labs[lessonId];
  return Lab ? (
    <section className="bio017" data-forge017={lessonId}>
      <Lab />
    </section>
  ) : null;
}
