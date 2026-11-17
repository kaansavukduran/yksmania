# YKSMania

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması.

[GitHub Pages](https://kaansavukduran.github.io/yksmania/) · [Son doğrulanmış Windows/Linux indirmeleri: 0.19.0](https://github.com/kaansavukduran/yksmania/releases/tag/v0.19.0-alpha.1) · [Vercel](https://yksmania.vercel.app)

**Geliştirme adayı 0.20.0:** 494 ayrıntılı anlatım, 494 ayrı kopya kağıdı ve 6.077 özgün soru. 3.437 soruda tam kademeli yardım hazır; 2.640 eski kartta bütün yardım aşamaları henüz tamamlanmadı. 528 ders/soru seti ve 493 çalışma başlığı farklı sayımlardır. İlk 479 başlığın kimliği ve sırası korunur. Bu sayılar bütün MEB alt kazanımlarının veya PDF arşivinin tamamlandığını göstermez.

Sekiz yeni ünite çokgenler, dörtgen aileleri, yamuk–deltoid, paralelkenar ailesi, dik prizmalar, piramitler, kaynakla açı pekiştirme ve asal sayılardır. Yeni pakette 88 anlatım bölümü, 46 çözümlü örnek, 44 hatırlama ve 134 gerekçeli beş seçenekli soru vardır. Çokgenin kenar sayısını, cismin ölçülerini ve kesitini değiştirdikçe şekil ve hesaplar birlikte değişir. 1–50 asal eleğini adım adım çalıştır; bölenleri ve çarpan dikdörtgenlerini incele. Bilgi, yöntem, ayrı çözüm adımları, her şıkkın gerekçesi ve sonuç denetimi ayrı açılır. Kopya kağıtları ayrı bölümdedir; öğrenci PDF veya kaynak kataloğu yüklemez.

**Arşiv tamamlanmış değildir.** 17 Kasım 2026 canlı taramasında 8.936 PDF bulundu. Güncel kaynak sürümlerine ilişkin doğrulanmış kayıt 2 tam, 7 kısmi ve 8.927 belirsizdir. Belirsiz, hiç işlenmemiş demek değildir. Okunan sayfa ve uygulamada bütün bilgileri öğretilen PDF farklı ölçülerdir. [Kaynak ilerlemesi](docs/PDF_SOURCE_PROGRESS032.md), [geometri kapsamı](docs/GEOMETRY_SCOPE.md) ve [konu CSV’si](docs/CONTENT_INVENTORY.csv) bu ayrımları açıklar.

TYT 120 soru/165 dakika, AYT Sayısal 80 soru/180 dakika ve 15 branş pratiği vardır. Öğrenme ve simülasyon ayrıdır; net = doğru − yanlış/4. Yeni veya hedefi ayarlanmamış profillerin değiştirilebilir kişisel hazırlık hedefi 28 Şubat 2027’dir; kayıtlı farklı tarihler korunur. Bu resmî sınav tarihi değildir. İlk çalışma günü 1, tekrarlar 3/7/21’dir. Bugün, tamamlanan çalışmayı ve son gerçek doğru/yanlış sayısını gösterir.

Mevcut ve Matrix temaları, Lexend, ortak kum saati, anlatımın altındaki notlar, kişisel yedek/geri yükleme ve onaylı sıfırlama vardır. Eski yanıt, not, tercih, yarım çalışma, deneme ve özgün tekrar tarihi korunur. Süre, görsel keşif, kağıt/video açma veya manuel onay bağımsız doğru, ustalık veya XP sayılmaz. Konuya bağlı video önerileri internet gerektirir; bütün kataloğun güncel erişimi ve oynatılması doğrulanmadı. Uygulama içi öğretim ve kayıtlar çevrimdışı çalışır. Vercel ve Pages ayrı ilerleme tutar.

C3 hedef arayüz kabulleri, gerçek aynı kökenli 0.19 → 0.20 web güncellemesi, yerel Electron ve Pages alt dizininde 107’şer çevrimdışı model akışı geçti. Son C4 tam yerel turunda 205 dosyada 1.841/1.841 birim testi ve TypeScript geçti. Önceki turdaki tek zaman aşımı ile değiştirilmeden izole 4/4 geçen dosya tarihsel olarak QA’da korunur. Son içerik denetiminde bir çokgen çözüm adımındaki açı–kenar sırası düzeltildi. C3 başarıları bu düzeltmeden önceki kapsamdır; yeni normal/prefix C4 derlemeleri geçti. Son C4 derlemesinde sekiz hedef UI vakası da geçti. Tam uzak CI, son paketler ve yayın kabulü henüz bu kayıtta tamamlanmadı. [QA](docs/QA.md) ilk sonuçları ve sınırları ayrı kaydeder.

**Son doğrulanmış yayın 0.19.0’dır; 0.20 henüz yayımlanmadı.** Son doğrulanan Vercel durumu hesap kullanım sınırından HTTP 402’dir; mevcut erişim yeniden doğrulanmadan çalışıyor sayılmaz. Kullanıcının telefonunda deneyebilmesi için ayrı Android test APK’sı hazırlanıyor; kalıcı imza/secret kurulumu kullanıcıdan istenmiyor. APK henüz bu kayıtta kabul edilmedi. Fiziksel cihaz, temiz kurulum, portable taşıma ve native iki sürüm kurulumu ayrıca sınanacaktır.

Node 24 ile `npm ci`, ardından `npm run dev`. Geliştirici kontrolleri: `npm run check`, `npm test`, `npm run build`, `npm run test:e2e`, `npm run test:desktop`. Sayısal içerik envanteri `node scripts/export-content-inventory.mjs` ile yeniden üretilir. Mevcut önizlemeyi sınarken açık `BASE_URL` kullan; varsayılan test sunucusu dolu porta sessizce bağlanmaz.

[Kapsam](docs/CONTENT_COVERAGE.md) · [Konu envanteri](docs/CONTENT_INVENTORY.csv) · [Kaynak okuması](docs/SOURCE_REVIEW.md) · [QA](docs/QA.md) · [Forge032](docs/FORGE032.md) · [Devir geçmişi](FORGE.md)
