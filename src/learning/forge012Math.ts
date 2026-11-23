import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";
import {
  interestProblemsSource022Examples,
  interestProblemsSource022Practice,
  interestProblemsSource022Recall,
  interestProblemsSource022Sections,
  interestProblemsSource022Summary,
} from "./interestProblemsSource022Revision";
import {
  mixtureProblemsSource023Examples,
  mixtureProblemsSource023Practice,
  mixtureProblemsSource023Recall,
  mixtureProblemsSource023Sections,
  mixtureProblemsSource023Summary,
} from "./mixtureProblemsSource023Revision";
import {
  workerProblemsSource024Examples,
  workerProblemsSource024Practice,
  workerProblemsSource024Recall,
  workerProblemsSource024Sections,
  workerProblemsSource024Summary,
} from "./workerProblemsSource024Revision";
import {
  poolProblemsSource025Examples,
  poolProblemsSource025Practice,
  poolProblemsSource025Recall,
  poolProblemsSource025Sections,
  poolProblemsSource025Summary,
} from "./poolProblemsSource025Revision";
type Problem = {
  prompt: string;
  correct: string;
  distractors: string[];
  hint: string;
  explanation: string;
};
type Pack = LessonGuide & {
  topic: string;
  title: string;
  questions: Problem[];
};
const packs: Pack[] = [
  {
    id: "faiz-problemleri",
    topic: "detail-215",
    title: "Faiz problemleri: parayı, oranı ve zamanı ayır",
    minutes: 65,
    objectives: [
      "Anapara, faiz ve son tutarı farklı nicelikler olarak tanımla.",
      "Oran ile zamanın birimini eşitle; basit ve bileşik faizi verilen koşuldan ayır.",
      "Ters soruları ve iki ayrı yatırıma bölünen parayı denklemle çöz; sonuçları sınırlarla doğrula.",
    ],
    sections: [
      {
        title: "Üç nicelik, iki farklı para tutarı",
        paragraphs: [
          "Anapara P başlangıçtaki paradır. Faiz F bu para üzerinden belirtilen süre için hesaplanan getiriyi veya borç maliyetini gösterir. Son tutar S=P+F olur. 4000 TL yatırıp 600 TL faiz elde edersen son tutar 4600 TL’dir; faiz sorulmuşsa 4600 değil 600 yazılır.",
          "Oranın yanında mutlaka dönem bulunmalıdır: yıllık %12 ile aylık %12 aynı koşul değildir. Önce P, oran, süre, F ve S için küçük bir verilenler tablosu kur. Sonucun birimi TL, oran veya zaman olabilir; hangi niceliğin istendiğini son satırda tekrar kontrol et.",
        ],
      },
      {
        title: "Basit faiz neden doğrusal artar?",
        paragraphs: [
          "Basit faizde her dönemin getirisi yalnız başlangıç anaparası üzerinden hesaplanır. Yıllık yüzde p ve yıl cinsinden t için F=P·p·t/100, S=P(1+pt/100) olur. Anapara değişmediğinden eşit süre aralıkları aynı miktarda yeni faiz oluşturur.",
          "Örneğin 6000 TL yıllık %10 basit faizle her yılda 600 TL kazandırır. İkinci yılın hesabı 6600 TL üzerinden yapılmaz. Faiz-zaman grafiği başlangıçta sıfırdan geçen doğru, son tutar-zaman grafiği ise P’den başlayan doğru olur; bu iki grafiğin başlangıçlarını karıştırma.",
        ],
      },
      {
        title: "Ayı ve günü oranla aynı döneme çevir",
        paragraphs: [
          "Yıllık oran verilmişse 9 ay, 9/12 yıldır. Yıllık %16 ile 3 ayın faiz katsayısı 0,16·3/12=0,04 olur. Süreyi 3 yıl almak getiriyi on iki kat büyütür. Hesaptan önce birim yazmak, sayıların görünüşüne bakarak işlem seçmekten daha güvenlidir.",
          "Gün hesabında yılın kaç gün kabul edildiği belirtilmelidir. Ticari yıl 360 gün denmişse t=gün/360 kullan; 365 gün veya gerçek takvim koşulu verilmişse ona uy. 360 günlük yıl bütün gerçek finans ürünleri için evrensel bir kural değildir. Bu bölüm, soruda tanımlanmış matematik modelini inceler.",
        ],
      },
      {
        title: "Bilinmeyeni faiz eşitliğinden yalnız bırak",
        paragraphs: [
          "P, F ve t biliniyorsa r=F/(Pt) ondalık yıllık oranı verir; yüzde için 100 ile çarpılır. Faiz ve son tutar birlikte verilirse önce P=S−F bulunabilir. Her dönüşüm aynı eşitliğin iki tarafına yapılan işlemdir; yeni bir ezber formül değildir.",
          "P veya t sıfırsa bu bölmeyi yapamazsın. Başlangıç parası sıfırken bu modelde faiz de sıfırdır; sıfır sürede pozitif faiz bilgisi çelişkilidir. Oran veya süre negatif çıkarsa önce metni ve faiz-son tutar ayrımını gözden geçir. Negatif kökü bağlamın çözümü diye kabul etme.",
        ],
      },
      {
        title: "Anaparayı iki kola ayırırken toplamı koru",
        paragraphs: [
          "Toplam P TL’nin x TL’si bir orana yatırılmışsa diğer kola P−x TL gider. Aynı süre için getiriler x·r₁·t+(P−x)·r₂·t olarak toplanır. İki kola da P yazmak parayı iki kez sayar; bulduğun x için 0≤x≤P koşulunu denetle.",
          "Süreler farklıysa ortak t kullanma: her kolun gerçek katkısı r₁t₁ ve r₂t₂ olur. Tamamı yüksek katkılı kola yatırılsaydı bulunacak faizle gerçek faiz arasındaki farkı, katkı katsayıları farkına bölmek kısa yol olabilir. Katsayılar eşitse bu yöntem tek bir dağılım belirleyemez.",
        ],
      },
      {
        title: "Aynı para ve aynı süre varsa ortak çarpan sadeleşir",
        paragraphs: [
          "İki senaryoda aynı anapara ve aynı süre kullanılmışsa F₁/F₂=r₁/r₂ olur. Örneğin aynı P için bir yılda %8 ve %12 getirilerinin oranı 2/3’tür. Burada sadeleşen P·t çarpanının gerçekten ortak olduğunu cümleden doğrulaman gerekir.",
          "Farklı miktarlar veya farklı bekleme süreleri varsa yalnız oranları karşılaştırmak yetmez. 3000 TL’nin %8 ile yarım yıllık getirisi 120 TL, 2000 TL’nin %6 ile bir yıllık getirisi de 120 TL’dir. Büyük yüzde tek başına büyük getiri kanıtı değildir; P, r ve t birlikte etkilidir.",
        ],
      },
      {
        title: "Faiz yeniden yatırılıyorsa çarpanlar değişir",
        paragraphs: [
          "Dönem sonunda faiz anaparaya eklenip yeniden işletiliyorsa her yeni dönem artmış bakiyeden başlar. Bir yıl %10, sonraki yıl %20 için son tutar P·1,10·1,20 olur. Oranlar eşit ve n tam dönemse P(1+r)ⁿ biçimi kullanılabilir; n kesirli olduğunda bileşikleştirme kuralı ayrıca tanımlanmalıdır.",
          "5000 TL iki yıl %10 basit faizle 6000 TL, her yıl sonu yeniden yatırılan %10 ile 6050 TL olur. Aradaki 50 TL ikinci yılda ilk yılın 500 TL faizine uygulanan %10’dur. Soruda basit denmişken bileşik uygulama; yeniden yatırma açıkken iki yılın yüzdesini yalnız toplayıp geçme.",
        ],
      },
      {
        title: "Kontrol: süre, taban ve büyüklük",
        paragraphs: [
          "P>0, r≥0 ve t≥0 basit modelinde F≥0 ve S≥P olmalıdır. t=0 veya r=0 olunca getiri sıfırdır. Süre iki katına çıkınca basit faiz iki katına çıkar, fakat son tutar iki katına çıkmaz; son tutarın içinde zaten başlangıç parası vardır.",
          "Önce bir yıllık getiriyi hesaplamak ay sorularında hızlı bir büyüklük kontrolüdür. Sekiz aylık faiz bir yıllığın 2/3’ü olmalı. Sonra bulduğun bilinmeyeni ilk eşitliğe geri koy, toplamı ve birimi doğrula. Vergi, komisyon veya değişen kur bilgisi verilmedikçe soru modeline kendiliğinden ekleme.",
        ],
      },
      ...interestProblemsSource022Sections,
    ],
    examples: [
      {
        title: "Yıllık oranla ayı birleştir",
        prompt:
          "4800 TL yıllık %15 basit faizle 8 ay tutuluyor. Faiz ve son tutar nedir?",
        strategy: "Önce aylık sürenin yıl karşılığını bul.",
        steps: [
          {
            label: "Birim",
            explanation: "8 ay, 8/12=2/3 yıldır.",
            expression: "t=2/3",
          },
          {
            label: "Getiri",
            explanation: "Yıllık 720 TL’nin üçte ikisini al.",
            expression: "F=4800·0,15·2/3=480",
          },
          {
            label: "Son tutar",
            explanation: "Başlangıç parasına yalnız bulunan faizi ekle.",
            expression: "S=4800+480=5280",
          },
        ],
        answer: "480 TL faiz; 5280 TL son tutar.",
        check: "12 ay 720 TL, 8 ay 480 TL; süreyle aynı oranda.",
        pitfall: "480 TL’yi toplam para sanmak veya 8’i yıl kabul etmek.",
      },
      {
        title: "Tersine yıllık oran",
        prompt:
          "7500 TL 4 ayda 500 TL basit faiz getiriyor. Yıllık oran nedir?",
        strategy: "Faiz eşitliğinde yalnız oran bilinmiyor.",
        steps: [
          {
            label: "Süre",
            explanation: "4/12=1/3 yıl.",
            expression: "t=1/3",
          },
          {
            label: "Denklem",
            explanation: "Oranı ondalık r ile yaz.",
            expression: "500=7500 r/3",
          },
          {
            label: "Çöz",
            explanation: "2500 r=500 ⇒ r=0,20; yüzdeye çevir.",
            expression: "p=20",
          },
        ],
        answer: "%20 yıllık.",
        check: "7500·0,20·4/12=500 TL.",
        pitfall: "500/7500 ile bulunan dört aylık oranı yıllık diye vermek.",
      },
      {
        title: "Parayı iki orana böl",
        prompt:
          "12000 TL %6 ve %10 yıllık basit faizle bir yıl işletiliyor; toplam faiz 1040 TL. %6’ya ayrılan kaç TL?",
        strategy: "Bir kol x, diğeri 12000−x.",
        steps: [
          {
            label: "Tanımla",
            explanation: "Düşük orana x TL ayır.",
            expression: "0≤x≤12000",
          },
          {
            label: "Topla",
            explanation: "İki kolun faizleri toplamı 1040.",
            expression: "0,06 x+0,10(12000−x)=1040",
          },
          {
            label: "Çöz",
            explanation: "1200−0,04 x=1040.",
            expression: "x=4000",
          },
        ],
        answer: "4000 TL.",
        check: "4000·0,06+8000·0,10=240+800=1040.",
        pitfall: "İki kola da 12000 TL yazarak anaparayı çoğaltmak.",
      },
      {
        title: "Basit ile bileşiği ayır",
        prompt:
          "8000 TL iki tam yıl yıllık %25 ile, ilk yıl faizi yeniden yatırılarak bekletiliyor. Son tutar nedir?",
        strategy: "Her dönem yeni bakiyeden başlar.",
        steps: [
          {
            label: "İlk yıl",
            explanation: "İlk dönem sonu para büyür.",
            expression: "8000·1,25=10000",
          },
          {
            label: "İkinci yıl",
            explanation: "%25 artık 10000 TL üzerinden.",
            expression: "10000·1,25=12500",
          },
          {
            label: "Getiri",
            explanation: "Son tutardan başlangıcı çıkar.",
            expression: "F=12500−8000=4500",
          },
        ],
        answer: "12500 TL son tutar.",
        check: "8000·1,25²=12500; basit model 12000 olurdu.",
        pitfall: "Yeniden yatırma koşulunu atlayıp 8000·(1+2·0,25) kullanmak.",
      },
      ...interestProblemsSource022Examples,
    ],
    recall: [
      {
        prompt: "Basit faizde eşit dönemlerin getirisi niçin eşittir?",
        answer: "Faiz hesabının tabanı başlangıç anaparası olarak sabit kalır.",
      },
      {
        prompt: "Yıllık %18 için beş aylık süre kaç yıldır?",
        answer: "5/12 yıl; faiz katsayısı 0,18·5/12=0,075.",
      },
      {
        prompt: "Aynı yüzde her zaman aynı getiri midir?",
        answer: "Hayır; anapara ve süre de aynı olmalıdır.",
      },
      {
        prompt: "Basit ve bileşik faiz ilk tam yılda farklı mıdır?",
        answer:
          "Aynı başlangıç ve oranla ilk yılda eşittir; sonraki dönemde bileşik faize önceki getiri katılır.",
      },
      ...interestProblemsSource022Recall,
    ],
    questions: [
      {
        prompt:
          "6000 TL yıllık %12 basit faizle 5 ay yatırılıyor. Faiz kaç TL’dir?",
        correct: "300",
        distractors: ["250", "360", "600", "720"],
        hint: "Önce 5 ayı yıl cinsine çevir.",
        explanation:
          "Yıllık getiri 6000·0,12=720 TL; beş ay 12 ayın 5/12’sidir. F=720·5/12=300 TL. 720 TL bir yıllığın tamamı, 6300 TL ise faiz değil son tutar olur.",
      },
      {
        prompt:
          "Yıllık %10 basit faizle 2 yılda 900 TL faiz getiren anapara kaç TL’dir?",
        correct: "4500",
        distractors: ["900", "1800", "5000", "9000"],
        hint: "900=P·0,10·2 denklemini kur.",
        explanation:
          "İki yıllık faiz katsayısı 0,20’dir. 900=0,20 P ⇒ P=4500 TL. Geri koyunca 4500·0,10·2=900 bulunur; süreyi atlamak 9000 sonucunu doğurur.",
      },
      {
        prompt:
          "4000 TL 6 ayda 360 TL basit faiz getiriyor. Yıllık oran yüzde kaçtır?",
        correct: "18",
        distractors: ["9", "12", "24", "36"],
        hint: "Altı ayda alınanı bir yıla ölçekle.",
        explanation:
          "Yarım yıllık faiz 360 ise aynı sabit anaparada yıllık faiz 720 TL olur. 720/4000=0,18, yani %18. %9 yalnız altı aylık dönemin oranıdır, yıllık oran değildir.",
      },
      {
        prompt:
          "2000 TL yıllık %18 basit faizle 40 gün tutuluyor. Yıl 360 gün kabul edilirse faiz kaç TL’dir?",
        correct: "40",
        distractors: ["20", "36", "72", "360"],
        hint: "Süre 40/360 yıl olur.",
        explanation:
          "F=2000·0,18·40/360=40 TL. Yıllık faiz 360 TL’nin dokuzda biri alınır. Sorudaki 360 gün koşulu kullanılır; gün sayısını doğrudan yıl gibi çarpmak geçersizdir.",
      },
      {
        prompt:
          "5000 TL iki tam yıl yıllık %20 basit faizle tutuluyor. Son tutar kaç TL’dir?",
        correct: "7000",
        distractors: ["2000", "6000", "7200", "10000"],
        hint: "Basit faizde her yıl aynı 5000 TL tabandır.",
        explanation:
          "İki yılda faiz 5000·0,20·2=2000 TL; son tutar 5000+2000=7000 TL. 7200 TL yıllık bileşik modelin sonucudur; soruda faiz anaparaya eklenerek işletilmiyor.",
      },
      {
        prompt:
          "5000 TL iki yıl sonunda her yılın faizi yeniden yatırılmak üzere yıllık %20 kazanıyor. Son tutar kaç TL’dir?",
        correct: "7200",
        distractors: ["2000", "6000", "7000", "8000"],
        hint: "İki tam dönem için 1,20 çarpanını iki kez uygula.",
        explanation:
          "İlk yıl 5000·1,20=6000, ikinci yıl 6000·1,20=7200 TL. İkinci yıl faiz 1200 TL’dir çünkü yeni taban 6000 olmuştur; basit faiz sonucu 7000 burada kullanılmaz.",
      },
      {
        prompt:
          "10000 TL’nin x TL’si %4, kalanı %10 yıllık basit faizle 1 yıl tutuluyor. Toplam faiz 760 TL ise x kaçtır?",
        correct: "4000",
        distractors: ["2400", "3000", "6000", "7600"],
        hint: "Düşük faizli kol x, kalan 10000−x.",
        explanation:
          "0,04 x+0,10(10000−x)=760 ⇒1000−0,06 x=760 ⇒x=4000. Kontrol 160+600=760 TL; anaparalar 4000+6000=10000 TL olarak korunur.",
      },
      {
        prompt:
          "Aynı anapara için yıllık %12 ile 6 ayın basit getirisi, %24 ile 3 ayın basit getirisine göre nasıldır?",
        correct: "Eşittir.",
        distractors: [
          "İlk iki katıdır.",
          "İkinci iki katıdır.",
          "İlk dört katıdır.",
          "Süre olmadan kıyaslanamaz.",
        ],
        hint: "Oran×yıl katsayılarını karşılaştır.",
        explanation:
          "Birinci katsayı 0,12·6/12=0,06; ikinci 0,24·3/12=0,06. Ortak anaparayla iki getiri eşittir. Yalnız yüzdeyi veya yalnız süreyi karşılaştırmak iki etkiyi birlikte göremez.",
      },
      {
        prompt:
          "3000 TL yıllık %8 basit faizle 0 ay tutuluyor. Bu modelde faiz kaç TL’dir?",
        correct: "0",
        distractors: ["8", "24", "240", "3000"],
        hint: "F=P·r·t ilişkisinde süre sıfırdır.",
        explanation:
          "t=0 olduğunda P·r·0=0 TL faiz oluşur; son tutar 3000 TL kalır. Modelde ek ücret belirtilmemiştir. Anapara veya yüzde pozitif olması tek başına sıfır sürede getiri oluşturmaz.",
      },
      {
        prompt:
          "Aynı para 1 yıl için yıllık yüzde r ve r−2 ile sırasıyla 300 TL ve 200 TL basit faiz getiriyor. r kaçtır?",
        correct: "6",
        distractors: ["3", "4", "8", "10"],
        hint: "Ortak anapara ve süreyi oranla sadeleştir.",
        explanation:
          "r/(r−2)=300/200=3/2 ⇒2 r=3 r−6 ⇒r=6. Anapara 5000 TL olursa %6 getirisi 300, %4 getirisi 200 TL olur. İki getirinin farkını doğrudan yüzde sanma.",
      },
    ],
    source: interestProblemsSource022Summary,
  },
  {
    id: "karisim-problemleri",
    topic: "detail-216",
    title: "Karışım problemleri: iki ayrı kütle hesabı",
    minutes: 65,
    objectives: [
      "Toplam kütleyi ve izlenen maddenin kütlesini ayrı tut.",
      "Birleştirme, saf madde/su ekleme, buharlaşma ve homojen dökmeyi farklı işlemler olarak modelle.",
      "Hedef yüzdeyi denklemle bul; ağırlıklı ortalamayı ve fiziksel sınırları kontrol et.",
    ],
    sections: [
      {
        title: "Toplam ile saf maddeyi ayrı yaz",
        paragraphs: [
          "120 gramlık %25 şekerli karışımda 30 gram şeker ve 90 gram su vardır. Toplam T, izlenen şeker S ise oran r=S/T, yüzde 100 S/T olur. Yüzdeler 0 ile 100, oranlar 0 ile 1 arasında yazılır. Aynı hesabın iki gösterimini birbirine karıştırma.",
          "Karışım sorusunda ilk karar neyi izlediğindir. Su yüzdesi verilmişse ve yalnız su ile tuz varsa tuz yüzdesi 100’den çıkarılarak bulunur. Başka bileşenler de bulunuyorsa bu ikili tamamlama doğrudan kullanılamaz. Her işlem için T ve S sütunlarını ayrı güncellemek temel yöntemdir.",
        ],
      },
      {
        title: "İki karışım birleşince kütleler toplanır",
        paragraphs: [
          "Birinci karışım m₁ gram ve p₁ yüzde, ikinci m₂ gram ve p₂ yüzde ise izlenen madde miktarları m₁p₁/100 ve m₂p₂/100’dür. Yeni yüzde (m₁p₁+m₂p₂)/(m₁+m₂) olur. İşlem öncesinde hangi bileşenin yüzdesini kullandığını iki kapta da aynı seç.",
          "80 gram %10 ile 240 gram %30 karışınca saf madde 8+72=80 gram, toplam 320 gramdır; yüzde 25 çıkar. %10 ile %30’un düz ortalaması %20 yalnız eşit miktarlarda doğrudur. Ağırlıklı sonuç daha büyük kütlenin derişimine daha yakındır; bu hızlı bir mantık kontrolüdür.",
        ],
      },
      {
        title: "Saf su eklemek yalnız toplamı büyütür",
        paragraphs: [
          "Çözünen madde kaybı yokken saf su eklenirse S sabit, T artar. 100 gram %20 tuzlu suya 100 gram su katılırsa 20 gram tuz 200 gram içinde kalır; oran %10 olur. Yeni toplamı eski 100 gram diye bırakmak suyun kütlesini yok saymaktır.",
          "Saf çözücü eklemek derişimi artıramaz. Buna karşılık izlenen saf tuz eklemek hem payı hem paydayı artırır: yeni oran (S+x)/(T+x). Aynı x’i yalnız paya eklemek toplam kütleyi eksik sayar. Model tamamen çözünme varsayar; doygunluk ve çökelme ayrıca verilen kimya koşullarıdır.",
        ],
      },
      {
        title: "Yalnız su buharlaşıyorsa çözünen korunur",
        paragraphs: [
          "Buharlaşan yalnız su, izlenen tuz uçucu değil ve başka kayıp yoksa tuz kütlesi sabit kalır. Yeni hedef yüzde p için son toplam Tson=100 S/p bulunur. Başlangıç toplamından bunu çıkarınca kaybolan su miktarı elde edilir.",
          "120 gram %20 tuzlu karışımda 24 gram tuz vardır. Yalnız su uçup oran %30 olunca son toplam 24/0,30=80 gram, uçan su 40 gramdır. 40 gramın başlangıçtaki 96 gram sudan az olduğunu kontrol et. Kaybolan karışımı homojen dökmeyle karıştırma; dökülürken tuz da gider.",
        ],
      },
      {
        title: "Homojen dökmede oran aynı kalır",
        paragraphs: [
          "İyice karışmış çözeltinin f kadarını alırsan hem toplam hem izlenen madde (1−f) ile çarpılır. Oran S(1−f)/[T(1−f)]=S/T olarak kalır; f<1 olmalı. Bütün karışım atıldıysa oranı hesaplamak için payda sıfırdır.",
          "100 gram %30 şekerli karışımın 40 gramı alınırsa 12 gram şeker de alınır; geriye 18 gram şeker ve 60 gram toplam kalır. Oran yine %30’dur. Oranın değişmemesi şeker gramının değişmediği anlamına gelmez. Homojenlik koşulu yoksa alınan kısmın derişimi ayrıca bilinmelidir.",
        ],
      },
      {
        title: "Yerine koymayı ikinci bir işlem olarak yap",
        paragraphs: [
          "Bir kısım dökülüp yerine saf su konulunca önce homojen çıkarma, sonra su ekleme yapılır. Başlangıç hacmine veya kütlesine geri dönülse de saf madde kaybı geri gelmez. Başlangıç 100 gram %40, dörtte biri alınıp 25 gram su konursa 30 gram tuz 100 gramda kalır; sonuç %30’dur.",
          "Yerine 25 gram saf tuz konulsaydı kalan 30 grama 25 gram katılır ve oran %55 olurdu. Birbirine benzeyen bu iki cümlenin farkını neyin eklendiği belirler. Ardışık değiştirmede her yeni dökme o anki karışımın yüzdesiyle hesaplanır; başlangıç yüzdesini sonsuza kadar kullanma.",
        ],
      },
      {
        title: "Bilinmeyen miktarı hedef oranla eşitle",
        paragraphs: [
          "%10 oranlı x gram karışım ile %40 oranlı 200 gram karışım %30 olacaksa (0,10 x+80)/(x+200)=0,30 yazılır. Buradan x=100 gram bulunur. Paydaki sayılar saf madde gramı, paydadakiler toplam gramdır; birimlerin neden eşleştiğini söyle.",
          "Hedef oran iki pozitif karışımın başlangıç oranları arasında olmalıdır. %10 ve %40’ı yalnız birbirine karıştırarak %50 elde edemezsin. Hedef %40’a tam eşitse düşük derişimli pozitif kütle eklendiği iddiasıyla çelişir. Çözüm negatif çıkarsa denklemi zorlamak yerine uygulanabilirliği incele.",
        ],
      },
      {
        title: "Yöntemin sınırını birimle doğrula",
        paragraphs: [
          "Kütlece yüzde sorusunda gram ile kilogram önce aynı birime çevrilir. Litreyi grama çevirmek özkütle veya uygun başka bilgi gerektirir; sıvı hacimleri her koşulda tam toplanır varsayılmaz. Bu derste gösterilen çizim, kütlesi toplanabilen iki bileşenli ideal matematik modelidir.",
          "Karışık yemişin kilogram fiyatı da aynı ağırlıklı toplam yapısına sahiptir: toplam bedel/toplam kilogram. Bu kez korunan şeker değil bedel katkısıdır; gram yüzdesini fiyat yüzdesi sanma. Sonuç kontrolünde toplam miktar, seçilen bileşen, yüzde sınırı ve işlem sırasını ayrı ayrı söyle.",
        ],
      },
      ...mixtureProblemsSource023Sections,
    ],
    examples: [
      {
        title: "Eşit olmayan kütleleri birleştir",
        prompt: "80 g %10 ve 240 g %30 tuzlu karışımın son yüzdesi nedir?",
        strategy: "Tuz gramlarını ayrı hesapla.",
        steps: [
          {
            label: "İlk kap",
            explanation: "80·0,10=8 g tuz.",
            expression: "S₁=8",
          },
          {
            label: "İkinci kap",
            explanation: "240·0,30=72 g tuz.",
            expression: "S₂=72",
          },
          {
            label: "Son oran",
            explanation: "80 g tuz toplam 320 g içindedir.",
            expression: "p=100·80/320=25",
          },
        ],
        answer: "%25.",
        check: "%30’a yakın; daha ağır kap %30’luk olandır.",
        pitfall: "Yüzdeleri ağırlık olmadan ikiye bölmek.",
      },
      {
        title: "Saf madde ekleme",
        prompt:
          "200 g %10 tuzlu suya x g tuz eklenince oran %25 oluyor. x nedir?",
        strategy: "Tuz ve toplam birlikte artar.",
        steps: [
          {
            label: "Başlangıç",
            explanation: "20 g tuz, 200 g toplam.",
            expression: "S=20",
          },
          {
            label: "Denklem",
            explanation: "Yeni tuz 20+x; yeni toplam 200+x.",
            expression: "(20+x)/(200+x)=0,25",
          },
          {
            label: "Çöz",
            explanation: "20+x=50+0,25 x.",
            expression: "0,75 x=30 ⇒x=40",
          },
        ],
        answer: "40 g.",
        check: "60/240=0,25; toplam da büyüdü.",
        pitfall: "(20+x)/200 yazarak eklenen tuzun kütlesini unutmak.",
      },
      {
        title: "Sadece su kaybı",
        prompt:
          "150 g %20 karışımdan yalnız su uçuyor; son oran %30. Uçan su kaç g?",
        strategy: "Tuz miktarı aynı kalır.",
        steps: [
          {
            label: "Tuz",
            explanation: "Başlangıçta 30 g tuz var.",
            expression: "150·0,20=30",
          },
          {
            label: "Son toplam",
            explanation: "Bu 30 gram sonun %30’u.",
            expression: "Tson=30/0,30=100",
          },
          {
            label: "Fark",
            explanation: "Toplamdaki azalma yalnız sudur.",
            expression: "150−100=50",
          },
        ],
        answer: "50 g su.",
        check: "Başlangıç 120 g suyun 50 gramı gider, 70 g su+30 g tuz kalır.",
        pitfall: "Tuzun da aynı yüzdeyle buharlaştığını varsaymak.",
      },
      {
        title: "Al ve yerine koy",
        prompt:
          "200 g %30 şekerli homojen karışımın dörtte biri alınarak yerine 50 g saf su konuyor. Son yüzde nedir?",
        strategy: "Çıkarma ve eklemeyi iki satırda yap.",
        steps: [
          {
            label: "Alınan",
            explanation: "50 g karışımın %30’u 15 g şekerdir.",
            expression: "Sçıkan=15",
          },
          {
            label: "Kalan",
            explanation: "60−15=45 g şeker ve 150 g toplam kalır.",
            expression: "Skalan=45",
          },
          {
            label: "Su ekle",
            explanation: "50 g su toplamı 200 yapar; şeker 45 kalır.",
            expression: "p=100·45/200=22,5",
          },
        ],
        answer: "%22,5.",
        check: "%30’dan düştü; saf su eklemek derişimi artıramaz.",
        pitfall: "Dökme sırasında şeker miktarı 60 g kaldı sanmak.",
      },
      ...mixtureProblemsSource023Examples,
    ],
    recall: [
      {
        prompt: "Homojen karışımı dökmek yüzdeyi niçin değiştirmez?",
        answer:
          "Pay ve payda aynı katsayıyla azalır; saf madde gramı yine de azalır.",
      },
      {
        prompt: "Saf tuz eklenince hangi iki nicelik artar?",
        answer: "Hem tuz kütlesi hem toplam kütle aynı eklenen miktarla artar.",
      },
      {
        prompt: "Yalnız su kaybında sabit kalan nedir?",
        answer: "İzlenen uçucu olmayan çözünenin kütlesi.",
      },
      {
        prompt: "%10 ve %40 iki pozitif karışım %45 olabilir mi?",
        answer:
          "Yalnız birleştirmeyle olamaz; sonuç iki başlangıç yüzdesi arasında olmalıdır.",
      },
      ...mixtureProblemsSource023Recall,
    ],
    questions: [
      {
        prompt:
          "50 g %10 tuzlu su ile 150 g %30 tuzlu su birleştiriliyor. Tuz yüzdesi kaçtır?",
        correct: "25",
        distractors: ["15", "20", "30", "40"],
        hint: "Önce iki kaptaki tuz gramlarını topla.",
        explanation:
          "İlk kap 5 g, ikinci 45 g tuz taşır. Toplam 50 g tuz 200 g içinde %25 yapar. %20 düz ortalama olurdu; kütleler eşit olmadığı için o yöntem bu soruda geçersizdir.",
      },
      {
        prompt:
          "120 g %25 şekerli suya 80 g saf su ekleniyor. Son şeker yüzdesi kaçtır?",
        correct: "15",
        distractors: ["10", "20", "25", "30"],
        hint: "Şeker 30 g olarak kalır; toplam büyür.",
        explanation:
          "Başlangıç şekeri 120·0,25=30 g. Son toplam 120+80=200 g; yüzde 100·30/200=15. Eklenen saf su şeker taşımaz ama paydaya katılır; ilk toplamı kullanma.",
      },
      {
        prompt:
          "100 g %20 tuzlu sudan yalnız 20 g su buharlaşıyor. Son tuz yüzdesi kaçtır?",
        correct: "25",
        distractors: ["16", "20", "24", "40"],
        hint: "Tuz 20 g kalırken toplam 80 g olur.",
        explanation:
          "Uçan yalnız su olduğundan tuz 20 g değişmez. Son oran 20/80=0,25. %16 sonucu, tuzu da homojen dökülmüş gibi azaltma hatasına dayanır; burada buharlaşma koşulu farklıdır.",
      },
      {
        prompt:
          "200 g %25 tuzlu suya x g saf tuz eklenince oran %40 oluyor. x kaç gramdır?",
        correct: "50",
        distractors: ["30", "40", "60", "80"],
        hint: "(50+x)/(200+x)=0,40 kur.",
        explanation:
          "50+x=80+0,40 x ⇒0,60 x=30 ⇒x=50 g. Son tuz 100 g, toplam 250 g ve oran %40’tır. Saf tuz yalnız paya değil toplam kütleyi gösteren paydaya da eklenir.",
      },
      {
        prompt:
          "100 g %30 şekerli homojen karışımın beşte biri alınıp yerine 20 g saf su ekleniyor. Son yüzde kaçtır?",
        correct: "24",
        distractors: ["6", "20", "25", "30"],
        hint: "Alınan 20 g içinde 6 g şeker de gider.",
        explanation:
          "Başlangıç 30 g şekerin 6 gramı çıkar; 24 g kalır. Su eklenince toplam yeniden 100 g olur; şeker yüzdesi %24. Karışımı çıkarırken sadece suyu çıkmış gibi kabul etme.",
      },
      {
        prompt:
          "80 g %10 tuzlu su ile x g %30 tuzlu su birleşince oran %20 oluyor. x kaç gramdır?",
        correct: "80",
        distractors: ["40", "60", "100", "160"],
        hint: "Hedef iki oranın ortası; kütle denkleminde doğrula.",
        explanation:
          "(8+0,30 x)/(80+x)=0,20 ⇒8+0,30 x=16+0,20 x ⇒x=80. Eşit kütlelerde iki yüzde ortalanabilir; burada denklem de bu özel durumu doğruluyor.",
      },
      {
        prompt:
          "240 g %25 tuzlu suya 20 g saf tuz eklenip ardından 60 g yalnız su uçuruluyor. Son yüzde kaçtır?",
        correct: "40",
        distractors: ["25", "30", "32", "50"],
        hint: "Her işlemde T ve S’yi ayrı güncelle.",
        explanation:
          "İlk tuz 60 g; eklenince 80 g. Toplam 240+20−60=200 g. 80/200=%40. Buharlaşma tuzu azaltmaz; saf tuzun eklenmesi ise toplamı da 20 g büyütür.",
      },
      {
        prompt:
          "100 g %40 tuzlu homojen karışımın dörtte biri alınıp yerine 25 g saf tuz konuyor. Son yüzde kaçtır?",
        correct: "55",
        distractors: ["30", "40", "50", "65"],
        hint: "Kalan tuz 30 g; sonra 25 g saf tuz gelir.",
        explanation:
          "25 g homojen karışımla 10 g tuz gider, 30 g kalır. Yerine 25 g saf tuz gelince 55 g tuz 100 g toplamda bulunur; sonuç %55. Yerine su konması halinde %30 olurdu.",
      },
      {
        prompt:
          "Pozitif miktarlardaki %10 ve %40 tuzlu su yalnız birbirine karıştırılıyor. Hangi yüzde elde edilemez?",
        correct: "50",
        distractors: ["15", "20", "25", "35"],
        hint: "Ağırlıklı ortalama başlangıç oranları arasında kalır.",
        explanation:
          "İki pozitif miktar için sonuç %10’dan büyük, %40’tan küçük olur. %50 üst sınırı aştığı için olanaksızdır. Diğer oranlar uygun pozitif kütle oranlarıyla sağlanabilir; ek saf tuz verilmemiştir.",
      },
      {
        prompt:
          "20 kg karışımın %40’ı 30 TL/kg, %60’ı 50 TL/kg değerinde. Ortalama birim fiyat kaç TL/kg’dır?",
        correct: "42",
        distractors: ["35", "38", "40", "45"],
        hint: "Toplam bedeli toplam kütleye böl.",
        explanation:
          "Kütleler 8 ve 12 kg; toplam değer 8·30+12·50=840 TL. 840/20=42 TL/kg. 30 ile 50’nin düz ortalaması 40, eşit olmayan kütle ağırlıklarını göz ardı eder.",
      },
    ],
    source: mixtureProblemsSource023Summary,
  },
  {
    id: "isci-problemleri",
    topic: "detail-217",
    title: "İşçi problemleri: süreyi hıza, işi evrelere çevir",
    minutes: 65,
    objectives: [
      "Aynı hedefi 1 iş tanımlayıp sürelerden birim iş hızlarını çıkar.",
      "Birlikte çalışan, ayrılan, geç başlayan veya verimi değişen çalışanları evrelere ayır.",
      "Kesir ve ortak iş birimi yöntemlerini karşılaştır; çalışma saati ve takvim gününü ayır.",
    ],
    sections: [
      {
        title: "Önce bir işin ne olduğunu tanımla",
        paragraphs: [
          "Bir duvarı tamamen boyamak 1 iş olarak seçilebilir. Bir çalışan bunu 12 saatte sabit hızla yapıyorsa hızı 1/12 iş/saat olur. Üç saatte 3/12=1/4 iş bitirir. Buradaki 12 saat bir süredir, 1/12 ise hızdır; aynı nicelik değildir.",
          "İki kişinin sürelerini karşılaştırabilmek için hedef aynı olmalıdır. Biri küçük, diğeri büyük duvar boyuyorsa 1/12 ve 1/18 aynı büyüklükte işleri göstermeyebilir. Önce ortak alan veya ortak hedef birimine geç. Bir işin kesirli kısmı tamamlanmış payı, kalan 1−pay ise henüz yapılmamış kısmı anlatır.",
        ],
      },
      {
        title: "Birlikte hızlar toplanır, süreler değil",
        paragraphs: [
          "A aynı işi 12, B 18 saatte bitiriyorsa birlikte hız 1/12+1/18=5/36 iş/saattir. Tam süre 1÷(5/36)=36/5 saat olur. 12+18=30 yazmak çalışanların aynı anda katkı vermesini yok sayar; hızlı birlikte çalışma daha uzun sürmemelidir.",
          "Bu toplama bağımsız, sabit ve birbirini engellemeyen katkılar için geçerlidir. Birlikteyken birinin verimi düşüyorsa yeni hızı kullan. Sadece aynı odada bulunmak hızların eski değerleriyle toplanabileceğini kanıtlamaz. Soru metnindeki verim değişimini ayrı bir koşul olarak işaretle.",
        ],
      },
      {
        title: "İşi ortak birimlere bölerek kesri görünür yap",
        paragraphs: [
          "12 ve 18 saatli iki çalışan için tüm işi 36 eş birim seçmek mümkündür. A saatte 3, B saatte 2 birim üretir; birlikte 5 birim/saatle 36/5 saatte bitirir. Ortak iş birimi seçmek fiziksel işin büyüklüğünü değiştirmez, yalnız sayısal ölçeğini değiştirir.",
          "Kesir yöntemi ve ortak birim yöntemi aynı toplam hızı kullanır. İşi 36 yerine 72 birim seçsen süre yine aynıdır; hızlar da aynı oranda büyür. Ortak kat seçimi işlemi kolaylaştırıyorsa kullan, fakat paydalar karışık diye hedefi değiştirip farklı bir işi çözmeye başlama.",
        ],
      },
      {
        title: "Ayrılan çalışan sonraki evrede yoktur",
        paragraphs: [
          "İlk 4 saat A ve B, sonra yalnız B çalışıyorsa ilk katkı 4(rA+rB), ikinci katkı t·rB olur. Toplamı 1’e eşitle. A’nın çalıştığı süre 4 saat, B’nin 4+t saattir; son t her ikisinin ortak süresi değildir.",
          "Önce yapılan işi bul, sonra kalanı sonraki hızla böl. Birlikte çalışılan ilk süre işi zaten tamamlamışsa sonraki evre gerçekleşmez; negatif kalan iş üretme. Atölyedeki zaman çizelgesi bu sınırı gösterir. Verilen ayrılma saatinin iş bitişinden önce olup olmadığını denetle.",
        ],
      },
      {
        title: "Geç başlayan için gerçek etkin süreyi say",
        paragraphs: [
          "A sıfırıncı saatte, B iki saat sonra başlıyorsa önce 2 rA iş yapılır. Kalan iş 1−2 rA, ortak hız rA+rB ile tamamlanır. Toplam süre T seçersen B’nin süresi T−2 olur ve T≥2 koşulu gerekir.",
          "Denklemi 2 rA+t(rA+rB)=1 biçiminde kurarsan t yalnız birlikte çalışılan ek süredir. Sonuçta başlangıçtan geçen toplamı soruyorsa 2’yi ekle. Ara süreyi toplam diye vermek sık yapılan bir hatadır; her zaman değişkeninin hangi andan itibaren sayıldığını cümleyle belirt.",
        ],
      },
      {
        title: "İşçi sayısı ancak eşit verimde ters orantı verir",
        paragraphs: [
          "Eş hızlı n kişi bir işi T günde bitiriyorsa tek kişinin hızı 1/(nT) iş/gündür. Aynı koşulda m kişinin süresi nT/m olur. Kişi sayısı iki katına çıktığında aynı işin süresi yarıya iner; üretim miktarı veya verim değişmişse bu ilişki kendiliğinden geçerli değildir.",
          "Bir grubun toplu hızını her kişiye aynen vermek n kat fazla üretim oluşturur. Farklı verimde iki tür çalışan varsa önce her grubun tek kişi hızını ayrı çıkar, sonra yeni gruptaki adetlerle çarp. Kişinin kimliği veya cinsiyeti hızın nedeni olarak genellenmez; yalnız problemde verilen üretim koşulları kullanılır.",
        ],
      },
      {
        title: "Vardiya ve verim değişimi ayrı niceliklerdir",
        paragraphs: [
          "Bir çalışan 5 iş gününde, her gün 6 saatle bitiriyorsa toplam etkin süre 30 saattir. Başka birinin 20 saatlik süresiyle toplamak için önce iş/saat birimine geçilir. 1 iş günü her problemde 24 çalışma saati değildir; vardiya süresi metinden alınır.",
          "Çalışma hızı %20 artarsa yeni hız 1,20 r olur, süre aynı iş için eski sürenin 1/1,20 katına iner. Hızın yarıya düşmesi süreyi kalan iş için iki katına çıkarır. Geçmişte tamamlanan bölümü yeni verimle geriye dönük değiştirme; hız değiştiği anda yeni evre başlat.",
        ],
      },
      {
        title: "Tamamlanan iş ile üretim kapasitesini ayır",
        paragraphs: [
          "Tek bir sınırlı hedefte tamamlanma payı en fazla 1’dir; iş bittikten sonra aynı duvar tekrar boyanmış sayılmaz. Buna karşılık bağımsız eş ürünler üretiliyorsa kişi-saat başına ürün oranı yeni çalışma miktarıyla çarpılabilir. Soru hangi tür hedefi tanımlıyor, önce bunu söyle.",
          "Son kontrol: katkılar aynı iş ve zaman biriminde mi, her kişinin gerçek çalıştığı süre sayıldı mı, toplam iş tam 1 mi? 7,2 saat 7 saat 12 dakikadır; ondalık 0,2’yi 20 dakika sanma. Bulduğun süreyi hızlarla çarpıp iş paylarını yeniden toplamak modeli doğrudan doğrular.",
        ],
      },
      ...workerProblemsSource024Sections,
    ],
    examples: [
      {
        title: "Birlikte hız",
        prompt: "A aynı işi 10, B 15 saatte bitiriyor. Birlikte süre nedir?",
        strategy: "İşi 30 eş birim seç.",
        steps: [
          {
            label: "Hızlar",
            explanation: "A 3, B 2 birim/saat.",
            expression: "R=3+2=5",
          },
          {
            label: "Süre",
            explanation: "30 birim 5 birim/saatle yapılır.",
            expression: "t=30/5=6",
          },
          {
            label: "Kontrol",
            explanation: "A 6/10, B 6/15 iş yapar.",
            expression: "0,6+0,4=1",
          },
        ],
        answer: "6 saat.",
        check: "Her iki tek başına süreden kısa.",
        pitfall: "10 ve 15’i toplayıp hız sanmak.",
      },
      {
        title: "Bir çalışan ayrılıyor",
        prompt:
          "A işi 8, B 12 saatte bitirir. İkisi 2 saatten sonra B ayrılır. A’nın ek süresi nedir?",
        strategy: "İlk evreyi bitir, kalan işi A’ya ver.",
        steps: [
          {
            label: "İlk evre",
            explanation: "Birlikte hız 5/24; 2 saatte 5/12 iş.",
            expression: "w=2(1/8+1/12)=5/12",
          },
          {
            label: "Kalan",
            explanation: "1−5/12=7/12 iş.",
            expression: "k=7/12",
          },
          {
            label: "Ek süre",
            explanation: "Kalanı A’nın 1/8 hızına böl.",
            expression: "t=(7/12)·8=14/3",
          },
        ],
        answer: "4 saat 40 dakika ek süre.",
        check: "5/12+(14/3)/8=1; toplam 6 saat 40 dakika.",
        pitfall: "Ayrılan B’nin hızını ikinci evrede saymak.",
      },
      {
        title: "Eş hızlı ekip",
        prompt:
          "8 eş hızlı çalışan işi 15 günde yapıyor. 12 çalışan aynı işi kaç günde yapar?",
        strategy: "Toplam kişi-gün sabittir.",
        steps: [
          {
            label: "İş yükü",
            explanation: "8·15=120 kişi-gün.",
            expression: "W=120",
          },
          {
            label: "Yeni ekip",
            explanation: "12 kişi her gün 12 kişi-gün sağlar.",
            expression: "t=120/12",
          },
          {
            label: "Çöz",
            explanation: "Bölme sonucu 10 gündür.",
            expression: "t=10",
          },
        ],
        answer: "10 gün.",
        check: "12·10=8·15; hızlar ve iş aynı kabul edildi.",
        pitfall: "İşçi sayısı artarken süreyi de artırmak.",
      },
      {
        title: "Sonradan yavaşlama",
        prompt:
          "A işi 12 saatte yapar. İlk 3 saat normal, sonra yarı hızla çalışır. Toplam süre?",
        strategy: "Yeni hız yalnız kalan işe uygulanır.",
        steps: [
          {
            label: "İlk pay",
            explanation: "3/12=1/4 iş biter.",
            expression: "k=3/4",
          },
          {
            label: "Yeni hız",
            explanation: "1/12’nin yarısı 1/24.",
            expression: "r₂=1/24",
          },
          {
            label: "Ek ve toplam",
            explanation: "Kalan 18 saatte biter; ilk 3 eklenir.",
            expression: "T=3+(3/4)·24=21",
          },
        ],
        answer: "21 saat.",
        check: "3/12+18/24=1; eski yapılan iş değişmedi.",
        pitfall: "Tüm işi baştan yarı hızla yapılmış gibi 24 saat saymak.",
      },
      ...workerProblemsSource024Examples,
    ],
    recall: [
      {
        prompt: "İki çalışanın sürelerini neden toplayamayız?",
        answer:
          "Birlikte katkı veren nicelikler hızlardır; sürelerin tersi aynı iş biriminde toplanır.",
      },
      {
        prompt: "İşi 36 veya 72 birim seçmek süreyi değiştirir mi?",
        answer: "Hayır; tüm hızlar ve hedef aynı katsayıyla değişir.",
      },
      {
        prompt: "İlk evre işi bitirirse sonraki evre ne olur?",
        answer: "Gerçekleşmez; negatif kalan iş üzerinden ek süre hesaplanmaz.",
      },
      {
        prompt: "6 iş günü her zaman 144 saat midir?",
        answer:
          "Hayır; etkin vardiya süresi gerekir. Günde 8 saatse 48 çalışma saatidir.",
      },
      ...workerProblemsSource024Recall,
    ],
    questions: [
      {
        prompt:
          "Bir çalışan işi 24 saatte bitiriyor. Sabit hızla 9 saatte işin kaçta kaçı biter?",
        correct: "3/8",
        distractors: ["1/3", "3/4", "5/8", "8/3"],
        hint: "Yapılan pay 9/24’tür.",
        explanation:
          "Hız 1/24 iş/saat; 9 saatte 9/24=3/8 iş yapılır. Kalan 5/8’dir, fakat soru biten kısmı istemektedir. Saatleri iş payı olarak doğrudan toplamak veya ters çevirmek birimleri bozar.",
      },
      {
        prompt:
          "A işi 10, B 15 saatte yapıyor. Bağımsız sabit hızla birlikte kaç saatte bitirirler?",
        correct: "6",
        distractors: ["5", "10", "12", "25"],
        hint: "1/10+1/15 toplam hızdır.",
        explanation:
          "Ortak payda 30 ile 3/30+2/30=5/30=1/6 iş/saat. 1 iş bu hızla 6 saat sürer. 10+15=25 tek başına sürelerin toplamıdır ve eşzamanlı çalışmayı modellemez.",
      },
      {
        prompt:
          "A işi 8, B 12 saatte bitiriyor. İkisi 2 saat çalışıp B ayrılıyor. A kalan işi kaç saatte yapar?",
        correct: "14/3",
        distractors: ["7/3", "4", "16/3", "6"],
        hint: "İlk evrede 5/12 biter; kalan 7/12’yi 1/8’e böl.",
        explanation:
          "İlk katkı 2(1/8+1/12)=5/12’dir. Kalan 7/12; A’nın ek süresi (7/12)÷(1/8)=14/3 saat. İlk 2 saat bu ek süreye dahil değildir; toplam 20/3 saattir.",
      },
      {
        prompt:
          "6 eş hızlı işçi işi 12 günde yapıyor. Aynı verimde 9 işçi aynı işi kaç günde bitirir?",
        correct: "8",
        distractors: ["6", "9", "12", "18"],
        hint: "Eşit verimde toplam kişi-gün korunur.",
        explanation:
          "İş yükü 6·12=72 kişi-gündür. 9 kişi için 72/9=8 gün. Kontrol 9·8=72. Eşit verim ve aynı iş koşulu verilmiştir; bu koşullar olmadan yalnız kişi sayısından ters oran kurulamaz.",
      },
      {
        prompt:
          "A işi 5 iş gününde ve günde 6 saatle, B 20 çalışma saatinde bitirir. İkisi günde 5’er saat birlikte çalışırsa kaç iş günü gerekir?",
        correct: "12/5",
        distractors: ["2", "3", "4", "6"],
        hint: "A’nın 30 etkin saatlik süresini kullan.",
        explanation:
          "Saatlik hızlar 1/30+1/20=1/12 iş/saat. 12 çalışma saati gerekir; günde 5 saatle 12/5 iş günü, yani 2 tam gün ve üçüncü gün 2 saattir. İş gününü 24 saat kabul etme.",
      },
      {
        prompt:
          "A bir işi 6 saatte yapar. 2 saat normal çalıştıktan sonra hızı yarıya düşüyor. Toplam bitirme süresi kaç saattir?",
        correct: "10",
        distractors: ["6", "8", "12", "14"],
        hint: "İlk 1/3 yapılır; kalan 2/3 için hız 1/12 olur.",
        explanation:
          "İlk 2 saatte 2/6=1/3 iş. Yeni hız (1/6)/2=1/12 olduğundan kalan 2/3 iş 8 saatte biter. Toplam 2+8=10 saattir; bütün işi yeni hızla hesaplamak geçmişi yanlış değiştirir.",
      },
      {
        prompt:
          "3 eş hızlı çalışan 4 saatte 24 eş parça üretiyor. Aynı koşulda 5 çalışan 6 saatte kaç parça üretir?",
        correct: "60",
        distractors: ["30", "40", "48", "72"],
        hint: "Bir kişi-saatte kaç eş parça üretildiğini bul.",
        explanation:
          "İlk 12 kişi-saatte 24 parça, yani 2 parça/kişi-saat üretilir. Yeni 30 kişi-saatte 60 parça olur. Burada bağımsız seri üretim var; tek sınırlı hedefin tamamlanma payıyla karıştırılmaz.",
      },
      {
        prompt:
          "A işi 20, B 30 saatte bitirir. A 5 saat, ardından ikisi 6 saat çalışıyor. Kalanı A kaç saatte yapar?",
        correct: "5",
        distractors: ["3", "4", "6", "10"],
        hint: "İlk 1/4, ikinci 1/2 iş yapılır.",
        explanation:
          "A’nın ilk katkısı 5/20=1/4. Birlikte hız 1/20+1/30=1/12; 6 saatte 1/2. Toplam 3/4 bitti; kalan 1/4 A’nın 1/20 hızıyla 5 saat sürer. İlk evreleri son süreye yeniden ekleme.",
      },
      {
        prompt:
          "A işi 6, B 12 saatte yapar; birlikteyken A’nın hızı yarıya iner, B değişmez. Birlikte süre kaç saattir?",
        correct: "6",
        distractors: ["3", "4", "9", "18"],
        hint: "A’nın birlikteki gerçek hızı 1/12’dir.",
        explanation:
          "Yeni toplam 1/12+1/12=1/6 iş/saat; süre 6 saattir. Eski 1/6+1/12=1/4 hesabıyla 4 saat bulmak metindeki birlikte verim değişimini atlar. Her kişi 6 saatte yarım işi yapar.",
      },
      {
        prompt:
          "A işi 9, B 18 saatte yapar. İkisi 2 saat çalışıp A ayrılır. B’nin ek çalışma süresi kaç saattir?",
        correct: "12",
        distractors: ["6", "8", "10", "14"],
        hint: "Kalan 2/3 iş B’ye devredilir.",
        explanation:
          "Birlikte hız 1/9+1/18=1/6; 2 saatte 1/3 iş biter. B’nin kalan 2/3 için süresi (2/3)÷(1/18)=12 saattir. Toplam süre 14 olsa da sorulan ayrılmadan sonraki ek süredir.",
      },
    ],
    source: workerProblemsSource024Summary,
  },
  {
    id: "havuz-problemleri",
    topic: "detail-218",
    title: "İşçi ve havuz problemleri: net akışı ve sınırları izle",
    minutes: 65,
    objectives: [
      "Girişleri pozitif, çıkışları negatif hız olarak aynı kapasite biriminde birleştir.",
      "Başlangıç doluluğu ve gecikmeli muslukları gerçek zaman evrelerinde hesapla.",
      "Net akış sıfır/negatifken dolum varsayma; hacim ile yüksekliği ayır.",
    ],
    sections: [
      {
        title: "Bir tankı bir bütün seç",
        paragraphs: [
          "Boş bir tankı 6 saatte dolduran musluğun hızı 1/6 tank/saat olur. 2 saatte tankın 1/3’ünü getirir. Hız litre/dakika olarak verilirse hacimleri litre, süreleri dakika cinsinden tut. Bir tankın 1/6’sı ancak aynı tank referansıyla başka kesirlere eklenebilir.",
          "Kapasitesi farklı iki tankın dolma sürelerini doğrudan toplayamazsın. 600 litrelik tankı 6 saatte dolduran musluk 100 L/saat, 1200 litrelik tankı 6 saatte dolduran ise 200 L/saat getirir. Süreler eşit olsa bile hacimsel debiler eşit değildir; ortak litre birimine geçmek farkı gösterir.",
        ],
      },
      {
        title: "Giriş ekler, çıkış azaltır",
        paragraphs: [
          "İki giriş aynı anda açıksa net hız rA+rB olur. Bir çıkış da açıksa rnet=rA+rB−rC yazılır. Aynı miktardaki suyu artıran ve azaltan katkılar işaretleriyle birlikte toplanır. Muslukların tek başına bitirme süreleri değil, bu sürelerin tersleri kullanılır.",
          "Giriş 6 saatte doldurup çıkış 9 saatte boşaltıyorsa net 1/6−1/9=1/18 tank/saat olur. Doluya ulaşmak boş başlangıç için 18 saat sürer. Çıkışın sabit debisi su varken geçerlidir; tank boşken fiziksel eksi su oluşmaz. Girişten fazla kapasitesi olan çıkış su bulamadığı için daha azını boşaltabilir.",
        ],
      },
      {
        title: "Başlangıç doluluğunu denklemde tut",
        paragraphs: [
          "Tankın ilk payı f, net pozitif hız r ise dolum süresi (1−f)/r’dir. Dörtte biri dolu bir tankta yeni su ihtiyacı 3/4’tür; 1/r yazmak ilk suyu yok sayar. Bir süre sonraki pay f+rt olur; taşma başlamadan ve hız sabitken geçerlidir.",
          "Başlangıçta %25 dolu, net hız 1/8 tank/saat ise 3 saatte %62,5 ve 6 saatte %100 olur. Atölyede su yüksekliği yalnız sabit kesitli dikdörtgen temsilde hacim payına orantılı çizilir. Gerçek düzensiz kap için aynı pay artışı aynı yükseklik artışı anlamına gelmeyebilir.",
        ],
      },
      {
        title: "Sıfır ve negatif hız sonuçtur",
        paragraphs: [
          "rnet=0 ise başlangıç seviyesi değişmez; tank zaten dolu değilse sonlu bir dolma süresi yoktur. rnet<0 ise başlangıçta bulunan su azalır; ilk boşalma anı f/(−rnet) olur. Boşaldıktan sonra aynı doğruyu sıfırın altına uzatma.",
          "Atölye teorik net değişimi ve fiziksel doluluğu ayırır. Tank içindeki pay 0 ile 1 arasında kalır; fazla giriş taşar, fazla çıkış isteği su yokken gerçekleşmez. Negatif dolma süresini pozitif yaparak bir cevap uydurmak modeli onarmaz. Önce hedefe hangi yönde gidildiğini söyle.",
        ],
      },
      {
        title: "Gecikmiş açılış yeni evre başlatır",
        paragraphs: [
          "A ilk 2 saat yalnız, sonra B ile açıksa ilk pay 2 rA, kalan süre t için katkı t(rA+rB) olur. Toplam süre 2+t’dir. Doğrudan bütün süre boyunca iki musluğu açık saymak B’nin başlamadan önce su getirdiğini varsaymaktır.",
          "Her musluğun açık kalma süresini ayrı yazmak ikinci bir yoldur: toplam T için A’nın katkısı T·rA, B’ninki (T−2)·rB olur. Burada T≥2 olmalı. A tek başına iki saatten önce tankı dolduruyorsa ikinci musluk dolum bitmeden açılmaz; evrenin gerçekleşme koşulunu kontrol et.",
        ],
      },
      {
        title: "Kaçağın hızını karşılaştırmadan çıkar",
        paragraphs: [
          "Deliksiz bir tank aynı girişle 6 saatte, sabit kaçakla 9 saatte doluyorsa giriş 1/6, net 1/9 tank/saat demektir. Kaçak hızı farktır: 1/6−1/9=1/18. Buradan kaçak tek başına dolu tankı 18 saatte boşaltabilir.",
          "Bu sonuç kaçak debisinin sabit kaldığı model içindir. Delik suyun ortasında bulunuyor ve seviyesi altına düşünce akış duruyorsa aynı boşalma hesabı sonuna kadar sürmez. Suyun yüksekliğine bağlı gerçek akış mekaniği bu sabit hızlı TYT modeline kendiliğinden dahil değildir; verilen koşulu koru.",
        ],
      },
      {
        title: "Hacim eşitliği yükseklik eşitliği değildir",
        paragraphs: [
          "Sabit kesitli dik tankta V=A·h olur. Aynı litre su dar tabanlı tankta daha yüksek seviye yapar. Dik silindirde A=πr² olduğundan yarıçapı iki kat tankın tabanı dört kat büyür; aynı debide yükseklik artış hızı dörtte bire iner.",
          "Eşit yükseklik isteniyorsa litre hacimlerini eşitleme; her hacmi kendi taban alanına böl. Tank boyu yetersizse taşma başlamadan önceki aralığı kontrol et. Şeklin çizim genişliğinden ölçü çıkarma; yarıçap veya alan sayısal verilmelidir. Konide kesit değiştiğinden doğrusal yükseklik modeli ayrıca geçersizdir.",
        ],
      },
      {
        title: "Son kontrolü su muhasebesiyle yap",
        paragraphs: [
          "Başlangıç hacmi+gerçekleşen giriş−gerçekleşen çıkış−taşan hacim=son hacim olmalıdır. Her katkı aynı birimde yazılır. Mola, kapalı musluk veya su bulamayan çıkış, nominal debiyle geçen bütün sürenin çarpımı olarak sayılamaz.",
          "Süreyi saat bulup dakika istendiğinde 60 ile çarp. 4/3 saat 1 saat 20 dakikadır; 1 saat 33 dakika değildir. Sonucun hedef dolulukla aynı olduğunu yerine koyarak doğrula. Net sıfırken sonlu süre, negatif hacim veya tank içinde %100’den fazla su buluyorsan ilk bozulan koşula dön.",
        ],
      },
      ...poolProblemsSource025Sections,
    ],
    examples: [
      {
        title: "Başlangıç suyu",
        prompt:
          "800 L tankta 200 L su var; giriş 20 L/dk, çıkış 5 L/dk. Tam dolma süresi?",
        strategy: "Kalan hacmi net debiye böl.",
        steps: [
          {
            label: "Kalan",
            explanation: "800−200=600 L.",
            expression: "K=600",
          },
          {
            label: "Net",
            explanation: "20−5=15 L/dk.",
            expression: "r=15",
          },
          {
            label: "Süre",
            explanation: "600 litre 15 L/dk ile tamamlanır.",
            expression: "t=600/15=40",
          },
        ],
        answer: "40 dakika.",
        check: "200+40(20−5)=800 L.",
        pitfall: "İlk suyu unutarak 800/15 yapmak.",
      },
      {
        title: "Birden çok akış",
        prompt:
          "A 8, B 12 saatte doldurur; C 24 saatte boşaltır. Boş tank birlikte kaç saatte dolar?",
        strategy: "Ortak tank/saat biriminde işaretleri topla.",
        steps: [
          {
            label: "Hız",
            explanation: "Girişler pozitif, çıkış negatif.",
            expression: "R=1/8+1/12−1/24",
          },
          {
            label: "Topla",
            explanation: "Payda 24 seç.",
            expression: "R=(3+2−1)/24=1/6",
          },
          {
            label: "Süre",
            explanation: "Net pozitif.",
            expression: "t=1/(1/6)=6",
          },
        ],
        answer: "6 saat.",
        check: "6/8+6/12−6/24=1.",
        pitfall: "Çıkışı da giriş gibi toplamak.",
      },
      {
        title: "Gecikmeli giriş",
        prompt:
          "A 10, B 15 saatte doldurur. A 2 saat önce açılıyor. Başlangıçtan toplam dolum süresi?",
        strategy: "Önce yalnız A’nın katkısını bul.",
        steps: [
          {
            label: "İlk evre",
            explanation: "2/10=1/5 tank dolar.",
            expression: "kalan=4/5",
          },
          {
            label: "Ortak hız",
            explanation: "1/10+1/15=1/6.",
            expression: "R=1/6",
          },
          {
            label: "Toplam",
            explanation: "Ortak süre 24/5 saat; ilk 2 eklenir.",
            expression: "T=2+24/5=34/5",
          },
        ],
        answer: "6 saat 48 dakika.",
        check: "A 6,8/10+B 4,8/15=0,68+0,32=1.",
        pitfall: "B’nin gecikmesini unutmak veya yalnız 4,8 saati cevaplamak.",
      },
      {
        title: "Eşit hacimde farklı seviye",
        prompt:
          "Taban alanları 4 m² ve 10 m² iki dik tankın her birine 20 m³ su konuyor. Seviyeler nedir?",
        strategy: "Her hacmi kendi alanına böl.",
        steps: [
          {
            label: "Bağıntı",
            explanation: "Sabit kesitte V=A·h.",
            expression: "h=V/A",
          },
          {
            label: "Dar tank",
            explanation: "20/4=5 metre.",
            expression: "h₁=5",
          },
          {
            label: "Geniş tank",
            explanation: "20/10=2 metre.",
            expression: "h₂=2",
          },
        ],
        answer: "5 m ve 2 m.",
        check:
          "4·5=10·2=20 m³; tankların en az 5 ve 2 m yüksek olduğu kabul edilir.",
        pitfall: "Eşit hacimden eşit yükseklik çıkarmak.",
      },
      ...poolProblemsSource025Examples,
    ],
    recall: [
      {
        prompt: "Net hız 0 ise yarım dolu tank ne zaman dolar?",
        answer: "Aynı koşul sürerse dolmaz; seviyesi yarım kalır.",
      },
      {
        prompt:
          "Boş tankın net nominal hızı negatifse su payı negatif olur mu?",
        answer: "Hayır; çıkış yeterli su bulamaz, fiziksel alt sınır 0’dır.",
      },
      {
        prompt: "Kapasite değişirse 1/T hızlarını doğrudan toplayabilir miyiz?",
        answer: "Yalnız aynı referans hacme çevrildikten sonra.",
      },
      {
        prompt:
          "Aynı debide yarıçap iki katına çıkarsa dik silindirde yükseklik hızı?",
        answer:
          "Taban alanı dört katına çıkar, yükseklik artış hızı dörtte bire iner.",
      },
      ...poolProblemsSource025Recall,
    ],
    questions: [
      {
        prompt:
          "Tank %30 dolu. Sabit giriş dakikada tankın 1/20’sini getiriyor. Tam dolma süresi kaç dakikadır?",
        correct: "14",
        distractors: ["6", "10", "20", "26"],
        hint: "Eksik pay 0,70’tir; tam tank değildir.",
        explanation:
          "Gereken pay 1−0,30=0,70. Süre 0,70÷(1/20)=14 dk. Yerine koyunca 0,30+14/20=1. 20 dakika boş tank için olurdu; 6 dakika başlangıç payını hesaplar.",
      },
      {
        prompt:
          "A 8, B 12 saatte doldurur; C 24 saatte boşaltır. Sabit debilerle boş tank kaç saatte dolar?",
        correct: "6",
        distractors: ["4", "8", "12", "24"],
        hint: "1/8+1/12−1/24 net hızdır.",
        explanation:
          "Payda 24 ile 3/24+2/24−1/24=4/24=1/6 tank/saat. 1 tank 6 saatte dolar. Çıkış su bulunduğu sürece sabit etkilidir; işareti pozitife çevirmek dolumu fazla hızlı gösterir.",
      },
      {
        prompt:
          "A boş tankı 6 saatte doldurur. Aynı giriş sabit bir kaçakla 9 saatte dolduruyor. Kaçak tek başına dolu tankı kaç saatte boşaltır?",
        correct: "18",
        distractors: ["3", "9", "12", "15"],
        hint: "Giriş ile net dolum hızının farkını al.",
        explanation:
          "Kaçak hızı 1/6−1/9=1/18 tank/saat. Bu hız tek başına dolu 1 tankı 18 saatte boşaltır. 9−6=3 süre farkıdır, kaçak hızı değildir; süreleri doğrudan çıkarma.",
      },
      {
        prompt:
          "900 L tankta 180 L su var. Giriş 12 L/dk, çıkış 3 L/dk. Tam dolma kaç dakika?",
        correct: "80",
        distractors: ["60", "72", "90", "100"],
        hint: "720 L eksiği 9 L/dk net debi tamamlar.",
        explanation:
          "Kalan 900−180=720 L. Net 12−3=9 L/dk; süre 720/9=80 dk. Kontrol 180+80·9=900. Yalnız giriş hızını kullanmak açık çıkışın götürdüğü suyu saymaz.",
      },
      {
        prompt:
          "Tank 1/4 dolu; sabit giriş ve çıkışın net hızı 0. Aynı koşulda tam dolma süresi nasıldır?",
        correct: "Tank dolmaz.",
        distractors: ["1 saat", "4 saat", "8 saat", "12 saat"],
        hint: "Sıfır net hız seviye değiştirmez.",
        explanation:
          "Başlangıç 1/4 ve değişim 0·t olduğundan bütün zamanlarda 1/4 kalır. Eksik 3/4 pay sıfır hıza bölünerek sonlu süreye çevrilemez. Giriş ve çıkışın açık olması tek başına dolum kanıtı değildir.",
      },
      {
        prompt:
          "Başlangıçta 300 L su bulunan tankta giriş 5 L/dk, çıkış 8 L/dk sabittir. Su varken boşalma kaç dakikada olur?",
        correct: "100",
        distractors: ["30", "60", "75", "150"],
        hint: "Net azalma 8−5=3 L/dk.",
        explanation:
          "V(t)=300−3 t, sıfıra 100 dk’da ulaşır. Bundan sonra çıkış su buldukça çalışır ve hacim negatif olmaz. Dolma hedefi yoktur; negatif net hızı pozitif dolum diye yorumlama.",
      },
      {
        prompt:
          "A 10, B 15 saatte doldurur. A boş tankta 2 saat çalıştıktan sonra B de açılır. Toplam süre kaç saattir?",
        correct: "34/5",
        distractors: ["24/5", "5", "6", "8"],
        hint: "İlk 2 saati sonraki ortak süreye ekle.",
        explanation:
          "İlk 1/5 tank doldu; kalan 4/5. Ortak hız 1/6 ile ek 24/5 saat gerekir. Toplam 2+24/5=34/5 saat. 24/5 yalnız birlikte çalışılan süredir; başlangıçtan sayılan toplam değildir.",
      },
      {
        prompt:
          "Boş tankı A 10, B 20 saatte doldurur. B toplam 6 saat açık kalıyor ve A’nın katkısıyla tank tam doluyor. A kaç saat açıktır?",
        correct: "7",
        distractors: ["5", "6", "8", "10"],
        hint: "B’nin 3/10 katkısını 1’den çıkar.",
        explanation:
          "B 6/20=3/10 tank getirir. A’ya kalan 7/10; hızı 1/10 olduğundan 7 saat çalışır. Katkılar 7/10+6/20=1. Açık kalma süreleri eşit denmediği için süreleri zorla eşitleme.",
      },
      {
        prompt:
          "Dik silindir iki tankın yarıçapları 2 m ve 4 m. Eşit hacimde suyla, taşma yokken küçük tankın su yüksekliği büyüktekine oranı kaçtır?",
        correct: "4",
        distractors: ["1/4", "1/2", "2", "8"],
        hint: "Taban alanı yarıçapın karesiyle artar.",
        explanation:
          "Alanlar 4π ve 16π m². Eşit hacimde h=V/A olduğundan küçük tank yüksekliği büyük tankın 4 katıdır. Yarıçap oranı 2’yi doğrudan yükseklik oranı sanmak alan karesini atlar.",
      },
      {
        prompt:
          "Sabit net hızla dolan tankın payı 0.saatte 1/4,3.saatte 5/8. Başlangıçtan tam dolma süresi kaç saattir?",
        correct: "6",
        distractors: ["3", "4", "5", "8"],
        hint: "Eğim (5/8−1/4)/3’tür.",
        explanation:
          "Üç saatte 3/8 artış, saatte 1/8 pay demektir. İlk 1/4’ten tam doluya 3/4 gerekir; (3/4)/(1/8)=6 saat. 3.saatten sonraki ek süre 3 saattir, toplamla karıştırma.",
      },
    ],
    source: poolProblemsSource025Summary,
  },
  {
    id: "hiz-problemleri",
    topic: "detail-219",
    title: "Hız problemleri: yolu, konumu ve geçen süreyi ayır",
    minutes: 75,
    objectives: [
      "Sabit sürat ilişkisini aynı birimlerle kur; yol ile yönlü konumu ayır.",
      "Karşılaşma, yetişme ve gecikmeyi konum denklemleriyle modelle.",
      "Ortalama sürat, mola, tren, akıntı ve pist sorularında geçerli kısa yöntemi seç.",
    ],
    sections: [
      {
        title: "Yol, sürat ve süreyi aynı birime getir",
        paragraphs: [
          "Sabit süratte d=v·t olur. Sürat 60 km/sa, süre 2,5 saatse yol 150 km’dir. Dakika verilmişse önce saate dönüştür: 30 dakika 0,5 saat. Birimsiz 150/30 sonucuna km/sa yazmak doğru dönüşüm yapıldığı anlamına gelmez.",
          "72 km/sa=72·1000/3600=20 m/sn; tersine m/sn’den km/sa’e 3,6 ile çarpılır. Yol uzunluk, sürat uzunluk/zaman birimindedir. v=0 iken pozitif yolu d/v ile bulamazsın. İstenen yol mu süre mi diye sormak ilk ilişkinin hangi nicelik için çözüleceğini belirler.",
        ],
      },
      {
        title: "Konum yön taşır; toplam yol taşımaz",
        paragraphs: [
          "Doğru üzerinde sağ pozitif seçilirse x=x₀+ut işaretli konum denklemidir. u negatif olabilir; bu yönü gösterir. Toplam yol ise gidilen parçaların uzunlukları toplamıdır ve negatif olmaz. Bir araç gidip başlangıcına dönünce yer değiştirmesi sıfır, aldığı yol pozitiftir.",
          "Problem dilinde hız sözcüğü bazen sürat anlamıyla kullanılır. Ortalama toplam yol/toplam süre ise buna ortalama sürat demek daha açıktır. Ortalama yönlü hız yer değiştirme/toplam süredir. Soruda hangi niceliğin tanımlandığını oku; gidiş-dönüşte ikisini aynı sanma.",
        ],
      },
      {
        title: "Birbirine gelenler aralığı birlikte kapatır",
        paragraphs: [
          "Aralarında D uzaklık olan iki araç birbirine doğru v₁, v₂ süratleriyle gidiyorsa aralık D−(v₁+v₂)t olur. Karşılaşmada aralık sıfırdır: t=D/(v₁+v₂). Toplam sürat kullanılmasının nedeni iki uçtan aynı aralığın azalmasıdır.",
          "Başlangıç noktaları 20 ve 140 km, işaretli hızlar+40 ve−20 km/sa ise 20+40 t=140−20 t yazılır. t=2 saat ve konum 100 km bulunur. Yalnız zıt yönde denmesi yeterli değildir; birbirinden uzaklaşan araçlarda pozitif gelecekte karşılaşma olmayabilir. Oklarla yönü başlangıçta çiz.",
        ],
      },
      {
        title: "Aynı yönde yetişme için arkadaki hızlı olmalı",
        paragraphs: [
          "Öndekinin avantajı D, arkadakinin sürati va ve öndekinin vö ise kapanma va−vö olur. va>vö olduğunda yetişme süresi D/(va−vö). Hızlar eşitse aralık değişmez; arkadaki yavaşsa aralık büyür ve gelecekte yetişme yoktur.",
          "A 08.00’de 60 km/sa, B 09.00’da 90 km/sa ile aynı yerden çıkarsa 09.00’da avantaj 60 km’dir. B farkı 30 km/sa ile 2 saatte kapatır; buluşma 11.00 olur. A 3 saat, B 2 saat yol almıştır. Geç başlayana öndekiyle aynı toplam süreyi yazma.",
        ],
      },
      {
        title: "Ortalama toplam yolun toplam zamana oranıdır",
        paragraphs: [
          "60 km’yi 30, sonraki 60 km’yi 60 km/sa ile alan araç 2+1=3 saatte 120 km gider; ortalama 40 km/sa. Hızların düz ortalaması 45 yalnız iki süratle eşit süre geçirilmişse geçerlidir. Aynı yol ve aynı süre koşulları farklıdır.",
          "Eşit iki yol, pozitif süratler ve mola yoksa 2 v₁v₂/(v₁+v₂) kısa formülü elde edilir. Mola dahil bütün yolculuk soruluyorsa mola süresini paydaya ekle; mola yol katetmez. Hızların aritmetik ortalamasıyla zaman bulmak, verilen iki parça eşit uzaklıksa genelde yanlıştır.",
        ],
      },
      {
        title: "Tren tamamen geçiyorsa iki uzunluğu say",
        paragraphs: [
          "Trenin ön ucu perona vardığı anda saymaya başlarsan arka uç da peronu terk edene kadar ön uç tren+peron uzunluğu kadar ilerler. 180 m tren 220 m peronu 20 m/sn ile 400/20=20 saniyede tamamen geçer. Bir direk geçişinde yalnız tren uzunluğu vardır.",
          "İki tren birbirini tamamen geçecekse iki uzunluk toplanır, göreli sürat yönlere göre toplam veya fark olur. Hangi uçtan hangi uca kadar geçen zamanın ölçüldüğünü çiz. Sadece trenin önü karşı uca ulaştı denmişse bütün treni dışarı çıkarmaya ait ek uzunluğu kendiliğinden ekleme.",
        ],
      },
      {
        title: "Akıntı ile pistte referansı açık tut",
        paragraphs: [
          "Teknenin durgun sudaki sürati u, akıntı a ise aynı hat boyunca kıyıya göre aşağı u+a, yukarı u−a olur. u≤a ise tekne bu modelde akıntıya karşı yukarı ilerleyemez. Eşit gidiş-dönüş mesafelerinde toplam süreyi iki yönde ayrı bul.",
          "Çevresi C olan pistte aynı noktadan çıkanlar aynı yönde yeniden yan yana geldiğinde hızlı olan tam bir tur fark atmıştır; süreC/(vh−vy). Zıt yönde ilk yeniden karşılaşmada toplam yol bir çevredir; süreC/(v₁+v₂). Başlangıçları farklıysa ilk aralık ayrıca gerekir; her duruma körce C koyma.",
        ],
      },
      {
        title: "Grafik ile çözümü geri denetle",
        paragraphs: [
          "Konum-zaman grafiğinde eğim işaretli hızdır; kesişme aynı zamanda aynı konumu gösterir. Eksenlerin sayısal ölçeği yokken yalnız çizginin dikliğinden sayısal sürat uydurulmaz. Yatay bölüm bekleme, negatif eğim seçilen negatif yönde hareket olabilir.",
          "Sonuçta iki aracın buluşma konumlarını ayrı hesapla. Ortalama için parça yollarını ve mola dahil süreyi tekrar topla. Negatif zaman geçmişte kesişmeyi gösterebilir; gelecekte yetişme diye sunulamaz. Birimin yanında hangi başlangıç saatinden sayıldığını yazmak saat sorularındaki son hatayı önler.",
        ],
      },
    ],
    examples: [
      {
        title: "Eşit yolun ortalaması",
        prompt:
          "İlk 90 km 30 km/sa, sonraki 90 km 60 km/sa ile gidiliyor. Molasız ortalama sürat?",
        strategy: "İki parça için süreleri ayrı bul.",
        steps: [
          {
            label: "Süreler",
            explanation: "90/30=3 ve 90/60=1,5 saat.",
            expression: "T=4,5",
          },
          {
            label: "Toplam",
            explanation: "Yol 180 km.",
            expression: "D=180",
          },
          {
            label: "Oran",
            explanation: "Toplamı toplam süreye böl.",
            expression: "vort=180/4,5=40",
          },
        ],
        answer: "40 km/sa.",
        check: "30 ile 60 arasında, yavaş süratte daha çok zaman geçirildi.",
        pitfall: "Eşit yol için (30+60)/2 almak.",
      },
      {
        title: "Gecikerek yetiş",
        prompt:
          "A 08.00’de 60, B 09.00’da 90 km/sa ile aynı yönde aynı yerden çıkıyor. B ne zaman yetişir?",
        strategy: "B başladığı andaki avantajı bul.",
        steps: [
          {
            label: "Avantaj",
            explanation: "A 1 saatte 60 km uzaklaştı.",
            expression: "D=60",
          },
          {
            label: "Kapanma",
            explanation: "B saatte 30 km fark kapatır.",
            expression: "u=90−60=30",
          },
          {
            label: "Saat",
            explanation: "60/30=2 saat 09.00’a eklenir.",
            expression: "09.00+2=11.00",
          },
        ],
        answer: "11.00.",
        check: "A 3·60=180, B 2·90=180 km; konumlar eşit.",
        pitfall: "İki araç 08.00’de birlikte çıkmış gibi süre yazmak.",
      },
      {
        title: "Tren ve peron",
        prompt:
          "160 m tren 240 m peronu 72 km/sa süratle tamamen geçiyor. Süre?",
        strategy: "Ön ucun toplam ilerlemesini belirle.",
        steps: [
          {
            label: "Dönüştür",
            explanation: "72 km/sa 20 m/sn.",
            expression: "72/3,6=20",
          },
          {
            label: "Uzunluk",
            explanation: "Tren ve peron birlikte geçilir.",
            expression: "d=160+240=400",
          },
          {
            label: "Süre",
            explanation: "Sabit süratte yol/sürat.",
            expression: "t=400/20=20",
          },
        ],
        answer: "20 saniye.",
        check: "20 sn’de ön uç 400 m ilerler; arka uç da peron sonuna gelir.",
        pitfall: "Yalnız 240 m peron uzunluğunu kullanmak.",
      },
      {
        title: "Mola dahil ortalama",
        prompt:
          "90 km 60 km/sa, 60 km 30 km/sa ile gidiliyor; 30 dk mola var. Yolculuğun ortalaması?",
        strategy: "Mola zamana eklenir, yola eklenmez.",
        steps: [
          {
            label: "Hareket",
            explanation: "1,5 ve 2 saat sürer.",
            expression: "Thareket=3,5",
          },
          {
            label: "Mola",
            explanation: "30 dk 0,5 saat.",
            expression: "T=3,5+0,5=4",
          },
          {
            label: "Ortalama",
            explanation: "150 km 4 saate bölünür.",
            expression: "vort=150/4=37,5",
          },
        ],
        answer: "37,5 km/sa.",
        check: "37,5·4=150 km; yalnız hareket ortalaması farklıdır.",
        pitfall: "Molayı toplam süreden çıkarmak.",
      },
    ],
    recall: [
      {
        prompt: "72 km/sa kaç m/sn?",
        answer: "20 m/sn; 3,6’ya bölünür.",
      },
      {
        prompt: "Hızları eşit ve aynı yönde iki araç aradaki farkı kapatır mı?",
        answer: "Başlangıç aralığı pozitifse kapatmaz; göreli hız 0’dır.",
      },
      {
        prompt: "Eşit yolların ortalamasında düz ortalama neden çalışmaz?",
        answer:
          "İki süratte geçirilen zamanlar farklıdır; toplam yol/toplam zaman gerekir.",
      },
      {
        prompt: "Trenin tamamen peronu geçmesinde neden tren uzunluğu da var?",
        answer:
          "Arka ucun da çıkması için ön uç peron ve tren uzunluklarının toplamı kadar ilerler.",
      },
    ],
    questions: [
      {
        prompt: "150 km yol sabit 60 km/sa ile kaç saatte alınır?",
        correct: "2,5",
        distractors: ["1,5", "2", "3", "3,5"],
        hint: "Süre=yol/sürat; saat birimleri uyumlu.",
        explanation:
          "t=150/60=2,5 saat, yani 2 saat 30 dakikadır. Kontrol 60·2,5=150 km. Ondalık 0,5 saat 50 dakika değil 30 dakikadır; birim dönüşümünü son yanıtta koru.",
      },
      {
        prompt: "72 km/sa sürat kaç m/sn’dir?",
        correct: "20",
        distractors: ["10", "18", "25", "30"],
        hint: "1000 metre ve 3600 saniye dönüşümlerini kullan.",
        explanation:
          "72·1000/3600=20 m/sn; km/sa değerini 3,6’ya bölmek aynı dönüşümdür. Yalnız 1000 ile çarpmak zaman birimini değiştirmez ve m/sn vermez.",
      },
      {
        prompt:
          "60 km 30 km/sa, sonraki 60 km 60 km/sa ile gidiliyor. Molasız ortalama sürat kaçtır?",
        correct: "40",
        distractors: ["30", "45", "50", "60"],
        hint: "Yol eşit ama süreler 2 ve 1 saattir.",
        explanation:
          "Toplam 120 km, süre 60/30+60/60=3 saat; ortalama 40 km/sa. 45 hızların düz ortalamasıdır; ancak iki süratte eşit süre geçirilseydi uygulanabilirdi.",
      },
      {
        prompt:
          "Aralarında 210 km olan araçlar birbirine doğru 50 ve 55 km/sa ile aynı anda hareket ediyor. Kaç saatte karşılaşır?",
        correct: "2",
        distractors: ["1", "3", "4", "5"],
        hint: "Aralık saatte 105 km azalır.",
        explanation:
          "Yaklaşma hızı 50+55=105 km/sa. Süre 210/105=2 saattir. Yol katkıları 100+110=210 km; toplam başlangıç aralığını verir. 5 km/sa farkı aynı yönde kapanma içindir.",
      },
      {
        prompt:
          "A 08.00’de 60, B 09.00’da 90 km/sa ile aynı yönde aynı yerden çıkar. B ne zaman yetişir?",
        correct: "11.00",
        distractors: ["09.40", "10.00", "10.30", "12.00"],
        hint: "09.00’da 60 km avantaj ve 30 km/sa kapanma var.",
        explanation:
          "B’nin başlangıcında A 60 km öndedir; 60/(90−60)=2 saat sonra buluşurlar. 09.00+2=11.00. A 180 km’yi 3 saatte, B aynı 180 km’yi 2 saatte alarak konum eşitliğini sağlar.",
      },
      {
        prompt:
          "A’nın konumu 20+40 t, B’ninki 140−20 t km. t saat cinsinden. Karşılaşma konumu kaç km’dir?",
        correct: "100",
        distractors: ["60", "80", "120", "140"],
        hint: "İki konumu önce eşitle.",
        explanation:
          "20+40 t=140−20 t ⇒60 t=120 ⇒t=2. Ortak konum 20+80=100 km; B için 140−40=100 km. Sorulan zaman değil konum olduğundan 2 cevabı yeterli değildir.",
      },
      {
        prompt:
          "180 m tren 220 m peronu 20 m/sn sabit süratle tamamen kaç saniyede geçer?",
        correct: "20",
        distractors: ["9", "11", "18", "22"],
        hint: "Trenin ön ucu toplam 400 m ilerlemeli.",
        explanation:
          "Arka uç da perondan çıkınca ön uç 180+220=400 m ilerlemiş olur. 400/20=20 sn. 11 sn yalnız trenin ön ucunun 220 m’lik peronu aşmasıdır; tüm treni geçirmez.",
      },
      {
        prompt:
          "Durgun suda 15 km/sa tekne, 3 km/sa akıntıda 36 km gidip aynı yolu dönüyor. Toplam süre kaç saattir?",
        correct: "5",
        distractors: ["4", "4,5", "6", "8"],
        hint: "İki kıyı sürati 18 ve 12 km/sa.",
        explanation:
          "Akıntıyla 36/18=2 saat; karşı 36/12=3 saat, toplam 5 saat. İki yönün süratini düz ortalamak eşit mesafede geçirilen farklı süreleri gizler; iki parçayı ayrı hesapla.",
      },
      {
        prompt:
          "400 m pistte aynı noktadan aynı yönde 6 ve 4 m/sn ile çıkanlar başlangıçtan sonra ilk kez kaç saniyede yan yana gelir?",
        correct: "200",
        distractors: ["40", "80", "100", "400"],
        hint: "Hızlı olan bir çevre fark atmalı.",
        explanation:
          "Göreli sürat 6−4=2 m/sn; 400/2=200 sn. Hızlı 1200, yavaş 800 m gider; fark 400 m tam bir turdur. 40 sn zıt yön ilk karşılaşmasının sonucudur; yön koşulu farklıdır.",
      },
      {
        prompt:
          "Öndeki bisikletli 12 km/sa, 18 km arkadaki yaya 4 km/sa ile aynı yönde sabit hareket ediyor. Sonuç nedir?",
        correct: "Yaya yetişemez.",
        distractors: [
          "1,5 saatte yetişir.",
          "2,25 saatte yetişir.",
          "3 saatte yetişir.",
          "4,5 saatte yetişir.",
        ],
        hint: "Arkadaki daha yavaş; aralık kapanmaz.",
        explanation:
          "Aralık 18+(12−4)t=18+8 t km olur ve t≥0 için büyür. 18/(12−4)=2,25 hesabı farkın yönünü atlar; gelecekte yetişme süresi değildir. Pozitif bir süre üretmek zorunda değiliz.",
      },
    ],
    source:
      "MEBİ TYT Matematik Konu Özetleri basılı s. 54/PDF 56; Aurelia 026 Hız Problemleri öğretim s. 1–8. İşaretli konum ve ortalama sürat ayrımıyla özgün anlatım; resmî soru/anahtar doğrulaması bu yeni sette yapılmış sayılmaz.",
  },
];
export const forge012MathGuides: LessonGuide[] = packs.map(
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
export const forge012MathTopics: Record<string, string> = Object.fromEntries(
  packs.map((p) => [p.id, p.topic]),
);
export const forge012MathLessons: Lesson[] = packs.map((p) => ({
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
      const answer = i % 5,
        options = [...q.distractors];
      options.splice(answer, 0, q.correct);
      return {
        id: `${p.id}-012-${i + 1}`,
        prompt: txt(q.prompt),
        options: options.map(txt),
        answer,
        hint: txt(q.hint),
        explanation: txt(q.explanation),
        skill: p.title,
      };
    }),
    ...(p.id === "faiz-problemleri" ? interestProblemsSource022Practice : []),
    ...(p.id === "karisim-problemleri" ? mixtureProblemsSource023Practice : []),
    ...(p.id === "isci-problemleri" ? workerProblemsSource024Practice : []),
    ...(p.id === "havuz-problemleri" ? poolProblemsSource025Practice : []),
  ],
  source: txt(p.source),
  tags: [p.topic, "Özgün öğretim soruları"],
}));
const finite = (...xs: number[]) => xs.every(Number.isFinite);
export function interestModel(
  principal: number,
  rate: number,
  months: number,
  compound: boolean,
) {
  if (
    !finite(principal, rate, months) ||
    principal <= 0 ||
    rate < 0 ||
    !Number.isInteger(months) ||
    months < 0 ||
    months > 120
  )
    throw new RangeError("INTEREST_SCOPE");
  const years = months / 12;
  // Annual compounding only on complete years; remaining months use simple interest on the latest balance.
  const full = Math.floor(years),
    fraction = years - full;
  const total = compound
    ? principal * (1 + rate / 100) ** full * (1 + (rate / 100) * fraction)
    : principal * (1 + (rate / 100) * years);
  return { total, interest: total - principal, years };
}
export function mixtureModel(
  total: number,
  percent: number,
  amount: number,
  operation: "water" | "solute" | "evaporate" | "replace",
) {
  if (
    !finite(total, percent, amount) ||
    total <= 0 ||
    percent < 0 ||
    percent > 100 ||
    amount < 0
  )
    throw new RangeError("MIXTURE_SCOPE");
  const initialSolute = (total * percent) / 100;
  let mass = total,
    solute = initialSolute;
  if (operation === "water") mass += amount;
  else if (operation === "solute") {
    mass += amount;
    solute += amount;
  } else if (operation === "evaporate") {
    if (amount > total - initialSolute)
      throw new RangeError("NOT_ENOUGH_WATER");
    mass -= amount;
  } else {
    if (amount > total) throw new RangeError("NOT_ENOUGH_MIXTURE");
    solute *= 1 - amount / total;
  }
  return {
    mass,
    solute,
    water: mass - solute,
    percent: mass > 0 ? (100 * solute) / mass : null,
    initialSolute,
  };
}
export function workerStages(
  a: number,
  b: number,
  firstHours: number,
  second: "a" | "b" | "both",
) {
  if (!finite(a, b, firstHours) || a <= 0 || b <= 0 || firstHours < 0)
    throw new RangeError("WORKER_SCOPE");
  const together = 1 / a + 1 / b,
    firstFinish = 1 / together,
    actualFirst = Math.min(firstHours, firstFinish),
    firstA = actualFirst / a,
    firstB = actualFirst / b,
    remaining = Math.max(0, 1 - firstA - firstB),
    rate = second === "a" ? 1 / a : second === "b" ? 1 / b : together,
    extra = remaining / rate;
  return {
    firstA,
    firstB,
    remaining,
    extra,
    total: actualFirst + extra,
    actualFirst,
    finishedBeforeChange: firstHours >= firstFinish,
  };
}
export function poolFlow(
  capacity: number,
  start: number,
  input: number,
  output: number,
  minutes: number,
) {
  if (
    !finite(capacity, start, input, output, minutes) ||
    capacity <= 0 ||
    start < 0 ||
    start > capacity ||
    input < 0 ||
    output < 0 ||
    minutes < 0
  )
    throw new RangeError("POOL_SCOPE");
  const net = input - output,
    raw = start + net * minutes,
    volume = Math.max(0, Math.min(capacity, raw)),
    fillTime =
      start === capacity ? 0 : net > 0 ? (capacity - start) / net : null,
    emptyTime = start === 0 ? 0 : net < 0 ? start / -net : null;
  return {
    net,
    raw,
    volume,
    fraction: volume / capacity,
    fillTime,
    emptyTime,
    overflow: Math.max(0, raw - capacity),
    unmetOutflow: Math.max(0, -raw),
  };
}
export function relativeMotion(
  gap: number,
  front: number,
  rear: number,
  hours: number,
  opposite: boolean,
) {
  if (
    !finite(gap, front, rear, hours) ||
    gap <= 0 ||
    front < 0 ||
    rear < 0 ||
    hours < 0
  )
    throw new RangeError("MOTION_SCOPE");
  const closing = opposite ? front + rear : rear - front,
    meeting = closing > 0 ? gap / closing : null,
    first = rear * hours,
    second = gap + (opposite ? -front : front) * hours;
  return { closing, meeting, first, second, gap: second - first };
}
export function tripAverage(
  distances: number[],
  speeds: number[],
  pause: number = 0,
) {
  if (
    !distances.length ||
    distances.length !== speeds.length ||
    !finite(...distances, ...speeds, pause) ||
    distances.some((d) => d < 0) ||
    speeds.some((v) => v <= 0) ||
    pause < 0
  )
    throw new RangeError("TRIP_SCOPE");
  const distance = distances.reduce((a, b) => a + b, 0),
    moving = distances.reduce((t, d, i) => t + d / speeds[i], 0),
    total = moving + pause;
  return {
    distance,
    moving,
    total,
    average: total > 0 ? distance / total : null,
  };
}
