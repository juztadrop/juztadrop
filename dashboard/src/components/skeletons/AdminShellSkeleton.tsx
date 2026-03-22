'use client';

import { Skeleton } from '@/components/ui/skeleton';

/** Full-screen loading state while moderator session resolves (aligned with view `AppShellSkeleton` idea). */
export function AdminShellSkeleton() {
  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col md:py-6">
        <div className="px-4">
          <Skeleton className="h-8 w-32" />
        </div>
        <nav className="mt-8 space-y-2 px-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b px-4 md:px-6">
          <Skeleton className="h-8 w-8 rounded-md md:hidden" />
          <Skeleton className="ml-auto h-9 w-24 rounded-md" />
        </header>
        <main className="flex-1 bg-muted/20 p-4 md:p-8">
          <div className="container space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>
            <Skeleton className="h-48 w-full max-w-2xl rounded-xl" />
          </div>
        </main>
      </div>
    </div>
  );
}
