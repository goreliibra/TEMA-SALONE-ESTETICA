/* =========================================================================
   SEO + GEO — all structured data, canonical and social meta in ONE place,
   generated from CONFIG (see data.js). Edit CONFIG, everything here updates.

   Outputs into <head>:
     • <link rel="canonical">            → CONFIG.SITE_DOMAIN + current path
     • Open Graph + Twitter card tags
     • LocalBusiness JSON-LD (HairSalon/BeautySalon) with consistent NAP
     • FAQPage JSON-LD (from FAQ in data.js)
     • favicon (inline SVG of the E&M monogram)

   Portable: pure client-side, no build step, no external calls. Works the
   same on GitHub Pages and any standard host (Aruba/Hostinger).
   ========================================================================= */
(function () {
  if (!window.CONFIG) return;
  var C = window.CONFIG;
  var origin = (C.SITE_DOMAIN || "").replace(/\/+$/, "");          // no trailing slash
  var head = document.head;
  // clean path: treat /index.html as the site root "/"
  var path = location.pathname.replace(/\/index\.html?$/i, "/");

  /* ---- helpers ---- */
  function upsertMeta(attr, key, content) {
    var sel = 'meta[' + attr + '="' + key + '"]';
    var m = head.querySelector(sel);
    if (!m) { m = document.createElement("meta"); m.setAttribute(attr, key); head.appendChild(m); }
    m.setAttribute("content", content);
  }
  function upsertLink(rel, href, extra) {
    var sel = 'link[rel="' + rel + '"]';
    var l = head.querySelector(sel);
    if (!l) { l = document.createElement("link"); l.setAttribute("rel", rel); head.appendChild(l); }
    l.setAttribute("href", href);
    if (extra) Object.keys(extra).forEach(function (k) { l.setAttribute(k, extra[k]); });
  }
  function addJsonLd(obj) {
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(obj);
    head.appendChild(s);
  }

  /* ---- canonical (origin + clean path, hash ignored) ---- */
  var canonical = origin + path;
  upsertLink("canonical", canonical);

  /* ---- Open Graph + Twitter ---- */
  var ogImage = C.HERO_IMAGE || "";
  var ogTitle = C.BUSINESS_NAME + " — " + ("Parrucchiere & Estetica a " + C.CITY);
  var ogDesc = "Capelli, colore, manicure, epilazione e massaggi a " + C.CITY + ". Prenota online o su WhatsApp.";
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:site_name", C.BUSINESS_NAME);
  upsertMeta("property", "og:title", ogTitle);
  upsertMeta("property", "og:description", ogDesc);
  upsertMeta("property", "og:url", canonical);
  if (ogImage) upsertMeta("property", "og:image", ogImage);
  upsertMeta("property", "og:locale", "it_IT");
  upsertMeta("name", "twitter:card", ogImage ? "summary_large_image" : "summary");
  upsertMeta("name", "twitter:title", ogTitle);
  upsertMeta("name", "twitter:description", ogDesc);
  if (ogImage) upsertMeta("name", "twitter:image", ogImage);

  /* ---- favicon (E&M wordmark on dark, inline SVG data-URI) ---- */
  var favShort = (C.BUSINESS_SHORT || C.BUSINESS_NAME[0] || "S").replace(/&/g, "&amp;");
  var favSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
    '<rect width="100" height="100" rx="14" fill="#0d0d0d"/>' +
    '<text x="50" y="49" text-anchor="middle" fill="#fff" font-family="Georgia,serif" font-size="38" font-weight="600" letter-spacing="-1">' + favShort + '</text>' +
    '<line x1="30" y1="60" x2="70" y2="60" stroke="#fff" stroke-width="1" opacity=".5"/>' +
    '<text x="50" y="72" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="9" letter-spacing="2.5">ESTETICA</text>' +
    '<text x="50" y="84" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="9" letter-spacing="2.5">MODENESE</text></svg>';
  upsertLink("icon", "data:image/svg+xml," + encodeURIComponent(favSvg), { type: "image/svg+xml" });

  /* ---- LocalBusiness JSON-LD (consistent NAP) ---- */
  var sameAs = (C.SOCIAL || []).slice();
  var local = {
    "@context": "https://schema.org",
    "@type": C.BUSINESS_TYPE || ["HairSalon", "BeautySalon"],
    "name": C.BUSINESS_NAME,
    "url": origin + "/",
    "telephone": C.PHONE_HREF,
    "priceRange": C.PRICE_RANGE || "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": C.ADDRESS_LINE,
      "addressLocality": C.CITY,
      "postalCode": C.ZIP,
      "addressRegion": C.PROVINCE,
      "addressCountry": C.COUNTRY_CODE || "IT"
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "opens": "09:00", "closes": "20:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "10:00", "closes": "18:00" }
    ]
  };
  if (C.BUSINESS_SHORT) local.alternateName = C.BUSINESS_SHORT + " " + C.BUSINESS_NAME;
  if (C.HERO_IMAGE) local.image = C.HERO_IMAGE;
  if (C.EMAIL) local.email = C.EMAIL;
  if (C.GEO) local.geo = { "@type": "GeoCoordinates", "latitude": C.GEO.lat, "longitude": C.GEO.lng };
  if (sameAs.length) local.sameAs = sameAs;
  if (C.GOOGLE_RATING) {
    local.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": C.GOOGLE_RATING,
      "reviewCount": C.GOOGLE_REVIEWS_COUNT || 1
    };
  }
  addJsonLd(local);

  /* ---- FAQPage JSON-LD (from FAQ in data.js) ---- */
  if (window.FAQ && window.FAQ.length) {
    addJsonLd({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": window.FAQ.map(function (f) {
        return {
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        };
      })
    });
  }
})();
