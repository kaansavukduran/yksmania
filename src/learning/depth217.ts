import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Biyoloji ekoloji derinleştirmesi (0.217.0). Kabul edilmiş rehberler
 * değişmez; her derse görüntüleme katmanında bir tablo bölümü, iki özgün
 * çözümlü örnek ve bir bölüm çizimi eklenir. Beslenme tipleri iki özellikten
 * (karbon ve enerji kaynağı) sınıflandırılır; besin ağı açık bir ok listesidir
 * ve tür çıkarma sonuçları bu listeden hesaplanır; enerji tablosu dersin
 * yüzde on modeliyle çarpılır; azot, karbon ve su yolları birbirine bağlanan
 * süreç dizileridir. Ölçülmüş sabit kullanılmaz: sayılar dersin kendi
 * temsilî model sayıları ya da açıkça temsilî olarak etiketlenen verilerdir.
 * Paragraflar, tablolar, çizim okumaları ve Kopya Kâğıdı özetleri aynı
 * verilerden yazılır; metindeki genel yargılar modül yüklenirken denetlenir.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth217: veri bu yargıyı artık desteklemiyor: ${claim}`);
};
/** Türkçe sayı: 10000 → "10.000", 0.05 → "0,05". */
export const num217 = (x: number) => {
  const r = Math.round(x * 1e6) / 1e6;
  return (Object.is(r, -0) ? 0 : r).toLocaleString("tr-TR", { maximumFractionDigits: 3 });
};
/** İşaretli net değişim: +5, −12, 0. */
export const signed217 = (x: number) => (x > 0 ? `+${num217(x)}` : x < 0 ? `−${num217(-x)}` : "0");
const list = (xs: readonly (string | number)[]) => xs.join(", ");
const and = (xs: readonly string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ve ${xs[xs.length - 1]}`);
/** Yalnız sözcük başındaki büyük harfi küçültür; CO₂, NH₄⁺ gibi formüllere dokunmaz. */
const lower = (s: string) => (/^[A-ZÇĞİIÖŞÜ][a-zçğıiöşü]/.test(s) ? s.charAt(0).toLocaleLowerCase("tr-TR") + s.slice(1) : s);
const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const sup = (n: number) => [...String(n)].map((c) => SUP[c]).join("");

/* =================================================================
 * 1 · ekoloji-giris: karbon ve enerji kaynağıyla beslenme tipi
 * ================================================================= */

export type CarbonSource217 = "CO₂" | "organik madde";
export type EnergySource217 = "ışık" | "inorganik madde oksidasyonu" | "organik besin";
export type Food217 = "canlı bitki" | "canlı hayvan" | "bitki ve hayvan" | "ölü organik madde" | "ortamdaki organik madde";
/** Bir beslenme yolu: karbon kaynağı, enerji kaynağı ve heterotrofta besinin kaynağı. */
export interface Route217 { carbon: CarbonSource217; energy: EnergySource217; food?: Food217 }
export type Mode217 = "Fotoototrof" | "Kemoototrof" | "Otçul" | "Etçil" | "Omnivor" | "Saprotrof" | "Heterotrof yol";
export type Group217 = "ototrof" | "heterotrof" | "karma";

const FOOD_MODE: Record<Food217, Mode217> = { "canlı bitki": "Otçul", "canlı hayvan": "Etçil", "bitki ve hayvan": "Omnivor", "ölü organik madde": "Saprotrof", "ortamdaki organik madde": "Heterotrof yol" };
/** İki soruluk karar: karbon CO₂’den mi? Sonra enerji (ototrof) ya da besin kaynağı (heterotrof). */
export const routeMode217 = (r: Route217): Mode217 => {
  if (r.carbon === "CO₂") {
    if (r.energy === "ışık") return "Fotoototrof";
    if (r.energy === "inorganik madde oksidasyonu") return "Kemoototrof";
    throw new Error("depth217: CO₂ bağlayan yol organik besin enerjisiyle tanımlanmaz");
  }
  if (r.energy !== "organik besin" || !r.food) throw new Error("depth217: heterotrof yolda enerji organik besinden gelir ve besin kaynağı verilir");
  return FOOD_MODE[r.food];
};
export const modeGroup217 = (m: Mode217): Exclude<Group217, "karma"> => (m === "Fotoototrof" || m === "Kemoototrof" ? "ototrof" : "heterotrof");
/** Bir canlının bütün yolları; iki gruptan yol varsa karma beslenir. */
export const organismGroup217 = (routes: readonly Route217[]): Group217 => {
  const groups = new Set(routes.map((r) => modeGroup217(routeMode217(r))));
  return groups.size > 1 ? "karma" : [...groups][0];
};

export interface ModeRow217 { name: string; routes: Route217[]; energyText: string; carbonText: string; example: string }
export const MODE_ROWS217: ModeRow217[] = [
  { name: "Fotoototrof", routes: [{ carbon: "CO₂", energy: "ışık" }], energyText: "Işık", carbonText: "CO₂", example: "Bitkiler, algler, bazı bakteriler" },
  { name: "Kemoototrof", routes: [{ carbon: "CO₂", energy: "inorganik madde oksidasyonu" }], energyText: "Bazı inorganik maddelerin oksidasyonu", carbonText: "CO₂", example: "Bazı bakteri ve arkeler" },
  { name: "Otçul", routes: [{ carbon: "organik madde", energy: "organik besin", food: "canlı bitki" }], energyText: "Bitkisel besindeki organik madde", carbonText: "Organik madde", example: "Çekirge" },
  { name: "Etçil", routes: [{ carbon: "organik madde", energy: "organik besin", food: "canlı hayvan" }], energyText: "Hayvansal besindeki organik madde", carbonText: "Organik madde", example: "Böcek yiyen kurbağa" },
  { name: "Omnivor", routes: [{ carbon: "organik madde", energy: "organik besin", food: "bitki ve hayvan" }], energyText: "Bitkisel ve hayvansal besin", carbonText: "Organik madde", example: "Tohum ve böcek yiyen kuş" },
  { name: "Saprotrof (ayrıştırıcı)", routes: [{ carbon: "organik madde", energy: "organik besin", food: "ölü organik madde" }], energyText: "Ölü organik madde ve atık", carbonText: "Organik madde", example: "Bazı bakteriler ve mantarlar" },
  {
    name: "Karma beslenme",
    routes: [{ carbon: "CO₂", energy: "ışık" }, { carbon: "organik madde", energy: "organik besin", food: "ortamdaki organik madde" }],
    energyText: "Işıkta ışık; ışık yetersizken ortamdaki organik madde",
    carbonText: "CO₂ ya da organik madde",
    example: "Bazı öglena türleri",
  },
];
export const GROUP_TEXT217: Record<Group217, string> = { ototrof: "Ototrof", heterotrof: "Heterotrof", karma: "Ototrof ve heterotrof yol" };
export const modeRowGroup217 = (row: ModeRow217) => organismGroup217(row.routes);

const modeTable = {
  layout: "table" as const,
  headers: ["Beslenme tipi", "Enerji kaynağı", "Karbon kaynağı", "Örnek", "Grup"],
  rows: MODE_ROWS217.map((r) => [r.name, r.energyText, r.carbonText, r.example, GROUP_TEXT217[modeRowGroup217(r)]]),
};
const rowsOf = (g: Group217) => MODE_ROWS217.filter((r) => modeRowGroup217(r) === g);
const [autoRows, heteroRows, mixedRows] = (["ototrof", "heterotrof", "karma"] as const).map(rowsOf);
const kemoRow = MODE_ROWS217[1];
const omniRow = MODE_ROWS217[4];
const mixedRow = mixedRows[0];

guard(autoRows.every((r) => r.routes.every((x) => x.carbon === "CO₂")), "her ototrof satırı karbonu CO₂’den bağlar");
guard(heteroRows.every((r) => r.routes.every((x) => x.carbon === "organik madde" && x.energy === "organik besin")), "heterotroflar karbonu da enerjiyi de organik maddeden alır");
guard(kemoRow.routes.every((x) => x.energy !== "ışık") && modeRowGroup217(kemoRow) === "ototrof", "kemoototrof ışık kullanmadan üreticidir");
guard(modeRowGroup217(omniRow) === "heterotrof" && omniRow.carbonText === "Organik madde", "omnivor karbonu organik maddeden alır, heterotroftur");
guard(kemoRow.energyText.endsWith("oksidasyonu"), "kemoototrof satırı bir oksidasyonu adlandırır");
guard(mixedRows.length === 1 && new Set(mixedRow.routes.map((r) => modeGroup217(routeMode217(r)))).size === 2, "karma beslenen hem ototrof hem heterotrof yol kullanır");
guard(routeMode217(MODE_ROWS217[5].routes[0]) === "Saprotrof" && modeRowGroup217(MODE_ROWS217[5]) === "heterotrof", "saprotrof heterotroftur");

export const modeSection217: GuideSection = {
  title: "Karbon ve enerji kaynağıyla beslenme tipini belirle",
  paragraphs: [
    `Bir canlının beslenme tipini iki soruyla belirle: karbonu nereden alıyor, enerjiyi nereden alıyor? Karbonu CO₂’den organik bileşiklere bağlayanlar ototroftur. ${autoRows[0].name} ışık enerjisini, ${lower(kemoRow.name)} ${lower(kemoRow.energyText)}ndan elde edilen kimyasal enerjiyi kullanır. Karbonu da enerjiyi de organik maddeden alanlar heterotroftur.`,
    `Heterotroflarda üçüncü soru besinin kaynağıdır. ${heteroRows.map((r) => `${r.name}: ${lower(r.energyText)}`).join(". ")}. Saprotrof ölü maddeye enzim salgılayıp küçük molekülleri alır; o da heterotroftur. Tabloda ${autoRows.length} satır ototrof, ${heteroRows.length} satır heterotroftur. ${mixedRow.example} ışıkta fotosentez yapar, ışık yetersizken ortamdaki organik maddeyi kullanır: iki gruptan da yolu vardır.`,
    `Kloroplast, ışık ya da besin sayısı tek başına tipi belirlemez. ${kemoRow.name} ışık kullanmadan üreticidir. Omnivor iki farklı besin yer ama karbonu organik maddeden aldığı için heterotroftur. Karma beslenme iki ayrı besini yemek değil, iki ayrı karbon ve enerji yolunu kullanmaktır.`,
  ],
  table: modeTable,
};

export interface Organism217 { label: string; description: string; routes: Route217[] }
export const ORGANISMS217: Organism217[] = [
  { label: "K", description: "ışık olmayan bir ortamda bir inorganik maddeyi oksitleyerek elde ettiği enerjiyle CO₂’den organik madde yapan bir bakteri", routes: [{ carbon: "CO₂", energy: "inorganik madde oksidasyonu" }] },
  { label: "L", description: "devrik ağaç gövdesine enzim salgılayıp oluşan küçük organik molekülleri emen bir mantar", routes: [{ carbon: "organik madde", energy: "organik besin", food: "ölü organik madde" }] },
  { label: "M", description: "ışıkta kloroplastıyla CO₂ bağlayan, ışık yetersizken ortamdaki organik maddeyi alan tek hücreli bir canlı", routes: [{ carbon: "CO₂", energy: "ışık" }, { carbon: "organik madde", energy: "organik besin", food: "ortamdaki organik madde" }] },
  { label: "N", description: "hem meyve hem böcek yiyen bir kuş", routes: [{ carbon: "organik madde", energy: "organik besin", food: "bitki ve hayvan" }] },
];
export const organismVerdict217 = (o: Organism217) => {
  const group = organismGroup217(o.routes);
  return group === "karma" ? "karma beslenme" : lower(routeMode217(o.routes[0]));
};
const verdicts = ORGANISMS217.map((o) => `${o.label} ${organismVerdict217(o)}`);
export const autoOrganisms217 = ORGANISMS217.filter((o) => o.routes.some((r) => r.carbon === "CO₂"));

export interface Claim217 { label: string; text: string; holds: boolean; counter?: ModeRow217 }
const claim = (label: string, text: string, rows: readonly ModeRow217[], ok: (r: ModeRow217) => boolean): Claim217 => {
  const counter = rows.find((r) => !ok(r));
  return { label, text, holds: !counter, counter };
};
export const CLAIMS217: Claim217[] = [
  claim("I", "Her üretici ışık enerjisi kullanır.", autoRows, (r) => r.routes.every((x) => x.energy === "ışık")),
  claim("II", "Ayrıştırıcılar ototroftur.", MODE_ROWS217.filter((r) => r.name.startsWith("Saprotrof")), (r) => modeRowGroup217(r) === "ototrof"),
  claim("III", "Omnivor, karbonunu CO₂’den bağlar.", [omniRow], (r) => r.routes.every((x) => x.carbon === "CO₂")),
  claim("IV", "Her ototrof karbonunu CO₂’den alır.", autoRows, (r) => r.routes.every((x) => x.carbon === "CO₂")),
];
const trueClaims = CLAIMS217.filter((c) => c.holds);
guard(trueClaims.length === 1 && trueClaims[0].label === "IV", "dört önermeden yalnız IV doğrudur");

export const modeExamples217: WorkedExample[] = [
  {
    title: "Dört canlıyı iki soruyla sınıflandır",
    prompt: `${ORGANISMS217.map((o) => `${o.label}: ${o.description}.`).join(" ")} Her canlının beslenme tipini bul. Hangileri CO₂ bağlayan bir yola sahiptir?`,
    strategy: "Önce karbon kaynağını sor: CO₂ ise enerji kaynağına, organik madde ise besinin kaynağına bak. Bir canlının iki gruptan yolu varsa karma beslenir.",
    steps: [
      ...ORGANISMS217.map((o) => ({
        label: o.label,
        expression: o.routes.map((r) => `karbon ${r.carbon}, enerji ${r.energy}${r.food ? `, besin ${r.food}` : ""} ⇒ ${lower(routeMode217(r))}`).join(" · "),
        explanation: organismGroup217(o.routes) === "karma" ? "İki yol iki ayrı gruptan: karma beslenme." : `${GROUP_TEXT217[organismGroup217(o.routes)]}.`,
      })),
      { label: "CO₂ bağlayanlar", expression: autoOrganisms217.map((o) => o.label).join(", "), explanation: "Karbonu CO₂’den alan bir yolu olanlar." },
    ],
    answer: `${list(verdicts)}. CO₂ bağlayan yolu olanlar: ${and(autoOrganisms217.map((o) => o.label))}.`,
    check: `K ışık kullanmadığı hâlde CO₂ bağlar; bu yüzden kloroplast ya da ışık ölçütü K’yi yanlış sınıflandırırdı.`,
    pitfall: "N iki farklı besin yiyor diye karma beslenme demek. Karma beslenme ototrof ve heterotrof yolların birlikte kullanılmasıdır; N omnivordur.",
  },
  {
    title: "Genellemeleri tablodaki karşı örnekle sına",
    prompt: `Beslenme tipi tablosuna göre şu önermeleri değerlendir. ${CLAIMS217.map((c) => `${c.label}. ${c.text}`).join(" ")} Hangileri doğrudur? Yanlış olanların her biri için tablodan bir karşı örnek ver.`,
    strategy: "Bir genellemeyi çürütmek için kapsadığı satırlarda ona uymayan tek bir satır yeter. Hiçbir satır uymazlık göstermiyorsa önerme tablo içinde doğrudur.",
    steps: CLAIMS217.map((c) => ({
      label: c.label,
      expression: c.holds ? "Uymayan satır yok ⇒ doğru" : `Karşı örnek: ${c.counter!.name} (${lower(c.counter!.energyText)}; karbon ${c.counter!.carbonText}) ⇒ yanlış`,
      explanation: c.holds ? "Bütün ototrof satırlarında karbon kaynağı CO₂’dir." : `${c.counter!.name} satırı önermeyi bozar.`,
    })),
    answer: `Yalnız ${trueClaims.map((c) => c.label).join(", ")} doğrudur. Karşı örnekler: ${CLAIMS217.filter((c) => !c.holds).map((c) => `${c.label} için ${lower(c.counter!.name)}`).join(", ")}.`,
    check: `I yanlış ama IV doğru: üreticiler enerji kaynağında ayrılır (${list(autoRows.map((r) => lower(r.energyText)))}), karbon kaynağında ayrılmaz.`,
    pitfall: "Üretici sözcüğünü fotosentezle eşitleyip kemoototrofları unutmak.",
  },
];

export const modeSupplement217 = {
  title: modeSection217.title,
  figureTitle: modeSection217.title,
  paragraphs: modeSection217.paragraphs,
  summary: `Önce karbon kaynağı. CO₂ → ototrof: ${autoRows.map((r) => `${lower(r.energyText)} → ${lower(r.name)}`).join("; ")}. Organik madde → heterotrof: ${and(heteroRows.map((r) => lower(r.name)))}. ${mixedRow.example}: iki gruptan da yol, karma beslenme. Omnivor heterotroftur.`,
  appendSection: true as const,
  table: modeTable,
  examples: modeExamples217,
};

/* =================================================================
 * 2 · besin-zinciri-agi: açık ok listesinden ağ hesapları
 * ================================================================= */

export const WEB_SPECIES217 = ["Ot", "Çekirge", "Fare", "Kurbağa", "Yılan", "Şahin"] as const;
export type Species217 = (typeof WEB_SPECIES217)[number];
/** Ok besinden tüketiciye gider: [besin, tüketici]. */
export const WEB_EDGES217: readonly (readonly [Species217, Species217])[] = [
  ["Ot", "Çekirge"], ["Ot", "Fare"], ["Çekirge", "Kurbağa"], ["Fare", "Yılan"], ["Fare", "Şahin"], ["Kurbağa", "Şahin"], ["Yılan", "Şahin"],
];
type Edge = readonly [Species217, Species217];
const without = (removed?: Species217) => WEB_EDGES217.filter(([a, b]) => a !== removed && b !== removed);
export const foodsOf217 = (s: Species217, edges: readonly Edge[] = WEB_EDGES217) => edges.filter(([, b]) => b === s).map(([a]) => a);
export const eatersOf217 = (s: Species217, edges: readonly Edge[] = WEB_EDGES217) => edges.filter(([a]) => a === s).map(([, b]) => b);
export const producers217 = WEB_SPECIES217.filter((s) => foodsOf217(s).length === 0);
/** Üreticiden, tüketeni olmayan bir türe giden bütün yollar (besin zincirleri). */
export const chains217 = (edges: readonly Edge[] = WEB_EDGES217, removed?: Species217): Species217[][] => {
  const out: Species217[][] = [];
  const walk = (path: Species217[]) => {
    const next = eatersOf217(path[path.length - 1], edges);
    if (next.length === 0) { if (path.length > 1) out.push(path); return; }
    next.forEach((n) => walk([...path, n]));
  };
  producers217.filter((p) => p !== removed).forEach((p) => walk([p]));
  return out;
};
/** Bir türün yer aldığı bütün yollardaki trofik düzeyler (üretici 1). */
export const levels217 = (s: Species217) => [...new Set(chains217().flatMap((c) => (c.includes(s) ? [c.indexOf(s) + 1] : [])))].sort((a, b) => a - b);
export interface Removal217 { removed: Species217; lostEdges: Edge[]; foodless: Species217[]; remaining: Species217[][] }
/** Bir tür çıkarılınca kesin olan model sonuçları: silinen oklar, besin oku kalmayan tüketiciler, kalan zincirler. */
export const removal217 = (removed: Species217): Removal217 => {
  const edges = without(removed);
  return {
    removed,
    lostEdges: WEB_EDGES217.filter((e) => !edges.includes(e)),
    foodless: WEB_SPECIES217.filter((s) => s !== removed && foodsOf217(s).length > 0 && foodsOf217(s, edges).length === 0),
    remaining: chains217(edges, removed).filter((c) => c.length > 1),
  };
};
export const edgeText217 = ([a, b]: Edge) => `${a}→${b}`;
export const chainText217 = (c: readonly string[]) => c.join("→");
const lowerList = (xs: readonly string[]) => (xs.length ? and(xs.map(lower)) : "—");

const allChains = chains217();
const top = WEB_SPECIES217.filter((s) => eatersOf217(s).length === 0);
const webTable = {
  layout: "table" as const,
  headers: ["Canlı", "Doğrudan besini", "Doğrudan tüketeni", "Trofik düzey(ler)i", "Çıkarılırsa besin oku kalmayan"],
  rows: WEB_SPECIES217.map((s) => [
    s,
    foodsOf217(s).length ? list(foodsOf217(s)) : "— (üretici)",
    eatersOf217(s).length ? list(eatersOf217(s)) : "—",
    levels217(s).join(" ve "),
    removal217(s).foodless.length ? list(removal217(s).foodless) : "—",
  ]),
};
const multiLevel = WEB_SPECIES217.filter((s) => levels217(s).length > 1);
const consumers = WEB_SPECIES217.filter((s) => !producers217.includes(s));
const singleFood = consumers.filter((s) => foodsOf217(s).length === 1);

guard(producers217.length === 1 && top.length === 1, "ağda tek üretici ve tek son tüketici vardır");
guard(allChains.length === 3, "ağda üç besin zinciri vardır");
guard(multiLevel.length === 1 && multiLevel[0] === top[0] && levels217(top[0]).join() === "3,4", "yalnız son tüketici iki düzeyde (3 ve 4) yer alır");
guard(WEB_SPECIES217.every((s) => removal217(s).foodless.every((f) => foodsOf217(f).every((x) => x === s))), "besin oku kalmayan her tür yalnız çıkarılan türle besleniyordu");
guard(removal217("Kurbağa").foodless.length === 0 && foodsOf217("Şahin").length === 3, "şahinin üç besini olduğundan tek av çıkarılınca besin oku kalır");

export const webSection217: GuideSection = {
  title: "Besin ağını tablo olarak oku: besin, tüketen ve kopan oklar",
  paragraphs: [
    `Ağda ${WEB_EDGES217.length} ok vardır ve her ok besinden tüketiciye gider: ${list(WEB_EDGES217.map(edgeText217))}. Tablodaki her hücre yalnız bu listeden okunur. Bir canlının doğrudan besini ona gelen oklar, doğrudan tüketeni ondan çıkan oklardır. Üretici: ${lower(producers217[0])}. Son tüketici: ${lower(top[0])}.`,
    `Üreticiden son tüketiciye ${allChains.length} zincir vardır: ${list(allChains.map(chainText217))}. Trofik düzey, zincirde üreticiden başlayarak sayılan sıradır. ${top[0]} ${and(levels217(top[0]).map(String))}. düzeylerde yer alır, çünkü ona ulaşan yolların uzunluğu farklıdır. Diğer tüketicilerin her biri tek düzeydedir.`,
    `Bir tür çıkarılınca kesin olan önce silinen oklardır. Sonra her tüketicinin kalan besin okları sayılır. Hiç oku kalmayan tüketici, bu modelde besinsiz kalır. Tek besin oku olan tüketiciler (${lowerList(singleFood)}) o besin çıkarılınca besinsiz kalır. ${top[0]} ${foodsOf217(top[0]).length} besinle bağlıdır: avlarından biri çıkarılsa da besin oku kalır. Çizimde görünmeyen besinler gerçek doğada bulunabilir; bu sonuçlar nüfus büyüklüğünü değil, ağın yapısını söyler.`,
  ],
  table: webTable,
};

export const exampleRemoved217: Species217 = "Fare";
const fareGone = removal217(exampleRemoved217);
guard(fareGone.foodless.length === 1 && fareGone.remaining.length === 1, "fare çıkarılınca bir tür besinsiz kalır, bir zincir kalır");
const throughCount = (s: Species217) => allChains.filter((c) => c.includes(s)).length;
const middle = consumers.filter((s) => !top.includes(s));
export const chainCounts217 = middle.map((s) => ({ species: s, count: throughCount(s) }));
const maxThrough = Math.max(...chainCounts217.map(({ count }) => count));
export const mostCritical217 = chainCounts217.filter(({ count }) => count === maxThrough).map(({ species }) => species);
guard(mostCritical217.length === 1, "en çok zinciri koparan ara tüketici tektir");

export const webExamples217: WorkedExample[] = [
  {
    title: `${exampleRemoved217} çıkarılınca ağda kesin olarak ne değişir?`,
    prompt: `Bir besin ağında oklar besinden tüketiciye gider: ${list(WEB_EDGES217.map(edgeText217))}. Başka besin ilişkisi olmadığı varsayılıyor. ${exampleRemoved217} ağdan çıkarılırsa hangi oklar silinir, hangi tüketicinin besin oku kalmaz ve kaç zincir kalır?`,
    strategy: "Çıkarılan türe gelen ve ondan çıkan okları sil. Sonra her tüketicinin kalan besin oklarını say; sıfır kalan besinsiz kalır. Son olarak zincirleri yeniden izle.",
    steps: [
      { label: "Silinen oklar", expression: list(fareGone.lostEdges.map(edgeText217)), explanation: `${fareGone.lostEdges.length} ok; hepsinin bir ucunda ${lower(exampleRemoved217)} var.` },
      ...consumers.filter((s) => s !== exampleRemoved217).map((s) => ({
        label: s,
        expression: `kalan besin: ${lowerList(foodsOf217(s, without(exampleRemoved217)))}`,
        explanation: foodsOf217(s, without(exampleRemoved217)).length ? "Besin oku kalır." : "Besin oku kalmaz.",
      })),
      { label: "Kalan zincir", expression: list(fareGone.remaining.map(chainText217)), explanation: `${allChains.length} zincirden ${fareGone.remaining.length} tanesi kalır.` },
    ],
    answer: `${fareGone.lostEdges.length} ok silinir (${list(fareGone.lostEdges.map(edgeText217))}). Besin oku kalmayan tüketici ${lowerList(fareGone.foodless)}. ${allChains.length} zincirden ${fareGone.remaining.length} tanesi kalır: ${list(fareGone.remaining.map(chainText217))}.`,
    check: `${top[0]} için kalan besin okları: ${lowerList(foodsOf217(top[0], without(exampleRemoved217)))}. Yılan→Şahin oku ağda durur ama yılanın besini yoktur.`,
    pitfall: "Şahinin de kesin yok olacağını söylemek. Şahinin kurbağa oku kalır; ağ yalnız yapıyı söyler, nüfusu ölçmez.",
  },
  {
    title: "Hangi ara tüketici en çok zinciri koparır?",
    prompt: `Aynı ağda (${list(WEB_EDGES217.map(edgeText217))}) üretici ve son tüketici dışındaki türlerden hangisinin çıkarılması en çok besin zincirini koparır? Her türün kaç zincirde yer aldığını bul.`,
    strategy: "Önce üreticiden son tüketiciye bütün zincirleri yaz. Bir tür çıkarılınca o türü içeren her zincir kopar; türün geçtiği zincirleri say.",
    steps: [
      { label: "Zincirler", expression: list(allChains.map(chainText217)), explanation: `Toplam ${allChains.length} zincir.` },
      ...chainCounts217.map(({ species, count }) => ({ label: species, expression: `${count} zincir`, explanation: count === maxThrough ? "En büyük sayı." : "Daha az zincirde." })),
    ],
    answer: `${mostCritical217[0]}: ${maxThrough} zincirde yer alır, çıkarılınca ${allChains.length} zincirden ${maxThrough} tanesi kopar. ${chainCounts217.filter(({ count }) => count !== maxThrough).map(({ species }) => species).join(", ")} birer zincirdedir.`,
    check: `Kalan zincir sayısı ${removal217(mostCritical217[0]).remaining.length} = ${allChains.length} − ${maxThrough}.`,
    pitfall: "En çok okla bağlı türün her zaman en çok zinciri taşıdığını sanmak. Ok değil, üreticiden sona giden yollar sayılır.",
  },
];

export const webSupplement217 = {
  title: webSection217.title,
  figureTitle: webSection217.title,
  paragraphs: webSection217.paragraphs,
  summary: `Gelen oklar besin, çıkan oklar tüketendir. Ağdaki ${allChains.length} zincirde ${lower(top[0])} ${levels217(top[0]).join(" ve ")}. düzeydedir. Tür çıkarılınca önce okları sil, sonra kalan besin okunu say: ${consumers.filter((s) => removal217(s).foodless.length).map((s) => `${lower(s)} çıkarsa ${lowerList(removal217(s).foodless)}`).join(", ")} besinsiz kalır. ${mostCritical217[0]} ${maxThrough} zinciri koparır.`,
  appendSection: true as const,
  table: webTable,
  examples: webExamples217,
};

/* =================================================================
 * 3 · besin-piramidi: yüzde on modeliyle enerji tablosu
 * ================================================================= */

/** Dersin modeli: her beslenme aktarımında verim yüzde 10. */
export const EFFICIENCY217 = 0.1;
export const PRODUCER_KJ217 = 10000;
export const ENERGY_UNIT217 = "kJ/m²/yıl";
export const LEVEL_NAMES217 = ["Üretici", "Birincil tüketici", "İkincil tüketici", "Üçüncül tüketici"] as const;
/** k. trofik düzeye ulaşan enerji: üretici × verim^(k−1). */
export const energyAt217 = (level: number, start = PRODUCER_KJ217, eff = EFFICIENCY217) => Math.round(start * eff ** (level - 1) * 1e6) / 1e6;
export const energyLevels217 = LEVEL_NAMES217.map((name, i) => {
  const level = i + 1;
  const energy = energyAt217(level);
  const next = i + 1 < LEVEL_NAMES217.length ? energyAt217(level + 1) : null;
  return { level, name, energy, share: (energy / PRODUCER_KJ217) * 100, notPassed: next === null ? null : Math.round((energy - next) * 1e6) / 1e6 };
});
const pct = (x: number) => `%${num217(x)}`;
const pyramidTable = {
  layout: "table" as const,
  headers: ["Trofik düzey", "Canlı grubu", `Enerji (${ENERGY_UNIT217})`, "Üreticideki enerjinin payı", "Sonraki düzeye geçmeyen"],
  rows: energyLevels217.map((l) => [`${l.level}. düzey`, l.name, num217(l.energy), pct(l.share), l.notPassed === null ? "— (zincirin sonu)" : num217(l.notPassed)]),
};
const lastLevel = energyLevels217[energyLevels217.length - 1];
const lostTotal = energyLevels217.reduce((s, l) => s + (l.notPassed ?? 0), 0);
const effPct = num217(EFFICIENCY217 * 100);

guard(energyLevels217.every((l, i, xs) => i === 0 || Math.abs(l.energy - xs[i - 1].energy * EFFICIENCY217) < 1e-9), "her düzey bir öncekinin yüzde onunu alır");
guard(Math.abs(lostTotal + lastLevel.energy - PRODUCER_KJ217) < 1e-9, "geçmeyenlerin toplamı ile son düzey üreticinin enerjisine eşittir");
guard(energyLevels217.every((l, i, xs) => i === 0 || l.energy < xs[i - 1].energy), "enerji üst düzeye çıktıkça azalır");
guard(energyLevels217[2].name === "İkincil tüketici" && energyLevels217[2].level === 3, "ikincil tüketici 3. düzeydir");

export const pyramidSection217: GuideSection = {
  title: "Yüzde on modeliyle dört düzeyin enerji tablosu",
  paragraphs: [
    `Tabloda üretici aynı alan ve sürede ${num217(PRODUCER_KJ217)} ${ENERGY_UNIT217} enerji bağlar ve her beslenme aktarımında verim %${effPct} kabul edilir. Bu dersin modelidir, doğa sabiti değildir. Her düzey bir öncekinin ${num217(EFFICIENCY217)}’ini alır: ${energyLevels217.map((l) => num217(l.energy)).join(" → ")}. ${lastLevel.level}. düzeye ${lastLevel.level - 1} geçişle ulaşılır; pay ${num217(EFFICIENCY217)}${sup(lastLevel.level - 1)} = ${pct(lastLevel.share)} olur.`,
    `Sonraki düzeye geçmeyen enerji yok olmaz. Bir bölümü solunumla ısıya dönüşür; yenmeyen ve sindirilmeyen bölüm detritus yoluna gider ve ayrıştırıcıları besleyebilir. Geçmeyenlerin toplamı ${energyLevels217.filter((l) => l.notPassed !== null).map((l) => num217(l.notPassed!)).join(" + ")} = ${num217(lostTotal)}; buna son düzeydeki ${num217(lastLevel.energy)} eklenince ${num217(PRODUCER_KJ217)} bulunur.`,
    `Düzey numarası tüketici adından bir fazladır: ${lower(energyLevels217[2].name)} ${energyLevels217[2].level}. düzeydir ve oraya ${energyLevels217[2].level - 1} geçişle varılır. Ters soruda hedef düzeydeki enerjiyi her geçiş için ${num217(EFFICIENCY217)}’e böl. Soruda başka verim verilmişse onu kullan.`,
  ],
  table: pyramidTable,
};

export const targetEnergy217 = 25;
export const targetLevel217 = 4;
const inverse = Array.from({ length: targetLevel217 }, (_, i) => Math.round(targetEnergy217 / EFFICIENCY217 ** (targetLevel217 - 1 - i) * 1e6) / 1e6);
export const requiredProducer217 = inverse[0];
guard(Math.abs(energyAt217(targetLevel217, requiredProducer217) - targetEnergy217) < 1e-9, "ters hesap ileri hesapla doğrulanır");

/** Temsilî sayım: birey sayısı ve bireyin ortalama kuru kütlesi (g). */
export const COUNT_CHAIN217 = [
  { name: "Ağaç", count: 1, massG: 300000 },
  { name: "Tırtıl", count: 1500, massG: 0.2 },
  { name: "Böcekçil kuş", count: 10, massG: 5 },
] as const;
export const biomass217 = COUNT_CHAIN217.map((x) => Math.round(x.count * x.massG * 1e6) / 1e6);
const inverted = (xs: readonly number[]) => xs.some((x, i) => i > 0 && x > xs[i - 1]);
export const countInverted217 = inverted(COUNT_CHAIN217.map((x) => x.count));
export const biomassInverted217 = inverted(biomass217);
guard(countInverted217 && !biomassInverted217, "temsilî sayımda sayı piramidi ters, biyokütle piramidi düzdür");

export const pyramidExamples217: WorkedExample[] = [
  {
    title: "Hedef düzeyden üreticiye geri dön",
    prompt: `Bir besin zincirinde ${lower(LEVEL_NAMES217[targetLevel217 - 1])} (${targetLevel217}. trofik düzey) aynı alan ve sürede ${num217(targetEnergy217)} ${ENERGY_UNIT217} enerji alıyor. Her aktarımda verim %${effPct} kabul ediliyor. Üretici en az ne kadar enerji bağlamış olmalıdır? Ara düzeyleri de yaz.`,
    strategy: `Geçiş sayısı hedef düzey − 1’dir. İleri yönde her geçişte ${num217(EFFICIENCY217)} ile çarpıldığı için geri yönde her geçişte ${num217(EFFICIENCY217)}’e böl.`,
    steps: [
      { label: "Geçiş sayısı", expression: `${targetLevel217} − 1 = ${targetLevel217 - 1}`, explanation: "Üretici 1. düzeydir." },
      ...inverse.slice(0, -1).reverse().map((e, i) => ({
        label: `${targetLevel217 - 1 - i}. düzey`,
        expression: `${num217(inverse[targetLevel217 - 1 - i])} ÷ ${num217(EFFICIENCY217)} = ${num217(e)}`,
        explanation: `${LEVEL_NAMES217[targetLevel217 - 2 - i]}.`,
      })),
    ],
    answer: `Üretici en az ${num217(requiredProducer217)} ${ENERGY_UNIT217} bağlamalıdır. Ara düzeyler: ${inverse.slice(1, -1).map(num217).join(" ve ")}.`,
    check: `${num217(requiredProducer217)} × ${num217(EFFICIENCY217)}${sup(targetLevel217 - 1)} = ${num217(energyAt217(targetLevel217, requiredProducer217))}.`,
    pitfall: "Üçüncül tüketiciyi üçüncü düzey sayıp yalnız iki kez bölmek. Üçüncül tüketici dördüncü düzeydir; üç geçiş vardır.",
  },
  {
    title: "Aynı zincirde sayı ters, biyokütle düz",
    prompt: `Aynı alanda temsilî bir sayım yapılıyor: ${COUNT_CHAIN217.map((x) => `${num217(x.count)} ${lower(x.name)} (bireyin ortalama kuru kütlesi ${num217(x.massG)} g)`).join(", ")}. Zincir ağaç → tırtıl → böcekçil kuş biçimindedir. Sayı ve biyokütle piramitlerinden hangisi terstir? Bu veriden enerji piramidi çizilebilir mi?`,
    strategy: "Sayı piramidi için birey sayılarını, biyokütle piramidi için birey sayısı × bireyin kütlesini düzey düzey karşılaştır. Bir üst düzey alttakinden büyükse o piramit terstir.",
    steps: [
      { label: "Sayılar", expression: COUNT_CHAIN217.map((x) => num217(x.count)).join(" · "), explanation: countInverted217 ? "Tırtıl sayısı ağaç sayısından büyük: sayı piramidi tabanda ters." : "Sayılar yukarı azalır." },
      ...COUNT_CHAIN217.map((x, i) => ({ label: `${x.name} biyokütlesi`, expression: `${num217(x.count)} × ${num217(x.massG)} g = ${num217(biomass217[i])} g`, explanation: "Birey sayısı × bireyin kuru kütlesi." })),
      { label: "Biyokütle", expression: biomass217.map((b) => `${num217(b)} g`).join(" > "), explanation: biomassInverted217 ? "Bir üst düzey büyük: ters." : "Her üst düzey daha küçük: biyokütle piramidi düz." },
    ],
    answer: `Sayı piramidi terstir (${COUNT_CHAIN217.map((x) => num217(x.count)).join(", ")}); biyokütle piramidi düzdür (${biomass217.map((b) => `${num217(b)} g`).join(" > ")}). Enerji piramidi bu veriden çizilemez: aynı süredeki enerji akışı ölçülmemiştir.`,
    check: `Ağacın biyokütlesi tırtılların ${num217(biomass217[0] / biomass217[1])} katıdır; tek birey sayımı bu kütleyi gizler.`,
    pitfall: "Anlık kuru kütleyi yüzde on kuralıyla çarpıp enerji bulmaya çalışmak. Kütle bir stoktur; enerji piramidi süre içindeki akışı gösterir.",
  },
];

export const pyramidSupplement217 = {
  title: pyramidSection217.title,
  figureTitle: pyramidSection217.title,
  paragraphs: pyramidSection217.paragraphs,
  summary: `%${effPct} modeli: ${energyLevels217.map((l) => num217(l.energy)).join(" → ")} ${ENERGY_UNIT217}; k. düzeye k − 1 geçiş, pay ${num217(EFFICIENCY217)}^(k−1). Geçmeyen enerji ısıya ya da detritusa gider, yok olmaz. Ters soruda her geçişte ${num217(EFFICIENCY217)}’e böl. İkincil tüketici 3. düzeydir.`,
  appendSection: true as const,
  table: pyramidTable,
  examples: pyramidExamples217,
};

/* =================================================================
 * 4 · madde-donguleri: bir azot atomunun sıralı yolu
 * ================================================================= */

export interface CycleStep217 { process: string; group: string; from: string; to: string; place: string }
/** Dersteki süreçlerden kurulan bir kapalı azot yolu; her basamağın ürünü sonrakinin başlangıç maddesidir. */
export const NITROGEN_STEPS217: CycleStep217[] = [
  { process: "Biyolojik fiksasyon", group: "Bazı prokaryotlar (baklagil köklerindeki ortak bakteriler, bazı siyanobakteriler)", from: "N₂", to: "NH₄⁺", place: "Atmosfer → toprak" },
  { process: "Asimilasyon", group: "Bitkiler", from: "NH₄⁺", to: "bitkideki organik azot", place: "Toprak → bitki" },
  { process: "Beslenme", group: "Otçul tüketiciler", from: "bitkideki organik azot", to: "hayvandaki organik azot", place: "Bitki → hayvan" },
  { process: "Amonifikasyon", group: "Ayrıştırıcılar (bazı bakteriler ve mantarlar)", from: "hayvandaki organik azot", to: "NH₄⁺", place: "Atık ve ölü kalıntı → toprak" },
  { process: "Nitrifikasyon, 1. basamak", group: "Aerobik kemoototrof bakteriler", from: "NH₄⁺", to: "NO₂⁻", place: "Toprak" },
  { process: "Nitrifikasyon, 2. basamak", group: "Aerobik kemoototrof bakteriler", from: "NO₂⁻", to: "NO₃⁻", place: "Toprak" },
  { process: "Denitrifikasyon", group: "Denitrifikasyon yapan mikroorganizmalar (oksijeni az ortam)", from: "NO₃⁻", to: "N₂", place: "Toprak → atmosfer" },
];
/** Basamaklar zincirleniyor mu, son ürün ilk başlangıca dönüyor mu? */
export const linksUp217 = (steps: readonly { from: string; to: string }[], closed: boolean) =>
  steps.every((s, i) => i === 0 || steps[i - 1].to === s.from) && (!closed || steps[steps.length - 1].to === steps[0].from);
/** Karışık kartları başlangıç maddesinden izleyerek sıralar. */
export const orderSteps217 = <T extends { from: string; to: string }>(cards: readonly T[], start: string): T[] => {
  const left = [...cards];
  const out: T[] = [];
  let at = start;
  while (left.length) {
    const i = left.findIndex((c) => c.from === at);
    if (i < 0) throw new Error(`depth217: ${at} maddesinden başlayan kart yok`);
    const [c] = left.splice(i, 1);
    out.push(c);
    at = c.to;
  }
  return out;
};
const transform = (s: { from: string; to: string }) => `${s.from} → ${s.to}`;
const cycleTable = {
  layout: "table" as const,
  headers: ["Sıra", "Süreç", "Canlı grubu", "Madde dönüşümü", "Azotun yeri"],
  rows: NITROGEN_STEPS217.map((s, i) => [String(i + 1), s.process, s.group, transform(s), s.place]),
};
const fromN2 = NITROGEN_STEPS217.filter((s) => s.from === "N₂");
const toN2 = NITROGEN_STEPS217.filter((s) => s.to === "N₂");
const nitrif = NITROGEN_STEPS217.filter((s) => s.process.startsWith("Nitrifikasyon"));
const ammoniumVisits = NITROGEN_STEPS217.filter((s) => s.to === "NH₄⁺");

guard(linksUp217(NITROGEN_STEPS217, true), "her basamağın ürünü sonrakinin başlangıcıdır ve yol N₂’ye döner");
guard(fromN2.length === 1 && fromN2[0].process === "Biyolojik fiksasyon", "N₂’yi yalnız fiksasyon alır");
guard(toN2.length === 1 && toN2[0].process === "Denitrifikasyon", "N₂’ye yalnız denitrifikasyon döndürür");
guard(nitrif.length === 2 && nitrif[0].from === "NH₄⁺" && nitrif[1].to === "NO₃⁻", "nitrifikasyon NH₄⁺ ile başlar, NO₂⁻ üzerinden NO₃⁻’e gider");
guard(ammoniumVisits.length === 2, "yolda NH₄⁺ iki kez oluşur: fiksasyon ve amonifikasyon");

export const cycleSection217: GuideSection = {
  title: "Bir azot atomunun döngüdeki yolu: süreç, canlı grubu, dönüşüm",
  paragraphs: [
    `Tablo, dersteki süreçlerden kurulmuş ${NITROGEN_STEPS217.length} basamaklı kapalı bir yoldur. Her satırın ürünü bir sonraki satırın başlangıç maddesidir; son satırın ürünü ${toN2[0].to} ilk satırın başlangıcına döner. Azot atomu yok olmaz, yalnız biçim ve yer değiştirir: ${NITROGEN_STEPS217.map((s) => s.from).join(" → ")} → ${NITROGEN_STEPS217[0].from}.`,
    `Atmosferdeki ${fromN2[0].from}’yi tabloda yalnız ${lower(fromN2[0].process)} alır. Bu basamağın canlı grubu: ${lower(fromN2[0].group)}. Nitrifikasyon ${nitrif[0].from} ile başlar ve ${nitrif[0].to} üzerinden ${nitrif[1].to}’e iki basamakta gider; ${fromN2[0].from} ile başlamaz. NH₄⁺ yolda iki kez oluşur: ${and(ammoniumVisits.map((s) => lower(s.process)))} ile. Atmosfere dönüşü ${lower(toN2[0].process)} sağlar.`,
    `Bu tek olası yol değildir. Bitkiler NO₃⁻’ü de alıp asimile eder; yıldırım gibi abiyotik süreçler de N₂’yi reaktif bileşiklere çevirir. Tablo yalnız biyolojik basamakları sıralar ve sürelerini göstermez. Karbon ve su yollarını da aynı yöntemle kur: bir basamağın ürünü sonrakinin başlangıcı olmalıdır.`,
  ],
  table: cycleTable,
};

export interface CarbonCard217 { process: string; group: string; from: string; to: string; oxygen: "açığa çıkar" | "kullanılır" | "doğrudan değişmez" }
export const CARBON_CARDS217: CarbonCard217[] = [
  { process: "Solunum", group: "Çekirge", from: "çekirgedeki organik karbon", to: "CO₂", oxygen: "kullanılır" },
  { process: "Fotosentez", group: "Ot", from: "CO₂", to: "otun organik karbonu", oxygen: "açığa çıkar" },
  { process: "Beslenme", group: "Çekirge", from: "otun organik karbonu", to: "çekirgedeki organik karbon", oxygen: "doğrudan değişmez" },
];
export const carbonOrder217 = orderSteps217(CARBON_CARDS217, "CO₂");
guard(linksUp217(carbonOrder217, true), "karbon kartları CO₂’den başlayıp CO₂’ye döner");

export type Phase217 = "sıvı" | "gaz";
export interface WaterCard217 { process: string; from: string; to: string; fromPhase: Phase217; toPhase: Phase217; living: boolean }
export const WATER_CARDS217: WaterCard217[] = [
  { process: "Yağış", from: "buluttaki su damlacığı", to: "toprak suyu", fromPhase: "sıvı", toPhase: "sıvı", living: false },
  { process: "Terleme", from: "bitkideki su", to: "su buharı", fromPhase: "sıvı", toPhase: "gaz", living: true },
  { process: "Buharlaşma", from: "göl suyu", to: "atmosferdeki su buharı", fromPhase: "sıvı", toPhase: "gaz", living: false },
  { process: "Kökle alım", from: "toprak suyu", to: "bitkideki su", fromPhase: "sıvı", toPhase: "sıvı", living: true },
  { process: "Yoğuşma", from: "atmosferdeki su buharı", to: "buluttaki su damlacığı", fromPhase: "gaz", toPhase: "sıvı", living: false },
];
export const waterOrder217 = orderSteps217(WATER_CARDS217, "göl suyu");
export const phaseChanges217 = waterOrder217.filter((c) => c.fromPhase !== c.toPhase);
export const livingSteps217 = waterOrder217.filter((c) => c.living);
guard(linksUp217(waterOrder217, false), "su kartları göl suyundan başlayıp zincirlenir");

export const cycleExamples217: WorkedExample[] = [
  {
    title: "Karbon kartlarını sırala, oksijeni izle",
    prompt: `Atmosferdeki CO₂’de bulunan bir karbon atomu bir çekirgenin vücuduna girip yeniden atmosfere dönüyor. Karışık verilen kartlar: ${CARBON_CARDS217.map((c) => `${c.process} (${c.group}: ${transform(c)})`).join("; ")}. Kartları sırala. Her basamakta O₂ açığa mı çıkar, kullanılır mı?`,
    strategy: "CO₂ ile başlayan kartı bul; sonra her kartın ürünüyle başlayan kartı ara. Oksijeni fotosentez ve solunum denklemlerinden oku.",
    steps: carbonOrder217.map((c, i) => ({ label: `${i + 1}. ${c.process}`, expression: transform(c), explanation: `${c.group}; O₂ ${c.oxygen}.` })),
    answer: `${carbonOrder217.map((c) => c.process).join(" → ")}. ${carbonOrder217.map((c) => `${c.process}: O₂ ${c.oxygen}`).join("; ")}.`,
    check: `Son kartın ürünü ${carbonOrder217[carbonOrder217.length - 1].to}, ilk kartın başlangıcıdır: yol kapanır.`,
    pitfall: "Otun yalnız oksijen verdiğini düşünmek. Ot da solunum yapar; bu yolda karbonu çekirge solunumla döndürür.",
  },
  {
    title: "Göl suyundan bitki terlemesine: hal değişimini say",
    prompt: `Bir su molekülünün yolu için karışık kartlar veriliyor: ${WATER_CARDS217.map((c) => `${c.process} (${transform(c)})`).join("; ")}. Yol göl suyundan başlıyor. Kartları sırala. Kaç basamakta hal değişir ve hangi basamaklarda bir canlı rol alır?`,
    strategy: "Göl suyuyla başlayan kartı bul, sonra ürün → başlangıç eşleşmesiyle ilerle. Her kartta başlangıç ve ürünün hâlini karşılaştır.",
    steps: waterOrder217.map((c, i) => ({
      label: `${i + 1}. ${c.process}`,
      expression: `${c.fromPhase} → ${c.toPhase}`,
      explanation: `${c.fromPhase === c.toPhase ? "Hal değişmez" : "Hal değişir"}${c.living ? "; bitki rol alır" : ""}.`,
    })),
    answer: `${waterOrder217.map((c) => c.process).join(" → ")}. ${phaseChanges217.length} basamakta hal değişir (${and(phaseChanges217.map((c) => lower(c.process)))}); bitki ${livingSteps217.length} basamakta rol alır (${and(livingSteps217.map((c) => lower(c.process)))}).`,
    check: `Yol ${waterOrder217[0].from} ile başlar, ${waterOrder217[waterOrder217.length - 1].to} ile biter; su yine atmosfere döner.`,
    pitfall: "Yağışı hal değişimi saymak. Bu yolda yağış sıvı damlacığın yüzeye düşmesidir; hal yoğuşmada değişmiştir.",
  },
];

export const cycleSupplement217 = {
  title: cycleSection217.title,
  figureTitle: cycleSection217.title,
  paragraphs: cycleSection217.paragraphs,
  summary: `Azot yolu: ${NITROGEN_STEPS217.map((s) => lower(s.process.replace(", 1. basamak", "").replace(", 2. basamak", ""))).filter((p, i, xs) => xs.indexOf(p) === i).join(" → ")}. N₂’yi yalnız fiksasyon alır, denitrifikasyon geri verir. Nitrifikasyon NH₄⁺ → NO₂⁻ → NO₃⁻. Her basamağın ürünü sonrakinin başlangıcıdır.`,
  appendSection: true as const,
  table: cycleTable,
  examples: cycleExamples217,
};

/* =================================================================
 * 5 · guncel-cevre-sorunlari: kaynak → mekanizma → etki → gösterge
 * ================================================================= */

export type Link217 = "kaynak" | "taşınma" | "habitat onarımı";
export const ACID_GASES217 = "kükürt dioksit ve azot oksitler";
export interface Issue217 { name: string; short: string; source: string; mechanism: string; effect: string; indicator: string; chain: string[] }
export const ISSUES217: Issue217[] = [
  {
    name: "Sera etkisinin artması", short: "Sera etkisi",
    source: "Fosil yakıt yanmasıyla artan CO₂ gibi sera gazları",
    mechanism: "Gazlar yeryüzünün yaydığı kızılötesi enerjiyle etkileşir; enerji dengesi değişir",
    effect: "Uzun dönemli sıcaklık ve yağış örüntüleri değişir (iklim değişimi)",
    indicator: "Uzun dönemli sıcaklık ve yağış kayıtları",
    chain: ["Sera gazı salımı", "Kızılötesi enerji dengesi değişir", "Uzun dönemli iklim değişir"],
  },
  {
    name: "Ozon tabakasının incelmesi", short: "Ozon incelmesi",
    source: "Kloroflorokarbonlar (CFC) gibi ozonu parçalayan gazlar",
    mechanism: "Stratosferik ozon azalır; morötesi ışınımın soğurulan bölümü küçülür",
    effect: "Yüzeye ulaşan zararlı morötesi ışınım artar",
    indicator: "Ozon sütunu ve yüzey UV düzeyi",
    chain: ["Ozonu parçalayan gaz salımı", "Stratosferik ozon azalır", "Yüzeye daha çok morötesi ulaşır"],
  },
  {
    name: "Asit yağmuru", short: "Asit yağmuru",
    source: `Fosil yakıt ve sanayiden çıkan ${ACID_GASES217}`,
    mechanism: "Gazlar atmosferde asitlere dönüşür ve yağışla çökelir",
    effect: "Tamponlama kapasitesi düşük göl ve topraklar asitleşir; canlılar etkilenir",
    indicator: "Yağış pH’ı ve ilgili iyonlar",
    chain: ["SO₂ ve azot oksit salımı", "Atmosferde aside dönüşüm", "Yağışla göl ve toprağa çökelme"],
  },
  {
    name: "Ötrofikasyon", short: "Ötrofikasyon",
    source: "Gübre ve atık sudan suya taşınan azot ve fosfor",
    mechanism: "Alg artar; ölen organik madde ayrıştırılırken aerobik ayrıştırıcıların solunumu çözünmüş oksijeni tüketir",
    effect: "Balıklar ve diğer canlılar üzerinde oksijen baskısı",
    indicator: "Besleyici girişi ve çözünmüş oksijen",
    chain: ["Besleyici girişi", "Alg artışı", "Organik kalıntı birikir", "Ayrıştırıcı solunumu O₂’yi tüketir"],
  },
  {
    name: "Biyolojik çeşitlilik kaybı", short: "Çeşitlilik kaybı",
    source: "Yol yapımı ve arazi kullanımıyla habitatın parçalanması",
    mechanism: "Habitat alanı küçülür; parçalar arasında hareket ve gen alışverişi azalır",
    effect: "Tür zenginliği ve genetik çeşitlilik azalabilir",
    indicator: "Tür sayısı ve habitat bağlantısı",
    chain: ["Habitat parçalanır", "Bağlantı ve gen alışverişi azalır", "Tür zenginliği azalabilir"],
  },
];
const issueByShort = (short: string) => ISSUES217.find((i) => i.short === short)!;
const envTable = {
  layout: "table" as const,
  headers: ["Sorun", "Kaynak", "Mekanizma", "Canlılara etkisi", "İzlenecek gösterge"],
  rows: ISSUES217.map((i) => [i.name, i.source, i.mechanism, i.effect, i.indicator]),
};
const [green, ozone, acid, eutro] = ISSUES217;

guard(green.mechanism.includes("kızılötesi") && !green.mechanism.includes("morötesi") && ozone.mechanism.includes("morötesi") && !ozone.mechanism.includes("kızılötesi"),
  "sera etkisi kızılötesi, ozon incelmesi morötesi ışınımla ilgilidir");
guard(eutro.chain.findIndex((c) => c.includes("Ayrıştırıcı")) > eutro.chain.findIndex((c) => c.includes("Alg")) && eutro.chain.findIndex((c) => c.includes("Alg")) > 0,
  "ötrofikasyonda oksijeni tüketen ayrıştırıcı solunumu alg artışından sonra gelir");
guard(new Set(ISSUES217.map((i) => i.indicator)).size === ISSUES217.length, "her sorunun göstergesi ayrıdır");
guard(acid.source.includes(ACID_GASES217) && !acid.source.includes("CO₂"), "asit yağmurunun kaynağı SO₂ ve azot oksitlerdir, CO₂ değil");
guard(ISSUES217.every((i) => i === eutro || i.chain.length < eutro.chain.length), "ötrofikasyonun zinciri en uzunudur");
guard(green.source.includes("CO₂") && ozone.source.includes("CFC"), "sera etkisinde CO₂, ozon incelmesinde CFC gibi gazlar kaynaktır");

export const envSection217: GuideSection = {
  title: "Beş çevre sorunu: kaynak, mekanizma, etki, gösterge",
  paragraphs: [
    `Tablo ${ISSUES217.length} sorunu aynı sırayla açar: kaynak, mekanizma, canlılara etkisi ve izlenecek gösterge. Önce kaynağı bul, sonra maddenin ya da ışınımın nasıl etki ettiğini, en son hangi ölçümün sorunu gösterdiğini yaz. Ötrofikasyonun zinciri en uzunudur: ${eutro.chain.map(lower).join(" → ")}.`,
    `${green.name} ile ${lower(ozone.name)} farklı ışınımlarla ilgilidir. Sera gazları kızılötesi enerji dengesini değiştirir; ozon incelmesinde morötesinin soğurulan bölümü küçülür. Asit yağmurunun kaynak sütununda ${ACID_GASES217} yer alır; CO₂ yer almaz.`,
    `Göstergeyi mekanizmayla eşleştir: ${ISSUES217.map((i) => `${lower(i.short)} için ${lower(i.indicator)}`).join("; ")}. Müdahale de bir halkaya yöneltilir: kaynağı azaltmak, taşınma yolunu kesmek ya da etkilenen habitatı onarmak. Bu tablo süreç sırasını verir; sayısal tahmin yapmaz.`,
  ],
  table: envTable,
};

export interface Action217 { text: string; issue: string; link: Link217 }
export const ACTIONS217: Action217[] = [
  { text: "termik santral bacasına kükürt dioksiti hedefleyen arıtma takmak", issue: "Asit yağmuru", link: "kaynak" },
  { text: "ozonu parçalayan gazların üretimini ve kullanımını bırakmak", issue: "Ozon incelmesi", link: "kaynak" },
  { text: "tarla ile göl arasına gübreli yüzey akışını tutan bitki şeridi bırakmak", issue: "Ötrofikasyon", link: "taşınma" },
  { text: "yolla bölünen ormanın parçalarını ekolojik koridorla bağlamak", issue: "Çeşitlilik kaybı", link: "habitat onarımı" },
];
guard(ACTIONS217.every((a) => ISSUES217.some((i) => i.short === a.issue)), "her müdahale tablodaki bir soruna bağlıdır");
guard(ACTIONS217[2].link === "taşınma" && ACTIONS217[2].issue === eutro.short, "bitki şeridi ötrofikasyonda taşınma yolunu keser");

export interface Observation217 { label: string; text: string; keyword: string }
export const OBSERVATIONS217: Observation217[] = [
  { label: "A", text: "Gölde besleyici girişi yüksek, çözünmüş oksijen gece düşüyor.", keyword: "çözünmüş oksijen" },
  { label: "B", text: "Ozon sütunu azalmış, yüzey UV düzeyi artmış.", keyword: "Ozon sütunu" },
  { label: "C", text: "Yağış pH’ı düşük, ilgili iyonlar yüksek.", keyword: "pH" },
  { label: "D", text: "Kıyıda kuş sayısı 100’den 120’ye çıkmış, tür sayısı 12’den 8’e düşmüş.", keyword: "Tür sayısı" },
];
export const matchObservation217 = (o: Observation217) => {
  const hits = ISSUES217.filter((i) => i.indicator.toLocaleLowerCase("tr-TR").includes(o.keyword.toLocaleLowerCase("tr-TR")));
  if (hits.length !== 1) throw new Error(`depth217: ${o.label} gözlemi tek göstergeyle eşleşmiyor`);
  return hits[0];
};
export const birds217 = { before: 100, after: 120, speciesBefore: 12, speciesAfter: 8 };
guard(birds217.after > birds217.before && birds217.speciesAfter < birds217.speciesBefore, "birey sayısı artarken tür sayısı azalmıştır");

export const envExamples217: WorkedExample[] = [
  {
    title: "Her müdahale hangi sorunun hangi halkasını keser?",
    prompt: `Dört müdahale öneriliyor: ${ACTIONS217.map((a, i) => `${i + 1}) ${a.text}`).join("; ")}. Her biri hangi çevre sorununa yöneliktir? Kaynağı mı azaltır, taşınma yolunu mu keser, yoksa etkilenen habitatı mı onarır?`,
    strategy: "Müdahalenin dokunduğu maddeyi ya da yapıyı bul, tablodaki kaynak sütunuyla eşleştir. Madde oluşmadan önce durduruluyorsa kaynak, oluştuktan sonra hedefe varmadan tutuluyorsa taşınma, zarar görmüş alan bağlanıyorsa habitat onarımıdır.",
    steps: ACTIONS217.map((a, i) => ({ label: `${i + 1}`, expression: `${a.issue} · ${a.link}`, explanation: `Tablodaki kaynak: ${lower(issueByShort(a.issue).source)}.` })),
    answer: ACTIONS217.map((a, i) => `${i + 1}) ${lower(a.issue)}, ${a.link}`).join("; ") + ".",
    check: `Kaynağa yönelen ${ACTIONS217.filter((a) => a.link === "kaynak").length} müdahale de maddeyi oluşmadan durdurur; bitki şeridi gübreyi tarlada oluştuktan sonra yolda tutar.`,
    pitfall: "Sıradan parçacık filtresini asit yağmuruna çözüm saymak. Asit yağmurunda hedef, kükürt dioksit ve azot oksit gibi gazlardır.",
  },
  {
    title: "Gözlemden soruna: göstergeyi mekanizmayla eşle",
    prompt: `Dört ayrı ölçüm raporu var. ${OBSERVATIONS217.map((o) => `${o.label}: ${o.text}`).join(" ")} Her rapor tablodaki hangi soruna işaret eder? D raporunda birey ve tür sayısındaki değişimi hesapla.`,
    strategy: "Raporda ölçülen niceliği bul ve tablodaki gösterge sütununda ara. Sayı verilmişse birey sayısı ile tür sayısını ayrı sütunlarda tut.",
    steps: [
      ...OBSERVATIONS217.map((o) => ({ label: o.label, expression: `${o.keyword} ⇒ ${matchObservation217(o).name}`, explanation: `Gösterge: ${lower(matchObservation217(o).indicator)}.` })),
      { label: "D’de sayılar", expression: `birey ${signed217(birds217.after - birds217.before)}, tür ${signed217(birds217.speciesAfter - birds217.speciesBefore)}`, explanation: "Birey artarken tür zenginliği azalmıştır." },
    ],
    answer: `${OBSERVATIONS217.map((o) => `${o.label} ${lower(matchObservation217(o).name)}`).join(", ")}. D’de birey sayısı ${num217(birds217.after - birds217.before)} artmış, tür sayısı ${num217(birds217.speciesBefore - birds217.speciesAfter)} azalmıştır.`,
    check: `B’nin ölçümü morötesiyle ilgilidir; sera etkisinin göstergesi (${lower(green.indicator)}) değildir.`,
    pitfall: "D’de toplam kuş sayısı arttı diye çeşitliliğin iyileştiğini söylemek. Tür sayısı ayrı bir göstergedir.",
  },
];

export const envSupplement217 = {
  title: envSection217.title,
  figureTitle: envSection217.title,
  paragraphs: envSection217.paragraphs,
  summary: `Kaynak → mekanizma → etki → gösterge. Sera etkisi kızılötesi, ozon incelmesi morötesi ışınımla ilgilidir. Asit yağmuru ${ACID_GASES217}den doğar, CO₂’den değil. Ötrofikasyonun son halkası: ${lower(eutro.chain[eutro.chain.length - 1])}. Müdahale kaynağı azaltır, taşınmayı keser ya da habitatı onarır.`,
  appendSection: true as const,
  table: envTable,
  examples: envExamples217,
};

/* =================================================================
 * 6 · dogal-kaynaklar-surdurulebilirlik: kaynak defteri
 * ================================================================= */

export type ResourceClass217 = "yenilenebilir" | "yenilenemez";
export interface Flow217 { label: string; amount: number }
export interface Resource217 { name: string; cls: ResourceClass217; inflow: Flow217[]; outflow: Flow217[]; unit: string; note: string }
/** Dersin temsilî bütçeleri; fosil yatak satırı aynı yöntemle kurulan temsilî bir modeldir. */
export const RESOURCES217: Resource217[] = [
  { name: "Akifer (yeraltı suyu)", cls: "yenilenebilir", inflow: [{ label: "beslenme", amount: 90 }], outflow: [{ label: "pompaj", amount: 72 }, { label: "doğal boşalım", amount: 30 }], unit: "birim/yıl", note: "pompaj girişten küçük olsa da stok azalır" },
  { name: "Aynı akifer, pompaj 60", cls: "yenilenebilir", inflow: [{ label: "beslenme", amount: 90 }], outflow: [{ label: "pompaj", amount: 60 }, { label: "doğal boşalım", amount: 30 }], unit: "birim/yıl", note: "bütçe dengelenir" },
  { name: "Balık stoğu", cls: "yenilenebilir", inflow: [{ label: "net doğal artış", amount: 40 }], outflow: [{ label: "göç", amount: 15 }, { label: "av", amount: 35 }], unit: "balık/dönem", note: "av doğal artıştan küçük olsa da stok azalır" },
  { name: "Temsilî depo", cls: "yenilenebilir", inflow: [{ label: "yenilenme", amount: 20 }], outflow: [{ label: "kullanım", amount: 30 }], unit: "birim/yıl", note: "yenilenebilir kaynak da azalabilir" },
  { name: "Fosil yakıt yatağı", cls: "yenilenemez", inflow: [{ label: "yenilenme (insan ömrü ölçeğinde)", amount: 0 }], outflow: [{ label: "çıkarım", amount: 5 }], unit: "birim/yıl", note: "her çıkarım stoğu azaltır" },
];
const total = (fs: readonly Flow217[]) => fs.reduce((s, f) => s + f.amount, 0);
export const net217 = (r: Resource217) => total(r.inflow) - total(r.outflow);
const flowText = (fs: readonly Flow217[]) => (fs.length > 1 ? `${fs.map((f) => `${num217(f.amount)} ${f.label}`).join(" + ")} = ${num217(total(fs))}` : `${num217(fs[0].amount)} ${fs[0].label}`);
const verdict = (x: number) => (x < 0 ? "azalır" : x > 0 ? "artar" : "değişmez");
const ledgerTable = {
  layout: "table" as const,
  headers: ["Kaynak (temsilî model)", "Sınıf", "Giriş", "Çıkış", "Net değişim"],
  rows: RESOURCES217.map((r) => [r.name, r.cls, flowText(r.inflow), flowText(r.outflow), `${signed217(net217(r))} ${r.unit}: stok ${verdict(net217(r))}`]),
};
const [aquifer, aquiferFixed, fish, , fossil] = RESOURCES217;
const outOf = (r: Resource217, label: string) => r.outflow.find((f) => f.label === label)!.amount;
const renewableDown = RESOURCES217.filter((r) => r.cls === "yenilenebilir" && net217(r) < 0);

guard(renewableDown.length >= 2, "yenilenebilir kaynaklar da azalabilir");
guard(RESOURCES217.filter((r) => r.cls === "yenilenemez").every((r) => total(r.inflow) === 0 && net217(r) === -total(r.outflow)), "yenilenemez kaynakta her çıkarım stoğu azaltır");
guard(outOf(aquifer, "pompaj") < total(aquifer.inflow) && net217(aquifer) < 0, "pompaj girişten küçükken akifer azalır");
guard(net217(aquiferFixed) === 0, "pompaj 60’a inince akifer bütçesi dengelenir");
guard(outOf(fish, "av") < total(fish.inflow) && net217(fish) < 0, "av doğal artıştan küçükken balık stoğu göç nedeniyle azalır");

export const ledgerSection217: GuideSection = {
  title: "Kaynak defteri: giriş, çıkış ve net değişim",
  paragraphs: [
    `Her satır aynı kuralla kurulur: net değişim = toplam giriş − toplam çıkış. Çıkış sütunu insan kullanımıyla sınırlı değildir. Akiferde ${outOf(aquifer, "pompaj")} birim pompaj ${num217(total(aquifer.inflow))} birimlik girişten küçüktür, ama ${outOf(aquifer, "doğal boşalım")} birim doğal boşalım eklenince net ${signed217(net217(aquifer))} olur. Balık stoğunda av (${outOf(fish, "av")}) net doğal artıştan (${total(fish.inflow)}) küçüktür; göçle (${outOf(fish, "göç")}) birlikte net ${signed217(net217(fish))} balıktır.`,
    `Yenilenebilir sözcüğü sınırsız demek değildir: tabloda ${renewableDown.length} yenilenebilir satır azalır. Yenilenemez kaynakta insan ömrü ölçeğinde giriş ${total(fossil.inflow)} olduğundan her çıkarım stoğu aynı miktar azaltır (${signed217(net217(fossil))} ${fossil.unit}). Pompaj ${outOf(aquiferFixed, "pompaj")}’a inince akifer bütçesi ${signed217(net217(aquiferFixed))} ile dengelenir.`,
    `Bu sayılar temsilî modeldir. Gerçek kaynakta akışlar her yıl sabit kalmaz; düşük stokta yenilenme değişebilir. Su kalitesi, habitat ve diğer canlıların gereksinimleri de değerlendirilir. Dengelenmiş bir bütçe kararın gerekli bir parçasıdır, tek başına güvenli kullanım izni değildir.`,
  ],
  table: ledgerTable,
};

export const STOCKS217 = { fossil: 60, aquifer: 240 };
export const yearsLeft217 = (stock: number, r: Resource217) => {
  const n = net217(r);
  if (n >= 0) throw new Error("depth217: stok azalmıyor, tükenme süresi yok");
  return stock / -n;
};
const fossilYears = yearsLeft217(STOCKS217.fossil, fossil);
const aquiferYears = yearsLeft217(STOCKS217.aquifer, aquifer);
const firstOut = fossilYears < aquiferYears ? fossil : aquifer;
guard(Number.isInteger(fossilYears) && Number.isInteger(aquiferYears) && fossilYears !== aquiferYears, "iki tükenme süresi farklı tam yıllardır");
export const maxCatch217 = total(fish.inflow) - outOf(fish, "göç");
guard(maxCatch217 > 0 && maxCatch217 < outOf(fish, "av"), "dengeyi koruyan en büyük av mevcut avdan küçüktür");

export const ledgerExamples217: WorkedExample[] = [
  {
    title: "Sabit akışlarla hangi stok önce biter?",
    prompt: `Temsilî bir modelde ${lower(fossil.name)} ${num217(STOCKS217.fossil)} birim stokla, yılda ${num217(total(fossil.inflow))} yenilenme ve ${num217(total(fossil.outflow))} birim çıkarımla izleniyor. Akiferin stoğu ${num217(STOCKS217.aquifer)} birim; yıllık beslenmesi ${num217(total(aquifer.inflow))}, pompajı ${outOf(aquifer, "pompaj")}, doğal boşalımı ${outOf(aquifer, "doğal boşalım")} birim. Akışlar her yıl aynı kalırsa hangi stok önce sıfıra iner?`,
    strategy: "Her kaynak için yıllık net değişimi bul; stoğu bu azalışa böl. Akışların sabit kalması modelin varsayımıdır.",
    steps: [
      { label: "Fosil yatak", expression: `${num217(total(fossil.inflow))} − ${num217(total(fossil.outflow))} = ${signed217(net217(fossil))}`, explanation: `${num217(STOCKS217.fossil)} ÷ ${num217(-net217(fossil))} = ${num217(fossilYears)} yıl.` },
      { label: "Akifer", expression: `${num217(total(aquifer.inflow))} − ${outOf(aquifer, "pompaj")} − ${outOf(aquifer, "doğal boşalım")} = ${signed217(net217(aquifer))}`, explanation: `${num217(STOCKS217.aquifer)} ÷ ${num217(-net217(aquifer))} = ${num217(aquiferYears)} yıl.` },
      { label: "Karşılaştır", expression: `${num217(Math.min(fossilYears, aquiferYears))} < ${num217(Math.max(fossilYears, aquiferYears))}`, explanation: "Süre kısa olan önce biter." },
    ],
    answer: `Fosil yatak ${num217(fossilYears)} yılda, akifer ${num217(aquiferYears)} yılda sıfıra iner; önce ${lower(firstOut.name)} biter.`,
    check: `${num217(fossilYears)} × ${num217(-net217(fossil))} = ${num217(STOCKS217.fossil)} ve ${num217(aquiferYears)} × ${num217(-net217(aquifer))} = ${num217(STOCKS217.aquifer)}.`,
    pitfall: "Akiferde yalnız pompajı girişle karşılaştırıp stok artıyor demek. Doğal boşalım da bir çıkıştır.",
  },
  {
    title: "Balık stoğunu korumak için av en çok ne olmalı?",
    prompt: `Bir dönemde balık stoğunun net doğal artışı (doğum − doğal ölüm) ${total(fish.inflow)} balık, göçle ayrılan ${outOf(fish, "göç")} balık ve av ${outOf(fish, "av")} balıktır. Diğer akışlar aynı kalırsa stoğun azalmaması için av en çok kaç olmalıdır?`,
    strategy: "Net değişim = net doğal artış − göç − av. Stoğun azalmaması için net değişim en az sıfır olmalıdır.",
    steps: [
      { label: "Şimdiki net", expression: `${total(fish.inflow)} − ${outOf(fish, "göç")} − ${outOf(fish, "av")} = ${signed217(net217(fish))}`, explanation: "Stok azalıyor." },
      { label: "Koşul", expression: `${total(fish.inflow)} − ${outOf(fish, "göç")} − av ≥ 0`, explanation: "Net doğal artış zaten doğal ölümü içerir; ölümü ikinci kez çıkarma." },
      { label: "Çöz", expression: `av ≤ ${maxCatch217}`, explanation: `Av ${outOf(fish, "av") - maxCatch217} balık azaltılmalıdır.` },
    ],
    answer: `Av en çok ${maxCatch217} balık olmalıdır; şimdiki ${outOf(fish, "av")} balıktan ${outOf(fish, "av") - maxCatch217} eksik.`,
    check: `${total(fish.inflow)} − ${outOf(fish, "göç")} − ${maxCatch217} = 0.`,
    pitfall: "Avı yalnız doğal artışla karşılaştırıp 35 < 40 diye sürdürülebilir saymak. Göç de stoktan çıkar; ayrıca model eşitliği tek başına güvenli kullanım izni değildir.",
  },
];

export const ledgerSupplement217 = {
  title: ledgerSection217.title,
  figureTitle: ledgerSection217.title,
  paragraphs: ledgerSection217.paragraphs,
  summary: `Net = toplam giriş − toplam çıkış; doğal çıkışları da say. Akifer: ${num217(total(aquifer.inflow))} − ${num217(total(aquifer.outflow))} = ${signed217(net217(aquifer))}. Balık: ${total(fish.inflow)} − ${total(fish.outflow)} = ${signed217(net217(fish))}. Yenilenebilir kaynak da azalabilir; yenilenemezde her çıkarım stoğu azaltır. Dengeli bütçe tek başına güvenli kullanım izni değildir.`,
  appendSection: true as const,
  table: ledgerTable,
  examples: ledgerExamples217,
};

/* ---------- Dışa aktarım ---------- */

export const depth217Lessons = {
  "ekoloji-giris": modeSupplement217,
  "besin-zinciri-agi": webSupplement217,
  "besin-piramidi": pyramidSupplement217,
  "madde-donguleri": cycleSupplement217,
  "guncel-cevre-sorunlari": envSupplement217,
  "dogal-kaynaklar-surdurulebilirlik": ledgerSupplement217,
} as const;

export const depth217Supplements = {
  "ekoloji-giris": [modeSupplement217],
  "besin-zinciri-agi": [webSupplement217],
  "besin-piramidi": [pyramidSupplement217],
  "madde-donguleri": [cycleSupplement217],
  "guncel-cevre-sorunlari": [envSupplement217],
  "dogal-kaynaklar-surdurulebilirlik": [ledgerSupplement217],
};

// Paragraf ve özetlerde kullanılan iç değerler test için dışa açılır.
export const depth217Internals = { allChains, top, inverse, lostTotal, fossilYears, aquiferYears };
