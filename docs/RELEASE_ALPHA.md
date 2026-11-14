YKSMania 0.7.0 alpha

Denklemler ve eşitsizlikler çalışma sırasında artık hazır anlatımlara açılır.
İlk 41 kaynak sırası başlığının tamamında anlatım vardır; toplam 52 anlatımdan
15'i ayrıntılı rehber düzeyindedir. 479 başlığın tümü henüz hazır değildir.

- İlk beş TYT matematik konusu, hücre organelleri ve periyodik sistem genişletildi:
  kuralın gerekçesi, koşulu, karşı örneği, sık hatası ve adım adım çözümler.
- Birinci dereceden denklemler ve basit eşitsizlikler yeni etkileşimli anlatımlardır.
  Katsayıları değiştir; eşdeğer dönüşümleri, sıfır katsayı durumlarını, negatif
  katsayıda yön değişimini ve açık/kapalı çözüm aralığını incele. Deneme x'ini
  yerine koyup koşulu sağlayıp sağlamadığını gör. Seçimler çevrimdışı saklanır.
- 1/3 gibi yuvarlanmış kesir sonuçları artık yaklaşık eşitlik işaretiyle gösterilir;
  sonlu kesin sonuçlarda eşittir işareti korunur.
- İçindekiler'den seçilen başlığa klavye odağı da taşınır; uzun anlatımlarda
  görünür bölüm ile klavyenin devam ettiği yer ayrışmaz.
- Küçük ekranda iç içe yan boşluklar düzenlendi; büyük yazıda da anlatımın
  okunabilir genişliği korunur. Kullanıcının arayüz ve yazı ölçeği değiştirilmez.
- 115 özgün banka sorusu, paragraf metinleri, notlar, plan ve 3/7/21 tekrarları korunur.
  Yeni konu içi çözümlü örnekler sınav, XP veya ustalık kaydı oluşturmaz.
- Konu başlığındaki Kopya Kağıdını Görüntüle düğmesi tam yerel PDF'yi açmayı sürdürür.

Kapsam: 52 anlatım / 15 ayrıntılı rehber / 115 özgün soru / 8 ÖSYM referansı.
5 resmî kitapçık ve bunların konu bağlantıları önceki sürümden korunur; bu sürümde
20 yıllık arşiv genişletilmiş veya tamamlanmış değildir. 2026 kitapçıkları kamuya
açık %10 bölümleridir. Kaynak sayfa kayıtları SOURCE_REVIEW.md, güncel test ve
dağıtım sonuçları FORGE.md içindedir.

Özel Drive PDF'leri/katalog ve kişisel kimlikler public pakete eklenmez. PDF'lerini
Ayarlar → Kaynak dosyalarını yönet'ten bir kez ekleyip konu içinden açabilirsin.
İlerleme JSON yedeği PDF dosyalarını içermez; dosyalarını ayrıca sakla.

Assets bölümünden cihazına uygun dosyayı seç:
Windows Setup.exe kurulum, Portable.exe doğrudan çalıştırma içindir. İkisi de x64
ve Authenticode imzasızdır. Linux AppImage'e çalıştırma izni ver; DEB Debian/Ubuntu
içindir. Android APK debug imzalı test paketidir; minimum API 24 ve güncel WebView
gerektirir. Debug anahtarı derlemeler arasında değişebilir; paket geçişinden önce
uygulamanın ilerleme yedeğini dışa aktar.

Fiziksel Android, temiz Windows kurulumu/portable taşıma ve iki paket arasında
veri koruyan güncelleme ayrıca doğrulanmalıdır. Web, ilk çevrimiçi yükleme
tamamlandıktan sonra çevrimdışı açılır; native arayüz yerel dosyalardan çalışır. Veriler
cihaz bazındadır. Başarılı paket koşusu ve kaynak SHA'sı verified-run.json,
dosya hash'leri SHA256SUMS.txt içindedir.
