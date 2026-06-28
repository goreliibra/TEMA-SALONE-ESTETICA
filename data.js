/* =========================================================================
   DATA LAYER — Estetica Modenese (E&M)
   Single source of truth. Backend-ready (same shape can come from an API).
   ========================================================================= */

/* ┌───────────────────────────────────────────────────────────────────────┐
   │  ★★★  CONFIG — EDIT THIS BLOCK TO REBRAND FOR A NEW CLIENT  ★★★         │
   │                                                                         │
   │  Change ONLY the values below to point the whole site (every meta tag,  │
   │  JSON-LD schema, canonical URL, phone/WhatsApp link, map and footer)    │
   │  at a new business. Nothing else in this file needs to change for the   │
   │  business identity. Services/prices live in LISTINO further down;       │
   │  team in TEAM; reviews in REVIEWS; copy/translations in i18n.js.        │
   │                                                                         │
   │  When you connect a real domain (e.g. esteticamodenese.it) just set     │
   │  SITE_DOMAIN below — all canonical/OG/schema URLs update automatically. │
   └───────────────────────────────────────────────────────────────────────┘ */
const CONFIG = {
  // --- Identity ---
  SITE_DOMAIN: "https://www.esteticamodenese.it",   // no trailing slash; full origin used for canonical/OG/schema
  BUSINESS_NAME: "Estetica Modenese",
  BUSINESS_SHORT: "E&M",
  BUSINESS_TYPE: ["HairSalon", "BeautySalon"],       // schema.org type(s)
  PRICE_RANGE: "€€",

  // --- Address (keep identical everywhere = consistent NAP) ---
  ADDRESS_LINE: "Via P. Giardini 386",
  CITY: "Modena",
  ZIP: "41125",
  PROVINCE: "MO",                                    // province / region code
  COUNTRY: "Italia",
  COUNTRY_CODE: "IT",
  GEO: { lat: 44.6200, lng: 10.9170 },

  // --- Contact ---
  PHONE: "+39 331 424 5928",                         // display format
  PHONE_HREF: "+393314245928",                       // tel: link (+ and digits)
  WHATSAPP: "393314245928",                          // digits only, no +
  EMAIL: "",                                          // optional, "" if none
  INSTAGRAM: "@esteticamodenese",
  INSTAGRAM_URL: "https://www.instagram.com/esteticamodenese/",

  // --- Social profiles for schema sameAs (add Facebook/TikTok etc. if any) ---
  SOCIAL: ["https://www.instagram.com/esteticamodenese/"],

  // --- Google reviews (shown in the "Recensioni Google" block) ---
  GOOGLE_RATING: 4.8,        // average stars on Google (real, da Google Business)
  GOOGLE_REVIEWS_COUNT: 95,  // number of reviews on Google (real)
  // Link to your Google Business page (write/read reviews). If empty, a Google
  // Maps search for the business name is used.
  GOOGLE_REVIEW_URL: "",

  // --- Branding ---
  HERO_IMAGE: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1920&q=80",
  // Premium VIDEO hero (5–8s loop, autoplay+muted). Leave "" to keep the photo.
  // When you have a clip: optimise it (~2–4 MB mp4), put it in the project as
  // hero.mp4, then set HERO_VIDEO: "hero.mp4". The poster shows instantly while
  // the video loads, and on devices that block autoplay the poster stays.
  HERO_VIDEO: "hero.mp4"   // demo clip (Mixkit free license) — swap for a real salon clip
};

/* ---- Salon / LocalBusiness info (derived from CONFIG — do not edit by hand) ---- */
const _addrQuery = encodeURIComponent(`${CONFIG.BUSINESS_NAME}, ${CONFIG.ADDRESS_LINE}, ${CONFIG.CITY}`);
const _destQuery = encodeURIComponent(`${CONFIG.ADDRESS_LINE}, ${CONFIG.CITY}`);
const SALON = {
  name: CONFIG.BUSINESS_NAME,
  short: CONFIG.BUSINESS_SHORT,
  tagline: { it: "Estetica & Parrucchieri Unisex · Modena", tr: "Güzellik & Unisex Kuaför · Modena", en: "Beauty & Unisex Hair · Modena" },
  addressLine: CONFIG.ADDRESS_LINE,
  city: CONFIG.CITY,
  zip: CONFIG.ZIP,
  province: CONFIG.PROVINCE,
  country: CONFIG.COUNTRY,
  phone: CONFIG.PHONE,
  phoneHref: CONFIG.PHONE_HREF,
  whatsapp: CONFIG.WHATSAPP,                  // digits only, no +
  email: CONFIG.EMAIL,
  instagram: CONFIG.INSTAGRAM,
  instagramUrl: CONFIG.INSTAGRAM_URL,
  // Google Maps (built from the address above)
  mapsEmbed: `https://maps.google.com/maps?q=${_addrQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
  mapsLink: `https://www.google.com/maps/search/?api=1&query=${_addrQuery}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${_destQuery}`,
  geo: CONFIG.GEO
};

/* ---- Opening hours (0=Sun … 6=Sat). Aperti tutti i giorni. ---- */
const WORKING_HOURS = {
  0: { open: "10:00", close: "18:00" }, // Dom
  1: { open: "09:00", close: "20:00" }, // Lun
  2: { open: "09:00", close: "20:00" }, // Mar
  3: { open: "09:00", close: "20:00" }, // Mer
  4: { open: "09:00", close: "20:00" }, // Gio
  5: { open: "09:00", close: "20:00" }, // Ven
  6: { open: "09:00", close: "20:00" }  // Sab
};

const LUNCH = null;          // aperti tutto il giorno
const BUFFER_MIN = 10;       // minuti tra un appuntamento e l'altro
const SLOT_STEP_MIN = 45;    // appuntamenti ogni 45 minuti

/* =========================================================================
   LISTINO — full real price list, grouped into categories (accordion).
   Each item: { name{it,tr,en}, price, book?:true, duration?(min) }
   Items with book:true become bookable services (with a duration).
   ========================================================================= */
const LISTINO = [
  {
    id: "capelli-donna", icon: "scissors",
    label: { it: "Capelli · Donna", tr: "Saç · Kadın", en: "Hair · Women" },
    items: [
      { name: { it: "Taglio", tr: "Kesim", en: "Cut" }, price: "da €20", book: true, duration: 45 },
      { name: { it: "Taglio + Piega", tr: "Kesim + Fön", en: "Cut + Blow-dry" }, price: "da €30", book: true, duration: 60 },
      { name: { it: "Taglio Bimba", tr: "Çocuk Kesimi (kız)", en: "Girl's Cut" }, price: "da €15", book: true, duration: 30 },
      { name: { it: "Piega Corti", tr: "Fön · Kısa", en: "Blow-dry · Short" }, price: "da €15", book: true, duration: 35 },
      { name: { it: "Piega Lunghi", tr: "Fön · Uzun", en: "Blow-dry · Long" }, price: "da €20", book: true, duration: 40 },
      { name: { it: "Piega Mossi / Boccoli Corti", tr: "Dalgalı Fön · Kısa", en: "Wavy / Curls · Short" }, price: "da €18" },
      { name: { it: "Piega Mossi / Boccoli Lunghi", tr: "Dalgalı Fön · Uzun", en: "Wavy / Curls · Long" }, price: "da €22" },
      { name: { it: "Colore Ricrescita", tr: "Renk · Dip Boyası", en: "Colour · Roots" }, price: "da €35", book: true, duration: 75 },
      { name: { it: "Colore Lunghezza", tr: "Renk · Boy", en: "Colour · Lengths" }, price: "da €50", book: true, duration: 90 },
      { name: { it: "Colore Senza Ammoniaca", tr: "Amonyaksız Renk", en: "Ammonia-free Colour" }, price: "da €45", book: true, duration: 90 },
      { name: { it: "Colore con L'Oréal", tr: "L'Oréal Renk", en: "L'Oréal Colour" }, price: "da €45" },
      { name: { it: "Colpi di Luce", tr: "Işıltı (colpi di luce)", en: "Highlights" }, price: "da €60", book: true, duration: 90 },
      { name: { it: "Meches", tr: "Meç", en: "Méches" }, price: "da €65", book: true, duration: 90 },
      { name: { it: "Balayage", tr: "Balyaj", en: "Balayage" }, price: "da €80", book: true, duration: 120 },
      { name: { it: "Airtouch", tr: "Airtouch", en: "Airtouch" }, price: "da €100", book: true, duration: 150 },
      { name: { it: "Lisciante con Cheratina", tr: "Keratin Düzleştirme", en: "Keratin Smoothing" }, price: "da €110", book: true, duration: 120 },
      { name: { it: "Permanente", tr: "Perma", en: "Perm" }, price: "da €55", book: true, duration: 90 },
      { name: { it: "Acconciatura Capelli Corti", tr: "Topuz/Şinyon · Kısa", en: "Updo · Short" }, price: "da €50", book: true, duration: 45 },
      { name: { it: "Acconciatura Capelli Lunghi", tr: "Topuz/Şinyon · Uzun", en: "Updo · Long" }, price: "da €80", book: true, duration: 60 },
      { name: { it: "Treccine", tr: "Örgü", en: "Braids" }, price: "da €10" },
      { name: { it: "Mask Colorante", tr: "Renkli Maske", en: "Colour Mask" }, price: "da €25" },
      { name: { it: "Mask Ristrutturante o Gialla", tr: "Onarıcı/Sarı Maske", en: "Restructuring/Toning Mask" }, price: "da €10" },
      { name: { it: "Shampoo Antigiallo", tr: "Sarı Karşıtı Şampuan", en: "Anti-yellow Shampoo" }, price: "da €8" },
      { name: { it: "Depilazione Viso con Filo / Ceretta", tr: "Yüz İpek/Ağda", en: "Face Threading / Wax" }, price: "da €18" },
      { name: { it: "Depilazione Collo", tr: "Boyun Ağda", en: "Neck Waxing" }, price: "da €7" },
      { name: { it: "Sopracciglia con Filo", tr: "İp ile Kaş", en: "Eyebrow Threading" }, price: "da €7", book: true, duration: 15 },
      { name: { it: "Colore Sopracciglia", tr: "Kaş Boyası", en: "Eyebrow Tint" }, price: "da €8" },
      { name: { it: "Colore Sopracciglia con Henné", tr: "Kına Kaş", en: "Henna Brows" }, price: "da €12" },
      { name: { it: "Baffetti", tr: "Bıyık", en: "Upper Lip" }, price: "da €4" },
      { name: { it: "Trattamento Filler Therapy Nashi", tr: "Nashi Filler Bakımı", en: "Nashi Filler Therapy" }, price: "da €8" },
      { name: { it: "Trattamento Anticaduta / Antirottura Nashi", tr: "Nashi Dökülme/Kırılma Karşıtı", en: "Nashi Anti-loss/breakage" }, price: "da €3" },
      { name: { it: "Trattamento Lungo Nashi", tr: "Nashi Uzun Bakım", en: "Nashi Long Treatment" }, price: "da €25" }
    ]
  },
  {
    id: "capelli-uomo", icon: "scissors",
    label: { it: "Capelli · Uomo", tr: "Saç · Erkek", en: "Hair · Men" },
    items: [
      { name: { it: "Taglio", tr: "Kesim", en: "Cut" }, price: "da €15", book: true, duration: 30 },
      { name: { it: "Taglio + Shampoo", tr: "Kesim + Yıkama", en: "Cut + Shampoo" }, price: "da €17", book: true, duration: 35 },
      { name: { it: "Taglio + Barba + Shampoo + Piega", tr: "Kesim + Sakal + Yıkama + Fön", en: "Cut + Beard + Shampoo + Style" }, price: "da €25", book: true, duration: 50 },
      { name: { it: "Barba", tr: "Sakal", en: "Beard" }, price: "da €8", book: true, duration: 20 },
      { name: { it: "Colore Barba", tr: "Sakal Boyası", en: "Beard Colour" }, price: "€10" },
      { name: { it: "Maschera Viso", tr: "Yüz Maskesi", en: "Face Mask" }, price: "da €15" },
      { name: { it: "Depilazione del Viso", tr: "Yüz Ağdası", en: "Face Waxing" }, price: "€10" },
      { name: { it: "Depilazione Collo", tr: "Boyun Ağdası", en: "Neck Waxing" }, price: "€7" },
      { name: { it: "Sopracciglia con Filo", tr: "İp ile Kaş", en: "Eyebrow Threading" }, price: "€7" },
      { name: { it: "Colore Capelli", tr: "Saç Boyası", en: "Hair Colour" }, price: "da €20" },
      { name: { it: "Trattamento Lisciante Nashi (Cheratina)", tr: "Nashi Keratin Düzleştirme", en: "Nashi Keratin Smoothing" }, price: "€50", book: true, duration: 90 },
      { name: { it: "Completo · Barba, Capelli, Sopracciglia, Shampoo, Maschera", tr: "Komple · Sakal, Saç, Kaş, Yıkama, Maske", en: "Full · Beard, Hair, Brows, Shampoo, Mask" }, price: "€40", book: true, duration: 60 }
    ]
  },
  {
    id: "epilazione", icon: "sparkles",
    label: { it: "Epilazione / Ceretta", tr: "Epilasyon / Ağda", en: "Waxing / Hair Removal" },
    items: [
      { name: { it: "Sopracciglia Filo / Ceretta", tr: "Kaş İp / Ağda", en: "Eyebrows · Threading / Wax" }, price: "€7", book: true, duration: 15 },
      { name: { it: "Baffetti", tr: "Bıyık", en: "Upper Lip" }, price: "€4" },
      { name: { it: "Viso", tr: "Yüz", en: "Face" }, price: "€18", book: true, duration: 20 },
      { name: { it: "Ceretta Metà Braccia", tr: "Yarım Kol Ağda", en: "Half Arms Wax" }, price: "€10" },
      { name: { it: "Ceretta Braccia Totale", tr: "Tam Kol Ağda", en: "Full Arms Wax" }, price: "€20" },
      { name: { it: "Ceretta Metà Gambe", tr: "Yarım Bacak Ağda", en: "Half Legs Wax" }, price: "€15" },
      { name: { it: "Ceretta Coscia", tr: "Uyluk Ağda", en: "Thigh Wax" }, price: "€15" },
      { name: { it: "Ceretta Gambe Totale", tr: "Tam Bacak Ağda", en: "Full Legs Wax" }, price: "€25", book: true, duration: 40 },
      { name: { it: "Ascelle", tr: "Koltuk Altı", en: "Underarms" }, price: "€10" },
      { name: { it: "Inguine Sgambato", tr: "Bikini", en: "Bikini" }, price: "€10" },
      { name: { it: "Inguine Totale", tr: "Tam Bikini", en: "Full Bikini" }, price: "€15" },
      { name: { it: "Spalla + Schiena", tr: "Omuz + Sırt", en: "Shoulders + Back" }, price: "€25" },
      { name: { it: "Petto + Pancia", tr: "Göğüs + Karın", en: "Chest + Stomach" }, price: "€25" },
      { name: { it: "Epilazione Donna · Pacchetto (gambe-braccia-inguine-ascelle)", tr: "Kadın Paket (bacak-kol-bikini-koltuk)", en: "Women Package (legs-arms-bikini-underarms)" }, price: "€50", book: true, duration: 60 },
      { name: { it: "Epilazione Donna · Total Corpo", tr: "Kadın · Tüm Vücut", en: "Women · Full Body" }, price: "da €65", book: true, duration: 90 },
      { name: { it: "Epilazione Uomo · Pacchetto (gambe-braccia-inguine-ascelle)", tr: "Erkek Paket (bacak-kol-bikini-koltuk)", en: "Men Package (legs-arms-bikini-underarms)" }, price: "€60", book: true, duration: 60 },
      { name: { it: "Epilazione Uomo · Total Corpo", tr: "Erkek · Tüm Vücut", en: "Men · Full Body" }, price: "da €75", book: true, duration: 90 }
    ]
  },
  {
    id: "manicure", icon: "hand",
    label: { it: "Manicure", tr: "Manikür", en: "Manicure" },
    items: [
      { name: { it: "Manicure Curativo", tr: "Bakım Manikürü", en: "Treatment Manicure" }, price: "€12", book: true, duration: 30 },
      { name: { it: "Smalto Normale", tr: "Normal Oje", en: "Regular Polish" }, price: "€5" },
      { name: { it: "Manicure Semipermanente", tr: "Kalıcı Oje Manikür", en: "Gel Polish Manicure" }, price: "€32", book: true, duration: 50 },
      { name: { it: "Manicure Gel", tr: "Jel Manikür", en: "Gel Manicure" }, price: "€37", book: true, duration: 60 },
      { name: { it: "Ricostruzione Unghie", tr: "Tırnak Yapımı", en: "Nail Extension" }, price: "€59", book: true, duration: 75 },
      { name: { it: "Ricostruzione Unghie con Tips", tr: "Tips ile Tırnak", en: "Nail Extension with Tips" }, price: "€69", book: true, duration: 80 },
      { name: { it: "Gel o Semipermanente Rinforzato", tr: "Güçlendirilmiş Jel/Kalıcı", en: "Reinforced Gel/Gel-polish" }, price: "+€8" },
      { name: { it: "Rimozione Semip./Gel con Manicure Curativo", tr: "Sökme + Bakım Manikürü", en: "Removal + Treatment Manicure" }, price: "€22" },
      { name: { it: "+ French", tr: "+ French", en: "+ French" }, price: "+€5" },
      { name: { it: "+ Design Unghie", tr: "+ Tırnak Tasarımı", en: "+ Nail Design" }, price: "+€5" }
    ]
  },
  {
    id: "pedicure", icon: "footprints",
    label: { it: "Pedicure", tr: "Pedikür", en: "Pedicure" },
    items: [
      { name: { it: "Pedicure Curativo", tr: "Bakım Pedikürü", en: "Treatment Pedicure" }, price: "€23", book: true, duration: 45 },
      { name: { it: "+ Smalto", tr: "+ Oje", en: "+ Polish" }, price: "+€5" },
      { name: { it: "Gel o Semipermanente Rinforzato", tr: "Güçlendirilmiş Jel/Kalıcı", en: "Reinforced Gel/Gel-polish" }, price: "+€8" },
      { name: { it: "Pedicure + Semipermanente", tr: "Pedikür + Kalıcı Oje", en: "Pedicure + Gel Polish" }, price: "€35", book: true, duration: 60 },
      { name: { it: "Rimozione Semip./Gel con Pedicure Curativo", tr: "Sökme + Bakım Pedikürü", en: "Removal + Treatment Pedicure" }, price: "€30" },
      { name: { it: "+ French", tr: "+ French", en: "+ French" }, price: "+€5" },
      { name: { it: "+ Design Unghie", tr: "+ Tırnak Tasarımı", en: "+ Nail Design" }, price: "+€5" }
    ]
  },
  {
    id: "massaggi", icon: "flower",
    label: { it: "Massaggi", tr: "Masaj", en: "Massage" },
    items: [
      { name: { it: "Massaggio Totale Estetico Rilassante", tr: "Tüm Vücut Rahatlatıcı Masaj", en: "Full Relaxing Massage" }, price: "€45", book: true, duration: 60 },
      { name: { it: "Massaggio Rilassante Parziale (schiena, spalle, gambe)", tr: "Bölgesel Rahatlatıcı (sırt, omuz, bacak)", en: "Partial Relaxing (back, shoulders, legs)" }, price: "€30", book: true, duration: 30 },
      { name: { it: "Massaggio Linfodrenante", tr: "Lenf Drenaj Masajı", en: "Lymphatic Drainage" }, price: "€45", book: true, duration: 60 },
      { name: { it: "Massaggio Decontratturante", tr: "Kas Açıcı Masaj", en: "Deep-tissue Massage" }, price: "€30", book: true, duration: 30 },
      { name: { it: "Massaggio Drenante Breve", tr: "Kısa Drenaj Masajı", en: "Short Draining Massage" }, price: "€30", book: true, duration: 30 },
      { name: { it: "Massaggio Viso o Specifico per Collo", tr: "Yüz/Boyun Masajı", en: "Face or Neck Massage" }, price: "€30", book: true, duration: 30 }
    ]
  }
];

/* ---- Bookable services derived from LISTINO (with a stable id) ---- */
const SERVICES = (function () {
  const out = [];
  LISTINO.forEach((cat) => {
    cat.items.forEach((it, i) => {
      if (it.book) {
        out.push({
          id: cat.id + "-" + i,
          cat: cat.id,
          catLabel: cat.label,
          icon: cat.icon,
          name: it.name,
          duration: it.duration || 45,
          price: it.price
        });
      }
    });
  });
  return out;
})();

/* ---- Team / Operatori (placeholder: sostituisci nomi e foto reali) ----
   specialties = category ids handled by the operator.
   workingDays = weekday numbers (0=Dom … 6=Sab). ---- */
const TEAM = [
  {
    id: "sara", name: "Sara",
    role: { it: "Parrucchiera", tr: "Kuaför", en: "Hairdresser" },
    specialties: ["capelli-donna", "capelli-uomo"],
    bio: { it: "Tagli, pieghe e colore con cura del dettaglio.", tr: "Detaya özen gösteren kesim, fön ve renk.", en: "Cuts, blow-dries and colour with attention to detail." },
    workingDays: [0, 1, 2, 3, 4, 5, 6],
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "giulia", name: "Giulia",
    role: { it: "Estetista", tr: "Estetisyen", en: "Beautician" },
    specialties: ["epilazione", "massaggi"],
    bio: { it: "Epilazione, trattamenti viso e massaggi rilassanti.", tr: "Epilasyon, yüz bakımı ve rahatlatıcı masaj.", en: "Waxing, facials and relaxing massage." },
    workingDays: [0, 1, 2, 3, 4, 5, 6],
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "elena", name: "Elena",
    role: { it: "Onicotecnica · Nail Artist", tr: "Tırnak Uzmanı", en: "Nail Artist" },
    specialties: ["manicure", "pedicure"],
    bio: { it: "Manicure, pedicure, ricostruzione e nail art.", tr: "Manikür, pedikür, tırnak yapımı ve nail art.", en: "Manicure, pedicure, extensions and nail art." },
    workingDays: [0, 1, 2, 3, 4, 5, 6],
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=80"
  }
];

/* ---- Existing bookings (example seed) — per operator ---- */
const EXISTING_BOOKINGS = [
  { proId: "sara",   date: "2026-06-24", start: "10:30", end: "11:30" },
  { proId: "giulia", date: "2026-06-24", start: "15:00", end: "16:00" },
  { proId: "elena",  date: "2026-06-24", start: "11:15", end: "12:00" }
];

/* ---- Gallery (matched to real services).
   Each item has icon+label: if the photo fails to load it falls back to a
   clean labelled tile (so a wrong/broken image is never shown). ---- */
const GALLERY_CATS = ["all", "capelli", "colore", "manicure", "sopracciglia", "epilazione", "massaggi"];
const GALLERY = [
  { cat: "capelli",      icon: "scissors",   src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=700&q=80", alt: { it: "Taglio e piega", tr: "Kesim ve fön", en: "Cut & blow-dry" } },
  { cat: "colore",       icon: "droplet",    src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=700&q=80", alt: { it: "Colore capelli", tr: "Saç boyası", en: "Hair colour" } },
  { cat: "manicure",     icon: "hand",       src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=80", alt: { it: "Manicure", tr: "Manikür", en: "Manicure" } },
  { cat: "massaggi",     icon: "flower",     src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=700&q=80", alt: { it: "Massaggio rilassante", tr: "Rahatlatıcı masaj", en: "Relaxing massage" } },
  { cat: "capelli",      icon: "scissors",   src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=700&q=80", alt: { it: "Taglio uomo", tr: "Erkek kesimi", en: "Men's cut" } },
  { cat: "sopracciglia", icon: "eye",        src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80", alt: { it: "Sopracciglia", tr: "Kaş", en: "Brows" } },
  { cat: "manicure",     icon: "hand",       src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=700&q=80", alt: { it: "Nail art", tr: "Nail art", en: "Nail art" } },
  { cat: "epilazione",   icon: "sparkles",   src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80", alt: { it: "Trattamento viso", tr: "Yüz bakımı", en: "Facial treatment" } },
  { cat: "colore",       icon: "droplet",    src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=700&q=80", alt: { it: "Riflessi e schiariture", tr: "Açılmalar", en: "Highlights" } },
  { cat: "massaggi",     icon: "flower",     src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=700&q=80", alt: { it: "Massaggio viso", tr: "Yüz masajı", en: "Face massage" } },
  { cat: "capelli",      icon: "scissors",   src: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=700&q=80", alt: { it: "Styling donna", tr: "Kadın şekillendirme", en: "Women's styling" } },
  { cat: "manicure",     icon: "gem",        src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=700&q=80", alt: { it: "Semipermanente", tr: "Kalıcı oje", en: "Gel polish" } }
];

/* ---- Before / After (Prima / Dopo) — interactive slider ----
   DEMO: foto di esempio. Sostituisci `before` e `after` con le foto reali
   (stessa inquadratura se possibile). `label` = tipo di trasformazione. ---- */
const BEFORE_AFTER = [
  { label: { it: "Balayage", tr: "Balyaj", en: "Balayage" },
    before: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80" },
  { label: { it: "Colore & Piega", tr: "Renk & Fön", en: "Colour & Blow-dry" },
    before: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80" },
  { label: { it: "Taglio & Styling", tr: "Kesim & Şekillendirme", en: "Cut & Styling" },
    before: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1599387737838-626f48a1e89e?auto=format&fit=crop&w=800&q=80" }
];

/* ---- Reviews ----
   DEMO: queste sono recensioni di esempio (realistiche) per mostrare il layout.
   Quando hai le recensioni Google VERE, sostituisci nome / testo (it) / voto /
   data con quelle reali; le traduzioni tr/en le aggiungiamo noi.
   `source: "google"` mostra il badge "Verificata su Google". ---- */
const REVIEWS = [
  { name: "Francesca Rinaldi", rating: 5, date: "2026-05", source: "google",
    text: { it: "Esperienza fantastica! Mi sono affidata a loro per un balayage e il risultato ha superato le aspettative. Personale super professionale e ambiente accogliente. Tornerò sicuramente.", tr: "Harika bir deneyim! Balyaj için onlara güvendim ve sonuç beklentilerimi aştı. Son derece profesyonel ekip ve sıcak bir ortam. Kesinlikle tekrar geleceğim.", en: "Fantastic experience! I trusted them for a balayage and the result exceeded my expectations. Super professional staff and a welcoming space. I'll definitely be back." } },
  { name: "Martina Bonaccini", rating: 5, date: "2026-05", source: "google",
    text: { it: "Manicure semipermanente impeccabile, durata perfetta e tanta cura nei dettagli. Il salone è curatissimo e pulito. Consigliatissimo!", tr: "Kusursuz kalıcı oje manikür, mükemmel dayanıklılık ve detaylara büyük özen. Salon çok bakımlı ve temiz. Kesinlikle tavsiye ederim!", en: "Impeccable gel manicure, perfect lasting and great attention to detail. The salon is spotless and well kept. Highly recommended!" } },
  { name: "Alessandro Ferri", rating: 5, date: "2026-04", source: "google",
    text: { it: "Taglio uomo e barba fatti benissimo, ragazzi molto preparati e simpatici. Prezzi onesti per la qualità del servizio. Lo consiglio a tutti.", tr: "Erkek kesimi ve sakal harika yapıldı, çok bilgili ve sıcak bir ekip. Hizmet kalitesine göre dürüst fiyatlar. Herkese tavsiye ederim.", en: "Men's cut and beard done really well, very skilled and friendly guys. Honest prices for the quality of service. I recommend it to everyone." } },
  { name: "Giulia Pedretti", rating: 5, date: "2026-04", source: "google",
    text: { it: "Taglio e piega sempre perfetti, esco sempre soddisfatta. Sanno consigliarti in base al viso e al tipo di capello. Bravissimi!", tr: "Kesim ve fön her zaman kusursuz, hep memnun ayrılıyorum. Yüzüne ve saç tipine göre öneri yapmayı biliyorlar. Çok başarılılar!", en: "Cut and blow-dry always perfect, I always leave satisfied. They know how to advise you based on your face and hair type. Excellent!" } },
  { name: "Sara Vandelli", rating: 5, date: "2026-03", source: "google",
    text: { it: "Epilazione delicata e veloce, personale gentilissimo e attento all'igiene. Mi sono trovata benissimo, ci tornerò.", tr: "Nazik ve hızlı ağda, çok kibar ve hijyene dikkat eden bir ekip. Çok memnun kaldım, tekrar geleceğim.", en: "Gentle, quick waxing, very kind staff and attentive to hygiene. I had a great experience, I'll come back." } },
  { name: "Chiara Malagoli", rating: 5, date: "2026-03", source: "google",
    text: { it: "Massaggio rilassante davvero rigenerante, atmosfera tranquilla e mani esperte. Un'ora di puro relax nel cuore di Modena.", tr: "Rahatlatıcı masaj gerçekten yenileyiciydi, sakin bir atmosfer ve usta eller. Modena'nın kalbinde bir saatlik saf huzur.", en: "Truly rejuvenating relaxing massage, calm atmosphere and expert hands. An hour of pure relaxation in the heart of Modena." } },
  { name: "Federica Govoni", rating: 4, date: "2026-02", source: "google",
    text: { it: "Ottimo servizio per la ricostruzione unghie, risultato naturale e resistente. Unica nota: nei weekend c'è un po' di attesa, meglio prenotare.", tr: "Tırnak yapımında çok iyi hizmet, doğal ve dayanıklı bir sonuç. Tek not: hafta sonları biraz bekleme oluyor, randevu almak daha iyi.", en: "Great service for nail extensions, natural and long-lasting result. One note: there's a bit of a wait on weekends, better to book." } },
  { name: "Davide Roncaglia", rating: 5, date: "2026-02", source: "google",
    text: { it: "Vado da loro da anni per taglio e colore. Sempre cortesi, puntuali e aggiornati sulle ultime tendenze. Un punto di riferimento a Modena.", tr: "Yıllardır kesim ve renk için onlara gidiyorum. Her zaman nazik, dakik ve son trendlerden haberdarlar. Modena'da bir referans noktası.", en: "I've been going to them for years for cut and colour. Always courteous, punctual and up to date on the latest trends. A landmark in Modena." } }
];

/* ---- FAQ (Italian) — natural long-tail questions people ask AI/Google.
   Answers are short and quotable (front-loaded) for AI retrieval.
   Used BOTH for the visible FAQ section and the FAQPage JSON-LD. ---- */
const FAQ = [
  {
    q: "Quanto costa il taglio uomo a Modena?",
    a: "Il taglio uomo da Estetica Modenese parte da 15 €. Taglio + shampoo da 17 €, mentre il pacchetto completo (taglio, barba, sopracciglia, shampoo e maschera) è 40 €."
  },
  {
    q: "Dove fare il balayage a Modena?",
    a: "Puoi fare il balayage da Estetica Modenese, in Via P. Giardini 386 a Modena. Il balayage parte da 80 €; offriamo anche méches, colpi di luce e Airtouch."
  },
  {
    q: "Serve prenotare?",
    a: "La prenotazione è consigliata ma non obbligatoria. Puoi prenotare online dal sito o su WhatsApp al +39 331 424 5928, scegliendo servizio, operatore, data e orario."
  },
  {
    q: "Quali sono gli orari di Estetica Modenese?",
    a: "Siamo aperti tutti i giorni: dal lunedì al sabato 09:00–20:00 e la domenica 10:00–18:00."
  },
  {
    q: "Fate manicure e pedicure?",
    a: "Sì, facciamo manicure e pedicure. Manicure curativo da 12 €, semipermanente 32 €, ricostruzione unghie da 59 €; pedicure curativo 23 € e pedicure con semipermanente 35 €."
  },
  {
    q: "Fate epilazione e ceretta?",
    a: "Sì, offriamo epilazione e ceretta per donna e uomo: dalle sopracciglia col filo (7 €) ai pacchetti completi corpo. Disponibili anche viso, gambe, inguine e schiena."
  }
];

/* expose */
window.CONFIG = CONFIG;
window.FAQ = FAQ;
window.SALON = SALON; window.WORKING_HOURS = WORKING_HOURS; window.LUNCH = LUNCH;
window.BUFFER_MIN = BUFFER_MIN; window.SLOT_STEP_MIN = SLOT_STEP_MIN;
window.LISTINO = LISTINO; window.SERVICES = SERVICES; window.TEAM = TEAM; window.EXISTING_BOOKINGS = EXISTING_BOOKINGS;
window.GALLERY = GALLERY; window.GALLERY_CATS = GALLERY_CATS; window.REVIEWS = REVIEWS;
window.BEFORE_AFTER = BEFORE_AFTER;
