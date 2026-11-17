# YKSMania Forge032 — doğrulanmış ilerleme ve devam kaydı

17 Kasım 2026. Bu belge, geliştirme ortamı bağlantısını kaybetmeden önce doğrulanan çalışmayı kaydeder. **0.20.0 uygulama kodu henüz GitHub'a gönderilmedi ve yayımlanmadı.** Bu dal yalnız ilerleme belgesidir. Son doğrulanmış uygulama yayını 0.19.0'dır.

## PDF arşivinin durumu

Aurelia/YKS altındaki güncel envanter **8.936 PDF** içerir. Önceki 8.584 kayda 352 dosya eklendi; silinen dosya yoktur, altı dosyanın metaverisi değişmiştir. 247 klasör ve bütün sağlayıcı devam sayfaları denetlendi. Bu envanter sayımı, bütün dosyaların içeriğinin uygulamaya aktarıldığı anlamına gelmez.

| Güncel kaynak sürümünde doğrulanan kapsam | PDF |
| --- | ---: |
| Bütün öğretim içeriği için tam aktarım doğrulandı | 2 |
| Seçili içerik aktarıldı; kalan maddeler kayıtlı | 7 |
| Aktarım kapsamı henüz kesinleştirilmedi | 8.927 |
| Toplam | 8.936 |

**Belirsiz, hiç işlenmemiş demek değildir.** Hiç işlenmediği ayrıca kanıtlanmış dosya sayısı sıfırdır; bu, arşivde hiç işlenmemiş dosya bulunmadığı anlamına gelmez. Arşivin gerçek tarihsel bitmiş/kısmi/hiç işlenmemiş toplamları bilinmiyor. Bu nedenle bütün arşiv için tamamlanma yüzdesi verilmiyor.

Tamamlanan iki kaynak:

- **Geometrinin Dili ve Doğruda Açılar:** güncel 7 sayfa, 33 kaynak maddesi; 10 anlatım bölümü, 9 çözümlü örnek, 10 hatırlama ve 18 soru ile eşleştirildi. Doğru/ışın/parça, paralel-kesen ve dönme modelleri etkileşimlidir. Eski 4 sayfalık sürüm ayrı korunur; önceki sürümün okuma veya bitiş kararı yeni sürüme taşınmadı.
- **Asal Sayılar:** güncel 14 sayfa, 117 öğretim/kaynakça alt maddesi; önceki 81 örtüşen kaynak kaydının eşlemesi korunur. 20 anlatım bölümü, 12 çözümlü örnek, 8 hatırlama, 40 açıklamalı soru ve ayrı 5 bölümlük kopya kağıdı içerir. 1–50 asal eleği ve çarpan dikdörtgenleri etkileşimlidir. 117 madde ile önceki 81 kayıt farklı sayım birimleridir.

Tam aktarım kararları; kaynak sayfaları ve şekilleri, madde düzeyindeki uygulama karşılıkları, bağımsız içerik denetimi ve gerçek yerel üretim derlemesindeki normal/çevrimdışı kullanım kabulü karşılaştırılarak verildi. Bu iki PDF'nin atıf yaptığı başka kitaplar ve videolar bu tamamlama kararına dahil değildir.

| Kısmi kalan kaynak | Fiziksel sayfa | Açık kapsam |
| --- | ---: | --- |
| MEBİ TYT Matematik Konu Özeti | 160 | Seçili anlatım/şekil eşlemeleri var; kitabın bütünü tamamlanmadı |
| Geometri — Tüm Konular ve Formüller | 16 | Seçili alan/dörtgen/çokgen/katı cisim eşlemeleri var; bütün çeşitler tamamlanmadı |
| Faktöriyel Kavramı | 15 | Temel kavramlar bağlı; bütün kaynak örnekleri, provaları ve hata onarımları tamamlanmadı |
| EBOB–EKOK | 22 | Seçili kavramlar bağlı; kalan sayısal örnek ve problemler kayıtlı |
| Rasyonel Sayılar | 13 | Seçili anlatım bağlı; bütün kaynak örnekleri ve alıştırmaları aktarılmadı |
| Birinci Dereceden Denklemler | 9 | Seçili anlatım bağlı; kalan kaynak varyantları kayıtlı |
| Basit Eşitsizlikler | 9 | Seçili anlatım bağlı; kalan kaynak varyantları kayıtlı |

40 PDF'de uygulamanın en az bir gerçek ders/soru kimliğine açık kaynak bağı bulunur. Bunların hepsi tamamlanmış sayılmaz. 154 PDF için 1.915 farklı dosya/sayfa konumu inceleme kaydı vardır; bilinen dosya sürümleri ayrı sayıldığında 1.919 sayfadır. 59 PDF'nin en az bir kayıtlı sürümünün bütün sayfaları, 95 PDF'nin bazı sayfaları için inceleme kaydı vardır. **Okuma, uygulamaya tam bilgi aktarımı değildir.**

Her PDF'nin özel kaydı dosya kimliğini ve sürümünü, okunan sayfaları, incelenen şekilleri, kaynak maddelerini, bağlı uygulama kimliklerini ve kalan işleri korur. 8.936 satırlık kuyruk ile rapor aynı kanonik defterden türetilir. Özel PDF kimlikleri ve ham kitaplar kamu deposuna eklenmez.

## 0.20.0 geliştirme adayındaki eklemeler

Sekiz yeni ünite: çokgenler, dörtgen aileleri, yamuk–deltoid, paralelkenar ailesi, dik prizmalar, piramitler, kaynakla açı pekiştirme ve asal sayılar.

| Ölçü | Yeni eklenen | Adaydaki toplam |
| --- | ---: | ---: |
| Ayrıntılı anlatım rehberi | 8 | 494 |
| Ayrı kopya kağıdı | 8 | 494 |
| Çalışma başlığı | 8 | 493 |
| Özgün soru | 134 | 6.077 |
| Tam kademeli yardımı olan soru | 134 | 3.437 |
| Kısmi yardımla kalan eski soru | 0 yeni | 2.640 |

Yeni pakette 88 anlatım bölümü, 46 çözümlü örnek ve 44 hatırlama bulunur. Toplam 528 ders/soru seti vardır. Rehber, çalışma başlığı ve soru seti farklı sayım birimleridir; bunlardan müfredat tamamlanma yüzdesi çıkarılmaz. İlk 479 başlığın kimliği ve sırası, önceki 5.943 sorunun ham verisi ve cevap anahtarları karşılaştırma fikstürüyle korunur.

Görseller yalnız süs değildir: çokgenin kenar sayısı değişince üçgenleme, köşegenler ve açı hesapları; cisim ölçüleri değişince açınım, yüzey ve hacim; piramit kesiti değişince uzunluk/alan/hacim oranları birlikte değişir. Gerçek asal eleğinde 2, 3, 5, 7 adımları çalışır; 1'in durumu, bölenler ve çarpan dikdörtgenleri açıklanır.

Öğretim sırası ön bilgi, açıklama, değiştirilebilir görsel, çözümlü örnek, hatırlama ve bağımsız sorudur. Bilgi, yöntem, çözüm adımları, beş seçeneğin gerekçeleri, sık hata ve sonuç denetimi ayrı açılır. Görselle oynama, süre, video veya manuel onay doğru cevap/ustalık/XP sayılmaz. Öğrenci PDF veya kaynak kataloğu yüklemez. Türkçe ürün dili, ayrı kopya kağıtları, 3/7/21 tekrar düzeni, mevcut/Matrix temaları ve bilinçli kaydedilmiş kullanıcı tercihleri korunur.

## Doğrulanan kontroller ve açık kapılar

- Son tamamlanmış yerel birim turunda **1.840 test** geçti. Son C3 düzenlemelerinden sonra başlatılan yeniden kontrol ve test turunun sonucu ortam kesintisi nedeniyle okunamadı.
- C3 hedef kabulünde altı geometri modeli ve asal modeli; dar ekran, büyük yazı, klavye, sayısal SVG karşılıkları, keşfin XP üretmemesi ve çevrimdışı yeniden açılışla denetlendi. Beş model kabul testi, iki açı öğrenme testi ve bir gerçek asal soru testi ayrı başarılı koşulardır; tek tam tarayıcı turu değildir.
- Açı setinin 18 sorusu iki arayüz profilinde de bağımsız doğru, yardımsız tamamlandı. Dokuz çözümlü örnek ve on hatırlama açıldı; Bugün, notlar ve özgün tekrar tarihleri denetlendi.
- Asal setindeki 40 sorunun ve 200 seçenek gerekçesinin matematiği bağımsız incelendi. Gerçek arayüzden ilk **1/40** soru yardımsız doğru çözüldü; kontrol edilmiş taslak çevrimdışı yeniden açılışta korundu. 40/40 arayüz çözümü iddia edilmiyor.
- Gerçek aynı kökenli **0.19 → 0.20 PWA güncellemesi** geçti. Eski arayüzde oluşturulmuş 5/5 paragraf çalışması, notlar, yarım soru taslağı, cevaplı/işaretli branş denemesi, özel tarih, Matrix/Lexend ve özgün 3/7/21 tarihleri korundu. Etkinleştirmede üç ham veri deposu aynı kaldı ve otomatik durum yazımı olmadı. Yeni çokgen/asal modelleri ilk kez çevrimdışı kullanıldı; seçimler süreç yeniden açılışında korundu, XP değişmedi.
- 2024 TYT Matematik 31 ve 2022 TYT Matematik 14 gerçek resmî kitapçık ve cevap anahtarından kontrol edilip bağımsız hesaplandı. Bu, bütün resmî kitapçıkların veya son yirmi yılın aktarıldığı anlamına gelmez.
- Tam tarayıcı listesindeki **1.265 test / 54 dosya** sayıldı; tam uzak CI turu henüz başlatılmadı.
- Yerel Electron ve Pages alt dizini için **107'şer akışlık** koşular başlatıldı. Ortam çevrimdışı olduğundan sonuçları okunamadı: **doğrulanamadı**. Tam CI, Windows/Linux paketleri, son gizlilik taraması ve kamuya açık yeni sürüm kabulü tamamlanmadı.
- 320 pikselde Matrix/Lexend ve en büyük yazı ölçeğinde uzun başlığın son harfinin alt satıra kalması küçük tipografik gözlem olarak kaydedildi; kırpılma ve yatay taşma görülmedi. Uzun ekran görüntüsündeki atlama bağlantısı görüntüsü, gerçek DOM sınırları ve Tab/Enter odağıyla ayrıca incelendi.
- Yeni 0.20 Pages/Vercel/indirme yayını yoktur. Android imzası ertelendi; yeni APK yoktur. Yerel emülasyon, fiziksel cihaz veya native iki sürüm kurulumu kabulü değildir. Video eşlemeleri gerçek oynatma/erişilebilirlik doğrulaması değildir.

## Devam noktası

Geliştirme dalı yerelde `forge/source-transfer-032`, taban commit `52f87bf94f26a14a5fea16d597920f4fd72e8971` idi. Uygulama kodu bu kayıt yazılırken henüz commit/push edilmemişti. Çalışma ortamının durumu açıkça unavailable, bağlantısı offline olarak döndü. Ortam döndüğünde mevcut dosyalar ve test süreçlerinin sonuçları önce incelenmeli; çalışan koşular körlemesine yeniden başlatılmamalıdır.

Özel kanonik defterin dokuz kaynak güncellemesi kesintiden önce uygulandı, işlem günlüğü COMMITTED ve üç dosyanın özeti doğrulandı. Eski 8.927 satırın verisi değişmedi; önceki kaynak sürümleri ve bağlar korundu. Tam/kısmi kararlar yukarıdaki 2/7/8.927 sayımıdır. Tarihsel yardımcı betikleri yeniden çalıştırarak bu kayıtlar ezilmemelidir.

Kanonik üç dosyanın doğrulanmış SHA-256 özetleri:

- ledger.private.json: `0cd7d0074df778d1b45f8f637d61f5477f3c80f7f7491c6ff0542c4f0c14d954`
- summary.private.json: `fa267086e9d9415fb395953fa508d2a627c4c2b18b7622c3718ae1c3e8a803f3`
- PDF-isleme-takibi.private.csv: `b7e492c0807028e70bb9e5a451725dfb67f0443a32d8cb75d9acbb8d553029b5`

Önce kalan yerel kontroller, gizlilik denetimi ve doğru kamu belgeleri tamamlanmalı; ardından kaynak commit'i, tam CI, paketler ve Pages yayını aynı kaynak sürümü üzerinden doğrulanmalıdır. Bu belgeye bakarak yeni uygulama yayını veya arşivin bütünü için tamamlanma kararı verilmemelidir.
