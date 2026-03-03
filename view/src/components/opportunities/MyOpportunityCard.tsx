import Link from 'next/link';
import { Building2, Calendar, MapPin, Edit, Users } from 'lucide-react';
import { formatDateLong } from '@/lib/date';
import { getMyOpportunityStatusClass } from '@/lib/status';
import type { MyOpportunity } from '@/hooks/useMyOpportunities';

export interface MyOpportunityCardProps {
  opportunity: MyOpportunity;
  orgName?: string;
}

export function MyOpportunityCard({ opportunity, orgName }: MyOpportunityCardProps) {
  const addressStr = [opportunity.city, opportunity.state].filter(Boolean).join(', ');

  return (
    <div className="rounded-2xl border border-foreground/10 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <h2 className="text-lg font-bold text-jad-foreground">{opportunity.title}</h2>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${getMyOpportunityStatusClass(opportunity.status)}`}
            >
              {opportunity.status}
            </span>
          </div>
          {orgName != null && (
            <p className="mb-3 text-sm text-foreground/70">
              <Building2 className="mr-1 inline h-4 w-4" aria-hidden />
              {orgName}
            </p>
          )}
          {opportunity.description != null && opportunity.description !== '' && (
            <p className="mb-3 line-clamp-2 text-sm text-foreground/70">
              {opportunity.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
            {opportunity.startDate != null && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden />
                {formatDateLong(opportunity.startDate)}
                {opportunity.endDate != null && ` - ${formatDateLong(opportunity.endDate)}`}
              </div>
            )}
            {addressStr !== '' && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden />
                {addressStr}
              </div>
            )}
            {opportunity.opportunityMode != null && (
              <span className="capitalize">{opportunity.opportunityMode}</span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/organisations/${opportunity.ngoId}/opportunities/${opportunity.id}/applications`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-jad-primary px-3 py-2 text-sm font-medium text-jad-primary hover:bg-jad-mint/30"
          >
            <Users className="h-4 w-4" aria-hidden />
            Applications
          </Link>
          <Link
            href={`/organisations/${opportunity.ngoId}/opportunities/${opportunity.id}/edit`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-jad-primary px-3 py-2 text-sm font-medium text-white hover:bg-jad-dark"
          >
            <Edit className="h-4 w-4" aria-hidden />
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
