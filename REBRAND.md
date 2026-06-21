# 🔁 Rebrand checklist — clone this template for a new salon

This site is a portable static template (HTML/CSS/JS, no framework). It runs
unchanged on **GitHub Pages** and any standard host (**Aruba/Hostinger**) — just
upload the files. Follow the steps below to rebrand it for a new client.

> Rule of thumb: **identity** lives in ONE block (`CONFIG` in `data.js`).
> **Catalog/copy** lives in a few clearly-marked arrays. You rarely touch the rest.

---

## 1. Identity — edit ONE block (`data.js` → `CONFIG`)
Open `data.js`, change the values in the `CONFIG` block at the very top. This
updates **every** meta tag, canonical URL, Open Graph/Twitter card, the
LocalBusiness + FAQ structured data (JSON-LD), the favicon, the phone/WhatsApp
links, the Google Map and the footer — automatically.

- `SITE_DOMAIN` — the live domain (e.g. `https://www.nuovosalone.it`). No trailing slash.
- `BUSINESS_NAME`, `BUSINESS_SHORT`, `BUSINESS_TYPE`, `PRICE_RANGE`
- `ADDRESS_LINE`, `CITY`, `ZIP`, `PROVINCE`, `COUNTRY`, `COUNTRY_CODE`, `GEO` (lat/lng)
- `PHONE`, `PHONE_HREF`, `WHATSAPP`, `EMAIL`, `INSTAGRAM`, `INSTAGRAM_URL`, `SOCIAL`
- `HERO_IMAGE` — the big background photo (also used for social share image)

## 2. Services & prices — `data.js` → `LISTINO`
Each category has a `label` (it/tr/en), an `icon` (see icon names below) and an
`items[]` list. Mark a row `book: true` + `duration` to make it bookable.

## 3. Team — `data.js` → `TEAM`
Names, roles, photos, `specialties` (category ids), `workingDays`. Replace photo
URLs with real ones; until then, initials show automatically.

## 4. Photos — `data.js` → `GALLERY` (and `TEAM[].photo`, `CONFIG.HERO_IMAGE`)
Replace each `src` with a real image URL/path. Layout never shifts (fixed 1:1
boxes); a labelled placeholder shows for any missing/broken photo.

## 5. Reviews — `data.js` → `REVIEWS`

## 6. FAQ — `data.js` → `FAQ`
Italian Q&A. Used for both the visible FAQ section **and** the FAQPage JSON-LD.
Keep answers short, factual and front-loaded (first sentence answers directly).

## 7. UI copy / translations — `i18n.js`
Section titles, buttons, hero text, the front-loaded section intros (it/tr/en).

## 8. Opening hours — `data.js` → `WORKING_HOURS`
Also reflected in the JSON-LD (`seo.js`) — if hours change a lot, update the
`openingHoursSpecification` array in `seo.js` to match.

## 9. SEO files (update the domain)
- `sitemap.xml` → `<loc>` domain
- `robots.txt` → `Sitemap:` domain
- `favicon.svg` → optional: change the monogram / colours

---

## Icon names (for `LISTINO[].icon` / `GALLERY[].icon`)
Defined in `app.js` → `ICONS`. Available: `gem`, `message-circle`, `sparkles`,
`calendar-check`, `wallet`, `droplet`, `scissors`, `hand`, `footprints`,
`flower`, `eye`, `map-pin`, `phone`, `message-square`, `instagram`, `clock`,
`navigation`. To add one, paste a [Lucide](https://lucide.dev) glyph's inner
SVG into the `ICONS` object keyed by name.

## After editing — publish
1. Save the files.
2. GitHub repo → **Add file → Upload files** → drag the changed files → **Commit**.
   (Or push from Git.) ~1 minute later the live site updates.
3. For a real domain: Settings → Pages → Custom domain, then point DNS.
4. After go-live, submit `https://YOURDOMAIN/sitemap.xml` in Google Search Console.

## Files at a glance
```
index.html   shell: header, footer, font/style links, script order
styles.css   all design (palette, layout, responsive, icons, FAQ, map)
data.js      ★ CONFIG + all content (services, team, gallery, reviews, FAQ)
i18n.js      it/tr/en translations & section copy
booking.js   slot/availability engine
app.js       router, views, icon set, booking wizard
seo.js       canonical, OG/Twitter, favicon, JSON-LD — all from CONFIG
sitemap.xml  robots.txt  favicon.svg
```
