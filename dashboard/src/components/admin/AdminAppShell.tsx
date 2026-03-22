'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/common';
import { useAuth } from '@/lib/auth';
import { AdminShellSkeleton } from '@/components/skeletons/AdminShellSkeleton';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

/**
 * Authenticated admin shell: session gate + sidebar layout.
 * Mirrors `view` `AppLayout` (client guard, skeleton while resolving, then chrome + children).
 */
export function AdminAppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { moderator, isAuthenticated, isLoading, isReady } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname || '/')}`);
    }
  }, [isReady, isAuthenticated, router, pathname]);

  if (!isReady || isLoading || !moderator) {
    return <AdminShellSkeleton />;
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      {mobileNavOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-label="Close menu"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 border-r bg-background shadow-lg transition-transform md:static md:z-0 md:translate-x-0 md:shadow-none',
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <AdminSidebar onNavigate={() => setMobileNavOpen(false)} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col md:min-h-screen">
        <AdminHeader onMenuOpen={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6 md:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
