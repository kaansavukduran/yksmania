import type { FigureDef } from "./figureKit";
import { flowFig, ladderFig, rowsFig, tableFig, timelineFig, treeFig } from "./turkishFigures060Kit";

/*
 * Forge060 TYT Türkçe · cümle düzeyi. Örnek cümleler bölüm metninden alınır;
 * sınıflama bölümün belirttiği MEBİ/OGM okul konvansiyonudur. Panolar kavram
 * şemasıdır, ölçekli değildir.
 */

// cumle-turleri · 1 · Dört eksen, tek cümle.
const fourAxes = tableFig({
  caption:
    "“Ece dün gelmedi.” cümlesi dört ayrı ölçütte dört ayrı etiket alır: fiil, kurallı, olumsuz ve basit. Bir ölçüte tıkla: o kararın kanıtı açılır. Bir ölçütteki karar ötekinin yerine geçmez. Kavram şeması, ölçekli değildir.",
  alt: "Dört satırlı tablo. Yüklemin türü: fiil cümlesi. Yüklemin yeri: kurallı. Anlam: olumsuz. Yapı: basit. Hepsi aynı cümle için.",
  cols: [
    { name: "Ölçüt", w: 3.4 },
    { name: "Sorulan", w: 3.6 },
    { name: "Ece dün gelmedi.", w: 3.0, tone: "c" },
  ],
  rows: [
    { cells: ["Yüklemin türü", "isim mi, çekimli fiil mi?", "fiil cümlesi"], tones: [undefined, "muted", "c"], detail: ["Yüklem “gelmedi” çekimli fiildir; cümle fiil cümlesidir.", "İncelemeye tam yüklemden başla; yardımcı fiil ya da deyim grubunu parçalama."] },
    { cells: ["Yüklemin yeri", "yüklem sonda mı?", "kurallı"], tones: [undefined, "muted", "c"], detail: ["Yüklem sondadır; cümle kurallıdır.", "“Dosyayı getirdi Ece.” gibi yüklemi sonda olmayan cümle devriktir."] },
    { cells: ["Anlam", "yargı gerçekleşmiş mi?", "olumsuz"], tones: [undefined, "muted", "c"], detail: ["Eylem gerçekleşmemiştir; cümle olumsuzdur.", "-ma/-me önemli ipucudur ama anlamı tek başına mekanik olarak belirlemez."] },
    { cells: ["Yapı", "kaç yargı, nasıl bağlı?", "basit"], tones: [undefined, "muted", "c"], detail: ["Tek temel yargı var, ayrıca yan cümle yok; cümle basittir.", "İkinci çekimli yargı, fiilimsi yan yapısı, alıntı ya da koşul var mı diye sonra ara."] },
  ],
  foot: "Noktalama ve bağlaç yalnız ipucudur; her eksende gerçek yargı ilişkisini göster.",
});

// cumle-turleri · 2 · Yüklemin türü.
const predicateKind = tableFig({
  caption:
    "Bölümün dört örneği: yüklem öbeğinin çekirdek türüne bak. Bir cümleye tıkla: yüklemin neden isim soylu ya da çekimli fiil sayıldığı açılır. Eylem anlamı taşıyan isim-fiil, cümleyi fiil cümlesi yapmaz.",
  alt: "Dört satırlı tablo: Hava serinledi fiil cümlesi; Hava serindi isim cümlesi; Amacım araştırmaktır isim cümlesi; Çocuk yardım etti fiil cümlesi. Her satırda yüklem ayrı sütunda.",
  cols: [
    { name: "Cümle", w: 4.2 },
    { name: "Yüklem", w: 3.0 },
    { name: "Tür", w: 2.8 },
  ],
  rows: [
    { cells: ["Hava serinledi.", "serinledi", "fiil cümlesi"], tones: [undefined, "b", "c"], detail: ["Yüklem çekimli fiildir: serinledi.", "Yüklemi çekimli fiil olan cümle fiil cümlesidir."] },
    { cells: ["Hava serindi.", "serin + ek fiil", "isim cümlesi"], tones: [undefined, "b", "a"], detail: ["“serin” sıfatına ek fiil gelmiştir; yüklem ad soyludur.", "“Kitap masadaydı.”, “Bu çözüm doğru.” de isim cümlesidir."] },
    { cells: ["Amacım araştırmaktır.", "araştırmak + -tır", "isim cümlesi"], tones: [undefined, "b", "a"], detail: ["İsim-fiile -tır gelmiştir; cümle isim cümlesidir.", "İçinde eylem anlamı var diye fiil cümlesi seçilmez."] },
    { cells: ["Çocuk yardım etti.", "yardım etti", "fiil cümlesi"], tones: [undefined, "b", "c"], detail: ["“yardım etti” birleşik fiil yüklemidir; cümle fiil cümlesidir.", "Yalnız son sözcüğe ya da yalnız ek fiile değil, yüklem öbeğinin çekirdeğine bak."] },
  ],
  foot: "Ölçüt: yüklem çekimli fiilse fiil cümlesi, ad soyluysa isim cümlesi.",
});

// cumle-turleri · 3 · Biçim ile anlam.
const meaning = tableFig({
  caption:
    "Biçim ipucu ile cümlenin anlamı her zaman örtüşmez. Bir cümleye tıkla: olumsuzluk eki ya da soru eki olmadan, ya da olduğu hâlde anlamın neden değiştiği açılır. Örnekler bölüm metnindendir.",
  alt: "Dört satırlı tablo: Ne konuştu ne güldü, eksiz olumsuz anlam; Bu fikri beğenmiyor değilim, çift olumsuz ile olumlu anlam; Ben bu yolu bilmez miyim, sözde soru; Bu yolu biliyor musun, gerçek soru.",
  cols: [
    { name: "Cümle", w: 4.6 },
    { name: "Biçim", w: 2.6 },
    { name: "Anlam", w: 2.8 },
  ],
  rows: [
    { cells: ["Ne konuştu ne güldü.", "-ma/-me yok", "olumsuz"], tones: [undefined, "muted", "warn"], detail: ["Olumsuzluk eki olmadan iki eylemin de yapılmadığını anlatır.", "“ne… ne…” bağlacı olumsuz anlam kurar."] },
    { cells: ["Bu fikri beğenmiyor değilim.", "iki olumsuz", "olumlu"], tones: [undefined, "muted", "c"], detail: ["Bağlamına göre beğenme bildiren çift olumsuz kuruluştur.", "Olumsuz biçimleri saymak anlamı vermez; yargının sonucunu oku."] },
    { cells: ["Ben bu yolu bilmez miyim?", "soru eki", "sözde soru"], tones: [undefined, "muted", "b"], detail: ["“Elbette bilirim” açıklamasıyla kullanılıyorsa sözde sorudur.", "Bilgi istemez; bir yargıyı vurgular."] },
    { cells: ["Bu yolu biliyor musun?", "soru eki", "gerçek soru"], tones: [undefined, "muted", "c"], detail: ["Gerçekten bilgi isteyen sorudur.", "Aynı biçim (soru eki) farklı iletişim amacı taşıyabilir."] },
  ],
  foot: "Ünlem anlamı da yalnız ünlem işareti sayılarak bulunmaz.",
});

// cumle-turleri · 4 · Yapı merdiveni.
const structure = ladderFig({
  caption:
    "Yapıya göre karar merdiveni (bölümün MEBİ/OGM okul sınıflaması). İleri ile bölümdeki örnekleri merdivende yürüt: her soruda “evet” sağdaki adı, “hayır” bir alttaki soruyu verir. Kavram şeması, ölçekli değildir.",
  alt: "Dört soru kartı alt alta. Temel yargılar bağlaçla bağlıysa bağlı; virgül ya da noktalı virgülle art arda ise sıralı; koşul, ki ya da alıntı yargısı varsa şartlı, ki'li ya da iç içe; yüklem dışında fiilimsi yan yapı varsa girişik; hiçbiri değilse basit cümle.",
  rungs: [
    { q: "İki temel yargı bağlaçla mı bağlı?", yes: "bağlı cümle", tone: "c" },
    { q: "İki temel yargı virgül ya da noktalı virgülle art arda mı?", yes: "sıralı cümle", tone: "c" },
    { q: "Koşul, ki ya da alıntı yargısı temel yargıya bağlı mı?", yes: "şartlı / ki’li / iç içe", tone: "b" },
    { q: "Yüklem dışında fiilimsi yan yapı var mı?", yes: "girişik birleşik", tone: "b" },
  ],
  last: "Hiçbiri: basit cümle",
  walks: [
    { step: "bağlı", example: "Ece dosyayı açtı ve Can not aldı.", stop: 0, why: "İki temel yargı (açtı, aldı) “ve” bağlacıyla bağlanmış: bağlı cümle." },
    { step: "sıralı", example: "Ece dosyayı açtı, Can not aldı.", stop: 1, why: "İki temel yargı virgülle art arda: sıralı cümle." },
    { step: "şartlı", example: "Yağmur diner ise dışarı çıkacağız.", stop: 2, why: "Koşul yargısı temel yargıya bağlanır: şartlı birleşik cümle." },
    { step: "girişik", example: "Dosyayı açınca not aldı.", stop: 3, why: "“açınca” yan eylem, “aldı” temel yargı: girişik birleşik cümle." },
    { step: "tuzak: ve", example: "Ece ve Can kitap okudu.", stop: 4, why: "“ve” iki özneyi bağlar; tek yüklem, tek temel yargı var: basit cümle." },
    { step: "tuzak: yüklemde fiilimsi", example: "Amacım araştırmaktır.", stop: 4, why: "Tek fiilimsi temel yüklemdedir; ayrı yan cümle değildir: basit cümle." },
  ],
  foot: "Her yargıyı kendi yüklemiyle tamamlayarak göster; aradaki işaret yalnız ipucudur.",
});

// anlatim-bozukluklari · 1 · Türler şeması.
const faultTree = treeFig({
  caption:
    "Anlatım bozukluklarının iki ana dalı: anlama dayalı ve yapıya dayalı sorunlar. Bir dala ya da türe tıkla: bölümdeki örnek ve denetim sorusu açılır. Bir cümlede birden çok sorun bulunabilir; her değişikliğin gerekçesini ayrı söyle. Kavram şeması, ölçekli değildir.",
  alt: "Ağaç şema. Kökte anlatım bozukluğu. Sol dal anlama dayalı: gereksiz bilgi, yanlış sözcük, mantık sırası, çelişki, belirsizlik, uymayan deyim. Sağ dal yapıya dayalı: ek yanlışlığı, tamlama, öge eksikliği, yüklem uyumu, çatı uyumu.",
  root: "Anlatım bozukluğu",
  branches: [
    {
      label: "Anlama dayalı",
      title: "Anlama dayalı sorunlar",
      detail: ["Gereksiz bilgi, yanlış sözcük, mantık sırası, çelişki, belirsizlik ve bağlama uymayan deyim.", "Sözcükleri kaldırıp dil bilgisini düzeltmek, yanlış anlamı koruyorsa yeterli değildir."],
      tone: "c",
      leaves: [
        { label: "gereksiz bilgi", title: "Gereksiz bilgi", detail: ["“Kitabı yeniden tekrar okudum.”: iki zarf da “bir kez daha” bilgisini verir; biri yeterli.", "Deneme: çıkarınca amaçlanan bilgi ya da ton kayboluyor mu?"] },
        { label: "yanlış sözcük", title: "Yakın anlam, benzer ses", detail: ["“Olayın sonunda” zamanın bitimini, “olayın sonucunda” ortaya çıkan etkiyi anlatır.", "Sözcüğün kulağa benzemesine değil, kurduğu ilişkiye bak."] },
        { label: "mantık sırası", title: "Mantık sırası ve ölçek", detail: ["Karşılaştırma bir ölçeğe dayanır: “bırakın” ve “bile” sıralamanın yönünü etkiler.", "Her zaman belirtecini kendi yüklemiyle eşleştir; geçen haftaki iş gelecek zaman yüklemine bağlanmaz."] },
        { label: "çelişki", title: "Çelişen kesinlik", detail: ["“Yaklaşık tam on dakika” aynı süreyi hem kesin hem yaklaşık sunar.", "Önce hangi bilginin amaçlandığı seçilir."] },
        { label: "belirsizlik", title: "Zamir, iyelik ve karşılaştırma belirsizliği", detail: ["“Seni Ece’den çok severim.”: sevilen mi, sevenlerin sevgisi mi karşılaştırılıyor?", "İletişim için gerekli bilgi gerçekten açık değilse onarım yap."] },
        { label: "uymayan deyim", title: "Deyimde amaçlanan anlam", detail: ["Yardım eden biri için “elinden geleni yaptı” denir; zarar bağlamındaki benzer sözcüklü deyim anlamı değiştirir.", "Önce deyimin ne anlattığını açık bir cümleyle söyle."] },
      ],
    },
    {
      label: "Yapıya dayalı",
      title: "Yapıya dayalı sorunlar",
      detail: ["Ekler, tamlamalar, ögeler, yüklem uyumu ve yan yapıların ilişkisi incelenir.", "Aynı kişiden söz edilmesi, her fiilin aynı eki istemesini sağlamaz."],
      tone: "b",
      leaves: [
        { label: "ek yanlışlığı", title: "Gereken ek ve fiilimsi biçimi", detail: ["Gereken ekin eksikliği, gereksiz ek ya da yanlış ek yapıyı bozar: “Öğrencilerin çalışmasını sağladı.”", "Fiilimsiye gelen iyelik ve durum eklerini kip ya da kişi ekiyle karıştırma."] },
        { label: "tamlama", title: "Tamlayan–tamlanan uyumu", detail: ["“Benim kitabımı ve onun kitabını inceledi.”: iki tamlama ayrı kişi ekleri taşır.", "Farklı kişi eklerini yok sayıp ortak tamlanan kurma; gereken yerde tamlananı kendi ekiyle tekrarla."] },
        { label: "öge eksikliği", title: "Özne, nesne, yer ve zarf eksikliği", detail: ["“Dersin süresi bitti, öğrenciler dışarı çıktı.”: süre ile öğrenciler ayrı öznelerdir; ortak sanma.", "Her söylenmemiş adı hata sayma; gereken ilişkinin yokluğuna bak."] },
        { label: "yüklem uyumu", title: "Tekil–çoğul ve kişi uyumu", detail: ["“Sen ve ben geleceğiz.”: özne grubunda birinci kişi varsa yüklem birinci çoğul olur.", "Tekil–çoğul uyumu ile kişi uyumunu ayrı denetle."] },
        { label: "çatı uyumu", title: "Çatı ve yan eylemin yapanı", detail: ["Yan eylem ile temel eylem aynı kişiye aitken biri etken, öbürü edilgen kurulursa bağ bozulabilir.", "Önce her eylemi kimin yaptığını yaz; yalnız son ekteki edilgenliğe bakma."] },
      ],
    },
  ],
  foot: "Önce ne anlatılmak istendiğini bul; onarım amacı korumalıdır.",
});

// anlatim-bozukluklari · 2 · Gereksiz mi, vurgu mu?
const redundancy = ladderFig({
  caption:
    "Tekrar mı, bilinçli vurgu mu? İleri ile bölümdeki iki örneği merdivende yürüt. Her tekrar otomatik hata değildir; çıkarma denemesi bilgi ya da ton kaybını ölçer.",
  alt: "İki soru kartı. Tekrar karşıtlık, vurgu, duygu ya da gönderim için mi: bilinçli tekrar. Çıkarınca bilgi ya da ton kayboluyor mu: gerekli söz. Hiçbiri değilse işlevsiz yineleme, biri çıkarılır.",
  rungs: [
    { q: "Tekrar karşıtlık, vurgu, duygu ya da gönderim için mi?", yes: "bilinçli tekrar: kalsın", tone: "c" },
    { q: "Çıkarınca amaçlanan bilgi ya da ton kayboluyor mu?", yes: "gerekli söz: kalsın", tone: "c" },
  ],
  last: "İşlevsiz yineleme: biri çıkarılır",
  lastTone: "warn",
  walks: [
    { step: "yeniden tekrar", example: "Kitabı yeniden tekrar okudum.", stop: 2, why: "İki zarf da “bir kez daha” bilgisini veriyor; biri yeterlidir." },
    { step: "o hep yardım eder", example: "Ece yardım etti; o hep yardım eder.", stop: 0, why: "İki yargıdaki “o” gönderimi belirginleştirir; bağlamı okumadan yasaklama." },
  ],
  foot: "Yerleşik yardımcı fiilli kullanımları (şüphe etmek gibi) evrensel yanlış ilan etme.",
});

// anlatim-bozukluklari · 3 · Her yüklem kendi hâlini ister.
const caseDemand = tableFig({
  caption:
    "Ortak öge iki yükleme aynı ekle uymayabilir. Bir fiile tıkla: istediği tamlayıcı ilişkisi ve bölümdeki örnek açılır.",
  alt: "Dört satırlı tablo: görmek kimi neyi; güvenmek kime neye; söz etmek kimden neden; açmak ve kapatmak aynı belirtme nesnesini paylaşabilir.",
  cols: [
    { name: "Fiil", w: 3.0 },
    { name: "İstediği", w: 2.8 },
    { name: "Bölümdeki örnek", w: 4.2 },
  ],
  rows: [
    { cells: ["görmek", "kimi / neyi", "Komşumu gördüm"], tones: [undefined, "b", "ink"], detail: ["Görmek belirtme hâli ister: komşumu.", "İkinci fiil başka hâl istiyorsa ortak öge yetmez."] },
    { cells: ["güvenmek", "kime / neye", "ve ona güvendim."], tones: [undefined, "c", "ink"], detail: ["Güvenmek yönelme hâli ister: ona.", "“Komşumu gördüm ve ona güvendim.”: aynı komşu iki farklı ekle belirtilir."] },
    { cells: ["söz etmek", "kimden / neden", "ayrılma hâli"], tones: [undefined, "a", "muted"], detail: ["Söz etmek ayrılma hâli ister.", "Her yüklemin istediği hâli ayrı sor."] },
    { cells: ["açmak, kapatmak", "neyi (ikisi de)", "Dosyayı açtı ve kapattı."], tones: [undefined, "b", "ink"], detail: ["İki fiil aynı belirtme nesnesini paylaşabilir; ögeyi yeniden yazmak zorunlu değil.", "Öge eksikliği, gereken ilişkinin gerçekten yokluğuna dayanır."] },
  ],
  foot: "Açık ya da bağlamdan tamamlanan ögeyi, yanlış ekli ortak ögeden ayır.",
});

// anlatim-bozukluklari · 4 · Kişi önceliği.
const personRank = tableFig({
  caption:
    "Özne grubunda kişi önceliği: birinci kişi varsa “biz”, birinci kişi yokken ikinci kişi varsa “siz” çekimi. Bir cümleye tıkla: hangi kişinin grubu belirlediği açılır. İlk ya da en yakın ad yüklem ekini belirlemez.",
  alt: "Dört satırlı tablo: Sen ve ben geleceğiz, biz grubu, doğru. Sen ve Ece geleceksiniz, siz grubu, doğru. Sen ve ben geleceksiniz, birinci kişi önceliği karşılanmıyor. Arkadaşlar, gelin: arkadaşlar hitaptır.",
  cols: [
    { name: "Cümle", w: 4.6 },
    { name: "Grup", w: 2.2 },
    { name: "Karar", w: 3.2 },
  ],
  rows: [
    { cells: ["Sen ve ben geleceğiz.", "biz", "uyumlu"], tones: [undefined, "b", "c"], detail: ["Özne grubunda birinci kişi var: yüklem birinci çoğul.", "Ben ile üçüncü kişinin birlikte bulunması da biz grubunu kurar."] },
    { cells: ["Sen ve Ece geleceksiniz.", "siz", "uyumlu"], tones: [undefined, "b", "c"], detail: ["Birinci kişi yok, ikinci ve üçüncü kişi var: siz grubu.", "En yakın ad (Ece) üçüncü kişi diye ek seçilmez."] },
    { cells: ["Sen ve ben geleceksiniz.", "biz olmalı", "bozuk"], tones: [undefined, "warn", "warn"], detail: ["Çoğul ek taşısa da birinci kişi önceliğini karşılamaz.", "Tekil–çoğul uyumu ile kişi uyumunu ayrı denetle."] },
    { cells: ["Arkadaşlar, gelin.", "hitap", "uyumlu"], tones: [undefined, "muted", "c"], detail: ["“Arkadaşlar” hitaptır; yüklem muhataplara yönelir.", "Seslenme gerçek özneyle karıştırılmaz."] },
  ],
  foot: "Önce kimlerin özne grubuna gerçekten katıldığını göster, sonra kişi ekini seç.",
});

// paragrafa-giris · 1 · Giriş, gelişme, kapanış.
const paraFlow = flowFig({
  caption:
    "Giriş, gelişme ve kapanış birer işlev adıdır; her kısa paragraf üç ayrı cümleden oluşmak zorunda değildir. İleri ile işlevleri sırayla aç; her kartta bölümün arşiv örneklerinden biri var (örnekler ayrı bölümlerden alınmıştır, tek bir paragraf değildir).",
  alt: "Üç kart alt alta, oklarla bağlı. Giriş: konuyu ya da sahneyi açar, örnek Sabah arşivin kapısında uzun bir sıra vardı. Gelişme: açıklar, örneklendirir, gerekçelendirir, örnek Bazı belgelerin tarih etiketi yoktu. Kapanış: bağlar, özetler ya da sahneyi bitirir, örnek Böylece aradığımız kayda birkaç dakikada ulaştık.",
  nodes: [
    { head: "Giriş: konuyu ya da sahneyi açar", text: "“Sabah arşivin kapısında uzun bir sıra vardı.”", tone: "c", note: "Tanım, soru, gözlem, genel yargı ya da kişisel olay giriş olabilir. Uygunluğu, ardından gelen cümlelerin neyi geliştirdiği belirler." },
    { head: "Gelişme: yargıyı ilerletir", text: "“Bazı belgelerin tarih etiketi yoktu.”", tone: "b", note: "Bu ayrıntı kayıtların bulunmasının neden güçleştiğini somutlaştırır. Sor: hangi daha geniş yargıyı gösteriyor?" },
    { head: "Kapanış: bağlar ya da bitirir", text: "“Böylece aradığımız kayda birkaç dakikada ulaştık.”", tone: "a", note: "Önceki işlemlerin sonucunu verir. Her son cümlede “sonuç olarak” gibi bir işaret bulunmaz." },
  ],
  steps: ["Giriş", "Gelişme", "Kapanış"],
  foot: "Yeri belirlerken önceki ve sonraki bağları, ana düşünceye katkıyı ve bitiş etkisini birlikte değerlendir.",
});

// paragrafa-giris · 2 · Konu, ana düşünce, yardımcı düşünce.
const topicLayers = rowsFig({
  caption:
    "Bölümün arşiv örneğinde konu, ana düşünce ve ayrıntı (yardımcı düşünce) üç ayrı sorunun yanıtıdır; çok geniş ve çok dar adaylar konuyu bozar. Bir satıra tıkla: hangi soruyu yanıtladığı açılır.",
  alt: "Beş satır: konu kent arşivleri; ana düşünce arşivlerin işe yaraması kayıtların erişilebilir düzenlenmesine bağlıdır; ayrıntı temel yargının bir parçasını destekler; çok geniş aday kültür; çok dar aday tek bir belge örneği.",
  rows: [
    { head: "Konu", text: "“Kent arşivleri”", tone: "c", detail: ["Konu neyin anlatıldığını verir.", "Sırf en çok geçen adı bulmak ana düşünceyi vermeyebilir."] },
    { head: "Ana düşünce", text: "“Arşivlerin işe yaraması, kayıtların erişilebilir biçimde düzenlenmesine bağlıdır.”", tone: "b", detail: ["Ana düşünce o konuda iletilen temel yargıdır.", "Her zaman son cümlede yazılı değildir; başta verilebilir ya da bütün ilişkiden çıkarılabilir."] },
    { head: "Ayrıntı (yardımcı düşünce)", text: "temel yargının bir parçasını destekler", tone: "a", detail: ["Ayrıntı ana düşüncenin bir parçasını destekler.", "Salt ayrıntı olması cümleyi gereksiz yapmaz."] },
    { head: "Çok geniş aday", text: "“kültür”", tone: "warn", detail: ["“Kültür” demek, arşivlerin erişimi üzerine kurulmuş metnin özgül yönünü kaybettirir.", "Konu metnin gerçekten işlediği yönü korumalıdır."] },
    { head: "Çok dar aday", text: "tek bir belge örneği", tone: "warn", detail: ["Çok dar bir belge örneğini bütün konu gibi sunmak diğer cümleleri dışarıda bırakır.", "Örnek, konunun kendisi değildir."] },
  ],
  foot: "Bütün paragrafın hangi mesaj için kurulduğunu sor.",
});

// paragrafa-giris · 3 · Gönderme sözü öncül arar.
const reference = tableFig({
  caption:
    "Gönderme sözü (bu, o, aynı) bir öncül arar. Bir cümleye tıkla: öncülün nerede olduğu ve sıralamaya etkisi açılır. Gönderme her zaman önceki ayrı cümleye gitmez.",
  alt: "Üç satırlı tablo: Bu nedenle kayıtlar tarandı, öncül taramaya yol açan neden, önceki cümle. O da aynı yöntemi kullandı, öncül kişi ve yöntem. Eski belgelerin dağınık oluşu bu belgeleri bulmayı güçleştiriyor, öncül aynı cümlede.",
  cols: [
    { name: "Cümle", w: 5.0 },
    { name: "Aranan öncül", w: 2.8 },
    { name: "Öncül yeri", w: 2.2 },
  ],
  rows: [
    { cells: ["“Bu nedenle kayıtlar tarandı.”", "taramanın nedeni", "önceki cümle"], tones: [undefined, "b", "warn"], detail: ["“Bu nedenle” taramaya yol açan nedeni aratır.", "Açık öncül bağı, cümlenin daha önce gelmesi gereken bir cümleye bağlı olduğunu gösterir."] },
    { cells: ["“O da aynı yöntemi kullandı.”", "kişi ve yöntem", "önceki cümle"], tones: [undefined, "b", "warn"], detail: ["Kişinin kim, yöntemin ne olduğunu bilmemizi gerektirir.", "Öncülü bulmadan yalnız zamir etiketini sayma."] },
    { cells: ["“Eski belgelerin dağınık oluşu, bu belgeleri bulmayı güçleştiriyor.”", "eski belgeler", "aynı cümle"], tones: [undefined, "b", "c"], detail: ["“bu belgeler” aynı cümledeki eski belgelere döner.", "Bu, o, aynı ya da de görülmesi otomatik giriş yasağı değildir."] },
  ],
  foot: "Tam cümledeki gerçek referansı ve paragrafın başlangıç bağlamını birlikte denetle.",
});

// paragrafa-giris · 4 · Zaman sırası.
const timeOrder = timelineFig({
  caption:
    "Olaya dayalı paragrafta sık görülen sıra: hazırlık, uygulama, sonuç (bölümün tohum örneği). Bir durağa tıkla: zaman işaretinin ve neden-sonuç ilişkisinin nasıl denetleneceği açılır. Zamanca önce olmak neden olmak demek değildir.",
  alt: "Düşey çizelge, üç durak: önce hazırlık, tohum ekme; sonra uygulama, filizlenmeyi izleme; en son sonuç, ölçümleri karşılaştırma.",
  eras: [
    { when: "önce", head: "Hazırlık", text: "tohum ekme", tone: "c", detail: ["Hazırlık genellikle önce anlatılır.", "Anlatıcı geriye dönüş yapabilir; her geçmiş zamanlı cümle otomatik ilk olay değildir."] },
    { when: "sonra", head: "Uygulama", text: "filizlenmeyi izleme", tone: "b", detail: ["“Önce, sonra, o gün, ertesi sabah” işaretlerinin gerçekten hangi olaya bağlandığını sor.", "Zaman sözcüğünü görmek yetmez; bağlandığı olayı göster."] },
    { when: "en son", head: "Sonuç", text: "ölçümleri karşılaştırma", tone: "a", detail: ["Sonuç, önceki adımlara dayanır.", "Bir olayın ötekinden önce olması onu tek başına neden yapmaz; gizli sebep ekleme."] },
  ],
  foot: "Zamanı, kişi odağını ve açıklanan olayı aynı çerçevede tutarak hem kronolojiyi hem düşünce yönünü koru.",
});

export const turkishFigures060Sentence: Record<string, Record<string, FigureDef>> = {
  "cumle-turleri": {
    "Dört soru, tek etiket değil": fourAxes,
    "Yüklemin türü: isim mi, çekimli fiil mi?": predicateKind,
    "Anlam: biçim, olumsuzluk ve soru amacı": meaning,
    "Sıralı ile bağlı: ne bağlanıyor?": structure,
  },
  "anlatim-bozukluklari": {
    "Anlam ile yapı iki ayrı denetimdir": faultTree,
    "Gereksiz bilgi ile bilinçli vurguyu ayır": redundancy,
    "Her yüklemin istediği hâli ayrı sor": caseDemand,
    "Kişi önceliği: ben, sen ve o aynı grupta": personRank,
  },
  "paragrafa-giris": {
    "Gelişme yargıyı ilerletir": paraFlow,
    "Konu ile ana düşünceyi ayır": topicLayers,
    "Gönderme sözü öncülünü arar": reference,
    "Zaman sırası ile neden sırası": timeOrder,
  },
};
