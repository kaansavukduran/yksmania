# YKSMania

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması.

[Vercel](https://yksmania.vercel.app) · [GitHub Pages](https://kaansavukduran.github.io/yksmania/) · [Doğrulanmış masaüstü indirmeleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1)

Güncel **0.18.1 kaynak adayı**: 480 ayrıntılı anlatım, 480 yerleşik kopya kağıdı ve 5.883 özgün soru. Doğrulanmış 479 başlığın tamamı anlatım ve bağımsız soruyla eşleşir. Ayrıntılı yardım 2.943 sorudadır; 2.940 kartın bütün aşamaları hazırlanacaktır. Bu başlık sayısı bütün Drive/MEB alt kazanımlarının veya bütün resmî sınav arşivinin tamamlandığı anlamına gelmez.

Modelin koşullarını değiştir, öngörünü gerekçesiyle karşılaştır ve sorulara geç. İpuçları bilgi → yöntem → tek tek adım → tam çözüm şeklinde açılır; her şık için ayrı gerekçe vardır. Son 200 eski karta 600 adım ve 1000 gerekçe eklendi. 31 paketin 62 yazılı hatırlama sorusu önceki yanıtlarıyla birlikte rehberin sonunda açılır. Öğrenci PDF veya ders kaynağı yüklemez. Konu Anlatımı, Kopya Kağıtları, Sorular ve Sınavlar ayrı bölümlerdir.

TYT 120 soru/165 dakika, AYT Sayısal 80 soru/180 dakika ve 15 branş pratiği bulunur. Öğrenme ve simülasyon modları ayrıdır; net=doğru−yanlış/4. Eski kâğıt, yanıt, işaret ve süreler korunur. Varsayılan değiştirilebilir sınav 18 Haziran 2027, anlatım hedefi 28 Şubat 2027; ilk çalışma günü 1, tekrarlar 3/7/21. Bugün, tamamlanan çalışmayı ve son gerçek doğru/yanlış sayısını gösterir.

Ortak kum saati 1/5/10/20 dakika ve 1–120 dakika özel süre sunar. Notlar anlatımın altındadır. Kişisel ilerleme yedeği, geri yükleme ve onaylı sıfırlama vardır. Eski notlar, ayarlar ve belge baytları korunur; Vercel ve Pages ayrı ilerleme tutar. Süre, keşif, kağıt açma veya manuel onay bağımsız öğrenme puanı sayılmaz.

1.663 birim testi ve hedeflenen 23 gerçek tarayıcı kontrolü geçti. Önceki tam 0.18 turundaki hatalar ve kabul sınırları [QA](docs/QA.md) kaydındadır. Bu adayın son tam CI/paket/yayın kapıları henüz kapanmadı; yukarıdaki indirme bağlantısı doğrulanmış 0.17 paketleridir. Android imzası ertelendi; yeni APK bu kapsama alınmadı. Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arasında yükseltme ayrıca sınanacaktır.

Node 24: `npm ci`, `npm run dev`. Kapılar: `npm run check`, `npm test`, `npm run build`, `npm run test:e2e`, `npm run test:desktop`.

[Kapsam](docs/CONTENT_COVERAGE.md) · [Kaynak okuması](docs/SOURCE_REVIEW.md) · [QA](docs/QA.md) · [Forge](FORGE.md) · [Çalışma sırası](docs/ROADMAP.md)
