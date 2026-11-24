import { type El, type FigureDef, type Tone } from "./figureKit";
import { A, B, C, L, R, S, T, chain, lead, mk, table, tableFig } from "./biologyFigures060Kit";
import { bars } from "./biologyFigures061Kit";

/*
 * AYT Biyoloji · Çiçeğin yapısı ve tozlaşma (Forge061). Çiçek, embriyo kesesi
 * ve bitki çizimleri nitel öğretim şemasıdır, ölçekli değildir. Sayılar bölüm
 * metnindeki tipik modelden gelir: 2n = 18 ana hücre, ana hücre başına 4
 * mikrospor, 4 polen, 8 sperm; çekirdek 1 → 2 → 4 → 8; kese 7 hücre, 8
 * çekirdek; 100 polen, 20 ulaşan, 10 çimlenen. Normal gelişim ve kayıp yok
 * kabul edilir; tohum garantisi verilmez.
 */

/* ---------------- Çiçeğin yapısı ---------------- */

const anatomy = mk({
  caption:
    "Sap, tabla ve dört organ takımı (nitel şema, ölçekli değil): çiçek sapı çiçeği taşır, tabla organların bağlandığı genişlemiş uçtur. Dıştan içe çanak yaprak, taç yaprak, erkek organ (sapçık, başçık) ve dişi organ (tepecik, dişicik borusu, yumurtalık). Sayı ve birleşme biçimleri türe göre değişir.",
  alt: "Boyuna kesit çiçek: altta sap ve tabla, tablanın kenarlarında yeşil çanak yapraklar, onların içinde taç yapraklar, ortada iki erkek organ ve tam ortada şişkin yumurtalıklı dişi organ. Yumurtalık içinde tohum taslakları.",
  h: 360,
  draw: () => {
    const cx = 170;
    const els: El[] = [
      L(cx, 350, cx, 270, { bold: true, tone: "a" }),
      S([[cx - 60, 270], [cx, 250], [cx + 60, 270], [cx, 285]], { tone: "a", fill: "a" }),
      S([[cx - 56, 268], [cx - 110, 230], [cx - 96, 210], [cx - 50, 250]], { tone: "a", bold: true }),
      S([[cx + 56, 268], [cx + 110, 230], [cx + 96, 210], [cx + 50, 250]], { tone: "a", bold: true }),
      S([[cx - 46, 258], [cx - 140, 130], [cx - 100, 110], [cx - 30, 240]], { tone: "warn", fill: "warn" }),
      S([[cx + 46, 258], [cx + 140, 130], [cx + 100, 110], [cx + 30, 240]], { tone: "warn", fill: "warn" }),
      L(cx - 36, 252, cx - 50, 120, { tone: "c", bold: true }),
      L(cx + 36, 252, cx + 50, 120, { tone: "c", bold: true }),
      S([[cx - 62, 120], [cx - 50, 96], [cx - 38, 120], [cx - 50, 128]], { tone: "c", fill: "c", bold: true }),
      S([[cx + 62, 120], [cx + 50, 96], [cx + 38, 120], [cx + 50, 128]], { tone: "c", fill: "c", bold: true }),
      S([[cx - 26, 250], [cx - 30, 205], [cx, 185], [cx + 30, 205], [cx + 26, 250]], { tone: "b", fill: "b", bold: true }),
      L(cx - 6, 186, cx - 6, 80, { tone: "b" }),
      L(cx + 6, 186, cx + 6, 80, { tone: "b" }),
      R(cx - 18, 66, cx + 18, 80, { tone: "b", fill: "b" }),
      C(cx - 10, 222, 6, { tone: "ink", fill: "muted" }),
      C(cx + 10, 222, 6, { tone: "ink", fill: "muted" }),
    ];
    els.push(...lead(cx, 72, 300, 30, "tepecik", "b", true));
    els.push(...lead(cx + 6, 140, 300, 66, "dişicik borusu", "b"));
    els.push(...lead(cx + 50, 110, 300, 102, "başçık", "c", true));
    els.push(...lead(cx + 44, 180, 300, 138, "sapçık", "c"));
    els.push(...lead(cx + 120, 140, 300, 174, "taç yaprak", "warn"));
    els.push(...lead(cx + 24, 230, 300, 210, "yumurtalık", "b", true));
    els.push(...lead(cx + 10, 222, 300, 240, "tohum taslağı", "muted"));
    els.push(...lead(cx + 100, 228, 300, 274, "çanak yaprak", "a"));
    els.push(...lead(cx + 40, 266, 300, 308, "tabla", "a"));
    els.push(...lead(cx, 330, 300, 344, "sap", "a"));
    return { els, readout: ["Destek yapıları (sap, tabla) polen üreten başçık ya da tohum taslağı içeren yumurtalık değildir.", "Mikropil tohum taslağının açıklığıdır; tepecik değildir."] };
  },
});

type Flower = { name: string; canak: boolean; tac: boolean; erkek: boolean; disi: boolean };
const FLOWERS: Flower[] = [
  { name: "Dört takım", canak: true, tac: true, erkek: true, disi: true },
  { name: "Taç yok", canak: true, tac: false, erkek: true, disi: true },
  { name: "Yalnız erkek", canak: true, tac: true, erkek: true, disi: false },
  { name: "Yalnız dişi", canak: true, tac: true, erkek: false, disi: true },
];
const sexOf = (f: Flower) => (f.erkek && f.disi ? "iki eşeyli (erselik)" : f.erkek ? "erkek çiçek" : f.disi ? "dişi çiçek" : "üreme organı yok");
const whole = (f: Flower) => (f.canak && f.tac && f.erkek && f.disi ? "tam" : "eksik");
const complete = mk({
  caption:
    "Tamlık ve eşeylilik iki ayrı ölçüttür (bölümdeki tanımlar): dört organ takımının hepsi varsa çiçek tam, biri bile yoksa eksiktir; erkek ve dişi organ birlikteyse iki eşeylidir. Taç yapraksız iki eşeyli çiçek eksik ama erseliktir.",
  alt: "Dört satırlı tablo: çanak, taç, erkek ve dişi organ için var ya da yok; son sütunda tamlık kararı. Adımlar dört örnek çiçeği sırayla vurgular.",
  h: 356,
  steps: FLOWERS.map((f) => f.name),
  draw: (_v, step) => {
    const yn = (b: boolean) => (b ? "var" : "yok");
    const t = table(
      ["Örnek", "Çanak", "Taç", "Erkek", "Dişi", "Tamlık"],
      FLOWERS.map((f) => [f.name.replace(" ", "\n"), yn(f.canak), yn(f.tac), yn(f.erkek), yn(f.disi), whole(f)]),
      { hi: step },
    );
    const f = FLOWERS[step];
    return { els: t.els, readout: [`${f.name}: ${whole(f)}, ${sexOf(f)}.`, "Karar tekil yaprak sayısına değil, organ takımının varlığına dayanır."] };
  },
});

const micro = mk({
  caption:
    "Mikrospor ana hücresinden sperme (bölümdeki tipik model, kayıp yok kabulü): 2n = 18 ana hücre mayozla dört haploit (n = 9) mikrospor verir; her mikrospor iki hücreli polene, generatif hücre mitozla iki sperme gider. Mitoz takım sayısını değiştirmez.",
  alt: "Dört satırlı tablo: ana hücre, mikrospor, polen ve sperm sayıları ile kromozom sayısı. Sürgü ana hücre sayısını 1 ile 4 arasında değiştirir.",
  h: 260,
  param: { label: "Ana hücre", min: 1, max: 4, step: 1, init: 1 },
  draw: (n) => {
    const t = table(
      ["Evre", "Sayı", "Kromozom"],
      [
        ["Ana hücre", String(n), "2n = 18"],
        ["Mikrospor (mayoz)", String(4 * n), "n = 9"],
        ["Polen", String(4 * n), "n = 9"],
        ["Sperm (mitoz)", String(8 * n), "n = 9"],
      ],
    );
    return { els: t.els, readout: [`${n} ana hücre → ${4 * n} mikrospor → ${4 * n} polen → ${8 * n} sperm.`, "Mikrospor sayısı ile sperm sayısı aynı aşamanın sonucu değildir."] };
  },
});

const NUC = [1, 2, 4, 8];
const nuclei = mk({
  caption:
    "Sitokinez olmadan mitoz çekirdek sayısını artırır (bölümdeki tipik model, ölçekli değil): işlevli megaspor çekirdeği üç mitoz geçirir; çekirdek sayısı 1 → 2 → 4 → 8 olur, bu sırada ayrı hücre oluşmaz. Her çekirdek n taşır.",
  alt: "Uzun oval kese içinde çekirdekler: adımlarda bir, iki, dört ve sekiz çekirdek; sekizde dördü bir uçta, dördü öbür uçta.",
  h: 220,
  steps: NUC.map((n, i) => (i === 0 ? "1 çekirdek" : `${i}. mitoz: ${n}`)),
  draw: (_v, step) => {
    const n = NUC[step];
    const els: El[] = [S([[40, 110], [120, 40], [400, 40], [490, 110], [400, 180], [120, 180]], { bold: true, tone: "b" })];
    const xs = n === 1 ? [[265, 110]] : n === 2 ? [[150, 110], [380, 110]] : n === 4 ? [[130, 90], [130, 130], [400, 90], [400, 130]] : [[110, 80], [150, 80], [110, 140], [150, 140], [380, 80], [420, 80], [380, 140], [420, 140]];
    for (const [x, y] of xs) els.push(C(x, y, 12, { tone: "a", fill: "a" }));
    els.push(T(265, 210, `${n} çekirdek, 1 hücre; her çekirdek n`, "c", { tone: "a", bold: true }));
    return { els, readout: [step === 0 ? "İşlevli megaspor: bir çekirdek." : `${NUC[step - 1]} × 2 = ${n} çekirdek; sitoplazma henüz bölünmedi.`, "Üç mitoz geçirildi diye n üçe bölünmez; 8n tek çekirdek de oluşmaz."] };
  },
});

const sac = mk({
  caption:
    "Tipik embriyo kesesi (nitel şema, ölçekli değil): mikropil kutbunda bir yumurta ve iki sinerjit, karşı kutupta üç antipod, ortada iki polar çekirdekli merkez hücre. Hücre sayısı 1 + 2 + 3 + 1 = 7; çekirdek sayısı 1 + 2 + 3 + 2 = 8. Şekli döndürmek mikropile yakınlığı değiştirmez.",
  alt: "Düşey oval kese, mikropil altta. Altta bir yumurta hücresi ve iki yanında sinerjitler; üstte üç antipod; ortada iki çekirdekli büyük merkez hücre.",
  h: 380,
  draw: () => {
    const cx = 150;
    const els: El[] = [S([[cx, 20], [cx + 90, 80], [cx + 100, 200], [cx + 70, 320], [cx, 360], [cx - 70, 320], [cx - 100, 200], [cx - 90, 80]], { bold: true, tone: "b" })];
    for (const [x, y] of [[cx - 34, 70], [cx + 34, 70], [cx, 100]]) els.push(C(x, y, 22, { tone: "muted" }), C(x, y, 6, { tone: "muted", fill: "muted" }));
    els.push(C(cx - 22, 200, 8, { tone: "a", fill: "a" }), C(cx + 22, 200, 8, { tone: "a", fill: "a" }));
    els.push(C(cx - 40, 300, 22, { tone: "c" }), C(cx + 40, 300, 22, { tone: "c" }), C(cx - 40, 300, 6, { tone: "c", fill: "c" }), C(cx + 40, 300, 6, { tone: "c", fill: "c" }));
    els.push(C(cx, 318, 26, { tone: "warn", bold: true }), C(cx, 318, 8, { tone: "warn", fill: "warn" }));
    els.push(...lead(cx + 34, 70, 290, 60, "3 antipod", "muted", true));
    els.push(...lead(cx + 22, 200, 290, 170, "merkez hücre:", "a", true));
    els.push(T(290, 200, "2 polar çekirdek", "e", { tone: "a" }));
    els.push(...lead(cx + 40, 300, 290, 270, "2 sinerjit", "c", true));
    els.push(...lead(cx + 20, 330, 290, 316, "yumurta", "warn", true));
    els.push(T(290, 356, "mikropil kutbu", "e", { tone: "muted" }), L(cx, 360, cx, 374, { tone: "muted" }));
    return { els, readout: ["Hücre: 1 + 2 + 3 + 1 = 7; çekirdek: 1 + 2 + 3 + 2 = 8.", "Ortadaki iki çekirdek ayrı hücre değildir."] };
  },
});

const paths = tableFig({
  caption:
    "İki üreme yolunu doğru ölçülerle karşılaştır (bölümdeki tipik model): mayoz iki yolun başında takımı yarıya indirir; erkek yolda dört ürün işlevli kalır, tipik dişi yolda dörtten biri. Polen, sperm, kese ve yumurta sayıları aynı adımda eşitlenmez.",
  alt: "Üç satırlı tablo: mayoz ürünü erkek yolda 4 mikrospor, dişi yolda 4 megasporun 1'i işlevli; mitoz erkek yolda generatif mitozla 2 sperm, dişi yolda 3 mitozla 8 çekirdek; sonuç polen ve embriyo kesesi.",
  headers: ["Aşama", "Erkek yol", "Dişi yol"],
  rows: [
    ["Mayoz", "4 mikrospor,\n4'ü işlevli", "4 megaspor,\n1'i işlevli"],
    ["Mitoz", "generatif\nmitoz: 2 sperm", "3 mitoz:\n8 çekirdek"],
    ["Sonuç", "polen: tüp\nhücresi, 2 sperm", "kese: 7 hücre,\n8 çekirdek"],
  ],
  readout: ["Sorunun hangi evreyi saydığını açıkça işaretle.", "Kayıp yok kabulü kartta verilmeden sayı hesaplanmaz."],
});

/* ---------------- Tozlaşma ---------------- */

const boundary = mk({
  caption:
    "Taşınma olayının sınırı (nitel akış şeması): tozlaşma polenin başçıktan tepeciğe taşınmasıdır; çimlenme ve tüp başlangıcı sonraki kapılardır, döllenme ise sperm ile yumurta çekirdeğinin birleşmesidir. Polen tepeciğe ulaşmış ama döllenme olmamış olabilir.",
  alt: "Yukarıdan aşağı beş kutu: başçıkta polen, taşıyıcı, tepecik, polen tüpü başlangıcı, döllenme. İlk üç kutunun yanında tozlaşma parantezi, son kutu kesik çizgili ayrı olay.",
  h: 380,
  draw: () => {
    const c = chain(
      [
        { label: "Başçıkta polen", tone: "c" },
        { label: "Taşıyıcı: rüzgâr, hayvan…" },
        { label: "Tepecik", tone: "b", fill: "b", bold: true },
        { label: "Çimlenme, tüp başlangıcı", tone: "a" },
        { label: "Döllenme (ayrı olay)", tone: "muted", dash: true },
      ],
      { cx: 190, w: 320, gap: 26 },
    );
    const els = [...c.els, L(372, 14, 372, 194, { tone: "b", bold: true }), L(362, 14, 372, 14, { tone: "b" }), L(362, 194, 372, 194, { tone: "b" }), T(380, 104, "tozlaşma", "e", { tone: "b", bold: true })];
    return { els, readout: ["Kapalı tohumluda varış yeri tepeciktir; yumurta ya da bütün yumurtalık değildir.", "Çift döllenme ve tohum oluşumu sonraki ünitenin konusudur."] };
  },
});

const ROUTES = [
  { name: "Aynı çiçek", to: [110, 70] as [number, number], from: [110, 70] as [number, number], kind: "kendi kendine (aynı çiçek)", txt: "Polen aynı çiçeğin tepeciğine ulaşır." },
  { name: "Aynı bireyin başka çiçeği", from: [110, 70] as [number, number], to: [170, 150] as [number, number], kind: "birey düzeyinde kendi kendine", txt: "Çiçekler arası hareket var, genetik ebeveyn yine aynı birey (geitonogami)." },
  { name: "Başka birey, aynı tür", from: [110, 70] as [number, number], to: [380, 70] as [number, number], kind: "çapraz tozlaşma", txt: "Polen kaynağı ayrı birey ve aynı tür: bireyler arası çapraz tozlaşma." },
];
const individual = mk({
  caption:
    "Aynı bireyin başka çiçeği farklı birey değildir (nitel şema): aynı çiçek içinde kendi kendine tozlaşma, aynı bireyin başka çiçeğine taşınma (birey düzeyinde kendi kendine) ve aynı türden başka bireye çapraz tozlaşma. Hayvanla taşınmış olmak çapraz olduğunu tek başına göstermez.",
  alt: "Solda iki çiçekli birinci bitki, sağda iki çiçekli ikinci bitki. Adımlarda polen oku aynı çiçekte döner, aynı bitkinin alt çiçeğine iner ya da sağdaki bitkiye gider.",
  h: 300,
  steps: ROUTES.map((r) => r.name),
  draw: (_v, step) => {
    const r = ROUTES[step];
    const plantAt = (x: number, tone: Tone, label: string): El[] => [
      L(x, 290, x, 60, { bold: true, tone: "a" }),
      L(x, 160, x + 60, 150, { tone: "a" }),
      C(x, 60, 22, { tone, fill: tone }),
      C(x + 60, 150, 22, { tone, fill: tone }),
      T(x + 30, 274, label, "e", { tone: "muted" }),
    ];
    const els: El[] = [...plantAt(110, "warn", "birey 1"), ...plantAt(380, "c", "birey 2")];
    if (step === 0) els.push(C(110, 60, 34, { tone: "ink", dash: true, bold: true }));
    else els.push(A(r.from[0] + 20, r.from[1] - 6, r.to[0] - (step === 2 ? 26 : 4), r.to[1] - (step === 2 ? 6 : 26), "ink", { bold: true }));
    els.push(T(266, 220, r.kind, "c", { tone: "a", bold: true }));
    return { els, readout: [`${r.name}: ${r.txt}`, "Çiçek sayısını birey sayısıyla karıştırma."] };
  },
});

const GATES = ["Tür", "Uyum", "Canlılık", "Alıcılık"];
const GSTEP = [
  { name: "Hepsi açık", closed: -1 },
  { name: "Başka tür", closed: 0 },
  { name: "Uyumsuz", closed: 1 },
  { name: "Ölü polen", closed: 2 },
  { name: "Alıcı değil", closed: 3 },
];
const gates = mk({
  caption:
    "Canlılık ve alıcılık ayrı kapılardır (bölümdeki dört kapılı model): polenin tepeciğe varışı her durumda görülebilir; tür, uyum, canlılık ve alıcılık kapılarından biri kapalıysa tüp başlangıcı beklenmez. Aynı “tüp yok” sonucu farklı nedenlerle oluşabilir; hiçbir aşamada tohum garantisi yoktur.",
  alt: "Solda polen varış kutusu, sağa doğru sıralı dört kapı kutusu ve en sağda tüp başlangıcı kutusu. Adımlarda kapılardan biri kesik çizgiyle kapalı gösteriliyor ve tüp kutusu sönük.",
  h: 220,
  steps: GSTEP.map((g) => g.name),
  draw: (_v, step) => {
    const g = GSTEP[step];
    const els: El[] = [...B(266, 30, "Polen tepecikte: varış var", { tone: "b", fill: "b" })];
    GATES.forEach((name, i) => {
      const x = 76 + i * 127;
      const shut = i === g.closed;
      els.push(...B(x, 110, name, { w: 116, tone: shut ? "warn" : "a", fill: shut ? undefined : "a", dash: shut }));
      if (shut) els.push(L(x - 40, 126, x + 40, 94, { tone: "warn", bold: true }));
    });
    els.push(A(266, 52, 266, 84, "ink"));
    const ok = g.closed < 0;
    els.push(A(266, 136, 266, 164, ok ? "a" : "muted", { dash: !ok }), ...B(266, 190, ok ? "Tüp başlangıcı" : "Tüp yok", { tone: ok ? "a" : "muted", fill: ok ? "a" : undefined, dash: !ok }));
    return { els, readout: [ok ? "Dört kapı açık: tüp başlangıcı beklenir; döllenme ayrıca gerekir." : `${GATES[g.closed]} kapısı kapalı: tüp yok, ama varış silinmedi.`, "Uyumsuz ve ölü polen aynı sonucu verebilir; nedenleri farklıdır."] };
  },
});

const ratio = mk({
  caption:
    "Sayıları doğru paydadan oranla (bölümdeki örnek): 100 polenden 20'si tepeciğe ulaşır, bunların 10'u çimlenir. Toplamdan çimlenme %10, ulaşanlardan çimlenme %50'dir; iki yüzde farklı sorulara doğru yanıttır. Döllenme ya da tohum oranı bu sayılardan çıkmaz.",
  alt: "Üç yatay çubuk: taşınan 100, ulaşan 20, çimlenen 10. İki adım: payda toplam ve payda ulaşan; paydaya karşılık gelen çubuk vurgulu.",
  h: 170,
  steps: ["Payda: toplam", "Payda: ulaşan"],
  draw: (_v, step) => {
    const b = bars(
      [
        { label: "Taşınan", value: 100, tone: step === 0 ? "warn" : "muted" },
        { label: "Ulaşan", value: 20, tone: step === 1 ? "warn" : "muted" },
        { label: "Çimlenen", value: 10, tone: "a" },
      ],
      { max: 100 },
    );
    const d = step === 0 ? 100 : 20;
    return { els: b.els, readout: [`10 / ${d} = %${(1000 / d).toFixed(0)}.`, "Yüzde yazmadan önce hangi paydanın istendiğini belirt."] };
  },
});

const bagging = tableFig({
  caption:
    "Torbalama deneyinde hangi yolu kapattığını söyle (bölüm metninden): torba dış poleni engeller ama kendi çiçeğinin polenini zorunlu engellemez; başçık çıkarma yerel polen kaynağını azaltır. Çaprazlama deneyinde ikisi birlikte kullanılıp polen elle verilir; işlem yaralanma için ayrı kontrol ister.",
  alt: "Üç satırlı tablo: torba dış poleni kapatır, kendi poleni açık kalır; başçık çıkarma yerel poleni kapatır, dış polen açık kalır; ikisi birlikte ve elle polen yalnız verilen poleni bırakır.",
  headers: ["Uygulama", "Kapatılan", "Açık kalan"],
  rows: [
    ["Torba", "dış polen", "kendi çiçeğinin\npoleni"],
    ["Başçık çıkarma", "yerel polen", "dış polen"],
    ["İkisi + elle\npolen", "dış ve yerel", "yalnız verilen\npolen"],
  ],
  readout: ["İki uygulamanın aynı sonucu vermesini beklemek müdahale yerlerini karıştırır.", "Yalnız son tohum sayısından bütün mekanizma çıkarılmaz."],
});

export const biologyFigures061Flower: Record<string, Record<string, FigureDef>> = {
  "cicek-yapisi-ureme": {
    "Sap ve tabla organların bağlandığı ekseni kurar": anatomy,
    "Tamlık dört organ takımının varlığıdır": complete,
    "Bir mikrospor ana hücresi dört ürüne ayrılır": micro,
    "Sitokinez olmadan mitoz çekirdek sayısını artırır": nuclei,
    "Tipik embriyo kesesi yedi hücre ve sekiz çekirdektir": sac,
    "İki üreme yolunu doğru ölçülerle karşılaştır": paths,
  },
  "bitki-tozlasma": {
    "Önce taşınma olayının sınırını çiz": boundary,
    "Aynı bireyin başka çiçeği farklı birey değildir": individual,
    "Canlılık ve alıcılığı ayrı kontrollerle sınayabilirsin": gates,
    "Sayıları doğru paydadan oranla": ratio,
    "Torbalama deneyinde hangi yolu kapattığını söyle": bagging,
  },
};
