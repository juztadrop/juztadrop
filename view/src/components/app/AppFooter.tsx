'use client';

import Link from 'next/link';

export function AppFooter() {
  return (
    <footer className="mt-auto border-t border-foreground/5 bg-white/50 py-4">
      <div className="container flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
        <p className="text-xs text-foreground/50">
          © {new Date().getFullYear()} juztadrop
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-foreground/50">
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground/70"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-foreground/70"
          >
            Terms
          </Link>
          <Link
            href="/cookies"
            className="transition-colors hover:text-foreground/70"
          >
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
