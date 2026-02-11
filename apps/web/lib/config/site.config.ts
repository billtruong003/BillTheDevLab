import type { SiteConfig } from '@billthedevlab/shared-types';

export const siteConfig: SiteConfig = {
  name: 'BillTheDevLab',
  title: 'BillTheDevLab - Game Dev & VR Experiments Blogs',
  description:
    'Ex-FPT & Gameloft survivor turning coffee into optimized shaders. I build VR worlds because reality has bad graphics. Need high-quality game outsourcing? I know a guy (it\'s me).',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.billthedev.com',
  author: {
    name: 'Bill Truong',
    bio: 'Devlogger by day, Bug Hunter by night. I make pixels look expensive and code run fast. Reality is overrated, so I build VR.',
    avatar: '/images/avatar.jpg',
    email: 'truongbill003@gmail.com',
  },
  social: {
    twitter: 'https://x.com/BillWorkaholic',
    github: 'https://github.com/billtruong003',
    youtube: 'https://www.youtube.com/@BillTheDev',
    discord: 'https://discord.com/users/350863712208289792',
    email: 'mailto:truongbill003@gmail.com',
    linkedin: 'https://www.linkedin.com/in/billtruong003/',
    // tiktok: 'https://tiktok.com/@your-profile',
    facebook: 'https://www.facebook.com/billthedev/',
    // instagram: 'https://instagram.com/your-profile',
  },
  nav: [
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/projects' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
  ],
};
