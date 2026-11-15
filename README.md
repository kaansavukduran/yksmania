# YKSMania

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması. **0.16.0**, webde ve [indirilebilir alpha paketleriyle](https://github.com/kaansavukduran/yksmania/releases/tag/v0.16.0-alpha.1) yayımlandı.

[Vercel](https://yksmania.vercel.app) · [GitHub Pages](https://kaansavukduran.github.io/yksmania/) · [GitHub deposu](https://github.com/kaansavukduran/yksmania)

Çalışma sırasının **199–258. başlıkları** için 60 yeni etkileşimli ünite hazırlandı. Uygulamada **264 anlatım, 236 ayrıntılı rehber, 264 yerleşik kopya kağıdı ve 2.440 özgün soru** vardır. Yeni pakette 678 bölüm, 248 adım adım çözüm, 248 hatırlama ve 600 beş seçenekli soru bulunur. İlk 258/479 başlık anlatım ve bağımsız soruyla hazırdır. Önceki 1.840 sorunun bütün alanları ve 205 eski ders kaydı korunur. 610 birim, 548 tam tarayıcı vakası, paketli Windows/Linux çevrimdışı açılış ve GitHub Pages kabulü geçti. Yayın denetiminin 547 vakası gerçek HTTPS’de, bir geliştirme regresyonu yerel Vite’da çalışır.

## İçerik ve öğrenme

Konu Anlatımı, Kopya Kağıtları, Sorular ve Sınavlar ayrı bölümlerdir. Öğrenci PDF, kaynak kataloğu veya kitapçık yüklemez; anlatım ve uygulamalar hazırdır. Rehberde **Adım adım çalış / Tüm anlatım** seçilebilir. Yeni konular hormonlar/duyu/destek-hareket/sindirim; kayaçlar/sular/toprak/bitki/nüfus; asit-baz/günlük kimya/modern atom/gazlar; Newton/ivmeli hareket/atış/enerji; yazım/noktalama/anlatım/sözcük anlamıdır.

Bir modelin verisini değiştir, sonucunu gör, tahminini gerekçesiyle kanıtla karşılaştır. İşlemler ayrı HTML açıklaması ve konuya uygun SVG ile gösterilir. Süre, keşif, sayfa ilerletme veya kağıdı açma, öğrenme puanı ya da tamamlanma kanıtı değildir. Sorular bütün gerekli metin, veri ve koşulları kendi kartında taşır. Gereken pasaj soru kökünden önce görünür; ipucu ve açıklama ayrı tutulur.

Kaynaklar Aurelia/YKS’deki gerçek belgeler, MEBİ ve OGM öğretim sayfalarından özgün anlatıma dönüştürülür. Okunan sayfa sınırları [SOURCE_REVIEW](docs/SOURCE_REVIEW.md)’dadır. 341 ana referans, 479 ayrıntılı sıra ve hazırlanmış anlatım farklı ölçümlerdir. Bütün 479 başlık, bütün Drive/YKS ve son 20 yıllık tüm ÖSYM arşivi henüz tamamlanmadı. Sekiz doğrulanmış resmî bağlantı korunur; yeni 600 kart resmî soru diye etiketlenmez.

## Denemeler

14 kısa pratik seti: TYT karma 110 soru / 151 dk 15 sn, AYT Sayısal karma 45 / 101 dk 15 sn ve 12 branş. Tam 120/80 resmî dağılım değildir; eksik kotalar kartlarda belirtilir. Süre gerçek soru sayısına orantılıdır. Yeni başlangıç ilgili havuzdan çeşitlenir; devam eden denemenin tam soruları, cevabı, işaretleri ve son zamanı değişmez. Eski 37 soruluk AYT taslağı yeni 45 soruluk katalog nedeniyle büyütülmez. Net = doğru − yanlış/4.

## Kayıt ve plan

Varsayılan düzenlenebilir sınav tarihi **18 Haziran 2027**, anlatım hedefi **28 Şubat 2027**’dir. Uygun günler ve tamamlanan konulara göre günlük plan hesaplanır. İlk öğrenme günü 1; tekrarlar 3/7/21’dir. Bugün, tamamlanan çalışmayı ve gerçek son doğru/yanlış sayısını tutar. TYT/AYT ağaçları üstten dallanır; derslerin ayrı renk ve simgeleri vardır.

Ortak kum saati 5 dk; 1/5/10/20 dk ve 1–120 dk özel süre, ters çevirme, durdurma/devam sunar. Notlar anlatımın altındadır. Ayarlar’da kişisel JSON yedeği, geri yükleme ve açık onaylı ilerleme sıfırlama bulunur. Sıfırlama notları, ayarları ve önceki kişisel dosyaları korur. Vercel ve Pages ayrı ilerleme saklar; kişisel yedekle aktarılır.

## Çalıştırma ve doğrulama

Node 24: `npm ci`, `npm run dev`. Kontroller: `npm run check`, `npm test`, `npm run build`, `npm run test:e2e`, `npm run test:desktop`.

Kaynak kontrolü, 610 birim ve derleme geçti. 548 tarayıcı vakası toplandı; tam tarayıcı, 37-aile Electron/Pages ve gerçek 0.15→0.16 veri koruyan web güncellemesi kabulü sürüyor. Sonuçlar [QA](docs/QA.md) ve [FORGE](FORGE.md)'da ayrı tutulur. Uzak yayın henüz tamamlanmadı.

Web ilk çevrimiçi hazırlıktan sonra, native arayüz yerel dosyalardan çalışır. Windows Setup/Portable ve Linux AppImage/DEB x64; Android debug imzalı alpha. 0.16 hedef Android sürüm kodu 24; yeni APK/imza doğrulaması uzak paket kapısında bekleniyor. Fiziksel Android, temiz Windows kurulumu, portable taşıma ve iki native sürüm arasında veri koruyan yükseltme bu yerel kontrollerle doğrulanmış sayılmaz.
