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
| **Toplam** | **144** | **138** | **37** | **20** |

Figürü olmayan 6 bölüm bilinçli bırakıldı: ilk bölümün mevcut etkileşimli modeli aynı içeriği zaten gösterir (doğru/ışın/parça, tam tur) ya da bölüm bir kontrol listesidir. AYT geometri rehberleri (doğrunun analitiği, çemberin analitiği, öteleme–dönme, yansıma–simetri) bu turda ele alınmadı.

## Doğrulama

| Kontrol | Sonuç |
| --- | --- |
| Tip denetimi | PASS |
| Yeni birim testi `tests/section-figures.test.ts` | PASS: her figür var olan bir bölüm başlığına bağlı; sürgü uçlarında ve her adımda NaN/Infinity yok; SVG erişilebilir adla çiziliyor |
| Tam birim testi | PASS: 224 dosya / 2.160 test (bu kayıttan önceki son tam koşu) |
| Normal build | PASS; figür parçası ayrı ve önbellekte |
| Gerçek tarayıcı, 138 figür | Her figür normal ders girişinden açıldı; ekran görüntüleri tek tek incelendi; konsol hatası 0; SVG dışına taşan etiket 0 |
| Matrix 360 px ve açık tema | Örnek dersler görsel olarak incelendi |

Görsel incelemede bulunup düzeltilen gerçek hatalar: dış açılar figüründe yuvarlanmış etiketlerin toplamı 359° çıkıyordu (tam sayı dönüşlü beşgenle yeniden kuruldu); açınımda yan yüzler 2×2 çizilip 6 diye etiketlenmişti (3×2'ye düzeltildi); bir açıklama 72° derken şekil 48° gösteriyordu; eşit kenarlar “>” ile sıralanıyordu; piramidin iç yüksekliği düz çiziliyordu (kesikliye çevrildi); çok sayıda uzunluk etiketi şeklin içine düşüyordu (karşı köşeden uzağa yerleşen etiket kuralı eklendi).

## Açık kalanlar

- AYT geometri rehberleri ve geometri dışındaki dersler için bölüm figürleri.
- Bu dalın tam uzak CI/E2E, Pages ve Release koşuları; dal main'e alınmadan önce yapılmalı.
- Vercel: önceki kayıtta canlı adres HTTP 402 veriyordu. Bu bir kod değil Vercel hesabı/proje durumu sorunudur; bu çalışma ortamından iki canlı adrese ağ erişimi yoktu, yeniden doğrulanamadı.
- PDF kanonik defteri bu turda değişmedi (8.981: 7 tam / 2 kısmi / 8.972 belirsiz); figürler kaynak kapanışı sayılmaz.
