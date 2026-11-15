YKSMania 0.13.0 alpha adayı

Bu belge yayın hazırlığıdır. 0.13.0 için uzak CI, canlı uygulama ve kurulum
paketi kabulü henüz tamamlanmış sayılmaz; güncel durum FORGE.md ve docs/QA.md’dedir.

Anlatımı önceden hazır 13 başlığa 130 açıklamalı özgün soru eklendi:
sayı basamakları, bölme/bölünebilme, EBOB–EKOK, birinci dereceden denklemler,
basit eşitsizlikler, katman elektron dizilimi ve tarihin ilk yedi başlığı.
Yeni anlatım veya model eklenmedi; mevcut öğretim ve kimlikler korundu.

Toplam 146 anlatım, 118 ayrıntılı rehber, 146 kopya kağıdı ve 1.260 soru vardır.
Hazır 146 anlatımın tamamında, sıradaki ilk 138/479 başlıkta hem anlatım hem
soru çalışması bulunur. Önceki 1.130 sorunun tam kayıtları korunur. Öğrenci
PDF veya kaynak yüklemez; gerekli pasaj kartta kökten önce sunulur.

TYT karma 105 / AYT karma 25 ve 11 branş kısa pratik setleridir; tam 120/80 resmî
dağılım değildir. Yeni denemede mevcut havuzdan seçim çeşitlenir; devam eden
ve tamamlanan deneme tam soru/seçenek/cevap kaydıyla sabit kalır. Küçük havuzda
sorular tekrar gelebilir. Bütün 479 başlık veya bütün kaynak arşivi tamamlanmadı.

130 yeni soru bağımsız içerik incelemesinden geçti.
C2 ile birleştirilmiş kaynakta tip kontrolü, derleme ve 355 birim testi geçti.
Önceki adayda 32 temel soru tarayıcı vakası ve Pages/Electron ilk soru rotaları
geçti. Aynı profil taslak değişiminde saptanan native onay kapanması (YKS-067)
son kaynakta ortak HTML onayıyla giderildi. Dört yeni ve dört eski ilgili
browser vakası 8/8 PASS; varsayılan iptal odağı, Escape, kayıt koruma ve büyük
yazı denetlendi. Son tam 303 tarayıcı koşusu ve aynı profil Electron kabulü
sürer; uzak CI ve yeni paket/yayın sonuçları ayrıca kaydedilecektir.
Kaynak sayfa sınırları docs/SOURCE_REVIEW.md’dedir.

Web: https://yksmania.vercel.app
GitHub Pages: https://kaansavukduran.github.io/yksmania/
İki adres ayrı kökenlerde ayrı ilerleme saklar; Ayarlar’daki kişisel ilerleme
yedeğiyle aktarım yapılabilir. Web ilk çevrimiçi hazırlıktan sonra, native
arayüz yerel dosyalardan çalışır.

Paketler yayımlandığında cihazına uygun dosyayı seç:
Windows Setup.exe kurulum, Portable.exe doğrudan çalıştırma içindir; x64 ve
Authenticode imzasızdır. Linux AppImage’e çalıştırma izni ver; DEB Debian/Ubuntu
içindir. Android APK debug imzalı alpha test paketidir; kaynak sürümü 0.13.0,
versionCode 21, minimum API 24 ve güncel WebView gerekir. Debug anahtarı derlemeler
arasında değişebilir; geçişten önce kişisel ilerleme yedeğini dışa aktar.

Fiziksel Android, temiz Windows kurulumu, portable taşıma ve iki native sürüm
arasında veri koruyan yükseltme ayrıca doğrulanmalıdır. verified-run.json
kaynak koşusunu, SHA256SUMS.txt yayımlanan dosyaların bütünlüğünü gösterir;
bu kanıtlar yeni 0.13 yayını için henüz üretilmiş sayılmaz. Önceki sürümlerin
başarıları bu adayın kabulü yerine geçmez.
