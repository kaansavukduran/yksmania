import { txt, type Question } from "../domain/model";

import { permutationId, repeatedPermutationId } from "../data/supplementalPermutationTopics032033";

type Option = readonly [value: string, reason: string];
type PermutationExercise = {
  id: string;
  prompt: string;
  options: readonly [Option, Option, Option, Option, Option];
  answer: number;
  knowledge: string;
  strategy: string;
  steps: string[];
  commonError: string;
  check: string;
};

function practice(skill: string, items: PermutationExercise[]): Question[] {
  return items.map(({ id, prompt, options, answer, knowledge, strategy, steps, commonError, check }) => ({
    id: `${skill}-${id}`,
    prompt: txt(prompt),
    options: options.map(([value]) => txt(value)),
    answer,
    hint: txt(strategy),
    explanation: txt([...steps, check].join(" ")),
    skill,
    guidance: {
      knowledge: [knowledge],
      strategy,
      steps,
      optionReasons: options.map(([, reason]) => reason),
      commonError,
      check,
    },
  }));
}

export const permutationPractice032 = practice(permutationId, [
  {
    id: "uc-derece", prompt: "Sekiz farklı koşucunun yarışında eşitlik yok. Birinci, ikinci ve üçüncünün sıralı listesi kaç farklı biçimde oluşabilir?",
    options: [
      ["56", "8·7 yalnız ilk iki dereceyi doldurur."],
      ["336", "İlk üç derecede sırayla 8, 7 ve 6 aday bulunur."],
      ["512", "Her yuvada yine 8 aday saymak aynı kişiye birden fazla derece verebilir."],
      ["112", "Üç seçimin çarpımını 3’e bölmek sıralı sonuçları birleştirir."],
      ["24", "Dört kişinin bütün sırasını sayar. Aday sayısı sekiz ve yuva sayısı üç."],
    ], answer: 1,
    knowledge: "Derece değişince sıralı sonuç değişir. Bir kişi yalnız bir derece alır.",
    strategy: "Üç yuvayı ayrı ayrı doldur. Kullanılan koşucuyu kalan seçeneklerden çıkar.",
    steps: ["Birincilik için 8 aday var.", "Aynı kişi tekrar kullanılamaz. İkincilik 7, üçüncülük 6 aday.", "8·7·6=336."],
    commonError: "Birinci, ikinci ve üçüncünün aynı üç kişi olduğu her durumu tek saymak.",
    check: "P(8,3)=8!/5!, aynı üç çarpanı bırakır.",
  },
  {
    id: "iki-kitap-blok", prompt: "Beş farklı kitap tek bir raftaki beş yere diziliyor. Fizik ve geometri kitapları bitişik olmak zorunda. Kaç geçerli diziliş vardır?",
    options: [
      ["24", "Dört nesnenin sırasını sayar, bloğun iki iç sırasını atlar."],
      ["120", "Bütün raf dizilişleri, komşu olmayanlar da dahil."],
      ["60", "Fizik önce geometri diye yarıya bölmek, arada kitap olan sıraları alır."],
      ["48", "Dört nesne 4! sıra ve bitişik iki kitap 2 iç sıra verir."],
      ["72", "120−48 komşu olmayan kitapları sayar."],
    ], answer: 3,
    knowledge: "Bitişik öğeleri blok olarak say. Farklı öğeler blok içinde yer değiştirebilir.",
    strategy: "İki kitabı tek blok yap. Bloğun iç sırasını sonra ekle.",
    steps: ["Bir blok ve diğer üç kitap toplam 4 nesne.", "4!=24 dış düzen, 2!=2 blok içi düzen.", "24·2=48."],
    commonError: "Komşu düzenleri, fizik kitabının önce geldiği bütün sıralarla karıştırmak.",
    check: "Fizik soldayken 24, sağdayken ayrık 24 sonuç vardır.",
  },
  {
    id: "uc-ozel-bosluk", prompt: "Sekiz farklı kişi bir sırada duruyor. A, B ve C’nin hiçbir ikisi komşu olmayacak. Kaç geçerli sıra vardır?",
    options: [
      ["7200", "Üç farklı özel kişinin iç sırasındaki çarpanı eksik sayar."],
      ["2400", "5!·C(6,3) yalnız boşlukları seçer. Özel kişiler farklıdır."],
      ["14.400", "5!·C(6,3)·3!, hem yer seçimini hem kişi sırasını içerir."],
      ["40.320", "8! komşuluk koşulu bulunmayan bütün sıraları alır."],
      ["1440", "Dört sıradan kişinin oluşturduğu beş boşluğun hesabıdır. Burada beş sıradan kişi var."],
    ], answer: 2,
    knowledge: "k sıradan kişi doğrusal sırada k+1 boşluk bırakır.",
    strategy: "Önce sıradan kişileri diz, sonra özel kişiler için üç ayrı boşluk kullan.",
    steps: ["Beş sıradan kişi 120 biçimde sıralanır, 6 boşluk oluşur.", "C(6,3)=20 farklı üçlü boşluk seçilir.", "Her üçlüde A, B, C için 3!=6 sıra, toplam 14.400."],
    commonError: "Baş veya son boşluğu unutmak ya da özel kişileri özdeş saymak.",
    check: "Her geçerli sıradan A, B, C çıkarılınca tam bir sıradan kişi dizilişi ve üç boşluk geri elde edilir.",
  },
  {
    id: "cember-numarali", prompt: "Yedi farklı kişi 1–7 numaralı çember koltuklarına oturuyor. A ve B komşu olmasın. Kaç oturma planı vardır?",
    options: [
      ["480", "Koltuk numaraları yokmuş gibi dönmüş planları tek sayar."],
      ["1680", "Bu sayı A ile B’nin komşu olduğu koltuk planlarıdır."],
      ["5040", "7!, komşu olan planları da alır."],
      ["600", "720’den yalnız tek komşu yönü çıkarmak diğer yönü bırakır."],
      ["3360", "A için 7, B için komşuluk dışı 4 yer ve kalanlar için 5! düzen."],
    ], answer: 4,
    knowledge: "Numaralı koltukta aynı saat yönü sırası farklı koltuklara dönünce yeni plan olur.",
    strategy: "Önce A’nın sandalyesini, sonra B için izinli sandalyeleri say.",
    steps: ["A 7 yerden birinde.", "B’nin 6 boş yerden A’nın iki komşusunu kullanması yasak, 4 seçenek.", "Kalan 5 kişi boş yerlere 5! biçimde: 7·4·120=3360."],
    commonError: "Dönmeleri birleştiren (n−1)! kuralını numaralı sandalyelere uygulamak.",
    check: "Numarasız çemberde 6!−2·5!=480, numaralıda 7 katı 3360.",
  },
  {
    id: "cift-sayi-ayrik-sonlar", prompt: "0, 1, 2, 4, 5 rakamlarıyla, hiçbir rakamı tekrarlamadan üç basamaklı kaç çift sayı yazılabilir?",
    options: [
      ["24", "Son 0 için 12’yi bulur. Son 2 ve 4’te sıfırı onlar basamağında da yasaklayınca 6’şar sayar. 12+6+6=24."],
      ["30", "Son 0 için 12, son 2 ve 4 için 9’ar sayı vardır."],
      ["36", "Her çift son için başta dört seçenek sayıp ilk sıfırı yasaklamaz."],
      ["48", "Ayrık son seçeneklerinde kullanılmış rakamı sonraki yuvalardan çıkarmaz."],
      ["18", "Son 2 ve 4 durumlarını sayar, son 0 durumunu atlar."],
    ], answer: 1,
    knowledge: "Bir çift sayının sonu çift rakamdır. Üç basamaklı bir sayının ilk rakamı sıfır olamaz.",
    strategy: "Son 0 ile son 2 veya 4’ü ayrı durumlara ayır.",
    steps: ["Son 0 ise yüzler 4, onlar 3 seçenek: 12.", "Son 2 ya da 4 ise yüzler hem 0 hem son rakamdan farklı, 3 seçenek. Onlar 3 seçenek.", "12+9+9=30."],
    commonError: "Son 0 olduğunda başta sıfırın zaten kullanıldığını gözden kaçırmak.",
    check: "Her sayı son rakamına göre tam bir gruba girer.",
  },
  {
    id: "iki-sabit-sira", prompt: "Beş görev A, B, C, D, E birer kez yapılacak. A, B’den önce ve C, D, E bu sırada olmalı. Grupların üyeleri iç içe geçebilir. Kaç sıra vardır?",
    options: [
      ["5", "A’nın yeri için beş seçenek varsayar. Son konuma A konamaz, diğer her konum B’ye farklı sayıda yer bırakır."],
      ["10", "A ve B’nin kullanacağı iki konumu seçmek, iç sıralar sabit olduğundan bütün diziyi belirler."],
      ["15", "Üçlü grubun sabit sırası yerine ek bir seçim sayar."],
      ["20", "A ile B’nin kendi içinde iki sırayı da alır. Yalnız A önce geçerli."],
      ["120", "Bütün 5! sırayı sayar ve verilen iki sıralama koşulunu kullanmaz."],
    ], answer: 1,
    knowledge: "Önce gelme ve yan yana gelme farklı koşullardır.",
    strategy: "A ve B için iki yer seç. Önceki yere A’yı yaz.",
    steps: ["C(5,2)=10 konum çifti seçilir.", "Her çiftte A önce, B sonra.", "Kalan üç konuma C, D, E bu sırada yazılır. Tek tamamlanış var."],
    commonError: "Zorunlu iç sırayı blok saymak.",
    check: "A’nın yeri birinciyse B için 4, ikinciyse 3, üçüncü ise 2, dördüncü ise 1 seçenek. 4+3+2+1=10.",
  },
  {
    id: "zorunlu-bir-uye", prompt: "A, B, C, D adlı dört farklı kişi arasından başkan ve yardımcı belirlenecek. İki görevi ayrı kişiler alır ve A mutlaka bir görev alır. Kaç atama yapılabilir?",
    options: [
      ["3", "Yalnız A’nın başkan olduğu üç atamayı sayar."],
      ["4", "Bir görevdeki dört adayı sayar, ikinci görev koşulu eksik."],
      ["6", "A için iki görev, kalan görev için üç aday."],
      ["9", "A dışındaki üç kişiyi her görevde yeniden sayınca 3·3=9 çıkar. Bu işlem A’yı dışarıda bırakır ve aynı kişiyi iki kez kullanabilir."],
      ["12", "A’nın hiç yer almadığı atamaları da kapsar."],
    ], answer: 2,
    knowledge: "İki görev farklıdır. A’nın başkan veya yardımcı olması ayrık durumlardır.",
    strategy: "A’nın görevini seç, sonra diğer göreve farklı bir aday yaz.",
    steps: ["A’nın görev seçimi 2.", "Her durumda diğer görev için B, C, D’den biri.", "2·3=6 atama."],
    commonError: "‘Mutlaka bulunur’ koşulunu yalnız tek göreve sabitlemek.",
    check: "Tüm 4·3=12 atamadan A’sız 3·2=6 çıkar. Sonuç yine 6.",
  },
  {
    id: "yuva-denklemi", prompt: "Bir yarışmada birinci ve ikinci iki farklı kişi. Olası birinci ve ikinci sıralamalarının sayısı 42 ise kaç yarışmacı vardır?",
    options: [
      ["6", "6·5=30 atama verir."],
      ["8", "8·7=56 atama verir."],
      ["21", "42’yi ikiye bölmek, ilk adaya bağlı kalan aday sayısını kullanmaz."],
      ["7", "7·6=42 sıralı atama."],
      ["42", "Bu ilk iki listenin sayısı, yarışmacı sayısı değil."],
    ], answer: 3,
    knowledge: "n kişi için ilk iki derece P(n,2)=n(n−1).",
    strategy: "Çarpımı 42 olan ardışık pozitif sayıları bul.",
    steps: ["Birinci için n, ikinci için n−1 aday yaz.", "6 ve 7 ardışık ve çarpımları 42.", "Büyük çarpan n, yani 7 yarışmacı."],
    commonError: "P(n,2) ile sıra gözetmeyen çift seçimini eşitlemek.",
    check: "Yedi farklı kazanan adayının her biri için 6 farklı ikinci vardır.",
  },
]);

export const repeatedPermutationPractice033 = practice(repeatedPermutationId, [
  {
    id: "iki-ozdes-grup", prompt: "A, A, A, B, B, C harflerinin tamamıyla kaç farklı altı harfli dizi yazılabilir?",
    options: [
      ["720", "6! bütün kopyaları geçici olarak ayrı sanır."],
      ["120", "Yalnız üç A’nın iç sırasını siler, iki B’yi farklı saymaya devam eder."],
      ["60", "6!/(3!2!) iki özdeş grubun tekrarlarını ayrı giderir."],
      ["360", "Yalnız iki B’nin iç yer değiştirmesini düzeltir."],
      ["20", "C’yi yerleştirmek için gereken seçimleri eksik sayar."],
    ], answer: 2,
    knowledge: "Özdeş kopyaların kendi aralarındaki etiket sıraları aynı görünüşü üretir.",
    strategy: "Önce altı farklı etiket düşün, sonra A ve B’nin iç düzenlerine böl.",
    steps: ["Altı etiket 6!=720 sıra verir.", "Her görünüş 3!·2!=12 etiketli sıra üretir.", "720/12=60 görünür dizi."],
    commonError: "Değişik türlerin tekrar adetlerini toplamak ve tek bir faktöriyel kullanmak.",
    check: "C için 6 yer, kalan beşten B’ler için C(5,2)=10 yer, 60 sonuç.",
  },
  {
    id: "bas-sifirli-diziler", prompt: "0, 0, 1, 3, 3 rakamlarının tamamı kullanılacak. Kaç farklı beş basamaklı doğal sayı yazılabilir?",
    options: [
      ["30", "Başı 0 olan dizileri de sayı olarak kabul eder."],
      ["18", "Tüm 30 diziden başında 0 olan 12 dizi çıkar."],
      ["12", "Başında sıfır bulunduğu için geçersiz olan dizilerin sayısı."],
      ["6", "Geçersiz baş sıfır durumunu iki ayrı etiketli sıfır varmış gibi iki kez çıkarır."],
      ["24", "Baştaki sıfırı sabitleyince kalan çokluğu yanlış bölüp 6 çıkarır."],
    ], answer: 1,
    knowledge: "Beş basamaklı doğal sayının ilk basamağı sıfır olamaz.",
    strategy: "Bütün özdeş dizileri say. İlk sıfırı sabitleyip kalan dizileri çıkar.",
    steps: ["Bütün diziler 5!/(2!2!)=30.", "Başta bir sıfır sabitken 0,1,3,3 kalır. 4!/2!=12.", "30−12=18."],
    commonError: "Sabitlenen sıfır nedeniyle kalan sıfır adedinin bir olduğunu unutmak.",
    check: "İlk 1 olursa 4!/(2!2!)=6, ilk 3 olursa 4!/2!=12. Toplam 18.",
  },
  {
    id: "duraktan-kacin", prompt: "(0,0)’dan (5,3)’e birim adımlarla yalnız sağa ve yukarı gidiliyor. P=(2,2)’ye uğramayan kaç en kısa yol vardır?",
    options: [
      ["24", "P’den geçen rotaların sayısı."],
      ["56", "P koşulu ayrılmamış bütün rotalar."],
      ["50", "Yalnız P’ye ulaşan 6 ilk parçayı bütün tamamlanmış rotalardan çıkarır."],
      ["32", "56 toplam rotanın P’den geçen 24 tanesi çıkarılır."],
      ["52", "Yalnız P’den sonraki 4 parçayı çıkarır."],
    ], answer: 3,
    knowledge: "Bütün en kısa rotalarda adım adetleri aynı. Zorunlu ara nokta rotayı iki ardışık parçaya böler.",
    strategy: "Bütün rotaları ve P’den geçenleri ayrı hesapla, sonra çıkar.",
    steps: ["Sekiz adımda 5 sağ ve 3 yukarı: C(8,3)=56.", "P’ye 2 sağ 2 yukarıyla 6 rota. P’den sonra 3 sağ 1 yukarıyla 4 rota.", "P’den geçenler 6·4=24, uğramayanlar 32."],
    commonError: "İlk veya ikinci parçayı tam rotaymış gibi saymak.",
    check: "24+32=56. Koordinatlar geri gitmediği için her geçen rota iki parçaya tek yoldan ayrılır.",
  },
  {
    id: "ozdes-ayri-bosluk", prompt: "A, A, B, B, C, D harflerinin hepsiyle diziler yapılıyor. İki A bitişik olmayacak. Kaç farklı dizi vardır?",
    options: [
      ["240", "A’lara ayrı kimlik vererek her görünüşü iki kez sayar."],
      ["60", "A’ların komşu olduğu blok dizilerinin sayısı."],
      ["180", "A’ların ayrılığı uygulanmamış bütün diziler."],
      ["12", "B, B, C, D dizilerini sayar, A’ların konumları eksik."],
      ["120", "12 başlangıç dizisinin her birinde iki farklı boşluk C(5,2)=10 biçimde seçilir."],
    ], answer: 4,
    knowledge: "Özdeş A’lar arasında iç yer değiştirme yeni dizi yaratmaz.",
    strategy: "A dışındaki dört harfi diz, A’lara farklı iki boşluk ver.",
    steps: ["B, B, C, D, 4!/2!=12 sıra.", "Baş, üç ara ve son, 5 boşluk. İki boşluk seçimi 10.", "12·10=120."],
    commonError: "Boşluklara yerleşen A’lar için fazladan 2! kullanmak.",
    check: "6!/(2!2!)=180 bütün dizidir. A’lar bir blokken 5!/2!=60. Fark 120.",
  },
  {
    id: "iki-parite-yasagi", prompt: "0, 0, 1, 1, 4, 6 rakamlarının tamamı kullanılarak kaç altı basamaklı çift sayı oluşturulabilir?",
    options: [
      ["84", "Son 0 için 48, son 4 ve 6 için 18’er geçerli sayı."],
      ["120", "Son gruplarını sayar, ilk sıfır yasağını uygulamaz."],
      ["48", "Yalnız sonu 0 olan geçerli sayılar."],
      ["72", "Sonu 0 iken baştan başlayan sıfırlı dizileri iki kez çıkarır."],
      ["36", "Sonu 4 ve 6 olanları sayar, 0 ile bitenleri unutmuştur."],
    ], answer: 0,
    knowledge: "Çift son 0, 4, 6 olabilir. Her son seçimi kalan çoklukları değiştirir.",
    strategy: "Son rakamı sabitle. Her durumda başı 0 olan sıraları çıkar.",
    steps: ["Son 0: 0,1,1,4,6 için 5!/2!=60. Baş 0 iken 4!/2!=12, fark 48.", "Son 4 veya 6: kalan iki 0 ve iki 1 ile 5!/(2!2!)=30. İlk 0 sabitken 4!/2!=12 kalır.", "Ayrık son durumları topla: 48+18+18=84."],
    commonError: "Son rakam seçildikten sonra bütün durumlarda aynı faktöriyel bölümünü kullanmak.",
    check: "İlk sıfır çıkarılmadan 60+30+30=120, her gruptan 12 çıkınca 84.",
  },
  {
    id: "izgara-disinda", prompt: "(0,0)’dan (5,2)’ye yalnız sağ ve yukarı adımlarla en kısa yollar izleniyor. P=(2,3)’ten geçmesi gereken yollar kaç tanedir?",
    options: [
      ["21", "C(7,2) bütün hedef yollarıdır. Hiçbiri yukarıda kalan P’ye gidemez."],
      ["10", "Başlangıçtan P’ye yolları sayar, P’den sonrasını gözden kaçırır."],
      ["7", "Bu sayı yolun toplam adım sayısıdır."],
      ["0", "P’nin yüksekliği hedefin üstündedir. Aşağı adım olmadığı için hedefe dönülemez."],
      ["1", "Başlangıç veya hedefin tek nokta olması, gereken ara noktayı ulaşılır yapmaz."],
    ], answer: 3,
    knowledge: "Sağ ve yukarı adımlarla iki koordinat da azalamaz.",
    strategy: "Hesaplamadan önce P’den hedefe izin verilen doğrultuyla ulaşılabilir mi bak.",
    steps: ["P’nin düşey koordinatı 3, hedefin 2.", "P’den sonra düşey koordinatı bir azaltmak gerekir.", "Aşağı adım yasak, bu nedenle geçen yol yok."],
    commonError: "Ara nokta hedefi aşıyor olsa da iki binom katsayısını zorla hesaplamak.",
    check: "Hedef rotalarının hepsi yalnız iki yukarı adım içerir. Yükseklik 3’e çıkamaz.",
  },
  {
    id: "ilk-konumlar-kisitli", prompt: "A, A, A, A, B, B, B harflerinin hepsi kullanılıyor. İlk üç konumda tam iki A olursa kaç farklı dizi vardır?",
    options: [
      ["3", "İlk üç yerin düzenini sayar, son dört yerin düzenini gözden kaçırır."],
      ["35", "7!/(4!3!) ilk üç yer kısıtını uygulamayan bütün sıralardır."],
      ["18", "İlk üç konum 3 farklı, kalan iki A ve iki B 6 farklı dizilir."],
      ["6", "Yalnız kalan dört konumun sırasını sayar."],
      ["12", "Son dört konum için yalnız tek kartın dört yerini sayar. Kalan iki A özdeş ama ikisi de yer ister."],
    ], answer: 2,
    knowledge: "Bir konum grubuna ayrılan kopyaları, sonraki gruptan çıkar.",
    strategy: "İlk üçteki tek B’nin yerini belirle. Kalan dört yerde iki A’nın yerini seç.",
    steps: ["İlk üçte A,A,B, 3 sıra.", "Kalan A,A,B,B, C(4,2)=6 sıra.", "Her ilk sıra her sonraki sırayla birleşir, 3·6=18."],
    commonError: "İlk grup belirlendikten sonra başlangıçtaki bütün harflerden yeniden seçim yapmak.",
    check: "İlk grubun B konumu ve son grubun A çifti, her geçerli diziden tek biçimde geri okunur.",
  },
  {
    id: "uc-yon-adim", prompt: "Engelsiz bir ızgarada hedefe varmak için 3 sağ, 1 yukarı ve 2 ileri birim adım gerekiyor. Geri adım yok. Kaç farklı en kısa rota vardır?",
    options: [
      ["720", "6! aynı yönlü adımları gereksiz yere ayırt eder."],
      ["60", "6!/(3!1!2!), altı yuvada yönlerin çokluklarını korur."],
      ["120", "Üç sağı özdeş sayar, iki ileriyi farklı etiketler."],
      ["15", "Yalnız ileri adımların yerini seçer, kalan yerde yukarı adımın yerini saymaz."],
      ["30", "Yönlerden biri bir adım olduğu halde onun için fazladan 2 ile böler."],
    ], answer: 1,
    knowledge: "Her rota aynı altı yön etiketinin bir sıralamasıdır.",
    strategy: "Üç yönün adetlerini yaz. Aynı yönün iç sırası için faktöriyele böl.",
    steps: ["Toplam 3+1+2=6 adım.", "Etiketli 6! sırada sağı 3!, ileriyi 2!, yukarıyı 1! kez saymış oluruz.", "720/(6·1·2)=60."],
    commonError: "Üç boyutlu yönleri iki yönlü bir binom seçimiyle bitirmek.",
    check: "İki ileri için 15 yuva çifti, kalan dört yerden yukarı için 4 seçenek. 15·4=60.",
  },
]);
