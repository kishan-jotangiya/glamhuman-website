import Image from 'next/image';
import { Sparkle, WHY_ICONS } from './Icons';
import { PHOTOS, WHY } from '@/lib/data';

export default function WhyChooseUs() {
  return (
    <section className="section why on-dark" id="why">
      <div className="container">
        <div className="why-visual reveal">
          <div className="arch a1" data-parallax="0.06">
            <Image src={PHOTOS.why1} alt="Festive makeup look" fill sizes="(max-width: 1080px) 60vw, 380px" />
          </div>
          <div className="arch a2" data-parallax="-0.12">
            <Image src={PHOTOS.why2} alt="Facial treatment at home" fill sizes="(max-width: 1080px) 45vw, 280px" />
          </div>
          <svg className="ring" viewBox="0 0 130 130" aria-hidden="true">
            <defs>
              <path id="ring-path" d="M65 65 m-52 0 a52 52 0 1 1 104 0 a52 52 0 1 1 -104 0" />
            </defs>
            <text><textPath href="#ring-path">Certified • Hygienic • At Home • </textPath></text>
          </svg>
          <Sparkle className="ring-star" />
        </div>

        <div>
          <span className="eyebrow reveal"><Sparkle /> Why GlamHuman</span>
          <h2 className="reveal">Beauty that feels <span className="italic">personal</span></h2>
          <p className="lead reveal">
            We started GlamHuman to make salon-quality care effortless. No traffic, no waiting — just skilled hands,
            premium products and your full attention, in the comfort of home.
          </p>
          <div className="why-list">
            {WHY.map((w, i) => {
              const Icon = WHY_ICONS[w.icon];
              return (
                <div className="why-item reveal" key={w.title} style={{ ['--d']: `${i * 0.1}s` }}>
                  <div className="ic"><Icon /></div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
