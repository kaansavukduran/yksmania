import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";
const packs = [
  {
    id: "ayt-newton-hareket-yasalari",
    topic: "detail-361",
    title: "Newton yasaları: eğik düzlemden bağlı sistemlere",
    minutes: 90,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 21–36; OGM 11. sınıf Newton özetleri ve Dersler Cepte anlatımı; Aurelia TYT Fizik 004 ile karşılaştırılmış özgün öğretim. Örnek ve sorular özgündür; resmî ÖSYM sorusu değildir.",
    objectives: [
      "Eylemsiz çerçevede gerçek kuvvetleri seç; eğik düzlemde normal ve sürtünmeyi koşullarıyla hesapla.",
      "Bağlı sistemlerde kütle toplamını, alt cisim denklemini ve ideal ip kısıtını birlikte kullan.",
      "İvmeli vagonu yer çerçevesinde çöz; hız yönünden net kuvvet uydurma.",
    ],
    sections: [
      {
        title: "TYT temelinden AYT sistemine geçiş",
        paragraphs: [
          "TYT Newton konusunda tek cisme etki eden kuvvetleri ayırdın. Burada aynı yasaları daha karmaşık düzeneklerde kullanacaksın: önce eylemsiz bir yer çerçevesi ve hedef seç, sonra her serbest cisim diyagramını ayrı kur. Sabit pozitif kütle için ΣF = ma, bileşenler için ΣFx = max ve ΣFy = may yazılır. Hızın yönü bu denklemlerde kuvvetin yönünü belirlemez.",
          "Bir sistemin sınırını büyütmek bazı etkileşimleri iç kuvvet yapar; bu, kuvvetlerin fiziksel olarak kaybolması demek değildir. Bütün sistemin net dış kuvvetinden ortak ivme, bir alt cismin denkleminden gerilme veya temas kuvveti bulunabilir. Ancak önce cisimlerin gerçekten aynı ivmeyle hareket edip etmediğini ip geometrisinden ve temas koşulundan doğrula.",
        ],
      },
      {
        title: "Kuvvet ve bileşen aynı listede iki kez sayılmaz",
        paragraphs: [
          "Eğik düzlemde x eksenini yüzey boyunca yukarı, y eksenini yüzeye dik dışarı seç. Yatayla açısı θ olan sabit düzlemde ağırlığın bileşenleri x yönünde −mg sinθ, y yönünde −mg cosθ olur. Diyagramda gerçek ağırlık oku ile bu kesikli yardımcı izdüşümleri görmen, üçünün de ayrı etkileşim olduğu anlamına gelmez; denklemde ağırlığı ya bütün vektör ya bileşenleriyle kullan.",
          "Blok yüzeye dik ivmelenmiyor ve diğer uygulanan kuvvetler yüzeye paralelse N − mg cosθ = 0, yani N = mg cosθ bulunur. N = mg ancak θ = 0 gibi uygun koşulda çıkar. Yüzeye dik ek çekme veya basma varsa onu da ekle; tek taraflı temasın negatif normal üretemeyeceğini denetle. Bu atölyede dış kuvvet eğime paraleldir ve temas korunur.",
        ],
      },
      {
        title: "Duran blokta gereken sürtünmeyi bul",
        paragraphs: [
          "Yukarı yönlü işaretli dış kuvvet F için sürtünme dışındaki yüzey bileşkesi D = F − mg sinθ olsun. Başlangıçta göreli kayma yoksa denge için fs = −D gerekir. Ancak yüzey en fazla μsN büyüklük sağlayabilir: |D| ≤ μsN ise blok ideal statik dengede kalabilir. Eşitlik sınır durumudur; matematiksel modelde kesin kayma diye yorumlanmaz.",
          "Katsayıyı baştan kuvvet sanmak yerine gereken sürtünmeyi sınırla karşılaştır. Örneğin yatay yüzeyde N = 40 N ve μs = 0,5 iken 6 N itişe karşı sürtünme 6 N olur, 20 N değil. Dış kuvveti azaltınca statik sürtünme de azalır. Etkileşimli modelin “duruyor” seçimi bu anlık rejim kontrolüdür; gerçek yüzeylerde titreşim ve katsayı değişimleri ayrıca rol oynayabilir.",
        ],
      },
      {
        title: "Kayma yönünü değiştir, sürtünmenin yönünü gör",
        paragraphs: [
          "Basit kuru sürtünme modelinde göreli kayma varken fk = μkN büyüklüğündedir; yönü iki yüzeyin göreli kaymasına terstir. Aynı eğimde blok yukarı kayıyorsa sürtünme aşağı, aşağı kayıyorsa yukarı yönelir. Bu yüzden eşit dış kuvvet altında iki farklı başlangıç hızı, o andaki iki farklı ivmeye karşılık gelebilir. Seçilen katsayılar sabittir ve bu örneklerde 0 ≤ μk ≤ μs alınır.",
          "Önceden duran blokta |D| statik sınırı aşarsa kayma eğiliminin yönü D’nin işaretidir; kaymanın hemen ardından kinetik kuvvet bu yöne karşı yazılır. Yukarı giden bir blok durduğunda eski kinetik sürtünme yönünü sonsuza kadar sürdürme: o anda yeniden statik sınırı kontrol et. Yalnız sürtünmeyle duran yatay blok kendiliğinden geri fırlamaz; eğimde yer çekimi statik sınırı aşarsa yeniden aşağı kayabilir.",
        ],
      },
      {
        title: "Yönlü denklemle çıkış ve inişi ayır",
        paragraphs: [
          "Dış F = 0, sinθ = 3/5, cosθ = 4/5 ve g = 10 m/s² alınsın. Aşağı kaymada yukarı eksenine göre a = −g sinθ + μk g cosθ; yukarı kaymada a = −g sinθ − μk g cosθ bulunur. İki terimin işaretini hareketin adından ezberleme; gerçek kuvvet oklarını seçtiğin eksene izdüşür. Negatif ivme, yalnız hız da dikkate alınınca yavaşlama veya hızlanma olarak adlandırılabilir.",
          "m sabitken hem ağırlık hem kuru sürtünme m ile orantılıysa eğimdeki ivmede m sadeleşebilir. Bu, bütün mekanik problemlerde ivmenin kütleden bağımsız olduğu anlamına gelmez; sabit dış F/m terimi varsa kütle etkilidir. Aynı şekilde durma süresi −v0/a ancak a sabit ve bulunan süre gelecekteyse kullanılabilir. Durduktan sonraki rejim yeni bir fizik koşuludur.",
        ],
      },
      {
        title: "Birlikte seçilen sistemde iç çiftler elenir",
        paragraphs: [
          "A ve B bloklarını aynı sistemin içinde seçtiğinde A’nın B’ye ve B’nin A’ya kuvvetleri eşit ve zıttır; vektörel toplamda birbirini götürür. İki blok kaymadan aynı a ile gidiyorsa dış bileşke = (mA + mB)a yazılır. Temas kuvvetini öğrenmek için sonra yalnız A veya yalnız B’yi seç; aynı iç etkileşim bu alt sistemde dış kuvvet hâline gelir.",
          "İç kuvvetlerin elenmesi üçüncü yasanın doğru hedef ayrımıdır. Aynı bloğun ağırlığı ile normali etki–tepki çifti değildir; ikisinin de hedefi o bloktur. Etki–tepki çiftinin diğer tarafı ayrı cisimdedir ve kütleleri farklıysa ivmeler eşit olmak zorunda değildir. Üst üste blokların birlikte hızlanması için gereken statik sürtünme μsN sınırını aşmamalıdır; aşarsa ortak ivme varsayımı terk edilir.",
        ],
      },
      {
        title: "Sabit ideal makara: gerilmeyi alt cisimden doğrula",
        paragraphs: [
          "Yatay masadaki m1 ile asılı m2 aynı kütlesiz, uzamayan iple ve sabit kütlesiz, sürtünmesiz makarayla bağlansın. İp gerginse uçların yol ve ivme büyüklükleri eşittir; masada sağ, asılıda aşağı artı seçilebilir. Başlangıçta duruyorlarsa önce m2g ağırlığının μs m1g statik sınırını aşıp aşmadığını kontrol et. Aşmıyorsa a = 0 ve T = m2g olabilir.",
          "Asılı cisim aşağı kayarken m1 için T − μk m1g = m1a, m2 için m2g − T = m2a yazılır. Toplamdan a = (m2g − μk m1g)/(m1 + m2), sonra T = m2(g − a) bulunur. Gerilme genellikle m2g değildir; asılı kütle ivmeleniyordur. Bu eşit gerilme sonucu ideal tek ip koşulundadır; kütleli veya sürtünmeli makara için aynı model kullanılamaz.",
        ],
      },
      {
        title: "Hareketli makarada önce ipin uzunluğu",
        paragraphs: [
          "Sürtünmesiz yatay düzlemde K’ya bağlı kütlesiz hareketli makaranın ipinin bir ucu duvarda sabit, diğer ucu L bloğuna bağlı olsun. Belirtilen yerleşimde ip uzunluğu xL − 2xK = sabittir; iki kez zaman türevi aL = 2aK verir. “Aynı ipte eşit ivme” ezberinin burada yanlış olduğunu geometrik kısıt gösterir. Başka yerleşimde işaret ve oran yeniden türetilmelidir.",
          "K’ya sağa F uygulanıyor, K makarasına iki ip parçası sola T uyguluyorsa F − 2T = mK aK yazılır. L için T = mL aL ve aL = 2aK birlikte kullanılır. Gerilmenin iki kat görünmesi iki gerçek ip temasından gelir; Fnet adıyla fazladan ok eklenmez. Kütleli makarayı, esneyen ipi veya gevşeyen düzeni bu ideal kısıtla açıklama.",
        ],
      },
      {
        title: "İvmeli vagondaki açı bir hız göstergesi değildir",
        paragraphs: [
          "Vagonun içindeki küçük bob, vagon düzgün yatay ivmelenirken vagona göre sabit açıyla duruyorsa yer çerçevesinde bob da yatay a ivmesine sahiptir. İpe düşeyden θ açısı verildiğinde T cosθ = mg ve T sinθ = ma olur. Bölünce tanθ = a/g bulunur; açı düşeyden ölçülmelidir. İp gerilmesi √((mg)² + (ma)²) ile hesaplanır.",
          "Bu sonuç ani bir salınım sırasında gözlenen herhangi bir açı için geçerli değildir; göreli sabit denge koşulu belirtilmiştir. Vagon sabit hızla gidiyorsa a = 0 ve ideal ip düşeydir; hızlı gidiyor olması tek başına eğilme sebebi değildir. Yer çerçevesinde yalnız gerçek T ve mg kullanılır. Vagon çerçevesindeki eylemsizlik kuvvetini ayrıca seçip sonra yer çerçevesinin ma’sına ikinci kez ekleme.",
        ],
      },
      {
        title: "Denklemi kurduktan sonra fizik sınırını denetle",
        paragraphs: [
          "Çözümün sonunda birim N/kg = m/s², seçilen eksene göre işaret ve rejim kontrolü yap. Normal negatif, ipte basma yönlü gerilme veya statik sınırı aşan fs çıkıyorsa düzenin varsayımları tutmuyor olabilir. Eylemsiz çerçeve, sabit kütle, ideal ip, sabit katsayı ve kayma yönü gibi koşullar sonucu taşıyan bilgilerdir; soru metninde yoksa gereksiz kesinlik ekleme.",
          "Atölyede kuvvetleri değiştirirken önce “duruyor” ile “yukarı kayıyor” hâllerini aynı koşullarda karşılaştır. Ardından tek bir m veya θ değiştir; normalin, statik sınırın ve ivmenin birlikte nasıl değiştiğini söyle. Tahminin yanlışsa yalnız sonucu ezberlemek yerine hangi rejim koşulunu atladığını bul. Modeli açmak veya zaman geçirmek öğrenme puanı sayılmaz; bağımsız sorularda mantığı yeniden kurman beklenir.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı eğim, iki farklı ivme",
        prompt:
          "5 kg blok için g = 10 m/s², sinθ = 3/5, cosθ = 4/5, μs = 0,5 ve μk = 0,25. Dış kuvvet yok. Duran, aşağı kayan ve yukarı kayan hâlleri karşılaştır; yukarı ilk hız 8 m/s ise ilk durma süresini bul.",
        strategy: "Önce durgun rejimi, sonra iki kayma yönünü ayrı hesapla.",
        steps: [
          {
            label: "Durgun sınır",
            expression: "N = 40 N; mg sinθ = 30 N > 20 N",
            explanation: "Statik sürtünme bloğu tek başına tutamaz.",
          },
          {
            label: "Yönlü kuvvet",
            expression: "fk = 10 N; a↓ = −4; a↑ = −8 m/s²",
            explanation:
              "+ eksen eğimde yukarıdır; sürtünme kayma değişince döner.",
          },
          {
            label: "Durma olayı",
            expression: "0 = 8 − 8t → t = 1 s",
            explanation:
              "Durduktan sonra 30 > 20 olduğundan blok aşağı kaymaya başlayabilir.",
          },
        ],
        answer:
          "Durgun denge yok; aşağı kayarken −4, yukarı kayarken −8 m/s²; ilk durma 1 s.",
        check: "Aşağı giderken v < 0 ve a < 0 olduğundan sürat artar.",
        pitfall: "Yukarı ve aşağı kaymada sürtünmeye aynı işareti vermek.",
      },
      {
        title: "Masadaki blok ile asılı kütle",
        prompt:
          "İdeal sabit makara üzerinden aynı gergin iple bağlanan yatay 3 kg ve asılı 2 kg blok ilk anda duruyor. Yatay yüzeyde μs = 0,3, μk = 0,2; g = 10 m/s². İvme ve gerilme?",
        strategy: "İlk hareket koşulu, sistem denklemi ve alt cisim kontrolü.",
        steps: [
          {
            label: "Rejim",
            expression: "20 N > 0,3 · 30 N = 9 N",
            explanation: "Asılı kütle aşağı, masa bloğu makara yönüne kayar.",
          },
          {
            label: "Sistem",
            expression: "20 − 6 = (3 + 2)a → a = 2,8 m/s²",
            explanation: "Kinetik sürtünme 6 N; iki gerilme sistemde elenir.",
          },
          {
            label: "Alt cisim",
            expression: "T = 2(10 − 2,8) = 14,4 N",
            explanation:
              "Masa bloğu da 14,4 − 6 = 3 · 2,8 ile aynı sonucu verir.",
          },
        ],
        answer: "İvme büyüklüğü 2,8 m/s²; gerilme 14,4 N.",
        check: "T < 20 N olduğundan asılı cismin net kuvveti aşağıdır.",
        pitfall: "Hareketi baştan varsaymak veya T = 20 N yazmak.",
      },
      {
        title: "Hareketli makaranın iki kat kısıtı",
        prompt:
          "Sürtünmesiz yatay sistemde K = 4 kg, L = 2 kg; K’ya sağa 40 N etki ediyor. K’ya bağlı ideal hareketli makaranın iki ip kolu K’yı sola T ile çekiyor, L’ye sağa T uygulanıyor. İp geometrisi xL − 2xK = sabit. İvmeler ve T?",
        strategy: "Verilen ip kısıtını kuvvet denklemlerine bağla.",
        steps: [
          {
            label: "Kısıt",
            expression: "aL = 2aK",
            explanation: "Aynı ip her düzende eşit ivme üretmez.",
          },
          {
            label: "Denklem",
            expression: "40 − 2T = 4aK; T = 2aL = 4aK",
            explanation:
              "Gerilme iki farklı hedefin denkleminde uygun katsayıyla yer alır.",
          },
          {
            label: "Çözüm",
            expression: "40 = 12aK → aK = 10/3; aL = 20/3; T = 40/3",
            explanation: "İvmeler m/s², gerilme N cinsindedir.",
          },
        ],
        answer: "aK = 10/3 m/s², aL = 20/3 m/s², T = 40/3 N.",
        check: "K: 40 − 80/3 = 40/3 N; L: 40/3 = 2 · 20/3 N.",
        pitfall: "Tüm kütleyi tek ortak ivmeyle çarpmak.",
      },
      {
        title: "Sabit eğilmiş bobun ivmesi",
        prompt:
          "8 kg vagon ve 2 kg bobdan oluşan sistem sürtünmesiz yatay yolda sağa 50 N dış kuvvet alıyor. Bob vagona göre sabit açıda duruyor; g = 10 m/s². Düşeyden ip açısı ve gerilme?",
        strategy: "Sistem ivmesini bul, bobu ayrı hedef seç.",
        steps: [
          {
            label: "Sistem",
            expression: "a = 50/(8 + 2) = 5 m/s²",
            explanation: "Bobun yatay ivmesi vagonunkiyle aynıdır.",
          },
          {
            label: "Bileşenler",
            expression: "Tx = 2 · 5 = 10 N; Ty = 2 · 10 = 20 N",
            explanation: "Yer çerçevesinde gerçek kuvvetler T ve mg’dir.",
          },
          {
            label: "Açı ve norm",
            expression: "tanθ = 1/2; θ ≈ 26,565°; T = 10√5 N",
            explanation:
              "θ düşeyden ölçülür; geçici salınım bu denge hesabına dahil değildir.",
          },
        ],
        answer: "Düşeyden yaklaşık 26,565°; gerilme 10√5 N.",
        check: "T, yalnız düşey bileşeni olan 20 N’dan büyüktür.",
        pitfall:
          "Vagon hızını ivme yerine kullanmak veya açıyı yataydan ölçüp aynı tanjantı yazmak.",
      },
    ],
    recall: [
      {
        prompt: "Eğimde N = mg cosθ hangi koşullarda doğrudur?",
        answer:
          "Düzlem sabit, yüzeye dik ivme yok ve diğer kuvvetlerin yüzeye dik bileşeni yoksa.",
      },
      {
        prompt: "Duran blokta statik sürtünme neden her zaman μsN değildir?",
        answer:
          "Gereken değeri üst sınırına kadar alır; önce denge için fs = −D bulunur.",
      },
      {
        prompt: "Sabit ve hareketli makara arasındaki kritik işlem farkı?",
        answer:
          "İp uzunluğu kısıtı yeniden türetilir; eşit gerilme eşit ivme garantisi değildir.",
      },
      {
        prompt: "Düşeyden tanθ = a/g hangi bob durumu içindir?",
        answer:
          "Düzgün ivmelenen vagona göre sabit açılı, geçici salınımı bitmiş göreli denge.",
      },
    ],
    questions: [
      {
        prompt:
          "Sabit eğik düzlemde 5 kg bloğa yalnız ağırlık, normal ve yüzeye paralel kuvvetler etki ediyor. Yüzeye dik ivme sıfır; g = 10 m/s², cosθ = 4/5. Normal kaç N?",
        correct: "40 N",
        distractors: ["50 N", "30 N", "10 N", "0 N"],
        hint: "Yüzeye dik ağırlık bileşenini dengele.",
        explanation:
          "N − mg cosθ = 0; N = 5 · 10 · 4/5 = 40 N. Yüzeye paralel kuvvetler bu denkleme girmez.",
      },
      {
        prompt:
          "Yatay yüzeyde N = 40 N ve μs = 0,5. Duran bloğa sağa 6 N dış kuvvet uygulanıyor; başka yatay etki yok. Statik sürtünme nedir?",
        correct: "Sola 6 N",
        distractors: ["Sola 20 N", "Sağa 6 N", "Sıfır", "Sola 40 N"],
        hint: "Gereken değeri 20 N üst sınırıyla karşılaştır.",
        explanation:
          "Denge için sola 6 N yeterlidir ve 6 ≤ 20. Statik üst sınır her durumda gerçek sürtünme değildir.",
      },
      {
        prompt:
          "5 kg blok sabit eğimde aşağı kayıyor; dış kuvvet yok. g = 10 m/s², sinθ = 3/5, cosθ = 4/5, μk = 0,25. Eğimde yukarı artı seçilirse ivme?",
        correct: "−4 m/s²",
        distractors: ["+4 m/s²", "−8 m/s²", "+8 m/s²", "−6 m/s²"],
        hint: "Ağırlık aşağı, kinetik sürtünme yukarıdır.",
        explanation:
          "N = 40 N, fk = 10 N. Net = −30 + 10 = −20 N; a = −20/5 = −4 m/s².",
      },
      {
        prompt:
          "5 kg blok aynı sabit eğimde yukarı kayıyor. Dış kuvvet yok; g = 10 m/s², sinθ = 3/5, cosθ = 4/5, μk = 0,25. Eğimde yukarı artı seçilirse ivme?",
        correct: "−8 m/s²",
        distractors: ["−4 m/s²", "+8 m/s²", "+4 m/s²", "0 m/s²"],
        hint: "Yukarı kaymaya karşı sürtünme de ağırlığın eğim bileşeniyle aşağıdır.",
        explanation:
          "N = 40 N ve fk = 10 N; net = −30 − 10 = −40 N. a = −8 m/s²; pozitif hız azalır.",
      },
      {
        prompt:
          "İdeal sabit makaradaki aynı gergin ip yatay 3 kg blok ile asılı 2 kg bloğu bağlıyor. Başlangıçta duruyorlar; g = 10 m/s², masada μs = 0,3 ve μk = 0,2. Kayma başladıktan sonraki ivme büyüklüğü?",
        correct: "2,8 m/s²",
        distractors: ["4 m/s²", "6,67 m/s²", "0 m/s²", "4,67 m/s²"],
        hint: "Önce 20 N ile statik sınır 9 N’ı, sonra sistem dış kuvvetlerini karşılaştır.",
        explanation:
          "20 > 9 olduğu için kayma başlar; kinetik sürtünme 6 N. a = (20 − 6)/(3 + 2) = 2,8 m/s².",
      },
      {
        prompt:
          "İdeal sabit makara düzeninde asılı 2 kg cisim aşağı 2,8 m/s² ivmeleniyor; g = 10 m/s². Aynı ideal ipin gerilmesi kaç N?",
        correct: "14,4 N",
        distractors: ["20 N", "25,6 N", "5,6 N", "2,8 N"],
        hint: "Asılı hedef için aşağı yönlü neti yaz.",
        explanation:
          "20 − T = 2 · 2,8 = 5,6; T = 14,4 N. Ağırlık tek başına net kuvvet değildir.",
      },
      {
        prompt:
          "Sürtünmesiz yatay hareketli makara düzeninde K = 4 kg, L = 2 kg. K’ya sağa 40 N, sola iki ip kolundan toplam 2T; L’ye sağa T etki ediyor. Verilen ideal ip kısıtı aL = 2aK. K’nın ivmesi?",
        correct: "10/3 m/s²",
        distractors: ["20/3 m/s²", "10 m/s²", "5 m/s²", "40/3 m/s²"],
        hint: "L denklemi T = 2aL ile K denkleminde T’yi yok et.",
        explanation:
          "T = 2 · 2aK = 4aK. 40 − 2T = 4aK → 40 = 12aK → aK = 10/3 m/s².",
      },
      {
        prompt:
          "Düzgün sağa 5 m/s² ivmelenen vagonda bob vagona göre sabit açıda duruyor. g = 10 m/s² ve θ düşeyden ölçülüyor. tanθ nedir?",
        correct: "1/2",
        distractors: ["2", "1", "0", "√3"],
        hint: "Bobun yatay ve düşey gerilme bileşenlerini oranla.",
        explanation:
          "T sinθ = ma ve T cosθ = mg; tanθ = a/g = 5/10 = 1/2. Geçici salınım varsayılmıyor.",
      },
      {
        prompt:
          "Sabit eğimde duran blok için sürtünme dışındaki yüzey bileşkesi aşağı 12 N, statik sürtünme üst sınırı 12 N. İdeal statik model hangi sonucu verir?",
        correct: "Yukarı 12 N sürtünmeyle durabilir",
        distractors: [
          "Kesin aşağı kayar",
          "Sürtünme sıfırdır",
          "Aşağı 12 N sürtünme olur",
          "Yukarı 24 N sürtünme gerekir",
        ],
        hint: "Statik eşitsizlikte sınır eşitliği de mümkündür.",
        explanation:
          "Gereken fs yukarı 12 N’dır ve |fs| = μsN sınırını aşmaz. Tam sınırda ideal statik denge mümkündür; kesin kayma çıkarılmaz.",
      },
      {
        prompt:
          "Duran 2 kg üst blok, yatay 4 kg alt blokla kaymadan beraber sağa 3 m/s² ivmeleniyor. Üst bloğa yatayda yalnız alt yüzeyin statik sürtünmesi etki ediyor; üst blok için μsN = 8 N. Üst bloğa sürtünme?",
        correct: "Sağa 6 N",
        distractors: ["Sola 6 N", "Sağa 8 N", "Sola 8 N", "Sıfır"],
        hint: "Üst blok tek hedefken yatay net kuvvet ma olmalıdır.",
        explanation:
          "fs = 2 · 3 = 6 N sağadır; 6 < 8 olduğu için kaymadan ortak ivme koşulu tutar. Sürtünme her zaman yere göre hızın tersine değildir.",
      },
    ],
  },
  {
    id: "bir-boyutta-sabit-ivmeli-hareket",
    topic: "detail-362",
    title: "Sabit ivmeli hareket: işaret, dönme ve gerçek yol",
    minutes: 85,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 37–41; OGM sabit ivmeli hareket özetleri ve Dersler Cepte; Aurelia TYT Fizik 003 ile karşılaştırılmış özgün öğretim. Örnekler ve öğretim soruları özgündür; resmî sınav sorusu değildir.",
    objectives: [
      "Sabit ivmeyi yönlü x, v ve a ile kur; her aralık için başlangıç verisini belirt.",
      "Durma ve dönme anlarında alınan yolu yer değiştirmeden ayır.",
      "Zamansız bağıntının kökünü, ortalamaları ve frenleme modelinin geçerlilik süresini denetle.",
    ],
    sections: [
      {
        title: "Bir hareketi belirlemek için başlangıç gerekir",
        paragraphs: [
          "Bir doğrultu boyunca sabit ivmeli harekette pozitif yönü, zaman başlangıcını, ilk konumu x0 ve ilk hızı v0 belirt. İvme hızın birim zamandaki yönlü değişimidir; a = Δv/Δt sabitse eşit sürelerde eşit hız değişimleri oluşur. İlk hız −4 m/s, ivme −2 m/s² olan cisim negatif yönde giderek süratlenir; “eksi” sözcüğü tek başına yavaşlamayı anlatmaz.",
          "Model bir eylemsiz çerçevede tek boyut ve sabit ivme varsayar. Kuvvetler hızla değişiyorsa, örneğin hava direnci artıyorsa bütün süreç aynı a ile çözülemez. Başlangıç saatini veya ekseni değiştirmek fiziksel hareketi değiştirmez; sayılar bu yeni tanıma göre dönüştürülür. Formüle girmeden önce neyin verildiğini, neyin istendiğini ve hangi zaman aralığının geçerli olduğunu yaz.",
        ],
      },
      {
        title: "Hız denklemini işaretleriyle kur",
        paragraphs: [
          "t = 0 anındaki hız v0 ise t ≥ 0 için v(t) = v0 + at kullanılır. Δv = at, hem hız yönü hem değişimi taşır; sürat ise |v(t)| olduğundan negatif olamaz. Pozitif v ile negatif a sürati azaltır, fakat sıfırdan sonra aynı a devam ederse cisim negatif yöne dönüp süratlenebilir. Hız ve ivme aynı işaretliyken sürat artar.",
          "Bir eksenin yönünü ters çevirirsen v0 ve a birlikte işaret değiştirir; fiziksel sürat ve geçen süre değişmez. Eşit sürelerde hızların sayısal farkı aynı olsa da süratler aynı miktarda artmak zorunda değildir; arada hız sıfırı geçilebilir. Atölyede zamanı elle ilerletirken hız okunun yönünü ve “sürat” satırını birlikte izle. İvme oku sabit kalırken hız oku dönebilir.",
        ],
      },
      {
        title: "Konumu yer değiştirmeye bir kez ekle",
        paragraphs: [
          "Sabit ivmede Δx = v0t + at²/2 ve x(t) = x0 + Δx olur. İlk konum ikinci kez eklenmez; x0 = −5 m olsa bile sonraki konum pozitif çıkabilir. t² terimindeki yarım katsayısı, hızın her anda son hızda olmamasından gelir. Hız–zaman grafiği altında kalan işaretli trapez alanı da aynı yer değiştirmeyi verir.",
          "Konumun işareti cismin orijine göre tarafını, hızın işareti gidiş yönünü anlatır. Örneğin x > 0 ve v < 0, cismin sağ tarafta sola gittiğini gösterir; henüz orijini geçmiş olması gerekmez. Aynı x değerine farklı zamanlarda farklı hızlarla gelmek mümkündür. Çözümü kontrol etmek için başlangıç t = 0 değerini yerine koy: x(0) = x0 ve v(0) = v0 çıkmalıdır.",
        ],
      },
      {
        title: "Durma, dönme ve uç noktalar",
        paragraphs: [
          "a ≠ 0 için olası hız sıfırı t* = −v0/a ile bulunur. Ancak t* gelecekte ve incelenen aralık içindeyse o süreçte bir durma vardır. a = 0 iken bu bölme yapılmaz: v0 sıfırsa sürekli durgun, sıfır değilse düzgün doğrusal hareket vardır. İncelenen aralığın sonunda v = 0 olması, aralığın içinde geri dönüldüğü anlamına gelmez.",
          "Gerçek bir yön değişimini görmek için hızın durma anının iki yanında işaret değiştirmesine ve aynı ivme modelinin devam etmesine bak. Dönme anında konumun yerel minimum veya maksimum olması x–t eğrisinin yatay teğetiyle uyumludur. Duran sürtünmeli aracın kendiliğinden geri gitmesini üretmek için eski fren ivmesini uzatma; kuvvet modeli olaydan sonra değişebilir. Matematiksel yörünge ile fiziksel geçerlilik aralığı aynı şey değildir.",
        ],
      },
      {
        title: "Yol, negatif alanları da pozitif sayar",
        paragraphs: [
          "Yön değişmiyorsa alınan yol |Δx| olur. Hız aralık içinde sıfırı geçerse yolu dönme noktasında böl: L = |x(t*) − x0| + |x(t) − x(t*)|. Örneğin 24 m ilerleyip 6 m geri gelmek, 18 m yer değiştirme ama 30 m yol demektir. Toplam yer değiştirme sıfır olsa da yol sıfır olmayabilir.",
          "Bu ayrım v–t grafiğinde işaretli alan ile alanların mutlak toplamı arasındaki farktır. Sürat–zaman grafiğinin alanı doğrudan yolu verir; negatif sürat alanı çizilmez. Son hızın büyüklüğü, o ana kadar alınan yol değildir. Atölyede aynı süre ve ivmeyi koruyup ilk hızı değiştirerek geri dönüşün ortaya çıkmasını dene; konum oku aynı sonuca gelirken geçmiş rota daha uzun olabilir.",
        ],
      },
      {
        title: "Zamansız bağıntı yön bilgisini kareler",
        paragraphs: [
          "t’yi iki denklemden yok edince v² = v0² + 2aΔx elde edilir. Bu bağıntı yalnız sabit ivmeli aralık için geçerlidir. v² pozitif bulundu diye doğrudan pozitif kökü hız kabul etme; v’nin işareti eksene ve gelecekteki hareket dalına bağlıdır. Her aday kökü v = v0 + at denklemine koy ve elde edilen t’nin incelenen aralıkta olup olmadığını kontrol et.",
          "v0 = −4 m/s, a = −2 m/s² ve Δx = −12 m için v² = 64 bulunur. v = −8 m/s kökü t = 2 s verir; v = +8 m/s ise t = −6 s ile geçmişe aittir. a = 0 veya yer değiştirme kısıtı özel durum oluşturabilir; gereksiz yere sıfıra bölme. Negatif v² çıkması gerçek sayılı bu modelde verilen yer değiştirmenin o başlangıç koşullarıyla erişilmediğini gösterir.",
        ],
      },
      {
        title: "Ortalama hız ve ortalama sürat ayrı nicelikler",
        paragraphs: [
          "t > 0 için ortalama hız Δx/t, ortalama sürat L/t ile bulunur. Tek sabit ivmeli aralıkta hız doğrusal değiştiği için ortalama hız (v0 + vson)/2’ye eşittir; bu ifade yönlüdür. Örneğin +12’den −6 m/s’ye 6 s içinde geçerken ortalama hız 3 m/s olur; arada durup döndüğü için ortalama sürat 5 m/s’dir.",
          "İlk ve son süratlerin ortalaması, yön değiştiren süreçte ortalama sürati otomatik vermez. Parça parça farklı ivmeli veya farklı süreli iki hareket için de bütün ortalamayı toplam yer değiştirme veya toplam yolun toplam süreye oranından kur. Sıfır süreli aralıkta 0/0’a sahte sıfır ortalama verme; tanımsız göster. Modelin t = 0 görünümü bu yüzden konum ve hızı verirken ortalamalar için süre ister.",
        ],
      },
      {
        title: "Tepki ve frenleme iki ayrı süreçtir",
        paragraphs: [
          "Bir sürücünün tehlikeyi görüp frene basana kadar geçen tepki süresinde hız yaklaşık sabitse yol v0tₜ olur. Ardından sabit fren ivmesiyle durana kadar geçen süre −v0/a ve fren yolu v0²/(2|a|) bulunur. Toplam durma yolu iki parçanın toplamıdır; sürücü tehlikeyi gördüğünde aracın zaten fren ivmesine sahip olduğu varsayılmaz.",
          "20 m/s hız, 1 s tepki ve sonra −5 m/s² fren ivmesi için tepki yolu 20 m, fren yolu 40 m ve toplam 60 m’dir. Fren süresi 4 s, toplam süre 5 s olur. Bu sayılar aynı kuru yol, sabit fren ivmesi ve başka etki yok koşulundadır. Hızı ikiye katlamak fren yolunu bu modelde dört katına çıkarır; tepki yolu ise iki katına çıkar. Gerçek yol güvenliği her koşulda bu basit sayı modeline indirgenmez.",
        ],
      },
      {
        title: "Üç ayrı denetimle sonucu sağlamlaştır",
        paragraphs: [
          "Önce birimleri kontrol et: v0t ve at² aynı uzunluk birimine, at hız birimine sahip olmalıdır. Sonra başlangıç değerlerini ve varsa hız sıfırını yerine koy. Son olarak sonucu bir grafik veya basit sınırla doğrula: a = 0 yapınca düzgün doğrusal hareket, t = 0 yapınca başlangıç, yön ters çevrilince aynı yol ve sürat çıkmalıdır.",
          "Bu laboratuvarda bütün seçili [0, T] yörüngesi sabit bir konum ölçeğine yerleştirilir; zaman kaydırıcısını oynatınca kamera cismin peşinden kaymaz. Konum m, hız m/s ve ivme m/s² panelleri farklı birimlerdir; ok uzunlukları bu farklı birimlerde birbirleriyle karşılaştırılmaz. Önce yön değişimini tahmin et, sonra anı ve yolu kanıtla; açılan görsel veya geçen süre ayrı bir başarı kaydı oluşturmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Negatif başlangıç konumundan ileri",
        prompt:
          "x0 = −5 m, v0 = +4 m/s, a = +2 m/s². t = 3 s anındaki hız, konum, yol ve ortalama hız nedir?",
        strategy: "Hız ve yer değiştirmeyi ayrı bul; x0’ı yalnız konuma ekle.",
        steps: [
          {
            label: "Hız",
            expression: "v = 4 + 2 · 3 = 10 m/s",
            explanation: "Hız hep pozitif olduğundan yön değişmez.",
          },
          {
            label: "Konum",
            expression: "Δx = 4 · 3 + 2 · 9/2 = 21 m; x = 16 m",
            explanation: "−5 m ilk konumu yer değiştirmeye eklenir.",
          },
          {
            label: "Yol ve ortalama",
            expression: "L = 21 m; vortalama = 21/3 = 7 m/s",
            explanation: "Bu tek sabit ivmeli aralıkta (4 + 10)/2 de 7 verir.",
          },
        ],
        answer: "v = 10 m/s, x = 16 m, L = 21 m, ortalama hız = 7 m/s.",
        check: "t = 0 için x = −5 ve v = 4 korunur.",
        pitfall: "Yer değiştirme 21 m’yi son konum sanmak.",
      },
      {
        title: "İlerleyip geri gelen cisim",
        prompt:
          "x0 = 10 m, v0 = +12 m/s ve a = −3 m/s² sabit. İlk 6 s içindeki son hız, konum ve alınan yol?",
        strategy: "Dönme anını bulmadan yolu toplamaya başlama.",
        steps: [
          {
            label: "Dönme",
            expression: "t* = 4 s; x(4) = 34 m",
            explanation: "İlk 4 saniyede 24 m pozitif yönde gider.",
          },
          {
            label: "Son durum",
            expression: "v(6) = −6 m/s; x(6) = 28 m",
            explanation: "Son iki saniyede 6 m geri gelir.",
          },
          {
            label: "Yol",
            expression: "Δx = 18 m; L = 24 + 6 = 30 m",
            explanation: "Ortalama hız 3 m/s, ortalama sürat 5 m/s’dir.",
          },
        ],
        answer: "Son hız −6 m/s, son konum 28 m, yol 30 m.",
        check: "30 ≥ |18|; konum pozitifken hızın negatif olması mümkündür.",
        pitfall: "6 s boyunca hep ileri gittiğini varsaymak.",
      },
      {
        title: "Karekökün doğru dalı",
        prompt:
          "v0 = −4 m/s, a = −2 m/s² sabit ve Δx = −12 m. t ≥ 0 için bu yer değiştirmeye ulaşıldığındaki hız ve süre?",
        strategy: "Kareli bağıntıdan gelen iki kökü zamana geri koy.",
        steps: [
          {
            label: "Kare",
            expression: "v² = 16 + 2 · (−2) · (−12) = 64",
            explanation: "Matematiksel kökler +8 ve −8 m/s’dir.",
          },
          {
            label: "Gelecek dalı",
            expression: "−8 = −4 − 2t → t = 2 s",
            explanation:
              "Negatif yönde sürat arttığından bu dal fiziksel gelecektir.",
          },
          {
            label: "Öteki kök",
            expression: "+8 = −4 − 2t → t = −6 s",
            explanation:
              "Negatif süre istenen aralığa ait değildir; Δx(2) = −12 m ile denetlenir.",
          },
        ],
        answer: "v = −8 m/s; t = 2 s.",
        check: "Negatif v0 ve negatif a, gelecekte pozitif hız üretmez.",
        pitfall: "v² = 64 görünce hızın kesin +8 olduğunu söylemek.",
      },
      {
        title: "Durma mesafesinin iki parçası",
        prompt:
          "Araç 20 m/s hızla gidiyor; 1 s tepki süresinde hızı sabit. Sonra −5 m/s² sabit fren ivmesiyle ilk kez durana kadar hareket ediyor. Toplam süre ve yol?",
        strategy: "Fren anını yeni zaman başlangıcı yap.",
        steps: [
          {
            label: "Tepki",
            expression: "xtepki = 20 · 1 = 20 m",
            explanation: "Bu sırada ivme sıfırdır.",
          },
          {
            label: "Fren",
            expression: "tfren = 4 s; xfren = 20 · 4 − 5 · 16/2 = 40 m",
            explanation: "Fren modeli ilk durma anında biter.",
          },
          {
            label: "Toplam",
            expression: "t = 1 + 4 = 5 s; L = 20 + 40 = 60 m",
            explanation:
              "İki parça da ileri yönlüdür; yol yer değiştirmeye eşittir.",
          },
        ],
        answer: "Toplam 5 s ve 60 m.",
        check: "Fren yolunun v0²/(2|a|) = 400/10 = 40 m olması tutarlıdır.",
        pitfall:
          "Tepki yolunu unutmak veya fren modelini durduktan sonra geri harekete uzatmak.",
      },
    ],
    recall: [
      {
        prompt: "Negatif ivme kesin yavaşlama mıdır?",
        answer:
          "Hayır; hız ile aynı işaretliyse sürat artar, zıt işaretliyse sıfıra kadar azalır.",
      },
      {
        prompt: "Dönme anını yol hesabına ne zaman katarsın?",
        answer:
          "−v0/a incelenen zaman aralığının içinde ve gerçek ivme modeli geçerliyse.",
      },
      {
        prompt: "v² bağıntısı neden hızın işaretini tek başına vermez?",
        answer:
          "Kare işareti siler; aday hızın zamanı ve hareket dalı ayrıca denetlenir.",
      },
      {
        prompt: "Sıfır süreli aralıkta ortalama hız nedir?",
        answer:
          "Δx/Δt = 0/0 olduğundan tanımsızdır; model sahte sıfır üretmez.",
      },
    ],
    questions: [
      {
        prompt:
          "Bir boyutta x0 = −5 m, v0 = +4 m/s ve sabit a = +2 m/s². t = 3 s anındaki konum kaç m?",
        correct: "16 m",
        distractors: ["21 m", "−16 m", "7 m", "34 m"],
        hint: "Önce Δx, sonra x0 + Δx.",
        explanation: "Δx = 4 · 3 + 2 · 3²/2 = 21 m; x = −5 + 21 = 16 m.",
      },
      {
        prompt:
          "Bir cismin v0 = −4 m/s ve sabit a = −2 m/s². İlk 2 s sonunda hız ve sürat sırasıyla?",
        correct: "−8 m/s ve 8 m/s",
        distractors: [
          "+8 m/s ve 8 m/s",
          "−8 m/s ve −8 m/s",
          "0 m/s ve 0 m/s",
          "−4 m/s ve 4 m/s",
        ],
        hint: "Hız v0 + at, sürat hızın mutlak değeridir.",
        explanation:
          "v = −4 − 2 · 2 = −8 m/s. Negatif yönde sürat 8 m/s olur; negatif ivme burada hızlandırır.",
      },
      {
        prompt:
          "Sabit a = −3 m/s² ile hareket eden cismin ilk hızı +12 m/s. t = 0’dan sonraki ilk hız sıfırı kaç saniyede?",
        correct: "4 s",
        distractors: ["−4 s", "3 s", "6 s", "12 s"],
        hint: "v0 + at = 0 denklemini kur.",
        explanation:
          "0 = 12 − 3t → t = 4 s. Negatif ivme pozitif hızı sıfıra getirir.",
      },
      {
        prompt:
          "x0 = 10 m, v0 = +12 m/s, a = −3 m/s² sabit. İlk 6 s içinde alınan toplam yol kaç m?",
        correct: "30 m",
        distractors: ["18 m", "28 m", "24 m", "6 m"],
        hint: "Dönme 4 s anındadır; yolu orada ikiye ayır.",
        explanation:
          "x(4) = 34, x(6) = 28 m. Yol = |34 − 10| + |28 − 34| = 24 + 6 = 30 m.",
      },
      {
        prompt:
          "x0 = 10 m, v0 = +12 m/s, a = −3 m/s² sabit. İlk 6 s için ortalama hız ve ortalama sürat sırasıyla?",
        correct: "3 m/s ve 5 m/s",
        distractors: [
          "5 m/s ve 3 m/s",
          "3 m/s ve 3 m/s",
          "9 m/s ve 9 m/s",
          "−3 m/s ve 5 m/s",
        ],
        hint: "Yer değiştirme 18 m, yol 30 m; aynı toplam süreye böl.",
        explanation:
          "vortalama = 18/6 = 3 m/s; süratortalama = 30/6 = 5 m/s. Dönüş, yol ile yer değiştirmeyi ayırır.",
      },
      {
        prompt:
          "v0 = −4 m/s ve sabit a = −2 m/s². Başlangıca göre Δx = −12 m konumuna t ≥ 0’da geldiğinde hız?",
        correct: "−8 m/s",
        distractors: ["+8 m/s", "−4 m/s", "+4 m/s", "0 m/s"],
        hint: "Kareden sonra iki adayın zamanını kontrol et.",
        explanation:
          "v² = 16 + 48 = 64. −8 kökü t = 2 s, +8 kökü t = −6 s verir; gelecek için −8 m/s seçilir.",
      },
      {
        prompt:
          "Bir araç 20 m/s sabit hızla 1 s tepki süresi geçiriyor; ardından ilk durmasına kadar sabit −5 m/s² fren ivmesine sahip. Tehlikeyi görmesinden durmasına toplam yol?",
        correct: "60 m",
        distractors: ["40 m", "20 m", "100 m", "50 m"],
        hint: "Tepki ve fren yollarını ayrı hesapla.",
        explanation:
          "Tepki 20 m; fren süresi 4 s ve fren yolu 40 m. Toplam 60 m; eski fren ivmesi durma sonrasına uzatılmaz.",
      },
      {
        prompt:
          "Bir boyutta v0 = −3 m/s ve a = 0. İlk 4 s için yer değiştirme ve yol?",
        correct: "−12 m ve 12 m",
        distractors: [
          "12 m ve 12 m",
          "−12 m ve −12 m",
          "0 m ve 12 m",
          "−3 m ve 3 m",
        ],
        hint: "İvme sıfır, hız sabit ama negatif olabilir.",
        explanation:
          "Δx = −3 · 4 = −12 m; yön değişmediğinden yol |Δx| = 12 m.",
      },
      {
        prompt:
          "Sabit a = −2 m/s² ile hareket eden cismin ilk hızı +6 m/s. İlk 6 s için yer değiştirme ve yol sırasıyla?",
        correct: "0 m ve 18 m",
        distractors: [
          "0 m ve 0 m",
          "18 m ve 18 m",
          "−18 m ve 18 m",
          "9 m ve 9 m",
        ],
        hint: "Hız 3 s’de sıfır olur; ilk 3 saniyenin yolunu bul.",
        explanation:
          "İlk 3 s yolu 6 · 3 − 2 · 9/2 = 9 m. Sonraki 3 s 9 m geri döner; Δx = 0 ve L = 18 m.",
      },
      {
        prompt:
          "Bir boyutta hız v(t) = −6 + 2t m/s, zaman saniye ve 0 ≤ t ≤ 5. Hangi açık aralıkta sürat azalır?",
        correct: "0 < t < 3 s",
        distractors: [
          "3 < t < 5 s",
          "0 < t < 5 s boyunca",
          "Hiçbir aralıkta",
          "Yalnız t = 5 s anında",
        ],
        hint: "Pozitif ivmeyle negatif hız zıt işaretlidir.",
        explanation:
          "a = +2 m/s². İlk 3 s v < 0 iken sürat azalır; 3 s sonrası v > 0 olduğunda sürat artar. Tek an bir açık aralık değildir.",
      },
    ],
  },
  {
    id: "sabit-ivmeli-hareket-grafikleri",
    topic: "detail-363",
    title: "Hareket grafikleri: eğimi ve alanı birlikte oku",
    minutes: 90,
    source:
      "MEBİ AYT Fizik Konu Özetleri, basılı s. 38–44; OGM sabit ivmeli hareket I–III özetleri ve Dersler Cepte; Aurelia TYT Fizik 003 grafik anlatımıyla karşılaştırılmış özgün öğretim. Sayısal örnekler ve sorular özgündür.",
    objectives: [
      "x–t teğeti, v–t eğimi ve a–t alanının fiziksel niceliğini birimleriyle ayır.",
      "Negatif hız alanını, toplam yolu ve başlangıç verisinin belirlenemeyen kısmını göster.",
      "İki parçada sabit ivmeli hareketin sürekli x ve v grafiklerini birlikte kur.",
    ],
    sections: [
      {
        title: "Grafiğin yüksekliği, eğimi ve alanı başka şeylerdir",
        paragraphs: [
          "Konum–zaman grafiğinin yüksekliği x değeridir; anlık hız, o noktadaki teğetin Δx/Δt eğimidir. Hız–zaman grafiğinin yüksekliği v, eğimi Δv/Δt = a ve işaretli alanı Δx olur. İvme–zaman grafiğinin yüksekliği a, işaretli alanı Δv verir. Her ilişkide eksen adını ve birimini yazmak, şekli yanlış formülle eşleştirmeyi önler.",
          "Grafiğin sayfada dik görünmesi tek başına büyük fiziksel hız veya ivme kanıtı değildir. Yatay ve düşey birimler ile ölçekler farklı olabilir; ekranı daraltınca eğrinin görünür açısı değişse de Δx/Δt sonucu değişmez. Doğru eğimi gerçek iki koordinat farkıyla veya verilmiş fonksiyonun türeviyle bul. x–t alanını, bu temel hareket yorumunda doğrudan yol sanma.",
        ],
      },
      {
        title: "Konum grafiğinde teğet ile sekantı ayır",
        paragraphs: [
          "Bir aralıktaki iki x–t noktasını birleştiren sekantın eğimi ortalama hızdır: [x(t2) − x(t1)]/(t2 − t1). Bir andaki teğet eğimi ise o andaki hızı verir. Sabit ivmede x(t) ikinci dereceden olabilir; aynı aralığın başı ve sonunda farklı teğetler görülür. a = 0 ise x–t doğrusal, v–t yatay olur.",
          "x(t) = 3 − 4t + t² örneğinde v(t) = −4 + 2t ve a = 2’dir. İlk anda konum +3 m iken hız −4 m/s olabilir; konumun işaretini eğimle karıştırma. t = 2 s’de teğet yatay ve v = 0’dır, fakat a hâlâ +2 m/s²’dir. Eğrinin yatay teğeti “bütün kuvvetler sıfır” veya “cisim hep duruyor” sonucunu vermez.",
        ],
      },
      {
        title: "Hız grafiğinin altında kalan alan işaretlidir",
        paragraphs: [
          "Hız grafiği eksenin üstündeyken vΔt alanı pozitif, altındayken negatiftir. Bir zaman aralığındaki toplam işaretli alan yer değiştirmedir; pozitif ve negatif parçalar birbirini götürebilir. Sabit ivmede trapez veya üçgen alanları kullanılır. Bir doğru zaman eksenini kesiyorsa kesme anını bul ve alanı orada ikiye ayır.",
          "v(t) = 6 − 2t, 1 ≤ t ≤ 5 s için uç hızlar +4 ve −4 m/s, sıfır t = 3 s’dir. İlk alan +4 m, ikinci alan −4 m; toplam yer değiştirme sıfırdır. Buna rağmen cisim 4 m gidip 4 m dönmüş, toplam 8 m yol almıştır. Grafiğin son hızını toplam yol veya toplam yer değiştirme sanma; tek nokta geçmişin alanını vermez.",
        ],
      },
      {
        title: "Sürat grafiği negatif parçayı yukarı katlar",
        paragraphs: [
          "Sürat–zaman grafiği |v(t)| olduğundan düşey eksende negatif değer yoktur. Hız negatifken sürat grafiği onun zaman eksenine göre yansımasıdır. Hız sıfırını geçen sabit ivmeli harekette sürat grafiğinde V biçimli bir köşe olabilir; bu, ivmenin aniden işaret değiştirdiği anlamına gelmez. Sürat türevi, hızın negatif ve pozitif taraflarında farklı işaret taşıyabilir.",
          "Yol, hız grafiğindeki alanların mutlak toplamı veya sürat grafiğinin alanıdır. Ortalama hız için işaretli alanı süreye, ortalama sürat için pozitif toplam yolu süreye böl. Aynı başlangıç ve son konum, aynı süre içinde çok farklı yollarla oluşabilir. Bu modelde renklendirilen negatif hız alanı, eksi bir yol değil geri yöndeki yer değiştirme katkısıdır.",
        ],
      },
      {
        title: "İvme alanı son hızı başlangıçtan taşır",
        paragraphs: [
          "Sabit bir a seviyesinin t2 − t1 süresince alanı a(t2 − t1) = Δv olur. Parça parça sabit ivmede her dikdörtgenin işaretli alanları toplanır. Bu alan tek başına vson değildir; vson = vilk + Δv gerekir. Aynı a–t grafiğine sahip iki cisim farklı ilk hızlarla bambaşka hız yönlerine sahip olabilir.",
          "Örneğin +2 m/s² ivme 3 s sürdüğünde iki cisim de +6 m/s hız değişimi kazanır. İlk hızı −8 olanın son hızı −2 m/s ve sürati daha küçük, ilk hızı +1 olanın son hızı +7 m/s ve sürati daha büyüktür. Dolayısıyla pozitif ivme alanını “ikisi de pozitif yönde hızlanır” diye okuma. Başlangıç hızının yokluğunda yalnız hız değişimi belirlenebilir.",
        ],
      },
      {
        title: "İvme basamaklanınca hız kopmaz",
        paragraphs: [
          "Birinci aralıkta a1, ikinci aralıkta a2 sabitse geçiş anındaki x ve v, ikinci parçanın ilk konumu ve ilk hızıdır. İvme bir basamakla sıçrayabilir; sonlu bir ivme sıçraması tek başına hızda anlık sıçrama üretmez. v–t grafiği sürekli kırık doğru, x–t grafiği teğeti ortak iki parabol parçası olur.",
          "Atölye, bütün sürecin tek sabit ivme olduğunu iddia etmez: iki ayrı sabit ivmeli evreyi birleştirir. Geçiş aralığın içindeyse seçili geçiş anında a2 gösterilir; son anda ikinci evreye hiç süre kalmamışsa a1 son etkin ivmedir. Bu gösterim kuralı x ve v’nin sürekliliğini etkilemez; sıfır uzunluklu evreye sahte alan eklenmez. Grafikte ivme basamağı eğriyle yumuşatılmaz.",
        ],
      },
      {
        title: "Başlangıç verisinin hangi paneli değiştirdiğini dene",
        paragraphs: [
          "x0’a sabit bir miktar eklemek bütün x–t grafiğini düşey öteleyebilir; hız ve ivme grafikleri değişmez. v0’ı değiştirmek v–t grafiğini düşey öteler, x–t eğimlerini ve dönme anlarını değiştirir; a–t aynı kalabilir. Bu iki kontrollü değişiklik, konum, hız ve ivmenin aynı niceliğin farklı adları olmadığını gösterir.",
          "Yalnız v–t grafiği verilmişse bir aralığın yer değiştirmesi ve yolu bulunabilir; mutlak son konum için o aralığın ilk konumu gerekir. Yalnız a–t grafiğinden hız değişimi hesaplanır; ilk hız yoksa yön, yol ve son hız genel olarak belirlenemez. Sorunun vermediği x0 veya v0 değerini sessizce sıfır seçme. Etkileşimli örneklerde ilk koşullar görünürdür; bunlar kullanıcı konum ölçümü veya gerçek yol verisi değildir.",
        ],
      },
      {
        title: "Bir aralığı kırılma ve hız sıfırlarında böl",
        paragraphs: [
          "İki evreli harekette seçilen [t1, t2] aralığı geçiş anını kapsıyorsa önce o anda böl. Her parçada hız sıfırını ayrıca kontrol et; negatif ve pozitif hız alanlarını ayrı bul. Böylece toplam Δx = Apozitif + Anegatif, yol L = Apozitif − Anegatif olur; burada Anegatif ≤ 0’dır. İşaretli alanın birimi m/s · s = m’dir.",
          "Aralık uçları aynıysa alanlar, yol ve hız değişimi sıfır olur; ortalamalar süre sıfır olduğundan tanımsızdır. Aralık sonunu başlangıçtan önce seçmek farklı bir yönlü integral sorusudur; bu öğretim modelinde zaman uçları 0 ≤ t1 ≤ t2 ≤ T olacak biçimde seçilir. Gösterilen alan poligonları gerçek doğrusal v değerlerinden kurulur, ekrandaki rastgele bir dikdörtgenle sonuç taklit edilmez.",
        ],
      },
      {
        title: "Üç grafiği birbiriyle çapraz kontrol et",
        paragraphs: [
          "Her x–t yatay teğetinin aynı andaki v–t sıfırına karşılık geldiğini denetle. Her v–t doğru parçasının eğimi a–t seviyesine uymalı; v grafiğinin alanı da x uçları farkını vermelidir. Birinci parçanın son değerlerini ikinci parçada kullanmazsan bu üçlü kontrol kopmayı yakalar. Son değeri bulmak kadar hangi bilgiyle bulunduğunu açıklamak da önemlidir.",
          "İnteraktif zaman imlecini ortak tut: aynı t için üç paneldeki seçili değerler aynı hareketi anlatır. Görselde yer değiştirme ile hız farklı ölçek ve birimler taşır; çizgi uzunluğundan nicelikleri birbirine eşitleme. Bir alanı seçip önce yönlü yer değiştirmeyi, sonra yolu tahmin et; farklı cevaplar aynı grafikte neden birlikte doğrudur? Gerekçeni sonucu gördükten sonra birim ve sıfır geçişiyle yeniden kontrol et.",
        ],
      },
    ],
    examples: [
      {
        title: "Parabolün teğeti ve dönüşü",
        prompt:
          "x(t) = 3 − 4t + t² metre; t saniye ve 0 ≤ t ≤ 5. Son hız, dönme anı, yer değiştirme ve yol?",
        strategy: "Fonksiyondan v’yi çıkar, yolu dönüşte ayır.",
        steps: [
          {
            label: "Teğet",
            expression: "v = −4 + 2t; a = 2; v(5) = 6 m/s",
            explanation: "Hız x grafiğinin yüksekliği değil eğimidir.",
          },
          {
            label: "Dönüş",
            expression: "t* = 2 s; x(0) = 3; x(2) = −1; x(5) = 8 m",
            explanation: "Konum minimumu yatay teğetle aynı andadır.",
          },
          {
            label: "Alan ve yol",
            expression: "Δx = 8 − 3 = 5 m; L = 4 + 9 = 13 m",
            explanation: "Ortalama hız 1 m/s, ortalama sürat 2,6 m/s olur.",
          },
        ],
        answer: "Son hız 6 m/s, dönüş 2 s, yer değiştirme 5 m, yol 13 m.",
        check: "v–t alanı −4 m ve +9 m olarak aynı toplamı verir.",
        pitfall: "Parabolün altındaki alanı yol sanmak.",
      },
      {
        title: "Pozitif ve negatif iki üçgen",
        prompt:
          "v(t) = 6 − 2t m/s, yalnız 1 ≤ t ≤ 5 s aralığı veriliyor. Yer değiştirme, yol ve x(5) bulunabilir mi?",
        strategy: "Hız sıfırında iki işaretli alan oluştur.",
        steps: [
          {
            label: "Uçlar",
            expression: "v(1) = 4; v(3) = 0; v(5) = −4 m/s",
            explanation: "Sıfır aralığın içindedir.",
          },
          {
            label: "Alanlar",
            expression: "A+ = 2 · 4/2 = 4 m; A− = −2 · 4/2 = −4 m",
            explanation: "Δx = 0; toplam yol 8 m olur.",
          },
          {
            label: "Eksik veri",
            expression: "x(5) = x(1) + 0",
            explanation: "İlk konum verilmediğinden mutlak x(5) belirlenemez.",
          },
        ],
        answer: "Yer değiştirme 0 m, yol 8 m; mutlak x(5) belirlenemez.",
        check: "Toplam süre 4 s; ortalama hız 0, ortalama sürat 2 m/s’dir.",
        pitfall: "Verilmediği hâlde x(1) = 0 kabul etmek.",
      },
      {
        title: "İki ivme, tek sürekli hareket",
        prompt:
          "x0 = 10 m ve v0 = −1 m/s. 0–2 s boyunca a1 = +2 m/s², 2–5 s boyunca a2 = −1 m/s². Son konum, son hız, yer değiştirme ve yol?",
        strategy:
          "İlk son değerleri ikinci başlangıç yap; ilk parçadaki dönüşü unutma.",
        steps: [
          {
            label: "Birinci evre",
            expression: "v(2) = 3 m/s; Δx1 = −2 + 4 = 2 m",
            explanation: "İlk dönüş 0,5 s’dedir; x burada 9,75 m olur.",
          },
          {
            label: "İkinci evre",
            expression: "v(5) = 0; Δx2 = 3 · 3 − 9/2 = 4,5 m",
            explanation: "İkinci evre ilk hız 3 m/s ile başlar.",
          },
          {
            label: "Toplam",
            expression:
              "Δx = 6,5 m; x(5) = 16,5 m; L = 0,25 + 2,25 + 4,5 = 7 m",
            explanation: "a–t alanı 4 − 3 = +1 m/s, son hız −1 + 1 = 0’dır.",
          },
        ],
        answer: "x(5) = 16,5 m; v(5) = 0; yer değiştirme 6,5 m; yol 7 m.",
        check: "İlk parçanın hız değişimi +4, ikinci parçanınki −3 m/s’dir.",
        pitfall: "İkinci evrede ilk hızı tekrar −1 almak.",
      },
      {
        title: "Aynı ivme grafiği, farklı hareket",
        prompt:
          "A ve B cisimleri ilk 3 s boyunca a = +2 m/s² ile hareket ediyor. İlk hızlar A için −8, B için +1 m/s. Son hızlar, sürat değişimleri ve yer değiştirmeler?",
        strategy: "Ortak Δv’yi bul, her başlangıç hızını ayrı taşı.",
        steps: [
          {
            label: "Ortak alan",
            expression: "ΔvA = ΔvB = 2 · 3 = 6 m/s",
            explanation: "Aynı ivme grafiğinin belirlediği ortak bilgi budur.",
          },
          {
            label: "Hızlar",
            expression: "vA = −2; vB = +7 m/s",
            explanation:
              "A’nın sürati 8’den 2’ye iner; B’ninki 1’den 7’ye çıkar.",
          },
          {
            label: "Konum farkları",
            expression: "ΔxA = −8 · 3 + 9 = −15 m; ΔxB = 1 · 3 + 9 = 12 m",
            explanation:
              "Ortak ivme alanı ortak yer değiştirme demek değildir.",
          },
        ],
        answer:
          "A: −2 m/s ve −15 m; B: +7 m/s ve +12 m. A yavaşlar, B hızlanır.",
        check: "İki cisim de +6 m/s hız değişimi kazanmıştır.",
        pitfall:
          "Pozitif ivmeyi her iki cismin süratinin artması diye yorumlamak.",
      },
    ],
    recall: [
      {
        prompt: "x–t teğetinin eğimi hangi niceliktir?",
        answer: "Anlık hızdır; hız değişimi veya ivme değildir.",
      },
      {
        prompt: "Hız grafiğinin negatif alanı ne demektir?",
        answer:
          "Seçilen negatif yöndeki yer değiştirme katkısıdır; yol hesabında mutlak değeri alınır.",
      },
      {
        prompt: "Yalnız a–t grafiği verildiyse son hız kesin bulunur mu?",
        answer: "İlk hız da gerekir; alan tek başına yalnız Δv verir.",
      },
      {
        prompt: "Sonlu ivme sıçramasında hangi grafikler süreklidir?",
        answer:
          "Konum ve hız süreklidir; v eğimi ve x eğriliği değişebilir, ivme basamaklanabilir.",
      },
    ],
    questions: [
      {
        prompt:
          "Bir boyutta x(t) = 3 − 4t + t² metre, t saniye. t = 3 s anındaki anlık hız kaç m/s?",
        correct: "2 m/s",
        distractors: ["0 m/s", "6 m/s", "−2 m/s", "3 m/s"],
        hint: "Konum fonksiyonunun teğet eğimini bul.",
        explanation:
          "v(t) = −4 + 2t; v(3) = 2 m/s. x(3) = 0 m olması hızın sıfır olduğunu göstermez.",
      },
      {
        prompt:
          "Bir cismin hızı 1 ≤ t ≤ 5 s aralığında v(t) = 6 − 2t m/s. Bu aralıkta yer değiştirme ve yol?",
        correct: "0 m ve 8 m",
        distractors: ["0 m ve 0 m", "8 m ve 8 m", "−8 m ve 8 m", "4 m ve 4 m"],
        hint: "t = 3 s sıfırında alanı ayır.",
        explanation:
          "1–3 s alanı +4 m, 3–5 s alanı −4 m. İşaretli toplam 0 m; mutlak toplam 8 m.",
      },
      {
        prompt:
          "Bir cismin a–t grafiği 0–3 s arasında +2 m/s² seviyesinde yataydır. İlk hız verilmemiştir. Kesin belirlenebilen hangisidir?",
        correct: "Hız değişimi +6 m/s",
        distractors: [
          "Son hız +6 m/s",
          "Yer değiştirme +9 m",
          "Sürat mutlaka artar",
          "Hareket yönü pozitiftir",
        ],
        hint: "İvme alanı Δv verir; ilk hız ayrı bilgidir.",
        explanation:
          "Δv = 2 · 3 = +6 m/s. v0 bilinmeden son hız, yön, yol veya sürat değişimi kesinleşmez.",
      },
      {
        prompt:
          "Bir boyutta x0 = 10 m, v0 = −1 m/s. 0–2 s a = +2 m/s², 2–5 s a = −1 m/s². t = 5 s anında konum?",
        correct: "16,5 m",
        distractors: ["6,5 m", "10 m", "7 m", "22 m"],
        hint: "İkinci evrenin ilk hızı v(2) = 3 m/s olmalıdır.",
        explanation:
          "İlk yer değiştirme 2 m; ikinci 3 · 3 − 9/2 = 4,5 m. x(5) = 10 + 2 + 4,5 = 16,5 m.",
      },
      {
        prompt:
          "Bir boyutta x0 = 10 m, v0 = −1 m/s. İlk 2 s a = +2 m/s², sonraki 3 s a = −1 m/s². İlk 5 s içinde toplam yol?",
        correct: "7 m",
        distractors: ["6,5 m", "16,5 m", "0,5 m", "9 m"],
        hint: "İlk evredeki 0,5 s hız sıfırını hesaba kat.",
        explanation:
          "İlk 0,5 s geriye 0,25 m; sonra 2 s anına kadar ileri 2,25 m; ikinci evre ileri 4,5 m. Yol 7 m.",
      },
      {
        prompt:
          "İki harekette xB(t) = xA(t) + 20 m eşitliği her t için geçerlidir. Türevlendirilebilir bu hareketler için ne kesin doğrudur?",
        correct: "Hızları ve ivmeleri aynıdır",
        distractors: [
          "Konumları aynıdır",
          "B’nin hızı 20 m/s daha büyüktür",
          "B’nin ivmesi 20 m/s² daha büyüktür",
          "B’nin aldığı yol her aralıkta 20 m fazladır",
        ],
        hint: "Sabit konum farkının zaman türevi sıfırdır.",
        explanation:
          "Konum grafiği sabit ötelenmiştir. vB = vA ve aB = aA; aynı zaman aralıklarında yollar da eşittir.",
      },
      {
        prompt:
          "Hız grafiği 2–6 s aralığında doğrusal olarak −4 m/s’den +4 m/s’ye yükseliyor. Bu aralıktaki ivme kaç m/s²?",
        correct: "+2 m/s²",
        distractors: ["−2 m/s²", "+1 m/s²", "0 m/s²", "+8 m/s²"],
        hint: "Eğimde hız farkını zaman farkına böl.",
        explanation:
          "a = [4 − (−4)]/(6 − 2) = 8/4 = +2 m/s². İlk hızın negatif olması ivmeyi negatif yapmaz.",
      },
      {
        prompt:
          "Sürekli bir cismin ivmesi t = 2 s’de sonlu +2 m/s² seviyesinden −1 m/s² seviyesine aniden geçiyor. Bu anda ideal parçalı modelde ne doğrudur?",
        correct: "Konum ve hız süreklidir; hız grafiğinin eğimi değişir",
        distractors: [
          "Hız aniden 3 m/s azalır",
          "Konum grafiği kopar",
          "İvme sürekli olmak zorundadır",
          "Hız zorunlu olarak sıfırdır",
        ],
        hint: "Sonlu ivmenin sıfır sürede alanı sıfırdır.",
        explanation:
          "Sonlu ivme sıçraması impuls değildir; hızda anlık atlama oluşturmaz. x ve v süreklidir, v eğimi değişir.",
      },
      {
        prompt:
          "Yalnız 1 ≤ t ≤ 5 s için v(t) = 6 − 2t m/s veriliyor. x(1) bilinmiyor. Hangisi bulunamaz?",
        correct: "Mutlak x(5) konumu",
        distractors: [
          "1–5 s yer değiştirmesi",
          "1–5 s alınan yol",
          "t = 3 s hızı",
          "1–5 s ortalama hız",
        ],
        hint: "Hız alanına bir ilk konum eklemek gerekir.",
        explanation:
          "Hız fonksiyonu alanı ve yolu verir, fakat x(5) = x(1) + Δx olduğundan x(1) olmadan mutlak son konum bulunmaz.",
      },
      {
        prompt:
          "A ve B ilk 3 s sabit +2 m/s² ivmeli. vA(0) = −8 m/s, vB(0) = +1 m/s. Bu aralıkta sürat değişimi için doğru yorum?",
        correct: "A’nın sürati azalır, B’ninki artar",
        distractors: [
          "İkisinin sürati de artar",
          "İkisinin sürati de azalır",
          "A’nınki artar, B’ninki azalır",
          "İkisinin sürati sabittir",
        ],
        hint: "Ortak ivme alanını her ilk hıza ayrı ekle.",
        explanation:
          "vA(3) = −2 ve vB(3) = +7 m/s. A bu aralıkta hız sıfırına gelmez; sürati 8’den 2’ye düşer, B’ninki 1’den 7’ye çıkar.",
      },
    ],
  },
];

export const forge016PhysicsTopics: Record<string, string> = Object.fromEntries(
  packs.map((p) => [p.id, p.topic]),
);
export const forge016PhysicsGuides: LessonGuide[] = packs.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
  source: p.source,
}));
export const forge016PhysicsLessons: Lesson[] = packs.map((p) => ({
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
      id: `${p.id}-016-${i + 1}`,
      prompt: txt(q.prompt),
      options: raw.map((_, j) => txt(raw[(j - answer + 5) % 5])),
      answer,
      hint: txt(q.hint),
      explanation: txt(q.explanation),
      skill: p.id,
    };
  }),
}));

export type SlidingState016 = "rest" | "up" | "down";
export type InclineInput016 = {
  mass: number;
  gravity: number;
  angle: number;
  force: number;
  muStatic: number;
  muKinetic: number;
  motion: SlidingState016;
};
function finite016(...values: number[]) {
  if (!values.every(Number.isFinite)) throw new RangeError("PHYSICS016_FINITE");
}
function coefficients016(muStatic: number, muKinetic: number) {
  finite016(muStatic, muKinetic);
  if (muKinetic < 0 || muStatic < muKinetic)
    throw new RangeError("PHYSICS016_COEFFICIENTS");
}
const unsignedZero016 = (n: number) => (Object.is(n, -0) ? 0 : n);
export function inclineModel016(input: InclineInput016) {
  const { mass, gravity, angle, force, muStatic, muKinetic, motion } = input;
  finite016(mass, gravity, angle, force);
  coefficients016(muStatic, muKinetic);
  if (mass <= 0 || gravity <= 0 || angle < 0 || angle > 90)
    throw new RangeError("PHYSICS016_INCLINE_SCOPE");
  if (!["rest", "up", "down"].includes(motion))
    throw new RangeError("PHYSICS016_MOTION");
  const radians = (angle * Math.PI) / 180,
    sin = angle === 90 ? 1 : Math.sin(radians),
    cos = angle === 90 ? 0 : Math.cos(radians),
    weight = mass * gravity,
    normal = weight * cos,
    gravityAlong = -weight * sin,
    driving = force + gravityAlong,
    staticLimit = muStatic * normal,
    kineticMagnitude = muKinetic * normal;
  finite016(
    weight,
    normal,
    gravityAlong,
    driving,
    staticLimit,
    kineticMagnitude,
  );
  const staticEquilibrium =
    motion === "rest" && Math.abs(driving) <= staticLimit;
  const tendency =
    motion === "rest" ? Math.sign(driving) : motion === "up" ? 1 : -1;
  const friction = unsignedZero016(
      staticEquilibrium ? -driving : -tendency * kineticMagnitude,
    ),
    net = unsignedZero016(driving + friction),
    acceleration = net / mass;
  finite016(friction, net, acceleration);
  return {
    weight,
    normal,
    gravityAlong,
    driving,
    staticLimit,
    kineticMagnitude,
    friction,
    net,
    acceleration,
    regime: staticEquilibrium ? ("static" as const) : ("kinetic" as const),
    slidingDirection: staticEquilibrium ? 0 : tendency,
  };
}
export function fixedPulleyModel016(
  tableMass: number,
  hangingMass: number,
  gravity: number,
  muStatic: number,
  muKinetic: number,
) {
  finite016(tableMass, hangingMass, gravity);
  coefficients016(muStatic, muKinetic);
  if (tableMass <= 0 || hangingMass <= 0 || gravity <= 0)
    throw new RangeError("PHYSICS016_PULLEY_SCOPE");
  const normal = tableMass * gravity,
    hangingWeight = hangingMass * gravity,
    staticLimit = muStatic * normal,
    kineticMagnitude = muKinetic * normal,
    totalMass = tableMass + hangingMass;
  finite016(normal, hangingWeight, staticLimit, kineticMagnitude, totalMass);
  const staticEquilibrium = hangingWeight <= staticLimit,
    friction = staticEquilibrium ? hangingWeight : kineticMagnitude,
    acceleration = staticEquilibrium
      ? 0
      : (hangingWeight - friction) / totalMass,
    tension = staticEquilibrium
      ? hangingWeight
      : hangingMass * (gravity - acceleration);
  finite016(friction, acceleration, tension);
  return {
    normal,
    hangingWeight,
    staticLimit,
    friction,
    acceleration,
    tension,
    regime: staticEquilibrium ? ("static" as const) : ("kinetic" as const),
  };
}
export type MotionInput016 = {
  x0: number;
  v0: number;
  acceleration: number;
  duration: number;
  time: number;
};
function stateAt016(
  x0: number,
  v0: number,
  acceleration: number,
  time: number,
) {
  const displacement = v0 * time + (acceleration * time * time) / 2,
    position = x0 + displacement,
    velocity = unsignedZero016(v0 + acceleration * time);
  finite016(displacement, position, velocity);
  return { displacement: unsignedZero016(displacement), position, velocity };
}
function pathLength016(v0: number, acceleration: number, time: number) {
  const delta = v0 * time + (acceleration * time * time) / 2,
    turn = acceleration === 0 ? null : -v0 / acceleration;
  let distance = Math.abs(delta);
  if (turn !== null && turn > 0 && turn < time) {
    const first = v0 * turn + (acceleration * turn * turn) / 2;
    distance = Math.abs(first) + Math.abs(delta - first);
  }
  finite016(distance);
  return distance;
}
export function constantMotion016(input: MotionInput016) {
  const { x0, v0, acceleration, duration, time } = input;
  finite016(x0, v0, acceleration, duration, time);
  if (duration < 0 || time < 0 || time > duration)
    throw new RangeError("PHYSICS016_TIME");
  const current = stateAt016(x0, v0, acceleration, time),
    end = stateAt016(x0, v0, acceleration, duration),
    candidate = acceleration === 0 ? null : -v0 / acceleration,
    turningTime =
      candidate !== null && candidate >= 0 && candidate <= duration
        ? unsignedZero016(candidate)
        : null,
    extrema = [x0, end.position];
  if (turningTime !== null)
    extrema.push(stateAt016(x0, v0, acceleration, turningTime).position);
  const distance = pathLength016(v0, acceleration, time),
    averageVelocity = time > 0 ? current.displacement / time : null,
    averageSpeed = time > 0 ? distance / time : null;
  finite016(
    ...extrema,
    ...[averageVelocity, averageSpeed].filter((v): v is number => v !== null),
  );
  return {
    ...current,
    speed: Math.abs(current.velocity),
    distance,
    turningTime,
    minimumPosition: Math.min(...extrema),
    maximumPosition: Math.max(...extrema),
    finalPosition: end.position,
    finalVelocity: end.velocity,
    averageVelocity,
    averageSpeed,
  };
}
export type TwoStageInput016 = {
  x0: number;
  v0: number;
  a1: number;
  a2: number;
  switchTime: number;
  duration: number;
  time: number;
  from: number;
  to: number;
};
export type StageSegment016 = {
  start: number;
  end: number;
  position: number;
  velocity: number;
  acceleration: number;
};
export function twoStageModel016(input: TwoStageInput016) {
  const { x0, v0, a1, a2, switchTime, duration, time, from, to } = input;
  finite016(x0, v0, a1, a2, switchTime, duration, time, from, to);
  if (
    duration <= 0 ||
    switchTime < 0 ||
    switchTime > duration ||
    time < 0 ||
    time > duration ||
    from < 0 ||
    from > to ||
    to > duration
  )
    throw new RangeError("PHYSICS016_STAGE_TIME");
  const boundary = stateAt016(x0, v0, a1, switchTime),
    segments: StageSegment016[] = [
      {
        start: 0,
        end: switchTime,
        position: x0,
        velocity: v0,
        acceleration: a1,
      },
      {
        start: switchTime,
        end: duration,
        position: boundary.position,
        velocity: boundary.velocity,
        acceleration: a2,
      },
    ];
  const at = (t: number) => {
    const segment =
      t < switchTime || (switchTime === duration && duration > 0)
        ? segments[0]
        : segments[1];
    const local = stateAt016(
      segment.position,
      segment.velocity,
      segment.acceleration,
      t - segment.start,
    );
    return {
      time: t,
      position: local.position,
      velocity: local.velocity,
      acceleration: segment.acceleration,
    };
  };
  const areaPieces: {
    start: number;
    end: number;
    vStart: number;
    vEnd: number;
    area: number;
  }[] = [];
  let positiveArea = 0,
    negativeArea = 0;
  const turningTimes: number[] = [],
    positions = [x0, boundary.position, at(duration).position];
  for (const segment of segments) {
    if (segment.end <= segment.start) continue;
    const turn =
      segment.acceleration === 0
        ? null
        : segment.start - segment.velocity / segment.acceleration;
    if (turn !== null && turn > segment.start && turn < segment.end) {
      turningTimes.push(turn);
      positions.push(
        stateAt016(
          segment.position,
          segment.velocity,
          segment.acceleration,
          turn - segment.start,
        ).position,
      );
    }
    const start = Math.max(from, segment.start),
      end = Math.min(to, segment.end);
    if (end <= start) continue;
    const cuts = [
      start,
      ...(turn !== null && turn > start && turn < end ? [turn] : []),
      end,
    ];
    for (let i = 0; i < cuts.length - 1; i++) {
      const lo = cuts[i],
        hi = cuts[i + 1],
        vStart = stateAt016(
          segment.position,
          segment.velocity,
          segment.acceleration,
          lo - segment.start,
        ).velocity,
        vEnd = stateAt016(
          segment.position,
          segment.velocity,
          segment.acceleration,
          hi - segment.start,
        ).velocity,
        area = ((vStart + vEnd) / 2) * (hi - lo);
      finite016(area);
      positiveArea += Math.max(0, area);
      negativeArea += Math.min(0, area);
      areaPieces.push({ start: lo, end: hi, vStart, vEnd, area });
    }
  }
  const current = at(time),
    end = at(duration),
    startInterval = at(from),
    endInterval = at(to),
    displacement = unsignedZero016(positiveArea + negativeArea),
    distance = positiveArea - negativeArea,
    deltaVelocity = endInterval.velocity - startInterval.velocity,
    averageVelocity = to > from ? displacement / (to - from) : null,
    averageSpeed = to > from ? distance / (to - from) : null;
  finite016(
    ...positions,
    positiveArea,
    negativeArea,
    displacement,
    distance,
    deltaVelocity,
    ...[averageVelocity, averageSpeed].filter((v): v is number => v !== null),
  );
  return {
    current,
    end,
    boundary,
    segments,
    turningTimes,
    areaPieces,
    minimumPosition: Math.min(...positions),
    maximumPosition: Math.max(...positions),
    interval: {
      from,
      to,
      positiveArea,
      negativeArea,
      displacement,
      distance,
      deltaVelocity,
      averageVelocity,
      averageSpeed,
    },
  };
}
