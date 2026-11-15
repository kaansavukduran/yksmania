import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";
const packs = [
  {
    id: "serbest-dusme-limit-hiz",
    topic: "detail-364",
    title: "Serbest düşme ve limit hız: aynı ağırlık, değişen direnç",
    minutes: 100,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 45–47; OGM 11. sınıf Serbest Düşme–Düşey Atış–Limit Hız özeti ve Dersler Cepte, s. 10–11. Özgün koşullu öğretim ve özgün sorular; resmî ÖSYM sorusu değildir.",
    objectives: [
      "İlk hızsız ideal düşüşte zaman, düşülen mesafe ve hız arasındaki ilişkiyi kur.",
      "Akışkana göre hız, izdüşüm alanı ve kuvvet dengesiyle limit hızı yorumla.",
      "Tam limit ile sonlu süredeki yakınlığı; mekanik enerji kaybı ile toplam enerji korunumunu ayır.",
    ],
    sections: [
      {
        title: "Önce düşmenin modelini seç",
        paragraphs: [
          "Yeryüzüne yakın bir bölgede, hava direncinin ve kaldırmanın ihmal edildiği, ilk hızsız bırakılan cisme yalnız ağırlık etki etsin. Bu ünitede serbest düşme bu dar anlamda kullanılır. Pozitif sabit kütle için mg = ma olduğundan düşey ivmenin büyüklüğü g olur; ağır cismin mutlaka daha hızlı düşeceği sonucu bu ideal modelden çıkmaz.",
          "g yerel çekim ivmesidir, her yerde tam 10 m/s² değildir. Sayısal alıştırmalarda 10 verildiğinde onu kullan; metre, saniye ve kilogramı koru. Çok yüksek irtifada g değişimini, Dünya eğriliğini, dönüşünü veya gerçek rüzgârı bu küçük bölge modeli çözmez. İlk hız verilmişse sonraki düşey atış ünitesinin daha genel başlangıç koşuluna geçilir.",
        ],
      },
      {
        title: "İşareti seç, büyüklükle vektörü ayır",
        paragraphs: [
          "Düşülen mesafeye s ≥ 0 diyerek aşağı yönü artı seçersen başlangıçta s = 0 ve v = 0 için v = gt, s = gt²/2, v² = 2gs yazılır. Aynı olayı yukarı artı bir y ekseninde yazmak a = −g ve y = y0 − gt²/2 verir. İki çözüm aynı hareketi anlatır; farklı işaretli nicelikleri tek denklemde gelişigüzel birleştirme.",
          "v² bağıntısı yalnız sürati verir, yönü tek başına belirlemez. İlk yer teması T = √(2h/g) ile bulunur; bundan sonra ideal uçuş denklemini zeminin altına sürdürmek fiziksel yeni bir çarpışma modeli gerektirir. Etkileşimli düşüşün zaman aralığı bu ilk temasta biter ve top zemine gerçekten temas eder.",
        ],
      },
      {
        title: "Eşit zamanlarda mesafeler neden 1, 3, 5 gider?",
        paragraphs: [
          "İlk hız sıfırken ilk t süresinde h = gt²/2 düşülür. İlk 2t süresinin toplamı 4h, ilk 3t süresinin toplamı 9h olur. Ardışık eşit aralıklardaki mesafeler fark alınarak h, 3h, 5h çıkar. Bu oranlar toplam mesafelerin 1, 4, 9 olmasından doğar; hızın her aralıkta aynı olması anlamına gelmez.",
          "Örneğin g = 10 m/s² iken ilk üç saniyede toplam düşüşler 5, 20, 45 m; ayrı saniyelerde 5, 15, 25 m olur. İlk hız sıfır değilse veya direnç önem kazanmışsa bu özel tek sayılar dizisini doğrudan kullanamazsın. Son saniye sorusunda önce toplam uçuşun gerçekten bir saniyeden uzun olduğunu da denetle.",
        ],
      },
      {
        title: "Grafiğin eğimi ve alanı aynı bilgi değildir",
        paragraphs: [
          "Aşağı artı seçilmiş ideal düşüşte v–t grafiği başlangıçtan geçen eğimi g olan doğru, a–t grafiği sabit +g, s–t grafiği yukarı kıvrılan paraboldür. Hız grafiğinin 0–t alanı gt²/2 mesafeyi verir; ivme grafiğinin alanı gt hız değişimidir. Eksen üzerindeki birimler hangi alanı hesapladığını sınar.",
          "Yukarı artı y grafiği ise aşağı kıvrılır; bu, cismin fren yaptığı anlamına gelmez. Negatif hız ve negatif ivme birlikteyken sürat büyür. Parabolün herhangi bir andaki teğet eğimi o andaki yönlü hızdır; ilk ve son konumu birleştiren sekantın eğimi ise ortalama hızdır. Alan, eğim ve grafiğin görünüşünü birbirinin yerine kullanma.",
        ],
      },
      {
        title: "Hava direnci hangi hıza karşıdır?",
        paragraphs: [
          "Akışkan içindeki direnç, cismin havaya göre hızına karşı yönelir. Durgun havada aşağı düşen top için yukarıdır; rüzgâr varsa yere göre hızla hava hızının farkı gerekir. Buradaki modelde hava durgun, kaldırma ihmal, cisim biçimi sabit ve düşey hareket aşağıdır. Bu koşulları açıklamadan her cisme aynı direnç oku çizmek doğru değildir.",
          "Karesel sürüklenme yaklaşımında Fd = c v², c = ρCdA/2 yazılır. ρ hava yoğunluğu, Cd şekil ve akış rejimine bağlı boyutsuz katsayı, A harekete dik izdüşüm alanıdır; ıslanan bütün yüzey alanı değildir. Kaynakların K A v² yazımında K = ρCd/2 seçilebilir. Çok küçük Reynolds sayısında doğrusal direnç gibi başka modeller gerekebilir; v² evrensel yasa diye sunulmaz.",
        ],
      },
      {
        title: "Net kuvvet küçülürken sürat yine artabilir",
        paragraphs: [
          "Durgun başlayan düşüşte ilk anda direnç sıfır ve ivme g’dir. Sürat arttıkça c v² artar, aşağı net kuvvet mg − c v² ve ivme g − c v²/m azalır. İvmenin azalması, hızın mutlaka azaldığı anlamına gelmez: ivme hâlâ aşağıysa aşağı hızın büyüklüğü artmaya devam eder.",
          "Seçili anda ağırlık ve direnç oklarını ayrı karşılaştır. Direnç ağırlığın yarısıysa ivme g/2’dir; sıfır değildir. Direncin ağırlığa eşit olması net kuvveti sıfır yapar, ağırlığı yok etmez. Model yalnız ilk durgun bırakmadan gelişen aşağı hareketi kapsar; limitten hızlı başlatılan farklı başlangıçta cisim önce yavaşlayabilir.",
        ],
      },
      {
        title: "Limit hızın parametrelerini koşullarıyla karşılaştır",
        paragraphs: [
          "Kuvvet dengesi mg = c vt², dolayısıyla vt = √(mg/c) verir. c > 0 iken bu değer modelin pozitif limit süratidir. Aynı c ve g altında kütle iki kat olursa vt √2 kat; aynı m ve g altında A dört kat olursa, Cd de aynı kalıyorsa vt yarıya iner. Karşılaştırmada sabit tuttuğun nicelikleri açıkça söyle.",
          "Aynı yoğunluk ve biçimde iki kürede kütle r³, izdüşüm alanı r² ile değişir; sabit Cd kabulünde vt, √r ile orantılıdır. Yarıçapı iki kat yapmak kütleyi iki değil sekiz kat yapar. Gerçek damlaların şekli, parçalanması veya Cd değişimi bu benzerlik modelinin dışında olduğundan buradan gerçek hava durumu için kesin hız üretilemez.",
        ],
      },
      {
        title: "Tam denge ile dengeye yaklaşma farklıdır",
        paragraphs: [
          "Sabit karesel dirençte ilk durgun düşüşün tam çözümü v(t) = vt tanh(gt/vt) biçimindedir. Sonlu t’de tanh değeri 1’den küçüktür: ideal matematikte tam vt’ye ancak limitte yaklaşılır. Ders çizimlerindeki bir süre sonra yataylaşma, yeterince yakın sabit sürat yaklaşımı olarak okunmalıdır. Keşifte yüzde 99 eşiği ayrıca adlandırılır.",
          "Düşülen mesafe s(t) = vt²/g · ln cosh(gt/vt), ivme a = g[1 − (v/vt)²] olur. Bu ileri bağıntılar modelin sayısal zaman kontrolünü kurar; soruda verilmeden herkesten hiperbolik fonksiyon ezberi istenmez. Hava direncini sıfır seçince limit sürati diye sonsuz bir etiket basmak yerine v = gt, s = gt²/2 ideal dalı kullanılır.",
        ],
      },
      {
        title: "Enerji kaybı toplam enerjinin yok olması değildir",
        paragraphs: [
          "İlk durgun bırakılan cisim s kadar alçaldığında kaybedilen yer çekimi potansiyeli mg s olur. Durgun havalı modelde bunun bir kısmı K = mv²/2’ye, kalanı cismin–havanın iç enerjisi ve akış hareketlerine aktarılır. Mekanik kayıp Q = mg s − K olarak izlenebilir; bu basitleştirilmiş bilanço içinde Q negatif çıkmamalıdır.",
          "Limit sürate çok yaklaşmış bölümde kinetik yaklaşık sabit olsa da cisim yol almaya ve potansiyel kaybetmeye devam eder; bu aktarım hava tarafına gider. Sabit sürat, enerji aktarımı sıfır demek değildir. Kuvvet–hız gücü ile aktarılan enerji miktarını ayır; bilimsel kaynağın yaklaşık grafiği tüm sistem enerjisinin yok olduğunu göstermez.",
        ],
      },
      {
        title: "Tek değişkenle tahmin et ve hatanı onar",
        paragraphs: [
          "Önce aynı h ve g ile direnci kapat; T ve son sürati ideal denklemden hesapla. Sonra yalnız A veya Cd’yi artırarak daha güçlü direnç seç. İlk ivmenin yine g, sonraki ivmenin daha küçük ve yere varışın daha geç olmasını gerekçelendir. Kütleyi değiştirirken aynı anda alanı farkında olmadan değiştirmek karşılaştırmanın koşulunu bozar.",
          "Her sonucu üç denetimle kapat: birim, sınır ve kuvvet yönü. c v² birimi newton; c sıfıra giderken ideal düşüşe yaklaşılır; durgun havada aşağı hız için direnç yukarıdır. İlk yer temasında durdurulan keşfi okumak veya süre geçirmek XP vermez. Öğrenme kanıtı bağımsız yeni soruyu koşullarını seçerek çözmendir.",
        ],
      },
    ],
    examples: [
      {
        title: "Son saniyeyi toplamdan ayır",
        prompt:
          "Cisim 80 m yükseklikten ilk hızsız bırakılıyor; hava yok, g = 10 m/s². Uçuş süresi, çarpma sürati ve son saniyedeki düşüş?",
        strategy: "Önce toplam süreyi bul, sonra iki toplam konumu çıkar.",
        steps: [
          {
            label: "Yer olayı",
            expression: "80 = 5T² → T = 4 s",
            explanation: "Pozitif gelecek kökü seç.",
          },
          {
            label: "Hız",
            expression: "v = 10 · 4 = 40 m/s",
            explanation: "Yön aşağı, istenen büyüklük pozitiftir.",
          },
          {
            label: "Son aralık",
            expression: "s(4) − s(3) = 80 − 45 = 35 m",
            explanation: "Son saniye 3–4 s aralığıdır.",
          },
        ],
        answer: "4 s; 40 m/s; 35 m.",
        check: "5 + 15 + 25 + 35 = 80 m.",
        pitfall: "Son saniyeyi ilk saniyedeki 5 m sanmak.",
      },
      {
        title: "Limitten önce net kuvvet",
        prompt:
          "2 kg cisim, durgun havada Fd = c v² ve c = 0,05 kg/m ile düşüyor; kaldırma yok, g = 10. Limit sürati ve sürat 10 m/s iken ivmesi?",
        strategy: "Denge hızını ayrı, seçili andaki net kuvveti ayrı kur.",
        steps: [
          {
            label: "Denge",
            expression: "20 = 0,05 vt² → vt = 20 m/s",
            explanation: "Ağırlık ile direnç eşit büyüklükte olur.",
          },
          {
            label: "Seçili direnç",
            expression: "Fd = 0,05 · 10² = 5 N",
            explanation: "10 m/s henüz limit değildir.",
          },
          {
            label: "İvme",
            expression: "a = (20 − 5)/2 = 7,5 m/s²",
            explanation: "Aşağı artı seçildi.",
          },
        ],
        answer: "Limit 20 m/s; seçili ivme aşağı 7,5 m/s².",
        check: "a, sıfır ile g arasındadır.",
        pitfall: "Direnç var diye ivmeyi doğrudan sıfır almak.",
      },
      {
        title: "Boyutu değişen iki küre",
        prompt:
          "Aynı maddeden, aynı biçimde iki kürenin yarıçap oranı 2. Aynı hava/g ve aynı Cd yaklaşımında büyük/küçük limit hız oranı?",
        strategy: "Kütle ve izdüşüm alanını birlikte değiştir.",
        steps: [
          {
            label: "Kütle",
            expression: "mB/mK = 2³ = 8",
            explanation: "Yoğunluk sabit, hacim yarıçapın küpüyle değişir.",
          },
          {
            label: "Alan",
            expression: "AB/AK = 2² = 4",
            explanation: "Dirençteki alan dairesel izdüşümdür.",
          },
          {
            label: "Oran",
            expression: "vtB/vtK = √(8/4) = √2",
            explanation: "Ortak g, hava ve Cd sadeleşir.",
          },
        ],
        answer: "√2.",
        check: "Aynı alan varsayımı yapılmadı.",
        pitfall: "Yarıçap oranını kütle oranı sanmak.",
      },
      {
        title: "Yakınlık eşiğinin anlamı",
        prompt:
          "İlk durgun karesel direnç modelinde vt = 10 m/s ve g = 10. v/vt = tanh(gt/vt) veriliyor; tanh(ln 3) = 0,8 ve tanh⁻¹(0,99) = 0,5 ln 199. t = ln 3 s anındaki sürat/ivme ve yüzde 99 zamanı?",
        strategy:
          "Verilen model fonksiyonunu kullan; ivmeyi Newton ile denetle.",
        steps: [
          {
            label: "Hız",
            expression: "v = 10 · 0,8 = 8 m/s",
            explanation: "İç değişken gt/vt = t olur.",
          },
          {
            label: "İvme",
            expression: "a = 10[1 − 0,8²] = 3,6 m/s²",
            explanation: "Direncin ağırlığa oranı 0,64’tür.",
          },
          {
            label: "Yakınlık",
            expression: "t99 = 0,5 ln 199 ≈ 2,647 s",
            explanation:
              "Bu, yüzde 99’a erişimdir; tam limite erişim değildir.",
          },
        ],
        answer: "8 m/s; aşağı 3,6 m/s²; yaklaşık 2,647 s.",
        check: "Sürat artarken ivme küçülebilir.",
        pitfall: "Yüzde 99 zamanını tam limit zamanı diye adlandırmak.",
      },
    ],
    recall: [
      {
        prompt: "İdeal düşüşte ağır ve hafif cisim neden aynı ivmelidir?",
        answer:
          "Aynı sabit g ve ihmal edilebilir dirençte mg = ma; m sadeleşir.",
      },
      {
        prompt: "Karesel dirençte alan hangi alandır?",
        answer: "Akışa dik izdüşüm alanı; bütün yüzey alanı değildir.",
      },
      {
        prompt: "İvme azalınca aşağı düşüş sürati mutlaka azalır mı?",
        answer: "Hayır; aşağı ivme pozitif kaldıkça aşağı sürat artar.",
      },
      {
        prompt: "Tam limit ve yüzde 99 limiti ayır.",
        answer:
          "İlk durgun sabit karesel modelde tam limit asimptotik, yüzde 99 sonlu eşiktir.",
      },
    ],
    questions: [
      {
        prompt:
          "Hava yokken 80 m’den ilk hızsız bırakılan cismin yere varış süresi kaç saniyedir? g = 10 m/s².",
        correct: "4",
        distractors: ["2", "8", "16", "40"],
        hint: "h = gt²/2 kullan; gelecek zamanı seç.",
        explanation: "80 = 5t² → t² = 16; fiziksel süre t = 4 s.",
      },
      {
        prompt:
          "Hava yok, g = 10 m/s². İlk hızsız bırakılan cisim yere henüz değmemişken 2 s sonra sürati kaç m/s olur?",
        correct: "20",
        distractors: ["5", "10", "40", "80"],
        hint: "Sürat v = gt; düşülen mesafe ile karıştırma.",
        explanation:
          "v = 10 · 2 = 20 m/s; aynı andaki düşüş 20 m olsa da nicelikler farklıdır.",
      },
      {
        prompt:
          "80 m’den ilk hızsız bırakılan cismin son 1 saniyede aldığı yol kaç metredir? Hava yok, g = 10 m/s².",
        correct: "35",
        distractors: ["5", "15", "20", "45"],
        hint: "Toplam süre 4 s; 3–4 s aralığının konum farkı.",
        explanation: "s(4) = 80, s(3) = 45 m; fark 35 m.",
      },
      {
        prompt:
          "Aynı sabit g ve hava direnci yokken ilk hızsız düşme yüksekliği iki katına çıkarılırsa uçuş süresi hangi çarpanla değişir?",
        correct: "√2",
        distractors: ["2", "4", "1/2", "1/√2"],
        hint: "T = √(2h/g).",
        explanation:
          "Yükseklik kök içinde olduğundan T₂/T₁ = √2; iki kat değildir.",
      },
      {
        prompt:
          "Durgun havada 2 kg cisim için Fd = 0,05v² N (v m/s), kaldırma yok ve g = 10 m/s². Modelin limit sürati kaç m/s?",
        correct: "20",
        distractors: ["5", "10", "40", "400"],
        hint: "Limitte mg = Fd.",
        explanation: "20 = 0,05v² → v² = 400; pozitif sürat 20 m/s.",
      },
      {
        prompt:
          "Durgun havada 2 kg cisim aşağı 10 m/s hızla gidiyor. Fd = 0,05v² N, g = 10 m/s² ve kaldırma yok. O anki ivmenin büyüklüğü kaç m/s²?",
        correct: "7,5",
        distractors: ["0", "2,5", "5", "10"],
        hint: "Aşağı net kuvvetten kütleye böl.",
        explanation:
          "Direnç yukarı 5 N, ağırlık aşağı 20 N; net 15 N, a = 15/2 = 7,5 m/s².",
      },
      {
        prompt:
          "Fd = c v² modelinde aynı c > 0 ve g korunurken cismin kütlesi iki kat yapılıyor. Limit sürat hangi çarpanla değişir?",
        correct: "√2",
        distractors: ["2", "4", "1/2", "Değişmez"],
        hint: "vt = √(mg/c); c ve g sabit veriliyor.",
        explanation:
          "Aynı c ve g’de limit sürat kütlenin kareköküyle değişir; oran √2.",
      },
      {
        prompt:
          "Aynı yoğunluk ve biçimde iki kürenin yarıçap oranı büyük/küçük = 2. Aynı Cd, hava ve g altında karesel direnç modelinde limit sürat oranı nedir?",
        correct: "√2",
        distractors: ["2", "4", "8", "1/2"],
        hint: "Kütle r³, izdüşüm alanı r².",
        explanation: "vt oranı √(8/4) = √2; kütle ve alan birlikte değişir.",
      },
      {
        prompt:
          "İlk durgun düşüşte sabit karesel direnç çözümü v(t) = vt tanh(gt/vt) ve sonlu z > 0 için 0 < tanh z < 1 veriliyor. Hangisi doğrudur?",
        correct: "Tam vt’ye sonlu zamanda ulaşılmaz",
        distractors: [
          "İlk saniyede kesin vt olur",
          "g her anda sıfırdır",
          "Ağırlık limitte yok olur",
          "İvme ilk anda sıfırdır",
        ],
        hint: "Verilen tanh aralığını sürat oranına uygula.",
        explanation:
          "Her sonlu pozitif zamanda v/vt < 1; yaklaşım asimptotiktir, yüzde 99 gibi bir eşik sonludur.",
      },
      {
        prompt:
          "Durgun havada dirençle düşen cisim için potansiyel kaybı 100 J, kinetik artışı 60 J. Başka enerji girişi yoksa bu bilançoda hava/cisim iç enerjisine ve akışa aktarım kaç J?",
        correct: "40",
        distractors: ["0", "60", "100", "160"],
        hint: "Kaybolan mekanik enerji toplam enerjinin yok olması değildir.",
        explanation:
          "100 = 60 + Q → Q = 40 J. Toplam bilanço korunur; cismin mekanik enerjisi azalır.",
      },
    ],
  },
  {
    id: "dusey-atis",
    topic: "detail-365",
    title: "Düşey atış: tepe, dönüş ve ilk yer teması",
    minutes: 100,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 48–50; OGM 11. sınıf Düşey Atış özeti ve Dersler Cepte, s. 12–13. Özgün öğretim ve özgün sorular; resmî ÖSYM sorusu değildir.",
    objectives: [
      "Yukarı artı eksende ilk hızın işaretiyle yükselme ve düşmeyi aynı modelde çöz.",
      "Tepe, aynı seviyeye dönüş ve ilk yer teması olaylarını ayır.",
      "Konum, yer değiştirme, yol ve grafikteki alan/eğimi birlikte denetle.",
    ],
    sections: [
      {
        title: "Serbest düşmeyi yeni bir başlangıçla genişlet",
        paragraphs: [
          "Önceki ünitede ilk hız sıfırdı; burada cisim yukarı veya aşağı bir ilk hızla bırakılır. Hava direnci yok, yer çerçevesi eylemsiz ve g sabit kabul edilir. Yukarı yönü +y seçersek her iki hareket için aynı a = −g geçerlidir. Hız yukarıyken ivme aşağı olabilir; kuvveti cismin gitmek istediği yöne göre uydurmayız.",
          "İlk yükseklik y0 zemine göre, ilk hız v0 ise işaretli olarak verilir. Başlangıçtaki itme bittiğinde cisme ayrıca atış kuvveti kalmaz; ideal uçuş boyunca tek gerçek kuvvet ağırlıktır. Topa ilk hız kazandıran etkileşim ile serbest uçuşu aynı an sanmak, tepeye kadar yukarı kuvvet taşımak gibi yanlışlara yol açar.",
        ],
      },
      {
        title: "Aynı üç denklem, açık bir eksen",
        paragraphs: [
          "Sabit g ile v(t) = v0 − gt ve y(t) = y0 + v0t − gt²/2 yazılır. Zaman elenince v² = v0² − 2g(y − y0) bulunur. Burada y − y0 işaretli yer değiştirmedir; aşağı atışta otomatik eksi işaretini silip bütün büyüklükleri artı yazmak tutarsız sonuç verir. Sayısal veriyi yerine koymadan ekseni çiz.",
          "v² bağıntısından elde edilen pozitif kök sürattir; aynı yüksekliğe çıkış ve inişte iki farklı hız işareti karşılık gelebilir. Zaman isteniyorsa v denkleminden veya konumun ikinci derecesinden fiziksel kökü seç. Denklemden çıkan negatif zaman çoğunlukla seçilen t = 0’dan önceki matematiksel uzantıdır; gelecekteki uçuş süresi diye sunulmaz.",
        ],
      },
      {
        title: "Yukarı atışın tepesinde ne sıfır?",
        paragraphs: [
          "v0 > 0 ise tepe anı v = 0 koşulundan ttepe = v0/g olur. Yükselme miktarı v0²/(2g), zemine göre en büyük yükseklik y0 + v0²/(2g)’dir. Tepe anında yalnız düşey hız sıfırdır; ivme −g ve ağırlık mg sürer. Tek bir andaki duruş, bir zaman aralığı boyunca denge demek değildir.",
          "Düşeyde topun yön değiştirdiği noktayı konum grafiğinin yatay teğetinden, hız grafiğinin sıfır geçişinden görürsün. v0 ≤ 0 ise gelecekte bir yükselme tepesi yoktur; en yüksek konum başlangıç y0’dır. Genel −v0/a formülüne işaret kontrolü yapmadan bir gelecekteki tepe yakıştırmak yerine olayın aralıkta bulunup bulunmadığını denetle.",
        ],
      },
      {
        title: "Aynı seviyedeki simetri koşulludur",
        paragraphs: [
          "Cisim hava direnci olmadan aynı yüksekliğe dönerse çıkış ve iniş süreleri eşit, aynı seviyedeki süratler eşit, hız yönleri zıttır. Yerden yukarı v0 ile atılıp aynı yere dönen cismin toplam uçuşu 2v0/g olur. Bu simetri sabit g ve aynı seviye koşulunun sonucudur; her düşey atışta toplam süreyi ikiyle bulma kuralı değildir.",
          "Örneğin bir balkonun üstünden yukarı atılan topun tepesinden zemine kadar ineceği yükseklik, balkondan tepeye çıkıştan büyüktür. İniş daha uzun sürer ve yere çarpma sürati ilk süratten büyük olur. Çıkış noktasına dönüş ile zemine varış ayrı olaylardır; görselde iki seviyeyi ayrı işaretleyerek koşulu açık tut.",
        ],
      },
      {
        title: "İlk yer temasını bir olay olarak çöz",
        paragraphs: [
          "Zemin y = 0 ise y0 + v0T − gT²/2 = 0 denkleminin gelecekteki ilk temas kökü T = [v0 + √(v0² + 2gy0)]/g olur. y0 > 0 için bu pozitiftir. Hız T’de v0 − gT ile bulunur. Model topu T’den sonra aşağı sürdürmez; sıçrama veya zeminde durma başka kuvvet ve enerji modeli ister.",
          "Başlangıç zemindeyse v0 > 0 yukarı uçuşun sonraki kökü seçilir; v0 ≤ 0 için ilk temas zaten t = 0’dır. Aşağı hızlı atışta kök hesabında yakın iki sayının farkı sayısal hata yaratabilir; eşdeğer 2y0/[√(v0² + 2gy0) − v0] biçimi kullanılabilir. Fizik modeliyle sayısal uygulamanın aynı olayı döndürmesi gerekir.",
        ],
      },
      {
        title: "Aşağı atış, ilk hızsız düşüş değildir",
        paragraphs: [
          "v0 < 0 olan aşağı atışta hız baştan aşağıdır, a da aşağı olduğundan sürat artar. Aynı yükseklik ve g’de aşağı ilk hızlı atılan top, ilk hızsız bırakılana göre daha erken yere ulaşır. Ancak yatay atıştaki yatay ilk hız bu düşey ilk hızla karıştırılmaz; farklı eksenlerdeki başlangıç koşullarıdır.",
          "Aşağı atışın v–t doğrusu sıfırdan değil negatif v0’dan başlar. Düşülen mesafe |v0|t + gt²/2 iken yukarı artı konumu y0 − |v0|t − gt²/2’dir. Büyüklükle çözmeyi seçebilirsin ama işaretli hız grafiğine geçtiğinde tanımı yeniden açıkla. Aynı aralıkta alınan yol, aşağı tek yönlü harekette yer değiştirme büyüklüğüne eşittir.",
        ],
      },
      {
        title: "Yol ile yer değiştirmeyi dönüşte ayır",
        paragraphs: [
          "Top önce yukarı sonra aşağı giderse alınan yol, başlangıçtan tepeye yükseliş ile tepeden seçili konuma inişin toplamıdır. Yer değiştirme ise yalnız y(t) − y0’dır. Aynı başlangıç noktasına dönünce yer değiştirme sıfır, yol iki yükselme miktarıdır; ortalama hız sıfır olabilir ama ortalama sürat sıfır olmaz.",
          "Seçili zaman tepeyi geçmediyse yol |y(t) − y0| kadardır. Geçtiyse yol = [ytepe − y0] + [ytepe − y(t)] olur. Ortalama hız Δy/t, ortalama sürat yol/t biçimindedir; t = 0’da bu oranlar tanımsızdır. Keşif ilk anda uydurma bir sıfır ortalaması göstermeden bu istisnayı söyler.",
        ],
      },
      {
        title: "Grafiklerde aynı olayı üç kez doğrula",
        paragraphs: [
          "y–t eğrisi sabit −g nedeniyle aşağı konkav bir paraboldür; teğeti v’yi verir. v–t doğrusu eğimi −g, altında kalan işaretli alan ise Δy’dir. Tepeye kadar eksen üstü alan pozitif yükselme, sonraki eksen altı alan negatif iniştir. Toplam yol için bu alanların büyüklükleri toplanır.",
          "a–t çizgisi uçuş boyunca −g’de kalır; tepe anında sıfıra zıplamaz. Grafiğin negatif bölgede olması fiziksel büyüklüğün yokluğu değildir. Konum sıfırını zeminden balkona taşırsan y grafiği düşey ötelenir ama v, a, uçuşun gerçek geometrisi ve iki konum arasındaki yer değiştirme değişmez.",
        ],
      },
      {
        title: "İki kök ve erişilebilir yükseklik",
        paragraphs: [
          "Yerden yukarı 30 m/s atılan top için g = 10 iken tepe 45 m’dir. y = 25 m denklemi 30t − 5t² = 25, yani t = 1 ve 5 s verir; hızlar +20 ve −20 m/s olur. İki kök aynı seviyenin çıkış ve iniş ziyaretleridir. y = 50 m için gerçek kök bulunmaması, cismin o seviyeye erişemediğini gösterir.",
          "Bir noktaya iki kez gelmek ancak o nokta erişilebilir ve uçuş aralığında ise mümkündür. Başlangıcın altındaki bir yükseklik için geçmişteki matematiksel kökü gelecekteki ikinci ziyaret sanma. Kareköklü süratten hız yönü çıkarmak yerine seçili kökün ttepe’den önce mi sonra mı olduğuna bak; sonra v = v0 − gt ile işareti doğrula.",
        ],
      },
      {
        title: "Tahminini olay ve sınırlarla denetle",
        paragraphs: [
          "Keşifte önce y0’ı sabit tutup v0’ı pozitiften sıfıra ve negatife getir. Aynı g altında tepenin ne zaman kaybolduğunu, yere varışın nasıl değiştiğini ve ivmenin neden aynı kaldığını açıkla. Zamanı elle tepeye veya yere götür; topun koordinatı, hız oku ve yazılı sonuç aynı olayı göstermelidir.",
          "Sonuç kontrolünde g ve zaman birimlerini, y ≥ 0 uçuş sınırını ve her hızın işaretini doğrula. Aynı yüksekliğe dönüş simetrisini zemin farklıyken kullanma. Bu kontrollü keşif otomatik başarı veya XP üretmez; yeni bir yükseklik ve ilk hızla bağımsız problem kurabildiğinde mantığı başka bağlama aktarmış olursun.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı yüksekliğin iki ziyareti",
        prompt:
          "Top yerden yukarı 30 m/s ile atılıyor; hava yok, g = 10. Tepe ve uçuş süresi ile 25 m yüksekliğe geliş zamanları/hızları?",
        strategy: "Tepeyi hızdan, iki ziyareti konumdan bul.",
        steps: [
          {
            label: "Tepe",
            expression: "t = 30/10 = 3 s; H = 30²/20 = 45 m",
            explanation: "Aynı zemine dönüş 6 s sürer.",
          },
          {
            label: "Kökler",
            expression: "30t − 5t² = 25 → (t − 1)(t − 5) = 0",
            explanation: "İki zaman da 0–6 s uçuş aralığındadır.",
          },
          {
            label: "Hızlar",
            expression: "v(1) = +20; v(5) = −20 m/s",
            explanation: "Aynı sürat iki zıt yönde görülür.",
          },
        ],
        answer:
          "Tepe 3 s/45 m; uçuş 6 s; 25 m’de 1 ve 5 s, hızlar +20/−20 m/s.",
        check: "Ortalama zaman (1 + 5)/2 = 3 s tepe zamanıdır.",
        pitfall: "Sürat kökünü iki ziyarette de pozitif hız sanmak.",
      },
      {
        title: "Balkondan yukarı, zemine aşağı",
        prompt:
          "Top y0 = 20 m balkondan yukarı 15 m/s ile atılıyor. Hava yok, g = 10. İlk yer zamanı, çarpma hızı ve bütün uçuşta yol?",
        strategy: "Tepe ile ilk yer kökünü ayrı bul.",
        steps: [
          {
            label: "Tepe",
            expression: "ttepe = 1,5 s; ytepe = 20 + 225/20 = 31,25 m",
            explanation: "Yükselme 11,25 m’dir.",
          },
          {
            label: "Yer",
            expression: "20 + 15T − 5T² = 0 → T = 4 s; v = −25 m/s",
            explanation: "Diğer kök −1 s uçuş öncesidir.",
          },
          {
            label: "Yol",
            expression: "11,25 + 31,25 = 42,5 m",
            explanation: "Yer değiştirme yalnız −20 m’dir.",
          },
        ],
        answer: "4 s; −25 m/s; 42,5 m yol.",
        check: "v² = 225 + 2 · 10 · 20 = 625.",
        pitfall: "İniş süresini çıkış süresine eşit almak.",
      },
      {
        title: "İlk hız zaten aşağı",
        prompt:
          "40 m yükseklikteki top aşağı 10 m/s ile atılıyor; yukarı artı, hava yok ve g = 10. Yere varış ve hız?",
        strategy: "Negatif ilk hızı tek genel denkleme koy.",
        steps: [
          {
            label: "Konum",
            expression: "0 = 40 − 10T − 5T²",
            explanation: "y0 = 40, v0 = −10 alınır.",
          },
          {
            label: "Kök",
            expression: "T² + 2T − 8 = 0 → T = 2 s",
            explanation: "−4 s gelecekte değildir.",
          },
          {
            label: "Son hız",
            expression: "v = −10 − 10 · 2 = −30 m/s",
            explanation: "Sürat 30 m/s; yol 40 m’dir.",
          },
        ],
        answer: "2 s; aşağı 30 m/s.",
        check: "30² = 10² + 2 · 10 · 40.",
        pitfall: "Aşağı ilk hızı sıfır kabul etmek.",
      },
      {
        title: "Eşit süre ezberinin sınırı",
        prompt:
          "Top yerden 20 m yukarıdaki noktadan yukarı 20 m/s ile atılıyor; hava yok, g = 10. Çıkış ve tepeden zemine iniş süreleri?",
        strategy:
          "Çıkışı başlangıca göre, inişi gerçek tepe yüksekliğine göre hesapla.",
        steps: [
          {
            label: "Çıkış",
            expression: "tç = 2 s; tepe = 20 + 20²/20 = 40 m",
            explanation: "Zemin ile başlangıç aynı seviye değildir.",
          },
          {
            label: "İniş",
            expression: "40 = 5ti² → ti = √8 s",
            explanation: "Tepe anında düşey hız sıfırdır.",
          },
          {
            label: "Toplam",
            expression: "T = 2 + √8 ≈ 4,828 s",
            explanation: "İniş yaklaşık 2,828 s ile daha uzundur.",
          },
        ],
        answer: "Çıkış 2 s; iniş √8 s; toplam 2 + √8 s.",
        check: "Genel ilk yer kökü de (20 + √800)/10 verir.",
        pitfall: "Toplamı koşulsuz 2tç saymak.",
      },
    ],
    recall: [
      {
        prompt: "Tepe anında hangi büyüklükler sıfırdır?",
        answer: "Düşey hız sıfır; ağırlık ve aşağı ivme sıfır değildir.",
      },
      {
        prompt: "Eşit çıkış ve iniş süresi hangi koşuldadır?",
        answer: "İdeal sabit g/hava yok ve aynı başlangıç–varış seviyesi.",
      },
      {
        prompt: "Yer değiştirme sıfırken yol olabilir mi?",
        answer: "Aynı yere dönmede yol pozitiftir, yer değiştirme sıfırdır.",
      },
      {
        prompt: "İki pozitif kök ne anlatabilir?",
        answer:
          "Uçuş aralığındaki aynı yüksekliğin çıkış ve iniş ziyaretlerini.",
      },
    ],
    questions: [
      {
        prompt:
          "Top yerden yukarı 30 m/s ile atılıyor. Hava yok ve g = 10 m/s². Tepeye kaç saniyede çıkar?",
        correct: "3",
        distractors: ["1,5", "6", "9", "30"],
        hint: "Tepe anında v = 0.",
        explanation: "0 = 30 − 10t → t = 3 s; g tepe anında da sürer.",
      },
      {
        prompt:
          "Top yerden yukarı 30 m/s ile atılıyor; hava yok, g = 10 m/s². En büyük yüksekliği kaç metredir?",
        correct: "45",
        distractors: ["15", "30", "60", "90"],
        hint: "H = v0²/(2g).",
        explanation: "H = 900/20 = 45 m; hızın karesi gerekir.",
      },
      {
        prompt:
          "Hava yok ve g sabit. Düşey yukarı atılan topun en yüksek noktasında hangisi doğrudur?",
        correct: "Hız sıfır, ivme aşağı g",
        distractors: [
          "Hız ve ivme sıfır",
          "Ağırlık sıfır",
          "İvme yukarı g",
          "Hız aşağı ve ivme sıfır",
        ],
        hint: "Bir andaki duruşu kuvvet dengesiyle karıştırma.",
        explanation:
          "Tepe anında v = 0 ama tek kuvvet mg aşağı olduğundan a = −g sürer.",
      },
      {
        prompt:
          "Top yerden yukarı 30 m/s ile atılıyor. Hava yok, g = 10. 25 m yüksekliğe gelecekteki geliş zamanları nedir?",
        correct: "1 s ve 5 s",
        distractors: ["1 s ve 3 s", "2 s ve 4 s", "3 s ve 5 s", "Yalnız 5 s"],
        hint: "30t − 5t² = 25 denkleminin uçuş içindeki iki kökü.",
        explanation:
          "5t² − 30t + 25 = 5(t − 1)(t − 5); iki kök 0–6 s aralığındadır.",
      },
      {
        prompt:
          "20 m yükseklikteki top yukarı 15 m/s ile atılıyor. Yukarı artı, hava yok, g = 10. İlk yer temasındaki işaretli hız kaç m/s?",
        correct: "−25",
        distractors: ["−15", "+15", "+20", "+25"],
        hint: "Önce T = 4 s yer kökünü konum denklemiyle doğrula.",
        explanation: "0 = 20 + 15T − 5T² → T = 4; v = 15 − 40 = −25 m/s.",
      },
      {
        prompt:
          "40 m yükseklikten aşağı 10 m/s ile atılan top, hava yok ve g = 10 iken kaç saniyede yere ulaşır?",
        correct: "2",
        distractors: ["1", "√8", "4", "8"],
        hint: "Aşağı mesafe 10t + 5t².",
        explanation: "40 = 10t + 5t² → (t − 2)(t + 4) = 0; gelecek süre 2 s.",
      },
      {
        prompt:
          "Top yerden yukarı 20 m/s ile atılıp aynı yere dönüyor. Hava yok, g = 10. Bütün uçuşta yer değiştirme ve yol sırasıyla?",
        correct: "0 m ve 40 m",
        distractors: [
          "0 m ve 20 m",
          "20 m ve 20 m",
          "40 m ve 0 m",
          "−20 m ve 40 m",
        ],
        hint: "Tepe 20 m; çıkış ve inişi yola ayrı ekle.",
        explanation:
          "Başlangıç–son aynı olduğundan Δy = 0; yol 20 + 20 = 40 m.",
      },
      {
        prompt:
          "Top 20 m yükseklikten yukarı 15 m/s ile atılıyor. Hava yok, g = 10. İlk yer temasına kadar alınan toplam yol kaç metredir?",
        correct: "42,5",
        distractors: ["20", "22,5", "31,25", "40"],
        hint: "Başlangıçtan tepeye 11,25 m yükselir.",
        explanation:
          "Tepe 31,25 m; yol 11,25 + 31,25 = 42,5 m. Yer değiştirme −20 m’dir.",
      },
      {
        prompt:
          "İdeal düşey atışta hangi durumda çıkış süresinin iniş süresine eşit olduğu kesin söylenebilir?",
        correct: "Başlangıç ve varış aynı seviyede, g sabit ve hava yoksa",
        distractors: [
          "Her balkondan atışta",
          "Yalnız topun kütlesi büyükse",
          "Başlangıç ve varış yüksekliği farklıysa",
          "Direnç varken her zaman",
        ],
        hint: "Simetriyi taşıyan varsayımları birlikte seç.",
        explanation:
          "Sabit g ve dirençsiz hareketin aynı seviye ziyaretleri tepe etrafında simetriktir; farklı varış seviyesi bu eşitliği bozar.",
      },
      {
        prompt:
          "Yukarı artı eksende v0 = 0 ile 10 m yükseklikten bırakılan top için model ilk yer temasında biter. g = 10, hava yok. Hangi zaman uçuş aralığındadır?",
        correct: "1 s",
        distractors: ["2 s", "3 s", "4 s", "5 s"],
        hint: "T = √(2h/g) = √2 s.",
        explanation:
          "0 ≤ t ≤ √2 ≈ 1,414 s; verilenlerden yalnız 1 s ilk temas öncesidir.",
      },
    ],
  },
  {
    id: "yatay-atis",
    topic: "detail-366",
    title: "Yatay atış: iki eksen, tek ortak zaman",
    minutes: 100,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 51–53; OGM 11. sınıf Yatay Atış özeti ve Dersler Cepte, s. 14–15. Özgün öğretim ve sorular; resmî ÖSYM sorusu değildir.",
    objectives: [
      "Yatay ve düşey hareketi ortak zamanda bağımsız bileşen denklemleriyle birleştir.",
      "Gerçek parabolün teğet hızını, bileşenlerini ve ilk yer olayını yorumla.",
      "Uçuş süresi, menzil, sürat ve enerji arasında geçerli koşullu ilişkiler kur.",
    ],
    sections: [
      {
        title: "Yatay hız düşey süreyi değiştirmez mi?",
        paragraphs: [
          "Bir cisim h > 0 yükseklikten tam yatay u hızıyla atılsın. Durgun yer çerçevesinde hava direnci yok ve g sabit ise tek kuvvet aşağı mg’dir. x sağa, y yukarı seçildiğinde başlangıç hızının düşey bileşeni sıfırdır; yatay bileşen u’dur. Yatay ilk hız, düşey yönde yeni bir kuvvet üretmez.",
          "Aynı yükseklikten aynı anda ilk hızsız bırakılan ikinci cisimle düşey konumları her anda aynıdır; ilk yer temasları da aynıdır. Bu sonuç başlangıçların aynı yüksekliğe ve aynı düşey ilk hıza sahip olmasına dayanır. Birinin daha aşağıda başlaması, düşey ilk hız veya önemli hava direnci eklenmesi bu yalın karşılaştırmayı değiştirebilir.",
        ],
      },
      {
        title: "Bileşen denklemlerinde zaman ortaktır",
        paragraphs: [
          "Başlangıç x0 = 0 ve y0 = h ise x = ut, y = h − gt²/2, vx = u, vy = −gt ve a = (0, −g) olur. İki eksenin ayrı denklemleri olmasına rağmen her noktada kullanılan t aynı andır. Önce düşey hareketten uçuş süresini bulup sonra o süreyi yataya aktarmak bu yüzden geçerlidir.",
          "Uçuşu sağa yapmak için u > 0 seçilebilir; sola atışta u < 0 olur ve x de negatif gider. Yatay yol uzunluğu |u|T, yönlü menzil uT’dir. İşaretli vektörle sürati karıştırmamak için toplam hız (u, −gt), sürat ise √(u² + g²t²) diye ayrı yazılır. Sayısal keşif koordinatları ile bu HTML sonuçları aynı denklemi kullanır.",
        ],
      },
      {
        title: "İlk yer olayı ve menzil",
        paragraphs: [
          "İlk yer teması y(T) = 0 koşulundan T = √(2h/g) verir. Uçuş süresi h ve g’ye bağlı, bu ideal modelde u ve kütleden bağımsızdır. Sonra yatay yer değiştirme R = u√(2h/g) bulunur. h dört kat olursa T iki, aynı u ile menzil de iki kat olur; yükseklikle doğrusal değişim sanma.",
          "u iki kat yapılırsa aynı h ve g’de uçuş süresi aynı kalırken menzil iki kat olur. Bu oranı şeklin yatay uzamasında gör; topun düşey düzlemde daha yavaş çökmesi gerekmez. Zemin düz ve sabit seçilmiştir; yamaç veya yükseltilmiş hedef varsa varış yüksekliği değiştirilerek yeni kesişme olayı çözülmelidir.",
        ],
      },
      {
        title: "Parabol, hız bileşenlerini gizlemez",
        paragraphs: [
          "u ≠ 0 iken t = x/u elenirse y = h − gx²/(2u²) paraboli elde edilir. Bu yörünge denklemi konumları bağlar; hızın iki bileşeni hâlâ gereklidir. u = 0 dalında x üzerinden bölme yapılamaz, cisim aynı modelin serbest düşme özel durumudur. Program bu uç durumda bozuk veya sonsuz bir eğri çizmemelidir.",
          "Gerçek çizimde x ve y metreleri aynı fiziksel uzunlukla gösterilirse parabolün eğimi hızın yönüyle uyumludur. Eksenleri farklı ölçeklerken açıları gerçek diye ölçmek yanıltır. Keşif eşit ölçekli koordinatlarda çizilir; oklar ayrı bir hız ölçeğine sahiptir ve başlangıçları cismin seçili konumudur. Hız okunun doğrultusu gerçek teğetle aynı olmalıdır.",
        ],
      },
      {
        title: "Bir anda hız, bileşen toplamıdır",
        paragraphs: [
          "t anında yatay hız hâlâ u, düşey hız aşağı gt büyüklüğündedir. Dik bileşenlerden sürat v = √(u² + g²t²) çıkar; u + gt toplamak yanlıştır. Hızın yataya göre açısı tanβ = vy/vx ile bulunabilir, fakat işaret ve bölge için iki bileşen birlikte düşünülür. Sağ aşağı hızda açı yatayın altındadır.",
          "Yere çarpmadan hemen önce vy² = 2gh ve vson² = u² + 2gh olur. u sıfır değilse çarpma sürati yalnız √(2gh) değildir; o değer düşey bileşenin büyüklüğüdür. Teğet okunu seçili zamana taşıyarak bu iki katkıyı izle. Hız ile ivme yalnız düşey aşağıya yaklaşsa bile sonlu u’da genel olarak aynı doğrultuda değildir.",
        ],
      },
      {
        title: "Eşit zamanların konum izleri",
        paragraphs: [
          "Eşit Δt aralıklarında yatay uzaklıklar uΔt ile eşittir. Düşey ilk hız sıfır olduğundan ardışık düşüşler 1, 3, 5… oranındadır. Bu nedenle yörüngedeki noktalar yatayda eşit aralıklı, düşeyde gittikçe daha ayrık görünür. Yörünge boyunca gerçek yay uzunluklarının eşit olduğunu buradan çıkaramazsın.",
          "g = 10 iken ilk üç saniyede toplam düşüş 5, 20, 45 m; u = 20 ise yatay konumlar 20, 40, 60 m’dir. Her noktadaki hızı o noktanın t’siyle hesapla. Şekle dekoratif rastgele nokta dizmek yerine bu sayısal noktalar kullanılır; mevcut topu elle zaman adımlarıyla aynı konumlara getirebilirsin.",
        ],
      },
      {
        title: "Üç grafiği eksenleriyle oku",
        paragraphs: [
          "Yatay x–t doğrusal, vx–t sabit u ve ax–t sıfırdır. Düşey y–t aşağı konkav, vy–t eğimi −g olan doğru, ay–t sabit −g’dir. “Hız sabit” sözü yalnız hangi bileşene ait olduğu belirtilince doğrudur; toplam sürat uçuşta artar. Bir grafiğin yalnız renginden ekseni tahmin etme.",
          "vx grafiğinin alanı x yer değiştirmesini, vy grafiğinin alanı y değişimini verir; iki alanı doğrudan toplam yol diye toplamazsın. Toplam yol eğri boyunca alınır ve bileşen yollarının basit toplamı değildir. Bu ünitede menzil x yönündeki uzaklıktır; gerçek yörünge uzunluğu sorulmadıkça ona menzil adı verilmez.",
        ],
      },
      {
        title: "Kütle sadeleşirken enerji farklı olabilir",
        paragraphs: [
          "İdeal koşullarda T, R ve hız bileşenlerinde kütle bulunmaz; çünkü tek kuvvet mg iken m a denkleminde kütle sadeleşmiştir. Aynı u ve h ile iki farklı kütlenin geometrik yolu aynıdır. Ancak kinetik enerji K = mv²/2 ve potansiyel Ug = mgy kütleye bağlıdır; aynı hız demek aynı enerji demek değildir.",
          "Yatay atışta ağırlığın işi yalnız düşey alçalma üzerinden +mgh olur. Wnet = ΔK, yani mvson²/2 − mu²/2 = mgh; buradan yine vson² = u² + 2gh gelir. Yatay ilk kinetiği unutmak son sürati eksik hesaplatır. Hava direnci varsa kütle, şekil ve alan yeni kuvveti etkilediğinden bu bağımsızlıklar yeniden sınanır.",
        ],
      },
      {
        title: "Hedefi zamanla kontrol et",
        paragraphs: [
          "Bir duvar veya ara seviye sorusunda önce x = ut ile duvara geliş zamanını bul. Ardından y(t) ile topun o yükseklikte olup olmadığını denetle; bulunan zaman ilk yer T’sini aşıyorsa top duvara havada ulaşmamıştır. Grafik uzantısının zeminin altında görünmesi erişilebilir bir uçuş noktası değildir.",
          "Bir hedefe çarpma sürati istenirse o t’de hem vx hem vy kullanılır. Verilmeyen bir başlangıç yönünü ya da hedef yüksekliğini şeklin görünüşünden uydurma. Tahminini koordinatlar ve olay sınırıyla denetle: bir hız bileşeni negatif olabilir ama sürat negatif olmaz; h > 0, g > 0 ve 0 ≤ t ≤ T açık model koşullarıdır.",
        ],
      },
      {
        title: "Tek parametreyi değiştirerek öğren",
        paragraphs: [
          "Keşifte önce h = 45 m, u = 20 m/s ve g = 10 seçerek T = 3 s, R = 60 m tahminini kur. Zamanı 1 ve 2 saniyeye taşı; x ve y koordinatlarıyla hız okunun yönünü birlikte oku. Sonra yalnız u’yu değiştir; düşey izlerin aynı anda aynı yükseklikte kaldığını gözle.",
          "Yükseklik veya g değişince artık önceki toplam zamanı ezberden kullanma. Koordinat alanı bütün uçuşa göre sabit kalır; seçili an topu ekranda keyfî kaydırarak farklı hız hissi yaratmaz. Model elle adımlanır ve durgun görüntüde bile tüm sonuçlar HTML’de okunur. Keşif başarı veya XP sayılmaz; bağımsız sorular mantığı yeniden kurmanı ister.",
        ],
      },
    ],
    examples: [
      {
        title: "Üç saniyelik ortak uçuş",
        prompt:
          "45 m yükseklikten sağa 20 m/s ile yatay atış yapılıyor. Hava yok, g = 10. Uçuş, menzil ve çarpma sürati?",
        strategy:
          "Süreyi düşeyden, menzili yataydan, sürati iki bileşenden bul.",
        steps: [
          {
            label: "Düşey süre",
            expression: "45 = 5T² → T = 3 s",
            explanation: "Düşey ilk hız sıfırdır.",
          },
          {
            label: "Bileşenler",
            expression: "R = 20 · 3 = 60 m; vy = −30 m/s",
            explanation: "vx = 20 m/s sabit kalır.",
          },
          {
            label: "Sürat",
            expression: "v = √(20² + 30²) = 10√13 m/s",
            explanation: "Dik bileşenler Pisagor ile birleşir.",
          },
        ],
        answer: "3 s; 60 m; 10√13 m/s.",
        check: "v² = u² + 2gh = 400 + 900.",
        pitfall: "20 + 30 = 50 m/s diye sürat toplamak.",
      },
      {
        title: "Aynı yükseklik, farklı yatay hız",
        prompt:
          "20 m’den aynı anda 10 ve 20 m/s yatay hızlarla iki top atılıyor. Hava yok, g = 10. Varış süreleri ve menziller?",
        strategy: "Düşey başlangıçları eşit olduğu için ortak T’yi bul.",
        steps: [
          {
            label: "Ortak düşey",
            expression: "20 = 5T² → T = 2 s",
            explanation: "İki cismin ilk vy değeri de sıfır.",
          },
          {
            label: "Yatay sonuç",
            expression: "R1 = 10 · 2 = 20 m; R2 = 20 · 2 = 40 m",
            explanation: "Aynı zaman farklı yatay uzama verir.",
          },
          {
            label: "Son kontrol",
            expression: "vy1 = vy2 = −20 m/s",
            explanation:
              "Toplam süratleri yatay bileşen farkı nedeniyle farklıdır.",
          },
        ],
        answer: "İkisi 2 s; menziller 20 ve 40 m.",
        check: "Yatay hızlı olmak düşeyi hızlandırmaz.",
        pitfall: "Hızı iki kat olanın yarı sürede düşeceğini sanmak.",
      },
      {
        title: "İki ara noktanın vektörü",
        prompt:
          "45 m’den yatay 20 m/s atılan top için g = 10 ve hava yok. t = 1 ve 2 s anlarındaki konum ve hız bileşenleri?",
        strategy: "Tek ortak t’yi x, y ve vy ifadelerine koy.",
        steps: [
          {
            label: "Birinci an",
            expression: "x = 20; y = 45 − 5 = 40 m; v = (20, −10) m/s",
            explanation: "Düşüş ilk saniyede 5 m.",
          },
          {
            label: "İkinci an",
            expression: "x = 40; y = 45 − 20 = 25 m; v = (20, −20) m/s",
            explanation: "İkinci saniyenin düşüşü 15 m.",
          },
          {
            label: "Geometrik kontrol",
            expression: "Δx = 20 m; Δy = −15 m",
            explanation: "Bileşenler aynı zaman aralığını anlatır.",
          },
        ],
        answer: "(20, 40) ve (40, 25) m; hızlar (20, −10), (20, −20) m/s.",
        check: "Her iki an T = 3 s’den öncedir.",
        pitfall: "Toplam düşüş 20 m’yi ikinci saniyenin ayrı yolu sanmak.",
      },
      {
        title: "Enerji ile hız bileşenini denetle",
        prompt:
          "2 kg top 80 m’den yatay 15 m/s ile atılıyor; hava yok, g = 10. Yere çarpmadan önce sürat ve kinetik enerji?",
        strategy: "İlk yatay kinetiği koruyarak potansiyel kaybını ekle.",
        steps: [
          {
            label: "İlk enerji",
            expression: "K0 = 0,5 · 2 · 15² = 225 J",
            explanation:
              "Başta düşey hız sıfır ama toplam kinetik sıfır değildir.",
          },
          {
            label: "İş",
            expression: "Wg = 2 · 10 · 80 = 1600 J; Kson = 1825 J",
            explanation: "Başka kuvvet işi yok.",
          },
          {
            label: "Hız kontrolü",
            expression: "T = 4 s; v² = 15² + 40² = 1825",
            explanation: "v = 5√73 m/s ve K = v² J.",
          },
        ],
        answer: "5√73 m/s; 1825 J.",
        check: "1825 − 225 = 1600 J ağırlık işi.",
        pitfall: "İlk kinetiği sıfır kabul etmek.",
      },
    ],
    recall: [
      {
        prompt: "Yatay atışta uçuş süresi neye bağlıdır?",
        answer:
          "İdeal sabit g, aynı yatay zemin ve vy0 = 0 koşulunda h ile g’ye.",
      },
      {
        prompt: "Teğet hız neden dik bileşenlerle bulunur?",
        answer:
          "vx ve vy aynı vektörün birbirine dik izdüşümleridir; sürat kareler toplamının köküdür.",
      },
      {
        prompt: "Yatay menzil toplam yol mudur?",
        answer:
          "Hayır; menzil yatay yer değiştirme/uzaklıktır, yol eğri boyunca alınır.",
      },
      {
        prompt: "u = 0 olursa ne yapılır?",
        answer:
          "x/u ile bölme yapılmaz; model serbest düşme özel durumuna döner.",
      },
    ],
    questions: [
      {
        prompt:
          "45 m’den tam yatay hızla atılan top için hava yok, g = 10. İlk yer temasına kaç saniye vardır?",
        correct: "3",
        distractors: ["1,5", "4,5", "9", "45"],
        hint: "Düşey ilk hız sıfır; h = gt²/2.",
        explanation: "45 = 5T² → T = 3 s; yatay hız süre için gerekmez.",
      },
      {
        prompt:
          "45 m’den sağa 20 m/s yatay hızla atılan topun yatay menzili kaç metredir? Hava yok, g = 10.",
        correct: "60",
        distractors: ["20", "30", "45", "90"],
        hint: "T = 3 s; x = uT.",
        explanation: "Düşeyden T = √9 = 3; R = 20 · 3 = 60 m.",
      },
      {
        prompt:
          "45 m’den yatay 20 m/s atılan topun çarpma sürati kaç m/s? Hava yok, g = 10.",
        correct: "10√13",
        distractors: ["20", "30", "50", "√130"],
        hint: "Son yatay 20, düşey büyüklük 30 m/s.",
        explanation:
          "v = √(400 + 900) = √1300 = 10√13 m/s; bileşenler doğrudan toplanmaz.",
      },
      {
        prompt:
          "Aynı h > 0 yükseklikten, aynı anda 10 ve 20 m/s yatay hızlarla top atılıyor. Hava yok, aynı g ve aynı düz zemin. Hangi karşılaştırma doğrudur?",
        correct: "Uçuş süreleri eşit, ikinci menzil iki kat",
        distractors: [
          "İkinci uçuş süresi yarı",
          "İkinci uçuş süresi iki kat",
          "Menziller eşit",
          "İlk top hiç düşmez",
        ],
        hint: "Düşey başlangıçlar aynı, yalnız vx farklı.",
        explanation:
          "T = √(2h/g) ortaktır; R = uT nedeniyle ikinci menzil iki kattır.",
      },
      {
        prompt:
          "Yukarı +y, sağ +x seçilsin. Top 45 m’den yatay sağa 20 m/s ile atılıyor. Hava yok, g = 10. t = 2 s hız vektörü (vx, vy) kaç m/s?",
        correct: "(20, −20)",
        distractors: ["(20, 20)", "(0, −20)", "(40, −20)", "(20, 0)"],
        hint: "vx sabit, vy = −gt.",
        explanation: "vx = 20 ve vy = −10 · 2 = −20 m/s; yönlü bileşenlerdir.",
      },
      {
        prompt:
          "45 m’den yatay atılan topun yalnız ikinci saniyede, yani t = 1–2 s arasında düşey alçalması kaç metredir? Hava yok, g = 10.",
        correct: "15",
        distractors: ["5", "10", "20", "25"],
        hint: "İki toplam düşüşü çıkar.",
        explanation:
          "s(2) − s(1) = 20 − 5 = 15 m; toplam 20 m ayrı niceliktir.",
      },
      {
        prompt:
          "İdeal yatay atışta h dört kat yapılırken yatay ilk hız ve g aynı tutuluyor. Menzil hangi çarpanla değişir?",
        correct: "2",
        distractors: ["1", "4", "8", "1/2"],
        hint: "R = u√(2h/g).",
        explanation:
          "Süre ve menzil √4 = 2 kat olur; yükseklikle doğrusal değildir.",
      },
      {
        prompt:
          "Hava direnci olmayan yatay atışta, top ilk yer temasına kadar hangi ivme vektörüne sahiptir? Sağ +x, yukarı +y ve g > 0.",
        correct: "(0, −g)",
        distractors: ["(g, 0)", "(0, 0)", "(g, −g)", "(vx, vy)"],
        hint: "İvmenin bileşenleri kuvvetten gelir.",
        explanation:
          "Tek kuvvet ağırlık aşağıdır; ax = 0, ay = −g. Hız ile ivmenin birimleri de farklıdır.",
      },
      {
        prompt:
          "Top 20 m’den yatay 10 m/s ile atılıyor; hava yok, g = 10. Başlangıçtan 30 m sağdaki duvara ilk uçuş sırasında ulaşabilir mi?",
        correct: "Hayır; önce x = 20 m’de yere değmiştir",
        distractors: [
          "Evet, 1 s’de",
          "Evet, 2 s’de ve y = 20 m’de",
          "Evet, 3 s’de havadadır",
          "Yatay hız hiç olmadığı için ulaşmaz",
        ],
        hint: "Duvar zamanı 3 s ile ilk yer zamanı 2 s’yi karşılaştır.",
        explanation:
          "T = 2 s ve uçuş menzili 20 m; x = 30 m için t = 3 s ilk temas sonrasıdır. Çarpışma sonrası model verilmemiştir.",
      },
      {
        prompt:
          "2 kg top 80 m’den yatay 15 m/s ile atılıyor. Hava yok, g = 10. Yere çarpmadan hemen önce kinetik enerjisi kaç J?",
        correct: "1825",
        distractors: ["225", "800", "1600", "2050"],
        hint: "İlk kinetiğe mgh ekle.",
        explanation:
          "K0 = 225 J, potansiyel kaybı 1600 J; Kson = 1825 J. Başlangıç yatay kinetiği unutulmaz.",
      },
    ],
  },
  {
    id: "egik-atis",
    topic: "detail-367",
    title: "Eğik atış: gerçek teğet, tepe ve menzil koşulları",
    minutes: 110,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 54–56; OGM 11. sınıf Eğik Atış özeti ve Dersler Cepte, s. 15–17. Kaynak şekilleri bağımsız hesaplarla karşılaştırılmış özgün öğretim; sorular özgündür, resmî ÖSYM sorusu değildir.",
    objectives: [
      "İlk hızı yatay ve düşey bileşenlere ayırarak gerçek 2B yörüngeyi kur.",
      "Tepe hızının sıfır olmadığını ve aynı seviye menzil formüllerinin sınırını açıkla.",
      "Yükseklik farkını ve aşağı eğik atışı ilk yer olayıyla çöz.",
    ],
    sections: [
      {
        title: "Tek hızın iki bileşeni, tek fizik olayı",
        paragraphs: [
          "Yatayla θ açısı yapan u büyüklüğündeki ilk hız için vx0 = u cosθ, vy0 = u sinθ olur. Bu ünitede θ yataydan ölçülür; yukarı atış pozitif, pike aşağı atış negatif açıdır. Hava yok ve g sabitse uçuşta ax = 0, ay = −g. Atış bitince cisme hız doğrultusunda sürekli bir fırlatma kuvveti kalmaz.",
          "Dik bileşenler iki ayrı cisim değil, aynı hızın izdüşümleridir. Başlangıç süratini yeniden bulmak √(vx0² + vy0²) ile mümkündür. Açı düşeyden verilmiş bir soruda sin ve cos yerleri değişir; şeklin estetiğine göre değil tanımına göre bileşen seç. Burada x sağa, y yukarı ve ilk konum (0, h) açıkça belirtilir.",
        ],
      },
      {
        title: "İdeal uçuşun genel denklemi",
        paragraphs: [
          "x = vx0 t, y = h + vy0 t − gt²/2 ve v = (vx0, vy0 − gt) aynı ortak t ile yazılır. Bu, yukarı ve aşağı eğik atışları birleştiren genel başlangıç modelidir. Başlangıç yüksekliği h ≥ 0 ise ilk yer olayı bu konumun y = 0 kökünden bulunur; yer sonrası çarpışma veya sıçrama otomatik eklenmez.",
          "Sürat √[vx0² + (vy0 − gt)²] olup iki bileşenin doğrudan toplamı değildir. vx0 sıfır dalında dik atış, vy0 sıfır dalında yatay atış elde edilir. Bu özel sınırlar ayrı fizik yasaları değil aynı denklemin başlangıç koşullarıdır. Program sıfır yatay bileşende x/vx0 gibi tanımsız bölme yapmamalıdır.",
        ],
      },
      {
        title: "Tepe noktasında düşey hız sıfır, toplam hız değil",
        paragraphs: [
          "vy0 > 0 ise ttepe = vy0/g ve ytepe = h + vy0²/(2g) olur. O anda vy = 0 ama vx = vx0 korunur; dolayısıyla yatay bileşen sıfır değilse sürat |vx0| kadardır. İvme hâlâ aşağı −g ve ağırlık hâlâ mg’dir; ne kuvvet ne ivme tepe nedeniyle kaybolur.",
          "Yörünge tepe noktasında yatay teğetlidir. Toplam hız vektörü bu teğette yatay, düşey bileşen oku sıfır uzunlukta olur. Negatif θ ile pike atışta gelecekte bir yükselme tepesi bulunmaz; en büyük yükseklik başlangıç h’dir. Geçmişteki matematiksel tepeyi görünen uçuşa taşımamak için olayın 0–T içinde olup olmadığı denetlenir.",
        ],
      },
      {
        title: "Aynı seviyede süre ve menzil",
        paragraphs: [
          "h = 0, u > 0 ve 0 < θ ≤ 90° için cisim yine başlangıç seviyesine düştüğünde Tu = 2u sinθ/g, R = u² sin(2θ)/g elde edilir. Dikey 90° sınırında yatay menzil sıfırdır. Çıkış ve iniş süreleri eşit, iki eşit yükseklik ziyaretindeki süratler eşittir. Formülün içindeki aynı seviye koşulunu her kullanımda görünür kıl.",
          "Örneğin u = 25 m/s, sinθ = 0,6 ve cosθ = 0,8 için vx0 = 20, vy0 = 15 m/s; süre 3 s, menzil 60 m olur. Aynı süratte açıyı büyütünce düşey bileşen artarken yatay bileşen azalır; bu iki etkiyi tek yönlü “daha dik, daha uzak” ezberine indirgeme. Ortak zaman ve gerçek bileşenler karşılaştırmayı açıklar.",
        ],
      },
      {
        title: "45° ve tamamlayıcı açılar nerede geçerli?",
        paragraphs: [
          "Aynı u, aynı g, hava yok ve aynı seviye koşulunda sin(2θ) en çok 1’dir; bu yüzden en büyük menzil 45°’dedir. θ ile 90° − θ açılarının menzilleri eşit, uçuş süreleri ve tepe yükseklikleri genellikle farklıdır. Menzil eşitliği bütün yörüngelerin aynı olması demek değildir.",
          "Başlangıç bir balkonda ve hedef zemindeyse toplam süre artık yalnız 2vy0/g olmaz; ek yükseklik vardır. Bu durumda 45° zorunlu en iyi açı değildir ve tamamlayıcı açıların menzilleri eşit olmak zorunda değildir. Rüzgâr/direnç, eğimli hedef veya değişken g de bu özel sin(2θ) kuralını değiştirir. Keşif bu koşulu ayrı HTML uyarısında belirtir.",
        ],
      },
      {
        title: "Farklı yükseklikte önce yer kökü",
        paragraphs: [
          "Genel ilk yer süresi T = [vy0 + √(vy0² + 2gh)]/g olur. Ardından yönlü menzil x(T) = vx0T hesaplanır. h > 0 ise bu kök yukarı ve pike atışı birlikte kapsar. Aşağı bileşende yakın sayı farkını azaltan eşdeğer kök ifadesi sayısal uygulamada kullanılabilir; modelin y(T) ≈ 0 kontrolü korunur.",
          "h = 0 ve ilk düşey bileşen aşağı veya sıfırsa ilk temas t = 0’dır; yere doğru fırlatılmış top için gizli bir havada kalma süresi üretilmez. θ = 90° ise yatay menzil sıfırdır ama düşey hareket hâlâ anlamlıdır. Sıfır süre ve sıfır yatay açıklık durumlarında kamera sonsuza büyüyüp okları savurmamalıdır.",
        ],
      },
      {
        title: "Pike atışın düşey başlangıcı zaten aşağı",
        paragraphs: [
          "Aşağı eğik atışta θ < 0, vy0 < 0 olur. Yatay hız sabit kalırken düşey aşağı sürat başlangıçtan itibaren artar. Aynı h ve aynı |vy0| ile yukarı atışa göre yere daha erken varır; fakat toplam sürat karşılaştırılırken vx de korunur. Son hızın yönü bileşenlerin işaretlerinden bulunur.",
          "Örneğin h = 40 m, u = 25 m/s, cosθ = 0,8 ve sinθ = −0,6 için vx0 = 20, vy0 = −15’tir. 40 − 15T − 5T² = 0 çözülür; üstteki 2vy0/g aynı seviye formülü negatif süre verdi diye uçuşun imkânsız olduğu söylenmez. Başlangıç yüksekliği genel köke zaten eklenmiştir.",
        ],
      },
      {
        title: "Gerçek eğri, teğet ve duvar sorusu",
        paragraphs: [
          "vx0 ≠ 0 iken y(x) = h + (vy0/vx0)x − gx²/(2vx0²) gerçek paraboldür. Eğimi dy/dx = vy/vx olduğundan seçili hız oku teğet olmalıdır. Eşit fiziksel x/y ölçeği bu açı ilişkisini görselde korur; farklı ölçeklerin biçimi güzelleştirmesine izin verip açıyı gerçekmiş gibi ölçmek yanıltır.",
          "Bir duvar x = d ise t = d/vx0 bulunur; sonra y(t) ve 0 ≤ t ≤ T denetlenir. Başlangıç hız doğrusunun duvardaki uzantısı ile gerçek çarpma noktası farklıdır: düşey sapma gt²/2’dir. Kaynaktaki yanlış bir cevap anahtarı bu geometriyi değiştirmez; uygulamadaki her özgün duvar sorusunda noktalar ve düşey fark açıkça tanımlanır.",
        ],
      },
      {
        title: "Enerji ve hız yönünü birlikte kontrol",
        paragraphs: [
          "İdeal uçuşta v² = u² + 2g(h − y) enerji bağıntısı geçerlidir. Aynı yüksekliğe dönünce sürat yine u; daha aşağı zemine varınca sürat daha büyük olur. Bu sonuç hava yok, yalnız ağırlık ve sabit g koşulundadır; kütle sadeleşir. Enerji büyüklüğü ise m ile değişir ve tek başına hızın yönünü vermez.",
          "Tepe anında kinetik enerji genellikle sıfır değil, mvx0²/2’dir. Toplam hızın yatay bileşeni ve yönü için hareket denklemine dön; enerjiden alınan pozitif karekökü otomatik yukarı ok diye çizme. Aynı yükseklikte biri çıkışta diğeri inişte olan iki durumda hızların düşey işaretleri farklı olsa da süratler eşit olabilir.",
        ],
      },
      {
        title: "Tahminin koşulunu değiştirerek aktar",
        paragraphs: [
          "Keşifte önce yerden 45° atışın tepesine git; düşey hız sıfırlanırken yatay okun kaldığını ve ivmenin aşağı sürdüğünü gör. Sonra yalnız başlangıç yüksekliğini artır; iniş ve çıkış simetrisinin bozulmasını hesapla. Daha sonra açıyı negatif yaparak aynı genel formülün pike dalını denetle.",
          "Her karşılaştırmada değişmeyenleri söyle: u mu, vx mi, vy mi aynı? Bunlar farklı deneylerdir. Zaman elle adımlanır, bütün sonuçlar çizim dışında HTML’de bulunur ve gerekçe en fazla 120 karakterle ayrı kaydedilir. Tahmini modelle karşılaştırmak otomatik ustalık veya XP değildir; bağımsız yeni problemde doğru koşulu seçmek asıl hedeftir.",
        ],
      },
    ],
    examples: [
      {
        title: "Tepe hızının kalan bileşeni",
        prompt:
          "Yerden 20√2 m/s ile 45° atış yapılıyor. Hava yok, g = 10 ve sin45° = cos45° = √2/2. Tepe zamanı/yüksekliği, tepe sürati ve menzil?",
        strategy: "İlk bileşenleri hesapla, tepe ile toplam süreyi ayır.",
        steps: [
          {
            label: "Bileşenler",
            expression: "vx0 = 20; vy0 = 20 m/s",
            explanation: "İki bileşenin kareler toplamı ilk sürati verir.",
          },
          {
            label: "Tepe",
            expression: "ttepe = 2 s; H = 20 m; vtepe = 20 m/s",
            explanation: "Tepe yalnız düşey bileşeni sıfırlar.",
          },
          {
            label: "Varış",
            expression: "T = 4 s; R = 20 · 4 = 80 m",
            explanation: "Başlangıç ve varış seviyeleri aynıdır.",
          },
        ],
        answer: "2 s/20 m; tepe sürati 20 m/s; menzil 80 m.",
        check: "R = u²/g = 800/10 = 80 m.",
        pitfall: "Tepe süratini sıfır almak.",
      },
      {
        title: "Açı bilgisinden tam yörünge",
        prompt:
          "Yerden u = 25 m/s, sinθ = 0,6 ve cosθ = 0,8 ile atış; hava yok, g = 10. Süre, menzil ve maksimum yükseklik?",
        strategy: "Açı tablosunu bileşenlere çevir.",
        steps: [
          {
            label: "Başlangıç",
            expression: "vx0 = 20; vy0 = 15 m/s",
            explanation: "u² = 400 + 225 = 625.",
          },
          {
            label: "Düşey",
            expression: "T = 2 · 15/10 = 3 s; H = 15²/20 = 11,25 m",
            explanation: "Aynı seviyede varış koşulu kullanılır.",
          },
          {
            label: "Yatay",
            expression: "R = 20 · 3 = 60 m",
            explanation: "Yatay hız değişmez.",
          },
        ],
        answer: "3 s; 60 m; 11,25 m.",
        check: "sin2θ = 2 · 0,6 · 0,8 = 0,96; 625 · 0,96/10 = 60.",
        pitfall: "25 m/s’nin tamamını yatay hız almak.",
      },
      {
        title: "Balkon simetriyi bozar",
        prompt:
          "20 m yükseklikten u = 25 m/s; sinθ = 0,8, cosθ = 0,6 ile yukarı atılıyor. Hava yok, g = 10. Uçuş ve menzil?",
        strategy: "Yükseklik farkını konum denkleminde koru.",
        steps: [
          {
            label: "Bileşenler",
            expression: "vx0 = 15; vy0 = 20 m/s",
            explanation: "Tepe zamanı 2 s, tepe zeminden 40 m.",
          },
          {
            label: "Yer kökü",
            expression: "0 = 20 + 20T − 5T² → T = 2 + √8 s",
            explanation: "Diğer kök negatiftir.",
          },
          {
            label: "Menzil",
            expression: "R = 15(2 + √8) ≈ 72,43 m",
            explanation: "4 s aynı seviyeye dönüş zamanıdır, yere varış değil.",
          },
        ],
        answer: "T = 2 + √8 s; R = 15(2 + √8) m.",
        check: "İniş √8 s, çıkış 2 s; eşit değildir.",
        pitfall: "Genel h > 0 durumda R = u² sin2θ/g kullanmak.",
      },
      {
        title: "Pike hareketi ve enerji denetimi",
        prompt:
          "40 m’den u = 25 m/s ile aşağı eğik atılıyor. cosθ = 0,8, sinθ = −0,6; hava yok, g = 10. İlk yer zamanı ve çarpma sürati?",
        strategy:
          "Aşağı bileşeni negatif yaz, sonra enerjiyle büyüklüğü denetle.",
        steps: [
          {
            label: "Başlangıç",
            expression: "vx0 = 20; vy0 = −15 m/s",
            explanation: "Açı yataydan aşağı ölçülür.",
          },
          {
            label: "İlk yer",
            expression: "40 − 15T − 5T² = 0 → T = (√1025 − 15)/10 ≈ 1,702 s",
            explanation: "Gelecekteki pozitif kök seçilir.",
          },
          {
            label: "Son sürat",
            expression: "vson² = 25² + 2 · 10 · 40 = 1425",
            explanation: "vson = 5√57 ≈ 37,75 m/s.",
          },
        ],
        answer: "Yaklaşık 1,702 s; 5√57 m/s.",
        check: "vyson = −√1025; 20² + 1025 = 1425.",
        pitfall: "İlk düşey hızı yukarı işaretiyle koymak.",
      },
    ],
    recall: [
      {
        prompt: "Eğik atışın tepesinde sürat neden genellikle sıfır değil?",
        answer: "Yalnız vy sıfır, vx sabittir; sürat |vx| kalır.",
      },
      {
        prompt: "45° en büyük menzil hangi koşullarda?",
        answer: "Aynı u/g, hava yok ve başlangıç–varış aynı seviyedeyken.",
      },
      {
        prompt: "Balkondan atışın uçuşu nasıl bulunur?",
        answer: "h + vy0T − gT²/2 = 0 ilk yer kökü; ardından x = vx0T.",
      },
      {
        prompt: "Duvarın hedef doğrusu ile gerçek çarpma farkı nedir?",
        answer:
          "Başlangıç hız doğrusundan düşey sapma gt²/2; noktalar aynı x’te tanımlanmalıdır.",
      },
    ],
    questions: [
      {
        prompt:
          "Yerden 20√2 m/s ve 45° ile atılan top için sin45° = cos45° = √2/2, hava yok ve g = 10. Tepe sürati kaç m/s?",
        correct: "20",
        distractors: ["0", "10", "20√2", "40"],
        hint: "Tepe anında vy = 0, vx korunur.",
        explanation:
          "vx = 20√2 · √2/2 = 20 m/s; tepe sürati 20, ivme aşağı g’dir.",
      },
      {
        prompt:
          "Yerden u = 25 m/s ile atışta sinθ = 0,6, cosθ = 0,8. Hava yok, g = 10 ve varış aynı zeminde. Menzil kaç m?",
        correct: "60",
        distractors: ["30", "45", "75", "120"],
        hint: "vx = 20, vy0 = 15; T = 3 s.",
        explanation: "R = vxT = 20 · 3 = 60 m; aynı seviye koşulu vardır.",
      },
      {
        prompt:
          "Yerden u = 25 m/s, sinθ = 0,6 ve cosθ = 0,8 ile atılan topun en büyük yüksekliği kaç m? Hava yok, g = 10.",
        correct: "11,25",
        distractors: ["7,5", "15", "20", "31,25"],
        hint: "Yüksekliği yalnız düşey ilk bileşen belirler.",
        explanation: "vy0 = 15; H = 225/(2 · 10) = 11,25 m.",
      },
      {
        prompt:
          "Aynı başlangıç sürati ve g, hava yok, aynı yatay başlangıç–varış seviyesi. 30° ve 60° atışlar için hangisi doğrudur?",
        correct: "Menziller eşit, uçuş süreleri farklı",
        distractors: [
          "Menzil ve süre birlikte eşit",
          "60° menzili kesin iki kat",
          "30° top hiç yükselmez",
          "Tepe hızları ikisinde de sıfır",
        ],
        hint: "Tamamlayıcı açı eşit menzil kuralının koşulları verildi.",
        explanation:
          "sin60° = sin120° olduğundan menziller eşit; sin30° ≠ sin60° olduğundan süreler farklıdır.",
      },
      {
        prompt:
          "Hava yok ve g sabitken hangi durumda R = u² sin2θ/g formülünün genel kullanımı doğru değildir?",
        correct: "Başlangıç hedef zeminden 20 m yukarıdaysa",
        distractors: [
          "Aynı seviyede 30° atışta",
          "Aynı seviyede 45° atışta",
          "Aynı seviyede 60° atışta",
          "Aynı seviyede ilk sürat değiştirildiğinde",
        ],
        hint: "Formül başlangıç ile varış seviyesinin eşitliğini varsayar.",
        explanation:
          "20 m yükseklik farkında önce genel y = h + vy0t − gt²/2 yer kökü çözülmelidir.",
      },
      {
        prompt:
          "20 m yükseklikten ilk hız bileşenleri (15, 20) m/s olan top atılıyor. Sağ +x, yukarı +y; hava yok, g = 10. İlk yer zamanı nedir?",
        correct: "2 + √8 s",
        distractors: ["2 s", "4 s", "√8 s", "2 − √8 s"],
        hint: "0 = 20 + 20T − 5T².",
        explanation:
          "T² − 4T − 4 = 0 → T = 2 ± √8; yalnız artılı kök gelecektedir.",
      },
      {
        prompt:
          "40 m’den aşağı eğik atışta başlangıç hız bileşenleri (20, −15) m/s. Hava yok, g = 10. Çarpma sürati kaç m/s?",
        correct: "5√57",
        distractors: ["25", "20", "√1025", "45"],
        hint: "İlk sürat 25; vson² = u² + 2gh.",
        explanation: "vson² = 625 + 800 = 1425 = 25 · 57; vson = 5√57 m/s.",
      },
      {
        prompt:
          "Top (x, y) = (0, 0) noktasından (20, 20) m/s ilk hızla atılıyor. Hava yok, g = 10. x = 60 m duvarında ilk hız doğrusunun yüksekliği ile gerçek top yüksekliği arasındaki düşey fark kaç m?",
        correct: "45",
        distractors: ["15", "20", "30", "60"],
        hint: "Duvar zamanı 3 s; sapma gt²/2.",
        explanation:
          "Doğru yüksekliği 20 · 3 = 60 m, gerçek y = 60 − 5 · 9 = 15 m; düşey fark 45 m. İlk yer T = 4 s olduğu için çarpma havadadır.",
      },
      {
        prompt:
          "Hava yok, sabit g ve yukarı +y. Eğik atışın uçuş boyunca değişmeden kalan büyüklüğü hangisidir?",
        correct: "Yatay hız bileşeni",
        distractors: [
          "Düşey hız bileşeni",
          "Toplam sürat",
          "Yükseklik",
          "Hız vektörünün yönü",
        ],
        hint: "Yatay net kuvvet sıfırdır.",
        explanation:
          "ax = 0 olduğundan vx sabittir; vy ve dolayısıyla hız yönü/sürat değişebilir.",
      },
      {
        prompt:
          "Top yerden yukarı 20 m/s düşey hız bileşeni ve 15 m/s yatay bileşenle atılıyor; hava yok, g = 10. Tepeye kadar kinetik enerji azalırken hangi doğru kalır?",
        correct: "Toplam mekanik enerji sabittir",
        distractors: [
          "Kinetik enerji tepede kesin sıfırdır",
          "Ağırlık tepeye yakın sıfır olur",
          "Yatay hız yavaşlar",
          "Net kuvvet hızla aynı yöndedir",
        ],
        hint: "Yalnız ağırlık iş yapar, yatay bileşen korunur.",
        explanation:
          "Kinetik azalışı yer çekimi potansiyel artışıdır; tepedeki yatay kinetik sıfır değildir. Hava yokken mekanik enerji korunur.",
      },
    ],
  },
  {
    id: "ayt-enerji-hareket",
    topic: "detail-368",
    title: "Enerji ve hareket: işaretli işten yaylı sistemlere",
    minutes: 125,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 57–69; OGM 11. sınıf İş ve Enerji/Mekanik Enerjinin Korunumu özetleri; Dersler Cepte Enerji ve Hareket, s. 10–16; Aurelia TYT Fizik 005, s. 1–19 ile karşılaştırılmış özgün öğretim. Soru ve örnekler özgündür; resmî ÖSYM sorusu değildir.",
    objectives: [
      "Tek kuvvet işi ile net işi, kinetik değişimi ve sistemin enerji bilançosunu ayır.",
      "Gerçek kuvvet–konum alanı, yay enerjisi, sürtünme aktarımı ve erişilebilir konumları hesapla.",
      "Bağlı sistem, yay eşdeğeri, güç/verim ve temas koşullarında enerjinin yeterli olduğu ve olmadığı adımları seç.",
    ],
    sections: [
      {
        title: "TYT formülünden AYT sistem bilançosuna",
        paragraphs: [
          "İş ve enerji skaler niceliklerdir; bu, işin negatif olamayacağı anlamına gelmez. Hedef bir cisimse bütün gerçek kuvvetlerin işini toplayıp Wnet = ΔK yazarsın. Cisim–Dünya–yay sistemini seçip potansiyelleri enerjiye eklediğinde yer çekimi ve yayın işini ikinci kez dış iş olarak saymazsın. Önce sistem sınırı ve başlangıç/son hâli seçilir.",
          "Bir motor, hareketli destek, sürtünme veya başka aktarım varsa mekanik enerjiyi koşulsuz sabit kabul etme. Uygun sistem için Kson + Uson = Kilk + Uilk + Wdiğer yazılabilir. Mekanik enerjinin azalması toplam enerjinin yok olması değildir; iç enerji, akış veya başka enerji türlerine aktarım vardır. Her denklemin aynı sistem ve süreç için kurulduğunu denetle.",
        ],
      },
      {
        title: "Sabit kuvvetin işi açıyla seçilir",
        paragraphs: [
          "Sabit kuvvet ve doğrusal yer değiştirmede W = Fd cosθ, θ kuvvet ile yer değiştirme arasındaki açıdır. Aynı yönde pozitif, ters yönde negatif, dikte sıfır iş olur. Dikey destek kuvvetiyle sabit yükseklikte yatay taşımada ilgili mekanik iş sıfır olabilir; kişinin metabolik enerji harcaması bundan sıfır sayılmaz.",
          "Değişen kuvvete son F değerini bütün yol boyunca uygulamak yanlış olur. Gidip dönmede sabit tek kuvvetin toplam işi yer değiştirmeye bağlı olarak sıfır olabilir ama sürtünme gibi yolu ve yönü izleyen kuvvetin işi otomatik sıfır değildir. Duran cisme kuvvet uygulanması da yer değiştirme yoksa o anda ilgili mekanik iş üretmez.",
        ],
      },
      {
        title: "Kuvvet–konum grafiğinde işaretli alan",
        paragraphs: [
          "Bir boyutta iş, F–x grafiğinin işaretli alanıdır. Düzgün kuvvette dikdörtgen, doğrusal artıp azalmada üçgen/yamuk kullanılır; eksen altı alan negatiftir. Bu grafik F–t ile aynı değildir: F–x alanı N·m = J iş, F–t alanı N·s itmedir. Ekseni okumadan yalnız şeklin alanını toplamak birim hatasıdır.",
          "Net kuvvet grafiğinin alanı ΔK verir; tek bir kuvvet grafiğinin alanını doğrudan ΔK saymak için diğer bütün işlerin sıfır olması gerekir. K0 + Wnet(x) herhangi bir ara konumda negatif çıkıyorsa cisim o noktaya bu ilk hareket dalında ulaşamamıştır. Son alan toplamı pozitif olsa bile arada önce durma olup olmadığını ayrıca denetle.",
        ],
      },
      {
        title: "Enerji grafiğinin eğimi ne verir?",
        paragraphs: [
          "Tek boyutlu bir geçerli hareket dalında dK/dx = Fnet olur; kinetik enerji konumla artıyorsa net kuvvet +x, azalıyorsa −x yönündedir. Eğim birimi J/m = N’dur. Sabit bir pozitif K platosu net kuvvetin sıfır ve süratin sabit olduğunu gösterebilir; konumun veya hızın sıfır olduğu anlamına gelmez.",
          "Korunumlu potansiyel için kuvvet F = −dU/dx’tir; eksi işaretini unutma. Yer çekimi Ug = mgy için yukarı gradyan +mg, gerçek çekim kuvveti −mg’dir. Potansiyel grafiğinin eğimini +mg dış kaldırma kuvvetiyle karıştırma. Enerjinin sıfır düzeyi değiştirilebilir; gradyan ve iki seviye arasındaki değişim bundan etkilenmez.",
        ],
      },
      {
        title: "Kinetik ve potansiyelde kare, referans ve yön",
        paragraphs: [
          "Sabit pozitif kütlede K = mv²/2 ≥ 0; v iki kat olursa K dört kat olur. Δ(v²) ile (Δv)² aynı değildir: 3’ten 5 m/s’ye çıkışta kare farkı 25 − 9’dur. Enerjiden sürat bulunduğunda pozitif kök alınır; hızın sağ/sol veya yukarı/aşağı yönü geometri ve hareketten ayrıca belirlenir.",
          "Sabit g’de Ug = mgy seçilen referansa bağlı olarak negatif olabilir. ΔUg = mg(yson − yilk) ise referansı kaydırınca değişmez. Yükseklik ekseninde Ug artar; düşülen mesafe ekseninde azalır. Aynı çizgiyi bu iki farklı x ekseniyle etiketleyip ters sonuç üretmemek için grafikte bağımsız değişkeni açık yazmak gerekir.",
        ],
      },
      {
        title: "Duran yüzey sürtünmesi ve iç enerji",
        paragraphs: [
          "Duran yatay yüzeyde tek yönde kayan blok için fk = μkmg sabit seçilmişse sürtünmenin işi Wf = −fkL’dir. Aynı basit bilançoda mekanikten iç enerjiye aktarım Q = +fkL olur; büyüklükleri eşit, işaretleri aynı değildir. Normal ve ağırlık yatay yer değiştirmeye dik olduklarından bu özel düzende iş yapmaz.",
          "Bu kural bütün sürtünmelerin her zaman negatif iş yaptığı iddiası değildir. Hareketli bant enerji aktarabilir; statik temasın işi çerçeveye ve temas hareketine bağlıdır. İlk duruşta eski kinetik sürtünme yönünü koruyup cismi kendiliğinden geri götürmek yanlış olur. Keşif yalnız ileri kaymanın ilk durma noktasına kadar olan bölümünü gösterir.",
        ],
      },
      {
        title: "Doğal boydan yay enerjisi",
        paragraphs: [
          "İdeal doğrusal yayda yer değiştirme x doğal boydan ölçülür; yayın kuvveti Fyay = −kx ve enerjisi Us = kx²/2 olur. Yavaşça germe sırasında dengeleyen dış kuvvet +kx’tir. Kuvvet 0’dan kx’e arttığı için iş üçgen alanı, yani yarım kx² olur; son kuvvet × bütün uzama hesabı iki kat hata verir.",
          "Sıkıştırma ve uzatmada aynı |x| aynı enerji depolar; kuvvet yönleri ise doğal boya doğrudur. k N/m, x metre ve enerji joule olmalıdır. Yayın doğrusal esneklik sınırı, kütlesiz kabulü ve kayıpsızlığı model koşullarıdır; kopma, kalıcı şekil değişimi veya sönüm bu bağıntıyla tamamlanmış sayılmaz.",
        ],
      },
      {
        title: "Yayların bağlanışında tek tek enerjiyi izle",
        paragraphs: [
          "İdeal yaylar paralelse uzamalar aynı, taşıdıkları kuvvetler toplanır; keş = k1 + k2. Seride gerilmeler aynı, toplam uzama x1 + x2 ve 1/keş = 1/k1 + 1/k2 olur. Bu sonuçlar bağlantı geometrisine bağlıdır; yalnız yan yana çizilmiş olmalarından seri/paralel adı verilmez.",
          "İki özdeş k yay seride eşdeğer k/2, paralelde 2k olur. Her yay enerjisi kendi uzamasıyla kxi²/2 hesaplanır; toplam eşdeğer enerjiyle tutarlı olmalıdır. Düşey iki yay ve ara kütleler varsa üst yay alttaki bütün ağırlığı, alt yay yalnız alt kütleyi taşıyabilir; her gerilmeyi aynı varsaymak dengeyi bozar.",
        ],
      },
      {
        title: "Düşey yayda denge ile ilk dönüş aynı değil",
        paragraphs: [
          "Bir k yayına m kütlesi asılıp yeni statik dengede duruyorsa uzama xdenge = mg/k olur. Fakat kütle başlangıçta doğal boyda durgun bırakılır ve sönüm yoksa ilk en büyük uzama enerjiyle mgx = kx²/2, yani x = 2mg/k çıkar. Statik denge konumu bir salınımın ortası olabilir; ilk duruş noktası değildir.",
          "Dengede kalan son durum için enerjinin bir bölümü sönümle başka türlere aktarılmış olmalıdır; sönümsüz sistem kendiliğinden yerleşmez. İki soruda “asılıp dengelendi” ile “doğal boydan serbest bırakıldı” farklı süreçlerdir. Yay enerjisini yüklü denge noktasından ölçülen uzamayla doğal boy formülüne gelişigüzel koyma.",
        ],
      },
      {
        title: "Bağlı cisimlerde ortak enerji, ayrı yükseklikler",
        paragraphs: [
          "Sabit ideal makaradaki iki kütle aynı gergin ip nedeniyle eşit sürat büyüklüğü taşır. m2 > m1 iken m2 h alçalıp m1 h yükseliyorsa potansiyel net azalış (m2 − m1)gh, toplam kinetik artış (m1 + m2)v²/2 olur. İç ideal gerilmelerin toplam işi sistemde elenir; tek alt cisimde gerilme işi yine vardır.",
          "İp esnek, makara dönme enerjisi önemli veya sürtünmeli ise bu yalın bilanço genişletilir. Enerjiyle ortak sürat bulmak gerilmeyi her zaman tek başına vermez; Newton’un alt cisim denklemi gerekir. Önceki Newton ünitesindeki ip kısıtı burada korunur. Farklı geometrili hareketli makara için her cismin yol/sürat oranını yeniden kurmadan aynı v kullanma.",
        ],
      },
      {
        title: "Eğik düzlemde çekme işi ve aynı yükseklik",
        paragraphs: [
          "Sabit eğimli bir rayda cismi s yolu boyunca yukarı çeken kuvvet yüzeye paralel ve sabitse Wçekme = Fs olur. Başlangıç ve son sürat farklıysa, sabit duran yüzeyde kinetik sürtünme de varsa bilanço Fs = mgh + ΔK + fks biçimindedir. Ağırlığın işi −mgh, sürtünmenin işi −fks; normalin işi bu sabit rayda sıfırdır. Tek çekme işini net iş diye alıp potansiyel artışını yok sayma.",
          "Örneğin 1 kg blok, uzunluğu 5 m ve yüksekliği 3 m olan sabit rampada durgunluktan 4 m/s’ye çıkarılsın. g = 10, cosθ = 0,8 ve μk = 0,1 ise N = 8 N, fk = 0,8 N olur. Potansiyel artışı 30 J, kinetik artışı 8 J ve iç enerji aktarımı 4 J; çekme işi 42 J, sabit paralel kuvvet 8,4 N’dir. Aynı yüksekliğe farklı uzunlukta sürtünmeli yoldan çıkmak farklı kayıp verebilir; yalnız mgh aynı kalır.",
        ],
      },
      {
        title: "Çembersel temas ve enerji yönteminin sınırı",
        paragraphs: [
          "Sürtünmesiz pasif sabit bir rayda ağırlık ile iş yapmayan normal varsa mekanik enerji korunabilir. Aynı iki seviye arasında son sürat enerjiyle bulunabilir. Fakat çembersel tepeye enerji bakımından erişebilmek, yüzeyle temasın mutlaka korunduğunu garanti etmez; gerekli merkezcil ivme ve normalin izin verilen işareti ayrıca denetlenir.",
          "İlk sürat, atış açısı veya yörüngeye bağlı bir yön sorusunda yalnız skaler enerji yetersiz olabilir. Hareketli destek veya motor varsa normalin işi de genel olarak sıfır değildir. Modelin yatay blok–yay düzeni bu temassızlık/merkezcil koşulların yerine geçmez; burada tek yüzey sabit, yatay ve temas korunmuş seçilmiştir.",
        ],
      },
      {
        title: "Güç, verim ve enerji birimleri",
        paragraphs: [
          "Ortalama güç P = aktarılan enerji/Δt, anlık güç bir kuvvet için P = F·v’dir. Aynı işi daha kısa sürede yapmak daha büyük güç demektir; yapılan işi büyütmez. Sabit hızlı dik kaldırmada F = mg olduğundan yararlı güç mgv olur; ivmeli kaldırmada F’nin mg’den farklı olabileceğini unutma.",
          "Verim η = yararlı enerji/giriş enerjisi aynı süreç ve uyumlu birimlerde boyutsuz orandır. Yüzde 80 verimde 200 J yararlı iş için giriş 200/0,8 = 250 J gerekir. 1 kWh = 3,6 milyon J enerji birimidir, güç değil. Giriş enerjileri verilmeden yalnız süreyi karşılaştırıp verim sıralamak gerekçesizdir.",
        ],
      },
      {
        title: "Sürtünmeli blok yayı ilk kez sıkıştırırken",
        paragraphs: [
          "Keşifte m kütleli blok +x yönünde v0 ile başlar; sabit duran yatay yüzeyde f = μkmg sürtünme vardır. Yayın doğal boydaki temas noktası L, sıkışma z = max(0, x − L)’dir. İlk ileri dal için K(x) = K0 − fx − kz²/2 ve Q(x) = fx olur. Erişilebilir x’te K ≥ 0 şartı korunur.",
          "K0 ≤ fL ise blok yaya varmadan veya tam temas noktasında durabilir; yay enerjisi sıfırdır. Yaya ulaşırsa ilk duruş sıkışması pozitif kök fz + kz²/2 = K0 − fL’den bulunur. Program bu kökü geçip negatif kinetik çizmez, ilk duruştan sonraki geri hareketi statik sürtünme koşulunu çözmeden otomatik üretmez.",
        ],
      },
      {
        title: "Alan ve enerji çubuklarını birlikte denetle",
        paragraphs: [
          "Kuvvet–konum grafiğinde sürtünme −f yatay parçası ve temas sonrası yay −k(x − L) doğrusu birlikte net kuvveti verir. 0–x alanı negatif iş, K(x) − K0’a eşittir. Enerji çubukları ise kinetik, yay ve iç enerji aktarımını ayrı gösterir; K + Us + Q = K0 sabitken K + Us tek başına sürtünmede azalabilir.",
          "Önce tahmin et: μ artarsa ilk durma noktası nasıl değişir, yay sertleşince sıkışma ne olur, v0 iki kat olunca K0 kaç kat olur? Sonra yalnız bir parametreyi değiştirip denklemi ve gerçek grafiği karşılaştır. Keşif ayrı kaydedilir, otomatik XP veya ustalık doğurmaz; yeni problemde sistem sınırını ve ilk duruşu kendin seçmen gerekir.",
        ],
      },
    ],
    examples: [
      {
        title: "Üç işaretli alan, tek net iş",
        prompt:
          "Net kuvvet 0–2 m’de +8 N, 2–4 m’de +8’den 0’a doğrusal, 4–5 m’de −4 N. Cisim +x yönünde gidiyor ve ilk kinetiği 12 J. x = 5 m kinetiği?",
        strategy: "Alanları işaretleriyle topla; ara duruş olmadığını denetle.",
        steps: [
          {
            label: "Pozitif bölgeler",
            expression: "W1 = 8 · 2 = 16 J; W2 = 8 · 2/2 = 8 J",
            explanation: "Dikdörtgen ve üçgen alanı.",
          },
          {
            label: "Negatif bölge",
            expression: "W3 = −4 · 1 = −4 J; Wnet = 20 J",
            explanation: "Eksen altı iş negatiftir.",
          },
          {
            label: "Kinetik",
            expression: "Kson = 12 + 20 = 32 J",
            explanation:
              "Ara enerji önce artıp yalnız son 4 J azalır; duruş yok.",
          },
        ],
        answer: "32 J.",
        check: "Kson − K0 = 20 J; mutlak alan 28 J net iş değildir.",
        pitfall: "Grafik F–t olmadığı hâlde alanı itme sanmak.",
      },
      {
        title: "Yaya ulaşmadan önce ve sonra kayıp",
        prompt:
          "2 kg blok yatayda 10 m/s ile başlıyor. Duran yüzeyde f = 4 N sabit sürtünme var; 4 m sonra k = 100 N/m doğal yayına temas ediyor. İlk duruş sıkışması?",
        strategy: "Önce temas kinetiği, sonra sıkışma boyunca iki aktarım.",
        steps: [
          {
            label: "Temasa kadar",
            expression: "K0 = 100 J; Ktemas = 100 − 4 · 4 = 84 J",
            explanation: "Blok yaya pozitif enerjiyle ulaşır.",
          },
          {
            label: "Sıkışma denklemi",
            expression: "50z² + 4z = 84 → z = (√16816 − 4)/100 ≈ 1,257 m",
            explanation: "Sürtünme sıkışma boyunca da sürer.",
          },
          {
            label: "Bilanço",
            expression: "Us ≈ 78,97 J; Q = 4(4 + z) ≈ 21,03 J",
            explanation: "İlk duruşta K = 0 ve Us + Q = 100 J.",
          },
        ],
        answer: "Yaklaşık 1,257 m sıkışma.",
        check:
          "Sürtünmesiz temastan sonra √(168/100) ≈ 1,296 m daha büyük olurdu.",
        pitfall: "Sıkışma bölümündeki sürtünmeyi unutmak.",
      },
      {
        title: "İdeal iki kütlenin enerji sistemi",
        prompt:
          "Sabit kütlesiz sürtünmesiz makarada 2 ve 4 kg, aynı gergin kütlesiz iple bağlı ve ilk durgun. Ağır kütle 3 m alçalırken hafif aynı miktarda yükseliyor; g = 10. Ortak sürat?",
        strategy:
          "Sistem iki kütle ve Dünya; iki potansiyel değişimini ayrı yaz.",
        steps: [
          {
            label: "Potansiyel",
            expression: "ΔU = 2 · 10 · 3 − 4 · 10 · 3 = −60 J",
            explanation: "Bir kütle yükselirken öteki iner.",
          },
          {
            label: "Toplam kinetik",
            expression: "Kson = 0,5(2 + 4)v² = 3v²",
            explanation: "İdeal ip sürat büyüklüklerini eşit tutar.",
          },
          {
            label: "Çözüm",
            expression: "3v² = 60 → v = √20 = 2√5 m/s",
            explanation:
              "Pozitif kök sürattir; yönler ip geometrisinden gelir.",
          },
        ],
        answer: "2√5 m/s.",
        check: "Newton a = (4 − 2)10/6 = 10/3; v² = 2a · 3 = 20.",
        pitfall: "Yalnız ağır kütlenin potansiyel kaybını kinetiğe çevirmek.",
      },
      {
        title: "Yararlı güç, giriş ve net iş",
        prompt:
          "10 kg yük 2 m yukarı sabit hızla 5 s’de çıkarılıyor. g = 10 ve motor verimi yüzde 80. Yüke aktarılan iş/güç, giriş gücü ve yükün net işi?",
        strategy: "Sabit hızı ve aynı süreç verimini ayrı kullan.",
        steps: [
          {
            label: "Yararlı aktarım",
            expression: "Wip = mgh = 200 J; Py = 200/5 = 40 W",
            explanation: "İp kuvveti 100 N yukarıdır.",
          },
          {
            label: "Giriş",
            expression: "Eg = 200/0,8 = 250 J; Pg = 50 W",
            explanation: "Kayıp/diğer aktarım 50 J’dir.",
          },
          {
            label: "Yükün net işi",
            expression: "Wg = −200 J; Wnet = 200 − 200 = 0",
            explanation:
              "Sabit süratte ΔK sıfır; potansiyel artışı yine 200 J.",
          },
        ],
        answer: "200 J; 40 W yararlı; 50 W giriş; net iş 0 J.",
        check: "Giriş 250 = yararlı 200 + diğer 50 J.",
        pitfall: "Net iş sıfır diye motorun hiç enerji aktarmadığını sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Tek kuvvet işi ne zaman doğrudan ΔK olur?",
        answer:
          "Diğer kuvvetlerin toplam işi sıfırsa; genel olarak bütün net iş ΔK’dir.",
      },
      {
        prompt: "Yay uzaması nereden ölçülür?",
        answer: "Doğal boydan; yüklü denge noktasıyla karıştırılmaz.",
      },
      {
        prompt: "K + Us azalırken toplam enerji yok olur mu?",
        answer:
          "Hayır; sabit duran yüzeyde Q = fL gibi iç enerji aktarımı bilançoya eklenir.",
      },
      {
        prompt: "Enerjiyle bulunan hız çembersel temas için yeterli mi?",
        answer:
          "Hayır; normal/merkezcil ivme ve tek taraflı temas koşulu ayrıca denetlenir.",
      },
    ],
    questions: [
      {
        prompt: "2 kg cismin sürati 3 m/s’den 5 m/s’ye çıkıyor. Net iş kaç J?",
        correct: "16",
        distractors: ["4", "8", "25", "34"],
        hint: "ΔK = m(vson² − vilk²)/2.",
        explanation:
          "0,5 · 2 · (25 − 9) = 16 J; kare farkı ile farkın karesi aynı değildir.",
      },
      {
        prompt:
          "20 N sabit kuvvet, 3 m yer değiştirmeyle 60° açı yapıyor; cos60° = 1/2. Yalnız bu kuvvetin işi kaç J?",
        correct: "30",
        distractors: ["0", "10", "60", "120"],
        hint: "W = Fd cosθ; net iş sorulmadı.",
        explanation: "20 · 3 · 1/2 = 30 J; diğer kuvvet işleri ayrıca gerekir.",
      },
      {
        prompt:
          "Net F–x grafiği 0–2 m’de +8 N, 2–4 m’de +8’den 0’a doğrusal ve 4–5 m’de −4 N. Cisim +x ilerlerken 0–5 m net iş kaç J?",
        correct: "20",
        distractors: ["12", "24", "28", "32"],
        hint: "Dikdörtgen, üçgen ve negatif dikdörtgen.",
        explanation:
          "16 + 8 − 4 = 20 J. Eksen altı alan büyüklük olarak eklenmez.",
      },
      {
        prompt:
          "2 kg cisim, yukarı artı sabit referansta y = −3 m’den y = +2 m’ye taşınıyor. g = 10. Yer çekimi potansiyel değişimi kaç J?",
        correct: "100",
        distractors: ["−100", "20", "40", "60"],
        hint: "ΔU = mg(yson − yilk).",
        explanation:
          "2 · 10 · [2 − (−3)] = 100 J. Referansın altında ilk potansiyel negatif olabilir.",
      },
      {
        prompt:
          "k = 100 N/m ideal yay doğal boyundan 0,20 m geriliyor. Depolanan enerji kaç J?",
        correct: "2",
        distractors: ["1", "4", "10", "20"],
        hint: "Us = kx²/2; son kuvvet × bütün x değil.",
        explanation:
          "0,5 · 100 · 0,20² = 2 J; kuvvet–uzama üçgeninin alanıdır.",
      },
      {
        prompt:
          "Duran yatay yüzeyde 2 kg blok 4 m/s ile kayıyor. Başka yatay kuvvet yok, sabit sürtünme 4 N. İlk durma mesafesi kaç m?",
        correct: "4",
        distractors: ["2", "8", "16", "32"],
        hint: "İlk kinetik 16 J, sürtünme işi −4x.",
        explanation:
          "0 − 16 = −4x → x = 4 m. İlk duruştan sonra eski kayma modeli sürdürülmez.",
      },
      {
        prompt:
          "Duran yatay yüzeyde 2 kg blok 4 m/s ile başlıyor; tek yatay etki sabit 4 N kinetik sürtünme. İlk ileri kayma modeli için x = 5 m’ye ulaşıldığı söyleniyor. Doğru değerlendirme?",
        correct: "Ulaşamaz; ilk duruş x = 4 m’dedir",
        distractors: [
          "Kinetik enerji −4 J olur ve geçerlidir",
          "Sürtünme kendiliğinden ters fırlatır",
          "x = 5 m’de hız kesin 4 m/s’dir",
          "Net iş her mesafede sıfırdır",
        ],
        hint: "Erişilebilirlik için K ≥ 0 gerekir.",
        explanation:
          "K(x) = 16 − 4x; ilk sıfır 4 m. Negatif kinetik yeni bir fiziksel durum değil, dalın geçersiz uzantısıdır.",
      },
      {
        prompt:
          "İki özdeş k = 100 N/m ideal yay seri bağlı, gerilme 20 N ve statik denge var. Her bir yayda enerji kaç J?",
        correct: "2",
        distractors: ["1", "4", "8", "20"],
        hint: "Her yay aynı 20 N taşır; kendi uzamasını kullan.",
        explanation:
          "Her x = F/k = 0,20 m; U = 100 · 0,20²/2 = 2 J. İkisinin toplamı 4 J’dir.",
      },
      {
        prompt:
          "İdeal sabit makarada 2 ve 4 kg aynı gergin kütlesiz iple bağlı, ilk durgun. Ağır 3 m aşağı, hafif 3 m yukarı gidiyor; g = 10 ve başka enerji aktarımı yok. Ortak sürat kaç m/s?",
        correct: "2√5",
        distractors: ["√5", "√10", "10", "20"],
        hint: "Net potansiyel azalışı toplam kinetiğe eşitle.",
        explanation: "(4 − 2) · 10 · 3 = (2 + 4)v²/2 → 60 = 3v² → v = 2√5 m/s.",
      },
      {
        prompt:
          "10 kg yük 2 m yukarı sabit hızla 5 s’de kaldırılıyor. g = 10 ve motor verimi yüzde 80. Giriş ortalama gücü kaç W?",
        correct: "50",
        distractors: ["32", "40", "80", "200"],
        hint: "Önce yararlı 200 J, sonra verimle giriş enerjisi.",
        explanation:
          "Egiriş = 200/0,8 = 250 J; Pgiriş = 250/5 = 50 W. Yararlı güç 40 W’tır.",
      },
    ],
  },
];
export const forge017PhysicsTopics: Record<string, string> = Object.fromEntries(
  packs.map((p) => [p.id, p.topic]),
);
export const forge017PhysicsGuides: LessonGuide[] = packs.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
  source: p.source,
}));
export const forge017PhysicsLessons: Lesson[] = packs.map((p) => ({
  id: p.id,
  subjectId: "ayt-fizik",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  body: p.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  source: txt(p.source),
  tags: [p.topic, "Özgün öğretim soruları"],
  questions: p.questions.map((q, i) => {
    const raw = [q.correct, ...q.distractors],
      answer = (2 * i + 1) % 5;
    return {
      id: `${p.id}-017-${i + 1}`,
      prompt: txt(q.prompt),
      options: raw.map((_, j) => txt(raw[(j - answer + 5) % 5])),
      answer,
      hint: txt(q.hint),
      explanation: txt(q.explanation),
      skill: p.id,
    };
  }),
}));

function finite017(...values: number[]) {
  if (!values.every(Number.isFinite)) throw new RangeError("PHYSICS017_FINITE");
}
const nz017 = (x: number) => (Object.is(x, -0) ? 0 : x);
function positive017(...values: number[]) {
  finite017(...values);
  if (values.some((x) => x <= 0)) throw new RangeError("PHYSICS017_POSITIVE");
}
function groundTime017(height: number, velocity: number, gravity: number) {
  if (height === 0) return velocity > 0 ? 2 * (velocity / gravity) : 0;
  if (velocity === 0) return Math.sqrt(2 * (height / gravity));
  const root = Math.hypot(
    velocity,
    Math.sqrt(2) * Math.sqrt(gravity) * Math.sqrt(height),
  );
  const t =
    velocity < 0
      ? (height / root) * (2 / (1 - velocity / root))
      : velocity / gravity + root / gravity;
  finite017(root, t);
  return t;
}
function time017(time: number, duration: number) {
  finite017(time, duration);
  if (time < 0 || time > duration) throw new RangeError("PHYSICS017_TIME");
}
function logCosh017(z: number) {
  const a = Math.abs(z);
  return a < 0.01
    ? Math.log1p(2 * Math.sinh(a / 2) ** 2)
    : a + Math.log1p(Math.exp(-2 * a)) - Math.LN2;
}
export type FallInput017 = {
  mass: number;
  gravity: number;
  height: number;
  density: number;
  dragCoefficient: number;
  area: number;
  time: number;
};
/** Fixed quadratic drag in still fluid, no buoyancy, released from rest. */
export function fallModel017(input: FallInput017) {
  const { mass, gravity, height, density, dragCoefficient, area, time } = input;
  positive017(mass, gravity);
  finite017(height, density, dragCoefficient, area, time);
  if (height < 0 || density < 0 || dragCoefficient < 0 || area < 0)
    throw new RangeError("PHYSICS017_FALL_SCOPE");
  const coefficient = (density * dragCoefficient * area) / 2;
  const weight = mass * gravity;
  finite017(coefficient, weight);
  let terminalSpeed: number | null = null,
    nearLimitTime: number | null = null;
  let duration: number, speed: number, distance: number, acceleration: number;
  if (coefficient === 0) {
    duration = Math.sqrt((2 * height) / gravity);
    time017(time, duration);
    speed = gravity * time;
    distance = time === duration ? height : (gravity * time * time) / 2;
    acceleration = gravity;
  } else {
    terminalSpeed = Math.sqrt(weight / coefficient);
    finite017(terminalSpeed);
    positive017(terminalSpeed);
    const a = (coefficient * height) / mass;
    finite017(a);
    const zGround = a + Math.log1p(Math.sqrt(-Math.expm1(-2 * a)));
    duration = (terminalSpeed / gravity) * zGround;
    time017(time, duration);
    const z = (gravity * time) / terminalSpeed,
      ratio = Math.tanh(z);
    speed = terminalSpeed * ratio;
    distance =
      time === duration
        ? height
        : time === 0
          ? 0
          : gravity *
            time *
            time *
            (z === 0
              ? 0.5
              : Math.abs(z) < 0.01
                ? 0.5 - (z * z) / 12 + z ** 4 / 45
                : logCosh017(z) / (z * z));
    acceleration = gravity * (1 - ratio) * (1 + ratio);
    nearLimitTime = (terminalSpeed / gravity) * (Math.log(199) / 2);
  }
  const drag = coefficient * speed * speed,
    kinetic = (mass * speed * speed) / 2,
    lostPotential = weight * distance,
    heat = Math.max(0, lostPotential - kinetic),
    remainingHeight = nz017(height - distance);
  finite017(
    duration,
    speed,
    distance,
    acceleration,
    drag,
    kinetic,
    lostPotential,
    heat,
    remainingHeight,
  );
  if (nearLimitTime !== null) finite017(nearLimitTime);
  return {
    coefficient,
    weight,
    terminalSpeed,
    nearLimitTime,
    duration,
    time,
    speed,
    distance,
    acceleration,
    drag,
    height: remainingHeight,
    kinetic,
    lostPotential,
    heat,
    nearLimit: nearLimitTime !== null && time >= nearLimitTime,
    nearLimitBeforeGround: nearLimitTime !== null && nearLimitTime <= duration,
  };
}
export type VerticalInput017 = {
  height: number;
  initialVelocity: number;
  gravity: number;
  time: number;
};
export function verticalModel017(input: VerticalInput017) {
  const { height, initialVelocity, gravity, time } = input;
  positive017(gravity);
  finite017(height, initialVelocity, time);
  if (height < 0) throw new RangeError("PHYSICS017_HEIGHT");
  const duration = groundTime017(height, initialVelocity, gravity);
  time017(time, duration);
  const apexTime = initialVelocity > 0 ? initialVelocity / gravity : null,
    maxHeight =
      height +
      (initialVelocity > 0
        ? (initialVelocity * initialVelocity) / (2 * gravity)
        : 0),
    position =
      time === duration
        ? 0
        : height + initialVelocity * time - (gravity * time * time) / 2,
    velocity = time === apexTime ? 0 : nz017(initialVelocity - gravity * time),
    displacement = nz017(position - height),
    path =
      apexTime !== null && time > apexTime
        ? maxHeight - height + maxHeight - position
        : Math.abs(displacement),
    averageVelocity = time === 0 ? null : displacement / time,
    averageSpeed = time === 0 ? null : path / time;
  finite017(duration, maxHeight, position, velocity, displacement, path);
  if (averageVelocity !== null) finite017(averageVelocity, averageSpeed!);
  return {
    duration,
    time,
    height: position,
    velocity,
    speed: Math.abs(velocity),
    acceleration: -gravity,
    displacement,
    path,
    apexTime,
    maxHeight,
    averageVelocity,
    averageSpeed,
  };
}
type Trajectory017 = {
  height: number;
  vx0: number;
  vy0: number;
  gravity: number;
  time: number;
};
function trajectory017({ height, vx0, vy0, gravity, time }: Trajectory017) {
  positive017(gravity);
  finite017(height, vx0, vy0, time);
  if (height < 0) throw new RangeError("PHYSICS017_HEIGHT");
  const duration = groundTime017(height, vy0, gravity);
  time017(time, duration);
  const apexTime = vy0 > 0 ? vy0 / gravity : null,
    maxHeight = height + (vy0 > 0 ? (vy0 * vy0) / (2 * gravity) : 0),
    range = nz017(vx0 * duration),
    x = nz017(vx0 * time),
    y =
      time === duration ? 0 : height + vy0 * time - (gravity * time * time) / 2,
    vy = time === apexTime ? 0 : nz017(vy0 - gravity * time),
    speed = Math.hypot(vx0, vy),
    minX = Math.min(0, range),
    maxX = Math.max(0, range),
    impactVy = nz017(vy0 - gravity * duration),
    impactSpeed = Math.hypot(vx0, impactVy);
  finite017(
    duration,
    maxHeight,
    range,
    x,
    y,
    vy,
    speed,
    minX,
    maxX,
    impactVy,
    impactSpeed,
  );
  return {
    duration,
    time,
    x,
    y,
    vx: vx0,
    vy,
    speed,
    ax: 0,
    ay: -gravity,
    range,
    minX,
    maxX,
    maxHeight,
    apexTime,
    impactVy,
    impactSpeed,
  };
}
export type HorizontalInput017 = {
  height: number;
  horizontalVelocity: number;
  gravity: number;
  time: number;
};
export function horizontalModel017({
  height,
  horizontalVelocity,
  gravity,
  time,
}: HorizontalInput017) {
  return trajectory017({
    height,
    vx0: horizontalVelocity,
    vy0: 0,
    gravity,
    time,
  });
}
export type ObliqueInput017 = {
  height: number;
  speed: number;
  angle: number;
  gravity: number;
  time: number;
};
export function obliqueModel017({
  height,
  speed,
  angle,
  gravity,
  time,
}: ObliqueInput017) {
  finite017(speed, angle);
  if (speed < 0 || angle < -90 || angle > 90)
    throw new RangeError("PHYSICS017_LAUNCH_SCOPE");
  const rad = (angle * Math.PI) / 180,
    vx0 = angle === 90 || angle === -90 ? 0 : speed * Math.cos(rad),
    vy0 =
      angle === 90
        ? speed
        : angle === -90
          ? -speed
          : angle === 0
            ? 0
            : speed * Math.sin(rad);
  return {
    ...trajectory017({ height, vx0, vy0, gravity, time }),
    initialSpeed: speed,
    angle,
    sameLevelFormulaApplies:
      height === 0 && speed > 0 && angle > 0 && angle <= 90,
  };
}
export type EnergyInput017 = {
  mass: number;
  initialSpeed: number;
  gravity: number;
  mu: number;
  stiffness: number;
  contact: number;
  progress: number;
};
/** First forward sliding branch, fixed horizontal surface, until first rest. */
export function energyModel017({
  mass,
  initialSpeed,
  gravity,
  mu,
  stiffness,
  contact,
  progress,
}: EnergyInput017) {
  positive017(mass, gravity, stiffness);
  finite017(initialSpeed, mu, contact, progress);
  if (initialSpeed < 0 || mu < 0 || contact < 0 || progress < 0 || progress > 1)
    throw new RangeError("PHYSICS017_ENERGY_SCOPE");
  const initialK = (mass * initialSpeed * initialSpeed) / 2,
    friction = mu * mass * gravity,
    contactLoss = friction * contact;
  finite017(initialK, friction, contactLoss);
  let stop: number, maximumCompression: number;
  if (initialK === 0) {
    stop = 0;
    maximumCompression = 0;
  } else if (friction > 0 && initialK <= contactLoss) {
    stop = initialK / friction;
    maximumCompression = 0;
  } else {
    const available = initialK - contactLoss,
      root = Math.hypot(
        friction,
        Math.sqrt(2) * Math.sqrt(stiffness) * Math.sqrt(available),
      );
    maximumCompression = (available / root) * (2 / (1 + friction / root));
    stop = contact + maximumCompression;
  }
  finite017(stop, maximumCompression);
  const x = progress * stop,
    compression = Math.max(0, x - contact),
    spring = (stiffness * compression * compression) / 2,
    heat = friction * x,
    kinetic = progress === 1 ? 0 : Math.max(0, initialK - heat - spring),
    speed = Math.sqrt((2 * kinetic) / mass),
    frictionForce = initialK === 0 ? 0 : -friction,
    springForce = -stiffness * compression,
    netForce = nz017(frictionForce + springForce),
    netWork = -(heat + spring),
    mechanical = kinetic + spring,
    power = netForce * speed;
  finite017(
    x,
    compression,
    spring,
    heat,
    kinetic,
    speed,
    netForce,
    netWork,
    mechanical,
    power,
  );
  return {
    initialK,
    friction,
    contactLoss,
    stop,
    maximumCompression,
    x,
    compression,
    spring,
    heat,
    kinetic,
    speed,
    frictionForce,
    springForce,
    netForce,
    netWork,
    mechanical,
    power,
    progress,
    reachesSpring: initialK > contactLoss,
    reachesContact: stop >= contact,
  };
}
