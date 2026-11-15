import {txt,type Lesson,type Question}from'../domain/model';
import type{GuideSection,LessonGuide,WorkedExample}from'./guides/types';
const number019=(n:number,min:number,max:number)=>{if(!Number.isFinite(n)||n<min||n>max)throw new RangeError('GEOGRAPHY_019_RANGE');return n;};
const integer019=(n:number,min:number,max:number)=>{number019(n,min,max);if(!Number.isInteger(n))throw new RangeError('GEOGRAPHY_019_INTEGER');return n;};
const flag019=(v:boolean)=>{if(typeof v!=='boolean')throw new RangeError('GEOGRAPHY_019_FLAG');return v;};
function entry019<T extends object>(m:T,key:string):T[keyof T]{if(!Object.hasOwn(m,key))throw new RangeError('GEOGRAPHY_019_OPTION');return m[key as keyof T];}
export const regionCells019=[
{rain:300,wheat:false,flat:true,clinic:'A'}, {rain:400,wheat:true,flat:true,clinic:'A'}, {rain:500,wheat:true,flat:false,clinic:'A'}, {rain:600,wheat:true,flat:false,clinic:'B'},
{rain:700,wheat:false,flat:true,clinic:'A'}, {rain:800,wheat:false,flat:true,clinic:'A'}, {rain:900,wheat:true,flat:false,clinic:'B'}, {rain:1000,wheat:true,flat:false,clinic:'B'},
{rain:650,wheat:false,flat:true,clinic:'A'}, {rain:550,wheat:false,flat:true,clinic:'B'}, {rain:450,wheat:true,flat:false,clinic:'B'}, {rain:350,wheat:false,flat:false,clinic:'B'}
]as const;
export const regionCriteria019={rain:{name:'Verilen yağış eşiği',kind:'Doğal şekilsel',proof:'Ölçülen yağışa göre alan seçilir; bir sağlık merkezinin hizmet bağı aranmaz. Bu eşik gerçek bir iklim tipi tanımı değildir.'},wheat:{name:'Buğday üreten alan',kind:'Beşerî şekilsel',proof:'Ortak ürün yetiştirme özelliği esas alınır. Ekonomik faaliyet olması alanı otomatik işlevsel yapmaz.'},flat:{name:'Verilen düz alan',kind:'Doğal şekilsel',proof:'Bu hazırlanmış veride düz olarak tanımlanan yerler seçilir. Eğim özelliği ile sağlık hizmeti ayrı ölçüttür.'}}as const;
export function region019(criterion:string,threshold:number,clinic:string,changed:boolean,selected:number){const c=entry019(regionCriteria019,criterion);number019(threshold,200,1200);if(!['A','B'].includes(clinic))throw new RangeError('GEOGRAPHY_019_CLINIC');flag019(changed);integer019(selected,0,11);const cells=regionCells019.map((v,i)=>({...v,id:i+1,clinic:changed&&i===2?'B':v.clinic,formal:criterion==='rain'?v.rain>=threshold:criterion==='wheat'?v.wheat:v.flat})),formal=cells.filter(v=>v.formal).map(v=>v.id),service=cells.filter(v=>v.clinic===clinic).map(v=>v.id),overlap=formal.filter(id=>service.includes(id));return{...c,cells,formal,service,overlap,threshold,clinic,changed,selected,target:cells[selected],limit:'On iki hücre, yağış ve tarım özellikleri özgün örnek veridir; gerçek bir il, iklim normali veya hastane haritası değildir. Yağış eşiği değişince verinin kendisi değil seçme ölçütü değişir. Kurum kararı açıkken yalnız 3. hücrenin hizmet ataması A’dan B’ye geçer.'};}
export const waterways019={
 bering:{name:'Bering Boğazı',kind:'Doğal boğaz',location:'Asya–Kuzey Amerika arası',seas:['Bering Denizi','Çukçi Denizi'],proof:'Büyük Okyanus ile Kuzey Buz Denizi arasındaki deniz bağlantısındadır; kutup koşulları kullanımı etkiler.'},
 panama:{name:'Panama Kanalı',kind:'Yapay kanal',location:'Panama',seas:['Karayip Denizi','Büyük Okyanus'],proof:'Atlas Okyanusu tarafıyla Büyük Okyanus arasında Güney Amerika çevresini dolaşmaya alternatif geçiştir; gemi boyutu ve işletme koşulları önemlidir.'},
 magellan:{name:'Macellan Boğazı',kind:'Doğal boğaz',location:'Güney Amerika güneyi, Şili',seas:['Atlas Okyanusu','Büyük Okyanus'],proof:'Güney Amerika ana karası ile güneydeki adalar arasındaki doğal geçiştir; Panama ile aynı yerde veya aynı türde değildir.'},
 kiel:{name:'Kiel Kanalı',kind:'Yapay kanal',location:'Almanya',seas:['Kuzey Denizi','Baltık Denizi'],proof:'Kuzey ve Baltık denizleri arasındaki yapay geçiş, kuzeyden dolaşmaya alternatif oluşturur; her geminin geçebildiği varsayılmaz.'},
 dover:{name:'Dover Boğazı',kind:'Doğal boğaz',location:'Britanya–Fransa arası',seas:['Manş Denizi','Kuzey Denizi'],proof:'Batı Avrupa deniz ağında Manş ile Kuzey Denizi arasındaki dar geçiştir; kanal adı taşıyan yapay su yolu değildir.'},
 gibraltar:{name:'Cebelitarık Boğazı',kind:'Doğal boğaz',location:'İber Yarımadası–Kuzey Afrika',seas:['Akdeniz','Atlas Okyanusu'],proof:'Akdeniz’in batı çıkışıdır. Süveyş doğu yönünde Kızıldeniz bağlantısı kurar; iki geçişin denizleri aynı değildir.'},
 corinth:{name:'Korint Kanalı',kind:'Yapay kanal',location:'Yunanistan',seas:['Korint Körfezi','Saronik Körfezi'],proof:'Yunanistan’daki dar yapay geçiştir; bütün büyük gemilerin kullandığı sınırsız kapasiteli bir rota değildir.'},
 turkish:{name:'Türk boğazları',kind:'İki doğal boğaz',location:'Türkiye',seas:['Karadeniz','Marmara','Ege–Akdeniz'],proof:'İstanbul Boğazı Karadeniz’i Marmara’ya, Çanakkale Boğazı Marmara’yı Ege’ye bağlar. Zincirde Marmara ara denizdir.'},
 suez:{name:'Süveyş Kanalı',kind:'Yapay kanal',location:'Mısır',seas:['Akdeniz','Kızıldeniz'],proof:'Avrupa–Hint Okyanusu rotasında Afrika’nın güneyini dolaşmaya alternatif yapay bağlantıdır; bekleme, ücret ve gemi koşulları ayrıca değerlendirilir.'},
 bab:{name:'Babülmendep Boğazı',kind:'Doğal boğaz',location:'Arap Yarımadası–Doğu Afrika',seas:['Kızıldeniz','Aden Körfezi'],proof:'Kızıldeniz’in güney çıkışıdır. Süveyş ile birlikte kullanıldığında Akdeniz–Hint Okyanusu güzergâhının ayrı bir halkasıdır.'},
 hormuz:{name:'Hürmüz Boğazı',kind:'Doğal boğaz',location:'Basra Körfezi çıkışı',seas:['Basra Körfezi','Umman Körfezi'],proof:'Basra Körfezi’ni Umman Körfezi üzerinden açık denizlere bağlar. Enerji taşımacılığında önemlidir; tarih ve ölçüt verilmeden güncel pay hesaplanmaz.'},
 malacca:{name:'Malakka Boğazı',kind:'Doğal boğaz',location:'Malaya Yarımadası–Sumatra',seas:['Hint Okyanusu koridoru','Güney Çin Denizi koridoru'],proof:'Andaman Denizi ve Singapur Boğazı hattıyla Hint Okyanusu–Güney Çin Denizi koridorundadır. Karşılaştırmada yalnız kuş uçuşu çizgi kullanılmaz.'}
}as const;
export function transport019(waterway:string,speed:number,wait:number,open:boolean){const w=entry019(waterways019,waterway);number019(speed,10,100);number019(wait,0,40);flag019(open);const around=1000/speed,shortcut=open?700/speed+wait:null,savedDistance=open?300:0,best=shortcut===null?'Dolaşma rotası':Math.abs(shortcut-around)<1e-9?'Süreler eşit':shortcut>around?'Dolaşma rotası':'Kanal rotası';return{...w,speed,wait,open,around,shortcut,savedDistance,best,thresholdWait:300/speed,limit:'X–Y arasındaki 1000 km ve 700 km özgün deney rotalarıdır; seçilen gerçek su yolunun mesafesi değildir. İki rotada aynı sabit hız varsayılır; kanal beklemesi ayrıca eklenir. Diğer ücret, yakıt, akıntı ve kapasite verileri verilmedi; en uygun ticari rota kesinleşmez.'};}
export function environment019(load:number,flow:number,prevention:number,capture:number){number019(load,0,5000);number019(flow,1000,10000);number019(prevention,0,100);number019(capture,0,100);const avoided=load*prevention/100,entered=load-avoided,retained=entered*capture/100,emitted=entered-retained;return{load,flow,prevention,capture,avoided,entered,retained,emitted,before:entered/flow,after:emitted/flow,balance:avoided+retained+emitted,limit:'Özgün X maddesi için bir günlük sabit akış ve tam karışım örneği. Akış L/gün, yük mg/gün, derişim mg/L; hacim kaybı ve kimyasal tepkime yoktur. Tutulan madde yok olmaz, ayrı atık olarak yönetilmelidir. Gerçek tesis verimi, sağlık sınırı ve içilebilirlik bu veriden bulunmaz.'};}
export const disasterActions019={
 strengthen:{name:'Olay öncesi yapı iyileştirme',phase:'Zarar azaltma',proof:'Yapı ve altyapının uzman denetimiyle daha dayanıklı hâle getirilmesi, olay öncesi kırılganlığı azaltma işidir.'},
 drill:{name:'Olay öncesi tatbikat',phase:'Hazırlık',proof:'Görev, tahliye ve iletişim planını olaydan önce denemek hazırlıktır; gerçek olayda arama-kurtarma değildir.'},
 rescue:{name:'Olay sonrası arama-kurtarma',phase:'Müdahale',proof:'Olayın hemen ardından can kurtarma ve acil ihtiyaçlara yanıt verme müdahale aşamasıdır.'},
 shelter:{name:'Olay sonrası geçici barınma',phase:'Müdahale',proof:'Acil barınma ve temel ihtiyaç desteği müdahaledir; kalıcı ekonomik ve yerleşim düzeninin yeniden kurulmasıyla aynı iş değildir.'},
 rebuild:{name:'Kalıcı su altyapısı onarımı',phase:'İyileştirme',proof:'Hizmet ve kalıcı yaşam düzenini yeniden kurma iyileştirmedir; yalnız ilk an kurtarması değildir.'},
 livelihood:{name:'Geçim işlerinin yeniden kurulması',phase:'İyileştirme',proof:'Afetten sonra üretim ve geçim olanaklarının yeniden kurulması iyileştirme boyutudur; fiziksel onarım tek başına bütün süreci tamamlamaz.'}
}as const;
export const floodSites019=[1,2,3,4,5,6,7,8,9,10,12,13,14]as const;
export function disaster019(level:number,moved:boolean,strong:boolean,action:string){number019(level,0,10);flag019(moved);flag019(strong);const a=entry019(disasterActions019,action),sites=floodSites019.map((height,i)=>({id:i+1,height})),homes=Array.from({length:10},(_,i)=>({id:i+1,site:moved&&i<3?i+10:i})).map(h=>({...h,height:sites[h.site].height,exposed:sites[h.site].height<=level})),exposed=homes.filter(h=>h.exposed).length;return{...a,level,moved,strong,sites,homes,exposed,total:10,vulnerability:strong?'Daha düşük örnek kırılganlık':'Daha yüksek örnek kırılganlık',limit:'Verilen varsayımsal taşkın seviyesi, 13 sabit yer kotu ve 10 evden oluşan özgün kesit. Ev kat kotuna su ulaşırsa maruz sayılır; yatay mesafe ölçeği yoktur. Taşınma açıkken ilk üç ev 12–14 m yerlere gider. Gerçek taşkın tahmini, hasar olasılığı, mühendislik uygunluğu veya can kaybı hesabı yapılmaz.'};}

type Unit019 = {id:string;topic:string;title:string;minutes:number;objectives:string[];sections:GuideSection[];examples:WorkedExample[];recall:LessonGuide['recall'];items:[string,string,string[],string,string][];source:string;};
const data:Unit019[] = [
  {
    "id": "bolge-turleri",
    "topic": "detail-70",
    "title": "Bölge ve bölge türleri: ölçüt, sınır ve ağ",
    "minutes": 85,
    "objectives": [
      "Bir bölgenin hangi ölçüt ve amaçla tanımlandığını açıkla.",
      "Doğal ve beşerî şekilsel alanları işlevsel hizmet ağlarından ayır.",
      "Örtüşme, geçiş ve değişimi verilen veriye göre karşılaştır."
    ],
    "sections": [
      {
        "title": "Bölgeyi bir soruya cevap olarak kur",
        "paragraphs": [
          "Bölge, seçilen bir veya birkaç özelliğe göre çevresinden ayrılan alan olarak tanımlanır. Sınır çizmeden önce neyi araştırdığımızı belirtiriz: benzer yağış, buğday üretimi veya bir sağlık merkezinden hizmet alma farklı sorulardır. Aynı yer bu soruların her birinde farklı bir grubun parçası olabilir.",
          "Bir bölgenin adı tek başına yeterli bilgi değildir. Ölçütü, veri tarihini, gösterim ölçeğini ve sınır kuralını oku. İklim bölgesi çizgisi ile il sınırı üst üste gelmek zorunda değildir; haritadaki bütün çizgilerin aynı nedenle oluştuğunu düşünmek coğrafi açıklamayı zayıflatır."
        ]
      },
      {
        "title": "Şekilsel bölgede ortak özelliği ara",
        "paragraphs": [
          "Şekilsel bölge, belirli bir özelliğin benzerliği veya ortak varlığıyla oluşturulur. Dağlık alan, bozkır kuşağı, yoğun nüfuslu yerler ve aynı ürünün yetiştiği alanlar farklı şekilsel bölgelerdir. Benzerlik her özelliğin aynı olması demek değildir; bir dağ bölgesinin nüfusu veya yağışı kendi içinde değişebilir.",
          "Bir tarım alanının ekonomik olması onu otomatik olarak işlevsel yapmaz. Buğday yetiştiren yerleri ortak ürün özelliğiyle seçmek beşerî şekilsel sınıflamadır. Bu yerlerin hangi fabrikaya ürün gönderdiği veya hangi pazara bağlı olduğu incelenirse bu kez akış ve merkez ilişkisiyle işlevsel bir ağ kurulabilir."
        ]
      },
      {
        "title": "Yer şekli ve iklim ölçütleri",
        "paragraphs": [
          "Toroslar, Kuzey Anadolu Dağları, Alpler ve Himalayalar dağlık alan örnekleridir; Çukurova, Konya ve Ergene ovaları farklı çevrelerdeki ova örnekleridir. Plato, çevresine göre yüksek ve akarsularla yarılmış yüzey niteliğiyle tanımlanır; bütün noktalarının tamamen düz olduğu veya her yüksek yerin plato olduğu söylenmez.",
          "Akdeniz, muson veya ekvatoral iklim bölgesi sıcaklık ve yağışın yıllık düzeniyle incelenir. Yalnız bir aylık yağmur veya haritadaki tek bir enlem çizgisi bütün iklim tipini belirlemez. Modelimizde kullanılan yağış eşiği yalnız hazırlanmış hücreleri seçme kuralıdır; gerçek bir iklim tipinin bilimsel sınırı olarak verilmez."
        ]
      },
      {
        "title": "Su, toprak, bitki ve tehlike alanları",
        "paragraphs": [
          "Amazon, Mississippi, Nil ve Yeşilırmak havzaları suların toplandığı alanlar olarak hidrografik ölçütle ele alınır. Van Gölü veya Tuz Gölü gibi kapalı havzalarla denize ulaşan akarsu havzaları çıkış ilişkisi bakımından ayrılır. Havza sınırını komşu ilin yönetim sınırıyla karıştırma; su bölümü çizgisi yer şekline bağlıdır.",
          "Tayga, maki ve bozkır bitki örtüsü; çernezyom veya alüvyal toprak dağılışı toprak; deprem ya da taşkın tehlikesinin dağılışı ise tehlike ölçütlü bölgeler oluşturabilir. Ormanın varlığı doğal örtü bilgisidir; odun üretim miktarıyla aynı yerleri seçmek ekonomik faaliyet ölçütüdür. Aynı alanın birden fazla etiketi olabilir."
        ]
      },
      {
        "title": "Nüfus, kültür ve ekonomik özellikler",
        "paragraphs": [
          "Nüfus yoğunluğu, kentleşme, kırsal yerleşme biçimi veya kullanılan dil gibi özellikler beşerî şekilsel bölgeler kurmakta kullanılabilir. Nüfusun toplamı ile yoğunluğu farklı ölçülerdir; yoğunluk için alan da gerekir. Kültür ve dil bölgeleri insanları değişmez, tek tip veya biyolojik kutulara ayırmaz; göç ve iletişimle sınırlar dönüşebilir.",
          "Pamuk, çay, zeytin üretimi, madencilik ve sanayi yoğunluğu ekonomik faaliyet örnekleridir. Çayın yetiştiği alanı seçmekle aynı çay fabrikasına ürün veren köyleri seçmek farklıdır. Birincisinde ortak üretim özelliği, ikincisinde hizmet veya mal akışı bağı belirleyicidir. Soruda hangi ilişkinin istendiğini somut fiilden bul."
        ]
      },
      {
        "title": "İşlevsel bölgede merkez ve bağlantıyı izle",
        "paragraphs": [
          "İşlevsel bölge, bir merkezin çevresiyle kurduğu hizmet, yönetim, ulaşım veya mal akışı ilişkisiyle ele alınır. Hastanenin hizmet verdiği yerler, limanın yük topladığı hinterlant ve bir ulaşım merkezinin bağlantıları bu yaklaşıma örnektir. Merkeze bağlı alanların hepsinde aynı yağış, toprak veya nüfus yoğunluğu bulunması gerekmez.",
          "Bir yol ağı üzerinde erişim süresi ve hizmet ataması değiştiğinde işlevsel alan da değişebilir. Haritada merkeze en yakın görünen yer her durumda o merkeze bağlı olmak zorunda değildir; ulaşım engeli, kurum kararı veya hizmet kapasitesi farklı sonuç yaratabilir. Bu yüzden modelde verilen atamayı, belirtilmeyen en kısa mesafe hesabıyla değiştirmeyiz."
        ]
      },
      {
        "title": "Hizmet kurumları ve yönetim alanları",
        "paragraphs": [
          "DSİ, Karayolları, Meteoroloji ve Orman gibi kurumların görev alanları sundukları hizmete ve yönetim düzenine göre oluşturulur. Farklı kurumların bölge sınırları aynı çizgiyi izlemek zorunda değildir. Bir kurumun bölge müdürlüğü haritası bütün Türkiye için tek doğal bölgeleme değildir; yetki ve iş dağılımını gösterir.",
          "İl, ilçe ve köy gibi yönetsel alanlarda kanun ve idari kararlar belirleyicidir. Bir yerin başka ilçeye bağlanması onun iklimini veya dağlık yapısını aynı anda değiştirmez. Doğal özellik ile yönetim etiketi ayrı katmanlardır; aynı sınırı kullanarak veri toplamak pratik olsa bile nedenleri birbirine karıştırılmaz."
        ]
      },
      {
        "title": "Kalkınma ve istatistik için bölge",
        "paragraphs": [
          "GAP, DAP, DOKAP ve KOP farklı alanlarda kalkınma ve planlama çalışmalarına örnektir. KOP, Konya Ovası Projesi adıdır; bölgesel programların amacı yalnız tek bir su yapısından ibaret sayılamaz. Sulama, üretim, ulaşım ve sosyal gelişme gibi bağlantılı hedeflerin hangi kaynak ve tarihte verildiği incelenir.",
          "İstatistik bölgeleri verileri karşılaştırma, toplama ve planlama amacıyla kurulur. Türkiye’de Düzey 3 il ölçeğine dayanır; daha üst düzeyler birden fazla ili birlikte ele alır. Bir istatistik grubunda bulunmak bütün illerin aynı gelişmişliğe sahip olduğunu göstermez; ortak çerçeve içinde yerel farklar ayrıca araştırılır."
        ]
      },
      {
        "title": "Üyelik alanı ile doğal yayılışı ayır",
        "paragraphs": [
          "Avrupa Birliği veya NATO üyeliğine göre renklendirilen haritalarda siyasi ve kurumsal bağ esas alınır. Üye sınırının değişmesi doğal dağ sıralarını veya denizleri taşımaz. Bir örgütün güncel üye sayısı, sınavda verilen veri yılıyla birlikte değerlendirilmelidir; tarih verilmeyen eski bir sayıyı bugünün bilgisi gibi kullanmayız.",
          "Üyelik ortaklığı ülkelerin bütün kültürel, ekonomik veya çevresel özelliklerinin aynı olduğu anlamına gelmez. Aynı ülke farklı amaçlı birçok örgüte katılabilir ve başka doğal bölgelerle de kesişebilir. Haritada çok katmanlı düşünmek, tek bir siyasi etiketten bütün coğrafi özellikleri çıkarma hatasını önler."
        ]
      },
      {
        "title": "Örtüşme, ayrılma ve geçiş kuşağı",
        "paragraphs": [
          "Bir kıyı ovası aynı anda Akdeniz iklim alanı, tarım alanı ve bir limanın hizmet alanı içinde olabilir. Bu örtüşme ölçütlerin aynı olduğunu göstermez. Tersine, başka bir ova aynı iklimi taşıdığı hâlde farklı limana bağlanabilir. Alanları karşılaştırırken kesişim, yalnız bir grupta kalanlar ve iki gruba da girmeyenler ayrı sayılır.",
          "Doğal sınırlar her zaman ince ve keskin değildir; bitki örtüsü ve iklim özellikleri geçiş kuşağı oluşturabilir. Kullanılan eşik, veri çözünürlüğü ve harita ölçeği sınırı etkiler. Bir özelliğin ortalamasına bakmak yerel farkları silebilir; büyük bölgeden tek köyün bütün değerlerini kesin hesaplayamayız."
        ]
      },
      {
        "title": "Sınır değişiminin nedenini açıkla",
        "paragraphs": [
          "Beşerî sınırlar kurum kararı, yatırım, yeni yol veya göç gibi etkenlerle değişebilir. Doğal sınırlar çoğu örnekte uzun süreçte değişse de akarsu yatağının yön değiştirmesi, heyelan veya volkanik olay bazı özellikleri kısa sürede dönüştürebilir. Doğal her zaman yavaş, beşerî her zaman hızlı biçiminde mutlak bir yasa kurulmaz.",
          "Bir haritada yağış eşiğinin 600 mm’den 800 mm’ye yükseltilmesi ölçümdeki yağışı artırmaz; yalnız seçilen hücreleri azaltabilir. Kurumun 3. hücreyi A’dan B’ye bağlaması ise hizmet katmanını değiştirir. Önce değişen şeyin veri mi, seçim kuralı mı yoksa ilişki mi olduğunu söyle; sonra sınırın etkisini karşılaştır."
        ]
      },
      {
        "title": "Haritadan gerekçeli sonuca git",
        "paragraphs": [
          "Bir soruda önce ölçüt sözcüğünü işaretle: benzer, yetişen, bağlı, hizmet alan veya yönetilen ifadeleri farklı ilişkilere yöneltir. Sonra verilen sınır, tarih ve ölçüye bak. Aynı renk benzer bir özelliğin gösterimidir; ölçüt yazılmadıkça rengin yağış, nüfus, tarım ya da kurum hizmeti olduğunu tahmin edemeyiz.",
          "Etkileşimli hücrelerde hem şekilsel üyelik hem hizmet bağı HTML listesinde görünür. Tek bir hücreyi seçip neden bir kümeye girdiğini kendi değeriyle açıkla. Sonra yalnız bir ayarı değiştirerek hangi sonucun sabit kaldığını denetle. Bu karşılaştırma bir tanımı ezberlemenin ötesinde bölgelemenin nasıl çalıştığını gösterir."
        ]
      }
    ],
    "examples": [
      {
        "title": "İki ölçütün kesişimi",
        "prompt": "Altı eş alan hücrenin yağışları sırasıyla 300, 700, 900, 400, 800, 1000 mm’dir. A merkezine 1, 2, 4 ve 6 bağlıdır. Yağışı en az 700 mm olan ve A’ya bağlı kaç hücre vardır?",
        "strategy": "Önce iki kümeyi ayrı kur, sonra kesişimi say.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Yağış eşiğini sağlayan hücreler 2, 3, 5 ve 6’dır; eşik en az olduğu için 700 dâhildir."
          },
          {
            "label": "2. adım",
            "explanation": "A hizmet kümesi 1, 2, 4 ve 6’dır. Bu üyelik yağış değerinden bağımsız verilmiştir."
          },
          {
            "label": "3. adım",
            "explanation": "Her iki listede bulunanlar 2 ve 6’dır; kesişimde iki hücre vardır."
          }
        ],
        "answer": "2 hücre",
        "check": "Dört yağış hücresinin yalnız ikisi A’ya bağlı; diğer iki tanesi 3 ve 5’tir.",
        "pitfall": "Bütün yağış kümesini veya A’nın toplam dört hücresini kesişim sanma."
      },
      {
        "title": "Ekonomi şekilsel mi işlevsel mi?",
        "prompt": "X haritası buğday yetiştiren bütün köyleri, Y haritası bir değirmene ürün gönderen köyleri gösteriyor. Ölçütleri sınıflandır.",
        "strategy": "Ortak özellik ile merkeze yönelen akışı ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "X’te köyleri seçme nedeni ortak ürün yetiştirmedir; bir merkezle bağlantı koşulu yoktur."
          },
          {
            "label": "2. adım",
            "explanation": "Y’de değirmen merkezdir ve köylerin oraya ürün akışı belirleyicidir; her köyün aynı ürünü yetiştirmesi ayrıca verilmez."
          },
          {
            "label": "3. adım",
            "explanation": "X beşerî şekilsel, Y işlevsel bölge olarak değerlendirilir."
          }
        ],
        "answer": "X: beşerî şekilsel; Y: işlevsel",
        "check": "Ekonomik sözcüğü iki örnekte de bulunur, fakat sınıflandırmayı kuran ilişki farklıdır.",
        "pitfall": "Ekonomik olan her alanı doğrudan işlevsel sayma."
      },
      {
        "title": "Ölçüt değişti, iklim değişmedi",
        "prompt": "Dört hücrede yağış 500, 600, 750, 900 mm’dir. İlk çizim en az 600, ikinci çizim en az 800 mm seçiyor. Ölçümler sabitken ne değişti?",
        "strategy": "Veri ile seçme eşiğini ayrı tut.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk koşulda 2, 3 ve 4. hücreler üyedir; 600 mm eşik içinde kalır."
          },
          {
            "label": "2. adım",
            "explanation": "İkinci koşulda yalnız 4. hücre üyedir; 750 mm yeni eşiği karşılamaz."
          },
          {
            "label": "3. adım",
            "explanation": "Üye sayısı üçten bire iner, ama dört yağış ölçümünün hiçbiri değişmez."
          }
        ],
        "answer": "Üyelik 3’ten 1’e düşer; veri sabittir.",
        "check": "900 mm hücresi iki seçime de girer; 500 mm hücresi ikisine de girmez.",
        "pitfall": "Haritada daha az alan boyandı diye gerçek yağışın azaldığını söyleme."
      },
      {
        "title": "Kurum kararı ve doğal katman",
        "prompt": "Bir kurum 3. köyü A hizmet alanından B’ye geçiriyor. Köyün yükseltisi ve yağışında ölçülen değişim yok. Hangi sınırın değiştiği açıklanabilir?",
        "strategy": "Kararın doğrudan etkilediği ilişkiyi bul.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Verilen karar, hangi merkezin köye hizmet sunduğunu değiştiriyor; bu bir işlevsel bağdır."
          },
          {
            "label": "2. adım",
            "explanation": "Yükselti ve yağışta değişim yok; doğal şekilsel özellikler bu kararla yeniden ölçülmüş sayılmaz."
          },
          {
            "label": "3. adım",
            "explanation": "A hizmet kümesi bir üye kaybeder, B bir üye kazanır. Toplam köy sayısı sabittir."
          }
        ],
        "answer": "İşlevsel hizmet sınırı değişir.",
        "check": "Bir köyün B’ye eklenmesi yeni bir köy yaratmaz ve iklim tipini otomatik değiştirmez.",
        "pitfall": "Bütün bölge katmanlarının aynı anda değiştiğini varsayma."
      }
    ],
    "recall": [
      {
        "prompt": "Şekilsel bölgenin temel bağı nedir?",
        "answer": "Verilen ortak özellik veya benzerlik; merkeze akış zorunlu değildir."
      },
      {
        "prompt": "İşlevsel bölgede ne aranır?",
        "answer": "Merkezle hizmet, mal, ulaşım veya yönetim ilişkisi; bütün doğal değerlerin aynı olması gerekmez."
      },
      {
        "prompt": "Yağış eşiğinin değiştirilmesi neyi değiştirir?",
        "answer": "Ölçüm sabitse yalnız seçme kuralını ve üyeliği; gerçek yağışı değil."
      },
      {
        "prompt": "Bir yer kaç bölgeye girebilir?",
        "answer": "Farklı ölçütlü birçok bölgeye aynı anda girebilir; her ölçütün üyeliği ayrı gerekçelendirilir."
      }
    ],
    "items": [
      [
        "X haritasında yalnız aynı buğday ürününü yetiştiren köyler boyanmıştır; ortak bir merkezle bağlantı koşulu yoktur. Bölge türü nedir?",
        "Beşerî şekilsel",
        [
          "Doğal şekilsel",
          "Hastane hizmet bölgesi",
          "Mutlaka işlevsel ulaşım bölgesi",
          "Yalnız su toplama havzası"
        ],
        "Köyleri seçen ortak özelliği bul.",
        "Buğday üretimi insanın ekonomik faaliyeti olup ortak özellik ölçütüdür. Merkez veya akış verilmediği için işlevsel bağı zorunlu sayamayız."
      ],
      [
        "Bir hastane farklı yağış ve yükselti değerlerine sahip beş yerleşmeye hizmet veriyor. Bu yerler hizmet bağına göre tek bölge sayılmıştır. Hangisi doğrudur?",
        "Bölge işlevseldir; aynı yağış zorunlu değildir.",
        [
          "Bütün yerler kesin aynı iklimdedir.",
          "Hizmet bağı yalnız doğal bölge kurar.",
          "Farklı yükselti varsa bölge kurulamaz.",
          "Hastane il sınırının dışında hizmet veremez."
        ],
        "Birliği sağlayan ilişkinin ne olduğuna bak.",
        "Ortaklık hastaneye hizmet bağıdır. İşlevsel bölgede farklı doğal özellikler bulunabilir; verilen ilişkiden aynı iklim veya idari sınır zorunluluğu çıkmaz."
      ],
      [
        "Dört hücrede yağış 400, 650, 800 ve 900 mm’dir. Kural en az 700 mm ise kaç hücre seçilir?",
        "2",
        [
          "1",
          "3",
          "4",
          "0"
        ],
        "Her değeri aynı eşikle karşılaştır.",
        "800 ve 900 koşulu karşılar; 400 ve 650 karşılamaz. İki hücre seçilir. Bu eşik örnek bir seçme kuralıdır, gerçek iklim tipi tanımı değildir."
      ],
      [
        "A’ya bağlı hücreler 1, 2, 5; buğday yetişen hücreler 2, 3, 5, 6’dır. Her iki kümede bulunan hücreler hangileridir?",
        "2 ve 5",
        [
          "1 ve 6",
          "3 ve 6",
          "1, 2 ve 5",
          "2, 3, 5 ve 6"
        ],
        "İki listenin ortak üyelerini ara.",
        "Yalnız 2 ve 5 her iki listede vardır. Bütün A kümesi veya bütün buğday kümesi kesişim değildir; üyelik ölçütleri ayrı tutulur."
      ],
      [
        "Bir köy idari kararla başka ilçeye bağlanmış; yağış ve yükselti verileri aynı kalmıştır. Hangisi doğrudan değişmiş olabilir?",
        "Yönetsel sınır",
        [
          "Dağ sırasının fiziksel yeri",
          "Yıllık yağışın ölçülmüş miktarı",
          "Deniz seviyesinin kesin yüksekliği",
          "Yer kabuğunun yaşı"
        ],
        "Kararın etkilediği alanı seç.",
        "İlçeye bağlanma yönetsel ilişkidir. Verilen koşul doğal değerleri sabit tutar; idari karardan dağ veya yağış değişimi çıkarılmaz."
      ],
      [
        "Aynı kıyı alanı maki örtüsü, zeytin üretimi ve bir limanın yük toplama alanı içinde gösteriliyor. Bu durum neyi gösterir?",
        "Farklı ölçütlü bölgeler örtüşebilir.",
        [
          "Bütün bölgeler aynı ölçütle çizilmiştir.",
          "Bir alan yalnız tek bölgeye girebilir.",
          "Liman alanı her zaman doğal bölgedir.",
          "Zeytin üretimi iklimden tamamen bağımsızdır."
        ],
        "Üç haritanın hangi özelliği ayrı izlediğini düşün.",
        "Doğal örtü, tarım faaliyeti ve limanla akış bağı farklı ölçütlerdir. Aynı yerde kesişmeleri tanımların aynı olduğu anlamına gelmez."
      ],
      [
        "Bir akarsuyun su toplama alanı doğal ölçütle gösteriliyor. Verilen tanıma en uygun başlık hangisidir?",
        "Hidrografik havza bölgesi",
        [
          "Seçim çevresi",
          "Bir hastanenin hizmet alanı",
          "Yalnız sanayi üretim bölgesi",
          "Kesin bir ilçenin yönetim alanı"
        ],
        "Su bölümü ve akışın toplandığı alanı hatırla.",
        "Havza suların toplandığı doğal alandır. İdari veya hizmet sınırıyla zorunlu çakışmaz; yalnız nehir adı başka tür bölge ilişkisi kurmaz."
      ],
      [
        "DSİ ile Karayollarının hizmet alanı haritalarında sınırlar farklı çizilmiştir. Ek veri yokken en uygun açıklama hangisidir?",
        "Görev ve hizmet örgütlenmesi ölçütleri farklı olabilir.",
        [
          "Haritalardan biri mutlaka yanlıştır.",
          "Ülkenin iki ayrı deniz seviyesi vardır.",
          "Bütün kurumlar aynı alanı kullanmak zorundadır.",
          "Farklı sınır sadece yağış değişimiyle oluşur."
        ],
        "Kurumsal amaçların aynı olup olmadığını düşün.",
        "Kurumların hizmet türü ve örgütlenmesi farklı olabilir; tek bir zorunlu ortak bölgeleme yoktur. Sınır farkı tek başına harita hatası veya doğal değişim kanıtı değildir."
      ],
      [
        "Yağış ölçümleri değişmeden seçim eşiği 600 mm’den 800 mm’ye çıkarılıyor. En az eşik kuralında hangisi kesindir?",
        "Önceden seçilmeyen bir hücre yalnız bu değişimle seçilmiş olmaz.",
        [
          "Bütün hücrelerin yağışı artar.",
          "Seçilen hücre sayısı mutlaka artar.",
          "Her hücre kesin listeden çıkar.",
          "Hastane hizmet ataması mutlaka değişir."
        ],
        "Daha yüksek eşik eski koşulu sağlayanların bir kısmını koruyabilir.",
        "800 mm’yi sağlayan her hücre 600 mm’yi de sağlar. Yeni küme eskinin alt kümesidir; sayısı azalabilir veya aynı kalabilir, fakat artamaz."
      ],
      [
        "İstatistik amacıyla birkaç il aynı üst düzey grupta toplanmıştır. Yalnız bu bilgiyle hangi yargı kurulamaz?",
        "Bütün illerin gelir ve nüfus yoğunluğu eşittir.",
        [
          "Veriler ortak çerçevede toplanabilir.",
          "Bölgelemenin amacı belirtilmiştir.",
          "İller grup içinde ayrıca karşılaştırılabilir.",
          "Gruplama tek başına doğal aynılık anlamına gelmez."
        ],
        "Ortak sınıf ile bütün değerlerin eşitliğini ayır.",
        "İstatistik grubu karşılaştırma aracıdır; her ildeki bütün ölçüleri eşitlemez. Gelir ve yoğunluk eşitliği için ayrı veri gerekir."
      ]
    ],
    "source": "Aurelia Bölge ve Bölge Türleri kâğıdı; OGM 9. Sınıf Dersler Cepte PDF 10–14,21; MEBİ TYT Coğrafya PDF 57–59 ile karşılaştırılmış özgün öğretim ve sorular. Hücreler gerçek Türkiye haritası değildir."
  },
  {
    "id": "ulasim-aglari",
    "topic": "detail-71",
    "title": "Ulaşım: ağlar, su yolları ve rota kararı",
    "minutes": 95,
    "objectives": [
      "Ulaşım türünü yük, erişim, süre ve aktarma koşullarıyla karşılaştır.",
      "Önemli doğal boğaz ve yapay kanalların gerçek bağlantılarını tanı.",
      "Mesafe, hareket süresi ve beklemeyi ayrı hesaplayarak kanıta dayalı rota seç."
    ],
    "sections": [
      {
        "title": "Ulaşım, ulaştırma ve haberleşme",
        "paragraphs": [
          "Ulaşım insan veya yükün yer değiştirmesini sağlar; ulaştırma kavramı taşıma ve haberleşme alanlarını geniş biçimde birlikte ele alabilir. Yol, liman, demir yolu, hava alanı ve boru hattı farklı düğüm ve bağlantılardan oluşan ağlardır. Telefon ve veri iletişimi fiziksel yolculuğun aynısı değildir ama ekonomik bağlantıları güçlendirir.",
          "İhtiyaç, teknoloji ve yatırım tarih içinde taşıma ağlarını değiştirmiştir. Buharlı taşıtlar, motorlu araçlar ve hava ulaşımının yaygınlaşması farklı aşamalardır. Hava yolu 1945’te ilk kez ortaya çıkmış sayılmaz; İkinci Dünya Savaşı sonrasında yaygınlaşması ile ilk kullanım tarihi ayrı tutulur."
        ]
      },
      {
        "title": "Doğa güzergâhı nasıl etkiler?",
        "paragraphs": [
          "Sarp eğimler, yüksek dağ sıraları ve derin vadiler yol yapımını, tünel ihtiyacını ve maliyeti etkiler. Geçitler bağlantıyı kolaylaştırabilir; Türkiye’de dağların kıyıya uzanışı kıyı ile iç kesim arasındaki yol ağında önemlidir. Ancak tek bir dağ bilgisi bütün gerçek güzergâhın uzunluğunu veya geçiş ücretini vermez.",
          "Kar, buzlanma, sis, fırtına, kuvvetli akıntı ve su seviyesindeki değişimler farklı ulaşım türlerini farklı etkiler. Teknoloji bu kısıtları azaltabilir fakat tamamen ortadan kaldırmaz. Aynı mesafedeki iki yolun yolculuk süresi hava, zemin, trafik ve işletme koşulları yüzünden farklı olabilir."
        ]
      },
      {
        "title": "Talep, sermaye ve teknolojiyi ekle",
        "paragraphs": [
          "Nüfus, üretim, pazar, turizm ve ticaret taşımaya talep yaratır. Bir maden alanını limana bağlayan demir yolu veya büyük kent çevresindeki kara yolu bu talebe göre gelişebilir. Yatırım bütçesi, mühendislik, bakım ve uluslararası ilişkiler de güzergâh kararında etkilidir; ağ yalnız doğal şekillerin otomatik sonucu değildir.",
          "Köprü, tünel ve gelişmiş limanlar erişimi değiştirebilir. Yeni bağlantı bazı merkezleri güçlendirirken eski bir aktarım noktasının önemini azaltabilir. Gerçek karar için yapım ve bakım gideri, çevresel etkiler, kapasite ve güvenlik birlikte değerlendirilir; haritadaki en kısa çizgi tek başına en uygun yatırım değildir."
        ]
      },
      {
        "title": "Dünya ağları ve Bakü–Tiflis–Kars",
        "paragraphs": [
          "Kuzey Amerika’nın özellikle ABD kesimi, Batı Avrupa ve Doğu Asya’nın bazı alanları gelişmiş kara ve hava ulaşım ağlarıyla kaynaklarda örneklenir. Almanya, Fransa, Hollanda ve Japonya kara yolu; ABD, Avrupa ve Japonya, Güney Kore, Çin hava ağı bağlamında ele alınabilir. Bu örnekler her köşenin aynı sıklıkta yol taşıdığı anlamına gelmez.",
          "Bakü–Tiflis–Kars demir yolu Azerbaycan, Gürcistan ve Türkiye arasında bağlantı sağlayarak Asya–Avrupa taşıma koridorlarına katkı yapar. Tek hat bütün Çin–Avrupa yolculuğuyla aynı şey değildir; diğer hatlar ve aktarmalar da gerekir. Gerçek teslim süresi, mesafe kazancı ve ticaret payı güzergâh, tarih ve işletme koşulu olmadan tek sabit sayı olarak verilmez."
        ]
      },
      {
        "title": "Kara yolu ve son bağlantı",
        "paragraphs": [
          "Kara yolu farklı yükleri birçok yerleşmenin kapısına ulaştırma esnekliği sağlar. Dağınık yerleşmelerde ve kısa mesafeli dağıtımda önemli olabilir; kamyon, otobüs ve otomobil aynı ağın farklı kullanımlarıdır. Esneklik, her yük ve her mesafede en ucuz ya da en az enerji tüketen seçenek olduğu anlamına gelmez.",
          "Trafik yoğunluğu, sürüş koşulları, bakım ve emisyonlar kara yolu kararını etkiler. Bir limana veya tren istasyonuna gelen ürünün son bölümü kara yoluyla taşınabilir. Bu son bağlantı, ana hattın sağladığı avantajı tamamlar; yalnız trenin hareket süresine bakarak toplam kapıdan kapıya süre hesaplanamaz."
        ]
      },
      {
        "title": "Demir yolu: düzenli ve ağır yük",
        "paragraphs": [
          "Demir yolu, büyük miktarlı ve düzenli yükte uygun koşullarda düşük birim taşıma gideri sağlayabilir. Kömür, cevher, tahıl gibi hacimli yüklerde ve yoğun yolcu hatlarında örnekleri vardır. Ray ve terminal yatırımı gerektirir; hattın bulunması, sıklığı ve kapasitesi kullanım kararını sınırlar.",
          "İstasyonlara erişim ve aktarım süreleri toplam yolculuğa eklenir. Her demir yolu her kara yolundan ucuz veya her koşulda daha güvenli diye bir mutlak kural yoktur. Aynı yük, mesafe ve hizmet koşulları verilmeden iki türü sayısal maliyet açısından sıralamak için yeterli veri bulunmaz."
        ]
      },
      {
        "title": "Deniz yolu, liman ve hinterlant",
        "paragraphs": [
          "Deniz yolu uzun mesafeli, büyük hacimli uluslararası yüklerde önemli bir seçenektir. Liman derinliği, rıhtım ve depolama kapasitesi, gemi türü ve iç bölgelere bağlantı toplam verimi etkiler. Hinterlant limanın yük veya yolcu ilişkisi kurduğu art alanıdır; yalnız kıyıya yakınlığı göstermez.",
          "Deniz yolu bakım ve işletme giderlerinden bağımsız değildir. Liman, gemi, kanal, yakıt, sigorta ve bekleme maliyetleri vardır. Yükün bozulma riski, teslim süresi ve taşıma hacmi farklı olduğundan hava yolu ile aynı bedeli veya aynı süreyi varsayamayız. Kıyısı olmak, iyi liman ağının bütün koşullarını tek başına sağlamaz."
        ]
      },
      {
        "title": "Hava yolu ve boru hatları",
        "paragraphs": [
          "Hava yolu uzun mesafede hareket süresi avantajı sağlayabilir; değerli, acil veya hafif yükte tercih edilebilir. Hava alanına erişim, kontrol ve aktarma süreleri kapıdan kapıya toplamın parçasıdır. Uçak havada daha hızlı olsa bile her kısa yolculuğun toplamda en hızlı türü olmak zorunda değildir.",
          "Boru hatları petrol ve doğal gaz gibi akışkanların düzenli taşınmasında kullanılır. Belirli katılar uygun bulamaç hâlinde özel sistemlerle taşınabilse de her katı yükün her borudan geçtiği söylenemez. Hat yatırımı, arazi, enerji, sızıntı ve güvenlik riskleri ayrıca planlanır; hat taşıma sürecini görünmez ve etkisiz yapmaz."
        ]
      },
      {
        "title": "Türleri bir ağda birleştir",
        "paragraphs": [
          "Konteynerin gemiden trene, oradan kamyona geçirilmesi çoklu taşıma düzenine örnektir. Ana hatta büyük kapasite ile son bölümde esnek erişim birlikte kullanılabilir. Ancak her aktarımın zaman, ücret ve elleçleme koşulu vardır; farklı türlerin avantajlarını toplarken bu bedeller atlanmaz.",
          "En uygun seçenek sorusunun amacını belirle: en kısa mesafe, en az toplam süre, en düşük ücret veya belirli çevre hedefi farklı sonuçlar verebilir. Sadece iki mesafe veriliyorsa ücretleri kesin çıkaramayız. Rota deneyinde yalnız sabit hız ve kanal beklemesi verilir; ticari en iyi rotanın bütün koşulları ölçülmez."
        ]
      },
      {
        "title": "Başlıca dünya deniz koridorları",
        "paragraphs": [
          "Kuzey Atlas hattı Avrupa ile Kuzey Amerika’nın doğusu arasındaki geleneksel yoğun ticaret bağlantılarındandır. Akdeniz–Süveyş–Kızıldeniz–Hint Okyanusu hattı Avrupa ile Asya yönünde önemli bir koridor oluşturur. Afrika’nın güneyindeki Ümit Burnu üzerinden dolaşma, farklı koşullarda bu bağlantıya alternatif olabilir.",
          "Büyük Okyanus üzerinden Kuzey Amerika–Doğu Asya, Atlas üzerinden Güney Amerika’nın doğusu ve Karayip–Meksika Körfezi çevresi başka deniz ağı örnekleridir. Bir hattı güncel olarak en yoğun diye sıralamak için yıl ve ölçü gerekir: gemi sayısı, yük tonajı veya ticaret değeri aynı gösterge değildir."
        ]
      },
      {
        "title": "Doğal boğaz ile yapay kanalı ayır",
        "paragraphs": [
          "Boğaz doğal dar deniz geçişidir; kanal insanın açtığı yapay su yoludur. Süveyş Mısır’da, Panama Panama’da, Kiel Almanya’da, Korint Yunanistan’dadır. Aynı iki büyük okyanus arasında alternatif geçiş sunmaları Panama ile Macellan’ın aynı türde veya aynı yerde olduğunu göstermez.",
          "Süveyş Akdeniz’i Kızıldeniz’e bağlar; Panama Karayip tarafıyla Büyük Okyanus arasında geçiş sağlar. Kiel Kuzey Denizi–Baltık, Korint ise Korint Körfezi–Saronik Körfezi bağlantısıdır. Gerçek su yolunun konumunu öğrenirken deneydeki 700 km çizgisini o su yolunun gerçek ölçüsü gibi ezberleme."
        ]
      },
      {
        "title": "Avrupa ve Türk boğazları zinciri",
        "paragraphs": [
          "Cebelitarık Akdeniz ile Atlas Okyanusu arasında, Dover ise Manş ile Kuzey Denizi arasındadır. Bering Boğazı Bering Denizi ile Çukçi Denizi üzerinden Büyük Okyanus–Kuzey Buz Denizi bağlantısında yer alır. Macellan, Güney Amerika ana karası ile güneydeki adalar arasında doğal bir geçiştir.",
          "İstanbul Boğazı Karadeniz’i Marmara’ya, Çanakkale Boğazı Marmara’yı Ege’ye bağlar; Karadeniz’den Akdeniz yönüne giderken Marmara ara denizdir. İstanbul ile Çanakkale’yi tek bir nokta veya aynı deniz çifti olarak gösterme. Dar geçişin önemi yalnız genişliğine değil bağladığı ağlara da bağlıdır."
        ]
      },
      {
        "title": "Enerji ve Asya koridorlarının halkaları",
        "paragraphs": [
          "Hürmüz Boğazı Basra Körfezi’ni Umman Körfezi üzerinden açık denizlere bağlar. Babülmendep Kızıldeniz ile Aden Körfezi arasındadır; Süveyş ile birlikte kullanıldığında Akdeniz–Hint Okyanusu rotasında ayrı bir halkadır. Bu iki boğazın aynı denizi doğrudan bağladığını sanmak yön okumasını bozar.",
          "Malakka, Malaya Yarımadası ile Sumatra arasında, Andaman ve Singapur hattıyla Hint Okyanusu–Güney Çin Denizi koridorunda bulunur. Bütün bağlantı zincirini tek dar geçişin iki kıyısı gibi çizmeyiz. Enerji veya ticaret bakımından önem söylenebilir; tarihsiz bir güncel dünya payı veya gelecekte kesin kapanma sonucu uydurulmaz."
        ]
      },
      {
        "title": "Rota süresini bileşenlerine ayır",
        "paragraphs": [
          "Sabit hız koşulunda hareket süresi mesafenin hıza bölünmesidir. Özgün X–Y deneyinde dolaşma 1000 km, kanal yolu 700 km’dir. Hız 20 km/saat ise hareket süreleri 50 ve 35 saattir; kanal 15 saat bekletirse toplam süreler eşit olur. Daha kısa mesafe, bekleme yüzünden daha uzun toplam süre verebilir.",
          "Kanal kapanırsa o rota kullanılamaz; kullanılmayan yolun süresini sıfır saymayız. Geminin su çekimi, kanal boyutları, ücret, akıntı veya hava koşulu verilmemişse gerçek ticari karar tamamlanmamıştır. Sayısal deney bu değişkenleri sabit tutarak tek bir ilişkinin nedenini görmeye yarar."
        ]
      }
    ],
    "examples": [
      {
        "title": "Bekleme avantajı ne zaman siler?",
        "prompt": "X–Y arasında dolaşma 1000 km, kanal 700 km’dir. İki rotada hız sabit 20 km/saat; yalnız kanalda 18 saat bekleme vardır. Hangisi daha kısa sürer?",
        "strategy": "Mesafeleri hıza böl, sonra yalnız ilgili beklemeyi ekle.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Dolaşma süresi 1000 /20 =50 saattir; ek bekleme verilmemiştir."
          },
          {
            "label": "2. adım",
            "explanation": "Kanalda hareket 700 /20 =35, toplam 35 +18 =53 saattir."
          },
          {
            "label": "3. adım",
            "explanation": "50 saat 53’ten küçüktür; dolaşma toplamda 3 saat daha kısadır."
          }
        ],
        "answer": "Dolaşma rotası 3 saat daha kısa",
        "check": "Kanalın 300 km avantajı bu hızda 15 saattir; 18 saat bekleme bu avantajdan 3 saat fazladır.",
        "pitfall": "En kısa mesafeyi doğrudan en kısa toplam süre sayma."
      },
      {
        "title": "Eşitlik eşiğini bul",
        "prompt": "Bir önceki örnekten bağımsız olarak X–Y rotaları 1000 ve 700 km’dir. Hız ikisinde 30 km/saat, başka süre yok. Kanalda kaç saat bekleme süreleri eşitler?",
        "strategy": "Mesafe farkının aynı hızda kaç saat sağladığını hesapla.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Mesafe farkı 1000 −700 =300 km’dir."
          },
          {
            "label": "2. adım",
            "explanation": "Ortak 30 km/saat hızda kazanç 300 /30 =10 saattir."
          },
          {
            "label": "3. adım",
            "explanation": "Kanalda 10 saat bekleme olursa 700/30 +10 ile 1000/30 eşit olur."
          }
        ],
        "answer": "10 saat",
        "check": "Dolaşma 33⅓, kanal hareketi 23⅓ saattir; aralarında tam 10 saat vardır.",
        "pitfall": "Beklemeyi her iki rotaya ekleme veya km ile saati doğrudan toplama."
      },
      {
        "title": "Deniz bağlantısını sırala",
        "prompt": "Karadeniz’den Ege’ye geçecek bir gemi Türk boğazları yolunu kullanıyor. İki boğaz ve ara denizin sırasını yaz.",
        "strategy": "Başlangıç denizinden her komşu bağlantıyı izle.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İstanbul Boğazı Karadeniz’den Marmara’ya çıkışı sağlar."
          },
          {
            "label": "2. adım",
            "explanation": "Marmara iki boğaz arasındaki ara denizdir; doğrudan atlanmaz."
          },
          {
            "label": "3. adım",
            "explanation": "Çanakkale Boğazı Marmara’dan Ege’ye bağlar."
          }
        ],
        "answer": "İstanbul Boğazı → Marmara → Çanakkale Boğazı",
        "check": "Son varış Ege ise sıra ters çevrilemez; dönüş yolunda aynı halkalar ters sırada kullanılır.",
        "pitfall": "İki boğazı tek geçiş sanma veya Marmara’yı Karadeniz’in yerine koyma."
      },
      {
        "title": "Kapıdan kapıya süre",
        "prompt": "A seçeneğinde uçuş 1 saat, hava alanına gidiş ve işlemler toplam 3 saattir. B seçeneğinde doğrudan otobüs 3,5 saattir. Başka gecikme yok. Toplamda hangisi hızlıdır?",
        "strategy": "Yalnız araç hareketi yerine tüm verilen süreleri topla.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "A toplamı 1 +3 =4 saattir; yerde geçen süre de yolculuğa dâhildir."
          },
          {
            "label": "2. adım",
            "explanation": "B doğrudan 3,5 saattir ve başka süre verilmemiştir."
          },
          {
            "label": "3. adım",
            "explanation": "4 −3,5 =0,5 saat farkla B daha kısa sürer."
          }
        ],
        "answer": "B, yarım saat daha kısa",
        "check": "Uçuşun kendisi hızlıdır; sonuç uçağın her koşulda yavaş olduğunu değil bu özel toplamı anlatır.",
        "pitfall": "Bir aracın hızını bütün kapıdan kapıya yolculukla aynı gösterge sayma."
      }
    ],
    "recall": [
      {
        "prompt": "Toplam rota süresi nasıl kurulur?",
        "answer": "Hareket, bekleme, erişim ve aktarma gibi verilen süreler toplanır; yalnız mesafe yeterli değildir."
      },
      {
        "prompt": "Hinterlant nedir?",
        "answer": "Limanın yük veya yolcu ilişkisi kurduğu art alan; yalnız komşu kıyı değildir."
      },
      {
        "prompt": "Süveyş ile Hürmüz hangi denizleri bağlar?",
        "answer": "Süveyş Akdeniz–Kızıldeniz; Hürmüz Basra Körfezi–Umman Körfezi bağlantısıdır."
      },
      {
        "prompt": "Demir yolu neden her yükte otomatik en ucuz değildir?",
        "answer": "Hat, terminal, erişim, miktar ve hizmet koşulları değişir; maliyet için karşılaştırılabilir veri gerekir."
      }
    ],
    "items": [
      [
        "X–Y dolaşma rotası 1000 km, kanal 700 km’dir. Ortak hız 20 km/saat, kanal beklemesi 18 saattir; başka süre yok. Hangi sonuç doğrudur?",
        "Dolaşma 50, kanal 53 saat sürer.",
        [
          "Dolaşma 35, kanal 50 saat sürer.",
          "Kanal kesin 15 saat sürer.",
          "İki rota da 18 saat sürer.",
          "Kanal daha kısa olduğu için her zaman daha hızlıdır."
        ],
        "Hareket süresine beklemeyi ekle.",
        "1000/20 =50; 700/20 +18 =53 saattir. Kanal 300 km daha kısa olsa da toplam süre 3 saat uzundur."
      ],
      [
        "Özgün iki rotada mesafeler 1000 ve 700 km, hız ikisinde 30 km/saat. Dolaşmada bekleme yok. Kanalda hangi bekleme toplam süreyi eşitler?",
        "10 saat",
        [
          "5 saat",
          "15 saat",
          "30 saat",
          "300 saat"
        ],
        "Mesafe farkını ortak hıza böl.",
        "300 km fark /30 km/saat =10 saattir. Bu bekleme kanalın hareket süresi avantajını tam siler; gerçek kanal ölçüsü veya ücreti verilmez."
      ],
      [
        "Mısır’daki yapay geçiş Akdeniz’i Kızıldeniz’e bağlıyor. Hangisidir?",
        "Süveyş Kanalı",
        [
          "Panama Kanalı",
          "Hürmüz Boğazı",
          "Kiel Kanalı",
          "Dover Boğazı"
        ],
        "Ülke ve iki deniz bilgisini birlikte kullan.",
        "Süveyş bu bağlantıyı sağlar. Panama Amerika’da, Kiel Almanya’da; Hürmüz ve Dover farklı denizleri bağlayan doğal boğazlardır."
      ],
      [
        "Basra Körfezi’nden Umman Körfezi yönüne açılan doğal dar geçiş hangisidir?",
        "Hürmüz Boğazı",
        [
          "Babülmendep Boğazı",
          "Cebelitarık Boğazı",
          "Korint Kanalı",
          "Bering Boğazı"
        ],
        "Kızıldeniz çıkışıyla Basra Körfezi çıkışını ayır.",
        "Hürmüz Basra–Umman bağlantısıdır. Babülmendep Kızıldeniz–Aden hattında, Cebelitarık Akdeniz–Atlas arasındadır."
      ],
      [
        "Karadeniz’den Ege’ye Türk boğazlarıyla giden geminin doğru ara sırası hangisidir?",
        "İstanbul Boğazı, Marmara, Çanakkale Boğazı",
        [
          "Çanakkale Boğazı, Marmara, İstanbul Boğazı",
          "İstanbul Boğazı, Kızıldeniz, Süveyş",
          "Dover, Baltık, Kiel",
          "Hürmüz, Aden Körfezi, Panama"
        ],
        "İstanbul’un hangi iki denize komşu olduğunu hatırla.",
        "Karadeniz İstanbul Boğazı ile Marmara’ya; Marmara Çanakkale ile Ege’ye bağlanır. Dönüş sırası başlangıç değişmedikçe doğru değildir."
      ],
      [
        "Bir liman ürünleri iç kesimden trenle topluyor, gemiye aktarıyor, varışta kamyonla mağazaya dağıtıyor. En uygun tanım nedir?",
        "Farklı türlerin birlikte kullanıldığı çoklu taşıma",
        [
          "Yalnız hava taşımacılığı",
          "Bütün aktarım sürelerinin sıfır olması",
          "Yalnız doğal nehir yolu",
          "Ulaşım bağlantısı bulunmaması"
        ],
        "Taşımanın tek araçla mı birkaç türle mi yapıldığını incele.",
        "Tren, gemi ve kamyon farklı ana ve son bağlantı görevleri üstlenir. Bu çoklu taşımadır; aktarmaların süre ve gideri ayrıca hesaba katılır."
      ],
      [
        "A’da uçuş 1 saat, erişim ve işlemler 3 saat; B’de doğrudan otobüs 3,5 saattir. Başka süre yok. Hangisi doğrudur?",
        "B toplamda 0,5 saat daha kısadır.",
        [
          "A toplamda 2,5 saat daha kısadır.",
          "İki toplam da 1 saattir.",
          "Hava yolu toplamda mutlaka daha kısadır.",
          "B’nin toplam süresi hesaplanamaz."
        ],
        "Kapıdan kapıya bütün süreleri topla.",
        "A 4, B 3,5 saattir; B yarım saat avantajlıdır. Araç hareketi ile toplam yolculuk ayrılır; bu örnek bütün uçuşlara genellenmez."
      ],
      [
        "Bir harita limanın iç kesimdeki yük toplama ve dağıtma bağlantı alanını gösteriyor. Bu alanın adı nedir?",
        "Hinterlant",
        [
          "Yalnız kıyı çizgisi",
          "Krater",
          "Su bölümü çizgisi",
          "Tsunami dalga boyu"
        ],
        "Limanın art alanındaki ekonomik akışı düşün.",
        "Hinterlant limanın ilişkili art alanıdır; kara ve demir yolu bağlantıları etkili olabilir. Sadece kıyı komşuluğu veya doğal havza sınırı değildir."
      ],
      [
        "Aynı yük için yalnız kara ve demir yolu mesafeleri verilmiştir; fiyat, terminal ve aktarma bilgisi yoktur. Hangisi kesinlenemez?",
        "Hangi seçeneğin toplam maliyetinin daha düşük olduğu",
        [
          "Verilmiş iki mesafenin karşılaştırılması",
          "İki türün adlarının farklı olması",
          "Maliyet için ek verinin gerekli olması",
          "Aktarmanın toplamı etkileyebilmesi"
        ],
        "Mesafe ile fiyat arasına verilmemiş bir oran koyma.",
        "Maliyet yalnız uzunluk değildir; miktar, ücret, terminal ve aktarma gibi veriler gerekir. Genel demir yolu avantajı her tekil olaydaki toplamı zorunlu belirlemez."
      ],
      [
        "Hangi eşleştirme hem tür hem ülke bakımından doğrudur?",
        "Kiel — yapay kanal — Almanya",
        [
          "Dover — yapay kanal — Mısır",
          "Bering — yapay kanal — Panama",
          "Süveyş — doğal boğaz — Yunanistan",
          "Korint — doğal boğaz — Almanya"
        ],
        "Doğal geçiş ile insanın açtığı kanalı ayır.",
        "Kiel Almanya’daki yapay Kuzey Denizi–Baltık bağlantısıdır. Dover ve Bering doğal; Süveyş Mısır’da, Korint Yunanistan’da yapay kanaldır."
      ]
    ],
    "source": "Aurelia Ulaşım kâğıdı; OGM 10. Sınıf Dersler Cepte PDF 10–14,26; MEBİ TYT Coğrafya PDF 110–112 ile karşılaştırılmış özgün öğretim ve sorular. X–Y mesafeleri gerçek boğaz veya kanal ölçümü değildir."
  },
  {
    "id": "cevre-toplum",
    "topic": "detail-72",
    "title": "Çevre ve toplum: etkileşim, yük ve çözüm",
    "minutes": 120,
    "objectives": [
      "İnsanın çevreyi kullanmasını yarar, etki ve geri besleme ilişkileriyle açıkla.",
      "Kirletici yük, derişim ve atık yönetimini kütle bilançosuyla ayır.",
      "Sera artışı, ozon seyrelmesi, asit yağmuru ve iklim uyumunu farklı mekanizmalarla açıkla."
    ],
    "sections": [
      {
        "title": "İnsan çevre içinde yaşar",
        "paragraphs": [
          "Su, hava, toprak, canlılar ve yer şekilleri beslenme, barınma, ulaşım ve enerji üretiminin doğal temelini oluşturur. İnsan da tarım, kent, yol ve sanayiyle bu çevreyi dönüştürür. İlişki iki yönlüdür: kuraklık su kullanımını sınırlar; aşırı su çekimi ise akarsu ve göl sisteminin durumunu yeniden etkiler.",
          "Doğaya uyum ile doğayı değiştirme çoğu zaman birlikte bulunur. Yamaçta uygun yapı biçimi seçmek bir uyum örneği, tünel açmak doğrudan değişim örneğidir. Aynı proje hem erişim yararı hem habitat kaybı yaratabilir; çevre sorusunda yalnız yararı veya yalnız zararı saymak bütün ilişkiyi açıklamaz."
        ]
      },
      {
        "title": "Dört küreyi bağlantılarıyla tanı",
        "paragraphs": [
          "Litosfer yer kabuğu ile üst mantonun katı ve dayanıklı en üst bölümünü, atmosfer gaz örtüsünü, hidrosfer suyu, biyosfer canlılar alanını ifade eder. Bu küreler yalıtılmış kutular değildir. Yağmur havadan toprağa geçer, akışla madde taşır; bitkiler su kullanıp atmosfere su buharı verir. Bir kürede başlayan etki başka küreye yayılabilir.",
          "Madencilikle açığa çıkan bir madde yağmurla dereye taşındığında litosfer, hidrosfer ve canlı yaşamı birlikte etkilenebilir. Soru hangi küre diye sorarsa olayın aşamasını belirle. Taşın ilk çıkarıldığı yer ile kirleticinin daha sonra ulaştığı yer farklıdır; birini söylemek diğerini otomatik yok saymayı gerektirmez."
        ]
      },
      {
        "title": "Türkiye’de doğayı değiştiren bağlantılar",
        "paragraphs": [
          "Marmaray ve Avrasya Tüneli İstanbul’da deniz geçişini tünel bağlantısıyla, Osmangazi Köprüsü İzmit Körfezi geçişini köprüyle sağlar. Ordu–Giresun Havalimanı kıyıda deniz dolgusu üzerinde kurulan bir hava ulaşım örneğidir. Bunlar erişim amacıyla doğal engellerin mühendislikle aşılmasına ilişkin somut örneklerdir.",
          "Tünel, köprü ve dolgu farklı fiziksel müdahalelerdir; hepsi denizi doldurmak anlamına gelmez. Ulaşım yararıyla birlikte kıyı, su dolaşımı, habitat, malzeme ve bakım etkileri değerlendirilir. Bir yapının kaynakta örnek verilmesi güncel trafik, kâr veya çevresel etki miktarının bu derste ölçüldüğü anlamına gelmez."
        ]
      },
      {
        "title": "Kaynak, taşınma yolu ve alıcı",
        "paragraphs": [
          "Çevre kirliliğini anlamak için maddenin veya enerjinin nereden çıktığı, nasıl taşındığı ve neye ulaştığı izlenir. Bir tesisin atığı kaynak, dere akışı taşınma yolu, sucul canlılar alıcı olabilir. Gürültüde yayılan enerji, ışıkta yanlış zamanda veya yönde kullanılan aydınlatma önemlidir; her kirlenme katı çöp biçiminde değildir.",
          "Kaynakta önleme, yayılmayı azaltma ve alıcıyı koruma farklı müdahale noktalarıdır. Verimli üretim atık oluşumunu azaltabilir; arıtma oluşmuş atığın bir bölümünü tutabilir. Tutulan madde yok olmuş sayılmaz, güvenli yönetimi gerekir. Yalnız rengi açılan veya seyrelmiş görünen suyun zararsız olduğu çıkarılamaz."
        ]
      },
      {
        "title": "Su ve toprak kirliliği",
        "paragraphs": [
          "Evsel ve endüstriyel atıklar, tarımsal gübre ve ilaçların taşınması suların kimyasal ve biyolojik durumunu değiştirebilir. Aşırı besin girişi bazı sularda alg artışı ve oksijen sorunlarını besleyebilir. Sonuç suyun sıcaklığına, akışına, madde türüne ve canlılara göre değişir; tek bir genel sayı bütün etkileri vermez.",
          "Toprakta biriken maddeler bitkiyi, yer altı suyunu ve besin ağını etkileyebilir. Erozyon toprağın taşınmasıdır; kimyasal kirlenmeyle aynı süreç değildir ama aynı arazide birlikte görülebilir. Kimyasal tehlike için maddenin türü, miktarı, kalış süresi ve maruziyet yolu gerekir; her bilinmeyen örneği aynı derecede zehirli diye etiketlemeyiz."
        ]
      },
      {
        "title": "Hava, ses, ışık ve diğer etkiler",
        "paragraphs": [
          "Yanma ve sanayi süreçlerinden çıkan parçacıklar, kükürt ve azot bileşikleri hava kalitesini etkileyebilir. Yerel hava kirliliği ile küresel sera etkisi ilişkili kaynaklara sahip olsa da aynı gösterge değildir. Bir yakıtın yalnız karbondioksit verisi, bütün parçacık veya zehirli gaz düzeylerini tek başına göstermez.",
          "Gürültü ve yanlış aydınlatma insan sağlığı ile diğer canlıların davranışlarını etkileyebilir. Radyoaktif kirlenmede radyonüklitlerin türü, etkinliği ve maruziyet koşulları önemlidir; görünür koku olmaması güven kanıtı değildir. Besin kirliliği de üretim, işleme, depolama ve çevresel taşınma aşamalarında oluşabilir; tek bir aşamaya indirgenmez."
        ]
      },
      {
        "title": "Madencilik ve arazi kullanımı",
        "paragraphs": [
          "Maden çıkarma, cevher işleme, atık depolama ve taşıma farklı çevresel etki aşamalarıdır. Kazı habitatı ve topografyayı değiştirebilir; toz, asitli drenaj veya cevherden açığa çıkan maddeler su ve toprağa ulaşabilir. Her madende aynı madde ve aynı risk bulunduğu varsayılmaz; kullanılan süreç ve yerel koşul incelenir.",
          "Yer seçimi, sızıntı denetimi, atık yönetimi ve çalışma sonrası arazi iyileştirme planlanmalıdır. Tarım toprağının yapılaşmaya açılması da üretim, su tutma ve habitat üzerinde etki yaratır. Bir kullanımın ekonomik yararı bulunması etkisini sıfırlamaz; etkisi olması ise bütün seçeneklerin aynı bedelde olduğunu göstermez."
        ]
      },
      {
        "title": "Termik ve nükleer enerji",
        "paragraphs": [
          "Fosil yakıtlı termik santralde yanma karbondioksit ve yakıt ile teknolojiye bağlı başka kirleticiler üretebilir. Soğutma suyu ve sıcaklık değişimi de yerel su yaşamını etkileyebilir. Baca kontrolü bazı kirleticileri azaltırken bütün sera salımını otomatik ortadan kaldırmaz; farklı kirletici türleri ayrı ölçülmelidir.",
          "Nükleer üretimde işletme koşulları, soğutma, güvenlik, radyoaktif atığın uzun süreli yönetimi ve kaza riski birlikte değerlendirilir. Normal işletme ile kaza aynı durum değildir. Tek bir enerji türünün bütün yaşam döngüsünü sıfır etkili veya her koşulda aynı derecede zararlı saymak yerine somut süreç ve karşılaştırma sınırı belirtilir."
        ]
      },
      {
        "title": "Yenilenebilirlerin yararı ve yer seçimi",
        "paragraphs": [
          "Güneş, rüzgâr, su, jeotermal, biyokütle, dalga ve gelgit farklı yenilenebilir enerji örnekleridir. Uygun koşullarda fosil yakıta bağımlılığı ve bazı işletme salımlarını azaltabilirler. Güneşlenme, rüzgâr, su rejimi ve arazi koşulları aynı yerde aynı potansiyeli vermez; üretim sürekliliği ve depolama ihtiyacı da önemlidir.",
          "Baraj göç yolunu ve su rejimini, rüzgâr tesisi bazı türleri ve ses ortamını, jeotermal akışkan yanlış yönetilirse suyu etkileyebilir. Üretim ekipmanının imalatı ve ömrü sonunda atığı da vardır. Hidrojen üretim için enerji isteyen bir taşıyıcıdır; kendi başına sınırsız birincil kaynak sayılmaz. Yenilenebilir sözcüğü sıfır etki demek değildir."
        ]
      },
      {
        "title": "Aral örneğinde akış bilançosu",
        "paragraphs": [
          "Aral havzasında Seyhun ve Ceyhun akarsularından sulamaya yönlendirilen suyun artması göle gelen akışı azaltmış, buharlaşma ve kullanım dengesi göl alanı ile tuzluluğu değiştirmiştir. Gölün çekilmesi balıkçılık, yerel geçim, toz taşınımı ve yaşam koşulları üzerinde birbiriyle bağlantılı etkiler yaratmıştır. Su çekimi yalnız tarladaki ürünle sınırlı değerlendirilmez.",
          "Gölün bütün bölümleri ve bütün yılları tek değişmez durumda değildir; yönetim ve akış düzenindeki değişimler yerel sonuçları farklılaştırabilir. Bir havza örneğini bütün sulama projelerine aynı oranla aktarmayız. Giriş, çıkış, buharlaşma ve stok verileri ile dönem gerekir; tek bir fotoğraftan geleceğin kesin göl alanı hesaplanamaz."
        ]
      },
      {
        "title": "Orman, biyoçeşitlilik ve koruma",
        "paragraphs": [
          "Ormanlar yalnız odun değil habitat, karbon depolama, su ve toprak süreçleri açısından da değerlidir. Aşırı kesim, parçalanma, yangın ve uygun olmayan arazi kullanımı bu işlevleri etkileyebilir. Koruma alanı, sürdürülebilir ormancılık ve bozulan alanı iyileştirme farklı araçlardır; yalnız bir türün sayısını artırmak bütün ekosistemi geri getirmek değildir.",
          "İsveç’te ormancılık yönetimi veya Kosta Rika’da koruma ve turizm uygulamaları kaynakların nasıl kullanılabileceğine ilişkin örneklerdir; tarihsiz bir başarı yüzdesini bugüne taşımayız. Yerli türler, yaşam alanı, yerel topluluk ve izleme birlikte ele alınır. Bir genetik teknoloji etiketi tek başına her ürünün kesin çevresel zararını veya yararını kanıtlamaz."
        ]
      },
      {
        "title": "Doğal sera etkisi ile artışını ayır",
        "paragraphs": [
          "Atmosferdeki sera gazları yerden yayılan uzun dalga ışınımın bir bölümünü soğurup yeniden yayarak Dünya’nın enerji dengesinde rol oynar. Doğal sera etkisi yaşanabilir koşulların parçasıdır. İnsan etkinlikleriyle bazı gazların birikiminin artması ek ısınma baskısı oluşturur; doğal işlev ile insan kaynaklı güçlenme aynı yargı değildir.",
          "Karbondioksit CO₂, metan CH₄ ve diazot monoksit N₂O önemli örneklerdir; metan CH₂ olarak yazılmaz. Karbonmonoksiti bütün iklim etkileriyle karıştırıp ana doğrudan sera gazlarının yerine koymayız. Aerosollerin etkisi tür ve koşula göre değişebilir; havadaki her parçacığın yalnız ısıttığı söylenemez."
        ]
      },
      {
        "title": "Ozon seyrelmesi başka mekanizmadır",
        "paragraphs": [
          "Stratosferdeki ozon Güneş’ten gelen zararlı morötesi ışınımın bir bölümünü tutar. Bazı klorlu bileşiklerden açığa çıkan maddeler ozon kaybını hızlandırabilir; CFC örneği bu bağlamda ele alınır. Ozon örtüsünün seyrelmesi daha fazla morötesi maruziyetle ilişkilidir; sera gazlarının uzun dalga ışınımla etkisiyle aynı süreç değildir.",
          "Yerdeki ozon ise hava kalitesi bakımından başka bir bağlamda değerlendirilir. Aynı kimyasal adının atmosferdeki konumu değişince rolü farklılaşabilir. Ozon kaybı, kentteki hava kirliliği ve küresel ısınma aynı başlık altında tek nedene indirgenirse hangi çözüme neden ihtiyaç duyulduğu açıklanamaz."
        ]
      },
      {
        "title": "Asit yağmuru ve deniz asitlenmesi",
        "paragraphs": [
          "Kükürt ve azot oksitlerinin atmosferde tepkimelerle asidik bileşiklere dönüşmesi ve çökelmesi asit yağışlarıyla ilişkilidir. Etki yalnız kaynağın tam üzerinde kalmayabilir; rüzgârla taşınma önemlidir. Toprak, su, bitki ve yapılar etkilenebilir; her yağışın aynı asitlikte olduğu varsayılmaz.",
          "Denizin karbondioksit alması suyun karbonat kimyasını değiştirip pH düşüşüne yol açabilir. Asitlenme pH’ın azalması anlamında kullanılır; suyun mutlaka pH 7’nin altına indiği sonucu çıkmaz. Okyanus asitlenmesi ile atmosferde oluşan asit yağmurunu, ikisinde asit sözcüğü var diye tek mekanizma sayma."
        ]
      },
      {
        "title": "İklim etkilerini süreçle açıkla",
        "paragraphs": [
          "Sıcaklığın artması deniz suyunun ısıl genleşmesine ve kara buzlarının kaybına katkı yapabilir; ikisi de deniz seviyesini etkileyen süreçlerdir. Denizde zaten yüzen buz ile karadaki buzun suya eklenmesi aynı hacim ilişkisi değildir. Bölgesel deniz seviyesi ayrıca kara hareketi ve dolaşımdan etkilenebilir.",
          "Su, tarım, sağlık ve biyoçeşitlilik etkileri bölgelere göre değişir; bazı aşırı olayların olasılığı veya şiddeti değişebilir. Tek bir yağış veya soğuk gün uzun dönem iklim eğilimini tek başına çürütmez ya da kanıtlamaz. Kent ısı adası yerel arazi ve enerji koşullarıyla oluşur; bütün küresel ısınmanın tek nedeni değildir."
        ]
      },
      {
        "title": "Kuraklık, çölleşme ve kaynak baskısı",
        "paragraphs": [
          "Kuraklık belirli dönem ve yerin olağan su koşullarına göre eksikliktir; her kurak iklim alanında aynı anda kuraklık yaşandığı söylenmez. Çölleşme özellikle kurak ve yarı kurak çevrelerde arazi bozulmasıyla ilişkilidir. Aşırı otlatma, uygun olmayan sulama ve örtü kaybı iklim baskısıyla birlikte etkili olabilir.",
          "Toprak tuzlanması, verim kaybı ve su kıtlığı birbirine bağlanabilir ama aynı gösterge değildir. Çözüm yerel toprağa, suya ve kullanım biçimine göre seçilir; her yere aynı ağaç türünü dikmek veya sınırsız sulamak uygun değildir. İzleme, tüketimi azaltma, doğru ürün ve toprak koruma birlikte düşünülür."
        ]
      },
      {
        "title": "Atıkta önce oluşumu azalt",
        "paragraphs": [
          "Atık yönetiminde önce gereksiz tüketimi ve oluşumu önlemek, sonra yeniden kullanım ve geri dönüşüm olanaklarını değerlendirmek esastır. Enerji geri kazanımı veya güvenli bertaraf farklı basamaklardır. Kullanılabilir bir eşyayı onarıp tekrar kullanmak, onu parçalayarak ham maddeye dönüştürmekle aynı işlem değildir.",
          "Kâğıt, cam, metal ve uygun plastikler ayrı toplama, taşıma, ayırma ve işleme süreçleriyle geri kazanılabilir. Kirlenme, malzeme türü ve tesis olanağı sonucu etkiler; her madde sonsuz kez ve bedelsiz dönüştürülemez. Geri dönüşüm kutusu bulunması atığın gerçekten işlendiğinin tek başına kanıtı değildir; süreç izlenmelidir."
        ]
      },
      {
        "title": "Yük ile derişimi farklı ölç",
        "paragraphs": [
          "Günlük kirletici yükü bir zamanda taşınan kütledir; modelde mg/gün kullanılır. Derişim ise kütlenin su hacmine oranıdır ve mg/L ile verilir. Akış iki katına çıkıp dışarı çıkan kütle aynı kalırsa derişim yarıya iner; bu, maddenin yarısının yok olduğu anlamına gelmez.",
          "Kaynakta önlenen, tesiste tutulan ve dışarı çıkan miktarlar başlangıç yükünü oluşturur. Tutma yüzdesi önlemeden sonra tesise giren yüke uygulanır. Model tam karışım, sabit günlük akış ve tepkimesiz madde varsayar; örnek sonucu içilebilirlik, sağlık güveni veya gerçek tesis verimi diye yorumlanmaz."
        ]
      },
      {
        "title": "Azaltma ile uyumu ayır",
        "paragraphs": [
          "İklim değişikliğini azaltma, sera gazı salımlarını azaltma veya yutakları güçlendirme yönündeki çalışmalardır. Enerji verimi, uygun düşük salımlı ulaşım ve habitat korunması bu bağlamda değerlendirilebilir. Sayısal karbon ayak izi veriliyorsa kapsam, dönem ve kullanılan eşdeğerlik birimi de açıklanmalıdır.",
          "Uyum, değişen koşullara karşı zararları azaltma ve dayanıklılığı artırma yönüdür: sıcak dalgası planı, su tasarrufu ve taşkına uygun yer seçimi örnek olabilir. Bir proje iki amaca da katkı yapabilir; ancak yağmur suyu yönetimi tek başına bütün sera gazlarını sıfırlamaz. Etki, hedef ve ölçüm ayrı yazılmalıdır."
        ]
      },
      {
        "title": "Küresel iş birliğinin amacı",
        "paragraphs": [
          "1988’de kurulan IPCC iklim bilgisini değerlendiren bilimsel süreçtir; ülkelerin bütün politikalarını doğrudan yöneten bir dünya polisi değildir. 1992 BM İklim Değişikliği Çerçeve Sözleşmesi ve Kyoto Protokolü farklı iş birliği aşamalarıdır. Kyoto’daki belirli dönem ve taraf yükümlülükleri bütün ülkelere sonsuza dek aynı yüzde diye uygulanmaz.",
          "2015’te kabul edilip 2016’da yürürlüğe giren Paris Anlaşması madde 2, sanayi öncesine göre küresel ortalama sıcaklık artışını 2°C’nin hayli altında tutmayı ve 1,5°C için çabayı belirtir. Uyum, dayanıklılık ve finans akışları da amaçlar arasındadır. Eski kaynaktaki taraf sayısını veya o yılki uygulama durumunu güncel kesin bilgi gibi taşımayız."
        ]
      },
      {
        "title": "Sürdürülebilirlikte kanıtı izle",
        "paragraphs": [
          "Sürdürülebilir kullanım bugünün ihtiyaçları ile gelecek kuşakların olanaklarını birlikte gözetir. Kaynağın yenilenme hızı, kullanım miktarı, atığın yönetimi ve ekolojik eşikler önemlidir. Bir yıllık tüketim düşüşü tek başına bütün sistemin sonsuza dek sürdürülebilir olduğunu kanıtlamaz; dönem ve kapsam açık olmalıdır.",
          "Modelde yalnız akışı artır, sonra yalnız kaynakta önlemeyi artır ve dışarı çıkan kütleyi karşılaştır. Böylece seyreltme ile kütle azaltmanın farklı olduğunu görürsün. Önerini ölçülebilir bir nedene bağla: hangi girdi, hangi çıktı, hangi süre? Sayıyla desteklenmeyen çevre dostu etiketi yerine değişen ilişkiyi açıkla."
        ]
      }
    ],
    "examples": [
      {
        "title": "Önleme ve tutma sırası",
        "prompt": "Bir günde 1000 mg X maddesi oluşuyor. Kaynakta %20 önleniyor; kalanın %40’ı tesiste tutuluyor. Günlük akış 1000 L, tepkime ve hacim kaybı yok. Dışarı çıkan yük ve derişim nedir?",
        "strategy": "Yüzdeleri doğru tabana sırayla uygula.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Önlenen 1000 ×0,20 =200 mg; tesise giren 800 mg’dır."
          },
          {
            "label": "2. adım",
            "explanation": "Tutulan 800 ×0,40 =320 mg; çıkan 800 −320 =480 mg’dır."
          },
          {
            "label": "3. adım",
            "explanation": "Derişim 480 mg /1000 L =0,48 mg/L; günlük yük 480 mg/gündür."
          }
        ],
        "answer": "480 mg/gün ve 0,48 mg/L",
        "check": "200 +320 +480 =1000 mg başlangıç bilançosunu korur.",
        "pitfall": "İki yüzdeyi toplayıp %60 giderim deme; ikincinin tabanı kalan yüktür."
      },
      {
        "title": "Seyreltme maddeyi yok etmez",
        "prompt": "Dışarı çıkan günlük X yükü 600 mg sabittir. Akış önce 1000, sonra 2000 L/gün; tam karışım ve tepkime yok. Ne değişir?",
        "strategy": "Yükü iki ayrı hacme böl.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "İlk derişim 600/1000 =0,6 mg/L olur."
          },
          {
            "label": "2. adım",
            "explanation": "İkinci derişim 600/2000 =0,3 mg/L olur; su hacmi iki katına çıkmıştır."
          },
          {
            "label": "3. adım",
            "explanation": "Derişim yarıya iner ama günlük çıkan kütle iki durumda da 600 mg’dır."
          }
        ],
        "answer": "Derişim azalır; yük değişmez.",
        "check": "0,3 mg/L ×2000 L =600 mg; madde bilançosu aynı kalır.",
        "pitfall": "Düşük derişimi otomatik sıfır kirletici veya güvenli içme suyu sayma."
      },
      {
        "title": "Tutulan atığın payını bul",
        "prompt": "Günde 2000 mg madde oluşuyor, kaynakta %25 önleniyor. Tesise girenin %60’ı tutuluyor. Önlenen, tutulan, çıkan miktarları yaz.",
        "strategy": "Oluşum, önleme sonrası girdi ve iki çıkışı ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Önlenen 2000 ×0,25 =500 mg; giriş 1500 mg’dır."
          },
          {
            "label": "2. adım",
            "explanation": "Tutulan 1500 ×0,60 =900 mg; çıkan 1500 −900 =600 mg’dır."
          },
          {
            "label": "3. adım",
            "explanation": "500 +900 +600 =2000 mg; tutulan 900 mg ayrı atık yönetimi ister."
          }
        ],
        "answer": "500 mg önlenen; 900 mg tutulan; 600 mg çıkan",
        "check": "Başlangıca göre tutulan pay %45’tir; %60 tesise girişin payıdır.",
        "pitfall": "Tutulanı yok olmuş kabul etme veya yüzde tabanını başlangıçla karıştırma."
      },
      {
        "title": "İki çözüm iki amaç",
        "prompt": "A projesi aynı hizmette fosil yakıt kullanımını azaltıyor. B projesi sıcak dalgaları için gölgelik ve uyarı planı kuruyor. Birincil amaçlarını ayır.",
        "strategy": "Sera kaynağını azaltma ile etkilenmeye karşı dayanımı ayır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "A, verilen koşulda salım kaynağını azaltmaya yönelir; azaltma kapsamındadır."
          },
          {
            "label": "2. adım",
            "explanation": "B, sıcaklık etkisinden korunmayı ve hazırlığı artırır; uyum kapsamındadır."
          },
          {
            "label": "3. adım",
            "explanation": "Projeler ek yararlar üretebilir ama verilen temel amaçları farklıdır."
          }
        ],
        "answer": "A azaltma; B uyum",
        "check": "Bir proje hem uyum hem azaltma sağlayabilir; bu soru yalnız açık verilen temel etkiyi sorar.",
        "pitfall": "Uyumu iklimin bütün nedenlerini ortadan kaldırmakla aynı sayma."
      }
    ],
    "recall": [
      {
        "prompt": "Yük ile derişim neden aynı değildir?",
        "answer": "Yük zamanda taşınan kütle; derişim kütle/hacim oranıdır. Su eklemek oranı düşürüp kütleyi sabit bırakabilir."
      },
      {
        "prompt": "Metanın formülü ve sera rolü nedir?",
        "answer": "CH₄; uzun dalga ışınımla enerji dengesini etkileyen sera gazlarından biridir."
      },
      {
        "prompt": "Ozon kaybı ve sera artışı hangi yönden ayrılır?",
        "answer": "Stratosfer ozonu morötesi koruma; sera gazları uzun dalga ışınım dengesiyle ilişkilidir."
      },
      {
        "prompt": "Paris madde 2 hangi sıcaklık hedefini verir?",
        "answer": "Sanayi öncesine göre küresel ortalama sıcaklık artışını 2°C’nin hayli altında tutmak ve 1,5°C için çaba göstermek; amaç yalnız tek kesin 2°C çizgisi değildir."
      }
    ],
    "items": [
      [
        "Günde 1000 mg madde oluşuyor. %20 kaynakta önleniyor; kalanın %40’ı tutuluyor. Akış 1000 L/gün, tepkime yok. Çıkan derişim kaç mg/L’dir?",
        "0,48",
        [
          "0,40",
          "0,60",
          "0,80",
          "4,80"
        ],
        "Önce 800 mg kalan yükü bul.",
        "800 mg girişin %40’ı 320 mg tutulur; 480 mg çıkar. 480/1000 =0,48 mg/L. Yüzdeleri doğrudan toplayamayız."
      ],
      [
        "Tepkimesiz X maddesinin çıkan yükü 600 mg/gün sabitken akış 1000’den 2000 L/güne çıkıyor. Hangisi doğrudur?",
        "Derişim 0,6’dan 0,3 mg/L’ye iner; yük sabittir.",
        [
          "Yük sıfır olur.",
          "Derişim iki katına çıkar.",
          "600 mg maddenin yarısı yok olur.",
          "Su kesin içilebilir olur."
        ],
        "Oranın payı mı paydası mı değişti?",
        "600/1000 =0,6; 600/2000 =0,3. Su artışı tepkimesiz maddenin kütlesini yok etmez ve sağlık sınırı verilmez."
      ],
      [
        "Bir süreçte önlenen 500, tesiste tutulan 900 ve dışarı çıkan 600 mg/gündür. Tepkime yoksa başlangıç yükü nedir?",
        "2000 mg/gün",
        [
          "1500 mg/gün",
          "1000 mg/gün",
          "900 mg/gün",
          "600 mg/gün"
        ],
        "Ayrı üç payın toplamını al.",
        "500 +900 +600 =2000 mg/gün. Tutulan da maddenin bir payıdır; yok sayılarak başlangıç hesabından çıkarılamaz."
      ],
      [
        "Stratosfer ozonu azalınca morötesi korumanın zayıflaması ile sera gazı birikiminin artması karşılaştırılıyor. Hangisi doğrudur?",
        "Farklı mekanizmalardır; tek süreç diye birleştirilemez.",
        [
          "İkisi de yalnız trafik gürültüsüdür.",
          "Ozon kaybı her sera gazını sıfırlar.",
          "Sera etkisi yalnız morötesi ışığı tutar.",
          "İkisi de yalnız toprağın taşınmasıdır."
        ],
        "Işınım türü ve atmosferdeki rolü ayır.",
        "Ozonun koruması morötesiyle, sera etkisi uzun dalga enerji dengesiyle ilişkilidir. Ortak çevre başlığı aynı fiziksel mekanizma anlamına gelmez."
      ],
      [
        "Hangi formül metanı doğru gösterir?",
        "CH₄",
        [
          "CH₂",
          "CO",
          "N₂",
          "O₂"
        ],
        "Bir karbon ve dört hidrojen atomunu düşün.",
        "Metan CH₄’tür. CH₂ kaynakta görülebilen bir yazım kusuru olarak ezberlenmez; CO farklı bileşik, N₂ ve O₂ farklı moleküllerdir."
      ],
      [
        "Deniz suyunun pH’ı 8,2’den 8,1’e düşüyor. Yalnız bu değerlerle hangisi doğrudur?",
        "Asitlenme yönünde değişim vardır; pH hâlâ 7’nin üstündedir.",
        [
          "Su mutlaka pH 7’nin altına inmiştir.",
          "pH yükselmiştir.",
          "Bütün canlılar kesin yok olmuştur.",
          "Suyun tuzu tamamen bitmiştir."
        ],
        "Asitlenmeyi pH düşüşü olarak oku.",
        "8,1 değeri 8,2’den düşük ama 7’den yüksektir. Asitlenme mutlaka asidik pH bölgesine geçiş veya bütün canlıların ölümü demek değildir."
      ],
      [
        "Aynı hizmet için enerji verimiyle fosil yakıt tüketimini azaltmak ve sıcak dalgası gölgelikleri kurmak sırasıyla hangi temel amaçlara örnektir?",
        "Azaltma ve uyum",
        [
          "Uyum ve yalnız madencilik",
          "Yalnız erozyon ve göç",
          "İkisi de yalnız ozon üretimi",
          "İkisi de atığı yok eden işlem"
        ],
        "Nedenin salım tarafı ile etkiden korunmayı ayır.",
        "Yakıt tüketimini azaltma salım kaynağına, gölgelik ise sıcaklık etkisine karşı dayanıklılığa yönelir. Amaçlar bağlantılı olabilir, fakat aynı kavram değildir."
      ],
      [
        "Paris Anlaşması madde 2’nin sıcaklık hedefi en doğru nasıl anlatılır?",
        "Sanayi öncesine göre küresel ortalama sıcaklık artışını 2°C’nin hayli altında tutmak ve 1,5°C için çaba göstermek",
        [
          "Her kentin sıcaklığını her gün tam 2°C yapmak",
          "Bütün ülkelere sonsuza dek aynı %5 kotası vermek",
          "Ozon tabakasını tamamen kaldırmak",
          "Yağışı her yerde aynı miktara çıkarmak"
        ],
        "Bir uzun dönem artış hedefi ile günlük sıcaklığı ayır.",
        "Madde 2 bu iki eşiği ve çabayı birlikte belirtir; başlangıç sanayi öncesidir. Günlük kent sıcaklığı veya bütün ülkeler için tek değişmez kota değildir."
      ],
      [
        "Bir rüzgâr tesisi için fosil yakıt gereksinimi azalırken bazı kuş yollarına etki saptanıyor. En uygun değerlendirme hangisidir?",
        "Yenilenebilir yararı ve yerel etki birlikte yönetilmelidir.",
        [
          "Yenilenebilir olduğu için gözlenen etki yok sayılır.",
          "Her tesiste bütün türlerin kesin yok olduğu söylenir.",
          "Hiçbir yer seçimi verisi gerekmez.",
          "Yalnız adı bilinirse bütün yaşam döngüsü sıfırdır."
        ],
        "Kaynak türü ile etki ölçümünü ayrı tut.",
        "Yenilenebilirlik sıfır çevresel etki demek değildir. Yarar, yer seçimi, türler ve izleme birlikte ele alınır; tek örnek bütün tesislere aynı sonucu zorunlu kılmaz."
      ],
      [
        "Kullanılabilir bir sandalyeyi onarıp tekrar kullanmak, malzemesini parçalamadan ömrünü uzatıyor. En uygun işlem adı nedir?",
        "Yeniden kullanım",
        [
          "Malzemeyi ham maddeye dönüştüren geri dönüşüm",
          "Kesin yakma",
          "Yalnız son depolama",
          "Bütün çevre etkilerini sıfırlama"
        ],
        "Eşyanın kendisi mi malzemesi mi yeniden değerlendiriliyor?",
        "Onarılan eşya yeniden kullanılır; malzemenin işlenip ham maddeye dönüşümü farklıdır. Yeniden kullanım bütün etkileri sıfırlama iddiası da taşımaz."
      ]
    ],
    "source": "Aurelia Çevre ve Toplum kâğıdı; OGM 9. Sınıf PDF 17–18,22, OGM 11. Sınıf PDF 10–19,23 ve OGM 12. Sınıf PDF 15–18,21; MEBİ TYT Coğrafya PDF 60–61; Paris Anlaşması madde 2–3 ile karşılaştırılmış özgün öğretim. Sayısal X maddesi gerçek tesis veya sağlık verisi değildir."
  },
  {
    "id": "afetler-risk",
    "topic": "detail-73",
    "title": "Afetler: süreç, maruziyet ve hazırlık",
    "minutes": 130,
    "objectives": [
      "Tehlike, afet, maruziyet ve kırılganlığı somut örneklerde ayır.",
      "Jeolojik, iklimsel, biyolojik ve teknolojik süreçleri koşullarıyla açıkla.",
      "Afet döngüsünde önleme, hazırlık, müdahale ve iyileştirme işlerini yerleştir."
    ],
    "sections": [
      {
        "title": "Doğa olayı ne zaman afet olur?",
        "paragraphs": [
          "Deprem, yağış, volkanik püskürme veya fırtına birer fiziksel olaydır. Tehlike zarar doğurma potansiyelini, afet ise toplumun işleyişinde ciddi kayıp ve kesinti yaratan durumu anlatır. İnsan ve değerlerin bulunmadığı yerdeki aynı büyüklükte olay ile yoğun ve kırılgan yerleşmedeki sonuç aynı olmayabilir.",
          "Olayın adı tek başına kayıp sayısını belirlemez. Yerleşme, yapı durumu, altyapı, hazırlık ve müdahale kapasitesi sonucu etkiler. Doğal süreçleri öğrenmek, bütün zararı kaçınılmaz görmek veya her olayı otomatik afet saymak değildir; değiştirilebilir toplumsal koşullar da araştırılır."
        ]
      },
      {
        "title": "Maruziyet ve kırılganlık farklıdır",
        "paragraphs": [
          "Maruziyet, insan ve değerlerin tehlikenin etkileyebileceği yerde bulunmasıdır. Kırılganlık, bu etkinin zarar doğurmasına karşı duyarlılıkla ilişkilidir. Aynı taşkın alanındaki iki yapı aynı sayıda maruz ev olarak sayılabilir ama dayanımı ve içindeki insanların gereksinimleri farklı olabilir.",
          "Kapasite bilgi, örgütlenme, altyapı ve kaynaklarla baş etme olanağıdır. Risk bu ilişkilerle değerlendirilir; burada kesin hasar olasılığı üreten tek çarpım formülü verilmez. Modelde yapı iyileştirme seçimi kırılganlık etiketini değiştirir, suya ulaşan ev sayısını kendiliğinden azaltmaz."
        ]
      },
      {
        "title": "Afetleri ölçütünü bilerek sınıflandır",
        "paragraphs": [
          "Öğretim kaynaklarında jeolojik, klimatik, biyolojik, sosyal ve teknolojik başlıklar kullanılır. Deprem ve volkan yer içi süreçleriyle; fırtına ve kuraklık atmosfer ile su koşullarıyla; salgın ve zararlı canlı yayılışı biyolojik süreçlerle ele alınabilir. Sınıflama amacı açık tutulursa örneklerin hangi nedenle bir araya getirildiği anlaşılır.",
          "Bazı olaylar birden fazla etkenle oluşur: yangın yıldırımla ya da insan etkisiyle başlayabilir, deprem bir sanayi kazasını tetikleyebilir. Erozyonun kendisi fiziksel aşındırma-taşıma sürecidir; her göç veya her toplumsal hareket afet sayılmaz. Tek bir tablonun bütün dünyada tek ve çakışmasız sınıflama olduğu ileri sürülmez."
        ]
      },
      {
        "title": "Depremde enerji ve yerel etki",
        "paragraphs": [
          "Yer kabuğundaki gerilimin fay boyunca ani kaymayla boşalması sismik dalgalar üretir. Depremin büyüklüğü kaynakta açığa çıkan enerjiyle ilişkili bir ölçüdür; yerel şiddet bir yerde hissedilen ve gözlenen etkiyi anlatır. Odak derinliği, uzaklık, zemin ve yapı özellikleri farklı yerlerde farklı sonuçlar doğurabilir.",
          "Pasifik çevresi ve Alp–Himalaya kuşağı önemli deprem alanlarıdır; okyanus sırtlarında da sismik etkinlik bulunur. Türkiye aktif tektonik alan üzerindedir, ancak bir fayın varlığı belirli gün ve saatte deprem olacağını söylemez. Büyüklükten doğrudan can kaybı veya her yapı için aynı hasar yüzdesi hesaplanamaz."
        ]
      },
      {
        "title": "Tsunami neden her depremde olmaz?",
        "paragraphs": [
          "Tsunami, büyük su kütlesinin yer değiştirmesiyle oluşan uzun dalga sistemidir. Deniz tabanındaki uygun yer değiştirme, denizaltı heyelanı veya volkanik olay bu süreci başlatabilir. Denizaltında deprem olması tek başına yeterli değildir; taban hareketinin türü, boyutu ve suya etkisi önemlidir.",
          "Açık denizde uzun dalga boyuyla ilerleyen sistem kıyı sığlaşması ve yer şekline göre farklı yükseklik ve akış yaratabilir. Bütün kıyılarda tek bir kesin dalga yüksekliği verilemez. Bu uygulama gerçek zamanlı tsunami uyarısı veya kıyı güvenliği kararı üretmez; fiziksel mekanizmayı ve maruziyet farkını öğretir."
        ]
      },
      {
        "title": "Volkanik tehlikenin farklı ürünleri",
        "paragraphs": [
          "Volkanik etkinlik lav, kül, gaz ve uygun koşullarda çok sıcak hızlı akışlar veya çamur akışları gibi farklı tehlikeler üretebilir. Etki yalnız kraterin ağzında kalmaz; kül taşınması hava ulaşımını ve uzak yerleri de etkileyebilir. Püskürme biçimi, topoğrafya ve su koşulu hangi sürecin öne çıktığını değiştirir.",
          "Volkanların önemli bölümü levha sınırlarıyla ilişkilidir; sıcak nokta örnekleri bütününün yalnız sınırlarda bulunmadığını gösterir. Yakın geçmişte püskürmemiş bir volkanı sonsuza dek risksiz saymayız. Türkiye’de volkanik arazilerin bulunması her noktada aynı güncel tehlike olduğu anlamına gelmez; tarih ve izleme gerekir."
        ]
      },
      {
        "title": "Tsunami ve volkanın mekânsal örnekleri",
        "paragraphs": [
          "Japonya ve Endonezya çevresi, levha hareketleri ve kıyı yerleşmeleriyle birlikte tsunami öğretiminde önemli örneklerdir. Büyük ve Hint okyanuslarının kıyılarında çok sayıda olay incelenmiştir. Bu örneklerden her kıyının aynı yüksekliği yaşayacağı veya Türkiye kıyılarında hiç tehlike bulunmadığı sonucu çıkmaz; kaynak ve kıyı biçimi belirleyicidir.",
          "Pasifik çevresi, İzlanda ve Doğu Afrika yarık sistemi farklı tektonik bağlamlardaki volkanik alanlara örnektir. Türkiye’de Nemrut, Ağrı, Tendürek, Erciyes ve Hasan volkanik dağ adlarıdır. Bu adları tanımak bütününün aynı tarihte püskürdüğü veya gelecekte kesin tehlikesiz olduğu anlamına gelmez; yaş, etkinlik ve izleme ayrı incelenir."
        ],
        "table": {
          "headers": [
            "Örnek alan",
            "İlişkili süreç",
            "Sınır"
          ],
          "rows": [
            [
              "Japonya / Endonezya kıyıları",
              "Su kütlesini etkileyen tektonik olay ve tsunami",
              "Her deprem tsunami değildir."
            ],
            [
              "Pasifik çevresi",
              "Çok sayıda levha sınırı ve volkan",
              "Bütün volkanlar bu kuşakta değildir."
            ],
            [
              "İzlanda / Doğu Afrika",
              "Açılma ve volkanik etkinlik örnekleri",
              "Yerel süreç ve etkinlik ayrıca incelenir."
            ],
            [
              "Nemrut / Ağrı / Tendürek / Erciyes / Hasan",
              "Türkiye’nin volkanik arazileri",
              "İsim listesi güncel tehlike haritası değildir."
            ]
          ]
        }
      },
      {
        "title": "Kütle hareketinde yamaç dengesi",
        "paragraphs": [
          "Heyelan, kaya düşmesi ve benzeri kütle hareketlerinde yer çekimiyle malzeme yamaç boyunca yer değiştirir. Eğim, zayıf tabakalar, suyla doygunluk, yamaç eteğinin kazılması ve sarsıntı koşulları dengeyi etkileyebilir. Yalnız çok yağış olması her düz yerde heyelan olacağını göstermez; eğim ve malzeme birlikte önemlidir.",
          "Doğu Karadeniz’in eğimli ve yağışlı alanları Türkiye’de heyelan öğretiminde önemli örnektir. Yol açma veya drenajı bozma riski artırabilir; uygun planlama ve uzman mühendislik azaltabilir. Tek bir yamacın güveni bu genel bilgilerle kesinlenmez; yerinde veri ve yetkili değerlendirme gerekir."
        ]
      },
      {
        "title": "Erozyon ve toprağı koruma",
        "paragraphs": [
          "Erozyon toprağın su veya rüzgârla aşındırılıp taşınmasıdır. Bitki örtüsünün zayıflaması, yanlış işleme, aşırı otlatma ve eğim taşıma koşullarını artırabilir. Doğal süreç ile insan etkisiyle hızlanma ayrılır; toprağın taşınmasıyla bütün yamacın kütle hâlinde kayması aynı mekanizma değildir.",
          "Araziye uygun örtüyü koruma, eğim yönünde sürüm yerine eş yükselti eğrileri boyunca uygun işleme, teraslama ve otlatma düzeni araçlar arasındadır. Her yöntemin uygunluğu yerel koşula bağlıdır. Bir ülkenin kesin bir yıl sonra bütünüyle çöl olacağı gibi sabit süreli kehanetler bu mekanizmadan çıkmaz."
        ]
      },
      {
        "title": "Fırtına, tropikal siklon ve hortum",
        "paragraphs": [
          "Fırtınada kuvvetli rüzgâr deniz kabarması, dalga, yağış ve altyapı etkileriyle birlikte ele alınır. Tropikal siklon sıcak okyanus, yeterli nem ve uygun atmosferik koşullarla gelişen geniş sistemdir; orta enlem fırtınasıyla aynı oluşum düzenine indirgenmez. Her sıcak deniz aynı anda siklon üretmez.",
          "Hortum daha dar alandaki güçlü dönel hava sütunudur; bir siklonun bütün alanıyla aynı ölçek değildir. Türkiye’de kuvvetli fırtına ve hortum görülebilir; tek bir tropikal örnekten bütün bölgelere aynı sıklık verilmez. Kaynaktaki tarihsiz dünya afet sırası, yıl ve ölçü belirtilmeden güncel kesin sıralama olarak öğrenilmez."
        ]
      },
      {
        "title": "Sel ve taşkın için havzayı oku",
        "paragraphs": [
          "Kısa sürede şiddetli yağış, hızlı kar erimesi, doymuş zemin veya geçirimsiz yüzey artışı yüzey akışını yükseltebilir. Dere yatağının daraltılması ve taşkın düzlüğünde yapılaşma maruziyeti artırır. Şiddetli yağışın düştüğü yer ile aşağı havzada suyun yükseldiği yer farklı olabilir; yalnız yerel gökyüzüne bakmak yetmez.",
          "Taşkın düzlüğünü uygun kullanma, su tutma ve drenaj planı ile havza ölçekli izleme önemlidir. Bir kanalı büyütmek bütün aşağı havza sonuçlarını otomatik çözmez. Deneyde su seviyesi dışarıdan verilmiştir; yağıştan gerçek nehir seviyesi tahmini yapılmaz. Suya ulaşan kat kotları aynı açık kuralla sayılır."
        ]
      },
      {
        "title": "Kuraklık ve çölü karıştırma",
        "paragraphs": [
          "Kuraklık bir yerin belirli dönemdeki olağan yağış veya su koşullarına göre eksikliktir. Yağış azlığı, akış, toprak nemi, kullanım talebi ve süre farklı kuraklık göstergeleri oluşturabilir. Sürekli kurak iklim olan çöl ile geçici kuraklık aynı tanım değildir; nemli bir bölge de kendi normaline göre kurak dönem yaşayabilir.",
          "Su talebi artarken kaynak sabitse toplumsal sıkıntı büyüyebilir. Ürün seçimi, tasarruf, kaçak denetimi ve uygun depolama birlikte değerlendirilir; bir baraj bütün dönem ve havzalar için tek çözüm değildir. Kuraklığın başlama ve bitişi hızlı sel kadar keskin görülmeyebilir, bu nedenle uzun dönem izleme gerekir."
        ]
      },
      {
        "title": "Sıcak ve soğuk dalgaları",
        "paragraphs": [
          "Sıcak veya soğuk dalgası değerlendirmesi yerin olağan sıcaklığı, mevsim, süre ve kullanılan eşiğe bağlıdır. Her ülkede tek bir sabit derece ve gün sayısının geçerli olduğu varsayılmaz. Kentlerde yapılaşma ve yeşil alan azlığı yerel sıcak yükünü artırabilir; yaş, sağlık ve çalışma koşulu etkilenmeyi farklılaştırır.",
          "Erken bilgilendirme, çalışma düzeni ve korunmaya erişim dayanıklılık araçlarıdır. Tek bir sıcak gün bütün iklim eğiliminin ölçüsü değildir; uzun dönem artış da her günün aynı derecede sıcak olmasını gerektirmez. Öğrenme amacı olayın eşik ve etki koşullarını okumaktır; kişiye özel tıbbi veya acil durum kararı verilmez."
        ]
      },
      {
        "title": "Çığda kar tabakalarının dengesini düşün",
        "paragraphs": [
          "Çığ, kar kütlesinin eğimli yüzeyde hareketidir. Eğim, tabakalar arasındaki bağ, yeni kar yükü, rüzgârla birikme ve ısınma koşulları dengenin bozulmasına katkı yapabilir. Türkiye’nin yüksek ve karlı dağlık alanları bu bağlamda incelenir; bütün karlı araziler aynı çığ tehlikesini taşımaz.",
          "Her sesin mutlaka çığ başlattığı gibi bir genelleme yerine fiziksel kar tabakası ve yük koşullarını araştırırız. Yer seçimi, kar izleme ve planlama önemlidir. Bu genel model belirli bir dağ rotasının güvenini onaylamaz; gerçek alanda uzman ve yetkili uyarıları gerekir."
        ]
      },
      {
        "title": "Fırtına ve çığda yer örneğini koşula bağla",
        "paragraphs": [
          "Karayipler ve ABD’nin güneyi, Güneydoğu Asya, Avustralya’nın kuzeyi ve Afrika’nın doğu kıyıları tropikal siklonların etkili olabildiği bölgelere örnektir. Sıcak okyanus ve uygun atmosferik koşullar temel bağlamdır; aynı ad bütün havzalarda kullanılmayabilir. Bir ülkenin her noktası veya her mevsimi aynı tehlike taşımaz.",
          "Alpler, Kayalık Dağları ve Himalayalar eğim ile kar birikimi bakımından çığ öğretiminde örneklenir; Türkiye’nin karlı yüksek doğu kesimlerinde de uygun koşullar bulunur. Dağ adını bilmek tek bir yamacın o günkü kar dengesini vermez. Yer örneğini süreç koşuluyla birlikte öğren; tarihsiz olay sayısını bugünün sırası veya gelecek yılın kesin sonucu sayma."
        ]
      },
      {
        "title": "Orman yangınında üçlü koşul",
        "paragraphs": [
          "Yanabilir örtü, tutuşma kaynağı ve yangının yayılmasına uygun koşullar birlikte ele alınır. Kuruluk ve rüzgâr yayılımı etkileyebilir; yıldırım veya insan etkinliği başlangıç oluşturabilir. Sıcak hava tek başına her ormanda kendiliğinden kesin yangın demek değildir; yakıtın ve tutuşmanın koşulu önemlidir.",
          "Akdeniz çevresindeki kuru yaz koşulları önemli bir bağlamdır; gözetim, uygun arazi yönetimi ve erken müdahale etkili olabilir. Tarihi ve örneklemi verilmeyen insan kaynaklı yangın yüzdeleri bütün ülke ve yıllara aynen taşınmaz. Yangın sonrası toprağın korunması, su ve habitatın iyileşmesi de uzun sürecin parçasıdır."
        ]
      },
      {
        "title": "Salgın ve zararlı canlı yayılışı",
        "paragraphs": [
          "Salgında etken, duyarlı kişiler, temas veya taşınma yolu ve toplumsal koşullar birlikte rol oynar. Su ve gıda güvenliği, hijyen, uygun bağışıklama ve sağlık hizmeti erişimi önemlidir. Ulaşım ağları yayılımı kolaylaştırabilir; fakat her yolculuk veya her hastalık aynı yayılma hızını taşımaz.",
          "COVID-19 hastalığın adıdır; hastalığa yol açan virüsün adıyla aynı kavram değildir. Aşı ve tedavi olanakları riski azaltabilir ama bütün hastalıkların sonsuza dek tehdit olmaktan çıktığı sonucu kurulmaz. Zararlı canlı veya böcek yayılışı da üretim ve ekosistemi etkileyebilir; her türün varlığı otomatik afet değildir."
        ]
      },
      {
        "title": "Teknolojik ve zincirleme etkiler",
        "paragraphs": [
          "Sanayi, maden, ulaşım ve nükleer tesis kazaları teknolojik tehlike örnekleridir. Depremle başlayan yangın, kimyasal sızıntı veya altyapı kesintisi farklı tehlikelerin zincirleme etkisini gösterebilir. İlk olayın doğal olması sonraki bütün etkilerin önlenemez olduğu anlamına gelmez; yer seçimi ve güvenlik tasarımı önemlidir.",
          "Toplumsal çatışma ve zorunlu yer değiştirme ciddi kayıplar yaratabilir; ancak her göçü afet sınıfına koymak doğru değildir. Kayıpları tek bir topluluğun özelliğiyle açıklayan önyargılardan kaçınılır. Somut maruziyet, yapı, hizmete erişim ve karar süreçleri araştırılarak değiştirilebilir nedenler ortaya konur."
        ]
      },
      {
        "title": "Zarar azaltma olaydan önce başlar",
        "paragraphs": [
          "Tehlike haritası, uygun yer seçimi, yapı ve altyapının uzman denetimiyle iyileştirilmesi zarar azaltma çalışmalarındandır. Suya maruz yerden uygun güvenli alana taşınmak maruziyeti değiştirebilir; aynı yerdeki yapıyı daha dayanıklı yapmak ise başka bir risk bileşenine yönelir. İki işlem aynı değişkeni değiştirmez.",
          "Yoksulluk, erişim ve bakım olanakları önlemi uygulama gücünü etkileyebilir. Planın yalnız kâğıtta bulunması yeterli değildir; uygulanması ve denetlenmesi gerekir. Her önlem belirli koşullarda yararlıdır; uygulama bir evin mühendislik uygunluğunu veya sıfır kayıp güvencesini vermez."
        ]
      },
      {
        "title": "Hazırlık ve erken uyarı",
        "paragraphs": [
          "Tatbikat, görev dağılımı, iletişim planı, gereksinimlerin belirlenmesi ve uyarı sisteminin denenmesi olay öncesi hazırlıktır. Erken uyarı, izlenen veya başlayan bir olaya ilişkin bilgiyle koruyucu eylem için zaman kazandırmayı hedefleyebilir. Algılama ile mesajın ulaşması ve uygulanması ayrı aşamalardır.",
          "Bir deprem başladıktan sonra dalgaların farklı varışlarından yararlanan uyarı, depremin gününü önceden kesin bilmek değildir. Uyarı her koşulda aynı süreyi vermez. Bu uygulama gerçek zamanlı uyarı servisi değildir; güvenli eylem planları yetkili ve yerel uzman bilgisiyle hazırlanır."
        ]
      },
      {
        "title": "Müdahale ve iyileştirme",
        "paragraphs": [
          "Olayın hemen ardından arama-kurtarma, acil sağlık, temel ihtiyaç ve geçici barınma çalışmaları müdahale kapsamındadır. Kalıcı altyapının, hizmetlerin ve geçim düzeninin yeniden kurulması ise iyileştirme boyutunu taşır. Süreçler bazı dönemlerde örtüşebilir; yaşamın yeniden kurulması yalnız bir binanın onarılması değildir.",
          "İyileştirme önceki kırılganlığı aynen geri getirmek yerine daha güvenli planlamayla bağlantılanabilir. Afet döngüsü bir kez ilerleyip biten çizgi değildir; öğrenilenler yeni zarar azaltma ve hazırlığa aktarılır. Modeldeki eylem kartlarında olaydan önce veya sonra koşulu açık yazıldığı için aşama gerekçeyle seçilir."
        ]
      },
      {
        "title": "Kurum ve toplumun birlikte işi",
        "paragraphs": [
          "Türkiye’de AFAD 2009’da afet ve acil durum yönetiminin koordinasyon yapısı olarak kurulmuştur. Bu durum bütün belediye, sağlık, itfaiye, eğitim ve diğer kurumların görevlerinin yok olduğu anlamına gelmez. Kurumlar arası koordinasyon, yerel kapasite ve toplumun bilgilendirilmesi birlikte önem taşır.",
          "Öğrenilen bilgi bir acil durum sırasında uygulamanın tek yetkili kaynak olduğu iddiasına dönüşmez. Yerel koşul ve yetkili duyuru esastır. Eğitimde amaç kimin hangi hazırlığı neden yaptığını öğrenmek, yanlış güven üreten kesin deprem tarihi veya her durumda tek güvenli davranış vaadi oluşturmamaktır."
        ]
      },
      {
        "title": "Kesitte say, sonra yorumla",
        "paragraphs": [
          "Deneyde on evin kat kotları 1’den 10 metreye kadar verilmiştir; su seviyesi de ayrıca seçilir. Kat kotuna su ulaştığında ev maruz sayılır. Su 6 m ise ilk altı ev bu koşulu karşılar. İlk üç ev 12, 13 ve 14 m kotlu başka yerlere taşınınca aynı seviyede yalnız 4, 5 ve 6 m’deki evler maruz kalır.",
          "Taşıma araziyi yükseltmez; evler sabit profilde gerçekten başka konuma gider. Yapı iyileştirme düğmesi bu sayıyı değiştirmez, yalnız kırılganlık koşulunu değiştirir. Modelden gerçek ölüm, hasar yüzdesi veya gelecekteki su düzeyi hesaplanmaz. Önce sayısal kanıtı, sonra hangi bileşenin değiştiğini açıkla."
        ]
      }
    ],
    "examples": [
      {
        "title": "Maruz ev sayısı",
        "prompt": "On evin kat kotları sırasıyla 1, 2, 3, 4, 5, 6, 7, 8, 9 ve 10 m’dir. Verilen taşkın düzeyi 6 m; kotuna su ulaşan ev maruz sayılıyor. Kaç ev maruz?",
        "strategy": "Her evin kotunu aynı seviye ile karşılaştır.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "1–6 m kotlu evler için kot en çok 6 m’dir; altı ev koşulu sağlar."
          },
          {
            "label": "2. adım",
            "explanation": "7–10 m kotlu dört ev verilen su düzeyinin üstündedir."
          },
          {
            "label": "3. adım",
            "explanation": "Maruz sayısı 6’dır; bu sayı doğrudan yıkılan veya can kaybı olan ev sayısı değildir."
          }
        ],
        "answer": "6 ev",
        "check": "6 +4 =10 ev; tam 6 m’deki ev kural gereği dâhildir.",
        "pitfall": "Ulaşma kuralında eşitliği atlama veya maruziyeti hasarla eşitleme."
      },
      {
        "title": "Yer değiştirme hangi bileşeni azaltır?",
        "prompt": "Aynı on evin kotları 1–10 m, su 6 m’dir. İlk üç ev 12, 13 ve 14 m kotlu başka yerlere taşınıyor. Yeni maruz sayısı nedir?",
        "strategy": "Taşınanların yeni kotlarını kullan, diğer evleri koru.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "Yeni 12, 13 ve 14 m kotları 6 m’nin üstündedir; ilk üç ev artık bu örnekte maruz değildir."
          },
          {
            "label": "2. adım",
            "explanation": "4, 5 ve 6 m kotlarında kalan üç ev hâlâ su düzeyini karşılar."
          },
          {
            "label": "3. adım",
            "explanation": "Maruz sayısı 6’dan 3’e iner; toplam ev sayısı 10 olarak kalır."
          }
        ],
        "answer": "3 ev; maruziyet azalmıştır.",
        "check": "Taşınmayan 7–10 m evleri zaten su üstündeydi; yeni ev eklenmedi.",
        "pitfall": "Taşınma açıkken arazinin eski kotlarını yükselmiş gibi çizme."
      },
      {
        "title": "Dayanım ve maruziyet ayrımı",
        "prompt": "Aynı taşkında su 5 m, on evin kotları 1–10 m’dir. Evler yerinde kalıp uzman denetimiyle iyileştiriliyor. Modelde su veya kot değişmiyor. Maruz ev sayısı ne olur?",
        "strategy": "Konumu belirleyen veri ile duyarlılığı ayrı tut.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "1–5 m evler su düzeyini karşılar; başlangıçta beş ev maruzdur."
          },
          {
            "label": "2. adım",
            "explanation": "İyileştirme su seviyesini ve yer kotunu değiştirmemiştir; aynı beş ev suyla karşılaşır."
          },
          {
            "label": "3. adım",
            "explanation": "Maruz sayısı beş kalır; kırılganlık azalabilir ama kesin hasar oranı verilmez."
          }
        ],
        "answer": "5 ev; maruziyet aynı, kırılganlık farklı olabilir.",
        "check": "Daha dayanıklı evin su alanından fiziksel olarak çıkmış olması gerekmez.",
        "pitfall": "İyileştirme etiketinden maruz sayısını sıfıra indirme."
      },
      {
        "title": "Dört aşamada somut işler",
        "prompt": "A: olay öncesi yapı iyileştirme; B: olay öncesi tatbikat; C: olay sonrası arama-kurtarma; D: kalıcı su altyapısını yeniden kurma. Aşamaları sırala.",
        "strategy": "İşin zamanı ve amacı birlikte belirler.",
        "steps": [
          {
            "label": "1. adım",
            "explanation": "A kırılganlığı azaltmaya yönelir: zarar azaltma. B görevleri denemektir: hazırlık."
          },
          {
            "label": "2. adım",
            "explanation": "C acil can kurtarmadır: müdahale. D kalıcı hizmeti geri kurmaktır: iyileştirme."
          },
          {
            "label": "3. adım",
            "explanation": "Aşamalar bir döngü oluşturur; iyileştirmeden öğrenilenler yeni önlemleri besleyebilir."
          }
        ],
        "answer": "A zarar azaltma; B hazırlık; C müdahale; D iyileştirme",
        "check": "Geçici barınma acil ihtiyaçsa müdahale; kalıcı geçim ve altyapı kurulması iyileştirme boyutundadır.",
        "pitfall": "Olaydan sonraki her işi sadece arama-kurtarma diye adlandırma."
      }
    ],
    "recall": [
      {
        "prompt": "Maruziyet ile kırılganlık nasıl ayrılır?",
        "answer": "Tehlike alanında bulunmak ile etkiden zarar görmeye duyarlılık farklıdır; yapı iyileştirme konumu otomatik değiştirmez."
      },
      {
        "prompt": "Büyüklük neden tek başına yerel hasarı vermez?",
        "answer": "Derinlik, uzaklık, zemin, yapı ve toplumsal koşullar yerel etkiyi değiştirir."
      },
      {
        "prompt": "Her denizaltı deprem tsunami doğurur mu?",
        "answer": "Hayır. Su kütlesini etkileyen uygun yer değiştirme ve olay koşulları gerekir."
      },
      {
        "prompt": "Tatbikat ve kalıcı altyapı onarımı hangi aşamalardır?",
        "answer": "Olay öncesi tatbikat hazırlık; olay sonrası kalıcı hizmeti kurma iyileştirmedir."
      }
    ],
    "items": [
      [
        "On evin kat kotları 1–10 m tam sayılarıdır. Verilen su seviyesi 6 m; kotuna su ulaşan ev maruz sayılır. Kaç ev maruzdur?",
        "6",
        [
          "5",
          "4",
          "10",
          "0"
        ],
        "Eşit kotun da kurala dâhil olduğunu unutma.",
        "1, 2, 3, 4, 5 ve 6 m kotlu altı ev maruzdur. Bu sayı doğrudan yıkım veya can kaybı sayısı değildir."
      ],
      [
        "Kotları 1–10 m olan on evde ilk üçü 12, 13 ve 14 m kotlu yeni yerlere taşınıyor. Su 6 m, ulaşan kot maruz. Yeni maruz sayısı kaçtır?",
        "3",
        [
          "6",
          "7",
          "0",
          "10"
        ],
        "Taşınan üç evi yeni kotlarında değerlendir.",
        "İlk üç ev artık su üstünde; 4, 5 ve 6 m evleri maruzdur. Toplam on ev korunur ve üç ev koşulu karşılar."
      ],
      [
        "Su 5 m; on evin kotları 1–10 m’dir. Yapılar iyileştiriliyor, konum ve su sabit. Modelde maruz sayısı nasıl değişir?",
        "5 kalır; kırılganlık ayrı değişebilir.",
        [
          "Kesin sıfır olur.",
          "10’a çıkar.",
          "Kesin can kaybı 5 olur.",
          "Kotlar otomatik 20 m yükselir."
        ],
        "İyileştirme konumu veya suyu değiştirdi mi?",
        "1–5 m evler yine suya ulaşır. Yapı durumu duyarlılığı etkileyebilir; maruziyet sayısı ve kesin hasar aynı gösterge değildir."
      ],
      [
        "Olay öncesinde görevlerin tatbikatla denenmesi hangi aşamaya en doğrudan örnektir?",
        "Hazırlık",
        [
          "Olay sonrası arama-kurtarma",
          "Yalnız kalıcı iyileştirme",
          "Tsunami oluşumu",
          "Depremin fiziksel büyüklüğü"
        ],
        "Zamanı ve işin amacını birlikte oku.",
        "Tatbikat olaydan önce planı ve görevleri denemedir. Acil kurtarma veya kalıcı yeniden kurmayla aynı aşama değildir."
      ],
      [
        "Bir deprem için yalnız büyüklük verilmiş; derinlik, uzaklık, zemin ve yapı bilgisi yoktur. Hangisi kesinlenemez?",
        "Bir mahalledeki kesin hasar ve kayıp sayısı",
        [
          "Bir deprem ölçüsünün verilmiş olduğu",
          "Yerel etki için ek verinin gerekli olması",
          "Zemin ve yapının sonucu etkileyebilmesi",
          "Aynı olayın farklı yerlerde farklı etki yaratabilmesi"
        ],
        "Kaynak ölçüsüyle yerel sonucu ayır.",
        "Büyüklük tek başına mahalle kaybını vermez. Derinlik, uzaklık, zemin, yapı ve maruz nüfus gibi veriler gerekir."
      ],
      [
        "Deniz altında bir deprem olduğu bilinmektedir, fakat taban hareketi ve suya etkisi verilmemiştir. Hangisi doğrudur?",
        "Tsunami oluştuğu yalnız bu bilgiyle kesinleşmez.",
        [
          "Her denizaltı deprem aynı boyda tsunami üretir.",
          "Bütün kıyılarda dalga kesin 5 m olur.",
          "Deprem olmadığı kesinleşir.",
          "Su hiçbir fiziksel olayla yer değiştiremez."
        ],
        "Su kütlesini hareket ettiren koşulu ara.",
        "Tsunami için uygun su yer değiştirmesi gerekir; her denizaltı deprem bunu aynı biçimde yaratmaz. Dalga yüksekliği için de konum ve kıyı verisi gerekir."
      ],
      [
        "Bir bölgede yağış uzun dönem olağanının altında kalmış, su talebi de artmıştır. Kuraklık için en uygun yaklaşım hangisidir?",
        "Yerel normal, süre, akış ve talebi birlikte değerlendirmek",
        [
          "Her kuraklığı kalıcı çöl diye adlandırmak",
          "Yalnız tek günün rengine bakmak",
          "Nemli iklimde kuraklık olamayacağını söylemek",
          "Talebin hiçbir etkisi olmadığını varsaymak"
        ],
        "Mutlak az yağış ile yerin normalinden sapmayı ayır.",
        "Kuraklık yer ve dönem normaliyle değerlendirilir; talep ve su depoları sonucu etkiler. Nemli yerde de göreli eksiklik yaşanabilir."
      ],
      [
        "Yağışlı eğimli bir yamaçta zayıf tabaka ve yol için kazılan etek bulunuyor. Verilenler en doğrudan hangi sürece uygun koşullardır?",
        "Kütle hareketi ve heyelan",
        [
          "Yalnız ozon üretimi",
          "Kesin bir nüfus sayımı",
          "Bütün denizlerin aynı anda kuruması",
          "Güneş tutulması"
        ],
        "Yer çekimi, su ve yamaç desteğini birlikte düşün.",
        "Su, zayıf tabaka ve etek kazısı yamaç dengesini etkileyebilir. Bu koşullar heyelan değerlendirmesi gerektirir; belirli gün ve kesin hareket miktarı verilmez."
      ],
      [
        "Deprem sonrasında kalıcı su altyapısı ve geçim olanakları yeniden kuruluyor. Temel afet yönetimi boyutu hangisidir?",
        "İyileştirme",
        [
          "Olay öncesi tatbikat",
          "Yalnız depremin oluşumu",
          "Sadece ilk saniye uyarısı",
          "Atmosferin katmanlaşması"
        ],
        "Acil ihtiyaç ile kalıcı yaşam düzenini ayır.",
        "Kalıcı hizmet ve geçimin yeniden kurulması iyileştirmedir; yalnız ilk an arama-kurtarma değildir. Yeni düzen daha güvenli önlemlere de bağlanabilir."
      ],
      [
        "Bir uyarı sistemi deprem başladıktan sonra algıladığı dalgalardan yararlanarak bazı uzak yerlere bilgi gönderiyor. Hangisi doğrudur?",
        "Başlayan olaya ilişkin erken uyarıdır; gününü önceden kesin tahmin değildir.",
        [
          "Bütün depremlerin gününü yıllar önce kesin bilir.",
          "Her kullanıcıya mutlaka aynı süreyi verir.",
          "Depremi fiziksel olarak sıfırlar.",
          "Her yapının dayanımını aynı anda ölçer."
        ],
        "Algılama zamanı ile önceden tahmini ayrı tut.",
        "Başlamış olayı algılama ve uyarı, başlangıç tarihini önceden kesin bilmekten farklıdır. Mesafe ve iletişim nedeniyle süre değişebilir; yapı güveni de ayrıca değerlendirilir."
      ]
    ],
    "source": "Aurelia Afetler kâğıdı; OGM 10. Sınıf Dersler Cepte PDF 17–22,25 ve OGM 12. Sınıf PDF 10–12,21; MEBİ TYT Coğrafya PDF 113–121 ile karşılaştırılmış özgün öğretim ve sorular. Kesit gerçek taşkın tahmini, güvenlik veya kayıp hesabı değildir."
  }
];
export const forge019GeographyTopics:Record<string,string>=Object.fromEntries(data.map(d=>[d.id,d.topic]));
export const forge019GeographyGuides:LessonGuide[]=data.map(({items:_i,topic:_p,title:_t,...d})=>d);
function question019(d:Unit019,item:Unit019['items'][number],i:number):Question{const[prompt,correct,wrong,hint,explanation]=item,answer=(i*3+1)%5,options=[...wrong];options.splice(answer,0,correct);return{id:`f019-geo-${d.id}-${i+1}`,prompt:txt(prompt),options:options.map(txt),answer,hint:txt(hint),explanation:txt(explanation),skill:`f019-geo-${d.id}-${i+1}`};}
export const forge019GeographyLessons:Lesson[]=data.map(d=>({id:d.id,subjectId:'tyt-cografya',title:txt(d.title),minutes:d.minutes,objectives:d.objectives.map(txt),body:d.sections.map(s=>({title:txt(s.title),text:txt(s.paragraphs.join(' '))})),questions:d.items.map((q,i)=>question019(d,q,i)),source:txt(d.source),tags:['kaynakli','etkilesimli','forge019']}));
