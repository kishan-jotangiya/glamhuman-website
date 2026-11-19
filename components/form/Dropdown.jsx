'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useClickOutside } from './useClickOutside';
import { shouldOpenUp } from './placement';
import { IconCheck, IconChevron, IconClose, IconSearch } from '../Icons';

export default function Dropdown({
  id, value, placeholder, icon, groups, onChange, onClose, invalid, valid,
  searchable, searchPlaceholder = 'Search…', layout = 'list', emptyText = 'No matches found',
  /** When given, a × button clears the selection (also Delete / Backspace on the field). */
  onClear,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);
  const [up, setUp] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const searchRef = useRef(null);
  const listRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map(g => (g.label?.toLowerCase().includes(q) ? g : { ...g, options: g.options.filter(o => `${o.label} ${o.display || ''}`.toLowerCase().includes(q)) }))
      .filter(g => g.options.length);
  }, [groups, query]);

  // Flat list of options in display order, for keyboard navigation
  const flat = useMemo(() => filtered.flatMap(g => g.options), [filtered]);
  const selected = useMemo(() => groups.flatMap(g => g.options).find(o => o.value === value), [groups, value]);

  const close = useCallback((refocus = false) => {
    setOpen(false);
    setQuery('');
    onClose?.();
    if (refocus) triggerRef.current?.focus();
  }, [onClose]);

  const closeOutside = useCallback(() => close(false), [close]);
  useClickOutside(rootRef, closeOutside, open);

  const openPanel = () => {
    setUp(shouldOpenUp(triggerRef.current, searchable ? 340 : 300));
    setOpen(true);
    const idx = flat.findIndex(o => o.value === value);
    setActive(idx >= 0 ? idx : flat.findIndex(o => !o.disabled));
  };

  useEffect(() => {
    if (open && searchable) searchRef.current?.focus();
  }, [open, searchable]);

  // Keep the highlighted option in view
  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  const choose = (o) => {
    if (o.disabled) return;
    onChange(o.value);
    close(true);
  };

  const move = (dir) => {
    if (!flat.length) return;
    let i = active;
    for (let n = 0; n < flat.length; n++) {
      i = (i + dir + flat.length) % flat.length;
      if (!flat[i].disabled) break;
    }
    setActive(i);
  };

  const canClear = !!onClear && !!value;
  const clear = () => {
    if (open) close(false);
    onClear();
    triggerRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (e.target.closest?.('.dd-clear')) return; // the × button handles its own keys
    if (!open) {
      if (canClear && (e.key === 'Delete' || e.key === 'Backspace')) {
        e.preventDefault();
        clear();
        return;
      }
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openPanel();
      }
      return;
    }
    // Grid layout moves 3 per row vertically
    const step = layout === 'grid' ? 3 : 1;
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); for (let s = 0; s < step; s++) move(1); break;
      case 'ArrowUp': e.preventDefault(); for (let s = 0; s < step; s++) move(-1); break;
      case 'ArrowRight': if (layout === 'grid') { e.preventDefault(); move(1); } break;
      case 'ArrowLeft': if (layout === 'grid') { e.preventDefault(); move(-1); } break;
      case 'Home': e.preventDefault(); setActive(flat.findIndex(o => !o.disabled)); break;
      case 'End': e.preventDefault(); setActive(flat.length - 1 - [...flat].reverse().findIndex(o => !o.disabled)); break;
      case 'Enter': e.preventDefault(); if (flat[active]) choose(flat[active]); break;
      case 'Escape': e.preventDefault(); close(true); break;
      case 'Tab': close(false); break;
      default:
        // Type-ahead for non-searchable lists
        if (!searchable && e.key.length === 1) {
          const k = e.key.toLowerCase();
          const i = flat.findIndex(o => !o.disabled && o.label.toLowerCase().startsWith(k));
          if (i >= 0) setActive(i);
        }
    }
  };

  let idx = -1;
  const state = invalid ? ' invalid' : valid ? ' valid' : '';

  return (
    <div className={`dd${open ? ' open' : ''}${up ? ' up' : ''}${state}`} ref={rootRef} onKeyDown={onKeyDown}>
      <button
        type="button" id={id} ref={triggerRef} className="dd-trigger"
        aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-list`}
        onClick={() => (open ? close(false) : openPanel())}
      >
        <span className="dd-icon">{icon}</span>
        <span className={`dd-value${selected ? '' : ' placeholder'}`}>{selected ? (selected.display || selected.label) : placeholder}</span>
        {/* With a selection, the × takes the tick's place (the green border still shows it's valid) */}
        {canClear ? <span className="dd-clear-space" /> : <span className="dd-state">{valid && <IconCheck />}</span>}
        <IconChevron className="dd-chevron" />
      </button>
      {canClear && (
        <button type="button" className="dd-clear" aria-label="Clear selection" title="Clear" onClick={clear}>
          <IconClose />
        </button>
      )}

      <div className={`dd-panel ${layout}`} role="presentation">
        {searchable && (
          <div className="dd-search">
            <IconSearch />
            <input
              ref={searchRef} value={query} placeholder={searchPlaceholder} aria-label={searchPlaceholder}
              onChange={e => { setQuery(e.target.value); setActive(0); }}
            />
          </div>
        )}
        <div className="dd-list" id={`${id}-list`} role="listbox" ref={listRef} tabIndex={-1}>
          {flat.length === 0 && <div className="dd-empty">{emptyText}</div>}
          {filtered.map((g, gi) => (
            <div className="dd-group" key={g.label ?? gi} role="group" aria-label={g.label}>
              {g.label && <div className="dd-group-label">{g.label}</div>}
              <div className="dd-options">
                {g.options.map(o => {
                  idx++;
                  const i = idx;
                  return (
                    <div
                      key={o.value} data-idx={i} role="option"
                      aria-selected={o.value === value} aria-disabled={o.disabled}
                      className={`dd-option${o.value === value ? ' selected' : ''}${i === active ? ' active' : ''}${o.disabled ? ' disabled' : ''}`}
                      onMouseEnter={() => !o.disabled && setActive(i)}
                      onClick={() => choose(o)}
                    >
                      <span>{o.label}</span>
                      {o.meta && <span className="dd-meta">{o.meta}</span>}
                      {o.value === value && <IconCheck className="dd-tick" />}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
