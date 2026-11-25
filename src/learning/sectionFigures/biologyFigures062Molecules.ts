import { glucoseSource005 } from "../glucoseSource005";
import { pt, regular, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";
import { flowFig, tableFig } from "./turkishFigures060Kit";
import { chains, drawFig, lines, nt, unitDot } from "./biologyFigures062Kit";

/*
 * Forge062 TYT Biyoloji · Karbohidratlar ve proteinler. Sayım kuralları
 * bölüm metnindendir: halkasız tek parçada n − 1 bağ, k parçada N − k bağ,
 * tek halkada n bağ; her yeni bağ için bir su, her kopan bağ için bir su.
 * Molar kütleler bölümdeki yuvarlatılmış öğretim değerleridir (G = 75,
 * A = 89, S = 105 g/mol; su 18 g/mol). Noktalar yapı birimidir, atom çizimi
 * değildir; çizimler ölçekli değildir.
 */

/** N birimi k parçaya olabildiğince eşit böler. */
export const split = (n: number, k: number): number[] => {
  const kk = Math.max(1, Math.min(k, n));
  return Array.from({ length: kk }, (_, i) => Math.floor(n / kk) + (i < n % kk ? 1 : 0));
};

/** N birim, k parça: bağ sayısı N − k (her parça halkasız). */
const bondFig = (o: { caption: string; alt: string; unit: string; bond: string; part: string; init: number }) => {
  const draw = (n: number, step: number) => {
    const els: El[] = [];
    const parts = split(n, step + 1);
    let y = chains(els, -0.3, parts);
    y = lines(els, y - 0.1, parts.map((p, i) => `${o.part[0].toUpperCase()}${o.part.slice(1)} ${i + 1}: ${p} ${o.unit}, ${p - 1} ${o.bond}`));
    return { els, h: -y, parts };
  };
  const h = draw(12, 2).h + 0.8;
  return drawFig({
    caption: o.caption,
    alt: o.alt,
    h,
    param: { label: `${o.unit[0].toUpperCase()}${o.unit.slice(1)} sayısı`, min: 3, max: 12, step: 1, init: o.init },
    steps: [1, 2, 3].map((k) => `${k} ${o.part}`),
    draw: (n, step) => {
      const { els, parts } = draw(n, step);
      const k = parts.length;
      return {
        els,
        readout: [`${n} ${o.unit}, ${k} bağımsız halkasız ${o.part}: ${o.bond} sayısı ${n} − ${k} = ${n - k}.`, "Dallanma halkasız tek parçada sayımı bozmaz; baştan var olan bağ ile yeni kurulan bağ ayrı kayıttır."],
      };
    },
  });
};

/* ---------------- Karbohidratlar ---------------- */

// 0 · Karbon sayısı ve örnekler.
const sizes = tableFig({
  caption:
    "Önce birim sayısını, sonra birimin türünü sor. Bölümdeki basit şekerler karbon sayısına göre; bir satıra tıkla. Beş karbonlu olmak beş monosakkaritin birleştiği anlamına gelmez.",
  alt: "Üç satırlı tablo. Trioz, üç karbon: gliseraldehit; PGAL fosfatlı biçimi. Pentoz, beş karbon: riboz, deoksiriboz. Heksoz, altı karbon: glikoz, fruktoz, galaktoz.",
  cols: [
    { name: "Grup", w: 2.5 },
    { name: "Karbon", w: 2.0 },
    { name: "Bölümdeki örnek", w: 5.5 },
  ],
  rows: [
    { cells: ["Trioz", "3", "gliseraldehit; fosfatlı biçimi PGAL"], tones: [undefined, "muted", "c"], detail: ["PGAL karbon metabolizması bağlamında görülür."] },
    { cells: ["Pentoz", "5", "riboz (RNA, ATP), deoksiriboz (DNA)"], tones: [undefined, "muted", "b"], detail: ["Bir şeker yalnız enerji yakıtı olmak zorunda değildir; riboz ve deoksiriboz nükleotitlere katılır."] },
    { cells: ["Heksoz", "6", "glikoz, fruktoz, galaktoz"], tones: [undefined, "muted", "a"], detail: ["Ortak kapalı formül C₆H₁₂O₆ yapının tamamını vermez."] },
  ],
  foot: "Karbon sayısı, birim sayısı ve görev ayrı sorulardır.",
});

// 2 · Polisakkaritler.
const polys = tableFig({
  caption:
    "Aynı glikoz birimi farklı bağ düzenleriyle farklı özellikler üretir; kitinin birimi ise azot içeren değişmiş bir şekerdir. Bir polisakkarite tıkla: yer, görev ve bağlanma açılır.",
  alt: "Dört satırlı tablo. Nişasta: bitkide depo; glikoz; alfa 1→4, amilopektinde alfa 1→6. Glikojen: hayvan, mantar, bazı prokaryotlarda depo; çok dallı. Selüloz: bitki hücre duvarı; beta 1→4. Kitin: mantar duvarı ve eklem bacaklı dış iskeleti; N-asetilglukozamin.",
  cols: [
    { name: "Molekül", w: 2.5 },
    { name: "Nerede, ne görev?", w: 3.9 },
    { name: "Birim ya da bağ", w: 3.6 },
  ],
  rows: [
    { cells: ["Nişasta", "bitkide depo (tohum, yumru)", "glikoz; α(1→4), dalda α(1→6)"], tones: [undefined, "b", "c"], detail: ["Amiloz doğrusal, amilopektin dallanmıştır; bulunduğu doku her an fotosentez yapıyor demek değildir."] },
    { cells: ["Glikojen", "hayvan, mantar, bazı bakteride depo", "glikoz; çok dallı, iki bağ türü"], tones: [undefined, "b", "c"], detail: ["Hayvansal depo kısa etiketi başka canlılarda bulunamayacağı biçiminde okunmaz."] },
    { cells: ["Selüloz", "bitki hücre duvarı", "glikoz; β(1→4)"], tones: [undefined, "a", "c"], detail: ["İnsan sindirim enzimleri selülozun bağlarını nişastadaki gibi parçalayamaz; bazı hayvanlarda mikroorganizmalar yardım eder."] },
    { cells: ["Kitin", "mantar duvarı, eklem bacaklı dış iskeleti", "N-asetilglukozamin (azotlu)"], tones: [undefined, "a", "warn"], detail: ["Kitini yalnız değişmemiş glikozlardan yapılmış saymak doğru değildir."] },
  ],
  foot: "Ortak birim aynı büyük yapı demek değildir.",
});

// 3 · N − k bağ.
const carbBonds = bondFig({
  caption:
    "Halkasız tek parçada n birim için n − 1 glikozit bağı; N birim k bağımsız parçaya dağılmışsa toplam N − k. Sürgüyle birim sayısını, adımlarla parça sayısını değiştir. Noktalar şeker birimidir, atom çizimi değildir; ölçekli değil.",
  alt: "Yatay sıralarda nokta zincirleri; her nokta bir şeker birimi, aradaki çizgi bir glikozit bağı. Altında her parçanın birim ve bağ sayısı yazılı.",
  unit: "birim",
  bond: "bağ",
  part: "parça",
  init: 8,
});

// 7 · Disakkaritler.
const disacch = tableFig({
  caption:
    "Tam hidroliz ürünleriyle disakkariti yeniden tanı. Bir molekül adına tıkla. Glikoz görülmesi birçok kaynaktan gelebilir; ayırt edici ürün fruktoz ya da galaktozdur.",
  alt: "Üç satırlı tablo. Maltoz: iki glikoz. Sakkaroz: bir glikoz ve bir fruktoz. Laktoz: bir glikoz ve bir galaktoz.",
  cols: [
    { name: "Disakkarit", w: 3.0 },
    { name: "Tam hidroliz ürünleri", w: 7.0 },
  ],
  rows: [
    { cells: ["Maltoz", "glikoz + glikoz"], tones: [undefined, "b"], detail: ["Maltozun iki birimi de glikozdur."] },
    { cells: ["Sakkaroz", "glikoz + fruktoz"], tones: [undefined, "c"], detail: ["Fruktoz görülmesi sakkarozu ayırt eden üründür."] },
    { cells: ["Laktoz", "glikoz + galaktoz"], tones: [undefined, "a"], detail: ["Galaktoz görülmesi laktozu ayırt eden üründür."] },
  ],
  foot: "Birkaç disakkarit birlikteyse her molekülün iki birimini ayrı satırda say.",
});

// 12 · İki su kaydı: sentez ve hidroliz.
const waterLedger = drawFig({
  caption:
    "Altı serbest birimden tek zincir kurulur (5 bağ, 5 su çıkışı), sonra sürgüdeki sayıda bağ hidrolizle koparılır (her bağ için bir su kullanılır). İki aşamanın su kaydını ayrı tut. Altı birim örnek bir zincirdir; ölçekli değil.",
  alt: "Üstte altı noktalı sentezlenmiş zincir. Altında hidrolizden sonraki parçalar: sağ uçtan koparılan bağ sayısı kadar serbest birim. Sentez suyu 5, hidroliz suyu sürgü değeri.",
  h: 3.6,
  param: { label: "Koparılan bağ", min: 0, max: 5, step: 1, init: 2 },
  draw: (x) => {
    const els: El[] = [];
    els.push(txt(v(0, 0), "Sentez sonrası", "e", { small: true, bold: true, tone: "muted" }));
    chains(els, -0.65, [6]);
    els.push(txt(v(0, -1.45), "Hidroliz sonrası", "e", { small: true, bold: true, tone: "muted" }));
    const parts = [6 - x, ...Array.from({ length: x }, () => 1)];
    let y = chains(els, -2.1, parts);
    y = lines(els, y, [`${parts.length} parça; serbest birim ${x}.`]);
    return {
      els,
      readout: [`Sentez: 5 bağ kuruldu, 5 su çıktı. Hidroliz: ${x} bağ koptu, ${x} su kullanıldı. Net su çıkışı 5 − ${x} = ${5 - x}.`, "Net değişim sıfır olsa bile iki olayın da gerçekleştiği bilgisi kaybolmaz; hidrolizde su tepkimenin girdisidir."],
    };
  },
});

// 13 · Kısmi hidroliz: kesim yeri serbest birimi belirler.
const CUTS: { name: string; cuts: number[] }[] = [
  { name: "Ortadan tek kesim", cuts: [3] },
  { name: "Uçtan tek kesim", cuts: [5] },
  { name: "İki uçtan kesim", cuts: [1, 5] },
  { name: "Tam hidroliz", cuts: [1, 2, 3, 4, 5] },
];
const partsOf = (cuts: number[]) => {
  const b = [0, ...cuts, 6];
  return b.slice(1).map((e, i) => e - b[i]);
};
const partial = drawFig({
  caption:
    "Altı birimlik halkasız zincirde her kesim parça sayısını bir artırır; serbest birim sayısı ise hangi bağların koptuğuna bağlıdır. Adımlarla kesim yerini değiştir: üst sıradaki düşey çizgiler kesim yerleri, alt sıra sonuç. Örnek zincir; ölçekli değil.",
  alt: "Üstte altı noktalı zincir ve kesim yerlerinde kısa düşey çizgiler. Altta oluşan parçalar. Ortadan tek kesim iki üçlü parça, uçtan tek kesim bir serbest birim, iki uçtan kesim iki serbest birim, tam hidroliz altı serbest birim verir.",
  h: 3.2,
  steps: CUTS.map((c) => c.name),
  draw: (_v, step) => {
    const els: El[] = [];
    const c = CUTS[step];
    chains(els, -0.4, [6], { x0: 0.6, gap: 0.8, tone: () => "muted" });
    for (const k of c.cuts) els.push(seg(v(0.6 + (k - 0.5) * 0.8, -0.05), v(0.6 + (k - 0.5) * 0.8, -0.75), { tone: "warn", bold: true }));
    const parts = partsOf(c.cuts);
    let y = chains(els, -1.5, parts, { x0: 0.6, gap: 0.8 });
    const free = parts.filter((p) => p === 1).length;
    y = lines(els, y, [`Parça uzunlukları ${parts.join(" + ")} = 6.`]);
    return {
      els,
      readout: [`${c.name}: ${c.cuts.length} bağ koptu, ${parts.length} parça, ${free} serbest birim.`, "Önce parçaların uzunluklarını say, sonra uzunluğu bir olanları seç."],
    };
  },
});

/* ---------------- Proteinler ---------------- */

// 1 · Peptit bağı sayımı.
const peptideBonds = bondFig({
  caption:
    "Tek, açık ve halkasız polipeptitte n amino asit için n − 1 peptit bağı; birden çok zincirde toplam amino asitten zincir sayısını çıkar. Sürgüyle amino asit sayısını, adımlarla zincir sayısını değiştir. Noktalar amino asit birimidir; ölçekli değil.",
  alt: "Yatay sıralarda nokta zincirleri; her nokta bir amino asit, aradaki çizgi bir peptit bağı. Altında her zincirin amino asit ve bağ sayısı yazılı.",
  unit: "amino asit",
  bond: "peptit bağı",
  part: "zincir",
  init: 9,
});

// 18 · Halkada ilk kesim.
const RING = ["Halka", "İlk kesim", "İkinci kesim"];
const ring = drawFig({
  caption:
    "Uçları peptit bağıyla birleşmiş tek halkada n birim için n bağlantı vardır. İlk kesim halkayı yalnız açar, parça sayısı artmaz; ikinci kesim iki açık parça verir. Adımlarla izle. Altı birimlik ayrı bir model; ölçekli değil.",
  alt: "Birinci adımda altı noktalı halka, altı bağ. İkinci adımda tek açık zincir, beş bağ. Üçüncü adımda iki açık parça, dört bağ.",
  h: 2.9,
  steps: RING,
  draw: (_v, step) => {
    const els: El[] = [];
    let bonds = 6;
    let parts = 1;
    if (step === 0) {
      const ps = regular(6, 0.95, 90, v(5, -1.3));
      ps.forEach((p, i) => {
        const q = ps[(i + 1) % 6];
        const d = [q[0] - p[0], q[1] - p[1]];
        const L = Math.hypot(d[0], d[1]);
        const u = [d[0] / L, d[1] / L];
        els.push(seg(v(p[0] + u[0] * 0.17, p[1] + u[1] * 0.17), v(q[0] - u[0] * 0.17, q[1] - u[1] * 0.17), { tone: "ink" }));
      });
      ps.forEach((p) => els.push(unitDot(p[0], p[1], "b")));
    } else if (step === 1) {
      bonds = 5;
      chains(els, -1.3, [6], { x0: 3.1, gap: 0.75 });
    } else {
      bonds = 4;
      parts = 2;
      chains(els, -1.3, [3, 3], { x0: 2.4, gap: 0.75 });
    }
    return { els, readout: [`${RING[step]}: 6 birim, ${bonds} peptit bağı, ${parts} parça.`, "Kesim sayısından parça sayısını çıkarmadan önce başlangıçtaki çevrimi gör."] };
  },
});

// 19 · Peptit kütlesi.
const AA = [
  { s: "G", m: 75 },
  { s: "A", m: 89 },
  { s: "S", m: 105 },
];
const MASS = ["G", "G–A", "G–A–S", "Hidroliz"];
const mass = drawFig({
  caption:
    "Bölümdeki yuvarlatılmış değerler: G = 75, A = 89, S = 105 g/mol. Serbest amino asitlerden peptit kurulurken her yeni bağ için 18 g/mol su ayrılır; hidrolizde her kesilen bağ için 18 g/mol eklenir. Adımlarla izle; ölçekli değil.",
  alt: "Harfli noktalar zinciri: G, sonra G–A, sonra G–A–S; son adımda üç serbest amino asit. Her adımda toplam kütle ve ayrılan su hesabı yazılı.",
  h: 3.1,
  steps: MASS,
  draw: (_v, step) => {
    const els: El[] = [];
    const n = step === 3 ? 3 : step + 1;
    const free = step === 3;
    const x0 = 3.6;
    const gap = free ? 1.3 : 1.0;
    for (let i = 0; i < n; i++) {
      const x = x0 + i * gap;
      if (i > 0 && !free) els.push(seg(v(x - gap + 0.17, -1.2), v(x - 0.17, -1.2), { tone: "ink" }));
      els.push(unitDot(x, -1.2, free ? "a" : "b", free));
      els.push(txt(v(x, -0.6), AA[i].s, "c", { bold: true, tone: "ink" }));
    }
    const sum = AA.slice(0, n).reduce((a, b) => a + b.m, 0);
    const bonds = free ? 0 : n - 1;
    const parts = AA.slice(0, n).map((a) => a.m).join(" + ");
    const text = free
      ? `G–A–S hidroliz: 233 + 2 × 18 = 269 g/mol, yani ${parts} = ${sum}.`
      : bonds === 0
        ? `Serbest G: ${sum} g/mol; bağ yok, su ayrılmaz.`
        : `${parts} − ${bonds} × 18 = ${nt(sum - 18 * bonds, 0)} g/mol (${bonds} peptit bağı).`;
    lines(els, -1.85, [text], "ink");
    return { els, readout: [text, "Zincir katlanınca kütleye yeni su eklenmez; hesap yalnız başlangıç maddeleri serbest amino asitse geçerlidir."] };
  },
});

// 3 · Denatürasyon, hidroliz, yeniden katlanma.
const denat = tableFig({
  caption:
    "Şeklin bozulması, bağların hidrolizi ve yeniden katlanma ayrı deney sorularıdır. Bir olaya tıkla: neyin değiştiği ve neyin korunduğu açılır. Yalnız etkinlik azaldı verisi bunların hepsini kesinleştirmez.",
  alt: "Üç satırlı tablo. Denatürasyon: sıcaklık, pH ya da başka koşul doğal katlanmayı bozar; birincil dizi çoğu karşılaştırmada korunur. Hidroliz: peptit bağları su kullanılarak ayrılır; küçük peptitler ya da amino asitler. Yeniden katlanma: bazı proteinler uygun koşulda yeniden katlanabilir, bazıları geri dönmez.",
  cols: [
    { name: "Olay", w: 3.0 },
    { name: "Ne değişir?", w: 3.6 },
    { name: "Ne korunur?", w: 3.4 },
  ],
  rows: [
    { cells: ["Denatürasyon", "doğal katlanma bozulur", "birincil dizi çoğu kez korunur"], tones: [undefined, "warn", "b"], detail: ["Tipik denatürasyon tanımı bütün peptit bağlarının hidrolizle ayrılması değildir."] },
    { cells: ["Hidroliz", "peptit bağları su kullanılarak ayrılır", "amino asit birimleri"], tones: [undefined, "warn", "b"], detail: ["Hidroliz daha küçük peptitler ya da amino asitler oluşturur."] },
    { cells: ["Yeniden katlanma", "bazı proteinlerde düzen geri gelir", "dizi aynı kalır"], tones: [undefined, "a", "b"], detail: ["Bazı proteinler uygun koşullarda yeniden katlanabilir, bazıları geri dönmez."] },
  ],
  foot: "Hangi koşulun değiştiğini ve neyin ölçüldüğünü önce yaz.",
});

// 4 · Görev örnekleri.
const roles = tableFig({
  caption:
    "Proteinler hücrelerin pek çok bölümünde farklı görevler üstlenir. Bölümdeki örneklere tıkla. Her protein enzim, her hormon protein değildir; görev örneğini yapı birimiyle karıştırma.",
  alt: "Yedi satırlı tablo. Hemoglobin taşıma; keratin yapı; antikor savunma; aktin ve miyozin hareket; protein yapılı enzimler kataliz; fibrinojen pıhtı ağı; albümin kolloid ozmotik basınç.",
  cols: [
    { name: "Örnek", w: 3.4 },
    { name: "Görev", w: 6.6 },
  ],
  rows: [
    { cells: ["Hemoglobin", "taşıma"], tones: [undefined, "b"], detail: ["Hemoglobin taşıma görevine örnektir."] },
    { cells: ["Keratin", "yapı"], tones: [undefined, "c"], detail: ["Keratin yapı görevine örnektir."] },
    { cells: ["Antikor", "savunma"], tones: [undefined, "a"], detail: ["Antikor savunma görevine örnektir."] },
    { cells: ["Aktin, miyozin", "hareket"], tones: [undefined, "b"], detail: ["Proteinler yalnız kaslarda bulunmaz."] },
    { cells: ["Enzimler", "kataliz (protein yapılı enzimler)"], tones: [undefined, "c"], detail: ["Her protein enzim değildir."] },
    { cells: ["Fibrinojen", "fibrine dönüşerek pıhtı ağı"], tones: [undefined, "a"], detail: ["Fibrinojenin fibrine dönüşmesi pıhtı ağının oluşmasına katkı verir."] },
    { cells: ["Albümin", "plazmanın kolloid ozmotik basıncı"], tones: [undefined, "b"], detail: ["Albümin kan plazmasının kolloid ozmotik basıncına katkı verir."] },
  ],
  foot: "Enerji için kullanılabilmesi başlıca görevin enerji deposu olduğunu göstermez.",
});

// 9 · Yapı düzeyleri.
const levels = flowFig({
  caption:
    "Birincil yapıdan dördüncül yapıya dört düzey. İleri ile her düzeyi aç. Her protein birden çok zincir içermez; bu yüzden her proteinin dördüncül yapısı yoktur. Kavram şeması, ölçekli değil.",
  alt: "Dört kart alt alta: birincil yapı, amino asit sıralanışı; ikincil yapı, omurgadaki hidrojen bağlarıyla alfa helis ve beta tabaka; üçüncül yapı, tek polipeptidin genel üç boyutlu katlanması; dördüncül yapı, birden çok zincirin işlevsel bütünü.",
  nodes: [
    { head: "Birincil", text: "polipeptitteki amino asit sıralanışı", tone: "b", note: "Bağ sayımı sorusunda polipeptit omurgasını izle." },
    { head: "İkincil", text: "omurgadaki karbonil ve N–H arasında hidrojen bağları: alfa helis, beta tabaka", tone: "c", note: "Yerel düzenler omurga grupları arasındaki hidrojen bağlarıyla kararlılaşır." },
    { head: "Üçüncül", text: "tek polipeptidin genel üç boyutlu katlanması; yan grup etkileşimleri", tone: "c", note: "Amino asit sayısını bilmek üst düzenlerin ayrıntısını belirlemez." },
    { head: "Dördüncül", text: "birden çok polipeptit zincirinin işlevsel bütünü", tone: "a", note: "Birden çok zincir olması zincirler arasında mutlaka peptit bağı bulunduğunu göstermez." },
  ],
  steps: ["Birincil", "İkincil", "Üçüncül", "Dördüncül"],
  reveal: true,
  foot: "Şekil sorusunda gereken katlanma ve etkileşim bilgisini izle.",
});

const glucoseChange: FigureDef = {
  caption: "Toplam glikoz ve yeni oluşan glikoz farklıdır. Veriler varsayımsaldır. Çizgi örnek noktalarını birleştirir, ara zamanlarda yeni ölçüm göstermez.",
  alt: "Zaman 0, 2, 4 ve 6 dakika. Glikoz miktarı sırasıyla 3, 7, 11 ve 11 birim. Önce artış, sonra yatay bölüm.",
  steps: ["İlk dört dakika", "Dört ile altı arası"],
  draw: (_, step) => {
    const first = step === 0 ? 0 : 2, last = step === 0 ? 2 : 3;
    const point = (minute: number, amount: number) => v(minute, amount * 0.36);
    const els: El[] = [
      vec(v(0, 0), v(6.65, 0), { tone: "ink" }),
      vec(v(0, 0), v(0, 4.6), { tone: "ink" }),
      txt(v(0, 4.9), "Glikoz (birim)", "e", { small: true, bold: true }),
      txt(v(5.65, -0.72), "Zaman (dk)", "s", { small: true }),
      txt(v(-1.0, 5.1), "", "c"),
      txt(v(7.5, -1.3), "", "c"),
    ];
    glucoseSource005.forEach(({minute, amount}, i) => {
      const at = point(minute, amount);
      const upcoming = glucoseSource005[i + 1];
      const tone = i >= first && i <= last ? "b" : "muted";
      if (upcoming) {
        const selected = i >= first && i < last;
        els.push(seg(at, point(upcoming.minute, upcoming.amount), { tone: selected ? "b" : "muted", bold: selected, dash: !selected }));
      }
      els.push(pt(at, undefined, "n", tone));
      els.push(txt(v(minute, -0.16), String(minute), "s", { small: true }));
    });
    for (const amount of [0, 3, 7, 11]) els.push(txt(point(-0.14, amount), String(amount), "w", { small: true }));
    const a = glucoseSource005[first], b = glucoseSource005[last];
    const delta = b.amount - a.amount, time = b.minute - a.minute;
    return { els, readout: [
      `Net artış ${b.amount} − ${a.amount} = ${delta} birim. Ortalama hız ${delta} ÷ ${time} = ${delta / time} birim/dakika.`,
      ...(step === 1 ? ["Yatay bölge net artış olmadığını gösterir. Nedenini belirlemek için başka bilgi gerekir."] : []),
    ] };
  },
};

export const biologyFigures062Molecules: Record<string, Record<string, FigureDef>> = {
  karbohidratlar: {
    "Glikozun toplam miktarı ile artışını ayır": glucoseChange,
    "Şekerin adı kadar birim sayısını da oku": sizes,
    "Polisakkaritlerde görev ve bağlanma biçimi": polys,
    "Bağ sayısında zincir sayısını unutma": carbBonds,
    "Disakkaritleri parçalarından yeniden tanı": disacch,
    "Dehidrasyon ve hidrolizde iki su kaydı tut": waterLedger,
    "Kısmi hidrolizde parça ile serbest birimi ayır": partial,
  },
  proteinler: {
    "Peptit bağını doğru say": peptideBonds,
    "Denatürasyon, tüm bağların kesilmesi değildir": denat,
    "Tek bir görev ezberleme": roles,
    "Birincil yapı ile üst düzenleri ayır": levels,
    "Halka bağlantısında ilk kesimi ayrı say": ring,
    "Peptit kütlesinde suyun atomlarını koru": mass,
  },
};
