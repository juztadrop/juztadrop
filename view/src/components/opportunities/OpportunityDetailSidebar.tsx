import Link from 'next/link';
import { ChevronRight, Users } from 'lucide-react';
import { formatDateRange } from '@/lib/date';
import { getApplicationStatusClass } from '@/lib/status';
import type {
  OpportunityDetailOpportunity,
  OpportunityDetailApplication,
} from '@/hooks/useOpportunityDetail';

export interface OpportunityDetailSidebarProps {
  opportunity: OpportunityDetailOpportunity;
  myApplication: OpportunityDetailApplication | null;
  opportunityId: string;
  canApply: boolean;
  hasVolunteerProfile: boolean;
  isAuthenticated: boolean;
  isNgoOwner: boolean;
  onApplyClick: () => void;
}

export function OpportunityDetailSidebar({
  opportunity,
  myApplication,
  opportunityId,
  canApply,
  hasVolunteerProfile,
  isAuthenticated,
  isNgoOwner,
  onApplyClick,
}: OpportunityDetailSidebarProps) {
  const canGiveFeedback =
    myApplication?.status === 'approved' &&
    myApplication?.hasAttended === true &&
    opportunity?.endDate != null &&
    new Date(opportunity.endDate) < new Date();

  return (
    <div className="sticky top-24 rounded-2xl border border-foreground/10 bg-white p-6 shadow-lg">
      <div className="mb-4 rounded-xl bg-jad-mint/30 px-4 py-3 text-center">
        <p className="text-sm font-medium text-jad-foreground">When</p>
        <p className="mt-1 font-semibold">
          {formatDateRange(opportunity.startDate, opportunity.endDate) || 'TBD'}
        </p>
      </div>
      {myApplication != null ? (
        <div className="space-y-2">
          <div className="rounded-xl border border-foreground/10 bg-muted/30 px-4 py-3">
            <p className="text-sm font-medium text-jad-foreground">Your application</p>
            <span
              className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getApplicationStatusClass(myApplication.status)}`}
            >
              {myApplication.status}
            </span>
          </div>
          {canGiveFeedback && (
            <Link
              href={`/opportunities/${opportunityId}/feedback`}
              className="block w-full rounded-xl border-2 border-jad-primary py-2.5 text-center text-sm font-semibold text-jad-primary hover:bg-jad-mint/30"
            >
              Give feedback
            </Link>
          )}
        </div>
      ) : canApply ? (
        <button
          type="button"
          onClick={onApplyClick}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-jad-primary py-3 text-sm font-semibold text-white hover:bg-jad-dark"
        >
          Apply
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      ) : !hasVolunteerProfile && isAuthenticated ? (
        <Link
          href="/onboarding/volunteer"
          className="block w-full rounded-xl border-2 border-jad-primary py-3 text-center text-sm font-semibold text-jad-primary hover:bg-jad-mint/30"
        >
          Complete profile to apply
        </Link>
      ) : !isAuthenticated ? (
        <Link
          href={`/login?redirect=/opportunities/${opportunityId}`}
          className="block w-full rounded-xl bg-jad-primary py-3 text-center text-sm font-semibold text-white hover:bg-jad-dark"
        >
          Log in to apply
        </Link>
      ) : null}
      {isNgoOwner && opportunity.ngoId != null && (
        <Link
          href={`/organisations/${opportunity.ngoId}/opportunities/${opportunityId}/applications`}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-jad-primary py-2.5 text-sm font-semibold text-jad-primary hover:bg-jad-mint/30"
        >
          <Users className="h-4 w-4" aria-hidden />
          Manage applications
        </Link>
      )}
    </div>
  );
}
