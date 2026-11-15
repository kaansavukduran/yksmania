# YKSMania

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması. **0.14.0 yayın adayı**; son yayımlanmış doğrulanmış paket 0.13.0.

[Vercel](https://yksmania.vercel.app) · [GitHub Pages](https://kaansavukduran.github.io/yksmania/) · [GitHub deposu](https://github.com/kaansavukduran/yksmania)

0.14 adayı, doğrulanmış çalışma sırasının 139–168. başlıklarını kapsar. Önceden
hazır mol ve çarpanlara ayırma anlatımları yeniden sayılmadan 28 yeni etkileşimli
ünite eklendi: 236 bölüm, 479 paragraf, 121 çözümlü örnek, 121 hatırlama ve
280 özgün beş seçenekli soru. Toplam 174 anlatım, 146 ayrıntılı rehber,
174 yerleşik kopya kağıdı ve 1.540 soru; ilk 168/479 başlık anlatım ve soruyla
hazırdır. Eski 1.260 sorunun bütün alanları ve 147 eski dersin soru dışındaki
alanları korunur. Öğrenci PDF veya kaynak yüklemez. Tüm arşivin, tüm 479
başlığın veya son 20 yıllık bütün resmî sınavların tamamlandığı iddia edilmez.

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
0.13 eski soru açıklarını tamamladı; 0.14 çalışma sırasının 139–168. başlıklarına ilerler.
Gerçekten okunan kaynak sayfaları ve kapsam sınırları [SOURCE_REVIEW](docs/SOURCE_REVIEW.md)’dedir.

Sorular kendi metin ve verileriyle çözülebilir; gereken pasaj kartta kökten önce
gösterilir. Doğru/yanlış sonucu, ipucu ve gerekçeli çözüm ayrıdır. Sekiz
resmî ÖSYM bağlantısı özgün öğretim örnekleriyle desteklenir; bunlar resmî soru
gövdelerinin aktarımı değildir. Son 20 yıllık bütün sınavların arşivi tamamlanmadı.
341 ana konu, 479 ayrıntılı başlık ve hazır anlatım sayısı farklı ölçümlerdir.

## Denemeler

14 kısa pratik seti vardır: TYT karma 110 soru/151 dk 15 sn; AYT Sayısal 25/56 dk 15 sn;
12 branş. Tam 120/80 resmî dağılım değildir; eksik kotalar kartta açıklanır.
Yeni başlangıç ilgili havuzdan çeşitlenir. Başlamış/bitmiş denemenin tam soru,
seçenek, anahtar, işaret ve süresi sabittir; yeni banka eski taslağı büyütmez.
Süre başka ekranda veya uygulama kapalıyken de geçer. Net=doğru−yanlış/4.

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

Node24: `npm ci`, `npm run dev`. Kontroller: `npm run check`, `npm test`,
`npm run build`, `npm run test:e2e`, `npm run test:desktop`.

Son C6 kaynak/414 birim/derleme ve 361/361 tarayıcı kabulü PASS. Pages prefix
ve gerçek Electron'da 19 model ailesi, iki soru rotası, offline/reload ve
aynı profil onay/süreç yeniden açılışı geçti. Gerçek 0.13→0.14 web güncellemesi
bütün eski kayıtları; 105 soruluk devam eden denemeyi, cevabı/işareti/süreyi
korudu. Yeni katalog 110 soru gösterir. Uzak CI/yayın ve yeni paket kabulü
henüz beklenir; son yayımlanmış doğrulanmış paket 0.13.0'dır.

Web ilk çevrimiçi hazırlıktan sonra, native arayüz yerel dosyalardan çalışır.
Vercel/Pages ayrı ilerleme saklar; kişisel yedekle aktarılır. Windows Setup/Portable,
Linux AppImage/DEB x 64; Android debug imzalı alpha pakettir. Son kabul durumu
[FORGE](FORGE.md), [QA](docs/QA.md) ve [kaynak sınırları](docs/SOURCE_REVIEW.md).
