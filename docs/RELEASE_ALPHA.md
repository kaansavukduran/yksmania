YKSMania 0.6.0 alpha

- Soru/kaynak kartlarının dengeli iç boşlukları ve başlık hizaları düzeltildi.
- Kopya Kağıtları soldan çıkarıldı. Her konu başlığındaki Kopya Kağıdını
  Görüntüle düğmesi cihazdaki ilgili PDF’yi aynı sayfada tam açar. Sayfa
  konumu ve not çevrimdışı korunur; eski /cheatsheets bağlantıları çalışır.
- Toplam 50 anlatım: önceki 27 kaynaklı anlatım eklendi; rasyonel sayılar ve
  ilk 5 TYT kimya konusu 6 ayrıntılı rehber olarak genişletildi. Gerekçeli anlatım,
  etkileşimli şekil/model, adım adım açılan özgün çözümler ve hatırlama vardır.
- 115 özgün sorunun kimlikleri, seçenekleri, anahtarları ve metinleri korundu.
  Paragraf sorularının metinsiz açılması düzeltmesi korunur.
- Soru sonuçlarında geçmiş ÖSYM kaynakları gösterilir: 2018/2021 TYT ve 2026
  ALES/2, DGS, KPSS’ten 8 doğrulanmış referans, 5 kitapçık. Soru ve şekiller resmî
  PDF’de açılır; tam eşleşen dosya içe aktarılınca offline doğru soru/cevap
  sayfası açılır. Özgün çözümler, ÖSYM’nin resmî çözümü diye sunulmaz.
- Konu çalışmaları için 3, 7 ve 21. gün tekrarları yeni günlük konulardan önce
  gelir. İlk çalışma 1. gündür; hedefler +2, +6, +20 gündür. Müsait olmayan günler
  ve ortak günlük kapasite hesaba katılır. Tekrarı açıkça tamamlamak gerekir.
- Şemaların gezinme simgeleri, ok/etiket çakışmaları ve büyük yazıda
  düğme taşması giderildi. TYT/AYT ağaçları yukarıdan aşağı açılmayı sürdürür.

Kapsam: 50 anlatım / 115 özgün soru / 6 ayrıntılı rehber / 8 ÖSYM referansı.
479 ayrıntılı başlığın tüm anlatımları veya 20 yıllık bütün ÖSYM soruları
hazır değildir. 2026 kitapçıkları kamuya açık %10 bölümleridir. Kaynak kontrolü
SOURCE_REVIEW.md’de, platform test sonuçları FORGE.md’de kayıtlıdır.
Yalnız Türkçe; özel Drive PDF’leri/katalog ve kişisel kimlikler public
pakete eklenmez. PDF’lerini Ayarlar → Kaynak dosyalarını yönet’ten bir
kez ekle; konu içindeki düğmeden yeniden aç. Açılan PDF’nin kendi notu ve
anlatım notu ayrı kaydedilir. Dosya görüntülemek XP veya ustalık kazandırmaz.

İndirme: bu sürümün Assets bölümünden cihazına uygun dosyayı seç.
Windows Setup.exe kurulum, Portable.exe doğrudan çalıştırma içindir.
Linux AppImage için dosyaya çalıştırma izni ver; DEB Debian/Ubuntu içindir.
Android APK bir test paketidir; mevcut sürümü kaldırmadan önce ilerleme
JSON yedeğini uygulamanın Veri bölümünden dışa aktar.

Windows: Setup veya Portable x64; dosyalar Authenticode imzalı değildir.
Linux: AppImage veya DEB. Android: debug imzalı test APK’sı, minimum API 24;
güncel Android System WebView gerekir. Fiziksel Android, temiz Windows
kurulum/portable taşıma ve iki paket arasında veri koruyan güncelleme ayrıca
doğrulanmalıdır. Debug anahtarı derlemeler arasında değişebilir; paket
geçişinden önce uygulamanın ilerleme yedeğini alın.

Web ilk çevrimiçi yükleme tamamlandıktan sonra çevrimdışı açılabilir; native
arayüz yerel dosyalardan çalışır. Veriler cihaz bazındadır. İlerleme JSON
yedeği kaynak PDF’lerini içermez. Kaynak ve başarılı paket koşusu verified-run.json,
dosya hash’leri SHA256SUMS.txt, gözlenen yayın/test durumları FORGE.md içindedir.
