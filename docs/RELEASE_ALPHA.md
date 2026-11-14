YKSMania 0.8.0 alpha

Konu anlatımı, kopya kağıdı ve sorularda ortak çalışma kum saati var. Üstüne
basınca ters döner ve başlar; durdur/devam et, 1/5/10/20 dakika veya 1–120
dakika özel süre seçilebilir. Sayfa değişimi, çevrimdışı yeniden açma ve arka
planda geçen süre korunur. Süre dolması konu tamamlanması veya XP kazandırmaz.

Ayarlar → Veri → İlerlemeyi sıfırla, açık onayla çalışma kayıtlarını sıfırlar;
ayar, not, PDF ve PDF sayfa konumları korunur. Yazma başarısızsa eski ilerleme
korunur. Ders simgeleri ortak vektörlerle yenilendi; TYT/AYT kökleri üsttedir.
Yeni web sürümünü kayıttan sonra uygulamak için bildirimde doğrudan düğme var.
Eski istemciler: Ayarlar → Güncellemeler ve hakkında → Güncelle ve yeniden aç.

Selçuklu Türkiyesi ve katman elektron dizilimi kaynak okumasıyla eklendi.
Nötr/iyon elektron modeli, sıralı tarih şemaları, gerekçeler ve çözümlü örnekler
var. Paragraf rehberi kapsam, kanıt, olumsuz kök ve yapı sorularıyla genişletildi.
Toplam 54 anlatım / 17 ayrıntılı rehber / 115 özgün soru / 8 ÖSYM referansı.
İlk 43 kaynak sırası başlığında anlatım vardır; 479'un tamamı henüz hazır değildir.
115 bağımsız soru ve beş paragrafın tam metni korunur. ÖSYM referansları aynı
5 kitapçıktan 8 kayıttır; 20 yıllık arşiv bu sürümde tamamlanmış değildir.
Kaynak okuma sınırları SOURCE_REVIEW.md, test ve yayın kanıtı FORGE.md'dedir.

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
