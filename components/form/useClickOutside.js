import { useEffect } from 'react';

// Calls `handler` on any pointer down outside `ref` while `active` is true.
export function useClickOutside(ref, handler, active) {
  useEffect(() => {
    if (!active) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler();
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [ref, handler, active]);
}
