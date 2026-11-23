import { useId } from "react";
import {
  changeCases,
  changeEvidence,
  covalentName,
  hydrogenBond,
  hydrogenPartners,
  interactionFor,
  interactionPoles,
  interactionParticles,
  namingExamples,
  waterHeating,
} from "./forge011Chemistry";
import { useExploration } from "./useExploration";
import "./forge011Chemistry.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 }).format(n);
const safe = (n: number, min: number, max: number) =>
  Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : min;

function Prediction({
  id,
  value,
  reason,
  checked,
  expected,
  options,
  explanation,
  change,
}: {
  id: string;
  value: string;
  reason: string;
  checked: boolean;
  expected: string;
  options: string[];
  explanation: string;
  change: (changes: {
    guess?: string;
    reason?: string;
    checked?: boolean;
  }) => void;
}) {
  return (
    <div className="c011-prediction">
      <label htmlFor={`${id}-guess`}>Sonuç tahminin</label>
      <ChoiceSelect
        id={`${id}-guess`}
        value={options.includes(value) ? value : ""}
        onChange={(e) => change({ guess: e.target.value, checked: false })}
      >
        <option value="">Bir sonuç seç</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </ChoiceSelect>
      <label htmlFor={`${id}-reason`}>Gerekçen</label>
      <textarea
        id={`${id}-reason`}
        rows={3}
        maxLength={120}
        value={reason.slice(0, 120)}
        onChange={(e) =>
          change({ reason: e.target.value.slice(0, 120), checked: false })
        }
        placeholder="Hangi yapıyı, koşulu veya veriyi kullandığını yaz…"
      />
      <button
        className="secondary"
        disabled={!options.includes(value) || !reason.trim()}
        onClick={() => change({ checked: true })}
      >
        Tahminimi karşılaştır
      </button>
      {checked && options.includes(value) && (
        <div className="c011-feedback" role="status">
          <strong>
            {value === expected
              ? "Sonuç seçimin modelle uyumlu."
              : "Seçimini modelin kanıtıyla yeniden karşılaştır."}
          </strong>
          <p>{explanation}</p>
          <p>Gerekçen: {reason}</p>
          <p className="small muted">
            Bu karşılaştırma yazdığın gerekçeyi otomatik puanlamaz; bağımsız
            soru başarısı oluşturmaz.
          </p>
        </div>
      )}
    </div>
  );
}
function Reminder() {
  return (
    <p className="small muted">
      Şemalar ölçekli değildir. Keşif seçimlerin bu cihazda korunur; bu alan
      puan veya konu tamamlama kaydı oluşturmaz.
    </p>
  );
}

function NamingLab() {
  const uid = useId();
  const [state, set] = useExploration(
    "forge011:chemistry:kovalent-adlandirma-metalik-bag",
    {
      sample: "co2",
      metal: false,
      shift: 0,
      electrons: 0,
      guess: "",
      reason: "",
      checked: false,
    },
  );
  const sample =
    namingExamples.find((m) => m.id === state.sample) ?? namingExamples[1];
  const result = covalentName(sample.first, sample.second, sample.n, sample.m);
  const shift = safe(state.shift, 0, 24),
    electrons = safe(state.electrons, 0, 3);
  const expected = state.metal
    ? "Elektronlar taşıyıcı; merkezler örgüde"
    : result.name;
  const choices = state.metal
    ? [
        "Elektronlar taşıyıcı; merkezler örgüde",
        "Bütün merkezler tel boyunca akar",
        "Bütün elektronlar yok olur",
      ]
    : Array.from(
        new Set(
          namingExamples.map(
            (m) => covalentName(m.first, m.second, m.n, m.m).name,
          ),
        ),
      );
  return (
    <>
      <h3>Adı kur, örgünün davranışını karşılaştır</h3>
      <p>
        Bir molekül seçip iki atom grubunu say. Ardından aynı ünitenin metalik
        modelinde katmanı kaydır ve elektron hareketini ayrı izle.
      </p>
      <div className="c011-controls">
        <label htmlFor={`${uid}-sample`}>
          Molekül örneği
          <ChoiceSelect
            id={`${uid}-sample`}
            value={sample.id}
            onChange={(e) =>
              set({
                sample: e.target.value,
                metal: false,
                guess: "",
                checked: false,
              })
            }
          >
            {namingExamples.map((m) => {
              const r = covalentName(m.first, m.second, m.n, m.m);
              return (
                <option key={m.id} value={m.id}>
                  {r.formula}
                </option>
              );
            })}
          </ChoiceSelect>
        </label>
        <button
          className="secondary"
          aria-pressed={state.metal}
          onClick={() =>
            set({ metal: !state.metal, guess: "", checked: false })
          }
        >
          {state.metal ? "Molekül sayımına dön" : "Metalik örgüyü göster"}
        </button>
      </div>
      {state.metal ? (
        <>
          <div className="c011-controls">
            <label htmlFor={`${uid}-shift`}>
              Katman kayması: {fmt(shift)}
              <input
                id={`${uid}-shift`}
                type="range"
                min="0"
                max="24"
                step="4"
                value={shift}
                onChange={(e) =>
                  set({ shift: Number(e.target.value), checked: false })
                }
              />
            </label>
            <button
              className="secondary"
              onClick={() =>
                set({ electrons: (electrons + 1) % 4, checked: false })
              }
            >
              Elektronları bir adım ilerlet
            </button>
          </div>
          <svg
            viewBox="0 0 520 250"
            role="img"
            aria-label="Metalik örgüde katman kayması ve yayılmış elektronların ayrı hareketi"
          >
            <rect
              x="22"
              y="25"
              width="476"
              height="180"
              rx="12"
              className="c011-cloud"
            />
            {Array.from({ length: 12 }, (_, i) => {
              const row = Math.floor(i / 4),
                x = 80 + (i % 4) * 110 + (row === 1 ? shift : 0),
                y = 65 + row * 55;
              return (
                <g key={i} data-metal-center>
                  <circle cx={x} cy={y} r="20" className="c011-positive" />
                  <text x={x} y={y + 6} textAnchor="middle">
                    +
                  </text>
                </g>
              );
            })}
            {Array.from({ length: 18 }, (_, i) => {
              const x = 45 + ((i * 47 + electrons * 23) % 425),
                y = 42 + ((i * 29) % 140);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  className="c011-electron"
                  data-free-electron
                />
              );
            })}
            <text x="260" y="235" textAnchor="middle">
              Merkezler +; noktalar yayılmış elektron simgeleri
            </text>
          </svg>
          <div data-model-result className="c011-result">
            <strong>Metalik örgü · 12 pozitif merkez</strong>
            <p>
              Katman kayması: {fmt(shift)}. Elektron adımı: {electrons}. Merkez
              adedi korunur; elektron işaretleri ölçülmüş gerçek elektron sayısı
              değildir.
            </p>
            <p>
              Yük taşıyıcısı hareketli elektronlardır. Kayma sırasında yayılmış
              yoğunluk yeni düzene uyum sağlayabilir; pozitif merkezlerin tel
              boyunca akması gerekmez.
            </p>
          </div>
        </>
      ) : (
        <>
          <svg
            key={sample.id}
            viewBox="0 0 520 245"
            role="img"
            aria-label={`${result.formula}: ${result.firstCount} ${sample.first} ve ${result.secondCount} ${sample.second} atomu; sayı sayımı, molekül geometrisi değildir.`}
          >
            <text x="260" y="35" textAnchor="middle">
              {result.formula}
            </text>
            <rect
              x="30"
              y="55"
              width="210"
              height="145"
              rx="10"
              className="c011-cloud"
            />
            <rect
              x="280"
              y="55"
              width="210"
              height="145"
              rx="10"
              className="c011-cloud"
            />
            {Array.from({ length: sample.n }, (_, i) => (
              <g key={`a${i}`}>
                <circle
                  cx={sample.n === 1 ? 135 : 95 + i * 80}
                  cy="120"
                  r="28"
                  className="c011-positive"
                />
                <text
                  x={sample.n === 1 ? 135 : 95 + i * 80}
                  y="126"
                  textAnchor="middle"
                >
                  {sample.first}
                </text>
              </g>
            ))}
            {Array.from({ length: sample.m }, (_, i) => (
              <g key={`b${i}`}>
                <circle
                  cx={325 + (i % 3) * 60}
                  cy={sample.m <= 3 ? 120 : 98 + Math.floor(i / 3) * 58}
                  r="23"
                  className="c011-negative"
                />
                <text
                  x={325 + (i % 3) * 60}
                  y={(sample.m <= 3 ? 120 : 98 + Math.floor(i / 3) * 58) + 6}
                  textAnchor="middle"
                >
                  {sample.second}
                </text>
              </g>
            ))}
            <text x="135" y="225" textAnchor="middle">
              {sample.n === 1 ? "İlk mono söylenmez" : `${sample.n} atom: di`}
            </text>
            <text x="385" y="225" textAnchor="middle">
              {result.secondCount} atom
            </text>
          </svg>
          <div data-model-result className="c011-result">
            <strong>
              {result.name} · {result.atoms} atom
            </strong>
            <p>
              {result.formula}: {result.firstCount} {sample.first} +{" "}
              {result.secondCount} {sample.second}. Alt indisler bu tek
              molekülün sayımıdır; formülü en küçük orana indirmiyoruz.
            </p>
            <p>
              Renkli gruplar yalnız atom sayımını gösterir; gerçek bağ açıları
              veya molekül geometrisi iddiası değildir.
            </p>
          </div>
        </>
      )}
      <Prediction
        id={uid}
        value={state.guess}
        reason={state.reason}
        checked={state.checked}
        expected={expected}
        options={choices}
        explanation={
          state.metal
            ? "Elektrik alanında yükü elektronlar taşır; katman kaymasında merkezlerin toplamı ve metal kimliği korunur. Model yalnız nitel bir kesittir."
            : `${result.formula} için ilk ve ikinci atom sayısı ${result.firstCount} ve ${result.secondCount}; adı ${result.name}. Katsayı verilirse bütün molekülün adedi değişir.`
        }
        change={set}
      />
      <Reminder />
    </>
  );
}

function WeakLab() {
  const uid = useId();
  const [state, set] = useExploration("forge011:chemistry:zayif-etkilesimler", {
    left: "water",
    right: "oxygen",
    orientation: 0,
    guess: "",
    reason: "",
    checked: false,
  });
  const left =
      interactionParticles.find((p) => p.id === state.left) ??
      interactionParticles[0],
    right =
      interactionParticles.find((p) => p.id === state.right) ??
      interactionParticles[2];
  const result = interactionFor(left.id, right.id),
    orientation = Math.round(safe(state.orientation, 0, 1));
  const controls = [
    { name: "Birinci tanecik", value: left.id, key: "left" },
    { name: "İkinci tanecik", value: right.id, key: "right" },
  ] as const;
  return (
    <>
      <h3>İki taneciği eşleştir</h3>
      <p>
        Net yüklü iyonu, kalıcı dipolü ve apolar komşuyu ayır. Şemadaki δ
        kutupları kısmi yüktür; +/− iyon işareti değildir.
      </p>
      <div className="c011-controls">
        {controls.map((c) => (
          <label key={c.key} htmlFor={`${uid}-${c.key}`}>
            {c.name}
            <ChoiceSelect
              id={`${uid}-${c.key}`}
              value={c.value}
              onChange={(e) =>
                set({ [c.key]: e.target.value, guess: "", checked: false })
              }
            >
              {interactionParticles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.formula} ·{" "}
                  {p.kind === "ion"
                    ? "iyon"
                    : p.kind === "polar"
                      ? "polar"
                      : "apolar"}
                </option>
              ))}
            </ChoiceSelect>
          </label>
        ))}
      </div>
      <button
        className="secondary"
        disabled={left.kind === "ion" || right.kind === "ion"}
        onClick={() =>
          set({ orientation: orientation === 0 ? 1 : 0, checked: false })
        }
      >
        Kutuplanma anını değiştir
      </button>
      {(left.kind === "ion" || right.kind === "ion") && (
        <p className="small muted">
          İyon seçiliyken komşunun karşıt kutbu iyona yönelir; anlık görünüm
          düğmesi bu indüklenen yönü ters çeviremez.
        </p>
      )}
      <svg
        viewBox="0 0 520 240"
        role="img"
        aria-label={`${left.formula} ile ${right.formula}. ${result.label}; kutuplar ve komşuluk nitel gösterilir.`}
      >
        {[left, right].map((p, i) => {
          const x = 145 + i * 230;
          const poles = interactionPoles(left.id, right.id, i, orientation);
          return (
            <g key={i} data-particle-kind={p.kind}>
              <ellipse
                cx={x}
                cy="115"
                rx="85"
                ry="52"
                className={p.kind === "ion" ? "c011-ion" : "c011-cloud"}
              />
              <text x={x} y="120" textAnchor="middle">
                {p.formula}
              </text>
              {p.kind !== "ion" && (
                <>
                  <text
                    x={x - 55}
                    y="85"
                    textAnchor="middle"
                    data-dipole-side="left"
                  >
                    {poles!.left}
                  </text>
                  <text
                    x={x + 55}
                    y="85"
                    textAnchor="middle"
                    data-dipole-side="right"
                  >
                    {poles!.right}
                  </text>
                </>
              )}
              <text x={x} y="190" textAnchor="middle">
                {p.kind === "ion"
                  ? "Net iyon yükü"
                  : p.kind === "polar"
                    ? "Kalıcı dipol"
                    : "Anlık / indüklenen kutup"}
              </text>
            </g>
          );
        })}
        <path
          d={
            orientation === 0
              ? "M235 105 Q260 70 285 105"
              : "M235 125 Q260 160 285 125"
          }
          className="c011-dotted"
          data-interaction-curve
        />
      </svg>
      <div data-model-result className="c011-result">
        <strong>{result.label}</strong>
        <p>
          {left.formula} · {right.formula}. {result.explanation}
        </p>
        <p>
          {result.london
            ? "Bu nötr çiftte London katkısı da bulunur."
            : "Burada seçilen net yüklü çiftin karakteristik etkileşimi adlandırılıyor."}{" "}
          {left.kind === "apolar" || right.kind === "apolar"
            ? "Apolar taneciğe yazılan δ işaretleri bu seçilmiş anın geçici kutuplanmasıdır; kalıcı dipol değildir."
            : "Çizim bütün gerçek sıvının her an tek yönde durduğunu söylemez."}
        </p>
      </div>
      <Prediction
        id={uid}
        value={state.guess}
        reason={state.reason}
        checked={state.checked}
        expected={result.label}
        options={[
          "London",
          "Dipol–dipol",
          "İyon–dipol",
          "Dipol–indüklenmiş dipol",
          "İyon–indüklenmiş dipol",
          "Hidrojen bağı",
          "İyon–iyon çekimi",
          "İyon–iyon itmesi",
        ]}
        explanation={result.explanation}
        change={set}
      />
      <Reminder />
    </>
  );
}

function HydrogenLab() {
  const uid = useId();
  const [state, set] = useExploration("forge011:chemistry:hidrojen-bagi", {
    left: "ether",
    right: "ether",
    aligned: false,
    guess: "",
    reason: "",
    checked: false,
  });
  const left =
      hydrogenPartners.find((p) => p.id === state.left) ?? hydrogenPartners[2],
    right =
      hydrogenPartners.find((p) => p.id === state.right) ?? hydrogenPartners[2];
  const result = hydrogenBond(left.id, right.id, state.aligned),
    reverse = !result.forward && result.reverse;
  const expected = result.capable
    ? "Verici–alıcı çifti var"
    : "Uygun verici–alıcı çifti yok";
  return (
    <>
      <h3>Vericiyi alıcıya yönelt</h3>
      <p>
        Önce iki komşunun açık yapısını incele. O içermesi, H’nin O’ya bağlı
        olduğunu göstermez. Uygun çift varsa seçili teması hizala.
      </p>
      <div className="c011-controls">
        {[
          { key: "left", title: "Birinci molekül", value: left.id },
          { key: "right", title: "İkinci molekül", value: right.id },
        ].map((c) => (
          <label key={c.key} htmlFor={`${uid}-${c.key}`}>
            {c.title}
            <ChoiceSelect
              id={`${uid}-${c.key}`}
              value={c.value}
              onChange={(e) =>
                set({
                  [c.key]: e.target.value,
                  aligned: false,
                  guess: "",
                  checked: false,
                })
              }
            >
              {hydrogenPartners.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.formula} · {m.structure}
                </option>
              ))}
            </ChoiceSelect>
          </label>
        ))}
      </div>
      <button
        className="secondary"
        aria-pressed={state.aligned}
        onClick={() => set({ aligned: !state.aligned, checked: false })}
      >
        {state.aligned ? "Teması ayır" : "Seçili teması hizala"}
      </button>
      <svg
        viewBox="0 0 520 265"
        role="img"
        aria-label={`${left.structure} ile ${right.structure}. ${result.formed ? "Uygun H···alıcı teması çizildi" : result.capable ? "Yapı uygun, seçili temas hizalanmadı" : "Gerekli verici veya alıcı eksik"}`}
      >
        {[left, right].map((m, i) => {
          const x = 115 + i * 290,
            donor = result.capable
              ? reverse
                ? i === 1
                : i === 0
              : m.donors > 0,
            inward = i === 0 ? 1 : -1,
            dy = state.aligned ? 0 : i === 0 ? -26 : 26;
          return (
            <g key={i} transform={`translate(0 ${dy})`} data-hbond-molecule>
              <rect
                x={i === 0 ? 20 : 310}
                y="48"
                width="190"
                height="145"
                rx="12"
                className="c011-cloud"
              />
              <text x={x} y="78" textAnchor="middle">
                {m.formula}
              </text>
              <circle cx={x} cy="130" r="24" className="c011-negative" />
              <text x={x} y="136" textAnchor="middle">
                {m.atom}
              </text>
              {donor ? (
                <>
                  <line
                    x1={x + inward * 25}
                    y1="130"
                    x2={x + inward * 63}
                    y2="130"
                    className="c011-bond"
                  />
                  <circle
                    cx={x + inward * 76}
                    cy="130"
                    r="14"
                    className="c011-hydrogen"
                  />
                  <text x={x + inward * 76} y="136" textAnchor="middle">
                    H
                  </text>
                </>
              ) : m.acceptors > 0 ? (
                <>
                  <circle
                    cx={x + inward * 31}
                    cy="125"
                    r="2.5"
                    className="c011-electron"
                  />
                  <circle
                    cx={x + inward * 31}
                    cy="135"
                    r="2.5"
                    className="c011-electron"
                  />
                </>
              ) : null}
              <text x={x} y="182" textAnchor="middle">
                {donor
                  ? "N/O/F–H vericisi"
                  : m.acceptors > 0
                    ? "Uygun elektron çifti"
                    : "Uygun alıcı yok"}
              </text>
            </g>
          );
        })}
        {result.formed && (
          <line
            x1={reverse ? 145 : 205}
            x2={reverse ? 315 : 375}
            y1="130"
            y2="130"
            className="c011-dotted"
            data-hydrogen-contact
          />
        )}
        <text x="260" y="240" textAnchor="middle">
          {result.formed
            ? "Düz: kovalent; noktalı: H···alıcı teması"
            : result.capable
              ? "Yapı uygunluğu, anlık temasla aynı şey değildir"
              : "Aynı harfler, aynı bağlanma düzeni demek değildir"}
        </text>
      </svg>
      <div data-model-result className="c011-result">
        <strong>
          {result.formed
            ? "Uygun hidrojen bağı teması"
            : result.capable
              ? "Yapı uygun; seçili temas henüz hizalanmadı."
              : "Uygun verici–alıcı çifti yok"}
        </strong>
        <p>
          {left.structure} · {right.structure}.{" "}
          {result.capable
            ? `Verici ${result.donor!.formula}, alıcı ${result.acceptor!.formula}. ${result.forward && result.reverse ? "İki rol yönü de mümkündür; çizimde tek seçili temas gösterilir." : "En az bir rol yönü uygundur."}`
            : "Her iki rol yönü de denetlendi. Alıcı çift tek başına, verici H eksikliğini kapatmaz."}
        </p>
        <p>
          Bu yaygın TYT örneklerinde yapı ve yakınlık/yönlenme ayrı kontrol
          edilir. Çizim temas enerjisi veya gerçek sıvıda kesin bağ sayısı
          hesaplamaz.
        </p>
      </div>
      <Prediction
        id={uid}
        value={state.guess}
        reason={state.reason}
        checked={state.checked}
        expected={expected}
        options={["Verici–alıcı çifti var", "Uygun verici–alıcı çifti yok"]}
        explanation={
          result.capable
            ? `${result.donor!.structure} verici bağlantısı ve ${result.acceptor!.structure} alıcı elektron çifti uygun bir yön sağlar. Oluşmuş temas için geometri de gerekir.`
            : "Gerekli N/O/F–H vericisi ile uygun alıcı aynı çiftte bir araya gelmiyor. H ve O harflerini saymak yeterli değil."
        }
        change={set}
      />
      <Reminder />
    </>
  );
}

function WaterGroup({ x, y, water }: { x: number; y: number; water: boolean }) {
  return water ? (
    <g data-molecule="H2O">
      <line x1={x - 28} y1={y + 20} x2={x} y2={y} className="c011-bond" />
      <line x1={x + 28} y1={y + 20} x2={x} y2={y} className="c011-bond" />
      <circle cx={x} cy={y} r="17" className="c011-negative" />
      <text x={x} y={y + 6} textAnchor="middle">
        O
      </text>
      {[-1, 1].map((d) => (
        <g key={d}>
          <circle
            cx={x + d * 28}
            cy={y + 20}
            r="12"
            className="c011-hydrogen"
          />
          <text x={x + d * 28} y={y + 26} textAnchor="middle">
            H
          </text>
        </g>
      ))}
    </g>
  ) : null;
}
function ChangesLab() {
  const uid = useId();
  const [state, set] = useExploration(
    "forge011:chemistry:fiziksel-kimyasal-degisimler",
    {
      sample: "evaporation",
      after: false,
      guess: "",
      reason: "",
      checked: false,
    },
  );
  const sample =
      changeCases.find((c) => c.id === state.sample) ?? changeCases[0],
    result = changeEvidence(sample.id, state.after);
  return (
    <>
      <h3>Aynı atomlar, farklı komşuluklar</h3>
      <p>
        İki su molekülüyle veya aynı atom bütçesindeki ürünlerle başla. Sonucu
        açınca tür listesini ve atom sayımını ayrı kontrol et.
      </p>
      <label htmlFor={`${uid}-process`}>
        İncelenecek süreç
        <ChoiceSelect
          id={`${uid}-process`}
          value={sample.id}
          onChange={(e) =>
            set({
              sample: e.target.value,
              after: false,
              guess: "",
              checked: false,
            })
          }
        >
          {changeCases.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </ChoiceSelect>
      </label>
      <button
        className="secondary"
        aria-pressed={state.after}
        onClick={() => set({ after: !state.after, checked: false })}
      >
        {state.after ? "Başlangıca dön" : "Sonucu göster"}
      </button>
      <svg
        viewBox="0 0 520 250"
        role="img"
        aria-label={`${state.after ? "Sonuç" : "Başlangıç"}: ${result.species}; dört H ve iki O atomu korunuyor.`}
      >
        <rect
          x="25"
          y="25"
          width="470"
          height="190"
          rx="12"
          className="c011-cloud"
        />
        {result.waterUnits === 2 ? (
          <>
            <WaterGroup
              x={result.separated ? 115 : 210}
              y={result.separated ? 80 : 115}
              water
            />
            <WaterGroup
              x={result.separated ? 405 : 310}
              y={result.separated ? 155 : 115}
              water
            />
          </>
        ) : (
          <>
            {[
              { x: 120, y: 90 },
              { x: 390, y: 90 },
            ].map((p, i) => (
              <g key={i} data-molecule="H2">
                <line
                  x1={p.x - 20}
                  x2={p.x + 20}
                  y1={p.y}
                  y2={p.y}
                  className="c011-bond"
                />
                {[-1, 1].map((d) => (
                  <g key={d}>
                    <circle
                      cx={p.x + d * 20}
                      cy={p.y}
                      r="14"
                      className="c011-hydrogen"
                    />
                    <text x={p.x + d * 20} y={p.y + 6} textAnchor="middle">
                      H
                    </text>
                  </g>
                ))}
              </g>
            ))}
            <g data-molecule="O2">
              <line x1="238" x2="282" y1="151" y2="151" className="c011-bond" />
              <line x1="238" x2="282" y1="159" y2="159" className="c011-bond" />
              {[235, 285].map((x) => (
                <g key={x}>
                  <circle cx={x} cy="155" r="18" className="c011-negative" />
                  <text x={x} y="161" textAnchor="middle">
                    O
                  </text>
                </g>
              ))}
            </g>
          </>
        )}
        <text x="260" y="240" textAnchor="middle">
          H: 4 atom · O: 2 atom · ölçekli geometri değildir
        </text>
      </svg>
      <div data-model-result className="c011-result">
        <strong>
          {state.after
            ? `${sample.kind} değişim`
            : "Başlangıç türlerini incele"}
        </strong>
        <p>
          {result.species}. Atom bütçesi: 4 H ve 2 O. Molekül birimi:{" "}
          {result.waterUnits === 2 ? 2 : 3}.
        </p>
        <p>
          {state.after
            ? sample.explanation
            : "Önce hangi türlerin bulunduğunu yaz; formülün katsayısını alt indisle çarparak atomları say."}
        </p>
      </div>
      <Prediction
        id={uid}
        value={state.guess}
        reason={state.reason}
        checked={state.checked}
        expected={sample.kind}
        options={["Fiziksel", "Kimyasal"]}
        explanation={`${sample.before} → ${sample.after}. ${sample.explanation}`}
        change={set}
      />
      <Reminder />
    </>
  );
}

function PhaseLab() {
  const uid = useId();
  const [state, set] = useExploration("forge011:chemistry:maddenin-halleri", {
    energy: 0,
    frame: 0,
    guess: "",
    reason: "",
    checked: false,
  });
  const energy = Math.round(safe(state.energy, 0, 3208)),
    frame = Math.round(safe(state.frame, 0, 3)),
    r = waterHeating(energy);
  const solidCount = Math.round(r.solid * 12),
    gasCount = Math.round(r.gas * 12);
  const changeEnergy = (value: number) =>
    set({ energy: safe(value, 0, 3208), checked: false });
  return (
    <>
      <h3>Enerjiyi ver, faz payını izle</h3>
      <p>
        1 g su, 0 °C buzdan başlar. Basınç 1 atm, ısı kaybı yok. Lₑ=334 J/g,
        cₛᵤ=4,18 J/(g·°C), Lᵦ=2256 J/g; buhar için c≈2 J/(g·°C).
      </p>
      <label htmlFor={`${uid}-energy`}>
        Aktarılan enerji (J): <output>{fmt(energy)}</output>
        <input
          id={`${uid}-energy`}
          type="range"
          min="0"
          max="3208"
          step="1"
          value={energy}
          onChange={(e) => changeEnergy(Number(e.target.value))}
        />
      </label>
      <label htmlFor={`${uid}-energy-number`}>
        Enerjiyi sayıyla ayarla (J)
        <input
          id={`${uid}-energy-number`}
          type="number"
          min="0"
          max="3208"
          step="1"
          value={energy}
          onChange={(e) => changeEnergy(Number(e.target.value))}
        />
      </label>
      <div className="c011-actions">
        <button className="secondary" onClick={() => changeEnergy(167)}>
          Yarı erime · 167 J
        </button>
        <button className="secondary" onClick={() => changeEnergy(752)}>
          Kaynama başlangıcı · 752 J
        </button>
        <button className="secondary" onClick={() => changeEnergy(1880)}>
          Kaynama yarısı · 1880 J
        </button>
        <button
          className="secondary"
          onClick={() => set({ frame: (frame + 1) % 4 })}
        >
          Bir hareket adımı
        </button>
      </div>
      <svg
        viewBox="0 0 520 255"
        role="img"
        aria-label={`${r.phase}; ${fmt(r.temperature)} Celsius; buz yüzde ${fmt(r.solid * 100)}, sıvı yüzde ${fmt(r.liquid * 100)}, gaz yüzde ${fmt(r.gas * 100)}.`}
      >
        <rect
          x="25"
          y="18"
          width="470"
          height="200"
          rx="10"
          className="c011-cloud"
        />
        {Array.from({ length: 12 }, (_, i) => {
          const kind =
            i < solidCount ? "solid" : i >= 12 - gasCount ? "gas" : "liquid";
          const x =
            kind === "solid"
              ? 80 + (i % 4) * 50
              : kind === "liquid"
                ? 70 + (i % 6) * 74
                : 60 + ((i * 79 + frame * 31) % 410);
          const y =
            kind === "solid"
              ? 140 + Math.floor(i / 4) * 23
              : kind === "liquid"
                ? 158 + Math.floor(i / 6) * 30
                : 45 + ((i * 43 + frame * 19) % 135);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="10"
              className={`c011-phase-${kind}`}
              data-phase-particle={kind}
            />
          );
        })}
        <text x="260" y="244" textAnchor="middle">
          Birimler: H₂O · tanecik adedi simgeseldir
        </text>
      </svg>
      <svg
        viewBox="0 0 520 240"
        role="img"
        aria-label={`Aktarılan enerjiye göre sıcaklık grafiği. Seçilen enerji ${energy} joule, sıcaklık ${fmt(r.temperature)} Celsius.`}
      >
        <path d="M40 20V190H475" className="c011-axis" />
        <path
          d={[0, 334, 752, 3008, 3208]
            .map(
              (q, i) =>
                `${i === 0 ? "M" : "L"}${40 + (q / 3208) * 426} ${190 - waterHeating(q).temperature * 0.8}`,
            )
            .join(" ")}
          className="c011-graph"
        />
        <line
          x1={40 + (energy / 3208) * 426}
          x2={40 + (energy / 3208) * 426}
          y1={190 - r.temperature * 0.8}
          y2="190"
          className="c011-dotted"
        />
        <circle
          cx={40 + (energy / 3208) * 426}
          cy={190 - r.temperature * 0.8}
          r="7"
          className="c011-point"
          data-phase-graph-point
        />
        <text x="20" y="195" textAnchor="middle">
          0
        </text>
        <text x="19" y="115" textAnchor="middle">
          100
        </text>
        <text x="19" y="35" textAnchor="middle">
          200
        </text>
        <text x="90" y="218" textAnchor="middle">
          334
        </text>
        <text x="150" y="218" textAnchor="middle">
          752
        </text>
        <text x="427" y="218" textAnchor="middle">
          3008
        </text>
        <text x="482" y="218" textAnchor="middle">
          J
        </text>
        <text x="70" y="25">
          °C
        </text>
      </svg>
      <div data-model-result className="c011-result">
        <strong>
          {r.phase} · {fmt(r.temperature)} °C
        </strong>
        <p>
          Aktarılan enerji: {fmt(energy)} J. Buz %{fmt(r.solid * 100)}, sıvı %
          {fmt(r.liquid * 100)}, gaz %{fmt(r.gas * 100)}; toplam %100.
        </p>
        <p>
          {r.solid > 0 && r.liquid > 0
            ? "Erime platosu: enerji sıcaklığı artırmak yerine buzun sıvıya dönüşen payını artırıyor."
            : r.liquid > 0 && r.gas > 0
              ? "Kaynama platosu: H₂O kimliği korunurken sıvı payı azalıyor, gaz payı artıyor."
              : "Tek faz aralığında sıcaklık enerjiyle değişebilir; geçiş eşiğinin tam ucunda kalan faz payını ayrıca oku."}
        </p>
        <p>
          Simgeler yaklaşık pay görselleştirmesidir; kesin paylar metinde. Gaz
          adımı yalnız nitel hareketi gösterir, gerçek süre veya hız ölçümü
          değildir.
        </p>
      </div>
      <Prediction
        id={uid}
        value={state.guess}
        reason={state.reason}
        checked={state.checked}
        expected={r.phase}
        options={["Katı", "Katı + sıvı", "Sıvı", "Sıvı + gaz", "Gaz"]}
        explanation={`${energy} J enerjide ${r.phase.toLocaleLowerCase("tr")} bulunur. Erime eşiği 334 J, kaynama başlangıcı 752 J ve tümünün buharlaşması 3008 J’dir. Sıcaklık tek başına faz miktarını belirlemez.`}
        change={set}
      />
      <Reminder />
    </>
  );
}
export default function Forge011ChemistryLab({ id }: { id: string }) {
  return (
    <section className="forge011-chemistry" data-forge011={id}>
      {id === "kovalent-adlandirma-metalik-bag" ? (
        <NamingLab />
      ) : id === "zayif-etkilesimler" ? (
        <WeakLab />
      ) : id === "hidrojen-bagi" ? (
        <HydrogenLab />
      ) : id === "fiziksel-kimyasal-degisimler" ? (
        <ChangesLab />
      ) : id === "maddenin-halleri" ? (
        <PhaseLab />
      ) : null}
    </section>
  );
}
