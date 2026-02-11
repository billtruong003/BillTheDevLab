'use client';

import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/lib/store';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-cozy p-2 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-elevated)] hover:text-brand-orange"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
