import type { FigureDef } from "./figureKit";
import { ladderFig, rowsFig, tableFig, treeFig } from "./turkishFigures060Kit";
import { nestFig } from "./turkishFigures061Kit";

/*
 * Forge061 TYT Türkçe · anlam: deyimler ve atasözleri, cümlede anlam,
 * sözcükte anlam. Örnek sözler yalnız ilgili dersin bölüm metninden alınır;
 * sınıflama bölümlerin izlediği okul konvansiyonudur. Şemalar ölçekli
 * değildir.
 */

// deyimler-ve-atasozleri · 7 · Tür merdiveni.
const kindLadder = ladderFig({
  caption:
    "Tür kararı sözcük sayısına, noktaya ya da fiil çekimine değil, kalıbın yerleşik işlevine dayanır. İleri ile bölümdeki sözleri merdivende yürüt. Söyleyeni bilinen özlü söz ayrı ele alınır.",
  alt: "Üç basamaklı karar merdiveni. Söyleyeni bilinen özlü bir yargı mı, evet ise özdeyiş. Farklı durumlar için genel ilişki ya da öğüt mü, evet ise atasözü. Belirli bir durumu mu adlandırıyor, evet ise deyim. Hayır ise yerleşik kalıp değil, sıradan öneri.",
  rungs: [
    { q: "Söyleyeni bilinen özlü bir yargı mı?", yes: "özdeyiş (vecize)", tone: "b" },
    { q: "Farklı durumlara uygulanan genel ilişki ya da öğüt mü?", yes: "atasözü", tone: "c" },
    { q: "Belirli bir durumu ya da sonucu mu adlandırıyor?", yes: "deyim", tone: "a" },
  ],
  last: "Yerleşik kalıp değil: sıradan öneri",
  walks: [
    { step: "Damla", example: "“Damlaya damlaya göl olur.”", stop: 1, why: "Küçük katkıların zamanla birikerek büyümesini anlatan genel yargı." },
    { step: "Yorgan", example: "“Ayağını yorganına göre uzat.”", stop: 1, why: "Harcamayı imkâna göre düzenleme öğüdü; yerleşik genel yargı." },
    { step: "Üsküdar", example: "“Atı alan Üsküdar’ı geçti.”", stop: 2, why: "Cümle biçimli bir deyim: fırsatın kaçtığını anlatır; yargı taşıması onu atasözü yapmaz." },
    { step: "Dili tutuldu", example: "“Dili tutuldu.”", stop: 2, why: "Korku veya şaşkınlıkla konuşamaz duruma gelmeyi adlandırır." },
    { step: "Yedekle", example: "“Bugün dosyanı yedekle.”", stop: 3, why: "Anlaşılır bir öneri; toplumda yerleşmiş bir atasözü değildir." },
  ],
  foot: "Bir sözü ünlü biri de söylemiş diye ilk onun kurduğunu varsayma.",
});

// deyimler-ve-atasozleri · 8 · Sonuç sütunu.
const idiomResults = tableFig({
  caption:
    "Yakın deyimleri ortak sözcüğe göre değil, sonuç sütununa göre ayır. Bir deyime tıkla: bölümdeki cümle ve karıştırıldığı deyim açılır.",
  alt: "Dört satırlı tablo. Gözden düşmek: kişinin itibarını kaybetmesi. Gözden kaçmak: ayrıntının fark edilmemesi. Eli ayağına dolaşmak: ne yapacağını şaşırmak. Dili tutulmak: konuşamaz duruma gelmek.",
  cols: [
    { name: "Deyim", w: 3.2 },
    { name: "Değişen şey", w: 3.0 },
    { name: "Bölümdeki cümle", w: 3.8 },
  ],
  rows: [
    { cells: ["gözden düşmek", "saygınlık, itibar", "Verdiği sözü tutmayınca ekip arkadaşlarının gözünden düştü."], tones: [undefined, "a", "muted"], detail: ["Kişinin önceki değerini veya itibarını kaybetmesi.", "Gözden kaçmak ile ortak “göz” sözcüğü karar ölçütü değildir."] },
    { cells: ["gözden kaçmak", "fark edilme", "Raporun son satırındaki yanlış gözden kaçtı."], tones: [undefined, "c", "muted"], detail: ["Bir ayrıntının fark edilmemesi."] },
    { cells: ["eli ayağına dolaşmak", "davranışların karışması", "Telaşlanınca eli ayağına dolaştı."], tones: [undefined, "b", "muted"], detail: ["Kişinin ne yapacağını şaşırması."] },
    { cells: ["dili tutulmak", "konuşamama", "Dili tutuldu."], tones: [undefined, "b", "muted"], detail: ["Korku veya şaşkınlıkla konuşamaz duruma gelme.", "Korkmuş ama konuşmaya devam eden kişi için uygun değildir."] },
  ],
  foot: "Yanlış karşılığın hangi öteki deyime ait olduğunu da belirt.",
});

// deyimler-ve-atasozleri · 10 · Olaydan atasözüne.
const proverbMatch = tableFig({
  caption:
    "Atasözü seçerken olayın temel ilişkisini bir cümleye indir. Bir ilişkiye tıkla: eşleşen atasözü ve neden “çok çalıştı” demenin yetmediği açılır.",
  alt: "Üç satırlı tablo. Düzenli küçük birikim: her gün beş sayfa okudu, sonunda uzun kitabı bitirdi; Damlaya damlaya göl olur. İmkânı aşan harcama: Ayağını yorganına göre uzat. Aceleden doğan hata: Acele işe şeytan karışır.",
  cols: [
    { name: "Temel ilişki", w: 3.2 },
    { name: "Atasözü", w: 3.4 },
    { name: "Ayırt edici yön", w: 3.4 },
  ],
  rows: [
    { cells: ["düzenli küçük birikim", "Damlaya damlaya göl olur.", "küçük katkılar zamanla büyür"], tones: [undefined, "c", "muted"], detail: ["“Her gün beş sayfa okudu, sonunda uzun kitabı bitirdi.” bu ilişkiye uyar.", "Yalnız “çok çalıştı” demek birikim yönünü açıklamaz; tek seferlik büyük kazanç aynı örgü değildir."] },
    { cells: ["imkânı aşan harcama", "Ayağını yorganına göre uzat.", "harcamayı imkâna göre düzenle"], tones: [undefined, "c", "muted"], detail: ["Örtünün fiziksel uzunluğu günlük ekonomik davranışa taşınmıştır."] },
    { cells: ["aceleden doğan hata", "Acele işe şeytan karışır.", "acele davranış hataya yol açabilir"], tones: [undefined, "c", "muted"], detail: ["Mecazlı bir genel yargıdır; içinde gerçek varlık adları geçmesi iletiyi gerçek anlamlı yapmaz."] },
  ],
  foot: "Tutumluluk anlatan örneği sırf para sözcüğü geçti diye başka bir örneğe çevirme.",
});

// deyimler-ve-atasozleri · 6 · Çekim uyarlaması ile kalıbı bozmak.
const idiomForms = rowsFig({
  caption:
    "Deyimin fiili cümleye göre çekimlenir; kalıbın sözcükleri ise rastgele değiştirilemez. Bir satıra tıkla: aynı deyim mi, bozulmuş kalıp mı açılır.",
  alt: "Dört satır: gözden düştü, gözümden düştü ve gözden düşmüş aynı deyimi taşır; göz kulak olmak yerine göz işitme organı olmak aynı sözü vermez.",
  rows: [
    { head: "gözden düştü", text: "çekimli fiil, aynı deyim", tone: "c", detail: ["Sözlükte mastar verilmesi cümledeki “düştü”nün mastar olduğu anlamına gelmez."] },
    { head: "gözümden düştü", text: "ilgili kişinin bakışı değişti, aynı deyim", tone: "c", detail: ["Kişi ve ilgili kişinin bakışı değişebilir."] },
    { head: "gözden düşmüş", text: "zaman değişti, aynı deyim", tone: "c", detail: ["Uygun bağlamda aynı temel deyimi taşır."] },
    { head: "göz işitme organı olmak", text: "“göz kulak olmak” bozuldu", tone: "warn", detail: ["Kalıbın sözcüklerini eş anlamlılarla değiştirmek aynı yerleşik sözü vermez."] },
  ],
  foot: "Çekim uyarlamasıyla sözlük kalıbını bozmayı ayır.",
});

// cumlede-anlam · 2 · İlişki ve gerçekleşme.
const relations = tableFig({
  caption:
    "Bölümdeki cümlelerde iki yargı arasındaki ilişki ve gerçekleşme bilgisi. Bir cümleye tıkla: ilişkinin kanıtı ve cümlenin söylemediği açılır. Amaç bir hedeftir, başarı haberi değildir.",
  alt: "Altı satırlı tablo. Otobüs arızalandığı için yolcular bekledi: neden-sonuç, iki olay gerçekleşmiş. Kaydı bulmak için arşive gitti: amaç, buldu mu belirsiz. Bulduğu için sevindi: neden, bulma gerçekleşmiş. Bilet bulursa geziye katılacak: koşul, ikisi de belirsiz. Çok çalıştı ama işi bitiremedi: karşıtlık. Saat çaldı, pencere açıldı: yalnız zaman sırası.",
  cols: [
    { name: "Cümle", w: 4.2 },
    { name: "İlişki", w: 2.8 },
    { name: "Gerçekleşme", w: 3.0 },
  ],
  rows: [
    { cells: ["Otobüs arızalandığı için yolcular bekledi.", "neden-sonuç", "arıza ve bekleme oldu"], tones: [undefined, "b", "c"], detail: ["Neden oku arızadan beklemeye gider; “Yolcular bekledi çünkü otobüs arızalandı.” aynı nedenin sonradan söylenmesidir."] },
    { cells: ["Kaydı bulmak için arşive gitti.", "amaç", "gitti; bulduğu belirsiz"], tones: [undefined, "a", "warn"], detail: ["Kaydı bulduğunu tek başına kesin söylemez; sonraki cümle “Aradığı kaydı orada buldu.” derse başarı ayrıca doğrulanır."] },
    { cells: ["bulduğu için sevindi", "neden", "bulma gerçekleşti"], tones: [undefined, "b", "c"], detail: ["“İçin” burada gerçekleşmiş bulmayı neden yapar."] },
    { cells: ["Bilet bulursa geziye katılacak.", "koşul", "ikisi de doğrulanmadı"], tones: [undefined, "muted", "warn"], detail: ["Ne biletin bulunduğunu ne katılmanın gerçekleştiğini bildirir."] },
    { cells: ["Çok çalıştı ama işi bitiremedi.", "karşıtlık", "beklenti bozuldu"], tones: [undefined, "c", "muted"], detail: ["İkinci yargı çalışmanın işi bitirmeye götürmesi beklentisini bozar."] },
    { cells: ["Saat çaldı, pencere açıldı.", "zaman sırası", "neden kesinleşmez"], tones: [undefined, "muted", "warn"], detail: ["Art arda gerçekleşme tek başına neden kanıtı olmaz; gizli neden ekleme."] },
  ],
  foot: "Eke ya da sözcüğe baktıktan sonra yargıların ilişkisini mutlaka denetle.",
});

// cumlede-anlam · 9 · Varsayım, ön yargı, tahmin, saptama.
const stances = ladderFig({
  caption:
    "Etiketi tek bir sözcüğün görünmesine bağlama; kişinin neye dayandığını oku. İleri ile bölümdeki örnekleri merdivende yürüt.",
  alt: "Dört basamaklı karar merdiveni. Durum düşünmek için geçici olarak kabul mü ediliyor, evet ise varsayım. İnceleme olmadan peşin hüküm mü veriliyor, evet ise ön yargı. Gözlem ve ipucundan fikir mi yürütülüyor, evet ise tahmin. Bir durum belirlenip ortaya mı konuyor, evet ise saptama. Hayır ise başka işlev.",
  rungs: [
    { q: "Durum düşünmek için geçici olarak kabul mü ediliyor?", yes: "varsayım", tone: "b" },
    { q: "İnceleme olmadan peşin hüküm mü veriliyor?", yes: "ön yargı", tone: "warn" },
    { q: "Gözlem ya da ipucundan fikir mi yürütülüyor?", yes: "tahmin", tone: "c" },
    { q: "Bir durum belirlenip ortaya mı konuyor?", yes: "saptama", tone: "a" },
  ],
  last: "Başka işlev: bağlamı yeniden oku",
  walks: [
    { step: "Diyelim ki", example: "“Diyelim ki otobüsü kaçırdın; başka nasıl gidersin?”", stop: 0, why: "Otobüsün gerçekten kaçtığını haber vermez." },
    { step: "Kitap", example: "“Kitabı açmadım ama kesin kötü.”", stop: 1, why: "Bağlam peşin değerlendirmeyi açıkça gösterir." },
    { step: "Bulutlar", example: "Kararan bulutlara bakıp yağışı öngörmek", stop: 2, why: "Gözlemden hareketle bir durumun nasıl olacağı hakkında fikir yürütülür." },
    { step: "Liste", example: "“Listede üç isim eksik.”", stop: 3, why: "Bir tespittir; doğruluğu listeyle ayrıca denetlenebilir." },
  ],
  foot: "Tahmin ile olasılık bazı örneklerde birlikte bulunabilir; kutular her zaman birbirini dışlamaz.",
});

// cumlede-anlam · 10 · Öznel ve nesnel.
const subjective = tableFig({
  caption:
    "Öznel yargı kişisel beğeni taşır; nesnel türdeki yargı beğeniye dayanmadan denetlenebilir. Bir cümleye tıkla: denetleme yolu açılır. Nesnel tür, doğrulanmış demek değildir.",
  alt: "Üç satırlı tablo. Bu öykünün sonu çok etkileyici: öznel. Öykü üç bölümden oluşuyor: nesnel tür, bölümler sayılarak denetlenir. Üç bölümlük bu öykü çok etkileyici: ikisi birlikte.",
  cols: [
    { name: "Cümle", w: 4.8 },
    { name: "Tür", w: 2.2 },
    { name: "Denetim", w: 3.0 },
  ],
  rows: [
    { cells: ["Bu öykünün sonu çok etkileyici.", "öznel", "kişisel değerlendirme"], tones: [undefined, "b", "muted"], detail: ["Herkesçe aynı biçimde ölçülmek zorunda değildir."] },
    { cells: ["Öykü üç bölümden oluşuyor.", "nesnel tür", "bölümler sayılır"], tones: [undefined, "c", "muted"], detail: ["Yanlış söylenmiş olabilir; yine de sayı kişisel zevk konusu değildir."] },
    { cells: ["Üç bölümlük bu öykü çok etkileyici.", "ikisi birlikte", "iki katkıyı ayır"], tones: [undefined, "a", "muted"], detail: ["Yalnız rakam bulunduğu için bütün cümleyi nesnel sayma."] },
  ],
  foot: "Genel kanı veya çoğunluğun beğenisi nesnelliğin ölçütü değildir.",
});

// cumlede-anlam · 15 · Duygu ve tutum.
const feelings = tableFig({
  caption:
    "Aynı “keşke” farklı tutumlara gidebilir; ayrımı yapılan ya da yapılamayan davranış kurar. Bir cümleye tıkla: kanıt açılır. Tablo bölümlerdeki örnek cümlelerle sınırlıdır.",
  alt: "Beş satırlı tablo. Keşke ona o kırıcı sözü söylemeseydim: pişmanlık, yapılan iş. Keşke gençken yüzme öğrenseydim: hayıflanma, kaçan fırsat. Keşke bütün ekip gelebilse: dilek. Bunca zaman bir kez bile aramadın: sitem. Otobüsler yine çok geç geliyor: yakınma.",
  cols: [
    { name: "Cümle", w: 4.8 },
    { name: "Tutum", w: 2.5 },
    { name: "Kanıt", w: 2.7 },
  ],
  rows: [
    { cells: ["Keşke ona o kırıcı sözü söylemeseydim.", "pişmanlık", "yapılan söz"], tones: [undefined, "b", "muted"], detail: ["Yapılan bir iş veya söylenen söz nedeniyle üzüntü."] },
    { cells: ["Keşke gençken yüzme öğrenseydim.", "hayıflanma", "kaçan fırsat"], tones: [undefined, "b", "muted"], detail: ["Yapılmamış veya değerlendirilememiş fırsat için üzülme."] },
    { cells: ["Keşke bütün ekip gelebilse.", "dilek", "istenen durum"], tones: [undefined, "c", "muted"], detail: ["Gerçekleşmesi istenen durum; gerçekleştiği haberi değildir."] },
    { cells: ["Bunca zaman bir kez bile aramadın.", "sitem", "muhataba kırgınlık"], tones: [undefined, "a", "muted"], detail: ["Muhataba yönelen bir beklenti ve incinme vardır."] },
    { cells: ["Otobüsler yine çok geç geliyor.", "yakınma", "durumdan şikâyet"], tones: [undefined, "a", "muted"], detail: ["Bir durumdan şikâyet; kişisel ilişkiye yönelen kırgınlık belirgin değildir."] },
  ],
  foot: "Önce olayın gerçekleşme durumunu yaz; etiketleri ezberden yarıştırma.",
});

// sozcukte-anlam · 7 · Çok anlamlılık ve sesteşlik.
const senses = treeFig({
  caption:
    "Aynı biçim iki yoldan farklı anlam taşır: çok anlamlılıkta kullanımlar arasında bağ kurulur, sesteşlikte farklı anlam alanları vardır. Bir dala ya da yaprağa tıkla. Örnekler bölümlerden alınmıştır.",
  alt: "Sınıflama ağacı. Kök: aynı biçim, farklı kullanım. Çok anlamlılık dalı: insan ayağı temel anlam, sandalyenin ayağı yan anlam, soğuk tavır mecaz. Sesteşlik dalı: içilen çay, küçük akarsu çay.",
  root: "Aynı biçim, farklı kullanım",
  branches: [
    {
      label: "Çok anlamlılık",
      title: "Çok anlamlılık: kullanımlar arasında bağ",
      detail: ["Tek sözcüğün kullanımları arasında temel, yan veya mecaz bağı kurulabilir."],
      tone: "c",
      leaves: [
        { label: "insan ayağı", title: "Temel anlam", detail: ["İlk ve alışılmış kullanım."] },
        { label: "sandalyenin ayağı", title: "Yan anlam", detail: ["Biçim veya işlev benzerliği; hâlâ somut bir parçayı adlandırır, mecazla aynı değildir."] },
        { label: "soğuk karşılama", title: "Mecaz", detail: ["Soğuk su sıcaklıkla ilgilidir; soğuk karşılama ilgisiz ve mesafeli tavrı anlatır."] },
      ],
    },
    {
      label: "Sesteşlik",
      title: "Sesteşlik: farklı anlam alanları",
      detail: ["Aynı biçimde yazılıp söylenen ama farklı anlam alanlarını karşılayan sözcükler.", "Kar–kâr gibi farklı söyleyişleri koşulsuz sesteş sayma."],
      tone: "b",
      leaves: [
        { label: "içilen çay", title: "Çay: içecek", detail: ["Cümle hangi sözcüğün kullanıldığını belirler."] },
        { label: "küçük akarsu çay", title: "Çay: akarsu", detail: ["Aynı harfler aynı nesneden söz edildiğini göstermez."] },
      ],
    },
  ],
  foot: "Tarihsel kökenini doğrulamadığın sözcükler için kesin köken hikâyesi üretme.",
});

// sozcukte-anlam · 9 · Nitel ve nicel.
const quality = tableFig({
  caption:
    "Ölçülen ne? Aynı sıfat farklı ölçütlere katılabilir. Bir ifadeye tıkla: hangi sözcüğün nicel, hangisinin nitel olduğu açılır.",
  alt: "Beş satırlı tablo. On metre derin kuyu: nicel, ölçülen boyut. Derin üzüntü: nitel, duygu yoğunluğu. Üç güzel çiçek: üç nicel, güzel nitel. Çok para: miktar. Çok kaba bir davranış: niteliğin derecesi.",
  cols: [
    { name: "İfade", w: 3.6 },
    { name: "Ölçüt", w: 2.6 },
    { name: "Neden", w: 3.8 },
  ],
  rows: [
    { cells: ["on metre derin kuyu", "nicel", "ölçülen boyut"], tones: [undefined, "c", "muted"], detail: ["Kuyunun ölçülen bir boyutu vardır."] },
    { cells: ["derin üzüntü", "nitel", "duygu yoğunluğu"], tones: [undefined, "b", "muted"], detail: ["Duygunun az veya çok hissedilmesi ona ölçü birimi vermez."] },
    { cells: ["üç güzel çiçek", "üç nicel, güzel nitel", "rakam her sözcüğü nicel yapmaz"], tones: [undefined, "a", "muted"], detail: ["Üç sayı, güzel niteliktir."] },
    { cells: ["çok para", "nicel", "miktar"], tones: [undefined, "c", "muted"], detail: ["Çok burada miktarı bildirir."] },
    { cells: ["çok kaba bir davranış", "nitel", "niteliğin derecesi"], tones: [undefined, "b", "muted"], detail: ["Çok, kabalığın derecesini bildirir."] },
  ],
  foot: "Hangi özelliğin nasıl ölçüldüğünü sor.",
});

// sozcukte-anlam · 10 · Genel ve özel göreli kapsamdır.
const scope = nestFig({
  caption:
    "Bölümdeki dizi: canlı → hayvan → kuş → serçe. Her iç kutu bir öncekinin içindeki daha dar gruptur. Bir kümeye tıkla: hangi kümeye göre genel, hangisine göre özel olduğu açılır. Kutu boyları ölçekli değildir.",
  alt: "Dört iç içe kutu: en dışta canlı, içinde hayvan, onun içinde kuş, en içte serçe. Kuş serçeye göre genel, hayvana göre özeldir.",
  levels: [
    { label: "canlı", title: "Canlı: dizinin en geniş kümesi", detail: ["Canlı, hayvana göre geneldir."] },
    { label: "hayvan", title: "Hayvan: canlının içinde", detail: ["Hayvan, canlıya göre özel; kuşa göre geneldir."] },
    { label: "kuş", title: "Kuş: hayvanın içinde", detail: ["Kuş, serçeye göre genel; hayvana göre özeldir."] },
    { label: "serçe", title: "Serçe: en dar grup", detail: ["Serçe bir tür adıdır; özel anlamlı olması onu kişi adı gibi özel ada dönüştürmez."] },
  ],
  foot: "Tek sözcüğe her koşulda “genel” ya da “özel” etiketi verme; karşılaştırılan kümeyi çiz.",
});

// sozcukte-anlam · 12 · Ad aktarması.
const metonymy = tableFig({
  caption:
    "Ad aktarmasında bir söz başka bir söz yerine aralarındaki ilgiyle kullanılır; amaç benzetme değildir. Bir ifadeye tıkla: ilgi ve kastedilen varlık açılır.",
  alt: "Beş satırlı tablo. Salon alkışladı: yer ve insan, dinleyiciler. Tabağını bitirdi: kap ve içerik, yiyecek. Bir yazarı okumak: sanatçı ve eser, eseri. Yağmur yerine bereket: neden ve sonuç. Batı: yön ve ülke, ilgili ülkeler.",
  cols: [
    { name: "İfade", w: 3.4 },
    { name: "İlgi", w: 3.0 },
    { name: "Kastedilen", w: 3.6 },
  ],
  rows: [
    { cells: ["salon alkışladı", "yer → insan", "dinleyiciler"], tones: [undefined, "c", "ink"], detail: ["Bağlam gerçek insanları gösteriyorsa kişileştirme varsayma."] },
    { cells: ["tabağını bitirdi", "iç → dış (kap)", "içindeki yiyecek"], tones: [undefined, "c", "ink"], detail: ["Kap adı içindeki yiyeceği karşılar."] },
    { cells: ["bir yazarı okumak", "sanatçı → eser", "yazarın eseri"], tones: [undefined, "c", "ink"], detail: ["Aynı yazar gerçekten gözleniyorsa eser aktarımı zorunlu olmaz."] },
    { cells: ["yağmur yerine bereket", "neden → sonuç", "yağmurun sonucu"], tones: [undefined, "c", "ink"], detail: ["Sonuç adı nedenin yerine kullanılır."] },
    { cells: ["Batı", "yön → ülke", "ilgili ülkeler"], tones: [undefined, "c", "ink"], detail: ["Yön adı ilgili ülkeleri anlatabilir."] },
  ],
  foot: "Benzetme amacı olmadan kurulan somut gönderimi tam cümlede kanıtla.",
});

// sozcukte-anlam · 17 · Kapsam ve değer.
const change = tableFig({
  caption:
    "Anlam değişmesinin iki ayrı ekseni: kapsam (genişleme, daralma) ve değer (iyileşme, kötüleşme). Bir satıra tıkla: bölümün verdiği eski–yeni anlam bilgisi açılır.",
  alt: "Dört satırlı tablo. Genişleme, kapsam: bir başarı türünden her başarı türüne. Daralma, kapsam: geniş meyve grubundan tek türe. İyileşme, değer: eziyet ve acıdan özenle yapılan işe. Kötüleşme, değer: sıradanlıktan kalitesizliğe.",
  cols: [
    { name: "Değişme", w: 2.6 },
    { name: "Eksen", w: 1.8 },
    { name: "Eski → yeni", w: 5.6 },
  ],
  rows: [
    { cells: ["genişleme", "kapsam", "bir başarı türü → her başarı türü"], tones: [undefined, "c", "ink"], detail: ["Anlam alanı genişlemiştir."] },
    { cells: ["daralma", "kapsam", "geniş meyve grubu → yalnız bir tür"], tones: [undefined, "c", "ink"], detail: ["Anlam alanı daralmıştır."] },
    { cells: ["iyileşme", "değer", "eziyet, acı → özenle yapılan iş"], tones: [undefined, "b", "ink"], detail: ["Değerlendirme tonu olumluya kaymıştır."] },
    { cells: ["kötüleşme", "değer", "sıradanlık → kalitesizlik"], tones: [undefined, "warn", "ink"], detail: ["Değerlendirme tonu olumsuza kaymıştır."] },
  ],
  foot: "Kapsam kararını sözcüğün uzunluğuna ya da olumlu görünmesine göre verme.",
});

export const turkishFigures061Meaning: Record<string, Record<string, FigureDef>> = {
  "deyimler-ve-atasozleri": {
    "Tam cümle olmak atasözü ölçütü değildir": kindLadder,
    "Gözden düşmek ile gözden kaçmak": idiomResults,
    "Benzer olaylarda atasözü seçimi": proverbMatch,
    "Kalıp sözcükleri ile çekim ekleri farklıdır": idiomForms,
  },
  "cumlede-anlam": {
    "Amaç niyettir, başarı haberi değildir": relations,
    "Varsayım, ön yargı ve saptama": stances,
    "Öznel ve nesnel anlatım": subjective,
    "Pişmanlık ve hayıflanma": feelings,
  },
  "sozcukte-anlam": {
    "Sesteşlik ile çok anlamlılığı ayır": senses,
    "Nitel ve nicel: ölçülen ne?": quality,
    "Genel ve özel anlam göreli kapsamdır": scope,
    "Ad aktarması: benzetmeden gönderim": metonymy,
    "Anlam değişmesi: kapsam ve değer iki eksen": change,
  },
};
