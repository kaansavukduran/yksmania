YKSMania 0.3.1 alpha. Web: https://yksmania.vercel.app

Web 0.3.1 yayını hazır. Bu sayfadaki Windows/Linux/Android indirmeleri de yeni
Kopya Kağıtları bölümünü içeren 0.3.1 paketleridir. İlk yayındaki Vercel günlük
sınır engeli son kodun otomatik dağıtımında gözlenmedi. Doğrulama kayıtları FORGE.md içinde.

- 0.3.1: Sol menüde Konu Anlatımı → Kopya Kağıtları → Sorular sırası. Kopya kağıtları ayrı TYT/AYT, ders ve konu görünümüne taşındı. Konu anlatımı ve soru kaynakları bu dosyaları göstermez. Cihaza eklenmiş PDF ve notları çevrimdışı açılır; dosya yoksa durumu belirtilir. 320px büyük yazı/ölçek yerleşimi düzeltildi.
- 0.3.0: MEBİ konu özeti PDF’lerinin ilgili bölümleri incelenerek dört AYT anlatımı eklendi: türev, elektrik alan, kimyasal denge ve DNA eşlenmesi. Yeni vektör modelleri ve 20 özgün soru; toplam 13 anlatım / 65 soru. Kaynak sayfaları ve model sınırları docs/SOURCE_REVIEW.md içinde.
- 0.2.2: Uygulama yalnızca Türkçe. Dil seçimi ve İngilizce çeviriler kaldırıldı; eski İngilizce ayarlı kayıtlar ve yedekler diğer verileri korunarak Türkçe açılır.
- 0.2.1: Konu anlatımı tam genişlikte; Notun alanı içeriğin sonunda. Soru ekranındaki not alanı altta kalır. Notlar ve yarım kalan oturumlar korunur.
- Konu Anlatımı ve Sorular ayrı bölümler; ikisinde de TYT/AYT ve ders seçimi.
- Excel kaynaklarından 341 ana konu ve 479 ayrıntılı kopya kâğıdı başlığı.
- On üç görsel etkileşimli ders ve 65 özgün soru. Hücre yapıları, 118 elementlik tablo, geometride parça taşıma; kesir, çarpanlar, kuvvet, mol, ATP ve paragraf modelleri.
- Orijinal Aion referanslarıyla hazırlanan sola bakan cartoon sprite sheet; göz kırpma ve kaydedilmiş başarıya bağlı kısa tepki.
- Özel kaynak kataloğu, toplu PDF/klasör içe aktarma, aynı içeriği birleştirme, durdurma ve hata raporu.
- PDF’de sayfaya gitme ve kalınan sayfayı koruma; eski yerel kayıtlar için uyumlu veritabanı geçişi.

Windows: Setup kurulum; Portable taşınabilir sürüm. YKSManiaData klasörünü portable dosyayla birlikte saklayın. Chromium dahildir. Windows dosyaları Authenticode imzalı değildir.

Linux: AppImage veya DEB. Android: debug imzalı test APK’sı; manifest minimum API 24, güncel Android System WebView gerekir. Fiziksel Android uyumluluğu doğrulanmadı. Debug imza anahtarı önceki derlemeyle aynı olmayabilir: kurulum değiştirmeden önce ilerleme yedeğinizi alın. Kararlı üretim imzası ve veri koruyan iki sürümlük güncelleme ayrıca yapılmalıdır.

Tam müfredatın tüm etkileşimli içeriği hazır değildir. Başlık listeleri, kaynak PDF'leri ve tek tek doğrulanmış sorular farklı kapsamlardır. Özel arşiv ve kaynak paketleri bu herkese açık indirme dosyalarına gömülmemiştir. Kütüphane’den kendi kataloğunuzu ve kullanma hakkınız olan PDF'leri ekleyebilirsiniz. PDF eklemek öğrenme veya doğru cevap kaydı oluşturmaz.

İlk web kullanımı sonrası uygulama indirildiğinde çevrimdışı çalışır. Veriler cihaz bazındadır. İlerleme JSON yedeği PDF'leri ve kaynak kataloğunu içermez; bunların ayrı kopyalarını saklayın.

Derleme kaynağı verified-run.json içinde. Dosyaları SHA256SUMS.txt ile kontrol edebilirsiniz. Paket çalıştırma testleri; temiz kurulum, fiziksel cihaz ve paketler arası güncelleme testleriyle aynı değildir.
