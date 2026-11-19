// Premium, compact "New booking" email sent to the salon — fits on one screen.
// Built with tables + inline styles so it renders the same in Gmail, Outlook and phone mail apps.
// The logo is attached inline (cid:gh-logo).
//
// Fonts: the website's Cormorant Garamond (headings) + Jost (text) are loaded for mail apps that
// support web fonts (Apple Mail, iPhone/Mac Mail, Outlook for Mac). Gmail never loads web fonts, so
// it uses the closest fallbacks listed in SERIF / SANS.
import { BRAND, CITY, EMAIL, PHONE_DISPLAY, PHONE_TEL } from '../data';
import { bookingSummary, SLOTS, withCity } from '../booking';
import { formatDate } from '../dates';
import { EMAIL_LOGO_PNG_BASE64 } from './logo';

const C = {
  plum: '#1c0510', plum2: '#4a0a28', wine: '#940944', gold: '#d9ae6a', goldSoft: '#f1d9b0',
  ink: '#1d1418', muted: '#8a7680', line: '#f0e3e8', blush: '#fdf4f7', page: '#f4ebef', green: '#1faa59',
};
const SERIF = "'Cormorant Garamond', Cormorant, 'Playfair Display', Didot, 'Bodoni 72', Georgia, serif";
const SANS = "Jost, 'Century Gothic', Futura, 'Avenir Next', 'Helvetica Neue', Arial, sans-serif";
const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500;600;700&display=swap';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rupees = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

// "2 hrs 30 mins" / "45 mins" / "3 hrs" → minutes
export function durationMinutes(text) {
  if (!text) return null;
  const h = /(\d+)\s*hrs?/.exec(text);
  const m = /(\d+)\s*mins?/.exec(text);
  const total = (h ? Number(h[1]) * 60 : 0) + (m ? Number(m[1]) : 0);
  return total || null;
}

// "11:00 AM" + "2026-11-20" → Google Calendar link (lasts as long as the service, salon time zone)
function calendarLink(d, title, minutes = 60) {
  const slot = SLOTS.find(s => s.label === d.time);
  if (!slot) return null;
  const ymd = d.date.replaceAll('-', '');
  const t = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}${String(mins % 60).padStart(2, '0')}00`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${ymd}T${t(slot.mins)}/${ymd}T${t(Math.min(slot.mins + minutes, 23 * 60 + 59))}`,
    ctz: 'Asia/Kolkata',
    details: `Customer: ${d.name.trim()} (+91 ${d.mobile})\nArea: ${withCity(d.area)}`,
    location: withCity(d.area),
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// Compact pill button (works in Outlook too)
const button = (href, label, bg, color = '#ffffff', border = bg) => `
  <td class="btn-cell" style="padding:4px">
    <a class="btn" href="${esc(href)}" target="_blank" style="display:inline-block;padding:10px 16px;border-radius:999px;background:${bg};border:1.5px solid ${border};color:${color};font-family:${SANS};font-size:13px;font-weight:600;text-decoration:none;white-space:nowrap">${label}</a>
  </td>`;

// Small label above a bold value
const item = (label, value) => `
  <div style="padding:7px 0;border-bottom:1px solid ${C.line}">
    <div style="font-family:${SANS};font-size:10px;font-weight:600;letter-spacing:1.6px;text-transform:uppercase;color:${C.muted}">${label}</div>
    <div class="v" style="font-family:${SANS};font-size:14px;font-weight:600;color:${C.ink};margin-top:2px;line-height:1.35">${value}</div>
  </div>`;

const colTitle = (text) => `
  <div style="font-family:${SERIF};font-size:19px;font-weight:600;font-style:italic;color:${C.wine};margin:0 0 2px">${text}</div>`;

// One cell of the Date | Time | Price strip
const stat = (label, value, extra = '', last = false) => `
  <td class="stat" width="33%" style="padding:12px 14px;${last ? '' : `border-right:1px solid ${C.line};`}vertical-align:top">
    <div style="font-family:${SANS};font-size:10px;font-weight:600;letter-spacing:1.6px;text-transform:uppercase;color:${C.muted}">${label}</div>
    <div class="stat-v" style="font-family:${SANS};font-size:16px;font-weight:700;color:${C.ink};margin-top:3px;white-space:nowrap">${value}</div>
    ${extra}
  </td>`;

/**
 * @param d       validated booking { name, mobile, date, time, service, sub, area }
 * @param pkg     sub-service from the price list { label, price, mrp, duration }
 * @param ref     booking reference, e.g. GH-191126-1
 */
export function buildBookingEmail({ d, pkg, ref }) {
  const name = d.name.trim();
  const first = name.split(' ')[0];
  const title = pkg ? pkg.label : d.service;
  const mins = durationMinutes(pkg?.duration);
  const saving = pkg && pkg.mrp > pkg.price ? pkg.mrp - pkg.price : 0;
  const offPct = saving ? Math.round((saving / pkg.mrp) * 100) : 0;
  const date = formatDate(d.date);
  const [y, mo, da] = d.date.split('-').map(Number);
  const dateShort = new Date(y, mo - 1, da).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short',
    ...(y === new Date().getFullYear() ? {} : { year: 'numeric' }),
  });
  const received = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

  const waText = `Hi ${first}! 👋 This is ${BRAND}.\n\nThank you for booking *${title}* on ${date} at ${d.time} (${withCity(d.area)}).\n\nWe're happy to confirm your appointment — our beautician will reach you on time. Reply here if you have any questions. 💖`;
  const waHref = `https://wa.me/91${d.mobile}?text=${encodeURIComponent(waText)}`;
  const calHref = calendarLink(d, `${d.service}: ${title} – ${name} (${ref})`, mins || 60);

  const priceCell = pkg
    ? stat('Price', `<span style="color:${C.wine}">${rupees(pkg.price)}</span>`,
      saving ? `<div style="font-family:${SANS};font-size:11px;margin-top:2px;white-space:nowrap"><span style="color:#a8979e;text-decoration:line-through">${rupees(pkg.mrp)}</span> <span style="color:${C.green};font-weight:700">${offPct}% off</span></div>` : '', true)
    : stat('Service', esc(d.service), '', true);

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>New booking – ${esc(title)}</title>
  <link href="${FONTS_URL}" rel="stylesheet">
  <style>
    @import url('${FONTS_URL}');
    @media (max-width: 560px) {
      .pad { padding-left: 16px !important; padding-right: 16px !important; }
      .stat { padding: 10px 8px !important; }
      .stat-v { font-size: 14px !important; }
      .col-l { padding-right: 8px !important; }
      .col-r { padding-left: 8px !important; }
      .v { font-size: 13px !important; }
      .btn { padding: 9px 11px !important; font-size: 12px !important; }
      .title { font-size: 26px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%">
  <!-- Inbox preview text -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">
    ${esc(name)} booked ${esc(title)} for ${esc(date)}, ${esc(d.time)} in ${esc(d.area)}. Call +91 ${esc(d.mobile)} to confirm.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page}">
    <tr><td align="center" style="padding:20px 10px">

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px">

        <!-- Header: logo + reference, then service / sub-service / price / duration -->
        <tr><td class="pad" bgcolor="${C.plum}" style="background:${C.plum};background-image:linear-gradient(135deg,${C.plum} 0%,${C.plum2} 100%);border-radius:20px 20px 0 0;padding:22px 28px 24px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="vertical-align:middle"><img src="cid:gh-logo" width="150" alt="${BRAND}" style="display:block;width:150px;height:auto;border:0"></td>
              <td align="right" style="vertical-align:middle;font-family:${SANS};font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${C.gold};line-height:1.7">
                ✦ New booking<br><span style="color:${C.goldSoft};letter-spacing:1px;font-size:12px">${esc(ref)}</span>
              </td>
            </tr>
          </table>
          <div style="font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.65);margin-top:18px">${esc(d.service)}</div>
          <div class="title" style="font-family:${SERIF};font-size:30px;font-weight:600;line-height:1.15;color:#ffffff;margin:4px 0 12px">${esc(title)}</div>
          ${pkg ? `<span style="display:inline-block;margin-right:6px;padding:5px 13px;border-radius:999px;background:${C.gold};font-family:${SANS};font-size:13px;font-weight:700;color:${C.plum}">${rupees(pkg.price)}</span>` : ''}
          ${pkg?.duration ? `<span style="display:inline-block;padding:5px 13px;border-radius:999px;background:rgba(255,255,255,.12);font-family:${SANS};font-size:12px;font-weight:500;color:#ffffff">⏱ ${esc(pkg.duration)}</span>` : ''}
        </td></tr>

        <!-- Date | Time | Price -->
        <tr><td class="pad" bgcolor="#ffffff" style="background:#ffffff;padding:18px 28px 4px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.blush};border:1px solid ${C.line};border-top:3px solid ${C.gold};border-radius:14px">
            <tr>
              ${stat('Date', esc(dateShort))}
              ${stat('Time', esc(d.time))}
              ${priceCell}
            </tr>
          </table>
        </td></tr>

        <!-- Customer | Booking (side by side; stacked on phones) -->
        <tr><td class="pad" bgcolor="#ffffff" style="background:#ffffff;padding:16px 28px 6px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="col-l" width="50%" style="vertical-align:top;padding-right:12px">
                ${colTitle('Customer')}
                ${item('Name', esc(name))}
                ${item('Mobile', `<a href="tel:+91${esc(d.mobile)}" style="color:${C.wine};text-decoration:none">+91 ${esc(d.mobile)}</a>`)}
                ${item('Area', esc(withCity(d.area)))}
              </td>
              <td class="col-r" width="50%" style="vertical-align:top;padding-left:12px">
                ${colTitle('Booking')}
                ${item('Service', esc(d.service))}
                ${pkg ? item('Sub-service', esc(pkg.label)) : ''}
                ${pkg?.duration ? item('Duration', esc(pkg.duration)) : ''}
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Actions -->
        <tr><td class="pad" bgcolor="#ffffff" align="center" style="background:#ffffff;padding:12px 20px 6px">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
            ${button(`tel:+91${d.mobile}`, `📞 Call ${esc(first)}`, C.wine)}
            ${button(waHref, '💬 WhatsApp', C.green)}
            ${calHref ? button(calHref, '🗓️ Calendar', '#ffffff', C.wine, C.gold) : ''}
          </tr></table>
        </td></tr>

        <!-- Next step + meta -->
        <tr><td class="pad" bgcolor="#ffffff" style="background:#ffffff;border-radius:0 0 20px 20px;padding:10px 28px 20px;text-align:center;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.muted}">
          <span style="color:#6b5320"><b>Next:</b> call within 2 hours, then mark <b>Confirmed</b> in the Bookings sheet.</span><br>
          Received ${esc(received)}
        </td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding:14px 10px 4px;font-family:${SANS};font-size:11px;line-height:1.6;color:${C.muted}">
          <span style="font-family:${SERIF};font-size:14px;font-weight:600;color:${C.wine}">${BRAND}</span> · ${CITY} ·
          <a href="tel:${PHONE_TEL}" style="color:${C.muted};text-decoration:none">${PHONE_DISPLAY}</a> ·
          <a href="mailto:${EMAIL}" style="color:${C.muted};text-decoration:none">${EMAIL}</a>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return {
    subject: `✨ New Booking – ${d.service}${pkg ? ` · ${pkg.label}` : ''} – ${date}, ${d.time} (${ref})`,
    text: `New booking request (${ref})\n\n${bookingSummary(d, pkg)}${pkg?.duration ? `\nDuration: ${pkg.duration}` : ''}\nReceived: ${received}\n\nCall the customer to confirm. Salon phone: ${PHONE_DISPLAY}`,
    html,
    attachments: [{
      filename: 'glamhuman-logo.png',
      content: Buffer.from(EMAIL_LOGO_PNG_BASE64, 'base64'),
      cid: 'gh-logo',
      contentDisposition: 'inline',
    }],
  };
}
