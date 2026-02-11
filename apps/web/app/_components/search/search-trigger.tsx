'use client';

import { Search } from 'lucide-react';
import { useUIStore } from '@/lib/store';

export function SearchTrigger() {
  const setSearchOpen = useUIStore((s) => s.setSearchOpen);

  return (
    <button
      onClick={() => setSearchOpen(true)}
      className="rounded-cozy p-2 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-elevated)] hover:text-brand-orange"
      aria-label="Open search"
    >
      <Search size={18} />
    </button>
  );
}
