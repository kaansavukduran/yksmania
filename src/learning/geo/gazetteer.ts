/*
 * Place gazetteer for automatic "where did it happen?" maps. When a theory
 * page names one of these places, the page shows it on a world map and on a
 * regional close-up. Only unambiguous proper names are listed; a place whose
 * exact site is debated carries `approx` and the map says so. Coordinates are
 * decimal degrees (latitude, longitude) of the commonly cited site.
 */

export type PlaceKind = "savaş" | "afet" | "düşünce" | "antlaşma" | "uygarlık";
export interface Place {
  id: string;
  label: string;
  kind: PlaceKind;
  lat: number;
  lon: number;
  /** Forms that may appear in the text (matched with Turkish suffixes). */
  names: string[];
  approx?: boolean;
}

export const places: Place[] = [
  // Savaşlar ve kuşatmalar
  { id: "talas", label: "Talas Savaşı (751)", kind: "savaş", lat: 42.52, lon: 72.24, names: ["Talas Savaşı", "Talas Muharebesi"], approx: true },
  { id: "dandanakan", label: "Dandanakan Savaşı (1040)", kind: "savaş", lat: 37.4, lon: 62.0, names: ["Dandanakan"], approx: true },
  { id: "pasinler", label: "Pasinler Savaşı (1048)", kind: "savaş", lat: 39.98, lon: 41.68, names: ["Pasinler"] },
  { id: "malazgirt", label: "Malazgirt Savaşı (1071)", kind: "savaş", lat: 39.14, lon: 42.54, names: ["Malazgirt"] },
  { id: "miryokefalon", label: "Miryokefalon Savaşı (1176)", kind: "savaş", lat: 38.0, lon: 30.8, names: ["Miryokefalon"], approx: true },
  { id: "yassicemen", label: "Yassıçemen Savaşı (1230)", kind: "savaş", lat: 39.75, lon: 39.5, names: ["Yassıçemen"], approx: true },
  { id: "kosedag", label: "Kösedağ Savaşı (1243)", kind: "savaş", lat: 40.17, lon: 38.09, names: ["Kösedağ"], approx: true },
  { id: "kerbela", label: "Kerbela (680)", kind: "savaş", lat: 32.62, lon: 44.03, names: ["Kerbela"] },
  { id: "kosova", label: "Kosova Savaşı (1389)", kind: "savaş", lat: 42.66, lon: 21.08, names: ["Kosova Savaşı", "I. Kosova", "Birinci Kosova"] },
  { id: "nigbolu", label: "Niğbolu Savaşı (1396)", kind: "savaş", lat: 43.71, lon: 24.9, names: ["Niğbolu"] },
  { id: "ankara1402", label: "Ankara Savaşı (1402)", kind: "savaş", lat: 40.24, lon: 33.03, names: ["Ankara Savaşı"] },
  { id: "varna", label: "Varna Savaşı (1444)", kind: "savaş", lat: 43.21, lon: 27.91, names: ["Varna Savaşı"] },
  { id: "istanbul1453", label: "İstanbul'un fethi (1453)", kind: "savaş", lat: 41.01, lon: 28.98, names: ["İstanbul’un fethi", "İstanbul'un fethi", "İstanbul’un Fethi", "İstanbul'un Fethi"] },
  { id: "otlukbeli", label: "Otlukbeli Savaşı (1473)", kind: "savaş", lat: 39.95, lon: 39.75, names: ["Otlukbeli"], approx: true },
  { id: "caldiran", label: "Çaldıran Savaşı (1514)", kind: "savaş", lat: 39.14, lon: 43.91, names: ["Çaldıran"] },
  { id: "mercidabik", label: "Mercidabık Savaşı (1516)", kind: "savaş", lat: 36.53, lon: 37.22, names: ["Mercidabık"] },
  { id: "ridaniye", label: "Ridaniye Savaşı (1517)", kind: "savaş", lat: 30.05, lon: 31.3, names: ["Ridaniye"] },
  { id: "mohac", label: "Mohaç Savaşı (1526)", kind: "savaş", lat: 45.99, lon: 18.68, names: ["Mohaç"] },
  { id: "viyana", label: "Viyana", kind: "antlaşma", lat: 48.21, lon: 16.37, names: ["Viyana"] },
  { id: "preveze", label: "Preveze Deniz Savaşı (1538)", kind: "savaş", lat: 38.96, lon: 20.75, names: ["Preveze"] },
  { id: "inebahti", label: "İnebahtı Deniz Savaşı (1571)", kind: "savaş", lat: 38.39, lon: 21.83, names: ["İnebahtı"] },
  { id: "canakkale", label: "Çanakkale Cephesi (1915)", kind: "savaş", lat: 40.15, lon: 26.4, names: ["Çanakkale Cephesi", "Çanakkale Savaşı", "Çanakkale Savaşları"] },
  { id: "sarikamis", label: "Sarıkamış", kind: "savaş", lat: 40.33, lon: 42.59, names: ["Sarıkamış"] },
  { id: "kut", label: "Kût'ül-Amâre (1916)", kind: "savaş", lat: 32.51, lon: 45.83, names: ["Kut’ül Amare", "Kut'ül Amare", "Kûtü’l-Amâre", "Kutülamare"] },
  { id: "inonu", label: "İnönü Muharebeleri (1921)", kind: "savaş", lat: 39.82, lon: 30.15, names: ["İnönü Muharebe", "İnönü Savaş", "I. İnönü", "II. İnönü"] },
  { id: "sakarya", label: "Sakarya Meydan Muharebesi (1921)", kind: "savaş", lat: 39.58, lon: 31.98, names: ["Sakarya Meydan Muharebesi", "Sakarya Savaşı"] },
  { id: "dumlupinar", label: "Büyük Taarruz / Dumlupınar (1922)", kind: "savaş", lat: 38.85, lon: 30.0, names: ["Dumlupınar", "Büyük Taarruz"] },
  { id: "hirosima", label: "Hiroşima (1945)", kind: "savaş", lat: 34.39, lon: 132.45, names: ["Hiroşima"] },
  { id: "nagazaki", label: "Nagazaki (1945)", kind: "savaş", lat: 32.75, lon: 129.88, names: ["Nagazaki"] },
  // İslam tarihi
  { id: "mekke", label: "Mekke", kind: "uygarlık", lat: 21.42, lon: 39.83, names: ["Mekke"] },
  { id: "medine", label: "Medine", kind: "uygarlık", lat: 24.47, lon: 39.61, names: ["Medine", "Yesrib"] },
  { id: "bedir", label: "Bedir Savaşı (624)", kind: "savaş", lat: 23.73, lon: 38.79, names: ["Bedir"] },
  { id: "uhud", label: "Uhud Savaşı (625)", kind: "savaş", lat: 24.5, lon: 39.61, names: ["Uhud"] },
  { id: "hendek", label: "Hendek Savaşı (627, Medine savunması)", kind: "savaş", lat: 24.48, lon: 39.59, names: ["Hendek Savaşı", "Hendek Gazvesi", "627 Hendek"] },
  { id: "hudeybiye", label: "Hudeybiye Antlaşması (628)", kind: "antlaşma", lat: 21.44, lon: 39.62, names: ["Hudeybiye"], approx: true },
  { id: "hayber", label: "Hayber (628)", kind: "savaş", lat: 25.7, lon: 39.29, names: ["Hayber"] },
  { id: "taif", label: "Taif", kind: "uygarlık", lat: 21.27, lon: 40.42, names: ["Taif"] },
  { id: "mute", label: "Mute Savaşı (629)", kind: "savaş", lat: 31.07, lon: 35.7, names: ["Mute"], approx: true },
  { id: "kudus", label: "Kudüs", kind: "uygarlık", lat: 31.78, lon: 35.23, names: ["Kudüs"] },
  { id: "yermuk", label: "Yermük Savaşı (636)", kind: "savaş", lat: 32.8, lon: 35.95, names: ["Yermük", "Yermuk"], approx: true },
  { id: "kadisiye", label: "Kadisiye Savaşı (636)", kind: "savaş", lat: 31.9, lon: 44.4, names: ["Kadisiye"], approx: true },
  { id: "habesistan", label: "Habeşistan (Aksum)", kind: "uygarlık", lat: 14.13, lon: 38.72, names: ["Habeşistan"], approx: true },
  // Antlaşmalar, kongreler, genelgeler
  { id: "amasya", label: "Amasya Genelgesi (1919)", kind: "antlaşma", lat: 40.65, lon: 35.83, names: ["Amasya Genelgesi"] },
  { id: "erzurumk", label: "Erzurum Kongresi (1919)", kind: "antlaşma", lat: 39.9, lon: 41.27, names: ["Erzurum Kongresi"] },
  { id: "sivask", label: "Sivas Kongresi (1919)", kind: "antlaşma", lat: 39.75, lon: 37.02, names: ["Sivas Kongresi"] },
  { id: "mondros", label: "Mondros Ateşkesi (1918)", kind: "antlaşma", lat: 39.87, lon: 25.27, names: ["Mondros"] },
  { id: "sevr", label: "Sevr Antlaşması (1920)", kind: "antlaşma", lat: 48.82, lon: 2.21, names: ["Sevr"] },
  { id: "mudanya", label: "Mudanya Ateşkesi (1922)", kind: "antlaşma", lat: 40.38, lon: 28.88, names: ["Mudanya"] },
  { id: "lozan", label: "Lozan (Lausanne)", kind: "antlaşma", lat: 46.52, lon: 6.63, names: ["Lozan"] },
  { id: "montro", label: "Montrö Boğazlar Sözleşmesi (1936)", kind: "antlaşma", lat: 46.43, lon: 6.91, names: ["Montrö"] },
  // Depremler
  { id: "erzincan1939", label: "Erzincan depremi (1939)", kind: "afet", lat: 39.77, lon: 39.53, names: ["Erzincan depremi", "1939 Erzincan"] },
  { id: "golcuk1999", label: "Gölcük merkezli depremi (1999)", kind: "afet", lat: 40.76, lon: 29.97, names: ["Gölcük merkezli", "1999 Marmara", "17 Ağustos 1999", "Marmara depremi", "İzmit depremi"] },
  { id: "van2011", label: "Van depremi (2011)", kind: "afet", lat: 38.69, lon: 43.47, names: ["Van depremi", "2011 Van"] },
  { id: "izmir2020", label: "İzmir (Sisam açıkları) depremi (2020)", kind: "afet", lat: 37.9, lon: 26.79, names: ["2020 İzmir", "İzmir depremi"] },
  { id: "pazarcik2023", label: "Pazarcık merkezli deprem (6 Şubat 2023)", kind: "afet", lat: 37.23, lon: 37.04, names: ["Pazarcık", "Kahramanmaraş merkezli", "6 Şubat 2023"] },
  { id: "elbistan2023", label: "Elbistan merkezli deprem (6 Şubat 2023)", kind: "afet", lat: 38.02, lon: 37.2, names: ["Elbistan merkezli"] },
  { id: "cernobil", label: "Çernobil (1986)", kind: "afet", lat: 51.27, lon: 30.22, names: ["Çernobil"] },
  { id: "fukusima", label: "Fukuşima (2011)", kind: "afet", lat: 37.42, lon: 141.03, names: ["Fukuşima"] },
  // Düşünce, bilim ve sanat merkezleri
  { id: "miletos", label: "Miletos (Thales, Anaksimandros, Anaksimenes)", kind: "düşünce", lat: 37.53, lon: 27.28, names: ["Miletos", "Milet", "Thales", "Anaksimandros", "Anaksimenes"] },
  { id: "efes", label: "Efes (Herakleitos)", kind: "düşünce", lat: 37.94, lon: 27.34, names: ["Efes", "Ephesos", "Herakleitos"] },
  { id: "samos", label: "Samos / Sisam (Pythagoras)", kind: "düşünce", lat: 37.75, lon: 26.97, names: ["Samos", "Sisam", "Pythagoras"] },
  { id: "klazomenai", label: "Klazomenai (Anaksagoras)", kind: "düşünce", lat: 38.36, lon: 26.77, names: ["Klazomenai", "Anaksagoras"] },
  { id: "elea", label: "Elea (Parmenides, Zenon)", kind: "düşünce", lat: 40.16, lon: 15.15, names: ["Elea", "Parmenides", "Elealı Zenon"] },
  { id: "abdera", label: "Abdera (Demokritos, Protagoras)", kind: "düşünce", lat: 40.94, lon: 24.97, names: ["Abdera", "Demokritos", "Protagoras"] },
  { id: "atina", label: "Atina (Sokrates, Platon, Aristoteles'in okulu)", kind: "düşünce", lat: 37.98, lon: 23.73, names: ["Atina", "Sokrates", "Platon", "Epikuros"] },
  { id: "stagira", label: "Stagira (Aristoteles'in doğduğu yer)", kind: "düşünce", lat: 40.59, lon: 23.79, names: ["Stagira", "Aristoteles"] },
  { id: "iskenderiye", label: "İskenderiye", kind: "düşünce", lat: 31.2, lon: 29.92, names: ["İskenderiye"] },
  { id: "bagdat", label: "Bağdat", kind: "düşünce", lat: 33.31, lon: 44.36, names: ["Bağdat", "Beytülhikme", "Beyt'ül Hikme"] },
  { id: "buhara", label: "Buhara (İbn Sina)", kind: "düşünce", lat: 39.77, lon: 64.42, names: ["Buhara", "İbn Sina", "İbn Sînâ"] },
  { id: "farab", label: "Farab / Otrar (Farabi)", kind: "düşünce", lat: 42.85, lon: 68.3, names: ["Farab", "Otrar", "Farabi", "Fârâbî"], approx: true },
  { id: "kurtuba", label: "Kurtuba (İbn Rüşd)", kind: "düşünce", lat: 37.88, lon: -4.78, names: ["Kurtuba", "Kordoba", "İbn Rüşd"] },
  { id: "semerkant", label: "Semerkant", kind: "düşünce", lat: 39.65, lon: 66.97, names: ["Semerkant", "Uluğ Bey"] },
  { id: "floransa", label: "Floransa (Rönesans)", kind: "düşünce", lat: 43.77, lon: 11.26, names: ["Floransa"] },
  { id: "wittenberg", label: "Wittenberg (Reform)", kind: "düşünce", lat: 51.87, lon: 12.65, names: ["Wittenberg"] },
  { id: "konigsberg", label: "Königsberg (Kant)", kind: "düşünce", lat: 54.71, lon: 20.51, names: ["Königsberg", "Kant"] },
  { id: "tus", label: "Tus (Gazâlî)", kind: "düşünce", lat: 36.48, lon: 59.52, names: ["Gazali", "Gazâlî"] },
  { id: "konya", label: "Konya (Mevlânâ)", kind: "düşünce", lat: 37.87, lon: 32.49, names: ["Mevlânâ", "Mevlana"] },
  { id: "hacibektas", label: "Hacıbektaş", kind: "düşünce", lat: 38.94, lon: 34.56, names: ["Hacı Bektaş"] },
  { id: "cizre", label: "Cizre (el-Cezerî)", kind: "düşünce", lat: 37.33, lon: 42.19, names: ["Cezerî", "Cezeri"] },
  { id: "pisa", label: "Pisa (Galileo)", kind: "düşünce", lat: 43.72, lon: 10.4, names: ["Galileo"] },
  { id: "amsterdam", label: "Amsterdam (Spinoza)", kind: "düşünce", lat: 52.37, lon: 4.9, names: ["Spinoza"] },
  { id: "edinburgh", label: "Edinburgh (Hume)", kind: "düşünce", lat: 55.95, lon: -3.19, names: ["Hume"] },
  { id: "cenevre", label: "Cenevre (Rousseau)", kind: "düşünce", lat: 46.2, lon: 6.15, names: ["Rousseau", "Cenevre"] },
  { id: "paris", label: "Paris", kind: "antlaşma", lat: 48.86, lon: 2.35, names: ["Paris"] },
  // Uygarlıklar ve tarihî kentler
  { id: "gobeklitepe", label: "Göbeklitepe", kind: "uygarlık", lat: 37.22, lon: 38.92, names: ["Göbeklitepe", "Göbekli Tepe"] },
  { id: "catalhoyuk", label: "Çatalhöyük", kind: "uygarlık", lat: 37.67, lon: 32.83, names: ["Çatalhöyük"] },
  { id: "hattusa", label: "Hattuşa (Hitit başkenti)", kind: "uygarlık", lat: 40.02, lon: 34.62, names: ["Hattuşa", "Hattuşaş"] },
  { id: "truva", label: "Truva", kind: "uygarlık", lat: 39.96, lon: 26.24, names: ["Truva", "Troya"] },
  { id: "sardes", label: "Sardes (Lidya başkenti)", kind: "uygarlık", lat: 38.49, lon: 28.04, names: ["Sardes"] },
  { id: "gordion", label: "Gordion (Frig başkenti)", kind: "uygarlık", lat: 39.65, lon: 31.98, names: ["Gordion"] },
  { id: "ur", label: "Ur (Sümer kenti)", kind: "uygarlık", lat: 30.96, lon: 46.1, names: ["Sümer", "Sümerler"] },
  { id: "babil", label: "Babil", kind: "uygarlık", lat: 32.54, lon: 44.42, names: ["Babil"] },
  { id: "orhun", label: "Orhun Yazıtları", kind: "uygarlık", lat: 47.56, lon: 102.83, names: ["Orhun"] },
  { id: "otuken", label: "Ötüken", kind: "uygarlık", lat: 47.5, lon: 101.5, names: ["Ötüken"], approx: true },
  { id: "karakurum", label: "Karakurum", kind: "uygarlık", lat: 47.2, lon: 102.82, names: ["Karakurum"] },
  { id: "kasgar", label: "Kaşgar", kind: "uygarlık", lat: 39.47, lon: 75.99, names: ["Kaşgar", "Kaşgarlı Mahmud"] },
  { id: "balasagun", label: "Balasagun", kind: "uygarlık", lat: 42.75, lon: 75.25, names: ["Balasagun", "Yusuf Has Hacib"], approx: true },
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// A name may be followed by an apostrophe suffix (Malazgirt’te) or an
// adjectival -lı/-li/-lu/-lü (Miletoslu), but never by other letters, so a
// name never matches inside a longer word ("Efes" ≠ "Efesane").
const SUFFIX = "(?:['’][\\p{L}]*|l[ıiuü](?:lar|ler)?)?(?![\\p{L}])";
const matchers = places.map((p) => ({
  place: p,
  re: new RegExp(`(?<![\\p{L}])(?:${p.names.map(escape).join("|")})${SUFFIX}`, "u"),
}));

/** Places named in a text, in the order of the gazetteer (at most eight). */
export function placesIn(text: string): Place[] {
  const found: Place[] = [];
  for (const m of matchers) if (m.re.test(text)) found.push(m.place);
  return found.slice(0, 8);
}
