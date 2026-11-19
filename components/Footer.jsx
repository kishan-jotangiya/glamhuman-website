import { IconClock, IconFacebook, IconInstagram, IconMail, IconPhone, IconPin, IconWhatsApp } from './Icons';
import { BRAND, CITY, EMAIL, FACEBOOK, HOURS, INSTAGRAM, PHONE_DISPLAY, PHONE_TEL, SERVICES, waLink } from '@/lib/data';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="foot-logo" src="/logo-light.svg" alt={BRAND} />
            <p style={{ fontSize: 14.5, maxWidth: 320 }}>
              Premium at-home beauty services in {CITY}. Certified beauticians, sealed hygienic kits and honest pricing.
            </p>
            <div className="socials">
              <a href={INSTAGRAM} target="_blank" rel="noopener" aria-label="Instagram"><IconInstagram /></a>
              <a href={FACEBOOK} target="_blank" rel="noopener" aria-label="Facebook"><IconFacebook /></a>
              <a href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp"><IconWhatsApp /></a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#pricing">Price List</a></li>
              <li><a href="#how">How it Works</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#areas">Service Areas</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {SERVICES.map(s => <li key={s.title}><a href="#services">{s.title}</a></li>)}
            </ul>
          </div>
          <div>
            <h4>Get in Touch</h4>
            <ul className="contact">
              <li><IconPhone /><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></li>
              <li><IconMail /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><IconPin />{CITY}, Gujarat</li>
              <li><IconClock />{HOURS}</li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} {BRAND}. All rights reserved.</span>
          <span>Made with love in {CITY}</span>
        </div>
      </div>
    </footer>
  );
}
