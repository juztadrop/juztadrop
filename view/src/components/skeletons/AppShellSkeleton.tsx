'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function AppShellSkeleton() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar skeleton */}
      <aside className="hidden w-64 flex-col border-r border-foreground/10 bg-white md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-foreground/5 px-4">
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex-1 space-y-2 p-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 pt-14 md:pl-64 md:pt-0">
        <div className="container space-y-8 pt-8">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-36 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <Skeleton className="h-64 lg:col-span-2" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </main>
    </div>
  );
}
