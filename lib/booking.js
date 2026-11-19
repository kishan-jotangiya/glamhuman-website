// Booking rules shared by the form (instant feedback) and the API (final check before emailing).
import { CITY, FIRST_SLOT, LAST_SLOT } from './data';
import { addDays, formatDate } from './dates';
import { PRICING } from './pricing';

// Order matches the form, so the first invalid field gets focus
export const FIELDS = ['name', 'mobile', 'date', 'time', 'services', 'subs', 'area'];
export const BOOKING_WINDOW_DAYS = 90;
export const MIN_NOTICE_MIN = 60;

export const SLOTS = Array.from({ length: (LAST_SLOT - FIRST_SLOT) / 30 + 1 }, (_, i) => {
  const mins = FIRST_SLOT + i * 30;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return { mins, label: `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}` };
});

// "Vesu" → "Vesu, Surat" — but leave "Vesu, Surat" as typed
export const withCity = (area) => {
  const a = String(area || '').trim();
  return a.toLowerCase().includes(CITY.toLowerCase()) ? a : `${a}, ${CITY}`;
};

// Services you can book = the price list tabs, in the same order (Makeup, Facial, Clean-Up, …)
export const SERVICES_ALLOWED = PRICING.map(c => c.label);

// ── Sub-services = exactly the cards and options under that price list tab ──
// "Gold Facial – VLCC": price-list group + option (just the group name when they're the same)
export const subLabel = (group, item) =>
  group.items.length > 1 || item.option !== group.name ? `${group.name} – ${item.option}` : group.name;

// { 'Facial': [{ group: 'Gold Facial', items: [{ label, option, price, mrp, duration }] }], ... }
export const SUB_SERVICES = {};
for (const c of PRICING) {
  for (const g of c.groups) {
    (SUB_SERVICES[c.label] ||= []).push({
      group: g.name,
      items: g.items.map(i => ({ label: subLabel(g, i), option: i.option, price: i.price, mrp: i.mrp, duration: i.duration })),
    });
  }
}

/** The sub-service with this label under this service, or null. */
export const findSub = (service, label) =>
  (SUB_SERVICES[service] || []).flatMap(g => g.items).find(i => i.label === label) || null;

// Several services and options can be booked together. An option is stored as "Service::Label"
// because the same name can appear under two services.
export const subKey = (service, label) => `${service}::${label}`;
export const findSubByKey = (key) => {
  const i = typeof key === 'string' ? key.indexOf('::') : -1;
  if (i < 0) return null;
  const service = key.slice(0, i);
  const sub = findSub(service, key.slice(i + 2));
  return sub ? { ...sub, service, key } : null;
};

// ── Travel: free when the bill is ₹500 or more, otherwise a flat ₹50 ──
export const TRAVEL_FEE = 50;
export const FREE_TRAVEL_FROM = 500;

/** Bill for the chosen options: { items, subtotal, travel, total } — prices always from the price list. */
export function priceBooking(subs) {
  const items = (Array.isArray(subs) ? subs : []).map(findSubByKey).filter(Boolean);
  const subtotal = items.reduce((n, i) => n + i.price, 0);
  const travel = items.length && subtotal < FREE_TRAVEL_FROM ? TRAVEL_FEE : 0;
  return { items, subtotal, travel, total: subtotal + travel };
}

/** Short note about travel charges for the sheet, email and summaries. */
export const travelNote = (bill) => (bill.travel
  ? `Travel charges ₹${TRAVEL_FEE} (bill below ₹${FREE_TRAVEL_FROM})`
  : `Free travel (bill ₹${FREE_TRAVEL_FROM} or more)`);

/**
 * Returns `{ field: errorMessage | null }` for every booking field.
 * `today` is 'yyyy-mm-dd' and `nowMinutes` the minutes since midnight, both in the salon's local time.
 */
export function validateBooking(d, { today, nowMinutes, minNotice = MIN_NOTICE_MIN }) {
  const maxDate = today ? addDays(today, BOOKING_WINDOW_DAYS) : null;
  const slotPast = (date, mins) => !!today && date === today && mins < nowMinutes + minNotice;
  const v = (f) => (typeof d[f] === 'string' ? d[f] : '');
  const list = (f) => (Array.isArray(d[f]) ? d[f] : []);

  const rules = {
    name() {
      const n = v('name').trim();
      if (!n) return 'Please tell us your name';
      if (n.length < 2) return 'Name looks too short';
      if (n.length > 50) return 'Name is too long';
      if (!/^[A-Za-zऀ-૿][A-Za-zऀ-૿ .'-]*$/.test(n)) return 'Please use letters only';
      return null;
    },
    mobile() {
      const m = v('mobile');
      if (!m) return 'Mobile number is required';
      if (!/^\d*$/.test(m)) return 'Digits only, please';
      if (m.length < 10) return `Enter all 10 digits (${m.length}/10)`;
      if (m.length > 10) return 'Mobile number must be 10 digits';
      if (!/^[6-9]/.test(m)) return 'Indian mobile numbers start with 6, 7, 8 or 9';
      return null;
    },
    date() {
      const date = v('date');
      if (!date) return 'Pick a preferred date';
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return 'Pick a valid date';
      if (today && date < today) return 'That date has already passed';
      if (maxDate && date > maxDate) return `Bookings open up to ${BOOKING_WINDOW_DAYS} days ahead`;
      return null;
    },
    time() {
      const time = v('time');
      if (!time) return v('date') ? 'Pick a time slot' : 'Pick a date first, then a time';
      const slot = SLOTS.find(s => s.label === time);
      if (!slot) return 'Pick a valid time slot';
      if (slotPast(v('date'), slot.mins)) return 'Please choose a slot at least 1 hour from now';
      return null;
    },
    services() {
      const s = list('services');
      if (!s.length) return 'Choose at least one service';
      if (s.some(x => !SERVICES_ALLOWED.includes(x)) || new Set(s).size !== s.length) return 'Choose services from the list';
      return null;
    },
    subs() {
      const services = list('services').filter(x => SUB_SERVICES[x]);
      if (!services.length) return null; // nothing to pick until a service is chosen
      const subs = list('subs');
      if (subs.length > 40 || new Set(subs).size !== subs.length) return 'Choose options from the list';
      if (subs.some(k => !services.includes(findSubByKey(k)?.service))) return 'Choose options from the list';
      const missing = services.filter(x => !subs.some(k => findSubByKey(k).service === x));
      if (missing.length) {
        const names = missing.map(x => x.toLowerCase());
        return `Choose at least one ${names.length > 1 ? `option for ${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : `${names[0]} option`}`;
      }
      return null;
    },
    area() {
      const a = v('area').trim();
      if (!a) return `Please enter your area in ${CITY}`;
      if (a.length < 2) return 'Area looks too short';
      if (a.length > 120) return 'Please keep the area under 120 characters';
      if (!/^[\p{L}\p{N}][\p{L}\p{N} .,'\/#&()-]*$/u.test(a)) return 'Please use letters and numbers only';
      return null;
    },
  };
  return Object.fromEntries(FIELDS.map(f => [f, rules[f]()]));
}

export const slotIsPast = (today, nowMinutes, date, mins, minNotice = MIN_NOTICE_MIN) =>
  !!today && date === today && mins < nowMinutes + minNotice;

/** Plain-text summary used for the email body and the WhatsApp fallback. */
export function bookingSummary(d, bill) {
  const r = (n) => `₹${n.toLocaleString('en-IN')}`;
  return [
    `Name: ${d.name.trim()}`,
    `Mobile: +91 ${d.mobile}`,
    `Services: ${d.services.join(', ')}`,
    ...(bill.items.length ? [
      ...bill.items.map(i => `• ${i.label} – ${r(i.price)}`),
      `Travel: ${bill.travel ? r(bill.travel) : 'Free'}`,
      `Total: ${r(bill.total)}`,
    ] : []),
    `Date: ${formatDate(d.date)}`,
    `Time: ${d.time}`,
    `Area: ${withCity(d.area)}`,
  ].join('\n');
}
