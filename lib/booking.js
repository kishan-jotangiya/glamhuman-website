// Booking rules shared by the form (instant feedback) and the API (final check before emailing).
import { CITY, FIRST_SLOT, LAST_SLOT } from './data';
import { addDays, formatDate } from './dates';
import { PRICING } from './pricing';

// Order matches the form, so the first invalid field gets focus
export const FIELDS = ['name', 'mobile', 'date', 'time', 'service', 'sub', 'area'];
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

/**
 * Returns `{ field: errorMessage | null }` for every booking field.
 * `today` is 'yyyy-mm-dd' and `nowMinutes` the minutes since midnight, both in the salon's local time.
 */
export function validateBooking(d, { today, nowMinutes, minNotice = MIN_NOTICE_MIN }) {
  const maxDate = today ? addDays(today, BOOKING_WINDOW_DAYS) : null;
  const slotPast = (date, mins) => !!today && date === today && mins < nowMinutes + minNotice;
  const v = (f) => (typeof d[f] === 'string' ? d[f] : '');

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
    service() {
      const s = v('service');
      if (!s) return 'Choose the service you need';
      if (!SERVICES_ALLOWED.includes(s)) return 'Choose a service from the list';
      return null;
    },
    sub() {
      const service = v('service');
      if (!service || !SUB_SERVICES[service]) return null; // nothing to pick until a service is chosen
      if (!v('sub')) return `Choose the ${service.toLowerCase()} option you want`;
      if (!findSub(service, v('sub'))) return 'Choose an option from the list';
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
export function bookingSummary(d, pkg) {
  return [
    `Name: ${d.name.trim()}`,
    `Mobile: +91 ${d.mobile}`,
    `Service: ${d.service}`,
    ...(pkg ? [`Sub-service: ${pkg.label} (offer price ₹${pkg.price.toLocaleString('en-IN')})`] : []),
    `Date: ${formatDate(d.date)}`,
    `Time: ${d.time}`,
    `Area: ${withCity(d.area)}`,
  ].join('\n');
}
