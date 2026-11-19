import { IconStar, Sparkle } from './Icons';
import { TESTIMONIALS } from '@/lib/data';

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><Sparkle /> Kind Words <Sparkle /></span>
          <h2>What our clients <span className="italic">say</span></h2>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="testi reveal" key={t.name} style={{ ['--d']: `${i * 0.12}s` }}>
              <span className="q">“</span>
              <div className="stars">{Array.from({ length: 5 }, (_, k) => <IconStar key={k} />)}</div>
              <p>{t.text}</p>
              <div className="who">
                <div className="av">{t.name[0]}</div>
                <div>
                  <b>{t.name}</b>
                  <small>{t.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
