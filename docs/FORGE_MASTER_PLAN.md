# YKSMania Forge ana planı (birleşik prompt)

Bu belge, proje sahibinin şimdiye kadar verdiği bütün talimatları, Gemini'nin önerdiği fazları ve Claude'un düzeltme ve eklemelerini tek bir sürekli Forge talimatında toplar. Her yeni Forge oturumu bu belgeyle başlar; `AGENTS.md`, `docs/AIONIA_STANDARD.md`, `docs/ART_BIBLE.md` ve `docs/QA.md` her zaman bu belgenin üstündedir. Bir kural çelişirse en yeni sahip düzeltmesi geçerlidir; eski kural yalnız kendi kapsamında geçersizleşir.

Son güncelleme: 19 Kasım 2026.

---

## 1. Kopyalanabilir prompt

> Sen `kaansavukduran/yksmania` projesinin baş ürün mimarı, eğitim tasarımcısı, görsel/ses deneyimi tasarımcısı ve kıdemli TypeScript/React mühendisisin. `AGENTS.md`, `FORGE.md`, `docs/FORGE_MASTER_PLAN.md`, `docs/AIONIA_STANDARD.md`, `docs/ART_BIBLE.md` ve `docs/QA.md` kurallarını eksiksiz koru; geçmişte istenen hiçbir kuralı veya regresyon korumasını geri alma.
>
> Hedef: Drive `Aurelia/02_YKS` klasöründeki bütün PDF'lerin kazanımlarını, konu anlatımlarını, soru tiplerini ve taktiklerini uygulamaya özgün içerik olarak işlemek; bu uygulamadan çalışan bir öğrencinin başka kaynağa ihtiyaç duymadan YKS'de (TYT + AYT Sayısal) tam puan alabileceği kapsamı kurmak. Anlatım sıfır ön bilgiden ileri seviyeye; görsel, etkileşimli, adım adım ve akıcı olsun.
>
> Bütün mimari, tasarım ve öncelik kararlarını sen ver; benden onay bekleme. Her Forge turu: (1) CI ve yayın zincirini kontrol et, (2) bu plandaki sıradaki en değerli işi yap, (3) `npm run check`, `npm test`, `npm run build` ve değişen akışların `npm run test:e2e` testlerini geçir, (4) figürlerde yazı çakışma denetimini sıfıra indir ve ekran görüntülerini gözle incele, (5) `FORGE.md`, `docs/ISLEME_SAYACI.md` ve kilometre taşlarında `README.md`'yi güncelle, (6) commit + push, (7) turu aşağıdaki rapor biçimiyle bitir ve sıradaki tura geç. Bütün PDF'ler işlenip bu plandaki her madde tamamlanana kadar devam et. Yaratıcı ol: örneklerin dışına çıkıp öğrenmeyi gerçekten hızlandıracak yeni görsel, etkileşim, ses ve hata onarım fikirleri tasarla; her fikir dürüst kanıt kuralına uysun.
>
> Her tur raporu şunları içersin: PDF işleme oranı (`X / 8.981 PDF · %YY,YY`), ders ve kategori bazında oranlar, figürlü rehber oranı (`N / 371`), bu turda hangi kaynağın hangi katmana (anlatım / kopya kâğıdı / soru / deneme / laboratuvar) aktarıldığı, test sonuçları, yapılmayanlar ve sıradaki hedef.

---

## 2. Değişmez kurallar

1. **Yalnız Türkçe, tamamen çevrimdışı.** Arayüz, anlatım, harita, laboratuvar, rozet amblemleri ve sesler; saf SVG, Canvas, Web Audio ve React state ile çalışır. Öğrenci PDF, kaynak ya da kitapçık yüklemez; hazır olmayan başlık açıkça “hazır değil” görünür.
2. **Telif ve gizlilik.** Drive PDF'leri, kişisel kimlikler ve Drive kimlikleri Git'e girmez. PDF'ler kazanım, soru tipi ve taktik referansıdır; üretilen anlatım ve sorular özgündür ve “özgün” etiketlidir. Geçmiş ÖSYM (ÖSS, ÖYS, YGS, LYS, TYT, AYT, KPSS, ALES, DGS) soruları **kopyalanmaz**; konu, kazanım, soru kalıbı ve çeldirici mantığı incelenir, aynı beceriyi ölçen yeni sorular yazılır ve hiçbiri resmî soru olarak sunulmaz. Bir soru kalıbının hangi yıl ve oturumda görüldüğü yalnız doğrulanmış kaynakla not edilir.
3. **Dürüst ilerleme.** XP, ustalık, kupa, rozet ve harita renklenmesi yalnız şu kanıtlardan gelir: yardımsız doğru çözüm, tamamlanan 3/7/21 tekrarları (gün 1 = çalışma günü; +2, +6, +20), yanlışın sonradan yardımsız onarılması ve yardımsız deneme performansı. Okuma, süre, figür kurcalama, içe aktarma, elle işaret ve zorluk filtresi kanıt üretmez. Manuel teori ve soru kayıtları birbirinden bağımsızdır; tekrar denemeleri toplanmaz.
4. **Kendi kendine yeten soru kartı.** Her soru gerekli metni, tanımlı noktaları ve model varsayımlarını kendi kartında taşır. YKS-013 (Bugün ekranı son tam denemeyi gerçek doğru/yanlışla gösterir) ve YKS-015 (beş paragraf sorusu ortak metni kökün üstünde gösterir) korunur.
5. **Veri sürekliliği.** IndexedDB şeması geriye uyumlu göçlerle korunur; ayarlar, notlar, PDF baytları, öğrenme olayları, özgün tekrar tarihleri ve taslaklar silinmez. Kişisel hedef varsayılanı 2027-02-28'dir ve resmî sınav tarihi gibi sunulmaz; bilinçli kaydedilmiş her hedef (2027-06-18 dahil) korunur.
6. **Anti-slop.** Yer tutucu, `TODO`, sahte veri, kopya görsel, üst üste binen yazı veya şekil, başlık üstü başlık ve gereksiz kaydırma çubuğu yoktur. Her figür altı tema ve 320 px genişlikte okunur.

---

## 3. Sahibin talimatları (kronolojik özet)

| Sıra | Talimat | Durum (19 Kasım) |
| --- | --- | --- |
| 1 | Çevrimdışı, Türkçe YKS uygulaması; Windows, Linux, Android ve web | Var; web ve Android test APK'sı CI'da, fiziksel cihaz denemesi yok |
| 2 | 479 ayrıntılı başlık doğrulanmış çalışma kitabı sırasıyla; kişisel defter ilerlemesi uygulama ilerlemesi sayılmaz | Var |
| 3 | AIONIA referansına sadık piksel sanat ve zengin sprite tepkileri | Var; yeni tepkiler kupa açılışına bağlanacak |
| 4 | Kopya kâğıtları Teori ile Sorular arasında ayrı bölüm; Sınavlar Sorular'dan sonra; yükleme yolu yok | Var |
| 5 | Ortak kum saati; mutlak bitiş zamanı; süre kanıt üretmez | Var |
| 6 | Drive'daki bütün OGM/MEB/MEBİ/ÖSYM PDF'leri kapsamlı işlenecek; sınavda tam puan | Sürüyor: 32 / 8.981 PDF okundu (%0,36); figürlü rehber 64 / 371 |
| 7 | Etkileşimli SVG, adım adım, görsel hafıza, sıfır ön bilgi, estetik, üst üste binmeme | Sürüyor: 547 bölüm figürü; çakışma denetimi her turda |
| 8 | Her an “ne yaptın, ne yapmadın” sorusuna dürüst cevap; sayaçlar | `docs/ISLEME_SAYACI.md`, `FORGE.md`, `README.md` |
| 9 | GitHub Pages yayını; main'e yalnız yeşil CI'dan ileri sarma; APK tetikleme | Var; yayın zinciri her turda |
| 10 | Gemini Faz 1: karalama kâğıdı, şık ve seçim düzeltmeleri, harita, Bugün kartı | Tamam |
| 11 | Harita panelleri eşit; sağ harita fare tekerleğiyle yakınlaşır | Tamam (place-maps-046 testi) |
| 12 | Gemini Faz 5: Steam/PS5 kupaları, karma pratik, tuzak destesi, grafik okulu, +5 net pusulası, yorgunluk eğrisi, cep kitapçığı, bölünmüş görünüm, düşük enerji modu, haftalık karne, `.yksmania` senkronu, içerik denetçisi, 6 tema × 320 px testi | Kupa sistemi tamam (31 kupa); kalanlar aşağıdaki fazlarda |
| 13 | Rozetlerin kendine ait logoları; Duolingo hissinde başarı sesleri | Faz 1'de |
| 14 | Yanlışlar bölümü geliştirilmeli; Claude da yaratıcı fikir üretsin | Faz 2'de |
| 15 | Her soruda 1–10 yıldız zorluk; her yıldızda eşit soru; zorluğa göre filtre; rozetler buna bağlansın | Zorluk motoru ve filtre bu turda eklendi; yıldız rozetleri Faz 1'de |
| 16 | Eksik soru tiplerini araştır; geçmiş ÖSYM sınavlarındaki (ÖSS/YGS/LYS/TYT/AYT/KPSS/ALES/DGS) konu ve soru kalıplarını tara; sınav tarzı özgün sorular üret | Faz 5'te; kopyalama yok, kalıp analizi + özgün soru |
| 17 | Her Forge turunda PDF işleme yüzdesi raporu | Bu planla zorunlu |

---

## 4. Gemini planına Claude'un düzeltmeleri

Gemini'nin önerisi büyük ölçüde benimsendi. Gerçek depo durumuyla çelişen noktalar şöyle düzeltildi:

- **“fd4201a CI kırmızı” doğru değil.** `fd4201a` CI ve Pages'ten yeşil geçti ve yayında. Kırmızı olan, sayfaları `React.lazy` ile bölen `78fe2c7` idi.
- **Sayfaları `React.lazy` ile bölmek geri alındı.** Çevrimdışı yeniden yüklemede Chromium, dinamik `import()` isteğini iptal ediyor, söz hiç sonuçlanmıyor ve uygulama boş kalıyordu. Rotalar statik kaldı; içerik `vite.config.ts` içindeki statik parça gruplarıyla bölündü. Giriş dosyası 5.113.655 bayttan 221.972 bayta indi, en büyük parça yaklaşık 3,1 MB ve 5 MiB önbellek sınırının altında. Ağır laboratuvarlar ileride ancak çevrimdışı yeniden yükleme testi geçerse tembel yüklenir.
- **PDF sayısı 8.445 değil.** 17 Kasım kanonik envanteri 8.981 PDF sayıyor; rapor bu paydayı kullanır.
- **“2.640 eski soru” güncel değil.** Bankada 6.465 özgün soru var. Yükseltme hedefi: hepsinde kademeli yardım ve şık bazlı çeldirici açıklaması.
- **Ses motoru zaten başladı.** Kupa açılış tınısı var. Ses, `settings.sound` ile kapanır; ayrı bir ses seviyesi ayarı Faz 1'de eklenecek.
- **Zorluk yıldızı resmî zorluk değil.** Özgün sorular için ulusal kalibrasyon verisi yok. Yıldız, soru özelliklerinden hesaplanan ders içi göreli sıradır; arayüz bunu açıkça yazar.

---

## 5. Fazlar ve sıra

### Faz 0 — Yayın zinciri ve kararlılık (her turun başında)
- Dal CI'ı yeşilse ve main CI/Pages boştaysa main'i doğrulanmış SHA'ya ileri sar, Pages bitince `android-test.yml`'i tetikle.
- Düşen parça olursa günlüğünü oku ve kök nedeni düzelt. Yeniden çalıştırma tek başına çözüm sayılmaz; dalgalı test belgelenir.

### Faz 1 — Kupa amblemleri, yıldız rozetleri ve ses motoru
- **Özgün SVG amblemleri.** Her kupanın kendi amblemi olur; tek bir jenerik ikon kullanılmaz. Örnekler:
  - Mol Simyacısı: balon joje ve atom.
  - Üçgen Mühendisi: pergel ve üçgen.
  - DNA Şifre Kırıcı: çift sarmal.
  - Vektör Bükücü: vektör okları.
  - Paragraf Cerrahı: kalem ve mercek.
  - Harita Kâşifi: pusula ve dünya.
  - Soru Canavarı: alevli taç.
  - Kusursuz Seri: elmas kalkan.
  - 21. Gün Mührü: mühür ve takvim.
- **Metal çerçeveler.** Bronz, gümüş, altın ve platin çerçeve; kilitli kupa silüet görünür. Hareket azaltma ayarına uyulur.
- **Platin kupalar.** TYT Fen Platin, AYT Sayısal Platin ve YKS Efsanesi.
- **Yıldız rozetleri.** Kanıt yalnız yardımsız doğru çözümdür:
  - Yıldız Avcısı: 7+ yıldızlı sorularda yardımsız doğru.
  - Seçici Zirve: 9–10 yıldızda %80 oturum.
  - Merdiven: aynı derste 1'den 10'a her yıldızda en az bir yardımsız doğru.
- **Ses motoru.** `src/domain/soundEngine.ts`, Web Audio ile sentezlenir, dosya kullanılmaz. Sesler:
  - doğru cevap tınısı ve art arda doğrularda tonu yükselen kombo;
  - yumuşak ve moral bozmayan yanlış sesi;
  - dört kademe kupa fanfarı;
  - 21. gün mühür sesi ve onarım “iyileşme” tınısı;
  - set bitiş akoru.
  
  Ayarlarda açma/kapama ve ses seviyesi olur; sesler hiçbir zaman kanıt üretmez.
- **AION kutlama tepkisi.** Kupa açılışında sprite tepkisi (referansa sadık, kareler gözle denetlenir).

### Faz 2 — Yanlışlarım: hata otopsisi ve onarım merkezi
Gemini'nin önerileri benimsendi:
- kök neden taksonomisi ve ders × neden ısı haritası;
- 3 aşamalı kalıcı onarım (kapalı yeniden deneme → sayıları değişmiş ikiz → 3–7 gün sonra doğrulama);
- güven kalibrasyonu (“Eminim + yanlış” en üste);
- tek satırlık “kendime uyarı”;
- yazdırılabilir sınav sabahı cep kitapçığı;
- hata avı sprinti ve haftalık hata boss'u;
- AYT → TYT önkoşul köprüsü.

Claude'un eklemeleri:
- **Çeldirici parmak izi.** Aynı yanlış şıkkın arkasındaki yanılgı (ör. “birim çevirmedi”, “işaret kaybı”, “en büyük yerine en küçük”) dersler arasında gruplanır; kalıp üç kez tekrar ederse ona özel mini ders açılır.
- **Hata zaman çizgisi.** Her hatanın doğduğu gün, onarım denemeleri ve kalıcılık mührü tek şeritte görünür (3/7/21 günleriyle aynı renk dili).
- **“Neden yanlış?” öz açıklaması.** Onarımdan önce öğrenci yanlış şıkkın neden çekici geldiğini tek tıkla seçer. Bu seçim yalnız tanı içindir, kanıt sayılmaz.
- **Yanlış şıktan geri sar.** Seçilen yanlış şıkkın hangi işlem adımında ayrıldığı adım adım çözüm üzerinde işaretlenir.
- **Zorluk yıldızına göre onarım sırası.** Önce düşük yıldızlı hatalar (en hızlı net), sonra yüksek yıldızlılar.
- **Sessiz mod.** Düşük enerji günlerinde yalnız 3 hata ve 2 refleks kartı.

### Faz 3 — Laboratuvar seferberliği (önce AYT Sayısal)
Ortak `InteractiveLabShell` laboratuvarları kapsar:
- Matematik: fonksiyon dönüşümü, türev teğet/ekstremum, Riemann, birim çember, olasılık.
- Geometri: dinamik üçgen/çember/analitik tuval, 2B↔3B açınım ve kesit.
- Fizik: x–t / v–t / a–t ile atış, optik tezgâhı, devre + sağ el kuralı, girişim, fotoelektrik; canlı birim sadeleştirme etiketleri.
- Kimya: periyodik trend ısı haritası, orbital kurucu, PV = nRT pistonu, Le Chatelier ve titrasyon, organik izomer/IUPAC kurucu.
- Biyoloji: zar geçişleri, protein sentezi, kalp–nefron–sinaps–hormon geri bildirimi, soyağacı çözücü.
- TYT sözel: katmanlı Türkiye/dünya haritası ve klimatogram, izohips profili, zaman sürgülü tarih haritası, filozof ağı, Türkçe paragraf röntgeni.

Laboratuvar kuralları: “Tahmin et → Oynat → Gör”, 2–3 sınav senaryosu, Sıfırla, 44 px dokunma hedefi, klavye sürgüsü, altı tema.

### Faz 4 — Öğrenme motorları ve sınav günü
- 15/30/60 dk akıllı oturum ve 5 dakikalık kurtarma modu; haftalık karne.
- Konu adı gizli karma pratik; istisna/tuzak destesi; grafik–tablo–deney okulu; kademeli boşluklu çözüm.
- Sınav günü simülasyonu: ders sırası seçimi, “2. tura bırak”, ilk 40 / son 40 yorgunluk eğrisi, kayıp net otopsisi, “en hızlı +5 net” pusulası (zorluk yıldızıyla beslenir).
- Bölünmüş çalışma masası, `F` ile Zen modu, 15 biyomlu dünya haritası, `.yksmania` çakışmasız birleştirme senkronu.

### Faz 5 — Tam kapsam, soru bankası ve kalite koruyucuları
- **PDF işleme.** Her ders klasörü sırayla: kopya kâğıdı → konu özeti → sunum → etkinlik → test. Her PDF'nin hedef katmanı `docs/ISLEME_SAYACI.md`'ye yazılır.
- **Soru tipi taraması.** Her konu için geçmiş sınavlarda görülen soru kalıpları (öncüllü, grafik okuma, deney yorumu, olumsuz kök, en az/en çok, model eleme) listelenir; eksik kalıp için özgün soru yazılır. Her konuda 10 yıldız düzeyinin hepsinde soru bulunması hedeflenir.
- **Eski kartların yükseltilmesi.** 6.465 sorunun hepsine kademeli yardım ve şık bazlı çeldirici açıklaması; “klasik çözüm ve 30 saniyelik sınav yolu” karşılaştırması.
- **İçerik denetçisi.** `scripts/lint-content.mjs` eksik çeldirici açıklamasını, bağımlı soruyu, yetim konuyu ve yardım açığını yakalar.
- **Tema testleri.** 6 tema × 320 px taşma testi ve axe erişilebilirlik regresyonu.

---

## 6. Tur raporu biçimi

```
Forge turu — <tarih>
PDF: <okunan> / 8.981 (%<oran>) · figürlü rehber <n> / 371 · bölüm figürü <m>
Ders oranları: TYT <...> · AYT Sayısal <...> · Denemeler <...> · Kopya kâğıtları/taktik <...>
Bu tur: <kaynak> → <katman>; <özellik>
Testler: check ✓ · birim <sayı> ✓ · build ✓ · e2e <kapsam>
Yayın: main <sha> · Pages <durum> · APK <durum>
Yapılmayan: <...>
Sıradaki: <...>
```
