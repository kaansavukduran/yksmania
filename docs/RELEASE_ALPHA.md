YKSMania 0.5.1 alpha

- Bugün → Bugünün çalışma yolu, tamamlanan konuları listede tutar. Konu tamamlandı
  etiketi ve onay simgesi, kalan bugünkü atamalarla birlikte görünür.
- Konu ve soru kartlarında **5 soruda 4 doğru · 1 yanlış** gibi gerçek son deneme
  sonucu, soru tarihi ve Sonucu gör bağlantısı bulunur. İpucuyla çözülenler ayrıca
  belirtilir. Tekrar çözümleri toplanmaz; 0 doğru da doğru gösterilir.
- Daha önce sadece soru çözümü kaydedildiyse Konuyu çalıştım düğmesiyle konu
  kaydı aynı ekrandan açıkça tamamlanabilir ve geri alınabilir. Soru çözümü tek
  başına teoriye çevrilmez. Haricî kaynaktaki çalışma için sonuç uydurulmaz.
- Çevrimdışı kayıt, eski notlar, yarım oturumlar, 1/3/7/21 tekrarları ve bağımsız
  planlar korunur. Hazır içerik aynı: 23 anlatım / 115 özgün soru. Yalnız Türkçe.

479 başlıklı sıralı iki bağımsız plan, ders grafiği/ağaçları,
  ayrı Kopya Kağıtları ve altta Notun düzeni korunur. Yalnız Türkçedir.

479 başlık, kaynak Excel’in ayrıntılı listesidir; geometri kapsamı sınırlıdır.
Ayrı 341 ana konu haritası korunur. Tüm etkileşimli müfredat hazır değildir.
Özel PDF arşivi herkese açık pakete gömülmez. Kaynaklar/model sınırları
[source review](https://github.com/kaansavukduran/yksmania/blob/main/docs/SOURCE_REVIEW.md)
içindedir. Web: https://yksmania.vercel.app ; güncel web sürümü paket sürümünden
farklı olabilir, doğrulanmış dağıtım durumu FORGE.md içinde ayrı kaydedilir.

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
