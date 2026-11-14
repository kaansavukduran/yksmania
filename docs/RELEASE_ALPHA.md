YKSMania 0.5.0 alpha

- Excel/Todoist çalışma sırasındaki 6–10. başlıklar eklendi: Temel Kavramlar,
  Tek Çift Pozitif Negatif Sayılar, Ardışık Sayılar, Asal Sayılar, Faktöriyel.
- Sayı kümelerine yerleştirip gerekçeyi gör, işaret/tek–çift işlemlerini değiştir,
  ardışık toplamı ters eşlemeyle kur, asal bölenleri dene, kitapları raflara
  yerleştirerek faktöriyeli ve sadeleştirmeyi keşfet. Seçimler offline saklanır.
- Beş yeni etkileşimli anlatım ve 25 özgün soru; toplam **23 anlatım / 115 soru**.
  Kaynaklar OGM video notlarının ve Aurelia kopya kağıtlarının seçili sayfalarıdır.
  Bunlar özgün alıştırmalardır, resmî sınav maddesi değildir.
- Önceki dersler, sorular, notlar, yarım oturumlar ve 1/3/7/21 tekrar tarihleri korunur.
  18 Haziran 2027 varsayılan sınavı ve 28 Şubat 2027 konu hedefi; kapalı günleri
  dışarıda bırakan 479 başlıklı sıralı iki bağımsız plan, ders grafiği/ağaçları,
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
