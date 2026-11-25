import { poly, seg, txt, v, type El, type FigureDef } from "./figureKit";
import { argFig, flowFig, rowsFig, tableFig } from "./turkishFigures060Kit";

/*
 * Forge061 TYT Felsefe · sanat felsefesi, felsefi okuma ve yazma, felsefeyi
 * tanıma. Ad, görüş ve örnekler yalnız bölüm metninden alınır; tablolar
 * görüşleri karşılaştırır, hiçbirini benimsetmez. Şemalar ölçekli değildir.
 */

// sanat-felsefesi · 2 · Üretim, yapı, alımlama.
const artTriad = rowsFig({
  caption:
    "Sanatçı, eser ve izleyici ilişkilidir ama birbirinin yerine geçmez. Bir satıra tıkla: yorumda o katmanın nasıl kanıt olacağı açılır.",
  alt: "Üç satır: sanatçı, belirli malzeme ve tekniklerle eser ortaya koyar, üretim niyeti; eser, biçim, içerik ve düzen; izleyici, belirli bağlamda karşılaşır ve yorumlar, alımlama.",
  rows: [
    { head: "Sanatçı: üretim niyeti", text: "malzeme ve tekniklerle eser ortaya koyar", tone: "b", detail: ["Ne anlatmak istediğini bilmek değerlidir; eserde hangi ayrıntının desteklediği de gösterilmelidir."] },
    { head: "Eser: yapı", text: "biçim, içerik ve düzen", tone: "c", detail: ["Gözlediğin biçimsel ayrıntı yorumun dayanağıdır."] },
    { head: "İzleyici: alımlama", text: "bağlam içinde karşılaşır ve yorumlar", tone: "a", detail: ["Kişisel çağrışım eserin tek zorunlu anlamı değildir."] },
  ],
  foot: "Biçimsel ayrıntıyı, tarihsel bilgiyi ve kendi çağrışımını açıkça ayır.",
});

// sanat-felsefesi · 4 · Sanat yaklaşımları.
const approaches = tableFig({
  caption:
    "Sanatı açıklayan yaklaşımlar: her biri farklı bir ilişkiyi öne çıkarır. Bir yaklaşıma tıkla: vurgusu ve karıştırılmaması gereken nokta açılır. Aynı eser birden çok açıdan tartışılabilir.",
  alt: "Beş satırlı tablo. Taklit, Platon: duyusal nesnenin görünüşünün yeniden temsili, hakikate uzaklık sorusu. Taklit, Aristoteles: taklitle öğrenme ve olabilecek eylemleri düzenleme. Yaratım: doğadakini seçip dönüştürerek özgün düzen. İfade, Croce: sezgisel yaşantının ifadeye kavuşması. Oyun, Schiller: duyusal ve akıl yönlerinin özgür etkinlikte uyumu.",
  cols: [
    { name: "Yaklaşım", w: 2.8 },
    { name: "Bölümde anılan", w: 2.4 },
    { name: "Vurgu", w: 4.8 },
  ],
  rows: [
    { cells: ["taklit", "Platon", "görünüşün yeniden temsili; hakikate ne kadar yaklaştırır?"], tones: [undefined, "muted", "b"], detail: ["Duyusal nesne ile resmi aynı varlık düzeyinde değildir.", "Temel mesele resimde kaç renk bulunduğu değildir."] },
    { cells: ["taklit", "Aristoteles", "taklitle öğrenme; olabilecek eylemleri düzenleme"], tones: [undefined, "muted", "b"], detail: ["Temsil edilgin kopyadan daha kapsamlı bir kurma etkinliğidir.", "İkisinin de taklit kavramını kullanması görüşlerinin aynı olduğunu göstermez."] },
    { cells: ["yaratım", "genel yaklaşım", "doğadakini seçip dönüştürerek özgün düzen"], tones: [undefined, "muted", "c"], detail: ["Sanatçı hazır bulunanı yalnız tekrar etmez."] },
    { cells: ["ifade", "Croce", "sezgisel yaşantının ifadeye kavuşması"], tones: [undefined, "muted", "c"], detail: ["Bu, aklına gelen her şeyi düşünmeden bırakmak demek değildir."] },
    { cells: ["oyun", "Schiller", "duyusal ve akıl yönlerinin özgür etkinlikte ilişkisi"], tones: [undefined, "muted", "a"], detail: ["Oyun burada zaman geçirmek ya da rekabet değildir.", "Satış fiyatı ya da pratik yarar oyun yaklaşımının kendisi değildir."] },
  ],
  foot: "Yalnız eserin güzel olduğunun söylenmesi taklit için yeterli kanıt değildir.",
});

// sanat-felsefesi · 10 · Güzelliğin kaynağı.
const beauty = tableFig({
  caption:
    "Düşünür adı ezberlemek yerine güzelliğin kaynağını sor. Bir düşünüre tıkla: açıklaması ve sık yapılan aşırı okuma açılır. Aynı “güzel” sözcüğü farklı kuramlarda kullanılır.",
  alt: "Beş satırlı tablo. Platon: değişmeyen ideal olan. Aristoteles: düzen, oran, uygun büyüklük. Plotinos: daha yüksek bir birliğe yöneliş. Kant: çıkar gözetmeyen beğeni, evrensel geçerlilik talebi. Hegel: düşünsel içeriğin duyusal görünüşü.",
  cols: [
    { name: "Düşünür", w: 2.8 },
    { name: "Güzelliğin kaynağı", w: 7.2 },
  ],
  rows: [
    { cells: ["Platon", "değişmeyen ideal olanla ilişki"], tones: [undefined, "b"], detail: ["İdeal örnek öne çıkar."] },
    { cells: ["Aristoteles", "düzen, oran ve uygun büyüklük"], tones: [undefined, "c"], detail: ["Nesnenin düzeni öne çıkar.", "Tek bir simetri örneğinden bütün öğretiyi çıkarma."] },
    { cells: ["Plotinos", "daha yüksek bir birliğe yöneliş"], tones: [undefined, "b"], detail: ["Duyusal güzellik daha yüksek birlikle ilişki içinde açıklanabilir."] },
    { cells: ["Kant", "çıkar gözetmeyen beğeni yargısı"], tones: [undefined, "a"], detail: ["Fiyatı yükselecek diye istemek ile güzel bulmak aynı yargı değildir.", "Evrensel geçerlilik talebi herkesin fiilen aynı oyu vermesi demek değildir."] },
    { cells: ["Hegel", "düşünsel içeriğin duyusal biçimde görünmesi"], tones: [undefined, "a"], detail: ["Taşın heykel, sesin müzik, sözün şiir olarak düzenlenmesi.", "Eseri sanatçının özel duygusuna indirgeyen seçenek bu vurguyu kaçırır."] },
  ],
  foot: "Fiilî uzlaşma ile geçerlilik iddiası farklıdır.",
});

// sanat-felsefesi · 16 · Öznel ve nesnel ölçüt.
const criteria = tableFig({
  caption:
    "Aynı çizim iki ölçütle değerlendirilebilir. Bir yaklaşıma tıkla: ölçütü ve onu doğru saymak için ayrıca neyin savunulması gerektiği açılır.",
  alt: "İki satırlı tablo. Öznelci yaklaşım: beğeni kişiye, yaşantıya ve değerlendirene bağlı; çizim izleyicinin duygusuyla değerlendirilir. Nesnelci yaklaşım: estetik değer eserin özellikleri ve kişiden bağımsız ölçütlerle; çizim oran ve düzeniyle değerlendirilir.",
  cols: [
    { name: "Yaklaşım", w: 2.6 },
    { name: "Ölçüt", w: 4.0 },
    { name: "Aynı çizimde", w: 3.4 },
  ],
  rows: [
    { cells: ["öznelci", "kişi, yaşantı, değerlendiren özne", "izleyicinin duygusu"], tones: [undefined, "b", "muted"], detail: ["Beğenilerin farklı olması gerekçeli tartışma yapılamayacağını tek başına göstermez."] },
    { cells: ["nesnelci", "eserin özellikleri, kişiden bağımsız ölçüt", "oran ve düzen"], tones: [undefined, "c", "muted"], detail: ["Oranın bulunduğu gözlenebilir; bunun bütün eserleri güzel yapmaya yettiği ayrıca savunulmalıdır."] },
  ],
  foot: "Bir görüşün ölçütünü anlamak onu tartışmasız doğru saymak değildir.",
});

// felsefi-okuma-ve-yazma · 3 · Geçerli bir argüman.
const syllogism = argFig({
  caption:
    "Bölümdeki örnek argüman: iki öncül sonuca dayanak olur. İleri ile sonucu ve denetim notunu aç. Bir cümle bir argümanda sonuç, ötekinde öncül olabilir.",
  alt: "Argüman şeması: öncül, bütün öğrenciler kaydoldu; öncül, Ece öğrencidir; öyleyse sonuç, Ece kaydoldu.",
  premises: ["Bütün öğrenciler kaydoldu.", "Ece öğrencidir."],
  conclusion: "Ece kaydoldu.",
  marker: "öyleyse",
  steps: [
    { label: "Öncüller", note: "Öncül, bir sonuca dayanak olarak sunulan yargıdır." },
    { label: "Sonuç", note: "İlk iki yargı sonuca dayanak olur; argüman bu ilişkinin kendisidir." },
    { label: "Denetim", note: "“Çünkü”, “dolayısıyla” işlevi görünür kılar ama her argümanda bulunmaz; okları cümle uzunluğuna göre değil dayanak ilişkisine göre çiz." },
  ],
  foot: "Argüman yalnız sonuç cümlesinin adı değildir.",
});

// felsefi-okuma-ve-yazma · 4 · Örtük öncül.
const hidden = argFig({
  caption:
    "Bölümdeki geçiş: “Bu karar çoğunlukça seçildi; öyleyse mutlaka adildir.” Sonucun zorunlu çıkması için söylenmemiş bir köprü gerekir. İleri ile köprüyü ve denetimini aç.",
  alt: "Argüman şeması: açık öncül, bu karar çoğunlukça seçildi; örtük öncül, bütün çoğunluk kararları adildir, metinde söylenmemiş; sonuç, bu karar mutlaka adildir.",
  premises: ["Bu karar çoğunlukça seçildi.", "(örtük) Bütün çoğunluk kararları adildir."],
  conclusion: "Bu karar mutlaka adildir.",
  marker: "öyleyse",
  conclusionTone: "b",
  steps: [
    { label: "Açık ve örtük", note: "Sağdaki öncül metinde söylenmez; geçişi en makul biçimde tamamlayan dayanak olarak önerilir." },
    { label: "Sonuç", note: "Köprü yazılınca düşüncenin nerede tartışmaya açık olduğu görünür." },
    { label: "Denetim", note: "Bu güçlü köprünün savunulup savunulamayacağı ayrıca incelenir; boşluk tespiti kişiye yönelik yargı değildir." },
  ],
  foot: "Örtük öncül bulmak yazar adına istediğin her varsayımı eklemek değildir.",
});

// felsefi-okuma-ve-yazma · 6 · Denetim sırası.
const checks = flowFig({
  caption:
    "Tutarlılık ve doğruluk ayrı denetimlerdir. İleri ile sırayı aç: önce çelişki, sonra öncüllerin dayanağı, sonra çıkarımın geçerliliği.",
  alt: "Üç kart oklarla alt alta: yargılar arasında çelişki var mı; öncüllerin dayanağı ne; çıkarım geçerli mi.",
  nodes: [
    { head: "Çelişki var mı?", text: "aynı koşulda birbirini dışlayan yargılar", tone: "c", note: "Tutarlı bir görüş yanlış öncüllerden de başlayabilir." },
    { head: "Öncüllerin dayanağı", text: "yargı konusuna ya da doğruluk ölçütüne uygun mu?", tone: "b", note: "Doğru cümleleri yan yana yazmak iyi argüman oluşturmaz." },
    { head: "Çıkarımın geçerliliği", text: "sonuç öncüllerden çıkıyor mu?", tone: "a", note: "Ünlü bir düşünürün görüşü olması bu denetimlere gerek bırakmaz." },
  ],
  steps: ["Çelişki", "Dayanak", "Geçerlilik"],
  reveal: true,
  foot: "Felsefi okuma otoriteyi anlamanın yanında gerekçeyi de inceler.",
});

// felsefi-okuma-ve-yazma · 9 · Yazma planı.
const plan = flowFig({
  caption:
    "Yazma planı problemden çıkar. İleri ile adımları aç. Bu düzen düşünmeyi kolaylaştıran bir plandır, değişmez cümle kalıbı değildir.",
  alt: "Beş kart oklarla alt alta: soru, sınırlı ve açık; sav, tek cümle; gerekçeler, savı destekleyenler; gelişme, gerekçe, örnek ve karşı görüş; sonuç, tartışmadan çıkan cevap.",
  nodes: [
    { head: "Soru", text: "cevaplanacak soruyu sınırlı ve açık yaz", tone: "c", note: "Konuyla ilgili bütün bilgileri sıralamak plan değildir." },
    { head: "Sav", text: "savını bir cümleyle kur", tone: "a", note: "Her paragrafın savla nasıl ilişki kuracağı belirlenir." },
    { head: "Giriş", text: "problem ve yaklaşımı tanıtır", tone: "b", note: "Okur sorudan sonuca giden bağı takip edebilmelidir." },
    { head: "Gelişme", text: "gerekçe, örnek ve karşı görüş", tone: "b", note: "Karşı görüş taslağı geliştirmenin parçasıdır." },
    { head: "Sonuç", text: "tartışmadan çıkan cevabı açıklaştırır", tone: "a", note: "Bu düzen her felsefi metnin değişmez cümle kalıbı değildir." },
  ],
  steps: ["Soru", "Sav", "Giriş", "Gelişme", "Sonuç"],
  reveal: true,
  foot: "Önemli olan sorudan sonuca giden bağın izlenebilmesidir.",
});

// felsefeyi-tanima · 3 · Felsefi soru, olgu sorusu.
const questionKinds = tableFig({
  caption:
    "Soru ekini değil, sorunun açtığı araştırmayı izle. Bir soruya tıkla: istediği cevap türü açılır. Felsefi soruların hepsi “nedir” ile bitmez.",
  alt: "Beş satırlı tablo. Bu resim hangi yılda yapıldı: olgu sorusu, tarih. Bir resmi güzel yapan nedir: felsefi, ölçüt. Doğru bildiğimizden neden emin olalım: felsefi, gerekçe. Aynı kural farklı kişilere nasıl uygulanmalı: felsefi, ölçüt. Bu binanın adı nedir: olgu sorusu, ad.",
  cols: [
    { name: "Soru", w: 5.4 },
    { name: "Tür", w: 1.8 },
    { name: "İstediği", w: 2.8 },
  ],
  rows: [
    { cells: ["Bu resim hangi yılda yapıldı?", "olgu", "bir olayın tarihi"], tones: [undefined, "b", "muted"], detail: ["Belge incelemek yeterli olabilir."] },
    { cells: ["Bir resmi güzel yapan nedir?", "felsefi", "güzellik ölçütü"], tones: [undefined, "c", "muted"], detail: ["Güzellik, beğeni ve sanat kavramlarını tartışmak gerekir."] },
    { cells: ["Doğru bildiğimizden neden emin olalım?", "felsefi", "gerekçe"], tones: [undefined, "c", "muted"], detail: ["Gerekçe ve ölçüt ister."] },
    { cells: ["Aynı kural farklı kişilere nasıl uygulanmalı?", "felsefi", "ölçüt"], tones: [undefined, "c", "muted"], detail: ["Gerekçe ve ölçüt ister."] },
    { cells: ["Bu binanın adı nedir?", "olgu", "bir ad"], tones: [undefined, "b", "muted"], detail: ["“Nedir” kalıbını taşısa da yalnız bir ad öğrenmeyi amaçlayabilir."] },
  ],
  foot: "İki soru aynı resimle ilgili olsa da istedikleri cevap türü farklıdır.",
});

// felsefeyi-tanima · 12 · Refleksiyon.
const reflection = flowFig({
  caption:
    "Refleksiyon: olay hakkında düşünmekten, kullandığın ölçüt hakkında düşünmeye geri dönmek. İleri ile düzeyleri aç.",
  alt: "Üç kart oklarla alt alta: birinci düzey, bu paylaştırma eşit mi; ikinci düzey, eşitliği adalet ölçütü olarak niçin seçtim; aynı işlem okurken, kendi itirazımın hangi öncüle dayandığını sormak.",
  nodes: [
    { head: "Olay hakkında", text: "“Bu paylaştırma eşit mi?”", tone: "c", note: "İlk düzeyde bir sorudur." },
    { head: "Ölçüt hakkında", text: "“Eşitliği adalet ölçütü olarak niçin seçtim?”", tone: "a", note: "Düşüncenin kendi dayanağına yönelir: refleksif düşünme." },
    { head: "Okurken", text: "kendi itirazım hangi öncüle dayanıyor?", tone: "b", note: "Eleştirel tutumun kendisine uygulanmasıdır; anı anlatmak değildir." },
  ],
  steps: ["Olay", "Ölçüt", "Okurken"],
  reveal: true,
  foot: "Refleksiyonda yöntem, varsayım ya da değerlendirme biçimi incelenir.",
});

// felsefeyi-tanima · 17 · Alanlar ve soruları.
const fields = tableFig({
  caption:
    "Felsefenin alanları sorularıyla. Bir alana tıkla: bölümdeki laboratuvar örneğinde o alana giden soru açılır. Alanı olayın geçtiği yer değil, araştırılan sorun belirler.",
  alt: "Yedi satırlı tablo. Varlık: neyin var olduğu ve temeli. Bilgi: bilmenin imkânı ve dayanağı. Ahlak: iyi eylem ve sorumluluk. Sanat: sanat ve estetik değer. Siyaset: ortak yaşamın meşruiyeti. Din: dinin temel kavramları. Bilim: bilimsel bilginin yöntem ve yapısı.",
  cols: [
    { name: "Alan", w: 2.6 },
    { name: "Temel soru", w: 7.4 },
  ],
  rows: [
    { cells: ["varlık", "neyin var olduğu ve temeli"], tones: [undefined, "ink"], detail: ["Varlık felsefesi neyin var olduğunu ve temelini sorar."] },
    { cells: ["bilgi", "bilmenin imkânı ve dayanağı"], tones: [undefined, "ink"], detail: ["Bilgi felsefesi bilmenin imkânını ve dayanağını sorar."] },
    { cells: ["ahlak", "iyi eylem ve sorumluluk"], tones: [undefined, "ink"], detail: ["Laboratuvarda katılımcıya zarar verme sorumluluğu ahlak felsefesine yönelir."] },
    { cells: ["sanat", "sanatın ve estetik değerin ne olduğu"], tones: [undefined, "ink"], detail: ["Sanat felsefesi sanatı ve estetik değeri araştırır."] },
    { cells: ["siyaset", "ortak yaşamın meşruiyeti"], tones: [undefined, "ink"], detail: ["Siyaset felsefesi ortak yaşamın meşruiyetini araştırır."] },
    { cells: ["din", "dinin temel kavramları"], tones: [undefined, "ink"], detail: ["Din felsefesi dinin temel kavramlarını tartışır."] },
    { cells: ["bilim", "bilimsel bilginin yöntem ve yapısı"], tones: [undefined, "ink"], detail: ["Laboratuvarda deneyin nasıl açıklama sağladığı bilim felsefesine yönelir."] },
  ],
  foot: "Laboratuvar sözcüğünü görünce her soruyu otomatik bilim felsefesi sayma.",
});

const twoDistributionRules: FigureDef = {
  caption: "Dört birim payı iki ilkeye göre dağıt. Eşit miktarda her kişi iki birim alır. Varsayılan ihtiyaca göre pay verince kimin ne kadar aldığı değişebilir. Felsefi soru, hangi ilke için hangi gerekçenin kullanılacağıdır.",
  alt: "Aynı ölçekte dört sütun. Solda eşit pay A ve B için 2 ve 2. Sağda varsayılan ihtiyaç başlangıçta A için 1, B için 3. Sürgü sağdaki varsayımı değiştirir.",
  param: { label: "A’nın varsayılan ihtiyacı (birim)", min: 1, max: 3, step: 1, init: 1 },
  draw: (needA) => {
    const total = 4, needB = total - needA;
    const bars = [
      { label: "A", x: 1.3, value: total / 2, tone: "a" },
      { label: "B", x: 2.8, value: total / 2, tone: "b" },
      { label: "A", x: 5.0, value: needA, tone: "a" },
      { label: "B", x: 6.5, value: needB, tone: "b" },
    ] as const;
    const els: El[] = [
      seg(v(0, 0), v(7.55, 0), { tone: "ink" }),
      seg(v(0, 0), v(0, 3.8), { tone: "ink" }),
      txt(v(0, 3.95), "Pay (birim)", "e", { small: true, bold: true }),
      txt(v(2.05, -0.72), "Eşit miktar", "s", { small: true, bold: true }),
      txt(v(5.75, -0.72), "Varsayılan ihtiyaç", "s", { small: true, bold: true }),
      ...[1, 2, 3].flatMap((tick) => [
        txt(v(-0.16, tick), String(tick), "w", { small: true }),
        seg(v(0, tick), v(7.55, tick), { tone: "muted", thin: true, dash: true }),
      ]),
      txt(v(-0.75, 4.4), "", "c"),
      txt(v(7.95, -1.5), "", "c"),
    ];
    for (const {label, x, value, tone} of bars) {
      els.push(poly([v(x - 0.4, 0), v(x + 0.4, 0), v(x + 0.4, value), v(x - 0.4, value)], { tone, fill: tone, thin: true }));
      els.push(txt(v(x, value + 0.1), String(value), "n", { small: true, bold: true }));
      els.push(txt(v(x, -0.12), label, "s", { small: true }));
    }
    return { els, readout: [
      `Eşit miktar: A ${total / 2}, B ${total / 2} birim. Varsayılan ihtiyaç: A ${needA}, B ${needB} birim.`,
      "Toplam iki dağıtımda da 4 birim. Adalet yargısı için pay ölçütünü gerekçelendir.",
    ] };
  },
};

export const philosophyFigures061Intro: Record<string, Record<string, FigureDef>> = {
  "sanat-felsefesi": {
    "Sanatçı, eser ve izleyici": artTriad,
    "Taklit yaklaşımının temel sorusu": approaches,
    "Güzelliğin düşünürlere göre açıklanması": beauty,
    "Öznel ve nesnel güzellik ölçütleri": criteria,
  },
  "felsefi-okuma-ve-yazma": {
    "Argüman öncül ve sonuç ilişkisidir": syllogism,
    "Örtük öncülü görünür kıl": hidden,
    "Tutarlılık ve doğruluğu ayrı denetle": checks,
    "Yazma planını problemden çıkar": plan,
  },
  "felsefeyi-tanima": {
    "Aynı toplamı iki dağıtım ilkesiyle karşılaştır": twoDistributionRules,
    "Felsefi soru ile olgu sorusunu ayır": questionKinds,
    "Refleksiyon: kendi düşüncene geri dön": reflection,
    "Felsefenin alanlarını sorularıyla tanı": fields,
  },
};
