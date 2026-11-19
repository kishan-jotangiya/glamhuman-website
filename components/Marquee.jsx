import { Sparkle } from './Icons';
import { MARQUEE } from '@/lib/data';

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {/* Rendered twice so the -50% translate loops seamlessly */}
        {[0, 1].map(copy =>
          MARQUEE.map(m => <span key={`${copy}-${m}`}>{m}<Sparkle /></span>)
        )}
      </div>
    </div>
  );
}
