import {txt,type Lesson,type Question}from'../domain/model';
import type{GuideSection,LessonGuide,WorkedExample}from'./guides/types';
function bounded020(n:number,min:number,max:number){if(!Number.isFinite(n)||n<min||n>max)throw new RangeError('GEOGRAPHY_020_RANGE');return n;}
function option020<T extends object>(map:T,key:string):T[keyof T]{if(!Object.hasOwn(map,key))throw new RangeError('GEOGRAPHY_020_OPTION');return map[key as keyof T];}
function flag020(b:boolean){if(typeof b!=='boolean')throw new RangeError('GEOGRAPHY_020_BOOLEAN');}
const rad020=(deg:number)=>deg*Math.PI/180;
export const seasons020={march:{name:'Mart ekinoksu',declination:0,period:'Kuzeyde ilkbahar, güneyde sonbahar başlangıcı'},june:{name:'Haziran gündönümü',declination:23.5,period:'Kuzeyde yaz, güneyde kış başlangıcı'},september:{name:'Eylül ekinoksu',declination:0,period:'Kuzeyde sonbahar, güneyde ilkbahar başlangıcı'},december:{name:'Aralık gündönümü',declination:-23.5,period:'Kuzeyde kış, güneyde yaz başlangıcı'}}as const;
export function earth020(latitude:number,season:string,tilted:boolean,rod:number){bounded020(latitude,-80,80);bounded020(rod,.5,3);flag020(tilted);const s=option020(seasons020,season),declination=tilted?s.declination:0,altitude=90-Math.abs(latitude-declination),q=-Math.tan(rad020(latitude))*Math.tan(rad020(declination)),polarBoundary=Math.abs(latitude)+Math.abs(declination)>=90,daylight=polarBoundary?(latitude*declination>0?24:0):q<=-1?24:q>=1?0:24*Math.acos(q)/Math.PI,night=24-daylight,shadow=altitude<=0?null:Math.abs(altitude-90)<1e-10?0:rod/Math.tan(rad020(altitude)),sunDirection=altitude<=0?'Ufuk üstünde değil':Math.abs(latitude-declination)<1e-10?'Başucu':latitude>declination?'Güney':'Kuzey';return{...s,latitude,season,tilted,rod,declination,altitude,daylight,night,shadow,sunDirection,limit:'İdeal küre, yatay ufuk, noktasal Güneş; atmosfer kırılması ve yerel engel yok. Dört tarihin deklinasyonu yaklaşık 0/±23,5°; gerçek yılın kesin gözlemi değildir. Süre saat, açı derece, dik çubuk ve gölge metredir. Eğiklik kapalıysa yalnız eğiklik kaynaklı yıllık fark kaldırılır; bütün sıcaklık etkenleri yok sayılmaz.'};}
export const positionContexts020={coast:{name:'Denize açık kıyı',height:100,nearSea:true,barrier:false,proof:'Bu alternatif ders sahnesinde kıyı ve açık deniz bağı verildi. Deniz etkisi beklenebilir; gerçek sıcaklık veya yağış sayısı verilmez.'},barrier:{name:'Denize yakın, dağ ardı',height:100,nearSea:true,barrier:true,proof:'Deniz yakın olsa da verilen dağ sırası deniz etkisini içeri taşıyan hava akışını sınırlar. Yakınlık ile etkiye açıklık aynı şey değildir.'},plateau:{name:'Yüksek iç alan',height:1800,nearSea:false,barrier:false,proof:'Bu alternatif ders sahnesi denizden uzak ve 1800 m yüksektir. Yükselti ve denizden uzaklık göreceli koşuldur; yalnız enlem ve boylamdan gerçek iklim bulunmaz.'}}as const;
export function position020(latitude:number,longitude:number,context:string){bounded020(latitude,-80,80);bounded020(longitude,-180,180);const c=option020(positionContexts020,context),absolute=Math.abs(latitude),parallelKmPerDegree=111*Math.cos(rad020(latitude)),meridianKm=111*absolute,antimeridian=longitude===0?180:longitude>0?longitude-180:longitude+180,zone=absolute===23.5?'Dönence':absolute===66.5?'Kutup dairesi':absolute<23.5?'Tropikal kuşak':absolute<66.5?'Orta kuşak':'Kutup kuşağı',zenithPasses=absolute<23.5?2:absolute===23.5?1:0,latitudeSide=latitude===0?'Ekvator':latitude>0?'Kuzey':'Güney',longitudeSide=longitude===0?'Başlangıç meridyeni':Math.abs(longitude)===180?'180° meridyeni':longitude>0?'Doğu':'Batı';return{...c,latitude,longitude,latitudeSide,longitudeSide,zone,zenithPasses,parallelKmPerDegree,meridianKm,antimeridian,equinoxNoon:90-absolute,rotationSpeed:1670*Math.cos(rad020(latitude)),limit:'Özgün X noktası için geometri ile alternatif çevre sahneleri ayrı deneydir; gerçek şehrin arazi veya iklim ölçümü değildir. Aynı koordinatı koruyarak yalnız bağlam varsayımı değişir. 111 km/° ve 1670 km/saat küresel ders yaklaşımıdır; Ekvator uzaklığı meridyen yayı, boylam aralığı aynı paralel üzerindedir. Matematik kuşak gerçek iklim tipini tek başına vermez.'};}
export const mapScales020=[25000,50000,100000,200000,250000,500000]as const;
export const mapZooms020=[.5,1,2]as const;
export const contourIntervals020=[20,50,100]as const;
export function map020(denominator:number,zoom:number,paperCm:number,rise:number,interval:number){bounded020(denominator,25000,500000);if(!Number.isInteger(denominator))throw new RangeError('GEOGRAPHY_020_INTEGER');if(!(mapZooms020 as readonly number[]).includes(zoom))throw new RangeError('GEOGRAPHY_020_ZOOM');bounded020(paperCm,1,8);bounded020(rise,20,400);if(!(contourIntervals020 as readonly number[]).includes(interval))throw new RangeError('GEOGRAPHY_020_CONTOUR');const groundKm=paperCm*denominator/100000,groundMetres=groundKm*1000,effectiveDenominator=denominator/zoom,shownCm=paperCm*zoom,shownArea=shownCm**2,groundArea=groundKm**2,slopePercent=rise/groundMetres*100,slopePerMille=rise/groundMetres*1000,base=100,top=base+rise,contours=Array.from({length:Math.floor(top/interval)-Math.ceil(base/interval)+1},(_,i)=>Math.ceil(base/interval)*interval+i*interval).map(height=>({height,fraction:(height-base)/rise,xMetres:(height-base)/rise*groundMetres}));return{denominator,zoom,paperCm,rise,interval,groundKm,groundMetres,effectiveDenominator,shownCm,shownArea,groundArea,slopePercent,slopePerMille,base,top,contours,verticalRatio:groundMetres/550,limit:'Özgün kare alan ve soldan sağa doğrusal yükselen düz yamaç. Başlangıç kâğıt kenarı cm, 1:N boyutsuz; boyut çarpanı iki yönde aynıdır. Gerçek yatay mesafe ve arazi zoom ile değişmez. Profilin yatay 220 px, düşey 400 m için 160 px ölçekleri farklıdır; düşey/yatay oranı ayrıca verilir. Ekranı cetvelle ölçerek kâğıt cm değeri bulunmaz; bütün değerler sayısal örnektir.'};}

type Unit020 = {id:string;topic:string;title:string;minutes:number;objectives:string[];sections:GuideSection[];examples:WorkedExample[];recall:LessonGuide['recall'];items:[string,string,string[],string,string][];source:string;};
const data:Unit020[] = [
  {
    "id": "dunya-sekli-hareket",
    "topic": "detail-74",
    "title": "Dünya’nın şekli ve hareketleri: ışın, gün ve mevsim",
    "minutes": 110,
    "objectives": [
      "Günlük dönüş, dolanma ve eksen eğikliğinin farklı sonuçlarını açıkla.",
      "Yerel öğle açısını, dik çubuk gölgesini ve gündüz süresini uygun koşulla yorumla.",
      "Geometrik model ile gerçek sıcaklık, ufuk ve takvim koşullarını ayır."
    ],
    "sections": [
      {
        "title": "Küreye yakın ama tam küre değil",
        "paragraphs": [
          "Dünya’nın Ekvator yarıçapı kutup yarıçapından büyüktür; kutuplardan basık, Ekvator çevresinde şişkin genel biçim bir dönel elipsoidle yaklaşık modellenebilir. Ders kaynakları bu kendine özgü biçim için geoit adını da kullanır. Hassas jeodezide geoit yer çekimiyle tanımlanan bir eşpotansiyel yüzeydir; referans elipsoid ve gerçek dağlı yüzey aynı şey değildir.",
          "Küresellik ile basıklığı ayrı düşün. Paralel çemberlerinin kutba doğru kısalması küresel geometriyle açıklanabilir; Ekvator ve kutup yarıçaplarının eşit olmaması basıklıkla ilgilidir. Etkin yer çekiminin enlemle değişmesinde şekil ve dönüş birlikte rol oynar; tam küre varsaymak dönüş etkisini otomatik yok etmez."
        ]
      },
      {
        "title": "Küreselliğin görünür sonuçları",
        "paragraphs": [
          "Küresel yüzeyin farklı yerlerinde yerel yatayın yönü değişir. Yaklaşık paralel gelen Güneş ışınları bu yüzden her noktada aynı açıyla karşılanmaz. Dünya’nın aydınlık ve karanlık tarafları ile düz haritalarda bütün geometrik özellikleri birlikte koruyamama bu biçimle ilişkilidir.",
          "Daha yüksekte daha geniş bir ufuk görülebilir; paralellerin çevresi ve iki meridyen arasındaki doğu-batı uzaklığı kutuplara doğru daralır. Bu ortak geometriden bütün kentlerin sıcaklığı, deniz tuzluluğu veya tarım ürünü tek başına çıkarılmaz. Su, yükselti, akıntı ve insan etkinlikleri gibi başka etkenler de bulunur."
        ]
      },
      {
        "title": "Açı hangi yüzeyden ölçülüyor?",
        "paragraphs": [
          "Güneş’in yükseklik açısı yerel yatay ufuk ile Güneş doğrultusu arasındaki açıdır. Ufukta yaklaşık 0°, başucunda 90° olur. Yatay zemindeki dik bir çubuk için bu açı büyüdüğünde gölge kısalır. Yamaç yüzeyine geliş açısı ise yamaç yönü ve eğiminden ayrıca etkilenir.",
          "Aynı enlemde iki yamaç farklı ışın alabilir; aynı resmî saatte farklı boylamlarda Güneş aynı yükseklikte olmayabilir. Enlem karşılaştırmasında tarih, yerel Güneş zamanı ve yüzey koşulunu belirt. Açıyı derece, süreyi saat, gölgeyi metre ile ifade etmek farklı nicelikleri karıştırmayı önler."
        ]
      },
      {
        "title": "Günlük dönüşün yönü ve zaman",
        "paragraphs": [
          "Dünya ekseni çevresinde batıdan doğuya döner; bu yüzden Güneş’in günlük görünür hareketi genel olarak doğudan batıya olur. Gece ve gündüzün art arda gelmesi ile boylama bağlı yerel saat farkı bu dönüşle ilişkilidir. Mevsimsel gündüz uzunluğu değişimi ise yalnız günlük dönüşün yönüyle açıklanmaz.",
          "Ders hesaplarında ortalama Güneş günü yaklaşık 24 saat ve 360° için kullanılır; buradan 15°/saat ve 1° için yaklaşık 4 dakika bulunur. Uzak yıldızlara göre bir dönüş yaklaşık 23 saat 56 dakikadır. Dünya aynı zamanda yörüngede ilerlediği için bu iki referans aynı süreyi vermez; günlük soru modelinin hangisini kullandığını belirtiriz."
        ]
      },
      {
        "title": "Açısal hız ve çizgisel hız",
        "paragraphs": [
          "Aynı süre içinde Dünya’nın bütün noktaları aynı dönüş açısını tarar; açısal hız bu anlamda ortaktır. Fakat Ekvator çevresindeki bir noktanın katettiği yol, kutba yakın küçük çemberdekinin yolundan daha büyüktür. Çizgisel dönüş hızı bu yüzden Ekvator’da en büyük, kutuplara doğru daha küçüktür.",
          "Küresel ders yaklaşımında Ekvator’daki yaklaşık 1670 km/saat değeri enlemin kosinüsüyle çarpılarak başka paraleldeki hız örneklenebilir. Bu değer bir aracın yere göre sürati değildir; Dünya’nın dönüşünden gelen çember hareketidir. Aynı açısal hızın aynı kilometreyi gerektirmediğini bir büyük ve bir küçük çember üzerinde düşün."
        ]
      },
      {
        "title": "Dönen sistemde akışın sapması",
        "paragraphs": [
          "Atmosfer ve okyanus akışları dönen Dünya üzerinde izlenir. Coriolis etkisi kuzey yarım kürede hareketin sağına, güneyde soluna yönelen sapmayla anlatılır; Ekvator’a yaklaşırken bu etkinin ilgili bileşeni zayıflar. Sapma yönü doğrudan her rüzgârın doğuya eseceği anlamına gelmez, hareket yönüne göre tanımlıdır.",
          "Rüzgâr ve akıntının gerçek yolu basınç farkı, sürtünme, yer şekli ve başka etkenlerden de etkilenir. Bu sapmayı yalnız merkezkaç kuvvetinin adıyla açıklamayız. 30° ve 60° çevresindeki dinamik basınç kuşakları da büyük ölçekli dolaşımın ders modelidir; bütün kentlerde her gün tam aynı basınç ölçülmesini gerektirmez."
        ]
      },
      {
        "title": "Gün içi ısınma ve gölge döngüsü",
        "paragraphs": [
          "Dönüşle Güneş’in yükseklik açısı gün içinde değişir; aydınlanma ve gölge buna göre değişebilir. Kara ile suyun farklı ısınıp soğuması günlük basınç farklarını ve uygun kıyı koşullarında meltemleri besleyebilir. Günlük sıcaklık farkları fiziksel ayrışmaya da katkı sağlayabilir; tek bir süreç bütün ayrışma türlerini açıklamaz.",
          "En yüksek Güneş açısı yerel öğlede görülse de en yüksek hava sıcaklığı enerji birikimi nedeniyle daha sonra olabilir. Öğle açısı ile günün en sıcak saati aynı tanım değildir. Bulut, rüzgâr, nem ve zemin sıcaklık döngüsünü değiştirebilir; yalnız gölge boyundan gerçek hava sıcaklığı hesaplanmaz."
        ]
      },
      {
        "title": "Yörüngede dolanma ve elips",
        "paragraphs": [
          "Dünya Güneş çevresinde elipse yakın bir yörüngede dolanır. Bir yıl için kaynakların verdiği 365 gün 6 saat ders yaklaşımıdır; farklı astronomik yıl tanımları ve takvim düzeni nedeniyle bunu her yılın kesin ölçüsü saymayız. Yörüngenin düzlemi ekliptik, dönüş ekseni ise kutuplardan geçen varsayımsal doğrudur.",
          "Dünya Güneş’e yaklaşırken yörünge hızı artar, uzaklaşırken azalır. Günberi ocak, günöte temmuz başı dolayındadır; kesin gün yıla göre değişebilir. Uzaklık ve hız değişimi mevsimlerin sürelerine katkı yapar, fakat aynı anda iki yarım kürede zıt mevsimleri açıklayan temel mekanizma uzaklık değildir."
        ]
      },
      {
        "title": "Eksen eğikliğinde iki açıyı ayır",
        "paragraphs": [
          "Dönüş ekseni, yörünge düzlemine dik doğrultuyla yaklaşık 23,5° yapar. Ekvator düzlemi ile yörünge düzlemi arasındaki açı da yaklaşık 23,5°’dir; eksenin yörünge düzlemiyle açısı ise bunun tümleyeni yaklaşık 66,5° olur. Kaynaklarda 23°27′ ve 66°33′ değerleriyle de karşılaşırsın; model yuvarlatılmış değerleri kullanır.",
          "Eksenin uzaydaki yönü bir yıllık ders modelinde yaklaşık korunurken Dünya Güneş çevresinde yer değiştirir. Bir yarım kürenin daha çok Güneş’e dönük olması öğle açısını ve gündüz süresini artırabilir. İki yarım kürenin karşıt astronomik mevsimleri bu yönelimle açıklanır; bütün enlemlerin aynı hava sıcaklığını alması gerekmez."
        ]
      },
      {
        "title": "Haziran gündönümü",
        "paragraphs": [
          "Haziran gündönümünde öğle dik ışının ulaştığı enlem yaklaşık 23,5° kuzey, Yengeç Dönencesi’dir. Kuzey yarım kürede astronomik yaz, güneyde kış başlangıcı olarak kullanılır. İdeal modelde kuzeye gidildikçe gündüz uzar; kuzey kutup dairesi ve ötesinde uygun enlemlerde 24 saatlik gündüz görülür.",
          "Bu tarihten sonra kuzeyde gündüz süreleri genel olarak kısalmaya başlar; hemen geceden kısa olmuş sayılmaz. Eylül ekinoksuna kadar kuzeyin kutup dışı birçok yerinde gündüz hâlâ daha uzundur. En uzun gün ifadesi süre karşılaştırmasıdır; o günün her yerde yılın en yüksek sıcaklığını vermesi zorunlu değildir."
        ]
      },
      {
        "title": "Aralık gündönümü",
        "paragraphs": [
          "Aralık gündönümünde öğle dik ışın yaklaşık 23,5° güney, Oğlak Dönencesi’ne ulaşır. Güneyde astronomik yaz, kuzeyde kış başlangıcıdır. Güney kutup dairesi ve ötesindeki uygun enlemler uzun veya 24 saatlik gündüz yaşarken kuzeyde kutup gecesi görülebilir. Aynı tarih karşı yarım kürede aynı mevsimi yaratmaz.",
          "Güneyde gündüzün kısalmaya başlaması ile kuzeyde gündüzün uzamaya başlaması birlikte gerçekleşir. Kutup gündüzü veya gecesi bir noktanın gerçek hava sıcaklığını tek başına vermez; buz, deniz, atmosfer ve enerji kaybı da rol oynar. Deneyde kuzey ve güney enlemlerini işaretleriyle değiştirerek karşıtlığı gör."
        ]
      },
      {
        "title": "Ekinoks ve ideal eşitlik",
        "paragraphs": [
          "Mart ve eylül ekinokslarında Güneş’in deklinasyonu yaklaşık 0° olur; yerel öğle dik ışın Ekvator’a gelir. İdeal küre, noktasal Güneş, düz yatay ufuk ve atmosfer kırılması olmayan modelde gündüz ile gece yaklaşık 12’şer saattir. Gerçekte Güneş diski, kırılma, yükseklik ve ufuk engelleri doğuş-batış süresini etkiler.",
          "Mart kuzeyde ilkbahar, güneyde sonbahar; eylül kuzeyde sonbahar, güneyde ilkbahar başlangıcı olarak kullanılır. Derslerdeki 21 Mart ve 23 Eylül yaklaşık takvim tarihleridir; her gerçek yılın aynı gün ve saatteki olayı değildir. İdeal eşitliği gerçek gözlem için sıfır fark güvencesine dönüştürme."
        ]
      },
      {
        "title": "Gündüz süresi ve kutup durumları",
        "paragraphs": [
          "Gündüz uzunluğu enlem ile Güneş’in deklinasyonuna birlikte bağlıdır. Kuzey 70° enleminde haziran yönelimi bütün günlük çemberi aydınlıkta bırakabilir; aralıkta öğle Güneşi bile ufuk altında kalabilir. Ekvator çevresinde yıllık süre farkı daha küçüktür; kutuplara yaklaşırken genel olarak büyür.",
          "Model 0–24 saat sınırlarını korur; 26 saat gündüz veya negatif gece üretmez. Güneş öğlede ufuk üstüne çıkmıyorsa yatay zeminde görünen bir Güneş gölgesi hesaplamak yerine tanımsız olarak bildiririz. Kaynaktaki yaklaşık altı aylık kutup dönemi her kutup enleminde aynı gün sayısı anlamına gelmez."
        ]
      },
      {
        "title": "Dik ışının ulaşabildiği kuşak",
        "paragraphs": [
          "Yaklaşık 23,5° kuzey ve güney arasındaki tropikal kuşakta yatay zemine yerel öğlede dik ışın ulaşabilir. İdeal yıllık döngüde dönencenin kendisinde bir, iç tropik enlemlerde iki geçiş olur. Dönencelerin dışındaki yatay yüzeylerde Güneş başucuna ulaşmaz; eğimli bir yamaç ayrı yüzey geometrisidir.",
          "Yaklaşık 66,5° kutup daireleri, en az bir gündönümünde sınır kutup gün-gece koşuluyla ilişkilidir. Tropikal, orta ve kutup kuşağı bu matematik geometriye dayanır; her tropik yer ekvatoral yağmur ormanı veya her orta kuşak yer aynı iklim değildir. İklim, bitki ve yaşam koşulları için başka veriler gerekir."
        ]
      },
      {
        "title": "Öğle yüksekliğini ve gölgeyi hesapla",
        "paragraphs": [
          "İdeal yerel öğle yüksekliği 90° − |enlem − deklinasyon| ile bulunur; kuzey artı, güney eksi kullanılır. 35° kuzeyde ekinoksta yükseklik 55°’dir. Haziran deklinasyonu +23,5° alınırsa 78,5°, aralık −23,5° alınırsa 31,5° olur. Aynı yerde yıllık fark böylece açı üzerinden açıklanır.",
          "Yatay zeminde dik çubuğun gölgesi, çubuk boyunun yükseklik açısının tanjantına bölünmesidir. Başucunda ideal gölge sıfırdır; ufuk altındaki Güneş için görünür gölge hesaplanmaz. Açı yükselirken gölge kısalır ama başka bir çubuk boyu veya başka eğimle doğrudan karşılaştırma yapmadan önce koşulları eşitle."
        ]
      },
      {
        "title": "Eğiklik sıfır deneyinden doğru sonuç çıkar",
        "paragraphs": [
          "Deneyde eğikliği kapatmak deklinasyonu bütün yıl 0° yapar. Aynı enlemde öğle açısı ve ideal gündüz süresi yılın dört döneminde aynı kalır; eğiklikten kaynaklanan astronomik mevsim farkı kalkar. Dünya’nın dönmesi ve dolanması yok olmaz, gece-gündüz art arda gelmeye devam eder.",
          "Bu düşünce deneyi gerçek Dünya’nın bütün yağış, sıcaklık veya uzaklık etkenlerini sıfırlamaz. Enlem, arazi ve diğer koşullar hâlâ farklıdır. Önce yalnız bir değişkeni kapat, sonra sabit kalanları belirt. Karşılaştırmanın gücü neden-sonucu ayırmasındadır; bir düğmeyle her fiziksel sürecin ortadan kalktığını söylemekte değildir."
        ]
      },
      {
        "title": "Kutup Yıldızı yüksekliğini enlemle bağla",
        "paragraphs": [
          "Kuzey gök kutbuna çok yakın görülen Kutup Yıldızı, kuzey enlemini kestirmede kullanılabilir. İdeal düz ufukta kuzey gök kutbunun ufuk üstü açısı kuzey enlemine eşittir; Kutup Yıldızı bu noktaya yakın olduğu için yaklaşık aynı ilişkiyi verir. Örneğin 40° kuzeyde yaklaşık 40° yükseklik beklenir; bu açı yıldızın yerden metre cinsinden yüksekliği değildir.",
          "Gerçek Kutup Yıldızı tam gök kutbunda bulunmaz; kırılma, ufuk engeli ve ölçüm koşulları gözlemi etkileyebilir. Ekvator yakınında yıldız ufuk çevresindedir; güney enlemlerinde çoğunlukla ufuk altında kalır. Ufuk ve kırılma sınırını belirtmeden tek bir mutlak görünürlük cümlesinden hassas konum hesabı çıkarma; güney yarımküre için aynı yıldızı yüksekte bir referans gibi kullanma."
        ]
      },
      {
        "title": "Tan ve gurup süresini ufku kesen yayla açıkla",
        "paragraphs": [
          "Güneş doğmadan önceki ve battıktan sonraki alacakaranlık, Güneş ufkun altındayken atmosferde saçılan ışıkla ilişkilidir. Günlük Güneş yolu ufku dikçe kesiyorsa belirli ufuk altı açı aralığını daha çabuk, yatık kesiyorsa daha yavaş geçebilir. Enlem ve tarih bu kesişme geometrisini birlikte değiştirir.",
          "Bu nedenle Ekvator’dan kutba doğru tan/gurup süresinin uzamasına ilişkin ders eğilimini yalnız çizgisel dönüş hızının azalmasına bağlamak eksiktir; açısal dönme hızı aynı kalırken Güneş yolunun ufka göre yönü değişir. Kutup çevresinde tarihe göre Güneş günlerce doğmayabilir veya batmayabilir. Belirli bir dakikalık alacakaranlık süresi için enlem, tarih, seçilen ufuk altı sınırı ve gerçek atmosfer koşulları gerekir."
        ]
      },
      {
        "title": "Işının atmosfer yolu ve mevsimsel kara–deniz farkı",
        "paragraphs": [
          "Güneş ışını aynı atmosfer koşullarında daha yatık geldiğinde yüzeye varmadan daha uzun bir atmosfer yolu izler; saçılma ve soğurulma etkisi artabilir. Aynı ışının yatay zemine yaydığı alan da büyür. Bu iki etki birbiriyle ilişkili ama ayrı açıklamalardır; gerçek ısınma için bulut, yüzey ve atmosfer bileşimi de değerlendirilir.",
          "Yıllık ışın ve gündüz süresi farkları kara ile denizin mevsim boyunca farklı ısınmasına katılır. Özellikle büyük kıta–okyanus düzenlerinde basınç ve dolaşımın mevsimsel değişimi muson akışını destekleyebilir. Muson, günlük meltemin yalnız uzatılmış adı değildir; kara–deniz farkıyla birlikte büyük ölçekli dolaşım, nem taşınması ve yer şekilleri önemlidir. Her kıyıda aynı musonun oluşacağı veya yalnız enlemin bütün yağışı belirlediği söylenmez."
        ]
      }
    ],
    "examples": [
      {
        "title": "İşaretli enlem farkı",
        "prompt": "İdeal yerel öğlede enlem 35° kuzey, deklinasyon 23,5° güney olarak verilmiştir. Güneş’in yatay ufka göre yüksekliği kaç derecedir?",
        "strategy": "Kuzeyi artı, güneyi eksi yazarak açısal farkı bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Enlem +35°, deklinasyon −23,5° yazılır; farklı yarım küreler aynı işaret alınmaz."
          },
          {
            "label": "2. adım",
            "explanation": "Mutlak fark |35 −(−23,5)| =58,5°’dir."
          },
          {
            "label": "3. adım",
            "explanation": "Yükseklik 90 −58,5 =31,5° olur; Güneş ufuk üstündedir."
          }
        ],
        "answer": "31,5°",
        "check": "Aynı 35° kuzeyde ekinoks değeri 55° olduğundan kış yöneliminin daha küçük açı vermesi tutarlıdır.",
        "pitfall": "35 ile 23,5’i her durumda çıkararak yön işaretini atlama."
      },
      {
        "title": "Tropik enlemde öğle yönü",
        "prompt": "10° kuzeyde haziran gündönümünde deklinasyon +23,5° alınmış. Öğle yüksekliği ve Güneş’in kuzey/güney yönü nedir?",
        "strategy": "Dik ışın enleminin gözlemciye göre nerede olduğunu bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Fark |10 −23,5| =13,5°’dir."
          },
          {
            "label": "2. adım",
            "explanation": "Yükseklik 90 −13,5 =76,5° olur."
          },
          {
            "label": "3. adım",
            "explanation": "Dik ışın enlemi gözlemcinin kuzeyindedir; öğle Güneşi kuzey yönündedir."
          }
        ],
        "answer": "76,5°; kuzey",
        "check": "Kuzey yarım kürede her yerde her tarihte öğle Güneşi güneyde değildir; iç tropik koşulu istisnayı açıklar.",
        "pitfall": "Yarım küre adından tek başına bütün öğle yönlerini çıkarma."
      },
      {
        "title": "Aynı çubuk iki açı",
        "prompt": "Yatay zemindeki dik çubuk 2 m’dir. Güneş yükseklik açıları 45° ve 30°; tan 45°=1, tan 30°=1/√3 verilmiştir. İdeal gölgeleri karşılaştır.",
        "strategy": "Gölgeyi çubuk boyu/tanjant ile bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "45°’de gölge 2/1 =2 m’dir."
          },
          {
            "label": "2. adım",
            "explanation": "30°’de gölge 2/(1/√3) =2√3 m, yaklaşık 3,46 m’dir."
          },
          {
            "label": "3. adım",
            "explanation": "Açı daha küçükken aynı çubuğun gölgesi daha uzundur."
          }
        ],
        "answer": "45°: 2 m; 30°: yaklaşık 3,46 m",
        "check": "2√3 değeri 2’den büyüktür; açı ile gölge boyunun ters değişimi doğrulanır.",
        "pitfall": "Aynı tanjant işlemini farklı boydaki çubuklara koşulsuz genelleme."
      },
      {
        "title": "Kutup gecesinde gölge",
        "prompt": "İdeal modelde enlem 70° kuzey, deklinasyon 23,5° güney. Öğle yüksekliği ve görünür Güneş gölgesi hakkında ne söylenir?",
        "strategy": "Önce ufuk üstünde Güneş bulunup bulunmadığını kontrol et.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İşaretli fark |70 −(−23,5)| =93,5°’dir."
          },
          {
            "label": "2. adım",
            "explanation": "Öğle yüksekliği 90 −93,5 =−3,5° çıkar; Güneş ufuk altındadır."
          },
          {
            "label": "3. adım",
            "explanation": "Modelde kutup gecesi vardır; görünür Güneş için yatay zeminde gölge boyu hesaplanmaz."
          }
        ],
        "answer": "−3,5°; görünür Güneş gölgesi yok",
        "check": "Negatif yüksekliği pozitif gölge formülüne zorla sokmak fiziksel olarak yanlış sonuç üretirdi.",
        "pitfall": "Her enlem ve tarihte mutlaka ufuk üstünde öğle Güneşi var sanma."
      }
    ],
    "recall": [
      {
        "prompt": "Günlük dönüş ile eğiklik birlikte hangi farkları açıklar?",
        "answer": "Dönüş ardışık gece-gündüzü; dolanma ve eğiklik yıllık öğle açısı ve gündüz süresi değişimini açıklar."
      },
      {
        "prompt": "23,5° hangi iki doğrultu için kullanılır?",
        "answer": "Eksen ile yörüngeye dik doğrultu; eşdeğer biçimde Ekvator düzlemi ile yörünge düzlemi. Eksenin düzlemin kendisiyle açısı yaklaşık 66,5°."
      },
      {
        "prompt": "Öğle açısında hangi işaret kuralı vardır?",
        "answer": "Kuzey artı, güney eksi; yükseklik 90°−|enlem−deklinasyon|. Ufuk altı sonuçta görünür Güneş gölgesi hesaplanmaz."
      },
      {
        "prompt": "Daha kısa gölge daha yüksek sıcaklığı kesin kanıtlar mı?",
        "answer": "Hayır. Aynı çubuk/yüzeyde yüksek Güneş açısını gösterebilir; sıcaklık için zaman, hava ve zemin gibi başka koşullar gerekir."
      }
    ],
    "items": [
      [
        "İdeal yerel öğlede enlem +35°, Güneş deklinasyonu −23,5° olarak verilmiştir. Yükseklik 90°−|enlem−deklinasyon| ise sonuç nedir?",
        "31,5°",
        [
          "78,5°",
          "55°",
          "58,5°",
          "113,5°"
        ],
        "İki farklı işaret arasındaki açısal farkı doğru al.",
        "|35−(−23,5)| =58,5°;90−58,5 =31,5°. Yönleri atıp yalnız 35−23,5 yapmak farklı tarihin sonucunu üretir."
      ],
      [
        "10° kuzeyde deklinasyon +23,5° iken ideal yerel öğle Güneşi hangi yönde, kaç derece yüksektedir?",
        "Kuzeyde, 76,5°",
        [
          "Güneyde, 76,5°",
          "Kuzeyde, 13,5°",
          "Güneyde, 90°",
          "Her zaman ufuk altındadır."
        ],
        "Dik ışın enlemi gözlemciden daha kuzeydedir.",
        "Enlem farkı 13,5°; yükseklik 76,5° olur. Güneş’in dik geldiği enlem gözlemcinin kuzeyinde kaldığı için öğle yönü kuzeydir."
      ],
      [
        "İdeal modelde 70° kuzeyde deklinasyon −23,5° alınmıştır. Öğle yüksekliği −3,5° çıkıyor. Hangi yorum doğrudur?",
        "Güneş ufuk altındadır; görünür öğle gölgesi hesaplanmaz.",
        [
          "Gölge boyu kesin−3,5 metredir.",
          "Gündüz süresi 26 saattir.",
          "Güneş kesin başucundadır.",
          "Gece süresi negatiftir."
        ],
        "Açının işareti ufka göre konumu gösterir.",
        "Negatif yükseklik Güneş’in ufuk altında olduğunu anlatır; metre cinsinden gölge değildir. Bu koşulda gündüz 0, gece 24 saatlik ideal kutup durumudur."
      ],
      [
        "Bir gün içinde aynı yerde Güneş’in görünür konumu değişiyor, gece ile gündüz art arda geliyor. Temel hareket hangisidir?",
        "Dünya’nın ekseni çevresinde dönüşü",
        [
          "Yalnız yörüngenin elips olması",
          "Dağların volkanik kökeni",
          "Sadece deniz akıntısının sıcaklığı",
          "Bir il sınırının değişmesi"
        ],
        "Gün içindeki döngüyle yıllık döngüyü ayır.",
        "Dönüş yüzeyin Güneş’e göre yönünü gün içinde değiştirir. Elips ve dolanma yıllık ilişkiler taşır; tek başına bu günlük ardalanmanın temel nedeni değildir."
      ],
      [
        "Aynı anda kuzey yarım kürede astronomik yaz, güneyde kış başlangıcı yaşanıyor. Bunun temel açıklaması nedir?",
        "Dolanma sırasında eksen eğikliğine bağlı farklı yönelim",
        [
          "Dünya’nın bütününün aynı anda Güneş’ten uzak olması",
          "Kuzeyde dönüşün durması",
          "Güneyde bütün meridyenlerin yok olması",
          "Her enlemde aynı güneş açısının bulunması"
        ],
        "Aynı uzaklıktaki tek Dünya üzerinde karşıt yarım küreleri düşün.",
        "İki yarım küre aynı Dünya–Güneş uzaklığındayken farklı açı ve gün süresi alabilir. Temel neden eğik eksenin dolanma sırasındaki yönelimidir."
      ],
      [
        "Dünya dönüşünde Ekvator ve 60° kuzey noktası aynı sürede aynı açıyı tarıyor. Hangisi doğrudur?",
        "Açısal hız aynı, çizgisel hız 60° kuzeyde daha küçüktür.",
        [
          "İkisinin çizgisel hızı zorunlu aynıdır.",
          "60° kuzeyin çemberi Ekvator’dan büyüktür.",
          "Ekvator dönmez.",
          "Aynı açı mutlaka aynı kilometredir."
        ],
        "Bir büyük ve bir küçük paralel çemberini karşılaştır.",
        "60° paralelinin çevresi daha kısadır; aynı dönüş süresinde daha az yol alınır. Açısal oran ortak olsa da kilometre/saat oranı farklıdır."
      ],
      [
        "Yatay zemindeki aynı dik çubukta Güneş yüksekliği 45°’den 30°’ye düşüyor. Başka engel yok. Gölge ne olur?",
        "Uzar",
        [
          "Kesin sıfır olur.",
          "Kısalır",
          "Negatif boy kazanır.",
          "Açıdan tamamen bağımsızdır."
        ],
        "Daha yatık ışının aynı yüksekliğe ulaşmak için yatay yolunu düşün.",
        "Gölge boyu h/tanα’dır. Açı küçülünce pozitif tanjant azalır ve aynı çubuğun gölgesi uzar; sıcaklık hakkında kesin sayı vermez."
      ],
      [
        "Eksen eğikliği sıfıra alınmış ideal küre deneyinde günlük dönüş sürüyor. Hangisi doğrudur?",
        "Eğiklik kaynaklı yıllık açı farkı kalkar, günlük gece-gündüz döngüsü sürer.",
        [
          "Dünya’nın dönüşü mutlaka durur.",
          "Bütün yerlerin sıcaklığı kesin eşit olur.",
          "Güneş çevresinde dolanma yok olur.",
          "Her yerde sürekli 24 saat gündüz olur."
        ],
        "Değiştirilen tek parametreyle sabit kalan hareketi ayır.",
        "Eğiklik kapanınca deklinasyon sürekli 0° olur; aynı enlemde yıllık açı ve süre farkı kalkar. Dönüş devam ettiği için günlük döngü ve enlemler arası farklar yok olmaz."
      ],
      [
        "İdeal ekinoks modelinde enlem 40° güney, deklinasyon 0°’dir. Yerel öğle yüksekliği nedir?",
        "50°",
        [
          "40°",
          "90°",
          "130°",
          "−50°"
        ],
        "Enlem işaretini mutlak açı farkında kullan.",
        "90−|−40−0| =50° bulunur. Güneyde olmak açıyı negatif yapmaz; ufka göre yükseklik pozitif olduğunda Güneş görünür."
      ],
      [
        "Kuzeyde yaz gündönümünden sonraki günlerde gündüz kısalmaya başlamıştır. Yalnız bu bilgiyle hangisi söylenemez?",
        "Gündüz hemen geceden kısa olmuştur.",
        [
          "Gündüz önceki güne göre azalabilir.",
          "Kısalma ile geceyi aşma farklı karşılaştırmalardır.",
          "Ekinoksa kadar gündüz hâlâ uzun olabilir.",
          "Yıllık yönelim değişimi süreyi etkiler."
        ],
        "Azalma eğilimi ile 12 saat sınırını ayır.",
        "En uzun gündüzden sonra azalan süre uzun bir dönem 12 saatin üstünde kalabilir. Bir önceki güne göre kısa olması geceden de kısa olduğunu zorunlu kılmaz."
      ]
    ],
    "source": "Aurelia Dünya’nın Şekli ve Hareketleri kâğıdı; OGM 9. Sınıf Dersler Cepte PDF 10–14,21; MEBİ TYT Coğrafya PDF 16–20 ile karşılaştırılmış özgün öğretim ve sorular. Sayısal Güneş modeli ideal, kırılmasız küre yaklaşımıdır."
  },
  {
    "id": "cografi-konum",
    "topic": "detail-75",
    "title": "Coğrafi konum: koordinat, zaman ve çevre",
    "minutes": 105,
    "objectives": [
      "Enlem ve boylamı yön ve açı birimleriyle oku.",
      "Mutlak geometriyi göreceli çevre etkilerinden ayır.",
      "Mesafe, antimeridyen ve yerel/ortak saat farkını doğru koşulla hesapla."
    ],
    "sections": [
      {
        "title": "Konumu iki ayrı soru olarak düşün",
        "paragraphs": [
          "Mutlak konum bir yerin Ekvator ve başlangıç meridyenine göre enlem-boylam değerleriyle belirtilmesidir. Göreceli konum ise o yerin denize, yer şekillerine, yollar ve pazarlara, kaynaklara veya başka alanlara göre ilişkileridir. Koordinat çifti nerede sorusunu yanıtlar; çevredeki bütün koşulları tek satırda açıklamaz.",
          "Bir kıyı kentiyle aynı enlemdeki iç kent benzer Güneş geometrisine sahip olabilir ama aynı sıcaklığı veya yağışı almak zorunda değildir. Yükselti, dağ sırası, deniz etkisi ve insan ağı farklı olabilir. İki konum türü rakip değildir; aynı yerin açıklanmasında farklı bilgileri bir araya getirir."
        ]
      },
      {
        "title": "Enlemi açı ve yön olarak oku",
        "paragraphs": [
          "Enlem bir noktanın Ekvator’a göre açısal kuzey veya güney konumudur. Ekvator 0°, kutuplar 90° değerindedir; kuzey ve güney yönü yazılmadan örneğin 35° tek başına yarım küreyi belirlemez. Hesapta kuzey artı, güney eksi kullanmak karşılaştırmayı açık hâle getirir.",
          "Paralel aynı enlemdeki noktaların çemberidir; kutup sınırında çember bir noktaya iner. Bir derece aralıkla çizilen ders çizgileri bir gösterim tercihidir; enlem yalnız tam sayılarla sınırlı değildir. Ondalık derece veya derece-dakika-saniye biçimleri aynı açısal bilgiyi farklı yazabilir; dakika adı zaman dakikasıyla karıştırılmaz."
        ]
      },
      {
        "title": "Paralel çemberleri ve meridyen yayları",
        "paragraphs": [
          "Ekvator en uzun paraleldir; kuzey veya güneye gidildikçe paralellerin çevresi küçülür. Meridyenler iki kutbu birleştiren yarım çember yaylarıdır ve Ekvator’u dik keser. Küresel modelde meridyenlerin boyu eşit, iki meridyenin aynı paraleldeki aralığı ise enleme bağlıdır.",
          "Başlangıç meridyeni Greenwich üzerinden 0° olarak tanımlanır; doğu ve batı boylamları 180°’ye kadar adlandırılır. +180° ile−180° aynı fiziksel meridyenin iki yazımıdır. Bir tam derecelik çizgi tablosu kurarken bu ortak sınırı iki ayrı yer gibi saymayız; çizgi sayısı sorusu ancak hangi uçların sayıldığı açıkken yanıtlanır."
        ]
      },
      {
        "title": "Bir derecenin iki farklı mesafesi",
        "paragraphs": [
          "Meridyen doğrultusunda 1° enlem farkı için yaklaşık 111 km ders değeri kullanılır. Aynı meridyen üzerinde aralarında 6° enlem bulunan iki noktanın meridyen yayı yaklaşık 666 km olur. Bu yaklaşım gerçek arazi yolu, dağ yüzeyi mesafesi veya farklı boylamlı iki kentin otomatik kuş uçuşu uzaklığı değildir.",
          "Aynı paralelde 1° boylam aralığı Ekvator’da yaklaşık 111 km iken kutuplara doğru küçülür. Küresel yaklaşımda 111 ×cos(enlem) kullanılabilir; 60°’de yaklaşık 55,5 km bulunur. Aynı boylam farkını her enlemde 111 ile çarpmak farklı paralel çemberlerini eşit sayma hatasıdır."
        ]
      },
      {
        "title": "Boylam ve yerel Güneş saati",
        "paragraphs": [
          "Dünya batıdan doğuya döndüğü için daha doğudaki bir meridyenin yerel Güneş saati ileridedir. Ders yaklaşımında 1° boylam farkı yaklaşık 4 dakika, 15° ise 1 saat fark verir. Önce boylamları doğu artı, batı eksi yaz; hedef boylamdan başlangıcı çıkararak yönlü farkı bul.",
          "Aynı meridyendeki noktaların yerel Güneş saati bu modelde aynıdır; farklı enlemlerde gündüz süreleri yine değişebilir. Daha doğuda Güneş’in her mevsim ve her enlemde mutlaka daha erken doğduğunu söylemek için yeterli bilgi yoktur; yerel saat farkı ile doğuşun enleme bağlı süre koşulu ayrı tutulur."
        ]
      },
      {
        "title": "Ortak saat ve tarih bilgisini koru",
        "paragraphs": [
          "Resmî veya ortak saat ülkelerin uyguladığı saat düzenidir; UTC ofsetiyle verilebilir. Bir ülke geniş alanda birkaç farklı ortak saat kullanabilir, ofsetler de her zaman tam saat olmak zorunda değildir. Boylamdan hesaplanan yerel Güneş saati ile idari saat dilimi aynı kavram değildir.",
          "Soruda UTC+3 ve UTC−2 verildiyse fark−5 saattir; bunu yeniden 15° veya 4 dakika ile çarpmayız. Saat 00.00 sınırını geçiyorsa tarih de değişir. Türkiye için derslerde UTC+3 örneği kullanılır; farklı ülke veya dönemin resmî kuralı ayrıca verilmeden bütün dünya için tek ofset varsayılmaz."
        ]
      },
      {
        "title": "Antimeridyen karşı meridyendir",
        "paragraphs": [
          "Bir meridyenle tam çemberi tamamlayan karşı yarım yay antimeridyendir. 30° doğunun karşısı 150° batı, 70° doğunun karşısı 110° batıdır. İşaretli boylamlarla iki yay arasında 180° yön farkı vardır; iki mutlak derece değerinin toplamı 180° olur, fakat doğu-batı yönü mutlaka karşıdır.",
          "İdeal yerel saat farkı 12 saattir; bu bilgi resmî saatlerin mutlaka 12 saat farklı olduğunu göstermez. Ekvator veya başlangıç meridyeni üzerindeki özel sınırlar ayrıca adlandırılır. Aynı meridyenin kuzey ve güneydeki iki noktasını antimeridyen sanma; burada karşı olan enlem değil boylam yayıdır."
        ]
      },
      {
        "title": "Tarih çizgisi ile geometrik sınır",
        "paragraphs": [
          "Uluslararası tarih çizgisi kabaca 180° çevresinde, ada ve ülke düzenlerini dikkate alan sapmalarla gösterilir. Tamamı düz bir matematik meridyen değildir. İdeal takvim şemasında bu çizgiyi batıya geçerken tarih bir gün ileri, doğuya geçerken bir gün geri düzeltilir; geçiş yönünü söylemeden gün ekleme kuralı eksik kalır.",
          "Gerçek uçuşta varış saatini en güvenilir biçimde verilen UTC ofsetleri ve uçuş süresiyle kurarız. Kalkış saatini UTC’ye çevir, geçen süreyi ekle, hedef ofseti uygula ve gün taşmasını kaydet. Tarih çizgisi düzeltmesini aynı hesaba ikinci kez eklemek bir günü iki kere sayma hatasına yol açar."
        ]
      },
      {
        "title": "Enlemden hangi sonuç ne koşulla çıkar?",
        "paragraphs": [
          "Aynı enlemde, aynı tarihin aynı yerel Güneş zamanında ideal ışın geometrisi benzer olur; çember dönüş hızı da aynı küresel modele dayanır. Fakat aynı resmî saatte farklı boylamlarda Güneş’in açısı aynı olmak zorunda değildir. Gerçek ufuk, yükseklik ve atmosfer doğuş-batış gözlemini değiştirebilir.",
          "Enlem genel iklim eğilimlerini etkiler ama tek başına toprak, tarım, deniz tuzluluğu veya sıcaklığın kesin değerini belirlemez. Ekvator’a göre simetrik enlemler ekinoksta benzer öğle açısı alırken gündönümünde karşıt süre yaşayabilir. Simetriyi hangi tarihte kullandığını açık yaz."
        ]
      },
      {
        "title": "Matematik kuşak ile iklim tipini ayır",
        "paragraphs": [
          "Yaklaşık 23,5° dönenceleri ve 66,5° kutup daireleri Güneş geometrisine bağlı sınırlar sunar. Tropikal kuşakta yatay yüzeye dik öğle ışını ulaşabilir; dönencelerin dışında ulaşmaz. Kutup kuşağında uygun mevsimde 24 saatlik gün veya gece mümkün olur. Bunlar geometrik olasılık bilgisidir, bugünkü hava durumu değildir.",
          "Tropikal kuşakta çöl de yağmur ormanı da bulunabilir; orta kuşakta farklı denizel ve karasal koşullar görülür. Uygulama bu yüzden koordinat seçince tek bir gerçek iklim tipi, ürün veya gelir etiketi üretmez. Önce açısal konumu, sonra çevresel veriyi okuyan öğrenci hem matematik ilişkiyi hem yerel çeşitliliği korur."
        ]
      },
      {
        "title": "Türkiye’nin yaklaşık mutlak çerçevesi",
        "paragraphs": [
          "Kaynaklarda Türkiye yaklaşık 36–42° kuzey ve 26–45° doğu aralığıyla öğretilir. Bu çerçeve kuzey ve doğu yarım küreyi, orta kuşağı ve 19° ×4 =76 dakikalık yaklaşık yerel saat genişliğini açıklar. Ülkenin ortak resmî saati bulunduğu için bu fark günlük duvar saatlerinin ayrı ayrı 76 dakika farklı olduğunu göstermez.",
          "6° ×111 ≈666 km hesabı yuvarlatılmış enlem genişliğinin meridyen doğrultusundaki yaklaşımıdır. Gerçek uç noktalarda 35°51′ veya 42°06′ gibi değerler kaynakta ayrıca verilir; yuvarlak 36–42 kutusu kesin sınır çizgisi değildir. Aynı nedenle yaklaşık değerleri bütün kıyı uzunluğu veya gerçek yol mesafesi diye kullanmayız."
        ]
      },
      {
        "title": "Türkiye’nin göreceli bağlantıları",
        "paragraphs": [
          "Anadolu Asya’nın batısında, Trakya Avrupa’nın güneydoğusunda bulunur. İstanbul ve Çanakkale boğazları ile Karadeniz–Marmara–Ege bağlantısı, kıtalar arası ticaret ve enerji güzergâhları göreceli konum bağlamıdır. Denizlere ve komşu pazarlara erişim, altyapı ve siyasi koşullarla birlikte değerlendirilir.",
          "Yükselti, dağ sıraları, kıyı ile iç kesim farkı ve jeolojik yapı Türkiye’nin çevre koşullarını çeşitlendirir. Batı-doğu yönündeki sıcaklık farkını yalnız boylam diye açıklamayız; yükselti ve karasallık önemlidir. Bir boğazın varlığı otomatik gelir veya bütün bölgelerde aynı iklim sağlamaz; potansiyel ile gerçekleşen sonuç ayrılır."
        ]
      },
      {
        "title": "Aynı koordinatta farklı varsayımı dene",
        "paragraphs": [
          "Etkileşimli X noktası gerçek bir şehrin arazi ölçümü değildir. Koordinat geometrisini koruyup denize açık kıyı, dağ ardı veya yüksek iç alan gibi alternatif ders sahnelerini seçersin. Bu, gerçek dünyada dağların bir düğmeyle taşındığı anlamına gelmez; hangi sonucun enlemden, hangisinin ayrıca verilen çevreden geldiğini ayırır.",
          "Sahne değişince enlem-boylam, karşı meridyen ve geometrik kuşak sabit kalır; denizle ilişki ve verilen yükselti değişebilir. Sıcaklık veya yağış için yeterli veri yoksa uygulama sayı uydurmaz. Değişen ve değişmeyen bilgiyi kendi gerekçenle yazmak mutlak ve göreceli konumu kullanmayı öğretir."
        ]
      },
      {
        "title": "Konum sorusunda veri türünden başla",
        "paragraphs": [
          "Soru bir açı, mesafe, saat veya çevre etkisi isteyebilir. Boylam farkını yerel saat için 4 dakika ile çarpmak doğruyken kilometre için aynı işlem geçerli değildir. Alan bulmak için ayrıca sınır ve ölçü gerekir; tek koordinat çifti bir ülkenin yüzölçümünü vermez.",
          "Önce verilenin birimini ve yönünü yaz, sonra uygun bağıntıyı seç. Hesabın sonunda doğuya gidince yerel saatin ileri, kutba gidince paralel çemberinin daha küçük olması gibi yön denetimleri yap. Hesaplanan şeyin resmî saat mi, yerel saat mi, yatay yay mı yoksa gerçek yol mu olduğunu sonuçta yeniden adlandır."
        ]
      },
      {
        "title": "Türkiye’nin orta kuşak ve etkin jeoloji bağları",
        "paragraphs": [
          "Türkiye’nin kuzey orta kuşak konumu, batı rüzgârları kuşağı ve farklı hava kütlelerinin karşılaşmasıyla ilişkili cephe süreçlerini anlamaya yardım eder. Ancak her mevsimde her noktaya aynı rüzgârın eseceği veya bütün yağışın cephe yağışı olacağı sonucu çıkmaz. Deniz etkisi, yükselti, dağların uzanışı ve bölgesel dolaşım aynı ülke içinde farklı koşullar oluşturur.",
          "Türkiye’nin etkin tektonik ortamı, deprem tehlikesi ve bazı alanlardaki jeotermal kaynaklarla ilişkilidir; bu bağ coğrafi enlemden tek başına türetilmez. Faylar, ısı akışı, su dolaşımı ve yerel kayaç koşulları kaynakların yerini etkiler. Bir alanın genel tektonik niteliğiyle belirli deprem zamanı veya her yerde eşit risk hesaplanamaz; riskte yapı, zemin ve maruz kalan nüfus da önemlidir."
        ]
      }
    ],
    "examples": [
      {
        "title": "İki yarım küre arasındaki meridyen yayı",
        "prompt": "A ve B aynı meridyende; A 12° kuzey, B 8° güney enlemindedir. 1° enlem yayı yaklaşık 111 km alınırsa aradaki meridyen yayı kaç km?",
        "strategy": "Farklı yarım kürede işaretli enlem farkını al.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "A +12°, B−8° yazılır; fark |12−(−8)| =20°’dir."
          },
          {
            "label": "2. adım",
            "explanation": "20 ×111 =2220 km bulunur. Her enlem derecesi için verilen 111 km yay yaklaşımı aynı meridyen boyunca uygulanmıştır."
          },
          {
            "label": "3. adım",
            "explanation": "Sonuç meridyen yayı yaklaşımıdır; karayolu veya eğimli arazi mesafesi değildir."
          }
        ],
        "answer": "Yaklaşık 2220 km",
        "check": "A’dan Ekvator’a 12°, Ekvator’dan B’ye 8° olmak üzere toplam 20° olması denetimdir.",
        "pitfall": "12−8 =4° diyerek karşı yarım kürelerin aralığını küçültme."
      },
      {
        "title": "Boylam aralığı her enlemde aynı değil",
        "prompt": "Ekvator’da ve 60° kuzeyde aynı paralel üzerindeki 1° boylam yayı karşılaştırılıyor. 111 cosφ km yaklaşımı ve cos 60°=0,5 veriliyor.",
        "strategy": "Her paralelin yarıçapını hesaba katan oranı kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Ekvator’da cos 0°=1; aralık 111 km’dir."
          },
          {
            "label": "2. adım",
            "explanation": "60° kuzeyde 111 ×0,5 =55,5 km’dir."
          },
          {
            "label": "3. adım",
            "explanation": "Aynı derece farkında kuzeydeki yay Ekvator’dakinin yarısıdır."
          }
        ],
        "answer": "111 km ve 55,5 km",
        "check": "Boylam yayı küçülür; 1° enlem yayı için kullanılan yaklaşık 111 km ile aynı kural değildir.",
        "pitfall": "Boylamı bütün enlemlerde doğrudan 111 km ile çarpma."
      },
      {
        "title": "Yerel saatte yön ve gün",
        "prompt": "15° batıda yerel Güneş saati 23.40 iken 30° doğuda aynı anda yerel Güneş saati soruluyor. 1°=4 dakika ders yaklaşımını kullan.",
        "strategy": "Boylam farkını yönlü hesapla ve gece yarısını denetle.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Başlangıç−15°, hedef+30°; fark 45° doğuya olur."
          },
          {
            "label": "2. adım",
            "explanation": "45 ×4 =180 dakika =3 saat ileri gidilir."
          },
          {
            "label": "3. adım",
            "explanation": "23.40 +3 saat =ertesi gün 02.40 olur."
          }
        ],
        "answer": "Ertesi gün 02.40",
        "check": "Daha doğudaki yerin saati ileri olmalıdır; sonuçta gün de bir kez ileri taşar.",
        "pitfall": "Yerel saat sorusuna verilmemiş resmî UTC ofseti koyma."
      },
      {
        "title": "Antimeridyeni bul",
        "prompt": "Bir nokta 70° doğu boylamındadır. Onun karşı meridyeni ve ideal yerel saat farkı nedir?",
        "strategy": "Karşı yönde 180° fark veren yarım yayı kur.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Mutlak değer farkı için 180−70 =110° bulunur."
          },
          {
            "label": "2. adım",
            "explanation": "Karşı yarım yay batıda olduğundan 110° batı yazılır."
          },
          {
            "label": "3. adım",
            "explanation": "180° ×4 dakika =720 dakika =12 saat ideal yerel farktır."
          }
        ],
        "answer": "110° batı; 12 saat",
        "check": "+70 ile−110 arasındaki yön farkı 180°’dir. Bu sonuç resmî saat dilimi farkını zorunlu vermez.",
        "pitfall": "Karşı meridyeni aynı enlemde karşı kıyı veya aynı 70° batı sanma."
      }
    ],
    "recall": [
      {
        "prompt": "Enlem ve boylam hangi başlangıçlara göre yazılır?",
        "answer": "Enlem Ekvator’a, boylam Greenwich başlangıç meridyenine göre açıdır; kuzey/güney ve doğu/batı yönleri korunur."
      },
      {
        "prompt": "1° enlem ile 1° boylam yayı aynı mı?",
        "answer": "Meridyen doğrultusunda 1° enlem yaklaşık 111 km; 1° boylam yayı aynı paralelde enleme göre daralır."
      },
      {
        "prompt": "Ortak saat ile yerel Güneş saati nasıl ayrılır?",
        "answer": "Yerel model boylamdan; resmî saat verilen UTC ofseti ve idari kuraldan kurulur. İkisi aynı kavram değildir."
      },
      {
        "prompt": "Koordinat bir iklim tipini kesin verir mi?",
        "answer": "Geometrik kuşağı gösterebilir, ama gerçek iklim için yükselti, deniz, akıntı, dolaşım ve başka veriler gerekir."
      }
    ],
    "items": [
      [
        "Aynı meridyendeki A 12° kuzey, B 8° güney enleminde. 1° enlem yayı 111 km alınırsa aralık kaç km’dir?",
        "2220",
        [
          "444",
          "1110",
          "1332",
          "888"
        ],
        "Ekvator’un iki tarafındaki açısal aralıkları topla.",
        "İşaretli fark |12−(−8)| =20°;20×111 =2220 km meridyen yayı yaklaşımıdır. Bu sayı arazi yolu mesafesi değildir."
      ],
      [
        "60° kuzeyde 1° boylam yayı 111 cosφ km ile modelleniyor; cos 60°=0,5. Yaklaşık uzunluk kaç km?",
        "55,5",
        [
          "111",
          "222",
          "30",
          "60"
        ],
        "Bir derece boylam aralığı kutba doğru daralır.",
        "111×0,5 =55,5 km bulunur. 111 km değeri Ekvator’daki boylam yayı veya yaklaşık bir derecelik enlem yayına aittir."
      ],
      [
        "70° doğu meridyeninin antimeridyeni hangisidir?",
        "110° batı",
        [
          "70° batı",
          "110° doğu",
          "20° kuzey",
          "180° kuzey"
        ],
        "Toplam mutlak açı 180° olacak ve yön karşı olacaktır.",
        "70+110 =180; doğunun karşısı batıdır. Antimeridyen enlem değil, karşı yarım meridyen yayıdır."
      ],
      [
        "15° batıda yerel Güneş saati 23.40. 30° doğuda aynı andaki yerel Güneş saati nedir? 1°=4 dakika kullan.",
        "Ertesi gün 02.40",
        [
          "Aynı gün 20.40",
          "Aynı gün 00.40",
          "Önceki gün 02.40",
          "Aynı gün 23.40"
        ],
        "Hedef 45° daha doğuda, 3 saat ileridedir.",
        "30−(−15)=45°;180 dakika ileri gidilir. 23.40+3 saat ertesi gün 02.40’tır; gün taşması korunur."
      ],
      [
        "UTC+3 bölgesinde 01.15 iken aynı anda UTC−2 bölgesinde saat ve gün ilişkisi nedir?",
        "Önceki gün 20.15",
        [
          "Aynı gün 06.15",
          "Ertesi gün 20.15",
          "Aynı gün 01.15",
          "Önceki gün 23.15"
        ],
        "Ofset farkını doğrudan çıkar, yeniden 4 ile çarpma.",
        "Hedef ofset−2, başlangıç+3; fark−5 saattir. 01.15−5 saat önceki gün 20.15 olur. Resmî ofsetler boylamla yeniden hesaplanmaz."
      ],
      [
        "X ve Y aynı enlemde; X denize açık kıyı, Y dağ ardı iç alan olarak verilmiş. Hangisi doğrudur?",
        "Göreceli koşullar farklıdır; aynı sıcaklık zorunlu değildir.",
        [
          "Aynı enlem bütün iklim değerlerini eşitler.",
          "İkisinin de yükseltisi kesin sıfırdır.",
          "Boylamları mutlaka aynıdır.",
          "Deniz etkisi her yerde aynıdır."
        ],
        "Açısal enlemle çevre verisini ayrı kullan.",
        "Denize açıklık, dağ engeli ve yükselti sıcaklık ile yağışı etkileyebilir. Ortak enlem bütün çevresel değerlerin eşitliği demek değildir."
      ],
      [
        "Türkiye yaklaşık 36–42° kuzey, 26–45° doğu kutusuyla modelleniyor. Yalnız bu yuvarlatılmış boylamlara göre doğu-batı yerel saat genişliği kaç dakika?",
        "76",
        [
          "24",
          "19",
          "42",
          "666"
        ],
        "Boylam genişliği 19°; her derece 4 dakika.",
        "(45−26)×4 =76 dakika bulunur. Bu yaklaşık yerel Güneş saati genişliğidir; ülkenin duvar saatlerini veya gerçek uçların saniyeli tam farkını vermez."
      ],
      [
        "Bir yerde İstanbul ve Çanakkale boğazlarına, ticaret yollarına ve denizlere erişim anlatılıyor. Temel konum bilgisi türü hangisidir?",
        "Göreceli konum",
        [
          "Yalnız enlem değeri",
          "Sadece boylam derecesi",
          "Mutlaka tek UTC ofseti",
          "Yerçekiminin kesin sayısı"
        ],
        "İlişkinin çevredeki alan ve ağlara göre kurulup kurulmadığına bak.",
        "Deniz, boğaz ve yol ilişkisi göreceli konumdur. Sayısal enlem-boylam çiftiyle yazılan mutlak konumdan farklı bilgiyi açıklar."
      ],
      [
        "İdeal kürede aynı enlemdeki iki noktanın Güneş yükseklik açısını karşılaştırmak için hangi eşitleme uygundur?",
        "Aynı tarih ve aynı yerel Güneş zamanı",
        [
          "Her koşulda yalnız aynı resmî saat",
          "Yalnız aynı şehir nüfusu",
          "Sadece aynı gelir",
          "Yalnız aynı ülke adı"
        ],
        "Farklı boylamda resmî saat aynıyken yerel Güneş zamanı farklı olabilir.",
        "Geometrik karşılaştırma aynı tarih ve yerel Güneş zamanı gerektirir. Resmî saat tek başına aynı Güneş konumunu garanti etmez; gerçek ufuk için ayrıca koşul gerekir."
      ],
      [
        "Bir nokta 10° güney enlemindedir. Yalnız bu geometrik bilgiyle hangisi kesinlenemez?",
        "Gerçek yıllık yağış miktarı",
        [
          "Güney yarım kürede olması",
          "Tropikal geometrik kuşakta olması",
          "Ekvator’dan açısal 10° uzakta olması",
          "Enleminin yönle yazılmış olması"
        ],
        "Matematik kuşakla gerçek iklim ölçüsünü ayır.",
        "10° güney konumu yarım küre ve geometrik kuşağı verir. Gerçek yağış için dolaşım, yükselti, deniz ve başka koşullar gerekir; enlemden kesin mm bulunmaz."
      ]
    ],
    "source": "Aurelia Coğrafi Konum kâğıdı; OGM 9. Sınıf Dersler Cepte PDF 15–19,21; MEBİ TYT Coğrafya PDF 21–25 ile karşılaştırılmış özgün öğretim ve sorular. 111 km/° yaklaşımı küresel ders modelidir; alternatif çevre sahneleri gerçek şehir ölçümü değildir."
  },
  {
    "id": "harita-bilgisi",
    "topic": "detail-76",
    "title": "Harita bilgisi: ölçekten arazi profiline",
    "minutes": 130,
    "objectives": [
      "Harita öğelerini, projeksiyon ve gösterim amacını birlikte oku.",
      "Uzunluk, iz düşüm alan, boyut değişimi ve eğimi doğru birimle hesapla.",
      "İzohips, sembol, renk ve profil bilgisini verilen verinin sınırında yorumla."
    ],
    "sections": [
      {
        "title": "Harita ve krokiyi ayır",
        "paragraphs": [
          "Harita bir alanın kuş bakışı görünümünü belirli ölçekte düzlem üzerinde gösterir; kartografya harita üretme ve kullanma bilgisidir. Kroki de kabataslak kuş bakışı gösterim olabilir ama ölçülü küçültme oranı taşımayabilir. Bir çizimin ayrıntılı görünmesi tek başına ölçüm yapılabilir bir harita olduğunu göstermez.",
          "Bir haritayı okumaya başlık, gösterilen alan, tarih, ölçek ve açıklamalarla başla. Bir dönem veya bir konu için üretilmiş harita bütün başka sorulara cevap vermek zorunda değildir. Yön okunun bulunmaması, koordinat ağı yön bilgisi veriyorsa otomatik eksiklik değildir; yön için kullanılabilir veri aranır."
        ]
      },
      {
        "title": "Lejant ve yön gösterimi",
        "paragraphs": [
          "Lejant işaret, renk ve sembollerin anlamını açıklar. Aynı mavi çizgi bir haritada akarsu, başka temada farklı bir değişken olabilir; anlamı alışkanlıktan değil o haritanın açıklamasından okunur. Fiziki haritadaki yeşil çoğunlukla yükselti basamağıdır, bütün yeşil yerlerin orman veya ova olduğunu kanıtlamaz.",
          "Kuzey her çizimde sayfanın üstü olmak zorunda değildir. Yön oku, koordinat dereceleri ve açıklamalar birlikte değerlendirilir. Haritanın çevrilmesi gerçek dünyadaki yönleri değiştirmez; sembolün sayfadaki yerine göre değil verilen kuzeye göre rota ve bakı okunur."
        ]
      },
      {
        "title": "Küreyi düzleme aktarırken ne bozulur?",
        "paragraphs": [
          "Küresel bir yüzeyi bütün mesafe, alan ve açı özelliklerini her yerde aynı anda koruyarak düzleme açamayız. Projeksiyonlar belirli özellik veya alan için uygun biçimde seçilir; bazıları açıya, bazıları alana ya da belirli doğrultulardaki uzaklığa öncelik verebilir. Küçük bir alanın yerel ölçümü ile bütün dünya haritası aynı zorlukta değildir.",
          "Bozulmanın türü, projeksiyon ve haritadaki konumla ilişkilidir. Yalnız iki haritanın 1:N oranı aynı diye her yerde aynı bozulmaya sahip olduklarını söylemeyiz. Büyük ölçek ayrıntı gösterme gücünü artırabilir; yanlış veri, farklı projeksiyon veya güncel olmayan içerik gibi başka hata kaynaklarını kendiliğinden ortadan kaldırmaz."
        ]
      },
      {
        "title": "Silindir, koni ve düzlem örnekleri",
        "paragraphs": [
          "Kaynaklardaki normal yerleşim örneğinde silindir Ekvator çevresine, koni orta enlemlere, kutba teğet düzlem kutup çevresine uygun aktarımı anlatır. Temas edilen kuşak veya merkezden uzaklaşınca bozulma artabilir. Türkiye’nin orta enlemde oluşu konik örnekle ilişkilendirilir; bu, Türkiye için yalnız tek projeksiyon bulunduğu anlamına gelmez.",
          "Aynı yüzey türü farklı yönlerde veya farklı parametrelerle kullanılabilir. Bu yüzden her silindirik harita aynı ekvator temasını, her düzlem yalnız kutbu zorunlu gösterir denmez. Soru basit normal modeli veriyorsa onun koşuluyla karar ver; dünya haritasında görsel olarak büyük görünen bir ülkenin gerçek alanını ölçeksiz kıyaslama."
        ]
      },
      {
        "title": "Kesir ölçek aynı birimlerin oranıdır",
        "paragraphs": [
          "1:N ölçeğinde haritadaki 1 birim uzunluk gerçekte aynı türden N birime karşılık gelir. Örneğin 1:100.000’de 1 cm, 100.000 cm yani 1 km’dir. Ölçek oranı boyutsuzdur; N sayısının yanına birim eklemek yerine karşılaştırılan iki uzunluğu aynı birime çeviririz.",
          "Gerçek yatay uzunluk harita uzunluğu ile N’nin çarpımı; harita uzunluğu gerçek uzunluğun N’ye bölünmesidir. 100.000 cm=1 km dönüşümü uzunluk içindir. Gerçek yolun virajı ve eğimli yüzeyi haritada izlenen çizgiden farklı olabilir; hesaplanan şeyin kuş uçuşu mu çizgi güzergâhı mı olduğunu sorunun tanımı belirler."
        ]
      },
      {
        "title": "Çizgi ölçekte sıfırı ve bölmeyi oku",
        "paragraphs": [
          "Çizgi ölçek üzerinde eşit bölmeler ve gerçek uzaklık etiketleri bulunur. Önce iki çentik arası kâğıt uzunluğunu ve gösterdiği gerçek mesafeyi eşleştir. Bir bölme 2 cm ve 10 km ise 1 cm 5 km’ye karşılık gelir; kesir ölçek 1:500.000 olur. Sıfırın solundaki yardımcı bölmeleri de açıklamasına göre kullan.",
          "Bir harita iki noktası arasındaki uzunluğu kâğıt şeritle alıp aynı çizgi ölçeğe taşıyarak gerçek yatay mesafe okunabilir. Ekrandaki değişken boyutlu resmi cetvelle ölçmek ise kalibrasyon olmadan aynı işlem değildir. Deneyimizde kâğıt cm değerleri sayısal verilir; cihaz ekranının fiziksel santimetresi olduğu ileri sürülmez."
        ]
      },
      {
        "title": "Boyut değişirse hangi ölçek geçerli?",
        "paragraphs": [
          "Harita her iki yönde q kat büyütülürse aynı gerçek mesafenin kâğıt uzunluğu q kat olur ve yeni ölçek paydası N/q olur. Yarı boyuta küçültme q=0,5 demektir; N iki katına çıkar. Haritayla birlikte aynı oranda değişen çizgi ölçek temsil ettiği gerçek mesafeyi korur.",
          "Basılı 1:N yazısı kendiliğinden yeni sayıya dönüşmez; tekrar hesaplanmalıdır. Yalnız yatay yönde gerilen bir görüntüde tek bir ölçek bütün yönlere yetmeyebilir; deney eş oranlı boyut değişimini varsayar. Büyütmek yeni arazi bilgisi veya yeni ölçüm hassasiyeti üretmez; yalnız mevcut gösterimin boyutu değişir."
        ]
      },
      {
        "title": "Büyük ve küçük ölçeği doğru kıyasla",
        "paragraphs": [
          "1:25.000 kesri 1:100.000’den büyüktür; küçük payda daha büyük ölçek demektir. Aynı kâğıt alanında büyük ölçek daha dar gerçek alanı daha ayrıntılı gösterebilir. Aynı gerçek alanı büyük ölçekle çizmek ise daha büyük kâğıt alanı gerektirir; bu iki karşılaştırmanın sabit tutulanı farklıdır.",
          "Kaynaklar büyük, orta ve küçük ölçek için sınıf sınırları verebilir; sınır değerler bir sınıflama geleneğidir, doğanın keskin eşiği değildir. Ölçeğin değişmesi gerçek yükseltiyi, alanı veya koordinatı değiştirmez. Fotoğrafı büyütmekle özgün büyük ölçekli yeni bir ölçüm haritası üretmeyi aynı ayrıntı artışı sanma."
        ]
      },
      {
        "title": "Genel ve tematik harita",
        "paragraphs": [
          "Genel haritalar konum ve çeşitli doğal-beşerî öğeler hakkında başvuru bilgisi verir; siyasi ve fiziki haritalar örnek olabilir. Tematik haritalar nüfus yoğunluğu, jeoloji, toprak veya turizm gibi belirli konuya odaklanır. Aynı altlık üzerine farklı veriler yerleştirilebilir; başlık ve legend bu amacı açıklar.",
          "Bir haritanın hangi hesabı yapabileceği yalnız adına değil gerçekten taşıdığı veriye bağlıdır. Yükselti ve yatay uzaklık verisi yoksa eğim bulunamaz; bu verileri taşıyan bir tematik altlık da hesabı destekleyebilir. Fiziki adını taşıyan çok genelleştirilmiş bir harita da her dere yatağının kesin eğimini vermeyebilir."
        ]
      },
      {
        "title": "Alan hesabında paydanın karesi",
        "paragraphs": [
          "Uzunluk oranı 1:N ise alan oranı 1:N²’dir. Haritadaki alanı N² ile çarparak yatay iz düşüm alan elde ederiz. 1 km=100.000 cm olduğundan 1 km²=10.000.000.000 cm² olur; alan dönüşümünde uzunluk dönüşümünü yalnız bir kez uygulamayız.",
          "Kaynaklar bazen bu iz düşüm hesabına gerçek alan der; eğimli arazinin bütün yüzey alanı ayrıca tanımlanan başka bir büyüklüktür. Dağlık yüzeyin kıvrım ve eğimlerini yalnız harita cm²’sinden bulamayız. Deneyde kare yatay alan kullanıldığı için hangi alanın hesaplandığı açıkça belirtilir."
        ]
      },
      {
        "title": "Eğim yükselti değil orandır",
        "paragraphs": [
          "Eğim yüzde olarak yükselti farkının yatay uzaklığa bölünüp 100 ile çarpılmasıdır; binde için 1000 kullanılır. İki uzunluk aynı birime çevrilmelidir. 600 m kotlu bir ova yüksek olabilir ama iki noktasının kotu eşitse bu doğrultudaki ortalama eğimi sıfırdır.",
          "Yüzde eğim ile derece açısı aynı sayı değildir; yüzde 100 yükselti farkının yatay mesafeye eşit olduğu durumu, 45°’yi verir. Dik yamaçta yüzde 100’ün üstü mümkün olabilir. Profilin başlangıç ve bitişi aynı kotta olsa bile arada tepe veya çukur bulunabilir; uç noktalar arasındaki net ortalama bütün yolun en dik yerini vermez."
        ]
      },
      {
        "title": "CBS bir veri ve yöntem sistemidir",
        "paragraphs": [
          "Coğrafi Bilgi Sistemleri mekânsal veriyi elde etme, saklama, denetleme, işleme, çözümleme ve gösterme süreçlerini bir araya getirir. Donanım, yazılım, veri, yöntem ve kullanıcı birlikte bileşenlerdir. Ulaşım, sağlık, ormancılık, tarım ve afet yönetiminde farklı katmanlar birlikte sorgulanabilir.",
          "Uzaktan algılama, yeryüzüyle doğrudan temas etmeden uygun ölçüm araçlarıyla bilgi edinme tekniğidir; uydu veya hava görüntüsü örnek olabilir. Bir konumu uydu sinyalleriyle bulma, görüntü toplama ve bu verileri CBS’de çözümleme aynı görev değildir. Bilgisayar bulunması verinin mutlaka doğru, güncel veya kayıpsız olduğu anlamına gelmez."
        ]
      },
      {
        "title": "Nokta, çizgi ve alan seçimi",
        "paragraphs": [
          "Ev, durak veya tepe noktası noktasal; yol, akarsu ve sınır çizgisel; göl, orman ve yönetim alanı alansal gösterime örnektir. Seçim ölçek ve amaca bağlıdır: aynı göl ayrıntılı haritada alan, çok küçük ölçekli başka bir haritada nokta simgesiyle gösterilebilir.",
          "Nokta sayısı her zaman bire bir kişi veya ev sayısı değildir; bir noktanın temsil ettiği miktar legendde yazabilir. Renk sınıfları kesin nüfus sayısı veya aynı sınıftaki iki ilin sırasını zorunlu vermez. Mekânsal şekil ve nicel veri ayrı katmanlar olarak okunur; görünüşten açıklanmayan hassas sayı üretilmez."
        ]
      },
      {
        "title": "İzohips ve izobatı tanı",
        "paragraphs": [
          "İzohips aynı yükseltideki noktaları birleştiren eğridir; izobat aynı derinlikteki noktaları birleştirir. Bir izohips üzerindeki noktaların kotu aynıdır, fakat aynı kotta birbirinden ayrı eğriler bulunabilir. Deniz kıyısı genellikle 0 m referansıyla gösterilir; yüksek bir gölün kıyısını da 0 m saymak doğru değildir.",
          "Harita çerçevesi bir eğriyi kesebilir; her çizginin sayfa içinde kapalı halka görünmesi zorunlu değildir. Tek değerli arazi yüzeyi gösteriminde farklı kotlar birbirini kesmez; özel diklik ve gösterim ayrıntıları legendle okunur. Kapalı halkaların içi çoğu tepe örneğinde yükselir ama çukur işareti varsa yön tersine dönebilir."
        ]
      },
      {
        "title": "Eş aralık ile çizgi sıklığını ayır",
        "paragraphs": [
          "Aynı haritanın belirtilmiş izohips aralığı komşu kotlar arasındaki düşey farktır. Ana çizgiler daha kalın, ara çizgiler daha ince olabilir; sadece koyu çizgileri sayarak temel aralığı atlama. 100 m farkın beş eş düşey aralığı 20 m eder; eğri sayısı ile aralık sayısı aynı değildir.",
          "Aynı ölçek ve düşey aralık koşulunda çizgilerin yatayda sıklaşması daha dik yamacı gösterir. Başka ölçek veya başka aralıklı haritaları yalnız çizgi sıklığıyla karşılaştırmak yetmez. Haritayı fotokopiyle büyütmek araziyi veya var olan düşey aralığı değiştirmez; yalnız kâğıt üzerindeki yatay boşluk büyür."
        ]
      },
      {
        "title": "Tepe, boyun, vadi ve sırt",
        "paragraphs": [
          "Çevresine göre yükselen alan tepe, doruk en yüksek bölüm, iki tepe arasındaki alçak geçit boyun, eğimli yan yüzey yamaçtır. Akarsu vadisinde konturun V ucu genellikle yukarı çığırdaki yüksek yöne bakar. Sırtta ise büklüm daha alçak tarafa uzanır; aynı V görüntüsünü akış ve kot verisi olmadan ezberle yorumlamayız.",
          "İçe dönük tarama veya okla belirtilen kapalı çukurda içe doğru kot azalır. Plato çevresine göre yüksek ve yarılmış düzlüklere, ova çevresine göre daha alçak düzlüklere örnektir; renk tek başına bu biçimleri kanıtlamaz. Dağ adı veya koyu renk yerine çizgilerin düzeni ve kotları okunur."
        ]
      },
      {
        "title": "Kıyı ve akarsu biçimlerinin işaretleri",
        "paragraphs": [
          "Akarsuyun ağızda taşıdığı malzemeyi biriktirmesi delta çıkıntısı oluşturabilir; denizin akarsu ağzına sokulduğu girintili haliç farklı bir süreçtir. Kıyıda çok dik yamaç veya falez, konturların yakınlığı ve uygun arazi bilgisiyle ele alınır. Akarsu boyunca ani eğim kırığı şelale olasılığına işaret edebilir.",
          "Yalnız sık çizgi gördüğümüz her yere kesin şelale çizmek doğru değildir; suyun varlığı ve düşüş koşulu da gerekir. Aynı şekilde her kıyı girintisi haliç veya her çıkıntı delta değildir. İşaretler, kot düzeni ve verilmiş süreç birlikte gerekçe olur; bir sembolü tek başına bütün jeolojik geçmişe çevirmeyiz."
        ]
      },
      {
        "title": "Renklendirme ve kabartma",
        "paragraphs": [
          "Fiziki haritalarda yeşil, sarı, turuncu ve kahverengi tonları açıklamada verilen yükselti basamaklarını gösterebilir. Mavi derinlik veya su, beyaz kalıcı kar ya da özel yüksek basamak için kullanılabilir; belirleyici olan o haritanın legendidir. Rengi otomatik bitki, ova veya çöl türüyle eşitlemeyiz.",
          "Kabartma üç boyutlu bir gösterimdir; yatay uzunluk ile düşey yükselti için ayrı ölçekler bulunabilir. Dağı belirginleştirmek amacıyla düşey ölçek büyütülmüşse görünür eğim gerçek eğim açısı değildir. Uygulamadaki profil de eksen birimlerini ve düşey-yatay çizim oranını açık verir; görselin dikliğinden veri olmadan derece okunmaz."
        ]
      },
      {
        "title": "Konturdan profile geç",
        "paragraphs": [
          "Önce profil doğrultusunun iki ucunu belirle. Doğrunun her eş yükselti eğrisini nerede kestiğini yatay sırasıyla işaretle, o kesişime ait kotu aktar ve noktaları birleştir. Aynı kotun doğrultu boyunca birkaç kez görülmesi mümkündür; arada tepe veya vadi olabilir.",
          "Konturların arasında gerçek yüzeyin her ayrıntısı bilinmez; seçilen aradeğerleme bir modeldir. Deneyde arazi soldan sağa doğrusal yükselen düz yamaç olarak açıkça verilmiştir, bu yüzden eş kotların yerleri aynı doğrusal bağıntıyla üretilir. Bu model bütün gerçek dağların doğrusal veya tek yamaçlı olduğu anlamına gelmez."
        ]
      },
      {
        "title": "Aynı verinin farklı gösterimini denetle",
        "paragraphs": [
          "Ölçek deneyinde boyut çarpanını değiştirince kâğıt mesafesi ve etkin payda değişir, gerçek yatay mesafe ile arazi kotları sabit kalır. İzohips aralığı ayarı ise hangi kot çizgilerinin gösterildiğini değiştirir; aynı yamacın gerçek yükselmesini değiştirmez. İki ayarın farklı görevini ayrı ayrı izle.",
          "Sonuçları HTML’deki mesafe, alan, kot ve eğim değerleriyle kontrol et. Harita, profil ve hesap aynı araziyi tarif etmeli; birinde değişen yükselti diğerinde unutulmamalıdır. Verilen bilgi yetmiyorsa bilinmiyor demek doğru sonuçtur; boşluğu uydurma ölçümle doldurmak öğrenme değil yanlış güven oluşturur."
        ]
      }
    ],
    "examples": [
      {
        "title": "Uzunluğu birimle doğrula",
        "prompt": "1:125.000 ölçekli kâğıt haritada iki nokta arası 2,4 cm. Yatay uzaklık kaç km’dir?",
        "strategy": "Harita uzunluğu ve paydadan aynı birimde gerçek uzunluğu kur.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "2,4 cm ×125.000 =300.000 cm bulunur; N oranı boyutsuzdur."
          },
          {
            "label": "2. adım",
            "explanation": "100.000 cm=1 km olduğundan 300.000 /100.000 =3 km olur."
          },
          {
            "label": "3. adım",
            "explanation": "Sonuç yatay harita mesafesidir; eğimli yolun tamamı ayrıca verilmemiştir."
          }
        ],
        "answer": "3 km",
        "check": "1 cm 1,25 km’ye karşılık gelir; 2,4×1,25 =3 hesabı aynı sonucu verir.",
        "pitfall": "Santimetre sonucunu doğrudan kilometre diye yazma."
      },
      {
        "title": "Alan oranını karele",
        "prompt": "1:200.000 ölçekte bir yatay bölgenin harita alanı 3 cm²’dir. İz düşüm gerçek alan kaç km² olur?",
        "strategy": "Önce 1 cm’nin gerçek uzunluğunu, sonra alan karşılığını bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "1 cm gerçekte 200.000 cm=2 km’dir."
          },
          {
            "label": "2. adım",
            "explanation": "1 cm² için iki yönde ölçek uygulanır:2×2 =4 km²."
          },
          {
            "label": "3. adım",
            "explanation": "3 cm² ×4 km²/cm² =12 km² iz düşüm alan bulunur."
          }
        ],
        "answer": "12 km²",
        "check": "Doğrudan 3×(200.000)² cm² hesabı da 10^10’a bölününce 12 km² verir.",
        "pitfall": "Alanı yalnız N ile çarpma veya cm² dönüşümünde 100.000’i tek kez kullanma."
      },
      {
        "title": "Yarı boyutun ölçeği",
        "prompt": "1:100.000 harita her yönde 0,5 katına küçültülüyor. Çizgi ölçek de birlikte küçülüyor. Yeni kesir ölçek ve çizgi ölçeğin durumu nedir?",
        "strategy": "Aynı gerçek mesafenin kâğıtta yarı uzunluğa geçtiğini kullan.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Başlangıçta 1 cm 1 km’yi gösterirken yeni çizimde 0,5 cm aynı 1 km’yi gösterir."
          },
          {
            "label": "2. adım",
            "explanation": "Yeni 1 cm 2 km’ye karşılık gelir; payda 200.000 olur."
          },
          {
            "label": "3. adım",
            "explanation": "Çizgi ölçek de aynı oranda değiştiğinden gerçek mesafe etiketini korur; eski basılı 1:100.000 yazısı güncellenmelidir."
          }
        ],
        "answer": "1:200.000; birlikte değişen çizgi ölçek geçerli",
        "check": "Yarı boyutta küçültmek ölçeği büyütmez; kesir daha küçük olur ve aynı yerler daha küçük çizilir.",
        "pitfall": "Sadece basılı kesir yazısının kendiliğinden doğru kaldığını varsayma."
      },
      {
        "title": "Yüzde ve binde eğim",
        "prompt": "A noktası 100 m, B 220 m kotundadır. Aradaki yatay uzaklık 4 km; yamaç doğrusal verilmiştir. Ortalama yüzde ve binde eğimi bul.",
        "strategy": "Yükselti farkı ile yatay uzaklığı aynı metre biriminde kur.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Kot farkı 220−100 =120 m, yatay uzaklık 4000 m’dir."
          },
          {
            "label": "2. adım",
            "explanation": "120/4000 =0,03; yüzde için×100 =%3 bulunur."
          },
          {
            "label": "3. adım",
            "explanation": "Binde için aynı oran×1000 =30‰ olur; bu 3° anlamına gelmez."
          }
        ],
        "answer": "%3 ve 30‰",
        "check": "120 m yükselme 4000 m yatayda her 100 m için 3 m yükselmeye karşılık gelir.",
        "pitfall": "Kotun kendisini 220/4000 diye bölme veya yüzdeyi dereceyle eşitleme."
      }
    ],
    "recall": [
      {
        "prompt": "1:N neden birimsizdir?",
        "answer": "Aynı tür iki uzunluğun oranıdır. 1 cm→N cm karşılığında birimler sadeleşir; N’nin kendisi cm değildir."
      },
      {
        "prompt": "Alan dönüşümünde neden N² kullanılır?",
        "answer": "İki yatay yönde de N kat büyütme vardır. 1 km²=10^10 cm²; uzunluk dönüşümü tek kez yetmez."
      },
      {
        "prompt": "Fotokopide çizgi ölçek ne koşulla geçerlidir?",
        "answer": "Harita ve çizgi ölçek her iki yönde aynı oranda büyütülür/küçültülürse; eski basılı kesir sayısı ayrıca güncellenir."
      },
      {
        "prompt": "Sık kontur her haritada daha dik midir?",
        "answer": "Yalnız ölçek ve eş yükselti aralığı karşılaştırılabilirken. Farklı haritalarda bu iki koşulu önce denetle."
      }
    ],
    "items": [
      [
        "1:125.000 haritada iki nokta arası 2,4 cm. Gerçek yatay uzaklık kaç km?",
        "3",
        [
          "30",
          "300",
          "0,3",
          "125"
        ],
        "Önce santimetre sonucunu bul, sonra 100.000’e böl.",
        "2,4×125.000 =300.000 cm=3 km. Ölçek oranı birimsizdir; cm sonucunu doğrudan km diye okuyamayız."
      ],
      [
        "1:200.000 ölçekte harita alanı 3 cm². İz düşüm gerçek alan kaç km²?",
        "12",
        [
          "6",
          "600",
          "3",
          "1200"
        ],
        "Bir santimetre 2 km ise bir santimetrekare 4 km² olur.",
        "3×2² =12 km². Alan oranında payda karesi veya iki yönlü uzunluk karşılığı kullanılır; tek yönlü çarpma yetmez."
      ],
      [
        "1:100.000 harita her iki yönde yarı boyuta küçültülüyor. Yeni kesir ölçek nedir?",
        "1:200.000",
        [
          "1:50.000",
          "1:100.000",
          "1:25.000",
          "1:10.000"
        ],
        "Aynı yer kâğıtta yarı uzunlukla görünür.",
        "Boyut çarpanı 0,5; yeni payda 100.000/0,5 =200.000’dir. Bu işlem gerçek araziyi küçültmez veya yeni ayrıntı üretmez."
      ],
      [
        "Harita ve çizgi ölçek birlikte her yönde 2 kat büyütülüyor; basılı 1:100.000 sayısı değişmemiş. Hangisi doğrudur?",
        "Çizgi ölçek geçerlidir; doğru yeni kesir 1:50.000’dir.",
        [
          "Basılı kesir kendiliğinden hâlâ doğrudur.",
          "Gerçek dağ yükseltisi 2 kat olur.",
          "Gerçek arazi alanı 4 kat büyür.",
          "Bütün bilinmeyen ayrıntılar ölçülmüş olur."
        ],
        "Çizgi ölçek haritayla aynı boyut değişimini geçirir.",
        "Yeni payda N/2 =50.000’dir. Birlikte büyüyen çizgi ölçek aynı gerçek mesafeyi temsil eder; eski yazının sayısı ayrıca değişmelidir."
      ],
      [
        "A 100 m, B 220 m; yatay uzaklık 4 km ve doğrusal yamaç verilmiştir. Ortalama yüzde eğim nedir?",
        "%3",
        [
          "%30",
          "%5,5",
          "%120",
          "3°"
        ],
        "Kot farkını metreye çevrilmiş yatay mesafeye böl.",
        "Δh 120 m, yatay 4000 m; 120/4000×100 =%3. 220 m kotun kendisidir; 3° ise farklı niceliktir."
      ],
      [
        "Aynı haritada kontur değerleri 100,120,140,160 m olarak ardışık verilmiş. Temel eş yükselti aralığı nedir?",
        "20 m",
        [
          "40 m",
          "60 m",
          "100 m",
          "160 m"
        ],
        "Komşu iki değer arasındaki düşey farkı al.",
        "120−100 =20 m ve sonraki farklar da 20 m’dir. Dört çizgi arasında üç aralık vardır; toplam 60 m’yi tek aralık saymayız."
      ],
      [
        "Bir tepe yerine içe dönük çukur taraması var; iç içe çizgiler dıştan içe 300,280,260 m olarak etiketli. En uygun biçim nedir?",
        "Kapalı çukur",
        [
          "Her durumda tepe",
          "Mutlaka deniz seviyesi",
          "Kesin sırt doruğu",
          "Sadece idari sınır"
        ],
        "Kotun içe doğru artıp azaldığına ve işarete bak.",
        "İçe doğru kot azalıyor, çukur taraması bunu destekliyor. Her kapalı halkayı otomatik tepe kabul etmek veriye aykırıdır."
      ],
      [
        "Fiziki harita legendinde yeşil 0–200 m yükseltiyi gösteriyor. Yeşil boyalı bir alan hakkında yalnız bu bilgiyle hangisi kesin değildir?",
        "Ormanla kaplı olması",
        [
          "Legendde belirtilen alçak yükselti aralığında olması",
          "Rengin burada yükselti için kullanılması",
          "Bitki bilgisi için ek veri gerekmesi",
          "Rengin anlamının açıklamada bulunması"
        ],
        "Yükselti teması ile bitki örtüsünü ayır.",
        "Yeşil bu haritada yükseklik sınıfıdır; orman, ova veya ürün türünü otomatik göstermez. Orman sonucunu kurmak için bitki verisi gerekir."
      ],
      [
        "İki haritada çizgi sıklığı farklı; ölçek ve düşey kontur aralığı bilinmiyor. Hangisi doğru yaklaşımdır?",
        "Diklik kıyası için ölçek ve düşey aralık da gerekir.",
        [
          "Sık olan her koşulda daha diktir.",
          "Her çizgi aynı gerçek metreyi zorunlu gösterir.",
          "İki haritanın bütün kotları eşittir.",
          "Fotokopi arazi yükseltisini değiştirir."
        ],
        "Yatay ve düşey ölçeğin birlikte karşılaştırıldığından emin ol.",
        "Çizgi sıklığı aynı harita koşulunda anlamlıdır. Farklı ölçek veya aralık aynı araziyi farklı sıklıkta gösterebilir; veri eksikken kesin diklik sıralaması kurulmaz."
      ],
      [
        "Bir CBS’de veri katmanları depolanıyor, sorgulanıyor ve yıllara göre karşılaştırılıyor. Hangisi bu sistemin zorunlu sonucu değildir?",
        "Gerçek dünyadaki değişimin engellenmesi",
        [
          "Katmanların birlikte incelenebilmesi",
          "Konuma dayalı sorgu yapılabilmesi",
          "Verilerin güncelliğinin ayrıca denetlenmesi",
          "Uygun verilerle değişimin gösterilebilmesi"
        ],
        "Veriyi göstermek ile gerçek süreci durdurmayı ayır.",
        "CBS bilgiyi depolayıp çözümlemeye yardım eder; gerçek Dünya’nın zamanla değişmesini durdurmaz. Verinin doğruluğu ve güncelliği de ayrıca korunmalıdır."
      ]
    ],
    "source": "Aurelia Harita Bilgisi kâğıdı; OGM 9. Sınıf Harita Bilimi PDF 10–20,22 ve Haritalarda Yöntem ve Teknikler PDF 10–21; MEBİ TYT Coğrafya PDF 26–33 ile karşılaştırılmış özgün öğretim ve sorular. Boyut/izohips deneyi özgün düz yamaç; ekran fiziksel cetvel değildir."
  }
];
export const forge020GeographyTopics:Record<string,string>=Object.fromEntries(data.map(d=>[d.id,d.topic]));
export const forge020GeographyGuides:LessonGuide[]=data.map(({items:_i,topic:_p,title:_t,...d})=>d);
function question020(d:Unit020,item:Unit020['items'][number],i:number):Question{const[prompt,correct,wrong,hint,explanation]=item,answer=(i*3+1)%5,options=[...wrong];options.splice(answer,0,correct);return{id:`f020-geo-${d.id}-${i+1}`,prompt:txt(prompt),options:options.map(txt),answer,hint:txt(hint),explanation:txt(explanation),skill:`f020-geo-${d.id}-${i+1}`};}
export const forge020GeographyLessons:Lesson[]=data.map(d=>({id:d.id,subjectId:'tyt-cografya',title:txt(d.title),minutes:d.minutes,objectives:d.objectives.map(txt),body:d.sections.map(s=>({title:txt(s.title),text:txt(s.paragraphs.join(' '))})),questions:d.items.map((q,i)=>question020(d,q,i)),source:txt(d.source),tags:['kaynakli','etkilesimli','forge020']}));
