import { poly, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";
import { axis, BAR_R, barRow, LABEL_W } from "./geographyFigures061Kit";
import { mapFig, rect, tableFig, treeFig } from "./turkishFigures060Kit";
import { drawFig, lines, nt } from "./biologyFigures062Kit";

/*
 * Forge062 TYT Coğrafya · Türkiye suları, kayaçlar ve Türkiye’de dış
 * kuvvetler. Akarsu, göl, baraj ve yer adları ile sayılar yalnız bölüm
 * metninden alınır: özgün rejim örneği 40, 30, 20, 10 → 25’er birim;
 * yaklaşık yüzey tuzluluğu Akdeniz 38‰, Ege 35‰, Marmara 22‰, Karadeniz
 * 18‰. Kesitler ve döngü şeması şematiktir, ölçekli değildir; gerçek
 * koordinat ya da derinlik iddiası taşımaz.
 */

/* ---------------- Türkiye suları ---------------- */

// 1 · Sınır aşan akarsu ve havza türü.
const basins = tableFig({
  caption:
    "Sınır aşmak ile açık havza ayrı kararlardır: son alıcıya kadar izle. Bir akarsuya tıkla. Hazar’ın doğal yüzey çıkışı yoktur; Aras sınır aşsa da kapalı alıcıya yönelir.",
  alt: "Dört satırlı tablo. Fırat ve Dicle: Türkiye’den sınır ötesine, Basra Körfezi, açık. Çoruh: Gürcistan üzerinden Karadeniz, açık. Aras: Kura sistemiyle Hazar, kapalı. Kızılırmak: kaynak ve denize kavuştuğu kesim Türkiye içinde, Karadeniz.",
  cols: [
    { name: "Akarsu", w: 2.6 },
    { name: "Rota", w: 4.4 },
    { name: "Havza", w: 3.0 },
  ],
  rows: [
    { cells: ["Fırat, Dicle", "sınır ötesine, Basra Körfezi", "açık"], tones: [undefined, "muted", "b"], detail: ["Son alıcı dünya denizlerine bağlıdır."] },
    { cells: ["Çoruh", "Gürcistan üzerinden Karadeniz", "açık"], tones: [undefined, "muted", "b"], detail: ["Ülkeler arası rota aynı havza türünü zorunlu kılmaz."] },
    { cells: ["Aras", "Kura sistemiyle Hazar", "kapalı"], tones: [undefined, "muted", "warn"], detail: ["Hazar’ın doğal yüzey çıkışı yoktur; sınır aşan akarsu otomatik açık havza değildir."] },
    { cells: ["Kızılırmak", "kaynak ve ağız Türkiye içinde", "açık (Karadeniz)"], tones: [undefined, "muted", "b"], detail: ["Türkiye’den doğanlar mı, Türkiye’den geçenler mi soruluyor? Önce bunu ayır."] },
  ],
  foot: "Meriç ve Asi Türkiye dışından gelen akarsu örnekleridir.",
});

// 2 · Rejim: baraj dağılımı değiştirir, toplamı korur.
const RAW = [40, 30, 20, 10];
const SEASON = ["Birinci mevsim", "İkinci mevsim", "Üçüncü mevsim", "Dördüncü mevsim"];
const regX = (n: number) => LABEL_W + (n * (BAR_R - LABEL_W)) / 40;
const flows = (t: number) => RAW.map((q) => q + (t / 100) * (25 - q));
const regDraw = (t: number) => {
  const els: El[] = [];
  let y = 0;
  flows(t).forEach((q, i) => {
    y = barRow(els, y, SEASON[i], [{ len: q, tone: q >= 25 ? "b" : "c" }], regX, `${nt(q)} birim`);
  });
  y = axis(els, y + 0.2, [0, 10, 20, 30, 40], regX, "birim");
  y = lines(els, y, ["Özgün örnek; ölçekli çubuk. Gerçek bir nehrin normali değildir."]);
  return { els, h: -y };
};
const regH = regDraw(0).h;
const regime: FigureDef = drawFig({
  caption:
    "Bölümdeki özgün örnek: dört mevsimlik 40, 30, 20, 10 birim akış, depolama ile 25’er birime dönüşür. Sürgüyle düzenleme oranını değiştir; toplam korunur, en yüksek ile en düşük arasındaki aralık azalır. Rejim akımın yıl içindeki düzenidir.",
  alt: "Dört yatay çubuk, birim ekseninde: düzenleme yokken 40, 30, 20, 10; düzenleme yüzde 100 iken dördü de 25. Toplam her durumda 100.",
  h: regH,
  param: { label: "Düzenleme", min: 0, max: 100, step: 10, init: 50, unit: " %" },
  draw: (t) => {
    const { els } = regDraw(t);
    const q = flows(t);
    const total = q.reduce((a, b) => a + b, 0);
    return { els, readout: [`Toplam ${nt(total)} birim; aralık ${nt(Math.max(...q))} − ${nt(Math.min(...q))} = ${nt(Math.max(...q) - Math.min(...q))} birim.`, "Aynı yıllık toplam farklı aylara dağıtılabilir; her baraj aynı biçimde çalışmaz."] };
  },
});

// 4 · Gölü üç eksende oku.
const lakeAxes = tableFig({
  caption:
    "Köken, dışarı akış ve su kimyası ayrı eksenlerdir. Bir eksene tıkla. Yalnız köken adına bakarak kesin tuz oranı yazılmaz; Van’ın sodalı-tuzlu yapısı içme suyu genellemesine karşı örnektir.",
  alt: "Üç satırlı tablo. Köken: tektonik, karstik, volkanik, buzul ya da set gerisi; Van karma, tektonik ve volkanik set; baraj gölü insan yapımı set. Çıkış: gölden dışarı akış var mı yok mu; çıkışsız ve buharlaşması güçlü sistemde çözünmüş madde yoğunlaşabilir. Kimya: tatlı, tuzlu ya da sodalı; Van sodalı-tuzlu.",
  cols: [
    { name: "Eksen", w: 2.4 },
    { name: "Sorulan", w: 3.6 },
    { name: "Bölümdeki örnek", w: 4.0 },
  ],
  rows: [
    { cells: ["Köken", "çukur nasıl oluştu?", "Van: tektonik ve volkanik set; baraj gölü: yapay set"], tones: [undefined, "muted", "b"], detail: ["Birden fazla süreç aynı gölde birleşebilir; Van’ı tek bir basit kutuya sıkıştırma."] },
    { cells: ["Çıkış", "gölden dışarı akış var mı?", "çıkışsız, güçlü buharlaşma: madde yoğunlaşabilir"], tones: [undefined, "muted", "c"], detail: ["Dışarı akış köken adından ayrı bir sorudur."] },
    { cells: ["Kimya", "tatlı, tuzlu ya da sodalı mı?", "Van sodalı-tuzlu"], tones: [undefined, "muted", "a"], detail: ["Göllerin hepsi içme suyu olarak doğrudan kullanılamaz."] },
  ],
  foot: "Her soruda üç ekseni ayrı yaz.",
});

// 7 · Boğazda iki yönlü akış.
const strait = drawFig({
  caption:
    "İstanbul Boğazı şematik kesiti: üst tabaka genel olarak Karadeniz’den Marmara’ya, daha tuzlu alt tabaka ters yöne akar. İki akış aynı anda farklı derinliklerde bulunabilir; tek bir su oku yetmez. Şematik, ölçekli değil.",
  alt: "Boyuna kesit: solda Karadeniz, sağda Marmara. Yüzey çizgisi, kesik ara yüzey ve taban. Üst katmanda sağa, Marmara’ya doğru ok; alt katmanda sola, Karadeniz’e doğru ok.",
  h: 3.3,
  draw: () => {
    const els: El[] = [];
    els.push(txt(v(0.3, 0), "Karadeniz", "e", { small: true, bold: true, tone: "b" }));
    els.push(txt(v(9.7, 0), "Marmara", "w", { small: true, bold: true, tone: "c" }));
    els.push(seg(v(0.3, -0.6), v(9.7, -0.6), { tone: "b" }));
    els.push(seg(v(0.3, -1.75), v(9.7, -1.75), { tone: "muted", dash: true, thin: true }));
    els.push(seg(v(0.3, -2.9), v(9.7, -2.9), { tone: "ink", bold: true }));
    els.push(vec(v(2.0, -0.95), v(8.0, -0.95), { tone: "b" }));
    els.push(txt(v(5, -1.35), "daha az tuzlu üst akış", "c", { small: true, tone: "b" }));
    els.push(vec(v(8.0, -2.1), v(2.0, -2.1), { tone: "c" }));
    els.push(txt(v(5, -2.5), "daha tuzlu alt akış", "c", { small: true, tone: "c" }));
    return { els, readout: ["Üst tabaka Karadeniz → Marmara, alt tabaka Marmara → Karadeniz.", "Kaynaklardaki tuzluluk değerleri çoğu zaman yaklaşık yüzey koşullarını anlatır; bütün derinlik ve mevsimler aynı değildir."] };
  },
});

// 9 · Deniz havzaları.
const seas = tableFig({
  caption:
    "Bölümdeki tabloya göre nehir adlarını son alıcıya yerleştir. Bir havzaya tıkla. Kızılırmak’ın ülke içindeki rotası ile Fırat’ın uluslararası boyu farklı karşılaştırma sınırlarıdır.",
  alt: "Altı satırlı tablo. Marmara: Susurluk. Karadeniz: Sakarya, Kızılırmak, Yeşilırmak, Filyos, Bartın, Çoruh. Ege: Meriç, Bakırçay, Gediz, Küçük ve Büyük Menderes. Akdeniz: Dalaman, Eşen, Aksu, Manavgat, Göksu, Seyhan, Ceyhan, Asi. Basra: Fırat–Dicle. Hazar: Aras–Kura, kapalı.",
  cols: [
    { name: "Son alıcı", w: 2.6 },
    { name: "Bölümdeki örnekler", w: 7.4 },
  ],
  rows: [
    { cells: ["Marmara", "Susurluk"], tones: [undefined, "b"], detail: ["Yatak eğimi ve debi ayrıca değerlendirilir."] },
    { cells: ["Karadeniz", "Sakarya, Kızılırmak, Yeşilırmak, Filyos, Bartın, Çoruh"], tones: [undefined, "b"], detail: ["Bartın’ın uygun bazı kesimlerindeki sınırlı ulaşım, büyük gemi ulaşımı genellemesinin yerel istisnasıdır."] },
    { cells: ["Ege", "Meriç, Bakırçay, Gediz, Küçük ve Büyük Menderes"], tones: [undefined, "b"], detail: ["Ege’ye ulaşan ağ."] },
    { cells: ["Akdeniz", "Dalaman, Eşen, Aksu, Manavgat, Göksu, Seyhan, Ceyhan, Asi"], tones: [undefined, "b"], detail: ["Seyhan ve Ceyhan Çukurova birikim sistemine katılır."] },
    { cells: ["Basra", "Fırat–Dicle; Fırat’ın kolları Murat ve Karasu"], tones: [undefined, "c"], detail: ["Ülke sınırı dışında birleşen ağ."] },
    { cells: ["Hazar", "Aras–Kura"], tones: [undefined, "warn"], detail: ["Son alıcı kapalıdır."] },
  ],
  foot: "Önce son alıcıyı, sonra rotayı yaz.",
});

// 10 · Barajlar ve beslenme örnekleri.
const dams = tableFig({
  caption:
    "Bölümdeki baraj ve beslenme örnekleri. Bir akarsuya tıkla. Depolama enerji ve sulamayı desteklerken tortu ve aşağı kesim akışını da değiştirir; bir kaynak adı yılın tamamını tek nedene indirmez.",
  alt: "Dört satırlı tablo. Fırat: Atatürk, Karakaya, Keban barajları. Kızılırmak: Altınkaya. Manavgat: Oymapınar; karstik kaynak katkısı. Çoruh: Deriner.",
  cols: [
    { name: "Akarsu", w: 2.6 },
    { name: "Baraj örneği", w: 3.8 },
    { name: "Bölümdeki not", w: 3.6 },
  ],
  rows: [
    { cells: ["Fırat", "Atatürk, Karakaya, Keban", "geniş havza, birden fazla kaynak"], tones: [undefined, "b", "muted"], detail: ["Fırat ve Kızılırmak gibi geniş havzalarda birden fazla kaynak birlikte etkilidir."] },
    { cells: ["Kızılırmak", "Altınkaya", "geniş havza"], tones: [undefined, "b", "muted"], detail: ["Bir kaynak adı yılın tamamını tek nedene indirmez."] },
    { cells: ["Manavgat", "Oymapınar", "karstik kaynak katkısı"], tones: [undefined, "b", "muted"], detail: ["Manavgat ve Göksu karstik kaynak katkısı örnekleridir."] },
    { cells: ["Çoruh", "Deriner", "baraj örneği"], tones: [undefined, "b", "muted"], detail: ["Depolama tortu ve aşağı kesim akışını değiştirir."] },
  ],
  foot: "Bakırçay ve Gediz yağmur, Aras ve Kura kar-buz erimesi katkısına örnektir.",
});

// 11 · Yaklaşık yüzey tuzluluğu.
const salX = (n: number) => LABEL_W + (n * (BAR_R - LABEL_W)) / 40;
const salDraw = () => {
  const els: El[] = [];
  let y = 0;
  for (const [name, val] of [["Akdeniz", 38], ["Ege", 35], ["Marmara", 22], ["Karadeniz", 18]] as const)
    y = barRow(els, y, name, [{ len: val, tone: val > 30 ? "c" : "b" }], salX, `${val}‰`);
  y = axis(els, y + 0.2, [0, 10, 20, 30, 40], salX, "‰");
  y = lines(els, y, ["Yaklaşık yüzey değeri; bütün derinliklerin güncel sabit ölçümü değildir."]);
  return { els, h: -y };
};
const salH = salDraw().h;
const salinity: FigureDef = drawFig({
  caption:
    "Kaynağın yaklaşık yüzey tuzluluk sırası: Akdeniz 38‰, Ege 35‰, Marmara 22‰, Karadeniz 18‰. Çubuklar bu değerlerle ölçeklidir. Çanakkale’de de yüzey ve alt tabaka ters yönlü olabilir.",
  alt: "Binde ekseninde dört yatay çubuk: Akdeniz 38, Ege 35, Marmara 22, Karadeniz 18.",
  h: salH,
  draw: () => ({ els: salDraw().els, readout: ["Sıra: Akdeniz > Ege > Marmara > Karadeniz (yaklaşık yüzey).", "Cebelitarık Akdeniz’i Atlas’a; İstanbul ve Çanakkale boğazları Karadeniz–Marmara–Ege ağını bağlar."] }),
});

/* ---------------- Kayaçlar ---------------- */

// 1 · Magmatik kayaç: soğuma yeri ve doku.
const igneous = tableFig({
  caption:
    "Magmanın soğuduğu yer dokuyu değiştirir. Bir türe tıkla: bölümdeki örnek ve uyarı açılır. Yavaş soğuma ile iri kristal ilişkisi bileşim koşullarıyla birlikte okunur.",
  alt: "Beş satırlı tablo. Derinlik: yavaş soğuma, iri kristal; granit, siyenit, diyorit, gabro. Yüzey: daha hızlı, ince doku; bazalt, andezit. Obsidiyen: çok hızlı, camsı. Süngertaşı: gaz çıkışıyla gözenek. Tüf: püsküren parçaların birikip pekişmesi.",
  cols: [
    { name: "Tür", w: 2.6 },
    { name: "Soğuma ve doku", w: 3.6 },
    { name: "Örnek", w: 3.8 },
  ],
  rows: [
    { cells: ["Derinlik", "yavaş; iri kristal", "granit, siyenit, diyorit, gabro"], tones: [undefined, "b", "muted"], detail: ["Bütün derinlik kayaçlarının aynı mineralden oluştuğu sonucu çıkmaz."] },
    { cells: ["Yüzey", "daha hızlı; daha ince", "bazalt, andezit"], tones: [undefined, "c", "muted"], detail: ["Yüzeye çıkan lav daha hızlı soğur."] },
    { cells: ["Obsidiyen", "çok hızlı; camsı", "iri kristal zorunlu değil"], tones: [undefined, "a", "muted"], detail: ["Obsidiyen çok hızlı soğumayla camsı yapı kazanır."] },
    { cells: ["Süngertaşı", "gaz çıkışı; gözenekli", "yüzey kayacı"], tones: [undefined, "c", "muted"], detail: ["Gözenekler gaz çıkışıyla ilişkilidir."] },
    { cells: ["Tüf", "püsküren parçalar birikip pekişir", "volkanik"], tones: [undefined, "warn", "muted"], detail: ["Tüf sıradan akarsu tortusu sanılmaz."] },
  ],
  foot: "Kayacın adı yalnız rengiyle konmaz.",
});

// 3 · Kimyasal ve organik tortul.
const sedimentary = treeFig({
  caption:
    "Kimyasal tortullar çözünmüş maddelerin çökelmesiyle, organik tortullar canlı kalıntılarıyla ilişkilidir. Bir dala ya da örneğe tıkla. Hepsinin bileşimi kalsiyum karbonat değildir. Sınıflama ağacı, ölçekli değil.",
  alt: "Ağaç: kök tortul kayaç. Kimyasal dalında jips, kaya tuzu, traverten. Organik dalında mercan iskeletleri, tebeşir, kömür.",
  root: "Tortul kayaç",
  branches: [
    {
      label: "Kimyasal",
      title: "Kimyasal tortullar",
      detail: ["Buharlaşma doygunluğu artırabilir; çökelme mekanizması mineral ve koşula bağlıdır."],
      tone: "b",
      leaves: [
        { label: "jips", title: "Jips (kimyasal)", detail: ["Jips kimyasal tortul örneğidir."] },
        { label: "kaya tuzu", title: "Kaya tuzu (kimyasal)", detail: ["Kaya tuzu kimyasal tortul örneğidir."] },
        { label: "traverten", title: "Traverten (kimyasal)", detail: ["Traverten kimyasal tortul örneğidir."] },
      ],
    },
    {
      label: "Organik",
      title: "Organik, biyojenik köken",
      detail: ["Kireç taşının kimyasal ya da biyojenik katkılı türleri vardır; okul gruplaması ile gerçek örneğin karma oluşumunu ayır."],
      tone: "a",
      leaves: [
        { label: "mercan iskeleti", title: "Mercan iskeletleri (organik)", detail: ["Mercan iskeletleri organik köken ilişkisini gösterir."] },
        { label: "tebeşir", title: "Tebeşir (organik)", detail: ["Tebeşir organik köken ilişkisini gösterir."] },
        { label: "kömür", title: "Kömür (organik)", detail: ["Bitkisel kalıntılardan gelişen kömürler organik köken örneğidir."] },
      ],
    },
  ],
  foot: "Adını görüp her örneğe tek ayrıntılı geçmiş atama.",
});

// 4 · Başkalaşım.
const metamorphic = tableFig({
  caption:
    "Başkalaşma katı hâlde değişimdir; tümüyle erime magma aşamasıdır. Bir başlangıç kayacına tıkla. Mermer, bütün başkalaşım kayaçlarının aynı yapraklanmayı göstermediğinin iyi bir karşı örneğidir.",
  alt: "Beş satırlı tablo. Kireç taşı → mermer. Granit → gnays. Kum taşı → kuvarsit. Kilce zengin uygun kayaç → şist, yönlü doku görülebilir. Tümüyle erime → magma, sonradan soğuyan ürün magmatik.",
  cols: [
    { name: "Başlangıç", w: 3.4 },
    { name: "Ürün", w: 2.6 },
    { name: "Not", w: 4.0 },
  ],
  rows: [
    { cells: ["Kireç taşı", "mermer", "eritilip dondurulma değil"], tones: [undefined, "a", "muted"], detail: ["Mermer oluşumunu kalkerin eritilip tekrar dondurulması diye anlatma."] },
    { cells: ["Granit", "gnays", "yeni doku oluşabilir"], tones: [undefined, "a", "muted"], detail: ["Başlangıç kayacı ve koşul sonucu belirler."] },
    { cells: ["Kum taşı", "kuvarsit", "katı hâlde değişim"], tones: [undefined, "a", "muted"], detail: ["Yüksek sıcaklık, basınç ve akışkanlar etkilidir."] },
    { cells: ["Kilce zengin", "şist", "yönlü doku görülebilir"], tones: [undefined, "a", "muted"], detail: ["Şistte yönlü doku görülebilir; her başkalaşım kayacında aynı yapraklanma yoktur."] },
    { cells: ["Tümüyle erirse", "magma", "soğuyan ürün magmatik"], tones: [undefined, "warn", "muted"], detail: ["Kayaç tümüyle erirse magma aşamasına geçer."] },
  ],
  foot: "Başkalaşma ile erime ayrı oklardır.",
});

// 5 · Kayaç döngüsü.
const cycle = mapFig({
  caption:
    "Kayaç döngüsü tek bir sıra değildir: her bağlantı fiziksel bir süreçtir. Bir durağa tıkla: oraya giren ve çıkan süreçler açılır. Süreler, derinlikler ve hızlar çizilmez; şematik, ölçekli değil.",
  alt: "Beş durak: magma, magmatik kayaç, tortu, tortul kayaç, başkalaşım kayacı. Bağlantılar: magma soğuyarak magmatik kayaç; kayaçlar ayrışıp tortu; tortu taşlaşıp tortul kayaç; kayaçlar başkalaşıp başkalaşım kayacı; başkalaşım kayacı eriyip magma.",
  h: 6.9,
  nodes: [
    { x: 5, y: -0.3, label: "Magma", tone: "warn", title: "Magma", detail: ["Magma soğuyarak yeni magmatik kayaç oluşturur; herhangi bir kayaç uygun koşulda eriyerek magmaya dönebilir."] },
    { x: 8.2, y: -1.7, label: "Magmatik", tone: "a", title: "Magmatik kayaç", detail: ["Soğuma ile oluşur; ayrışıp tortuya dönüşebilir ya da başkalaşabilir."] },
    { x: 7.0, y: -3.6, label: "Tortu", tone: "c", title: "Tortu", detail: ["Gevşek malzemedir; taşlaşınca tortul kayaç olur."] },
    { x: 3.0, y: -3.6, label: "Tortul", tone: "c", title: "Tortul kayaç", detail: ["Taşlaşma ile oluşur; başkalaşabilir ya da ayrışıp yeniden tortuya dönüşebilir."] },
    { x: 1.8, y: -1.7, label: "Başkalaşım", tone: "b", title: "Başkalaşım kayacı", detail: ["Katı hâlde başkalaşma ile oluşur; tümüyle erirse magma aşamasına geçer."] },
  ],
  edges: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 0],
    [1, 4],
  ],
  notes: ["Magma → magmatik: soğuma.", "Kayaç → tortu: ayrışma.", "Tortu → tortul: taşlaşma.", "Kayaç → başkalaşım: başkalaşma.", "Başkalaşım → magma: erime."],
  foot: "Bütün kayaçlar bütün durakları aynı sırayla geçmez.",
});

// 6 · Direnç ve şekil.
const resistance = tableFig({
  caption:
    "Farklı dirençte malzeme aynı dış koşulda farklı hızla aşınır, ama direnç tek başına bütün şekli belirlemez. Bir şekle tıkla: malzeme ve etken ayrımı açılır.",
  alt: "Dört satırlı tablo. Peribacası: tüf üzerinde dayanıklı başlık. Karst: kireç taşı ve jips çözünür. Tor: granit blokların ayrışıp açığa çıkması. Bazalt sütunları: lavın soğuyup büzülmesiyle çokgen çatlaklar.",
  cols: [
    { name: "Şekil", w: 2.8 },
    { name: "Malzeme", w: 3.0 },
    { name: "Etken", w: 4.2 },
  ],
  rows: [
    { cells: ["Peribacası", "tüf + dayanıklı başlık", "başlık sütunu korur"], tones: [undefined, "c", "muted"], detail: ["Tüf üzerindeki daha dayanıklı başlık, sütunun korunmasına yardım eder."] },
    { cells: ["Karst", "kireç taşı, jips", "çözünme"], tones: [undefined, "c", "muted"], detail: ["Uygun kayaçlar çözünür; su, iklim ve çatlaklar da önemlidir."] },
    { cells: ["Tor", "granit bloklar", "ayrışıp açığa çıkma"], tones: [undefined, "c", "muted"], detail: ["Granit blokların ayrışıp açığa çıkması tor topoğrafyasıyla ilişkilidir."] },
    { cells: ["Bazalt sütunu", "bazalt", "lavın soğuyup büzülmesi"], tones: [undefined, "c", "muted"], detail: ["Her sütunu akarsu oyması saymak malzeme ile etkeni karıştırır."] },
  ],
  foot: "Çatlak, su, iklim, eğim ve süreç geçmişi de şekli etkiler.",
});

/* ---------------- Dış kuvvetler ---------------- */

// 1 · Vadi ve şelale.
const valleys = tableFig({
  caption:
    "Bölümdeki aşındırma şekilleri ve örnekleri. Bir şekle tıkla: kanıtı açılır. Bir boğazı görmek bütün geçmişini ya da kazılma hızını hesaplamaz.",
  alt: "Dört satırlı tablo. Kertik ve boğaz vadi: dağlık kuşaklar; Çoruh ve Toroslar çevresi. Kanyon: uygun tabakalı karstik alanlar. Şelale: eğim kırığı; Tortum, Düden, Manavgat, Kapuzbaşı, Muradiye. Dev kazanı: düşen suyun aşındırdığı çukur.",
  cols: [
    { name: "Şekil", w: 3.0 },
    { name: "Kanıt", w: 3.2 },
    { name: "Bölümdeki örnek", w: 3.8 },
  ],
  rows: [
    { cells: ["Kertik, boğaz vadi", "akarsuyun araziye işleyişi", "Çoruh, Toroslar çevresi"], tones: [undefined, "muted", "b"], detail: ["Aynı akarsu başka bir yerde malzeme biriktirebilir; tüm yatağı aşındırma kutusuna koyma."] },
    { cells: ["Kanyon", "tabakalı karstik alan", "uygun karstik alanlar"], tones: [undefined, "muted", "b"], detail: ["Kanyonlar uygun tabakalı karstik alanlarda görülebilir."] },
    { cells: ["Şelale", "eğim kırığı", "Tortum, Düden, Manavgat, Kapuzbaşı, Muradiye"], tones: [undefined, "muted", "b"], detail: ["Eğim kırığı ve suyun düştüğü yer önemlidir."] },
    { cells: ["Dev kazanı", "düşen suyun aşındırdığı çukur", "şelale ayağı"], tones: [undefined, "muted", "b"], detail: ["Dev kazanı düşen suyun aşındırdığı çukurdur."] },
  ],
  foot: "Nehir adını tek bir süreç kutusuna kilitleme.",
});

// 2 · Peribacası: malzeme volkanik, biçim dış süreç.
const FAIRY = ["Katmanlar", "Seçici aşınma", "Peribacası"];
const fairy = drawFig({
  caption:
    "Kapadokya’da ilk malzeme volkanik tüftür, son biçim dış süreçlerle gelişir: yüzey akışı tüfü aşındırırken üstteki dayanıklı blok altını görece korur. Adımlarla izle. Şematik kesit, ölçekli değil.",
  alt: "Birinci adımda geniş tüf katmanı ve üstünde ince dayanıklı katman. İkinci adımda üst katman bloklara ayrılmış, blokların altında sütunlar kalmış, aralar aşınmış. Üçüncü adımda tek sütun ve üstünde dayanıklı başlık: peribacası.",
  h: 3.6,
  steps: FAIRY,
  draw: (_v, step) => {
    const els: El[] = [];
    const ground = -3.2;
    els.push(seg(v(0.3, ground), v(6.6, ground), { tone: "ink", bold: true }));
    if (step === 0) {
      els.push(rect(0.5, -1.25, 6.4, ground, "c"), rect(0.5, -0.8, 6.4, -1.25, "b"));
    } else {
      const cols = step === 1 ? [1.6, 4.8] : [3.4];
      for (const cx of cols) {
        els.push(poly([v(cx - 0.4, -1.3), v(cx + 0.4, -1.3), v(cx + 0.9, ground), v(cx - 0.9, ground)], { tone: "c", fill: "c" }));
        els.push(rect(cx - 0.6, -0.85, cx + 0.6, -1.3, "b"));
      }
    }
    els.push(txt(v(6.9, -1.05), step === 0 ? "dayanıklı katman" : "dayanıklı blok", "e", { small: true, bold: true, tone: "b" }));
    els.push(txt(v(6.9, -2.3), "tüf", "e", { small: true, bold: true, tone: "c" }));
    const read = [
      "Volkanik malzeme: tüf ve üstünde daha dayanıklı katman.",
      "Yüzey akışı ve farklı direnç: korunmayan tüf aşınır, blok altındaki tüf görece korunur.",
      "Peribacası: tüf sütun ve dayanıklı başlık. Malzeme volkanik, biçim dış süreç.",
    ];
    return { els, readout: [read[step], "Şekli yalnız rüzgârın oyduğu biçiminde genelleme; akış biçimi ve yüzey direnci de önemlidir."] };
  },
});

// 3 · Deltalar ve birikim.
const deltas = tableFig({
  caption:
    "Birikim alanı dağ eteğinden kıyıya değişir. Bir akarsuya tıkla. Akarsuyun getirdiği her tanenin delta içinde kaldığı varsayılmaz; delta için kıyı koşulları da gerekir.",
  alt: "Beş satırlı tablo. Kızılırmak: Bafra deltası. Yeşilırmak: Çarşamba. Göksu: Silifke. Seyhan–Ceyhan: Çukurova. Gediz ve Menderes ağızları: Batı Anadolu’da birikim.",
  cols: [
    { name: "Akarsu", w: 3.6 },
    { name: "Birikim alanı", w: 6.4 },
  ],
  rows: [
    { cells: ["Kızılırmak", "Bafra deltası"], tones: [undefined, "c"], detail: ["Bafra’da tortu birikimi bir birikim kanıtıdır."] },
    { cells: ["Yeşilırmak", "Çarşamba deltası"], tones: [undefined, "c"], detail: ["Delta için kıyı koşullarını unutma."] },
    { cells: ["Göksu", "Silifke deltası"], tones: [undefined, "c"], detail: ["Delta için kıyı koşullarını unutma."] },
    { cells: ["Seyhan–Ceyhan", "Çukurova deltası"], tones: [undefined, "c"], detail: ["İki akarsu aynı birikim sistemine katılır."] },
    { cells: ["Gediz, Menderes", "Batı Anadolu’da akarsu ağızlarında birikim"], tones: [undefined, "c"], detail: ["Dağ eteklerinde de yelpaze ve koniler gelişebilir."] },
  ],
  foot: "Dağ içi çukurlarda tektonik temel ile alüvyal yüzey birlikte bulunabilir.",
});

// 4 · Karstta çözünme ve çökelme.
const karst = treeFig({
  caption:
    "Karstta madde uzaklaşıyor mu, ekleniyor mu? Çözünme aşınım, çökelme birikim şeklidir. Bir dala ya da şekle tıkla. Suyun bulunduğu her örneği aşınım sayma. Sınıflama ağacı, ölçekli değil.",
  alt: "Ağaç: kök karst şekilleri. Çözünme dalında lapya, dolin, polye, mağara boşluğu, düden, obruk. Çökelme dalında traverten, sarkıt, dikit, sütun.",
  root: "Karst şekilleri",
  branches: [
    {
      label: "Çözünme",
      title: "Çözünme ile aşınım",
      detail: ["Teke, Taşeli ve Torosların karbonatlı arazileri; Konya çevresinde obruk; Çankırı–Sivas jipsli arazileri."],
      tone: "b",
      leaves: [
        { label: "lapya", title: "Lapya", detail: ["Çözünme şeklidir."] },
        { label: "dolin", title: "Dolin", detail: ["Çözünme şeklidir."] },
        { label: "polye", title: "Polye", detail: ["Çözünme şeklidir."] },
        { label: "mağara", title: "Mağara boşluğu", detail: ["Mağara boşluğu çözünmeyle açılabilir."] },
        { label: "düden", title: "Düden", detail: ["Çözünme şeklidir."] },
        { label: "obruk", title: "Obruk", detail: ["Konya çevresinde obruk örnekleri bulunur."] },
      ],
    },
    {
      label: "Çökelme",
      title: "Çökelme ile birikim",
      detail: ["Yerel olarak madde ekleniyorsa birikimdir."],
      tone: "a",
      leaves: [
        { label: "traverten", title: "Traverten", detail: ["Pamukkale’de traverten karbonat çökelmesiyle büyür."] },
        { label: "sarkıt", title: "Sarkıt", detail: ["Mağaradaki birikim şeklidir."] },
        { label: "dikit", title: "Dikit", detail: ["Mağaradaki birikim şeklidir."] },
        { label: "sütun", title: "Sütun", detail: ["Mağaradaki birikim şeklidir."] },
      ],
    },
  ],
  foot: "Pamukkale’de renk benzerliği olabilir ama süreç birikimdir.",
});

// 5 · Rüzgâr ve buzul.
const carriers = tableFig({
  caption:
    "Rüzgâr ve buzul şekillerinin yeri sınırlıdır; taşıyıcıyı yer adından önce yaz. Bir taşıyıcıya tıkla. Eski buzul şekli bugün aynı yerde canlı buzul bulunduğunu zorunlu kılmaz.",
  alt: "İki satırlı tablo. Rüzgâr: gevşek kumlu, kuru, seyrek bitkili yüzey; Karapınar, Iğdır. Buzul: sirk, U vadi, moren birlikte; Kaçkar, Ağrı, Süphan, Aladağlar, Buzul, Sat.",
  cols: [
    { name: "Taşıyıcı", w: 2.4 },
    { name: "Şekil ya da koşul", w: 3.8 },
    { name: "Bölümdeki örnek", w: 3.8 },
  ],
  rows: [
    { cells: ["Rüzgâr", "gevşek kum, kuru yüzey, seyrek bitki", "Karapınar, Iğdır"], tones: [undefined, "muted", "b"], detail: ["Aynı kurak bölgede sağanakla sel aşındırması da olabilir; bütün yüzeyi yalnız rüzgârın ürünü sayma."] },
    { cells: ["Buzul", "sirk, U vadi ve moren birlikte", "Kaçkar, Ağrı, Süphan, Aladağlar, Buzul, Sat"], tones: [undefined, "muted", "b"], detail: ["Eski şekil buzun bugün aynı yerde bulunduğunu ya da denize ulaştığını zorunlu kılmaz; kaynak yılı ve gözlem bağlamı önemlidir."] },
  ],
  foot: "Yüksek alanlarda buzul ya da eski buzullaşma izleri bulunabilir.",
});

// 6 · Kıyı ve yamaç.
const coast = tableFig({
  caption:
    "Kıyıda dalga ve birikim, yamaçta yer çekimi taşır. Bir şekle tıkla. Her yağışlı yamaç kaymaz ve her toprak taşınması akarsu erozyonu değildir.",
  alt: "Dört satırlı tablo. Falez: Karadeniz ve Akdeniz’in uygun dik kesimleri. Plaj, kordon, lagün: sığ birikim alanları. Tombolo: Kapıdağ ve Sinop. Heyelan: kaya ve toprağın yer çekimiyle kütle hâlinde yamaç aşağı hareketi.",
  cols: [
    { name: "Şekil", w: 3.2 },
    { name: "Taşıyıcı", w: 2.6 },
    { name: "Bölümdeki örnek", w: 4.2 },
  ],
  rows: [
    { cells: ["Falez", "dalga", "Karadeniz, Akdeniz dik kesimleri"], tones: [undefined, "b", "muted"], detail: ["Falezler uygun dik kıyı kesimlerinde görülür."] },
    { cells: ["Plaj, kordon, lagün", "kıyı birikimi", "sığ birikim alanları"], tones: [undefined, "b", "muted"], detail: ["Büyükçekmece ve Küçükçekmece kıyı seti gerisindeki su alanlarına örnektir."] },
    { cells: ["Tombolo", "kıyı birikimi", "Kapıdağ, Sinop"], tones: [undefined, "b", "muted"], detail: ["Yerel kıyı tarihi tek bir çizgiyle tamamlanmaz."] },
    { cells: ["Heyelan", "yer çekimi", "Karadeniz’in uygun yamaçları"], tones: [undefined, "warn", "muted"], detail: ["Doygunlaşma, eğim, tabaka yapısı ve insan müdahalesi etkili olabilir."] },
  ],
  foot: "Kıyı ile yamaç farklı taşıyıcılardır.",
});

export const geographyFigures062Water: Record<string, Record<string, FigureDef>> = {
  "turkiye-sulari": {
    "Sınır aşmak ile açık havza aynı karar değildir": basins,
    "Rejimi toplam su miktarından ayır": regime,
    "Gölleri üç ayrı eksende oku": lakeAxes,
    "Denizler ve boğazda iki yönlü akış": strait,
    "Nehir adlarını deniz havzalarına yerleştir": seas,
    "Beslenme örnekleri ve barajların konumu": dams,
    "Göl ve deniz örneklerini koşuluyla eşleştir": salinity,
  },
  "cografya-kayaclar": {
    "Magmanın soğuduğu yer dokuyu değiştirir": igneous,
    "Çökelme ile organik birikimi ayır": sedimentary,
    "Başkalaşma erime değildir": metamorphic,
    "Döngü tek bir sıra değildir": cycle,
    "Kayaç direnci araziyi etkiler": resistance,
  },
  "turkiye-dis-kuvvetler": {
    "Vadi ve şelalenin kanıtı": valleys,
    "Kapadokya’da kayaç ile şekli ayır": fairy,
    "Birikim alanı dağdan kıyıya değişir": deltas,
    "Karstta çözünen yer ile çöken mineral": karst,
    "Rüzgârın ve buzulların yeri sınırlıdır": carriers,
    "Kıyı ile yamaç farklı taşıyıcılar": coast,
  },
};
