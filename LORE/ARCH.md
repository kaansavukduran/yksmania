# Mimari

- `src/domain` içerik, plan, sınav, depolama ve öğrenme kurallarını taşır. `src/pages` ekranları, `src/learning` öğretim bileşenlerini içerir. [Depolama](../src/domain/storage.ts)
- Eski İngilizce tercihi ve yedek yereli Türkçeye normalize edilir. Kullanıcının yazdığı metin ve eski belgeler korunur. Kişisel ilerleme yedeği eğitim içeriğinden bağımsızdır.
- Öğrenme günü 1. gündür. Tekrarlar 3, 7 ve 21. günlerde, +2/+6/+20 aralıkla açılır. Özgün tarihler, uygunluk, öğrenme olayları, ayarlar ve taslaklar korunur. İçe aktarma, zaman veya manuel işaret öğrenme kanıtı ve XP oluşturmaz. [Tekrar modeli](../src/domain/scheduler.ts)
- Bugün tamamlanan işleri görünür tutar. En son tamamlanmış kayıtlı soru denemesinin gerçek doğru ve yanlışlarını gösterir. Tekrar denemeleri toplama ve soru yanıtından manuel teori tamamlaması çıkarma. YKS-013 kabulü [QA](../docs/QA.md) içindedir.
- Kum saati teori, PDF ve sorularda aynı yerel durumdur. Mutlak bitiş zamanını kullan. Ekran tikleri kalıcı kayıt yazmaz. İlerleme sıfırlaması açık arayüz onayı ve tek kalıcı yazımla yapılır. Ayarlar, notlar, eski belgeler ve PDF sayfaları korunur. [Kum saati](../src/domain/focusTimer.ts) · [Sıfırlama](../src/domain/resetProgress.ts)
- Kullanıcının onayladığı AIONIA referanslarını uygula ve animasyon karelerini gerçek ekranda incele. [AIONIA](../docs/AIONIA_STANDARD.md) · [Sanat rehberi](../docs/ART_BIBLE.md)
