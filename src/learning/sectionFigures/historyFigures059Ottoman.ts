import { poly, pt, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { boardFig, elbow, node, stepsFig, timelineFig, type Ev } from "./historyFigures059Kit";
import { table } from "./biologyFigures059TytKit";

/*
 * TYT Tarih · Osmanlı merkez teşkilatı, kuruluş siyaseti, askerî teşkilat ve
 * dünya gücü dönemi (Forge059). Bütün yıllar, adlar ve görev tanımları
 * ilgili bölüm metinlerinden alınmıştır; yorum eklenmez. Harita figürü
 * şematiktir, konumlar ölçekli değildir.
 */

/* ---------------- Merkez teşkilatı ---------------- */

const GROUPS: { name: string; tone: Tone; who: string; what: string }[] = [
  { name: "Seyfiye", tone: "warn", who: "sadrazam, kubbealtı vezirleri, kaptan-ı derya", what: "Yönetim ve askerî yürütme alanı; yalnız fiilen kılıç kullananları anlatmaz." },
  { name: "İlmiye", tone: "c", who: "kazasker, kadı, müderris; fetvada şeyhülislam", what: "Hukuk, eğitim ve dinî bilgi alanındaki kadrolar: atama, hüküm, ders ve fetva ayrı işlerdir." },
  { name: "Kalemiye", tone: "b", who: "defterdar, nişancı, reisülküttap", what: "Maliye, kayıt ve yazışma görevleri; unvanların kapsamı yüzyıllar boyunca sabit değildir." },
];
const orgChart: FigureDef = {
  caption:
    "Merkez teşkilatı bir iş akışıdır: padişah en üst siyasi otorite; Divan-ı Hümayun siyasi, idari, askerî, mali ve önemli adli meselelerin görüşüldüğü kurul (Fatih döneminden itibaren başkanı sadrazam). Görevler seyfiye, ilmiye ve kalemiye alanlarında uzmanlaşır. Bir kutuya tıkla.",
  alt: "Şema: en üstte padişah, altında Divan-ı Hümayun, ondan dirsekli çizgilerle ayrılan üç kutu: seyfiye, ilmiye, kalemiye. Kutular seçilebilir.",
  picks: [
    { label: "Padişah", title: "Padişah", detail: ["Hanedana dayanan en üst siyasi otorite; görevlileri tayin eder, devlet işlerini gözetir, kararları onaylar.", "Her defteri kendisinin tutması veya her davayı bizzat görmesi beklenmezdi."] },
    { label: "Divan-ı Hümayun", title: "Divan-ı Hümayun", detail: ["Siyasi, idari, askerî, mali ve önemli adli meselelerin görüşüldüğü merkezî kurul; temelleri Orhan Bey dönemine götürülür.", "Fatih döneminde başkanlık sadrazama geçti; kararların uygulanması padişahın onayıyla ilişkilidir."] },
    ...GROUPS.map((g) => ({ label: g.name, title: g.name, detail: [`Görevliler: ${g.who}.`, g.what] })),
  ],
  draw: (_v, _s, pick = -1) => {
    const P: V = v(6, 4.4);
    const D: V = v(6, 2.9);
    const els: El[] = [...node(P, 3.4, 0.8, "Padişah", "a", { pick: 0, on: pick === 0, small: false }), vec(v(6, 3.98), v(6, 3.32), { thin: true }), ...node(D, 4.6, 0.8, "Divan-ı Hümayun", "muted", { pick: 1, on: pick === 1, small: false })];
    GROUPS.forEach((g, i) => {
      const c: V = v(1.9 + i * 4.1, 0.9);
      els.push(...elbow(v(6, 2.48), v(c[0], 1.32)), ...node(c, 3.4, 0.8, g.name, g.tone, { pick: i + 2, on: pick === i + 2, small: false }));
    });
    els.push(txt(v(0, 5.1), " ", "c"), txt(v(12, 0.2), " ", "c"));
    const sel = [{ t: "Padişah" }, { t: "Divan-ı Hümayun" }, ...GROUPS.map((g) => ({ t: g.name }))][pick];
    return { els, readout: [sel ? `${sel.t} seçildi; ayrıntı aşağıdaki kartta.` : "Bir kutuya tıkla ya da aşağıdan seç.", "Kurum (Divan), görevli (sadrazam) ve eğitim kurumu (Enderun) ayrı şeylerdir."] };
  },
};

const DUTIES: [string, string, string][] = [
  ["tuğra çekmek, arazi kaydı", "nişancı", "kalemiye"],
  ["gelir, gider, hazine", "defterdar", "kalemiye"],
  ["Divan kâtiplerinin başı", "reisülküttap", "kalemiye"],
  ["kadı, müderris ataması", "kazasker", "ilmiye"],
  ["fetva vermek", "şeyhülislam", "ilmiye"],
  ["mühür, vekâlet, sefer", "sadrazam", "seyfiye"],
  ["donanma komutası", "kaptan-ı derya", "seyfiye"],
];
const GTONE: Record<string, Tone> = { seyfiye: "warn", ilmiye: "c", kalemiye: "b" };
const duties: FigureDef = {
  caption:
    "Cevabı nesnenin adı değil yapılan iş belirler: 'defter' sözcüğü hazine gelir-gideri ise defterdara, arazi tasarruf ve tahrir kaydı ise nişancıya götürür. Tuğra–nişancı, gelir/gider–defterdar, kadı/müderris ataması–kazasker, fetva–şeyhülislam.",
  alt: "Üç sütunlu tablo: yapılan iş, görevli, görev alanı. Yedi satır: tuğra ve arazi kaydı nişancı; gelir gider defterdar; Divan kâtipleri reisülküttap; kadı ve müderris ataması kazasker; fetva şeyhülislam; mühür ve vekâlet sadrazam; donanma kaptan-ı derya.",
  draw: () => {
    const els: El[] = [...table(["yapılan iş", "görevli", "alan"], DUTIES.map((r) => [...r]), [5.4, 3.5, 2.7], { top: 7.2, rowH: 0.9, tone: (r, c) => (c === 2 ? GTONE[DUTIES[r][2]] : undefined) }), txt(v(-0.1, 7.4), " ", "c"), txt(v(11.7, -0.1), " ", "c")];
    return { els, readout: ["Örnek: 'arazinin tasarruf ve tahrir kayıtları' nişancıya, 'hazine gelir ve giderleri' defterdara götürür.", "Görevli, ana fiil ve kurum türü birlikte uyuşmalı."] };
  },
};

const topkapi = boardFig(
  [
    { name: "Birun", tag: "dış hizmet · resmî işler", what: "Dış hizmetler ve resmî işler; hekimbaşı, darphane emini, saray mutfağı ve kapı hizmetleri gibi çok çeşitli görevler.", tone: "b" },
    { name: "Enderun", tag: "iç hizmet · yönetici yetiştirme", what: "Kademeli eğitim ve hizmetle padişaha bağlı yönetici kadro yetiştirirdi; bütün sarayın adı değildir.", tone: "c" },
    { name: "Harem", tag: "hanedan yaşamı · saray eğitimi", what: "Hanedan ailesinin yaşamı; eğitim ve kültür aktarımı boyutu da vardı, yalnız özel yaşam değildir.", tone: "a" },
  ],
  3,
  "Topkapı Sarayı'nda üç işlev alanı: Birun dış hizmet ve resmî işler, Enderun iç hizmet ve yönetici yetiştirme, Harem hanedan yaşamı ve saray eğitimi. Birbirinden kopuk üç dünya değildir; mekânı adından değil verilen eylemden seç. Bir kutuya tıkla.",
  "Yan yana üç kutu: Birun (dış hizmet, resmî işler), Enderun (iç hizmet, yönetici yetiştirme), Harem (hanedan yaşamı, saray eğitimi). Kutular seçilebilir.",
  "İdari kadro eğitimi mi, dış hizmet mi, hanedan yaşamı mı? Soru eylemle çözülür.",
  4.4,
);

const succession = stepsFig({
  items: [
    { s: "Erken dönem: geniş hanedan üyeliği", what: "Taht üzerinde birden çok hak iddiasına zemin oluşturabiliyordu." },
    { s: "I. Murat: padişah ve oğulları", what: "Merkezî iktidarı koruma ve taht mücadelelerini sınırlama arayışı içinde değerlendirilir." },
    { s: "Fatih: kardeş katline ilişkin hüküm", what: "Aynı arayışın farklı bir dönem uygulaması; kuruluştan beri işleyen tek kural değildir." },
    { s: "XVII. yüzyıl: ekber ve erşed", what: "Hanedanın yaşça büyük ve uygun görülen üyesinin önceliği güçlendi; şehzadeler sarayda tutulmaya başlandı." },
  ],
  caption:
    "Veraset: aynı hanedan, değişen uygulamalar. Erken dönemdeki geniş üyelik anlayışından I. Murat ve Fatih dönemi düzenlemelerine, XVII. yüzyılda ekber ve erşed anlayışına. Bunları tek ve değişmez bir kural gibi görmek anakronizmdir.",
  alt: "Yukarıdan aşağıya dört kutu: erken dönem geniş hanedan üyeliği, I. Murat dönemi, Fatih'in hükmü, XVII. yüzyılda ekber ve erşed. Adımlarla kutular sırayla etkinleşir.",
  foot: "Taht kavgasını azaltma amacı, her seçimin en yetenekli kişiyi belirlediği garantisi değildir.",
  w: 7.6,
});

/* ---------------- Kuruluş siyaseti ---------------- */

const FOUND: Ev[] = [
  { y: 1302, s: "Koyunhisar", what: "Osman Bey'in Bizans kuvvetlerine karşı başarısıyla siyasi ağırlığı arttı; toplu bir fetih değildir." },
  { y: 1326, s: "Bursa", what: "Orhan Bey döneminde alındı; şehir, pazar ve üretim ağıyla yönetim için yeni imkânlar." },
  { y: 1329, s: "Palekanon", what: "Bizans'ın yardım girişimi zayıfladı; İznik çevresindeki ilerleyiş kolaylaştı." },
  { y: 1331, s: "İznik", what: "Orhan Bey döneminde alındı; şehir ağının genişleme aşamalarından biri." },
  { y: 1337, s: "İzmit", what: "Orhan Bey döneminde alındı." },
  { y: 1345, s: "Karesi", what: "Beyliğin katılması toprak yanında denizcilik birikimi ve tecrübeli komutanlar sağladı." },
  { y: 1353, s: "Çimpe", what: "Boğazın batısında üs; sonraki ilerleyiş için hareket alanı." },
  { y: 1389, s: "I. Kosova", what: "I. Murad döneminde Haçlı ittifakına karşı başarı; I. Murad savaş sonrasında hayatını kaybetti." },
  { y: 1396, s: "Niğbolu", what: "Yıldırım Bayezid döneminde Haçlı kuvvetleri yenildi; Balkanlardaki güç arttı." },
  { y: 1402, s: "Ankara", what: "Timur karşısında Osmanlı yenilgisi; bazı beylikler yeniden ortaya çıktı, Fetret Devri başladı." },
  { y: 1413, s: "Toparlanma", what: "I. Mehmet'in üstünlük kurmasıyla Fetret sona erdi; bütün sorunlar aynı anda çözülmedi." },
  { y: 1444, s: "Varna", what: "II. Murad bağlamında öğrenilir; II. Mehmet'in ilk saltanatıyla karıştırılmamalıdır." },
  { y: 1448, s: "II. Kosova", what: "II. Murad dönemi; Balkanlardaki Osmanlı hâkimiyetini güçlendirdi." },
  { y: 1453, s: "İstanbul", what: "II. Mehmet döneminde fetih; II. Murad dönemi başarılarının ardından gelen siyasal zemin." },
];
const foundTimeline = timelineFig({
  events: FOUND,
  a0: 1300,
  a1: 1460,
  ticks: [1300, 1350, 1400, 1450],
  caption:
    "Kuruluş döneminin bölümde geçen dönüm noktaları tek yıl ekseninde. Bir olaya tıkla: bölümdeki bağı açılır. Sıra nedensellik değildir: Bursa 1326, Koyunhisar 1302'den sonradır ama bütün Bursa süreci o savaştan doğmaz.",
  alt: "Yatay eksende 1300–1460; her satırda bir olay: 1302 Koyunhisar'dan 1453 İstanbul'a on dört olay, yılında nokta. Olay adları seçilebilir.",
  foot: "Başlatan kişi, sonuçlandıran kişi ve olayın tarihi aynı sorunun üç ayrı parçasıdır.",
});

const PLACES: [string, V, string][] = [
  ["Söğüt", v(7.6, 1.0), "s"],
  ["Domaniç", v(6.2, 0.4), "s"],
  ["Bursa", v(5.0, 2.4), "s"],
  ["İznik", v(7.4, 2.9), "e"],
  ["İzmit", v(8.6, 4.2), "e"],
  ["Karesi", v(2.2, 1.8), "s"],
  ["Çimpe", v(1.6, 4.4), "w"],
  ["Edirne", v(0.8, 6.2), "n"],
];
const P = (name: string) => PLACES.find((p) => p[0] === name)![1];
const MOVES: [string, string, string, number, "nw" | "s" | "e" | "se"][] = [
  ["Söğüt", "Bursa", "1326", 1, "nw"],
  ["Bursa", "İznik", "1331", 1, "nw"],
  ["İznik", "İzmit", "1337", 1, "nw"],
  ["Bursa", "Karesi", "1345", 2, "s"],
  ["Karesi", "Çimpe", "1353", 2, "e"],
  ["Çimpe", "Edirne", "", 3, "e"],
];
const foundMap: FigureDef = {
  caption:
    "Şematik hareket şeması (ölçekli değil, gerçek konum iddiası yok): uç çevresinden (Söğüt, Domaniç) şehirlere (Bursa 1326, İznik 1331, İzmit 1337), Karesi'nin katılmasıyla (1345) denizcilik birikimine, Çimpe üssüyle (1353) Rumeli'ye ve Edirne'ye. Üç soru ayrı kurulur: uçta kimler bir araya geldi, Rumeli'de geçiş nasıl kalıcı oldu, Anadolu'da beyliklerle hangi yollar kullanıldı.",
  alt: "Şematik harita: sağ altta Söğüt ve Domaniç, ortada Bursa, sağda İznik ve İzmit; solda Karesi, sol üstte boğazın batısında Çimpe ve Edirne. Ortada Marmara'yı simgeleyen soluk bir alan. Adımlarda yıllarla etiketli oklar sırayla eklenir.",
  steps: ["Uç çevresi", "Şehir ağı", "Karesi ve Çimpe", "Rumeli"],
  draw: (_v, step) => {
    const els: El[] = [poly([v(1.8, 3.2), v(4.4, 3.4), v(6.8, 3.6), v(7.6, 4.1), v(5.6, 4.6), v(3.0, 4.4), v(2.0, 3.9)], { tone: "b", fill: "b", thin: true, smooth: true })];
    els.push(txt(v(4.6, 4.0), "Marmara", "c", { small: true, tone: "muted" }));
    for (const [from, to, yr, s, at] of MOVES) {
      if (s > step) continue;
      els.push(vec(P(from), P(to), { tone: s === step ? "a" : "ink", bold: s === step, thin: s !== step }));
      if (yr) {
        const m = v((P(from)[0] + P(to)[0]) / 2, (P(from)[1] + P(to)[1]) / 2);
        els.push(txt(m, yr, at, { small: true, bold: true, tone: s === step ? "a" : "ink" }));
      }
    }
    const shown = new Set(["Söğüt", "Domaniç", ...MOVES.filter((m) => m[3] <= step).flatMap((m) => [m[0], m[1]])]);
    for (const [name, c, at] of PLACES) if (shown.has(name)) els.push(pt(c, name, at as "n", step === 0 && (name === "Söğüt" || name === "Domaniç") ? "a" : "ink"));
    els.push(txt(v(-0.4, 7.0), " ", "c"), txt(v(10.2, -0.5), " ", "c"));
    const say = ["Uç: iki gücün cetvelle ayrıldığı çizgi değil; alışveriş, göç, ittifak ve çatışmanın kesiştiği çevre.", "Bursa 1326, İznik 1331, İzmit 1337: pazar, üretim, ulaşım ve yönetim merkezleri; her kurum fetih günü tamamlanmaz.", "Karesi 1345 denizcilik birikimi; Çimpe 1353 boğazın batısında üs. İkisi farklı gelişmelerdir.", "Edirne'nin alınması ve merkez olarak önem kazanması Rumeli seferlerinin yönetimini destekledi; iskân ve istimâlet kalıcılığa katkı sağladı."];
    return { els, readout: [say[step], "Ok hazır bir zorunlu sonuç değil, belirli imkânların sonraki harekete katkısıdır."] };
  },
};

const means = boardFig(
  [
    { name: "çeyiz", tag: "Germiyan · bazı yerler · I. Murad", what: "Germiyanoğullarından bazı yerler çeyiz yoluyla alındı (hanedan evliliği).", tone: "a" },
    { name: "satın alma", tag: "Hamitoğulları · bazı yerler · I. Murad", what: "Hamitoğullarından bazı yerler satın alma yoluyla alındı (bedel ödeme).", tone: "b" },
    { name: "vasiyet", tag: "Germiyan · topraklar · II. Murad", what: "Germiyan topraklarının vasiyetle katılması; çeyiz olayından ayrıdır.", tone: "c" },
    { name: "askerî güç", tag: "doğrudan hâkimiyet · Yıldırım Bayezid", what: "Yıldırım Bayezid döneminde askerî güç ve doğrudan hâkimiyet daha belirginleşti.", tone: "warn" },
  ],
  2,
  "Anadolu Türk siyasi birliği bir amaçtır; çeyiz, satın alma, vasiyet ve savaş bu amaca ulaşmanın farklı araçlarıdır. Aynı beyliğin farklı parçaları farklı tarihlerde ve farklı yollarla katılabilir: Germiyan'dan bazı yerler çeyizle, toprakların kalanı daha sonra vasiyetle. Bir kutuya tıkla.",
  "İki sütunlu dört kutu: çeyiz (Germiyan, I. Murad), satın alma (Hamitoğulları, I. Murad), vasiyet (Germiyan, II. Murad), askerî güç (doğrudan hâkimiyet, Yıldırım Bayezid). Kutular seçilebilir.",
  "Bir belge hangi toprağın hangi şartla verildiğini gösteriyorsa çözüm o kadarla sınırlıdır.",
  5.4,
);

/* ---------------- Askerî teşkilat ---------------- */

const army: FigureDef = {
  caption:
    "Kapıkulu bir üst başlıktır: doğrudan padişaha ve merkezî düzene bağlı, merkez hazinesinden ulufe alan kuvvetler. Piyade ocaklarında yeniçerilerle birlikte farklı uzmanlıklar (cebeci, topçu, top arabacısı, lağımcı), süvari kısmında sipah, silahtar, ulufeciler ve garipler. Tımarlı sipahi ise dirlik geliri karşılığında hizmet eden taşra atlısıdır.",
  alt: "Şema: solda kapıkulu kutusu, altında piyade ocakları ve kapıkulu süvarileri kutuları; sağda ayrı bir kutu olarak tımarlı sipahi ve onun altında cebelü. Her kutuda gelir kaynağı yazılı.",
  draw: () => {
    const els: El[] = [];
    els.push(...node(v(4.1, 4.2), 4.6, 0.8, "Kapıkulu (ulufe)", "a", { small: false }));
    els.push(...elbow(v(4.1, 3.8), v(1.9, 3.1)), ...elbow(v(4.1, 3.8), v(6.3, 3.1)));
    els.push(...node(v(1.9, 2.7), 3.8, 0.8, "piyade ocakları", "c"), ...node(v(6.3, 2.7), 3.8, 0.8, "süvariler", "b"));
    ["yeniçeri", "cebeci", "topçu", "top arabacısı", "lağımcı"].forEach((s, i) => els.push(txt(v(1.9, 1.85 - i * 0.75), s, "c", { small: true })));
    ["sipah", "silahtar", "sağ-sol ulufeciler", "sağ-sol garipler"].forEach((s, i) => els.push(txt(v(6.3, 1.85 - i * 0.75), s, "c", { small: true })));
    els.push(...node(v(10.8, 4.2), 4.0, 0.8, "Tımarlı sipahi", "warn", { small: false }), txt(v(10.8, 3.3), "dirlik geliri, taşra", "c", { small: true, tone: "muted" }));
    els.push(vec(v(10.8, 2.95), v(10.8, 2.3), { thin: true }), ...node(v(10.8, 1.85), 3.0, 0.8, "cebelü", "warn"), txt(v(10.8, 1.15), "atlı asker yetiştirir", "c", { small: true, tone: "muted" }));
    els.push(txt(v(-0.2, 4.8), " ", "c"), txt(v(13.0, -0.6), " ", "c"));
    return { els, readout: ["Kapıkulunun tamamı yeniçeri ya da piyade değildir; kapıkulu süvarileri de ulufe alır.", "'Sipahi' sözcüğü tek başına yeterli ayraç değildir."] };
  },
};

const devsirme: FigureDef = {
  caption:
    "Devşirmede seçim, hazırlık ve nihai görev ayrı düğümlerdir: belirli Hristiyan tebaa ailelerinin oğulları kurallar çerçevesinde seçilir; Türk aileleri yanında dil ve kültür öğrenilir; Acemi Ocağı'nda eğitim; yeteneğe göre farklı hizmetler. Devşirmelerin tamamı yeniçeri olmaz; bazı adaylar saray hizmetine ayrılır. Kurallar dönemle değişmiştir.",
  alt: "Akış şeması: seçim kutusundan Türk aileleri yanında dil ve kültür kutusuna, oradan Acemi Ocağı'na; Acemi Ocağı'ndan yeniçeri ve diğer ocaklara giden iki kol. Seçimden ayrıca doğrudan saray hizmetine giden ayrı bir kol.",
  draw: () => {
    const els: El[] = [];
    els.push(...node(v(2.6, 4.4), 4.4, 0.8, "seçim", "muted"), vec(v(2.6, 3.98), v(2.6, 3.22), { thin: true }));
    els.push(...node(v(2.6, 2.8), 4.4, 0.8, "Türk aileleri yanında", "c"), vec(v(2.6, 2.38), v(2.6, 1.62), { thin: true }));
    els.push(...node(v(2.6, 1.2), 4.4, 0.8, "Acemi Ocağı", "c"));
    els.push(vec(v(4.85, 1.2), v(6.6, 1.9), { thin: true }), vec(v(4.85, 1.2), v(6.6, 0.5), { thin: true }));
    els.push(...node(v(9.4, 1.9), 5.2, 0.8, "Yeniçeri Ocağı", "a"), ...node(v(9.4, 0.5), 5.2, 0.8, "cebeci ve diğer görevler", "a"));
    els.push(vec(v(4.85, 4.4), v(6.6, 4.4), { thin: true, dash: true }), ...node(v(9.4, 4.4), 5.2, 0.8, "saray hizmetleri", "b"));
    els.push(txt(v(2.6, 5.0), "hazırlık yolu", "n", { small: true, tone: "muted" }), txt(v(9.4, 5.0), "nihai görev", "n", { small: true, tone: "muted" }));
    els.push(txt(v(-0.1, 5.7), " ", "c"), txt(v(12.2, -0.1), " ", "c"));
    return { els, readout: ["Acemi Ocağı hazırlık kurumu, Yeniçeri Ocağı görev yerlerinden biridir.", "Sabit bir yaş ya da yıl sayısı bütün tarihe yayılmaz."] };
  },
};

const timar = stepsFig({
  items: [
    { s: "Vergi geliri tahsis edilir", what: "Belirli vergi gelirlerini toplama ve kullanma yetkisi hizmet karşılığında verilir; toprağın mülkiyeti devredilmez." },
    { s: "Köylü üretir, kanuna göre öder", what: "Üretici köylü toprağı işler; sipahi kanunda belirtilenden fazla vergi isteyemez." },
    { s: "Sipahi geliri toplar", what: "Gelir taşrada değerlendirilir; merkezden doğrudan maaş ihtiyacı azalır (merkezin hiç askerî harcaması kalmaz denmez)." },
    { s: "Cebelü yetiştirir", what: "Gelirin büyüklüğüne göre cebelü adı verilen atlı asker yetiştirir; kişiye özgü keyfî oran yoktur." },
    { s: "Seferde birlikte katılır", what: "Tımarlı sipahi cebelüleriyle sefere katılır; yerel güvenlik ve düzenle de bağlantılıdır." },
  ],
  caption:
    "Tımar zinciri: toprağın kendisi değil vergi geliri tahsis edilir. Gelir taşrada toplanır, sipahi cebelü yetiştirir ve seferde onlarla katılır. Has, zeamet ve tımar gelir büyüklüğüne göre ayrımlardır; bu şemada asker sayısı veya gelir eşiği yoktur.",
  alt: "Yukarıdan aşağıya beş kutu: vergi geliri tahsisi, köylünün üretimi, sipahinin geliri toplaması, cebelü yetiştirme, sefere katılma. Adımlarla sırayla etkinleşir.",
  foot: "Tımar yalnız asker toplama tekniği veya yalnız vergi yöntemi değildir.",
});

const axesFig = boardFig(
  [
    { name: "Yeniçeri", tag: "ulufe, merkez, piyade", what: "Hazineden ulufe alan sürekli merkez piyadesi.", tone: "c" },
    { name: "Kapıkulu süvarisi", tag: "ulufe, merkez, atlı", what: "Atlıdır ama merkezden ulufe alır; atlı olmak tımarlı sipahiyi kanıtlamaz.", tone: "b" },
    { name: "Tımarlı sipahi", tag: "dirlik geliri, taşra, atlı ve cebelü", what: "Dirlik geliri karşılığında cebelüleriyle sefere gelen taşra atlısı.", tone: "warn" },
  ],
  1,
  "Bir kuvvet profilini üç eksende oku: gelir kaynağı, bağlılık/yer ve görev türü. Atlı olmak tek başına tımarlı sipahiyi kanıtlamaz; kapıkulu süvarileri de vardır ve ulufe alır. Ulufe bilgisi de tek başına yeniçeriyi cebeciden ayırmaz. Bir kutuya tıkla.",
  "Alt alta üç kutu: yeniçeri (ulufe, merkez, piyade), kapıkulu süvarisi (ulufe, merkez, atlı), tımarlı sipahi (dirlik geliri, taşra, atlı ve cebelü). Kutular seçilebilir.",
  "İki ya da üç özellik birlikte ayırır; yeterli kayıt yoksa adayları açık bırak.",
  8,
);

/* ---------------- Dünya gücü ---------------- */

const WORLD: Ev[] = [
  { y: 1453, s: "İstanbul", what: "29 Mayıs 1453'te şehir alındı; Doğu Roma sona erdi." },
  { y: 1461, s: "Trabzon", what: "Karadeniz kıyısındaki siyasi yapıyı değiştirdi." },
  { y: 1473, s: "Otlukbeli", what: "Akkoyunlu rekabetinde Osmanlı üstünlüğünü güçlendirdi." },
  { y: 1514, s: "Çaldıran", what: "Safevilere karşı; doğudaki rekabette üstünlük, rakip devlet sürer." },
  { y: 1516, y1: 1517, s: "Mercidabık–Ridaniye", what: "Memlûklere karşı; Suriye'ye uzanan hâkimiyet ve Mısır'ın alınması." },
  { y: 1521, s: "Belgrad", what: "Orta Avrupa seferleri için stratejik dayanak." },
  { y: 1526, s: "Mohaç", what: "Macar Krallığı'nın siyasi düzenini değiştirdi." },
  { y: 1529, s: "I. Viyana", what: "Kuşatma şehrin alınmasıyla sonuçlanmadı; sefer mevsimi, ikmal ve savunma sonucu etkiler." },
  { y: 1534, s: "Bağdat", what: "Irakeyn Seferi'nde alındı; Irak ve Basra yönünde siyasi ve ticari bağlantılar." },
  { y: 1538, s: "Preveze", what: "Deniz gücünün yükselişinde önemli." },
  { y: 1555, s: "Amasya", what: "Osmanlı ile Safeviler arasındaki ilk resmî antlaşma." },
  { y: 1571, s: "Kıbrıs ve İnebahtı", what: "Kıbrıs Venedik'ten alındı; ikisi de 1571'dedir diye aynı sonuçla etiketlenemez." },
  { y: 1590, s: "Ferhat Paşa", what: "Yeniden başlayan Osmanlı–Safevi savaşlarının ardından; doğuda geniş kazanımlar." },
];
const worldTimeline = timelineFig({
  events: WORLD,
  a0: 1450,
  a1: 1600,
  ticks: [1450, 1500, 1550, 1600],
  caption:
    "1453–1595 dönemindeki bölümde geçen olaylar tek yıl ekseninde. Kronoloji bir başlangıç aracıdır; bir olaya tıklayınca rakibi ve ayırt edici sonucu açılır. 1516–1517 Mercidabık–Ridaniye Safevilere değil Memlûklere karşıdır.",
  alt: "Yatay eksende 1450–1600; her satırda bir olay: 1453 İstanbul'dan 1590 Ferhat Paşa'ya on üç olay, yılında nokta, 1516–1517 bir çubuk. Olay adları seçilebilir.",
  foot: "Yılın yanına rakibi yaz: 1533 İstanbul–Habsburg, 1555 Amasya–Safevi.",
});

const conquest = stepsFig({
  items: [
    { s: "Hazırlık: hisarın yapılması", what: "Kuşatmayı mümkün kılan hazırlık adımı.", tone: "b" },
    { s: "Olay: 29 Mayıs 1453", what: "Şehrin alınması.", tone: "c" },
    { s: "Sonuç: Doğu Roma'nın sonu", what: "Fethin doğrudan siyasi sonucu.", tone: "a" },
  ],
  caption: "Aynı konuyu üç ayrı düğümle oku: hisarın yapılması hazırlık, şehrin 29 Mayıs 1453'te alınması olay, Doğu Roma'nın sona ermesi sonuçtur. Hazırlık, olay ve sonuç birbirinin yerine kullanılmaz.",
  alt: "Yukarıdan aşağıya üç kutu: hazırlık (hisarın yapılması), olay (29 Mayıs 1453), sonuç (Doğu Roma'nın sonu).",
  foot: "Fetih bir şehirden fazlasını değiştirdi; sonuçları ayrı ayrı adlandır.",
  w: 7,
});

export const historyFigures059Ottoman: Record<string, Record<string, FigureDef>> = {
  "sultan-osmanli-merkez-teskilati": {
    "Merkez teşkilatını bir iş akışı olarak kur": orgChart,
    "Veraset: aynı hanedan, değişen uygulamalar": succession,
    "Topkapı: aynı sarayda üç farklı işlev": topkapi,
    "Kalemiye: parayı ve kaydın içeriğini izle": duties,
  },
  "osmanli-kurulus-siyaseti": {
    "Önce haritada üç ayrı soruyu kur": foundMap,
    "Anadolu’da birliği yalnız savaşla arama": means,
    "Dönüm noktalarını karşılaştırmalı çizelgede oku": foundTimeline,
  },
  "osmanli-askeri-teskilat": {
    "Kapıkulu: merkeze bağlı sürekli kuvvet": army,
    "Devşirme ve Acemi Ocağı: seçimden eğitime": devsirme,
    "Vergi gelirinden cebelüye ve üretime": timar,
    "Kapıkulu ile tımarlı sipahiyi üç eksende ayır": axesFig,
  },
  "dunya-gucu-osmanli": {
    "1453: İstanbul neden hedeflendi, nasıl hazırlandı?": conquest,
    "Olay listesinden gerekçeli yoruma geç": worldTimeline,
  },
};
