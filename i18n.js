/* =========================================================================
   TRANSLATIONS — IT (default), TR, EN.
   t(key) returns the string for the active LANG (falls back to IT).
   L(obj) picks the active-language field from a data object {it,tr,en}.
   ========================================================================= */

let LANG = "it";

const I18N = {
  it: {
    // nav
    nav_home: "Home", nav_services: "Servizi", nav_prices: "Prezzi", nav_team: "Team",
    nav_gallery: "Gallery", nav_reviews: "Recensioni", nav_book: "Prenota", nav_contact: "Contatti",
    cta_book_now: "Prenota Ora", cta_whatsapp: "WhatsApp",

    // hero
    hero_title: "La tua bellezza, la nostra passione",
    hero_sub: "Prenota il tuo appuntamento in pochi secondi. Parrucchiere ed estetica unisex a Modena, in Via P. Giardini 386.",
    hero_cta1: "Prenota Ora", hero_cta2: "WhatsApp",
    hero_badge: "Parrucchiere Unisex a Modena",

    // quick booking
    quick_title: "Prenotazione rapida",
    quick_sub: "Scegli il servizio, il professionista e l’orario disponibile.",
    quick_cta: "Inizia la prenotazione",

    // sections (first sentence front-loads the answer for AI/SEO retrieval)
    sec_popular: "Servizi più richiesti",
    sec_popular_sub: "Da Estetica Modenese trovi taglio, colore, balayage, manicure, epilazione e massaggi: i servizi più richiesti, tutti con consulenza personalizzata.",
    sec_why: "Perché sceglierci",
    sec_team: "Il nostro team",
    sec_team_sub: "Il team di Estetica Modenese riunisce parrucchieri, estetiste e nail artist: professionisti qualificati, ognuno con la propria specialità.",
    sec_gallery: "I nostri lavori",
    sec_reviews: "Cosa dicono i clienti",
    sec_location: "Dove siamo",
    view_all: "Vedi tutto",
    sec_beforeafter: "Prima / Dopo", sec_beforeafter_sub: "Trascina per vedere la trasformazione",
    ba_before: "Prima", ba_after: "Dopo", nav_beforeafter: "Prima / Dopo",

    // why us
    why1_t: "Team professionale", why1_d: "Stylist qualificati e sempre aggiornati.",
    why2_t: "Consulenza personalizzata", why2_d: "Ascoltiamo le tue esigenze prima di iniziare.",
    why3_t: "Salone pulito ed elegante", why3_d: "Un ambiente curato e accogliente.",
    why4_t: "Prenotazione facile", why4_d: "Online o su WhatsApp in pochi secondi.",
    why5_t: "Prezzi trasparenti", why5_d: "Tariffe chiare, senza sorprese.",
    why6_t: "Prodotti di qualità", why6_d: "Trattamenti e prodotti professionali.",

    // team / services labels
    specialties: "Specialità", working_days: "Giorni di lavoro", role: "Ruolo", bio: "Bio",
    duration: "Durata", price_from: "A partire da", suitable_pros: "Professionisti",
    book_with: "Prenota con", book_this_service: "Prenota questo servizio", min: "min",

    // prices
    prices_title: "Listino prezzi", prices_sub: "Prezzi indicativi “a partire da”.",
    prices_note: "I prezzi possono variare in base alla lunghezza dei capelli, al trattamento richiesto e alla consulenza professionale.",

    // gallery filters
    g_all: "Tutti", "g_prima-dopo": "Prima / Dopo", g_balayage: "Balayage", g_colore: "Colore",
    "g_taglio-donna": "Taglio Donna", "g_taglio-uomo": "Taglio Uomo", g_barba: "Barba", g_trattamenti: "Trattamenti",

    // reviews
    rev_leave: "Lascia una recensione", rev_read: "Leggi le recensioni",
    rev_verified: "Verificata su Google",
    months: "Gennaio,Febbraio,Marzo,Aprile,Maggio,Giugno,Luglio,Agosto,Settembre,Ottobre,Novembre,Dicembre",

    // booking wizard
    book_title: "Prenota un appuntamento",
    book_sub: "Dal servizio all’orario disponibile in pochi passaggi.",
    step: "Passo",
    step1: "Scegli il servizio", step2: "Scegli il professionista", step3: "Scegli la data",
    step4: "Scegli l’orario", step5: "I tuoi dati", step6: "Riepilogo e conferma",
    any_pro: "Qualsiasi professionista disponibile",
    any_pro_desc: "Ti assegniamo il primo professionista libero.",
    choose_service_first: "Seleziona prima un servizio.",
    choose_pro_first: "Seleziona prima un professionista.",
    choose_date_first: "Seleziona prima una data.",
    no_slots: "Nessuno slot disponibile per questa data. Prova un altro giorno.",
    pro_not_working: "Questo professionista non lavora nella data scelta.",
    slots_available: "Orari disponibili",
    f_name: "Nome e cognome", f_phone: "Telefono", f_email: "Email (facoltativa)", f_notes: "Note (facoltative)",
    ph_name: "Il tuo nome", ph_phone: "+39 ...", ph_email: "nome@email.it", ph_notes: "Es. preferenze, allergie...",
    summary: "Riepilogo appuntamento",
    s_service: "Servizio", s_pro: "Professionista", s_date: "Data", s_time: "Ora",
    s_duration: "Durata", s_price: "Prezzo indicativo", s_name: "Nome", s_phone: "Telefono", s_notes: "Note",
    confirm_method: "Come vuoi inviare la richiesta?",
    send_whatsapp: "Invia richiesta su WhatsApp", send_site: "Invia richiesta dal sito",
    request_note: "La tua richiesta di appuntamento sarà confermata dal salone.",
    success_title: "Richiesta inviata!",
    success_msg: "Grazie! Abbiamo ricevuto la tua richiesta. Il salone ti contatterà per confermare l’appuntamento.",
    new_booking: "Nuova prenotazione",
    next: "Avanti", back: "Indietro",
    err_required: "Inserisci nome e telefono per continuare.",

    // contact
    contact_title: "Contatti", address: "Indirizzo", phone: "Telefono", email: "Email",
    instagram: "Instagram", hours: "Orari di apertura", whatsapp_w: "WhatsApp",
    days_short: { 0: "Dom", 1: "Lun", 2: "Mar", 3: "Mer", 4: "Gio", 5: "Ven", 6: "Sab" },
    days_long: { 0: "Domenica", 1: "Lunedì", 2: "Martedì", 3: "Mercoledì", 4: "Giovedì", 5: "Venerdì", 6: "Sabato" },
    closed: "Chiuso", lunch_note: "Pausa pranzo 13:00–14:00",

    // footer
    foot_about: "Il tuo parrucchiere unisex di fiducia a Modena. Taglio, colore, styling e trattamenti.",
    foot_quick: "Link rapidi", foot_contact: "Contatti", foot_rights: "Tutti i diritti riservati",
    foot_demo: "Demo realizzata per presentazione",

    // whatsapp template
    wa_intro: "Ciao, vorrei prenotare un appuntamento.",
    wa_thanks: "Grazie."
  },

  tr: {
    nav_home: "Anasayfa", nav_services: "Hizmetler", nav_prices: "Fiyatlar", nav_team: "Ekip",
    nav_gallery: "Galeri", nav_reviews: "Yorumlar", nav_book: "Randevu", nav_contact: "İletişim",
    cta_book_now: "Hemen Randevu", cta_whatsapp: "WhatsApp",

    hero_title: "Güzelliğin, bizim tutkumuz",
    hero_sub: "Randevunu saniyeler içinde al. Modena’da unisex kuaför ve güzellik — Via P. Giardini 386.",
    hero_cta1: "Hemen Randevu", hero_cta2: "WhatsApp",
    hero_badge: "Modena’da Unisex Kuaför",

    quick_title: "Hızlı randevu",
    quick_sub: "Hizmeti, uzmanı ve uygun saati seç.",
    quick_cta: "Randevuya başla",

    sec_popular: "En çok tercih edilen hizmetler",
    sec_popular_sub: "Tüm hizmetler kişiye özel danışmanlık içerir.",
    sec_why: "Neden biz",
    sec_team: "Ekibimiz",
    sec_team_sub: "Her biri kendi uzmanlığına sahip nitelikli profesyoneller.",
    sec_gallery: "Çalışmalarımız",
    sec_reviews: "Müşteriler ne diyor",
    sec_location: "Neredeyiz",
    view_all: "Tümünü gör",
    sec_beforeafter: "Öncesi / Sonrası", sec_beforeafter_sub: "Dönüşümü görmek için kaydır",
    ba_before: "Öncesi", ba_after: "Sonrası", nav_beforeafter: "Öncesi / Sonrası",

    why1_t: "Profesyonel ekip", why1_d: "Nitelikli ve güncel stilistler.",
    why2_t: "Kişiye özel danışmanlık", why2_d: "Başlamadan önce isteğini dinleriz.",
    why3_t: "Temiz ve şık salon", why3_d: "Özenli ve sıcak bir ortam.",
    why4_t: "Kolay randevu", why4_d: "Online ya da WhatsApp ile saniyeler içinde.",
    why5_t: "Şeffaf fiyatlar", why5_d: "Net ücretler, sürpriz yok.",
    why6_t: "Kaliteli ürünler", why6_d: "Profesyonel bakım ve ürünler.",

    specialties: "Uzmanlık", working_days: "Çalışma günleri", role: "Görev", bio: "Hakkında",
    duration: "Süre", price_from: "Başlangıç", suitable_pros: "Uzmanlar",
    book_with: "Randevu al:", book_this_service: "Bu hizmete randevu al", min: "dk",

    prices_title: "Fiyat listesi", prices_sub: "“Başlangıç” fiyatları gösterilmiştir.",
    prices_note: "Fiyatlar saç uzunluğuna, talep edilen işleme ve profesyonel danışmanlığa göre değişebilir.",

    g_all: "Tümü", "g_prima-dopo": "Öncesi / Sonrası", g_balayage: "Balyaj", g_colore: "Renk",
    "g_taglio-donna": "Kadın Kesimi", "g_taglio-uomo": "Erkek Kesimi", g_barba: "Sakal", g_trattamenti: "Bakımlar",

    rev_leave: "Yorum bırak", rev_read: "Yorumları oku",
    rev_verified: "Google'da doğrulandı",
    months: "Ocak,Şubat,Mart,Nisan,Mayıs,Haziran,Temmuz,Ağustos,Eylül,Ekim,Kasım,Aralık",

    book_title: "Randevu al",
    book_sub: "Hizmetten uygun saate, birkaç adımda.",
    step: "Adım",
    step1: "Hizmeti seç", step2: "Uzmanı seç", step3: "Tarihi seç",
    step4: "Saati seç", step5: "Bilgilerin", step6: "Özet ve onay",
    any_pro: "Uygun olan herhangi bir uzman",
    any_pro_desc: "İlk müsait uzmanı sana atarız.",
    choose_service_first: "Önce bir hizmet seç.",
    choose_pro_first: "Önce bir uzman seç.",
    choose_date_first: "Önce bir tarih seç.",
    no_slots: "Bu tarihte uygun saat yok. Başka bir gün dene.",
    pro_not_working: "Bu uzman seçilen tarihte çalışmıyor.",
    slots_available: "Uygun saatler",
    f_name: "Ad soyad", f_phone: "Telefon", f_email: "E-posta (isteğe bağlı)", f_notes: "Not (isteğe bağlı)",
    ph_name: "Adın", ph_phone: "+39 ...", ph_email: "ad@email.com", ph_notes: "Örn. tercihler, alerjiler...",
    summary: "Randevu özeti",
    s_service: "Hizmet", s_pro: "Uzman", s_date: "Tarih", s_time: "Saat",
    s_duration: "Süre", s_price: "Tahmini fiyat", s_name: "Ad", s_phone: "Telefon", s_notes: "Not",
    confirm_method: "İsteği nasıl göndermek istersin?",
    send_whatsapp: "WhatsApp ile gönder", send_site: "Site üzerinden gönder",
    request_note: "Randevu talebin salon tarafından onaylanacaktır.",
    success_title: "Talep gönderildi!",
    success_msg: "Teşekkürler! Talebini aldık. Salon randevuyu onaylamak için seninle iletişime geçecek.",
    new_booking: "Yeni randevu",
    next: "İleri", back: "Geri",
    err_required: "Devam etmek için ad ve telefon gir.",

    contact_title: "İletişim", address: "Adres", phone: "Telefon", email: "E-posta",
    instagram: "Instagram", hours: "Çalışma saatleri", whatsapp_w: "WhatsApp",
    days_short: { 0: "Paz", 1: "Pzt", 2: "Sal", 3: "Çar", 4: "Per", 5: "Cum", 6: "Cmt" },
    days_long: { 0: "Pazar", 1: "Pazartesi", 2: "Salı", 3: "Çarşamba", 4: "Perşembe", 5: "Cuma", 6: "Cumartesi" },
    closed: "Kapalı", lunch_note: "Öğle arası 13:00–14:00",

    foot_about: "Modena’da güvenilir unisex kuaförün. Kesim, renk, şekillendirme ve bakım.",
    foot_quick: "Hızlı bağlantılar", foot_contact: "İletişim", foot_rights: "Tüm hakları saklıdır",
    foot_demo: "Sunum için hazırlanan demo",

    wa_intro: "Merhaba, bir randevu almak istiyorum.",
    wa_thanks: "Teşekkürler."
  },

  en: {
    nav_home: "Home", nav_services: "Services", nav_prices: "Prices", nav_team: "Team",
    nav_gallery: "Gallery", nav_reviews: "Reviews", nav_book: "Book", nav_contact: "Contact",
    cta_book_now: "Book Now", cta_whatsapp: "WhatsApp",

    hero_title: "Your beauty, our passion",
    hero_sub: "Book your appointment in seconds. Unisex hair & beauty in Modena — Via P. Giardini 386.",
    hero_cta1: "Book Now", hero_cta2: "WhatsApp",
    hero_badge: "Unisex Hair Salon in Modena",

    quick_title: "Quick booking",
    quick_sub: "Choose the service, the professional and an available time.",
    quick_cta: "Start booking",

    sec_popular: "Most requested services",
    sec_popular_sub: "All services include a personalised consultation.",
    sec_why: "Why choose us",
    sec_team: "Our team",
    sec_team_sub: "Qualified professionals, each with their own specialty.",
    sec_gallery: "Our work",
    sec_beforeafter: "Before / After", sec_beforeafter_sub: "Drag to see the transformation",
    ba_before: "Before", ba_after: "After", nav_beforeafter: "Before / After",
    sec_reviews: "What clients say",
    sec_location: "Find us",
    view_all: "View all",

    why1_t: "Professional team", why1_d: "Qualified, always up-to-date stylists.",
    why2_t: "Personalised consultation", why2_d: "We listen to your needs before we start.",
    why3_t: "Clean & elegant salon", why3_d: "A neat, welcoming environment.",
    why4_t: "Easy booking", why4_d: "Online or on WhatsApp in seconds.",
    why5_t: "Transparent prices", why5_d: "Clear rates, no surprises.",
    why6_t: "Quality products", why6_d: "Professional treatments and products.",

    specialties: "Specialties", working_days: "Working days", role: "Role", bio: "Bio",
    duration: "Duration", price_from: "From", suitable_pros: "Professionals",
    book_with: "Book with", book_this_service: "Book this service", min: "min",

    prices_title: "Price list", prices_sub: "Indicative “from” prices.",
    prices_note: "Prices may vary depending on hair length, the requested treatment and professional consultation.",

    g_all: "All", "g_prima-dopo": "Before / After", g_balayage: "Balayage", g_colore: "Colour",
    "g_taglio-donna": "Women's Cut", "g_taglio-uomo": "Men's Cut", g_barba: "Beard", g_trattamenti: "Treatments",

    rev_leave: "Leave a review", rev_read: "Read reviews",
    rev_verified: "Verified on Google",
    months: "January,February,March,April,May,June,July,August,September,October,November,December",

    book_title: "Book an appointment",
    book_sub: "From service to available time in a few steps.",
    step: "Step",
    step1: "Choose service", step2: "Choose professional", step3: "Choose date",
    step4: "Choose time", step5: "Your details", step6: "Summary & confirm",
    any_pro: "Any available professional",
    any_pro_desc: "We'll assign the first available professional.",
    choose_service_first: "Select a service first.",
    choose_pro_first: "Select a professional first.",
    choose_date_first: "Select a date first.",
    no_slots: "No slots available for this date. Try another day.",
    pro_not_working: "This professional does not work on the selected date.",
    slots_available: "Available times",
    f_name: "Full name", f_phone: "Phone", f_email: "Email (optional)", f_notes: "Notes (optional)",
    ph_name: "Your name", ph_phone: "+39 ...", ph_email: "name@email.com", ph_notes: "E.g. preferences, allergies...",
    summary: "Appointment summary",
    s_service: "Service", s_pro: "Professional", s_date: "Date", s_time: "Time",
    s_duration: "Duration", s_price: "Estimated price", s_name: "Name", s_phone: "Phone", s_notes: "Notes",
    confirm_method: "How do you want to send the request?",
    send_whatsapp: "Send request on WhatsApp", send_site: "Send request from the site",
    request_note: "Your appointment request will be confirmed by the salon.",
    success_title: "Request sent!",
    success_msg: "Thank you! We received your request. The salon will contact you to confirm the appointment.",
    new_booking: "New booking",
    next: "Next", back: "Back",
    err_required: "Enter name and phone to continue.",

    contact_title: "Contact", address: "Address", phone: "Phone", email: "Email",
    instagram: "Instagram", hours: "Opening hours", whatsapp_w: "WhatsApp",
    days_short: { 0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat" },
    days_long: { 0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday" },
    closed: "Closed", lunch_note: "Lunch break 13:00–14:00",

    foot_about: "Your trusted unisex hair salon in Modena. Cut, colour, styling and treatments.",
    foot_quick: "Quick links", foot_contact: "Contact", foot_rights: "All rights reserved",
    foot_demo: "Demo built for presentation",

    wa_intro: "Hi, I'd like to book an appointment.",
    wa_thanks: "Thank you."
  }
};

/* ---- additions / overrides for Estetica Modenese ---- */
Object.assign(I18N.it, {
  nav_services: "Servizi e Prezzi",
  maps_btn: "Apri su Google Maps", directions: "Come arrivare", slot_note: "Appuntamenti ogni 45 min",
  open_everyday: "Aperti tutti i giorni",
  listino_title: "Servizi e Prezzi", listino_sub: "Il taglio uomo parte da 15 €, il taglio donna da 20 € e il balayage da 80 €. Tocca una categoria per vedere tutti i trattamenti e i prezzi.",
  book_cat: "Categoria", services_count: "trattamenti", prenota_short: "Prenota",
  g_capelli: "Capelli", g_colore: "Colore", g_sopracciglia: "Sopracciglia",
  g_manicure: "Manicure", g_epilazione: "Epilazione", g_massaggi: "Massaggi",
  sec_faq: "Domande frequenti", sec_faq_sub: "Le risposte alle domande più comuni su servizi, prezzi, orari e prenotazioni.",
  g_reviews_title: "Recensioni Google", g_reviews_based: "su Google",
  g_reviews_count: "recensioni", g_reviews_read: "Leggi su Google", g_reviews_write: "Lascia una recensione su Google",
  mb_call: "Chiama", mb_directions: "Indicazioni"
});
Object.assign(I18N.tr, {
  nav_services: "Hizmetler ve Fiyatlar",
  maps_btn: "Google Haritalar'da Aç", directions: "Yol tarifi", slot_note: "45 dk’lık randevular",
  open_everyday: "Her gün açık",
  listino_title: "Hizmetler ve Fiyatlar", listino_sub: "Hizmetleri ve fiyatları görmek için bir kategoriye dokun.",
  book_cat: "Kategori", services_count: "hizmet", prenota_short: "Randevu al",
  g_capelli: "Saç", g_colore: "Renk", g_sopracciglia: "Kaş",
  g_manicure: "Manikür", g_epilazione: "Epilasyon", g_massaggi: "Masaj",
  sec_faq: "Sıkça sorulan sorular", sec_faq_sub: "Hizmetler, fiyatlar, çalışma saatleri ve randevular hakkında en sık sorulan soruların yanıtları.",
  g_reviews_title: "Google Yorumları", g_reviews_based: "Google üzerinden",
  g_reviews_count: "yorum", g_reviews_read: "Google'da oku", g_reviews_write: "Google'da değerlendir",
  mb_call: "Ara", mb_directions: "Yol tarifi"
});
Object.assign(I18N.en, {
  nav_services: "Services & Prices",
  maps_btn: "Open in Google Maps", directions: "Get directions", slot_note: "45-min appointments",
  open_everyday: "Open every day",
  listino_title: "Services & Prices", listino_sub: "Tap a category to see treatments and prices.",
  book_cat: "Category", services_count: "treatments", prenota_short: "Book",
  g_capelli: "Hair", g_colore: "Colour", g_sopracciglia: "Brows",
  g_manicure: "Manicure", g_epilazione: "Waxing", g_massaggi: "Massage",
  sec_faq: "Frequently asked questions", sec_faq_sub: "Answers to the most common questions about services, prices, hours and bookings.",
  g_reviews_title: "Google Reviews", g_reviews_based: "on Google",
  g_reviews_count: "reviews", g_reviews_read: "Read on Google", g_reviews_write: "Leave a Google review",
  mb_call: "Call", mb_directions: "Directions"
});

function t(key) {
  const d = I18N[LANG] || I18N.it;
  return (d[key] !== undefined ? d[key] : (I18N.it[key] !== undefined ? I18N.it[key] : key));
}
function L(obj) { return obj ? (obj[LANG] || obj.it || "") : ""; }
function dayShort(wd) { return (I18N[LANG] || I18N.it).days_short[wd]; }
function dayLong(wd) { return (I18N[LANG] || I18N.it).days_long[wd]; }

window.t = t; window.L = L; window.dayShort = dayShort; window.dayLong = dayLong;
window.I18N = I18N;
