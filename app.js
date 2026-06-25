/* =========================================================================
   APP — Estetica Modenese
   router · views · accordion listino (con Prenota) · team · booking wizard · i18n
   ========================================================================= */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const BE = window.BookingEngine;
  const ROUTES = ["home", "services", "team", "gallery", "reviews", "book", "contact"];

  const serviceName = (id) => (BE.getService(id) ? L(BE.getService(id).name) : id);
  const proName = (id) => (BE.getPro(id) ? BE.getPro(id).name : id);
  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);
  const waLink = (text) => `https://wa.me/${SALON.whatsapp}?text=` + encodeURIComponent(text);
  const defaultWa = () => waLink(t("wa_intro"));
  const initials = (n) => n.split(/\s+/).map(x => x[0]).slice(0, 2).join("").toUpperCase();
  // fallback for any failed image → keep layout clean, never show a wrong photo
  const imgFallback = "this.style.display='none';this.parentNode.classList.add('noimg')";

  /* ---------------- ICONS ----------------
     Inline SVG line icons (Lucide style, MIT). No external CDN, no emoji.
     icon(name) → <svg> string. Color is inherited via currentColor, so set
     the colour with CSS on the parent (we use the gold accent). To add a new
     icon, paste the inner paths of any Lucide glyph here keyed by its name. */
  const ICONS = {
    gem:           '<path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>',
    "message-circle":'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
    sparkles:      '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
    "calendar-check":'<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18M8 2v4M16 2v4M9 16l2 2 4-4"/>',
    wallet:        '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/><path d="M18 12a.5.5 0 0 0 0 1 .5.5 0 0 0 0-1Z"/>',
    droplet:       '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
    scissors:      '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.12 8.12 20 20M14.8 14.8 20 4M8.12 15.88 12 12"/>',
    hand:          '<path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
    footprints:    '<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path d="M16 17h4M4 13h4"/>',
    flower:        '<circle cx="12" cy="12" r="3"/><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"/><path d="M12 7.5V9M7.5 12H9M12 16.5V15M16.5 12H15"/>',
    eye:           '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    "map-pin":     '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    phone:         '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>',
    "message-square":'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    instagram:     '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
    clock:         '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    navigation:    '<path d="M3 11l19-9-9 19-2-8-8-2z"/>'
  };
  function icon(name, cls) {
    const body = ICONS[name] || ICONS.sparkles;
    return `<svg class="ic-svg${cls ? " " + cls : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
  }

  /* ---------------- VIEWS ---------------- */
  const views = {};

  /* Hero background: premium looping video when CONFIG.HERO_VIDEO is set
     (autoplay, muted, loop, inline, mobile-friendly, with the photo as poster
     + fallback). When empty, the CSS photo background is used as before. */
  function heroMedia() {
    const C = window.CONFIG || {};
    if (!C.HERO_VIDEO) return "";
    return `<video class="hero-video" autoplay muted loop playsinline preload="auto"
      poster="${C.HERO_IMAGE || ""}">
      <source src="${C.HERO_VIDEO}" type="video/mp4">
    </video>`;
  }

  views.home = () => `
    <section class="hero${(window.CONFIG && CONFIG.HERO_VIDEO) ? ' has-video' : ''}">
      ${heroMedia()}
      <div class="hero-overlay" aria-hidden="true"></div>
      <div class="wrap"><div class="hero-inner reveal in">
        <span class="eyebrow">${L(SALON.tagline)}</span>
        <h1>${t("hero_title")}</h1>
        <p>${t("hero_sub")}</p>
        <div class="hero-actions">
          <a href="#book" class="btn btn-gold">${t("hero_cta1")}</a>
          <a href="${defaultWa()}" target="_blank" rel="noopener" class="btn btn-wa">${icon("message-square")} ${t("hero_cta2")}</a>
        </div>
      </div></div>
    </section>

    <section class="section tight"><div class="wrap">
      <div class="quickband reveal">
        <div><h3>${t("quick_title")}</h3><p>${t("quick_sub")}</p></div>
        <a href="#book" class="btn btn-gold">${t("quick_cta")}</a>
      </div>
    </div></section>

    <section class="section"><div class="wrap">
      <div class="section-head center reveal"><span class="eyebrow">${t("nav_services")}</span><h2>${t("sec_popular")}</h2><p>${t("sec_popular_sub")}</p></div>
      <div class="grid grid-3 reveal">${popularCards()}</div>
      <div class="center" style="margin-top:34px"><a href="#services" class="btn btn-ghost">${t("view_all")}</a></div>
    </div></section>

    <section class="section beige"><div class="wrap">
      <div class="section-head center reveal"><span class="eyebrow">${SALON.name}</span><h2>${t("sec_why")}</h2></div>
      <div class="grid grid-3 reveal">
        ${[1,2,3,4,5,6].map(i => `<div class="why-card"><div class="ic">${icon(["gem","message-circle","sparkles","calendar-check","wallet","droplet"][i-1])}</div><h4>${t("why"+i+"_t")}</h4><p>${t("why"+i+"_d")}</p></div>`).join("")}
      </div>
    </div></section>

    <section class="section"><div class="wrap">
      <div class="section-head center reveal"><span class="eyebrow">${t("nav_team")}</span><h2>${t("sec_team")}</h2><p>${t("sec_team_sub")}</p></div>
      <div class="grid grid-3 reveal">${TEAM.map(teamCard).join("")}</div>
    </div></section>

    <section class="section beige"><div class="wrap">
      <div class="section-head center reveal"><span class="eyebrow">${t("nav_gallery")}</span><h2>${t("sec_gallery")}</h2></div>
      <div class="gal-grid reveal">${GALLERY.slice(0,8).map(galFig).join("")}</div>
      <div class="center" style="margin-top:34px"><a href="#gallery" class="btn btn-ghost">${t("view_all")}</a></div>
    </div></section>

    <section class="section"><div class="wrap">
      <div class="section-head center reveal"><span class="eyebrow">★★★★★</span><h2>${t("sec_reviews")}</h2></div>
      <div class="grid grid-2 reveal">${REVIEWS.map(revCard).join("")}</div>
      <div class="rev-actions">
        <a href="#reviews" class="btn btn-ghost btn-sm">${t("rev_read")}</a>
        <a href="${SALON.mapsLink}" target="_blank" rel="noopener" class="btn btn-gold btn-sm">${t("rev_leave")}</a>
      </div>
    </div></section>

    ${faqSection()}

    ${locationSection()}
  `;

  /* SERVICES = accordion listino (click to open, chevron, per-row Prenota) */
  views.services = () => `
    <div class="wrap page-head"><div class="section-head center reveal in">
      <span class="eyebrow">${t("nav_services")}</span><h2>${t("listino_title")}</h2><p>${t("listino_sub")}</p>
    </div></div>
    <section class="section tight"><div class="wrap">
      <div class="accordion reveal" id="accordion">
        ${LISTINO.map((cat, idx) => `
          <div class="acc-item ${idx===0?'open':''}" data-cat="${cat.id}">
            <button class="acc-head" aria-expanded="${idx===0}">
              <span class="acc-ic">${icon(cat.icon)}</span>
              <span class="acc-title">${L(cat.label)}</span>
              <span class="acc-count">${cat.items.length} ${t("services_count")}</span>
              <span class="acc-chevron" aria-hidden="true">⌄</span>
            </button>
            <div class="acc-body"><div class="acc-list">
              ${cat.items.map(it => accRow(cat, it)).join("")}
            </div></div>
          </div>`).join("")}
      </div>
      <p class="price-note">${t("prices_note")}</p>
      <div class="center" style="margin-top:26px"><a href="#book" class="btn btn-gold">${t("cta_book_now")}</a></div>
    </div></section>
  `;

  views.team = () => `
    <div class="wrap page-head"><div class="section-head center reveal in">
      <span class="eyebrow">${t("nav_team")}</span><h2>${t("sec_team")}</h2><p>${t("sec_team_sub")}</p>
    </div></div>
    <section class="section tight"><div class="wrap">
      <div class="grid grid-3 reveal">${TEAM.map(teamCardFull).join("")}</div>
    </div></section>
  `;

  views.gallery = () => `
    <div class="wrap page-head"><div class="section-head center reveal in"><span class="eyebrow">${t("nav_gallery")}</span><h2>${t("sec_gallery")}</h2></div></div>
    <section class="section tight"><div class="wrap">
      <div class="gal-filters reveal" id="galFilters">
        ${GALLERY_CATS.map((c, i) => `<button data-cat="${c}" class="${i===0?'active':''}">${t("g_"+c)}</button>`).join("")}
      </div>
      <div class="gal-grid reveal" id="galGrid">${GALLERY.map(galFig).join("")}</div>
    </div></section>
  `;

  views.reviews = () => `
    <div class="wrap page-head"><div class="section-head center reveal in"><span class="eyebrow">★★★★★</span><h2>${t("sec_reviews")}</h2></div></div>
    ${googleReviews()}
    <section class="section tight"><div class="wrap">
      <div class="grid grid-2 reveal">${REVIEWS.map(revCard).join("")}</div>
      <div class="rev-actions">
        <a href="${SALON.mapsLink}" target="_blank" rel="noopener" class="btn btn-gold btn-sm">${t("rev_leave")}</a>
        <a href="#book" class="btn btn-ghost btn-sm">${t("cta_book_now")}</a>
      </div>
    </div></section>
  `;

  views.contact = () => `
    <div class="wrap page-head"><div class="section-head center reveal in"><span class="eyebrow">${t("nav_contact")}</span><h2>${t("contact_title")}</h2></div></div>
    <section class="section tight">${locationInner()}</section>
  `;

  views.book = () => `
    <div class="wrap page-head"><div class="section-head center reveal in"><span class="eyebrow">${t("nav_book")}</span><h2>${t("book_title")}</h2><p>${t("book_sub")}</p></div></div>
    <section class="section tight"><div class="wrap"><div class="wizard reveal in" id="wizard"></div></div></section>
  `;

  /* ---------------- builders ---------------- */
  function formatPrice(p) {
    if (typeof p === "string" && /^da\s/i.test(p)) return `<small>${t("price_from")}</small>${p.replace(/^da\s/i, "")}`;
    return p;
  }
  function formatPriceText(p) { return typeof p === "string" ? p.replace(/^da\s/i, t("price_from") + " ") : p; }
  function serviceIdFor(cat, it) {
    const s = SERVICES.find(x => x.cat === cat.id && L(x.name) === L(it.name));
    return s ? s.id : null;
  }
  function accRow(cat, it) {
    // EVERY service row gets the same booking button. If the item is wired to
    // the booking engine (book:true) we preselect it; otherwise the button just
    // opens the booking flow (user picks the service in step 1). Same look,
    // same position, same action for all rows — no service without a button.
    const sid = it.book ? serviceIdFor(cat, it) : null;
    const btn = sid
      ? `<a href="#book" class="row-book" data-book-service="${sid}">${t("prenota_short")}</a>`
      : `<a href="#book" class="row-book">${t("prenota_short")}</a>`;
    return `<div class="price-row">
      <div class="pn"><b>${L(it.name)}</b></div>
      <div class="pp">${formatPrice(it.price)}</div>
      <div class="pa">${btn}</div>
    </div>`;
  }
  function popularCards() {
    const picks = ["balayage", "manicure", "massaggi", "taglio", "epilazione", "pedicure"];
    // pick one bookable service per a few categories for variety
    const cats = ["capelli-donna", "manicure", "massaggi", "capelli-uomo", "epilazione", "pedicure"];
    return cats.map(c => { const s = SERVICES.find(x => x.cat === c); return s ? svcCard(s) : ""; }).filter(Boolean).slice(0, 6).join("");
  }
  function svcCard(s) {
    return `<div class="svc-card">
      <div class="svc-ic">${icon(s.icon)}</div>
      <div class="svc-cat-tag">${L(s.catLabel)}</div>
      <h3>${L(s.name)}</h3>
      <div class="svc-meta"><span>${t("duration")}: <b>${s.duration} ${t("min")}</b></span></div>
      <div class="svc-price">${formatPrice(s.price)}</div>
      <a href="#book" class="btn btn-dark btn-sm" style="margin-top:16px" data-book-service="${s.id}">${t("book_this_service")}</a>
    </div>`;
  }
  function teamCard(p) {
    return `<div class="team-card">
      <div class="team-photo-wrap"><img class="team-photo" src="${p.photo}" alt="${p.name} — ${L(p.role)}" loading="lazy" decoding="async" onerror="${imgFallback}"><span class="team-photo-fallback">${initials(p.name)}</span></div>
      <div class="team-body">
        <h3>${p.name}</h3>
        <div class="team-role">${L(p.role)}</div>
        <a href="#book" class="btn btn-dark btn-sm" data-book-pro="${p.id}">${t("book_with")} ${p.name}</a>
      </div>
    </div>`;
  }
  function teamCardFull(p) {
    return `<div class="team-card">
      <div class="team-photo-wrap"><img class="team-photo" src="${p.photo}" alt="${p.name} — ${L(p.role)}" loading="lazy" decoding="async" onerror="${imgFallback}"><span class="team-photo-fallback">${initials(p.name)}</span></div>
      <div class="team-body">
        <h3>${p.name}</h3>
        <div class="team-role">${L(p.role)}</div>
        <p class="bio">${L(p.bio)}</p>
        <div class="tags">${p.specialties.map(cid => { const c = LISTINO.find(x => x.id === cid); return c ? `<span>${L(c.label)}</span>` : ""; }).join("")}</div>
        <a href="#book" class="btn btn-dark btn-sm" data-book-pro="${p.id}">${t("book_with")} ${p.name}</a>
      </div>
    </div>`;
  }
  function galFig(g) {
    // Responsive drop-in placeholder: fixed 1:1 box (CSS), lazy + async, alt text.
    // To use real photos, just replace each GALLERY[].src in data.js — layout
    // never shifts and a labelled tile shows until/if a photo is missing.
    return `<figure data-cat="${g.cat}">
      <img src="${g.src}" alt="${L(g.alt)}" loading="lazy" decoding="async" onerror="${imgFallback}">
      <span class="gal-fallback">${icon(g.icon || "sparkles")}<small>${L(g.alt)}</small></span>
      <figcaption>${L(g.alt)}</figcaption>
    </figure>`;
  }
  function revCard(r) {
    const verified = r.source === "google"
      ? `<span class="rev-verified" title="${t("rev_verified")}">${googleGsm}${t("rev_verified")}</span>`
      : "";
    return `<div class="rev-card">
      <div class="rev-top"><div class="stars">${stars(r.rating)}</div>${verified}</div>
      <p>“${L(r.text)}”</p>
      <div class="rev-who"><div class="rev-av">${r.name[0]}</div><div><b>${r.name}</b><small>${revDate(r.date)}</small></div></div>
    </div>`;
  }
  /* small Google "G" for the verified badge on each review card */
  const googleGsm = `<svg class="rev-g" viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>`;
  /* "2026-05" → localized "Maggio 2026" / "Mayıs 2026" / "May 2026" */
  function revDate(s) {
    if (!s || s.indexOf("-") < 0) return s || "";
    const parts = s.split("-"), y = parts[0], m = parseInt(parts[1], 10);
    const arr = (t("months") || "").split(",");
    return (arr[m - 1] ? arr[m - 1] + " " : "") + y;
  }
  function hoursRows() {
    const todayWd = new Date().getDay();
    return [1,2,3,4,5,6,0].map(wd => {
      const h = WORKING_HOURS[wd];
      const val = h ? `${h.open} – ${h.close}` : t("closed");
      return `<div class="hours-row ${wd===todayWd?'today':''}"><span>${dayLong(wd)}</span><b>${val}</b></div>`;
    }).join("");
  }
  function locationSection() {
    return `<section class="section beige"><div class="wrap">
      <div class="section-head center reveal"><span class="eyebrow">${t("nav_contact")}</span><h2>${t("sec_location")}</h2></div>
      ${locationInner()}
    </div></section>`;
  }
  /* Google reviews block: official multi-colour "G", rating, count + buttons.
     Data lives in CONFIG (GOOGLE_RATING / GOOGLE_REVIEWS_COUNT / GOOGLE_REVIEW_URL). */
  const googleG = `<svg class="g-logo" viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>`;
  function googleReviews() {
    const C = window.CONFIG || {};
    const rating = C.GOOGLE_RATING, count = C.GOOGLE_REVIEWS_COUNT;
    if (!rating) return "";
    const url = C.GOOGLE_REVIEW_URL || SALON.mapsLink;
    const full = Math.floor(rating), half = rating - full >= 0.5;
    const starRow = "★".repeat(full) + (half ? "⯪" : "") + "☆".repeat(5 - full - (half ? 1 : 0));
    const ratingTxt = String(rating).replace(".", ",");
    return `<section class="section beige"><div class="wrap">
      <div class="g-rev-card reveal">
        <div class="g-rev-head">${googleG}<div><h3>${t("g_reviews_title")}</h3>
          <div class="g-rev-score"><b>${ratingTxt}</b><span class="g-stars">${starRow}</span>
          <small>${count} ${t("g_reviews_count")} ${t("g_reviews_based")}</small></div></div></div>
        <div class="g-rev-actions">
          <a href="${url}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">${t("g_reviews_read")}</a>
          <a href="${url}" target="_blank" rel="noopener" class="btn btn-gold btn-sm">${t("g_reviews_write")}</a>
        </div>
      </div>
    </div></section>`;
  }
  /* FAQ — long-tail Q&A (data: FAQ in data.js). Native <details> = accessible,
     no JS needed, fully portable. Answers are front-loaded for AI retrieval.
     FAQPage JSON-LD is generated separately from the same data by seo.js. */
  function faqSection() {
    if (!window.FAQ || !FAQ.length) return "";
    return `<section class="section"><div class="wrap">
      <div class="section-head center reveal"><span class="eyebrow">FAQ</span><h2>${t("sec_faq")}</h2><p>${t("sec_faq_sub")}</p></div>
      <div class="faq reveal">
        ${FAQ.map((f, i) => `<details class="faq-item"${i===0?" open":""}>
          <summary>${f.q}<span class="faq-chevron" aria-hidden="true">⌄</span></summary>
          <div class="faq-a">${f.a}</div>
        </details>`).join("")}
      </div>
    </div></section>`;
  }
  const logoSvg = `<svg viewBox="0 0 200 200" class="logo-em" role="img" aria-label="Estetica Modenese">
    <text x="100" y="92" text-anchor="middle" fill="#fff" font-family="'Cormorant Garamond',Georgia,serif" font-size="78" font-weight="600" letter-spacing="-2">E&amp;M</text>
    <line x1="58" y1="118" x2="142" y2="118" stroke="#fff" stroke-width="1.4" opacity=".55"/>
    <text x="100" y="142" text-anchor="middle" fill="#fff" font-family="'Jost',sans-serif" font-size="17" font-weight="300" letter-spacing="6">ESTETICA</text>
    <text x="100" y="166" text-anchor="middle" fill="#fff" font-family="'Jost',sans-serif" font-size="17" font-weight="300" letter-spacing="6">MODENESE</text></svg>`;
  function locationInner() {
    return `<div class="wrap"><div class="contact-grid reveal">
      <div class="info-card">
        <div class="info-item"><div class="ic">${icon("map-pin")}</div><div>
          <h4>${t("address")}</h4>
          <p><b>${SALON.name}</b><br>${SALON.addressLine}, ${SALON.zip} ${SALON.city} (${SALON.province})</p>
          <a href="${SALON.directions}" target="_blank" rel="noopener" class="btn btn-dark btn-sm" style="margin-top:10px">${icon("navigation")} ${t("directions")}</a>
        </div></div>
        <div class="info-item"><div class="ic">${icon("phone")}</div><div><h4>${t("phone")}</h4><a href="tel:${SALON.phoneHref}">${SALON.phone}</a></div></div>
        <div class="info-item"><div class="ic">${icon("message-square")}</div><div><h4>${t("whatsapp_w")}</h4><a href="${defaultWa()}" target="_blank" rel="noopener">${SALON.phone}</a></div></div>
        <div class="info-item"><div class="ic">${icon("instagram")}</div><div><h4>${t("instagram")}</h4><a href="${SALON.instagramUrl}" target="_blank" rel="noopener">${SALON.instagram}</a></div></div>
        <div class="info-item"><div class="ic">${icon("clock")}</div><div style="flex:1"><h4>${t("hours")} · <span style="color:var(--gold-deep)">${t("open_everyday")}</span></h4>${hoursRows()}</div></div>
        <a href="#book" class="btn btn-gold btn-block" style="margin-top:18px">${t("cta_book_now")}</a>
      </div>
      <div class="map-col">
        <div class="map-wrap">
          <iframe loading="lazy" title="${SALON.name} — ${SALON.addressLine}, ${SALON.city}" src="${SALON.mapsEmbed}"></iframe>
          <div class="map-pin">
            <span class="map-pin-logo">${logoSvg}</span>
            <div class="map-pin-txt"><b>${SALON.name}</b><span>${SALON.city}, ${SALON.country}</span></div>
            <a href="${SALON.directions}" target="_blank" rel="noopener" class="btn btn-gold btn-sm">${icon("navigation")} ${t("directions")}</a>
          </div>
        </div>
        <a href="${SALON.mapsLink}" target="_blank" rel="noopener" class="btn btn-dark btn-block" style="margin-top:10px">${t("maps_btn")}</a>
      </div>
    </div></div>`;
  }

  /* =======================================================================
     BOOKING WIZARD: service → professional → date → time → details
     ======================================================================= */
  const BS = { service: null, pro: null, date: null, time: null, done: false };
  function resetWizard() { BS.service = null; BS.pro = null; BS.date = null; BS.time = null; BS.done = false; }
  function currentStep() {
    if (BS.done) return 9;
    if (!BS.service) return 1;
    if (!BS.pro) return 2;
    if (!BS.date) return 3;
    if (!BS.time) return 4;
    return 6;
  }
  function renderWizard() {
    const host = $("#wizard"); if (!host) return;
    const step = currentStep();
    const labels = [t("step1"), t("step2"), t("step3"), t("step4"), t("step6")];
    const map = [1, 2, 3, 4, 6];
    const stepper = `<div class="stepper">${map.map((n, i) => {
      const cls = step === n ? "active" : (step > n ? "done" : "");
      return `<div class="st ${cls}"><span class="num">${i+1}</span><div>${labels[i]}</div></div>`;
    }).join("")}</div>`;
    let panel;
    if (BS.done) panel = panelSuccess();
    else if (step === 1) panel = panelService();
    else if (step === 2) panel = panelPro();
    else if (step === 3) panel = panelDate();
    else if (step === 4) panel = panelTime();
    else panel = panelDetails();
    host.innerHTML = stepper + panel;
    bindWizard();
  }
  function panelService() {
    const groups = LISTINO.map(cat => {
      const items = SERVICES.filter(s => s.cat === cat.id);
      if (!items.length) return "";
      return `<div class="opt-group"><div class="opt-group-h">${icon(cat.icon)} ${L(cat.label)}</div>
        <div class="opt-grid">${items.map(s => `
          <button class="opt ${BS.service===s.id?'selected':''}" data-svc="${s.id}">
            <span class="ic">${icon(s.icon)}</span>
            <span class="in"><b>${L(s.name)}</b><small>${s.duration} ${t("min")} · ${formatPriceText(s.price)}</small></span>
          </button>`).join("")}</div></div>`;
    }).join("");
    return `<div class="step-panel"><div class="step-h">${t("step1")}</div><div class="step-hint">${t("listino_sub")}</div>${groups}</div>`;
  }
  function panelPro() {
    const pros = BE.prosForService(BS.service);
    const anyOpt = `<button class="opt ${BS.pro==='any'?'selected':''}" data-pro="any">
      <span class="ic-av">★</span><span class="in"><b>${t("any_pro")}</b><small>${t("any_pro_desc")}</small></span></button>`;
    return `<div class="step-panel">${wizBack(1)}
      <div class="step-h">${t("step2")}</div>
      <div class="step-hint">${serviceName(BS.service)}</div>
      <div class="opt-grid">${anyOpt}
        ${pros.map(p => `<button class="opt ${BS.pro===p.id?'selected':''}" data-pro="${p.id}">
          <span class="ic-av"><img src="${p.photo}" alt="${p.name}" onerror="this.style.display='none';this.parentNode.classList.add('noimg');this.parentNode.textContent='${initials(p.name)}'"></span>
          <span class="in"><b>${p.name}</b><small>${L(p.role)}</small></span></button>`).join("")}
      </div></div>`;
  }
  function panelDate() {
    return `<div class="step-panel">${wizBack(2)}
      <div class="step-h">${t("step3")}</div>
      <div class="step-hint">${serviceName(BS.service)} · ${BS.pro==='any'?t("any_pro"):proName(BS.pro)}</div>
      <div class="date-wrap field"><label for="bDate">${t("s_date")}</label>
        <input type="date" id="bDate" min="${BE.todayISO()}" value="${BS.date||''}"></div>
    </div>`;
  }
  function panelTime() {
    const slots = BE.availableSlots(BS.service, BS.pro, BS.date);
    let body;
    if (BS.pro !== 'any' && !BE.proWorksOn(BE.getPro(BS.pro), BS.date)) body = `<div class="notice warn">${t("pro_not_working")}</div>`;
    else if (!slots.length) body = `<div class="notice warn">${t("no_slots")}</div>`;
    else body = `<div class="slots">${slots.map(tm => `<button data-time="${tm}" class="${BS.time===tm?'active':''}">${tm}</button>`).join("")}</div>`;
    return `<div class="step-panel">${wizBack(3)}
      <div class="step-h">${t("step4")} · <span style="color:var(--gold-deep);font-size:1rem">${t("slot_note")}</span></div>
      <div class="step-hint">${prettyDate(BS.date)} · ${serviceName(BS.service)} · ${BS.pro==='any'?t("any_pro"):proName(BS.pro)}</div>
      ${body}</div>`;
  }
  function panelDetails() {
    const s = BE.getService(BS.service);
    const proLabel = BS.pro === 'any' ? (BE.resolveAnyPro(BS.service, BS.date, BS.time)?.name || t("any_pro")) : proName(BS.pro);
    const end = BE.endTime(BS.time, s.duration);
    return `<div class="step-panel">${wizBack(4)}
      <div class="step-h">${t("step5")}</div><div class="step-hint">${t("request_note")}</div>
      <div class="form-2">
        <div class="field"><label for="cName">${t("f_name")}</label><input id="cName" type="text" placeholder="${t("ph_name")}"></div>
        <div class="field"><label for="cPhone">${t("f_phone")}</label><input id="cPhone" type="tel" placeholder="${t("ph_phone")}"></div>
      </div>
      <div class="field"><label for="cEmail">${t("f_email")}</label><input id="cEmail" type="email" placeholder="${t("ph_email")}"></div>
      <div class="field"><label for="cNotes">${t("f_notes")}</label><textarea id="cNotes" placeholder="${t("ph_notes")}"></textarea></div>
      <div class="step-h" style="margin-top:24px">${t("summary")}</div>
      <div class="summary" style="margin-top:12px">
        <div class="sr"><span>${t("s_service")}</span><b>${serviceName(BS.service)}</b></div>
        <div class="sr"><span>${t("s_pro")}</span><b>${proLabel}</b></div>
        <div class="sr"><span>${t("s_date")}</span><b>${prettyDate(BS.date)}</b></div>
        <div class="sr"><span>${t("s_time")}</span><b>${BS.time} – ${end}</b></div>
        <div class="sr"><span>${t("s_duration")}</span><b>${s.duration} ${t("min")}</b></div>
        <div class="sr total"><span>${t("s_price")}</span><b>${formatPriceText(s.price)}</b></div>
      </div>
      <div class="step-h" style="margin-top:8px;font-size:1.2rem">${t("confirm_method")}</div>
      <div class="confirm-btns" style="margin-top:12px">
        <button class="btn btn-wa" id="sendWa">${t("send_whatsapp")}</button>
        <button class="btn btn-dark" id="sendSite">${t("send_site")}</button>
      </div>
      <p class="req-note">${t("request_note")}</p></div>`;
  }
  function panelSuccess() {
    return `<div class="step-panel"><div class="success"><div class="check">✓</div>
      <h3>${t("success_title")}</h3><p>${t("success_msg")}</p>
      <button class="btn btn-gold" id="newBooking">${t("new_booking")}</button></div></div>`;
  }
  function wizBack(to) { return `<div style="margin-bottom:14px"><button class="btn btn-ghost btn-sm" data-back="${to}">← ${t("back")}</button></div>`; }
  function prettyDate(d) {
    if (!d) return "";
    const dt = new Date(d + "T00:00:00");
    return `${dayShort(dt.getDay())} ${String(dt.getDate()).padStart(2,"0")}/${String(dt.getMonth()+1).padStart(2,"0")}/${dt.getFullYear()}`;
  }
  function buildWaMessage(name, phone, email, notes) {
    const s = BE.getService(BS.service);
    const proLabel = BS.pro === 'any' ? (BE.resolveAnyPro(BS.service, BS.date, BS.time)?.name || t("any_pro")) : proName(BS.pro);
    const end = BE.endTime(BS.time, s.duration);
    return [t("wa_intro"), "", SALON.name,
      `${t("s_name")}: ${name}`, `${t("s_phone")}: ${phone}`, email ? `${t("f_email")}: ${email}` : null,
      `${t("s_service")}: ${serviceName(BS.service)}`, `${t("s_pro")}: ${proLabel}`,
      `${t("s_date")}: ${prettyDate(BS.date)}`, `${t("s_time")}: ${BS.time} – ${end}`,
      `${t("s_duration")}: ${s.duration} ${t("min")}`, `${t("s_price")}: ${formatPriceText(s.price)}`,
      notes ? `${t("s_notes")}: ${notes}` : null, "", t("wa_thanks")
    ].filter(x => x !== null).join("\n");
  }
  function commitBooking() {
    const s = BE.getService(BS.service);
    const pro = BS.pro === 'any' ? (BE.resolveAnyPro(BS.service, BS.date, BS.time)?.id || null) : BS.pro;
    if (pro) BE.addBooking({ proId: pro, date: BS.date, start: BS.time, end: BE.endTime(BS.time, s.duration) });
  }
  function bindWizard() {
    $$("[data-svc]").forEach(b => b.onclick = () => { if (BS.service !== b.dataset.svc) { BS.pro = null; BS.date = null; BS.time = null; } BS.service = b.dataset.svc; renderWizard(); });
    $$("[data-pro]").forEach(b => b.onclick = () => { if (BS.pro !== b.dataset.pro) { BS.date = null; BS.time = null; } BS.pro = b.dataset.pro; renderWizard(); });
    const d = $("#bDate"); if (d) d.addEventListener("change", e => { BS.date = e.target.value; BS.time = null; renderWizard(); });
    $$("[data-time]").forEach(b => b.onclick = () => { BS.time = b.dataset.time; renderWizard(); });
    $$("[data-back]").forEach(b => b.onclick = () => {
      const to = +b.dataset.back;
      if (to <= 4) BS.time = null; if (to <= 3) BS.date = null; if (to <= 2) BS.pro = null; if (to <= 1) BS.service = null;
      renderWizard();
    });
    const get = () => ({ name: ($("#cName")?.value||"").trim(), phone: ($("#cPhone")?.value||"").trim(), email: ($("#cEmail")?.value||"").trim(), notes: ($("#cNotes")?.value||"").trim() });
    const wa = $("#sendWa"), site = $("#sendSite");
    if (wa) wa.onclick = () => { const x = get(); if (!x.name || !x.phone) { alert(t("err_required")); return; } window.open(waLink(buildWaMessage(x.name, x.phone, x.email, x.notes)), "_blank"); commitBooking(); BS.done = true; renderWizard(); };
    if (site) site.onclick = () => { const x = get(); if (!x.name || !x.phone) { alert(t("err_required")); return; } commitBooking(); BS.done = true; renderWizard(); };
    const nb = $("#newBooking"); if (nb) nb.onclick = () => { resetWizard(); renderWizard(); };
  }

  /* =======================================================================
     ROUTER + CHROME
     ======================================================================= */
  function currentRoute() { const h = (location.hash || "#home").replace("#", ""); return ROUTES.includes(h) ? h : "home"; }
  function render() {
    const route = currentRoute();
    document.title = pageTitle(route); setMeta(route);
    $("#app").innerHTML = (views[route] || views.home)();
    syncHeader(); setActiveNav(route);
    if (route === "book") { applyPreselect(); renderWizard(); }
    if (route === "services") bindAccordion();
    if (route === "gallery") bindGallery();
    bindBookButtons();
    observeReveals();
    window.scrollTo({ top: 0 });
  }
  function applyPreselect() {
    const ps = sessionStorage.getItem("preselect"); if (!ps) return;
    sessionStorage.removeItem("preselect");
    const [type, id] = ps.split(":");
    resetWizard();
    if (type === "service" && BE.getService(id)) BS.service = id;
    if (type === "pro" && BE.getPro(id)) {
      const svc = SERVICES.find(s => BE.getPro(id).specialties.includes(s.cat));
      if (svc) { BS.service = svc.id; BS.pro = id; }
    }
  }
  function bindBookButtons() {
    $$("[data-book-service]").forEach(b => b.addEventListener("click", () => sessionStorage.setItem("preselect", "service:" + b.dataset.bookService)));
    $$("[data-book-pro]").forEach(b => b.addEventListener("click", () => sessionStorage.setItem("preselect", "pro:" + b.dataset.bookPro)));
  }
  function bindAccordion() {
    const acc = $("#accordion"); if (!acc) return;
    acc.addEventListener("click", e => {
      if (e.target.closest(".row-book")) return; // let Prenota links navigate
      const head = e.target.closest(".acc-head"); if (!head) return;
      const item = head.closest(".acc-item");
      const open = item.classList.toggle("open");
      head.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  function bindGallery() {
    const filters = $("#galFilters"), grid = $("#galGrid"); if (!filters || !grid) return;
    filters.addEventListener("click", e => {
      const btn = e.target.closest("button"); if (!btn) return;
      $$("button", filters).forEach(b => b.classList.remove("active")); btn.classList.add("active");
      const cat = btn.dataset.cat;
      $$("figure", grid).forEach(f => { f.style.display = (cat === "all" || f.dataset.cat === cat) ? "" : "none"; });
    });
  }
  function setActiveNav(route) { $$(".nav a, .drawer-panel a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + route)); }
  function syncHeader() { $("header.site").classList.toggle("on-light", currentRoute() !== "home"); onScroll(); }
  function onScroll() {
    const header = $("header.site"); const heroPage = currentRoute() === "home";
    const solid = window.scrollY > 40 || !heroPage;
    header.classList.toggle("solid", solid);
    header.classList.toggle("on-light", solid || !heroPage);
  }
  let io;
  function observeReveals() {
    if (io) io.disconnect();
    io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1 });
    $$(".reveal:not(.in)").forEach(el => io.observe(el));
  }
  function applyChromeI18N() { $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); }); }
  function setLang(l) {
    LANG = l; document.documentElement.lang = l; localStorage.setItem("em_lang", l);
    $$(".lang button").forEach(b => b.classList.toggle("active", b.dataset.lang === l));
    applyChromeI18N(); render();
  }
  function pageTitle(route) {
    const map = {
      home: `${SALON.name} | Parrucchiere & Estetica a ${SALON.city}`,
      services: `Servizi e prezzi | ${SALON.name} ${SALON.city}`,
      team: `Il nostro team | ${SALON.name} ${SALON.city}`,
      gallery: `Gallery lavori | ${SALON.name} ${SALON.city}`,
      reviews: `Recensioni | ${SALON.name} ${SALON.city}`,
      book: `Prenota appuntamento online | ${SALON.name} ${SALON.city}`,
      contact: `Contatti & orari | ${SALON.name} ${SALON.city}`
    };
    return map[route] || (SALON.name + " · " + SALON.city);
  }
  function setMeta(route) {
    const desc = {
      home: `Estetica e parrucchiere unisex a ${SALON.city}. Taglio, colore, balayage, manicure, epilazione, massaggi. Prenota online o su WhatsApp.`,
      services: `Listino servizi e prezzi: capelli donna e uomo, colore, epilazione, manicure, pedicure, massaggi a ${SALON.city}.`,
      team: `Conosci il team di ${SALON.name}: parrucchiere, estetiste e nail artist a ${SALON.city}.`,
      book: `Prenota da ${SALON.name} a ${SALON.city}: scegli servizio, professionista, data e orario.`,
      contact: `Indirizzo (${SALON.addressLine}), orari e contatti di ${SALON.name} a ${SALON.city}.`
    }[route] || `Estetica e parrucchiere a ${SALON.city} — ${SALON.name}.`;
    setMetaTag('meta[name="description"]', "name", "description", desc);
    // keep social + canonical in sync as the user moves between sections
    const title = pageTitle(route);
    setMetaTag('meta[property="og:title"]', "property", "og:title", title);
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMetaTag('meta[property="og:description"]', "property", "og:description", desc);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", desc);
    if (window.CONFIG) {
      const path = location.pathname.replace(/\/index\.html?$/i, "/");
      const url = String(CONFIG.SITE_DOMAIN || "").replace(/\/+$/, "") + path;
      setMetaTag('meta[property="og:url"]', "property", "og:url", url);
      let c = document.querySelector('link[rel="canonical"]');
      if (!c) { c = document.createElement("link"); c.rel = "canonical"; document.head.appendChild(c); }
      c.setAttribute("href", url);
    }
  }
  function setMetaTag(sel, attr, key, content) {
    let m = document.querySelector(sel);
    if (!m) { m = document.createElement("meta"); m.setAttribute(attr, key); document.head.appendChild(m); }
    m.setAttribute("content", content);
  }
  function init() {
    const saved = localStorage.getItem("em_lang");
    if (saved && I18N[saved]) LANG = saved;
    $$(".lang button").forEach(b => { b.classList.toggle("active", b.dataset.lang === LANG); b.addEventListener("click", () => setLang(b.dataset.lang)); });
    document.documentElement.lang = LANG;
    const drawer = $("#drawer"), burger = $("#burger");
    burger.addEventListener("click", () => drawer.classList.toggle("open"));
    drawer.addEventListener("click", e => { if (e.target === drawer || e.target.closest("a")) drawer.classList.remove("open"); });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", render);
    applyChromeI18N(); render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
