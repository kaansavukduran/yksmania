YKSMania 0.12.0 alpha adayı

Bu belge yayın hazırlığıdır; 0.12.0 henüz yayımlandı ve doğrulandı sayılmaz.
Mevcut canlı web ve kurulum yayını 0.11.0’dır.

Çalışma sırasındaki 109–138. başlıklara 30 yeni ünite eklendi: 5 matematik,
5 fizik, 5 kimya, 7 biyoloji, 3 Türkçe ve 5 tarih. 263 açıklama bölümü,
123 çözümlü örnek, 128 hatırlama ve 300 yeni açıklamalı özgün soru.

Faiz, karışım, işçi, havuz, hareket; su/ses/deprem, ışık/gölge/ayna; katılar,
viskozite, buhar basıncı/nem/gaz/plazma/çevre; eşeyli üreme ve kalıtım;
cümle görevleri, kip/kişi/çatı; Millî Mücadele, inkılap ve savaşlar arası
belge/kanıt modelleriyle etkileşimli öğretim genişletildi. Bütün yeni kopya
kağıtları anlatım ve örnekleriyle uygulamanın içinde; öğrenci PDF yüklemez.

Toplam 146 anlatım, 118 ayrıntılı rehber, 146 kopya kağıdı ve 1.130 özgün soru;
ilk 138/479 başlık hazırdır. Önceki 800 soru kayıtları korunur. Yeni deneme
başlatıldığında ilgili havuzdan seçim çeşitlenir; devam eden deneme tam soru,
seçenek, cevap ve son zaman kaydıyla sabit kalır. TYT karma 105 / AYT karma 25
ve 11 branş hâlâ kısa pratik setleridir; tam 120/80 resmî dağılım veya sınırsız
soru bankası değildir. Bütün kaynak arşivi henüz tamamlanmadı.

Yerel tip kontrolü, derleme ve 351 birim testi geçti. Hedefli/tam tarayıcı,
manuel görünüm, Electron, Pages, web güncellemesi, uzak CI ve yeni paket/yayın
kabulü sürmektedir. Güncel sonuç ve kaynak sınırları FORGE.md, docs/QA.md ve
docs/SOURCE_REVIEW.md’de ayrı kaydedilir. Hazırlık kaydı uzak yayın kanıtı değildir.

Web: https://yksmania.vercel.app
GitHub Pages: https://kaansavukduran.github.io/yksmania/
İki adres ayrı köken olduğundan ilerleme kayıtları kendiliğinden eşitlenmez;
Ayarlar’daki kişisel ilerleme yedeğiyle aktarım yapılabilir. Web ilk çevrimiçi
hazırlıktan sonra, native arayüz yerel dosyalardan çalışır.

Yeni paketler yayımlandığında cihazına uygun dosyayı seç:
Windows Setup.exe kurulum, Portable.exe doğrudan çalıştırma içindir; x64 ve
Authenticode imzasızdır. Linux AppImage’e çalıştırma izni ver; DEB Debian/Ubuntu
içindir. Android APK debug imzalı alpha test paketidir; minimum API 24 ve güncel
WebView gerekir. Debug anahtarı derlemeler arasında değişebilir; paket
geçişinden önce uygulamanın kişisel ilerleme yedeğini dışa aktar.

Fiziksel Android, temiz Windows kurulumu/portable taşıma ve iki native paket
arasında veri koruyan yükseltme ayrıca doğrulanmalıdır. verified-run.json
başarılı kaynak koşusunu, SHA256SUMS.txt dosya bütünlüğünü gösterir; bu belgeler
yeni 0.12 yayını için henüz üretilmiş sayılmaz.

Önceki 0.11.0 yayınının kanıtı:
CI 43699042962 dört iş PASS,279 birim / 204 tarayıcı, Windows/Linux paketli çevrimdışı
kabul ve Android 0.11.0/code19/v2 imza. Canlı Vercel 43699042930 204/204 PASS;
Pages 43700388975 üç iş PASS; Release 43700509433 PASS. Kaynak ve tag
3cd370beb1f7dd96cd9866508c58c96444e5bce5, sekiz yayımlanmış dosya.
https://github.com/kaansavukduran/yksmania/releases/tag/v0.11.0-alpha.1
Bu geçmiş başarılar yeni 0.12 sürümünün kabulü yerine geçmez.
