import { Cormorant_Garamond, Jost } from "next/font/google";
import { BRAND, CITY, SITE_URL } from "@/lib/data";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

const title = `Home Salon Service in ${CITY} | Bridal Makeup, Facial, Waxing at Home – ${BRAND}`;
const description =
  `Book certified beauticians at home in ${CITY}. Bridal & party makeup, facials, clean-up, de-tan, bleach, ` +
  "waxing, threading, hair spa & hair colour at your doorstep. Offer prices, hygienic kits, no travel charges.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${BRAND}` },
  description,
  applicationName: BRAND,
  keywords: [
    `home salon ${CITY}`, `beauty parlour at home ${CITY}`, `bridal makeup at home ${CITY}`,
    `party makeup ${CITY}`, `facial at home ${CITY}`, `waxing at home ${CITY}`, `de-tan at home ${CITY}`,
    `hair spa at home ${CITY}`, "home beautician", "salon at home",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: BRAND,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  category: "beauty",
  other: { "geo.region": "IN-GJ", "geo.placename": CITY },
};

export const viewport = {
  themeColor: "#940944",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
