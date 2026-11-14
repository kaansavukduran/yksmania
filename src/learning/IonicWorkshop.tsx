import { useId } from "react";
import { useExploration } from "./useExploration";
import "./ionicWorkshop.css";

export function balanceCharges(positive: number, negative: number) {
  if (
    ![positive, negative].every((n) => Number.isInteger(n) && n > 0 && n <= 4)
  )
    throw Error("ION_CHARGE");
  let a = positive,
    b = negative;
  while (b) [a, b] = [b, a % b];
  return { cations: negative / a, anions: positive / a };
}
const pairs = [
  {
    label: "Na⁺ ile Cl⁻",
    c: "Na",
    a: "Cl",
    cp: 1,
    an: 1,
    pc: false,
    pa: false,
    name: "Sodyum klorür",
  },
  {
    label: "Mg²⁺ ile Cl⁻",
    c: "Mg",
    a: "Cl",
    cp: 2,
    an: 1,
    pc: false,
    pa: false,
    name: "Magnezyum klorür",
  },
  {
    label: "Al³⁺ ile O²⁻",
    c: "Al",
    a: "O",
    cp: 3,
    an: 2,
    pc: false,
    pa: false,
    name: "Alüminyum oksit",
  },
  {
    label: "Ca²⁺ ile O²⁻",
    c: "Ca",
    a: "O",
    cp: 2,
    an: 2,
    pc: false,
    pa: false,
    name: "Kalsiyum oksit",
  },
  {
    label: "Mg²⁺ ile PO₄³⁻",
    c: "Mg",
    a: "PO₄",
    cp: 2,
    an: 3,
    pc: false,
    pa: true,
    name: "Magnezyum fosfat",
  },
  {
    label: "NH₄⁺ ile SO₄²⁻",
    c: "NH₄",
    a: "SO₄",
    cp: 1,
    an: 2,
    pc: true,
    pa: true,
    name: "Amonyum sülfat",
  },
] as const;
const compounds = [
  {
    formula: "Fe₂O₃",
    metal: "Fe",
    anion: "O²⁻",
    metals: 2,
    anions: 3,
    charge: 2,
    name: "Demir(III) oksit",
  },
  {
    formula: "Cu₂O",
    metal: "Cu",
    anion: "O²⁻",
    metals: 2,
    anions: 1,
    charge: 2,
    name: "Bakır(I) oksit",
  },
  {
    formula: "CuO",
    metal: "Cu",
    anion: "O²⁻",
    metals: 1,
    anions: 1,
    charge: 2,
    name: "Bakır(II) oksit",
  },
  {
    formula: "FeCl₂",
    metal: "Fe",
    anion: "Cl⁻",
    metals: 1,
    anions: 2,
    charge: 1,
    name: "Demir(II) klorür",
  },
  {
    formula: "Fe₂(SO₄)₃",
    metal: "Fe",
    anion: "SO₄²⁻",
    metals: 2,
    anions: 3,
    charge: 2,
    name: "Demir(III) sülfat",
  },
  {
    formula: "Fe₃(PO₄)₂",
    metal: "Fe",
    anion: "PO₄³⁻",
    metals: 3,
    anions: 2,
    charge: 3,
    name: "Demir(II) fosfat",
  },
] as const;
const sub = (n: number) =>
  n === 1 ? "" : String(n).replace(/\d/g, (d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)]);
function formula(index: number, c: number, a: number) {
  const p = pairs[index];
  return (
    (p.pc && c > 1 ? `(${p.c})` : p.c) +
    sub(c) +
    (p.pa && a > 1 ? `(${p.a})` : p.a) +
    sub(a)
  );
}
export default function IonicWorkshop({
  naming = false,
}: {
  naming?: boolean;
}) {
  const uid = useId();
  const [s, set] = useExploration(
    naming ? "ionic-naming-workshop" : "ionic-bond-workshop",
    { selected: 0, cations: 1, anions: 1, phase: "solid", step: 0 },
  );
  const list = naming ? compounds : pairs;
  const index = Math.max(0, Math.min(list.length - 1, Math.trunc(s.selected)));
  const pair = pairs[index],
    compound = compounds[index];
  const ratio = balanceCharges(pair.cp, pair.an);
  const c = Math.max(1, Math.min(4, Math.trunc(s.cations))),
    a = Math.max(1, Math.min(4, Math.trunc(s.anions)));
  const net = c * pair.cp - a * pair.an;
  const smallest = c === ratio.cations && a === ratio.anions;
  const step = Math.max(0, Math.min(3, Math.trunc(s.step)));
  const phase = ["solid", "molten", "solution"].includes(s.phase)
    ? s.phase
    : "solid";
  return (
    <section
      className="visual-lab ionic-workshop"
      aria-labelledby={`${uid}-title`}
    >
      <h2 id={`${uid}-title`}>
        {naming ? "Formülden ada: yükü çöz" : "İyon atölyesi: yükü dengele"}
      </h2>
      <p>
        {naming
          ? "Anyon yükünü ve adetleri kullan. Roma rakamını indisten kopyalamadan metal başına yükü bul."
          : "İyon adetlerini değiştir; toplam yükü ve formülü birlikte izle. Nötr olmak ile en küçük oran aynı kontrol değildir."}
      </p>
      <label htmlFor={`${uid}-compound`}>
        {naming ? "İncelenecek formül" : "İncelenecek iyon çifti"}
      </label>
      <select
        id={`${uid}-compound`}
        value={index}
        onChange={(e) =>
          set({
            selected: Number(e.target.value),
            step: 0,
            cations: 1,
            anions: 1,
          })
        }
      >
        {naming
          ? compounds.map((p, i) => (
              <option key={p.formula} value={i}>
                {p.formula}
              </option>
            ))
          : pairs.map((p, i) => (
              <option key={p.label} value={i}>
                {p.label}
              </option>
            ))}
      </select>
      {naming ? (
        <>
          <svg
            viewBox="0 0 500 135"
            role="img"
            aria-label={`${compound.metals} metal iyonu ve ${compound.anions} adet ${compound.anion} grubu. Şema formül oranıdır; molekül resmi değildir.`}
          >
            {Array.from({ length: compound.metals }, (_, i) => (
              <g key={`c${i}`}>
                <circle
                  cx={45 + i * 65}
                  cy="40"
                  r="23"
                  fill="var(--accent)"
                  fillOpacity=".3"
                  stroke="currentColor"
                />
                <text
                  x={45 + i * 65}
                  y="46"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="17"
                >
                  {compound.metal}
                </text>
              </g>
            ))}
            {Array.from({ length: compound.anions }, (_, i) => (
              <g key={`a${i}`}>
                <rect
                  x={15 + i * 140}
                  y="85"
                  width="125"
                  height="40"
                  rx="10"
                  fill="var(--mint)"
                  fillOpacity=".2"
                  stroke="currentColor"
                />
                <text
                  x={77 + i * 140}
                  y="111"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="18"
                >
                  {compound.anion}
                </text>
              </g>
            ))}
          </svg>
          <p>
            {compound.formula}: {compound.metals} metal iyonu ve{" "}
            {compound.anions} adet {compound.anion} grubu. Metal iyonları aynı
            yükte kabul edilir.
          </p>
          <ol className="ionic-steps">
            {step >= 1 && (
              <li>
                Anyon toplamı: {compound.anions} × (−{compound.charge}) = −
                {compound.anions * compound.charge}.
              </li>
            )}
            {step >= 2 && (
              <li>
                Nötrlük için metal toplamı +{compound.anions * compound.charge};{" "}
                {compound.metals} metal iyonuna böl: her iyon +
                {(compound.anions * compound.charge) / compound.metals}.
              </li>
            )}
            {step >= 3 && (
              <li>
                Metal iyonu başına yükü Roma rakamıyla belirt:{" "}
                <strong>{compound.name}</strong>.
              </li>
            )}
          </ol>
          <div className="ionic-actions">
            <button
              className="secondary"
              onClick={() => set({ step: Math.min(3, step + 1) })}
              disabled={step === 3}
            >
              {step === 3 ? "Çözüm tamamlandı" : "Sonraki çözüm adımı"}
            </button>
            <button className="text-button" onClick={() => set({ step: 0 })}>
              Çözümü başa al
            </button>
          </div>
          <p className="ionic-result" role="status">
            {step === 3
              ? `${compound.name}. Roma rakamı metal adedini değil her metal iyonunun yükünü gösterir.`
              : "Önce anyonların toplam negatif yükünü bul; sonra metal adedine böl."}
          </p>
        </>
      ) : (
        <>
          <div className="ionic-controls">
            <label>
              Katyon adedi: {c}
              <input
                type="range"
                min="1"
                max="4"
                value={c}
                onChange={(e) => set({ cations: Number(e.target.value) })}
              />
            </label>
            <label>
              Anyon adedi: {a}
              <input
                type="range"
                min="1"
                max="4"
                value={a}
                onChange={(e) => set({ anions: Number(e.target.value) })}
              />
            </label>
          </div>
          <p className="math-expression">
            {c}(+{pair.cp}) + {a}(−{pair.an}) = {net > 0 ? "+" : ""}
            {net}
          </p>
          <p className="ionic-result" role="status">
            {net !== 0
              ? `Toplam yük ${net > 0 ? "+" : ""}${net}; seçimin nötr değil.`
              : smallest
                ? `Nötr ve en küçük oran: ${formula(index, c, a)} — ${pair.name}.`
                : `Toplam yük sıfır; fakat ${c}:${a} en küçük oran değil. ${formula(index, ratio.cations, ratio.anions)} biçiminde sadeleştir.`}
          </p>
          <button
            className="secondary"
            onClick={() =>
              set({ cations: ratio.cations, anions: ratio.anions })
            }
          >
            En küçük nötr oranı kur
          </button>
          <p>
            Seçili örnek: {pair.label}. Doğru oran {ratio.cations}:
            {ratio.anions}; çok atomlu iyonun içindeki indisler değiştirilmez.
          </p>
          <h3>NaCl örgüsünde hâl ve hareket</h3>
          <label htmlFor={`${uid}-phase`}>NaCl örneğinin hâli</label>
          <select
            id={`${uid}-phase`}
            value={phase}
            onChange={(e) => set({ phase: e.target.value })}
          >
            <option value="solid">Katı kristal</option>
            <option value="molten">Erimiş NaCl</option>
            <option value="solution">Yeterince çözünmüş sulu NaCl</option>
          </select>
          <svg
            viewBox="0 0 500 205"
            role="img"
            aria-label={
              phase === "solid"
                ? "NaCl kristalinden temsili iki boyutlu kesit, artı ve eksi iyonlar dönüşümlü dizilir."
                : "Hareketli artı ve eksi iyonları gösteren temsili şema; yol işaretleri serbest yük hareketini anlatır."
            }
          >
            {Array.from({ length: 15 }, (_, i) => {
              const x = 50 + (i % 5) * 100,
                y = 35 + Math.floor(i / 5) * 65;
              return (
                <g key={i}>
                  {phase !== "solid" && (
                    <path
                      d={`M${x + 24},${y} h18 l-5,-5 m5,5 l-5,5`}
                      fill="none"
                      stroke="currentColor"
                    />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r="22"
                    fill={i % 2 === 0 ? "var(--accent)" : "var(--mint)"}
                    fillOpacity=".3"
                    stroke="currentColor"
                  />
                  <text
                    x={x}
                    y={y + 7}
                    fill="currentColor"
                    textAnchor="middle"
                    fontSize="24"
                  >
                    {i % 2 === 0 ? "+" : "−"}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="ionic-phase-result" role="status">
            {phase === "solid"
              ? "Katıda iyonlar örgü konumları çevresinde titreşir; serbest yük taşıyamaz. Tipik NaCl kristali elektrik iletmez."
              : phase === "molten"
                ? "Eriyikte hareketli Na⁺ ve Cl⁻ iyonları elektrik yükü taşır; erimiş NaCl iletebilir."
                : "Yeterince çözünmüş NaCl çözeltisinde hareketli Na⁺ ve Cl⁻ iyonları vardır; çözelti iletebilir. Bu sonuç bütün tuzların çok çözündüğü anlamına gelmez."}
          </p>
          <p className="lab-caption">
            Hâl seçimi yalnız NaCl modeline aittir; yukarıdaki farklı iyon çifti
            için çözünürlük sonucu vermez. Şema ölçekli değildir, iyon çaplarını
            veya gerçek hareket yollarını ölçmez.
          </p>
        </>
      )}
      <p className="lab-caption">
        Atölye seçimi ve çözüm adımları bu cihazda saklanır. Keşif, puan veya
        konu tamamlama kaydı oluşturmaz.
      </p>
    </section>
  );
}
