# Güncel durum

25 Kasım 2026 · GitHub Pages yayınları sırayla doğrulandı. Her biri main CI, Pages build, deploy ve verify-published ile geçti; canlı öğrenci akışı 118/118 PASS. [GitHub Pages](https://kaansavukduran.github.io/yksmania/)

| Sürüm | Main |
| --- | --- |
| 0.181.0 | bbf10ce27f4576ef12bd908e4a949da0542a867c |
| 0.187.0 | 446ba63da3296de53054bdf6c77246c8dc923c5c |
| 0.189.0 | 1c90275cfcccaced0a862adbcf2e2fcbc932965b |
| 0.194.0 | a2d7ff62006f9af3edc27208461eb37cb2b56e90 |
| 0.195.0 | 80aec7b9468e07edc1257c9fd438ba4dfab3397c |
| 0.196.0 | aadbfbb53f53579bd49686c4c21585087d8f01ab |
| 0.197.0 | 1642c3286e672d6cae6584c197e4d1f6535191d9 |
| 0.198.0 | 564b192ade762caaa65f676f931091191ff1804f |
| 0.199.0 | d2f7ab1a1116fc409f2e732da4cbc616784bb3c6 |
| 0.200.0 | f0553c368f9765137ba071b8af2b06623adf473b |
| 0.201.0 | a21d15570ad71332b09cacd0192e3135df7f4466 |
| 0.202.0 | d098e6c0c0a302e9bc6685af6a1f5e3601e60da1 |
| 0.203.0 | 66b08ebbbe7b317ad10cb7093be2710a0f9c08a4 |
| 0.204.0 | f7e7f74b02eb70358411653ac9f342154b01f5ba |
| 0.205.0 | 027fbee5955f7aa6ab147f846a5e89524911af71 |
| 0.206.0 | e6623f221d41b63ba6fc0041fddac28000cf37a2 |
| 0.207.0 | 6f01dd7cf25c1cba9cca756e5e76328771d9d8e2 |
| 0.208.0 | a8756c1fd5c11317aa843240d099d272e755ed21 |
| 0.209.0 | 8ac4e9bd7695081d43e98517ead591990cb5a7bc |
| 0.210.0 | ddd491a8a339a186e72a5e74e405ab150898dbd8 |

Cloudflare 0.177.0'da kaldı; sahibin kararıyla ertelendi. Android yalnız kişisel imzalı test paketi. İki site arası yedek aktarım testi tamamlanmadı, kabul sayılmaz.

0.194.0 ve 0.197.0 main CI'ı ilk kurulumda service worker etkinleşmediği için düştü, yeniden denemede geçti. Nedeni: ön bellek kurulumu düşünce işçi `redundant` olur, kayıt hatası gelmez, sayfa yenilenene kadar çevrimdışı hazırlık yeniden denenmez. 0.200.0 bunu aynı sayfada en fazla iki yeniden denemeyle onardı; main CI 45691856232 ilk denemede geçti, Pages 45698560381.

[Konu kapsamı](../docs/KONU_KAPSAMI.md) 510 başlık · TYT Matematik ve Geometri 64, Fen 115, Türkçe ve Sosyal 134, AYT Sayısal 197 konu çevrimdışı rotalarda sınandı. [PDF aktarımı](../docs/ILERLEME.md) · [Forge](../FORGE.md)

Derinleştirme 1. tur 0.201.0 (main CI 45711309496, Pages 45716654360, canlı 118/118): TYT sayma ve olasılık 032–036 her biri +1 veri tablosu, +2 kaba kuvvetle sınanmış çözümlü örnek, Kopya Kağıdında aynı tablo.

Derinleştirme 2. tur 0.202.0 (PR 24 CI tamamı yeşil, main CI 45734611237, Pages 45738950338 build/deploy/verify-published, canlı 118/118): Tek-çift, Asal, Faktöriyel; kabul edilmiş rehberler parmak iziyle korunduğu için ekler `theorySupplements` görüntüleme katmanında (artık `examples` da alır).

Derinleştirme 3. tur 0.203.0 (PR 25 CI tamamı yeşil, main CI 45746666675, Pages 45751164272 build/deploy/verify-published, canlı 118/118): Temel açılar 031 (8 açı tablosu), Trigonometrik oranlar 040 (özel açılar iki üçgenden), Daire 040 (r=6 dilim tablosu; mevcut 60° parça eki korunur, yeni ek yanına). Kaynak: `src/learning/geometryDepth203.ts`, test `tests/geometry-depth203.test.ts` (doğru yönleri, Math.sin/cos/tan, sayısal integral).

Denetim ve optimizasyon 0.204.0 (PR 26; PR CI'ında guidance-029 yeni "ve"+sayı yazım kuralına göre güncellendi, math.spec SW etkinleşme zaman aşımı yerelde 17/17 geçti; main CI 45773137866 ilk denemede planning.spec 320px'te bir kez düştü, yerelde 3 tekrar 30/30 geçti, başarısız iş yeniden çalıştırıldı; ikinci denemede osym-brand044 SW etkinleşme zaman aşımı, üçüncü deneme başarılı; Pages 45785421938 build/deploy/verify-published, canlı 0.204.0 118/118) (yazilim-denetle + code-optimization, hedef main 66b08eb):
- A1 Orta: ilk öğrenme oturumu geri alınınca dersin 3/7/21 tekrarları kalıcı siliniyordu; artık kalan en erken öğrenme oturumuna bağlanır (`undoSession`, test `undo-session-reviews`).
- B1 Orta: uygulama denemeleri hep "learning" kipinde başlattığı için yardımsız deneme kupaları kazanılamıyordu; bağımsızlık artık açılan yardım düzeyinden okunur (`achievements.ts`, test `exam-trophy-independence`).
- B2 Düşük: eski boyutta açılıp bitirilen set tamamlanmış sayılmıyordu; oturum açılan set boyutunu (`questionCount`, isteğe bağlı alan) saklar, eski kayıtlar eski kuralla okunur (test `legacy-set-completion`).
- A2 Düşük: yedek dosya adı UTC tarihiydi; `localDate()`.
- C1 Düşük: bitişik kelimeli kart metinleri `displayFixes` ile onarıldı (içerik kayıtları bayt bayt korunur).
- Performans: Sınavlar sayfası her girişte bütün soru anlık görüntülerini yeniden kuruyordu; ders başına önbellek. 4x CPU kısıtında tekrar giriş 638–697 ms → 77–94 ms (CONFIRMED, iki A/B ölçümü). İlk giriş ~0,5 s kalır. Soğuk ilk açılış 4x'te ~6,1 s (bütün içerik modulepreload), SW ile sıcak açılış 1,45 s; içeriği tembel yüklemek bilinçli statik rota kararına (Chromium çevrimdışı yenileme hatası) aykırı, Katman 3 öneri.
- Ölü kod: 65 kullanılmayan bildirim silindi; `noUnusedLocals` tsconfig'de açık. knip bulguları (scripts, sw.js, Inter, workbox) yanlış pozitif.

Derinleştirme 0.205.0 (PR 27 CI tamamı yeşil, main CI 45788668180, Pages 45795102686 build/deploy/verify-published, canlı 118/118): 0.201–0.203 tablolarının on bir bölümüne aynı veriden figür (`sectionFigures/depthFigures200.ts`, test `depth-section-figures`); Çemberde açı, Silindir-koni-küre, Üslü sayılar, Çokgenler, Dik prizmalar, Piramitler tablo + 2 örnek + Kopya Kağıdı + figür (`geometryDepth206.ts`, test `geometry-depth206`). Yerelde check, 413 dosya / 5.786 test, build, Playwright 154/154 (tam figure-overlap-052 ve layout-gate-052 dahil).

Açık konu: CI'da tarayıcı testleri `--workers=2` ile koşarken service worker bazen 30 sn içinde etkinleşmiyor (math.spec, osym-brand044; yerelde 0.203 ve 0.205'te ~3,2 sn). Yeniden denemede geçiyor; CI raporu bu ortamın ağından indirilemedi, kök neden açık.

Derinleştirme 0.206.0 (PR 28 CI yeşil; main CI 45798168229 ilk denemede osym-brand044 30 sn bütçesini aştı, ikinci deneme geçti; Pages 45807858968, canlı 118/118): Üçgen merkezleri, Eşlik-benzerlik, Dik üçgen, Paralelkenar ailesi, Yamuk-deltoid (`geometryDepth205.ts`, test `geometry-depth205`).

Derinleştirme 0.207.0 (PR 29 CI yeşil, main CI 45820596684, Pages 45827485078 build/deploy/verify-published; canlı kabul iki denemede vakaların hepsi geçti (112/112 ve 118/118) yük altında toplam 11 dk sınırı iki kez aşıldı; yük düşünce üçüncü deneme 118/118 PASS): Üçgen eşitsizliği, Dörtgen hiyerarşisi, Birinci dereceden denklemler, Basit eşitsizlikler, Mutlak değer (`depth207.ts`), Temel kavramlar, Ardışık sayılar, Sayı problemleri, Kesir problemleri, Rasyonel sayılar (`depth208.ts`). 0.201.0'dan beri 32 TYT Mat/Geo dersi tablo + 2 örnek + figür aldı; alandaki her ders en az 5 örnek taşır. 6+ örnekli 32 ders henüz ek tablo almadı.

Derinleştirme 0.208.0 (TYT Fen başlangıcı; PR 30 CI yeşil, main CI 45841292452, Pages 45847935727, canlı 118/118 dördüncü denemede): Kimya'nın 3 örnekli dokuz dersi (`depth209.ts` ölçülmüş IE/EN değerleri NIST/CRC kaynaklı, `depth210.ts` GHS/CLP, atom modelleri, Z=1–20 adresleri). osym-brand044 testi main CI'da iki kez 30 sn bütçesini aştığı için 90 sn'ye çıkarıldı (0.207.0 dalı).

Derinleştirme 0.209.0 (PR 31; CI'da sw-registration-retry üç kurulum denemesini 5 sn'de bekliyordu, paylaşılan makinede yetişmedi, bekleme 30 sn'ye çıkarıldı, dördüncü deneme olmaması kontrolü aynen; main CI 45861997285, Pages 45867749935, canlı 118/118 ilk denemede): Biyoloji on ders (`depth211.ts` sınıflandırma, `depth212.ts` hücre ve bölünme).

Canlı kabul kök nedeni (0.207.0–0.208.0): bu oturum makinesinin diski %98 doluydu (1,1 GB boş). Chromium depolama kotasını boş diske göre ayarladığı için 40 MB çevrimdışı önbellek test sırasında boşaltıldı; çevrimdışı vakalarda içerik paketleri `ERR_FAILED` verdi ve sayfa boş kaldı. Eksik paketlerin hepsi yayındaki önbellek listesinde ve sunucuda vardı. Birleşmiş 17 worktree ve yeniden üretilebilir build çıktıları silinince (3,8 GB boş) aynı test 118/118 geçti. Her turdan sonra dist/ silinir. Disk yeniden dolduğunda asıl tüketicinin Vitest 5 modül önbelleği (`node_modules/.vitest-cache`, 7,8 GB) olduğu görüldü; yayın kapısı canlı testten önce 2 saatten eski girdileri siler.

Derinleştirme 0.210.0 (PR 32 CI yeşil, main CI 45870819772, Pages 45876619976, canlı 118/118 ilk denemede): Fizik dokuz ders (`depth213.ts` ışık/ayna/kırılma, `depth214.ts` mercek/renk/mıknatıs/genleşme), Biyoloji genetik altı ders (`depth215.ts`).

Derinleştirme 0.211.0 adayı: Kimya asit-baz-tuz beş ders (`depth216.ts`), Biyoloji ekoloji altı ders (`depth217.ts`), omurgalılar, omurgasızlar, virüsler, eşeyli üreme (`depth218.ts`). TYT Biyoloji'de 4 örnekli ders kalmadı.

Sıradaki iş: 0.211.0 yayın kapısı; hazır bekleyen mol-kütle beş ders (forge/depth-d219); çalışan Kimya turları bağlar-adlandırma (5) ve tepkimeler-sınırlayıcı madde (5). Kalan 4 örnekli TYT Fen: Kimya 14 ders (verim, safsızlık, tepkimeli karışım, katlı oranlar, katı kütlesi; hal değişimi ve gazlar; karışım, çözelti, koligatif; su ve doğa; simya, sembolik dil, polimerler). Sonra TYT Türkçe ve Sosyal, ardından beş AYT Sayısal ders. Tur kuralları scratchpad/depth-brief.md.
