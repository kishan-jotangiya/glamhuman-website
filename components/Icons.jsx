// Minimal inline icon set (stroke icons, 24x24) + the sparkle from the GlamHuman logo.

const S = ({ children, className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

export const Sparkle = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0c.6 5.3 2.5 9.4 12 12-9.5 2.6-11.4 6.7-12 12-.6-5.3-2.5-9.4-12-12C9.5 9.4 11.4 5.3 12 0Z" />
  </svg>
);

export const IconUser = (p) => <S {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></S>;
export const IconPhone = (p) => <S {...p}><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" /></S>;
export const IconCalendar = (p) => <S {...p}><rect x="3" y="4.5" width="18" height="16.5" rx="3" /><path d="M3 9.5h18M8 2.5v4M16 2.5v4" /></S>;
export const IconClock = (p) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></S>;
export const IconSparkles = (p) => <S {...p}><path d="M10 3c.4 3.6 1.8 5.6 6 6-4.2.4-5.6 2.4-6 6-.4-3.6-1.8-5.6-6-6 4.2-.4 5.6-2.4 6-6ZM18 14c.2 1.8.9 2.8 3 3-2.1.2-2.8 1.2-3 3-.2-1.8-.9-2.8-3-3 2.1-.2 2.8-1.2 3-3Z" /></S>;
export const IconPin = (p) => <S {...p}><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" /><circle cx="12" cy="9" r="2.5" /></S>;
export const IconMail = (p) => <S {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></S>;
export const IconCheck = (p) => <S {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></S>;
export const IconShield = (p) => <S {...p}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" /><path d="m9 12 2 2 4-4" /></S>;
export const IconArrow = (p) => <S {...p}><path d="M5 12h14M13 6l6 6-6 6" /></S>;
export const IconPlus = (p) => <S {...p}><path d="M12 5v14M5 12h14" /></S>;
export const IconList = (p) => <S {...p}><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1" fill="currentColor" /><circle cx="4.5" cy="12" r="1" fill="currentColor" /><circle cx="4.5" cy="18" r="1" fill="currentColor" /></S>;
export const IconChevron = (p) => <S {...p}><path d="m6 9 6 6 6-6" /></S>;
export const IconSearch = (p) => <S {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" /></S>;
export const IconAlert = (p) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5h.01" /></S>;
export const IconExpand = (p) => <S {...p}><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></S>;
export const IconMenu =(p) => <S {...p}><path d="M4 7h16M4 12h16M4 17h10" /></S>;
export const IconClose = (p) => <S {...p}><path d="M6 6l12 12M18 6 6 18" /></S>;
export const IconStar = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6L2.5 9.3l6.6-.8L12 2.5Z" />
  </svg>
);
export const IconInstagram = (p) => <S {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></S>;
export const IconFacebook = (p) => <S {...p}><path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15V3Z" /></S>;
export const IconWhatsApp = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
    <path fill="currentColor" d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.5L3 29l6.7-1.7c1.9 1 4.1 1.6 6.3 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.7c-2 0-3.9-.5-5.6-1.5l-.4-.2-4 1 1-3.9-.3-.4c-1.1-1.8-1.7-3.8-1.7-5.8C5 10 10 5.3 16 5.3S26.7 10 26.7 16 22 26.7 16 26.7zm5.9-8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.9 1.1 3.5.9 4.1.9.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.4.2-1.6-.1-.2-.3-.3-.6-.4z" />
  </svg>
);

// Feature icons for the "Why" section
export const IconCert = (p) => <S {...p}><circle cx="12" cy="9" r="5.5" /><path d="m8.5 13.5-1.5 7.5 5-2.5 5 2.5-1.5-7.5" /><path d="m10 9 1.5 1.5L14.5 7.5" /></S>;
export const IconHome = (p) => <S {...p}><path d="M3.5 11 12 4l8.5 7" /><path d="M5.5 9.5V20h13V9.5" /><path d="M10 20v-5h4v5" /></S>;
export const IconLeaf = (p) => <S {...p}><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" /><path d="M5 19 13 11" /></S>;
export const IconTag = (p) => <S {...p}><path d="M3 12V4.5A1.5 1.5 0 0 1 4.5 3H12l9 9-9 9-9-9Z" /><circle cx="8" cy="8" r="1.5" /></S>;

export const WHY_ICONS = {
  cert: IconCert, home: IconHome, leaf: IconLeaf, tag: IconTag,
};
