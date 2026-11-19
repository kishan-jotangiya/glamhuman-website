// Stops the page behind a popup from scrolling, so only one scrollbar is ever visible.
// The page scrolls on <html> (not <body>), so that is the element we lock. A counter lets
// several popups lock/unlock safely, and padding replaces the hidden scrollbar so nothing jumps.
let locks = 0;

export function lockScroll() {
  if (typeof document === 'undefined') return;
  if (locks++ > 0) return;
  const html = document.documentElement;
  const scrollbar = window.innerWidth - html.clientWidth;
  html.style.overflow = 'hidden';
  if (scrollbar > 0) {
    html.style.paddingRight = `${scrollbar}px`;
    html.style.setProperty('--scrollbar-comp', `${scrollbar}px`); // used by the fixed header
  }
}

export function unlockScroll() {
  if (typeof document === 'undefined' || locks === 0) return;
  if (--locks > 0) return;
  const html = document.documentElement;
  html.style.overflow = '';
  html.style.paddingRight = '';
  html.style.removeProperty('--scrollbar-comp');
}
