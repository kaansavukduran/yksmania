# 0.13.0 yerel kabulü — son tam tarayıcı koşusu sürüyor

130 özgün soru, anlatımı önceden hazır 13 başlığa bağlandı. Yeni toplam 1.260
sorudur. Hazır 146 anlatımın tamamı ve ilk 138 sıralı başlık bağımsız sorulara
sahiptir; 479 başlığın tamamı bitmiş değildir. 118 rehber ve 146 kağıt korunur.

C2 ile birleştirilmiş kaynakta `check`, `build` ve 55 dosyada 355/355 birim
testi PASS.
Önceki 1.130 sorunun tam JSON alanları; 147 eski ders kaydının soru dışındaki
bütün alanları korunur. İkinci kontrol, yalnız bazı derslerin gövdesini değil
bütün eski derslerin kimlik, başlık, gövde, hedef, süre, kaynak ve etiketlerini kapsar.
Derlenen yeni 130 kartın pasaj, seçenek, anahtar, ipucu ve açıklaması incelenen
soru verisiyle alan alan eşittir. Kaynak metadata’sı ürüne taşınmaz.

İlk kapsam kontrolü üç ek sorusuz rehber buldu; 30 soru daha hazırlanıp bağımsız
incelenerek eklendi. İlk tam birim koşusundaki 354/355 sonucu, eski cebir
`questions=[]` beklentisinden kaynaklandı. Bu test yeni 10 soruluk bağımsız
bankayı doğrular; mevcut matematik model denetimleri korunur. Bu onarımlar
soru doğruluğu veya gerçek kullanıcı sonucu yerine sayılmadı.

Önceki 0.13 adayında 16 paket × 2 temel soru kabulü 32/32 PASS:
çevrimdışı ilk giriş, tam pasajın kökten önce görünmesi, açıklama/taslak koruma,
9 doğru/1 yanlış sonuç, öğrenme gününden +2/+6/+20 tekrar ve 320px
UI %200/yazı %150. Pages ve geliştirme Electron’da yeni matematik/tarih
rotalarının ilk çevrimdışı soru/geri bildirim/yeniden açılışı PASS idi.
Bu kanıtlar aşağıdaki onay onarımından önceki ayrı derlemeye aittir.

## YKS-067 — sistem onayında Electron sürecinin kapanması (Orta)

Aynı profilde kontrol edilmiş matematik taslağı varken başka soru setine
geçiş, `window.confirm` yolunda geliştirme Electron 45.3.2/headless sürecini
SIGTRAP ile kapattı. Kapanma test temizliğinden önce gerçekleşti. Fontconfig
ve NSS uyarıları tek başına neden sayılmadı; tanı çıktısı özel çalışma alanında
saklandı. Yeni soru verisinin hatası değildir; mevcut native onay bağımlılığı
bu akışta görünür hâle geldi. Fiziksel masaüstü cihazında aynı çökme iddia edilmez.

Yarım çalışmayı değiştirme, kişisel ilerleme yedeğini geri yükleme ve oturumu
geri alma artık ortak, erişilebilir HTML onayı kullanır. Vazgeç varsayılan
odaktır; Escape iptal eder ve odak tetikleyiciye döner. Her çağıranda onay ve
kalıcı kayıt boyunca çift tıklama kilidi vardır. Açık onay verilmeden kayıt
değişmez; kalıcı kayıt hatasında önceki veri korunur. Native API taklidi yoktur.

Son kaynakta `check`, iki web derlemesi ve 355/355 birim PASS. Dört yeni
YKS-067 vakası ve etkilenen dört eski browser vakası 8/8 PASS. Gerçek akışlar
iptal → bütün kayıt aynılığı, çift tıklamayla tek sonuç, başarısız yazma →
yeniden açık onay, çevrimdışı yeniden yükleme, odak, 320px/UI %200/yazı %150
ve erişilebilirliği sınar. Genel listelemede 23 dosyada 303 vaka vardır;
son tam koşu ve yeni Electron onay kabulü sürüyor. Son Pages derlemesi ayrıca
sınanıyor; 0.13 uzak CI/yayın/paket kabulü bu yerel sonuçlardan çıkarılmaz.

Fiziksel Android, temiz Windows kurulumu, portable taşıma ve iki native sürüm
arasında veri koruyan yükseltme ayrıca doğrulanmalıdır. Kaynak ve bağımsız
inceleme sınırları SOURCE_REVIEW’da; ilk başarısız denemeler FORGE’dedir.

---

# 0.12 son font ve simge düzeltmesi

İlk yerel tam koşu269/272, ilk CI de üç Türkçe caption font beklentisiyle FAIL.
Ana eylem45px kalır;37,35px küçük açıklamanın ayrı tipografik rolü testte ayrıldı.
Sözcüklerin bölünmeme ve erişilebilir ölçek koşulları korunur. Dokuz ilgili
browser testi PASS; karbon/iyon işaretleri gerçek dolguları üzerinde üç tema
ve üç örnekte en az4,5:1 kontrastla denetlendi. 351unit/check PASS; tam273,
yeni CI ve canlı kabul henüz bu ek kayıtta sonuçlanmadı.

# 0.12 son yerel ek kabul

351 birim testi, check ve build PASS. Geliştirme Electron’da bütün eski akışlar
ve altı ek kaynak ailesi PASS. Pages yerel alt yolunda 13 ailenin ilk çevrimdışı
açılışı, gerçek model değişimi, kayıt ve yeniden yüklemesi PASS; renderer0.
Gerçek 0.11→0.12 yerel SW güncellemesi eski verileri, notları, taslağı, üç tekrarı
ve sentetik 870 bayt belgeyi korudu. Altı yeni model ilk kez çevrimdışı açılıp
kalıcı kaldı; XP25→25. Son 88 görünüm ölçümü ve 30 ünitede büyük yazıdaki
sözcükler PASS. Seçilmiş son çizimler ayrıca görüntülerden incelendi.
Üç temel konunun altı tarayıcı testi 4+2 PASS ile gerçek 9/10 sonucu ve
3/7/21 tekrarlarını korudu. Tam 272 tarayıcı ve uzak 0.12 kabulü henüz sürüyor.


# 0.12.0 aday kabulü — son tarayıcı ve yayın doğrulaması sürüyor

Kaynak sırasındaki 109–138. başlıklar eklendi: 30 ünite, 263 bölüm,
123 çözümlü örnek, 128 hatırlama ve 300 özgün soru. Toplam 146 anlatım,
118 ayrıntılı rehber, 146 kopya kağıdı, 1.130 soru; ilk 138/479 hazır.
Önceki 800 soru kayıtları ve öğrenme verilerinin kimlikleri korunur.

Yerel `npm run check`, `npm run build` ve 351/351 birim testi PASS.
İlk birleşik koşu 342/343 PASS: eski keyfî açıklama uzunluğu beklentisi geçerli
58 karakterlik metni reddetti. Gerçek açıklamanın aynılığı, boş olmaması ve
cevap metninden farklı olması kabulüyle düzeltildi; metin yapayca uzatılmadı.
Hedefli 66 ve tam 272 tarayıcı testinin, manuel ekranların, geliştirme Electron,
Pages alt yol/canlı adres, gerçek web güncellemesi, uzak CI ve yeni native
paketlerin sonuçları henüz bu aday kaydında doğrulanmış değildir.

300 yeni soru anahtarı ve 123 adım adım örnek bağımsız ikinci içerik okumasından
geçti. Yazarlar arasında fizik→biyoloji, biyoloji→tarih, kimya→Türkçe,
Türkçe→matematik, matematik→fizik/kimya denetimleri yapıldı. Gerçek kaynak
sayfası ve model koşulu sınırları SOURCE_REVIEW’da, başarısız ilk denemeler ve
YKS-052–056 onarımları FORGE’de tutulur. İçerik incelemesi çalışan arayüz veya
fiziksel cihaz testi değildir.

Yeni deneme seçimi yalnız başlangıçta yapılır ve taslağa tam soru kopyasıyla
sabitlenir. Birim kabulü aynı başlangıç verisinde tekrarlanabilir seçim,
farklı başlangıçlarda yeterli havuzdan çeşitlenme, benzersiz kimlikler,
13 sette aynı sayı/süre/kota, tam seçenek/anahtar/pasaj/açıklama taşınması,
eski sonucun korunması ve yeniden yüklemede aynı taslağı denetler. Öğrenme
puanı veya ustalık seçime katılmaz. TYT 105/AYT 25 ve 11 branş hâlâ eksik
resmî dağılımlı kısa pratik setleridir; sınırsız yeni soru garantisi yoktur.

Fiziksel Android, temiz Windows kurulumu, portable taşıma, marka/tarayıcı
kombinasyonlarının tamamı ve iki native sürümle veri koruyan yükseltme ayrıca
sınanmalıdır. Aşağıdaki 0.11 yayın kanıtları geçmiş sürüme aittir; yeni 0.12
kabulünün yerine sayılmaz.

---

# 0.11.0 doğrulanmış web ve paket yayını

Kaynak 3cd370beb1f7dd96cd9866508c58c96444e5bce5. CI43699042962 dört iş
PASS: 279 unit, 204 browser, Windows/Linux gerçek paketli çevrimdışı/yeniden
açılış akışları renderer0, Android build/imza/metadata. Canlı43699042930
204/204 PASS (14,3 dk). Vercel normal TLS runtime hash eşitliği PASS.
Pages43700388975 build/deploy/canlı-HTTPS kabulü üç iş PASS; gerçek alt yolda
yedi yeni aile ilk çevrimdışı model/kayıt/reload, soru açıklaması ve mobil
gezinme denetlendi. Yerel Chromium'un sertifika otoritesi hatası güvenlik
kontrolü kapatılmadan GitHub runner'da gerçek URL kabulüyle çözümlendi.

Release43700509433 PASS; v0.11.0-alpha.1 sekiz dosya, draft değil. Tag ve
verified-run aynı 3cd370b; iki indirilen kanıt hash'i, Android0.11.0/code19/v2
PASS. Beş büyük binary ayrıca yerelde hash'lenmedi. Fiziksel cihaz, temiz
kurulum, portable taşıma ve iki native sürüm yükseltmesi NOT TESTED.
İlk CI203/204, hedef sayfayı beklemeyen eski not ölçüm testiydi; hedef panel ve
notun görünürlüğü beklendi, geometri/taşma sınırı değişmedi. Son tam204 PASS.
Pages ilk kayıt yarışması ve diğer ilk hatalar FORGE'de korunur.

Aşağıdaki kayıt yayın öncesi yerel hazırlığı ve yöntem sınırlarını gösterir.

---

# 0.11.0 yerel hazırlık kaydı

30 yeni başlık (79–108) ile toplam 116 anlatım, 88 ayrıntılı rehber,
116 yerleşik kopya kağıdı ve 800 özgün soru vardır. Doğrulanmış çalışma sırasının
ilk 108/479 başlığı hazırdır. Bütün MEB/OGM/Drive arşivinin işlenmesi veya tam
resmî dağılımlı TYT/AYT denemesi tamamlandı iddiası yoktur.

Yerel `npm run check`, `npm test` (279/279) ve `npm run build` PASS.
Tam Chromium tarayıcı koşusu 204/204 PASS (13,6 dk). Yeni 62 kabul, 30 ünitenin
normal ders girişini, gerçek model değişimini, HTML sonucunu, not/gerekçe
kaydını, ilk soru ve açıklamasını, çevrimdışı yeniden açılışı ve keşfin
öğrenme/XP kazandırmamasını denetler. 320 px, UI %200/yazı %150, dokunma,
azaltılmış hareket, erişilebilirlik ve benzersiz kimlik kontrolleri dahildir.
İyon ve indüklenmiş dipolün iki yük/iki sıra/iki anlık durum kombinasyonları
gerçek SVG üzerinde ayrıca sınanır.

Son derlemede 30 ünite × 4 görünüm için 120 ölçüm/ekran görüntüsü durumu PASS,
renderer hatası 0. Görünümler: 1440 px koyu, 390 px açık, 844×390 yatay ve
320 px açık/büyük arayüz/büyük yazı/azaltılmış hareket. Bu sayı, 120 görüntünün
tamamının insan gözüyle incelendiği anlamına gelmez; seçilmiş gerçek görüntüler
ayrıca incelendi. Bu incelemede görünmeyen kromozom/gen çizgileri ve mayoz I
sitokinezindeki fazladan iğ çizgileri yakalandı ve düzeltildi. Son kabul,
hesaplanmış çizgi rengini ve ilgili evrede iğ bulunmamasını da denetler.

Ayrı yerel köken/profilde gerçek 0.10.0→0.11.0 service worker güncellemesi PASS:
eski öğrenme olayları ve üç tekrar tarihi, ayarlar, notlar, belgeler/katalog,
tamamlanma ve kontrol edilmiş soru taslağı korundu. Yalnız eski dosya koruma
koşulu için etkisiz, sentetik 870 bayt PDF kullanıldı; gerçek özel PDF eklenmedi.
Yeni modeller ilk kez çevrimdışı açıldı, seçimleri yeniden açılışta korundu;
XP 25→25, renderer hatası ve başarısız uygulama isteği 0. Bu test yerel web
güncellemesidir; kullanıcının canlı profili veya native sürüm geçişi değildir.

GitHub Pages için yerel `/yksmania/` alt yol kabulü PASS: manifest, simgeler,
worker kapsamı ve sürüm adresi doğru alt yoldadır. Yedi yeni model ailesi ilk
kez çevrimdışı açıldı; gerçek değişim ve yeniden yükleme, soru açıklaması,
kopya kağıdı, sınav ve mobil gezinme denetlendi. Vercel ile Pages ayrı kökenlerde
ayrı ilerleme saklar; kişisel yedek aktarımı gerekir.

Son kaynakta geliştirme Electron kabulü yedi yeni model ailesi, ilk çevrimdışı
açılış/gerçek değişim/yeniden açılış ve eski çalışma/deneme/kayıt akışlarıyla
PASS; renderer hatası 0. Uzak CI, Windows/Linux paketleri, Android paketi ve
iki canlı yayın henüz bu kayıtta doğrulanmış sayılmaz. Fiziksel Android, temiz Windows kurulumu, portable taşıma ve iki
native sürüm arasında veri koruyan yükseltme ayrıca doğrulanmalıdır.
İlk başarısız denemeler ve somut YKS-043–051 onarımları [FORGE](../FORGE.md)'de
korunur; test kabul sınırları bu hataları örtmek için gevşetilmedi.

---

# 0.10.0 doğrulanmış teslim

Kaynak22872a289b26da02bc6feab9fb34db587670a55d. CI43635461738 dört iş PASS:
check/build,192 unit,142 browser (6,7dk),Windows/Linux/Android. Canlı
43635597330 ayrıca142/142 PASS (7,6dk). Vercel production READY,0.10.0;
normalTLS üçruntimehash'i yerel/canlı birebir eşit. Release43636719923 PASS,
v0.10.0-alpha.1 draft değil,8asset; kaynak/tag/verified-run aynı22872a2.
İndirilen iki kanıt hash'i eşleşti;7payload listesi. Android0.10.0/code18/v2
signature PASS. Beş büyük binary ayrıca yerelde hash'lenmedi.

Yerel192 unit ve tam142browser (9,7dk); son3UIyamasından sonra aynı192unit,
check/build ve41ilgili browser tekrarPASS (2,8dk). Yeni41test tüm20ünitede
normalgiriş→gerçek değişen SVG/HTMLdiyagram→sonuç→not→offline reload→ilk
özgün soru/feedback→taslak reload akışını ve noXP/learning eşitliğini denetler.
320pxUI200/text150/reducedmotion/touch/HTMLsonuç/axe ve uniqueID koşulları
korunur. TürkçeHTMLdiyagramını SVG sanan3, sıfatdönüşümsırasınıkaçıran1 ve
r0ikiuçsayımınıvarsayan2 ilk harnessFAIL düzeltildi; sonuç/timeout/bounds
gevşetilmedi. YKS032–042 kanıtları ve onarımlar FORGE'de korunur.

127 manuel ölçüm+12 bağımsız kimya durumu; son4model16durumda gerçek labeltap,
vektörikon ve12/x boşluğu ayrıcaPASS. Kök tüm72dosyanın final iki kopyayla
byte eşitliğini doğruladı. Son0.9.2→0.10 gerçek yerel webSWupdate tam eski
state/documents/catalogue eşitliği,checkedtaslak/not/üçreview ve sentetik
870baytPDFkoruma ilePASS. Üç yenimodelilkkezofflineaçıldı/reloadkorundu,
XP25→25,renderer0. Bu production profilinde veya native sürümlerle geçiş değil.

Geliştirme Electron ve gerçek paketli Windows/Linux'ta altı yeni model
ailesi/offline/reload+eski akışlarPASS,renderer0. İlk yerel runtimefetch
başarısızlığı pinned45.3.2checksum ile doğrulanmış mevcutcache'le aşıldı.
Webtestleri Chromium'dur; Firefox/WebKit/Edge/Safari marka/cihaz kombinasyonları,
fiziksel Android,temiz Windows kurulumu/portable taşıma ve iki native sürümle
veri koruyan güncelleme NOT TESTED. Emülasyon fiziksel cihaz sayılmaz.

Gizlilik49metinyolu/8845bilinenözelID+URL karşılaştırmasında0eşleşme;
özelPDF/binary/anahtar yok. Kilit yalnız iki kök sürüm alanında değişti;
bağımlılık/marka/Aionvarlıkları aynı. Son teslimdoccommit yalnız5belge değiştirir.

# 0.9.2 kabul kaydı

Kaynak9825e32960a712c81dcb6861c7386189d7a8d2ae Vercel production READY;
normalTLS version0.9.2 ve index/sw/version yerel/canlı SHA256 eşitliği PASS.
CI43627576911 verify126unit/101browser PASS (5,1dk); canlı43627628221
aynı9825e32 kaynağında101/101 PASS (5,7dk). CI43627576911 dört iş de PASS;
paketli Windows/Linux offline/yeniden başlatma/deneme/timer/reset mevcut smoke
akışları PASS, rendererErrors0. Android build ve imza/manifest komutları PASS.
Release43628665935 PASS; v0.9.2-alpha.1 draft değil,8 asset. Beş binary
başarılı43627576911 koşusundan yeniden derlenmeden yayımlandı. Tag ve
verified-run aynı9825e32; indirilen iki kanıt hash'i eşit,7 payload listesi.
Android0.9.2/code17/v2 signature PASS; beş büyük binary ayrıca yerelde
hash'lenmedi. Fiziksel Android/temiz kurulum/portable taşıma ve iki native
sürümle yükseltme NOT TESTED. Kapsamda açık doğrulanmış kusur yok.

Ayrı yerel origin/profilde gerçek0.9.1→0.9.2 SW update PASS: eski build
normalTLS/hash/revision ile doğrulandı; uygulamanın gerçek update düğmesi
kullanıldı. Eski nükleik kimlik/not/tamamlanma, soru taslağı, öğrenme+üç tekrar,
ayarlar ve sentetik legacy870bayt PDF/not/sayfa tam korundu. Yeni DNA/RNA
modeli ilk kez offline açıldı,16 H bağı/not/keşif reload kalıcı, XP25→25,
renderer0. Yalnız eski belge koşulu IDB'ye seed edildi; yeni gerçek özel PDF yok.
Bu web/yerel origin kabulüdür; fiziksel/native veya production profil geçişi değil.

Altı kaynaklı atölye:62 açıklama bölümü,31 çözümlü örnek,29 recall ve60 yeni
özgün soru. Önceki240 soru değişmezliği ve ilk58 çalışma başlığı sürekliliği
birim kabulüne eklendi. check/build ve126 birim PASS; son browser/yayın
sonuçları bu bölümün başında. İlk hedefli12 test11PASS;
ısıdaki gerçek320px iç taşma YKS-030 olarak korundu ve onarıldı.

Yerel tam101/101 browser PASS (6,8dk). Son scoped düğme boşluğu ve sürüm notu
derlemesinde check/build,126 unit ve12/12 yeni kaynak testi PASS (55,3s).
Kelime genişliği regresyonu font45px korunurken PASS; kabul sınırı gevşetilmedi.
Son kaynağın temiz CI tam101, canlı101 ve dört paket/verify işi yukarıda PASS.

Son derleme kopyasında17 manuel ölçüm ve gerçek düğme etkinleştirmesi PASS,
renderer0.320px büyük yazıda ısı270/270; tahmin metin alanı222px, en uzun
kelime202,54px, font45px.44 yol/8.845 özel kimlik+URL gizlilik kontrolü PASS;
752 bağımlılık kaydı değişmedi. Son kaynak/doküman kanıtları FORGE’de.

- YKS-030/Düşük: ısı range UA marjı client270/scroll272; scoped margin0 ile
  270/270. Belge320px, UI200/text150, font ve tolerans aynı kalır.
- YKS-031/Düşük: Lewis reset ve ısı eylemlerindeki yerel çıplak düğmeler ortak
  stile alındı. Tahmin düğmesinin yatay boşluğu büyük yazıda kelimelerin bütün
  kalmasını sağlar;45px metin küçültülmez. Reset gerçek adım4→1 değiştirir.

Otuz gerçek görünüm/durum incelendi. Temel bilimsel sonuçlar görsel yanında
normal HTML olarak verilir. Seçimler ve notlar çevrimdışı saklanır; model
etkileşimi öğrenme/XP/tamamlanma oluşturmaz. Yeni sorular kendi köklerindeki
bilgiyle çözülebilir. Kaynak sınırları SOURCE_REVIEW, geçmiş kusurlar FORGE’de.
Paket/ci/canlı kabulü fiziksel cihaz veya native sürüm geçişi yerine sayılmaz.

# 0.9.1 son teslim kabulü

Paket e1b8150 / CI43622440349:96unit,89browser,Win/Linux/Android dört iş PASS.
Son ölçüm kaynağı cc88e28 / public43623257610:89/89 PASS,5,2dk. Ek CI43623231137
verify96/89 PASS. Aradaki fark yalnız test ve kayıt; uygulama dosyaları aynıdır.
İlk iki public88/89 ve ilk CI88/89, save-onayı ve ayrı rect örnekleme hataları
FORGE’de saklanır. Son iki onarım kabul sınırını veya timeout’u değiştirmez.
Production0.9.1 READY, üç runtime hash’i eşit; release43623370247 sekiz asset
ile yayımlandı, Android code16/v2 ve indirilen iki kanıt hash’i PASS.
Beş büyük binary ayrıca indirilmedi. Fiziksel cihaz/temiz kurulum/portable taşıma
ve iki native sürümle yükseltme NOT TESTED. Kaynak sayfaları SOURCE_REVIEW’dedir.

# 0.9.1 yerel kabul

Başlangıç cfe0db0 + çalışma diff’i: check/build,96/96 unit,89/89 browser PASS
(5,5dk). Dört yeni kaynaklı dersin normal giriş/gerekçe/gerçek SVG değişimi,
offline kalıcılık ve320px UI200/text150/reduced-motion/axe iki yeni kabulü PASS.
390/1440px gerçek görseller incelendi. Eski paragraf/TODAY/tekrar/timer/reset ve
sınav regressions PASS. Bağımlılıklar eski kayıtlarla birebir aynı; kilitte yalnız
iki kök sürüm alanı0.9.1 oldu. Yeni sorular5seçenekli, kendi kökleriyle çözülür;
kimya branş havuzuna katılır. Öğrenci kaydı/XP keşif ile değiştirilmez.
Kaynak sınırları SOURCE_REVIEW; dağıtım/paket sonucu FORGE başına eklenecek.

# Quality evidence

## 0.9.0 paket kabulü / canlı dağıtım

Published web43613106471, normal production HTTPS:87/87 PASS (5,0dk).
Test kaynağı eb188d6 ve uygulama/paket b92b2b5 arasındaki fark yalnız teslim
dokümanlarıdır. Yerel87/CI87/public87 ayrı PASS; runtime hash eşitliği korunur.

Son production Vercel dpl_HVAerBa5W5bAocHakgZqKwM5e6X6/da4c2ec READY,
HTTPS version0.9.0. Üç runtime hash'i kabul edilen yerel derlemeyle eşit;
önceki manuel kota hatasından sonra GitHub bağlantılı dağıtım gerçekleşti.
Yeni canlı87test43613106471 PASS.

Release43612877695 PASS, v0.9.0-alpha.1 draft değil;8asset yayımlandı.
Tag/verified-run doğru b92b2b5 başarılı CI43611757852 kaynağı; indirilen iki
kanıt hash'i eşleşti, checksum listesi7payload. Android code15/name0.9.0/v2PASS.
Beş büyük binary ayrıca yerelde hash'lenmedi. Son canlı version.json0.9.0;
Vercel READY, yeni canlı kabul yukarıda ayrı izlenir.

Kaynak b92b2b52be5f5a08b9238b565f73b6998481b65a; CI43611757852 dört iş PASS.
Temiz npm ci/check/build,94 birim ve87 browser (4,2dk). Windows/Linux gerçek
paketli süreçte offline ders/not/kağıt/soru, exam deadline/sonuç, timer ve reset
PASS; renderer0. Android üretim ve signature/manifest komutları PASS.
YKS-023–029 ve önceki ilgili regresyonlar PASS. Fiziksel cihaz/temiz kurulum,
portable taşıma/native sürümlerle güncelleme NOT TESTED.

Gerçek0.8→0.9 yerel web SW update PASS: önceki kabul hash'leriyle doğrulanan
eski build ve kabul edilmiş yeni build, uygulamanın Settings update düğmesi.
Taslak/not/ayarlar/öğrenme kayıtları/PDF baytları tam korundu; yeni kağıt ilk
kez offline açıldı, reload ve paragraf devam PASS, renderer0. Bu üretim veya
native-paket geçişi değildir; önkoşul NOT TESTED kaydının yerini aldı.

İlk manuel Vercel talebi API402 günlük100deploy kotası/retry86400s verdi;
yerel CLI alternatifi yoktu. İlk0.8.0/BLOCKED kaydı, sonraki GitHub dağıtımı
READY ve gerçek0.9.0/hash kontrolüyle güncellendi. Tam zaman çizgisi FORGE'de.

## 0.9.0 son yerel kabul

**YKS-029/Kritik/package-lock:** ilk uzak CI43611497875 temiz kurulumda
source-map-0.9.0 HTTP404. Uygulama sürüm etiketi değişimi iki dependency sürümüne
ve üç sürüm aralığına taşmıştı. Tüm ortak dependency kayıtları doğrulanmış tabana
geri alındı; PDF.js kaldırılması ve kök uygulama0.9.0 korunur. Ayrı boş cache ile
npm ci PASS (680paket/16s); son check/unit/build ve yeni uzak paket koşusu gerekir.

check/build,94/94 birim ve87/87 Chromium tarayıcı PASS;87 test5,5dk’da çalıştı.
YKS-023–028 ve önceki ilgili regresyonlar PASS. Ayrı exam4/4 ve son Electron
offline/restart/deadline/sonuç/reset akışı PASS; rendererErrors0. Normal/büyük
yazı ve iki temada320/844/1440px sınırları gerçek görüntü ve DOM ile kontrol edildi.
16 erişilebilir rotada akademik yükleme kontrolü yok. Altı yeni React bileşeni
kaynak incelemesinde yeni kusur bulunmadı. Gizlilik/diff kontrolü PASS.
İlk son-kabul başlatmasında kurulu Chromium yolu verilmediği için testler tarayıcıyı
açamadı; ortam ayarı düzeltilerek aynı87testin tamamı geçti. CI/canlı/paket sonuçları
FORGE başındaki güncel yayın kaydında ayrıca belirtilecektir. Fiziksel Android,
temiz Windows kurulumu/portable taşıma ve iki native sürümle yükseltme NOT TESTED.

İlk uzak CI43600766700 verify72unit/73browser PASS; yeni native timer testinde
19:… beklenirken20:00 okundu. Gerçek azalmayı ve pause kayıt sonucunu bekleme,
kayıtlı deadline’ın süreçler arasında tam eşitliği eklendi; yerel tekrar PASS.
İlk public43600807364:72/73, ilk offline PDF canvas30s süre aşımı; yeni public
iz kaydıyla tekrar çalıştırılır, neden henüz geçici ağ diye sınıflandırılmaz.

0.8.0 son yerel kabul:72 unit, check/build,73/73 Chromium PASS. İki yeni
kusur YKS-021/022 aynı koşullarda PASS; diğer önceki regresyonlar korunur.
Geliştirme Electron yeniden başlatma/offline/kum saati/reset PASS, renderer0.
Güncel yayın/paket/canlı sonuçları FORGE başında ayrıca gösterilecektir.

0.8.0 teslim kaynağı b08c9c1: [CI43601785473](https://github.com/kaansavukduran/yksmania/actions/runs/43601785473)
72unit/73browser ve dört iş PASS. Paketli Windows/Linux offline, yeniden
başlatma, kayıtlı timer son zamanı/pause/reset PASS; rendererErrors0.
[Public43601821513](https://github.com/kaansavukduran/yksmania/actions/runs/43601821513)
73/73 PASS; ilk offline PDF11,1s. İlk72/73 koşusundaki PDF30s tekrarlanmadı;
PDF kodu ve test timeout'u değiştirilmedi, ilk sonuç kayıtta korunur.
Release43602680263 v0.8.0-alpha.1'i8 asset ile yayımladı. Android code14/name0.8.0
v2 imza ve indirilen iki kanıt hash'i doğrulandı. Beş büyük binary yerelde
ayrıca hash'lenmedi; verified-run doğru başarılı main kaynağını gösterir.
YKS-021/022 ve ilgili önceki regresyonlar PASS; açık doğrulanmış kusur yok.
Fiziksel cihaz/temiz kurulum/portable taşıma/native yükseltme NOT TESTED.
Gerçek iki web build'iyle0.5.3→0.8.0 veri koruma ayrı PASS. Tam iz FORGE başında.

## 0.9.0 — kullanıcı materyal yüklemeden öğretim ve deneme

Hedef başlangıçead659b + yerel diff. Yeni ürün kararıyla akademik PDF/katalog
UI testleri hazır kağıt/yerleşik model/gerçek soru/offline kayıt testlerine
çevrildi; eski dosya baytları ve notlar IDB üzerinden korunur. Kayıt yedeği
ithali isteğe bağlıdır, ders sağlamanın önkoşulu değildir.94 unit/check/build
ilk PASS. İlk tam85testte79PASS,6FAIL; test seçicileri ve aşağıdaki taşma
nedenleri ayrıldı, ilk sonuçlar saklandı. Son tam sonucun yeri FORGE başıdır.

- YKS-023/Orta/Exams:320px UI200 text150 uzun başlık belge325px.
- YKS-024/Orta/shared dialogs: UAmaxwidth224px, içerik309/321px; yazar maxwidth
  ve copywrap ile288/286px, tanı yatay taşma0. Reset de aynı kusurdan etkileniyordu.
- YKS-025/Orta/Exams: iki saatlik sayaç+ikon belge331px; satırlar ve kontrollü
  saat ayırma ile320px. Font boyutu veya erişilebilir süre metni küçültülmez.

Aynı gerçek giriş/bounds/activation/failure/offline/reset denetimleri final build'de
tekrarlanacak.87test toplanır: yeni clock/dialog/reset büyük yazı dokunmatik ve
yatay erişim, gerçek5/10soru kaydı, sekiz derinleştirilmiş model, sözcük parçaları,
kanıt atölyesi ve deneme cevap/flag/net/expires/missingdata/failedwrite/recovery.
Aion32kare/zemin/pointer, Today son gerçek skor, 1/3/7/21 ve özerk ayarlar korunur.
Yerel geliştirmeElectron offline+exam snapshot/deadline/restart/reset ilk PASS;
gerçek paket/CI/canlı sonuçları ayrı kaydedilir. Fiziksel Android ve temiz kurulum
bu yerel/emüle testlerin yerine sayılmaz. Kaynak okuma/fiziksel sınırlar FORGE'de.


Sonraki tam kabul85/86: tablo klavye odağı YKS-028/Orta bulundu; adlandırılmış
focusableregion ve gerçek ArrowRight→scrollLeft>0 koşulu eklendi. YKS-026/Orta
yeni elektrik alan metnindeki F'yi elektriksel kuvvet diye netleştirir;
YKS-027/Düşük soru-only/boş-bank içeriklerin yanlış arama kartını engeller,
aynı hedefli test onarım öncesi FAIL. Son tam build testleri buna göre tekrarlanır.

## 0.8.0 — kalıcı kum saati, güvenli sıfırlama ve eski web istemcisi

Başlangıç main `7cfb5b7c0287f0a0d4730c5ce3b4c3792797a206` + çalışma diff'i.
72 unit, ilk odaklı 7/7 browser PASS. Gerçek 0.5.3 → 0.8.0 service-worker
uygulaması yarım yanıtı/notu korudu, offline yeniden açıldı; rendererErrors 0.
Fallback padding 1→33px; bu mevcut YKS-016'nın eski istemci regresyon kontrolü.
TYT/AYT kökleri yukarıda (YKS-010), paragraf beş soruda tam metin (YKS-015),
Today skor ve tekrar ilişkileri mevcut kabulde korunur. Yeni doğrudan güncelleme
düğmesi kayıt bitmeden etkinleşmez. Kullanıcının 0.5.2 cihazına bağlanılmadı.

**YKS-021 / Orta / StudyTimer + style.css:** Yeni süre paneli 320px ve
UI%200/yazı%150 açık temada dakika sözcüğünü harf harf kırıyordu. Menüye
normal dokunmatik giriş ve gerçek görüntüde gözlendi; başlangıç ölçümü 41px
kullanılabilir genişlik < 130,08px sözcük genişliği, FAIL. Sütun sayısı gerçek
metin alanına göre uyarlanır, rem kenar boşluğu piksel sınırına çekilir;
fontlar korunur. Aynı ölçüm ve ciddi/kritik axe, yatay/dikey/offline kayıt
regresyonları son teslimde ayrıca raporlanır. Taşma kontrolü tek başına yeterli
olmadığı için okunabilir sözcük alanı kabulü eklendi.

**YKS-022 / Orta / ResetProgress + style.css:** Yeni sıfırla düğmesi320px,
UI%200/yazı%150 Ayarlar'da sağ sınır346,13px ve belge genişliği346px yaptı.
Mevcut planning dar-ekran regresyonu FAIL; tek taşan öğe DOM ile doğrulandı.
Dekoratif ikon kaldırıldı, düğme ve yatay boşluğu kart genişliğiyle sınırlandı;
ölçekler korunur. Aynı mevcut test son sürümde tekrar çalıştırılır.

Son yerel onarım: YKS-021 için alan248px >= sözcük130,08px, root32px ve
text-scale1,5 korunur. YKS-022 için belge320px, taşan öğe0; iki aynı regresyon
2/2 PASS. İkinci tam kabul72/73; yeni padding testi kayan sayfada farklı
zamandaki iki rect’i karşılaştırmıştı. Tek DOM örneklemiyle aynı18px sınırı
korundu,3/3 tekrar PASS; son tam kabul yeniden çalıştırılıyor.

Yeni senaryolar: timer 05:00 → 04:00, durdur, 10dk geçir, aynı kalan, sayfa
geçişi, devam et, bitiş/offline, 1/5/10/20 ve özel120 sınırı; sentetik disk
hatasında önceki süre. Onay/vazgeç ve sentetik disk hatasında ilerleme sıfırlama;
gerçek 5/5 soru geçmişi, gerçek sentetik iki sayfalı PDF, not ve ayarların
korunması. Geçmiş öğrenme kayıtları test profiline aittir; gerçek kullanıcı
verisi sıfırlanmaz. JSON ithaliyle eski şema varsayılan timer eklenmesi sınanır.

Selçuklu/elektron/paragraf gerçek ders girişleri, iyonun çizimiyle toplamın
birlikte değişmesi, worked example, offline keşif, vektör ders logoları,
ağaç kök ve padding kontrolleri eklenir. Güncel tam CI/public/paket sonuçları
FORGE başındaki son teslim kaydında gösterilir; fiziksel Android, temiz Windows
kurulumu, portable taşıma ve iki native paketle yükseltme NOT TESTED.


## 0.7.0 — YKS-018 / YKS-019 / YKS-020 ve yeni cebir anlatımları

Son kaynak `d88f332`: [CI43594722140](https://github.com/kaansavukduran/yksmania/actions/runs/43594722140)
67 unit / 69 browser ve tüm dört iş PASS. Paketlenmiş Windows/Linux yeni
cebir ve offline/restart akışları PASS, rendererErrors 0. Android code13/name0.7.0
v2 imza PASS. [Public43594788583](https://github.com/kaansavukduran/yksmania/actions/runs/43594788583)
69/69 PASS; release43595550431 v0.7.0-alpha.1'i 8 asset ile yayımladı.
Yerel son tam koşu 69/69 (4,8dk); gezinme beklemesi üç tekrar 3/3 PASS.
YKS-020 genişlik denetimi PASS: gerçek 320px görünümde 250px okuma alanı,
32px root font ve 1,5 text-scale korunur. Fiziksel cihaz/temiz kurulum/güncelleme
NOT TESTED; ayrıntılı kaynak, kanıt hash kapsamı ve teslim kaydı FORGE'dedir.

Denetlenen başlangıç: main `730b37297fda2fcde70c838bb96c021119b442be`.
Remote fetch ve dal uçlarıyla eşleşmesi doğrulandı. Önceki 0.6.0 teslimindeki
YKS-015/016/017 senaryoları korunur; bu turdaki gözlemler ayrı kaydedilir.

- **YKS-018 / Orta:** Konu Anlatımı → Matematik → Rasyonel sayılar → Payda 3.
  Gerçekte `1/3 = 0,333` görünüyordu; yaklaşık sonuç kesin eşitlik gibi öğretiliyordu.
  1440px Chromium/Linux, Türkçe, varsayılan ölçek ve klavye/fare yolunda
  odaklı test başlangıçta FAIL. Yuvarlama gerektiğinde ≈ ve açıklaması gösterilir;
  1/4 gibi kesin sonlu sonuçta = korunur. Aynı test onarım sonrası PASS.
- **YKS-019 / Düşük:** Aynı rehberde İçindekiler'i klavyeyle açıp bir bölüm seçince
  sayfa kayıyor fakat odak eski görünmez düğmede kalıyordu. Aynı ortamda
  `toBeFocused` başlangıçta FAIL. Paylaşılan rehber gezinmesi hedef h2'ye odağı
  taşır; başlıklar yalnız programlı odak alır, Tab sırasına eklenmez. Aynı test PASS.
- **YKS-020 / Orta:** Yeni cebir modelinin görsel incelemesinde, 320px ve
  %200 arayüz/%150 yazıda iç içe rem yan boşluklarının okunabilir alanı 144,8px'e
  indirdiği gözlendi. Taşma denetimi tek başına bunu yakalamıyordu. Aynı koşuldaki
  en az 220px içerik alanı testi başlangıçta FAIL. Küçük ekranın ana içerik,
  ders/soru kartı ve şema yan boşlukları ekran genişliğine göre sınırlandı;
  font ve kullanıcının iki ölçeği korunur. Yeni test bunları ayrı ayrı ölçer.
  Yeni modelde tanımsız renk değişkeni de mevcut accent token'ına bağlandı;
  deneme noktası açıklaması renk dışındaki konum bilgisini de kullanır.

Son küçük ekran düzeltmesi sonrası ilk odaklı koşu 4/5 geçti: rehber gezinme
testi hash geçişi tamamlanmadan section sayısını anlık okudu (0). Hata anından
sonraki snapshot doğru hücre rehberini gösteriyordu. Test artık seçilen konunun
gerçek h1'ini bekleyip aynı kapsam denetimini yapar; beklenti azaltılmadı veya
timeout uzatılmadı. Tekrarlı ve tam son koşu sonuçları FORGE'de kaydedilir.

Yeni kabul: normal ders girişinden genişletilen yedi rehberin model ve çözümlü
örneği; yeni denklemin dönüşümleri, sıfır katsayı ve offline yeniden açılması;
eşitsizlikte yön/açık-kapalı sınır, gerçek emüle tap, 320px %200 arayüz/%150 yazı,
844×390 yatay görünüm, offline kayıt ve ciddi/kritik axe kontrolü. Notlar altta
kalır; keşif ders tamamlanması veya XP üretmez. İlk odaklı 5/5 browser PASS;
67 birim testi ve ilk check/build PASS. Tam son sürüm/paket/canlı sonuçları
güncel FORGE kaydında ayrıca belirtilir.

Bu turda AIONIA canlı v1.7 standardı yeniden okundu; karakter, atlas veya dünya
sanatı değiştirilmedi. Sanat regresyonları tam tarayıcı kabulünde korunur.
Fiziksel Android ve temiz Windows kurulum/güncelleme burada test edilmiş sayılmaz.

Target 0.7.0 alpha. This file is updated at the verified Forge checkpoint.

Previous 0.6.0 delivery: application/package source `c05291f`;
[CI 43590369220](https://github.com/kaansavukduran/yksmania/actions/runs/43590369220)
passed 64 unit and 64 browser tests plus all Windows, Linux and Android jobs.
Both packaged desktop applications passed offline/reload/process-restart flows
with zero observed renderer errors. Android code 12 / version 0.6.0 / v2
signature verified. Release `v0.6.0-alpha.1` contains five packages and three
evidence files from that successful build. The full published-origin acceptance
passed 64/64 at `95978b0`; subsequent source/build-only changes produced 27
byte-identical runtime/version assets. See the current FORGE entry for provenance,
the two locally checked evidence hashes and platform checks still unverified.

## 0.5.3 ağaç yönü

TYT ve AYT kökleri üstte; ders düğümleri aşağıya açılır. Mevcut YKS-010
kontrolü iki kökün de bütün ders düğümlerinden yukarıda olduğunu ölçer.
Klavye/ders seçimi, gerçek konu/soru bağlantıları ve320px büyük yazılı offline
regresyonu korunur. Yerel45unit/50browser ve public43582897828:50/50 PASS.
Koyu/açık masaüstü ve390px mobil SVG görüntüleri görsel incelendi.
Paket/yayın doğrulamasının son durumu FORGE.md içindedir.

## Automated acceptance

- Unit tests: ordinal review dates, year/leap boundaries, closed days, all-days
  unavailable, overdue capacity, duplicate saves and XP, undo and retained history.
- Storage tests: settings independence, unfinished draft, invalid backup and date,
  unknown topic/option references, original PDF bytes and untouched learning state.
- Browser tests: normal lesson → hint/error → save → reload → undo; full offline
  reload and completion; blocked dates; Turkish UI and legacy en-US compatibility,
  Lexend, 200% UI + 150% text on 390px;
  corrupted backup; keyboard scale control; serious/critical axe issues.

## Observed regressions during development

- YKS-001: duplicate unhashed atlas URL in Workbox precache threw before cache
  installation; first render worked while offline reload failed. Removed duplicate
  include list and narrowed immutable-cache matching to genuinely hashed assets.
  The offline reload regression must pass before release.
- YKS-002: select label lookup ambiguity and visible/accessibility-name mismatch.
  Added explicit matching labels and preserved visible brand/language text.
- YKS-003: extreme narrow-screen scale overflow. Fix layout wrapping rather than
  hiding overflow, reducing the user's scale or clipping actions.

## Platform matrix

Browser automation is Chromium on Linux. Mobile viewports emulate layout/input;
they are not physical Android devices. Electron Linux, Windows clean installation,
physical Android, Firefox, Edge, Safari and native update migration are individually
reported in the current Forge checkpoint. No WCAG certification is claimed.

## Content limits

Nine interactive lessons / forty-five original questions in 0.2.0. No official score, national rank,
year-specific complete syllabus or full-source import claim. Content volume and
mastery are different. XP is discovery feedback, not academic assessment.

## Historical 0.1.0 checkpoint — 2026-11-13

| Check | Observed result |
| --- | --- |
| TypeScript, production build | PASS locally and GitHub CI |
| Domain/storage suite | 12 tests PASS |
| Browser acceptance | 9 tests PASS locally; also on published HTTPS origin |
| Published origin | https://yksmania.vercel.app — [acceptance run](https://github.com/kaansavukduran/yksmania/actions/runs/43466580212) |
| Packaged Windows application | PASS on Windows GitHub runner: offline 5/5 lesson, reload, process restart, zero observed renderer errors |
| Packaged Linux application | PASS locally and Ubuntu GitHub runner for the same flow |
| Backup portability | PASS: completed lesson exported, restored in an empty browser profile, retained through reload |
| PDF offline | PASS: first open after disconnect, text extraction, note and reload |
| Layout | Inspected desktop dark/light and settled 390px mobile; 200% UI + 150% text interaction in automated test |
| APK | PASS: API 24 minimum / target 36, com.fragaria.yksmania 0.1.0, APK v2 signature verifies; physical installation remains untested |

The published acceptance run checked application code at `59894d7`. Later changes
up to `9f83cc4` update build tooling, release automation and one test synchronization;
they do not change the application bundle. The final package run is recorded in
FORGE.md and in the release's `verified-run.json`.

The first run of the updated calendar test reloaded immediately after optimistic
rendering, before IndexedDB finished. The test now waits for the actual saved status;
five consecutive local runs passed. Critical session completion already waits for
durable storage before showing success. Ordinary settings/drafts show saving/error
state; wait for the saved indicator before closing or exporting.

Local browser checks against the public origin were blocked by the execution
machine's proxy CA trust. HTTPS certificate checks were not disabled. The separate
GitHub runner performed the full published-origin acceptance instead.

Still unverified: physical Android, Windows installer/portable launcher on a clean
machine, package-to-package updates, portable directory relocation, PDF and JSON
sharing on Android, device-specific WebView compatibility, screen readers,
non-Chromium browsers, and every Linux distribution. Packaged executable automation
is distinct from testing the installer or the portable extractor. Debug APK signing
is distinct from a durable production signing identity.

A supplementary light-theme axe check found no serious/critical violations and one
moderate `landmark-unique` issue. Give repeated complementary landmarks distinct
accessible names in the next accessibility pass; the alpha is not fully audited.


## 0.2.0 regression and content evidence

- YKS-004: source-periodic buttons concatenated visible spans without spaces, while
  accessible names had spaces. Axe reported serious label-content-name-mismatch.
  Explicit text spacing now matches the visible/accessibility names; preserve the
  new visual-flow axe regression.
- YKS-005: at 390px, 200% UI, 150% text and English, intrinsic grid sizing and the
  long word “parallelograms” produced page overflow. Grid children now shrink,
  the single-column track is minmax(0,1fr), and long headings/control labels wrap.
  No content was clipped and the selected scale was not reduced.
- Cell route, actual diagram taps, plant/animal differences, saved selection,
  original question completion, ion identity, all 118 element buttons, physical
  polygon translation, conserved area, offline reload and reduced motion are
  covered through normal UI entry points.
- Old database v1 fixture: answer choice, draft note and original PDF retained after
  database v2 upgrade. New exploration/reading-position fields default safely.
- Local real-source check: complete private catalogue accepted; all 143 PDFs imported
  with zero per-file failures. A 92.8 MB MEBİ biology book opened offline, displayed
  page 56 text and reopened at page 56 after reload. Learning session count stayed 0.
  This private test uses disposable local browser storage, not CI uploads.
- All 143 prepared PDFs opened in a PDF parser; 4,989 total pages. This is file
  integrity/page-count evidence, not item-by-item or answer-key verification.
- Nine diagrams opened at 390×844 with zero renderer exceptions or page overflow
  at default scale. Desktop screenshots and representative mobile views inspected.
  High-scale and contrast coverage is separately recorded in the acceptance suite.
- Cartoon Aion: all eight authored frames share measured foot baseline y458. Runtime
  actor-box and reduced-motion regression are separate from this source measurement.

Package, published-origin and complete final test counts are recorded in FORGE.md.
The final 0.2.0 package CI passed on all four jobs; the published production origin
also passed all 19 browser acceptance tests. Both Windows and Linux packaged
executables passed offline lesson/reload/process-restart checks with zero renderer
errors. The Android APK's signature and manifest passed verification.
Physical Android, clean Windows installation/portable extraction and two-package
update preservation remain unverified. No full WCAG certification is claimed.

## 0.2.1 — YKS-006: notes must not narrow teaching content

Source: user report and screenshot, 2026-11-13. At 1440px the theory notes occupied
the right-hand column and reduced the space available for the diagram and text.
The question notes were already below the question panel; that behavior is retained.

Root cause confirmed: the shared `.study-layout` defined two columns above 1200px.
It now has one full-width track at every breakpoint, with the existing notes after
the article in both DOM and visual order. Redundant breakpoint overrides were removed.
No saved-data fields or note handlers changed.

Regression: `YKS-006 notes stay below full-width theory and questions and retain edits`
in `tests/e2e/app.spec.ts`. The same test failed on the old 0.2.0 layout at 1440px
(notes y277.19 while the article ended at y1592.38), then passed after the repair.
It checks theory widths 1440/1280/1024/390/320 and question widths 1440/390/320,
actual note editing, reload, and continuing to question 2 with the note retained.

Local PASS: check, 20 unit/storage/content tests, production build and 20 browser
tests. Chromium 156.0.8078.79 on Linux; Turkish default scale plus the existing
English 200% interface / 150% text regression. Dark/light screenshots inspected at
1440×1000 and 390×1000, zero renderer errors. At 1440px the article uses the entire
1108.81px content row; at 390px it uses the entire 361.22px row. Notes follow the
article and neither view has horizontal page overflow. Native and published-origin
results for this version are recorded in FORGE.md when observed; prior release
evidence above is historical and is not evidence for a new binary.

Additional local PASS: Electron on Linux, explicitly sized to a 1440×1000 content
window, gives the article the entire content row with notes after it. Offline note
editing survives reload and process restart in a disposable task profile. This is
local desktop-shell evidence, separate from remote packaged binaries and physical
device/installer verification.

Remote 0.2.1 PASS: package CI run 43487684984, all four jobs; 20 unit/storage/content
and 20 browser tests, Windows/Linux packaged offline lesson/reload/process restart,
and Android signature/manifest verification. Published-origin run 43487744351 also
passed 20/20 browser tests, including the new layout/note regression. Release source
and publication evidence are recorded in FORGE.md.

## 0.2.2 — YKS-007: Turkish-only product language

Source: explicit user decision, 2026-11-13. Turkish is now the sole product language.
Language switches and selectors, English UI messages, lesson/question translations,
visual-board translations and English element names were removed. The loading and
failure screens, navigation labels, PDF controls and number/date formatting remain
Turkish even on an English-language device. User-authored notes, source PDF contents
and filenames are preserved.

Compatibility: the stored state/backup shape and lesson/question IDs are unchanged.
Valid old `en` preferences normalize to `tr`; the load path persists that normalization.
Unknown locale values still fail validation. The v1 database fixture now starts with
an English preference and verifies persisted Turkish locale, retained answer/draft
note and original PDF after the database upgrade. Backup normalization is separately
covered by storage tests. Original review dates and other settings are untouched.

The one-time content projection check compared all Turkish lesson/cell labels,
question IDs, option order, correct-answer indexes, hints, explanations and source
labels against the prior commit. All were unchanged; no educational rewrite was
mixed into translation removal. Previous English UI acceptance was replaced with
the same Turkish settings/learning actions, preserving narrow-screen 200% UI / 150%
text, Lexend, keyboard access, reduced motion and persistence checks.

At 390px with 200% UI / 150% text and Lexend, the Turkish update-check button caused
428px page overflow. Settings buttons now wrap within their panel without changing
font/scale or clipping. The settings regression checks page geometry and actually
activates the update check, then continues into a lesson and question session.

`YKS-007 English device language still opens Turkish-only UI and retains the user's text`
uses a fresh en-US browser context and exercises settings, practice, user-authored
English text, selected answer and reload. That compatibility test does not reintroduce
English as a supported UI language. Final local, deployed and package results are
recorded at the 0.2.2 Forge checkpoint; earlier version evidence above is historical.

Local and GitHub package CI 43491193602: PASS, 21 unit/storage/content and 21 browser
tests; Windows/Linux packaged offline/reload/process-restart tests and Android
debug APK signature/manifest verification passed. Production web publication is
BLOCKED by Vercel's daily deployment limit (GitHub Vercel status requests a retry
in 24 hours). The public origin remains 0.2.1. A new production-origin suite was
not run against the older site and is not claimed as a 0.2.2 pass. Retry deployment
and production acceptance after the limit clears; do not change plans or hosting
destinations to work around the quota without user direction.


## 0.3.0 — kaynak kontrollü AYT görselleri

Dört MEBİ dosyasından 12 sayfa yakın okundu. Kaynak/sayfa, kavram, varsayım ve
20 özgün cevap kontrolü SOURCE_REVIEW.md içinde. Sayısal model testleri sağ/sol
türev ve köşe, SI birimleri/işaret/ters-kare, toplam derişimin korunumu/katalizörün
zaman ölçeği ve DNA tamamlayıcılığına bakar. Kaynak incelemesi bütün arşivin madde
ve cevap anahtarı denetimi değildir.

YKS-002 ailesi yeniden yakalandı: select etiketine seçenek metinlerinin katılması
seçici adını belirsizleştiriyordu. Fonksiyon ve başlangıç karışımı kontrollerine
görünen etiketle aynı açık erişilebilir ad verildi. Katalizör modeli yayın öncesi
kavram denetiminde düzeltildi: seçim zamanı sıfırlar, başlangıçtan beri katalizörlü
ayrı koşulu karşılaştırır; mevcut karışıma ekleme anında derişim sıçraması göstermez.
Denge sınırı sonlu zamanın yuvarlanmış sonuçlarından ayrı sunulur.

Yeni beş kabul testi, her modelin değişkenlerini normal kontrollerden değiştirir,
dört özgün seti 5/5 tamamlar ve kaydı doğrular. İlk açılış çevrimdışı, 320px,
%200 arayüz / %150 yazı, azaltılmış hareket ve ana içerikte ciddi/kritik axe
kontrolleri PASS. Yeni soruya geçerken eski taslağı değiştirme onayı korunur;
test normal onayı kabul ederek ilerler. Eski ders, PDF, taslak, İngilizce cihazdan
Türkçe açılış, notların altta kalması ve tekrar takvimi regresyonları da PASS.

Yerel toplam: 25 birim/depolama/içerik + 26 tarayıcı testi. Chromium
156.0.8078.79/Linux; dört modelin koyu 1440×1000 ve açık 390×1000 durumlarının
sekiz ekran görüntüsü incelendi. Sayfa yatay taşması yok, Notun anlatımdan sonra,
renderer hataları 0. Bu ölçümler fiziksel cihaz kanıtı değildir.

Electron Linux genişletilmiş otomasyonu dört yeni modeli çevrimdışı açar, öğrenme
kaydı oluşmadığını kontrol eder, önceki dersi tamamlar, yeniden yükler ve süreci
yeniden başlatır. DNA keşif adımı korunur; renderer hataları 0. Windows/Linux
paket CI, Android imza/manifest ve gerçek web yayını sonuçları FORGE.md içinde
ayrı kaydedilir. Temiz kurulum/portable taşıma, fiziksel Android, üretim imzası ve
iki sürümlük native güncelleme açık kapılardır.

Canlı 0.3.0: published-web kabul koşusu 43503377912, 26/26 PASS. Vercel
üretim dağıtımı dpl_5L7aa779UHEyqZaqBa8gLVdSsDHj ve kaynak 1dc5d44 eşleşir.
Önceki 0.2.2 kota engeli bu yeni otomatik dağıtımda gözlenmedi. Paket ve yayın
sonuçları FORGE.md teslim kaydında tutulur. Paket CI 43503304731 dört işte PASS:
25 birim/depolama/içerik, 26 tarayıcı, Windows/Linux paketli dört AYT modeli ve
çevrimdışı/yeniden başlatma, Android debug APK imza/manifest kontrolü. Masaüstü
renderer hataları 0; fiziksel cihaz ve temiz kurulum açık kapıları aynen kalır.

Yayın koşusu 43504471113 PASS: v0.3.0-alpha.1 beş native dosya ve üç kanıt dosyasıyla
herkese açık. Etiket/verified-run.json kaynak 1dc5d44 ile eşleşir; indirilen kanıtların
hash değerleri checksum listesiyle eşleşir. Android versionCode 5 / versionName
0.3.0 / minimum API 24 ve APK v2 imzası doğrulandı. APK indirme adresi HTTP 200.
Ayrıntılar ve alpha sınırları FORGE.md ile RELEASE_ALPHA.md içinde.


## 0.3.1 — YKS-008: kopya kağıtları ayrı bölümde

Kaynak: kullanıcının 2026-11-13 ekran görüntüsü ve menü sırası isteği. Baseline
eb5ab16: yeni menü öğesini arayan normal gezinme regresyonu FAIL (beklenen sıra 2,
gerçek index −1). Eski ders/soru kartları 479 ayrıntılı başlığı ve cheatsheet türü
PDF’leri birlikte listeliyordu. Yeni /cheatsheets bu başlıkları ders/konu olarak
listeler; ortak visibleIn filtresi cheatsheet türünü diğer iki bölümden çıkarır.

İki yeni kabul akışı gerçek UI’den katalog/PDF içe aktarır. Katalogdaki konu
kimliği dosya adından farklı olsa bile doğru konuya bağlanır; başka dersin veya
mixed türünün PDF’si yeni bölümde görünmez. Konu PDF’si çevrimdışı açılır; notu
yeniden yükleme sonrası korunur. İçe alınmayan dosya çevrimdışı PDF gibi sunulmaz.
Mevcut soru seçimi/notu ve sıfır tamamlanmış oturum yeni bölümden dönüşte korunur.
Katalogsuz manuel cheatsheet dosyası tam başlık adına göre bulunur. Ek bir model
testi açık konu kimliklerinin önceliğini, Unicode adını ve kısmi sözcük reddini sınar.

320px, %200 arayüz / %150 yazı kabulünde 477px taşma gözlendi. Arama alanının
14rem minimum genişliği ve grid’in intrinsic minimumu doğrulandı. Arama alanı
artık daralabilir; tek sütun minmax(0,1fr), konu kartı min-width:0 ve başlıkları
satıra kırılır. Yeni bölümde çift yatay iç boşluk kaldırıldı. Aynı test dosyayı
gerçekten açar, ciddi/kritik axe kontrolü yapar, arama/kapama/boş sonuç ve AYT
geçişini kullanır; yazı/ölçek azaltılmaz. Fiziksel cihaz doğrulaması değildir.

Son yerel, canlı web ve native paket sonuçları FORGE.md teslim kaydında tutulur.

Yerel 0.3.1 PASS: check/build, 26 birim/depolama/içerik ve 28 tarayıcı kabul testi.
Chromium 156/Linux koyu 1440×1000 ve açık 390×1000 ekran görüntüleri incelendi;
yatay taşma yok, renderer hataları 0. Mobil büyük ölçek/yazı, çevrimdışı ilk giriş,
manuel PDF açma ve ciddi/kritik axe kontrolü PASS. Electron Linux yeni bölüm ve
önceki offline/reload/process-restart akışları PASS, renderer hataları 0.

0.3.1 canlı web kabulü BLOCKED: Vercel günlük dağıtım sınırı yeni kaynak yayınına
izin vermedi; GitHub durumu 24 saat sonra deneme istiyor. Canlı site 0.3.0.
Eski kaynağa karşı koşu çalıştırılıp yeni sürüm PASS diye sunulmadı. Native paket
ve yerel kontroller ayrı ilerler; nihai sonuçlar Forge teslim kaydına eklenir.

Ek mobil Chromium dokunma emülasyonu: 390×844 → 844×390 → 390×844; arama metni
ve açık konu korunur, normal tap ile açılıp kapanır, sayfa taşması ve renderer
hatası yok. Fiziksel telefon, ekran okuyucu veya gerçek klavye açılışı kanıtı değildir.

YKS-008 çoklu arama: “asit” sorgusunda üç ders görünürken tek bir “Dersteki tüm
kopya kağıdı PDF’leri” düğmesi üç kaynak listesini de açıyordu. Gerçek UI baseline:
3 ders / 3 kaynak tarayıcısı. Düğme artık aktif dersi de seçer; ek kabul adımı
3 arama sonucu / 1 açık ders / 1 kaynak tarayıcısı bekler. İlk 43507301865 paket
koşusu son düzeltme öncesidir; nihai kaynak ve paket kanıtı Forge’da ayrılır.

Sonraki 3f3cb54 kaynağının otomatik üretim dağıtımı dpl_JBh2d7qbX56PY8g65ZFKju5LLkJM
READY; kanonik /version.json 0.3.1. Önceki kota engeli bu kaynakta gözlenmedi.
Canlı kabul 43509055312 bu yeni kaynağı doğrular; önceki 0.3.0 testleri kullanılmaz.

Canlı 0.3.1 kabulü 43509055312: 28/28 PASS; kaynak 3f3cb54 ve READY üretim dağıtımı
ile eşleşir. Nihai native paket koşusu 43508957418 ve indirme yayını Forge teslim
kaydında ayrı tutulur; eski paket koşusu son düzeltmeyi içermez.

Nihai paket CI 43508957418, kaynak 3f3cb54: dört işte PASS. 26 birim/depolama/
içerik ve 28 tarayıcı testi; Windows/Linux paketlerinde cheatsheets, AYT ve
çevrimdışı/reload/process-restart PASS, renderer hataları 0. Android debug APK
imza/manifest doğrulaması PASS. Fiziksel cihaz ve temiz kurulum açık kapıları
korunur; bu otomasyonlar üretim imzası veya iki paket arası güncelleme kanıtı değildir.

Yayın koşusu 43510112404 PASS: v0.3.1-alpha.1 sekiz dosyayla herkese açık.
Etiket/verified-run.json kaynak 3f3cb54 ile eşleşir; indirilen kanıt hash değerleri
checksum listesiyle eşleşir. Android versionCode 6 / versionName 0.3.1 / minimum
API 24 ve APK v2 imzası doğrulandı. Herkese açık APK bağlantısı HTTP 200.

## 0.4.0 — YKS-009 / 010 / 011

YKS-009: iki hedef ve kalıcı konu ilerlemesi. Birim testleri kapsayıcı gün sayısı,
çakışan/yinelenen kapanışlar, artık yıl, geçmiş/kapalı/tamamlanmış plan, seyrek
çalışma dağıtımı, aynı gün sabit hedef, geri alma, eski kayıt ve soru/anlatım
ayrılığını doğrular. Normal UI testleri İngilizce cihaz dilinde Türkçe gün/ay/yıl,
tarih değiştirme, yanlış ABD tarihini reddetme, hafta günü + tek tarih kapatma,
479 tarihlenmiş sıra, kaydetme hatası/yeniden deneme ve çevrimdışı geri alma içerir.

YKS-010: tek ders grafiği, tüm 15 satır, TYT solda/AYT sağda, klavye ile ders seçme,
gerçek konu ve soru dallarından bağımsız kayıt, oyunlaştırmadan bağımsız kullanım.
Axe, SVG dekoratif harflerle erişilebilir ad uyuşmazlığını yakaladı; adlar görünür
sembol ve ders metnini içerir, metin araları açıkça ayrılır. Ciddi/kritik kontrol
aynı normal akışta tekrar edilir. Bu tam WCAG veya ekran okuyucu sertifikası değildir.

YKS-011: 32 kareli PNG tarayıcıda gerçekten çözülür; ayak piksel ölçümü metadata
ile birleşerek kaynak taban çizgilerini doğrular. Bu, dünya konum ölçümünden
ayrıdır. Tıklama tepkisi değişimi, bitiş/idle, fare yönü, sabit actor box ve azaltılmış
hareket test edilir. Mobilde eski 12.5rem sahnede 240px kare karakterin ayakları
kırpılıyordu; aktör mevcut yüksekliğe sığar. 320px geometri regresyonu bunu korur.

Beş OGM şeması seçeneklerini normal kontrollerle değiştirir, her özgün seti 5/5
bitirir; atom modelinin ilk çevrimdışı yüklemesi, seçim/yeniden yükleme ve ciddi/
kritik axe kontrolü yapılır. Electron otomasyonu beş yeni görseli ilk çevrimdışı
kullanır, konu kaydını yapar ve süreç yeniden başlayınca 1/479 grafik kaydını,
önceki AYT keşfini ve tamamlanmış soru oturumunu doğrular. Eski ders/PDF/taslak/
yedek/not/tekrar regresyonları korunur. Son test sayıları ve gerçek paket/web
kaynak eşleşmeleri FORGE.md teslim kaydında tutulur.

Dar ekran denetimi ek kusur yakaladı: 320px / %200 UI / %150 yazıda Bugün
sayfası 510px genişliyordu. Özetin üç intrinsic grid sütunu ve today-grid’in
1fr min-content alt sınırı neden oldu. Özet uygun sütun sayısına, alt paneller
minmax(0,1fr) sınırına geçer; hafta günleri sığmadığında satıra geçer. Yazı veya
ölçek küçültülmedi, içerik gizlenmedi. Aynı gerçek ayar/plan/ağaç akışı onarımdan
sonra PASS; Bugün/Dünyam 320px, Ayarlar 321px (yuvarlama toleransı 1px).

Kaynak koruma kontrolü eski content.ts modülünü HEAD’den ayrı yükledi ve mevcut
13 anlatım / 65 sorunun bütün eğitim alanlarıyla birebir aynı kaldığını doğruladı.
AYT ders renkleri bilerek ayrıştırıldı; soru kimlikleri/anahtarları değiştirilmedi.

Bir yerel tam koşuda 36/37 test geçti; PDF testinin serviceWorker.ready bekleyişi,
aynı anda dist yeniden oluşturulduğu için kurulum sırasında zaman aşımına uğradı.
Bu koşu tam PASS olarak sayılmadı. Dağıtım dosyaları sabitlendikten sonra PDF
regresyonu ayrı tekrar edilir; nihai kaynağın tüm testleri CI’da yeniden çalışır.

Ek süreklilik regresyonu: uygulama gece boyunca açıkken gün en geç bir dakika
sonra, arka plandan dönüşte odak/görünürlük olayıyla yenilenir. Plan ve takvim
aynı gün kaynağını kullanır; geçmiş çalışma tarihleri değiştirilmez. Gece yarısı
kabul testi saat dilimini açıkça UTC seçer, 14 → 15 → 16 Kasım geçişini sınar.
PDF’nin sabit dist üzerindeki ayrı tekrarları PASS; testin önkoşulu service worker
kurulumunun gerçekten tamamlanmasıdır, zaman aşımı büyütülerek örtülmedi.

Nihai sabit yerel uygulama derlemesinde tam koşu 38/38 PASS (3 dakika). İlk uzak
CI 43521938654 iki katalog akışında yanlış giriş seçti: Ayarlar ve kaynak sayfası
aynı JSON accept değerine sahip. navigate hashchange ile asenkrondur; test dosyayı
eski Ayarlar ilerleme-yedeği input’una verebiliyordu. openSources yardımcı akışı,
katalog input’una geçmeden “Kaynak dosyaları” h1’ini bekler. Süre aşımı veya
ürün doğrulaması gevşetilmez; uygulama kodu bu düzeltmede değişmez. Bu eski CI
koşusu yayın/paket kanıtı sayılmaz; yeni kaynakla tüm işler yeniden çalışır.

Kaynak girişindeki iki regresyon, yeni h1 bekleyişiyle üçer kez tekrarlandı:
6/6 PASS. İlk published-web koşusu 43522084035 de eski test kaynağıdır ve nihai
web doğrulaması yerine geçmez. Takvim günlük süresinin tekrar yerleşimine ait
olduğu, yeni konuların uygun gün hesabıyla dağıtıldığı arayüzde açıklandı.

İlk düzeltilmiş published-web 43522891459: 37/38 PASS, son kaynak girişleri artık
geçti. Kalan not testi de aynı ayrılan/gelecek sayfa kontrolü sorunuydu: start
henüz soru paneli açılmadan dönüyordu; teori ve soruda aynı adlı Notun alanı var.
Soru paneli açıkça beklenir; not beklentisi ve çevrimdışı kayıt doğrulaması korunur.
Bu tek regresyon yerelde 3/3 tekrar PASS. Native Linux ve Android kontrolleri
ayrı ilerler; eski public koşu tam PASS sayılmaz, yeni tüm canlı koşu gerekir.

Nihai CI 43523758199: dört işte PASS, 35 birim + 38 tarayıcı. Windows/Linux
paketli plan/konu kaydı, beş OGM görseli, offline/reload/process restart PASS,
renderer hataları 0; Android debug imza/manifest PASS. Canlı koşu 43523965580:
38/38 PASS. Web uygulama kaynağı 0101829, son test kaynağı 66539f0; uygulama
alt ağaçları birebir aynı. Son test-only commitinin Vercel dağıtımı kota nedeniyle
oluşmadı; bu durum ve hash karşılaştırması FORGE.md içinde açıkça kaydedildi.
Quota aşma/manuel dağıtım denemesi yapılmadı. Fiziksel cihaz ve installer/update
kontrolleri açık kalır. Release dosya doğrulaması teslim kaydına eklenir.

Yayın 43524926879 PASS: v0.4.0-alpha.1 public/prerelease, sekiz dosya. Tag ve
verified-run.json 66539f0 ile eşleşir; indirilen iki kanıtın SHA-256 değerleri
checksum listesiyle aynı. Android 7/0.4.0, minimum API 24 ve v2 imza doğrulandı;
public APK adresi HTTP 200. Büyük beş binary ayrıca yerel hash kontrolü için
indirilmedi. Tam teslim ve web/app test kaynağı ayrımı FORGE.md içindedir.

## 0.5.0 — TYT mathematics, local verification

TypeScript and production build PASS. Forty unit/storage/content tests PASS;
44/44 browser scenarios PASS on the fixed final build (2.4m). Chromium
156.0.8078.79 / Node 24.22.1 / Linux. The five new models each support normal
control changes and five independent question responses, retained offline reload,
320px / 200% interface / 150% text / light / reduced-motion interaction and
serious/critical axe checks. A landscape resize returns to portrait with selections
intact. No new database schema or translation was introduced. Static math components
are lazy-loaded; React checklist reviewed, no new dependency or global handler.

YKS-012, observed during this iteration: the new prime-divisor SVG reserved height
for many rows even for a single row. On the pre-fix new-lesson build, the regression
measured 385.23px height where the single-row bound was <169.21px and failed.
The viewBox now follows the row count; the zero-book factorial omits an empty SVG,
and the unpaired consecutive sum uses a shorter viewBox. The geometry assertion
and all 44 browser scenarios pass after repair. This was a defect in the newly
authored diagrams, not a reproduced defect in the earlier 0.4.0 release.

All five dark 1440×1000 and light 390×1000 activities visually inspected, including
the compact prime repair; page widths equal viewports and renderer exceptions 0.
Local Electron Linux opens all five math activities for the first time offline;
49=7×7 evidence survives reload/process restart. Existing AYT, PDF, notes, question,
review, chart, Aion and plan regressions pass; desktop renderer exceptions 0.
A direct old/current module comparison preserved the previous eighteen lessons
and ninety questions including IDs, options, hints, keys and explanations.

Remote package and live-web evidence is recorded below and in FORGE.md.
These automated passes do not establish physical Android, Windows clean
installer/portable relocation, production signing or two-version native updates.

0.5.0 live acceptance: run 43567601148, 44/44 PASS (3.8m) on the canonical HTTPS
origin. Both test source and READY production deployment use bd95c5ddf89eaed78445710dbea91b2f45517e23;
/version.json reports 0.5.0. No code-subtree equivalence workaround was needed.

0.5.0 remote package CI 43567554549: all four jobs PASS. Forty unit tests and
44 browser scenarios (1.9m); packaged Windows/Linux offline/reload/process restart
including all five mathematics activities and retained prime evidence, renderer
errors 0. Android APK signature/manifest step PASS. This is executable automation,
not a clean installer/portable relocation or physical Android test.

Release 43568202257 PASS: public prerelease v0.5.0-alpha.1, eight assets. Tag and
verified-run.json match bd95c5d. Two downloaded evidence hashes match SHA256SUMS;
large native binaries were not all downloaded and rehashed locally. Android
versionCode 8 / versionName 0.5.0 / minimum API 24 / APK v2 signature verified;
public APK download HEAD is HTTP 200. Signing/physical-device/update gates remain.

## 0.5.1 — YKS-013: daily completion and question results

Source: the user's Today screenshot and four-of-five Simya report. User data was
not read from the device. Baseline: normal synthetic UI flow on the old 0.5.0 build,
mark Simya studied, finish 4/5, return to Today; the expected completed daily row
is absent and the new acceptance test FAILS. Static cause confirmed: daily rows
came only from remaining plan.items and contained no Session result. Screenshot
CSS viewport is unknown; reproduced on desktop Chromium/Linux before the repair.

Daily rows now retain today's completed topics and question attempts alongside
remaining assignments, without changing eligible-day math or study order. Latest
complete saved attempt supplies score, never a sum or best attempt. Zero is valid;
partial sessions and manual external work do not invent a score. Both cards and
full-order rows show result/date, optional independent/hint counts and a link to
the saved result. A question-only history is not silently relabeled theory;
explicit compact topic completion is available on Today and remains undoable.

Local check/build and 41 unit tests PASS. Four focused normal-UI tests PASS (22.7s):
4/5 with durable theory, offline reopening/result link; old question-only history,
failed-write/retry and explicit theory mark/undo; 0/5 latest attempt and session
undo restoring 4/5; external manual questions on a blocked day with no invented
result. At 320px / 200% UI / 150% text / light, real mark/undo/result controls work,
page width <=321px and serious/critical axe violations 0. The first development
run of the latter tests used an incorrect text-size accessible name and expected
an extra theory step after Result → Yeniden çalış; these harness assumptions were
corrected to the existing normal UI. No product assertions/timeouts were relaxed.

The previous YKS-009 browser assertion expected completed rows to disappear. It
now expects five visible rows (one completed, four pending in order), while the
underlying plan's four remaining assignments are unchanged. Existing independent
record tests remain. Native Linux validates a completed Simya row and the saved
rational-question score after process restart; renderer errors 0. Final full-suite,
remote package, visual and live deployment evidence is recorded in FORGE.md.

Final local browser run: 48/48 PASS (2.8m), same fixed 0.5.1 bundle. All old
forty-four scenarios remain. Dark/light 1440×1000 and 390×844 daily cards inspected,
normal-width score/completion/actions readable; actual page widths 390/390 and
320/320, visual-flow renderer exceptions 0. A tall locator screenshot showed an
apparent skip-link overlay. Live bounds before/after capture proved it hidden
(bottom −199.06px, unfocused); this is not recorded as a product defect. Added
large-scale hidden-link geometry plus actual Tab → Enter → main focus checks,
focused rerun PASS (11.7s). No skip-link CSS change was made from the screenshot.

Live 0.5.1 acceptance 43569397941: 48/48 PASS (3.8m). The canonical origin and
test suite both use 776f62c1603d9af7b37dbdf5fdbbee6c49f569d7; deployment
dpl_2a1omXD7s6HJosPdx6LzBZiirp2r READY, /version.json 0.5.1. No code-subtree
substitution or tests against an older deployment were used.

Remote package CI 43569363475: all four jobs PASS, 41 unit tests, 48 browser
scenarios (2.0m). Windows/Linux packaged executable checks include visible daily
theory completion and the saved five-of-five question result after process restart,
offline reload and old regressions; renderer errors 0. Android debug APK
signature/manifest PASS. Physical devices, clean installer/portable relocation,
production signing and two-version native updates remain NOT TESTED.

Release 43570014722 PASS: v0.5.1-alpha.1 public/prerelease, eight assets from the
successful package run without rebuilding. Tag and downloaded verified-run.json
match 776f62c. Two small evidence-file hashes match SHA256SUMS; five large native
binaries were not all downloaded and rehashed locally. Android 9 / 0.5.1 / API24 /
v2 signature verified; public APK HEAD HTTP 200. Native physical/signing/update
gaps above remain open. Documentation-only handoff changes do not alter app code.

## 0.5.2 — YKS-015: metinsiz paragraf sorusu

Kullanıcı bildirimi: “Metnin ana düşüncesi nedir?” sorusunda metin yok;
son cümleye atıf yapan ipucu da kullanılamıyor. 0.5.1 / 9cf8a65 yerel yapısında
Sorular → TYT → Türkçe → Paragrafta ana düşünce normal girişiyle FAIL tekrarlandı.
Beş soru aynı, yalnız konu anlatımında bulunan metne bağlıydı; Study yalnız soru
kökü ve seçenekleri çiziyordu. Cümle keşfindeki farklı paragraf da aynı özgün
metin kaynağına bağlandı.

Onarım: Question.passage seçili sorunun tam metnidir; Study bunu soru kökünden
önce çizer. Ders gövdesinin tamamı cevap ipuçlarıyla birlikte soru ekranına
kopyalanmaz. Soru kimlikleri, cevap anahtarları ve kayıt şeması değişmez. Mevcut
115 soru metni/ipucu/seçeneği bağımsız bağlam açısından okundu. Türevde A–B
koordinatları; elektrik alanında noktasal kaynak ve sabit ortam; denge modelinde
A⇌B ve başlangıç; iki atom sorusunda Rutherford/altın levha/alfa bağlamı açıklandı.
Bu kontrol bütün gelecekteki içeriğin hatasızlığı veya resmî soru doğrulaması değildir.

Kalıcı kontrol: soru metninde/ipucunda dış metne açık atıf varsa passage gerekir;
mevcut renderer’ın desteklemediği şekil/grafik/tablo atıfları CI testini durdurur.
Elle okuma ve gerçek ekran kabulü bu sözcük kontrolünü tamamlar. Kesirlerdeki
“kaç parçaya” ifadesi paragraf atfı sayılmaz. Yeni medya türleri payload ve renderer
birlikte eklenmeden hazır soru olarak yayımlanmamalıdır.

Yeni mobil kabul sırasında 320px, %200 arayüz, %150 yazıda seçenek içindeki flex
metninin küçülemeyip yatay taşması gözlendi. min-width:0 ve sözcük sarma;
dar ekranda tek sütun seçenek, uyarlanan boşluklarla giderildi. Yazı veya kullanıcı
ölçeği küçültülmedi; metin gizlenmedi. Yerel/native/canlı sonuçlar FORGE.md’de
ayrı kaydedilir. Fiziksel Android/ekran okuyucu kontrolü ayrıca yapılmalıdır.

0.5.2 teslim kanıtı: [CI43580314183](https://github.com/kaansavukduran/yksmania/actions/runs/43580314183)
45unit/50browser ve paketlenmiş Windows/Linux paragraf offline/restart kabulü PASS;
Android v2 imza/code10/name0.5.2 PASS. [Public43579996297](https://github.com/kaansavukduran/yksmania/actions/runs/43579996297)
50/50 PASS; [release43581051297](https://github.com/kaansavukduran/yksmania/actions/runs/43581051297)
8asset yayımladı. Yerel HTTPS tarayıcı yolu proxyCA nedeniyle BLOCKED; TLS
kontrolü kapatılmadı. İlk CI49/50 sonucu ve testin durable kayıt beklemesi
FORGE.md’de korunur. Fiziksel cihaz/kurulum/güncelleme NOT TESTED kalır.


## YKS-016: konu içi kaynak ve okunabilir anlatım

Kaynak:14.11.2026 kullanıcı ekranı. Soru-kaynak kartındaki başlık, satırlar ve
eylemler kenarlara dayalıydı. Kök neden doğrulandı: topic-study üzerinde
container padding eksikti. Responsive iç boşluk eklendi; eşdeğer kontroller
hizalandı. Kopya kağıdı menüsünü kaldırıp konu başlığına taşıma en yeni
açık kullanıcı kararıdır; eski YKS-008 kayıtları tarihsel davranıştır.

Gerilemeler: yeni learning-depth3test PDF içe aktarma, sayfa/notun offline
reload ile korunması, başarısız içe aktarmada önceki dosyanın kalması,
sahte ilerleme olmaması, kart geometrisi ve gerçek soru sonucu→ÖSYM
kaynağı akışını kapsar.320px %200UI/%150metin, gerçek emüle tap ve axe
denetimi vardır. Yanlış kitapçık hash ile reddedilir. Eski /cheatsheets
bağlantıları ve soru taslakları korunur.

Gözlenen ek kusurlar: (1) büyük yazıda header düğmesi335px min-content ile
320px sayfayı taşıyordu; span/grid ile yeniden akış düzeltildi. (2) eski
bağlantıya geçerken açık mobil menü içeriği örtüyordu; hash değişimi menüyü
kapatır. (3) visual-lab SVG boyut kuralı Lucide oklarını da büyütüyordu;
şema ve simge seçicileri ayrıldı. (4) dikey şema bağlantıları düğüm
etiketinden geçiyordu; yandan kıvrılan bağlantıya alındı. Mevcut anlatım
testleri küçük simge boyutu ve gerçek SVG yol örneklerinin etiket kutularını
kesiştirmemesi denetimini içerir. Elektron adımındaki molekül piktogramı
e⁻ sembolüyle düzeltildi.

0.6.0 son koşu ve dağıtım durumları FORGE.md içindedir; tarihsel test
sonuçları bu sürümün kabul sonucu sayılmaz.


## YKS-017: Windows modül çözümleme çakışması

0.6.0 ilk Windows build'inde TS1149/TS1261 doğrulandı: büyük-küçük harfle
ayrılan NarrativeModels.tsx ve narrativeModels.ts, Linux'ta geçmesine rağmen
Windows TypeScript çözümlemesinde çakıştı. Saf hesap modülü
narrativeCalculations.ts adını aldı;4kullanıcı import'u güncellendi.
check-module-paths.mjs uzantısız kaynak yollarını case-insensitive denetler;
check/build girişlerine bağlandı. Aynı eski kusuru içeren geçici örnekle
reddetme kontrolü PASS; mevcut85kaynak modülü PASS. Hesapların davranış
testleri korunur. Windows paket sonucu son Forge kaydında belirtilir.
