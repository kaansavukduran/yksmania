import type { FigureDef } from "./figureKit";
import { flowFig, rowsFig, tableFig, timelineFig } from "./turkishFigures060Kit";

/*
 * Forge061 TYT Felsefe · Rönesans, 15–17. yüzyıl, Aydınlanma ve çağdaş
 * felsefe. Ad, görüş ve dönemler yalnız bölüm metninden alınır. Tablolar
 * ders sınıflamasıdır; bir düşünürün bütün görüşünü tek satıra indirgemez,
 * hiçbir görüşü benimsetmez. Çizelgeler ölçekli değildir.
 */

// ronesans-felsefesi · 0 · Uzun süreç.
const renaissanceTime = timelineFig({
  caption:
    "Bölümlerde anılan dönem başlıkları sırayla: çeviri hareketleri, Rönesans’ın güçlendiği yüzyıllar ve sonraki yöntem tartışmaları. Bir durağa tıkla. Tek bir günde başlayan bir olay değil, farklı alanlarda gelişen uzun bir süreçtir. Çizelge ölçekli değildir.",
  alt: "Üç duraklı düşey çizelge: 12. yüzyıl ve öncesi-sonrası çeviri hareketleri, Toledo, Sicilya, Salerno; 14–16. yüzyıl Rönesans dönüşümleri güçlenir; 15–17. yüzyıl yöntem, Descartes ve hukuk tartışmaları, sonraki ders.",
  eras: [
    { when: "12. yy (öncesi ve sonrası da)", head: "Çeviri hareketleri", text: "Toledo, Sicilya, Salerno", tone: "b", detail: ["Metinler Yunanca, Süryanice, Arapça ve Latince arasında aktarılır.", "Hareketi yalnız 12. yüzyılda bir kişinin başlattığı tek olay diye sınırlama."] },
    { when: "14–16. yy", head: "Rönesans güçlenir", text: "sanat, eğitim ve düşünce dönüşümü", tone: "a", detail: ["Antik Yunan ve Roma kültürüne artan ilgi; farklı bölgelerde farklı hız."] },
    { when: "15–17. yy", head: "Yöntem ve hukuk tartışmaları", text: "sonraki dersin konusu", tone: "c", detail: ["Bilimsel yöntem, Descartes ve hukuk tartışmaları ayrıca ayrıntılandırılır.", "Aralarında bağ bulunması ikisini aynı ders yapmaz."] },
  ],
  foot: "Bir bölgenin öncülüğü başka bölgelerde hiç üretim olmadığı anlamına gelmez.",
});

// ronesans-felsefesi · 2 · Erişimden yoruma.
const access = flowFig({
  caption:
    "Çeviri erişimi değiştirir; erişim ile metindeki görüşü doğru kabul etmek ayrı aşamalardır. İleri ile aşamaları aç.",
  alt: "Dört kart oklarla alt alta: çeviri, metinler diller arasında aktarılır; erişim, başka birikimlere ulaşma; yeniden yorum, aynı metin yeni sorularla okunur, karşılaştırılır, eleştirilir; dolaşım, matbaa ile daha çok nüsha ve okur.",
  nodes: [
    { head: "Çeviri", text: "Yunanca, Süryanice, Arapça, Latince arasında aktarım", tone: "b", note: "Toledo, Sicilya ve Salerno gibi merkezler bilgi dolaşımında önemlidir." },
    { head: "Erişim", text: "doğrudan okuyamayanlar başka birikimlere ulaşır", tone: "c", note: "Erişim sağlanması metindeki her görüşün doğru kabul edilmesi değildir." },
    { head: "Yeniden yorum", text: "yeni sorularla okuma, karşılaştırma, eleştiri", tone: "a", note: "Klasik kaynaklara yönelmek bütün görüşleri değiştirmeden tekrarlamak değildir." },
    { head: "Dolaşım", text: "matbaa: daha çok nüsha, yeni okurlar", tone: "c", note: "Çok basılan her metin doğru ya da herkesçe aynı anlaşılmış değildir." },
  ],
  steps: ["Çeviri", "Erişim", "Yorum", "Dolaşım"],
  reveal: true,
  foot: "İki aşamanın nasıl bağlandığını açıkça göster.",
});

// ronesans-felsefesi · 14 · Çoklu neden.
const causes = rowsFig({
  caption:
    "Bölümdeki etkenler birbirini etkileyebilir; her biri açıklamanın bir parçasıdır. Bir etkene tıkla: hangi imkânı artırdığı açılır. “Etki etti” öbür koşulları gereksiz kılmaz.",
  alt: "Altı satır: çeviri erişimi; klasik kaynak ilgisi yeniden yorumu; matbaa dolaşımı; ticaret ve kent ekonomisi kaynak ve zamanı; siyasal himaye sanat ve düşünce çalışmalarını; eğitim yorumlama becerisini destekler.",
  rows: [
    { head: "Çeviri", text: "erişimi artırır", tone: "b", detail: ["Çeviri yeni kavramları ve yorum sorunlarını da getirir."] },
    { head: "Klasik kaynak ilgisi", text: "yeniden yorumu besler", tone: "b", detail: ["Geçmiş birikim yeni düşüncenin malzemesi hâline gelir."] },
    { head: "Matbaa", text: "dolaşımı artırır", tone: "c", detail: ["Önemli bir koşuldur; tek başına zorunlu ve yeterli neden değildir."] },
    { head: "Ticaret, kent ekonomisi", text: "zaman, malzeme ve okur çevresi sağlar", tone: "c", detail: ["Koşul sağlamak düşüncenin içeriğini bütünüyle belirlemek değildir."] },
    { head: "Siyasal himaye", text: "sanat ve düşünce çalışmalarına kaynak", tone: "a", detail: ["Her eserin ayrıntısı ekonomik kazançla açıklanmaz."] },
    { head: "Eğitim", text: "yorumlama becerisini destekler", tone: "a", detail: ["Dil ve eğitim çalışmaları hümanist yönelimin araçlarıdır."] },
  ],
  foot: "Bu yolları tek bir zorunlu otomatik zincir saymadan ilişkilerini göster; eksik veriyi açık tut.",
});

// ronesans-felsefesi · 13 · Eğilim karşılaştırması.
const trends = tableFig({
  caption:
    "Ders tablolarının eğilim karşılaştırması iki soruyla: hangi problem öne çıkıyor, otorite nasıl sınanıyor? Bir satıra tıkla: karşılaştırmadan çıkarılamayacak sonuç açılır. Dönemler kendi içinde çeşitlidir.",
  alt: "Üç satırlı tablo. Skolastik eğilim: inanç merkezli çerçeve. Rönesans ve modern eğilim: insan, doğa ve akla yeni ağırlık. Süreklilik: antik kaynaklar yeni sorularla okunur.",
  cols: [
    { name: "Eğilim", w: 3.4 },
    { name: "Öne çıkan", w: 6.6 },
  ],
  rows: [
    { cells: ["skolastik", "inanç merkezli çerçeve"], tones: [undefined, "b"], detail: ["Bu karşılaştırma Orta Çağ’da hiç akıl yürütülmediği sonucunu vermez."] },
    { cells: ["Rönesans ve modern", "insan, doğa ve akla verilen yeni ağırlık"], tones: [undefined, "c"], detail: ["Modern dönemde herkesin her baskıdan kurtulduğu sonucu çıkmaz."] },
    { cells: ["süreklilik", "eski metinler yeni sorularla okunur"], tones: [undefined, "a"], detail: ["Bir süreklilik örneği eklemek mutlak kopuş uydurmayı önler."] },
  ],
  foot: "Dönem adı tek tek bütün kişilerin inancını, özgürlüğünü ve yöntemini önceden belirlemez.",
});

// 15-17-yuzyil-felsefesi · 26 · Dört problem.
const fourProblems = tableFig({
  caption:
    "Önce problemi, sonra düşünürü bul. Bir satıra tıkla: pasajda hangi işaretin hangi soruya götürdüğü açılır. Dört soru ayrı ama ilişkilidir.",
  alt: "Dört satırlı tablo. İnsan eğitimi ve klasik metinler: hümanizmin kültürel odağı. Ölçüm ve karşılaştırma: sınama yöntemi, Bacon, Galileo, Newton. Kuşkuya rağmen kesin temel: Kartezyen soru, Descartes. Güvenlik ve ortak yetki: hukuk-siyaset gerekçesi, Hobbes.",
  cols: [
    { name: "Pasajda verilen", w: 3.6 },
    { name: "Problem", w: 3.4 },
    { name: "Bölümde anılan", w: 3.0 },
  ],
  rows: [
    { cells: ["insan eğitimi, klasik metinler", "hümanizmin kültürel odağı", "hümanist miras"], tones: [undefined, "b", "muted"], detail: ["İnsan ve kültür sorusu."] },
    { cells: ["ölçüm ve karşılaştırma", "doğanın sınanması", "Bacon, Galileo, Newton"], tones: [undefined, "c", "muted"], detail: ["Doğa olayı sorusu: olgu, hipotez ve sınama."] },
    { cells: ["kuşkuya rağmen kesin temel", "kesin bilginin dayanağı", "Descartes"], tones: [undefined, "a", "muted"], detail: ["Kuşku aranan sonuç değil araştırma aracıdır."] },
    { cells: ["güvenlik ve ortak yetki", "siyasal düzenin gerekçesi", "Hobbes, Machiavelli"], tones: [undefined, "b", "muted"], detail: ["Ortak yönetim sorusu."] },
  ],
  foot: "Metin söylemedikçe bütün görüşleri aynı kişiye zorla yükleme.",
});

// 15-17-yuzyil-felsefesi · 7 · Doğa araştırmasında üç adım.
const nature = flowFig({
  caption:
    "Bölümlerde anılan üç katkı: kabul edilen astronomi çerçevesinin tartışmaya açılması, eski bir itirazın düşünce deneyiyle sorgulanması ve farklı olayların ortak matematiksel ilişkilerle açıklanması. İleri ile her katkıyı ve sınırını aç.",
  alt: "Üç kart oklarla alt alta: Kopernik, Güneş merkezli açıklama; Galileo, ortak yatay hareketi paylaşan cisim düşünce deneyi; Newton, hareket yasaları ve evrensel kütle çekimi.",
  nodes: [
    { head: "Kopernik", text: "Dünya merkezli modele karşı Güneş merkezli açıklama", tone: "b", note: "Merkez sözcüğü kozmolojik yerleşim sorusuna aittir; töz sayısı sorusuyla karıştırma." },
    { head: "Galileo", text: "düşünce deneyi: cisim mutlaka geride mi kalır?", tone: "c", note: "Eski itirazın zorunlu olmadığını gösterebilir; bütün bağımsız kanıtların yerine geçmez." },
    { head: "Newton", text: "hareket yasaları ve evrensel kütle çekimi", tone: "a", note: "Düşüş ile göksel hareket aynı çerçevede; bu, doğa bilgisinin artık değişmez olduğu anlamına gelmez." },
  ],
  steps: ["Kopernik", "Galileo", "Newton"],
  reveal: true,
  foot: "Bir delili etkisizleştirmek ile karşıt görüşü bütün yönleriyle ispatlamak farklıdır.",
});

// 15-17-yuzyil-felsefesi · 14 · Töz sayısı.
const substance = tableFig({
  caption:
    "Ortak soru: varlığın temelinde kaç töz var ve bunlar hangi nitelikte? Bir düşünüre tıkla: cevabı ve sık karıştırma açılır. Nesne sayısı ile temel sayısını ayır.",
  alt: "Üç satırlı tablo. Descartes: iki yaratılmış töz, ruh düşünme, madde uzam; Tanrı yaratıcı töz olarak ayrıca. Spinoza: tek sonsuz töz, Tanrı veya Doğa. Leibniz: çok sayıda basit töz, monad.",
  cols: [
    { name: "Düşünür", w: 2.6 },
    { name: "Kaç töz?", w: 3.4 },
    { name: "Nitelik", w: 4.0 },
  ],
  rows: [
    { cells: ["Descartes", "ruh ve madde, ayrı tözler", "düşünme / uzamda yer kaplama"], tones: [undefined, "b", "muted"], detail: ["Ruh ve madde birbirine indirgenemeyen yaratılmış tözlerdir; Tanrı yaratıcı töz olarak ayrıca ele alınır.", "Rasyonalizm (bilgi sorusu) ile düalizm (varlık sorusu) aynı cevabın iki adı değildir."] },
    { cells: ["Spinoza", "tek sonsuz töz", "Tanrı veya Doğa"], tones: [undefined, "c", "muted"], detail: ["Zihin ve beden tek gerçekliğin nitelikleri çerçevesinde düşünülür.", "Tek töz, nesne sayısının bir olması demek değildir."] },
    { cells: ["Leibniz", "çok sayıda basit töz", "monad: bölünmeyen birlik"], tones: [undefined, "a", "muted"], detail: ["Monadı Demokritos’un maddi atomuyla otomatik özdeşleştirme."] },
  ],
  foot: "Önce hangi alanın sorulduğunu söyle, sonra o alandaki belirleyici savı göster.",
});

// 15-17-yuzyil-felsefesi · 19 · Hobbes’un modeli.
const hobbes = flowFig({
  caption:
    "Hobbes’un açıklaması adım adım. Doğal durum düşünsel bir modeldir, tarihî bir tutanak değil. İleri ile adımları aç. Görüşü öğrenmek, onu bugün herkesin benimsemesi gereken tercih olarak sunmak değildir.",
  alt: "Dört kart oklarla alt alta: doğal durum, ortak güvenilir güç yok, rekabet, güvensizlik, itibar arzusu; güven sorunu, ortak yaptırım yoksa iyi niyet sürdürülebilir güven sağlamaz; sözleşme, insanlar birbirleriyle anlaşarak ortak egemen yetkilendirir; egemen, güvenlik ve anlaşmaların uygulanması, yapay siyasal birlik.",
  nodes: [
    { head: "Doğal durum", text: "ortak güvenilir güç yok: rekabet, güvensizlik, itibar arzusu", tone: "muted", note: "Başlangıç problemi güvenliktir." },
    { head: "Güven sorunu", text: "ortak yaptırım yoksa iyi niyet yetmez", tone: "b", note: "Herkesin güç ve zarar görme ihtimali başkasına güvenmeyi güçleştirir." },
    { head: "Sözleşme", text: "insanlar birbirleriyle anlaşıp egemeni yetkilendirir", tone: "c", note: "Egemen, her biriyle aynı düzeyde sözleşen sıradan bir taraf gibi düşünülmez." },
    { head: "Egemen", text: "güvenlik ve anlaşmaların uygulanması; yapay siyasal birlik", tone: "a", note: "Edinim yolunda ise üstün güç karşısında yaşamı koruma amacıyla boyun eğme tartışılır." },
  ],
  steps: ["Doğal durum", "Güven", "Sözleşme", "Egemen"],
  reveal: true,
  foot: "Güvenlik gerekçesi ile çağdaş haklar bakımından değerlendirmeyi ayrı sorular olarak tut.",
});

// aydinlanma-felsefesi · 2 · Kavramlar.
const autonomy = tableFig({
  caption:
    "Aydınlanma tartışmasının kavramları ve sık yapılan aşırı okumaları. Bir kavrama tıkla: bölümdeki açıklama açılır.",
  alt: "Dört satırlı tablo. Ergin olmayış: başkasının kılavuzluğu olmadan kendi anlama yetisini kullanamamak; yaş ya da öğrenme güçlüğü yargısı değildir. Özerklik: yargıyı akılsal gerekçeyle kurmak; bütün kuralların gereksizliği değildir. Keyfîlik: yalnız istediğim için; başkasınca değerlendirilebilir gerekçe yok. Kamusal akıl kullanımı: gerekçeyi tartışmaya açmak; bütün kararları iptal etmek değildir.",
  cols: [
    { name: "Kavram", w: 2.8 },
    { name: "Bölümdeki anlam", w: 3.8 },
    { name: "Ne değildir?", w: 3.4 },
  ],
  rows: [
    { cells: ["ergin olmayış", "kendi anlama yetisini başkasının kılavuzluğu olmadan kullanamamak", "yaş ya da öğrenme güçlüğü yargısı"], tones: [undefined, "ink", "warn"], detail: ["Sorun bağımsız düşünme sorumluluğunu üstlenmeme de olabilir.", "Destek almak özerkliğin karşıtı olmak zorunda değildir."] },
    { cells: ["özerklik", "yargıyı ve eylem ilkesini akılsal gerekçeyle kurmak", "bütün kuralların gereksizliği"], tones: [undefined, "ink", "warn"], detail: ["Bir kuralı eleştirebilmek hiçbir ortak düzen olmayacağını savunmak değildir."] },
    { cells: ["keyfîlik", "“yalnız istediğim için”", "gerekçeli düşünce"], tones: [undefined, "ink", "warn"], detail: ["Nedeni başkalarının da değerlendirebileceği biçimde açıklamak keyfî tercihi ayırır."] },
    { cells: ["kamusal akıl", "gerekçeyi erişilebilir biçimde tartışmaya açmak", "bütün kararları iptal etmek"], tones: [undefined, "ink", "warn"], detail: ["Bir kurumun emir vermesi ile o emrin haklılığını açıklaması farklı işlerdir."] },
  ],
  foot: "Kavramsal soru, kişinin bir yargıyı hangi gerekçeyle kabul ettiğidir.",
});

// aydinlanma-felsefesi · 3 · Otorite ve gerekçe.
const authority = rowsFig({
  caption:
    "“Kim söyledi?” sorusu “neye dayanıyor?” sorusunun yerine geçmez. Bir tutuma tıkla: gerekçesinin türü açılır. Eleştirellik refleks olarak karşı çıkmak değildir.",
  alt: "Dört satır: sevdiğin kişi söylediği için kabul; delilleri için kabul; kurum otorite olduğu için reddetme; kabulü de reddi de gerekçeye açık tutmak.",
  rows: [
    { head: "Sevdiğin kişi söylediği için kabul", text: "kişi otoritesi", tone: "warn", detail: ["Gerekçe görüşün dayanağı değil, söyleyenin kendisidir."] },
    { head: "Delilleri için kabul", text: "dayanağa göre karar", tone: "c", detail: ["Uzmanı dinlemek, bilginin dayanağını sorgulanamaz kişi otoritesinden ayırmakla birlikte yürür."] },
    { head: "Otorite olduğu için ret", text: "refleks karşı çıkış", tone: "warn", detail: ["Bir kurumun otorite olması her iddiasının yanlışlığını kanıtlamaz."] },
    { head: "Kabul ve ret gerekçeye açık", text: "eleştirel tutum", tone: "a", detail: ["Eleştirellik hem kabulü hem reddi gerekçelendirmeye açık tutmaktır."] },
  ],
  foot: "Uzman önemli bir kaynak olabilir; dayanağını sorabilmek onu dinlememek demek değildir.",
});

// aydinlanma-felsefesi · 11 · Kant’ta etkin zihin.
const kant = rowsFig({
  caption:
    "Kant’ın eleştiriciliğinde deneyim ile zihnin payı ve iki aşırı okuma. Bir satıra tıkla. Kişisel yorum farkı ile ortak koşullar farklı düzeylerdir.",
  alt: "Dört satır: deneyim malzeme sağlar; zihin ortak düzenleyici biçimlerle anlamlandırır; aşırı okuma bir, zihin edilgin kopya alır; aşırı okuma iki, herkes keyfine göre ayrı evren yaratır.",
  rows: [
    { head: "Deneyim malzeme sağlar", text: "deneyimin payı", tone: "b", detail: ["Deneyim malzeme sağlar."] },
    { head: "Zihin düzenler", text: "ortak düzenleyici biçimler", tone: "c", detail: ["Zihin malzemeyi ortak düzenleyici biçimlerle anlamlandırır."] },
    { head: "Edilgin kopya değil", text: "zihin yalnız dışarıyı kopyalamaz", tone: "warn", detail: ["Bu yaklaşım zihni edilgin kopya alan yapı saymaz."] },
    { head: "Keyfî evren değil", text: "düzenleyicilik ortak koşuldur", tone: "warn", detail: ["Herkesin keyfine göre bütünüyle ayrı evren yaratması anlamına gelmez."] },
  ],
  foot: "Pasajın insan türüne ilişkin koşulu mu, bir kişinin beğenisini mi anlattığını ayır.",
});

// aydinlanma-felsefesi · 13 · Romantizm ve realizm.
const movements = tableFig({
  caption:
    "18–19. yüzyıl ortamıyla ilişkili iki yazınsal yönelim ve bir kavram karışıklığı. Bir satıra tıkla. Kavram benzerliği ile tarihsel sınıflamayı karıştırma.",
  alt: "Üç satırlı tablo. Romantizm: duygu, hayal gücü, bireysel yaşantı. Edebi realizm: insan ve toplum gerçeğinin gözleme dayalı temsili; Tolstoy ve Dostoyevski’nin anılan eserleri 19. yüzyıl. Varlık felsefesinde gerçekçilik: başka bir sorunun cevabı.",
  cols: [
    { name: "Yönelim", w: 3.4 },
    { name: "Öne çıkardığı", w: 6.6 },
  ],
  rows: [
    { cells: ["romantizm", "duygu, hayal gücü, bireysel yaşantı"], tones: [undefined, "b"], detail: ["Her metnin dili ve amacı kendi bağlamında değerlendirilir."] },
    { cells: ["edebi realizm", "insan ve toplum gerçeğinin gözleme dayalı temsili"], tones: [undefined, "c"], detail: ["Tolstoy ve Dostoyevski’nin anılan eserleri 19. yüzyıla aittir; 18. yüzyıl eseri değildir."] },
    { cells: ["ontolojik gerçekçilik", "varlık felsefesinin ayrı sorusu"], tones: [undefined, "warn"], detail: ["Edebiyattaki realizm ile varlık felsefesindeki gerçekçilik aynı sorunun cevabı değildir."] },
  ],
  foot: "Ortak dönem, ortak cevap demek değildir.",
});

// cagdas-felsefe · 0 · Akımlar ve yöntemleri.
const methods = tableFig({
  caption:
    "Çağdaş felsefe tek bir görüş değildir: akımları adlarıyla değil, neyi açıkladıkları ve hangi yöntemi kullandıklarıyla tanı. Bir satıra tıkla: ayırıcı kavram ve sık karıştırma açılır.",
  alt: "Beş satırlı tablo. Fenomenoloji, Husserl: yönelimsellik ve epoché. Varoluşçuluk, Sartre: varoluş özden önce gelir. Mantıkçı pozitivizm, Schlick ve Carnap: deneysel doğrulama ve anlam ölçütü. Popper: yanlışlanabilirlik. Kuhn: paradigma ve olağan bilim.",
  cols: [
    { name: "Yaklaşım", w: 3.4 },
    { name: "Bölümde anılan", w: 2.8 },
    { name: "Ayırıcı kavram", w: 3.8 },
  ],
  rows: [
    { cells: ["fenomenoloji", "Husserl", "yönelimsellik, epoché"], tones: [undefined, "muted", "c"], detail: ["Bilinç bir şeyin bilincidir; epoché varlık hükmünü askıya alır.", "Hüküm vermemek “yoktur” demek değildir."] },
    { cells: ["varoluşçuluk", "Sartre", "varoluş özden önce gelir"], tones: [undefined, "muted", "c"], detail: ["İnsan eylem ve seçimleriyle nasıl biri olacağını kurar.", "Bu, insanın fiziksel koşulları istediği gibi yok ettiği anlamına gelmez."] },
    { cells: ["mantıkçı pozitivizm", "Schlick, Carnap", "deneysel doğrulama"], tones: [undefined, "muted", "b"], detail: ["Bilimsel önermelerin mantıksal yapısı ve doğrulamayla ilişkisi.", "Whitehead Viyana Çevresi mantıkçı pozitivisti diye sınıflandırılmaz."] },
    { cells: ["yanlışlanabilirlik", "Popper", "olası karşı gözlem"], tones: [undefined, "muted", "b"], detail: ["Bir iddianın hangi gözlem karşısında başarısız sayılacağının belirlenebilmesi; zaten yanlış olduğu demek değildir."] },
    { cells: ["paradigma", "Kuhn", "paylaşılan araştırma çerçevesi"], tones: [undefined, "muted", "a"], detail: ["Problem, yöntem, örnek çözüm ve temel kabullerin çerçevesi."] },
  ],
  foot: "Bir görüşü tanımlamak onu onaylamak değildir.",
});

// cagdas-felsefe · 24 · Kuhn’da değişim.
const kuhn = flowFig({
  caption:
    "Kuhn’un bilim tarihine bakışı adım adım. İleri ile aşamaları aç. Mekanik bir döngü değildir: tek beklenmedik ölçüm devrimi kesinleştirmez.",
  alt: "Dört kart oklarla alt alta: paradigma, paylaşılan problem, yöntem ve kabuller; olağan bilim, çerçeve içinde sorun çözme; aykırılık, beklentiyle uyuşmayan bulgu, önce mevcut yöntemle çözülmeye çalışılır; paradigma değişimi, temel sorun ve açıklama standartlarının daha kapsamlı dönüşmesi.",
  nodes: [
    { head: "Paradigma", text: "paylaşılan problem, yöntem, örnek çözüm, temel kabuller", tone: "c", note: "Kişinin beğendiği renk ya da ruh hâli gibi bireysel bir şey değildir." },
    { head: "Olağan bilim", text: "çerçeve içinde sorun çözme", tone: "c", note: "Yeni ölçüm aracı aynı çerçevede daha iyi ölçüm sağlayabilir." },
    { head: "Aykırılık ve bunalım", text: "beklentiyle uyuşmayan bulgu araştırılır", tone: "b", note: "Her aykırılık çerçevenin terk edilmesini gerektirmez." },
    { head: "Paradigma değişimi", text: "temel sorun ve açıklama standartları dönüşür", tone: "a", note: "Bilimsel devrim bağlamında tartışılır; hangi düzeyde değişim olduğunu göster." },
  ],
  steps: ["Paradigma", "Olağan bilim", "Aykırılık", "Değişim"],
  reveal: true,
  foot: "Kuhn’un amacı bilimi tarihsel ve toplumsal bağlamında anlamaktır.",
});

// cagdas-felsefe · 26 · Hartmann’ın katmanları.
const layers = rowsFig({
  caption:
    "Hartmann’ın reel varlık katmanları alttan üste sırayla. Bir katmana tıkla. Katmanlar kopuk dört evren değildir; şemadaki sıra değer ya da üstünlük puanı değildir.",
  alt: "Dört satır: tinsel katman, dil, kültür ve anlam dünyası; ruhsal katman, bilinçli yaşantı; organik katman, canlılık; inorganik katman, fiziksel-cansız varlık.",
  lead: "Üstteki katman alttaki koşullara dayanır ve yeni özellikler taşır.",
  rows: [
    { head: "tinsel", text: "dil, kültür ve anlam dünyası", tone: "a", detail: ["Tinsel alan ideal varlığın eş anlamı değildir; reel katmanlar içinde ele alınır."] },
    { head: "ruhsal", text: "bilinçli yaşantı", tone: "b", detail: ["Bilinçli yaşantıyla ilişkilidir."] },
    { head: "organik", text: "canlılık", tone: "c", detail: ["Canlılıkla ilişkilidir."] },
    { head: "inorganik", text: "fiziksel-cansız varlık", tone: "muted", detail: ["Fiziksel-cansız varlıkla ilişkilidir."] },
  ],
  foot: "Bir insan bedeni, yaşantısı ve kültürel eylemleriyle birden çok açıdan araştırılabilir.",
});

export const philosophyFigures061Modern: Record<string, Record<string, FigureDef>> = {
  "ronesans-felsefesi": {
    "Yeniden doğuş neyi anlatır?": renaissanceTime,
    "Çeviri metne erişimi değiştirir": access,
    "Skolastik ve moderni karşılaştır": trends,
    "Tarihsel nedeni çoklu kur": causes,
  },
  "15-17-yuzyil-felsefesi": {
    "Kopernik: merkez sorusunu değiştir": nature,
    "Leibniz: basit töz olarak monad": substance,
    "Hobbes: doğal durum bir düşünsel model": hobbes,
    "Dört problem için çözüm yolu": fourProblems,
  },
  "aydinlanma-felsefesi": {
    "Özerklik ve keyfîlik": autonomy,
    "Otorite ve uzmanlık": authority,
    "Kant: etkin zihin ve ortak koşullar": kant,
    "Romantizm ve realizmle ilişki": movements,
  },
  "cagdas-felsefe": {
    "Çağdaş felsefe tek bir görüş değildir": methods,
    "Aykırılık, bunalım ve devrim": kuhn,
    "Reelin dört katmanı": layers,
  },
};
