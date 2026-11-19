// Structured data (JSON-LD) that tells Google this is a beauty salon in Surat, with its services,
// prices, hours, service areas and FAQs. Check it at https://search.google.com/test/rich-results
import {
  AREAS, BRAND, CITY, EMAIL, FACEBOOK, FAQS, FIRST_SLOT, INSTAGRAM, LAST_SLOT, PHONE_TEL, PHOTOS, SITE_URL,
} from '@/lib/data';
import { PRICING } from '@/lib/pricing';

const hhmm = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
const allPrices = PRICING.flatMap(c => c.groups.flatMap(g => g.items.map(i => i.price))).filter(p => p > 1);

const business = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  '@id': `${SITE_URL}/#business`,
  name: BRAND,
  description: `At-home beauty salon service in ${CITY}: bridal makeup, facials, de-tan, waxing, threading and hair care by certified beauticians.`,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: [`${SITE_URL}${PHOTOS.hero}`, `${SITE_URL}/opengraph-image`],
  telephone: PHONE_TEL,
  // Official social profiles — helps Google connect the website with Instagram
  sameAs: [INSTAGRAM, FACEBOOK].filter(Boolean),
  email: EMAIL,
  priceRange: `₹${Math.min(...allPrices)} – ₹${Math.max(...allPrices).toLocaleString('en-IN')}`,
  currenciesAccepted: 'INR',
  address: { '@type': 'PostalAddress', addressLocality: CITY, addressRegion: 'Gujarat', addressCountry: 'IN' },
  areaServed: [{ '@type': 'City', name: CITY }, ...AREAS.map(a => ({ '@type': 'Place', name: `${a}, ${CITY}` }))],
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: hhmm(FIRST_SLOT),
    // Last slot starts at LAST_SLOT; services run about an hour after that
    closes: hhmm(LAST_SLOT + 60),
  }],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'At-home beauty services',
    itemListElement: PRICING.map(c => ({
      '@type': 'OfferCatalog',
      name: c.label,
      itemListElement: c.groups.map(g => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: g.name, areaServed: CITY },
        priceSpecification: {
          '@type': 'PriceSpecification', priceCurrency: 'INR', minPrice: Math.min(...g.items.map(i => i.price)),
        },
      })),
    })),
  },
};

const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function StructuredData() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
