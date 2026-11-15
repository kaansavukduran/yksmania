YKSMania 0.14.0 alpha 1 — yayın adayı

0.14 adayı, doğrulanmış çalışma sırasının 139–168. başlıklarını kapsar. Önceden
hazır mol ve çarpanlara ayırma anlatımları yeniden sayılmadan 28 yeni etkileşimli
ünite eklendi: 236 bölüm, 479 paragraf, 121 çözümlü örnek, 121 hatırlama ve
280 özgün beş seçenekli soru. Toplam 174 anlatım, 146 ayrıntılı rehber,
174 yerleşik kopya kağıdı ve 1.540 soru; ilk 168/479 başlık anlatım ve soruyla
hazırdır. Eski 1.260 sorunun bütün alanları ve 147 eski dersin soru dışındaki
alanları korunur. Öğrenci PDF veya kaynak yüklemez. Tüm arşivin, tüm 479
başlığın veya son 20 yıllık bütün resmî sınavların tamamlandığı iddia edilmez.

Ekoloji, coğrafya, optik, kimyanın kanunları/mol hesapları, grafikler/kümeler/
mantık ve ek fiil; anlamlı etkileşim, tahmin/gerekçe ve 121 çözümlü örnekle işlendi.
TYT karma 110/151 dk 15 sn, AYT Sayısal 25/56 dk 15 sn ve 12 branş kısa pratik setidir;
resmî 120/80 dağılım değildir. Eski deneme/soru taslağı ve kişisel kayıtlar korunur.

Son C 6 kaynak kontrolü ve 414/414 birim testi PASS; 361 tarayıcı vakası listelendi.
Bunlar runtime/yayın kabulü değildir. C 6 tam tarayıcı, Pages, Electron, gerçek
0.13→0.14 web güncellemesi ve uzak CI/yayın kabulü henüz bekleniyor. Önceki
C 4 tam koşu 359/360 PASS idi: yeni Basınç ve Rüzgârlar başlığı eski Basınç
kopya kağıdı seçicisini belirsiz yaptı; tam düğme adına geçildi. C 4'ün 57 yeni
ünite kabulü, 19 model ailesiyle Pages/Electron ve ayrı görsel denetimleri
geçmişti; bu sonuçlar C 6'nın yeni runtime kabulü yerine kullanılamaz.

C 5/C 6'da iki gerçek kusur onarıldı: coğrafya gerekçesi state sınırını aşmaması
için 120 karakterle hem girişte hem gösterimde sınırlandı; sayı alanında
1800 seri yazarken ara değerin 4000'e kırpılması, yerel taslak ve blur/Enter
ile tek commit kullanılarak düzeltildi. 361. regresyon uzun gerekçeyi
çevrimdışı yeniden açar. Sayısal smoke girdileri gerçek Tab ile commit eder.
Önceki başarısızlıklar özel kanıtlarda ve tarihsel kayıtta korunur.

Fiziksel Android, temiz Windows kurulumu, portable taşıma ve iki native sürüm
arasında veri koruyan yükseltme NOT TESTED. Son doğrulanmış yayımlanmış paket
0.13.0'dır; bu 0.14 adayının yayınlandığı anlamına gelmez.

Web: https://yksmania.vercel.app
Pages: https://kaansavukduran.github.io/yksmania/

Windows Setup kurulum, Portable doğrudan çalıştırma içindir; Authenticode
imzası yoktur. Linux AppImage çalıştırma izni/DEB Debian–Ubuntu; Android 0.14.0
sürüm kodu 22, debug imzalı test APK, minimum API 24 ve güncel WebView gerektirir.
Debug anahtarı değişebilir; kişisel ilerleme yedeğini geçişten önce dışa aktar.
