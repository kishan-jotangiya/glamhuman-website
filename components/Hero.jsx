import Image from 'next/image';
import BookingForm from './BookingForm';
import CountUp from './CountUp';
import { IconArrow, IconCheck, IconWhatsApp, Sparkle } from './Icons';
import { CITY, PHOTOS, STATS, waLink } from '@/lib/data';
import BookButton from './BookButton';

// Fixed positions so server and client render the same markup
const SPARKLES = [
  { top: '16%', left: '4%', size: 14, delay: '0s' },
  { top: '74%', left: '2%', size: 10, delay: '1.2s' },
  { top: '10%', left: '46%', size: 18, delay: '2.1s' },
  { top: '88%', left: '40%', size: 12, delay: '.6s' },
  { top: '24%', left: '94%', size: 16, delay: '1.7s' },
  { top: '56%', left: '52%', size: 9, delay: '2.8s' },
  { top: '92%', left: '86%', size: 14, delay: '.3s' },
];

const TRUST = ['Certified Beauticians', 'Hygiene Guaranteed', 'Same-Day Slots'];

// Splits text into words that animate in one after another
function Words({ text, start = 0 }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i}>
          <span className="word" style={{ ['--i']: start + i }}>{w}</span>{' '}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Background layers are clipped here, not on .hero, so form dropdowns can extend past the hero */}
      <div className="hero-media">
        <div className="hero-bg" data-parallax="0.45">
          <Image src={PHOTOS.hero} alt="Bride with professional bridal makeup" fill priority sizes="(max-width: 1080px) 100vw, 66vw" />
        </div>
        <div className="hero-overlay" />
        <div className="sparkles">
          {SPARKLES.map((s, i) => (
            <Sparkle key={i} style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }} />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="hero-copy" data-parallax="-0.12" data-parallax-from="1081">
          <div className="pill rise">
            <Sparkle /> {CITY}&apos;s premium home salon
          </div>
          <h1>
            <span className="line gold"><Words text="Home Salon Service" /></span>
            <span className="line"><Words text="Certified Beauticians" start={3} /></span>
            <span className="line"><Words text="at Your Doorstep" start={5} /></span>
          </h1>
          <p className="lead rise" style={{ ['--d']: '.7s' }}>
            Skip the commute. GlamHuman brings bridal makeup, facials, hair spa, waxing and more straight to your
            home in {CITY} — on your terms, on your timeline.
          </p>
          <ul className="trust rise" style={{ ['--d']: '.85s' }}>
            {TRUST.map(t => <li key={t}><span><IconCheck /></span>{t}</li>)}
          </ul>
          <div className="hero-cta rise" style={{ ['--d']: '1s' }}>
            <BookButton>Book Appointment <IconArrow /></BookButton>
            <a href={waLink()} target="_blank" rel="noopener" className="btn btn-glass"><IconWhatsApp /> WhatsApp Us</a>
          </div>
          <div className="hero-stats rise" style={{ ['--d']: '1.15s' }}>
            {STATS.map(s => (
              <div key={s.label}>
                <b><CountUp value={s.value} /></b>
                <small>{s.label}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="rise" style={{ ['--d']: '.4s' }}>
          <BookingForm anchorId="book" />
        </div>
      </div>
      <a href="#services" className="scroll-cue" aria-label="Scroll down" />
    </section>
  );
}
