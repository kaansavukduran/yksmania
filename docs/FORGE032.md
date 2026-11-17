# Forge032: 0.20.0 kaynak adayı

17 Kasım 2026. Bu belge geliştirme adayını anlatır. Son doğrulanmış yayın 0.19.0’dır; 0.20 kodu için tam CI, paket ve yayın kapıları henüz tamamlanmadı.

| Alan | Adaydaki gerçek kapsam |
| --- | --- |
| Kod | Sekiz yeni ders/rehber/özet, hesaplarla aynı veriden çizilen SVG modelleri ve gerçek asal eleği. Eski ham sorular, anahtarlar ve kayıt şeması korunur. |
| Konular | Yedi TYT geometri ve bir TYT matematik ünitesi: 88 bölüm, 46 çözümlü örnek, 44 hatırlama. Toplam 494 rehber ve 493 çalışma başlığı. |
| Kopya kağıtları | Sekiz yeni ayrı kısa özet; toplam 494. Öğrenci PDF veya kaynak kataloğu yüklemez. |
| Sorular | 134 yeni özgün beş seçenekli, tam yardımlı soru. Toplam 6.077: 3.437 tam, 2.640 kısmi yardım. Önceki 5.943 ham soru ve anahtarlar korunur. |
| Denemeler | TYT 120 soru/165 dakika, AYT Sayısal 80 soru/180 dakika, 15 branş pratiği. Başlanmış kağıt, cevap, işaret ve süre yeniden oluşturulmaz. |
| İnteraktif modeller | Çokgen üçgenlemesi/köşegenler, kapsayıcı dörtgen aileleri, yamuk–deltoid, paralelkenarda kayma/alan, prizma ve piramitte açınım/kesit/hacim, kaynak açı şekilleri ve 1–50 asal eleği/çarpan dikdörtgenleri. |
| Pedagoji | Ön bilgi, açıklama, değiştirilebilir şekil, çözümlü örnek, hatırlama ve bağımsız soru. Bilgi, yöntem, ayrı adımlar, beş şık gerekçesi, sık hata ve sonuç denetimi açılır. Keşif/süre/video puan üretmez. |
| Tasarım | Türkçe, mevcut/Matrix temaları ve Lexend korunur. Dar ekran/büyük ölçek ile gerçek SVG etiketleri denetlendi. Yeni karakter veya sanat paketi yoktur. |
| Testler | C3 hedef UI, gerçek aynı kökenli 0.19 → 0.20 web yükseltmesi, yerel Electron ve Pages alt dizini 107’şer akış PASS. Son C4 tam turu 205 dosyada 1.841/1.841 PASS; TypeScript ve normal/prefix C4 derlemeleri PASS. Önceki tek timeout ve değiştirilmeden izole 4/4 geçen dosya tarihsel korunur. Son C4 hedef UI turu 8/8 PASS; C3 native/prefix başarıları son paketlerin kabulü değildir. |
| GitHub | Yerel dal `forge/source-transfer-032`, taban `52f87bf94f26a14a5fea16d597920f4fd72e8971`. Kaynak commit/main/CI/etiket eşleşmesi henüz bu kayıtta doğrulanmadı. |
| Yayın | Yeni Pages/Vercel/Windows/Linux yayını bu adayda henüz kabul edilmedi. Son doğrulanan Vercel durumu HTTP 402 hesap sınırı. Kullanıcının telefonunda deneyeceği Android test APK’sı hazırlanıyor; henüz dosya kabulü yoktur. |
| Kalan iş | 2.640 kısmi yardım, açık kaynak maddeleri ve karma alıştırmalar; sentetik çember/daire ve ileri katı cisimler; CI/paket/yayın ve fiziksel kabuller. Bütün PDF/MEB/ÖSYM arşivi bitmedi. |

## Kaynak ve sayım

Güncel 8.936 PDF için 2 doğrulanmış tam, 7 doğrulanmış kısmi ve 8.927 belirsiz kayıt vardır. Belirsiz, hiç işlenmemiş demek değildir. 40 PDF’de uygulama bağı, 154 PDF’de okuma kaydı vardır. 1.915 dosya/sayfa konumu ile 1.919 sürüm/sayfa konumu ayrı ölçülerdir; bilgi aktarımı yüzdesi olarak kullanılmaz. [PDF ilerlemesi](PDF_SOURCE_PROGRESS032.md) kaynak kararlarını ve kalan maddeleri açıklar. Dosya sürümü değişince eski okuma veya kapanış yeni sürüme otomatik taşınmaz.

494 rehber, 528 ders/soru seti ve 493 çalışma başlığı farklı sayım birimleridir. İlk 479 kimlik/sıra korunur; sonraki 14 ek başlık ayrı izlenir. [CSV](CONTENT_INVENTORY.csv), `node scripts/export-content-inventory.mjs` ile gerçek kayıtlardan üretilir. Matematik–geometri örtüşmeleri korunur; bu sayılardan MEB tamamlanma yüzdesi çıkarılmaz.

2024 TYT Matematik 31 ve 2022 TYT Matematik 14 için gerçek resmî kitapçık ve cevap anahtarı incelendi; iki soru bütün kitapçıklar veya yirmi yıllık arşiv demek değildir. Açıklamalar uygulamanın öğretim uyarlamasıdır. Özel PDF/Drive kimlikleri, kişisel takvim ve imza anahtarı Git’e girmez.

## Kabul sınırları ve sonraki doğrulama

Hedef tarayıcı kabulü ayrı koşuların birleşimidir; tek tam tarayıcı turu değildir. Açı setinin iki 18/18 oturumunda yanıtlar bağımsız doğru ve yardımsızdır. Dokuz örnek, on hatırlama ve üç şekil modu açıldı. Asalda 40 soru ve 200 seçenek gerekçesi bağımsız matematik denetiminden geçti; gerçek UI kabulü ilk 1/40 soru, 84 örneğinin yöntemi ve kaydedilmiş taslağı kapsar. 40/40 tarayıcı çözümü iddia edilmez. İncelemeler anahtarı görünen içerik denetimidir; kör çözüm iddiası yoktur.

Gerçek web yükseltmesi eski UI’de oluşturulmuş 5/5 paragrafı, özgün 3/7/21 tarihlerini, yarım soru taslağını, cevaplı/işaretli 40 soruluk branş denemesini, notları, Matrix/Lexend’i ve 25/05/2027 tarihini korudu. Aktivasyonda üç ham IndexedDB deposu aynı, otomatik durum yazımı sıfırdır. Belge/katalog için yalnız açıkça sentetik zararsız belge kullanıldı. Yeni çokgen ve asal ilk kez çevrimdışı açıldı; seçimler reload ve süreç yeniden açılışında kaldı, XP değişmedi. Bu yerel web deneyi, native iki sürüm kurulumu değildir.

Yerel Electron ve Pages alt dizini koşuları kesinti öncesinde tamamlanmış; sonuçları ortam geri geldiğinde gerçek dosyalardan okunmuştur. Her biri özgün 99 ve sekiz yeni modelin toplam 107 akışını geçmiştir. Yerel Electron, kaynak kodu ve donmuş web derlemesiyle çalıştırılmıştır; yayımlanmış Windows/Linux paket kabulü olarak sunulmaz. Yerel prefix yayındaki Pages kabulü değildir. Tam listede 1.265 tarayıcı testi vardır; hepsinin son kaynakta geçtiği henüz doğrulanmadı.

Son tam birim turundaki tek 5.000 ms zaman aşımı `foundation-practice-013` testindedir. Aynı dosya değiştirilmeden ayrı koşuda 4/4 geçti; bu izole başarı tam turun yerine geçmez. Son içerik denetiminde bir çokgen sorusunun üçüncü çözüm adımında 60°/90°/120°/150° açıları ile 3/4/6/12 kenar sayılarının eşleme sırası açıklaştırıldı; soru, seçenek ve anahtar değişmedi. Bu son düzeltme için normal ve prefix C4 derlemeleri tamamlandı; son C4 hedef UI turu sekiz vakasının tamamını geçti. Son native/prefix, uzak CI, paket ve yayın kapıları ayrıca aranır. Süre veya beklentiler gevşetilerek PASS üretilmez. En büyük yazı ölçeğinde “Geometrinin” sözcüğünün son harfinin satır atlaması küçük gözlem olarak kayıtlıdır; kırpma ve yatay taşma görülmedi. Uzun locator PNG’sindeki skip-link görüntüsü gerçek odak ve DOM sınırlarıyla ayrıca denetlendi. Ayrıntılar [QA](QA.md) içindedir.

Tam uzak CI, Windows/Linux paketleri, gerçek web, commit/etiket ve indirme yayını henüz kabul edilmedi. Android test APK’sı ayrıca doğrulanacaktır. Fiziksel cihaz, temiz kurulum, portable taşıma ve native iki sürüm kurulumu bu yerel kabulün kapsamında değildir. Video URL eşlemesi güncel erişim/oynatma kabulü değildir.
