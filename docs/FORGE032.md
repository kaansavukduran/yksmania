# Forge032: 0.20.0 doğrulanmış yayın

17 Kasım 2026. Yayın kaynağı `387fc3ea7f43e39d64e0c1e5f062372969a0ebeb`; [tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/44070229171), [Pages](https://github.com/kaansavukduran/yksmania/actions/runs/44074567259) ve [masaüstü release](https://github.com/kaansavukduran/yksmania/releases/tag/v0.20.0-alpha.1) aynı kaynağa bağlıdır. Bütün arşiv bitmedi; sonradan doğrulanan masaüstü dış bağlantı kusuru aşağıda açık tutulur.

| Alan | Yayımlanan 0.20 kapsamı ve sonuç |
| --- | --- |
| Kod | Sekiz yeni ders/rehber/özet, hesapla aynı veriden çizilen SVG’ler ve gerçek asal eleği. Önceki 5.943 ham soru, anahtar, seçenek/sıra ve kayıtlar korunur. |
| Konular | Yedi TYT geometri + bir TYT matematik: 88 bölüm, 46 örnek, 44 hatırlama. Toplam 494 rehber, 493 çalışma başlığı; ilk 479 kimlik/sıra aynı. |
| Kopya kağıtları | Sekiz yeni ayrı özet; toplam 494. Öğrenci PDF/katalog/kaynak yüklemez. |
| Sorular | 134 yeni tam yardımlı özgün beş seçenekli soru. Toplam 6.077: 3.437 tam, 2.640 kısmi yardım. Yeni seçenek gerekçeleri bağımsız, anahtarı görünen içerik incelemesinden geçti; kör çözüm iddiası yok. |
| Denemeler | TYT 120/165 dakika, AYT Sayısal 80/180 dakika ve 15 branş pratiği; eski kağıt/cevap/işaret/süre yeniden oluşturulmaz. |
| Modeller | Çokgen üçgenlemesi/köşegenler, dörtgen aileleri, yamuk–deltoid, paralelkenar alanı, prizma/piramit açınımı/kesiti ve açı kaynağı; 1–50 asal eleği/çarpan dikdörtgenleri. |
| Pedagoji | Ön bilgi → açıklama → değiştirilebilir şekil → çözümlü örnek → hatırlama → bağımsız soru. Bilgi, yöntem, ayrı adımlar, beş şık gerekçesi, hata ve sonuç denetimi. Keşif/süre/video puan üretmez. |
| Tasarım | Türkçe, mevcut/Matrix ve Lexend korunur. C4 hedef UI 8/8; dar ekran/büyük yazı ve gerçek şekil/etiketler denetlendi. Yeni karakter/sanat paketi yok. |
| Testler | 1.841 birim, 1.265 tarayıcı PASS; fail/skip/flaky/retry 0. Paketli Windows/Linux, prefix ve gerçek Pages 107’şer akış PASS. Gerçek indirilen AppImage bu VM’de 107 akış PASS. Dış OS dispatch’i çekirdek suite’in dışındaydı; ayrı testte gerçek kusur bulundu. |
| GitHub | Dal `forge/source-transfer-032`; kaynak `387fc3ea`, başarılı main CI 44070229171 ve gerçek release etiketi eşleşti. Son belge düzeltmesi uygulama baytlarını değiştirmez. |
| Yayın | Pages 0.20 ve dört Windows/Linux dosyası yayımlandı; beş manifest/GitHub digest’i eşleşti. 291 web dosyası normal TLS ile eşleşti. Vercel’in son doğrulanan durumu HTTP402. Android kişisel test APK’sı ayrı Actions çıktısıdır, genel Release’e eklenmedi. |
| Kalan iş | Açık F032-DESKTOP-EXTERNAL-001 onarımı, Faktöriyel 033 adayının sonraki kapıları, 2.640 kısmi yardım ve kaynak varyantları, sentetik çember/daire/ileri katı cisimler; fiziksel kurulum ve native iki sürüm yükseltmesi. |

## Kaynak ve sayım

Güncel 8.936 PDF için **2 doğrulanmış tam, 7 doğrulanmış kısmi, 8.927 belirsiz** kayıt vardır. Belirsiz hiç işlenmemiş sayılmaz. 40 PDF’de gerçek ders/soru bağı, 154 PDF’de inceleme kaydı vardır. 1.915 dosya/sayfa ve 1.919 sürüm/sayfa konumu farklı ölçülerdir; bilgi aktarımı yüzdesi değildir. [PDF kaydı](PDF_SOURCE_PROGRESS032.md) kaynak sürümleri, açık maddeler ve 33/117 maddelik iki kapanışı açıklar. Yeni sürüme eski kapanış veya sayfa okuması otomatik taşınmaz.

528 ders/soru seti, 494 rehber/özet ve 493 çalışma başlığı farklı sayım birimleridir. Sonraki 14 başlık ayrı kimliklerle eklenir; matematik–geometri örtüşmeleri korunur. [CSV](CONTENT_INVENTORY.csv) gerçek kayıt koleksiyonundan üretilir. 341 katalog başlığına bölünerek MEB tamamlanma yüzdesi çıkarılmaz. 2024 TYT Matematik31 ve 2022 TYT Matematik14 gerçek resmî kitapçık/anahtardan incelendi; iki soru bütün kitapçıkları veya yirmi yıllık arşivi temsil etmez.

## Gerçek yayın kabulü ve sınırları

Dört uzak tarayıcı shard’ı 341 + 292 + 316 + 316 vakayı geçti. İlk kaynak `24475d3`’in üç testindeki beş eski `484` beklentisi, eklenen sekiz konu sonrası doğru `492` değerine bağlandı. Ürün zaten 493−1 = 492 gösteriyordu; testlerin undo, hata, offline, sonuç ve süre koşulları azaltılmadı. Üç hedef test yerelde, ardından son `387fc3ea`’nin tam 1.265 turu uzakta geçti. İlk başarısız koşu ayrı korunur.

Normal/prefix C4 derlemeleri 291’er dosya ve 281 gerekli cache varlığı içerir. Kamu Pages’teki 291 dosya/27.631.620 byte normal TLS ile karşılaştırıldı; TLS bypass yoktur. Paketli Windows/Linux ve prefix/yayındaki 107 akış başarılıdır. Yayımlanan AppImage 145.843.557 byte indirilip SHA doğrulandı, değiştirilmemiş arşivdeki gerçek binary bu Linux VM’de 107 akışı geçti. Fiziksel cihaz, temiz OS kurulumu, Windows portable taşıma ve native iki sürüm kurulumu bu kabul değildir.

Ayrı yerel Chromium kamu öğrenme denemesi ilk `goto` sırasında `ERR_CERT_AUTHORITY_INVALID` verdi. Uygulama davranışına ulaşılmadı ve TLS doğrulaması kapatılmadı. Bu engel, GitHub işinin gerçek HTTPS107 kabulü veya normal TLS dosya karşılaştırmasıyla birleştirilerek sahte başarıya çevrilmez.

Açı seti C4’ün iki gerçek UI profilinde 18/18 bağımsız doğru ve yardımsızdır; dokuz örnek/on hatırlama/üç model açıldı. Asalın 40 sorusu ve 200 şık açıklaması bağımsız incelendi; gerçek UI’de yalnız ilk 1/40 soru ve kaydedilmiş taslak kabul edildi; 40/40 oturum iddia edilmez. Çokgen Q7’nin 60/90/120/150 dereceyi 3/4/6/12 kenarla eşleyen üçüncü adımı düzeltildi; seçenek/anahtar değişmedi. Son gerçek Q7 tıklama/yardım/offline taslak kontrolü de ayrıca geçti. C3 ve ilk harness hataları [QA](QA.md) tarihinde korunur.

Gerçek yerel 0.19 → 0.20 web güncellemesi eski UI’de oluşturulmuş 5/5 paragrafı, özgün 3/7/21 tarihlerini, yarım soru taslağını, cevaplı/işaretli 40 soruluk denemeyi, notları, Matrix/Lexend’i ve özel 25/05/2027 hedefini korudu. Üç ham veri deposu aynı kaldı; otomatik durum yazımı 0. Yeni modeller ilk kez çevrimdışı kullanıldı; seçimler süreç yeniden açılışında kaldı, XP değişmedi. Bu yerel web deneyi native kurulum yükseltmesi değildir.

## Açık masaüstü dış bağlantı kusuru

**F032-DESKTOP-EXTERNAL-001, Orta, 0.20.0’da AÇIK.** Gerçek yayımlanan AppImage’de normal ders→Matematik→Asal→görünen YouTube bağlantısı tıklamasında beklenen 1 OS dispatch yerine 0 gözlendi. Yalnız OS shell çağrısı recorder’dı; uygulama handler’ı/politikası değiştirilmedi. Mevcut `desktop/main.cjs` politikası GitHub/Drive dışındaki gerçek YouTube/OGM/ÖSYM öğretim adreslerini reddeder. Statik bağımsız taramada 2.294 aktif video girdisi ve 5 kitapçık adresi bu durumdadır. Çevrimdışı öğretim etkilenmez; geçici yol web sürümüdür. 107 çekirdek akış bu davranışı kapsamıyordu.

Onarımın izole 0.21 adayında 55 politika testi ve altı normal kaynak Electron tıklaması geçti: YouTube, OGM PDF/HTML, ÖSYM soru/anahtar PDF’si ve tam süreç yeniden açılışından sonraki YouTube tıklaması. Yalnız OS shell çağrısı recorder’dı; her görünür bağlantı tam bir dispatch üretti, tek pencere/konu ve bütün kayıtlar aynı kaldı. Bu kaynak/main handler kabulüdür; paketlenmiş/yayımlanmış 0.21 veya gerçek video oynatma kabulü değildir. 0.20 indirmeleri değiştirilmedi; bu yayımlanmış sürümde bulgu AÇIK kalır. [QA bulgusu](QA.md#f032-desktop-external-001) yeniden üretim ve kabul koşulunu; aynı bölümün denetim prompt’u izinli değişiklik grubunu verir.

## Kişisel APK ve devam

[Android test işi](https://github.com/kaansavukduran/yksmania/actions/runs/44069495221) kaynak `953084d9`’ten 19.179.469 byte APK üretti. Otomatik debug imzalı ayrı `com.fragaria.yksmania.test`, YKSMania Deneme/0.20.0-test/kod 30’dur. 291 web dosyası C4 ile; 953 → 387 farkının yalnız iki E2E dosyası olduğu ayrıca karşılaştırıldı. Fiziksel telefonda kurulum/ilk açılış denenmedi; genel Release’e APK eklenmedi. Kullanıcı kendi telefonunda deneyecek. İmza veya secret kurma işi kullanıcıya bırakılmadı.

Saatlik bulut Forge görevi etkin; ilk tetikte aktif sahibi görünce salt okunur kontrol yaptı. İkinci PDF üreticisi veya çakışan main gönderimi başlatılmadı. Her koşunun kaynağı, sonucu ve gerçek kalan işi ayrı kaydedilir.

Sonraki izole `forge/source-transfer-033`/0.21 adayı Faktöriyel için 20 bölüm, 16 örnek, 12 hatırlama, 43 soru, 8 bölümlük özet ve 6 model hazırlar. Adayın 529 set/495 rehber/495 özet/494 başlık/6.120 soru sayıları mevcut yayına eklenmez. C3 aşamasındaki dört hedef UI ve 43/43 yardımsız oturum korunur. Son izole adayda 209 dosyada 1.907 birim testi ve 367 modül/TypeScript kontrolü geçti. Dış bağlantı onarımı 55 politika testi ve altı normal kaynak Electron aktivasyonuyla kabul edildi; Son izole adayın prefix 108 akışı da PASS; paketlenmiş/yayımlanmış 0.21 kapıları ayrıca izlenir. 2021 TYT Matematik 5 kaynağının yeni açıklaması yalnız bu aday içindir. Kanonik 2 tam/7 kısmi/8.927 belirsiz kararı henüz artırılmadı.
