import { useId } from "react";
import { useExploration } from "./useExploration";
export const formulaModels = [
  {
    label: "H₂O",
    atoms: ["H", "H", "O"],
    counts: { H: 2, O: 1 } as Record<string, number>,
    unit: "molekül",
  },
  {
    label: "NH₃",
    atoms: ["N", "H", "H", "H"],
    counts: { N: 1, H: 3 },
    unit: "molekül",
  },
  {
    label: "Ca(OH)₂",
    atoms: ["Ca", "O", "H", "O", "H"],
    counts: { Ca: 1, O: 2, H: 2 },
    unit: "formül birimi",
  },
  { label: "Co", atoms: ["Co"], counts: { Co: 1 }, unit: "atom" },
  { label: "CO", atoms: ["C", "O"], counts: { C: 1, O: 1 }, unit: "molekül" },
];
const disciplines = [
  [
    "Analitik kimya",
    "Bir örnekte hangi madde, ne kadar var?",
    "Su örneğindeki metal miktarı ölçülür.",
    "Miktar",
  ],
  [
    "Biyokimya",
    "Canlıdaki kimyasal yapı ve değişim nasıl?",
    "Bir enzimin metabolik görevi araştırılır.",
    "Canlı",
  ],
  [
    "Fizikokimya",
    "Koşullar hız ve enerjiyi nasıl etkiler?",
    "Sıcaklıkla tepkime hızı karşılaştırılır.",
    "Hız",
  ],
  [
    "Polimer kimyası",
    "Büyük moleküllü yapı nasıl oluşur?",
    "Yeni bir sentetik lifin zinciri tasarlanır.",
    "Zincir",
  ],
  [
    "Organik kimya",
    "Organik bileşiğin yapısı ve tepkimesi nasıl?",
    "Bir organik bileşiğin dönüşümü incelenir.",
    "Yapı",
  ],
  [
    "Anorganik kimya",
    "Anorganik bileşiklerin özellikleri nasıl?",
    "Bir tuzun yapısı ve tepkimesi incelenir.",
    "Tuz",
  ],
  [
    "Endüstriyel kimya",
    "Üretim verimi ve kalitesi nasıl iyileşir?",
    "Üretim sürecinin maliyeti ve verimi karşılaştırılır.",
    "Verim",
  ],
];
const atomModels = ["Dalton", "Thomson", "Rutherford", "Bohr", "Modern"];
export default function ChemistryFoundations({ id }: { id: string }) {
  const uid = useId();
  const [s, set] = useExploration(`chem-${id}`, {
    choice: 0,
    step: 0,
    multiplier: 1,
  });
  const mode =
    id === "simyadan-kimyaya"
      ? "separation"
      : id === "kimya-disiplinleri"
        ? "disciplines"
        : id === "sembolik-dil"
          ? "symbols"
          : id === "kimya-guvenlik"
            ? "safety"
            : "atoms";
  const choices =
    mode === "separation"
      ? ["Damıtma", "Süzme", "Buharlaştırma"]
      : mode === "disciplines"
        ? disciplines.map((d) => d[0])
        : mode === "symbols"
          ? formulaModels.map((f) => f.label)
          : mode === "safety"
            ? ["Yanıcı", "Oksitleyici", "Tahriş edici"]
            : atomModels;
  const c = Math.max(0, Math.min(choices.length - 1, Math.round(s.choice))),
    step = Math.max(0, Math.min(3, Math.round(s.step))),
    multiplier = Math.max(1, Math.min(3, Math.round(s.multiplier)));
  const titles = {
    separation: "Hedefe uygun ayırma yolunu izle",
    disciplines: "Aynı maddeye farklı sorular",
    symbols: "Yazımdan atom sayısına",
    safety: "İşareti davranışla eşleştir",
    atoms: "Model değişince açıklama da değişir",
  };
  const select = (
    <label className="field">
      {mode === "atoms"
        ? "Atom modeli"
        : mode === "symbols"
          ? "Formül veya sembol"
          : mode === "safety"
            ? "Uyarı işareti"
            : mode === "separation"
              ? "Ayırma yöntemi"
              : "Kimya disiplini"}
      <select
        aria-label={
          mode === "atoms"
            ? "Atom modeli"
            : mode === "symbols"
              ? "Formül veya sembol"
              : mode === "safety"
                ? "Uyarı işareti"
                : mode === "separation"
                  ? "Ayırma yöntemi"
                  : "Kimya disiplini"
        }
        value={c}
        onChange={(e) => set({ choice: Number(e.target.value), step: 0 })}
      >
        {choices.map((v, i) => (
          <option value={i} key={v}>
            {v}
          </option>
        ))}
      </select>
    </label>
  );
  return (
    <section
      className={`visual-lab chemistry-lab ${mode}`}
      aria-labelledby={`${uid}-title`}
    >
      <div className="lab-heading">
        <h2 id={`${uid}-title`}>{titles[mode]}</h2>
        <p>Seçimini değiştir; çizimle açıklamayı birlikte karşılaştır.</p>
      </div>
      {select}
      {mode === "separation" && (
        <>
          <svg
            viewBox="0 0 540 250"
            role="img"
            aria-label={`${choices[c]} modeli, ${step + 1}. aşama`}
          >
            <path
              d="M65 70 L65 180 Q65 205 95 205 L175 205 Q205 205 205 180 L205 70"
              fill="var(--surface)"
              stroke="var(--muted)"
              strokeWidth="3"
            />
            <path
              d="M68 140 H202 V180 Q202 202 175 202 H95 Q68 202 68 180Z"
              fill="var(--plot-blue)"
              opacity={step === 3 && c === 2 ? 0.12 : 0.4}
            />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <circle
                key={i}
                cx={92 + i * 17}
                cy={step === 3 && c === 2 ? 195 : 174 + (i % 2) * 10}
                r="4"
                fill="var(--accent)"
              />
            ))}
            <text x="135" y="232" textAnchor="middle" className="plot-label">
              Tuzlu su
            </text>
            {c === 0 ? (
              <>
                <path
                  d="M150 70 V40 H360 V110"
                  fill="none"
                  stroke="var(--muted)"
                  strokeWidth="5"
                />
                <rect
                  x="230"
                  y="24"
                  width="95"
                  height="32"
                  rx="9"
                  fill="var(--plot-blue)"
                  opacity=".35"
                />
                <path
                  d="M330 116 V190 Q330 205 350 205 H430 Q450 205 450 190 V116"
                  fill="none"
                  stroke="var(--muted)"
                  strokeWidth="3"
                />
                {step >= 1 && (
                  <>
                    <path
                      d="M120 126 Q135 107 120 89"
                      fill="none"
                      stroke="var(--mint)"
                      strokeWidth="3"
                    />
                    <text x="210" y="87" className="plot-label">
                      Su buharı
                    </text>
                  </>
                )}
                {step >= 2 && (
                  <circle
                    cx="360"
                    cy={step === 2 ? 105 : 157}
                    r="6"
                    fill="var(--plot-blue)"
                  />
                )}
                {step === 3 && (
                  <path
                    d="M333 178 H447 V190 Q447 202 430 202 H350 Q333 202 333 190Z"
                    fill="var(--plot-blue)"
                    opacity=".5"
                  />
                )}
                <text
                  x="390"
                  y="232"
                  textAnchor="middle"
                  className="plot-label"
                >
                  Toplanan su
                </text>
              </>
            ) : c === 1 ? (
              <>
                <path
                  d="M280 75 H430 L355 150Z"
                  fill="var(--surface)"
                  stroke="var(--muted)"
                  strokeWidth="3"
                />
                <path d="M300 90 H410" stroke="var(--accent)" strokeWidth="4" />
                {step >= 1 && (
                  <>
                    <circle cx="355" cy="172" r="6" fill="var(--plot-blue)" />
                    <circle cx="355" cy="187" r="3" fill="var(--accent)" />
                  </>
                )}
                <text x="355" y="45" textAnchor="middle" className="plot-label">
                  Sıradan süzgeç
                </text>
                <text
                  x="355"
                  y="232"
                  textAnchor="middle"
                  className="plot-label"
                >
                  Tuz da geçebilir
                </text>
              </>
            ) : (
              <>
                {step >= 1 && (
                  <path
                    d="M100 120 Q115 95 100 65 M145 120 Q160 95 145 65 M185 120 Q200 95 185 65"
                    fill="none"
                    stroke="var(--plot-blue)"
                    strokeWidth="3"
                  />
                )}
                <text
                  x="365"
                  y="125"
                  textAnchor="middle"
                  className="plot-label"
                >
                  Su uzaklaşır
                </text>
                <text
                  x="365"
                  y="156"
                  textAnchor="middle"
                  className="plot-label"
                >
                  Tuz kalır
                </text>
              </>
            )}
          </svg>
          <p className="model-results" aria-live="polite">
            {c === 0
              ? [
                  "Başlangıç: uçucu olmayan tuz su içinde çözünmüş.",
                  "Su buharlaşır; tuz iyonları bu modelde kapta kalır.",
                  "Su buharı soğutulan bölümde yoğunlaşır.",
                  "Su ayrı kapta toplanır; tuz başlangıç kabında kalır.",
                ][step]
              : c === 1
                ? "Sıradan süzme, çözünmüş tuzu ayıramaz. Tuz iyonları suyla birlikte filtrata geçebilir."
                : step === 3
                  ? "Su uzaklaşınca başlangıç kabında tuz kalır; suyu ayrıca toplamış olmadık."
                  : "Buharlaştırma suyu uzaklaştırır. Hedef tuzu elde etmekse geride kalan katıya bak."}
          </p>
          <div className="lab-actions">
            <button
              className="secondary"
              disabled={step === 3}
              onClick={() => set({ step: step + 1 })}
            >
              Sonraki aşama
            </button>
            <button className="text-button" onClick={() => set({ step: 0 })}>
              Başa dön
            </button>
          </div>
          <p className="lab-caption">
            Şematik fiziksel ayırma: madde kimliği korunur. Düzenek gerçek
            ölçekte değildir; damıtma çizimi basitleştirilmiştir.
          </p>
        </>
      )}
      {mode === "disciplines" && (
        <>
          <svg
            viewBox="0 0 540 210"
            role="img"
            aria-label={`${disciplines[c][0]}: ${disciplines[c][1]}`}
          >
            <path d="M95 100 H445" stroke="var(--muted)" strokeWidth="3" />
            {["Örnek", disciplines[c][3], "Yorum"].map((label, i) => (
              <g key={i}>
                <circle
                  cx={90 + i * 180}
                  cy="100"
                  r="51"
                  fill="var(--surface)"
                  stroke={i === 1 ? "var(--accent)" : "var(--mint)"}
                  strokeWidth="3"
                />
                <text
                  x={90 + i * 180}
                  y="106"
                  textAnchor="middle"
                  className="plot-label"
                >
                  {label}
                </text>
              </g>
            ))}
          </svg>
          <div className="model-results" aria-live="polite">
            <strong>{disciplines[c][1]}</strong>
            <p>{disciplines[c][2]}</p>
          </div>
          <p className="lab-caption">
            Disiplinler birlikte çalışabilir. Soru bağlamında baskın araştırma
            amacı seçilir; kullanılan tek bir madde alanı tek başına belirlemez.
          </p>
        </>
      )}
      {mode === "symbols" && (
        <>
          <label className="lab-slider">
            Katsayı: {multiplier}
            <input
              type="range"
              aria-label="Katsayı"
              min="1"
              max="3"
              step="1"
              value={multiplier}
              onChange={(e) => set({ multiplier: Number(e.target.value) })}
            />
          </label>
          <svg
            viewBox="0 0 540 205"
            role="img"
            aria-label={`${multiplier}${formulaModels[c].label} atom sayma modeli`}
          >
            {Array.from({ length: multiplier }, (_, j) => (
              <g key={j}>
                {formulaModels[c].atoms.map((symbol, i) => {
                  const spots = [
                      [0, -27],
                      [-29, 7],
                      [29, 7],
                      [-23, 48],
                      [24, 48],
                    ],
                    [x, y] = spots[i];
                  return (
                    <g key={i}>
                      <circle
                        cx={90 + j * 180 + x}
                        cy={85 + y}
                        r="20"
                        fill={symbol === "H" ? "var(--surface)" : "var(--mint)"}
                        stroke="var(--muted)"
                        strokeWidth="2"
                      />
                      <text
                        x={90 + j * 180 + x}
                        y={91 + y}
                        textAnchor="middle"
                        className={symbol === "H" ? "plot-label" : "atom-label"}
                      >
                        {symbol}
                      </text>
                    </g>
                  );
                })}
                <text
                  x={90 + j * 180}
                  y="180"
                  textAnchor="middle"
                  className="plot-label"
                >
                  {formulaModels[c].label}
                </text>
              </g>
            ))}
          </svg>
          <div className="model-results formula-count" aria-live="polite">
            <strong>
              {multiplier}
              {formulaModels[c].label} · {multiplier} {formulaModels[c].unit}
            </strong>
            <p>
              {Object.entries(formulaModels[c].counts)
                .map(([symbol, n]) => `${symbol}: ${n! * multiplier}`)
                .join(" · ")}
            </p>
          </div>
          <p className="lab-caption">
            Daireler yalnız atom sayımı içindir; bağ açıları ve geometrisi
            gösterilmez. İyonik Ca(OH)₂ için formül birimi kullanılır. Katsayı
            bütün formülü, alt indis ilgili grubu çarpar.
          </p>
        </>
      )}
      {mode === "safety" && (
        <>
          <svg
            viewBox="0 0 540 245"
            role="img"
            aria-label={`${choices[c]} için şematik uyarı simgesi`}
          >
            <rect
              x="198"
              y="42"
              width="145"
              height="145"
              transform="rotate(45 270 114)"
              fill="white"
              stroke="#bd202c"
              strokeWidth="9"
            />
            {c === 2 ? (
              <>
                <path d="M260 55 H282 L278 133 H264Z" fill="#191919" />
                <circle cx="271" cy="160" r="11" fill="#191919" />
              </>
            ) : (
              <>
                <path
                  d={
                    c === 0
                      ? "M266 48 C292 82 324 94 309 139 C303 158 278 171 257 159 C227 145 230 115 249 95 C244 120 263 120 268 100 C273 80 260 70 266 48Z"
                      : "M267 30 C294 58 309 70 300 96 C293 115 266 119 249 104 C235 90 244 65 258 54 C254 78 272 77 273 64Z"
                  }
                  fill="#191919"
                />
                {c === 1 && (
                  <circle
                    cx="271"
                    cy="151"
                    r="27"
                    fill="none"
                    stroke="#191919"
                    strokeWidth="12"
                  />
                )}
              </>
            )}
          </svg>
          <div className="model-results" aria-live="polite">
            <strong>{choices[c]}</strong>
            <p>
              {
                [
                  "Ateş ve kıvılcımdan uzak tut; yanıcılığı düşük risk sanma.",
                  "Yanmayı destekleyebilir. Alev ve halka, yalın alevden farklı uyarıdır.",
                  "Göz, cilt veya solunum yollarında tahriş riski olabilir. Etiket ve gerekli korumayı incele.",
                ][c]
              }
            </p>
          </div>
          <p className="lab-caption">
            Simgeler şematiktir; ürün etiketi veya güvenlik bilgi formu yerine
            kullanılmaz. Aynı maddede birden çok tehlike işareti bulunabilir.
          </p>
        </>
      )}
      {mode === "atoms" && (
        <>
          <svg
            viewBox="0 0 540 275"
            role="img"
            aria-label={`${atomModels[c]} atom modeli; gerçek ölçekte değildir`}
          >
            {c === 0 ? (
              <circle
                cx="270"
                cy="125"
                r="87"
                fill="var(--mint)"
                stroke="var(--muted)"
                strokeWidth="3"
              />
            ) : c === 1 ? (
              <>
                <circle
                  cx="270"
                  cy="125"
                  r="87"
                  fill="var(--accent)"
                  opacity=".6"
                />
                {[
                  [230, 95],
                  [300, 105],
                  [260, 165],
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="12" fill="var(--plot-blue)" />
                    <text
                      x={x}
                      y={y + 5}
                      textAnchor="middle"
                      className="atom-label"
                    >
                      −
                    </text>
                  </g>
                ))}
              </>
            ) : (
              <>
                {c === 4 ? (
                  Array.from({ length: 70 }, (_, i) => {
                    const angle = i * 2.39996,
                      r = 14 + Math.sqrt(i / 70) * 83;
                    return (
                      <circle
                        key={i}
                        cx={270 + Math.cos(angle) * r}
                        cy={125 + Math.sin(angle) * r * 0.8}
                        r={4 + (i % 3)}
                        fill="var(--plot-blue)"
                        opacity={0.08 + (1 - i / 70) * 0.35}
                      />
                    );
                  })
                ) : (
                  <>
                    {[45, 85].map((r) => (
                      <circle
                        key={r}
                        cx="270"
                        cy="125"
                        r={r}
                        fill="none"
                        stroke="var(--muted)"
                        strokeWidth="1.5"
                        strokeDasharray={c === 2 ? "3 6" : undefined}
                      />
                    ))}
                    <circle
                      cx={c === 3 && step ? 355 : 315}
                      cy="125"
                      r="10"
                      fill="var(--plot-blue)"
                    />
                  </>
                )}
                <circle cx="270" cy="125" r="12" fill="var(--accent)" />
                <text
                  x="270"
                  y="131"
                  textAnchor="middle"
                  className="atom-label"
                >
                  +
                </text>
              </>
            )}
            <text x="270" y="250" textAnchor="middle" className="plot-label">
              {atomModels[c]} modeli
            </text>
          </svg>
          {c === 3 && (
            <button
              className="secondary"
              onClick={() => set({ step: step ? 0 : 1 })}
            >
              {step
                ? "Enerji yayarak temel düzeye dön"
                : "Elektrona enerji ver"}
            </button>
          )}
          <div className="model-results" aria-live="polite">
            <strong>{atomModels[c]}</strong>
            <p>
              {
                [
                  "Atom içi dolu küre olarak tasvir edilir. Bu model elektronları ve izotopları açıklayamaz.",
                  "Negatif elektronlar yayılmış pozitif yük içinde gösterilir; küçük bir çekirdek yoktur.",
                  "Pozitif yük küçük bir çekirdekte toplanır. Saçılma gözlemleri büyük boşluklu yapıyı destekler; çizimdeki kesikli çember kesin elektron yörüngesi değildir.",
                  step
                    ? "Elektron enerji alarak üst enerji düzeyine çıktı. Çizim tek elektronlu hidrojen benzeri sistemin sadeleştirilmiş örneğidir."
                    : "Elektron düşük enerji düzeyinde. Daha yüksek düzeyden dönerken enerji yayabilir. Bohr modeli çok elektronlu atomlarda yetersizdir.",
                  "Noktalar tek bir elektronun olası konumlarını şematik olarak çağrıştırır; aynı anda 70 elektron var demek değildir. Orbital kesin bir yol değildir.",
                ][c]
              }
            </p>
          </div>
          <p className="lab-caption">
            Modeller varsayımlarıyla birlikte karşılaştırılır. Çekirdek/atom
            boyut oranı ve olasılık dağılımı sayısal ölçekli değildir. Görselle
            etkileşim öğrenme puanı oluşturmaz.
          </p>
        </>
      )}
    </section>
  );
}
