import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Kimya kimyasal hesaplamalar derinleştirmesi (0.222.0): yüzde verim,
 * saflık, tepkimeli karışımlar, katlı oranlar ve katı kütlesi değişimi.
 * Kabul edilmiş rehberler değişmez; her derse görüntüleme katmanında bir
 * tablo bölümü, iki özgün çözümlü örnek ve bir bölüm çizimi eklenir. Bütün
 * sayılar aşağıdaki yuvarlanmış atom kütlelerinden ve denklem katsayılarından
 * kesin kesirlerle hesaplanır; tablo hücreleri, paragraflar, Kopya Kâğıdı
 * özetleri ve çizim okumaları aynı fonksiyonları kullanır. Paragraftaki genel
 * yargılar modül yüklenirken veriyle sınanır; veri yargıyı desteklemezse
 * modül hata verir.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth222: ${claim}`);
};
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const lcm = (a: number, b: number) => Math.abs(a * b) / gcd(a, b);

/* ---------- Kesin kesirler ---------- */

export interface Q222 { n: number; d: number }
export const q222 = (n: number, d = 1): Q222 => {
  guard(d !== 0 && Number.isSafeInteger(n) && Number.isSafeInteger(d), "kesir pay ve paydası güvenli tam sayı olmalı");
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
};
const Z = q222(0);
export const qAdd222 = (x: Q222, y: Q222) => q222(x.n * y.d + y.n * x.d, x.d * y.d);
export const qSub222 = (x: Q222, y: Q222) => q222(x.n * y.d - y.n * x.d, x.d * y.d);
export const qMul222 = (x: Q222, y: Q222) => q222(x.n * y.n, x.d * y.d);
export const qDiv222 = (x: Q222, y: Q222) => {
  guard(y.n !== 0, "sıfıra bölme");
  return q222(x.n * y.d, x.d * y.n);
};
export const qEq222 = (x: Q222, y: Q222) => x.n === y.n && x.d === y.d;
export const qLt222 = (x: Q222, y: Q222) => x.n * y.d < y.n * x.d;
const qMin = (x: Q222, y: Q222) => (qLt222(y, x) ? y : x);
const qi = (k: number) => q222(k);
/** 0,4 gibi ondalık yazımı kesin kesre çevirir (yalnız sabit veriler için). */
const qd = (text: string) => {
  const [i, f = ""] = text.split(",");
  return q222(Number(i + f), 10 ** f.length);
};

/** Sonlu ondalık açılımı olan kesri Türkçe virgülle tam yazar; sonlu değilse hata verir. */
export const dec222 = (x: Q222) => {
  let k = 0;
  while (((x.n * 10 ** k) % x.d) !== 0) {
    k += 1;
    guard(k <= 8, `${x.n}/${x.d} sonlu ondalık değil`);
  }
  const scaled = Math.abs((x.n * 10 ** k) / x.d);
  const sign = x.n < 0 ? "−" : "";
  const digits = String(scaled).padStart(k + 1, "0");
  const int = digits.slice(0, digits.length - k);
  const frac = digits.slice(digits.length - k);
  return sign + (k ? `${int},${frac}` : int);
};
/** Yaklaşık yazım (yalnız sonlu olmayan kesirler için, ≈ ile). */
export const approx222 = (x: Q222, digits = 3) => (x.n / x.d).toFixed(digits).replace(".", ",");
export const frac222 = (x: Q222) => (x.d === 1 ? String(x.n) : `${x.n}/${x.d}`);
const signed = (x: Q222) => (x.n > 0 ? `+${dec222(x)}` : dec222(x));
const pct = (x: Q222) => `%${dec222(x)}`;

/* ---------- Atom kütleleri ve formüller ---------- */

/**
 * TYT çözümlerinde kullanılan yuvarlanmış atom kütleleri (g/mol). Değerler
 * IUPAC standart atom ağırlıklarının okul düzeyinde tam sayıya yuvarlanmış
 * hâlidir ve bu derslerin kendi verdiği değerlerle aynıdır (H 1, C 12, N 14,
 * O 16, Mg 24, Ca 40, Cu 64 ...). Bütün mol kütleleri formüllerden bunlarla
 * hesaplanır.
 */
export const ATOMIC_MASS222 = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Ca: 40, Fe: 56, Cu: 64, Zn: 65 } as const;
export type Element222 = keyof typeof ATOMIC_MASS222;
const SUB: Record<string, string> = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9" };
/** "CaCO₃" → { Ca: 1, C: 1, O: 3 }. Alt simgeli yazım okunur. */
export const composition222 = (formula: string): Partial<Record<Element222, number>> => {
  const plain = [...formula].map((c) => SUB[c] ?? c).join("");
  const tokens = [...plain.matchAll(/([A-Z][a-z]?)(\d*)/g)];
  guard(tokens.map(([t]) => t).join("") === plain, `formül okunamadı: ${formula}`);
  const out: Partial<Record<Element222, number>> = {};
  for (const [, el, k] of tokens) {
    guard(el in ATOMIC_MASS222, `atom kütlesi yok: ${el}`);
    out[el as Element222] = (out[el as Element222] ?? 0) + (k ? Number(k) : 1);
  }
  return out;
};
/** Mol kütlesi (g/mol), tam sayı. */
export const molar222 = (formula: string) =>
  Object.entries(composition222(formula)).reduce((s, [el, k]) => s + ATOMIC_MASS222[el as Element222] * (k ?? 0), 0);
const M = (f: string) => qi(molar222(f));

/* =====================================================================
 * 1. Yüzde verim: altı NH₃ deneyi
 * ===================================================================== */

export interface YieldRun222 { label: string; n2: Q222; h2: Q222; actual: Q222 }
/** Mol miktarları ve ölçülen saf NH₃ (g). Değerler özgün örnektir. */
export const yieldRuns222: readonly YieldRun222[] = [
  { label: "A", n2: qi(1), h2: qi(3), actual: qd("30,6") },
  { label: "B", n2: qi(2), h2: qi(3), actual: qi(17) },
  { label: "C", n2: qi(1), h2: qi(6), actual: qd("25,5") },
  { label: "D", n2: q222(1, 2), h2: qi(3), actual: qd("13,6") },
  { label: "E", n2: qi(3), h2: qi(6), actual: qd("40,8") },
  { label: "F", n2: q222(3, 2), h2: qi(6), actual: qi(51) },
];
export const M_NH3_222 = molar222("NH₃");
/** N₂ + 3 H₂ → 2 NH₃: ξ = min(n(N₂)/1, n(H₂)/3), kuramsal NH₃ = 2ξ·17 g. */
export const yieldRow222 = (r: YieldRun222) => {
  const capN = r.n2;
  const capH = qDiv222(r.h2, qi(3));
  const xi = qMin(capN, capH);
  const limiter = qEq222(capN, capH) ? "Tam oranlı" : qLt222(capN, capH) ? "N₂" : "H₂";
  const theoretical = qMul222(qMul222(qi(2), xi), qi(M_NH3_222));
  const percent = qMul222(qDiv222(r.actual, theoretical), qi(100));
  return { ...r, capN, capH, xi, limiter, theoretical, percent };
};
export const yieldRows222 = () => yieldRuns222.map(yieldRow222);
const yRows = yieldRows222();
export const yieldTable222 = {
  layout: "table" as const,
  headers: ["Deney: N₂ / H₂ (mol)", "Sınırlayıcı", "Kuramsal NH₃ (g)", "Gerçek NH₃ (g)", "Yüzde verim"],
  rows: yRows.map((r) => [`${r.label}: ${dec222(r.n2)} / ${dec222(r.h2)}`, r.limiter, dec222(r.theoretical), dec222(r.actual), pct(r.percent)]),
};
const [yA, yB, yC, , yE, yF] = yRows;
guard(yRows.every((r) => !qLt222(qi(100), r.percent) && qLt222(Z, r.percent)), "tablodaki bütün verimler 0 ile %100 arasında olmalı");
guard(M_NH3_222 === 17, "M(NH₃) 17 g/mol olmalı");
guard(yA.limiter === "Tam oranlı", "A deneyi tam oranlı olmalı");
guard(qLt222(yA.n2, yB.n2) && qEq222(yA.h2, yB.h2) && qLt222(yA.h2, yC.h2) && qEq222(yA.n2, yC.n2), "B’de N₂, C’de H₂ A’ya göre artırılmış olmalı");
guard(qEq222(yA.theoretical, yB.theoretical) && qEq222(yA.theoretical, yC.theoretical), "fazla girenin artması kuramsal ürünü değiştirmemeli");
guard(qLt222(yA.actual, yE.actual) && qLt222(yE.percent, yA.percent), "E’nin gerçek ürünü A’dan büyük, verimi küçük olmalı");
guard(qEq222(yF.percent, qi(100)), "F deneyi %100 olmalı");
guard(new Set(yRows.map(({ limiter }) => limiter)).size === 3, "tabloda üç sınırlayıcı durumu da bulunmalı");

export const yieldSection222: GuideSection = {
  title: "Altı deneyde sınırlayıcıdan yüzde verime",
  paragraphs: [
    `Tablodaki altı deneyin hepsinde N₂ + 3 H₂ → 2 NH₃ tepkimesi vardır ve M(NH₃) = ${M_NH3_222} g/mol alınır (N ${ATOMIC_MASS222.N}, H ${ATOMIC_MASS222.H}). Her satırda önce n(N₂)/1 ile n(H₂)/3 karşılaştırılır; küçük olan ξ’yi verir ve kuramsal NH₃ = 2ξ × ${M_NH3_222} g olur. Yüzde verim = gerçek/kuramsal × 100’dür. A deneyinde ${dec222(yA.n2)} mol N₂ ile ${dec222(yA.h2)} mol H₂ tam oranlıdır: kuramsal ${dec222(yA.theoretical)} g, gerçek ${dec222(yA.actual)} g, verim ${pct(yA.percent)}.`,
    `B’de N₂ ${dec222(yB.n2)} mole, C’de H₂ ${dec222(yC.h2)} mole çıkarılmıştır; yine de ikisinin kuramsal ürünü A ile aynı ${dec222(yA.theoretical)} g’dır, çünkü fazla olan girenin artması ξ’yi değiştirmez. E’de ölçülen ${dec222(yE.actual)} g NH₃, A’daki ${dec222(yA.actual)} g’dan fazladır; ama E’nin verimi ${pct(yE.percent)}, A’nınki ${pct(yA.percent)}’dır. Deneyleri ham gramla değil, kendi kuramsal miktarına bölünmüş oranla karşılaştır. F’de verim ${pct(yF.percent)} çıkar: ölçülen ürün kuramsal üst sınıra eşittir, onu aşmaz.`,
  ],
  table: yieldTable222,
};

/* Örnek 1: istenen gerçek üründen gereken H₂. */
export const yieldTarget222 = (() => {
  const want = qi(34);
  const eff = q222(80, 100);
  const theoretical = qDiv222(want, eff);
  const nNH3 = qDiv222(theoretical, qi(M_NH3_222));
  const nH2 = qMul222(nNH3, q222(3, 2));
  const mH2 = qMul222(nH2, M("H₂"));
  const naiveH2 = qMul222(qMul222(qDiv222(want, qi(M_NH3_222)), q222(3, 2)), M("H₂"));
  return { want, eff, theoretical, nNH3, nH2, mH2, naiveH2 };
})();
/* Örnek 2: kütlelerden sınırlayıcı ve verim, 2 Mg + O₂ → 2 MgO. */
export const yieldMg222 = (() => {
  const mMg = qd("7,2");
  const mO2 = qd("3,2");
  const actual = qi(6);
  const nMg = qDiv222(mMg, M("Mg"));
  const nO2 = qDiv222(mO2, M("O₂"));
  const capMg = qDiv222(nMg, qi(2));
  const xi = qMin(capMg, nO2);
  const theoretical = qMul222(qMul222(qi(2), xi), M("MgO"));
  const percent = qMul222(qDiv222(actual, theoretical), qi(100));
  const wrongTheory = qMul222(nMg, M("MgO"));
  const wrongPercent = qMul222(qDiv222(actual, wrongTheory), qi(100));
  return { mMg, mO2, actual, nMg, nO2, capMg, xi, theoretical, percent, wrongTheory, wrongPercent };
})();
const yt = yieldTarget222;
const ym = yieldMg222;
guard(qLt222(ym.nO2, ym.capMg), "Mg örneğinde O₂ sınırlayıcı olmalı");

export const yieldExamples222: WorkedExample[] = [
  {
    title: "İstenen gerçek ürün için gereken H₂",
    prompt: `N₂ + 3 H₂ → 2 NH₃ tepkimesinde N₂ fazlasıyla bulunuyor ve ayrılan saf NH₃’ün yüzde verimi ${pct(qMul222(yt.eff, qi(100)))}’dir. ${dec222(yt.want)} g NH₃ elde etmek için en az kaç gram H₂ alınmalıdır? (H ${ATOMIC_MASS222.H}, N ${ATOMIC_MASS222.N} g/mol)`,
    strategy: "İstenen miktar gerçek üründür. Önce verim kesrine bölüp kuramsal ürünü bul, sonra denklemle H₂’ye dön.",
    steps: [
      { label: "Kuramsal ürün", expression: `${dec222(yt.want)} = kuramsal × ${dec222(yt.eff)} ⇒ kuramsal = ${dec222(yt.theoretical)} g`, explanation: "Gerçek ürün kuramsal ürünün verim kesri kadarıdır; ters yönde bölünür." },
      { label: "Mole çevir", expression: `n(NH₃) = ${dec222(yt.theoretical)}/${M_NH3_222} = ${dec222(yt.nNH3)} mol`, explanation: "Denklem katsayıları mol üzerinden okunur." },
      { label: "Katsayı oranı", expression: `n(H₂) = ${dec222(yt.nNH3)} × 3/2 = ${dec222(yt.nH2)} mol`, explanation: "2 mol NH₃ için 3 mol H₂ gerekir." },
      { label: "Kütle", expression: `m(H₂) = ${dec222(yt.nH2)} × ${molar222("H₂")} = ${dec222(yt.mH2)} g`, explanation: "M(H₂) = 2 g/mol." },
    ],
    answer: `${dec222(yt.mH2)} g H₂`,
    check: `${dec222(yt.mH2)} g H₂ = ${dec222(yt.nH2)} mol, kuramsal ${dec222(yt.nNH3)} mol = ${dec222(yt.theoretical)} g NH₃ verir; × ${dec222(yt.eff)} = ${dec222(yt.want)} g.`,
    pitfall: `${dec222(yt.want)} g’ı kuramsal ürün sanıp ${dec222(yt.naiveH2)} g H₂ bulmak. O kadar H₂ ile ${pct(qMul222(yt.eff, qi(100)))} verimde yalnız ${dec222(qMul222(yt.want, yt.eff))} g NH₃ elde edilir.`,
  },
  {
    title: "Kütlelerden sınırlayıcı ve verim",
    prompt: `2 Mg + O₂ → 2 MgO. Kapalı kapta ${dec222(ym.mMg)} g Mg ile ${dec222(ym.mO2)} g O₂ tepkimeye sokuluyor; ayrılan saf MgO ${dec222(ym.actual)} g tartılıyor. Mg ${ATOMIC_MASS222.Mg}, O ${ATOMIC_MASS222.O} g/mol. Tepkimenin yüzde verimi kaçtır?`,
    strategy: "Kuramsal ürünü sınırlayıcı belirler. Her girenin molünü katsayısına böl, küçük olanla MgO’yu hesapla.",
    steps: [
      { label: "Moller", expression: `n(Mg) = ${dec222(ym.mMg)}/${ATOMIC_MASS222.Mg} = ${dec222(ym.nMg)} mol; n(O₂) = ${dec222(ym.mO2)}/${molar222("O₂")} = ${dec222(ym.nO2)} mol`, explanation: "O₂ molekülünün mol kütlesi 32 g/mol’dür." },
      { label: "Sınırlayıcı", expression: `${dec222(ym.nMg)}/2 = ${dec222(ym.capMg)} > ${dec222(ym.nO2)}/1 ⇒ ξ = ${dec222(ym.xi)} mol`, explanation: "O₂ daha önce biter; Mg artar." },
      { label: "Kuramsal MgO", expression: `2 × ${dec222(ym.xi)} × ${molar222("MgO")} = ${dec222(ym.theoretical)} g`, explanation: "1 mol O₂ 2 mol MgO verir." },
      { label: "Verim", expression: `${dec222(ym.actual)}/${dec222(ym.theoretical)} × 100 = ${pct(ym.percent)}`, explanation: "Pay ölçülen, payda kuramsal üründür." },
    ],
    answer: `${pct(ym.percent)} (O₂ sınırlayıcı, kuramsal ${dec222(ym.theoretical)} g MgO)`,
    check: `Kuramsal ${dec222(ym.theoretical)} g MgO = ${dec222(ym.xi)} mol O₂ (${dec222(ym.mO2)} g) + ${dec222(qMul222(qMul222(qi(2), ym.xi), M("Mg")))} g Mg; kütle korunur. Ölçülen ${dec222(ym.actual)} g bu üst sınırın altındadır.`,
    pitfall: `Çok olan Mg’ye göre ${dec222(ym.wrongTheory)} g kuramsal MgO yazıp ${pct(ym.wrongPercent)} bulmak. Ayrıca verimden artan Mg miktarı kesin çıkarılamaz; ürünün bir kısmı ayırmada kaybolmuş olabilir.`,
  },
];

export const yieldSupplement222 = {
  title: yieldSection222.title,
  figureTitle: yieldSection222.title,
  paragraphs: yieldSection222.paragraphs,
  summary: `N₂ + 3 H₂ → 2 NH₃: kuramsal NH₃ = 2·min(n(N₂), n(H₂)/3)·${M_NH3_222} g. A, B, C’nin kuramsal ürünü ${dec222(yA.theoretical)} g; verimler ${yRows.map((r) => `${r.label} ${pct(r.percent)}`).join(", ")}. Ham gram değil gerçek/kuramsal oranı karşılaştırılır.`,
  appendSection: true as const,
  table: yieldTable222,
  examples: yieldExamples222,
};

/* =====================================================================
 * 2. Saflık: gazdan saf reaktife ve saflığa
 * ===================================================================== */

export interface PurityCase222 {
  equation: string;
  reactant: string;
  gas: "CO₂" | "H₂";
  /** Denklemdeki katsayılar: a reaktif → b gaz. */
  a: number;
  b: number;
  inert: string;
  sample: Q222;
  gasMass: Q222;
}
export const purityCases222: readonly PurityCase222[] = [
  { equation: "CaCO₃ → CaO + CO₂", reactant: "CaCO₃", gas: "CO₂", a: 1, b: 1, inert: "kum", sample: qi(25), gasMass: qd("8,8") },
  { equation: "MgCO₃ → MgO + CO₂", reactant: "MgCO₃", gas: "CO₂", a: 1, b: 1, inert: "kum", sample: qi(24), gasMass: qd("8,8") },
  { equation: "Mg + 2 HCl → MgCl₂ + H₂", reactant: "Mg", gas: "H₂", a: 1, b: 1, inert: "bakır", sample: qi(8), gasMass: qd("0,4") },
  { equation: "Fe + 2 HCl → FeCl₂ + H₂", reactant: "Fe", gas: "H₂", a: 1, b: 1, inert: "bakır", sample: qi(16), gasMass: qd("0,4") },
  { equation: "Zn + 2 HCl → ZnCl₂ + H₂", reactant: "Zn", gas: "H₂", a: 1, b: 1, inert: "bakır", sample: qi(20), gasMass: qd("0,4") },
  { equation: "2 Al + 6 HCl → 2 AlCl₃ + 3 H₂", reactant: "Al", gas: "H₂", a: 2, b: 3, inert: "bakır", sample: qi(6), gasMass: qd("0,6") },
];
export const purityRow222 = (c: PurityCase222) => {
  const nGas = qDiv222(c.gasMass, M(c.gas));
  const nReactant = qMul222(nGas, q222(c.a, c.b));
  const pure = qMul222(nReactant, M(c.reactant));
  const inertMass = qSub222(c.sample, pure);
  const percent = qMul222(qDiv222(pure, c.sample), qi(100));
  return { ...c, nGas, nReactant, pure, inertMass, percent };
};
export const purityRows222 = () => purityCases222.map(purityRow222);
const pRows = purityRows222();
export const purityTable222 = {
  layout: "table" as const,
  headers: ["Tepkime (diğer bileşen inert)", "Numune (g)", "Toplanan gaz", "Saf reaktif", "Saflık"],
  rows: pRows.map((r) => [r.equation, dec222(r.sample), `${dec222(r.gasMass)} g ${r.gas} = ${dec222(r.nGas)} mol`, `${dec222(r.nReactant)} mol ${r.reactant} = ${dec222(r.pure)} g`, pct(r.percent)]),
};
const [pCa, pMgC, pMg, pFe, pZn, pAl] = pRows;
guard(pRows.every((r) => qLt222(Z, r.inertMass) && qLt222(r.percent, qi(100))), "her numunede pozitif inert kütle ve %100’den küçük saflık olmalı");
const sameH2 = [pMg, pFe, pZn];
guard(sameH2.every((r) => qEq222(r.gasMass, pMg.gasMass) && r.a === r.b && qEq222(r.nReactant, pMg.nReactant)), "Mg, Fe, Zn satırları aynı H₂ ve aynı metal molünü vermeli");
guard(qLt222(pMg.pure, pFe.pure) && qLt222(pFe.pure, pZn.pure) && molar222("Mg") < molar222("Fe") && molar222("Fe") < molar222("Zn"), "aynı gazda saf kütle mol kütlesiyle artmalı");
guard(qEq222(pCa.nReactant, pMgC.nReactant) && qEq222(pCa.gasMass, pMgC.gasMass) && qLt222(pMgC.pure, pCa.pure), "iki karbonat aynı CO₂ ile aynı mol, farklı kütle vermeli");
/** Al satırında gaz molünü doğrudan metal molü saymanın sonucu. */
export const alWrong222 = (() => {
  const pure = qMul222(pAl.nGas, M("Al"));
  return { pure, percent: qMul222(qDiv222(pure, pAl.sample), qi(100)) };
})();
guard(qLt222(pAl.sample, alWrong222.pure), "Al’de 1:1 varsayımı numuneden büyük saf kütle vermeli");
guard(pRows.every((r) => r.inert === (r.gas === "CO₂" ? "kum" : "bakır")), "karbonatlarda kum, metallerde bakır inert olmalı");

export const puritySection222: GuideSection = {
  title: "Gazdan saflığa: altı numuneyi aynı sırayla çöz",
  paragraphs: [
    `Her satırda hedef bileşen dışındaki kısım verilen koşulda inerttir (karbonatlarda ${pCa.inert}, metallerde HCl ile tepkimeyen ${pMg.inert}) ve gazın tek kaynağı hedef bileşendir. Tepkime tamdır ve gazın tamamı toplanır. Sıra hep aynıdır: gaz kütlesi → gaz molü → katsayı oranıyla reaktif molü → saf kütle → saf/numune × 100. İlk satırda ${dec222(pCa.gasMass)} g CO₂ = ${dec222(pCa.nGas)} mol, ${dec222(pCa.nReactant)} mol CaCO₃ = ${dec222(pCa.pure)} g ve ${dec222(pCa.pure)}/${dec222(pCa.sample)} = ${pct(pCa.percent)} bulunur. MgCO₃ satırındaki aynı ${dec222(pMgC.gasMass)} g CO₂ yine ${dec222(pMgC.nReactant)} mol karbonat demektir ama M(MgCO₃) = ${molar222("MgCO₃")} g/mol olduğundan saf kütle ${dec222(pMgC.pure)} g’dır.`,
    `Mg, Fe ve Zn satırlarında toplanan H₂ aynıdır: ${dec222(pMg.gasMass)} g = ${dec222(pMg.nGas)} mol. Mol oranı 1:1 olduğundan üçünde de ${dec222(pMg.nReactant)} mol metal vardır, ama saf kütleler ${dec222(pMg.pure)} g, ${dec222(pFe.pure)} g ve ${dec222(pZn.pure)} g çıkar: aynı gaz, mol kütlesi büyük metalde daha büyük saf kütleye karşılık gelir. Al satırında katsayılar ${pAl.a}:${pAl.b}’tür; ${dec222(pAl.nGas)} mol H₂ için ${dec222(pAl.nReactant)} mol Al = ${dec222(pAl.pure)} g gerekir. Gaz molünü doğrudan Al molü saymak ${dec222(alWrong222.pure)} g, yani numuneden büyük ve olanaksız ${pct(alWrong222.percent)} saflık verirdi.`,
  ],
  table: purityTable222,
};

/* Örnek 1: hedef gaz için gereken numune. */
export const purityNeed222 = (() => {
  const purity = q222(80, 100);
  const nH2 = q222(4, 10);
  const nZn = nH2;
  const mZn = qMul222(nZn, M("Zn"));
  const sample = qDiv222(mZn, purity);
  const cu = qSub222(sample, mZn);
  const wrong = qMul222(mZn, purity);
  return { purity, nH2, nZn, mZn, sample, cu, wrong };
})();
/* Örnek 2: ısıtmadaki katı kaybından saflık. */
export const purityLoss222 = (() => {
  const sample = qi(50);
  const finalSolid = qd("36,8");
  const co2 = qSub222(sample, finalSolid);
  const n = qDiv222(co2, M("CO₂"));
  const caco3 = qMul222(n, M("CaCO₃"));
  const percent = qMul222(qDiv222(caco3, sample), qi(100));
  const cao = qMul222(n, M("CaO"));
  const inert = qSub222(sample, caco3);
  return { sample, finalSolid, co2, n, caco3, percent, cao, inert };
})();
const pn = purityNeed222;
const pl = purityLoss222;
guard(qEq222(qAdd222(pl.cao, pl.inert), pl.finalSolid), "ısıtma örneğinde kalıntı CaO + inert olmalı");

export const purityExamples222: WorkedExample[] = [
  {
    title: "Hedef gaz için gereken numune",
    prompt: `Kütlece ${pct(qMul222(pn.purity, qi(100)))} Zn içeren bir numunenin geri kalanı bakırdır; bakır bu koşulda HCl ile tepkime vermez. Zn + 2 HCl → ZnCl₂ + H₂ tepkimesiyle ${dec222(pn.nH2)} mol H₂ elde etmek için yeterli HCl ile en az kaç gram numune kullanılmalıdır? Zn tamamen tepkimeye girer. (Zn ${ATOMIC_MASS222.Zn} g/mol)`,
    strategy: "Gazdan saf Zn’ye dön, sonra saf kütleyi saflık kesrine bölerek numuneye geç.",
    steps: [
      { label: "Saf Zn molü", expression: `n(Zn) = n(H₂) = ${dec222(pn.nZn)} mol`, explanation: "Denklemde Zn ile H₂ 1:1’dir." },
      { label: "Saf Zn kütlesi", expression: `${dec222(pn.nZn)} × ${ATOMIC_MASS222.Zn} = ${dec222(pn.mZn)} g`, explanation: "Gazı yalnız Zn verir; bakır gaz kaynağı değildir." },
      { label: "Numune", expression: `${dec222(pn.mZn)} = m × ${dec222(pn.purity)} ⇒ m = ${dec222(pn.sample)} g`, explanation: "Saf kütle, numunenin saflık kesri kadarıdır." },
    ],
    answer: `${dec222(pn.sample)} g numune (${dec222(pn.mZn)} g Zn, ${dec222(pn.cu)} g Cu)`,
    check: `${dec222(pn.sample)} × ${dec222(pn.purity)} = ${dec222(pn.mZn)} g Zn = ${dec222(pn.nZn)} mol ⇒ ${dec222(pn.nH2)} mol H₂.`,
    pitfall: `${dec222(pn.mZn)} g’ı ${dec222(pn.purity)} ile çarpıp ${dec222(pn.wrong)} g bulmak. Bu numunede yalnız ${dec222(qMul222(pn.wrong, pn.purity))} g Zn olur ve gaz yetmez.`,
  },
  {
    title: "Isıtmadaki katı kaybından saflık",
    prompt: `${dec222(pl.sample)} g kireç taşı numunesi CaCO₃ ile ısıtmada değişmeyen, uçmayan inert bir dolgudan oluşuyor. Numune CaCO₃ → CaO + CO₂ tepkimesi tamamlanana kadar ısıtılınca kalan katı ${dec222(pl.finalSolid)} g tartılıyor. Numune kütlece yüzde kaç CaCO₃’tür? (Ca ${ATOMIC_MASS222.Ca}, C ${ATOMIC_MASS222.C}, O ${ATOMIC_MASS222.O} g/mol)`,
    strategy: "Katıdan ayrılan tek madde CO₂’dir. Kütle kaybını CO₂ olarak oku ve CaCO₃’e dön.",
    steps: [
      { label: "Kayıp", expression: `${dec222(pl.sample)} − ${dec222(pl.finalSolid)} = ${dec222(pl.co2)} g CO₂`, explanation: "Dolgu uçmadığı için kaybın tamamı çıkan gazdır." },
      { label: "Mol", expression: `${dec222(pl.co2)}/${molar222("CO₂")} = ${dec222(pl.n)} mol CO₂ = ${dec222(pl.n)} mol CaCO₃`, explanation: "Katsayılar 1:1’dir." },
      { label: "Saf kütle", expression: `${dec222(pl.n)} × ${molar222("CaCO₃")} = ${dec222(pl.caco3)} g`, explanation: "M(CaCO₃) = 100 g/mol." },
      { label: "Saflık", expression: `${dec222(pl.caco3)}/${dec222(pl.sample)} × 100 = ${pct(pl.percent)}`, explanation: "Payda numunenin tamamıdır." },
    ],
    answer: `Numune kütlece ${pct(pl.percent)} CaCO₃ içerir`,
    check: `Kalan katı = ${dec222(pl.cao)} g CaO + ${dec222(pl.inert)} g inert = ${dec222(pl.finalSolid)} g.`,
    pitfall: `Kalan ${dec222(pl.finalSolid)} g katının tamamını CaO sanmak. Kalıntıda ${dec222(pl.inert)} g inert de vardır; doğrudan kullanılan ölçü kütle kaybıdır.`,
  },
];

export const puritySupplement222 = {
  title: puritySection222.title,
  figureTitle: puritySection222.title,
  paragraphs: puritySection222.paragraphs,
  summary: `Gaz kütlesi → gaz molü → katsayıyla reaktif molü → saf kütle → saf/numune × 100. Aynı ${dec222(pMg.gasMass)} g H₂: Mg ${dec222(pMg.pure)} g, Fe ${dec222(pFe.pure)} g, Zn ${dec222(pZn.pure)} g. Al’de 2:3 oranı: ${dec222(pAl.nGas)} mol H₂ ⇒ ${dec222(pAl.nReactant)} mol Al.`,
  appendSection: true as const,
  table: purityTable222,
  examples: purityExamples222,
};

/* =====================================================================
 * 3. Tepkimeli karışımlar: iki bilinmeyenli doğrusal sistem
 * ===================================================================== */

export interface MixComponent222 { name: string; formula: string; /** 1 mol bileşenin verdiği gaz molü (0: gaz vermez). */ gas: Q222 }
export interface MixCase222 {
  label: string;
  condition: string;
  gasName: "H₂" | "CO₂";
  first: MixComponent222;
  second: MixComponent222;
  mass: Q222;
  gasMol: Q222;
}
const mg: MixComponent222 = { name: "Mg", formula: "Mg", gas: qi(1) };
const zn: MixComponent222 = { name: "Zn", formula: "Zn", gas: qi(1) };
const al: MixComponent222 = { name: "Al", formula: "Al", gas: q222(3, 2) };
const cu: MixComponent222 = { name: "Cu", formula: "Cu", gas: Z };
export const mixCases222: readonly MixCase222[] = [
  { label: "Mg/Cu", condition: "HCl; yalnız Mg H₂ verir", gasName: "H₂", first: mg, second: cu, mass: qi(10), gasMol: qd("0,3") },
  { label: "Zn/Cu", condition: "HCl; yalnız Zn H₂ verir", gasName: "H₂", first: zn, second: cu, mass: qi(20), gasMol: qd("0,2") },
  { label: "Mg/Al", condition: "HCl; ikisi de H₂ verir", gasName: "H₂", first: mg, second: al, mass: qd("7,8"), gasMol: qd("0,4") },
  { label: "Mg/Zn", condition: "HCl; ikisi de H₂ verir", gasName: "H₂", first: mg, second: zn, mass: qd("11,3"), gasMol: qd("0,3") },
  { label: "CaCO₃/MgCO₃", condition: "HCl; ikisi de CO₂ verir", gasName: "CO₂", first: { name: "CaCO₃", formula: "CaCO₃", gas: qi(1) }, second: { name: "MgCO₃", formula: "MgCO₃", gas: qi(1) }, mass: qd("18,4"), gasMol: qd("0,2") },
  { label: "CH₄/C₂H₆", condition: "tam yanma", gasName: "CO₂", first: { name: "CH₄", formula: "CH₄", gas: qi(1) }, second: { name: "C₂H₆", formula: "C₂H₆", gas: qi(2) }, mass: qd("7,6"), gasMol: qd("0,5") },
];
/** a1x + b1y = c1 (kütle), a2x + b2y = c2 (gaz) sistemini Cramer kuralıyla kesin çözer. */
export const solve2x2_222 = (a1: Q222, b1: Q222, c1: Q222, a2: Q222, b2: Q222, c2: Q222) => {
  const det = qSub222(qMul222(a1, b2), qMul222(a2, b1));
  guard(det.n !== 0, "iki denklem bağımsız olmalı");
  const x = qDiv222(qSub222(qMul222(c1, b2), qMul222(c2, b1)), det);
  const y = qDiv222(qSub222(qMul222(a1, c2), qMul222(a2, c1)), det);
  return { x, y, det };
};
export const mixRow222 = (c: MixCase222) => {
  const M1 = M(c.first.formula);
  const M2 = M(c.second.formula);
  const { x, y } = solve2x2_222(M1, M2, c.mass, c.first.gas, c.second.gas, c.gasMol);
  const m1 = qMul222(x, M1);
  const m2 = qMul222(y, M2);
  const gas1 = qMul222(x, c.first.gas);
  const gas2 = qMul222(y, c.second.gas);
  return { ...c, M1, M2, x, y, m1, m2, gas1, gas2, selective: c.second.gas.n === 0 };
};
export const mixRows222 = () => mixCases222.map(mixRow222);
const xRows = mixRows222();
const term = (k: Q222, v: string) => (qEq222(k, qi(1)) ? v : `${dec222(k)}${v}`);
const lhs = (a: Q222, b: Q222) => [a, b].map((k, i) => (k.n === 0 ? "" : term(k, i ? "y" : "x"))).filter(Boolean).join(" + ");
export const mixEquations222 = (r: ReturnType<typeof mixRow222>) =>
  `${lhs(r.M1, r.M2)} = ${dec222(r.mass)}; ${lhs(r.first.gas, r.second.gas)} = ${dec222(r.gasMol)}`;
const compCell = (name: string, n: Q222, m: Q222, gives: boolean) => (gives ? `${name}: ${dec222(n)} mol = ${dec222(m)} g` : `${name}: ${dec222(m)} g (gaz vermez)`);
export const mixTable222 = {
  layout: "table" as const,
  headers: ["Karışım ve koşul", "Ölçülen", "Bağıntılar (x, y mol)", "1. bileşen", "2. bileşen"],
  rows: xRows.map((r) => [
    `${r.label} (${r.condition})`,
    `${dec222(r.mass)} g; ${dec222(r.gasMol)} mol ${r.gasName}`,
    mixEquations222(r),
    compCell(r.first.name, r.x, r.m1, true),
    compCell(r.second.name, r.y, r.m2, !r.selective),
  ]),
};
for (const r of xRows) {
  guard(!qLt222(r.x, Z) && !qLt222(r.y, Z), `${r.label} bileşimi negatif olmamalı`);
  guard(qEq222(qAdd222(r.m1, r.m2), r.mass) && qEq222(qAdd222(r.gas1, r.gas2), r.gasMol), `${r.label} çözümü iki eşitliği sağlamalı`);
}
const xSel = xRows.filter((r) => r.selective);
const [xMgCu, , xMgAl, xMgZn, xCarb, xHc] = xRows;
guard(xSel.length === 2 && xSel.every((r) => qEq222(r.x, qDiv222(r.gasMol, r.first.gas))), "seçici satırlarda gaz yalnız ilk bileşeni belirlemeli");
guard(qEq222(al.gas, q222(3, 2)) && qEq222(mg.gas, qi(1)), "Al mol başına 3/2, Mg 1 mol H₂ vermeli");
guard(qEq222(xCarb.first.gas, xCarb.second.gas) && !qEq222(xCarb.M1, xCarb.M2), "karbonatlar aynı gaz katsayısı ve farklı mol kütlesi taşımalı");
guard(qEq222(xHc.first.gas, qi(1)) && qEq222(xHc.second.gas, qi(2)), "CH₄ 1, C₂H₆ 2 mol CO₂ vermeli");

export const mixSection222: GuideSection = {
  title: "Altı karışımda bileşimi iki eşitlikten çöz",
  paragraphs: [
    `Her satırda x birinci, y ikinci bileşenin molüdür; ilk eşitlik toplam kütleyi, ikincisi toplanan gazı anlatır. Tepkimeler tamdır ve gaz yalnız yazılı bileşenlerden gelir. Seçici satırlarda (${xSel.map((r) => r.label).join(", ")}) gaz eşitliği yalnız x içerir: ${xMgCu.label} karışımında ${dec222(xMgCu.gasMol)} mol H₂ doğrudan ${dec222(xMgCu.x)} mol = ${dec222(xMgCu.m1)} g Mg verir, Cu ise kütle farkı olan ${dec222(xMgCu.m2)} g’dır. ${xMgAl.label} satırında ikisi de H₂ verir ama katsayılar farklıdır: Mg + 2 HCl → MgCl₂ + H₂ mol başına 1, 2 Al + 6 HCl → 2 AlCl₃ + 3 H₂ mol başına ${frac222(al.gas)} mol H₂. İki eşitlik ${dec222(xMgAl.m1)} g Mg ve ${dec222(xMgAl.m2)} g Al verir.`,
    `${xMgZn.label} ve ${xCarb.label} satırlarında iki bileşen mol başına aynı gaz miktarını verir; bileşimi ayırt eden bilgi mol kütleleri farkıdır (${dec222(xCarb.M1)} ve ${dec222(xCarb.M2)} g/mol). ${xCarb.label} için ${dec222(xCarb.m1)} g CaCO₃ ve ${dec222(xCarb.m2)} g MgCO₃ bulunur. ${xHc.label} tam yanmasında C₂H₆ mol başına ${dec222(xHc.second.gas)} mol CO₂ verir; ${dec222(xHc.mass)} g karışım ve ${dec222(xHc.gasMol)} mol CO₂, ${dec222(xHc.x)} mol CH₄ ile ${dec222(xHc.y)} mol C₂H₆’ya karşılık gelir. Bütün satırlarda bulunan x ve y iki eşitliğe geri konarak denetlenmiştir.`,
  ],
  table: mixTable222,
};

/* Örnek 1: Mg/Al, ikinci ürünle doğrulama (HCl tüketimi). */
export const mixMgAl222 = (() => {
  const mass = qd("5,1");
  const gasMol = qd("0,25");
  const { x, y } = solve2x2_222(M("Mg"), M("Al"), mass, mg.gas, al.gas, gasMol);
  const hcl = qAdd222(qMul222(qi(2), x), qMul222(qi(3), y));
  return { mass, gasMol, x, y, mMg: qMul222(x, M("Mg")), mAl: qMul222(y, M("Al")), hcl, sub: qMul222(gasMol, qi(molar222("Mg"))) };
})();
/* Örnek 2: CaCO₃/MgCO₃, önce olabilirlik aralığı. */
export const mixCarb222 = (() => {
  const mass = qi(20);
  const gasMol = qd("0,22");
  const lo = qDiv222(mass, M("CaCO₃"));
  const hi = qDiv222(mass, M("MgCO₃"));
  const { x, y } = solve2x2_222(M("CaCO₃"), M("MgCO₃"), mass, qi(1), qi(1), gasMol);
  const excess = qSub222(mass, qMul222(gasMol, M("MgCO₃")));
  return { mass, gasMol, lo, hi, x, y, excess, mCa: qMul222(x, M("CaCO₃")), mMg: qMul222(y, M("MgCO₃")) };
})();
const ma = mixMgAl222;
const mc = mixCarb222;
guard(qLt222(Z, ma.x) && qLt222(Z, ma.y), "Mg/Al örneği iki pozitif bileşen vermeli");
guard(qLt222(mc.lo, mc.gasMol) && qLt222(mc.gasMol, mc.hi) && qLt222(Z, mc.x) && qLt222(Z, mc.y), "karbonat örneğinde gaz iki saf uç arasında olmalı");
const mgAlDiff = qSub222(M("Al"), qMul222(M("Mg"), al.gas));
guard(qEq222(qSub222(ma.mass, ma.sub), qMul222(mgAlDiff, ma.y)), "Mg/Al yok etme adımı tutarlı olmalı");

export const mixExamples222: WorkedExample[] = [
  {
    title: "Mg/Al karışımını H₂’den çöz, HCl ile doğrula",
    prompt: `${dec222(ma.mass)} g Mg ve Al karışımı yeterli HCl ile tamamen tepkimeye giriyor ve ${dec222(ma.gasMol)} mol H₂ oluşuyor. Mg + 2 HCl → MgCl₂ + H₂; 2 Al + 6 HCl → 2 AlCl₃ + 3 H₂. Mg ${ATOMIC_MASS222.Mg}, Al ${ATOMIC_MASS222.Al} g/mol. Karışımda kaçar gram Mg ve Al vardır ve kaç mol HCl harcanır?`,
    strategy: "x mol Mg, y mol Al de. Kütle ve gaz için iki eşitlik kur; Al’in mol başına 3/2 mol H₂ verdiğini unutma.",
    steps: [
      { label: "Eşitlikler", expression: `${ATOMIC_MASS222.Mg}x + ${ATOMIC_MASS222.Al}y = ${dec222(ma.mass)}; x + ${dec222(al.gas)}y = ${dec222(ma.gasMol)}`, explanation: "Gaz eşitliğinde Al’in katsayısı 3/2’dir." },
      { label: "x’i yok et", expression: `${dec222(ma.mass)} − ${ATOMIC_MASS222.Mg} × ${dec222(ma.gasMol)} = (${ATOMIC_MASS222.Al} − ${dec222(qMul222(M("Mg"), al.gas))})y ⇒ ${dec222(qSub222(ma.mass, ma.sub))} = ${dec222(mgAlDiff)}y`, explanation: `İkinci eşitliği ${ATOMIC_MASS222.Mg} ile çarpıp birinciden çıkar.` },
      { label: "Moller", expression: `y = ${dec222(ma.y)} mol Al, x = ${dec222(ma.x)} mol Mg`, explanation: "x, ikinci eşitlikten bulunur." },
      { label: "Kütleler ve HCl", expression: `Mg ${dec222(ma.mMg)} g, Al ${dec222(ma.mAl)} g; HCl = 2x + 3y = ${dec222(ma.hcl)} mol`, explanation: "HCl tüketimi bağımsız bir denetimdir: her mol Mg 2, her mol Al 3 mol HCl harcar." },
    ],
    answer: `${dec222(ma.mMg)} g Mg, ${dec222(ma.mAl)} g Al; ${dec222(ma.hcl)} mol HCl`,
    check: `${dec222(ma.mMg)} + ${dec222(ma.mAl)} = ${dec222(ma.mass)} g; ${dec222(ma.x)} + ${dec222(al.gas)} × ${dec222(ma.y)} = ${dec222(ma.gasMol)} mol H₂. HCl molü H₂ molünün iki katıdır (${dec222(ma.hcl)} = 2 × ${dec222(ma.gasMol)}), çünkü H₂’deki bütün H atomları HCl’den gelir.`,
    pitfall: "Al için de mol başına 1 mol H₂ yazmak. Bu, iki eşitliği yanlış kurar ve bileşimi bozar.",
  },
  {
    title: "Karbonat karışımında önce aralığı sına",
    prompt: `${dec222(mc.mass)} g CaCO₃ ve MgCO₃ karışımı yeterli HCl ile tamamen tepkimeye giriyor ve ${dec222(mc.gasMol)} mol CO₂ oluşuyor. İki karbonat da mol başına 1 mol CO₂ verir. M(CaCO₃) = ${molar222("CaCO₃")}, M(MgCO₃) = ${molar222("MgCO₃")} g/mol. Ölçüm olası mıdır, olasıysa karışımda kaçar gram karbonat vardır?`,
    strategy: "Saf uç durumlar gaz için alt ve üst sınırı verir. Ölçüm aradaysa iki eşitliği çöz.",
    steps: [
      { label: "Uçlar", expression: `Hepsi CaCO₃: ${dec222(mc.mass)}/${molar222("CaCO₃")} = ${dec222(mc.lo)} mol; hepsi MgCO₃: ${dec222(mc.mass)}/${molar222("MgCO₃")} ≈ ${approx222(mc.hi)} mol`, explanation: `${dec222(mc.gasMol)} mol bu iki değerin arasındadır; iki bileşen de pozitif çıkacaktır.` },
      { label: "Eşitlikler", expression: `x + y = ${dec222(mc.gasMol)}; ${molar222("CaCO₃")}x + ${molar222("MgCO₃")}y = ${dec222(mc.mass)}`, explanation: "x mol CaCO₃, y mol MgCO₃." },
      { label: "Çöz", expression: `${molar222("CaCO₃") - molar222("MgCO₃")}x = ${dec222(mc.mass)} − ${molar222("MgCO₃")} × ${dec222(mc.gasMol)} = ${dec222(mc.excess)} ⇒ x = ${dec222(mc.x)}, y = ${dec222(mc.y)} mol`, explanation: `İlk eşitliği ${molar222("MgCO₃")} ile çarpıp ikinciden çıkar.` },
      { label: "Kütleler", expression: `CaCO₃ ${dec222(mc.mCa)} g, MgCO₃ ${dec222(mc.mMg)} g`, explanation: "Mol × mol kütlesi." },
    ],
    answer: `Olasıdır: ${dec222(mc.mCa)} g CaCO₃ ve ${dec222(mc.mMg)} g MgCO₃`,
    check: `${dec222(mc.mCa)} + ${dec222(mc.mMg)} = ${dec222(mc.mass)} g; ${dec222(mc.x)} + ${dec222(mc.y)} = ${dec222(mc.gasMol)} mol CO₂.`,
    pitfall: "Bütün CO₂’yi CaCO₃’e bağlayıp tek kaynaklı saflık hesabı yapmak. İki karbonat da gaz verdiği için bu bir tepkimeli karışım problemidir.",
  },
];

export const mixSupplement222 = {
  title: mixSection222.title,
  figureTitle: mixSection222.title,
  paragraphs: mixSection222.paragraphs,
  summary: `x, y mol: kütle M₁x + M₂y, gaz g₁x + g₂y. Seçici karışımda gaz yalnız x’i verir. Mg 1, Al ${frac222(al.gas)}, C₂H₆ ${dec222(xHc.second.gas)} mol gaz/mol. Örnek: ${xMgAl.label} ${dec222(xMgAl.mass)} g, ${dec222(xMgAl.gasMol)} mol H₂ ⇒ ${dec222(xMgAl.m1)} g Mg, ${dec222(xMgAl.m2)} g Al.`,
  appendSection: true as const,
  table: mixTable222,
  examples: mixExamples222,
};

/* =====================================================================
 * 4. Katlı oranlar: azot ve demir oksit serileri
 * ===================================================================== */

export interface OxideSeries222 { element: "N" | "Fe"; formulas: readonly string[] }
export const oxideSeries222: readonly OxideSeries222[] = [
  { element: "N", formulas: ["N₂O", "NO", "N₂O₃", "NO₂", "N₂O₅"] },
  { element: "Fe", formulas: ["FeO", "Fe₃O₄", "Fe₂O₃"] },
];
/** Seri: sabit element sayılarının EKOK’u L, her bileşikte L atoma düşen O sayısı ve kütlesi. */
export const seriesRows222 = (s: OxideSeries222) => {
  const parts = s.formulas.map((f) => {
    const c = composition222(f);
    guard(Object.keys(c).length === 2 && c[s.element] !== undefined && c.O !== undefined, `${f} yalnız ${s.element} ve O içermeli`);
    return { formula: f, e: c[s.element]!, o: c.O! };
  });
  const L = parts.reduce((m, p) => lcm(m, p.e), 1);
  const fixedMass = L * ATOMIC_MASS222[s.element];
  const atoms = parts.map((p) => (p.o * L) / p.e);
  guard(atoms.every(Number.isInteger), "EKOK temelinde O sayıları tam sayı olmalı");
  const g = atoms.reduce((a, b) => gcd(a, b), 0);
  return parts.map((p, i) => {
    const em = p.e * ATOMIC_MASS222[s.element];
    const om = p.o * ATOMIC_MASS222.O;
    const k = gcd(em, om);
    return { ...p, element: s.element, L, fixedMass, oxygenAtoms: atoms[i], oxygenMass: atoms[i] * ATOMIC_MASS222.O, ratio: atoms[i] / g, massRatio: [em / k, om / k] as const, scale: L / p.e };
  });
};
const [nRows, feRows] = oxideSeries222.map(seriesRows222);
export const multipleTable222 = {
  layout: "table" as const,
  headers: ["Bileşik", "Kütlece oran (element : O)", "Eşit elemente bağlanan O", "Seri içi O oranı"],
  rows: [...nRows, ...feRows].map((r) => [r.formula, `${r.massRatio[0]} : ${r.massRatio[1]}`, `${r.fixedMass} g ${r.element}’ye ${r.oxygenMass} g`, String(r.ratio)]),
};
guard(nRows.map(({ ratio }) => ratio).join() === "1,2,3,4,5", "azot oksitleri 1:2:3:4:5 vermeli");
guard(feRows.map(({ ratio }) => ratio).join() === "6,8,9", "demir oksitleri 6:8:9 vermeli");
guard([nRows, feRows].every((rs) => rs.every(({ ratio }) => Number.isInteger(ratio) && ratio <= 9) && new Set(rs.map(({ ratio }) => ratio)).size === rs.length), "seri oranları farklı küçük tam sayılar olmalı");
guard(nRows[0].L === 2 && feRows[0].L === 6, "EKOK azotta 2, demirde 6 olmalı");
guard(nRows.every(({ massRatio }) => massRatio[0] === 7), "azot oksitlerinin kütlece oranları 7 : k biçiminde olmalı");
const feO = feRows[0];

export const multipleSection222: GuideSection = {
  title: "Azot ve demir oksitlerinde eşit elemente düşen oksijen",
  paragraphs: [
    `Her seride önce sabitlenecek elementin formüllerdeki sayılarının EKOK’u alınır. Azot oksitlerinde N sayıları 1 ve 2 olduğundan ${nRows[0].L} N atomu, yani ${nRows[0].L} × ${ATOMIC_MASS222.N} = ${nRows[0].fixedMass} g N temel alınır (N ${ATOMIC_MASS222.N}, O ${ATOMIC_MASS222.O}). Bu kütleye bağlanan O: ${nRows.map((r) => `${r.formula} ${r.oxygenMass} g`).join(", ")}; oran ${nRows.map(({ ratio }) => ratio).join(" : ")}’tir. Aynı iki elementin beş farklı bileşiği, eşit N’ye karşı küçük tam sayılı oksijen oranları verir.`,
    `Demir oksitlerinde Fe sayıları ${feRows.map(({ e }) => e).join(", ")}’dir; EKOK ${feRows[0].L} olduğundan ${feRows[0].L} × ${ATOMIC_MASS222.Fe} = ${feRows[0].fixedMass} g Fe temel alınır. Bağlanan O: ${feRows.map((r) => `${r.formula} ${r.oxygenMass} g`).join(", ")}; oran ${feRows.map(({ ratio }) => ratio).join(" : ")} olur. Oran 1’den başlamak zorunda değildir; sadeleşmiş küçük tam sayılar yeterlidir. Kütlece oran sütunu tek bileşiğin sabit oranıdır (ör. ${feO.formula}’da ${feO.massRatio[0]} : ${feO.massRatio[1]}); katlı oran ise aynı serideki bileşiklerin O kütlelerini eşit elemente göre karşılaştırır.`,
  ],
  table: multipleTable222,
};

/* Örnek 1: kütlelerden katlı oran ve basit formül (S–O). */
export const sulfurCase222 = (() => {
  const I = { s: qi(8), o: qi(8) };
  const II = { s: qi(4), o: qi(6) };
  const k = qDiv222(I.s, II.s);
  const oScaled = qMul222(II.o, k);
  const ratio = qDiv222(I.o, oScaled);
  const atom = (x: { s: Q222; o: Q222 }) => qDiv222(qDiv222(x.o, M("O")), qDiv222(x.s, M("S")));
  return { I, II, k, oScaled, ratio, atomI: atom(I), atomII: atom(II), nSI: qDiv222(I.s, M("S")), nOI: qDiv222(I.o, M("O")), nSII: qDiv222(II.s, M("S")), nOII: qDiv222(II.o, M("O")) };
})();
guard(qEq222(sulfurCase222.atomI, qi(2)) && qEq222(sulfurCase222.atomII, qi(3)), "kükürt örneği SO₂ ve SO₃ vermeli");
/* Örnek 2: verilen orandan ikinci bileşiğin basit formülü (N–O). */
export const nitrogenCase222 = (() => {
  const ref = composition222("NO");
  const given = q222(5, 2);
  const oPerN = qMul222(q222(ref.O!, ref.N!), given);
  const formula = `N${oPerN.d === 1 ? "" : String(oPerN.d).replace(/\d/g, (c) => "₀₁₂₃₄₅₆₇₈₉"[Number(c)])}O${String(oPerN.n).replace(/\d/g, (c) => "₀₁₂₃₄₅₆₇₈₉"[Number(c)])}`;
  const oRef = qMul222(qDiv222(qi(7), M("N")), M("O"));
  const oNew = qMul222(oRef, given);
  const inverse = qDiv222(qi(1), oPerN);
  return { given, oPerN, formula, oRef, oNew, inverse };
})();
const sc = sulfurCase222;
const nc = nitrogenCase222;
guard(nc.formula === "N₂O₅" && nRows.some((r) => r.formula === nc.formula), "azot örneği tablodaki N₂O₅ satırını vermeli");
const n2o5 = nRows.find((r) => r.formula === nc.formula)!;
guard(n2o5.massRatio[0] === 7 && qEq222(qi(n2o5.massRatio[1]), nc.oNew), "7 g N’ye düşen O tablo oranıyla aynı olmalı");

export const multipleExamples222: WorkedExample[] = [
  {
    title: "Kütlelerden katlı oran ve basit formül",
    prompt: `Yalnız kükürt ve oksijenden oluşan iki saf bileşik inceleniyor. I. örnekte ${dec222(sc.I.s)} g S ile ${dec222(sc.I.o)} g O, II. örnekte ${dec222(sc.II.s)} g S ile ${dec222(sc.II.o)} g O vardır. (a) Eşit kütlede S’ye karşılık O(I)/O(II) oranı kaçtır? (b) S ${ATOMIC_MASS222.S}, O ${ATOMIC_MASS222.O} g/mol ise bileşiklerin basit formülleri nedir?`,
    strategy: "Önce örneklerden birini ölçekleyerek S kütlelerini eşitle, sonra O kütlelerini böl. Basit formül için kütleleri mole çevir.",
    steps: [
      { label: "Eşitle", expression: `II × ${dec222(sc.k)}: ${dec222(sc.I.s)} g S ve ${dec222(sc.oScaled)} g O`, explanation: "Örneği büyütmek bileşimi değiştirmez." },
      { label: "Katlı oran", expression: `O(I)/O(II) = ${dec222(sc.I.o)}/${dec222(sc.oScaled)} = ${frac222(sc.ratio)}`, explanation: "Eşitlenen S’nin değil, diğer elementin kütleleri bölünür." },
      { label: "I’in formülü", expression: `S ${dec222(sc.nSI)} mol, O ${dec222(sc.nOI)} mol ⇒ 1 : ${dec222(sc.atomI)}`, explanation: "I = SO₂." },
      { label: "II’nin formülü", expression: `S ${dec222(sc.nSII)} mol, O ${dec222(sc.nOII)} mol ⇒ 1 : ${dec222(sc.atomII)}`, explanation: "II = SO₃." },
    ],
    answer: `(a) ${frac222(sc.ratio)} (b) I: SO₂, II: SO₃ (basit formül)`,
    check: `Formüllerden: ${ATOMIC_MASS222.S} g S’ye SO₂’de ${2 * ATOMIC_MASS222.O} g, SO₃’te ${3 * ATOMIC_MASS222.O} g O düşer; ${2 * ATOMIC_MASS222.O}/${3 * ATOMIC_MASS222.O} = ${frac222(q222(2 * ATOMIC_MASS222.O, 3 * ATOMIC_MASS222.O))}.`,
    pitfall: `Örnekleri eşitlemeden ${dec222(sc.I.o)}/${dec222(sc.II.o)} = ${frac222(qDiv222(sc.I.o, sc.II.o))} yazmak. Bu, farklı S kütlelerine düşen oksijenleri karşılaştırır.`,
  },
  {
    title: "Verilen orandan ikinci oksidin formülü",
    prompt: `Azot ve oksijenden oluşan I. bileşik NO’dur. II. bileşikte eşit kütlede azota bağlanan oksijen kütlesi, I’dekinin ${frac222(nc.given)} katıdır. II. bileşiğin basit formülü nedir ve 7 g N’ye kaç g O bağlar? (N ${ATOMIC_MASS222.N}, O ${ATOMIC_MASS222.O} g/mol)`,
    strategy: "Eşit N’de O kütlesi oranı, O atom sayısı oranıdır. NO’daki O/N oranını verilen katla çarp ve tam sayıya getir.",
    steps: [
      { label: "Atom oranı", expression: `NO: O/N = 1 ⇒ II: O/N = 1 × ${frac222(nc.given)} = ${frac222(nc.oPerN)}`, explanation: "Aynı N sayısına düşen O sayısı aynı katla artar." },
      { label: "Tam sayıya getir", expression: `N : O = ${nc.oPerN.d} : ${nc.oPerN.n} ⇒ ${nc.formula}`, explanation: "Basit formülde alt indisler en küçük tam sayılardır." },
      { label: "7 g N’ye O", expression: `NO: 7 g N’ye ${dec222(nc.oRef)} g O ⇒ II: ${dec222(nc.oRef)} × ${frac222(nc.given)} = ${dec222(nc.oNew)} g`, explanation: `7 g N = ${dec222(qDiv222(qi(7), M("N")))} mol N; NO’da ${dec222(qDiv222(qi(7), M("N")))} mol O = ${dec222(nc.oRef)} g.` },
    ],
    answer: `${nc.formula} (basit formül); 7 g N’ye ${dec222(nc.oNew)} g O`,
    check: `Tablodaki ${n2o5.formula} satırının kütlece oranı ${n2o5.massRatio[0]} : ${n2o5.massRatio[1]}’dir; 7 g N’ye ${dec222(nc.oNew)} g O ile aynıdır.`,
    pitfall: `Oranı ters okuyup O/N = ${frac222(nc.inverse)} almak ve N₅O₂ yazmak. “I’dekinin 5/2 katı” II’nin daha çok oksijen içerdiğini söyler.`,
  },
];

export const multipleSupplement222 = {
  title: multipleSection222.title,
  figureTitle: multipleSection222.title,
  paragraphs: multipleSection222.paragraphs,
  summary: `Sabit elementin sayılarının EKOK’u temel alınır. ${nRows[0].fixedMass} g N’ye: ${nRows.map((r) => `${r.formula} ${r.oxygenMass} g`).join(", ")} O ⇒ ${nRows.map(({ ratio }) => ratio).join(" : ")}. ${feRows[0].fixedMass} g Fe’ye: ${feRows.map((r) => `${r.formula} ${r.oxygenMass} g`).join(", ")} O ⇒ ${feRows.map(({ ratio }) => ratio).join(" : ")}.`,
  appendSection: true as const,
  table: multipleTable222,
  examples: multipleExamples222,
};
export const nitrogenOxides222 = nRows;
export const ironOxides222 = feRows;

/* =====================================================================
 * 5. Katı kütlesi değişimi: 1 mol katı başına
 * ===================================================================== */

export interface SolidReaction222 {
  equation: string;
  kind: "ayrışma" | "indirgenme" | "yanma";
  /** Giren katı ve katsayısı. */
  solid: readonly [string, number];
  /** Oluşan katılar. */
  products: readonly (readonly [string, number])[];
  /** Katıya giren gazlar ve katıdan çıkan gazlar (formül, katsayı). */
  gasIn: readonly (readonly [string, number])[];
  gasOut: readonly (readonly [string, number])[];
}
export const solidReactions222: readonly SolidReaction222[] = [
  { equation: "CaCO₃ → CaO + CO₂", kind: "ayrışma", solid: ["CaCO₃", 1], products: [["CaO", 1]], gasIn: [], gasOut: [["CO₂", 1]] },
  { equation: "MgCO₃ → MgO + CO₂", kind: "ayrışma", solid: ["MgCO₃", 1], products: [["MgO", 1]], gasIn: [], gasOut: [["CO₂", 1]] },
  { equation: "2 NaHCO₃ → Na₂CO₃ + H₂O + CO₂", kind: "ayrışma", solid: ["NaHCO₃", 2], products: [["Na₂CO₃", 1]], gasIn: [], gasOut: [["H₂O", 1], ["CO₂", 1]] },
  { equation: "CuO + H₂ → Cu + H₂O", kind: "indirgenme", solid: ["CuO", 1], products: [["Cu", 1]], gasIn: [["H₂", 1]], gasOut: [["H₂O", 1]] },
  { equation: "2 Mg + O₂ → 2 MgO", kind: "yanma", solid: ["Mg", 2], products: [["MgO", 2]], gasIn: [["O₂", 1]], gasOut: [] },
  { equation: "2 Cu + O₂ → 2 CuO", kind: "yanma", solid: ["Cu", 2], products: [["CuO", 2]], gasIn: [["O₂", 1]], gasOut: [] },
  { equation: "4 Fe + 3 O₂ → 2 Fe₂O₃", kind: "yanma", solid: ["Fe", 4], products: [["Fe₂O₃", 2]], gasIn: [["O₂", 3]], gasOut: [] },
  { equation: "4 Al + 3 O₂ → 2 Al₂O₃", kind: "yanma", solid: ["Al", 4], products: [["Al₂O₃", 2]], gasIn: [["O₂", 3]], gasOut: [] },
];
/** Element sayımıyla denklemin denkliğini sınar. */
const balanced = (r: SolidReaction222) => {
  const count = (side: readonly (readonly [string, number])[]) => {
    const out: Record<string, number> = {};
    for (const [f, k] of side) for (const [el, n] of Object.entries(composition222(f))) out[el] = (out[el] ?? 0) + k * (n ?? 0);
    return out;
  };
  const left = count([r.solid, ...r.gasIn]);
  const right = count([...r.products, ...r.gasOut]);
  return Object.keys({ ...left, ...right }).every((el) => left[el] === right[el]);
};
export const solidRow222 = (r: SolidReaction222) => {
  guard(balanced(r), `${r.equation} denk olmalı`);
  const per = (k: number) => q222(k, r.solid[1]);
  const sum = (xs: readonly (readonly [string, number])[]) => xs.reduce((s, [f, k]) => qAdd222(s, qMul222(per(k), M(f))), Z);
  const start = M(r.solid[0]);
  const end = sum(r.products);
  const into = sum(r.gasIn);
  const out = sum(r.gasOut);
  const change = qSub222(end, start);
  return { ...r, start, end, into, out, change, perGas: (xs: readonly (readonly [string, number])[]) => xs.map(([f, k]) => ({ f, mass: qMul222(per(k), M(f)), mol: per(k) })) };
};
export const solidRows222 = () => solidReactions222.map(solidRow222);
const sRows = solidRows222();
const gasText = (r: ReturnType<typeof solidRow222>) => {
  const ins = r.perGas(r.gasIn).map(({ f, mass }) => `${dec222(mass)} g ${f} girer`);
  const outs = r.perGas(r.gasOut).map(({ f, mass }) => `${dec222(mass)} g ${f}`);
  if (r.kind === "yanma") return `${dec222(r.change)} g O katıya bağlanır`;
  return [...ins, outs.length ? `${outs.join(" + ")} çıkar` : ""].filter(Boolean).join("; ");
};
export const solidTable222 = {
  layout: "table" as const,
  headers: ["Tepkime", "1 mol giren katı (g)", "Son katı (g)", "Katı farkı (g)", "Gaz alışverişi"],
  rows: sRows.map((r) => [r.equation, `${dec222(r.start)} g ${r.solid[0]}`, dec222(r.end), signed(r.change), gasText(r)]),
};
for (const r of sRows) {
  guard(qEq222(r.change, qSub222(r.into, r.out)), `${r.equation}: katı farkı giren gaz − çıkan gaz olmalı`);
  guard(r.kind === "yanma" ? qLt222(Z, r.change) : qLt222(r.change, Z), `${r.equation}: yanmada katı artmalı, ayrışma ve indirgenmede azalmalı`);
}
const [sCa, sMgC, sNa, sCuO, sMg, sCu, sFe, sAl] = sRows;
guard(qEq222(sCa.change, qi(-44)) && qEq222(sMgC.change, qi(-44)) && qEq222(sCa.out, M("CO₂")), "iki karbonatta fark 1 mol CO₂ olmalı");
guard(qEq222(sMg.change, qi(16)) && qEq222(sCu.change, qi(16)), "Mg ve Cu 1 mol O bağlamalı");
guard(qEq222(sFe.change, qi(24)) && qEq222(sAl.change, qi(24)) && qEq222(qDiv222(sFe.change, M("O")), q222(3, 2)), "Fe ve Al mol başına 1,5 mol O bağlamalı");
guard(qEq222(sCuO.change, qi(-16)) && qEq222(sCuO.out, M("H₂O")) && qEq222(sCuO.into, M("H₂")), "CuO satırında katı 16 g azalır, 18 g su oluşur, 2 g H₂ girer");
const naGas = sNa.perGas(sNa.gasOut);

export const solidSection222: GuideSection = {
  title: "Bir mol katı başına kütle değişimini tablodan oku",
  paragraphs: [
    `Satırlar giren katının 1 molü için yazılmıştır; tepkime tamdır ve katı başka madde kaybetmez. Isıtılan karbonat ve hidrojen karbonatta gaz çıkar, katı azalır: CaCO₃ ${dec222(sCa.start)} g’dan ${dec222(sCa.end)} g’a, MgCO₃ ${dec222(sMgC.start)} g’dan ${dec222(sMgC.end)} g’a iner. İkisinde de fark ${dec222(sCa.change)} g, yani çıkan 1 mol CO₂’dir. NaHCO₃’te 1 mol başına ${naGas.map(({ f, mass }) => `${dec222(mass)} g ${f}`).join(" ve ")} çıkar; katı ${dec222(sNa.out)} g azalır.`,
    `Metal oksijenle yandığında katı artar: Mg ${dec222(sMg.start)} g’dan ${dec222(sMg.end)} g’a, Cu ${dec222(sCu.start)} g’dan ${dec222(sCu.end)} g’a çıkar ve artış bağlanan ${dec222(sMg.change)} g O’dur. Fe ve Al’de 1 mol metal ${dec222(qDiv222(sFe.change, M("O")))} mol O (${dec222(sFe.change)} g) bağlar, çünkü bu oksitlerde metal : O = 2 : 3’tür. CuO + H₂ satırında katı ${dec222(qMul222(sCuO.change, qi(-1)))} g azalırken ${dec222(sCuO.out)} g su oluşur; aradaki fark dışarıdan gelen ${dec222(sCuO.into)} g H₂’dir. Her satırda katı farkı = katıya giren gaz − katıdan çıkan gaz eşitliği sağlanır.`,
  ],
  table: solidTable222,
};

/* Örnek 1: inertli numunede kısmi ayrışma. */
export const solidPartial222 = (() => {
  const sample = qi(60);
  const caco3 = qi(30);
  const finalSolid = qd("53,4");
  const loss = qSub222(sample, finalSolid);
  const n = qDiv222(loss, M("CO₂"));
  const reacted = qMul222(n, M("CaCO₃"));
  const percent = qMul222(qDiv222(reacted, caco3), qi(100));
  const cao = qMul222(n, M("CaO"));
  const left = qSub222(caco3, reacted);
  const inert = qSub222(sample, caco3);
  return { sample, caco3, finalSolid, loss, n, reacted, percent, cao, left, inert };
})();
/* Örnek 2: Mg/Cu karışımının yanması. */
export const solidMix222 = (() => {
  const mass = qd("8,8");
  const oxides = qi(12);
  const o = qSub222(oxides, mass);
  const nO = qDiv222(o, M("O"));
  const { x, y } = solve2x2_222(M("Mg"), M("Cu"), mass, qi(1), qi(1), nO);
  return { mass, oxides, o, nO, x, y, mMg: qMul222(x, M("Mg")), mCu: qMul222(y, M("Cu")), mgo: qMul222(x, M("MgO")), cuo: qMul222(y, M("CuO")), excess: qSub222(mass, qMul222(nO, M("Mg"))) };
})();
const sp = solidPartial222;
const sm = solidMix222;
guard(qEq222(qAdd222(qAdd222(sp.cao, sp.left), sp.inert), sp.finalSolid) && qLt222(sp.reacted, sp.caco3), "kısmi ayrışma kalıntısı üç katının toplamı olmalı");
guard(qLt222(Z, sm.x) && qLt222(Z, sm.y) && qEq222(qAdd222(sm.mgo, sm.cuo), sm.oxides), "Mg/Cu örneği iki pozitif bileşen ve oksit toplamı vermeli");

export const solidExamples222: WorkedExample[] = [
  {
    title: "Kalıntı kütlesinden ayrışma yüzdesi",
    prompt: `${dec222(sp.sample)} g numunede ${dec222(sp.caco3)} g CaCO₃ vardır; geri kalanı ısıtmada değişmeyen, uçmayan inert dolgudur. Numune bir süre ısıtılınca CaCO₃ → CaO + CO₂ tepkimesi kısmen gerçekleşiyor ve kalan katı ${dec222(sp.finalSolid)} g tartılıyor. CaCO₃’ün yüzde kaçı ayrışmıştır ve kalan katıda neler vardır? (Ca ${ATOMIC_MASS222.Ca}, C ${ATOMIC_MASS222.C}, O ${ATOMIC_MASS222.O} g/mol)`,
    strategy: "Katıdan yalnız CO₂ ayrılır. Kaybı CO₂ say, ayrışan CaCO₃’ü bul, kalıntıyı üç parçaya ayır.",
    steps: [
      { label: "Kayıp", expression: `${dec222(sp.sample)} − ${dec222(sp.finalSolid)} = ${dec222(sp.loss)} g CO₂ = ${dec222(sp.n)} mol`, explanation: "Dolgu kütle kaybetmez." },
      { label: "Ayrışan", expression: `${dec222(sp.n)} × ${molar222("CaCO₃")} = ${dec222(sp.reacted)} g CaCO₃ ⇒ ${dec222(sp.reacted)}/${dec222(sp.caco3)} = ${pct(sp.percent)}`, explanation: "Yüzde, numunenin değil başlangıçtaki CaCO₃’ün payıdır." },
      { label: "Kalıntı", expression: `${dec222(sp.cao)} g CaO + ${dec222(sp.left)} g CaCO₃ + ${dec222(sp.inert)} g inert = ${dec222(sp.finalSolid)} g`, explanation: "Kalıntı bir tartım kategorisidir; üç katı birlikte bulunur." },
    ],
    answer: `${pct(sp.percent)}; kalıntı ${dec222(sp.cao)} g CaO, ${dec222(sp.left)} g CaCO₃ ve ${dec222(sp.inert)} g inert`,
    check: `${dec222(sp.reacted)} g CaCO₃ → ${dec222(sp.cao)} g CaO + ${dec222(sp.loss)} g CO₂; ${dec222(sp.cao)} + ${dec222(sp.loss)} = ${dec222(sp.reacted)}.`,
    pitfall: `Kaybı numunenin tamamına oranlayıp ${dec222(sp.reacted)}/${dec222(sp.sample)} yazmak ya da ${dec222(sp.finalSolid)} g’ın tamamını CaO sanmak.`,
  },
  {
    title: "Yanan metal karışımında artıştan bileşim",
    prompt: `${dec222(sm.mass)} g Mg ve Cu karışımı yeterli oksijenle tamamen yakılıyor: 2 Mg + O₂ → 2 MgO ve 2 Cu + O₂ → 2 CuO. Oluşan oksit karışımı ${dec222(sm.oxides)} g’dır. Mg ${ATOMIC_MASS222.Mg}, Cu ${ATOMIC_MASS222.Cu}, O ${ATOMIC_MASS222.O} g/mol. Başlangıçta kaçar gram Mg ve Cu vardır?`,
    strategy: "Katı artışı bağlanan O’dur. İki metal de mol başına 1 mol O bağladığı için artış toplam metal molünü verir; kütle eşitliğiyle birlikte çöz.",
    steps: [
      { label: "Bağlanan O", expression: `${dec222(sm.oxides)} − ${dec222(sm.mass)} = ${dec222(sm.o)} g = ${dec222(sm.nO)} mol O`, explanation: "MgO ve CuO’da metal : O = 1 : 1’dir." },
      { label: "Eşitlikler", expression: `x + y = ${dec222(sm.nO)}; ${ATOMIC_MASS222.Mg}x + ${ATOMIC_MASS222.Cu}y = ${dec222(sm.mass)}`, explanation: "x mol Mg, y mol Cu." },
      { label: "Çöz", expression: `${ATOMIC_MASS222.Cu - ATOMIC_MASS222.Mg}y = ${dec222(sm.mass)} − ${ATOMIC_MASS222.Mg} × ${dec222(sm.nO)} = ${dec222(sm.excess)} ⇒ y = ${dec222(sm.y)}, x = ${dec222(sm.x)} mol`, explanation: `İlk eşitliği ${ATOMIC_MASS222.Mg} ile çarpıp ikinciden çıkar.` },
      { label: "Kütleler", expression: `Mg ${dec222(sm.mMg)} g, Cu ${dec222(sm.mCu)} g`, explanation: "Mol × atom kütlesi." },
    ],
    answer: `${dec222(sm.mMg)} g Mg ve ${dec222(sm.mCu)} g Cu`,
    check: `${dec222(sm.mgo)} g MgO + ${dec222(sm.cuo)} g CuO = ${dec222(sm.oxides)} g.`,
    pitfall: `${dec222(sm.o)} g artışı O₂ molüne çevirip ${dec222(qDiv222(sm.o, M("O₂")))} mol metal saymak. Her metal atomu bir O atomu bağlar; O₂ molü metal molünün yarısıdır.`,
  },
];

export const solidSupplement222 = {
  title: solidSection222.title,
  figureTitle: solidSection222.title,
  paragraphs: solidSection222.paragraphs,
  summary: `Katı farkı = katıya giren gaz − katıdan çıkan gaz. 1 mol başına: CaCO₃ ve MgCO₃ ${dec222(sCa.change)} g (CO₂), NaHCO₃ ${dec222(sNa.change)} g, CuO ${dec222(sCuO.change)} g (su ${dec222(sCuO.out)} g), Mg ve Cu ${signed(sMg.change)} g, Fe ve Al ${signed(sFe.change)} g O.`,
  appendSection: true as const,
  table: solidTable222,
  examples: solidExamples222,
};

export const depth222Supplements = {
  "yuzde-verim": [yieldSupplement222],
  "safsizlik-problemleri": [puritySupplement222],
  "tepkimeli-karisim": [mixSupplement222],
  "katli-oranlar": [multipleSupplement222],
  "kati-kutlesi-degisimi": [solidSupplement222],
};
