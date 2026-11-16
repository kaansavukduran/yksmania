# YKSMania

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması.

[Vercel](https://yksmania.vercel.app) · [GitHub Pages](https://kaansavukduran.github.io/yksmania/) · [Windows/Linux indirmeleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.18.2-alpha.1)

Güncel **0.18.2**: 480 yerleşik anlatım, 480 kopya kağıdı ve 5.883 özgün soru. 479 sıralı çalışma başlığının her birinde anlatım ve soru bağlantısı var. Ayrıntılı yardım 3.243 soruda hazır; 2.640 kartta bütün yardım aşamaları henüz tamamlanmadı. Bu sayı bütün Drive/MEB alt kazanımlarının veya bütün resmî sınav arşivinin tamamlandığı anlamına gelmez. Özellikle [geometri öğretimindeki açıklar](docs/GEOMETRY_SCOPE.md) önceliklidir.

Modelin koşullarını değiştir, öngörünü gerekçesiyle karşılaştır ve sorulara geç. Ayrıntılı yardımı hazır kartlarda bilgi → yöntem → tek tek adım → tam çözüm sırası ve her şık için ayrı gerekçe vardır. Bu tur 30 konudaki 300 mevcut karta 900 adım ve 1.500 seçenek gerekçesi eklendi; yeni soru veya model eklenmedi. Öğrenci PDF ya da ders kaynağı yüklemez. Konu Anlatımı, Kopya Kağıtları, Sorular ve Sınavlar ayrı bölümlerdir.

TYT 120 soru/165 dakika, AYT Sayısal 80 soru/180 dakika ve 15 branş pratiği vardır. Öğrenme ve simülasyon modları ayrıdır; net=doğru−yanlış/4. Varsayılan değiştirilebilir sınav 18 Haziran 2027, anlatım hedefi 28 Şubat 2027; ilk çalışma günü 1, tekrarlar 3/7/21. Bugün, tamamlanan çalışmayı ve son gerçek doğru/yanlış sayısını gösterir.

Ortak kum saati 1/5/10/20 dakika ve 1–120 dakika özel süre sunar. Notlar anlatımın altındadır. Kişisel ilerleme yedeği, geri yükleme ve onaylı sıfırlama vardır. Eski notlar, ayarlar ve belge baytları korunur; Vercel ve Pages ayrı ilerleme tutar. Süre, keşif, kağıt açma veya manuel onay bağımsız öğrenme puanı sayılmaz.

[Tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/43901085247) 1.743 birim/1.242 tarayıcı, gerçek paketli Windows/Linux; [Pages](https://github.com/kaansavukduran/yksmania/actions/runs/43911524726) prefix ve yayında 93’er akış ile geçti. Vercel’de aynı runtime üzerinde 17 hedef akış ve iki canlı kökende 25’er dosyanın normal TLS karşılaştırması yapıldı. Gerçek yayımlanan AppImage ayrıca indirilip hashlenerek bu VM’de çalıştırıldı. Kontrollü yerel 0.18.1→0.18.2 web güncellemesinde eski veriler korundu. Önceki başarısız kayıtlar ve kabul sınırları [QA](docs/QA.md) içindedir. Android imzası ertelendi; yeni APK yoktur. Fiziksel cihaz, temiz kurulum, portable taşıma ve native iki-sürüm kurulumu ayrıca sınanacaktır.

Node 24: npm ci, npm run dev. Geliştirici kontrolleri: npm run check, npm test, npm run build, npm run test:e2e, npm run test:desktop.

[Kapsam](docs/CONTENT_COVERAGE.md) · [Konu envanteri CSV](docs/CONTENT_INVENTORY.csv) · [Kaynak okuması](docs/SOURCE_REVIEW.md) · [QA](docs/QA.md) · [12 alanlı Forge raporu](FORGE.md) · [Sonraki iş](docs/ROADMAP.md)
