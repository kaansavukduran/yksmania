import { useId } from "react";
import { useExploration } from "./useExploration";
import { clampInt } from "./mathModels";
import {
  factorCoefficients,
  factorValues,
  linearFactor,
  polynomialText,
} from "./factorizationModel";

export default function FactorizationExplorer() {
  const id = useId();
  const [saved, set] = useExploration("factorization", {
    mode: 0,
    step: 0,
    x: 3,
    p: 2,
    q: 3,
    k: 2,
    b: 2,
    a: 6,
    d: 2,
  });
  const mode = clampInt(saved.mode, 0, 2),
    step = clampInt(saved.step, 0, 2),
    x = clampInt(saved.x, 1, 6),
    p = clampInt(saved.p, -4, 4),
    q = clampInt(saved.q, -4, 4),
    k = clampInt(saved.k, 1, 4),
    b = clampInt(saved.b, 1, 5),
    a = clampInt(saved.a, 4, 9),
    d = clampInt(saved.d, 1, 3);
  const update = (changes: Parameters<typeof set>[0]) =>
    set({ ...changes, step: 0 });
  const c = factorCoefficients(p, q),
    values = factorValues(x, p, q);
  const colored = [
    "var(--plot-blue)",
    "var(--accent)",
    "var(--mint)",
    "var(--muted)",
  ];
  const control = (
    label: string,
    value: number,
    min: number,
    max: number,
    name: "x" | "p" | "q" | "k" | "b" | "a" | "d",
  ) => (
    <label className="field">
      {label}: {value}
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => update({ [name]: Number(e.target.value) })}
      />
    </label>
  );
  const current =
    mode === 0
      ? `${k}x²+${k * b}x=${k}x(x+${b})`
      : mode === 1
        ? `${polynomialText(c.b, c.c)}=${linearFactor(p)}·${linearFactor(q)}`
        : `a²−b²=(a−b)(a+b)`;
  const steps =
    mode === 0
      ? [
          "İki alanın ortak yüksekliğini fark et.",
          `Her iki parçada yükseklik ${k}x; genişlikler x ve ${b}. Parçaları aynı yükseklikte birleştir.`,
          `Yeni genişlik x+${b}, yükseklik ${k}x. Alan ${k}x(x+${b}); açınca başlangıçtaki iki alan geri gelir.`,
        ]
      : mode === 1
        ? [
            "Dört çarpımı ayrı ayrı gör.",
            `Orta terimler ${p}x ve ${q}x; birleşince ${c.b}x olur. Sabit çarpım ${p}·${q}=${c.c}.`,
            `Dağıtma bütün x’ler için x²+(${p}+${q})x+(${p}·${q}) verir. Sayısal deneme de iki yazımın aynı değerini gösterir.`,
          ]
        : [
            "Büyük kareden sağ üstteki küçük kareyi çıkar.",
            "Kalan L biçimindeki iki parçanın birini döndür; parça boyutları ve toplam alan korunur.",
            "Bir kenar a−b, öteki a+b oldu. Bu nedenle kalan alan hem a²−b² hem (a−b)(a+b) ile hesaplanır.",
          ];
  return (
    <section
      className="visual-lab factorization-lab"
      aria-labelledby={`${id}-title`}
    >
      <h2 id={`${id}-title`}>Çarpan atölyesi</h2>
      <p>
        Bir yapıyı seç, değerleri değiştir ve parçaları adım adım birleştir. Her
        adımda aynı ifadenin neden korunduğunu açıkla.
      </p>
      <div className="lab-choice-buttons" aria-label="Çarpanlara ayırma modeli">
        {["Ortak çarpan", "İki parantezin çarpımı", "İki kare farkı"].map(
          (name, index) => (
            <button
              className="secondary"
              key={name}
              aria-pressed={mode === index}
              onClick={() => update({ mode: index })}
            >
              {name}
            </button>
          ),
        )}
      </div>
      <div className="lab-controls">
        {mode === 0 ? (
          <>
            {control("Ortak katsayı k", k, 1, 4, "k")}
            {control("Ek genişlik b", b, 1, 5, "b")}
            {control("Pozitif deneme değeri x", x, 1, 6, "x")}
          </>
        ) : mode === 1 ? (
          <>
            {control("İlk parantezin sabiti p", p, -4, 4, "p")}
            {control("İkinci parantezin sabiti q", q, -4, 4, "q")}
            {control("Pozitif deneme değeri x", x, 1, 6, "x")}
          </>
        ) : (
          <>
            {control("Büyük karenin kenarı a", a, 4, 9, "a")}
            {control("Çıkan karenin kenarı b", d, 1, 3, "d")}
          </>
        )}
      </div>
      <p className="math-expression" aria-live="polite">
        {current}
      </p>
      {mode === 0 &&
        (() => {
          const u = Math.min(24, 210 / (k * x));
          const left = 65,
            top = 45,
            height = k * x * u,
            width = x * u,
            other = b * u;
          return (
            <svg
              viewBox="0 0 500 325"
              role="img"
              aria-label={`Ortak yükseklik ${k * x}; alanlar ${k * x * x} ve ${k * b * x}; toplam ${k * x * (x + b)}`}
            >
              <rect
                x={left}
                y={top}
                width={width}
                height={height}
                fill={colored[0]}
                stroke="var(--surface)"
                strokeWidth="2"
              />
              <g
                className="geometry-piece"
                style={{
                  transform: `translate(${left + width + (step ? 0 : 24)}px, ${top}px)`,
                }}
              >
                <rect
                  width={other}
                  height={height}
                  fill={colored[1]}
                  stroke="var(--surface)"
                  strokeWidth="2"
                />
              </g>
              <text x={left} y={top - 15} fontSize="16" fill="var(--text)">
                x={x}
              </text>
              <text
                x={left + width + 8}
                y={top - 15}
                fontSize="16"
                fill="var(--text)"
              >
                b={b}
              </text>
              <text
                x={left}
                y={top + height + 28}
                fontSize="16"
                fill="var(--text)"
              >
                Yükseklik kx={k * x}; alan {k * x * x}+{k * b * x}=
                {k * x * (x + b)}
              </text>
            </svg>
          );
        })()}
      {mode === 1 &&
        (p >= 0 && q >= 0 ? (
          (() => {
            const u = Math.min(25, 210 / (x + Math.max(p, q))),
              left = 65,
              top = 45,
              gap = step ? 0 : 20;
            const pieces = [
              { w: x, h: x, dx: 0, dy: 0, label: "x²" },
              { w: p, h: x, dx: x * u + gap, dy: 0, label: "px" },
              { w: x, h: q, dx: 0, dy: x * u + gap, label: "qx" },
              { w: p, h: q, dx: x * u + gap, dy: x * u + gap, label: "pq" },
            ];
            return (
              <svg
                viewBox="0 0 500 325"
                role="img"
                aria-label={`x=${x}, p=${p}, q=${q}; dört alan ${x * x},${p * x},${q * x},${p * q}; toplam ${values.product}`}
              >
                {pieces.map((r, i) => (
                  <g
                    key={r.label}
                    className="geometry-piece"
                    style={{
                      transform: `translate(${left + r.dx}px, ${top + r.dy}px)`,
                    }}
                  >
                    <rect
                      width={r.w * u}
                      height={r.h * u}
                      fill={colored[i]}
                      stroke="var(--surface)"
                      strokeWidth="2"
                    />
                    {r.w > 0 && r.h > 0 && (
                      <text
                        x={(r.w * u) / 2}
                        y={(r.h * u) / 2 + 5}
                        textAnchor="middle"
                        fontSize="15"
                        fill="var(--accent-text)"
                      >
                        {r.label}
                      </text>
                    )}
                  </g>
                ))}
                <text x={left} y={top - 17} fontSize="16" fill="var(--text)">
                  Genişlik x+p={x + p}; yükseklik x+q={x + q}
                </text>
              </svg>
            );
          })()
        ) : (
          <div className="model-results" aria-label="İşaretli cebir tablosu">
            <p>
              Negatif sabit seçildi. Negatif sayılar uzunluk olarak çizilmiyor;
              dağıtmayı işaretli terimlerle incele.
            </p>
            <ul>
              <li>x·x=x²</li>
              <li>
                x·{q}={q}x
              </li>
              <li>
                {p}·x={p}x
              </li>
              <li>
                {p}·{q}={c.c}
              </li>
            </ul>
          </div>
        ))}
      {mode === 2 &&
        (() => {
          const u = 220 / (a + d),
            left = 65,
            top = 45;
          return (
            <svg
              viewBox="0 0 500 325"
              role="img"
              aria-label={`${a} kenarlı kareden ${d} kenarlı kare çıkarılır; ${a * a - d * d} alanı korunarak ${a - d} çarpı ${a + d} dikdörtgeni oluşur`}
            >
              {!step && (
                <rect
                  x={left + (a - d) * u}
                  y={top}
                  width={d * u}
                  height={d * u}
                  fill="var(--surface-2)"
                  stroke="var(--muted)"
                  strokeDasharray="4 4"
                />
              )}
              <rect
                x={left}
                y={top}
                width={(a - d) * u}
                height={a * u}
                fill={colored[0]}
                stroke="var(--surface)"
                strokeWidth="2"
              />
              <g
                className="geometry-piece"
                style={{
                  transform: step
                    ? `translate(${left}px, ${top + (a + d) * u}px) rotate(-90deg)`
                    : `translate(${left + (a - d) * u}px, ${top + d * u}px)`,
                }}
              >
                <rect
                  width={d * u}
                  height={(a - d) * u}
                  fill={colored[1]}
                  stroke="var(--surface)"
                  strokeWidth="2"
                />
              </g>
              <text x={left} y={top - 17} fontSize="16" fill="var(--text)">
                {step ? `a−b=${a - d}; a+b=${a + d}` : `a=${a}; çıkan b=${d}`}
              </text>
              <text x={left} y="305" fontSize="16" fill="var(--text)">
                Alan: {a * a}−{d * d}={a * a - d * d}={a - d}·{a + d}
              </text>
            </svg>
          );
        })()}
      <div className="model-results" role="status">
        <strong>
          {step + 1}. adım · {steps[step]}
        </strong>
        <p>
          {mode === 0
            ? `x=${x} için ${k * x * x}+${k * b * x}=${k * x * (x + b)}.`
            : mode === 1
              ? `p+q=${c.b}, pq=${c.c}. x=${x} için açılmış biçim ${values.expanded}, çarpım biçimi ${values.product}.`
              : `${a * a}−${d * d}=${(a - d) * (a + d)}; parçalar yalnız taşınır ve döndürülür.`}
        </p>
      </div>
      <div className="lab-choice-buttons">
        <button
          className="secondary"
          disabled={step === 0}
          onClick={() => set({ step: step - 1 })}
        >
          Önceki adım
        </button>
        <button
          className="primary"
          disabled={step === 2}
          onClick={() => set({ step: step + 1 })}
        >
          {step === 0 ? "Parçaları birleştir" : "Açılımı doğrula"}
        </button>
        <button className="text-button" onClick={() => set({ step: 0 })}>
          Baştan incele
        </button>
      </div>
      <p className="lab-caption">
        Alan çizimleri pozitif uzunluklar içindir; özdeşlikler gerçek sayılarda
        geçerlidir. Modelde tek x değeriyle deneme, genel kanıt değildir:
        dağıtma bütün terimleri geri üretir. Keşif konu tamamlanması veya XP
        oluşturmaz; seçimlerin cihazda saklanır.
      </p>
    </section>
  );
}
