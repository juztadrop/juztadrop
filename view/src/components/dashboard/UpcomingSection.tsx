import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { formatDate } from '@/lib/date';
import { DashboardSection } from './DashboardSection';
import { EmptyState } from './EmptyState';
import type { DashboardApplication } from '@/hooks/useDashboard';

export interface UpcomingSectionProps {
  upcoming: DashboardApplication[];
}

export function UpcomingSection({ upcoming }: UpcomingSectionProps) {
  return (
    <DashboardSection
      icon={<Calendar className="h-5 w-5" />}
      title={`Upcoming (${upcoming.length})`}
    >
      {upcoming.length === 0 ? (
        <EmptyState
          icon={<Clock className="h-10 w-10 text-jad-primary/40" aria-hidden />}
          title="No upcoming sessions"
          description="Approved applications will appear here"
        />
      ) : (
        <div className="mt-6 space-y-2">
          {upcoming.slice(0, 3).map((app) => (
            <Link
              key={app.id}
              href={`/opportunities/${app.opportunityId}`}
              className="block rounded-xl border border-foreground/10 p-3 text-sm transition-colors hover:bg-jad-mint/20"
            >
              <p className="font-medium text-jad-foreground line-clamp-1">{app.opportunityTitle}</p>
              <p className="text-xs text-foreground/60">{formatDate(app.opportunityStartDate)}</p>
            </Link>
          ))}
        </div>
      )}
    </DashboardSection>
  );
}
