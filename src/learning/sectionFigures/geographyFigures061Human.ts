import { fmt, seg, v, type El, type FigureDef } from "./figureKit";
import { axis, BAR_R, barRow, LABEL_W, notes } from "./geographyFigures061Kit";
import { fitH, flowFig, frame, rect, tableFig, timelineFig, treeFig } from "./turkishFigures060Kit";

/*
 * Forge061 TYT Coğrafya · Ulaşım, ekonomik faaliyetler, göçler ve Türkiye’de
 * nüfus. Sayılar yalnız bölüm metninden (özgün deneyler dahil) ya da
 * sürgünün açıkça “örnek” diye yazılan değerinden hesaplanır. Çubuk
 * şemaları ölçeklidir; tablolar ve akışlar kavram şemasıdır (ölçekli değil).
 */

// ulasim-aglari · 1 · Rota süresi: 1000 km dolaşma, 700 km kanal + bekleme.
const SPEED = 20;
const routeX = (h: number) => LABEL_W + (h * (BAR_R - LABEL_W)) / 70;
const routeDraw = (wait: number) => {
  const els: El[] = [];
  let y = 0;
  y = barRow(els, y, "Dolaşma 1000 km", [{ len: 1000 / SPEED, tone: "b" }], routeX, `hareket ${fmt(1000 / SPEED)} sa, bekleme yok`);
  y = barRow(els, y, "Kanal 700 km", [{ len: 700 / SPEED, tone: "c" }, { len: wait, tone: "warn", dash: true }], routeX, `hareket ${fmt(700 / SPEED)} sa + kanal bekleme ${fmt(wait)} sa`);
  y = axis(els, y + 0.2, [0, 10, 20, 30, 40, 50, 60, 70], routeX, "saat");
  y = notes(els, y, ["Hız 20 km/saat sabit (bölümdeki özgün X–Y deneyi). Dolu: hareket, kesik çerçeve: bekleme."]);
  return { els, h: -y };
};
const routeH = routeDraw(30).h;
const route: FigureDef = {
  caption:
    "Bölümdeki özgün X–Y deneyi: dolaşma rotası 1000 km, kanal rotası 700 km, hız 20 km/saat. Sürgüyle kanaldaki bekleme süresini değiştir; toplam süreler gerçek hesapla karşılaştırılır. Daha kısa mesafe, bekleme yüzünden daha uzun toplam süre verebilir.",
  alt: "İki yatay çubuk, saat ekseninde. Dolaşma rotası 50 saat. Kanal rotası 35 saat hareket artı seçilen bekleme süresi; bekleme 15 saat olunca iki toplam eşit.",
  maxHeight: fitH(routeH),
  param: { label: "Kanal bekleme", min: 0, max: 30, step: 1, init: 15, unit: " sa" },
  draw: (wait) => {
    const { els } = routeDraw(wait);
    els.push(...frame(routeH));
    const a = 1000 / SPEED;
    const b = 700 / SPEED + wait;
    const verdict = b < a ? "kanal rotası daha kısa sürer" : b > a ? "dolaşma rotası daha kısa sürer" : "iki toplam süre eşit";
    return { els, readout: [`Toplam: dolaşma ${fmt(a)} sa, kanal ${fmt(700 / SPEED)} + ${fmt(wait)} = ${fmt(b)} sa; ${verdict}.`, "Kanal kapanırsa o rota kullanılamaz; kullanılmayan yolun süresi sıfır sayılmaz."] };
  },
};

// ulasim-aglari · 2 · Ulaşım türleri.
const modes = tableFig({
  caption:
    "Ulaşım türlerinin bölümde anlatılan güçlü yönleri ve sınırları. Bir türe tıkla: kapıdan kapıya süreye eklenen bileşenler ve aşırı genelleme uyarısı açılır. Hiçbir tür her yük ve mesafede mutlak olarak en ucuz ya da en hızlı değildir.",
  alt: "Beş satırlı tablo. Kara yolu: kapıya ulaştırma esnekliği, son bağlantı; sınır trafik, bakım, emisyon. Demir yolu: büyük ve düzenli yükte düşük birim gider; sınır ray ve terminal yatırımı, istasyon erişimi. Deniz yolu: uzun mesafe, büyük hacim; sınır liman, kanal, bekleme maliyeti. Hava yolu: uzun mesafede hareket süresi; sınır hava alanına erişim ve kontrol. Boru hattı: petrol ve doğal gaz gibi akışkanlar; sınır hat yatırımı, sızıntı ve güvenlik.",
  cols: [
    { name: "Tür", w: 2.5 },
    { name: "Bölümdeki güçlü yön", w: 3.9 },
    { name: "Sınır", w: 3.6 },
  ],
  rows: [
    { cells: ["Kara yolu", "kapıya ulaştırma esnekliği, son bağlantı", "trafik, bakım, emisyon"], tones: [undefined, "c", "muted"], detail: ["Limana veya istasyona gelen ürünün son bölümü kara yoluyla taşınabilir; yalnız trenin hareket süresine bakarak kapıdan kapıya süre hesaplanamaz."] },
    { cells: ["Demir yolu", "büyük, düzenli yükte düşük birim gider", "ray ve terminal yatırımı, istasyon erişimi"], tones: [undefined, "c", "muted"], detail: ["Kömür, cevher, tahıl gibi hacimli yükler ve yoğun yolcu hatları örnektir; yük, mesafe ve hizmet verilmeden iki tür sayısal maliyetle sıralanamaz."] },
    { cells: ["Deniz yolu", "uzun mesafe, büyük hacimli uluslararası yük", "liman, kanal, yakıt, sigorta, bekleme"], tones: [undefined, "c", "muted"], detail: ["Hinterlant limanın yük veya yolcu ilişkisi kurduğu art alandır; kıyısı olmak iyi liman ağının bütün koşullarını sağlamaz."] },
    { cells: ["Hava yolu", "uzun mesafede hareket süresi; değerli, acil, hafif yük", "hava alanına erişim, kontrol, aktarma"], tones: [undefined, "c", "muted"], detail: ["Uçak havada daha hızlı olsa bile her kısa yolculuğun toplamda en hızlı türü olmak zorunda değildir."] },
    { cells: ["Boru hattı", "petrol, doğal gaz gibi akışkanların düzenli taşınması", "hat yatırımı, sızıntı, güvenlik"], tones: [undefined, "c", "muted"], detail: ["Her katı yükün her borudan geçtiği söylenemez; hat taşıma sürecini görünmez ve etkisiz yapmaz."] },
  ],
  foot: "Kapıdan kapıya süre: erişim + bekleme ve aktarma + hareket.",
});

// ulasim-aglari · 3 · Kanallar.
const canals = tableFig({
  caption:
    "Kanal insanın açtığı yapay su yoludur, boğaz doğal dar deniz geçişidir. Bölümdeki dört kanalın ülkesi ve bağladığı sular; bir kanala tıkla. Aynı okyanuslar arasında alternatif olmak Panama ile Macellan’ı aynı türde yapmaz.",
  alt: "Dört satırlı tablo. Süveyş: Mısır, Akdeniz ile Kızıldeniz. Panama: Panama, Karayip tarafı ile Büyük Okyanus. Kiel: Almanya, Kuzey Denizi ile Baltık. Korint: Yunanistan, Korint Körfezi ile Saronik Körfezi.",
  cols: [
    { name: "Kanal", w: 2.4 },
    { name: "Ülke", w: 2.6 },
    { name: "Bağladığı sular", w: 5.0 },
  ],
  rows: [
    { cells: ["Süveyş", "Mısır", "Akdeniz – Kızıldeniz"], tones: [undefined, "muted", "c"], detail: ["Akdeniz–Süveyş–Kızıldeniz–Hint Okyanusu hattı Avrupa ile Asya yönünde önemli bir koridordur; Babülmendep bu rotada ayrı bir halkadır."] },
    { cells: ["Panama", "Panama", "Karayip tarafı – Büyük Okyanus"], tones: [undefined, "muted", "c"], detail: ["Macellan ise Güney Amerika ana karası ile güneydeki adalar arasında doğal bir geçiştir."] },
    { cells: ["Kiel", "Almanya", "Kuzey Denizi – Baltık"], tones: [undefined, "muted", "c"], detail: ["Kiel Kuzey Denizi ile Baltık arasında yapay bağlantıdır."] },
    { cells: ["Korint", "Yunanistan", "Korint Körfezi – Saronik Körfezi"], tones: [undefined, "muted", "c"], detail: ["Korint iki körfez arasında yapay bağlantıdır."] },
  ],
  foot: "Deneydeki 700 km çizgisini bir su yolunun gerçek ölçüsü gibi ezberleme.",
});

// ulasim-aglari · 4 · Türk boğazları zinciri.
const straits = flowFig({
  caption:
    "Karadeniz’den Akdeniz yönüne su yolu zinciri, şematik (ölçekli değil). İleri ile halkaları aç. İstanbul ile Çanakkale tek bir nokta ya da aynı deniz çifti değildir; Marmara ara denizdir.",
  alt: "Beş kart alt alta: Karadeniz; İstanbul Boğazı; Marmara Denizi, ara deniz; Çanakkale Boğazı; Ege Denizi ve Akdeniz.",
  nodes: [
    { head: "Karadeniz", text: "zincirin kuzey ucu", tone: "b", note: "Karadeniz’den Akdeniz yönüne giderken önce İstanbul Boğazı geçilir." },
    { head: "İstanbul Boğazı", text: "Karadeniz – Marmara", tone: "c", note: "İstanbul Boğazı Karadeniz’i Marmara’ya bağlar." },
    { head: "Marmara Denizi", text: "iki boğaz arasındaki ara deniz", tone: "b", note: "Marmara ara denizdir; iki boğaz aynı deniz çiftini bağlamaz." },
    { head: "Çanakkale Boğazı", text: "Marmara – Ege", tone: "c", note: "Çanakkale Boğazı Marmara’yı Ege’ye bağlar." },
    { head: "Ege ve Akdeniz", text: "zincirin güney ucu", tone: "b", note: "Dar geçişin önemi yalnız genişliğine değil bağladığı ağlara da bağlıdır." },
  ],
  steps: ["Karadeniz", "İstanbul Boğazı", "Marmara", "Çanakkale Boğazı", "Ege"],
  reveal: true,
  foot: "Şema yönü ve sırayı gösterir; gerçek kıyı biçimi ve uzaklık değildir.",
});

// ekonomik-faaliyetler · 1 · Aynı ürün, farklı süreçler.
const chain = flowFig({
  caption:
    "Aynı ürünün tarlada yetişmesi, işlenmesi, taşınması ve satılması farklı süreçlerdir; sektörü ürünün adı değil yapılan iş belirler. İleri ile buğday örneğini adım adım izle.",
  alt: "Dört kart alt alta: buğday yetiştirme, birincil; buğdaydan un, ikincil; kamyonla taşıma, üçüncül; markette satış, üçüncül.",
  nodes: [
    { head: "Tarlada yetiştirme · birincil", text: "doğal ortamdan ürün elde etme", tone: "c", note: "Buğday yetiştirme birincil faaliyettir; birincil sözcüğü basit teknoloji ya da yalnız köy anlamına gelmez." },
    { head: "Fabrikada işleme · ikincil", text: "buğdaydan un", tone: "b", note: "Hammaddeden yeni kullanılabilir ürün elde etme ikincildir; atölye ile fabrika arasındaki ölçek farkı süreci değiştirmez." },
    { head: "Kamyonla taşıma · üçüncül", text: "yükün yer değiştirmesi", tone: "a", note: "Ulaşım kişi veya yükün yer değiştirmesini sağlayan hizmettir." },
    { head: "Mağazada satış · üçüncül", text: "ürünün pazara ulaşması", tone: "a", note: "Market satıcısı ürünün tarımsal kökeni yüzünden çiftçi sayılmaz; sektör verilen sürece göre belirlenir." },
  ],
  steps: ["Yetiştirme", "İşleme", "Taşıma", "Satış"],
  reveal: true,
  foot: "Soru bireyin işini mi, işletmenin ana faaliyetini mi istiyor? Önce bunu belirle.",
});

// ekonomik-faaliyetler · 2 · Beşli ayrım.
const five = tableFig({
  caption:
    "Beşli ders ayrımı ve bölümdeki örnekler. Bir gruba tıkla: ayırıcı ölçüt ve karıştırılan örnek açılır.",
  alt: "Beş satırlı tablo. Birincil: doğal ortamdan ürün ve hammadde; tarım, hayvancılık, balıkçılık, ormancılık, madencilik. İkincil: dönüştürme, inşaat, elektrik üretimi. Üçüncül: taşıma, ticaret, bankacılık, eğitim, sağlık ve benzeri hizmetler. Dördüncül: araştırma-geliştirme, yazılım, bilgi işleme, CBS. Beşincil: üst düzey stratejik karar ve kontrol.",
  cols: [
    { name: "Grup", w: 2.5 },
    { name: "Ölçüt", w: 3.4 },
    { name: "Bölümdeki örnek", w: 4.1 },
  ],
  rows: [
    { cells: ["Birincil", "doğal ortamdan ürün, hammadde", "tarım, hayvancılık, balıkçılık, ormancılık, madencilik"], tones: [undefined, "c", "muted"], detail: ["İleri teknolojili bir balık çiftliği de yaptığı işlem bakımından bu gruptadır; madenden çıkarma ile cevheri metale dönüştürme ayrılır."] },
    { cells: ["İkincil", "dönüştürme, inşaat, enerji", "un, peynir, kumaş, metal; elektrik üretimi"], tones: [undefined, "b", "muted"], detail: ["Kömür çıkarma birincil, kömürden santralde elektrik üretme ikincildir; otel binasını yapmak turizm hizmeti değildir."] },
    { cells: ["Üçüncül", "insanlara ve işlere hizmet", "taşıma, ticaret, finans, turizm, eğitim, sağlık"], tones: [undefined, "a", "muted"], detail: ["Fiziksel mal imalatının bulunmaması ekonomik değer üretilmediği anlamına gelmez."] },
    { cells: ["Dördüncül", "bilgi ve yöntem üretme-işleme", "Ar-Ge, yazılım, bilgi işleme, tasarım, CBS"], tones: [undefined, "a", "muted"], detail: ["Kasiyerin bilgisayarla satış yapması onu yazılım araştırmacısı yapmaz; belirleyici olan bilgi üretme-işleme işidir."] },
    { cells: ["Beşincil", "üst düzey stratejik karar, kontrol", "şirketin yatırım yönü, üst kamu politikası"], tones: [undefined, "a", "muted"], detail: ["Sürücünün güzergâh seçmesi hâlâ taşıma hizmetidir; görevin yetki ve kapsamı açık olmalıdır."] },
  ],
  foot: "Meslek adı bağlamsızsa görev tanımıyla tamamlanır.",
});

// ekonomik-faaliyetler · 3 · Üçlü ve beşli görünüm.
const threeFive = treeFig({
  caption:
    "Üçlü ayrımda bilgi ve üst yönetim işleri geniş hizmet grubunda toplanır; beşli ayrım aynı hizmetleri ayrıntılı böler. Bir dala tıkla. Sınıf sayısı değişirken toplam çalışan değişmez; aynı kişiyi iki gruba birden ekleme.",
  alt: "Üç dallı ağaç. Kök: toplam çalışan. Tarım dalında birincil; sanayi dalında ikincil; hizmet dalında üçüncül, dördüncül ve beşincil.",
  root: "Toplam çalışan (değişmez)",
  branches: [
    { label: "Tarım", title: "Tarım (üçlü ayrım)", tone: "c", detail: ["Üçlü ayrımda tarım grubu beşli ayrımdaki birincil faaliyetlere karşılık gelir."], leaves: [{ label: "birincil", title: "Birincil", detail: ["Doğal ortamdan ürün ve hammadde elde etme."] }] },
    { label: "Sanayi", title: "Sanayi (üçlü ayrım)", tone: "b", detail: ["Üçlü ayrımda sanayi grubu ikincil faaliyetlere karşılık gelir."], leaves: [{ label: "ikincil", title: "İkincil", detail: ["Dönüştürme, inşaat ve elektrik üretimi."] }] },
    {
      label: "Hizmet",
      title: "Hizmet (üçlü ayrım)",
      tone: "a",
      detail: ["Üçlü görünümde son üç grubun kişi sayıları tek hizmet grubunda toplanır."],
      leaves: [
        { label: "üçüncül", title: "Üçüncül", detail: ["İnsanlara ve işlere hizmet."] },
        { label: "dördüncül", title: "Dördüncül", detail: ["Bilgi ve yöntem üretme-işleme; hizmet toplamına ayrıca eklenmez."] },
        { label: "beşincil", title: "Beşincil", detail: ["Üst düzey stratejik karar ve kontrol; hizmet toplamına ayrıca eklenmez."] },
      ],
    },
  ],
  foot: "Her kişi bir ana görev grubunda tutulur; yalnız gruplanma değişir.",
});

// ekonomik-faaliyetler · 4 · Makineleşme: 700 → 650 çalışan.
const mechX = (n: number) => LABEL_W + (n * (BAR_R - LABEL_W)) / 700;
const MECH = [
  { label: "Önce", primary: 100, total: 700 },
  { label: "Makineleşme sonrası", primary: 50, total: 650 },
];
const mechDraw = (step: number) => {
  const els: El[] = [];
  let y = 0;
  MECH.forEach((m, i) => {
    const on = i <= step;
    const share = (100 * m.primary) / m.total;
    y = barRow(
      els,
      y,
      m.label,
      on ? [{ len: m.primary, tone: "c" }, { len: m.total - m.primary, tone: "muted" }] : [{ len: m.total, tone: "muted", dash: true }],
      mechX,
      on ? `birincil ${m.primary} / toplam ${m.total} kişi = %${fmt(share)}; birincil değer 100 birim` : "İleri ile aç",
      on ? "ink" : "muted",
    );
  });
  y = axis(els, y + 0.2, [0, 350, 700], mechX, "kişi");
  y = notes(els, y, ["Bölümdeki hazırlanmış deney; dolu: birincil çalışan, soluk: öbür gruplar. Gerçek ülke verisi değildir."]);
  return { els, h: -y };
};
const mechH = mechDraw(1).h;
const mechanize: FigureDef = {
  caption:
    "Bölümdeki deneyde ilk aşama 100 yerine 50 kişiyle aynı 100 değer birimini verir; toplam çalışan 700’den 650’ye iner. İleri ile iki durumu karşılaştır: birincil çalışan payı düşer, birincil değer aynı kalır.",
  alt: "İki yatay çubuk, kişi ekseninde. Önce: 700 kişinin 100’ü birincil, yüzde 14,3. Sonra: 650 kişinin 50’si birincil, yüzde 7,7. Birincil değer iki durumda da 100 birim.",
  maxHeight: fitH(mechH),
  steps: ["Önce", "Makineleşme sonrası"],
  draw: (_v, step) => {
    const { els } = mechDraw(step);
    els.push(...frame(mechH));
    return {
      els,
      readout: [
        step === 0 ? "Önce: birincil 100 / 700 = %14,3; değer 100 birim." : "Sonra: birincil 50 / 650 = %7,7; değer yine 100 birim, çalışan başına değer 1’den 2 birime çıkar.",
        "Daha az çalışan payından otomatik işsizlik, nüfus düşüşü ya da herkesin daha çok ücret aldığı sonucu çıkmaz.",
      ],
    };
  },
};

// dunya-turkiye-gocler · 1 · Üç sınıflama ekseni.
const migAxes = treeFig({
  caption:
    "Göçü üç ayrı soruyla sınıfla: sınır mı aşıldı, ne kadar sürüyor, irade mi baskı mı? Bir dala tıkla. Bir kişi aynı anda iç göç yapan, geçici kalan ve gönüllü giden biri olabilir; eksenler birbirini dışlamaz.",
  alt: "Üç dallı ağaç. Sınır: iç göç, dış göç. Süre: sürekli, mevsimlik. İrade: gönüllü, zorunlu.",
  root: "Göç",
  branches: [
    { label: "Sınır", title: "Sınır ekseni", tone: "c", detail: ["İl veya bölge sınırı ülke sınırı değildir."], leaves: [
      { label: "iç göç", title: "İç göç", detail: ["Ülke içinde yaşam yeri değiştirme; aynı ülkenin iki uzak ili arasında taşınma da iç göçtür."] },
      { label: "dış göç", title: "Dış göç", detail: ["Ülke sınırını aşma; yakın iki sınır kenti arasında ülke değiştirme dış göç olabilir."] },
    ] },
    { label: "Süre", title: "Süre ekseni", tone: "b", detail: ["Afet nedeniyle taşınmanın dönüş tarihi verilmemişse sırf afet sözcüğünden süre sonucu çıkarılmaz."], leaves: [
      { label: "sürekli", title: "Sürekli göç", detail: ["Uzun süreli yerleşme amacı taşır."] },
      { label: "mevsimlik", title: "Mevsimlik göç", detail: ["Belirli iş veya geçim dönemi sonunda dönmeyi içerir; pamuk, fındık, üzüm, şeker pancarı ve yaylacılık bölümdeki örneklerdir."] },
    ] },
    { label: "İrade", title: "İrade ekseni", tone: "a", detail: ["Gönüllü ve zorunlu ayrımı irade ve baskı koşuluyla ilgilidir."], leaves: [
      { label: "gönüllü", title: "Gönüllü göç", detail: ["Kişinin kendi isteğiyle yer değiştirmesi."] },
      { label: "zorunlu", title: "Zorunlu göç", detail: ["Mübadele ve köleleştirilerek taşınma bölümdeki zorunlu hareket örnekleridir."] },
    ] },
  ],
  foot: "Çıkış ve varış, ülke sınırı, süre ve nedeni ayrı satırlara yaz.",
});

// dunya-turkiye-gocler · 2 · İtici ve çekici.
const pushPull = tableFig({
  caption:
    "Aynı ekonomik başlık kaynak yerde sorun, hedef yerde fırsat olarak farklı yönlerde çalışabilir. Bir satıra tıkla: bölümdeki örnek ve uyarı açılır. Göç kararı bütün bireylerde tek nedene indirgenmez.",
  alt: "Üç satırlı tablo. Ekonomik: kaynakta işsizlik, geçim sıkıntısı, toprağın parçalanması itici; hedefte iş, gelir çekici. Hizmet: hedefte ulaşım ve eğitim olanakları çekici. Doğal ve güvenlik: kuraklık, sel, deprem, güvenlik sorunu yer değiştirmeye yol açabilir.",
  cols: [
    { name: "Başlık", w: 2.6 },
    { name: "Kaynak yerde itici", w: 3.7 },
    { name: "Hedef yerde çekici", w: 3.7 },
  ],
  rows: [
    { cells: ["Ekonomik", "işsizlik, geçim sıkıntısı, toprağın parçalanması", "iş, gelir"], tones: [undefined, "warn", "c"], detail: ["Ekonomik belirsizlik kaynakta itici, iş ve gelir olanağı hedefte çekici olabilir."] },
    { cells: ["Hizmet ve bağlantı", "bölümde örnek yok", "ulaşım, eğitim olanakları"], tones: [undefined, "muted", "c"], detail: ["Eğitim, sağlık, aile bağı, evlilik, tayin ve sosyal yaşam ekonomik nedenlerle birlikte bulunabilir."] },
    { cells: ["Doğal ve güvenlik", "kuraklık, sel, deprem, güvenlik sorunu", "bölümde örnek yok"], tones: [undefined, "warn", "muted"], detail: ["Bu olaylar yer değiştirmeye yol açabilir; dönüş bilgisi verilmeden süre sonucu çıkarılmaz."] },
  ],
  foot: "Etkeni yönüyle yaz: kaynakta mı itiyor, hedefte mi çekiyor?",
});

// dunya-turkiye-gocler · 3 · Net göç ile toplam değişim (örnek değerler).
const NATURAL = 20;
const netX = (n: number) => 6.2 + (n * 3.4) / 60;
const netDraw = (net: number) => {
  const els: El[] = [];
  let y = 0;
  const total = NATURAL + net;
  const row = (label: string, val: number, tone: "c" | "b" | "a" | "warn") => {
    const p = barRow(els, y, label, [], netX);
    if (val !== 0) els.push(barPiece(netX(Math.min(0, val)), netX(Math.max(0, val)), y, val < 0 ? "warn" : tone));
    y = p;
  };
  row("Doğal fark", NATURAL, "c");
  row("Net göç", net, "b");
  row("Toplam değişim", total, "a");
  els.push(seg(v(netX(0), 0.35), v(netX(0), y + 0.4), { tone: "muted", thin: true }));
  y = axis(els, y + 0.2, [-40, -20, 0, 20, 40, 60], netX);
  y = notes(els, y, ["Örnek değerler: doğal fark +20 sabit, net göç sürgüden. Birim bin kişi gibi okunabilir; gerçek bir yerin verisi değildir."]);
  return { els, h: -y };
};
const barPiece = (x0: number, x1: number, y: number, tone: "c" | "b" | "a" | "warn") => rect(x0, y + 0.21, x1, y - 0.21, tone, true);
const netH = netDraw(0).h;
const netMigration: FigureDef = {
  caption:
    "Toplam değişim = doğal fark (doğum − ölüm) + net göç (gelen − giden). Sürgüyle net göçü değiştir; doğal fark örnek olarak +20 sabit tutulur. Net göçü negatif olan bir yer, doğal artışı daha büyükse toplamda büyüyebilir.",
  alt: "Sıfır çizgisinden sağa ve sola uzanan üç çubuk: doğal fark +20, net göç sürgüden, toplam değişim ikisinin toplamı. Negatif değerler sola uzanır.",
  maxHeight: fitH(netH),
  param: { label: "Net göç (örnek)", min: -40, max: 40, step: 5, init: -10 },
  draw: (net) => {
    const { els } = netDraw(net);
    els.push(...frame(netH));
    const t = NATURAL + net;
    return { els, readout: [`Toplam = ${NATURAL} + (${fmt(net, 0)}) = ${fmt(t, 0)}: nüfus ${t > 0 ? "artar" : t < 0 ? "azalır" : "değişmez"}.`, "Net göç bir akıştır; dönem sonu nüfus stoku değildir."] };
  },
};

// dunya-turkiye-gocler · 4 · Türkiye’ye yönelen tarihli dış göçler.
const inflows = timelineFig({
  caption:
    "Bölümde tarihli verilen Türkiye’ye yönelik dış göç örnekleri, sıralı (ölçekli değil). Bir durağa tıkla: bağlamı ve uyarı açılır. Sayı ve hukuki kayıt dönemi belirlenmeden tek güncel toplam yazılmaz.",
  alt: "Düşey çizelge, üç durak: 30 Ocak 1923 Türkiye–Yunanistan mübadelesi; 1989 Bulgaristan’daki baskılarla gelen göç; 1990’lar eski Yugoslavya coğrafyasındaki çatışmalarla ilişkili göçler.",
  eras: [
    { when: "30 Ocak 1923", head: "Mübadele", text: "Türkiye–Yunanistan sözleşmesi; zorunlu, karşılıklı", tone: "c", detail: ["Kapsam dinî ve uyruk ölçütleriyle tanımlanır; İstanbul Rumları ve Batı Trakya Müslümanları değişimin dışında tutulmuştur. Karşılıklı sözü eşit sayıda kişi demek değildir."] },
    { when: "1989", head: "Bulgaristan’dan göç", text: "baskılarla Türkiye’ye yönelen hareket", tone: "b", detail: ["Siyasi ve toplumsal koşulların göçteki rolünü gösterir."] },
    { when: "1990’lar", head: "Eski Yugoslavya coğrafyası", text: "çatışmalarla ilişkili Balkan göçleri", tone: "a", detail: ["Bütün Yugoslavya göçlerini tek bir yıla sıkıştırma; gelenlerin hepsi aynı süre, neden ve statüyü taşımaz."] },
  ],
  foot: "Komşu ülkelerdeki çatışmalar ve eğitim-iş bağlantıları da farklı dönemlerde girişler oluşturur.",
});

// turkiye-nufusu · 1 · Binde 1,1 ile yüzde 1,1 (2023 ders verisi).
const POP = 85372377;
const permilleX = (n: number) => LABEL_W + (n * (BAR_R - LABEL_W)) / 1000000;
const permilleDraw = (step: number) => {
  const els: El[] = [];
  let y = 0;
  const a = POP * 0.0011;
  const b = POP * 0.011;
  y = barRow(els, y, "Binde 1,1", [{ len: a, tone: "c" }], permilleX, `85.372.377 × 1,1 / 1000 ≈ ${Math.round(a).toLocaleString("tr-TR")} kişi`);
  y = barRow(els, y, "Yüzde 1,1", step >= 1 ? [{ len: b, tone: "warn", dash: true }] : [], permilleX, step >= 1 ? `85.372.377 × 1,1 / 100 ≈ ${Math.round(b).toLocaleString("tr-TR")} kişi (yanlış okuma)` : "İleri ile karşılaştır");
  y = axis(els, y + 0.2, [0, 500000, 1000000], permilleX);
  y = notes(els, y, ["Kaynakta 2023 için 85.372.377 kişi ve yıllık yaklaşık binde 1,1 artış verilir; tarihli ders verisidir, güncel sayım değildir."]);
  return { els, h: -y };
};
const permilleH = permilleDraw(1).h;
const permille: FigureDef = {
  caption:
    "Binde 1,1 yüzde 1,1 değildir: aynı 2023 nüfusuna uygulanınca aradaki fark on kattır. İleri ile yanlış okumayı aç. Hız düşerken pozitif kaldıkça nüfus artmayı sürdürür; artış miktarı ile artış hızı ayrı niceliklerdir.",
  alt: "İki yatay çubuk, kişi ekseninde. Binde 1,1 artış yaklaşık 93.910 kişi; yüzde 1,1 diye okunursa yaklaşık 939.096 kişi, on kat fazla.",
  maxHeight: fitH(permilleH),
  steps: ["Binde 1,1", "Yüzde ile karıştırma"],
  draw: (_v, step) => {
    const { els } = permilleDraw(step);
    els.push(...frame(permilleH));
    return { els, readout: [step === 0 ? "Yıllık artış miktarı yaklaşık 93.910 kişi: hız binde 1,1." : "Yüzde 1,1 okunursa yaklaşık 939.096 kişi çıkar; bu, verilen hızın on katıdır.", "Hızın aşağı yönelmesi nüfus sütunlarının küçüldüğünü tek başına göstermez."] };
  },
};

// turkiye-nufusu · 2 · Dönemler.
const trPeriods = timelineFig({
  caption:
    "MEBİ’nin 1927–2023 serisinden bölümde anılan dönemler, sıralı (ölçekli değil). Bir döneme tıkla: artış hızını etkileyen ve bölümde anılan etkenler açılır. Tek bir etken her dönem için yeterli açıklama değildir.",
  alt: "Düşey çizelge: Cumhuriyet’in ilk yılları, doğumlar ve dışarıdan göçler; 1939 Hatay’ın katılması, sınır değişimi; 1940–1945, artış hızı düşer; 1955 ve 1960 sayımları, yüksek artış hızı; 1960 sonrası, aile planlaması ve kentleşme; 2023, 85.372.377 kişi, yaklaşık binde 1,1.",
  eras: [
    { when: "ilk yıllar", head: "Savaş sonrası artış", text: "nüfusu artırma yaklaşımları, doğumlar, dışarıdan göçler", tone: "c", detail: ["Cumhuriyet’in ilk yıllarında savaşların ardından nüfusu artırmaya yönelik yaklaşımlar, doğumlar ve göçler etkili olmuştur."] },
    { when: "1939", head: "Hatay’ın katılması", text: "ülke sınırının değişmesi", tone: "b", detail: ["Böyle bir artışın tamamı doğum diye açıklanamaz; kapsam değişimi ayrıca hesaba katılır."] },
    { when: "1940–1945", head: "Artış hızı düşer", text: "uzun askerlik, etkilenen evlilik ve doğumlar", tone: "warn", detail: ["Türkiye savaşa fiilen girmese de dolaylı sosyal ve ekonomik etkiler artış hızını düşürmüştür."] },
    { when: "1955, 1960", head: "Yüksek artış hızı", text: "sağlık koşullarının iyileşmesi, ölümlerin azalması", tone: "c", detail: ["Aynı süreçte göçler ve doğum davranışı da rol oynar."] },
    { when: "1960 sonrası", head: "Doğurganlık değişir", text: "aile planlaması, kentleşme, eğitim, evlilik yaşı", tone: "a", detail: ["Dış işçi göçü de toplam değişime katılır; bütün iller aynı hızda ilerlemez."] },
    { when: "2023", head: "85.372.377 kişi", text: "yıllık yaklaşık binde 1,1 artış", tone: "muted", detail: ["Tarihli ders verisidir; uygulamanın güncel sayımı değildir."] },
  ],
  foot: "Miktar artarken artış hızı dalgalanabilir.",
});

// turkiye-nufusu · 3 · İç taşınma ve ülke toplamı.
const scopes = tableFig({
  caption:
    "Aynı taşınma kaydı hangi sınırda sayıldığına göre farklı sonuç verir. Bir hareket türüne tıkla: il toplamına ve ülke toplamına etkisi açılır. Toplam fark = doğal fark + net göç, aynı sınır ve dönem için.",
  alt: "Üç satırlı tablo. İl içinden başka ile taşınma: il toplamlarını değiştirir, ülke toplamını değiştirmez. Ülke sınırından giriş veya çıkış: ülke toplamını değiştirir. İdari sınır değişikliği: kapsam düzeltmesi gerekir.",
  cols: [
    { name: "Hareket", w: 3.4 },
    { name: "İl toplamı", w: 3.0 },
    { name: "Ülke toplamı", w: 3.6 },
  ],
  rows: [
    { cells: ["Bir ilden başka ile", "giden ilde azalır, varılan ilde artar", "değişmez"], tones: [undefined, "c", "muted"], detail: ["Yer değiştirme ülkenin bütünündeki kişi sayısını artırmaz."] },
    { cells: ["Ülke sınırından giriş-çıkış", "ilgili ilde değişir", "değişir"], tones: [undefined, "c", "a"], detail: ["Ülke toplamı için sınır dışı giriş-çıkış ayrıca izlenir."] },
    { cells: ["İdari sınır değişikliği", "kapsam düzeltmesi gerekir", "kapsam düzeltmesi gerekebilir"], tones: [undefined, "warn", "warn"], detail: ["Denkleme kapsam düzeltmesi eklenmeden doğal fark ve net göç toplamı karşılaştırılamaz."] },
  ],
  foot: "Doğumlar fazla olduğu hâlde dışarı gidenler daha büyükse yerel nüfus azalabilir.",
});

export const geographyFigures061Human: Record<string, Record<string, FigureDef>> = {
  "ulasim-aglari": {
    "Hava yolu ve boru hatları": modes,
    "Doğal boğaz ile yapay kanalı ayır": canals,
    "Avrupa ve Türk boğazları zinciri": straits,
    "Rota süresini bileşenlerine ayır": route,
  },
  "ekonomik-faaliyetler": {
    "Kurum adı değil yapılan iş": chain,
    "Beşincil: üst düzey yön ve karar": five,
    "Üçlü ve beşli ayrımı çifte sayma": threeFive,
    "Makineleşme ve payın değişmesi": mechanize,
  },
  "dunya-turkiye-gocler": {
    "Üç sınıflama ekseni": migAxes,
    "İtici ve çekici etkenleri yönüyle yaz": pushPull,
    "Net göç toplam değişim değildir": netMigration,
    "Türkiye’ye yönelen tarihli dış göç örnekleri": inflows,
  },
  "turkiye-nufusu": {
    "Artış miktarı ile artış hızı": permille,
    "Sağlık ve toplumsal dönüşüm": trPeriods,
    "Doğal fark ve net göçü iki satırda tut": scopes,
  },
};
