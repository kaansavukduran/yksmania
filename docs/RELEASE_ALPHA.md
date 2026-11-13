YKSMania 0.4.0 alpha. Web: https://yksmania.vercel.app

- Varsayılan hedef sınav tarihi **18 Haziran 2027**; Ayarlar’dan değiştirilebilir.
  Konu anlatımları **28 Şubat 2027**, soru çalışmaları sınav tarihine planlanır.
  Kalan konu sayısı uygun günlere bölünür; kapalı hafta günleri/tarihler çıkarılır.
  Tarihler gün/ay/yıl biçimindedir.
- Excel Üretim Sırası ve Todoist ilk çalışma sırası karşılaştırılarak **479 başlık**
  sıralandı. Bugünün hedefi, tamamlananlar ve tüm gelecek tarihler görünür.
  Konu ve soru çalışma kayıtları ayrı tutulur, geri alınabilir. Elle işaretleme
  XP, doğru cevap veya ustalık oluşturmaz.
- Dünyam’da tüm dersleri gösteren tek renklenen grafik; solda TYT, sağda AYT
  Sayısal ders/konu/soru ağaçları. Dar ekranlarda alt alta gelir. İlerlemeyle
  renklenen piksel manzara; oyunlaştırma kapalıyken plan ve ağaçlar kullanılabilir.
- İlk beş konu için OGM Dersler Cepte kimya PDF’lerinden hazırlanmış özgün anlatım:
  simya/ayırma, disiplinler, sembolik dil, güvenlik, atom modelleri. Etkileşimli
  vektör şemaları ve 25 yeni özgün soru; toplam **18 anlatım / 90 soru**.
- Karakter referansına bağlı yeni 32 pozluk piksel Aion, fareye bakma ve dört farklı
  tıklama tepkisi. Azaltılmış hareket desteklenir; karakterin dünya konumu kaymaz.
- Kütüphane sol menüden kaldırıldı; mevcut PDF’ler silinmeden kaynak yönetimi
  **Ayarlar → Kaynak dosyalarını yönet** altına taşındı. Kopya Kağıtları bölümü
  Konu Anlatımı ile Sorular arasında kalır. Notlar anlatım/soruların altındadır.
- Türkçe arayüz; çevrimdışı ders/PDF/plan, kayıt, not ve yarım oturum koruması.

479 başlık, kaynak Excel’in ayrıntılı listesidir; geometri kapsamı sınırlıdır.
Ayrı 341 ana konu haritası korunur. Tam müfredatın tüm etkileşimli içeriği hazır
değildir. Henüz hazırlanmayan konu/soru ekranı bunu açıkça belirtir ve kendi
kaynağındaki çalışmayı kaydetmene izin verir. Özel PDF arşivi herkese açık pakete
gömülmez. Kaynak sayfaları ve model sınırları docs/SOURCE_REVIEW.md içindedir.

Windows: Setup veya Portable x64; Chromium dahildir. Portable dosyanın yanındaki
YKSManiaData klasörünü birlikte saklayın. Windows dosyaları Authenticode imzalı değildir.
Linux: AppImage veya DEB. Android: debug imzalı test APK’sı, minimum API 24 ve güncel
Android System WebView gerekir. Fiziksel Android, temiz Windows kurulum/portable
taşıma ve iki paket arasında veri koruyan güncelleme henüz doğrulanmadı. Debug
anahtarı derlemeler arasında değişebilir; değiştirmeden önce ilerleme yedeği alın.
Kararlı üretim imzası ayrı yapılmalıdır.

Web ilk çevrimiçi yükleme tamamlandıktan sonra çevrimdışı açılabilir; native paket
arayüzü yerel dosyalardan çalıştırır. Veriler cihaz bazındadır. İlerleme JSON yedeği
PDF veya kaynak kataloğunu içermez; bunları ayrı saklayın.

Kaynak ve başarılı paket koşusu verified-run.json içindedir. SHA256SUMS.txt dosya
bütünlüğünü kontrol etmek içindir. Web yayını ve platform testlerinin gözlenen
sonuçları FORGE.md / docs/QA.md içindedir; alpha tam cihaz uyumluluğu iddiası değildir.
