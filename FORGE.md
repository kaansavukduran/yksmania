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
