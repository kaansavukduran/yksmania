# Forge yol haritası ve kalıcı tur kuralları

19 Kasım 2026. Kullanıcı bütün paketleri onayladı ve döngüsel, onay beklemeden ilerlenmesini istedi. Bu dosya planın tek kaynağıdır; ilerleme sayıları [ISLEME_SAYACI.md](ISLEME_SAYACI.md), tur kayıtları [FORGE.md](../FORGE.md) içindedir.

## Her turda zorunlu 6 adım

1. **Hedef:** Tek, yüksek etkili dikey dilim seç. Açık regresyon veya yarım iş varsa önce onu kapat.
2. **İçerik kalitesi:** Yer tutucu, sahte veri, tekrar eden şablon yok. Sorular ÖSYM biçimlerini kullanır (öncüllü I–II–III, grafik/tablo/deney yorumu, günlük yaşam bağlamı). Her çeldiricinin hangi yanılgıyı hedeflediği yazılır. Sorular özgündür, resmî soru olarak etiketlenmez.
3. **Laboratuvar standardı:** Yeni laboratuvarlar `src/learning/labs/` altında ortak `InteractiveLabShell` ile; saf SVG/Canvas, çevrimdışı, tembel yüklü. Her birinde Tahmin et → Oynat → Gör görevi, 2–3 sınav senaryosu düğmesi, Sıfırla, klavye ve en az 44×44 px dokunma hedefleri, dört temada okunabilirlik, azaltılmış hareket desteği. Keşif 0 XP.
4. **Dürüst ustalık:** Okuma, süre, keşif, işaretleme ve dosya içe aktarma XP/ustalık üretmez. Yalnız bağımsız doğru çözüm, 3/7/21 hatırlama ve gerçek hata onarımı.
5. **Doğrulama kapısı:** `npm run check`, `npm test`, `npm run build`, değişen akışların tarayıcı testleri (erişilebilirlik denetimi dahil). Kırık varsa yeni işe geçilmez. Şema değişirse geriye uyumlu dönüşüm ve birim testi; kullanıcı verisi sıfırlanmaz.
6. **Devir:** `FORGE.md` (eklenen, test sayıları, kalan açık, sıradaki hedef) ve işleme sayacı güncellenir; main'e gönderilir; Pages ve APK kontrol edilir; sonraki tura geçilir.

## Paket sırası

| Forge | Dikey dilim | Durum |
| --- | --- | --- |
| 040 | Eksik resmî geometri konuları: çember ✓, daire ✓, silindir–koni–küre ✓, dik üçgende trigonometri ✓; kalan: AYT çember–daire derinleştirme | Büyük ölçüde tamam |
| 041 | Tek anlatım türü: numaralı sayfalar, sayfa çevirme düğmeleri ve tuşları, kaldığı sayfayı açma | Tamam (19 Kasım) |
| 042 | Soru UX: şık eleme ✓, karalama kâğıdı ✓, klavye kısayolları (1–5/A–E, H, Enter) ✓; kalan: Space kum saati, F zen modu, Web Audio | Büyük ölçüde tamam |
| 043 | Hata otopsisi: neden taksonomisi ✓, kapatıp yeniden çöz ✓, hata haritası ✓; kalan: Hata Avı Sprinti, deneme sonu kayıp net raporu, turlama/süre nabzı | Kısmen tamam |
| 044 | Taktik kütüphanesi (Drive'daki 9 yöntem) ✓ + aktif kopya kâğıdı (boşluk doldurma) ✓; kalan: önkoşul köprüsü | Büyük ölçüde tamam |
| 045 | Akıllı oturum başlatıcı (15/30/60 dk), tempo göstergesi, en yüksek net getirili 3 konu | Sırada |
| 046 | Dürüst oyunlaştırma: biyom haritası, AIONIA çalışma odası, haftalık Hata Boss'u | Sırada |
| 045a | Tarih savaş şemaları (Malazgirt, Miryokefalon, Kösedağ, karşı güç şeridi) ✓ | Tamam |
| 047+ | Görsel laboratuvarlar (aşağıda), şekil kapsamı ve kısmi yardımlı kartların tam yardıma yükseltilmesi | Her turda |

## Görsel laboratuvar planı (ders ders)

Her laboratuvarın bir öğrenme hedefi ve bir “tahmin et” görevi vardır; sınav senaryoları gerçek soru tiplerinden seçilir.

**Geometri.** Dinamik üçgen tuvali: köşeleri sürükle, açıortay/kenarortay/yükseklik ve dört merkezi anlık izle; “ağırlık merkezi kenarortayı 2:1 böler” görevini ölç. Çember laboratuvarı: noktaları yay üzerinde kaydırıp çevre açı, teğet–kiriş, kuvvet bağıntılarını sına. Katı cisim açınım oynatıcısı: prizma, piramit, silindir, koni düz açınımdan katlanır; kesit alanı ve hacim oranı. Analitik düzlem: doğru/çember denklemi sürgüleriyle, uzaklık ve kesişim.

**Matematik.** Fonksiyon dönüşüm atölyesi: f(x − a) + b, |f(x)|, f⁻¹ simetrisi; türevde teğeti eğri üzerinde gezdirme, ekstremum yakalama; integralde Riemann dikdörtgenleri. Birim çember makinesi: sin, cos, tan uzunlukları ve dalga grafiği eşzamanlı. Olasılık masası: Venn ile koşullu olasılık, 1.000 deneme simülasyonu teorik değerle karşılaştırma. Sayı doğrusu ve eşitsizlik çözüm kümesi tuvali.

**Fizik.** Hareket ve atış: v₀, θ, μ sürgüleri; yörünge ile x–t, v–t, a–t grafikleri birlikte. Optik tezgâhı: cismi F ve M arasında sürükle, görüntü özelliği anlık (mevcut ışın izleyiciyle). Devre masası: seri/paralel parlaklık, akım yönü; manyetik alanda sağ el kuralı. Dalga leğeni: girişim düğüm/karın çizgileri; fotoelektrik: frekans ve şiddet ayrı ayrı.

**Kimya.** Orbital kurucu (kutucuklara spinli elektron), periyodik trend ısı haritası. Gaz pistonu: P, V, T, n ilişkisi molekül hızıyla. Denge (Le Chatelier) müdahalesi ve derişim–zaman grafiği; titrasyon eğrisi ve indikatör rengi. Organik molekül kurucu: zincir + fonksiyonel grup → IUPAC adı, izomer karşılaştırması.

**Biyoloji.** Hücre ve zar geçişi: hipo/izo/hipertonik ortamda turgor–plazmoliz. DNA → mRNA → protein bandı: kodon eşleme, tek baz mutasyonunun etkisi. Sistem akış haritaları: büyük/küçük dolaşım, nefron, sinaps ve aksiyon potansiyeli, hormon geri bildirimi. Punnett karesi ve soyağacı çözücü (X'e bağlı dahil).

**Coğrafya.** Katmanlı dünya ve Türkiye haritası: iklim, bitki örtüsü, akıntılar, levha sınırları, Türkiye yer şekilleri ve nüfus; bölgeye tıklayınca klimatogram. İzohips → profil dönüştürücü. Eksen eğikliği ve mevsim simülatörü (mevcut modelin seçim kutuları sürüklenebilir Dünya ile değiştirilir).

**Tarih.** Zaman sürgülü harita: devlet sınırları, ticaret yolları, savaş okları. Neden → olay → antlaşma zinciri kartları.

**Felsefe ve Din Kültürü.** Filozof–akım ağ haritası (varlık, bilgi, ahlak, siyaset, sanat düğümleri; karşıt akımlar). Kavram matrisi ve eşleştirme kartları.

**Türkçe.** Paragraf röntgeni: ana düşünce, yardımcı düşünce, geçiş ifadeleri vurgusu; sürükle-bırak cümle sıralama ve akışı bozan cümle. Kök–ek ve cümle ögeleri parçalayıcı.

Öncelik: Sayısal (Kaan'ın Tıp hedefi) → Türkçe → sosyal dersler. Seçim kutusu + sürgü + onay kutusu tipindeki eski kontroller, laboratuvar yenilendikçe doğrudan sürüklenebilir nesnelere çevrilir.
