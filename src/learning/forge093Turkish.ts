import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

const section = (
  title: string,
  first: string,
  second: string,
): GuideSection => ({ title, paragraphs: [first, second] });
const example = (
  title: string,
  prompt: string,
  strategy: string,
  steps: [string, string][],
  answer: string,
  check: string,
  pitfall: string,
): WorkedExample => ({
  title,
  prompt,
  strategy,
  steps: steps.map(([label, explanation]) => ({ label, explanation })),
  answer,
  check,
  pitfall,
});
const question = (
  id: string,
  skill: string,
  prompt: string,
  options: string[],
  answer: number,
  hint: string,
  explanation: string,
): Question => ({
  id,
  skill,
  prompt: txt(prompt),
  options: options.map(txt),
  answer,
  hint: txt(hint),
  explanation: txt(explanation),
});

const nounGuide: LessonGuide = {
  id: "isimler-isim-tamlamasi",
  minutes: 75,
  objectives: [
    "Adın anlam, sayı ve yapı sınıflarını birbirinden bağımsız değerlendir.",
    "Çoğul, durum, ilgi ve iyelik eklerini görevleriyle çözümle.",
    "Belirtili, belirtisiz ve zincirleme tamlamaları içten dışa kur.",
    "Sıfatla adı ve benzer ekleri bağlamdan ayır; belirsizliği kesin cevap diye sunma.",
  ],
  sections: [
    section(
      "Adı bul: sözcükten önce göreve bak",
      "İsim (ad), varlıkları, kavramları, duyguları ve durumları adlandırır. Pencere bir nesneyi, sevinç bir duyguyu, düşünce zihinsel bir kavramı karşılar. Bir sözcüğün sözlükte neler anlatabildiği ile belirli cümlede üstlendiği görev aynı soru değildir. İnceleyeceğin sözcüğü içinde geçtiği cümleyle birlikte oku.",
      "‘Genç komşu kapıyı açtı.’ cümlesinde genç, komşuyu niteler; ‘Genç kapıyı açtı.’ cümlesinde kişiyi adlandıracak biçimde adlaşmıştır. İlkinde bir adın özelliği, ikincisinde ad görevinde bir kullanım vardır. Sözcüğü isim diye seçtiğinde ‘Neyi veya kimi adlandırıyor?’ sorusuna cümleden kanıt ver; her ad görevindeki sözcüğü temel biçimi bakımından da isim kökü sanma.",
    ),
    section(
      "Özel ad ile tür adını ayır",
      "Özel ad, bir varlığı diğerlerinden ayırt eden kendine özgü addır: İzmir, Zeynep, bir eser adı olarak Çalıkuşu. Tür (cins) adı ise aynı türden varlıkların ortak adıdır: kent, öğrenci, roman. Özel adın birden fazla kişide kullanılması, onun belirli kişileri adlandırma işlevini ortadan kaldırmaz; birden çok Zeynep bulunabilir.",
      "Büyük harf tek başına özel ad kanıtı değildir: cümle başındaki ‘Kitap’ yine tür adı olabilir. ‘Güneş’ ve ‘Dünya’ gibi sözlerde astronomi terimi, günlük kullanım ve yazım bağlamı ayrıca önemlidir; bağlamsız büyük harf tahminiyle ilerleme. Özel/cins, somut/soyut ve tekil/çoğul birbirinden ayrı ölçütlerdir; bir sözcük her eksende ayrıca değerlendirilebilir.",
    ),
    section(
      "Somutluk, algı ve anlam değişimi",
      "Somut ad, duyularla algılanabilen varlığı; soyut ad, duyularla doğrudan algılanmayan düşünce, duygu ve kavramları karşılar. Ses, koku ve rüzgâr görünmeseler de duyusal olarak algılanabilir; somutluğu yalnız gözle görmeye indirme. Umut ve özgürlük ise kavram adlarıdır. ‘Gerçekte var mı?’ ile ‘Hangi tür varlığı adlandırıyor?’ farklı sorulardır.",
      "Aynı sözcük mecazla farklı sınıfta değerlendirilebilir. ‘Odanın havası serindi.’ cümlesinde hava fiziksel çevreyi; ‘Toplantının havası değişti.’ cümlesinde ortamın ruhunu anlatır. İlk kullanım somut, ikinci kullanım soyut anlamdadır. Soruda tek sözcük listesi yerine cümle verildiyse o cümledeki anlamı sınıflandır.",
    ),
    section(
      "Tekil, çoğul ve topluluk: biçimle bütünü karıştırma",
      "Tekil ad tek bir varlığı; çoğul ad genellikle -lar/-ler ekiyle birden çok varlığı karşılar: ağaç / ağaçlar. Topluluk adıysa biçimce çoğul eki taşımadan birden çok bireyi bir bütün olarak adlandırır: sürü, ordu, takım. Bir sürü çok sayıda hayvandan oluşabilir; bu, sürü sözcüğünün üzerinde çoğul eki bulunduğu anlamına gelmez.",
      "Topluluk adına çoğul eki de gelebilir: ‘sürüler’, birden fazla sürüyü anlatır. Sınıf sözcüğü ‘Sınıf boyandı.’ cümlesinde mekânı, ‘Sınıf geziye çıktı.’ cümlesinde öğrenciler topluluğunu karşılayabilir. Çoğul eki her kullanımda yalnız nesne sayısı bildirmez; ‘Ecelere uğradık.’ aile/çevre, ‘kırklı yaşlar’ yaklaşık dönem anlamı verebilir. Soru sayı anlamını soruyorsa bağlamı da göster.",
    ),
    section(
      "Yapı: çekim eki sözcüğü türemiş yapmaz",
      "Basit isim, yapım eki almamış ve birden çok sözcükle birleşmemiş addır: taş, süt, kitap. Türemiş isim bir kök veya gövdeden yapım ekiyle oluşur: gözlük, arkadaşlık, okuyucu. Birleşik isim, sözcüklerin tek bir kavramı karşılayacak biçimde birleşmesidir: gökdelen, gecekondu. Yapı sınıfı, sözcüğün uzunluğuna veya hece sayısına bakılarak belirlenmez.",
      "‘Kitaplarımızdan’ sözcüğü kitap + lar + ımız + dan biçiminde çekim ekleri taşır; bu ekler tek başına onu türemiş yapmaz. ‘Kitaplıklardan’ sözcüğünde kitap + lık yeni bir ad kurduğundan türeme vardır. Bir isim tamlamasını otomatik birleşik sözcük sayma; tamlama, canlı bir ilişki kurabilir, birleşik ad ise sözlükleşmiş bir kavram olabilir. Sorunun sözcük yapısı mı söz grubu mu istediğini ayır.",
    ),
    section(
      "Durum, ilgi ve eşitlik: adı ilişkiye yerleştir",
      "İsimler cümlede durum ekleriyle farklı bağlar kurar: okul-u (belirtme), okul-a (yönelme), okul-da (bulunma), okul-dan (ayrılma). Yalın durum bu durum eklerinden birini taşımayan biçimdir; bir adın çoğul veya iyelik eki alması tek başına onun bulunma ya da belirtme durumunda olduğunu göstermez. Ses uyumları ve kaynaştırma sesleri ekin yüzey biçimini değiştirebilir: çanta-y-ı, çanta-y-a.",
      "İlgi (tamlayan) eki -(n)ın/-(n)in/-(n)un/-(n)ün, adı başka bir adla ilişkilendirir: okul-un bahçe-si. ‘Okuldan geldim.’de okul fiille, ‘okulun bahçesi’nde okul bahçe adıyla ilişki kurar. Kim/ne, kimi/neyi, kime/nereye, kimde/nerede, kimden/nereden soruları birer kontrol aracıdır; her sorunun cevabını tek başına ezber etiketle değil cümlenin yapısıyla birlikte denetle. Eşitlik eki -ca/-ce de görelik veya birlikte yapma ilişkisi kurabilir: bence uygun, sınıfça geziye gittik. Aynı seslerin başka sözcüklerde yapım eki olabileceğini unutma; çocukça davranış gibi yapıları işlevini göstermeden bu çekim örnekleriyle bir tutma.",
    ),
    section(
      "İyelik: aitlik bildirir, kişilik eki değildir",
      "İyelik ekleri varlığın kime ya da neye ait olduğunu bildirir: kalem-im, kalem-in, kalem-i; kalem-imiz, kalem-iniz, kalem-leri. Ünlüyle biten adlarda üçüncü tekilde -sı/-si görülebilir: çanta-sı. Bu diziyi ‘benim, senin, onun, bizim, sizin, onların’ tamlayanlarıyla açmak görevi görünür kılar. Eklerin yalnız sesine değil, kurdukları aitlik ilişkisine bak.",
      "‘Onun defterini aldım.’ cümlesindeki defter-i-n-i biçiminde ilk -i üçüncü tekil iyelik, aradaki n zamir n’si, son -i belirtme durumudur. Aynı sözcük hem iyelik hem durum eki taşıyabilir. Tek başına ‘defterin’ ya da ‘öğretmenim’ biçimi birden çok çözümlemeye açık olabilir; gerekli bağlam olmadan tek kişi veya tek ek görevi uydurma. Çoğul adla üçüncü çoğul iyeliğin -ları/-leri görünüşü de tamlayanla birlikte incelenir.",
    ),
    section(
      "Belirtili tamlamayı iki uçtan kur",
      "İsim tamlamasında ilişkiyi belirleyen unsura tamlayan, asıl varlığı adlandıran unsura tamlanan denir. Belirtili isim tamlamasında tamlayan ilgi, tamlanan iyelik eki alır: okul-un bahçe-si, çocuk-un çanta-sı. Kimin/neyin nesi sorusu anlam ilişkisini kontrol eder. Ünlü uyumu ve ünsüz değişimi yüzünden ek sınırı yazıdaki hazır sözcük sınırıyla aynı görünmeyebilir: kitap-ın → kitabın.",
      "‘Okulun geniş bahçesi’ yine belirtilidir; geniş sözcüğü bahçeyi niteleyerek iki ana unsurun arasına girebilir. Tamlayan mutlaka somut bir sahip bildirmek zorunda değildir: şehrin tarihi gibi aitlik, parça-bütün veya başka kavramsal ilişki de kurulabilir. Tamlamayı tek bir sahiplik öyküsüne indirgemeden ek ve anlamı birlikte göster.",
    ),
    section(
      "Belirtisiz tamlama ve sıfat tamlaması",
      "Belirtisiz isim tamlamasında tamlayan ilgi eki almaz, tamlanan iyelik eki taşır: okul bahçe-si, tren istasyon-u. Genel tür/ilişki öne çıkabilir; ‘okul bahçesi’ belirli bir okulun adını söylemek zorunda değildir. Tamlanandaki ekin varlığı, iki isim arasındaki bağı görünür kılar. Tamlayana ilgi eki eklenince ‘okulun bahçesi’ olur; tamlanan eki korunurken yapı belirtiliye dönüşür.",
      "‘Geniş bahçe’ bir sıfat tamlamasıdır: geniş, bahçenin niteliğidir. ‘Okul bahçesi’nde ise okul ve bahçe iki addır. Belirtisiz tamlamanın iki unsurunun arasına sıfatı gelişi güzel sokma: ‘okul geniş bahçesi’ aynı yapıyı doğal kurmaz; ‘geniş okul bahçesi’ veya ‘okulun geniş bahçesi’ gibi farklı örgütlenmeleri incele. ‘Taş duvar’ gibi madde bildiren grupların takısız tamlama adıyla sınıflandırılması kaynaklar arasında tartışmalıdır; kesin etiketli sınav sorusuna dönüştürülmez.",
    ),
    section(
      "Zincirleme tamlama: adları saymakla yetinme",
      "Zincirleme isim tamlamasında en az bir unsurun kendisi isim tamlamasıdır. ‘Okulun bahçe kapısı’ sözünde [bahçe kapısı] içteki belirtisiz tamlama; okulun ise bu bütünün tamlayanıdır. ‘Bahçe kapısının rengi’nde [bahçe kapısı] bir bütün olarak dış tamlamanın tamlayanına dönüşür. Parçaları köşeli ayraçla gösterip asıl dış tamlananı sona doğru bul.",
      "Üç sözcük gördüğün her gruba zincirleme deme. ‘Okulun büyük kapısı’ üç sözcüktür; fakat büyük sıfatı yeni bir isim tamlaması kurmaz, temel isim tamlaması okulun kapısıdır. Öte yandan zincirleme grubun içinde sıfat da bulunabilir. Ölçüt ham sözcük sayısı değil, en az iki isim tamlaması ilişkisinin birbirine bağlanmasıdır.",
    ),
    section(
      "Düşen ve ortak unsurlar; çözümü denetle",
      "‘Çantam kayboldu.’ cümlesinde benim tamlayanı söylenmese de -m aitlik ilişkisini korur. ‘Benim çantam ağır, seninki hafif.’ cümlesinde ilgi zamiri -ki daha önceki çanta adını karşılar. ‘Öğretmenin ve öğrencinin çantası’ sözünde tek tamlanan iki tamlayana bağlanır; ‘öğrencinin çantası ve defteri’ sözünde tamlayan ortaktır. Her durumda hangi unsurun hangi adla ilişki kurduğunu açarak göster.",
      "Belirtili tamlamanın unsurları şiirsel söyleyişte yer değiştirebilir: ‘rengi bahçenin’ ifadesinde bahçenin rengi ilişkisi sürer. Soru çözerken önce grubu doğal sıraya al, iç ilişkileri kur, sonra ekleri say. Son denetimde yakın yanlışı da söyle: ‘büyük’ niçin yeni isim tamlaması kurmadı, ‘-i’ niçin hem iyelik hem belirtme olabiliyor? Doğru etiketin yanında kanıt üretmek, farklı cümlelere aktarılabilen yöntemdir.",
    ),
  ],
  examples: [
    example(
      "Aynı isim, üç bağımsız eksen",
      "‘İçlerindeki umut, ekibi yeniden bir araya getirdi.’ cümlesindeki umut adını varlığa veriliş, algılanış ve sayı bakımından incele.",
      "Her ölçüt için ayrı soru sor.",
      [
        [
          "Adlandırma",
          "Umut burada kişi adı değil, bir duygusal beklenti kavramıdır; tür adıdır.",
        ],
        [
          "Algı",
          "Kavramın kendisi bir nesne gibi duyularla algılanmadığından soyuttur.",
        ],
        ["Sayı", "Çoğul eki ve topluluk anlamı taşımaz; tekildir."],
      ],
      "Umut: cins, soyut, tekil.",
      "Bir ismin soyut olması cins/özel veya tekil/çoğul eksenini ortadan kaldırmaz.",
      "Cins/özel ayrımında yalnız umut sözcüğüne değil, verilen içlerindeki umut bağlamına bak.",
    ),
    example(
      "İki tamlama arasında tek ek değişikliği",
      "‘Köy yolu’ grubunu, belirli bir köye ait yolu anlatacak ek düzeniyle karşılaştır: ‘köyün yolu’.",
      "Tamlayan ve tamlananı ayrı izle.",
      [
        [
          "İlk grup",
          "Köy + yol-u: tamlayan ilgi eki taşımıyor, tamlanan iyelik eki taşıyor.",
        ],
        ["Değişim", "Köy-ün + yol-u: tamlayana ilgi eki ekleniyor."],
        [
          "Yapı",
          "İlk grup belirtisiz, ikinci grup belirtili isim tamlamasıdır. İkinci yapı belirli bir köye ait ilişkiyi açıklaştırır.",
        ],
      ],
      "Tamlanan eki iki grupta da vardır; değişen tamlayanın ekidir.",
      "Başka bir örnekle okul bahçesi / okulun bahçesi dönüşümünü uygula.",
      "‘Belirtisiz’ demek bütün unsurlar eksizdir demek değildir.",
    ),
    example(
      "Bir sözcükte iki -i",
      "‘Onun defterini özenle inceledim.’ cümlesindeki defterini sözcüğünü eklerinin görevleriyle çöz.",
      "Önce aitliği, sonra yüklemin nesnesini aç.",
      [
        ["Aitlik", "Onun defteri: defter-i üçüncü tekil iyelik taşır."],
        [
          "Nesne",
          "Neyi inceledim? Onun defterini. Son -i belirtme durumunu kurar; araya n girer.",
        ],
        [
          "Birleştirme",
          "defter-i-n-i: kök + iyelik + zamir n’si + belirtme durumu.",
        ],
      ],
      "İlk -i iyelik, son -i belirtme; ikisi farklı görevdedir.",
      "İyelikli yalın biçim ‘onun defteri’ ile nesne biçimi ‘onun defterini’yi karşılaştır.",
      "Her i sesini aynı ek veya her n sesini ayrı bir ilgi eki sayma.",
    ),
    example(
      "İç grubu koruyarak dış ilişki kur",
      "‘Bahçe kapısının rengi soldu.’ cümlesindeki bahçe kapısının rengi grubunu içten dışa çöz.",
      "Bir bütünü tek unsur gibi taşı.",
      [
        ["İç tamlama", "Bahçe + kapı-sı: belirtisiz isim tamlamasıdır."],
        [
          "Dış ilişki",
          "[Bahçe kapısı]-nın + renk-i: içteki bütün, dışta tamlayan görevindedir.",
        ],
        [
          "Sonuç",
          "En az bir unsur kendi içinde tamlama olduğundan zincirleme yapı vardır; renk-i → rengi ses değişimidir.",
        ],
      ],
      "[[Bahçe kapısı]-nın rengi] zincirleme isim tamlamasıdır.",
      "‘Bahçenin eski kapısı’nda eski yalnız sıfattır; aynı zincirleme kanıtı kurulamaz.",
      "Üç sözcüğü saymak tek başına yeterli kanıt değildir.",
    ),
    example(
      "İsimde yapı ile sayı farklı sorulardır",
      "‘Kitaplarımızdan birini seçtik.’ cümlesindeki kitaplarımızdan sözcüğünün yapısını ve eklerini incele.",
      "Önce yeni sözcük kuran ek olup olmadığını ara.",
      [
        [
          "Parçalar",
          "kitap-lar-ımız-dan: kök, çoğul, birinci çoğul iyelik, ayrılma durumu.",
        ],
        [
          "Görev",
          "-lar sayı, -ımız aitlik, -dan cümle içi ilişki kurar; yeni sözlük anlamı yapan ek yoktur.",
        ],
        [
          "Yapı",
          "Kök basit kaldığı için sözcük çekimli basit isimdir; çok ek almak türeme değildir.",
        ],
      ],
      "Basit isim; çoğul + iyelik + ayrılma ekleri taşır.",
      "Kitaplıklarımızdan biçiminde -lık eklenirse yapı türemiş olur.",
      "Çekim ekinin değiştirdiği ilişkiyi yeni sözcük oluşumuyla karıştırma.",
    ),
  ],
  recall: [
    {
      prompt: "Belirtisiz tamlamada hangi unsur ek taşır?",
      answer:
        "Tamlanan iyelik eki taşır; tamlayan ilgi eki almaz: okul bahçesi.",
    },
    {
      prompt:
        "Okulun büyük kapısı neden yalnız sözcük sayısıyla zincirleme sayılamaz?",
      answer:
        "Büyük sıfattır. İçte ikinci bir isim tamlaması gösterilemez; temel ilişki okulun kapısıdır.",
    },
    {
      prompt: "Topluluk adıyla çoğul adın farkını bir çiftle göster.",
      answer:
        "Sürü, ek almadan çok bireyi bir bütün olarak adlandırır; hayvanlar çoğul eki taşır. Sürüler ise birden fazla sürüdür.",
    },
    {
      prompt: "Onun defterini biçiminde iki -i ne yapar?",
      answer:
        "İlki iyelik, sonuncusu belirtme durumudur; aradaki n bağlantıyı sağlayan zamir n’sidir.",
    },
    {
      prompt: "Çok sayıda çekim eki alan kitaplarımızdan türemiş midir?",
      answer:
        "Hayır. Yeni sözcük yapan ek bulunmadığından basit isimdir; çoğul, iyelik ve durum eki taşır.",
    },
  ],
  source:
    "Aurelia İsimler ve İsim Tamlaması kopya kağıdı, öğretim/kapsam PDF s.2–5,7–9; OGM Video Ders Notu İsim Soylu Sözcükler PDF s.3–4,19–22; OGM Dersler Cepte 9. sınıf 2. sayı İsim PDF/basılı s.15–16 doğrudan okunan kaynaklarıyla karşılaştırılan özgün anlatım. Kaynağın MEBİ ve ÖSYM atıfları ayrıca doğrudan okunmuş veya yeni resmî soru doğrulanmış sayılmaz. Tartışmalı takısız tamlama sınıflaması tek cevaplı soru yapılmadı.",
};

const adjectiveGuide: LessonGuide = {
  id: "sifatlar",
  minutes: 75,
  objectives: [
    "Sıfatın bağlandığı adı göster; niteleme ile belirtmeyi ayır.",
    "İşaret, sayı, belgisiz ve soru sıfatlarını bağlamla çöz.",
    "Adlaşmış sıfat, zamir ve zarf ayrımını cümleyi dönüştürerek açıkla.",
    "Sıfatın yapısını, derecesini, pekiştirmesini ve sıfat-fiil sınırını denetle.",
  ],
  sections: [
    section(
      "Sıfatı bulmak için önce adı bul",
      "Sıfat (ön ad), bir adı niteleyen veya belirten sözcüktür. ‘Serin akşam’ sözünde serin niteliği, ‘bu akşam’ sözünde bu işaretle belirlemeyi bildirir. Sıfatın cümledeki görevi bir adla kurduğu ilişkiyle kanıtlanır. Sözcüğün yalnız güzel, küçük veya bu listesinde bulunması yeterli değildir; hangi ada bağlandığını göster.",
      "Sıfat görevindeki sözcük çoğunlukla adın önündedir; fakat adla arasında başka sıfatlar bulunabilir: ‘bu üç eski defter’. Bu, üç ve eski aynı defter adına farklı yollarla bağlanır. ‘Birkaç kitap, defter ve kalem’ sözünde sıfat birden çok adı da belirtebilir. Salt hemen yanındaki sözcüğe bakmak yerine grubun bütününü oku.",
    ),
    section(
      "Niteleme: nasıl bir varlık?",
      "Niteleme sıfatları adın renk, biçim, durum ve benzeri özelliklerini bildirir: mor çiçek, yuvarlak masa, sakin öğrenci. ‘Nasıl çiçek?’ gibi soruyu ada yöneltmek niteliği görünür kılar. Nitelik nesnenin dış görünüşüyle sınırlı değildir; yararlı fikir veya dürüst insan gibi değerlendirme de olabilir.",
      "Aynı sözcük fiilin nasıl yapıldığını anlatıyorsa başka görevdedir: ‘Sakin öğrenci konuştu.’ cümlesinde sakin öğrenciyi, ‘Öğrenci sakin konuştu.’ cümlesinde sakin konuşmayı niteler. İlk kullanım sıfat, ikinci kullanım durum zarfıdır. Soru sözcüğü aynı olsa bile sorunun hangi sözcüğe sorulduğu değişir.",
    ),
    section(
      "İşaret: adın önünde mi, adın yerinde mi?",
      "Bu, şu, o ve bazı yakın anlamlı sözler bir adı göstererek belirtebilir: bu yol, şu kutu, o bina. Ad açıkça bulunuyorsa işaret sıfatı ilişkisini ara. ‘Şu küçük kutu’ grubunda şu ile kutu arasına küçük niteleme sıfatının girmesi, şu sözcüğünün kutuyu belirtmesini sona erdirmez.",
      "‘Şu kutuyu taşı.’ cümlesini ‘Şunu taşı.’ biçimine dönüştürünce kutu adı söylenmez; şu adın yerini tutan işaret zamiri olur. ‘Bu insanlar’ ile insanları göstererek söylenen ‘bunlar’ karşılaştırmasında da aynı ayrım vardır. İşaret sözcüğü bir insanı gösterdi diye bu/şu zamirlerini kişi zamiri yapma; sınıflandırmada görev ve sözcük birlikte önemlidir.",
    ),
    section(
      "Sayı: miktar, sıra, pay ve parça",
      "Asıl sayı sıfatı kesin miktar bildirir: dört soru. Sıra sayı sıfatı varlığın sırasını gösterir: dördüncü soru. Üleştirme sayı sıfatı paylaştırma bildirir: dörder soru. Kesir sayı sıfatı bütünün bir parçasını belirtir: yarım ekmek, çeyrek saat. Bir sayının var olması tek başına bu dört görevin hangisini yaptığını söylemez; anlamına bak.",
      "Bir isim sayı sıfatıyla belirtildiğinde olağan sayma bağlamında ‘iki kitap’ denir; iki kitaplar denmez. Kalıplaşmış adlar ve özel kullanımlar ayrı bağlam gerektirir. ‘İlk’ ve ‘son’ gibi sözler de sıra bildirebilir. Üleştirme yazımı sözcükle kurulur: ikişer; ‘2’şer’ biçimini yazım kuralı olarak kullanma. Bu yazım bilgisi, cümlede hangi adı belirttiğini gösterme gereğini kaldırmaz.",
    ),
    section(
      "Belgisizlik ve bir sözcüğünün bağlamı",
      "Belgisiz sıfatlar miktarı veya varlığı kesin sayıya bağlamadan belirtir: bazı günler, birkaç öğrenci, her soru, hiçbir engel. Her ve bütün kapsamı genişletebilir ama kesin bir rakam vermez; bu nedenle belgisiz grubunda değerlendirilir. Açık bir adın bulunmasıyla sıfat ilişkisi sürer: bazı sorular.",
      "Bir sözcüğü kesin tek adet vurgulandığında asıl sayı, herhangi bir varlık/zaman anlamında belgisiz sıfat olabilir. ‘İki bilet değil, yalnız bir bilet aldım.’ sayıyı belirginleştirir; ‘Bir gün bu şehre döneceğim.’ belirsiz bir zamanı anlatır. ‘Masada bir kitap var.’ gibi bağlamlarda ton ve amaç belirsiz bırakılmışsa tek cevabı zorla dayatma; soru için gerekli anlam ayrımı açıkça verilmelidir.",
    ),
    section(
      "Soru sıfatı: yanıt adın özelliğini mi tamamlar?",
      "Hangi, kaç, kaçıncı, ne ve nasıl gibi sözler bir adı soru yoluyla belirtebilir: hangi sokak, kaç bilet, nasıl bir çalışma. ‘Hangi kitabı aldın?’ cümlesinde hangi, açık kitap adını belirtir; yanıt kitap türünü veya seçilen kitabı tamamlar. Soru yalnız ses tonuyla değil bu sözcüğün göreviyle de kurulabilir.",
      "‘Hangisini aldın?’ cümlesinde açık kitap adı yoktur; hangisi onun yerini soru yoluyla tutar ve soru zamiridir. ‘Nasıl anlattın?’ cümlesinde ise nasıl anlatma fiiline bağlanır, soru zarfıdır. Sıfat, zamir ve zarfı soru işareti bulunmasına göre değil, sorulan birimin ad mı özellik mi eylemin biçimi mi olduğuna göre ayır.",
    ),
    section(
      "Adlaşmış sıfat: nitelik kalır, açık ad düşer",
      "‘Yaşlı komşular oturdu.’ cümlesinde yaşlı, komşular adını niteler. ‘Yaşlılar oturdu.’ cümlesinde ise yaşlılar insanları adlandıracak biçimde kullanılır; niteleme sıfatı adlaşmıştır. Çoğul ve durum eki alabilir: yaşlılara yer verdik. Adlaşmış sıfat cümlede ad görevi görür; her ad görevi gören sözcük bu nedenle zamir sayılmaz.",
      "‘Kırmızı kalemleri ayırdım.’ yerine ‘Kırmızıları ayırdım.’ denirse renk niteliği korunur, kalem adı düşer. Bağlam kalem demiyorsa düşen varlığın mutlaka kalem olduğunu uydurma; ‘kırmızı olan varlıklar’ kadarını söylemek yeterlidir. ‘Bazıları’ gibi belgisiz zamirle ‘kırmızıları’ gibi nitelik taşıyan adlaşmış sıfatı aynı torbaya koyma.",
    ),
    section(
      "Derecelendirme: sıfatı etkileyen sözcük de sıfat değildir",
      "‘Daha geniş oda’ üstünlük, ‘en geniş oda’ bir karşılaştırma kümesinde en üstünlük, ‘çok geniş oda’ niteliğin yüksek derecesini anlatır. Geniş, oda adını nitelediği için sıfattır. Daha, en ve çok ise bu sıfatın derecesini belirleyen zarf görevindedir. Bir sıfatın önünde görünmek o sözcüğü sıfat yapmaz.",
      "‘Çok öğrenci geldi.’ cümlesinde çok doğrudan öğrenci adının belirsiz miktarını bildirir; belgisiz sıfat olur. ‘Öğrenci çok çalıştı.’ cümlesindeyse çalışmanın miktarını belirleyen zarftır. ‘Çok hızlı öğrenci hızlı koştu.’ örneğinde ilk hızlı adı niteleyen sıfat, ikinci hızlı eylemi niteleyen zarf; çok ise ilk hızlıyı derecelendiren zarftır.",
    ),
    section(
      "Yapı: basit, türemiş ve birleşik sıfatlar",
      "Basit sıfat yapım eki almamış ve birleşmemiştir: dar sokak. Türemiş sıfat bir köke veya gövdeye yapım ekiyle kurulur: tuzlu çorba, yararlı kitap. Anlamca kaynaşmış birleşik sıfat iki sözcüğün tek nitelik olarak kalıplaşmasıyla kurulur: vatansever sanatçı. Yapı sınıfıyla anlam türü aynı liste değildir; tuzlu hem yapıca türemiş hem görevce niteleme sıfatıdır.",
      "Kurallı birleşik sıfatlarda bir söz grubu bütün olarak adı niteler: mavi gözlü çocuk, üç günlük gezi, eli açık komşu. Mavi gözlüde mavi göz grubu -lü ile çocuk adına bağlanır. Kaynaklarda bu başlık altında kulaktan dolma bilgi, ailesine bağlı kişi, gözü pek öğrenci gibi genişlemiş gruplar da incelenir. Grubun tamamını ve nitelediği adı göster; her sözcüğü tek başına yeni bir sıfat türüne zorlamadan yapıyı çöz.",
    ),
    section(
      "Pekiştirme, ikileme ve küçültme",
      "Pekiştirme niteliği kuvvetlendirir: bembeyaz bulut, tertemiz oda. m, p, r, s sesleriyle kurulan biçimler her sözcüğe gelişigüzel uygulanmaz; yerleşmiş kullanımları izle. İkilemeyle ‘uzun uzun yollar’, soru edatıyla ‘güzel mi güzel bir gün’ gibi güçlendirme de kurulabilir. Burada mı/mi, gerçekten yanıt bekleyen bir soru yerine pekiştirmeye katkı verebilir.",
      "Küçültme veya niteliğe yaklaşma anlamı -cık, -ce, -imsi, -imtırak gibi eklerle kurulabilir: küçücük oda, irice elma, ekşimsi tat, sarımtırak ışık. Her ek yalnız fiziksel küçüklük bildirmez; irice, biraz iri olmayı anlatır. ‘Uzun uzun konuştu.’ cümlesinde ikileme fiile bağlandığından zarf olur; aynı güçlendirme biçimi görev bakımından farklı kullanılabilir.",
    ),
    section(
      "Sıfat-fiil ve çekim eki uyarısının sınırı",
      "‘Okunacak roman’ sözünde okunacak, oku- fiilinden kurulmuş ve roman adını niteleyen sıfat-fiildir; fiil anlamı sürer. ‘Yararlı roman’da yararlı isim kökenli türemiş niteleme sıfatıdır. ‘Gelecek kaygısı’ gibi kalıcı isim anlamındaki gelecek ile ‘gelecek yolcu’ sıfat-fiilini yalnız görünen -ecek parçasıyla aynı çözme; kök, anlam ve görev birlikte aranır.",
      "‘Sıfat çekim eki alırsa adlaşır.’ yararlı bir başlangıç kuralıdır ama her yapıya koşulsuz uygulanmaz: güzelim köy gibi özel ifadeler ve gideceğin okul gibi iyelik eki taşıyan sıfat-fiil grupları açık adı nitelemeyi sürdürebilir. Doktor Selin / Selin Hanım gibi unvan yapılarının söz dizimi de olağan sıfat sırasından farklı olabilir. Ayrıntı gerekiyorsa kaynak terminolojisini ve açık ad ilişkisini belirt; tartışmalı alt etiketleri gerekçesiz sınav anahtarı yapma.",
    ),
  ],
  examples: [
    example(
      "Önce adları seç, sonra bağları çiz",
      "‘Şu küçük odada iki eski sandalye vardı.’ cümlesinde sıfatları ve bağlandıkları adları bul.",
      "Cümleyi iki ad öbeğine ayır.",
      [
        [
          "Adlar",
          "Odada ve sandalye varlık adlarıdır; odada sözcüğündeki bulunma eki ad ilişkisini yok etmez.",
        ],
        [
          "İlk bağ",
          "Şu işaret, küçük niteleme sıfatıdır; ikisi oda adına bağlanır.",
        ],
        [
          "İkinci bağ",
          "İki asıl sayı, eski niteleme sıfatıdır; ikisi sandalye adına bağlanır.",
        ],
      ],
      "Şu/küçük → oda; iki/eski → sandalye.",
      "Şu ile oda bitişik değilken de belirtme ilişkisi sürüyor.",
      "Sıfatın yalnız hemen yanındaki sözcüğe bağlandığını varsayma.",
    ),
    example(
      "Adı düşür, türde ne değiştiğini gözle",
      "‘Bu çantayı taşı.’ cümlesini çanta adını tekrarlamadan, bu sözcüğünü koruyarak kur.",
      "Adın önünde olma ile adın yerinde olmayı karşılaştır.",
      [
        ["Açık ad", "Bu, çanta adını belirtir; işaret sıfatıdır."],
        [
          "Dönüşüm",
          "‘Bunu taşı.’ cümlesinde çanta söylenmez; bu sözcüğü durum eki alıp onun yerini tutar.",
        ],
        [
          "Kanıt",
          "Artık açık bir adı belirtmiyor, varlığın adını göstererek karşılıyor; işaret zamiridir.",
        ],
      ],
      "Bu çantayı → bunu: işaret sıfatından işaret zamirine geçiş.",
      "Aynı dönüşümü şu kutuyu / şunu ile dene.",
      "Bu sözcüğünü her cümlede tek tür olarak ezberleme.",
    ),
    example(
      "Aynı hızlı, farklı bağlantılar",
      "‘Çok hızlı tren perona hızlı girdi.’ cümlesinde iki hızlı ile çok sözcüğünün görevlerini açıkla.",
      "Her sözcükten etkilenen birime ok çiz.",
      [
        ["Adı niteleyen", "İlk hızlı, trenin niteliğidir; niteleme sıfatıdır."],
        ["Derece", "Çok, hızlı sıfatının derecesini belirler; zarftır."],
        [
          "Eylem",
          "İkinci hızlı, girdi fiilinin nasıl yapıldığını anlatır; durum zarfıdır.",
        ],
      ],
      "İlk hızlı sıfat; çok ve ikinci hızlı zarftır.",
      "Çok öğrencinin doğrudan öğrenci miktarını belirttiği farklı cümleyi düşün.",
      "Güçlü bir nitelik bildiriyor diye çok sözcüğünü otomatik niteleme sıfatı sayma.",
    ),
    example(
      "Sayının dört ayrı işi",
      "‘Üçüncü masaya üçer tabak ve yarım ekmek bıraktık.’ cümlesindeki üçüncü, üçer ve yarım sözcüklerini sınıflandır.",
      "Sırayı, paylaşımı ve bütünden parçayı ayrı sor.",
      [
        [
          "Sıra",
          "Üçüncü, hangi sıradaki masa sorusuna yanıt verir; sıra sayı sıfatıdır.",
        ],
        [
          "Pay",
          "Üçer, her gruba düşen tabak miktarını bildirir; üleştirme sayı sıfatıdır.",
        ],
        [
          "Parça",
          "Yarım, ekmeğin bir bölümünü bildirir; kesir sayı sıfatıdır.",
        ],
      ],
      "Sıra sayı / üleştirme sayı / kesir sayı.",
      "‘Üç tabak’ denirse paylaşım eki kalkar ve asıl sayı görevi olur.",
      "Üç sayısının görünüşünden görevini değişmez sayma.",
    ),
    example(
      "Adlaşmayı niteliği koruyarak kur",
      "‘Mavi kutuları alt rafa, kırmızı kutuları üst rafa koy.’ cümlesinde tekrar eden kutu adlarını düşür.",
      "Nitelik adın yerinde kullanılınca neyin korunduğunu izle.",
      [
        [
          "Dönüşüm",
          "‘Mavileri alt rafa, kırmızıları üst rafa koy.’ biçimi kurulur.",
        ],
        [
          "Nitelik",
          "Mavi ve kırmızı renk bilgisini korur; düşen kutu adını karşılayarak ad görevine geçer.",
        ],
        [
          "Sonuç",
          "Mavileri ve kırmızıları adlaşmış sıfattır; çoğul ve belirtme durum eki taşır.",
        ],
      ],
      "Mavileri / kırmızıları: adlaşmış sıfatlar.",
      "Kutu bağlamını bilmeseydik renkli varlıkların mutlaka kutu olduğunu söyleyemezdik.",
      "Adın yerinde kullanılmak, her adlaşmış sıfatı zamir yapmaz.",
    ),
  ],
  recall: [
    {
      prompt: "Sıfatı bulduğunu hangi kanıtla gösterirsin?",
      answer:
        "Nitelediği veya belirttiği açık adı ve aralarındaki anlam ilişkisini gösteririm.",
    },
    {
      prompt: "Bir her zaman asıl sayı sıfatı mıdır?",
      answer:
        "Hayır. Kesin tek adet ise sayı; herhangi bir varlık/zaman anlamında belgisiz olabilir. Bağlam belirlemelidir.",
    },
    {
      prompt: "Daha güzel bir evde daha ne görevindedir?",
      answer:
        "Güzel sıfatını derecelendiren zarftır; güzel ise ev adını niteler.",
    },
    {
      prompt: "Yaşlılar ile bazıları neden aynı türde olmak zorunda değildir?",
      answer:
        "Yaşlılar niteliği koruyan adlaşmış sıfat, bazıları belirsiz biçimde adın yerini tutan zamirdir.",
    },
    {
      prompt: "Mavi gözlü çocukta birleşik niteleyici hangisidir?",
      answer:
        "Mavi gözlü grubu birlikte çocuk adını niteler; yalnız mavi sözcüğüyle bütün yapıyı açıklamak yetmez.",
    },
  ],
  source:
    "Aurelia Sıfatlar kopya kağıdı, öğretim/kapsam PDF s.2–5,7–9; OGM Video Ders Notu İsim Soylu Sözcükler PDF s.5–12; OGM Dersler Cepte 9. sınıf 3. sayı Sıfat PDF/basılı s.18–20 doğrudan okunan kaynaklarıyla karşılaştırılan özgün öğretim. Kaynaktaki genel çekim eki uyarısı aynı kaynağın istisnalarıyla sınırlandı. Yeni sorular özgündür; kaynakların MEBİ/ÖSYM atıfları bu görevde ayrı doğrulama sayılmaz.",
};

const pronounGuide: LessonGuide = {
  id: "zamirler",
  minutes: 75,
  objectives: [
    "Zamirin karşılayabildiği adı veya yargıyı bağlamdan göster.",
    "Kişi, dönüşlülük, işaret, belgisiz ve soru zamirlerini ayır.",
    "İlgi zamiri -ki ile sıfat yapan -ki ve bağlaç ki ayrımını açımla.",
    "İyelik, kişi ve durum eklerini karıştırma; belirsiz gönderimi kanıtsız kesinleştirme.",
  ],
  sections: [
    section(
      "Adı tekrarlama, gönderimi koru",
      "Zamir (adıl), bir adı tekrar söylemeden onun yerini tutan sözcük veya ek olarak incelenir. ‘Ece dosyayı aldı. Ece dosyayı okudu.’ yerine ‘Ece dosyayı aldı. O, onu okudu.’ denebilir. Burada O kişiye, onu dosyaya gönderir. Zamiri bulmanın yanında onun hangi adı karşıladığını göstermek de gerekir.",
      "Her zamir mutlaka hemen önceki tek bir sözcüğe dönmez; bir yargıyı da karşılayabilir: ‘Çalışırken ara vermek yararlıdır; bunu unutma.’ Bu kullanımda bunu, önceki yargıyı karşılar. Bağlam bir varlığın adını açıkça vermiyorsa o varlığın özel adını uydurma. Sadece hangi kişi, nesne veya yargı türüne gönderim yapılabildiğini söyle.",
    ),
    section(
      "Kişi zamirleri ve çekimleri",
      "Ben, sen, o; biz, siz, onlar kişi adlarının yerini tutabilir. Ben konuşanı, sen dinleyeni; o sözü edilen kişiyi karşılar. Zamirler isim gibi durum ekleri alır: beni, sana, onda, bizden, sizin. Ben ve senin yönelme biçimleri bana ve sanadır; bunları bene/sene diye düzenli ekleme kalıbına zorlamamak gerekir.",
      "‘Bana seslendi.’ cümlesinde bana, ben kişi zamirinin yönelme durumudur. ‘Geldim.’ cümlesindeyse -m yüklemin kişisini bildirir; açık bir ben sözcüğü yoktur. Açık zamir, gizli özne ve yüklemdeki kişi ekini ayrı bilgiler olarak kaydet. ‘Siz’ bazen tek kişiye saygı için de kullanılabilir; bağlam olmadan mutlaka birden çok dinleyen var sonucuna atlama.",
    ),
    section(
      "O: açık ad ve insan bağlamını birlikte oku",
      "‘O öğrenci konuştu.’ cümlesinde o açık öğrenci adını belirtir; işaret sıfatıdır. ‘Deniz konuştu. O, önerisini açıkladı.’ bağlamında o, insan adının yerini tutan kişi zamiridir. ‘Dosya açılmadı. O, bozuktu.’ bağlamındaysa insan dışındaki dosyayı gösteren işaret zamiri olarak değerlendirilir.",
      "‘O geldi.’ gibi tek başına cümlede hangi varlığa gönderim yapıldığı bilinmiyorsa kişi/işaret ayrımını kesinleştirecek bilgi eksiktir. Bu ve şu ise insanlar gösterilse bile işaret zamiri olarak kullanılır: ‘Şunlar bizi bekliyor.’ Sadece gösterilenin insan olmasına bakarak bu/şu sözcüklerini kişi zamiri sınıfına taşıma; kaynak ayrımını bağlamla birlikte uygula.",
    ),
    section(
      "İşaret zamirleri: gösterme ve açık adı düşürme",
      "Bu, şu, o, bunlar, şunlar, onlar ve burası/şurası/orası gibi biçimler varlıkları işaret yoluyla karşılayabilir. ‘Bu kalemi aldım.’ cümlesinde bu sıfatken ‘Bunu aldım.’ cümlesinde kalem adının yerine geçen zamirdir. Durum ve çoğul ekleriyle farklı yüzeyler oluşur: bunları, şuna, ondan; n bağlantısı bir başka adın türediği anlamına gelmez.",
      "İşaret eden her ifadenin yanında mutlaka ad bulunmayabilir; kimi bağlamda sıfat yapan -ki’li grup adlaşmıştır: ‘Masadakini ver.’ Bu yapıdaki -ki, benimki örneğindeki ilgi zamiriyle aynı kuruluşta değildir. Başlangıçta tartışmasız bu/şu biçimleriyle açık ad testini öğren; sonra yer-zaman ve adlaşma yapılarını oluşumlarıyla çöz.",
    ),
    section(
      "Dönüşlülük: kendi hangi kişiye dönüyor?",
      "Kendi sözcüğü dönüşlülük zamiridir; kişi ve durum ekleriyle kendim, kendine, kendimizden biçimlerine girebilir. ‘Ece aynada kendini gördü.’ cümlesinde görenle görülen aynı kişidir; kendini Ece’yi karşılar. Eylemin etkisinin özneye dönüşünü adı yerine koyarak sınayabilirsin: Ece aynada Ece’yi gördü.",
      "‘Ece bu işi kendisi yaptı.’ cümlesinde kendi, işi başkasının değil Ece’nin yaptığını vurgular. ‘Ben kendim geldim.’ gibi kullanımlarda kişi zamiriyle birlikte pekiştirme vardır. Dönüşlülüğü yalnız aynı biçimle tekrar veya yalnız kişi zamiriyle eşitleme; türü kendi, gönderildiği kişi ve cümledeki görevi ayrı ayrı açıklanır.",
    ),
    section(
      "Belgisiz zamir: kimlik açık, miktar belirsiz olabilir",
      "Biri, birkaçı, bazıları, çoğu, hepsi, herkes, hiçbiri gibi sözcükler adları belirsiz veya genel biçimde karşılar. ‘Soruların hepsini çözdüm.’ cümlesinde hepsini, soru adını tekrar etmez. Hepsi bütün kümeyi anlatsa da ayrı ayrı adlandırılmamış varlıkları karşılayan belgisiz zamirdir; belgisizliği yalnız ‘kaç tane olduğu hiç bilinmiyor’ diye tanımlama.",
      "‘Bazı öğrenciler kaldı.’ cümlesindeki bazı açık öğrenci adını belirten belgisiz sıfat; ‘Bazıları kaldı.’ cümlesindeki bazıları onun yerini tutan belgisiz zamirdir. ‘Hiçbir öğrenci gelmedi.’ / ‘Hiçbiri gelmedi.’ çifti de aynı görevi ayırır. Adın yerine geçti diye yaşlılar gibi niteleme sıfatının adlaşmış biçimini otomatik aynı zamir listesine ekleme.",
    ),
    section(
      "Soru zamiri ve kimi sözcüğünün farklı işleri",
      "Kim, ne, hangisi, kaçı, nereye gibi sözler bir adın yerini soru yoluyla tutabilir. ‘Kim aradı?’ cümlesinde yanıt bir kişi adı; ‘Hangisini aldın?’ cümlesinde seçilen varlığın adı olur. Soru zamiri bir sözcüğün önceki cümlede bulunmasına ihtiyaç duymadan soru yoluyla bir ad alanı açabilir. Durum ekleri soru olma görevini yok etmez: kimden, neye.",
      "‘Hangi kitabı aldın?’da hangi açık adı belirten soru sıfatı; ‘Nasıl okudun?’da nasıl eylemi soran zarftır. Kimi de bağlama göre değişir: ‘Kimi insanlar erken gelir.’de belgisiz sıfat, ‘Bazıları çıktı, kimi kaldı.’da belgisiz zamir, ‘Kimi aradın?’da soru zamiridir. Sözcük biçimi aynı diye görevleri tek bir listede dondurma.",
    ),
    section(
      "Üç ayrı ki: yer tutma, niteleme, bağlama",
      "İlgi zamiri olan -ki, isim tamlamasındaki tamlanan adın yerini tutar: ‘Benim defterim çizgili, seninki kareli.’ Seninki, senin defterin diye açılır. Tamlanan söylenmediği için ek adın yerini tutar; bitişik yazılır. Benimki, onlarınki gibi biçimlerde tamlayanla ilişkiyi açarak kanıtla.",
      "‘Masadaki defter’ sözünde -ki yer grubunu defter adına bağlar; sıfat yapar, ilgi zamiri değildir. ‘Masadakini aldım.’ gibi adlaşmış kullanımda da oluşumunu unutma. ‘Biliyorum ki geleceksin.’ cümlesinde ayrı yazılan ki yargıları bağlayan bağlaçtır. Yalnız bitişik/ayrı yazım yeterli değildir; hem sıfat yapan hem ilgi zamiri -ki bitişik olduğu için görev testini de uygula.",
    ),
    section(
      "Ek hâlindeki iyelik ve benzer görünen ekler",
      "Okul dil bilgisinde iyelik ekleri ek hâlindeki zamirler başlığında da ele alınır: evim, evin, evi, evimiz, eviniz, evleri. Bu ekler varlığın aitliğini bildirir; açık kişi zamiriyle aynı sözcük değildir. ‘Evim’ benim evim diye açılır. ‘Evdeyim’ ise içinde bulunma eki ve yüklemde kişi bildirimi taşıyan farklı bir yapıdır.",
      "‘Onun çantasını taşıdım.’ cümlesinde çanta-sı-n-ı: iyelik, zamir n’si, belirtme durumu sıralaması vardır. ‘Senin çantanı taşıdım.’da çanta-n-ı: ikinci tekil iyelik ve belirtme vardır. Bu nedenle tek başına çantanı veya defterin gibi yüzey biçimlerinden sahip kişiyi kesinleştirme; açık tamlayan anlamı belirler. Benzer görünüşlü ekleri, bağlam verilmeyen bir sınav anahtarıyla cezalandırmak yerine belirsizliği fark etmeyi öğret.",
    ),
    section(
      "Görev, gönderim ve son denetim",
      "Zamirler isim gibi cümlenin öznesi, nesnesi veya yer tamlayıcısı olabilir: ‘O geldi.’, ‘Onu gördüm.’, ‘Ona gittim.’ İsim tamlamasında tamlayan ya da tamlanan da olabilir: benim dosyam, öğrencilerin hepsi. Zamirin türü ile cümlenin ögesi aynı soru değildir; bir kişi zamiri farklı eklerle farklı öge görevine girebilir.",
      "‘Merve, Selin’e onun notunu verdi.’ cümlesinde onun, Merve’ye de Selin’e de gönderilebilir; dış bağlam yoksa kesin sahibi seçmek doğru olmaz. Açıklık isteniyorsa ‘Merve, Selin’e Merve’nin notunu verdi.’ veya ‘Selin’in notunu verdi.’ diye adı tekrar etmek gerekir. Son denetimde zamiri açımla, açık ad olup olmadığını kontrol et, yakın sıfat/zarf/bağlaç kullanımını reddet ve gönderim belirsizse bunu dürüstçe söyle.",
    ),
  ],
  examples: [
    example(
      "Bir kişi, bir nesne: iki farklı o",
      "‘Duru dosyayı açtı. O, onu dikkatle okudu.’ sözünde O ve onu hangi varlıklara ve türlere bağlanır?",
      "Adları yerine koyarak anlamı denetle.",
      [
        [
          "Özne",
          "O yerine Duru yazılır; kişi adının yerine geçtiği için kişi zamiridir.",
        ],
        [
          "Nesne",
          "Onu yerine dosyayı yazılır; insan dışındaki bir varlığı işaretle karşılar.",
        ],
        [
          "Denetim",
          "Duru dosyayı dikkatle okudu cümlesi anlamı korur; iki o biçimi aynı köke rağmen farklı türe ayrılır.",
        ],
      ],
      "O → Duru, kişi zamiri; onu → dosyayı, işaret zamiri.",
      "Bu çözüm, verilen bağlamdaki gönderime dayanır; bağlamsız O okudu cümlesi aynı kanıtı vermez.",
      "İki o görünce aynı alt türü otomatik seçme.",
    ),
    example(
      "Sıfatı çıkarma değil, açık adı düşürme",
      "‘Bazı konuklar erken çıktı; bazıları salonda kaldı.’ cümlesindeki bazı ve bazıları ne görev yapar?",
      "İlk ve ikinci kullanımda açık konuk adını ara.",
      [
        [
          "İlk kullanım",
          "Bazı sözcüğü konuklar adını belirtir; belgisiz sıfattır.",
        ],
        [
          "İkinci kullanım",
          "Bazıları, konuklar adını tekrar söylemeden karşılar.",
        ],
        [
          "Tür",
          "İkinci kullanım belgisiz zamirdir; iki bölüm aynı konuklar kümesini farklı alt gruplarla anlatır.",
        ],
      ],
      "Bazı: belgisiz sıfat; bazıları: belgisiz zamir.",
      "Hiçbir konuk / hiçbiri dönüşümüyle aynı yöntemi sınayabilirsin.",
      "Belirsizlik bildiren her sözcüğü otomatik zamir sayma.",
    ),
    example(
      "Ki’yi adla geri aç",
      "‘Benim defterim masada, seninki çekmecede; biliyorum ki evdeki defter farklı.’ cümlesindeki üç ki’yi ayır.",
      "Her biçimde adın yerini tutma veya adı niteleme işini ayrı ara.",
      [
        [
          "Seninki",
          "Senin defterin diye açılır; tamlanan adın yerini tutan ilgi zamiridir.",
        ],
        ["Biliyorum ki", "İki yargıyı bağlar, ayrı yazılır; bağlaçtır."],
        [
          "Evdeki defter",
          "-ki, evde bulunma grubunu defter adına bağlar; sıfat yapan ektir.",
        ],
      ],
      "İlgi zamiri / bağlaç / sıfat yapan -ki.",
      "İki bitişik -ki’nin de aynı tür olmadığı görülür.",
      "Bitişik yazımı tek başına ilgi zamiri kanıtı kabul etme.",
    ),
    example(
      "Aynı çantanı, iki açık sahip",
      "‘Senin çantanı taşıdım.’ ve ‘Onun çantasını taşıdım.’ cümlelerinde sahiplik ve nesne eklerini göster.",
      "Önce tamlayanı yaz, ardından durum ekini ayır.",
      [
        [
          "Senin",
          "Çanta-n ikinci tekil iyelik taşır; son -ı belirtme durumudur.",
        ],
        [
          "Onun",
          "Çanta-sı üçüncü tekil iyelik; n bağlantısından sonra son -ı belirtme durumudur.",
        ],
        [
          "Karşılaştırma",
          "Birinde sahip ikinci, ötekinde üçüncü kişidir; iki durumda da taşınan varlık belirli nesnedir.",
        ],
      ],
      "Senin çanta-n-ı / onun çanta-sı-n-ı.",
      "Tek başına bağlamsız biçime sahip kişi eklememek için açık tamlayanla çöz.",
      "Her n sesini aynı ek veya yalnız görünen son ünlüyü iyelik sayma.",
    ),
    example(
      "Belirsiz gönderimi onar",
      "‘Merve, Selin’e onun notunu verdi.’ cümlesinde notun sahibi kesin olarak hangisidir?",
      "Birden çok olası gönderimin anlamlı kalıp kalmadığını dene.",
      [
        ["İlk okuma", "Onun yerine Merve’nin koyunca anlamlı cümle kurulur."],
        [
          "İkinci okuma",
          "Onun yerine Selin’in koyunca da farklı ama anlamlı cümle kurulur.",
        ],
        [
          "Onarım",
          "Dış bağlam yoksa kesin sahip seçilemez; amaçlanan adı açıkça yazmak belirsizliği giderir.",
        ],
      ],
      "Verilen cümle tek başına kesin sahibi belirlemez.",
      "Zamir gönderimini çözerken son söylenen adı otomatik doğru kabul etme.",
      "Soruda olmayan kişi bilgisini sen ekleyerek tek cevap üretme.",
    ),
  ],
  recall: [
    {
      prompt: "Bu kalem / bunu çiftinde görev nasıl değişir?",
      answer:
        "Bu, açık kalem adını belirttiğinde işaret sıfatı; adın yerine geçtiğinde işaret zamiridir.",
    },
    {
      prompt: "Bana hangi zamirin hangi durumudur?",
      answer: "Ben kişi zamirinin yönelme durumudur; bu çekimde biçim değişir.",
    },
    {
      prompt: "Seninki ile evdeki defterdeki -ki aynı mıdır?",
      answer:
        "Seninki, senin defterin diye açılan ilgi zamiridir; evdeki, açık defter adını niteleyen sıfat yapan yapıdır.",
    },
    {
      prompt: "Geldim cümlesinde açık ben zamiri var mı?",
      answer:
        "Hayır. Kişi yüklem ekiyle anlaşılır; açık zamir sözcüğü ile kişi eki aynı değildir.",
    },
    {
      prompt: "O geldi cümlesinden kişi/işaret ayrımı her zaman kesinleşir mi?",
      answer:
        "Hayır. O’nun insanı mı başka varlığı mı karşıladığına ilişkin bağlam gerekir.",
    },
  ],
  source:
    "Aurelia Zamirler kopya kağıdı, öğretim/kapsam PDF s.2–5,7–9; OGM Video Ders Notu İsim Soylu Sözcükler PDF s.13–17; OGM Dersler Cepte 9. sınıf Roman/Zamir fasikülü basılı s.15–16 canlı okunabilir metniyle karşılaştırılan özgün öğretim. Sıfat yapan -ki ile ilgi zamiri kaynak örnekleri karşılaştırılarak ayrıldı. MEBİ ve geçmiş ÖSYM atıfları bu görevde ayrıca doğrudan doğrulanmadı; aşağıdaki soruların tümü özgündür.",
};

const nounQuestions: Question[] = [
  question(
    "f093-noun-1",
    nounGuide.id,
    "‘Aralarındaki sevgi, arkadaşları birbirine yaklaştırdı.’ cümlesindeki sevgi sözcüğü varlığa veriliş, algılanış ve sayı bakımından nasıl sınıflandırılır?",
    [
      "Cins, soyut, tekil",
      "Özel, somut, çoğul",
      "Cins, somut, topluluk",
      "Özel, soyut, tekil",
      "Cins, soyut, çoğul",
    ],
    0,
    "Üç ayrı ölçütü ayrı ayrı uygula; aralarındaki sözü burada bir duygu ilişkisini tanımlıyor.",
    "Sevgi bu cümlede kişi adı değil duygu kavramıdır: cins ve soyuttur. Çoğul eki veya bireylerden oluşan bir bütün anlamı taşımadığı için tekildir. Aralarındaki sözü ve cümle ortasında küçük harfle yazımı burada duygu kavramı anlamını açıklaştırır; kişi adı olarak yorumlanmaz.",
  ),
  question(
    "f093-noun-2",
    nounGuide.id,
    "‘Sürü yamaçta otluyordu.’ cümlesindeki sürü adı sayı bakımından hangi özelliği taşır?",
    [
      "Mutlaka -ler çoğul eki taşır.",
      "Her durumda tek hayvanı adlandırır.",
      "İki ayrı basit adın birleşimidir.",
      "Çoğul eki olmadan birçok bireyi bütün olarak adlandırır.",
      "Yalnız bir hayvanın özel adıdır.",
    ],
    3,
    "Biçimde çoğul eki var mı, anlamda bir bütünün üyeleri var mı?",
    "Sürü, çoğul eki almadan çok sayıda hayvandan oluşan bir bütünü karşılayan topluluk adıdır. Bu özellik onu -lar/-ler taşıyan hayvanlar biçimiyle aynı yapmaz. Sürüler denirse birden fazla sürü anlatılır.",
  ),
  question(
    "f093-noun-3",
    nounGuide.id,
    "‘Kitaplarımızdan birini seçtik.’ cümlesindeki kitaplarımızdan sözcüğü yapı bakımından nasıl açıklanır?",
    [
      "Her çokluk eki yapım eki olduğu için türemiştir.",
      "Yalnız çekim ekleri taşıyan basit isimdir.",
      "En az iki kök içerdiği için birleşiktir.",
      "Yönelme ekiyle yeni sözcük kurulmuştur.",
      "İyelik eki sözcüğün kökünü fiile çevirmiştir.",
    ],
    1,
    "Kitap-lar-ımız-dan parçalarında yeni sözlük anlamı kuran bir ek bulunuyor mu?",
    "Kitap kökü basittir; -lar çoğul, -ımız iyelik, -dan ayrılma durumudur. Bunlar çekim ekleridir. Çok ek almak tek başına türeme veya birleşme değildir; örneğin kitaplık biçimindeki -lık yapım ekiyle durum değişirdi.",
  ),
  question(
    "f093-noun-4",
    nounGuide.id,
    "‘Onun defterini dikkatle inceledim.’ cümlesinde defter-i-n-i biçimindeki ilk ve son -i eklerinin görevleri sırasıyla nedir?",
    [
      "İlgi ve çoğul",
      "Belirtme ve iyelik",
      "Yapım ve yönelme",
      "Kişi ve bulunma",
      "İyelik ve belirtme durumu",
    ],
    4,
    "Önce onun defteri aitlik grubunu, sonra neyi inceledim sorusunun yanıtını kur.",
    "Onun defteri grubunda ilk -i üçüncü tekil iyelik ekidir. Defteri fiilin belirli nesnesi yapmak için son -i belirtme durumu gelir; n bağlantıyı sağlar. İki ek aynı sesle görünse de farklı ilişkiler kurar.",
  ),
  question(
    "f093-noun-5",
    nounGuide.id,
    "‘Mahallenin geniş parkı yenilendi.’ cümlesindeki mahallenin geniş parkı grubunda temel isim tamlaması hangisidir?",
    [
      "Geniş parkı: belirtisiz isim tamlaması",
      "Mahallenin geniş: zincirleme isim tamlaması",
      "Mahallenin parkı: belirtili isim tamlaması",
      "Geniş park: zincirleme isim tamlaması",
      "Mahalle park: iki unsuru da eksiz belirtili tamlama",
    ],
    2,
    "Geniş niteliğini bir an kaldır; iki adın üzerindeki ekleri incele.",
    "Mahalle-nin tamlayan, park-ı tamlanandır; ilgi ve iyelik ekleri belirtili isim tamlamasını kurar. Geniş, parkı niteleyen sıfattır ve araya girebilir. Üç sözcük görülmesi tek başına zincirleme yapıyı kanıtlamaz.",
  ),
  question(
    "f093-noun-6",
    nounGuide.id,
    "Aşağıdaki söz gruplarından hangisi belirtisiz isim tamlamasıdır?",
    [
      "Tren istasyonu",
      "Trenin istasyonu",
      "Sessiz istasyon",
      "Çok sessiz",
      "İstasyonda bekledi",
    ],
    0,
    "İlk adın ilgi eki taşımadığı, ikinci adın iyelik eki aldığı grubu ara.",
    "Tren + istasyon-u iki ad arasında, tamlayanı ilgi eki almayan belirtisiz tamlamadır. Trenin istasyonu belirtilidir; sessiz istasyon sıfat tamlamasıdır. Çok sessiz adlar arası tamlama kurmaz; istasyonda bekledi ise fiilli bir yapıdır.",
  ),
  question(
    "f093-noun-7",
    nounGuide.id,
    "‘Okulun bahçe kapısı boyandı.’ cümlesindeki okulun bahçe kapısı grubunun zincirleme olduğuna hangi kanıt yeterlidir?",
    [
      "İçindeki her sözcüğün çoğul eki alması",
      "Bütün eklerin yapım eki olması",
      "Arada mutlaka niteleme sıfatı bulunması",
      "Bahçe kapısı grubunun kendi içinde isim tamlaması olması",
      "Tamlanan sözcüğün cümlede yer almaması",
    ],
    3,
    "Dış ilişkinin unsurlarından birinin kendi içinde tamlama kurup kurmadığını göster.",
    "Bahçe + kapı-sı belirtisiz isim tamlamasıdır; bu bütün okulun unsuruyla daha geniş ilişki kurar. Böylece içte bir tamlama, dışta ona bağlanan ilişki vardır. Zincirlemeyi kanıtlayan yalnız sözcük sayısı değil bu iç yapıdır.",
  ),
  question(
    "f093-noun-8",
    nounGuide.id,
    "‘Komşunun eski evi satıldı.’ cümlesindeki eski sözcüğü isim tamlamasını nasıl etkiler?",
    [
      "Ev üzerindeki iyelik ekini kaldırır.",
      "Evi niteler; komşunun evi belirtili tamlaması sürer.",
      "Komşu sözcüğünü kişi zamirine çevirir.",
      "İki adı da sıfata çevirip tamlamayı yok eder.",
      "Tek başına ikinci bir isim tamlaması kurar.",
    ],
    1,
    "Eski sözcüğünün hangi adı nitelediğini ve ana iki adın eklerinin korunup korunmadığını denetle.",
    "Eski, ev adının niteliğini bildirir. Komşu-nun ve ev-i üzerindeki ilgi/iyelik ilişkisi korunur; belirtili tamlamada araya sıfat girebilir. Eski bir ad olmadığı için yeni bir iç isim tamlaması oluşturmaz.",
  ),
  question(
    "f093-noun-9",
    nounGuide.id,
    "‘Çantam kayboldu.’ cümlesindeki çantam sözcüğünün aitlik ilişkisi hangi açık grupla gösterilebilir?",
    [
      "Onun çantası",
      "Senin çantan",
      "Bizim çantamız",
      "Onların çantaları",
      "Benim çantam",
    ],
    4,
    "Çanta-m biçimindeki iyelik kişisini açık tamlayanla eşleştir.",
    "Çanta-m birinci tekil iyelik taşır; benim çantam biçiminde açılır. Söylenmeyen benim tamlayanı ek sayesinde anlaşılır. Bu ek yüklemdeki kişi eki değil, çantanın kime ait olduğunu bildiren iyelik ekidir.",
  ),
  question(
    "f093-noun-10",
    nounGuide.id,
    "‘Öğretmenin ve öğrencinin çantası kapıda duruyor.’ cümlesindeki öğretmenin ve öğrencinin çantası grubunda ortak kullanılan unsur hangisidir?",
    [
      "İlgi eki taşımayan okul adı",
      "İki ayrı sıfat-fiil",
      "Tamlanan olan çantası",
      "Tamlayan olan kapıda",
      "Ayrılma eki olan ve",
    ],
    2,
    "İki ilgi ekli unsurun ortak olarak hangi asıl varlık adına bağlandığını bul.",
    "Öğretmenin ve öğrencinin iki tamlayandır; çantası ikisine bağlanan ortak tamlanandır. Ve bağlaçtır, bir durum eki değildir. Bu soru grubun dil bilgisel bağlantısını sorar; çantanın gerçek hayattaki paylaşımını ayrıca belirlemez.",
  ),
];
const adjectiveQuestions: Question[] = [
  question(
    "f093-adj-1",
    adjectiveGuide.id,
    "‘Mavi uçurtma yükselirken çocuk gülümsedi.’ cümlesindeki mavi sözcüğünün görevi nedir?",
    [
      "Yükselme fiilinin miktarını bildirir.",
      "Uçurtma adının rengini bildiren niteleme sıfatıdır.",
      "Çocuk adının yerini tutan kişi zamiridir.",
      "İki yargıyı bağlayan bağlaçtır.",
      "Uçurtma adının ilgi ekidir.",
    ],
    1,
    "Mavi hangi sözcüğün özelliğini bildiriyor?",
    "Mavi, uçurtma adını renk bakımından niteler; niteleme sıfatıdır. Fiilin nasıl yapıldığını değil varlığın niteliğini bildirir. Zamir olmadığı için bir adın yerine geçmez; açık uçurtma adına bağlanır.",
  ),
  question(
    "f093-adj-2",
    adjectiveGuide.id,
    "‘Bu kitabı seçtim; bunu akşam okuyacağım.’ cümlesinde bu ve bunu biçimlerinin görevleri sırasıyla hangisidir?",
    [
      "Kişi zamiri / niteleme sıfatı",
      "Belgisiz sıfat / kişi zamiri",
      "Soru sıfatı / soru zamiri",
      "Zarf / bağlaç",
      "İşaret sıfatı / işaret zamiri",
    ],
    4,
    "İlk kullanımda açık kitap adı, ikincisinde onun yerini tutan biçim var mı?",
    "Bu, açık kitap adını göstererek belirttiğinden işaret sıfatıdır. Bunu ikinci bölümde kitabı tekrar söylemeden karşılar; işaret zamiridir ve belirtme durum eki alır. Aynı kökün görevi cümle yapısıyla değişmiştir.",
  ),
  question(
    "f093-adj-3",
    adjectiveGuide.id,
    "‘İkinci masaya ikişer tabak ve yarım ekmek bıraktık.’ cümlesindeki ikinci, ikişer ve yarım sözcükleri sırasıyla hangi sayı sıfatlarıdır?",
    [
      "Sıra / üleştirme / kesir",
      "Asıl / sıra / üleştirme",
      "Kesir / asıl / sıra",
      "Üleştirme / kesir / asıl",
      "Sıra / asıl / belgisiz",
    ],
    0,
    "Sıraya koymayı, her birine düşen payı ve bütünden parçayı ayrı ayrı ara.",
    "İkinci masanın sırasını; ikişer paylaştırılan tabak miktarını; yarım ekmeğin bir parçasını bildirir. Bu nedenle sıra, üleştirme ve kesir sayı sıfatlarıdır. Üçü de açık adları belirtir, adların yerine geçmez.",
  ),
  question(
    "f093-adj-4",
    adjectiveGuide.id,
    "‘İki bilet değil, yalnız bir bilet aldım.’ cümlesinde bir sözcüğü hangi görevde kullanılmıştır?",
    [
      "Belgisiz zamir",
      "Soru sıfatı",
      "İlgi zamiri",
      "Asıl sayı sıfatı",
      "Fiilin niteliğini bildiren zarf",
    ],
    3,
    "Cümlede herhangi bir bilet mi, kesin tek adet mi karşılaştırılıyor?",
    "İki ile karşılaştırma ve yalnız vurgusu, bir sözcüğünün kesin tek adedi bildirdiğini açıklaştırır. Bilet adını belirten asıl sayı sıfatıdır. Herhangi bir zaman/varlık anlamındaki belgisiz bir kullanım burada amaçlanmamıştır.",
  ),
  question(
    "f093-adj-5",
    adjectiveGuide.id,
    "‘Bazı öğrenciler kütüphanede bekliyor.’ cümlesindeki bazı sözcüğü için doğru açıklama hangisidir?",
    [
      "Öğrenci adının yerini tutan belgisiz zamirdir.",
      "Beklemek fiilinin nasıl yapıldığını bildirir.",
      "Açık öğrenciler adını belirsiz miktarla belirten sıfattır.",
      "Kesin iki öğrenci bildiren sayı sıfatıdır.",
      "Öğrenci adını çoğul yapan çekim ekidir.",
    ],
    2,
    "Bazı sözcüğünden sonra onun belirttiği açık bir ad var mı?",
    "Bazı, açık öğrenciler adının belirsiz bölümünü/miktarını belirtir; belgisiz sıfattır. Bazıları bekliyor biçiminde adın yerini tutsaydı zamir olurdu. Bekleme eyleminin biçimini açıklamadığından zarf da değildir.",
  ),
  question(
    "f093-adj-6",
    adjectiveGuide.id,
    "‘Hangi sokağa döneceğiz?’ cümlesinde hangi sözcüğünün görevi nedir?",
    [
      "Dönme fiilinin süresini belirleyen zarf",
      "Açık sokak adını soru yoluyla belirten sıfat",
      "Sokak adının yerine geçen işaret zamiri",
      "Aitlik bildiren iyelik eki",
      "Yargıları bağlayan bağlaç",
    ],
    1,
    "Sorulan sözcük bir adın önünde mi, adın yerinde mi?",
    "Hangi, açık sokağa adını soru yoluyla belirtir; soru sıfatıdır. Sokağın yönelme eki taşıması adı ortadan kaldırmaz. Hangisine döneceğiz biçiminde açık ad düşseydi soru zamiri kullanımı oluşurdu.",
  ),
  question(
    "f093-adj-7",
    adjectiveGuide.id,
    "‘Yaşlı komşular bankta oturdu.’ cümlesi ‘Yaşlılar bankta oturdu.’ biçiminde yeniden kuruluyor. İkinci cümlede yaşlılar nasıl açıklanır?",
    [
      "Bank sözcüğünü niteleyen sıfat",
      "Oturma fiilini niteleyen durum zarfı",
      "Mutlaka kişi zamiri",
      "Çoğul ekiyle fiile dönüşmüş yüklem",
      "Düşen komşular adını karşılayan adlaşmış sıfat",
    ],
    4,
    "Kişileri niteleyen anlam korunurken açık ad söyleniyor mu?",
    "Yaşlı niteliği korunmuş, komşular adı düşmüştür. Yaşlılar bu kişileri adlandıracak biçimde kullanıldığı için adlaşmış sıfattır. Ad görevine geçmesi onu otomatik kişi zamiri yapmaz; niteliği taşıyan yapı sürer.",
  ),
  question(
    "f093-adj-8",
    adjectiveGuide.id,
    "‘Daha geniş bir oda arıyoruz.’ cümlesinde daha ve geniş sözcüklerinin görevleri sırasıyla hangisidir?",
    [
      "Geniş sıfatını derecelendiren zarf / odayı niteleyen sıfat",
      "İşaret zamiri / kişi zamiri",
      "İki ayrı isim tamlaması",
      "Sayı sıfatı / belgisiz zamir",
      "İlgi eki / iyelik eki",
    ],
    0,
    "Daha doğrudan odayı mı, geniş niteliğinin derecesini mi etkiliyor?",
    "Geniş oda adının niteliğidir, niteleme sıfatıdır. Daha ise bu niteliğin karşılaştırmalı derecesini belirler, zarftır. Bir adın önündeki bütün sözcüklerin sıfat olduğu varsayımı bu ayrımı kaçırır.",
  ),
  question(
    "f093-adj-9",
    adjectiveGuide.id,
    "‘Mavi gözlü çocuk kapıyı açtı.’ cümlesindeki mavi gözlü grubu için doğru açıklama hangisidir?",
    [
      "Göz adını düşürmüş kişi zamiridir.",
      "Çocuğun nasıl açtığını bildiren tek sözcüklü zarftır.",
      "İki yargıyı birbirine bağlar.",
      "Birlikte çocuk adını niteleyen kurallı birleşik sıfattır.",
      "Hiçbir ada bağlanmayan sayı sıfatıdır.",
    ],
    3,
    "Mavi göz grubu -lü ile hangi varlığı niteleyecek hâle geliyor?",
    "Mavi gözlü grubu bütün olarak çocuk adını niteler. Sıfat tamlamasının -lü ile genişlemesi kurallı birleşik sıfat oluşturur. Açma eyleminin biçimini anlatmadığından zarf, adın yerine geçmediğinden zamir değildir.",
  ),
  question(
    "f093-adj-10",
    adjectiveGuide.id,
    "‘Okunacak romanları ayrı rafa koydum.’ cümlesindeki okunacak sözcüğünün sıfat-fiil sayılmasının gerekçesi hangisidir?",
    [
      "Bütün -acak sesleri mutlaka isim köküdür.",
      "Romanların sayısını kesinleştirir.",
      "Fiil kökünden kurulmuş, eylem anlamını koruyarak roman adını niteler.",
      "Roman adının yerini tutan soru zamiridir.",
      "Yalnız rafın kime ait olduğunu bildirir.",
    ],
    2,
    "Kök ve ek görüntüsünün yanında sözcüğün nitelediği adı da kanıtla.",
    "Okunacak, oku- fiilinden kurulmuştur ve romanların okunmasıyla ilgili eylem anlamını sürdürerek adı niteler. Bu kök+görev birlikteliği sıfat-fiil kanıtıdır. Her benzer ek görünüşünü kalıcı isim veya zamir saymak doğru değildir.",
  ),
];
const pronounQuestions: Question[] = [
  question(
    "f093-pron-1",
    pronounGuide.id,
    "‘Bana bu mektubu sen getirdin.’ cümlesindeki bana sözcüğü nasıl açıklanır?",
    [
      "Bu sözcüğünün çoğul biçimi",
      "Ben kişi zamirinin bulunma durumu",
      "Ben kişi zamirinin yönelme durumu",
      "Mektup adının iyelik eki",
      "Sen zamirinin ayrılma durumu",
    ],
    2,
    "Kime getirdin sorusunu ve ben/sen yönelme biçimlerini düşün.",
    "Bana, ben kişi zamirinin yönelme durumudur; ben + e biçiminde bene değil bana olur. Bu biçim değişimi zamiri başka bir türde sözcüğe dönüştürmez. Bulunma bende, ayrılma benden biçimindedir.",
  ),
  question(
    "f093-pron-2",
    pronounGuide.id,
    "‘Deniz toplantıya katıldı. O, önerisini açıkladı.’ sözünde ikinci cümledeki O, verilen bağlama göre hangi türdedir?",
    [
      "Deniz adının yerini tutan kişi zamiri",
      "Öneri adını niteleyen sıfat",
      "İki yargıyı bağlayan bağlaç",
      "Konuşmanın nasıl yapıldığını bildiren zarf",
      "Deniz adının ilgi eki",
    ],
    0,
    "İkinci cümlenin öznesini önceki kişi adıyla aç.",
    "O yerine Deniz koyunca anlam korunur: Deniz önerisini açıkladı. İnsan adının yerine geçen o kişi zamiridir. Açık bir adı nitelemediğinden sıfat değildir; bu sonuç bağlamdaki belirli gönderime dayanır.",
  ),
  question(
    "f093-pron-3",
    pronounGuide.id,
    "‘Kalemi buldum; onu masaya bıraktım.’ cümlesinde onu sözcüğü verilen gönderime göre nedir?",
    [
      "Kalem adını niteleyen işaret sıfatı",
      "Belirtme durum eki almamış kişi zamiri",
      "Yalnız bir soru zamiri",
      "Kalem adının yerini tutan işaret zamiri",
      "Bırakma fiilinin miktar zarfı",
    ],
    3,
    "Onu yerine ilk bölümdeki hangi varlık adı yazılabilir?",
    "Onu, kalemi biçiminde açılır; insan dışındaki nesnenin adını göstererek karşılar. Bu nedenle işaret zamiridir ve belirtme durum eki taşır. Açık kalem adının önünde bulunmadığından işaret sıfatı değildir.",
  ),
  question(
    "f093-pron-4",
    pronounGuide.id,
    "‘Ece aynada kendini gördü.’ cümlesinde kendini hangi türdedir?",
    [
      "Belgisiz sıfat",
      "Ece’ye dönen dönüşlülük zamiri",
      "Ayna adının yerine geçen soru zamiri",
      "Ayrı yazılan bağlaç",
      "Görme fiilinin zaman zarfı",
    ],
    1,
    "Gören kişiyle görülen kişinin aynı olup olmadığını kontrol et.",
    "Kendini, özne Ece’yi karşılar; eylemin etkisi özneye döner. Kendi sözcüğünün bu kullanımı dönüşlülük zamiridir. Cümlede açık bir adı belirleyen sıfat veya soru yoluyla bir ad arayan zamir yoktur.",
  ),
  question(
    "f093-pron-5",
    pronounGuide.id,
    "‘Katılımcıların hepsi salona girdi.’ cümlesindeki hepsi için doğru açıklama hangisidir?",
    [
      "Salon adını niteleyen sıfat",
      "Girme fiilinin nasıl yapıldığını bildiren zarf",
      "Belirli tek kişinin özel adı",
      "İki yargıyı bağlayan bağlaç",
      "Katılımcıları ayrı ayrı adlandırmadan karşılayan belgisiz zamir",
    ],
    4,
    "Kümenin tümünü anlatması, onun açık bir adın yerini tutma görevini değiştirir mi?",
    "Hepsi, katılımcı adını tekrar etmeden kümenin bütün üyelerini karşılar; belgisiz zamirdir. Belgisiz zamir mutlaka miktarın az veya bilinmez olması demek değildir. Hepsi açık bir adın önünde sıfat olarak kullanılmıyor.",
  ),
  question(
    "f093-pron-6",
    pronounGuide.id,
    "‘Kimi insanlar erken gelir.’ ve ‘Kimi aradın?’ cümlelerindeki kimi sözcüklerinin görevleri sırasıyla hangisidir?",
    [
      "Soru zamiri / işaret sıfatı",
      "Kişi zamiri / belgisiz sıfat",
      "Belgisiz sıfat / soru zamiri",
      "İki cümlede de bağlaç",
      "İki cümlede de kişi zamiri",
    ],
    2,
    "İlkinde açık insanlar adını, ikincisinde yanıt olarak aranan kişi adını düşün.",
    "İlk kimi, açık insanlar adını kesin olmayan bir bölümle belirten belgisiz sıfattır. İkinci kimi, aranan kişinin adı yerine sorulduğu için soru zamiridir. Aynı yazılış, aynı sözcük türünü garanti etmez.",
  ),
  question(
    "f093-pron-7",
    pronounGuide.id,
    "‘Benim defterim çizgili, seninki kareli.’ cümlesinde seninki sözcüğündeki -ki nedir?",
    [
      "Senin defterin diye açılabilen ilgi zamiri",
      "Ayrı yazılması gereken bağlaç",
      "Açık defter adını niteleyen bulunma eki",
      "Soru zamiri oluşturan her zaman ayrı bir sözcük",
      "Çoğul eki",
    ],
    0,
    "Tamlanan ad geri getirildiğinde seninki hangi grupla aynı anlamı verir?",
    "Seninki, senin defterin biçiminde açılır; -ki tamlanan adın yerini tutan ilgi zamiridir. Evdeki defterdeki gibi açık adı niteleyen yer grubu kurmaz. İki yargıyı bağlayan ayrı ki de değildir.",
  ),
  question(
    "f093-pron-8",
    pronounGuide.id,
    "‘Biliyorum ki evdeki dosya seninki değil.’ cümlesinde sırasıyla ki, evdeki içindeki -ki ve seninki içindeki -ki nasıl ayrılır?",
    [
      "Üçü de ilgi zamiridir.",
      "Üçü de bağlaçtır.",
      "İlgi zamiri / bağlaç / soru sıfatı",
      "Bağlaç / sıfat yapan -ki / ilgi zamiri",
      "Sıfat yapan -ki / kişi eki / bağlaç",
    ],
    3,
    "Biri yargıları bağlıyor, biri açık dosya adını niteliyor, biri senin dosyan diye açılıyor.",
    "Biliyorum ki yapısındaki ki bağlaçtır. Evdeki dosya grubunda -ki yer ifadesini açık ada bağlayarak sıfat yapar. Seninki ise senin dosyan yerine kullanılır; ilgi zamiridir. Bitişik yazılan iki ekin görevleri farklıdır.",
  ),
  question(
    "f093-pron-9",
    pronounGuide.id,
    "‘Evim geniş. Dün buraya geldim.’ sözünde evim ve geldim sözcüklerindeki son -m seslerinin görevleri sırasıyla nedir?",
    [
      "İki sözcükte de çoğul eki",
      "Ev adına aitlik bildiren iyelik / yüklemde kişiyi bildiren kişi eki",
      "İki sözcükte de ilgi zamiri",
      "Yüklemde kişi eki / ev adına ayrılma durumu",
      "İki sözcükte de soru edatı",
    ],
    1,
    "Benim evim ile ben geldim açılımlarında -m aynı ilişkiyi mi kuruyor?",
    "Evim, benim evim diye açılır; -m aitlik bildiren iyelik ekidir. Geldim yükleminde -m eylemi yapanın birinci tekil kişi olduğunu bildirir. Bu yüzden birincisi ek hâlindeki iyelik, ikincisi yüklem kişi ekidir; açık ben zamiriyle de aynı şey değildir.",
  ),
  question(
    "f093-pron-10",
    pronounGuide.id,
    "‘Merve, Selin’e onun notunu verdi.’ cümlesinde onun zamirinin gönderimi hakkında, başka bağlam verilmediğinde hangi yargı doğrudur?",
    [
      "Kesinlikle yalnız Selin’i karşılar.",
      "Kesinlikle yalnız Merve’yi karşılar.",
      "Onun burada açık not adını niteleyen sayı sıfatıdır.",
      "Cümlede iyelik ilişkisi kurmak olanaksızdır.",
      "Notun Merve’ye mi Selin’e mi ait olduğunu cümle tek başına kesinleştirmez.",
    ],
    4,
    "Onun yerine iki kişi adını ayrı ayrı koy; iki okuma da mümkün mü?",
    "Onun, verilen bağlamda Merve’nin veya Selin’in notuna gönderilebilir. Zamirin son anılan kişiye mutlaka döneceği kuralı yoktur. Kesin sahip isteniyorsa kişi adı açıkça tekrarlanmalı veya ek bağlam verilmelidir.",
  ),
];
export const forge093TurkishGuides: LessonGuide[] = [
  nounGuide,
  adjectiveGuide,
  pronounGuide,
];
const banks = [nounQuestions, adjectiveQuestions, pronounQuestions];
const titles = [
  "İsimler ve isim tamlaması: adları ilişkilendir",
  "Sıfatlar: adın özelliğini ve sınırını bul",
  "Zamirler: adı tekrarlamadan anlamı koru",
];
export const forge093TurkishLessons: Lesson[] = forge093TurkishGuides.map(
  (guide, index) => ({
    id: guide.id,
    subjectId: "tyt-turkce",
    title: txt(titles[index]),
    minutes: guide.minutes,
    objectives: guide.objectives.map(txt),
    body: guide.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    source: txt(guide.source),
    tags: ["kaynakli-anlatim", "adim-adim", "sozcuk-turleri"],
    questions: banks[index],
  }),
);
export const forge093TurkishTopics: Record<string, string> = {
  "isimler-isim-tamlamasi": "detail-252",
  sifatlar: "detail-253",
  zamirler: "detail-254",
};

export type WordTaskKind =
  "noun" | "adjective" | "pronoun" | "adverb" | "nominalized";
export const wordTaskNames: Record<WordTaskKind, string> = {
  noun: "İsim",
  adjective: "Sıfat",
  pronoun: "Zamir",
  adverb: "Zarf",
  nominalized: "Adlaşmış sıfat",
};
export interface WordContext {
  id: string;
  label: string;
  words: string[];
  target: number;
  answer: WordTaskKind;
  evidence: string;
  relation: string;
}
export const wordContexts: WordContext[] = [
  {
    id: "point-open",
    label: "Bu + açık ad",
    words: ["Bu", "kitabı", "seçtim."],
    target: 0,
    answer: "adjective",
    evidence: "Bu, açık kitap adını göstererek belirtir; işaret sıfatıdır.",
    relation: "Bu → kitap: açık adı belirtme",
  },
  {
    id: "point-replace",
    label: "Bu + adın yeri",
    words: ["Bunu", "seçtim."],
    target: 0,
    answer: "pronoun",
    evidence:
      "Kitap adı söylenmez; bunu adın yerini göstererek tutar. İşaret zamiridir.",
    relation: "Bunu → bu kitabı: adı geri getirme",
  },
  {
    id: "quality-open",
    label: "Hızlı + açık ad",
    words: ["Hızlı", "tren", "geldi."],
    target: 0,
    answer: "adjective",
    evidence: "Hızlı, tren adının niteliğidir; nasıl tren sorusu adı hedefler.",
    relation: "Hızlı → tren: adın niteliği",
  },
  {
    id: "quality-action",
    label: "Hızlı + eylem",
    words: ["Tren", "hızlı", "geldi."],
    target: 1,
    answer: "adverb",
    evidence:
      "Hızlı, gelme eyleminin nasıl gerçekleştiğini bildirir; durum zarfıdır.",
    relation: "Hızlı → geldi: eylemin biçimi",
  },
  {
    id: "old-open",
    label: "Yaşlı + açık ad",
    words: ["Yaşlı", "komşular", "oturdu."],
    target: 0,
    answer: "adjective",
    evidence: "Yaşlı, açık komşular adını niteleyen sıfattır.",
    relation: "Yaşlı → komşular: açık nitelik bağı",
  },
  {
    id: "old-replace",
    label: "Yaşlı + adın yeri",
    words: ["Yaşlılar", "oturdu."],
    target: 0,
    answer: "nominalized",
    evidence:
      "Komşular adı düşmüş, yaşlı niteliği ad görevinde kullanılmıştır. Adlaşmış sıfattır; her ad görevi gören sözcük zamir değildir.",
    relation: "Yaşlılar → yaşlı komşular: nitelik korunarak adlaşma",
  },
  {
    id: "uncertain-open",
    label: "Bazı + açık ad",
    words: ["Bazı", "öğrenciler", "kaldı."],
    target: 0,
    answer: "adjective",
    evidence:
      "Bazı, açık öğrenciler adını belirsiz miktarla belirtir; belgisiz sıfattır.",
    relation: "Bazı → öğrenciler: açık adı belirtme",
  },
  {
    id: "uncertain-replace",
    label: "Bazı + adın yeri",
    words: ["Bazıları", "kaldı."],
    target: 0,
    answer: "pronoun",
    evidence:
      "Bazıları öğrenciler adının yerini belirsiz biçimde tutar; belgisiz zamirdir.",
    relation: "Bazıları → bazı öğrenciler: adı geri getirme",
  },
  {
    id: "question-open",
    label: "Hangi + açık ad",
    words: ["Hangi", "kitabı", "aldın?"],
    target: 0,
    answer: "adjective",
    evidence: "Hangi, açık kitap adını soru yoluyla belirtir; soru sıfatıdır.",
    relation: "Hangi → kitap: açık adı soruyla belirtme",
  },
  {
    id: "question-replace",
    label: "Hangi + adın yeri",
    words: ["Hangisini", "aldın?"],
    target: 0,
    answer: "pronoun",
    evidence:
      "Hangisini, açık ad olmadan bir varlığın adını sorar; soru zamiridir.",
    relation: "Hangisini → hangi kitabı: adı soru yoluyla karşılama",
  },
  {
    id: "name",
    label: "Varlığın adı",
    words: ["Kitap", "masada", "duruyor."],
    target: 0,
    answer: "noun",
    evidence:
      "Kitap, bir varlığın ortak adıdır; başka adı nitelemiyor veya onun yerini zamirle tutmuyor.",
    relation: "Kitap: varlığı adlandırma",
  },
];
export type PhraseMode = "indefinite" | "definite" | "chain";
export function buildTurkishPhrase(mode: PhraseMode, adjective: boolean) {
  const inner = mode === "chain" ? "bahçe kapısı" : "kapı";
  if (mode === "chain")
    return {
      sentence: adjective
        ? "Okulun yeni bahçe kapısı açıldı."
        : "Okulun bahçe kapısı açıldı.",
      phrase: "Okulun bahçe kapısı",
      parts: ["okul-un", "[bahçe kapı-sı]"],
      kind: "Zincirleme isim tamlaması",
      answer: "chain",
      evidence:
        "[Bahçe kapısı] içte belirtisiz isim tamlamasıdır; okulun bu bütünle ilişki kurar. Yeni sıfatı eklenirse bu iç ilişki korunur.",
      inner,
    };
  if (mode === "definite")
    return {
      sentence: adjective
        ? "Okulun yeni kapısı açıldı."
        : "Okulun kapısı açıldı.",
      phrase: "Okulun kapısı",
      parts: ["okul-un", "kapı-sı"],
      kind: "Belirtili isim tamlaması",
      answer: "definite",
      evidence:
        "Okul-un ilgi, kapı-sı iyelik taşır. Yeni sıfatı araya girse de ana iki adın ekleri ve ilişkisi değişmez.",
      inner,
    };
  return {
    sentence: adjective ? "Yeni okul kapısı açıldı." : "Okul kapısı açıldı.",
    phrase: "Okul kapısı",
    parts: ["okul", "kapı-sı"],
    kind: "Belirtisiz isim tamlaması",
    answer: "indefinite",
    evidence:
      "Okul ilgi eki almaz; kapı-sı iyelik taşır. Yeni sıfatını iki adın arasına gelişigüzel sokmak yerine bütün grubun önünde kullanıyoruz.",
    inner,
  };
}
