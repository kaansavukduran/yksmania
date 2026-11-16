# YKSMania

Fragaria Interactive’in Türkçe, çevrimdışı YKS öğrenme uygulaması. **0.17.0 yayımlandı.**

[Vercel](https://yksmania.vercel.app) · [GitHub Pages](https://kaansavukduran.github.io/yksmania/) · [Windows ve Linux indirmeleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1)

**350 anlatım, 322 ayrıntılı rehber, 350 yerleşik kopya kağıdı ve 3.340 özgün soru.** Doğrulanmış çalışma sırasının ilk 348/479 başlığı anlatım ve bağımsız soruyla hazırdır. Modelin koşullarını değiştirip sonucunu incele, öngörünü gerekçesiyle karşılaştır, sonra bağımsız sorulara geç. Öğrenci PDF veya ders kaynağı yüklemez. Konu Anlatımı, Kopya Kağıtları, Sorular ve Sınavlar ayrı bölümlerdir.

0.16 üzerine 86 yeni anlatım, dört eski rehbere kayıpsız ek ve 900 soru eklendi. Ortak kademeli yardım ve denemelerde öğrenme/simülasyon modları vardır. Ayrıntılı yardım 20 sorudadır; bütün bankanın kapsamlı çözüm rehberi tamamlanmadı. Başlıklar çevrimdışı Bricolage kullanır; açık Lexend tercihi korunur.

16 kısa deneme pratiği: TYT 115 soru/9488 sn, AYT Sayısal 55/7425 sn ve 14 branş. Eksik kotalar gösterilir;0.17 tam 120/80 dağılım olarak etiketlenmez. Süre gerçek soru sayısına orantılıdır. Devam eden denemenin tam soruları, cevapları, bayrakları ve son zamanı değişmez. Net=doğru−yanlış/4.

Varsayılan değiştirilebilir sınav tarihi **18 Haziran 2027**, anlatım hedefi **28 Şubat 2027**. Uygun günler ve kalan konularla günlük plan hesaplanır. İlk çalışma günü 1; tekrarlar 3/7/21. Bugün, tamamlanan çalışmayı ve gerçek son doğru/yanlış sayısını korur. TYT/AYT ağaçları üstten dallanır; derslerin ayrı renk ve simgeleri vardır.

Ortak 5 dk kum saati 1/5/10/20 dk ve 1–120 dk özel süre, durdurma/devam sunar. Notlar anlatımın altındadır. Ayarlar’da kişisel ilerleme yedeği, geri yükleme ve açık onaylı sıfırlama vardır. Eski notlar, ayarlar ve özel belge baytları korunur. Vercel ve Pages ayrı ilerleme saklar; kişisel yedekle aktarılır. Süre, keşif, kağıt açma veya manuel onay bağımsız öğrenme puanı sayılmaz.

**Doğrulama:**832 birim ve 737 tarayıcı testi, gerçek paketli Windows/Linux 54 aile çevrimdışı/süreç yeniden açılışı, Vercel 736 HTTPS+bir yerel regresyon ve yayımlanmış Pages 54 aile kabulü geçti. Yayın altı dosyalıdır: dört masaüstü paketi ve iki kanıt. Android imza ayarı ertelendi; bu sürümde yeni APK yoktur. Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arasında veri koruyan yükseltme test edilmedi.

**Sonraki aday:** 479 sıralı başlığın tamamı anlatım ve soruyla eşleşir: 480 ayrıntılı rehber, 480 yerleşik özet ve 5.883 soru. Kısa kalan 28 anlatım derinleştirildi; 28 ayrı ileri soru setinde 561 yeni kart var. Ayrıntılı yardım 2.743 sorudadır; 3.140 kartın bütün yardım aşamaları hazırlanıyor. 1.581 birim testi ve normal/prefix üretim derlemesi geçti. Son tarayıcı, masaüstü, güncelleme ve yayın kapıları sürüyor; bu aday henüz canlı 0.17 sayılmaz. TYT 120 soru/165 dakika ve AYT 80 soru/180 dakika, gerçek ders kotaları ve beş seçenekle sunulur. Başlık sayısı bütün Drive/MEB/ÖSYM arşivinin tamamlandığı anlamına gelmez.

Node 24: `npm ci`, `npm run dev`. Kapılar: `npm run check`, `npm test`, `npm run build`, `npm run test:e2e`, `npm run test:desktop`.

[Kapsam](docs/CONTENT_COVERAGE.md) · [Kaynak okuması](docs/SOURCE_REVIEW.md) · [QA](docs/QA.md) · [Forge](FORGE.md) · [Çalışma sırası](docs/ROADMAP.md)
