# YKSMania

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması. **0.11.0 alpha**.

[Vercel uygulaması](https://yksmania.vercel.app) · [GitHub Pages](https://kaansavukduran.github.io/yksmania/) · [GitHub deposu](https://github.com/kaansavukduran/yksmania)

30 yeni kaynak başlığı işlendi: 274 bölüm, 123 çözümlü örnek, 136 hatırlama ve
300 açıklamalı soru. Toplam **116 anlatım, 88 ayrıntılı rehber, 116 kopya kağıdı
ve 800 özgün soru**. Doğrulanmış çalışma sırasındaki ilk **108/479** başlık hazır.
Tüm kaynak arşivi henüz tamamlanmadı; başlık listesi içerik tamamlanması sayılmaz.

GitHub Pages için proje alt yolu, manifest ve çevrimdışı önbellek desteği eklendi.
Pages dağıtımı başarılı ana CI koşusundan sonra aynı kaynakla çalışır. İki web
adresi ayrı kökenler olduğundan kayıtları kendiliğinden eşitlenmez. İlerleme
aktarımı için Ayarlar’daki kişisel yedeği kullanabilirsin.

Öğrenci PDF veya kaynak yüklemez. Kaynak PDF’leri geliştirici inceler; uygulama
özgün öğretim, etkileşimli model ve açıklamalı soruları hazır sunar. Yeni
konular soru ve branş çalışmalarıyla bağlantılıdır. Keşifler puan veya konu
bitirme kaydı oluşturmaz. Önceki 500 soru kaydı tüm alanlarıyla korunur.

Güncel kabul ve yayın durumu [FORGE](FORGE.md) ve [QA](docs/QA.md)’dedir.

## İçerik ve öğrenme

0.11.0, kaynak sırasındaki 79–108. başlıkları işler: 5 matematik,
4 fizik, 5 kimya, 10 biyoloji, 1 Türkçe ve 5 tarih ünitesi. Sayı, kesir, yaş,
yüzde ve kâr-zarar problemleri; basınç, kaldırma kuvveti ve dalgalar; bağlar,
etkileşimler ve hâl değişimleri; canlı grupları, mitoz, mayoz, eşeysiz üreme;
zarflar ve Osmanlı'nın değişim dönemleri için etkileşimli modeller vardır.
Model seçimleri, gerekçeler ve ders notları çevrimdışı korunur.

116 anlatımın 88’inde ayrıntılı rehber; 116 yerleşik kopya kağıdı ve
800 özgün soru bulunur. Kaynak sırasının ilk 108/479 başlığında anlatım hazırdır.
341 ana konu ile 479 ayrıntılı başlık farklı düzeylerdir. Bütün MEB/OGM/Drive
arşivinin dönüşümü tamamlanmış değildir; hazırlanmamış başlıklar hazır gösterilmez
ve kullanıcıdan eksik materyal sağlaması istenmez.

Önceki rehberlerde Türkçe ses/yapı, çarpanlara ayırma, geometri, Newton,
elektrik alan, mol, denge, türev, DNA ve ATP gibi başlıklar da vardır.
Rehberlerde **Adım adım çalış / Tüm anlatım** seçilebilir; çözümlü örnekler,
sık karıştırılan durumlar ve hatırlama çalışmaları anlatımı destekler.
Kaynakların gerçekten okunan sayfa sınırları [SOURCE_REVIEW](docs/SOURCE_REVIEW.md)’de.

Sorular kendi metin/verileriyle çözülebilir. Önceki 500 sorunun tüm kayıtları
korunur; 300 yeni, beş seçenekli ve açıklamalı özgün soru eklenir. Doğru/yanlış,
ipucu ve gerekçeli çözüm ayrıdır. Sekiz doğrulanmış ÖSYM bağlantısı,
uygulamada bağımsız öğretim örneği ve
özgün çözümle desteklenir; bu örnekler resmî soruların birebir aktarımı değildir.
Son 20 yıllık arşivin tamamı taranmış veya soru bankasına çevrilmiş değildir.

## Denemeler

TYT karma 105 soru, AYT Sayısal karma 25 soru ve 11 hazır branş çalışması.
Bunlar şu aşamada **kısa pratik** setleridir; 120/80 soruluk tam dağılımlı deneme
diye sunulmaz. Eksik branş kapsamı kartlarda belirtilir. Süre soru sayısına göre
TYT 120 soru/165 dk, AYT 80 soru/180 dk oranından hesaplanır. Kayıtlı mutlak son zaman,
cevap/boş/işaretler, gezinti ve açıklamalı sonuçlar çevrimdışı korunur.
Süre başka ekranda veya uygulama kapalıyken de geçer; kapanmış uygulamada sonuç
sonraki açılışta kaydedilir. Net=doğru−yanlış/4; deneme sonuçları ayrı saklanır.

Varsayılan düzen aynı soru setini tekrar edilebilir biçimde sunar; bu sürümde
rastgele yeni bir tam deneme üretildiği veya soruların sınırsız olduğu iddiası yok.

## Kayıt ve plan

Varsayılan sınav 18 Haziran 2027 (değiştirilebilir), anlatım hedefi 28 Şubat 2027.
Uygun günler ve tamamlanan konulara göre plan yeniden hesaplanır. Öğrenme günü 1,
tekrarlar 3/7/21. Bugün tamamlanan çalışmayı ve gerçek son soru sonucunu korur.
TYT/AYT ağaçları üstten dallanır; derslerin ayrı renk ve vektör simgeleri vardır.

Ortak kum saati 5 dk; 1/5/10/20 dk ve 1–120 dk özel süre, ters çevir/durdur/devam et.
Zaman, animasyon veya dosya varlığı ustalık kazandırmaz. Notlar anlatımın altında.
Ayarlar’da kişisel ilerleme JSON yedeği/geri yükleme ve onaylı ilerleme sıfırlama
bulunur. Sıfırlama notları, ayarları ve önceki kişisel dosyaları korur.

## Çalıştırma ve doğrulama

Node 24 gereklidir: `npm ci`, `npm run dev`. Kontroller:
`npm run check`, `npm test`, `npm run build`, `npm run test:e2e`, `npm run test:desktop`.
Yerel önizleme yalnız loopback’e bağlanır. Yerel, CI, canlı site ve gerçek paket
kanıtları [FORGE](FORGE.md) ve [QA](docs/QA.md)’dedir.

0.11.0 sürümünde 279 birim ve 204 tarayıcı testi, canlı Vercel’de 204 test,
Windows/Linux paketli çevrimdışı akışlar ve Android build/imza kontrolü geçti.
GitHub Pages’te yerel alt yol ve gerçek canlı URL kabulü; ayrı profilde
0.10.0→0.11.0 web güncellemesi de geçti. [Kurulum paketleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.11.0-alpha.1)
ve ayrıntılı kanıtlar kabul belgelerindedir.

Web ilk çevrimiçi hazırlıktan sonra, native paketler yerel arayüzle çalışır.
Veriler cihaz bazındadır. Windows Setup/Portable ve Linux AppImage/DEB x64;
Android APK debug imzalı alpha test paketidir. Fiziksel Android, temiz Windows
kurulumu/portable taşıma ve iki native paket arasında veri koruyan yükseltme
ayrıca doğrulanmalıdır. Önceki web yükseltme testi bunların yerine sayılmaz.
