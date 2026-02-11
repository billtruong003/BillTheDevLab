'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/lib/config/site.config';
import { ThemeToggle } from '@/app/_components/theme/theme-toggle';
import { SearchTrigger } from '@/app/_components/search/search-trigger';
import { classNames } from '@/lib/utils/format';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={classNames(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass-surface shadow-lg' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-fluid-lg font-bold tracking-tight"
        >
          <span className="gradient-text">{siteConfig.name}</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={classNames(
                'font-body text-sm font-medium transition-colors duration-200',
                pathname.startsWith(item.href)
                  ? 'text-brand-orange'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
              )}
            >
              {item.label}
            </Link>
          ))}
          <SearchTrigger />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <SearchTrigger />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[var(--color-text-primary)]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="glass-surface border-t border-[var(--color-border)] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={classNames(
                  'font-body text-base font-medium',
                  pathname.startsWith(item.href)
                    ? 'text-brand-orange'
                    : 'text-[var(--color-text-secondary)]',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
