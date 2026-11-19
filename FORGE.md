# Forge046a — seçim çipleri, iki yeni tema, sade savaş şemaları (çalışma dalı, CI bekliyor)

19 Kasım 2026. Kullanıcı düzeltmeleri:

- **Açılır kutular kalktı.** 106 dosyadaki 219 `<select>` ortak `ChoiceSelect` bileşenine çevrildi: seçenekler doğrudan, yan yana (sığmazsa alt satıra kayan) 44 px'lik çipler olarak görünür; seçili çip vurgu rengindedir. Yerel `<select>` görünmez biçimde çiplerin altında kalır: etiket, değer, değişim olayı, klavye ve ekran okuyucu aynı denetimle çalışır, odak halkası çip grubunda görünür. 12'den uzun listeler okunabilirlik için açılır kalır. Kaydedilen değerler ve ayarlar değişmez.
- **İki yeni tema:** “Axolotl pembesi” (Aion'un pembe gövdesi ve mavi uçlu solungaçları; koyu mor zemin, pembe vurgu, mavi rehber rengi) ve “Trans bayrağı” (#5BCEFA açık mavi, #F5A9B8 pembe, beyaz; açık zemin, üstte bayrak şeridi, yazı taşıyan vurgular okunurluk için aynı tonların koyusu). Açık temaya özel düzeltmeler trans temasına da uygulandı; hash'le sabitlenmiş onaylı CSS dosyalarına dokunulmadı, kopyaları style.css'e eklendi. Bugün kartı iki temaya uyar.
- **Savaş şemaları yeniden tasarlandı:** dış çerçeve kalktı, birlikler harfli yuvarlak pullar (pusu kesik halka, sonuç kırmızı halka), adlar şeklin altındaki HTML anahtar listesinde; hiçbir yazı birliklerin veya okların üstüne binmez. Şekil motoruna `legend` eklendi.

- **Kimya görselleri (6 figür):** Rutherford saçılması (Oynat: çoğu geçer, ikisi sapar, biri geri döner; gözlem–çıkarım ayrımı), Bohr geçişleri (soğurma n=1→3, yayma 3→2 ve 2→1, foton enerjisi karşılaştırması, iyonlaşma), Na→Cl elektron aktarımı ve ardından çekim (bağın aktarım değil çekim olduğu), metalik bağda koridorlarda dolaşan elektron denizi, alanla sürüklenen elektronlar (akım) ve kayan katmanlar (işlenebilirlik; iyonik kristalle karşılaştırma).
- Çiplerde “Bir sonuç seç” gibi boş değerli yer tutucu seçenekler çip olarak çizilmez.

- **Gerçek haritalar:** “Lowpoly” elle çizilmiş dünya şekli kaldırıldı. Natural Earth (kamu malı) 1:50m kara verisi kendi TopoJSON çözücümüzle çevrimdışı bir veri dosyasına dönüştürüldü (`src/learning/geo/`; 637 kara parçası, ~10.500 nokta, ±180° boylamını aşan halkalar bölünür). Ortak `WorldBase` bileşeni okyanus, gerçek kıyı çizgileri ve ince ızgara çizer; dört temaya uygun renkler. Dünya nüfus dağılışı ve coğrafi konum laboratuvarları bunu kullanıyor; harita üzerindeki harfler artık noktaların içinde, hiçbir etiket üst üste binmiyor.
- **Türkiye şekilleri (4 figür, 1:10m gerçek sınır):** iklim tipleri (örnek kentler adım adım), dağların uzanışı ve yağış gölgesi (nemli hava okları, Ege koridorları), Ege horst–graben yakın planı (yalnız kıyı çizgisi, kutu yok), KAF/DAF ve yanal hareket. Dağ, fay ve koridor çizgileri yaklaşık olarak etiketli; yer adları numaralı pullar ve alttaki anahtar listesinde.
- 320 px/büyük yazıda çiplerde sözcük bölünmesi ve taşma giderildi (çip grubu kendi sütununda kalır, sözcükler bölünmez); ayarlar testi 4 temaya güncellendi.

- **Çevrimdışı kurulum dayanıklılığı:** Pages yayın sonrası doğrulaması iki kez, GitHub Pages'in ilk önbellekleme sırasındaki ani ~310 dosyalık yükte rastgele bir dosyaya 503 döndürmesiyle düştü (yayın kendisi başarılıydı). Service worker'a `sw-fetch-retry.js` eklendi: eşzamanlı indirme 8 ile sınırlı, 429/502/503/504 yanıtları kısa bekleyişlerle 3 kez yeniden denenir. Yerel Pages doğrulaması PASS; service worker kullanan 8 tarayıcı dosyası 80/80 PASS.

- **“Haritada nerede?” (otomatik yer haritaları):** Konu anlatımında bir savaş, antlaşma/kongre, deprem/afet, uygarlık merkezi ya da düşünürün yaşadığı yer geçince sayfanın altında iki harita çıkar: dünya haritasında bölge çerçevesi ve bölgenin gerçek kıyılı yakın planı (Natural Earth 1:50m ayrıntılı, yalnız açılınca yüklenir), numaralı işaretler, alttaki anahtarda ad · olay türü · “konum yaklaşık” notu. Yer sözlüğü (`src/learning/geo/gazetteer.ts`) ~90 yer ve düşünür adı içerir (ör. Thales → Miletos, Kant → Königsberg, İbn Sina → Buhara); yalnız kesin özel adlarla ve Türkçe eklerle eşleşir, belirsiz adlar (Talas ilçesi, Gölcük Gölü, Afşin-Elbistan) birim testiyle dışlanır. Şu an 76+ sayfada harita çıkar (tarih, din kültürü, felsefe, coğrafya). Yeni `place-maps-046` testi 1280/320 px ve axe PASS; okuma/rehber tarayıcı testleri 51/51 PASS.

- **Kontur ayrıntısı artırıldı:** Türkiye sınırı ve bölge haritaları artık 0,01° (~1 km) hassasiyetle saklanıyor (önce 0,1° ≈ 11 km) ve daha az sadeleştiriliyor: Türkiye 1:10m 2.248 nokta (önce 1.324), bölge haritaları 35.345 nokta. Körfez, burun ve adalar gerçek biçimiyle görünür.

- **Yumuşak eğriler:** Şekil motoruna `smooth` seçeneği (Catmull–Rom → Bézier) eklendi. Savaş şemalarındaki üçgen dağlar farklı yükseklikte doruklu, yumuşak eyerli sıradağ silüetlerine; Türkiye şekillerindeki dağ, fay ve graben çizgileri akan eğrilere dönüştü.

- **İslam tarihi görselleri:** Uhud Savaşı (625) aşama aşama oynatılan şema: Uhud Dağı arkada (sıradağ silüeti), okçular Ayneyn Tepesi'nde, ilk üstünlük, okçuların tepeyi bırakması (“boş” işareti), Halid bin Velid süvarilerinin arkadan dolanması, dağa çekiliş ve sonuç; Âl-i İmrân 159 istişare bağlamıyla. 622–632 olay şeridi: Bedir/Uhud savaş, Hendek savunma, Hudeybiye antlaşma, Mekke'nin alınması fetih. Yer sözlüğüne Mekke, Medine, Bedir, Uhud, Hendek Savaşı, Hudeybiye, Hayber, Taif, Mute, Kudüs, Yermük, Kadisiye, Habeşistan eklendi (Sakarya'nın Hendek ilçesi dışlanır, birim testli).

- **Hücre çizimi yeniden yapıldı (aynı etkileşim):** porlu çift çekirdek zarı, kromatin iplikleri ve gölgeli çekirdekçik; çekirdek zarıyla sürekli kıvrımlı granüllü ER keseleri ve üzerinde ribozomlar, borumsu granülsüz ER; beş kavisli Golgi kesesi ve tomurcuklanan veziküller; dış zar + iç zar + kristalı mitokondriler; granum yığınlı kloroplast; büyük/küçük alt birimli serbest ribozomlar; çizgili sentriyoller; mikrotübül ve mikrofilament ağı; lipit çift tabakası görünümlü hücre zarı. Bitki hücresinde sentrozoma bağlı lifler çizilmez. Bitki hücresi dikdörtgen değil, dokudaki gibi düzensiz yuvarlatılmış çokgen; çevresinde komşu hücre duvarları (orta lamel) ve duvardan geçen plazmodezmalar. Hayvan hücresi kırıksız, akıcı ve düzensiz bir zarla çizilir.

- **Gerçekçi molekül modelleri:** Şekil motoruna gölgeli 3B küre (`ball`: sol üstten ışık, altta gölge) eklendi. CH₄/NH₃/H₂O küre-çubuk modelleri gerçek 3B bağ yönleriyle, arkadan öne sıralı çizilir; ortaklanmamış çiftler yarı saydam loblar; açılar 109,5° > 107° > 104,5°. CO₂ ile H₂O dipol karşılaştırması: bağa paralel oklar, CO₂'de net 0, H₂O'da açıortay yönünde net etki. Atom renkleri standart renklere yakın (O kırmızı, N mavi, C gri, F yeşil).

- **Parçalar ayırt edilebilir:** Hücrede “Adları göster”: her organelden kenara gösterge çizgisi, adlar iki kenarda eşit aralıkla dizilir (üst üste binmez), seçili organel vurgulanır; ders kitabı etiketli çizim düzeni. Durum `explorations` içinde saklanır, puan vermez.
- **Türkçe sözcük anatomisi:** Şekil motoruna HTML “sözcük” şeridi eklendi: kök (koyu), yapım eki (yeşil), çekim eki (mavi), yardımcı ses (gri) ayrı renkli bloklar ve altında görevleri. Sözcükte yapı rehberinde 5 adım adım figür (göz→gözlük→gözlükçü→gözlükçüler; ev+ler+imiz+den ve evsizlerimizden; iyelik/belirtme -i ve kitab-ı-n-ı; geldim/evim; annemsiz istisnası), örnekler rehberin kendi çözümlemeleri.

- **Mitoz (Drive 035 TYT Mitoz PDF'si okundu):** 2n = 4 gerçekçi hayvan hücresinde G₁ → S → G₂ → profaz → metafaz → anafaz → telofaz → sitokinez, 8 aşama. Uzun ve kısa homolog çiftler ayrı renk ailesinde; kardeş kromatitler sentromer noktasında birleşik yuvarlak çubuklar; çekirdek zarı profazda kesik çizgi, metafazda ekvator düzlemi ve iğ iplikleri, anafazda V biçimli kromozomlar, telofazda iki çekirdek, sitokinezde iki yavru. Her aşamada kromozom · kromatit · DNA molekülü · C ve sayımın alanı (bütün hücre / kutup / yavru) yazar. Hücre döngüsü çarkı (G₁, S, G₂, M, G₀ kolu ve bölünmeyen hücre örnekleri) ve sürgülü hücre başına DNA grafiği (2C → 4C → yavru başına 2C, pg örneği). PDF'deki üç soru tipi (bölünemeyen hücreler, interfazda olmayan olay, “interfazda kromozom sayısı iki katına çıkar” tuzağı) iki taktikle ipucu paneline aktarıldı. Mevcut mitoz dersinin soruları hash ile sabit olduğu için yeni soru eklenmedi.
- **Mayoz (Drive 040–041 Mayoz-1/2 PDF'leri okundu):** Aynı görsel dilde 4 figür. Tetrat yakın planı: anneden (sarı) ve babadan (kırmızı) eşlenmiş homologlar → sinapsis/tetrat → kiyazma → krossing over (kromatit uçları renk değiştirir) → 2 ata tipi + 2 yeni birleşim. 2n = 4 hücrede profaz I'den 4 gamete 7 aşama (homolog çiftler ekvatorun iki yanında, anafaz I'de kardeşler bağlı, Mayoz II'de kardeş ayrılması; her aşamada kromozom/kromatit/tetrat/C). Bağımsız dizilim: iki diziliş ve 2² = 4 bileşim, insanda 2²³. Sürgülü grafik: üstte DNA 2C→4C→2C→1C, altta kromozom 2n→n (anafaz II'de anlık 2n). Kromatitler artık yuvarlak uçlu kapsül ve renkli iç çizgiyle çizilir (mitoz figürleri de). Taktik: tetrat = n, Mayoz I/II ayrımı, çeşitlilik kaynakları.
- **Bedir ve Hendek şemaları:** Uhud ile aynı oynatılabilir motorla. Bedir (624): Şam kervanının kıyı yoluna sapması, Müslümanların kuyuların başında konum alması, mübareze ve genel savaş, Kureyş'in çekilmesi. Hendek (627): Selman-ı Farisi önerisiyle kuzeye kazılan hendek, doğu/batıdaki lav arazisi (harra), kuzeyden gelen ittifak (Ahzab) kuşatması, geçiş denemeleri ve kuşatmanın kalkması; “savunma, fetih değil” vurgusu. Konumlar temsilî, sayı verilmez.
- **Atomun temel tanecikleri (Drive 006 TYT Kimya kopya kâğıdı okundu):** Helyum-4: gölgeli kırmızı proton (+) ve gri nötron toplarından çekirdek, merkeze doğru yoğunlaşan yumuşak elektron bulutu (yörünge halkası yok), kütlenin çekirdekte, hacmin bulutta olduğu ve gerçek oranın 1/10.000–1/100.000 olduğu notu. ²⁷₁₃Al³⁺ renkli gösterim şeridi (A, Z, sembol, q) ile p/n/e top çubukları; O₂ alt indisi. Oksijen-16'ya −2…+2 elektron sürgüsü: çekirdek sabit, e ve q değişir. p–e grafiğinde U/V/W noktaları ve eksenler yer değişince yorum. Taktik: A/Z/q tablosu ve geri kontrol.
- **Durgun elektrik (Drive 009 TYT Fizik kopya kâğıdı okundu):** Gölgeli metal kürelerde +8 μC / −2 μC dokunma (elektron oku, +3/+3 sonuç, “özdeş değilse ikiye bölme”); negatif çubukla etki → toprakla → toprağı kes → uzaklaştır (toprak simgesi, e⁻ toprağa, son yük pozitif; sıra değişirse nötr kalır); cam fanuslu elektroskop (nötr/pozitif/negatif cisim, topuzda zıt, yapraklarda aynı işaret, sonuç tablosu); +Q alanı ve P'de ±q kuvveti, 2r'de E/4. Taktik: dört soru ailesi.
- **Mıknatıslar ve manyetik alan (Drive 011 TYT Fizik kopya kâğıdı okundu):** Çubuk mıknatısın alan çizgileri iki kutuplu modelden sayısal (RK2) olarak hesaplanır: dışarıda N → S, içeride S → N, kesişmeyen kapalı eğriler, kutup yakınında sık; altı pusulanın N ucu gerçek B yönünde. Ortadan kesilen mıknatıs iki N|S mıknatıs olur. 2017 TYT örnek kitapçık mantığı: gergin ip → itme → L = P, K = R. Düz telde ⊙ akım, saat yönünün tersine çemberler, akım sürgüsüyle B(P) ve B(R) = B(P)/2.
- **Ses ve deprem dalgaları (Drive 017 TYT Fizik kopya kâğıdı okundu):** Oynatılan boyuna dalga: 5 sıra hava taneciği gerçek x + A·sin(kx − ωt) konumlarıyla, sıkışma/seyrelme bölgeleri ilerlerken kırmızı tanecik yerinde titreşir; altta basınç eğrisi. Tizlik (frekans), gürlük (genlik) ve tını (harmonikler) temel sesle üst üste. Yankı: hoparlör–tuğla duvar, gidiş-dönüş atması, 0,60 s → d = 102 m. 2020 TYT Fen 6 mantığı: tel boyu L → L/2, λ = 2L, v sabit, f iki kat. Deprem kesiti: odak, merkez üssü, yayılan cepheler, yumuşak ve kaya zeminde iki kasaba (büyüklük tek, şiddet yerel).
- **Prizmalar ve renkler (Drive 024 TYT Fizik kopya kâğıdı okundu):** Işın izleme motoru: her yüzde Snell yasası, normaller kesik, tam yansıma kontrolü. Eşkenar prizmada kırmızı tek ışın, sonra beyaz ışıkta kırmızı/yeşil/mor yelpazesi (fark görünür olsun diye abartılı indis, açıkça yazılı) ve ilk doğrultuya göre sapma açıları. Dik ikizkenar prizmada sınır açısı sürgüsü (38°–50°): 45° üstü/altı tam yansıma ya da kırılma. Kırmızı–yeşil–mavi ışık ekleme daireleri. 2019 TYT Fen 7 mantığı: K–Y–M bileşen zinciri (filtre ve kart yalnız ortak bileşeni bırakır; sarı ışıkta mavi kart koyu).
- **Işık bilgisi (Drive 018 TYT Fizik kopya kâğıdı okundu):** Lamba–kitap–göz ışın yolu (kaynak ile görünen cisim), kaynağı saran kürenin yarıçap sürgüsü (Φ = 4πI sabit, E düşer; 2018 TYT Fen 6 mantığı), ters kare: aynı koni 1, 4, 9 kareye yayılır + E–d eğrisi, normal açısı sürgüsü (E = 20·cos θ lx; yüzeyle açı ↔ normal açısı). Taktik: I/Φ/E ayrımı.
- **Madde ve özkütle (Drive 002 TYT Fizik Madde Bilgisi okundu):** Ölçekli mezür (45 → 57 mL, çukur menisküs, göz hizası, d = 96/12 = 8 g/cm³); dara içeren m–V grafiği (eğim 3 g/cm³, kesişim 40 g kap, m/V = 7 tuzağı); 2024 TYT Fen 1 mantığında özgün değerlerle dört eğim ve A–B karışım oranı sürgüsü (iki boya ne zaman yüzer?); eşit hacim (2) ve eşit kütle (1,5) beherleri; üç çaplı kılcal boruda su yükselir, cıva alçalır (çapla ters orantılı).
- **Soy ağaçları (Drive 030 TYT Biyoloji kopya kâğıdı okundu):** Ders kitabı düzeninde soy ağacı motoru (kare/daire, dolu, taşıyıcı noktası, eşleşme ve kardeş çizgileri, I–II–III nesil). Figürler: şeklin dili; otozomal çekinikte aa çocuktan ebeveynlere, Punnett karesi 1/4 ve boş kardeş 2/3; 2023 TYT Fen 19 mantığında X'e bağlı renk körlüğü (babadan kıza Xᵃ, anneden oğula Xᴬ oku, “anne kesin renk körü” çıkarılamaz); dört modeli somut genotiple eleme.
- **Kalıtıma giriş (Drive 025 TYT Biyoloji kopya kâğıdı okundu):** Homolog kromozom çiftinde lokus bantları ve aleller (Aa heterozigot, BB homozigot); AABbCc gamet ağacı (1 × 2 × 2 = 4, 2ʰ’de h yalnız heterozigot çift); AaBb bağımsız (4 gamet) ve AB/ab bağlı (2 gamet) karşılaştırması; Aa × Aa iki çocuk olasılık ağacı (1/16, tam biri 3/8, en az biri 7/16, vurgulanan yollar).
- **Madde döngüleri (Drive 034 TYT Biyoloji kopya kâğıdı okundu):** Kesit manzarada (deniz, yamaç, ağaç, bulut, toprak, yer altı suyu) buharlaşma, terleme, yoğuşma, yağış, yüzey akışı ve sızma yolları sırayla; 100 birim yağış bütçesi. Azot haritası: her ok başlangıç → sonuç biçimini söyler (fiksasyon, nitrifikasyon iki basamak, asimilasyon, amonifikasyon, denitrifikasyon). Orman karbon bütçesi 60 − 42 − 8 = +10 kg C. Işık sürgüsüyle fotosentez − solunum = net CO₂. Ayrıca: main CI'da OGM kaynak görselinin yüklenmeden okunduğu kararsız tarayıcı testi `expect.poll` ile sağlamlaştırıldı.
- **Lipitler (Drive 006 TYT Biyoloji kopya kâğıdı okundu):** Gölgeli karbon atomlu zikzak zincirler. Trigliserit: gliserolün üç –OH'si ile üç –COOH arasında ester bağları ve çıkan üç su; hidroliz ters yönde suyu tüketir (2021 TYT Fen 16). Doymuş düz, trans düze yakın, cis kırık zincir (turuncu çift bağ). Fosfolipit (baş + iki kuyruk) ve iki sulu yüzlü çift katman. Steroit: kaynaşmış 6-6-6-5 halka, –OH ve yan zincir; trigliseritle karşılaştırma.
- **Sınırlayıcı madde (Drive 031 TYT Kimya kopya kâğıdı okundu):** Gölgeli atomlu H₂, O₂ ve H₂O molekülleriyle 6 H₂ + 2 O₂ tepkimesi tepkime birimi sürgüsüyle ilerler: O₂ biter, 2 H₂ artar, sayaçlar canlı. n / katsayı çubukları (6 H₂ → 3 birim, 2 O₂ → 2 birim; 3 H₂ örneğinde bu kez H₂ sınırlar). 6 mol H₂ için eklenen O₂ – oluşan su platosu (tam oran 3 mol).
- **Yüzde verim (Drive 042 TYT Kimya kopya kâğıdı okundu):** Teorik 20 g çerçeve içinde gerçek ürün sürgüsü (%100 üstünde uyarı); 40 g %75 saf örnekten 0,30 mol CaCO₃ → teorik 13,2 g CO₂ → ölçülen 10,56 g (%80) akışı; ardışık %80 × %75 = %60 hunisi; 2025 TYT Fen 12 mantığında 4 mol su → teorik 6 mol gaz, ölçülen 3 mol → %50 (moleküllerle).
- **AYT Matematik ilk grafikler (4 rehber, 6 figür):** Limit: sıçramalı parçalı fonksiyonda sürgüyle soldan/sağdan yaklaşma (1 ve 3, f(2) dolu nokta); (x² − 4)/(x − 2) deliği. Türev: x²/2 üzerinde h küçüldükçe kesenin teğete (f′(1) = 1) yaklaşması. Belirli integral: x² − 1 için orta nokta dikdörtgenleri (n sürgüsü, + yeşil / − kırmızı, 2/3); v = 3 − t ile yer değiştirme 2,5 ve yol 6,5. Logaritma: 2ˣ ile log₂x'in y = x aynası, nokta–yansıma sürgüsü. İki taktik (limit, belirli integral).
- **AYT Matematik (2), 5 rehber daha:** sin x = 1/2 için birim çemberde 30° ve 150° aileleri ve sinüs grafiğinde [0°, 720°) kökleri; x² − 2 üzerinde yatay doğru sürgüsüyle bire birlik testi (ve dikey doğru testi); 1 + … + 6 merdiveni ve ters kopyasıyla 6 × 7 dikdörtgen (Gauss); x³ − 2x + 1 için kalan = P(a) sürgüsü ve x = 1 çarpanı; birim çemberde α = 30° + β dönmesi ve sin(α + β) açılımının sayısal denetimi.
- **AYT Matematik (3):** ∫ 2x dx = x² + C ailesi, C sürgüsü, paralel teğetler ve F(1) = 3 ile C = 2 seçimi; y = x ile y = x² arası alan (hareketli şerit, 1/6); x²/2 için sol/orta/sağ uç dikdörtgenleri (alt, üst ve orta toplam, 4/3); (0, −1)'den y = x²'ye iki teğet (a = ±1); √x'in x = 4'teki teğetiyle doğrusal yaklaşım ve hata sürgüsü.
- **TYT Matematik ilk figürler (4 rehber, 5 figür):** |x − 2| = 3'ü sayı doğrusunda merkez ± uzaklık olarak; |x − 2| < 3 (içeri) ve > 3 (dışarı), ≤/≥ dolu uçlar; 40 öğrenci–İngilizce–Almanca Venn'i bölge bölge (7, 18, 11, 4); y = 2x doğrusu ile x·y = 12 hiperbolü ve sabit alanlı dikdörtgen; 2ⁿ ile (1/2)ⁿ üs sürgüsü. İki taktik (mutlak değer, Venn).
- **TYT Matematik problemleri (4 rehber, 6 figür):** 300 km arayla karşılaşan iki araç (zaman sürgüsü, kapanan aralık), 60 km önden başlayan araca yetişme, 200 m tren – 600 m köprü (ön uç 800 m), A 6 / B 3 gün işçi çubuğu (birlikte 2 gün), %30 tuzlu suya su ekleme (tuz parçacıkları sabit), 12 × 18 alanı 6 × 6 karelerle kaplama (EBOB) ve 12/18 katları buluşması (EKOK 36). Hız ve işçi taktikleri.
- **Yazı çakışma denetimi:** Geliştirme betiği bütün figürlü dersleri açar; her adımda ve sürgü konumunda SVG yazı kutularının birbirine binmesini ve çerçeveden taşmasını ölçer. Bulunanlar düzeltilir.
- **Ortalama atom kütlesi (Drive 044 TYT Kimya kopya kâğıdı okundu):** Cl-35 / Cl-37 cetveli: her top %5 bolluk, destek ağırlıklı ortalamada (MEB örneği %25 Cl-37 → 35,5 u), sürgüyle bolluk değişir. Eşit kütleli 10 ve 20 akb örneklerinde 2 : 1 atom ve 40/3 akb ortalama.

- **Canlı özellikleri (Drive 001 TYT Biyoloji kopya kâğıdı okundu):** prokaryot (DNA sitoplazmada, ribozom var) ve ökaryot (çift zarlı çekirdek) planı; karbon kaynağı × enerji kaynağı tablosu (fotoototrof, kemoototrof, fotoheterotrof, heterotrof); homeostazi aralık grafiği ve terleme yanıtı; tek hücrelide hücre = organizma. Taktik eklendi.
- **Figür kalitesi:** Kit, nokta/yazı/açı etiketlerinin piksel kutusunu dikeyde de hesaplıyor; çerçeve dışına taşan etiket 0. Eksen sayıları "soft": içerik etiketiyle çakışırsa gizleniyor. Kalan çakışmalar (dönme, Pisagor, Öklid, kenarortay, ikizkenar, EM spektrumu, mitoz G₀, Selçuklu zaman şeridi, DNA uçları, ayna/mercek görüntü etiketi vb.) tek tek giderildi; denetim tüm işaretli rehberlerde 0 bulgu verdi (P(2) = 5 ile y harfi arası 3 px kenar teması hariç). Piksel yerine birim yazılmış açı yarıçapları düzeltildi. Çevre açı figüründe C sürgüsü küçük yaya geçebiliyordu (orada açı 130°); aralık büyük yayla sınırlandı.

- **Fizik bilimine giriş (Drive 001 TYT Fizik kopya kâğıdı okundu):** tek cihazda mercek/bobin/gövde → optik, elektromanyetizma, termodinamik; temel/türetilmiş × skaler/vektörel 2 × 2 tablosu (temel–vektörel hücresi boş); 1 m → 100 cm, 1 m² → 10 000 cm² ızgara, 1 m³ → 10⁶ cm³ küp; sağ +/sol − işaretli toplam sürgüsü; dik 8 N + 3 N → √73 ≈ 8,54 N (5 N tuzağı); 2,0–8,4 cm cetvel okuması ve sabit 0,3 cm kayma. Taktik eklendi.

Doğrulama (yerel): check PASS; 2.649 birim PASS (seçim kutusu arayan üç test yardımcısı ChoiceSelect'i de tanıyacak şekilde güncellendi); build PASS; seçili tarayıcı testleri PASS. Tam tarayıcı seti yerelde ~3,5 saat sürdüğü için çalışma dalında GitHub CI ile koşturuluyor; main'e CI yeşil olunca alınacak.

---

# Forge045b — biyoloji görselleri: nükleik asit, eşlenme, zar (main)

19 Kasım 2026. Görsel hafıza isteğiyle yedi bölüm figürü. Nükleik asitler: nükleotidi adım adım kur (pentoz karbonları, 1′'e baz, 5′'e fosfat, 2′'de OH/H, 3′ OH'ye sonraki fosfat), antiparalel yön (5′-ATGC-3′ → 3′-TACG-5′ → 5′-GCAT-3′), çift sarmal (omurga dışta, uzun pürin + kısa pirimidin = sabit genişlik, kırmızı 2/3 hidrojen bağı, sarmal 10 bç = 3,4 nm), hidrojen bağı sayacı (G–C sürgüsü, 2a+3g). DNA eşlenmesi: Oynat ile ilerleyen çatal; kesintisiz öncü zincir ve primerli Okazaki parçaları; üç orijinden büyüyüp birleşen kabarcıklar ve çatal sayısı. Hücre: tek zar = 2 lipit katmanı, çift zar = 4, zarsız ribozom. Mevcut hücre laboratuvarı ve altı baz çiftlik eşlenme modeli korunur; yeni figürler onlarda olmayanı gösterir. Keşif kaydedilmez.

Doğrulama: check PASS; 2.477 birim PASS; build PASS; ilgili 6 tarayıcı dosyası 58/58 PASS. Ekran görüntüleriyle etiket çakışmaları düzeltildi.

---

# Forge044b — taktik kütüphanesi (main)

19 Kasım 2026. Drive'daki 9 yöntem okundu ve uygulama içi kütüphaneye dönüştürüldü (`src/learning/tacticLibrary.ts`): iki çözümü karşılaştırıp tek yol seçme, 1'e kalan mesafe, sayı doğrusunda aralık, önce ilişkiyi kur, yol/yer değiştirme uç noktaları, etkileşimden kuvvete, birimle kur–oranla doğrula, çürütme kartı ve ön soru. Her yöntemde nerede kullanılacağı, üç adım, özgün sayılarla yeniden yazılmış 1–3 çözümlü örnek, tuzak, ne zaman kullanılmayacağı ve dürüst kanıt notu var (araştırmalar farklı yaş gruplarından; YKS netine etkisi ölçülmedi). Kopya Kağıtları sayfasında açılır “Soru çözme taktikleri” bölümü: kart aç, örneği önce kendin dene, sonra “çözümü göster”. Sekiz soru yöntemi ayrıca ipucu panelinde ilgili konuların sorularında görünür (soru, konunun bütün derslerine göre eşleşir: denklem 46, birim/mol 60, sözel problem, kesir karşılaştırma, hareket, Newton, biyoloji öncül soruları). Ön soru yöntemi bir çalışma yöntemi olduğu için yalnız kütüphanededir. Drive bağlantıları ve kişisel kimlikler Git'e konmadı. Okumak ve çözüm açmak kaydedilmez, XP üretmez.

Ayrıca: ipucundaki “Konu anlatımından” satırı yalnız eşleşen bölümde gerçekten şekil varsa gösteriliyor (kısmi şekilli rehberlerde boş satır kalıyordu; Selçuklu figürleri bunu ortaya çıkardı, CI 639161e'de kırmızıydı, 6d53ab0'da düzeltildi).

Doğrulama: check PASS; 2.467 birim PASS (her taktik en az bir gerçek soruda tetikleniyor, en fazla iki taktik); build PASS; yeni `tactic-library-044` 1280/320 px PASS (9 kart, çözüm gizli başlar, 44 px düğme, taşma yok, axe temiz, öğrenme kayıtları değişmedi); ipucu ve kopya kâğıdı kullanan 15 tarayıcı dosyası 128/128 PASS.

---

# Forge045a — tarih savaş şemaları: aşama aşama, oynatılabilir (main)

19 Kasım 2026. Kullanıcının görsel hafıza isteği üzerine ilk sözel ders görselleri. “Türklerin Anadolu’da yerleşmesi ve Türkiye Selçuklu devletleşmesi” rehberinde dört bölüm figürü: Malazgirt 1071 (6 aşama: karşılaşma → atlı okçu tacizi → sahte geri çekilme → Uz–Peçenek'in taraf değiştirmesi ve artçının çekilmesi → hilal kuşatması → imparator esir), Miryokefalon 1176 (5 aşama: dar geçide giren uzun Bizans kolu, tepelerden ok ve iniş, kapanan geçit çıkışı, geri dönüş), Kösedağ 1243 (5 aşama: öncünün kopması, Moğol sahte geri çekilmesi, pusu, ana ordunun dağılması) ve 1071/1176/1230/1243 karşı güç zaman şeridi. Birlikler aşamalar arasında akıcı kayar; kesik ok o aşamadaki hareketi, kısa ok demeti atlı okçu atışını gösterir; her aşamanın adı ve açıklaması alt satırda okunur. Konumlar temsilîdir ve “ölçekli harita değildir” diye yazılır; paralı askerlerin taraf değiştirmesi “ders kaynaklarındaki anlatıma göre” etiketlidir. Şekil motoruna `once/playMs` eklendi: Oynat baştan sona bir kez ilerler, son aşamada durur (azaltılmış harekette düğme gizli, sürgü çalışır). Keşif kaydedilmez, XP üretmez.

Doğrulama: check PASS; 2.467 birim testi PASS (şekil testleri her aşamada sonlu geometri); build PASS; yeni `history-battles-045` tarayıcı testi 1280/320 px PASS (sürgü End/Home, Oynat son aşamada durur, 44 px düğme, yatay taşma yok, axe ihlali yok, öğrenme kayıtları değişmedi). Ekran görüntüleri masaüstü ve 390 px'te aşama aşama incelendi; etiket çakışmaları üç turda giderildi. Ayrıca ff84b26 CI'ında tarayıcı parçalarının dördü de geçti; yalnız masaüstü smoke eski toplamı bekliyordu (c71c21d'de düzeltildi).

Sıradaki: aynı motorla coğrafya katmanlı harita, biyoloji hücre/DNA, kimya atom–bağ görselleri; Dandanakan ve Osmanlı savaşları.

---

# Forge044 (ilk dilim) — aktif kopya kâğıdı: “Kendini sına” (main)

19 Kasım 2026. Kopya kâğıdında “Kendini sına: formülleri gizle” düğmesi: her formülün eşittir sonrası (noktalı virgüle veya cümle sonuna kadar) “? göster” boşluğuna dönüşür; öğrenci önce kendisi söyler, sonra dokunup açar. Kapatınca kâğıt aynen geri gelir. Açılan boşluklar kaydedilmez, puan/XP üretmez. Mevcut “Bakmadan hatırla” kartları zaten yanıtı gizli sunuyor. Doğrulama: yeni `active-cheatsheet-044` testi 1280/320 px PASS (en az 5 gizli parça, 44 px dokunma hedefi, yatay taşma yok, öğrenme kayıtları değişmedi); kopya kâğıdı/geometri özeti/okuma/uygulama tarayıcı testleri 37/37 PASS. Sıradaki: Drive'daki 9 taktik yönteminin uygulama içi taktik kütüphanesine dönüştürülmesi; Forge045 akıllı oturum başlatıcı.

---

# Forge043 — hata otopsisi: neden etiketi, kapatıp yeniden çöz, hata haritası (main)

19 Kasım 2026. Yanlışlarım ekranında her yanlış/yardımlı soruya yedi hata nedeninden biri seçilebilir (bilgi eksik, kavram yanılgısı, yöntem seçimi, işlem hatası, okuma/dikkat, birim/işaret, süre baskısı); seçilen nedene özel tek cümlelik onarım önerisi gösterilir. “Kapatıp yeniden çöz” açıklamaya bakmadan şıkları yeniden sunar, doğru/yanlış geri bildirimi verir ve onarım sırasını söyler (benzer soru → 3/7/21. gün tekrarı). Üstte nedenlere göre “Hata haritan” çubukları ve nedeni seçilmemiş sayısı. Etiket ve yeniden deneme öğrencinin notudur: `explorations` altında kısa özetli anahtarla (100 karakter sınırı içinde) saklanır, oturum/tekrar/konu ilerlemesini değiştirmez, puan/XP/ustalık üretmez. Bileşen: `src/components/MistakeRepair.tsx`.

Ayrıca: 498ba02'de tarayıcı testlerinin tamamı geçti; yalnız masaüstü paket smoke betiği (`scripts/test-desktop.mjs`) eski 500 konu toplamını bekliyordu, 504'e güncellendi.

Doğrulama: check PASS; 2.462 birim testi PASS; build PASS; yeni `mistake-autopsy-043` tarayıcı testi PASS (etiket, öneri, harita, yeniden çözme, çevrimdışı yeniden açılış, öğrenme kayıtları değişmedi); Yanlışlarım'ı kullanan 8 tarayıcı dosyası 78/78 PASS. Sıradaki: Forge044 taktik kütüphanesi + aktif kopya kâğıdı.

---

# Forge042 — sınav pratiği: şık eleme, klavye, karalama kâğıdı (main)

19 Kasım 2026. Çalışma ve deneme ekranlarında her şıkkın yanında 44×44 px “ele” düğmesi (üstünü çizer, tekrar basınca geri alır; o şıkkı seçmek elemeyi kaldırır). Klavye: 1–5 veya A–E şık seçer, H bir sonraki ipucu basamağını açar, Enter çalışmada kontrol eder/sonraki soruya geçer, denemede sonraki soruya geçer; metin alanlarında ve odaklı düğmelerde devre dışı. Çalışma ekranında çevrimdışı “Karalama kâğıdı” (kalem, silgi, temizle; fare/kalem/dokunma). Elemeler ve karalama kaydedilmez, puan/XP/ustalık üretmez; soru değişince sıfırlanır. Ortak bileşenler: `src/components/AnswerOptions.tsx`, `src/components/Scratchpad.tsx`. 320 px büyük yazıda taşma bulundu ve düzeltildi (karalama düğmesi satıra sarar).

Doğrulama: check PASS; 2.462 birim testi PASS; build PASS; yeni `question-tools-042` tarayıcı testi 1280 ve 320 px'te PASS (eleme, klavye, ipucu, Enter, karalama, axe ciddi/kritik ihlal yok, öğrenme kaydı değişmedi); ipucu/sınav/uygulama/soru sunumu 42/42 ve guidance-029/030 28/28 PASS. Tam tarayıcı paketi CI'da doğrulanacak. Sıradaki: Forge043 hata otopsisi (hata nedeni etiketi, onarım döngüsü).

---

# Forge041 — tek anlatım türü: numaralı sayfalar (main)

19 Kasım 2026. “Adım adım çalış / Tüm anlatım” seçimi kaldırıldı (kullanıcı kararı: tek anlatım türü, sayfa sayfa). Her bölüm “Sayfa x / N” etiketli bir sayfa kartı; her kartın sonunda “Sonraki sayfa: …” düğmesi, üstte kaydırmayı izleyen sayfa göstergesi, altta önceki/sonraki sayfa, ← → tuşlarıyla sayfa çevirme (kaydırıcı, metin alanı ve modellerde devre dışı). İçindekiler artık bütün sayfaları ve “Bakmadan hatırla”yı listeler. Son çevrilen sayfa kaydedilir ve açılışta geri açılır; tembel yüklenen şekiller sayfayı kaydırmasın diye açılan sayfa, öğrenci kaydırana veya dokunana kadar hizalı tutulur. Açılışta odak çalınmaz. Bütün içerik DOM'da kalır; sayfa çevirmek ustalık/XP üretmez. Eski kayıtlı `guided` alanı silinmez, yok sayılır.

Önce gerçek tek-sayfa (yalnız etkin sayfa DOM'da) denendi; 1.307 tarayıcı testinin 60'ı kırıldı ve model–örnek arasında gidip gelen akışlar sayfa değişince modeli kaybediyordu. Sürekli numaralı sayfa düzeni bu sorunu çözerek aynı kullanıcı isteğini karşılar.

Ayrıca düzeltildi: Forge040'tan beri main CI kırmızıydı (benim hatam): tarayıcı testlerindeki konu planı (500 → 504) ve kopya kâğıdı (501 → 505) toplamları güncellenmemişti; Pages bu yüzden güncellenmedi. Toplamlar düzeltildi. Yeni ortak test yardımcısı `tests/e2e/helpers/guidePages.ts` (sayfa açma, örnekler, hatırlama, bölüm sayısı).

Doğrulama: check PASS; 224 dosya / 2.462 birim testi PASS; build PASS; tam tarayıcı paketi önce sayfalı sürümde koşuldu (1.247/1.307), kırılan 24 dosya düzeltilip yeniden koşuldu: 252/256, kalan 4'ten 3'ü sonra düzeltildi (okuma/sayfa testleri 130/130 PASS). Bilinen yerel ortam farkı: source-systems-015/016'da üç dar ekran kelime bölünmesi testi değişiklikten önceki sürümde de yerelde kırılıyor (CI'da geçiyordu); bir `guidance-030` testi yerelde servis çalışanı ön yükleme uyarısıyla zaman zaman kırılıyor. Sıradaki: CI ve Pages doğrulaması; ardından Forge042 (şık eleme, karalama tuvali, klavye kısayolları).

---

# Forge040 — eksik resmî geometri konuları ve her zaman açık ipucu (main)

19 Kasım 2026. Resmî konu listesiyle (341) uygulama dersleri karşılaştırıldı; TYT-GEO-13 çember, 14 daire, 15 silindir/koni/küre, 09 trigonometrik oranlar ve AYT çember/daire konularının ayrı dersi yoktu. Bu turda **Çemberde açı, kiriş ve teğet** eklendi: 11 bölüm, 10 hesaplanmış şekil (sürgülü merkez/çevre açı, teğet, kiriş–merkez, kuvvet bağıntıları, kirişler dörtgeni), 3 çözümlü örnek, 4 hatırlama, 12 tam açıklamalı özgün soru, kopya kâğıdı. Ders ve kayıtlar dizilerin sonuna eklendi; önceki 536 ders, 6.417 soru ve 479 çalışma başlığı aynen korundu (sabit toplam testleri 537/6.429/502/501 olarak güncellendi). Denemelerde ipucu ve adım adım çözüm artık her soruda açık; seçim kutusu ve “çözüm desteğini aç” kapısı kaldırıldı (kullanıcı kararı: sınav olurken öğrenmek). Kişisel test APK'sı 1b54ae8 için başarıyla derlendi (Build personal Android test APK #9). Doğrulama: check, 224 dosya / 2.433 birim testi, build, ipucu/sınav/geometri özeti tarayıcı testleri 12/12 PASS. Ek tur: **Daire, daire dilimi, çevre ve alan** dersi (10 bölüm, 9 şekil, 3 örnek, 12 soru, kopya kâğıdı); toplamlar 538 ders / 6.441 soru / 503 rehber / 502 çalışma başlığı. Kullanıcı bütün paketleri onayladı; kalıcı 6 adımlı tur kuralları ve ders ders laboratuvar planı [docs/FORGE_ROADMAP.md](docs/FORGE_ROADMAP.md). Doğrulama: check, 2.443 birim testi, build, geometri özeti + ipucu tarayıcı testleri PASS. Ek tur: **Silindir, koni ve küre** (10 bölüm, 9 şekil: eğik görünüm, açınım, 1/3 doldurma, ana doğru–dilim açısı, 3:2:1, batan bilye, paralel kesit, döndürme ekseni; 12 soru, öncüllü I–II–III dahil). Öncüllü soru metinleri artık satır satır gösteriliyor (`.question-prompt`). Toplamlar 539 / 6.453 / 504 / 503. Doğrulama: check, 2.453 birim testi, build, geometri özeti + soru sunumu + sınav tarayıcı testleri 11/11 PASS. Ek tur: **Dik üçgende trigonometrik oranlar** (9 bölüm, 8 şekil, 3 örnek, 12 soru, özel açı tablosu). Toplamlar 540 / 6.465 / 505 / 504. Doğrulama: check, 2.462 birim testi, build, geometri özeti tarayıcı testi PASS. TYT geometri resmî konularının artık hepsinin dersi var (özel üçgenler üçgen derslerinde dağınık). Sıradaki: Forge041 sayfa sayfa anlatım; sonra AYT çember–daire ve katı cisim derinleştirmesi.

Fikir listesi (kullanıcıdan, sırası belirlenmedi): güven derecesi (Eminim/Şüpheliyim/Tahmin), önkoşul köprüsü, aktif kopya kâğıdı (gizli parça doldurma), 30 saniyelik sınav yolu sekmesi, turlama/süre nabzı, AIONIA piksel atölyesi, haftalık hata boss'u, 60 sn refleks ısınması, Web Audio ses (kapatılabilir), ders bazlı tembel yükleme, tekrar yükü dengeleyici, zen odak modu ve kaydırma jestleri, bağımsız çözüm ısı haritası; ayrıca karalama tuvali, şık eleme, biyom haritası, hata nedeni etiketi.

---

# Bölüm figürleri — fizik enerji, dalgalar ve ısı (main)

19 Kasım 2026, Türkiye saati. Kullanıcı onayıyla `claude/laughing-ritchie-l0rre4` main'e alındı (`520662c..f5c5dd3`); bu tur aynı yoldan gider. İşleme sayacı: [docs/ISLEME_SAYACI.md](docs/ISLEME_SAYACI.md).

Bu tur: enerji ve hareket (20), dalgalara giriş (9), yay dalgaları (9), su dalgaları (9) bölüm figürü ve 7 yeni soru tipi taktiği. Toplam 34 rehber / 368 bölüm / 318 figür / 30 taktik; Sayısal rehberlerin 34/367'sinde figür var. Okunan PDF: 019 TYT Mekanik Enerji ve 054 TYT Yay Dalgaları (toplam bu dalda 3; kanonik defter 8.981: 7 tam / 2 kısmi, değiştirilmedi). Bulunup düzeltilen: `dim` yalnız etiket çizdiği için fizikte ölçü çizgileri görünmüyordu (yeni `span` yardımcısı, eski basınç/barometre/manometre/dalga boyu figürleri de düzeltildi); açı yarıçapları birim sanılıp piksel verilmemişti. Main CI'daki tek kırmızı test (`source036037` eski tema varyantı) uygulama değil test yarışıydı: son tıklamanın IndexedDB yazımı bitmeden sayfa yenileniyordu; test artık kaydın oturmasını bekliyor. İkinci tur: ısı ve sıcaklık (9), genleşme (8), hal değişimi (7) figürü ve 4 taktik; 025/026/028 TYT ısı PDF'leri okundu. Güncel: 37 rehber / 394 bölüm / 342 figür / 34 taktik; Sayısal 37/367; bu dalda okunan PDF 6. Doğrulama: check, tam birim testi, build; ilgili 7 tarayıcı dosyasında 187/187 + yarış testi 2/2 yerelde PASS.

---

# Bölüm figürleri — geometri anlatımı (geliştirme dalı)

18 Kasım 2026, Türkiye saati. **Dal `claude/laughing-ritchie-l0rre4`, taban 0.24 adayı `520662c`; main'e alınmadı, yayımlanmadı.** [Ayrıntı](docs/SECTION_FIGURES.md).

Gerçek tarayıcı ölçümü, 15 geometri dersinin her birinde yalnız tek bir büyük şekil olduğunu ve kalan bölümlerin şekli yalnız yazıyla anlattığını gösterdi. Bu dalda 19 geometri rehberinin (15 TYT + 4 AYT) 202 bölümünden 187'sine, o bölümün anlattığı şekli hesaplanmış koordinatlarla çizen figür eklendi (46 sürgülü, 21 adımlı). Figürler tema token'larını kullanır, erişilebilir ad taşır, tembel ve çevrimdışı önbellekli yüklenir; değiştirmek öğrenme kanıtı/XP üretmez. Her figür ekran görüntüsüyle incelendi; bulunan gerçek çizim/etiket hataları düzeltildi. Main'de de başarısız olan dik üçgen etiket çakışması (geometry-right-framing024, 320 px büyük yazı) giderildi. Yeni birim testi figürleri bölüm başlıklarına bağlar. Varsayılan ayarlar değişmedi: yeni profil teması Matrix, kişisel hedef tarihi 2027-02-28 kaldı. Ayrıca TYT Fizik optik rehberlerine (ayna, küresel ayna, kırılma, mercek, gölge) hesaplanmış ışın çizimli 39 figür eklendi. Sıradaki: kalan fizik ve diğer dersler; dalın tam uzak CI/Pages kabulü.

---

# Forge038039 / görsel 0.24 adayı

18 Kasım 2026, Türkiye saati. **Yerel aday; henüz yeni tam CI veya yayın yok.** [FORGE038039](docs/FORGE038039.md), eklenen iki kaynak ünitesini, asıl OGM sorularını, görsel kontrolleri ve açık kapıları tutar. Son doğrulanmış yayın aşağıdaki 0.23.0’dır.

C2 birleşiminde check, normal/alt dizin derlemeleri ve 223 dosyada 2.032 birim testi geçti. Önceki C1’in 111 ilgili tarayıcı testi, diğer 620 ürün girdisinin değişmediği kesin karşılaştırmayla ayrılır; C2’nin ilk görsel adım düzeltmesi iki yeni gerçek UI testiyle doğrulandı. C2 alt dizin ve bu Linux VM’deki gerçek yerel paket, 114’er ortak model akışı ve ayrıca altı asıl OGM sorusunu geçti. Aynı kökenli gerçek 0.23→0.24 web güncellemesinde üç ham veri deposu ve eski kayıtlar korundu; etkinleşme otomatik ilerleme yazmadı. Bunlar yayımlanmış Pages/AppImage, Windows veya telefon kabulü değildir.

İlk C2 birim turundaki tek zaman aşımı, native ilk denemesindeki gerçek ENOSPC hatası ve eski service worker kontrolünde kalan ilk güncelleme denemesi saklanır. Test süreleri/beklentileri gevşetilmedi. Yer açıldıktan sonra yeni profillerde tam yerel akışlar geçti; service worker zaman aşımının kesin nedeni ayrıca kanıtlanmış sayılmaz. Sıradaki kapılar tam uzak CI/E2E, gerçek Pages/Release/AppImage ve ayrı kişisel APK geri okumasıdır; main bu yayın zinciri bitene kadar ilerletilmez.

Kanonik öğretim sayısı **8.981: 7 tam / 2 kısmi / 8.972 belirsiz**; asıl soru/şekil sadakati ayrı ve tamamlanmamış ölçüdür. Kaynak012/013/014 kapanışı veya yeni okuma kredisi verilmedi. Source012’nin ek sekiz istemi ile Source014/015 sonraki özel hazırlıkları bu 0.24 adayına dahil değildir.

---

# 0.23.0 doğrulanmış yayın — Forge036037

18 Kasım 2026, Türkiye saati. Kaynak `2bbddcf6de7fb1d0dafd03bd6e8f94e88c4579d0`; [tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/44195707384), [otomatik Pages](https://github.com/kaansavukduran/yksmania/actions/runs/44200061070) ve [masaüstü Release](https://github.com/kaansavukduran/yksmania/releases/tag/v0.23.0-alpha.1) aynı kaynağa bağlıdır. [Ayrıntılı kabul tablosu](docs/FORGE036037.md). Main, CI/Pages/Release ve gerçek yayın dosyası kabulleri bitene kadar sabit tutuldu.

Denklemler ve basit eşitsizlikler **57 bölüm, 60 çözümlü örnek, 40 hatırlama, 87 gerekçeli soru, 435 seçenek açıklaması, 22 ayrı özet bölümü ve 14 hesaplamalı model** ekler. Toplam 533 set / 499 rehber / 499 ayrı özet / 498 çalışma başlığı / 6.301 soru = 3.661 tam + 2.640 kısmi yardım. Önceki içerik, ilk 479 Excel kimliği/sırası, kişisel kayıtlar ve özgün tekrar tarihleri korunur; görsel keşif, süre ve manuel onay ustalık/XP üretmez. Öğrenci PDF/katalog yüklemez.

**Final kaynakta gerçek uzak kabul:** 215 dosyada 1.977 birim, dört grupta 352+291+321+321 = 1.285 tarayıcı testi PASS; başarısız/flaky/skip/retry yok. Paketli Windows ve Linux’un her birinde 112 farklı çevrimdışı model akışı, 61 PASS alanı ve rendererErrors=0 doğrulandı. Genel main APK işi kalıcı imza yapılandırılmadığı için beklenen şekilde atlandı; iki Windows/Linux artifact’i kaynak ve koşuyla eşleşti.

**Gerçek web ve indirme kabulü:** Pages hem alt dizin derlemesinde hem gerçek yayında 112 akışı geçti. Gerçek yayındaki 301 dosya/28.243.429 bayt normal TLS ile eşleşti. Release’in altı varlığı, etiketi, kaynak bilgisi, beş manifest girdisi ve GitHub digest’leri eşleşti; genel APK yok. Gerçek 146.015.722 bayt AppImage indirilip kendi değiştirilmemiş binary’siyle 112 akış, aynı profil süreç yeniden açılışı, notlar ve puan üretmeme kontrollerini geçti; stderr/renderer hatası 0. İçindeki 301 dosya/28.243.619 bayt normal C4 derlemeyle aynı; 593 kaynak girdisi ve 19 harness dosyası korunur. Bu, fiziksel cihaz/temiz OS/portable taşıma/kurulu native iki sürüm yükseltmesi kabulü değildir.

**Yerel sürüm ayrımı korunur:** tarihsel C3’ün tam 1.977 birim, sekiz normal UI, alt dizin 112 ve native 112 sonuçları kendi sürümüne aittir; o native komutun kesinti sırasında kaydedilemeyen çıkışı sonradan exit0 sayılmadı. C4 yalnız iki son yönerge metnini sadeleştirir, diğer 591 ürün girdisi aynıdır. C4’ün dört normal UI vakası ile paketli native ve alt dizinde hedefli ikişer ünite/14 mod kabulü ayrıca geçti; Yayın öncesi C4 paketinde yerel tam 112 tekrar yapılmış sayılmaz. Final kaynağın tam 112 Windows/Linux, gerçek Pages112 ve kamu AppImage112 sonuçları ise yukarıdaki gerçek uzak/yayın koşularıdır.

Gerçek aynı kökenli 0.22→C4 0.23 web güncellemesi üç ham IDB deposunu bayt bayt korudu; otomatik state.put 0. Eski ayarlar, notlar, yarım soru, 5/5 paragraf, 40 cevaplı deneme ve özgün 3/7/21 tarihleri normal eski arayüzden oluşturulup korundu. Yeni modellerin ilk çevrimdışı kullanımı ve tüm tarayıcı sürecini yeniden açma geçti. Bu, kurulu native sürüm yükseltmesi değildir.

Eski iki regresyonda önceki FAIL kayıtları ve sonraki 2/2 PASS korundu: rehber/native seçicisi eski tam başlığa bağlandı, geniş soru sorgusu aynen tutularak eski 10/yeni 42 setleri ayrı kimliklerle denetlendi. Yalnız üç test/harness dosyası onarıldı. Eski light/system tercihlerinin her birinde 81 ölçümdeki 61 kontrast başarısızı sıfıra indi; yeni tema eklenmedi. 0.23’ün başlangıç teması mevcut koyu temadır; Matrix seçilebilir. Türkçe ürün dili, mevcut/Matrix, Lexend, ortak kum saati ve alttaki notlar korunur.

[Kişisel Android test paketi](https://github.com/kaansavukduran/yksmania/actions/runs/44195736233/artifacts/14378249327) 0.23.0-test/kod 33/ayrı `.test` kimliğinde hazırdır: 19.391.282 bayt, bağımsız v2 kriptografik doğrulama, derlenmiş paket/sürüm/etiket ve 301 dosya eşleşmesi PASS. Fiziksel telefon denenmedi; secret istenmez ve genel APK yayımlanmadı. 0.22 test sertifikası farklıdır; Deneme’yi kaldırmadan önce kişisel yedeği doğrulama notu kurulum dosyasında bulunur. Eski sürüm dosyaları korunur.

**Gerçek kanonik kapanış tamamlandı:** kayıtlı 8.981 PDF’de **7 tam, 2 kısmi, 8.972 belirsiz**. Denklem ve eşitsizliklerin yalnız iki satırı korumalı C4A işleminde COMMITTED/APPLIED_VERIFIED oldu; diğer 8.979 ham JSON ve CSV kaydı, eski kararlar ve okuma geçmişi korundu. Bağımsız salt okunur rapor aynı üç hash ve sayaçları doğruladı. Bu yedi sertifika öğretim maddeleri, örnek/çözümler ve uygulama eşlemeleri için doğrulanmış kapanışlardır. Kaynaktaki bütün soruların asıl metin, seçenek ve şekilleriyle birebir yerleşik aktarımının tamamlandığı anlamına gelmez; bu ayrı sadakat denetimi ve geliştirme ölçüsüdür, toplu tamamlanma sayısı henüz çıkarılmadı. Okuma 154 PDF / 1.915 dosya-sayfa / 1.919 sürüm-sayfa olarak değişmedi; 40 PDF’de 540 farklı uygulama kimliği bağlı. Bütün arşivin tarihsel tam/kısmi/hiç toplamları bilinmiyor; belirsiz hiç işlenmemiş değildir. [Güncel rapor](docs/PDF_SOURCE_PROGRESS036037.md).

Sonraki 0.24 için Mutlak Değer ve Üslü Sayılar yalnız izole geliştirme önerisidir; bu yayına veya kanonik kapanışa eklenmez. Kaynak sorusunun öğretimdeki karşılığı ile asıl metin/şık/şeklin birebir korunması ayrıca izlenir; bu önerilerin 55’er özgün kartı kaynak PDF’nin asıl soruları diye sunulmaz. Kaynak 012/013 kanonik belirsiz kalır. Matrix’in varsayılan olması da 0.24 görsel önerisine aittir, yayımlanan 0.23’e değil. Bilimsel Gösterim özel kaynak/metin/model hazırlığındadır. Kaynak Excel’i ve ayrı PDF üretim otomasyonu değiştirilmez. Vercel’in son doğrulanmış durumu HTTP 402; kullanılabilir web Pages’tir. Bütün arşiv tamamlanmış değildir.

---

## Aşağıdaki 0.22 ve eski kayıtlar kendi tarihsel kaynaklarına aittir

# 0.22.0 — iki kaynak, Pages, masaüstü ve kişisel APK kabulü

17 Kasım 2026. Yayın kaynağı `5bdc4a15123666b3dc701a802f7f6be7000a383a`; [ayrıntılı devir](docs/FORGE034035.md). [Web uygulaması](https://kaansavukduran.github.io/yksmania/) · [Windows/Linux indir](https://github.com/kaansavukduran/yksmania/releases/tag/v0.22.0-alpha.1) · [Kişisel Android deneme paketi](https://github.com/kaansavukduran/yksmania/actions/runs/44146818660/artifacts/14355659976)

EBOB–EKOK ve rasyonel sayılar: **55 bölüm, 44 çözümlü örnek, 35 hatırlama, 94 gerekçeli soru, 24 ayrı özet bölümü ve 14 hesaplamalı model**. Güncel ürün 531 set / 497 rehber / 497 özet / 496 çalışma başlığı / 6.214 soru = 3.574 tam + 2.640 kısmi yardım içerir. Önceki içerik, ilk 479 Excel kimliği/sırası, ayarlar, notlar, taslaklar, denemeler ve özgün tekrar tarihleri korunur.

[Tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/44152986079), 212 dosyada 1.939 birim testini geçti; dört shard’da 1.277 tarayıcı testi ve gerçek paketli Windows/Linux işleri başarılıdır. Her masaüstü platformunda 110 çevrimdışı model akışı sınandı.

[Otomatik Pages](https://github.com/kaansavukduran/yksmania/actions/runs/44158312379) aynı kaynakta yayımlanan uygulamanın 110 farklı çevrimdışı model akışını, soru geri bildirimini, notları ve reload ile kayıt korunumunu geçti; renderer ve eksik istek hatası yoktur. Yayındaki 297 dosya / 27.970.391 byte normal TLS doğrulamasıyla sabit alt dizin derlemesine birebir eşleşti.

[Masaüstü yayınının](https://github.com/kaansavukduran/yksmania/releases/tag/v0.22.0-alpha.1) kaynak etiketi, beş manifest girdisi ve GitHub dosya özetleri eşleşti. Altı yayın varlığı içinde genel APK yoktur. Gerçek AppImage ayrıca indirilip kendi değişmemiş binary’siyle bu Linux VM’de 110 çevrimdışı akış, notlar, taslaklar, Bugün sonucu ve aynı profilde süreç yeniden açılışından geçti; 297 web dosyası sabit normal derlemeye eşleşti.

İlk `bbb681d` tam CI’si 1.259 başarılı / 18 başarısız tarayıcı vakasıyla bitti; buna bağlı Pages işi doğru biçimde atlandı ve o kaynakla masaüstü yayını yapılmadı. On eski konu toplamı, dört eski özet toplamı, üç belirsiz rasyonel başlık seçicisi ve bir çevrimdışı reload sonrası menü hazır-olma kontrolü düzeltildi. Değişiklik yalnız dokuz E2E dosyasıdır; süre, retry, atlama veya öğrenme beklentisi gevşetilmedi. Başarısız 18 vaka ile aynı yardımcının iki ek çağrısı gerçek UI’de geçti; ardından son kaynakta tam CI yeniden başarılı oldu. İlk hata geçmişi korunur.

Android için **YKSMania Deneme 0.22.0-test / kod 32** hazırdır: 19.305.624 byte, ayrı `com.fragaria.yksmania.test`, otomatik test imzası. Gerçek APK’nin paket/etiket/sürümü, v2 imzası ve 297 çevrimdışı web dosyası doğrulandı. Actions ZIP’ini GitHub hesabınla indirip açarak APK’yı telefona kurabilirsin. APK kaynağı `bbb681d` ile yayın kaynağı arasındaki fark yalnız dokuz E2E test dosyasıdır; 584 uygulama girdisi aynıdır. Kullanıcıdan secret istenmez; genel APK/mağaza yayını yapılmadı. Fiziksel telefonda kurulum/ilk açılış henüz denenmedi. Önceki deneme sürümünün sertifikası farklıdır; Android güncellemeyi reddederse yalnız Deneme uygulamasını kaldırmadan önce kişisel ilerlemeni yedekle.

**Kanonik PDF raporu: 8.981 dosya: 5 tam, 4 kısmi, 8.972 belirsiz.** EBOB–EKOK ve rasyonel sayıların güncel PDF sürümleri; bütün öğretim eşlemeleri, bağımsız kaynak incelemesi, gerçek kullanım ve son yayın kapıları doğrulandıktan sonra 17 Kasım 20:10 UTC’de korumalı kanonik işlemle tam durumuna geçirildi. Yalnız bu iki kaynak satırı değişti; diğer 8.979 satır, okuma kayıtları ve eski karar geçmişi korundu. Son 19:21–19:23 UTC Drive metaveri taraması aynı 8.981 PDF ve 247 klasörü buldu; eklenen, kayıp veya değişmiş dosya metaverisi yoktu. Çok istekli tarama atomik görüntü veya içerik okuma sayılmaz. 40 PDF’de uygulama bağı ve 154 PDF’de okuma kaydı korunur; yeni okuma kredisi yoktur. [Güncel rapor](docs/PDF_SOURCE_PROGRESS034035.md).

Vercel HTTP 402; fiziksel telefon, temiz kurulum, portable taşıma ve iki kurulu native sürüm arasında yükseltme henüz kabul edilmedi. Source036/037 ve Source038 sonraki özel hazırlıklardır; 0.22 envanterine veya tam PDF sayısına dahil değildir. Kaynak Excel, ayrı PDF üretim otomasyonu ve Drive belgeleri değiştirilmez. Yeni tur önce mevcut sahibin devrini, gerçek main/Actions ve kanonik defteri uzlaştırır; aynı sürüme ikinci yayın başlatmaz.

---

## Aşağıdaki geliştirme adayı ve eski sürüm kayıtları tarihsel olarak korunur

# 0.22.0 geliştirme adayı — Forge034035

17 Kasım 2026. **Henüz yayımlanmadı; main’e 0.22 kaynak gönderimi, uzak CI, yeni Pages/masaüstü yayını veya yeni doğrulanmış APK sonucu yoktur.** Son doğrulanmış yayın 0.21.0’dır. Belge tabanı `8422b861211829e3d00e864cac442ba593899178`, yayımlanmış `197dc1b31c0a45ad03a3782106665591cc0c32fc` kodu üzerindeki belge güncellemesidir. [Ayrıntılı devir](docs/FORGE034035.md).

EBOB–EKOK ve rasyonel sayılar toplam 55 açıklama bölümü, 44 çözümlü örnek, 35 hatırlama, 94 gerekçeli soru, 24 ayrı özet bölümü ve 14 hesaplamalı model ekler. Güncel aday: 531 set / 497 rehber / 497 özet / 496 çalışma başlığı / 6.214 soru = 3.574 tam + 2.640 kısmi yardım. Önceki 6.120 sorunun bütün verileri ve sırası, ilk 479 Excel kimliği ve kişisel öğrenme kayıtları korunur.

Son C6: check 374 modül, 1.939/1.939 birim; eski 108+iki yeni kaynakla prefix 110/110 ve gerçek paketli Linux 110/110 çevrimdışı akışı/süreç yeniden açılışı geçti. Paket içindeki 297 web dosyası sabit C6 derlemesine birebir eşleşti. Yerel UI’nin iki ekran profili, tam 46/48 oturumu ve aynı kökenli 0.21→0.22 yükseltme kanıtı; sonraki üç metin alanının kesin değişim köprüsü ve gerçek C6 hedef tekrarlarıyla korunur. Üç ham IndexedDB deposu değişmedi; otomatik `put` 0. Bu kabul fiziksel kurulum veya Windows kabulü değildir.

İlk C5 kopya denetimindeki gerçek yazım kusurları C6’da düzeltildi; bağımsız kaynak incelemesi 85/66 birimi, 283/380 bağ kenarını ve 108/130 farklı hedefi doğruladı. İlk prefix/native denemeleri son modelin erişilebilir açıklamasındaki büyük/küçük harf beklentisinde FAIL verdi; testin tam literal açıklaması düzeltildi. Sonraki native koşusu eski 494 toplamını bekleyen kontrolde FAIL verdi; yalnız iki toplam beklentisi gerçek 496 sayımına güncellendi. Uygulama değişmeden son iki tam akış tekrar geçti. Başarısız geçmiş saklandı; eski 108 aile ve Pages’in 158 doğrudan beklentisi korunur.

Yeni resmî 2021 TYT Matematik 15 bağlantısı gerçek kitapçık/anahtarda A=7’dir. Çevrimdışı 225+252=477 ortak kat çözümü kendi verileri açık, özgün ve puansız öğretim örneğidir. Önceki dokuz bağlantı sırası korunur; toplam 10 bağlantı/10 özgün örnek bütün ÖSYM arşivi değildir.

Tam E2E keşfi 1.277 vaka gösterir; 1.269 eski vakanın kimliği/metadata’sı değişmez. Keşif yürütülmüş test sonucu değildir. Sıradaki kapılar sabit kaynak commit’inde tam uzak CI, otomatik Pages 110, gerçek masaüstü yayın dosyaları ve ayrı Android test32 APK kabulüdür. Main bu kapılar bitene kadar sabit tutulur. Kullanıcıdan secret istenmez; genel APK/mağaza yayını yoktur.

Kanonik PDF durumu **8.981 / 3 tam / 6 kısmi / 8.972 belirsiz** olarak değişmedi; 40 kaynakta uygulama bağı, 154 PDF’de okuma kaydı vardır. Belirsiz hiç işlenmemiş değildir; 22/13 sayfanın yeniden okunması yeni okuma/tamamlama sayısı değildir. İki kaynak kapanışı yeni commit/tam CI ve korumalı bağımsız defter işlemini bekler. Source036 C4 ve Source037 özel hazırlıkları bu sürüme dahil değildir. Ham PDF, özel kimlik ve özel denetim dosyaları Git’e taşınmaz.

---

## Aşağıdaki 0.21 ve daha eski kayıtlar kendi tarihsel kaynaklarına aittir

# 0.21.0 — kaynak, masaüstü, Pages ve kişisel APK kabulü

17 Kasım 2026. Yayın kaynağı `197dc1b31c0a45ad03a3782106665591cc0c32fc`. [Tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/44086453423) 1.907 birim / 1.269 tarayıcı ve gerçek paketli Windows/Linux 108’er akışla başarılıdır. [0.21 masaüstü yayını](https://github.com/kaansavukduran/yksmania/releases/tag/v0.21.0-alpha.1), kaynak etiketi ve dosya özetleriyle doğrulandı. Gerçek indirilmiş AppImage 108 çevrimdışı akış, aynı profilde süreç yeniden açılışı ve altı normal dış bağlantı etkinleştirmesini geçti. Fiziksel video/tarayıcı, temiz kurulum ve native iki sürüm kurulumu kabulü değildir.

Faktöriyel: 20 bölüm, 16 örnek, 12 hatırlama, 43 tam yardımlı soru, altı model ve ayrı sekiz bölümlük özet. Toplam 529 set / 495 rehber / 495 özet / 494 çalışma başlığı / 6.120 soru = 3.480 tam + 2.640 kısmi yardım. Eski 6.077 soru ve bütün eski kimlik/sıra/ayar/not/taslak/tekrar tarihleri korunur. Güncel Faktöriyel PDF’sinin 81 öğretim maddesi 199 gerçek uygulama konumuyla ve bağımsız kabulüyle eşleştirildi; kapanışı korumalı defter işlemine alındı.

[PDF raporu](docs/PDF_SOURCE_PROGRESS033.md): **8.981 PDF / 3 tam / 6 kısmi / 8.972 belirsiz**. Son 45 dosya yalnız metaveri ekidir; okuma/tamamlama değildir. Belirsiz hiç işlenmemiş sayılmaz. Önceki kaynak sürümleri ve karar geçmişi korunur.

**Pages doğrulandı:** [aynı kaynaklı otomatik işin ikinci denemesi](https://github.com/kaansavukduran/yksmania/actions/runs/44091144353/attempts/2), yayımlanan 0.21 üzerinde 108 farklı çevrimdışı model akışını, soru geri bildirimini, notları ve reload ile kayıt korunumunu geçti; renderer ve eksik istek hatası yoktur. Önceden başarılı build/deploy adımları tekrar çalıştırılmadı. [Süre sınırı ve adım kayıtları eklenmiş ayrı doğrulama](https://github.com/kaansavukduran/yksmania/actions/runs/44120954459) da aynı 108 akışı geçti. Bu ayrı dalın üretim girdileri yayın kaynağı `197dc1b` ile aynıdır; yeniden dağıtım ve TLS atlatma yapılmadı. İlk otomatik deneme sonuç üretmeyince iptal edilmişti; iptal geçmişi korunur, takılmanın gerçek nedeni bilinmiyor.

Yayındaki 293 dosya normal TLS ile sabit üretim dosyalarına eşleşti. İptal edilmiş son adımın geçmişi korunur; bu byte denetimi bütün canlı 108 akışın kabulü değildir. Main, mevcut CI/yayın ve iki canlı doğrulama boyunca aynı kaynakta tutuldu. İkinci otomatik denemenin gerçek sonucu, yayımlanan 108 akışın artifact’ı ile ayrıca doğrulandı.

[Kişisel APK](https://github.com/kaansavukduran/yksmania/actions/runs/44082360745/artifacts/14328077495): 19.212.294 byte, `0.21.0-test` / kod 31, ayrı `com.fragaria.yksmania.test`, otomatik debug imzalı. APK kaynağı `cc589984` ile yayın `197dc1b` arasında yalnız üç E2E dosyası değişmiştir; üretim girdileri ve APK’nin 293 web dosyası aynı kabul edilmiş C3’le eşleşir. Ayrıca iki boş Capacitor/Cordova dosyası vardır. Fiziksel kurulum denenmedi; APK genel yayına eklenmedi. Önceki test sürümünün debug sertifikası farklıdır; kaldırmadan önce yedek al.

Sıradaki özel EBOB–EKOK adayı: 85 kaynak maddesi, 283 öneri bağı, 29 bölüm, 24 örnek, 18 hatırlama, 46 açıklamalı soru, 12 özet bölümü ve yedi model. Bağımsız özel öneri kabulü, gerçek uygulama kaydı/tarayıcı/paket/yayın veya yeni tam PDF kararı değildir. Rasyonel sayılar özel hazırlığı da sürmektedir. Öğrenciye PDF yükleme işi bırakılmaz; başka PDF üretim otomasyonu değiştirilmez.

---

## Aşağıdaki kayıtlar tarihsel: önceki aday ve 0.20 yayını

# 0.21.0 geliştirme adayı: Forge033

Faktöriyel kaynağının 15 sayfasından 20 bölüm, 16 çözümlü örnek, 12 hatırlama, altı hesaplamaya bağlı interaktif model, sekiz bölümlü ayrı özet ve 43 tam yardımlı özgün soru uygulamaya işlendi. Toplam 495 rehber/özet, 494 çalışma başlığı ve 6.120 soru vardır: 3.480 tam, 2.640 kısmi yardım. Eski 6.077 sorunun tüm verisi/anahtarları ve eski içerik/sıra aynen korunur. Kaynak 81 ayrı öğretim maddesi ve 199 gerçek uygulama konumuyla özel defterde izlenir; kanonik PDF kapanışı henüz değiştirilmedi.

Son yerel kabul: TypeScript, 1.907/1.907 birim, son C3 hedef 4/4 gerçek UI ve yerel `/yksmania/` 108/108 çevrimdışı model akışı PASS. Masaüstündeki kaynak bağlantısı onarımı 55 politika testi ve gerçek kaynak Electron'da altı normal bağlantı/süreç yeniden açılışıyla sınandı. İlk yanlış hedefli menü gözlemi ve hero-gate test hatası korunur. [Forge033 kaydı](docs/FORGE033.md) kaynak/yerel/paket/yayın kapsamlarını ayırır.

Bu dal taban 0.20.0'dan hazırlanmış bir adaydır; **0.21.0 için main, tam uzak CI, yayın veya yeni APK kabulü yoktur.** Son doğrulanmış yayın 0.20.0'dır. Önceki geliştirme ve yayın notları aşağıda tarihsel olarak korunur.

---

## Önceki geliştirme kayıtları

# 0.20.0 doğrulanmış yayın: 17 Kasım 2026

[Pages](https://kaansavukduran.github.io/yksmania/) ve [dört Windows/Linux indirmesi](https://github.com/kaansavukduran/yksmania/releases/tag/v0.20.0-alpha.1) yayımlandı. Kaynak [387fc3ea](https://github.com/kaansavukduran/yksmania/commit/387fc3ea7f43e39d64e0c1e5f062372969a0ebeb), [CI](https://github.com/kaansavukduran/yksmania/actions/runs/44070229171), [Pages](https://github.com/kaansavukduran/yksmania/actions/runs/44074567259) ve release etiketi eşleşir. 1.841 birim ve dört shard’ın toplam 1.265 tarayıcı testi PASS; fail/skip/flaky/retry 0. Paketli Windows/Linux, prefix ve gerçek web yayını 107’şer çevrimdışı model akışını geçti. Yayındaki 291 dosya normal TLS ile eşleşti. Gerçek indirilen AppImage bu VM’de kendi binary’siyle 107 akışı geçti.

Mevcut 0.20: sekiz yeni ünite, 88 bölüm, 46 çözümlü örnek, 44 hatırlama, 134 yeni soru; toplam 528 ders/soru seti, 494 rehber/özet, 493 çalışma başlığı, 6.077 soru = 3.437 tam + 2.640 kısmi yardım. Güncel 8.936 PDF’de **2 tam / 7 kısmi / 8.927 belirsiz**; bütün arşiv bitmedi. [Kaynak kaydı](docs/PDF_SOURCE_PROGRESS032.md) aynı kanonik defterden türetilir.

**Açık bulgu F032-DESKTOP-EXTERNAL-001, Orta:** gerçek yayımlanan masaüstünde YouTube/OGM/ÖSYM bağlantısı OS tarayıcısına gönderilmiyor. Offline öğretim etkilenmez; geçici yol web sürümüdür. 107 çekirdek akış bu OS dispatch davranışını kapsamıyordu. İzole 0.21 adayındaki sıkı URL politikasının 55 testi ve altı normal kaynak Electron tıklaması geçti. Bunlar kaynak/main handler kabulüdür; paketlenmiş/yayımlanmış 0.21 kabulü değildir ve 0.20 indirmelerini onarmaz. [QA bulgusu ve tekrar kullanılabilir denetim prompt’u](docs/QA.md#f032-desktop-external-001) devam noktasını verir.

[Kişisel Android test paketi](https://github.com/kaansavukduran/yksmania/actions/runs/44069495221/artifacts/14322825421) hazır: 19.179.469 byte, otomatik test imzalı ayrı `com.fragaria.yksmania.test`, 0.20.0-test/kod 30. APK’nin 291 web dosyası C4 ile aynıdır; kaynak `953084d9` ile yayın `387fc3ea` arasında yalnız iki E2E dosyası farkı bulunur. Fiziksel kurulum denenmedi; genel Release’e APK eklenmedi. [Forge032](docs/FORGE032.md) bütün kabul sınırlarını açıklar.

Saatlik bulut Forge görevi etkin. İlk tetikte aktif çalışma sahibini görüp salt okunur doğrulamayla kaldı; ikinci PDF üreticisi veya çakışan ana dal gönderimi başlatmadı. Yeni iş aynı kaynak kuyruğundan sürer; her çalışmanın gerçek sonucu ayrı kaydedilir.

## Sıradaki 0.21 adayı

Faktöriyel 15 sayfa/81 kaynak maddesi için izole `forge/source-transfer-033` adayı var: 20 bölüm, 16 çözümlü örnek, 12 hatırlama, 43 soru, 8 bölümlük özet ve altı model. Adayda 529 set/495 rehber/495 özet/494 başlık/6.120 soru vardır; bu sayılar **yayımlanan 0.20’ye veya kanonik PDF bitiş sayısına eklenmez**. C3 aşamasının dört UI vakası, 43/43 bağımsız doğru, kaynakla karşılaştırılmış 2021 TYT örneği ve 1.852 birim testi geçti. Son izole adayda 209 dosyada 1.907 birim testi ve 367 modül/TypeScript kontrolü geçti. Dış bağlantı onarımının 55 politika testi ile altı normal kaynak Electron tıklaması; süreç yeniden açılışı, not/Matrix ve bütün kayıtların korunmasını geçti. Son paket/yayın kapıları açık kalır; gerçek dış tarayıcı/video oynatımı bu recorder kabulü değildir. Onarım bu belgede 0.20’ye uygulanmış gibi gösterilmez. Önceki 6.077 sorunun ve bütün kayıtların korunumu ayrıca denetlenir.

---

## Yayından önceki 032 aday kaydı ve önceki sürümler

# 0.20.0 geliştirme adayı: Forge032

Sekiz yeni interaktif ünite, 46 çözümlü örnek ve 134 tam yardımlı soru eklendi. Toplam 494 ayrıntılı rehber, 494 kopya kağıdı, 493 çalışma başlığı ve 6.077 özgün soru vardır; 3.437 tam / 2.640 kısmi yardım ayrı izlenir. [Güncel Forge032 kaydı](docs/FORGE032.md), [QA](docs/QA.md) ve [PDF ilerlemesi](docs/PDF_SOURCE_PROGRESS032.md) kaynak ile teknik kabulü ayırır.

Güncel 8.936 PDF için 2 tam, 7 kısmi ve 8.927 belirsiz kapsam kararı doğrulandı. Belirsiz, hiç işlenmemiş demek değildir. Eski kaynak sürümleri ve kayıtlar korunur. C3 hedef akışlar, gerçek yerel 0.19 → 0.20 web güncellemesi, yerel Electron ve Pages alt dizininde 107’şer çevrimdışı model akışı geçti. Son C4 tam birim turu 205 dosyada 1.841/1.841 PASS, TypeScript ve normal/prefix C4 derlemeleri PASS. Önceki tek timeout ve değiştirilmeden izole 4/4 geçen dosya tarihsel olarak korunur. Son denetimde tek çokgen çözüm adımındaki açı–kenar sırası düzeltildi; C3 kabulleri önceki kapsamdır, Son C4 hedef UI turu 8/8 geçti; tam uzak CI, son paket ve yayın kapıları ayrıca aranır.

Son doğrulanmış yayın 0.19.0’dır. Kullanıcının telefonunda denemesi için ayrı Android test APK’sı hazırlanıyor; henüz üretilmiş veya fiziksel cihazda kabul edilmiş sayılmaz. Aşağıdaki 0.19 ve önceki sürüm kayıtları tarihsel olarak korunur.

---

## Önceki doğrulanmış sürümler

# 0.19.0 doğrulanmış yayın — 17 Kasım 2026

Altı geometri temeli gerçek şekil modelleri, konuya bağlı videolar ve Matrix temasıyla yayımlandı. Önceki 479 çalışma kimliği/sırası ve kayıtlar korunur; yeni altı konu bağımsız izlenir. Kaynak kapsamı ile teknik yayın kabulü [QA](docs/QA.md) ve [PDF kaydında](docs/PDF_SOURCE_PROGRESS.md) ayrı açıklanır.

| Alan | Bu turun sonucu |
| --- | --- |
| 1. Kod | Altı geometri ders/rehber/özet/soru kaydı ve hesaplara bağlı SVG modelleri. Video kataloğu gerektiğinde yüklenir; öğrenci PDF/kaynak yüklemez. |
| 2. Konular | 6 yeni TYT geometri ünitesi: 48 bölüm, 20 çözümlü örnek, 26 hatırlama. Toplam 486 rehber/485 plan başlığı. 341 katalog başlığına bölünerek MEB tamamlanma yüzdesi üretilmez. |
| 3. Kopya kağıtları | 6 yeni kısa özet: 30 formül/koşul bölümü, 12 örnek, 18 hatırlama; eski 480 korunur, toplam 486. |
| 4. Sorular | 60 yeni özgün beş seçenekli, gerekçeli soru; kör bağımsız çözüm 60/60 anahtarla eşleşti. Toplam 5.943 soru: 3.303 tam, 2.640 kısmi yardım. Eski sorular ve anahtarları aynı kalır. |
| 5. Denemeler | TYT 120/165 dakika, AYT Sayısal 80/180 dakika ve 15 branş pratiği korunur. Başlanmış kâğıtlar yeniden oluşturulmaz. |
| 6. İnteraktif modeller | Açı ilişkileri, sürüklenebilir köşe/açı toplamı, üçgen sınırı, Pisagor/Öklid, benzerlik alanı ve dört merkez. Şekil ve sayılar aynı modelden gelir. |
| 7. Pedagoji | Bilgi → yöntem → tek tek adım → gerekçeli çözüm. Gerçek öğrenme yolunda 9/10 sonuç ve ilk gün 1 sayılan 3/7/21 tekrarları sınandı. Keşif/video puan oluşturmaz. |
| 8. Tasarım | Matrix mevcut temanın yanındadır. Yeni profillerin kişisel hedefi 28/02/2027; kayıtlı farklı tarihler korunur. Dar tarih/tema düzeni, kontrast ve bilimsel açı rengi onarıldı. |
| 9. Testler | [Tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/43972235774): 1.786 birim ve 1.257 tarayıcı PASS. Gerçek paketli Windows/Linux 99’ar model akışı; Pages prefix/yayın 99’ar akış ve gerçek Pages öğrenme yolu PASS. Vercel HTTP402 nedeniyle engelli. Yerel gerçek web sürüm yükseltmesi veriyi korudu. İlk harness sorunları ve sınırlar QA’da. |
| 10. GitHub | Yayın kaynağı [1dd13c2f](https://github.com/kaansavukduran/yksmania/commit/1dd13c2f8e0b0c4f2b110075bb0f166d902d74c9), dal forge/visual-learning-031; main üzerinde doğrulandı. Son teslim belgesi uygulama girdilerini değiştirmez. |
| 11. Yayın | [Pages](https://kaansavukduran.github.io/yksmania/) 0.19.0; Vercel dağıtımı ve genel adresi HTTP402 ile engelli. [Dört Windows/Linux indirmesi](https://github.com/kaansavukduran/yksmania/releases/tag/v0.19.0-alpha.1) başarılı CI’nin aynı çıktılarıdır; beş manifest kaydı varlık hash’leriyle eşleşti. Android imzası ertelendi; yeni APK yok. |
| 12. Sonraki iş | Çokgenler/özel dörtgenler, sentetik çember/daire, katı cisimler; 2.640 kısmi yardım, diğer kaynak alt becerileri ve fiziksel kurulum/yükseltme kabulleri. Bütün PDF/MEB/ÖSYM arşivi bitmedi. |

Üç kaynağın seçili 31 metin/22 görsel sayfası işlendi. 34 PDF’nin açık uygulama kullanımı kanıtlanabilir; bu bitmiş PDF sayısı değildir. Kanonik özel defterde yalnız üç satır eklemeli güncellendi; bütün PDF kapanış statüleri korunur. 135 atıf, altı ders/60 farklı soruya bağlıdır.

15 derste 485 anlatıma eşleşen videolar 489 kaynak alt konu grubu ve 2.033 farklı URL içerir. Güncel oynatma ve bütün video içeriği doğrulanmadı. Kişisel görev/takvim, özel belge adresi ve ham kitap depoya eklenmedi. [Konu CSV’si](docs/CONTENT_INVENTORY.csv) gerçek kayıt koleksiyonundan üretilir.

[Pages hattı](https://github.com/kaansavukduran/yksmania/actions/runs/43980946367) ve [release](https://github.com/kaansavukduran/yksmania/actions/runs/43981108027) kaynak 1dd13c2f üzerindedir. Normal TLS ile Pages’in 285 dosyası sabit prefix derlemesiyle eşleşti. Vercel yeni dağıtımı `resource_creation_blocked`, genel adresi `DEPLOYMENT_DISABLED` verdi; ikisi de HTTP402, hesap kullanım sınırı kaynaklıdır. Yayımlanan 145.757.638 byte AppImage ayrıca indirilip SHA-256 ile doğrulandı ve bu VM’de extract-and-run yoluyla özgün 99 akışı geçti; renderer hatası 0. Fiziksel cihaz, temiz OS kurulumu, Windows portable taşıma ve native iki sürüm yükseltmesi bu kabul değildir.

---

## Önceki kaynak ve kabul kayıtları

# 0.18.2 doğrulanmış yayın — 16 Kasım 2026

30 konudaki 300 mevcut sorunun öğretici çözümü genişletildi. 510 ön bilgi paragrafı, 300 yöntem, 900 çözüm adımı, 1.500 seçenek gerekçesi, 300 sık hata ve 300 sonuç denetimi eklendi. Yeni soru veya yeni model eklenmedi. Matematikte ölçek; dalgada harmonik koşul; bitkilerde yaşam döngüsü; virüslerde kapsid stoku açıklaştırıldı.

| Alan | Bu turun gerçek sonucu |
| --- | --- |
| 1. Kod | Altı 030 yardım kataloğu, [çözümleyici](src/learning/questionHelp.ts), [soru görünümleri](src/domain/questionPresentation.ts) ve [rehber görünümleri](src/learning/guidePresentation028.ts) geliştirildi. Eski kimlikler, anahtarlar, seçenekler ve ham içerik korunur. |
| 2. Konular | 480 yerleşik rehber; 479 sıralı çalışma başlığının tamamında anlatım ve soru bağlantısı var. Bu, 341 katalog başlığının veya bütün MEB alt becerilerinin tamamlandığı anlamına gelmez. [Geometri açıkları](docs/GEOMETRY_SCOPE.md) ayrıca denetlendi. |
| 3. Kopya kağıtları | 480 yerleşik kağıt korunur; bu tur yeni kağıt eklenmedi. Öğrenci PDF veya kaynak yüklemez. |
| 4. Sorular | Yeni soru: 0. Mevcut 300 kartın bütün yeni çözüm metinleri bağımsız kaynak incelemesinden geçti. Toplam 5.883 özgün soru: 3.243 ayrıntılı, 2.640 kısmi yardım. Bütün eski anahtarların bu tur yeniden bilimsel olarak çözüldüğü iddia edilmez. |
| 5. Denemeler | TYT 120 soru/165 dakika, AYT Sayısal 80 soru/180 dakika ve 15 branş pratiği korunur. Öğrenme yardımı mevcut kâğıdın kendi içeriğine bağlıdır; eski yanıt, işaret ve süre değişmez. Bütün resmî ÖSYM arşivi tamamlanmadı. |
| 6. İnteraktif modeller | Yeni model: 0. Mevcut 93 aile/akışın çevrimdışı ve yeniden açılış kabulleri tamamlandı; mevcut görsel modeller korunur. |
| 7. Pedagoji | Gerekli bilgi → yöntem → tek tek adım → gerekçeli çözüm ayrı açılır. Her seçenek özgül açıklanır; hata ve sonuç kontrolü ayrıca sunulur. Yardım açmak, süre veya keşif bağımsız doğru/ustalık/XP sayılmaz. |
| 8. Tasarım | 320 px, arayüz yüzde 200/yazı yüzde 150, gerçek Lexend, dokunma ve azaltılmış hareket kontrolleri geçti. Matematik formülündeki eksik ölçek çarpanı düzeltildi; favicon var olan simgeye bağlandı. Yeni tema veya karakter eklenmedi. |
| 9. Testler | [Tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/43901085247): 1.743 birim ve 1.242 tarayıcı PASS; gerçek paketli Windows/Linux PASS. Vercel’de aynı runtime üzerinde 17 hedef akış; Pages prefix ve gerçek yayın üzerinde 93’er akış; yayımlanan AppImage üzerinde özgün 93 akış geçti. İlk hatalar ve kabul sınırları [QA](docs/QA.md) içinde korunur. |
| 10. GitHub | Yayın kaynağı [19590e2](https://github.com/kaansavukduran/yksmania/commit/19590e28b23e091a00610526f7cd8201d278765a), dal forge/guidance-030; main üzerinde doğrulandı. Son teslim kaydı yalnız belge değişikliğidir. |
| 11. Yayın | [Vercel](https://yksmania.vercel.app) ve [Pages](https://kaansavukduran.github.io/yksmania/) 0.18.2; iki kökenin 25’er çalışma dosyası normal TLS ile sabit derlemeyle eşleşti. [Dört masaüstü indirmesi](https://github.com/kaansavukduran/yksmania/releases/tag/v0.18.2-alpha.1), başarılı CI çıktılarından yeniden derlenmeden yayımlandı. |
| 12. Sonraki iş | Önce [temel geometri anlatımı ve alt beceri açıkları](docs/GEOMETRY_SCOPE.md); ardından kalan 2.640 kısmi yardım, diğer kaynak–alt beceri eşlemesi, doğrulanmış video/resmî arşiv ve fiziksel kurulum/yükseltme kabulleri. Sonraki 300 kart yalnız envanterdir. |

[Konu bazlı CSV](docs/CONTENT_INVENTORY.csv) 480 rehberin bölüm, örnek, hatırlama ve bağlı soru/yardım sayılarını verir; [açıklaması](docs/CONTENT_INVENTORY.txt) sınırlarını belirtir. Sayı, öğrenci başarısı veya öğretim kalitesi ölçüsü değildir.

[Pages hattı](https://github.com/kaansavukduran/yksmania/actions/runs/43911524726) ve [yayın işi](https://github.com/kaansavukduran/yksmania/actions/runs/43911558114) başarılıdır. Altı yayın varlığı vardır; manifest beş dosyayı bağlar ve beş GitHub varlık özeti eşleşir. Gerçek AppImage ayrıca indirilip hashlenerek bu VM’de extract-and-run ile çalıştırıldı; paketli sürüm, arayüz ve çevrimdışı yeniden açılış doğrulandı. Bu, temiz OS kurulumu, Windows portable taşıma veya native sürümler arası yükseltme deneyi değildir. Android imzası kullanıcı isteğiyle ertelendi; yeni APK yayımlanmadı.

---

## Önceki kaynak ve kabul kayıtları

# 0.18.2 kaynak adayı — 300 eski soruda öğretici çözüm

30 konudaki 300 eski karta 510 ön bilgi paragrafı, 300 yöntem, 900 ilerleyen adım, 1.500 şık gerekçesi, 300 sık hata ve 300 sonuç denetimi eklendi. Dağılım: matematik 50, fizik 40, kimya 50, biyoloji 100, Türkçe 10, tarih 50. Gerçek çözümleyicide 3.243 ayrıntılı ve 2.640 kısmi yardım vardır. Ham 5.883 soru, 514 öğretim kaydı, 480 ayrıntılı rehber/480 özet ve 479 sıralı başlık korunur.

Altı paketin bütün yeni metinleri, anahtarı görünen bağımsız kaynak incelemesinden geçti. İki dalga sorusunda harmonik model, üç biyoloji sorusunda yaşam döngüsü/kapsid stoku, iki kimya sorusunda basınç ve iyonik adlandırma yöntemi tam bilinen soru kimliğinde açıklaştırılır. Dalga rehberinde dört, virüs örneğinde iki ve bitki örneklerinde iki görünür alan bağlı koşulları taşır. Ham soru/rehber alanları, anahtarlar ve sıralar yeniden yazılmaz.

Eski 2.943 ayrıntılı yardımın tam panel içeriği, 12 adet kendi `passage: undefined` alanı dahil tüm ham sorular ve bütün rehberler ayrı 0.18.1 kaynağıyla karşılaştırıldı. TypeScript, 1.743 birim testi ve normal/prefix üretim derlemesi geçti. İlk tam birim turundaki tek zaman aşımı QA'da korunur; ikinci tam turda 1.742/1.742 geçti. İlk 17 UI vakası ve son düzeltilmiş derlemede iki hedef vaka geçti; son Electron ve prefix koşularında 93’er model ailesi çevrimdışı yeniden açıldı. Tam CI/paket/yayın kapıları ayrıca aranır. Mevcut doğrulanmış yayın 0.18.1'dir; Android imzası ertelendi.

---

## Önceki kaynak ve kabul kayıtları

# 0.18.1 doğrulanmış yayın — 16 Kasım 2026

Kaynak `1da8b22c63f8bbd611ef919d9e50f7129a9f746d`. [Tam CI](https://github.com/kaansavukduran/yksmania/actions/runs/43877471841) 1.663/1.663 birim ve ilk tam koşuda 1.225/1.225 tarayıcı testiyle geçti. Gerçek paketli Windows/Linux çevrimdışı kullanım, yeniden yükleme ve aynı profilde süreç yeniden açılışı kontrolleri geçti; renderer hatası 0. Android imzası ertelendi ve Android işi açık kapsam gereği atlandı.

[Vercel](https://yksmania.vercel.app) ve [GitHub Pages](https://kaansavukduran.github.io/yksmania/) 0.18.1 sunar. [Pages hattı](https://github.com/kaansavukduran/yksmania/actions/runs/43885930433) prefix derlemesini ve yayımlanmış kökeni ayrı ayrı denetledi. Normal TLS ile her iki kökenin 25 çalışma dosyası yerel sabit derlemeyle aynıdır. Vercel’de 38 hedef HTTPS akışı ayrıca geçti; bu 1.225 vakanın tamamının üretimde tekrar koşulduğu iddiası değildir. İlk yerel HTTPS denemesi Chromium’un ortam proxy sertifikasını tanımadığı için uygulama açılmadan durdu; gerçek 38 akış yalnız sağlanan ortam CA anahtarı tanıtılarak çalıştırıldı. OS TLS dosya karşılaştırmaları doğrulamayı atlamaz.

[Dört Windows/Linux indirmesi](https://github.com/kaansavukduran/yksmania/releases/tag/v0.18.1-alpha.1) başarılı CI işinin aynı dosyalarından, yeniden derlenmeden yayımlandı. `verified-run.json` kaynak SHA’sını; `SHA256SUMS.txt` beş dosyayı bağlar. GitHub’ın hesapladığı beş varlık özeti manifest ile aynıdır; altıncı varlık manifestin kendisidir. Yeni APK yayımlanmadı. Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arasında veri koruyan kurulum bu kabulün kapsamı değildir.

---

## Önceki kaynak ve kabul kayıtları

# 0.18.1 kaynak adayı — kademeli çözümler ve yazılı hatırlama

20 konudaki 200 eski soruya gerekli bilgi, ayrı yöntem, 600 ilerleyen çözüm adımı ve 1000 şık gerekçesi eklendi. Altı paketin tüm yardım metinleri bağımsız, anahtarı görünen kaynak incelemesinden geçti. Güncel gerçek çözümleyici 2.943 ayrıntılı ve 2.940 kısmi yardım verir; soru sayısı 5.883 olarak korunur. 480 ayrıntılı anlatım, 480 yerleşik özet ve 479 başlığın çalışma sırası değişmedi.

Üç bilinen soruda hacim/miktar koşulu, ilgi–iyelik eki bağlamı ve 1700/1711 tarih karşılaştırması yalnız tanınan tam soru kimliğinde açıklığa kavuşturuldu. Bağlı zar örneğinin altı metin alanı, tam özgün örnek eşleşmesiyle birlikte düzeltilir. Ham sorular, rehberler, seçenek sıraları, anahtarlar ve eski kayıtlar yeniden yazılmaz. Önceki 2.743 yardımın metni ve yardım paneli sırası ayrı 0.18 kaynağıyla aynıdır.

Yeni rehberlerin gizlediği yazılı hatırlama tekrar erişilebilir: 31 eski paketin 62 sorusu, 96 püf noktası ve önceki yazılı yanıtları, mevcut 191 rehber hatırlamasına ek olarak son çalışma aşamasında gösterilir. İlk aşamada görünmez; açmak, yazmak veya gerekçeyi okumak bağımsız puan kazandırmaz. Telefonda sınırda kalan bir sözcük anlamı korunarak iki kısa sözcükle gösterilir.

1.663 birim testi, TypeScript ve üretim derlemesi geçti. Yeni 11 gerçek tarayıcı akışı, aynı eski hatırlama sorularını kullanan dokuz akış, bir temel soru seti ve iki telefon/normal refakat kontrolü ilk koşularında geçti. Normal/prefix derlemelerde 271 gerekli çevrimdışı varlık vardır; tek dosya 5 MiB altındadır. Gerçek yerel Electron 93 ailede çevrimdışı kullanım, reload ve aynı profilde süreç yeniden açılışını; /yksmania/ prefix 93 ailede çevrimdışı kullanım/reload akışını geçti. Renderer hatası sıfırdı. Son tam CI ve yayın kabulü ayrıca tamamlanacaktır.

Önceki 0.18 tam CI turu 1.198 PASS/16 FAIL verdi. Bir eski metin beklentisi, gizlenmiş yazılı hatırlama ve telefon sözcük bölünmesi onarıldı. Aralıklı boş açılışın kesin nedeni henüz kanıtlanmadı; başarısız kayıt korunur ve pasif tanı eklenir. Bu kayıt bütün 1.225 tarayıcı kontrolünün geçtiği anlamına gelmez. 0.18.1 paket/yayın kapısı henüz kapanmadı; Android imzası ertelendi ve yeni APK bu kapsama alınmadı.

Sıradaki 300 sorunun envanteri ayrıdır; henüz uygulamanın hazır çözüm sayısına eklenmez. Bütün Drive/MEB alt kazanımlarının ve son 20 yıllık resmî ÖSYM arşivinin tamamlandığı iddia edilmez.

---

## Önceki kaynak ve kabul kayıtları

# Güncel 0.18 kaynak adayı

Doğrulanmış çalışma sırasındaki 479 başlığın tamamı anlatım ve bağımsız soruyla eşleşir. Kaynakta 480 ayrıntılı rehber, 480 yerleşik kopya kağıdı ve 5.883 özgün soru vardır. 0.17 üzerine 130 yeni anlatım eklenmiş; kısa kalan 28 eski anlatım 553 bölüm, 168 çözümlü örnek ve 178 hatırlama etkinliğiyle derinleştirilmiştir. İleri sorular 28 ayrı setten açılır.

440 eski karta bilgi, yöntem, üç ayrı çözüm adımı, her seçenek için gerekçe, sık hata ve sonuç denetimi eklendi. Ayrıntılı yardım 2.743/5.883 karttadır; 3.140 kartın bütün aşamaları hazırlanacaktır. Son 235 kartın 95’i üç, 140’ı beş seçeneklidir. Eski seçenek sayısı veya cevap anlamı değiştirilmez. Bu kartlarda 705 çözüm adımı ve 985 şık gerekçesi vardır. Altı paketin bütün yardım yaprakları ikinci okuyucu tarafından kaynaklarla ve gerçek bileşenlerle denetlendi. İnceleme anahtarı görünen bir incelemedir; körlük iddiası yoktur.

Dokuz bilinen soruda eksik koşul veya yanıltıcı terim, tam eski soru kimliği doğrulandıktan sonra yalnız görünümde düzeltilir. Üç rehberin dokuz metin alanında elektron bulunması ile tam doluluk ayrılır; He, iyon ve Pd sınırları korunur. Ham 5.883 soru, 514 öğretim/soru-seti kaydı ve 480 rehber hash ile aynıdır. Ders/soru kimlikleri, seçenek sıraları, anahtarlar ve öğrenci kayıtları yeniden yazılmaz. İlk çalışma tarihleri ve 3/7/21 tekrarları korunur. Eski tam çözüm yeni sıralamada tam açılır; yeni yöntem düzeyi kendiliğinden tam çözüme dönüşmez.

1.581 birim testi ve tüm TypeScript/üretim derlemesi geçti. Normal derleme 271 gerekli çevrimdışı varlık ve 25.469.221 byte içerir; tek dosya 5 MiB altındadır. Önceki 122 UI akışında 120 PASS/iki telefon FAIL, son dört normal/telefon kontrolü 4/4 PASS oldu. Bu bir birleşim kabulüdür; tek son 122 koşusu denmez. Son kaynakta yerel Electron 93 aile çevrimdışı kullanım, reload ve aynı profilde süreç yeniden açılışını; /yksmania/ prefix 93 aile çevrimdışı kullanım/reload akışını geçti. Renderer hatası 0. Yeni 10 UI vakasında ilk 9 PASS/tek sentetik sınav fixture FAIL, kanıtlı alan-sırası düzeltmesinden sonra sınav ve refakat rehberi 2/2 PASS oldu. Sıfır otomatik yazım beklentisi korunur; ürün değiştirilmez. Bu son 10 kabulü koşuların birleşimidir. Tam 1.214 tarayıcı, gerçek paketli Windows/Linux ve üretim yayını kapıları henüz tamamlanmadı.

Gerçek eski 0.17 paketiyle aynı kökende 0.18 web güncellemesi geçti. Eski paketin bütün 197 dosyası ve TLS yayınındaki üç hash aynı kaldı. Öğrenci verisi eski UI ile üretildi: 5/5 paragraf, özgün tekrar tarihleri, yanlış/yardımlı protein taslağı, notlar, eski görsel ve 55 soru/7.425 saniyelik AYT kâğıdı. Yalnız zararsız sentetik PDF/belge kaydı fixture olarak eklendi. Gerçek Ayarlar güncellemesi bütün ham IDB ve belge baytlarını korudu. Eski tam2→yeni tam6 ve rehber11→19 yalnız gösterimde eşlendi. Sekiz yeni model ilk kez çevrimdışı kullanıldı ve süreç yeniden açılınca aynen kaldı. Açık Sonraki bölüm eylemi yalnız beklenen konumu yazdı; XP 25→25. Bu web profili deneyidir; native veya fiziksel cihaz yükseltmesi iddia edilmez.

TYT 120 soru/165 dakika, AYT Sayısal 80 soru/180 dakika ve 15 branş pratiği vardır. Öğrenci PDF yüklemez veya kaynak eşleştirmez. Başlık eşleşmesi bütün Drive/MEB alt kazanımlarının veya son 20 yılın bütün resmî ÖSYM arşivinin tamamlandığı anlamına gelmez. Canlı sürüm henüz 0.17’dir: [Vercel](https://yksmania.vercel.app), [Pages](https://kaansavukduran.github.io/yksmania/) ve [Windows/Linux](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1). Android imzası ertelendi; yeni APK yoktur. Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arası kurulum ayrıca sınanacaktır.

---

## Önceki kaynak ve kabul kayıtları

# 0.18 kaynak adayı — 479 sıralı başlığın tamamı

Doğrulanmış çalışma sırasındaki 479 başlığın tamamı uygulama içi anlatım ve bağımsız soruyla eşleşir. Güncel toplam 480 anlatım, 452 ayrıntılı rehber, 480 yerleşik kopya kağıdı ve 5322 özgün sorudur. Son 11 konuda 249 bölüm/498 paragraf, 70 çözümlü örnek/210 adım ve 64 hatırlama etkinliği vardır. Yeni 234 beş seçenekli kartın tümünde kademeli yardım bulunur: 654 gerçek adım ve seçeneklerine bağlı 1170 gerekçe. Ayrıntılı yardım toplam 1742/5322; 3580 eski kartta bütün yardım kademeleri henüz tamamlanacaktır. 28 eski kısa anlatım da derinleştirilmektedir.

Önceki 5088 sorunun tüm alanları ve 475 öğretim kaydı hash ile korunur; kaydedilmiş 120/80 deneme kâğıtları, cevaplar, işaretler ve son zamanlar değişmez. TYT 120 soru/165 dakika, AYT Sayısal 80 soru/180 dakika doğru ders kotaları ve beş seçenekle sunulur. Başlık eşleşmesi her kaynağın bütün alt kazanımları, bütün eski soru yardımları ve 20 yıllık resmî ÖSYM arşivinin tamamlandığı anlamına gelmez.

1307/1307 birim, TypeScript ve normal/prefix üretim derlemesi geçti; son mobil metin onarımları ayrıca dört ailenin toplam 66 hedef birim kontrolünden geçti. PWA 254 gerekli varlığı kapsar, tek dosya 5 MiB altındadır. Gerçek yerel Electron 85 ailede çevrimdışı kullanım/reload/aynı profilde süreç yeniden açılışını, /yksmania/ prefix 85 ailede çevrimdışı kullanım/reload akışını geçti; renderer hatası 0. Yeni 34 UI vakası son kabul birleşiminde kapsanır: önce 23 PASS/11 telefon FAIL, düzeltmede 32 PASS/2 FAIL; son iki telefon ve iki normal refakat vakası 4/4 PASS. Tek son 34 koşusu denmez. Tüm 1082 tarayıcı ve gerçek paketli Windows/Linux kapısı sonraki birleşik kaynakta ayrıca aranır; bu yerel kabul yayın kabulü değildir.

Telefon onarımları seçilen yazı boyutunu korur. İç boşluklar ve listeler dar ekrana uyar; uzun model ifadeleri anlamı korunarak sadeleşir. Bilimsel veri, rehberler, bankalar, sayısal model, SVG anlamı ve kullanıcı gerekçeleri kopya değişikliklerinden etkilenmez. Kanonik özel adlarda kontrollü yumuşak tire ve tam erişilebilir ad korunur. Bozuk türde model kaydının eski cevabı tekrar açmaması için 11 gerçek IDB bozma/yeniden açma/ilk geçerli giriş kontrolü geçti.

Öğrenci PDF veya kaynak yüklemez; öğretim, özetler, sorular ve denemeler uygulamadadır. Özel kaynaklar Git dışında tutulur. 9175 özel kimlik ve 9468 bağlantı ile taranan 378 metin yolunda eşleşme yoktur. Canlı sürüm hâlâ 0.17'dir: [Vercel](https://yksmania.vercel.app), [Pages](https://kaansavukduran.github.io/yksmania/) ve [Windows/Linux indirmeleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1). Bu aday henüz yayımlanmadı. Android imzası ertelendi; yeni APK yayımlanmadı. Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arası yükseltme bu kabulün kapsamında değildir.

---

## Önceki kaynak ve kabul kayıtları

# 0.18 kaynak adayı — ilk 468/479 sıralı başlık

Güncel kaynak 469 anlatım, 441 ayrıntılı rehber, 469 yerleşik kopya kağıdı ve 5088 özgün soru içerir. Son paket, 29 yeni anlatım ve mevcut türev rehberine kayıpsız genişletme ekler: 577 bölüm, 1154 paragraf, 177 çözümlü örnek/537 adım ve 171 hatırlama etkinliği. Yeni 564 kartın tamamı beş seçeneklidir; 1661 çözüm adımı ve seçeneklere bağlı 2820 gerekçe sunar. Ayrıntılı yardım toplam 1508/5088 karttadır; 3580 eski kartta bütün kademeler hâlâ tamamlanacaktır.

Önceki 4524 sorunun bütün alanları, 445 öğretim kaydı ve kayıtlı 120/80 deneme kâğıtları korunur. Eski türev rehberinin 11 bölümü, 8 örneği ve 4 hatırlama sorusu aynen durur; yeni rehber 19/12/8 kapsamındadır. Eski türev etkinliği yeni modelin yanında çalışır. İlk açılışta eski örnek konumu korunur; ancak açıkça Sonraki bölüm seçilince yeni bölüm sayısına kayıt yapılır. Bu yerel IDB regresyonu, gerçek sürümler arası yükseltme denemesi diye sunulmaz.

1238/1238 birim, 316 modül adı/TypeScript ve normal/prefix üretim derlemesi geçti. PWA 245 gerekli varlığı kapsar; tek dosya 5 MiB sınırının altındadır. Gerçek yerel Electron 81 aile çevrimdışı/reload/aynı profilde süreç yeniden açılışını, /yksmania/ prefix kabulü 81 aile çevrimdışı/reload akışını geçti; renderer hatası 0. Yeni 124 UI vakasının kabulü son koşuların birleşimidir: 121 vakada 104 PASS/17 FAIL, ilgili son 24/27 koşuda eski 17 kusur ve ek normal regresyonlar PASS, kalan üç yeni yer imi/yer adı vakası son koşuda 3/3 PASS. Tek son 124 koşusu iddiası yoktur. Bir önceki 023 CI'da 921/924 tarayıcı geçti; üç test eski boş içerik ve aynı adlı ders seçimi varsayımına takıldı. Bunlar burada düzeltilip hedefli yeniden geçirildi. Bütün 1048 tarayıcı ve gerçek paketli Windows/Linux kapısı son birleşik kaynakta ayrıca aranır.

Gerçek kayıt kusuru da onarıldı: bozuk türde bir model alanı varsayılana dönünce eski karşılaştırma açıklaması yeni sonuca aitmiş gibi gösterilebiliyordu. 023'ün 30 ve 024'ün 30 modeli için gerçek IDB bozma/yeniden açma/ilk yeni eylem regresyonları vardır. Daha eski bütün modellerin bozuk kayıt sınıfları denetlendi denmez. Büyük yazıda model kontrolleri dar ekrana uyar; seçilen yazı boyutu korunur. Ders girişi sabit kimlikle seçilir; Alkanlar ile Sikloalkanlar karışmaz. Sulucakarahöyük adı görünür isteğe bağlı hece bölümü ve tam erişilebilir adıyla korunur; ölçümde Chromium'un önceki yumuşak tireyi sonraki sözcük aralığına katması ayrı doğrulandı.

TYT 120 soru/165 dakika ve AYT Sayısal 80 soru/180 dakika doğru ders kotalarıyla sunulur. Öğrenciye PDF veya kaynak yükleme işi bırakılmaz. Kaynak okumaları ve bağımsız içerik denetimi özel kayıtlarda tutulur; ham kitaplar, Drive kimlikleri ve özel bağlantılar Git'e alınmaz. 9175 özel kimlik ve 9460 bağlantıyla taranan 349 metin yolunda eşleşme yoktur; yalnız önceki yazı tipi bağımlılığı bulunur.

Canlı sürüm 0.17'dir: [Vercel](https://yksmania.vercel.app), [Pages](https://kaansavukduran.github.io/yksmania/) ve [Windows/Linux indirmeleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1). Bu 0.18 adayı henüz yayımlanmadı. Android imzası ertelendi; yeni APK yoktur. Kalan 11 sıralı başlık ve 28 eski kısa anlatım üzerinde çalışma sürer. Bütün Drive/MEB alt kazanımları, her eski sorunun ayrıntılı yardımı ve son 20 yılın resmî ÖSYM arşivi tamamlandı sayılmaz. Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arası yükseltme bu kabulün kapsamında değildir.

---

## Önceki kaynak ve kabul kayıtları

# 0.18 kaynak adayı — ilk 438/479 sıralı başlık

409–438. başlıklar için 30 yeni anlatım eklendi: 593 bölüm, 1186 paragraf, 163 farklı çözümlü örnek/489 adım ve 155 hatırlama etkinliği. Toplam 440 anlatım, 412 ayrıntılı rehber, 440 yerleşik özet ve 4524 özgün soru vardır. Yeni 484 kartın tamamı beş seçenek ve özgül kademeli yardım taşır: 1286 gerçek çözüm adımı, 2420 eşlenmiş seçenek gerekçesi. Önceki 4040 sorunun bütün alanları ve 415 öğretim kaydı hash ile korunur.

TYT 120 soru/165 dakika ve AYT Sayısal 80 soru/180 dakika doğru ders kotalarıyla sunulur. Kaydedilmiş eski kısa ve tam denemelerin soru kâğıdı, cevap, işaret ve süreleri yeniden yazılmaz. Ayrıntılı yardım toplam 944/4524 karttadır; kalan 3580 kartın bütün çözüm adımları henüz tamamlanmadı. 28 eski kısa anlatım da ayrıca derinleştirilecektir. Başlık sayısı bütün Drive/MEB/ÖSYM arşivi veya bütün alt beceriler tamamlandı demek değildir.

1111/1111 birim ve normal/prefix üretim derlemesi geçti. PWA 230 gerekli varlığı kapsar; tek dosya 5 MiB sınırı korunur. Yerel Electron ve /yksmania/ prefix kabulünde 74 aile çevrimdışı model/HTML değişimi ve kalıcı kayıt/reload kontrolünden geçti; Electron aynı profilde süreç yeniden açılışını da geçti. Bu iki artifact son iki anlam eşdeğeri model metni düzeltmesinden öncedir. Yeni 65 UI vakasının son bütün koşusu 59 PASS/6 FAIL verdi; altı sorunlu telefon vakası son düzeltmede 6/6 geçti. Böylece 65 vaka bu kabul birleşiminde kapsanır; tek son 65 koşusu denmez. Tam 924 tarayıcı ve gerçek paketli Windows/Linux kapısı bu aday üzerinde ayrıca aranır.

Gerçek kayıt kusuru düzeltildi: 600 karakter kabul eden etkinlik alanı, 128 karakterlik kalıcı kayıt sınırıyla uyuşmuyordu. Alan, görünür açıklama ve kayıt aynı 128 sınırını kullanır; 156 karakterlik girişin 128 olarak kaydı/reload kontrol edildi. Matematik/fizik/biyoloji/kimyada boş gerekçeli eski “kontrol edildi” durumu açıklamayı açamaz; dört regresyon eski kodda başarısız, düzeltmede başarılıdır. Geçerli kısa gerekçe kabul edilir; keşif ve süre XP üretmez. Telefon metinleri yazı küçültmeden düzenlendi; açık temada düğme kontrastı tema değişkenine bağlandı.

Canlı sürüm 0.17’dir: [Vercel](https://yksmania.vercel.app), [Pages](https://kaansavukduran.github.io/yksmania/) ve [Windows/Linux indirmeleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1). 0.18 henüz yayımlanmadı. Android imzası kullanıcı tarafından ertelendi; yeni APK yoktur.

Bozuk türde eski keşif alanlarının varsayılana dönmesiyle, önceki açıklamanın yeni model için açılmasına ilişkin ek geri yükleme denetimi sürer. Sonraki 024/025 ailelerinde bu sınıf onarılıyor; daha eski aileler ayrıca denetlenecek. Bu özellik dalı yayın kabulü değildir.

Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arası yükseltme bu kabulün kapsamında değildir. Kaynaklar, özel kimlikler ve imza anahtarları Git dışında tutulur; öğrenciye PDF yükleme işi bırakılmaz.

---

## Önceki checkpoint kayıtları

# 0.18.0 aday checkpoint — ilk 408 sıralı başlık

379–408. başlıklara 30 bağımsız anlatım:564 bölüm/1128 paragraf, 172 farklı çözümlü örnek/516 adım, 142 hatırlama ve 390 beş seçenekli soru. Toplam 410 anlatım, 382 ayrıntılı rehber, 410 yerleşik özet ve 4040 özgün soru. Önceki 3650 sorunun bütün alanları ve 385 öğretim kaydı hash ile aynı kalır.

Yeni 390 sorunun tamamında gerçek çözüm adımları ve beş özgül seçenek gerekçesi var. Önceki 70 kartla çözümlenen tam yardım 460/4040; diğer 3580 mevcut ipucu/açıklamasındadır. Bu paket için 110 eksik matematik/fizik rehberi tamamlandı; tüm bankanın ayrıntılı çözümü bitti denmez.

1007/1007 birim ve 61/61 son normal/telefon tarayıcı vakası PASS. PWA 215 gerekli varlığı kapsar, 5 MiB tek dosya sınırı korunur.67 aile Electron ve Pages kabulü çalıştırılıyor; tam 859 tarayıcı uzak kapısı henüz çalıştırılmadı. 349–378 ara checkpoint’i 926 birim/798 tarayıcı ve 61 aile paketli Windows/Linux ile ayrı özellik dalında geçti.

Gerçek ürün denetimi biyoloji yüzdesinde eksik şablon işaretini ve korozyon stok tükenmesinin çizime yansımamasını buldu. Yüzde gerçek değeri gösterir; kurban metal dolgusu kalan kütle payını gösterir, tabanı sabittir. Mobil sözcük/dokunma kusurları yazı küçültmeden düzeldi. İlk gerçek koşu 41 PASS/20 FAIL, ikinci 59 PASS/2 FAIL, son 61/61 PASS; yanlış eski önizlemeye giden ilk koşu ürün kabulü sayılmaz.

TYT ilk kez 120 soru/165 dk ile 40 Türkçe, 40 matematik-geometri, 5’er sosyal, 7 fizik, 7 kimya, 6 biyoloji; AYT 80/180 dk 40 matematik-geometri, 14 fizik, 13 kimya, 13 biyoloji. Bütün tam çeşitler beş seçeneklidir. Eski 115/80, 115/55 ve önceki kısa kâğıtların anlık görüntüsü değiştirilmez.

Sonraki 409–438 kaynak paketi bağımsız kaynak/model incelemesini geçti, entegrasyon sırasındadır.439–479 özel üretim ve peer denetimindedir. Bütün kaynak arşivi ve alt beceri kapsamı yalnız başlık sayısıyla tamamlanmış sayılmaz.

Canlı sürüm0.17’dir: [Vercel](https://yksmania.vercel.app), [Pages](https://kaansavukduran.github.io/yksmania/) ve [Windows/Linux indirmeleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1). Kaynak3a3a6c5ab6949d2a4b14076f4af4d8aefba656a2 üzerinde832 birim/737 tarayıcı,737 yayımlanmış kabul ve54 aile gerçek paketli masaüstü/Pages geçti. Bu0.18 adayının sayıları canlıya eklenmiş sayılmaz. Android imza ayarı ertelendi; yeni APK yoktur. Fiziksel cihaz,temiz kurulum,portable taşıma ve native sürümler arasında veri koruyan kurulum test edilmedi.

---

## Önceki aday checkpoint kayıtları

# 0.18.0 kaynak adayı — 349–378. başlıklar

Güncel kaynakta 380 anlatım,352 ayrıntılı rehber,380 yerleşik özet ve 3650 özgün soru var; ilk 378/479 başlık anlatım+soruyla eşleşir. Bu paket 30 yeni anlatım ve 310 yeni beş seçenekli soru ekler. Kaynak/ikinci okuyucu kabulü ile ürün/yayın kabulü ayrıdır. Henüz 0.18 üretim yayını yoktur.

Yeni AYT karma 80 soru/180 dakika;40 matematik-geometri,14 fizik,13 kimya,13 biyoloji. Tam dağılım ancak her kota beş seçenekli kartlarla doluyorsa sunulur; sekiz ayrı başlangıç tohumu bunu doğrular. TYT 115 soruluk kısa pratik, Din kotası eksikliğiyle açıkça kalır. Eski 115/55 soruluk deneme kâğıtları, cevapları, işaretleri ve süreleri aynen korunur. Branş pratikleri ve eski kısa öğretim kartları kaldırılmaz.

Yeni 310 sorunun 50’si ayrıntılı kademeli rehber taşır; önceki 20 özgün rehberle toplam 70/3650 olur. Diğer sorular mevcut ipucu/açıklamasını kullanır; hepsinde tam rehber var denmez. Bu 50 kartta bilgi/yöntem ve gerçek 150 çözüm adımı arasında normalize metin tekrarı 0; bu mekanik tarama pedagojik etki kanıtı değildir.

926/926 birim, TypeScript/modül yolu ve normal/prefix derleme geçti. İlk 61 yeni tarayıcı vakası 37 PASS/24 FAIL; gerçek uzun sözcük/dokunma sorunları ve üç test seçici/işaret/ölçek beklentisi onarıldı. İkinci 61 koşusu 59 PASS/2 eski metin beklentisi FAIL; bu iki fotosentez vakası sayısal beklentiler korunarak doğru yeni ifadeyle ayrıca PASS. Bütün 61 vaka bu kabul birleşiminde kapsanır; tek son 61 koşusu denmez.798 tam tarayıcı vakası toplanır; tam uzak koşu henüz yapılmadı.

61 ailelik yerel Electron çevrimdışı etkileşim, kayıt/reload, aynı profilde süreç yeniden açılışı ve Pages prefix ilk-offline kabulü geçti; renderer hatası 0. Sonradan 0.17’nin sekiz eski model metni ve kalıcı onay kutusu test onarımı bu dala alındı; son kaynak/paket kabulü ayrıca aranır. Bu, fiziksel cihaz veya native sürümler arasında yükseltme değildir. PWA 202 gerekli varlığı kapsar;5 MiB sınırı korunur.

Sonraki 379–408 kaynak paketinde 390 soru hazırlanmıştı; gerçek tarama 280’inde ayrıntılı rehber,110’unda eksik rehber gösterdi. Matematik 80 ve Fizik 30 rehberi bu bilinen açık için geliştiriliyor.409–438 paketinde örnek–banka kopyası, tekrar eden yardım adımı ve cevap konumu örüntüsü ayrıca onarılıyor.439 sonrası kaynak üretimi sürer. Sayı başlık tamamlanması, tüm alt beceriler veya tüm Drive/MEB/20 yıl ÖSYM arşivi demek değildir.

Android imza ayarı kullanıcı tarafından ertelendi; yeni APK hazırlanmış sayılmaz. Web ve masaüstü çalışması sürer. Özel PDF/kimlik/anahtar depoya konulmaz; öğrenci kaynak yüklemez.

---

## Önceki0.17 aday checkpoint'i

# 0.17.0 — yayımlanmış sürüm doğrulandı

16 Kasım 2026: kaynak/tag `3a3a6c5ab6949d2a4b14076f4af4d8aefba656a2`. **350 anlatım, 322 ayrıntılı rehber, 350 yerleşik özet ve 3.340 özgün soru**; ilk 348/479 sıralı başlık hazır. Önceki 0.16 üzerine 86 yeni anlatım, dört kayıpsız rehber genişletmesi ve 900 soru eklendi. Bütün kaynak arşivinin tamamlandığı anlamına gelmez.

[Main CI](https://github.com/kaansavukduran/yksmania/actions/runs/43788209311):832 birim, 737 tam tarayıcı ve gerçek paketli Windows/Linux çevrimdışı/süreç yeniden açılışı PASS; Android SKIPPED. [Vercel kabulü](https://github.com/kaansavukduran/yksmania/actions/runs/43788736262):737 PASS (736 gerçek HTTPS, bir yerel geliştirme regresyonu). [Pages](https://github.com/kaansavukduran/yksmania/actions/runs/43791530727): build/deploy/yayımlanmış 54 aile kabulü PASS. Önceki 728 PASS/9 FAIL koşusu ve onarımları aşağıda tarihsel kanıt olarak tutulur; son 737 koşuları onların yerine geçer.

[Alpha indirmeleri](https://github.com/kaansavukduran/yksmania/releases/tag/v0.17.0-alpha.1), [yayın işi](https://github.com/kaansavukduran/yksmania/actions/runs/43792983676): Windows x 64 Setup/Portable, Linux AppImage/DEB ve iki küçük kanıt dosyası, toplam altı varlık. Beş checksum ve altı GitHub asset digest eşleşir; iki küçük dosya normal TLS ile indirilip ayrıca hashlenir. Dört büyük binary yerelde yeniden indirilip hashlenmedi. Android imza ayarı ertelenmiştir; bu yayında yeni APK yoktur. Fiziksel cihaz, temiz kurulum, portable taşıma ve native sürümler arasında veri koruyan kurulum NOT TESTED.

Gerçek 0.16→0.17 web güncellemesi eski notları, oturumları, özgün tekrar tarihlerini, yanlış taslağını, 45 soruluk eski AYT kâğıdını/deadline’ını ve eski belge baytlarını korudu;17 yeni model ilk kez çevrimdışı açıldı, XP 25→25. Ayrıntılı kademeli yardım 20 sorudadır; diğer 3.320 soru mevcut ipucu/açıklamasını kullanır. Canlı katalog 16 kısa pratiktir: TYT 115/9488 sn, AYT 55/7425 sn ve 14 branş. Tam 120/80 dağılım yeni geliştirme adayındadır;0.17’de varmış gibi sunulmaz.

349–378 paketi ayrı özellik dalında 926 birim/798 tarayıcı ve 61 aile paketli Windows/Linux kabulünü geçti; canlıya eklenmedi. 379–408 paketi geliştirme alanında 1007 birim ve derlemeyi geçti; gerçek mobil/çevrimdışı kabulü sürüyor. Bu adayın TYT 120/AYT 80 dağılımı canlı 0.17 sayılarıyla karıştırılmaz. Sonraki kaynak üretimi ve eski kısa rehber/ayrıntılı yardım/resmî arşiv/video açıkları sürer.

---

## Aday aşamasının tarihsel denetim kaydı

# 0.17.0 adayı — 259–348. çalışma başlıkları

Henüz üretime yayımlanmadı; canlı sürüm 0.16.0’dır. Güncel adayda 350 anlatım, 322 ayrıntılı rehber, 350 yerleşik özet ve 3.340 özgün soru bulunur. Çalışma sırasının ilk 348/479 başlığı anlatım ve soruyla eşleşir. Önceki sürüme göre 86 yeni anlatım, dört eski rehbere kayıpsız ek ve 900 yeni soru vardır. Bu sayılar bütün kaynak arşivinin ya da bütün alt becerilerin tamamlandığı anlamına gelmez.

Paragraf, elektrik alanı, kimyasal denge ve DNA rehberlerinin eski bölümleri, örnekleri ve soruları korunur; ileri soru setleri ayrı tutulur. Eski örnek/hatırlama sekmesinde kalan okuyucunun konumu, yeni öğretim bölümleri eklendiğinde aynı etkinlikte açılır. Yeni konum yalnız açık kullanıcı eylemiyle kaydedilir.

Ortak ayrıntılı yardım 20 soruda bilgi → yöntem → tek tek adım → tam çözüm sunar: 40 adım ve 60 ayrı şık gerekçesi. Diğer 3.320 soru mevcut ipucu ve açıklamasını kullanır; bütün bankanın ayrıntılı rehberi tamamlandı denmez. Denemelerde öğrenme/simülasyon seçimi, açık yardım kapısı ve kalıcı soru bazlı yardım seviyesi vardır. Bağımsız ve yardımlı doğru ayrı gösterilir; net hesabı, cevaplar, işaretler ve süre korunur. Tam soru kimliği eşleşmeden eski denemeye yeni rehber bağlanmaz. Newton n4’ün eksik F≠0 öncülü dar bir düzeltmeyle giderildi; eski deneme anlık görüntüleri yeniden yazılmaz.

Başlıklar cihazda önbelleklenen Bricolage Grotesque kullanır; gövde ve matematik yazısı korunur. Açık Lexend tercihi başlıklarda da geçerlidir. Telefonlarda gerçek sözcük bölünmesi, formül ve slider taşması onarıldı. Deneme başlangıcında yalnız seçilen katalog hesaplanır; eski soru kâğıtlarının bütün alanları ve çeşitlendirme sonuçları karşılaştırmayla korunur.

Yerel ilk bütünleşik test 823 PASS/5 FAIL verdi; üç güncel katalog beklentisi ve iki deneme başlatma performans sorunu düzeltildikten sonra 828/828 test geçti. Sonraki gerçek güncelleme kontrolünde merkez noktası G=(1,0) yanlış bölgeyle etiketleniyordu. Toplama sırası düzeltildi; bölgeye sıfır eşiği eklenmedi. Dört yeni regresyon eski kodda başarısız, son hedefte18/18 başarılı; 808 bağımsız tam-rasyonel oracle sonucu eşleşir. Son bütünleşik832/832 test geçti. Son telefon kontrolünde kısa anlam eşdeğerleri ve nokta listesi girintisi onarıldı; System+gerçek Lexend,0 kırık sözcük,44px hedefler veaxe PASS. 737 tarayıcı vakası toplanır; henüz tam koşu başarısı iddia edilmez. Normal ve /yksmania/ derlemelerinin 187 zorunlu varlığı önbellektedir, tek dosya 5 MiB sınırı korunur.

İlk 54 ailelik masaüstü çevrimdışı/process-restart ve Pages prefix kabulü geçti. Gerçek 0.16→0.17 web güncellemesinde bütün eski durum, 5/5 oturum, özgün tekrar tarihleri, kontrol edilmiş yanlış taslak, notlar, eski 45 soruluk AYT/6075 sn taslağı ve 870 bayt sentetik eski belge/katalog korundu; XP 25→25. On yedi yeni model eski profilde ilk kez çevrimdışı açılıp yenilendi. Eski rehber örnek konumu da aynı etkinlikte kaldı. Bu test paketli Windows kurulumu veya native sürümler arasında yükseltme değildir.

Android imza kurulumu kullanıcı tarafından ertelendi. Eksik yapılandırma Android işini SKIPPED bırakır; yeni APK üretilmiş sayılmaz. Yayın işi açık Android kapsamı seçimiyle dört doğrulanmış masaüstü paketini yayımlayabilir; APK seçilirse paket metadata’sı ve sabit sertifika ayrıca zorunludur. Özel anahtar, parola ve ham Drive kaynakları Git dışında kalır.

Sonraki kaynak paketleri 349–408 için bağımsız içerik/model okumasından geçti; normal uygulama, çevrimdışı ve yayın kabulüne henüz eklenmedi. 409 sonrası öğretim çalışması ayrı dosyalarda sürer. Tam 479, bütün Drive/MEB ve 20 yıllık bütün ÖSYM tamamlanmadı; marka, eski kısa rehberler, tüm soruların ayrıntılı yardımı, doğrulanmış video ve resmî arşiv kapsamı açık işlerdir.


Son özellik dalı denetimi [43778995950](https://github.com/kaansavukduran/yksmania/actions/runs/43778995950):832 birim geçti;737 tarayıcı vakasının728’i geçti,9’u başarısız oldu. Sekizinde büyük Lexend yazıda bölünen model metni, birinde kalıcı kayıttan önce kontrol edilen onay kutusu test zamanlaması bulundu. Sayısal modeller, soru/rehber içerikleri ve kullanıcı yazısı değişmeden kısa anlam eşdeğerleri ve kaydın bitişini bekleyen kontrol onarıldı. Son yerel832/832 birim, sekiz sorunlu telefon ve iki deneme yardım akışı PASS. Tam737 ve paket işleri son commit üzerinde yeniden çalıştırılmadan yayına geçilmez; önceki başarısız koşu saklanır.

---

## Önceki yayımlanmış kayıt

# 0.16.0 — web ve alpha paket yayını doğrulandı

Çalışma sırasının 199–258. başlıkları: 60 yeni etkileşimli ünite, 678 bölüm/1.356 paragraf, 248 tam çözüm, 248 hatırlama ve 600 özgün soru. Toplam 264 anlatım/236 rehber/264 yerleşik özet/2.440 soru; ilk 258/479 hazır. Öğrenci PDF yüklemez. Eski 1.840 soru ve 205 öğretim kaydı korunur. AYT kataloğu 45/6075 s; eski 37 soruluk devam eden taslak bütün soruları ve süresiyle korunur.

Kaynak/tag `bb60dfa4c6463d511085e58fe3124f803b5651c5`. [CI](https://github.com/kaansavukduran/yksmania/actions/runs/43756497076), [canlı kabul](https://github.com/kaansavukduran/yksmania/actions/runs/43756612914), [Pages](https://github.com/kaansavukduran/yksmania/actions/runs/43758617864) ve [paket yayını](https://github.com/kaansavukduran/yksmania/actions/runs/43760024382) aynı kaynakta başarılıdır. CI 610 birim/548 tarayıcı ve dört iş PASS; aynı kaynak önce özellik dalında da dört iş ile geçti. Canlı iş akışının 548 vakası **547 yayımlanmış HTTPS + bir gerçek yerel Vite geliştirme regresyonudur**. Pages üç iş PASS; normal/prefix 37 model ailesi ve iki eski soru rotası, ilk çevrimdışı kullanım, gerçek etkileşim, kayıt ve reload ile denetlendi. Gerçek Windows/Linux paketli süreç yeniden açılışı PASS; renderer hatası 0.

Gerçek 0.15→C7 web güncellemesinde bütün eski durum/belge/katalog, 5/5 oturum, tekrar tarihleri, kontrol edilmiş yanlış taslak/notlar, 37 soruluk AYT taslağı ve 870 bayt sentetik eski PDF korunur; XP 25→25. On iki yeni model bu profilde ilk kez çevrimdışı açılıp yenilendi. Bu iki native sürüm arası kurulum testi değildir.

[0.16 alpha](https://github.com/kaansavukduran/yksmania/releases/tag/v0.16.0-alpha.1) aynı CI çıktılarından sekiz dosyadır. Tag/verified-run aynı kaynak ve main dalını doğrular; yedi checksum, sekiz GitHub digest ve indirilen iki kanıt dosyasının SHA256'sı eşleşir. Beş büyük binary yerelde ayrıca indirilip hashlenmedi. Android paket adı com.fragaria.yksmania, sürüm0.16.0/kod24/v2 imza. Vercel/Pages index, version ve sw dosyaları normal TLS ile ilgili dondurulmuş C7 çıktılarıyla aynıdır.

Android alpha APK debug imzalıdır. Doğrulama dosyalarında 0.14, 0.15 ve 0.16 sertifikalarının farklı olduğu doğrulandı; bu APK önceki debug kurulumunun üzerine güncellenemez. Eski kurulumu kaldırmadan önce uygulamadaki kişisel ilerleme yedeğini dışa aktar. Kalıcı imza ve sürümler arasında kurulum kabulü sonraki geliştirme işidir.

İlk başarısız yerel kayıtlar QA'da korunur; tam C7 yerel 548 PASS denmez. Tam C7 kabulü uzak CI ve yayımlanmış webde geçti. Fiziksel Android, temiz Windows kurulumu, portable taşıma ve native-to-native yükseltme test edilmedi. Bütün479, bütün Drive/YKS ve20 yıllık tüm ÖSYM tamamlanmadı. Sonraki içerik dalları özel hazırlıktır; yayın sayılmaz.

---

## Tarihsel doğrulanmış 0.15 kaydı

# 0.15.0 — yayın ve paket kabulü tamamlandı

Kaynak adayında çalışma sırasının 169–198. başlıkları için 30 yeni ünite; toplam 204 anlatım / 176 derin rehber / 204 özet / 1.840 soru vardır. İlk 198/479 başlık anlatım ve soruyla hazırdır. Eklenen 245 bölüm, 490 paragraf, 122 üç adımlı çözüm, 122 hatırlama ve 300 özgün beş seçenekli kart gerçek kaynak okuması ve ikinci okuyucuyla denetlendi. Eski 1.540 sorunun bütün alanları ve 175 ders kaydının soru dışındaki alanları korunur. Öğrenci kaynak/PDF yüklemez.

C3 runtime kaynağı `abd6cdded9d809b77ca89fb5918576f22c7de2a5`; son 0.14 yayın kanıtı daha sonra yalnız belgelerle merge edildi. 123 dosyalı artefakt donduruldu. Kaynak kontrolü, 478/478 birim ve derleme PASS. Gerçek Electron’da 25 model ailesi, iki eski soru rotası, HTML taslak iptal→tam kayıt aynılığı→onay ve aynı profil/süreç yeniden açılışı/offline/reload PASS; renderer 0. Pages prefix’inde aynı 25 aile ve iki soru rotası ilk çevrimdışı kullanım/kayıt/reload ile PASS.

Gerçek 0.14→0.15 service-worker güncellemesi, eski sürümden gerçek menüyle başlanmış 25 soruluk AYT denemesinin bütün sorularını, cevabını, işaretini ve bitiş süresini aynen korudu; yeni katalog ayrı 37 soru gösterdi. Güncellemenin hemen ardından bütün state/belge/katalog eşitti. Eski 5/5 oturum, 17 Kasım/21 Kasım/5 Aralık tekrarları, kontrol edilmiş yanlış soru taslağı, notlar, ayarlar ve 870 bayt sentetik eski PDF korundu; XP 25→25. Altı yeni 0.15 model bu profilde ilk kez çevrimdışı açılıp yenilendi. Bu web yükseltme kanıtıdır, iki native sürüm arası test değildir.

YKS-068 kimya büyük yazıda sözcük bölünmesi: görünür/erişilebilir kısa etiket ve iç boşluk onarımı; C1 üç gerçek FAIL→C2 aynıları+ilerleme kontrolü dört PASS. YKS-069 PWA geliştirme updater döngüsü: gerçek Vite menü/tema/ölçek testi önce FAIL→ref ile son uygulamayı tutma sonrası PASS; üretim hook’u zaten stable, üretim döngüsü iddiası yok. YKS-070 fizik telefon SVG’sinde 7,24 px etiket: eşit fiziksel eksen ölçeği korunarak uyumlu görünüm/16 px alt sınır/getBBox ve mevcut ok koordinatı regresyonları eklendi. Yeni denklem başvuru koruması, yalnız ipucunda/açıklamada bulunan öncülü görünür soru verisi saymaz.

İlk C3 tam koşu, dört CPU kotasında eşzamanlı native/SW ve özel censuslerle ölçülen yük 19 sırasında iki eski testte zaman aşımı verdi; 82 PASS, 2 FAIL, 2 kesilen, 337 çalışmayan olarak korunur. Kaynak/artefakt/asser/timeout değişmeden diğer ağır browserlar durdurulunca aynı iki test 12,5 s ve 3,5 s ile PASS oldu. Son tam koşuda aynı kaynak, assertion ve süre sınırlarıyla 423/423 tarayıcı vakası iki worker ile 18,8 dakikada geçti. Önceki C1 61/61 yeni vaka, 477 birim ve 25-aile kabulü yalnız kendi artefakt kapsamındadır.

TYT 110/9075 s ve AYT 37/4995 s karma setleriyle 12 branş pratik vardır; tam resmî 120/80 dağılım değildir. 0.15 CI/public/Pages ve Android kod 23 yayını tamamlandı; uzak kanıtlar aşağıdadır. Önceki 0.14 kaydı ayrıca korunur. Bütün 479, bütün Drive/YKS ve 20 yıllık tüm resmî sınavlar tamamlanmadı. Fiziksel Android, temiz Windows kurulumu, portable taşıma ve native-to-native yükseltme NOT TESTED.

## Doğrulanmış yayın

Kaynak/tag `3f237c12100a702e09884d65f735de6a3f11db1b`. CI [43734178222](https://github.com/kaansavukduran/yksmania/actions/runs/43734178222) dört iş PASS: 478 birim/423 tarayıcı ve gerçek Windows/Linux paketli çevrimdışı kabul; Android 0.15.0/kod 23/v2 imza. Canlı [43734346767](https://github.com/kaansavukduran/yksmania/actions/runs/43734346767) ikinci denemede 423/423 PASS; Pages [43734349217](https://github.com/kaansavukduran/yksmania/actions/runs/43734349217) üç iş PASS. Yerel, CI ve canlı sonuçlar ayrı kapsamdır.

İlk canlı koşu 422 PASS/1 FAIL idi. Gerçek trace ZIP'i bağlayıcıdan indirilip GitHub özetiyle karşılaştırıldı ve okundu: doğru Kan grupları başlığı/anlatımı görünürken modelin JS/CSS dosyaları ve workbox isteği beş saniyelik kontrolün sonunda henüz yanıt taşımıyordu. Konsol hatası kaydı yoktu; bu, tek başına sunucu veya uygulama kök nedeni kanıtı değildir. Aynı dosyalar normal TLS ile 200 ve dondurulmuş C3 baytlarıyla 0,23–0,27 s'de yeniden alındı. Hiçbir kod, assertion veya süre sınırı değiştirilmeden bütün 423 vaka ikinci denemede geçti. İlk hata ve trace incelemesi korunur.

[0.15 alpha](https://github.com/kaansavukduran/yksmania/releases/tag/v0.15.0-alpha.1), başarılı [43738552491](https://github.com/kaansavukduran/yksmania/actions/runs/43738552491) ile aynı doğrulanmış CI çıktılarından sekiz dosya olarak yayımlandı. Tag ve verified-run kaydı aynı kaynak SHA'sını gösterir. Yedi checksum girdisi, sekiz GitHub asset digest'i ve indirilen iki kanıt dosyasının özeti eşleşti. Beş büyük binary yerelde ayrıca indirilip hashlenmedi. Vercel ve Pages index/sw/version dosyaları normal TLS ile ilgili dondurulmuş C3 çıktılarıyla aynıydı.

Canlı web iş akışının 423 vakası, yayımlanmış HTTPS’ye çalışan 422 vaka ile ayrı gerçek Vite geliştirme sunucusunu başlatan bir YKS-069 regresyonundan oluşur. Yerel geliştirme vakası uzaktaki site denetimi diye sayılmaz.

---

## Tarihsel doğrulanmış 0.14 kaydı

# 0.14.0 — yayın ve paket kabulü tamamlandı

0.14 sürümü, doğrulanmış çalışma sırasının 139–168. başlıklarını kapsar. Önceden
hazır mol ve çarpanlara ayırma anlatımları yeniden sayılmadan 28 yeni etkileşimli
ünite eklendi: 236 bölüm, 479 paragraf, 121 çözümlü örnek, 121 hatırlama ve
280 özgün beş seçenekli soru. Toplam 174 anlatım, 146 ayrıntılı rehber,
174 yerleşik kopya kağıdı ve 1.540 soru; ilk 168/479 başlık anlatım ve soruyla
hazırdır. Eski 1.260 sorunun bütün alanları ve 147 eski dersin soru dışındaki
alanları korunur. Öğrenci PDF veya kaynak yüklemez. Tüm arşivin, tüm 479
başlığın veya son 20 yıllık bütün resmî sınavların tamamlandığı iddia edilmez.

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

Özel veri taraması 65 değişen metin yolunu, eski 8.845 ve canlı metadata'yla
8.959 özel kimlik/bağlantıyı kontrol etti; özel kimlik, ham PDF/binary veya
secret örüntüsü bulunmadı. 752 bağımlılık kaydı değişmedi. Sürüm/paket
korumasının 18 sentetik vakası PASS. Uzak kabul sonuçları aşağıdadır.
Fiziksel Android, temiz Windows kurulum, portable taşıma ve iki native sürüm
arasında veri koruyan yükseltme NOT TESTED.

## İlk canlı koşu: soğuk önbellek önkoşulu

İlk uzak c110f215 kaynağında CI dört iş (414 birim/361 tarayıcı) ve Pages üç
iş PASS; canlı web 360/361 idi. Eski periyodik karşılaştırma testi, service
worker hazır ve sayfayı kontrol ediyor olmadan ağı kapatıyordu; reload
ERR_INTERNET_DISCONNECTED verdi. Aynı değişmeyen C6 uygulamasıyla sw.js
yanıtı 20 saniye geciktirilince hata yeniden üretildi. Test gerçek
serviceWorker.ready, controllerchange ve activated durumunu beklediğinde
bütün eski çevrimdışı/model/kayıt asserleri geçti; normal preview odaklı 2/2
ve kaynak kontrolü PASS. Test veya assertion çıkarılmadı; uygulama kodu ve
111 çıktı dosyasının baytları değişmedi. Son aynı-SHA CI/Pages/canlı kapıları geçti.
Uzak trace indirilemediği için trace görüldü denmedi; iş logu ve gerçek
önce/sonra tarayıcı kanıtı kullanıldı.

## Doğrulanmış yayın

Kaynak `6c888e66cb81a0594264784cb760f22bed3c2dc3`. [CI 43730467669](https://github.com/kaansavukduran/yksmania/actions/runs/43730467669)
dört iş PASS: kaynak/derleme, 414 birim, 361/361 tarayıcı; gerçek Windows ve
Linux paketleriyle çevrimdışı kullanım, kayıt, aynı profil onayı ve yeniden
açılış; Android paket ve imza kontrolü. [Canlı Vercel 43730808569](https://github.com/kaansavukduran/yksmania/actions/runs/43730808569)
361/361 PASS; tam tarayıcı koşuları iki worker ile yapıldı.
[Pages 43730804858](https://github.com/kaansavukduran/yksmania/actions/runs/43730804858)
derleme, dağıtım ve gerçek HTTPS kabulü üç iş PASS. Her iki yayının index.html,
sw.js ve version.json dosyaları normal TLS ile donmuş yerel karşılıklarına
bayt eşittir; Vercel doğru kaynakla READY durumundadır.

[Release 43732075907](https://github.com/kaansavukduran/yksmania/actions/runs/43732075907)
PASS; [v0.14.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.14.0-alpha.1)
sekiz dosyayla yayımlandı, taslak değil. Tag ve verified-run aynı kaynak ve
başarılı CI'ı gösterir. SHA256SUMS.txt yedi dosya listeler; normal TLS ile
indirilen verified-run ve Android-verification dosyalarının iki hash'i
listeyle eşleşir. GitHub'ın sekiz varlık digest'i de karşılaştırıldı. Android
paketi com.fragaria.yksmania, sürüm 0.14.0, sürüm kodu 22; v2 imzası PASS.
Beş büyük paket dosyası ayrıca yerelde indirilip hash'lenmedi.

---

## Tarihsel doğrulanmış 0.13 yayını

# 0.13.0 yayını doğrulandı

Kaynak `ba8f553cbf8dff2dae985921096378ccd5908503`. CI [43715126173](https://github.com/kaansavukduran/yksmania/actions/runs/43715126173)
dört iş PASS: 355 birim, 303/303 tarayıcı; gerçek Windows/Linux paketleriyle
çevrimdışı/yeniden açılış/onay kabulü; Android 0.13.0 (sürüm kodu 21), v 2 imza doğrulaması.
Canlı Vercel [43715186079](https://github.com/kaansavukduran/yksmania/actions/runs/43715186079)
303/303 PASS. Pages [43715151603](https://github.com/kaansavukduran/yksmania/actions/runs/43715151603)
derleme/dağıtım/canlı kabulü üç iş PASS; 13 korunan model ailesi ve iki yeni
soru rotası ilk kez çevrimdışı açıldı, gerçek model/yanıt/açıklama/reload korundu;
renderer 0. Her iki HTTPS kökeninde index/sw/version normal TLS ile yerel
karşılıklarına byte eşit. Kökenler ayrı ilerleme saklar.

Release [43716979510](https://github.com/kaansavukduran/yksmania/actions/runs/43716979510)
PASS; [v0.13.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.13.0-alpha.1) sekiz dosyayla yayımlandı, taslak değil.
Tag ve verified-run kaynak SHA’sı yukarıdaki commit’tir. SHA 256 SUMS.txt yedi dosya
listeler; indirilen verified-run/Android-verification dosyalarının iki hash’i
eşleşir. Android paket kimliği com.fragaria.yksmania, sürüm 0.13.0 (sürüm kodu 21),
v 2 imza PASS. Beş büyük paket dosyası ayrıca yerelde indirilip hash’lenmedi.

Bu sürüm yeni anlatım ünitesi eklemez: 13 mevcut anlatıma 130 özgün soru;
toplam 146 anlatım/118 rehber/146 kağıt/1.260 soru, ilk 138/479 hem anlatım hem
soru hazır. Hazır 146 anlatımın tamamı bağımsız soruludur. Eski 1.130 sorunun tam
kayıtları ve 147 dersin soru dışındaki bütün alanları korunur. Bütün arşiv veya
479 başlığın tamamlandığı iddiası yoktur.

Yerel tam koşu 302/303, eski sorusuz cebir arama beklentisinden FAIL idi;
onarım ve dört onay kabulü birlikte 5/5 PASS. Son uzak 303/303 sonuçları aynı
onarılmış kaynakta PASS; yerel tam 303 koşusu yapılmış sayılmaz. İlk Pages uzak
FAIL ve yeniden üretilemeyen eski yerel PASS kaydı aşağıda korunur. Düzeltilmiş
HTML onay betiği kaynak tekrar derlenmiş prefix’te ve canlı Pages’te geçti.

Son gerçek 0.12→0.13 web güncellemesi bütün eski state/doküman/kataloğu,
5/5 oturumu, üç özgün tekrarı, kontrol edilmiş yanlış taslağı, notları ve 870 bayt
sentetik PDF’yi korudu; XP 25→25. Altı KORUNAN 0.12 model ilk kez offline açılıp
reload kaldı; bunlar yeni 0.13 üniteleri değildir. Aynı süreç/profil geliştirme
Electron’da iptal→tam kayıt aynılığı→açık onay→yeni soru→offline/reload PASS.

Fiziksel Android, temiz Windows kurulumu, portable taşıma ve iki native sürüm
arasında veri koruyan yükseltme NOT TESTED. Windows dosyaları Authenticode
imzasız, Android paket debug imzalı alpha’dır. Önceki kişisel dosyalar görünmeden
korunur; öğrenci hiçbir ders PDF’si veya kaynak yüklemez.

---

# 0.13.0 tarihsel hazırlık kaydı: 13 eski başlığın soru çalışması

0.13 veri eklemesi, önceki anlatımı ve modeli hazır 13 başlıktaki bağımsız soru
açığını kapatır: 5 matematik, 7 tarih ve katman elektron dizilimi. Yeni 130
özgün soru vardır; yeni anlatım, rehber, model veya çalışma sırası başlığı yoktur.
Toplam 146 anlatım, 118 ayrıntılı rehber, 146 kağıt ve 1.260 soru; hazır 146
anlatımın tamamında ve sıradaki ilk 138/479 başlıkta soru çalışması bulunur.
Bütün 479 başlık veya tüm kaynak arşivi tamamlandı iddiası yoktur.

Kaynak dalı `forge/earlier-practice-gaps`; 0.13 kaynak eklemesi `ef57b2a`,
0.12 C2 kaynak düzeltmesi `3104da1` ile yerel birleşim `2994b29`.
Bunlar yayın veya CI kabulü değildir. C 2 ile birleştirilmiş kaynakta yerel
derleme geçti; tarayıcı, Pages, Electron ve paket kabulü ayrıca izlenir.

İlk plan on eski başlığı kapsıyordu. Bütün hazır anlatımlarda soru arayan katı
kabul, iki cebir ve bir katman dizilimi rehberinde üç ek boş banka buldu.
Kapsam, 20 cebir ve 10 kimya sorusuyla 13 başlığa genişletildi; eksikliği
örtmek için test azaltılmadı. Önceki 1.130 soru tüm JSON alanlarıyla korunur.
147 eski ders kaydının soru dışındaki bütün alanları, kabul edilmiş kaynakta
alınan SHA-256 kayıtlarıyla aynı kalır; bunların 146’sı konu anlatımıdır.

130 sorunun tamamı yazar dışı içerik incelemesinden geçti. Matematik 30 ve
cebir 20 soru bağımsız hesaplarla; tarih 70 ve katman 10 soru bütün seçenek,
anahtar, ipucu ve gerekçeleriyle incelendi. Gerçek kaynak sayfa sınırları
SOURCE_REVIEW’dedir. Resmî soru veya seçenek aktarımı yapılmadı; kaynak
atıfları yeni bir ÖSYM kitapçığı/anahtarı okuması sayılmadı.

Cebirde karşılıklı sıralama ipucunun “sıfırdan uzakta” sözü, pozitif sayılar
sıfıra keyfî yakın olabildiği için düzeltilmiştir; sorunun anahtarı değişmedi.
Dönüştürülen 130 kart, incelenen kaynak soru verisiyle alan alan eşittir;
yalnız uygulamanın kararlı soru kimlikleri tanımlandı ve özel kaynak metadata’sı
çıkarıldı. Eski kimlikler, gövdeler, modeller ve öğrenci kayıtları değiştirilmez.

C2 ile birleştirilmiş kaynakta `check`, `build` ve 355/355 birim testi PASS.
İlk tam birim koşusu
354/355 PASS idi: eski cebir testinin `questions=[]` beklentisi yeni yetkili
kapsamla geçersiz kaldı. On bağımsız, benzersiz soru kabulüne güncellendi;
sıfır katsayı, rasyonel çözüm ve eşitsizlik model denetimleri korunur.
Önceki 0.13 derlemesinde 16 temel soru paketi için 32/32 tarayıcı,
Pages ve geliştirme Electron ilk soru/geri bildirim/yeniden açılış kabulü PASS.
Aynı profilde iki soru taslağını değiştirme denemesi ayrıca gerçek bir native
onay kusurunu ortaya çıkardı; aşağıdaki onarım son derlemeye eklenmiştir.

YKS-067 (Orta): kontrol edilmiş matematik taslağından tarih sorularına geçişte
Electron 45.3.2/headless süreci, `window.confirm` sırasında test temizliğinden
önce SIGTRAP ile kapandı. Bu üç mevcut sistem onayı ortak HTML penceresine
alındı: taslak değiştirme, kişisel ilerleme yedeği geri yükleme, oturum geri
alma. Varsayılan iptal odağı, Escape/odak dönüşü, açık onay ve prompt/kayıt
boyunca çift tıklama kilidi korunur. Native API stub kabul yerine kullanılmaz.
Dört yeni ve dört eski ilgili browser vakası 8/8 PASS; son kaynakta 355/355
birim, check ve ayrı web/Pages derlemeleri PASS. Yeni genel liste 23 dosyada
303 vakadır. Son tam yerel koşu 302/303 PASS idi: tek başarısızlık, yeni
cebir bankasını hâlâ sorusuz sayan eski `prepared-search` beklentisiydi.
Arama testi artık yeni bankanın tek kart/10 soru olduğunu doğrular; eski
question-only paket ayrımı korunur. Düzeltilen arama ve dört onay vakası
birlikte 5/5 PASS (19,6 sn); yerel tam 303/303 iddiası yoktur.
Son Pages alt yol kontrolü PASS. Geliştirme Electron’da aynı süreç/profilde
kontrol edilmiş yanlış taslak/not korunurken iptal → bütün state aynılığı →
yeniden açık onay → yeni soru → çevrimdışı reload PASS; renderer hatası 0.
İki gerçek onay ekranı ayrıca görüntüden incelendi.
İlk veri kaydı henüz yazılmadan state okumaya çalışan fresh-profile smoke
varsayımı da gerçek kayıt + saved durumu beklenerek düzeltildi; eksik kayıt
boş veriyle örtülmedi.

Soru kartları sıradan Sorular ve anlatımdan soruya geçiş yolunu kullanır.
Pasaj gerektiğinde kökten önce gösterilir. Yeni tarayıcı vakaları çevrimdışı
ilk açılışı, gerçek 9/10 kaydını, 3/7/21 tekrarlarını ve 320 px büyük yazıyı
sınamak üzere hazırlanmıştır. Pages ve Electron betiklerine bir matematik ve
bir tarih soru rotası eklendi; eski akışlar korunur. Betik sözdizimi kontrolü
çalışan paket veya fiziksel cihaz kanıtı değildir.

Son derlemeyle gerçek 0.12→0.13 aynı köken service worker güncellemesi PASS:
güncelleme düğmesi/waiting geçişi kullanıldı, bütün eski state/doküman/katalog
aynen korundu. Eski 5/5 oturum, üç özgün tekrar, kontrol edilmiş yanlış taslak,
notlar ve sentetik 870 bayt PDF kaldı; XP 25→25. Altı KORUNAN 0.12 model ilk
kez çevrimdışı açıldı ve reload kaldı; bunlar yeni 0.13 üniteleri değildir.
Bu yerel web güncellemesidir; fiziksel/native sürüm geçişi değildir.

Yayın öncesi mahremiyet denetimi, 0.12 son belge tabanı 345415 c ile farktaki
metinleri 8.845 bilinen özel kimlik/bağlantıya karşı taradı: özel kimlik,
ham PDF, binary veya anahtar yok. 752 bağımlılık kaydı korunur; kilitte yalnız
iki kök sürüm alanı değişir. 0.13 uzak CI ve yayın kabulü henüz bekleniyor.

Pages ilk uzak kabulü 43714489303, temel soru geçişinde testin kaldırılmış
native onayı beklemesi nedeniyle FAIL oldu. Uygulama HTML onayı gösteriyordu;
betik gerçek pencereyi açıp onay öncesi bütün kaydın aynılığını ve görünür
“Yeni çalışmayı aç” eylemini doğrulayacak şekilde düzeltildi. Eski yerel PASS
raporu aynı akışla yeniden üretilemediği için son kabul kanıtından çıkarıldı.
Kaynak tekrar ayrı prefix dizinine derlendi; 99 dosyanın tamamı eski prefix ile
byte eşitti. Eski betik yeni prefix'te de aynı hatayı üretti; yalnız test
beklentisi onarıldı, uygulama/soru verisi değişmedi. Yeni yerel Pages kabulü PASS; HTML onaydan sonra her iki yeni banka ilk kez
çevrimdışı açıldı, yanıt/geri bildirim/reload ve bütün eski akışlar korundu.
Uzak tekrarlar bu düzeltilmiş betikle ayrı kaydedilir. İlk CI/canlı koşuları,
nihai aynı kaynakta tekrar için iptal edildi; tamamlanmış kabul sayılmaz.

Android kaynak sürümü 0.13.0/code 21; 752 bağımlılık kaydı değişmez. Deneme
kataloğu hâlâ 13 settir: TYT 105, AYT 25 ve 11 branş. Eksik resmî dağılım
etiketleri ve süreler korunur; yeni deneme başlangıçta çeşitlenir, eski taslak
ve sonuçlar tam soru kopyasıyla sabit kalır. 0.13 uzak CI, yayın ve native paket
kabulü henüz bu aday kaydında tamamlanmış sayılmaz.

---

# 0.12.0 yayımlandı: 30 yeni ünite ve deneme çeşitliliği

Doğrulanan paket/test kaynağı: `3104da161845175930a7d51d1f9ee1a2ce724b9d`.
109–138. başlıklara 30 etkileşimli ünite eklendi: 263 bölüm, 123 çözümlü örnek,
128 hatırlama ve 300 beş seçenekli özgün soru. Karbohidratlar, Lipitler ve
Vitaminler için 30 soru daha eklendi. Toplam 146 anlatım, 118 ayrıntılı rehber,
146 yerleşik kopya kağıdı ve 1.130 soru; eski 800 soru tam kayıtlarıyla korunur.
İlk 138/479 başlığın anlatımı hazırdır. Bütün arşiv tamamlanmadı; sonraki başlık
139: Su, Hayat ve Çevre Kimyası / detail-167. Global denetim kalan 13 eski
anlatımda soru açığı saptadı; bunlar bu sürümde hazır soru çalışması sayılmaz.

Yeni denemeler ilgili havuzdan dersler arasında başlangıca özgü seçim yapar;
yarım taslak ve eski sonuçların tam soru/seçenek/cevap/pasaj/açıklaması sabittir.
13 set: TYT karma 105, AYT Sayısal karma 25 ve 11 branş. Bunlar orantılı süreli
kısa pratiklerdir; tam 120/80 resmî dağılım veya sınırsız bankanın tamamlanması değildir.
Öğrenci PDF/katalog yüklemez. Türkçe ürün, onaylı simgeler/Aion varlıkları,
1/3/7/21 (+2/+6/+20) ve öğrenme kanıtı ayrımları korunur.

- [CI 43709394878](https://github.com/kaansavukduran/yksmania/actions/runs/43709394878): dört iş PASS; check/build, 351 birim, 273 tarayıcı (13,3 dk), Windows/Linux gerçek paketli çevrimdışı/yeniden açılış, Android 0.12.0/code20/v2 imza.
- [Canlı 43709747100](https://github.com/kaansavukduran/yksmania/actions/runs/43709747100): gerçek Vercel HTTPS kökeninde 273/273 PASS (17,3 dk). Normal TLS index/sw/version hash’leri yerel C2 ile eşit.
- [Pages 43709749730](https://github.com/kaansavukduran/yksmania/actions/runs/43709749730): alt yol derleme, dağıtım ve gerçek HTTPS kabulü üç iş PASS; 13 model ailesinin ilk çevrimdışı kullanımı, değişimi, kaydı, yeniden yüklemesi, soru açıklaması ve mobil gezinme.
- [Release 43711058866](https://github.com/kaansavukduran/yksmania/actions/runs/43711058866): PASS; [v0.12.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.12.0-alpha.1) sekiz dosya, draft değil. Tag ve verified-run aynı 3104da1; yedi payload checksum listesi ve indirilen iki kanıt hash’i PASS. Beş büyük binary ayrıca yerelde indirilip hash’lenmedi.

Yerel check/build, 351 birim ve son C 2 tam 273 tarayıcı testi PASS (21 dk).
İlk hedefli 66, son font/simge 9, iki 120 durum ve son 88 görünüm ölçümü PASS.
Otuz ünitede 45 px sözcük bölünmesi 0; seçilmiş gerçek görüntüler ayrıca incelendi.
Ölçüm sayısı bütün görüntülerin kusursuz olduğu iddiası değildir. Geliştirme
Electron ve yerel Pages alt yolu C 2’de PASS. Gerçek 0.11→0.12 SW güncellemesinde
bütün eski state/documents/catalogue, skor, not, taslak, ayar, üç tekrar ve 870 bayt
sentetik legacy PDF korundu; XP 25→25. Altı yeni aile ilk kez çevrimdışı açılıp
değişti ve yeniden yüklemede kaldı. 99 runtime dosyası test kopyasıyla byte eşittir.
Renderer/requestfailed 0. Bu fiziksel veya iki native paket yükseltmesi kabulü değildir.

300 anahtar/123 örnek ve 30 temel biyoloji sorusu bağımsız içerik denetiminden geçti.
Sayfa sınırları SOURCE_REVIEW’dedir. AIONIA canlı v 1.7 standardı, bölüm 22 yeniden
okundu; kaynak değişim zamanı 2026-11-13 T 00:29:34.975 Z. Gizlilik taraması 66 metin
yolunu 8.845 bilinen özel ID/URL ile karşılaştırdı: eşleşme, PDF, binary ve anahtar
yok. 752 bağımlılık kaydı aynı; lock değişikliği yalnız kök sürüm alanlarındadır.

İlk başarısız koşular korundu: 342/343 birim, keyfî açıklama uzunluğu beklentisiydi;
gerçek açıklama aynılığı/boş olmama/cevaptan fark denetlendi. İlk 347/351 temel
soru testinde bütün verisi kökteki Vitamin 10’un tablo atfı netleştirildi. İlk tam
yerel 269/272 ve ilk CI/canlı üç Türkçe caption font beklentisinde FAIL oldu;
37,35 px küçük açıklama 45 px eylemle eşit sanılmıştı. Tipografik roller ayrıldı,
ölçek/sözcük/davranış sınırları korundu; son kaynakta yerel/CI/canlı 273 PASS.

| Kimlik | Önem | Belirti ve onarım |
| --- | --- | --- |
| YKS-052 | Orta | Kalıtım modelinin varsayılan AaBBcc genotipi doğrulayıcı tarafından reddediliyordu. Küçük harfli homozigot lokusları kabul eden çift denetimi ve varsayılan gamet regresyonu eklendi. |
| YKS-053 | Orta | Geniş boşluk biçimlendiricisi biyoloji API değerini ve import yollarını değiştirmişti. Kanonik değer/yollar geri alındı; 75 bağımsız model durumu denetlendi. Ürün metni düzeltmesi kimliklerden ayrıldı. |
| YKS-054 | Orta | Bütün su tam doygunluk sınırında gaz olduğunda model “doygunluk altı” diyordu. Sıvı varlığı ile doygunluk ayrı hesaplandı; eşik metni ve regresyon eklendi. |
| YKS-055 | Orta | Düzlem aynanın gerçek yansıyan SVG ışını seçili açıya uymuyordu. Geometri trigonometrik ilişkiyle onarıldı; saf hesap ve gerçek DOM kabulü eklendi. |
| YKS-056 | Orta | Fiiller 7. sorusunda yalnız -mış eki için sorulan kapsam iki yoruma açıktı. Bütün cümlenin ek bağlam olmadan kesinleştirilemeyen yargısını soran kökle netleştirildi; anahtar korundu. |
| YKS-057 | Orta | Matematik grafikleri görünür eksen/birim, önce-sonra ve A/B açıklamaları olmadan kalıyordu; görünür ölçek, işaret ve açıklamalar eklendi. |
| YKS-058 | Orta | Grafit/elmas çizimleri iki element gibi farklı renkteydi; tek karbon rengi ve C etiketleri kullanıldı, iyonik ayrım korundu. |
| YKS-059 | Orta | Tek gametin üç aleli üç ayrı hücreyi andırıyordu; ortak haploit hücre sınırı ve tek gamet metni eklendi. |
| YKS-060 | Orta | Dar ekranda biyoloji tahmin seçeneği kesiliyordu; tam seçili metin satır sararak gösterilir. |
| YKS-061 | Orta | 320 px/UI 200/text 150’de iç içe dolgular 45 px sözcükleri bölüyordu; yazı boyutu korunarak dört ailede dolgu onarıldı. 30 üniteye gerçek sözcük aralığı regresyonu eklendi. Koordinasyon sözcüğü fiziksel olarak sığmayınca anlamı koruyan “Ortak yönetim” kullanıldı. |
| YKS-062 | Düşük | Tek zigot ve plazma çizimleri boş alanın soluna yığılmıştı; sayısal model değişmeden merkezlendi. |
| YKS-063 | Orta | Yeni köprü sorusu glikoz–galaktoza yapısal izomer diyordu; stereo ayrımını koruyan genel izomerlik ifadesiyle düzeltildi. |
| YKS-064 | Orta | Vitamin çıkarım sorusunun kapsamı birden çok yoruma açıktı; kökteki bilgi ile kişi belirtisi birlikte ve açık sınırla ele alındı. |
| YKS-065 | Orta | Üç eski biyoloji başlığında bağımsız soru rotası kullanılamıyordu; 30 kaynaklı özgün soru bağlandı. On üç diğer önceki soru açığı sonraki işte açıktır. |
| YKS-032 | Orta | Sevgi/Umut kişi adı-duygu belirsizliği; açık duygusal bağlam ve regresyon |
| YKS-033 | Orta | Matematik topic eşlemesi ters; ilk entegrasyon Mutlak Değer 0 ders FAIL, doğru lesson→topic ile 10/10 ilgili kabul PASS |
| YKS-034 | Orta | Parantezsiz−2⁰ sayısal−1/SVG+1 çelişkisi; çizim ve açıklama−1 ile tutarlı |
| YKS-035 | Orta | r 0 açık sınır merkez noktasıyla dolu görünüyordu; işaretler ayrıldı, gerçek açık uç kontrolü |
| YKS-036 | Orta | Elektroskop sorusunda ikinci belirsiz seçenek; kökte açık nötr başlangıçla çeldirici ayrıldı |
| YKS-037 | Orta | Protein kapalıyken aktif pompa SVG'de vardı; gerçek protein/ATP koşulları ayrıldı |
| YKS-038 | Orta | Dipol ok başı atomla örtülüyordu;33 uç geometrisi ve gerçek H₂O/NH₃/HF görüntüleriyle açıklık doğrulandı |
| YKS-039 | Düşük | Metin boşluğu düzenlemesi CSS class'ı bölmüştü; yalnız class düzeltildi, API/state kimlikleri korundu |
| YKS-040 | Orta | Molecular SVGmarker ve select aynı ID; gerçekDOM label.control=null. Kontrol '-bond-choice' ile ayrıldı, AT/uniqueID regresyonu eklendi |
| YKS-041 | Düşük | Türkçe ilişki ikonunda↳ tofu; mevcut lucide vektörüyle iki dekoratif ikon onarıldı |
| YKS-042 | Düşük | Orantı 12 tick ve x ekseni birleşiyordu; tick sağ uca hizalandı, gerçekBBox boşluk kabulü eklendi |
| YKS-066 | Orta | Karbon/iyon işaretleri dolu daireler üzerinde düşük kontrastlıydı. Zıt tema mürekkebiyle onarıldı; üç tema × üç model × 12 sembol en az 5,381:1 kontrastı geçti, dokuz gerçek görüntü incelendi. |

Fiziksel Android, temiz Windows kurulumu/portable taşıma ve iki native paketle
veri koruyan yükseltme ayrıca doğrulanmalıdır.

# 0.11.0 yayımlandı: 30 yeni ünite ve GitHub Pages

Paket/test kaynağı `3cd370beb1f7dd96cd9866508c58c96444e5bce5`; uygulama
kaynakları `4065dc7` ile aynıdır. Aradaki değişiklikler Pages iş akışı,
kalıcı kayıt bekleme ve eski not yerleşimi testinin hedef sayfayı beklemesidir.
[CI43699042962](https://github.com/kaansavukduran/yksmania/actions/runs/43699042962)
dört iş PASS: check/build, 279 unit, 204 browser, gerçek paketli Windows/Linux
çevrimdışı ve yeniden açılış kabulü, Android build/imza/metadata.
[Canlı43699042930](https://github.com/kaansavukduran/yksmania/actions/runs/43699042930)
aynı kaynakta 204/204 PASS (14,3 dk). Önceki canlı 43698058438 de 204/204 PASS.
Vercel production 0.11.0; normal TLS index/sw/version hash'leri yerel derlemeyle eşit.

[Pages43700388975](https://github.com/kaansavukduran/yksmania/actions/runs/43700388975)
üç iş PASS: alt yol derlemesi ve yerel kabul, deploy, doğrudan canlı HTTPS
adresinde yedi yeni model ailesinin ilk çevrimdışı açılışı, gerçek değişimi,
kayıt/yeniden yükleme, soru açıklaması ve mobil gezinme. Adres:
https://kaansavukduran.github.io/yksmania/ . İlk gerçek yayında dört runtime/
manifest hash'i yerel Pages derlemesiyle eşit. Vercel ve Pages ayrı ilerleme saklar.

[Release43700509433](https://github.com/kaansavukduran/yksmania/actions/runs/43700509433)
PASS; [v0.11.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.11.0-alpha.1)
draft değil, sekiz dosya. Beş binary başarılı CI'den yeniden derlenmeden
alındı; tag ve verified-run aynı 3 cd 370 b. Yedi payload checksum listesi;
indirilen iki kanıt hash'i PASS. Android 0.11.0/code 19/v 2 imza PASS.
Beş büyük binary ayrıca yerelde indirilip hash'lenmedi. Fiziksel Android,
temiz Windows kurulumu/portable taşıma ve iki native paket arasında veri
koruyan yükseltme ayrıca doğrulanmalıdır.

Bu sürüm 79–108. başlıkları ekler: toplam 116 anlatım, 88 ayrıntılı rehber,
116 kopya kağıdı, 800 özgün soru ve ilk 108/479 başlık hazır. Bütün arşiv
henüz tamamlanmadı. İlk başarısız denemeler ve onarımlar aşağıda korunur.

---

# 0.11.0 hazırlık kaydı: 30 kapsamlı başlık, GitHub Pages

Yetkili proje kaansavukduran/yksmania; dal forge/next-thirty-units.
Başlangıç b3a08bd21da38a40c99144c1761c9f68d72c9dfb (uygulama 22872a2).
Kullanıcı bu turda devamı, tüm konuların kapsamlı işlenmesini ve ayrıca GitHub
Pages yayınını istedi. 79–108. başlıklar için 30 yeni ünite tamamlandı; 274
bölüm, 123 çözümlü örnek, 136 hatırlama, 300 yeni soru. Toplam 116 anlatım,
88 rehber, 116 kağıt ve 800 özgün soru; ilk 108/479 hazır. Basınç ve kaldırmanın
önceki kağıtları korunarak genişlediği için 30 ders, 28 yeni kağıt vardır.
TYT karma 105, AYT karma 25 ve 11 branş çalışması; tam resmî dağılım değildir.
Önceki 500 soru tüm JSON alanlarıyla korunur. Kaynak sayfa sınırları
SOURCE_REVIEW içinde; özel PDF/ham metin/kimlik yayımlanmaz.

AIONIA canlı v 1.7 bu turda okundu; mevcut Türkçe/Windows/Linux/Android/web,
onaylı ikon ve Aion paftası korunur. Kullanıcı komut belgesini paylaşmak k 44,
Aionlaştır veya aionia etkinleştirmesi sayılmadı. Yeni İngilizce/macOS/iOS veya
Drive yedeği kapsamı açılmadı. GitHub Pages için ayrıca açık yetki verildi.
Bağlı uygulamayla Pages ayarı POST 403 verdi; kullanıcı Source=GitHub Actions
seçtiğini doğruladı. Yayın iş akışı aynı kaynak için ayrı gözlemlenir.

Yazar ve ikinci okuyucu 300 anahtarı, 123 örneği ve model koşullarını denetledi.
Türkçede bir örnek dönüşümü ve soru seçeneği netleştirildi. Kaynakların yanlış
veya koşulsuz genellemeleri taşınmadı. İlk tam 277 unit PASS, tsc tek string
SVG prop için FAIL; y=370 sayı yapıldı. Güncelleme metadata sürümü 0.10.0
kaldığı için ilk gerçek upgrade koruması FAIL verdi; version.json 0.11.0 ve
30 konunun notuna düzeltildi, sürüm sözleşmesi regresyon testi eklendi.

Yeni 62 browser ilk koşu 61 PASS/1 FAIL: tam ve cevaplanabilir “280'in %15'i
kaçtır?” kökü keyfî >20 karakter sınırına takıldı. Kök değiştirilmedi; test
artık ilk gerçek soru metninin aynen çizildiğini denetler. Pages ilk kabulünde
select içeren label için exact getByLabel uyuşmadı; gerçek role/name seçicisi
kullanıldı, etkileşim/sonuç/offline koşulları korunur. Son tam 204/204 browser
kabulü PASS (13,6 dk); check/build ve 279/279 unit PASS. Son 30×4 ölçüm/
görüntü durumu PASS, renderer 0. Seçilmiş gerçek görüntüler ayrıca incelendi.
Son geliştirme Electron akışı yedi yeni aile ve eski çalışma/deneme/kayıt
akışlarıyla PASS, renderer 0. Yerel Pages alt yol kabulü ve gerçek 0.10→0.11
web güncellemesi PASS; 87 runtime dosyası yükseltme test kopyasıyla byte eşit.
Uzak CI, paket ve iki canlı yayın bu aday kaydından sonra doğrulanacak.
Pages ilk uzak 43698319741 koşusu yedi modelden sonra soru taslağının disk
kaydı beklenmeden yenilenmesi yüzünden FAIL verdi. Test artık kaydedildi
durumunu ve gerçek IDB checked=true kaydını bekler; feedback/reload koşulu
korunur. Aynı runtime ile düzeltilmiş yerel Pages kabulü PASS. Bu yalnız test
onarımıdır; uygulama dosyaları 4065 dc 7 ile byte eşittir.

Pages 43698533483 build/deploy PASS, e 47 dafe; gerçek HTTPS index/sw/version/
manifest dört hash yerel alt yol derlemesiyle eşit. Yerel sistem Chromium'da
canlı URL sertifika otoritesi hatası verdi; TLS kontrolü kapatılmadı. İş akışına
GitHub runner'da doğrudan yayımlanan adreste aynı kabulü yapan üçüncü iş eklendi.
Ayrıca artık geride kalmış CI kaynağı ana dal ilerlediyse otomatik yayınlanmaz.

İlk ana CI 43697993699: 203/204 browser PASS; eski YKS-006 testi Sorulara geç
sonrasında hedef sayfa bağlanmadan DOM ölçtü, practiceNote undefined oldu.
Test artık gerçek soru paneli ve not alanının görünmesini bekler, undefined
ölçümü açıkça reddeder; simetri/taşma/boşluk sınırları aynı. Son derlemede
ilgili test PASS (4,7 s); uygulama kaynakları ve runtime değişmez. Yeni tam
CI bu test onarımıyla başlatılır; başarısız koşudan paket yayımlanmaz.

Yayımdan önce düzeltilen somut bulgular:
- YKS-043/Orta: Zarflar gerekçesi 240, kayıt sınırı 128 idi; UI 120 karaktere
  alındı ve kalıcılıkla denetlenir.
- YKS-044/Orta: CO otomatik adı monooksit çıkıyordu; monoksit ve saf model testi.
- YKS-045/Orta: iyon–indüklenmiş dipolün yakın kutbu iyon yüküne bağlı değildi;
  Na⁺/Cl⁻ iki sıra ve iki anlık durum için saf/gerçek SVG regresyonu eklendi.
- YKS-046/Orta: ahtapot beş kol çiziyordu; sekiz kol ve gerçek DOM sayımı.
- YKS-047/Orta: mayoz öğretiminde heterolog çift yazılmıştı; çiftin kendi içinde
  homolog, farklı çiftlerin homolog olmadığı açıklamasıyla düzeltildi.
- YKS-048/Orta: litik faj çıkışında konak sınırı kapalıydı; çıkışta kırık kontur,
  diğer aşamalarda kapalı sınır çizilir; gerçek SVG/renk kontrolü eklendi.
- YKS-050/Orta: yeni biyoloji çizimleri tanımsız --green, zarflar --panel
  kullanıyordu; geçerli tema renkleriyle düzeltildi. Kromozom ve gen yollarının
  gerçek computed stroke görünürlüğü ve tüm yeni tema değişkenleri test edilir.
- YKS-051/Orta: mayoz I sitokinezi tamamlandığında iğ çizimi sürüyordu; yalnız
  ilgili aktif evrelerde çizilir ve sitokinez I durumunda yokluğu denetlenir.
- YKS-049/Orta: önceki başarılı 0.10.0 koşusu yeni sabit etikete yayınlanabilirdi;
  exact SHA kaynak sürümü/Android code 19/beş gerçek dosya adı ve APK metadata
  kapıları eklendi. Eski mantık stale koşuyu kabul etti, yeni kapı reddetti;
  18 sentetik kabul/ret vakası PASS. Uzak yayın bu sentetik teste dahil değil.

Fiziksel cihazlar, temiz kurulum/portable taşıma, iki native sürüm yükseltmesi
ayrıca doğrulanmalıdır. Bu kabul, bütün arşiv veya bütün platformlar tamamlandı
iddiası değildir. Sıradaki 109. başlık Faiz Problemleri/detail-215.

---

# 0.10.0 yayımlandı: 20 kapsamlı ünite

Uygulama ve paket kaynağı `22872a289b26da02bc6feab9fb34db587670a55d`.
Yetkili repo kaansavukduran/yksmania; dal forge/twenty-units → main;
başlangıç f3b06134061d7937c3e38e8c9530b0d4b4944284.

[CI43635461738](https://github.com/kaansavukduran/yksmania/actions/runs/43635461738)
dört iş PASS: temiz npmci/check/build,192 unit ve 142 browser (6,7 dk),Windows,
Linux,Android. Paketli Windows/Linux'ta altı yeni model ailesinin ilk offline
açılışı/gerçek değişimi/reload ile eski ders/not/taslak/skor/sınav/timer/reset
akışları PASS,renderer 0. Android APK build+imza/manifest komutları PASS.
[Canlı43635597330](https://github.com/kaansavukduran/yksmania/actions/runs/43635597330)
aynı 22872 a 2 kaynağında 142/142 PASS (7,6 dk). Vercel production
`dpl_9t9vcgss5RDpF8m6FK332X86QkH7` aynı kaynakta READY,version0.10.0;
normalTLS index/sw/version SHA 256 kabul edilmiş yerel derlemeyle eşit.

[Release43636719923](https://github.com/kaansavukduran/yksmania/actions/runs/43636719923)
PASS; [v0.10.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.10.0-alpha.1)
draft değil,8 asset:5 binary ve 3 kanıt. Başarılı CI'nin dosyaları yeniden
üretilmeden yayımlandı. Tag ve verified-run aynı 22872 a 2 main kaynağında;
indirilen iki kanıt hash'i eşleşti,checksum listesi 7 payload. Android
versionName 0.10.0/code 18/v 2 signature PASS. Beş büyük binary ayrıca yerelde
indirilip hash'lenmedi. Denetlenen kapsamda açık doğrulanmış kusur yok.

Son teslim kaydı yalnız FORGE/README/CONTENT_COVERAGE/QA/RELEASE_ALPHA
belgelerini değiştirir; kabul edilmiş uygulama/test/paket kodu 22872 a 2 aynıdır.
Bu yalnız doküman değişikliği için uygulama testleri tekrar çalıştırılmadı.

Kullanıcının istediği 20 ünitenin tamamı, doğrulanmış sıranın 59–78 başlıkları:
5 matematik,5 fizik,2 kimya,2 biyoloji,3 Türkçe,3 tarih.189 ayrıntılı bölüm,
91 çözümlü örnek,92 recall ve 200 özgün 5 seçenekli soru eklendi. Önceki 300
sorunun tamJSON kimlik/metin/pasaj/şık/ipucu/açıklama/anahtar eşitliği PASS.
Toplam 86 anlatım/58 rehber/88 kağıt/500 soru; ilk 78/479 hazır. Akım kağıdının
önceden incelenmiş örnekleri yeni dersle birleştirildi; bu yüzden 20 ders,
19 yeni kağıt sayımı vardır. TYT karma 105/AYT karma 25 ve 11 branş seti;
120/80 tam dağılım veya bütün arşiv tamamlandı iddiası yok. Sıradaki 79:
Sayı Problemleri/detail-210. Özel komutlar etkinleştirilmedi, Türkçe ve mevcut
Windows/Linux/Android/web kapsamı ve onaylı ikonlar/Aion 32 kare korunur.
Canlı AIONIA standardı tekrar okundu:v 1.7. Kaynak sınırları SOURCE_REVIEW'dedir.

Yeni 200 anahtar ve 91 örnek bağımsız ikinci incelemeden geçti. Yayımdan önce
kanıtlanan ve onarılan bulgular:

| Kimlik | Önem | Belirti ve onarım |
| --- | --- | --- |
| YKS-032 | Orta | Sevgi/Umut kişi adı-duygu belirsizliği; açık duygusal bağlam ve regresyon |
| YKS-033 | Orta | Matematik topic eşlemesi ters; ilk entegrasyon Mutlak Değer 0 ders FAIL, doğru lesson→topic ile 10/10 ilgili kabul PASS |
| YKS-034 | Orta | Parantezsiz−2⁰ sayısal−1/SVG+1 çelişkisi; çizim ve açıklama−1 ile tutarlı |
| YKS-035 | Orta | r 0 açık sınır merkez noktasıyla dolu görünüyordu; işaretler ayrıldı, gerçek açık uç kontrolü |
| YKS-036 | Orta | Elektroskop sorusunda ikinci belirsiz seçenek; kökte açık nötr başlangıçla çeldirici ayrıldı |
| YKS-037 | Orta | Protein kapalıyken aktif pompa SVG'de vardı; gerçek protein/ATP koşulları ayrıldı |
| YKS-038 | Orta | Dipol ok başı atomla örtülüyordu;33 uç geometrisi ve gerçek H₂O/NH₃/HF görüntüleriyle açıklık doğrulandı |
| YKS-039 | Düşük | Metin boşluğu düzenlemesi CSS class'ı bölmüştü; yalnız class düzeltildi, API/state kimlikleri korundu |
| YKS-040 | Orta | Molecular SVGmarker ve select aynı ID; gerçekDOM label.control=null. Kontrol '-bond-choice' ile ayrıldı, AT/uniqueID regresyonu eklendi |
| YKS-041 | Düşük | Türkçe ilişki ikonunda↳ tofu; mevcut lucide vektörüyle iki dekoratif ikon onarıldı |
| YKS-042 | Düşük | Orantı 12 tick ve x ekseni birleşiyordu; tick sağ uca hizalandı, gerçekBBox boşluk kabulü eklendi |

Yerel check/build ve 192/192 unit PASS. İlk yeni 41 browser 35 PASS/6 FAIL:
üç Türkçe testinin SVG varsayımı erişilebilir HTML parça diyagramına düzeltildi;
sıfatın dönüşüm sırası gerçek Ada bağla→Fiile bağla akışına uyarlandı;
r 0'da iki eş uç yerine bir ayrı açık uç beklendi. Açık uç/merkez ayrımı,
gerçek görselDOMdeğişimi, sonuç, offline ve noXP koşulları gevşetilmedi.
Son tam 142/142 browser PASS (9,7 dk). Bu koşudan sonra yalnız YKS 040/041/042
UI yamaları eklendi; son derlemede check/build,192 unit ve 41/41 etkilenen
browser tekrar kabulü PASS(2,8 dk). Label binding/benzersizID,vectorikon ve
BBoxayrımı yeni koşulları da geçti. Son frozen source yerel kabuldedir.

Geliştirme Electron offline/yeniden başlatma/not/soru/deneme/timer/reset ve
altı yeni ders ailesinin gerçek menüden ilk offline açılışı+model değişimi+
reload PASS, renderer 0. İlk deneme eksik Electron runtime fetch başarısızdı;
pinned 45.3.2 paket checksums değeriyle eşleşen mevcut cache kullanıldı.
Bu geliştirme kabulü paketli Windows/Linux veya fiziksel cihaz yerine sayılmaz.

Manuel ilk 66 durum+son 45 ek durum; belge/lab/kontrol geometrisi ve renderer 0.
Yeni alan keşifleri session/review/topicProgress değiştirmedi. Kimya 12 ekdurum
ve 30 viewport görseliyle negatif yön okları/δ etiketleri gerçekten incelendi.
YKS 040/041/042 son 4 model/16 durum görsel ve gerçek labeltap kontrolü PASS;
oran 12/x etiket aralığı 320 px büyük yazıda 9,74 CSSpx. Toplam 127 manuel ölçüm
ve bağımsız 12 kimya durumu,0 renderer/taşma. Kök tüm 72 distdosyasının manuel
veSWkopyalarında byte eşitliğini ayrıca doğruladı.
Gerçek 0.9.2→0.10 yerel webSW geçişi PASS; son UI yamalı kopyayla aynı tam
state/legacy 870 bayt/checkedtaslak/noXP kabulü tekrar PASS: tam eski snapshot
eşit, üç yeni model ilk offline açılış/reload,XP 25→25,renderer 0. İlk başarılı
kopyanın kanıtları da korundu. Son geliştimeElectron 6 aile/offline/reload
ve eski deneme/timer/reset kabulü tekrar PASS; renderer 0.

Fiziksel Android, temiz kurulum/portable taşıma ve iki native sürümle
veri koruyan yükseltme NOT TESTED. Chromium emülasyonu fiziksel cihaz değildir.

---

# 0.9.2 yayımlandı — altı kaynaklı etkileşimli atölye

Uygulama kaynağı `9825e32960a712c81dcb6861c7386189d7a8d2ae` main'e gönderildi.
Vercel production `dpl_919iZQfVUcjyRKEM1cKN9g2ynykY` aynı kaynakta READY;
normal HTTPS version 0.9.2. Canlı index/sw/version SHA 256 değerleri kabul edilmiş
yerel derlemeyle birebir aynı. Temiz CI 43627576911 verify 126/101 PASS (5,1 dk);
[canlı43627628221](https://github.com/kaansavukduran/yksmania/actions/runs/43627628221)
aynı 9825 e 32 kaynağında 101/101 PASS (5,7 dk). CI 43627576911 dört iş de PASS:
verify, Windows, Linux, Android. Paketli Windows/Linux offline ders/not/kağıt,
soru taslağı/gerçek skor, yeniden başlatma, sınav snapshot/sonuç, timer ve reset
mevcut smoke akışları PASS; rendererErrors 0. Android APK build ve imza/manifest
komutları PASS. Bu fiziksel cihaz veya iki native sürüm geçişi değildir.
[Release43628665935](https://github.com/kaansavukduran/yksmania/actions/runs/43628665935)
PASS; [v0.9.2-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.9.2-alpha.1)
draft değil,8 asset:5 binary ve 3 kanıt. Başarılı 43627576911 main koşusunun
dosyaları yeniden derlenmedi. Tag ve verified-run aynı 9825 e 32 kaynağında;
indirilen iki kanıtın hash'i SHA 256 SUMS ile eşleşti,7 payload listesi mevcut.
Android versionName 0.9.2/code 17/v 2 signature PASS. Beş büyük binary ayrıca
yerelde indirilip hash'lenmedi. Kaynak/canlı/paket kabulünde açık doğrulanmış
kusur yok; fiziksel/native geçiş boşlukları aşağıda korunur.

Son teslim kaydı yalnız FORGE/README/CONTENT_COVERAGE/QA/RELEASE_ALPHA
dokümanlarını değiştirir; doğrulanan uygulama, test ve paket kaynağı 9825 e 32
aynıdır. Bu doküman değişikliği için uygulama testleri tekrar çalıştırılmadı.

Gerçek 0.9.1→0.9.2 web SW güncellemesi ayrı yerel origin/profilde PASS: normal
TLS ile eski production 42 dosyası/7 revision doğrulandı, uygulamanın kendi
Güncellemeleri kontrol et → Güncelle ve yeniden aç akışı yeni worker'ı etkinleştirdi.
Eski nükleik kimliği/not/tamamlanma, soru taslağı/notu, öğrenme+üç tekrar ve
ayarlar korundu. Sentetik eski 870 bayt PDF metadata/not/sayfa/byte eşitliği PASS;
bu tek legacy koşulu IDB'ye seed edildi, gerçek özel PDF kullanılmadı. Yeni
DNA/RNA modeli ilk kez offline açıldı;16 H bağı ve yeni not/keşif reload ile
korundu, XP 25→25, renderer 0. Yeni 53 manifest kaydı/51 tekil dosyada revision ve
finaldist byte farkı 0. Bu fiziksel/native yükseltme veya production profilinde
güncelleme değildir; eski favicon iki 404, gerekli dosyalarda eksik istek yok.

Başlangıç c4ab5ab75d2a71e3a98db7bfb5c8d32c08901512. Dünya Gücü Osmanlı,
kimyasal türler/Lewis, ısı–sıcaklık, nükleik asitler, iyonik bağ ve iyonik bileşik
adlandırma işlendi. Beş yeni anlatım eklendi; mevcut nükleik asitler kimliği
korunarak genişletildi. Altı rehberde 62 bölüm,31 çözümlü örnek,29 hatırlama
kontrolü ve 60 özgün beş seçenekli soru var. Önceki 240 sorunun kimliği, kökü,
seçenekleri, cevabı ve metni değişmedi. Toplam 66 anlatım/38 ayrıntılı rehber/
69 yerleşik kağıt/300 özgün soru; doğrulanmış sıranın ilk 58/479 başlığı hazır.
Sıradaki eksik başlık59: kovalent bağ, polar ve apolar bağ (`detail-155`).
Tüm Drive arşivi veya tam resmî dağılımlı denemeler tamamlandı iddiası yok.

Yedi tarih olayı/kanıt karşılaştırması,11 Lewis türü/elektron bütçesi,
enerji koruyan ısıl temas ve sıcaklık–enerji grafiği, DNA/RNA yapımı ve gerçek
bağ sayıları, iyon adedi/yük dengesi ve adım adım adlandırma modelleri eklendi.
Keşifler ayrı kaydolur; notlar/öğrenme/1–3–7–21 tekrarları korunur ve keşif
XP, ustalık veya tamamlanma sayılmaz. Nükleik asitler eski not anahtarı korunur.
Kaynak sayfa sınırları ve bilimsel düzeltmeler docs/SOURCE_REVIEW.md içinde.
AIONIA ana standardı canlı v 1.7 ile karşılaştırıldı; logolar ve 32 karelik Aion
paftası değişmedi. k 44/Aionlaştır/aionia bu görevde etkinleştirilmedi.

İlk check/build ve 126 birim PASS. İlk odaklı browser 11/12: yalnız ısı atölyesi
320 px UI 200/text 150 koşulunda client 270/scroll 272. YKS-030/Düşük: range
kontrolünün UA yatay 2 px marjı kaldırıldı; aynı durumda 270/270. Kesme, font
küçültme veya kabul toleransı değişimi yok. YKS-031/Düşük: Lewis sıfırlama ve
ısı seçim/tahmin düğmeleri ortak düğme sınıflarına alındı. Gerçek 320 px büyük
yazıda tahmin eyleminin kelime ortasından kırılması, yalnız bu düğmenin yatay
boşluğu uyarlanarak düzeltildi;45 px metin korunur. Son derleme/kabul ve uzak
yayın sonuçları bu bölümün başında kaydedildi.

Yerel tam 101/101 browser PASS (6,8 dk); son yalnız tahmin düğmesi yatay boşluğu
ve sürüm notu derlemesinde check/build,126/126 unit ve yeni kaynakların 12/12
browser kabulü tekrar PASS (55,3 s). Yeni kelime genişliği regresyonu da PASS;
320 px UI 200/text 150 koşulunda font küçültülmeden bütün kelimeler sığar.
Temiz uzak kurulumun tam 101 kabulü ve dört paket/verify işi de yukarıda PASS.

Son kopyalanmış derlemede 17 manuel ölçüm PASS, renderer 0: ısı 270/270 ve tahmin
düğmesinde 222 px metin alanına 202,54 px en uzun kelime sığar;45 px font korunur.
Lewis sıfırlama beş boyutta CO₂ adım 4→1, C 8→0, bağ 0 olarak gerçek tıklandı.
44 değişen/yeni metin yolunda 8.845 özel Drive kimliği ve URL’si 0 eşleşme;
özel PDF/binary/anahtar veya değişen marka varlığı yok. Kilitte 752 ortak
bağımlılık kaydı birebir aynı, yalnız iki kök sürüm alanı 0.9.2 değişti.

İlk manuel inceleme altı modelde 30 görünüm/durum: masaüstü koyu/açık,390 px,
320 px büyük yazı ve 844 px yatay. Belge yatay taşması yok; ısıdaki 2 px iç taşma
yukarıdaki onarımla giderildi. Nükleik alt zincir/yönleri HTML olarak da okunur;
termometre üst etiketi gösterdiği ölçekle 100°C olarak eşleşir. Fiziksel Android,
temiz kurulum/portable taşıma ve iki native sürümle yükseltme NOT TESTED.

---

# 0.9.1 yayımlandı — doğrulanmış teslim

Uygulama kodu12e7431d3576fd3a1244cbab1f38a1b8c1726b5b; paket kaynağı
`e1b8150c4ff077716c9043b06241fc7af294cb06`. Sonraki cc88e28 yalnız test ölçümü
ve bu kayıt dosyasını değiştirir; uygulama dosyaları aynıdır.
[CI43622440349](https://github.com/kaansavukduran/yksmania/actions/runs/43622440349)
96 birim/89 browser ve Windows/Linux/Android dört iş PASS. Yeni ölçümle son
CI 43623231137 verify 96/89 PASS; teslim paketleri önceki tamamen başarılı
43622440349 koşusundan yeniden derlenmeden yayımlandı.
[Canlı43623257610](https://github.com/kaansavukduran/yksmania/actions/runs/43623257610)
cc 88 e 28 kaynağında 89/89 PASS (5,2 dk). İlk iki public 88/89 nedenleri aşağıda
korunur; beklenti, timeout veya uygulama davranışı gevşetilmedi.

Vercel production dpl_6 DTrXJDaHQFmYd 3 FXnFpXCCKYtUW/cc 88 e 28 READY; version 0.9.1.
Canlı index/sw/version hash’leri kabul edilmiş yerel derlemeyle birebir aynı.
[Release43623370247](https://github.com/kaansavukduran/yksmania/actions/runs/43623370247)
PASS; [v0.9.1-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.9.1-alpha.1)
draft değil,8 asset:5 binary ve 3 kanıt. Tag ve verified-run aynı başarılı e 1 b 8150
main kaynağında. İndirilen iki kanıt hash’i eşleşti;7 payload listesi mevcut.
Android 0.9.1/code 16/v 2 signature PASS. Beş büyük binary ayrıca yerelde hash’lenmedi.
Paketli Windows/Linux offline/yeniden başlatma/sınav/timer/not/reset mevcut
smoke akışları PASS. Fiziksel Android, temiz kurulum, portable taşıma ve iki
native sürümle güncelleme NOT TESTED. Yeni görseller 390/1440 px incelendi;
yeni modeller 320 px UI 200/text 150, az hareket ve ciddi/kritik axe kabulü PASS.

61 anlatım/32 rehber/64 kağıt/240 özgün soru;4 yeni rehberde 24 açıklama bölümü,
12 çözümlü örnek ve 12 recall. İlk 50/479 hazır. Karma 90 TYT/25 AYT ve 11 branş;
tam resmî dağılım veya bütün Drive arşivi tamamlandı iddiası yok. Son kullanıcı
kararıyla logolar değişmedi, öğrenci materyal yüklemez. Sıradaki eksik başlıklar:
51 Dünya Gücü Osmanlı,52 kimyasal türler/Lewis,53 ısı–sıcaklık,54 nükleik asitler.
55 ATP mevcut; yeni kaynak işleme bu sıradan sürdürülmeli.

---

# 0.9.1 — dört periyodik kimya konusu

Son CI 43622440349 verify 96 unit/89 browser PASS. İlk public 43621890680 aynı
save-onayı yarışında 88/89; ikinci 43622465069 yeni konular PASS, eski YKS-006
not sınırında 88/89 (beklenen 908,59375, ölçülen 907,59375). İki viewport rect
ayrı zamanlarda ölçülüyordu; theory/notes/layout ve question/note tek DOM
örneğinde ölçülür. Sıfır toleranslı not-altında koşulu aynıdır. Aynı YKS-006
1440/1280/1024/390/320 senaryosu yerelde PASS. Trace artefact indirmesi 403 ile
engellendi; konsol kanıtı saklandı, CSS normal akışta 20 px note marjı içeriyor.
Uygulama veya CSS değiştirilmedi; yeni public kabul gerekir.


İlk uzak CI 43621833448:96 unit/check/build PASS, browser 88/89. Yeni
periodic-depth testi gerekçe görünür olur olmaz reload yaptı; Provider update
optimistic, IDB kaydı henüz bitmemişti. Test görünür .save-status kaydedildi
onayını bekler; aynı seçim+gerekçe offline koruma koşulu tutulur. Ürün davranışı
ve timeout değiştirilmedi. Onarım sonrası aynı 2 test yerelde PASS; yeni CI gerekir.


Başlangıç cfe0db0da56ee343db4da1a4c408ff7fb8ab9199. Son kullanıcı düzeltmesiyle
ikonlar aynen korundu; k 44/Aionlaştır/aionia komutları bu tur etkinleştirilmedi.
MEBİ TYT Kimya basılı 30–34 canlı metni ve Aurelia 010–013 kağıtları s.2–3 okundu.
Sınıflandırma, atom çapı, İE, Eİ/EN/metalik karakter:4 ders,24 açıklama bölümü,
12 çözümlü örnek,12 recall,20 özgün soru;4 yerleşik kağıt otomatik türedi.
Toplam 61/32/64/240; ilk 50/479 kaynak başlığı hazır. Kimya branş seti yeni konuları
sırayla örnekler; önceki kayıtlı sınavların snapshot’ları değiştirilmez. Dört
model 13 durumu kanıt/süreç/bağıl yarıçap/enerji sütunlarıyla gösterir. Keşifler
ayrı kayıtlıdır, XP veya tamamlanma oluşturmaz. Tüm arşiv tamamlandı iddiası yok.

Check/build ve 96 birim PASS. Yeni iki browser testi PASS:4 dersin normal giriş,
model değişimi/gerekçe, offline reload kalıcılığı;320 px UI 200/text 150/reduced
motion/klavye ve ciddi/kritik axe. Gerçek 390/1440 görüntüleri incelendi;96 unit
ve ilk 50 başlık sürekliliği PASS. Tam 89/89 browser PASS (5,5 dk). Yerel kanıt dizini:
/workspace/work/forge-periodic. Paket/canlı sonuçları tamamlanınca eklenecek.

Sürüm npm version ile güncellendi; bağımlılık kilidinde yalnız iki kök sürüm
alanı değişti. Özel kaynak kimliği/PDF/indirilen içerik depoya eklenmedi.

---

# 0.9.0 — Vercel ve indirilebilir paketler yayımlandı

[Canlı43613106471](https://github.com/kaansavukduran/yksmania/actions/runs/43613106471)
87/87 PASS (5,0 dk), normal production HTTPS üzerinde. Test kaynağı eb 188 d 6,
uygulama kaynağı b 92 b 2 b 5 ile aynı; aradaki fark yalnız teslim dokümanları.
Yerel 87, temiz CI 87 ve canlı 87 ayrı ayrı PASS. Üç runtime hash'i yerel/canlı
birebir eşleşir. İçerik 57 anlatım/28 ayrıntılı rehber/60 kağıt/220 özgün soru;
sıranın ilk 45/479 başlığı hazır. Bütün arşiv veya tam resmî dağılımlı denemeler
tamamlanmış değildir. Fiziksel/native geçiş boşlukları aşağıda korunur.

Son Vercel kontrolünde GitHub kaynaklı production dağıtımı
`dpl_HVAerBa5W5bAocHakgZqKwM5e6X6`/da4c2ec58eaf0c7fea0b00b447c806b8bbb38f8d
READY bulundu; HTTPS version.json 0.9.0. index.html, sw.js ve version.json
SHA-256 değerleri kabul edilmiş yerel derlemeyle birebir aynı. Manuel API'nin
önceki kota hatası uygulamanın GitHub bağlantılı dağıtımını engellemiş görünmüyor;
kota kalktı diye varsayılmaz. Yeni canlı 87 test kabulü 43613106471 PASS.

[0.9.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.9.0-alpha.1)
yayımlandı, draft değil. [Release43612877695](https://github.com/kaansavukduran/yksmania/actions/runs/43612877695)
PASS; başarılı CI 43611757852'nin mevcut 5 binary'si yeniden derlenmeden alındı:
Windows Setup/Portable, Linux AppImage/DEB, Android debug APK; üç kanıtla 8 asset.
Tag ve verified-run.json aynı b 92 b 2 b 5 başarılı main kaynağını gösterir.
İndirilen Android-verification.txt ve verified-run.json iki hash'i SHA 256 SUMS ile
eşleşti; liste 7 payload içerir. Android code 15/name 0.9.0/v 2 signature PASS.
Beş büyük binary ayrıca yerelde indirilip hash'lenmedi. Son kayıt commit'leri
yalnız dört teslim dokümanını değiştirir; kabul edilen runtime hash'leri aynıdır.
Son normal TLS canlı version.json kontrolü 0.9.0; gerçek dağıtım yukarıda doğrulandı.

Doğrulanan uygulama/paket kaynağı `b92b2b52be5f5a08b9238b565f73b6998481b65a`.
[CI43611757852](https://github.com/kaansavukduran/yksmania/actions/runs/43611757852)
tamamı PASS: temiz npm ci, check/build,94 birim,87/87 browser (4,2 dk),
Windows/Linux/Android. Windows ve Linux paketlenmiş uygulamalarında ders,
rehber/kağıt/not, paragraf taslağı, bugünkü gerçek skor, offline/süreç yeniden
başlatma, kum saati/deadline, exam snapshot/sonuç ve reset PASS; rendererErrors 0.
Android APK üretimi ve imza/manifest komutları PASS. Bu fiziksel cihaz veya
temiz Windows kurulumu/portable taşıma/native sürümler arası geçiş değildir.
YKS-023–029 ve önceki ilgili regresyonlar PASS; kapsamda açık doğrulanmış kusur yok.

Yerel gerçek 0.8→0.9 SW geçişi ayrıca PASS: eski canlı 0.8 index/sw/version üç
hash'i önceki kabul ile birebir eşleşti;228 asset indirildi,196 revision doğrulandı.
Eski uygulamanın gerçek Ayarlar güncelleme düğmesiyle yeni kopya aktive edildi.
Paragraf A taslağı/notu, açık tema/UI 115/yazı 110, önceki öğrenme kayıtları ve
sentetik 870 bayt PDF metadata+byte'ları tam korundu. Yeni yerleşik kağıt ilk kez
offline açıldı; reload/taslak devam PASS, renderer 0. Bu izole yerel web kabulüdür.
İlk önkoşul NOT TESTED kaydı, eski canlı build indirildikten sonra bu PASS ile
aşıldı. İlk harness'in iki meşru güncelleme düğmesini eşleştiren seçici hatası
saklandı; Settings içindeki gerçek düğme seçildi, ürün/test şartı zayıflatılmadı.

**İlk manuel dağıtım engeli:** Git kaynaklı API production talebi HTTP 402,
`api-deployments-free-per-day`/günlük100, retryAfter86400 verdi; yerel CLI yoktu.
İlk kontrolde eski dağıtım dpl_bpyVHjvmsFLKFWVditzEZYtBmTpe/ead 659 b 0.8.0 idi.
Sonraki normal TLS kontrolü 0.9.0'ı gösterdi; metadata GitHub da 4 c 2 ec production
READY ve üç runtime hash eşitliğiyle doğrulandı. İlk BLOCKED kaydı geçmiş
kanıttır; Vercel 0.9 güncel durumu READY. Yeni proje/plan/hesap değişimi veya
arka plan zamanlama yapılmadı. Canlı kabul ayrıca yukarıda kaydedilir.
0.9 paket yayını başarılı CI'nin mevcut dosyalarını yeniden derlemeden kullandı.

İlk uzak CI 43611497875 npm ci sırasında source-map-0.9.0 için 404 verdi.
YKS-029/Kritik: uygulama sürümü metin değişimi kilitteki iki bağımlılık sürümünü
ve üç aralık kaydını da değiştirmişti; mevcut node_modules ile yerel build bunu
yakalamadı. PDF.js kaldırılması dışındaki tüm ortak dependency kayıtları 0.8
tabanından birebir geri alındı; uygulama sürümü 0.9.0 kaldı. Boş ayrı npm cache ile
gerçek npm ci 680 paketi 16 s’de kurdu, PASS. Check/unit/build temiz kurulumdan sonra
yeniden uygulanır; yeni başarılı tüm-platform CI olmadan paket yayımlanmaz.

Son kaynak derlemesi: check, 94/94 unit ve 87/87 Chromium browser PASS (5,5 dk).
YKS-023–028 kabul koşulları ve önceki ilgili regresyonlar geçti; hazırlanmamış
paketlerin aramada boş kart üretmesi de giderildi. Ayrı exam kabulü 4/4 PASS.
Son yerel Electron akışı PASS, rendererErrors 0. Normal/büyük yazı, koyu/açık
tema, 320/844/1440 px ve çevrimdışı akışlar gerçek DOM/görüntü ile sınandı.
Altı yeni React bileşeninde hook/cleanup/kayıt/odak incelemesi yeni kusur bulmadı.
16 ulaşılabilir rotada akademik yükleme kontrolü yok; kişisel JSON yedeği ayrı.
294 değişen yolun gizlilik incelemesi: 8.845 özel kaynak kimliğiyle 0 eşleşme,
özel PDF/indirme URL’si/anahtar veya kapsam dışı dosya yok. PDF.js varlıkları silindi.
İlk son-kabul başlatması sistem Chromium yolu verilmediğinden tarayıcıyı açamadı;
bu ortam hatası saklandı, aynı 87 test doğru kurulu Chromium ile eksiksiz geçti.
Kabul kanıtları: `/workspace/work/forge-090/{check-final,unit-final,build-accepted,
browser-accepted,native-final,exams-focused-accepted}.log`; erişilebilir rota,
mahremiyet ve piksel sınırı JSON kayıtları aynı özel çalışma dizinindedir.
CI, canlı Vercel ve yeni paket sonuçları bu kaydın başında ayrıca gösterilir.

Başlangıç `ead659b153aef689bf689d56b0343dd57e49376b`, forge/in-depth-learning;
fetch/remote uç karşılaştırması yapıldı. Kullanıcının son talimatı önceki kaynak
ithali/inlinekağıt kararını değiştirdi: öğrenci materyal sağlamaz. Akademik
PDF/katalog arayüzü, eski Library/SourceList/TopicCheatsheet/Reader kaldırıldı.
Kaynaklar özgün yerleşik öğretime dönüştürüldü. Eski IDB dosyaları/notları ve
kişisel ilerleme JSON geri yükleme korunur. Eski/sources ve/library hazır dersleri
sunar. Kopya Kağıtları menüde ayrı; Sınavlar Sorular'ın altındadır.

57 anlatım,28 derin rehber,60 yerleşik kağıt,220 özgün soru.28 rehber dışında
kalan hazır anlatımlar kaynaklı, aşamalı vaka/kanıt çalışmalarıdır. Önceki 8 kısa
başlangıç dersi gerçek kaynaklarla genişletildi. Ses/yapı, çarpanlara ve üç
Osmanlı başlığı yeni model/öğretim aldı.105 yeni soru eklendi, eski 115 soru ve
cevapları sabit fixture ile korunur. Eski çarpanlara 5'lik set aynıdır; ileri 10
ayrı soru paketidir, anlatım/kağıt sayısını şişirmez. Soru paketinin zengin kağıdı
ezme riski odaklı regresyonla engellendi. Sekiz eski ÖSYM referansı için sekiz
bağımsız özgün öğretim varyantı yerleşiktir; resmî sorunun birebir kopyası değildir.
İlk 45/479 sıra başlığı hazırdır,46 kimyadaki Elementlerin sınıflandırılmasıdır.
Osmanlı medeniyeti ayrı sonraki başlık; ilk 46 hazır diye sayılmaz. Bütün arşiv,
126 özel kağıdın tüm ayrıntıları ve 20 yıllık ÖSYM taraması hazır değildir.

Denemeler: TYT karma 90, AYT Sayısal 25,11 branş. TYT 120/165 dk ve AYT 80/180 dk
oranından süre; tam 120/80 resmî dağılım diye sunulmaz. Kayıtlı soru/anahtar/
metin snapshot, cevap/boş/flag ve son zaman; offline/süreç yeniden başlatma;
yan ekran veya açılışta expiry, açık onaylı erken bitir, doğru/yanlış/boş/net
ve tam özgün açıklamalar. Sonuçlar deneme geçmişinde ayrıdır, XP veya teori
ustalığı oluşturmaz. Yazma hatasında yanlış başarı yok; globalRetry sonrası
expiry bir kez yeniden denenir, her 500 ms tekrarlanan yazma hatası üretilmez.
Aynı set tekrar edilebilir; rastgele yeni tam deneme üretildiği iddiası yok.

Unslop/Fragaria/Yazılım Denetle uygulandı, canlı AIONIA v 1.7 okundu. Onaylı 32 kare
Aion atlası değişmedi.94 birim + check/build PASS. İlk tam browser 79/85; altı
hatanın beşi yeni testlerin seçici/başlatma/DOM metin örneklemesi uyumsuzluğu,
biri aşağıdaki yeni exam taşması. Beklentiler zayıflatılmadan düzeltildi:
Theoryselector yanlışlıkla.cheatsheet-topic olmuştu; rehber h 2 içinde model h 2
vardı; innerText/textContent blok boşluğu farkı; Provider açılmadan menü kontrolü;
açgözlü PDF.*ekle regex'inin örnekler kelimesini eşleştirmesi. Gerçek yükleme
kontrolü/girdi yokluğu, içerik/odak/not/offline sonuç denetimleri korunur.

YKS-023 (Orta):320 px UI%200/yazı%150 Türkçe deneme başlığı 313 px metinle belgeyi
325 px yaptı. Scoped h 1 wrap, font korunur; aynı yeni gerçek UI testi tekrar edilir.
YKS-024 (Orta): aynı ölçeklerde yerel dialog UAmaxwidth hem reset hem sınav bitir
penceresini 224 px'e sıkıştırdı; yatay içerik 309/321 px. Yazar maxwidth/copywrap/
kontrollü padding ile 288 px dialog,286 px içerik; tanı ölçümü yatay taşma 0.
YKS-025 (Orta): TYT 2:03:45 saati+ikon 331 px belge oluşturdu. İkon/etiket ayrı,
sayaç tam satır ve gerekirse saat sonrası<wbr>; metin ve font korunur. Tanı 320 px.
40 normal/büyük ölçek koyu/açık görüntüsü, gerçek DOM ölçümleri ve emüle touch
alındı; son derlemede aynı ölçümler/testler tekrar edilecektir.

Yerel Electron tüm offline ders/rehber/kağıt/not, soru taslağı, saat, exam snapshot
ve deadline ile süreç yeniden başlatma, sonuç/reset akışları PASS; renderer 0.
Bu ilk sonuç yeni CSS onarımı öncesidir; son paket/canlı sonuç ayrıca eklenecek.
Native fiziksel Android, temiz Windows kurulumu/portable taşıma ve iki native
paket arasında yükseltme NOT TESTED. İlk 0.8 veri/PDF baytlarını gizli koruma testi
korunur. Root ve altı iş kolu kaynak/uygulama/denetimi paylaşılmış dosyalarda
çakışmadan yaptı; kaynak okuma sınırları SOURCE_REVIEW.md'de.

Sonraki tam browser 85/86 PASS; aynı exam testinde sonuç tablosunun klavyeyle
kaydırılamadığı doğrulandı (YKS-028/Orta). Tabindex 0 ve adlandırılmış bölge,
gerçek ArrowRight ile scrollLeft>0 kabulü eklendi. YKS-026/Orta: yeni elektrik
alan tanımında F'nin elektriksel kuvvet olduğu açıklandı; net kuvvet değil.
Sekiz fizik örneği bağımsız olarak tekrar hesaplandı. YKS-027/Düşük: soru-only
paket Theoryaramasında boş subjectkartı üretiyordu; mode-aware arama ve memo
bağımlılığı düzeltildi. Aynı görünür kart yokluğu testi onarım öncesi FAIL;
yeni build'de ve son tam kabulde tekrar çalıştırılacak. Son CSS gerçekten
320/844/1440 px'de yeniden render edilerek ölçüldü: dialog 288 px, yatay scroll 0;
sayaç ve belge 320 px, renderer 0. Yerel native son akışlar tekrar PASS.

Kanıt/work/forge-090: check-final,unit-final,build-final,browser-full,native.log;
exams-focused.log,manual-ui.json, görseller ve geometryJSON kayıtları. Son tam
kabul/CI/yayın sonucu bu kaydın üstüne eklenecek. PDF.js ve 200 gereksiz font
varlığı paketten kaldırıldı; ilk hazır asset cache 13,1 MiB'den 8,65 MiB'ye indi.

---

# 0.8.0 yayımlandı — güncel teslim kaydı

Teslim/paket kaynağı `b08c9c118b6ac16c73f53ae55ccfb78a26e0c281`.
Uygulama değişikliği `8df0d255b90247614ac67f37f120f3cf42200a62`; sonraki commit
native kabulün beklemelerini ve public iz kaydını güçlendirir, uygulamayı değiştirmez.
[CI43601785473](https://github.com/kaansavukduran/yksmania/actions/runs/43601785473)
72 birim, check/build,73/73 browser ve Windows/Linux/Android işlerinin hepsinde PASS.
Paketlenmiş Windows ve Linux: offline ders, not/taslak/PDF, reload/süreç yeniden
başlatma, kayıtlı kum saati deadline eşitliği, pause ve ilerleme sıfırlama PASS;
her iki platformda gözlenen rendererErrors 0. Android code 14 / name 0.8.0 / v 2
imza PASS. Bu, fiziksel Android veya temiz kurulum testi değildir.

[Canlı43601821513](https://github.com/kaansavukduran/yksmania/actions/runs/43601821513)
aynı kaynakta 73/73 PASS (6,2 dk); ilk offline PDF 11,1 s ve yeni üç timer/reset kabulü
PASS. Önceki public 72/73 koşusunun ilk PDF 30 s hatası kayıtta korundu; tekrar
aynı koşullarda üretilmedi, PDF kodu veya timeout değiştirilmedi. Ayrı yerel
izde ilk cache hazırlığı 26,722 s, offline canvas 0,873 s ölçüldü; bu tanı koşusu
sandbox TLS istisnasıyla yapıldığı için sıkı public CI kabulünün yerine sayılmaz.
İlk iki native denemenin 20:00/19:… sorunu, testin gerçek azalmayı/pause sonucunu
beklemesi ve kayıtlı son zamanı süreçler arasında birebir karşılaştırmasıyla
çözüldü; aynı kalan süre kabulü iki paketli platformda PASS. Ürün süresi
sahte sonuçla değiştirilmedi, test atlanmadı, kabul sınırı genişletilmedi.

Vercel production `dpl_EpWKp4zqSgcWQKKuHuRPZNCDshE3` READY; canlı version.json0.8.0.
Test edilen yerel build ile index.html, sw.js ve version.json SHA-256 değerleri
birebir eşleşir. Son kayıt dokümanlarının dağıtımı ayrıca kontrol edilecek.
[Release43602680263](https://github.com/kaansavukduran/yksmania/actions/runs/43602680263)
PASS; [v0.8.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.8.0-alpha.1)
yayımlandı, draft değil. Başarılı CI paketleri yeniden derlenmeden alındı:
Windows Setup/Portable, Linux AppImage/DEB, Android debug APK ve üç kanıt =8 asset.
İndirilen Android-verification.txt ve verified-run.json hash'leri SHA 256 SUMS ile
eşleşti. Verified-run doğru başarılı main kaynağını gösterir; hash listesi 7
payload içerir. Beş büyük binary ayrıca yerelde indirilip hash'lenmiş değildir.

Yeni çalışma kum saati varsayılan 5 dk; üstüne basınca ters dönüp başlar, durdur/
devam et ve alt köşe menüsünde 1/5/10/20 dk,1–120 dk özel sürgü/sayı girişi var.
Konu anlatımı, kopya kağıdı ve soru yollarında aynı yerel süre korunur; zamanı
bitirmek öğrenme veya XP üretmez. Ayarlar/Veri'de açık onaylı sıfırlama,
öğrenme kanıtlarını temizler; ayarlar, notlar, PDF ve sayfa konumları korunur.
Yazma hatası önceki ilerlemeyi/süreyi korur. Ders simgeleri ortak vektörlerdir;
TYT/AYT kökleri yukarıdadır, etiketler ve kart kenar boşlukları denetlendi.

YKS-021 (Orta):320 px UI%200/yazı%150 menüde 41 px alan,130,08 px dakika sözcüğünü
harf harf kırıyordu;248 px'e çıktı, aynı ölçüm PASS. YKS-022 (Orta): yeni reset
butonu belgeyi 346 px'e taşıyordu;320 px ve taşan öğe 0, aynı eski regresyon PASS.
YKS-006/008/010/013/014/015/016/018/019/020 ilgili kontrolleri son tam kabulde
PASS. Denetlenen bu kapsamda açık doğrulanmış kusur kalmadı; bütün ürün için
hatasızlık garantisi değildir. Geometri testinin iki ayrı zamandaki rect okuması
tek DOM örneklemine alındı; >=18 px sınırı korunarak 3/3 ve tam 73/73 PASS.

Kullanıcı görüntüsü 0.5.2 istemcisini ve bekleyen sürüm bildirimini gösterir.
Gerçek 0.5.3→0.8.0 web güncellemesi, yarım yanıt/not korunarak ve offline yeniden
açılarak PASS; eski padding 1→33 px, kökler üstte. Bu kullanıcı cihazına doğrudan
bağlanıldığı veya 0.5.2 yükseltmesinin birebir test edildiği anlamına gelmez.
Eski UI'da Ayarlar → Güncellemeler ve hakkında → Güncelle ve yeniden aç.
Yeni bildirimde bu eylem doğrudan görünür; kayıt bitmeden etkinleşmez.

Gerçek kapsam 54 anlatım /17 ayrıntılı rehber /115 özgün soru /8 ÖSYM referansı.
Selçuklu ve elektron katmanları eklendi; paragraf derinleştirildi. İlk 43/479
sıralı başlıkta anlatım hazırdır; bütün müfredat/20 yıllık arşiv hazır değildir.
Özel PDF/katalog/Drive kimlikleri yayımlanmadı. Fiziksel Android, temiz Windows
kurulumu, portable taşıma ve iki native paket arasında veri koruyan yükseltme
NOT TESTED. İki web build'iyle güncelleme bunlardan ayrı doğrulanmıştır.

Yerel kanıt /workspace/work/forge-080: ci-accepted.log, public-accepted.log,
release-evidence/, runtime-before-docs.json; başlangıç/onarım/görseller aşağıda.
Sonraki içerik sıra 44/detail-233 Osmanlı siyaseti,45/detail-234 askerler ve ordu;
kalan 9 kısa başlangıç anlatımını derinleştir. Yeni soru fazına geçmeden anlatım
önceliği ve 1/3/7/21 (+2,+6,+20) sözleşmesi korunur.

---

# 0.8.0 — paket ve canlı kabul izleme

İlk kaynak 8 df 0 d 25 CI 43600766700: verify 72 unit/73 browser PASS, Android PASS;
Windows ve Linux paketleri üretildi fakat yeni native timer testinin 19:…
beklentisi 20:00 okudu. Kapatmadan önce gerçek azalma beklenmesi, IDB bitiş
zamanının süreçler arasında birebir eşitliği ve duraklatmanın dayanıklı UI
sonucunun beklenmesi eklendi. Yerel native tekrar PASS, rendererErrors 0.
Aynı regex/gerçek kalan süre kabulü korunur; bekleme uzatılıp test atlanmaz.
Uygulama dosyaları bu düzeltmede değişmedi. Paket CI yeni kaynakta tekrarlanır.

İlk public 43600807364:72/73; ilk offline PDF canvas açılışında 30 s süre aşımı.
Diğer PDF/not/timer/sıfırlama ve yeni içerik denetimleri PASS. İlk koşuda iz
kapalı olduğundan sonuç ağ/geçici hata diye varsayılmaz; yeni public koşu
retain-on-failure trace tutacak. Yerel public deneme sandbox Chromium TLS
sertifika engeline takıldı; bu, public CI'nin PDF bulgusundan ayrı sınırdır.
Son başarılı test ve yayın kaydı bu başlığın üstüne eklenecek.

---

# 0.8.0 — son yerel kabul tamamlandı, yayın hazırlanıyor

72 birim, check/build ve son tam Chromium kabulü 73/73 PASS.
YKS-021 ve YKS-022 aynı başlangıç koşullarında düzeldi; bu kapsamda açık
kanıtlanmış kusur kalmadı. Geliştirme Electron offline/reload/süreç yeniden
başlatma/kum saati/sıfırlama PASS, rendererErrors 0. Bu sonuç paketlenmiş
Windows/Linux veya fiziksel Android testi değildir. İki gerçek web build'iyle
0.5.3→0.8.0 veri koruyan güncelleme ayrıca PASS; native yükseltme sayılmaz.
13 son görsel alındı, koyu/açık başlık, ağaç, model, reset ve büyük menü
incelendi. Menü metin alanı 41→248 px; Ayarlar belge 346→320 px, font ölçekleri
korundu. 47 değişen dosyada özel envanter kimliği/PDF yok. React denetiminde
yeni model lazy, sayaç güncellemeleri yerel, terminal kayıtlar dayanıklı,
effect/listener temizliği, erişilebilir adlar ve motion tercihleri kontrol edildi.
Kanıt: /workspace/work/forge-080/{check-final,unit-final,build-final,
full-browser-accepted,native-final,update-check-final,source-repeat}.log,
menu-width-final.log, reset-overflow-final.log ve visuals/.

54 anlatım /17 ayrıntılı rehber /115 özgün soru /8 doğrulanmış ÖSYM referansı.
İlk 43/479 başlık anlatıma hazır; bütün müfredat/20 yıllık arşiv hazır değildir.
Vercel, platform CI ve paket yayın sonucu bu başlığın üstüne ayrıca eklenecek.

---

# 0.8.0 — çalışma kum saati ve ilerleme denetimi, geliştirme kaydı

Başlangıç main ve çalışma dalı `7cfb5b7c0287f0a0d4730c5ce3b4c3792797a206`.
`git fetch --all` ve `ls-remote --heads` uç karşılaştırması tamamlandı.
Kullanıcının Unslop, Fragaria Unslop ve güncel aynı kimlikteki Yazılım Denetle
becerileri uygulandı; canlı AIONIA v 1.7 okundu. Atlas/karakter değişmedi.
Türkçe ve Windows/Linux/Android/web kararları korunur. Yeni kaynak ve test
sonuçları aşağıdadır; uzaktaki 0.8.0 dağıtım/paket sonucu henüz bu kayıtta
başarılı sayılmaz. Son teslim kanıtı bu başlığın üstüne eklenecek.

- Ortak kalıcı SVG kum saati: varsayılan 5 dk, tıklamayla ters dönüp başlatma,
  durdur/devam et, 1/5/10/20 dk ve 1–120 dk özel sürgü/sayı girişi. Çalışırken
  mutlak son zaman; durunca kalan süre. Her karede IDB yazılmaz. Girdi
  kilidi, başarısız yazmada eski süre ve görünür yeniden deneme; hareket azaltma.
- Ayarlar/Veri'de onaylı ilerleme sıfırlama. Bütün konu/soru/tekrar/taslak ve
  keşif kayıtları tek dayanıklı commit ile temizlenir; ayarlar/notlar/PDF'ler/
  PDF konumları korunur. Başarısız yazmada önceki öğrenme kaydı korunur.
- Ders simgeleri ortak Lucide vektörlerine taşındı; ağaç etiketleri çemberlerin
  altında, kenar boşlukları simetrik. TYT/AYT kökleri üstte kalır. Sıfır
  bankalı konu dalı artık 0 soru yerine Kaynak çalışması der. Güncelleme
  bildirimine kayıttan sonra uygulanabilen doğrudan düğme eklendi.
- Selçuklu Türkiyesi/detail-232 ve katman elektron dizilimi/detail-147 eklendi;
  paragraf özgün metni korunarak yedi bölüme ve dört çözümlü örneğe genişletildi.
  Kaynak sınırları SOURCE_REVIEW'de. 54 anlatım / 17 ayrıntılı rehber /
  115 özgün soru / 8 ÖSYM referansı. İlk 43 sıralı başlıkta anlatım var;
  bütün 479 veya son 20 yıllık arşiv tamamlandı iddiası yok.

Eski istemci: gerçek iki web build'iyle 0.5.3 → 0.8.0 güncelleme PASS.
Yarım paragraf yanıtı/not korunur; sonrasında offline yeniden açılır. Ağaç
kökleri yukarıdadır. Eski fallback padding x/y 1 px → güncel 33 px. Bu önceki
YKS-016 düzeltmesinin dağıtım regresyonudur; güncel 0.7'de yeniden üretilmiş
bir padding kusuru diye sayılmaz. Kullanıcı görüntüsü 0.5.2 ve bekleyen sürüm
bildirimi gösterir; kullanıcı cihazının durumu ayrıca doğrudan incelenmedi.
Eski UI: Ayarlar → Güncellemeler ve hakkında → Güncelle ve yeniden aç.
Bu web testi native paket yükseltme veya fiziksel cihaz testi değildir.

YKS-021 / Orta: yeni kum saati panelinde 320 px, UI%200/yazı%150 açık temada
iki sabit sütun ve rem padding, dakika sözcüğüne 41 px bırakıyordu; gerekli
kelime genişliği 130,08 px. Onarım öncesi ölçüm FAIL ve görüntü kanıtı var.
Otomatik sığan sütunlar ve ekrana göre sınırlı padding ile onarıldı; font
ölçekleri düşürülmez. Aynı ölçüm PASS:248 px alan >=130,08 px sözcük; root 32 px
ve text-scale 1,5 korunur. Son ölçüm/kabul sonucu teslim kaydında tamamlanır.
İlk çalışma denemesinde testin yanlış Gizle düğme adı düzeltilip aynı gerçek
Görüntüle düğmesiyle aç/kapat sınandı; ürün kusuru diye kaydedilmez. Node 24
JSON import hatası, e 2 e'de içerik modülü ithali kaldırılıp gerçek soru akışıyla
çözüldü. Beklenti azaltılmadı. Bütün bankalı sorular ve metin regresyonları korunur.

İlk check/build ve 72 birim PASS. Odaklı 7/7 ve geliştirme Electron offline /
kapanış-açılış/kum saati/sıfırlama PASS; rendererErrors 0. 13 koyu/açık ve
320 px büyük ölçek görüntüsü alındı; ilk inceleme YKS-021'i ortaya çıkardı.
Son UI onarımı sonrası tam test, görsel ve platform sonuçları ayrıca eklenecek.
Kanıtlar /workspace/work/forge-080 içindedir; özel kaynaklar Git dışında.
İlk 45 değişen dosyada envanter kimliği ve eklenen PDF kontrolü: sıfır eşleşme.
İlk tam browser koşusu 71/73: YKS-021 ve YKS-022 FAIL; onarımlardan sonra
aynı testler ve son tam kabul tekrar çalıştırılır. İkinci tam koşu 72/73:
YKS-021/022 ve diğer bütün ürün akışları PASS; yeni geometri testinde
kaymakta olan sayfanın iki ayrı zamandaki rect'leri karşılaştırılmıştı.
Ölçümler tek DOM değerlendirmesine alındı; aynı >=18 px kabulü korunarak 3/3
tekrar PASS. Son tam koşu bundan sonra yeniden başlatıldı.

YKS-022 / Orta: yeni Ayarlar sıfırlama düğmesi 320 px UI%200/yazı%150'de
kendi kartını aşıp belge genişliğini 346 px yapıyordu. Eski mevcut plan/ayarlar
regresyonu FAIL; DOM geometrisiyle tek taşan öğe doğrulandı. Düğmenin dekoratif
ikonu kaldırıldı, genişliği kartla ve iç boşluğu ekranla sınırlandı. Ölçekler
korunur; son aynı regresyon PASS; belge genişliği 320 px ve taşan öğe 0.

Sonraki içerik: sıra 44/detail-233 Osmanlı siyaseti, sıra 45/detail-234 askerler
ve ordu. Kalan dokuz kısa başlangıç anlatımını kapsamlı rehbere dönüştür.

---

# 0.7.0 yayımlandı — güncel teslim kaydı

Uygulama/paket kaynağı: `d88f332d0ec14d40a5241108e1716690973fb95b`.
[CI 43594722140](https://github.com/kaansavukduran/yksmania/actions/runs/43594722140)
67 birim / 69 tarayıcı ve Windows, Linux, Android işlerinin tamamında PASS.
Paketlenmiş Windows/Linux: yeni cebir rehberleri ve offline reload dahil
normal ders → kayıt → yeniden yükleme → süreç yeniden başlatma akışları PASS;
her iki platformda rendererErrors 0. APK code 13 / name 0.7.0 / v 2 imza PASS.

[Canlı kabul 43594788583](https://github.com/kaansavukduran/yksmania/actions/runs/43594788583)
aynı kaynakta 69/69 PASS (4,9 dk). Vercel production
`dpl_47uB8RaPw1qJfe1LpUqi9pHoCu8x` READY; canlı version.json 0.7.0 doğrulandı.
[Release 43595550431](https://github.com/kaansavukduran/yksmania/actions/runs/43595550431)
PASS; [v0.7.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.7.0-alpha.1)
yayımlandı. Başarılı CI paketleri yeniden derlenmeden alındı: Windows Setup ve
Portable, Linux AppImage ve DEB, Android debug APK; üç kanıtla toplam 8 asset.
İndirilen iki kanıt dosyasının SHA-256 değerleri yayın listesiyle eşleşti;
verified-run kaynağı aynı commit ve başarılı main koşusu. Beş büyük binary
ayrıca yerelde yeniden indirilip hash'lenmiş değildir.

YKS-018/019/020 onarımları aynı başlangıç senaryolarında ve son tam kabulde PASS.
Denetlenen bu kapsamda açık doğrulanmış kusur kalmadı. Önceki şikâyetlerin
regresyonları korundu; bu sonuç bütün ürün için hatasızlık garantisi değildir.
Fiziksel Android, temiz Windows kurulum/portable taşıma ve iki sürüm arasında
veri koruyan güncelleme NOT TESTED. Yerel/donanım/paket sonuçları birbirinden
ayrıdır; özel PDF ve Drive kimlikleri public pakete eklenmez.

Gerçek içerik kapsamı: 52 anlatım, bunların 15'i ayrıntılı rehber; 115 özgün soru,
8 doğrulanmış ÖSYM referansı. İlk 41 çalışma sırası başlığı anlatıma açılır;
479 başlığın tamamı ve bütün 20 yıllık ÖSYM arşivi henüz hazır değildir.
Sonraki içerik sırası ve yerel başlangıç/onarım kanıtı aşağıdadır.

---

# 0.7.0 — konu derinliği ve denetim, yerel doğrulama tamamlandı

Başlangıç main: `730b37297fda2fcde70c838bb96c021119b442be`; remote fetch ve
uç karşılaştırması yapıldı. Kullanıcının Unslop / Fragaria Unslop / Denetle
isteği uygulandı; Denetle aynı beceri kimliğinde güncel Yazılım Denetle adıyla
bulundu. Canlı AIONIA standardı v 1.7 yeniden okundu. Varlık, karakter ve atlas
değişmedi; Türkçe, Win/Linux/Android/web kapsamı ve mevcut kayıt şeması korunur.

52 anlatım / 15 ayrıntılı rehber / 115 özgün banka sorusu / 8 ÖSYM referansı.
Yedi mevcut anlatım genişletildi: temel kavramlar, tek–çift/işaret, ardışık,
asal, faktöriyel, hücre, periyodik sistem. İki yeni kapsamlı anlatım ve vektör
model eklendi: birinci dereceden denklemler detail-203 ve basit eşitsizlikler
detail-204. İlk 41 kaynak sırası başlığı artık anlatıma açılır. Açıklamalar,
koşullar, karşı örnekler, adım adım çözümler ve hatırlama içerir. Kaynak sayfa
kapsamı docs/SOURCE_REVIEW.md'de. Bütün 479 anlatım/20 yıllık ÖSYM arşivi hazır
iddiası yok; bu turda yeni resmî soru eklenmedi. Özel PDF/katalog/kimlik yok.

Doğrulanan kusurlar: YKS-018 (Orta) yuvarlanmış kesirde yanlış kesin eşitlik;
YKS-019 (Düşük) içindekiler geçişinde klavye odağının geride kalması;
YKS-020 (Orta) 320 px %200 UI/%150 yazıda rem boşlukların okuma alanını daraltması.
Üçü de onarım öncesi FAIL ile kanıtlandı. İlk ikisi paylaşılan gösterim/gezinmede;
üçüncüsü küçük ekranın ana içerik, ders/soru ve model yan boşluklarında düzeltildi.
Gerçek 320 px viewport'ta okunabilir alan 144,8→250 px; root font 32 px ve text-scale
1,5 korunur. Yeni modelin tanımsız renk token'ı mevcut accent ile düzeltildi.

Yerel PASS: check/build (94 çakışmasız modül), 67 birim, son tam 69/69 Chromium
kabulü. Önceki YKS-006/007/008/009/010/013/014/015/016/017 ilgili denetimleri
korunur. İlk 69/69 koşusundan sonra görsel genişlik bulgusu geldi; bu nedenle
son CSS düzeltmesinden sonra tam koşu tekrarlandı. Rehber gezinmesi testinin
ilk 4/5 koşusundaki anlık DOM okuması, seçilen gerçek h 1 beklenerek düzeltildi;
beklenti azaltılmadan üç tekrar 3/3 ve son tam koşu PASS.

Linux geliştirme Electron: yeni cebir, çevrimdışı yeniden yükleme, süreç yeniden
başlatma, paragraf taslağı ve günlük skor kontrolleri PASS; rendererErrors 0.
Bu yerel çalışma paketlenmiş Windows/Linux veya fiziksel Android testi değildir.
22 model/çözüm görüntüsü koyu/açık 1440 px, 320 px ve 768 px büyük ölçekte alındı;
temsilci görüntüler incelendi. Gerçek 320 px viewport ayrıca kontrol edildi.
Uzun element screenshot'larında görülen sabit skip-link artifaktı normal viewport
ile karşılaştırıldı: odaksız bağlantı ekranın dışında (-320…-199 px); canlı bir
örtme hatası değildir. Testler normal giriş, gerçek emüle tap, yatay geçiş,
PDF/not/tekrar korunması ve ciddi/kritik axe kontrollerini içerir.

Kanıtlar yerel /workspace/work/forge-061 içindedir: baseline-audit.log,
baseline-readable-width.log, unit-final.log, full-browser-final.log,
guide-navigation-repeat.log, native-final.log, viewport-check.log ve visuals/.
Git'e özel kaynak dosyası ve envanter kimliği girmediği 35 değişen dosyada kontrol
edildi. İndirme/production/paket CI sonucu aşağıdaki yayın kaydına eklenecek;
0.7.0 paketleri henüz bu yerel kayıtta yayımlandı sayılmaz.

Sonraki içerik: kalan 10 kısa başlangıç anlatımını aynı derinliğe çıkar; yeni
kaynak sırası 42/detail-232 Selçuklu, 43/detail-147 Katman elektron dizilimi,
44/detail-233 Osmanlı siyaseti. Şimdiki periyodik rehberin bu başlıkları kısmen
anlatması otomatik ayrı konu tamamlanması sağlamaz. Yeni soru bankası fazına
geçmeden anlatım önceliğini ve 1/3/7/21 ilkesini koru.

---

# 0.6.0 teslimi — doğrulanan güncel durum

Uygulama ve paket kaynağı: `c05291f4e9af991eda642e2d0f312194a7721ce0`.
[CI 43590369220](https://github.com/kaansavukduran/yksmania/actions/runs/43590369220)
tüm dört işte başarılı: 64 birim testi, 64 tarayıcı kabulü, Windows/Linux
paketleri ve Android APK. Paketlenmiş Windows ve Linux uygulamaları çevrimdışı
ders, ayrıntılı rehber/kaynak akışı, yeniden yükleme ve süreç yeniden başlatma
kontrollerini geçti; gözlenen renderer hatası her ikisinde de 0.

[Public kabul 43588836416](https://github.com/kaansavukduran/yksmania/actions/runs/43588836416)
64/64 geçti; kaynak `95978b0`. Sonraki değişiklikler test kayıt beklemeleri,
Windows modül dosyası adı ve derleme denetimidir. Son derlemenin 27 JS/CSS,
PDF worker, servis worker ve sürüm dosyası yayınlanan uygulamayla SHA-256
düzeyinde aynı bulundu. Son kaynak için Vercel production
`dpl_J7JKwvJf2T4od3d8J5tRtcVkWWBC` READY; canlı `version.json` 0.6.0.

[Release 43591167018](https://github.com/kaansavukduran/yksmania/actions/runs/43591167018)
başarılı. [v0.6.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.6.0-alpha.1)
yayımlandı: Windows Setup/Portable, Linux AppImage/DEB, Android debug APK ve
üç kanıt dosyası; toplam 8 asset. Paketler başarılı CI'den alındı, yeniden
derlenmedi. `verified-run.json` kaynak SHA'sı ve başarılı main koşusu doğrulandı;
iki kanıt dosyasının indirilen SHA-256 değerleri yayın listesiyle eşleşti.
Android code 12 / versionName 0.6.0 / v 2 imza doğrulaması başarılı.
Beş büyük binary ayrıca yerelde yeniden indirilip hash'lenmiş değildir.

Gerçek kapsam: 50 anlatım, bunlardan 6 ayrıntılı rehber; 115 özgün soru,
5 resmî kitapçıkta 8 doğrulanmış ÖSYM referansı. 479 başlığın tamamı ve bütün
20 yıllık ÖSYM arşivi henüz hazır değildir. Özel 126 kopya kağıdı public pakete
gömülmez; cihazda içe aktarılır ve konu başlığındaki düğmeden tam açılır.
Fiziksel Android, temiz Windows kurulum/portable taşıma, iki sürüm arasında
güncelleme ve diğer tarayıcılar ayrıca doğrulanmalıdır.

Sıradaki içerik işi: kalan kısa başlangıç anlatımlarını kaynak sayfalarını
okuyarak ayrıntılandırmak; sonra kaynak sırasındaki 40/detail 203 ve 41/detail 204.
Kopya kağıdı ve geçmiş soru kapsamını genişletirken kısmi kaynakları tam arşiv
diye sunma. Önceki başarısız koşuların nedenleri aşağıda tarihsel tutulur.

---

# 0.6.0 — Windows modül adı çakışması düzeltmesi

CI 43589340483:64 unit/64 browser PASS; Linux paketli kabul ve Android imza
kontrolü PASS. Windows build TS 1149/TS 1261 ile durdu: NarrativeModels.tsx
ve narrativeModels.ts uzantısız import çözümlemesinde Windows üzerinde
çakışıyordu. Bu gerçek platform kusurudur; test hatası diye geçilmedi.
Saf hesap modülü narrativeCalculations.ts adını aldı;4 import güncellendi.
check/build artık case-insensitive uzantısız modül yolu denetimiyle başlar.
Eski çakışmayı içeren geçici 2 dosyalı örnek guard tarafından reddedildi.
Yerel 85 modül yolu, check/build,64 unit,9 anlatım browser ve Linux geliştirme
Electron offline/reload/restart PASS; rendererErrors 0.

Public 43588836416:64/64 PASS (7,1 dk), checkout 95978 b 0. Daha sonraki e 21 b 838
sadece test onay beklemeleri/belgedir. Modül adı düzeltmesinin derlenmiş
JS/CSS/worker/version çıktıları yayındaki 0.6.0 ile byte düzeyinde karşılaştırıldı;
sonuç /workspace/work/lesson-depth/runtime-byte-comparison.json içindedir.
Bu kaynak düzeltmesi öğrenme metinlerini, veri kimliklerini veya arayüz
davranışını değiştirmez. Yeni tam paketCI bekleniyor; Windows paketi bu
kontrol geçmeden yayımlanmayacak.

---

# 0.6.0 yayın doğrulaması — kalıcı kayıt beklemeleri

Uygulama kaynağı95978b0dc47294fc914fd04c5b70c13fcba96d14 main'e gönderildi.
Vercel dpl_5 gTmD 1 PRmk 1 bcpgvPEkewiZBPD 5 R production READY, version.json 0.6.0.
CI 43588713692:64 unit PASS, browser 62/64; native işler güvenli biçimde SKIPPED.
İki test UI olayından hemen sonra IndexedDB onayını beklemeden reload yaptı:
son sözcük adımı ve başarısız tekrar yazısından sonraki başarılı retry. Store
kodunda sıradan düzenleme “kaydediliyor” durumundaydı; terminal tekrar eylemi
DB onayından önce başarı göstermiyordu. Testler saved durumu / gerçek undo
onayını reload'dan ÖNCE bekleyecek şekilde düzeltildi. Keyfi timeout/retry veya
atlanan assertion eklenmedi. İki senaryo üçer kez,6/6 PASS. Bu düzeltme yalnız
testler ve bu devir notudur; uygulama kaynakları 95978 b 0 ile aynıdır.

Yeni tamCI ve public kabul başlatılacak; eski 43588836416 public koşusu ilk
beklemesiz test revizyonudur. Son başarılı kaynaktan paket yayımlanmadan alpha
paketlerinin hazır olduğu söylenmez. Kaynak arşivi 2006–2026 halen kısmi;
50 anlatım,6 ayrıntılı rehber,115 özgün soru ve 8 ÖSYMreferansı gerçek kapsamdır.

Sıradaki içerik işi: kalan kısa başlangıç anlatımlarını kaynak okuyarak aynı
ayrıntıya çıkar; kaynak sırası 40/detail 203 ve 41/detail 204 sonraki yeni başlıklardır.
20 yıllık bütün ÖSYM taraması, yeni soru setleri ve eksik kağıt üretimi tamamlanmadı.
Özel 126 PDF cihazda içe aktarılır; public pakette özel Drive arşivi yoktur.

---

# 0.6.0 — kapsamlı anlatım ve konu içi kaynak akışı (çalışıyor)

Yetkili repo kaansavukduran/yksmania; yerel /workspace/yksmania,
forge/in-depth-learning. Önceki 50 anlatımlı yerel dal, doğrulanmış 0.5.3
main ile birleştirildi (a 6 cf 5 b 7). Public son sürüm 0.5.3, yerel yeni çalışma
henüz yayımlanmadı. Önceki kayıtlar aşağıda tarihsel olarak korunur.

Yeni kullanıcı kararı: kopya kağıtları soldan çıkar, konu başlığında düğmeyle
tam PDF olarak göster; kaynaklar korunur. Ders anlatımı kapsamlı açıklama,
etkileşim ve çözümlü örnek içermeli. Kart iç boşluğu eksikliği doğrulandı ve
topic-study üzerinde düzeltildi. Geçmiş ÖSYM kaynakları çözüm sonuna bağlandı.

6 ayrıntılı rehber: simya/disiplinler/sembolik dil/güvenlik/atom modelleri ve
rasyonel sayılar. 50 toplam anlatım,115 özgün banka sorusu; bütün 479 konu
anlatımı tamamlanmış değildir. Önceki 27 kaynaklı anlatım ve konu tekrarları
korunur. İncelenen 126 özel kopya kağıdı dosyasının 126'sı derse/türe
sınıflanır,124'ü ayrıntılı başlıkla eşleşir;2 genel geometri dosyası bütün
ders kağıtları seçeneğinden erişilir. Özel PDF/kimlik/katalog Git'e girmez.

Canlı AIONIA belgesi bu aşamada tekrar okundu: v 1.7 (14.11.2026); karakter
varlıkları değiştirilmedi. Yalnız Türkçe ve Win/Linux/Android/web kapsamı.
MEBİ TYT Matematik PDF 28–30; Kimya PDF 11–29 incelendi. Rasyonel/sembolik/
simya Aurelia kağıtları da okundu. Kamuya açık 5 ÖSYM kitapçığı indirildi;
8 referans soru ve anahtar sayfalarıyla kontrol edildi:2018/2021 TYT,2026
ALES 2,DGS,KPSS. 2006–2026 bütün oturumlar taranmış değildir, arşiv kısmi.

YKS-016 yeni 3 tarayıcı testinin ilk koşusunda iki sorun bulundu: büyük yazıda
header düğmesinin min-content taşması ve sınav seçiminin etiketle bulunmaması.
İkisi düzeltildi;3/3 odaklı test PASS. Sonraki rehber eklemeleri ardından
Yerel check/build,64 unit ve tam 64/64 Chromium kabulü PASS (4,5 dk).
Son bağlantı etiketi düzeltmesi ardından 9/9 anlatım regresyonu PASS. Linux
geliştirme Electron'u offline/reload/process restart, derin rehber, kaynak
bağlantıları ve yeni bölme modelinde PASS; rendererErrors 0. Bankadaki 115
sorunun bütün alanları 0.5.3 ile aynen korunduğu ayrıca karşılaştırıldı.
Gerçek özel Aurelia PDF: inline/readingPage/not/offline PASS. Gerçek 2021 TYT
resmî PDF: hash ile import, offline soru 26/anahtar 45 sayfası PASS. Bunlar
CI'ye veyaGit'e konulan özel dosyalar değildir.
12 temsilci model şablonu, koyu/açık masaüstü,390 px ve 320 pxbüyük yazı
görsel/etkileşimsel incelendi. Şema sembollerinde ve etiketlerde gözlenen
kusurlar giderildi. Son filter regex düzeltmesi ALES'i Thales/Kalesi
sözcüklerinden ayırır; birim kontrolü var. Son check/unit/build ve 64 unit PASS; ilgili 2 YKS-008 kaynak regresyonu PASS.
PaketlenmişCI/public/release BEKLİYOR.

---

# Korunan ağaç yönü düzeltmesi

TYT/AYT kökleri üstte, ders dalları aşağıya açılır. Yayımlanacak 0.5.3
yamasındaki SVG ve mevcut YKS-010 yön denetimi bu yerel konu dalına aktarıldı.
Build ve ağaç/küçük ekran 2 browser PASS. 50 anlatımlı bu dal yayımlanmadı;
önceki konu/kaynak QA durumu aşağıdaki kayıtlarda korunur.

---

Public hotfix 0.5.2 teslimi tamamlandı: uygulama/paket kaynağı 7 aedafb;
GitHub main belge başı 45 ba 975. CI 43580314183 tüm 4 job PASS, public 43579996297
50/50 PASS, release 43581051297 PASS;0.5.2-alpha.1 sekiz asset yayımlı.
Vercel production READY/version.json 0.5.2. Ayrıntılı public teslim kaydı
fix/question-passage dalındaki FORGE.md / docs/QA.md içindedir. Bu dalın
50 anlatımlı çalışma kopyası yine yayımlanmamıştır; aşağıdaki 59/61 yerel sonuçlar
onun ayrı kanıtıdır. Yeni görsel/native QA ve kaynak kapsam tablosu ardından
sıradaki konu 40/detail 203 ile devam edilebilir.

# Yayımlanmamış konu üretimi — son yerel kontrol

forge/source-ordered-theory; uygulama kaynağı 5 f 54192. Check/build,59 birim ve
61/61 tam Chromium kabulü PASS (forge-final-unit.log / forge-final-browser.log).
Yeni 50 anlatımlı dal,27 theory-only ek içerir; public main yalnız paragraf
hotfix'idir,23 anlatım/115 sorudur. Tam 61 koşusu yeni 27 anlatımın senaryoları,
hatırlama/offline seçimleri,11-model 320 px %200 UI/%150 metin/axe, anlamlı
sayısal/sözcük kontrolü,3/7/21 teori tekrarları ve YKS-015 düzeltmesini içerdi.

İki kusur düzeltildi: atom karşılaştırmasının 6 sütunu büyük yazıda sayfayı
taşırıyordu; değerler iki okunabilir, dar ekranda üst üste gelen tanecik kartına
dönüştürüldü. Sözcük modelindeki kitapta düğmesi testte şema adımıyla karışıyordu;
ses değişimi bölgesindeki gerçek kontrol hedefleniyor. Atom kartları ve diğer
son yeni modellerin normal koyu/açık görsel incelemesi/native kabulü halen
NOT TESTED; bu dal henüz yayın hazır diye sunulmamalı. Kaynak sayfa kayıtları
pack.source alanlarında; public SOURCE_REVIEW kapsam tablosuna taşınmalı.

Metinsiz soru hotfix 7 aedafb bu dala merge edildi; yeni 59/61 kontrollerde de
geçti. Eski notlar/115 anahtar korunur. Sonraki konu 40/detail 203,41/detail 204.
Aurelia iki ilgili PDF'nin 1–4 sayfaları ayrıca okundu, özel next-theory-reading
notunda kaynak düzeltmesi var: iki tarafı 0 ile çarpmak eşitliği sağlar ama
çözüm eşdeğerliğini korumaz. Yeni soru bankası ekleme; önce konuları sürdür.

---

# YKSMania 0.5.2 — soru bağlamı düzeltmesi

Öncelikli kullanıcı hatası YKS-015: metinsiz ana düşünce sorusu. Önceki konu
üretiminin 50 anlatımlı çalışma kopyası /workspace/yksmania içinde korunuyor;
bu hotfix ayrı /workspace/yksmania-question-fix, fix/question-passage dalında
9 cf 8 a 65 üzerine hazırlanıyor. Yeni konuları yayın hazırmış gibi bu yamaya katma.

0.5.1 normal Sorular girişiyle eksik metin FAIL gözlendi. Tam özgün paragraf
beş soruya passage olarak eklendi; soru, anlatım ve keşif aynı kaynağı kullanır.
Diğer 110 soru da eksik bağlam açısından okundu; A–B koordinatları ve birkaç
model/deney koşulu açıklandı. IDs/anahtar/not/oturum/tekrar politikası korunur.
115 soru, 23 anlatım; bütün arşiv veya müfredat hazır iddiası yok.

İçerik guard’ı ve kalıcı YKS-015 kabulü eklendi. Yerel check/build ve 45 birim
PASS; tam Chromium tarayıcı koşusu 50/50 PASS (3,1 dk). Normal soru girişi,
beş soruda tam metin, ipucu, hatalı/doğru cevap, her adımda offline reload,
not,5/5 sonuç ve başka derse geçince metnin kaldırılması test edildi.
320 px, %200 arayüz/%150 yazı, açık tema, dokunma, yatay/dikey ve ciddi-kritik
axe PASS. 1440/390 px koyu/açık dört soru paneli görsel incelendi; rootWidth
viewport ile eşit, renderer hatası 0. İç scroll yok; notesbelow geometrisi PASS.
Linux geliştirme Electron'u offline/paragraf taslağı/process restart/tam 5/5
kabulü PASS, renderer 0. Bu yerel paketlenmiş/kurulum veya fiziksel cihaz testi değildir.
115 ID/anahtar/seçenek/açıklama eski içerik dökümüyle birebir karşılaştırılıp
korundu; p 1–p 5 passage taşıyor. WIP konu üretimi 07 e 46 da dal commit'inde saklı.

AIONIA v 1.7 canlı standardı yeniden okundu, aynı revizyon. Art değişmedi.

Sürüm 0.5.2, Android code 10. Kaynak 596882 d GitHub main'e gönderildi;
Vercel production dpl_2 T 8 VBids 1 QSF 3 K 5 QLSZ 27 BuCLZ 9 K READY, public version.json
0.5.2 doğrulandı. Yerel tarayıcıyla HTTPS kabulü proxy sertifika kökü nedeniyle
ERR_CERT_AUTHORITY_INVALID / BLOCKED; TLS doğrulaması kapatılmadı. GitHub
Published web acceptance 43579996297 aynı kaynağın public site kabulünü yürütüyor.

İlk CI 43579848849:45 unit PASS, browser 49/50. Mobil test hatalı cevabın
optimistik görünümünden hemen sonra IndexedDB kaydını beklemeden reload yapmış;
normal kaydediliyor/kaydedildi durumunu izlemiyordu. Test, kayıt başarı durumunu
bekleyecek şekilde düzeltildi; yanlış cevabın, metnin ve notun reload sonrası
korunma beklentisi aynı kaldı. Odaklı yerel 2/2 tekrar PASS. Uygulama kodu
bu test düzeltmesinde değişmedi. Yeni CI/paket ve canlı sonuçlarını ekle;
fiziksel cihaz/temiz kurulum doğrulaması varsayma. Tarihsel kayıt aşağıdadır.

---

# 14 Kasım devam durumu — konu üretimi taslak dalı

forge/source-ordered-theory dalı; henüz yayınlanmadı. 27 yeni theory-only anlatım,
23 eski anlatımla toplam 50; 115 soru korunur. Excel/Todoist sırasındaki ilk 39
başlık anlatıma bağlıdır. 479 başlıktan kesin eşleşen 49 anlatım var; geometri
alan dönüşümü mevcut haritaya uydurma bağlanmaz. Bir sonraki hazırlanmamış
başlık 40/detail-203 Birinci Dereceden Denklemler, ardından detail-204 eşitsizlikler.

Biyoloji detail 1–10; Matematik detail 199/200/201; Tarih detail 226–231;
Fizik detail 114/115/116/118; Kimya detail 144/145; Türkçe detail 250/251.
Her yeni pack kaynak sayfaları,5+ açıklama bölümü,3 senaryo,3 püf noktası,
2 puansız hatırlama içerir. Sayısal ve sözcük modelleri aktif. Sorusu olmayan
anlatım hazır soru seti değildir; boş oturum oluşturamaz.

Tekrar altyapısı: ilk çalışma 1.gün;3/7/21.gün özgün hedefleri +2/+6/+20;
teori+soru ortak uygun-gün kapasitesi, tekrarlar Bugün'de yeni işlerin önünde;
açık durable/geri alınabilir tekrar işareti; XP ve soru yanıtı üretmez.

Ortam kesintisi sonrası check +55 unit PASS (forge-resumed-unit.log).
41 anlatımlı ara yapıda 56 browser PASS; son 50 anlatımlı yapı ve 11-model mobil
süpürmesi henüz tam browser/native doğrulamasından geçmedi. Yeni içerik hazır
live sanılmamalı. Source-review-0.6 ve özel çalışma dosyaları Git'e konulmaz.

Kullanıcının metinsiz paragraf hatası acil öncelik aldı. YKS-015 onarımı ayrı
/workspace/yksmania-question-fix / fix/question-passage dalında 0.5.2 olarak
hazırlanıyor; bu kaynak üretimini hotfix'e katma. Onarım yayınlanınca buraya
merge edilip model/content/Study çatışmaları korunarak çözülmeli. Eski passage
hatasını tekrar taşımamak için yeni question-content testleri burada da koşmalı.

Eski çalışma notları aşağıda tarihsel olarak tutuluyor; üstteki 50/27/39 sayıları
günceldir. Konular önce; sonra kopya kağıtları; sonra soru bankası üretimi.

---

# Forge in progress: source-ordered theory and review-first learning

Active request: continue substantial source-based development, theory first, then
cheatsheets, then questions. Every new theory needs meaningful interactive visuals,
pitfalls, explanatory reasoning and recall. Do not promise addictive manipulation,
mastery of every MEB publication or completion of 479 authored topics prematurely.
Turkish-only project decision remains; no k 44 activation or platform expansion.

Working copy adds theory-anchored review completions, shared theory/question review
capacity, first-study day 1 / repeats +2,+6,+20, (İlk tekrar)/(İkinci tekrar)/(Son tekrar).
Existing question review IDs and original dates are unchanged. Today queue precedes
new daily assignments; hero prioritizes a due repeat, Calendar/Result use the same
combined plan. Explicit theory-repeat marks are durable/undoable, no XP or answers.
New optional state field defaults safely in older backups; no IndexedDB schema bump.
Focused review browser acceptance 2/2 PASS on the first working build; check/unit
runs pass (latest count in logs). Full/native/live verification remains pending.

New theory-only narrative registry currently holds ten TYT biology topics (detail-1
through detail-10) and mathematics place value (detail-199). Eleven additions to
23 old lessons = 34 working-copy narratives; question bank stays 115, 23 sets.
Zero-question narratives never appear as ready question sets or create empty sessions.
Original content and IDs must be retained. Generic interactive flow cases have
per-topic nodes, explanations, worked reasoning and persisted unscored recall;
pH/chain/basamak/yüzyıl/özkütle/hareket numerical manipulators are being integrated.
Read source PDFs, not inventory presence, establish readiness. App code is not yet
published by this checkpoint; last public version is 0.5.1 / source 776 f 62 c.

Sources remain private under /workspace/work/source-review-0.6 and attachments.
Read: MEBİ TYT Biyoloji selected PDF 11–17,20–21; OGM common traits 10–17,
compounds I 10–19, compounds II 10–16; Aurelia scientific method 1–8, minerals 1–3,
place value 1–5, physics intro 1–5. History selected source readings and previews
are in the ongoing task; record exact reviewed pages when publishing. Extraction
of entire books is not full review. Several original source tables have broad
claims or typos; authored text preserves conditions instead of copying them.
No private PDF/Drive IDs/raw excerpts belong in Git. Private pack export rejection
from earlier work remains in force; no alternate export was tried.

Next: fill missing source-order entries 14–21 (place value now authored, history
and physics in progress), continue theory development beyond that checkpoint;
complete review/visual/source QA and keep a verified coverage record. The user
asked to keep progressing, not stop after five lessons or at a deployment.
No new scored question bank work before the theory phase. Geometry coverage gap
in the supplied 479-heading order remains and must not be silently invented away.

---

# Historical checkpoint: YKSMania 0.5.1 alpha

Kullanıcı bildirimi: Bugün → Bugünün çalışma yolu ekranında Simyadan Kimyaya
çalışılmış olmasına ve beş soruda dört doğruya rağmen tamamlanma/sonuç görünmüyor.
YKS-013. Önceki 0.5.0 build’inde normal arayüzle konu kaydı + 4/5 soru oturumu
sonrası Bugün’e dönüşte yeni kabul testi FAIL: tamamlanan günlük satır yok.
Doğrulanan neden: liste yalnız studyPlan.items (kalanlar) çiziyordu; tamamlanan
konular filtreleniyor, kaydedilen Session yanıtları satıra bağlanmıyordu.

Onarım: günlük liste, kalan bugünkü atamalar + bugün çalışılmış konular + bugünkü
son soru denemelerinin tekil birleşimidir; Excel sırası korunur. Tamamlanan konu
yeşil onay ve metinle görünür kalır. Her iki kartta son tamamlanmış denemeden
“5 soruda 4 doğru · 1 yanlış”, soru tarihi, varsa bağımsız doğru/ipucu bilgisi ve
Sonucu gör bağlantısı bulunur. Tüm çalışma sırası listesi de aynı satırı kullanır.
Son deneme gösterilir; en iyi skor seçilmez, tekrarların cevapları toplanmaz.
Eksik oturum sonuç sayılmaz. Haricî çalışma işaretine uydurma 0/5 atanmaz.

Önceki sadece-soru kaydı teoriye çevrilmez: satır “Konu henüz işaretlenmedi” der,
aynı karttaki Konuyu çalıştım ile açık/durable/geri alınabilir konu bildirimi
sunulur. Kayıt başarısızsa tamamlandı gösterilmez; soru sonucu korunur. Teori ve
soru planları, XP, orijinal tekrar tarihleri ve 479 başlık sırası değişmez.
Mevcut veritabanı/yedek biçimi aynı; eski kayıtlar kendiliğinden gösterilir.
Hazır içerik değişmedi: 23 anlatım / 115 özgün soru. Yeni PDF/art üretimi yok.

Fragaria Unslop güncel UI/davranış profili uygulandı; canlı AIONIA v 1.7 14 Kasım
2026 yeniden okundu, revizyon aynı. Karakter/splash kapsam dışı ve değiştirilmedi.
Yerel check/build, 41 birim testi ve dört yeni YKS-013 kabulü PASS. Mobil 320 px,
%200 UI / %150 yazı, açık tema, ciddi-kritik axe, offline reload, 0/5, yeniden çözme,
oturum geri alma, disk yazma hatası/yeniden deneme ve kapalı günde dış kaynak
kaydı test edildi. Linux Electron günlük konu + soru sonucu ve süreç restart PASS,
renderer hataları 0. Tam tarayıcı koşusu 48/48 PASS (2,8 dk).
1440×1000 koyu/açık ve 390×844 koyu/açık günlük kartları görsel incelendi;
320 px büyük yazıda gerçek kontroller/taşma ölçümü PASS, renderer hataları 0.
Uzak paket ve yayın sonuçları aşağıdadır.
Sürüm 0.5.1 / Android versionCode 9. Önceki fiziksel cihaz/imza/update kapıları açık.

## 0.5.1 dağıtım ve paket takibi

Uygulama/test kaynağı: `776f62c1603d9af7b37dbdf5fdbbee6c49f569d7`.
Vercel normal Git dağıtımı `dpl_2a1omXD7s6HJosPdx6LzBZiirp2r` üretimde READY;
kanonik https://yksmania.vercel.app/version.json 0.5.1 döndürür. Canlı kabul
[43569397941](https://github.com/kaansavukduran/yksmania/actions/runs/43569397941)
48/48 PASS (3,8 dk). Test ve üretim uygulama kaynağı aynı 776f62c. [Paket CI 43569363475](https://github.com/kaansavukduran/yksmania/actions/runs/43569363475)
dört işte PASS: check/build, 41 birim testi, 48 tarayıcı senaryosu (2,0 dk);
Windows/Linux paketlerinde günlük tamamlanma ve son soru sonucu, offline/reload/
process restart PASS, renderer hataları 0. Android debug APK imza/manifest PASS.
[Yayın 43570014722](https://github.com/kaansavukduran/yksmania/actions/runs/43570014722)
PASS: [v0.5.1-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.5.1-alpha.1)
public/prerelease, sekiz dosya (beş native paket + üç kanıt/checksum). Başarılı
43569363475 paketleri yeniden derlenmeden yayımlandı. Tag ve indirilen
verified-run.json aynı 776f62c1603d9af7b37dbdf5fdbbee6c49f569d7 kaynağına bağlı.
İndirilen iki kanıt dosyasının SHA-256 değerleri eşleşti; beş büyük binary ayrıca
yerelde yeniden indirilip hash’lendi denmez. Android code 9 / name 0.5.1 /
minimum API 24 ve APK v 2 imzası doğrulandı; public APK adresi HTTP 200.

Fiziksel Android, temiz Windows installer/portable taşıma, üretim imzası ve iki
sürümlük native güncelleme NOT TESTED. Windows imzasız, APK debug imzalı.
Soru sonucunu göstermeyi konu ustalığı veya sınav puanı artışı diye sunmayın.

---

# Historical checkpoint: YKSMania 0.5.0 alpha

Excel sırasının 6–10. başlıkları geliştirildi: Temel Kavramlar, Tek Çift Pozitif
Negatif Sayılar, Ardışık Sayılar, Asal Sayılar, Faktöriyel Kavramı. Beş özgün
etkileşimli anlatım ve 25 özgün soru; toplam 23/115. OGM Video Ders Notu iki
dosyanın dokuz seçili sayfası ve Aurelia beş kopya kağıdının on dört seçili sayfası
yakın okundu. Asal sayılarda doğrudan kaynak Aurelia’dır; atıf yaptığı orijinal
MEB kitabı ayrıca okunmadı. Sayfa/kavram/anahtar kaydı SOURCE_REVIEW.md içinde.
Arşivin tamamı, resmî soru bankası veya tüm müfredat hazır diye sunulmaz.

Sayı kümeleri çoklu seçim ve gerekçe; tek–çift/işaret işlemleri; ters eşleme ile
ardışık toplam; √n dahil bölen denemesi ve çarpan grupları; farklı kitapları
sıralayarak faktöriyel ve ortak çarpan sadeleştirmesi. Seçimler offline kalıcıdır,
keşif XP/ustalık kazandırmaz. Eski 18 anlatım/90 sorunun tüm içerik alanları
birebir korunur. Plan 479, ana harita 341 ve geometri açığı değişmez. Yeni soru
kimlikleri bas/par/seq/pri/fac-1…5; eski tekrar tarihleri/notlar/taslaklar korunur.

Güncel Fragaria Unslop ve React kontrol listesi uygulandı. Canlı AIONIA v 1.7 ve
indeks v 3 yeniden okundu (14 Kasım 2026), revizyon aynı. Bu tur karakter/manzara
varlıkları değişmedi; önceki piksel tercih ve 32 poz regresyonları korunur.
YKS-012 yeni asal SVG’sinin gereksiz sabit yüksekliği gözlenip düzeltildi; eski
sürümde varmış gibi sunulmaz. Matematik çizimleri açık/koyu ve mobilde incelendi.

Yerel PASS: check/build, 40 birim/depolama/içerik, 44/44 tarayıcı (2,4 dk).
320 px / %200 UI / %150 yazı / azaltılmış hareket, gerçek kontrol kullanımı,
offline ilk açılış/reload, ciddi-kritik axe beş modelde PASS. Electron Linux beş
yeni modeli offline açar; 49 bölen kanıtı süreç yeniden başlayınca korunur;
renderer hata sayısı 0. Uzak paket/yayın doğrulaması aşağıdadır.

Web 0.5.0 dağıtımı READY: dpl_J 5 zjwumi 6 YL 1 dCXDJXAFaaBnF 5 nE,
kaynak bd95c5ddf89eaed78445710dbea91b2f45517e23. Kanonik /version.json
0.5.0 döndürür. Normal Git entegrasyonu yayımladı; manuel kota tekrarı/host/plan
değişikliği yok. [Canlı kabul](https://github.com/kaansavukduran/yksmania/actions/runs/43567601148)
44/44 PASS (3,8 dk), aynı bd 95 c 5 d kaynağı. Paket CI 43567554549 dört işte PASS;
nihai paket/release kanıtı aşağıdadır.

Sürüm 0.5.0 / Android versionCode 8. Fiziksel Android, temiz Windows kurulum,
portable taşıma, üretim imzası ve iki sürümlük native güncelleme açık kapılardır.
Sıradaki içerik önceliği 11. başlık: Canlıların Karakteristik Özellikleri.

## 0.5.0 uzak teslim doğrulaması

- Uygulama ve paket/test kaynağı: `bd95c5ddf89eaed78445710dbea91b2f45517e23`.
- [Paket CI](https://github.com/kaansavukduran/yksmania/actions/runs/43567554549)
  dört işte PASS: check/build, 40 birim/depolama/içerik testi ve 44 tarayıcı
  senaryosu (1,9 dk). Windows/Linux paketleri yeni beş matematik modeli ve 49
  bölen kanıtının süreç yeniden başlatma sonrası kalıcılığını, eski AYT/kimya/
  kopya kağıdı/PDF/konu-plan/soru kaydını offline doğrular. Renderer hataları 0.
  Android debug APK derlemesi ve imza/manifest kontrolü PASS.
- [Canlı web kabulü](https://github.com/kaansavukduran/yksmania/actions/runs/43567601148)
  44/44 PASS (3,8 dk). Test ve web uygulama kaynağı aynı bd 95 c 5 d;
  READY üretim dağıtımı dpl_J 5 zjwumi 6 YL 1 dCXDJXAFaaBnF 5 nE, kanonik
  https://yksmania.vercel.app/version.json 0.5.0 döndürür.
- [Yayın koşusu](https://github.com/kaansavukduran/yksmania/actions/runs/43568202257)
  PASS. [v0.5.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.5.0-alpha.1)
  public/prerelease, sekiz dosya: Windows Setup/Portable x 64, Linux DEB/AppImage,
  Android debug APK ve üç kanıt/checksum dosyası. Yeniden derleme yok; başarılı
  43567554549 paketleri kullanıldı. Tag ve indirilen verified-run.json aynı
  bd95c5ddf89eaed78445710dbea91b2f45517e23 kaynağını gösterir. İndirilen iki
  kanıt dosyasının SHA-256 değerleri listeyle eşleşti. Beş büyük native dosyanın
  tamamı yerelde tekrar indirilip hash’lendi iddiası yoktur. Android code 8 /
  name 0.5.0 / minimum API 24 / APK v 2 imza doğrulandı; public APK adresi HTTP 200.
- Fiziksel Android, temiz Windows installer/portable taşıma, kararlı üretim imzası
  ve iki sürümlük native güncelleme NOT TESTED. Windows imzasız, APK debug imzalı.
  Otomatik executable testleri bu açık kapıların yerine geçmez.

---

# Historical checkpoint: YKSMania 0.4.0 alpha

İstek: 18 Haziran 2027 varsayılan sınavı; 28 Şubat 2027 konu bitirme hedefi;
Excel/Todoist sırası ve kapalı günlere göre konu/soru ölçekleme; gün/ay/yıl;
Kütüphane menüsünü kaldırma; tek ders grafiği ve TYT/AYT ağaçları; kaynaklı yeni
anlatımlar, daha zengin referans uyumlu piksel Aion.

Uygulandı: iki bağımsız 479 başlıklı plan, bugünün tam sayı hedefi, tamamlanandan
sonra azalan günlük kuyruk, tarihli tüm çalışma sırası, takvim konu/soru yükleri,
kalıcı/geri alınabilen manuel kayıt. Uygun gün hesabı bugün/hedef dahil; yinelenen
kapalı tarih ve hafta günü bir kez çıkarılır. Geçmiş hedef/uygun gün yok/tamamlandı
ayrı gösterilir; sıfıra bölünmez. Yeni soru oturumu konu anlatımını otomatik
bitirmez; eski tamamlanmış derslerin tarihsel kayıtları korunur. İşaretler XP,
ustalık veya cevap kaydı oluşturmaz; eski tekrar hedefleri değişmez.

Çalışma sırası güncel Excel Üretim Sırası ile 479/479 tekil eşleşti; Todoist’in
536 satır / 479 ilk çalışma başlığı aynı sırayı doğruladı. Kişisel tamamlanma,
tarih ve özel Drive kimlikleri import edilmedi. Ayrıntılı listenin geometri açığı
vardır; 341 ana harita korunur, bu iki liste toplanmaz. OGM iki fasikülde sekiz
anlatım sayfası yakın okundu; ilk beş kimya başlığına beş özgün görsel anlatım ve
25 alıştırma eklendi. Toplam 18/90. Tüm arşiv veya bütün müfredat hazır denmez.
Kaynak/sayfa/kavram/anahtarlar docs/SOURCE_REVIEW.md içinde.

Dünyam: 15 dersi bir halkada, konu sayısına ağırlıklı renkli tamamlanan alanlarla
gösterir. TYT solda, AYT Sayısal sağda; dar/büyük ölçekte alt alta. Dallar kaynak
çalışma sırasıdır, doğrulanmış bir önkoşul grafiği iddiası değildir. Kaynak içe
aktarma Ayarlar’a taşındı; eski /library bağlantısı, PDF’ler ve notlar korunur.
Uygulama yalnız Türkçe; önceki kopya kağıdı ayrımı ve tam genişlik/alttaki notlar korunur.

Aion ana pafta ve T-pose A tekrar incelendi. Kullanıcının son açık piksel isteği,
eski cartoon tercihini bu uygulama için değiştirir. Yeni 8×4 atlas 32 pozu,
farklı klik tepkilerini ve fare yönü bakışını içerir. Dünya konumu sabit; kare
bazlı ayak çıpası metadata ile düzeltilir. Yeni manzara ilerlemeyle renklenir.
Azaltılmış hareket, görünmez/arka plan duraklaması korunur. Ayrıntı ART_BIBLE.md.
Güncel Fragaria Unslop/Unslop, React kontrol listesi ve canlı AIONIA v 1.7 / indeks
v 3 kullanıldı. Yeni yetki gerektiren dışa aktarım denenmedi.

Yerel/uzak son doğrulama sonuçları aşağıdaki teslim kaydına eklenir. Sürüm 0.4.0,
Android versionCode 7; fiziksel cihaz, temiz kurulum/portable taşıma, üretim imzası
ve iki sürümlük native güncelleme açık kapılardır.


## 0.4.0 yerel kontrol

TypeScript/build ve 35 birim/depolama/içerik testi PASS. 38 benzersiz tarayıcı
senaryosu yerel tam + hedefli koşularda geçti; bir tam koşunun PDF kurulumu dist
aynı anda değiştiğinde zaman aşımına uğradığı için o koşu tam PASS sayılmadı.
Sabit son derleme üzerinde PDF tekrarları ve yeni gece yarısı/arka plandan dönüş
regresyonu PASS. Sabit uygulama derlemesinde sonraki tam yerel koşu 38/38 PASS. Uzak CI ve paket sonucu aşağıda ayrı kaydedilir.
Chromium 156.0.8078.79 / Node 24.22.1 / Linux. Koyu 1440×1000 ve açık 390×1000,
beş kimya modeli, 32 ayrı Aion karesi incelendi. 320 px/%200 UI/%150 yazı gerçek
kontrol akışı PASS; taşma/kırpma onarımları QA.md içinde. Örnek görsel akışta
renderer hataları 0. Electron Linux beş OGM modeli, konu kaydı, eski AYT/cheatsheet,
offline 5/5 soru, reload ve süreç yeniden başlatma PASS; renderer hataları 0.
Yeni yayın ve native dosyalar doğrulanınca ayrı teslim kaydı eklenir.


## 0.4.0 teslim doğrulaması

- Nihai paket/test kaynağı: `66539f0830c544dbc4a6de9964e2924a3a7d304a`.
- [Nihai paket CI](https://github.com/kaansavukduran/yksmania/actions/runs/43523758199)
  dört işte PASS: check/build, 35 birim/depolama/içerik, 38 tarayıcı; Windows/Linux
  paketlerinde beş OGM görseli, iki hedefli plan/konu kaydı, 5/5 özgün soru,
  offline/reload/process restart, önceki AYT ve kopya kağıdı regresyonları. Renderer
  hataları 0. Android debug APK imza/manifest kontrolü PASS. Önceki 43522838357 de
  dört işte PASS olmakla birlikte son test-harness düzeltmesinden önceki kaynaktır.
- [Canlı 0.4.0 kabulü](https://github.com/kaansavukduran/yksmania/actions/runs/43523965580)
  **38/38 PASS**, kanonik https://yksmania.vercel.app üzerinde. Test kaynağı 66539f0,
  Vercel üretim uygulama kaynağı `0101829fcfaa1d9dcac6fd841ec48ef6868cb3a5`;
  READY dağıtım `dpl_AiuejjxxkVQsQmyM3z9aykBwT8F7`. /version.json 0.4.0 döndürür.
  Son commit yalnız tests/e 2 e/app.spec.ts ve docs/QA.md değiştirir. src ağaç hash’i
  iki kaynakta da da489899679e77a886b2b812f25a6583ac0b1e92; public hash’i iki
  kaynakta da 107144b7cc07e85dc20006fcfeb3367aaa9f6cc9. src/public/package/
  android/desktop/scripts/vercel diff’i sıfırdır; eski sürüm üzerinde yeni işlev
  PASS iddiası yapılmaz. 66539 f 0 için Vercel günlük kota durumu failure: yeniden
  dağıtım, ücret/plan değişimi veya alternatif host denenmedi. Mevcut yayındaki
  aynı 0.4.0 uygulama kodu güncellenmiş test bekleyişleriyle doğrulandı. 66539 f 0’ın
  Vercel’e dağıtıldığı iddia edilmez. İlk iki public koşu nihai PASS sayılmaz.
- [Yayın koşusu](https://github.com/kaansavukduran/yksmania/actions/runs/43524926879)
  PASS: [v0.4.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.4.0-alpha.1)
  herkese açık, prerelease; beş native dosya + üç kanıt/checksum dosyası. Yeniden
  derleme yok: 43523758199 çıktıları kullanıldı. Etiket ve indirilen verified-run.json
  tam kaynak 66539f0830c544dbc4a6de9964e2924a3a7d304a ile eşleşir. İndirilen iki
  kanıt dosyasının SHA-256 değerleri checksum listesiyle eşleşti; büyük native
  dosyaların tamamı yerel makineye indirilip yeniden hash’lenmiş diye sunulmaz.
  Android versionCode 7 / versionName 0.4.0 / minimum API 24 ve APK v 2 imzası
  doğrulandı. Herkese açık APK indirme bağlantısı HTTP 200. Windows Setup/Portable,
  Linux amd 64 DEB / x 86_64 AppImage ve Android debug APK dosyaları hazır.
- Native fiziksel Android, temiz Windows kurulum/portable extractor/taşıma,
  üretim imzası ve iki paket arası güncelleme henüz doğrulanmadı. Emulator/runner
  testleri bu açık kapıların yerine geçmez. Özel kaynak PDF’leri public pakete
  gömülmez; yeni içerik toplamı 18 anlatım/90 özgün sorudur, 479 hazır anlatım değildir.

---

# Historical checkpoint: YKSMania 0.3.1 alpha

Kullanıcı isteği: kopya kağıtları derslerin içinde görünmesin; sol menüde Konu
Anlatımı ile Sorular arasında ayrı bölüm olsun. Yeni /cheatsheets yolu TYT/AYT,
ders, konu araması ve 479 kaynak başlığını içerir. Ders açıldığında konu listesi
görünür; konu seçimi ilgili kopya kağıdı PDF’lerini açar. Dersteki tüm PDF’ler
ayrı açılabilir; konusu eşleşmeyen dosyalar burada erişilebilir kalır.

Konu Anlatımı ve Sorular’dan kopya kağıdı alt başlıkları kaldırıldı. Ortak kaynak
türü filtresi cheatsheet dosyalarını yalnız yeni bölümde gösterir; diğer PDF
türlerinin yerleşimi korunur. Açık katalog konu kimlikleri önceliklidir; kimlik
olmadığında tam başlık sözcük dizisinin Unicode dosya adı eşleşmesi kullanılır.
Belirsiz/kısmi sözcük eşleşmeleri konuya bağlanmaz. Kaynak PDF’leri herkese açık
pakete gömülmez; Kütüphane’deki içe aktarma ve yerel PDF okuyucu yeniden kullanılır.
Kayıt/veritabanı biçimi, soru kimlikleri, ilerleme, notlar ve tekrar tarihi değişmez.

Güncel Fragaria Unslop ve React bileşen kontrolleri uygulandı. AIONIA canlı kaynağı
2026-11-13 yeniden okundu: v 1.7. YKS-008 gezinme regresyonu eski eb 5 ab 16 kaynağında
başarısız olarak gözlendi. Yeni akışta 320 px, %200 arayüz ve %150 yazıda 477 px
sayfa taşması yakalandı: arama alanının 14 rem minimumu ve tek sütunlu grid’in
min-content boyutu. Ortak arama ve konu kartı sınırları düzeltildi; yazı/ölçek
küçültülmez, içerik kırpılmaz. Yeni sayfanın gereksiz çift iç boşluğu kaldırıldı.
Kopya kağıtları konu anlatımına alan kaybettirmez; notların altta kalması korunur.

İçerik miktarı aynı: 341 ana konu, ayrı bölümde 479 kopya kağıdı başlığı,
13 görsel anlatım / 65 özgün soru. Sürüm 0.3.1, Android versionCode 6.
Yerel PASS: check/build, 26 birim/depolama/içerik ve 28 tarayıcı kabul testi.
Electron Linux yeni bölümün ilk çevrimdışı açılışı, AYT modelleri, ders kaydı,
yeniden yükleme ve süreç yeniden başlatma PASS; renderer hatası 0. Chromium
156/Linux, koyu 1440×1000 ve açık 390×1000 ekran görüntüleri incelendi; taşma ve
renderer hatası yok. 320 px, %200 arayüz / %150 yazı, ilk çevrimdışı giriş, gerçek
manuel PDF açma ve ciddi/kritik axe kontrolleri PASS. Yeni yayın ve native paket
CI sonuçları teslim kaydına eklenir. İlk 27584 be dağıtımı Vercel günlük sınırına
takıldı ve eski 0.3.0 üzerinde yeni test çalıştırılmadı. Gerçek çoklu arama hatasını
gideren son 3 f 3 cb 54 kodunun otomatik dağıtımı ise READY:
dpl_JBh 2 d 7 qbX 56 PY 8 g 65 ZFKju 5 LLkJM. Kanonik /version.json artık 0.3.1 döndürüyor;
yeni canlı kabul koşusu bu kaynağa karşı başlatıldı. Plan/ücret değişikliği,
alternatif host veya manuel kota aşma/yeniden deneme yolu kullanılmadı. Eski fiziksel cihaz,
temiz kurulum/portable taşıma, üretim imzası ve iki paket arası güncelleme kapıları
açıktır. Özel Drive dışa aktarımı bu turda yeniden denenmez.

Son arama kontrolü: “asit” üç dersi eşleştirdiğinde tek bir dersteki tüm PDF’ler
düğmesi üç kaynak listesini birden açıyordu. Gerçek UI ile gözlendi (3 → 3).
Düğme artık açık dersi de seçer; yeni regresyon yalnız bir kaynak listesi ve bir
açık ders bekler. İlk paket koşusu 43507301865 başarılı olsa da bu son düzeltmeden
öncedir; nihai paket ve yayın kanıtı sonraki kaynak/koşuyla kaydedilecektir.

## 0.3.1 teslim doğrulaması

- Nihai uygulama kaynağı: `3f3cb54fa541ec71ab2272197343eab00909a281`.
- Vercel üretim dağıtımı `dpl_JBh2d7qbX56PY8g65ZFKju5LLkJM` READY, kaynak eşleşir.
  https://yksmania.vercel.app/version.json 0.3.1 döndürür.
- [Canlı web kabulü](https://github.com/kaansavukduran/yksmania/actions/runs/43509055312)
  28/28 PASS; yeni menü sırası, ayrı kaynak türü, konu PDF’si, not/taslak koruma,
  çevrimdışı ilk giriş ve %200/%150 dar ekran akışları dahil.
- [Nihai paket CI](https://github.com/kaansavukduran/yksmania/actions/runs/43508957418)
  dört işte PASS: 26 birim/depolama/içerik, 28 tarayıcı; Windows ve Linux paketli
  yeni bölüm/AYT/çevrimdışı ders/yeniden yükleme/süreç yeniden başlatma kontrolleri,
  renderer hataları 0. Android debug APK imza ve manifest kontrolü PASS.
  Önceki 43507301865 koşusu son düzeltmeden önceki kaynaktır; nihai paket kanıtı
  yerine geçmez. Yayın bu nihai koşunun beş dosyasını yeniden derlemeden kullanır.
- [Yayın koşusu](https://github.com/kaansavukduran/yksmania/actions/runs/43510112404)
  PASS: [v0.3.1-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.3.1-alpha.1)
  herkese açık; Windows Setup/Portable, Linux AppImage/DEB ve Android debug APK
  ile üç kanıt/checksum dosyası hazır. Etiket ve indirilen verified-run.json
  nihai kaynak 3 f 3 cb 54 ile eşleşir. İndirilen iki kanıt dosyasının SHA 256 değerleri
  SHA 256 SUMS ile eşleşir; listede yedi dosya var. Android versionCode 6 /
  versionName 0.3.1 / minimum API 24 ve APK v 2 imzası doğrulandı. APK bağlantısı
  HTTP 200. Önceki sürümler korunur; sonraki dokümantasyon commitleri uygulama
  kodunu değiştirmez. Fiziksel cihaz/temiz kurulum/güncelleme açık kapıları korunur.

# Delivered checkpoint: YKSMania 0.3.0 alpha

Uygulama yalnızca Türkçe kalır. Bu turda Aurelia içindeki dört MEBİ AYT konu
özeti dosyasından 12 ilgili PDF sayfası yakın okumayla incelendi. Formül ve şekil
örnekleri görsel olarak da açıldı. Özel kaynak dosyaları ve kimlikler Git dışında
kalır. Sayfa eşlemeleri, model sınırları ve özgün cevap kontrolleri:
[docs/SOURCE_REVIEW.md](docs/SOURCE_REVIEW.md).

Yeni anlatımlar: kiriş/teğet ve |x| köşesi, elektrik alan/kuvvet yönü ve ters-kare
ilişkisi, dinamik denge/katalizör, yarı korunumlu DNA eşlenmesi. Dört tembel yüklenen
SVG modülü, 20 özgün alıştırma; toplam 13 anlatım / 65 soru. Eski 45 soru, kimlikleri,
cevapları ve kayıt akışları korunur. Anlatım araması hazır ders adını da bulur;
Bugün ekranı içerik sayısını gerçek listeden hesaplar. Etkileşimler öğrenme puanı
üretmez; soru oturumları ayrı akışta kaydedilir. Notlar tam genişlikli anlatımın
altındadır. Yeni keşif seçimleri mevcut kayıt yapısında saklanır.

Güncel Fragaria Unslop uygulandı. Yetkili bağlayıcıdan AIONIA standardı yeniden
okundu: v 1.7, 2026-11-13; sürüm uyuşmazlığı yok. Mevcut cartoon atlas değiştirilmedi.
Dört modelin koyu 1440 px/açık 390 px ekran görüntüleri incelendi: taşma, notların
anlatımı daraltması veya renderer hatası gözlenmedi. Yeni modellerde 320 px,
%200 arayüz / %150 yazı, azaltılmış hareket ve ciddi/kritik axe kontrolleri geçti.

Yerel PASS: check/build, 25 birim/depolama/içerik testi, 26 tarayıcı kabul testi.
Dört yeni setin her biri normal arayüzde 5/5 tamamlandı. Electron Linux: dört yeni
modelin ilk çevrimdışı açılışı, puan üretmemesi, mevcut dersin tamamlanması, yeniden
yükleme ve süreç yeniden başlatma PASS; keşif adımı korundu, renderer hatası 0.
Sürüm 0.3.0; Android versionCode 5. Fiziksel cihazlar, temiz kurulum/portable
çıkarma-taşıma, kararlı imza ve iki paket arası güncelleme henüz doğrulanmadı.

Vercel otomatik üretim dağıtımı dpl_5 L 7 aa 779 UHEyqZaqBa 8 gLVdSsDHj bu kaynak için
READY; https://yksmania.vercel.app/version.json 0.3.0 sunuyor. Önceki günlük sınır
engeli yeni dağıtımda gözlenmedi. Canlı kabul ve paket CI/yayın kanıtları aşağıdaki
teslim kaydındadır; önceki sürüm testleri yeni kaynak için doğrulama sayılmaz. Özel Drive dışa aktarımındaki önceki
onay engeli bu geliştirmede yeniden denenmedi; başka hedefe aktarım yapılmadı.

## 0.3.0 teslim doğrulaması

- Uygulama kaynağı: `1dc5d44c1e2cb1ae19ad32225fedc97b71e6a654`.
- Vercel üretim dağıtımı `dpl_5L7aa779UHEyqZaqBa8gLVdSsDHj` READY; aynı kaynak.
  Kanonik https://yksmania.vercel.app/version.json 0.3.0 döndürüyor.
- [Canlı web kabulü](https://github.com/kaansavukduran/yksmania/actions/runs/43503377912)
  26/26 PASS: dört yeni model ve eski kayıt/çevrimdışı/soru/not regresyonları dahil.
- [Paket CI](https://github.com/kaansavukduran/yksmania/actions/runs/43503304731)
  dört işte PASS: 25 birim/depolama/içerik, 26 tarayıcı testi; Windows ve Linux
  paketlerinde dört yeni AYT modelinin ilk çevrimdışı açılışı, sıfır öğrenme kaydı,
  önceki dersin tamamlanması, yeniden yükleme ve süreç yeniden başlatma kontrolleri.
  Keşif adımı korunur; renderer hatası 0. Android debug APK imza/manifest kontrolü
  PASS. İndirme yayını bu başarılı koşunun dosyalarını yeniden derlemeden kullanır.
- [Yayın koşusu](https://github.com/kaansavukduran/yksmania/actions/runs/43504471113)
  PASS: [v0.3.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.3.0-alpha.1)
  herkese açık ön sürüm, beş native dosya ve üç doğrulama/checksum dosyasıyla hazır.
  Etiket ve indirilen verified-run.json yukarıdaki kaynak commit ile eşleşir.
  İndirilen iki kanıt dosyasının SHA 256 değerleri SHA 256 SUMS ile eşleşir; dosya
  yedi checksum girdisi içerir. Android manifesti versionCode 5 / versionName 0.3.0,
  minimum API 24; APK v 2 imzası doğrulandı. Herkese açık APK indirme adresi HTTP 200.
  Önceki sürümler korunur. Sonraki dokümantasyon commitleri uygulama kodunu değiştirmez.

# Delivered checkpoint: YKSMania 0.2.2 alpha

User decision: this application is Turkish only. Language choices and English
translations were removed from the app, visual lessons and authored question bank.
AGENTS.md and the applicable project profile preserve this choice for future work;
no English translation work should be added. Existing platform/art/scheduling
decisions remain in force. The private Drive export remains blocked separately
and was not retried as part of this language change.

Initial state, document language, formatting, loading and failure screens are Turkish
regardless of device language. Earlier `en` preferences and backups normalize to `tr`
without changing other settings, drafts, answers, notes, original review targets or
PDFs. Storage shape/version and stable lesson/question IDs are retained. User input
and imported source documents are not translated. Old unknown/corrupt locales are
still rejected. Source catalogue and document stores are not rewritten.

Turkish text/answer preservation was checked against the prior source, including
option order and answer indexes. The bank remains 9 interactive lessons / 45 original
questions. The settings and visual regressions now exercise Turkish at 200% UI,
150% text and 390 px. A newly observed long update-button overflow was fixed with
wrapping inside the existing panel. See docs/QA.md YKS-007 for migration and device
language tests. Application/package version 0.2.2, Android versionCode 4.

Local check/build, 21 unit/storage/content tests and 21 browser acceptance tests:
PASS. Final deployed and package evidence is recorded in the delivery checkpoint.
Physical devices, clean installers/portable extraction and native two-package
update migration remain open gates; this is still an alpha/debug APK release.

## 0.2.2 delivery verification

- Application source: `ad2397d198c9c8b07bfec31488eced465d2bab3e`.
- Local acceptance: 21 unit/storage/content and 21 browser tests PASS, including
  English device/legacy preference compatibility with a Turkish-only UI. Desktop
  settings and 390 px / 200% UI / 150% text screenshots inspected; no renderer errors.
- [Package CI](https://github.com/kaansavukduran/yksmania/actions/runs/43491193602)
  passed all four jobs: 21 unit/storage/content tests, 21 browser acceptance tests,
  Windows/Linux packaged offline lesson/reload/process-restart checks with zero
  renderer errors, and Android debug APK signature/manifest verification.
- Production web deployment: BLOCKED by Vercel's platform rate limit. The GitHub
  Vercel status for this source is failure: “Deployment rate limited — retry in
  24 hours.” The public origin still serves 0.2.1 (`7cfbe0b`); it is not evidence
  for the new Turkish-only UI. New published-origin acceptance has not been run.
  No quota workaround, paid-plan change or new hosting destination was attempted.
  When the limit clears, deploy this verified source/current main to the existing
  Vercel project, confirm READY/production alias, then run published-smoke.yml.
- [Release publication](https://github.com/kaansavukduran/yksmania/actions/runs/43492362390)
  PASS: [v0.2.2-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.2.2-alpha.1)
  is published with all five native binaries and source/checksum/Android verification
  evidence. The tag and downloaded verified-run.json match the application source
  above; verification-file hashes match SHA 256 SUMS. Android confirms versionCode 4 /
  versionName 0.2.2. Release notes explicitly distinguish these new native packages
  from the rate-limited 0.2.1 web origin. Earlier releases remain intact. Follow-up
  documentation changes do not modify the tested application code.

# Delivered checkpoint: YKSMania 0.2.1 alpha

Current task: move theory notes below the content, preserve the question screen's
existing bottom notes, and continue the verified cross-platform delivery flow.
YKS-006 was reproduced before the CSS repair and then passed. Theory now uses one
full-width track at every breakpoint. Note contents, question drafts, settings,
source files and original review dates retain their existing storage/behavior.

Live AIONIA standard re-read through the authorized connector on 2026-11-13: v 1.7;
no source-version mismatch. Fragaria Unslop UI/behavior checks applied to the named
screens. No character designs, animation frames or private archive exports changed.

Local check/build: PASS; unit/storage/content 20/20; browser 20/20. The new regression
checks geometry at 320–1440 px plus real note edits/reload and continued question
state. Dark/light desktop/mobile screenshots inspected in Chromium 156 on Linux;
full-width article, bottom notes, no horizontal overflow, zero renderer errors.
The full 200% UI / 150% text English regression also passed. See docs/QA.md YKS-006.

Web and Windows/Linux/Android package version is 0.2.1, Android versionCode 3.
Remote build, production acceptance and release IDs are recorded below.
Physical-device, clean-install and native two-package update
gates remain open. The earlier private Drive export remains blocked pending the
specific permission already requested; this UI task does not retry that upload.

## 0.2.1 delivery verification

- Application source: `2c3f6bd90cb243b0fc6a3478f5e79853eea47ad7`.
- [Published acceptance](https://github.com/kaansavukduran/yksmania/actions/runs/43487744351):
  20/20 browser tests PASS against https://yksmania.vercel.app, including YKS-006.
- Production deployment `dpl_yx9WNLPhJZjg6Mazt6aUEnQhmoPi` observed READY for this source.
- Local Electron Linux: PASS at 1440×1000 for full-row theory / bottom notes;
  offline note save, reload and process restart PASS, zero observed renderer errors.
- [Package build](https://github.com/kaansavukduran/yksmania/actions/runs/43487684984)
  passed all four jobs: 20 unit/storage/content tests, 20 browser tests, Windows
  and Linux packaged offline lesson/reload/process-restart checks with zero renderer
  errors, and Android debug APK signature/manifest verification. It is the source
  of the new release binaries; physical-device and clean-install gates remain open.
- [Publication](https://github.com/kaansavukduran/yksmania/actions/runs/43488912473)
  PASS: [v0.2.1-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.2.1-alpha.1)
  is published with five binaries and checksum/source/Android verification files.
  The tag and downloaded verified-run.json identify the application source above;
  downloaded evidence hashes match SHA 256 SUMS. Android metadata confirms versionCode
  3 / versionName 0.2.1. Earlier releases remain available. Only documentation changes
  follow this application source; no private catalogue or PDF export was retried.

# Delivered checkpoint: YKSMania 0.2.0 alpha

Authoritative project: `kaansavukduran/yksmania`, `main`, working checkout
`/workspace/yksmania`. Prior published 0.1.0 alpha remains preserved below.

## Current work

Konu Anlatımı and Sorular now have separate subject navigation and entry routes.
Workbook source coverage is 341 main rows (201 TYT / 140 numerical AYT) and 479
detailed cheat-sheet headings. These are source outlines, not completed lessons.
Nine lessons have real interactive vector explanations; the original bilingual
question bank contains 45 items. Cell, periodic-table and geometry lessons are new;
the six previous lessons now have visual models. All old lesson/question identities,
sessions, original review dates and drafts remain valid. Legacy /study is supported.

A new left-facing cartoon atlas replaces pixel rendering at runtime. The original
motion atlas remains in art/archive. Bibliographic sources, frame timings and
anchor evidence are in ART_BIBLE and CONTENT_COVERAGE. Live AIONIA v 1.7 was read
again on 2026-11-13 through the authorized connector; updated Unslop UI, behavior
and sprite checks were applied. This is a learning app, not a game requiring a
Fragaria game splash or a new gamepad scheme.

Private catalogue and batch PDF/folder imports support source matching, 2 MB
streaming hashes, duplicate merging, cancellation and per-file failures. PDFs can
be opened from the relevant subject. IndexedDB schema v 2 preserves existing stores;
AppState stays backward compatible with defaulted explorations/readingPages fields.
PDF page navigation and positions are saved. Exploration never creates learning XP.

## Private content and remaining work

8,584 PDF metadata records (~23.6 GB) were inventoried with pagination. 143 PDFs
(126 cheat sheets, 14 MEBİ-named sources, 3 OGM past-question books; 4,989 pages)
were prepared and integrity-checked in the private task workspace, outside Git.
The whole archive is not imported as individual interactive questions. The next
content stage needs source/page/item records, verified keys and mathematical/visual
checking; do not replace this with fabricated readiness or mastery.

Drive export is BLOCKED: automatic approval review rejected the specific private
catalogue upload because explicit permission for that payload/destination was not
present. No workaround export was attempted. The source catalogue and two ZIPs
remain local, concrete deliverables. Ask for that explicit permission before any
Drive upload; ordinary app development and authorized GitHub/Vercel work continue.

Local check/build: PASS. Unit/storage/content: 20 tests PASS. Browser acceptance:
19 tests PASS in Chromium on Linux. Electron offline visual lesson, reload and
process restart: PASS with zero renderer errors. The catalogue lifecycle cleanup
and readable mobile selector layout passed focused acceptance before pushing.
Remote package/public-origin runs are recorded at the delivery checkpoint. The real-source
local import and offline reading checks are in QA. Native production signing,
clean-install/portable relocation, physical devices, non-Chromium browsers and
real two-package native updates remain open gates. Never call emulation physical
verification. Preserve the accepted +2/+6/+20 ordinal review policy.

## 0.2.0 delivery verification

- Final application source: `123b1b8ced9deac7fb4fa0bebab1bd66d14a7c33`.
- [Published web acceptance](https://github.com/kaansavukduran/yksmania/actions/runs/43485490494):
  19/19 browser tests passed against https://yksmania.vercel.app, including offline
  reload, prior records, private-catalogue fixtures and the three new visual flows.
- Production deployment `dpl_HCkQhaFvGVmGZbKqjDibhukwNEYD` is READY for this source.
- [Final package build](https://github.com/kaansavukduran/yksmania/actions/runs/43485370541)
  passed all four jobs: 20 unit/storage/content tests, 19 browser tests, Windows
  and Linux packaged offline lesson/reload/process-restart checks with zero renderer
  errors, and Android APK signature/manifest verification. The superseded c 66 e 42 b
  build was cancelled. These automation checks do not replace the physical-device,
  installer/portable-extractor and two-package update gates listed above.
- [Release publication](https://github.com/kaansavukduran/yksmania/actions/runs/43486494460)
  passed and published [v0.2.0-alpha.1](https://github.com/kaansavukduran/yksmania/releases/tag/v0.2.0-alpha.1).
  The tag resolves to the verified application source above. All five binaries
  (Windows Setup/Portable, Linux AppImage/DEB, Android debug APK), SHA 256 SUMS,
  verified-run.json and Android verification evidence are uploaded. The earlier
  0.1.0 prerelease remains intact. Private catalogue/PDF packs are still local;
  the blocked Drive export was not retried or routed through another destination.

# Historical checkpoint: YKSMania 0.1.0 alpha

Authoritative source: `kaansavukduran/yksmania`, `main`. Repository was empty when
implementation began. The latest verified commit and remote build IDs are recorded
at the end of this file when available.

## Implemented

React/TypeScript/Vite PWA; shared learning and scheduler domain; IndexedDB persistence;
six original bilingual lessons, 30 exercises; full subject reference navigation;
availability and day 1/3/7/21 review planning; retained original due dates; sessions,
assistance evidence and undo; local PDF import/reader/notes; progress backup/restore;
independent accessibility settings; existing Aion atlas; honest discovery progress;
Electron desktop shell; Capacitor Android; Vercel configuration and package CI.

## Architecture decision

Electron replaces the provisional Tauri candidate for this initial desktop build:
fully bundled Chromium avoids an online WebView 2 prerequisite for Windows portable
use. The cost is a larger package. No existing implementation was migrated.
SQLite was a candidate, not an established project constraint; the initial native
WebViews and Electron use the same persistent IndexedDB model as web. A later
storage-adapter migration must preserve existing records.

## Preserve

Keep original review targets separate from scheduled execution dates. Don't infer
learning from PDF import, time spent or checked task boxes. Don't copy private
Drive data or signing keys into the public repo. No cloud accounts/AI/telemetry.
Past Aurelia learning/plan owners have not been overwritten or synchronized.

## Next work

Complete the private content catalogue and curated packs, add a full exam/diagnostic
flow and evidence-sensitive adaptive practice. Native production signing, physical
device checks and two-version updates remain explicit release gates. See ROADMAP.

## Distribution checkpoint

- Application implementation: `59894d7c2082725fbe987727d3cba161cd5e05b6`.
- Packaged source: `9f83cc4411bc8e1ee3631b25beccec2b91de7075` (same application
  code; corrected Android verification tooling, durable-save test synchronization
  and manual release workflow).
- [Package CI run](https://github.com/kaansavukduran/yksmania/actions/runs/43467374511):
  type/build, 12 unit/storage tests, 9 browser tests; Windows/Linux packaged
  application smoke flows and Android signature/manifest verification.
- [Published web acceptance](https://github.com/kaansavukduran/yksmania/actions/runs/43466580212):
  9/9 browser tests passed against the live production HTTPS origin.
- Web: https://yksmania.vercel.app
- Prerelease: https://github.com/kaansavukduran/yksmania/releases/tag/v0.1.0-alpha.1
- The release workflow accepts only a fully successful main package run, uploads
  its existing binaries without rebuilding, and includes the source SHA and SHA 256
  checksums. Release automation is manually dispatched, not triggered by a push.

Observed package automation is not clean-install, physical Android or two-version
update verification. Windows is unsigned; Android uses a debug test key. Keep
portable `YKSManiaData` with the executable, back up progress, and keep separate
PDF copies. Production native signing/update migration remains open work.

Supplementary verification: progress backup restored into a fresh browser profile
and survived reload; light-theme axe found no serious/critical violations and one
moderate repeated-landmark issue tracked in QA. No remote browser trust checks were
bypassed. Published browser acceptance ran in GitHub to avoid the local proxy CA
limitation. Private source files and historical Aurelia learning records were not
imported into the public repository or synchronized.

Publication completed: [release workflow](https://github.com/kaansavukduran/yksmania/actions/runs/43468351719)
passed and published `v0.1.0-alpha.1`. Five binaries and signature/source/checksum
evidence are uploaded. All four jobs in the final package CI run passed.
