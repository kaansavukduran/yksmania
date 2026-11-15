# YKSMania

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması. **0.12.0 alpha adayı**. Canlı sürüm henüz 0.11.0’dır.

[Vercel uygulaması](https://yksmania.vercel.app) · [GitHub Pages](https://kaansavukduran.github.io/yksmania/) · [GitHub deposu](https://github.com/kaansavukduran/yksmania)

Sıradaki 30 kaynak başlığı işlendi: 263 bölüm, 123 çözümlü örnek, 128 hatırlama ve
300 açıklamalı soru; üç eski biyoloji konusunun soru açığı için 30 soru daha. Toplam **146 anlatım, 118 ayrıntılı rehber, 146 kopya kağıdı
ve 1.130 özgün soru**. Doğrulanmış çalışma sırasındaki ilk **138/479** başlık hazır.
Tüm kaynak arşivi henüz tamamlanmadı; başlık listesi içerik tamamlanması sayılmaz.

Vercel ve GitHub Pages için proje yolu, manifest ve çevrimdışı önbellek desteği vardır.
Pages dağıtımı başarılı ana CI koşusundan sonra aynı kaynakla çalışır. İki web
adresi ayrı kökenler olduğundan kayıtları kendiliğinden eşitlenmez. İlerleme
aktarımı için Ayarlar’daki kişisel yedeği kullanabilirsin.

Öğrenci PDF veya kaynak yüklemez. Kaynak PDF’leri geliştirici inceler; uygulama
özgün öğretim, etkileşimli model ve açıklamalı soruları hazır sunar. Yeni
konular soru ve branş çalışmalarıyla bağlantılıdır. Keşifler puan veya konu
bitirme kaydı oluşturmaz. Önceki 800 soru kaydı tüm alanlarıyla korunur.

Güncel kabul ve yayın durumu [FORGE](FORGE.md) ve [QA](docs/QA.md)’dedir.

## İçerik ve öğrenme

0.12.0 adayı, kaynak sırasındaki 109–138. başlıkları işler: 5 matematik,
5 fizik, 5 kimya, 7 biyoloji, 3 Türkçe ve 5 tarih ünitesi. Faiz, karışım, işçi,
havuz ve hareket problemleri; su/ses/deprem dalgaları, ışık, gölge ve düzlem ayna;
katılar, viskozite, buhar basıncı, kaynama, nem, gazlar, plazma ve çevre; eşeyli
üreme ve kalıtım; edat-bağlaç-ünlem, fiiller ve çatı; Millî Mücadele, inkılaplar,
iki savaş arası gelişmeler ve ilk savaş sonrası geçiş kapsamı genişletildi.

Her konuya özgü etkileşimde tahmin yapabilir, modelin gerçek değişimini görebilir,
gerekçeni yazıp kanıtla karşılaştırabilirsin. Anlatımlar, çözümlü örnekler ve
kopya kağıtları uygulamanın içindedir. Yeni 30 kağıt anlatım paragraflarını ve
örneklerini içerir. Keşifler öğrenme puanı veya tamamlanma kaydı oluşturmaz.

146 anlatımın 118’inde ayrıntılı rehber; 146 yerleşik kopya kağıdı ve
1.130 özgün soru bulunur. Kaynak sırasının ilk 138/479 başlığında anlatım hazırdır.
341 ana konu ile 479 ayrıntılı başlık farklı düzeylerdir. Bütün MEB/OGM/Drive
arşivinin dönüşümü tamamlanmış değildir; hazırlanmamış başlıklar hazır gösterilmez
ve kullanıcıdan eksik materyal sağlaması istenmez.

Önceki rehberlerde Türkçe ses/yapı, çarpanlara ayırma, geometri, Newton,
elektrik alan, mol, denge, türev, DNA ve ATP gibi başlıklar da vardır.
Rehberlerde **Adım adım çalış / Tüm anlatım** seçilebilir; çözümlü örnekler,
sık karıştırılan durumlar ve hatırlama çalışmaları anlatımı destekler.
Kaynakların gerçekten okunan sayfa sınırları [SOURCE_REVIEW](docs/SOURCE_REVIEW.md)’de.

Sorular kendi metin/verileriyle çözülebilir. Önceki 800 sorunun tüm kayıtları
korunur; 330 yeni, beş seçenekli ve açıklamalı özgün soru eklenir. Doğru/yanlış,
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

Yeni deneme başlatırken mevcut ilgili soru havuzundan dersler arasında seçim
çeşitlendirilir. Başlamış denemenin soruları, seçenekleri, cevapları ve son zamanı
kayda sabitlenir; devam ederken veya çevrimdışı yeniden açarken değişmez.
Küçük havuzlarda aynı sorular tekrar gelebilir. Bu özellik yeni resmî soru veya
sınırsız, tam dağılımlı deneme üretildiği anlamına gelmez.

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

0.12.0 adayında yerel tip kontrolü, derleme ve 351 birim testi geçti. Hedefli ve
tam tarayıcı kabulü, yeni web güncellemesi, Electron, Pages ve uzak paket/yayın
kabulü henüz tamamlanmadı. Güncel sonuçlar kabul belgelerine eklenir.

Önceki yayımlanmış 0.11.0 sürümünde 279 birim ve 204 tarayıcı testi, canlı Vercel’de 204 test,
Windows/Linux paketli çevrimdışı akışlar ve Android build/imza kontrolü geçti.
GitHub Pages’te yerel alt yol ve gerçek canlı URL kabulü; ayrı profilde
0.10.0→0.11.0 web güncellemesi de geçti. [Kurulum paketleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.11.0-alpha.1)
ve ayrıntılı kanıtlar kabul belgelerindedir.

Web ilk çevrimiçi hazırlıktan sonra, native paketler yerel arayüzle çalışır.
Veriler cihaz bazındadır. Windows Setup/Portable ve Linux AppImage/DEB x64;
Android APK debug imzalı alpha test paketidir. Fiziksel Android, temiz Windows
kurulumu/portable taşıma ve iki native paket arasında veri koruyan yükseltme
ayrıca doğrulanmalıdır. Önceki web yükseltme testi bunların yerine sayılmaz.
