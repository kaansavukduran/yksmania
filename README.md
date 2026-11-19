# YKSMania 0.24.0 alpha — güncel durum (19 Kasım 2026)

**Web:** [GitHub Pages](https://kaansavukduran.github.io/yksmania/) 19 Kasım 14:28 UTC'de `fd4201a` kaynağından otomatik yayımlandı (aynı kaynakta tam CI yeşil). Masaüstü 0.24 sürüm etiketi yok; Android deneme APK'sı `main` üzerinde Actions ile üretilir. Uygulama eski görünürse **Ayarlar → Güncelleme** ya da sayfayı yenile: çevrimdışı önbellek yeni sürümü güncellemeyle alır.

- **İçerik (uygulamadan sayılan):** 505 hazır konu anlatımı, 6.465 özgün soru. Bölüm figürleri 594 (620 bölüm), soru tipi taktiği 86; figürlü sayısal rehber 82/371 (sözel figürler ayrıca). Kopya kâğıtlarından işlenen 53 / 517; okunan Drive PDF 63 / 8.981 (%0,70). Figürlerdeki seçilebilir öğelere (ör. inkılap olayları) tıklayınca ayrıntı kartı açılır. Her soruda 1–10 tahmini zorluk yıldızı (ders içi eşit dilim) ve Sınavlar'da yıldıza göre alıştırma var. Kupalar (34) özgün SVG amblemli ve bronz/gümüş/altın/platin metalli; doğru, seri, yanlış, onarım, 21. gün mührü ve kupa sesleri cihazda sentezlenir (Ayarlar'dan açılır, ses seviyesi ayarlanır). Birleşik Forge planı: [docs/FORGE_MASTER_PLAN.md](docs/FORGE_MASTER_PLAN.md). Drive kopya kâğıtlarından işlenenler ve sayılar [docs/ISLEME_SAYACI.md](docs/ISLEME_SAYACI.md)'dedir; tüm MEB/OGM/MEBİ PDF'leri ve 20 yıllık ÖSYM arşivi henüz tamamlanmadı.
- **Görsel kalite:** Figür kiti etiketlerin piksel kutusunu dikeyde de hesaplar (çerçeve dışı etiket 0); eksen sayıları içerik etiketine çarparsa gizlenir. Otomatik yazı çakışma denetimi her yeni figürde 0 bulguyla geçer.
- **Faz 1 teknik:** Giriş paketi 5,11 MB → 0,22 MB (içerik ayrı parçalarda, en büyük 3,09 MB; çevrimdışı önbellek sınırı 5 MiB). Karalama kâğıdı kapatınca korunur, Geri al ve ince/kalın kalem; şık kısayolları ve seçim çipleri sağlamlaştırıldı; yer haritaları eşit panelli, fare tekerleği ve sürüklemeyle yakınlaşır.
- **Doğrulama (bu dal):** `npm run check` ve 2.684 birim testi geçer; değişen akışların tarayıcı testleri yerelde geçti, tam tarayıcı seti GitHub CI'da koşar. Ayrıntılı tur kaydı [FORGE.md](FORGE.md).

---

## 18 Kasım adayı (tarihsel kayıt)

18 Kasım 2026, Türkiye saati. **Bu aday henüz yayımlanmadı.** Son doğrulanmış web/masaüstü sürümü aşağıdaki 0.23.0’dır. Yeni adayın yerel birleşim, çevrimdışı model ve web güncellemesi kontrolleri geçti; tam uzak CI ve yayın kabulleri bekliyor.

Mutlak değer ve üslü sayılar 68 açıklama bölümü, 85 çözümlü örnek, 48 hatırlama, 110 gerekçeli özgün soru, 28 ayrı özet bölümü ve 18 etkileşimli modelle genişledi. Ayrıca asıl OGM sorularının altılı seti, kaynak düzeni/şekilleri ve seçenekleriyle çalışılabilir; uygulama için hazırlanmış görsel ipucu ve çözümler ayrı etiketlenir. Kaynaklarda saptanan hata veya belirsizlikler puanlı doğru diye aktarılmaz.

Kaynak okuyucusunda 46 alıştırma/çözümlü örnek kaydı bulunur; bunlar 46 benzersiz sınav sorusu veya yeni puanlı kart demek değildir. Eski 24 kaydın indeksleri korunur. Okuma, cevap gösterme ve görsel keşif öğrenme puanı üretmez. Source012’de ayrıca belirlenen sekiz istem bu adayın dışında, sonraki özel hazırlıktadır; bütün arşivin asıl soru/şekil aktarımı hâlâ açıktır.

Matrix yeni ve tema ayarı olmayan profillerin varsayılanıdır; bilinçli kaydedilmiş farklı temalar korunur. Tarih olayları ve yeni modellerin küçük seçim grupları görünür düğmelerle seçilir. Ayrı Kopya Kağıtları ekranındaki 19 geometri özeti hesapla üretilen şekillerle çalışır; dik üçgenin çerçevesi gösterilen adıma göre büyür. Yeni iki ünitenin görseli ilk yönlendirilmiş öğrenme adımında da görünür. Dar ekran/büyük yazı, klavye, not ve çevrimdışı kayıtlar yerel hedef akışlarda sınandı.

Son yerel C2 birleşiminde 223 dosyadaki **2.032 birim testi** geçti. Önceki C1 birleşiminde 111 ilgili tarayıcı testi geçti; diğer 620 ürün girdisi aynı kalırken ilk adım için eklenen iki kimlik, C2’de iki yeni normal giriş/çevrimdışı/puansız keşif testiyle sınandı. C2’nin yerel alt dizin ve gerçek paketli Linux akışlarında **114’er model ile ayrıca altı asıl OGM sorusu** çalıştı. Gerçek 0.23→0.24 yerel web güncellemesinde üç ham veri deposu korundu ve etkinleşme otomatik ilerleme yazmadı. Bunlar tam uzak E2E, Windows, yayımlanmış dosya veya fiziksel telefon kabulü değildir. İlk başarısız denemeler ve kapsam sınırları [aday kaydında](docs/FORGE038039.md) tutulur.

Gerçek yapısal toplam 536 set, 501 anlatım rehberi, 501 ayrı özet, 500 çalışma başlığı ve 6.417 sorudur: 6.411 özgün öğretim sorusu + 6 asıl OGM sorusu. 3.777 soruda tam kademeli yardım, 2.640 eski kartta kısmi yardım bulunur. İlk 479 Excel kimliği/sırası ve önceki 6.301 soru korunur. Bunlar PDF ya da resmî müfredat tamamlanma sayıları değildir.

Kanonik öğretim aktarımı **8.981 PDF’de 7 tam, 2 kısmi, 8.972 belirsiz** olarak kaldı. Yeni iki kaynağın veya asıl soru sadakatinin kapanışı yapılmadı. [Aday kapsamı ve doğrulama sınırları](docs/FORGE038039.md) · [Gerçek yapısal envanter](docs/CONTENT_INVENTORY.csv).

---

## Aşağıdaki 0.23.0 kaydı kendi doğrulanmış yayınına aittir

# YKSMania 0.23.0

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması. **0.23.0 yayımlandı — 18 Kasım 2026, Türkiye saati.**

[Web uygulaması](https://kaansavukduran.github.io/yksmania/) · [Windows/Linux indir](https://github.com/kaansavukduran/yksmania/releases/tag/v0.23.0-alpha.1) · [Kişisel Android deneme paketi](https://github.com/kaansavukduran/yksmania/actions/runs/44195736233/artifacts/14378249327)

Birinci dereceden denklemler ve basit eşitsizlikler **57 açıklama bölümü, 60 çözümlü örnek, 40 hatırlama, 87 özgün soru ve 435 seçenek gerekçesiyle** genişledi. Değerleri değiştirerek eşitliğin iki tarafını, parantez/payda koşullarını, aralıkları, negatif işlemleri, bütçe ve kâr modellerini inceleyebilirsin. **14 etkileşimli modelin şekli ve sonucu aynı hesaplardan gelir.** Kopya Kağıtları ayrı menüdedir; 22 yeni özet bölümü içerir. Öğrenci PDF veya kaynak kataloğu yüklemez.

Toplam **533 set, 499 anlatım rehberi, 499 ayrı özet, 498 çalışma başlığı ve 6.301 özgün soru** vardır. 3.661 soruda tam kademeli yardım hazır; 2.640 eski kartın bütün yardım aşamaları henüz tamamlanmadı. Bunlar PDF veya resmî müfredat başlığı sayıları değildir. Önceki 531 set, 6.214 soru, 497 rehber/özet, 496 çalışma başlığı ve ilk 479 Excel kimliği/sırası korunur. [Konu envanteri](docs/CONTENT_INVENTORY.csv) ölçüleri ayrı gösterir.

[Aynı kaynaklı tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/44195707384) **1.977 birim ve 1.285 tarayıcı testini** geçti; paketli Windows/Linux’ta 112’şer çevrimdışı model akışı başarılıdır. [Otomatik Pages](https://github.com/kaansavukduran/yksmania/actions/runs/44200061070) gerçek yayındaki 112 akışı geçti; yayının 301 dosyası / 28.243.429 baytı normal TLS ile eşleşti. Gerçek yayımlanan AppImage ayrıca indirilip değiştirilmemiş binary’siyle bu Linux VM’de 112 akışı, notları ve aynı profilde süreç yeniden açılışını geçti. 301 normal web dosyası / 28.243.619 bayt sabit derlemeyle aynıdır. [Kapsam, gerçek kabuller ve sınırlar](docs/FORGE036037.md).

Android için **YKSMania Deneme 0.23.0-test / kod 33** hazırdır: 19.391.282 bayt, ayrı `com.fragaria.yksmania.test`, otomatik test imzası. Gerçek APK’nin v2 imzası, paket/sürümü ve 301 çevrimdışı dosyası doğrulandı. Actions ZIP’ini GitHub hesabınla indirip açarak APK’yı telefona kurabilirsin. **Önceki Deneme kurulumun varsa önce ilerlemeni yedekle.** Test sertifikası 0.22’den farklıdır; Android güncellemeyi reddederse yedeğini doğruladıktan sonra yalnız eski Deneme uygulamasını kaldırıp yenisini kur ve yedeği geri yükle. Kaldırma yerel ilerlemeyi siler; ana YKSMania’yı kaldırma. Fiziksel telefonda kurulum/ilk açılış henüz denenmedi. Secret istenmez; genel APK veya mağaza yayını yapılmadı.

0.23’ün başlangıç teması mevcut koyu temadır; Matrix ayarlardan seçilebilir. Mevcut/Matrix temaları, Lexend, ortak kum saati, anlatımın altındaki notlar ve kişisel yedek/geri yükleme korunur. Yeni/ayarlanmamış profilin değiştirilebilir kişisel hedefi 28 Şubat 2027’dir; bilinçli kaydedilmiş farklı tarihler korunur, bu resmî sınav tarihi değildir. İlk öğrenme günü 1, tekrarlar 3/7/21’dir. Bugün tamamlanan çalışmayı ve son gerçek soru oturumunun doğru/yanlış sayısını gösterir. Keşif, süre ve manuel onay ustalık veya XP üretmez. Yerleşik öğretim çevrimdışı, dış videolar/resmî bağlantılar internetle çalışır.

**Kanonik öğretim aktarımı: 8.981 PDF’de 7 tam, 2 kısmi, 8.972 belirsiz.** Denklem ve eşitsizlik kaynaklarının kapanışı gerçek korumalı işlem ve bağımsız salt okunur geri okumayla doğrulandı. Bu yedi sertifika öğretim maddeleri, örnek/çözümler ve uygulama eşlemeleri için doğrulanmış kapanışlardır. Kaynaktaki bütün soruların asıl metin, seçenek ve şekilleriyle birebir yerleşik aktarımının tamamlandığı anlamına gelmez; bu ayrı sadakat denetimi ve geliştirme ölçüsüdür, toplu tamamlanma sayısı henüz çıkarılmadı. Belirsiz, hiç işlenmemiş demek değildir. [Güncel kaynak raporu](docs/PDF_SOURCE_PROGRESS036037.md).

Yayın kaynağı `2bbddcf6de7fb1d0dafd03bd6e8f94e88c4579d0`. Vercel’in son doğrulanmış durumu hesap sınırı nedeniyle HTTP 402’dir; kullanılabilir web yayını GitHub Pages’tir. Temiz OS kurulumu, Windows portable taşıma ve kurulu native sürümler arasında yükseltme ayrıca sınanacaktır. Bütün MEB/OGM/MEBİ bilgileri ve yirmi yıllık ÖSYM arşivi henüz tamamlanmadı.

---

## Aşağıdaki 0.22 ve eski kayıtlar kendi tarihsel yayınlarına aittir

# YKSMania

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması.

[Web uygulaması](https://kaansavukduran.github.io/yksmania/) · [Windows/Linux indir](https://github.com/kaansavukduran/yksmania/releases/tag/v0.22.0-alpha.1) · [Kişisel Android deneme paketi](https://github.com/kaansavukduran/yksmania/actions/runs/44146818660/artifacts/14355659976)

**0.22.0 yayımlandı.** EBOB–EKOK ve rasyonel sayılar; toplam 55 açıklama bölümü, 44 çözümlü örnek, 35 hatırlama, 94 gerekçeli özgün soru, 14 etkileşimli model ve ayrı özetlerle genişledi. Sayıları ve koşulları değiştirerek ortak bölen/kat, zaman çizelgesi, yerleşim, kesir, sayı doğrusu, işlem ve devirli ondalık modellerini inceleyebilirsin. Şekil ve sonuç aynı hesaplardan gelir. Her yeni soruda adım adım çözüm, beş şıkkın gerekçesi ve sık hatalar bulunur; öğrenci PDF veya katalog yüklemez.

Toplam **531 set, 497 anlatım rehberi, 497 ayrı kopya kağıdı, 496 çalışma başlığı ve 6.214 özgün soru** vardır. 3.574 soruda tam kademeli yardım hazır; 2.640 eski kartın tüm yardım aşamaları henüz tamamlanmadı. Bu sayılar birbirinden ve PDF sayımından farklıdır. Eski 6.120 soru, ilk 479 Excel kimliği/sırası ve kişisel kayıtlar korunur.

**PDF arşivi: 8.981 dosya: 5 tam, 4 kısmi, 8.972 belirsiz.** Belirsiz, hiç işlenmemiş demek değildir. [Güncel kaynak raporu](docs/PDF_SOURCE_PROGRESS034035.md), [konu envanteri](docs/CONTENT_INVENTORY.csv) ve [geometri kapsamı](docs/GEOMETRY_SCOPE.md) farklı ölçüleri açıklar. Arşivin ve bütün MEB/OGM/MEBİ/ÖSYM içeriğinin tamamlandığı iddia edilmez.

[Tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/44152986079), 212 dosyada 1.939 birim testini geçti; dört shard’da 1.277 tarayıcı testi ve gerçek paketli Windows/Linux işleri başarılıdır. Her masaüstü platformunda 110 çevrimdışı model akışı sınandı. [Otomatik Pages](https://github.com/kaansavukduran/yksmania/actions/runs/44158312379) aynı kaynakta yayımlanan uygulamanın 110 farklı çevrimdışı model akışını, soru geri bildirimini, notları ve reload ile kayıt korunumunu geçti; renderer ve eksik istek hatası yoktur. Yayındaki 297 dosya / 27.970.391 byte normal TLS doğrulamasıyla sabit alt dizin derlemesine birebir eşleşti.

[Masaüstü yayınının](https://github.com/kaansavukduran/yksmania/releases/tag/v0.22.0-alpha.1) kaynak etiketi, beş manifest girdisi ve GitHub dosya özetleri eşleşti. Altı yayın varlığı içinde genel APK yoktur. Gerçek AppImage ayrıca indirilip kendi değişmemiş binary’siyle bu Linux VM’de 110 çevrimdışı akış, notlar, taslaklar, Bugün sonucu ve aynı profilde süreç yeniden açılışından geçti; 297 web dosyası sabit normal derlemeye eşleşti. Temiz OS kurulumu, portable taşıma ve iki kurulu native sürüm arasında yükseltme ayrıca sınanacaktır. Vercel’in son doğrulanan durumu hesap sınırı nedeniyle HTTP 402’dir; kullanılabilir web yayını GitHub Pages’tir.

Android için **YKSMania Deneme 0.22.0-test / kod 32** hazırdır: 19.305.624 byte, ayrı `com.fragaria.yksmania.test`, otomatik test imzası. Gerçek APK’nin paket/etiket/sürümü, v2 imzası ve 297 çevrimdışı web dosyası doğrulandı. Actions ZIP’ini GitHub hesabınla indirip açarak APK’yı telefona kurabilirsin. APK kaynağı `bbb681d` ile yayın kaynağı arasındaki fark yalnız dokuz E2E test dosyasıdır; 584 uygulama girdisi aynıdır. Kullanıcıdan secret istenmez; genel APK/mağaza yayını yapılmadı. Fiziksel telefonda kurulum/ilk açılış henüz denenmedi. Önceki deneme sürümünün sertifikası farklıdır; Android güncellemeyi reddederse yalnız Deneme uygulamasını kaldırmadan önce kişisel ilerlemeni yedekle.

Yerleşik öğretim, sorular ve kişisel kayıtlar çevrimdışı çalışır; dış videolar ve resmî kitapçık bağlantıları internet ister. Mevcut/Matrix temaları, Lexend, ortak kum saati, anlatımın altındaki notlar ve kişisel yedek/geri yükleme vardır. Yeni/ayarlanmamış profillerin değiştirilebilir kişisel hedefi 28 Şubat 2027’dir; kayıtlı farklı hedefler korunur, bu resmî sınav tarihi değildir. İlk çalışma günü 1, tekrarlar 3/7/21’dir. Bugün, tamamlanan çalışmayı ve son gerçek soru oturumunun doğru/yanlış sayısını gösterir. Süre, keşif, manuel onay ve belge/video açma ustalık veya XP üretmez.

Yayın kaynağı `5bdc4a15123666b3dc701a802f7f6be7000a383a`. [Kapsam, gerçek testler ve kalan işler](docs/FORGE034035.md) · [QA](docs/QA.md). Aşağıdaki 0.21 sayımları ve bağlantıları kendi tarihsel sürümüne aittir.

---

## Yayımlanmış 0.21.0 ve önceki devir

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması.

[Web uygulamasını aç](https://kaansavukduran.github.io/yksmania/) · [Windows/Linux indir](https://github.com/kaansavukduran/yksmania/releases/tag/v0.21.0-alpha.1) · [Kişisel Android deneme paketi](https://github.com/kaansavukduran/yksmania/actions/runs/44082360745/artifacts/14328077495)

**0.21.0 yayımlandı:** 495 anlatım rehberi, 495 ayrı kopya kağıdı ve 6.120 özgün soru. 3.480 soruda tam kademeli yardım hazır; 2.640 eski kartın bütün yardım aşamaları henüz tamamlanmadı. 529 ders/soru seti ile 494 çalışma başlığı farklı sayımlardır. İlk 479 başlığın kimliği ve Excel sırası korunur.

Faktöriyel ünitesi 20 açıklama bölümü, 16 adım adım örnek, 12 hatırlama ve 43 açıklamalı beş seçenekli soruyla genişledi. Altı etkileşimde çarpımı kur, ortak çarpanları sadeleştir, asal çarpan bütçelerini ve sondaki sıfırları incele, sıralama kısıtlarını değiştir. Şekil ve sayılar aynı hesaplardan gelir. Sekiz bölümlü kısa kopya kağıdı ayrı menüden açılır. Her soruda bilgi, yöntem, çözüm adımları, her şıkkın gerekçesi, sık hata ve sonuç denetimi bulunur. Öğrenci PDF veya kaynak kataloğu yüklemez.

**Arşiv tamamlanmış değildir.** 17 Kasım 2026 taramasında 8.981 PDF bulundu; güncel sürümler için kanıtlanan durum **3 tam, 6 kısmi, 8.972 belirsiz**. Belirsiz, hiç işlenmemiş demek değildir. Son 45 yeni dosyanın yalnız metaverisi kaydedildi; okuma veya tamamlama sayılmadı. [PDF ilerlemesi](docs/PDF_SOURCE_PROGRESS033.md), [geometri kapsamı](docs/GEOMETRY_SCOPE.md) ve [konu CSV’si](docs/CONTENT_INVENTORY.csv) farklı ölçüleri açıklar.

TYT 120 soru/165 dakika, AYT Sayısal 80 soru/180 dakika ve 15 branş pratiği vardır. Net = doğru − yanlış/4. Yeni veya hedefi ayarlanmamış profillerin değiştirilebilir kişisel hazırlık hedefi 28 Şubat 2027’dir; kayıtlı farklı tarihler korunur. Bu resmî sınav tarihi değildir. İlk çalışma günü 1, tekrarlar 3/7/21’dir. Bugün, tamamlanan çalışmayı ve son gerçek doğru/yanlış sayısını gösterir.

Mevcut ve Matrix temaları, Lexend, ortak kum saati, anlatımın altındaki notlar, kişisel yedek/geri yükleme ve onaylı sıfırlama vardır. Eski yanıtlar, tercihler, notlar, yarım çalışmalar, denemeler ve özgün tekrar tarihleri korunur. Süre, görsel keşif, kağıt/video açma veya manuel onay bağımsız doğru, ustalık veya XP sayılmaz. Yerleşik öğretim ve kişisel kayıtlar çevrimdışı çalışır. Dış videolar ve resmî kitapçık bağlantıları internet ister; bütün videoların güncel erişimi ve oynatılması doğrulanmadı.

[Tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/44086453423) 1.907 birim ve 1.269 tarayıcı testini geçti; başarısız, atlanmış veya flaky tarayıcı vakası yoktur. Gerçek paketli Windows/Linux 108’er çevrimdışı model akışını geçti. [Masaüstü yayınının](https://github.com/kaansavukduran/yksmania/releases/tag/v0.21.0-alpha.1) kaynak/etiket ve dosya özetleri eşleşti. Gerçek yayımlanan AppImage ayrıca indirilip bu Linux VM’de kendi binary’siyle 108 akış, aynı profil yeniden açılışı ve altı normal dış bağlantı etkinleştirmesinden geçti. Bağlantı testinde yalnız OS tarayıcısına devretme çağrısı kaydedildi; haricî video oynatımı veya fiziksel tarayıcı kabulü değildir. 0.20.0’ın dış bağlantı kusuru kendi eski indirmelerinde tarihsel olarak kalır.

**Pages doğrulandı:** [aynı kaynaklı otomatik işin ikinci denemesi](https://github.com/kaansavukduran/yksmania/actions/runs/44091144353/attempts/2), yayımlanan 0.21 üzerinde 108 farklı çevrimdışı model akışını, soru geri bildirimini, notları ve reload ile kayıt korunumunu geçti; renderer ve eksik istek hatası yoktur. Önceden başarılı build/deploy adımları tekrar çalıştırılmadı. [Süre sınırı ve adım kayıtları eklenmiş ayrı doğrulama](https://github.com/kaansavukduran/yksmania/actions/runs/44120954459) da aynı 108 akışı geçti. Bu ayrı dalın üretim girdileri yayın kaynağı `197dc1b` ile aynıdır; yeniden dağıtım ve TLS atlatma yapılmadı. İlk otomatik deneme sonuç üretmeyince iptal edilmişti; iptal geçmişi korunur, takılmanın gerçek nedeni bilinmiyor.

Yayındaki 293 dosyanın tamamı normal TLS doğrulamasıyla sabit alt dizin derlemesine eşleşti. Bu dosya kabulü tarayıcının bütün öğrenme akışlarını geçtiği anlamına gelmez. Vercel’in son doğrulanan durumu hesap sınırı nedeniyle HTTP 402’dir. Vercel, Pages ve APK ayrı yerel ilerleme tutar.

Android için **YKSMania Deneme 0.21.0-test** hazırdır. [Actions paketini](https://github.com/kaansavukduran/yksmania/actions/runs/44082360745/artifacts/14328077495) GitHub hesabınla indir, ZIP’i aç ve APK’yı telefonda kur. Otomatik test imzalı, ayrı `com.fragaria.yksmania.test` uygulamasıdır; kalıcı imza veya secret ayarı istemez. APK’nin yapısı, imzası ve 293 çevrimdışı web dosyası doğrulandı. Fiziksel telefonda kurulum/ilk açılış henüz denenmedi; genel Release’e APK eklenmedi. Önceki test APK’sının imzası farklıdır; Android güncellemeyi reddederse test uygulamasını kaldırmadan önce kişisel ilerlemeni yedekle.

Saatlik bulut Forge görevi aynı kaynak kuyruğu ve kayıt defterinden devam eder. Aktif tur varken ikinci üretici başlatılmaz; bilgisayarın açık kalması gerekmez. Her çalışmanın gerçek sonucu ayrıca kaydedilir. Sıradaki EBOB–EKOK paketi özel içerik denetiminden geçti; henüz uygulamaya eklenmiş veya tamamlanmış PDF sayılmadı.

Node 24 ile `npm ci`, ardından `npm run dev`. Kontroller: `npm run check`, `npm test`, `npm run build`, `npm run test:e2e`, `npm run test:desktop`. Sayısal envanter `node scripts/export-content-inventory.mjs` ile üretilir. Mevcut önizlemeyi sınarken açık `BASE_URL` kullan; test sunucusu dolu porta sessizce bağlanmaz.

[Kapsam](docs/CONTENT_COVERAGE.md) · [Konu envanteri](docs/CONTENT_INVENTORY.csv) · [QA](docs/QA.md) · [Forge033](docs/FORGE033.md) · [Devir geçmişi](FORGE.md)
