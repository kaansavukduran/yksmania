import { seg, txt, v, vec, type El, type FigureDef } from "./figureKit";
import { card, cardLines, CW, fitH, flowFig, frame, LH, rect, tableFig, timelineFig, wrap } from "./turkishFigures060Kit";

/*
 * Forge060 TYT Felsefe · İlk Çağ, Orta Çağ ve 18–19. yüzyıl. Ad, görüş ve
 * yaklaşık tarihler yalnız bölüm metninden alınır; tablolar ders
 * sınıflamasıdır, bir düşünürün bütün görüşünü tek satıra indirgemez ve taraf
 * tutmaz.
 */

// ilk-cag-felsefesi · 1 · Arkhe yanıtları.
const arkhe = tableFig({
  caption:
    "Arkhe sorusu: farklı görünen nesneler hangi ortak temelle açıklanır? Bir düşünüre tıkla: önerdiği ilke ve çokluğu nasıl açıkladığı açılır. Bu ilkeler bugünkü deneysel element listesiyle özdeş değildir.",
  alt: "Altı satırlı tablo. Thales su; Anaksimandros apeiron, sınırsız-belirsiz ilke; Anaksimenes hava, yoğunlaşma ve seyrekleşme; Empedokles dört kök, sevgi ve nefret; Anaksagoras nous; Demokritos atom ve boşluk.",
  cols: [
    { name: "Düşünür", w: 3.5 },
    { name: "İlke", w: 2.8 },
    { name: "Çokluk nasıl?", w: 3.7 },
  ],
  rows: [
    { cells: ["Thales", "su", "tek belirli madde"], tones: [undefined, "c", "muted"], detail: ["Thales arkheyi suyla ilişkilendirir.", "Ezber eşleştirme yerine belirli madde ile belirlenmemiş temel farkını sor."] },
    { cells: ["Anaksimandros", "apeiron", "sınırsız-belirsiz ilke"], tones: [undefined, "c", "muted"], detail: ["Belirli bir karşıtın ötekileri açıklamakta sınırlı kalacağını düşünür.", "Apeiron belirli bir madde değildir."] },
    { cells: ["Anaksimenes", "hava", "yoğunlaşma, seyrekleşme"], tones: [undefined, "c", "muted"], detail: ["Havayı ve dönüşümleri öne çıkarır.", "Dönüşümün nasıl açıklandığını sor."] },
    { cells: ["Empedokles", "dört kök", "sevgi ile birleşme, nefret ile ayrılma"], tones: [undefined, "b", "muted"], detail: ["Ateş, hava, su ve toprak köklerdir; birleşme ve ayrılma sevgi ve nefretle açıklanır.", "Sevgi burada doğadaki birleşmenin açıklamasında iş görür."] },
    { cells: ["Anaksagoras", "nous", "çok öğenin düzenlenmesi"], tones: [undefined, "b", "muted"], detail: ["Çok sayıdaki öğenin düzenlenmesinde nous kavramını kullanır.", "Nous günlük düşünce diye okunmamalıdır."] },
    { cells: ["Demokritos", "atom, boşluk", "parçaların düzen ve birleşimi"], tones: [undefined, "b", "muted"], detail: ["Bölünmez temel parçalar ve boşluk; değişim birleşimlerdeki farklarla açıklanır.", "Bu atom modern deneysel atom kuramı değildir."] },
  ],
  foot: "Ortak yön: doğa için akla dayalı bütünlüklü bir ilke aramak; birbirinin bütün ayrıntılarını kabul etmek değil.",
});

// ilk-cag-felsefesi · 2 · Herakleitos ve Parmenides.
const changeBeing = tableFig({
  caption:
    "Değişim mi temel gerçeklik, değişmez varlık mı? Bir düşünüre tıkla: görüşünün odağı ve sık yapılan aşırı genelleme açılır. Karşıt görüşler olarak yan yana verilmeleri belgeli bir yanıtlaşmayı kanıtlamaz.",
  alt: "İki satırlı tablo. Herakleitos: değişim ve karşıtların ilişkisi, ateş ve logos, değişim ile düzen birlikte. Parmenides: varlığın birliği ve değişmezliği, akıl ile duyular arasında gerilim.",
  cols: [
    { name: "Düşünür", w: 3.0 },
    { name: "Temel vurgu", w: 3.6 },
    { name: "Kavramlar", w: 3.4 },
  ],
  rows: [
    { cells: ["Herakleitos", "değişim, karşıtların ilişkisi", "ateş, logos (düzen)"], tones: [undefined, "c", "muted"], detail: ["Değişim ile düzen aynı görüşte birlikte bulunur.", "“Her şey değişir” ifadesini hiçbir düzen düşünülemez diye genişletme."] },
    { cells: ["Parmenides", "varlığın birliği, değişmezlik", "akıl ile duyu gerilimi"], tones: [undefined, "b", "muted"], detail: ["Yokluktan varlık çıkması ya da varlığın yok olması düşüncesini sorgular.", "Problem gözlenen hareketi saymak değil, değişimin nasıl düşünülebileceğidir."] },
  ],
  foot: "Mantıksal karşılaştırma ile belgeli etkileşim iddiası farklıdır.",
});

// ilk-cag-felsefesi · 3 · Mağara benzetmesi.
const cave = flowFig({
  caption:
    "Mağara benzetmesi adım adım: gölgeler, gölgenin kaynağı, dışarısı ve güneş. İleri ile her aşamayı aç. Benzetme fiziksel bir deney ya da ölçüm değildir; bilgi düzeyleri arasındaki ayrımı görünür kılar.",
  alt: "Dört kart alt alta, oklarla bağlı: gölgeler, alışılmış görünüş; gölgenin kaynağı, taşınan nesneler; dışarısı, daha kapsamlı kavrayış; güneş, iyi ideası ve bilginin koşulları.",
  nodes: [
    { head: "Gölgeler", text: "mağaradakiler gölgeyi gerçekliğin bütünü sanabilir", tone: "muted", note: "Önlerindeki gölgeler alışılmış görünüştür." },
    { head: "Gölgenin kaynağı", text: "zincirden kurtulup taşınan nesneye dönmek", tone: "b", note: "Gölge ile taşınan nesneyi ayrı görmek ilk geçiştir." },
    { head: "Dışarısı", text: "alışılmış görünüşten daha kapsamlı kavrayışa", tone: "c", note: "Dışarıdaki görünüm daha kapsamlı kavrayışı anlatır." },
    { head: "Güneş ve aydınlanma", text: "iyi ideası ve bilginin koşulları", tone: "a", note: "Güneş, iyi ideası ve bilginin koşullarıyla ilişkili olarak yorumlanır." },
  ],
  steps: ["Gölgeler", "Kaynak", "Dışarısı", "Güneş"],
  reveal: true,
  foot: "Modelin çizgilerini metafizik bir ölçüm gibi okuma; hangi düşünsel ayrımı gösterdiğini açıkla.",
});

// ilk-cag-felsefesi · 4 · Dört neden.
const fourCauses = tableFig({
  caption:
    "Aristoteles’in dört nedeni bölümün heykel örneğinde: her neden ayrı bir soruya yanıt verir. Bir nedene tıkla: sorusu ve karıştırılan nokta açılır. Neden burada yalnız zamanca önce gelen itici olay değildir.",
  alt: "Dört satırlı tablo. Maddi neden: neyden yapıldı, malzeme. Formel neden: onu bu eser yapan düzen, biçim. Fail neden: kim yaptı, yapan kişi. Ereksel neden: ne için yapıldı, amaç.",
  cols: [
    { name: "Neden", w: 2.6 },
    { name: "Soru", w: 4.2 },
    { name: "Heykelde", w: 3.2 },
  ],
  rows: [
    { cells: ["maddi", "Neyden yapıldı?", "malzeme"], tones: [undefined, "muted", "c"], detail: ["Heykelde kullanılan malzeme.", "Madde ve form birlikteliği tekil varlığı açıklar."] },
    { cells: ["formel", "Onu bu eser yapan düzen nedir?", "biçim"], tones: [undefined, "muted", "c"], detail: ["Form yalnız dış çizgi değil, onu o tür varlık yapan düzendir.", "Platon’dan farkı formun tekil nesneyle ilişkisinde aranır."] },
    { cells: ["fail", "Kim yaptı?", "yapan kişi"], tones: [undefined, "muted", "c"], detail: ["Heykeli yapan kişi.", "Zamanda önce gelen itici olay yalnız bu nedenin bir yönüdür."] },
    { cells: ["ereksel", "Ne için yapıldı?", "yapılma amacı"], tones: [undefined, "muted", "c"], detail: ["Heykelin yapılma amacı.", "Amaç sorusu, potansiyelin gerçekleşmesi (tohum → ağaç) düşüncesiyle bağlantılıdır."] },
  ],
  foot: "Duyusal gözlem tekilleri tanımaya, akıl ilişkileri ve genel olanı kavramaya katkı sunar.",
});

// orta-cag-felsefesi · 1 · Yaklaşık dönemler (ölçekli yüzyıl ekseni).
const C0 = 2;
const C1 = 15;
const X = (c: number) => 0.4 + ((c - C0) * (CW - 0.8)) / (C1 - C0);
const ERAS = [
  { from: 2, to: 8, label: "Patristik", tone: "c" as const, title: "Patristik (yaklaşık MS 2–8. yüzyıl)", detail: ["Erken Hristiyan düşüncesinin savunulması, açıklanması ve kavramsal kuruluşu.", "Savunma çalışmalarında apoloji terimi kullanılır; erken dönemde Platoncu etkiler önem kazanabilir."] },
  { from: 8, to: 15, label: "Skolastik", tone: "b" as const, title: "Skolastik (yaklaşık 8–15. yüzyıl)", detail: ["Okul geleneği içinde inanç ile aklın daha sistemli ele alınışı.", "Sonraki tartışmalarda Aristotelesçi etkiler önem kazanabilir; her düşünürü tek etiketle açıklama."] },
];
const periodsDraw = (pick: number) => {
  const els: El[] = [];
  let y = 0;
  for (const s of wrap("Ders kaynaklarındaki genel başlık: MS 2–15. yüzyıl", CW - 0.4)) {
    els.push(txt(v(0, y), s, "e", { small: true, tone: "muted" }));
    y -= LH;
  }
  const top = y - 0.25;
  const bot = top - 0.9;
  ERAS.forEach((e, i) => {
    els.push(rect(X(e.from) + 0.02, top, X(e.to) - 0.02, bot, pick === i ? "a" : e.tone));
    els.push(txt(v((X(e.from) + X(e.to)) / 2, (top + bot) / 2), e.label, "c", { small: true, bold: true, tone: pick === i ? "a" : "ink", pick: i }));
  });
  const ay = bot - 0.35;
  els.push(seg(v(X(C0), ay), v(X(C1), ay), { tone: "muted", thin: true }));
  for (const c of [2, 5, 8, 11, 15]) {
    els.push(seg(v(X(c), ay + 0.08), v(X(c), ay - 0.08), { tone: "muted", thin: true }));
    els.push(txt(v(X(c), ay - 0.12), `${c}.`, "s", { small: true, tone: "muted" }));
  }
  let ny = ay - 1.0;
  for (const s of [
    "yüzyıl (MS), yaklaşık sınırlar; ölçek yüzyıla göre",
    "Bu sınır bütün coğrafyalarda aynı anda geçerli değildir.",
  ].flatMap((s) => wrap(s, CW - 0.4))) {
    els.push(txt(v(0, ny), s, "e", { small: true, tone: "muted" }));
    ny -= LH;
  }
  return { els, h: -ny - 0.2 };
};
const periodsH = periodsDraw(-1).h;
const periods: FigureDef = {
  caption:
    "Orta Çağ felsefesinin ders kaynaklarındaki yaklaşık dönemlemesi, yüzyıl ekseninde ölçekli çubuklar: patristik yaklaşık 2–8, skolastik yaklaşık 8–15. yüzyıl. Bir döneme tıkla: odağı açılır. Dönemlemeler öğretimi kolaylaştırır; bütün metinlerin bir tarihte birden değiştiğini göstermez.",
  alt: "Yatay yüzyıl ekseni, 2'den 15'e. Patristik çubuğu 2. ile 8. yüzyıl arasında, skolastik çubuğu 8. ile 15. yüzyıl arasında.",
  maxHeight: fitH(periodsH),
  picks: ERAS.map((e) => ({ label: e.label, title: e.title, detail: e.detail })),
  draw: (_v, _s, pick = -1) => {
    const { els } = periodsDraw(pick);
    els.push(...frame(periodsH));
    return { els, readout: [pick >= 0 ? ERAS[pick].detail[0] : "Bir döneme tıkla ya da aşağıdan seç.", "Hristiyan ve İslam düşünce gelenekleri farklı dil ve kültürlerle etkileşim içinde kendi tartışmalarını geliştirmiştir."] };
  },
};

// orta-cag-felsefesi · 2 · Tümeller tablosu.
const universalsTable = tableFig({
  caption:
    "Tümeller problemi: birçok tekil için söylenen genel olanın (insan, ağaç) statüsü nedir? Bir yaklaşıma tıkla: tanımı ve ders kaynaklarının eşleştirdiği adlar açılır. Etiketten önce tanımı oku.",
  alt: "Dört satırlı tablo. Güçlü gerçekçilik: tümel tekillerden bağımsız, Platoncu; Augustinus, Anselmus. Ilımlı gerçekçilik: ortak doğa tekilde; Aquinolu Thomas. Kavramcılık: tümel zihinsel kavram. Adcılık: ortak ad; Ockhamlı William.",
  cols: [
    { name: "Yaklaşım", w: 3.4 },
    { name: "Tümel nerede?", w: 3.6 },
    { name: "Ders eşleştirmesi", w: 3.0 },
  ],
  rows: [
    { cells: ["güçlü gerçekçilik", "tekillerden bağımsız", "Augustinus, Anselmus"], tones: [undefined, "c", "muted"], detail: ["Tümellerin tekillerden bağımsız gerçekliği vardır; Platoncu örnekle ilişkilendirilebilir.", "Ad eşleştirmesini tanım farkıyla birlikte öğren."] },
    { cells: ["ılımlı gerçekçilik", "tekilde ortak doğa", "Aquinolu Thomas"], tones: [undefined, "c", "muted"], detail: ["Ortak form ya da doğa tekil varlıklarla ilişkili ele alınır.", "Bazı ders tabloları bunu kavramcılık adıyla verebilir; tanımı esas al."] },
    { cells: ["kavramcılık", "zihinsel kavram", "bölümde ad verilmez"], tones: [undefined, "b", "muted"], detail: ["Tümelin zihinsel kavram olarak statüsü öne çıkar.", "Zihin içeriği ile adın işlevi aynı açıklama değildir."] },
    { cells: ["adcılık", "yalnız ortak ad", "Ockhamlı William"], tones: [undefined, "b", "muted"], detail: ["Tekiller dışında ayrı tümel varlık kabul edilmez; ortak ad ya da dil kullanımı vurgulanır.", "Genel kavram ve göstergelerin kullanılabildiğini inkâr etmez."] },
  ],
  foot: "Önce aynı türden tekilleri ve onlar için kullanılan genel kavramı ayır.",
});

// orta-cag-felsefesi · 3 · İki ağaç şeması.
const UNIV = [
  { step: "güçlü gerçekçilik", top: "tümel “ağaç”: bağımsız", up: false, inner: false, note: "Tümel, tekillerden bağımsız bir gerçekliktir; iki ağaç ondan pay alır (Platoncu örnek)." },
  { step: "ılımlı gerçekçilik", top: "", up: false, inner: true, note: "Ortak doğa her ağaçta örneklenir; tümel tekillerden tamamen ayrı bir yerde duran nesne değildir." },
  { step: "kavramcılık", top: "zihin: “ağaç” kavramı", up: true, inner: false, note: "Tümel zihinsel bir kavramdır; zihin tekillerden ortak kavramı kurar." },
  { step: "adcılık", top: "yalnız ortak ad: “ağaç”", up: true, inner: false, note: "Tekiller dışında ayrı tümel varlık yoktur; ortak ad iki tekile uygulanır." },
];
const treesDraw = (step: number) => {
  const u = UNIV[step];
  const els: El[] = [];
  const topY = 0;
  let topBottom = topY;
  if (u.top) {
    const lines = cardLines(2.4, CW - 2.4, undefined, u.top, "ink", "ink");
    topBottom = card(els, 2.4, topY, CW - 2.4, lines.map((l) => ({ ...l, tone: "a" })), step === 3 ? "muted" : "a", { dash: step === 3, fill: step !== 3 });
  }
  const ty = Math.min(topBottom, -1.0) - 1.3;
  const second = u.inner ? "içinde: ortak doğa" : " ";
  const L = cardLines(0.2, 4.4, "tekil: bu ağaç", second, "ink", "c");
  const R = cardLines(5.6, CW - 0.2, "tekil: şu ağaç", second, "ink", "c");
  const yb = card(els, 0.2, ty, 4.4, L, "b");
  card(els, 5.6, ty, CW - 0.2, R, "b");
  if (u.top) {
    const a1 = [3.4, topBottom - 0.06] as const;
    const a2 = [CW - 3.4, topBottom - 0.06] as const;
    const b1 = [2.3, ty + 0.08] as const;
    const b2 = [CW - 2.3, ty + 0.08] as const;
    const tone = step === 3 ? "muted" : "a";
    if (step === 3) {
      els.push(seg(v(...a1), v(...b1), { tone, dash: true, thin: true }), seg(v(...a2), v(...b2), { tone, dash: true, thin: true }));
    } else if (u.up) {
      els.push(vec(v(...b1), v(...a1), { tone }), vec(v(...b2), v(...a2), { tone }));
    } else {
      els.push(vec(v(...a1), v(...b1), { tone }), vec(v(...a2), v(...b2), { tone }));
    }
  }
  return { els, h: -yb + 0.1 };
};
const treesH = Math.max(...UNIV.map((_, i) => treesDraw(i).h));
const universalTrees: FigureDef = {
  caption:
    "Bölümün önerdiği şema: aynı iki ağaç, tümelin dört farklı yerleşimi. İleri ile yaklaşımları sırayla aç: bağımsız tür kutusu, her ağaçta örneklenen ortak doğa, zihindeki kavram ve yalnız ortak ad. Şema görüşü temsil eder, doğruluğunu ölçmez.",
  alt: "Altta iki tekil ağaç kartı. Güçlü gerçekçilikte üstteki bağımsız tümel kartından ağaçlara ok iner. Ilımlı gerçekçilikte üst kart yok, her ağaç kartında ortak doğa yazar. Kavramcılıkta ağaçlardan zihindeki kavram kartına ok çıkar. Adcılıkta üstte yalnız ortak ad, kesik çizgilerle bağlı.",
  maxHeight: fitH(treesH),
  steps: UNIV.map((u) => u.step),
  draw: (_v, step) => {
    const s = Math.min(step, UNIV.length - 1);
    const { els } = treesDraw(s);
    els.push(...frame(treesH));
    return { els, readout: [UNIV[s].note, "İki yaklaşım da ortaklığı rastgele ses saymayabilir; fark, ortak olanın tekillerle ilişkisindedir."] };
  },
};

// 18-19-yuzyil-felsefesi · 1 · Bilginin kaynağı.
const knowledge = tableFig({
  caption:
    "Bilgi kuramında üç yanıt: akılcılık, deneycilik ve Kant. Bir yaklaşıma tıkla: bilginin kaynağı ve gerekçesi hakkındaki vurgusu ile bölümdeki örnek açılır. İkisi de akıl yürütür; tartışılan bilginin kaynağı ve gerekçesidir.",
  alt: "Üç satırlı tablo. Akılcılık: aklın ilke ve çıkarımlarına öncelik. Deneycilik: bilgi malzemesi deneyimden gelir; Locke boş levha, Hume izlenim ve fikir. Kant: bilgi deneyimle başlar ama tümü deneyimden çıkmaz; duyarlık ve anlama yetisi.",
  cols: [
    { name: "Yaklaşım", w: 2.8 },
    { name: "Vurgu", w: 3.8 },
    { name: "Bölümdeki örnek", w: 3.4 },
  ],
  rows: [
    { cells: ["akılcılık", "aklın ilke ve çıkarımları öncelikli", "a priori gerekçe"], tones: [undefined, "c", "muted"], detail: ["Güvenilir bilgide aklın ilke ve çıkarımlarına öncelik tanır.", "A priori: belirli deneyimlerden bağımsız gerekçelendirme; takvimde önce öğrenmek değildir."] },
    { cells: ["deneycilik", "bilgi malzemesi deneyimden", "Locke, Hume"], tones: [undefined, "b", "muted"], detail: ["Locke: boş levha (tabula rasa), ideler deneyimle kazanılır. Hume: izlenim ve fikir.", "Boş levha, zihnin hiçbir işlem yapmadığı anlamına gelmez."] },
    { cells: ["Kant", "deneyimle başlar, tümü deneyimden çıkmaz", "duyarlık + anlama yetisi"], tones: [undefined, "a", "muted"], detail: ["Duyular malzeme sağlar; zihnin düzenleyici yapıları da gerekir.", "İki görüşün yüzdelerini toplayan aritmetik ortalama değildir; bilginin imkân koşullarını sorar."] },
  ],
  foot: "Metinde deney kaynak mı, sınama aracı mı, zihnin düzenlediği malzeme mi diye sor.",
});

// 18-19-yuzyil-felsefesi · 2 · Kant: duyarlık ve anlama yetisi.
const kant = flowFig({
  caption:
    "Kant’ın kuramsal açıklaması bir koşullar zinciri olarak: duyusal malzeme, duyarlığın biçimleri, anlama yetisinin kategorileri ve deneyim bilgisi (fenomen). İleri ile aşamaları aç. Bu felsefi bir imkân koşulları çözümlemesidir, beyin haritası değildir.",
  alt: "Dört kart alt alta, oklarla bağlı: duyusal malzeme; duyarlık, zaman ve mekân biçimleri; anlama yetisi, kategoriler; deneyim bilgisi, fenomen. Kendinde şey sınır sorusu olarak dışarıda kalır.",
  nodes: [
    { head: "Duyusal malzeme", text: "bilgi deneyimle başlar", tone: "muted", note: "Duyular malzeme sağlar; ama tüm bilgi deneyimden çıkmaz." },
    { head: "Duyarlık", text: "nesneler bize verilir; biçimleri zaman ve mekân", tone: "c", note: "Zaman ve mekân duyarlığın biçimleridir; kişisel beğeni değildir." },
    { head: "Anlama yetisi", text: "kavramsal düzenleme; kategoriler", tone: "b", note: "Kategoriler nesne deneyiminin düşünülmesinde iş gören yapılardır." },
    { head: "Deneyim bilgisi (fenomen)", text: "bilme koşulları içinde deneyimlenen nesne", tone: "a", note: "Kendinde şey bu koşullardan bağımsız ele alma sınır sorusunu açar; görünüşler yalandır denmez." },
  ],
  steps: ["Malzeme", "Duyarlık", "Anlama yetisi", "Fenomen"],
  reveal: true,
  foot: "Bilginin sınırı ile bütün düşünmenin yasaklanması aynı şey değildir.",
});

// 18-19-yuzyil-felsefesi · 3 · Montesquieu: üç işlev.
const powers = tableFig({
  caption:
    "Montesquieu ile ilişkilendirilen kuvvetler ayrılığı: üç işlev, yetkinin tek elde sınırsız toplanmasını önlemek için ayrılır. Bir işleve tıkla: görevi ve sorulacak denetim sorusu açılır. Üç tabela, fiilî ayrılığın kanıtı değildir.",
  alt: "Üç satırlı tablo: yasama yasa koyar; yürütme uygular; yargı uyuşmazlık hakkında hüküm verir.",
  cols: [
    { name: "İşlev", w: 2.8 },
    { name: "Görevi", w: 4.0 },
    { name: "Denetim sorusu", w: 3.2 },
  ],
  rows: [
    { cells: ["yasama", "yasa koyma", "kim karar veriyor?"], tones: [undefined, "c", "muted"], detail: ["Yasa koyma işlevi.", "Amaç yalnız üç kurum adı üretmek değildir."] },
    { cells: ["yürütme", "uygulama", "kim denetliyor?"], tones: [undefined, "b", "muted"], detail: ["Yasaları uygulama işlevi.", "Bütün kararları aynı kişi belirliyorsa ayrılık için yeterli kanıt yoktur."] },
    { cells: ["yargı", "uyuşmazlıkta hüküm", "hangi itiraz yolu var?"], tones: [undefined, "a", "muted"], detail: ["Uyuşmazlık hakkında hüküm verme işlevi.", "Medeni hukuk yargının eş anlamı değildir; hukuk alanları ayrı bir tablodur."] },
  ],
  foot: "Kutu adları aynı kalsa da gerçek yetki bağlantıları değişebilir; bağlantıyı sor.",
});

// 18-19-yuzyil-felsefesi · 4 · Niyet ve sonuç.
const ethicsCompare = tableFig({
  caption:
    "Ahlakın ilkesi sorusunda üç vurgu: Kant niyeti ve ödevi, Bentham sonuçların toplam yararını, Mill hazların niteliğini öne çıkarır. Bir düşünüre tıkla: ölçütü ve karıştırılmaması gereken nokta açılır. Ders sınıflamasıdır, taraf tutmaz.",
  alt: "Üç satırlı tablo. Kant: iyi isteme, ödevden dolayı eylem, evrenselleştirme. Bentham: ilgili insanların haz ve acıları, toplam yarar. Mill: fayda içinde hazların niteliği.",
  cols: [
    { name: "Düşünür", w: 2.6 },
    { name: "Ölçüt", w: 4.2 },
    { name: "Karıştırma", w: 3.2 },
  ],
  rows: [
    { cells: ["Kant", "iyi isteme, ödevden dolayı eylem", "ödeve uygun ≠ ödevden dolayı"], tones: [undefined, "c", "warn"], detail: ["Eylemin hangi ilke ve niyetle yapıldığını araştırır; maksim evrenselleştirme testinden geçer.", "Ödül için doğru söylemek ile sırf ödev olduğu için söylemek ayrıdır."] },
    { cells: ["Bentham", "sonuçlar: haz ve acı, toplam yarar", "oy sayısı ≠ toplam yarar"], tones: [undefined, "b", "warn"], detail: ["Kimin etkilendiği ve toplam yarar-zarar hesaba katılır.", "Ölçüt yalnız yapanın kazancı ya da en çok el kaldıranların sayısı değildir."] },
    { cells: ["Mill", "fayda içinde hazların niteliği", "nitelik ≠ beğeni oylaması"], tones: [undefined, "a", "warn"], detail: ["Hazların yalnız miktarı değil nitelikleri de karşılaştırılır.", "İki haz türünü de tanımış olanların değerlendirmesine başvurur."] },
  ],
  foot: "Karşılaştırma sorusu: biri hangi niyetin, öbürü hangi sonucun ölçütünü öne çıkarıyor?",
});

// 18-19-yuzyil-felsefesi · 5 · Comte: üç hâl.
const comte = timelineFig({
  caption:
    "Comte’un üç hâl öğretisi: açıklamanın dayanağı teolojik, metafizik ve pozitif hâlde değişir. Bir hâle tıkla: neye başvurduğu açılır. Bu tarihsel bir tasvirdir; her toplumun aynı çizgiyi izlediğinin kanıtı değildir. Çizelge sıra gösterir, ölçekli değildir.",
  alt: "Düşey sıra çizelgesi, üç durak: teolojik hâl, tanrısal güç ve iradeler; metafizik hâl, soyut öz ya da güçler; pozitif hâl, gözlenebilir olgular arasındaki düzenli ilişkiler.",
  eras: [
    { when: "birinci hâl", head: "Teolojik", text: "tanrısal güç ve iradelerle açıklama", tone: "muted", detail: ["Olaylar tanrısal güç ve iradelerle açıklanır.", "Önce neyi açıkladığını, sonra hangi dayanakla açıkladığını oku."] },
    { when: "ikinci hâl", head: "Metafizik", text: "soyut öz ya da güçlerle açıklama", tone: "b", detail: ["Olaylar soyut öz ya da güçlerle açıklanır.", "İlk ya da mutlak neden arayışı ile olgusal ilişki araştırması farklıdır."] },
    { when: "üçüncü hâl", head: "Pozitif", text: "gözlenebilir olgular arasındaki düzenli ilişkiler", tone: "c", detail: ["Gözlenebilir olgular arasındaki düzenli ilişkilerle açıklanır.", "Comte’un sıralamayı savunması her kişinin tek aşamadan oluştuğunu göstermez."] },
  ],
  foot: "Öğrenilecek ilk şey görüşün olumlu yapısı, ardından tarihsel kapsamının sınırıdır.",
});

export const philosophyFigures060History: Record<string, Record<string, FigureDef>> = {
  "ilk-cag-felsefesi": {
    "Arkhe: çokluğun ortak ilkesi": arkhe,
    "Parmenides: varlık ve düşünme": changeBeing,
    "Mağara benzetmesini adım adım oku": cave,
    "Dört neden ve bilme": fourCauses,
  },
  "orta-cag-felsefesi": {
    "Patristik ve skolastik ayrımı": periods,
    "Tümel nedir?": universalsTable,
    "Gerçekçilik ve ılımlı gerçekçilik": universalTrees,
  },
  "18-19-yuzyil-felsefesi": {
    "Akılcılık ve deneycilik": knowledge,
    "Duyarlık ve anlama yetisi": kant,
    "Montesquieu: üç işlev": powers,
    "Bentham: sonuç ve toplam yarar": ethicsCompare,
    "Comte: açıklama tarzlarının üç hâli": comte,
  },
};
