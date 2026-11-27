import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Coğrafya derinleştirmesi (0.231): Dünya’nın şekli ve hareketleri,
 * coğrafi konum, harita bilgisi, atmosfer katmanları, nem ve yağış. Kabul
 * edilmiş rehber içeriği değişmez; tablo bölümü, iki özgün çözümlü örnek ve
 * bölüm çizimi görüntüleme katmanında eklenir. Öğle yüksekliği, yerel saat,
 * ölçek dönüşümleri, katman kalınlıkları ve bağıl nem kodda hesaplanır;
 * paragraflar, tablo hücreleri, çizim okumaları ve Kopya Kâğıdı özetleri aynı
 * dışa aktarılmış verilerden gelir. Genel yargıları modül yüklenirken
 * korumalar denetler.
 */

const guard = (ok: boolean, message: string) => {
  if (!ok) throw new Error(`depth231: ${message}`);
};

/** Türkçe ondalık virgül, binlik nokta, eksi için “−”. */
export const num231 = (x: number, digits = 1) => {
  const r = Number(x.toFixed(digits));
  const s = Math.abs(r).toLocaleString("tr-TR", { maximumFractionDigits: digits });
  return r < 0 && !Object.is(r, -0) ? `−${s}` : s;
};
const deg = (x: number) => `${num231(x)}°`;

/* ======================================================================
 * 1. Dünya’nın şekli ve hareketleri: 21 Haziran’da sekiz enlem
 * ==================================================================== */

/** Dersin model değeri: eksen eğikliği 23,5° (kaynaklardaki 23°27′ yuvarlatılmış). */
export const tilt231 = 23.5;
/** Dersin yaklaşık tarihleri ve dik ışının enlemi (deklinasyon, kuzey +). */
export const declinations231 = [
  { date: "21 Mart", decl: 0 },
  { date: "21 Haziran", decl: tilt231 },
  { date: "23 Eylül", decl: 0 },
  { date: "21 Aralık", decl: -tilt231 },
] as const;
const declOf = (date: string) => declinations231.find((d) => d.date === date)!.decl;
/** Enlemi yönüyle yazar: 40 → “40° K”, −23,5 → “23,5° G”, 0 → “0° (Ekvator)”. */
export const latText231 = (phi: number) => (phi === 0 ? "0° (Ekvator)" : `${deg(Math.abs(phi))} ${phi > 0 ? "K" : "G"}`);
/** İdeal yerel öğle yüksekliği h = 90° − |φ − δ|; onda bir derece biriminde tam sayı hesap. */
export const noonHeight231 = (phi: number, decl: number) => (900 - Math.abs(Math.round(phi * 10) - Math.round(decl * 10))) / 10;
/** İdeal modelde (kırılmasız, noktasal Güneş) gündüz süresi saat: cos H₀ = −tan φ · tan δ. */
export const dayHours231 = (phi: number, decl: number) => {
  const c = -Math.tan((phi * Math.PI) / 180) * Math.tan((decl * Math.PI) / 180);
  if (c <= -1) return 24;
  if (c >= 1) return 0;
  return (2 * ((Math.acos(c) * 180) / Math.PI)) / 15;
};
export type Sun231 = "güneyde" | "başucunda" | "kuzeyde" | "ufuk altında";
export interface Latitude231 {
  phi: number;
  h: number;
  sun: Sun231;
  shadow: string;
  day: string;
  hours: number;
}
const sunSide = (phi: number, decl: number, h: number): Sun231 => (h <= 0 ? "ufuk altında" : decl > phi ? "kuzeyde" : decl < phi ? "güneyde" : "başucunda");
const shadowOf = (sun: Sun231) =>
  sun === "güneyde" ? "kuzeye düşer" : sun === "kuzeyde" ? "güneye düşer" : sun === "başucunda" ? "oluşmaz (dik ışın)" : "oluşmaz (Güneş ufuk altında)";
const dayOf = (phi: number, decl: number) => {
  const polar = 90 - Math.abs(decl);
  if (phi === 0 || decl === 0) return "12 saat";
  if (Math.sign(phi) === Math.sign(decl)) return Math.abs(phi) >= polar ? "24 saat (kutup gündüzü)" : "12 saatten uzun";
  return Math.abs(phi) >= polar ? "0 saat (kutup gecesi)" : "12 saatten kısa";
};
export const latitudeRow231 = (phi: number, decl: number): Latitude231 => {
  const h = noonHeight231(phi, decl);
  const sun = sunSide(phi, decl, h);
  return { phi, h, sun, shadow: shadowOf(sun), day: dayOf(phi, decl), hours: dayHours231(phi, decl) };
};
export const juneDecl231 = declOf("21 Haziran");
export const latitudes231 = [80, 60, 40, 23.5, 0, -23.5, -40, -80] as const;
export const juneRows231: readonly Latitude231[] = latitudes231.map((phi) => latitudeRow231(phi, juneDecl231));
const juneRow = (phi: number) => juneRows231.find((r) => r.phi === phi)!;
const zenithRows = juneRows231.filter((r) => r.sun === "başucunda");
{
  guard(juneRows231.length <= 8, "tablo en çok sekiz satır olmalı");
  // Başucu yalnız dik ışının enleminde: 23,5° K.
  guard(zenithRows.length === 1 && zenithRows[0].phi === juneDecl231 && zenithRows[0].h === 90, "başucu yalnız Yengeç Dönencesi satırında olmalı");
  // Dik ışının kuzeyinde Güneş güneyde, güneyinde kuzeyde görülür; gölge ters yöne düşer.
  for (const r of juneRows231) {
    if (r.h <= 0) continue;
    guard(r.phi > juneDecl231 ? r.sun === "güneyde" : r.phi < juneDecl231 ? r.sun === "kuzeyde" : true, `${r.phi}: Güneş yönü dik ışına göre olmalı`);
  }
  // h, dik ışından uzaklık arttıkça azalır.
  const byDistance = [...juneRows231].sort((a, b) => Math.abs(a.phi - juneDecl231) - Math.abs(b.phi - juneDecl231));
  guard(byDistance.every((r, i) => i === 0 || r.h < byDistance[i - 1].h), "öğle yüksekliği dik ışından uzaklaştıkça azalmalı");
  // İdeal gündüz süresi kuzeye gidildikçe uzar; nitel sınıf formülle uyuşur.
  const north = [...juneRows231].reverse();
  guard(north.every((r, i) => i === 0 || r.hours >= north[i - 1].hours), "21 Haziran’da gündüz kuzeye doğru uzamalı");
  for (const r of juneRows231) {
    const want = r.hours >= 24 ? "24 saat (kutup gündüzü)" : r.hours <= 0 ? "0 saat (kutup gecesi)" : Math.abs(r.hours - 12) < 1e-9 ? "12 saat" : r.hours > 12 ? "12 saatten uzun" : "12 saatten kısa";
    guard(r.day === want, `${r.phi}: gündüz sınıfı formülle uyuşmalı`);
  }
  // Ekvator’a göre simetrik enlemler arasında fark 2 × eğiklik.
  for (const p of [80, 40, 23.5]) guard(juneRow(p).h - juneRow(-p).h === 2 * tilt231, `${p}: simetrik fark 47° olmalı`);
  guard(juneRow(-80).h < 0 && juneRow(-80).day.startsWith("0 saat"), "80° G kutup gecesinde olmalı");
}
const above = juneRows231.filter((r) => r.phi > juneDecl231);
const below = juneRows231.filter((r) => r.phi < juneDecl231 && r.h > 0);
const eq = juneRow(0);

const juneTable = {
  layout: "table" as const,
  headers: ["Enlem φ", `h = 90° − |φ − ${deg(juneDecl231)}|`, "Öğle Güneşi", "Dik çubuğun öğle gölgesi", "Gündüz (ideal model)"],
  rows: juneRows231.map((r) => [latText231(r.phi), deg(r.h), r.sun, r.shadow, r.day]),
};

export const juneSection231: GuideSection = {
  title: "21 Haziran’da sekiz enlem: öğle açısı, gölge ve gündüz",
  paragraphs: [
    `21 Haziran’da öğle dik ışını ${latText231(juneDecl231)} enlemine, Yengeç Dönencesi’ne ulaşır; ders modelinde eğiklik ${deg(tilt231)} alınır (kaynaklardaki 23°27′ değerinin yuvarlatılmışı). Tablonun her satırı h = 90° − |φ − ${deg(juneDecl231)}| ile hesaplanır: kuzey artı, güney eksi. h = 90° yalnız ${latText231(zenithRows[0].phi)} satırındadır; bu satırdan kuzeye ya da güneye uzaklaştıkça öğle yüksekliği azalır.`,
    `Dik ışının kuzeyindeki ${above.map((r) => latText231(r.phi)).join(", ")} satırlarında öğle Güneşi güneyde, gölge kuzeye düşer. Güneyindeki ${below.map((r) => latText231(r.phi)).join(", ")} satırlarında Güneş kuzeyde, gölge güneye düşer. ${latText231(-80)} enleminde h = ${deg(juneRow(-80).h)} çıkar: Güneş öğlede bile ufkun altındadır, görünür gölge hesaplanmaz.`,
    `Gündüz süresi bu tarihte kuzeye gidildikçe uzar: Ekvator’da ${eq.day}, kuzey yarım kürede 12 saatten uzun, ${deg(90 - tilt231)} K kutup dairesi ve ötesinde 24 saattir; güney yarım kürede kısalır ve ${deg(90 - tilt231)} G ötesinde kutup gecesi yaşanır. Ekvator’a göre simetrik iki enlemin öğle yükseklikleri arasındaki fark ${deg(juneRow(40).h)} − ${deg(juneRow(-40).h)} = ${deg(2 * tilt231)}, yani 2 × ${deg(tilt231)}’dir.`,
  ],
  table: juneTable,
  figureTitle: "21 Haziran’da sekiz enlem: öğle açısı, gölge ve gündüz",
};

/** Örnek 1: 40° K’nin iki gündönümü. */
export const solstice231 = (() => {
  const phi = 40;
  const june = latitudeRow231(phi, declOf("21 Haziran"));
  const dec = latitudeRow231(phi, declOf("21 Aralık"));
  const mirror = juneRow(-phi);
  return { phi, june, dec, mirror, diff: june.h - dec.h };
})();
/** Örnek 2: öğle yüksekliğinden enlem, sonra 23 Eylül. */
export const findLatitude231 = (() => {
  const h = 53.5;
  const decl = juneDecl231;
  const zenithDistance = 90 - h;
  const phi = decl + zenithDistance; // Güneş güneyde → gözlemci dik ışının kuzeyinde
  const rejected = decl - zenithDistance; // bu enlemde Güneş kuzeyde görülürdü
  const sept = latitudeRow231(phi, declOf("23 Eylül"));
  return { h, decl, zenithDistance, phi, rejected, rejectedSun: latitudeRow231(rejected, decl).sun, sept };
})();
{
  const s = solstice231;
  guard(s.dec.h === s.mirror.h, "40° K’nin Aralık yüksekliği 40° G’nin Haziran yüksekliğine eşit olmalı");
  guard(s.diff === 2 * tilt231, "dönence dışında yıllık öğle farkı 2 × eğiklik olmalı");
  const f = findLatitude231;
  guard(latitudeRow231(f.phi, f.decl).h === f.h && latitudeRow231(f.phi, f.decl).sun === "güneyde", "bulunan enlem verilen h ve yönü vermeli");
  guard(f.rejectedSun === "kuzeyde", "öteki aday enlemde Güneş kuzeyde olmalı");
  guard(juneRows231.some((r) => r.phi === f.phi), "örnek enlemi tabloda olmalı");
  guard(f.sept.day === "12 saat", "ekinoksta ideal gündüz 12 saat olmalı");
}
const sl = solstice231;
const fl = findLatitude231;

export const juneExamples231: WorkedExample[] = [
  {
    title: "40° K’nin iki gündönümü ve ayna satırı",
    prompt: `Bir gözlemci ${latText231(sl.phi)} enlemindedir. İdeal modelde dik ışın 21 Haziran’da ${latText231(juneDecl231)}, 21 Aralık’ta ${latText231(declOf("21 Aralık"))} enlemine gelir (eğiklik ${deg(tilt231)}). İki tarihteki öğle yüksekliğini bul; 21 Aralık değeri 21 Haziran tablosunda hangi enlemin değerine eşittir? İki tarih arasındaki fark kaç derecedir?`,
    strategy: "Her tarih için h = 90° − |φ − δ| uygula; kuzeyi artı, güneyi eksi yaz. Sonra Ekvator’a göre ayna enlemi tabloda ara.",
    steps: [
      { label: "21 Haziran", expression: `90° − |${num231(sl.phi)} − ${num231(juneDecl231)}| = ${deg(sl.june.h)}`, explanation: `Güneş ${sl.june.sun}, gölge ${sl.june.shadow}; gündüz ${sl.june.day}.` },
      { label: "21 Aralık", expression: `90° − |${num231(sl.phi)} − (${num231(declOf("21 Aralık"))})| = ${deg(sl.dec.h)}`, explanation: `Güneş yine ${sl.dec.sun}, gölge ${sl.dec.shadow}; gündüz ${sl.dec.day}.` },
      { label: "Ayna", expression: `${latText231(-sl.phi)}, 21 Haziran → ${deg(sl.mirror.h)}`, explanation: "Tarih ve yarım küre birlikte yer değiştirince dik ışına uzaklık aynı kalır." },
      { label: "Fark", expression: `${deg(sl.june.h)} − ${deg(sl.dec.h)} = ${deg(sl.diff)} = 2 × ${deg(tilt231)}`, explanation: "Dönencelerin dışında yıllık öğle farkı iki eğiklik kadardır." },
    ],
    answer: `21 Haziran’da ${deg(sl.june.h)}, 21 Aralık’ta ${deg(sl.dec.h)}; Aralık değeri tablodaki ${latText231(-sl.phi)} satırına eşittir. Fark ${deg(sl.diff)}.`,
    check: `Dik ışına uzaklık Haziran’da ${deg(Math.abs(sl.phi - juneDecl231))}, Aralık’ta ${deg(Math.abs(sl.phi - declOf("21 Aralık")))}; farkları da ${deg(sl.diff)} eder.`,
    pitfall: "Aralık’ta deklinasyonun işaretini unutup |40 − 23,5| yazarak iki tarihe aynı açıyı vermek.",
  },
  {
    title: "Öğle açısından enlemi bul, ekinoksa taşı",
    prompt: `İdeal modelde 21 Haziran’da (dik ışın ${latText231(juneDecl231)}) bir yerde öğle yüksekliği ${deg(fl.h)} ölçülüyor; Güneş güneyde, dik çubuğun gölgesi kuzeye düşüyor. Bu yerin enlemi nedir? Aynı yerde 23 Eylül’de (dik ışın Ekvator’da) öğle yüksekliği ve ideal gündüz süresi ne olur?`,
    strategy: "Önce dik ışına olan uzaklığı 90° − h ile bul; Güneş’in yönü gözlemcinin dik ışının hangi tarafında olduğunu seçer.",
    steps: [
      { label: "Uzaklık", expression: `90° − ${deg(fl.h)} = ${deg(fl.zenithDistance)}`, explanation: "Gözlemci dik ışın enleminden bu kadar uzaktadır." },
      { label: "Yön", expression: `${num231(fl.decl)} + ${num231(fl.zenithDistance)} = ${num231(fl.phi)}`, explanation: `Güneş güneyde görüldüğü için gözlemci dik ışının kuzeyindedir; ${num231(fl.decl)} − ${num231(fl.zenithDistance)} = ${num231(fl.rejected)} adayında Güneş ${fl.rejectedSun} görülürdü.` },
      { label: "23 Eylül", expression: `90° − |${num231(fl.phi)} − 0| = ${deg(fl.sept.h)}`, explanation: `Ekinoksta dik ışın Ekvator’dadır; ideal modelde gündüz ${fl.sept.day}.` },
    ],
    answer: `Enlem ${latText231(fl.phi)}. 23 Eylül’de öğle yüksekliği ${deg(fl.sept.h)}, ideal gündüz ${fl.sept.day}.`,
    check: `Tablodaki ${latText231(fl.phi)} satırı 21 Haziran için ${deg(juneRow(fl.phi).h)} ve “${juneRow(fl.phi).sun}” verir; ölçümle aynıdır.`,
    pitfall: "Güneş’in yönünü kullanmadan iki aday enlemden birini rastgele seçmek.",
  },
];

export const juneSupplement231 = {
  title: juneSection231.title,
  figureTitle: juneSection231.title,
  paragraphs: juneSection231.paragraphs,
  summary: `21 Haziran: δ = ${latText231(juneDecl231)}, h = 90° − |φ − δ|. Başucu yalnız ${latText231(juneDecl231)}; kuzeyinde Güneş güneyde (gölge kuzeye), güneyinde kuzeyde. Gündüz kuzeye doğru uzar: Ekvator 12 saat, ${deg(90 - tilt231)} K ötesi 24 saat, ${deg(90 - tilt231)} G ötesi kutup gecesi. Simetrik enlemler arası fark 2 × ${deg(tilt231)} = ${deg(2 * tilt231)}.`,
  appendSection: true as const,
  table: juneTable,
  examples: juneExamples231,
};

/* ======================================================================
 * 2. Coğrafi konum: aynı an, yedi meridyende yerel Güneş saati
 * ==================================================================== */

/** Dersin ders yaklaşımı: 1° boylam = 4 dakika (360° / 24 saat). */
export const minutesPerDegree231 = 4;
/** Boylamı yönüyle yazar: 45 → “45° D”, −15 → “15° B”, 0 → “0° (Greenwich)”. */
export const lonText231 = (lon: number) => (lon === 0 ? "0° (Greenwich)" : `${Math.abs(lon)}° ${lon > 0 ? "D" : "B"}`);
/** Dakikayı saat.dakika olarak yazar (ör. 1300 → 21.40); gün taşmasını ayrıca döndürür. */
export const clock231 = (minutes: number) => {
  const day = Math.floor(minutes / 1440);
  const m = minutes - day * 1440;
  return { day, text: `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}` };
};
const durationText = (min: number) => {
  const a = Math.abs(min);
  const h = Math.floor(a / 60);
  const m = a % 60;
  return [h ? `${h} sa` : "", m ? `${m} dk` : "", !h && !m ? "0 dk" : ""].filter(Boolean).join(" ");
};
const dayText = (d: number) => (d === 0 ? "aynı gün" : d === 1 ? "ertesi gün" : d === -1 ? "önceki gün" : `${d} gün`);
/** Karşılaştırma meridyeni: 30° D’de yerel Güneş saati 21.40 (Greenwich başlangıç meridyeniyle karıştırılmaz). */
export const reference231 = { lon: 30, minutes: 21 * 60 + 40 } as const;
export interface Meridian231 {
  lon: number;
  diff: number;
  minutes: number;
  local: number;
  clock: string;
  day: number;
}
export const meridianRow231 = (lon: number): Meridian231 => {
  const diff = lon - reference231.lon;
  const minutes = diff * minutesPerDegree231;
  const local = reference231.minutes + minutes;
  const c = clock231(local);
  return { lon, diff, minutes, local, clock: c.text, day: c.day };
};
export const longitudes231 = [120, 45, 30, 26, 0, -15, -150] as const;
export const meridianRows231: readonly Meridian231[] = longitudes231.map(meridianRow231);
const merRow = (lon: number) => meridianRows231.find((r) => r.lon === lon)!;
/** Dersin Türkiye çerçevesi: yaklaşık 26–45° D. */
export const turkeyLon231 = { west: 26, east: 45 } as const;
const antiOf = (lon: number) => (lon > 0 ? lon - 180 : lon + 180);
const anti = merRow(antiOf(reference231.lon));
{
  guard(meridianRows231.length <= 8, "tablo en çok sekiz satır olmalı");
  // Doğudaki meridyenin yerel saati ileridedir: farkın işareti dakikanın işaretidir.
  for (const r of meridianRows231) guard(Math.sign(r.minutes) === Math.sign(r.diff) && r.minutes === r.diff * 4, `${r.lon}: doğu ileri olmalı`);
  guard(meridianRows231.every((r, i) => i === 0 || r.local < meridianRows231[i - 1].local), "doğudan batıya yerel saat geri gitmeli");
  guard(merRow(45).minutes === 60, "15° fark bir saat olmalı");
  guard(Math.abs(anti.minutes) === 720 && anti.lon === -150, "30° D’nin karşı meridyeni 150° B, fark 12 saat olmalı");
  guard(meridianRows231.some((r) => r.day === 1) && meridianRows231.every((r) => r.day >= 0), "doğuda gün taşması olmalı, batıda önceki güne düşülmemeli");
  guard((turkeyLon231.east - turkeyLon231.west) * minutesPerDegree231 === 76, "Türkiye’nin yerel saat genişliği 76 dakika olmalı");
  guard(merRow(turkeyLon231.east).local - merRow(turkeyLon231.west).local === 76, "tablodaki 45° D ile 26° D farkı 76 dakika olmalı");
}
const sign = (x: number) => (x > 0 ? `+${x}` : x < 0 ? `−${Math.abs(x)}` : "0");
const nextDay = meridianRows231.filter((r) => r.day === 1);

const meridianTable = {
  layout: "table" as const,
  headers: ["Boylam", `Fark (boylam − ${reference231.lon}°)`, "Zaman farkı (× 4 dk)", "Yerel Güneş saati", "Gün"],
  rows: meridianRows231.map((r) => [
    lonText231(r.lon), `${sign(r.diff)}°`, r.minutes === 0 ? "karşılaştırma" : `${r.minutes > 0 ? "+" : "−"}${durationText(r.minutes)}`, r.clock, dayText(r.day),
  ]),
};
const ref = clock231(reference231.minutes).text;

export const meridianSection231: GuideSection = {
  title: "Aynı an, yedi meridyen: yerel Güneş saatini işaretli farkla kur",
  paragraphs: [
    `Karşılaştırma meridyeni ${lonText231(reference231.lon)}, yerel Güneş saati ${ref}. Her satırda doğu boylamı artı, batı boylamı eksi yazılır; hedef boylamdan ${reference231.lon} çıkarılır ve fark ${minutesPerDegree231} dakikayla çarpılır. Fark artıysa hedef doğudadır ve saati ileridir; eksiyse batıdadır ve saati geridir. ${lonText231(45)} satırında 15° fark tam 1 saattir.`,
    `${nextDay.map((r) => lonText231(r.lon)).join(", ")} satırında saat 24.00’ü geçer: ${merRow(nextDay[0].lon).clock}, ${dayText(1)} olur. ${lonText231(anti.lon)} meridyeni, ${lonText231(reference231.lon)} meridyeninin karşı meridyenidir; işaretli fark ${sign(anti.diff)}°, yerel saat farkı ${durationText(anti.minutes)} çıkar ve gün değişmeden ${anti.clock} okunur.`,
    `Türkiye’nin yaklaşık ${turkeyLon231.west}–${turkeyLon231.east}° D çerçevesi tabloda iki satırdır: ${lonText231(turkeyLon231.east)} ile ${lonText231(turkeyLon231.west)} arasında ${turkeyLon231.east - turkeyLon231.west}° × ${minutesPerDegree231} = ${(turkeyLon231.east - turkeyLon231.west) * minutesPerDegree231} dakika yerel saat farkı vardır. Bu, yerel Güneş saatidir; ülkede ortak resmî saat (derslerdeki UTC+3 örneği) kullanıldığı için duvar saatleri bu kadar farklı değildir.`,
  ],
  table: meridianTable,
  figureTitle: "Aynı an, yedi meridyen: yerel Güneş saatini işaretli farkla kur",
};

/** Örnek 1: Türkiye’nin doğu ucunda yerel öğle. */
export const turkeyNoon231 = (() => {
  const eastMinutes = 12 * 60;
  const width = turkeyLon231.east - turkeyLon231.west;
  const gap = width * minutesPerDegree231;
  const west = clock231(eastMinutes - gap);
  return { eastMinutes, width, gap, west };
})();
/** Örnek 2: UTC ofsetleriyle uçuş; resmî saatler verildiği için boylam kullanılmaz. */
export const flight231 = (() => {
  const departOffset = 3;
  const arriveOffset = -2;
  const depart = 22 * 60 + 30;
  const duration = 5 * 60 + 50;
  const utcDepart = depart - departOffset * 60;
  const utcArrive = utcDepart + duration;
  const arrive = utcArrive + arriveOffset * 60;
  return { departOffset, arriveOffset, depart, duration, utcDepart, utcArrive, arrive, utcClock: clock231(utcArrive), arriveClock: clock231(arrive) };
})();
{
  guard(turkeyNoon231.gap === 76 && turkeyNoon231.west.text === "10.44" && turkeyNoon231.west.day === 0, "batı uçta 10.44 olmalı");
  const f = flight231;
  guard(f.arrive === f.depart + f.duration + (f.arriveOffset - f.departOffset) * 60, "varış = kalkış + süre + ofset farkı olmalı");
  guard(f.utcClock.day === 1 && f.arriveClock.day === 0, "UTC’de ertesi gün, varışta aynı gün olmalı");
}
const tn = turkeyNoon231;
const fx = flight231;
const utc = (o: number) => `UTC${o >= 0 ? "+" : "−"}${Math.abs(o)}`;

export const meridianExamples231: WorkedExample[] = [
  {
    title: "Doğu uçta öğle, batı uçta saat kaç?",
    prompt: `Türkiye derste yaklaşık ${turkeyLon231.west}–${turkeyLon231.east}° D boylamları arasında öğretilir. ${lonText231(turkeyLon231.east)} meridyeninde yerel Güneş saati 12.00 (yerel öğle) iken aynı anda ${lonText231(turkeyLon231.west)} meridyeninde yerel Güneş saati kaçtır? İki uçta resmî saat neden aynıdır? 1° boylam = ${minutesPerDegree231} dakika al.`,
    strategy: "İşaretli boylam farkını dakikaya çevir; batıya gidildiği için saatten çıkar. Resmî saati yerel Güneş saatinden ayrı kavram olarak ele al.",
    steps: [
      { label: "Fark", expression: `${turkeyLon231.west} − ${turkeyLon231.east} = −${tn.width}°`, explanation: "Hedef batıdadır; yerel saati geridir." },
      { label: "Dakika", expression: `${tn.width} × ${minutesPerDegree231} = ${tn.gap} dk = ${durationText(tn.gap)}`, explanation: "Her derece 4 dakikadır." },
      { label: "Saat", expression: `12.00 − ${durationText(tn.gap)} = ${tn.west.text}`, explanation: "Aynı gün içinde kalınır." },
      { label: "Resmî saat", explanation: "Ülke tek ortak saat (derslerdeki UTC+3 örneği) uygular; bu, boylamdan hesaplanan yerel Güneş saati değildir." },
    ],
    answer: `${lonText231(turkeyLon231.west)} meridyeninde yerel Güneş saati ${tn.west.text}. Resmî saat iki uçta aynıdır, çünkü ülke ortak bir saat dilimi uygular.`,
    check: `Tablodaki ${lonText231(turkeyLon231.east)} ve ${lonText231(turkeyLon231.west)} satırları arasındaki fark da ${merRow(turkeyLon231.east).local - merRow(turkeyLon231.west).local} dakikadır.`,
    pitfall: "Yerel Güneş saati farkını duvar saatlerine (resmî saate) taşımak.",
  },
  {
    title: "Ofsetle uçuş: tarih çizgisini ikinci kez sayma",
    prompt: `Bir uçak ${utc(fx.departOffset)} kullanan A kentinden yerel resmî saatle ${clock231(fx.depart).text}’da kalkıyor; uçuş ${durationText(fx.duration)} sürüyor. Varılan B kenti ${utc(fx.arriveOffset)} kullanıyor. B’de varış saati ve günü nedir?`,
    strategy: "Resmî saatler ofsetle verildiği için boylam × 4 dakika kullanılmaz: kalkışı UTC’ye çevir, süreyi ekle, hedef ofseti uygula, gün taşmasını kaydet.",
    steps: [
      { label: "UTC’ye", expression: `${clock231(fx.depart).text} − ${fx.departOffset} sa = ${clock231(fx.utcDepart).text} UTC`, explanation: "Kalkış aynı gün UTC’ye çevrilir." },
      { label: "Süre", expression: `${clock231(fx.utcDepart).text} + ${durationText(fx.duration)} = ${fx.utcClock.text} UTC (${dayText(fx.utcClock.day)})`, explanation: "UTC’de gece yarısı geçilir." },
      { label: "B’ye", expression: `${fx.utcClock.text} − ${Math.abs(fx.arriveOffset)} sa = ${fx.arriveClock.text}`, explanation: `B’nin saati UTC’den ${Math.abs(fx.arriveOffset)} saat geridir; varış yeniden kalkış gününe düşer.` },
    ],
    answer: `B’de ${dayText(fx.arriveClock.day)} (kalkış günü) saat ${fx.arriveClock.text}.`,
    check: `Ofset farkı (${utc(fx.arriveOffset).slice(3)}) − (${utc(fx.departOffset).slice(3)}) = −${fx.departOffset - fx.arriveOffset} sa: ${clock231(fx.depart).text} + ${durationText(fx.duration)} − ${fx.departOffset - fx.arriveOffset} sa = ${fx.arriveClock.text}.`,
    pitfall: "Ofsetleri uyguladıktan sonra bir de boylam farkı ya da tarih çizgisi düzeltmesi ekleyip aynı farkı iki kez saymak.",
  },
];

export const meridianSupplement231 = {
  title: meridianSection231.title,
  figureTitle: meridianSection231.title,
  paragraphs: meridianSection231.paragraphs,
  summary: `Fark = hedef boylam − karşılaştırma boylamı (doğu +, batı −); × ${minutesPerDegree231} dk. Artı fark doğu ve ileri saat, eksi fark batı ve geri saat. 15° = 1 saat, 180° = 12 saat (karşı meridyen). 24.00 geçilirse ertesi gün. Türkiye ${turkeyLon231.west}–${turkeyLon231.east}° D: 76 dk yerel saat farkı, ortak resmî saat.`,
  appendSection: true as const,
  table: meridianTable,
  examples: meridianExamples231,
};

/* ======================================================================
 * 3. Harita bilgisi: aynı yol ve aynı alan altı ölçekte
 * ==================================================================== */

/** 1 km = 100.000 cm (uzunluk); 1 km² = 10¹⁰ cm² (alan). */
export const cmPerKm231 = 100_000;
/** Gerçek (yatay iz düşüm) büyüklükler: 12 km’lik yol, 48 km²’lik alan. */
export const realRoadKm231 = 12;
export const realAreaKm2231 = 48;
export const denominators231 = [25_000, 50_000, 100_000, 200_000, 500_000, 1_000_000] as const;
export interface Scale231 {
  n: number;
  kmPerCm: number;
  barKm: number;
  roadCm: number;
  areaCm2: number;
}
/** Tam sayı bölümünü ondalığa çevirir; sonlu ondalık değilse veya hassasiyet kaybı varsa durur. */
const exactDiv = (a: number, b: number) => {
  const q = a / b;
  guard(Math.abs(q * b - a) < 1e-6 * Math.max(1, a) && Number(q.toFixed(6)) === q, `${a}/${b} sonlu ondalık olmalı`);
  return q;
};
export const scaleRow231 = (n: number): Scale231 => ({
  n,
  kmPerCm: exactDiv(n, cmPerKm231),
  barKm: exactDiv(2 * n, cmPerKm231),
  roadCm: exactDiv(realRoadKm231 * cmPerKm231, n),
  areaCm2: exactDiv(realAreaKm2231 * cmPerKm231 * cmPerKm231, n * n),
});
export const scaleRows231: readonly Scale231[] = denominators231.map(scaleRow231);
export const scaleText231 = (n: number) => `1:${num231(n, 0)}`;
const scRow = (n: number) => scaleRows231.find((r) => r.n === n)!;
{
  guard(scaleRows231.length <= 8, "tablo en çok sekiz satır olmalı");
  for (const r of scaleRows231) {
    guard(Math.abs(r.roadCm * r.kmPerCm - realRoadKm231) < 1e-9, `${r.n}: kâğıt × km/cm = gerçek uzunluk olmalı`);
    guard(Math.abs(r.areaCm2 * r.kmPerCm * r.kmPerCm - realAreaKm2231) < 1e-9, `${r.n}: kâğıt alan × (km/cm)² = gerçek alan olmalı`);
  }
  // Payda iki katına çıkınca uzunluk yarıya, alan dörtte bire iner.
  const a = scRow(50_000);
  const b = scRow(100_000);
  guard(a.roadCm === 2 * b.roadCm && a.areaCm2 === 4 * b.areaCm2, "payda 2 katında uzunluk 1/2, alan 1/4 olmalı");
  // Küçük payda büyük ölçek: kâğıt uzunluğu paydayla ters sıralı.
  guard(scaleRows231.every((r, i) => i === 0 || (r.n > scaleRows231[i - 1].n && r.roadCm < scaleRows231[i - 1].roadCm)), "satırlar büyük ölçekten küçüğe dizilmeli");
  guard(b.kmPerCm === 1, "1:100.000’de 1 cm 1 km olmalı");
  guard(scRow(500_000).barKm === 10, "dersteki 2 cm = 10 km çizgi ölçeği 1:500.000 satırıyla uyuşmalı");
}
const km = (x: number) => `${num231(x, 4)} km`;
const cm = (x: number) => `${num231(x, 4)} cm`;
const cm2 = (x: number) => `${num231(x, 4)} cm²`;
const big = scaleRows231[0];
const small = scaleRows231.at(-1)!;

const scaleTable = {
  layout: "table" as const,
  headers: ["Kesir ölçek", "Haritada 1 cm", "Çizgi ölçekte 2 cm’lik bölme", `${realRoadKm231} km’lik yol haritada`, `${realAreaKm2231} km²’lik alan haritada`],
  rows: scaleRows231.map((r) => [scaleText231(r.n), km(r.kmPerCm), km(r.barKm), cm(r.roadCm), cm2(r.areaCm2)]),
};

export const scaleSection231: GuideSection = {
  title: "Aynı yol ve aynı alan altı ölçekte: uzunluk N’ye, alan N²’ye bölünür",
  paragraphs: [
    `Tablodaki yol ${realRoadKm231} km, alan ${realAreaKm2231} km² yatay iz düşümdür ve hiçbir satırda değişmez; değişen yalnız kâğıttaki gösterimdir. Kesir ölçek 1:N ise haritadaki 1 cm gerçekte N cm’dir; 1 km = ${num231(cmPerKm231, 0)} cm olduğundan 1 cm, N ÷ ${num231(cmPerKm231, 0)} km eder. ${scaleText231(100_000)} satırında 1 cm tam ${km(scRow(100_000).kmPerCm)}’dir. Çizgi ölçeğin 2 cm’lik bölmesi bunun iki katını yazar; ${scaleText231(500_000)} satırındaki ${km(scRow(500_000).barKm)} dersteki çizgi ölçek örneğidir.`,
    `Uzunluk için gerçek uzunluk N’ye bölünür: ${realRoadKm231} km = ${num231(realRoadKm231 * cmPerKm231, 0)} cm, ${scaleText231(big.n)}’de ${cm(big.roadCm)}, ${scaleText231(small.n)}’de ${cm(small.roadCm)} olur. Alan için N² kullanılır: ${realAreaKm2231} km² = ${realAreaKm2231} × 10¹⁰ cm², ${scaleText231(big.n)}’de ${cm2(big.areaCm2)}, ${scaleText231(small.n)}’de ${cm2(small.areaCm2)}.`,
    `${scaleText231(50_000)} ile ${scaleText231(100_000)} satırlarını karşılaştır: payda 2 katına çıkınca yol ${cm(scRow(50_000).roadCm)}’den ${cm(scRow(100_000).roadCm)}’ye, yani yarıya; alan ${cm2(scRow(50_000).areaCm2)}’den ${cm2(scRow(100_000).areaCm2)}’ye, yani dörtte bire iner. Tablo büyük ölçekten küçük ölçeğe dizilidir: küçük payda büyük ölçektir ve aynı yeri daha büyük kâğıt alanında gösterir.`,
  ],
  table: scaleTable,
  figureTitle: "Aynı yol ve aynı alan altı ölçekte: uzunluk N’ye, alan N²’ye bölünür",
};

/** Örnek 1: aynı göl iki ölçekte. */
export const lake231 = (() => {
  const nA = 50_000;
  const nB = 200_000;
  const areaA = 32;
  const k = nB / nA;
  const areaB = exactDiv(areaA, k * k);
  const real = areaA * scaleRow231(nA).kmPerCm ** 2;
  return { nA, nB, areaA, k, areaB, real, realB: areaB * scaleRow231(nB).kmPerCm ** 2 };
})();
/** Örnek 2: çizgi ölçekten kesir ölçek, uzunluk ve alan. */
export const bar231 = (() => {
  const barCm = 2.5;
  const barKm = 5;
  const kmPerCm = barKm / barCm;
  const n = kmPerCm * cmPerKm231;
  const pathCm = 7;
  const rect = { w: 3, h: 2 };
  return { barCm, barKm, kmPerCm, n, pathCm, pathKm: pathCm * kmPerCm, rect, rectCm2: rect.w * rect.h, rectKm2: rect.w * rect.h * kmPerCm * kmPerCm };
})();
{
  const l = lake231;
  guard(l.areaB === 2 && l.real === 8 && l.realB === l.real, "göl iki ölçekte aynı 8 km² olmalı");
  guard((denominators231 as readonly number[]).includes(l.nA) && (denominators231 as readonly number[]).includes(l.nB), "örnek ölçekleri tabloda olmalı");
  const b = bar231;
  guard(b.n === 200_000 && b.pathKm === 14 && b.rectKm2 === 24, "çizgi ölçek örneği 1:200.000, 14 km, 24 km² vermeli");
  guard(scaleRow231(b.n).kmPerCm === b.kmPerCm, "çizgi ölçek tablodaki satırla uyuşmalı");
}
const lk = lake231;
const br = bar231;

export const scaleExamples231: WorkedExample[] = [
  {
    title: "Aynı göl iki haritada",
    prompt: `Aynı göl ${scaleText231(lk.nA)} ölçekli A haritasında ${lk.areaA} cm² yer kaplıyor. Göl ${scaleText231(lk.nB)} ölçekli B haritasında kaç cm² olur? Gölün yatay iz düşüm alanı kaç km²’dir? Hangi harita daha büyük ölçeklidir?`,
    strategy: "Önce paydalar oranını bul; alan bu oranın karesiyle değişir. Sonra bir haritada 1 cm’nin karşılığını kare alarak gerçek alana geç.",
    steps: [
      { label: "Oran", expression: `${num231(lk.nB, 0)} ÷ ${num231(lk.nA, 0)} = ${lk.k}`, explanation: "B’de payda 4 kat büyüktür; uzunluklar 4’te bire iner." },
      { label: "B alanı", expression: `${lk.areaA} ÷ ${lk.k}² = ${lk.areaA} ÷ ${lk.k * lk.k} = ${num231(lk.areaB)} cm²`, explanation: "Alan iki yönde küçüldüğü için oranın karesine bölünür." },
      { label: "Gerçek", expression: `${lk.areaA} × (${num231(scaleRow231(lk.nA).kmPerCm)} km)² = ${num231(lk.real)} km²`, explanation: `A’da 1 cm = ${km(scaleRow231(lk.nA).kmPerCm)}, 1 cm² = ${num231(scaleRow231(lk.nA).kmPerCm ** 2, 4)} km².` },
    ],
    answer: `B’de ${num231(lk.areaB)} cm²; gölün alanı ${num231(lk.real)} km². Paydası küçük olan A (${scaleText231(lk.nA)}) daha büyük ölçeklidir.`,
    check: `B ile de: ${num231(lk.areaB)} × (${num231(scaleRow231(lk.nB).kmPerCm)} km)² = ${num231(lk.realB)} km²; iki harita aynı gölü verir.`,
    pitfall: "Alanı paydaların oranıyla (4) bölüp 8 cm² bulmak; karenin unutulması.",
  },
  {
    title: "Çizgi ölçekten kesir ölçeğe, yola ve alana",
    prompt: `Bir haritanın çizgi ölçeğinde 0 ile ilk çentik arası ${num231(br.barCm)} cm ve altında ${br.barKm} km yazıyor. Haritada iki kavşak arası ${br.pathCm} cm ölçülüyor. Kesir ölçek nedir? Kavşaklar arası yatay uzaklık ne kadardır? Haritada ${br.rect.w} cm × ${br.rect.h} cm’lik dikdörtgen bir arazinin yatay iz düşüm alanı kaç km²’dir?`,
    strategy: "Bölmeyi 1 cm’ye indir, sonra km’yi cm’ye çevirerek 1:N yaz. Uzunluğu bir kez, alanı iki kez bu karşılıkla çarp.",
    steps: [
      { label: "1 cm", expression: `${br.barKm} km ÷ ${num231(br.barCm)} = ${num231(br.kmPerCm)} km`, explanation: "Haritada 1 cm gerçekte 2 km’dir." },
      { label: "Kesir", expression: `${num231(br.kmPerCm)} km = ${num231(br.n, 0)} cm → ${scaleText231(br.n)}`, explanation: "Aynı birimdeki iki uzunluğun oranı yazılır." },
      { label: "Yol", expression: `${br.pathCm} × ${num231(br.kmPerCm)} = ${br.pathKm} km`, explanation: "Uzunlukta karşılık bir kez kullanılır." },
      { label: "Alan", expression: `${br.rect.w} × ${br.rect.h} = ${br.rectCm2} cm²; ${br.rectCm2} × ${num231(br.kmPerCm)}² = ${br.rectKm2} km²`, explanation: "1 cm² = 4 km²; alanda karşılığın karesi kullanılır." },
    ],
    answer: `${scaleText231(br.n)}; kavşaklar arası ${br.pathKm} km; arazi ${br.rectKm2} km².`,
    check: `Kenarlar gerçekte ${br.rect.w * br.kmPerCm} km ve ${br.rect.h * br.kmPerCm} km; ${br.rect.w * br.kmPerCm} × ${br.rect.h * br.kmPerCm} = ${br.rectKm2} km².`,
    pitfall: "Alanı da uzunluk gibi tek kez çarpıp 6 × 2 = 12 km² bulmak.",
  },
];

export const scaleSupplement231 = {
  title: scaleSection231.title,
  figureTitle: scaleSection231.title,
  paragraphs: scaleSection231.paragraphs,
  summary: `1:N’de 1 cm = N ÷ ${num231(cmPerKm231, 0)} km. Harita uzunluğu = gerçek ÷ N; harita alanı = gerçek ÷ N². ${realRoadKm231} km’lik yol ${scaleText231(big.n)}’de ${cm(big.roadCm)}, ${scaleText231(small.n)}’de ${cm(small.roadCm)}. Payda 2 kat → uzunluk 1/2, alan 1/4. Küçük payda büyük ölçek.`,
  appendSection: true as const,
  table: scaleTable,
  examples: scaleExamples231,
};

/* ======================================================================
 * 4. Atmosfer katmanları: aralık, kalınlık, sıcaklık yönü
 * ==================================================================== */

export type Trend231 = "azalır" | "artar";
export interface Layer231 {
  name: string;
  lo: number;
  /** Üst sınır km; ekzosferde dış sınır kademeli olduğundan yoktur. */
  hi?: number;
  trend?: Trend231;
  trendText: string;
  feature: string;
}
/** Dersin “Ekzosfer ve şema sınırları” bölümündeki öğretici model sınırları: 13, 50, 85 ve 600 km. */
export const layers231: readonly Layer231[] = [
  { name: "Troposfer", lo: 0, hi: 13, trend: "azalır", trendText: "genel olarak azalır; inversiyonda artabilir", feature: "Hava kütlesinin ve su buharının önemli bölümü; günlük hava olaylarının çoğu" },
  { name: "Stratosfer", lo: 13, hi: 50, trend: "artar", trendText: "artar", feature: "Ozonun önemli bölümü; morötesi ışınımın soğurulması" },
  { name: "Mezosfer", lo: 50, hi: 85, trend: "azalır", trendText: "yeniden azalır", feature: "Birçok küçük göktaşı ısınıp parçalanır" },
  { name: "Termosfer", lo: 85, hi: 600, trend: "artar", trendText: "artar; gaz çok seyrektir", feature: "Yüksek enerjili ışınımla etkileşim; kutup ışıkları" },
  { name: "Ekzosfer", lo: 600, trendText: "şemada yön verilmez", feature: "Çok seyrek dış bölge; uzaya kademeli geçiş" },
];
export const modelTop231 = 600;
export const thickness231 = (l: Layer231) => (l.hi === undefined ? undefined : l.hi - l.lo);
export const layerAt231 = (km: number) => layers231.find((l) => km >= l.lo && (l.hi === undefined || km < l.hi))!;
const bounded = layers231.filter((l) => l.hi !== undefined);
const thickest = bounded.reduce((m, l) => (thickness231(l)! > thickness231(m)! ? l : m));
const tropo = layers231[0];
/** Troposferin 0–600 km model sütunundaki payı (binde). */
export const tropoShare231 = Math.round((thickness231(tropo)! / modelTop231) * 1000);
{
  guard(layers231.length <= 8, "tablo en çok sekiz satır olmalı");
  guard(layers231.every((l, i) => i === 0 || l.lo === layers231[i - 1].hi), "katmanlar boşluksuz üst üste gelmeli");
  guard(bounded.reduce((s, l) => s + thickness231(l)!, 0) === modelTop231 && bounded.at(-1)!.hi === modelTop231, "kalınlıklar 600 km’ye tamamlanmalı");
  guard(layers231.map((l) => l.lo).slice(1).join(",") === "13,50,85,600", "model sınırları 13, 50, 85, 600 km olmalı");
  // Sıcaklık yönü katmandan katmana değişir: azalır, artar, azalır, artar.
  const t = bounded.map((l) => l.trend);
  guard(t.every((x, i) => i === 0 || x !== t[i - 1]), "komşu katmanlarda sıcaklık yönü değişmeli");
  guard(thickest.name === "Termosfer", "en kalın sınırlı katman termosfer olmalı");
  guard(layerAt231(30).name === "Stratosfer", "dersteki 30 km örneği stratosferde olmalı");
}

const layerTable = {
  layout: "table" as const,
  headers: ["Katman", "Model aralığı", "Kalınlık", "Yükseldikçe sıcaklık", "Öne çıkan özellik"],
  rows: layers231.map((l) => [
    l.name, l.hi === undefined ? `${l.lo} km’den yukarı` : `${l.lo}–${l.hi} km`, l.hi === undefined ? "dış sınır kademeli" : `${thickness231(l)} km`, l.trendText, l.feature,
  ]),
};
const rising = bounded.filter((l) => l.trend === "artar");
const falling = bounded.filter((l) => l.trend === "azalır");

export const layerSection231: GuideSection = {
  title: "Beş katman, dört sınır: aralık, kalınlık ve sıcaklık yönü",
  paragraphs: [
    `Tablo dersin öğretici model sınırlarını kullanır: ${layers231.slice(1).map((l) => l.lo).join(", ")} km. Kalınlıklar üst sınırdan alt sınır çıkarılarak bulunur: ${bounded.map((l) => `${l.name.toLocaleLowerCase("tr-TR")} ${thickness231(l)} km`).join(", ")}; toplam ${modelTop231} km eder. Ekzosferin dış sınırı kademeli olduğu için kalınlığı yazılmaz. Sınırlar enlem, mevsim ve koşullarla değişir; 13 km bir okul ortalamasıdır.`,
    `Sıcaklık yönü katmandan katmana değişir: ${falling.map((l) => l.name.toLocaleLowerCase("tr-TR")).join(" ve ")} içinde yükseldikçe azalır, ${rising.map((l) => l.name.toLocaleLowerCase("tr-TR")).join(" ve ")} içinde artar. Beş katman sıcaklığın yükseklikle değişim yönüne göre ayrılır; stratosferdeki artışa ozonun morötesi ışınımı soğurması katkı sağlar.`,
    `En kalın sınırlı katman ${thickest.name.toLocaleLowerCase("tr-TR")} (${thickness231(thickest)} km), troposfer ise ${modelTop231} km’lik model sütununun yalnız binde ${tropoShare231}’sidir. Yine de gazların büyük bölümü ve günlük hava olaylarının çoğu bu ince alt katmandadır: kalınlık ile içerdiği hava miktarı aynı sıralamayı vermez.`,
  ],
  table: layerTable,
  figureTitle: "Beş katman, dört sınır: aralık, kalınlık ve sıcaklık yönü",
};

/** Sıcaklık dersindeki soru kabulü: troposferde her 200 m’de 1 °C azalma (idealize okul oranı, ölçüm değil). */
export const lapse231 = { metres: 200, degrees: 1 } as const;
export const summit231 = (() => {
  const seaLevel = 18;
  const height = 2400;
  const drop = (height / lapse231.metres) * lapse231.degrees;
  const balloonKm = 20;
  return { seaLevel, height, drop, summit: seaLevel - drop, balloonKm, balloonLayer: layerAt231(balloonKm) };
})();
export const observations231 = [
  { key: "A", text: "9 km’de bir fırtına bulutunun tepesi", km: 9 },
  { key: "B", text: "40 km’de ozon ölçen bir balon", km: 40 },
  { key: "C", text: "70 km’de parlayıp sönen küçük bir göktaşı izi", km: 70 },
  { key: "D", text: "250 km’de kutup ışığı", km: 250 },
] as const;
export const observed231 = observations231.map((o) => ({ ...o, layer: layerAt231(o.km) }));
{
  const s = summit231;
  guard(s.height / 1000 < tropo.hi! && s.summit === 6, "zirve troposferde ve 6 °C olmalı");
  guard(s.balloonLayer.name === "Stratosfer" && s.balloonLayer.trend === "artar", "20 km stratosferde, sıcaklık artmalı");
  guard(new Set(observed231.map((o) => o.layer.name)).size === 4 && observed231.every((o) => o.layer.hi !== undefined), "dört gözlem dört ayrı sınırlı katmanda olmalı");
  guard(observed231.filter((o) => o.layer.trend === "artar").map((o) => o.key).join("") === "BD", "artan katmanlar B ve D olmalı");
}
const sm = summit231;
const risingObs = observed231.filter((o) => o.layer.trend === "artar");

export const layerExamples231: WorkedExample[] = [
  {
    title: "Zirvede kural geçer, stratosferde geçmez",
    prompt: `Deniz seviyesinde ${sm.seaLevel} °C ölçülen bir yerde ${num231(sm.height, 0)} m yükseklikte bir dağ zirvesi var. Soru troposferde her ${lapse231.metres} m’de ${lapse231.degrees} °C azalma kabul ediyor; inversiyon yok. Zirvede beklenen sıcaklık kaç °C’dir? Aynı kuralı ${sm.balloonKm} km’deki bir balon için kullanmak doğru olur mu? Katman sınırları için 13, 50, 85 ve 600 km model değerlerini al.`,
    strategy: "Önce yüksekliğin hangi katmanda olduğunu bul; azalma kuralını yalnız sıcaklığın yükseldikçe azaldığı troposferde uygula.",
    steps: [
      { label: "Katman", expression: `${num231(sm.height, 0)} m = ${num231(sm.height / 1000)} km < ${tropo.hi} km`, explanation: "Zirve troposferdedir." },
      { label: "Azalma", expression: `${num231(sm.height, 0)} ÷ ${lapse231.metres} × ${lapse231.degrees} = ${sm.drop} °C`, explanation: "Kabul edilen oran yükseklik farkına uygulanır." },
      { label: "Zirve", expression: `${sm.seaLevel} − ${sm.drop} = ${sm.summit} °C`, explanation: "Beklenen değer bir model sonucudur, ölçüm değildir." },
      { label: "Balon", expression: `${tropo.hi} < ${sm.balloonKm} < ${sm.balloonLayer.hi} km → ${sm.balloonLayer.name.toLocaleLowerCase("tr-TR")}`, explanation: "Bu katmanda sıcaklık yükseldikçe artar; troposfer kuralı taşınamaz." },
    ],
    answer: `Zirvede ${sm.summit} °C beklenir. ${sm.balloonKm} km stratosferdedir; orada sıcaklık yükseldikçe arttığı için ${lapse231.metres} m’de ${lapse231.degrees} °C kuralı kullanılamaz.`,
    check: `${num231(sm.height, 0)} m, ${lapse231.metres} m’lik ${sm.height / lapse231.metres} basamaktır; ${sm.height / lapse231.metres} × ${lapse231.degrees} = ${sm.drop} °C.`,
    pitfall: "Troposfer için kabul edilen azalma oranını katman sınırını denetlemeden bütün atmosfere uygulamak.",
  },
  {
    title: "Dört gözlemi katmanına ve sıcaklık yönüne yerleştir",
    prompt: `Model sınırları 13, 50, 85 ve 600 km olsun. ${observations231.map((o) => `${o.key}) ${o.text}`).join("; ")}. Her gözlem hangi katmandadır? Hangilerinde, bulunduğu katmanda yükseldikçe sıcaklık artar?`,
    strategy: "Her yüksekliği sınırlarla karşılaştır; sonra katmanın sıcaklık yönünü tablodan oku.",
    steps: observed231.map((o) => ({
      label: o.key,
      expression: `${o.layer.lo} ≤ ${o.km} < ${o.layer.hi} km`,
      explanation: `${o.layer.name}: sıcaklık ${o.layer.trendText}.`,
    })),
    answer: `${observed231.map((o) => `${o.key} ${o.layer.name.toLocaleLowerCase("tr-TR")}`).join(", ")}; yükseldikçe sıcaklığın arttığı katmanlar ${risingObs.map((o) => o.key).join(" ve ")}.`,
    check: `Artan katmanlar (${rising.map((l) => l.name.toLocaleLowerCase("tr-TR")).join(", ")}) azalan katmanlarla (${falling.map((l) => l.name.toLocaleLowerCase("tr-TR")).join(", ")}) sırayla değişir; gözlemler de bu sırayı izler.`,
    pitfall: "Sıcaklığın bütün atmosferde yükseldikçe azaldığını varsayıp B ve D’yi de azalan saymak.",
  },
];

export const layerSupplement231 = {
  title: layerSection231.title,
  figureTitle: layerSection231.title,
  paragraphs: layerSection231.paragraphs,
  summary: `${bounded.map((l) => `${l.name} ${l.lo}–${l.hi} km (${l.trend})`).join(" · ")} · Ekzosfer ${modelTop231} km’den yukarı. Kalınlıklar ${bounded.map((l) => thickness231(l)).join(" + ")} = ${modelTop231} km. Sınırlar yaklaşık model değeridir; troposfer en ince ama havanın büyük bölümünü taşır.`,
  appendSection: true as const,
  table: layerTable,
  examples: layerExamples231,
};

/* ======================================================================
 * 5. Nem ve yağış: sıcaklığa göre doyma miktarı ve aynı buhar
 * ==================================================================== */

/**
 * Su yüzeyi üzerinde doymuş buhar basıncı için WMO’nun önerdiği Magnus
 * bağıntısı: e_s = 6,112 · exp(17,62 · t / (243,12 + t)) hPa (WMO-No. 8,
 * Guide to Instruments and Methods of Observation, Ek 4.B). Buhar yoğunluğu
 * (doyma miktarı, g/m³) ideal gaz bağıntısıyla ρ = e / (R_v · T), R_v =
 * 461,5 J/(kg·K). Değerler tabloda 0,1 g/m³’e yuvarlanır.
 */
export const magnus231 = { a: 6.112, b: 17.62, c: 243.12, rv: 461.5 } as const;
export const saturation231 = (t: number) => {
  const e = magnus231.a * Math.exp((magnus231.b * t) / (magnus231.c + t)); // hPa
  return ((e * 100) / (magnus231.rv * (t + 273.15))) * 1000; // g/m³
};
const round1 = (x: number) => Math.round(x * 10) / 10;
export const temperatures231 = [30, 25, 20, 15, 10, 5] as const;
/** Havanın taşıdığı buhar: 10 °C’deki doyma miktarına eşit (1 m³, sabit hacim, kapalı denge modeli). */
export const dewPoint231 = 10;
export const vapour231 = round1(saturation231(dewPoint231));
export interface Humid231 {
  t: number;
  sat: number;
  vapour: number;
  condensed: number;
  rh: number;
  state: string;
}
export const humidRow231 = (t: number, total = vapour231): Humid231 => {
  const sat = round1(saturation231(t));
  const vapour = Math.min(total, sat);
  const condensed = round1(total - vapour);
  const rh = round1((vapour / sat) * 100);
  const state = condensed > 0 ? "yoğuşma: fazla buhar damlaya döner" : vapour === sat ? "doygun: çiy noktası" : "doymamış";
  return { t, sat, vapour, condensed, rh, state };
};
export const humidRows231: readonly Humid231[] = temperatures231.map((t) => humidRow231(t));
const hum = (t: number) => humidRows231.find((r) => r.t === t)!;
const g3 = (x: number) => `${num231(x)} g/m³`;
const pct = (x: number) => `%${num231(x)}`;
{
  guard(humidRows231.length <= 8, "tablo en çok sekiz satır olmalı");
  // Doyma miktarı sıcaklık arttıkça yükselir.
  guard(humidRows231.every((r, i) => i === 0 || r.sat < humidRows231[i - 1].sat), "doyma miktarı sıcaklıkla artmalı");
  // Toplam su korunur; bağıl nem %100’ü aşmaz.
  for (const r of humidRows231) {
    guard(Math.abs(r.vapour + r.condensed - vapour231) < 1e-9, `${r.t}: buhar + yoğuşan = toplam olmalı`);
    guard(r.rh <= 100 && r.rh > 0, `${r.t}: bağıl nem %100’ü aşmamalı`);
  }
  // Soğudukça bağıl nem artar; çiy noktasında %100.
  guard(humidRows231.every((r, i) => i === 0 || r.rh >= humidRows231[i - 1].rh), "soğudukça bağıl nem artmalı");
  guard(hum(dewPoint231).rh === 100 && hum(dewPoint231).condensed === 0, "çiy noktasında tam doygunluk olmalı");
  guard(humidRows231.filter((r) => r.condensed > 0).every((r) => r.t < dewPoint231), "yoğuşma yalnız çiy noktasının altında olmalı");
  guard(humidRows231.filter((r) => r.t > dewPoint231).every((r) => r.vapour === vapour231), "çiy noktasının üstünde mutlak nem sabit kalmalı");
}

const humidTable = {
  layout: "table" as const,
  headers: ["Sıcaklık", "Doyma miktarı (maksimum nem)", "Mutlak nem (buhar)", "Yoğuşmuş su", "Bağıl nem = mutlak ÷ maksimum × 100"],
  rows: humidRows231.map((r) => [`${r.t} °C`, g3(r.sat), g3(r.vapour), r.condensed > 0 ? g3(r.condensed) : "yok", `${pct(r.rh)} · ${r.state}`]),
};
const warmest = humidRows231[0];
const coldest = humidRows231.at(-1)!;

export const humidSection231: GuideSection = {
  title: "Aynı buhar, altı sıcaklık: bağıl nem ve çiy noktası",
  paragraphs: [
    `Tablodaki doyma miktarları sıcaklık–doyma verisidir: WMO’nun su yüzeyi için önerdiği Magnus bağıntısıyla (doymuş buhar basıncı, hPa) ve su buharı gaz sabitiyle (461,5 J/(kg·K)) hesaplanmış, 0,1 g/m³’e yuvarlanmıştır. Sıcaklık ${warmest.t} °C’den ${coldest.t} °C’ye inerken doyma miktarı ${g3(warmest.sat)}’ten ${g3(coldest.sat)}’e düşer. Model 1 m³’lük sabit hacimli kapalı bir hava parselidir ve toplam su ${g3(vapour231)}’tür.`,
    `Bağıl nem, mutlak nemin aynı sıcaklıktaki doyma miktarına (maksimum neme) bölünüp 100 ile çarpılmasıdır. ${dewPoint231} °C’nin üstünde buhar değişmez, mutlak nem hep ${g3(vapour231)} kalır; yalnız payda küçüldüğü için bağıl nem ${pct(warmest.rh)}’den ${pct(hum(15).rh)}’e yükselir. Isınmak veya soğumak havaya su eklemez, doyma eşiğini değiştirir.`,
    `${dewPoint231} °C’de doyma miktarı mutlak neme eşittir: bağıl nem %100 olur; bu sıcaklık bu havanın çiy noktasıdır. Daha fazla soğuyan ${coldest.t} °C satırında denge modelinde buhar ${g3(coldest.vapour)}’e iner, ${g3(coldest.condensed)} su yoğuşur ve bağıl nem %100’de kalır. Soğuyan yüzeyde bu yoğuşma çiy, havada asılı kalırsa sis veya bulut damlacığı olarak görülebilir.`,
  ],
  table: humidTable,
  figureTitle: "Aynı buhar, altı sıcaklık: bağıl nem ve çiy noktası",
};

/** Örnek 1: oda havası ve soğuk cam. */
export const window231 = (() => {
  const room = hum(25);
  const glass = hum(5);
  return { room, glass, dew: dewPoint231 };
})();
/** Örnek 2: ısıtma bağıl nemi düşürür; doyurmak için gereken buhar. */
export const heating231 = (() => {
  const from = hum(15);
  const to = hum(30);
  return { from, to, missing: round1(to.sat - to.vapour) };
})();
{
  const w = window231;
  guard(w.room.rh < 50 && w.glass.condensed > 0, "oda doymamış, camda yoğuşma olmalı");
  const h = heating231;
  guard(h.from.vapour === h.to.vapour && h.to.rh < h.from.rh, "ısıtma mutlak nemi korumalı, bağıl nemi düşürmeli");
}
const wn = window231;
const ht = heating231;

export const humidExamples231: WorkedExample[] = [
  {
    title: "Oda havası soğuk camla karşılaşınca",
    prompt: `Bir odanın havası ${wn.room.t} °C ve 1 m³’ünde ${num231(vapour231)} g su buharı var (mutlak nem ${g3(vapour231)}). Doyma miktarları: ${humidRows231.map((r) => `${r.t} °C’de ${g3(r.sat)}`).join(", ")}. Odanın bağıl nemi kaçtır? Bu hava hangi sıcaklıkta doygun olur? Camla temas eden hava ${wn.glass.t} °C’ye soğursa (hacim sabit, denge modeli) 1 m³ başına ne kadar su yoğuşur?`,
    strategy: "Bağıl nem için aynı sıcaklıktaki doyma miktarını kullan; çiy noktası için doyma miktarı mutlak neme eşit olan sıcaklığı ara; yoğuşan için fazlayı hesapla.",
    steps: [
      { label: "Bağıl nem", expression: `${num231(vapour231)} ÷ ${num231(wn.room.sat)} × 100 ≈ ${pct(wn.room.rh)}`, explanation: "Mutlak nem aynı sıcaklıktaki maksimum neme bölünür." },
      { label: "Çiy noktası", expression: `doyma(${wn.dew} °C) = ${g3(hum(wn.dew).sat)} = mutlak nem`, explanation: `Hava yaklaşık ${wn.dew} °C’ye soğuyunca bağıl nem %100 olur.` },
      { label: "Cam", expression: `${num231(vapour231)} − ${num231(wn.glass.sat)} = ${num231(wn.glass.condensed)} g`, explanation: `${wn.glass.t} °C’de hava en çok ${g3(wn.glass.sat)} buhar tutar; fazlası camda damla olur.` },
    ],
    answer: `Bağıl nem yaklaşık ${pct(wn.room.rh)}; çiy noktası yaklaşık ${wn.dew} °C; camda 1 m³ başına ${num231(wn.glass.condensed)} g su yoğuşur.`,
    check: `${wn.glass.t} °C’de buhar ${num231(wn.glass.vapour)} + yoğuşan ${num231(wn.glass.condensed)} = ${num231(vapour231)} g; su korunur ve bağıl nem %100’ü aşmaz.`,
    pitfall: "Bağıl nemi 10 °C’nin doyma değeriyle hesaplayıp oda için %100 bulmak; sıcaklığı yanlış satırdan okumak.",
  },
  {
    title: "Isıtınca nem azaldı mı?",
    prompt: `1 m³’lük kapalı bir kapta ${num231(vapour231)} g su buharı var; sıcaklık ${ht.from.t} °C’den ${ht.to.t} °C’ye çıkarılıyor (hacim sabit, su eklenmiyor). Doyma miktarı ${ht.from.t} °C’de ${g3(ht.from.sat)}, ${ht.to.t} °C’de ${g3(ht.to.sat)}. Mutlak nem ve bağıl nem nasıl değişir? ${ht.to.t} °C’de havayı doyurmak için 1 m³’e kaç g buhar eklenmelidir?`,
    strategy: "Mutlak nemi su miktarından, bağıl nemi su miktarı ile o sıcaklıktaki doyma miktarının oranından bul.",
    steps: [
      { label: "Mutlak", expression: `${num231(vapour231)} g ÷ 1 m³ = ${g3(ht.to.vapour)}`, explanation: "Su eklenmediği ve hacim değişmediği için mutlak nem aynı kalır." },
      { label: `${ht.from.t} °C`, expression: `${num231(vapour231)} ÷ ${num231(ht.from.sat)} × 100 ≈ ${pct(ht.from.rh)}`, explanation: "Başlangıçtaki bağıl nem." },
      { label: `${ht.to.t} °C`, expression: `${num231(vapour231)} ÷ ${num231(ht.to.sat)} × 100 ≈ ${pct(ht.to.rh)}`, explanation: "Payda büyüdüğü için bağıl nem düşer." },
      { label: "Eksik", expression: `${num231(ht.to.sat)} − ${num231(vapour231)} = ${num231(ht.missing)} g`, explanation: "Doyma için gereken ek buhar." },
    ],
    answer: `Mutlak nem ${g3(vapour231)} olarak kalır; bağıl nem ${pct(ht.from.rh)}’ten ${pct(ht.to.rh)}’e düşer. Doyurmak için ${num231(ht.missing)} g buhar gerekir.`,
    check: `${num231(vapour231)} + ${num231(ht.missing)} = ${num231(ht.to.sat)} g/m³ olunca bağıl nem %100 olur.`,
    pitfall: "Bağıl nemin düşmesini havadaki suyun azalması sanmak; ısınma yalnız doyma eşiğini yükseltir.",
  },
];

export const humidSupplement231 = {
  title: humidSection231.title,
  figureTitle: humidSection231.title,
  paragraphs: humidSection231.paragraphs,
  summary: `Bağıl nem = mutlak nem ÷ maksimum nem (doyma miktarı) × 100. Aynı ${g3(vapour231)} buhar: ${warmest.t} °C’de ${pct(warmest.rh)}, ${dewPoint231} °C’de %100 (çiy noktası), ${coldest.t} °C’de ${g3(coldest.condensed)} yoğuşma. Isıtma ve soğutma su eklemez; doyma eşiğini değiştirir. Doyma değerleri WMO Magnus bağıntısından.`,
  appendSection: true as const,
  table: humidTable,
  examples: humidExamples231,
};

/** Bu beş dersin daha önce eki yoktur. */
export const depth231Supplements = {
  "dunya-sekli-hareket": [juneSupplement231],
  "cografi-konum": [meridianSupplement231],
  "harita-bilgisi": [scaleSupplement231],
  "atmosfer-katmanlari": [layerSupplement231],
  "nem-yagis": [humidSupplement231],
};
