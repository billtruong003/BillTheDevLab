import type { Metadata, Viewport } from 'next';
import { Outfit, Be_Vietnam_Pro, JetBrains_Mono } from 'next/font/google';
import { siteConfig } from '@/lib/config/site.config';
import { Header } from '@/app/_components/layout/header';
import { Footer } from '@/app/_components/layout/footer';
import { SearchModal } from '@/app/_components/search/search-modal';
import { getAllPostsMeta } from '@/lib/mdx/mdx.service';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#16161D' },
    { media: '(prefers-color-scheme: light)', color: '#F7F4EA' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const fontDisplay = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const fontBody = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const posts = getAllPostsMeta();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] antialiased ${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
      >
        <Header />
        <SearchModal posts={posts} />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
