'use client';

import Image from 'next/image';
import { IconArrow, Sparkle } from './Icons';
import { PHOTOS, PRICING_EVENT, openBooking } from '@/lib/data';
import { PRICING } from '@/lib/pricing';
import { rupees } from './Pricing';

const bridalFrom = Math.min(...PRICING.find(c => c.id === 'makeup').groups.find(g => g.name === 'Bridal Makeup').items.map(i => i.price));

// Full-width bridal banner whose photo scrolls slower than the page (strong parallax).
export default function ParallaxBand() {
  return (
    <section className="pband" aria-labelledby="pband-title">
      <div className="pband-bg" data-parallax="0.35">
        <Image src={PHOTOS.band} alt="" fill sizes="100vw" />
      </div>
      <div className="container pband-content">
        <span className="eyebrow reveal"><Sparkle /> Bridal Season <Sparkle /></span>
        <h2 id="pband-title" className="reveal">Your big day, <span className="italic">flawless</span> at home</h2>
        <p className="reveal">HD &amp; Airbrush bridal makeup from {rupees(bridalFrom)} — our artists arrive with everything they need, so you can get ready in comfort.</p>
        <div className="hero-cta reveal">
          <button type="button" className="btn btn-gold" onClick={() => openBooking({ service: 'Makeup' })}>
            Book Bridal Makeup <IconArrow />
          </button>
          <a href="#pricing" className="btn btn-glass"
            onClick={() => window.dispatchEvent(new CustomEvent(PRICING_EVENT, { detail: 'makeup' }))}>
            See bridal prices
          </a>
        </div>
      </div>
    </section>
  );
}
