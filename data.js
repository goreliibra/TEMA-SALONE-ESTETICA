/* =========================================================================
   DATA LAYER — Estetica Modenese (E&M)
   Single source of truth. Backend-ready (same shape can come from an API).
   ========================================================================= */

/* ---- Salon / LocalBusiness info ---- */
const SALON = {
  name: "Estetica Modenese",
  short: "E&M",
  tagline: { it: "Estetica & Parrucchieri Unisex · Modena", tr: "Güzellik & Unisex Kuaför · Modena", en: "Beauty & Unisex Hair · Modena" },
  addressLine: "Via P. Giardini 386",
  city: "Modena",
  zip: "41125",
  province: "MO",
  country: "Italia",
  phone: "+39 331 424 5928",
  phoneHref: "+393314245928",
  whatsapp: "393314245928",                 // digits only, no +
  email: "",                                 // (non fornita)
  instagram: "@esteticamodenese",
  instagramUrl: "https://www.instagram.com/esteticamodenese/",
  // Google Maps
  mapsEmbed: "https://maps.google.com/maps?q=Estetica%20Modenese%2C%20Via%20Giardini%20386%2C%20Modena&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Estetica%20Modenese%20Via%20Giardini%20386%20Modena",
  directions: "https://www.google.com/maps/dir/?api=1&destination=Via%20P.%20Giardini%20386%2C%20Modena",
  geo: { lat: 44.6200, lng: 10.9170 }
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
    id: "capelli-donna", icon: "💇‍♀️",
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
    id: "capelli-uomo", icon: "💈",
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
    id: "epilazione", icon: "🪒",
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
    id: "manicure", icon: "💅",
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
    id: "pedicure", icon: "🦶",
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
    id: "massaggi", icon: "💆‍♀️",
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
  { cat: "capelli",      icon: "💇‍♀️", src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=700&q=80", alt: { it: "Taglio e piega", tr: "Kesim ve fön", en: "Cut & blow-dry" } },
  { cat: "colore",       icon: "🎨", src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=700&q=80", alt: { it: "Colore capelli", tr: "Saç boyası", en: "Hair colour" } },
  { cat: "manicure",     icon: "💅", src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=80", alt: { it: "Manicure", tr: "Manikür", en: "Manicure" } },
  { cat: "massaggi",     icon: "💆‍♀️", src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=700&q=80", alt: { it: "Massaggio rilassante", tr: "Rahatlatıcı masaj", en: "Relaxing massage" } },
  { cat: "capelli",      icon: "💈", src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=700&q=80", alt: { it: "Taglio uomo", tr: "Erkek kesimi", en: "Men's cut" } },
  { cat: "sopracciglia", icon: "👁️", src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80", alt: { it: "Sopracciglia", tr: "Kaş", en: "Brows" } },
  { cat: "manicure",     icon: "💅", src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=700&q=80", alt: { it: "Nail art", tr: "Nail art", en: "Nail art" } },
  { cat: "epilazione",   icon: "✨", src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80", alt: { it: "Trattamento viso", tr: "Yüz bakımı", en: "Facial treatment" } },
  { cat: "colore",       icon: "🖌️", src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=700&q=80", alt: { it: "Riflessi e schiariture", tr: "Açılmalar", en: "Highlights" } },
  { cat: "massaggi",     icon: "🌿", src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=700&q=80", alt: { it: "Massaggio viso", tr: "Yüz masajı", en: "Face massage" } },
  { cat: "capelli",      icon: "💇‍♀️", src: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=700&q=80", alt: { it: "Styling donna", tr: "Kadın şekillendirme", en: "Women's styling" } },
  { cat: "manicure",     icon: "💎", src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=700&q=80", alt: { it: "Semipermanente", tr: "Kalıcı oje", en: "Gel polish" } }
];

/* ---- Reviews ---- */
const REVIEWS = [
  { name: "Francesca R.", rating: 5, date: "2026-05",
    text: { it: "Professionalità e accoglienza top. Il mio balayage è perfetto!", tr: "Profesyonellik ve sıcaklık üst düzey. Balyajım kusursuz!", en: "Top professionalism and warmth. My balayage is perfect!" } },
  { name: "Martina B.", rating: 5, date: "2026-04",
    text: { it: "Manicure semipermanente impeccabile e ambiente curatissimo.", tr: "Kusursuz kalıcı oje ve çok özenli ortam.", en: "Impeccable gel manicure and a very neat space." } },
  { name: "Sara V.", rating: 5, date: "2026-04",
    text: { it: "Epilazione delicata e veloce, personale gentilissimo.", tr: "Nazik ve hızlı ağda, çok kibar ekip.", en: "Gentle, quick waxing and very kind staff." } },
  { name: "Giulia P.", rating: 5, date: "2026-03",
    text: { it: "Taglio e piega sempre perfetti. Consigliatissimo!", tr: "Kesim ve fön her zaman kusursuz. Kesinlikle tavsiye!", en: "Cut and blow-dry always perfect. Highly recommended!" } }
];

/* expose */
window.SALON = SALON; window.WORKING_HOURS = WORKING_HOURS; window.LUNCH = LUNCH;
window.BUFFER_MIN = BUFFER_MIN; window.SLOT_STEP_MIN = SLOT_STEP_MIN;
window.LISTINO = LISTINO; window.SERVICES = SERVICES; window.TEAM = TEAM; window.EXISTING_BOOKINGS = EXISTING_BOOKINGS;
window.GALLERY = GALLERY; window.GALLERY_CATS = GALLERY_CATS; window.REVIEWS = REVIEWS;
