# İşleme sayacı

Her geliştirme turunda güncellenir. Sayılar yalnız gerçekten yapılmış işi gösterir; bir PDF'nin okunması, uygulamadaki içeriğin o PDF'yi tamamen kapsadığı anlamına gelmez.

## Son güncelleme: 19 Kasım 2026 (Türkiye saati)

### Drive PDF arşivi (Aurelia/YKS)

| Ölçü | Değer |
| --- | ---: |
| Kayıtlı toplam PDF (kanonik envanter, 17 Kasım taraması) | 8.981 |
| Kanonik defterde öğretim aktarımı **tam** | 7 |
| Kanonik defterde **kısmi** | 2 |
| Bu dalda (Claude turları) okunup uygulamaya eşlenen PDF | 6 |
| Okunduğu doğrulanan farklı PDF toplamı (7 + 2 + 6) | 15 / 8.981 (%0,17) |

Arşivdeki PDF'lerin büyük kısmı aynı konunun farklı biçimleridir (TYT konu özeti, “Dersler Cepte” sunumu, etkinlik, okuma metni, deneme). Bu yüzden PDF yüzdesi konu kapsamını ölçmez; konu kapsamı aşağıdaki rehber tablosundadır.

Bu dalda okunan PDF'ler (metin çıkarımıyla; matematik sembolleri kısmen bozuk geldi):

| PDF | Uygulamaya eşlenen | Durum |
| --- | --- | --- |
| 9. sınıf 022 Köklü İfadeler sunumu | `koklu-sayilar` bölüm figürleri (kesirli üs, xⁿ = a çözüm sayısı) | Kısmi |
| 019 TYT 9. Sınıf Fizik – Mekanik Enerji | `enerji-ve-hareket` figürleri; referans noktası, sabit hızla yükselmede mekanik enerji artışı, yay enerjisi taktikleri | Kısmi |
| 054 TYT 10. Sınıf Fizik – Yay Dalgaları, Atma ve Periyodik Dalga | `yay-dalgalari` figürleri; “öndeki nokta dengeden uzaklaşır” kuralı, v = √(F/μ) | Kısmi |
| 028 TYT 9. Sınıf Fizik – Genleşme | `genlesme` figürleri; halka–silindir, ilk taşan sıvı, bimetal taktikleri | Kısmi |
| 025 TYT 9. Sınıf Fizik – Hal Değişimi | `hal-degisimi` figürleri; −20 °C buzdan 120 °C buhara beş basamak, Le = Ld, Lb = Ly | Kısmi |
| 026 TYT 9. Sınıf Fizik – Isıl Denge | `isi-ve-sicaklik` figürleri; T₂ ≥ Td ≥ T₁, sıcaklığı değişmeyen cisim hâl değiştirir taktiği | Kısmi |

PDF içeriği depoya kopyalanmaz; sorular özgündür, resmî ÖSYM sorusu olarak etiketlenmez.

### Ders başına kapsam (19 Kasım, uygulama verisinden sayıldı)

“Resmî konu” = uygulamadaki ÖSYM tabanlı konu listesi (`curriculum.json`, 341 konu). “Ders” = uygulamadaki ayrıntılı çalışma başlığı; bir resmî konu birden çok derse bölünebilir. Sorular özgündür.

| Ders | Resmî konu | Uygulama dersi | Anlatımlı | Soru (toplam) | Video önerili | Bölüm şekilli |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| TYT Türkçe | 22 | 34 | 33 | 380 | 33 | 0 |
| TYT Matematik | 31 | 45 | 40 | 735 | 40 | 1 |
| TYT Geometri | 16 | 19 | 19 | 217 | 14 | 19 |
| TYT Fizik | 20 | 28 | 24 | 311 | 24 | 17 |
| TYT Kimya | 17 | 57 | 55 | 535 | 55 | 0 |
| TYT Biyoloji | 18 | 45 | 36 | 515 | 36 | 0 |
| TYT Tarih | 22 | 34 | 24 | 390 | 24 | 1 |
| TYT Coğrafya | 21 | 40 | 40 | 400 | 40 | 0 |
| TYT Felsefe | 15 | 17 | 17 | 190 | 17 | 0 |
| TYT Din | 19 | 20 | 20 | 371 | 20 | 0 |
| AYT Matematik | 36 | 18 | 17 | 253 | 17 | 0 |
| AYT Geometri | 9 | 4 | 4 | 40 | 4 | 4 |
| AYT Fizik | 32 | 47 | 46 | 541 | 46 | 0 |
| AYT Kimya | 34 | 56 | 55 | 680 | 55 | 0 |
| AYT Biyoloji | 29 | 76 | 75 | 907 | 75 | 0 |
| **Toplam** | **341** | **540** | **505** | **6.465** | **500** | **41** |

Bulunan gerçek boşluklar (resmî listede olup uygulamada ayrı dersi olmayan konular):

| Resmî konu | Durum |
| --- | --- |
| TYT-GEO-13 Çemberde açı, kiriş ve teğet | **19 Kasım'da eklendi** (11 bölüm, 10 şekil, 3 çözümlü örnek, 12 özgün soru, kopya kâğıdı) |
| TYT-GEO-14 Daire, daire dilimi, çevre ve alan | **19 Kasım'da eklendi** (10 bölüm, 9 şekil, 3 çözümlü örnek, 12 özgün soru, kopya kâğıdı) |
| TYT-GEO-15 Silindir, koni, küre (prizma ve piramit var) | **19 Kasım'da eklendi** (10 bölüm, 9 şekil, 3 örnek, 12 özgün soru — öncüllü I–II–III dahil, kopya kâğıdı) |
| TYT-GEO-09 Dik üçgende trigonometrik oranlar | **19 Kasım'da eklendi** (9 bölüm, 8 şekil, 3 örnek, 12 özgün soru, kopya kâğıdı) |
| TYT-GEO-06 Özel üçgenler | Ayrı ders yok (üçgen derslerinde dağınık) |
| AYT-GEO-04/05/06 Çember ve daire | Ders yok (TYT çember dersi temel olarak kullanılabilir) |
| AYT-GEO-07 Katı cisimler | Kısmi |
| AYT Matematik | 36 resmî konuya karşı 18 ders: konular birleşik anlatılıyor; ayrıntılı eşleme yapılmadı |

### Sayısal konu rehberlerinde bölüm figürü

| Ders | Rehber | Figürlü rehber |
| --- | ---: | ---: |
| TYT Matematik | 40 | 1 |
| TYT Geometri | 19 | 19 |
| TYT Fizik | 24 | 17 |
| TYT Kimya | 55 | 0 |
| TYT Biyoloji | 36 | 0 |
| AYT Matematik | 17 | 0 |
| AYT Geometri | 4 | 4 |
| AYT Fizik | 46 | 0 |
| AYT Kimya | 55 | 0 |
| AYT Biyoloji | 75 | 0 |
| **Toplam** | **371** | **41 (%11,1)** |

Toplam bölüm figürü: 382 (434 bölümde; ilk sözel figürler: Selçuklu savaş şemaları). Soru tipi taktiği: 42 (34 konu taktiği + 8 yöntem taktiği); taktik kütüphanesinde 9 yöntem, 19 özgün çözümlü örnek.

TYT Fizik'te figürü olmayan 7 rehber: fizik bilimine giriş, madde ve özkütle, prizmalar ve renkler, ses ve deprem dalgaları, ışık bilgisi, durgun elektrik, mıknatıslar ve manyetik alan.

## Tur geçmişi

| Tarih | Eklenen | Okunan PDF | Sayısal figürlü rehber |
| --- | --- | ---: | ---: |
| 18 Kasım | Geometri, optik, köklü sayılar, mekanik, akışkan ve devre figürleri; 23 taktik | 1 | 30 / 367 |
| 19 Kasım | Enerji (20), dalgalara giriş (9), yay dalgaları (9), su dalgaları (9) figürleri; 7 taktik; çizgisiz ölçü etiketleri düzeltildi | 2 | 34 / 367 |
| 19 Kasım (2) | Isı ve sıcaklık (9), genleşme (8), hal değişimi (7) figürleri; 4 taktik | 3 | 37 / 367 |
| 19 Kasım (3) | Yeni ders: Çemberde açı, kiriş ve teğet (10 şekil, 12 soru, kopya kâğıdı); denemelerde ipucu her zaman açık | 0 | 38 / 368 |
| 19 Kasım (4) | Yeni ders: Daire, daire dilimi, çevre ve alan (9 şekil, 12 soru, kopya kâğıdı); kalıcı tur kuralları ve laboratuvar planı (docs/FORGE_ROADMAP.md) | 0 | 39 / 369 |
| 19 Kasım (5) | Yeni ders: Silindir, koni ve küre (9 şekil, 12 soru); öncüllü soruların satır satır gösterimi | 0 | 40 / 370 |
| 19 Kasım (6) | Yeni ders: Dik üçgende trigonometrik oranlar (8 şekil, 12 soru) | 0 | 41 / 371 |
| 19 Kasım (7) | Tarih: Malazgirt, Miryokefalon ve Kösedağ aşama aşama oynatılan savaş şemaları + 1071–1243 karşı güç zaman şeridi (4 figür) | 0 | 41 / 371 (sayısal değişmedi) |
| 19 Kasım (8) | Taktik kütüphanesi: Drive 08_Taktik Dosya'daki 9 yöntem (dizin + 9 belge okundu) özgün örneklerle uygulamaya; ipucu panelinde 8 yöntem | 0 (10 Drive dokümanı okundu, PDF değil) | 41 / 371 |
