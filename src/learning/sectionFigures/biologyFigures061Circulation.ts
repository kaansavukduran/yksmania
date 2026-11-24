import { type El, type FigureDef } from "./figureKit";
import { A, B, C, L, R, S, T, chain, lead, mk, tableFig } from "./biologyFigures060Kit";
import { bars, tr } from "./biologyFigures061Kit";

/*
 * AYT Biyoloji · Damarlar ve Starling, kan doku, lenf sistemi (Forge061).
 * Damar, tüp ve beden çizimleri nitel öğretim şemasıdır, ölçekli değildir.
 * Sayılar yalnız bölüm metnindeki örneklerden gelir: Pc = 40 / 15 ve
 * π = 25 mmHg; 20 süzülen, 17 dönen birim; 10 mL örnekte 4,5 mL eritrosit;
 * 10 + 5 − 3 = 12 mL lenf bilançosu. Bunlar kişisel ölçüm ya da tanı değildir.
 */

/* ---------------- Damarlar ve Starling ---------------- */

const direction = tableFig({
  caption:
    "Damarın adı yönü anlatır (bölüm metninden): atardamar kanı kalpten uzaklaştırır, toplardamar kalbe döndürür. Pulmoner devrede oksijen miktarı adla ters görünür; portal sistemde iki kılcal yatak arasında toplardamar bağlantısı vardır.",
  alt: "Üç satırlı tablo: pulmoner arter kalpten uzaklaştırır ve oksijence daha az kan taşır; pulmoner ven kalbe döndürür ve oksijence daha çok kan taşır; portal ven bağırsak kılcallarından karaciğer kılcallarına gider.",
  headers: ["Damar", "Yön", "Not"],
  rows: [
    ["Pulmoner arter", "kalpten\nuzaklaştırır", "oksijence\ndaha az"],
    ["Pulmoner ven", "kalbe\ndöndürür", "oksijence\ndaha çok"],
    ["Portal ven", "bağırsak →\nkaraciğer", "iki kılcal\nyatak arası"],
  ],
  readout: ["Damarın adını oksijen miktarı değil, kalbe göre yön belirler.", "Önce devreyi (sistemik ya da pulmoner), sonra yönü yaz."],
});

const area = mk({
  caption:
    "Aynı akışta toplam alan ve ortalama hız (v = Q/A modeli, ölçekli değil): hacimsel akış Q sabit tutulur, eş düzey ağın toplam kesit alanı katlanınca ortalama hız aynı oranda azalır. Tek kılcal küçüktür; çok sayıda paralel kılcalın toplam alanı büyüktür.",
  alt: "Solda tek geniş boru, sağda paralel ince borular demeti. Altta iki çubuk: toplam alan ve ortalama hız. Sürgü toplam alanın katını 1 ile 4 arasında değiştirir.",
  h: 300,
  param: { label: "Toplam alan katı", min: 1, max: 4, step: 1, init: 1 },
  draw: (k) => {
    const els: El[] = [R(20, 40, 200, 90, { bold: true, tone: "c" }), T(110, 20, "tek damar", "c", { tone: "c" })];
    for (let i = 0; i < k * 2; i++) els.push(R(280, 30 + i * (80 / (k * 2)), 510, 30 + i * (80 / (k * 2)) + 80 / (k * 2) - 4, { tone: "b", thin: true }));
    els.push(T(395, 130, `${k * 2} paralel kılcal`, "c", { tone: "b" }), A(208, 65, 272, 65, "ink"));
    const b = bars(
      [
        { label: "Toplam alan", value: k, text: `${k} × A`, tone: "b" },
        { label: "Ortalama hız", value: 1 / k, text: k === 1 ? "Q/A" : `Q/A ÷ ${k}`, tone: "a" },
      ],
      { y0: 170, max: 4 },
    );
    els.push(...b.els);
    return { els, readout: [`Toplam alan ${k} katı: v = Q / (${k}A); hız ${k === 1 ? "değişmez" : `${k} kat azalır`}.`, "Hızın azalması basıncın ya da taşınan oksijenin aynı oranda değiştiği anlamına gelmez."] };
  },
});

const starling = mk({
  caption:
    "Klasik Starling modeli (bölümdeki azaltılmış model; diğer basınç terimleri sıfır kabul edilir): kapiller hidrostatik basınç Pc dışa iter, plazma proteinlerinin onkotik etkisi π = 25 mmHg içe çeker. Net fark Pc − π; artı dışa, eksi içe eğilimdir. Bu bir basınç farkıdır, doğrudan akış miktarı değildir.",
  alt: "Yatay kılcal damar ve altında doku aralığı. Damardan aşağı Pc oku, yukarı π oku; ortada net eğilim oku. Sürgü Pc'yi 10 ile 45 mmHg arasında değiştirir.",
  h: 300,
  param: { label: "Pc", min: 10, max: 45, step: 5, init: 40, unit: "mmHg" },
  draw: (pc) => {
    const pi = 25;
    const net = pc - pi;
    const els: El[] = [
      R(20, 40, 512, 110, { bold: true, tone: "c" }),
      T(40, 75, "kılcal damar", "e", { tone: "c" }),
      L(20, 250, 512, 250, { tone: "muted", dash: true }),
      T(40, 228, "doku aralığı", "e", { tone: "muted" }),
    ];
    const len = (p: number) => 20 + p * 1.6;
    els.push(A(250, 112, 250, 112 + len(pc), "warn"), T(262, 112 + len(pc) / 2 + 6, `Pc = ${pc}`, "e", { tone: "warn", bold: true }));
    els.push(A(400, 112 + len(pi), 400, 112, "b"), T(412, 112 + len(pi) / 2 + 10, `π = ${pi}`, "e", { tone: "b", bold: true }));
    if (net !== 0) {
      const down = net > 0;
      els.push(A(120, down ? 120 : 112 + 20 + Math.abs(net) * 4, 120, down ? 120 + 20 + net * 4 : 120, "a", { bold: true }));
    }
    els.push(T(150, 280, `net ${net > 0 ? "+" : net < 0 ? "−" : ""}${Math.abs(net)} mmHg`, "e", { tone: "a", bold: true }));
    return {
      els,
      readout: [
        `Pc − π = ${pc} − ${pi} = ${net > 0 ? "+" : net < 0 ? "−" : ""}${Math.abs(net)} mmHg: ${net > 0 ? "dışa" : net < 0 ? "içe" : "yönsüz"} eğilim.`,
        "Akış miktarı için geçirgenlik, alan ve başka katsayılar ayrıca gerekir.",
      ],
    };
  },
});

const balance = mk({
  caption:
    "Birikimi giriş ve çıkışla hesapla (bölümdeki açık bilanço): 20 birim süzülür, 17 birim doğrudan döner, 3 birim artar. Lenf en çok kapasitesi kadar, en çok da var olan artık kadar taşır; bulunmayan sıvıyı eksiye düşürmez. Kişisel şişlik tanısı değildir.",
  alt: "Dört yatay çubuk: süzülen 20, doğrudan dönen 17, lenfle taşınan ve dokuda kalan. Sürgü lenf kapasitesini 0 ile 4 birim arasında değiştirir.",
  h: 220,
  param: { label: "Lenf kapasitesi", min: 0, max: 4, step: 1, init: 2, unit: "birim" },
  draw: (cap) => {
    const rest = 20 - 17;
    const moved = Math.min(cap, rest);
    const change = rest - moved;
    const b = bars(
      [
        { label: "Süzülen", value: 20, tone: "warn" },
        { label: "Doğrudan dönen", value: 17, tone: "c" },
        { label: "Lenfle taşınan", value: moved, tone: "b" },
        { label: "Dokuda kalan", value: change, text: change > 0 ? `+${change}` : "0", tone: "a" },
      ],
      { max: 20 },
    );
    return { els: b.els, readout: [`20 − 17 − ${moved} = ${change > 0 ? "+" : ""}${change} birim${change > 0 ? ": birikim var" : ": doku hacmi sabit"}.`, `Kapasite ${cap}, artık ${rest}: lenf ${moved} birim taşır.`] };
  },
});

/* ---------------- Kan doku ---------------- */

const tube = mk({
  caption:
    "Plazma ve hematokrit (bölümdeki 10 mL örnek, ölçekli değil): antikoagülanlı kan ayrılınca üstte plazma, altta paketlenmiş eritrosit tabakası, arada ince akyuvar-trombosit tabakası kalır. Hematokrit eritrosit hacminin toplam hacme oranıdır; birim hacimdeki hücre sayısını tek başına vermez.",
  alt: "Düşey deney tüpü: üstte açık renkli plazma, ortada ince beyaz tabaka, altta koyu eritrosit tabakası. Sürgü eritrosit tabakasını 3 ile 6 mL arasında değiştirir.",
  h: 330,
  param: { label: "Eritrosit tabakası", min: 3, max: 6, step: 0.5, init: 4.5, unit: "mL" },
  draw: (rbc) => {
    const top = 30;
    const bot = 300;
    const per = (bot - top) / 10;
    const yR = bot - rbc * per;
    const els: El[] = [
      R(120, yR, 200, bot, { tone: "warn", fill: "warn" }),
      R(120, yR - 6, 200, yR, { tone: "muted", fill: "muted" }),
      R(120, top, 200, yR - 6, { tone: "c", fill: "c" }),
      R(120, top, 200, bot, { bold: true }),
    ];
    els.push(...lead(200, (top + yR) / 2, 260, (top + yR) / 2, "plazma", "c", true));
    els.push(...lead(200, yR - 3, 260, yR - 3 + 34, "akyuvar-trombosit", "muted"));
    els.push(...lead(200, (yR + bot) / 2 + 10, 260, (yR + bot) / 2 + 40, `eritrosit: ${tr(rbc)} mL`, "warn", true));
    els.push(T(108, top, "10 mL", "w", { tone: "muted" }), T(108, bot, "0", "w", { tone: "muted" }));
    return { els, readout: [`Hematokrit = ${tr(rbc)} / 10 = %${tr(rbc * 10)}.`, "Hacim payı ile hücrelerin sayıca oranı aynı şey değildir."] };
  },
});

const abo = tableFig({
  caption:
    "ABO grubunu iki bölmede oku (bölümdeki temel erişkin öğretim tablosu): eritrositteki A/B belirleyicisi ve plazmadaki antikor örneği. Tablo gerçek nakil kararı değildir; çapraz karşılaştırma ve klinik koşullar gerekir.",
  alt: "Dört satırlı tablo: A grubunda eritrositte A, plazmada anti-B; B grubunda B ve anti-A; AB'de A ve B, olağan tabloda antikor yok; 0'da belirleyici yok, anti-A ve anti-B var.",
  headers: ["Grup", "Eritrositte", "Plazmada"],
  rows: [
    ["A", "A", "anti-B"],
    ["B", "B", "anti-A"],
    ["AB", "A ve B", "olağan tabloda\nyok"],
    ["0", "A ve B yok", "anti-A ve\nanti-B"],
  ],
  readout: ["Eritrosit ürününde vericinin hücresi ile alıcının plazması düşünülür.", "Plazma ürününde bağışlanan antikorun yönü tersinden denetlenir."],
});

const HEMO = [
  { name: "Damar daralması", txt: "Hasarlı damarın yerel daralması kan kaybını sınırlar." },
  { name: "Trombosit tıkacı", txt: "Trombositler tutunur, etkinleşir ve kümelenerek ilk tıkacı kurar." },
  { name: "Trombin oluşumu", txt: "Pıhtılaşma faktörleri sırayla etkinleşir; kalsiyum birçok basamakta gerekir." },
  { name: "Fibrin ağı", txt: "Trombin çözünür fibrinojeni fibrine çevirir; ağ tıkacı sağlamlaştırır." },
];
const hemostasis = mk({
  caption:
    "Kan kaybını sınırlayan basamaklar (nitel sıra şeması, süre ölçümü değil): damar daralması, trombosit tıkacı, faktör zinciriyle trombin, fibrinojenden fibrin ağı. Trombosit kümelenmesi ABO aglütinasyonuyla aynı olay değildir.",
  alt: "Yukarıdan aşağı dört kutu: damar daralması, trombosit tıkacı, trombin oluşumu, fibrin ağı. Seçili adımın kutusu vurgulu.",
  h: 300,
  steps: HEMO.map((h) => h.name),
  draw: (_v, step) => {
    const c = chain(
      HEMO.map((h, i) => ({ label: h.name, tone: i === step ? ("a" as const) : i < step ? ("ink" as const) : ("muted" as const), fill: i === step ? ("a" as const) : undefined, bold: i === step })),
      { cx: 150, w: 240, gap: 28 },
    );
    const els = [...c.els, T(300, 120, "fibrinojen", "e", { tone: step >= 3 ? "b" : "muted" }), A(380, 140, 380, 200, step >= 3 ? "b" : "muted"), T(300, 222, "fibrin", "e", { tone: step >= 3 ? "b" : "muted", bold: step >= 3 })];
    return { els, readout: [`${step + 1}. ${HEMO[step].txt}`, "Trombosit eksikliği, faktör bozukluğu ve damar sorunu farklı mekanizmalardır."] };
  },
});

const epo = mk({
  caption:
    "Kan yapımı ve geri dönüşüm (nitel döngü şeması): oksijen yetersizliğine yanıtla başlıca böbrekten eritropoietin verilir, kırmızı kemik iliğinde eritrosit üretimi desteklenir. Eritrosit ömrü için yaklaşık 120 gün öğretim değeridir; yaşlı hücreler dalak ve karaciğerde işlenir, demir geri kazanılabilir, hem yıkımı bilirubin yoluna katılır.",
  alt: "Yukarıdan aşağı akış: oksijen yetersizliği, böbrek EPO, kemik iliği üretimi, dolaşımda yaklaşık 120 gün, dalak ve karaciğerde yıkım. Yıkımdan demir geri kazanımı oku kemik iliğine döner, ayrıca bilirubin kutusu.",
  h: 420,
  draw: () => {
    const c = chain(
      [
        { label: "Oksijen yetersizliği", tone: "warn" },
        { label: "Böbrek: EPO", tone: "c", fill: "c" },
        { label: "Kemik iliği: üretim", tone: "a", fill: "a" },
        { label: "Dolaşım: ≈ 120 gün" },
        { label: "Dalak, karaciğer: yıkım", tone: "b" },
      ],
      { cx: 170, w: 290, gap: 30 },
    );
    const els = [...c.els];
    els.push(S([[315, 334], [420, 300], [440, 230], [420, 180], [320, 168]], { open: true, dash: true, tone: "a" }), A(334, 168, 318, 168, "a"));
    els.push(T(340, 260, "demir", "e", { tone: "a", bold: true }));
    els.push(...B(170, 384, "hem → bilirubin", { tone: "muted" }), A(170, 350, 170, 360, "muted"));
    return { els: els, readout: ["Eritrositlerin hepsi aynı gün parçalanmaz; 120 gün ortalama öğretim değeridir.", "Sayı, hacim ve hemoglobin ayrı ölçütlerdir."] };
  },
});

/* ---------------- Lenf sistemi ---------------- */

const capillary = mk({
  caption:
    "Başlangıç lenf damarı ve kapaklar (nitel şema, ölçekli değil): kör başlangıçlı kılcalın üst üste binen endotel kenarları doku tarafındaki uygun basınçla sıvı girişine izin verir. Toplayıcı damardaki kapaklar geri akımı sınırlar; kas hareketleri ve solunum basınçları akımı destekler, kapaklar akımı yoktan üretmez.",
  alt: "Solda kapalı uçlu lenf kılcalı, duvarında kanat gibi açılan endotel kenarları ve içe giren küçük oklar. Sağa doğru genişleyen toplayıcı damar içinde iki V biçimli kapak ve tek yön oku.",
  h: 250,
  draw: () => {
    const els: El[] = [
      S([[60, 80], [40, 125], [60, 170], [240, 170], [240, 80]], { open: true, bold: true, tone: "b" }),
      L(240, 80, 320, 60, { bold: true, tone: "b" }),
      L(240, 170, 320, 190, { bold: true, tone: "b" }),
      L(320, 60, 512, 60, { bold: true, tone: "b" }),
      L(320, 190, 512, 190, { bold: true, tone: "b" }),
    ];
    for (const x of [90, 150, 210]) {
      els.push(L(x, 80, x + 18, 98, { tone: "b" }), L(x, 170, x + 18, 152, { tone: "b" }));
      els.push(A(x + 6, 36, x + 10, 74, "c"));
    }
    for (const x of [380, 460]) els.push(L(x, 60, x + 30, 125, { tone: "ink" }), L(x, 190, x + 30, 125, { tone: "ink" }));
    els.push(A(330, 125, 372, 125, "a", { bold: true }));
    els.push(T(40, 22, "doku sıvısı girer", "e", { tone: "c" }));
    els.push(T(130, 215, "üst üste binen kenarlar", "c", { tone: "b" }), T(430, 215, "kapaklar", "c", { tone: "ink", bold: true }));
    return { els, readout: ["Giriş yalnız tek tek difüzyon değildir; basınca bağlı toplu akım önemlidir.", "Protein ve hücreler de bu yoldan doku aralığından ayrılabilir."] };
  },
});

const ducts = mk({
  caption:
    "Sağ lenf kanalı ve göğüs kanalı (şematik beden haritası, ölçekli değil; önden bakış, bedenin sağı izleyenin solunda): sağ kol, baş-boynun sağı ve sağ üst göğüs sağ lenf kanalıyla sağ venöz köşeye; geri kalan bölgeler, sağ bacak dahil, göğüs kanalıyla sol venöz köşeye döner.",
  alt: "Önden beden silueti. İzleyenin solundaki sağ kol, baş-boynun sağ yarısı ve sağ üst göğüs koyu tonla taranmış ve sağ lenf kanalı yazılı. Geri kalan beden açık tonla göğüs kanalı yazılı. Sağ venöz köşe ve sol venöz köşe işaretli.",
  h: 380,
  draw: () => {
    const mid = 200;
    const els: El[] = [
      // açık ton: göğüs kanalı bölgeleri
      S([[mid, 40], [mid + 34, 50], [mid + 34, 95], [mid + 30, 112], [mid + 80, 125], [mid + 110, 250], [mid + 90, 255], [mid + 62, 160], [mid + 60, 230], [mid + 50, 360], [mid + 10, 360], [mid, 250], [mid - 10, 360], [mid - 50, 360], [mid - 60, 230], [mid - 62, 200], [mid, 200]], { tone: "b", fill: "b" }),
      // koyu ton: sağ üst bölge (izleyenin solu)
      S([[mid, 40], [mid - 34, 50], [mid - 34, 95], [mid - 30, 112], [mid - 80, 125], [mid - 110, 250], [mid - 90, 255], [mid - 62, 160], [mid - 62, 200], [mid, 200]], { tone: "a", fill: "a", bold: true }),
      L(mid, 40, mid, 360, { dash: true, tone: "muted" }),
    ];
    els.push(C(mid - 26, 118, 6, { tone: "a", fill: "a" }), C(mid + 26, 118, 6, { tone: "b", fill: "b" }));
    els.push(...lead(mid - 26, 118, 30, 20, "sağ venöz köşe", "a", true, "e"));
    els.push(...lead(mid + 26, 118, 330, 80, "sol venöz köşe", "b", true));
    els.push(T(316, 170, "göğüs kanalı:", "e", { tone: "b", bold: true }), T(316, 200, "bacaklar ve", "e", { tone: "b" }), T(316, 228, "alt gövde,", "e", { tone: "b" }), T(316, 256, "bağırsak, sol üst", "e", { tone: "b" }));
    els.push(T(20, 300, "sağ lenf kanalı:", "e", { tone: "a", bold: true }), T(20, 330, "sağ üst bölüm", "e", { tone: "a" }));
    return { els, readout: ["Sağ bacak sağ lenf kanalına değil, göğüs kanalı sistemine katılır.", "Haritada bölgeyi ve hedef venöz birleşimi birlikte göster."] };
  },
});

const fluid = mk({
  caption:
    "Bir zaman aralığında açık sıvı bilançosu (bölümdeki oyuncak bütçe): başlangıç 10 mL, net giriş 5 mL, lenfle çıkış 3 mL ise son hacim 12 mL; yol tamamen kapalıysa çıkış 0, son hacim 15 mL. Net giriş doğrudan kan dönüşü düşülmüş değerdir; yeniden çıkarılmaz.",
  alt: "Dört yatay çubuk: başlangıç, net giriş, lenfle çıkış ve son hacim. İki adım: açık yol ve kapalı yol.",
  h: 220,
  steps: ["Lenf yolu açık", "Lenf yolu kapalı"],
  draw: (_v, step) => {
    const out = step === 0 ? 3 : 0;
    const end = 10 + 5 - out;
    const b = bars(
      [
        { label: "Başlangıç", value: 10, text: "10 mL", tone: "muted" },
        { label: "Net giriş", value: 5, text: "+5 mL", tone: "warn" },
        { label: "Lenfle çıkış", value: out, text: `−${out} mL`, tone: "b" },
        { label: "Son hacim", value: end, text: `${end} mL`, tone: "a" },
      ],
      { max: 15 },
    );
    return { els: b.els, readout: [`10 + 5 − ${out} = ${end} mL.`, "Gerçek çıkış mevcut sıvıdan fazla olamaz; bu sayılar kişide normal doku hacmi değildir."] };
  },
});

const organs = tableFig({
  caption:
    "Düğüm lenfi, dalak kanı inceler (bölüm metninden): lenfoid yapıların ve damar genişlemesinin adlarını görevle eşleştir. Düğüm büyümesi tek bir hastalık anlamına gelmez.",
  alt: "Beş satırlı tablo: lenf düğümü lenfle gelen maddeleri inceler; dalak dolaşan kanı süzer; timus T hücresi olgunlaşması; bademcik mukozal savunma; sisterna şili damar genişlemesi, düğüm değil.",
  headers: ["Yapı", "Görev ya da tür"],
  rows: [
    ["Lenf düğümü", "lenfle gelen maddeler"],
    ["Dalak", "dolaşan kanı süzer"],
    ["Timus", "T hücresi olgunlaşması"],
    ["Bademcik", "mukozal savunma"],
    ["Sisterna şili", "damar genişlemesi"],
  ],
  readout: ["Adların hepsini aynı lenf bezi torbasına koyma.", "Timus birincil lenfoid organdır; düğüm kümesi değildir."],
});

export const biologyFigures061Circulation: Record<string, Record<string, FigureDef>> = {
  "dolasim-damarlar-starling": {
    "Damarın adı yönü anlatır": direction,
    "Tek damar alanı ve toplam alan farklıdır": area,
    "Klasik Starling modelinin iki karşı etkisi": starling,
    "Birikimi giriş ve çıkışla hesapla": balance,
  },
  "dolasim-kan-doku": {
    "Plazma, serum ve hematokrit": tube,
    "Kan yapımı, EPO ve geri dönüşüm": epo,
    "Pıhtılaşma zinciri ve fibrin ağı": hemostasis,
    "A, B, AB ve 0 grubunu iki bölmede oku": abo,
  },
  "lenf-sistemi": {
    "Başlangıç damarı ve tek yönlü kapılar": capillary,
    "Sağ üst bölümün kısa büyük kanalı": ducts,
    "Düğüm lenfi, dalak kanı inceler": organs,
    "Bir zaman aralığında açık sıvı bilançosu": fluid,
  },
};
