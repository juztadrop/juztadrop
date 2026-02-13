'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { AppSidebar } from './AppSidebar';
import { AppFooter } from './AppFooter';
import { AppShellSkeleton } from '@/components/skeletons';
import { useAuth } from '@/lib/auth/use-auth';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isReady } = useAuth();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace('/login?redirect=' + encodeURIComponent(window.location.pathname));
    }
  }, [isReady, isAuthenticated, router]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isReady || !isAuthenticated) {
    return <AppShellSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />

      {/* Mobile header */}
      <header className="fixed top-0 right-0 left-0 z-30 flex h-14 items-center justify-between border-b border-foreground/5 bg-white/95 backdrop-blur-xl md:left-64">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center text-jad-foreground md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex-1 md:hidden" />
        <Link
          href="/"
          className="pr-4 text-lg font-bold tracking-tight md:hidden"
        >
          <span className="text-jad-foreground">juzt</span>
          <span className="text-jad-primary">a</span>
          <span className="text-jad-accent">drop</span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-14 md:pl-64 md:pt-0">
        <div className="flex min-h-screen flex-col">
          <div className="flex flex-1 flex-col pb-16 pt-20 md:pt-24">{children}</div>
          <AppFooter />
        </div>
      </main>
    </div>
  );
}
