import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <span className="font-display text-[8rem] font-bold leading-none gradient-text">404</span>
      <h1 className="mt-4 font-display text-fluid-2xl font-bold">Page Not Found</h1>
      <p className="mt-2 max-w-md font-body text-[var(--color-text-secondary)]">
        This page doesn&apos;t exist — it might have been moved or deleted.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="cozy-button-primary">
          <Home size={16} />
          Go Home
        </Link>
        <Link href="/blog" className="cozy-button-secondary">
          <ArrowLeft size={16} />
          Browse Blog
        </Link>
      </div>
    </div>
  );
}
