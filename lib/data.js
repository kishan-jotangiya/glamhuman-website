// ─────────────────────────────────────────────────────────────
//  GlamHuman — all site content lives here.
// ─────────────────────────────────────────────────────────────
export const BRAND = 'GlamHuman';
export const CITY = 'Surat';
// Live website address — used for SEO (canonical links, sitemap, share previews). Set NEXT_PUBLIC_SITE_URL when deploying.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.glamhuman.in').replace(/\/$/, '');

export const PHONE_DISPLAY = '+91 75679 38491';
export const PHONE_TEL = '+917567938491';
export const WHATSAPP_NUMBER = '917567938491'; // country code + number, digits only
export const EMAIL = 'glamhumanofficial@gmail.com';
export const HOURS = 'Mon – Sun, 9:00 AM – 8:00 PM';
// Booking slots (minutes from midnight), every 30 min. Keep in sync with HOURS.
export const FIRST_SLOT = 9 * 60;
export const LAST_SLOT = 19 * 60;
export const INSTAGRAM = 'https://www.instagram.com/glamhuman.official/';
export const FACEBOOK = ''; // add the Facebook page link here — the icon stays hidden while this is empty

// ── WhatsApp: every button opens a ready-to-send message from the customer ──
export const WA_MESSAGES = {
  general: `Hi ${BRAND}! 👋

I'm interested in your home salon services in ${CITY}.
Could you please share your services, prices and available slots?

Thank you!`,
  service: (service) => `Hi ${BRAND}! 👋

I'd like to know more about *${service}* at home in ${CITY}.
Could you please share the price, what's included and your available slots?

Thank you!`,
  question: `Hi ${BRAND}! 👋

I have a question about your home salon service in ${CITY}:
`,
};

export const waLink = (text = WA_MESSAGES.general) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;


// Photos are stored in /public/images (downloaded from Unsplash — free for commercial use, see public/images/CREDITS.md).
// Swap any file for your own work photo with the same name to update the site.
const img = (name) => `/images/${name}.jpg`;

export const PHOTOS = {
  hero: img('hero-bride-profile'),
  why1: img('saree-portrait'),
  why2: img('facial-mask'),
  cta: img('cta-bride-ring-light'),
  popup: img('bride-smile'),
  band: img('banner-bride-nath'),
};

export const AREAS = [
  'Adajan', 'Vesu', 'Piplod', 'Athwa Lines', 'City Light', 'Ghod Dod Road',
  'Pal', 'Althan', 'Bhatar', 'Parle Point', 'Dumas Road', 'VIP Road',
  'Jahangirpura', 'Palanpur Patia', 'Magdalla', 'Umra',
  'Varachha', 'Mota Varachha', 'Katargam', 'Sarthana', 'Amroli',
];

export const SERVICES = [
  { title: 'Bridal & Party Makeup', tag: 'Signature', img: img('bride-smile'), desc: 'HD bridal, engagement and party looks that stay flawless from the pheras to the last photo.', book: 'Makeup', pricing: 'makeup' },
  { title: 'Facials & Skin Care', tag: 'Glow', img: img('facial-mask'), desc: 'Deep-cleansing and glow facials tailored to your skin type for a radiant finish.', book: 'Facial', pricing: 'facial' },
  { title: 'Hair Styling & Spa', tag: 'Nourish', img: img('hair-styling'), desc: 'Cuts, colour, curls and a nourishing hair spa — without stepping out.', book: 'Hair Spa', pricing: 'hairspa' },
  { title: 'De-Tan', tag: 'Restore', img: img('detan-face-pack'), desc: 'O3+, VLCC, OXY and Raaga de-tan packs that lift sun tan and bring back your natural glow.', book: 'De-Tan', pricing: 'detan' },
  { title: 'Waxing & Threading', tag: 'Smooth', img: img('hand-care'), desc: 'Gentle, hygienic hair removal with Rica, Richelon and honey wax, plus precise threading.', book: 'Waxing', pricing: 'waxing' },
  { title: 'Cleanup & Bleach', tag: 'Refresh', img: img('cleanup-facial'), desc: 'Quick brightening clean-ups and bleach for an instant fresh look.', book: 'Clean-Up', pricing: 'cleanup' },
];

export const MARQUEE = ['Bridal Makeup', 'Glow Facials', 'De-Tan', 'Hair Spa', 'Waxing', 'Threading', 'Party Makeup', 'Clean-Up', 'Bleach'];

// Policy-style highlights — check these match how you operate.
export const STATS = [
  { value: '15+', label: 'Services' },
  { value: '7', label: 'Days a Week' },
  { value: '100%', label: 'Single-use Kits' },
  { value: '₹0', label: 'Travel Charges' },
];

export const STEPS = [
  { title: 'Book in 30 seconds', text: 'Pick your service, date, time and area in Surat using the form.' },
  { title: 'Get a confirmation call', text: 'Our team calls you back to confirm the slot and answer any questions.' },
  { title: 'Relax — we come to you', text: 'A certified beautician arrives on time with a sealed, hygienic kit.' },
];

export const WHY = [
  { icon: 'cert', title: 'Certified Beauticians', text: 'Trained, background-verified professionals with real salon experience.' },
  { icon: 'home', title: 'Salon at Your Doorstep', text: 'No traffic, no waiting room. Your home, your comfort, your time.' },
  { icon: 'leaf', title: 'Premium, Skin-safe Products', text: 'Trusted brands and single-use disposables for every appointment.' },
  { icon: 'tag', title: 'Honest, Flat Pricing', text: 'The price you are quoted is the price you pay — no travel fees.' },
];

// `span` shapes the 4-column grid (tall = 2 rows, wide = 2 columns); `pos` keeps faces in frame.
export const GALLERY = [
  { img: img('bridal-glam'), caption: 'Bridal Glam', span: 'tall', pos: 'center 30%' },
  { img: img('festive-saree'), caption: 'Festive Saree Look', span: '', pos: 'center 20%' },
  { img: img('bridal-portrait'), caption: 'Bridal Portrait', span: '', pos: 'center 22%' },
  { img: img('engagement-look'), caption: 'Engagement Look', span: 'tall', pos: 'center 25%' },
  { img: img('body-spa'), caption: 'Relaxing Body Spa', span: 'wide', pos: 'center' },
  { img: img('facial-mask'), caption: 'Glow Facial', span: '', pos: 'center' },
  { img: img('banner-bride-nath'), caption: 'Reception Look', span: 'wide', pos: 'center 22%' },
  { img: img('traditional-look'), caption: 'Traditional Look', span: '', pos: 'center 20%' },
];

// SAMPLE reviews — replace with real customer reviews before going live.
export const TESTIMONIALS = [
  { name: 'Riddhi P.', role: 'Bride, Vesu', text: 'My bridal makeup stayed perfect through the entire wedding day. Everyone kept asking who did it!' },
  { name: 'Kinjal S.', role: 'Adajan', text: 'Booked a facial and hair spa on a Sunday — the beautician was on time, polite and super hygienic.' },
  { name: 'Mansi D.', role: 'Piplod', text: 'Same quality as a premium salon, but in my own living room. I am never going back to waiting in line.' },
];

export const FAQS = [
  { q: 'Which areas do you serve?', a: `We currently serve only within ${CITY} city — including Adajan, Vesu, Piplod, Athwa, City Light, Pal, Varachha, Katargam and nearby areas. If your area isn't listed, message us on WhatsApp and we'll confirm.` },
  { q: 'How much do your services cost?', a: 'See our price list above — every service shows the offer price, the regular price and how long it takes. Tap "Book" next to any option and it is added to your booking request.' },
  { q: 'How do I book an appointment?', a: 'Fill in the booking form at the top of the page and tap Book Now — or message us on WhatsApp. We call you back within 2 hours to confirm your slot.' },
  { q: 'Do beauticians bring everything?', a: 'Yes. Every beautician carries a complete professional kit with branded products and single-use disposables. You only need a chair and a little space.' },
  { q: 'I have sensitive skin. Is that okay?', a: 'Absolutely. Tell us on the confirmation call and your beautician will use gentle, skin-safe products and do a patch test where needed.' },
  { q: 'How early should I book bridal makeup?', a: 'For bridal and engagement makeup we recommend booking 2–4 weeks ahead. Regular services often have same-day slots.' },
  { q: 'Are there any travel charges?', a: `No. There are no travel charges anywhere within ${CITY}.` },
];

// Opens the booking popup; detail can pre-select { service, sub } (fired by every Book / Book Now button)
export const BOOK_EVENT = 'gh:book';
export const openBooking = (detail = {}) => window.dispatchEvent(new CustomEvent(BOOK_EVENT, { detail }));
// Event used by service cards to open a tab in the price list
export const PRICING_EVENT = 'gh:pricing';
// Fired after a booking is sent successfully
export const BOOKED_EVENT = 'gh:booked';
