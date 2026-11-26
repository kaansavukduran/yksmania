import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Kimya karışımlar, derişim, ayırma, su ve çevre derinleştirmesi (0.224.0).
 * Kabul edilmiş rehberler değişmez; her derse görüntüleme katmanında bir
 * tablo bölümü, iki özgün çözümlü örnek ve bir bölüm çizimi eklenir.
 * Derişimler, mol sayıları ve enerjiler tam kesirlerle hesaplanır; ondalık
 * yazım kesin uzun bölmeyle üretilir ve sonsuz açılım hata verir.
 * Paragraflardaki genel yargılar modül yüklenirken veriyle sınanır; veri
 * yargıyı desteklemezse modül hata verir.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth224: veri bu yargıyı artık desteklemiyor: ${claim}`);
};
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
/** “a, b ve c” */
const and = (xs: readonly string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ve ${xs[xs.length - 1]}`);
const cap = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);

/* ---------- Tam kesir aritmetiği ---------- */

export interface Q224 { n: number; d: number }
export const q224 = (n: number, d = 1): Q224 => {
  guard(Number.isInteger(n) && Number.isInteger(d) && d !== 0, "kesir tam sayılardan kurulmalı");
  const s = d < 0 ? -1 : 1;
  const g = gcd(n, d) || 1;
  return { n: (s * n) / g, d: (s * d) / g };
};
const q = q224;
const add = (a: Q224, b: Q224) => q(a.n * b.d + b.n * a.d, a.d * b.d);
const subQ = (a: Q224, b: Q224) => q(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a: Q224, b: Q224) => q(a.n * b.n, a.d * b.d);
const div = (a: Q224, b: Q224) => { guard(b.n !== 0, "sıfıra bölünmez"); return q(a.n * b.d, a.d * b.n); };
const eq = (a: Q224, b: Q224) => a.n === b.n && a.d === b.d;
const lt = (a: Q224, b: Q224) => a.n * b.d < b.n * a.d;
const int = (n: number) => q(n);
export const toNumber224 = (x: Q224) => x.n / x.d;

/** Kesin ondalık yazım, Türkçe virgülle; en az minDigits basamak. Sonsuz açılım hata verir. */
export const dec224 = (x: Q224, minDigits = 0) => {
  const sign = x.n < 0 ? "−" : "";
  let r = Math.abs(x.n);
  const whole = Math.floor(r / x.d);
  r %= x.d;
  let digits = "";
  for (let i = 0; i < 10 && r !== 0; i += 1) { r *= 10; digits += String(Math.floor(r / x.d)); r %= x.d; }
  guard(r === 0, `${x.n}/${x.d} sonlu ondalık olmalı`);
  digits = digits.padEnd(minDigits, "0");
  return `${sign}${whole}${digits ? `,${digits}` : ""}`;
};
const d = dec224;

/*
 * Ders kitabı yuvarlak atom kütleleri (g/mol). Kaynak: IUPAC standart atom
 * ağırlıkları (H 1,008; C 12,011; N 14,007; O 15,999; Na 22,990; S 32,06;
 * Cl 35,45; Ca 40,078), MEB TYT kitaplarındaki yuvarlak değerlere çevrilmiş.
 */
export const atomicMass224 = { H: q(1), C: q(12), N: q(14), O: q(16), Na: q(23), S: q(32), Cl: q(71, 2), Ca: q(40) } as const;
export type Element224 = keyof typeof atomicMass224;

/* ---------- Formül çözümleyici (alt simgeli yazım) ---------- */

const SUB = "₀₁₂₃₄₅₆₇₈₉";
export const atoms224 = (formula: string): Record<string, number> => {
  const plain = formula.replace(/[₀-₉]/g, (c) => String(SUB.indexOf(c)));
  const stack: Record<string, number>[] = [{}];
  const re = /([A-Z][a-z]?)(\d*)|(\()|\)(\d*)/g;
  let m: RegExpExecArray | null;
  let used = 0;
  while ((m = re.exec(plain))) {
    used += m[0].length;
    if (m[1]) { const top = stack[stack.length - 1]; top[m[1]] = (top[m[1]] ?? 0) + Number(m[2] || 1); }
    else if (m[3]) stack.push({});
    else {
      const inner = stack.pop()!;
      const k = Number(m[4] || 1);
      const top = stack[stack.length - 1];
      for (const [el, n] of Object.entries(inner)) top[el] = (top[el] ?? 0) + n * k;
    }
  }
  guard(used === plain.length && stack.length === 1, `${formula} çözümlenebilmeli`);
  return stack[0];
};
export const molarMass224 = (formula: string): Q224 =>
  Object.entries(atoms224(formula)).reduce((s, [el, n]) => {
    const m = atomicMass224[el as Element224];
    guard(Boolean(m), `${el} için atom kütlesi verilmeli`);
    return add(s, mul(m, int(n)));
  }, int(0));
const massText = (formula: string) => {
  const parts = Object.entries(atoms224(formula)).map(([el, n]) => `${n > 1 ? `${n}·` : ""}${d(atomicMass224[el as Element224])}`);
  return `${parts.join(" + ")} = ${d(molarMass224(formula))}`;
};

/* =====================================================================
 * 1 · Karışımların sınıflandırılması: dağılan, dağıtıcı ve tanecik
 * ===================================================================== */

export type Phase224 = "katı" | "sıvı" | "gaz";
/** Dağılan taneciğin ölçeği: moleküler (iyon, molekül, atom), kolloid boyutu ya da büyük (gözle/mikroskopla görülen). */
export type Scale224 = "moleküler" | "kolloid" | "büyük";
export type MixKind224 = "çözelti" | "kolloid" | "süspansiyon" | "emülsiyon" | "aerosol";
export interface Mixture224 {
  example: string;
  dispersed: string;
  dPhase: Phase224;
  medium: string;
  mPhase: Phase224;
  particle: string;
  scale: Scale224;
}
export type MixtureKey224 = Pick<Mixture224, "dPhase" | "mPhase" | "scale">;

/**
 * Okul sınıflandırması: dağılan moleküler ölçekteyse çözelti; dağıtıcı gazsa
 * aerosol; kolloid boyutunda dağılım kolloid; büyük katı tanecik sıvıda
 * süspansiyon, büyük sıvı damlacık sıvıda emülsiyon.
 */
export const classify224 = ({ dPhase, mPhase, scale }: MixtureKey224): MixKind224 => {
  if (scale === "moleküler") return "çözelti";
  if (mPhase === "gaz") { guard(dPhase !== "gaz", "gaz içinde gaz moleküler karışır"); return "aerosol"; }
  if (scale === "kolloid") return "kolloid";
  if (mPhase === "sıvı" && dPhase === "katı") return "süspansiyon";
  if (mPhase === "sıvı" && dPhase === "sıvı") return "emülsiyon";
  throw new Error(`depth224: ${dPhase} → ${mPhase} büyük tanecikli karışım bu tabloda tanımlı değil`);
};
export const isHomogeneous224 = (k: MixKind224) => k === "çözelti";
export const appearance224 = (k: MixKind224) => (isHomogeneous224(k) ? "Homojen" : k === "kolloid" ? "Heterojen; gözle tekdüze görünebilir" : "Heterojen");

export const mixtures224: readonly Mixture224[] = [
  { example: "Tuzlu su", dispersed: "NaCl", dPhase: "katı", medium: "su", mPhase: "sıvı", particle: "Na⁺ ve Cl⁻ iyonları", scale: "moleküler" },
  { example: "Hava", dispersed: "O₂, Ar ve diğer gazlar", dPhase: "gaz", medium: "N₂", mPhase: "gaz", particle: "molekül ve atomlar", scale: "moleküler" },
  { example: "Pirinç (alaşım)", dispersed: "çinko", dPhase: "katı", medium: "bakır", mPhase: "katı", particle: "metal atomları", scale: "moleküler" },
  { example: "Çamurlu su", dispersed: "toprak", dPhase: "katı", medium: "su", mPhase: "sıvı", particle: "gözle görülen katı taneler", scale: "büyük" },
  { example: "Çalkalanmış zeytinyağı-su", dispersed: "zeytinyağı", dPhase: "sıvı", medium: "su", mPhase: "sıvı", particle: "yağ damlacıkları", scale: "büyük" },
  { example: "Sis", dispersed: "su", dPhase: "sıvı", medium: "hava", mPhase: "gaz", particle: "sıvı su damlacıkları", scale: "büyük" },
  { example: "Duman", dispersed: "is", dPhase: "katı", medium: "hava", mPhase: "gaz", particle: "katı tanecikler (çoğu kolloid boyutta)", scale: "kolloid" },
  { example: "Süt", dispersed: "yağ ve protein", dPhase: "sıvı", medium: "su", mPhase: "sıvı", particle: "kolloid boyutta damlacık ve kümeler", scale: "kolloid" },
];
export const mixtureRows224 = () => mixtures224.map((m) => ({ ...m, kind: classify224(m), homogeneous: isHomogeneous224(classify224(m)) }));
const mixRows = mixtureRows224();
const mixRow = (example: string) => { const r = mixRows.find((x) => x.example === example); guard(Boolean(r), `${example} tabloda olmalı`); return r!; };
const solutions = mixRows.filter((r) => r.kind === "çözelti");
guard(solutions.every((r) => r.homogeneous) && mixRows.filter((r) => r.kind !== "çözelti").every((r) => !r.homogeneous), "yalnız çözeltiler homojen olmalı");
guard(new Set(solutions.map((r) => r.mPhase)).size === 3, "tablodaki çözeltilerde dağıtıcı katı, sıvı ve gaz olmalı");
guard(new Set(mixRows.map((r) => r.kind)).size === 5, "tablo beş sınıfın hepsini içermeli");
guard(mixRows.filter((r) => r.kind === "aerosol").every((r) => r.mPhase === "gaz" && r.dPhase !== "gaz"), "aerosolde dağıtıcı gaz, dağılan katı ya da sıvı olmalı");
guard(mixRows.filter((r) => r.kind === "emülsiyon").every((r) => r.dPhase === "sıvı" && r.mPhase === "sıvı"), "emülsiyon sıvı içinde sıvıdır");
guard(mixRows.filter((r) => r.kind === "süspansiyon").every((r) => r.dPhase === "katı" && r.mPhase === "sıvı"), "süspansiyon sıvı içinde katıdır");
const smoke = mixRow("Duman");
const milk = mixRow("Süt");
const brass = mixRow("Pirinç (alaşım)");
const air = mixRow("Hava");
const brine = mixRow("Tuzlu su");
guard(smoke.kind === "aerosol" && smoke.scale === "kolloid", "duman hem aerosol hem kolloid boyutta olmalı");
guard(milk.kind === "kolloid" && milk.dPhase === "sıvı" && milk.mPhase === "sıvı", "süt sıvı-sıvı kolloid olmalı");

const mixTitle = "Karışımı dağılan, dağıtıcı ve tanecik boyutuyla sınıflandır";
const mixTable = {
  layout: "table" as const,
  headers: ["Örnek", "Dağılan → dağıtıcı", "Dağılan tanecik", "Sınıf", "Görünüm"],
  rows: mixRows.map((r) => [r.example, `${r.dispersed} (${r.dPhase}) → ${r.medium} (${r.mPhase})`, r.particle, cap(r.kind), appearance224(r.kind)]),
};

export const mixSection224: GuideSection = {
  title: mixTitle,
  figureTitle: mixTitle,
  paragraphs: [
    `Bir karışımı sınıflandırmak için üç soru sor: Dağılan madde hangi fazda, dağıtıcı ortam hangi fazda ve dağılan tanecikler ne büyüklükte? Dağılan madde iyon, molekül ya da atom düzeyinde dağılmışsa karışım çözeltidir ve homojendir. Tablodaki ${and(solutions.map((r) => lower(r.example)))} çözeltidir; dağıtıcı sırasıyla ${and(solutions.map((r) => r.mPhase))} olduğundan çözelti yalnız sıvı değildir.`,
    `Tanecikler moleküler ölçekten büyükse karışım heterojendir ve adı fazlardan gelir: sıvı içinde büyük katı taneler süspansiyon, sıvı içinde sıvı damlacıklar emülsiyon, gaz içinde katı ya da sıvı tanecikler aerosoldür. Kolloid ise tanecik boyutuna dayanan bir sınıftır. ${milk.example} gözle tekdüze görünse de ${milk.particle} içerir ve kolloiddir; yağ damlacıkları için emülsiyon da denir.`,
    `Etiketler birbirini her zaman dışlamaz. ${smoke.example}, gaz içinde katı tanecik olduğu için aerosoldür; taneciklerinin çoğu kolloid boyutta olduğundan kolloid özellik de gösterir. Tabloda her satıra fazlardan gelen ana sınıf yazılmıştır. ${brass.example.replace(/ \(.*\)$/, "")} gibi katı bir alaşım ve ${lower(air.example)} da çözelti örnekleridir.`,
  ],
  table: mixTable,
};
function lower(s: string) { return s.toLocaleLowerCase("tr-TR"); }

/* Örnek 1: adsız dört karışım. */
export const unnamedSamples224: readonly (MixtureKey224 & { label: string; text: string })[] = [
  { label: "K", text: "iki gaz, molekülleri birbiri içinde dağılmış", dPhase: "gaz", mPhase: "gaz", scale: "moleküler" },
  { label: "L", text: "sıvı içinde gözle görülen katı taneler; bekleyince dibe çöküyor", dPhase: "katı", mPhase: "sıvı", scale: "büyük" },
  { label: "M", text: "gaz içinde dağılmış sıvı damlacıklar", dPhase: "sıvı", mPhase: "gaz", scale: "büyük" },
  { label: "N", text: "bir metalin atomları başka bir metalin katı örgüsünde düzgün dağılmış", dPhase: "katı", mPhase: "katı", scale: "moleküler" },
];
const sampleKinds = unnamedSamples224.map((s) => ({ ...s, kind: classify224(s) }));
const homCount = sampleKinds.filter((s) => isHomogeneous224(s.kind)).length;
guard(homCount === 2, "örnekte iki homojen karışım olmalı");

/* Örnek 2: dersin boyut modeli (çözelti < 1 nm, kolloid 1–1000 nm, büyük > 1000 nm). */
export const sizeBandsNm224 = { solutionBelow: q(1), colloidUpTo: q(1000) } as const;
export const sizeBand224 = (nm: Q224): Scale224 => (lt(nm, sizeBandsNm224.solutionBelow) ? "moleküler" : lt(sizeBandsNm224.colloidUpTo, nm) ? "büyük" : "kolloid");
export const sizedSamples224 = [
  { label: "X", nm: q(1, 2), dPhase: "katı" as const },
  { label: "Y", nm: q(200), dPhase: "katı" as const },
  { label: "Z", nm: q(5000), dPhase: "katı" as const },
];
const sized = sizedSamples224.map((s) => ({ ...s, kind: classify224({ dPhase: s.dPhase, mPhase: "sıvı", scale: sizeBand224(s.nm) }) }));
const uniformButNot = sized.filter((s) => s.kind === "kolloid");
guard(sized.map((s) => s.kind).join() === "çözelti,kolloid,süspansiyon" && uniformButNot.length === 1, "boyut örneği üç sınıfı ayırmalı");

export const mixExamples224: WorkedExample[] = [
  {
    title: "Adsız dört karışımı fazlarla sınıflandır",
    prompt: `Dört karışım yalnızca tarifleriyle veriliyor. ${sampleKinds.map((s) => `${s.label}: ${s.text}.`).join(" ")} Her birinin sınıfı nedir ve kaçı homojendir?`,
    strategy: "Önce taneciğin moleküler ölçekte dağılıp dağılmadığına bak; dağılmamışsa dağılanın ve dağıtıcının fazından adı bul.",
    steps: [
      { label: "Moleküler dağılım", expression: `${sampleKinds.filter((s) => s.kind === "çözelti").map((s) => s.label).join(" ve ")} → çözelti`, explanation: "Gazlar moleküler düzeyde karışır; alaşımda atomlar düzgün dağılır. Dağıtıcı katı olsa da karışım çözeltidir." },
      { label: "Sıvıda katı", expression: `${sampleKinds[1].label} → ${sampleKinds[1].kind}`, explanation: "Gözle görülen ve dibe çöken katı taneler süspansiyon belirtisidir." },
      { label: "Gazda sıvı", expression: `${sampleKinds[2].label} → ${sampleKinds[2].kind}`, explanation: "Dağıtıcı gaz, dağılan sıvı damlacık olduğundan aerosoldür; sis buna örnektir." },
      { label: "Homojen sayısı", expression: `${homCount} homojen, ${sampleKinds.length - homCount} heterojen`, explanation: "Yalnız çözeltiler homojendir." },
    ],
    answer: `${sampleKinds.map((s) => `${s.label} ${s.kind}`).join(", ")}; ${homCount} tanesi homojen.`,
    check: `Homojen olanlardan ${sampleKinds.filter((s) => isHomogeneous224(s.kind)).map((s) => `${s.label} için dağıtıcı ${s.mPhase}`).join(", ")}; çözeltinin sıvı olma zorunluluğu yoktur.`,
    pitfall: "Katı alaşımı çözelti saymamak ya da gaz-gaz karışımını heterojen sanmak.",
  },
  {
    title: "Tekdüze görünen sıvıyı tanecik boyutuyla ayır",
    prompt: `Dersin öğretim modelinde dağılan tanecik ${d(sizeBandsNm224.solutionBelow)} nm’den küçükse çözelti, ${d(sizeBandsNm224.solutionBelow)}–${d(sizeBandsNm224.colloidUpTo)} nm arasında kolloid, ${d(sizeBandsNm224.colloidUpTo)} nm’den büyükse büyük tanecikli dağılım kabul ediliyor. Üç kapta suya bir katı dağılmış; dağılan taneciklerin yaklaşık boyutu ${sized.map((s) => `${s.label}’de ${d(s.nm)} nm`).join(", ")}. X ve Y çıplak gözle tekdüze görünüyor. Her kabın sınıfı nedir ve hangisi tekdüze göründüğü hâlde çözelti değildir?`,
    strategy: "Her boyutu modeldeki aralıkla karşılaştır; görünüş değil tanecik boyutu karar verir.",
    steps: [
      { label: "X", expression: `${d(sized[0].nm)} nm < ${d(sizeBandsNm224.solutionBelow)} nm`, explanation: "Moleküler ölçek: çözelti, homojen." },
      { label: "Y", expression: `${d(sizeBandsNm224.solutionBelow)} ≤ ${d(sized[1].nm)} ≤ ${d(sizeBandsNm224.colloidUpTo)} nm`, explanation: "Kolloid aralığı: gözle tekdüze görünse de heterojendir." },
      { label: "Z", expression: `${d(sized[2].nm)} nm > ${d(sizeBandsNm224.colloidUpTo)} nm`, explanation: "Sıvı içinde büyük katı tanecikler: süspansiyon." },
    ],
    answer: `X çözelti, Y kolloid, Z süspansiyon; tekdüze görünüp çözelti olmayan ${uniformButNot.map((s) => s.label).join("")}.`,
    check: "Y’nin içinden ışık demeti geçirilirse tanecikler ışığı saçtığı için demetin yolu görülebilir; X’te bu saçılma beklenmez.",
    pitfall: "Gözle tekdüze görünen her sıvıyı çözelti saymak. Aralık sınırları bütün gerçek örneklerde keskin değildir; burada yalnız verilen model kullanılır.",
  },
];

export const mixSupplement224 = {
  title: mixTitle,
  figureTitle: mixTitle,
  paragraphs: mixSection224.paragraphs,
  summary: `Moleküler dağılım → çözelti (homojen; dağıtıcı ${and(solutions.map((r) => r.mPhase))} olabilir). Büyük tanecik: sıvıda katı süspansiyon, sıvıda sıvı emülsiyon, gazda katı/sıvı aerosol. Kolloid boyut sınıfıdır: ${lower(milk.example)} kolloid, ${lower(smoke.example)} hem aerosol hem kolloid boyutta. ${brine.example} ve ${lower(air.example)} çözeltidir.`,
  appendSection: true as const,
  table: mixTable,
  examples: mixExamples224,
};

/* =====================================================================
 * 2 · Çözelti derişimi: dört birim, seyreltme ve karıştırma
 * ===================================================================== */

export type ConcRow224 =
  | { kind: "mass"; solute: string; soluteG: Q224; waterG: Q224 }
  | { kind: "volume"; solute: string; soluteMl: Q224; finalMl: Q224 }
  | { kind: "ppm"; solute: string; soluteMg: Q224; solutionKg: Q224 }
  | { kind: "molar"; formula: string; massG: Q224; finalMl: Q224 }
  | { kind: "dilute"; formula: string; c1: Q224; v1Ml: Q224; v2Ml: Q224 }
  | { kind: "mix"; formula: string; c1: Q224; v1Ml: Q224; c2: Q224; v2Ml: Q224 };

export const concRows224: readonly ConcRow224[] = [
  { kind: "mass", solute: "NaCl", soluteG: q(25), waterG: q(225) },
  { kind: "volume", solute: "etanol", soluteMl: q(40), finalMl: q(200) },
  { kind: "ppm", solute: "Ca²⁺", soluteMg: q(6), solutionKg: q(2) },
  { kind: "molar", formula: "NaOH", massG: q(8), finalMl: q(500) },
  { kind: "molar", formula: "NaCl", massG: q(117, 10), finalMl: q(250) },
  { kind: "molar", formula: "C₆H₁₂O₆", massG: q(9), finalMl: q(100) },
  { kind: "dilute", formula: "NaCl", c1: q(6, 10), v1Ml: q(100), v2Ml: q(300) },
  { kind: "mix", formula: "NaCl", c1: q(3, 10), v1Ml: q(200), c2: q(8, 10), v2Ml: q(300) },
];
const L = (ml: Q224) => div(ml, int(1000));
export const concValue224 = (r: ConcRow224): Q224 => {
  switch (r.kind) {
    case "mass": return mul(div(r.soluteG, add(r.soluteG, r.waterG)), int(100));
    case "volume": return mul(div(r.soluteMl, r.finalMl), int(100));
    case "ppm": return div(r.soluteMg, r.solutionKg);
    case "molar": return div(div(r.massG, molarMass224(r.formula)), L(r.finalMl));
    case "dilute": return div(mul(r.c1, r.v1Ml), r.v2Ml);
    case "mix": return div(add(mul(r.c1, L(r.v1Ml)), mul(r.c2, L(r.v2Ml))), L(add(r.v1Ml, r.v2Ml)));
  }
};
/** Çözünen molü (mol), molar satırlar için; diğerlerinde null. */
export const concMol224 = (r: ConcRow224): Q224 | null => {
  switch (r.kind) {
    case "molar": return div(r.massG, molarMass224(r.formula));
    case "dilute": return mul(r.c1, L(r.v1Ml));
    case "mix": return add(mul(r.c1, L(r.v1Ml)), mul(r.c2, L(r.v2Ml)));
    default: return null;
  }
};
/** Son hacim (mL), molar satırlar için. */
export const concVolume224 = (r: ConcRow224): Q224 | null =>
  r.kind === "molar" ? r.finalMl : r.kind === "dilute" ? r.v2Ml : r.kind === "mix" ? add(r.v1Ml, r.v2Ml) : null;
const M = (c: Q224) => `${d(c)} mol/L`;
export const concTexts224 = (r: ConcRow224) => {
  const val = concValue224(r);
  switch (r.kind) {
    case "mass": return { what: `${d(r.soluteG)} g ${r.solute} + ${d(r.waterG)} g su`, unit: "Kütlece yüzde", work: `${d(r.soluteG)}/(${d(r.soluteG)} + ${d(r.waterG)})·100`, result: `%${d(val)}` };
    case "volume": return { what: `${d(r.soluteMl)} mL ${r.solute}, son hacim ${d(r.finalMl)} mL`, unit: "Hacimce yüzde", work: `${d(r.soluteMl)}/${d(r.finalMl)}·100`, result: `%${d(val)}` };
    case "ppm": return { what: `${d(r.soluteMg)} mg ${r.solute}, ${d(r.solutionKg)} kg sulu örnek`, unit: "ppm (mg/kg)", work: `${d(r.soluteMg)} mg / ${d(r.solutionKg)} kg`, result: `${d(val)} ppm` };
    case "molar": {
      const n = concMol224(r)!;
      return { what: `${d(r.massG)} g ${r.formula}, son hacim ${d(r.finalMl)} mL`, unit: "Molarite", work: `n = ${d(r.massG)}/${d(molarMass224(r.formula))} = ${d(n)} mol; ${d(n)}/${d(L(r.finalMl))} L`, result: M(val) };
    }
    case "dilute": return { what: `${d(r.v1Ml)} mL ${M(r.c1)} ${r.formula}, su ile ${d(r.v2Ml)} mL’ye`, unit: "Seyreltme", work: `${d(r.c1)}·${d(r.v1Ml)} = M₂·${d(r.v2Ml)}`, result: M(val) };
    case "mix": return { what: `${d(r.v1Ml)} mL ${M(r.c1)} + ${d(r.v2Ml)} mL ${M(r.c2)} ${r.formula}`, unit: "Karıştırma", work: `(${d(r.c1)}·${d(L(r.v1Ml))} + ${d(r.c2)}·${d(L(r.v2Ml))})/${d(L(add(r.v1Ml, r.v2Ml)))}`, result: M(val) };
  }
};
const concRows = concRows224.map((r) => ({ row: r, value: concValue224(r), mol: concMol224(r), ...concTexts224(r) }));
const concTable = {
  layout: "table" as const,
  headers: ["Çözelti", "Derişim türü", "Hesap", "Sonuç"],
  rows: concRows.map((r) => [r.what, r.unit, r.work, r.result]),
};
const diluteRow = concRows224.find((r): r is Extract<ConcRow224, { kind: "dilute" }> => r.kind === "dilute")!;
const mixRowC = concRows224.find((r): r is Extract<ConcRow224, { kind: "mix" }> => r.kind === "mix")!;
const naohRow = concRows224.find((r): r is Extract<ConcRow224, { kind: "molar" }> => r.kind === "molar" && r.formula === "NaOH")!;
const massRow = concRows224.find((r): r is Extract<ConcRow224, { kind: "mass" }> => r.kind === "mass")!;
const ppmRow = concRows224.find((r): r is Extract<ConcRow224, { kind: "ppm" }> => r.kind === "ppm")!;
const diluteC2 = concValue224(diluteRow);
const mixC = concValue224(mixRowC);
const plainAvg = div(add(mixRowC.c1, mixRowC.c2), int(2));
guard(eq(mul(diluteRow.c1, diluteRow.v1Ml), mul(diluteC2, diluteRow.v2Ml)), "seyreltmede M₁V₁ = M₂V₂ olmalı");
guard(lt(diluteC2, diluteRow.c1), "seyreltme derişimi azaltmalı");
guard(lt(mixRowC.c1, mixC) && lt(mixC, mixRowC.c2), "karışım derişimi iki derişim arasında olmalı");
guard(!eq(mixC, plainAvg) && !eq(mixRowC.v1Ml, mixRowC.v2Ml), "eşit olmayan hacimlerde düz ortalama yanlış olmalı");
guard(eq(concMol224(mixRowC)!, mul(mixC, L(add(mixRowC.v1Ml, mixRowC.v2Ml)))), "karışımda mol korunmalı");
guard(eq(molarMass224("NaOH"), q(40)) && eq(molarMass224("NaCl"), q(117, 2)) && eq(molarMass224("C₆H₁₂O₆"), q(180)), "mol kütleleri ders kitabı değerleri olmalı");

const concTitle = "Derişimi dört birimle yaz, seyreltip karıştır";
export const concSection224: GuideSection = {
  title: concTitle,
  figureTitle: concTitle,
  paragraphs: [
    `Her derişim birimi bir pay ve bir paydadır; birimi seçmek paydayı seçmektir. Kütlece yüzdede payda çözelti kütlesi, hacimce yüzdede son çözelti hacmi, ppm’de çözelti kütlesi (1 mg/kg = 1 ppm), molaritede litre cinsinden son çözelti hacmidir. Tabloda ${d(massRow.soluteG)} g ${massRow.solute} ${d(massRow.waterG)} g suda çözülünce payda ${d(add(massRow.soluteG, massRow.waterG))} g olur ve %${d(concValue224(massRow))} çıkar; ${d(ppmRow.soluteMg)} mg ${ppmRow.solute} ${d(ppmRow.solutionKg)} kg örnekte ${d(concValue224(ppmRow))} ppm’dir.`,
    `Molarite M = n/V ile bulunur: önce kütleyi mol kütlesine bölüp mol, sonra mL’yi litreye çevirip derişim hesaplanır. ${d(naohRow.massG)} g NaOH (M = ${massText("NaOH")} g/mol) ${d(concMol224(naohRow)!)} mol eder; ${d(naohRow.finalMl)} mL = ${d(L(naohRow.finalMl))} L çözeltide ${M(concValue224(naohRow))} olur. Atom kütleleri: Na = ${d(atomicMass224.Na)}, O = ${d(atomicMass224.O)}, H = ${d(atomicMass224.H)}, Cl = ${d(atomicMass224.Cl)}, C = ${d(atomicMass224.C)} g/mol.`,
    `Saf su eklemek çözünen molünü değiştirmez: M₁V₁ = M₂V₂. ${d(diluteRow.v1Ml)} mL ${M(diluteRow.c1)} ${diluteRow.formula} ${d(diluteRow.v2Ml)} mL’ye seyreltilince ${M(diluteC2)} olur. Aynı çözünenin iki çözeltisi karıştırılırken mol sayıları toplanır ve toplam hacme bölünür; tabloda hacimlerin toplandığı kabul edilir. ${d(mixRowC.v1Ml)} mL ${M(mixRowC.c1)} ile ${d(mixRowC.v2Ml)} mL ${M(mixRowC.c2)} karışımı ${M(mixC)} olur. Hacimler eşit olmadığından düz ortalama ${d(plainAvg)} yanlıştır; sonuç iki derişim arasında, hacmi büyük olana yakındır.`,
  ],
  table: concTable,
};

/* Örnek 1: istenen derişime seyreltme. */
export const dilution224 = { formula: "NaOH", c1: q(2), v1Ml: q(50), c2: q(1, 2) } as const;
const dilV2 = div(mul(dilution224.c1, dilution224.v1Ml), dilution224.c2);
const dilWater = subQ(dilV2, dilution224.v1Ml);
const dilMol = mul(dilution224.c1, L(dilution224.v1Ml));
const dilMass = mul(dilMol, molarMass224(dilution224.formula));
guard(eq(mul(dilution224.c2, L(dilV2)), dilMol), "seyreltme örneğinde mol korunmalı");
/* Örnek 2: hedef derişim için iki çözeltinin hacimleri. */
export const blend224 = { formula: "NaCl", low: q(2, 10), high: q(6, 10), totalMl: q(500), target: q(36, 100) } as const;
const blendLowMl = div(mul(blend224.totalMl, subQ(blend224.high, blend224.target)), subQ(blend224.high, blend224.low));
const blendHighMl = subQ(blend224.totalMl, blendLowMl);
const blendMol = add(mul(blend224.low, L(blendLowMl)), mul(blend224.high, L(blendHighMl)));
guard(eq(blendMol, mul(blend224.target, L(blend224.totalMl))), "karışım örneği hedef derişimi vermeli");
guard(lt(blend224.low, blend224.target) && lt(blend224.target, blend224.high), "hedef iki derişim arasında olmalı");

export const concExamples224: WorkedExample[] = [
  {
    title: "İstenen molariteye kadar seyrelt",
    prompt: `Elimizde ${d(dilution224.v1Ml)} mL ${M(dilution224.c1)} ${dilution224.formula} çözeltisi var. Saf suyla seyreltilip ${M(dilution224.c2)} çözelti hazırlanacak; çözünen kaybolmuyor, tepkime olmuyor ve hacim son çözelti hacmine tamamlanıyor. Son hacim kaç mL olur, yaklaşık kaç mL su eklenir ve çözeltide kaç g ${dilution224.formula} vardır? (Na = ${d(atomicMass224.Na)}, O = ${d(atomicMass224.O)}, H = ${d(atomicMass224.H)} g/mol)`,
    strategy: "Seyreltmede çözünen molü sabittir; M₁V₁ = M₂V₂ eşitliğinden son hacmi bul, sonra eklenen suyu çıkar.",
    steps: [
      { label: "Mol", expression: `n = ${d(dilution224.c1)}·${d(L(dilution224.v1Ml))} = ${d(dilMol)} mol`, explanation: "Derişimi litre cinsinden hacimle çarp." },
      { label: "Son hacim", expression: `${d(dilution224.c1)}·${d(dilution224.v1Ml)} = ${d(dilution224.c2)}·V₂ ⇒ V₂ = ${d(dilV2)} mL`, explanation: "İki tarafta da aynı hacim birimi kullanıldığı için mL ile çalışılabilir." },
      { label: "Su", expression: `${d(dilV2)} − ${d(dilution224.v1Ml)} = ${d(dilWater)} mL`, explanation: "Hacimlerin toplandığı kabul edilir; laboratuvarda balon jojede çizgiye tamamlanır." },
      { label: "Kütle", expression: `${d(dilMol)}·${d(molarMass224(dilution224.formula))} = ${d(dilMass)} g`, explanation: "Seyreltme kütleyi değiştirmez." },
    ],
    answer: `Son hacim ${d(dilV2)} mL; yaklaşık ${d(dilWater)} mL su eklenir; çözeltide ${d(dilMass)} g ${dilution224.formula} vardır.`,
    check: `${d(dilMol)} mol / ${d(L(dilV2))} L = ${M(dilution224.c2)}.`,
    pitfall: `Son hacmi eklenecek su sanıp ${d(dilV2)} mL su eklemek.`,
  },
  {
    title: "Hedef derişim için iki çözeltiyi oranla",
    prompt: `${M(blend224.low)} ve ${M(blend224.high)} iki ${blend224.formula} çözeltisi karıştırılarak toplam ${d(blend224.totalMl)} mL ${M(blend224.target)} çözelti hazırlanacak. Hacimlerin toplandığı ve tepkime olmadığı kabul ediliyor. Her çözeltiden kaç mL alınmalıdır?`,
    strategy: "Seyreltik çözeltiden x mL al; iki çözeltinin mol toplamını hedef çözeltinin molüne eşitle.",
    steps: [
      { label: "Hedef mol", expression: `${d(blend224.target)}·${d(L(blend224.totalMl))} = ${d(blendMol)} mol`, explanation: "Karışımdaki toplam çözünen." },
      { label: "Denklem", expression: `${d(blend224.low)}·x + ${d(blend224.high)}·(${d(blend224.totalMl)} − x) = ${d(blend224.target)}·${d(blend224.totalMl)}`, explanation: "x mL cinsindendir; iki taraf da milimol verir." },
      { label: "Çözüm", expression: `x = ${d(blend224.totalMl)}·(${d(blend224.high)} − ${d(blend224.target)})/(${d(blend224.high)} − ${d(blend224.low)}) = ${d(blendLowMl)} mL`, explanation: `Derişik çözeltiden ${d(blendHighMl)} mL kalır.` },
    ],
    answer: `${d(blendLowMl)} mL ${M(blend224.low)} ve ${d(blendHighMl)} mL ${M(blend224.high)} çözelti.`,
    check: `${d(blend224.low)}·${d(L(blendLowMl))} + ${d(blend224.high)}·${d(L(blendHighMl))} = ${d(blendMol)} mol; ${d(blendMol)}/${d(L(blend224.totalMl))} = ${M(blend224.target)}.`,
    pitfall: "Hedef iki derişimin tam ortasında değilken iki çözeltiden eşit hacim almak.",
  },
];

export const concSupplement224 = {
  title: concTitle,
  figureTitle: concTitle,
  paragraphs: concSection224.paragraphs,
  summary: `Kütlece % = çözünen/çözelti·100; hacimce % = çözünen hacmi/son hacim·100; ppm = mg/kg; M = n/V(L). Seyreltme: M₁V₁ = M₂V₂ (${d(diluteRow.c1)}·${d(diluteRow.v1Ml)} = ${d(diluteC2)}·${d(diluteRow.v2Ml)}). Karıştırma: molleri topla, toplam hacme böl; ${d(mixRowC.v1Ml)} mL ${M(mixRowC.c1)} + ${d(mixRowC.v2Ml)} mL ${M(mixRowC.c2)} → ${M(mixC)}, düz ortalama ${d(plainAvg)} değil.`,
  appendSection: true as const,
  table: concTable,
  examples: concExamples224,
};

/* =====================================================================
 * 3 · Ayırma yöntemleri ve koligatif tanecik sayısı
 * ===================================================================== */

export type SepBasis224 = "tanecik boyutu" | "manyetik özellik" | "yoğunluk" | "uçuculuk" | "çözünürlük";
export interface Separation224 {
  method: string;
  basis: SepBasis224;
  difference: string;
  example: string;
  /** Kısa adlar: ayrılan ve kalan bileşen (çizim). */
  parts: readonly [string, string];
  separated: string;
  remaining: string;
  /** Yöntem kimyasal değişim gerektiriyor mu? Ayırma yöntemlerinde hayır. */
  chemicalChange: false;
}
export const separations224: readonly Separation224[] = [
  { method: "Eleme", basis: "tanecik boyutu", difference: "Tanecik boyutu", example: "kum ve çakıl", parts: ["çakıl", "kum"], separated: "çakıl elekte kalır", remaining: "kum elekten geçer", chemicalChange: false },
  { method: "Süzme", basis: "tanecik boyutu", difference: "Çözünmeyen katının boyutu", example: "kumlu su", parts: ["kum", "su"], separated: "kum filtre kâğıdında kalır", remaining: "su süzüntüye geçer", chemicalChange: false },
  { method: "Mıknatısla ayırma", basis: "manyetik özellik", difference: "Mıknatısa çekilme", example: "demir tozu ve kükürt tozu", parts: ["demir", "kükürt"], separated: "demir mıknatısa çekilir", remaining: "kükürt kapta kalır", chemicalChange: false },
  { method: "Ayırma hunisi", basis: "yoğunluk", difference: "Karışmama ve yoğunluk farkı", example: "zeytinyağı ve su", parts: ["su", "yağ"], separated: "yoğunluğu büyük su alttan alınır", remaining: "yağ üst fazda kalır", chemicalChange: false },
  { method: "Basit damıtma", basis: "uçuculuk", difference: "Uçuculuk farkı", example: "tuzlu su", parts: ["su", "tuz"], separated: "su buharlaşıp yoğuşur, ayrı kapta toplanır", remaining: "tuz ilk kapta kalır", chemicalChange: false },
  { method: "Ayrımsal damıtma", basis: "uçuculuk", difference: "Kaynama noktası farkı", example: "ham petrol", parts: ["uçucu", "az uçucu"], separated: "uçucu bileşenler kolonda daha yukarıda yoğuşur", remaining: "kaynama noktası yüksek olanlar altta kalır", chemicalChange: false },
  { method: "Ayrımsal kristallendirme", basis: "çözünürlük", difference: "Çözünürlüğün sıcaklıkla farklı değişmesi", example: "KNO₃ ve NaCl", parts: ["KNO₃", "NaCl"], separated: "soğutunca çoğunlukla KNO₃ kristallenir", remaining: "NaCl’nin çoğu çözeltide kalır", chemicalChange: false },
  { method: "Özütleme", basis: "çözünürlük", difference: "Seçici çözünme", example: "çay yaprağı ve sıcak su", parts: ["çözünenler", "posa"], separated: "suda çözünen bileşenler suya geçer", remaining: "posa geride kalır", chemicalChange: false },
];
const sepRow = (method: string) => { const r = separations224.find((s) => s.method === method); guard(Boolean(r), `${method} tabloda olmalı`); return r!; };
const sepBases = [...new Set(separations224.map((s) => s.basis))];
guard(sepBases.length === 5 && ["tanecik boyutu", "yoğunluk", "uçuculuk", "çözünürlük"].every((b) => sepBases.includes(b as SepBasis224)), "tablo dersin saydığı farkları kapsamalı");
guard(separations224.every((s) => s.chemicalChange === false), "ayırma yöntemleri kimyasal değişim gerektirmez");
const funnel = sepRow("Ayırma hunisi");
const simpleDist = sepRow("Basit damıtma");
const fracCryst = sepRow("Ayrımsal kristallendirme");
const filtration = sepRow("Süzme");
const magnet = sepRow("Mıknatısla ayırma");
guard(funnel.parts[0] === "su" && simpleDist.parts.join() === "su,tuz", "huni ve damıtma satırları paragrafla uyuşmalı");

const sepTitle = "Ayırma yöntemini kullandığı özellik farkına bağla";
const sepTable = {
  layout: "table" as const,
  headers: ["Yöntem", "Yararlanılan fark", "Örnek karışım", "Ayrılan · kalan"],
  rows: separations224.map((s) => [s.method, s.difference, cap(s.example), `${cap(s.separated)} · ${s.remaining}`]),
};
const methodsWith = (b: SepBasis224) => and(separations224.filter((s) => s.basis === b).map((s) => lower(s.method)));

export const sepSection224: GuideSection = {
  title: sepTitle,
  figureTitle: sepTitle,
  paragraphs: [
    `Her ayırma yöntemi bileşenler arasındaki bir fiziksel özellik farkını kullanır; yöntemin adını ezberlemek yerine hangi farkın işe yaradığını söyle. ${cap(methodsWith("tanecik boyutu"))} tanecik boyutuna, ${methodsWith("manyetik özellik")} manyetik özelliğe, ${methodsWith("yoğunluk")} karışmayan sıvıların yoğunluk farkına dayanır. ${cap(magnet.example)} karışımında ${magnet.separated}; yeni madde oluşmaz.`,
    `${cap(methodsWith("uçuculuk"))} uçuculuk farkını kullanır. ${cap(simpleDist.example)} damıtılınca ${simpleDist.separated}, ${simpleDist.remaining}. Ayrımsal damıtma, ${sepRow("Ayrımsal damıtma").example} gibi karışan sıvılarda tekrarlanan buharlaşma ve yoğuşmayla kaynama noktası farkından yararlanır.`,
    `${cap(methodsWith("çözünürlük"))} çözünürlük farkına dayanır. ${fracCryst.example} karışımında ${fracCryst.separated}, çünkü KNO₃’ün çözünürlüğü sıcaklıkla belirgin değişirken NaCl’ninki az değişir. Tablodaki hiçbir yöntem kimyasal değişim gerektirmez; ${lower(filtration.method)} çözünmüş tuzu sudan ayırmaz.`,
  ],
  table: sepTable,
};

/*
 * Koligatif örnekler, dersin kendi verdiği ideal seyreltik modelle: su için
 * Kf = 1,86 ve Kb = 0,52 °C·kg/mol, ΔT = K·i·m; tam ayrışma varsayımı.
 * Formül başına tanecik: şeker 1, NaCl 2 (Na⁺ + Cl⁻), CaCl₂ 3 (Ca²⁺ + 2Cl⁻).
 */
export const waterK224 = { kf: q(186, 100), kb: q(52, 100) } as const;
export const particlesPerUnit224: Record<string, number> = { "C₁₂H₂₂O₁₁": 1, "C₆H₁₂O₆": 1, NaCl: 2, "CaCl₂": 3 };
guard(particlesPerUnit224.NaCl === 1 + 1 && particlesPerUnit224["CaCl₂"] === 1 + 2, "iyonik bileşikte tanecik = katyon + anyon sayısı");
export interface ColligSolute224 { formula: string; name: string; massG: Q224; waterKg: Q224 }
export const colligRow224 = (s: ColligSolute224) => {
  const n = div(s.massG, molarMass224(s.formula));
  const i = particlesPerUnit224[s.formula];
  guard(Boolean(i), `${s.formula} için tanecik sayısı verilmeli`);
  const particles = mul(n, int(i));
  const molal = div(particles, s.waterKg);
  return { ...s, n, i, particles, molal, dTf: mul(waterK224.kf, molal), dTb: mul(waterK224.kb, molal) };
};
export const colligEqualSet224: readonly ColligSolute224[] = [
  { formula: "C₁₂H₂₂O₁₁", name: "şeker (sakkaroz)", massG: q(342, 10), waterKg: q(1) },
  { formula: "NaCl", name: "NaCl", massG: q(117, 10), waterKg: q(1) },
  { formula: "CaCl₂", name: "CaCl₂", massG: q(111, 10), waterKg: q(1) },
];
const ceq = colligEqualSet224.map(colligRow224);
const byFreeze = [...ceq].sort((a, b) => toNumber224(b.dTf) - toNumber224(a.dTf));
guard(byFreeze[0].formula === "NaCl", "en düşük donma noktası NaCl’de olmalı");
guard(lt(ceq[2].particles, ceq[1].particles) && ceq[2].i > ceq[1].i, "formül başına çok tanecik, daha çok toplam tanecik demek değil");
export const colligSameEffect224: readonly ColligSolute224[] = [
  { formula: "CaCl₂", name: "CaCl₂", massG: q(222, 10), waterKg: q(2) },
  { formula: "NaCl", name: "NaCl", massG: q(8775, 1000), waterKg: q(1) },
  { formula: "C₆H₁₂O₆", name: "glikoz", massG: q(54), waterKg: q(1) },
];
const cse = colligSameEffect224.map(colligRow224);
guard(cse.every((r) => eq(r.molal, cse[0].molal)), "üç çözeltide çözücü başına tanecik eşit olmalı");
guard(!eq(cse[0].particles, cse[1].particles), "toplam tanecik farklı, çözücü başına tanecik eşit olmalı");
const tbWater = q(100);
const colligAnswerFreeze = byFreeze.map((r) => `${r.name} ${d(subQ(int(0), r.dTf))} °C`).join(" < ");

export const sepExamples224: WorkedExample[] = [
  {
    title: "Formül başına tanecik ile mol sayısını birlikte kullan",
    prompt: `Üç ayrı kapta 1 kg suya ${ceq.map((r) => `${d(r.massG)} g ${r.name}`).join(", ")} tamamen çözülüyor. Atom kütleleri: H = ${d(atomicMass224.H)}, C = ${d(atomicMass224.C)}, O = ${d(atomicMass224.O)}, Na = ${d(atomicMass224.Na)}, Cl = ${d(atomicMass224.Cl)}, Ca = ${d(atomicMass224.Ca)} g/mol. Şeker molekül olarak kalır; iyonik bileşikler tamamen iyonlarına ayrılır. İdeal seyreltik modelde ΔTf = Kf·i·m; Kf = ${d(waterK224.kf)} °C·kg/mol, m çözünenin mol/kg su derişimi, i formül başına çözünmüş tanecik sayısıdır. Donma noktalarını küçükten büyüğe sırala.`,
    strategy: "Önce her maddenin molünü, sonra formül başına tanecik sayısıyla toplam tanecik molünü bul; donma alçalması tanecik molüyle orantılıdır.",
    steps: ceq.map((r) => ({
      label: r.name,
      expression: `n = ${d(r.massG)}/${d(molarMass224(r.formula))} = ${d(r.n)} mol, i = ${r.i}; ΔTf = ${d(waterK224.kf)}·${r.i}·${d(div(r.n, r.waterKg))} = ${d(r.dTf)} °C`,
      explanation: r.i === 1 ? "Molekül olarak kaldığı için formül başına 1 tanecik." : `Formül başına ${r.i} iyon.`,
    })),
    answer: `${colligAnswerFreeze}; en düşük donma noktası NaCl çözeltisindedir.`,
    check: `CaCl₂ formül başına ${particlesPerUnit224["CaCl₂"]} iyon verse de ${d(ceq[2].n)} mol olduğundan ${d(ceq[2].particles)} mol tanecik verir; NaCl ${d(ceq[1].n)} mol ile ${d(ceq[1].particles)} mol tanecik verir.`,
    pitfall: "Yalnız formül başına iyon sayısına bakıp CaCl₂ çözeltisinin en düşük sıcaklıkta donacağını söylemek.",
  },
  {
    title: "Farklı su miktarında aynı kaynama noktası",
    prompt: `1 atm dış basınçta saf su ${d(tbWater)} °C’de kaynıyor. ${cse.map((r) => `${d(r.massG)} g ${r.name} ${d(r.waterKg)} kg suda`).join("; ")} tamamen çözülüyor. Glikoz molekül olarak kalır, iyonik bileşikler tamamen ayrışır; ideal seyreltik modelde ΔTb = Kb·i·m; Kb = ${d(waterK224.kb)} °C·kg/mol, m çözünenin mol/kg su derişimi, i formül başına çözünmüş tanecik sayısıdır. Atom kütleleri: H = ${d(atomicMass224.H)}, C = ${d(atomicMass224.C)}, O = ${d(atomicMass224.O)}, Na = ${d(atomicMass224.Na)}, Cl = ${d(atomicMass224.Cl)}, Ca = ${d(atomicMass224.Ca)} g/mol. Çözeltilerin kaynamaya başlama sıcaklıklarını karşılaştır.`,
    strategy: "Toplam tanecik molünü değil, kilogram su başına tanecik molünü karşılaştır.",
    steps: cse.map((r) => ({
      label: r.name,
      expression: `i·m = ${r.i}·(${d(r.n)}/${d(r.waterKg)}) = ${d(r.molal)} mol tanecik/kg su`,
      explanation: r.waterKg.n > 1 ? "Tanecik çok ama su da iki kat; oran aynı kalır." : "Çözücü 1 kg.",
    })),
    answer: `Üçü de ${d(add(tbWater, cse[0].dTb))} °C’de kaynamaya başlar (ΔTb = ${d(waterK224.kb)}·${d(cse[0].molal)} = ${d(cse[0].dTb)} °C).`,
    check: `CaCl₂ kabında ${d(cse[0].particles)} mol, NaCl kabında ${d(cse[1].particles)} mol tanecik vardır; su başına oranları eşittir.`,
    pitfall: "Toplam tanecik molü büyük olan CaCl₂ çözeltisinin daha yüksek sıcaklıkta kaynayacağını sanmak.",
  },
];

export const sepSupplement224 = {
  title: sepTitle,
  figureTitle: sepTitle,
  paragraphs: sepSection224.paragraphs,
  summary: `Boyut: ${methodsWith("tanecik boyutu")}. Manyetik: ${methodsWith("manyetik özellik")}. Yoğunluk (karışmayan sıvılar): ${methodsWith("yoğunluk")}. Uçuculuk: ${methodsWith("uçuculuk")}. Çözünürlük: ${methodsWith("çözünürlük")}. Ayırma kimyasal değişim değildir. Koligatif: formül başına tanecik şeker 1, NaCl 2, CaCl₂ 3; karşılaştırmada kg su başına tanecik molü kullanılır.`,
  appendSection: true as const,
  table: sepTable,
  examples: sepExamples224,
};

/* =====================================================================
 * 4 · Suyun ölçülen özellikleri ve canlılık
 * ===================================================================== */

/*
 * Suyun ölçülmüş değerleri (yuvarlanmış). Kaynak: CRC Handbook of Chemistry
 * and Physics. Sıvı suyun özgül ısısı 4,1813 J/(g·K), 25 °C → 4,18 J/(g·°C)
 * (MEB: 1 cal/(g·°C) = 4,18 J); erime ısısı ΔHerime 6,01 kJ/mol ÷ 18,015 g/mol
 * = 333,6 J/g → 334 J/g; buharlaşma ısısı 100 °C’de 40,65 kJ/mol ÷ 18,015
 * g/mol = 2256 J/g; buzun yoğunluğu 0 °C’de 0,9167 g/cm³ → 0,917; sıvı suyun
 * 0–4 °C yoğunluğu 0,9998–0,99997 g/cm³ → 1,000; en büyük yoğunluk 3,98 °C.
 */
export const water224 = {
  specificHeat: q(418, 100), // J/(g·°C)
  fusion: q(334), // J/g, 0 °C
  vaporization: q(2256), // J/g, 100 °C
  iceDensity: q(917, 1000), // g/cm³, 0 °C
  waterDensity: q(1), // g/cm³, 0–4 °C, üç basamak
  maxDensityC: q(398, 100), // °C
} as const;
const W = water224;
const heatOneKg = mul(int(1000), W.specificHeat); // 1 kg, 1 °C
const heat1g100 = mul(W.specificHeat, int(100)); // 1 g, 0→100 °C
const fusionKg = div(mul(W.fusion, int(1000)), int(1000)); // kJ/kg sayısal olarak J/g ile aynı
const vap10 = mul(W.vaporization, int(10));
const submerged = div(W.iceDensity, W.waterDensity);
guard(lt(W.iceDensity, W.waterDensity), "buz sudan az yoğun olmalı ve yüzmeli");
guard(lt(heat1g100, W.vaporization) && lt(mul(heat1g100, int(5)), W.vaporization), "buharlaşma, aynı suyu 0→100 °C ısıtmanın beş katından fazla enerji ister");
guard(lt(W.fusion, W.vaporization), "erime ısısı buharlaşma ısısından küçük olmalı");
guard(lt(int(0), W.maxDensityC) && lt(W.maxDensityC, int(4)) && eq(q(Math.round(toNumber224(W.maxDensityC))), int(4)), "en büyük yoğunluk yaklaşık 4 °C’de olmalı");

const kJ = (j: Q224) => `${d(div(j, int(1000)))} kJ`;
export interface WaterProp224 { property: string; value: string; calc: string; life: string }
export const waterProps224: readonly WaterProp224[] = [
  { property: "Özgül ısı", value: `${d(W.specificHeat)} J/(g·°C)`, calc: `1 kg su 1 °C ısınırken 1000·${d(W.specificHeat)} = ${kJ(heatOneKg)} alır`, life: "Göl, deniz ve vücut sıcaklığı yavaş değişir" },
  { property: "Erime ısısı", value: `${d(W.fusion)} J/g (0 °C)`, calc: `1 kg buz 0 °C’de erirken ${d(fusionKg)} kJ alır; sıcaklık sabit kalır`, life: "Kar ve buz erirken çevreden ısı çeker, donarken aynı ısıyı verir" },
  { property: "Buharlaşma ısısı", value: `${d(W.vaporization)} J/g (100 °C)`, calc: `10 g su buharlaşırken 10·${d(W.vaporization)} = ${kJ(vap10)} alır`, life: "Terin buharlaşması deriden ısı alarak vücudu soğutur" },
  { property: "Buzun yoğunluğu", value: `${d(W.iceDensity)} g/cm³ < ${d(W.waterDensity, 3)} g/cm³`, calc: `Yüzen buzun hacimce ${d(W.iceDensity)}/${d(W.waterDensity, 3)} = %${d(mul(submerged, int(100)))} kadarı suyun altındadır`, life: "Buz yüzeyde kalır; göl üstten donar, altında sıvı su kalır" },
  { property: "En yoğun sıcaklık", value: `${d(W.maxDensityC)} °C`, calc: "4 °C’ye yakın su en yoğundur ve dibe çöker", life: "Kışın donmuş gölün dibinde yaklaşık 4 °C su bulunur" },
  { property: "Polarlık", value: "O ucu kısmen −, H uçları kısmen +", calc: "NaCl ve şeker gibi iyonik ve polar maddeleri çözer; yağ ayrı faz oluşturur", life: "Besinler, iyonlar ve atıklar suyla taşınır" },
];
guard(waterProps224.length <= 8, "tablo en çok sekiz satır olmalı");

const waterTitle = "Suyun ölçülen özellikleri canlılığı nasıl korur";
const waterTable = {
  layout: "table" as const,
  headers: ["Özellik", "Değer", "Hesapla görülen sonuç", "Yaşamdaki karşılığı"],
  rows: waterProps224.map((p) => [p.property, p.value, p.calc, p.life]),
};
export const waterPath224 = [
  { label: "Erime", note: "0 °C buz → 0 °C su", joules: W.fusion },
  { label: "Isınma", note: "0 °C → 100 °C su", joules: heat1g100 },
  { label: "Buharlaşma", note: "100 °C su → 100 °C buhar", joules: W.vaporization },
] as const;
const pathTotal = waterPath224.reduce((s, p) => add(s, p.joules), int(0));

export const waterSection224: GuideSection = {
  title: waterTitle,
  figureTitle: waterTitle,
  paragraphs: [
    `Suyun canlılık için önemli özellikleri ölçülmüş değerlerle karşılaştırılabilir. Bu bölümdeki değerler CRC Handbook of Chemistry and Physics’ten yuvarlanmıştır: özgül ısı ${d(W.specificHeat)} J/(g·°C), erime ısısı ${d(W.fusion)} J/g, 100 °C’de buharlaşma ısısı ${d(W.vaporization)} J/g, 0 °C’de buzun yoğunluğu ${d(W.iceDensity)} g/cm³ ve sıvı suyun yoğunluğu yaklaşık ${d(W.waterDensity, 3)} g/cm³. Isı q = m·c·ΔT ile, hâl değişimi ısısı q = m·L ile hesaplanır.`,
    `1 g buzu 0 °C’den 100 °C buhara götürmek için sırasıyla ${and(waterPath224.map((p) => `${lower(p.label)} ${d(p.joules)} J`))} gerekir; toplam ${d(pathTotal)} J. Buharlaşma (${d(W.vaporization)} J), aynı suyu 0 °C’den 100 °C’ye ısıtmaktan (${d(heat1g100)} J) beş kattan fazla enerji ister. Bu yüzden terin buharlaşması etkili bir soğutmadır. Vücut sıcaklığında buharlaşma ısısı 100 °C değerinden biraz daha büyüktür.`,
    `Buz sudan az yoğun olduğundan yüzer: yüzen buzun hacimce yaklaşık %${d(mul(submerged, int(100)))} kadarı suyun altında kalır. Su en yoğun hâline yaklaşık ${d(W.maxDensityC)} °C’de ulaştığı için kışın göllerin dibinde 4 °C’ye yakın su toplanır ve yüzey buzu alttaki canlıları yalıtır.`,
  ],
  table: waterTable,
};

/* Örnek 1: buzu eritip ısıtmak. */
export const iceWarm224 = { grams: q(50), finalC: q(20) } as const;
const iwMelt = mul(iceWarm224.grams, W.fusion);
const iwHeat = mul(mul(iceWarm224.grams, W.specificHeat), iceWarm224.finalC);
const iwTotal = add(iwMelt, iwHeat);
guard(lt(iwHeat, iwMelt), "erime basamağı ısınmadan büyük olmalı");
/* Örnek 2: yüzen buz kalıbı. */
export const iceBlock224 = { volumeCm3: q(2000) } as const;
const ibMass = mul(iceBlock224.volumeCm3, W.iceDensity);
const ibSub = div(ibMass, W.waterDensity);
const ibAbove = subQ(iceBlock224.volumeCm3, ibSub);
const ibAbovePct = mul(div(ibAbove, iceBlock224.volumeCm3), int(100));
guard(lt(ibSub, iceBlock224.volumeCm3), "buzun bir kısmı suyun üstünde kalmalı");

export const waterExamples224: WorkedExample[] = [
  {
    title: "Buzu eritmek mi, suyu ısıtmak mı daha çok enerji ister",
    prompt: `0 °C’deki ${d(iceWarm224.grams)} g buz önce tamamen eriyip sonra ${d(iceWarm224.finalC)} °C’ye kadar ısınıyor. Çevreye ısı kaybı yok. Erime ısısı ${d(W.fusion)} J/g, sıvı suyun özgül ısısı ${d(W.specificHeat)} J/(g·°C) alınıyor. Toplam kaç J ısı gerekir ve hangi basamak daha çok enerji ister?`,
    strategy: "Hâl değişimi ve sıcaklık artışını ayrı basamaklarda hesapla: erimede q = m·L, ısınmada q = m·c·ΔT.",
    steps: [
      { label: "Erime", expression: `${d(iceWarm224.grams)}·${d(W.fusion)} = ${d(iwMelt)} J`, explanation: "Erime boyunca sıcaklık 0 °C’de sabit kalır." },
      { label: "Isınma", expression: `${d(iceWarm224.grams)}·${d(W.specificHeat)}·${d(iceWarm224.finalC)} = ${d(iwHeat)} J`, explanation: `ΔT = ${d(iceWarm224.finalC)} − 0 = ${d(iceWarm224.finalC)} °C.` },
      { label: "Toplam", expression: `${d(iwMelt)} + ${d(iwHeat)} = ${d(iwTotal)} J`, explanation: "Isı miktarları toplanır." },
    ],
    answer: `${d(iwTotal)} J (${kJ(iwTotal)}); erime basamağı (${d(iwMelt)} J) ısınmadan (${d(iwHeat)} J) daha çok enerji ister.`,
    check: `${d(iceWarm224.grams)}·(${d(W.fusion)} + ${d(W.specificHeat)}·${d(iceWarm224.finalC)}) = ${d(iceWarm224.grams)}·${d(add(W.fusion, mul(W.specificHeat, iceWarm224.finalC)))} = ${d(iwTotal)} J.`,
    pitfall: "Erime ısısını unutup yalnız m·c·ΔT ile 0 °C’den 20 °C’ye ısınmayı hesaplamak.",
  },
  {
    title: "Yüzen buzun ne kadarı suyun üstünde",
    prompt: `${d(iceBlock224.volumeCm3)} cm³ hacimli bir buz kalıbı 0 °C’deki tatlı suda yüzüyor. Buzun yoğunluğu ${d(W.iceDensity)} g/cm³, suyun yoğunluğu ${d(W.waterDensity, 3)} g/cm³ kabul ediliyor. Yüzen cisim kendi kütlesi kadar su taşırır. Buzun kaç cm³’ü suyun altında, kaç cm³’ü üstündedir?`,
    strategy: "Buzun kütlesini bul; bu kütlede suyun hacmi batan hacme eşittir.",
    steps: [
      { label: "Kütle", expression: `${d(iceBlock224.volumeCm3)}·${d(W.iceDensity)} = ${d(ibMass)} g`, explanation: "m = ρ·V." },
      { label: "Batan hacim", expression: `${d(ibMass)}/${d(W.waterDensity, 3)} = ${d(ibSub)} cm³`, explanation: "Taşırılan suyun kütlesi buzun kütlesine eşittir." },
      { label: "Üstte kalan", expression: `${d(iceBlock224.volumeCm3)} − ${d(ibSub)} = ${d(ibAbove)} cm³`, explanation: `Hacmin %${d(ibAbovePct)} kadarı.` },
    ],
    answer: `${d(ibSub)} cm³ suyun altında, ${d(ibAbove)} cm³ (%${d(ibAbovePct)}) suyun üstünde.`,
    check: `Batan oran ${d(ibSub)}/${d(iceBlock224.volumeCm3)} = ${d(submerged)} = buz yoğunluğu/su yoğunluğu.`,
    pitfall: "Buz sudan daha yoğunmuş gibi batacağını söylemek; donunca hacim artar, yoğunluk azalır.",
  },
];

export const waterSupplement224 = {
  title: waterTitle,
  figureTitle: waterTitle,
  paragraphs: waterSection224.paragraphs,
  summary: `c = ${d(W.specificHeat)} J/(g·°C), Lerime = ${d(W.fusion)} J/g, Lbuhar = ${d(W.vaporization)} J/g (100 °C), ρbuz = ${d(W.iceDensity)} < ρsu ≈ ${d(W.waterDensity, 3)} g/cm³ (CRC, yuvarlanmış). 1 g buz → buhar: ${waterPath224.map((p) => d(p.joules)).join(" + ")} = ${d(pathTotal)} J. Buzun %${d(mul(submerged, int(100)))} kadarı batar; en yoğun su ≈ ${d(W.maxDensityC)} °C.`,
  appendSection: true as const,
  table: waterTable,
  examples: waterExamples224,
};

/* =====================================================================
 * 5 · Doğa ve kimya: çevre sorunlarının denkleştirilmiş adımları
 * ===================================================================== */

export interface Reaction224 { left: readonly (readonly [number, string])[]; right: readonly (readonly [number, string])[]; note?: string }
const side = (xs: Reaction224["left"]) => xs.map(([k, f]) => `${k > 1 ? k : ""}${f}`).join(" + ");
export const reactionText224 = (r: Reaction224) => `${side(r.left)} → ${side(r.right)}${r.note ? ` (${r.note})` : ""}`;
export const sideAtoms224 = (xs: Reaction224["left"]) => {
  const out: Record<string, number> = {};
  for (const [k, f] of xs) for (const [el, n] of Object.entries(atoms224(f))) out[el] = (out[el] ?? 0) + k * n;
  return out;
};
export const balanced224 = (r: Reaction224) => {
  const a = sideAtoms224(r.left);
  const b = sideAtoms224(r.right);
  const els = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...els].every((el) => (a[el] ?? 0) === (b[el] ?? 0));
};
const rx = (left: Reaction224["left"], right: Reaction224["right"], note?: string): Reaction224 => ({ left, right, note });

export interface EnvIssue224 { issue: string; species: readonly string[]; source: string; steps: readonly Reaction224[]; effect: string }
export const envIssues224: readonly EnvIssue224[] = [
  { issue: "Sera etkisinin artması", species: ["CO₂", "CH₄"], source: "Fosil yakıt yanması", steps: [rx([[1, "CH₄"], [2, "O₂"]], [[1, "CO₂"], [2, "H₂O"]])], effect: "CO₂ ve CH₄ kızılötesi ışınımı soğurur; derişim artışı iklimi etkiler" },
  { issue: "Asit yağmuru (kükürt)", species: ["SO₂", "SO₃"], source: "Kükürtlü kömür ve yakıt", steps: [rx([[2, "SO₂"], [1, "O₂"]], [[2, "SO₃"]]), rx([[1, "SO₃"], [1, "H₂O"]], [[1, "H₂SO₄"]])], effect: "H₂SO₄ yağışla taşınır; toprak, su, bitki ve yapılar zarar görür" },
  { issue: "Asit yağmuru (azot)", species: ["NO", "NO₂"], source: "Yüksek sıcaklıkta yanma (motorlar)", steps: [rx([[2, "NO"], [1, "O₂"]], [[2, "NO₂"]]), rx([[3, "NO₂"], [1, "H₂O"]], [[2, "HNO₃"], [1, "NO"]])], effect: "HNO₃ yağışın asitliğini artırır" },
  { issue: "Karbon monoksit", species: ["CO"], source: "Eksik yanma (kapalı ortamda soba, motor)", steps: [rx([[2, "C"], [1, "O₂"]], [[2, "CO"]])], effect: "Renksiz, kokusuz CO hemoglobine bağlanıp oksijen taşınmasını engeller" },
  { issue: "Stratosferde ozon incelmesi", species: ["CFC", "Cl", "O₃"], source: "CFC içeren eski soğutucu ve spreyler", steps: [rx([[1, "Cl"], [1, "O₃"]], [[1, "ClO"], [1, "O₂"]]), rx([[1, "ClO"], [1, "O"]], [[1, "Cl"], [1, "O₂"]])], effect: "Cl geri oluşur ve çok sayıda O₃ parçalar; morötesi ışınımı soğuran ozon azalır" },
  { issue: "Yer seviyesinde ozon", species: ["NO₂", "O₃"], source: "Trafik ve güneş ışığı", steps: [rx([[1, "NO₂"]], [[1, "NO"], [1, "O"]], "güneş ışığı"), rx([[1, "O"], [1, "O₂"]], [[1, "O₃"]])], effect: "Yere yakın ozon solunum yollarını tahriş eden bir kirleticidir" },
  { issue: "Ötrofikasyon", species: ["fosfat", "nitrat"], source: "Gübre ve atık su", steps: [rx([[1, "C₆H₁₂O₆"], [6, "O₂"]], [[6, "CO₂"], [6, "H₂O"]], "ölü organik maddenin ayrışması")], effect: "Aşırı alg çoğalır, ayrışma çözünmüş oksijeni tüketir" },
];
const allSteps = envIssues224.flatMap((e) => e.steps);
allSteps.forEach((r) => guard(balanced224(r), `${reactionText224(r)} denk olmalı`));
const envIssue = (prefix: string) => { const r = envIssues224.find((e) => e.issue.startsWith(prefix)); guard(Boolean(r), `${prefix} tabloda olmalı`); return r!; };
const acidRows = envIssues224.filter((e) => e.issue.startsWith("Asit yağmuru"));
guard(acidRows.length === 2 && acidRows.every((e) => !e.species.includes("CO₂")), "asit yağmuru satırları CO₂’ye bağlanmamalı");
const ozoneLoss = envIssue("Stratosferde");
const greenhouse = envIssue("Sera");
guard(ozoneLoss !== greenhouse && !ozoneLoss.species.includes("CO₂"), "ozon incelmesi ile sera etkisi ayrı mekanizmalar olmalı");
const co = envIssue("Karbon");
guard(!co.species.includes("CO₂"), "CO ile CO₂ ayrı türler olmalı");

/** İki ya da daha fazla adımı toplar, iki tarafta görülen türleri sadeleştirir. */
export const netReaction224 = (steps: readonly Reaction224[]) => {
  const count: Record<string, number> = {};
  for (const s of steps) {
    for (const [k, f] of s.left) count[f] = (count[f] ?? 0) - k;
    for (const [k, f] of s.right) count[f] = (count[f] ?? 0) + k;
  }
  const left = Object.entries(count).filter(([, n]) => n < 0).map(([f, n]) => [-n, f] as const);
  const right = Object.entries(count).filter(([, n]) => n > 0).map(([f, n]) => [n, f] as const);
  const cancelled = Object.entries(count).filter(([, n]) => n === 0).map(([f]) => f);
  return { reaction: rx(left, right), cancelled };
};
const ozoneNet = netReaction224(ozoneLoss.steps);
guard(ozoneNet.cancelled.includes("Cl") && ozoneNet.cancelled.includes("ClO") && balanced224(ozoneNet.reaction), "ozon döngüsünde Cl geri oluşmalı");
const ozoneNetText = reactionText224(ozoneNet.reaction);
guard(ozoneNetText === "O₃ + O → 2O₂", "net ozon tepkimesi O₃ + O → 2O₂ olmalı");

const envTitle = "Çevre sorununu türüne ve denkleştirilmiş adımına bağla";
const envTable = {
  layout: "table" as const,
  headers: ["Sorun", "Başlıca türler", "Kaynak örneği", "Kimyasal adım", "Sonuç"],
  rows: envIssues224.map((e) => [e.issue, e.species.join(", "), e.source, e.steps.map(reactionText224).join("; "), e.effect]),
};
const sulfur = envIssue("Asit yağmuru (kükürt)");

export const envSection224: GuideSection = {
  title: envTitle,
  figureTitle: envTitle,
  paragraphs: [
    `Bir çevre sorununu doğru adlandırmak için hangi kimyasal türün, hangi kaynaktan ve hangi tepkimeyle etkili olduğunu birlikte söyle. Tablodaki ${allSteps.length} tepkime adımının her birinde iki taraftaki atom sayıları eşittir. Örneğin kükürtlü yakıttan çıkan SO₂ için ${and(sulfur.steps.map(reactionText224))}; asit yağmurunun asidi bu adımlarla oluşur, CO₂ ile değil.`,
    `Sera etkisinin artması ile stratosferde ozon incelmesi ayrı mekanizmalardır. ${cap(greenhouse.effect)}. Ozon incelmesinde ise CFC’lerden çıkan Cl atomu ${and(ozoneLoss.steps.map(reactionText224))} adımlarıyla döngüye girer. İki adım toplanınca ${ozoneNetText} kalır; Cl harcanmaz, bu yüzden tek bir Cl atomu döngüyü tekrar tekrar sürdürebilir.`,
    `Eksik yanmada ${reactionText224(co.steps[0])} ile oluşan CO, CO₂’den farklı ve zehirli bir gazdır. Yere yakın ozon, stratosferdeki koruyucu ozonla aynı formüle sahip olsa da solunduğu yerde kirleticidir. Ötrofikasyonda aşırı çoğalan algler öldükten sonra ayrışırken çözünmüş oksijen tüketilir.`,
  ],
  table: envTable,
};

/* Örnek 1: kükürtten asit (kütle korunumu). */
export const sulfurFuel224 = { sulfurG: q(64) } as const;
const sMol = div(sulfurFuel224.sulfurG, atomicMass224.S);
const so2Mol = sMol; // S + O₂ → SO₂
const h2so4Mol = so2Mol; // S atomu korunur
const h2so4Mass = mul(h2so4Mol, molarMass224("H₂SO₄"));
const o2Mol = add(sMol, div(so2Mol, int(2))); // SO₂ için 1, SO₃ için ½ O₂
guard(balanced224(rx([[1, "S"], [1, "O₂"]], [[1, "SO₂"]])), "S + O₂ → SO₂ denk olmalı");
guard(eq(molarMass224("H₂SO₄"), q(98)), "H₂SO₄ 98 g/mol olmalı");
const sulfurTotal = rx([[2, "S"], [3, "O₂"], [2, "H₂O"]], [[2, "H₂SO₄"]]);
guard(balanced224(sulfurTotal) && eq(o2Mol, q(3 * sMol.n, 2 * sMol.d)), "toplam kükürt tepkimesi denk olmalı ve O₂/S = 3/2");
/* Örnek 2: ozon döngüsü tekrar sayısı. */
export const ozoneCycles224 = 1000;

export const envExamples224: WorkedExample[] = [
  {
    title: "Kükürt atomunu yakıttan asit yağmuruna izle",
    prompt: `Bir yakıttaki ${d(sulfurFuel224.sulfurG)} g kükürdün tamamı S + O₂ → SO₂ ile yanıyor; oluşan SO₂’nin tamamı ${and(sulfur.steps.map(reactionText224))} adımlarıyla H₂SO₄’e dönüşüyor (bu bir modeldir; gerçekte SO₂’nin tamamı dönüşmez). Atom kütleleri: H = ${d(atomicMass224.H)}, O = ${d(atomicMass224.O)}, S = ${d(atomicMass224.S)} g/mol. Kaç mol SO₂ oluşur, en çok kaç g H₂SO₄ oluşabilir ve toplam kaç mol O₂ harcanır?`,
    strategy: "Kükürt atomu her adımda korunur: 1 mol S → 1 mol SO₂ → 1 mol SO₃ → 1 mol H₂SO₄. O₂’yi her adımın katsayısından topla.",
    steps: [
      { label: "S molü", expression: `${d(sulfurFuel224.sulfurG)}/${d(atomicMass224.S)} = ${d(sMol)} mol S`, explanation: "Kütleyi atom kütlesine böl." },
      { label: "SO₂ ve H₂SO₄", expression: `${d(sMol)} mol S → ${d(so2Mol)} mol SO₂ → ${d(h2so4Mol)} mol H₂SO₄`, explanation: "Her türde bir S atomu vardır." },
      { label: "Kütle", expression: `M(H₂SO₄) = ${massText("H₂SO₄")} g/mol; ${d(h2so4Mol)}·${d(molarMass224("H₂SO₄"))} = ${d(h2so4Mass)} g`, explanation: "Mol kütlesi formüldeki atomların kütleleri toplanarak bulunur." },
      { label: "O₂", expression: `${d(sMol)} + ${d(so2Mol)}/2 = ${d(o2Mol)} mol O₂`, explanation: "Yanmada 1 mol S için 1 mol O₂, 2SO₂ + O₂ → 2SO₃ adımında 2 mol SO₂ için 1 mol O₂." },
    ],
    answer: `${d(so2Mol)} mol SO₂; en çok ${d(h2so4Mass)} g H₂SO₄; ${d(o2Mol)} mol O₂ harcanır.`,
    check: `Toplam: ${reactionText224(sulfurTotal)}; iki tarafta ${Object.entries(sideAtoms224(sulfurTotal.left)).map(([el, n]) => `${n} ${el}`).join(", ")}.`,
    pitfall: "Asit yağmurunu CO₂’nin suda çözünmesine bağlamak ya da 2SO₂ katsayısını mol oranı sanıp 1 mol S’den 2 mol H₂SO₄ çıkarmak.",
  },
  {
    title: "Ozon döngüsünde katalizörü bul",
    prompt: `Stratosferde bir Cl atomu şu iki adımı izliyor: ${and(ozoneLoss.steps.map(reactionText224))}. İki adımı toplayıp net tepkimeyi yaz. Hangi türler net tepkimede görünmez? Cl atomu başka bir tepkimeyle tutulmadan döngü ${ozoneCycles224} kez tekrarlanırsa kaç O₃ molekülü parçalanır?`,
    strategy: "Adımları alt alta topla; iki tarafta eşit sayıda görünen türleri sadeleştir.",
    steps: [
      { label: "Toplam", expression: `${side(ozoneLoss.steps.flatMap((s) => s.left))} → ${side(ozoneLoss.steps.flatMap((s) => s.right))}`, explanation: "İki adımın sol ve sağ tarafları birleştirilir." },
      { label: "Sadeleştir", expression: `${ozoneNet.cancelled.join(" ve ")} iki tarafta da var`, explanation: "Cl başta harcanır, sonda geri oluşur; ClO ara üründür." },
      { label: "Net", expression: ozoneNetText, explanation: `Atomlar denk: iki tarafta ${sideAtoms224(ozoneNet.reaction.left).O} O.` },
      { label: "Tekrar", expression: `${ozoneCycles224}·1 = ${ozoneCycles224} O₃`, explanation: "Her döngü bir O₃ harcar; Cl tükenmez." },
    ],
    answer: `Net ${ozoneNetText}; ${ozoneNet.cancelled.join(" ve ")} net tepkimede görünmez (Cl katalizör, ClO ara ürün); ${ozoneCycles224} döngüde ${ozoneCycles224} O₃ parçalanır.`,
    check: `Net tepkimede sol ${sideAtoms224(ozoneNet.reaction.left).O} O, sağ ${sideAtoms224(ozoneNet.reaction.right).O} O atomu.`,
    pitfall: "Cl’nin her döngüde tükendiğini sanmak ya da ozon incelmesini sera etkisiyle aynı mekanizma saymak.",
  },
];

export const envSupplement224 = {
  title: envTitle,
  figureTitle: envTitle,
  paragraphs: envSection224.paragraphs,
  summary: `Sera: CO₂, CH₄ kızılötesi soğurur. Asit yağmuru: ${sulfur.steps.map(reactionText224).join("; ")}; NO₂ → HNO₃ (CO₂ değil). CO eksik yanma ürünüdür, CO₂ değildir. Ozon incelmesi: Cl döngüsü, net ${ozoneNetText}, Cl katalizör. Yere yakın ozon kirleticidir. Ötrofikasyon: ayrışma O₂ tüketir.`,
  appendSection: true as const,
  table: envTable,
  examples: envExamples224,
};

export const depth224Supplements = {
  "karisim-sinif-cozunme": [mixSupplement224],
  "cozelti-derisimi": [concSupplement224],
  "koligatif-ayirma": [sepSupplement224],
  "su-hayat-cevre": [waterSupplement224],
  "doga-ve-kimya": [envSupplement224],
};
