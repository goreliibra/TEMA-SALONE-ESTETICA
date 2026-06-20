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

  /* ---------------- VIEWS ---------------- */
  const views = {};

  views.home = () => `
    <section class="hero">
      <div class="wrap"><div class="hero-inner reveal in">
        <span class="eyebrow">${L(SALON.tagline)}</span>
        <h1>${t("hero_title")}</h1>
        <p>${t("hero_sub")}</p>
        <div class="hero-actions">
          <a href="#book" class="btn btn-gold">${t("hero_cta1")}</a>
          <a href="${defaultWa()}" target="_blank" rel="noopener" class="btn btn-wa">${t("hero_cta2")}</a>
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
        ${[1,2,3,4,5,6].map(i => `<div class="why-card"><div class="ic">${["💎","💬","✨","📅","💶","🧴"][i-1]}</div><h4>${t("why"+i+"_t")}</h4><p>${t("why"+i+"_d")}</p></div>`).join("")}
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
              <span class="acc-ic">${cat.icon}</span>
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
    const sid = it.book ? serviceIdFor(cat, it) : null;
    const btn = sid ? `<a href="#book" class="row-book" data-book-service="${sid}">${t("prenota_short")}</a>` : "";
    return `<div class="price-row">
      <div class="pn"><b>${L(it.name)}</b>${btn}</div>
      <div class="pp">${formatPrice(it.price)}</div>
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
      <div class="svc-ic">${s.icon}</div>
      <div class="svc-cat-tag">${L(s.catLabel)}</div>
      <h3>${L(s.name)}</h3>
      <div class="svc-meta"><span>${t("duration")}: <b>${s.duration} ${t("min")}</b></span></div>
      <div class="svc-price">${formatPrice(s.price)}</div>
      <a href="#book" class="btn btn-dark btn-sm" style="margin-top:16px" data-book-service="${s.id}">${t("book_this_service")}</a>
    </div>`;
  }
  function teamCard(p) {
    return `<div class="team-card">
      <div class="team-photo-wrap"><img class="team-photo" src="${p.photo}" alt="${p.name} — ${L(p.role)}" loading="lazy" onerror="${imgFallback}"><span class="team-photo-fallback">${initials(p.name)}</span></div>
      <div class="team-body">
        <h3>${p.name}</h3>
        <div class="team-role">${L(p.role)}</div>
        <a href="#book" class="btn btn-dark btn-sm" data-book-pro="${p.id}">${t("book_with")} ${p.name}</a>
      </div>
    </div>`;
  }
  function teamCardFull(p) {
    return `<div class="team-card">
      <div class="team-photo-wrap"><img class="team-photo" src="${p.photo}" alt="${p.name} — ${L(p.role)}" loading="lazy" onerror="${imgFallback}"><span class="team-photo-fallback">${initials(p.name)}</span></div>
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
    return `<figure data-cat="${g.cat}">
      <img src="${g.src}" alt="${L(g.alt)}" loading="lazy" onerror="${imgFallback}">
      <span class="gal-fallback">${g.icon || "✨"}<small>${L(g.alt)}</small></span>
      <figcaption>${L(g.alt)}</figcaption>
    </figure>`;
  }
  function revCard(r) {
    return `<div class="rev-card">
      <div class="stars">${stars(r.rating)}</div>
      <p>“${L(r.text)}”</p>
      <div class="rev-who"><div class="rev-av">${r.name[0]}</div><div><b>${r.name}</b><small>${r.date}</small></div></div>
    </div>`;
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
  const logoSvg = `<svg viewBox="0 0 100 100" class="logo-em" role="img" aria-label="Estetica Modenese">
    <circle cx="50" cy="50" r="48" fill="none" stroke="url(#emRing)" stroke-width="4"/>
    <circle cx="50" cy="50" r="44" fill="#0d0d0d"/>
    <text x="50" y="50" text-anchor="middle" fill="#fff" font-family="'Cormorant Garamond',serif" font-size="30" font-weight="700" letter-spacing="-1">E&amp;M</text>
    <line x1="32" y1="59" x2="68" y2="59" stroke="#fff" stroke-width="1" opacity=".55"/>
    <text x="50" y="70" text-anchor="middle" fill="#fff" font-family="'Jost',sans-serif" font-size="9.5" letter-spacing="1.5">ESTETICA</text>
    <text x="50" y="81" text-anchor="middle" fill="#fff" font-family="'Jost',sans-serif" font-size="9.5" letter-spacing="1.5">MODENESE</text></svg>`;
  function locationInner() {
    return `<div class="wrap"><div class="contact-grid reveal">
      <div class="info-card">
        <div class="info-item"><div class="ic">📍</div><div>
          <h4>${t("address")}</h4>
          <p><b>${SALON.name}</b><br>${SALON.addressLine}, ${SALON.zip} ${SALON.city} (${SALON.province})</p>
          <a href="${SALON.directions}" target="_blank" rel="noopener" class="btn btn-dark btn-sm" style="margin-top:10px">🧭 ${t("directions")}</a>
        </div></div>
        <div class="info-item"><div class="ic">📞</div><div><h4>${t("phone")}</h4><a href="tel:${SALON.phoneHref}">${SALON.phone}</a></div></div>
        <div class="info-item"><div class="ic">💬</div><div><h4>${t("whatsapp_w")}</h4><a href="${defaultWa()}" target="_blank" rel="noopener">${SALON.phone}</a></div></div>
        <div class="info-item"><div class="ic">📷</div><div><h4>${t("instagram")}</h4><a href="${SALON.instagramUrl}" target="_blank" rel="noopener">${SALON.instagram}</a></div></div>
        <div class="info-item"><div class="ic">🕐</div><div style="flex:1"><h4>${t("hours")} · <span style="color:var(--gold-deep)">${t("open_everyday")}</span></h4>${hoursRows()}</div></div>
        <a href="#book" class="btn btn-gold btn-block" style="margin-top:18px">${t("cta_book_now")}</a>
      </div>
      <div class="map-col">
        <div class="map-wrap">
          <iframe loading="lazy" title="${SALON.name} — ${SALON.addressLine}, ${SALON.city}" src="${SALON.mapsEmbed}"></iframe>
          <div class="map-pin">
            <span class="map-pin-logo">${logoSvg}</span>
            <div class="map-pin-txt"><b>${SALON.name}</b><span>${SALON.city}, ${SALON.country}</span></div>
            <a href="${SALON.directions}" target="_blank" rel="noopener" class="btn btn-gold btn-sm">🧭 ${t("directions")}</a>
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
      return `<div class="opt-group"><div class="opt-group-h">${cat.icon} ${L(cat.label)}</div>
        <div class="opt-grid">${items.map(s => `
          <button class="opt ${BS.service===s.id?'selected':''}" data-svc="${s.id}">
            <span class="ic">${s.icon}</span>
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
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
    m.setAttribute("content", desc);
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
