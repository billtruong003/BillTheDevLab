import type { Metadata } from 'next';
import Image from 'next/image';
import { Github, Twitter, Youtube, Mail, Linkedin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/config/site.config';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${siteConfig.author.name} — ${siteConfig.author.bio}`,
};

const socialIcons = [
  { icon: Twitter, href: siteConfig.social.twitter, label: 'Twitter' },
  { icon: Github, href: siteConfig.social.github, label: 'GitHub' },
  { icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
  { icon: MessageCircle, href: siteConfig.social.discord, label: 'Discord' },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: Facebook, href: siteConfig.social.facebook, label: 'Facebook' },
  // { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
  { icon: Mail, href: `mailto:${siteConfig.author.email}`, label: 'Email' },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-28">
      <div className="flex flex-col items-center text-center">
        <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-brand-orange">
          <Image
            src={siteConfig.author.avatar}
            alt={siteConfig.author.name}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>

        <h1 className="mt-6 font-display text-fluid-3xl font-bold">
          Hey, I&apos;m{' '}
          <span className="gradient-text">{siteConfig.author.name}</span>
        </h1>

        <p className="mt-4 max-w-xl font-body text-fluid-base leading-relaxed text-[var(--color-text-secondary)]">
          {siteConfig.author.bio}
        </p>

        <div className="mt-8 flex gap-4">
          {socialIcons
            .filter((s) => s.href)
            .map((social) => (
              <a
                key={social.label}
                href={social.href!}
                target={social.label === 'Email' ? undefined : '_blank'}
                rel={social.label === 'Email' ? undefined : 'noopener noreferrer'}
                className="rounded-cozy bg-[var(--color-surface)] p-3 text-[var(--color-text-muted)] transition-colors hover:bg-brand-orange hover:text-white"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
        </div>
      </div>

      <div className="prose-custom mt-16">
        <h2>Who Am I?</h2>
        <p>
          I'm a <strong>self taught developer</strong> with 4 years of experience (XP). Back in the day, I snagged a scholarship at FPT, but life pulled a plot twist—financial struggles hit, and I had to drop out in year 2 to support my family.
        </p>
        <p>
          That didn't stop me. I turned to Google, YouTube, and sheer stubbornness. My coding journey leveled up from <strong>Gameloft</strong> to <strong>FPT</strong>, and now I'm crafting VR magic at <strong>Curly Blue</strong>. No fancy degree, just pure grit, passion, and a lot of caffeine.
        </p>

        <h2>What I Do</h2>
        <p>
          I make games with <strong>Unity</strong>. That's the core of it.
        </p>
        <p>
          My goal isn't just to write clean code or make pretty shaders it's to create experiences that feel right. Whether it's VR, mobile, or PC, I enjoy the challenge of bridging the gap between technical constraints and artistic vision. I want to build worlds that players can get lost in, without worrying about what's happening under the hood.
        </p>

        <h2>Why This Site Exists</h2>
        <p>
          I built this site for two reasons: to document what I learn and to give back to the community.
        </p>
        <p>
          I started with zero knowledge, learning everything from random YouTube tutorials and blogs (shoutout to <em>Minion Art</em>). I know how frustrating it is to get stuck without guidance. So, I'm sharing my devlogs, tutorials, and assets here. If my content can help you save a few hours of debugging or inspire you to start your own project, then mission accomplished.
        </p>

        <h2>Get In Touch</h2>
        <p>
          Have a question, a project idea, or just want to talk about game dev? Feel free to email me at <a href="mailto:truongbill003@gmail.com">truongbill003@gmail.com</a>.
        </p>
        <p>
          <strong>Need a Tutorial?</strong> If there's a specific mechanic or shader you're struggling with, let me know. I often write guides based on what people are actually asking for. I read every email (except spam, obviously), so don't hesitate to reach out.
        </p>
      </div>
    </div>
  );
}
