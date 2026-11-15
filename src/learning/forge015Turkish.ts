import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

// Authored bounded examples: this module does not parse arbitrary Turkish.
export const verbalsGuide015: LessonGuide = {
  id: "fiilimsiler",
  minutes: 75,
  objectives: [
    "Fiil kökü, fiilimsi eki ve cümledeki görevi birlikte kanıtla.",
    "İsim-fiil, sıfat-fiil ve zarf-fiili çekimli fiil ile kalıcı addan ayır.",
    "Adlaşmış sıfat-fiili ve fiilimsi yüklemini doğru yorumla.",
    "Aynı biçimin yeni bağlamda neden farklı görev aldığını açıkla.",
  ],
  sections: [
    {
      title: "Fiilden doğan üç görev",
      paragraphs: [
        "Fiilimsi, fiil kök veya gövdesinden belirli eklerle kurulup cümlede isim, sıfat ya da zarf görevi üstlenen sözcüktür. “Okumayı seviyorum.” sözünde okuma bir etkinliğin adıdır; “Okuyan çocuk bekliyor.” sözünde okuyan çocuğu niteler; “Okuyarak öğrendi.” sözünde okuyarak öğrenmenin nasıl yapıldığını gösterir. Üçünde de okuma eylemi anlamca korunur.",
        "Fiilimsi eki, okul dil bilgisinde yapım eki sayılır. Fiilimsi, bir çekimli fiil gibi kip ve kişiyle bağımsız temel yargı kurmaz; fakat isim çekim eki alabilir veya ek fiille yüklem olabilir. “Okuduğum kitap” sözündeki -um iyelik ilişkisi kurar; yalnız kişi çağrışımı yapıyor diye okuduğum sözcüğüne çekimli fiil denmez. Kökü, eki ve bağlı olduğu sözü ayrı ayrı göster.",
      ],
    },
    {
      title: "İsim-fiil: eylemi ad olarak kullan",
      paragraphs: [
        "İsim-fiil ekleri -ma/-me, -mak/-mek ve -ış/-iş/-uş/-üş biçimleridir. “Yürümek iyi gelir.” cümlesinde yürümek özne; “Yürümeyi seviyorum.” cümlesinde yürümeyi belirtili nesnedir. İkinci biçimde yürü-me-y-i çözümlemesiyle fiilimsi ekinin ardından gelen belirtme durumunu ayır. Sözcüğün cümle ögesi olması, isim-fiil türüyle aynı sınıflandırma değildir.",
        "“Onun sakin konuşması bizi rahatlattı.” sözünde konuşma eylemi bir ad öbeği kurar; -sı iyelik ekidir. “Konuşmamayı seçti.” örneğinde konuş-ma-ma-y-ı dizisinde ilk -ma olumsuzluk, ikincisi isim-fiildir. “Burada konuşma!” ise olumsuz emir çekimidir. Ekleri ezberlemek yerine tam cümlede eylem adı mı, muhataba verilmiş bir emir mi olduğunu denetle.",
      ],
    },
    {
      title: "Kalıcı ad ile eylem adının sınırı",
      paragraphs: [
        "Bazı fiilimsi biçimleri zamanla bir varlığın veya kavramın kalıcı adı olur. “Bir porsiyon dondurma aldım.” sözünde dondurma bir yiyecektir; bu kullanımda isim-fiil sayılmaz. “Suyu dondurma işlemi uzun sürdü.” sözünde ise suyu katılaştırma eylemi adlandırılır. Aynı yazılışın iki cümlede farklı iş görmesi, bağlam okumanın neden gerekli olduğunu gösterir.",
        "“Çakmak masada duruyor.” sözündeki araç adı ile “Tahtaya çivi çakmak güçtür.” sözündeki eylem adını karşılaştır. Olumsuzluk eki getirme denemesi yardımcı olabilir, fakat her sözcüğü tek hamlede ayıran kusursuz bir test değildir. Sözlükteki madde adı, bu cümlede anlatılan varlık veya eylem ve tamlanan öbek birlikte değerlendirilmelidir.",
      ],
    },
    {
      title: "Sıfat-fiil: hangi adı niteliyor?",
      paragraphs: [
        "Sıfat-fiil ekleri okul kaynaklarında -an/-en, -ası/-esi, -maz/-mez, -ar/-er, -dık/-dik/-duk/-dük, -acak/-ecek, -mış/-miş/-muş/-müş biçimleriyle gösterilir. “Bitecek işi paylaştık.” sözünde bitecek, iş adını niteler. “İş yarın bitecek.” sözündeyse bitecek gelecek zamanlı yüklemdir. Aynı -ecek görünümü, aynı sözcük türünü garanti etmez.",
        "“Okuduğum kitabı getirdim.” sözünde okuduğum, kitabın hangi kitap olduğunu belirtir; sıfat-fiil öbeği içindeki kişi ilişkisi iyelikle kurulur. “Görülmemiş bir olay” sözünde olumsuzluk veya edilgenlik, sıfat-fiil olmayı engellemez. Önce nitelenen adı bul; sonra fiilimsiyle o ad arasındaki bağı okla göster. Tüm cümlenin zamanıyla sıfat-fiilin çağrıştırdığı zamanı karıştırma.",
      ],
    },
    {
      title: "Adlaşmış sıfat-fiil, kalıcı ad değildir",
      paragraphs: [
        "“Gelen öğrenciler kapıda bekledi.” cümlesinde gelen sıfat-fiildir. “Gelenler kapıda bekledi.” cümlesinde öğrenciler adı söylenmez; gelenler, gelen kişiler anlamıyla adlaşmış sıfat-fiildir. Çoğul veya durum eki alması bu fiilimsi bağını silmez. “Geleni içeri aldılar.” sözündeki belirtme eki de aynı adlaşma ilişkisi üzerinde bulunur.",
        "Bir adın düşmesiyle oluşan bu kullanım ile dondurma gibi kalıcı adı ayrı tut. Adlaşmış sıfat-fiilde söylenmeyen kişi veya varlık bağlamdan tamamlanabilir ve eylemden gelen niteleme sürer. Soruda sadece ardından açık bir isim gelip gelmediğine bakmak yetmez; “Gelenler” biçiminin hangi kişilerden söz ettiğini açıklayabilmelisin.",
      ],
    },
    {
      title: "Zarf-fiil: temel eyleme bağlanan yan hareket",
      paragraphs: [
        "Zarf-fiiller temel eylemi zaman, durum veya başka bir ilişkiyle tamamlar: “Koşarak salona girdi.” nasıl; “Ders bitince çıktı.” ne zaman sorusuna cevap verir. Sık biçimler -ıp/-ip/-up/-üp, -arak/-erek, -ınca/-ince, -madan/-meden, -maksızın/-meksizin, -dıkça/-dikçe, -alı/-eli, -asıya/-esiye, -casına/-cesine ve -ken yapılarıdır; ünlü uyumuyla diğer biçimleri de kullanılır. -a…-a/-e…-e ve -(a)r…-maz/-(e)r…-mez ikilileri birlikte değerlendirilir. “Güler gülmez aradı.” ve “Güle güle yürüdü.” gibi ikili kuruluşlar da birlikte okunur.",
        "“Kitabı alıp çıktı.” sözünde alıp çekimli ikinci yüklem değildir; çıkma eylemine bağlanan zarf-fiildir. “Almadan çıktı.” örneğinde yapılmayan yan eylem anlatılır. -dığında, -dıkça gibi birleşik görünümler kaynakların zarf-fiil başlığında ele aldığı yapılardır; her iç parçayı bağımsız bir sözcük sanma. İşlevi kanıtlarken hangi temel fiili tamamladığını açıkça belirt.",
      ],
    },
    {
      title: "Benzer sonlar: kök ve bağlam denetimi",
      paragraphs: [
        "Bir sözcükte -ken benzeri bir son görmek fiilimsi kararı için yeterli değildir. “Yürürken durdu.” fiil kökünden kurulmuş zarf-fiildir; “Hastayken dinlendi.” sözündeki hastayken ise ad soylu tabana ek fiilin -ken biçiminin gelmesidir. OGM’nin TYT sınıflamasında bu ikinci kullanım fiilimsi sayılmaz; bütün öbek yine zaman veya durum belirtebilir.",
        "“Delicesine sevindi.” sözündeki delicesine de ad soylu tabandan kurulmuştur; yalnız -cesine sonuna bakılarak zarf-fiil yapılmaz. “Koşarcasına yürüdü.” ise fiil tabanlı bir kuruluşu gösterir. Cümlede zarf görevi yapmak ile zarf-fiil olmak farklıdır. Tür adını seçmeden önce tabanın gerçekten eylem kökü olup olmadığını ve yapının bağlamdaki görevini kanıtla.",
      ],
    },
    {
      title: "Fiilimsi yüklemi ve yan cümle ayrımı",
      paragraphs: [
        "“Amacım okumaktır.” cümlesinde okumak isim-fiili, -tır ek fiiliyle yüklem olmuştur. Yüklem ad soylu olduğundan bu bir isim cümlesidir; okumaktır biçimini çekimli bir asıl fiil sanma. OGM’nin yapı sınıflamasında cümledeki tek fiilimsi bu yüklemse ayrıca bir yan cümle oluşmuş sayılmaz; başka yan yapı yoksa cümle basittir.",
        "“Okuyan öğrencinin amacı araştırmaktır.” sözünde ise yüklem dışında okuyan sıfat-fiiliyle bir yan yapı da bulunur. Fiilimsi sayısı ile yan cümle sayısını düşünmeden eşitlemek bu istisnayı kaçırır. Çözüm sırası: tam yüklemi belirle, kalan eylemsi öbeklerini sınırla, her birinin hangi ada veya temel eyleme bağlandığını göster; sonra yeni bir cümlede aynı ilişkileri notsuz kur.",
      ],
    },
  ],
  examples: [
    {
      title: "Aynı ma, iki ayrı görev",
      prompt:
        "“Burada konuşma!” ile “Onun konuşması bizi rahatlattı.” cümlelerindeki konuşma tabanlarını çöz.",
      strategy: "İletişim amacını ve ad öbeğini karşılaştır.",
      steps: [
        {
          label: "Yargı",
          explanation:
            "İlk cümle muhataba konuşmama emri verir; konuşma olumsuz emir çekimidir.",
        },
        {
          label: "Ad ilişkisi",
          explanation:
            "İkinci cümlede konuş-ma-sı bir eylemin adıdır; -sı iyelik ekidir ve özne öbeğine katılır.",
        },
        {
          label: "Sonuç",
          explanation: "İlk biçim çekimli fiil, ikinci biçim isim-fiildir.",
        },
      ],
      answer: "Olumsuz emir / isim-fiil.",
      check: "İkinci cümlede rahatlatan şey onun konuşmasıdır.",
      pitfall: "Her -ma biçimini aynı ek olarak işaretleme.",
    },
    {
      title: "Ad düşünce tür kaybolur mu?",
      prompt:
        "“Gelen öğrenciler bekledi.” ve “Gelenler bekledi.” sözlerini karşılaştır.",
      strategy: "Söylenmeyen adı geri koy.",
      steps: [
        {
          label: "Niteleme",
          explanation: "İlk cümlede gelen, öğrenciler adını niteler.",
        },
        {
          label: "Adın düşmesi",
          explanation:
            "İkinci cümlede gelenler, gelen kişiler anlamını taşır; çoğul eki almıştır.",
        },
        {
          label: "Karar",
          explanation:
            "Gelen sıfat-fiil, gelenler adlaşmış sıfat-fiildir; ikisi de eylemden gelen nitelemeyi korur.",
        },
      ],
      answer: "Sıfat-fiil / adlaşmış sıfat-fiil.",
      check: "İkinci biçime kişiler adı eklenince ilk ilişki yeniden görünür.",
      pitfall: "Adlaşmış sıfat-fiili bağlamsız biçimde kalıcı ad sayma.",
    },
    {
      title: "Kökünü değiştir, kararı değiştir",
      prompt:
        "“Yürürken durdu.” ve “Hastayken dinlendi.” sözlerindeki -kenli biçimleri ayır.",
      strategy: "Önce tabanın türünü bul.",
      steps: [
        {
          label: "Fiil tabanı",
          explanation:
            "Yürü- bir fiildir; yürürken temel durma eylemine zaman ilişkisiyle bağlanır.",
        },
        {
          label: "Ad tabanı",
          explanation:
            "Hasta ad soyludur; hastayken ek fiilin -ken biçimiyle kurulur.",
        },
        {
          label: "Okul konvansiyonu",
          explanation:
            "İlk kullanım zarf-fiildir. İkinci kullanım zarf görevli olsa da OGM TYT sınıflamasında fiilimsi değildir.",
        },
      ],
      answer: "Yürürken: zarf-fiil; hastayken: ad soylu taban ve ek fiil.",
      check:
        "Zarf görevi ile zarf-fiil türünün aynı şey olmadığını kontrol et.",
      pitfall: "Son iki veya üç harfe bakıp kökü atlama.",
    },
    {
      title: "Yüklemdeki tek fiilimsi",
      prompt:
        "“Amacım okumaktır.” cümlesini yüklemin türü ve yapısı bakımından incele.",
      strategy: "Yüklem ile yan yapıyı ayır.",
      steps: [
        {
          label: "Yüklem",
          explanation:
            "Okumaktır bütün olarak yüklemdir; oku-mak isim-fiiline -tır ek fiili gelmiştir.",
        },
        {
          label: "Tür",
          explanation:
            "Asıl yüklem çekirdek olarak bir eylem adıdır; cümle isim cümlesidir.",
        },
        {
          label: "Yapı",
          explanation:
            "Yüklem dışında fiilimsi veya ikinci yargı yoktur. Bu kaynakların okul sınıflamasında cümle basittir.",
        },
      ],
      answer: "İsim cümlesi; basit cümle.",
      check:
        "“Okuyan çocuğun amacı okumaktır.” dersen yüklem dışında yeni bir sıfat-fiil bulunur.",
      pitfall:
        "Cümlede fiilimsi gördüğün her durumda otomatik girişik birleşik deme.",
    },
  ],
  recall: [
    {
      prompt: "İsim-fiil ile olumsuz emri nasıl ayırırsın?",
      answer:
        "Fiil kökünü ve bağlamı birlikte okurum: eylem adı kuran -ma isim-fiil; muhataba yöneltilmiş “konuşma!” ise olumsuz emir çekimidir.",
    },
    {
      prompt: "Gelenler neden otomatik kalıcı ad değildir?",
      answer:
        "Söylenmeyen kişiler adı tamamlanabilir; gelen eyleminden gelen niteleme sürer. Bu kullanım adlaşmış sıfat-fiildir.",
    },
    {
      prompt: "Hastayken neden yürürken ile aynı çözülmez?",
      answer:
        "Hasta ad soylu, yürü- fiil tabanıdır. İlkinde ek fiilin -ken biçimi vardır; ikinci kullanım zarf-fiildir.",
    },
    {
      prompt: "Amacım okumaktır neden ayrıca bir yan cümle içermez?",
      answer:
        "Tek fiilimsi temel yüklemdir; yüklem dışında başka yan yapı yoktur. OGM sınıflamasında bu cümle basit isim cümlesidir.",
    },
  ],
  source:
    "Aurelia Türkçe Fiilimsiler kopya kâğıdı; OGM Türkçe Fiiller, fiilimsiler bölümü; MEBİ TYT Türkçe Konu Özetleri, Fiilimsiler. Kaynaklarla karşılaştırılarak yazılmış özgün anlatım, modeller ve öğretim soruları.",
};

export const elementsGuide015: LessonGuide = {
  id: "cumlenin-ogeleri",
  minutes: 75,
  objectives: [
    "Yüklemi bütün öbeğiyle bul, diğer ögeleri ona bağlanan sorularla belirle.",
    "Özne ile nesneyi; yer, zaman ve neden tamlayıcılarını ayır.",
    "Etken-edilgen ve sözcük sırası dönüşümlerinde değişen ilişkileri izle.",
    "Gizli özne, seslenme ve edat öbeği için kullanılan okul konvansiyonunu açıkla.",
  ],
  sections: [
    {
      title: "Merkez önce: tam yüklemi bul",
      paragraphs: [
        "Cümlenin ögeleri, sözcüklerin tek başına sözlük türünü değil yüklem çevresindeki görevlerini gösterir. İlk iş yargıyı taşıyan tam yüklemi bulmaktır. “Görevli dosyayı teslim etti.” sözünde yüklem teslim etti bütünüdür; etti sözcüğünü tek başına ayırmak birleşik fiili parçalar. “En büyük isteği iyi bir öğretmen olmaktı.” gibi cümlelerde ad ve fiilimsi öbekleri de yüklem olabilir.",
        "Deyimler, birleşik fiiller, isim ve sıfat tamlamaları kendi içinde korunur. “Yeni gelen görevli” özne öbeğinin içindeki gelen sözcüğü ayrıca cümlenin zarf tümleci değildir. Önce dış öge sınırlarını çiz; sonra soruluyorsa öbeğin içindeki sözcük türlerini incele. Kelime sayısı, yazılı sözcük sayısı ve cümle ögesi sayısı birbirinin yerine kullanılamaz.",
      ],
    },
    {
      title: "Özne: işi yapan veya yargının konusu",
      paragraphs: [
        "Özne, yüklemin bildirdiği işi yapan ya da yargının konusu olan ögedir. “Çocuk roman okudu.” sözünde kim okudu sorusunun cevabı çocuk; “Hava serindi.” sözünde serin olan ne sorusunun cevabı havadır. Bu nedenle özne aramak yalnız hareket bildiren fiillere özgü değildir; isim cümlelerinde de özne bulunabilir.",
        "“Dün eski defteri buldum.” sözünde yüklemdeki birinci tekil kişi, gizli ben öznesini düşündürür. Bu özne anlam ve kişi bakımından açıklanır; fakat MEBİ’nin öge sırası ve görünür öge sayısı sorularında gizli özne sıraya veya sayıya eklenmez. Dün / eski defteri / buldum dizisi üç görünür ögedir. Açık özne bulunmayan her cümleye düşünmeden gizli özne ekleme; öznesiz edilgen yapılar da vardır.",
      ],
    },
    {
      title: "Nesne: özneyi bulduktan sonra sor",
      paragraphs: [
        "Geçişli bir fiilin etkilediği varlık veya içeriği karşılayan nesne, belirtili ya da belirtisiz olabilir. “Ece romanı okudu.” sözünde neyi okudu sorusu belirtili nesneyi; “Ece roman okudu.” sözünde Ece kim sorusuyla ayrıldıktan sonra ne okudu sorusu belirtisiz nesneyi buldurur. Roman ve romanı aynı ad köküne dayanır ama belirtililikleri farklıdır.",
        "Yükleme ne sorusunu ilk anda sormak özneyle nesneyi karıştırabilir: “Cam kırıldı.” sözünde cam yapılan işten etkilenen sözde öznedir; nesne değildir. “Çocuk camı kırdı.” cümlesindeyse çocuk özne, camı belirtili nesnedir. Yüklemin geçişliliği, özne ilişkisi ve belirtme durumu birlikte kontrol edilmelidir; her -ı/-i sesi de belirtme eki değildir.",
      ],
    },
    {
      title: "Yer tamlayıcısı: ekin yanında anlamı denetle",
      paragraphs: [
        "Dolaylı tümleç veya yer tamlayıcısı, yönelme, bulunma ve ayrılma durumlarıyla yükleme bağlanan yer veya varlık ilişkisini gösterir. “Öğrenci okula gitti, bahçede bekledi, kapıdan ayrıldı.” dizisinde nereye, nerede, nereden soruları bu ilişkileri açar. Kime, kimde, kimden soruları da uygun cümlede aynı ögeyi buldurabilir; “Dosyayı müdüre verdim.” sözünde müdüre bu görevde bulunur.",
        "Her -e/-de/-den eki yer tamlayıcısı kurmaz. “Saat üçte oynadılar.” zaman; “Korkudan titredi.” neden bildirir ve zarf tümlecidir. Yalın yön adları da ayrılır: “İçeri girdi.” sözünde içeri zarf; “İçeriye girdi.” sözünde içeriye yer tamlayıcısı; “Dışarıyı izledi.” sözünde dışarıyı nesnedir. Yalnız son eke değil yükleme kurulan soruya ve anlama bak.",
      ],
    },
    {
      title: "Zarf tümleci ve edat öbeği konvansiyonu",
      paragraphs: [
        "Zarf tümleci yüklemi zaman, durum, neden, amaç, miktar veya araç gibi ilişkilerle tamamlar. “Dün dikkatle çalıştı.” sözünde dün ne zaman, dikkatle nasıl sorusunu karşılar. “Sınavı kazanmak için çalıştı.” amaç, “Makasla kâğıdı kesti.” araç bildirir. Öbeğin içinde isim veya fiilimsi bulunması, bütün öbeğin bu dış görevini ortadan kaldırmaz.",
        "Bazı okul kaynakları araç, birliktelik ve amaç bildiren edat öbekleri için edat tümleci adını ayrıca verir. Bu uygulama MEBİ’nin öge çözümlemesini izleyerek bunları zarf tümleci altında gösterir; OGM de edat tümlecinin zarf tümleci kapsamında değerlendirildiğini belirtir. Bununla birlikte “Ece ile Can geldi.” sözünde Ece ile Can eş öznelerden oluşan tek gruptur; her ileyi otomatik araç zarfı sayma.",
      ],
    },
    {
      title: "Etkeni edilgene çevirince ilişkiler değişir",
      paragraphs: [
        "“Ustalar eski köprüyü onardı.” sözünde ustalar gerçek özne, eski köprüyü belirtili nesnedir. “Eski köprü ustalar tarafından onarıldı.” sözünde eski köprü sözde özne olur. Etkilenen varlık aynı kalmış olsa da cümledeki dil bilgisel görev değişmiştir. Bu nedenle sözde özneyi edilgen cümlede nesne diye işaretlemek doğru değildir.",
        "Ustalar tarafından öbeği işi yapanı anlamca bildirir ve örtülü özne adıyla anılır; MEBİ/OGM öge incelemesinde zarf tümleci sayılır. Anlamsal yapan ile dil bilgisel özne ayrımını koru. “Bu salonda erkenden yatılır.” gibi geçişsiz fiilli edilgenlerde ise nesneden dönüşmüş bir sözde özne aranmaz. Yalnız edilgen eki gördüğün için her cümlede açık veya gizli bir özne varmış gibi davranma.",
      ],
    },
    {
      title: "Söz öbeği, seslenme ve ara söz",
      paragraphs: [
        "“Arkadaşlar, bu kitabı okuyun.” sözünde arkadaşlar bir seslenmedir; cümle dışı ögedir, yüklemin ikinci çoğul kişisine karşılık gizli siz öznesi vardır. “Arkadaşlar bu kitabı okudu.” sözündeyse arkadaşlar açık öznedir. Sözcüğün aynı olması veya virgülün varlığı tek başına karar verdirmez; yüklem kişisi, seslenme amacı ve cümlenin bütünü birlikte okunur.",
        "Ara söz kimi zaman bir ögeyi açıklar: “Ankara, başkentimiz, bugün sakindi.” sözünde başkentimiz öznenin açıklamasıdır; Ankara ile birlikte ilişkilendirilir. Bağımsız bir yorum veya hitap ise cümle dışı olabilir. Bir isim tamlamasını, deyimi ya da sıfat-fiil grubunu ortadan bölmeden işaretle. “Okuduğum eski kitabı” bütün olarak nesneyken okuduğum bunun içindeki sıfat-fiildir.",
      ],
    },
    {
      title: "Sıra, vurgu ve çözüm denetimi",
      paragraphs: [
        "“Yeni gelen görevli dün raporu müdüre teslim etti.” cümlesindeki ögelerin yerini değiştirerek devrik bir cümle kurabilirsin; ögelerin yükleme kurduğu ilişki zorunlu olarak değişmez. “Dün raporu müdüre teslim etti yeni gelen görevli.” sözünde özne sonda olsa da görevli teslim etme işini yapar. Sözcüklerin eklerini ve anlam ilişkisini koruyarak dönüşümü denetle.",
        "Okul sorularında fiil cümlesinde yüklemden hemen önceki öge genellikle vurgulu öge olarak ele alınır; soru parçacığı ve bağlam vurguyu değiştirebilir, isim cümlelerinde yüklem vurgusu ayrıca düşünülür. Her konuşma tonunu tek mekanik kurala indirme. Çözümünü tam yüklem → özne → nesne → diğer tamlayıcılar sırasıyla denetle; gizli özneleri görünür sıraya ekleme ve bütün öbekleri koru.",
      ],
    },
  ],
  examples: [
    {
      title: "Öbeği bölmeden sırala",
      prompt:
        "“Yeni gelen görevli dün raporu müdüre teslim etti.” cümlesini ögelerine ayır.",
      strategy: "Birleşik yüklemi merkez al.",
      steps: [
        {
          label: "Merkez",
          explanation: "Teslim etti bütün olarak yüklemdir.",
        },
        {
          label: "İlişkiler",
          explanation:
            "Kim teslim etti? Yeni gelen görevli. Neyi? Raporu. Kime? Müdüre. Ne zaman? Dün.",
        },
        {
          label: "Sıra",
          explanation:
            "Özne / zarf tümleci / belirtili nesne / yer tamlayıcısı / yüklem sırası oluşur.",
        },
      ],
      answer: "Yeni gelen görevli / dün / raporu / müdüre / teslim etti.",
      check: "Gelen sözcüğünü özne öbeğinden koparıp ayrı öge sayma.",
      pitfall: "Teslim etti içindeki ettiyi tek başına yüklem yapma.",
    },
    {
      title: "Aynı de, farklı ilişki",
      prompt:
        "“Çocuklar bahçede oynadı.” ile “Çocuklar saat üçte oynadı.” cümlelerini karşılaştır.",
      strategy: "Ek yerine yükleme bağlanan anlamı sorgula.",
      steps: [
        {
          label: "Yer",
          explanation: "Nerede oynadı? Bahçede; yer tamlayıcısıdır.",
        },
        {
          label: "Zaman",
          explanation: "Ne zaman oynadı? Saat üçte; zarf tümlecidir.",
        },
        {
          label: "Karşılaştırma",
          explanation:
            "İki öbek de bulunma biçimi taşısa da yükleme aynı ilişkiyi kurmaz.",
        },
      ],
      answer: "Bahçede: yer tamlayıcısı; saat üçte: zarf tümleci.",
      check: "İkinci öbeği bir mekân adıymış gibi nereye sorusuyla zorlama.",
      pitfall: "-de ekini gördüğün her yerde dolaylı tümleç seçme.",
    },
    {
      title: "Edilgen dönüşüm",
      prompt:
        "“Ustalar eski köprüyü onardı.” cümlesini “Eski köprü ustalar tarafından onarıldı.” biçimiyle karşılaştır.",
      strategy: "Yapan ile dil bilgisel özneyi ayır.",
      steps: [
        {
          label: "Etken",
          explanation: "Ustalar gerçek özne; eski köprüyü belirtili nesnedir.",
        },
        {
          label: "Edilgen",
          explanation:
            "Eski köprü etkilenen sözde özne olur; yüklem onarıldıdır.",
        },
        {
          label: "Edat öbeği",
          explanation:
            "Ustalar tarafından anlamca yapanı bildirir; bu uygulamanın MEBİ öge konvansiyonunda zarf tümlecidir.",
        },
      ],
      answer: "Nesne sözde özneye dönüşür; tarafından öbeği zarf tümlecidir.",
      check:
        "İkinci cümlede eski köprü artık belirtme durumu taşıyan nesne değildir.",
      pitfall:
        "Örtülü özne terimini görünce tarafından öbeğini gerçek özne sayma.",
    },
    {
      title: "Gizli özneyi sayıya ekleme",
      prompt: "“Dün eski defteri buldum.” cümlesinin görünür öge sayısını bul.",
      strategy: "Kişi bilgisiyle yazılı öge dizisini ayır.",
      steps: [
        {
          label: "Yüklem",
          explanation:
            "Buldum yüklemindeki -m birinci tekil kişiyi gösterir; gizli özne bendir.",
        },
        {
          label: "Yazılı öbekler",
          explanation:
            "Dün zaman zarfı; eski defteri belirtili nesne; buldum yüklemdir.",
        },
        {
          label: "Sayım",
          explanation:
            "Gizli ben, MEBİ öge sırası ve sayısında ek bir görünür öge sayılmaz; sonuç üçtür.",
        },
      ],
      answer: "Üç görünür öge; gizli özne ben.",
      check: "Eski ve defteri iki ayrı öge sayma; sıfat tamlamasını koru.",
      pitfall:
        "Gizli özneyi hiç yok saymak ile görünür öge sayısına katmamak farklıdır.",
    },
  ],
  recall: [
    {
      prompt: "Özneyi nesneden önce neden bulursun?",
      answer:
        "Ne sorusu iki ögeyi de düşündürebilir; önce yargının yapanını veya konusunu ayırıp sonra etkilenen nesneyi ararım.",
    },
    {
      prompt: "Saat üçte neden yer tamlayıcısı değildir?",
      answer:
        "Bulunma biçimi taşısa da ne zaman sorusuna cevap verir; zaman bildiren zarf tümlecidir.",
    },
    {
      prompt: "Ustalar tarafından öbeği hangi konvansiyonla gösterilir?",
      answer:
        "Anlamca örtülü özne denir; MEBİ’nin öge çözümlemesinde zarf tümlecidir. Uygulama bu konvansiyonu açıkça kullanır.",
    },
    {
      prompt: "Bir öbeği öge olarak ayırırken neyi korursun?",
      answer:
        "Tamlamaları, deyimleri, birleşik yüklemleri ve fiilimsi öbeklerini bütün tutarım; gizli özneyi görünür öge sırasına eklemem.",
    },
  ],
  source:
    "Aurelia Türkçe Cümlenin Ögeleri kopya kâğıdı; OGM Türkçe Cümlenin Ögeleri; MEBİ TYT Türkçe Konu Özetleri, Cümlenin Ögeleri. Edat/örtülü özne adlandırmaları açık konvansiyonla kullanılmış özgün anlatım ve sorular.",
};

export const sentencesGuide015: LessonGuide = {
  id: "cumle-turleri",
  minutes: 75,
  objectives: [
    "Bir cümleyi yüklemin türü, yeri, anlamı ve yapısı bakımından ayrı ayrı incele.",
    "Fiilimsi yüklemi ile çekimli fiili ve yan cümleyi ayır.",
    "Sıralı, bağlı ve birleşik yapıları yargı ilişkileriyle kanıtla.",
    "Biçimce olumsuzluk ile bağlamdaki olumsuz anlamı karıştırma.",
  ],
  sections: [
    {
      title: "Dört soru, tek etiket değil",
      paragraphs: [
        "Bir cümleye tek bir tür etiketi vermek çoğu zaman eksiktir. “Ece dün gelmedi.” aynı anda fiil cümlesi, kurallı cümle, olumsuz cümle ve basit cümledir. Yüklemin türü ne, nerede, yargının anlamı ne ve kaç yargı nasıl bağlanmış soruları ayrı ölçütlerdir. Bir ölçütteki karar diğer ölçütün yerine geçmez.",
        "İncelemeye tam yüklemden başla; yardımcı fiil veya deyim grubunu parçalama. İkinci bir çekimli yargı, fiilimsiyle kurulmuş yan yapı, alıntı ya da koşul olup olmadığını sonra ara. Etkileşimde her ekseni ayrıca seçerek aynı cümlenin birden fazla doğru açıklamasını görürsün. Noktalama ve bağlaç yalnız ipucudur; gerçek yargı ilişkisini göstermeden sonuca varma.",
      ],
    },
    {
      title: "Yüklemin türü: isim mi, çekimli fiil mi?",
      paragraphs: [
        "Yüklemi çekimli fiil olan cümle fiil cümlesidir: “Hava serinledi.” Yüklemi isim veya ad soylu bir yapı olan cümle isim cümlesidir: “Hava serindi.” İkinci örnekte serin sıfatına ek fiil gelmiştir. “Kitap masadaydı.”, “Bu çözüm doğru.” ve “Evde kimse yoktu.” gibi örneklerde de temel yargıyı ad soylu yüklem taşır.",
        "“Amacım araştırmaktır.” sözünde araştırmak isim-fiiline -tır gelmiştir; cümle isim cümlesidir. İçinde eylem anlamı var diye fiil cümlesi seçilmez. “Çocuk yardım etti.” sözündeyse yardım etti birleşik fiil yüklemidir ve cümle fiil cümlesidir. Yalnız son sözcüğe veya yalnız ek fiile değil yüklem öbeğinin çekirdek türüne bak.",
      ],
    },
    {
      title: "Yüklemin yeri ve eksilti",
      paragraphs: [
        "Yüklemi sonda olan cümle kurallı, sonda olmayan cümle devriktir. “Ece dosyayı getirdi.” kurallı; “Dosyayı getirdi Ece.” devriktir. Özne sonda kalınca özne olmaktan çıkmaz. Devriklik bir anlatım veya vurgu tercihi olabilir; tek başına dil bilgisi yanlışı anlamına gelmez.",
        "Yüklemi söylenmeyip bağlamdan tamamlanan “Bir yanda deniz, öte yanda dağlar…” gibi ifadeler eksiltilidir. Eksiltili sözü görünür bir yüklemi varmış gibi zorla kurallı veya devrik yapma. Birden fazla yargılı yapılarda her cümleciğin yüklem yerini ayrı incelemek gerekebilir; yalnız bütün dizinin son kelimesiyle tüm cümlecikler hakkında karar verilmez.",
      ],
    },
    {
      title: "Anlam: biçim, olumsuzluk ve soru amacı",
      paragraphs: [
        "Olumlu cümle eylemin gerçekleştiğini, gerçekleşeceğini veya bir durumun bulunduğunu; olumsuz cümle bunların gerçekleşmediğini veya bulunmadığını bildirir. “Gelmedi.”, “Hazır değil.” ve “Evde kimse yok.” açık olumsuz örneklerdir. -ma/-me gibi biçimler önemli ipucudur; fakat sözcük içinde benzer ses bulunması veya her -sizli sıfatın kullanılması tüm cümlenin anlamını mekanik olarak belirlemez.",
        "“Ne konuştu ne güldü.” olumsuzluk eki olmadan iki eylemin de yapılmadığını anlatır. “Bu fikri beğenmiyor değilim.” bağlamına göre beğenme bildiren çift olumsuz kuruluştur. “Ben bu yolu bilmez miyim?” sözü elbette bilirim açıklamasıyla kullanılıyorsa sözde sorudur; gerçekten bilgi isteyen “Bu yolu biliyor musun?” ile aynı iletişim amacı taşımaz. Ünlem anlamı da yalnız ünlem işareti sayılarak bulunmaz.",
      ],
    },
    {
      title: "Basit ile girişik birleşik cümle",
      paragraphs: [
        "MEBİ/OGM okul sınıflamasında tek temel yargısı ve ayrıca yan cümlesi bulunmayan yapı basittir: “Ece dosyayı açtı.” Bir fiilimsi öbeği temel yargıya yan yapı olarak katılırsa girişik birleşik cümle kurulur: “Dosyayı açınca not aldı.” Açınca yan eylemi; aldı temel yargıyı taşır. Yargılar arasındaki ilişkiyi belirtmek yalnız fiilimsi ekini işaretlemekten daha açıklayıcıdır.",
        "Önemli sınır: “Amacım araştırmaktır.” sözündeki tek fiilimsi temel yüklemdeyse, bu tek başına ayrı yan cümle değildir; OGM’nin açıklamasına göre cümle basittir. “Okuyan öğrencinin amacı araştırmaktır.” sözünde ise yüklem dışında okuyan sıfat-fiili yan yapı kurar; girişik birleşiktir. Cümlenin uzunluğu veya tamlama sayısı da basitliği ortadan kaldırmaz.",
      ],
    },
    {
      title: "Şartlı, ki’li ve iç içe birleşik yapılar",
      paragraphs: [
        "Şartlı birleşik cümlede koşul yargısı temel yargıya bağlanır: “Yağmur diner ise dışarı çıkacağız.” Ki’li birleşik yapıda ayrı yazılan ki iki yargıyı ilişkilendirir: “Belli ki toplantı bitti.” İç içe birleşik cümlede bir alıntı yargı başka yargının içinde yer alır: “Ece, ‘Yarın gelirim.’ dedi.” Bu başlıklar uygulamada MEBİ’nin okul sınıflamasına göre adlandırılır.",
        "Her -sa/-se görünümü iki yargılı koşul cümlesi değildir: “Keşke gelse!” tek başına bir dilek yargısıdır. “Bahçedeki çocuk güldü.” sözündeki bitişik -ki de iki cümleyi bağlayan ki değildir. Yapı sorusunda kelime veya ek listesini değil temel ve yardımcı yargının gerçekten var olup olmadığını denetle; doğrudan alıntıda noktalama işaretleri de yargı sınırını görünür kılar.",
      ],
    },
    {
      title: "Sıralı ile bağlı: ne bağlanıyor?",
      paragraphs: [
        "En az iki temel yargı virgül veya noktalı virgülle art arda gelirse sıralı cümle kurulur: “Ece dosyayı açtı, Can not aldı.” Temel yargılar bağlaçla bağlanırsa bağlı cümle oluşur: “Ece dosyayı açtı ve Can not aldı.” İki yargıyı da kendi yüklemiyle tamamlayarak göstermek, aradaki işarete bakmaktan daha güvenilir bir çözümdür.",
        "“Ece ve Can kitap okudu.” sözündeki ve iki özneyi bağlar; tek yüklem ve tek temel yargı vardır, bu yüzden cümle bağlı değil basittir. Benzer biçimde bir yüklemin yardımcı fiilini iki yüklem gibi sayma. Ortak yüklemli eksiltilerde görünür çekimli sözcük sayısı da tek başına yeterli olmayabilir; kaynakların çözümünü izleyerek her yargının tamamlanan öğesini açıkla.",
      ],
    },
    {
      title: "Ortak öge, bağımlılık ve son denetim",
      paragraphs: [
        "Sıralı cümlelerin en az bir ögesi ortaksa bağımlı sıralı, hiçbir ögesi ortak değilse bağımsız sıralı denir. “Ece kapıyı açtı, içeri girdi.” sözünde ikinci yargının öznesi de Ecedir; özne ortaktır. “Ece kapıyı açtı, Can bahçede bekledi.” sözünde iki yargının ayrı özneleri ve farklı tamlayıcıları bulunur. Ortak konu veya benzer anlam, ortak cümle ögesiyle aynı değildir.",
        "Bağlı yapılarda da ortak öge ilişkisi görülebilir; önce bağlı/sıralı ayrımını, sonra ortaklık soruluyorsa bunu denetle. Çok eksenli sonuç yazarken “Fiil; devrik; olumsuz; basit” gibi her kararın ayrı kanıtını göster. Soruya yalnız istenen eksende cevap ver; tartışmalı sınıflandırma geleneklerini bağlamsız tek doğru yapma. Bu rehberin model ve soruları belirtilen MEBİ/OGM okul konvansiyonuyla hazırlanmıştır.",
      ],
    },
  ],
  examples: [
    {
      title: "Tek cümleye dört ayrı bakış",
      prompt:
        "“Dosyayı getirmedi Ece.” cümlesini dört ölçüte göre sınıflandır.",
      strategy: "Önce tam yüklem, sonra her eksen için ayrı kanıt bul.",
      steps: [
        {
          label: "Tür ve yer",
          explanation:
            "Getirmedi çekimli fiildir; Ece ondan sonra geldiği için yüklem sonda değildir.",
        },
        {
          label: "Anlam",
          explanation: "-me olumsuzluğu, dosyanın getirilmediğini bildirir.",
        },
        {
          label: "Yapı",
          explanation:
            "Tek temel yargı vardır; yan cümle veya ikinci çekimli yargı yoktur.",
        },
      ],
      answer: "Fiil cümlesi; devrik; olumsuz; basit.",
      check: "Devrik olması olumsuzluk veya yapı kararını değiştirmez.",
      pitfall: "Bir tür etiketi verip diğer eksenleri cevaplamış sayma.",
    },
    {
      title: "Ve gördüğünde yargı say",
      prompt:
        "“Ece ve Can kitap okudu.” ile “Ece kitap okudu ve Can not aldı.” sözlerini karşılaştır.",
      strategy: "Bağlacın bağladığı iki parçayı göster.",
      steps: [
        {
          label: "İlk ilişki",
          explanation:
            "İlk cümlede Ece ile Can aynı özne öbeğinin parçalarıdır; okudu tek yüklemdir.",
        },
        {
          label: "İkinci ilişki",
          explanation:
            "İkinci cümlede okudu ve aldı iki temel yargıyı taşır; ve bu cümleleri bağlar.",
        },
        {
          label: "Karar",
          explanation: "İlki basit; ikincisi bağlı cümledir.",
        },
      ],
      answer: "Basit / bağlı.",
      check: "Bağlacın varlığını değil neyi bağladığını gerekçeye yaz.",
      pitfall: "İçinde ve olan her cümleye bağlı deme.",
    },
    {
      title: "Yüklemdeki fiilimsi istisnası",
      prompt:
        "“Amacım araştırmaktır.” ve “Okuyan öğrencinin amacı araştırmaktır.” sözlerini karşılaştır.",
      strategy: "Temel yüklem dışındaki yan yapıyı ara.",
      steps: [
        {
          label: "Ortak yüklem",
          explanation:
            "İki cümlede de araştırmaktır isim-fiil ve ek fiilden oluşan ad soylu yüklemdir.",
        },
        {
          label: "Fark",
          explanation:
            "İlkinde başka fiilimsi yoktur; ikincisinde okuyan, öğrenciyi niteleyen yan yapıdır.",
        },
        {
          label: "Sonuç",
          explanation:
            "Bu okul sınıflamasında ilki basit isim cümlesi; ikincisi girişik birleşik isim cümlesidir.",
        },
      ],
      answer: "Basit / girişik birleşik; ikisi de isim cümlesi.",
      check:
        "Birinci cümledeki -makı yok sayma; neden ayrı yan cümle sayılmadığını açıkla.",
      pitfall: "Her fiilimsiyi temel yüklemden ayrı bir yan cümle kabul etme.",
    },
    {
      title: "Olumsuzluk görünümü ile anlam",
      prompt:
        "Konuşmacı “Bu fikri beğenmiyor değilim; bazı yönlerini seviyorum.” diyor. İlk yargının anlamını açıkla.",
      strategy: "İki olumsuzluğun kapsamını ve verilen devam cümlesini oku.",
      steps: [
        {
          label: "İç olumsuzluk",
          explanation: "Beğenmiyor biçimi tek başına beğenmeme bildirir.",
        },
        {
          label: "Dış olumsuzluk",
          explanation: "Değilim, bu beğenmeme yargısını olumsuzlar.",
        },
        {
          label: "Bağlam",
          explanation:
            "Bazı yönlerini seviyorum devamı olumlu bir beğenme ilişkisini doğrular; her yönünü kusursuz bulduğu söylenmez.",
        },
      ],
      answer:
        "Biçiminde olumsuzluk bulunan, bağlamda olumlu beğenme bildiren yargı.",
      check:
        "Bu açıklama yalnız anlam eksenidir; tartışmalı yüklem türü etiketini zorlamaz.",
      pitfall:
        "Çift olumsuzluktan sınırsız ve koşulsuz bir övgü anlamı çıkarma.",
    },
  ],
  recall: [
    {
      prompt: "Neden dört ölçütü ayrı tutarsın?",
      answer:
        "Yüklem türü, yüklem yeri, anlam ve yapı farklı sorulara cevap verir; bir cümle aynı anda fiil, devrik, olumsuz ve basit olabilir.",
    },
    {
      prompt: "Ve neden her zaman bağlı cümle kurmaz?",
      answer:
        "Eş görevli kelimeleri de bağlayabilir. Bağlı cümle için en az iki temel yargının bağlanması gerekir.",
    },
    {
      prompt: "Bağımlı sıralıda bağımlılık neye dayanır?",
      answer:
        "İki temel yargının en az bir cümle ögesini ortak kullanmasına dayanır; yalnız ortak konuya dayanmaz.",
    },
    {
      prompt: "Ne konuştu ne güldü cümlesinin olumsuzluğu nerededir?",
      answer:
        "Ne…ne bağlacı iki eylemin de gerçekleşmediğini bildirir; fiillerde ayrıca -ma eki bulunması şart değildir.",
    },
  ],
  source:
    "Aurelia Türkçe Cümle Türleri kopya kâğıdı; OGM Türkçe Cümle Türleri; MEBİ TYT Türkçe Konu Özetleri, Cümle Türleri. MEBİ/OGM okul sınıflaması açıkça belirtilmiş özgün anlatım ve öğretim soruları.",
};

const questionRows015: Record<
  string,
  [string, string[], number, string, string][]
> = {
  fiilimsiler: [
    [
      "“Okumayı seviyorum.” cümlesindeki okumayı sözcüğünün türü ve çekim ilişkisi hangi seçenekte doğru açıklanmıştır?",
      [
        "İsim-fiil eki üzerine belirtme durumu eki gelmiştir.",
        "İkinci tekil kişide olumsuz emir çekimidir.",
        "Kitap adını niteleyen sıfat-fiildir.",
        "Temel fiile zaman bildiren zarf-fiildir.",
        "Hiçbir eylem ilişkisi taşımayan yiyecek adıdır.",
      ],
      0,
      "Okunan bir varlığın adı ile okuma etkinliğinin adını ayır.",
      "Oku-ma-y-ı biçiminde -ma isim-fiil, -ı belirtme durumudur. Okumayı, seviyorum yükleminin nesnesidir. Nesne olması sözcük türünü çekimli fiile dönüştürmez.",
    ],
    [
      "A: “Bu iş yarın bitecek.” B: “Bitecek işi bugün paylaştık.” Bitecek biçimlerinin görevleri hangi seçenekte doğru sıralanmıştır?",
      [
        "İkisi de kalıcı addır.",
        "A çekimli fiil; B sıfat-fiildir.",
        "A isim-fiil; B zarf-fiildir.",
        "A sıfat-fiil; B çekimli fiildir.",
        "İkisi de zarf-fiildir.",
      ],
      1,
      "Hangi cümlede bitecek, iş adını niteliyor?",
      "A’da bitecek gelecek zamanlı yüklemdir. B’de bitecek, iş adını niteleyen sıfat-fiildir; ana yüklem paylaştıktır. Ekin görünümü aynı, cümledeki işlevi farklıdır.",
    ],
    [
      "“Çocuk koşarak salona girdi.” cümlesindeki koşarak sözü için doğru açıklama hangisidir?",
      [
        "Bağımsız ikinci bir çekimli yüklemdir.",
        "Salona adını niteleyen bir sıfat-fiildir.",
        "Girme eyleminin nasıl yapıldığını bildiren zarf-fiildir.",
        "Koşu aracının kalıcı adıdır.",
        "Girdi sözcüğünün kişi ekidir.",
      ],
      2,
      "Koşarak, hangi temel hareketin yapılışını açıklıyor?",
      "Koş-arak, fiil tabanından -arak zarf-fiil ekiyle kurulmuştur; girdi temel eylemini durum bakımından tamamlar. Yeni bir kip ve kişiyle bağımsız temel yargı kurmaz.",
    ],
    [
      "“Gelenler kapıda bekledi.” cümlesindeki gelenler sözcüğünü en doğru açıklayan seçenek hangisidir?",
      [
        "Çoğul eki aldığı için hiçbir koşulda fiilimsi olamaz.",
        "Olumsuz emir kipindeki çekimli fiildir.",
        "Bir yiyeceğin kalıcı adıdır.",
        "Gelen kişiler anlamını taşıyan adlaşmış sıfat-fiildir.",
        "Kapıda bekleme eyleminin zamanını bildiren zarf-fiildir.",
      ],
      3,
      "Söylenmeyen kişiler adını geri getir.",
      "Gelenler, gelen kişiler anlamındadır; gelen sıfat-fiilinin nitelediği ad düşmüş ve biçim adlaşmıştır. Çoğul eki alması eylemden gelen niteleme ilişkisini ortadan kaldırmaz.",
    ],
    [
      "A: “Bir porsiyon dondurma aldım.” B: “Suyu dondurma işlemi uzun sürdü.” Dondurma sözlerinin görevleri hangi seçenekte doğru açıklanır?",
      [
        "A ve B, muhataba verilmiş olumsuz emirdir.",
        "A sıfat-fiil; B çekimli fiildir.",
        "A zarf-fiil; B sıfat-fiildir.",
        "İkisi de nesne görevi taşıyan çekimli fiildir.",
        "A’da yiyeceğin kalıcı adı; B’de bir eylemi adlandıran isim-fiildir.",
      ],
      4,
      "Porsiyonla alınan varlık ile suyu katılaştırma işlemini ayır.",
      "A’daki dondurma bir yiyeceği karşılayan kalıcı addır. B’de suyu dondurma bir eylemi adlandırır; dondur-ma isim-fiildir. Aynı yazılışın türünü bağlam ve öbek ilişkisi belirler.",
    ],
    [
      "“Burada konuşma!” cümlesindeki konuşma ile “Onun konuşması bizi rahatlattı.” cümlesindeki konuşması hangi seçenekte doğru ayrılmıştır?",
      [
        "İlkinde olumsuz emir; ikincisinde iyelik eki almış isim-fiil vardır.",
        "İkisinde de yalnız olumlu geçmiş zaman vardır.",
        "İlkinde zarf-fiil; ikincisinde gelecek zaman vardır.",
        "İlkinde kalıcı ad; ikincisinde sıfat-fiil vardır.",
        "-ma biçimleri her iki cümlede de yalnız çokluk ekidir.",
      ],
      0,
      "İlk cümlede bir etkinlik mi adlandırılıyor, muhataba bir davranış mı söyleniyor?",
      "Konuş-ma ilkinde ikinci tekil kişiye olumsuz emirdir. Konuş-ma-sı ikinci cümlede konuşma eylemini adlandırır ve -sı iyelik eki alır; özne öbeğine katılır. Aynı ses dizisi farklı görevler üstlenebilir.",
    ],
    [
      "Bu soruda OGM’nin TYT sınıflaması kullanılmaktadır. “Hastayken dinlendi.” ve “Yürürken durdu.” sözlerindeki -kenli biçimler hangi seçenekte doğru ayrılır?",
      [
        "İki biçim de yalnız gelecek zaman yüklemidir.",
        "Hastayken ad soylu taban ve ek fiille kurulur; yürürken fiil tabanlı zarf-fiildir.",
        "Hastayken sıfat-fiil; yürürken iyelik zamiridir.",
        "Hasta bir fiil kökü olduğu için hastayken isim-fiildir.",
        "İkisinde de -ken çoğul kişi ekidir.",
      ],
      1,
      "Hasta ile yürü- tabanlarının türünü karşılaştır.",
      "Hasta ad soyludur; hasta iken → hastayken yapısında ek fiilin -ken biçimi vardır ve bu konvansiyonda fiilimsi sayılmaz. Yürü- fiil tabanıdır; yürürken zarf-fiildir. Her iki öbeğin zarf işlevi taşıması sözcük kuruluşlarını aynı yapmaz.",
    ],
    [
      "MEBİ/OGM okul sınıflamasına göre “Amacım okumaktır.” cümlesi için doğru yargı hangisidir?",
      [
        "Okumaktır, gelecek zamanın rivayetiyle çekimlenmiş asıl fiildir.",
        "Cümlede iki bağımsız çekimli yüklem vardır.",
        "İsim-fiil ek fiille temel yüklem olmuştur; başka yan yapı bulunmadığı için cümle basittir.",
        "Yalnız -mak eki görüldüğü için cümle mutlaka bağlıdır.",
        "-tır eki okumak sözcüğünü bir yer tamlayıcısı yapar.",
      ],
      2,
      "Tek fiilimsi temel yüklemin kendisindeyse ayrıca hangi yan yapının bulunduğunu sor.",
      "Oku-mak isim-fiil, -tır ek fiildir. Okumaktır ad soylu temel yüklemdir; OGM’nin açık sınırına göre yüklemdeki tek fiilimsi ayrıca yan cümle oluşturmaz. Bu cümle basit isim cümlesidir.",
    ],
    [
      "“Konuşmamayı seçti.” cümlesindeki konuşmamayı sözcüğünde iki -ma hangi sırayla görev almıştır?",
      [
        "Önce çoğul, sonra ikinci kişi.",
        "Önce isim-fiil, sonra gelecek zaman.",
        "İkisi de belirtme durumu.",
        "Önce olumsuzluk, sonra isim-fiil.",
        "Önce iyelik, sonra emir.",
      ],
      3,
      "Konuşmamak eylemi bir seçenek olarak adlandırılıyor.",
      "Konuş-ma-ma-y-ı çözümlemesinde ilk -ma eylemi olumsuzlar, ikinci -ma bu olumsuz eylemi adlandıran isim-fiil ekidir; ardından belirtme durumu gelir. Her iki eki aynı görevde saymak eylem ile ad ilişkisini siler.",
    ],
    [
      "“Okuduğum kitabı masaya bıraktım.” cümlesinde okuduğum sözcüğündeki -um için hangi açıklama doğrudur?",
      [
        "Bağımsız emir cümlesi kuran ikinci çoğul kişi ekidir.",
        "Okuduğum sözcüğünü kalıcı araç adı yapar.",
        "Bıraktım yükleminin olumsuzluk ekidir.",
        "Kitabı sözcüğünün çoğul ekidir.",
        "Sıfat-fiil yapısındaki iyelik ilişkisini gösterir; sırf kişi ilişkisi var diye sözcük çekimli temel fiil sayılamaz.",
      ],
      4,
      "Hangi kitabın bırakıldığını belirten öbeği bul.",
      "Okuduğum kitabı öbeğinde okuduğum, kitap adını niteleyen sıfat-fiildir; -um iyelik ilişkisi taşır. Cümlenin temel çekimli yüklemi bıraktımdır. İyelikte kişi ilişkisi bulunması, sıfat-fiili bağımsız temel yükleme dönüştürmez.",
    ],
  ],
  "cumlenin-ogeleri": [
    [
      "“Yeni gelen görevli dün raporu müdüre teslim etti.” cümlesinin tam yüklemi hangisidir?",
      ["Teslim etti", "Etti", "Müdüre teslim", "Yeni gelen", "Raporu müdüre"],
      0,
      "Birleşik fiilin iki parçasını birlikte tut.",
      "Teslim etmek birleşik fiilidir; çekimli yüklem teslim etti bütünüdür. Yeni gelen görevli özne, dün zarf tümleci, raporu belirtili nesne, müdüre yer tamlayıcısıdır. Etti tek başına alınarak birleşik yüklem parçalanmaz.",
    ],
    [
      "“Ece roman okudu.” cümlesindeki roman sözcüğü hangi ögedir?",
      [
        "Gerçek özne",
        "Belirtisiz nesne",
        "Yer tamlayıcısı",
        "Zarf tümleci",
        "Yüklem",
      ],
      1,
      "Önce kim okudu, sonra ne okudu sorusunu sor.",
      "Kim okudu? Ece öznedir. Ece ne okudu? Roman, belirtme durumu almamış belirtisiz nesnedir. Özne belirlenmeden sorulan ne sorusu iki görevi karıştırabilir.",
    ],
    [
      "A: “Çocuklar bahçede oynadı.” B: “Çocuklar saat üçte oynadı.” Bahçede ve saat üçte öbeklerinin görevleri hangisidir?",
      [
        "İkisi de belirtili nesnedir.",
        "A zarf tümleci; B gerçek öznedir.",
        "A yer tamlayıcısı; B zarf tümlecidir.",
        "A gerçek özne; B yer tamlayıcısıdır.",
        "İkisi de birleşik yüklemdir.",
      ],
      2,
      "Nerede ve ne zaman sorularını ayrı dene.",
      "Bahçede, nerede oynadı sorusuna cevap veren yer tamlayıcısıdır. Saat üçte, ne zaman oynadı sorusuna cevap veren zaman zarf tümlecidir. Bulunma biçiminin benzerliği öge görevlerini eşitlemez.",
    ],
    [
      "Uygulama bu soruda MEBİ’nin öge adlandırmasını kullanır. “Eski köprü ustalar tarafından onarıldı.” cümlesindeki eski köprü ve ustalar tarafından öbekleri sırasıyla hangi görevlerdedir?",
      [
        "Belirtili nesne / gerçek özne",
        "Zarf tümleci / belirtili nesne",
        "Yer tamlayıcısı / yüklem",
        "Sözde özne / zarf tümleci",
        "Gizli özne / belirtisiz nesne",
      ],
      3,
      "Edilgenin etkilediği varlık ile tarafından öbeğini ayır.",
      "Onarıldı edilgendir; eski köprü etkilenen sözde öznedir. Ustalar tarafından anlamca yapanı bildirdiğinden örtülü özne diye anılır; MEBİ öge incelemesinde zarf tümleci sayılır. Bu iki düzey farklıdır.",
    ],
    [
      "MEBİ’nin gizli özneyi görünür öge sırasına ve sayısına katmayan kuralına göre “Dün eski defteri buldum.” cümlesinde kaç görünür öge vardır?",
      ["Bir", "İki", "Dört", "Beş", "Üç"],
      4,
      "Sıfat tamlamasını tek öbek tut ve gizli beni ayrı not et.",
      "Dün / eski defteri / buldum dizisi üç görünür ögedir. Buldum yükleminden gizli ben öznesi anlaşılır; fakat bu sorudaki görünür sayıya eklenmez. Eski defteri sıfat tamlaması bütün hâlde nesnedir.",
    ],
    [
      "“Arkadaşlar, bu kitabı okuyun.” cümlesinde arkadaşlar sözü ve özne ilişkisi hangi seçenekte doğru açıklanır?",
      [
        "Arkadaşlar seslenmedir; cümle dışıdır. Okuyun yükleminde gizli siz öznesi vardır.",
        "Arkadaşlar belirtili nesnedir; gizli özne bendir.",
        "Arkadaşlar yer tamlayıcısıdır; yüklem geçmiş zamandadır.",
        "Arkadaşlar yüklemdir; okuyun gerçek öznedir.",
        "Arkadaşlar olumsuzluk eki olduğu için özne yoktur.",
      ],
      0,
      "İkinci çoğul kişiye yöneltilen çağrıyı ve emri birlikte oku.",
      "Cümle arkadaşlara seslenir; arkadaşlar hitap olarak cümle dışı ögedir. Okuyun ikinci çoğul emir biçimidir ve gizli siz öznesini gösterir. “Arkadaşlar bu kitabı okudu.” biçiminde ise aynı sözcük açık özne olabilir; burada tam bağlam farklıdır.",
    ],
    [
      "Bu soruda araç bildiren edat öbekleri MEBİ’ye uygun biçimde zarf tümleci altında değerlendirilir. “Ece makasla kâğıdı kesti.” cümlesindeki makasla hangi ögedir?",
      [
        "Belirtisiz nesne",
        "Zarf tümleci",
        "Sözde özne",
        "Yüklem",
        "Yer tamlayıcısı",
      ],
      1,
      "Neyle kesti sorusu bir araç ilişkisi kuruyor.",
      "Makasla, kesmenin aracını bildirir; belirtilen MEBİ konvansiyonunda zarf tümlecidir. Kâğıdı belirtili nesne, Ece özne, kesti yüklemdir. Araç adı ile nesne veya eş özne karıştırılmaz.",
    ],
    [
      "A: “O içeri girdi.” B: “O içeriye girdi.” İçeri ve içeriye sözlerinin görevleri hangi seçenekte doğru sıralanır?",
      [
        "İkisi de gerçek öznedir.",
        "A yer tamlayıcısı; B belirtili nesnedir.",
        "A zarf tümleci; B yer tamlayıcısıdır.",
        "A belirtili nesne; B yüklemdir.",
        "İkisi de yalnız cümle dışı ögedir.",
      ],
      2,
      "Yalın yön zarfı ile yönelme durumu almış adı ayır.",
      "Yalın içeri bu cümlede yön bildiren zarf tümlecidir. İçeriye yönelme durumuyla nereye sorusuna cevap veren yer tamlayıcısıdır. Bu kontrollü dönüşümde yüklem ve özne aynı kalır, öge ilişkisi değişir.",
    ],
    [
      "“Yeni gelen görevli dün raporu müdüre teslim etti.” cümlesi “Dün raporu müdüre teslim etti yeni gelen görevli.” biçimine dönüştürülüyor. Hangisi doğrudur?",
      [
        "Yeni gelen görevli artık belirtili nesnedir.",
        "Dün artık gerçek öznedir.",
        "Müdüre artık yüklemdir.",
        "Ögelerin yükleme kurduğu ilişkiler korunmuş; özne yüklemden sonraya alınmıştır.",
        "Teslim etti sözü yalnız cümle dışı seslenmedir.",
      ],
      3,
      "Yer değişimi ile dil bilgisel görev değişimini ayır.",
      "Dönüşümde kim teslim etti sorusunun cevabı yine yeni gelen görevlidir. Raporu nesne, müdüre yer tamlayıcısı ve dün zarf tümleci olarak kalır. Özne sona alınmış, cümle devrik olmuş; ilişkiler değişmemiştir.",
    ],
    [
      "Bu soruda MEBİ’nin öge çözümlemesi kullanılıyor. “Bu salonda erkenden yatılır.” cümlesi için hangi yargı doğrudur?",
      [
        "Yatılır geçişli olduğu için bu salonda belirtili nesnedir.",
        "Erkenden bir kişinin özel adı olduğundan gerçek öznedir.",
        "Edilgen görünen her cümlede mutlaka açık sözde özne vardır.",
        "Yüklem çoğul olduğu için gizli özne bizdir.",
        "Geçişsiz fiilin edilgen kullanımında sözde özne aramak gerekmez; bu salonda yer, erkenden zarf tümlecidir.",
      ],
      4,
      "Yatmak fiili bir nesneyi etkileyen geçişli eylem midir?",
      "Yat- geçişsizdir; bu kullanımda nesneden dönüşmüş sözde özne yoktur. Yatılır yüklem, bu salonda yer tamlayıcısı, erkenden zarf tümlecidir. Edilgen yapıya her durumda hayalî bir açık veya gizli özne eklenmez.",
    ],
  ],
  "cumle-turleri": [
    [
      "MEBİ/OGM sınıflamasına göre “Dosyayı getirmedi Ece.” cümlesinin sırasıyla yüklem türü, yüklem yeri, anlamı ve yapısı hangisidir?",
      [
        "Fiil / devrik / olumsuz / basit",
        "İsim / kurallı / olumlu / bağlı",
        "Fiil / kurallı / olumlu / sıralı",
        "İsim / devrik / olumsuz / girişik birleşik",
        "Fiil / eksiltili / olumlu / şartlı birleşik",
      ],
      0,
      "Getirmedi yükleminin türünü ve ardından gelen özneyi gör.",
      "Getirmedi çekimli fiildir; Ece ondan sonra geldiğinden yüklem sonda değildir ve cümle devriktir. -me olumsuzluk bildirir. Tek temel yargı ve yan yapı bulunmadığından cümle basittir. Dört ölçüt birbirinden ayrı denetlenmiştir.",
    ],
    [
      "“Hava serindi.” ve “Hava serinledi.” cümlelerinin yüklem türleri hangi seçenekte doğru karşılaştırılır?",
      [
        "İkisi de yalnız isim cümlesidir.",
        "İlki isim, ikincisi fiil cümlesidir.",
        "İlki fiil, ikincisi isim cümlesidir.",
        "İkisi de yüklemsiz eksiltili ifadedir.",
        "İlki bağlı, ikincisi sıralı olduğu için yüklem türü belirlenemez.",
      ],
      1,
      "Serin ad soylu taban ile serinle- türemiş fiilini ayır.",
      "Serin-di, ad soylu serin tabanının ek fiille geçmiş yargı kurmasıdır; isim cümlesidir. Serinle-di, serinle- fiilinin çekimidir; fiil cümlesidir. İkisinde de geçmişlik bulunması bu ayrımı silmez.",
    ],
    [
      "MEBİ/OGM’nin yapı sınıflamasına göre “Ece ve Can kitap okudu.” cümlesi neden bağlı cümle değildir?",
      [
        "Çünkü bağlı cümlede hiçbir bağlaç bulunamaz.",
        "Çünkü Can özel ad olduğu için yüklem sayılamaz ve cümle eksiltilidir.",
        "Ve iki özne parçasını bağlar; okudu tek temel yargıyı kurar, cümle basittir.",
        "Çünkü cümlede en az üç çekimli yüklem vardır.",
        "Çünkü içinde iki ad olan her cümle şartlı birleşiktir.",
      ],
      2,
      "Ve sözcüğünün iki yanında hangi eş görevli parçalar var?",
      "Ece ve Can tek özne grubunun parçalarıdır. Bağlaç iki bağımsız temel yargı bağlamaz; yalnız okudu yüklemi vardır. Başka yan yapı da bulunmadığı için cümle basittir. Bağlaç görmek tek başına bağlı cümle kanıtı değildir.",
    ],
    [
      "MEBİ/OGM’ye göre A: “Ece dosyayı açtı, Can not aldı.” B: “Ece dosyayı açtı ve Can not aldı.” cümlelerinin yapı farkı hangisidir?",
      [
        "A basit, B eksiltilidir.",
        "A isim cümlesi, B yüklemsizdir.",
        "İkisinde de yalnız bir temel yargı vardır.",
        "A iki temel yargısı virgülle birleşen sıralı; B iki temel yargısı bağlaçla birleşen bağlı cümledir.",
        "A şartlı birleşik, B yalnız bir sıfat tamlamasıdır.",
      ],
      3,
      "Açtı ve aldı yargılarını kendi özneleriyle tamamla.",
      "İki örnekte de Ecenin açması ve Canın not alması iki temel yargıdır. A’da bunlar virgülle sıralanır; B’de ve bağlacıyla bağlanır. Noktalama veya bağlacın neyi ilişkilendirdiği de gösterilmiştir.",
    ],
    [
      "OGM’nin yüklemdeki tek fiilimsi için verdiği sınır dikkate alındığında “Amacım araştırmaktır.” cümlesinin yapısı ve yüklem türü hangisidir?",
      [
        "Bağlı fiil cümlesi",
        "Bağımsız sıralı fiil cümlesi",
        "Şartlı birleşik isim cümlesi",
        "Yüklemsiz eksiltili cümle",
        "Basit isim cümlesi",
      ],
      4,
      "Araştırmaktır temel yüklemin kendisi; dışında başka yan yapı var mı?",
      "Araştırmak isim-fiili -tır ek fiiliyle ad soylu temel yüklem olmuştur. Cümlede yüklem dışında fiilimsiyle kurulmuş ayrı bir yan yapı veya ikinci yargı yoktur. Bu konvansiyonda basit isim cümlesidir.",
    ],
    [
      "MEBİ’nin anlam sınıflamasına göre “Ece ne konuştu ne güldü.” cümlesi hakkında hangisi doğrudur?",
      [
        "Olumsuzluk eki olmadan iki eylemin de gerçekleşmediğini bildirir.",
        "Konuşma ve gülmenin kesin yapıldığını bildirir.",
        "Ne sözcükleri yalnız bulunma durumu ekleridir.",
        "Yalnız ünlem işareti bulunmadığından cümle anlam taşımaz.",
        "Fiiller olumlu biçimdeyse cümle hiçbir zaman olumsuz anlam taşıyamaz.",
      ],
      0,
      "Ne…ne yapısının eylemlerin gerçekleşmesine etkisini oku.",
      "Ne…ne bağlacı bu bağlamda Ecenin konuşmadığını ve gülmediğini bildirir. Fiillerin içinde -ma olumsuzluk eki görünmemesi anlamı olumlu yapmaz. Biçim ve anlam ayrı denetlenmelidir.",
    ],
    [
      "Bir konuşmacı “Ben bu yolu bilmez miyim? Elbette bilirim, yıllarca burada yaşadım.” diyor. İlk cümlenin iletişim amacı hakkında en doğru yargı hangisidir?",
      [
        "Konuşmacı adresi gerçekten bilmediğini sorup bilgi beklemektedir.",
        "Soru biçimiyle bildiğini vurgular; verilen bağlamda sözde soru ve olumlu anlam vardır.",
        "Cümlede soru biçimi bulunmadığı için yalnız emir vardır.",
        "Bilmez sözü kalıcı isim olduğundan hiçbir yargı yoktur.",
        "Konuşmacı yolun kesin kapalı olduğunu kanıtlamaktadır.",
      ],
      1,
      "İlk cümleyi devamındaki elbette bilirim açıklamasıyla oku.",
      "Devam cümlesi konuşmacının yolu bildiğini açıkça gösterir. Bilmez miyim biçimsel sorusu burada bilgi istemek için değil bildiğini vurgulamak için kullanılır. Yolun kapanması veya adres isteme gibi bilgiler çıkarılamaz.",
    ],
    [
      "MEBİ/OGM okul sınıflamasına göre “Dosyayı açınca not aldı.” cümlesi hangi gerekçeyle girişik birleşiktir?",
      [
        "Virgül kullanıldığı ve iki açık özne bulunduğu için.",
        "Her uzun cümle zorunlu olarak girişik olduğu için.",
        "Açınca zarf-fiiliyle yan eylem, aldı ile temel yargı kurulduğu için.",
        "Aldı sözcüğü isim-fiil olduğu için.",
        "Cümlede hiçbir yüklem bulunmadığı için.",
      ],
      2,
      "-ınca yapısının hangi temel yargıya bağlandığını bul.",
      "Aç-ınca zarf-fiili, not alma eylemine zaman ilişkisiyle bağlanan yan yapıdır. Aldı temel çekimli yüklemdir. Bu okul sınıflamasında fiilimsiyle kurulan yan yapı nedeniyle cümle girişik birleşiktir.",
    ],
    [
      "MEBİ/OGM’ye göre “Ece kapıyı açtı, içeri girdi.” cümlesi neden bağımlı sıralıdır?",
      [
        "İki yüklem de zorunlu olarak isim yüklemidir.",
        "Cümlede bağlaç olmadığı için hiçbir yargı yoktur.",
        "İçeri sözcüğü ikinci bir açık kişidir.",
        "İki temel yargı virgülle sıralanır ve ikinci yargının öznesi de Ece olduğundan özne ortaktır.",
        "Bağımlılık yalnız iki eylemin aynı geçmiş zamanda olmasına dayanır.",
      ],
      3,
      "Kim açtı ve kim girdi sorularının cevaplarını karşılaştır.",
      "Açtı ve girdi iki temel yargıdır; virgülle sıralanır. Ece ilk yargıda açıkça bulunur ve ikinci yargının da öznesidir. Ortak özne bağımlılığı kurar; yalnız zaman benzerliği veya konu ortaklığı ölçüt değildir.",
    ],
    [
      "MEBİ/OGM’nin yapı sınıflamasına göre hangi seçenek şartlı birleşik cümleye açık bir örnektir?",
      [
        "“Keşke gelse!”; çünkü her -se tek başına iki yargı demektir.",
        "“Bahçedeki çocuk güldü.”; çünkü bitişik -ki koşul kurar.",
        "“Ece ve Can geldi.”; çünkü iki kişi her zaman iki temel yargı kurar.",
        "“Amacım okumaktır.”; çünkü -mak bir şart ekidir.",
        "“Yağmur diner ise dışarı çıkacağız.”; çünkü koşul yargısı temel çıkma yargısına bağlanmıştır.",
      ],
      4,
      "Ayrı bir koşul ile onun bağlı olduğu ana yargıyı birlikte ara.",
      "Yağmur diner ise koşul yargısı, dışarı çıkacağız ana yargısına bağlanır. Keşke gelse tek dilek yargısıdır; bahçedeki içindeki -ki ek, ve ise eş özneleri bağlar. Bu seçeneklerde şartlı birleşik yapı kurulmamıştır.",
    ],
  ],
};

function questionsFor015(id: string): Question[] {
  return questionRows015[id].map(
    ([prompt, options, answer, hint, explanation], i) => ({
      id: `f015-${id}-${i + 1}`,
      prompt: txt(prompt),
      options: options.map(txt),
      answer,
      hint: txt(hint),
      explanation: txt(explanation),
      skill: id,
    }),
  );
}
export const forge015TurkishGuides: LessonGuide[] = [
  verbalsGuide015,
  elementsGuide015,
  sentencesGuide015,
];
export const forge015TurkishTopics: Record<string, string> = {
  fiilimsiler: "detail-260",
  "cumlenin-ogeleri": "detail-261",
  "cumle-turleri": "detail-262",
};
const titles015 = [
  "Fiilimsiler: eki, kökü ve görevi birlikte oku",
  "Cümlenin ögeleri: yüklem çevresindeki ilişkiler",
  "Cümle türleri: dört ölçütte ayrı kanıt",
];
export const forge015TurkishLessons: Lesson[] = forge015TurkishGuides.map(
  (g, i) => ({
    id: g.id,
    subjectId: "tyt-turkce",
    title: txt(titles015[i]),
    minutes: g.minutes,
    objectives: g.objectives.map(txt),
    body: g.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: questionsFor015(g.id),
    source: txt(g.source),
    tags: ["kaynakli-anlatim", "adim-adim", "dil-bilgisi"],
  }),
);

export type TurkishAxis015 = "predicate" | "position" | "meaning" | "structure";
export type TurkishToken015 = { text: string; role: string; why: string };
export type TurkishFrame015 = {
  sentence: string;
  context: string;
  tokens: TurkishToken015[];
  focus: number;
  relations: { from: number; to: number; label: string }[];
  classifications: Partial<Record<TurkishAxis015, string>>;
  proof: string;
};
export type TurkishCase015 = {
  id: string;
  label: string;
  frames: [TurkishFrame015, TurkishFrame015];
};
const authoredCases015: Record<string, TurkishCase015[]> = {
  fiilimsiler: [
    {
      id: "eylem-adi",
      label: "Eylem adı → çekimli yargı",
      frames: [
        {
          sentence: "Okumayı seviyorum.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Okumayı",
              role: "İsim-fiil",
              why: "Oku-ma-y-ı: -ma eylemi adlandırır; ardından belirtme durumu gelir. Sevmek yükleminin nesnesidir.",
            },
            {
              text: "seviyorum.",
              role: "Çekimli fiil",
              why: "Sev-iyor-um kip ve kişiyle temel yargıyı kurar.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Nesne",
              from: 0,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
        {
          sentence: "Bu metni bugün okudum.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Bu metni",
              role: "Ad öbeği",
              why: "Okuma işinden etkilenen belirtili nesne öbeğidir; bu parçada fiilimsi yoktur.",
            },
            {
              text: "bugün",
              role: "Zaman zarfı",
              why: "Okuma eyleminin zamanını belirtir.",
            },
            {
              text: "okudum.",
              role: "Çekimli fiil",
              why: "Oku-du-m, geçmiş kip ve birinci tekil kişiyle temel yargıdır; eylem adı değildir.",
            },
          ],
          focus: 2,
          relations: [
            {
              to: 2,
              label: "Bağ",
              from: 0,
            },
            {
              to: 2,
              label: "Bağ",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
      ],
    },
    {
      id: "niteleme",
      label: "Adı niteleme → gelecek yargısı",
      frames: [
        {
          sentence: "Okuyacağın kitabı rafa koydum.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Okuyacağın",
              role: "Sıfat-fiil",
              why: "Oku‑ / ‑yacağ‑ / ‑ın, kitabın hangi kitap olduğunu belirtir. -ın iyelik ilişkisi taşır; bağımsız temel kip/kişi çekimi değildir.",
            },
            {
              text: "kitabı",
              role: "Ad",
              why: "Okuyacağın tarafından nitelenen addır; bütün öbek koydum yükleminin nesnesidir.",
            },
            {
              text: "rafa",
              role: "Ad",
              why: "Yönelme durumu almış ad, yer tamlayıcısı olur.",
            },
            {
              text: "koydum.",
              role: "Çekimli fiil",
              why: "Koy-du-m temel geçmiş yargıdır.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Niteleme",
              from: 0,
            },
            {
              to: 3,
              label: "Nesne",
              from: 1,
            },
            {
              to: 3,
              label: "Yer",
              from: 2,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
        {
          sentence: "Bu kitabı yarın okuyacağım.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Bu kitabı",
              role: "Ad öbeği",
              why: "Okuma eyleminin belirtili nesnesidir.",
            },
            {
              text: "yarın",
              role: "Zaman zarfı",
              why: "Gelecekteki zamanı açıklar.",
            },
            {
              text: "okuyacağım.",
              role: "Çekimli fiil",
              why: "Oku‑ / ‑yacağ‑ / ‑ım, gelecek zaman ve ben kişisiyle temel yargı kurar; bir adı nitelemez.",
            },
          ],
          focus: 2,
          relations: [
            {
              to: 2,
              label: "Bağ",
              from: 0,
            },
            {
              to: 2,
              label: "Bağ",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
      ],
    },
    {
      id: "zarf",
      label: "Yan hareket → bağımsız yargı",
      frames: [
        {
          sentence: "Koşarak salona girdi.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Koşarak",
              role: "Zarf-fiil",
              why: "Koş-arak fiil tabanından kurulur; girmenin nasıl yapıldığını açıklar.",
            },
            {
              text: "salona",
              role: "Ad",
              why: "Yönelme durumunda yer tamlayıcısı olur.",
            },
            {
              text: "girdi.",
              role: "Çekimli fiil",
              why: "Gir-di temel geçmiş yargıdır.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 2,
              label: "Nasıl?",
              from: 0,
            },
            {
              to: 2,
              label: "Nereye?",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
        {
          sentence: "Çocuk salonda koştu.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Çocuk",
              role: "Ad",
              why: "Açık özne olan addır.",
            },
            {
              text: "salonda",
              role: "Ad",
              why: "Bulunma durumuyla yer tamlayıcısı olur.",
            },
            {
              text: "koştu.",
              role: "Çekimli fiil",
              why: "Koş-tu, geçmiş zamanlı temel yargıdır; başka bir temel fiile zarf olarak bağlanmaz.",
            },
          ],
          focus: 2,
          relations: [
            {
              to: 2,
              label: "Bağ",
              from: 0,
            },
            {
              to: 2,
              label: "Bağ",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
      ],
    },
    {
      id: "adlasma",
      label: "Açık ad → düşen ad",
      frames: [
        {
          sentence: "Gelen öğrenciler bekledi.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Gelen",
              role: "Sıfat-fiil",
              why: "Gel-en, öğrenciler adını niteler; eylemden gelen niteleme açıktır.",
            },
            {
              text: "öğrenciler",
              role: "Ad",
              why: "Gelen sıfat-fiilinin nitelediği açık addır.",
            },
            {
              text: "bekledi.",
              role: "Çekimli fiil",
              why: "Bekle-di temel yargıdır.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Niteleme",
              from: 0,
            },
            {
              to: 2,
              label: "Özne",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
        {
          sentence: "Gelenler bekledi.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Gelenler",
              role: "Adlaşmış sıfat-fiil",
              why: "Gelen kişiler anlamında ad düşmüştür; gel-en-ler biçimi eylemden gelen nitelemeyi korur.",
            },
            {
              text: "bekledi.",
              role: "Çekimli fiil",
              why: "Bekle-di temel yargıdır.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Özne",
              from: 0,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
      ],
    },
    {
      id: "kalici",
      label: "Yiyecek adı → eylem adı",
      frames: [
        {
          sentence: "Bir porsiyon dondurma aldım.",
          context: "Konuşmacı bir yiyecek siparişini anlatıyor.",
          tokens: [
            {
              text: "Bir porsiyon",
              role: "Ölçü öbeği",
              why: "Yiyeceğin miktarını belirtir; dondurma ile birlikte nesne öbeğine katılır.",
            },
            {
              text: "dondurma",
              role: "Kalıcı ad",
              why: "Bu bağlamda soğuk yiyeceğin adıdır; suyu katılaştırma eylemi anlatılmıyor.",
            },
            {
              text: "aldım.",
              role: "Çekimli fiil",
              why: "Al-dı-m temel yargıdır.",
            },
          ],
          focus: 1,
          relations: [
            {
              to: 1,
              label: "Miktar",
              from: 0,
            },
            {
              to: 2,
              label: "Nesne",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
        {
          sentence: "Suyu dondurma işlemi uzun sürdü.",
          context:
            "Bir laboratuvar görevlisi suyun katı hâle gelmesi işlemini anlatıyor.",
          tokens: [
            {
              text: "Suyu",
              role: "Ad",
              why: "Dondurma yan eyleminin etkilediği varlığı belirtir.",
            },
            {
              text: "dondurma",
              role: "İsim-fiil",
              why: "Dondur-ma, suyu katılaştırma eylemini adlandırır; yiyecek adı değildir.",
            },
            {
              text: "işlemi",
              role: "Ad",
              why: "Suyu dondurma işlemi bütün olarak özne öbeğidir.",
            },
            {
              text: "uzun",
              role: "Zarf",
              why: "Sürme eyleminin süresini belirtir.",
            },
            {
              text: "sürdü.",
              role: "Çekimli fiil",
              why: "Sür-dü temel yargıdır.",
            },
          ],
          focus: 1,
          relations: [
            {
              to: 1,
              label: "Neyi?",
              from: 0,
            },
            {
              to: 2,
              label: "Eylem adı",
              from: 1,
            },
            {
              to: 4,
              label: "Özne",
              from: 2,
            },
            {
              to: 4,
              label: "Süre",
              from: 3,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
      ],
    },
    {
      id: "emir",
      label: "Olumsuz emir → eylem adı",
      frames: [
        {
          sentence: "Burada konuşma!",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Burada",
              role: "Ad",
              why: "Bulunma durumuyla yer ilişkisi kurar.",
            },
            {
              text: "konuşma!",
              role: "Çekimli fiil",
              why: "Konuş-ma, muhataba konuşmama emridir; -ma olumsuzluk ekidir.",
            },
          ],
          focus: 1,
          relations: [
            {
              to: 1,
              label: "Bağ",
              from: 0,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
        {
          sentence: "Onun sakin konuşması bizi rahatlattı.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Onun sakin",
              role: "Adı tamamlayan parçalar",
              why: "Konuşma eyleminin kişisini ve niteliğini açıklar.",
            },
            {
              text: "konuşması",
              role: "İsim-fiil",
              why: "Konuş- / -ma / -sı, eylem adı ve iyelik ekidir; bütün öbek rahatlatan şeyi bildirir.",
            },
            {
              text: "bizi",
              role: "Zamir",
              why: "Rahatlatma eyleminin belirtili nesnesidir.",
            },
            {
              text: "rahatlattı.",
              role: "Çekimli fiil",
              why: "Rahatlat-tı temel yargıdır.",
            },
          ],
          focus: 1,
          relations: [
            {
              to: 1,
              label: "Tamamlama",
              from: 0,
            },
            {
              to: 3,
              label: "Özne",
              from: 1,
            },
            {
              to: 3,
              label: "Nesne",
              from: 2,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
      ],
    },
    {
      id: "ken",
      label: "Ad tabanı → fiil tabanı",
      frames: [
        {
          sentence: "Hastayken dinlendi.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Hastayken",
              role: "Ad tabanı ve ek fiil",
              why: "Hasta ad soyludur; hasta iken biçimi zarf işlevli yapı kurar. OGM TYT kuralına göre fiilimsi değildir.",
            },
            {
              text: "dinlendi.",
              role: "Çekimli fiil",
              why: "Dinlen-di temel yargıdır.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Bağ",
              from: 0,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
        {
          sentence: "Yürürken durdu.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Yürürken",
              role: "Zarf-fiil",
              why: "Yürü- fiil tabanından gelen bu yapı, durmanın zamanını belirtir; OGM tasnifinde zarf-fiildir.",
            },
            {
              text: "durdu.",
              role: "Çekimli fiil",
              why: "Dur-du temel yargıdır.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Bağ",
              from: 0,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
      ],
    },
  ],
  "cumlenin-ogeleri": [
    {
      id: "sira",
      label: "Ögeyi koru, sırayı değiştir",
      frames: [
        {
          sentence: "Yeni gelen görevli dün raporu müdüre teslim etti.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Yeni gelen görevli",
              role: "Özne",
              why: "Kim teslim etti? Yeni gelen görevli. Sıfat-fiil grubunu bölmeden bütün tut.",
            },
            {
              text: "dün",
              role: "Zarf tümleci",
              why: "Ne zaman teslim etti? Dün zaman bildirir.",
            },
            {
              text: "raporu",
              role: "Belirtili nesne",
              why: "Neyi teslim etti? Raporu; belirtme durumuyla nesnedir.",
            },
            {
              text: "müdüre",
              role: "Yer tamlayıcısı",
              why: "Kime teslim etti? Müdüre; yönelme durumuyla yer tamlayıcısı olur.",
            },
            {
              text: "teslim etti.",
              role: "Yüklem",
              why: "Birleşik fiil bütün olarak yüklemdir; etti tek başına ayrılmaz.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 4,
              label: "Bağ",
              from: 0,
            },
            {
              to: 4,
              label: "Bağ",
              from: 1,
            },
            {
              to: 4,
              label: "Bağ",
              from: 2,
            },
            {
              to: 4,
              label: "Bağ",
              from: 3,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
        {
          sentence: "Dün raporu müdüre teslim etti yeni gelen görevli.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Dün",
              role: "Zarf tümleci",
              why: "Ne zaman teslim etti? Dün; sonda olmamak görevi değiştirmez.",
            },
            {
              text: "raporu",
              role: "Belirtili nesne",
              why: "Neyi teslim etti? Raporu; ilişkisi aynı kalır.",
            },
            {
              text: "müdüre",
              role: "Yer tamlayıcısı",
              why: "Kime teslim etti? Müdüre; ilişkisi aynı kalır.",
            },
            {
              text: "teslim etti",
              role: "Yüklem",
              why: "Birleşik yüklem korunur; ardından özne geldiği için cümle devriktir.",
            },
            {
              text: "yeni gelen görevli.",
              role: "Özne",
              why: "Kim teslim etti? Yeni gelen görevli. Özne sona alınsa da özne kalır.",
            },
          ],
          focus: 4,
          relations: [
            {
              to: 3,
              label: "Bağ",
              from: 0,
            },
            {
              to: 3,
              label: "Bağ",
              from: 1,
            },
            {
              to: 3,
              label: "Bağ",
              from: 2,
            },
            {
              to: 3,
              label: "Bağ",
              from: 4,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
      ],
    },
    {
      id: "nesne",
      label: "Belirtisiz → belirtili nesne",
      frames: [
        {
          sentence: "Ece dün roman okudu.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Ece",
              role: "Özne",
              why: "Kim okudu? Ece.",
            },
            {
              text: "dün",
              role: "Zarf tümleci",
              why: "Ne zaman okudu? Dün.",
            },
            {
              text: "roman",
              role: "Belirtisiz nesne",
              why: "Özne Ece olarak ayrılınca ne okudu sorusu romanı buldurur; belirtme eki yoktur.",
            },
            {
              text: "okudu.",
              role: "Yüklem",
              why: "Oku-du temel çekimli yargıdır.",
            },
          ],
          focus: 2,
          relations: [
            {
              to: 3,
              label: "Bağ",
              from: 0,
            },
            {
              to: 3,
              label: "Bağ",
              from: 1,
            },
            {
              to: 3,
              label: "Bağ",
              from: 2,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
        {
          sentence: "Ece dün romanı okudu.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Ece",
              role: "Özne",
              why: "Kim okudu? Ece.",
            },
            {
              text: "dün",
              role: "Zarf tümleci",
              why: "Ne zaman okudu? Dün.",
            },
            {
              text: "romanı",
              role: "Belirtili nesne",
              why: "Neyi okudu? Romanı; -ı belirtme durumuyla belirli nesne kurar.",
            },
            {
              text: "okudu.",
              role: "Yüklem",
              why: "Oku-du temel çekimli yargıdır.",
            },
          ],
          focus: 2,
          relations: [
            {
              to: 3,
              label: "Bağ",
              from: 0,
            },
            {
              to: 3,
              label: "Bağ",
              from: 1,
            },
            {
              to: 3,
              label: "Bağ",
              from: 2,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
      ],
    },
    {
      id: "bulunma",
      label: "Bulunma biçimi: yer → zaman",
      frames: [
        {
          sentence: "Çocuklar bahçede oynadı.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Çocuklar",
              role: "Özne",
              why: "Kim oynadı? Çocuklar.",
            },
            {
              text: "bahçede",
              role: "Yer tamlayıcısı",
              why: "Nerede oynadı? Bahçede; mekân ilişkisi vardır.",
            },
            {
              text: "oynadı.",
              role: "Yüklem",
              why: "Oyna-dı temel yargıdır.",
            },
          ],
          focus: 1,
          relations: [
            {
              to: 2,
              label: "Bağ",
              from: 0,
            },
            {
              to: 2,
              label: "Bağ",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
        {
          sentence: "Çocuklar saat üçte oynadı.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Çocuklar",
              role: "Özne",
              why: "Kim oynadı? Çocuklar.",
            },
            {
              text: "saat üçte",
              role: "Zarf tümleci",
              why: "Ne zaman oynadı? Saat üçte; bulunma biçimi bu kez zaman ilişkisi kurar.",
            },
            {
              text: "oynadı.",
              role: "Yüklem",
              why: "Oyna-dı temel yargıdır.",
            },
          ],
          focus: 1,
          relations: [
            {
              to: 2,
              label: "Bağ",
              from: 0,
            },
            {
              to: 2,
              label: "Bağ",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
      ],
    },
    {
      id: "yon",
      label: "Yalın yön → yönelme durumu",
      frames: [
        {
          sentence: "O içeri girdi.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "O",
              role: "Özne",
              why: "Kim girdi? O.",
            },
            {
              text: "içeri",
              role: "Zarf tümleci",
              why: "Yalın yön sözü bu cümlede yön zarfıdır.",
            },
            {
              text: "girdi.",
              role: "Yüklem",
              why: "Gir-di temel yargıdır.",
            },
          ],
          focus: 1,
          relations: [
            {
              to: 2,
              label: "Bağ",
              from: 0,
            },
            {
              to: 2,
              label: "Bağ",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
        {
          sentence: "O içeriye girdi.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "O",
              role: "Özne",
              why: "Kim girdi? O.",
            },
            {
              text: "içeriye",
              role: "Yer tamlayıcısı",
              why: "Nereye girdi? İçeriye; yönelme durumuyla yer tamlayıcısı olur.",
            },
            {
              text: "girdi.",
              role: "Yüklem",
              why: "Gir-di temel yargıdır.",
            },
          ],
          focus: 1,
          relations: [
            {
              to: 2,
              label: "Bağ",
              from: 0,
            },
            {
              to: 2,
              label: "Bağ",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
      ],
    },
    {
      id: "edilgen",
      label: "Etken → edilgen ilişki",
      frames: [
        {
          sentence: "Ustalar eski köprüyü onardı.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Ustalar",
              role: "Özne",
              why: "Onarma işini yapan gerçek öznedir.",
            },
            {
              text: "eski köprüyü",
              role: "Belirtili nesne",
              why: "Neyi onardı? Eski köprüyü; etkilenen nesnedir.",
            },
            {
              text: "onardı.",
              role: "Yüklem",
              why: "Etken onar-dı yüklemidir.",
            },
          ],
          focus: 1,
          relations: [
            {
              to: 2,
              label: "Bağ",
              from: 0,
            },
            {
              to: 2,
              label: "Bağ",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
        {
          sentence: "Eski köprü ustalar tarafından onarıldı.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Eski köprü",
              role: "Sözde özne",
              why: "Edilgen eylemden etkilenen sözde öznedir; etken cümledeki nesneyle aynı varlığı gösterir.",
            },
            {
              text: "ustalar tarafından",
              role: "Zarf tümleci",
              why: "Anlamca örtülü özne diye adlandırılan yapan öbeğidir. MEBİ öge çözümünde zarf tümleci sayılır.",
            },
            {
              text: "onarıldı.",
              role: "Yüklem",
              why: "Edilgen onar-ıl-dı yüklemidir.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 2,
              label: "Bağ",
              from: 0,
            },
            {
              to: 2,
              label: "Bağ",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
      ],
    },
    {
      id: "ile",
      label: "Araç → eş özne",
      frames: [
        {
          sentence: "Ece makasla kâğıdı kesti.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Ece",
              role: "Özne",
              why: "Kesme işini yapan açık öznedir.",
            },
            {
              text: "makasla",
              role: "Zarf tümleci",
              why: "Neyle kesti? Makasla araç bildirir; uygulama MEBİ kuralına göre zarf tümleci gösterir.",
            },
            {
              text: "kâğıdı",
              role: "Belirtili nesne",
              why: "Neyi kesti? Kâğıdı.",
            },
            {
              text: "kesti.",
              role: "Yüklem",
              why: "Kes-ti temel yargıdır.",
            },
          ],
          focus: 1,
          relations: [
            {
              to: 3,
              label: "Bağ",
              from: 0,
            },
            {
              to: 3,
              label: "Bağ",
              from: 1,
            },
            {
              to: 3,
              label: "Bağ",
              from: 2,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
        {
          sentence: "Ece ile Can kâğıdı kesti.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Ece ile Can",
              role: "Özne",
              why: "İle eş görevli iki kişiyi tek özne öbeğinde bağlar; bu parça araç öbeği değildir.",
            },
            {
              text: "kâğıdı",
              role: "Belirtili nesne",
              why: "Neyi kesti? Kâğıdı.",
            },
            {
              text: "kesti.",
              role: "Yüklem",
              why: "Kes-ti temel yargıdır.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 2,
              label: "Bağ",
              from: 0,
            },
            {
              to: 2,
              label: "Bağ",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
      ],
    },
    {
      id: "hitap",
      label: "Seslenme → açık özne",
      frames: [
        {
          sentence: "Arkadaşlar, bu kitabı okuyun.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Arkadaşlar,",
              role: "Cümle dışı öge",
              why: "İkinci çoğul kişiye yönelen hitaptır; açık özne diye sıraya katılmaz.",
            },
            {
              text: "bu kitabı",
              role: "Belirtili nesne",
              why: "Neyi okuyun? Bu kitabı.",
            },
            {
              text: "okuyun.",
              role: "Yüklem",
              why: "İkinci çoğul emir yüklemidir; gizli siz öznesi vardır ve görünür öge sırasına eklenmez.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 2,
              label: "Nesne",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
        {
          sentence: "Arkadaşlar bu kitabı okudu.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Arkadaşlar",
              role: "Özne",
              why: "Kim okudu? Arkadaşlar; bu cümlede eylemi yapan açık öznedir.",
            },
            {
              text: "bu kitabı",
              role: "Belirtili nesne",
              why: "Neyi okudu? Bu kitabı.",
            },
            {
              text: "okudu.",
              role: "Yüklem",
              why: "Geçmiş zamanlı üçüncü kişi temel yargıdır.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 2,
              label: "Bağ",
              from: 0,
            },
            {
              to: 2,
              label: "Bağ",
              from: 1,
            },
          ],
          classifications: {},
          proof:
            "Seçili parçayı tam cümledeki bağlı olduğu sözle birlikte değerlendir. Son sese tek başına karar verdirme.",
        },
      ],
    },
  ],
  "cumle-turleri": [
    {
      id: "yuklem",
      label: "Ad yüklemi → fiil yüklemi",
      frames: [
        {
          sentence: "Bugün hava serindi.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Bugün hava",
              role: "Yargının diğer ögeleri",
              why: "Bugün zaman; hava özne bilgisidir.",
            },
            {
              text: "serindi.",
              role: "Ad soylu yüklem",
              why: "Serin ad soylu tabanına idi gelmiştir; fiil türetimi yoktur.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Bağ",
              from: 0,
            },
          ],
          classifications: {
            predicate: "İsim cümlesi",
            position: "Kurallı",
            meaning: "Olumlu",
            structure: "Basit",
          },
          proof:
            "Tek ad soylu temel yüklem sonda; olumlu yargı ve ayrıca yan yapı yoktur.",
        },
        {
          sentence: "Bugün hava serinledi.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Bugün hava",
              role: "Yargının diğer ögeleri",
              why: "Zaman ve özne aynı kalır.",
            },
            {
              text: "serinledi.",
              role: "Çekimli fiil yüklemi",
              why: "Serinle- fiiline -di geçmişi gelmiştir; yüklem çekimli fiildir.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Bağ",
              from: 0,
            },
          ],
          classifications: {
            predicate: "Fiil cümlesi",
            position: "Kurallı",
            meaning: "Olumlu",
            structure: "Basit",
          },
          proof:
            "Tek çekimli temel yüklem sonda; olumlu yargı ve yan yapısız basit yapı vardır.",
        },
      ],
    },
    {
      id: "yer",
      label: "Kurallı → devrik sıra",
      frames: [
        {
          sentence: "Ece dosyayı getirdi.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Ece dosyayı",
              role: "Özne ve nesne",
              why: "Ece özne, dosyayı nesnedir.",
            },
            {
              text: "getirdi.",
              role: "Çekimli fiil yüklemi",
              why: "Getirdi sonda olduğundan cümle kurallıdır.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Bağ",
              from: 0,
            },
          ],
          classifications: {
            predicate: "Fiil cümlesi",
            position: "Kurallı",
            meaning: "Olumlu",
            structure: "Basit",
          },
          proof:
            "Tek olumlu fiil yargısı sonda; yan yapı veya ikinci temel yargı yoktur.",
        },
        {
          sentence: "Dosyayı getirdi Ece.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Dosyayı",
              role: "Nesne",
              why: "Nesne öne alınmıştır.",
            },
            {
              text: "getirdi",
              role: "Çekimli fiil yüklemi",
              why: "Ardından Ece öznesi geldiği için yüklem sonda değildir.",
            },
            {
              text: "Ece.",
              role: "Özne",
              why: "Kim getirdi? Ece; sonda da özne kalır.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Nesne",
              from: 0,
            },
            {
              to: 1,
              label: "Özne",
              from: 2,
            },
          ],
          classifications: {
            predicate: "Fiil cümlesi",
            position: "Devrik",
            meaning: "Olumlu",
            structure: "Basit",
          },
          proof:
            "Yüklem getirdi sonda değil; yapı ve olumlu anlam korunarak devrik sıra kurulmuştur.",
        },
      ],
    },
    {
      id: "yan",
      label: "Tek temel yargı → fiilimsi yan yapısı",
      frames: [
        {
          sentence: "Ece dosyayı getirdi.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Ece dosyayı",
              role: "Özne ve nesne",
              why: "Temel yargıya bağlı ögelerdir.",
            },
            {
              text: "getirdi.",
              role: "Temel yargı",
              why: "Tek çekimli yüklemdir; ayrıca fiilimsi yoktur.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Bağ",
              from: 0,
            },
          ],
          classifications: {
            predicate: "Fiil cümlesi",
            position: "Kurallı",
            meaning: "Olumlu",
            structure: "Basit",
          },
          proof:
            "Tek temel yargı bulunduğu, ayrıca yan yapı kurulmadığı için basittir.",
        },
        {
          sentence: "Ece dosyayı getirince toplantı başladı.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Ece dosyayı getirince",
              role: "Fiilimsi yan yapısı",
              why: "Getirince zarf-fiili, başlama temel yargısına zaman ilişkisiyle bağlanır.",
            },
            {
              text: "toplantı",
              role: "Temel yargının öznesi",
              why: "Başlayan şey toplantıdır.",
            },
            {
              text: "başladı.",
              role: "Temel yargı",
              why: "Başladı ana çekimli yargıdır.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 2,
              label: "Bağ",
              from: 0,
            },
            {
              to: 2,
              label: "Bağ",
              from: 1,
            },
          ],
          classifications: {
            predicate: "Fiil cümlesi",
            position: "Kurallı",
            meaning: "Olumlu",
            structure: "Girişik birleşik",
          },
          proof:
            "Getirince fiilimsi yan yapısı temel başladı yargısına bağlanır; MEBİ/OGM okul tasnifinde girişik birleşiktir.",
        },
      ],
    },
    {
      id: "ve",
      label: "Özne bağlama → yargı bağlama",
      frames: [
        {
          sentence: "Ece ve Can kitap okudu.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Ece ve Can",
              role: "Eş özneler",
              why: "Ve iki özne parçasını bağlar; iki temel cümle kurmaz.",
            },
            {
              text: "kitap okudu.",
              role: "Tek temel yargı",
              why: "Tek yüklem okududur; kitap nesnedir.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Bağ",
              from: 0,
            },
          ],
          classifications: {
            predicate: "Fiil cümlesi",
            position: "Kurallı",
            meaning: "Olumlu",
            structure: "Basit",
          },
          proof:
            "Ve yalnız eş özneleri bağlar; tek çekimli yargı ve yan yapısız basit cümle vardır.",
        },
        {
          sentence: "Ece kitap okudu ve Can not aldı.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Ece kitap okudu",
              role: "Birinci temel yargı",
              why: "Öznesi Ece, yüklemi okududur.",
            },
            {
              text: "ve",
              role: "Yargı bağlacı",
              why: "İki temel cümleyi bağlar.",
            },
            {
              text: "Can not aldı.",
              role: "İkinci temel yargı",
              why: "Öznesi Can, yüklemi aldı; ayrı temel yargıdır.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Birinci yargı",
              from: 0,
            },
            {
              to: 2,
              label: "İkinci yargı",
              from: 1,
            },
          ],
          classifications: {
            predicate: "Fiil cümlesi",
            position: "Kurallı",
            meaning: "Olumlu",
            structure: "Bağlı",
          },
          proof:
            "Okudu ve aldı iki temel yargıdır; ve bunları bağladığı için bağlı cümledir.",
        },
      ],
    },
    {
      id: "bag",
      label: "Sıralı → bağlı yargılar",
      frames: [
        {
          sentence: "Ece dosyayı açtı, Can not aldı.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Ece dosyayı açtı,",
              role: "Birinci temel yargı",
              why: "Açtı ilk temel yüklemdir.",
            },
            {
              text: "Can not aldı.",
              role: "İkinci temel yargı",
              why: "Aldı ikinci temel yüklemdir; yargılar virgülle sıralanır.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Bağ",
              from: 0,
            },
          ],
          classifications: {
            predicate: "Fiil cümlesi",
            position: "Kurallı",
            meaning: "Olumlu",
            structure: "Sıralı",
          },
          proof:
            "İki temel yargı virgülle sıralanır; her iki yargının kendi yüklemi sonda ve anlamı olumludur.",
        },
        {
          sentence: "Ece dosyayı açtı ve Can not aldı.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Ece dosyayı açtı",
              role: "Birinci temel yargı",
              why: "Açtı ilk temel yüklemdir.",
            },
            {
              text: "ve",
              role: "Yargı bağlacı",
              why: "İki temel yargıyı bağlar.",
            },
            {
              text: "Can not aldı.",
              role: "İkinci temel yargı",
              why: "Aldı ikinci temel yüklemdir.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Birinci yargı",
              from: 0,
            },
            {
              to: 2,
              label: "İkinci yargı",
              from: 1,
            },
          ],
          classifications: {
            predicate: "Fiil cümlesi",
            position: "Kurallı",
            meaning: "Olumlu",
            structure: "Bağlı",
          },
          proof:
            "Aynı iki temel yargı bu kez ve bağlacıyla bağlanır; MEBİ/OGM tasnifinde bağlıdır.",
        },
      ],
    },
    {
      id: "anlam",
      label: "Olumsuz → olumlu yargı",
      frames: [
        {
          sentence: "Ece bugün gelmedi.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Ece bugün",
              role: "Özne ve zaman",
              why: "Kim ve ne zaman sorularının cevaplarını içerir.",
            },
            {
              text: "gelmedi.",
              role: "Olumsuz fiil yüklemi",
              why: "Gel-me-di, Ece’nin gelmediğini bildirir.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Bağ",
              from: 0,
            },
          ],
          classifications: {
            predicate: "Fiil cümlesi",
            position: "Kurallı",
            meaning: "Olumsuz",
            structure: "Basit",
          },
          proof:
            "Gel-me-di olumsuzluk taşır; tek çekimli fiil sonda ve ayrıca yan yapı yoktur.",
        },
        {
          sentence: "Ece bugün geldi.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Ece bugün",
              role: "Özne ve zaman",
              why: "Özne ve zaman bilgisi korunur.",
            },
            {
              text: "geldi.",
              role: "Olumlu fiil yüklemi",
              why: "Gel-di Ece’nin geldiğini bildirir.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Bağ",
              from: 0,
            },
          ],
          classifications: {
            predicate: "Fiil cümlesi",
            position: "Kurallı",
            meaning: "Olumlu",
            structure: "Basit",
          },
          proof:
            "Olumsuzluk yoktur; tek olumlu çekimli fiil yüklemi sonda, yapı basittir.",
        },
      ],
    },
    {
      id: "istisna",
      label: "Fiilimsi yüklemi → ayrıca yan yapı",
      frames: [
        {
          sentence: "Amacım okumaktır.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Amacım",
              role: "Özne",
              why: "Amaç hakkındaki ad yargısının konusudur.",
            },
            {
              text: "okumaktır.",
              role: "Fiilimsi ve ek fiil yüklemi",
              why: "Oku-mak isim-fiili -tır ile temel yüklemdir; ayrıca yan yapı kurmaz.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Bağ",
              from: 0,
            },
          ],
          classifications: {
            predicate: "İsim cümlesi",
            position: "Kurallı",
            meaning: "Olumlu",
            structure: "Basit",
          },
          proof:
            "OGM sınırına göre tek fiilimsi temel yüklem ise ayrıca yan cümle değildir; basit isim cümlesidir.",
        },
        {
          sentence: "Okuyan öğrencinin amacı okumaktır.",
          context:
            "Bu cümle, dil bilgisi ilişkisini kıyaslamak için yazılmış özgün bir öğretim örneğidir.",
          tokens: [
            {
              text: "Okuyan",
              role: "Fiilimsi yan yapısı",
              why: "Öğrenciyi niteleyen sıfat-fiil, temel yüklem dışındaki yan yapıdır.",
            },
            {
              text: "öğrencinin amacı",
              role: "Özne öbeğinin devamı",
              why: "Okuyan ile birlikte özne öbeğine katılır.",
            },
            {
              text: "okumaktır.",
              role: "Fiilimsi ve ek fiil yüklemi",
              why: "Ad soylu temel yüklem aynı kalmıştır.",
            },
          ],
          focus: 0,
          relations: [
            {
              to: 1,
              label: "Niteleme",
              from: 0,
            },
            {
              to: 2,
              label: "Özne",
              from: 1,
            },
          ],
          classifications: {
            predicate: "İsim cümlesi",
            position: "Kurallı",
            meaning: "Olumlu",
            structure: "Girişik birleşik",
          },
          proof:
            "Okumaktır ad yüklemi korunur; ayrıca okuyan yan yapısı bulunduğu için girişik birleşiktir.",
        },
      ],
    },
  ],
};
export const turkishAxes015: { id: TurkishAxis015; label: string }[] = [
  { id: "predicate", label: "Yüklemin türü" },
  { id: "position", label: "Yüklemin yeri" },
  { id: "meaning", label: "Cümlenin anlamı" },
  { id: "structure", label: "Cümlenin yapısı" },
];
export function turkishCases015(lessonId: string): readonly TurkishCase015[] {
  const cases = authoredCases015[lessonId];
  if (!cases)
    throw new RangeError("Bu öğretim modeli için bilinen bir ünite seçilmeli.");
  return cases;
}
export function buildTurkishScene015(
  lessonId: string,
  caseId: string,
  changed: boolean,
  selected?: number,
  axis: TurkishAxis015 = "structure",
) {
  const cases = turkishCases015(lessonId);
  const pair = cases.find((c) => c.id === caseId);
  if (!pair)
    throw new RangeError("Bu ünite için bilinen bir cümle çifti seçilmeli.");
  const frame = pair.frames[changed ? 1 : 0];
  const index = selected ?? frame.focus;
  if (!Number.isInteger(index) || index < 0 || index >= frame.tokens.length)
    throw new RangeError("Cümlede bulunan bir parça seçilmeli.");
  if (!turkishAxes015.some((a) => a.id === axis))
    throw new RangeError("Bilinen bir inceleme ölçütü seçilmeli.");
  const sentenceKinds = lessonId === "cumle-turleri";
  const kind = sentenceKinds
    ? frame.classifications[axis]!
    : frame.tokens[index].role;
  const options = sentenceKinds
    ? axis === "predicate"
      ? ["İsim cümlesi", "Fiil cümlesi"]
      : axis === "position"
        ? ["Kurallı", "Devrik", "Eksiltili"]
        : axis === "meaning"
          ? ["Olumlu", "Olumsuz", "Soru", "Ünlem"]
          : [
              "Basit",
              "Girişik birleşik",
              "Şartlı birleşik",
              "Ki’li birleşik",
              "İç içe birleşik",
              "Sıralı",
              "Bağlı",
            ]
    : [
        ...new Set(
          cases.flatMap((c) =>
            c.frames.flatMap((f) => f.tokens.map((t) => t.role)),
          ),
        ),
      ];
  return {
    ...frame,
    selected: index,
    target: frame.tokens[index].text,
    kind,
    options,
    reason: sentenceKinds
      ? `${turkishAxes015.find((a) => a.id === axis)!.label}: ${kind}. ${frame.proof}`
      : frame.tokens[index].why,
    evidence: sentenceKinds
      ? frame.tokens.map((t) => `${t.text} — ${t.why}`)
      : [frame.tokens[index].why, frame.proof],
  };
}

export const turkishExplorationDefaults015 = {
  pair: "eylem-adi",
  changed: false,
  selected: -1,
  axis: "structure",
  guess: "",
  reason: "",
  show: false,
  compared: false,
};
