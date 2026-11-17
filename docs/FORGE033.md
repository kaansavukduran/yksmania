# Forge033: faktöriyel öğretimi — 0.21.0 geliştirme adayı

Bu kayıt yalnız `forge/source-transfer-033` dalındaki adayı anlatır. Taban kaynak `387fc3ea7f43e39d64e0c1e5f062372969a0ebeb` üzerindeki 0.20.0'dır. Aday henüz main'e alınmadı; 0.21.0 için uzak CI, yayımlanmış web veya dağıtılmış paket kabulü yoktur.

## Uygulamaya eklenenler

Faktöriyel kaynağının güncel 15 sayfası, gerçek şekiller dahil incelendi. Tanım ve sayı kümelerinden başlayıp çarpım, eşitlik, asallık, bölünebilme, sondaki sıfırlar ve kısıtlı sıralamaya ilerleyen bir yerleşik ünite eklendi. Ünite 20 açıklama bölümü, 16 adım adım çözümlü örnek, 12 hatırlama ve 43 bağımsız beş seçenekli özgün soru içerir. Her soruda gerekli bilgi, yöntem, ayrı çözüm adımları, beş seçeneğin gerekçesi, sık hata ve sonuç kontrolü vardır. Sekiz bölümlü kısa kopya kağıdı ayrı menüden açılır. Öğrenci kaynak/PDF yüklemez.

Altı etkileşim aynı hesaplardan çizilir: çarpımı tek tek kurma; faktöriyel oranında ortak çarpanları görme; asal/bileşik bölen bütçesi; bölmeden sonra sondaki sıfırlar; serbest/sabit/başta yasak sıralama; ardışık faktöriyel toplamı ve farkı. `0! = 1`, `1! = 1`, sıfır sonucunu veren kısıtlı tek nesne durumu ve tam sayı olmayan bölüm koşulları açıkça ayrılır. Keşif ve geçirilen süre öğrenme puanı veya konu tamamlama üretmez.

| Ölçü | Önce | Aday |
| --- | ---: | ---: |
| Ders/soru seti kaydı | 528 | 529 |
| Ayrıntılı rehber | 494 | 495 |
| Ayrı kopya kağıdı | 494 | 495 |
| Sıralı çalışma başlığı | 493 | 494 |
| Özgün soru | 6.077 | 6.120 |
| Tam / kısmi soru yardımı | 3.437 / 2.640 | 3.480 / 2.640 |

Eski 6.077 ham sorunun içerik, seçenek, anahtar ve sırası; 528 eski set; 494 eski rehber/özet ve ilk 493 çalışma kimliği/sırası karşılaştırılır. Yeni başlık sona eklenir. İlk 479 başlığın Excel sırası ve eski faktöriyel başlığının kişisel ilerlemesi korunur; yeni ünitenin kaydı ayrıdır. Notlar, ayarlar ve ilk gün 1 sayılan 3/7/21 tekrar politikası değişmez. [İçerik dökümü](CONTENT_INVENTORY.csv) gerçek kayıt koleksiyonundan üretilir; bu sayılar MEB müfredatının tamamlanma yüzdesi değildir.

## Kaynak bağı ve kapsam

Özel defterde 81 ayrı kaynak öğretim maddesi 199 anlatım/örnek/soru/model konumuna eşlenmiştir. Önceki denetimin birbiriyle örtüşebilen 80 kayıt kimliği ayrıca aynen korunur. 81 ve 80 farklı sayım birimleridir; bunlardan aktarım yüzdesi çıkarılmaz. Güncel PDF'nin 15 sayfalık özeti, örnekleri, sınır durumları, prova ve hata onarımları bağımsız ikinci okuyucuyla incelendi. Son sıfırdan farklı rakam algoritmaları, Gamma fonksiyonu ve ileri permütasyon/kombinasyon bu kaynağın kapsamı değildir.

2021 TYT Matematik 5'in gerçek resmî kitapçığındaki soru sayfası 27 ve cevap kaynağı 45 ayrıca görüldü; resmî anahtar C, matematiksel değer 24.024'tür. Bu dokuzuncu konu bağlantısı eski ve yeni faktöriyel başlıklarından açılır. Uygulamadaki öğretim örneği özgün uyarlamadır; resmî soru görseli, kökü veya seçenekleri depoya aktarılmadı. Özgün alıştırmanın seçenek sırası resmî C harfiyle karıştırılmaz. Resmî kitapçık bağlantısı internet ister; uygulamanın kendi açıklaması çevrimdışı kullanılabilir. Saklı gerçek kitapçık incelendi; yeni tam dosya indirmesi veya bütün düzeltme duyurularının güncel taraması yapıldığı iddia edilmez. Eski sekiz resmî bağlantı ve öğretim örneği aynen korunur.

Faktöriyel video önerileri aynı konuya ait mevcut kaynak satırına bağlanır. Eski video adresleri, kanallar ve roller değişmez. Bağlantı eşleşmesi bütün videoların oynatıldığı veya içeriklerinin güncel doğrulandığı anlamına gelmez.

## Yerel kabul ve kalan kapılar

İlk C1 tam birim turu 207 dosyada 1.850/1.850, masaüstü bağlantı onarımından önceki C3 tam turu 208 dosyada 1.852/1.852 geçti. Son kaynakta, aşağıdaki 55 masaüstü politika testi dahil **209 dosyada 1.907/1.907 PASS**, 233,15 saniyedir. TypeScript/367 modül yolu denetimi ve altı dosyadaki 20 hedef birim testi de geçti. Normal C3 üretim derlemesi 293 dosya, 283 gerekli çevrimdışı varlık ve 27.599.419 byte içerir; en büyük dosya 4.270.270 byte ile 5 MiB sınırının altındadır. `/yksmania/` derlemesi de 293 dosya/283 gerekli varlık ve 27.599.227 byte ile geçti; en büyük dosya 4.269.534 byte'tır.

C2'nin ardından son C3 hedef tarayıcı turu tek koşuda 4/4 PASS, 34,61 saniye; atlanan, başarısız veya flaky vaka yoktur. Normal koyu masaüstü ve 320 px Matrix/Lexend arayüz yüzde 200/yazı yüzde 150; altı modelin gerçek değerleri, en az 44 px dokunma alanları, sınırlı axe denetimi, notlar ve çevrimdışı yeniden açılış sınandı. Gerçek metin ölçüleri masaüstünde 15 px, dar profilde 45 px Lexend'dir; taşma yoktur. Uzun locator PNG'sindeki skip-link, gerçek odaksız DOM'da ekran üstündedir; Tab → Enter ana içeriğe geçer. Bu görüntü artefaktı için global stil değiştirilmedi.

Gerçek iki cevaplı taslak ve ayrıca 43/43 bağımsız doğru/yardımsız oturum kaydedildi. Sonuç ekranındaki yeni 2021 bağlantısı, 2022 → 2021 filtresi, resmî C/sayfa 27/45 bilgisi ve çevrimdışı ilk kez açılan üç adımlı özgün 24.024 çözümü geçti. Gerçek resmî bağlantı, zararsız yerel yanıtla etkinleştirildi; bu adım canlı resmî PDF erişim kabulü değildir. Yeni çözümü açmak ek oturum veya konu tamamlaması üretmedi. Gerçek sonuç, yeni çözüm ve dar yazı PNG'leri ayrıca okundu. Bunlar anahtarı görünen otomatik UI regresyonlarıdır; kör öğrenci veya öğrenme etkinliği araştırması değildir.

Sonradan yalnız yanlış bir geliştirici yorumundaki “henüz kayıtlı değil” ifadesi düzeltildi. Yeni check/normal build, kabul edilmiş C3'ün 293 dosyasının tamamını byte birebir üretti; eski tam birim ve UI sonuçları aynı runtime içindir. Matematik, öğrenci metni, soru anahtarı, kayıt ve test değişmedi. Önceki kaynak/hash kayıtları korunur; yorum farkı ayrı köprüyle izlenir.

C1 yerel kaynak Electron koşusu eski 107 ve yeni bir olmak üzere 108 farklı çevrimdışı model akışını, reload ve aynı profilde süreç yeniden açılışını geçti; renderer hatası sıfırdı. Bu C1 kaynak koşusudur; sonraki C2/C3 yazı ve kaynak bağlantısı değişikliklerinin veya dağıtılmış 0.21 paketinin kabulü değildir. Tam uzak CI, Windows/Linux paketleri, yayımlanmış Pages, yeni APK ve fiziksel cihaz testleri ayrıca gereklidir.

Son C3 yerel `/yksmania/` turu **108/108** farklı modelin ilk çevrimdışı kullanımı ve reload'unu geçti. Yeni faktöriyel ünitesinin altı modu, notu ve puansız keşfi korunur. Eski 107 model aynı göreli sırayla bulunur; yeni model listeye 99. indekste eklenmiştir, bu liste için “eski 107 tam ön ek” iddiası kurulmaz. Worker ve manifest kapsamı `/yksmania/`, renderer hatası ve eksik istek sıfırdır. Test sonrası 293 dosya değişmemiştir. Bu yerel prefix kabulüdür; yayımlanmış Pages kabulü değildir.

390 px son gezinme PNG'sinde kısmen kayan menü ayrıca gerçek hareket açıkken ölçüldü. Geçişler ve iki animasyon karesi beklendikten sonra açık menü 0–256 px; normal Ayarlar seçimi, görünür dış alan tıklaması ve Escape sonrasında −256–0 px/inert durumundadır. Escape odağı menü düğmesine döndürür, ayar alanına odaklanılabilir ve yatay taşma sıfırdır. Başlangıçtaki gözlem, açık çekmecenin arkasında kalan header düğmesine tıklamaya çalışıp zaman aşımına uğradı; yanlış hedefli ilk kayıt korunur. Son geçiş doğru görünür kontrol ve gerçek Escape kullanır; ürün veya CSS değiştirilmedi.

## Masaüstü eğitim bağlantısı onarımı

Önceki masaüstü sürümünde gerçek YouTube bağlantısının açılmadığı görüldü. Sistem tarayıcısına devretme kuralı, mevcut GitHub/Drive davranışını koruyup yerleşik YouTube, OGM Materyal ve resmî ÖSYM kaynaklarının belirli HTTPS biçimlerini destekleyecek şekilde düzeltildi. Desteklenmeyen alan adı, protokol, kullanıcı bilgisi, farklı port ve yönlendirme biçimleri reddedilir; yeni pencere Electron içinde açılmaz.

55 politika testi; 2.294 gerçek katalog URL'sini, beş resmî kitapçığı, olumlu örnekleri ve 41 olumsuz durumu kapsar. Donmuş normal C3 web derlemesiyle gerçek yerel kaynak Electron'da altı normal bağlantı etkinleştirmesi ve süreç yeniden açılışı geçti. Yalnız işletim sistemi çağrısı kaydedildi; uygulamanın gezinme/bağlantı handler'ı değiştirilmedi, sahte öğrenme durumu eklenmedi. Her tıklama tek devretme çağrısı üretti; sayfa, not, Matrix ve öğrenme kayıtları korundu, renderer hatası sıfırdı. Bu kanıt haricî videonun oynadığı, PDF'nin internetten indirildiği veya fiziksel sistem tarayıcısının kabul edildiği anlamına gelmez. İlk hero-gate test zaman aşımı ve kesinleştirilmemiş neden korunur; yeni profilde düzeltilmiş test altı adımı geçti. Bu masaüstü onarımı 293 web dosyasını değiştirmez.

Tam tarayıcı listesi 55 dosyada 1.269 vakadır; dört shard 345/290/317/317 vakayla ayrık ve tamdır, eski 1.265 vakanın tam başlık kimlikleri korunur. Bu statik liste doğrulamasıdır; henüz yeni kaynağın tam uzak CI başarısı değildir. Eski 64 fixture ve 15 smoke modülü byte aynıdır. Gerçek temel sürümle tüm eski içerik ve sıralama ayrıca bağımsız karşılaştırıldı.

Bu dal kanonik PDF kapanış sayısını değiştirmez. Tabanın güncel 8.936 PDF için 2 tam, 7 kısmi ve 8.927 belirsiz kaydı tarihsel olarak korunur; belirsiz, hiç işlenmemiş demek değildir. Yeni uygulama kaydı ve yerel öğretim kanıtı tek başına PDF'ye BITTI statüsü vermez. Son kayıt, kaynak sürümü ve gerçek runtime/UI kanıtlarıyla ana akışta ayrıca denetlenecektir. Bütün MEB/OGM/MEBİ veya ÖSYM arşivi bitmedi.
