import { txt, type Lesson } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";
import {
  percentProblemsSource020Examples,
  percentProblemsSource020Practice,
  percentProblemsSource020Recall,
  percentProblemsSource020Sections,
  percentProblemsSource020Summary,
} from "./percentProblemsSource020Revision";
import {
  profitProblemsSource021Examples,
  profitProblemsSource021Practice,
  profitProblemsSource021Recall,
  profitProblemsSource021Sections,
  profitProblemsSource021Summary,
} from "./profitProblemsSource021Revision";
import {
  ageProblemsSource019Examples,
  ageProblemsSource019Practice,
  ageProblemsSource019Recall,
  ageProblemsSource019Sections,
  ageProblemsSource019Summary,
} from "./ageProblemsSource019Revision";
import {
  fractionProblemsSource018Examples,
  fractionProblemsSource018Practice,
  fractionProblemsSource018Recall,
  fractionProblemsSource018Sections,
  fractionProblemsSource018Summary,
} from "./fractionProblemsSource018Revision";
import {
  numberProblemsSource017Examples,
  numberProblemsSource017Practice,
  numberProblemsSource017Recall,
  numberProblemsSource017Sections,
  numberProblemsSource017Summary,
} from "./numberProblemsSource017Revision";

type Problem = {
  prompt: string;
  correct: string;
  distractors: [string, string, string, string];
  hint: string;
  explanation: string;
};
type Pack = LessonGuide & {
  topic: string;
  title: string;
  questions: Problem[];
};
const section = (title: string, a: string, b: string): GuideSection => ({
  title,
  paragraphs: [a, b],
});
const example = (
  title: string,
  prompt: string,
  strategy: string,
  steps: [string, string, string?][],
  answer: string,
  check: string,
  pitfall: string,
): WorkedExample => ({
  title,
  prompt,
  strategy,
  steps: steps.map(([label, explanation, expression]) => ({
    label,
    explanation,
    ...(expression ? { expression } : {}),
  })),
  answer,
  check,
  pitfall,
});
const problem = (
  prompt: string,
  correct: string,
  distractors: [string, string, string, string],
  hint: string,
  explanation: string,
): Problem => ({ prompt, correct, distractors, hint, explanation });

const numbers: Pack = {
  id: "sayi-problemleri",
  topic: "detail-210",
  title: "Sayı problemleri: cümleden modele, modelden kontrole",
  minutes: 65,
  objectives: [
    "Verilen, istenen ve bilinmeyeni birimleriyle ayır.",
    "Sözel ilişkileri doğru işlem sırasıyla denklem veya eşitsizliğe çevir.",
    "İki düzen, ağırlıklı sayım ve kapasite problemlerinde değişmeyen toplamı bul; çözümü koşullarda doğrula.",
  ],
  sections: [
    section(
      "Önce sorulan niceliğe isim ver",
      "Problemdeki her sayı aynı tür bilgi değildir: kişi sayısı, sıra sayısı, bir kişinin ödediği ücret ve toplam gelir farklı niceliklerdir. İlk okumada verilenleri birimleriyle ayır; ikinci okumada tam olarak neyin sorulduğunu söyle. Aranana x demek çoğu kez işi kolaylaştırır, fakat x'in kişi mi lira mı olduğunu yazmak denklemin anlamını korur.",
      "Bir ilişkiden yalnız bir ifade çıkıyorsa henüz denklem kurmuş olmazsın. 'İki katının beş fazlası' 2x+5 ifadesidir; bunun 29'a eşit olduğu da söylenirse 2x+5=29 denklemi oluşur. Bilinmeyeni bulduktan sonra sorulan nicelik başka bir toplam olabilir. Son sayının yanına birim koymak yanlış niceliği cevaplamayı önler.",
    ),
    section(
      "İşlemin cümledeki sırasını parantezle koru",
      "Bir sayının 4 katının 3 eksiği 4x−3, 3 eksiğinin 4 katı 4(x−3)'tür. 'A, B'nin 2 katından 7 fazladır' ifadesi A=2B+7 anlamına gelir. A ile B'nin yerini değiştirerek aynı ilişkiyi korumuş olmazsın. 'Toplamlarının yarısı' (x+y)/2 iken x+y/2 yalnız ikinci sayıyı yarıya indirir.",
      "Kısa bir sayıyla anlam kontrolü yap: x=10 için 4x−3=37, 4(x−3)=28 çıkar. İki sözel ifade farklı sonuç verdiği için parantezin süs olmadığını görürsün. İşlem kurallarını bilmek kadar hangi niceliğin hangi işlemden geçtiğini bilmek de gerekir. MEBİ'nin ilgili tablo satırındaki 14 eksiği ifadesinin karşılığı 5x−14 olmalıdır; eksik basılmış rakamı kural diye öğrenme.",
    ),
    section(
      "Ardışıklık ortak farkı belirler",
      "Ardışık tam sayılar n,n+1,n+2; ardışık çift veya tek sayılar n,n+2,n+4 biçiminde yazılır. Tek sayıda terim varsa ortadaki sayıyı seçmek toplamı kısaltır: üç ardışık tek sayı x−2,x,x+2 olduğunda toplam 3x'tir. x'in de tek olması gerekir; denklem bu koşulu kendiliğinden her zaman sağlamaz.",
      "Dört ardışık çift sayı için tek bir tam sayı orta terim yoktur; n,n+2,n+4,n+6 yazımı güvenlidir. 'Üç tek sayı' ifadesi tek başına ardışıklık vermez. Örneğin 3,9,15 tek sayılardır fakat ardışık tek sayı değildir. Önce ortak farkı metinden çıkar, sonra toplama yap; sonucu her terimin çiftliği veya tekliğiyle birlikte denetle.",
    ),
    section(
      "İki düzen aynı insanları sayar",
      "Sıralar ikişer dolup a kişi ayakta kalıyorsa öğrenci sayısı 2s+a'dır. Üçerli oturunca b sıra tamamen boş, diğer sıralar tam doluysa aynı sayı 3(s−b) olur. Eşitlenen şey oturma sayıları değil, değişmeyen öğrenci toplamıdır. 'Bir sırada bir kişi' gibi kısmi doluluk ayrıca belirtilirse o sırayı tam dolulardan çıkarıp tek kişiyi ayrıca eklemelisin.",
      "Atölyede sıra sayısını değiştirince iki düzenin saydığı öğrenciler farklılaşabilir. Bu, gerçek öğrencilerin kaybolması değil, seçilen sıra değerinin aynı sınıfı açıklamaya henüz uymamasıdır. Dengeyi kuran değeri bulduğunda iki toplam eşit olur. Boş sıra sayısı toplam sıradan büyük olamaz; ayakta kalan bir sayı zaten bütün sıra sayısına eklenir.",
    ),
    section(
      "İki tür nesnede sayım ve ağırlığı ayır",
      "Bir etkinlikte 20 bilet satılması ile 1700 TL gelir elde edilmesi iki farklı bilgidir. Öğrenci bileti x ise yetişkin bileti 20−x olur; her türün sayısı kendi fiyatıyla çarpılır. Bilet sayılarının toplamı 20, gelirlerin toplamı 1700 olmalıdır. Ücretlerle kişi sayılarını doğrudan toplamak birimleri karıştırır.",
      "Aynı yöntem iki ve dört tekerlekli araçlarda, farklı puanlı sorularda veya farklı kapasitedeki masalarda kullanılır. Hepsi birinci türden olsaydı toplamı hesaplamak da geçerli bir başlangıçtır; gerçek toplamla farkı, tür değişiminin birim etkisine bölersin. Bu kısa yol her türün katkısının sabit olduğu koşulda çalışır; değişken indirim veya kademeli puan varsa modeli yeniden kur.",
    ),
    section(
      "Kapasite eşitliği birimlerin oranını buldurur",
      "Aynı depo, her kutunun türüne göre farklı sayıda kutu alabilir. Küçük kutunun kapladığı alan a, büyük kutununki b ise 18 küçük+8 büyük ile 12 küçük+10 büyük aynı alanı doldurduğunda 18a+8b=12a+10b yazılır. Buradan 6a=2b ve b=3a çıkar; bir büyük üç küçük kutunun yerini alır.",
      "Burada a'yı keyfî bir santimetrekare değeri seçmek zorunda değilsin; istenen çoğu kez oran veya tek türden kapasitedir. Fakat bütün kutuların kendi türleri içinde aynı büyüklükte olduğu, boşluk veya istif farkı olmadığı belirtilmelidir. Başka bir düzende farklı boşluk payı varsa iki toplamı eşitlemek doğru olmaz. Bilinmeyenlerin gereksiz gerçek değerini aramadan sorulan yapıyı yakala.",
    ),
    section(
      "En az ve en çok eşitlikten fazlasını söyler",
      "'En az 30' x≥30, '30'dan fazla' x>30 demektir. Tam sayılı bir sonuç için x>7,2 koşulunun ilk uygun değeri 8'dir; x≥7 koşulunda 7 kabul edilir. Bütçe veya kapasite koşullarında denklem yerine eşitsizlik gerekir. Yalnız eşitliği çözmek sınırı verir; sınırın hangi tarafının uygun olduğunu ayrıca belirlemelisin.",
      "Sonucu bir alt ve bir üst adayla kontrol etmek güçlü bir son adımdır. 95 TL bütçeyle tanesi 12 TL olan üründen en çok 7 tane alınır: 7 tanesi 84 TL, 8 tanesi 96 TL'dir. Bölme sonucu 7,916… bir ürün adedi değildir. Sorunun doğası tam sayı gerektiriyorsa yuvarlama yönünü 'en az/en çok' koşulu belirler; normal yuvarlama kullanma.",
    ),
    section(
      "Denklemin kökü bağlamda da çözüm olmalı",
      "Kişi, bilet ve sıra sayısı doğal sayıdır; uzunluk ve para verilen kapsamda negatif olamaz. Denklem x=−3 veya x=4,5 verirse cebir hatası olmayabilir: seçilen model ya da veriler bağlamla uyuşmuyor olabilir. Önce ifadeleri tekrar oku; çözümü zorlamak için soru metninde olmayan varsayımlar ekleme.",
      "Kontrolü dört parçada yap: birimler uyuyor mu, bütün parçalar toplamı koruyor mu, ağırlıklı toplam isteneni veriyor mu, tüm ayrıntılar sağlanıyor mu? İki bilgi birbiriyle çelişirse 'geçerli çözüm yok' sonucu anlamlıdır. Bir yöntemin adını hatırlamak yerine hangi toplamın ve hangi koşulun korunduğunu söylemek, aynı yapıyı yeni bir bağlamda tanımanı sağlar.",
    ),
    ...numberProblemsSource017Sections,
  ],
  examples: [
    example(
      "Cümleyi parantezle çevir",
      "Bir sayının 5 fazlasının 3 katı, aynı sayının 5 katının 7 eksiğine eşittir. Sayı kaçtır?",
      "İki ifadenin aynı sayıyı anlattığını eşitlikle göster.",
      [
        ["Tanımla", "Aranan sayı x olsun."],
        ["Çevir", "İlk ifade 3(x+5), ikinci ifade 5x−7'dir.", "3(x+5)=5x−7"],
        [
          "Çöz",
          "Dağıt ve benzer terimleri birleştir.",
          "3x+15=5x−7 ⇒ 22=2x ⇒ x=11",
        ],
      ],
      "Sayı 11'dir.",
      "3·16=48 ve 5·11−7=48; iki ifade eşittir.",
      "5 fazlasının üç katını 3x+5 yazmak.",
    ),
    example(
      "Değişmeyen sınıfı iki kez say",
      "İkişerli oturulduğunda 4 kişi ayakta kalıyor. Üçerli oturulduğunda 3 sıra tamamen boş, diğer sıralar tam dolu. Sıra ve öğrenci sayısı kaçtır?",
      "Sıra sayısı s; aynı öğrenci toplamının iki ifadesini eşitle.",
      [
        [
          "İlk düzen",
          "Bütün s sıra ikişer dolu, ayrıca 4 kişi ayakta.",
          "N=2s+4",
        ],
        ["İkinci düzen", "Yalnız s−3 sıra doludur.", "N=3(s−3)"],
        ["Eşitle", "Aynı insanları iki biçimde sayıyoruz.", "2s+4=3s−9 ⇒ s=13"],
        [
          "İsteneni bul",
          "Öğrenci toplamını ilk düzenden çıkar.",
          "N=2·13+4=30",
        ],
      ],
      "13 sıra, 30 öğrenci.",
      "İkinci düzende 10 dolu sırada 3'er kişi vardır: 30; 3 sıra boş kalır.",
      "Boş sıraları 3s ifadesinden yalnız 3 kişi çıkararak modellemek.",
    ),
    example(
      "Ağırlıklı sayımı kur",
      "Bir müzede yetişkin bileti 140 TL, öğrenci bileti 80 TL. Toplam 20 biletle 2140 TL gelir elde edilmiştir. Öğrenci bileti sayısı kaçtır?",
      "Bilet adediyle gelir denklemini ayrı düşün.",
      [
        ["Parçala", "Öğrenci x ise yetişkin 20−x'tir."],
        [
          "Gelir",
          "Her adet kendi ücretine karşılık gelir.",
          "80x+140(20−x)=2140",
        ],
        [
          "Çöz",
          "Toplamı aç ve x'i yalnız bırak.",
          "2800−60x=2140 ⇒ 60x=660 ⇒ x=11",
        ],
      ],
      "11 öğrenci bileti.",
      "11·80+9·140=880+1260=2140; toplam 20 bilet.",
      "2140'ı ortalama bilet fiyatına bölerken tür sayılarını gözden kaçırmak.",
    ),
    example(
      "Sınırı adayla doğrula",
      "Bir atölye 75 TL sabit giriş ücreti, her çalışma için ayrıca 18 TL alıyor. Bütçesi 200 TL olan biri en çok kaç çalışma yapabilir?",
      "Bütçe aşılmamalı; adedi tam sayı seç.",
      [
        ["Eşitsizlik", "Sabit ücret her durumda bir kez alınır.", "75+18n≤200"],
        ["Sınır", "İki taraftan 75 çıkar.", "18n≤125 ⇒ n≤125/18"],
        [
          "Tam sayı kontrolü",
          "6 çalışma 183 TL, 7 çalışma 201 TL tutar.",
          "n en çok 6",
        ],
      ],
      "6 çalışma.",
      "183≤200 fakat 201>200; sınırın uygun tarafındaki en büyük tam sayı 6'dır.",
      "6,94 sonucunu normal yuvarlayıp 7'yi bütçeye sığdırmak.",
    ),
    ...numberProblemsSource017Examples,
  ],
  recall: [
    {
      prompt: "4 eksiğinin 2 katı ile 2 katının 4 eksiği neden farklıdır?",
      answer:
        "İlk işlem sırasıyla 2(x−4), ikincisi 2x−4'tür; parantez bütün farkı çarptırır.",
    },
    {
      prompt:
        "Aynı öğrenciler iki farklı oturma düzeninde anlatıldığında ne eşitlenir?",
      answer:
        "İki düzenin saydığı öğrenci toplamları eşitlenir; boş/kısmi/ayakta kalan ayrıntıları ayrı eklenir.",
    },
    {
      prompt:
        "İki tür bilette sayı ve gelir denklemleri hangi birimleri taşır?",
      answer:
        "x+y toplam bilet adedidir; fiyat·adet toplamları TL cinsinden gelirdir.",
    },
    {
      prompt: "Denklemden kesirli sıra sayısı çıkarsa ilk neyi denetlersin?",
      answer:
        "Sözel çeviri ve verilerin tutarlılığını; sıra sayısı doğal olmalı, kök bağlamda da bütün koşulları sağlamalıdır.",
    },
    ...numberProblemsSource017Recall,
  ],
  questions: [
    problem(
      "Bir sayının 4 katının 9 fazlası 61'dir. Sayı kaçtır?",
      "13",
      ["11", "15", "17", "20"],
      "Önce 4x+9=61 yaz.",
      "4x=52 olduğundan x=13. Yerine koyunca 52+9=61 olur. 61'den 4 çıkarmak veya 9'u çarpmadan önce sayıya eklemek cümlenin işlem sırasını değiştirir.",
    ),
    problem(
      "Bir sayının 6 eksiğinin 3 katı 42'dir. Sayı kaçtır?",
      "20",
      ["12", "16", "18", "24"],
      "Eksiltilen bütün ifade parantezde olmalı.",
      "3(x−6)=42 ⇒ x−6=14 ⇒ x=20. Kontrol 3·14=42. 3x−6 yazımı 6 eksiğinin üç katını değil, üç katının altı eksiğini anlatır.",
    ),
    problem(
      "Ardışık üç tek sayının toplamı 93'tür. Bu sayıların en büyüğü kaçtır?",
      "33",
      ["29", "30", "31", "35"],
      "Ortadaki sayıyı x, diğerlerini x−2 ve x+2 seç.",
      "Toplam 3x=93 ⇒ x=31. Sayılar 29,31,33; istenen ortadaki değil en büyük olan 33'tür. Ortak fark 1 seçilirse tek sayılık koşulu bozulur.",
    ),
    problem(
      "Bir sınıfta ikişerli oturulduğunda 2 kişi ayakta; üçerli oturulduğunda 4 sıra tamamen boş, diğer sıralar tam doludur. Toplam kaç öğrenci vardır?",
      "30",
      ["14", "26", "28", "32"],
      "Sıra sayısı s için iki toplamı eşitle.",
      "2s+2=3(s−4) ⇒ s=14. Öğrenci sayısı 2·14+2=30; ikinci düzende 10·3=30. Sıra sayısı 14 doğrudur ama sorulan nicelik öğrenci toplamıdır.",
    ),
    problem(
      "Bir otoparkta yalnız 2 tekerlekli bisikletler ve 4 tekerlekli otomobiller vardır. Toplam 16 araç ve 52 tekerlek olduğuna göre otomobil sayısı kaçtır?",
      "10",
      ["6", "8", "9", "12"],
      "Bütün araçlar bisiklet olsaydı tekerlek toplamını düşün.",
      "16 bisiklet 32 tekerlek verir. Fazladan 20 tekerlek, her bisikletin otomobile dönüşümünde eklenen 2'şer tekerlektir: 20/2=10. Kontrol 10·4+6·2=52; bisiklet sayısı olan 6 sorulmuyor.",
    ),
    problem(
      "Yetişkin bileti 100 TL, öğrenci bileti 60 TL olan bir etkinlikte toplam 15 biletle 1180 TL gelir elde edilmiştir. Kaç öğrenci bileti satılmıştır?",
      "8",
      ["5", "6", "7", "9"],
      "Öğrenci sayısını x, yetişkin sayısını 15−x seç.",
      "60x+100(15−x)=1180 ⇒ 40x=320 ⇒ x=8. Gelir 8·60+7·100=1180 ve toplam 15'tir. Türlere ait fiyatları aynı adetle çarpmak toplam bilet koşulunu yok sayar.",
    ),
    problem(
      "Aynı rafı 14 küçük ve 6 büyük kutu veya 8 küçük ve 8 büyük kutu tam dolduruyor. Aynı tür kutular özdeştir; boşluk farkı yoktur. Raf yalnız küçük kutularla doldurulursa kaç kutu alır?",
      "32",
      ["20", "26", "28", "36"],
      "İki kapasiteyi eşitleyip bir büyük kutuyu küçük kutu cinsinden bul.",
      "14a+6b=8a+8b ⇒ 6a=2b ⇒ b=3a. Raf kapasitesi 14a+18a=32a, yani 32 küçük kutudur. 14+6 yalnız karışık kutu sayısıdır; türlerin kapladığı yer aynı değildir.",
    ),
    problem(
      "Bir ürün 17 TL'dir. Başka ücret yoktur. 150 TL ile en çok kaç tane alınabilir?",
      "8",
      ["7", "9", "10", "17"],
      "n tam sayı ve 17n≤150 olmalı.",
      "150/17 yaklaşık 8,82'dir. 8 ürün 136 TL, 9 ürün 153 TL tutar. Bütçeyi aşmadan en büyük tam sayı 8'dir; normal yuvarlama ile 9 seçilemez.",
    ),
    problem(
      "Doğal sayı x, 'üç katı 20'den büyüktür' koşulunu sağlıyor. x'in alabileceği en küçük değer kaçtır?",
      "7",
      ["5", "6", "8", "20"],
      "Kesin büyüklüğü koruyarak 3x>20 çöz.",
      "x>20/3=6 tam 2/3 olur. İlk doğal sayı 7'dir; 3·6=18 sağlamaz, 3·7=21 sağlar. Sınırı 6'ya yuvarlamak büyüklük koşulunu ihlal eder.",
    ),
    problem(
      "Bir sınıfta 18 öğrenci olduğu ve her öğrencinin tam 2 kalemi bulunduğu söyleniyor. Aynı sınıfın toplam kalem sayısının 37 olduğu da belirtiliyor. Bu üç bilgi birlikte nasıl değerlendirilir?",
      "Bilgiler birbiriyle çelişir.",
      [
        "Toplam 36 öğrenci vardır.",
        "Bir öğrenci mutlaka 3 kalem taşır.",
        "Sınıfta 19 öğrenci vardır.",
        "Toplam kalem sayısı 38'dir.",
      ],
      "18·2 ile söylenen toplamı karşılaştır.",
      "Tam 18 öğrencinin her birinde tam 2 kalem varsa toplam zorunlu olarak 36'dır; 37 koşuluyla aynı anda sağlanmaz. Bir kişinin 3 kalemi olduğunu varsaymak verilmiş 'her biri tam 2' koşulunu değiştirir; doğru teşhis tutarsızlıktır.",
    ),
  ],
  source: numberProblemsSource017Summary,
};

const fractions: Pack = {
  id: "kesir-problemleri",
  topic: "detail-211",
  title: "Kesir problemleri: bütünü seç, kalanı izle",
  minutes: 65,
  objectives: [
    "Parça, bütün ve oranı ayır; her kesrin referansını adlandır.",
    "Başlangıcın kesri ile kalanın kesrini farklı modellerle hesapla.",
    "Tersinden bütün, parça farkı, birikimli değişim ve uzunluk problemlerini kontrol ederek çöz.",
  ],
  sections: [
    section(
      "Kesir hangi bütünün parçası?",
      "a/b kesri, bir bütün eşit b parçaya ayrıldığında bunların a tanesini anlatır; b sıfır olamaz. Bir miktarın 3/8'i, o miktarın 3/8 ile çarpımıdır. 160 sayfanın 3/8'i 60 sayfadır. Kesir bir orandır; sayfa veya litre birimi bütünden gelir. Aynı kesir farklı büyüklükteki bütünlerde aynı miktarı üretmez.",
      "Soruda bütüne N, parçaya P dersen P=(a/b)N yazarsın. Aranan N ise işlem tersine döner: N=P·b/a ve burada a da sıfır olmamalıdır. Bütün 0 değilken kesir 0 ise parça 0 olur; yalnız bu bilgi bütünü belirlemez. Denklem kurmadan önce '3/8'i neyin?' sorusunu cevaplamak gereksiz işlemi azaltır.",
    ),
    section(
      "Kullanılanı ve kalanı birbirinden ayır",
      "Bir paranın 2/7'si kullanıldıysa 5/7'si kalır; kullanılan ve kalan kesirlerin toplamı 1'dir. 350 TL için kullanılan 100, kalan 250 TL'dir. 'Geriye 250 TL kalmıştır' bilgisi (5/7)N=250 denklemini kurdurur. 2/7 ile 250'yi çarpmak, kalan verisini başlangıç sanmak olur.",
      "Çubuk modelde bütün tek bir uzunlukla temsil edilir; kullanılan bölüm ile kalan bölüm bu çubuğu tam kaplar. Bu miktar bölünebilir bir para veya sıvı olabilir. Kişi veya kitap adedi ise kesirli sonuç bağlama uygun olmayabilir. Örneğin 10 kişinin 1/3'ü ifadesi tam bir kişi grubu vermediğinden gerçek adet bilgisini yeniden denetlemek gerekir.",
    ),
    section(
      "Kalanın kesri yeni bir taban kullanır",
      "Önce bütünün 1/4'ü, sonra kalanın 2/3'ü harcanırsa ilk kalan 3N/4'tür. İkinci harcama (2/3)(3N/4)=N/2, son kalan (1/3)(3N/4)=N/4 olur. Sonuç N−N/4−2N/3 değildir; ikinci kesir başlangıç N'ye değil, ara kalana aittir. Her adımda eski kalan, yeni işlemin bütünü olur.",
      "Birden fazla aşama için kalan çarpanları çarpılır: N·(1−r₁)·(1−r₂)… . Bu zincir yalnız her kesir bir önceki kalana uygulanıyorsa geçerlidir. Atölyede ikinci kesrin referansını değiştir; aynı kesirlerle farklı bir sonucun çıkması bir hesap hatası değil, farklı bir cümlenin modellenmesidir. Harcanan toplamı son kalanı başlangıçtan çıkararak ayrıca denetleyebilirsin.",
    ),
    section(
      "Aynı başlangıçtan verilen parçalar toplanır",
      "Bir bütçenin 1/4'ü kiraya ve başlangıç bütçesinin 1/3'ü ulaşıma ayrılıyorsa toplam pay 1/4+1/3=7/12'dir. Kalan 5/12 olur. İki kesrin aynı bütüne ait olması toplama için gerekli bilgidir. 'Sonra' sözcüğü tek başına kalanın kesri anlamına gelmez; referansı açık metinden bulmalısın.",
      "Kesirlerin toplamı 1'i aşıyorsa, borçlanma veya ek kaynak belirtilmedikçe tümünü harcamak mümkün değildir. Başlangıcın 3/4'ü ile yine başlangıcın 2/3'ü, 17/12 eder; kalan miktarı negatif bir para diye sessizce kabul etme. Model bu durumda verilerin uygulanamaz olduğunu göstermelidir. Aynı iki kesir kalana ardışık uygulanırsa son kalan pozitiftir; koşul değişmiştir.",
    ),
    section(
      "Parçaların farkından bütüne dön",
      "Aynı pozitif bütünün a/b'si ve c/d'si arasındaki miktar farkı F ise |a/b−c/d|·N=F yazılır. Paydaları eşitlemek ya da kesirleri ortak ölçekte karşılaştırmak gerekir. 3/4 ile 2/5'in farkı 15/20−8/20=7/20'dir. Farkın hangi yönde alındığı metinde belliyse büyük parçadan küçük çıkarılır.",
      "İki parça farklı bütünlere aitse tek N çarpanı çıkartılamaz. Örneğin Ayşe'nin parasının yarısı ile Bora'nın parasının üçte biri arasında fark verilmişse Ayşe ve Bora'nın başlangıç paralarını aynı harfle yazmak ek bir eşitlik varsaymaktır. Oran veya başka ilişki verilmişse iki bütünü o ilişkiyle bağla. Sıfır fark ve eşit kesir de bütünü tek başına belirlemez.",
    ),
    section(
      "Geriye doğru çözüm hangi aşamayı geri alır?",
      "Son kalan R ve son aşamanın kalan oranı k biliniyorsa bir önceki miktar R/k'dır; k sıfır olmamalıdır. N'nin önce 1/3'ü, sonra kalanın 1/4'ü harcansın. Son kalan 90 ise sondan geri 90/(3/4)=120, sonra 120/(2/3)=180 bulunur. İleri model 180·2/3·3/4=90 ile aynı yapıdır.",
      "Bir aşamada tamamı tüketilmişse kalan çarpanı 0 olur. Sonuç 0'dan başlangıcı tek olarak geri getiremezsin; 10,100 veya başka birçok miktar sıfıra inebilir. Ters işlem yöntemi miktarın gerçekten o aşamadaki kalan olmasına bağlıdır. Harcanan miktar verilmişse onu kalmış gibi bölme; önce hangi parçanın bilindiğini açıkça adlandır.",
    ),
    section(
      "Kesirli büyüme ve kesirli azalma da çarpan kullanır",
      "Bir miktar 1/5 oranında artarsa yeni değer 6N/5'tir; 1/5'i kalır denirse N/5'tir. '1/5 azalır' ise 4N/5 olur. Benzer görünen bu ifadeler farklı çarpanlar üretir. İki kez aynı oranda artışta ikinci artış büyümüş miktara uygulanır; her seferinde aynı sabit miktarı eklemiş olmazsın.",
      "Örneğin 450'nin önce 1/3 artması 600, sonra yeni değerin 1/4 azalması 450 verir. Çarpanlar (4/3)(3/4)=1 olduğu için başlangıca dönülür; eşit oranlar oldukları için değil. +1/5 ve −1/5 art arda uygulanırsa (6/5)(4/5)=24/25 kalır. Bu yapı yüzde problemlerindeki değişen tabanın da temelidir.",
    ),
    section(
      "Uzunluk, hız ve birim kontrolü",
      "Bir telin bir ucundan L/5 kesilirse kalan telin orta noktası, kesilen uzunluğun yarısı kadar yer değiştirir: L/10. Eski ve yeni orta noktaları aynı koordinat doğrusu üzerinde yazmak bu sonucu açıklar. Her iki uçtan eşit kesim yapılırsa orta nokta yer değiştirmez; tek uç koşulunu gözden kaçırma.",
      "Bir işin kesirli parçaları farklı hızlarla yapılıyorsa süre=miktar/hız ilişkisiyle her parçanın süresini ayrı hesapla. Örneğin sayfa/(sayfa/gün)=gün olur. Toplam sayfa ile günlük hızı doğrudan toplamak anlamlı değildir. Son aşamada tam sayı adet, pozitiflik, kalanların toplamı ve ilk verilere geri dönüş kontrolünü birlikte yap; kesirleri erken yuvarlamak özellikle ters işlemlerde hatayı büyütür.",
    ),
    ...fractionProblemsSource018Sections,
  ],
  examples: [
    example(
      "Parçadan bütünü bul",
      "Bir tankın 5/12'si doludur ve içinde 75 L su vardır. Tankın kapasitesi kaç litredir?",
      "75'in hangi parçayı temsil ettiğini yaz.",
      [
        ["Tanımla", "Kapasite N litre olsun."],
        ["Denklem", "İçerik bütünün 5/12'sidir.", "(5/12)N=75"],
        ["Ters işlem", "İki tarafı 12/5 ile çarp.", "N=75·12/5=180"],
      ],
      "180 L.",
      "180·5/12=75 L; içerik kapasiteden küçüktür.",
      "75'i kapasite sanıp yeniden 5/12 ile çarpmak.",
    ),
    example(
      "Referans değişimini gör",
      "Bir paranın önce 1/3'ü, sonra kalanının 2/5'i harcanıyor. Son durumda 120 TL kaldığına göre başlangıç parası kaçtır?",
      "Kullanılan değil, kalan çarpanlarını izle.",
      [
        ["İlk kalan", "Başlangıcın 2/3'ü kalır.", "K₁=2N/3"],
        ["İkinci kalan", "Yeni tabanın 3/5'i kalır.", "K₂=(3/5)(2N/3)=2N/5"],
        ["Bütünü çöz", "Son kalan 120 TL'dir.", "2N/5=120 ⇒ N=300"],
      ],
      "300 TL.",
      "İlk 100 harcanır, 200 kalır; sonra 80 harcanır, 120 kalır.",
      "İkinci harcamayı 2N/5 alıp iki kesri başlangıçtan çıkarmak.",
    ),
    example(
      "Aynı bütündeki iki parça",
      "Bir gelirin başlangıçtaki 1/4'ü kiraya, başlangıçtaki 2/5'i gıdaya gidiyor. 2100 TL kaldığına göre gelir kaç TL'dir?",
      "İki kesrin referansı aynı olduğundan harcamaları topla.",
      [
        ["Toplam pay", "Ortak paydaya getir.", "1/4+2/5=5/20+8/20=13/20"],
        ["Kalan", "Bütünden toplam harcama oranını çıkar.", "1−13/20=7/20"],
        ["Denklem", "Kalan parçadan bütüne dön.", "(7/20)N=2100 ⇒ N=6000"],
      ],
      "6000 TL.",
      "1500+2400+2100=6000; üç parça bütünü korur.",
      "Kira sonrası kalan üzerinden gıda payı hesaplamak; metin başlangıcı söylüyor.",
    ),
    example(
      "Orta nokta için iki konumu yaz",
      "Bir telin sağ ucundan uzunluğunun 1/4'ü kesiliyor. Kalan telin orta noktası 12 cm yer değiştiriyor. Telin ilk uzunluğu kaç cm'dir?",
      "Sabit sol uca göre eski ve yeni orta noktaları karşılaştır.",
      [
        ["Eski konum", "Tel 0 ile L arasında, orta nokta L/2."],
        ["Yeni konum", "Tel 0 ile 3L/4 arasında kaldığından orta nokta 3L/8."],
        ["Fark", "Yer değiştirme L/2−3L/8=L/8'dir.", "L/8=12 ⇒ L=96"],
      ],
      "96 cm.",
      "24 cm kesilir; eski orta 48, yeni orta 36 cm'de, fark 12 cm.",
      "Orta noktanın kesilen uzunluğun tamamı kadar kaydığını sanmak.",
    ),
    ...fractionProblemsSource018Examples,
  ],
  recall: [
    {
      prompt:
        "Bir miktarın 3/7'si 24 ise başlangıcı bulmak için neden 7/3 ile çarparsın?",
      answer:
        "(3/7)N=24 denklemindeki sıfır dışı çarpanı tersine çevirirsin; başlangıç 56'dır.",
    },
    {
      prompt: "İkinci kesir 'kalanın' ise hangi oranlar çarpılır?",
      answer:
        "Birinci ve ikinci aşamaların kalan oranları çarpılır; ikinci harcama ara kalan üzerinden yapılır.",
    },
    {
      prompt: "İki kesri ne zaman doğrudan toplarsın?",
      answer:
        "Aynı başlangıç bütününün ayrı parçaları oldukları açıkça verildiğinde; farklı veya değişen tabanlarda doğrudan toplama yapılamaz.",
    },
    {
      prompt:
        "Bir aşamada %100 tüketim olursa başlangıca tek olarak geri dönülebilir mi?",
      answer:
        "Hayır. Son kalan sıfır birçok başlangıçla uyumludur; sıfır kalan çarpanına bölme yapılamaz.",
    },
    ...fractionProblemsSource018Recall,
  ],
  questions: [
    problem(
      "240 sayfalık bir kitabın 7/12'si okunmuştur. Kaç sayfa okunmuştur?",
      "140",
      ["100", "120", "160", "180"],
      "Önce 240'ı 12 eş parçaya ayır.",
      "Bir parça 240/12=20, yedi parça 140 sayfadır. 100 sayfa kalır, fakat soru okunanı soruyor; payda tek başına okunmuş oranı değil parçalama sayısını belirtir.",
    ),
    problem(
      "Bir miktarın 5/9'u 40'tır. Miktarın tamamı kaçtır?",
      "72",
      ["45", "56", "64", "81"],
      "(5/9)N=40 ilişkisinden bütüne dön.",
      "N=40·9/5=72. Sağlama 72·5/9=40 olur. 40'ı 5/9 ile yeniden çarpmak verilen parçanın başka bir parçasını bulur, başlangıç bütününü bulmaz.",
    ),
    problem(
      "Bir paranın önce 1/5'i, sonra kalanının 3/8'i harcanıyor. 250 TL kaldığına göre başlangıç parası kaç TL'dir?",
      "500",
      ["400", "450", "600", "625"],
      "Kalan çarpanları 4/5 ve 5/8'dir.",
      "Son kalan N·4/5·5/8=N/2=250 ⇒ N=500. İlk harcama 100, ikinci harcama 150, kalan 250'dir. 1/5 ile 3/8'i doğrudan toplamak ikinci kesrin tabanını değiştirir.",
    ),
    problem(
      "Bir bütçenin başlangıçtaki 1/3'ü ve yine başlangıçtaki 1/4'ü iki ayrı gider için kullanılıyor. 1000 TL kalıyor. Bütçe kaç TL'dir?",
      "2400",
      ["1800", "2000", "2500", "3000"],
      "İki kesir de aynı bütüne ait; kalan oranını bul.",
      "Harcanan 1/3+1/4=7/12, kalan 5/12'dir. (5/12)N=1000 ⇒ N=2400. 800+600+1000=2400; kalan çarpanlarını çarpmak bu cümlenin referansını değiştirir.",
    ),
    problem(
      "Pozitif bir sayının 3/4'ü ile 2/5'i arasındaki fark 42'dir. Sayı kaçtır?",
      "120",
      ["84", "105", "140", "168"],
      "Aynı bütünün iki parçasının oran farkı 7/20'dir.",
      "(3/4−2/5)N=(7/20)N=42 ⇒ N=120. Parçalar 90 ve 48'dir; fark 42. Kesirleri ayrı ayrı tersine uygulamak, aynı sayıya ait oldukları ilişkisini korumaz.",
    ),
    problem(
      "Bir değer 360'tan başlayıp önce 1/3 oranında artıyor, sonra yeni değerin 1/4'ü kadar azalıyor. Son değer kaçtır?",
      "360",
      ["270", "330", "390", "480"],
      "Artış ve azalış çarpanlarını sırayla yaz.",
      "360·4/3=480, sonra 480·3/4=360. Çarpanlar birbirinin tersidir. +1/3−1/4 işlemi, ikinci azalmanın değişen tabanını görmez ve bu süreci modellemez.",
    ),
    problem(
      "Bir telin yalnız sol ucundan uzunluğunun 1/5'i kesiliyor. Kalan telin orta noktası 9 cm kayıyor. İlk tel kaç cm'dir?",
      "90",
      ["45", "60", "75", "180"],
      "Orta nokta kesilen uzunluğun yarısı kadar kayar.",
      "Kesim L/5, orta nokta kayması L/10'dur. L/10=9 ⇒ L=90 cm. Kesilen 18 cm ve yarısı 9 cm'dir. Kaymayı kesimin tamamı sanmak yanlışlıkla 45 sonucunu verir.",
    ),
    problem(
      "150 soruluk bir setin 2/5'i günde 15 soru, kalan kısmı günde 10 soru çözülerek bitiriliyor. Her gün belirtilen miktar çözülüyor. Toplam kaç gün sürer?",
      "13",
      ["10", "11", "12", "15"],
      "Her parça için soru sayısını günlük soru sayısına böl.",
      "İlk 60 soru 60/15=4 gün, kalan 90 soru 90/10=9 gün sürer. Toplam 13 gün. 15 ile 10'un ortalamasını almak iki bölümün farklı büyüklüklerini hesaba katmaz.",
    ),
    problem(
      "Başlangıç parasının 3/4'ü, ardından yine başlangıç parasının 2/3'ü harcanmak isteniyor. Başlangıç para pozitif ve ek para ya da borç yok. Bu plan için ne doğrudur?",
      "İstenen toplam harcama başlangıç parasını aşar.",
      [
        "Başlangıcın 1/12'si kalır.",
        "Başlangıcın 1/4'ü kalır.",
        "Başlangıcın 1/3'ü kalır.",
        "Plan her pozitif başlangıç için uygulanabilir.",
      ],
      "Her iki kesir de başlangıç miktarına ait.",
      "3/4+2/3=17/12>1 olduğundan istenen iki harcama bütünden büyüktür. Negatif kalan gerçek bir uygulanabilir para değildir. İkinci kesir kalanın olsaydı sonuç değişirdi, fakat metinde bu yazmıyor.",
    ),
    problem(
      "Bir miktarın önce 1/4'ü, sonra kalanının 2/3'ü kullanılıyor. Başlangıç miktarının kaçta kaçı toplam kullanılmıştır?",
      "3/4",
      ["1/4", "1/2", "2/3", "11/12"],
      "Önce son kalan oranını bul, sonra 1'den çıkar.",
      "Son kalan (3/4)(1/3)=1/4, kullanılan 1−1/4=3/4'tür. İkinci kullanım başlangıcın (2/3)(3/4)=1/2'sidir; 1/4+1/2=3/4. 11/12 iki kesri yanlış tabanda toplar.",
    ),
  ],
  source: fractionProblemsSource018Summary,
};

const ages: Pack = {
  id: "yas-problemleri",
  topic: "detail-212",
  title: "Yaş problemleri: aynı tarihi aynı sütunda tut",
  minutes: 60,
  objectives: [
    "Kişi, tarih ve yaş bilgilerini tabloyla ayır.",
    "Sabit yaş farkıyla değişen oranı, grup toplamıyla ortalamayı ilişkilendir.",
    "Çapraz zaman, doğum yılı ve eşitsizlik sorularını mümkünlük kontrolüyle çöz.",
  ],
  sections: [
    section(
      "Her yaşın bir kişisi ve bir tarihi vardır",
      "Bugün yaşı x olan kişi, t yıl sonra x+t yaşında olur; geçmiş için t negatiftir. Örneğin 18 yaşındaki biri beş yıl önce 13 yaşındadır. Bir denklemde x'i bazen bugünkü bazen geçmişteki yaş gibi kullanmak iki farklı niceliği karıştırır. Önce bugün sütununu yaz, sonra her olaya ayrı tarih sütunu aç.",
      "Sorular çoğunlukla yıllar üzerinden ideal bir model kurar. Tam doğum tarihi verilirse ay ve gün de önem taşır: 2010 doğumlu biri 2026'nın her gününde tam 16 yaşında değildir. '2026'da 16 yaşına girer' ile belirli bir günde tamamlanmış yaşı ayır. Tarih ayrıntısı yoksa soru metninin kullandığı yıl farkı modelini açık tut, ek doğum günü varsayma.",
    ),
    section(
      "Aynı anda herkes aynı süre yaşlanır",
      "A ve B'nin bugünkü yaşları a ve b olsun. Aynı t kadar zaman geçince fark (a+t)−(b+t)=a−b'dir. Bu nedenle iki kişinin yaş farkı doğumlarından sonraki ortak tarihlerde sabit kalır. 'Kardeşi doğduğunda 7 yaşındaydı' bilgisi, yaş farkının 7 yıl olduğunu verir; bir kişinin yaşı sabit 7 kalmaz.",
      "Farkın sabitliği oranın sabitliği değildir. 30 ve 18 yaşları oranı 5/3 iken altı yıl sonra 36/24=3/2 olur. Atölyede aynı zaman çizgisinde iki yaşın birlikte kayışını izle. Aradaki dikey mesafe aynı, çizgi üzerindeki iki değerin bölümü farklıdır. Oranı paydası sıfır olan bir tarihte hesaplamaya çalışma.",
    ),
    section(
      "Toplam n kez, ortalama bir kez değişir",
      "Aynı n kişinin yaş toplamı S ise t yıl sonra S+nt olur. Üç kişilik toplam 51 iken dört yıl sonra toplam 63'tür; her biri dört yıl yaşlanır. Ortalama S/n'den S/n+t'ye çıkar. Toplamın yalnız t arttığını yazmak grupta tek kişi varmış gibi davranmaktır.",
      "Bu kural iki tarihte de aynı kişilerin grupta olmasına bağlıdır. Yeni doğan biri gruba katılırsa veya bir kişi ayrılırsa önce grup listesini güncelle. Örneğin 20 ve 30 yaşındaki iki kişi beş yıl sonra 25 ve 35'tir; yeni doğan üçüncü kişi eklenince ortalama 60/3=20 olur, önceki ortalamaya yalnız 5 eklenmez. Kişi sayısı formülün bir parçasıdır.",
    ),
    section(
      "Oranı verildiği zamandaki yaşlarla kur",
      "Bugün yaşlar 2:5 oranındaysa 2k ve 5k yazabilirsin. Altı yıl sonra küçük büyük yaşın yarısı olacaksa 2(2k+6)=5k+6 kurulur. Zaman eklemesi oran katsayılarına değil, gerçek yaşlara uygulanır. Bu eşitlikte 2 her iki terimi çarpar: 4k+12=5k+6.",
      "Bugün için bulunan k, geçmiş ve gelecekte her yaşa yeniden eklenen bir artış değildir. k=6 için yaşlar 12,30; altı yıl sonra 18,36 olur. Küçük kişinin oranı zamanla 1'e yaklaşabilir, fakat yaşlar eşit olmadığı sürece sonlu zamanda yaş farkı sıfıra inmez. Yaş oranı hakkında ezber yerine farkı ve zaman sütununu birlikte kullan.",
    ),
    section(
      "Birinin bugünü, ötekinin geçmişi olabilir",
      "A bugün B'den d yaş büyükse A'nın B'nin bugünkü yaşında olduğu tarih d yıl öncedir. O sütunda A=b, B=b−d olur. B'nin bugünkü b yaşını da geriye taşıyıp hedefi değiştirme; 'bugünkü' sözcüğü sabit bir yaş değeri seçer. Bu cümlede üç ayrı yaş hücresi vardır: A bugün, B bugün, B o tarihte.",
      "Ters cümlede B, A'nın bugünkü yaşına geldiğinde d yıl geçer. O tarihte B=a, A=a+d olur. Hangi yöne gidildiğini önce okla belirtmek işaret hatasını önler. Bulunan geçmiş tarihte B'nin yaşı negatifse iki kişinin de yaşadığı bir zaman değildir; o koşul uygulanamaz. Cebirsel çözümü fiziksel zaman çizgisine geri yerleştir.",
    ),
    section(
      "Doğum yılı ile geçen süre ters ilişkilidir",
      "Yıl temelli modelde bakılan yıl Y, doğum yılı D ise yaş Y−D olur. Y sabitken doğum yılı üç yıl daha erken olsaydı yaş üç yıl fazla olurdu; daha geç olsaydı üç yıl eksik olurdu. Bakılan yılı değiştirmek ile doğum yılını değiştirmek aynı işlem değildir. İki kişinin yaşlarını aynı takvim yılında karşılaştırdığında doğum yılı farkı ters yönde yaş farkına dönüşür.",
      "Yıldönümü veya hizmet süresi soruları aynı matematikle çözülebilir: açılış yılına geçen süre eklenir. Ancak bir kurumun 20 yıllık olması onu insanlarla yapılan yaş toplamının otomatik üyesi yapmaz. Sözel benzerlikten çok hangi niceliklerin toplandığını izle. Ay ve gün verilirse önce o yıl yıldönümünün geçip geçmediğini kontrol et.",
    ),
    section(
      "En az koşulu ve tam yıl seçimi",
      "Üç kişinin bugünkü toplamı 31 olsun. Ortalamalarının en az 15 olması için (31+3t)/3≥15, dolayısıyla t≥14/3 gerekir. Tam yıl sonra sorulursa ilk uygun t=5'tir; 4 yıl sonra toplam 43 ile ortalama 15'in altında kalır. Gerçek süre soruluyorsa 14/3 yılı keyfî biçimde tam sayıya çevirme.",
      "Kesin büyüklük ile dahil sınırı ayır: ortalama 15'ten büyük istenirse eşitlik yeterli değildir. Kişi sayısı değiştiğinde toplam kuralını olaydan önce ve sonra ayrı kur. Doğumdan önceki bir kişiyi negatif yaşla gruba eklemek yerine, metnin o tarihte hangi kişileri içerdiğini yeniden yaz. En küçük aday kontrolü sınır hatasını yakalar.",
    ),
    section(
      "Tablo, denklem ve grafik aynı kontrolü destekler",
      "Bir tabloya her kişi için bugün, istenen geçmiş ve istenen gelecek yaşını yaz. Her sütunda aynı t kaymasını uyguladığında farkların sabitliği görünür olur. Grafikte yaş doğrularının eğimi yılda bir yıldır; aynı ölçek kullanıldığında doğrular paraleldir. Çizimlerin eğimini keyfî farklı çizmek farklı hızla yaşlanma izlenimi yaratmamalıdır.",
      "Sonucun kontrolünde tek oran yetmez: tüm tarihlerde yaşlar mümkün mü, verilen fark korunuyor mu, toplam ve oran doğru sütunda mı? Soruda tam sayı yaş varsayılmışsa parite de iş görür: toplam ve fark aynı paritede olmalı ki (S±d)/2 tam sayı olsun. Tamamlanmış yaş ile kesirli süre modelinin kapsamını birbirine karıştırmadan cevabı kişi ve tarihle birlikte söyle.",
    ),
    ...ageProblemsSource019Sections,
  ],
  examples: [
    example(
      "Sabit grupta toplamı geri taşı",
      "Dört arkadaşın üç yıl sonraki yaş toplamı 84. Bugünkü yaş ortalaması kaçtır?",
      "Toplam artışı kişi sayısı ile süreyi çarpar.",
      [
        ["Toplam artış", "Dört kişi üçer yıl yaşlanır.", "4·3=12"],
        ["Bugünkü toplam", "Gelecekteki toplamdan artışı çıkar.", "S=84−12=72"],
        ["Ortalama", "Bugünkü toplamı dört kişiye böl.", "72/4=18"],
      ],
      "18 yaş.",
      "Üç yıl sonra ortalama 21 ve 4·21=84 olur.",
      "84'ten yalnız 3 çıkarıp her kişinin yaşlanmasını atlamak.",
    ),
    example(
      "İki zamandaki oran",
      "İki kardeşin bugünkü yaşları 2:5 oranındadır. Altı yıl sonra küçük kardeş büyük kardeşin yaşının yarısında olacaktır. Bugünkü yaşları kaçtır?",
      "Bugün ortak katsayı, gelecek sütununda eşit zaman kayması kullan.",
      [
        ["Bugün", "Yaşlar 2k ve 5k olsun."],
        ["Gelecek oran", "İki gelecekteki yaşı aynı anda yaz.", "2(2k+6)=5k+6"],
        ["Çöz", "4k+12=5k+6, böylece k=6.", "2k=12; 5k=30"],
      ],
      "12 ve 30 yaş.",
      "Altı yıl sonra 18 ve 36; 18,36'nın yarısıdır. Bugün 12:30=2:5.",
      "Altı yılı yalnız küçük kardeşe eklemek veya bugünkü oranı gelecekte aynen korumak.",
    ),
    example(
      "Sabit hedefle geçmişi bul",
      "Ada, Bora'dan 10 yaş büyüktür. Ada, Bora'nın bugünkü yaşındayken ikisinin yaş toplamı 34'tü. Bugünkü yaşlar kaçtır?",
      "Sabit hedef Bora'nın bugünkü yaşı; zaman kayması −10 yıldır.",
      [
        ["Bugün", "Bora b, Ada b+10 olsun."],
        [
          "Geçmiş sütunu",
          "10 yıl önce Ada b, Bora b−10 yaşındadır.",
          "b+(b−10)=34",
        ],
        ["Çöz ve dön", "2b=44 ⇒ b=22; Ada=32."],
        ["Kontrol", "10 yıl önce 22 ve 12 yaşları toplamı 34'tür."],
      ],
      "Ada 32, Bora 22 yaşındadır.",
      "Bugünkü fark 10, geçmiş fark 10; ikisi de geçmişte doğmuş durumdadır.",
      "Geçmişe giderken Bora'nın bugünkü hedef yaşını da değiştirmek.",
    ),
    example(
      "Tam yıl sınırını denetle",
      "Bugün yaşları 5,11,15 olan üç kişinin yaş ortalaması ilk kez kaç tam yıl sonra en az 15 olur? Grup değişmiyor.",
      "Sabit grubun toplamını taşı, sonra tam sayı sınırını kontrol et.",
      [
        ["Bugün", "Toplam 31 ve kişi sayısı 3'tür."],
        [
          "Koşul",
          "t yıl sonra ortalama en az 15 olsun.",
          "(31+3t)/3≥15 ⇒ t≥14/3",
        ],
        ["İlk tam yıl", "t=5 ilk uygun tam sayıdır."],
        ["Komşu aday", "4 yılda 43/3<15, 5 yılda 46/3>15."],
      ],
      "5 tam yıl sonra.",
      "Aynı üç kişi için toplam yılda 3 artar; t=5 koşulu sağlar, t=4 sağlamaz.",
      "14/3'ü 4'e yuvarlamak veya toplamı yalnız t artırmak.",
    ),
    ...ageProblemsSource019Examples,
  ],
  recall: [
    {
      prompt: "Yaş farkı sabitken oran da sabit midir?",
      answer:
        "Hayır; iki yaşa aynı sayı eklenir, fark korunur ama bölüm genellikle değişir. Payda sıfırsa oran tanımlanmaz.",
    },
    {
      prompt: "Aynı beş kişinin toplamı iki yılda kaç artar?",
      answer: "5·2=10 yıl artar; ortalamaları 2 yıl artar.",
    },
    {
      prompt:
        "A, B'den d büyükken A'nın B'nin bugünkü yaşındaki tarihe nasıl gidilir?",
      answer:
        "d yıl geriye gidilir; A=b, B=b−d olur. B'nin o tarihte doğmuş olması denetlenir.",
    },
    {
      prompt:
        "Yalnız doğum yılı bir kişinin belirli bir gündeki tam yaşını verir mi?",
      answer:
        "Her zaman vermez; o yıl doğum gününün geçip geçmediği için ay/gün gerekebilir. Yıl temelli model bu ayrıntıdan ayrılır.",
    },
    ...ageProblemsSource019Recall,
  ],
  questions: [
    problem(
      "Bugün 24 yaşında olan biri 7 yıl önce kaç yaşındaydı?",
      "17",
      ["7", "16", "24", "31"],
      "Geçmiş için zaman kayması negatiftir.",
      "24−7=17. Yedi yılı eklemek gelecek yaşı olan 31'i verir. Aynı kişinin geçmişteki yaşı bugünkünden küçük olmalı; 17+7=24 kontrolü doğru sütunu doğrular.",
    ),
    problem(
      "Yaşları bugün 17 ve 29 olan iki kişinin 8 yıl sonraki yaş farkı kaçtır?",
      "12",
      ["4", "8", "20", "28"],
      "İki kişiye de aynı 8 yılı ekle.",
      "Gelecek yaşlar 25 ve 37; fark 37−25=12. Bugün 29−17 de 12'dir. Toplama eklenen süreler farkta birbirini yok eder; farkı 8 artırmak yalnız bir kişinin yaşlandığını varsayar.",
    ),
    problem(
      "Aynı üç kişinin bugünkü yaş toplamı 54'tür. Beş yıl sonraki yaş toplamı kaçtır?",
      "69",
      ["59", "64", "72", "81"],
      "Toplam üç kişinin her birindeki 5 yıllık artışı içerir.",
      "54+3·5=69. Ortalama bugün 18, gelecekte 23'tür; 23·3=69. Yalnız 54+5 yapmak toplamla kişi başı ortalamayı karıştırır.",
    ),
    problem(
      "Aynı dört kişinin iki yıl önceki yaş ortalaması 16'dır. Bugünkü yaş toplamı kaçtır?",
      "72",
      ["64", "66", "68", "80"],
      "Sabit grubun ortalaması iki yıl artar.",
      "Bugünkü ortalama 18, toplam 4·18=72. Alternatif: eski toplam 4·16=64'e 4·2=8 eklenir. 16+8 ortalamaya yanlış kişi sayısı çarpanını ekler.",
    ),
    problem(
      "Bir çocuğun bugünkü yaşı x'tir. Bugün sabit tutulduğunda çocuk 3 yıl daha erken doğmuş olsaydı bugünkü yaşı hangi ifade olurdu?",
      "x+3",
      ["x−3", "3x", "x/3", "3−x"],
      "Doğum tarihi erkene kayarsa geçen süre artar.",
      "Aynı bugüne daha erken bir doğumdan ulaşmak 3 yıl daha uzun yaşamış olmak demektir; yaş x+3 olur. x−3, üç yıl daha geç doğma koşulunun karşılığıdır; bugünün tarihi değiştirilmemiştir.",
    ),
    problem(
      "İki kardeşin bugünkü yaşları 3:5 oranındadır. Dört yıl sonra yaşları 2:3 oranında olacaktır. Küçük kardeş bugün kaç yaşındadır?",
      "12",
      ["8", "10", "15", "20"],
      "Yaşları 3k,5k seç; gelecekte oranı yeniden kur.",
      "(3k+4)/(5k+4)=2/3 ⇒ 9k+12=10k+8 ⇒ k=4. Küçük yaş 12'dir. Büyük 20, dört yıl sonra 16:24=2:3 olur; k=4 yaşın kendisi değildir.",
    ),
    problem(
      "Ada bugün 30, Bora 18 yaşındadır. Ada, Bora'nın bugünkü yaşındayken Bora kaç yaşındaydı?",
      "6",
      ["12", "18", "24", "42"],
      "Ada'nın 30'dan sabit hedef 18'e inmesi kaç yıl sürer?",
      "12 yıl geriye gidilir. O tarihte Bora 18−12=6 yaşındadır; Ada 18'dir. Bora'nın bugünkü yaşı hedef olarak sabittir; onu da hedefle birlikte kaydırmak çapraz zaman ifadesini değiştirir.",
    ),
    problem(
      "Dört yıl önce iki kardeşin yaş toplamı 28'di. Bugün büyük olan diğerinden 6 yaş büyüktür. Büyük kardeş bugün kaç yaşındadır?",
      "21",
      ["15", "17", "18", "24"],
      "Bugünkü toplam ile sabit farkı aynı sütunda birleştir.",
      "Bugünkü toplam 28+2·4=36, fark 6'dır. Büyük yaş (36+6)/2=21, küçük 15. Dört yıl önce 17 ve 11 toplam 28'dir. Geçmiş toplamla bugünkü tek yaşı doğrudan karıştırma.",
    ),
    problem(
      "Bugün yaşları 8 ve 14 olan iki kişi için 10 yıl önceki yaşlar aynı iki kişinin doğumdan sonraki yaşları olarak alınabilir mi?",
      "Hayır; küçük kişi o tarihte henüz doğmamıştır.",
      [
        "Evet; yaşlar 2 ve 4'tür.",
        "Evet; yaş farkı o tarihte sıfırdır.",
        "Evet; küçük kişinin yaşı −2 olarak kabul edilir.",
        "Hayır; büyük kişinin yaşı 24 olur.",
      ],
      "Her iki yaşa da −10 uygula, sonra mümkünlük kontrolü yap.",
      "Cebir 8−10=−2 ve 14−10=4 verir. −2, doğumdan sonraki bir yaş değildir; küçük kişi o tarihte doğmamıştır. Farkın cebirsel korunması o kişinin geçmiş grubun üyesi olduğunu kanıtlamaz.",
    ),
    problem(
      "Yaş toplamı bugün 31 olan aynı üç kişinin yaş ortalaması kaç tam yıl sonra ilk kez en az 15 olur?",
      "5",
      ["3", "4", "6", "7"],
      "(31+3t)/3≥15 eşitsizliğini çöz.",
      "31+3t≥45 ⇒ t≥14/3. İlk uygun tam sayı 5'tir; dört yıl sonra 43/3<15, beş yıl sonra 46/3≥15. En az koşulu eşitliği içerir ama 14/3'ü aşağı yuvarlatmaz.",
    ),
  ],
  source: ageProblemsSource019Summary,
};

const percentages: Pack = {
  id: "yuzde-problemleri",
  topic: "detail-213",
  title: "Yüzde problemleri: tabanı izle, değişimi çarpanla kur",
  minutes: 65,
  objectives: [
    "Yüzde, parça ve bütün ilişkisini doğru tabanla kur.",
    "Art arda değişim, ters değişim ve yüzde puanını ayır.",
    "Grup ağırlığı, birim fiyat ve alan değişimini koşullarıyla hesapla.",
  ],
  sections: [
    section(
      "Yüzde yüz eş parçalık bir oran dilidir",
      "%p, p/100 demektir: %25=1/4=0,25. Bütün B, onun %p'lik parçası P ise P=B·p/100 olur. 320 TL'nin %15'i 48 TL'dir. p'nin birimi yoktur; P'nin birimi bütünden gelir. Bir oranı yüzdeye çevirmek için 100 ile çarparsın; % işaretini ayrıca bir kez daha uygulamak oranı yeniden yüze böler.",
      "Verilen hangi nicelik? %20'si 60 olan bütün için 0,20B=60 ve B=300 bulunur. 60'ın 300'e oranı %20'dir. Payda, parçası olunan bütündür; 300/60 işlemi aynı soruya cevap vermez. B=0 iken parçanın bütüne yüzdesi bu bölme yoluyla tanımlanamaz. %0'lık parça 0 olduğundan yalnız o parçadan bütün tek olarak bulunmaz.",
    ),
    section(
      "Artış ve azalışı tek çarpana çevir",
      "%a artış çarpanı 1+a/100, %a azalış çarpanı 1−a/100'dür. 240'ın %25 artmışı 240·1,25=300; %25 azalmışı 240·0,75=180 olur. Normal bir miktar azalışında 0≤a≤100 alınır. %100 azalış sıfıra indirir; negatif bir kalan üretmek, soruda başka borç modeli yoksa anlamlı değildir.",
      "Değişim yüzdesi eski değer E≠0 için 100·(Y−E)/E'dir. Pozitif E ile işaret artış veya azalışı gösterir. Birimlerin aynı olması gerekir: 500 g ile 0,4 kg'ı karşılaştırmadan önce ortak birime çevir. Atölyedeki çubuklar miktarları aynı ölçekle gösterir; sonuç metni miktarı ve başlangıca göre net yüzdeyi birlikte söyler.",
    ),
    section(
      "Art arda yüzdelerde her aşama yeni taban alır",
      "Önce %20 artış, sonra yeni değere %20 azalış uygulandığında N·1,20·0,80=0,96N kalır. İlk eklenen 0,20N, sonra çıkarılan 0,24N'dir. Eşit yüzde sayıları eşit miktarlar anlamına gelmez. İki değişim çarpanla birleşir; +20−20=0 hesabı tabanların aynı olduğunu yanlış varsayar.",
      "Yalnız orantılı değişimler varsa çarpmanın değişme özelliği nedeniyle sıraları sonucu değiştirmez. Araya sabit 10 TL indirim, yuvarlama veya farklı bir taban girerse sıraları değiştiremezsin: 100'e %20 ekleyip 10 çıkarmak 110; önce 10 çıkarıp %20 eklemek 108'dir. Kısayolun geçerli koşulunu cümlede kontrol et, her çok adımlı problemde otomatik uygulama.",
    ),
    section(
      "Ters yüzde aynı yüzdeyi geri eklemek değildir",
      "%20 azalıştan sonra 160 kalmışsa başlangıç 160/0,80=200'dür. 160'a %20 eklemek 192 verir; artık taban 160 olmuştur. Azalışı geri almak için gereken göreli artış 40/160=%25'tir. Genel olarak azalış oranı r<1 ise geri dönüş çarpanı 1/(1−r)'dir.",
      "İlk ve son değer arasındaki fark sabit kalabilir, fakat bu farkın bölündüğü taban değişir. A, B'den %25 fazla ise A=1,25B; B'nin A'dan eksikliği (A−B)/A=%20'dir. %100 düşüşten sonra sıfır değeri herhangi bir sonlu yüzdeyle artırmak pozitif başlangıcı geri getirmez. Sıfır çarpanı tersine bölmeye çalışma.",
    ),
    section(
      "Yüzde puanı ile göreli değişim farklı sorulardır",
      "Bir başarı oranı %30'dan %42'ye çıktığında artış 12 yüzde puandır. Eski orana göre göreli artış ise (42−30)/30·100=%40'tır. İki sayı da doğrudur, ama farklı nicelikleri ölçer. Yüzde puanında iki yüzde değerini çıkarırsın; göreli değişimde ayrıca eski oranı payda yaparsın.",
      "Aynı ayrım doluluk, katılım veya kusur oranı için de geçerlidir. Oran %0'dan %10'a çıktığında 10 yüzde puan artış vardır; sıfıra bölerek göreli artış yüzdesi bulunamaz. Soruda istenenin oran farkı mı, kişi sayısı farkı mı yoksa göreli büyüme mi olduğunu adlandır. Birine ait sonucu ötekinin birimiyle yazma.",
    ),
    section(
      "Farklı grupları adetlerle birleştir",
      "20 kişilik grupta %25 katılım 5 kişi, 60 kişilik grupta %75 katılım 45 kişidir. Birleşik katılım (5+45)/(20+60)=50/80=%62,5 olur. %25 ile %75'in aritmetik ortalaması %50'dir ama gruplar eşit büyüklükte olmadığı için bu örneğin cevabı değildir. Her grup kendi kişi sayısıyla ağırlıklandırılır.",
      "Toplam kişi sayısı sabit, grup büyüklüğü bilinmiyorsa katılan adetlerinin toplamından denklem kur. Gruplar ayrı değilse aynı kişiyi iki kez saymamak için kesişim bilgisi gerekir. Yalnız yüzdeler veriliyorsa birleşik oranı tek sayı olarak bulmak mümkün olmayabilir. Gruptaki adetleri önce hesaplamak formül ezberini azaltır ve sonucun iki oran arasında olup olmadığını denetlemeyi kolaylaştırır.",
    ),
    section(
      "Paket fiyatıyla birim fiyat aynı değişken değildir",
      "Bir paket 500 g iken 200 TL, sonra 400 g iken 192 TL olsun. Paket etiketi %4 düşer; gram fiyatı 0,40'tan 0,48 TL/g'ye çıkar ve %20 artar. Miktar fiyatla birlikte değişiyorsa doğrudan etiket fiyatlarını kıyaslamak kullanıcının aldığı birim başına maliyeti göstermez. Önce ikisini de TL/g veya TL/kg gibi aynı ölçüye çevir.",
      "Birim fiyat çarpanı, toplam fiyat çarpanının miktar çarpanına bölümüdür: 0,96/0,80=1,20. Paydadaki miktar sıfır olamaz. Aynı ürün türü, kalite ve kapsam karşılaştırılıyorsa bu oran anlamlıdır; farklı içerikleri yalnız ağırlığına göre eşitleme. Vergi veya sabit ücret yalnız verilmişse eklenir, gerçek alışverişte olabilecek her ayrıntı sınav modeline kendiliğinden taşınmaz.",
    ),
    section(
      "Alan ve toplam maliyette çarpanları birlikte taşı",
      "Dikdörtgenin kenarları a ve b iken alan ab'dir. Her iki kenar %10 büyürse yeni alan 1,10a·1,10b=1,21ab, yani %21 büyür. Yalnız tek kenar değişirse alanın çarpanı yalnız o kenarın çarpanıdır. Uzunluğun yüzdesini alan yüzdesi sanmak boyutları karıştırır; hacimde üç bağımsız uzunluk çarpanı bulunabilir.",
      "Toplam maliyet alanla ve birim alan fiyatıyla orantılıysa yeni toplam çarpanı alan çarpanı ile birim fiyat çarpanının çarpımıdır. Alan %44 artarken birim fiyat %25 azalırsa toplam 1,44·0,75=1,08 kat, yani %8 artar. Sabit hizmet bedeli varsa onu ayrı ekle. Sonuç kontrolünde yalnız oranlar verilmişse 100 birim temsil seçilebilir; sabit TL farkı varsa ölçeği bilinmeyenle koru.",
    ),
    ...percentProblemsSource020Sections,
  ],
  examples: [
    example(
      "Parçadan başka parçaya",
      "Bir paranın %12'si 42 TL'dir. Aynı paranın %35'i kaç TL'dir?",
      "Önce tabanı bul veya aynı tabana ait yüzde birimi kullan.",
      [
        ["Bütün", "0,12B=42 ⇒ B=350 TL."],
        ["İstenen parça", "Bulunan bütüne %35 uygula.", "350·35/100=122,5"],
        ["Kontrol", "%1, 3,5 TL olduğundan %35, 35·3,5 TL'dir."],
      ],
      "122,5 TL.",
      "42/350=0,12 ve 122,5/350=0,35.",
      "42'nin %35'ini hesaplamak; 42 parçasını bütün yapmak.",
    ),
    example(
      "Aynı yüzde birbirini götürmez",
      "Bir değer önce %30 artıyor, sonra yeni değerden %30 azalıyor. Başlangıca göre net değişim nedir?",
      "Her aşamanın çarpanını kur.",
      [
        ["İlk aşama", "Artış çarpanı 1,30."],
        [
          "İkinci aşama",
          "Yeni miktarın %70'i kalır.",
          "Yeni=1,30·0,70·E=0,91E",
        ],
        ["Net değişim", "Son değer başlangıcın %91'i.", "(0,91−1)·100=−9"],
      ],
      "%9 azalış.",
      "Başlangıç 200 seçilirse 260 ve 182; fark −18, −18/200=−%9.",
      "+30−30=0 yaparak iki aşamanın taban farkını silmek.",
    ),
    example(
      "Grupları ağırlıklandır",
      "20 kişilik A grubunun %25'i, 60 kişilik B grubunun %75'i etkinliğe katılıyor. Gruplar ayrı. Birleşik katılım yüzdesi nedir?",
      "Katılan adetlerini topla, toplam grup büyüklüğüne böl.",
      [
        ["Katılanlar", "A'da 5, B'de 45 kişi katılır."],
        ["Toplam", "Toplam 50 katılan, 80 kişi vardır."],
        ["Yüzde", "50/80'i yüzdeye çevir.", "(50/80)·100=62,5"],
      ],
      "%62,5.",
      "Oran %25 ile %75 arasındadır ve büyük grubun oranına daha yakındır.",
      "Grup boyları farklıyken yüzdelerin düz ortalamasını almak.",
    ),
    example(
      "Birim fiyatı aynı birimle ölç",
      "500 gramlık paket 200 TL'den satılırken yeni 400 gramlık paket 192 TL oluyor. Gram fiyatının değişimi nedir?",
      "Miktar ve toplam fiyatın çarpanlarını ayır.",
      [
        ["Eski birim", "200/500=0,40 TL/g."],
        ["Yeni birim", "192/400=0,48 TL/g."],
        [
          "Değişim",
          "Eski birim fiyata göre farkı böl.",
          "(0,48−0,40)/0,40·100=20",
        ],
      ],
      "Birim fiyat %20 artmıştır.",
      "Kilogram karşılıkları 400 ve 480 TL; 80/400=%20.",
      "Paket fiyatının %4 azalmasını birim fiyat azalması sanmak.",
    ),
    ...percentProblemsSource020Examples,
  ],
  recall: [
    {
      prompt: "Bir değerin %a artmışı için neden 1+a/100 ile çarparsın?",
      answer: "Başlangıcın tamamı 1 kat korunur, üzerine a/100 katı eklenir.",
    },
    {
      prompt: "%20 azalışı geri almak için gereken artış neden %25?",
      answer:
        "100→80 düşüşünde kayıp 20'dir; geri dönüşte taban 80 olduğundan 20/80=%25 gerekir.",
    },
    {
      prompt: "%30'dan %42'ye artışın iki farklı ölçüsü nedir?",
      answer:
        "12 yüzde puan; eski %30 oranına göre %40 göreli artış. Hangi ölçünün istendiğini adlandırmalısın.",
    },
    {
      prompt: "Farklı büyüklükteki grupların yüzdelerini nasıl birleştirirsin?",
      answer:
        "Her gruptaki adetleri bulup topla, toplam grup büyüklüğüne böl. Aritmetik ortalama ancak eşit ağırlık gibi uygun koşullarda geçerlidir.",
    },
    ...percentProblemsSource020Recall,
  ],
  questions: [
    problem(
      "280'in %15'i kaçtır?",
      "42",
      ["28", "35", "48", "56"],
      "%15'i 15/100 olarak kullan.",
      "280·15/100=42. %10'u 28, %5'i 14; toplam 42 kontrolü yapılabilir. 280'i 15'e bölmek ya da 15 ile çarpıp yüze bölmemek farklı işlemlerdir.",
    ),
    problem(
      "Bir sayının %24'ü 72'dir. Sayı kaçtır?",
      "300",
      ["172,8", "240", "360", "400"],
      "0,24B=72 eşitliğinde bütünü çöz.",
      "B=72/0,24=300. 300'ün %24'ü 72'dir. 72'ye %24 eklemek eksik tabanı geri kurmaz; verilen 72 bütün değil bütüne ait bir parçadır.",
    ),
    problem(
      "80 TL'den 100 TL'ye çıkan bir fiyat yüzde kaç artmıştır?",
      "%25",
      ["%20", "%10", "%30", "%80"],
      "Farkı eski fiyat olan 80'e böl.",
      "Fark 20 TL, artış oranı 20/80=1/4=%25'tir. 20/100=%20, ters yöndeki 100'den 80'e azalışın büyüklüğüdür; taban eski fiyattır.",
    ),
    problem(
      "Bir fiyat önce %20 artıyor, sonra yeni fiyatından %20 azalıyor. Başlangıca göre sonuç nedir?",
      "%4 azalır.",
      ["Değişmez.", "%4 artar.", "%20 azalır.", "%40 azalır."],
      "1,20 ve 0,80 çarpanlarını birleştir.",
      "1,20·0,80=0,96; başlangıcın %96'sı kalır, net %4 azalıştır. 100→120→96 kontrolü yapılabilir. Yüzdeleri toplamak yeni tabana uygulanan ikinci değişimi yok sayar.",
    ),
    problem(
      "%25 indirimden sonra 180 TL olan bir ürünün indirim öncesi fiyatı kaç TL'dir?",
      "240",
      ["225", "230", "250", "270"],
      "Son fiyat başlangıcın %75'idir.",
      "0,75E=180 ⇒ E=240. İndirim 60 TL ve 60/240=%25'tir. 180'e %25 eklemek 225 verir; indirimi yeni taban üzerinden geri almaya çalıştığı için yanlıştır.",
    ),
    problem(
      "Bir katılım oranı %20'den %35'e çıkmıştır. Artış kaç yüzde puandır?",
      "15",
      ["1,75", "20", "35", "75"],
      "Yüzde puanında iki yüzde değerini çıkar.",
      "35−20=15 yüzde puan. Göreli artış 15/20·100=%75'tir, fakat istenen bu değildir. 15 ile 75'in farkı işlem hatası değil iki farklı niceliğin seçilmesidir.",
    ),
    problem(
      "Ayrı iki gruptan 10 kişilik grubun %20'si, 30 kişilik grubun %60'ı katılıyor. Birleşik katılım yüzdesi nedir?",
      "%50",
      ["%20", "%40", "%60", "%80"],
      "Önce her grupta katılan adedi bul.",
      "İlk grupta 2, ikinci grupta 18 kişi; toplam 20/40=%50. (%20+%60)/2=%40 farklı büyüklükteki grupları eşit ağırlıkla sayar ve yanlıştır.",
    ),
    problem(
      "Bir karenin kenarı %20 büyüyor. Alanı yüzde kaç büyür?",
      "%44",
      ["%20", "%24", "%40", "%80"],
      "İki kenar da 1,20 katına çıkar.",
      "Alan çarpanı 1,20²=1,44; artış %44'tür. 10×10 alanı 100, 12×12 alanı 144 kontrolü verir. Alan uzunluk değil iki uzunluğun çarpımıdır; yüzdeyi yalnız ikiyle çarpmak ara çarpım etkisini atlar.",
    ),
    problem(
      "%80 dolu bir kaptaki mevcut sıvının %25'i tüketiliyor. Başlangıçtaki kap kapasitesi değişmiyor. Son doluluk yüzde kaçtır?",
      "%60",
      ["%55", "%65", "%75", "%80"],
      "Tüketilen yüzde kapasitenin değil, mevcut içeriğin yüzdesidir.",
      "Kapasite C ise içerik 0,80C. Bunun %75'i kalır: 0,80·0,75C=0,60C. 80−25=55 işlemi tüketimi yanlış biçimde kapasite tabanından çıkarır.",
    ),
    problem(
      "500 gramı 200 TL olan bir ürünün yeni paketi 400 gram ve 192 TL'dir. Gram fiyatı nasıl değişmiştir?",
      "%20 artmıştır.",
      ["%4 azalmıştır.", "%4 artmıştır.", "%20 azalmıştır.", "Değişmemiştir."],
      "İki dönemde de TL/g hesapla.",
      "Eski 200/500=0,40 TL/g, yeni 192/400=0,48 TL/g. Artış 0,08/0,40=%20. Paket fiyatı %4 azalmış olsa da miktar daha fazla azalmıştır; sorulan nicelik birim fiyattır.",
    ),
  ],
  source: percentProblemsSource020Summary,
};

const profit: Pack = {
  id: "kar-zarar-problemleri",
  topic: "detail-214",
  title: "Kâr zarar problemleri: maliyeti, etiketi ve geliri ayır",
  minutes: 70,
  objectives: [
    "Maliyet, etiket ve satış tutarlarını ayır; kâr yüzdesinin tabanını doğru seç.",
    "İndirim ve ters maliyet, çoklu ürün ve fire problemlerini toplam tutarlarla çöz.",
    "Sabit gider modelinde başabaş ile kesin kâr sınırını ayır, tam sayı adedi denetle.",
  ],
  sections: [
    section(
      "Paranın türünü adlandır: maliyet, etiket, satış",
      "Maliyet M, soruda belirtilen alış bedeli ve giderlerin toplamıdır. Satış geliri S, gerçekten elde edilen tutardır; etiket E ise ilan edilen fiyat olabilir. Kâr K=S−M, zarar Z=M−S olarak alınır. Gelir maliyete eşitse başabaş vardır. Aynı harfi hem etiket hem gerçek satış için kullanmak indirimi görünmez yapar.",
      "M ve S aynı kapsamda olmalıdır: birim maliyetle bütün partinin gelirini karşılaştırma. 10 ürünün birim maliyeti 40 TL ise toplam maliyet 400 TL'dir. Yalnız soruda belirtilen giderleri ekle; verilmemiş vergi, komisyon veya stok kuralı icat etme. Bu modeller gerçek muhasebenin tamamı değil, açık koşulları olan öğretim problemleridir.",
    ),
    section(
      "Standart kâr yüzdesinin tabanı maliyettir",
      "M>0 için kâr yüzdesi 100·(S−M)/M'dir. 200 TL maliyetli bir ürün 250 TL'ye satılırsa kâr 50 TL, maliyete göre kâr %25'tir. Aynı 50'nin satışa oranı 50/250=%20'dir; buna satış marjı denebilir ve farklı bir oran sorar. Soruda özel taban belirtilmedikçe alışılmış kâr/zarar yüzdesi maliyete göredir.",
      "Maliyet üzerinden %p kârda S=M(1+p/100), %z zararda S=M(1−z/100) olur. %100 zarar sıfır satış geliridir. M=0 iken bu oranı bölmeyle tanımlayamazsın. 'Zarar yok' S≥M koşuludur; 'kâr var' S>M ister. Yalnız sonuca bakıp sıfır kârı pozitif başarı diye sınıflandırma.",
    ),
    section(
      "Satıştan maliyete ters dön",
      "%20 zararla 320 TL'ye satılan üründe 0,80M=320, dolayısıyla M=400 TL'dir. Satışa %20 eklemek 384 TL verir ve başlangıç maliyeti değildir; %20'nin tabanı 320 değil, bilinmeyen M'dir. Ters çözümde satış tutarını o satış/maliyet çarpanına böl.",
      "%100 zarar durumunda çarpan sıfırdır; sıfır satıştan tek bir maliyet bulunamaz. Oranlar farklı ürünlere aitse her maliyeti ayrı geri hesapla, sonra toplamı al. 'İkisi de 300 TL' ifadesinde eşitliğin maliyete mi satışa mı ait olduğunu işaretle. Bir üründeki yüzdeyi ötekinin tabanına taşımak toplam hesabını bozar.",
    ),
    section(
      "İndirim etiket üzerinde yapılır",
      "Maliyet M, hedef etiket kârı %p ve etikete indirim %d ise E=M(1+p/100), S=E(1−d/100)'dür. Gerçek kârı bulmak için S'yi ilk maliyetle karşılaştırırsın. %50 kâr hedefiyle yazılan etikete %20 indirim, 1,50·0,80=1,20M satış üretir; gerçek kâr %20'dir, %30 değil.",
      "Zarar etmeden en fazla indirim için E(1−d/100)≥M kurulur. E>0 ile d≤100(1−M/E) çıkar. E<M ise indirim yapmadan bile zarar vardır; bu sınırı pozitif indirimmiş gibi uygulama. Korunacak en az kâr oranı k verilirse sağ taraf M(1+k/100) olur; başabaşla hedef kârı aynı koşul sanma.",
    ),
    section(
      "Eşit satış ile eşit maliyet farklı toplamlar verir",
      "İki üründen birinde %20 kâr, diğerinde %20 zarar, maliyetleri eşitse toplamda birbirini götürür. Fakat satışları eşitse ilk maliyet S/1,20, ikinci maliyet S/0,80 olur ve eşit değildir. Toplam sonuçta önce iki geliri ve iki maliyeti topla; yüzdeyi toplam maliyete böl.",
      "Eşit satış ve aynı büyüklükte ters oran r için 0<r<1 iken toplam zarar oranı r² çıkar. Bu kısayolun koşulları güçlüdür: satışlar eşit, oranlar eşit büyüklükte ve ek gider yok. Koşullardan biri değişirse iki maliyete geri dönmek daha güvenilirdir. Farklı maliyetli ürünlerin kâr yüzdelerini düz ortalama almak ağırlıklarını yok sayar.",
    ),
    section(
      "Fire satılabilir miktarı azaltır, ödenmiş maliyeti silmez",
      "Başlangıç Q kg, fire oranı f ise satılabilir miktar Q(1−f)'dir. Alış bedeli çoğunlukla Q kg'ın tamamı için ödenmiştir; fire ortaya çıkınca geçmiş maliyet kendiliğinden küçülmez. Kilogram satış fiyatı v ise gelir Q(1−f)v olur. Nakliye gibi ek giderler verilmişse maliyete bir kez eklenir.",
      "Fireli kısım ayrıca başka fiyata satılıyorsa onun geliri de belirtilen kurala göre eklenir. 'Alınan' ile 'satılan' adedi ayırmak yalnız tarım ürünü için değil, kusurlu üretim ve satılmayan stok için de gereklidir. Bütün maliyeti yalnız sağlam kalan ürünün kilogramına bölersen başabaş birim satışını bulursun; bu yeni tutar ilk alış birim fiyatıyla aynı değildir.",
    ),
    section(
      "Sabit gider ve birim katkı başabaşı belirler",
      "F sabit gider, a birim değişken maliyet, v birim satış, n üretilip satılan adet olsun. Toplam maliyet F+an, gelir vn, kâr (v−a)n−F'dir. v>a ise her satış sabit gideri karşılamaya v−a katkı sağlar. Başabaş n=F/(v−a) noktasındadır; bu nokta tam sayı değilse zarar etmeyen ilk tam adet yukarıdan seçilir.",
      "Kesin kâr için eşitlik yetmez. F=600, a=20, v=35 iken n=40 başabaş; ilk pozitif kâr 41 adettedir. v≤a ve F≥0 olduğunda bu basit modelde satış sayısını artırmak pozitif kâr üretmez. Üretilenlerin hepsi satılmıyorsa gelirde satılan adet, maliyette üretilen adet kullanılır; tek n modeli otomatik geçerli değildir.",
    ),
    section(
      "Yöntemi koşuluna göre seç ve sonucu sınırla",
      "Yalnız oranlar verilmişse 100 birim maliyetle temsil seçmek kolaylaştırabilir. Sabit 36 TL fark, taşıma gideri veya gerçek satış tutarı verildiğinde maliyeti keyfî 100 TL seçme; 100x veya M ile ölçeği koru. Kısa yol, korunması gereken ilişkiyi saklamıyorsa işe yarar. Çarpan yöntemiyle gerçek TL hesabının aynı sonucu verdiğini en az bir örnekte kontrol et.",
      "Son cevapta tutar mı oran mı, maliyete göre mi satışa göre mi istendiğini söyle. Gelir ve giderlerin toplamını tekrar kur; yüzdeyi doğru tabana böl ve en az/en çok adayının komşusunu dene. Ara işlemlerde kesirleri erken yuvarlama. Kuruşa yuvarlama açıkça belirtilmişse yalnız belirtilen aşamada uygula; açıklanmamış bir ticari uygulama yeni bir varsayım olmamalıdır.",
    ),
    ...profitProblemsSource021Sections,
  ],
  examples: [
    example(
      "Kâr ve marjı ayır",
      "Maliyeti 320 TL olan bir ürün 400 TL'ye satılıyor. Maliyete göre kâr yüzdesi nedir?",
      "Önce farkı, sonra sorulan tabana oranı bul.",
      [
        ["Fark", "Kâr satış eksi maliyettir.", "400−320=80 TL"],
        ["Taban", "Standart kâr oranında payda maliyet 320'dir.", "80/320=1/4"],
        ["Yüzde", "Oranı 100 ile çarp.", "(1/4)·100=%25"],
      ],
      "%25 kâr.",
      "320·1,25=400. 80/400=%20 satış marjıdır, istenen kâr yüzdesi değil.",
      "Kârı gelire bölüp farklı tabanlı oranı cevaplamak.",
    ),
    example(
      "Etiket ve indirim zinciri",
      "500 TL maliyetli ürün %40 kâr hedefiyle etiketleniyor. Etikete %25 indirim yapılırsa gerçek kâr yüzdesi nedir?",
      "Etiket maliyetten, indirim etiketten hesaplanır.",
      [
        ["Etiket", "E=500·1,40=700 TL."],
        ["Gerçek satış", "S=700·0,75=525 TL."],
        ["Kâr", "525−500=25 TL ve 25/500=%5."],
      ],
      "%5 kâr.",
      "1,40·0,75=1,05, yani satış maliyetin %105'i.",
      "40−25=%15 diyerek farklı tabanları aynı varsaymak.",
    ),
    example(
      "Eşit satıştaki toplamı bul",
      "İki ürünün her biri 300 TL'ye satılıyor. Birinde %25 kâr, diğerinde %25 zarar var. Toplam zarar yüzdesi nedir?",
      "Eşit satışlardan farklı maliyetlere geri dön.",
      [
        ["Birinci maliyet", "M₁=300/1,25=240 TL."],
        ["İkinci maliyet", "M₂=300/0,75=400 TL."],
        ["Toplam", "M=640, S=600; zarar 40 TL.", "40/640·100=%6,25"],
      ],
      "%6,25 zarar.",
      "240·1,25=300; 400·0,75=300. Aynı satış, eşit maliyet değildir.",
      "+%25 ve −%25'i toplayıp başabaş sanmak.",
    ),
    example(
      "Fire ve giderle maliyeti koru",
      "80 kg ürün kilogramı 25 TL'den alınıyor ve 160 TL nakliye ödeniyor. Kütlenin %10'u satılamıyor; kalan kilogramı 36 TL'den satılıyor. Kâr yüzdesi nedir?",
      "Alınan miktar maliyeti, satılan miktar geliri belirler.",
      [
        ["Maliyet", "80·25+160=2160 TL."],
        ["Satılan miktar", "80·0,90=72 kg; gelir 72·36=2592 TL."],
        ["Kâr", "2592−2160=432 TL.", "432/2160·100=%20"],
      ],
      "%20 kâr.",
      "2160·1,20=2592; ödenmiş 80 kg maliyet fireyle silinmedi.",
      "Alış bedelini yalnız 72 kg üzerinden hesaplamak veya nakliyeyi atlamak.",
    ),
    example(
      "Başabaş ile ilk kârı ayır",
      "Sabit gider 500 TL, birim maliyet 18 TL ve birim satış 38 TL. Üretilenler tamamen satılıyor. Kesin kâr için en az kaç ürün gerekir?",
      "Birim katkı sabit gideri aşmalı.",
      [
        ["Katkı", "Her üründen 38−18=20 TL sabit gidere kalır."],
        ["Kesin koşul", "K>0 gerekir.", "20n−500>0 ⇒ n>25"],
        ["İlk tam sayı", "n=26 ilk uygun adettir; n=25 başabaştır."],
      ],
      "26 ürün.",
      "26'da gelir 988, gider 968, kâr 20 TL; 25'te ikisi 950 TL'dir.",
      "Başabaş noktası 25'i kesin kâr cevabı yapmak.",
    ),
    ...profitProblemsSource021Examples,
  ],
  recall: [
    {
      prompt: "Kâr yüzdesi ile satış marjının paydaları nedir?",
      answer:
        "Standart kâr yüzdesi maliyete, satış marjı satış gelirine bölünür. Aynı tutar farkı farklı yüzde verir.",
    },
    {
      prompt:
        "%50 kâr etiketi ve %20 etiket indirimi hangi gerçek satış çarpanını verir?",
      answer: "1,50·0,80=1,20; satış maliyetin %120'si, gerçek kâr %20'dir.",
    },
    {
      prompt: "Fire olduğunda neden alış maliyeti otomatik azalmaz?",
      answer:
        "Satılamayan kısım da satın alınmış ve bedeli ödenmiştir; fire gelir getirecek miktarı azaltır, geçmiş ödemeyi silmez.",
    },
    {
      prompt:
        "Başabaş adet 40 iken kesin kârın ilk tam adedi neden 41 olabilir?",
      answer:
        "Başabaşta kâr sıfırdır. Pozitif birim katkıda kesin K>0 koşulu için n>40, ilk tam sayı 41 gerekir.",
    },
    ...profitProblemsSource021Recall,
  ],
  questions: [
    problem(
      "160 TL maliyetli bir ürün 200 TL'ye satılıyor. Maliyete göre kâr yüzdesi nedir?",
      "%25",
      ["%20", "%30", "%40", "%80"],
      "Kârı maliyete böl.",
      "Kâr 40 TL; 40/160·100=%25. 40/200=%20 satışa göre marjdır. 160·1,25=200 doğrulaması, yüzde tabanının maliyet olduğunu gösterir.",
    ),
    problem(
      "%20 zararla 280 TL'ye satılan ürünün maliyeti kaç TL'dir?",
      "350",
      ["224", "300", "336", "400"],
      "Satış, maliyetin %80'idir.",
      "0,80M=280 ⇒ M=350. Zarar 70 TL ve 70/350=%20. 280'e %20 eklemek 336 verir; satış tutarını yanlış yüzde tabanı yaptığı için maliyeti geri getirmez.",
    ),
    problem(
      "Maliyeti 400 TL olan ürün %50 kâr hedefiyle etiketlenip etiketten %20 indirimle satılıyor. Gerçek kâr yüzdesi kaçtır?",
      "%20",
      ["%10", "%25", "%30", "%50"],
      "Etiket ve indirim çarpanlarını çarp.",
      "Etiket 600, satış 480 TL; kâr 80/400=%20. Kısa kontrol 1,50·0,80=1,20'dir. 50−20=%30, maliyet ve etiket gibi iki farklı tabanı karıştırır.",
    ),
    problem(
      "500 TL maliyetli ürün 625 TL'ye etiketlenmiştir. Zarar etmeden etikete en fazla yüzde kaç indirim yapılabilir?",
      "%20",
      ["%15", "%25", "%30", "%40"],
      "Satış en az maliyet kadar olmalı.",
      "625(1−d/100)≥500 ⇒ 1−d/100≥0,80 ⇒ d≤20. %20 indirim satışını 500 TL yapar, başabaştır. %25 indirim 468,75 TL verir ve zarar doğurur.",
    ),
    problem(
      "İki ürünün her biri 240 TL'ye satılıyor. Birinde %20 kâr, diğerinde %20 zarar vardır. Toplam sonuç nedir?",
      "%4 zarar.",
      ["Başabaş.", "%4 kâr.", "%20 zarar.", "%40 zarar."],
      "Eşit olan satış, maliyet değil; maliyetlere ayrı dön.",
      "Maliyetler 240/1,20=200 ve 240/0,80=300; toplam maliyet 500, gelir 480'dir. 20/500=%4 zarar. Zıt oranların birbirini götürmesi eşit maliyet koşulunda mümkündür, eşit satışta değil.",
    ),
    problem(
      "İki ürünün her birinin maliyeti 200 TL'dir. Biri %20 kârla, diğeri %20 zararla satılıyor. Toplam sonuç nedir?",
      "Başabaş.",
      ["%4 zarar.", "%4 kâr.", "%20 zarar.", "%20 kâr."],
      "Bu kez maliyetlerin eşit olduğuna dikkat et.",
      "Satışlar 240 ve 160, toplam 400 TL'dir; toplam maliyet de 400 TL. Eşit maliyette aynı büyüklükteki kâr/zarar tutarları 40'ar TL olup birbirini götürür. Eşit satış kısayolu bu koşula taşınamaz.",
    ),
    problem(
      "100 kg ürün kilogramı 30 TL'den alınıyor. Ek gider yok. %20'si satılamıyor; kalan kilogramı 45 TL'den satılıyor. Toplam kâr yüzdesi nedir?",
      "%20",
      ["%10", "%25", "%30", "%50"],
      "Alınan 100 kg maliyetini ve satılan 80 kg gelirini ayır.",
      "Maliyet 3000, gelir 80·45=3600 TL; kâr 600/3000=%20. Fire alış maliyetini 2400 TL'ye düşürmez; satılamayan miktarın bedeli de ödenmiştir.",
    ),
    problem(
      "Sabit gider 600 TL, birim maliyet 20 TL ve birim satış 35 TL'dir. Üretilenlerin tümü satılıyor. Kesin kâr için en az kaç ürün gerekir?",
      "41",
      ["39", "40", "42", "60"],
      "(35−20)n−600>0 çöz; eşitlik kâr değildir.",
      "15n>600 ⇒ n>40. İlk tam sayı 41'dir. 40'ta gelir ve maliyet 1400 TL olup kâr sıfırdır; 41'de kâr 15 TL olur. En az kâr adedi başabaşla aynı değildir.",
    ),
    problem(
      "Bir ürünün etiket fiyatı 750 TL'dir. Maliyeti etiketten %20 düşük, satış fiyatı etiketten %12 yüksektir. Maliyete göre kâr yüzdesi nedir?",
      "%40",
      ["%20", "%28", "%32", "%52"],
      "Her iki fiyatı aynı etiket üzerinden ayrı bul.",
      "M=750·0,80=600, S=750·1,12=840 TL. Kâr 240/600=%40. %20 ile %12'nin toplamı %32 etiket tabanlı iki farkı toplar; istenen maliyet tabanlı oran değildir.",
    ),
    problem(
      "Bir satıcı 8 ürünü tanesi 50 TL maliyetle, 2 ürünü tanesi 100 TL maliyetle alıyor. İlk grubu %50 kârla, ikinci grubu %25 zararla tamamen satıyor. Toplam kâr yüzdesi nedir?",
      "%25",
      ["%12,5", "%20", "%30", "%50"],
      "Adetleri kullanıp toplam maliyet ve gelire dön.",
      "Maliyet 8·50+2·100=600 TL. Gelir 8·75+2·75=750 TL; kâr 150/600=%25. Oranların düz ortalaması %12,5, iki grubun farklı toplam maliyet ağırlığını hesaba katmaz.",
    ),
  ],
  source: profitProblemsSource021Summary,
};

const packs = [numbers, fractions, ages, percentages, profit];
export const forge011MathGuides: LessonGuide[] = packs.map(
  ({ id, minutes, objectives, sections, examples, recall, source }) => ({
    id,
    minutes,
    objectives,
    sections,
    examples,
    recall,
    source,
  }),
);
export const forge011MathTopics: Record<string, string> = Object.fromEntries(
  packs.map((p) => [p.id, p.topic]),
);
export const forge011MathLessons: Lesson[] = packs.map((p) => ({
  id: p.id,
  subjectId: "tyt-matematik",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  body: p.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: [
    ...p.questions.map((q, i) => {
      const answer = i % 5;
      const options = [...q.distractors];
      options.splice(answer, 0, q.correct);
      return {
        id: `${p.id}-011-${i + 1}`,
        prompt: txt(q.prompt),
        options: options.map(txt),
        answer,
        hint: txt(q.hint),
        explanation: txt(q.explanation),
        skill: p.title,
      };
    }),
    ...(p === numbers ? numberProblemsSource017Practice : []),
    ...(p === fractions ? fractionProblemsSource018Practice : []),
    ...(p === ages ? ageProblemsSource019Practice : []),
    ...(p === percentages ? percentProblemsSource020Practice : []),
    ...(p === profit ? profitProblemsSource021Practice : []),
  ],
  source: txt(p.source),
  tags: [p.topic, "Özgün öğretim soruları"],
}));

/** Same pupils, two arrangements; all occupied rows in the second arrangement are full. */
export function seatingBalance(seats: number, standing: number, empty: number) {
  if (
    ![seats, standing, empty].every(Number.isInteger) ||
    seats < 0 ||
    standing < 0 ||
    empty < 0 ||
    empty > seats
  )
    throw new RangeError("SEATING_SCOPE");
  const first = 2 * seats + standing,
    second = 3 * (seats - empty);
  return {
    first,
    second,
    difference: second - first,
    requiredSeats: standing + 3 * empty,
  };
}
export function fractionSpending(
  total: number,
  first: number,
  second: number,
  reference: "remaining" | "initial",
) {
  if (
    ![total, first, second].every(Number.isFinite) ||
    total < 0 ||
    first < 0 ||
    first > 1 ||
    second < 0 ||
    second > 1
  )
    throw new RangeError("FRACTION_SCOPE");
  const firstSpent = total * first,
    afterFirst = total - firstSpent;
  const secondSpent = (reference === "remaining" ? afterFirst : total) * second;
  const remainder = afterFirst - secondSpent;
  return {
    firstSpent,
    afterFirst,
    secondSpent,
    remainder,
    valid: remainder >= -1e-9,
    finalFraction:
      reference === "remaining"
        ? (1 - first) * (1 - second)
        : 1 - first - second,
  };
}
/** Exact elapsed-year model, not the completed age on an unspecified calendar day. */
export function ageShift(a: number, b: number, time: number) {
  if (![a, b, time].every(Number.isFinite) || a < 0 || b < 0)
    throw new RangeError("AGE_SCOPE");
  const first = a + time,
    second = b + time;
  return {
    first,
    second,
    difference: a - b,
    valid: first >= 0 && second >= 0,
    ratio: second > 0 && first >= 0 ? first / second : null,
  };
}
export function successivePercent(base: number, first: number, second: number) {
  if (
    ![base, first, second].every(Number.isFinite) ||
    base <= 0 ||
    first < -100 ||
    second < -100
  )
    throw new RangeError("PERCENT_SCOPE");
  const middle = base * (1 + first / 100),
    final = middle * (1 + second / 100);
  return { middle, final, net: (100 * (final - base)) / base };
}
export function combinedPercent(a: number, p: number, b: number, q: number) {
  if (
    ![a, p, b, q].every(Number.isFinite) ||
    a < 0 ||
    b < 0 ||
    a + b <= 0 ||
    p < 0 ||
    p > 100 ||
    q < 0 ||
    q > 100
  )
    throw new RangeError("WEIGHT_SCOPE");
  return (a * p + b * q) / (a + b);
}
export function priceLifecycle(cost: number, markup: number, discount: number) {
  if (
    ![cost, markup, discount].every(Number.isFinite) ||
    cost <= 0 ||
    markup < 0 ||
    discount < 0 ||
    discount > 100
  )
    throw new RangeError("PRICE_SCOPE");
  const label = cost * (1 + markup / 100),
    sale = label * (1 - discount / 100),
    gain = sale - cost;
  return {
    label,
    sale,
    gain,
    rate: (100 * gain) / cost,
    margin: sale === 0 ? null : (100 * gain) / sale,
    maxDiscount: 100 * (1 - cost / label),
  };
}
export function breakEvenModel(
  fixed: number,
  unitCost: number,
  unitSale: number,
  count: number,
) {
  if (
    ![fixed, unitCost, unitSale, count].every(Number.isFinite) ||
    fixed < 0 ||
    unitCost < 0 ||
    unitSale < 0 ||
    !Number.isInteger(count) ||
    count < 0
  )
    throw new RangeError("BREAK_EVEN_SCOPE");
  const revenue = unitSale * count,
    cost = fixed + unitCost * count,
    contribution = unitSale - unitCost;
  const exact = contribution > 0 ? fixed / contribution : null;
  return {
    revenue,
    cost,
    gain: revenue - cost,
    exact,
    firstProfit: exact === null ? null : Math.floor(exact) + 1,
  };
}
