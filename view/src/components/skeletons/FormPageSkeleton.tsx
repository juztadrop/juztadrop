'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function FormPageSkeleton() {
  return (
    <div className="container max-w-2xl space-y-8">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
      </div>

      {/* Form sections */}
      {[1, 2, 3].map((section) => (
        <div key={section} className="space-y-4 rounded-2xl border border-foreground/5 bg-white/50 p-6">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-9 w-24 rounded-full" />
            ))}
          </div>
        </div>
      ))}

      <div className="pt-6">
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
    </div>
  );
}
