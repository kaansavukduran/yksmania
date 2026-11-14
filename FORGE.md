# 0.10.0: 20 kapsamlı ünite, yayın kabulünde

Yetkili proje /workspace/yksmania, dal forge/twenty-units; başlangıç
f3b06134061d7937c3e38e8c9530b0d4b4944284. Yeni sürüm0.10.0/code18.
Canlı/paket durumları uzak kabul tamamlandığında bu bölümün başına eklenecek.

Kullanıcının istediği20 ünitenin tamamı, doğrulanmış sıranın59–78 başlıkları:
5 matematik,5 fizik,2 kimya,2 biyoloji,3 Türkçe,3 tarih.189 ayrıntılı bölüm,
91 çözümlü örnek,92 recall ve200 özgün5seçenekli soru eklendi. Önceki300
sorunun tamJSON kimlik/metin/pasaj/şık/ipucu/açıklama/anahtar eşitliği PASS.
Toplam86 anlatım/58 rehber/88 kağıt/500 soru; ilk78/479 hazır. Akım kağıdının
önceden incelenmiş örnekleri yeni dersle birleştirildi; bu yüzden20 ders,
19 yeni kağıt sayımı vardır. TYT karma105/AYT karma25 ve11 branş seti;
120/80 tam dağılım veya bütün arşiv tamamlandı iddiası yok. Sıradaki79:
Sayı Problemleri/detail-210. Özel komutlar etkinleştirilmedi, Türkçe ve mevcut
Windows/Linux/Android/web kapsamı ve onaylı ikonlar/Aion32kare korunur.
Canlı AIONIA standardı tekrar okundu:v1.7. Kaynak sınırları SOURCE_REVIEW'dedir.

Yeni200 anahtar ve91 örnek bağımsız ikinci incelemeden geçti. Yayımdan önce
kanıtlanan ve onarılan bulgular:

| Kimlik | Önem | Belirti ve onarım |
| --- | --- | --- |
| YKS-032 | Orta | Sevgi/Umut kişi adı-duygu belirsizliği; açık duygusal bağlam ve regresyon |
| YKS-033 | Orta | Matematik topic eşlemesi ters; ilk entegrasyon Mutlak Değer0ders FAIL, doğru lesson→topic ile10/10 ilgili kabul PASS |
| YKS-034 | Orta | Parantezsiz−2⁰ sayısal−1/SVG+1 çelişkisi; çizim ve açıklama−1 ile tutarlı |
| YKS-035 | Orta | r0 açık sınır merkez noktasıyla dolu görünüyordu; işaretler ayrıldı, gerçek açık uç kontrolü |
| YKS-036 | Orta | Elektroskop sorusunda ikinci belirsiz seçenek; kökte açık nötr başlangıçla çeldirici ayrıldı |
| YKS-037 | Orta | Protein kapalıyken aktif pompa SVG'de vardı; gerçek protein/ATP koşulları ayrıldı |
| YKS-038 | Orta | Dipol ok başı atomla örtülüyordu;33uç geometrisi ve gerçek H₂O/NH₃/HF görüntüleriyle açıklık doğrulandı |
| YKS-039 | Düşük | Metin boşluğu düzenlemesi CSS class'ı bölmüştü; yalnız class düzeltildi, API/state kimlikleri korundu |
| YKS-040 | Orta | Molecular SVGmarker ve select aynı ID; gerçekDOM label.control=null. Kontrol '-bond-choice' ile ayrıldı, AT/uniqueID regresyonu eklendi |
| YKS-041 | Düşük | Türkçe ilişki ikonunda↳ tofu; mevcut lucide vektörüyle iki dekoratif ikon onarıldı |
| YKS-042 | Düşük | Orantı12 tick ve x ekseni birleşiyordu; tick sağ uca hizalandı, gerçekBBox boşluk kabulü eklendi |

Yerel check/build ve192/192 unit PASS. İlk yeni41 browser35PASS/6FAIL:
üç Türkçe testinin SVG varsayımı erişilebilir HTML parça diyagramına düzeltildi;
sıfatın dönüşüm sırası gerçek Ada bağla→Fiile bağla akışına uyarlandı;
r0'da iki eş uç yerine bir ayrı açık uç beklendi. Açık uç/merkez ayrımı,
gerçek görselDOMdeğişimi, sonuç, offline ve noXP koşulları gevşetilmedi.
Son tam142/142 browser PASS (9,7dk). Bu koşudan sonra yalnız YKS040/041/042
UI yamaları eklendi; son derlemede check/build,192 unit ve41/41 etkilenen
browser tekrar kabulü PASS(2,8dk). Label binding/benzersizID,vectorikon ve
BBoxayrımı yeni koşulları da geçti. Son frozen source yerel kabuldedir.

Geliştirme Electron offline/yeniden başlatma/not/soru/deneme/timer/reset ve
altı yeni ders ailesinin gerçek menüden ilk offline açılışı+model değişimi+
reload PASS, renderer0. İlk deneme eksik Electron runtime fetch başarısızdı;
pinned45.3.2 paket checksums değeriyle eşleşen mevcut cache kullanıldı.
Bu geliştirme kabulü paketli Windows/Linux veya fiziksel cihaz yerine sayılmaz.

Manuel ilk66 durum+son45 ek durum; belge/lab/kontrol geometrisi ve renderer0.
Yeni alan keşifleri session/review/topicProgress değiştirmedi. Kimya12ekdurum
ve30viewport görseliyle negatif yön okları/δ etiketleri gerçekten incelendi.
YKS040/041/042 son4model/16durum görsel ve gerçek labeltap kontrolü PASS;
oran12/x etiket aralığı320px büyük yazıda9,74CSSpx. Toplam127 manuel ölçüm
ve bağımsız12 kimya durumu,0renderer/taşma. Kök tüm72distdosyasının manuel
veSWkopyalarında byte eşitliğini ayrıca doğruladı.
Gerçek0.9.2→0.10 yerel webSW geçişi PASS; son UI yamalı kopyayla aynı tam
state/legacy870bayt/checkedtaslak/noXP kabulü tekrar PASS: tam eski snapshot
eşit, üç yeni model ilk offline açılış/reload,XP25→25,renderer0. İlk başarılı
kopyanın kanıtları da korundu. Son geliştimeElectron6aile/offline/reload
ve eski deneme/timer/reset kabulü tekrar PASS; renderer0.

Fiziksel Android, temiz kurulum/portable taşıma ve iki native sürümle
veri koruyan yükseltme NOT TESTED. Chromium emülasyonu fiziksel cihaz değildir.

---

# 0.9.2 yayımlandı — altı kaynaklı etkileşimli atölye

Uygulama kaynağı `9825e32960a712c81dcb6861c7386189d7a8d2ae` main'e gönderildi.
Vercel production `dpl_919iZQfVUcjyRKEM1cKN9g2ynykY` aynı kaynakta READY;
normal HTTPS version0.9.2. Canlı index/sw/version SHA256 değerleri kabul edilmiş
yerel derlemeyle birebir aynı. Temiz CI43627576911 verify126/101 PASS (5,1dk);
[canlı43627628221](https://github.com/kaansavukduran/yksmania/actions/runs/43627628221)
aynı9825e32 kaynağında101/101 PASS (5,7dk). CI43627576911 dört iş de PASS:
verify, Windows, Linux, Android. Paketli Windows/Linux offline ders/not/kağıt,
soru taslağı/gerçek skor, yeniden başlatma, sınav snapshot/sonuç, timer ve reset
mevcut smoke akışları PASS; rendererErrors0. Android APK build ve imza/manifest
komutları PASS. Bu fiziksel cihaz veya iki native sürüm geçişi değildir.
[Release43628665935](https://github.com/kaansavukduran/yksmania/actions/runs/43628665935)
PASS; [v0.9.2-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.9.2-alpha.1)
draft değil,8 asset:5 binary ve3 kanıt. Başarılı43627576911 main koşusunun
dosyaları yeniden derlenmedi. Tag ve verified-run aynı9825e32 kaynağında;
indirilen iki kanıtın hash'i SHA256SUMS ile eşleşti,7 payload listesi mevcut.
Android versionName0.9.2/code17/v2 signature PASS. Beş büyük binary ayrıca
yerelde indirilip hash'lenmedi. Kaynak/canlı/paket kabulünde açık doğrulanmış
kusur yok; fiziksel/native geçiş boşlukları aşağıda korunur.

Son teslim kaydı yalnız FORGE/README/CONTENT_COVERAGE/QA/RELEASE_ALPHA
dokümanlarını değiştirir; doğrulanan uygulama, test ve paket kaynağı9825e32
aynıdır. Bu doküman değişikliği için uygulama testleri tekrar çalıştırılmadı.

Gerçek0.9.1→0.9.2 web SW güncellemesi ayrı yerel origin/profilde PASS: normal
TLS ile eski production42dosyası/7revision doğrulandı, uygulamanın kendi
Güncellemeleri kontrol et → Güncelle ve yeniden aç akışı yeni worker'ı etkinleştirdi.
Eski nükleik kimliği/not/tamamlanma, soru taslağı/notu, öğrenme+üç tekrar ve
ayarlar korundu. Sentetik eski870bayt PDF metadata/not/sayfa/byte eşitliği PASS;
bu tek legacy koşulu IDB'ye seed edildi, gerçek özel PDF kullanılmadı. Yeni
DNA/RNA modeli ilk kez offline açıldı;16 H bağı ve yeni not/keşif reload ile
korundu, XP25→25, renderer0. Yeni53manifest kaydı/51tekil dosyada revision ve
finaldist byte farkı0. Bu fiziksel/native yükseltme veya production profilinde
güncelleme değildir; eski favicon iki404, gerekli dosyalarda eksik istek yok.

Başlangıç c4ab5ab75d2a71e3a98db7bfb5c8d32c08901512. Dünya Gücü Osmanlı,
kimyasal türler/Lewis, ısı–sıcaklık, nükleik asitler, iyonik bağ ve iyonik bileşik
adlandırma işlendi. Beş yeni anlatım eklendi; mevcut nükleik asitler kimliği
korunarak genişletildi. Altı rehberde62 bölüm,31 çözümlü örnek,29 hatırlama
kontrolü ve60 özgün beş seçenekli soru var. Önceki240 sorunun kimliği, kökü,
seçenekleri, cevabı ve metni değişmedi. Toplam66 anlatım/38 ayrıntılı rehber/
69 yerleşik kağıt/300 özgün soru; doğrulanmış sıranın ilk58/479 başlığı hazır.
Sıradaki eksik başlık59: kovalent bağ, polar ve apolar bağ (`detail-155`).
Tüm Drive arşivi veya tam resmî dağılımlı denemeler tamamlandı iddiası yok.

Yedi tarih olayı/kanıt karşılaştırması,11 Lewis türü/elektron bütçesi,
enerji koruyan ısıl temas ve sıcaklık–enerji grafiği, DNA/RNA yapımı ve gerçek
bağ sayıları, iyon adedi/yük dengesi ve adım adım adlandırma modelleri eklendi.
Keşifler ayrı kaydolur; notlar/öğrenme/1–3–7–21 tekrarları korunur ve keşif
XP, ustalık veya tamamlanma sayılmaz. Nükleik asitler eski not anahtarı korunur.
Kaynak sayfa sınırları ve bilimsel düzeltmeler docs/SOURCE_REVIEW.md içinde.
AIONIA ana standardı canlı v1.7 ile karşılaştırıldı; logolar ve32 karelik Aion
paftası değişmedi. k44/Aionlaştır/aionia bu görevde etkinleştirilmedi.

İlk check/build ve126 birim PASS. İlk odaklı browser11/12: yalnız ısı atölyesi
320px UI200/text150 koşulunda client270/scroll272. YKS-030/Düşük: range
kontrolünün UA yatay2px marjı kaldırıldı; aynı durumda270/270. Kesme, font
küçültme veya kabul toleransı değişimi yok. YKS-031/Düşük: Lewis sıfırlama ve
ısı seçim/tahmin düğmeleri ortak düğme sınıflarına alındı. Gerçek320px büyük
yazıda tahmin eyleminin kelime ortasından kırılması, yalnız bu düğmenin yatay
boşluğu uyarlanarak düzeltildi;45px metin korunur. Son derleme/kabul ve uzak
yayın sonuçları bu bölümün başında kaydedildi.

Yerel tam101/101 browser PASS (6,8dk); son yalnız tahmin düğmesi yatay boşluğu
ve sürüm notu derlemesinde check/build,126/126 unit ve yeni kaynakların12/12
browser kabulü tekrar PASS (55,3s). Yeni kelime genişliği regresyonu da PASS;
320px UI200/text150 koşulunda font küçültülmeden bütün kelimeler sığar.
Temiz uzak kurulumun tam101 kabulü ve dört paket/verify işi de yukarıda PASS.

Son kopyalanmış derlemede17 manuel ölçüm PASS, renderer0: ısı270/270 ve tahmin
düğmesinde222px metin alanına202,54px en uzun kelime sığar;45px font korunur.
Lewis sıfırlama beş boyutta CO₂ adım4→1, C8→0, bağ0 olarak gerçek tıklandı.
44 değişen/yeni metin yolunda8.845 özel Drive kimliği ve URL’si0 eşleşme;
özel PDF/binary/anahtar veya değişen marka varlığı yok. Kilitte752 ortak
bağımlılık kaydı birebir aynı, yalnız iki kök sürüm alanı0.9.2 değişti.

İlk manuel inceleme altı modelde30 görünüm/durum: masaüstü koyu/açık,390px,
320px büyük yazı ve844px yatay. Belge yatay taşması yok; ısıdaki2px iç taşma
yukarıdaki onarımla giderildi. Nükleik alt zincir/yönleri HTML olarak da okunur;
termometre üst etiketi gösterdiği ölçekle100°C olarak eşleşir. Fiziksel Android,
temiz kurulum/portable taşıma ve iki native sürümle yükseltme NOT TESTED.

---

# 0.9.1 yayımlandı — doğrulanmış teslim

Uygulama kodu12e7431d3576fd3a1244cbab1f38a1b8c1726b5b; paket kaynağı
`e1b8150c4ff077716c9043b06241fc7af294cb06`. Sonraki cc88e28 yalnız test ölçümü
ve bu kayıt dosyasını değiştirir; uygulama dosyaları aynıdır.
[CI43622440349](https://github.com/kaansavukduran/yksmania/actions/runs/43622440349)
96 birim/89browser ve Windows/Linux/Android dört iş PASS. Yeni ölçümle son
CI43623231137 verify96/89 PASS; teslim paketleri önceki tamamen başarılı
43622440349 koşusundan yeniden derlenmeden yayımlandı.
[Canlı43623257610](https://github.com/kaansavukduran/yksmania/actions/runs/43623257610)
cc88e28 kaynağında89/89 PASS (5,2dk). İlk iki public88/89 nedenleri aşağıda
korunur; beklenti, timeout veya uygulama davranışı gevşetilmedi.

Vercel production dpl_6DTrXJDaHQFmYd3FXnFpXCCKYtUW/cc88e28 READY; version0.9.1.
Canlı index/sw/version hash’leri kabul edilmiş yerel derlemeyle birebir aynı.
[Release43623370247](https://github.com/kaansavukduran/yksmania/actions/runs/43623370247)
PASS; [v0.9.1-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.9.1-alpha.1)
draft değil,8asset:5binary ve3kanıt. Tag ve verified-run aynı başarılı e1b8150
main kaynağında. İndirilen iki kanıt hash’i eşleşti;7payload listesi mevcut.
Android0.9.1/code16/v2 signature PASS. Beş büyük binary ayrıca yerelde hash’lenmedi.
Paketli Windows/Linux offline/yeniden başlatma/sınav/timer/not/reset mevcut
smoke akışları PASS. Fiziksel Android, temiz kurulum, portable taşıma ve iki
native sürümle güncelleme NOT TESTED. Yeni görseller390/1440px incelendi;
yeni modeller320px UI200/text150, az hareket ve ciddi/kritik axe kabulü PASS.

61 anlatım/32 rehber/64 kağıt/240 özgün soru;4 yeni rehberde24 açıklama bölümü,
12 çözümlü örnek ve12 recall. İlk50/479 hazır. Karma90TYT/25AYT ve11branş;
tam resmî dağılım veya bütün Drive arşivi tamamlandı iddiası yok. Son kullanıcı
kararıyla logolar değişmedi, öğrenci materyal yüklemez. Sıradaki eksik başlıklar:
51 Dünya Gücü Osmanlı,52 kimyasal türler/Lewis,53 ısı–sıcaklık,54 nükleik asitler.
55 ATP mevcut; yeni kaynak işleme bu sıradan sürdürülmeli.

---

# 0.9.1 — dört periyodik kimya konusu

Son CI43622440349 verify96unit/89browser PASS. İlk public43621890680 aynı
save-onayı yarışında88/89; ikinci43622465069 yeni konular PASS, eski YKS-006
not sınırında88/89 (beklenen908,59375, ölçülen907,59375). İki viewport rect
ayrı zamanlarda ölçülüyordu; theory/notes/layout ve question/note tek DOM
örneğinde ölçülür. Sıfır toleranslı not-altında koşulu aynıdır. Aynı YKS-006
1440/1280/1024/390/320 senaryosu yerelde PASS. Trace artefact indirmesi403 ile
engellendi; konsol kanıtı saklandı, CSS normal akışta20px note marjı içeriyor.
Uygulama veya CSS değiştirilmedi; yeni public kabul gerekir.


İlk uzak CI43621833448:96unit/check/build PASS, browser88/89. Yeni
periodic-depth testi gerekçe görünür olur olmaz reload yaptı; Provider update
optimistic, IDB kaydı henüz bitmemişti. Test görünür .save-status kaydedildi
onayını bekler; aynı seçim+gerekçe offline koruma koşulu tutulur. Ürün davranışı
ve timeout değiştirilmedi. Onarım sonrası aynı2test yerelde PASS; yeni CI gerekir.


Başlangıç cfe0db0da56ee343db4da1a4c408ff7fb8ab9199. Son kullanıcı düzeltmesiyle
ikonlar aynen korundu; k44/Aionlaştır/aionia komutları bu tur etkinleştirilmedi.
MEBİ TYT Kimya basılı30–34 canlı metni ve Aurelia010–013 kağıtları s.2–3 okundu.
Sınıflandırma, atom çapı, İE, Eİ/EN/metalik karakter:4 ders,24 açıklama bölümü,
12 çözümlü örnek,12 recall,20 özgün soru;4 yerleşik kağıt otomatik türedi.
Toplam61/32/64/240; ilk50/479 kaynak başlığı hazır. Kimya branş seti yeni konuları
sırayla örnekler; önceki kayıtlı sınavların snapshot’ları değiştirilmez. Dört
model13 durumu kanıt/süreç/bağıl yarıçap/enerji sütunlarıyla gösterir. Keşifler
ayrı kayıtlıdır, XP veya tamamlanma oluşturmaz. Tüm arşiv tamamlandı iddiası yok.

Check/build ve96 birim PASS. Yeni iki browser testi PASS:4 dersin normal giriş,
model değişimi/gerekçe, offline reload kalıcılığı;320px UI200/text150/reduced
motion/klavye ve ciddi/kritik axe. Gerçek390/1440 görüntüleri incelendi;96 unit
ve ilk50 başlık sürekliliği PASS. Tam89/89 browser PASS (5,5dk). Yerel kanıt dizini:
/workspace/work/forge-periodic. Paket/canlı sonuçları tamamlanınca eklenecek.

Sürüm npm version ile güncellendi; bağımlılık kilidinde yalnız iki kök sürüm
alanı değişti. Özel kaynak kimliği/PDF/indirilen içerik depoya eklenmedi.

---

# 0.9.0 — Vercel ve indirilebilir paketler yayımlandı

[Canlı43613106471](https://github.com/kaansavukduran/yksmania/actions/runs/43613106471)
87/87 PASS (5,0dk), normal production HTTPS üzerinde. Test kaynağı eb188d6,
uygulama kaynağı b92b2b5 ile aynı; aradaki fark yalnız teslim dokümanları.
Yerel87, temiz CI87 ve canlı87 ayrı ayrı PASS. Üç runtime hash'i yerel/canlı
birebir eşleşir. İçerik57 anlatım/28 ayrıntılı rehber/60 kağıt/220 özgün soru;
sıranın ilk45/479 başlığı hazır. Bütün arşiv veya tam resmî dağılımlı denemeler
tamamlanmış değildir. Fiziksel/native geçiş boşlukları aşağıda korunur.

Son Vercel kontrolünde GitHub kaynaklı production dağıtımı
`dpl_HVAerBa5W5bAocHakgZqKwM5e6X6`/da4c2ec58eaf0c7fea0b00b447c806b8bbb38f8d
READY bulundu; HTTPS version.json0.9.0. index.html, sw.js ve version.json
SHA-256 değerleri kabul edilmiş yerel derlemeyle birebir aynı. Manuel API'nin
önceki kota hatası uygulamanın GitHub bağlantılı dağıtımını engellemiş görünmüyor;
kota kalktı diye varsayılmaz. Yeni canlı87test kabulü43613106471 PASS.

[0.9.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.9.0-alpha.1)
yayımlandı, draft değil. [Release43612877695](https://github.com/kaansavukduran/yksmania/actions/runs/43612877695)
PASS; başarılı CI43611757852'nin mevcut5 binary'si yeniden derlenmeden alındı:
Windows Setup/Portable, Linux AppImage/DEB, Android debug APK; üç kanıtla8 asset.
Tag ve verified-run.json aynı b92b2b5 başarılı main kaynağını gösterir.
İndirilen Android-verification.txt ve verified-run.json iki hash'i SHA256SUMS ile
eşleşti; liste7payload içerir. Android code15/name0.9.0/v2 signature PASS.
Beş büyük binary ayrıca yerelde indirilip hash'lenmedi. Son kayıt commit'leri
yalnız dört teslim dokümanını değiştirir; kabul edilen runtime hash'leri aynıdır.
Son normal TLS canlı version.json kontrolü0.9.0; gerçek dağıtım yukarıda doğrulandı.

Doğrulanan uygulama/paket kaynağı `b92b2b52be5f5a08b9238b565f73b6998481b65a`.
[CI43611757852](https://github.com/kaansavukduran/yksmania/actions/runs/43611757852)
tamamı PASS: temiz npm ci, check/build,94 birim,87/87 browser (4,2dk),
Windows/Linux/Android. Windows ve Linux paketlenmiş uygulamalarında ders,
rehber/kağıt/not, paragraf taslağı, bugünkü gerçek skor, offline/süreç yeniden
başlatma, kum saati/deadline, exam snapshot/sonuç ve reset PASS; rendererErrors0.
Android APK üretimi ve imza/manifest komutları PASS. Bu fiziksel cihaz veya
temiz Windows kurulumu/portable taşıma/native sürümler arası geçiş değildir.
YKS-023–029 ve önceki ilgili regresyonlar PASS; kapsamda açık doğrulanmış kusur yok.

Yerel gerçek0.8→0.9 SW geçişi ayrıca PASS: eski canlı0.8 index/sw/version üç
hash'i önceki kabul ile birebir eşleşti;228asset indirildi,196revision doğrulandı.
Eski uygulamanın gerçek Ayarlar güncelleme düğmesiyle yeni kopya aktive edildi.
Paragraf A taslağı/notu, açık tema/UI115/yazı110, önceki öğrenme kayıtları ve
sentetik870bayt PDF metadata+byte'ları tam korundu. Yeni yerleşik kağıt ilk kez
offline açıldı; reload/taslak devam PASS, renderer0. Bu izole yerel web kabulüdür.
İlk önkoşul NOT TESTED kaydı, eski canlı build indirildikten sonra bu PASS ile
aşıldı. İlk harness'in iki meşru güncelleme düğmesini eşleştiren seçici hatası
saklandı; Settings içindeki gerçek düğme seçildi, ürün/test şartı zayıflatılmadı.

**İlk manuel dağıtım engeli:** Git kaynaklı API production talebi HTTP402,
`api-deployments-free-per-day`/günlük100, retryAfter86400 verdi; yerel CLI yoktu.
İlk kontrolde eski dağıtım dpl_bpyVHjvmsFLKFWVditzEZYtBmTpe/ead659b0.8.0 idi.
Sonraki normal TLS kontrolü0.9.0'ı gösterdi; metadata GitHub da4c2ec production
READY ve üç runtime hash eşitliğiyle doğrulandı. İlk BLOCKED kaydı geçmiş
kanıttır; Vercel0.9 güncel durumu READY. Yeni proje/plan/hesap değişimi veya
arka plan zamanlama yapılmadı. Canlı kabul ayrıca yukarıda kaydedilir.
0.9 paket yayını başarılı CI'nin mevcut dosyalarını yeniden derlemeden kullandı.

İlk uzak CI43611497875 npm ci sırasında source-map-0.9.0 için404 verdi.
YKS-029/Kritik: uygulama sürümü metin değişimi kilitteki iki bağımlılık sürümünü
ve üç aralık kaydını da değiştirmişti; mevcut node_modules ile yerel build bunu
yakalamadı. PDF.js kaldırılması dışındaki tüm ortak dependency kayıtları0.8
tabanından birebir geri alındı; uygulama sürümü0.9.0 kaldı. Boş ayrı npm cache ile
gerçek npm ci680paketi16s’de kurdu, PASS. Check/unit/build temiz kurulumdan sonra
yeniden uygulanır; yeni başarılı tüm-platform CI olmadan paket yayımlanmaz.

Son kaynak derlemesi: check, 94/94 unit ve 87/87 Chromium browser PASS (5,5 dk).
YKS-023–028 kabul koşulları ve önceki ilgili regresyonlar geçti; hazırlanmamış
paketlerin aramada boş kart üretmesi de giderildi. Ayrı exam kabulü 4/4 PASS.
Son yerel Electron akışı PASS, rendererErrors 0. Normal/büyük yazı, koyu/açık
tema, 320/844/1440px ve çevrimdışı akışlar gerçek DOM/görüntü ile sınandı.
Altı yeni React bileşeninde hook/cleanup/kayıt/odak incelemesi yeni kusur bulmadı.
16 ulaşılabilir rotada akademik yükleme kontrolü yok; kişisel JSON yedeği ayrı.
294 değişen yolun gizlilik incelemesi: 8.845 özel kaynak kimliğiyle 0 eşleşme,
özel PDF/indirme URL’si/anahtar veya kapsam dışı dosya yok. PDF.js varlıkları silindi.
İlk son-kabul başlatması sistem Chromium yolu verilmediğinden tarayıcıyı açamadı;
bu ortam hatası saklandı, aynı 87 test doğru kurulu Chromium ile eksiksiz geçti.
Kabul kanıtları: `/workspace/work/forge-090/{check-final,unit-final,build-accepted,
browser-accepted,native-final,exams-focused-accepted}.log`; erişilebilir rota,
mahremiyet ve piksel sınırı JSON kayıtları aynı özel çalışma dizinindedir.
CI, canlı Vercel ve yeni paket sonuçları bu kaydın başında ayrıca gösterilir.

Başlangıç `ead659b153aef689bf689d56b0343dd57e49376b`, forge/in-depth-learning;
fetch/remote uç karşılaştırması yapıldı. Kullanıcının son talimatı önceki kaynak
ithali/inlinekağıt kararını değiştirdi: öğrenci materyal sağlamaz. Akademik
PDF/katalog arayüzü, eski Library/SourceList/TopicCheatsheet/Reader kaldırıldı.
Kaynaklar özgün yerleşik öğretime dönüştürüldü. Eski IDB dosyaları/notları ve
kişisel ilerleme JSON geri yükleme korunur. Eski/sources ve/library hazır dersleri
sunar. Kopya Kağıtları menüde ayrı; Sınavlar Sorular'ın altındadır.

57 anlatım,28 derin rehber,60 yerleşik kağıt,220 özgün soru.28 rehber dışında
kalan hazır anlatımlar kaynaklı, aşamalı vaka/kanıt çalışmalarıdır. Önceki8 kısa
başlangıç dersi gerçek kaynaklarla genişletildi. Ses/yapı, çarpanlara ve üç
Osmanlı başlığı yeni model/öğretim aldı.105 yeni soru eklendi, eski115 soru ve
cevapları sabit fixture ile korunur. Eski çarpanlara5'lik set aynıdır; ileri10
ayrı soru paketidir, anlatım/kağıt sayısını şişirmez. Soru paketinin zengin kağıdı
ezme riski odaklı regresyonla engellendi. Sekiz eski ÖSYM referansı için sekiz
bağımsız özgün öğretim varyantı yerleşiktir; resmî sorunun birebir kopyası değildir.
İlk45/479 sıra başlığı hazırdır,46 kimyadaki Elementlerin sınıflandırılmasıdır.
Osmanlı medeniyeti ayrı sonraki başlık; ilk46 hazır diye sayılmaz. Bütün arşiv,
126 özel kağıdın tüm ayrıntıları ve20 yıllık ÖSYM taraması hazır değildir.

Denemeler: TYT karma90, AYT Sayısal25,11 branş. TYT120/165dk ve AYT80/180dk
oranından süre; tam120/80 resmî dağılım diye sunulmaz. Kayıtlı soru/anahtar/
metin snapshot, cevap/boş/flag ve son zaman; offline/süreç yeniden başlatma;
yan ekran veya açılışta expiry, açık onaylı erken bitir, doğru/yanlış/boş/net
ve tam özgün açıklamalar. Sonuçlar deneme geçmişinde ayrıdır, XP veya teori
ustalığı oluşturmaz. Yazma hatasında yanlış başarı yok; globalRetry sonrası
expiry bir kez yeniden denenir, her500ms tekrarlanan yazma hatası üretilmez.
Aynı set tekrar edilebilir; rastgele yeni tam deneme üretildiği iddiası yok.

Unslop/Fragaria/Yazılım Denetle uygulandı, canlı AIONIA v1.7 okundu. Onaylı32kare
Aion atlası değişmedi.94 birim + check/build PASS. İlk tam browser79/85; altı
hatanın beşi yeni testlerin seçici/başlatma/DOM metin örneklemesi uyumsuzluğu,
biri aşağıdaki yeni exam taşması. Beklentiler zayıflatılmadan düzeltildi:
Theoryselector yanlışlıkla.cheatsheet-topic olmuştu; rehber h2 içinde model h2
vardı; innerText/textContent blok boşluğu farkı; Provider açılmadan menü kontrolü;
açgözlü PDF.*ekle regex'inin örnekler kelimesini eşleştirmesi. Gerçek yükleme
kontrolü/girdi yokluğu, içerik/odak/not/offline sonuç denetimleri korunur.

YKS-023 (Orta):320px UI%200/yazı%150 Türkçe deneme başlığı313px metinle belgeyi
325px yaptı. Scoped h1 wrap, font korunur; aynı yeni gerçek UI testi tekrar edilir.
YKS-024 (Orta): aynı ölçeklerde yerel dialog UAmaxwidth hem reset hem sınav bitir
penceresini224px'e sıkıştırdı; yatay içerik309/321px. Yazar maxwidth/copywrap/
kontrollü padding ile288px dialog,286px içerik; tanı ölçümü yatay taşma0.
YKS-025 (Orta): TYT2:03:45 saati+ikon331px belge oluşturdu. İkon/etiket ayrı,
sayaç tam satır ve gerekirse saat sonrası<wbr>; metin ve font korunur. Tanı320px.
40 normal/büyük ölçek koyu/açık görüntüsü, gerçek DOM ölçümleri ve emüle touch
alındı; son derlemede aynı ölçümler/testler tekrar edilecektir.

Yerel Electron tüm offline ders/rehber/kağıt/not, soru taslağı, saat, exam snapshot
ve deadline ile süreç yeniden başlatma, sonuç/reset akışları PASS; renderer0.
Bu ilk sonuç yeni CSS onarımı öncesidir; son paket/canlı sonuç ayrıca eklenecek.
Native fiziksel Android, temiz Windows kurulumu/portable taşıma ve iki native
paket arasında yükseltme NOT TESTED. İlk0.8veri/PDF baytlarını gizli koruma testi
korunur. Root ve altı iş kolu kaynak/uygulama/denetimi paylaşılmış dosyalarda
çakışmadan yaptı; kaynak okuma sınırları SOURCE_REVIEW.md'de.

Sonraki tam browser85/86 PASS; aynı exam testinde sonuç tablosunun klavyeyle
kaydırılamadığı doğrulandı (YKS-028/Orta). Tabindex0 ve adlandırılmış bölge,
gerçek ArrowRight ile scrollLeft>0 kabulü eklendi. YKS-026/Orta: yeni elektrik
alan tanımında F'nin elektriksel kuvvet olduğu açıklandı; net kuvvet değil.
Sekiz fizik örneği bağımsız olarak tekrar hesaplandı. YKS-027/Düşük: soru-only
paket Theoryaramasında boş subjectkartı üretiyordu; mode-aware arama ve memo
bağımlılığı düzeltildi. Aynı görünür kart yokluğu testi onarım öncesi FAIL;
yeni build'de ve son tam kabulde tekrar çalıştırılacak. Son CSS gerçekten
320/844/1440px'de yeniden render edilerek ölçüldü: dialog288px, yatay scroll0;
sayaç ve belge320px, renderer0. Yerel native son akışlar tekrar PASS.

Kanıt/work/forge-090: check-final,unit-final,build-final,browser-full,native.log;
exams-focused.log,manual-ui.json, görseller ve geometryJSON kayıtları. Son tam
kabul/CI/yayın sonucu bu kaydın üstüne eklenecek. PDF.js ve200 gereksiz font
varlığı paketten kaldırıldı; ilk hazır asset cache13,1MiB'den8,65MiB'ye indi.

---

# 0.8.0 yayımlandı — güncel teslim kaydı

Teslim/paket kaynağı `b08c9c118b6ac16c73f53ae55ccfb78a26e0c281`.
Uygulama değişikliği `8df0d255b90247614ac67f37f120f3cf42200a62`; sonraki commit
native kabulün beklemelerini ve public iz kaydını güçlendirir, uygulamayı değiştirmez.
[CI43601785473](https://github.com/kaansavukduran/yksmania/actions/runs/43601785473)
72 birim, check/build,73/73 browser ve Windows/Linux/Android işlerinin hepsinde PASS.
Paketlenmiş Windows ve Linux: offline ders, not/taslak/PDF, reload/süreç yeniden
başlatma, kayıtlı kum saati deadline eşitliği, pause ve ilerleme sıfırlama PASS;
her iki platformda gözlenen rendererErrors0. Android code14 / name0.8.0 / v2
imza PASS. Bu, fiziksel Android veya temiz kurulum testi değildir.

[Canlı43601821513](https://github.com/kaansavukduran/yksmania/actions/runs/43601821513)
aynı kaynakta73/73 PASS (6,2dk); ilk offline PDF11,1s ve yeni üç timer/reset kabulü
PASS. Önceki public72/73 koşusunun ilk PDF30s hatası kayıtta korundu; tekrar
aynı koşullarda üretilmedi, PDF kodu veya timeout değiştirilmedi. Ayrı yerel
izde ilk cache hazırlığı26,722s, offline canvas0,873s ölçüldü; bu tanı koşusu
sandbox TLS istisnasıyla yapıldığı için sıkı public CI kabulünün yerine sayılmaz.
İlk iki native denemenin20:00/19:… sorunu, testin gerçek azalmayı/pause sonucunu
beklemesi ve kayıtlı son zamanı süreçler arasında birebir karşılaştırmasıyla
çözüldü; aynı kalan süre kabulü iki paketli platformda PASS. Ürün süresi
sahte sonuçla değiştirilmedi, test atlanmadı, kabul sınırı genişletilmedi.

Vercel production `dpl_EpWKp4zqSgcWQKKuHuRPZNCDshE3` READY; canlı version.json0.8.0.
Test edilen yerel build ile index.html, sw.js ve version.json SHA-256 değerleri
birebir eşleşir. Son kayıt dokümanlarının dağıtımı ayrıca kontrol edilecek.
[Release43602680263](https://github.com/kaansavukduran/yksmania/actions/runs/43602680263)
PASS; [v0.8.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.8.0-alpha.1)
yayımlandı, draft değil. Başarılı CI paketleri yeniden derlenmeden alındı:
Windows Setup/Portable, Linux AppImage/DEB, Android debug APK ve üç kanıt =8 asset.
İndirilen Android-verification.txt ve verified-run.json hash'leri SHA256SUMS ile
eşleşti. Verified-run doğru başarılı main kaynağını gösterir; hash listesi7
payload içerir. Beş büyük binary ayrıca yerelde indirilip hash'lenmiş değildir.

Yeni çalışma kum saati varsayılan5dk; üstüne basınca ters dönüp başlar, durdur/
devam et ve alt köşe menüsünde1/5/10/20dk,1–120dk özel sürgü/sayı girişi var.
Konu anlatımı, kopya kağıdı ve soru yollarında aynı yerel süre korunur; zamanı
bitirmek öğrenme veya XP üretmez. Ayarlar/Veri'de açık onaylı sıfırlama,
öğrenme kanıtlarını temizler; ayarlar, notlar, PDF ve sayfa konumları korunur.
Yazma hatası önceki ilerlemeyi/süreyi korur. Ders simgeleri ortak vektörlerdir;
TYT/AYT kökleri yukarıdadır, etiketler ve kart kenar boşlukları denetlendi.

YKS-021 (Orta):320px UI%200/yazı%150 menüde41px alan,130,08px dakika sözcüğünü
harf harf kırıyordu;248px'e çıktı, aynı ölçüm PASS. YKS-022 (Orta): yeni reset
butonu belgeyi346px'e taşıyordu;320px ve taşan öğe0, aynı eski regresyon PASS.
YKS-006/008/010/013/014/015/016/018/019/020 ilgili kontrolleri son tam kabulde
PASS. Denetlenen bu kapsamda açık doğrulanmış kusur kalmadı; bütün ürün için
hatasızlık garantisi değildir. Geometri testinin iki ayrı zamandaki rect okuması
tek DOM örneklemine alındı; >=18px sınırı korunarak3/3 ve tam73/73 PASS.

Kullanıcı görüntüsü0.5.2 istemcisini ve bekleyen sürüm bildirimini gösterir.
Gerçek0.5.3→0.8.0 web güncellemesi, yarım yanıt/not korunarak ve offline yeniden
açılarak PASS; eski padding1→33px, kökler üstte. Bu kullanıcı cihazına doğrudan
bağlanıldığı veya0.5.2 yükseltmesinin birebir test edildiği anlamına gelmez.
Eski UI'da Ayarlar → Güncellemeler ve hakkında → Güncelle ve yeniden aç.
Yeni bildirimde bu eylem doğrudan görünür; kayıt bitmeden etkinleşmez.

Gerçek kapsam54 anlatım /17 ayrıntılı rehber /115 özgün soru /8 ÖSYM referansı.
Selçuklu ve elektron katmanları eklendi; paragraf derinleştirildi. İlk43/479
sıralı başlıkta anlatım hazırdır; bütün müfredat/20 yıllık arşiv hazır değildir.
Özel PDF/katalog/Drive kimlikleri yayımlanmadı. Fiziksel Android, temiz Windows
kurulumu, portable taşıma ve iki native paket arasında veri koruyan yükseltme
NOT TESTED. İki web build'iyle güncelleme bunlardan ayrı doğrulanmıştır.

Yerel kanıt /workspace/work/forge-080: ci-accepted.log, public-accepted.log,
release-evidence/, runtime-before-docs.json; başlangıç/onarım/görseller aşağıda.
Sonraki içerik sıra44/detail-233 Osmanlı siyaseti,45/detail-234 askerler ve ordu;
kalan9 kısa başlangıç anlatımını derinleştir. Yeni soru fazına geçmeden anlatım
önceliği ve1/3/7/21 (+2,+6,+20) sözleşmesi korunur.

---

# 0.8.0 — paket ve canlı kabul izleme

İlk kaynak8df0d25 CI43600766700: verify72unit/73browser PASS, Android PASS;
Windows ve Linux paketleri üretildi fakat yeni native timer testinin19:…
beklentisi20:00 okudu. Kapatmadan önce gerçek azalma beklenmesi, IDB bitiş
zamanının süreçler arasında birebir eşitliği ve duraklatmanın dayanıklı UI
sonucunun beklenmesi eklendi. Yerel native tekrar PASS, rendererErrors0.
Aynı regex/gerçek kalan süre kabulü korunur; bekleme uzatılıp test atlanmaz.
Uygulama dosyaları bu düzeltmede değişmedi. Paket CI yeni kaynakta tekrarlanır.

İlk public43600807364:72/73; ilk offline PDF canvas açılışında30s süre aşımı.
Diğer PDF/not/timer/sıfırlama ve yeni içerik denetimleri PASS. İlk koşuda iz
kapalı olduğundan sonuç ağ/geçici hata diye varsayılmaz; yeni public koşu
retain-on-failure trace tutacak. Yerel public deneme sandbox Chromium TLS
sertifika engeline takıldı; bu, public CI'nin PDF bulgusundan ayrı sınırdır.
Son başarılı test ve yayın kaydı bu başlığın üstüne eklenecek.

---

# 0.8.0 — son yerel kabul tamamlandı, yayın hazırlanıyor

72 birim, check/build ve son tam Chromium kabulü73/73 PASS.
YKS-021 ve YKS-022 aynı başlangıç koşullarında düzeldi; bu kapsamda açık
kanıtlanmış kusur kalmadı. Geliştirme Electron offline/reload/süreç yeniden
başlatma/kum saati/sıfırlama PASS, rendererErrors0. Bu sonuç paketlenmiş
Windows/Linux veya fiziksel Android testi değildir. İki gerçek web build'iyle
0.5.3→0.8.0 veri koruyan güncelleme ayrıca PASS; native yükseltme sayılmaz.
13 son görsel alındı, koyu/açık başlık, ağaç, model, reset ve büyük menü
incelendi. Menü metin alanı41→248px; Ayarlar belge346→320px, font ölçekleri
korundu. 47 değişen dosyada özel envanter kimliği/PDF yok. React denetiminde
yeni model lazy, sayaç güncellemeleri yerel, terminal kayıtlar dayanıklı,
effect/listener temizliği, erişilebilir adlar ve motion tercihleri kontrol edildi.
Kanıt: /workspace/work/forge-080/{check-final,unit-final,build-final,
full-browser-accepted,native-final,update-check-final,source-repeat}.log,
menu-width-final.log, reset-overflow-final.log ve visuals/.

54 anlatım /17 ayrıntılı rehber /115 özgün soru /8 doğrulanmış ÖSYM referansı.
İlk43/479 başlık anlatıma hazır; bütün müfredat/20 yıllık arşiv hazır değildir.
Vercel, platform CI ve paket yayın sonucu bu başlığın üstüne ayrıca eklenecek.

---

# 0.8.0 — çalışma kum saati ve ilerleme denetimi, geliştirme kaydı

Başlangıç main ve çalışma dalı `7cfb5b7c0287f0a0d4730c5ce3b4c3792797a206`.
`git fetch --all` ve `ls-remote --heads` uç karşılaştırması tamamlandı.
Kullanıcının Unslop, Fragaria Unslop ve güncel aynı kimlikteki Yazılım Denetle
becerileri uygulandı; canlı AIONIA v1.7 okundu. Atlas/karakter değişmedi.
Türkçe ve Windows/Linux/Android/web kararları korunur. Yeni kaynak ve test
sonuçları aşağıdadır; uzaktaki 0.8.0 dağıtım/paket sonucu henüz bu kayıtta
başarılı sayılmaz. Son teslim kanıtı bu başlığın üstüne eklenecek.

- Ortak kalıcı SVG kum saati: varsayılan 5dk, tıklamayla ters dönüp başlatma,
  durdur/devam et, 1/5/10/20dk ve 1–120dk özel sürgü/sayı girişi. Çalışırken
  mutlak son zaman; durunca kalan süre. Her karede IDB yazılmaz. Girdi
  kilidi, başarısız yazmada eski süre ve görünür yeniden deneme; hareket azaltma.
- Ayarlar/Veri'de onaylı ilerleme sıfırlama. Bütün konu/soru/tekrar/taslak ve
  keşif kayıtları tek dayanıklı commit ile temizlenir; ayarlar/notlar/PDF'ler/
  PDF konumları korunur. Başarısız yazmada önceki öğrenme kaydı korunur.
- Ders simgeleri ortak Lucide vektörlerine taşındı; ağaç etiketleri çemberlerin
  altında, kenar boşlukları simetrik. TYT/AYT kökleri üstte kalır. Sıfır
  bankalı konu dalı artık 0 soru yerine Kaynak çalışması der. Güncelleme
  bildirimine kayıttan sonra uygulanabilen doğrudan düğme eklendi.
- Selçuklu Türkiyesi/detail-232 ve katman elektron dizilimi/detail-147 eklendi;
  paragraf özgün metni korunarak yedi bölüme ve dört çözümlü örneğe genişletildi.
  Kaynak sınırları SOURCE_REVIEW'de. 54 anlatım / 17 ayrıntılı rehber /
  115 özgün soru / 8 ÖSYM referansı. İlk 43 sıralı başlıkta anlatım var;
  bütün 479 veya son 20 yıllık arşiv tamamlandı iddiası yok.

Eski istemci: gerçek iki web build'iyle 0.5.3 → 0.8.0 güncelleme PASS.
Yarım paragraf yanıtı/not korunur; sonrasında offline yeniden açılır. Ağaç
kökleri yukarıdadır. Eski fallback padding x/y 1px → güncel 33px. Bu önceki
YKS-016 düzeltmesinin dağıtım regresyonudur; güncel 0.7'de yeniden üretilmiş
bir padding kusuru diye sayılmaz. Kullanıcı görüntüsü 0.5.2 ve bekleyen sürüm
bildirimi gösterir; kullanıcı cihazının durumu ayrıca doğrudan incelenmedi.
Eski UI: Ayarlar → Güncellemeler ve hakkında → Güncelle ve yeniden aç.
Bu web testi native paket yükseltme veya fiziksel cihaz testi değildir.

YKS-021 / Orta: yeni kum saati panelinde 320px, UI%200/yazı%150 açık temada
iki sabit sütun ve rem padding, dakika sözcüğüne 41px bırakıyordu; gerekli
kelime genişliği 130,08px. Onarım öncesi ölçüm FAIL ve görüntü kanıtı var.
Otomatik sığan sütunlar ve ekrana göre sınırlı padding ile onarıldı; font
ölçekleri düşürülmez. Aynı ölçüm PASS:248px alan >=130,08px sözcük; root32px
ve text-scale1,5 korunur. Son ölçüm/kabul sonucu teslim kaydında tamamlanır.
İlk çalışma denemesinde testin yanlış Gizle düğme adı düzeltilip aynı gerçek
Görüntüle düğmesiyle aç/kapat sınandı; ürün kusuru diye kaydedilmez. Node24
JSON import hatası, e2e'de içerik modülü ithali kaldırılıp gerçek soru akışıyla
çözüldü. Beklenti azaltılmadı. Bütün bankalı sorular ve metin regresyonları korunur.

İlk check/build ve 72 birim PASS. Odaklı 7/7 ve geliştirme Electron offline /
kapanış-açılış/kum saati/sıfırlama PASS; rendererErrors 0. 13 koyu/açık ve
320px büyük ölçek görüntüsü alındı; ilk inceleme YKS-021'i ortaya çıkardı.
Son UI onarımı sonrası tam test, görsel ve platform sonuçları ayrıca eklenecek.
Kanıtlar /workspace/work/forge-080 içindedir; özel kaynaklar Git dışında.
İlk 45 değişen dosyada envanter kimliği ve eklenen PDF kontrolü: sıfır eşleşme.
İlk tam browser koşusu71/73: YKS-021 ve YKS-022 FAIL; onarımlardan sonra
aynı testler ve son tam kabul tekrar çalıştırılır. İkinci tam koşu72/73:
YKS-021/022 ve diğer bütün ürün akışları PASS; yeni geometri testinde
kaymakta olan sayfanın iki ayrı zamandaki rect'leri karşılaştırılmıştı.
Ölçümler tek DOM değerlendirmesine alındı; aynı >=18px kabulü korunarak3/3
tekrar PASS. Son tam koşu bundan sonra yeniden başlatıldı.

YKS-022 / Orta: yeni Ayarlar sıfırlama düğmesi 320px UI%200/yazı%150'de
kendi kartını aşıp belge genişliğini346px yapıyordu. Eski mevcut plan/ayarlar
regresyonu FAIL; DOM geometrisiyle tek taşan öğe doğrulandı. Düğmenin dekoratif
ikonu kaldırıldı, genişliği kartla ve iç boşluğu ekranla sınırlandı. Ölçekler
korunur; son aynı regresyon PASS; belge genişliği320px ve taşan öğe0.

Sonraki içerik: sıra 44/detail-233 Osmanlı siyaseti, sıra45/detail-234 askerler
ve ordu. Kalan dokuz kısa başlangıç anlatımını kapsamlı rehbere dönüştür.

---

# 0.7.0 yayımlandı — güncel teslim kaydı

Uygulama/paket kaynağı: `d88f332d0ec14d40a5241108e1716690973fb95b`.
[CI 43594722140](https://github.com/kaansavukduran/yksmania/actions/runs/43594722140)
67 birim / 69 tarayıcı ve Windows, Linux, Android işlerinin tamamında PASS.
Paketlenmiş Windows/Linux: yeni cebir rehberleri ve offline reload dahil
normal ders → kayıt → yeniden yükleme → süreç yeniden başlatma akışları PASS;
her iki platformda rendererErrors 0. APK code 13 / name 0.7.0 / v2 imza PASS.

[Canlı kabul 43594788583](https://github.com/kaansavukduran/yksmania/actions/runs/43594788583)
aynı kaynakta 69/69 PASS (4,9dk). Vercel production
`dpl_47uB8RaPw1qJfe1LpUqi9pHoCu8x` READY; canlı version.json 0.7.0 doğrulandı.
[Release 43595550431](https://github.com/kaansavukduran/yksmania/actions/runs/43595550431)
PASS; [v0.7.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.7.0-alpha.1)
yayımlandı. Başarılı CI paketleri yeniden derlenmeden alındı: Windows Setup ve
Portable, Linux AppImage ve DEB, Android debug APK; üç kanıtla toplam 8 asset.
İndirilen iki kanıt dosyasının SHA-256 değerleri yayın listesiyle eşleşti;
verified-run kaynağı aynı commit ve başarılı main koşusu. Beş büyük binary
ayrıca yerelde yeniden indirilip hash'lenmiş değildir.

YKS-018/019/020 onarımları aynı başlangıç senaryolarında ve son tam kabulde PASS.
Denetlenen bu kapsamda açık doğrulanmış kusur kalmadı. Önceki şikâyetlerin
regresyonları korundu; bu sonuç bütün ürün için hatasızlık garantisi değildir.
Fiziksel Android, temiz Windows kurulum/portable taşıma ve iki sürüm arasında
veri koruyan güncelleme NOT TESTED. Yerel/donanım/paket sonuçları birbirinden
ayrıdır; özel PDF ve Drive kimlikleri public pakete eklenmez.

Gerçek içerik kapsamı: 52 anlatım, bunların 15'i ayrıntılı rehber; 115 özgün soru,
8 doğrulanmış ÖSYM referansı. İlk 41 çalışma sırası başlığı anlatıma açılır;
479 başlığın tamamı ve bütün 20 yıllık ÖSYM arşivi henüz hazır değildir.
Sonraki içerik sırası ve yerel başlangıç/onarım kanıtı aşağıdadır.

---

# 0.7.0 — konu derinliği ve denetim, yerel doğrulama tamamlandı

Başlangıç main: `730b37297fda2fcde70c838bb96c021119b442be`; remote fetch ve
uç karşılaştırması yapıldı. Kullanıcının Unslop / Fragaria Unslop / Denetle
isteği uygulandı; Denetle aynı beceri kimliğinde güncel Yazılım Denetle adıyla
bulundu. Canlı AIONIA standardı v1.7 yeniden okundu. Varlık, karakter ve atlas
değişmedi; Türkçe, Win/Linux/Android/web kapsamı ve mevcut kayıt şeması korunur.

52 anlatım / 15 ayrıntılı rehber / 115 özgün banka sorusu / 8 ÖSYM referansı.
Yedi mevcut anlatım genişletildi: temel kavramlar, tek–çift/işaret, ardışık,
asal, faktöriyel, hücre, periyodik sistem. İki yeni kapsamlı anlatım ve vektör
model eklendi: birinci dereceden denklemler detail-203 ve basit eşitsizlikler
detail-204. İlk 41 kaynak sırası başlığı artık anlatıma açılır. Açıklamalar,
koşullar, karşı örnekler, adım adım çözümler ve hatırlama içerir. Kaynak sayfa
kapsamı docs/SOURCE_REVIEW.md'de. Bütün 479 anlatım/20 yıllık ÖSYM arşivi hazır
iddiası yok; bu turda yeni resmî soru eklenmedi. Özel PDF/katalog/kimlik yok.

Doğrulanan kusurlar: YKS-018 (Orta) yuvarlanmış kesirde yanlış kesin eşitlik;
YKS-019 (Düşük) içindekiler geçişinde klavye odağının geride kalması;
YKS-020 (Orta) 320px %200 UI/%150 yazıda rem boşlukların okuma alanını daraltması.
Üçü de onarım öncesi FAIL ile kanıtlandı. İlk ikisi paylaşılan gösterim/gezinmede;
üçüncüsü küçük ekranın ana içerik, ders/soru ve model yan boşluklarında düzeltildi.
Gerçek 320px viewport'ta okunabilir alan 144,8→250px; root font 32px ve text-scale
1,5 korunur. Yeni modelin tanımsız renk token'ı mevcut accent ile düzeltildi.

Yerel PASS: check/build (94 çakışmasız modül), 67 birim, son tam 69/69 Chromium
kabulü. Önceki YKS-006/007/008/009/010/013/014/015/016/017 ilgili denetimleri
korunur. İlk 69/69 koşusundan sonra görsel genişlik bulgusu geldi; bu nedenle
son CSS düzeltmesinden sonra tam koşu tekrarlandı. Rehber gezinmesi testinin
ilk 4/5 koşusundaki anlık DOM okuması, seçilen gerçek h1 beklenerek düzeltildi;
beklenti azaltılmadan üç tekrar 3/3 ve son tam koşu PASS.

Linux geliştirme Electron: yeni cebir, çevrimdışı yeniden yükleme, süreç yeniden
başlatma, paragraf taslağı ve günlük skor kontrolleri PASS; rendererErrors 0.
Bu yerel çalışma paketlenmiş Windows/Linux veya fiziksel Android testi değildir.
22 model/çözüm görüntüsü koyu/açık 1440px, 320px ve 768px büyük ölçekte alındı;
temsilci görüntüler incelendi. Gerçek 320px viewport ayrıca kontrol edildi.
Uzun element screenshot'larında görülen sabit skip-link artifaktı normal viewport
ile karşılaştırıldı: odaksız bağlantı ekranın dışında (-320…-199px); canlı bir
örtme hatası değildir. Testler normal giriş, gerçek emüle tap, yatay geçiş,
PDF/not/tekrar korunması ve ciddi/kritik axe kontrollerini içerir.

Kanıtlar yerel /workspace/work/forge-061 içindedir: baseline-audit.log,
baseline-readable-width.log, unit-final.log, full-browser-final.log,
guide-navigation-repeat.log, native-final.log, viewport-check.log ve visuals/.
Git'e özel kaynak dosyası ve envanter kimliği girmediği 35 değişen dosyada kontrol
edildi. İndirme/production/paket CI sonucu aşağıdaki yayın kaydına eklenecek;
0.7.0 paketleri henüz bu yerel kayıtta yayımlandı sayılmaz.

Sonraki içerik: kalan 10 kısa başlangıç anlatımını aynı derinliğe çıkar; yeni
kaynak sırası 42/detail-232 Selçuklu, 43/detail-147 Katman elektron dizilimi,
44/detail-233 Osmanlı siyaseti. Şimdiki periyodik rehberin bu başlıkları kısmen
anlatması otomatik ayrı konu tamamlanması sağlamaz. Yeni soru bankası fazına
geçmeden anlatım önceliğini ve 1/3/7/21 ilkesini koru.

---

# 0.6.0 teslimi — doğrulanan güncel durum

Uygulama ve paket kaynağı: `c05291f4e9af991eda642e2d0f312194a7721ce0`.
[CI 43590369220](https://github.com/kaansavukduran/yksmania/actions/runs/43590369220)
tüm dört işte başarılı: 64 birim testi, 64 tarayıcı kabulü, Windows/Linux
paketleri ve Android APK. Paketlenmiş Windows ve Linux uygulamaları çevrimdışı
ders, ayrıntılı rehber/kaynak akışı, yeniden yükleme ve süreç yeniden başlatma
kontrollerini geçti; gözlenen renderer hatası her ikisinde de 0.

[Public kabul 43588836416](https://github.com/kaansavukduran/yksmania/actions/runs/43588836416)
64/64 geçti; kaynak `95978b0`. Sonraki değişiklikler test kayıt beklemeleri,
Windows modül dosyası adı ve derleme denetimidir. Son derlemenin 27 JS/CSS,
PDF worker, servis worker ve sürüm dosyası yayınlanan uygulamayla SHA-256
düzeyinde aynı bulundu. Son kaynak için Vercel production
`dpl_J7JKwvJf2T4od3d8J5tRtcVkWWBC` READY; canlı `version.json` 0.6.0.

[Release 43591167018](https://github.com/kaansavukduran/yksmania/actions/runs/43591167018)
başarılı. [v0.6.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.6.0-alpha.1)
yayımlandı: Windows Setup/Portable, Linux AppImage/DEB, Android debug APK ve
üç kanıt dosyası; toplam 8 asset. Paketler başarılı CI'den alındı, yeniden
derlenmedi. `verified-run.json` kaynak SHA'sı ve başarılı main koşusu doğrulandı;
iki kanıt dosyasının indirilen SHA-256 değerleri yayın listesiyle eşleşti.
Android code 12 / versionName 0.6.0 / v2 imza doğrulaması başarılı.
Beş büyük binary ayrıca yerelde yeniden indirilip hash'lenmiş değildir.

Gerçek kapsam: 50 anlatım, bunlardan 6 ayrıntılı rehber; 115 özgün soru,
5 resmî kitapçıkta 8 doğrulanmış ÖSYM referansı. 479 başlığın tamamı ve bütün
20 yıllık ÖSYM arşivi henüz hazır değildir. Özel 126 kopya kağıdı public pakete
gömülmez; cihazda içe aktarılır ve konu başlığındaki düğmeden tam açılır.
Fiziksel Android, temiz Windows kurulum/portable taşıma, iki sürüm arasında
güncelleme ve diğer tarayıcılar ayrıca doğrulanmalıdır.

Sıradaki içerik işi: kalan kısa başlangıç anlatımlarını kaynak sayfalarını
okuyarak ayrıntılandırmak; sonra kaynak sırasındaki 40/detail203 ve 41/detail204.
Kopya kağıdı ve geçmiş soru kapsamını genişletirken kısmi kaynakları tam arşiv
diye sunma. Önceki başarısız koşuların nedenleri aşağıda tarihsel tutulur.

---

# 0.6.0 — Windows modül adı çakışması düzeltmesi

CI43589340483:64unit/64browser PASS; Linux paketli kabul ve Android imza
kontrolü PASS. Windows build TS1149/TS1261 ile durdu: NarrativeModels.tsx
ve narrativeModels.ts uzantısız import çözümlemesinde Windows üzerinde
çakışıyordu. Bu gerçek platform kusurudur; test hatası diye geçilmedi.
Saf hesap modülü narrativeCalculations.ts adını aldı;4import güncellendi.
check/build artık case-insensitive uzantısız modül yolu denetimiyle başlar.
Eski çakışmayı içeren geçici2dosyalı örnek guard tarafından reddedildi.
Yerel85modül yolu, check/build,64unit,9anlatım browser ve Linux geliştirme
Electron offline/reload/restart PASS; rendererErrors0.

Public43588836416:64/64 PASS (7,1dk), checkout95978b0. Daha sonraki e21b838
sadece test onay beklemeleri/belgedir. Modül adı düzeltmesinin derlenmiş
JS/CSS/worker/version çıktıları yayındaki0.6.0ile byte düzeyinde karşılaştırıldı;
sonuç /workspace/work/lesson-depth/runtime-byte-comparison.json içindedir.
Bu kaynak düzeltmesi öğrenme metinlerini, veri kimliklerini veya arayüz
davranışını değiştirmez. Yeni tam paketCI bekleniyor; Windows paketi bu
kontrol geçmeden yayımlanmayacak.

---

# 0.6.0 yayın doğrulaması — kalıcı kayıt beklemeleri

Uygulama kaynağı95978b0dc47294fc914fd04c5b70c13fcba96d14 main'e gönderildi.
Vercel dpl_5gTmD1PRmk1bcpgvPEkewiZBPD5R production READY, version.json0.6.0.
CI43588713692:64unit PASS, browser62/64; native işler güvenli biçimde SKIPPED.
İki test UI olayından hemen sonra IndexedDB onayını beklemeden reload yaptı:
son sözcük adımı ve başarısız tekrar yazısından sonraki başarılı retry. Store
kodunda sıradan düzenleme “kaydediliyor” durumundaydı; terminal tekrar eylemi
DB onayından önce başarı göstermiyordu. Testler saved durumu / gerçek undo
onayını reload'dan ÖNCE bekleyecek şekilde düzeltildi. Keyfi timeout/retry veya
atlanan assertion eklenmedi. İki senaryo üçer kez,6/6 PASS. Bu düzeltme yalnız
testler ve bu devir notudur; uygulama kaynakları95978b0ile aynıdır.

Yeni tamCI ve public kabul başlatılacak; eski43588836416 public koşusu ilk
beklemesiz test revizyonudur. Son başarılı kaynaktan paket yayımlanmadan alpha
paketlerinin hazır olduğu söylenmez. Kaynak arşivi2006–2026halen kısmi;
50anlatım,6ayrıntılı rehber,115özgün soru ve8ÖSYMreferansı gerçek kapsamdır.

Sıradaki içerik işi: kalan kısa başlangıç anlatımlarını kaynak okuyarak aynı
ayrıntıya çıkar; kaynak sırası40/detail203 ve41/detail204 sonraki yeni başlıklardır.
20yıllık bütün ÖSYM taraması, yeni soru setleri ve eksik kağıt üretimi tamamlanmadı.
Özel126PDF cihazda içe aktarılır; public pakette özel Drive arşivi yoktur.

---

# 0.6.0 — kapsamlı anlatım ve konu içi kaynak akışı (çalışıyor)

Yetkili repo kaansavukduran/yksmania; yerel /workspace/yksmania,
forge/in-depth-learning. Önceki 50 anlatımlı yerel dal, doğrulanmış0.5.3
main ile birleştirildi (a6cf5b7). Public son sürüm0.5.3, yerel yeni çalışma
henüz yayımlanmadı. Önceki kayıtlar aşağıda tarihsel olarak korunur.

Yeni kullanıcı kararı: kopya kağıtları soldan çıkar, konu başlığında düğmeyle
tam PDF olarak göster; kaynaklar korunur. Ders anlatımı kapsamlı açıklama,
etkileşim ve çözümlü örnek içermeli. Kart iç boşluğu eksikliği doğrulandı ve
topic-study üzerinde düzeltildi. Geçmiş ÖSYM kaynakları çözüm sonuna bağlandı.

6 ayrıntılı rehber: simya/disiplinler/sembolik dil/güvenlik/atom modelleri ve
rasyonel sayılar. 50 toplam anlatım,115 özgün banka sorusu; bütün479 konu
anlatımı tamamlanmış değildir. Önceki27 kaynaklı anlatım ve konu tekrarları
korunur. İncelenen126 özel kopya kağıdı dosyasının126'sı derse/türe
sınıflanır,124'ü ayrıntılı başlıkla eşleşir;2 genel geometri dosyası bütün
ders kağıtları seçeneğinden erişilir. Özel PDF/kimlik/katalog Git'e girmez.

Canlı AIONIA belgesi bu aşamada tekrar okundu: v1.7 (14.11.2026); karakter
varlıkları değiştirilmedi. Yalnız Türkçe ve Win/Linux/Android/web kapsamı.
MEBİ TYT Matematik PDF28–30; Kimya PDF11–29 incelendi. Rasyonel/sembolik/
simya Aurelia kağıtları da okundu. Kamuya açık5 ÖSYM kitapçığı indirildi;
8 referans soru ve anahtar sayfalarıyla kontrol edildi:2018/2021TYT,2026
ALES2,DGS,KPSS. 2006–2026 bütün oturumlar taranmış değildir, arşiv kısmi.

YKS-016 yeni3tarayıcı testinin ilk koşusunda iki sorun bulundu: büyük yazıda
header düğmesinin min-content taşması ve sınav seçiminin etiketle bulunmaması.
İkisi düzeltildi;3/3 odaklı test PASS. Sonraki rehber eklemeleri ardından
Yerel check/build,64unit ve tam64/64Chromium kabulü PASS (4,5dk).
Son bağlantı etiketi düzeltmesi ardından9/9anlatım regresyonu PASS. Linux
geliştirme Electron'u offline/reload/process restart, derin rehber, kaynak
bağlantıları ve yeni bölme modelinde PASS; rendererErrors0. Bankadaki115
sorunun bütün alanları0.5.3ile aynen korunduğu ayrıca karşılaştırıldı.
Gerçek özel Aurelia PDF: inline/readingPage/not/offline PASS. Gerçek2021TYT
resmî PDF: hash ile import, offline soru26/anahtar45sayfası PASS. Bunlar
CI'ye veyaGit'e konulan özel dosyalar değildir.
12temsilci model şablonu, koyu/açık masaüstü,390px ve320pxbüyük yazı
görsel/etkileşimsel incelendi. Şema sembollerinde ve etiketlerde gözlenen
kusurlar giderildi. Son filter regex düzeltmesi ALES'i Thales/Kalesi
sözcüklerinden ayırır; birim kontrolü var. Son check/unit/build ve64unit PASS; ilgili2YKS-008 kaynak regresyonu PASS.
PaketlenmişCI/public/release BEKLİYOR.

---

# Korunan ağaç yönü düzeltmesi

TYT/AYT kökleri üstte, ders dalları aşağıya açılır. Yayımlanacak0.5.3
yamasındaki SVG ve mevcut YKS-010 yön denetimi bu yerel konu dalına aktarıldı.
Build ve ağaç/küçük ekran2browser PASS. 50 anlatımlı bu dal yayımlanmadı;
önceki konu/kaynak QA durumu aşağıdaki kayıtlarda korunur.

---

Public hotfix0.5.2 teslimi tamamlandı: uygulama/paket kaynağı7aedafb;
GitHub main belge başı45ba975. CI43580314183 tüm4job PASS, public43579996297
50/50 PASS, release43581051297 PASS;0.5.2-alpha.1 sekiz asset yayımlı.
Vercel production READY/version.json0.5.2. Ayrıntılı public teslim kaydı
fix/question-passage dalındaki FORGE.md / docs/QA.md içindedir. Bu dalın
50 anlatımlı çalışma kopyası yine yayımlanmamıştır; aşağıdaki59/61 yerel sonuçlar
onun ayrı kanıtıdır. Yeni görsel/native QA ve kaynak kapsam tablosu ardından
sıradaki konu40/detail203 ile devam edilebilir.

# Yayımlanmamış konu üretimi — son yerel kontrol

forge/source-ordered-theory; uygulama kaynağı5f54192. Check/build,59 birim ve
61/61 tam Chromium kabulü PASS (forge-final-unit.log / forge-final-browser.log).
Yeni50 anlatımlı dal,27 theory-only ek içerir; public main yalnız paragraf
hotfix'idir,23 anlatım/115 sorudur. Tam61 koşusu yeni27 anlatımın senaryoları,
hatırlama/offline seçimleri,11-model320px %200 UI/%150 metin/axe, anlamlı
sayısal/sözcük kontrolü,3/7/21 teori tekrarları ve YKS-015 düzeltmesini içerdi.

İki kusur düzeltildi: atom karşılaştırmasının6 sütunu büyük yazıda sayfayı
taşırıyordu; değerler iki okunabilir, dar ekranda üst üste gelen tanecik kartına
dönüştürüldü. Sözcük modelindeki kitapta düğmesi testte şema adımıyla karışıyordu;
ses değişimi bölgesindeki gerçek kontrol hedefleniyor. Atom kartları ve diğer
son yeni modellerin normal koyu/açık görsel incelemesi/native kabulü halen
NOT TESTED; bu dal henüz yayın hazır diye sunulmamalı. Kaynak sayfa kayıtları
pack.source alanlarında; public SOURCE_REVIEW kapsam tablosuna taşınmalı.

Metinsiz soru hotfix7aedafb bu dala merge edildi; yeni59/61 kontrollerde de
geçti. Eski notlar/115 anahtar korunur. Sonraki konu40/detail203,41/detail204.
Aurelia iki ilgili PDF'nin1–4 sayfaları ayrıca okundu, özel next-theory-reading
notunda kaynak düzeltmesi var: iki tarafı0 ile çarpmak eşitliği sağlar ama
çözüm eşdeğerliğini korumaz. Yeni soru bankası ekleme; önce konuları sürdür.

---

# YKSMania 0.5.2 — soru bağlamı düzeltmesi

Öncelikli kullanıcı hatası YKS-015: metinsiz ana düşünce sorusu. Önceki konu
üretiminin 50 anlatımlı çalışma kopyası /workspace/yksmania içinde korunuyor;
bu hotfix ayrı /workspace/yksmania-question-fix, fix/question-passage dalında
9cf8a65 üzerine hazırlanıyor. Yeni konuları yayın hazırmış gibi bu yamaya katma.

0.5.1 normal Sorular girişiyle eksik metin FAIL gözlendi. Tam özgün paragraf
beş soruya passage olarak eklendi; soru, anlatım ve keşif aynı kaynağı kullanır.
Diğer 110 soru da eksik bağlam açısından okundu; A–B koordinatları ve birkaç
model/deney koşulu açıklandı. IDs/anahtar/not/oturum/tekrar politikası korunur.
115 soru, 23 anlatım; bütün arşiv veya müfredat hazır iddiası yok.

İçerik guard’ı ve kalıcı YKS-015 kabulü eklendi. Yerel check/build ve45 birim
PASS; tam Chromium tarayıcı koşusu50/50 PASS (3,1dk). Normal soru girişi,
beş soruda tam metin, ipucu, hatalı/doğru cevap, her adımda offline reload,
not,5/5 sonuç ve başka derse geçince metnin kaldırılması test edildi.
320px, %200 arayüz/%150 yazı, açık tema, dokunma, yatay/dikey ve ciddi-kritik
axe PASS. 1440/390px koyu/açık dört soru paneli görsel incelendi; rootWidth
viewport ile eşit, renderer hatası0. İç scroll yok; notesbelow geometrisi PASS.
Linux geliştirme Electron'u offline/paragraf taslağı/process restart/tam5/5
kabulü PASS, renderer0. Bu yerel paketlenmiş/kurulum veya fiziksel cihaz testi değildir.
115 ID/anahtar/seçenek/açıklama eski içerik dökümüyle birebir karşılaştırılıp
korundu; p1–p5 passage taşıyor. WIP konu üretimi07e46da dal commit'inde saklı.

AIONIA v1.7 canlı standardı yeniden okundu, aynı revizyon. Art değişmedi.

Sürüm0.5.2, Android code10. Kaynak596882d GitHub main'e gönderildi;
Vercel production dpl_2T8VBids1QSF3K5QLSZ27BuCLZ9K READY, public version.json
0.5.2 doğrulandı. Yerel tarayıcıyla HTTPS kabulü proxy sertifika kökü nedeniyle
ERR_CERT_AUTHORITY_INVALID / BLOCKED; TLS doğrulaması kapatılmadı. GitHub
Published web acceptance43579996297 aynı kaynağın public site kabulünü yürütüyor.

İlk CI43579848849:45unit PASS, browser49/50. Mobil test hatalı cevabın
optimistik görünümünden hemen sonra IndexedDB kaydını beklemeden reload yapmış;
normal kaydediliyor/kaydedildi durumunu izlemiyordu. Test, kayıt başarı durumunu
bekleyecek şekilde düzeltildi; yanlış cevabın, metnin ve notun reload sonrası
korunma beklentisi aynı kaldı. Odaklı yerel2/2 tekrar PASS. Uygulama kodu
bu test düzeltmesinde değişmedi. Yeni CI/paket ve canlı sonuçlarını ekle;
fiziksel cihaz/temiz kurulum doğrulaması varsayma. Tarihsel kayıt aşağıdadır.

---

# 14 Kasım devam durumu — konu üretimi taslak dalı

forge/source-ordered-theory dalı; henüz yayınlanmadı. 27 yeni theory-only anlatım,
23 eski anlatımla toplam50; 115 soru korunur. Excel/Todoist sırasındaki ilk39
başlık anlatıma bağlıdır. 479 başlıktan kesin eşleşen49 anlatım var; geometri
alan dönüşümü mevcut haritaya uydurma bağlanmaz. Bir sonraki hazırlanmamış
başlık40/detail-203 Birinci Dereceden Denklemler, ardından detail-204 eşitsizlikler.

Biyoloji detail1–10; Matematik detail199/200/201; Tarih detail226–231;
Fizik detail114/115/116/118; Kimya detail144/145; Türkçe detail250/251.
Her yeni pack kaynak sayfaları,5+ açıklama bölümü,3 senaryo,3 püf noktası,
2 puansız hatırlama içerir. Sayısal ve sözcük modelleri aktif. Sorusu olmayan
anlatım hazır soru seti değildir; boş oturum oluşturamaz.

Tekrar altyapısı: ilk çalışma1.gün;3/7/21.gün özgün hedefleri +2/+6/+20;
teori+soru ortak uygun-gün kapasitesi, tekrarlar Bugün'de yeni işlerin önünde;
açık durable/geri alınabilir tekrar işareti; XP ve soru yanıtı üretmez.

Ortam kesintisi sonrası check +55unit PASS (forge-resumed-unit.log).
41 anlatımlı ara yapıda56 browser PASS; son50 anlatımlı yapı ve11-model mobil
süpürmesi henüz tam browser/native doğrulamasından geçmedi. Yeni içerik hazır
live sanılmamalı. Source-review-0.6 ve özel çalışma dosyaları Git'e konulmaz.

Kullanıcının metinsiz paragraf hatası acil öncelik aldı. YKS-015 onarımı ayrı
/workspace/yksmania-question-fix / fix/question-passage dalında0.5.2 olarak
hazırlanıyor; bu kaynak üretimini hotfix'e katma. Onarım yayınlanınca buraya
merge edilip model/content/Study çatışmaları korunarak çözülmeli. Eski passage
hatasını tekrar taşımamak için yeni question-content testleri burada da koşmalı.

Eski çalışma notları aşağıda tarihsel olarak tutuluyor; üstteki50/27/39 sayıları
günceldir. Konular önce; sonra kopya kağıtları; sonra soru bankası üretimi.

---

# Forge in progress: source-ordered theory and review-first learning

Active request: continue substantial source-based development, theory first, then
cheatsheets, then questions. Every new theory needs meaningful interactive visuals,
pitfalls, explanatory reasoning and recall. Do not promise addictive manipulation,
mastery of every MEB publication or completion of 479 authored topics prematurely.
Turkish-only project decision remains; no k44 activation or platform expansion.

Working copy adds theory-anchored review completions, shared theory/question review
capacity, first-study day 1 / repeats +2,+6,+20, (İlk tekrar)/(İkinci tekrar)/(Son tekrar).
Existing question review IDs and original dates are unchanged. Today queue precedes
new daily assignments; hero prioritizes a due repeat, Calendar/Result use the same
combined plan. Explicit theory-repeat marks are durable/undoable, no XP or answers.
New optional state field defaults safely in older backups; no IndexedDB schema bump.
Focused review browser acceptance 2/2 PASS on the first working build; check/unit
runs pass (latest count in logs). Full/native/live verification remains pending.

New theory-only narrative registry currently holds ten TYT biology topics (detail-1
through detail-10) and mathematics place value (detail-199). Eleven additions to
23 old lessons = 34 working-copy narratives; question bank stays 115, 23 sets.
Zero-question narratives never appear as ready question sets or create empty sessions.
Original content and IDs must be retained. Generic interactive flow cases have
per-topic nodes, explanations, worked reasoning and persisted unscored recall;
pH/chain/basamak/yüzyıl/özkütle/hareket numerical manipulators are being integrated.
Read source PDFs, not inventory presence, establish readiness. App code is not yet
published by this checkpoint; last public version is 0.5.1 / source 776f62c.

Sources remain private under /workspace/work/source-review-0.6 and attachments.
Read: MEBİ TYT Biyoloji selected PDF11–17,20–21; OGM common traits10–17,
compounds I10–19, compounds II10–16; Aurelia scientific method1–8, minerals1–3,
place value1–5, physics intro1–5. History selected source readings and previews
are in the ongoing task; record exact reviewed pages when publishing. Extraction
of entire books is not full review. Several original source tables have broad
claims or typos; authored text preserves conditions instead of copying them.
No private PDF/Drive IDs/raw excerpts belong in Git. Private pack export rejection
from earlier work remains in force; no alternate export was tried.

Next: fill missing source-order entries14–21 (place value now authored, history
and physics in progress), continue theory development beyond that checkpoint;
complete review/visual/source QA and keep a verified coverage record. The user
asked to keep progressing, not stop after five lessons or at a deployment.
No new scored question bank work before the theory phase. Geometry coverage gap
in the supplied 479-heading order remains and must not be silently invented away.

---

# Historical checkpoint: YKSMania 0.5.1 alpha

Kullanıcı bildirimi: Bugün → Bugünün çalışma yolu ekranında Simyadan Kimyaya
çalışılmış olmasına ve beş soruda dört doğruya rağmen tamamlanma/sonuç görünmüyor.
YKS-013. Önceki 0.5.0 build’inde normal arayüzle konu kaydı + 4/5 soru oturumu
sonrası Bugün’e dönüşte yeni kabul testi FAIL: tamamlanan günlük satır yok.
Doğrulanan neden: liste yalnız studyPlan.items (kalanlar) çiziyordu; tamamlanan
konular filtreleniyor, kaydedilen Session yanıtları satıra bağlanmıyordu.

Onarım: günlük liste, kalan bugünkü atamalar + bugün çalışılmış konular + bugünkü
son soru denemelerinin tekil birleşimidir; Excel sırası korunur. Tamamlanan konu
yeşil onay ve metinle görünür kalır. Her iki kartta son tamamlanmış denemeden
“5 soruda 4 doğru · 1 yanlış”, soru tarihi, varsa bağımsız doğru/ipucu bilgisi ve
Sonucu gör bağlantısı bulunur. Tüm çalışma sırası listesi de aynı satırı kullanır.
Son deneme gösterilir; en iyi skor seçilmez, tekrarların cevapları toplanmaz.
Eksik oturum sonuç sayılmaz. Haricî çalışma işaretine uydurma 0/5 atanmaz.

Önceki sadece-soru kaydı teoriye çevrilmez: satır “Konu henüz işaretlenmedi” der,
aynı karttaki Konuyu çalıştım ile açık/durable/geri alınabilir konu bildirimi
sunulur. Kayıt başarısızsa tamamlandı gösterilmez; soru sonucu korunur. Teori ve
soru planları, XP, orijinal tekrar tarihleri ve 479 başlık sırası değişmez.
Mevcut veritabanı/yedek biçimi aynı; eski kayıtlar kendiliğinden gösterilir.
Hazır içerik değişmedi: 23 anlatım / 115 özgün soru. Yeni PDF/art üretimi yok.

Fragaria Unslop güncel UI/davranış profili uygulandı; canlı AIONIA v1.7 14 Kasım
2026 yeniden okundu, revizyon aynı. Karakter/splash kapsam dışı ve değiştirilmedi.
Yerel check/build, 41 birim testi ve dört yeni YKS-013 kabulü PASS. Mobil 320px,
%200 UI / %150 yazı, açık tema, ciddi-kritik axe, offline reload, 0/5, yeniden çözme,
oturum geri alma, disk yazma hatası/yeniden deneme ve kapalı günde dış kaynak
kaydı test edildi. Linux Electron günlük konu + soru sonucu ve süreç restart PASS,
renderer hataları 0. Tam tarayıcı koşusu 48/48 PASS (2,8 dk).
1440×1000 koyu/açık ve 390×844 koyu/açık günlük kartları görsel incelendi;
320px büyük yazıda gerçek kontroller/taşma ölçümü PASS, renderer hataları 0.
Uzak paket ve yayın sonuçları aşağıdadır.
Sürüm 0.5.1 / Android versionCode 9. Önceki fiziksel cihaz/imza/update kapıları açık.

## 0.5.1 dağıtım ve paket takibi

Uygulama/test kaynağı: `776f62c1603d9af7b37dbdf5fdbbee6c49f569d7`.
Vercel normal Git dağıtımı `dpl_2a1omXD7s6HJosPdx6LzBZiirp2r` üretimde READY;
kanonik https://yksmania.vercel.app/version.json 0.5.1 döndürür. Canlı kabul
[43569397941](https://github.com/kaansavukduran/yksmania/actions/runs/43569397941)
48/48 PASS (3,8 dk). Test ve üretim uygulama kaynağı aynı 776f62c. [Paket CI 43569363475](https://github.com/kaansavukduran/yksmania/actions/runs/43569363475)
dört işte PASS: check/build, 41 birim testi, 48 tarayıcı senaryosu (2,0 dk);
Windows/Linux paketlerinde günlük tamamlanma ve son soru sonucu, offline/reload/
process restart PASS, renderer hataları 0. Android debug APK imza/manifest PASS.
[Yayın 43570014722](https://github.com/kaansavukduran/yksmania/actions/runs/43570014722)
PASS: [v0.5.1-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.5.1-alpha.1)
public/prerelease, sekiz dosya (beş native paket + üç kanıt/checksum). Başarılı
43569363475 paketleri yeniden derlenmeden yayımlandı. Tag ve indirilen
verified-run.json aynı 776f62c1603d9af7b37dbdf5fdbbee6c49f569d7 kaynağına bağlı.
İndirilen iki kanıt dosyasının SHA-256 değerleri eşleşti; beş büyük binary ayrıca
yerelde yeniden indirilip hash’lendi denmez. Android code 9 / name 0.5.1 /
minimum API 24 ve APK v2 imzası doğrulandı; public APK adresi HTTP 200.

Fiziksel Android, temiz Windows installer/portable taşıma, üretim imzası ve iki
sürümlük native güncelleme NOT TESTED. Windows imzasız, APK debug imzalı.
Soru sonucunu göstermeyi konu ustalığı veya sınav puanı artışı diye sunmayın.

---

# Historical checkpoint: YKSMania 0.5.0 alpha

Excel sırasının 6–10. başlıkları geliştirildi: Temel Kavramlar, Tek Çift Pozitif
Negatif Sayılar, Ardışık Sayılar, Asal Sayılar, Faktöriyel Kavramı. Beş özgün
etkileşimli anlatım ve 25 özgün soru; toplam 23/115. OGM Video Ders Notu iki
dosyanın dokuz seçili sayfası ve Aurelia beş kopya kağıdının on dört seçili sayfası
yakın okundu. Asal sayılarda doğrudan kaynak Aurelia’dır; atıf yaptığı orijinal
MEB kitabı ayrıca okunmadı. Sayfa/kavram/anahtar kaydı SOURCE_REVIEW.md içinde.
Arşivin tamamı, resmî soru bankası veya tüm müfredat hazır diye sunulmaz.

Sayı kümeleri çoklu seçim ve gerekçe; tek–çift/işaret işlemleri; ters eşleme ile
ardışık toplam; √n dahil bölen denemesi ve çarpan grupları; farklı kitapları
sıralayarak faktöriyel ve ortak çarpan sadeleştirmesi. Seçimler offline kalıcıdır,
keşif XP/ustalık kazandırmaz. Eski 18 anlatım/90 sorunun tüm içerik alanları
birebir korunur. Plan 479, ana harita 341 ve geometri açığı değişmez. Yeni soru
kimlikleri bas/par/seq/pri/fac-1…5; eski tekrar tarihleri/notlar/taslaklar korunur.

Güncel Fragaria Unslop ve React kontrol listesi uygulandı. Canlı AIONIA v1.7 ve
indeks v3 yeniden okundu (14 Kasım 2026), revizyon aynı. Bu tur karakter/manzara
varlıkları değişmedi; önceki piksel tercih ve 32 poz regresyonları korunur.
YKS-012 yeni asal SVG’sinin gereksiz sabit yüksekliği gözlenip düzeltildi; eski
sürümde varmış gibi sunulmaz. Matematik çizimleri açık/koyu ve mobilde incelendi.

Yerel PASS: check/build, 40 birim/depolama/içerik, 44/44 tarayıcı (2,4 dk).
320px / %200 UI / %150 yazı / azaltılmış hareket, gerçek kontrol kullanımı,
offline ilk açılış/reload, ciddi-kritik axe beş modelde PASS. Electron Linux beş
yeni modeli offline açar; 49 bölen kanıtı süreç yeniden başlayınca korunur;
renderer hata sayısı 0. Uzak paket/yayın doğrulaması aşağıdadır.

Web 0.5.0 dağıtımı READY: dpl_J5zjwumi6YL1dCXDJXAFaaBnF5nE,
kaynak bd95c5ddf89eaed78445710dbea91b2f45517e23. Kanonik /version.json
0.5.0 döndürür. Normal Git entegrasyonu yayımladı; manuel kota tekrarı/host/plan
değişikliği yok. [Canlı kabul](https://github.com/kaansavukduran/yksmania/actions/runs/43567601148)
44/44 PASS (3,8 dk), aynı bd95c5d kaynağı. Paket CI 43567554549 dört işte PASS;
nihai paket/release kanıtı aşağıdadır.

Sürüm 0.5.0 / Android versionCode 8. Fiziksel Android, temiz Windows kurulum,
portable taşıma, üretim imzası ve iki sürümlük native güncelleme açık kapılardır.
Sıradaki içerik önceliği 11. başlık: Canlıların Karakteristik Özellikleri.

## 0.5.0 uzak teslim doğrulaması

- Uygulama ve paket/test kaynağı: `bd95c5ddf89eaed78445710dbea91b2f45517e23`.
- [Paket CI](https://github.com/kaansavukduran/yksmania/actions/runs/43567554549)
  dört işte PASS: check/build, 40 birim/depolama/içerik testi ve 44 tarayıcı
  senaryosu (1,9 dk). Windows/Linux paketleri yeni beş matematik modeli ve 49
  bölen kanıtının süreç yeniden başlatma sonrası kalıcılığını, eski AYT/kimya/
  kopya kağıdı/PDF/konu-plan/soru kaydını offline doğrular. Renderer hataları 0.
  Android debug APK derlemesi ve imza/manifest kontrolü PASS.
- [Canlı web kabulü](https://github.com/kaansavukduran/yksmania/actions/runs/43567601148)
  44/44 PASS (3,8 dk). Test ve web uygulama kaynağı aynı bd95c5d;
  READY üretim dağıtımı dpl_J5zjwumi6YL1dCXDJXAFaaBnF5nE, kanonik
  https://yksmania.vercel.app/version.json 0.5.0 döndürür.
- [Yayın koşusu](https://github.com/kaansavukduran/yksmania/actions/runs/43568202257)
  PASS. [v0.5.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.5.0-alpha.1)
  public/prerelease, sekiz dosya: Windows Setup/Portable x64, Linux DEB/AppImage,
  Android debug APK ve üç kanıt/checksum dosyası. Yeniden derleme yok; başarılı
  43567554549 paketleri kullanıldı. Tag ve indirilen verified-run.json aynı
  bd95c5ddf89eaed78445710dbea91b2f45517e23 kaynağını gösterir. İndirilen iki
  kanıt dosyasının SHA-256 değerleri listeyle eşleşti. Beş büyük native dosyanın
  tamamı yerelde tekrar indirilip hash’lendi iddiası yoktur. Android code 8 /
  name 0.5.0 / minimum API 24 / APK v2 imza doğrulandı; public APK adresi HTTP 200.
- Fiziksel Android, temiz Windows installer/portable taşıma, kararlı üretim imzası
  ve iki sürümlük native güncelleme NOT TESTED. Windows imzasız, APK debug imzalı.
  Otomatik executable testleri bu açık kapıların yerine geçmez.

---

# Historical checkpoint: YKSMania 0.4.0 alpha

İstek: 18 Haziran 2027 varsayılan sınavı; 28 Şubat 2027 konu bitirme hedefi;
Excel/Todoist sırası ve kapalı günlere göre konu/soru ölçekleme; gün/ay/yıl;
Kütüphane menüsünü kaldırma; tek ders grafiği ve TYT/AYT ağaçları; kaynaklı yeni
anlatımlar, daha zengin referans uyumlu piksel Aion.

Uygulandı: iki bağımsız 479 başlıklı plan, bugünün tam sayı hedefi, tamamlanandan
sonra azalan günlük kuyruk, tarihli tüm çalışma sırası, takvim konu/soru yükleri,
kalıcı/geri alınabilen manuel kayıt. Uygun gün hesabı bugün/hedef dahil; yinelenen
kapalı tarih ve hafta günü bir kez çıkarılır. Geçmiş hedef/uygun gün yok/tamamlandı
ayrı gösterilir; sıfıra bölünmez. Yeni soru oturumu konu anlatımını otomatik
bitirmez; eski tamamlanmış derslerin tarihsel kayıtları korunur. İşaretler XP,
ustalık veya cevap kaydı oluşturmaz; eski tekrar hedefleri değişmez.

Çalışma sırası güncel Excel Üretim Sırası ile 479/479 tekil eşleşti; Todoist’in
536 satır / 479 ilk çalışma başlığı aynı sırayı doğruladı. Kişisel tamamlanma,
tarih ve özel Drive kimlikleri import edilmedi. Ayrıntılı listenin geometri açığı
vardır; 341 ana harita korunur, bu iki liste toplanmaz. OGM iki fasikülde sekiz
anlatım sayfası yakın okundu; ilk beş kimya başlığına beş özgün görsel anlatım ve
25 alıştırma eklendi. Toplam 18/90. Tüm arşiv veya bütün müfredat hazır denmez.
Kaynak/sayfa/kavram/anahtarlar docs/SOURCE_REVIEW.md içinde.

Dünyam: 15 dersi bir halkada, konu sayısına ağırlıklı renkli tamamlanan alanlarla
gösterir. TYT solda, AYT Sayısal sağda; dar/büyük ölçekte alt alta. Dallar kaynak
çalışma sırasıdır, doğrulanmış bir önkoşul grafiği iddiası değildir. Kaynak içe
aktarma Ayarlar’a taşındı; eski /library bağlantısı, PDF’ler ve notlar korunur.
Uygulama yalnız Türkçe; önceki kopya kağıdı ayrımı ve tam genişlik/alttaki notlar korunur.

Aion ana pafta ve T-pose A tekrar incelendi. Kullanıcının son açık piksel isteği,
eski cartoon tercihini bu uygulama için değiştirir. Yeni 8×4 atlas 32 pozu,
farklı klik tepkilerini ve fare yönü bakışını içerir. Dünya konumu sabit; kare
bazlı ayak çıpası metadata ile düzeltilir. Yeni manzara ilerlemeyle renklenir.
Azaltılmış hareket, görünmez/arka plan duraklaması korunur. Ayrıntı ART_BIBLE.md.
Güncel Fragaria Unslop/Unslop, React kontrol listesi ve canlı AIONIA v1.7 / indeks
v3 kullanıldı. Yeni yetki gerektiren dışa aktarım denenmedi.

Yerel/uzak son doğrulama sonuçları aşağıdaki teslim kaydına eklenir. Sürüm 0.4.0,
Android versionCode 7; fiziksel cihaz, temiz kurulum/portable taşıma, üretim imzası
ve iki sürümlük native güncelleme açık kapılardır.


## 0.4.0 yerel kontrol

TypeScript/build ve 35 birim/depolama/içerik testi PASS. 38 benzersiz tarayıcı
senaryosu yerel tam + hedefli koşularda geçti; bir tam koşunun PDF kurulumu dist
aynı anda değiştiğinde zaman aşımına uğradığı için o koşu tam PASS sayılmadı.
Sabit son derleme üzerinde PDF tekrarları ve yeni gece yarısı/arka plandan dönüş
regresyonu PASS. Sabit uygulama derlemesinde sonraki tam yerel koşu 38/38 PASS. Uzak CI ve paket sonucu aşağıda ayrı kaydedilir.
Chromium 156.0.8078.79 / Node 24.22.1 / Linux. Koyu 1440×1000 ve açık 390×1000,
beş kimya modeli, 32 ayrı Aion karesi incelendi. 320px/%200 UI/%150 yazı gerçek
kontrol akışı PASS; taşma/kırpma onarımları QA.md içinde. Örnek görsel akışta
renderer hataları 0. Electron Linux beş OGM modeli, konu kaydı, eski AYT/cheatsheet,
offline 5/5 soru, reload ve süreç yeniden başlatma PASS; renderer hataları 0.
Yeni yayın ve native dosyalar doğrulanınca ayrı teslim kaydı eklenir.


## 0.4.0 teslim doğrulaması

- Nihai paket/test kaynağı: `66539f0830c544dbc4a6de9964e2924a3a7d304a`.
- [Nihai paket CI](https://github.com/kaansavukduran/yksmania/actions/runs/43523758199)
  dört işte PASS: check/build, 35 birim/depolama/içerik, 38 tarayıcı; Windows/Linux
  paketlerinde beş OGM görseli, iki hedefli plan/konu kaydı, 5/5 özgün soru,
  offline/reload/process restart, önceki AYT ve kopya kağıdı regresyonları. Renderer
  hataları 0. Android debug APK imza/manifest kontrolü PASS. Önceki 43522838357 de
  dört işte PASS olmakla birlikte son test-harness düzeltmesinden önceki kaynaktır.
- [Canlı 0.4.0 kabulü](https://github.com/kaansavukduran/yksmania/actions/runs/43523965580)
  **38/38 PASS**, kanonik https://yksmania.vercel.app üzerinde. Test kaynağı 66539f0,
  Vercel üretim uygulama kaynağı `0101829fcfaa1d9dcac6fd841ec48ef6868cb3a5`;
  READY dağıtım `dpl_AiuejjxxkVQsQmyM3z9aykBwT8F7`. /version.json 0.4.0 döndürür.
  Son commit yalnız tests/e2e/app.spec.ts ve docs/QA.md değiştirir. src ağaç hash’i
  iki kaynakta da da489899679e77a886b2b812f25a6583ac0b1e92; public hash’i iki
  kaynakta da 107144b7cc07e85dc20006fcfeb3367aaa9f6cc9. src/public/package/
  android/desktop/scripts/vercel diff’i sıfırdır; eski sürüm üzerinde yeni işlev
  PASS iddiası yapılmaz. 66539f0 için Vercel günlük kota durumu failure: yeniden
  dağıtım, ücret/plan değişimi veya alternatif host denenmedi. Mevcut yayındaki
  aynı 0.4.0 uygulama kodu güncellenmiş test bekleyişleriyle doğrulandı. 66539f0’ın
  Vercel’e dağıtıldığı iddia edilmez. İlk iki public koşu nihai PASS sayılmaz.
- [Yayın koşusu](https://github.com/kaansavukduran/yksmania/actions/runs/43524926879)
  PASS: [v0.4.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.4.0-alpha.1)
  herkese açık, prerelease; beş native dosya + üç kanıt/checksum dosyası. Yeniden
  derleme yok: 43523758199 çıktıları kullanıldı. Etiket ve indirilen verified-run.json
  tam kaynak 66539f0830c544dbc4a6de9964e2924a3a7d304a ile eşleşir. İndirilen iki
  kanıt dosyasının SHA-256 değerleri checksum listesiyle eşleşti; büyük native
  dosyaların tamamı yerel makineye indirilip yeniden hash’lenmiş diye sunulmaz.
  Android versionCode 7 / versionName 0.4.0 / minimum API 24 ve APK v2 imzası
  doğrulandı. Herkese açık APK indirme bağlantısı HTTP 200. Windows Setup/Portable,
  Linux amd64 DEB / x86_64 AppImage ve Android debug APK dosyaları hazır.
- Native fiziksel Android, temiz Windows kurulum/portable extractor/taşıma,
  üretim imzası ve iki paket arası güncelleme henüz doğrulanmadı. Emulator/runner
  testleri bu açık kapıların yerine geçmez. Özel kaynak PDF’leri public pakete
  gömülmez; yeni içerik toplamı 18 anlatım/90 özgün sorudur, 479 hazır anlatım değildir.

---

# Historical checkpoint: YKSMania 0.3.1 alpha

Kullanıcı isteği: kopya kağıtları derslerin içinde görünmesin; sol menüde Konu
Anlatımı ile Sorular arasında ayrı bölüm olsun. Yeni /cheatsheets yolu TYT/AYT,
ders, konu araması ve 479 kaynak başlığını içerir. Ders açıldığında konu listesi
görünür; konu seçimi ilgili kopya kağıdı PDF’lerini açar. Dersteki tüm PDF’ler
ayrı açılabilir; konusu eşleşmeyen dosyalar burada erişilebilir kalır.

Konu Anlatımı ve Sorular’dan kopya kağıdı alt başlıkları kaldırıldı. Ortak kaynak
türü filtresi cheatsheet dosyalarını yalnız yeni bölümde gösterir; diğer PDF
türlerinin yerleşimi korunur. Açık katalog konu kimlikleri önceliklidir; kimlik
olmadığında tam başlık sözcük dizisinin Unicode dosya adı eşleşmesi kullanılır.
Belirsiz/kısmi sözcük eşleşmeleri konuya bağlanmaz. Kaynak PDF’leri herkese açık
pakete gömülmez; Kütüphane’deki içe aktarma ve yerel PDF okuyucu yeniden kullanılır.
Kayıt/veritabanı biçimi, soru kimlikleri, ilerleme, notlar ve tekrar tarihi değişmez.

Güncel Fragaria Unslop ve React bileşen kontrolleri uygulandı. AIONIA canlı kaynağı
2026-11-13 yeniden okundu: v1.7. YKS-008 gezinme regresyonu eski eb5ab16 kaynağında
başarısız olarak gözlendi. Yeni akışta 320px, %200 arayüz ve %150 yazıda 477px
sayfa taşması yakalandı: arama alanının 14rem minimumu ve tek sütunlu grid’in
min-content boyutu. Ortak arama ve konu kartı sınırları düzeltildi; yazı/ölçek
küçültülmez, içerik kırpılmaz. Yeni sayfanın gereksiz çift iç boşluğu kaldırıldı.
Kopya kağıtları konu anlatımına alan kaybettirmez; notların altta kalması korunur.

İçerik miktarı aynı: 341 ana konu, ayrı bölümde 479 kopya kağıdı başlığı,
13 görsel anlatım / 65 özgün soru. Sürüm 0.3.1, Android versionCode 6.
Yerel PASS: check/build, 26 birim/depolama/içerik ve 28 tarayıcı kabul testi.
Electron Linux yeni bölümün ilk çevrimdışı açılışı, AYT modelleri, ders kaydı,
yeniden yükleme ve süreç yeniden başlatma PASS; renderer hatası 0. Chromium
156/Linux, koyu 1440×1000 ve açık 390×1000 ekran görüntüleri incelendi; taşma ve
renderer hatası yok. 320px, %200 arayüz / %150 yazı, ilk çevrimdışı giriş, gerçek
manuel PDF açma ve ciddi/kritik axe kontrolleri PASS. Yeni yayın ve native paket
CI sonuçları teslim kaydına eklenir. İlk 27584be dağıtımı Vercel günlük sınırına
takıldı ve eski 0.3.0 üzerinde yeni test çalıştırılmadı. Gerçek çoklu arama hatasını
gideren son 3f3cb54 kodunun otomatik dağıtımı ise READY:
dpl_JBh2d7qbX56PY8g65ZFKju5LLkJM. Kanonik /version.json artık 0.3.1 döndürüyor;
yeni canlı kabul koşusu bu kaynağa karşı başlatıldı. Plan/ücret değişikliği,
alternatif host veya manuel kota aşma/yeniden deneme yolu kullanılmadı. Eski fiziksel cihaz,
temiz kurulum/portable taşıma, üretim imzası ve iki paket arası güncelleme kapıları
açıktır. Özel Drive dışa aktarımı bu turda yeniden denenmez.

Son arama kontrolü: “asit” üç dersi eşleştirdiğinde tek bir dersteki tüm PDF’ler
düğmesi üç kaynak listesini birden açıyordu. Gerçek UI ile gözlendi (3 → 3).
Düğme artık açık dersi de seçer; yeni regresyon yalnız bir kaynak listesi ve bir
açık ders bekler. İlk paket koşusu 43507301865 başarılı olsa da bu son düzeltmeden
öncedir; nihai paket ve yayın kanıtı sonraki kaynak/koşuyla kaydedilecektir.

## 0.3.1 teslim doğrulaması

- Nihai uygulama kaynağı: `3f3cb54fa541ec71ab2272197343eab00909a281`.
- Vercel üretim dağıtımı `dpl_JBh2d7qbX56PY8g65ZFKju5LLkJM` READY, kaynak eşleşir.
  https://yksmania.vercel.app/version.json 0.3.1 döndürür.
- [Canlı web kabulü](https://github.com/kaansavukduran/yksmania/actions/runs/43509055312)
  28/28 PASS; yeni menü sırası, ayrı kaynak türü, konu PDF’si, not/taslak koruma,
  çevrimdışı ilk giriş ve %200/%150 dar ekran akışları dahil.
- [Nihai paket CI](https://github.com/kaansavukduran/yksmania/actions/runs/43508957418)
  dört işte PASS: 26 birim/depolama/içerik, 28 tarayıcı; Windows ve Linux paketli
  yeni bölüm/AYT/çevrimdışı ders/yeniden yükleme/süreç yeniden başlatma kontrolleri,
  renderer hataları 0. Android debug APK imza ve manifest kontrolü PASS.
  Önceki 43507301865 koşusu son düzeltmeden önceki kaynaktır; nihai paket kanıtı
  yerine geçmez. Yayın bu nihai koşunun beş dosyasını yeniden derlemeden kullanır.
- [Yayın koşusu](https://github.com/kaansavukduran/yksmania/actions/runs/43510112404)
  PASS: [v0.3.1-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.3.1-alpha.1)
  herkese açık; Windows Setup/Portable, Linux AppImage/DEB ve Android debug APK
  ile üç kanıt/checksum dosyası hazır. Etiket ve indirilen verified-run.json
  nihai kaynak 3f3cb54 ile eşleşir. İndirilen iki kanıt dosyasının SHA256 değerleri
  SHA256SUMS ile eşleşir; listede yedi dosya var. Android versionCode 6 /
  versionName 0.3.1 / minimum API 24 ve APK v2 imzası doğrulandı. APK bağlantısı
  HTTP 200. Önceki sürümler korunur; sonraki dokümantasyon commitleri uygulama
  kodunu değiştirmez. Fiziksel cihaz/temiz kurulum/güncelleme açık kapıları korunur.

# Delivered checkpoint: YKSMania 0.3.0 alpha

Uygulama yalnızca Türkçe kalır. Bu turda Aurelia içindeki dört MEBİ AYT konu
özeti dosyasından 12 ilgili PDF sayfası yakın okumayla incelendi. Formül ve şekil
örnekleri görsel olarak da açıldı. Özel kaynak dosyaları ve kimlikler Git dışında
kalır. Sayfa eşlemeleri, model sınırları ve özgün cevap kontrolleri:
[docs/SOURCE_REVIEW.md](docs/SOURCE_REVIEW.md).

Yeni anlatımlar: kiriş/teğet ve |x| köşesi, elektrik alan/kuvvet yönü ve ters-kare
ilişkisi, dinamik denge/katalizör, yarı korunumlu DNA eşlenmesi. Dört tembel yüklenen
SVG modülü, 20 özgün alıştırma; toplam 13 anlatım / 65 soru. Eski 45 soru, kimlikleri,
cevapları ve kayıt akışları korunur. Anlatım araması hazır ders adını da bulur;
Bugün ekranı içerik sayısını gerçek listeden hesaplar. Etkileşimler öğrenme puanı
üretmez; soru oturumları ayrı akışta kaydedilir. Notlar tam genişlikli anlatımın
altındadır. Yeni keşif seçimleri mevcut kayıt yapısında saklanır.

Güncel Fragaria Unslop uygulandı. Yetkili bağlayıcıdan AIONIA standardı yeniden
okundu: v1.7, 2026-11-13; sürüm uyuşmazlığı yok. Mevcut cartoon atlas değiştirilmedi.
Dört modelin koyu 1440px/açık 390px ekran görüntüleri incelendi: taşma, notların
anlatımı daraltması veya renderer hatası gözlenmedi. Yeni modellerde 320px,
%200 arayüz / %150 yazı, azaltılmış hareket ve ciddi/kritik axe kontrolleri geçti.

Yerel PASS: check/build, 25 birim/depolama/içerik testi, 26 tarayıcı kabul testi.
Dört yeni setin her biri normal arayüzde 5/5 tamamlandı. Electron Linux: dört yeni
modelin ilk çevrimdışı açılışı, puan üretmemesi, mevcut dersin tamamlanması, yeniden
yükleme ve süreç yeniden başlatma PASS; keşif adımı korundu, renderer hatası 0.
Sürüm 0.3.0; Android versionCode 5. Fiziksel cihazlar, temiz kurulum/portable
çıkarma-taşıma, kararlı imza ve iki paket arası güncelleme henüz doğrulanmadı.

Vercel otomatik üretim dağıtımı dpl_5L7aa779UHEyqZaqBa8gLVdSsDHj bu kaynak için
READY; https://yksmania.vercel.app/version.json 0.3.0 sunuyor. Önceki günlük sınır
engeli yeni dağıtımda gözlenmedi. Canlı kabul ve paket CI/yayın kanıtları aşağıdaki
teslim kaydındadır; önceki sürüm testleri yeni kaynak için doğrulama sayılmaz. Özel Drive dışa aktarımındaki önceki
onay engeli bu geliştirmede yeniden denenmedi; başka hedefe aktarım yapılmadı.

## 0.3.0 teslim doğrulaması

- Uygulama kaynağı: `1dc5d44c1e2cb1ae19ad32225fedc97b71e6a654`.
- Vercel üretim dağıtımı `dpl_5L7aa779UHEyqZaqBa8gLVdSsDHj` READY; aynı kaynak.
  Kanonik https://yksmania.vercel.app/version.json 0.3.0 döndürüyor.
- [Canlı web kabulü](https://github.com/kaansavukduran/yksmania/actions/runs/43503377912)
  26/26 PASS: dört yeni model ve eski kayıt/çevrimdışı/soru/not regresyonları dahil.
- [Paket CI](https://github.com/kaansavukduran/yksmania/actions/runs/43503304731)
  dört işte PASS: 25 birim/depolama/içerik, 26 tarayıcı testi; Windows ve Linux
  paketlerinde dört yeni AYT modelinin ilk çevrimdışı açılışı, sıfır öğrenme kaydı,
  önceki dersin tamamlanması, yeniden yükleme ve süreç yeniden başlatma kontrolleri.
  Keşif adımı korunur; renderer hatası 0. Android debug APK imza/manifest kontrolü
  PASS. İndirme yayını bu başarılı koşunun dosyalarını yeniden derlemeden kullanır.
- [Yayın koşusu](https://github.com/kaansavukduran/yksmania/actions/runs/43504471113)
  PASS: [v0.3.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.3.0-alpha.1)
  herkese açık ön sürüm, beş native dosya ve üç doğrulama/checksum dosyasıyla hazır.
  Etiket ve indirilen verified-run.json yukarıdaki kaynak commit ile eşleşir.
  İndirilen iki kanıt dosyasının SHA256 değerleri SHA256SUMS ile eşleşir; dosya
  yedi checksum girdisi içerir. Android manifesti versionCode 5 / versionName 0.3.0,
  minimum API 24; APK v2 imzası doğrulandı. Herkese açık APK indirme adresi HTTP 200.
  Önceki sürümler korunur. Sonraki dokümantasyon commitleri uygulama kodunu değiştirmez.

# Delivered checkpoint: YKSMania 0.2.2 alpha

User decision: this application is Turkish only. Language choices and English
translations were removed from the app, visual lessons and authored question bank.
AGENTS.md and the applicable project profile preserve this choice for future work;
no English translation work should be added. Existing platform/art/scheduling
decisions remain in force. The private Drive export remains blocked separately
and was not retried as part of this language change.

Initial state, document language, formatting, loading and failure screens are Turkish
regardless of device language. Earlier `en` preferences and backups normalize to `tr`
without changing other settings, drafts, answers, notes, original review targets or
PDFs. Storage shape/version and stable lesson/question IDs are retained. User input
and imported source documents are not translated. Old unknown/corrupt locales are
still rejected. Source catalogue and document stores are not rewritten.

Turkish text/answer preservation was checked against the prior source, including
option order and answer indexes. The bank remains 9 interactive lessons / 45 original
questions. The settings and visual regressions now exercise Turkish at 200% UI,
150% text and 390px. A newly observed long update-button overflow was fixed with
wrapping inside the existing panel. See docs/QA.md YKS-007 for migration and device
language tests. Application/package version 0.2.2, Android versionCode 4.

Local check/build, 21 unit/storage/content tests and 21 browser acceptance tests:
PASS. Final deployed and package evidence is recorded in the delivery checkpoint.
Physical devices, clean installers/portable extraction and native two-package
update migration remain open gates; this is still an alpha/debug APK release.

## 0.2.2 delivery verification

- Application source: `ad2397d198c9c8b07bfec31488eced465d2bab3e`.
- Local acceptance: 21 unit/storage/content and 21 browser tests PASS, including
  English device/legacy preference compatibility with a Turkish-only UI. Desktop
  settings and 390px / 200% UI / 150% text screenshots inspected; no renderer errors.
- [Package CI](https://github.com/kaansavukduran/yksmania/actions/runs/43491193602)
  passed all four jobs: 21 unit/storage/content tests, 21 browser acceptance tests,
  Windows/Linux packaged offline lesson/reload/process-restart checks with zero
  renderer errors, and Android debug APK signature/manifest verification.
- Production web deployment: BLOCKED by Vercel's platform rate limit. The GitHub
  Vercel status for this source is failure: “Deployment rate limited — retry in
  24 hours.” The public origin still serves 0.2.1 (`7cfbe0b`); it is not evidence
  for the new Turkish-only UI. New published-origin acceptance has not been run.
  No quota workaround, paid-plan change or new hosting destination was attempted.
  When the limit clears, deploy this verified source/current main to the existing
  Vercel project, confirm READY/production alias, then run published-smoke.yml.
- [Release publication](https://github.com/kaansavukduran/yksmania/actions/runs/43492362390)
  PASS: [v0.2.2-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.2.2-alpha.1)
  is published with all five native binaries and source/checksum/Android verification
  evidence. The tag and downloaded verified-run.json match the application source
  above; verification-file hashes match SHA256SUMS. Android confirms versionCode 4 /
  versionName 0.2.2. Release notes explicitly distinguish these new native packages
  from the rate-limited 0.2.1 web origin. Earlier releases remain intact. Follow-up
  documentation changes do not modify the tested application code.

# Delivered checkpoint: YKSMania 0.2.1 alpha

Current task: move theory notes below the content, preserve the question screen's
existing bottom notes, and continue the verified cross-platform delivery flow.
YKS-006 was reproduced before the CSS repair and then passed. Theory now uses one
full-width track at every breakpoint. Note contents, question drafts, settings,
source files and original review dates retain their existing storage/behavior.

Live AIONIA standard re-read through the authorized connector on 2026-11-13: v1.7;
no source-version mismatch. Fragaria Unslop UI/behavior checks applied to the named
screens. No character designs, animation frames or private archive exports changed.

Local check/build: PASS; unit/storage/content 20/20; browser 20/20. The new regression
checks geometry at 320–1440px plus real note edits/reload and continued question
state. Dark/light desktop/mobile screenshots inspected in Chromium 156 on Linux;
full-width article, bottom notes, no horizontal overflow, zero renderer errors.
The full 200% UI / 150% text English regression also passed. See docs/QA.md YKS-006.

Web and Windows/Linux/Android package version is 0.2.1, Android versionCode 3.
Remote build, production acceptance and release IDs are recorded below.
Physical-device, clean-install and native two-package update
gates remain open. The earlier private Drive export remains blocked pending the
specific permission already requested; this UI task does not retry that upload.

## 0.2.1 delivery verification

- Application source: `2c3f6bd90cb243b0fc6a3478f5e79853eea47ad7`.
- [Published acceptance](https://github.com/kaansavukduran/yksmania/actions/runs/43487744351):
  20/20 browser tests PASS against https://yksmania.vercel.app, including YKS-006.
- Production deployment `dpl_yx9WNLPhJZjg6Mazt6aUEnQhmoPi` observed READY for this source.
- Local Electron Linux: PASS at 1440×1000 for full-row theory / bottom notes;
  offline note save, reload and process restart PASS, zero observed renderer errors.
- [Package build](https://github.com/kaansavukduran/yksmania/actions/runs/43487684984)
  passed all four jobs: 20 unit/storage/content tests, 20 browser tests, Windows
  and Linux packaged offline lesson/reload/process-restart checks with zero renderer
  errors, and Android debug APK signature/manifest verification. It is the source
  of the new release binaries; physical-device and clean-install gates remain open.
- [Publication](https://github.com/kaansavukduran/yksmania/actions/runs/43488912473)
  PASS: [v0.2.1-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.2.1-alpha.1)
  is published with five binaries and checksum/source/Android verification files.
  The tag and downloaded verified-run.json identify the application source above;
  downloaded evidence hashes match SHA256SUMS. Android metadata confirms versionCode
  3 / versionName 0.2.1. Earlier releases remain available. Only documentation changes
  follow this application source; no private catalogue or PDF export was retried.

# Delivered checkpoint: YKSMania 0.2.0 alpha

Authoritative project: `kaansavukduran/yksmania`, `main`, working checkout
`/workspace/yksmania`. Prior published 0.1.0 alpha remains preserved below.

## Current work

Konu Anlatımı and Sorular now have separate subject navigation and entry routes.
Workbook source coverage is 341 main rows (201 TYT / 140 numerical AYT) and 479
detailed cheat-sheet headings. These are source outlines, not completed lessons.
Nine lessons have real interactive vector explanations; the original bilingual
question bank contains 45 items. Cell, periodic-table and geometry lessons are new;
the six previous lessons now have visual models. All old lesson/question identities,
sessions, original review dates and drafts remain valid. Legacy /study is supported.

A new left-facing cartoon atlas replaces pixel rendering at runtime. The original
motion atlas remains in art/archive. Bibliographic sources, frame timings and
anchor evidence are in ART_BIBLE and CONTENT_COVERAGE. Live AIONIA v1.7 was read
again on 2026-11-13 through the authorized connector; updated Unslop UI, behavior
and sprite checks were applied. This is a learning app, not a game requiring a
Fragaria game splash or a new gamepad scheme.

Private catalogue and batch PDF/folder imports support source matching, 2 MB
streaming hashes, duplicate merging, cancellation and per-file failures. PDFs can
be opened from the relevant subject. IndexedDB schema v2 preserves existing stores;
AppState stays backward compatible with defaulted explorations/readingPages fields.
PDF page navigation and positions are saved. Exploration never creates learning XP.

## Private content and remaining work

8,584 PDF metadata records (~23.6 GB) were inventoried with pagination. 143 PDFs
(126 cheat sheets, 14 MEBİ-named sources, 3 OGM past-question books; 4,989 pages)
were prepared and integrity-checked in the private task workspace, outside Git.
The whole archive is not imported as individual interactive questions. The next
content stage needs source/page/item records, verified keys and mathematical/visual
checking; do not replace this with fabricated readiness or mastery.

Drive export is BLOCKED: automatic approval review rejected the specific private
catalogue upload because explicit permission for that payload/destination was not
present. No workaround export was attempted. The source catalogue and two ZIPs
remain local, concrete deliverables. Ask for that explicit permission before any
Drive upload; ordinary app development and authorized GitHub/Vercel work continue.

Local check/build: PASS. Unit/storage/content: 20 tests PASS. Browser acceptance:
19 tests PASS in Chromium on Linux. Electron offline visual lesson, reload and
process restart: PASS with zero renderer errors. The catalogue lifecycle cleanup
and readable mobile selector layout passed focused acceptance before pushing.
Remote package/public-origin runs are recorded at the delivery checkpoint. The real-source
local import and offline reading checks are in QA. Native production signing,
clean-install/portable relocation, physical devices, non-Chromium browsers and
real two-package native updates remain open gates. Never call emulation physical
verification. Preserve the accepted +2/+6/+20 ordinal review policy.

## 0.2.0 delivery verification

- Final application source: `123b1b8ced9deac7fb4fa0bebab1bd66d14a7c33`.
- [Published web acceptance](https://github.com/kaansavukduran/yksmania/actions/runs/43485490494):
  19/19 browser tests passed against https://yksmania.vercel.app, including offline
  reload, prior records, private-catalogue fixtures and the three new visual flows.
- Production deployment `dpl_HCkQhaFvGVmGZbKqjDibhukwNEYD` is READY for this source.
- [Final package build](https://github.com/kaansavukduran/yksmania/actions/runs/43485370541)
  passed all four jobs: 20 unit/storage/content tests, 19 browser tests, Windows
  and Linux packaged offline lesson/reload/process-restart checks with zero renderer
  errors, and Android APK signature/manifest verification. The superseded c66e42b
  build was cancelled. These automation checks do not replace the physical-device,
  installer/portable-extractor and two-package update gates listed above.
- [Release publication](https://github.com/kaansavukduran/yksmania/actions/runs/43486494460)
  passed and published [v0.2.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.2.0-alpha.1).
  The tag resolves to the verified application source above. All five binaries
  (Windows Setup/Portable, Linux AppImage/DEB, Android debug APK), SHA256SUMS,
  verified-run.json and Android verification evidence are uploaded. The earlier
  0.1.0 prerelease remains intact. Private catalogue/PDF packs are still local;
  the blocked Drive export was not retried or routed through another destination.

# Historical checkpoint: YKSMania 0.1.0 alpha

Authoritative source: `kaansavukduran/yksmania`, `main`. Repository was empty when
implementation began. The latest verified commit and remote build IDs are recorded
at the end of this file when available.

## Implemented

React/TypeScript/Vite PWA; shared learning and scheduler domain; IndexedDB persistence;
six original bilingual lessons, 30 exercises; full subject reference navigation;
availability and day 1/3/7/21 review planning; retained original due dates; sessions,
assistance evidence and undo; local PDF import/reader/notes; progress backup/restore;
independent accessibility settings; existing Aion atlas; honest discovery progress;
Electron desktop shell; Capacitor Android; Vercel configuration and package CI.

## Architecture decision

Electron replaces the provisional Tauri candidate for this initial desktop build:
fully bundled Chromium avoids an online WebView2 prerequisite for Windows portable
use. The cost is a larger package. No existing implementation was migrated.
SQLite was a candidate, not an established project constraint; the initial native
WebViews and Electron use the same persistent IndexedDB model as web. A later
storage-adapter migration must preserve existing records.

## Preserve

Keep original review targets separate from scheduled execution dates. Don't infer
learning from PDF import, time spent or checked task boxes. Don't copy private
Drive data or signing keys into the public repo. No cloud accounts/AI/telemetry.
Past Aurelia learning/plan owners have not been overwritten or synchronized.

## Next work

Complete the private content catalogue and curated packs, add a full exam/diagnostic
flow and evidence-sensitive adaptive practice. Native production signing, physical
device checks and two-version updates remain explicit release gates. See ROADMAP.

## Distribution checkpoint

- Application implementation: `59894d7c2082725fbe987727d3cba161cd5e05b6`.
- Packaged source: `9f83cc4411bc8e1ee3631b25beccec2b91de7075` (same application
  code; corrected Android verification tooling, durable-save test synchronization
  and manual release workflow).
- [Package CI run](https://github.com/kaansavukduran/yksmania/actions/runs/43467374511):
  type/build, 12 unit/storage tests, 9 browser tests; Windows/Linux packaged
  application smoke flows and Android signature/manifest verification.
- [Published web acceptance](https://github.com/kaansavukduran/yksmania/actions/runs/43466580212):
  9/9 browser tests passed against the live production HTTPS origin.
- Web: https://yksmania.vercel.app
- Prerelease: https://github.com/kaansavukduran/yksmania/releases/tag/v0.1.0-alpha.1
- The release workflow accepts only a fully successful main package run, uploads
  its existing binaries without rebuilding, and includes the source SHA and SHA256
  checksums. Release automation is manually dispatched, not triggered by a push.

Observed package automation is not clean-install, physical Android or two-version
update verification. Windows is unsigned; Android uses a debug test key. Keep
portable `YKSManiaData` with the executable, back up progress, and keep separate
PDF copies. Production native signing/update migration remains open work.

Supplementary verification: progress backup restored into a fresh browser profile
and survived reload; light-theme axe found no serious/critical violations and one
moderate repeated-landmark issue tracked in QA. No remote browser trust checks were
bypassed. Published browser acceptance ran in GitHub to avoid the local proxy CA
limitation. Private source files and historical Aurelia learning records were not
imported into the public repository or synchronized.

Publication completed: [release workflow](https://github.com/kaansavukduran/yksmania/actions/runs/43468351719)
passed and published `v0.1.0-alpha.1`. Five binaries and signature/source/checksum
evidence are uploaded. All four jobs in the final package CI run passed.
