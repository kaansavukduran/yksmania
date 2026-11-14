YKSMania 0.10.0 alpha

Kaynak sırasındaki 59–78. başlıklar için 20 yeni ünite: 5 matematik, 5 fizik,
2 kimya, 2 biyoloji, 3 Türkçe ve 3 tarih. Ayrıntılı rehberlerde 189 açıklama
bölümü, 91 adım adım çözümlü örnek, 92 hatırlama ve 200 yeni özgün soru var.

Mutlak değer, üsler, bilimsel gösterim, kökler, oran orantı; genleşme, hâl
değişimi, durgun elektrik, devreler, manyetik alan; kovalent bağ ve molekül
polarlığı; zar taşınmaları ve sınıflandırma; isim/tamlama, sıfat, zamir;
Osmanlı merkez teşkilatı, toplum ve değişen dünya dengeleri işlendi.
Konuya özgü görsel modeller, cümle dönüşümleri ve tahmin/kanıt/gerekçe
çalışmaları çevrimdışı korunur. Öğrenci materyal yüklemez. Keşifler puan
veya tamamlanma oluşturmaz.

Toplam 86 anlatım, 58 rehber, 88 kağıt ve 500 özgün soru; ilk 78/479 başlık
hazırdır. Önceki 300 tam soru kaydı korunur. TYT karma 105/AYT karma 25 soru
ve 11 branş seti vardır. Tüm arşiv veya tam resmî dağılımlı deneme bankası
henüz tamamlanmadı. Canlı site: https://yksmania.vercel.app.
Kaynak ve test kanıtları: FORGE.md ve docs/QA.md.

Doğrulanan kaynak: `22872a289b26da02bc6feab9fb34db587670a55d`.
[CI koşusundaki](https://github.com/kaansavukduran/yksmania/actions/runs/43635461738)
dört iş başarılı: 192 birim testi, 142 tarayıcı testi ve Windows/Linux/Android paketleri.
[Canlı site kabulünde](https://github.com/kaansavukduran/yksmania/actions/runs/43635597330)
ayrıca 142/142 test geçti. Gerçek yerel web güncellemesinde notlar,
ilerleme ve taslak korundu; fiziksel/native yükseltme kabulü değildir.

Assets bölümünden cihazına uygun dosyayı seç:
Windows Setup.exe kurulum, Portable.exe doğrudan çalıştırma içindir; ikisi de
x64 ve Authenticode imzasızdır. Linux AppImage'e çalıştırma izni ver; DEB
Debian/Ubuntu içindir. Android APK debug imzalı test paketidir; minimum API24
ve güncel WebView gerekir. Debug anahtarı derlemeler arasında değişebilir;
paket geçişinden önce uygulamanın ilerleme yedeğini dışa aktar.

Fiziksel Android, temiz Windows kurulumu/portable taşıma ve iki native paket
arasında veri koruyan güncelleme ayrıca doğrulanmalıdır. Web ilk çevrimiçi
hazırlıktan sonra, native arayüz yerel dosyalardan çalışır. Veriler cihaz
bazındadır. Başarılı paket koşusu ve kaynak SHA'sı verified-run.json,
dosya hash'leri SHA256SUMS.txt içindedir.
