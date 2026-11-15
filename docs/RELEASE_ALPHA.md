YKSMania 0.13.0 alpha 1

Önceden anlatımı hazır 13 başlığa 130 açıklamalı özgün soru eklendi: sayı
basamakları, bölme/bölünebilme, EBOB–EKOK, denklemler, eşitsizlikler, katman
elektron dizilimi ve tarihin ilk yedi başlığı. Yeni anlatım veya model eklenmedi.
Toplam 146 anlatım, 118 rehber, 146 kopya kağıdı ve 1.260 soru. Hazır 146 anlatımın
tamamı ve sıralı ilk 138/479 başlık anlatım+soru içerir; bütün arşiv tamamlanmadı.
Önceki 1.130 soru, ders gövdeleri ve kişisel kayıtlar korunur. Öğrenci kaynak yüklemez.

Yarım çalışmayı değiştirme, ilerleme yedeği geri yükleme ve oturum geri alma
uygulama içi açık onay kullanır. Vazgeç/Escape kayıtları korur; çift tıklama
kilidi ve kalıcı kayıt öncesi onay vardır. Aynı profil masaüstü/offline/reload
ve gerçek 0.12→0.13 web yükseltmesi eski kayıtları, notları ve XP 25’i korudu.

Kaynak ba8f553cbf8dff2dae985921096378ccd5908503; CI 43715126173 dört iş PASS: 355 birim/303 tarayıcı,
Windows/Linux gerçek paketli kabulü, Android 0.13.0 (sürüm kodu 21), v2 imza.
Canlı Vercel 43715186079: 303/303 PASS; Pages 43715151603: üç iş PASS.
Release 43716979510: sekiz dosya; tag/verified-run aynı kaynağa bağlı.
SHA256SUMS.txt yedi dosya listeler; iki indirilen kanıt dosyasının hash’i eşleşir.
Beş büyük paket dosyası ayrıca yerelde indirilip hash’lenmedi. Yerel 302/303 ve eski
arama beklentisinin 5/5 onarımı, son uzak 303/303 sonuçlarından ayrı kayıttır.

TYT karma 105, AYT karma 25 ve 11 branş kısa pratik setidir; tam 120/80 resmî
dağılım değildir. Yeni deneme seçimi mevcut havuzdan çeşitlenir; başlamış ve
bitmiş denemenin tam soruları sabitlenir. Küçük havuzda sorular tekrar gelebilir.

Web: https://yksmania.vercel.app
Pages: https://kaansavukduran.github.io/yksmania/
İki adres ayrı ilerleme saklar; kişisel JSON yedeğiyle aktarım yapılabilir.
Web ilk çevrimiçi hazırlıktan sonra, native arayüz yerel dosyalardan çalışır.

Windows Setup.exe kurulum, Portable.exe doğrudan çalıştırma içindir; x64 ve
Authenticode imzasızdır. Linux AppImage’e çalıştırma izni ver; DEB Debian/Ubuntu
içindir. Android APK debug imzalı alpha test paketidir: 0.13.0/code 21, minimum
API 24 ve güncel WebView. Debug anahtarı sürümler arasında değişebilir;
geçişten önce kişisel ilerleme yedeğini dışa aktar.

Fiziksel Android, temiz Windows kurulumu, portable taşıma ve iki native sürüm
arasında veri koruyan yükseltme NOT TESTED. Kaynak okuma sınırları
SOURCE_REVIEW’da; bütün kabul, ilk başarısız koşular ve kalan sınırlar FORGE/QA’da.
