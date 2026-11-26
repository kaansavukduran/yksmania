import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Fizik optik derinleştirmesi (0.213.0). Kabul edilmiş rehberler
 * değişmez; ışık bilgisi, gölge, düzlem ayna, küresel aynalar ve kırılma
 * derslerine görüntüleme katmanında birer tablo bölümü, ikişer özgün çözümlü
 * örnek ve birer bölüm çizimi eklenir. Tablo hücreleri, paragraflardaki
 * sayılar, Kopya Kâğıdı özetleri ve çizimler aynı formül fonksiyonlarından
 * üretilir. Paragraftaki genel yargılar modül yüklenirken veriyle sınanır;
 * veri yargıyı desteklemezse modül hata verir.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth213: ${claim}`);
};
const near = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) <= eps * Math.max(1, Math.abs(a), Math.abs(b));
const rad = (d: number) => (d * Math.PI) / 180;
const degOf = (r: number) => (r * 180) / Math.PI;

/** Türkçe ondalık virgüllü, gerçek eksi işaretli sayı. */
export const num213 = (x: number, digits = 2) => {
  const r = Number(x.toFixed(digits));
  const s = String(Object.is(r, -0) ? 0 : r).replace(".", ",");
  return s.startsWith("-") ? `−${s.slice(1)}` : s;
};
/** Sabit basamaklı yazım (sinüs sütunu gibi hizalı değerler için). */
export const fixed213 = (x: number, digits: number) => {
  const s = Math.abs(x).toFixed(digits).replace(".", ",");
  return x < 0 && Number(s.replace(",", ".")) !== 0 ? `−${s}` : s;
};

/* ---------- Kesin kesirler (küresel ayna satırları için) ---------- */

export interface Q213 { n: number; d: number }
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export const q213 = (n: number, d = 1): Q213 => {
  guard(d !== 0 && Number.isInteger(n) && Number.isInteger(d), "kesir tam sayılarla kurulmalı");
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
};
const qAdd = (x: Q213, y: Q213) => q213(x.n * y.d + y.n * x.d, x.d * y.d);
const qVal = (x: Q213) => x.n / x.d;
const qEq = (x: Q213, y: Q213) => x.n === y.n && x.d === y.d;
const qText = (x: Q213) => (x.d === 1 ? num213(x.n, 0) : `${num213(x.n, 0)}/${x.d}`);

/* =====================================================================
 * Işık bilgisi: E = I·cos θ / r² tablosu
 * ===================================================================== */

/** İdeal noktasal kaynağın her yöndeki ışık şiddeti (cd). */
export const intensity213 = 36;
/** Eğik sütunda ışının küçük yüzeyin normaliyle yaptığı açı. */
export const tiltAngle213 = 60;
/** Uzaklıklar yarım metrenin katı: r = k/2 m. */
const halfSteps = [1, 2, 3, 4, 6, 8] as const;

export const illuminance213 = (I: number, r: number, theta = 0) => (I * Math.cos(rad(theta))) / (r * r);

export const illuminanceRows213 = () => halfSteps.map((k) => {
  const r = k / 2;
  const E = illuminance213(intensity213, r);
  const Etilt = illuminance213(intensity213, r, tiltAngle213);
  // E(1 m) oranı tam kesir: (1/r²) = 4/k².
  const ratio = q213(4, k * k);
  return { k, r, r2: r * r, E, Etilt, ratio };
});
const lightRows = illuminanceRows213();
const rowAt = (r: number) => lightRows.find((row) => row.r === r)!;
const [l05, l1, l15, l2, l3, l4] = lightRows;
for (const row of lightRows) {
  guard(near(row.E * row.r2, intensity213), "E·r² her satırda I olmalı");
  guard(near(row.Etilt, row.E / 2), "normalle 60° açıda E yarıya inmeli");
  guard(near(row.E / l1.E, qVal(row.ratio)), "oran sütunu 1/r² olmalı");
}
guard(near(rowAt(2).E, rowAt(1).E / 4) && near(rowAt(4).E, rowAt(2).E / 4), "uzaklık iki katına çıkınca E dörtte bire inmeli");
guard(near(rowAt(3).E, rowAt(1).E / 9), "uzaklık üç katına çıkınca E dokuzda bire inmeli");
const lightTable = {
  layout: "table" as const,
  headers: ["r (m)", "r² (m²)", "E, dik geliş (lx)", `E, normalle ${tiltAngle213}° (lx)`, "E / E(1 m)"],
  rows: lightRows.map((row) => [num213(row.r), num213(row.r2, 4), num213(row.E, 3), num213(row.Etilt, 3), qText(row.ratio)]),
};

export const lightSection213: GuideSection = {
  title: "Aynı kaynakta uzaklık ve eğimle aydınlanma tablosu",
  figureTitle: "Aynı kaynakta uzaklık ve eğimle aydınlanma tablosu",
  paragraphs: [
    `Tablodaki kaynak her yöne ${intensity213} cd ışık şiddetiyle ışık veren ideal noktasal kaynaktır. Ortam ışığı soğurmaz ve aydınlatılan yüzey küçüktür. r, kaynakla yüzey arasındaki uzaklıktır. Işın yüzeye dik düşerse E = I/r², ışın yüzeyin normaliyle θ açısı yaparsa E = I·cos θ/r² olur. Her satırda E·r² çarpımı yine ${intensity213} çıkar.`,
    `${num213(l1.r)} m’de dik aydınlanma ${num213(l1.E)} lx’tir. Uzaklık ${num213(l2.r)} m olunca ${num213(l2.E)} lx, ${num213(l3.r)} m olunca ${num213(l3.E)} lx olur. Uzaklık 2 katına çıkınca E dörtte bire, 3 katına çıkınca dokuzda bire iner. Kaynağa ${num213(l05.r)} m’ye yaklaşınca E ${num213(l05.E)} lx’e çıkar. Son sütun aynı oranı E(1 m) = ${num213(l1.E)} lx’e göre kesir olarak verir. Kaynağın ${intensity213} cd şiddeti hiçbir satırda değişmez.`,
    `Dördüncü sütunda ışın yüzeyin normaliyle ${tiltAngle213}° yapar. Bu durumda ışın yüzeyle ${90 - tiltAngle213}° yapar. cos ${tiltAngle213}° = 1/2 olduğu için her uzaklıkta E yarıya iner: ${num213(l15.r)} m’de ${num213(l15.E)} lx yerine ${num213(l15.Etilt)} lx, ${num213(l4.r)} m’de ${num213(l4.E, 3)} lx yerine ${num213(l4.Etilt, 3)} lx. Uzaklık ve eğim birbirinden bağımsız çarpanlardır, iki etkiyi ayrı ayrı uygula.`,
  ],
  table: lightTable,
};

/* Örnek 1: iki kaynak arasında eşit aydınlanma noktası. */
export const twoSources213 = { IK: 36, IL: 9, d: 3 } as const;
export const equalPoint213 = () => {
  const { IK, IL, d } = twoSources213;
  // IK/x² = IL/(d − x)² ⇒ √IK·(d − x) = √IL·x (0 < x < d).
  const x = (Math.sqrt(IK) * d) / (Math.sqrt(IK) + Math.sqrt(IL));
  // Yaygın yanlış: uzaklıkları kare almadan oranlamak IK/x = IL/(d − x).
  const wrong = (IK * d) / (IK + IL);
  return { x, EK: IK / (x * x), EL: IL / ((d - x) * (d - x)), wrong };
};
const eq = equalPoint213();
guard(near(eq.EK, eq.EL) && eq.x > 0 && eq.x < twoSources213.d, "eşit aydınlanma noktası kaynakların arasında olmalı");
/* Örnek 2: masa lambası. */
export const lamp213 = { I: 36, Ebelow: 16, side: 2 } as const;
export const lampSolve213 = () => {
  const { I, Ebelow, side } = lamp213;
  const h = Math.sqrt(I / Ebelow);
  const r = Math.hypot(h, side);
  const cos = h / r;
  return { h, r, cos, E: illuminance213(I, r, degOf(Math.acos(cos))), noCos: I / (r * r) };
};
const lamp = lampSolve213();
guard(near(lamp.h, 1.5) && near(lamp.r, 2.5) && near(lamp.cos, 0.6), "lamba örneği 1,5–2–2,5 üçgeni olmalı");

export const lightExamples213: WorkedExample[] = [
  {
    title: "İki kaynak arasında eşit aydınlanan nokta",
    prompt: `İdeal noktasal K kaynağının ışık şiddeti ${twoSources213.IK} cd, L kaynağınınki ${twoSources213.IL} cd’dir. Kaynaklar aynı doğru üzerinde ve aralarında ${twoSources213.d} m vardır. P noktası K ile L arasında, bu doğru üzerindedir. Her kaynağın P’deki aydınlanmasını o kaynağın ışınına dik küçük bir yüzey için hesapla. İki aydınlanmanın eşit olduğu P noktası K’den kaç m uzaktadır? Bu aydınlanma kaç lx’tir?`,
    strategy: "K’den uzaklığa x de. İki kaynağın E = I/r² ifadesini eşitle ve iki tarafın karekökünü al.",
    steps: [
      { label: "Eşitle", expression: `${twoSources213.IK}/x² = ${twoSources213.IL}/(${twoSources213.d} − x)²`, explanation: `P, L’den ${twoSources213.d} − x uzaklıktadır.` },
      { label: "Karekök", expression: `${Math.sqrt(twoSources213.IK)}/x = ${Math.sqrt(twoSources213.IL)}/(${twoSources213.d} − x)`, explanation: "İki uzaklık da pozitif olduğu için karekök alınabilir." },
      { label: "Çöz", expression: `${Math.sqrt(twoSources213.IK)}(${twoSources213.d} − x) = ${Math.sqrt(twoSources213.IL)}x ⇒ x = ${num213(eq.x)} m`, explanation: `${Math.sqrt(twoSources213.IK) * twoSources213.d} = ${Math.sqrt(twoSources213.IK) + Math.sqrt(twoSources213.IL)}x.` },
      { label: "Aydınlanma", expression: `E = ${twoSources213.IK}/${num213(eq.x)}² = ${num213(eq.EK)} lx`, explanation: `L için de ${twoSources213.IL}/${num213(twoSources213.d - eq.x)}² = ${num213(eq.EL)} lx çıkar.` },
    ],
    answer: `P, K’den ${num213(eq.x)} m uzaktadır. Her kaynağın oradaki aydınlanması ${num213(eq.EK)} lx’tir.`,
    check: `${twoSources213.IK}/${num213(eq.x ** 2)} = ${num213(eq.EK)} ve ${twoSources213.IL}/${num213((twoSources213.d - eq.x) ** 2)} = ${num213(eq.EL)}. P, şiddeti büyük olan K’ye daha uzaktır.`,
    pitfall: `Uzaklıkların karesini almadan ${twoSources213.IK}/x = ${twoSources213.IL}/(${twoSources213.d} − x) yazmak x = ${num213(eq.wrong)} m verir. Bu noktada iki aydınlanma eşit değildir.`,
  },
  {
    title: "Masa lambasında yükseklik ve eğik nokta",
    prompt: `Işık şiddeti ${lamp213.I} cd olan ideal noktasal lamba yatay bir masanın üstünde asılıdır. Lambanın tam altındaki noktada aydınlanma ${lamp213.Ebelow} lx’tir. Lamba masadan kaç m yüksektedir? Masada, lambanın tam altındaki noktadan ${lamp213.side} m uzaktaki Q noktasında aydınlanma kaç lx olur?`,
    strategy: "Tam altta ışın masaya diktir, E = I/h² ile yüksekliği bul. Q için önce lambaya uzaklığı, sonra normalle açının kosinüsünü yaz.",
    steps: [
      { label: "Yükseklik", expression: `${lamp213.Ebelow} = ${lamp213.I}/h² ⇒ h² = ${num213(lamp.h ** 2)} ⇒ h = ${num213(lamp.h)} m`, explanation: "Tam alttaki noktada θ = 0° ve cos θ = 1." },
      { label: "Uzaklık", expression: `r = √(${num213(lamp.h)}² + ${lamp213.side}²) = ${num213(lamp.r)} m`, explanation: "Düşey yükseklik ile yatay uzaklık dik üçgenin dik kenarlarıdır." },
      { label: "Kosinüs", expression: `cos θ = ${num213(lamp.h)}/${num213(lamp.r)} = ${num213(lamp.cos)}`, explanation: "Masanın normali düşeydir. θ, ışının düşeyle yaptığı açıdır." },
      { label: "Aydınlanma", expression: `E = ${lamp213.I}·${num213(lamp.cos)}/${num213(lamp.r)}² = ${num213(lamp.E, 3)} lx`, explanation: `${num213(lamp.r)}² = ${num213(lamp.r ** 2)}.` },
    ],
    answer: `Lamba ${num213(lamp.h)} m yüksektedir. Q’daki aydınlanma ${num213(lamp.E, 3)} lx, yani yaklaşık ${num213(lamp.E, 1)} lx’tir.`,
    check: `Q hem daha uzaktadır hem ışını eğik alır, bu yüzden ${lamp213.Ebelow} lx’ten çok küçük çıkmalı. ${num213(lamp.E, 3)} < ${lamp213.Ebelow}.`,
    pitfall: `Kosinüsü unutmak ${lamp213.I}/${num213(lamp.r ** 2)} = ${num213(lamp.noCos)} lx verir. Yatay uzaklığı r sanmak ise ${lamp213.I}/${lamp213.side ** 2} = ${num213(lamp213.I / lamp213.side ** 2)} lx gibi yanlış bir değer üretir.`,
  },
];

export const lightSupplement213 = {
  title: lightSection213.title,
  figureTitle: lightSection213.title,
  paragraphs: lightSection213.paragraphs,
  summary: `E = I·cos θ/r², θ normalden ölçülür. ${intensity213} cd için ${num213(l1.r)} m’de ${num213(l1.E)} lx, ${num213(l2.r)} m’de ${num213(l2.E)} lx, ${num213(l3.r)} m’de ${num213(l3.E)} lx. Normalle ${tiltAngle213}° her değeri yarıya indirir.`,
  appendSection: true as const,
  table: lightTable,
  examples: lightExamples213,
};

/* =====================================================================
 * Gölge: geniş kaynakta tam gölge ve yarı gölge genişlikleri
 * ===================================================================== */

/** Engelin kesitteki boyu (cm). */
export const obstacle213 = 10;
export interface ShadowCase213 { D: number; a: number; b: number }
export const shadowCases213: readonly ShadowCase213[] = [
  { D: 0, a: 30, b: 90 },
  { D: 4, a: 30, b: 90 },
  { D: 4, a: 30, b: 60 },
  { D: 10, a: 30, b: 60 },
  { D: 10, a: 30, b: 90 },
  { D: 20, a: 30, b: 45 },
  { D: 20, a: 30, b: 60 },
  { D: 20, a: 30, b: 90 },
];
/**
 * İki boyutlu kesit: D boylu kaynak x = 0’da, h boylu opak engel x = a’da,
 * paralel perde x = b’de; üçü de eksene dik ve eksen üzerinde ortalı.
 * Tam gölge sınırı kaynağın üst ucunu engelin üst ucuna, gölgeli bölgenin
 * dış sınırı kaynağın alt ucunu engelin üst ucuna bağlayan doğrudur.
 */
export const shadowWidths213 = ({ D, a, b }: ShadowCase213, h = obstacle213) => {
  guard(b > a && a > 0 && D >= 0 && h > 0, "perde engelin arkasında olmalı");
  const rawUmbra = (h * b - D * (b - a)) / a;
  const umbra = Math.max(0, rawUmbra);
  const total = (h * b + D * (b - a)) / a;
  const apex = D > h ? (D * a) / (D - h) : Infinity;
  return { rawUmbra, umbra, total, penumbra: total - umbra, band: (D * (b - a)) / a, apex };
};
export const shadowRows213 = () => shadowCases213.map((c) => ({ ...c, ...shadowWidths213(c) }));
const shadowRows = shadowRows213();
const [sPoint, sSmall90, sSmall60, sEq60, sEq90, sBig45, sBig60, sBig90] = shadowRows;
guard(sPoint.umbra === sPoint.total && sPoint.penumbra === 0 && sPoint.umbra === (obstacle213 * sPoint.b) / sPoint.a, "noktasal kaynakta yalnız tam gölge olmalı");
guard(sEq60.umbra === obstacle213 && sEq90.umbra === obstacle213, "kaynak engel boyundaysa tam gölge engel boyunda kalmalı");
guard(sSmall90.umbra > sSmall60.umbra && sSmall90.penumbra > sSmall60.penumbra, "küçük kaynakta perde uzaklaşınca iki bölge de büyümeli");
guard(sBig45.umbra > sBig60.umbra && sBig60.umbra === 0 && sBig60.apex === sBig60.b && sBig90.rawUmbra < 0, "büyük kaynakta tam gölge daralıp sonlanmalı");
for (const row of shadowRows) {
  guard(row.total >= row.umbra && Number.isInteger(row.umbra) && Number.isInteger(row.total), "genişlikler tam sayı ve tutarlı olmalı");
  if (row.rawUmbra > 0) guard(near(row.penumbra, 2 * row.band), "tam gölge varken iki yanda eşit yarı gölge şeridi olmalı");
}
const shadowTable = {
  layout: "table" as const,
  headers: ["Kaynak boyu D (cm)", "a ; b (cm)", "Tam gölge U (cm)", "Yarı gölge, toplam (cm)", "Gölgeli bölge W (cm)"],
  rows: shadowRows.map((r) => [
    r.D === 0 ? "0 (noktasal)" : String(r.D),
    `${r.a} ; ${r.b}`,
    r.rawUmbra > 0 ? String(r.umbra) : r.rawUmbra === 0 ? "0 (tek nokta)" : "yok",
    String(r.penumbra),
    String(r.total),
  ]),
};

export const shadowSection213: GuideSection = {
  title: "Kaynak büyüdükçe tam gölge ve yarı gölge genişliği",
  figureTitle: "Kaynak büyüdükçe tam gölge ve yarı gölge genişliği",
  paragraphs: [
    `Tablo iki boyutlu bir kesittir. D boylu ışık kaynağı, h = ${obstacle213} cm boylu opak engel ve perde birbirine paraleldir, üçünün de ortası aynı eksen üzerindedir. a kaynak-engel, b kaynak-perde uzaklığıdır. Tam gölgenin üst kenarı kaynağın üst ucunu engelin üst ucuna bağlayan doğrudur. Gölgeli bölgenin üst dış kenarı ise kaynağın alt ucunu engelin üst ucuna bağlayan doğrudur. Alt kenarlar bunların simetriğidir. Benzer üçgenlerden U = [h·b − D(b − a)]/a ve W = [h·b + D(b − a)]/a çıkar. Yarı gölge, W ile U arasındaki bölgedir.`,
    `D = 0 noktasal kaynaktır: U = W = h·b/a = ${sPoint.umbra} cm ve yarı gölge yoktur. Kaynak ${sSmall90.D} cm olunca aynı uzaklıklarda tam gölge ${sSmall90.umbra} cm’ye iner, iki yanda ${sSmall90.band}’er cm yarı gölge şeridi oluşur. Her şeridin genişliği D(b − a)/a’dır ve engelin boyuna bağlı değildir. Kaynak engelden küçükse perde uzaklaştıkça hem U hem yarı gölge büyür.`,
    `Kaynak engelle eşit boydaysa (D = ${sEq60.D} cm) tam gölge her perde uzaklığında ${sEq60.umbra} cm kalır. Kaynak engelden büyükse (D = ${sBig45.D} cm) tam gölge perde uzaklaştıkça daralır: b = ${sBig45.b} cm’de ${sBig45.umbra} cm, b = ${sBig60.b} cm’de tek nokta. Sınır b = D·a/(D − h) = ${sBig60.apex} cm’dir. Daha uzaktaki perdede (b = ${sBig90.b} cm) tam gölge yoktur, ${sBig90.total} cm’lik bölgenin tamamı yarı gölgedir.`,
  ],
  table: shadowTable,
};

/* Örnek 1: disk kaynak ve disk engel. */
export const discCase213 = { D: 6, h: 12, a: 20, b: 60 } as const;
const disc = shadowWidths213(discCase213, discCase213.h);
/* Örnek 2: tam gölgenin sonlandığı perde uzaklığı. */
export const apexCase213 = { D: 24, h: 12, a: 40 } as const;
const apexB = (apexCase213.D * apexCase213.a) / (apexCase213.D - apexCase213.h);
guard(Number.isInteger(apexB) && shadowWidths213({ D: apexCase213.D, a: apexCase213.a, b: apexB }, apexCase213.h).rawUmbra === 0, "örnek 2 sınırı tam gölgeyi sıfırlamalı");

export const shadowExamples213: WorkedExample[] = [
  {
    title: "Disk kaynakta tam gölge ve yarı gölge halkası",
    prompt: `Çapı ${discCase213.D} cm olan parlak bir disk kaynak, çapı ${discCase213.h} cm olan opak bir disk ve bir perde birbirine paraleldir. Üçünün merkezi aynı eksen üzerindedir. Kaynak-engel uzaklığı ${discCase213.a} cm, kaynak-perde uzaklığı ${discCase213.b} cm’dir. Perdedeki tam gölgenin çapı kaç cm’dir? Çevresindeki yarı gölge halkası kaç cm genişliktedir?`,
    strategy: "Eksenden geçen kesitte çalış. Tam gölge kenarı aynı taraftaki uçları, dış kenar çapraz uçları birleştiren doğrudur.",
    steps: [
      { label: "Noktasal kısım", expression: `h·b/a = ${discCase213.h}·${discCase213.b}/${discCase213.a} = ${(discCase213.h * discCase213.b) / discCase213.a} cm`, explanation: "Kaynak bir nokta olsaydı gölge bu kadar olurdu." },
      { label: "Kaynak katkısı", expression: `D(b − a)/a = ${discCase213.D}·${discCase213.b - discCase213.a}/${discCase213.a} = ${disc.band} cm`, explanation: "Her yandaki yarı gölge şeridinin genişliği budur." },
      { label: "Tam gölge", expression: `U = ${(discCase213.h * discCase213.b) / discCase213.a} − ${disc.band} = ${disc.umbra} cm`, explanation: "Tam gölge kenarı, kaynağın aynı taraftaki ucunun gördüğü sınırdır." },
      { label: "Dış çap", expression: `W = ${(discCase213.h * discCase213.b) / discCase213.a} + ${disc.band} = ${disc.total} cm`, explanation: "Halka genişliği (W − U)/2’dir." },
    ],
    answer: `Tam gölgenin çapı ${disc.umbra} cm, yarı gölge halkası ${disc.band} cm genişliktedir. Gölgeli bölgenin dış çapı ${disc.total} cm olur.`,
    check: `(${disc.total} − ${disc.umbra})/2 = ${disc.band}. Kaynak engelden küçük olduğu için tam gölge engelden büyük çıktı: ${disc.umbra} > ${discCase213.h}.`,
    pitfall: `Kaynağı nokta sayıp ${(discCase213.h * discCase213.b) / discCase213.a} cm’yi tam gölge çapı vermek. Bu değer tam gölge ile dış sınırın tam ortasıdır.`,
  },
  {
    title: "Tam gölgenin bittiği perde uzaklığı",
    prompt: `Kesitte boyu ${apexCase213.D} cm olan ışık kaynağının önünde, ${apexCase213.a} cm uzakta ${apexCase213.h} cm boylu opak bir engel vardır. Kaynak, engel ve perde paraleldir, ortaları aynı eksen üzerindedir. Perdede tam gölge görülebilmesi için perde engelden en çok kaç cm uzakta olabilir?`,
    strategy: "Tam gölge genişliğini kaynak-perde uzaklığı b’ye bağlı yaz ve sıfır olduğu b’yi bul.",
    steps: [
      { label: "Genişlik", expression: `U = [${apexCase213.h}b − ${apexCase213.D}(b − ${apexCase213.a})]/${apexCase213.a}`, explanation: "Kaynak engelden büyük olduğu için b arttıkça U azalır." },
      { label: "Sıfırla", expression: `${apexCase213.h}b = ${apexCase213.D}(b − ${apexCase213.a}) ⇒ ${apexCase213.D - apexCase213.h}b = ${apexCase213.D * apexCase213.a}`, explanation: "U = 0, tam gölge konisinin ucudur." },
      { label: "b", expression: `b = ${apexB} cm`, explanation: "Bu, kaynak-perde uzaklığıdır." },
      { label: "Engel-perde", expression: `${apexB} − ${apexCase213.a} = ${apexB - apexCase213.a} cm`, explanation: "Soru engelden olan uzaklığı istiyor." },
    ],
    answer: `Perde engelden ${apexB - apexCase213.a} cm’den yakın olmalıdır. Tam ${apexB - apexCase213.a} cm’de tam gölge tek noktaya iner, daha uzakta hiç tam gölge kalmaz.`,
    check: `b = ${apexB} cm’de ${apexCase213.h}·${apexB} = ${apexCase213.h * apexB} ve ${apexCase213.D}·${apexB - apexCase213.a} = ${apexCase213.D * (apexB - apexCase213.a)}. İki çarpım eşit, U = 0.`,
    pitfall: `Kaynak-perde uzaklığını (${apexB} cm) engel-perde uzaklığı diye vermek. Önce hangi uzaklığın sorulduğunu yaz.`,
  },
];

export const shadowSupplement213 = {
  title: shadowSection213.title,
  figureTitle: shadowSection213.title,
  paragraphs: shadowSection213.paragraphs,
  summary: `U = [h·b − D(b − a)]/a, W = [h·b + D(b − a)]/a. Noktasal kaynakta yarı gölge yoktur. D = h ise U = h kalır. D > h ise tam gölge b = D·a/(D − h)’de biter (h = ${obstacle213}, D = ${sBig60.D}, a = ${sBig60.a} için ${sBig60.apex} cm).`,
  appendSection: true as const,
  table: shadowTable,
  examples: shadowExamples213,
};

/* =====================================================================
 * Düzlem ayna: iki ayna arasında görüntü sayısı
 * ===================================================================== */

const mod360 = (x: number) => ((x % 360) + 360) % 360;
/** Açı x, [lo, lo + 180] aralığının içinde ve sınırlardan uzakta mı? */
const strictlyIn = (x: number, lo: number) => {
  const t = mod360(x - lo);
  return t > 1e-7 && t < 180 - 1e-7;
};
/**
 * Aynalar O’dan çıkan iki yarı doğrudur: A 0°, B α° doğrultusunda. Cisim O’ya
 * göre θ açısındadır (0 < θ < α). Bir görüntü, ancak yansıtan yüzün önünde
 * (o aynanın yarı düzleminde) kalırsa diğer ayna için cisim olur. İki zincir
 * (önce A, önce B) izlenir; çakışan konumlar bir kez sayılır.
 */
export const mirrorImages213 = (alpha: number, theta: number) => {
  const front = { A: (x: number) => strictlyIn(x, 0), B: (x: number) => strictlyIn(x, alpha - 180) };
  const reflect = { A: (x: number) => -x, B: (x: number) => 2 * alpha - x };
  const chains = (["A", "B"] as const).map((first) => {
    const chain: number[] = [];
    let mirror: "A" | "B" = first;
    let cur = theta;
    for (let guardCount = 0; guardCount < 100 && front[mirror](cur); guardCount += 1) {
      cur = mod360(reflect[mirror](cur));
      chain.push(cur);
      mirror = mirror === "A" ? "B" : "A";
    }
    return chain;
  });
  const distinct: number[] = [];
  for (const x of chains.flat()) if (!distinct.some((y) => sameAngle(x, y))) distinct.push(x);
  return { images: distinct.sort((p, q) => p - q), chains };
};
const sameAngle = (x: number, y: number) => Math.abs(mod360(x - y + 180) - 180) < 1e-6;

export const mirrorAngles213 = [120, 90, 72, 60, 45, 40, 36, 30] as const;
export const mirrorRows213 = () => mirrorAngles213.map((alpha) => {
  const n = 360 / alpha;
  guard(Number.isInteger(n), "360/α tam sayı olmalı");
  const onBisector = mirrorImages213(alpha, alpha / 2);
  const offBisector = mirrorImages213(alpha, alpha / 3);
  return { alpha, n, formula: n - 1, bisector: onBisector.images, offAxis: offBisector.images, onBisector, offBisector, even: n % 2 === 0 };
});
const mirrorRows = mirrorRows213();
for (const row of mirrorRows) {
  guard(row.bisector.length === row.formula, "açıortaydaki cisimde çizim n − 1 görüntü vermeli");
  guard(row.even ? row.offAxis.length === row.formula : row.offAxis.length === row.n, "çift n konumdan bağımsız, tek n açıortay dışında n görüntü");
  const ends = (m: ReturnType<typeof mirrorImages213>) => m.chains.map((c) => c.at(-1)!);
  if (row.even) for (const m of [row.onBisector, row.offBisector]) guard(sameAngle(ends(m)[0], ends(m)[1]), "çift n: iki zincirin son görüntüsü aynı noktada");
  else {
    const [ea, eb] = ends(row.onBisector);
    guard((sameAngle(ea, row.alpha + 180) && sameAngle(eb, 180)) || (sameAngle(ea, 180) && sameAngle(eb, row.alpha + 180)), "tek n, açıortay: son görüntüler ayna doğrultularının uzantısında");
    guard(Math.abs(row.offBisector.chains[0].length - row.offBisector.chains[1].length) === 1, "tek n, açıortay dışı: bir zincir bir görüntü fazla");
  }
}
const m90 = mirrorRows.find((r) => r.alpha === 90)!;
const m60 = mirrorRows.find((r) => r.alpha === 60)!;
const m72 = mirrorRows.find((r) => r.alpha === 72)!;
const m120 = mirrorRows.find((r) => r.alpha === 120)!;
const mirrorTable = {
  layout: "table" as const,
  headers: ["Aynalar arası açı α", "n = 360°/α", "N = n − 1", "Açıortaydaki cisim (çizimle)", "Açıortay dışındaki cisim (çizimle)"],
  rows: mirrorRows.map((r) => [`${r.alpha}°`, String(r.n), String(r.formula), String(r.bisector.length), String(r.offAxis.length)]),
};

export const mirrorSection213: GuideSection = {
  title: "İki düzlem ayna arasında görüntü sayısı",
  figureTitle: "İki düzlem ayna arasında görüntü sayısı",
  paragraphs: [
    `Kenarları O noktasında birleşen iki düzlem ayna arasında α açısı vardır. Aynalar arasındaki cisim, önce bir aynada görüntü verir. Bu görüntü öbür aynanın önünde kalıyorsa o ayna için yeni bir cisim olur ve ikinci bir görüntü doğar. Bu zincir, görüntü iki aynanın da arkasındaki bölgeye düşünce durur. Her görüntü bir aynanın yansıması olduğu için O’ya uzaklık değişmez, bütün görüntüler O merkezli aynı çember üzerindedir.`,
    `Tablonun son iki sütunu bu zinciri iki taraftan sayarak bulunmuştur, formülden alınmamıştır. n = 360°/α tam sayı ise cisim açıortaydayken görüntü sayısı N = n − 1 olur. Örneğin α = ${m90.alpha}° için ${m90.formula}, α = ${m60.alpha}° için ${m60.formula} görüntü vardır. Açı küçüldükçe görüntü sayısı artar.`,
    `n çift ise iki zincirin son görüntüsü aynı noktaya düşer ve bir kez sayılır. Bu durumda sonuç cismin yerinden bağımsızdır. n tek ise açıortaydaki cismin zincirleri, son görüntüler ayna doğrultularının uzantısına düşünce durur. Cisim açıortaydan kayınca zincirlerden biri bir görüntü daha verir ve sayı n olur: α = ${m120.alpha}° için ${m120.offAxis.length}, α = ${m72.alpha}° için ${m72.offAxis.length}. Soruda cismin yeri verilmemişse açıortayda olduğu varsayılır, bu varsayımı yaz.`,
  ],
  table: mirrorTable,
};

/* Örnek 2 geometrisi: 60°’lik iki aynada iki yansıma. */
export const twoMirrorRay213 = { alpha: 60, glancing: 40 } as const;
export const twoMirrorRay = () => {
  const { alpha, glancing } = twoMirrorRay213;
  // A aynası x ekseni (0°), B aynası α doğrultusunda. Işın A’ya P = (10, 0)’da çarpar.
  const P = [10, 0] as const;
  // Gelen ışın aşağı-sola iner: yön (−cos γ, −sin γ). A’dan yansıyınca y bileşeni işaret değiştirir.
  const incoming: [number, number] = [-Math.cos(rad(glancing)), -Math.sin(rad(glancing))];
  const afterA: [number, number] = [incoming[0], -incoming[1]];
  // B doğrusu: t·(cos α, sin α). P + s·afterA = t·uB.
  const uB: [number, number] = [Math.cos(rad(alpha)), Math.sin(rad(alpha))];
  const det = afterA[0] * -uB[1] - afterA[1] * -uB[0];
  const s = (-P[0] * -uB[1] - -P[1] * -uB[0]) / det;
  const Q: [number, number] = [P[0] + s * afterA[0], P[1] + s * afterA[1]];
  const t = Q[0] * uB[0] + Q[1] * uB[1];
  const nB: [number, number] = [Math.sin(rad(alpha)), -Math.cos(rad(alpha))];
  const cosToNormal = Math.abs(afterA[0] * nB[0] + afterA[1] * nB[1]);
  const incidenceB = degOf(Math.acos(Math.min(1, cosToNormal)));
  const dotN = afterA[0] * nB[0] + afterA[1] * nB[1];
  const afterB: [number, number] = [afterA[0] - 2 * dotN * nB[0], afterA[1] - 2 * dotN * nB[1]];
  const between = degOf(Math.acos(Math.max(-1, Math.min(1, incoming[0] * afterB[0] + incoming[1] * afterB[1]))));
  return { P, Q, s, t, incidenceB, between, incoming, afterA, afterB };
};
const ray2 = twoMirrorRay();
guard(ray2.s > 0 && ray2.t > 0, "ışın B aynasının yarı doğrusuna çarpmalı");
guard(near(ray2.incidenceB, twoMirrorRay213.alpha + twoMirrorRay213.glancing - 90, 1e-6), "B’deki gelme açısı üçgenden çıkmalı");
guard(near(ray2.between, 2 * twoMirrorRay213.alpha, 1e-6), "iki yansıma yönü 2α döndürmeli");
const glancingB = 180 - twoMirrorRay213.alpha - twoMirrorRay213.glancing;

export const mirrorExamples213: WorkedExample[] = [
  {
    title: "Görüntü sayısından aynalar arası açı",
    prompt: "Kenarları birleşik iki düzlem aynanın açıortayı üzerine bir mum konuyor ve aynalarda 7 görüntü sayılıyor. Aynalar arasındaki açı kaç derecedir? Mum açıortayda kalırken açı 15° küçültülürse görüntü sayısı kaç olur?",
    strategy: "Açıortaydaki cisimde N = 360°/α − 1 kullan. Önce α’yı bul, sonra yeni açıda N’yi yeniden hesapla.",
    steps: [
      { label: "n", expression: "360°/α − 1 = 7 ⇒ 360°/α = 8", explanation: "Görüntü sayısına 1 ekle." },
      { label: "α", expression: "α = 360°/8 = 45°", explanation: "8 çift olduğu için sonuç mumun yerine bağlı değildir." },
      { label: "Yeni açı", expression: "45° − 15° = 30° ⇒ N = 360/30 − 1 = 11", explanation: `Tablodaki 30° satırı da çizimle ${mirrorRows.find((r) => r.alpha === 30)!.bisector.length} görüntü verir.` },
    ],
    answer: "Açı 45°’dir. 30°’ye indirilince 11 görüntü oluşur, yani 4 görüntü artar.",
    check: `45° satırında çizimle sayılan görüntü ${mirrorRows.find((r) => r.alpha === 45)!.bisector.length}. 11 − 7 = 4.`,
    pitfall: "360°/α = 7 yazıp α ≈ 51,4° bulmak. Sayılan görüntülere cismin kendisi dahil değildir, önce 1 eklenir.",
  },
  {
    title: "İki aynada iki yansıma ışını ne kadar döndürür?",
    prompt: `Kenarları O’da birleşen A ve B düzlem aynaları arasında ${twoMirrorRay213.alpha}° vardır. Aynaların arasından gelen bir ışın A aynasına, ayna yüzeyiyle ${twoMirrorRay213.glancing}° açı yapacak biçimde çarpıp yansıyor, sonra B aynasına çarpıp yeniden yansıyor. Işının B aynasındaki gelme açısı (normalden) kaç derecedir? A’ya gelen ışının yönü ile B’den yansıyan ışının yönü arasındaki açı kaç derecedir?`,
    strategy: "Yansıma yasası yüzeyle yapılan açıyı da korur. O, A’daki çarpma noktası ve B’deki çarpma noktasının oluşturduğu üçgende açıları topla.",
    steps: [
      { label: "A’dan çıkış", expression: `Yansıyan ışın A yüzeyiyle ${twoMirrorRay213.glancing}°`, explanation: "Normale göre gelme ve yansıma açıları eşitse yüzeye göre açılar da eşittir." },
      { label: "Üçgen", expression: `180° − ${twoMirrorRay213.alpha}° − ${twoMirrorRay213.glancing}° = ${glancingB}°`, explanation: "Işının B yüzeyiyle yaptığı açı üçgenin üçüncü açısıdır." },
      { label: "B’de gelme açısı", expression: `i_B = 90° − ${glancingB}° = ${num213(ray2.incidenceB, 1)}°`, explanation: "Açı normalden ölçülür." },
      { label: "Dönme", expression: `2·${twoMirrorRay213.glancing}° + 2·${glancingB}° = ${2 * twoMirrorRay213.glancing + 2 * glancingB}°`, explanation: `Yüzeyle γ açısı yapan ışın yansıyınca yönü 2γ döner. 360° − ${2 * twoMirrorRay213.glancing + 2 * glancingB}° = ${num213(ray2.between, 1)}°.` },
    ],
    answer: `B’deki gelme açısı ${num213(ray2.incidenceB, 1)}°’dir. İlk gelen ışınla son yansıyan ışının yönleri arasında ${num213(ray2.between, 1)}° vardır, bu 2α’ya eşittir.`,
    check: `A’daki açı ${twoMirrorRay213.glancing}° yerine ${twoMirrorRay213.glancing + 10}° alınsa üçgenden ${glancingB - 10}° çıkar ve dönme yine 2·${twoMirrorRay213.glancing + 10} + 2·${glancingB - 10} = ${2 * twoMirrorRay213.glancing + 2 * glancingB}° olur. Sonuç yalnız α’ya bağlıdır.`,
    pitfall: `B yüzeyiyle yapılan ${glancingB}°’yi gelme açısı diye vermek. Gelme açısı normalden ölçülür: ${num213(ray2.incidenceB, 1)}°.`,
  },
];

export const mirrorSupplement213 = {
  title: mirrorSection213.title,
  figureTitle: mirrorSection213.title,
  paragraphs: mirrorSection213.paragraphs,
  summary: `n = 360°/α tam sayıysa açıortaydaki cisimde N = n − 1: ${mirrorRows.map((r) => `${r.alpha}° → ${r.formula}`).join(", ")}. n tekse ve cisim açıortayda değilse N = n.`,
  appendSection: true as const,
  table: mirrorTable,
  examples: mirrorExamples213,
};

/* =====================================================================
 * Küresel aynalar: f = 10 cm çukur aynada konum tablosu
 * ===================================================================== */

/** Çukur aynanın odak uzaklığı (cm); bu ünitenin işaretinde f > 0. */
export const focal213 = 10;
export const objectDistances213 = [60, 30, 20, 15, 12, 10, 6, 2] as const;
/** 1/f = 1/u + 1/v ⇒ v = f·u/(u − f); m = −v/u. u = f için sonlu görüntü yoktur. */
export const mirrorImage213 = (u: number, f = focal213) => {
  if (u === f) return undefined;
  const v = q213(f * u, u - f);
  const m = q213(-v.n, v.d * u);
  return { v, m };
};
export const sphericalRows213 = () => objectDistances213.map((u) => {
  const img = mirrorImage213(u);
  if (!img) return { u, img: undefined, real: false, nature: "sonlu görüntü yok", region: "u = f" } as const;
  const v = qVal(img.v);
  const m = qVal(img.m);
  const real = v > 0;
  const size = near(Math.abs(m), 1) ? "eş boylu" : Math.abs(m) > 1 ? "büyük" : "küçük";
  const f = focal213;
  const uRegion = u > 2 * f ? "u > 2f" : u === 2 * f ? "u = 2f" : u > f ? "f < u < 2f" : "u < f";
  const vRegion = !real ? "aynanın arkasında" : v > 2 * f ? "2f’nin ötesinde" : near(v, 2 * f) ? "2f’de" : "f ile 2f arasında";
  return {
    u, img, v, m, real,
    nature: `${real ? "gerçek" : "sanal"}, ${m < 0 ? "ters" : "düz"}, ${size}`,
    region: `${uRegion}; görüntü ${vRegion}`,
  } as const;
});
const sphRows = sphericalRows213();
const finite = sphRows.filter((r): r is Extract<typeof r, { v: number }> => r.img !== undefined);
for (const r of finite) {
  guard(qEq(qAdd(q213(1, r.u), q213(r.img.v.d, r.img.v.n)), q213(1, focal213)), "1/u + 1/v = 1/f sağlanmalı");
  const f = focal213;
  if (r.u > 2 * f) guard(r.v > f && r.v < 2 * f && Math.abs(r.m) < 1 && r.m < 0, "u > 2f: görüntü f–2f arasında, ters, küçük");
  else if (r.u === 2 * f) guard(near(r.v, 2 * f) && near(r.m, -1), "u = 2f: v = 2f, eş boylu");
  else if (r.u > f) guard(r.v > 2 * f && r.m < -1, "f < u < 2f: görüntü 2f ötesinde, ters, büyük");
  else guard(r.v < 0 && r.m > 1, "u < f: sanal, düz, büyük");
}
const realRows = finite.filter((r) => r.real);
for (let i = 1; i < realRows.length; i += 1) guard(realRows[i].v > realRows[i - 1].v && Math.abs(realRows[i].m) > Math.abs(realRows[i - 1].m), "cisim odağa yaklaşırken gerçek görüntü uzaklaşmalı ve büyümeli");
const virtRows = finite.filter((r) => !r.real);
for (let i = 1; i < virtRows.length; i += 1) guard(virtRows[i].m < virtRows[i - 1].m, "odak içinde cisim aynaya yaklaşınca sanal görüntü küçülmeli");
const sph = (u: number) => finite.find((r) => r.u === u)!;
const sphText = (x: Q213) => num213(qVal(x), 2);
const sphTable = {
  layout: "table" as const,
  headers: ["u (cm)", "v = fu/(u − f) (cm)", "m = −v/u", "Görüntü", "Bölge"],
  rows: sphRows.map((r) => (r.img
    ? [String(r.u), sphText(r.img.v), sphText(r.img.m), r.nature, r.region]
    : [String(r.u), "tanımsız (payda 0)", "—", r.nature, "u = f; yansıyan ışınlar paralel"])),
};

export const sphericalSection213: GuideSection = {
  title: "f = 10 cm çukur aynada cismi aynaya yaklaştır",
  figureTitle: "f = 10 cm çukur aynada cismi aynaya yaklaştır",
  paragraphs: [
    `Tabloda odak uzaklığı f = ${focal213} cm olan çukur ayna ve asal eksene dik duran gerçek bir cisim vardır. Bu ünitenin işaret kuralı kullanılır: cisim uzaklığı u > 0, çukur aynada f > 0, görüntü aynanın önündeyse v > 0, arkasındaysa v < 0. Her satırda 1/f = 1/u + 1/v bağıntısından v = fu/(u − f), sonra m = −v/u hesaplanır. Işınlar asal eksene yakın kabul edilir.`,
    `Cisim ${sph(60).u} cm’den ${sph(12).u} cm’ye yaklaşırken gerçek görüntü ${sphText(sph(60).img.v)} cm’den ${sphText(sph(12).img.v)} cm’ye uzaklaşır, büyütmenin büyüklüğü ${num213(Math.abs(sph(60).m))}’den ${num213(Math.abs(sph(12).m))}’e çıkar. u = 2f = ${2 * focal213} cm satırında görüntü de 2f’dedir ve cisimle eş boyludur. Bu satır küçük ve büyük gerçek görüntülerin sınırıdır.`,
    `u = f = ${focal213} cm satırında payda sıfırdır, yansıyan ışınlar paralel çıkar ve sonlu görüntü yoktur. Cisim odak içine girince v negatif olur: u = ${sph(6).u} cm’de v = ${sphText(sph(6).img.v)} cm ve m = ${sphText(sph(6).img.m)}. Görüntü aynanın arkasında, sanal, düz ve büyüktür. Cisim aynaya daha da yaklaşırsa (u = ${sph(2).u} cm) büyütme ${sphText(sph(2).img.m)}’e düşer ve 1’e yaklaşır.`,
  ],
  table: sphTable,
};

/* Örnek 1: iki kat büyük görüntünün iki konumu (m = −2 ve m = +2). */
const twiceInverted = (focal213 * 3) / 2; // 1/u + 1/(2u) = 1/f ⇒ u = 3f/2
const twiceUpright = focal213 / 2; // 1/u − 1/(2u) = 1/f ⇒ u = f/2
const tI = mirrorImage213(twiceInverted)!;
const tU = mirrorImage213(twiceUpright)!;
guard(qEq(tI.m, q213(-2)) && qEq(tU.m, q213(2)), "iki kat görüntü konumları m = ∓2 vermeli");
/* Örnek 2: cisim 30 cm’den 15 cm’ye. */
export const moveCase213 = { from: 30, to: 15, h: 4 } as const;
const mFrom = mirrorImage213(moveCase213.from)!;
const mTo = mirrorImage213(moveCase213.to)!;

export const sphericalExamples213: WorkedExample[] = [
  {
    title: "İki kat büyük görüntünün iki yeri",
    prompt: `Odak uzaklığı ${focal213} cm olan çukur aynanın önündeki gerçek bir cismin görüntüsü cismin 2 katı boyundadır. İşaret kuralı: u > 0, çukur aynada f > 0, görüntü önde ise v > 0, m = −v/u. Cisim aynadan kaç cm uzakta olabilir? Her durumda görüntünün özelliklerini yaz.`,
    strategy: "Boy oranı 2 ise |m| = 2’dir, işaret verilmemiştir. m = −2 ve m = +2 için v’yi u cinsinden yazıp ayna denklemine koy.",
    steps: [
      { label: "m = −2", expression: `v = 2u ⇒ 1/u + 1/(2u) = 1/${focal213} ⇒ u = ${twiceInverted} cm`, explanation: `Görüntü önde, v = ${sphText(tI.v)} cm.` },
      { label: "m = +2", expression: `v = −2u ⇒ 1/u − 1/(2u) = 1/${focal213} ⇒ u = ${twiceUpright} cm`, explanation: `Görüntü arkada, v = ${sphText(tU.v)} cm.` },
      { label: "Bölge", expression: `${focal213} < ${twiceInverted} < ${2 * focal213} ve ${twiceUpright} < ${focal213}`, explanation: "İlki f ile 2f arasında, ikincisi odak içindedir." },
    ],
    answer: `u = ${twiceInverted} cm: gerçek, ters, 2 kat (v = ${sphText(tI.v)} cm). u = ${twiceUpright} cm: sanal, düz, 2 kat (v = ${sphText(tU.v)} cm).`,
    check: `1/${twiceInverted} + 1/${sphText(tI.v)} = 1/${focal213} ve 1/${twiceUpright} + 1/(${sphText(tU.v)}) = 1/${focal213}.`,
    pitfall: "Yalnız m = −2’yi çözüp odak içindeki ikinci konumu kaçırmak. Boy oranı işaret söylemez.",
  },
  {
    title: "Cisim yaklaşınca görüntü ne kadar kayar?",
    prompt: `Odak uzaklığı ${focal213} cm olan çukur aynanın asal ekseni üzerinde, ${moveCase213.h} cm boylu gerçek bir cisim aynadan ${moveCase213.from} cm uzaktan ${moveCase213.to} cm uzağa getiriliyor. İşaret kuralı: u > 0, f > 0, önde v > 0, m = −v/u. Görüntü hangi yönde kaç cm yer değiştirir? Görüntünün boyu kaç cm’den kaç cm’ye çıkar?`,
    strategy: "İki konum için v ve m’yi ayrı hesapla. Yer değiştirme iki v’nin farkı, boy |m|·h’dir.",
    steps: [
      { label: `u = ${moveCase213.from}`, expression: `v = ${focal213}·${moveCase213.from}/(${moveCase213.from} − ${focal213}) = ${sphText(mFrom.v)} cm, m = ${sphText(mFrom.m)}`, explanation: "Cisim 2f’nin ötesinde." },
      { label: `u = ${moveCase213.to}`, expression: `v = ${focal213}·${moveCase213.to}/(${moveCase213.to} − ${focal213}) = ${sphText(mTo.v)} cm, m = ${sphText(mTo.m)}`, explanation: "Cisim f ile 2f arasında." },
      { label: "Yer değiştirme", expression: `${sphText(mTo.v)} − ${sphText(mFrom.v)} = ${num213(qVal(mTo.v) - qVal(mFrom.v))} cm`, explanation: "İkisi de pozitif: görüntü aynanın önünde kalır ve aynadan uzaklaşır." },
      { label: "Boy", expression: `${num213(Math.abs(qVal(mFrom.m)))}·${moveCase213.h} = ${num213(Math.abs(qVal(mFrom.m)) * moveCase213.h)} cm → ${num213(Math.abs(qVal(mTo.m)))}·${moveCase213.h} = ${num213(Math.abs(qVal(mTo.m)) * moveCase213.h)} cm`, explanation: "İki konumda da m < 0, görüntü terstir." },
    ],
    answer: `Görüntü aynadan ${num213(qVal(mTo.v) - qVal(mFrom.v))} cm uzaklaşır (${sphText(mFrom.v)} cm’den ${sphText(mTo.v)} cm’ye). Boyu ${num213(Math.abs(qVal(mFrom.m)) * moveCase213.h)} cm’den ${num213(Math.abs(qVal(mTo.m)) * moveCase213.h)} cm’ye çıkar, iki durumda da ters ve gerçektir.`,
    check: `Cisim ${moveCase213.from - moveCase213.to} cm yaklaştı, görüntü ${num213(qVal(mTo.v) - qVal(mFrom.v))} cm uzaklaştı. Gerçek görüntü cisme ters yönde hareket eder.`,
    pitfall: "Görüntü de cisimle birlikte aynaya yaklaşır sanmak. Odağın dışındaki gerçek cisim yaklaştıkça gerçek görüntü uzaklaşır.",
  },
];

export const sphericalSupplement213 = {
  title: sphericalSection213.title,
  figureTitle: sphericalSection213.title,
  paragraphs: sphericalSection213.paragraphs,
  summary: `f = ${focal213} cm: u = ${sph(60).u} → v = ${sphText(sph(60).img.v)}, u = ${sph(20).u} → v = ${sphText(sph(20).img.v)} (eş boy), u = ${sph(15).u} → v = ${sphText(sph(15).img.v)}, u = f → görüntü yok, u = ${sph(6).u} → v = ${sphText(sph(6).img.v)} (sanal, ${sphText(sph(6).img.m)} kat). v = fu/(u − f), m = −v/u.`,
  appendSection: true as const,
  table: sphTable,
  examples: sphericalExamples213,
};

/* =====================================================================
 * Işığın kırılması: hava → su ve hava → cam açı tablosu
 * ===================================================================== */

/**
 * Sarı ışık (yaklaşık 589 nm) için okul hesaplarında kullanılan yaklaşık
 * kırılma indisleri. Kaynak: CRC Handbook of Chemistry and Physics (hava
 * 15 °C, 1 atm: 1,0003; su 20 °C: 1,333; sıradan soda-kireç camı yaklaşık
 * 1,52, optik camlar türüne göre yaklaşık 1,46–1,9). Tablo iki basamağa
 * yuvarlanmış hava 1,00, su 1,33 ve okul değeri cam 1,50 ile hesaplanır.
 */
export const refractiveIndex213 = { hava: 1.0, su: 1.33, cam: 1.5 } as const;

/** n₁ sin i = n₂ sin r; sınırı aşarsa undefined (tam yansıma). */
export const snell213 = (i: number, n1: number, n2: number) => {
  const s = (n1 * Math.sin(rad(i))) / n2;
  return s > 1 + 1e-12 ? undefined : degOf(Math.asin(Math.min(1, s)));
};
export const criticalAngle213 = (n1: number, n2: number) => (n1 > n2 ? degOf(Math.asin(n2 / n1)) : undefined);
export const incidenceAngles213 = [0, 15, 30, 45, 60, 75, 90] as const;
export const refractionRows213 = () => {
  const { hava, su, cam } = refractiveIndex213;
  return incidenceAngles213.map((i) => {
    const rSu = snell213(i, hava, su)!;
    const rCam = snell213(i, hava, cam)!;
    return { i, sin: Math.sin(rad(i)), rSu, rCam, dSu: i - rSu, dCam: i - rCam };
  });
};
const refRows = refractionRows213();
const icSu = criticalAngle213(refractiveIndex213.su, refractiveIndex213.hava)!;
const icCam = criticalAngle213(refractiveIndex213.cam, refractiveIndex213.hava)!;
const icCamSu = criticalAngle213(refractiveIndex213.cam, refractiveIndex213.su)!;
guard(criticalAngle213(refractiveIndex213.hava, refractiveIndex213.su) === undefined, "havadan suya geçişte kritik açı olmamalı");
for (const r of refRows) {
  if (r.i > 0) {
    guard(r.rSu < r.i && r.rCam < r.rSu, "havadan geçen ışın normale yaklaşmalı, camda daha çok");
    guard(near(r.sin / Math.sin(rad(r.rSu)), refractiveIndex213.su, 1e-9) && near(r.sin / Math.sin(rad(r.rCam)), refractiveIndex213.cam, 1e-9), "sin i / sin r indis oranı olmalı");
  } else guard(r.rSu === 0 && r.rCam === 0, "dik gelen ışın sapmamalı");
}
for (let k = 1; k < refRows.length; k += 1) guard(refRows[k].rSu > refRows[k - 1].rSu && refRows[k].dSu > refRows[k - 1].dSu && refRows[k].dCam > refRows[k - 1].dCam, "i büyüdükçe r ve sapma büyümeli");
const last = refRows.at(-1)!;
guard(last.i === 90 && near(last.rSu, icSu) && near(last.rCam, icCam), "en büyük kırılma açısı ters yöndeki kritik açı olmalı");
guard(icCam < icSu, "camın kritik açısı suyunkinden küçük olmalı");
const deg1 = (x: number) => `${num213(x, 1)}°`;
const refTable = {
  layout: "table" as const,
  headers: ["Gelme açısı i (havada)", "sin i", `r: hava → su (n = ${num213(refractiveIndex213.su)})`, `r: hava → cam (n = ${fixed213(refractiveIndex213.cam, 2)})`, "Sapma i − r (su ; cam)"],
  rows: refRows.map((r) => [
    r.i === 90 ? "90° (yüzeyi sıyırarak)" : `${r.i}°`,
    fixed213(r.sin, 3),
    deg1(r.rSu),
    deg1(r.rCam),
    `${deg1(r.dSu)} ; ${deg1(r.dCam)}`,
  ]),
};

export const refractionSection213: GuideSection = {
  title: "Havadan suya ve cama kırılma açıları tablosu",
  figureTitle: "Havadan suya ve cama kırılma açıları tablosu",
  paragraphs: [
    `Tabloda tek renkli sarı ışık havadan düz bir yüzeye gelir ve suya ya da cama geçer. Kırılma indisleri yaklaşık değerlerdir: hava ${fixed213(refractiveIndex213.hava, 2)} (gerçekte 1,0003), su ${num213(refractiveIndex213.su)} (20 °C’de 1,333), cam ${fixed213(refractiveIndex213.cam, 2)}. Cam türüne göre indis değişir, sıradan pencere camı yaklaşık 1,52’dir. Değerlerin kaynağı CRC Handbook of Chemistry and Physics’tir. Her satırda r, n₁·sin i = n₂·sin r bağıntısından hesaplanır, açılar normalden ölçülür.`,
    `i = 0° satırında ışın sapmadan geçer. Diğer bütün satırlarda r < i olur, ışın normale yaklaşır. Camın indisi daha büyük olduğu için camdaki kırılma açısı sudakinden hep küçüktür: i = 45° için suda ${deg1(refRows[3].rSu)}, camda ${deg1(refRows[3].rCam)}. Gelme açısı büyüdükçe hem r hem sapma i − r büyür. Açılar orantılı değildir, oranı sabit olan sin i/sin r’dir.`,
    `Son satırda ışın yüzeyi sıyırarak gelir. Kırılma açısı en çok sudaki ${deg1(last.rSu)} ve camdaki ${deg1(last.rCam)} olabilir. Bu sayılar ters yöndeki kritik açılardır: sudan havaya i_c = ${deg1(icSu)}, camdan havaya i_c = ${deg1(icCam)}, çünkü sin i_c = 1/n. Havadan suya ya da cama geçişte kritik açı yoktur. Camdan suya geçişte sin i_c = ${num213(refractiveIndex213.su)}/${fixed213(refractiveIndex213.cam, 2)} ve i_c = ${deg1(icCamSu)} olur.`,
  ],
  table: refTable,
};

/* Örnek 1: su altındaki lambanın ışık çemberi. */
export const lampDepth213 = 2;
export const lightCircle213 = () => {
  const n = refractiveIndex213.su / refractiveIndex213.hava;
  const ic = criticalAngle213(refractiveIndex213.su, refractiveIndex213.hava)!;
  const R = lampDepth213 * Math.tan(rad(ic));
  return { ic, sin: 1 / n, cos: Math.cos(rad(ic)), tan: Math.tan(rad(ic)), R, viaN: lampDepth213 / Math.sqrt(n * n - 1) };
};
const circ = lightCircle213();
guard(near(circ.R, circ.viaN), "R = h·tan i_c = h/√(n² − 1) olmalı");
/* Örnek 2: camdan suya iki açı. */
export const glassToWater213 = [45, 70] as const;
const gw = glassToWater213.map((i) => ({ i, r: snell213(i, refractiveIndex213.cam, refractiveIndex213.su), s: (refractiveIndex213.cam * Math.sin(rad(i))) / refractiveIndex213.su }));
guard(gw[0].r !== undefined && gw[1].r === undefined && glassToWater213[0] > icCam && glassToWater213[0] < icCamSu && glassToWater213[1] > icCamSu, "45° geçer, 70° tam yansır; 45° hava kritik açısını aşar");

export const refractionExamples213: WorkedExample[] = [
  {
    title: "Havuz dibindeki lambanın ışık çemberi",
    prompt: `Durgun bir havuzda suyun ${lampDepth213} m derinliğine küçük, noktasal bir lamba konuyor. Su yüzeyi düzdür. Suyun kırılma indisi ${num213(refractiveIndex213.su)}, havanınki ${fixed213(refractiveIndex213.hava, 2)} alınacaktır. Lambanın ışığı su yüzeyinde hangi yarıçaplı çemberin içinden havaya çıkabilir? Sonucu iki basamakla ver.`,
    strategy: "Çemberin kenarında ışın yüzeye kritik açıyla gelir. Kritik açıyı bul, sonra derinlik ve yarıçapın oluşturduğu dik üçgende tanjantı kullan.",
    steps: [
      { label: "Kritik açı", expression: `sin i_c = ${fixed213(refractiveIndex213.hava, 2)}/${num213(refractiveIndex213.su)} ≈ ${num213(circ.sin, 4)} ⇒ i_c ≈ ${deg1(circ.ic)}`, explanation: "Işık büyük indisten küçük indise gidiyor, kritik açı vardır." },
      { label: "Kosinüs", expression: `cos i_c = √(1 − ${num213(circ.sin, 4)}²) ≈ ${num213(circ.cos, 4)}`, explanation: "Aynı açının sinüsü ve kosinüsü." },
      { label: "Tanjant", expression: `tan i_c ≈ ${num213(circ.sin, 4)}/${num213(circ.cos, 4)} ≈ ${num213(circ.tan, 4)}`, explanation: "Normal düşeydir, açı lambanın üstündeki düşeyden ölçülür." },
      { label: "Yarıçap", expression: `R = ${lampDepth213}·tan i_c ≈ ${num213(circ.R)} m`, explanation: "Dik üçgende karşı kenar R, komşu kenar derinliktir." },
    ],
    answer: `Işık yaklaşık ${num213(circ.R)} m yarıçaplı çemberin içinden çıkar. Bu çemberin dışına gelen ışınlar tam iç yansıma yapar.`,
    check: `Aynı sonuç R = h/√(n² − 1) = ${lampDepth213}/√(${num213(refractiveIndex213.su)}² − 1) ≈ ${num213(circ.viaN)} m. i_c 45°’den büyük olduğu için R derinlikten büyük çıkmalı.`,
    pitfall: "Kritik açıyı yüzeyden ölçüp R = h·tan(90° − i_c) yazmak. Açı normalden, yani düşeyden ölçülür.",
  },
  {
    title: "Camdan suya geçişte hangi ışın çıkar?",
    prompt: `Kırılma indisi ${fixed213(refractiveIndex213.cam, 2)} olan camdan kırılma indisi ${num213(refractiveIndex213.su)} olan suya, düz arayüze tek renkli iki ışın gönderiliyor. Gelme açıları normalden ${glassToWater213[0]}° ve ${glassToWater213[1]}°’dir. Her ışın suya geçer mi? Geçen ışının kırılma açısı kaç derecedir?`,
    strategy: "Büyük indisten küçük indise geçildiği için önce bu çiftin kritik açısını bul, sonra her gelme açısını onunla karşılaştır.",
    steps: [
      { label: "Kritik açı", expression: `sin i_c = ${num213(refractiveIndex213.su)}/${fixed213(refractiveIndex213.cam, 2)} ≈ ${num213(refractiveIndex213.su / refractiveIndex213.cam, 4)} ⇒ i_c ≈ ${deg1(icCamSu)}`, explanation: "Karşı ortam hava değil sudur." },
      { label: `${glassToWater213[0]}°`, expression: `sin r = ${fixed213(refractiveIndex213.cam, 2)}·sin ${glassToWater213[0]}°/${num213(refractiveIndex213.su)} ≈ ${num213(gw[0].s, 4)} ⇒ r ≈ ${deg1(gw[0].r!)}`, explanation: `${glassToWater213[0]}° < ${deg1(icCamSu)}, ışın geçer ve normalden uzaklaşır.` },
      { label: `${glassToWater213[1]}°`, expression: `${fixed213(refractiveIndex213.cam, 2)}·sin ${glassToWater213[1]}°/${num213(refractiveIndex213.su)} ≈ ${num213(gw[1].s, 4)} > 1`, explanation: `${glassToWater213[1]}° > ${deg1(icCamSu)}, kırılan ışın yoktur, tam iç yansıma olur.` },
    ],
    answer: `${glassToWater213[0]}°’lik ışın suya yaklaşık ${deg1(gw[0].r!)} kırılma açısıyla geçer. ${glassToWater213[1]}°’lik ışın tam iç yansıma yapar.`,
    check: `Geçen ışında r > i olmalı, çünkü su camdan küçük indislidir: ${deg1(gw[0].r!)} > ${glassToWater213[0]}°.`,
    pitfall: `Camdan havaya kritik açıyı (${deg1(icCam)}) kullanıp ${glassToWater213[0]}°’lik ışının da tam yansıdığını söylemek. Kritik açı iki ortamın indis oranına bağlıdır.`,
  },
];

export const refractionSupplement213 = {
  title: refractionSection213.title,
  figureTitle: refractionSection213.title,
  paragraphs: refractionSection213.paragraphs,
  summary: `n₁·sin i = n₂·sin r; hava ${fixed213(refractiveIndex213.hava, 2)}, su ${num213(refractiveIndex213.su)}, cam ${fixed213(refractiveIndex213.cam, 2)} (yaklaşık). i = 30°: suda ${deg1(refRows[2].rSu)}, camda ${deg1(refRows[2].rCam)}. Kritik açı: su→hava ${deg1(icSu)}, cam→hava ${deg1(icCam)}, cam→su ${deg1(icCamSu)}.`,
  appendSection: true as const,
  table: refTable,
  examples: refractionExamples213,
};

export const depth213Supplements = {
  "isik-bilgisi": [lightSupplement213],
  "golge-yari-golge": [shadowSupplement213],
  "duzlem-ayna": [mirrorSupplement213],
  "kuresel-aynalar": [sphericalSupplement213],
  "isigin-kirilmasi": [refractionSupplement213],
};
