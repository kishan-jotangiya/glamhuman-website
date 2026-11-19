import Image from 'next/image';
import { IconArrow, IconPhone, Sparkle } from './Icons';
import { CITY, PHONE_TEL, PHOTOS } from '@/lib/data';
import BookButton from './BookButton';

export default function Cta() {
  return (
    <section className="cta-wrap" id="contact">
      <div className="container">
        <div className="cta reveal on-dark">
          <div className="cta-bg" data-parallax="0.18">
            <Image src={PHOTOS.cta} alt="" fill sizes="(max-width: 1200px) 100vw, 1200px" />
          </div>
          <span className="eyebrow"><Sparkle /> Your glow, our promise <Sparkle /></span>
          <h2>Ready to <span className="italic">glow?</span></h2>
          <p>Book your at-home beauty session anywhere in {CITY} — a certified beautician is just a tap away.</p>
          <div className="hero-cta">
            <BookButton>Book Now <IconArrow /></BookButton>
            <a href={`tel:${PHONE_TEL}`} className="btn btn-glass"><IconPhone /> Call Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
