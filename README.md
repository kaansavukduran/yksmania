# YKSMania

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması. **0.13.0 alpha**. Web, Pages ve platform paketlerinin yayın kabulü tamamlandı.

[Vercel uygulaması](https://yksmania.vercel.app) · [GitHub Pages](https://kaansavukduran.github.io/yksmania/) · [GitHub deposu](https://github.com/kaansavukduran/yksmania)

Anlatımı önceden hazır olan **13 başlığın soru çalışması**, kaynaklara dayalı
130 açıklamalı özgün soruyla tamamlandı. Sayı basamakları, bölme/bölünebilme,
EBOB–EKOK, denklemler, eşitsizlikler, katman elektron dizilimi ve tarihin ilk
yedi başlığı artık kendi bağımsız sorularına sahiptir. Bu ekleme yeni konu
anlatımı veya yeni etkileşimli model sayılmaz.

Toplam **146 anlatım, 118 ayrıntılı rehber, 146 kopya kağıdı ve 1.260 özgün soru**
vardır. Hazır 146 anlatımın tamamında soru çalışması bulunur. Doğrulanmış
çalışma sırasındaki ilk **138/479** başlıkta hem anlatım hem soru çalışması hazırdır.
Bütün MEB/OGM/Drive arşivi henüz tamamlanmadı; başlık listesi içerik tamamlanması sayılmaz.

Önceki 1.130 sorunun bütün kayıtları korunur. Mevcut derslerin kimlikleri,
anlatımları, modelleri ve öğrenme verileri değiştirilmez. Öğrenci PDF veya
kaynak yüklemez; öğretim, kopya kağıtları ve sorular uygulamanın içindedir.
Güncel kabul ve yayın durumu [FORGE](FORGE.md) ve [QA](docs/QA.md)’dedir.
Yarım çalışmayı değiştirme, ilerleme yedeğini geri yükleme ve oturumu geri alma
uygulama içinde açık onay ister; Vazgeç veya Escape mevcut kayıtları korur.

## İçerik ve öğrenme

Konu Anlatımı, Kopya Kağıtları, Sorular ve Sınavlar ayrı bölümlerdir.
Rehberlerde **Adım adım çalış / Tüm anlatım** seçilebilir; çözümlü örnekler,
sık karıştırılan durumlar ve hatırlama çalışmaları anlatımı destekler.
Konuya özgü etkileşimlerde tahmin yapabilir, modelin değişimini görebilir,
gerekçeni yazıp kanıtla karşılaştırabilirsin. Keşif, süre veya kağıdı açmak
öğrenme puanı ve tamamlanma kaydı oluşturmaz.

Önceki sürümlerde hücre, periyodik sistem, geometri, cebir, hareket, elektrik,
kimyasal bağlar, kalıtım, dil bilgisi ve tarihsel kanıt modelleri işlendi.
0.12’de çalışma sırasının 109–138. başlıkları için 30 kapsamlı ünite eklendi;
0.13, daha önce hazırlanmış anlatımların eksik soru çalışmalarını tamamlar.
Gerçekten okunan kaynak sayfaları ve kapsam sınırları [SOURCE_REVIEW](docs/SOURCE_REVIEW.md)’dedir.

Sorular kendi metin ve verileriyle çözülebilir; gereken pasaj kartta kökten önce
gösterilir. Doğru/yanlış sonucu, ipucu ve gerekçeli çözüm ayrıdır. Sekiz
resmî ÖSYM bağlantısı özgün öğretim örnekleriyle desteklenir; bunlar resmî soru
gövdelerinin aktarımı değildir. Son 20 yıllık bütün sınavların arşivi tamamlanmadı.
341 ana konu, 479 ayrıntılı başlık ve hazır anlatım sayısı farklı ölçümlerdir.

## Denemeler

TYT karma 105 soru, AYT Sayısal karma 25 soru ve 11 hazır branş çalışması vardır.
Bunlar şu aşamada kısa pratik setleridir; 120/80 soruluk tam resmî dağılımlı deneme
olarak sunulmaz. Eksik branşlar kartlarda belirtilir. Süre, TYT 120 soru/165 dk
ve AYT 80 soru/180 dk oranından gerçek soru sayısına göre hesaplanır.

Yeni deneme başlatırken mevcut ilgili soru havuzundan dersler arasında seçim
çeşitlendirilir. Başlamış denemenin tam soruları, seçenekleri, cevapları ve son
zamanı kayda sabitlenir; devam ederken veya çevrimdışı yeniden açarken değişmez.
Süre başka ekranda ve uygulama kapalıyken de geçer. Doğru, yanlış ve boş ayrı
sayılır; net = doğru − yanlış/4. Küçük havuzlarda aynı sorular tekrar gelebilir;
sınırsız veya tam kapsamlı yeni deneme üretildiği iddiası yoktur.

## Kayıt ve plan

Varsayılan sınav 18 Haziran 2027’dir ve değiştirilebilir; anlatım hedefi
28 Şubat 2027’dir. Uygun günler ve tamamlanan konulara göre plan yeniden
hesaplanır. İlk öğrenme günü 1; tekrarlar 3/7/21’dir. Bugün ekranı tamamlanan
çalışmayı ve gerçek son soru sonucunu görünür tutar. TYT/AYT ağaçları üstten
dallanır; derslerin ayrı renk ve vektör simgeleri vardır.

Ortak kum saati 5 dk; 1/5/10/20 dk ve 1–120 dk özel süre, ters çevirme,
durdurma ve devam etme sunar. Notlar anlatımın altındadır. Ayarlar’da kişisel
ilerleme JSON yedeği/geri yükleme ve onaylı ilerleme sıfırlama bulunur.
Sıfırlama notları, ayarları ve önceki kişisel dosyaları korur.

## Çalıştırma ve doğrulama

Node 24 gereklidir: `npm ci`, `npm run dev`. Kontroller:
`npm run check`, `npm test`, `npm run build`, `npm run test:e2e`, `npm run test:desktop`.

Kaynak `ba8f553` üzerinde CI dört iş PASS: 355 birim ve 303/303 tarayıcı,
Windows/Linux paketli çevrimdışı/yeniden açılış/onay kabulü, Android sürüm kodu 21 ve v2 imza.
Canlı Vercel 303/303; Pages derleme/dağıtım/canlı kabulü üç iş PASS.
[0.13.0 alpha paketleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.13.0-alpha.1) yayımlandı.
Yerel tam 302/303 sonucu ve düzeltilen eski beklentinin 5/5 odaklı kabulü,
son uzak tam 303/303 sonuçlarından ayrı tutulur. Eski 1.130 soru ve 147 dersin
soru dışındaki bütün alanları korunur; bunların 146’sı anlatımdır. Son web
service worker yükseltmesi bütün eski kayıtları korudu. Ayrıntılı kanıt ve
fiziksel cihaz sınırları FORGE ve QA’da bulunur.

Web ilk çevrimiçi hazırlıktan sonra, native arayüz yerel dosyalardan çalışır.
Vercel ve GitHub Pages ayrı kökenlerde ayrı ilerleme saklar; kişisel yedekle
aktarım yapılabilir. Windows Setup/Portable ve Linux AppImage/DEB x64;
Android APK debug imzalı alpha test paketidir. Fiziksel Android, temiz Windows
kurulumu, portable taşıma ve iki native sürüm arasında veri koruyan yükseltme
ayrıca doğrulanmalıdır. Önceki sürümün kabulü yeni aday için kanıt sayılmaz.
