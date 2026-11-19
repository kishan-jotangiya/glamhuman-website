import { IconWhatsApp } from './Icons';
import { waLink } from '@/lib/data';

export default function WhatsAppFloat() {
  return (
    <a className="wa-float" href={waLink()} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <IconWhatsApp />
    </a>
  );
}
