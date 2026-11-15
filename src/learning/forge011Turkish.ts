import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

const section = (title: string, a: string, b: string): GuideSection => ({
  title,
  paragraphs: [a, b],
});
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

export const adverbGuide: LessonGuide = {
  id: "zarflar",
  minutes: 65,
  objectives: [
    "Zarfın doğrudan bağlandığı sözcüğü kanıtla; sıfat ve isimle karıştırma.",
    "Durum, zaman, yer-yön, miktar ve soru zarflarını bağlam içinde ayır.",
    "Çekim eki, derece, fiilimsi ve söz grubu düzeylerini birlikte çözümle.",
    "Aynı sözcüğün yeni cümlede değişen görevini gerekçelendir.",
  ],
  sections: [
    section(
      "İlk iş: sözcüğün bağlandığı yeri bul",
      "Zarf (belirteç), fiilin veya fiilimsinin gerçekleşmesini; ayrıca bir sıfatın ya da başka bir zarfın derecesini belirtebilir. ‘Sakin çocuk konuştu.’ cümlesinde sakin, çocuk adını niteler; sıfattır. ‘Çocuk sakin konuştu.’ cümlesindeyse konuşmanın biçimini belirtir; durum zarfıdır. Bir sözcüğün türü yalnız sözlükteki biçiminden çıkarılmaz.",
      "Hedef sözcükten hangi sözcüğe bağlantı kurduğunu açıkça göster. ‘Duru çok sessiz konuştu.’ sözünde sessiz → konuştu, çok → sessiz ilişkileri vardır. Çok doğrudan konuşan kişinin adına bağlanmaz. Önce yakın anlam ilişkisini kur, sonra tür adını söyle; yalnız ‘nasıl?’ sorusunu her cümleye mekanik biçimde yöneltme.",
    ),
    section(
      "Durum: eylemin gerçekleşme biçimi",
      "Durum zarfı, fiil veya fiilimsinin nasıl gerçekleştiğini bildirir: ‘Özenle çizdi.’, ‘Yavaş yürümek hoşuna gider.’ Özenle çizmenin, yavaş yürümenin biçimidir. Aynı nitelik bir ada bağlanırsa sıfat görevi oluşabilir: yavaş tren. Fiilin yakınında duran her sözcük durum zarfı değildir; nesne ve yer bildiren adlar da fiille ilişki kurar.",
      "Ağır ağır, usul usul gibi ikilemeler de biçim bildirebilir. Elbette, belki, mutlaka gibi sözcükler yargıya kesinlik veya olasılık katar; okul kaynakları bunları geniş durum başlığı altında ele alabilir. Anlam işlevini ayrıca yazmak, tekrar/sıklık bildiren kullanımların farklı kaynaklardaki alt sınıf adlarına takılmadan cümleyi anlamanı sağlar.",
    ),
    section(
      "Zaman: bir ad mı, eylemin zamanı mı?",
      "Zaman zarfları fiilin ne zaman gerçekleştiğini belirtir: ‘Dün görüştük.’, ‘Henüz dönmedi.’ Sıklık bildiren sık sık ve ara sıra gibi öbekler de eylemi zaman yönünden sınırlar. Bir zaman sözcüğünü gördüğünde otomatik zarf deme: ‘Akşamın serinliği hoştu.’ cümlesinde akşam-ın, serinlik adıyla tamlama kuran isimdir.",
      "‘Akşam geldi.’ ile ‘Akşamın erken saatlerinde geldi.’ cümleleri aynı zaman alanından bilgi verebilir. İlkinde akşam doğrudan eyleme bağlanır; ikincisinde bütün ad öbeği zaman bildirir. Sözcük türü sorusu ile cümlenin ögesi sorusu aynı düzey değildir: bütün öbek zarf tümleci olurken içindeki bir sözcük isim veya sıfat olabilir.",
    ),
    section(
      "Yer-yön: yalın yön ve ekli ad",
      "İçeri, dışarı, ileri, geri, aşağı, yukarı, öte, beri; fiil veya fiilimsiye yalın biçimde yön bildirerek bağlandığında yer-yön zarfıdır. ‘Dalgıç aşağı süzüldü.’ cümlesinde aşağı, süzülmenin yönünü belirtir. ‘Aşağı kat boş.’ cümlesindeyse aşağı, kat adını belirttiği için sıfattır. Yön anlamı tek başına sözcük türünü sabitlemez.",
      "‘Aşağıya süzüldü.’ cümlesindeki aşağı-y-a, yönelme eki almış isimdir; aşağı-da biçiminde bulunma eki vardır. Oraya, burada gibi zamir kökenli ekli biçimler de bu yalın yön zarflarıyla aynı sayılmaz. Önce eki ve kökü ayır, sonra bağlandığı yeri bul. ‘Nereye?’ yanıtı almak yön bilgisini gösterir; her yanıtın zarf türünde olduğunu kanıtlamaz.",
    ),
    section(
      "Miktar: fiil, sıfat ve zarfın ölçüsü",
      "Az, çok, pek, daha, gayet, oldukça gibi sözcükler fiilin, fiilimsinin, sıfatın veya başka bir zarfın ölçüsünü bildirebilir: az uyumak, çok çalıştı, pek geniş oda, oldukça yavaş yürüdü. Son örnekte yavaş bir durum zarfı, oldukça onun derecesini belirten miktar zarfıdır. Bağlantıları katman katman çöz.",
      "Miktar anlamlı her sözcük zarf değildir. ‘Az su içti.’ cümlesinde az doğrudan su adının miktarını belirtir; belgisiz sıfattır. ‘Az uyudu.’ cümlesindeyse uyuma eyleminin miktarıdır. ‘Çok az su’ grubunda çok, az sıfatının derecesini artırırken az, su adını belirtir. Aynı grupta iki farklı görev birlikte bulunabilir.",
    ),
    section(
      "Derece ve kapsam: daha, en, kadar",
      "Daha karşılaştırmalı derece; en belirtilen kümedeki üst dereceyi gösterir: daha rahat koltuk, en rahat koltuk. ‘Daha rahat oturdu.’ cümlesinde rahat oturmanın biçimi, daha rahatın derecesidir. En sözcüğünü cümledeki en yakın ada bağlamak yerine derecelenen niteliği bul. Karşılaştırma için söylenmeyen bir ölçüt bulunabilir; sırf daha var diye iki açık kişi adı arama.",
      "‘Ece kadar dikkatli yazdı.’ sözünde kadar bir edattır; Ece kadar öbeği dikkatli oluşunun derecesini karşılaştırır. Öbeğin zarf görevi, kadar sözcüğünün temel türünü tek başına zarf yapmaz. Aynı ayrım sıfat-fiillerde de geçerlidir: ‘Çok düzenli çalışan öğrenci erken ayrıldı.’ cümlesinde çok → düzenli → çalışan → öğrenci zincirini ayrı ayrı oku.",
    ),
    section(
      "Soru zarfları: cevabın türünü dene",
      "Nasıl, ne zaman, niçin, neden, ne kadar gibi kullanımlar fiilin veya fiilimsinin biçim, zaman, neden ya da miktar bilgisini sorabilir. ‘Kutuyu nasıl taşıdın?’ sorusuna dikkatlice yanıtı verilir; nasıl soru zarfıdır. ‘Nasıl bir kutu taşıdın?’ sorusundaysa kutunun niteliği aranır; nasıl soru sıfatıdır. Soru işaretinin varlığı bu ayrımı çözmez.",
      "‘Ne taşıdın?’ sorusunda ne, taşınan varlığın adını karşılar; soru zamiridir. ‘Ne bağırıyorsun?’ cümlesini niçin anlamıyla okuduğumuzda neden soran zarf kullanımı vardır; bu anlam koşulunu açık tut. ‘Geldin mi?’ örneğindeki mi soru parçacığıdır. İç içe soru veya aktarma bulunan her cümlede tek soru sözcüğü bulunacağı biçiminde evrensel bir kural çıkarma.",
    ),
    section(
      "Fiilimsiye bağlanma ve zarf-fiil ayrımı",
      "‘Sessiz konuşan öğrenci dinlendi.’ cümlesinde sessiz, konuşan fiilimsisinin biçimini bildirir; konuşan ise öğrenci adını niteler. Zarflar yalnız çekimli yükleme bağlanmak zorunda değildir. ‘Dışarı çıkmak’ grubunda dışarı, çıkmak eylemsisinin yönünü belirtir. Bir cümlede birden fazla eylem anlamı varsa zarfı en yakındaki yükleme rastgele bağlama.",
      "‘Gülerek anlattı.’ örneğinde gül-erek fiilden kurulmuş zarf-fiildir. ‘Neşeyle anlattı.’ örneğinde benzer biçim bilgisi vardır ama neşe isim köküdür. Zarf görevi, fiilimsi yapısı ve cümle ögesi için ayrı kanıt gerekir. -ce ile biten her sözcüğe zarf-fiil deme; önce fiil kökü ve gerçek fiilimsi ekini göster.",
    ),
    section(
      "Yapı, pekiştirme ve ikileme",
      "Daha gibi basit, azıcık gibi türemiş, biraz gibi birleşik biçimler miktar bildirebilir. Yavaş yavaş gibi ikilemeler ve dümdüz gibi pekiştirmeler, bağlandıkları sözcüğe göre farklı görevlerde kullanılabilir: dümdüz yol / dümdüz yürüdü. Yapı sorusu ile görev sorusunun cevaplarını birbirinin yerine yazma.",
      "Bir sözcüğün uzun olması türemiş olduğunu, iki sözcüklü bir zarf grubunun tek birleşik sözcük olduğunu göstermez. ‘Güneş batınca döndük.’ grubunda zaman anlamını bütün yan yapı verir; bat-ınca fiil kökünden oluşan zarf-fiildir. Bağlamı ve ekleri aynı anda kontrol etmek, yalnız ses benzerliğine dayanan kısa yolları önler.",
    ),
    section(
      "Çözüm yolu: hedef, ilişki, karşı örnek",
      "Önce sorunun tek sözcüğü mü, bütün grubu mu yoksa cümle ögesini mi istediğini belirle. Hedef sözcüğün doğrudan etkilediği sözcüğü yaz; sonra isim, fiil, fiilimsi, sıfat veya zarf bağlantısını denetle. Eylem bilgisi veriyorsa hangi bilgi olduğunu ayır. Ekli yön adlarında sözcüğün türüyle bildirdiği anlamı ayrı tut.",
      "Son adımda yakın yanlışı ele: ‘Az su’ niçin ‘az uyudu’ ile aynı değil, ‘içeriye’ niçin yalın yön zarfı sayılmıyor? Çözümü kapatıp farklı bir cümlede aynı ilişkiyi yeniden kur. Etkileşimli modelde doğru türü seçmenin yanında cümleden kanıt yazman istenir; bu keşif, bağımsız soru çözümünün veya konu tamamlanmasının yerine geçmez.",
    ),
  ],
  examples: [
    example(
      "Bir yer değişikliği, yeni görev",
      "‘Titiz öğrenci çizdi.’ ve ‘Öğrenci titiz çalıştı.’ cümlelerindeki titiz sözcüklerini karşılaştır.",
      "Niteliğin doğrudan taşıyıcısını bul.",
      [
        ["İlk bağ", "Titiz → öğrenci; kişinin niteliği soruluyor."],
        ["İkinci bağ", "Titiz → çalıştı; çalışmanın biçimi soruluyor."],
        [
          "Karar",
          "İlk kullanım sıfat, ikinci kullanım durum zarfıdır; yazılış aynı kalmıştır.",
        ],
      ],
      "Sıfat / durum zarfı.",
      "İlk cümlede titizi kaldırınca öğrencinin, ikincide çalışmanın niteliği eksilir.",
      "Fiilin yakınında olmak tek başına zarf kanıtı değildir.",
    ),
    example(
      "Yön aynı, çekim farklı",
      "‘İleri yürüdü.’ ile ‘İleriye yürüdü.’ cümlelerindeki yön sözcüklerini çöz.",
      "Önce ekleri ayır, sonra görevi belirle.",
      [
        ["Yalın biçim", "İleri doğrudan yürüdü fiiline yön bildirir."],
        ["Ekli biçim", "İleri-y-e: y kaynaştırma, e yönelme durum ekidir."],
        ["Sonuç", "İlk ileri yer-yön zarfı; ikinci ileriye ek almış isimdir."],
      ],
      "Yer-yön zarfı / yönelme ekli isim.",
      "İleriye sözcüğünde yön anlamının sürmesi, çekim ekini yok etmez.",
      "Nereye? sorusuna yanıt veren her biçimi zarf sayma.",
    ),
    example(
      "İki derecelendirme zinciri",
      "‘Mina en geniş kutuyu daha dikkatli açtı.’ cümlesinde en ve daha doğrudan neyi etkiler?",
      "Önce genişin ve dikkatlinin hedefini bul.",
      [
        [
          "Niteleme",
          "Geniş → kutu; geniş sıfattır. En, genişin derecesini belirtir.",
        ],
        [
          "Biçim",
          "Dikkatli → açtı; dikkatli durum zarfıdır. Daha, dikkatlinin derecesini belirtir.",
        ],
        [
          "Kontrol",
          "En ve daha miktar zarflarıdır; doğrudan kutu adına bağlanmazlar.",
        ],
      ],
      "En → geniş; daha → dikkatli.",
      "Derece sözcüklerini kaldırınca temel nitelik/biçim kalır, derecelendirme kaybolur.",
      "Araya birkaç sözcük girmesi gerçek bağlantıyı değiştirmez.",
    ),
    example(
      "Soru sözcüğünü yanıtla çöz",
      "‘Nasıl bir çanta seçtin?’, ‘Çantayı nasıl taşıdın?’ ve ‘Ne taşıdın?’ sorularını çöz.",
      "Her soruya anlamlı kısa yanıt yerleştir.",
      [
        [
          "Adın niteliği",
          "Hafif bir çanta: ilk nasıl, çanta adının niteliğini soran sıfattır.",
        ],
        ["Eylemin biçimi", "Dikkatlice taşıdım: ikinci nasıl soru zarfıdır."],
        [
          "Adın yeri",
          "Bir çanta taşıdım: ne, taşınan varlığın adını karşılayan soru zamiridir.",
        ],
      ],
      "Soru sıfatı / soru zarfı / soru zamiri.",
      "Soru işareti üçünde de vardır; ayrımı beklenen bilginin türü sağlar.",
      "Nasıl sözcüğüne her kullanımda aynı görev verme.",
    ),
    example(
      "Fiilimsi içindeki bağlantı",
      "‘Çok düzenli çalışan ekip erken ayrıldı.’ cümlesinde çok, düzenli, çalışan ve erken sözcüklerinin hedeflerini göster.",
      "İçteki eylem anlamını çekimli yüklemden ayır.",
      [
        [
          "Derece",
          "Çok → düzenli; miktar zarfı, çalışma biçimini derecelendirir.",
        ],
        [
          "İç bağ",
          "Düzenli → çalışan; durum zarfı fiilimsiye bağlanır. Çalışan → ekip; sıfat-fiil adı niteler.",
        ],
        ["Dış bağ", "Erken → ayrıldı; çekimli fiilin zamanını belirtir."],
      ],
      "Çok → düzenli → çalışan → ekip; erken → ayrıldı.",
      "Çalışan fiilimsisini kaldırıp “Çok düzenli ekip erken ayrıldı.” biçimini kurarsan düzenli doğrudan ekip adını niteler; sıfat olur.",
      "Bütün zarfları cümlenin sonundaki yükleme bağlama.",
    ),
  ],
  recall: [
    {
      prompt: "Çok kitap / çok okudu: aynı çok neden farklı görevde?",
      answer:
        "İlkinde açık kitap adının miktarı: sıfat. İkincide okuma eyleminin miktarı: zarf.",
    },
    {
      prompt: "Dışarıya niçin yalın yön zarfı sayılmaz?",
      answer:
        "Dışarı-y-a yönelme durum eki almış isimdir; yön anlamı devam eder.",
    },
    {
      prompt: "Pek yavaş yürüdü zincirini kur.",
      answer: "Pek → yavaş: miktar zarfı. Yavaş → yürüdü: durum zarfı.",
    },
    {
      prompt: "Soru zarfı ile soru zamirini kısa cevapla nasıl ayırırsın?",
      answer:
        "Eylemin biçim/zaman/neden/miktar bilgisi isteniyorsa zarf; varlığın adı yerine cevap geliyorsa zamir.",
    },
    {
      prompt: "Zarf tümleci olan bütün öbekte her sözcük zarf mıdır?",
      answer:
        "Hayır. Akşamın serinliğinde bütün olarak zaman bildirirken akşamın ilgi ekli isimdir.",
    },
  ],
  source:
    "OGM Materyal Video Ders Notu: İsim Soylu Sözcükler, Zarflar (PDF 24–31); Aurelia TYT Türkçe 006 Zarflar kopya kağıdının öğretim, yöntem ve hata onarımı bölümleri. Özgün anlatım, modeller ve sorular; resmî sınav sorusu değildir.",
};

const q = (
  n: number,
  prompt: string,
  options: string[],
  answer: number,
  hint: string,
  explanation: string,
): Question => ({
  id: `f011-adverb-${n}`,
  skill: "zarflar",
  prompt: txt(prompt),
  options: options.map(txt),
  answer,
  hint: txt(hint),
  explanation: txt(explanation),
});
const questions: Question[] = [
  q(
    1,
    "‘Çocuk sakin konuştu.’ cümlesinde sakin sözcüğünün görevi nedir?",
    [
      "Konuşmanın biçimini bildiren durum zarfı",
      "Çocuk adını belirten işaret sıfatı",
      "Konuşan kişinin yerini tutan zamir",
      "Zaman bildiren isim tamlaması",
      "İki yargıyı bağlayan bağlaç",
    ],
    0,
    "Sakin, kişinin adını mı yoksa konuşma biçimini mi doğrudan etkiliyor?",
    "Sakin → konuştu ilişkisi, konuşmanın nasıl gerçekleştiğini bildirir; durum zarfıdır. ‘Sakin çocuk’ olsaydı sıfat olurdu. Burada adın yerini tutma, zaman ilişkisi veya iki yargıyı bağlama yoktur.",
  ),
  q(
    2,
    "‘Yolcu içeri girdi.’ ile ‘Yolcu içeriye girdi.’ cümlelerindeki içeri / içeriye sözcüklerinin türleri sırasıyla hangisidir?",
    [
      "İsim / yer-yön zarfı",
      "Yer-yön zarfı / yönelme ekli isim",
      "İşaret zamiri / soru zamiri",
      "Sıfat / durum zarfı",
      "İki kullanımda da yalın yer-yön zarfı",
    ],
    1,
    "İkinci biçimdeki -y-e parçalarını ayır.",
    "İçeri yalın biçimde girme yönünü belirten yer-yön zarfıdır. İçeri-y-e ise yönelme durum eki almış isimdir. İkinci cümlede de yön bilgisi bulunması ekin sözcük görevine etkisini ortadan kaldırmaz; işaret veya soru anlamı yoktur.",
  ),
  q(
    3,
    "‘Duru pek yavaş yürüdü.’ cümlesinde pek sözcüğü doğrudan hangi sözcüğü, hangi görevle etkiler?",
    [
      "Duru: kişi zamiri",
      "Yürüdü: zaman zarfı",
      "Yavaş sözcüğünü, miktar zarfı göreviyle",
      "Duru: niteleme sıfatı",
      "Yürüdü: yer-yön zarfı",
    ],
    2,
    "Pek kaldırılınca yürüme biçimi mi, bu biçimin derecesi mi değişiyor?",
    "Pek, yavaş zarfının derecesini artırır; miktar zarfıdır. Yavaş yürüdü fiiline biçim bildirir. Dolayısıyla pekin doğrudan hedefi kişi adı veya fiilin zamanı/yönü değildir; iç içe iki bağlantı vardır.",
  ),
  q(
    4,
    "Aşağıdaki cümlelerin hangisinde az sözcüğü zarf görevindedir?",
    [
      "Az şeker ekledim.",
      "Az zaman kaldı.",
      "Az su yeter.",
      "Bu gece az uyudum.",
      "Az para harcadım.",
    ],
    3,
    "Azın doğrudan açık bir adın miktarını belirtmediği kullanımı bul.",
    "Az uyudum sözünde az, uyuma eyleminin miktarını belirtir; miktar zarfıdır. Diğer cümlelerde şeker, zaman, su ve para açık adlarının miktarını belirterek sıfat görevi üstlenir. Miktar anlamının bulunması tek başına zarf kanıtı değildir.",
  ),
  q(
    5,
    "Aşağıdaki soruların hangisindeki soru sözcüğü eylemin gerçekleşme biçimini soran bir zarftır?",
    [
      "Hangi kitabı seçtin?",
      "Kimi aradın?",
      "Kaç kalem aldın?",
      "Nasıl bir oda istiyorsun?",
      "Dosyayı nasıl düzenledin?",
    ],
    4,
    "Dikkatlice yanıtı hangi sorudaki hedef sözcüğün yerini anlamca doldurur?",
    "Dosyayı nasıl düzenledin sorusunda nasıl, düzenleme biçimini ister; soru zarfıdır. Hangi, kaç ve nasıl bir oda kullanımları açık adı belirtir. Kimi ise aranan kişinin adının yerine geçer; soru zamiridir.",
  ),
  q(
    6,
    "‘Akşamın serinliğinde yürüdük.’ cümlesindeki akşamın sözcüğü ile akşamın serinliğinde öbeği için hangi açıklama doğrudur?",
    [
      "Akşamın ilgi ekli isimdir; bütün öbek yürümenin zamanını bildirir.",
      "Akşamın yalın yer-yön zarfıdır; öbek yön bildirir.",
      "Öbekteki her sözcük tek başına zaman zarfıdır.",
      "Akşamın, yürüdük yerine geçen kişi zamiridir.",
      "Bütün öbek yalnız çoğul eki aldığı için sıfattır.",
    ],
    0,
    "Tek sözcüğün eki ile bütün öbeğin görevini ayrı incele.",
    "Akşam-ın ilgi eki alarak serinlik adıyla tamlama kurar; isimdir. Akşamın serinliğinde bütün olarak yürüme zamanını belirtir. Bütünün zarf tümleci olması içindeki her sözcüğü zarf yapmaz; yön, zamir veya çoğul yapısı söz konusu değildir.",
  ),
  q(
    7,
    "‘Çok düzenli çalışan ekip erken ayrıldı.’ cümlesinde düzenli sözcüğü doğrudan hangi sözcüğe bağlanır?",
    [
      "Ekip: niteleme sıfatı olarak",
      "Çalışan: çalışma biçimini belirten durum zarfı olarak",
      "Ayrıldı: yer-yön zarfı olarak",
      "Çok: zaman zarfı olarak",
      "Erken: ismin yerini tutan zamir olarak",
    ],
    1,
    "Cümlede ayrılmadan başka hangi eylem anlamı var?",
    "Düzenli, çalışan fiilimsisinin anlattığı çalışma biçimini belirtir; durum zarfıdır. Çalışan ise ekip adını niteler. Erken ayrılmanın zamanına, çok düzenlinin derecesine bağlanır. Bütün sözcükleri yalnız çekimli yükleme bağlamak bu katmanları siler.",
  ),
  q(
    8,
    "‘Mina en geniş kutuyu dikkatle açtı.’ cümlesinde en sözcüğünün doğrudan hedefi hangisidir?",
    [
      "Mina kişi adı",
      "Kutuyu nesnesinin türü",
      "Geniş sıfatının derecesi",
      "Açtı fiilinin zamanı",
      "Dikkatle zarfının yönü",
    ],
    2,
    "Eni kaldırınca kutunun genişliği mi, bu niteliğin üst derecesi mi kaybolur?",
    "En → geniş ilişkisi, kutuyu niteleyen sıfatın üst derecesini belirtir; en miktar zarfıdır. Kutunun adını doğrudan belirten yeni bir sıfat veya açma zamanını bildiren zarf değildir. Dikkatle ayrı olarak açma biçimini anlatır.",
  ),
  q(
    9,
    "‘Gülerek anlattı.’ ile ‘Neşeyle anlattı.’ cümlelerinde anlatma biçimini bildiren parçalar için hangi yargı doğrudur?",
    [
      "İkisi de mutlaka isim kökünden türemiştir.",
      "İkisinde de fiilimsi yoktur.",
      "Neşeyle, neşe-erek biçimindeki zarf-fiildir.",
      "Gülerek fiil kökü ve -erek ile kurulmuş zarf-fiildir; neşeyle isim kökenlidir.",
      "Biçim bildirdikleri için ikisi de niteleme sıfatıdır.",
    ],
    3,
    "Gül- eylemi ile neşe adını birbirinden ayır.",
    "Gül-erek fiil kökünden oluşmuş zarf-fiildir. Neşe-yle ise isim kökenli bir yapıdır; aynı biçim bilgisini vermesi onu fiilden türemiş yapmaz. İki kullanım da anlatma eylemini açıklar; isim niteleyen sıfat olmaları gerekmez.",
  ),
  q(
    10,
    "‘Ne bağırıyorsun?’ sorusu bu bağlamda açıkça ‘Niçin bağırıyorsun?’ anlamıyla söylenmiştir. Ne sözcüğünün görevi nedir?",
    [
      "Bağırılan nesnenin yerini tutan soru zamiri",
      "Açık bir adı niteleyen soru sıfatı",
      "Yalın yer-yön zarfı",
      "İki cümleyi bağlayan bağlaç",
      "Bağırmanın nedenini soran soru zarfı",
    ],
    4,
    "Kökte verilen niçin anlamını koruyarak kısa bir neden cevabı kur.",
    "Bağlam, ne sözcüğünü niçin anlamıyla sınırlandırmıştır; eylemin nedenini arayan soru zarfıdır. Bir nesnenin adını sormaz ve açık bir adın niteliğini belirtmez. Başka bir cümlede ne zamir veya sıfat olabilir; burada verilen anlamı esas almak gerekir.",
  ),
];
export const forge011TurkishGuides = [adverbGuide];
export const forge011TurkishTopics: Record<string, string> = {
  zarflar: "detail-255",
};
export const forge011TurkishLessons: Lesson[] = [
  {
    id: adverbGuide.id,
    subjectId: "tyt-turkce",
    title: txt("Zarflar: sözcükten sözcüğe anlam bağlantıları"),
    minutes: adverbGuide.minutes,
    objectives: adverbGuide.objectives.map(txt),
    body: adverbGuide.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions,
    source: txt(adverbGuide.source),
    tags: ["kaynakli-anlatim", "adim-adim", "sozcuk-turleri"],
  },
];

export const adverbFamilies = [
  { id: "manner", label: "Durum ve sıfat" },
  { id: "degree", label: "Derece ve ad miktarı" },
  { id: "direction", label: "Yön ve çekim eki" },
  { id: "time", label: "Zaman ve isim" },
  { id: "question", label: "Soru ve hedef" },
  { id: "nonfinite", label: "Fiilimsiye bağlanma" },
] as const;
export type AdverbFamily = (typeof adverbFamilies)[number]["id"];
export const adverbKinds = [
  "Durum zarfı",
  "Zaman zarfı",
  "Yer-yön zarfı",
  "Miktar zarfı",
  "Soru zarfı",
  "Sıfat",
  "İsim",
] as const;
export interface AdverbScene {
  words: string[];
  target: number;
  head: number;
  kind: (typeof adverbKinds)[number];
  reason: string;
  link: string;
}
const scenes: Record<AdverbFamily, [AdverbScene, AdverbScene]> = {
  manner: [
    {
      words: ["Çocuk", "sakin", "konuştu."],
      target: 1,
      head: 2,
      kind: "Durum zarfı",
      link: "sakin → konuştu",
      reason:
        "Sakin, konuşmanın biçimini belirtir; doğrudan çocuk adını nitelemez.",
    },
    {
      words: ["Sakin", "çocuk", "konuştu."],
      target: 0,
      head: 1,
      kind: "Sıfat",
      link: "sakin → çocuk",
      reason:
        "Sakin doğrudan açık çocuk adını niteler; bu kullanımda sıfattır.",
    },
  ],
  degree: [
    {
      words: ["Duru", "çok", "sessiz", "konuştu."],
      target: 1,
      head: 2,
      kind: "Miktar zarfı",
      link: "çok → sessiz → konuştu",
      reason:
        "Çok, sessiz durum zarfının derecesini artırır. Sessiz ise konuşma biçimine bağlanır.",
    },
    {
      words: ["Duru", "çok", "kitap", "okudu."],
      target: 1,
      head: 2,
      kind: "Sıfat",
      link: "çok → kitap",
      reason:
        "Çok doğrudan kitap adının miktarını belirtir; bu kullanımda belgisiz sıfattır.",
    },
  ],
  direction: [
    {
      words: ["İçeri", "girdi."],
      target: 0,
      head: 1,
      kind: "Yer-yön zarfı",
      link: "içeri → girdi",
      reason: "Yalın içeri, girmenin yönünü belirtir; isim çekim eki yoktur.",
    },
    {
      words: ["İçeriye", "girdi."],
      target: 0,
      head: 1,
      kind: "İsim",
      link: "içeri-y-e → girdi",
      reason:
        "İçeri-y-e yönelme durum eki almış isimdir. Yön anlamı sürer, sözcük türü yalın yön zarfı değildir.",
    },
  ],
  time: [
    {
      words: ["Akşam", "geldik."],
      target: 0,
      head: 1,
      kind: "Zaman zarfı",
      link: "akşam → geldik",
      reason:
        "Akşam doğrudan gelmenin zamanını belirtir; burada zaman zarfıdır.",
    },
    {
      words: ["Akşamın", "serinliği", "hoştu."],
      target: 0,
      head: 1,
      kind: "İsim",
      link: "akşam-ın → serinlik-i",
      reason:
        "Akşam-ın ilgi eki almış isimdir; serinlik adıyla isim tamlaması kurar.",
    },
  ],
  question: [
    {
      words: ["Çantayı", "nasıl", "taşıdın?"],
      target: 1,
      head: 2,
      kind: "Soru zarfı",
      link: "nasıl → taşıdın",
      reason:
        "Dikkatlice gibi bir yanıt taşımanın biçimini açıklar; nasıl soru zarfıdır.",
    },
    {
      words: ["Nasıl", "bir", "çanta", "seçtin?"],
      target: 0,
      head: 2,
      kind: "Sıfat",
      link: "nasıl → çanta",
      reason:
        "Hafif bir çanta gibi yanıt adın niteliğini verir; nasıl soru sıfatıdır.",
    },
  ],
  nonfinite: [
    {
      words: ["Titiz", "çalışan", "öğrenci", "dinlendi."],
      target: 0,
      head: 1,
      kind: "Durum zarfı",
      link: "titiz → çalışan → öğrenci",
      reason:
        "Titiz, çalışan fiilimsisinin anlattığı çalışma biçimini belirtir; çalışan da öğrenci adını niteler.",
    },
    {
      words: ["Titiz", "öğrenci", "dinlendi."],
      target: 0,
      head: 1,
      kind: "Sıfat",
      link: "titiz → öğrenci",
      reason:
        "Çalışan fiilimsisi kaldırılınca titiz doğrudan öğrenci adını niteler; sıfat görevi oluşur.",
    },
  ],
};
export function buildAdverbScene(
  family: AdverbFamily,
  altered: boolean,
): AdverbScene {
  if (!(family in scenes)) throw new RangeError("ADVERB_FAMILY");
  return scenes[family][altered ? 1 : 0];
}
