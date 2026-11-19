// Decide whether a popover should open above its trigger: only when there is not enough
// room below in the viewport and there is more room above.
export function shouldOpenUp(trigger, panelHeight) {
  if (!trigger) return false;
  const r = trigger.getBoundingClientRect();
  const below = window.innerHeight - r.bottom;
  const above = r.top - 80; // leave room for the fixed header
  return below < panelHeight + 16 && above > below;
}
