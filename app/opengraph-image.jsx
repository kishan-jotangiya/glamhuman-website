import { ImageResponse } from 'next/og';
import { BRAND, CITY, PHONE_DISPLAY } from '@/lib/data';

// Share preview image (WhatsApp, Facebook, Google) — generated at /opengraph-image
export const alt = `${BRAND} – Home Salon Service in ${CITY}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SPARKLE = 'M12 0c.6 5.3 2.5 9.4 12 12-9.5 2.6-11.4 6.7-12 12-.6-5.3-2.5-9.4-12-12C9.5 9.4 11.4 5.3 12 0Z';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 90px', color: '#fff',
          background: 'radial-gradient(circle at 85% 20%, rgba(217,174,106,.35), transparent 45%), linear-gradient(120deg, #1c0510 0%, #6a0631 55%, #940944 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, letterSpacing: 6, color: '#f1d9b0' }}>
          <svg width="30" height="30" viewBox="0 0 24 24"><path d={SPARKLE} fill="#d9ae6a" /></svg>
          {`${CITY.toUpperCase()}'S PREMIUM HOME SALON`}
        </div>
        <div style={{ fontSize: 120, fontWeight: 700, marginTop: 24, letterSpacing: -2 }}>{BRAND}</div>
        <div style={{ fontSize: 46, marginTop: 8, color: '#d9ae6a', fontStyle: 'italic' }}>Salon luxury, delivered home.</div>
        <div style={{ display: 'flex', gap: 28, marginTop: 44, fontSize: 28, color: 'rgba(255,255,255,.85)' }}>
          <span>Bridal Makeup</span><span>·</span><span>Facials</span><span>·</span><span>De-Tan</span><span>·</span><span>Waxing</span><span>·</span><span>Hair Spa</span>
        </div>
        <div style={{ display: 'flex', marginTop: 40, fontSize: 30, padding: '14px 30px', borderRadius: 999, background: '#d9ae6a', color: '#1c0510', alignSelf: 'flex-start', fontWeight: 700 }}>
          {`Book at home · ${PHONE_DISPLAY}`}
        </div>
      </div>
    ),
    size,
  );
}
