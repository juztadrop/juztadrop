import Link from 'next/link';
import { formatDate } from '@/lib/date';
import { getApplicationStatusClass } from '@/lib/status';
import type { DashboardApplication } from '@/hooks/useDashboard';

export interface ApplicationCardProps {
  application: DashboardApplication;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <Link
      href={`/opportunities/${application.opportunityId}`}
      className="block rounded-xl border border-foreground/10 p-4 transition-colors hover:bg-jad-mint/20"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-jad-foreground">{application.opportunityTitle}</p>
          <p className="text-sm text-foreground/60">{application.orgName}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${getApplicationStatusClass(application.status)}`}
        >
          {application.status}
        </span>
      </div>
      {application.opportunityStartDate != null && (
        <p className="mt-1 text-sm text-foreground/60">
          {formatDate(application.opportunityStartDate)}
        </p>
      )}
    </Link>
  );
}
