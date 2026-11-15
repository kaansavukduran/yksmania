# YKSMania

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması. **0.15.0** webde ve [indirilebilir alpha paketleriyle](https://github.com/kaansavukduran/yksmania/releases/tag/v0.15.0-alpha.1) yayımlandı.

[Vercel](https://yksmania.vercel.app) · [GitHub Pages](https://kaansavukduran.github.io/yksmania/) · [GitHub deposu](https://github.com/kaansavukduran/yksmania)

Çalışma sırasının 169–198. başlıkları için 30 yeni etkileşimli ünite eklendi. Toplam **204 anlatım, 176 ayrıntılı rehber, 204 yerleşik kopya kağıdı ve 1.840 özgün soru** vardır. Yeni pakette 245 kapsam bölümü, 122 adım adım çözüm, 122 hatırlama ve 300 beş seçenekli soru bulunur. İlk 198/479 ayrıntılı başlık anlatım ve bağımsız soruyla hazırdır. Önceki 1.540 sorunun tüm alanları ve 175 ders kaydının soru dışındaki alanları korunur.

## İçerik ve öğrenme

Konu Anlatımı, Kopya Kağıtları, Sorular ve Sınavlar ayrı bölümlerdir. Öğrenci PDF, kaynak kataloğu veya kitapçık yüklemez; anlatım ve uygulamalar hazırdır. Rehberde **Adım adım çalış / Tüm anlatım** seçilebilir. Yeni konular istatistik; vektör, bağıl hareket ve nehir; kimyasal hesaplamalar/karışımlar; sinir sistemi/genetik çeşitlilik; iklim/tektonik/iç kuvvetler; fiilimsiler ve cümle bilgisidir.

Bir modelin verisini değiştir, sonucunu gör, tahminini gerekçesiyle kanıtla karşılaştır. İşlemler ayrı HTML açıklaması ve konuya uygun SVG ile gösterilir. Süre, keşif, sayfa ilerletme veya kağıdı açma, öğrenme puanı ya da tamamlanma kanıtı değildir. Sorular bütün gerekli metin, veri ve koşulları kendi kartında taşır. Gereken pasaj soru kökünden önce görünür; ipucu ve açıklama ayrı tutulur.

Kaynaklar Aurelia/YKS’deki gerçek belgeler, MEBİ ve OGM öğretim sayfalarından özgün anlatıma dönüştürülür. Okunan sayfa sınırları [SOURCE_REVIEW](docs/SOURCE_REVIEW.md)’dadır. 341 ana referans, 479 ayrıntılı sıra ve hazırlanmış anlatım farklı ölçümlerdir. Bütün 479 başlık, bütün Drive/YKS ve son 20 yıllık tüm ÖSYM arşivi henüz tamamlanmadı. Sekiz doğrulanmış resmî bağlantı korunur; yeni 300 kart resmî soru diye etiketlenmez.

## Denemeler

14 kısa pratik seti: TYT karma 110 soru / 151 dk 15 sn, AYT Sayısal karma 37 / 83 dk 15 sn ve 12 branş. Tam 120/80 resmî dağılım değildir; eksik kotalar kartlarda belirtilir. Süre gerçek soru sayısına orantılıdır. Yeni başlangıç ilgili havuzdan çeşitlenir; devam eden denemenin tam soruları, cevabı, işaretleri ve son zamanı değişmez. Eski 25 soruluk AYT taslağı yeni 37 soruluk katalog nedeniyle büyütülmez. Net = doğru − yanlış/4.

## Kayıt ve plan

Varsayılan düzenlenebilir sınav tarihi **18 Haziran 2027**, anlatım hedefi **28 Şubat 2027**’dir. Uygun günler ve tamamlanan konulara göre günlük plan hesaplanır. İlk öğrenme günü 1; tekrarlar 3/7/21’dir. Bugün, tamamlanan çalışmayı ve gerçek son doğru/yanlış sayısını tutar. TYT/AYT ağaçları üstten dallanır; derslerin ayrı renk ve simgeleri vardır.

Ortak kum saati 5 dk; 1/5/10/20 dk ve 1–120 dk özel süre, ters çevirme, durdurma/devam sunar. Notlar anlatımın altındadır. Ayarlar’da kişisel JSON yedeği, geri yükleme ve açık onaylı ilerleme sıfırlama bulunur. Sıfırlama notları, ayarları ve önceki kişisel dosyaları korur. Vercel ve Pages ayrı ilerleme saklar; kişisel yedekle aktarılır.

## Çalıştırma ve doğrulama

Node 24: `npm ci`, `npm run dev`. Kontroller: `npm run check`, `npm test`, `npm run build`, `npm run test:e2e`, `npm run test:desktop`.

C3 kaynak kontrolü, 478 birim testi ve derleme geçti. Electron/Pages’te 25 model ailesi, iki eski soru rotası, çevrimdışı kayıt/yenileme ve aynı profil süreç yeniden açılışı sınandı. Gerçek 0.14→0.15 web güncellemesi eski 25 soruluk AYT taslağını, notları, tamamlanan oturumu, üç tekrar tarihini ve sentetik eski PDF’yi korudu; XP değişmedi. Son tam tarayıcı koşusu 423/423 PASS (iki worker, 18,8 dk). CI dört iş, canlı web iş akışı 423/423 (422 HTTPS + bir geliştirme regresyonu) ve Pages üç iş PASS; sekiz alpha dosyası yayımlandı. İlk canlı 422/423 koşusunun trace incelemesi ve değişmeyen kaynakla ikinci tam PASS kaydı QA’da korunur. İlk zaman aşımı/yeniden sınama ve kapsam ayrıntısı [QA](docs/QA.md) ile [FORGE](FORGE.md)’dadır.

Web ilk çevrimiçi hazırlıktan sonra, native arayüz yerel dosyalardan çalışır. Windows Setup/Portable ve Linux AppImage/DEB x64; Android debug imzalı alpha. Android 0.15.0/kod 23 ve v2 imzası doğrulandı. Fiziksel Android, temiz Windows kurulumu, portable taşıma ve iki native sürüm arasında veri koruyan yükseltme bu yerel kontrollerle doğrulanmış sayılmaz.
