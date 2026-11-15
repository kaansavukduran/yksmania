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

C6 son yerel kabul tamamlandı: kaynak kontrolü, 414/414 birim testi ve derleme
PASS; bütün 361/361 tarayıcı vakası iki worker ile 20,6 dakikada geçti. Test
çıkarılmadı. C6 Pages prefix'inde 19 model ailesi ve iki önceki soru rotası
ilk çevrimdışı kullanım/HTML sonuç/kayıt/reload ile PASS. Gerçek Electron'da
aynı 19 aile, iki soru rotası, aynı profil/süreç yeniden açılışı ve HTML onay
iptal→tam kayıt aynılığı→onay→offline/reload PASS; renderer hatası yok.

Gerçek 0.13→0.14 service-worker güncellemesinde eski sürümün bütün state,
belge ve kataloğu güncellemenin hemen ardından aynı kaldı. Eski 5/5 oturum,
17 Kasım/21 Kasım/5 Aralık tekrarları, kontrol edilmiş yanlış soru taslağı,
notlar ve 870 bayt sentetik eski PDF korundu; XP 25→25. Eski arayüzden
başlatılmış 105 soruluk TYT denemesinin 105 tam sorusu, doğru ilk cevabı,
bayrağı ve bitiş süresi değişmedi; yeni katalog ayrı 110 soru gösterdi.
Altı YENİ 0.14 model bu profilde ilk kez çevrimdışı açıldı ve reload korundu.

Önceki C4 tam koşu 359/360 idi; yeni Basınç ve Rüzgârlar başlığı eski Basınç
özet seçicisini belirsiz yapmıştı. Tam düğme adı düzeltildi; C6'da geçti.
Coğrafya 120 karakter gerekçe ve gerçek 1800 yazımının 4000'e kırpılmaması
regresyonları final kaynakta geçti. Türkçe altı kişi tablosu ve -ken ayrımı
normal uygulamada ayrıca doğrulandı. İlk masaüstü denemesinin eksik runtime
yolu ve yükseltmenin meşgul sabit portu test ortamı hatalarıydı; gerçek C4
Electron runtime'ı ve dinamik boş portla temiz profilde tekrar geçildi. İlk
loglar saklanır. Bunlar gizlenmiş uygulama hatası veya test azaltma değildir.

Önceki C3 matematik/fizik 32 görünüm ve 12 sınır dalı, kimya/biyoloji 48
görünüm; C4 coğrafya 28 görünüm ve 48 glif ölçümü ayrı kapsamlarda PASS idi.
Glif kontrastının en düşüğü 5,967 idi. Bu önceki görsel sonuçlar C6
tam tarayıcı kabulü veya fiziksel cihaz testiyle eşitlenmez.

Özel veri taraması 64 değişen metin yolunu, eski 8.845 ve canlı metadata'yla
8.959 özel kimlik/bağlantıyı kontrol etti; özel kimlik, ham PDF/binary veya
secret örüntüsü bulunmadı. 752 bağımlılık kaydı değişmedi. Sürüm/paket
korumasının 18 sentetik vakası PASS. CI, canlı Vercel/Pages ve yeni paket
release kabulü henüz bekleniyor; bu yerel sonuçlar yayın kabulü sayılmaz.
Fiziksel Android, temiz Windows kurulum, portable taşıma ve iki native sürüm
arasında veri koruyan yükseltme NOT TESTED.

Web: https://yksmania.vercel.app
Pages: https://kaansavukduran.github.io/yksmania/

Windows Setup kurulum, Portable doğrudan çalıştırma içindir; Authenticode
imzası yoktur. Linux AppImage çalıştırma izni/DEB Debian–Ubuntu; Android 0.14.0
sürüm kodu 22, debug imzalı test APK, minimum API 24 ve güncel WebView gerektirir.
Debug anahtarı değişebilir; kişisel ilerleme yedeğini geçişten önce dışa aktar.
