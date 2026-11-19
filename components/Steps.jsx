import { Sparkle } from './Icons';
import { STEPS } from '@/lib/data';

export default function Steps() {
  return (
    <section className="section steps" id="how">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><Sparkle /> How it Works <Sparkle /></span>
          <h2>Glam in <span className="italic">three</span> easy steps</h2>
        </div>
        <div className="steps-grid">
          {STEPS.map((s, i) => (
            <div className="step reveal" key={s.title} style={{ ['--d']: `${i * 0.15}s` }}>
              <div className="n">{i + 1}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
