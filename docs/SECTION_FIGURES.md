# Bölüm figürleri: geometri anlatımının her bölümüne şekil

18 Kasım 2026, Türkiye saati. **Geliştirme dalı; henüz main'e alınmadı, yayımlanmadı.** Dal: `claude/laughing-ritchie-l0rre4`, taban `520662c` (0.24.0 adayı).

## Çözülen sorun

Kullanıcı geometri konu anlatımında görsel olmadığını bildirdi. Normal girişten açılan 15 geometri dersinin hepsinde gerçek tarayıcı ölçümü yapıldı. Her derste yalnız bir büyük şekil vardı; o da ilk bölümün sonundaydı ve sayfa açıldığında görünmüyordu. Kalan 6–17 bölüm, anlattığı şekli (paralel kesen, yükseklik, köşegen, açınım…) yalnız yazıyla tarif ediyordu. Kök neden: `GuidedReading` ders başına tek bir `VisualLab` yuvası açıyordu; diğer bölümlerin görsel yuvası yoktu.

## Yapılan

Her rehber bölümü artık kendi başlığıyla eşleşen bir figür gösterebilir (`src/learning/sectionFigures`). Figürler süs değildir:

- Bütün noktalar hesaplanır (kesişim, dikme ayağı, iç/çevrel/diklik/ağırlık merkezi, düzgün çokgen, 3B eğik izdüşüm). Etiketteki sayı ile çizilen geometri aynı matematikten gelir.
- Katı cisimlerde görünmeyen ayrıtlar yüz normallerinden hesaplanıp kesikli çizilir.
- Sürgülü figürlerde öğrenci değeri değiştirir; adımlı figürlerde çizim adım adım kurulur. Oynat düğmesi hareketi azaltma tercihinde gösterilmez.
- Renk rolleri tema token'larından gelir (`--guidance`, `--plot-blue`, `--mint`); mevcut koyu, Matrix, açık ve kontrast temalarında ayrışır. Etiketler arka plan rengiyle çevrelenir.
- Her SVG `role="img"`, başlık ve metin açıklaması taşır; figcaption ne aranacağını söyler. Sonuç satırları `aria-live="polite"`dir.
- Figür değiştirmek, adım ilerletmek veya oynatmak öğrenme kanıtı, XP veya tamamlanma kaydı üretmez; hiçbir şey kaydedilmez.
- Figür kodu ayrı tembel parçadır (`registry-*.js`, ~126 KB) ve PWA önbelleğine girer; ana paket büyümez, çevrimdışı çalışır.

| Ders | Bölüm | Figür | Sürgü | Adımlı |
| --- | ---: | ---: | ---: | ---: |
| Geometrinin dili: temel açılar ve paralellik | 7 | 7 | 5 | 2 |
| Üçgende açılar | 7 | 7 | 4 | 1 |
| Üçgen eşitsizliği ve açı–kenar ilişkileri | 7 | 7 | 3 | 0 |
| Dik üçgen: Pisagor, özel açılar, Öklid | 8 | 8 | 3 | 1 |
| Eşlik ve benzerlik | 8 | 8 | 1 | 2 |
| Yardımcı elemanlar ve merkezler | 11 | 11 | 2 | 1 |
| Çokgenler | 10 | 10 | 1 | 0 |
| Dörtgen aileleri | 12 | 12 | 1 | 1 |
| Yamuk ve deltoid | 10 | 10 | 2 | 2 |
| Paralelkenar ailesi | 10 | 10 | 4 | 1 |
| Dik prizmalar | 8 | 8 | 3 | 1 |
| Piramitler | 8 | 8 | 2 | 1 |
| Geometrinin dili: kaynakla pekiştir | 10 | 8 | 1 | 3 |
| Üçgen ve paralelkenarda alan | 10 | 9 | 3 | 3 |
| Noktanın analitiği | 18 | 15 | 2 | 1 |
| AYT: Öteleme ve dönme | 12 | 11 | 2 | 1 |
| AYT: Yansıma ve simetri | 12 | 11 | 0 | 0 |
| AYT: Çemberin analitiği | 14 | 11 | 4 | 0 |
| AYT: Doğrunun analitiği | 20 | 16 | 3 | 0 |
| **Toplam (19 rehber)** | **202** | **187** | **46** | **21** |

Figürü olmayan 15 bölüm bilinçli bırakıldı: ilk bölümün mevcut etkileşimli modeli aynı içeriği zaten gösterir (doğru/ışın/parça, tam tur), bölüm bir kontrol listesidir ya da kavram yalnız cebirsel bir koşuldur (katsayı koşulları, diskriminant, eşdeğer denklem). AYT figürlerindeki sayılar rehber metnindeki örneklerin aynısıdır (ör. P(3; 4)'ün 3x + 4y − 5 = 0'a göre görüntüsü (−9/5; −12/5), M(2; 1), r = 5, x = 5 kirişi 8).

## Fizik: geometrik optik

Aynı sistem TYT Fizik optik rehberlerine genişletildi: düzlem ayna (8), küresel aynalar (8), ışığın kırılması (8), mercekler (8), gölge ve yarı gölge (7) = **39 figür / 40 bölüm**. Ayna ve mercek çizimleri elle değil, ortak bir ışın izleme fonksiyonuyla üretilir: 1/f = 1/u + 1/v ve m = −v/u'dan görüntü hesaplanır, özel ışınlar bu görüntüye gider; gerçek görüntüde ışınlar kesişir, sanalda yalnız kesikli uzantılar buluşur. Kırılmada Snell yasası ve kritik açı hesaplanır; i > i_c'de kırılan ışın çizilmez. Gölgelerde sınır ışınları ve tam/yarı gölge aralıkları geometriden çıkar. Ayna çizimi paraksiyal modeldir (ışınlar tepe düzleminde yansır gibi çizilir).

Bulunup düzeltilen: aynanın arkasında da F/2F gösteriliyordu (aynada yalnız kendi tarafındaki odak var); iki kaynaklı gölge örneği varsayılan konumda hiç tam gölge göstermiyordu.

## Doğrulama

| Kontrol | Sonuç |
| --- | --- |
| Tip denetimi | PASS |
| Yeni birim testi `tests/section-figures.test.ts` | PASS: her figür var olan bir bölüm başlığına bağlı; sürgü uçlarında ve her adımda NaN/Infinity yok; SVG erişilebilir adla çiziliyor |
| Tam birim testi | PASS: 224 dosya / 2.160 test (bu kayıttan önceki son tam koşu) |
| Normal build | PASS; figür parçası ayrı ve önbellekte |
| Gerçek tarayıcı, 138 figür | Her figür normal ders girişinden açıldı; ekran görüntüleri tek tek incelendi; konsol hatası 0; SVG dışına taşan etiket 0 |
| Matrix 360 px ve açık tema | Örnek dersler görsel olarak incelendi |

Görsel incelemede bulunup düzeltilen gerçek hatalar: açık eğri ve kırık çizgiler SVG polygon olarak kapanıyordu; “kapanmayan çizgi” örneği kapalı görünüyordu (açık şekiller polyline ile çiziliyor); dış açılar figüründe yuvarlanmış etiketlerin toplamı 359° çıkıyordu (tam sayı dönüşlü beşgenle yeniden kuruldu); açınımda yan yüzler 2×2 çizilip 6 diye etiketlenmişti (3×2'ye düzeltildi); bir açıklama 72° derken şekil 48° gösteriyordu; eşit kenarlar “>” ile sıralanıyordu; piramidin iç yüksekliği düz çiziliyordu (kesikliye çevrildi); çok sayıda uzunluk etiketi şeklin içine düşüyordu (karşı köşeden uzağa yerleşen etiket kuralı eklendi).

## Mevcut modelde bulunan ve düzeltilen hata

`geometry-right-framing024` testi değiştirilmemiş main derlemesinde de başarısızdı: dik üçgen modelinde AB = 2, AC = 12 iken H noktası B'ye çok yakın düşüyor; 320 px, arayüz %200, yazı %150 koşulunda H ve B etiketleri çakışıyordu. H etiketi artık hipotenüsün dışına, yakın köşeden uzağa yerleşir; aynı test masaüstü ve 320 px'te geçer.

İkinci mevcut hata: `next-thirty-units` testinin beş kimya dersi (katılar–viskozite, buharlaşma, kaynama–bağıl nem, gazlar–plazma, doğa ve kimya) değiştirilmemiş main'de de başarısızdı. 320 px ve büyük yazıda “Tahminimi karşılaştır” düğmesinde “Tahminimi” kelimesi ortadan bölünüyordu. Diğer kimya modellerindeki dar ekran düğme kuralı (`forge012Chemistry.css`) eklendi; beş ders de geçiyor.

## Açık kalanlar

- Kalan TYT Fizik rehberleri (hareket, kuvvet, enerji, elektrik, dalgalar, basınç…) ve diğer dersler için bölüm figürleri. Ölçüm: geometri dışındaki ~7.500 rehber bölümünün hiçbirinde bölüm figürü yoktu.
- Bu dalın tam uzak CI/E2E, Pages ve Release koşuları; dal main'e alınmadan önce yapılmalı.
- Vercel: önceki kayıtta canlı adres HTTP 402 veriyordu. Bu bir kod değil Vercel hesabı/proje durumu sorunudur; bu çalışma ortamından iki canlı adrese ağ erişimi yoktu, yeniden doğrulanamadı.
- PDF kanonik defteri bu turda değişmedi (8.981: 7 tam / 2 kısmi / 8.972 belirsiz); figürler kaynak kapanışı sayılmaz.
