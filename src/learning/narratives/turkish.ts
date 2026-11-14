import { node as n, type NarrativePack } from "./types";
export const turkishNarratives: NarrativePack[] = [
  {
    id: "ses-bilgisi",
    topicId: "detail-250",
    subjectId: "tyt-turkce",
    title: "Ses bilgisi: önceki biçimi bul, değişimi gör",
    minutes: 35,
    source:
      "Aurelia TYT Türkçe Ses Bilgisi kopya kağıdı, PDF s.1–5. Dosyanın atıf yaptığı EBA ve diğer kaynakların tümü bu anlatım için ayrıca okunmuş sayılmaz. Örnek çözümlemeler özgün etkileşimli biçimde yeniden kurulmuştur.",
    objectives: [
      "Ses sınıflarını ve ünlü uyumlarını birbirinden ayır.",
      "Kök–ek sınırında hangi sesin nasıl değiştiğini göster.",
      "Ulama, kaynaştırma, hece ve yazım ilişkilerini karıştırma.",
    ],
    body: [
      {
        title: "Sesi harfle, heceyi ünsüzle eşitleme",
        text: "Ses konuşmada üretilen, harf yazıda kullanılan işarettir. Türk alfabesinde 8 ünlü, 21 ünsüz, toplam 29 harf vardır. Ünlüler a,e,ı,i,o,ö,u,ü’dür. Türkçe sözcüklerde heceyi ünlü sayısıyla denetleyebilirsin: ki-tap iki, öğ-ren-ci üç hecedir. Yan yana iki ünsüz yeni hece oluşturmaz. Büyük I’nın küçüğü ı, büyük İ’nin küçüğü i’dir; Türkçe harf ayrımını koru. Ses olayında yalnız son biçimi görüp karar vermek yerine kökü ve ekin başlangıç biçimini karşılaştırmak gerekir.",
      },
      {
        title: "Ünlü uyumunda iki ayrı kontrol",
        text: "Büyük ünlü uyumu, çok heceli sözcükte ünlülerin hep kalın (a,ı,o,u) veya hep ince (e,i,ö,ü) olmasını arar. Küçük ünlü uyumunda her ünlünün bir öncekine göre düz–yuvarlak ilişkisi incelenir: düzden sonra düz, yuvarlaktan sonra dar-yuvarlak veya geniş-düz beklenir. Kavun kalın ünlülerle büyüğe uyar ama a→u geçişi küçüğü bozabilir. Tek heceli sözcükte karşılaştırılacak ünlü dizisi olmadığı için uyum aranmaz. Uyum, doğru yazımın tek ölçütü değildir; alıntılar ve bazı ekler istisna taşır. -yor eki bulunan her sözcüğü bütün eklerde aynı uyum varmış gibi zorla değiştirme.",
      },
      {
        title: "Ünlü düştü mü, daraldı mı, eklendi mi?",
        text: "Burun+u → burnu örneğinde önceki bir ünlü yok olur: ünlü düşmesi. Bekle+yor → bekliyor örneğinde e, i olur: ünlü daralması; ses tamamen kaybolmaz. Az+cık → azıcık örneğinde ünlü türemesi görülür, fakat ev+i → evi içindeki i zaten ekin kendisidir. Ben+e → bana değişimi daralma değildir; geniş e, geniş a’ya dönüşür. Her y’den önce a/e daralmaz: başlayacak doğru, başlıyacak yanlış yazımdır. Kökü geri kuramıyorsan sırf son sözcükte dar ünlü bulundu diye daralma etiketi verme.",
      },
      {
        title: "Yumuşama kökte, benzeşme ekin başında",
        text: "Kitap+ı → kitabı örneğinde kökün son p’si b’ye dönüşür; ünlüyle başlayan ek önünde görülen ünsüz yumuşamasıdır. Kitap+da → kitapta örneğinde kökteki p korunur, ek başındaki d, t olur; sert ünsüzden sonra ünsüz benzeşmesi/sertleşmesidir. Sert ünsüzler f,s,t,k,ç,ş,h,p; yumuşama adayları p,ç,t,k alt grubudur. Her aday zorunlu yumuşamaz: atı, sütü, hukuku gibi örnekleri kontrol et. Özel adlara ek geldiğinde yazıdaki kök değiştirilmez: Ahmet’i. Söyleyişteki farklılığı rastgele yazıya taşıma.",
      },
      {
        title: "Ünsüz kaybı, artışı ve yardımcı ses",
        text: "Küçük+cük → küçücük biçiminde k kaybı ünsüz düşmesidir. Af+et → affet biçiminde f artışı ünsüz türemesidir. İki aynı harfin yan yana bulunması tek başına türeme kanıtı değildir; geçerli önceki biçim aranır. Araba+y+a ve oda+s+ı örneklerinde yardımcı ses ek sınırında görülür. Y,ş,s,n okul düzeyinde birlikte ele alınabilir; iyelikten sonraki n ayrıntılı kaynaklarda zamir n’si diye de adlandırılır. Her y veya n sonradan eklenmiş sayılmaz; yay içindeki y kökün parçasıdır. İşlevi belirlemeden yalnız harfe bakarak olay bulma.",
      },
      {
        title: "Söyleyiş ile yazı ayrı kanıtlardır",
        text: "Ulama, ünsüzle biten bir sözcükten ünlüyle başlayan sonraki sözcüğe duraksız söyleyişte bağlanmadır: güzel ev. Yazıya yeni harf eklenmez ve sözcükler bitişik yazılmaz. Arada durak varsa bağlama yapılmayabilir; yalnız metinden gerçek ses kaydı varmış gibi kesin söyleyiş ölçülmez. Kaynaştırmada sözcük–ek, ulamada sözcük–sözcük sınırı vardır. Vurgu çoğu sözcükte son hecede belirginleşebilse de yer adları, ekler ve söyleyiş amacı istisna oluşturur. ‘Bütün sözcüklerde vurgu sonda’ genellemesi yanlıştır. Yoktur sorularında her seçeneğin kanıt sözcüğünü tek tek çıkar; bir kelimedeki olayı bütün parçaya yayma.",
      },
    ],
    pitfalls: [
      {
        label: "Dar ünlü görmek daralma kanıtı değildir",
        reason:
          "Önceki a/e sesinin dar bir ünlüye dönüştüğünü göstermelisin. Evi içindeki i zaten ektir.",
      },
      {
        label: "Yumuşama ve benzeşmenin yeri farklı",
        reason:
          "Kitabı kök sonundaki p→b; kitapta ek başındaki d→t değişimini gösterir.",
      },
      {
        label: "Ulamada yazı birleşmez",
        reason:
          "Söyleyiş bağlantısı yeni harf veya bitişik yazım gerektirmez; durak koşulu önemlidir.",
      },
    ],
    cases: [
      {
        name: "Kitabı ve kitapta",
        question: "İkisinde de kitap kökü var; değişen sesler neden farklı?",
        conclusion:
          "Kitabı: kök sonu p→b, yumuşama. Kitapta: ek başı d→t, benzeşme. Değişimin konumunu göstermek olay adını ezberlemekten daha güvenlidir.",
        nodes: [
          n("kitap + ı", "Ek ünlüyle başlar.", "document"),
          n("kitabı", "Kökün p’si b oldu.", "document"),
          n("kitap + da", "Kök sert ünsüzle biter.", "document"),
          n("kitapta", "Ekin d’si t oldu; p korunur.", "document"),
        ],
      },
      {
        name: "Düşme mi daralma mı?",
        question:
          "Burnu ve bekliyor sözcüklerindeki dar ünlü aynı olayı mı gösterir?",
        conclusion:
          "Burun→burnu bir ünlünün kaybı; bekle→bekliyor bir ünlünün daralmasıdır. Son görüntü yerine önce–sonra değişimini karşılaştır.",
        nodes: [
          n("burun + u", "Önceki biçimdeki iki u’yu izle.", "document"),
          n("burnu", "Kökün ikinci u’su düştü.", "document"),
          n("bekle + yor", "Kök sonu e.", "document"),
          n("bekliyor", "e→i, ünlü daralması.", "document"),
        ],
      },
      {
        name: "Ek mi türeme mi?",
        question:
          "Evi içindeki i ile azıcık içindeki ı neden aynı adla açıklanmaz?",
        conclusion:
          "Ev+i’de i ekin kendisidir. Az+cık→azıcık’ta başlangıç parçalarında bulunmayan ek bir ünlü ortaya çıkar; türeme karşılaştırmayla belirlenir.",
        nodes: [
          n("ev + i", "Ek zaten ünlü taşır.", "document"),
          n("evi", "Ayrı bir ünlü türemesi kanıtı yok.", "document"),
          n("az + cık", "Parçaları geri kur.", "document"),
          n("azıcık", "Başlangıçta bulunmayan ı belirir.", "document"),
        ],
      },
    ],
    recall: [
      {
        prompt:
          "Kitapta sözcüğünde hangi ses değişir; neden yumuşama demezsin?",
        answer:
          "Kitap+da → kitapta; ek başındaki d, t olur. Kök sonundaki p aynı kaldığı için bu örnek yumuşama değil ünsüz benzeşmesidir.",
      },
      {
        prompt:
          "Güzel ev ifadesindeki ulama neden kaynaştırma ile aynı değildir?",
        answer:
          "İki ayrı sözcük arasında söyleyiş bağlantısıdır. Ek sınırında yardımcı harf getirilmez, yazı bitişmez ve gerçek söyleyiş duraklara bağlıdır.",
      },
    ],
    modelLimit:
      "Harf dönüşümleri okul düzeyinde yazılı çözümlemeyi gösterir; ses kaydı, ağız veya tarihsel köken analizi değildir. Ara biçimler doğru yazım önerisi sayılmaz.",
  },
  {
    id: "sozcukte-yapi",
    topicId: "detail-251",
    subjectId: "tyt-turkce",
    title: "Sözcükte yapı: anlamı koruyarak parçala",
    minutes: 35,
    source:
      "Aurelia TYT Türkçe Sözcükte Yapı kopya kağıdı, PDF s.1–5. Atıf yapılan EBA belgelerinin tamamı ayrıca okunmuş sayılmaz; örnekler güncel okul dil bilgisi işlevleriyle açıklanır.",
    objectives: [
      "Kökü anlam bağıyla bul ve gövdeden ayır.",
      "Yapım ile çekim ekini işlevine göre gerekçelendir.",
      "Basit, türemiş ve birleşik yapıyı yazım uzunluğundan bağımsız belirle.",
    ],
    body: [
      {
        title: "En kısa parça değil, anlamı koruyan kök",
        text: "Kök, sözcüğün güncel anlamıyla ilişkili en küçük anlamlı başlangıç birimidir. Balık sözcüğünü bal+ık diye parçalamak bal ile balık arasında gerekli anlam bağını kurmaz. Gözlük için göz köküyle anlam ilişkisi kurulabilir. Ad kökü varlık veya kavramı, fiil kökü iş ve oluşu bildirir; yaz- gibi fiil tabanlarında çizgi yalnız gösterimdir. -mak/-mek denemesi yardımcıdır ama sonradan türemiş fiilden kökün mutlaka fiil olduğu sonucu çıkarılmaz: taş-la- ad kökü taş’tan türemiştir. Tarihsel köken tahminiyle güncel okul çözümlemesini birbirine karıştırma.",
      },
      {
        title: "Aynı ses, aynı kök ilişkisi demek değil",
        text: "Yaz geldi ile adını yaz cümlelerinde aynı ses dizisi anlamca farklı ad ve fiil köküdür: sesteş kök. Tadı güzel ile çorbayı tat örneklerinde ad ve fiil arasında anlam bağı vardır; ortak kök olarak ele alınır. Sınıflama için cümlenin anlamını görmelisin. Pat ve cız gibi ses taklitleri yansıma tabanlar olarak ad kökü grubunda işlenebilir; pat-la- biçiminde yeni fiil oluşur. Bir sözcüğün başlangıç türü ile en son cümledeki türü aynı olmak zorunda değildir.",
      },
      {
        title: "Yapım eki yeni gövde kurar",
        text: "Yapım eki yeni sözcük veya anlam kurabilir; türü değiştirmesi şart değildir. Tuz+luk ad→ad, tuz+la- ad→fiil, bil-+gi fiil→ad, yaz-+dır- fiil→fiil ilişkilerine örnektir. Göz+lük+çü’de gözlük ve gözlükçü iki türetme basamağıdır. Ardından -ler gelmesi yeni gövde kurmaz. Ses uyumuyla -lık/-lik/-luk/-lük farklı görünse de aynı ekin biçimleridir; her harf değişimini yeni ek sayma. Yapım eki yalnız sözcüğün harflerini uzattığı için değil, önceki tabanı yeni bir ad veya işe dönüştürdüğü için tanınır.",
      },
      {
        title: "Çekim yeni sözcük yerine cümle ilişkisi kurar",
        text: "Ev+ler çokluk, ev+de bulunma, ev+im iyelik, gel-di-m zaman ve kişi ilişkisi kurar. Evlerimizden uzun bir sözcük olsa da yapım eki almadığı için basittir. Çantası ağır cümlesinde -sı iyelik, çantayı getir içinde -ı belirtme görevi taşır. Onun çantasını getir biçiminde iyelik ve belirtme aynı sözcükte birlikte bulunabilir. Ekleri yalnız görünüşleriyle adlandırma: evim içindeki -im iyelik, geldim içindeki -m kişi ekidir. Genellikle yapım çekimden önce gelir, fakat annemsiz gibi örnekler ‘her zaman’ genellemesini sınırlar.",
      },
      {
        title: "Yapı türü, uzunluk ve bitişik yazım ayrıdır",
        text: "Basit sözcük yapım eki almamış ve birleşmeyle kurulmamıştır; çekim eki alabilir. Türemiş sözcükte en az bir yapım eki vardır. Birleşik yapıda birden fazla sözcük yeni kavram veya eylem birliği kurar; biçerdöver örneği iki fiil tabanını birleştirir. Her yan yana gelen iki sözcük birleşik değildir: mavi kalem sıradan sıfat tamlamasıdır. Birleşik fiil ayrı da yazılabilir: yardım etmek. Bitişik yazımı yapım eki kanıtı sayma; çekim eki almak da birleşik tabanın oluşumunu silmez. İç içe oluşum varsa tabanın kuruluşu ile sonraki türetmeyi ayrı belirt.",
      },
      {
        title: "Aynı ek görüntüsünü bağlamla ayır",
        text: "Gelme! cümlesindeki -me olumsuzluk, yüzme yararlı ifadesindeki -me isim-fiil görevi taşır. Fiili yalnız olumsuz yapmak onu sırf bu yüzden türemiş fiil saydırmaz. Evde kaldı içindeki -de bulunma eki, ev de boş içindeki de ayrı yazılan bağlaçtır. Masadaki defter ile benimki içindeki ki aynı görevi taşımaz; bağlamı incele. Güzel-di ek-fiilinde geçmiş zamanlı ad soylu yüklem kurulması yeni sözlük sözcüğü türetmek değildir. Çözümde önce cümle anlamını kur, sonra her ekin öncesi ve sonrasındaki işlevi yaz; en son yapı türüne karar ver.",
      },
    ],
    pitfalls: [
      {
        label: "Uzun sözcük mutlaka türemiş değildir",
        reason:
          "Evlerimizden çok sayıda çekim eki alabilir ama yapım eki yoktur; basit yapı korunur.",
      },
      {
        label: "Tür değişmedi diye yapım ekini silme",
        reason:
          "Ad→ad türetme de mümkündür. Tuz ile tuzluk farklı sözcüklerdir.",
      },
      {
        label: "Harf eşitliği görev eşitliği değildir",
        reason:
          "-m iyelik veya kişi eki olabilir; -ma olumsuzluk veya isim-fiil görevi taşıyabilir. Cümleye bak.",
      },
    ],
    cases: [
      {
        name: "Gözden gözlükçüye",
        question: "Gözlükçüler sözcüğünde kaç türetme basamağı vardır?",
        conclusion:
          "Göz→gözlük→gözlükçü iki yapım basamağıdır. Son -ler çokluk çekimidir; üçüncü bir yeni gövde oluşturmaz.",
        nodes: [
          n("göz", "Ad kökü.", "document"),
          n("gözlük", "-lük ile nesne adı türedi.", "document"),
          n("gözlükçü", "-çü ile meslek/kişi adı türedi.", "document"),
          n("gözlükçüler", "-ler çokluk çekimi.", "document"),
        ],
      },
      {
        name: "Uzun ama basit",
        question:
          "Evlerimizden sözcüğü neden yalnız uzunluğuna bakılarak türemiş sayılmaz?",
        conclusion:
          "Ev köküne gelen çokluk, iyelik ve ayrılma ekleri çekim işlevlidir. Yeni sözcük türetme kanıtı yoktur.",
        nodes: [
          n("ev", "Kök.", "document"),
          n("evler", "Çokluk.", "document"),
          n("evlerimiz", "İyelik.", "document"),
          n("evlerimizden", "Ayrılma ilişkisi; basit taban.", "document"),
        ],
      },
      {
        name: "Aynı ses, farklı iş",
        question: "Gelme! ile yüzme yararlı içindeki -me aynı görevde midir?",
        conclusion:
          "İlkinde fiil olumsuzlanır, ikincisinde fiile ad görevi verilir. Biçime bakmak yetmez; cümledeki işlev sınıflamayı belirler.",
        nodes: [
          n("Gelme!", "Olumsuz emir.", "document"),
          n("Gel- + me", "Olumsuzluk, yeni eylem adı değil.", "document"),
          n("Yüzme yararlı", "Yüzme işi cümlede ad görevi taşır.", "document"),
          n("Yüz- + me", "İsim-fiil işlevi.", "document"),
        ],
      },
    ],
    recall: [
      {
        prompt: "Taşlamak fiil olduğu hâlde kökü neden ad olarak bulunabilir?",
        answer:
          "Taş-la- çözümünde başlangıç taş adıdır; -la fiil türetir. Son biçime -mak getirebilmek ilk kökün de fiil olduğunu göstermez.",
      },
      {
        prompt: "Yardım etmek neden ayrı yazılsa da birleşik fiil olabilir?",
        answer:
          "Yapı sınıflaması eylem ve anlam birliğini inceler. Ayrı veya bitişik yazım bununla aynı ölçüt değildir; sözcükler birlikte tek eylem anlamı kurabilir.",
      },
    ],
    modelLimit:
      "Çözümlemeler seçili güncel okul dil bilgisi bağlamlarını kullanır. Sadece harfleri bölmek tarihsel köken analizi veya bağlamsız kesin ek sınıflaması değildir.",
  },
];
