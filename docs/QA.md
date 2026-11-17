# 0.22.0 son kaynak ve yayın kabulü — 17 Kasım 2026

Kaynak `5bdc4a15123666b3dc701a802f7f6be7000a383a`. [Forge034035](FORGE034035.md) içerik ve yerel sürüm sınırlarını, [PDF raporu](PDF_SOURCE_PROGRESS034035.md) kanonik kaynak kararlarını tutar. Aşağıdaki daha eski kabuller kendi sürümlerine aittir.

| Kapı | Gerçek sonuç |
| --- | --- |
| check ve tam birim | 374 modül yolu; 212 dosyada 1.939/1.939 birim başarılı |
| Tam uzak CI | [44152986079](https://github.com/kaansavukduran/yksmania/actions/runs/44152986079): verify, dört browser shard’ında 1.277 test (352/287/319/319), Windows/Linux tamamlandı/başarılı |
| Gerçek paketli Windows/Linux | Her birinde 110 çevrimdışı model akışı/reload/süreç yeniden açılışı başarılı |
| Otomatik Pages | [44158312379](https://github.com/kaansavukduran/yksmania/actions/runs/44158312379): gerçek yayında 110 farklı model akışı/not/soru geri bildirimi/reload; rendererErrors ve missing boş |
| Normal TLS ile yayındaki dosyalar | 297 dosya/27.970.391 byte sabit prefix derlemesiyle aynı |
| Gerçek Release ve AppImage | [44159025855](https://github.com/kaansavukduran/yksmania/actions/runs/44159025855): etiket/kaynak/beş manifest özeti aynı, altı varlık/no APK; indirilen 145.945.845 byte AppImage kendi binary’siyle 110 akış/aynı profil yeniden açılışı ve 297 payload dosyasında başarılı |
| Yerel web yükseltmesi | Gerçek eski UI kayıtlarıyla aynı kökenli 0.21→0.22; üç ham IndexedDB deposu aynı ve otomatik durum yazması 0. C3 kanıtı kesin C6 ve test-only son kaynak köprüleriyle korunur; yeniden yürütülmüş gibi sunulmaz. |
| Kişisel test APK | [44146818660](https://github.com/kaansavukduran/yksmania/actions/runs/44146818660/artifacts/14355659976): 19.305.624 byte, 0.22.0-test/kod32, test kimliği, gerçek v2 imza ve 297 web dosyası doğrulandı |
| Vercel | HTTP 402/hesap sınırı; yeni yayın kabulü yok |
| Fiziksel telefon/temiz OS kurulumu/portable taşıma/native iki kurulum yükseltmesi | Henüz denenmedi |

İlk `bbb681d` tam CI’si 1.259 başarılı / 18 başarısız tarayıcı vakasıyla bitti; buna bağlı Pages işi doğru biçimde atlandı ve o kaynakla masaüstü yayını yapılmadı. On eski konu toplamı, dört eski özet toplamı, üç belirsiz rasyonel başlık seçicisi ve bir çevrimdışı reload sonrası menü hazır-olma kontrolü düzeltildi. Değişiklik yalnız dokuz E2E dosyasıdır; süre, retry, atlama veya öğrenme beklentisi gevşetilmedi. Başarısız 18 vaka ile aynı yardımcının iki ek çağrısı gerçek UI’de geçti; ardından son kaynakta tam CI yeniden başarılı oldu. İlk hata geçmişi korunur.

EBOB–EKOK ve rasyonel kaynakları için 85/66 inceleme birimi, 283/380 bağ kenarı, 108/130 farklı hedef, 94 soru ve 470 seçenek gerekçesi bağımsız incelendi; bu bütün eski soruların yeniden çözüldüğü anlamına gelmez. 1440 px koyu ve 320 px Matrix/Lexend/arayüz yüzde200/yazı yüzde150 öğrenme akışları, 46/48 tam oturum, çevrimdışı ilk model kullanımı, not/taslak/Bugün/3-7-21 ve puansız keşif kontrolleri gerçek UI’de doğrulandı. Son C6 metin düzeltmelerine duyarlı hedefler tekrar sınandı; eski C3/C5 koşuları C6’da yeniden yürütülmüş sayılmaz. Sınırlı axe ve ekran ölçümleri tam erişilebilirlik sertifikası değildir.

Son ürün girdileri önceki APK/C6 ile aynıdır; yalnız dokuz E2E dosyasında test toplamı/seçici/hazır olma düzeltmesi vardır. 1.277 kayıtlı E2E vakasında eski 1.269 kimlik/metadata korunur. Son CI’nin başarı durumu bütün eski içeriklerin bilimsel doğruluğu veya bütün fiziksel kurulumların kabulü değildir.

8.981 dosya: 5 tam, 4 kısmi, 8.972 belirsiz. EBOB–EKOK ve rasyonel sayıların güncel PDF sürümleri; bütün öğretim eşlemeleri, bağımsız kaynak incelemesi, gerçek kullanım ve son yayın kapıları doğrulandıktan sonra 17 Kasım 20:10 UTC’de korumalı kanonik işlemle tam durumuna geçirildi. Yalnız bu iki kaynak satırı değişti; diğer 8.979 satır, okuma kayıtları ve eski karar geçmişi korundu. Kaynakların yeniden indirilmesi yeni okuma kredisi değildir. Belirsiz dosyalar hiç işlenmemiş sayılmaz. Ham PDF, özel kimlik, özel URL veya kişisel çalışma dosyası Git’e eklenmez.

---

## Önceki aday ve eski sürüm kayıtları

# 0.21.0 geliştirme adayının yerel kabulü: 17 Kasım 2026

Dal `forge/source-transfer-033`, taban `387fc3ea7f43e39d64e0c1e5f062372969a0ebeb`. [Kapsam ve öğretim](FORGE033.md) ayrı kaydedilir. Bu kabul henüz main veya dağıtılmış 0.21.0 paket/yayın kabulü değildir.

| Kapı | Gerçek sonuç |
| --- | --- |
| TypeScript/modül yolları | PASS: 367 belirsiz olmayan yol |
| Son tam birim turu | PASS: 209 dosyada 1.907/1.907, 233,15 saniye; masaüstü bağlantı testleri dahil |
| Normal/prefix build | PASS: her biri 293 dosya/283 gerekli çevrimdışı varlık; en büyük dosya 5 MiB altında |
| Son C3 hedef UI | PASS: tek tur 4/4; normal ve 320 px Matrix/Lexend yüzde 200/150, altı model, gerçek 2 cevaplı taslak ve gerçek 43/43 oturum |
| Son C3 yerel Pages prefix | PASS: 108 farklı model ilk kez çevrimdışı/reload; rendererErrors ve missing boş, 293 dosya sabit |
| Masaüstü eğitim bağlantıları | PASS: 55 birim; kaynak Electron'da altı normal OS devretme çağrısı ve süreç yeniden açılışı. Haricî oynatma/indirme kabulü değildir |
| Tam yerel native model koşusu | C1 kaynak derlemesinde 108 PASS; C3 tam native/paket başarısı diye sunulmaz |
| Tam yeni tarayıcı CI | Bekliyor: 55 dosya/1.269 vaka; dört shard 345/290/317/317, tam ve ayrık liste. Statik seçim çalıştırma değildir |
| Dağıtılmış 0.21 paket/web/APK ve fiziksel cihaz | Bekliyor |

Yeni kaynak ünitesinin 81 ayrı öğretim maddesi/199 gerçek hedefi ve 43 soru/215 seçenek gerekçesi bağımsız incelendi. Gerçek temel sürümden eski 6.077 soru/528 set/494 rehber-özet/493 çalışma başlığı ve sekiz resmî konu bağlantısı aynen karşılaştırıldı. Eski 64 fixture ve 15 smoke modülü değişmedi; sayı/versiyon beklentileri yalnız eklenen kayıtlar için güncellendi. Kanonik PDF statü/sayacı bu adayda değiştirilmedi.

43 yanıt gerçek UI'de yardımsız doğru kaydedildi; konu otomatik tamamlanmadı. 2021 TYT Matematik 5 bağlantısı, yıl filtresi, resmî C/sayfa 27/45 ve çevrimdışı ilk kez açılan üç adımlı özgün çözüm geçti. Kaynak bağlantısının gerçek tıklaması zararsız yerel yanıtla sınandı; gerçek resmî kaynak sayfası incelemesi ayrı kanıttır. Otomatik yanıtlar anahtarı görünen regresyondur, kör öğrenme etkinliği kanıtı değildir. Sınırlı axe kapsamı tam erişilebilirlik sertifikası sayılmaz.

Normal hareket açıkken yerleşmiş 390 px menü, gerçek geçişlerin bitişi ve iki animasyon karesi sonrasında ölçüldü. Görünür dış alan ve Escape kapanışı, inert/aria durumu, odak dönüşü ve ayar alanı erişimi geçti; taşma yoktur. İlk gözlem çekmecenin arkasındaki header düğmesine tıklamaya çalıştığı için FAIL verdi ve korundu; ürün/CSS bu gözlem için değiştirilmedi. Masaüstü kaynak devretme testinin ilk hero-gate zaman aşımı ve kesinleşmemiş nedeni de korunur. Son yeni profilde altı gerçek normal bağlantı adımı geçti. Bu kabuller tek bir bütün native108 C3 turu diye birleştirilmez.

Gizlilikte bütün değişiklikler 9.199 bilinen özel kimlik ve 8.845 özel URL ile karşılaştırılır. Eğitim kaynağı/özel veri eşleşmesi yoktur. Politika testindeki üç açıkça sentetik Drive adresinin genel biçim uyarısı ayrı ve exact satır/hash ile açıklanır; ham uyarı korunur, asıl kimlik/URL taraması gevşetilmez. Ham PDF, özel anahtar veya kişisel çalışma verisi depoya eklenmez.

---

## Önceki kabul kayıtları

# 0.20.0 yayın kabulü ve açık bulgu: 17 Kasım 2026

Yayın kaynağı [387fc3ea](https://github.com/kaansavukduran/yksmania/commit/387fc3ea7f43e39d64e0c1e5f062372969a0ebeb). [Tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/44070229171), [Pages](https://github.com/kaansavukduran/yksmania/actions/runs/44074567259) ve [release](https://github.com/kaansavukduran/yksmania/releases/tag/v0.20.0-alpha.1) bu kaynak üzerindedir. Bu belge, başarılı çekirdek kontrolleri sonradan bulunan dış bağlantı kusurundan ayrı tutar. Başarılı test sayısı bütün ürünün kusursuz olduğu anlamına gelmez.

| Kapı | Gerçek sonuç |
| --- | --- |
| TypeScript ve birim testleri | PASS: 363 modül yolu, 205 dosyada 1.841/1.841 test |
| Tam uzak tarayıcı | PASS: dört shard 341 + 292 + 316 + 316 = 1.265; fail/skip/flaky/retry 0 |
| Paketli Windows/Linux | PASS: her biri 107 benzersiz çevrimdışı model akışı, reload/aynı profilde süreç yeniden açılışı; rendererErrors 0 |
| Prefix ve gerçek Pages HTTPS yayını | PASS: her biri 107 benzersiz akış; worker/manifest `/yksmania/`, rendererErrors/missing boş |
| Kamu web dosyaları | PASS: 291 dosya, 27.631.620 byte; normal TLS ile byte/SHA-256 eşleşti, doğrulama atlanmadı |
| Gerçek yayımlanmış AppImage | PASS: 145.843.557 byte indirildi, GitHub/manifest SHA-256 eşleşti; değiştirilmemiş arşivden çıkarılan gerçek binary 107 akış/restart/no-false-XP geçti, rendererErrors 0 |
| Son C4 hedef UI | PASS: tek turda 8/8; bağımsız açı 18/18 iki profil, dokuz örnek/on hatırlama, modeller ve asalın ilk gerçek 1/40 taslağı |
| Gerçek yerel 0.19 → 0.20 web yükseltmesi | PASS: üç ham veri deposu, notlar, taslak/deneme/ayarlar ve özgün tekrar tarihleri korundu; otomatik durum yazımı 0 |
| Ek yerel Chromium ile kamu öğrenme yolu | BLOCKED: ilk normal `goto` sertifika otoritesini tanımadı; uygulama davranışı denenmeden kesildi. TLS bypass uygulanmadı. GitHub’ın gerçek HTTPS 107 kabulü bundan ayrıdır. |
| Kişisel Android APK | PASS: yapı/imza/kod 30/0.20.0-test, 19.179.469 byte ve 291 C4 payload dosyası. Fiziksel kurulum/ilk açılış NOT TESTED. |
| Dış tarayıcı dispatch’i, yayımlanmış AppImage | FAIL: F032-DESKTOP-EXTERNAL-001; ayrıntı aşağıda |
| Fiziksel cihaz, temiz OS kurulumu, Windows portable taşıma, native iki sürüm kurulumu | NOT TESTED |

CI çıktıları yeniden derlenmeden dört masaüstü dosyası ve iki kanıt varlığı olarak yayımlandı. `verified-run.json` kaynağı bağlar; `SHA256SUMS.txt` beş dosyayı bağlar ve beş GitHub digest’iyle eşleşir. Gerçek AppImage SHA-256 değeri `0b7b9f78d20f5786838e6610d0cd0119ce2369e1061367d8528f7490d2152b3e` olarak indirme öncesi kanıtla ve indirilen byte’larla doğrulandı. Bu Linux VM’de arşiv içinden çalıştırma, temiz kurulum veya fiziksel Linux kabulü değildir. DEB ve Windows kurulum dosyaları gerçek CI paketleridir; bütün kurulum/taşıma senaryoları denendi denmez.

İlk kaynak `24475d3`’in tam CI’si 1.262 PASS/3 FAIL verdi. Üç testte 485 başlık sonrasından kalan `484` beklentisi vardı; ürün doğru biçimde 493−1 = 492 gösteriyordu. İki E2E dosyasındaki beş tam literal düzeltildi; davranış, kapsam, süre, undo, hata ve offline kontrolleri atlanmadı. Aynı üç vaka yerelde 27,4 saniyede geçti; son `387fc3ea` kaynağında bütün 1.265 vaka yeniden geçti. İlk otomatik Pages işi başarısız CI nedeniyle doğru biçimde atlandı. Önceki tek yerel birim timeout’u, değişmemiş dosyanın izole 4/4 sonucu ve son tam 1.841 başarı aşağıdaki tarihsel kayıtlarda ayrı korunur.

Android [test işi](https://github.com/kaansavukduran/yksmania/actions/runs/44069495221), `953084d9bf42cd337da575e8a12fc4acdbc8baba` kaynağındandır. Yayın `387fc3ea` ile fark yalnız iki E2E dosyasıdır; ürün kaynakları ve APK’nin 291 web dosyası C4 ile birebir karşılaştırıldı. Ayrı uygulama kimliği `com.fragaria.yksmania.test`, etiket YKSMania Deneme, sürüm 0.20.0-test/kod 30’dur. APK SHA-256: `e0f828ddeeb6cb8dcc2705f2baaa67a912da195da7bfd530762b0c7c9585fc10`. Otomatik Android debug imzası kullanıldı, repository secret istenmedi. İlk SDK yolu hatası ile yeni apksigner çıktısı nedeniyle iki parser reddi korunur; son parser gerçek rapora göre daraltılıp kabul/ret testleriyle doğrulandı. Bu APK genel Release’e eklenmedi; telefondaki kullanıcı denemesi beklenir.

## F032-DESKTOP-EXTERNAL-001

**Önem: Orta. Durum: yayımlanan 0.20.0’da AÇIK.** Konum `desktop/main.cjs`, `safeExternal`, `setWindowOpenHandler` ve `will-navigate` yoludur. Mevcut politika yalnız proje GitHub ve belirli Drive dosya adreslerini kabul eder; uygulamanın gerçek YouTube, OGM ve ÖSYM öğretim bağlantılarını reddeder.

Yeniden üretim: normal HTTPS ile indirilmiş ve SHA doğrulanmış gerçek AppImage → Konu Anlatımı → TYT Matematik → Asal kaynak ünitesi → görünen ilk önerilen YouTube bağlantısına normal tıklama. Yalnız `shell.openExternal` OS çağrısı recorder ile değiştirildi; uygulamanın olay handler’ı ve URL politikası değiştirilmedi. Beklenen bir dış dispatch, gözlenen sıfırdır. Uygulama penceresi 1 → 1 kaldı, konu açık kaldı. Bu kanıt gerçek video erişimi veya oynatma deneyi değildir. İlk probe yalnız mobil menüyü açmayı kaçırıp inert bir ekranla kaldı; o sonuç kusur kanıtı sayılmadı. Normal menüyle yinelenen gerçek tıklama sorunu doğruladı.

Statik bağımsız karşılaştırmada 2.294 aktif video girdisi ve beş resmî kitapçık adresi eski politika tarafından reddedilir. Kullanıcı etkisi: ilgili masaüstü düğmesi dış tarayıcıyı açmaz. Çevrimdışı anlatım/sorular ve kayıtlar bu kusurdan etkilenmez. Geçici yol bağlantıları [web uygulamasından](https://kaansavukduran.github.io/yksmania/) açmaktır. Çekirdek 107 akışın başarılı olması bu kusuru çürütmez; o suite OS dış dispatch’ini kapsamıyordu.

En küçük onarım, izole 0.21 adayında `desktop/external-links.cjs` adlı sıkı URL yardımcısını gerçek main handler’ına bağlamaktır. Onaylı adreslerin protokol/host/yol/parametre sınırları korunmalı; yanlış host eki, kullanıcı bilgisi, farklı port, zararlı protokol ve yönlendirme varyantları reddedilmelidir. Tüm HTTPS adreslerine genel izin vermek kabul değildir. Mevcut GitHub/Drive davranışı ve kayıtlar korunmalıdır. Son izole 0.21 kaynağında **55/55 politika testi ve altı normal kaynak Electron bağlantı aktivasyonu PASS**. YouTube, OGM statik PDF/HTML, ÖSYM soru ve cevap PDF sayfaları ile tam süreç yeniden açılışından sonraki YouTube bağlantısı normal arayüzden tıklandı. Yalnız `shell.openExternal` recorder yapıldı; handler/predicate override, doğrudan handler çağrısı veya durum enjeksiyonu yoktu. Her tıklama görünür href’i tam bir kez dispatch etti; renderer URL’si/tek pencere ve bütün AppState baytları aynı kaldı. Matrix ve sentetik not süreç yeniden açılışında korundu; yeni öğrenme/tamamlama üretilmedi, renderer hatası 0. Bu **kaynak Electron/main handler kabulüdür**; paketlenmiş/yayımlanmış 0.21, fiziksel OS tarayıcısı veya gerçek video oynatma kabulü değildir. Yayımlanan 0.20 bu onarımı içermez; bulgu orada AÇIK kalır. İlk onarım probunda beş dispatch geçti, ikinci süreçte hero bekleyen harness durdu; kök neden ürün kusuru olarak kanıtlanmadı. Zaman sınırı ve fonksiyonel/restart beklentileri korunarak bağlı sidebar açılış kapısı kullanılan ayrı taze profil koşusu altı aktivasyonu geçti; ilk sonuç saklanır.

Kabul: sonraki gerçek paket/main yolunda normal YouTube/OGM/ÖSYM tıklamalarının her biri OS dispatch recorder’a tam bir kez ulaşmalı; pencere sayısı artmamalı, konu/not/öğrenme/XP aynı kalmalı. Reddedilen URL sınıfları hiç dispatch etmemeli. Recorder testi OS sınırını doğrular; gerçek video oynatma ve fiziksel tarayıcı bütünlüğü ayrıca test edilmedikçe iddia edilmez. 0.20 indirmeleri ve etiketi değiştirilmeden korunur; onarım yeni sürümde yayımlanır.

## Devam kaydı ve denetim prompt’u

Saatlik bulut Forge görevi etkin; ilk tetik aktif çalışma sahibini gördüğü için salt okunur denetim yaptı. İkinci PDF üreticisi veya çakışan ana dal gönderimi başlatılmadı. Her koşuda gerçek kaynak/commit, kanonik defter ve Actions sonuçları yeniden okunur. Bu, gelecekteki bütün koşuların kesintisiz veya başarılı çalışacağı iddiası değildir.

0.21 Faktöriyel adayı izole dalda hazırlanıyor: 20 bölüm, 16 örnek, 12 hatırlama, 43 soru, sekiz bölümlük özet ve altı model. C3 aşamasında dört hedef UI vakası, tam 43/43 yardımsız oturum, kaynakla doğrulanmış 2021 TYT örneğinin adımları ve 208 dosyada 1.852 birim testi geçti. Son izole adayda 209 dosyada 1.907 birim testi ve 367 modül/TypeScript kontrolü geçti. Dış bağlantı politikası/kaynak Electron kabulü yukarıdadır; son izole adayın prefix 108 akışı da PASS, paket/yayın kapıları ayrıca bekler. Bu adayın 6.120 soru/495 rehber/494 başlık sayıları yayımlanan 0.20’ye aktarılmaz; kanonik PDF sayımı hâlâ 2 tam/7 kısmi/8.927 belirsizdir. [Forge032](FORGE032.md) devam noktasını, [PDF ilerlemesi](PDF_SOURCE_PROGRESS032.md) kararları tutar.

```text
YKSMania devam denetimi. Yayımlanan taban 0.20.0, commit `387fc3ea7f43e39d64e0c1e5f062372969a0ebeb`; sonraki izole hedef forge/source-transfer-033, 0.21 adayı. Önce gerçek dal/commit, AGENTS, FORGE ve son Actions sonuçlarını doğrula; 0.20 etiketi/indirmeleri ve öğrenci verisini koru.
1. Doğrulanmış AÇIK bulgu F032-DESKTOP-EXTERNAL-001 (Orta): desktop/main.cjs safeExternal gerçek YouTube/OGM/ÖSYM bağlantılarını reddediyor. İzinli kod grubu desktop/main.cjs, desktop/external-links.cjs ve tests/desktop-external-links.test.ts; yalnız doğrudan kabul için gerekli scripts/test-desktop.mjs değişikliği eklenebilir. Genel host izni verme; proje GitHub/Drive davranışını ve kötü URL retlerini koru.
2. Gerçek paket/main handler'ı değişmeden normal ders bağlantılarına tıkla. Sadece OS shell çağrısını recorder yap: her onaylı bağlantı tam 1 dispatch, reddedilenler 0; pencere, ders, not, öğrenme ve XP korunmalı. Ardından 108 model, restart/offline ve paket kontrollerini çalıştır. Saf helper PASS'ini native veya oynatma PASS'i sayma.
3. Faktöriyel adayının mevcut kaynak/uygulama eşlemesini, 43 sorusunu, görsel açıklamalarını, resmî 2021 referansını ve korunmuş eski 6.077 kartı yeniden denetle. Özel aday, normal kullanım, kanonik PDF kapanışı ve kamu yayını ayrı kapılardır. Kanonik 2/7/8927 sayımını kanıtsız artırma. Saatlik sahibin aktifliğini kontrol et; ikinci producer veya çakışan main gönderimi başlatma.
Kalan test engellerini kusur diye sunma. Bu kayıt anında izole 033 kaynak Electron’da 55 politika testi ve altı normal bağlantı aktivasyonu geçti; paketlenmiş/yayımlanmış 033, fiziksel dış tarayıcı/video oynatma ve ekstra yerel HTTPS kullanıcı yolu bu kabulün kapsamı değildir. Yayımlanan 0.20 bulgusu açık kalır. Doğrulanmış onarım ve uygun yeni sürüm kapıları bitmeden genel başarı ilan etme.
```

---

## Yayın öncesi 032 aday gözlemleri ve daha eski kayıtlar

# 0.20.0 geliştirme adayının kabul kaydı: 17 Kasım 2026

Yerel aday dalı `forge/source-transfer-032`, taban `52f87bf94f26a14a5fea16d597920f4fd72e8971`. Son doğrulanmış yayın 0.19.0’dır. Bu kayıttaki C3 üretim derlemesi normal ve `/yksmania/` alt dizini için ayrı sabitlenmiştir. Uygulama kaynağı ile Android paket yapılandırmasının sonraki değişiklikleri kendi kabulünü gerektirir; eski PASS yeni pakete otomatik taşınmaz.

| Kapı | Son doğrulanan sonuç |
| --- | --- |
| TypeScript ve modül yolu denetimi | PASS: 363 belirsiz olmayan modül yolu, `tsc --noEmit` hata vermedi |
| Tam yerel birim turu | Son C4 turunda 205 dosyada 1.841/1.841 PASS, 103,70 saniye. Önceki 1.839 PASS/1 timeout, izole değiştirilmemiş 4/4 PASS ve daha eski 1.840 PASS ayrı tarihsel kayıtlardır. |
| Normal ve prefix derleme | C4 PASS: her biri 291 dosya, 281 gerekli cache varlığı; en büyük dosya 5 MiB sınırının altında. C3 derlemeleri ayrıca tarihsel olarak korunur. |
| Son C4 hedef tarayıcı kabulü | PASS: tek son koşuda 8/8 vaka; beş model vakası, iki tam açı öğrenme yolu ve bir gerçek asal soru akışı. Önceki C3 kabulü ayrı koşuların birleşimi olarak tarihsel korunur. |
| Yerel Electron kaynak koşusu | PASS: 107 benzersiz çevrimdışı model akışı, reload ve aynı profilde süreç yeniden açılışı; renderer hatası 0 |
| Yerel Pages alt dizini | PASS: 107 benzersiz ilk çevrimdışı model akışı ve reload; worker/manifest `/yksmania/`, rendererErrors ve missing boş |
| Gerçek yerel 0.19 → 0.20 web güncellemesi | PASS: eski gerçek UI kayıtları ve üç ham veri deposu korundu |
| Tam uzak CI | Bekliyor. 1.265 tarayıcı testi / 54 dosya, dört CI shard’ına bölünür; liste karşılaştırması tam 1.265 benzersiz vakayı korur. Bu statik sayım çalıştırma başarısı değildir. |
| Gerçek Windows/Linux paketleri ve yeni web yayını | Bekliyor. Kaynak Electron veya yerel prefix PASS bu kapılar değildir. |
| Android test APK’sı | Hazırlanıyor; kullanıcıdan kalıcı imza/secret ayarı istenmiyor. Henüz paket veya fiziksel cihaz kabulü yok. |
| Fiziksel cihaz, temiz kurulum, portable taşıma, native iki sürüm kurulumu | NOT TESTED |

Yerel Electron ve prefix koşuları ortam bağlantısının kesilmesinden önce tamamlanmış; sonuçları ortam geri geldiğinde gerçek JSON günlüklerinden okunmuştur. Electron, donmuş normal C3 web derlemesi ve mevcut güvenilir Electron çalışma zamanı ile kaynak kodundan çalıştırılmıştır. Dağıtılmış kurulum dosyası veya fiziksel masaüstü kabulü değildir. İlk Electron koşusu uygulamadaki dört kaynak bağlantısına karşı eski iki bağlantı beklentisinde durdu. Paylaşılan harness iki kaynak grubu ile dört tam başlık/adres/target/rel değerini doğrulayacak biçimde onarıldı. Ürün bu harness onarımı için değiştirilmedi; son 107 akış başarılıdır. İlk hata kaydı korunur.

## Gerçek öğretim ve kayıt akışları

Altı yeni geometri SVG modeli, asal eleği ve çarpan modeli normal ders girişinden denetlendi. 1–50 eleğinde 2/3/5/7 adımları sırasıyla 24/31/33/34 bileşik sayı işaretler; taban asallar korunur, 1 asal/bileşik sayılmaz. Çokgen A etiketi çizilen gerçek köşeye bağlıdır; piramidin h ve ℓ açıklamaları cismin/açınımın kenarından ayrıdır. Normal koyu masaüstü, 320 px Matrix/dokunma ve 320 px gerçek Lexend arayüz yüzde 200/yazı yüzde 150 profilleri; adlandırılmış klavye kontrolleri, en az 44 px hedefler, SVG metinleri ve ölçülen axe kapsamı denetlendi. Bu sınırlı ölçümler tam WCAG sertifikası değildir.

Kaynak açı setinin iki gerçek UI profilinde 18/18 yanıt bağımsız doğru ve yardımsız kaydedildi. Dokuz çözümlü örnek, on hatırlama ve üç şekil modu açıldı. Bugün sonucu, notlar, manuel konu tamamlama ve 3/7/21 tarihleri denetlendi. İlk çalışma 17 Kasım için tekrarlar 19/23 Kasım ve 7 Aralık’tır. Keşif, şekil değiştirme ve bağlantı açma öğrenme puanı veya konu tamamlama üretmez.

Asal setindeki 40 sorunun ve 200 seçenek gerekçesinin matematiği bağımsız incelendi; bu anahtarı görünen içerik denetimidir, kör çözüm değildir. Gerçek UI’de 84 örneğinin üç adımı ve alternatif yöntemi açıldı; ilk 1/40 soru yardım alınmadan doğru çözüldü. Kontrol edilmiş soru taslağı çevrimdışı reload’da korundu; konu otomatik tamamlanmadı. Tam 40 soruluk UI oturumu denendi denmez.

Gerçek aynı kökenli 0.19 → 0.20 PWA yükseltmesinde eski UI’den 5/5 paragraf oturumu, özgün 3/7/21 tarihleri, yarım soru taslağı, cevaplı/işaretli 40 soruluk TYT branş denemesi, notlar, Matrix/Lexend ve 25/05/2027 özel tarihi oluşturuldu. Ayarlar üzerinden bekleyen güncelleme etkinleştirildi. Üç ham IndexedDB deposu, anahtarlar ve belge baytları aynı kaldı; aktivasyon, reload ve süreç yeniden açılışında otomatik durum yazımı 0. Yalnız belge/katalog kontrolü için açıkça sentetik zararsız bir belge doğrudan eklendi; öğrenme olayları gerçek eski UI ile oluşturuldu. Yeni çokgen n=8/köşegenler ve asal aşama 4/seçili 12/3×4 ilk kez çevrimdışı kullanıldı. İki keşif anahtarı dışında eski öğrenme/XP/veriler aynı kaldı; seçimler çevrimdışı reload ve süreç yeniden açılışında korundu. Bu yerel web deneyi public CDN veya native iki sürüm kurulumu değildir.

## Onarılan sorunlar, ilk sonuçlar ve kalan sınırlar

İlk C1’de örtük etiket içinde önce gelen `output`, iki range kontrolünün erişilebilir adını engelliyordu; açık id/for bağlantıları ve gerçek adlandırılmış klavye regresyonu eklendi. C1/C2’de açı numaralarının arka plakaları veya metin kutuları kesen çizgiyi örtüyordu; gerçek büyük yazı ölçümlerine göre şekle yer açılıp etiket konumu düzeltildi. C2’de çokgen A etiketi gerçek köşe yerine sabit üst noktadaydı; C3 gerçek model köşesine bağlandı. Piramit h/ℓ açıklamalarının kenarlara teması ve asal açıklamasındaki tek harfli satır kuyruğu da kaynak alanında onarıldı.

C2 açı öğrenme testinde ilk bağımsız soru doğruyken, yardım panelinin asenkron açılması sırasında helper kaybolan düğmeyi bekliyordu. Test gerçek panel/sonuç açılışını bekleyecek biçimde düzeltildi; süre artırılmadı, işlev veya beklenti atlanmadı. C3’te iki tam 18/18 yol geçti. Eski başarısız ve kesilmiş koşular kanıtta korunur.

Önceki tam birim turunda `foundation-practice-013` içindeki bütün hazırlanmış konuların bağımsız soru eşlemesini denetleyen test 5.000 ms bütçesini aştı. Aynı zamanlarda başka kaynak ve tarayıcı işleri vardı; bu tek başına kök neden kanıtı değildir. Aynı test dosyası değiştirilmeden ayrı koşuda dört testinin tamamını 5,07 saniyelik dosya süresinde geçti. Bu izole başarı tam turun yerine geçmez; ardından son C4 kaynağındaki tam tur 1.841/1.841 geçti. Timeout veya koşul gevşetilmedi.

Son içerik denetiminde `f032-tyt-geo-cokgenler-032-7` sorusunun üçüncü çözüm adımında açı–kenar eşlemesinin sırası açıklaştırıldı: 60°/90°/120°/150° için sırasıyla 3/4/6/12 kenar. Soru, seçenek, anahtar ve toplamlar değişmedi. Bu son düzeltme C4 adayıdır; C3 normal/prefix, 107 akış ve hedef UI başarıları önceki kaynak kapsamıdır. Normal ve prefix C4 derlemeleri geçti; son C4 hedef UI turu 8/8 geçti. Son C4 native/prefix ve uzak kapılar bu kayıtta henüz kabul edilmedi.

En yüksek ölçekte “Geometrinin” sözcüğünün son harfi bir alt satırda kalabilir. Bu küçük tipografik gözlem kayıtlıdır; kırpma veya yatay taşma yoktur. Uzun locator PNG’sinde büyük skip-link görünmesi gerçek DOM ile ayrı sınandı: odak yokken sınırlar ekranın üstündedir ve çekimden önce/sonra aynıdır; Tab → Enter gerçek ana içeriğe odaklanır. Sadece PNG artefaktına dayanarak global stil değiştirilmedi.

Kanonik kaynak defteri güncel 8.936 PDF’de 2 tam, 7 kısmi ve 8.927 belirsiz karar içerir. [PDF ilerlemesi](PDF_SOURCE_PROGRESS032.md) okuma/aktarım/sürüm farklarını açıklar; belirsiz hiç işlenmemiş değildir. 134 yeni soru ve bu kaynaktaki eşlemeler bağımsız incelendi; bütün eski 5.943 soru bu tur baştan bilimsel olarak çözülmedi. Bütün MEB alt kazanımları, resmî soru arşivi ve video oynatımı tamamlandı sayılmaz.

Tam CI, Windows/Linux paketleri, yayımlanmış Pages, Vercel ve Android APK kendi kaynak commit ve dosyalarıyla ayrıca kabul edilecektir. Son bilinen Vercel durumu hesap sınırı nedeniyle HTTP 402’dir; yeni 0.20 Vercel başarısı iddia edilmez. Önceki yayın sonuçları aşağıda tarihsel olarak korunur.

---

## Önceki doğrulanmış kabul kayıtları

# 0.19.0 son yayın kabulü — 17 Kasım 2026

Yayın kaynağı [1dd13c2f](https://github.com/kaansavukduran/yksmania/commit/1dd13c2f8e0b0c4f2b110075bb0f166d902d74c9). [Tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/43972235774) 197 dosyada 1.786/1.786 birim ve 1.257/1.257 tarayıcı testini geçti. Başarısız, atlanan veya flaky tarayıcı senaryosu yoktur. Gerçek paketli Windows ve Linux, önceki 93 ve yeni 6 modelin toplam 99 akışında çevrimdışı kullanım, reload ve aynı profilde süreç yeniden açılışını geçti; iki platformda renderer hatası 0. Android işi açık kapsam gereği atlandı.

Yerel tam tarayıcı turunun iki parçasında 377 ve 353 vaka geçti; aynı kaynaklı tam CI’nin 1.257/1.257 başarısından sonra yinelenen yerel işler bilinçli durduruldu. Kalan 252 ve 275 vaka yerelde çalıştırılmadı; bu yerel tur tam geçiş diye sunulmaz. Yetkili tam kabul yukarıdaki CI’dir. C2’de 22 ayar/plan/video/atom, C3’te dört geometri akışı geçti. C4’te Matrix’in bilimsel turuncu açıyı yeşile çevirmemesi gerçek CSS koşuluyla sınanır. 320px, yüzde 200 arayüz/yüzde 150 yazı, klavye, dokunma, sürükleme ve çevrimdışı reload kontrolleri korunur.

Bağımsız iki okuyucu, yeni 60 soruyu anahtar, çözüm ve ipuçlarını görmeden çözdü: 60/60 anahtar eşleşti; belirsiz/eksik koşullu soru saptanmadı. Bu, bütün eski 5.883 anahtarın yeniden çözüldüğü anlamına gelmez. Hesap modeli ayrıca 7.381 merkez durumu, 30 dönüşüm, 121 dik üçgen karesi ve 18 açı yelpazesinde 244.748 bağımsız denetimle incelendi. Bunlar gerçek SVG/etkileşim kabullerinin yerine geçen sayılar değildir.

İlk geometri öğrenme yolu gerçek UI’den geçti: anlatım → değişen SVG → çözümlü örnek → bağımsız 9/10 sonuç → Bugün tamamlandı/puanı → 3/7/21 tekrarları. İlk çalışma 17 Kasım için tarihler 19/23 Kasım ve 7 Aralık’tır; ilk tekrar gününde tekrarlar yeni konulardan önce görünür. Çevrimdışı reload ve tarayıcı süreci yeniden açılışında sonuç/notlar korundu. Keşif ve video açmak doğru/XP oluşturmaz; eski 479 başlık yeni geometri üzerinden tamamlanmış sayılmaz.

Vercel üretim dağıtımı takımın kullanım sınırları nedeniyle HTTP 402 / `resource_creation_blocked` ile reddedildi. Genel adresin /version.json isteği de normal TLS üzerinden HTTP 402 / `DEPLOYMENT_DISABLED` verdi. Yeni 0.19.0’ın Vercel’de yayımlandığı veya eski yayının erişilebilir kaldığı iddia edilmez. Platformun hesap sınırı yeni dağıtımı ve mevcut siteye erişimi engelliyor. Gerçek Vercel tarayıcı kabulü bu nedenle yapılamadı. Uygulamanın erişilebilir web yayını GitHub Pages’tir.

[Otomatik Pages](https://github.com/kaansavukduran/yksmania/actions/runs/43980946367) aynı kaynak üzerinde build/deploy/verify-published PASS verdi. Yerel prefix ve gerçek yayımlanmış köken ayrı ayrı 99 benzersiz çevrimdışı/reload akışını geçti; worker ve manifest /yksmania/ altındadır, rendererErrors ve missing boş. Yayındaki 285 dosya normal TLS ile sabit prefix derlemesiyle eşleşti. Normal/prefix derlemelerin her biri 285 dosya/275 gerekli cache varlığı içerir; toplam byte 27.220.121/27.219.953, en büyük dosya 5 MiB altındadır.

Gerçek Pages kökeninde ayrıca normal ders girişinden geometri öğrenme yolu tekrarlandı: 9/10 soru sonucu, Bugün tamamlandı/sonuç görünümü, 3/7/21 tarihleri ve tekrarların önce gösterilmesi, not, çevrimdışı reload ve tarayıcı süreci yeniden açılışı PASS. Gerçek sürüm 0.19.0, worker kapsamı ve betiği /yksmania/ olarak ölçüldü. Page exception ve beklenmeyen console hatası 0; önceden cache’lenmemiş bağlantıya bilinçli çevrimdışı probe tek beklenen console/ağ hatası üretti. Chromium’a yalnız ortamın verilen CA anahtarı tanıtıldı; genel TLS doğrulaması kapatılmadı. 285 dosyanın normal TLS ile karşılaştırılması bu tarayıcı istisnasından bağımsızdır. Bu, bütün 1.257 vakanın Pages’te tekrarlandığı veya gerçek YouTube oynatımının doğrulandığı anlamına gelmez.

[Release](https://github.com/kaansavukduran/yksmania/actions/runs/43981108027) dört masaüstü dosyası ve iki kanıt varlığı yayımladı. Gerçek etiket, verified-run.json ve successful main SHA aynıdır; beş manifest kaydı GitHub varlık SHA-256 değerleriyle eşleşti. Manifest kendisini hashlemez. Çıktılar başarılı CI’den yeniden derlenmeden alındı. Yayımlanan 145.757.638 byte AppImage ayrıca indirilip SHA-256 ile doğrulandı ve bu VM’de extract-and-run yoluyla özgün 99 akışı geçti; renderer hatası 0. Son teslim belgeleri uygulama girdilerini ve sabit derlemeleri değiştirmez.

Gerçek yerel 0.18.2→C4/0.19.0 aynı-köken web güncellemesi eski UI’den oluşturulan 5/5 paragrafı, 3/7/21 tarihlerini, yarım rasyonel çalışmayı, yanıtlı/işaretli 40 soruluk Türkçe branş denemesini, özel 25/05/2027 tarihini, Light/Lexend ve notları korudu. Belge/katalog store’larında yalnız zararsız sentetik sentinel vardı. Aktivasyonda üç ham store aynı kaldı; otomatik state yazımı 0. Yeni açı/benzerlik modelleri ilk kez çevrimdışı açıldı; değerler süreç yeniden açılışında korundu. Bu public CDN veya native iki sürüm yükseltme deneyi değildir.

İlk tarayıcı çağrısı eski 0.11.0 önizlemesine yöneldiğinden kabul dışı bırakıldı; strictPort ve açık BASE_URL ile kaynak doğrulanır. İlk sürükleme testi yeni profil için var olmayan IDB kaydı varsayıyordu; gerçek tercih eylemiyle düzeltildi. Tema düğmesi/tarih kırpılması, hover kontrastı ve bilimsel açı rengi ölçülerek onarıldı. En yüksek ölçekte uzun erişilebilirlik başlığının son harfi ayrı satıra düşebilir; içerik kırpılmaz. Yerel öğrenme yolu harness’inin ilk süreç açılışı aynı restore edilmiş URL’ye goto’dan null yanıt beklemediği için durdu. İlk Pages harness’i doğrudan APIRequestContext’in ortam proxy’sini kullanamaması nedeniyle ENETUNREACH verdi; öğrenmeye başlamadan kesildi. Sürüm okumak gerçek proxy’li tarayıcıya taşındı. İki özel harness düzeltmesinde ürün ve sertifika doğrulama politikası değiştirilmedi.

Üç PDF’nin seçili 31 metin/22 görsel sayfasının bağı ve yeni altı ünitenin içerik incelemesi özel defterde tutulur. [Kaynak ilerlemesi](PDF_SOURCE_PROGRESS.md), 34 PDF’yi tamamlanmış sayı olarak sunmaz; bütün PDF arşivinin bitmiş/kısmi/hiç işlenmemiş gerçek toplamı hâlâ bilinmiyor. 2.640 eski kartın tam yardım aşamaları ve [geometri açıkları](GEOMETRY_SCOPE.md) sürer. Video URL eşlemesi ile güncel YouTube erişimi/oynatma farklıdır; bütün katalog için oynatma doğrulanmadı. Android imzası ertelendi; yeni APK, fiziksel cihaz, temiz kurulum, portable taşıma veya native iki sürüm yükseltmesi iddia edilmez.

---

## Önceki kabul kayıtları

# 0.18.2 son yayın kabulü — 16 Kasım 2026

Yayın kaynağı [19590e28](https://github.com/kaansavukduran/yksmania/commit/19590e28b23e091a00610526f7cd8201d278765a). [CI 43901085247](https://github.com/kaansavukduran/yksmania/actions/runs/43901085247) tamamlandı: 191 dosyada 1.743/1.743 birim, ilk tamamlanan tam koşuda 1.242/1.242 tarayıcı (46,2 dakika). Gerçek paketli Windows ve Linux’ta özgün masaüstü runner’ı geçti; iki platformda renderer hatası 0. Android işi açık kapsam gereği atlandı. CI araçlarının deprecation uyarıları uygulamanın console ölçümüyle karıştırılmaz.

Yerel UI kabulü ilk 17 ve son düzeltilmiş derlemedeki iki hedef vakanın birleşimidir; tek son yerel 17 koşusu denmez. Son yerel Electron ve prefix koşuları ayrıca 93’er aileyi geçti. Vercel’de gerçek 17/17 HTTPS koşusu 0a670a57 kaynağında yapıldı; 19590e28 yalnız eski bitki testi beklentisi ve belge düzeltmesidir, 348 runtime girdisi ve iki sabit derleme byte eşittir. 19590 kaynağının 25 üretim dosyası normal TLS ile son yerel derlemeyle eşleşti. Public 17’de page exception ve uygulama console hata/uyarı 0; ölçülen dokuz axe raporunda bütün seviyelerde ihlal 0. Chromium’a yalnız ortamın verilen CA anahtarı tanıtıldı; genel sertifika doğrulaması kapatılmadı. Bu, bütün 1.242 testin Vercel’de tekrarlandığı veya tam WCAG sertifikası olduğu iddiası değildir.

[Otomatik Pages 43911524726](https://github.com/kaansavukduran/yksmania/actions/runs/43911524726) kaynak 19590e28 üzerinde build/deploy/verify-published PASS verdi. Prefix derlemesi ve yayımlanmış köken ayrı ayrı 93 benzersiz çevrimdışı/reload akışını geçti; worker ve manifest /yksmania/ altındadır, rendererErrors ve missing boş. Yayındaki 25 dosya normal TLS ile sabit prefix derlemesiyle eşleşti. Normal/prefix derlemeler 271 gerekli cache varlığı içerir; toplam dosya sayısı 281’dir. Gerekli byte toplamları normal 26.760.629, prefix 26.760.478; hiçbir tek dosya 5 MiB’ı aşmaz.

[Release 43911558114](https://github.com/kaansavukduran/yksmania/actions/runs/43911558114) dört masaüstü dosyası ve iki kanıt varlığı yayımladı; gerçek etiket, verified-run.json ve successful main SHA aynıdır. Beş manifest kaydı GitHub varlık SHA-256 değerleriyle eşleşti; manifest kendisini hashlemez. Yayımlanan 145.659.081 byte AppImage ayrıca indirildi; çalıştırmadan önce/sonra SHA-256 569aab3b2b5824cce26d664d499266b06ba6625be29f8a4e05a11f726a58b5f7 aynıydı. Özgün native 93 akış ilk koşuda PASS, renderer hatası 0. Ayrı kısa readonly profilde gerçek sidebar/version.json/app.getVersion 0.18.2 ve app.isPackaged ölçüldü; korunmuş veri ve reload ayrıca doğrulandı. Test edilen AppImage, bu VM’de extract-and-run yoluyla çalıştırıldı. Temiz işletim sistemi kurulumu, Windows portable dosyasının taşınması, fiziksel Android ve native iki-sürüm kurulum/yükseltmesi bu kabul değildir.

Gerçek yerel aynı-köken 0.18.1→0.18.2 web güncellemesi üç ham IDB store’unu, belge/PDF baytlarını, notları, tekrar tarihlerini, yarım çalışmalar ve eski kâğıtları korudu. Aktivasyonda otomatik state yazımı 0. İlk harness denemesi iki güncelleme düğmesiyle eşleştiğinden aktivasyondan önce durdu; gerçek Settings main seçicisiyle taze profilde bütün akış geçti. Bu public CDN, fiziksel veya native yükseltme deneyi değildir.

İlk yerel tam birim turundaki 1.741 PASS/1 timeout kaydı, izole PASS, ikinci tam 1.742 PASS ve ölçek regresyonu eklenmiş son 1.743 PASS kayıtları korunur; süre artırılmadı. Tamamlanmamış eski CI 43896971064, bitkiler testinin eski raw kökü beklediği kanıtlandığı için iptal edildi. Beklenti onaylı gösterime bağlandı; aynı test eski beklentiyle FAIL, yeni beklentiyle PASS verdi; test gövdesi ve süreleri değişmedi. Tam yayın kanıtı yeni 43901085247’dir. Önceki aralıklı boş web başlangıcının kesin nedeni hâlâ kanıtlanmadı; son başarılar kök neden onarımı diye sunulmaz.

300 yeni yardımın bağımsız kaynak incelemesi, 3.243/2.640 çözüm sayımı ve ham 5.883 sorunun korunumu teknik kabule ek olarak denetlendi. Bu tur bütün 480 rehber veya bütün Drive/MEB arşivi baştan bilimsel olarak okunmadı. [Geometri kapsam incelemesi](GEOMETRY_SCOPE.md) içerik tamlığının açık kaldığını somutlaştırır. Android imzası ertelendi; yeniden kullanıcı adımı istenmedi.

---

## Önceki kaynak ve kabul kayıtları

# 0.18.2 adayının kabul kaydı

Altı paketin 300 kartı bağımsız tam içerik incelemesinden geçti; gerçek küresel çözümleyici 3.243 ayrıntılı / 2.640 kısmi yardım verir. Bağımsız 5.400 gerçek QuestionHelp renderi ve 1.800 buton callback'i eski 2.943 yardımın bütün panellerini korudu. Ham 5.883 soru, 514 öğretim kaydı, 480 rehber ve 479 sıralı başlık aynıdır. On iki `passage: undefined` alanı, nesne alanları ve referans topolojisiyle ayrıca karşılaştırıldı. 19 dar soru görünümü ve bağlı üç rehberin atomik koşulları denetlendi.

İlk tam yerel birim turu 1.741 PASS/1 FAIL: 120 deneme varyantı kuran eski source-integration-092 testi, paralel TypeScript/özel SSR işleri sırasında 5.000 ms bütçesini aştı; koşul veya anahtar farkı bildirmedi. Aynı değiştirilmemiş iki test ayrı koşuda geçti. Diğer işler tamamlandıktan sonraki ikinci tam tur 191 dosyada 1.742/1.742 PASS verdi. İlk sonuç korunur; süre, beklenti veya ürün bu sonuç için değiştirilmedi. Telefon görüntüsünde sonradan yakalanan MathQ7D gerekçesindeki eksik a çarpanı tek metin alanında düzeltildi; farklı kutu ölçekleri için bir regresyon eklendi. Son tam tur 191 dosyada 1.743/1.743 geçti.

TypeScript geçti. Sabit normal/prefix derlemeleri 271 gerekli çevrimdışı varlık içerir: 26.760.629 / 26.760.478 byte. En büyük dosya 2.865.964 byte, 5 MiB altındadır. İlk derlemede 17/17 gerçek UI ve native/prefix 93 aile geçti. Görsel okumada bulunan son MathQ7D düzeltmesi ve eksik favicon tanımı sonrası her iki derleme yenilendi; son derlemede native ve prefix 93 aile ile iki hedef UI kontrolü geçti. Son iki UI vakasında 701 yanıtın tamamı HTTP200, page exception/console warning/console error ve axe ihlali 0; düzeltilen formül gerçek telefon PNG’sinde okundu. Son prefix turunda eksik ağ isteği yoktur. Yerel UI kabulü iki koşunun birleşimidir: ilk derlemede 17, son derlemede iki hedef vaka. Son derlemede 17 vakanın tek turda yeniden koşulduğu iddia edilmez. Native ve prefix ise son derlemede tam tekrarlandı. CI/paket/yayın kapıları henüz başlamadı; bu yerel kabul onların yerine geçmez. Native uyarı sayısı runner tarafından ölçülmedi; renderer hatası 0. Yeni Android veya fiziksel cihaz kabulü yoktur.

Vercel’de son 0.18.2 runtime’ın 25 dosyası normal TLS ile yerel son derlemeyle eşleşti ve ilk public 17/17 akış geçti. Yerel 0.18.1→0.18.2 güncellemesi üç ham IDB store’unu, belge baytlarını, notları, tekrar tarihlerini ve eski kâğıtları korudu; aktivasyonda otomatik state yazımı olmadı. İlk güncelleme denemesinde iki eşleşen güncelleme düğmesi nedeniyle test seçicisi durdu; Settings main kapsamına daraltılan seçiciyle yeni profilde bütün akış geçti.

Eski thirty-unit-cases test metadatasının bitkiler ilk sorusunda eski ham metni beklediği ayrıca gerçek koşuda doğrulandı. Beklenti, onaylı soru görünümüne bağlandı; test gövdesi, süreleri, model/cevap/not ve çevrimdışı kayıt kontrolleri aynıdır. Eski beklentiyle bir FAIL, düzeltilmiş beklentiyle aynı vaka PASS kaydı korunur. Bu nedenle henüz tamamlanmamış 43896971064 CI turu iptal edildi; test metadata düzeltmesini içeren yeni kaynakta tam CI yeniden aranır. Uygulama ve iki son derlemenin baytları bu test düzeltmesinden etkilenmez.

---

## Önceki kaynak ve kabul kayıtları

# 0.18.1 doğrulanmış yayın — 16 Kasım 2026

Kaynak `1da8b22c63f8bbd611ef919d9e50f7129a9f746d`. [Tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/43877471841) 1.663/1.663 birim ve ilk tam koşuda 1.225/1.225 tarayıcı testiyle geçti. Gerçek paketli Windows/Linux çevrimdışı kullanım, yeniden yükleme ve aynı profilde süreç yeniden açılışı kontrolleri geçti; renderer hatası 0. Android imzası ertelendi ve Android işi açık kapsam gereği atlandı.

[Vercel](https://yksmania.vercel.app) ve [GitHub Pages](https://kaansavukduran.github.io/yksmania/) 0.18.1 sunar. [Pages hattı](https://github.com/kaansavukduran/yksmania/actions/runs/43885930433) prefix derlemesini ve yayımlanmış kökeni ayrı ayrı denetledi. Normal TLS ile her iki kökenin 25 çalışma dosyası yerel sabit derlemeyle aynıdır. Vercel’de 38 hedef HTTPS akışı ayrıca geçti; bu 1.225 vakanın tamamının üretimde tekrar koşulduğu iddiası değildir. İlk yerel HTTPS denemesi Chromium’un ortam proxy sertifikasını tanımadığı için uygulama açılmadan durdu; gerçek 38 akış yalnız sağlanan ortam CA anahtarı tanıtılarak çalıştırıldı. OS TLS dosya karşılaştırmaları doğrulamayı atlamaz.

[Dört Windows/Linux indirmesi](https://github.com/kaansavukduran/yksmania/releases/tag/v0.18.1-alpha.1) başarılı CI işinin aynı dosyalarından, yeniden derlenmeden yayımlandı. `verified-run.json` kaynak SHA’sını; `SHA256SUMS.txt` beş dosyayı bağlar. GitHub’ın hesapladığı beş varlık özeti manifest ile aynıdır; altıncı varlık manifestin kendisidir. Yeni APK yayımlanmadı. Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arasında veri koruyan kurulum bu kabulün kapsamı değildir.

Önceki 0.18 koşusunun 16 yerel ve 13 üretim hatası tarihsel kayıtta korunur. Yazılı hatırlama erişimi, dolu katman ifadesi ve dar telefondaki uzun sözcük için doğrulanmış onarımlar vardır. Aralıklı boş web başlangıcının kesin nedeni kanıtlanmadı: son tam koşu, 38 üretim akışı ve gözlemci eklenmeyen 20 özgün çevrimdışı akış geçti; bunlar tek başına bir kök neden onarımı iddiası değildir. Yeni bir başarısızlıkta yükleyici/cache/durable-state sınırını yakalayan pasif kanıt kaydı vardır.

---

## Önceki kaynak ve kabul kayıtları

# 0.18.1 adayının kabul kaydı

1.663/1.663 birim testi ve TypeScript geçti. Üretim derlemeleri normal/prefix için 271 gerekli çevrimdışı varlık içerir: 25.963.266 / 25.963.107 byte; en büyük dosya 2.865.964 byte, 5 MiB sınırının altındadır.

Gerçek yeni 11 E2E ilk koşuda 11/11 geçti: altı dersin kademeli yardım/sonuç/yanlışlar akışı, üç düzeltilmiş sorunun normal UI akışı ve iki anlatım/özet profili. İki okuyucu profili gerçek Lexend 15/45 px ile çalıştı; 320 px görünümde belge taşmadı, dört axe raporunda bütün önem düzeyleri sıfırdı. Yeni 11 koşu uygulama konsol sayacı ölçmedi; uygulama uyarısı sıfır iddiası kurulmaz.

Dokuz eski narrative ve bir temel soru seti 10/10 ilk koşuda geçti. Eski ikinci soru, yazılan yanıt, gerekçe ve offline reload beklentileri korundu. Ek normal/telefon iki refakat testi 2/2 geçti; telefon sözcükleri gerçek 45 px Lexend’de tek satırlı parçalardır. Bu 23 hedef kontrol, bütün 1.225 E2E koşusu değildir.

0.18 önceki tam CI: 1.198 PASS/16 FAIL. Aynı kaynakla yayımlanmış Vercel turu 1.201 PASS/13 FAIL verdi; üç ek feedback ve bir sonuç reload’unda benzer başlangıç belirtisi, iki özet akışında ilk service worker hazırlığı süresi görüldü. Bu nedenle boş başlangıç yalnız yerel preview’ye atfedilmez. Katman açıklamasının onaylı görünümüyle eski beklenen metin uyuşmazlığı ve 31 pakette gizlenmiş yazılı hatırlama onarıldı; telefon sınırındaki sözcük sadeleştirildi. Dokuz offline reload başarısızlığının ilk yerel tekrarında yeni belgenin kökü boştu; üç JS isteği iptal edilmişti. Kesin iptal nedeni ve o ilk belgenin ham IDB zaman çizgisi yakalanmadı. Sonraki geçişler ilk başarısızlığı geçersiz kılmaz; pasif loader/cache/IDB tanısı eklenir. Süre artırma veya assertion kaldırmayla geçiş üretilmedi.

Gerçek yerel Electron 93 ailede çevrimdışı kullanım/reload ve aynı profilde süreç yeniden açılışını geçti; renderer hatası 0. Prefix 93 ailede ilk çevrimdışı kullanım/reload geçti, renderer hatası 0; eksik tek zararsız favicon.ico isteği ayrı kaydedildi. Son tam CI/paket/yayın kapısı devam eder. Android imzası ertelendi; fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arası yükseltme bu kabulün kapsamı sayılmaz. Önceki gerçek 0.17→0.18 web güncelleme kanıtı aşağıda korunur.

---

## Önceki kaynak ve kabul kayıtları

# Güncel 0.18 kaynak adayı

Doğrulanmış çalışma sırasındaki 479 başlığın tamamı anlatım ve bağımsız soruyla eşleşir. Kaynakta 480 ayrıntılı rehber, 480 yerleşik kopya kağıdı ve 5.883 özgün soru vardır. 0.17 üzerine 130 yeni anlatım eklenmiş; kısa kalan 28 eski anlatım 553 bölüm, 168 çözümlü örnek ve 178 hatırlama etkinliğiyle derinleştirilmiştir. İleri sorular 28 ayrı setten açılır.

440 eski karta bilgi, yöntem, üç ayrı çözüm adımı, her seçenek için gerekçe, sık hata ve sonuç denetimi eklendi. Ayrıntılı yardım 2.743/5.883 karttadır; 3.140 kartın bütün aşamaları hazırlanacaktır. Son 235 kartın 95’i üç, 140’ı beş seçeneklidir. Eski seçenek sayısı veya cevap anlamı değiştirilmez. Bu kartlarda 705 çözüm adımı ve 985 şık gerekçesi vardır. Altı paketin bütün yardım yaprakları ikinci okuyucu tarafından kaynaklarla ve gerçek bileşenlerle denetlendi. İnceleme anahtarı görünen bir incelemedir; körlük iddiası yoktur.

Dokuz bilinen soruda eksik koşul veya yanıltıcı terim, tam eski soru kimliği doğrulandıktan sonra yalnız görünümde düzeltilir. Üç rehberin dokuz metin alanında elektron bulunması ile tam doluluk ayrılır; He, iyon ve Pd sınırları korunur. Ham 5.883 soru, 514 öğretim/soru-seti kaydı ve 480 rehber hash ile aynıdır. Ders/soru kimlikleri, seçenek sıraları, anahtarlar ve öğrenci kayıtları yeniden yazılmaz. İlk çalışma tarihleri ve 3/7/21 tekrarları korunur. Eski tam çözüm yeni sıralamada tam açılır; yeni yöntem düzeyi kendiliğinden tam çözüme dönüşmez.

1.581 birim testi ve tüm TypeScript/üretim derlemesi geçti. Normal derleme 271 gerekli çevrimdışı varlık ve 25.469.221 byte içerir; tek dosya 5 MiB altındadır. Önceki 122 UI akışında 120 PASS/iki telefon FAIL, son dört normal/telefon kontrolü 4/4 PASS oldu. Bu bir birleşim kabulüdür; tek son 122 koşusu denmez. Son kaynakta yerel Electron 93 aile çevrimdışı kullanım, reload ve aynı profilde süreç yeniden açılışını; /yksmania/ prefix 93 aile çevrimdışı kullanım/reload akışını geçti. Renderer hatası 0. Yeni 10 UI vakasında ilk 9 PASS/tek sentetik sınav fixture FAIL, kanıtlı alan-sırası düzeltmesinden sonra sınav ve refakat rehberi 2/2 PASS oldu. Sıfır otomatik yazım beklentisi korunur; ürün değiştirilmez. Bu son 10 kabulü koşuların birleşimidir. Tam 1.214 tarayıcı, gerçek paketli Windows/Linux ve üretim yayını kapıları henüz tamamlanmadı.

Gerçek eski 0.17 paketiyle aynı kökende 0.18 web güncellemesi geçti. Eski paketin bütün 197 dosyası ve TLS yayınındaki üç hash aynı kaldı. Öğrenci verisi eski UI ile üretildi: 5/5 paragraf, özgün tekrar tarihleri, yanlış/yardımlı protein taslağı, notlar, eski görsel ve 55 soru/7.425 saniyelik AYT kâğıdı. Yalnız zararsız sentetik PDF/belge kaydı fixture olarak eklendi. Gerçek Ayarlar güncellemesi bütün ham IDB ve belge baytlarını korudu. Eski tam2→yeni tam6 ve rehber11→19 yalnız gösterimde eşlendi. Sekiz yeni model ilk kez çevrimdışı kullanıldı ve süreç yeniden açılınca aynen kaldı. Açık Sonraki bölüm eylemi yalnız beklenen konumu yazdı; XP 25→25. Bu web profili deneyidir; native veya fiziksel cihaz yükseltmesi iddia edilmez.

TYT 120 soru/165 dakika, AYT Sayısal 80 soru/180 dakika ve 15 branş pratiği vardır. Öğrenci PDF yüklemez veya kaynak eşleştirmez. Başlık eşleşmesi bütün Drive/MEB alt kazanımlarının veya son 20 yılın bütün resmî ÖSYM arşivinin tamamlandığı anlamına gelmez. Canlı sürüm henüz 0.17’dir: [Vercel](https://yksmania.vercel.app), [Pages](https://kaansavukduran.github.io/yksmania/) ve [Windows/Linux](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1). Android imzası ertelendi; yeni APK yoktur. Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arası kurulum ayrıca sınanacaktır.

---

## Önceki kaynak ve kabul kayıtları

# Güncel 0.18 kaynak adayı — bütün sıralı başlıklar ve 28 ayrıntılı genişletme

Doğrulanmış çalışma sırasındaki 479 başlığın tamamı anlatım ve bağımsız soruyla eşleşir. Güncel kaynak 480 ayrıntılı rehber, 480 yerleşik kopya kağıdı ve 5.883 özgün soru içerir. Son 28 eski kısa anlatım 553 bölüm, 1.106 paragraf, 168 çözümlü örnek, 504 çözüm adımı ve 178 hatırlama etkinliğiyle genişletildi. Yeni 561 soru, 28 ayrı ileri soru setinden açılır. Her kart beş seçenek, en az üç gerçek çözüm adımı ve beş seçenek gerekçesi taşır. Ayrıntılı yardım 2.303 karttadır; 3.580 eski kartın bütün yardım aşamaları henüz tamamlanacaktır.

Önceki 5.322 sorunun tüm alanları, 486 öğretim kaydı, 452 ayrıntılı rehber ve 479 başlığın çalışma sırası eşleşmeleri hash ile korunur. İki eski fizik sorusunda tek cevabı belirlemek için eksik hareket yönü ve enerji koşulları sunum katmanında açıklığa kavuşturuldu. Düzeltme yalnız bütünüyle tanınan eski soruya uygulanır. Kaydedilmiş soruların kimlikleri, anahtarları, yanıtları ve deneme kâğıtları yeniden yazılmaz. Eski tam çözüm düzeyi yeni yardım sıralamasında tam çözüm olarak görüntülenir. Yeni kayıtlar yardım paneli sayısını açık kullanıcı eylemiyle saklar.

1.465 birim testi ve üretim derlemesi geçti. Derleme 271 gerekli çevrimdışı varlık ve 24.363.166 byte içerir; tek dosya 5 MiB altındadır. İleri soru setlerinin 29 gerçek tarayıcı akışı geçti. Model, telefon, masaüstü, prefix ve sürüm yükseltme kontrolleri sürmektedir. Yeni modellerin bilimsel kaynak, soru anahtarı, gerçek SVG/HTML ve saklanan bozuk türlerini değerlendiren bağımsız incelemeleri kapalıdır. Kaynak incelemesi yayın kabulü değildir.

Öğrenciye PDF yükleme veya kaynak eşleştirme işi bırakılmaz. Her kaynağın bütün alt kazanımlarının ve son 20 yılın resmî ÖSYM arşivinin işlendiği iddia edilmez. Canlı sürüm henüz 0.17’dir: [Vercel](https://yksmania.vercel.app), [Pages](https://kaansavukduran.github.io/yksmania/) ve [Windows/Linux](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1). Android imzası kullanıcı tarafından ertelendi; yeni APK yoktur. Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arası veri koruyan kurulum ayrıca sınanacaktır.

---

## Önceki kaynak ve kabul kayıtları

# 0.18 kaynak adayı — 479 sıralı başlığın tamamı

Doğrulanmış çalışma sırasındaki 479 başlığın tamamı uygulama içi anlatım ve bağımsız soruyla eşleşir. Güncel toplam 480 anlatım, 452 ayrıntılı rehber, 480 yerleşik kopya kağıdı ve 5322 özgün sorudur. Son 11 konuda 249 bölüm/498 paragraf, 70 çözümlü örnek/210 adım ve 64 hatırlama etkinliği vardır. Yeni 234 beş seçenekli kartın tümünde kademeli yardım bulunur: 654 gerçek adım ve seçeneklerine bağlı 1170 gerekçe. Ayrıntılı yardım toplam 1742/5322; 3580 eski kartta bütün yardım kademeleri henüz tamamlanacaktır. 28 eski kısa anlatım da derinleştirilmektedir.

Önceki 5088 sorunun tüm alanları ve 475 öğretim kaydı hash ile korunur; kaydedilmiş 120/80 deneme kâğıtları, cevaplar, işaretler ve son zamanlar değişmez. TYT 120 soru/165 dakika, AYT Sayısal 80 soru/180 dakika doğru ders kotaları ve beş seçenekle sunulur. Başlık eşleşmesi her kaynağın bütün alt kazanımları, bütün eski soru yardımları ve 20 yıllık resmî ÖSYM arşivinin tamamlandığı anlamına gelmez.

1307/1307 birim, TypeScript ve normal/prefix üretim derlemesi geçti; son mobil metin onarımları ayrıca dört ailenin toplam 66 hedef birim kontrolünden geçti. PWA 254 gerekli varlığı kapsar, tek dosya 5 MiB altındadır. Gerçek yerel Electron 85 ailede çevrimdışı kullanım/reload/aynı profilde süreç yeniden açılışını, /yksmania/ prefix 85 ailede çevrimdışı kullanım/reload akışını geçti; renderer hatası 0. Yeni 34 UI vakası son kabul birleşiminde kapsanır: önce 23 PASS/11 telefon FAIL, düzeltmede 32 PASS/2 FAIL; son iki telefon ve iki normal refakat vakası 4/4 PASS. Tek son 34 koşusu denmez. Tüm 1082 tarayıcı ve gerçek paketli Windows/Linux kapısı sonraki birleşik kaynakta ayrıca aranır; bu yerel kabul yayın kabulü değildir.

Telefon onarımları seçilen yazı boyutunu korur. İç boşluklar ve listeler dar ekrana uyar; uzun model ifadeleri anlamı korunarak sadeleşir. Bilimsel veri, rehberler, bankalar, sayısal model, SVG anlamı ve kullanıcı gerekçeleri kopya değişikliklerinden etkilenmez. Kanonik özel adlarda kontrollü yumuşak tire ve tam erişilebilir ad korunur. Bozuk türde model kaydının eski cevabı tekrar açmaması için 11 gerçek IDB bozma/yeniden açma/ilk geçerli giriş kontrolü geçti.

Öğrenci PDF veya kaynak yüklemez; öğretim, özetler, sorular ve denemeler uygulamadadır. Özel kaynaklar Git dışında tutulur. 9175 özel kimlik ve 9468 bağlantı ile taranan 378 metin yolunda eşleşme yoktur. Canlı sürüm hâlâ 0.17'dir: [Vercel](https://yksmania.vercel.app), [Pages](https://kaansavukduran.github.io/yksmania/) ve [Windows/Linux indirmeleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1). Bu aday henüz yayımlanmadı. Android imzası ertelendi; yeni APK yayımlanmadı. Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arası yükseltme bu kabulün kapsamında değildir.

---

## Önceki kaynak ve kabul kayıtları

# 0.18 kaynak adayı — ilk 468/479 sıralı başlık

Güncel kaynak 469 anlatım, 441 ayrıntılı rehber, 469 yerleşik kopya kağıdı ve 5088 özgün soru içerir. Son paket, 29 yeni anlatım ve mevcut türev rehberine kayıpsız genişletme ekler: 577 bölüm, 1154 paragraf, 177 çözümlü örnek/537 adım ve 171 hatırlama etkinliği. Yeni 564 kartın tamamı beş seçeneklidir; 1661 çözüm adımı ve seçeneklere bağlı 2820 gerekçe sunar. Ayrıntılı yardım toplam 1508/5088 karttadır; 3580 eski kartta bütün kademeler hâlâ tamamlanacaktır.

Önceki 4524 sorunun bütün alanları, 445 öğretim kaydı ve kayıtlı 120/80 deneme kâğıtları korunur. Eski türev rehberinin 11 bölümü, 8 örneği ve 4 hatırlama sorusu aynen durur; yeni rehber 19/12/8 kapsamındadır. Eski türev etkinliği yeni modelin yanında çalışır. İlk açılışta eski örnek konumu korunur; ancak açıkça Sonraki bölüm seçilince yeni bölüm sayısına kayıt yapılır. Bu yerel IDB regresyonu, gerçek sürümler arası yükseltme denemesi diye sunulmaz.

1238/1238 birim, 316 modül adı/TypeScript ve normal/prefix üretim derlemesi geçti. PWA 245 gerekli varlığı kapsar; tek dosya 5 MiB sınırının altındadır. Gerçek yerel Electron 81 aile çevrimdışı/reload/aynı profilde süreç yeniden açılışını, /yksmania/ prefix kabulü 81 aile çevrimdışı/reload akışını geçti; renderer hatası 0. Yeni 124 UI vakasının kabulü son koşuların birleşimidir: 121 vakada 104 PASS/17 FAIL, ilgili son 24/27 koşuda eski 17 kusur ve ek normal regresyonlar PASS, kalan üç yeni yer imi/yer adı vakası son koşuda 3/3 PASS. Tek son 124 koşusu iddiası yoktur. Bir önceki 023 CI'da 921/924 tarayıcı geçti; üç test eski boş içerik ve aynı adlı ders seçimi varsayımına takıldı. Bunlar burada düzeltilip hedefli yeniden geçirildi. Bütün 1048 tarayıcı ve gerçek paketli Windows/Linux kapısı son birleşik kaynakta ayrıca aranır.

Gerçek kayıt kusuru da onarıldı: bozuk türde bir model alanı varsayılana dönünce eski karşılaştırma açıklaması yeni sonuca aitmiş gibi gösterilebiliyordu. 023'ün 30 ve 024'ün 30 modeli için gerçek IDB bozma/yeniden açma/ilk yeni eylem regresyonları vardır. Daha eski bütün modellerin bozuk kayıt sınıfları denetlendi denmez. Büyük yazıda model kontrolleri dar ekrana uyar; seçilen yazı boyutu korunur. Ders girişi sabit kimlikle seçilir; Alkanlar ile Sikloalkanlar karışmaz. Sulucakarahöyük adı görünür isteğe bağlı hece bölümü ve tam erişilebilir adıyla korunur; ölçümde Chromium'un önceki yumuşak tireyi sonraki sözcük aralığına katması ayrı doğrulandı.

TYT 120 soru/165 dakika ve AYT Sayısal 80 soru/180 dakika doğru ders kotalarıyla sunulur. Öğrenciye PDF veya kaynak yükleme işi bırakılmaz. Kaynak okumaları ve bağımsız içerik denetimi özel kayıtlarda tutulur; ham kitaplar, Drive kimlikleri ve özel bağlantılar Git'e alınmaz. 9175 özel kimlik ve 9460 bağlantıyla taranan 349 metin yolunda eşleşme yoktur; yalnız önceki yazı tipi bağımlılığı bulunur.

Canlı sürüm 0.17'dir: [Vercel](https://yksmania.vercel.app), [Pages](https://kaansavukduran.github.io/yksmania/) ve [Windows/Linux indirmeleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1). Bu 0.18 adayı henüz yayımlanmadı. Android imzası ertelendi; yeni APK yoktur. Kalan 11 sıralı başlık ve 28 eski kısa anlatım üzerinde çalışma sürer. Bütün Drive/MEB alt kazanımları, her eski sorunun ayrıntılı yardımı ve son 20 yılın resmî ÖSYM arşivi tamamlandı sayılmaz. Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arası yükseltme bu kabulün kapsamında değildir.

---

## Önceki kaynak ve kabul kayıtları

# 0.18 kaynak adayı — ilk 438/479 sıralı başlık

409–438. başlıklar için 30 yeni anlatım eklendi: 593 bölüm, 1186 paragraf, 163 farklı çözümlü örnek/489 adım ve 155 hatırlama etkinliği. Toplam 440 anlatım, 412 ayrıntılı rehber, 440 yerleşik özet ve 4524 özgün soru vardır. Yeni 484 kartın tamamı beş seçenek ve özgül kademeli yardım taşır: 1286 gerçek çözüm adımı, 2420 eşlenmiş seçenek gerekçesi. Önceki 4040 sorunun bütün alanları ve 415 öğretim kaydı hash ile korunur.

TYT 120 soru/165 dakika ve AYT Sayısal 80 soru/180 dakika doğru ders kotalarıyla sunulur. Kaydedilmiş eski kısa ve tam denemelerin soru kâğıdı, cevap, işaret ve süreleri yeniden yazılmaz. Ayrıntılı yardım toplam 944/4524 karttadır; kalan 3580 kartın bütün çözüm adımları henüz tamamlanmadı. 28 eski kısa anlatım da ayrıca derinleştirilecektir. Başlık sayısı bütün Drive/MEB/ÖSYM arşivi veya bütün alt beceriler tamamlandı demek değildir.

1111/1111 birim ve normal/prefix üretim derlemesi geçti. PWA 230 gerekli varlığı kapsar; tek dosya 5 MiB sınırı korunur. Yerel Electron ve /yksmania/ prefix kabulünde 74 aile çevrimdışı model/HTML değişimi ve kalıcı kayıt/reload kontrolünden geçti; Electron aynı profilde süreç yeniden açılışını da geçti. Bu iki artifact son iki anlam eşdeğeri model metni düzeltmesinden öncedir. Yeni 65 UI vakasının son bütün koşusu 59 PASS/6 FAIL verdi; altı sorunlu telefon vakası son düzeltmede 6/6 geçti. Böylece 65 vaka bu kabul birleşiminde kapsanır; tek son 65 koşusu denmez. Tam 924 tarayıcı ve gerçek paketli Windows/Linux kapısı bu aday üzerinde ayrıca aranır.

Gerçek kayıt kusuru düzeltildi: 600 karakter kabul eden etkinlik alanı, 128 karakterlik kalıcı kayıt sınırıyla uyuşmuyordu. Alan, görünür açıklama ve kayıt aynı 128 sınırını kullanır; 156 karakterlik girişin 128 olarak kaydı/reload kontrol edildi. Matematik/fizik/biyoloji/kimyada boş gerekçeli eski “kontrol edildi” durumu açıklamayı açamaz; dört regresyon eski kodda başarısız, düzeltmede başarılıdır. Geçerli kısa gerekçe kabul edilir; keşif ve süre XP üretmez. Telefon metinleri yazı küçültmeden düzenlendi; açık temada düğme kontrastı tema değişkenine bağlandı.

Canlı sürüm 0.17’dir: [Vercel](https://yksmania.vercel.app), [Pages](https://kaansavukduran.github.io/yksmania/) ve [Windows/Linux indirmeleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1). 0.18 henüz yayımlanmadı. Android imzası kullanıcı tarafından ertelendi; yeni APK yoktur.

Bozuk türde eski keşif alanlarının varsayılana dönmesiyle, önceki açıklamanın yeni model için açılmasına ilişkin ek geri yükleme denetimi sürer. Sonraki 024/025 ailelerinde bu sınıf onarılıyor; daha eski aileler ayrıca denetlenecek. Bu özellik dalı yayın kabulü değildir.

Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arası yükseltme bu kabulün kapsamında değildir. Kaynaklar, özel kimlikler ve imza anahtarları Git dışında tutulur; öğrenciye PDF yükleme işi bırakılmaz.

---

## Önceki checkpoint kayıtları

# 0.18.0 — kaynak 022 son ürün kontrolleri

| Kapı | Gerçek sonuç |
| --- | --- |
| Modül yolu/TypeScript |288 ad, PASS |
| Birim |1007/1007, 121 dosya PASS |
| Yeni normal/telefon UI |61/61 son koşu PASS |
| Önceki 021 tam CI |926 birim/798 tarayıcı, paketli Windows/Linux PASS |
| Normal ve prefix derleme |215 gerekli varlık, 218 precache, tek dosya<5 MiB PASS |
|022 native/Pages |67 aile Electron PASS; Pages67 aile PASS |
| Tam E 2 E |859 vaka;uzak son koşu bekleniyor |
| Özel veri/bağımlılık |259 metin yolu 16.7 MB, 9175 özel kimlik/9425 URL ile 0 eşleşme;yalnız önceki Bricolage ek bağımlılığı |

61 son vaka gerçek menüden konuya giriş, model değişimi, not, kalıcı keşif, ilk offline/reload ve öğrenme kredisi oluşmamasını denetler. Telefon 320 px/UI 200/yazı 150, gerçekSystem+Lexend, reduced-motion veaxe kontrolündedir. Önceki 41/20 ve 59/2 başarısızlık kayıtları tutulur;ilk yanlış 0.11 önizlemeye giden 60 başarısız vaka yeni ürün sonucu sayılmaz.

Bulunan gerçek kusurlar: biyoloji alan açıklaması yüzde yerine%{fmt022(palisade)} yazıyordu; şablon gerçek%40 olarak düzeldi ve regresyon bunu denetler. Korozyonda 0.65 gZn, 1930 C kapasite ve 2500 C talepte stok 0 olsa da çizim doluydu; kalan paya bağlı dolgu 0, y=252 temas noktası ve 570 C açık birlikte denetlenir. Gerçek büyük yazı bölünmeleri/dar düğmeler düzeldi. Kimya rol seçicisi output’ların örtük status rolünü de yakalıyordu;yalnız açık geri bildirim paragrafı seçilir. Matematik SVG title artık tek stringdir;3 React SSR uyarısı kapanır.

Eski 3650 soru, 385 öğretim kaydı ve 115/80 tam deneme snapshotları strict hash/tamJSON ile korunur. Kendi kaynak/modelSSR kanıtı normalUI, gerçekIDB veya fiziksel kurulum kabulü yerine geçmez.

Canlı sürüm0.17’dir: [Vercel](https://yksmania.vercel.app), [Pages](https://kaansavukduran.github.io/yksmania/) ve [Windows/Linux indirmeleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1). Kaynak3a3a6c5ab6949d2a4b14076f4af4d8aefba656a2 üzerinde832 birim/737 tarayıcı,737 yayımlanmış kabul ve54 aile gerçek paketli masaüstü/Pages geçti. Bu0.18 adayının sayıları canlıya eklenmiş sayılmaz. Android imza ayarı ertelendi; yeni APK yoktur. Fiziksel cihaz,temiz kurulum,portable taşıma ve native sürümler arasında veri koruyan kurulum test edilmedi.

---

Prefix ilk koşusu eski nokta analitiği offline reload sonrasında boş kök belgeyle başarısız oldu; renderer hatası ve eksik kaynak isteği görülmedi. İlk kanıt saklandı. Ürün kodu veya timeout değiştirilmeden hata anına ağ/belge teşhisi eklenen tam67 aile tekrarında PASS,0 renderer hatası çıktı. İlk boş belgenin nedeni kesinleştirilmiş veya ürün yamasıyla giderilmiş diye sunulmaz; uzak tam koşu ayrıca izlenir.

## Önceki aday checkpoint kayıtları

# 0.18.0 kaynak adayı — 349–378. başlıklar

Güncel kaynakta 380 anlatım,352 ayrıntılı rehber,380 yerleşik özet ve 3650 özgün soru var; ilk 378/479 başlık anlatım+soruyla eşleşir. Bu paket 30 yeni anlatım ve 310 yeni beş seçenekli soru ekler. Kaynak/ikinci okuyucu kabulü ile ürün/yayın kabulü ayrıdır. Henüz 0.18 üretim yayını yoktur.

Yeni AYT karma 80 soru/180 dakika;40 matematik-geometri,14 fizik,13 kimya,13 biyoloji. Tam dağılım ancak her kota beş seçenekli kartlarla doluyorsa sunulur; sekiz ayrı başlangıç tohumu bunu doğrular. TYT 115 soruluk kısa pratik, Din kotası eksikliğiyle açıkça kalır. Eski 115/55 soruluk deneme kâğıtları, cevapları, işaretleri ve süreleri aynen korunur. Branş pratikleri ve eski kısa öğretim kartları kaldırılmaz.

Yeni 310 sorunun 50’si ayrıntılı kademeli rehber taşır; önceki 20 özgün rehberle toplam 70/3650 olur. Diğer sorular mevcut ipucu/açıklamasını kullanır; hepsinde tam rehber var denmez. Bu 50 kartta bilgi/yöntem ve gerçek 150 çözüm adımı arasında normalize metin tekrarı 0; bu mekanik tarama pedagojik etki kanıtı değildir.

926/926 birim, TypeScript/modül yolu ve normal/prefix derleme geçti. İlk 61 yeni tarayıcı vakası 37 PASS/24 FAIL; gerçek uzun sözcük/dokunma sorunları ve üç test seçici/işaret/ölçek beklentisi onarıldı. İkinci 61 koşusu 59 PASS/2 eski metin beklentisi FAIL; bu iki fotosentez vakası sayısal beklentiler korunarak doğru yeni ifadeyle ayrıca PASS. Bütün 61 vaka bu kabul birleşiminde kapsanır; tek son 61 koşusu denmez.798 tam tarayıcı vakası toplanır; tam uzak koşu henüz yapılmadı.

61 ailelik yerel Electron çevrimdışı etkileşim, kayıt/reload, aynı profilde süreç yeniden açılışı ve Pages prefix ilk-offline kabulü geçti; renderer hatası 0. Sonradan 0.17’nin sekiz eski model metni ve kalıcı onay kutusu test onarımı bu dala alındı; son kaynak/paket kabulü ayrıca aranır. Bu, fiziksel cihaz veya native sürümler arasında yükseltme değildir. PWA 202 gerekli varlığı kapsar;5 MiB sınırı korunur.

Sonraki 379–408 kaynak paketinde 390 soru hazırlanmıştı; gerçek tarama 280’inde ayrıntılı rehber,110’unda eksik rehber gösterdi. Matematik 80 ve Fizik 30 rehberi bu bilinen açık için geliştiriliyor.409–438 paketinde örnek–banka kopyası, tekrar eden yardım adımı ve cevap konumu örüntüsü ayrıca onarılıyor.439 sonrası kaynak üretimi sürer. Sayı başlık tamamlanması, tüm alt beceriler veya tüm Drive/MEB/20 yıl ÖSYM arşivi demek değildir.

Android imza ayarı kullanıcı tarafından ertelendi; yeni APK hazırlanmış sayılmaz. Web ve masaüstü çalışması sürer. Özel PDF/kimlik/anahtar depoya konulmaz; öğrenci kaynak yüklemez.

---

## Önceki0.17 aday checkpoint'i

# 0.17.0 — yayımlanmış sürüm doğrulandı

16 Kasım 2026: kaynak/tag `3a3a6c5ab6949d2a4b14076f4af4d8aefba656a2`. **350 anlatım, 322 ayrıntılı rehber, 350 yerleşik özet ve 3.340 özgün soru**; ilk 348/479 sıralı başlık hazır. Önceki 0.16 üzerine 86 yeni anlatım, dört kayıpsız rehber genişletmesi ve 900 soru eklendi. Bütün kaynak arşivinin tamamlandığı anlamına gelmez.

[Main CI](https://github.com/kaansavukduran/yksmania/actions/runs/43788209311):832 birim, 737 tam tarayıcı ve gerçek paketli Windows/Linux çevrimdışı/süreç yeniden açılışı PASS; Android SKIPPED. [Vercel kabulü](https://github.com/kaansavukduran/yksmania/actions/runs/43788736262):737 PASS (736 gerçek HTTPS, bir yerel geliştirme regresyonu). [Pages](https://github.com/kaansavukduran/yksmania/actions/runs/43791530727): build/deploy/yayımlanmış 54 aile kabulü PASS. Önceki 728 PASS/9 FAIL koşusu ve onarımları aşağıda tarihsel kanıt olarak tutulur; son 737 koşuları onların yerine geçer.

[Alpha indirmeleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1), [yayın işi](https://github.com/kaansavukduran/yksmania/actions/runs/43792983676): Windows x 64 Setup/Portable, Linux AppImage/DEB ve iki küçük kanıt dosyası, toplam altı varlık. Beş checksum ve altı GitHub asset digest eşleşir; iki küçük dosya normal TLS ile indirilip ayrıca hashlenir. Dört büyük binary yerelde yeniden indirilip hashlenmedi. Android imza ayarı ertelenmiştir; bu yayında yeni APK yoktur. Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arasında veri koruyan kurulum NOT TESTED.

Gerçek 0.16→0.17 web güncellemesi eski notları, oturumları, özgün tekrar tarihlerini, yanlış taslağını, 45 soruluk eski AYT kâğıdını/deadline’ını ve eski belge baytlarını korudu;17 yeni model ilk kez çevrimdışı açıldı, XP 25→25. Ayrıntılı kademeli yardım 20 sorudadır; diğer 3.320 soru mevcut ipucu/açıklamasını kullanır. Canlı katalog 16 kısa pratiktir: TYT 115/9488 sn, AYT 55/7425 sn ve 14 branş. Tam 120/80 dağılım yeni geliştirme adayındadır;0.17’de varmış gibi sunulmaz.

349–378 paketi ayrı özellik dalında 926 birim/798 tarayıcı ve 61 aile paketli Windows/Linux kabulünü geçti; canlıya eklenmedi. 379–408 paketi geliştirme alanında 1007 birim ve derlemeyi geçti; gerçek mobil/çevrimdışı kabulü sürüyor. Bu adayın TYT 120/AYT 80 dağılımı canlı 0.17 sayılarıyla karıştırılmaz. Sonraki kaynak üretimi ve eski kısa rehber/ayrıntılı yardım/resmî arşiv/video açıkları sürer.

---

## Aday aşamasının tarihsel denetim kaydı

# 0.17.0 adayı — kabul kapıları ayrı tutulur

Henüz yeni üretim yayını yoktur. Son bütünleşik birim koşusu 832/832 (106 dosya) PASS; TypeScript/modül yolu ve normal/prefix üretim derlemeleri PASS. PWA’nın 187 zorunlu varlığı önbellekte, 5 MiB tek varlık sınırı korunur. 737 E2E toplanır; tam uzak koşu ve gerçek paketli Windows/Linux kabulü bekler.

İlk 62 yeni ünite/uzantı/font vakasında 54 PASS/8 FAIL çıktı. Beş mobil biyoloji taşması, bir hidroliz formül bölünmesi ve SVG float32 uç ölçümü için iki yanlış test beklentisi dar onarıldı. Başarısız ilk kayıtlar saklıdır. Biyoloji beş sorunlu telefon vakası, kimya iki normal/telefon vakası ve indüksiyon iki vaka düzeltmelerle geçti; ayrı kaynak-matris testleri tam ürün kabulü diye sayılmaz. Son menstrual başlık/tick aralığı gerçek görüntülerde ayrıca onarıldı. Bütün 62’nin tek son koşuda geçtiği iddia edilmez.

54 ailelik gerçek yerel Electron çevrimdışı açılış, HTML/SVG değişimi, not/keşif kaydı, reload ve aynı profilde süreç kapat-aç kabulü PASS. /yksmania/ prefix altında 54 aile ilk kez çevrimdışı açılıp yenilendi; manifest/scope ve iki eski soru rotası PASS. Bunlar fiziksel cihaz, temiz Windows kurulum veya portable taşıma değildir.

Gerçek eski 0.16 arayüzünden 0.17 service-worker güncellemesi PASS: eski yayımlanmış üç çalışma dosyası hash eşleşmesi, tarayıcı süreç yeniden açılışı, bütün state alanları, gerçek 5/5 oturum ve özgün tekrar tarihleri, kontrol edilmiş yanlış taslak/not, 45 soru/6075 sn AYT cevap/bayrak/deadline, sentetik eski 870 bayt PDF ve kataloğu korunur. On yedi yeni model eski profilde ilk kez çevrimdışı açılır; XP 25→25. Eski paragraf örnek sekmesi yeni 17 bölümlük rehberde aynı etkinliği gösterir; açık Sonraki bölüm eylemiyle yeni hatırlama konumu yazılır. Native sürümden native sürüme yükseltme olarak sunulmaz.

Gerçek sonuçların son incelemesinde G=(1,0) için IV. bölge etiketi görüldü. Koordinatların ayrı ayrı bölünmesinden kalan yuvarlama hatası, telafili toplama ve en son bölmeyle onarıldı. Dört regresyon eski kodda4 FAIL verdi; son18/18 hedef test ve808 bağımsız tam-rasyonel oracle karşılaştırması geçti. Gerçek tiny koordinatlar sıfıra yuvarlanmaz. Eski10 soru/18 bölüm/6 örnek tam aynı kaldı. Normal uygulamada G’nin tam0 ordinatı ve xekseni HTML’si geçti. Mobil Lexend kontrolü ayrıca bir uzun giriş sözcüğü buldu; anlamı korunarak “Noktanın yerini değiştir” yapıldı. Son mobil kabulü de geçti: System ve gerçek Lexend,320px/UI200/yazı150, tam0 ordinat/xekseni HTML, bütün sözcükler,44px hedefler, çevrimdışı reload veaxe. Açık nokta adlarının bulunduğu listenin büyük yazıda iç boşluğu daralıyordu; liste girintisi kaldırıldı, bilgi ve yazı boyutu korunur. Sayısal onarımla54 aile native ve54 aile Pages tekrar geçti; bu iki artifact son üç kısa metin/liste girintisi değişiminden öncedir. Gerçek paket ve tam737 kabulü son commit üzerinde ayrıca aranır.

P0 yardım: 20 tam kimlikli rehber/40 adım/60 şık gerekçesi bağımsız okundu. Gerçek kalıcı kaydetme hatasında çözümün açılmaması, sonradan yardım açmanın bağımsız çözümü değiştirmemesi, deneme yardımının cevap/bayrak/deadline koruması ve büyük yazılı mobil System+gerçek Lexend/axe kontrolleri geçti. Yalnız 20 soruda ayrıntılı rehber vardır. Diğer soruların kısa ipucu sahte dört adıma çoğaltılmaz.

Android imza ayarı ertelendi: iş SKIPPED ise APK NOT BUILT. Masaüstü kapsamlı yayın dört paket + verified-run + SHA256SUMS içerebilir; açık APK kapsamı seçilirse metadata ve sabit sertifika da zorunlu. Collector yedi sentetik fixture kabul/ret denetimini geçti; bu gerçek APK üretim/imza kabulü değildir. Fiziksel Android, temiz kurulum ve native sürümler arasında veri koruması NOT TESTED.


Son özellik dalı denetimi [43778995950](https://github.com/kaansavukduran/yksmania/actions/runs/43778995950):832 birim geçti;737 tarayıcı vakasının728’i geçti,9’u başarısız oldu. Sekizinde büyük Lexend yazıda bölünen model metni, birinde kalıcı kayıttan önce kontrol edilen onay kutusu test zamanlaması bulundu. Sayısal modeller, soru/rehber içerikleri ve kullanıcı yazısı değişmeden kısa anlam eşdeğerleri ve kaydın bitişini bekleyen kontrol onarıldı. Son yerel832/832 birim, sekiz sorunlu telefon ve iki deneme yardım akışı PASS. Tam737 ve paket işleri son commit üzerinde yeniden çalıştırılmadan yayına geçilmez; önceki başarısız koşu saklanır.

---

## Önceki yayımlanmış kabul

# 0.16.0 — nihai C7 ürün ve yayın kabulü geçti

60 yeni ünite, 678 bölüm, 1.356 paragraf, 248 çözümlü örnek ve 600 özgün soru: toplam 264 anlatım/236 rehber/264 özet/2.440 soru; ilk 258/479 başlık hazır. Check/610 birim/normal ve prefix derleme PASS. C7 kaynağında özellik dalı ve main CI ayrı ayrı548/548 tarayıcı ve dört paket işi PASS; yayımlanmış kabul548/548 (547 HTTPS+1 yerel Vite), Pages üç iş PASS. Gerçek paketli Windows/Linux yeniden açılış ve 0.15→C7 web güncellemesi geçti.

Önceki yayımlanmış 0.15'in bütün 1.840 sorusu ve 205 ders kaydının soru dışı alanları golden karşılaştırmayla korunur. Özel kaynak 016 ara kontrolündeki 2.140 soru ve 235 kayıt da ayrıca korunur; bu özel ara kayıt ayrı yayımlanmış sürüm değildir. Zaman/keşif/sayfa öğrenme puanı üretmez.

## Nihai yayın kanıtı

Kaynak/tag `bb60dfa4c6463d511085e58fe3124f803b5651c5`. [CI](https://github.com/kaansavukduran/yksmania/actions/runs/43756497076), [canlı kabul](https://github.com/kaansavukduran/yksmania/actions/runs/43756612914), [Pages](https://github.com/kaansavukduran/yksmania/actions/runs/43758617864) ve [paket yayını](https://github.com/kaansavukduran/yksmania/actions/runs/43760024382) aynı kaynakta başarılıdır. Sekiz dosyalı release; Android 0.16.0 / kod 24 / v2. Yedi checksum ve sekiz GitHub asset digest eşleşir; iki küçük kanıt dosyası normal TLS ile indirilip hashlenir. Beş büyük binary yerelde ayrıca indirilmedi. Vercel/Pages üç çalışma dosyasının baytları dondurulmuş C7 ile aynı.

Son C7 kimya değiştiricisi yedi model×iki görünümde14 vaka ve gerçek eski profilden12 yeni model ilk-offline yükseltme ile yerelde geçti; önceki tam yerel C5 koşusu494PASS/1FAIL/2kesilen/51çalışmayan olarak korunur. Tam C7 yerel 548 sonucu iddia edilmez; tam 548 uzak iki worker CI ve canlı akışta geçti. Yerel native/Pages37 aile kanıtı C5 kapsamındadır; C7'nin gerçek paket ve yayımlanmış Pages kapsamı yukarıdaki uzak işlerdir.

Android alpha APK debug imzalıdır. Doğrulama dosyalarında 0.14, 0.15 ve 0.16 sertifikalarının farklı olduğu doğrulandı; bu APK önceki debug kurulumunun üzerine güncellenemez. Eski kurulumu kaldırmadan önce uygulamadaki kişisel ilerleme yedeğini dışa aktar. Kalıcı imza ve sürümler arasında kurulum kabulü sonraki geliştirme işidir. Fiziksel Android/temiz Windows/portable taşıma ve native sürümden native sürüme veri koruyan kurulum NOT TESTED.

## Kanıtlanan onarımlar

- Bugün hazır anlatım sayısı, soru-seti etiketi taşıyan eski kaydı da sayıyordu. Gerçek menü ders toplamıyla karşılaştırılan regresyon ve yalnız anlatım filtresi eklendi.
- Asit-baz eşdeğerliğinde kayan nokta kalanı 75 bağımsız durumda yanlış asit/baz sınıfı veriyordu. Yalnız eşdeğerlikte makine duyarlılığı kullanıldı; gerçek küçük katkı generic pH modelinde korunur. 83.349 tam sayı nötrleşme durumu geçti.
- Yakın cisimden göze gelen ışınlar paralel çiziliyordu. Ortak sonlu kaynak noktası, ayrılan gelen ışın ve kırılma geometrisi düzeltildi; modelin açık eşdeğer ince sistem koşulu korunur.
- KAF/DAF şekillerinin yanal hareket okları aynıydı; gerçek sağ/sol atım geometrisi ayrıldı. Özgün 90 soru değişmedi.
- Türkçe 016/017 SVG yazısı 270 px panelde 9,70 fiziksel px'e iniyordu. Font 40 ile min 16,875 px; iki gerçek fontta 108 görünümde kutu/viewBox içinde, metin kesişimi 0 ve üst–alt iç pay farkı≤1 px. Veriler, dil bağları ve eski 20 soru korunur.
- Yeni fizikte ortak değiştirici karşılaştırma işaretini siliyordu; açık checked değeri korunur. Negatif kuvvet etiketi taşıyordu; grafik kenar payı düzeltildi. Düşey atış t=0 izine gelecekteki tepe ekleniyordu; yalnız gidilmiş yol çizilir. Özgün 50 soru ve fiziksel koordinatlar korunur.

- Ortak anlatım tabloları büyük yazıda sütunları daraltıp “anlam” sözcüğünü ikiye bölüyordu. Dar okuma alanında her hücreye sütun bağlamı taşıyan satır düzeni, genişte normal tablo korunur. Gerçek normal uygulama regresyonu önce FAIL; ilk onarımdan sonra uzun “Halomorfik” terimi Lexend’de 2,26 px yer darlığıyla bölündüğü için yatay iç pay ayrıca düzeltildi. Font 45 px, tablo semantiği, eski kimya ve yeni coğrafya hücreleri, ekran döndürmede tam içerik, iki gerçek font ve axe kontrolü son iki vakada PASS. İlk yanlış test alan etiketi ve önce/sonra başarısız kayıtlar korunur.

İlk native kabul betiği Türkçe kanıtını kullanıcı açmadan çözüm metnini bekliyordu. Gerçek “Kanıtı göster” eylemi iki yeni Türkçe smoke senaryosuna eklendi; çözüm, SVG, kayıt, yeniden açılış ve noXP beklentileri korunur. İlk başarısız log saklanır; bu bir uygulama kusuru olarak etiketlenmez.

Kaynak bileşen QA'sı normal uygulama veya fiziksel cihaz kabulü diye sayılmaz. Önce/sonra kusur kanıtları özel çalışma alanında tutulur. Son tam ürün kapıları tamamlandığında bu başlık gerçek sonuçlarla güncellenecek. Fiziksel Android, temiz Windows kurulumu, portable taşıma ve native sürümleri arasında veri koruyan yükseltme henüz test edilmedi.

---

Geliştirme testinin ilk tam koşusunda ortak Vite bağımlılık önbelleği iki gerçek HTTP504/Outdated Optimize Dep yanıtı verdi. Teste yalnız kendisine ait cacheDir eklendi; assertion ve süreler korunur. İlk Ctrl-C tool kabuğunu kapatsa da alt npm süreçleri çalıştığı için ikinci koşu dört browser worker ile çakıştı. PID ile sınırlandırılmış süreç temizliği sonrasında sıfır canlı test tarayıcısı doğrulandı; aynı eski AYT vakası değişmeyen C5 ile17,6s, sonraki iki worker koşusunda19,8s PASS oldu. İki ilk eksik koşu ayrı korunur (138 PASS/1 FAIL ve79 PASS/1 FAIL; tam kabul değildir).

Gerçek ayrılmış C5 tam koşusu494 PASS/1 FAIL/2kesilen/51çalışmayan olarak bilinçli durduruldu. Atom yarıçapı etkinliğinin45px başlığı “karşılaştırma” sözcüğünü bölüyordu. İlk dar etiket onarımı tek başına yetmedi; son C7'de başlık “Önce kıyas koşulu”, erişilebilir ve görünür seçim etiketi “Örnek türü” oldu. Font, geometri,70soru/74bölüm ve model kayıtları değişmedi. Aynı katı RangeRect beklentili telefon regresyonu5,7s PASS; ortak KimyaB modülünün bütün yedi modeli son derlemeyle14/14 ayrı normal/telefon vakasında geçti. C5durdurulmuş koşusu tam PASS diye sunulmaz. Tam548 kabulü yeni adayda GitHub geliştirme dalında yapılacak; ana yayın öncesi kapıdır.

Son C7 derlemesi ve tam TypeScript kontrolü PASS. Gerçek0.15→C7 web güncellemesi tekrar taze profilde12 yeni modelin ilk çevrimdışı kullanımını, tam eski state/belge/katalog aynılığını,37soruluk eski AYT taslağı ve45soruluk yeni kataloğu,5/5oturumu/üçtekrar/notları/870bayt eski sentetikPDF'yi korudu;XP 25→25. PrefixC7 derlemesi ve son özel-veri/bağımlılık taraması PASS. C5native/Pages37 aile kanıtları önceki C5 artefaktına aittir; son C7'nin tam 548 ve gerçek paket kabulü ayrı GitHub geliştirme dalı kapısında doğrulanacaktır.

## Tarihsel doğrulanmış 0.15 kaydı

# 0.15.0 — yayın ve paket kabulü tamamlandı

Çalışma sırasının 169–198. başlıklarına 30 yeni ünite eklendi: toplam 204 anlatım, 176 ayrıntılı rehber, 204 yerleşik özet ve 1.840 özgün soru. Son uygulama kaynağı `abd6cdded9d809b77ca89fb5918576f22c7de2a5`; ardından yalnız tamamlanmış 0.14 yayın belgeleri birleştirildi. C3 artefaktının 123 dosyası sabittir.

C3 kaynak kontrolü, 478/478 birim testi ve derleme PASS. Son tam tarayıcı koşusu **423/423 PASS**, iki worker ile 18,8 dakika. Test veya assertion çıkarılmadı. Gerçek Electron'da 25 model ailesi, iki eski soru rotası, HTML taslak iptal→tam kayıt aynılığı→onay, çevrimdışı kullanım/yenileme ve aynı profil ile süreç yeniden açılışı PASS; renderer hatası yok. Pages alt yolunda 25 aile ve iki eski soru rotası ilk çevrimdışı kullanım/kayıt/yenileme ile PASS.

Gerçek 0.14→0.15 service-worker güncellemesinin hemen ardından eski state, belge ve katalog birebir aynı kaldı. Eski arayüzde başlatılmış 25 soruluk AYT denemesinin tam soruları, cevabı, bayrağı ve bitiş süresi korunur; yeni katalog ayrı 37 soru gösterir. 5/5 oturum, 17 Kasım/21 Kasım/5 Aralık tekrarları, kontrol edilmiş yanlış soru taslağı, notlar, ayarlar ve 870 bayt sentetik eski PDF korunur; XP 25→25. Altı yeni model ilk kez çevrimdışı açılıp yenilendi. Bekleyen güncelleme, 25/37 ayrımı ve yeni model ekran görüntüleri ayrıca görüldü. Bu web yükseltmesi, iki native sürüm arası test değildir.

## Kanıtlanan kusurlar ve onarımlar

- **YKS-068:** 320 px/UI 200/text 150 görünümünde gerçek 45 px kimya metni, dar iç boşlukta sözcükleri bölüyordu. Görünür ve erişilebilir kontrol etiketi birlikte “İlerleme (%)” oldu; font boyutu ve öğretim korunarak iç yatay boşluk azaltıldı. C1'de yeni DOMRange regresyonu üç FAIL; C2'de aynı üç vaka ve gerçek 50→100 kontrolü dört PASS. Son C3 tam koşuda da geçer. Veri, 120 soru ve keşif anahtarları korunur.
- **YKS-069:** Geliştirme PWA hook'u her render'da yeni updater üretiyor, WebUpdates effect'i tekrar bildirim/render döngüsüne giriyordu. Gerçek Vite menü/tema/ölçek/arama testi önce FAIL, güncel updater ref ile tutulunca PASS. Üretim hook'u zaten sabitti; üretimde aynı döngü var denmez. Bu bir yerel geliştirme regresyonudur, uzaktaki site testi sayılmaz.
- **YKS-070:** Fizikte 390 px telefon şemasındaki 700 birim viewBox, etiketleri 7,24 CSS px'e düşürüyordu. Eşit fiziksel eksen ölçeği ve eski ok koordinatları korunarak duyarlı SVG düzeni onarıldı. Son üç vakada CTM×fontSize≥16 px, SVG sınırları ve eski d/cx/cy/world kontrolleri geçer.
- **Soru öncülü:** “Verilen denkleme göre” başvurusu için gerçek denklem görünür soru kökü/pasajında bulunmalıdır. Yalnız ipucu veya açıklamadaki denklem öncül sayılmaz. Olumlu ve olumsuz regresyonlar geçer.

## Önceki koşuların sınırları

C1'de 477 birim ve yeni 61 tarayıcı vakası PASS idi. Gerçek sözcük kusuru görülünce ilk tam 422 koşu bilinçli durduruldu: 106 PASS, 2 kesilen, 314 çalışmayan. C1 normal uygulamada matematik 12 görünüm, biyoloji 28 görünüm ve dört ek grup, coğrafya 16 görünüm/75 glif kontrastı PASS idi; kimya 48 çalışma kontrolü geçse de sözcük kusuruyla bütün görsel kabul geçmedi. Bunlar son C3 kabulünün yerine yazılmaz.

İlk C3 tam koşuda, dört CPU kotasında eşzamanlı native/SW ve özel tarayıcı sayımları sırasında yük 19 ölçüldü: 82 PASS, 2 zaman aşımı FAIL, 2 kesilen, 337 çalışmayan. Diğer ağır süreçler durdurulunca aynı C3 baytları, assertion'lar ve süre sınırlarıyla aynı iki eski test 12,5 s/3,5 s PASS; ardından tam 423/423 PASS. İlk günlükler korunur, assertion veya zaman sınırı gevşetilmedi.

Özel veri taraması 71 değişen metin yolunda 8.993 özel kimlik ve 9.004 bağlantıyı karşılaştırdı; özel kimlik, ham materyal, binary veya hassas örüntü bulunmadı. 752 bağımlılık kaydı değişmedi. Yayın korumasının güncel 0.15.0/kod 23 için 18 sentetik vakası PASS; eski/yanlış sürüm ve eksik/çoğaltılmış paketler reddedildi.

Fiziksel Android, temiz Windows kurulumu, portable taşıma ve native sürümler arasında veri koruyan yükseltme NOT TESTED.

## Doğrulanmış yayın

Kaynak/tag `3f237c12100a702e09884d65f735de6a3f11db1b`. CI [43734178222](https://github.com/kaansavukduran/yksmania/actions/runs/43734178222) dört iş PASS: 478 birim/423 tarayıcı ve gerçek Windows/Linux paketli çevrimdışı kabul; Android 0.15.0/kod 23/v2 imza. Canlı [43734346767](https://github.com/kaansavukduran/yksmania/actions/runs/43734346767) ikinci denemede 423/423 PASS; Pages [43734349217](https://github.com/kaansavukduran/yksmania/actions/runs/43734349217) üç iş PASS. Yerel, CI ve canlı sonuçlar ayrı kapsamdır.

İlk canlı koşu 422 PASS/1 FAIL idi. Gerçek trace ZIP'i bağlayıcıdan indirilip GitHub özetiyle karşılaştırıldı ve okundu: doğru Kan grupları başlığı/anlatımı görünürken modelin JS/CSS dosyaları ve workbox isteği beş saniyelik kontrolün sonunda henüz yanıt taşımıyordu. Konsol hatası kaydı yoktu; bu, tek başına sunucu veya uygulama kök nedeni kanıtı değildir. Aynı dosyalar normal TLS ile 200 ve dondurulmuş C3 baytlarıyla 0,23–0,27 s'de yeniden alındı. Hiçbir kod, assertion veya süre sınırı değiştirilmeden bütün 423 vaka ikinci denemede geçti. İlk hata ve trace incelemesi korunur.

[0.15 alpha](https://github.com/kaansavukduran/yksmania/releases/tag/v0.15.0-alpha.1), başarılı [43738552491](https://github.com/kaansavukduran/yksmania/actions/runs/43738552491) ile aynı doğrulanmış CI çıktılarından sekiz dosya olarak yayımlandı. Tag ve verified-run kaydı aynı kaynak SHA'sını gösterir. Yedi checksum girdisi, sekiz GitHub asset digest'i ve indirilen iki kanıt dosyasının özeti eşleşti. Beş büyük binary yerelde ayrıca indirilip hashlenmedi. Vercel ve Pages index/sw/version dosyaları normal TLS ile ilgili dondurulmuş C3 çıktılarıyla aynıydı.

Canlı web iş akışının 423 vakası, yayımlanmış HTTPS’ye çalışan 422 vaka ile ayrı gerçek Vite geliştirme sunucusunu başlatan bir YKS-069 regresyonundan oluşur. Yerel geliştirme vakası uzaktaki site denetimi diye sayılmaz.

---

## Tarihsel doğrulanmış 0.14 kaydı

# 0.14.0 — yayın ve paket kabulü tamamlandı

0.14 sürümü, doğrulanmış çalışma sırasının 139–168. başlıklarını kapsar. Önceden
hazır mol ve çarpanlara ayırma anlatımları yeniden sayılmadan 28 yeni etkileşimli
ünite eklendi: 236 bölüm, 479 paragraf, 121 çözümlü örnek, 121 hatırlama ve
280 özgün beş seçenekli soru. Toplam 174 anlatım, 146 ayrıntılı rehber,
174 yerleşik kopya kağıdı ve 1.540 soru; ilk 168/479 başlık anlatım ve soruyla
hazırdır. Eski 1.260 sorunun bütün alanları ve 147 eski dersin soru dışındaki
alanları korunur. Öğrenci PDF veya kaynak yüklemez. Tüm arşivin, tüm 479
başlığın veya son 20 yıllık bütün resmî sınavların tamamlandığı iddia edilmez.

C6 son yerel kabul tamamlandı: kaynak kontrolü, 414/414 birim testi ve derleme
PASS; bütün 361/361 tarayıcı vakası iki worker ile 20,6 dakikada geçti. Test
çıkarılmadı. C6 Pages prefix'inde 19 model ailesi ve iki önceki soru rotası
ilk çevrimdışı kullanım/HTML sonuç/kayıt/reload ile PASS. Gerçek Electron'da
aynı 19 aile, iki soru rotası, aynı profil/süreç yeniden açılışı ve HTML onay
iptal→tam kayıt aynılığı→onay→offline/reload PASS; renderer hatası yok.

Gerçek 0.13→0.14 service-worker güncellemesinde eski sürümün bütün state,
belge ve kataloğu güncellemenin hemen ardından aynı kaldı. Eski 5/5 oturum,
17 Kasım/21 Kasım/5 Aralık tekrarları, kontrol edilmiş yanlış soru taslağı,
notlar ve 870 bayt sentetik eski PDF korundu; XP 25→25. Eski arayüzden
başlatılmış 105 soruluk TYT denemesinin 105 tam sorusu, doğru ilk cevabı,
bayrağı ve bitiş süresi değişmedi; yeni katalog ayrı 110 soru gösterdi.
Altı YENİ 0.14 model bu profilde ilk kez çevrimdışı açıldı ve reload korundu.

Önceki C4 tam koşu 359/360 idi; yeni Basınç ve Rüzgârlar başlığı eski Basınç
özet seçicisini belirsiz yapmıştı. Tam düğme adı düzeltildi; C6'da geçti.
Coğrafya 120 karakter gerekçe ve gerçek 1800 yazımının 4000'e kırpılmaması
regresyonları final kaynakta geçti. Türkçe altı kişi tablosu ve -ken ayrımı
normal uygulamada ayrıca doğrulandı. İlk masaüstü denemesinin eksik runtime
yolu ve yükseltmenin meşgul sabit portu test ortamı hatalarıydı; gerçek C4
Electron runtime'ı ve dinamik boş portla temiz profilde tekrar geçildi. İlk
loglar saklanır. Bunlar gizlenmiş uygulama hatası veya test azaltma değildir.

Önceki C3 matematik/fizik 32 görünüm ve 12 sınır dalı, kimya/biyoloji 48
görünüm; C4 coğrafya 28 görünüm ve 48 glif ölçümü ayrı kapsamlarda PASS idi.
Glif kontrastının en düşüğü 5,967 idi. Bu önceki görsel sonuçlar C6
tam tarayıcı kabulü veya fiziksel cihaz testiyle eşitlenmez.

Özel veri taraması 65 değişen metin yolunu, eski 8.845 ve canlı metadata'yla
8.959 özel kimlik/bağlantıyı kontrol etti; özel kimlik, ham PDF/binary veya
secret örüntüsü bulunmadı. 752 bağımlılık kaydı değişmedi. Sürüm/paket
korumasının 18 sentetik vakası PASS. Uzak kabul sonuçları aşağıdadır.
Fiziksel Android, temiz Windows kurulum, portable taşıma ve iki native sürüm
arasında veri koruyan yükseltme NOT TESTED.

## İlk canlı koşu: soğuk önbellek önkoşulu

İlk uzak c110f215 kaynağında CI dört iş (414 birim/361 tarayıcı) ve Pages üç
iş PASS; canlı web 360/361 idi. Eski periyodik karşılaştırma testi, service
worker hazır ve sayfayı kontrol ediyor olmadan ağı kapatıyordu; reload
ERR_INTERNET_DISCONNECTED verdi. Aynı değişmeyen C6 uygulamasıyla sw.js
yanıtı 20 saniye geciktirilince hata yeniden üretildi. Test gerçek
serviceWorker.ready, controllerchange ve activated durumunu beklediğinde
bütün eski çevrimdışı/model/kayıt asserleri geçti; normal preview odaklı 2/2
ve kaynak kontrolü PASS. Test veya assertion çıkarılmadı; uygulama kodu ve
111 çıktı dosyasının baytları değişmedi. Son aynı-SHA CI/Pages/canlı kapıları geçti.
Uzak trace indirilemediği için trace görüldü denmedi; iş logu ve gerçek
önce/sonra tarayıcı kanıtı kullanıldı.

## Doğrulanmış yayın

Kaynak `6c888e66cb81a0594264784cb760f22bed3c2dc3`. [CI 43730467669](https://github.com/kaansavukduran/yksmania/actions/runs/43730467669)
dört iş PASS: kaynak/derleme, 414 birim, 361/361 tarayıcı; gerçek Windows ve
Linux paketleriyle çevrimdışı kullanım, kayıt, aynı profil onayı ve yeniden
açılış; Android paket ve imza kontrolü. [Canlı Vercel 43730808569](https://github.com/kaansavukduran/yksmania/actions/runs/43730808569)
361/361 PASS; tam tarayıcı koşuları iki worker ile yapıldı.
[Pages 43730804858](https://github.com/kaansavukduran/yksmania/actions/runs/43730804858)
derleme, dağıtım ve gerçek HTTPS kabulü üç iş PASS. Her iki yayının index.html,
sw.js ve version.json dosyaları normal TLS ile donmuş yerel karşılıklarına
bayt eşittir; Vercel doğru kaynakla READY durumundadır.

[Release 43732075907](https://github.com/kaansavukduran/yksmania/actions/runs/43732075907)
PASS; [v0.14.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.14.0-alpha.1)
sekiz dosyayla yayımlandı, taslak değil. Tag ve verified-run aynı kaynak ve
başarılı CI'ı gösterir. SHA256SUMS.txt yedi dosya listeler; normal TLS ile
indirilen verified-run ve Android-verification dosyalarının iki hash'i
listeyle eşleşir. GitHub'ın sekiz varlık digest'i de karşılaştırıldı. Android
paketi com.fragaria.yksmania, sürüm 0.14.0, sürüm kodu 22; v2 imzası PASS.
Beş büyük paket dosyası ayrıca yerelde indirilip hash'lenmedi.

---

## Tarihsel doğrulanmış 0.13 yayını

# 0.13.0 yayını doğrulandı

Kaynak `ba8f553cbf8dff2dae985921096378ccd5908503`. CI [43715126173](https://github.com/kaansavukduran/yksmania/actions/runs/43715126173)
dört iş PASS: 355 birim, 303/303 tarayıcı; gerçek Windows/Linux paketleriyle
çevrimdışı/yeniden açılış/onay kabulü; Android 0.13.0 (sürüm kodu 21), v 2 imza doğrulaması.
Canlı Vercel [43715186079](https://github.com/kaansavukduran/yksmania/actions/runs/43715186079)
303/303 PASS. Pages [43715151603](https://github.com/kaansavukduran/yksmania/actions/runs/43715151603)
derleme/dağıtım/canlı kabulü üç iş PASS; 13 korunan model ailesi ve iki yeni
soru rotası ilk kez çevrimdışı açıldı, gerçek model/yanıt/açıklama/reload korundu;
renderer 0. Her iki HTTPS kökeninde index/sw/version normal TLS ile yerel
karşılıklarına byte eşit. Kökenler ayrı ilerleme saklar.

Release [43716979510](https://github.com/kaansavukduran/yksmania/actions/runs/43716979510)
PASS; [v0.13.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.13.0-alpha.1) sekiz dosyayla yayımlandı, taslak değil.
Tag ve verified-run kaynak SHA’sı yukarıdaki commit’tir. SHA 256 SUMS.txt yedi dosya
listeler; indirilen verified-run/Android-verification dosyalarının iki hash’i
eşleşir. Android paket kimliği com.fragaria.yksmania, sürüm 0.13.0 (sürüm kodu 21),
v 2 imza PASS. Beş büyük paket dosyası ayrıca yerelde indirilip hash’lenmedi.

Bu sürüm yeni anlatım ünitesi eklemez: 13 mevcut anlatıma 130 özgün soru;
toplam 146 anlatım/118 rehber/146 kağıt/1.260 soru, ilk 138/479 hem anlatım hem
soru hazır. Hazır 146 anlatımın tamamı bağımsız soruludur. Eski 1.130 sorunun tam
kayıtları ve 147 dersin soru dışındaki bütün alanları korunur. Bütün arşiv veya
479 başlığın tamamlandığı iddiası yoktur.

Yerel tam koşu 302/303, eski sorusuz cebir arama beklentisinden FAIL idi;
onarım ve dört onay kabulü birlikte 5/5 PASS. Son uzak 303/303 sonuçları aynı
onarılmış kaynakta PASS; yerel tam 303 koşusu yapılmış sayılmaz. İlk Pages uzak
FAIL ve yeniden üretilemeyen eski yerel PASS kaydı aşağıda korunur. Düzeltilmiş
HTML onay betiği kaynak tekrar derlenmiş prefix’te ve canlı Pages’te geçti.

Son gerçek 0.12→0.13 web güncellemesi bütün eski state/doküman/kataloğu,
5/5 oturumu, üç özgün tekrarı, kontrol edilmiş yanlış taslağı, notları ve 870 bayt
sentetik PDF’yi korudu; XP 25→25. Altı KORUNAN 0.12 model ilk kez offline açılıp
reload kaldı; bunlar yeni 0.13 üniteleri değildir. Aynı süreç/profil geliştirme
Electron’da iptal→tam kayıt aynılığı→açık onay→yeni soru→offline/reload PASS.

Fiziksel Android, temiz Windows kurulumu, portable taşıma ve iki native sürüm
arasında veri koruyan yükseltme NOT TESTED. Windows dosyaları Authenticode
imzasız, Android paket debug imzalı alpha’dır. Önceki kişisel dosyalar görünmeden
korunur; öğrenci hiçbir ders PDF’si veya kaynak yüklemez.

---

# 0.13.0 tarihsel yerel kabul kaydı

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
9 doğru/1 yanlış sonuç, öğrenme gününden +2/+6/+20 tekrar ve 320 px
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
yeniden açık onay, çevrimdışı yeniden yükleme, odak, 320 px/UI %200/yazı %150
ve erişilebilirliği sınar. Genel listelemede 23 dosyada 303 vaka vardır;
son tam yerel koşu 302/303 PASS oldu. Tek başarısızlık yeni denklemler
bankasını hâlâ sorusuz sayan eski arama beklentisiydi. Yeni bankanın tek
kart/10 soru gösterildiğini doğrulayan onarım ve dört onay vakası birlikte
5/5 PASS (19,6 sn). Yerel tam 303/303 koşusu yapıldığı söylenmez.

Son Pages alt yol derlemesi PASS. Geliştirme Electron’da aynı süreç/profilde
kontrol edilmiş yanlış taslak ve notla iptal → bütün state aynılığı → yeniden
açık onay → yeni soru → çevrimdışı reload PASS; renderer 0. Native API stub
kullanılmadı; iki gerçek HTML onay ekranı görüntüden incelendi.

Son web derlemesinde gerçek 0.12→0.13 service worker güncellemesi PASS: bütün
eski state/doküman/katalog aynılığı; eski 5/5 oturum, üç tekrar, kontrol edilmiş
yanlış taslak, not ve 870 bayt sentetik PDF korunur. XP 25→25; altı KORUNAN
0.12 model ilk kez çevrimdışı açılıp reload kaldı. Bunlar 0.13 yeni üniteleri
veya native/fiziksel yükseltme değildir. 0.13 uzak CI/yayın/paket kabulü bu
yerel sonuçlardan çıkarılmaz.

Pages ilk uzak kabulü 43714489303, temel soru geçişinde testin kaldırılmış
native onayı beklemesi nedeniyle FAIL oldu. Uygulama HTML onayı gösteriyordu;
betik gerçek pencereyi açıp onay öncesi bütün kaydın aynılığını ve görünür
“Yeni çalışmayı aç” eylemini doğrulayacak şekilde düzeltildi. Eski yerel PASS
raporu aynı akışla yeniden üretilemediği için son kabul kanıtından çıkarıldı.
Kaynak tekrar ayrı prefix dizinine derlendi; 99 dosyanın tamamı eski prefix ile
byte eşitti. Eski betik yeni prefix'te de aynı hatayı üretti; yalnız test
beklentisi onarıldı, uygulama/soru verisi değişmedi. Yeni yerel Pages kabulü PASS; HTML onaydan sonra her iki yeni banka ilk kez
çevrimdışı açıldı, yanıt/geri bildirim/reload ve bütün eski akışlar korundu.
Uzak tekrarlar bu düzeltilmiş betikle ayrı kaydedilir. İlk CI/canlı koşuları,
nihai aynı kaynakta tekrar için iptal edildi; tamamlanmış kabul sayılmaz.

Fiziksel Android, temiz Windows kurulumu, portable taşıma ve iki native sürüm
arasında veri koruyan yükseltme ayrıca doğrulanmalıdır. Kaynak ve bağımsız
inceleme sınırları SOURCE_REVIEW’da; ilk başarısız denemeler FORGE’dedir.

---

# 0.12.0 doğrulanmış web ve paket yayını

Kaynak 3104da161845175930a7d51d1f9ee1a2ce724b9d. CI 43709394878 dört iş PASS:
351 birim, 273 tarayıcı, Windows/Linux paketli çevrimdışı/yeniden açılış ve Android
0.12.0/code 20/v 2 imza. Canlı 43709747100 gerçek Vercel HTTPS’de 273/273 PASS
(17,3 dk). Normal TLS runtime hash’leri donmuş C 2 ile eşittir. Pages 43709749730
üç iş PASS: derleme/dağıtım/gerçek HTTPS’de 13 model ailesi, ilk çevrimdışı kullanım,
değişim, kayıt, yeniden yükleme, soru ve mobil gezinme. Release 43711058866 PASS:
v 0.12.0-alpha.1 sekiz dosya; tag/verified-run 3104 da 1, iki indirilen kanıt hash’i
PASS, yedi payload listeli. Beş büyük binary ayrıca yerelde hash’lenmedi.

Yerel check/build/351 birim/273 tarayıcı PASS (21 dk). İki 120 durum ve son 88
görünüm ölçümü; 30 ünitede 45 px sözcük sarma ve seçilmiş gerçek görüntü incelemeleri
yapıldı. Atom/iyon sembolleri üç tema × üç model × 12 ölçümde en az 5,381:1
kontrastla ve dokuz gerçek görüntüden denetlendi. Geliştirme Electron ve yerel
Pages C 2’de PASS. Gerçek 0.11→0.12 SW güncellemesi bütün eski state/documents/
catalogue, skor/not/taslak/ayar/üç tekrar/870 bayt sentetik PDF’i korudu; XP 25→25.
Altı yeni model ilk kez çevrimdışı açıldı, değişti ve kaydı kaldı; renderer/ağ hatası 0.

İlk 342/343, 347/351 ve 269/272 yerel/ilk CI/canlı hatalarıyla YKS-052–066
onarımları FORGE’de korunur. Son 351/273/273 aynı düzeltilmiş kaynakta PASS.
Font testinde eylem ve küçük açıklama rolleri ayrıldı; ölçek/sözcük sınırı korunur.
Gerçek kaynak okuma ve öğretim kapsamı SOURCE_REVIEW’dedir.

Fiziksel Android, temiz Windows kurulumu, portable taşıma ve iki native sürümle
veri koruyan yükseltme NOT TESTED. Tam kaynak arşivi ve resmî TYT/AYT dağılımı
bitmedi: 146 anlatım/118 rehber/146 kağıt/1130 soru; ilk 138 anlatım hazır.

# 0.11.0 doğrulanmış web ve paket yayını

Kaynak 3cd370beb1f7dd96cd9866508c58c96444e5bce5. CI43699042962 dört iş
PASS: 279 unit, 204 browser, Windows/Linux gerçek paketli çevrimdışı/yeniden
açılış akışları renderer 0, Android build/imza/metadata. Canlı 43699042930
204/204 PASS (14,3 dk). Vercel normal TLS runtime hash eşitliği PASS.
Pages 43700388975 build/deploy/canlı-HTTPS kabulü üç iş PASS; gerçek alt yolda
yedi yeni aile ilk çevrimdışı model/kayıt/reload, soru açıklaması ve mobil
gezinme denetlendi. Yerel Chromium'un sertifika otoritesi hatası güvenlik
kontrolü kapatılmadan GitHub runner'da gerçek URL kabulüyle çözümlendi.

Release 43700509433 PASS; v 0.11.0-alpha.1 sekiz dosya, draft değil. Tag ve
verified-run aynı 3 cd 370 b; iki indirilen kanıt hash'i, Android 0.11.0/code 19/v 2
PASS. Beş büyük binary ayrıca yerelde hash'lenmedi. Fiziksel cihaz, temiz
kurulum, portable taşıma ve iki native sürüm yükseltmesi NOT TESTED.
İlk CI 203/204, hedef sayfayı beklemeyen eski not ölçüm testiydi; hedef panel ve
notun görünürlüğü beklendi, geometri/taşma sınırı değişmedi. Son tam 204 PASS.
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
check/build,192 unit,142 browser (6,7 dk),Windows/Linux/Android. Canlı
43635597330 ayrıca 142/142 PASS (7,6 dk). Vercel production READY,0.10.0;
normalTLS üçruntimehash'i yerel/canlı birebir eşit. Release 43636719923 PASS,
v 0.10.0-alpha.1 draft değil,8 asset; kaynak/tag/verified-run aynı 22872 a 2.
İndirilen iki kanıt hash'i eşleşti;7 payload listesi. Android 0.10.0/code 18/v 2
signature PASS. Beş büyük binary ayrıca yerelde hash'lenmedi.

Yerel 192 unit ve tam 142 browser (9,7 dk); son 3 UIyamasından sonra aynı 192 unit,
check/build ve 41 ilgili browser tekrarPASS (2,8 dk). Yeni 41 test tüm 20 ünitede
normalgiriş→gerçek değişen SVG/HTMLdiyagram→sonuç→not→offline reload→ilk
özgün soru/feedback→taslak reload akışını ve noXP/learning eşitliğini denetler.
320 pxUI 200/text 150/reducedmotion/touch/HTMLsonuç/axe ve uniqueID koşulları
korunur. TürkçeHTMLdiyagramını SVG sanan 3, sıfatdönüşümsırasınıkaçıran 1 ve
r 0 ikiuçsayımınıvarsayan 2 ilk harnessFAIL düzeltildi; sonuç/timeout/bounds
gevşetilmedi. YKS 032–042 kanıtları ve onarımlar FORGE'de korunur.

127 manuel ölçüm+12 bağımsız kimya durumu; son 4 model 16 durumda gerçek labeltap,
vektörikon ve 12/x boşluğu ayrıcaPASS. Kök tüm 72 dosyanın final iki kopyayla
byte eşitliğini doğruladı. Son 0.9.2→0.10 gerçek yerel webSWupdate tam eski
state/documents/catalogue eşitliği,checkedtaslak/not/üçreview ve sentetik
870 baytPDFkoruma ilePASS. Üç yenimodelilkkezofflineaçıldı/reloadkorundu,
XP 25→25,renderer 0. Bu production profilinde veya native sürümlerle geçiş değil.

Geliştirme Electron ve gerçek paketli Windows/Linux'ta altı yeni model
ailesi/offline/reload+eski akışlarPASS,renderer 0. İlk yerel runtimefetch
başarısızlığı pinned 45.3.2 checksum ile doğrulanmış mevcutcache'le aşıldı.
Webtestleri Chromium'dur; Firefox/WebKit/Edge/Safari marka/cihaz kombinasyonları,
fiziksel Android,temiz Windows kurulumu/portable taşıma ve iki native sürümle
veri koruyan güncelleme NOT TESTED. Emülasyon fiziksel cihaz sayılmaz.

Gizlilik 49 metinyolu/8845 bilinenözelID+URL karşılaştırmasında 0 eşleşme;
özelPDF/binary/anahtar yok. Kilit yalnız iki kök sürüm alanında değişti;
bağımlılık/marka/Aionvarlıkları aynı. Son teslimdoccommit yalnız 5 belge değiştirir.

# 0.9.2 kabul kaydı

Kaynak9825e32960a712c81dcb6861c7386189d7a8d2ae Vercel production READY;
normalTLS version 0.9.2 ve index/sw/version yerel/canlı SHA 256 eşitliği PASS.
CI 43627576911 verify 126 unit/101 browser PASS (5,1 dk); canlı 43627628221
aynı 9825 e 32 kaynağında 101/101 PASS (5,7 dk). CI 43627576911 dört iş de PASS;
paketli Windows/Linux offline/yeniden başlatma/deneme/timer/reset mevcut smoke
akışları PASS, rendererErrors 0. Android build ve imza/manifest komutları PASS.
Release 43628665935 PASS; v 0.9.2-alpha.1 draft değil,8 asset. Beş binary
başarılı 43627576911 koşusundan yeniden derlenmeden yayımlandı. Tag ve
verified-run aynı 9825 e 32; indirilen iki kanıt hash'i eşit,7 payload listesi.
Android 0.9.2/code 17/v 2 signature PASS; beş büyük binary ayrıca yerelde
hash'lenmedi. Fiziksel Android/temiz kurulum/portable taşıma ve iki native
sürümle yükseltme NOT TESTED. Kapsamda açık doğrulanmış kusur yok.

Ayrı yerel origin/profilde gerçek 0.9.1→0.9.2 SW update PASS: eski build
normalTLS/hash/revision ile doğrulandı; uygulamanın gerçek update düğmesi
kullanıldı. Eski nükleik kimlik/not/tamamlanma, soru taslağı, öğrenme+üç tekrar,
ayarlar ve sentetik legacy 870 bayt PDF/not/sayfa tam korundu. Yeni DNA/RNA
modeli ilk kez offline açıldı,16 H bağı/not/keşif reload kalıcı, XP 25→25,
renderer 0. Yalnız eski belge koşulu IDB'ye seed edildi; yeni gerçek özel PDF yok.
Bu web/yerel origin kabulüdür; fiziksel/native veya production profil geçişi değil.

Altı kaynaklı atölye:62 açıklama bölümü,31 çözümlü örnek,29 recall ve 60 yeni
özgün soru. Önceki 240 soru değişmezliği ve ilk 58 çalışma başlığı sürekliliği
birim kabulüne eklendi. check/build ve 126 birim PASS; son browser/yayın
sonuçları bu bölümün başında. İlk hedefli 12 test 11 PASS;
ısıdaki gerçek 320 px iç taşma YKS-030 olarak korundu ve onarıldı.

Yerel tam 101/101 browser PASS (6,8 dk). Son scoped düğme boşluğu ve sürüm notu
derlemesinde check/build,126 unit ve 12/12 yeni kaynak testi PASS (55,3 s).
Kelime genişliği regresyonu font 45 px korunurken PASS; kabul sınırı gevşetilmedi.
Son kaynağın temiz CI tam 101, canlı 101 ve dört paket/verify işi yukarıda PASS.

Son derleme kopyasında 17 manuel ölçüm ve gerçek düğme etkinleştirmesi PASS,
renderer 0.320 px büyük yazıda ısı 270/270; tahmin metin alanı 222 px, en uzun
kelime 202,54 px, font 45 px.44 yol/8.845 özel kimlik+URL gizlilik kontrolü PASS;
752 bağımlılık kaydı değişmedi. Son kaynak/doküman kanıtları FORGE’de.

- YKS-030/Düşük: ısı range UA marjı client 270/scroll 272; scoped margin 0 ile
  270/270. Belge 320 px, UI 200/text 150, font ve tolerans aynı kalır.
- YKS-031/Düşük: Lewis reset ve ısı eylemlerindeki yerel çıplak düğmeler ortak
  stile alındı. Tahmin düğmesinin yatay boşluğu büyük yazıda kelimelerin bütün
  kalmasını sağlar;45 px metin küçültülmez. Reset gerçek adım 4→1 değiştirir.

Otuz gerçek görünüm/durum incelendi. Temel bilimsel sonuçlar görsel yanında
normal HTML olarak verilir. Seçimler ve notlar çevrimdışı saklanır; model
etkileşimi öğrenme/XP/tamamlanma oluşturmaz. Yeni sorular kendi köklerindeki
bilgiyle çözülebilir. Kaynak sınırları SOURCE_REVIEW, geçmiş kusurlar FORGE’de.
Paket/ci/canlı kabulü fiziksel cihaz veya native sürüm geçişi yerine sayılmaz.

# 0.9.1 son teslim kabulü

Paket e 1 b 8150 / CI 43622440349:96 unit,89 browser,Win/Linux/Android dört iş PASS.
Son ölçüm kaynağı cc 88 e 28 / public 43623257610:89/89 PASS,5,2 dk. Ek CI 43623231137
verify 96/89 PASS. Aradaki fark yalnız test ve kayıt; uygulama dosyaları aynıdır.
İlk iki public 88/89 ve ilk CI 88/89, save-onayı ve ayrı rect örnekleme hataları
FORGE’de saklanır. Son iki onarım kabul sınırını veya timeout’u değiştirmez.
Production 0.9.1 READY, üç runtime hash’i eşit; release 43623370247 sekiz asset
ile yayımlandı, Android code 16/v 2 ve indirilen iki kanıt hash’i PASS.
Beş büyük binary ayrıca indirilmedi. Fiziksel cihaz/temiz kurulum/portable taşıma
ve iki native sürümle yükseltme NOT TESTED. Kaynak sayfaları SOURCE_REVIEW’dedir.

# 0.9.1 yerel kabul

Başlangıç cfe 0 db 0 + çalışma diff’i: check/build,96/96 unit,89/89 browser PASS
(5,5 dk). Dört yeni kaynaklı dersin normal giriş/gerekçe/gerçek SVG değişimi,
offline kalıcılık ve 320 px UI 200/text 150/reduced-motion/axe iki yeni kabulü PASS.
390/1440 px gerçek görseller incelendi. Eski paragraf/TODAY/tekrar/timer/reset ve
sınav regressions PASS. Bağımlılıklar eski kayıtlarla birebir aynı; kilitte yalnız
iki kök sürüm alanı 0.9.1 oldu. Yeni sorular 5 seçenekli, kendi kökleriyle çözülür;
kimya branş havuzuna katılır. Öğrenci kaydı/XP keşif ile değiştirilmez.
Kaynak sınırları SOURCE_REVIEW; dağıtım/paket sonucu FORGE başına eklenecek.

# Quality evidence

## 0.9.0 paket kabulü / canlı dağıtım

Published web 43613106471, normal production HTTPS:87/87 PASS (5,0 dk).
Test kaynağı eb 188 d 6 ve uygulama/paket b 92 b 2 b 5 arasındaki fark yalnız teslim
dokümanlarıdır. Yerel 87/CI 87/public 87 ayrı PASS; runtime hash eşitliği korunur.

Son production Vercel dpl_HVAerBa 5 W 5 bAocHakgZqKwM 5 e 6 X 6/da 4 c 2 ec READY,
HTTPS version 0.9.0. Üç runtime hash'i kabul edilen yerel derlemeyle eşit;
önceki manuel kota hatasından sonra GitHub bağlantılı dağıtım gerçekleşti.
Yeni canlı 87 test 43613106471 PASS.

Release 43612877695 PASS, v 0.9.0-alpha.1 draft değil;8 asset yayımlandı.
Tag/verified-run doğru b 92 b 2 b 5 başarılı CI 43611757852 kaynağı; indirilen iki
kanıt hash'i eşleşti, checksum listesi 7 payload. Android code 15/name 0.9.0/v 2 PASS.
Beş büyük binary ayrıca yerelde hash'lenmedi. Son canlı version.json 0.9.0;
Vercel READY, yeni canlı kabul yukarıda ayrı izlenir.

Kaynak b92b2b52be5f5a08b9238b565f73b6998481b65a; CI43611757852 dört iş PASS.
Temiz npm ci/check/build,94 birim ve 87 browser (4,2 dk). Windows/Linux gerçek
paketli süreçte offline ders/not/kağıt/soru, exam deadline/sonuç, timer ve reset
PASS; renderer 0. Android üretim ve signature/manifest komutları PASS.
YKS-023–029 ve önceki ilgili regresyonlar PASS. Fiziksel cihaz/temiz kurulum,
portable taşıma/native sürümlerle güncelleme NOT TESTED.

Gerçek 0.8→0.9 yerel web SW update PASS: önceki kabul hash'leriyle doğrulanan
eski build ve kabul edilmiş yeni build, uygulamanın Settings update düğmesi.
Taslak/not/ayarlar/öğrenme kayıtları/PDF baytları tam korundu; yeni kağıt ilk
kez offline açıldı, reload ve paragraf devam PASS, renderer 0. Bu üretim veya
native-paket geçişi değildir; önkoşul NOT TESTED kaydının yerini aldı.

İlk manuel Vercel talebi API 402 günlük 100 deploy kotası/retry 86400 s verdi;
yerel CLI alternatifi yoktu. İlk 0.8.0/BLOCKED kaydı, sonraki GitHub dağıtımı
READY ve gerçek 0.9.0/hash kontrolüyle güncellendi. Tam zaman çizgisi FORGE'de.

## 0.9.0 son yerel kabul

**YKS-029/Kritik/package-lock:** ilk uzak CI 43611497875 temiz kurulumda
source-map-0.9.0 HTTP 404. Uygulama sürüm etiketi değişimi iki dependency sürümüne
ve üç sürüm aralığına taşmıştı. Tüm ortak dependency kayıtları doğrulanmış tabana
geri alındı; PDF.js kaldırılması ve kök uygulama 0.9.0 korunur. Ayrı boş cache ile
npm ci PASS (680 paket/16 s); son check/unit/build ve yeni uzak paket koşusu gerekir.

check/build,94/94 birim ve 87/87 Chromium tarayıcı PASS;87 test 5,5 dk’da çalıştı.
YKS-023–028 ve önceki ilgili regresyonlar PASS. Ayrı exam 4/4 ve son Electron
offline/restart/deadline/sonuç/reset akışı PASS; rendererErrors 0. Normal/büyük
yazı ve iki temada 320/844/1440 px sınırları gerçek görüntü ve DOM ile kontrol edildi.
16 erişilebilir rotada akademik yükleme kontrolü yok. Altı yeni React bileşeni
kaynak incelemesinde yeni kusur bulunmadı. Gizlilik/diff kontrolü PASS.
İlk son-kabul başlatmasında kurulu Chromium yolu verilmediği için testler tarayıcıyı
açamadı; ortam ayarı düzeltilerek aynı 87 testin tamamı geçti. CI/canlı/paket sonuçları
FORGE başındaki güncel yayın kaydında ayrıca belirtilecektir. Fiziksel Android,
temiz Windows kurulumu/portable taşıma ve iki native sürümle yükseltme NOT TESTED.

İlk uzak CI 43600766700 verify 72 unit/73 browser PASS; yeni native timer testinde
19:… beklenirken 20:00 okundu. Gerçek azalmayı ve pause kayıt sonucunu bekleme,
kayıtlı deadline’ın süreçler arasında tam eşitliği eklendi; yerel tekrar PASS.
İlk public 43600807364:72/73, ilk offline PDF canvas 30 s süre aşımı; yeni public
iz kaydıyla tekrar çalıştırılır, neden henüz geçici ağ diye sınıflandırılmaz.

0.8.0 son yerel kabul:72 unit, check/build,73/73 Chromium PASS. İki yeni
kusur YKS-021/022 aynı koşullarda PASS; diğer önceki regresyonlar korunur.
Geliştirme Electron yeniden başlatma/offline/kum saati/reset PASS, renderer 0.
Güncel yayın/paket/canlı sonuçları FORGE başında ayrıca gösterilecektir.

0.8.0 teslim kaynağı b08c9c1: [CI43601785473](https://github.com/kaansavukduran/yksmania/actions/runs/43601785473)
72 unit/73 browser ve dört iş PASS. Paketli Windows/Linux offline, yeniden
başlatma, kayıtlı timer son zamanı/pause/reset PASS; rendererErrors 0.
[Public43601821513](https://github.com/kaansavukduran/yksmania/actions/runs/43601821513)
73/73 PASS; ilk offline PDF 11,1 s. İlk 72/73 koşusundaki PDF 30 s tekrarlanmadı;
PDF kodu ve test timeout'u değiştirilmedi, ilk sonuç kayıtta korunur.
Release 43602680263 v 0.8.0-alpha.1'i 8 asset ile yayımladı. Android code 14/name 0.8.0
v 2 imza ve indirilen iki kanıt hash'i doğrulandı. Beş büyük binary yerelde
ayrıca hash'lenmedi; verified-run doğru başarılı main kaynağını gösterir.
YKS-021/022 ve ilgili önceki regresyonlar PASS; açık doğrulanmış kusur yok.
Fiziksel cihaz/temiz kurulum/portable taşıma/native yükseltme NOT TESTED.
Gerçek iki web build'iyle 0.5.3→0.8.0 veri koruma ayrı PASS. Tam iz FORGE başında.

## 0.9.0 — kullanıcı materyal yüklemeden öğretim ve deneme

Hedef başlangıçead 659 b + yerel diff. Yeni ürün kararıyla akademik PDF/katalog
UI testleri hazır kağıt/yerleşik model/gerçek soru/offline kayıt testlerine
çevrildi; eski dosya baytları ve notlar IDB üzerinden korunur. Kayıt yedeği
ithali isteğe bağlıdır, ders sağlamanın önkoşulu değildir.94 unit/check/build
ilk PASS. İlk tam 85 testte 79 PASS,6 FAIL; test seçicileri ve aşağıdaki taşma
nedenleri ayrıldı, ilk sonuçlar saklandı. Son tam sonucun yeri FORGE başıdır.

- YKS-023/Orta/Exams:320 px UI 200 text 150 uzun başlık belge 325 px.
- YKS-024/Orta/shared dialogs: UAmaxwidth 224 px, içerik 309/321 px; yazar maxwidth
  ve copywrap ile 288/286 px, tanı yatay taşma 0. Reset de aynı kusurdan etkileniyordu.
- YKS-025/Orta/Exams: iki saatlik sayaç+ikon belge 331 px; satırlar ve kontrollü
  saat ayırma ile 320 px. Font boyutu veya erişilebilir süre metni küçültülmez.

Aynı gerçek giriş/bounds/activation/failure/offline/reset denetimleri final build'de
tekrarlanacak.87 test toplanır: yeni clock/dialog/reset büyük yazı dokunmatik ve
yatay erişim, gerçek 5/10 soru kaydı, sekiz derinleştirilmiş model, sözcük parçaları,
kanıt atölyesi ve deneme cevap/flag/net/expires/missingdata/failedwrite/recovery.
Aion 32 kare/zemin/pointer, Today son gerçek skor, 1/3/7/21 ve özerk ayarlar korunur.
Yerel geliştirmeElectron offline+exam snapshot/deadline/restart/reset ilk PASS;
gerçek paket/CI/canlı sonuçları ayrı kaydedilir. Fiziksel Android ve temiz kurulum
bu yerel/emüle testlerin yerine sayılmaz. Kaynak okuma/fiziksel sınırlar FORGE'de.


Sonraki tam kabul 85/86: tablo klavye odağı YKS-028/Orta bulundu; adlandırılmış
focusableregion ve gerçek ArrowRight→scrollLeft>0 koşulu eklendi. YKS-026/Orta
yeni elektrik alan metnindeki F'yi elektriksel kuvvet diye netleştirir;
YKS-027/Düşük soru-only/boş-bank içeriklerin yanlış arama kartını engeller,
aynı hedefli test onarım öncesi FAIL. Son tam build testleri buna göre tekrarlanır.

## 0.8.0 — kalıcı kum saati, güvenli sıfırlama ve eski web istemcisi

Başlangıç main `7cfb5b7c0287f0a0d4730c5ce3b4c3792797a206` + çalışma diff'i.
72 unit, ilk odaklı 7/7 browser PASS. Gerçek 0.5.3 → 0.8.0 service-worker
uygulaması yarım yanıtı/notu korudu, offline yeniden açıldı; rendererErrors 0.
Fallback padding 1→33 px; bu mevcut YKS-016'nın eski istemci regresyon kontrolü.
TYT/AYT kökleri yukarıda (YKS-010), paragraf beş soruda tam metin (YKS-015),
Today skor ve tekrar ilişkileri mevcut kabulde korunur. Yeni doğrudan güncelleme
düğmesi kayıt bitmeden etkinleşmez. Kullanıcının 0.5.2 cihazına bağlanılmadı.

**YKS-021 / Orta / StudyTimer + style.css:** Yeni süre paneli 320 px ve
UI%200/yazı%150 açık temada dakika sözcüğünü harf harf kırıyordu. Menüye
normal dokunmatik giriş ve gerçek görüntüde gözlendi; başlangıç ölçümü 41 px
kullanılabilir genişlik < 130,08 px sözcük genişliği, FAIL. Sütun sayısı gerçek
metin alanına göre uyarlanır, rem kenar boşluğu piksel sınırına çekilir;
fontlar korunur. Aynı ölçüm ve ciddi/kritik axe, yatay/dikey/offline kayıt
regresyonları son teslimde ayrıca raporlanır. Taşma kontrolü tek başına yeterli
olmadığı için okunabilir sözcük alanı kabulü eklendi.

**YKS-022 / Orta / ResetProgress + style.css:** Yeni sıfırla düğmesi 320 px,
UI%200/yazı%150 Ayarlar'da sağ sınır 346,13 px ve belge genişliği 346 px yaptı.
Mevcut planning dar-ekran regresyonu FAIL; tek taşan öğe DOM ile doğrulandı.
Dekoratif ikon kaldırıldı, düğme ve yatay boşluğu kart genişliğiyle sınırlandı;
ölçekler korunur. Aynı mevcut test son sürümde tekrar çalıştırılır.

Son yerel onarım: YKS-021 için alan 248 px >= sözcük 130,08 px, root 32 px ve
text-scale 1,5 korunur. YKS-022 için belge 320 px, taşan öğe 0; iki aynı regresyon
2/2 PASS. İkinci tam kabul 72/73; yeni padding testi kayan sayfada farklı
zamandaki iki rect’i karşılaştırmıştı. Tek DOM örneklemiyle aynı 18 px sınırı
korundu,3/3 tekrar PASS; son tam kabul yeniden çalıştırılıyor.

Yeni senaryolar: timer 05:00 → 04:00, durdur, 10 dk geçir, aynı kalan, sayfa
geçişi, devam et, bitiş/offline, 1/5/10/20 ve özel 120 sınırı; sentetik disk
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
cebir ve offline/restart akışları PASS, rendererErrors 0. Android code 13/name 0.7.0
v2 imza PASS. [Public43594788583](https://github.com/kaansavukduran/yksmania/actions/runs/43594788583)
69/69 PASS; release 43595550431 v 0.7.0-alpha.1'i 8 asset ile yayımladı.
Yerel son tam koşu 69/69 (4,8 dk); gezinme beklemesi üç tekrar 3/3 PASS.
YKS-020 genişlik denetimi PASS: gerçek 320 px görünümde 250 px okuma alanı,
32 px root font ve 1,5 text-scale korunur. Fiziksel cihaz/temiz kurulum/güncelleme
NOT TESTED; ayrıntılı kaynak, kanıt hash kapsamı ve teslim kaydı FORGE'dedir.

Denetlenen başlangıç: main `730b37297fda2fcde70c838bb96c021119b442be`.
Remote fetch ve dal uçlarıyla eşleşmesi doğrulandı. Önceki 0.6.0 teslimindeki
YKS-015/016/017 senaryoları korunur; bu turdaki gözlemler ayrı kaydedilir.

- **YKS-018 / Orta:** Konu Anlatımı → Matematik → Rasyonel sayılar → Payda 3.
  Gerçekte `1/3 = 0,333` görünüyordu; yaklaşık sonuç kesin eşitlik gibi öğretiliyordu.
  1440 px Chromium/Linux, Türkçe, varsayılan ölçek ve klavye/fare yolunda
  odaklı test başlangıçta FAIL. Yuvarlama gerektiğinde ≈ ve açıklaması gösterilir;
  1/4 gibi kesin sonlu sonuçta = korunur. Aynı test onarım sonrası PASS.
- **YKS-019 / Düşük:** Aynı rehberde İçindekiler'i klavyeyle açıp bir bölüm seçince
  sayfa kayıyor fakat odak eski görünmez düğmede kalıyordu. Aynı ortamda
  `toBeFocused` başlangıçta FAIL. Paylaşılan rehber gezinmesi hedef h2'ye odağı
  taşır; başlıklar yalnız programlı odak alır, Tab sırasına eklenmez. Aynı test PASS.
- **YKS-020 / Orta:** Yeni cebir modelinin görsel incelemesinde, 320 px ve
  %200 arayüz/%150 yazıda iç içe rem yan boşluklarının okunabilir alanı 144,8 px'e
  indirdiği gözlendi. Taşma denetimi tek başına bunu yakalamıyordu. Aynı koşuldaki
  en az 220 px içerik alanı testi başlangıçta FAIL. Küçük ekranın ana içerik,
  ders/soru kartı ve şema yan boşlukları ekran genişliğine göre sınırlandı;
  font ve kullanıcının iki ölçeği korunur. Yeni test bunları ayrı ayrı ölçer.
  Yeni modelde tanımsız renk değişkeni de mevcut accent token'ına bağlandı;
  deneme noktası açıklaması renk dışındaki konum bilgisini de kullanır.

Son küçük ekran düzeltmesi sonrası ilk odaklı koşu 4/5 geçti: rehber gezinme
testi hash geçişi tamamlanmadan section sayısını anlık okudu (0). Hata anından
sonraki snapshot doğru hücre rehberini gösteriyordu. Test artık seçilen konunun
gerçek h 1'ini bekleyip aynı kapsam denetimini yapar; beklenti azaltılmadı veya
timeout uzatılmadı. Tekrarlı ve tam son koşu sonuçları FORGE'de kaydedilir.

Yeni kabul: normal ders girişinden genişletilen yedi rehberin model ve çözümlü
örneği; yeni denklemin dönüşümleri, sıfır katsayı ve offline yeniden açılması;
eşitsizlikte yön/açık-kapalı sınır, gerçek emüle tap, 320 px %200 arayüz/%150 yazı,
844×390 yatay görünüm, offline kayıt ve ciddi/kritik axe kontrolü. Notlar altta
kalır; keşif ders tamamlanması veya XP üretmez. İlk odaklı 5/5 browser PASS;
67 birim testi ve ilk check/build PASS. Tam son sürüm/paket/canlı sonuçları
güncel FORGE kaydında ayrıca belirtilir.

Bu turda AIONIA canlı v 1.7 standardı yeniden okundu; karakter, atlas veya dünya
sanatı değiştirilmedi. Sanat regresyonları tam tarayıcı kabulünde korunur.
Fiziksel Android ve temiz Windows kurulum/güncelleme burada test edilmiş sayılmaz.

Target 0.7.0 alpha. This file is updated at the verified Forge checkpoint.

Previous 0.6.0 delivery: application/package source `c05291f`;
[CI 43590369220](https://github.com/kaansavukduran/yksmania/actions/runs/43590369220)
passed 64 unit and 64 browser tests plus all Windows, Linux and Android jobs.
Both packaged desktop applications passed offline/reload/process-restart flows
with zero observed renderer errors. Android code 12 / version 0.6.0 / v 2
signature verified. Release `v0.6.0-alpha.1` contains five packages and three
evidence files from that successful build. The full published-origin acceptance
passed 64/64 at `95978b0`; subsequent source/build-only changes produced 27
byte-identical runtime/version assets. See the current FORGE entry for provenance,
the two locally checked evidence hashes and platform checks still unverified.

## 0.5.3 ağaç yönü

TYT ve AYT kökleri üstte; ders düğümleri aşağıya açılır. Mevcut YKS-010
kontrolü iki kökün de bütün ders düğümlerinden yukarıda olduğunu ölçer.
Klavye/ders seçimi, gerçek konu/soru bağlantıları ve 320 px büyük yazılı offline
regresyonu korunur. Yerel 45 unit/50 browser ve public 43582897828:50/50 PASS.
Koyu/açık masaüstü ve 390 px mobil SVG görüntüleri görsel incelendi.
Paket/yayın doğrulamasının son durumu FORGE.md içindedir.

## Automated acceptance

- Unit tests: ordinal review dates, year/leap boundaries, closed days, all-days
  unavailable, overdue capacity, duplicate saves and XP, undo and retained history.
- Storage tests: settings independence, unfinished draft, invalid backup and date,
  unknown topic/option references, original PDF bytes and untouched learning state.
- Browser tests: normal lesson → hint/error → save → reload → undo; full offline
  reload and completion; blocked dates; Turkish UI and legacy en-US compatibility,
  Lexend, 200% UI + 150% text on 390 px;
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
| Layout | Inspected desktop dark/light and settled 390 px mobile; 200% UI + 150% text interaction in automated test |
| APK | PASS: API 24 minimum / target 36, com.fragaria.yksmania 0.1.0, APK v 2 signature verifies; physical installation remains untested |

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
- YKS-005: at 390 px, 200% UI, 150% text and English, intrinsic grid sizing and the
  long word “parallelograms” produced page overflow. Grid children now shrink,
  the single-column track is minmax(0,1 fr), and long headings/control labels wrap.
  No content was clipped and the selected scale was not reduced.
- Cell route, actual diagram taps, plant/animal differences, saved selection,
  original question completion, ion identity, all 118 element buttons, physical
  polygon translation, conserved area, offline reload and reduced motion are
  covered through normal UI entry points.
- Old database v 1 fixture: answer choice, draft note and original PDF retained after
  database v 2 upgrade. New exploration/reading-position fields default safely.
- Local real-source check: complete private catalogue accepted; all 143 PDFs imported
  with zero per-file failures. A 92.8 MB MEBİ biology book opened offline, displayed
  page 56 text and reopened at page 56 after reload. Learning session count stayed 0.
  This private test uses disposable local browser storage, not CI uploads.
- All 143 prepared PDFs opened in a PDF parser; 4,989 total pages. This is file
  integrity/page-count evidence, not item-by-item or answer-key verification.
- Nine diagrams opened at 390×844 with zero renderer exceptions or page overflow
  at default scale. Desktop screenshots and representative mobile views inspected.
  High-scale and contrast coverage is separately recorded in the acceptance suite.
- Cartoon Aion: all eight authored frames share measured foot baseline y 458. Runtime
  actor-box and reduced-motion regression are separate from this source measurement.

Package, published-origin and complete final test counts are recorded in FORGE.md.
The final 0.2.0 package CI passed on all four jobs; the published production origin
also passed all 19 browser acceptance tests. Both Windows and Linux packaged
executables passed offline lesson/reload/process-restart checks with zero renderer
errors. The Android APK's signature and manifest passed verification.
Physical Android, clean Windows installation/portable extraction and two-package
update preservation remain unverified. No full WCAG certification is claimed.

## 0.2.1 — YKS-006: notes must not narrow teaching content

Source: user report and screenshot, 2026-11-13. At 1440 px the theory notes occupied
the right-hand column and reduced the space available for the diagram and text.
The question notes were already below the question panel; that behavior is retained.

Root cause confirmed: the shared `.study-layout` defined two columns above 1200px.
It now has one full-width track at every breakpoint, with the existing notes after
the article in both DOM and visual order. Redundant breakpoint overrides were removed.
No saved-data fields or note handlers changed.

Regression: `YKS-006 notes stay below full-width theory and questions and retain edits`
in `tests/e2e/app.spec.ts`. The same test failed on the old 0.2.0 layout at 1440px
(notes y 277.19 while the article ended at y 1592.38), then passed after the repair.
It checks theory widths 1440/1280/1024/390/320 and question widths 1440/390/320,
actual note editing, reload, and continuing to question 2 with the note retained.

Local PASS: check, 20 unit/storage/content tests, production build and 20 browser
tests. Chromium 156.0.8078.79 on Linux; Turkish default scale plus the existing
English 200% interface / 150% text regression. Dark/light screenshots inspected at
1440×1000 and 390×1000, zero renderer errors. At 1440 px the article uses the entire
1108.81 px content row; at 390 px it uses the entire 361.22 px row. Notes follow the
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
Unknown locale values still fail validation. The v 1 database fixture now starts with
an English preference and verifies persisted Turkish locale, retained answer/draft
note and original PDF after the database upgrade. Backup normalization is separately
covered by storage tests. Original review dates and other settings are untouched.

The one-time content projection check compared all Turkish lesson/cell labels,
question IDs, option order, correct-answer indexes, hints, explanations and source
labels against the prior commit. All were unchanged; no educational rewrite was
mixed into translation removal. Previous English UI acceptance was replaced with
the same Turkish settings/learning actions, preserving narrow-screen 200% UI / 150%
text, Lexend, keyboard access, reduced motion and persistence checks.

At 390 px with 200% UI / 150% text and Lexend, the Turkish update-check button caused
428 px page overflow. Settings buttons now wrap within their panel without changing
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
dört özgün seti 5/5 tamamlar ve kaydı doğrular. İlk açılış çevrimdışı, 320 px,
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
üretim dağıtımı dpl_5 L 7 aa 779 UHEyqZaqBa 8 gLVdSsDHj ve kaynak 1 dc 5 d 44 eşleşir.
Önceki 0.2.2 kota engeli bu yeni otomatik dağıtımda gözlenmedi. Paket ve yayın
sonuçları FORGE.md teslim kaydında tutulur. Paket CI 43503304731 dört işte PASS:
25 birim/depolama/içerik, 26 tarayıcı, Windows/Linux paketli dört AYT modeli ve
çevrimdışı/yeniden başlatma, Android debug APK imza/manifest kontrolü. Masaüstü
renderer hataları 0; fiziksel cihaz ve temiz kurulum açık kapıları aynen kalır.

Yayın koşusu 43504471113 PASS: v 0.3.0-alpha.1 beş native dosya ve üç kanıt dosyasıyla
herkese açık. Etiket/verified-run.json kaynak 1 dc 5 d 44 ile eşleşir; indirilen kanıtların
hash değerleri checksum listesiyle eşleşir. Android versionCode 5 / versionName
0.3.0 / minimum API 24 ve APK v 2 imzası doğrulandı. APK indirme adresi HTTP 200.
Ayrıntılar ve alpha sınırları FORGE.md ile RELEASE_ALPHA.md içinde.


## 0.3.1 — YKS-008: kopya kağıtları ayrı bölümde

Kaynak: kullanıcının 2026-11-13 ekran görüntüsü ve menü sırası isteği. Baseline
eb 5 ab 16: yeni menü öğesini arayan normal gezinme regresyonu FAIL (beklenen sıra 2,
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

320 px, %200 arayüz / %150 yazı kabulünde 477 px taşma gözlendi. Arama alanının
14 rem minimum genişliği ve grid’in intrinsic minimumu doğrulandı. Arama alanı
artık daralabilir; tek sütun minmax(0,1 fr), konu kartı min-width:0 ve başlıkları
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

Sonraki 3 f 3 cb 54 kaynağının otomatik üretim dağıtımı dpl_JBh 2 d 7 qbX 56 PY 8 g 65 ZFKju 5 LLkJM
READY; kanonik /version.json 0.3.1. Önceki kota engeli bu kaynakta gözlenmedi.
Canlı kabul 43509055312 bu yeni kaynağı doğrular; önceki 0.3.0 testleri kullanılmaz.

Canlı 0.3.1 kabulü 43509055312: 28/28 PASS; kaynak 3 f 3 cb 54 ve READY üretim dağıtımı
ile eşleşir. Nihai native paket koşusu 43508957418 ve indirme yayını Forge teslim
kaydında ayrı tutulur; eski paket koşusu son düzeltmeyi içermez.

Nihai paket CI 43508957418, kaynak 3 f 3 cb 54: dört işte PASS. 26 birim/depolama/
içerik ve 28 tarayıcı testi; Windows/Linux paketlerinde cheatsheets, AYT ve
çevrimdışı/reload/process-restart PASS, renderer hataları 0. Android debug APK
imza/manifest doğrulaması PASS. Fiziksel cihaz ve temiz kurulum açık kapıları
korunur; bu otomasyonlar üretim imzası veya iki paket arası güncelleme kanıtı değildir.

Yayın koşusu 43510112404 PASS: v 0.3.1-alpha.1 sekiz dosyayla herkese açık.
Etiket/verified-run.json kaynak 3 f 3 cb 54 ile eşleşir; indirilen kanıt hash değerleri
checksum listesiyle eşleşir. Android versionCode 6 / versionName 0.3.1 / minimum
API 24 ve APK v 2 imzası doğrulandı. Herkese açık APK bağlantısı HTTP 200.

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
hareket test edilir. Mobilde eski 12.5 rem sahnede 240 px kare karakterin ayakları
kırpılıyordu; aktör mevcut yüksekliğe sığar. 320 px geometri regresyonu bunu korur.

Beş OGM şeması seçeneklerini normal kontrollerle değiştirir, her özgün seti 5/5
bitirir; atom modelinin ilk çevrimdışı yüklemesi, seçim/yeniden yükleme ve ciddi/
kritik axe kontrolü yapılır. Electron otomasyonu beş yeni görseli ilk çevrimdışı
kullanır, konu kaydını yapar ve süreç yeniden başlayınca 1/479 grafik kaydını,
önceki AYT keşfini ve tamamlanmış soru oturumunu doğrular. Eski ders/PDF/taslak/
yedek/not/tekrar regresyonları korunur. Son test sayıları ve gerçek paket/web
kaynak eşleşmeleri FORGE.md teslim kaydında tutulur.

Dar ekran denetimi ek kusur yakaladı: 320 px / %200 UI / %150 yazıda Bugün
sayfası 510 px genişliyordu. Özetin üç intrinsic grid sütunu ve today-grid’in
1 fr min-content alt sınırı neden oldu. Özet uygun sütun sayısına, alt paneller
minmax(0,1 fr) sınırına geçer; hafta günleri sığmadığında satıra geçer. Yazı veya
ölçek küçültülmedi, içerik gizlenmedi. Aynı gerçek ayar/plan/ağaç akışı onarımdan
sonra PASS; Bugün/Dünyam 320 px, Ayarlar 321 px (yuvarlama toleransı 1 px).

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
katalog input’una geçmeden “Kaynak dosyaları” h 1’ini bekler. Süre aşımı veya
ürün doğrulaması gevşetilmez; uygulama kodu bu düzeltmede değişmez. Bu eski CI
koşusu yayın/paket kanıtı sayılmaz; yeni kaynakla tüm işler yeniden çalışır.

Kaynak girişindeki iki regresyon, yeni h 1 bekleyişiyle üçer kez tekrarlandı:
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
38/38 PASS. Web uygulama kaynağı 0101829, son test kaynağı 66539 f 0; uygulama
alt ağaçları birebir aynı. Son test-only commitinin Vercel dağıtımı kota nedeniyle
oluşmadı; bu durum ve hash karşılaştırması FORGE.md içinde açıkça kaydedildi.
Quota aşma/manuel dağıtım denemesi yapılmadı. Fiziksel cihaz ve installer/update
kontrolleri açık kalır. Release dosya doğrulaması teslim kaydına eklenir.

Yayın 43524926879 PASS: v 0.4.0-alpha.1 public/prerelease, sekiz dosya. Tag ve
verified-run.json 66539 f 0 ile eşleşir; indirilen iki kanıtın SHA-256 değerleri
checksum listesiyle aynı. Android 7/0.4.0, minimum API 24 ve v 2 imza doğrulandı;
public APK adresi HTTP 200. Büyük beş binary ayrıca yerel hash kontrolü için
indirilmedi. Tam teslim ve web/app test kaynağı ayrımı FORGE.md içindedir.

## 0.5.0 — TYT mathematics, local verification

TypeScript and production build PASS. Forty unit/storage/content tests PASS;
44/44 browser scenarios PASS on the fixed final build (2.4 m). Chromium
156.0.8078.79 / Node 24.22.1 / Linux. The five new models each support normal
control changes and five independent question responses, retained offline reload,
320 px / 200% interface / 150% text / light / reduced-motion interaction and
serious/critical axe checks. A landscape resize returns to portrait with selections
intact. No new database schema or translation was introduced. Static math components
are lazy-loaded; React checklist reviewed, no new dependency or global handler.

YKS-012, observed during this iteration: the new prime-divisor SVG reserved height
for many rows even for a single row. On the pre-fix new-lesson build, the regression
measured 385.23 px height where the single-row bound was <169.21 px and failed.
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

0.5.0 live acceptance: run 43567601148, 44/44 PASS (3.8 m) on the canonical HTTPS
origin. Both test source and READY production deployment use bd95c5ddf89eaed78445710dbea91b2f45517e23;
/version.json reports 0.5.0. No code-subtree equivalence workaround was needed.

0.5.0 remote package CI 43567554549: all four jobs PASS. Forty unit tests and
44 browser scenarios (1.9 m); packaged Windows/Linux offline/reload/process restart
including all five mathematics activities and retained prime evidence, renderer
errors 0. Android APK signature/manifest step PASS. This is executable automation,
not a clean installer/portable relocation or physical Android test.

Release 43568202257 PASS: public prerelease v 0.5.0-alpha.1, eight assets. Tag and
verified-run.json match bd 95 c 5 d. Two downloaded evidence hashes match SHA 256 SUMS;
large native binaries were not all downloaded and rehashed locally. Android
versionCode 8 / versionName 0.5.0 / minimum API 24 / APK v 2 signature verified;
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

Local check/build and 41 unit tests PASS. Four focused normal-UI tests PASS (22.7 s):
4/5 with durable theory, offline reopening/result link; old question-only history,
failed-write/retry and explicit theory mark/undo; 0/5 latest attempt and session
undo restoring 4/5; external manual questions on a blocked day with no invented
result. At 320 px / 200% UI / 150% text / light, real mark/undo/result controls work,
page width <=321 px and serious/critical axe violations 0. The first development
run of the latter tests used an incorrect text-size accessible name and expected
an extra theory step after Result → Yeniden çalış; these harness assumptions were
corrected to the existing normal UI. No product assertions/timeouts were relaxed.

The previous YKS-009 browser assertion expected completed rows to disappear. It
now expects five visible rows (one completed, four pending in order), while the
underlying plan's four remaining assignments are unchanged. Existing independent
record tests remain. Native Linux validates a completed Simya row and the saved
rational-question score after process restart; renderer errors 0. Final full-suite,
remote package, visual and live deployment evidence is recorded in FORGE.md.

Final local browser run: 48/48 PASS (2.8 m), same fixed 0.5.1 bundle. All old
forty-four scenarios remain. Dark/light 1440×1000 and 390×844 daily cards inspected,
normal-width score/completion/actions readable; actual page widths 390/390 and
320/320, visual-flow renderer exceptions 0. A tall locator screenshot showed an
apparent skip-link overlay. Live bounds before/after capture proved it hidden
(bottom −199.06 px, unfocused); this is not recorded as a product defect. Added
large-scale hidden-link geometry plus actual Tab → Enter → main focus checks,
focused rerun PASS (11.7 s). No skip-link CSS change was made from the screenshot.

Live 0.5.1 acceptance 43569397941: 48/48 PASS (3.8 m). The canonical origin and
test suite both use 776f62c1603d9af7b37dbdf5fdbbee6c49f569d7; deployment
dpl_2 a 1 omXD 7 s 6 HJosPdx 6 LzBZiirp 2 r READY, /version.json 0.5.1. No code-subtree
substitution or tests against an older deployment were used.

Remote package CI 43569363475: all four jobs PASS, 41 unit tests, 48 browser
scenarios (2.0 m). Windows/Linux packaged executable checks include visible daily
theory completion and the saved five-of-five question result after process restart,
offline reload and old regressions; renderer errors 0. Android debug APK
signature/manifest PASS. Physical devices, clean installer/portable relocation,
production signing and two-version native updates remain NOT TESTED.

Release 43570014722 PASS: v 0.5.1-alpha.1 public/prerelease, eight assets from the
successful package run without rebuilding. Tag and downloaded verified-run.json
match 776 f 62 c. Two small evidence-file hashes match SHA 256 SUMS; five large native
binaries were not all downloaded and rehashed locally. Android 9 / 0.5.1 / API 24 /
v 2 signature verified; public APK HEAD HTTP 200. Native physical/signing/update
gaps above remain open. Documentation-only handoff changes do not alter app code.

## 0.5.2 — YKS-015: metinsiz paragraf sorusu

Kullanıcı bildirimi: “Metnin ana düşüncesi nedir?” sorusunda metin yok;
son cümleye atıf yapan ipucu da kullanılamıyor. 0.5.1 / 9 cf 8 a 65 yerel yapısında
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

Yeni mobil kabul sırasında 320 px, %200 arayüz, %150 yazıda seçenek içindeki flex
metninin küçülemeyip yatay taşması gözlendi. min-width:0 ve sözcük sarma;
dar ekranda tek sütun seçenek, uyarlanan boşluklarla giderildi. Yazı veya kullanıcı
ölçeği küçültülmedi; metin gizlenmedi. Yerel/native/canlı sonuçlar FORGE.md’de
ayrı kaydedilir. Fiziksel Android/ekran okuyucu kontrolü ayrıca yapılmalıdır.

0.5.2 teslim kanıtı: [CI43580314183](https://github.com/kaansavukduran/yksmania/actions/runs/43580314183)
45 unit/50 browser ve paketlenmiş Windows/Linux paragraf offline/restart kabulü PASS;
Android v2 imza/code10/name0.5.2 PASS. [Public43579996297](https://github.com/kaansavukduran/yksmania/actions/runs/43579996297)
50/50 PASS; [release43581051297](https://github.com/kaansavukduran/yksmania/actions/runs/43581051297)
8 asset yayımladı. Yerel HTTPS tarayıcı yolu proxyCA nedeniyle BLOCKED; TLS
kontrolü kapatılmadı. İlk CI 49/50 sonucu ve testin durable kayıt beklemesi
FORGE.md’de korunur. Fiziksel cihaz/kurulum/güncelleme NOT TESTED kalır.


## YKS-016: konu içi kaynak ve okunabilir anlatım

Kaynak:14.11.2026 kullanıcı ekranı. Soru-kaynak kartındaki başlık, satırlar ve
eylemler kenarlara dayalıydı. Kök neden doğrulandı: topic-study üzerinde
container padding eksikti. Responsive iç boşluk eklendi; eşdeğer kontroller
hizalandı. Kopya kağıdı menüsünü kaldırıp konu başlığına taşıma en yeni
açık kullanıcı kararıdır; eski YKS-008 kayıtları tarihsel davranıştır.

Gerilemeler: yeni learning-depth 3 test PDF içe aktarma, sayfa/notun offline
reload ile korunması, başarısız içe aktarmada önceki dosyanın kalması,
sahte ilerleme olmaması, kart geometrisi ve gerçek soru sonucu→ÖSYM
kaynağı akışını kapsar.320 px %200 UI/%150 metin, gerçek emüle tap ve axe
denetimi vardır. Yanlış kitapçık hash ile reddedilir. Eski /cheatsheets
bağlantıları ve soru taslakları korunur.

Gözlenen ek kusurlar: (1) büyük yazıda header düğmesi 335 px min-content ile
320 px sayfayı taşıyordu; span/grid ile yeniden akış düzeltildi. (2) eski
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

0.6.0 ilk Windows build'inde TS 1149/TS 1261 doğrulandı: büyük-küçük harfle
ayrılan NarrativeModels.tsx ve narrativeModels.ts, Linux'ta geçmesine rağmen
Windows TypeScript çözümlemesinde çakıştı. Saf hesap modülü
narrativeCalculations.ts adını aldı;4 kullanıcı import'u güncellendi.
check-module-paths.mjs uzantısız kaynak yollarını case-insensitive denetler;
check/build girişlerine bağlandı. Aynı eski kusuru içeren geçici örnekle
reddetme kontrolü PASS; mevcut 85 kaynak modülü PASS. Hesapların davranış
testleri korunur. Windows paket sonucu son Forge kaydında belirtilir.


## Forge033 — gerçek 0.21 kabulü ve açık Pages kapısı

17 Kasım 2026, kaynak `197dc1b31c0a45ad03a3782106665591cc0c32fc`. [CI](https://github.com/kaansavukduran/yksmania/actions/runs/44086453423) 1.907/1.907 birim, dört shard’da 1.269/1.269 E2E; fail, skip, flaky ve retry sıfır. Gerçek paketli Windows/Linux 108’er çevrimdışı model akışını geçti. Önceki `cc589984` CI turunun 1.265 PASS / 4 metadata beklentisi FAIL sonucu saklanır. Yalnız üç E2E dosyasında sürüm ve kalan konu sayısı düzeltildi; matematik, ürün kodu ve davranış assertion’ları değiştirilmedi. Dört hedef metadata testi sonrasında geçti; yeni tam CI ayrıca tamamlandı.

[Masaüstü yayını](https://github.com/kaansavukduran/yksmania/releases/tag/v0.21.0-alpha.1) kaynak/etiket, dört binary, `verified-run.json` ve `SHA256SUMS.txt` ile doğrulandı. Gerçek public AppImage normal TLS ile indirilip SHA-256 ve arşiv karşılaştırmasından sonra kendi binary’siyle 108 model akışı, aynı profilde süreç yeniden açılışı ve altı normal bağlantı etkinleştirmesini geçti. Renderer hatası sıfır; kayıt, not, Matrix korunumu ve yanlış XP oluşmaması geçti. Yalnız OS devretme çağrısı recorder’dı; uygulamanın handler veya politikası değiştirilmedi. Gerçek dış tarayıcı/video kabulü değildir. **F032-DESKTOP-EXTERNAL-001:** yayımlanan 0.21 AppImage’in bu altı devretmesi için giderildi; 0.20 tarihsel indirmesi aynı kalır.

**F033-PAGES-LIVENESS-001, Orta — ilk bekleme tarihsel; süre sınırı onarımı izole test dalında doğrulandı:** doğrudan Node ile çalışan yayın testi, service-worker/IndexedDB `page.evaluate` Promise’larında ve bazı kapanış beklemelerinde kendi kesin süresini koymuyordu. [Pages](https://github.com/kaansavukduran/yksmania/actions/runs/44091144353) build/prefix 108 ve deploy SUCCESS; yayımlanan sitedeki Node adımı 13:24:29–15:49:57 UTC arasında sonuç/ilerleme kaydı veya artifact üretmedi ve iptal edildi. Gerçek takıldığı Promise veya neden bilinmiyor; yalnız süreye bakarak SW hatası denmez. Mevcut site/ana dal değiştirilmeden aynı 108 assertion için kesin süre, adım kaydı ve başarısızlık kanıtı izole `cf785968` test dalına eklendi. Bu altyapı onarımı yayın kaynağı N veya yalnız belge güncellemesine aktarılmış sayılmaz; sonraki kaynak turunda korunacak ayrı bir değişikliktir. Ayrı ve özgün testlerin gerçek artifact kabulleri aşağıdadır. İptal edilmiş iş PASS değildir. Kabul koşulu: takılmada süresi belli FAIL ve teşhis; sağlıklı aynı 108 tam akışta PASS; hiçbir assertion atlama/zayıflatma veya TLS atlatma olmaması.

İlk yeni HTTP dosya kontrolünde tek 503 yanıtı çıktı; dosya adı eski helper tarafından kaydedilemedi. Bu hata korunur. Ardından dosya başına hata kaydı ve sıfır tekrar ile 293/293 hash, toplam 27.716.294 byte, normal TLS PASS. Bu sonuç iptal edilmiş tarayıcı işini PASS yapmaz ve 503’ün eski takılmanın nedeni olduğunu kanıtlamaz.

[Kişisel APK](https://github.com/kaansavukduran/yksmania/actions/runs/44082360745/artifacts/14328077495) gerçek imza, paket, launcher, 293 C3 web dosyası ve iki boş Cordova dosyasıyla kabul edildi: `0.21.0-test`, kod 31, ayrı `com.fragaria.yksmania.test`. Kaynak `cc589984` ile yayın `197dc1b` arasında üç E2E dosyası farkı; üretim girdilerinde fark yok. APK 19.212.294 byte, SHA-256 `8d6c04a7d4c6116294c73830a12a681739f7b4362a7d8d5f7cf2753519aa1792`. Önceki debug sertifikası farklı; yerinde Android yükseltmesi kabul edilmedi. Fiziksel kurulum/ilk açılış, temiz Windows/Linux kurulumu, portable taşıma ve native iki kurulum arasında yükseltme NOT TESTED. Ana kimlik/imza korunur; secret istenmedi, genel APK yayını yok.

Gerçek yerel 0.20 → 0.21 web yükseltmesinde üç ham IndexedDB deposu/kayıtları, notlar, Matrix/Lexend, özel hedef tarih, taslak, 40 cevaplı deneme/bayraklar ve özgün 3/7/21 tarihleri byte karşılaştırmasıyla korundu; otomatik yazım sıfır. Yeni modeller ilk kez offline açıldı. Bu web yükseltmesi native/telefon kabulü değildir. PDF kanonik kapanışı ile 45 dosyalık metadata eki ayrı işlemlerdir; güncel 8.981 PDF: 3 tam / 6 kısmi / 8.972 belirsiz. [Güncel rapor](PDF_SOURCE_PROGRESS033.md) kaynağa bağlı kapsamı açıklar.

```text
YKSMania yayın kaynağı 197dc1b31c0a45ad03a3782106665591cc0c32fc için CI, Release, özgün Pages attempt2 ve ayrı canlı 108 kabulleri tamamdır. İlk attempt1 CANCELLED geçmişini ve bilinmeyen nedeni koru. Kalan altyapı işi: cf785968 test dalında doğrulanmış scripts/test-pages.mjs ve scripts/pages-deadline.mjs süre/adım teşhis onarımını sonraki yetkili kaynak turuna al; bu belge commit’inde ana dala alınmış sayma. Üretim girdileri, öğrenci verileri ve bütün eski 108 assertion korunmalı. Askıda bekleme FAIL üretmeli, sağlıklı 108 akış PASS olmalı. Kaynak, paket ve fiziksel telefon kabullerini eşitleme.
```


### Ayrı canlı Pages doğrulaması — gerçek uzak kabul

[44120954459](https://github.com/kaansavukduran/yksmania/actions/runs/44120954459), test dalı `cf785968ccbc797d6067c61ae962e9da2bfd7889`, 17 Kasım 16:05:27 UTC SUCCESS. Tek verify işi mevcut yayını sınadı; build, deploy veya release yapmadı. N → test dalı farkı yalnız `.github/workflows/ci.yml`, `scripts/test-pages.mjs` ve yeni `scripts/pages-deadline.mjs` dosyalarıdır; bütün üretim girdileri `197dc1b` ile byte aynıdır. TLS doğrulaması atlatılmadı.

Gerçek artifact 14345182613 indirildi: ZIP 37.763 byte, SHA-256 `b60006e0b43403f3b30b83a75741802d49e4212d0fc29b8b562731d446cc4247`. Sonuç JSON’u, 108 farklı case için begin/passed kayıtlarıyla birebir eşleşti. Soru geri bildirimi, ilk çevrimdışı model açılışları, not ve kayıt reload’u, puansız keşif ve son gezinme PASS. Renderer/eksik istek sıfır; 418 teşhis olayı normal gezinme, HTTP/console/failed-request olayı sıfırdır. Yayımlanan sitedeki asıl 108 kontrol kaldırılmadı. Bu ayrı başarı ilk otomatik 44091144353 / attempt 1 CANCELLED geçmişini değiştirmez; ilk takılmanın nedeni hâlâ bilinmiyor. Özgün otomatik işin ikinci denemesi de aşağıdaki ayrı güncel kabulde doğrulandı.

### Özgün otomatik Pages — ikinci deneme kabulü

[44091144353 / attempt2](https://github.com/kaansavukduran/yksmania/actions/runs/44091144353/attempts/2), tam kaynak `197dc1b31c0a45ad03a3782106665591cc0c32fc`, üç işin tamamı SUCCESS. Yalnız verify-published yeniden çalıştı: 17 Kasım 16:07:50–16:12:50 UTC, iş 134176260055. Önceden başarılı build/deploy yürütmelerinin başlangıç, bitiş ve bütün adımları aynen korunmuştur; API ikinci denemede bunlara yeni taşınan iş satırı kimlikleri vermiştir. Yeni build, deploy veya Release yürütmesi yoktur.

Gerçek artifact 14346896112 indirildi: ZIP 30.104 byte, SHA-256 `287c709287f7206cac5b942f43301f0982555405d328932e3433a1dd4b2dac0e`. Kaydedilmiş sonuçta 108 benzersiz model sırası, ayrı bounded doğrulamadaki 108 ile birebir eşleşir. Soru geri bildirimi, notlar, çevrimdışı kayıt/reload ve puansız keşif PASS; renderer ve eksik istek sıfırdır. Böylece kaynak N’nin özgün otomatik yayın kapısı da tamamlandı. İlk denemenin CANCELLED sonucu, ilk log ve kesinleştirilmeyen takılma nedeni korunur. Sonraki başarılı koşu, ilk takılmanın gerçek nedenini kendiliğinden kanıtlamaz.
