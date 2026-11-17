> **0.23.0 geliştirme adayı — 18 Kasım 2026, henüz yayımlanmadı.** Birinci dereceden denklemler ve basit eşitsizliklere 57 anlatım bölümü, 60 çözümlü örnek, 87 gerekçeli soru, 14 etkileşimli model ve 22 ayrı özet bölümü eklendi. Adayda 533 set, 499 rehber/özet, 498 çalışma başlığı ve 6.301 soru var. Yerel öğrenme, çevrimdışı modeller ve gerçek 0.22→0.23 web güncellemesinde veri korunumu doğrulandı. Yeni kaynak commit’i, tam uzak CI, canlı yayın ve yeni APK kabulü bekliyor. [Kapsam ve ayrı test sonuçları](docs/FORGE036037.md).
>
> Kanonik PDF sayımı **8.981 dosya: 5 tam, 4 kısmi, 8.972 belirsiz** olarak değişmedi. Bu iki PDF hâlâ kısmi; aşağıdaki 0.22 yayınları ve APK bağlantıları kendi doğrulanmış sürümüne aittir.

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
