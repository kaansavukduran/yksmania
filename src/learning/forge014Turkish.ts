import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

export const ekFiilGuide: LessonGuide = {
  id: "ek-fiil",
  minutes: 55,
  objectives: [
    "Hedef sözün ad soylu tabanını, fiil tabanını ve cümledeki görevini ayır.",
    "Ek fiilin geçmiş, rivayet, şart ve geniş zaman biçimlerini kişiyle birlikte çözümle.",
    "Birleşik çekimi, birleşik fiil yapısından ve fiil türetiminden ayır.",
    "Olumsuzluk, soru, bildirme ve tahmin anlamını verilen bağlamla denetle.",
  ],
  sections: [
    {
      title: "Önce yargıyı ve tabanı bul",
      paragraphs: [
        "Ek fiil, ad soylu bir sözü yargı bildiren biçime getirir veya zaten çekimlenmiş fiile hikâye, rivayet ya da şart katmanı ekler. “Görevli yorgundu.” sözünde taban yorgun sıfatıdır; yorgun + idi bir durum hakkında geçmiş yargısı kurar. Bu işlem yorgun sözcüğünden yeni bir sözlük fiili türetmez. Yüklemin sonundaki ekten önce hangi tabanın bulunduğunu belirlemek gerekir.",
        "“Görevli yoruldu.” ise yorul- fiilinin görülen geçmiş çekimidir; iki yüklemin geçmiş anlamı taşıması yapılarını aynı yapmaz. “Sınıf sessizdi.” ile “Sınıf sessizleşti.” arasında da ayrım vardır: ilkinde ad soylu yüklem ve ek fiil, ikincisinde -leş yapım ekiyle oluşan fiil bulunur. Tabanı bul, ad mı fiil mi olduğunu söyle, sonra çekim katmanlarını ayır.",
      ],
    },
    {
      title: "Geniş zamanda her parça görünmez",
      paragraphs: [
        "Ad soylu yüklemin geniş zamanında “Ben hazırım, sen hazırsın, o hazır, biz hazırız, siz hazırsınız, onlar hazırlar.” gibi biçimler kullanılır. Üçüncü tekilde “O hazırdır.” da denebilir; -dır çoğu cümlede söylenmez. Açık -dır bulunmaması isim cümlesinin yargısız olduğu anlamına gelmez. Kişiyi özne ve yüklemin biçimi birlikte gösterir; “Ben hazır.” bu standart çekimin karşılığı değildir.",
        "Benzer görünen her son eki aynı görevde sayma. “Ben öğretmenim.” cümlesinde -im kişi bildirirken “Öğretmenim geldi.” sözündeki öğretmenim, benim öğretmenim anlamında iyeliklidir; yüklem geldi fiilidir. Cümlede görev ve tam anlam verilmeden bu iki kullanım ayırt edilemez. Üçüncü çoğul örneklerinde -lar kişiyi gösterebilir; her çokluk ekini otomatik ek fiil diye adlandırma. Tablodaki onlar biçimleri, çoğul kişi işaretinin açıkça kullanıldığı çekimlerdir; uygun bağlamda “Onlar hazırdı.” gibi yüklemde çoğul eki bulunmayan kullanım da mümkündür. Sırf -lar görünmedi diye üçüncü tekil özne uydurma; açık özneyi ve uyumu birlikte değerlendir.",
      ],
      table: {
        headers: ["Taban", "Geniş zaman", "Geçmiş", "Rivayet", "Şart"],
        rows: [
          ["hazır / ben", "hazırım", "hazırdım", "hazırmışım", "hazırsam"],
          ["hazır / sen", "hazırsın", "hazırdın", "hazırmışsın", "hazırsan"],
          ["hazır / o", "hazır / hazırdır", "hazırdı", "hazırmış", "hazırsa"],
          ["hazır / biz", "hazırız", "hazırdık", "hazırmışız", "hazırsak"],
          ["hazır / siz", "hazırsınız", "hazırdınız", "hazırmışsınız", "hazırsanız"],
          ["hazır / onlar", "hazırlar", "hazırdılar", "hazırmışlar", "hazırsalar"],
        ],
      },
    },
    {
      title: "İdi ve imiş: biçimi bağlamdan ayır",
      paragraphs: [
        "İdi, ad soylu sözde geçmiş bir durumu kurar: “Geçen hafta nöbetçi bendim.” İmiş, dolaylı aktarım, sonradan fark etme veya çıkarım gibi anlamlarla kullanılabilir: “Anlatılanlara göre eski bina kütüphaneymiş.” Bu ikinci cümlede eski bina hakkındaki bilgi dolaylıdır. Yalnız imiş biçiminden bilginin mutlaka bir başkasının ağzından duyulduğu ya da olayın kesin hangi tarihte olduğu çıkarılamaz.",
        "“Anahtar cebimdeymiş!” sözü, konuşanın yeni fark ettiği bir durumu anlatabilir; bir haberci zorunlu değildir. Okul dil bilgisinde ad yüklemindeki imiş, ek fiilin duyulan geçmiş zamanı adıyla öğretilir; bu biçim adını her bağlamda aynı bilgi edinme yolu ve takvim zamanı sanma. Soruda “duydum, fark ettim, dün, şimdi” gibi belirtilen bağlamı, ekin biçimsel sınıflandırmasından ayrı bir satırda değerlendir.",
      ],
    },
    {
      title: "İse bir koşul kurar; ana yargıyı da gör",
      paragraphs: [
        "“Hava açıksa yürüyüşe çıkabiliriz.” sözünde açık ad soyludur; açık + ise → açıksa koşul ilişkisi kurar. Ana cümlenin yüklemi çıkabilirizdir; açıksa, bu ana yargının bağlı olduğu koşulu belirtir. Bu nedenle ek fiilin her biçimi tek başına bağımsız bir ana yargı kuruyor gibi davranma. Şart cümlesinde hedef sözü ve bütün cümlenin ana yüklemini ayrı işaretlemek daha güvenlidir.",
        "“Sen geliyorsan ben bekleyeyim.” cümlesindeki gel- fiili önce şimdiki zamanla, sonra ise ile çekimlenmiştir: gel-iyor-sa-n. Burada şimdiki zamanın şartı vardır. “Sen gelirsen beklerim.” sözünde de geniş zamanın şartı bulunur; “gelsen” ise doğrudan fiilin dilek-şart çekimi olabilir. Görülen her -sa/-se için otomatik “ek fiil” deme; öncesinde ad soylu taban mı, ilk kip mi, doğrudan fiil kökü mü var kontrol et.",
      ],
    },
    {
      title: "İlk kip ile ikinci katmanı sıraya koy",
      paragraphs: [
        "“Okuyordu” oku-yor-idi biçiminde şimdiki zamanın hikâyesi; “okuyacakmış” oku-yacak-imiş biçiminde gelecek zamanın rivayeti; “okuyacaksa” oku-yacak-ise biçiminde gelecek zamanın şartıdır. Ünlü düşmesi ve uyum yüzünden idi, imiş, ise her zaman ayrı bir sözcük gibi görünmez. İlk kipten sonra ek fiilin hikâye, rivayet veya şart katmanı bulunması birleşik çekim oluşturur. Çoğul kişilerde de aynı sıra korunur: gel-iyor-du-k, gel-iyor-muş-sunuz, gel-iyor-sa-lar. Kişi değişince ilk kip ile ek fiilin görevi değişmez; ses uyumunu ve kişi dizisini ayrıca denetle.",
        "“Beklemişti” sözünde -miş ilk kip, -ti ise idi ek fiilinin hikâye biçimidir; iki katmana ayrı görev ver. “Okuyuverdi” ise oku- ile tezlik bildiren ver- yardımcı fiilinden oluşan bir fiil yapısına geçmiş zaman eklenmesidir. Birleşik fiil yapısı ile birleşik çekim iki ayrı incelemedir. “Okuyuvermişti” örneğinde bu iki özellik birlikte de bulunabilir; birinin varlığı diğerini dışlamaz.",
      ],
    },
    {
      title: "Dır tek başına ikinci zaman yapmaz",
      paragraphs: [
        "Bildirme eki -dır/-dir/-dur/-dür ve sert ünsüzden sonra -tır/-tir/-tur/-tür, ad soylu yüklemde kullanılabilir: “Bu işin sorumlusu müdürdür.” Çekimli fiilin ardından da gelir: “Rapor yarın açıklanacaktır.” Ancak -dır eklenmesi, okul dil bilgisindeki hikâye/rivayet/şart türünden birleşik çekimle aynı şey değildir. “Geliyordur” biçiminde iki zaman var diye yalnız ek sayısına göre karar verilmez.",
        "Anlamı bağlam belirler. “Şimdi evde çalışıyordur; kontrol etmedim, tahmin ediyorum.” cümlesinde tahmin vardır. Bir kurum duyurusundaki kesin bildirim farklı bağlamdır. Ek, konuşanın bildirime tutumunu gösterebilir; gerçek dünyanın değişmez garantisini vermez. “-dır her zaman kesinliktir” ve “-dır her durumda ikinci zaman ekidir” genellemeleri bu nedenle güvenilir değildir.",
      ],
    },
    {
      title: "Olumsuzluk, soru ve ses değişimini birlikte çöz",
      paragraphs: [
        "Ad soylu yüklem genellikle değil ile olumsuz yapılır: hazırdı → hazır değildi; fiil ise kendi olumsuzluk ekini alır: geliyordu → gelmiyordu. Hazır değildi biçiminde geçmiş katmanı değil üzerinde görünür, fakat bütün yüklem ad soylu olumsuz yargıdır. “Değil gördüm, ek fiil yok.” demek de “Her -ma isim yükleminin olumsuzudur.” demek de yanlıştır; önce tabanın türünü belirle.",
        "Soru edatı ayrı yazılır, ardından gelen ekler ona bağlanabilir: “Hazır mıydın?”, “Yorgun muymuşsun?” ve “İyi misin?” doğrudur. İdi ayrı da yazılabilir: iyi idi → iyiydi, hasta idi → hastaydı. Bitişmede i düşer; iki ünlü arasında y görülebilir, ekler ünlü ve ünsüz uyumuna uyar: dürüst idi → dürüsttü. Yazılı ayırma işaretiyle yaptığımız çözümleme, bütün ekleri gerçek yazıda ayrı yazma önerisi değildir. Ek fiil, -ken ile de zarf görevli yapı kurar: “Hasta iken dinlendi.” → “Hastayken dinlendi.” Burada hasta ad soyludur; -ken bağımsız bir ana yargı veya yeni bir fiil kökü oluşturmaz. “Yürürken durdu.” ise fiil tabanlı zarf-fiildir. Bu sınır, OGM’nin fiilimsiler bölümünde ayrıca belirtilir; aynı son ses her yerde aynı tür demek değildir.",
      ],
    },
    {
      title: "Kararı dört denetimle ver; desteği azalt",
      paragraphs: [
        "Önce tam cümlede hedef sözü ve ana yüklemi belirle. İkinci olarak hedefin tabanını ad soylu veya fiil diye ayır. Üçüncü adımda olumsuzluk, ilk kip, ek fiil ve kişiyi sırayla göster; görünmeyen bir ek için cümlenin kişi ve yargı bilgisini kullan. Son adımda biçim adını bağlamdaki zaman ve kesinlik anlamından ayır. Böylece aynı -mış yüzeyini her yerde tek görevde saymazsın.",
        "İlk örneği parçalar açıkken incele; sonra yalnız cümleye bakıp sınıflandırmanı ve gerekçeni yaz. Koşulu değiştir: hazırım yerine geliyorum, geliyordum yerine geliyordur kullanıldığında hangi katmanın değiştiğini açıkla. Modelin verdiği yanıtla gerekçeni kendin karşılaştır; yalnız aynı etiketi seçmek gerekçenin doğruluğunu kanıtlamaz. Bu keşif öğrenme puanı üretmez; bağımsız sorular ve gerçek çalışma kayıtları ayrıdır.",
      ],
    },
  ],
  examples: [
    {
      title: "Aynı geçmiş, farklı taban",
      prompt:
        "“Dünkü toplantıda ekip hazırdı.” ve “Ekip toplantı için hazırlandı.” yüklemlerinde ek fiil mi, fiil türetimi mi vardır?",
      strategy: "Geçmiş anlamından önce yüklemin tabanını bul.",
      steps: [
        {
          label: "Tabanı ayır",
          explanation:
            "Hazır, ad soylu bir durum bildiren sözdür. Hazırlan- ise hazırla- fiilinden oluşmuş fiil tabanıdır.",
        },
        {
          label: "Çekimi göster",
          explanation:
            "Hazır + idi → hazırdı; hazırlan-dı biçimindeki -dı ise fiilin ilk görülen geçmiş zaman ekidir.",
        },
        {
          label: "Kararı denetle",
          explanation:
            "Hazır değildi diyerek ilkini ad soylu olumsuz yapabiliriz; hazırlanmadı ikincisinin fiil olumsuzudur.",
        },
      ],
      answer:
        "Hazırdı ad soylu yüklem ve ek fiildir; hazırlandı türemiş fiilin görülen geçmiş çekimidir.",
      check:
        "Her geçmiş anlamlı -dı biçimini ek fiil saymadık; öncesindeki tabanı kontrol ettik.",
      pitfall:
        "Benzer son seslerden hareketle iki yüklemi de aynı yapı kabul etmek.",
    },
    {
      title: "Yapı ve çekim iki ayrı soru",
      prompt:
        "“Dün bu kitabı okuyacaktı.”, “Kitabı hızla okuyuverdi.” ve “Kitabı çoktan okuyuvermişti.” yüklemlerini yapı ve çekim bakımından karşılaştır.",
      strategy: "Önce fiil tabanını, sonra ilk kip ve ek fiili işaretle.",
      steps: [
        {
          label: "İlk yüklem",
          explanation:
            "Oku-yacak-tı: gelecek zamanın ardından idi ek fiili vardır; gelecek zamanın hikâyesidir.",
        },
        {
          label: "İkinci yüklem",
          explanation:
            "Oku-yu-ver-di: tezlik anlamlı kurallı birleşik fiil tabanına tek geçmiş kip eklenmiştir. Birleşik yapı vardır, birleşik çekim yoktur.",
        },
        {
          label: "İkisini birleştir",
          explanation:
            "Oku-yu-ver-miş-ti biçiminde kurallı birleşik taban ile öğrenilen geçmişin hikâyesi birlikte bulunur.",
        },
      ],
      answer:
        "Birincide birleşik çekim, ikincide birleşik fiil yapısı, üçüncüde her ikisi vardır.",
      check:
        "Birleşik sözcüğünün ardından yapı mı çekim mi sorulduğunu tekrar oku.",
      pitfall:
        "Birden fazla fiil veya ek görünmesini tek bir birleşiklik türüne indirgemek.",
    },
    {
      title: "Tahmin, rivayetle aynı katman değildir",
      prompt:
        "A: “Nöbetçinin anlattığına göre Deniz şimdi arşivde çalışıyormuş.” B: “Deniz şimdi arşivde çalışıyordur; yerini kontrol etmedim, yalnız tahmin ediyorum.” İki yüklemin son katmanını karşılaştır.",
      strategy: "Tam bağlamı kullan; yalnız ses benzerliğinden anlam çıkarma.",
      steps: [
        {
          label: "A biçimi",
          explanation:
            "Çalış-ıyor-muş, şimdiki zamanın rivayetidir; bu cümlede bilgi aktarımı bağlamda açıkça belirtilmiştir.",
        },
        {
          label: "B biçimi",
          explanation:
            "Çalış-ıyor-dur sözündeki -dır, bu bağlamda tahmin bildirir; hikâye, rivayet veya şart ek fiili değildir.",
        },
        {
          label: "Kesinliği sınırla",
          explanation:
            "İki cümle de tek başına Deniz'in gerçek konumunu bağımsız kanıtlamaz. Biçim sınıflandırması ile bilginin doğruluğu farklıdır.",
        },
      ],
      answer:
        "A birleşik çekimli rivayet; B, tahmin bildiren -dır taşıyan şimdiki zaman çekimidir.",
      check:
        "İkinci cümleye imiş eklenmedi; tahmin anlamı birleşik çekim kanıtı sayılmadı.",
      pitfall:
        "Her dolaylı bilgiyi aynı çekim türü, her -dır biçimini kesin gerçek saymak.",
    },
    {
      title: "Soru ve şart içinde ad soylu taban",
      prompt:
        "“Az önce hazır değil miydin? Şimdi hazırsan toplantıya başlayalım.” sözünde hedef biçimler nasıl kurulur?",
      strategy: "Olumsuzluk, soru ve koşulu ayrı görevler olarak izle.",
      steps: [
        {
          label: "Olumsuz taban",
          explanation:
            "Hazır değil, ad soylu yüklemin olumsuzudur; hazır sözü fiile dönüşmez.",
        },
        {
          label: "Soru çekimi",
          explanation:
            "Mi-y-di-n biçiminde soru edatına ek fiilin geçmişi ve ikinci tekil kişi bağlanır. Mi önceki sözden ayrı yazılır.",
        },
        {
          label: "Koşul yargısı",
          explanation:
            "Hazır-sa-n = hazır + ise + sen. Ana yüklem başlayalımdır; hazırsan onun koşulunu kurar.",
        },
      ],
      answer:
        "İlk hedef ad soylu olumsuz soru ve geçmiş; ikinci hedef ek fiilin şartıyla kurulan ad soylu koşuldur.",
      check:
        "Şart biçimini tek başına ana yüklem diye sunmadık; bütün cümledeki başlayalım yargısını da bulduk.",
      pitfall:
        "Soru edatını bitişik yazmak veya her -sa biçimini doğrudan fiilin dilek-şart eki saymak.",
    },
  ],
  recall: [
    {
      prompt:
        "“Ben öğrenciyim.” ile “Öğrencim konuştu.” sözlerinde -im/-yim niçin aynı görevde değildir?",
      answer:
        "Birincide öğrenci ad soylu yüklemdir ve kişi bildirir; ikincide öğrencim, benim öğrencim anlamında iyeliklidir. İkinci cümlenin yüklemi konuştu fiilidir.",
    },
    {
      prompt:
        "“Gelmişti” sözündeki iki kip katmanını hangi sırayla adlandırırsın?",
      answer:
        "Gel- fiiline ilk olarak -miş öğrenilen geçmiş, sonra idi ek fiilinin -ti hikâye biçimi gelir: öğrenilen geçmişin hikâyesi. İlk -miş ek fiilin kendisi değildir.",
    },
    {
      prompt:
        "“Uygunsa deneyelim.” sözündeki hedef uygun-sa ile “gelse” sözü arasında hangi taban farkı vardır?",
      answer:
        "Uygun ad soyludur ve ise ek fiiliyle koşul kurar. Gelse, gel- fiilinin doğrudan dilek-şart çekimi olabilir. Aynı -sa/-se yüzeyi tek görev kanıtı değildir.",
    },
    {
      prompt:
        "“Çalışıyordur; tahmin ediyorum.” sözü niçin yalnız -dır nedeniyle birleşik çekim sayılmaz?",
      answer:
        "Bu -dır tahmin/bildirme katmanıdır; hikâye, rivayet veya şart biçimlerinden biri değildir. Anlam tahmindir, ama tahmin anlamı kendi başına birleşik zaman kurmaz.",
    },
  ],
  source:
    "OGM TYT Türkçe Video Ders Notu — Fiiller, PDF 10–15 ve -ken sınırı için 28; Aurelia TYT Türkçe Fiiller kopya kağıdı, PDF 3, 5, 8–10; ayrıca canlı klasörde bulunan Ek Fiil kopya kâğıdı, PDF 1–7 ve MEBİ TYT Türkçe Konu Özetleri, PDF 103–104 ile karşılaştırılan özgün öğretim. OGM'nin yalnız Örnekler başlığı bulunan sayfaları çözümlü örnek kaynağı sayılmadı. Sorular ve çözümler YKSMania için özgün yazılmıştır; resmî sınav sorusu değildir.",
};

function question(
  n: number,
  prompt: string,
  options: string[],
  answer: number,
  hint: string,
  explanation: string,
  passage?: string,
): Question {
  return {
    id: `f014-ek-fiil-${n}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(explanation),
    skill: "ek-fiil",
    ...(passage ? { passage: txt(passage) } : {}),
  };
}
const questions: Question[] = [
  question(
    1,
    "“Geçen yıl bu okulda öğrenciydim.” cümlesinin öğrenciydim yüklemi için doğru çözümleme hangisidir?",
    [
      "Öğrenci ad soylu tabanına idi ek fiili ve birinci tekil kişi bağlanmıştır.",
      "Öğrenci- bir fiil köküdür ve yalnız şimdiki zamanla çekimlenmiştir.",
      "-ydi yeni bir fiil türeten yapım ekidir.",
      "Yüklem ikinci çoğul kişiyle çekimlenmiştir.",
      "Sözcük yalnız bir iyelik tamlamasıdır; cümlede yargı kurmaz.",
    ],
    0,
    "Önce öğrenci sözünün türünü, sonra ben öznesine uyan son sesi düşün.",
    "Öğrenci bir addır. Öğrenci + idi + m → öğrenciydim biçiminde ek fiilin geçmişi ve ben kişisi vardır. -y- ünlüler arasındaki ses bağlantısında görülür. Öğrenci fiile türetilmemiş, ad soylu yüklem kurulmuştur.",
  ),
  question(
    2,
    "Bir kişi kamptaki görevini “Ben bu ekibin rehberiyim.” diye açıklıyor. Rehberiyim yüklemi hakkında hangi yargı doğrudur?",
    [
      "-dır yazılmadığı için yüklemde yargı yoktur.",
      "Ad soylu yüklem geniş zamanda birinci tekil kişiyi gösterir; açık -dır zorunlu değildir.",
      "Rehber sözcüğü -yim ile fiil köküne dönüşmüştür.",
      "Sözcük yalnız üçüncü çoğul kişinin geçmiş çekimidir.",
      "Rehberiyim sözü ana cümlede bir sıfat-fiildir.",
    ],
    1,
    "Kim rehber? Ben. Hedef sözün cümlede yargıyı kurup kurmadığını denetle.",
    "Rehber ad soyludur; rehberiyim yüklemi ben kişisinde geniş zaman yargısı kurar. Bu kullanımda -dır ekini görünür biçimde aramak gerekmez. Ek fiil çekimi, yeni bir fiil kökü türetme veya sıfat-fiil yapma değildir.",
  ),
  question(
    3,
    "A: “Dün bu kitabı okuyacaktı.” B: “Kitabı bir solukta okuyuverdi.” Okuyacaktı ve okuyuverdi arasındaki ayrımı doğru veren seçenek hangisidir?",
    [
      "İkisinde de yalnız isim yüklemi vardır.",
      "İkisinde de ek fiilin şartı bulunur.",
      "A'da gelecek zamanın hikâyesi olan birleşik çekim; B'de tezlik bildiren birleşik fiil yapısı vardır.",
      "A'da tezlik yapısı; B'de gelecek zamanın rivayeti vardır.",
      "Fiilde birden fazla ek varsa yapı ve çekim ayrımı yapılamaz.",
    ],
    2,
    "İlkinde -acak ardından idi; ikincisinde oku- ve ver- taban ilişkisini ara.",
    "Oku-yacak-tı biçiminde ilk gelecek kipini idi ek fiili izler. Oku-yu-ver-di ise tezlik anlamlı kurallı birleşik tabanın tek görülen geçmiş çekimidir. Birleşik yapı ile birleşik çekim farklı ölçütlerdir; yalnız ek sayısı karar verdirmez.",
  ),
  question(
    4,
    "Aşağıdaki cümlede çalışıyordur yükleminin -dır katmanını en doğru açıklayan seçenek hangisidir?",
    [
      "Kesin görgü tanıklığı bildirir; kişinin gerçekten evde olduğu kanıtlanmıştır.",
      "İdi ek fiiliyle kurulan şimdiki zamanın hikâyesidir.",
      "İse ek fiiliyle kurulan şimdiki zamanın şartıdır.",
      "Bu bağlamda tahmin bildirir; -dır tek başına hikâye, rivayet veya şart türünde birleşik çekim oluşturmaz.",
      "Çalış- fiil kökünü bir isme dönüştürür.",
    ],
    3,
    "Konuşan bilgiyi kontrol ettiğini mi, tahmin ettiğini mi söylüyor?",
    "Konuşan tahmin ettiğini açıkça belirtir. -dır bu cümlede tahmin/bildirme ekidir; idi, imiş veya ise ile kurulan ikinci kip değildir. Bu yüzden hem kesin gözlem iddiası hem yalnız -dır nedeniyle birleşik zaman kararı yanlıştır.",
    "“O şimdi evde çalışıyordur; yerini kontrol etmedim, yalnız tahmin ediyorum.”",
  ),
  question(
    5,
    "“Dünkü provada biz hazır değildik.” cümlesi için hangi çözümleme doğrudur?",
    [
      "Hazır sözüne -ma fiil olumsuzluğu eklenmiştir.",
      "Değildik sözü gelecek zamanın rivayetidir.",
      "Cümle üçüncü tekil kişide olumlu bir fiil yargısıdır.",
      "Değil kullanılması bütün ek fiil katmanlarını ortadan kaldırır.",
      "Ad soylu yüklem değil ile olumsuz yapılmış; idi geçmişi ve birinci çoğul kişi değil üzerinde görünmüştür.",
    ],
    4,
    "Olumlu karşılığını biz hazırdık olarak kur ve değişen parçayı izle.",
    "Hazırdı/hazırdık ad soylu geçmiş yargıdır. Olumsuzunda hazır değil-di-k biçimi kullanılır; değil olumsuzluğu, -di idi geçmişini, -k biz kişisini gösterir. Hazır fiile dönüşmemiş ve gelecek zaman kurulmamıştır.",
  ),
  question(
    6,
    "“Hava uygunsa bahçede çalışabiliriz.” cümlesindeki uygunsa sözü için hangisi doğrudur?",
    [
      "Uygun ad soylu tabanına ise ek fiili gelmiştir; çalışabiliriz ana yargısının koşulunu kurar.",
      "Uygun- fiil kökü doğrudan görülen geçmiş zamanla çekimlenmiştir.",
      "Uygunsa sözü hiçbir koşul bildirmeyen bir isim tamlamasıdır.",
      "-sa eki cümlede kesinlik bildirir ve koşul anlamını kaldırır.",
      "Ana cümlenin tek yüklemi uygunsa olduğundan çalışabiliriz fiili yargı kurmaz.",
    ],
    0,
    "Uygun sözü durum niteliği mi, bir işin fiil kökü mü? Ana cümlenin yüklemini de bul.",
    "Uygun + ise → uygunsa ad soylu koşul biçimidir. Bahçede çalışabiliriz ana yargısının hangi koşulda geçerli olduğunu belirtir. Her -sa doğrudan fiilin dilek-şart eki değildir; önündeki taban bu örnekte addan/sıfattan kuruludur.",
  ),
  question(
    7,
    "“Arkadaşımın aktardığına göre o gün toplantıya geliyormuşsun.” cümlesindeki geliyormuşsun sözü hangi seçenekte doğru çözümlenmiştir?",
    [
      "Gel- / -di / -n; görülen geçmiş zaman, ikinci tekil kişi.",
      "Gel- / -iyor / -muş / -sun; şimdiki zamanın rivayeti, ikinci tekil kişi.",
      "Gel- / -ecek / -ti / -k; gelecek zamanın hikâyesi, birinci çoğul kişi.",
      "Geli ad soylu tabanı / -dir; üçüncü tekil kişi isim yüklemi.",
      "Gel- / -se; doğrudan dilek-şart, birinci tekil kişi.",
    ],
    1,
    "İlk kip ile ondan sonra gelen imiş biçimini ayır; hitap edilen kişiyi bul.",
    "Gel-iyor-muş-sun biçiminde -iyor ilk şimdiki zaman kipidir; -muş imiş ek fiilinin rivayet katmanıdır. -sun sen kişisini gösterir. Bu cümlede aktarım bağlamı açıkça verilmiştir; yalnız biçimden bütün kullanımlar için zorunlu bir bilgi kaynağı üretilmez.",
  ),
  question(
    8,
    "Geçmiş bir durum için bir kişiye sorulan “Yorgun muydun?” cümlesinin yazımı ve çözümlemesi hakkında hangisi doğrudur?",
    [
      "Soru edatı mutlaka yorgun sözüne bitişik yazılmalıdır.",
      "-du, yorgun sözcüğünden yeni bir fiil türetir.",
      "Soru edatı ayrı yazılır; mu-y-du-n içinde ek fiilin geçmişi ve ikinci tekil kişi soru edatına bağlanır.",
      "Cümlede soru anlamı olmadığı için mu bir isim köküdür.",
      "Cümledeki kişi birinci çoğuldur; konuşan kendisi ve grubunu sorar.",
    ],
    2,
    "Mu nerede ayrı, ondan sonraki sesler nerede bitişik yazılmış?",
    "Yorgun ad soylu tabandır. Mu soru edatı önceki sözden ayrı yazılır; ek fiilin idi biçimi uyumla -ydu, ikinci tekil kişi -n olarak ona bağlanır. Bu yüzden yorgun muydun doğru yazımdır; fiil türetimi ve biz kişisi yoktur.",
  ),
  question(
    9,
    "“Dün biz geldiğimizde görevli uzun süre beklemişti.” cümlesindeki beklemişti yükleminin iki kip katmanı hangi sırayla açıklanır?",
    [
      "Önce emir, sonra ek fiilin şartı.",
      "Önce geniş zaman, sonra yalnız çoğul kişi eki.",
      "Önce isimden fiil türeten -miş, sonra gelecek zaman.",
      "Önce öğrenilen geçmiş -miş, sonra idi ek fiilinin hikâye biçimi -ti.",
      "Önce idi ek fiili -miş, sonra yalnız bildirme eki -dır.",
    ],
    3,
    "Bekle- fiilinden sonraki ilk kip ile en sondaki idi biçimini karıştırma.",
    "Bekle-miş-ti, öğrenilen geçmiş zamanın hikâyesidir. İlk -miş fiilin ilk kipidir; -ti, idi ek fiilinin ses uyumuna girmiş biçimidir. İki ekin sıra ve görevi ters çevrilemez; -dır, şart veya gelecek zaman bulunmaz.",
  ),
  question(
    10,
    "“Dünkü gösteride oyuncu iyi idi.” cümlesindeki iyi idi sözünün anlamı ve kişisi korunarak bitişik yazılmış karşılığı hangisidir?",
    [
      "İyileşti; çünkü ek fiil her zaman yeni fiil türetir.",
      "İyiydim; çünkü üçüncü tekil kişi için -m gerekir.",
      "İyiyse; çünkü idi ve ise aynı geçmiş çekimidir.",
      "İyiymiş; çünkü idi bitişirken mutlaka imiş olur.",
      "İyiydi; idi içindeki i düşer, ünlüyle biten tabanla arasında y görülür ve geçmiş kişi korunur.",
    ],
    4,
    "İyi sözünün son sesi ile idi biçiminin ilk sesini düşün; kip veya kişiyi değiştirme.",
    "İyi idi → iyiydi yazımında ek fiilin geçmişi ve üçüncü tekil kişi aynı kalır. İyileşti türemiş fiildir; iyiydim kişiyi, iyiymiş rivayet biçimini, iyiyse koşulu değiştirir. Ses bağlantısı görev değişikliği anlamına gelmez.",
  ),
];
export const forge014TurkishGuides: LessonGuide[] = [ekFiilGuide];
export const forge014TurkishTopics: Record<string, string> = {
  "ek-fiil": "detail-259",
};
export const forge014TurkishLessons: Lesson[] = [
  {
    id: ekFiilGuide.id,
    subjectId: "tyt-turkce",
    title: txt("Ek fiil: tabandan yargıya, kipten birleşik çekime"),
    minutes: ekFiilGuide.minutes,
    objectives: ekFiilGuide.objectives.map(txt),
    body: ekFiilGuide.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions,
    source: txt(ekFiilGuide.source),
    tags: ["kaynakli-anlatim", "adim-adim", "dil-bilgisi"],
  },
];

export type CopulaMode = "nominal" | "verbal";
export type CopulaForm = "present" | "past" | "reported" | "conditional";
export type CopulaPerson = "ben" | "sen" | "o";
export type CopulaPart = {
  form: string;
  role: string;
  kind: "base" | "negative" | "first" | "copula" | "person";
};
export type CopulaScene = {
  sentence: string;
  target: string;
  parts: CopulaPart[];
  kind: string;
  tense: string;
  evidence: string[];
  reason: string;
};
export const copulaKinds = [
  "Ad soylu yüklem",
  "Basit çekimli fiil",
  "Birleşik çekimli fiil",
  "Ad soylu koşul",
] as const;
export function buildEkFiilScene(
  mode: CopulaMode,
  form: CopulaForm,
  person: CopulaPerson,
  negative: boolean,
): CopulaScene {
  const personIndex = person === "ben" ? 0 : person === "sen" ? 1 : 2;
  const verbal = mode === "verbal";
  const parts: CopulaPart[] = [
    {
      form: verbal ? "gel-" : "hazır",
      role: verbal ? "Fiil kökü" : "Ad soylu taban",
      kind: "base",
    },
  ];
  if (negative)
    parts.push({
      form: verbal ? "-mi-" : "değil",
      role: verbal
        ? "Fiil olumsuzluğu; -me ünlüsü daralır"
        : "Ad soylu olumsuzluk",
      kind: "negative",
    });
  if (verbal)
    parts.push({
      form: negative ? "-yor" : "-iyor",
      role: "İlk kip: şimdiki zaman",
      kind: "first",
    });
  const front = !verbal && negative;
  const copula =
    form === "past"
      ? verbal
        ? "-du"
        : front
          ? "-di"
          : "-dı"
      : form === "reported"
        ? verbal
          ? "-muş"
          : front
            ? "-miş"
            : "-mış"
        : form === "conditional"
          ? front
            ? "-se"
            : "-sa"
          : "∅";
  const personal =
    form === "past" || form === "conditional"
      ? ["-m", "-n", "∅"][personIndex]
      : form === "reported"
        ? (verbal
            ? ["-um", "-sun", "∅"]
            : front
              ? ["-im", "-sin", "∅"]
              : ["-ım", "-sın", "∅"])[personIndex]
        : verbal
          ? ["-um", "-sun", "∅"][personIndex]
          : front
            ? ["-im", "-sin", "∅"][personIndex]
            : ["-ım", "-sın", "∅"][personIndex];
  if (!verbal || form !== "present")
    parts.push({
      form: copula,
      role:
        form === "present"
          ? "Geniş zamanda görünmeyen bildirme"
          : `Ek fiil: ${form === "past" ? "idi" : form === "reported" ? "imiş" : "ise"}`,
      kind: "copula",
    });
  parts.push({ form: personal, role: `Kişi: ${person}`, kind: "person" });
  const core = verbal
    ? negative
      ? "gelmiyor"
      : "geliyor"
    : negative
      ? "hazır değil"
      : "hazır";
  const target =
    core +
    (copula === "∅" ? "" : copula.slice(1)) +
    (personal === "∅" ? "" : personal.slice(1));
  const sentence =
    form === "past"
      ? `Dün bu saatte ${person} ${target}.`
      : form === "reported"
        ? `Arkadaşımın bugüne ilişkin aktardığına göre ${person} ${target}.`
        : form === "conditional"
          ? `${person[0].toLocaleUpperCase("tr-TR") + person.slice(1)} ${target}, kapı açık kalabilir.`
          : `Şu anda ${person} ${target}.`;
  const kind = verbal
    ? form === "present"
      ? "Basit çekimli fiil"
      : "Birleşik çekimli fiil"
    : form === "conditional"
      ? "Ad soylu koşul"
      : "Ad soylu yüklem";
  const tense = verbal
    ? form === "present"
      ? "Şimdiki zaman"
      : form === "past"
        ? "Şimdiki zamanın hikâyesi"
        : form === "reported"
          ? "Şimdiki zamanın rivayeti"
          : "Şimdiki zamanın şartı"
    : form === "present"
      ? "Ek fiilin geniş zamanı"
      : form === "past"
        ? "Ek fiilin görülen geçmişi"
        : form === "reported"
          ? "Ek fiilin duyulan geçmişi"
          : "Ek fiilin şartı";
  const evidence = [
    verbal
      ? "Gel- bir fiildir; -yor ilk kip katmanıdır."
      : "Hazır ad soyludur; ek fiil onu yeni bir fiil köküne türetmez.",
    form === "conditional"
      ? "Koşul biçiminden sonra ana yargı kapı açık kalabilir olarak verilmiştir; hedef söz ana yüklemle karıştırılmaz."
      : form === "reported"
        ? "Bu örnekte aktarım kaynağı ve bugüne ilişkin değerlendirme bağlamda verilmiştir; -miş tek başına geçmişte bir tarih veya zorunlu duyma yolu kanıtlamaz."
        : form === "past"
          ? "Dün sözü geçmişi destekler; idi ek fiili bitişirken i düşmüştür."
          : "Şu anda sözü güncel bağlamı belirtir; ad yükleminde açık -dır zorunlu değildir.",
    negative
      ? verbal
        ? "Olumsuzluk gel-me-yor kökenindedir; daralmış biçim gelmiyor olarak yazılır."
        : "Olumsuzluk değil ile kurulur; sonraki çekim onun üzerinde görünür."
      : "Olumsuzluk eklenmedi; kişi eki tabanı veya ilk kipi değiştirmez.",
  ];
  return {
    sentence,
    target,
    parts,
    kind,
    tense,
    evidence,
    reason: `${verbal ? "Önce fiil kökü ve ilk kip var" : "İlk taban ad soylu"}; ${form === "present" ? "ek bir hikâye/rivayet/şart katmanı yok" : `sonraki ${form === "past" ? "idi" : form === "reported" ? "imiş" : "ise"} biçimi çekimin görevini belirliyor`}. Kişi ${person}; karar yalnız son sese dayanmıyor.`,
  };
}
