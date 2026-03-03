import Link from 'next/link';
import { FileEdit, Users } from 'lucide-react';
import { cn } from '@/lib/common';
import { formatDateLong } from '@/lib/date';
import { getOpportunityStatusClass } from '@/lib/status';
import type { OrgOpportunity } from '@/hooks/useOrgOpportunities';

export interface OrgOpportunityRowProps {
  opportunity: OrgOpportunity;
  ngoId: string;
}

export function OrgOpportunityRow({ opportunity, ngoId }: OrgOpportunityRowProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-bold text-jad-foreground">{opportunity.title}</h2>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-foreground/70">
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-xs font-medium',
              getOpportunityStatusClass(opportunity.status)
            )}
          >
            {opportunity.status}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-0.5 capitalize">
            {opportunity.opportunityMode}
          </span>
          {opportunity.city != null && (
            <span>{[opportunity.city, opportunity.state].filter(Boolean).join(', ')}</span>
          )}
          <span>
            {formatDateLong(opportunity.startDate)} – {formatDateLong(opportunity.endDate)}
          </span>
        </div>
        {(opportunity.causeCategoryNames?.length ?? 0) > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {(opportunity.causeCategoryNames ?? []).slice(0, 3).map((c) => (
              <span
                key={c}
                className="rounded-full bg-jad-mint/50 px-2 py-0.5 text-xs text-jad-foreground"
              >
                {c.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/opportunities/${opportunity.id}`}
          className="inline-flex items-center gap-1 rounded-xl border border-jad-primary px-3 py-2 text-sm font-medium text-jad-primary hover:bg-jad-mint/30"
        >
          View
        </Link>
        <Link
          href={`/organisations/${ngoId}/opportunities/${opportunity.id}/edit`}
          className="inline-flex items-center gap-1 rounded-xl border border-foreground/20 px-3 py-2 text-sm font-medium hover:bg-muted/50"
        >
          <FileEdit className="h-4 w-4" aria-hidden />
          Edit
        </Link>
        <Link
          href={`/organisations/${ngoId}/opportunities/${opportunity.id}/applications`}
          className="inline-flex items-center gap-1 rounded-xl border border-foreground/20 px-3 py-2 text-sm font-medium hover:bg-muted/50"
        >
          <Users className="h-4 w-4" aria-hidden />
          Applications
        </Link>
      </div>
    </div>
  );
}
