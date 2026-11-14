import type { LessonGuide, WorkedExample } from "./types";

const worked = (
  title: string,
  prompt: string,
  strategy: string,
  evidence: string,
  reasoning: string,
  answer: string,
  pitfall: string,
): WorkedExample => ({
  title,
  prompt,
  strategy,
  steps: [
    { label: "Başlangıcı ve bağlamı kur", explanation: evidence },
    { label: "Değişimi veya görevi kanıtla", explanation: reasoning },
  ],
  answer,
  check:
    "Sonucu başlangıç biçimi ve verilen cümleyle yeniden karşılaştır. Açıklamada kullanılmayan bir varsayımı cevaba ekleme.",
  pitfall,
});

export const soundGuide: LessonGuide = {
  id: "ses-bilgisi",
  minutes: 60,
  objectives: [
    "Ses, harf ve heceyi ayır; ünlüleri üç özellik bakımından sınıflandır.",
    "Büyük ve küçük ünlü uyumunu ayrı ölçütlerle denetle.",
    "Ses olayını kök ve ekin önceki/sonraki biçiminden kanıtla; istisnaları koru.",
    "Bir sözcükte birden fazla olay bulunabileceğini, ulama ve yazımın farklı olduğunu açıkla.",
  ],
  sections: [
    {
      title: "İlk iş: duyulan ses ile yazılan harfi ayır",
      paragraphs: [
        "Ses konuşmanın işitilebilir birimi, harf ise yazıdaki işaretidir. Türk alfabesinde 29 harf bulunur: 8 ünlü, 21 ünsüz. Bu, bütün söyleyiş ayrıntılarının yalnız 29 farklı ses olduğu anlamına gelmez. Ünlüler a, e, ı, i, o, ö, u, ü’dür. I–ı ve İ–i çiftlerini ayır; Türkçe sözcüğü incelemek için İngilizce küçük harfe çevirme mantığı kullanma.",
        "Bu anlatımda artı işareti kök/ek sınırını gösterir: kitap + ı. Karşılaştırma için kullanılan ara biçim, sözlükte doğru yazım önerisi değildir. ‘Kitap + da’ yazıp kitapta sonucuna geçmek, ekin d/t biçimlerini görünür kılar; kitapda yazımını önermez. Bir son harften ses olayı uydurmak yerine önce anlamı koruyan başlangıç biçimini bul.",
      ],
    },
    {
      title: "Ünlünün üç özelliğini birlikte izle",
      paragraphs: [
        "Kalınlık/incelik dilin konumuyla, düzlük/yuvarlaklık dudaklarla, genişlik/darlık ağız açıklığıyla ilgilidir. Aynı ünlü üç sınıfa birden girer: u kalın, yuvarlak ve dardır. ‘Dar ünlü var’ bilgisi, o sözcükte daralma yaşandığını tek başına göstermez; bunun için önceki bir geniş ünlünün değişmiş olması gerekir.",
        "Sert ünsüzler f, s, t, k, ç, ş, h, p’dir. Anımsatıcı sözcüğün içindeki ünlüleri bu listeye katma. Yumuşamada özellikle p, ç, t, k sonlarıyla ilgileniriz; bütün sert ünsüzlerin aynı biçimde yumuşadığını söylemeyiz.",
      ],
      table: {
        headers: ["Ünlü", "Kalınlık", "Dudak", "Açıklık"],
        rows: [
          ["a", "Kalın", "Düz", "Geniş"],
          ["ı", "Kalın", "Düz", "Dar"],
          ["o", "Kalın", "Yuvarlak", "Geniş"],
          ["u", "Kalın", "Yuvarlak", "Dar"],
          ["e", "İnce", "Düz", "Geniş"],
          ["i", "İnce", "Düz", "Dar"],
          ["ö", "İnce", "Yuvarlak", "Geniş"],
          ["ü", "İnce", "Yuvarlak", "Dar"],
        ],
      },
    },
    {
      title: "Büyük ünlü uyumu: aynı kalınlık grubunda mı?",
      paragraphs: [
        "Birden çok heceli sözcüğün ünlüleri hep kalın veya hep inceyse büyük ünlü uyumundan söz edilir. ‘Arı’da a–ı kalın, ‘çiçek’te i–e ince gruptadır. ‘Kitap’ta i ince, a kalındır; büyük uyuma uymaz. Ünlüleri sırayla çıkarmak, uzun sözcüğün görünüşünden karar vermekten daha güvenilirdir.",
        "Tek heceli sözcükte karşılaştırılacak iki ünlü bulunmadığından bu uyum aranmaz. Alıntı sözcükler, bazı Türkçe sözcükler ve bazı ekler kurala uymayabilir. Uyum bozuldu diye sözcüğün yazımını kendin değiştirme; örneğin kitap doğru bir sözcüktür. Bir uyum ölçütü ile yazımın doğruluğu aynı karar değildir.",
      ],
    },
    {
      title: "Küçük ünlü uyumu: her komşu geçişi denetle",
      paragraphs: [
        "Düz ünlüden sonra düz ünlü; yuvarlak ünlüden sonra dar-yuvarlak veya geniş-düz ünlü beklenir. Düz grup a, e, ı, i; dar-yuvarlak grup u, ü; geniş-düz grup a, e’dir. Her ünlüyü hemen önceki ünlüye göre değerlendir. Çocukta o→u uygunken kavunda a→u geçişi bu örüntüye uymaz.",
        "Kavun, ünlülerinin ikisi de kalın olduğu için büyük uyuma uyar; ikinci ünlüsü düzden sonra yuvarlak geldiği için küçük uyuma uymaz. Bir uyumun bulunması ötekini garanti etmez. Değişmeyen parçalar taşıyan -yor gibi eklerde ve alıntılarda bütün kelimeye mekanik bir uyum kuralı zorlanmaz.",
      ],
    },
    {
      title: "Ünlü düşmesi ile daralma: eksildi mi, değişti mi?",
      paragraphs: [
        "Ünlü düşmesinde önceki biçimde var olan ünlü son biçimde bulunmaz: burun + u → burnu. Kökteki ikinci u düşer; sona gelen u durur. Omuz + u → omzu ve sabır + et → sabret başka örneklerdir. Her iki heceli tabanda düşme olmaz: oyun + u → oyunu. Sırf benzer bir yapı gördün diye ‘oynu’ gibi bir biçim kurma.",
        "Daralmada ünlü kaybolmaz; a/e dar ünlüye dönüşür. Bekle + yor → bekliyor örneğinde e, i olmuştur. Başla + yor → başlıyor örneğinde a, ı olur. Buna karşılık gül + üyor sözcüğünde kök gül’dür; daralacak son a/e yoktur. -yor gördüğün her sözcükte daralma işaretleme.",
        "Başlayacak, ‘başlıyacak’ yazılmaz; -yor önündeki daralma bütün y’li eklemelere taşınmaz. De ve ye fiillerinin diyecek, yiyecek gibi bazı biçimleri ayrıca öğrenilir; bütün çekimlerine tek bir dönüşüm uygulama. Ben + e → bana ve sen + e → sana değişimleri de a/e’nin dar ünlüye dönüşmesi değildir; ünlü değişmesi diye ayır.",
      ],
    },
    {
      title: "Ünlü türemesi: ekin kendisini fazlalık sanma",
      paragraphs: [
        "Az + cık → azıcık biçiminde taban ve ekin beklenen seslerine ek bir ı görünür. Dar + cık → daracık da ünlü türemesidir. Buna karşılık ev + i → evi örneğinde i zaten ekin kendisidir; yeni ünlü görmek her zaman türeme değildir.",
        "Ses olayını adlandırmadan önce üç satır kur: ilk taban, ekin kendi sesleri, son sözcük. Böylece düşen, değişen veya bunlara ek olarak beliren sesi gösterirsin. Adı ezberleyip sözcüğe sonradan gerekçe yakıştırma; önce somut fark, sonra terim.",
      ],
    },
    {
      title: "Yumuşama kökte, benzeşme ek başında aranır",
      paragraphs: [
        "Ünlüyle başlayan ek geldiğinde kök sonundaki p/ç/t/k sesi b/c/d/g/ğ biçimine dönebilir. Kitap + ı → kitabı, kanat + ı → kanadı, renk + i → rengi. Değişen kökün sonudur. Ama her aday zorunlu değişmez: sütü ve atı örneklerinde t korunur. Tek heceli sözcüklerde hem değişen hem değişmeyen örnek bulunduğu için ‘hepsi’ veya ‘hiçbiri’ genellemesi kurma.",
        "Benzeşmede sert ünsüzden sonra ek başındaki c/d/g’nin ç/t/k biçimi kullanılır: kitap + da → kitapta; balık + cı → balıkçı; seç + gin → seçkin. Kitapta içindeki p değişmedi; ekin d’si t oldu. Böylece kitabı ile kitapta aynı kökten gelse de farklı ses olayları gösterir.",
        "Özel adın yazımında kökün harfini koru: Ahmet’i biçimi yazılır. Söyleyişteki değişimi yazıda Ahmedi biçimine dönüştürme. Yabancı kökenli kimi sözcüklerde de korunan son ünsüz bulunur; ‘hukuku’ örneği her k’nin ğ olacağı iddiasını sınırlar.",
      ],
    },
    {
      title: "Ünsüz düşmesi, türemesi ve aynı sözcükte iki olay",
      paragraphs: [
        "Küçük + cük → küçücük ve ufak + cık → ufacık biçimlerinde kökün k’si kaybolur; bu ünsüz düşmesidir. Hece sayısını tek başına ölçüt yapma, kaybolan sesi göster. His + i → hissi, hak + ı → hakkı, af + et → affet örneklerinde ise bir ünsüz ikizleşir; ünsüz türemesi vardır.",
        "Yan yana aynı iki harfin bulunması tek başına türeme kanıtı değildir; elli sözcüğünü uydurma bir önceki biçime ayırma. Kitapçığı örneğini ise basamaklandır: kitap + cık → kitapçık aşamasında benzeşme; kitapçık + ı → kitapçığı aşamasında yumuşama vardır. Tek sözcükte tek olay zorunluluğu yoktur.",
      ],
    },
    {
      title: "Yardımcı ses ile ulama farklı sınırları bağlar",
      paragraphs: [
        "Araba + y + a örneğinde y köke ait değildir; ekleme sınırında yardımcı sestir. Okul kaynaklarında y, ş, s, n yardımcı/kaynaştırma ünsüzleri birlikte incelenebilir: iki-ş-er, oda-s-ı, evi-n-e. n’nin bazı görevleri ayrıntılı kaynaklarda zamir n’si diye adlandırılır. Adlandırma ayrıntısı değişse de gerçek kökü, eki ve aradaki sesi açıkça göster.",
        "Her y ve n yardımcı ses değildir: yay sözcüğündeki y’ler kökün parçasıdır. Ulama ise ayrı iki sözcüğün söyleyişte bağlanmasıdır: ünsüzle biten sözcükten sonra ünlüyle başlayan sözcük gelir ve arada durak yoktur. ‘Güzel ev’ bu koşulla bağlanabilir; yazı bitişmez, harf eklenmez. Gerçek ses kaydı yoksa metinden ancak ulama imkânını saptayabilirsin.",
      ],
    },
    {
      title: "Hece ve vurgu: söyleyişi yazıyla karıştırma",
      paragraphs: [
        "Türkçe sözcüklerde hece sayısını ünlü sayısıyla denetleyebilirsin: bil-gi-sin-de dört ünlü ve dört hecedir. İki ünsüzün yan yana gelmesi ayrı bir hece oluşturmaz. Öğ-ren-ci üç hecedir. Heceleme, sözcüğün kök ve eklerine ayrılmasıyla aynı işlem değildir.",
        "Vurgu bir hecenin veya sözcüğün söyleyişte belirginleşmesidir. Birçok sözcükte son hece vurgulanır; yer adları, bazı ekler ve konuşmanın amacı istisnalar oluşturur. Bütün vurgu istisnalarını bu modelin tek şemasına sığdırmaya çalışma. Nötr fiil cümlesinde yüklemden önceki öge çoğunlukla odaktır; ‘Ece kitabı bugün aldı’ ile ‘Kitabı bugün Ece aldı’ aynı soruya odaklanmaz. Karşıt vurgu, gerçek konuşmada başka konumu öne çıkarabilir.",
      ],
    },
    {
      title: "Soru çözümü: terimden önce kanıt ve kapsam",
      paragraphs: [
        "Bir sözcük soruluyorsa anlamı koruyan kökü geri kur, ek basamaklarını ayır, değişen sesi ve tarafını göster, ardından adı koy. ‘Hangisi yoktur?’ sorusunda ise her aday olaya ayrı kanıt ara. Bir olayı bulman yokluk sorusunu bitirmez; var olan seçenekleri gerekçeyle eleyip kalan adayı tüm parçada yeniden kontrol et.",
        "Yanlış cevabı yalnız harfle düzeltme. İlk hatanın türünü yaz: kök yanlış mı, ünlü eksilmesiyle değişmesi karıştı mı, kök sonu yerine ek başı mı incelendi, olumsuz kök mü kaçtı? Sonra aynı ayrımı farklı bir sözcükte yeniden dene. Aşağıdaki etkileşim destekli öğretimdir; bağımsız soru kaydı Sorular’da oluşur.",
      ],
    },
  ],
  examples: [
    worked(
      "Burundan burnuna: kaybolanı say",
      "‘Burnu üşüdü.’ cümlesindeki burnu sözcüğünde hangi ses olayı vardır?",
      "Önce organ adını geri kur, sonra eki ekle.",
      "Taban burun, ek -u; kökte iki u varken son biçimde kökün ikinci u’su yoktur.",
      "Sonda görünen u ektir. Kökteki ünlünün kaybolması ünlü düşmesidir; a/e’nin dar bir ünlüye dönüşmesi söz konusu değildir.",
      "Ünlü düşmesi: burun + u → burnu.",
      "Son biçimde u bulunmasını daralma kanıtı sanma.",
    ),
    worked(
      "Aynı kök, farklı değişim",
      "Kitabı ile kitapta sözcüklerini karşılaştır; değişen ses nerede?",
      "Kökün son harfiyle ekin ilk harfini ayrı takip et.",
      "Kitap + ı → kitabı karşılaştırmasında p, b olur. Kitap + da → kitapta karşılaştırmasında d, t olur.",
      "İlk değişim kökteki yumuşama, ikincisi sert p’den sonraki ek başında benzeşmedir.",
      "Kitabı: yumuşama; kitapta: benzeşme.",
      "İki sözcüğün aynı kökten gelmesi aynı olayı taşıdıklarını göstermez.",
    ),
    worked(
      "Her -yor daralma değildir",
      "Bekliyor ve gülüyor sözcüklerinin hangisinde ünlü daralması vardır?",
      "Fiil kökünün son sesini bul.",
      "Bekle- e ile, gül- l ile biter. Bekle + yor biçimi bekliyor olur; gül + üyor biçiminde kök ünlüsü korunur.",
      "Bekle’de e → i değişmiştir. Gülüyor’daki ek ünlüsü, önceki bir kök a/e’sinin daralması değildir.",
      "Daralma yalnız bekliyor örneğinde kanıtlanır.",
      "Ekin görünüşünü kökün değişimi yerine koyma.",
    ),
    worked(
      "Gelecek zamanı yanlış genelleme",
      "‘Yarın çalışmaya başlayacak.’ cümlesinde başlayacak yerine başlıyacak yazılması savunulabilir mi?",
      "Daralma kuralının hangi ek önünde kurulduğunu sor.",
      "Başla- tabanına gelecek zaman -(y)acak gelir; doğru biçim başlayacak’tır.",
      "-yor önündeki a → ı değişimi, bu eklemeye otomatik taşınmaz.",
      "Hayır; doğru yazım başlayacak.",
      "Her y sesini daraltıcı bir işaret sayma.",
    ),
    worked(
      "Ekin ünlüsünü türeme sanma",
      "Azıcık ve evi sözcüklerinde görünen i/ı sesleri aynı şekilde mi oluşmuştur?",
      "Taban ile ekin kendi seslerini say.",
      "Az + cık karşılaştırmasına son biçimde bir ı eklenir. Ev + i karşılaştırmasında i zaten ekin kendisidir.",
      "Azıcıkta ünlü türemesi vardır; evi biçimindeki olağan ekleme türeme sayılmaz.",
      "Azıcık: türeme; evi: bu açıdan ses olayı yok.",
      "Son sözcükte yeni görünen her harf türeme değildir.",
    ),
    worked(
      "Süt karşı örneği",
      "Bir öğrenci ‘Sonu t olan her kök ünlü ek alınca d olur’ diyor. Sütü bu kuralı nasıl sınırlar?",
      "Zorunluluk iddiasını tek geçerli karşı örnekle denetle.",
      "Süt + ü → sütü biçiminde t korunur; sözcük doğru yazılmıştır.",
      "p/ç/t/k sonları yumuşama için aday olabilir; bütün adayların zorunlu değişmesi ayrı ve yanlış bir genellemedir.",
      "Genel iddia yanlıştır; sütü’nde yumuşama yoktur.",
      "Bir istisna, kitabı örneğindeki gerçek değişimi yok saydırmaz.",
    ),
    worked(
      "Küçültmede kaybolan ünsüz",
      "Küçücük sözcüğünde kaybolan ses ünlü mü, ünsüz mü?",
      "Başlangıç küçük ile eki -cük karşılaştır.",
      "Küçük + cük kurulumu küçücük biçimini verir; kökün son k’si görünmez.",
      "Kaybolan k ünsüzdür. Olay ünsüz düşmesidir; görünen ünlülerden daralma sonucu çıkarılmaz.",
      "Ünsüz düşmesi, k kaybı.",
      "Sadece hece sayısını karşılaştırmak olayın adını vermez.",
    ),
    worked(
      "Hissin iki s’si",
      "Hissi biçiminde ünsüz türemesini nasıl kanıtlarsın?",
      "Geçerli başlangıcı ve ekini göster.",
      "His + i karşılaştırmasında kökte tek s bulunur; hissi biçiminde iki s vardır.",
      "Fazladan bir s ortaya çıkmıştır. Ama elli gibi bir sözcükte yalnız ll görmek aynı kanıtı sağlamaz.",
      "His + i → hissi: ünsüz türemesi.",
      "İkiz harf görmek ile türeme kanıtlamak aynı şey değildir.",
    ),
    worked(
      "Kitapçığında iki ayrı basamak",
      "Kitapçığı sözcüğünde neden iki ses olayı gösterilebilir?",
      "Tek büyük sıçrama yerine iki ekleme yap.",
      "Önce kitap + cık → kitapçık; sonra kitapçık + ı → kitapçığı.",
      "İlkinde c → ç ek başı benzeşmesi, ikincide k → ğ kök/gövde sonu yumuşamasıdır.",
      "Benzeşme ve yumuşama birlikte vardır.",
      "Kitap kökünün p’si değişmedi; yumuşayan sonradan oluşan gövdenin k’sidir.",
    ),
    worked(
      "Kavunda iki uyumu ayır",
      "Kavun sözcüğünün büyük ve küçük ünlü uyumlarını, hece sayısını belirle.",
      "Önce ünlü dizisini çıkar: a, u.",
      "İki ünlü de kalındır. Ancak düz a’dan sonra gelen u yuvarlaktır.",
      "Büyük uyum vardır; küçük uyumdaki düzden sonra düz koşulu sağlanmaz. İki ünlü iki hece verir: ka-vun.",
      "Büyük uyuma uyar, küçük uyuma uymaz; iki hecelidir.",
      "Uyum bozulmasını yanlış yazım diye düzeltmeye çalışma.",
    ),
    worked(
      "Bağlanan sözcükler bitişmez",
      "‘Uzak ev’ ifadesi duraksız söylenirse ulama olabilir mi? ‘Uzak, ev’ arasında durak varsa ne değişir?",
      "Sözcük sonu, sonraki başlangıç ve durak koşulunu kontrol et.",
      "Uzak k ünsüzüyle biter; ev e ünlüsüyle başlar. Duraksız söyleyiş bağlanmaya elverişlidir.",
      "Araya gerçek durak girerse bağlanma yapılmaz. Her iki durumda da yazı ayrı kalır; yardımcı bir harf eklenmez.",
      "İlkinde ulama imkânı var; duraklı ikincide yok.",
      "Ses kaydı olmadan gerçekten hangi söyleyişin yapıldığını kesinleştirme.",
    ),
    worked(
      "Yokluğu seçenek seçenek denetle",
      "‘Ağzı kuruyunca kitabı kapattı; küçücük masada bir bardak duruyordu.’ cümlesinde ünlü düşmesi, yumuşama, ünsüz düşmesi ve ünsüz türemesinden hangisi yoktur?",
      "Her aday için bir önce/sonra kanıtı ara.",
      "Ağız + ı → ağzı ünlü düşmesi; kitap + ı → kitabı yumuşama; küçük + cük → küçücük ünsüz düşmesidir.",
      "Verilen sözcüklerde bir ünsüzün ikizleşmesine dayanan türeme kanıtı yoktur. Üç varlık kanıtını kurduktan sonra yokluğu seç.",
      "Ünsüz türemesi yoktur.",
      "Olumsuz kökte bulduğun ilk var olayı cevap diye işaretleme.",
    ),
  ],
  recall: [
    {
      prompt: "Burnu ile bekliyor niçin aynı ses olayı değildir?",
      answer:
        "Burun → burnu’da bir ünlü eksilir; bekle → bekliyor’da e, i’ye dönüşür. Eksilme ile değişme farklıdır.",
    },
    {
      prompt: "Kitapta sözcüğünde değişen ses kökte mi ektedir?",
      answer:
        "Ek başındadır: -da, sert p sonrasında -ta biçimindedir; kökün p’si korunur.",
    },
    {
      prompt: "Bir sözcük büyük uyuma uyup küçük uyuma uymayabilir mi?",
      answer:
        "Evet. Kavunda a ve u kalındır; fakat düz a’dan sonra yuvarlak u gelmesi küçük uyumu bozar.",
    },
    {
      prompt: "Ulama yazıda yeni bir harf üretir mi?",
      answer:
        "Hayır; ayrı sözcüklerin uygun ve duraksız söyleyişte bağlanmasıdır. Yazı bitişmez.",
    },
  ],
  source:
    "Aurelia TYT Türkçe Ses Bilgisi kopya kağıdı, PDF s.1–17 metninin tamamı karşılaştırıldı. Kaynağın aktardığı EBA/ÖSYM incelemeleri burada yeniden doğrulanmış resmî soru kaydı sayılmaz. Bu açıklamalar, model ve alıştırmalar uygulama için özgün yazılmıştır. İleri tarihsel ses bilgisi ve bütün vurgu istisnaları ayrı uzmanlık kapsamıdır.",
};

export const structureGuide: LessonGuide = {
  id: "sozcukte-yapi",
  minutes: 65,
  objectives: [
    "Kökü sözcüğün anlamıyla birlikte bul; ad ve fiil başlangıcını son türden ayır.",
    "Her ekin yapım veya çekim işlevini bağlamda kanıtla; gövdeleri sırayla kur.",
    "Basit, türemiş, birleşik sözcükleri uzunluk veya yazım yerine kuruluşlarıyla ayır.",
    "İyelik–belirtme ve olumsuzluk–isim-fiil gibi aynı biçimli parçaları çöz.",
  ],
  sections: [
    {
      title: "Kök, gövde ve ek: sözcüğün kuruluş hikâyesi",
      paragraphs: [
        "Kök, sözcüğün bugünkü anlamıyla ilişkili en küçük anlamlı başlangıç parçasıdır. Gövde, kökün en az bir yapım ekiyle genişlemiş biçimidir. Ek, kök ya da gövdeye bağlanır; her ek kendi başına sözcük değildir. Göz kök, gözlük bir gövde, gözlükçü başka bir gövdedir. Gözlükçüler çekim almış türemiş tabandır; çokluk ekinin gelmesi önceki türetmeyi silmez.",
        "Kökü yalnız en kısa anlamlı harf dizisi diye seçme. Balık sözcüğünün başındaki bal anlamlı görünür ama balık ile bal arasında gereken anlam ilişkisi yoktur; balık kökü korunur. Bu, okul düzeyinde güncel çözümlemedir; tarihsel kökeni belirsiz sözcükler için tahmin yürüterek parça uydurma. Fiil kökü gösterimindeki son kısa çizgi, örneğin yaz-, çözümleme işaretidir; sözcüğün yazımına eklenmez.",
      ],
    },
    {
      title: "Kökün türü, son sözcüğün türü değildir",
      paragraphs: [
        "Ad kökü bir varlık veya kavramı adlandırır: taş, göz, ev. Fiil kökü iş, oluş veya hareket bildirir: bak-, koş-, yaz-. -mak/-mek denemesi, anlam korunuyorsa son tabanın fiil olup olmadığını anlamaya yardım eder. Taşladı → taşlamak denemesi son tabanın fiil olduğunu gösterir; ilk kökün taş adlı bir ad kökü olduğu gerçeğini değiştirmez. Taş + la- aşamasını atlama.",
        "Aynı ses dizisi farklı bağlamlarda farklı kökler olabilir: ‘Yaz geldi’ mevsim adı, ‘Adını yaz’ eylemidir; anlam ilişkisi kurulmadığından sesteştir. ‘Tadı güzel’ ile ‘Yemeği tat’ örneklerinde tat ad ve fiil kullanımları arasında anlam ilişkisi vardır; ortak/kökteş kök diye incelenir. Tek sözcük görünüşü bağlamın görevini belirlemeye yetmez. Pat, cız gibi yansıma tabanlar okul sınıflamasında ad kökü grubundadır; pat-la- bir türetmedir.",
      ],
    },
    {
      title: "Yapım eki: yeni bir taban kuruldu mu?",
      paragraphs: [
        "Yapım eki yeni sözcük veya gövde oluşturur. Tür değiştirebilir; fakat değiştirmesi şart değildir. Tuz adından tuzluk adlı nesne türetilir: ikisi de ad soyludur ama yeni taban vardır. Tuz + la- ise addan fiil türetir. Eki saymadan önce tabanın önceki ve sonraki anlamını birer kısa cümleyle söyle.",
        "Birden fazla yapım ekinde her ara tabanı kur: göz → gözlük → gözlükçü. ‘Gövdeden türemiş’ ifadesi bu düzeyde en az iki türetme basamağına işaret eder. -lık/-lik/-luk/-lük aynı ekin uyumlu biçimleridir; her ses değişimini yeni bir ek sanma. Kitaplığı biçimindeki k→ğ yumuşaması da yapım eki sayısını artırmaz.",
      ],
      table: {
        headers: ["İlişki", "Örnek", "Yeni taban"],
        rows: [
          ["Ad → ad", "tuz + luk", "Tuzun konduğu nesne"],
          ["Ad → fiil", "tuz + la-", "Tuz katma işi"],
          ["Fiil → ad", "bil- + gi", "Bilinen şey/kavram"],
          ["Fiil → fiil", "yaz- + dır-", "Yazma işini yaptırma"],
        ],
      },
    },
    {
      title: "Ad çekimi: aynı sözcük cümleye bağlanır",
      paragraphs: [
        "Çekim eki sözcüğün cümledeki ilişkisini, sayısını, kişisini veya zamanını kurar. Ev + ler çokluk; ev + im iyelik; ev + e yönelme; ev + de bulunma; ev + den ayrılma; ev + in kapısı tamlayan ilgisi gösterir. Bir adın görünür hâl eki almamış biçimi yalın hâlde olabilir; yalın olması hiç ek almadığını söylemez.",
        "Evlerimizden sözcüğü uzun olsa da ev + ler + imiz + den diye yalnız çekimlerle kurulmuştur; yeni sözlük tabanı veya birleşme yoktur, yapı basittir. Bir ek bazı bağlamlarda yeni anlamı kalıplaştırıp yapım görevi üstlenebilir; bu yüzden ekin yalnız sesine bakmak yerine verilen sözcükteki işlevini incele. Bağlaç de/da ayrı yazılır ve ekin -te/-ta biçimleriyle aynı unsur değildir: ‘Evde kaldı’ ve ‘Ev de boş’ farklıdır.",
      ],
    },
    {
      title: "Aynı i sesi, farklı görev: iyelik ve belirtme",
      paragraphs: [
        "‘Onun defteri masada’ cümlesinde defter + i sahiplik bildirir: kimin defteri? Onun. ‘Defteri masaya koy’ cümlesinde aynı görünen -i, eylemin belirli nesnesini kurar: neyi koy? Defteri. Tek bir harf görünüşünden görev seçilemez. ‘Evin’ de senin evin veya evin çatısı bağlamlarında farklı çözümlenebilir; gerekirse belirsizliği açık bırak.",
        "Aynı sözcükte iki görev bulunabilir: ‘Onun kitabını okudum’ cümlesinde kitap + ı + n + ı. İlk ı iyelik, n yardımcı ses, son ı belirtmedir; yazıda kitap kökünün p’si b olur. Yardımcı sesi ayrı yapım eki sayma. Çanta-sı ile çanta-y-ı karşılaştırması, görünüşü daha açık bir sahiplik/nesne çifti kurar.",
      ],
    },
    {
      title: "Fiil çekimi ve aynı biçimli eklerin tuzağı",
      paragraphs: [
        "Gel-di-m biçiminde -di geçmiş zaman, -m kişi çekimidir; ev-im biçimindeki -(i)m ise iyeliktir. Ses benzerliği görevleri birleştirmez. Haber kipleri zaman ilişkileri, dilek kipleri gereklilik, istek, koşul veya emir gibi kullanımlar kurar. Kip ile kişinin ayrılması, yüklemde kaç farklı görev bulunduğunu açık tutar.",
        "‘Burada koşma!’ olumsuz emir, ‘Koşma alışkanlığı edindim’ eylem adlandırmasıdır. İlk -ma olumsuzlukla fiili kullanır; sırf bu ek geldi diye türemiş sayılmaz. İkincisi isim-fiildir. Okul düzeyinde fiilimsilerin ad/sıfat/zarf görevi kuran ekleri yapım işlevli ele alınır; fakat bütün fiilimsi ve çatı ayrıntıları ayrı ünitede ilerletilir. ‘Gelecek günler’ ifadesindeki niteleme ile ‘Yarın gelecek’ yüklemindeki zaman görevini de bağlam belirler.",
      ],
    },
    {
      title: "Kipleri zaman ve tasarlama ilişkileriyle öğren",
      paragraphs: [
        "Haber kiplerinde görülen geçmiş zaman (-dı), öğrenilen geçmiş zaman (-mış), şimdiki zaman (-(I)yor), gelecek zaman (-acak) ve geniş zaman (-r/-ar/-ır) biçimleri sık karşılaşılır. Burada I, ı/i/u/ü uyumlu biçimlerini gösteren çözümleme işaretidir; büyük harf olarak kelimeye yazılmaz. Ses uyumu veya benzeşme aynı ekin -di/-du/-tı gibi yüzey biçimlerini oluşturabilir.",
        "Dilek kiplerinde gereklilik -malı/-meli, koşul -sa/-se, istek -a/-e biçimleriyle; emir ise bu düzeyde ayrı kip eki olmadan kişi ve emir anlamıyla incelenir. Gel-di-m, gel-meli-y-im ve gel-se-m örneklerinde kipten sonra kişiyi ayrıca gör. Zaman eki gibi görünen bir parça sıfat-fiil görevinde de bulunabilir; gelecek hafta sözü ile yarın gelecek yüklemini aynı işlevde çözme.",
      ],
      table: {
        headers: ["Görev", "Örnek", "İlişki"],
        rows: [
          ["Görülen geçmiş", "geldim", "-di geçmiş, -m kişi"],
          ["Öğrenilen geçmiş", "gelmiş", "Dolaylı öğrenilen geçmiş anlatımı"],
          ["Şimdiki zaman", "geliyor", "-(i)yor zaman çekimi"],
          ["Gelecek", "gelecek", "Cümlede yüklemse gelecek zaman"],
          ["Geniş", "gelir", "Geniş zaman kullanımı"],
          ["Gereklilik", "gelmeli", "Gereklilik bildirir"],
          ["Koşul", "gelse", "Koşula bağlar"],
          ["İstek", "geleyim", "İstek ve kişi"],
          ["Emir", "gel", "Emir anlamı; ayrı kip eki yok"],
        ],
      },
    },
    {
      title: "Çokluk, ilgi ve ek-fiilde bağlamı koru",
      paragraphs: [
        "-lar/-ler her cümlede yalnız sayılabilir çokluğu anlatmayabilir: aile, saygı, benzerlik veya abartma anlamı bağlamla kurulabilir. Bu özel anlamları görmek eki kendiliğinden yapım eki yapmaz. Ad üzerindeki çoklukla geldiler yüklemindeki kişi bildirimi de aynı ses dizisini farklı görevlerle kullanır. ‘Öğrencilerden biri’ örneğinde -den, tamlama ilişkisinde tamlayan görevine katkı verebilir; çekim görevi söz içindeki ilişkiyle açıklanır.",
        "Masadaki kitap ifadesinde -ki bir adı niteler; benimki örneğinde adın yerini tutan ilgi zamiri görevi vardır. Okul sınıflamasında ilgi zamiri olan -ki çekim işleviyle incelenir; aynı harfleri gördün diye bütün -ki’leri tek bir göreve yerleştirme. Evde kaldı / ev de boş ayrımında ise bağlı hâl ekiyle ayrı bağlaç farklı unsurlardır.",
        "Güzeldi sözcüğünde güzel ad soylu tabanı, ek-fiille geçmiş zamanda yüklem olur; yeni bir güzel sözcüğü türetilmez. Mutluyum biçimindeki yüklem/kişi ilişkisi de yapım diye sayılmaz. Eklerin bütün ses ayrıntıları başka ünitelerde ilerletilse de bu derste görev sınıfını anlamla kanıtlayabilmelisin.",
      ],
    },
    {
      title: "Sıra kuralı bir örüntüdür; istisnayı saklama",
      paragraphs: [
        "Yaygın sıra kök → yapım → çekimdir: göz + lük + ler. Ancak ‘Annemsiz gitmem’ cümlesindeki anne + m + siz çözümünde önce iyelik çekimi, sonra yokluk niteliği türeten yapım bulunur. Bu karşı örnek ‘yapım her zaman çekimden önce gelir’ önermesini sınırlar. İstisna görmek, diğer sözcüklerde ek görevini denetlemekten vazgeçmek değildir.",
        "Sondan açık çekimleri ayırmak çözümü hızlandırabilir, ama kök ve ek zincirini anlamla geri kur. Bir sesin ek sınırında değişmesi yeni morfolojik basamak üretmez. Kuralı ezberledikten sonra onu bozabilecek geçerli örneği de bilmek, yeni soruda aşırı genellemeyi engeller.",
      ],
    },
    {
      title: "Basit, türemiş, birleşik: yazımdan önce oluşum",
      paragraphs: [
        "Basit sözcük yapım eki almamış ve birleşmeyle kurulmamıştır; çekim alabilir. Türemiş sözcükte en az bir yapım eki bulunur. Birleşik sözcükte birden çok sözcük yeni kavram veya eylem birliği kurar. Biçerdöver birleşik bir tabandır; çokluk aldığında birleşik oluşu silinmez. Mavi kalem gibi sıradan sıfat tamlaması ise yalnız iki kelime olduğu için birleşik sözcük değildir.",
        "Birleşik fiil ayrı da yazılabilir: yardım etmek. Hissetmek ses değişimiyle bitişik yazılır; ikisi de yardımcı fiille kurulabilir. Sonradan ek almış birleşik tabanlarda tabanın kuruluşunu ve son ekin görevini ayrı anlat. Birleşik oluşumla türetmenin birlikte yer aldığı karmaşık bir örneği, kaynak ve soru ölçütünü okumadan tek basit etiketle kapatma.",
      ],
    },
    {
      title: "Birleşik fiilleri üç yoldan tanı",
      paragraphs: [
        "Yardımcı eylemle kurulanlarda ad soylu parça ve et-/ol-/kıl-/eyle- birlikte eylem kurar: yardım etmek, mutlu olmak. Ancak her olmak yardımcı değildir; ‘Yarın Ankara’da olacağım’ bulunma anlamı taşıyabilir. Anlamca kaynaşmış birleşik fiillerde bütünün özel anlamı vardır: kulak vermek dinlemektir. Sözcüklerin gerçek anlamda yan yana gelmesiyle bu deyim anlamını karıştırma.",
        "Kurallı birleşik fiillerde yeterlik -(y)Abil-, tezlik -(y)Iver-, sürerlik -(y)Adur/-(y)Akal/-(y)Agel-, yaklaşma -(y)Ayaz- biçimleri kullanılır: çözebilmek, açıvermek, süregelmek, düşeyazmak. Büyük A ve I işaretleri değişebilen ünlüleri gösterir; sözcüğe gerçek harf olarak A/I yazılmaz. Elindeki kitabı verdi cümlesindeki ver- her durumda tezlik parçası değildir.",
        "Yeterliğin olumsuzu bağlama göre ayrılır: çözemez yapamama, çözemeyebilir yapamama olasılığıdır. ‘Bil’ parçasını her yerde mekanik olarak silmek bütün anlamları üretmez. Birleşik fiilin ardından kip ve kişi çekimi gelebilir; yardım etti biçimindeki -ti çekimi birleşik tabanın geçmiş zaman kullanımıdır.",
      ],
    },
    {
      title: "Soru çözümünde üç kontrol: anlam, görev, sonuç",
      paragraphs: [
        "Birinci kontrol: kökü daha küçük ayırınca anlam ilişkisi korunuyor mu? İkinci kontrol: her ek yeni taban mı oluşturuyor, aynı tabanı mı cümleye bağlıyor? Üçüncü kontrol: birleşme var mı ve verilen soru hangi düzeyi istiyor? Yapım eki adedi, kökün türü ve son sözcüğün yapı türü aynı cevap değildir.",
        "Bağlam görevini kendi cümlenle söyle: sahip olan mı, bulunan nesne mi, eylemi yapan mı? Çözümde ilk hatayı bulduktan sonra koşulu değiştir: evlerimizden yerine evsizlerimizden verilince tek -siz yeni bir taban kurar, yapı türemişe döner; sondaki -den aynı ayrılma görevini sürdürür. Modelde parçaları tek tek seçip bu değişimi açıklayabilirsin. Destekli keşif bağımsız soru sonucu veya konu tamamlanması oluşturmaz.",
      ],
    },
  ],
  examples: [
    worked(
      "Balığı bala indirme",
      "Balıklar sözcüğünde kök bal olabilir mi?",
      "Ses benzerliğini anlam bağıyla kontrol et.",
      "Bal ile balığın güncel anlamları arasında bu türetmeyi kuran ilişki yoktur. Balık + lar çözümü kökü korur.",
      "-lar çokluk çekimidir; bu sözcükte yeni taban oluşturmaz.",
      "Kök balık; yapı basit.",
      "En kısa anlamlı görünen parça otomatik kök değildir.",
    ),
    worked(
      "Son fiilden ilk ada dön",
      "‘Aşçı yemeği tuzladı’ cümlesinde tuzladı sözcüğünün ilk kökü ve ek görevleri nelerdir?",
      "Geçmiş zamanı çıkar, türemiş fiili ilk tabana geri götür.",
      "Tuz + la- yeni bir eylem kurar; ardından -dı geçmiş zamanı gelir.",
      "Tuz ad kökü, -la addan fiil yapımı, -dı çekimdir.",
      "Bir yapım ve bir çekim; ad kökünden türemiş fiil.",
      "Tuzlamak diyebilmek ilk kökün fiil olduğunu göstermez.",
    ),
    worked(
      "Gözden mesleğe iki basamak",
      "Gözlükçülerimizden biçiminde kaç yapım, kaç çekim eki vardır?",
      "Bütün ara tabanları sırayla kur.",
      "Göz → gözlük → gözlükçü; sonra -ler, -imiz, -den gelir.",
      "-lük ve -çü iki yapım; çokluk, iyelik ve ayrılma üç çekimdir. İki gövde oluşur.",
      "2 yapım, 3 çekim; türemiş tabanın çekimi.",
      "Ses uyumunun değiştirdiği biçimleri ayrıca yeni ek diye sayma.",
    ),
    worked(
      "Uzun ama basit",
      "Evlerimizden sözcüğünde üç ek bulunması onu neden türemiş yapmaz?",
      "Ek sayısını ekin görevinden ayır.",
      "Ev + ler + imiz + den; çokluk, bizimlik iyeliği, ayrılma ilişkisi kurulur.",
      "Hiçbir basamak yeni sözlük tabanı kurmaz, birleşme de yoktur.",
      "Basit sözcük; üç çekim eki var.",
      "Uzunluk ve çok ek, yapım eki kanıtı değildir.",
    ),
    worked(
      "Defteri: sahibi mi nesnesi mi?",
      "‘Onun defteri masada.’ ve ‘Defteri masaya koy.’ cümlelerindeki -i aynı görevde midir?",
      "Kimin ve neyi sorularını verilen cümleye yönelt.",
      "İlkinde kimin defteri? Onun. İkincide neyi koy? Defteri.",
      "İlk -i iyelik, ikinci -i belirtme hâli ekidir.",
      "Aynı ses, farklı çekim görevi.",
      "İlk sözcükteki i’yi kopyalayıp ikinci bağlamın görevini yok sayma.",
    ),
    worked(
      "Tek sözcükte iki farklı ı",
      "‘Onun kitabını okudum.’ cümlesinde kitabını nasıl kurulur?",
      "İyelikli nesneyi iki ilişki olarak çöz.",
      "Kitap + ı + n + ı: ilk ı onun sahipliğini, son ı belirli nesneyi gösterir.",
      "n yardımcı sestir; yazıda p → b yumuşar. Ne yardımcı n ne de yumuşama yeni yapım eki sayılır.",
      "İyelik + yardımcı n + belirtme; kök kitap.",
      "Aynı sözcükte hem iyelik hem hâl olabileceğini unutma.",
    ),
    worked(
      "Bir -me, iki görev",
      "‘Burada yüzme!’ ve ‘Yüzme yararlıdır.’ cümlelerindeki yüzme aynı kuruluşta mı?",
      "Yasaklama ile eylem adlandırmasını ayır.",
      "İlk cümle olumsuz emir verir; ikinci cümle yüzme işini ad olarak kullanır.",
      "İlk -me olumsuzluk; ikinci -me isim-fiil yapım işlevidir.",
      "Aynı görünüş farklı görev taşır.",
      "Noktalama değişse bile asıl belirleyici cümlenin anlam ve görevidir.",
    ),
    worked(
      "Çekimden sonra yapım",
      "‘Annemsiz yolculuğa çıkmam.’ cümlesindeki annemsiz, yaygın ek sırasını nasıl sınırlar?",
      "Önce sahipliği, sonra yokluk niteliğini kur.",
      "Anne + m: benim annem; sonra -siz yokluk niteliğini türetir.",
      "-m çekim, -siz yapımdır. Yapımın her zaman çekimden önce geldiği iddiasına karşı örnektir.",
      "Çekimden sonra yapım; son sözcük türemiş.",
      "İstisnayı görmek ek türlerinin kendisini geçersiz yapmaz.",
    ),
    worked(
      "Ayrı yazım birleşmeyi silmez",
      "Yardım etti ile hissetti biçimlerinin taban kuruluşunu karşılaştır.",
      "Yardımcı eylemle anlam birliğini ve ses olayını ayrı incele.",
      "Yardım + et- ayrı yazılır; his + et- birleşirken s ikizleşmesiyle hisset- olur.",
      "İkisinde de yardımcı fiilli birleşik taban ve ardından geçmiş zaman çekimi vardır.",
      "İkisi de birleşik fiil kullanımı; bitişik/ayrı yazım farklıdır.",
      "Ayrı yazıldı diye yardım etti’yi basit fiil sayma.",
    ),
    worked(
      "Sesteş ile ortak kökü ayır",
      "‘Yaz erken geldi / Adını yaz’ ile ‘Tadı güzel / Yemeği tat’ çiftleri arasında hangi fark vardır?",
      "Ad ve fiil kullanımları arasında anlam ilişkisi ara.",
      "Mevsim yaz ile yazma eylemi ilişkisizdir. Tat adı ile tatma eylemi ilişkilidir.",
      "Birinci çift sesteş, ikinci çift ortak/kökteş kök örneğidir.",
      "Yaz: sesteş; tat: ortak kök.",
      "Aynı ses dizisinin bulunması anlam ilişkisini otomatik kurmaz.",
    ),
    worked(
      "Gövdeyi bir kez daha türet",
      "Bilgisizler sözcüğünde neden gövdeden türeme vardır?",
      "İlk fiilden ad kur, sonra niteliğe geç.",
      "Bil- + gi → bilgi; bilgi + siz → bilgisiz; ardından çokluk -ler gelir.",
      "İlk iki basamak yapımdır; ikinci yapım zaten gövde olan bilgi’ye gelir. Çokluk çekimdir.",
      "2 yapım, 1 çekim; gövdeden türeme.",
      "Sondaki -ler’i üçüncü bir yapım basamağına dönüştürme.",
    ),
    worked(
      "Yeterliğin olumsuzunda anlamı koru",
      "Soruyu çözemez ve soruyu çözemeyebilir ifadeleri aynı kesinliği mi taşır?",
      "Yapamama ile olasılığı ayrı söyle.",
      "Çözemez yapamama bildirir. Çözemeyebilir, yapamama ihtimalini taşır.",
      "Biçimleri yalnız bil parçasını silme ezberiyle eşitlemek olasılık ayrımını kaybettirir.",
      "Aynı kesinlikte değildir; ikincide olasılık vardır.",
      "Kurallı birleşik fiil bilgisini cümlenin gerçek anlamından koparma.",
    ),
  ],
  recall: [
    {
      prompt: "Her ek almış sözcük türemiş midir?",
      answer:
        "Hayır. Evlerimizden yalnız çekimlerle kurulur; yeni taban veya birleşme yoktur, basittir.",
    },
    {
      prompt: "Tür değişmiyorsa yapım eki olamaz mı?",
      answer:
        "Olabilir. Tuz → tuzluk ikisi de ad soyludur; yeni nesne adı türediği için yapım vardır.",
    },
    {
      prompt: "İyelik ve belirtme aynı sözcükte bulunabilir mi?",
      answer:
        "Evet. Onun kitabını: kitap + ı (iyelik) + n (yardımcı) + ı (belirtme).",
    },
    {
      prompt: "Yardım etmek ayrı yazıldığı için basit midir?",
      answer:
        "Hayır. Yardımcı eylemle birleşik fiildir; yazım ile yapı türünü ayrı incele.",
    },
  ],
  source:
    "OGM Video Ders Notu Ekler ve Sözcüğün Yapısı dosyasının bağlayıcı üzerinden okunabilir tam metni; PDF sayfa indeksi ayrıca doğrulanmadı. Aurelia TYT Türkçe Sözcükte Yapı PDF s.1–19 metninin tamamıyla karşılaştırılan özgün açıklama, model ve alıştırmalar. Kaynaklardaki geçmiş sınav atıfları burada yeni doğrulanmış resmî soru kabul edilmez. Ayrıntılı fiilimsi ve çatı bilgisi ayrı ünitelerde ilerletilir.",
};
