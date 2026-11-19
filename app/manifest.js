import { BRAND, CITY } from '@/lib/data';

// Served at /manifest.webmanifest — lets phones "Add to Home Screen" with the brand name and colour
export default function manifest() {
  return {
    name: `${BRAND} – Home Salon in ${CITY}`,
    short_name: BRAND,
    description: `Certified beauticians at your doorstep in ${CITY}.`,
    start_url: '/',
    display: 'standalone',
    background_color: '#fffaf8',
    theme_color: '#940944',
    icons: [{ src: '/icon.png', sizes: '32x32', type: 'image/png' }],
  };
}
