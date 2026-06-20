/* =========================================================================
   BOOKING ENGINE — per-operator available-slot calculation.
   Operators are matched to a service by category (TEAM.specialties).
   Constraints: service duration, salon opening hours, operator working days,
   optional lunch, existing bookings (+buffer), 45-min slot grid, no past times.
   Backend-ready.
   ========================================================================= */
const BookingEngine = (function () {

  const t2m = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const m2t = (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  const overlaps = (s1, e1, s2, e2) => s1 < e2 && s2 < e1;

  function todayISO() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function weekday(dateStr) { return new Date(dateStr + "T00:00:00").getDay(); }
  function getService(id) { return SERVICES.find((s) => s.id === id) || null; }
  function getPro(id) { return TEAM.find((p) => p.id === id) || null; }
  function salonHours(dateStr) { return WORKING_HOURS[weekday(dateStr)] || null; }

  /* operators who can perform a service (by category) */
  function prosForService(serviceId) {
    const s = getService(serviceId);
    if (!s) return [];
    return TEAM.filter((p) => p.specialties.includes(s.cat));
  }
  function proWorksOn(pro, dateStr) {
    return pro.workingDays.includes(weekday(dateStr)) && !!WORKING_HOURS[weekday(dateStr)];
  }

  /* bookings store */
  function localBookings() {
    try { return JSON.parse(localStorage.getItem("em_bookings") || "[]"); } catch (e) { return []; }
  }
  function addBooking(b) { const cur = localBookings(); cur.push(b); localStorage.setItem("em_bookings", JSON.stringify(cur)); }
  function allBookings() { return EXISTING_BOOKINGS.concat(localBookings()); }

  function isFree(proId, dateStr, startMin, durMin) {
    const hrs = salonHours(dateStr);
    if (!hrs) return false;
    const open = t2m(hrs.open), close = t2m(hrs.close);
    const endMin = startMin + durMin;
    if (startMin < open || endMin > close) return false;
    if (LUNCH && overlaps(startMin, endMin, t2m(LUNCH.start), t2m(LUNCH.end))) return false;
    const bks = allBookings().filter((b) => b.proId === proId && b.date === dateStr);
    for (const b of bks) {
      if (overlaps(startMin, endMin, t2m(b.start) - BUFFER_MIN, t2m(b.end) + BUFFER_MIN)) return false;
    }
    return true;
  }

  function slotsForPro(serviceId, proId, dateStr) {
    const s = getService(serviceId), pro = getPro(proId);
    if (!s || !pro) return [];
    if (!pro.specialties.includes(s.cat)) return [];
    if (!proWorksOn(pro, dateStr)) return [];
    const hrs = salonHours(dateStr);
    const open = t2m(hrs.open), close = t2m(hrs.close);
    let minStart = open;
    if (dateStr === todayISO()) {
      const now = new Date();
      minStart = Math.max(open, now.getHours() * 60 + now.getMinutes() + 30);
    }
    const out = [];
    for (let m = open; m + s.duration <= close; m += SLOT_STEP_MIN) {
      if (m < minStart) continue;
      if (isFree(proId, dateStr, m, s.duration)) out.push(m2t(m));
    }
    return out;
  }

  function availableSlots(serviceId, proId, dateStr) {
    if (proId === "any") {
      const pros = prosForService(serviceId).filter((p) => proWorksOn(p, dateStr));
      const set = new Set();
      pros.forEach((p) => slotsForPro(serviceId, p.id, dateStr).forEach((time) => set.add(time)));
      return Array.from(set).sort();
    }
    return slotsForPro(serviceId, proId, dateStr);
  }

  function resolveAnyPro(serviceId, dateStr, timeStr) {
    const pros = prosForService(serviceId).filter((p) => proWorksOn(p, dateStr));
    for (const p of pros) if (slotsForPro(serviceId, p.id, dateStr).includes(timeStr)) return p;
    return null;
  }

  function endTime(startStr, durMin) { return m2t(t2m(startStr) + durMin); }

  return {
    t2m, m2t, todayISO, weekday, getService, getPro, salonHours,
    prosForService, proWorksOn, availableSlots, slotsForPro, resolveAnyPro,
    isFree, addBooking, endTime
  };
})();

window.BookingEngine = BookingEngine;
