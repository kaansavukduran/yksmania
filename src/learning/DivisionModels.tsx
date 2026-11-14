import { useExploration } from "./useExploration";
import { clampInt } from "./mathModels";
import { ModelNumber } from "./ModelNumber";
import { commonNumbers, euclideanDivision } from "./narrativeCalculations";
export function DivisionModel() {
  const [saved, set] = useExploration("euclidean-groups", {
    total: 29,
    divisor: 6,
  });
  const total = clampInt(saved.total, 0, 120),
    divisor = clampInt(saved.divisor, 1, 12),
    model = euclideanDivision(total, divisor);
  return (
    <section className="concept-model" aria-label="Kalanlı bölme keşfi">
      <h3>Gruplara ayır, artanı bul</h3>
      <ModelNumber
        label="Bölünen nesne sayısı"
        min={0}
        max={120}
        value={total}
        onChange={(n) => set({ total: n })}
      />
      <ModelNumber
        label="Bir gruptaki nesne sayısı"
        min={1}
        max={12}
        value={divisor}
        onChange={(n) => set({ divisor: n })}
      />
      <svg
        viewBox={`0 0 520 ${Math.max(1, Math.ceil(total / 12)) * 35 + 20}`}
        role="img"
        aria-label={`${total} nesne: ${model.quotient} tam ${divisor}’lı grup ve ${model.remainder} artan`}
      >
        {Array.from({ length: total }, (_, i) => {
          const remainder = i >= model.quotient * divisor;
          return (
            <g key={i}>
              <circle
                cx={30 + (i % 12) * 41}
                cy={25 + Math.floor(i / 12) * 35}
                r="13"
                fill={remainder ? "var(--surface)" : "var(--surface-2)"}
                stroke={remainder ? "var(--accent)" : "var(--mint)"}
                strokeWidth={remainder ? 3 : 1}
              />
              <text
                x={30 + (i % 12) * 41}
                y={29 + Math.floor(i / 12) * 35}
                textAnchor="middle"
                fill="var(--text)"
                fontSize="10"
              >
                {remainder ? "•" : Math.floor(i / divisor) + 1}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="model-result">
        <strong>
          {total} = {divisor} × {model.quotient} + {model.remainder}
        </strong>
      </p>
      <p>
        {model.quotient} tam grup · {model.remainder} artan. Her numara bir tam
        grubu gösterir; artanlarda • işareti vardır. Kontrol: 0 ≤{" "}
        {model.remainder} &lt; {divisor}.
      </p>
      <p className="small muted">
        Her daire bir nesnedir; satır sonu yeni grup anlamına gelmez, grup
        numarasını izle. Sıfır bölünen kabul edilir; sıfır bölen kabul edilmez.
      </p>
    </section>
  );
}
export function CommonNumberModel() {
  const [saved, set] = useExploration("common-divisor-period", {
    a: 12,
    b: 18,
    time: 0,
  });
  const a = clampInt(saved.a, 1, 48),
    b = clampInt(saved.b, 1, 48),
    model = commonNumbers(a, b),
    time = clampInt(saved.time, 0, model.lcm),
    position = (t: number) => 40 + (480 * t) / model.lcm;
  return (
    <section className="concept-model" aria-label="Ortak parça ve tekrar">
      <h3>Parçaya böl, aynı ana ulaş</h3>
      <ModelNumber
        label="A uzunluğu / periyodu"
        min={1}
        max={48}
        value={a}
        onChange={(n) => set({ a: n, time: 0 })}
      />
      <ModelNumber
        label="B uzunluğu / periyodu"
        min={1}
        max={48}
        value={b}
        onChange={(n) => set({ b: n, time: 0 })}
      />
      <svg
        viewBox="0 0 560 140"
        role="img"
        aria-label={`${a} ve ${b} birim şeritler, ${model.gcd} birimlik en büyük ortak parçalara ayrıldı`}
      >
        {[a, b].map((v, row) => (
          <g key={row}>
            <text x="10" y={45 + row * 60} fontSize="14" fill="var(--text)">
              {row === 0 ? "A" : "B"}
            </text>
            {Array.from({ length: v / model.gcd }, (_, i) => (
              <rect
                key={i}
                x={40 + i * model.gcd * 10}
                y={20 + row * 60}
                width={model.gcd * 10}
                height="40"
                fill="var(--surface-2)"
                stroke="var(--mint)"
                strokeWidth="2"
              />
            ))}
            <text
              x={50 + v * 10}
              y={45 + row * 60}
              fontSize="13"
              fill="var(--text)"
            >
              {v}
            </text>
          </g>
        ))}
      </svg>
      <p className="model-result">
        <strong>
          EBOB({a}, {b}) = {model.gcd} · EKOK({a}, {b}) = {model.lcm}
        </strong>
      </p>
      <p>
        En büyük eş parça {model.gcd} birimdir: A’da {a / model.gcd}, B’de{" "}
        {b / model.gcd} parça. Uzunluklar aynı ölçekle çizilir. Aynı sayıları
        periyot kabul edersek ilk pozitif ortak an {model.lcm} zaman birimidir.
      </p>
      <ModelNumber
        label="Geçen zaman"
        min={0}
        max={model.lcm}
        value={time}
        onChange={(n) => set({ time: n })}
      />
      <svg
        viewBox="0 0 560 160"
        role="img"
        aria-label={`${time}. zamanda A ${time % a === 0 ? "tekrar noktasında" : "ara konumda"}, B ${time % b === 0 ? "tekrar noktasında" : "ara konumda"}`}
      >
        {[a, b].map((v, row) => (
          <g key={row}>
            <path d={`M40 ${45 + row * 55}H520`} stroke="var(--muted)" />
            {Array.from({ length: model.lcm / v + 1 }, (_, i) => (
              <circle
                key={i}
                cx={position(i * v)}
                cy={45 + row * 55}
                r="3"
                fill={row === 0 ? "var(--mint)" : "var(--accent)"}
              />
            ))}
            <text x="10" y={50 + row * 55} fill="var(--text)" fontSize="14">
              {row === 0 ? "A" : "B"}
            </text>
          </g>
        ))}
        <path
          className="model-timeline-marker"
          d={`M${position(time)} 20V125`}
          stroke="var(--text)"
          strokeWidth="2"
        />
        <text x="40" y="150" fill="var(--muted)" fontSize="12">
          0
        </text>
        <text
          x="520"
          y="150"
          textAnchor="end"
          fill="var(--muted)"
          fontSize="12"
        >
          {model.lcm}
        </text>
      </svg>
      <p aria-live="polite">
        {time === 0
          ? "Başlangıç anı; iki döngü birlikte başlar."
          : time % a === 0 && time % b === 0
            ? "İlk pozitif ortak tekrar: iki döngü yeniden birlikte."
            : `A ${time % a === 0 ? "tekrar noktasında" : "henüz tekrar noktasında değil"}; B ${time % b === 0 ? "tekrar noktasında" : "henüz tekrar noktasında değil"}.`}
      </p>
      <details>
        <summary>Öklid adımlarını gör</summary>
        <ol>
          {model.steps.map((s, i) => (
            <li key={i}>
              {s.a} = {s.b} × {s.quotient} + {s.remainder}
            </li>
          ))}
        </ol>
        <p>
          Son sıfır olmayan değer {model.gcd}. İki sayı kontrolü: {a}×{b} ={" "}
          {model.gcd}×{model.lcm}.
        </p>
      </details>
      <p className="small muted">
        Şeritler uzunluk, alttaki çizgiler zaman modelidir; aynı anda başlayan
        döngüler kabul edilir. Sayı seçimini değiştirmek bu iki fiziksel
        büyüklüğü birbirine dönüştürmez.
      </p>
    </section>
  );
}
