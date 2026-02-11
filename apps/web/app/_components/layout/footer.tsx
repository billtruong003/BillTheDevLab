import Link from 'next/link';
import { Github, Twitter, Youtube, Linkedin, Facebook, Instagram, Mail, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/config/site.config';

const socialLinks = [
  { icon: Twitter, href: siteConfig.social.twitter, label: 'Twitter' },
  { icon: Github, href: siteConfig.social.github, label: 'GitHub' },
  { icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
  { icon: MessageCircle, href: siteConfig.social.discord, label: 'Discord' },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: Facebook, href: siteConfig.social.facebook, label: 'Facebook' },
  { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
  { icon: Mail, href: siteConfig.social.email, label: 'Email' },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <Link href="/" className="font-display text-lg font-bold">
              <span className="gradient-text">{siteConfig.name}</span>
            </Link>
            <p className="mt-2 font-body text-sm text-[var(--color-text-muted)]">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Navigation
            </h3>
            <ul className="mt-3 space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-[var(--color-text-secondary)] transition-colors hover:text-brand-orange"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Connect
            </h3>
            <div className="mt-3 flex gap-4">
              {socialLinks
                .filter((s) => s.href)
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-muted)] transition-colors hover:text-brand-orange"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--color-border)] pt-6 text-center">
          <p className="font-body text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {siteConfig.name}. Built with passion for game dev.
          </p>
        </div>
      </div>
    </footer>
  );
}
