export const permutationSource032Sections = [
  {
    title: "Önce sonucun ne olduğunu belirle",
    paragraphs: [
      "Bir ödül töreninde Ada birinci ve Can ikinci olduğunda yazılan sonuç (Ada, Can) olur. Can birinci ve Ada ikinci olduğunda liste değişir. Bir ekipte yalnız üyeler yazılır. Aynı iki kişiyi farklı sırada okumak yeni ekip üretmez. Sonuç bir liste veya rol dağılımıysa sıra, yalnız üyelikse seçim önemlidir.",
      "Altı kişiden başkan ve yardımcı seçerken ilk görev için altı aday, ikinci görev için ilk aday hariç beş aday vardır. Her ilk seçim beş farklı sonuç verir, 6·5=30. Aynı iki kişiden yalnız ekip yapılıyorsa her ekip iki rol sırasına karşılık geldiği için 30/2=15 ekip vardır.",
    ],
  },
  {
    title: "Her dolan yuva bir seçeneği eksiltir",
    paragraphs: [
      "n farklı elemanı olan bir kümeden r farklı elemanı sıraya koy. İlk yuva n, ikinci n−1, son yuva n−r+1 seçenek taşır. 0≤r≤n iken çarpım P(n,r)=n!/(n−r)! olur. n! sayısı 1’den n’ye kadar tam sayıların çarpımıdır. Kesirde kullanılmayan kuyruk çarpanları sadeleşir.",
      "n=7, r=3 için 7·6·5=210 sıralı üçlü vardır. r=0 için boş liste tek sonuçtur. r=n için P(n,n)=n!, çünkü 0!=1. r>n olursa aynı kişiye ikinci görev verilmiyorsa sonuç yoktur. Formülde negatif faktöriyel yazılmaz.",
      "Her yuvada üç sembolden yeniden seçim serbestse iki yuvaya 3·3 seçenek gelir. Bir sembolü en çok bir kez kullanma kuralı gelirse 3·2 seçenek kalır. Aynı nesnenin daha önce kullanılması ile iki özdeş kopyanın baştan verilmesi farklı koşullardır.",
      "A,A,B,C birer görev adayı değil, baştan verilmiş dört karttır. İki A’ya geçici ad verince 4!=24 görüntü elde edilir. A’ların adını silince her görüntü kendi aralarında 2! kez sayılmıştır. 24/2=12 görünür dizi vardır. Tekrarlı Permütasyon dersi bu bölmenin bütün gruplar için neden çalıştığını gösterir.",
    ],
  },
  {
    title: "Sabit, gerekli ve yasak öğeler açık bir yuva hesabı ister",
    paragraphs: [
      "Bir kişi dördüncü sıraya sabitse o yuva artık seçilmez. Kalan kişiler ve boş yuvalar baştan belirlenir. Bir kişi herhangi bir yuvada olmak zorundaysa önce o kişinin yerini seç, sonra boş yuvaları doldur. Hiç görünmeyecek bir kişiyi aday listesinden baştan çıkar.",
      "Bir rakamı iki koşul birlikte sınırlıyorsa önce seçenekleri ayır. 0,1,2,3,4 ile üç basamaklı tek sayı için son 1 veya 3 olabilir. Her son seçiminde yüzler üç sıfır dışı kullanılmamış rakamdan, onlar kalan üç rakamdan seçilir. Toplam 2·3·3=18. Bir kodda baştaki 0’a izin veriliyorsa ilk yuva hesabı değişir.",
      "Ayrık son durumların sayıları her zaman eşit değildir. 0,1,2,3’ten üç basamaklı farklı rakamlı çift sayı yap. Son 0 iken yüzler üç, onlar iki seçim verir ve 6 sonuç çıkar. Son 2 iken yüzler yalnız 1 veya 3, onlar kalan iki rakamdır ve 4 sonuç çıkar. Ayrık son durumları 6+4=10 olarak topla.",
    ],
  },
  {
    title: "Komşu olanları birlikte say, sadece önce gelenleri eşleştir",
    paragraphs: [
      "Altı farklı kişi arasında A ve B bitişik olacaksa bir blok ve dört kişi dizilir. Beş nesne 5! sırada, blok kendi içinde AB veya BA biçiminde, toplam 2·5!=240. Komşu olmama sayısı bütün 6! diziliş içinden 240 çıkarılınca 480’dir.",
      "A, B’nin önünde olsun koşulunda aralarına başka kişiler girebilir. Her sırada A ve B’yi değiştir. İki farklı sıra oluşur ve tam biri A önde koşulunu sağlar. Altı farklı kişide bu yüzden 6!/2=360 sıra vardır. Üçüncü bir kural değiştirmeyi engelliyorsa yarıya bölme adımını kullanmadan önce yeni koşulu incele.",
    ],
  },
  {
    title: "Birbirinden ayrı kişilere ayrı boşluklar ver",
    paragraphs: [
      "Önce k sıradan kişiyi diz. Başta ve sonda birer, yan yana iki sıradan kişi arasında birer boşluk vardır. Toplam k+1 boşluk. r özel kişinin hiçbir ikisi komşu olmayacaksa r farklı boşluk seçip bu kişileri yerleştir. C(k+1,r), hangi boşlukların kullanılacağını seçer. C(n,r)=n!/[r!(n−r)!], n seçenekten sıra gözetmeden r tanesini seçme sayısıdır. r!, farklı kişileri bu yerlerde sıralar. r>k+1 ise koşul sağlanamaz.",
      "Dört sıradan ve üç özel kişi için 4!·C(5,3)·3!=1.440 sıra vardır. Boşlukları seçme ile farklı üç kişiyi yerleştirme adımlarını ayrı yaz. Şekilde her özel karttaki iki tarafı kontrol et. Yalnız A ile B’yi ayırmak C’nin de ayrı olmasını sağlamaz.",
    ],
  },
  {
    title: "Çemberde ilk ve son da komşudur",
    paragraphs: [
      "Farklı n kişi yuvarlak masada oturuyor ve yalnız döndürmeler aynı sayılıyorsa bir kişiyi sabitle, kalan n−1 kişiyi sırala. (n−1)! sonuç çıkar. Yansımadan sonra saat yönü sırası değişir. Yansımanın da aynı kabul edilmesi soru tarafından belirtilirse bu ayrıca ele alınır.",
      "Sıradan k kişi çemberde k boşluk ayırır. Çemberi kesip baş ve son diye iki ayrı boşluk yazmak aynı aralığı iki kez sayar. Etiketli sandalyeler için her dönük konum ayrı sonuçtur. Farklı kişilerle her dönüş grubunda n yerleşim olduğu için etiketsiz sonuç n ile çarpılır.",
      "Altı farklı kişinin etiketsiz çemberinde A ve B önce komşu sayılır. 2·4!=48 bitişik düzen vardır, bütün 5!=120 düzenden çıkarınca 72 kalır. A’yı sabitleyip B’ye üç komşu olmayan yer ve diğer kişilere 4! sıra ayırarak da 72 bulunur. Numaralı altı koltukta aynı koşulla 6·72=432 yerleşim vardır.",
    ],
  },
  {
    title: "Birbirine karışabilen gruplara önce yer ayır",
    paragraphs: [
      "Bir grubun iç sırası belirli olsa da üyeleri yan yana gelmek zorunda olmayabilir. Önce grubun kullanacağı konumları seç, sonra o konumları sırayla doldur. Diğer grubun içindeki kısıtları kalan konumlara uygula. Birini blok saymak grupların iç içe geçebileceği düzenleri eksiltir.",
      "Örnek olarak altı görevde K, L, M bu sırada, R ve S ise T’den önce olsun. K, L, M için C(6,3)=20 konum üçlüsü seçilir ve bu görevlerin sırasını koşul belirler. Kalan üç yerin sonuna T gider. R ve S önceki iki yerde iki biçimde değişir, toplam 40. Sıralar bağımsız iki konum grubuna bağlandığı için her yer çifti aynı sayıda tamamlanır.",
    ],
  },
];
