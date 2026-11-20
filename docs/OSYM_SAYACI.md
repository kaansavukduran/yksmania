# 99_ÖSYM işleme sayacı

Eski ÖSYM sınavları arşivi (Drive `02_YKS / 99_ÖSYM`) OGM/MEBİ arşivinden ayrı sayılır; çift sayım yapılmaz.
Yalnız TYT (10 ders) ve AYT Sayısal (5 ders) güncel müfredatına uyan soru kalıpları alınır. Ham PDF,
Drive kimliği ve bağlantısı depoya girmez. Çıkmış sorular uygulamada resmî soru olarak sunulmaz:
kalıp, tuzak ve öncül yapısı özgün anlatım, taktik ve özgün sorulara dönüştürülür; atıf yalnız
"yıl + sınav + soru numarası" biçimindedir.

Payda kullanıcı beyanıdır (1.001 PDF, 21.080 sayfa); klasör klasör Drive sayımı yapıldıkça güncellenir.

<!-- sayac:osym-pdf islenen=0 toplam=1001 -->

| Klasör | Öncelik | PDF (beyan) | Envanteri çıkarılan | İşlenen | Not |
| --- | --- | ---: | ---: | ---: | --- |
| 01 Üniversite (ÖSS, ÖYS, YGS, LYS, YKS) | 1 | 245 | 0 | 0 | Figür ve taktiklerde yıl + soru numarasıyla atıf yapılan sorular bu klasörün sınavlarındandır. |
| 06 MSÜ, ALS ve askeri sınavlar | 1 | 40 | 0 | 0 | |
| 09 Çözümler ve MEB derlemeleri | 1 | 91 | 0 | 0 | |
| 04 ALES ve LES | 2 | 87 | 0 | 0 | Paragraf, sayısal mantık ve problem kalıpları. |
| 05 DGS | 2 | 41 | 0 | 0 | TYT Matematik ve Türkçe hız kalıpları. |
| 03 ÖABT, MEB-AGS | 2 | 252 | 0 | 0 | Yalnız AYT Sayısal kazanımlarına uyan soru tipleri. |
| 02 KPSS, 07 EKPSS, 08 Diğer, 10 Eski derlemeler | 2 | 245 | 0 | 0 | Yalnız güncel TYT ve AYT Sayısal müfredatına uyan kalıplar. |
| **Toplam** | | **1.001** | **0** | **0** | |

## Bağlantılı geçmiş sorular

Uygulamadaki figür ve taktiklerde atıf yapılan farklı geçmiş soru sayısı koddan sayılır
(`tests/progress-table.test.ts`); güncel değer `docs/ILERLEME.md` içindedir.
