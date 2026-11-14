import { node as n, type NarrativePack } from "./types";
export const energyNarrative: NarrativePack = {
  id: "enerji-ve-hareket",
  topicId: "detail-118",
  subjectId: "tyt-fizik",
  title: "Enerji ve hareket: dönüşümü hesapla, sistemi seç",
  minutes: 40,
  source:
    "OGM Dersler Cepte 9. Sınıf İş, Enerji ve Güç – Mekanik Enerji – Enerjinin Korunumu ve Enerji Dönüşümleri – Verim – Enerji Kaynakları, PDF s.10–18. Sürtünme, sistem sınırı ve yenilenebilir kaynaklarla ilgili genellemeler koşullarıyla açıklanmıştır.",
  objectives: [
    "Bir kuvvetin işini net işten ayır.",
    "Kinetik, yerçekimi ve yay enerjisini kabulleriyle hesapla.",
    "Mekanik enerji azalmasıyla toplam enerji korunmasını birlikte açıkla.",
  ],
  body: [
    {
      title: "Yorulmak ile fiziksel iş aynı değildir",
      text: "Sabit kuvvetin yer değiştirme doğrultusundaki bileşeni iş yapar: W=F∥Δx; genel açılı gösterim W=FΔx cosθ’dır. İş skalerdir, fakat pozitif veya negatif olabilir. Yer değiştirmeye dik kuvvetin işi sıfırdır. Bir çantayı sabit yükseklikte yatay taşırken dikey taşıma kuvvetinin yatay yer değiştirmede yaptığı iş sıfır olabilir; bu, insanın biyolojik olarak enerji harcamadığı anlamına gelmez. Hangi kuvvetin, hangi cisme, hangi aralıkta iş yaptığı belirtilmelidir. Kuvvet–konum grafiğinin işaretli alanı ilgili kuvvetin işini verir; yalnız net kuvvet çizilmişse sonuç net iştir.",
    },
    {
      title: "Net iş kinetik enerjiyi değiştirir",
      text: "Dönmeden ötelenen bir cisim için klasik kinetik enerji K=mv²/2’dir. Kütle sabitken sürati iki katına çıkarmak kinetik enerjiyi dört katına çıkarır. Net iş Wnet=ΔK bağıntısıyla ilişkilidir; tek bir kuvvetin işini her durumda bütün enerji değişimi sanma. Negatif net iş kinetik enerjiyi azaltır. Bir başka kuvvet pozitif iş yapıyorsa sürtünmenin negatif işi bulunmasına rağmen cisim hızlanabilir. Kayan cisim ve durgun yüzeyin basit modelinde sürtünme mekanik enerjinin iç enerjiye dönüşmesine yol açar; bütün sürtünme türleri ve hareketli bantlar için aynı işaret koşulsuz kullanılmaz.",
    },
    {
      title: "Potansiyel enerji referans ve sistemle tanımlanır",
      text: "Yer yüzeyine yakın, g yaklaşık sabitken cisim–Dünya sisteminin yerçekimi potansiyel enerjisi U=mgh ile ifade edilir. h seçilen sıfır seviyesine göre yüksekliktir; sıfırın yeri değişince U’nun sayısı değişir, aynı iki nokta arasındaki ΔU değişmez. Cismin ağırlık merkezinin yüksekliği kullanılır. İdeal Hooke yayı için uzama veya sıkışmada Uy=kx²/2; geri çağırıcı kuvvet F=−kx’tir. Enerji hem uzamada hem sıkışmada pozitiftir, kuvvetin eksi işareti dengeye dönüş yönünü anlatır. Hooke modeli yayın esneklik sınırı dışında otomatik geçerli değildir.",
    },
    {
      title: "Mekanik enerji ne zaman korunur?",
      text: "Seçilen sistemde K+U mekanik enerjidir. Yalnız korunumlu kuvvetler etkiliyse ve sisteme dışarıdan mekanik enerji aktarımı yoksa mekanik enerji sabit kalır. ‘Sürtünme yok’ demek, başka bir motor veya dış kuvvet varken tek başına yeterli değildir. Yerden H yüksekliğinde durgun bırakılan ve hava direnci ihmal edilen cisim h yüksekliğine geldiğinde U=mgh, K=mg(H−h) olur. Aşağı indikçe U azalır, K artar; toplam mgH korunur. Modelde konumu seçip iki enerjinin aynı toplamı nasıl paylaştığını gör. Pozisyon sürgüsü gerçek zaman ölçümü değildir.",
    },
    {
      title: "Isıl aktarım olunca enerji yok olmaz",
      text: "Sürtünme veya direnç nedeniyle K+U azalabilir; cisim, yüzey ve çevreyi kapsayan uygun sistemde enerji iç enerji ve diğer biçimlere aktarılır. Kaybolan mekanik enerjiyi ‘yok olan enerji’ diye adlandırma. Açık bir sistemin enerjisi dışarıya aktarıldığı için azalabilir; toplam enerji korunumu doğru sistem sınırıyla yazılır. Özgün örnekte başlangıç 200 J, son potansiyel 100 J ve iç enerjiye aktarılan 20 J ise kinetik enerji 80 J’dir. 200=100+80+20 denetimi yapılır. Keşifteki aktarım payı seçilmiş muhasebe modelidir; gerçek sürtünme katsayısından türetilmiş deney sonucu değildir.",
    },
    {
      title: "Güç hızla, verim payla ilgilidir",
      text: "Ortalama güç aktarılan enerji veya yapılan işin süreye oranıdır: P=W/Δt. Aynı işi daha kısa sürede yapanın ortalama gücü büyüktür. Watt güç, joule enerji, kWh enerji birimidir; 1 kWh=3,6×10⁶ J. Verim yararlı çıktının girdi enerjisine oranıdır; payın hangi işlev için yararlı sayıldığı belirtilir. Gerçek bir düzende dönüşüm kayıpları bulunabilir; ideal hesapta %100 verim kabulü yapılabilir, %100’den büyük yararlı enerji üretimi bu basit modelde olmaz. Yenilenebilir kaynak, çevresel etkisiz veya her an kesintisiz demek değildir. Güneş, rüzgâr ve hidroelektrikte üretim koşulları ve ekosistem etkileri; fosil ve nükleerde kaynak, atık ve dönüşüm süreçleri birlikte değerlendirilir. Hidrojen çoğunlukla üretilen enerji taşıyıcısıdır; üretim yolu önemlidir.",
    },
  ],
  pitfalls: [
    {
      label: "Sürtünme yoksa her durumda K+U sabit denmez",
      reason:
        "Dışarıdan motorun veya başka kuvvetin aktardığı enerji varsa sistemin mekanik enerjisi değişebilir.",
    },
    {
      label: "Hız iki kat, enerji iki kat değildir",
      reason:
        "K=mv²/2 olduğundan aynı kütlede sürat iki katına çıkınca kinetik enerji dört katına çıkar.",
    },
    {
      label: "kWh güç birimi değildir",
      reason:
        "Güç ile zamanın çarpımı enerjidir. kW güç, kWh enerji miktarıdır.",
    },
  ],
  cases: [
    {
      name: "Serbest düşüşte paylaşım",
      question:
        "2 kg cisim 10 m’den durgun bırakılırsa 5 m’de enerjiler nedir?",
      conclusion:
        "g=10 m/s² ve direnç yok kabulüyle başlangıç 200 J. 5 m’de U=100 J, K=100 J; toplam 200 J korunur.",
      nodes: [
        n("Başlangıç", "U=2×10×10=200 J, K=0.", "energy"),
        n("Yükseklik yarıya", "h=5 m.", "number", "5"),
        n("U=100 J", "Referans yer seviyesi.", "energy"),
        n("K=100 J", "Azalan U, K’ye dönüşür.", "energy"),
      ],
    },
    {
      name: "Negatif iş",
      question: "Hareket yönüne ters net kuvvet enerjiyi nasıl etkiler?",
      conclusion:
        "Net kuvvetin işi negatifse ΔK negatiftir; kinetik enerji azalır. Bu, tek başına toplam enerjinin yok olması değildir.",
      nodes: [
        n("Yer değiştirme sağa", "Referans yönü seçildi.", "chart"),
        n("Net kuvvet sola", "Yer değiştirmeye zıt.", "chart"),
        n("Wnet < 0", "İşaretli çarpım negatiftir.", "number"),
        n(
          "ΔK < 0",
          "Sürat azalır; enerji aktarımı ayrıca incelenir.",
          "energy",
        ),
      ],
    },
    {
      name: "Girdi nereye gitti?",
      question:
        "200 J başlangıcın 20 J’si iç enerjiye aktarılmış, U=100 J ise K kaçtır?",
      conclusion:
        "200=U+K+Eaktarım eşitliğinden K=80 J. Mekanik enerji 180 J iken kapsamlı toplam 200 J’dür; iki toplam aynı şey değildir.",
      nodes: [
        n("Girdi 200 J", "Başlangıç enerji hesabı.", "energy"),
        n("U=100 J", "Konuma bağlı kalan pay.", "energy"),
        n("Aktarım 20 J", "İç enerjiye giden pay.", "energy"),
        n("K=80 J", "200−100−20.", "number", "80"),
      ],
    },
  ],
  recall: [
    {
      prompt:
        "Bir cisme etki eden tek bir kuvvetin işi neden her zaman ΔK değildir?",
      answer:
        "ΔK, bütün kuvvetlerin toplam net işine eşittir. Başka kuvvetler de pozitif veya negatif iş yapıyorsa tek kuvvetin işi farklı olur.",
    },
    {
      prompt:
        "Mekanik enerji 50 J azalınca toplam enerjinin korunması nasıl mümkün olur?",
      answer:
        "Enerji iç enerji veya başka biçimlere aktarılabilir ya da seçilen açık sistemden dışarı çıkabilir. Sistem sınırı genişletilerek aktarılan paylar hesaba katılır; enerji yok olmuş sayılmaz.",
    },
  ],
  modelLimit:
    "Enerji keşfi g=10 m/s², başlangıçta durgunluk ve sabit başlangıç yüksekliği kullanır. Aktarım payı varsayımsaldır; gerçek sürtünme veya düşme süresi simülasyonu değildir.",
};
