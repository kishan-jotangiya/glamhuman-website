'use client';

import { useEffect, useState } from 'react';
import { IconClose, IconMenu } from './Icons';
import { openBooking } from '@/lib/data';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#how', label: 'How it Works' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#areas', label: 'Areas' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    // Highlight the section currently under the header ("scrollspy")
    const sections = LINKS.map(l => document.querySelector(l.href)).filter(Boolean);
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const line = window.innerHeight * 0.35;
      let current = '#home';
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) current = `#${s.id}`;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    return unlockScroll;
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}>
      <div className="container">
        <a href="#home" className="logo" aria-label="GlamHuman home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="light" src="/logo-light.svg" alt="GlamHuman" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="dark" src="/logo.svg" alt="" aria-hidden="true" />
        </a>
        <ul className={`nav-links${open ? ' open' : ''}`}>
          {LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={close} className={active === l.href ? 'active' : undefined}
                aria-current={active === l.href ? 'page' : undefined}>
                {l.label}
              </a>
            </li>
          ))}
          <li><button type="button" className="btn btn-primary" onClick={() => { close(); openBooking(); }}>Book Now</button></li>
        </ul>
        <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(o => !o)}>
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </header>
  );
}
