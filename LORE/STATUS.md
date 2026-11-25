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

Cloudflare 0.177.0'da kaldı; sahibin kararıyla ertelendi. Android yalnız kişisel imzalı test paketi. İki site arası yedek aktarım testi tamamlanmadı, kabul sayılmaz.

0.194.0 ve 0.197.0 main CI'ı ilk kurulumda service worker etkinleşmediği için düştü, yeniden denemede geçti. Nedeni: ön bellek kurulumu düşünce işçi `redundant` olur, kayıt hatası gelmez, sayfa yenilenene kadar çevrimdışı hazırlık yeniden denenmez. 0.200.0 bunu aynı sayfada en fazla iki yeniden denemeyle onardı; main CI 45691856232 ilk denemede geçti, Pages 45698560381.

[Konu kapsamı](../docs/KONU_KAPSAMI.md) 510 başlık · TYT Matematik ve Geometri 64, Fen 115, Türkçe ve Sosyal 134, AYT Sayısal 197 konu çevrimdışı rotalarda sınandı. [PDF aktarımı](../docs/ILERLEME.md) · [Forge](../FORGE.md)

Derinleştirme 1. tur (0.201.0 adayı): TYT sayma ve olasılık 032–036 her biri +1 veri tablosu, +2 kaba kuvvetle sınanmış çözümlü örnek, Kopya Kağıdında aynı tablo.

Sıradaki iş: 0.201.0 yayın kapısı, ardından konu anlatımı, çözümlü örnek ve Kopya Kağıtlarını derinleştirme: TYT Matematik ve Geometri (sıradaki en inceler: Temel açılar 031, Tek-çift 195, Asal 197, trigonometrik oranlar 040, daire 040) → TYT Fen → TYT Türkçe ve Sosyal → beş AYT Sayısal ders. Soru bankası şu an öncelik değil.
