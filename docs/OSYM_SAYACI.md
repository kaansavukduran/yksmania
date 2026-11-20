# 99_ÖSYM işleme sayacı

Eski ÖSYM sınavları arşivi (Drive `02_YKS / 99_ÖSYM`) OGM/MEBİ arşivinden ayrı sayılır; çift sayım yapılmaz.
Yalnız TYT (10 ders) ve AYT Sayısal (5 ders) güncel müfredatına uyan soru kalıpları alınır. Ham PDF,
Drive kimliği ve bağlantısı depoya girmez. Çıkmış sorular uygulamada resmî soru olarak sunulmaz:
kalıp, tuzak ve öncül yapısı özgün anlatım, taktik ve özgün sorulara dönüştürülür; atıf yalnız
"yıl + sınav + soru numarası" biçimindedir.

Payda Drive'da klasör klasör sayılarak doğrulandı (20 Kasım 2026): 10 klasör, 1.001 PDF; beyan edilen
sayıyla fark yok. Arşiv kataloğu (13 sütun, 1.001 satır) ve rehber PDF'i kökte durur, sayıya dahil değildir.
YKS dönemi kitapçıkları: 2018–2026 arası her yıl TYT ve AYT (cevap anahtarı aynı dosyada); ayrıca 2018 örnek
soru kitapçığı. 1999–2009 ÖSS, 2010–2017 YGS ve LYS aynı klasördedir.

<!-- sayac:osym-pdf islenen=3 toplam=1001 -->

| Klasör | Öncelik | PDF (sayım) | İşlenen | Kapsam notu |
| --- | --- | ---: | ---: | --- |
| 01 Üniversite (ÖSS, ÖYS, YGS, LYS, YKS) | 1 | 245 | 3 | TYT ve AYT Sayısal kalıplarının ana kaynağı. Figür ve taktiklerde yıl + soru numarasıyla atıf yapılan sorular buradandır. |
| 06 MSÜ, ALS ve askeri sınavlar | 1 | 40 | 0 | TYT düzeyi kalıplar. |
| 09 Çözümler ve MEB derlemeleri | 1 | 91 | 0 | 2018–2019 TYT ve AYT matematik yazılı çözümleri; 2018–2026 MEB derlemeleri. |
| 04 ALES ve LES | 2 | 87 | 0 | Paragraf, sayısal mantık ve problem kalıpları. |
| 05 DGS | 2 | 41 | 0 | TYT Matematik ve Türkçe hız kalıpları. |
| 03 ÖABT ve MEB AGS | 2 | 252 | 0 | Yalnız AYT Sayısal kazanımlarına uyan soru tipleri. |
| 02 KPSS, DMS, KMS | 2 | 86 | 0 | Yalnız güncel TYT müfredatına uyan kalıplar. |
| 07 EKPSS ve ÖMSS | 2 | 79 | 0 | Yalnız güncel TYT müfredatına uyan kalıplar. |
| 08 Diğer ilgili sınavlar | 2 | 74 | 0 | Müfredat süzgecinden geçenler. |
| 10 Resmî olmayan eski sınav derlemeleri | 2 | 6 | 0 | Yalnız kalıp karşılaştırması için. |
| **Toplam** | | **1.001** | **3** | |

## Bağlantılı geçmiş sorular

Uygulamadaki figür ve taktiklerde atıf yapılan farklı geçmiş soru sayısı koddan sayılır
(`tests/progress-table.test.ts`); güncel değer `docs/ILERLEME.md` içindedir.
