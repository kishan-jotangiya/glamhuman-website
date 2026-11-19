import { IconPin, Sparkle } from './Icons';
import { AREAS, CITY } from '@/lib/data';

export default function Areas() {
  return (
    <section className="section areas" id="areas">
      <span className="bigword" aria-hidden="true" data-parallax="-0.25">{CITY}</span>
      <div className="container">
        <div className="areas-card reveal">
          <div className="pin"><IconPin /></div>
          <span className="eyebrow"><Sparkle /> Service Area <Sparkle /></span>
          <h2>Proudly serving <span className="italic">{CITY}</span></h2>
          <p>
            We&apos;re focused on {CITY} so we can always arrive on time. Our beauticians cover these neighbourhoods and
            everything in between.
          </p>
          <div className="chips">
            {AREAS.map((a, i) => <span key={a} style={{ ['--i']: i }}>{a}</span>)}
          </div>
          <div className="only-note"><IconPin /> Currently available only within {CITY} city</div>
        </div>
      </div>
    </section>
  );
}
