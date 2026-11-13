# 0.3.0 kaynak ve model kontrolü

Bu turda dört MEBİ konu özeti dosyasının ilgili 12 PDF sayfası yakın okumayla
incelendi; formül ve şekillerin bulunduğu örnek sayfalar görsel olarak da açıldı.
Bu kayıt, dört kitabın tamamındaki her sorunun incelendiği anlamına gelmez.
Kaynak dosyaları, özel Drive kimlikleri ve sayfa görüntüleri herkese açık depoya
alınmadı. Uygulamadaki SVG çizimler, anlatımlar ve 20 yeni alıştırma özgündür.

| Uygulamadaki anlatım | İncelenen kaynak | Dosyadaki PDF sayfaları | Basılı sayfalar |
| --- | --- | --- | --- |
| Türev: kirişten teğete | MEBİ AYT Matematik Konu Özetleri, Türev / Türev Alma Kuralları | 78–80 | 76–78 |
| Elektrik alan ve test yükü | MEBİ AYT Fizik Konu Özetleri, Elektrik Alanı / Elektrik Alanda Yüklü Taneciğe Etkiyen Kuvvet | 105–106, 113 | 103–104, 111 |
| Denge: derişim ve tepkime hızı | MEBİ AYT Kimya Konu Özetleri, Kimyasal Denge | 70–71, 75 | 68–69, 73 |
| DNA eşlenmesi: eski ve yeni zincirler | MEBİ AYT Biyoloji Konu Özeti, Bölüm 2 (tam kitabın PDF 123–244 kesiti), DNA’nın Kendini Eşlemesi | 38–40, bölüm dosyasında | 158–160 |

Uygulamanın kaynak kutusu hem dosya içi PDF hem basılı sayfa numarasını verir.
Biyoloji kesitinin yerel sayfa numarası tam kitabın sayfasıyla aynı değildir.
Mevcut kütüphane içe aktarma ve PDF sayfaya gitme işlevleri bu dosyalar için de geçerlidir.

## Kavram kontrolü ve çizimin sınırları

- **Türev:** Kiriş eğimi, h ≠ 0 için fark oranıdır. x² üzerinde sağdan/soldan yaklaşım
  2a’ya gider. |x| modelinin 0 noktasında sağ/sol değerler farklıdır; tek teğet/türev
  çizilmez. Bu iki örnek, bütün fonksiyonlar için türev varlığı kanıtı değildir.
- **Elektrik:** Alan ve kuvvet farklı niceliklerdir. Kaynaktaki denklemlerle birlikte
  E = F/q ve F = qE ilişkileri ve birimler kontrol edildi. Model tek sabit noktasal
  kaynağın sağındaki noktayı ve boşluktaki k ≈ 9×10⁹ değerini kullanır. Test yükünün
  kaynağa etkisi ihmal edilir. Oklar yalnız yön gösterir; büyüklük sonuç satırındadır.
- **Denge:** Kaynakta ileri/geri hız eşitliği, eşit olması gerekmeyen sabit derişimler
  ve katalizör etkisi karşılaştırıldı. Model, kapalı ve sabit hacimli tek basamaklı
  A ⇌ B için v(ileri)=0,6[A], v(geri)=0,3[B] kullanır. Toplam 3 mol/L, Kc=2;
  denge [A]=1, [B]=2’dir. Katalizör iki sabiti üç katına çıkarır. Bu basit hız yasası
  her kimyasal tepkimeye genellenmez. Katalizör seçimi zamanı sıfırlar: başlangıçtan
  beri katalizör bulunan ayrı bir koşul karşılaştırılır. Sonlu zamanda yuvarlanmış
  yaklaşım gösterilir; matematiksel denge sınırı ayrı yazılır.
- **DNA:** İki atasal zincir korunur; her yeni DNA bir eski/bir yeni zincir içerir.
  A–T/G–C eşleşmesi, antiparalel yerleşim ve yeni sentezin 5′→3′ yönü kontrol edildi.
  Altı baz çiftlik molekül düzeyi şemada enzim, primer ve replikasyon çatalının
  konumları veya Okazaki parçaları çizilmez. İki ok, sayfa üzerinde ters yönde olsa
  da her yeni zincirin kendi 5′→3′ yönünü gösterir. Baz eşleşmesi çizgileri hidrojen
  bağlarının tek tek sayısını temsil etmez. Gerçek ölçekte molekül modeli değildir.

## Özgün alıştırmaların cevap denetimi

Seçenek harfleri uygulamada A/B/C’dir. Bunlar kaynak kitaplardan kopyalanmış ya da
resmî ÖSYM maddesi olarak sunulmuş sorular değildir.

| Set | Soru kimlikleri | Doğru seçenekler | Bağımsız kontrol |
| --- | --- | --- | --- |
| Türev | dt-1 … dt-5 | B, C, A, B, C | (2,5²−2²)/0,5 = 4,5; f′(2)=4; f′(−1)=−2; köşede sağ/sol eğimler −1/+1 |
| Elektrik | ef-1 … ef-5 | B, B, C, A, B | 9.000 / 2² = 2.250 N/C; negatif q kuvveti ters çevirir; q iki katına çıkınca sabit E’de kuvvet iki kat olur |
| Denge | eq-1 … eq-5 | B, C, A, C, C | Kc=2/1=2; toplam 6 ve B=2A için A=2, B=4; katalizörde hız sabitlerinin oranı değişmez |
| DNA | dna-1 … dna-5 | B, C, A, B, C | 6 baz çifti için iki yeni 6’lı zincir = 12 nükleotit; iki turda 8 zincirin 2’si başlangıçtan, 6’sı sonradan |

Bu setler için normal arayüzden yapılan cevaplama akışında 5/5 sonuç ve kalıcı
oturum kaydı kontrol edilir. Sayısal modellerin ek testleri; işaret/birim, ters-kare
oranı, derişim korunumu, katalizör-zaman ölçeği ve DNA tamamlayıcılığını kapsar.

## Devam eden kapsam

Toplam hazır içerik 13 etkileşimli anlatım ve 65 özgün alıştırmadır. 341 ana konu
başlığı ve 479 ayrıntılı kaynak başlığı aynı kalır. Arşivdeki bütün soruların tek tek
aktarımı, resmî cevap anahtarlarının tamamının denetimi ve tüm yıl kapsamı bitmiş
sayılmaz. Kullanıcı bu görsellerle oynadığında öğrenme puanı oluşmaz; bağımsız soru
cevapları ayrı Sorular akışında kaydedilir. YKS puanı veya başarı artışı iddiası yoktur.
