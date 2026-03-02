import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { formatDate } from '@/lib/date';
import { DashboardSection } from './DashboardSection';
import { EmptyState } from './EmptyState';
import type { DashboardApplication } from '@/hooks/useDashboard';

export interface PastVolunteeringSectionProps {
  past: DashboardApplication[];
}

export function PastVolunteeringSection({ past }: PastVolunteeringSectionProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <DashboardSection
      icon={<MapPin className="h-5 w-5" />}
      title={`Past volunteering (${past.length})`}
    >
      {past.length === 0 ? (
        <EmptyState
          title="No past sessions yet"
          description="Completed volunteering will appear here"
        />
      ) : (
        <div className="mt-6 space-y-2">
          {past.slice(0, 5).map((app) => {
            const canFeedback =
              app.hasAttended === true &&
              app.opportunityEndDate != null &&
              new Date(app.opportunityEndDate) < today;
            return (
              <div
                key={app.id}
                className="flex items-center justify-between gap-2 rounded-xl border border-foreground/10 p-3"
              >
                <Link
                  href={`/opportunities/${app.opportunityId}`}
                  className="min-w-0 flex-1 text-sm hover:opacity-80"
                >
                  <p className="font-medium text-jad-foreground line-clamp-1">
                    {app.opportunityTitle}
                  </p>
                  <p className="text-xs text-foreground/60">{formatDate(app.opportunityEndDate)}</p>
                </Link>
                {canFeedback && (
                  <Link
                    href={`/opportunities/${app.opportunityId}/feedback`}
                    className="shrink-0 rounded-lg bg-jad-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-jad-dark"
                  >
                    Give feedback
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </DashboardSection>
  );
}
