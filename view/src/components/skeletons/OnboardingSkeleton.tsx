'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function OnboardingSkeleton() {
  return (
    <div className="container max-w-3xl space-y-8">
      <div className="space-y-2 text-center">
        <Skeleton className="mx-auto h-8 w-72" />
        <Skeleton className="mx-auto h-4 w-96" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-2xl border-2 border-foreground/10 bg-white p-8"
          >
            <div className="flex items-start justify-between">
              <Skeleton className="h-14 w-14 rounded-2xl" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="mt-5 h-6 w-40" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-[75%]" />
            <Skeleton className="mt-4 h-4 w-28" />
          </div>
        ))}
      </div>

      <div className="text-center">
        <Skeleton className="mx-auto h-4 w-48" />
        <Skeleton className="mx-auto mt-3 h-10 w-36 rounded-full" />
      </div>
    </div>
  );
}
