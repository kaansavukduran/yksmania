# YKSMania

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması. **0.9.0 alpha**.

[Uygulamayı aç](https://yksmania.vercel.app) · [Windows/Linux/Android paketleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.9.0-alpha.1)

**Yayın durumu:** 0.9.0 için Windows/Linux/Android paket kontrolleri geçti.
Vercel’in günlük dağıtım kotası dolduğu için canlı site şimdilik **0.8.0**’da;
0.9.0 web dağıtımı ve canlı kabulü bekliyor. Ayrıntılar [FORGE](FORGE.md)’de.

Ders materyali yüklemek gerekmez. **Konu Anlatımı → Kopya Kağıtları → Sorular →
Sınavlar** ayrı bölümlerdir. Anlatımlar, etkileşimli modeller, adım adım çözümler,
hatırlama çalışmaları ve sorular uygulamada hazırdır. Eski PDF/katalog yükleme
arayüzleri kaldırıldı; daha önce saklanmış kişisel dosyalar/veriler silinmez.

## İçerik ve öğrenme

57 anlatım, bunların 28’inde ayrıntılı rehber; 60 yerleşik kopya kağıdı ve
220 özgün soru. Kaynak sırasının ilk 45/479 başlığında anlatım hazırdır.
341 ana konu ile 479 ayrıntılı başlık farklı düzeylerdir. Bütün MEB/OGM/Drive
arşivinin dönüşümü tamamlanmış değildir; hazırlanmamış başlıklar hazır gösterilmez
ve kullanıcıdan eksik materyal sağlaması istenmez.

Yeni rehberler Türkçe ses/yapı, çarpanlara ayırma, geometri, Newton, elektrik alan,
mol, denge, türev, DNA ve ATP’yi derinleştirir. Osmanlı siyaset, askerî teşkilat
ve medeniyet anlatımları; sözcük parçalama, cebir parçaları ve tarihsel kanıt
atölyeleri vardır. Rehberlerde **Adım adım çalış / Tüm anlatım** seçilebilir.
Kaynakların gerçekten okunan sayfa sınırları [SOURCE_REVIEW](docs/SOURCE_REVIEW.md)’de.

Sorular kendi metin/verileriyle çözülebilir. Önceki 115 sorunun kimlikleri ve
cevapları korunur; yeni 105 soru eklenir. Doğru/yanlış, ipucu ve gerekçeli çözüm
ayrıdır. Sekiz doğrulanmış ÖSYM bağlantısı, uygulamada bağımsız öğretim örneği ve
özgün çözümle desteklenir; bu örnekler resmî soruların birebir aktarımı değildir.
Son 20 yıllık arşivin tamamı taranmış veya soru bankasına çevrilmiş değildir.

## Denemeler

TYT karma 90 soru, AYT Sayısal karma 25 soru ve 11 hazır branş çalışması.
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

Web ilk çevrimiçi hazırlıktan sonra, native paketler yerel arayüzle çalışır.
Veriler cihaz bazındadır. Windows Setup/Portable ve Linux AppImage/DEB x64;
Android APK debug imzalı alpha test paketidir. Fiziksel Android, temiz Windows
kurulumu/portable taşıma ve iki native paket arasında veri koruyan yükseltme
ayrıca doğrulanmalıdır. Önceki web yükseltme testi bunların yerine sayılmaz.
