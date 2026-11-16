# YKSMania

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması.

[GitHub Pages](https://kaansavukduran.github.io/yksmania/) · [Vercel (hesap sınırı nedeniyle kapalı)](https://yksmania.vercel.app) · [Windows/Linux indirmeleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.19.0-alpha.1)

**0.19.0:** 486 yerleşik anlatım, 486 kopya kağıdı ve 5.943 özgün soru. Önceki 479 başlığın sırası korunur; altı yeni geometri temeli bağımsız kayıtlarla eklenir. Ayrıntılı yardım 3.303 soruda hazır; 2.640 kartın bütün yardım aşamaları henüz tamamlanmadı. Bu sayılar bütün Drive/MEB alt kazanımlarının veya bütün resmî soru arşivinin tamamlandığını göstermez. [Geometri kapsamı](docs/GEOMETRY_SCOPE.md) ve [PDF kaynak işleme kaydı](docs/PDF_SOURCE_PROGRESS.md) ayrı ölçüleri açıklar.

Altı yeni geometri ünitesi 48 bölüm, 20 çözümlü örnek, 26 hatırlama ve 60 gerekçeli soru sunar. Köşeyi sürükleyerek açı toplamını, karelerle Pisagor’u, benzerlikte alanı ve üçgenin dört merkezini keşfedebilirsin. Kısa kopya kağıtları ayrı bölümdedir. Yeni 60 soruda bilgi → yöntem → tek tek adım → tam çözüm ve her şık için ayrı gerekçe vardır. Öğrenci PDF ya da ders kaynağı yüklemez.

485 derse konu bazında önerilen ve alternatif videolar eklendi; 2.033 farklı kaynak URL’si vardır. Videolar internet gerektirir; uygulama içi anlatım ve sorular çevrimdışı çalışır. Video açmak öğrenme puanı oluşturmaz. Videoların bütün güncel erişilebilirliği ve oynatılması doğrulanmadı.

TYT 120 soru/165 dakika, AYT Sayısal 80 soru/180 dakika ve 15 branş pratiği vardır. Öğrenme ve simülasyon ayrıdır; net=doğru−yanlış/4. Yeni veya hedefi ayarlanmamış profillerin değiştirilebilir kişisel hazırlık hedefi 28 Şubat 2027’dir; kayıtlı farklı tarihler korunur. Bu resmî sınav tarihi değildir. İlk çalışma günü 1, tekrarlar 3/7/21. Bugün, tamamlanan çalışmayı ve son gerçek doğru/yanlış sayısını gösterir. Mevcut temaya Matrix seçeneği eklendi.

Ortak kum saati 1/5/10/20 dakika ve 1–120 dakika özel süre sunar. Notlar anlatımın altındadır. Kişisel ilerleme yedeği, geri yükleme ve onaylı sıfırlama vardır. Eski notlar, ayarlar ve belge baytları korunur; Vercel ve Pages ayrı ilerleme tutar. Süre, keşif, kağıt açma veya manuel onay bağımsız öğrenme puanı sayılmaz.

0.19.0 GitHub Pages ve Windows/Linux için yayımlandı. Vercel dağıtımı ve genel adresi hesap kullanım sınırı nedeniyle HTTP402 ile engelli. [Tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/43972235774): 1.786 birim/1.257 tarayıcı testi; paketli Windows/Linux 99’ar çevrimdışı akış PASS. Ayrıntılı kanıt ve sınırlar [QA](docs/QA.md) içindedir. Android imzası ertelendi; yeni APK yoktur. Fiziksel cihaz, temiz kurulum, portable taşıma ve native iki sürüm kurulumu ayrıca sınanacaktır.

Node 24: npm ci, npm run dev. Geliştirici kontrolleri: npm run check, npm test, npm run build, npm run test:e2e, npm run test:desktop. Var olan önizlemeyi test ederken BASE_URL belirt; varsayılan test sunucusu dolu porta sessizce bağlanmaz.

[Kapsam](docs/CONTENT_COVERAGE.md) · [Konu envanteri CSV](docs/CONTENT_INVENTORY.csv) · [Kaynak okuması](docs/SOURCE_REVIEW.md) · [QA](docs/QA.md) · [12 alanlı Forge raporu](FORGE.md) · [Sonraki iş](docs/ROADMAP.md)
