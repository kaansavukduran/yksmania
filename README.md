# YKSMania

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
